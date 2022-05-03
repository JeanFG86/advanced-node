import { mock, MockProxy } from 'jest-mock-extended'

type setup = (fileStorage: UploadFile, crypto: UUIDGenerator) => ChangeProfilePicture
type Input = { id: string, file: Buffer }
type ChangeProfilePicture = (input: Input) => Promise<void>

const setupChangeProfilePicture: setup = (fileStorage, crypto) => async ({ id, file }) => {
  await fileStorage.upload({ file, key: crypto.uuid({ key: id }) })
}

interface UUIDGenerator{
  uuid: (input: UUIDGenerator.Input) => UUIDGenerator.OutPut
}

namespace UUIDGenerator{
  export type Input = { key: string }
  export type OutPut = string
}

interface UploadFile{
  upload: (input: UploadFile.Input) => Promise<void>
}

namespace UploadFile{
  export type Input = { file: Buffer, key: string }
}

describe('ChangeProfilePicture', () => {
  let uuid: string
  let file: Buffer
  let fileStorage: MockProxy<UploadFile>
  let crypto: MockProxy<UUIDGenerator>
  let sut: ChangeProfilePicture

  beforeEach(() => {
    sut = setupChangeProfilePicture(fileStorage, crypto)
  })

  beforeAll(() => {
    uuid = 'any_unique_id'
    file = Buffer.from('any_buffer')
    fileStorage = mock<UploadFile>()
    crypto = mock<UUIDGenerator>()
    crypto.uuid.mockReturnValue(uuid)
  })

  it('should call UploadFile with correct input', async () => {
    await sut({ id: 'any_id', file })

    expect(fileStorage.upload).toHaveBeenCalledWith({ file, key: uuid })
    expect(fileStorage.upload).toHaveBeenCalledTimes(1)
  })
})

import { Controller, SavePictureController } from '@/application/controllers'
import { AllowedMimeTypes, MaxFileSize, Required, RequiredBuffer } from '@/application/validation'

describe('SavePictureController', () => {
  let buffer: Buffer
  let mimeType: string
  let file: { buffer: Buffer, mimeType: string }
  let userId: string
  let sut: SavePictureController
  let changeProfilePicture: jest.Mock

  beforeAll(() => {
    buffer = Buffer.from('any_buffer')
    mimeType = 'image/png'
    file = { buffer, mimeType }
    userId = 'any_user_id'
    changeProfilePicture = jest.fn().mockResolvedValue({ inicials: 'any_inicials', pictureUrl: 'any_url' })
  })

  beforeEach(() => {
    sut = new SavePictureController(changeProfilePicture)
  })

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build validators correctly', async () => {
    const validators = sut.buildValidators({ file, userId })

    expect(validators).toEqual([
      new Required(file, 'file'),
      new RequiredBuffer(buffer, 'file'),
      new AllowedMimeTypes(['png', 'jpg'], mimeType),
      new MaxFileSize(5, buffer)
    ])
  })

  it('should call ChangeProfilePicture with correct input', async () => {
    await sut.handle({ file, userId })

    expect(changeProfilePicture).toHaveBeenCalledWith({ id: userId, file: buffer })
    expect(changeProfilePicture).toHaveBeenCalledTimes(1)
  })

  it('should return 200 with valid data', async () => {
    const httpResponse = await sut.handle({ file, userId })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { inicials: 'any_inicials', pictureUrl: 'any_url' }
    })
  })
})

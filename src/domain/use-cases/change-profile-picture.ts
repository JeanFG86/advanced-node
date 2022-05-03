import { UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { SaveUserPicture } from '@/domain/contracts/repos'

type setup = (fileStorage: UploadFile, crypto: UUIDGenerator, userProfileRepo: SaveUserPicture) => ChangeProfilePicture
type Input = { id: string, file?: Buffer }
export type ChangeProfilePicture = (input: Input) => Promise<void>

export const setupChangeProfilePicture: setup = (fileStorage, crypto, userProfileRepo) => async ({ id, file }) => {
  if (file !== undefined) {
    const pictureUrl = await fileStorage.upload({ file, key: crypto.uuid({ key: id }) })
    await userProfileRepo.savePicture({ pictureUrl })
  }
}

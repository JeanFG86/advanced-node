import { UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { SaveUserPicture, LoadUserProfile } from '@/domain/contracts/repos'
import { UserProfile } from '../entities'

type setup = (fileStorage: UploadFile, crypto: UUIDGenerator, userProfileRepo: SaveUserPicture & LoadUserProfile) => ChangeProfilePicture
type Input = { id: string, file?: Buffer }
type OutPut = {pictureUrl?: string, initials?: string}
export type ChangeProfilePicture = (input: Input) => Promise<OutPut>

export const setupChangeProfilePicture: setup = (fileStorage, crypto, userProfileRepo) => async ({ id, file }) => {
  const data: { pictureUrl?: string, name?: string } = {}
  if (file !== undefined) {
    data.pictureUrl = await fileStorage.upload({ file, key: crypto.uuid({ key: id }) })
  } else {
    data.name = (await userProfileRepo.load({ id })).name
  }
  const userProfile = new UserProfile(id)
  userProfile.setPicture(data)
  await userProfileRepo.savePicture(userProfile)
  return userProfile
}

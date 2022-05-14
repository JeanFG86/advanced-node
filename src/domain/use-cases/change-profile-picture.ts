import { UploadFile, UUIDGenerator, DeleteFile } from '@/domain/contracts/gateways'
import { SaveUserPicture, LoadUserProfile } from '@/domain/contracts/repos'
import { UserProfile } from '../entities'

type setup = (fileStorage: UploadFile & DeleteFile, crypto: UUIDGenerator, userProfileRepo: SaveUserPicture & LoadUserProfile) => ChangeProfilePicture
type Input = { id: string, file?: Buffer }
type OutPut = {pictureUrl?: string, initials?: string}
export type ChangeProfilePicture = (input: Input) => Promise<OutPut>

export const setupChangeProfilePicture: setup = (fileStorage, crypto, userProfileRepo) => async ({ id, file }) => {
  const data: { pictureUrl?: string, name?: string } = {}
  const key = crypto.uuid({ key: id })
  if (file !== undefined) {
    data.pictureUrl = await fileStorage.upload({ file, key })
  } else {
    data.name = (await userProfileRepo.load({ id }))?.name
  }
  const userProfile = new UserProfile(id)
  userProfile.setPicture(data)
  try {
    await userProfileRepo.savePicture(userProfile)
  } catch (error) {
    if (file !== undefined) {
      await fileStorage.delete({ key })
    }
    throw error
  }

  return userProfile
}

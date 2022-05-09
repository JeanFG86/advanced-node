import { LoadUserAccount, SaveFacebookAccount } from '@/domain/contracts/repos'
import { getRepository } from 'typeorm'
import { PgUser } from '@/infra/repos/postgres/entities'

export class PgUserAccountRepository implements LoadUserAccount, SaveFacebookAccount {
  async load ({ email }: LoadUserAccount.Params): Promise<LoadUserAccount.Result> {
    const pgUserRepo = getRepository(PgUser)
    const user = new PgUser()
    user.email = email

    const pgUser = await pgUserRepo.findOne({ email: email })
    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook ({ id, name, email, facebookId }: SaveFacebookAccount.Params): Promise<SaveFacebookAccount.Result> {
    const pgUserRepo = getRepository(PgUser)
    let resultId: string
    if (id === undefined) {
      const pgUser = await pgUserRepo.save({ email, name, facebookId })
      resultId = pgUser.id.toString()
    } else {
      resultId = id
      await pgUserRepo.update({ id: parseInt(id) }, { name, facebookId })
    }
    return { id: resultId }
  }
}

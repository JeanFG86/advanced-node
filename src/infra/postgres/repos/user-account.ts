import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/data/contracts/repos'
import { getRepository } from 'typeorm'
import { PgUser } from '@/infra/postgres/entities'

export class PgUserAccountRepository implements LoadUserAccountRepository, SaveFacebookAccountRepository {
  async load ({ email }: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
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

  async saveWithFacebook ({ id, name, email, facebookId }: SaveFacebookAccountRepository.Params): Promise<SaveFacebookAccountRepository.Result> {
    const pgUserRepo = getRepository(PgUser)
    // console.log(pgUserRepo)
    try {
      let resultId: string
      if (id === undefined) {
        const pgUser = await pgUserRepo.save({ email, name, facebookId })
        resultId = pgUser.id.toString()
      } else {
        resultId = id
        await pgUserRepo.update({ id: parseInt(id) }, { name, facebookId })
      }
      return { id: resultId }
    } catch (error) {
      console.log(error)
      return { id: '' }
    }
  }
}

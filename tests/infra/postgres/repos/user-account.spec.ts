import { IBackup, IMemoryDb, newDb } from 'pg-mem'
import { getConnection, getRepository, Repository } from 'typeorm'
import { PgUserAccountRepository } from '@/infra/postgres/repos'
import { PgUser } from '@/infra/postgres/entities'

const makeFakeDb = async (entities?: any[]): Promise<IMemoryDb> => {
  const db = newDb()
  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities: entities ?? ['src/infra/postgres/entities/index.ts']
  })
  await connection.synchronize()
  return db
}

describe('PgUserAccountRepository', () => {
  describe('load', () => {
    let sut: PgUserAccountRepository
    let pgUserRepo: Repository<PgUser>
    let backup: IBackup
    beforeAll(async () => {
      const db = await makeFakeDb()
      backup = db.backup()
      pgUserRepo = getRepository(PgUser)
    })
    beforeEach(() => {
      backup.restore()
      sut = new PgUserAccountRepository()
    })

    afterAll(async () => {
      await getConnection().close()
    })

    it('should return an account if email exists', async () => {
      await pgUserRepo.save({ email: 'existing_email' })

      const account = await sut.load({ email: 'existing_email' })

      expect(account).toEqual({ id: '1' })
    })
    it('should return undefined if email not exists', async () => {
      const sut = new PgUserAccountRepository()

      const account = await sut.load({ email: 'new_email' })
      expect(account).toBeUndefined()
    })
  })
})

import request from 'supertest'
import { app } from '@/main/config/app'
import { IBackup } from 'pg-mem'
import { PgUser } from '@/infra/postgres/entities'
import { getConnection } from 'typeorm'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'

describe('Login Routes', () => {
  describe('POST /login/facebook', () => {
    let backup: IBackup
    const loadUserSpy = jest.fn()
    jest.mock('@/infra/apis/facebook', () => ({
      FacebookApi: jest.fn().mockReturnValue({
        loadUser: loadUserSpy
      })
    }))

    beforeAll(async () => {
      const db = await makeFakeDb([PgUser])
      backup = db.backup()
    })

    beforeEach(() => {
      backup.restore()
    })

    afterAll(async () => {
      await getConnection().close()
    })

    it('should return 200 with AccessToken', async () => {
      loadUserSpy.mockResolvedValueOnce({ facebookId: 'any_id', name: 'any_name', email: 'any_email' })
      await request(app)
        .post('/api/login/facebook')
        .send({ token: 'valid_token' })
        .expect(200)
    })
  })
})

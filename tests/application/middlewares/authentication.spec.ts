import { forbidden, HttpResponse, ok } from '@/application/helpers'
import { ForbiddenError } from '@/application/errors'
import { RequiredStringValidator } from '@/application/validation'
import { Authorize } from '@/domain/use-cases'

type HttpRequest = { authorization: string}
type Model = Error | {userId: string}
class AuthenticationMiddleware {
  constructor (private readonly authorize: Authorize) {}
  async handle ({ authorization }: HttpRequest): Promise<HttpResponse<Model>> {
    if (!this.validate({ authorization })) {
      return forbidden()
    }
    try {
      const userId = await this.authorize({ token: authorization })
      return ok({ userId })
    } catch {
      return forbidden()
    }
  }

  private validate ({ authorization }: HttpRequest): boolean {
    const error = new RequiredStringValidator(authorization, 'authorization').validate()
    return error === undefined
  }
}

describe('AuthenticationMiddleware', () => {
  let sut: AuthenticationMiddleware
  let authorization: string
  let authorize: jest.Mock
  beforeEach(() => {
    sut = new AuthenticationMiddleware(authorize)
  })

  beforeAll(() => {
    authorization = 'any_authorization_token'
    authorize = jest.fn().mockResolvedValue('any_user_id')
  })

  it('should return 403 if authorization if empty', async () => {
    const httpResponse = await sut.handle({ authorization: '' })

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should return 403 if authorization if null', async () => {
    const httpResponse = await sut.handle({ authorization: null as any })

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should return 403 if authorization if udefined', async () => {
    const httpResponse = await sut.handle({ authorization: undefined as any })

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should call authorize with correct params', async () => {
    await sut.handle({ authorization })

    expect(authorize).toHaveBeenCalledWith({ token: authorization })
    expect(authorize).toHaveBeenCalledTimes(1)
  })

  it('should return 403 if authorize throws', async () => {
    authorize.mockRejectedValueOnce(new Error('any_error'))

    const httpResponse = await sut.handle({ authorization })

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should return 200 with userId on success', async () => {
    const httpResponse = await sut.handle({ authorization })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { userId: 'any_user_id' }
    })
  })
})

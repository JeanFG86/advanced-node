import { AuthenticationMiddleware } from '@/application/middlewares'
import { makeJwtTokenHandler } from '../crypto'

export const makeAutheticationMiddleware = (): AuthenticationMiddleware => {
  const jwt = makeJwtTokenHandler()
  return new AuthenticationMiddleware(jwt.validateToken.bind(jwt))
}

import { adaptExpressMiddleware } from '../adapters'
import { makeAutheticationMiddleware } from '../factories/middlewares'

export const auth = adaptExpressMiddleware(makeAutheticationMiddleware())

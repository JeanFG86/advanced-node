import { TokenGenerator, TokenValidator } from '@/domain/contracts/crypto'

import { JwtPayload, sign, verify } from 'jsonwebtoken'

export class JwtTokenHandler implements TokenGenerator, TokenValidator {
  constructor (private readonly secret: string) {}
  async generateToken (params: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    const expirationsInSeconds = params.expirationInMs / 1000
    return sign({ key: params.key }, this.secret, { expiresIn: expirationsInSeconds })
  }

  async validateToken ({ token }: TokenValidator.Params): Promise<TokenValidator.Result> {
    const payload = verify(token, this.secret) as JwtPayload
    return payload.key
  }
}

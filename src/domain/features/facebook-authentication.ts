import { AuthenticationError } from '@/domain/entities/errors'
import { AccessToken } from '@/domain/entities'

export interface FacebookAuthentication{
  perform: (token: FacebookAuthentication.Params) => Promise<FacebookAuthentication.Result>
}

export namespace FacebookAuthentication{
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthenticationError
}

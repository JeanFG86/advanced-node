import { FacebookApi } from '@/infra/geteways'
import { env } from '@/main/config/env'
import { makeAxiosHttpClient } from '@/main/factories/gateways'

export const makeFacebookApi = (): FacebookApi => {
  const axiosClient = makeAxiosHttpClient()
  return new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)
}

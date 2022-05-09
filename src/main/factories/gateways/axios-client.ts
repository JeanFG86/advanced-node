import { AxiosHttpClient } from '@/infra/geteways'

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

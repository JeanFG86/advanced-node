import { FacebookApi, AxiosHttpClient } from '@/infra/geteways'

import { env } from '@/main/config/env'

describe('Facebook Api Integration Tests', () => {
  let axiosCliente: AxiosHttpClient
  let sut: FacebookApi

  beforeEach(() => {
    axiosCliente = new AxiosHttpClient()
    sut = new FacebookApi(axiosCliente, env.facebookApi.clientId, env.facebookApi.clientSecret)
  })

  it('should return a Facebook User if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: 'EAAHZCre6pNckBAKbZAmhsvDdBuyvg2HZBKhTJht1v3cYdgKaIaY4oo4NL6mZCbx35rBEyV6qZCnMjB40ZAqeteuGOxmXBD3SytjiMFBLZCB3wDwXhG1ZA9neVUDWZCW1zLqcR5KdJGn4hZCHqfGT8CZAndsOE1dRMb4d57V5lJ1ZCGBrd7BeUW4J7kMCFJVc3qvJAupVZAFZAP4S0ouQZDZD' })

    expect(fbUser).toEqual({
      facebookId: '114689697883068',
      email: 'jean_canmpim_teste@tfbnw.net',
      name: 'Jean Teste'
    })
  })

  it('should return a undefined if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })
})

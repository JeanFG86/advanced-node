export interface HttpGetClient{
  get: (oarams: HttpGetClient.Params) => Promise<void>
}

export namespace HttpGetClient{
  export type Params = {
    url: string
    params: object
  }
}

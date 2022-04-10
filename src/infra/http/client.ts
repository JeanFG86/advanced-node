export interface HttpGetClient{
  get: (oarams: HttpGetClient.Params) => Promise<HttpGetClient.Result>
}

export namespace HttpGetClient{
  export type Params = {
    url: string
    params: object
  }

  export type Result = any
}

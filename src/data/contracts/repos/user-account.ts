export interface LoadUserAccountRepository{
  load: (params: LoadUserAccountRepository.Params) => Promise<LoadUserAccountRepository.Result>
}

export namespace LoadUserAccountRepository{
  export type Params = {
    email: string
  }

  export type Result = undefined | {
    id: string
    name?: string
  }
}

export interface CreateFacebookAccountRepository{
  createFromFacebook: (params: CreateFacebookAccountRepository.Params) => Promise<void>
}

export namespace CreateFacebookAccountRepository{
  export type Params = {
    email: string
    name: string
    facebookId: string
  }
}

export interface UpdateacebookAccountRepository{
  updateWithFacebook: (params: UpdateacebookAccountRepository.Params) => Promise<void>
}

export namespace UpdateacebookAccountRepository{
  export type Params = {
    id: string
    name: string
    facebookId: string
  }
}

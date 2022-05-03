export interface UUIDGenerator{
  uuid: (input: UUIDGenerator.Input) => UUIDGenerator.OutPut
}

export namespace UUIDGenerator{
  export type Input = { key: string }
  export type OutPut = string
}

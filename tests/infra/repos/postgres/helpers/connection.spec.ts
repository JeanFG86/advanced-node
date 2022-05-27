class PgConnection {
  private static instance?: PgConnection
  private constructor () { }

  static getInstance (): PgConnection {
    if (PgConnection.instance === undefined) {
      PgConnection.instance = new PgConnection()
    }

    return PgConnection.instance
  }

  getTeste (): void {}
}

describe('PgConnection', () => {
  it('should have on only instance', () => {
    const sut = PgConnection.getInstance()
    const sut2 = PgConnection.getInstance()

    expect(sut).toBe(sut2)
  })
})

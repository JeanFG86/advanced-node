import { InvalidMimeTypeError } from '@/application/errors'

type Extension = 'png' | 'jpg'

class AllawedMimeTypes {
  constructor (
    private readonly allowed: Extension[],
    private readonly mimetype: string
  ) { }

  validate (): Error | undefined {
    if (this.allowed.includes('png') && this.mimetype !== 'image/png') {
      return new InvalidMimeTypeError(this.allowed)
    }
  }
}

describe('AllawedMimeTypes', () => {
  it('should return InvalidMimeTypeError if value is invalid', () => {
    const sut = new AllawedMimeTypes(['png'], 'image/jpg')

    const error = sut.validate()

    expect(error).toEqual(new InvalidMimeTypeError(['png']))
  })

  it('should return undefined if value is valid', () => {
    const sut = new AllawedMimeTypes(['png'], 'image/png')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})

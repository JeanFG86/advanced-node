import { InvalidMimeTypeError } from '@/application/errors'

type Extension = 'png' | 'jpg'

class AllawedMimeTypes {
  constructor (
    private readonly allowed: Extension[],
    private readonly mimetype: string
  ) { }

  validate (): Error {
    return new InvalidMimeTypeError(this.allowed)
  }
}

describe('AllawedMimeTypes', () => {
  it('should return InvalidMimeTypeError if value is invalid', () => {
    const sut = new AllawedMimeTypes(['png'], 'image/jpg')

    const error = sut.validate()

    expect(error).toEqual(new InvalidMimeTypeError(['png']))
  })
})

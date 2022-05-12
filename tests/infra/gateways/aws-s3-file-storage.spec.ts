import { config } from 'aws-sdk'

jest.mock('aws-sdk')

class AwsS3FileStorage {
  constructor (private readonly accessKey: string, private readonly secret: string) {
    config.update({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secret
      }
    })
  }
}

describe('AwsS3FileStorage', () => {
  it('should config aws credentials on creation', () => {
    const accessKey = 'any_acess_key'
    const secret = 'any_secret'

    const sut = new AwsS3FileStorage(accessKey, secret)

    expect(sut).toBeDefined()
    expect(config.update).toHaveBeenCalledWith({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secret
      }
    })
    expect(config.update).toBeCalledTimes(1)
  })
})

import { UploadFile } from '@/domain/contracts/gateways'
import { config, S3 } from 'aws-sdk'

jest.mock('aws-sdk')

class AwsS3FileStorage {
  constructor (accessKey: string, secret: string, private readonly bucked: string) {
    config.update({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secret
      }
    })
  }

  async upload ({ key, file }: UploadFile.Input): Promise<void> {
    const s3 = new S3()
    await s3.putObject({
      Bucket: this.bucked,
      Key: key,
      Body: file,
      ACL: 'public-read'
    }).promise()
  }
}

describe('AwsS3FileStorage', () => {
  let sut: AwsS3FileStorage
  let accessKey: string
  let secret: string
  let bucked: string
  let key: string
  let file: Buffer
  let putObjectPromiseSpy: jest.Mock
  let putObjectSpy: jest.Mock

  beforeAll(() => {
    accessKey = 'any_acess_key'
    secret = 'any_secret'
    bucked = 'any_bucked'
    key = 'any_key'
    file = Buffer.from('any_buffer')
    putObjectPromiseSpy = jest.fn()
    putObjectSpy = jest.fn().mockImplementation(() => ({ promise: putObjectPromiseSpy }))
    jest.mocked(S3).mockImplementation(jest.fn().mockImplementation(() => ({
      putObject: putObjectSpy
    })))
  })

  beforeEach(() => {
    sut = new AwsS3FileStorage(accessKey, secret, bucked)
  })

  it('should config aws credentials on creation', () => {
    expect(sut).toBeDefined()
    expect(config.update).toHaveBeenCalledWith({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secret
      }
    })
    expect(config.update).toBeCalledTimes(1)
  })

  it('should call putObject with correct input', async () => {
    await sut.upload({ key, file })

    expect(putObjectSpy).toHaveBeenCalledWith({
      Bucket: bucked,
      Key: key,
      Body: file,
      ACL: 'public-read'
    })
    expect(putObjectSpy).toHaveBeenCalledTimes(1)
    expect(putObjectPromiseSpy).toHaveBeenCalledTimes(1)
  })
})

import { UniqueId } from '@/infra/geteways'

describe('UniqueId', () => {
  it('should call uuid.v4', () => {
    const sut = new UniqueId(new Date(2022, 9, 3, 10, 10, 10))

    const uuid = sut.uuid({ key: 'any_key' })

    expect(uuid).toBe('any_key_20221003101010')
  })

  it('should call uuid.v4', () => {
    const sut = new UniqueId(new Date(2018, 2, 10, 18, 1, 0))

    const uuid = sut.uuid({ key: 'any_key' })

    expect(uuid).toBe('any_key_20180310180100')
  })
})

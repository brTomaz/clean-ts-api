import * as bcrypt from 'bcrypt'
import BcryptAdapter from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (value: string): Promise<string> {
    return await new Promise(resolve => resolve('hashed_value'))
  }
}))

const SALT = 12

const makeSut = (): BcryptAdapter => {
  const sut = new BcryptAdapter(SALT)
  return sut
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', SALT)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hashed_value')
  })

  test('Should throw if bcrypt throws', async () => {
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const sut = makeSut()
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})

import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

interface SutTypes {
  sut: JwtAdapter
}

const makeSut = (): SutTypes => {
  const sut = new JwtAdapter('secret')
  return { sut }
}

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await Promise.resolve('any_token')
  }
}))

describe('JwtAdapter', () => {
  describe('sign()', () => {
    test('Should call sign with correct values', async () => {
      const { sut } = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toBeCalledWith({ id: 'any_id' }, 'secret')
    })

    test('Should return a token when sign succeeds', async () => {
      const { sut } = makeSut()
      const accessToken = await sut.encrypt('any_id')
      expect(accessToken).toBe('any_token')
    })

    test('Should throw if sign throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })
})

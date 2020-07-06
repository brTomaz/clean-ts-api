import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'
import { Collection } from 'mongodb'
import { AddAccountModel } from '../../../../domain/usecases/add-account'

let accountCollection: Collection

const makeFakeAccount = (): AddAccountModel => ({
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password'
})

describe('Account Mongo Repository', () => {
  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const sut = makeSut()
      const account = await sut.add(makeFakeAccount())
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@email.com')
      expect(account.password).toBe('any_password')
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on loadByEmail success', async () => {
      await accountCollection.insertOne(makeFakeAccount())
      const sut = makeSut()
      const account = await sut.loadByEmail('any_email@email.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@email.com')
      expect(account.password).toBe('any_password')
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeNull()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()
      const result = await accountCollection.insertOne(makeFakeAccount())
      const fakeAccount = result.ops[0]
      expect(result.ops[0].accessToken).toBeFalsy()
      await sut.updateAccessToken(fakeAccount._id, 'any_token')
      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe('any_token')
    })
  })
})

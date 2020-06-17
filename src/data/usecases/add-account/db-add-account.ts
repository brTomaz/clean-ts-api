import {
  AddAccount,
  AddAccountModel,
  AccountModel,
  Hasher
} from './db-add-account-protocols'
import { AddAccountRepository } from '../../protocols/db/account/add-account-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const encryptedPassword = await this.hasher.hash(accountData.password)
    const account = await this.addAccountRepository
      .add(Object.assign({}, accountData, { password: encryptedPassword }))
    return account
  }
}

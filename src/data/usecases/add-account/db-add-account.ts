import {
  AddAccount,
  AddAccountModel,
  AccountModel,
  Hasher,
  LoadAccountByEmailRepository
} from './db-add-account-protocols'
import { AddAccountRepository } from '../../protocols/db/account/add-account-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const { name, email, password } = accountData
    const encryptedPassword = await this.hasher.hash(password)
    await this.loadAccountByEmailRepository
      .loadByEmail(email)
    const account = await this.addAccountRepository
      .add(Object.assign({}, { name, email }, { password: encryptedPassword }))
    return account
  }
}

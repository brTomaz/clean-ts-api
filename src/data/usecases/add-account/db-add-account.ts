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
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (!account) {
      const encryptedPassword = await this.hasher.hash(password)
      const newAccount = await this.addAccountRepository
        .add(Object.assign({}, { name, email }, { password: encryptedPassword }))
      return newAccount
    }
    return null
  }
}

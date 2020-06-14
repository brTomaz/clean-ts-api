import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { HashComparator } from '../../protocols/cryptography/hash-comparator'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparator: HashComparator
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparator = hashComparator
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      await this.hashComparator.compare(authentication.password, account.password)
    }
    return null
  }
}

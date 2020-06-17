import { Validation } from '../../protocols/validation'
import { EmailValidator } from '../../controllers/signup/signup-controller-protocols'
import { InvalidParamError } from '../../errors'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error {
    if (!this.emailValidator.isValid(input[this.fieldName])) {
      return new InvalidParamError('email')
    }
  }
}

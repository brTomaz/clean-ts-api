import { Validation } from './validation'
import { EmailValidator } from '../../controllers/signup/signup-protocols'
import { InvalidParamError } from '../../errors'

export class EmailValidation implements Validation {
  constructor (private readonly fieldName: string,
    private readonly emailValidator: EmailValidator) {
    this.fieldName = fieldName
    this.emailValidator = emailValidator
  }

  validate (input: any): Error {
    if (!this.emailValidator.isValid(input[this.fieldName])) {
      return new InvalidParamError('email')
    }
  }
}

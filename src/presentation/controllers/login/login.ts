import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../../errors'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    if (!email) {
      return await new Promise(
        resolve => resolve(
          badRequest(new MissingParamError('email'))
        )
      )
    }

    if (!password) {
      return await new Promise(
        resolve => resolve(
          badRequest(new MissingParamError('password'))
        )
      )
    }

    const isValidEmail = this.emailValidator.isValid(email)

    if (!isValidEmail) {
      return await new Promise(
        resolve => resolve(
          badRequest(new InvalidParamError('email'))
        )
      )
    }
  }
}

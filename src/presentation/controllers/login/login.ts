import {
  Controller,
  HttpRequest,
  HttpResponse,
  Authentication
} from './login-protocols'
import {
  badRequest,
  serverError,
  unauthorizedError,
  ok
} from '../../helpers/http/http-helper'

import { Validation } from '../login/login-protocols'

export class LoginController implements Controller {
  private readonly authentication: Authentication
  private readonly validation: Validation

  constructor (authentication: Authentication, validation: Validation) {
    this.authentication = authentication
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      const error = this.validation.validate({ email, password })

      if (error) {
        return badRequest(error)
      }

      const accessToken = await this.authentication.auth(email, password)

      if (!accessToken) {
        return unauthorizedError()
      }

      return ok({
        accessToken
      })
    } catch (error) {
      return serverError(error)
    }
  }
}

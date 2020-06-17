import {
  Controller,
  HttpRequest,
  HttpResponse,
  Authentication
  , Validation
} from './login-controller-protocols'
import {
  badRequest,
  serverError,
  unauthorizedError,
  ok
} from '../../helpers/http/http-helper'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      const error = this.validation.validate({ email, password })

      if (error) {
        return badRequest(error)
      }

      const accessToken = await this.authentication.auth({ email, password })

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

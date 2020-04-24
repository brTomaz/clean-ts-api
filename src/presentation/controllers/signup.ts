import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/MissingParamError'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const { name, email } = httpRequest.body

    if (!name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}

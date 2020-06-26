import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from './add-survey-controller-protocols'
import { badRequest } from '../../../helpers/http/http-helper'

export class AddSurveyController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { question, answers } = httpRequest.body
    const error = this.validation.validate({ question, answers })
    if (error) {
      return badRequest(error)
    }
    return await Promise.resolve(null)
  }
}

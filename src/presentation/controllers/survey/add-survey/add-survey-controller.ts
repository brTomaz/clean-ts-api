import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from './add-survey-controller-protocols'
import {
  badRequest,
  serverError,
  noContent
} from '../../../helpers/http/http-helper'
import { AddSurvey } from '../../../../domain/usecases/add-survey'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { question, answers } = httpRequest.body
      const validationError = this.validation.validate({ question, answers })
      if (validationError) {
        return badRequest(validationError)
      }
      await this.addSurvey.add({ question, answers })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from './add-survey-controller-protocols'
import { badRequest } from '../../../helpers/http/http-helper'
import { AddSurvey } from '../../../../domain/usecases/add-survey'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { question, answers } = httpRequest.body
    const error = this.validation.validate({ question, answers })
    if (error) {
      return badRequest(error)
    }
    await this.addSurvey.add({ question, answers })
    return null
  }
}

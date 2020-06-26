import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { question, answers } = httpRequest.body
    this.validation.validate({ question, answers })
    return await Promise.resolve(null)
  }
}

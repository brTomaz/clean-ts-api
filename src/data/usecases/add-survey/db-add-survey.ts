import {
  AddSurveyModel,
  AddSurvey,
  AddSurveyRepository
} from './db-add-survey-protocols'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {}

  async add (surveyData: AddSurveyModel): Promise<void> {
    const { question, answers } = surveyData
    await this.addSurveyRepository.add({ question, answers })
  }
}

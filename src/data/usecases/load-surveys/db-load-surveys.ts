import { LoadSurveys } from '../../../domain/usecases/load-surveys'
import { LoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository'
import { SurveyModel } from '../../../domain/models/survey'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveys: LoadSurveysRepository) {}

  async load (): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveys.loadAll()
    return surveys
  }
}

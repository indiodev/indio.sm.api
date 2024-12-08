import Model from '#models/code.model'
import { CodeRepository } from '#repositories/interfaces/code.repository'

export default class LucidCodeRepository implements CodeRepository<typeof Model> {
  constructor() {}

  async findByIdentifier(identifier: string): Promise<Model | null> {
    return await Model.query().where('identifier', identifier).first()
  }
}

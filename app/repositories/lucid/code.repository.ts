import CodeRepository from '#contracts/code.repository'
import Model from '#models/code.model'

export default class LucidCodeRepository implements CodeRepository {
  constructor() {}

  async findByIdentifier(identifier: string): Promise<Model | null> {
    return await Model.query().where('identifier', identifier).first()
  }
}

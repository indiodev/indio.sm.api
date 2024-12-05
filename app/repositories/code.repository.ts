import { Find } from '#dtos/base.dto'
import Model from '#models/code.model'
import stringHelpers from '@adonisjs/core/helpers/string'
import ApplicationException from '#exceptions/application.exception'

export default class CodeRepository {
  constructor() {}

  async findBy({ ...payload }: Find<typeof Model>): Promise<Model | null> {
    const keys = Object.keys(payload)

    if (keys.length === 0) return null

    if (keys.length > 1)
      throw new ApplicationException('Apenas um parâmetro é permitido', {
        cause: 'Only one parameter is allowed',
        code: 'ONLY_ONE_PARAMETER_IS_ALLOWED',
        status: 400,
      })

    const [value] = Object.values(payload).map((item) => item !== null && item)
    const [key] = Object.keys(payload).map((k) => stringHelpers.snakeCase(k))
    const entity = await Model?.query().where(key, value).first()

    if (!entity) return null

    return entity
  }
}

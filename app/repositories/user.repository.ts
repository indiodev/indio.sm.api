import { Create, Find, Paginate, Update } from '#dtos/base.dto'
import ApplicationException from '#exceptions/application.exception'
import Model from '#models/user.model'
import stringHelpers from '@adonisjs/core/helpers/string'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class UserRepository {
  constructor() {}

  async create(payload: Create<typeof Model>): Promise<Model> {
    const entity = await Model.create(payload)
    return entity
  }

  async update(payload: Update<typeof Model>): Promise<Model> {
    const entity = await Model.query().where('id', payload?.id!).firstOrFail()
    entity?.merge(payload)
    return await entity?.save()
  }

  async delete(payload: Pick<Find<typeof Model>, 'id'>): Promise<void> {
    const entity = await Model.query().where('id', payload?.id!).firstOrFail()
    return await entity?.delete()
  }

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

  async paginate(payload: Paginate<typeof Model>): Promise<ModelPaginatorContract<Model>> {
    return await Model.query()
      .if(payload.search, (query) =>
        query.whereILike('name', `%${payload.search}%`).orWhereILike('email', `%${payload.search}%`)
      )
      .paginate(payload.page!, payload.per_page)
  }
}

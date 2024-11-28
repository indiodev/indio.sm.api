import { Create, Find, Paginate, Update } from '#dtos/base.dto'
import ApplicationException from '#exceptions/application.exception'
import Model from '#models/course.model'
import stringHelpers from '@adonisjs/core/helpers/string'
import db from '@adonisjs/lucid/services/db'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class CourseRepository {
  constructor() {}

  async create(payload: Create<typeof Model>): Promise<Model> {
    return db.transaction(async (client) => {
      return await Model.create(payload, { client })
    })
  }

  async update(payload: Update<typeof Model>): Promise<Model> {
    return await db.transaction(async function (client) {
      const entity = await Model.query({ client }).where('id', payload?.id!).firstOrFail()
      entity?.merge(payload)
      return await entity?.save()
    })
  }

  async delete(payload: Pick<Find<typeof Model>, 'id'>): Promise<void> {
    return await db.transaction(async function (client) {
      const entity = await Model.query({ client }).where('id', payload?.id!).firstOrFail()
      return await entity?.delete()
    })
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

  async paginate({
    page = 1,
    per_page = 15,
  }: Paginate<typeof Model>): Promise<ModelPaginatorContract<Model>> {
    return await Model.query().paginate(page, per_page)
  }
}

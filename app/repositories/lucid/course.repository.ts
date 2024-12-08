import { Create, QueryPaginate, Update } from '#dtos/base.dto'
import Model from '#models/course.model'
import { CourseRepository } from '#repositories/interfaces/course.repository'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class LucidCourseRepository implements CourseRepository<typeof Model> {
  constructor() {}

  async create(payload: Create<typeof Model>): Promise<Model> {
    return await Model.create(payload)
  }

  async update(payload: Update<typeof Model>): Promise<Model> {
    const entity = await Model.query().where('id', payload?.id!).firstOrFail()
    entity?.merge(payload)
    return await entity?.save()
  }

  async delete(id: number): Promise<void> {
    const entity = await Model.query().where('id', id!).firstOrFail()
    return await entity?.delete()
  }

  async paginate(query: QueryPaginate<typeof Model>): Promise<ModelPaginatorContract<Model>> {
    return await Model.query().paginate(query.page!, query.per_page)
  }
}

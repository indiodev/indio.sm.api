import { Create, QueryPaginate, Update } from '#dtos/base.dto'
import Model from '#models/user.model'
import { UserRepository } from '#repositories/interfaces/user.repository'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class LucidUserRepository implements UserRepository<typeof Model> {
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

  async delete(id: number): Promise<void> {
    const entity = await Model.query().where('id', id!).firstOrFail()
    return await entity?.delete()
  }

  async paginate(query: QueryPaginate<typeof Model>): Promise<ModelPaginatorContract<Model>> {
    return await Model.query()
      .if(query.search, (q) =>
        q.whereILike('name', `%${query.search}%`).orWhereILike('email', `%${query.search}%`)
      )
      .paginate(query.page!, query.per_page)
  }

  async findByEmail(email: string): Promise<Model | null> {
    return await Model.query().where('email', email).first()
  }

  async findById(id: number): Promise<Model | null> {
    return await Model.query().where('id', id).first()
  }
}

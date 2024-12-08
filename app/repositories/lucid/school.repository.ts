import { Create, QueryPaginate, Update } from '#dtos/base.dto'
import Model from '#models/school.model'
import { SchoolRepository } from '#repositories/interfaces/school.repository'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class LucidSchoolRepository implements SchoolRepository<typeof Model> {
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
      .select(['id', 'phone', 'cnpj', 'user_id'])
      .if(query.search, (s) =>
        s
          .whereILike('phone', `%${query.search}%`)
          .orWhereILike('cnpj', `%${query.search}%`)
          .orWhereHas('user', (u) =>
            u.whereILike('name', `%${query.search}%`).orWhereILike('email', `%${query.search}%`)
          )
      )
      .preload('user', (u) => u.select('id', 'name', 'email'))
      .paginate(query.page!, query.per_page)
  }

  async findByCNPJ(cnpj: string): Promise<Model | null> {
    return await Model.query().where('cnpj', cnpj).first()
  }
}

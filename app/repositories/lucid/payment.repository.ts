import { Create, QueryPaginate, Update } from '#dtos/base.dto'
import Model from '#models/payment.model'
import { PaymentRepository } from '#repositories/interfaces/payment.repository'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class LucidPaymentRepository implements PaymentRepository<typeof Model> {
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
      .select(['id', 'date', 'status', 'responsible_id'])
      .if(query.search, (s) =>
        s.whereHas('responsible', (r) =>
          r
            .whereILike('phone', `%${query.search}%`)
            .orWhereILike('cpf', `%${query.search}%`)
            .orWhereHas('user', (u) =>
              u.whereILike('name', `%${query.search}%`).orWhereILike('email', `%${query.search}%`)
            )
        )
      )
      .preload('responsible', (r) =>
        r
          .select(['id', 'phone', 'cpf', 'user_id'])
          .preload('user', (u) => u.select(['id', 'name', 'email']))
      )
      .paginate(query.page!, query.per_page)
  }

  async findById(id: number): Promise<Model | null> {
    return await Model.query().where('id', id).first()
  }
}

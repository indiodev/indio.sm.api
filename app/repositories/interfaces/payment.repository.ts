import { Create, QueryPaginate, Update } from '#dtos/base.dto'
import { LucidModel, ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export interface PaymentRepository<T extends LucidModel> {
  create(payload: Create<T>): Promise<InstanceType<T>>
  update(payload: Update<T>): Promise<InstanceType<T>>
  delete(id: number): Promise<void>
  paginate(query: QueryPaginate<T>): Promise<ModelPaginatorContract<InstanceType<T>>>

  findById(id: number): Promise<InstanceType<T> | null>
}

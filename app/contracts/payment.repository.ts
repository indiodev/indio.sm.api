import { Create, QueryPaginate, Update } from '#dtos/base.dto'
import Payment from '#models/payment.model'
import { inject } from '@adonisjs/core'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

@inject()
export default abstract class PaymentRepository {
  abstract create(payload: Create<typeof Payment>): Promise<InstanceType<typeof Payment>>
  abstract update(payload: Update<typeof Payment>): Promise<InstanceType<typeof Payment>>
  abstract delete(id: number): Promise<void>
  abstract paginate(
    query: QueryPaginate<typeof Payment>
  ): Promise<ModelPaginatorContract<InstanceType<typeof Payment>>>

  abstract findById(id: number): Promise<InstanceType<typeof Payment> | null>
}

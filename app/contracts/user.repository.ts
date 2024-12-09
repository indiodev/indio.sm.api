import { Create, QueryPaginate, Update } from '#dtos/base.dto'
import User from '#models/user.model'
import { inject } from '@adonisjs/core'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

@inject()
export default abstract class UserRepository {
  abstract create(payload: Create<typeof User>): Promise<InstanceType<typeof User>>
  abstract update(payload: Update<typeof User>): Promise<InstanceType<typeof User>>
  abstract delete(id: number): Promise<void>
  abstract paginate(
    query: QueryPaginate<typeof User>
  ): Promise<ModelPaginatorContract<InstanceType<typeof User>>>

  abstract findByEmail(email: string): Promise<InstanceType<typeof User> | null>
  abstract findById(id: number): Promise<InstanceType<typeof User> | null>
}

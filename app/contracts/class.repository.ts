import { Create, Query, QueryPaginate, Update } from '#dtos/base.dto'
import Class from '#models/class.model'
import { inject } from '@adonisjs/core'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

@inject()
export default abstract class ClassRepository {
  abstract create(payload: Create<typeof Class>): Promise<InstanceType<typeof Class>>
  abstract update(payload: Update<typeof Class>): Promise<InstanceType<typeof Class>>
  abstract delete(id: number): Promise<void>
  abstract paginate(
    query: QueryPaginate<typeof Class>
  ): Promise<ModelPaginatorContract<InstanceType<typeof Class>>>

  abstract list(query: Query<typeof Class>): Promise<InstanceType<typeof Class>[] | null>

  abstract findById(id: number): Promise<InstanceType<typeof Class> | null>
}

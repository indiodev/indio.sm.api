import { Create, QueryPaginate, Update } from '#dtos/base.dto'
import Responsible from '#models/responsible.model'
import { inject } from '@adonisjs/core'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

@inject()
export default abstract class ResponsibleRepository {
  abstract create(payload: Create<typeof Responsible>): Promise<InstanceType<typeof Responsible>>
  abstract update(payload: Update<typeof Responsible>): Promise<InstanceType<typeof Responsible>>
  abstract delete(id: number): Promise<void>
  abstract paginate(
    query: QueryPaginate<typeof Responsible>
  ): Promise<ModelPaginatorContract<InstanceType<typeof Responsible>>>

  abstract findByCPF(cpf: string): Promise<InstanceType<typeof Responsible> | null>
}

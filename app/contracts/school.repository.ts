import { Create, QueryPaginate, Update } from '#dtos/base.dto'
import School from '#models/school.model'
import { inject } from '@adonisjs/core'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

@inject()
export default abstract class SchoolRepository {
  abstract create(payload: Create<typeof School>): Promise<InstanceType<typeof School>>
  abstract update(payload: Update<typeof School>): Promise<InstanceType<typeof School>>
  abstract delete(id: number): Promise<void>
  abstract paginate(
    query: QueryPaginate<typeof School>
  ): Promise<ModelPaginatorContract<InstanceType<typeof School>>>

  abstract findByCNPJ(cnpj: string): Promise<InstanceType<typeof School> | null>

  abstract findBySlug(cnpj: string): Promise<InstanceType<typeof School> | null>
}

import { Create, QueryPaginate, Update } from '#dtos/base.dto'
import Student from '#models/student.model'
import { inject } from '@adonisjs/core'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

@inject()
export default abstract class StudentRepository {
  abstract create(payload: Create<typeof Student>): Promise<InstanceType<typeof Student>>
  abstract update(payload: Update<typeof Student>): Promise<InstanceType<typeof Student>>
  abstract delete(id: number): Promise<void>
  abstract paginate(
    query: QueryPaginate<typeof Student>
  ): Promise<ModelPaginatorContract<InstanceType<typeof Student>>>

  abstract findByCPF(cpf: string): Promise<InstanceType<typeof Student> | null>
}

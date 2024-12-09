import { Create, QueryPaginate, Update } from '#dtos/base.dto'
import Course from '#models/course.model'
import { inject } from '@adonisjs/core'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

@inject()
export default abstract class CourseRepository {
  abstract create(payload: Create<typeof Course>): Promise<InstanceType<typeof Course>>
  abstract update(payload: Update<typeof Course>): Promise<InstanceType<typeof Course>>
  abstract delete(id: number): Promise<void>
  abstract paginate(
    query: QueryPaginate<typeof Course>
  ): Promise<ModelPaginatorContract<InstanceType<typeof Course>>>
}

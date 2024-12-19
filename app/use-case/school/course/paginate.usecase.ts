import { SchoolCoursePaginate } from '#dtos/school.dto'
import ApplicationException from '#exceptions/application.exception'
import Course from '#models/course.model'
import { inject } from '@adonisjs/core'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

@inject()
export class SchoolCoursePaginateUseCase {
  constructor() {}

  async execute({
    school,
    ...query
  }: SchoolCoursePaginate): Promise<ModelPaginatorContract<Course>> {
    if (!school)
      throw new ApplicationException('Escola não encontrada', {
        cause: 'School not found',
        code: 'SCHOOL_NOT_FOUND',
        status: 404,
      })

    return await school
      ?.related('courses')
      .query()
      // .preload('user')
      .paginate(query.page!, query.per_page)
  }
}

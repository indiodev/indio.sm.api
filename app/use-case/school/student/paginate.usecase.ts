import { SchoolStudentPaginate } from '#dtos/school.dto'
import ApplicationException from '#exceptions/application.exception'
import Student from '#models/student.model'
import { inject } from '@adonisjs/core'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

@inject()
export class SchoolStudentPaginateUseCase {
  constructor() {}

  async execute({
    school,
    ...query
  }: SchoolStudentPaginate): Promise<ModelPaginatorContract<Student>> {
    if (!school)
      throw new ApplicationException('Estudante não encontrado', {
        cause: 'Student not found',
        code: 'STUDENT_NOT_FOUND',
        status: 404,
      })

    return await school
      ?.related('students')
      .query()
      .preload('user')
      .paginate(query.page!, query.per_page)
  }
}

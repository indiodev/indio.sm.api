import { SchoolResponsiblePaginate } from '#dtos/school.dto'
import ApplicationException from '#exceptions/application.exception'
import Responsible from '#models/responsible.model'
import { inject } from '@adonisjs/core'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

@inject()
export class SchoolResponsiblePaginateUseCase {
  constructor() {}

  async execute({
    school,
    ...query
  }: SchoolResponsiblePaginate): Promise<ModelPaginatorContract<Responsible>> {
    if (!school)
      throw new ApplicationException('Escola não encontrada', {
        cause: 'School not found',
        code: 'SCHOOL_NOT_FOUND',
        status: 404,
      })

    return await school
      ?.related('responsibles')
      .query()
      .preload('user')
      .paginate(query.page!, query.per_page)
  }
}

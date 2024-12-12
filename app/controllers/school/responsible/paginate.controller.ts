import { MakeSchoolResponsiblePaginateFactory } from '#factories/school/responsible/paginate.factory'
import { SchoolResponsiblePaginateUseCase } from '#use-case/school/responsible/paginate.usecase'
import { BaseQueryPaginateValidator } from '#validators/query.validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class SchoolResponsiblePaginateController {
  private useCase: SchoolResponsiblePaginateUseCase
  constructor() {
    this.useCase = MakeSchoolResponsiblePaginateFactory()
  }

  async handle({ request, response, auth }: HttpContext): Promise<void> {
    const {
      page = 1,
      per_page = 15,
      ...query
    } = await BaseQueryPaginateValidator.validate(request.qs())

    const school = await auth?.user?.related('school').query().first()
    const result = await this.useCase.execute({
      ...query,
      page,
      per_page,
      school,
    })
    return response.ok(result)
  }
}

import { MakeSchoolCoursePaginateFactory } from '#factories/school/course/paginate.factory'
import { SchoolCoursePaginateUseCase } from '#use-case/school/course/paginate.usecase'
import { BaseQueryPaginateValidator } from '#validators/query.validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class SchoolCoursePaginateController {
  private useCase: SchoolCoursePaginateUseCase
  constructor() {
    this.useCase = MakeSchoolCoursePaginateFactory()
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

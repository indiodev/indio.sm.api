import { MakeSchoolDashboardFactory } from '#factories/school/dashboard.factory'
import { SchoolDashboardUseCase } from '#use-case/school/dashboard.usecase'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class SchoolDashboardController {
  private useCase: SchoolDashboardUseCase
  constructor() {
    this.useCase = MakeSchoolDashboardFactory()
  }

  async handle({ response, auth }: HttpContext): Promise<void> {
    const school = await auth?.user?.related('school').query().first()
    const result = await this.useCase.execute({
      school,
    })
    return response.ok(result)
  }
}

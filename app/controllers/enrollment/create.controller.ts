import { MakeEnrollmentCreateFactory } from '#factories/enrollment/create.factory'
import EnrollmentCreateUseCase from '#use-case/enrollment/create.usecase'
import { CreateEnrollmentValidator } from '#validators/enrollment.validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class EnrollmentCreateController {
  private useCase: EnrollmentCreateUseCase
  constructor() {
    this.useCase = MakeEnrollmentCreateFactory()
  }

  async handle({ request, response }: HttpContext): Promise<void> {
    const payload = await request.validateUsing(CreateEnrollmentValidator)
    const result = await this.useCase.execute(payload)
    return response.ok(result)
  }
}

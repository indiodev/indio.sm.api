/* eslint-disable @unicorn/filename-case */
import { MakeEnrollmentCreateOrUpdateFactory } from '#factories/enrollment/create-or-update.factory'
import EnrollmentCreateOrUpdateUseCase from '#use-case/enrollment/create-or-update.usecase'
import { EnrollmentValidator } from '#validators/enrollment.validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class EnrollmentCreateOrUpdateController {
  private useCase: EnrollmentCreateOrUpdateUseCase
  constructor() {
    this.useCase = MakeEnrollmentCreateOrUpdateFactory()
  }

  async handle({ request, response }: HttpContext): Promise<void> {
    const payload = await request.validateUsing(EnrollmentValidator)
    const result = await this.useCase.execute(payload)
    return response.ok(result)
  }
}

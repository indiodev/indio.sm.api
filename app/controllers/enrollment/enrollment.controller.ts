import EnrollmentService from '#services/enrollment/enrollment.service'
import { EnrollmentValidator } from '#validators/enrollment.validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class EnrollmentController {
  constructor(private enrollmentService: EnrollmentService) {}

  async createOrUpdate({ request, response }: HttpContext): Promise<void> {
    const payload = await request.validateUsing(EnrollmentValidator)
    const result = await this.enrollmentService.createOrUpdate(payload)
    return response.ok(result)
  }
}

import { MakeEnrollmentSchoolFindFactory } from '#factories/enrollment/school/find.factory'
import EnrollmentSchoolFindUseCase from '#use-case/enrollment/school/find.usecase'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

@inject()
export default class EnrollmentSchoolFindController {
  private usecase: EnrollmentSchoolFindUseCase
  constructor() {
    this.usecase = MakeEnrollmentSchoolFindFactory()
  }

  async handle({ request, response }: HttpContext): Promise<void> {
    const { slug } = await vine
      .compile(
        vine.object({
          slug: vine.string().trim(),
        })
      )
      .validate(request.params())

    const result = await this.usecase.execute({ slug })
    return response.ok(result)
  }
}

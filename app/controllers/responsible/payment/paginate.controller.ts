import { MakeResponsiblePaymentPaginateFactory } from '#factories/responsible/payment/paginate.factory'
import { ResponsiblePaymentPaginateUseCase } from '#use-case/responsible/payment/paginate.usecase'
import { BaseQueryPaginateValidator } from '#validators/query.validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ResponsiblePaymentPaginateController {
  private useCase: ResponsiblePaymentPaginateUseCase
  constructor() {
    this.useCase = MakeResponsiblePaymentPaginateFactory()
  }

  async handle({ request, response, auth }: HttpContext): Promise<void> {
    const {
      page = 1,
      per_page = 15,
      ...query
    } = await BaseQueryPaginateValidator.validate(request.qs())

    const responsible = await auth?.user?.related('responsible').query().first()
    const result = await this.useCase.execute({
      ...query,
      page,
      per_page,
      responsible,
    })
    return response.ok(result)
  }
}

import { MakeAdministratorPaymentPaginateFactory } from '#factories/administrator/payment/paginate.factory'
import AdministratorPaymentPaginateUseCase from '#use-case/administrator/payment/paginate.usecase'
import { BaseQueryPaginateValidator } from '#validators/query.validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AdministratorPaymentPaginateController {
  private useCase: AdministratorPaymentPaginateUseCase
  constructor() {
    this.useCase = MakeAdministratorPaymentPaginateFactory()
  }

  async handle({ request, response }: HttpContext): Promise<void> {
    const {
      page = 1,
      per_page = 15,
      ...query
    } = await BaseQueryPaginateValidator.validate(request.qs())

    const result = await this.useCase.execute({
      ...query,
      page,
      per_page,
    })
    return response.ok(result)
  }
}

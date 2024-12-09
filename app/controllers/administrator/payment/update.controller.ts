import { MakeAdministratorPaymentUpdateFactory } from '#factories/administrator/payment/update.factory'
import { AdministratorPaymentUpdateUseCase } from '#use-case/administrator/payment/update.usecase'
import { PaymentUpdateValidator } from '#validators/payment.validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
@inject()
export default class AdministratorPaymentUpdateController {
  private useCase: AdministratorPaymentUpdateUseCase
  constructor() {
    this.useCase = MakeAdministratorPaymentUpdateFactory()
  }

  async handle({ request, response }: HttpContext): Promise<void> {
    const { id } = await PaymentUpdateValidator.validate(request.params())
    const payload = await request.validateUsing(PaymentUpdateValidator)

    await this.useCase.execute({
      ...payload,
      id,
    })

    return response.noContent()
  }
}

import { AdministratorPaymentService } from '#services/administrator/payment/payment.service'
import { PaymentUpdateValidator } from '#validators/payment.validator'
import { BasePaginateValidator } from '#validators/query.validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
@inject()
export default class AdministratorPaymentController {
  constructor(private paymentService: AdministratorPaymentService) {}

  async paginate({ request, response }: HttpContext): Promise<void> {
    const { page = 1, per_page = 15, ...query } = await BasePaginateValidator.validate(request.qs())

    const result = await this.paymentService.paginate({
      ...query,
      page,
      per_page,
    })
    return response.ok(result)
  }

  async update({ request, response }: HttpContext): Promise<void> {
    const { id } = await PaymentUpdateValidator.validate(request.params())
    const payload = await request.validateUsing(PaymentUpdateValidator)

    await this.paymentService.update({
      ...payload,
      id,
    })

    return response.noContent()
  }
}

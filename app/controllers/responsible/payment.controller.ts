import { ResponsiblePaymentService } from '#services/responsible/payment.service'
import { BasePaginateValidator } from '#validators/query.validator'
import { ResponsibleUploadPaymentDocumentValidator } from '#validators/responsible.validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ResponsiblePaymentController {
  constructor(private paymentService: ResponsiblePaymentService) {}

  async paginate({ request, response, auth }: HttpContext): Promise<void> {
    const { page = 1, per_page = 15, ...query } = await BasePaginateValidator.validate(request.qs())

    const responsible = await auth?.user?.related('responsible').query().first()
    const result = await this.paymentService.paginate({
      ...query,
      page,
      per_page,
      responsible,
    })
    return response.ok(result)
  }

  async uploadProofOfPaymentDocument({ request, response, auth }: HttpContext): Promise<void> {
    const { id } = await ResponsibleUploadPaymentDocumentValidator.validate(request.params())
    const { document } = await request.validateUsing(ResponsibleUploadPaymentDocumentValidator)

    const responsible = await auth?.user?.related('responsible').query().first()
    const result = await this.paymentService.uploadProofOfPaymentDocument({
      responsible,
      document,
      id,
    })
    return response.ok(result)
  }
}

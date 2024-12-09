/* eslint-disable @unicorn/filename-case */
import { MakeResponsiblePaymentUploadReceiptDocumentFactory } from '#factories/responsible/payment/upload-receipt-document.factory'
import ResponsiblePaymentUploadReceiptDocumentUseCase from '#use-case/responsible/payment/upload-receipt-document.usecase'
import { ResponsibleUploadPaymentDocumentValidator } from '#validators/responsible.validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ResponsiblePaymentUploadReceiptController {
  private useCase: ResponsiblePaymentUploadReceiptDocumentUseCase
  constructor() {
    this.useCase = MakeResponsiblePaymentUploadReceiptDocumentFactory()
  }

  async handle({ request, response, auth }: HttpContext): Promise<void> {
    const { id } = await ResponsibleUploadPaymentDocumentValidator.validate(request.params())
    const { document } = await request.validateUsing(ResponsibleUploadPaymentDocumentValidator)

    const responsible = await auth?.user?.related('responsible').query().first()
    const result = await this.useCase.execute({
      responsible,
      document,
      id,
    })
    return response.ok(result)
  }
}

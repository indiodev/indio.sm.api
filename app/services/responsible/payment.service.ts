import { ResponsiblePaymentPaginate, ResponsibleUploadPaymentDocument } from '#dtos/responsible.dto'
import ApplicationException from '#exceptions/application.exception'
import Payment from '#models/payment.model'
import { StoreProvider } from '#providers/store.provider'
import { PaymentStatus } from '#utils/enum.util'
import { inject } from '@adonisjs/core'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

@inject()
export class ResponsiblePaymentService {
  constructor(private storeProvider: StoreProvider) {}

  async uploadProofOfPaymentDocument({
    responsible,
    ...payload
  }: ResponsibleUploadPaymentDocument): Promise<void> {
    if (!payload.document)
      throw new ApplicationException('Documento não informado', {
        cause: 'Document not found',
        code: 'DOCUMENT_NOT_FOUND',
        status: 404,
      })

    const payment = await responsible?.related('payments').query().where('id', payload.id!).first()

    if (!payment)
      throw new ApplicationException('Pagamento não encontrado', {
        cause: 'Payment not found',
        code: 'PAYMENT_NOT_FOUND',
        status: 404,
      })

    const [document] = await this.storeProvider.upload(
      [{ file: payload.document, identifier: 'proof_of_payment' }],
      'payments'
    )

    await payment.merge({ status: PaymentStatus.ANALYSIS, proof_of_payment: document.url }).save()
  }

  async paginate({
    responsible,
    ...query
  }: ResponsiblePaymentPaginate): Promise<ModelPaginatorContract<Payment>> {
    if (!responsible)
      throw new ApplicationException('Responsável não encontrado', {
        cause: 'Responsible not found',
        code: 'RESPONSIBLE_NOT_FOUND',
        status: 404,
      })

    return await responsible?.related('payments').query().paginate(query.page!, query.per_page)
  }
}

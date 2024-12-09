/* eslint-disable @unicorn/filename-case */
import { ResponsibleUploadPaymentDocument } from '#dtos/responsible.dto'
import ApplicationException from '#exceptions/application.exception'
import StoreService from '#services/store.service'
import { PaymentStatus } from '#utils/enum.util'

export default class ResponsiblePaymentUploadReceiptDocumentUseCase {
  constructor(private storeService: StoreService) {}
  async execute({ responsible, ...payload }: ResponsibleUploadPaymentDocument): Promise<void> {
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

    const [document] = await this.storeService.upload(
      [{ file: payload.document, identifier: 'proof_of_payment' }],
      'payments'
    )

    await payment.merge({ status: PaymentStatus.ANALYSIS, proof_of_payment: document.url }).save()
  }
}

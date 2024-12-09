/* eslint-disable @unicorn/filename-case */
import StoreService from '#services/store.service'
import ResponsiblePaymentUploadReceiptDocumentUseCase from '#use-case/responsible/payment/upload-receipt-document.usecase'

export function MakeResponsiblePaymentUploadReceiptDocumentFactory(): ResponsiblePaymentUploadReceiptDocumentUseCase {
  return new ResponsiblePaymentUploadReceiptDocumentUseCase(new StoreService())
}

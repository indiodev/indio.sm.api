import { PaymentUpdate } from '#dtos/payment.dto'
import ApplicationException from '#exceptions/application.exception'
import PaymentRepository from '#repositories/lucid/payment.repository'
import { inject } from '@adonisjs/core'

@inject()
export class AdministratorPaymentUpdateUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(payload: PaymentUpdate): Promise<void> {
    const payment = await this.paymentRepository.findById(payload.id!)

    if (!payment)
      throw new ApplicationException('Mensalidade não encontrada', {
        cause: 'Payment not found',
        code: 'PAYMENT_NOT_FOUND',
        status: 404,
      })

    await payment.merge(payload).save()
  }
}

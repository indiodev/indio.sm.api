import { PaymentUpdate } from '#dtos/payment.dto'
import { BasePaginate } from '#dtos/query.dto'
import ApplicationException from '#exceptions/application.exception'
import Payment from '#models/payment.model'
import PaymentRepository from '#repositories/payment.repository'
import { inject } from '@adonisjs/core'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

@inject()
export class AdministratorPaymentService {
  constructor(private paymentRepository: PaymentRepository) {}

  async paginate(query: BasePaginate): Promise<ModelPaginatorContract<Payment>> {
    return await this.paymentRepository.paginate(query)
  }

  async update(payload: PaymentUpdate): Promise<void> {
    const payment = await this.paymentRepository.findBy({ id: payload.id })

    if (!payment)
      throw new ApplicationException('Mensalidade não encontrada', {
        cause: 'Payment not found',
        code: 'PAYMENT_NOT_FOUND',
        status: 404,
      })

    await payment.merge(payload).save()
  }
}

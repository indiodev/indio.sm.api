import PaymentRepository from '#contracts/payment.repository'
import { BaseQueryPaginate } from '#dtos/query.dto'
import Payment from '#models/payment.model'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class AdministratorPaymentPaginateUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(query: BaseQueryPaginate): Promise<ModelPaginatorContract<Payment>> {
    return await this.paymentRepository.paginate(query)
  }
}

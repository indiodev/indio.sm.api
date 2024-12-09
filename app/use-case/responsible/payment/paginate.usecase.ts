import { ResponsiblePaymentPaginate } from '#dtos/responsible.dto'
import ApplicationException from '#exceptions/application.exception'
import Payment from '#models/payment.model'
import { inject } from '@adonisjs/core'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

@inject()
export class ResponsiblePaymentPaginateUseCase {
  constructor() {}

  async execute({
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

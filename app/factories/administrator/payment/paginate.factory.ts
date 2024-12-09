import LucidPaymentRepository from '#repositories/lucid/payment.repository'
import AdministratorPaymentPaginateUseCase from '#use-case/administrator/payment/paginate.usecase'

export function MakeAdministratorPaymentPaginateFactory(): AdministratorPaymentPaginateUseCase {
  return new AdministratorPaymentPaginateUseCase(new LucidPaymentRepository())
}

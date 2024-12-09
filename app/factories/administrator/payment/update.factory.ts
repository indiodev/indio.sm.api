import LucidPaymentRepository from '#repositories/lucid/payment.repository'
import { AdministratorPaymentUpdateUseCase } from '#use-case/administrator/payment/update.usecase'

export function MakeAdministratorPaymentUpdateFactory(): AdministratorPaymentUpdateUseCase {
  return new AdministratorPaymentUpdateUseCase(new LucidPaymentRepository())
}

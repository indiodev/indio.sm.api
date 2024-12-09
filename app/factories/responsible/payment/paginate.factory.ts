import { ResponsiblePaymentPaginateUseCase } from '#use-case/responsible/payment/paginate.usecase'

export function MakeResponsiblePaymentPaginateFactory(): ResponsiblePaymentPaginateUseCase {
  return new ResponsiblePaymentPaginateUseCase()
}

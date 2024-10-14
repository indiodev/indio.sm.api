import { BasePaginate } from '#dtos/query.dto'
import Responsible from '#models/responsible.model'
import { PaymentUpdateSchema } from '#validators/payment.validator'
import { Infer } from '@vinejs/vine/types'

export type ResponsiblePaymentPaginate = BasePaginate & { responsible?: Responsible | null }
export type PaymentUpdate = Infer<typeof PaymentUpdateSchema>

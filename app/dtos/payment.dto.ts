import { PaymentUpdateSchema } from '#validators/payment.validator'
import { Infer } from '@vinejs/vine/types'

export type PaymentUpdate = Infer<typeof PaymentUpdateSchema>

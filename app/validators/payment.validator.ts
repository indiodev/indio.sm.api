import { PaymentStatus } from '#utils/enum.util'
import vine from '@vinejs/vine'

export const PaymentUpdateSchema = vine.object({
  status: vine.enum(PaymentStatus).optional(),
  id: vine.number().positive().optional(),
})

export const PaymentUpdateValidator = vine.compile(PaymentUpdateSchema)

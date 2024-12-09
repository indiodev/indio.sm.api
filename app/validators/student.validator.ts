import { NumberNormalizer } from '#utils/function.util'
import vine from '@vinejs/vine'

export const StudentSchema = vine.object({
  phone: vine.string().trim().transform(NumberNormalizer),
  cpf: vine.string().trim().transform(NumberNormalizer),
})

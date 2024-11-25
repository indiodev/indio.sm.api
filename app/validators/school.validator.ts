import { NumberNormalizer } from '#utils/function.util'
import vine from '@vinejs/vine'

export const SchoolSchema = vine.object({
  phone: vine.string().trim().transform(NumberNormalizer),
  cnpj: vine.string().trim().transform(NumberNormalizer),
})

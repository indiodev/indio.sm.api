import { NumberNormalizer } from '#utils/function.util'
import vine from '@vinejs/vine'

export const AddressSchema = vine.object({
  cep: vine.string().trim().transform(NumberNormalizer),
  uf: vine.string().trim(),
  city: vine.string().trim(),
  number: vine.string().trim().optional(),
  neighborhood: vine.string().trim(),
  logradouro: vine.string().trim().optional(),
  complement: vine.string().optional(),
  locality: vine.string().optional(),
})

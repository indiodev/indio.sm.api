import { NumberNormalizer } from '#utils/function.util'
import vine from '@vinejs/vine'

export const ResponsibleSchema = vine.object({
  phone: vine.string().trim().transform(NumberNormalizer),
  cpf: vine.string().trim().transform(NumberNormalizer),
})

export const ResponsibleUploadPaymentDocumentSchema = vine.object({
  document: vine.file().optional(),
  id: vine.number().positive().optional(),
})

export const ResponsibleValidator = vine.compile(ResponsibleSchema)
export const ResponsibleUploadPaymentDocumentValidator = vine.compile(
  ResponsibleUploadPaymentDocumentSchema
)

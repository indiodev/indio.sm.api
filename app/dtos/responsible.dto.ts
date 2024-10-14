import { BasePaginate } from '#dtos/query.dto'
import Responsible from '#models/responsible.model'
import { ResponsibleUploadPaymentDocumentSchema } from '#validators/responsible.validator'
import { Infer } from '@vinejs/vine/types'

export type ResponsibleUploadPaymentDocument = Infer<
  typeof ResponsibleUploadPaymentDocumentSchema
> & { responsible?: Responsible | null }

export type ResponsiblePaymentPaginate = BasePaginate & { responsible?: Responsible | null }

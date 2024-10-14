import { BasePaginateSchema, BaseQuerySchema } from '#validators/query.validator'
import { Infer } from '@vinejs/vine/types'

export type BaseQuery = Infer<typeof BaseQuerySchema>
export type BasePaginate = Infer<typeof BasePaginateSchema>

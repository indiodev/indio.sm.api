import vine from '@vinejs/vine'

export const BaseQuerySchema = vine.object({
  search: vine.string().trim().optional(),
})

export const BaseQueryPaginateSchema = vine.object({
  ...BaseQuerySchema.clone().getProperties(),
  page: vine.number().positive().min(1).optional(),
  per_page: vine.number().positive().min(1).optional(),
})

export const BaseQueryValidator = vine.compile(BaseQuerySchema)
export const BaseQueryPaginateValidator = vine.compile(BaseQueryPaginateSchema)

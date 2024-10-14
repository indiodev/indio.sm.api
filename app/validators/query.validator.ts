import vine from '@vinejs/vine'

export const BaseQuerySchema = vine.object({
  search: vine.string().trim().optional(),
})

export const BasePaginateSchema = vine.object({
  ...BaseQuerySchema.getProperties(),
  page: vine.number().positive().min(1).optional(),
  per_page: vine.number().positive().min(1).optional(),
})

export const BaseQueryValidator = vine.compile(BaseQuerySchema)
export const BasePaginateValidator = vine.compile(BasePaginateSchema)

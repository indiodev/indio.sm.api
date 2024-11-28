import Base from '#models/base.model'
import User from '#models/user.model'
import Course from '#models/course.model'
import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class School extends Base {
  @column()
  declare phone: string

  @column()
  declare cnpj: string

  @column({
    columnName: 'user_id',
    serializeAs: 'user_id',
  })
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Course)
  declare courses: HasMany<typeof Course>
}

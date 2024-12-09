import Base from '#models/base.model'
import Course from '#models/course.model'
import User from '#models/user.model'
import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Class from './class.model.js'

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

  @column()
  declare slug: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Course)
  declare courses: HasMany<typeof Course>

  @hasMany(() => Class)
  declare classes: HasMany<typeof Class>
}

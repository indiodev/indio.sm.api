import Base from './base.model.js'
import User from './user.model.js'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Student extends Base {
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
}

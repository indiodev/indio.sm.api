import { belongsTo, column } from '@adonisjs/lucid/orm'
import Base from './base.model.js'
import User from './user.model.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Code extends Base {
  @column()
  declare identifier: string

  @column({
    serializeAs: 'user_id',
    columnName: 'user_id',
  })
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}

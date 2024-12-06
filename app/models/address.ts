import Base from '#models/base.model'
import User from '#models/user.model'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Address extends Base {
  @column()
  declare cep: string

  @column()
  declare uf: string

  @column()
  declare city: string

  @column()
  declare number: string

  @column()
  declare neighborhood: string

  @column()
  declare logradouro: string

  @column()
  declare complement: string | null

  @column()
  declare locality: string | null

  @column({ columnName: 'user_id', serializeAs: 'user_id' })
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}

import { DateTimeSerialize } from '#utils/function.util'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Base extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({
    autoCreate: true,
    serializeAs: 'created_at',
    columnName: 'created_at',
    serialize: DateTimeSerialize,
  })
  declare createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: 'updated_at',
    columnName: 'updated_at',
    serialize: DateTimeSerialize,
  })
  declare updatedAt: DateTime | null
}

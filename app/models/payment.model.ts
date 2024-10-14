import Base from '#models/base.model'
import Responsible from '#models/responsible.model'
import { PaymentStatus } from '#utils/enum.util'
import { DateSerialize } from '#utils/function.util'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Payment extends Base {
  @column()
  declare status: PaymentStatus

  @column({
    serialize: DateSerialize,
  })
  declare date: DateTime

  @column({
    columnName: 'responsible_id',
    serializeAs: 'responsible_id',
  })
  declare responsibleId: number

  @column({
    columnName: 'proof_of_payment',
    serializeAs: 'proof_of_payment',
  })
  declare proof_of_payment: string | null

  @belongsTo(() => Responsible)
  declare responsible: BelongsTo<typeof Responsible>
}

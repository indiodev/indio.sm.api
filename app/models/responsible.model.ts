import Base from '#models/base.model'
import Payment from '#models/payment.model'
import Student from '#models/student.model'
import User from '#models/user.model'
import { belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Responsible extends Base {
  @column()
  declare phone: string

  @column()
  declare cpf: string

  @column({
    columnName: 'user_id',
    serializeAs: 'user_id',
  })
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Payment)
  declare payments: HasMany<typeof Payment>

  // @hasMany(() => Student)
  // declare students: HasMany<typeof Student>

  @manyToMany(() => Student, {
    localKey: 'id', //chave da model pai (Responsible)
    relatedKey: 'id', // chave da model relacionada (Student)
    pivotForeignKey: 'student_id', // chave estrangeira student -> responsible
    pivotRelatedForeignKey: 'responsible_id', // chave estrangeira responsible -> student
    pivotTable: 'student_responsible', //
    pivotTimestamps: true,
  })
  declare students: ManyToMany<typeof Student>
}

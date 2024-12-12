import Base from '#models/base.model'
import Responsible from '#models/responsible.model'
import User from '#models/user.model'
import { belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Class from './class.model.js'
import School from './school.model.js'

export default class Student extends Base {
  @column()
  declare phone: string

  @column()
  declare cpf: string

  @column({
    columnName: 'user_id',
    serializeAs: 'user_id',
  })
  declare userId: number

  @column({
    columnName: 'responsible_id',
    serializeAs: 'responsible_id',
  })
  declare responsibleId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => Responsible, {
    localKey: 'id', //chave da model pai (Responsible)
    relatedKey: 'id', // chave da model relacionada (Student)
    pivotForeignKey: 'responsible_id', // chave estrangeira responsible -> student
    pivotRelatedForeignKey: 'student_id', // chave estrangeira student -> responsible
    pivotTable: 'student_responsible', //
    pivotTimestamps: true,
  })
  declare responsibles: ManyToMany<typeof Responsible>

  @manyToMany(() => Class, {
    localKey: 'id', //chave da model pai (Student)
    relatedKey: 'id', // chave da model relacionada (Class)
    pivotForeignKey: 'class_id', // chave estrangeira Class -> Sudent
    pivotRelatedForeignKey: 'student_id', // chave estrangeira Student -> Class
    pivotTable: 'student_class', //
    pivotTimestamps: true,
    pivotColumns: ['status'],
  })
  declare classes: ManyToMany<typeof Class>

  @manyToMany(() => School, {
    localKey: 'id', //chave da model pai (Student)
    relatedKey: 'id', // chave da model relacionada (School)
    pivotForeignKey: 'student_id', // chave estrangeira Student -> School
    pivotRelatedForeignKey: 'school_id', // chave estrangeira School -> Student
    pivotTable: 'school_student', //
    pivotTimestamps: true,
  })
  declare schools: ManyToMany<typeof School>
}

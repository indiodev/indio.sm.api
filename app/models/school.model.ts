import Base from '#models/base.model'
import Course from '#models/course.model'
import User from '#models/user.model'
import { belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Class from './class.model.js'
import Responsible from './responsible.model.js'
import Student from './student.model.js'

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

  @manyToMany(() => Responsible, {
    localKey: 'id', //chave da model pai (School)
    relatedKey: 'id', // chave da model relacionada (Responsible)
    pivotForeignKey: 'school_id', // chave estrangeira School -> Responsible
    pivotRelatedForeignKey: 'responsible_id', // chave estrangeira Responsible -> School
    pivotTable: 'school_responsible', //
    pivotTimestamps: true,
  })
  declare responsibles: ManyToMany<typeof Responsible>

  @manyToMany(() => Student, {
    localKey: 'id', //chave da model pai (School)
    relatedKey: 'id', // chave da model relacionada (Student)
    pivotForeignKey: 'school_id', // chave estrangeira School -> Student
    pivotRelatedForeignKey: 'student_id', // chave estrangeira Student -> School
    pivotTable: 'school_student', //
    pivotTimestamps: true,
  })
  declare students: ManyToMany<typeof Student>
}

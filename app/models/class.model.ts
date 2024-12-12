import Base from '#models/base.model'
import { TimeHourMinuteSerialize } from '#utils/function.util'
import { column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Course from './course.model.js'
import Student from './student.model.js'

export default class Class extends Base {
  @column()
  declare code: string

  @column()
  declare capacity: number

  @column({
    serializeAs: 'start_hour',
    columnName: 'start_hour',
    prepare: (v: DateTime) => v.toFormat('HH:mm:ss'),
    serialize: TimeHourMinuteSerialize,
  })
  declare start_hour: DateTime

  @column({
    serializeAs: 'final_hour',
    columnName: 'final_hour',
    prepare: (v: DateTime) => v.toFormat('HH:mm:ss'),
    serialize: TimeHourMinuteSerialize,
  })
  declare final_hour: DateTime

  @column({
    serializeAs: 'number_of_student_accepted',
    columnName: 'number_of_student_accepted',
  })
  declare number_of_student_accepted: number

  @column({
    serializeAs: 'number_of_student_on_reserve',
    columnName: 'number_of_student_on_reserve',
  })
  declare number_of_student_on_reserve: number

  @column({
    serializeAs: 'school_id',
    columnName: 'school_id',
  })
  declare schoolId: number

  @manyToMany(() => Course, {
    localKey: 'id', //chave da model pai (Class)
    relatedKey: 'id', // chave da model relacionada (Course)
    pivotForeignKey: 'class_id', // chave estrangeira Class -> Course
    pivotRelatedForeignKey: 'course_id', // chave estrangeira Course -> Class
    pivotTable: 'course_class', //
    pivotTimestamps: true,
  })
  declare courses: ManyToMany<typeof Course>

  @manyToMany(() => Student, {
    localKey: 'id', //chave da model pai (Class)
    relatedKey: 'id', // chave da model relacionada (Student)
    pivotForeignKey: 'student_id', // chave estrangeira Student -> Class
    pivotRelatedForeignKey: 'class_id', // chave estrangeira Class -> Student
    pivotTable: 'student_class', //
    pivotTimestamps: true,
    pivotColumns: ['status'],
  })
  declare students: ManyToMany<typeof Student>
}

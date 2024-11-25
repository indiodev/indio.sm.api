import Base from '#models/base.model'
import Course from '#models/course.model'
import { column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Class extends Base {
  @column()
  declare name: string

  @column({
    serializeAs: 'total_of_students',
    columnName: 'total_of_students',
  })
  declare totalOfStudents: number

  @manyToMany(() => Course, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'class_id',
    pivotRelatedForeignKey: 'course_id',
    pivotTable: 'class_courses',
  })
  declare courses: ManyToMany<typeof Course>
}

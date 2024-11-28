import Base from '#models/base.model'
import School from '#models/school.model'
import Class from '#models/class.model'
import { belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Course extends Base {
  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare price: number

  @belongsTo(() => School)
  declare school: BelongsTo<typeof School>

  @manyToMany(() => Class, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'course_id',
    pivotRelatedForeignKey: 'class_id',
    pivotTable: 'class_courses',
  })
  declare classes: ManyToMany<typeof Class>
}

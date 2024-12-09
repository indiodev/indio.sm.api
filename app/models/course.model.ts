import Base from '#models/base.model'
import School from '#models/school.model'
import { belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Class from './class.model.js'

export default class Course extends Base {
  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare price: number

  @column({
    columnName: 'school_id',
    serializeAs: 'school_id',
  })
  declare schoolId: number

  @belongsTo(() => School)
  declare school: BelongsTo<typeof School>

  @manyToMany(() => Class, {
    localKey: 'id', //chave da model pai (Course)
    relatedKey: 'id', // chave da model relacionada (Class)
    pivotForeignKey: 'course_id', // chave estrangeira Course -> Class
    pivotRelatedForeignKey: 'class_id', // chave estrangeira Class -> Course
    pivotTable: 'course_class', //
    pivotTimestamps: true,
  })
  declare classes: ManyToMany<typeof Class>
}

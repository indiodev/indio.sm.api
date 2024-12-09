import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'course_class'

  async up(): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('class_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('classes')
        .onDelete('CASCADE')

      table
        .integer('course_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('courses')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down(): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}

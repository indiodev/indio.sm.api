import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'school_student'

  async up(): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('school_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('schools')
        .onDelete('CASCADE')

      table
        .integer('student_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('students')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down(): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}

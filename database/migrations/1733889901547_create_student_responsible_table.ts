import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'student_responsible'

  async up(): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('student_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('students')
        .onDelete('CASCADE')

      table
        .integer('responsible_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('responsibles')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down(): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}

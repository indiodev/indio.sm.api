import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'classes'

  async up(): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('code').notNullable()
      table.integer('capacity').notNullable().defaultTo(20)
      table.time('start_hour').notNullable()
      table.time('final_hour').notNullable()

      table.integer('number_of_student_accepted').notNullable().defaultTo(0)
      table.integer('number_of_student_on_reserve').notNullable().defaultTo(0)
      table.string('days_of_week').notNullable()
      table.string('audience').notNullable()

      table.string('age_group').notNullable()

      table
        .integer('school_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('schools')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down(): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}

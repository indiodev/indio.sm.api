import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up(): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('cep', 10).notNullable()
      table.string('uf', 2).notNullable()
      table.string('city').notNullable()
      table.string('number').notNullable()
      table.string('neighborhood').notNullable()
      table.string('logradouro').notNullable()
      table.string('complement').nullable()
      table.string('locality').nullable()

      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down(): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}

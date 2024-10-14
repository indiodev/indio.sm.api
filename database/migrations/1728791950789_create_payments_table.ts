import { PaymentStatus } from '#utils/enum.util'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'payments'

  private status = Object.keys(PaymentStatus)

  async up(): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date('date').notNullable()
      table.enum('status', this.status).defaultTo(PaymentStatus.PENDING)
      table.float('amount').notNullable()
      table.string('proof_of_payment').nullable()

      table
        .integer('responsible_id')
        .notNullable()
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

import { Gender } from '#utils/constant'
import { Role } from '#utils/enum.util'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  private role = Object.keys(Role)
  private gender = Object.keys(Gender)

  async up(): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name').notNullable()
      table.string('email', 254).notNullable()
      table.string('password').notNullable()
      table.enum('role', this.role)

      table.string('birth_date').nullable()
      table.string('avatar').nullable()
      table.enum('gender', this.gender).nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down(): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}

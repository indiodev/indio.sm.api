import User from '#models/user.model'
import { Role } from '#utils/enum.util'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run(): Promise<void> {
    const exist = await User.query().where('email', 'master@escolarize.com').first()

    if (exist) return

    await User.create({
      email: 'master@escolarize.com',
      password: 'master@escolarize.com',
      name: 'Administrador Master',
      role: Role.ADMINISTRATOR,
    })
  }
}

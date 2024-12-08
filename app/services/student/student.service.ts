import { CreateStudent } from '#dtos/student.dto'
import Address from '#models/address'
import User from '#models/user.model'
import UserRepository from '#repositories/user.repository'
import { Role } from '#utils/enum.util'
import { inject } from '@adonisjs/core'

@inject()
export default class StudentService {
  constructor(private userRepository: UserRepository) {}

  // sei que ainda precisa arrumar a logica, mas mexi em bastante coisa e sou meio lento ainda para fazer as coisas, espero que a estrutura esteja boa.
  async create(payload: CreateStudent & { course_id: number; address?: Address }): Promise<User> {
    const created = await this.userRepository.create({
      ...payload,
      role: Role.STUDENT,
    })

    const hasAddress = payload.address && Object.keys(payload.address).length > 0

    if (hasAddress) {
      await created?.related('address').create(payload.address!)
      await created.load('address')
    }

    await created?.related('student').create({
      ...payload,
    })
    await created.load('student')

    return created
  }

  async update(payload: any): Promise<any> {
    return payload
  }
}

import { CreateStudent } from '#dtos/student.dto'
import Address from '#models/address'
import User from '#models/user.model'
import UserRepository from '#repositories/lucid/user.repository'
import { Role } from '#utils/enum.util'
import { inject } from '@adonisjs/core'

@inject()
export default class StudentService {
  constructor(private userRepository: UserRepository) {}

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

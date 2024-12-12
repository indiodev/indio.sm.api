import ClassRepository from '#contracts/class.repository'
import ResponsibleRepository from '#contracts/responsible.repository'
import UserRepository from '#contracts/user.repository'
import { CreateEnrollment } from '#dtos/enrollment.dto'
import ApplicationException from '#exceptions/application.exception'
import Responsible from '#models/responsible.model'
import Student from '#models/student.model'
import { Role, StudentClassStatus } from '#utils/enum.util'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'

@inject()
export default class EnrollmentCreateUseCase {
  constructor(
    private userRepository: UserRepository,
    private classRepository: ClassRepository,
    private responsibleRepository: ResponsibleRepository
  ) {}

  async execute(payload: CreateEnrollment): Promise<void> {
    const student = await this.createStudent(payload.student, payload.address)

    const _class = await this.classRepository.findById(payload.class_id)

    if (!_class)
      throw new ApplicationException('Turma nao encontrada', {
        cause: 'Class not found',
        code: 'CLASS_NOT_FOUND',
        status: 404,
      })

    const [student_class] = await db
      .table('student_class')
      .insert({
        student_id: student?.id,
        class_id: _class.id,
        status: StudentClassStatus.RESERVE,
      })
      .returning('id')

    await _class
      .merge({
        number_of_student_on_reserve: _class.number_of_student_on_reserve + 1,
      })
      .save()

    await db.table('school_student').insert({
      student_id: student?.id,
      school_id: _class?.schoolId,
    })

    if (payload?.responsible) {
      const responsible = await this.responsibleRepository.findByCPF(payload.responsible.cpf)

      if (!responsible?.id) {
        const created = await this.createResponsible(payload.responsible, payload.address)
        await db.table('student_responsible').insert({
          student_id: student?.id,
          responsible_id: created?.id,
        })
        await db.table('school_responsible').insert({
          responsible_id: created?.id,
          school_id: _class?.schoolId,
        })
        return student_class
      }

      await db.table('student_responsible').insert({
        student_id: student?.id,
        responsible_id: responsible?.id,
      })

      await db.table('school_responsible').insert({
        responsible_id: responsible?.id,
        school_id: _class?.schoolId,
      })

      return student_class
    }

    return student_class
  }

  private async createResponsible(
    payload: CreateEnrollment['responsible'] | null,
    address: CreateEnrollment['address']
  ): Promise<Responsible | null> {
    if (!payload) return null

    const { cpf, phone, ...rest } = payload
    const user = await this.userRepository.create({
      ...rest,
      password: payload.cpf,
      role: Role.RESPONSIBLE,
    })

    await user.related('address').create(address)

    return await user.related('responsible').create({
      cpf,
      phone,
    })
  }

  private async createStudent(
    payload: CreateEnrollment['student'] | null,
    address: CreateEnrollment['address']
  ): Promise<Student | null> {
    if (!payload) return null

    const { cpf, phone, ...rest } = payload

    const user = await this.userRepository.create({
      ...rest,
      password: payload.cpf,
      role: Role.STUDENT,
    })

    await user.related('address').create(address)

    return await user.related('student').create({
      cpf,
      phone,
    })
  }
}

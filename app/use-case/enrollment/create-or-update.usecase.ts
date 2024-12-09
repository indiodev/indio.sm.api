/* eslint-disable @unicorn/filename-case */
import { Enrollment } from '#dtos/enrollment.dto'
import ResponsibleRepository from '#repositories/lucid/responsible.repository'
import StudentRepository from '#repositories/lucid/student.repository'
import { NumberNormalizer } from '#utils/function.util'
import { inject } from '@adonisjs/core'

@inject()
export default class EnrollmentCreateOrUpdateUseCase {
  constructor(
    private studentRepository: StudentRepository,
    private responsibleRepository: ResponsibleRepository
  ) {}

  async execute(payload: Enrollment): Promise<Enrollment> {
    const student = await this.studentRepository.findByCPF(NumberNormalizer(payload.student.cpf))

    if (student) {
      student.merge({
        ...student,
        ...payload.student,
        // course_id: payload.course_id,
        // address: payload.address,
      })
      await student.save()
    }

    if (!student) {
      await this.studentRepository.create({
        ...payload.student,
        // course_id: payload.course_id,
        // address: payload.address,
      })
    }

    const responsible = await this.responsibleRepository.findByCPF(
      NumberNormalizer(payload.responsible.cpf)
    )

    if (responsible) {
      responsible.merge({
        ...responsible,
        ...payload.responsible,
      })
      await responsible.save()
    }

    if (!responsible) {
      await this.responsibleRepository.create({
        ...payload.responsible,
      })
    }

    return {
      ...payload,
      // student: updatedStudent,
      // responsible: updatedResponsible,
    }
  }
}

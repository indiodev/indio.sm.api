import { Enrollment } from '#dtos/enrollment.dto'
import ResponsibleRepository from '#repositories/lucid/responsible.repository'
import StudentRepository from '#repositories/lucid/student.repository'
import ResponsibleService from '#services/responsible/responsible.service'
import StudentService from '#services/student/student.service'
import { NumberNormalizer } from '#utils/function.util'
import { inject } from '@adonisjs/core'

@inject()
export default class EnrollmentService {
  constructor(
    private studentRepository: StudentRepository,
    private studentService: StudentService,
    private responsibleRepository: ResponsibleRepository,
    private responsibleService: ResponsibleService
  ) {}

  async createOrUpdate(payload: Enrollment): Promise<Enrollment> {
    const student = await this.studentRepository.findByCPF(NumberNormalizer(payload.student.cpf))

    const updatedStudent = student
      ? await this.studentService.update({
          ...student,
          ...payload.student,
          course_id: payload.course_id,
          address: payload.address,
        })
      : await this.studentService.create({
          ...payload.student,
          course_id: payload.course_id,
          // address: payload.address,
        })

    const responsible = await this.responsibleRepository.findByCPF(
      NumberNormalizer(payload.responsible.cpf)
    )

    const updatedResponsible = responsible
      ? await this.responsibleService.update({ ...responsible, ...payload.responsible })
      : await this.responsibleService.create({ ...payload.responsible })

    return {
      ...payload,
      student: updatedStudent,
      responsible: updatedResponsible,
    }
  }
}

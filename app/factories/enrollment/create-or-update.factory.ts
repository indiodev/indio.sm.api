/* eslint-disable @unicorn/filename-case */
import LucidResponsibleRepository from '#repositories/lucid/responsible.repository'
import LucidStudentRepository from '#repositories/lucid/student.repository'
import EnrollmentCreateOrUpdateUseCase from '#use-case/enrollment/create-or-update.usecase'

export function MakeEnrollmentCreateOrUpdateFactory(): EnrollmentCreateOrUpdateUseCase {
  return new EnrollmentCreateOrUpdateUseCase(
    new LucidStudentRepository(),
    new LucidResponsibleRepository()
  )
}

import LucidClassRepository from '#repositories/lucid/class.repository'
import LucidResponsibleRepository from '#repositories/lucid/responsible.repository'
import LucidUserRepository from '#repositories/lucid/user.repository'
import { default as EnrollmentCreateUseCase } from '#use-case/enrollment/create.usecase'

export function MakeEnrollmentCreateFactory(): EnrollmentCreateUseCase {
  return new EnrollmentCreateUseCase(
    new LucidUserRepository(),
    new LucidClassRepository(),
    new LucidResponsibleRepository()
  )
}

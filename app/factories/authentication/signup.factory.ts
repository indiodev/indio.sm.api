import LucidResponsibleRepository from '#repositories/lucid/responsible.repository'
import LucidSchoolRepository from '#repositories/lucid/school.repository'
import LucidStudentRepository from '#repositories/lucid/student.repository'
import LucidUserRepository from '#repositories/lucid/user.repository'
import { AuthenticationSignUpUseCase } from '#use-case/authentication/signup.usecase'

export function MakeAuthenticationSignUpFactory(): AuthenticationSignUpUseCase {
  return new AuthenticationSignUpUseCase(
    new LucidUserRepository(),
    new LucidResponsibleRepository(),
    new LucidStudentRepository(),
    new LucidSchoolRepository()
  )
}

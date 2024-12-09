import LucidAuthRepository from '#repositories/lucid/auth.repository'
import LucidResponsibleRepository from '#repositories/lucid/responsible.repository'
import LucidSchoolRepository from '#repositories/lucid/school.repository'
import LucidStudentRepository from '#repositories/lucid/student.repository'
import LucidUserRepository from '#repositories/lucid/user.repository'
import AuthenticationSignInUseCase from '#use-case/authentication/signin.usecase'

export function MakeAuthenticationSignInFactory(): AuthenticationSignInUseCase {
  return new AuthenticationSignInUseCase(
    new LucidUserRepository(),
    new LucidResponsibleRepository(),
    new LucidStudentRepository(),
    new LucidSchoolRepository(),
    new LucidAuthRepository()
  )
}

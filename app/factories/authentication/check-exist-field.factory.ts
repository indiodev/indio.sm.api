/* eslint-disable @unicorn/filename-case */
import LucidResponsibleRepository from '#repositories/lucid/responsible.repository'
import LucidUserRepository from '#repositories/lucid/user.repository'
import AuthenticationCheckExistFieldUseCase from '#use-case/authentication/check-exist-field.usecase'

export function MakeAuthenticationCheckExistFieldFactory(): AuthenticationCheckExistFieldUseCase {
  return new AuthenticationCheckExistFieldUseCase(
    new LucidUserRepository(),
    new LucidResponsibleRepository()
  )
}

/* eslint-disable @unicorn/filename-case */
import LucidUserRepository from '#repositories/lucid/user.repository'
import AuthenticationRecoveryResetPasswordUseCase from '#use-case/authentication/recovery/reset-password'

export function MakeAuthenticationRecoveryResetPasswordFactory(): AuthenticationRecoveryResetPasswordUseCase {
  return new AuthenticationRecoveryResetPasswordUseCase(new LucidUserRepository())
}

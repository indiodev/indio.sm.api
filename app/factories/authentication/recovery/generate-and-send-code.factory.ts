/* eslint-disable @unicorn/filename-case */
import LucidUserRepository from '#repositories/lucid/user.repository'
import AuthenticationRecoveryGenerateAndSendCodeUseCase from '#use-case/authentication/recovery/generate-and-send-code.usecase'

export function MakeAuthenticationRecoveryGenerateAndSendCodeFactory(): AuthenticationRecoveryGenerateAndSendCodeUseCase {
  return new AuthenticationRecoveryGenerateAndSendCodeUseCase(new LucidUserRepository())
}

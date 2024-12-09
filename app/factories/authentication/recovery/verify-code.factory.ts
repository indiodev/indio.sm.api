/* eslint-disable @unicorn/filename-case */
import LucidAuthRepository from '#repositories/lucid/auth.repository'
import LucidCodeRepository from '#repositories/lucid/code.repository'
import AuthenticationRecoveryVerifyCodeUseCase from '#use-case/authentication/recovery/verify-code.usecase'

export function MakeAuthenticationRecoveryVerifyCodeFactory(): AuthenticationRecoveryVerifyCodeUseCase {
  return new AuthenticationRecoveryVerifyCodeUseCase(
    new LucidCodeRepository(),
    new LucidAuthRepository()
  )
}

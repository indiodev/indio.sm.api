/* eslint-disable @unicorn/filename-case */
import { MakeAuthenticationRecoveryVerifyCodeFactory } from '#factories/authentication/recovery/verify-code.factory'
import AuthenticationRecoveryVerifyCodeUseCase from '#use-case/authentication/recovery/verify-code.usecase'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthenticationRecoveryVerifyCodeController {
  private useCase: AuthenticationRecoveryVerifyCodeUseCase
  constructor() {
    this.useCase = MakeAuthenticationRecoveryVerifyCodeFactory()
  }

  async handle({ request, response }: HttpContext): Promise<void> {
    const payload = request.input('code')
    const result = await this.useCase.execute({ code: payload })
    return response.ok(result)
  }
}

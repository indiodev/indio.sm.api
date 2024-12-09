/* eslint-disable @unicorn/filename-case */
import { MakeAuthenticationRecoveryGenerateAndSendCodeFactory } from '#factories/authentication/recovery/generate-and-send-code.factory'
import AuthenticationRecoveryGenerateAndSendCodeUseCase from '#use-case/authentication/recovery/generate-and-send-code.usecase'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

inject()
export default class AuthenticationRecoveryGenerateAndSendController {
  private useCase: AuthenticationRecoveryGenerateAndSendCodeUseCase
  constructor() {
    this.useCase = MakeAuthenticationRecoveryGenerateAndSendCodeFactory()
  }

  async handle({ request, response }: HttpContext): Promise<void> {
    const payload = await request.input('email')
    const result = await this.useCase.execute({ email: payload })
    return response.ok(result)
  }
}

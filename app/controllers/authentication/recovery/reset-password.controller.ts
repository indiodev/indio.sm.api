/* eslint-disable @unicorn/filename-case */
import { MakeAuthenticationRecoveryResetPasswordFactory } from '#factories/authentication/recovery/reset-password.factory'
import AuthenticationRecoveryResetPasswordUseCase from '#use-case/authentication/recovery/reset-password'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

inject()
export default class AuthenticationRecoveryResetPasswordController {
  private useCase: AuthenticationRecoveryResetPasswordUseCase
  constructor() {
    this.useCase = MakeAuthenticationRecoveryResetPasswordFactory()
  }
  async handle({ request, response, auth }: HttpContext): Promise<void> {
    const payload = request.only(['password'])
    const result = await this.useCase.execute({ ...payload, id: auth.user?.id! })
    return response.ok(result)
  }
}

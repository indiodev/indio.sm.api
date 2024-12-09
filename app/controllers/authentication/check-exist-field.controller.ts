/* eslint-disable @unicorn/filename-case */
import { MakeAuthenticationCheckExistFieldFactory } from '#factories/authentication/check-exist-field.factory'
import AuthenticationCheckExistFieldUseCase from '#use-case/authentication/check-exist-field.usecase'
import { AuthCheckExistFieldValidator } from '#validators/auth.validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

inject()
export default class AuthenticationCheckExistFieldController {
  private useCase: AuthenticationCheckExistFieldUseCase
  constructor() {
    this.useCase = MakeAuthenticationCheckExistFieldFactory()
  }

  async handle({ request, response }: HttpContext): Promise<void> {
    const payload = await request.validateUsing(AuthCheckExistFieldValidator)
    const result = await this.useCase.execute(payload)
    return response.ok(result)
  }
}

import { MakeAuthenticationSignInFactory } from '#factories/authentication/signin.factory'
import AuthenticationSignInUseCase from '#use-case/authentication/signin.usecase'
import { AuthSignInValidator } from '#validators/auth.validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

inject()
export default class AuthenticationSignInController {
  private useCase: AuthenticationSignInUseCase
  constructor() {
    this.useCase = MakeAuthenticationSignInFactory()
  }

  async handle({ request, response }: HttpContext): Promise<void> {
    const payload = await request.validateUsing(AuthSignInValidator)
    const result = await this.useCase.execute(payload)
    return response.ok(result)
  }
}

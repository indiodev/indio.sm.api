import { MakeAuthenticationSignUpFactory } from '#factories/authentication/signup.factory'
import { AuthenticationSignUpUseCase } from '#use-case/authentication/signup.usecase'
import { AuthSignUpValidator } from '#validators/auth.validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

inject()
export default class AuthenticationSignUpController {
  private useCase: AuthenticationSignUpUseCase
  constructor() {
    this.useCase = MakeAuthenticationSignUpFactory()
  }

  async handle({ request, response }: HttpContext): Promise<void> {
    const payload = await request.validateUsing(AuthSignUpValidator)
    const result = await this.useCase.execute(payload)
    return response.ok(result)
  }
}

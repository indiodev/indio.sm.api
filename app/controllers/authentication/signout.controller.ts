import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

inject()
export default class AuthenticationSignOutController {
  // constructor(private useCase: AuthenticationSignOutUseCase) {}

  async handle({ request, response, auth }: HttpContext): Promise<void> {
    const payload = request.only(['expiresAt'])
    // await this.authService.signOut({ ...payload, userId: auth.user?.id! })
    console.log('signOut', payload, auth.user?.id)
    return response.noContent()
  }
}

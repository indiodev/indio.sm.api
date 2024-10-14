import { AuthService } from '#services/auth/auth.service'
import {
  AuthCheckExistFieldValidator,
  AuthSignInValidator,
  AuthSignUpValidator,
} from '#validators/auth.validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  async signIn({ request, response }: HttpContext): Promise<void> {
    const payload = await request.validateUsing(AuthSignInValidator)
    const result = await this.authService.signIn(payload)
    return response.ok(result)
  }

  async signUp({ request, response }: HttpContext): Promise<void> {
    const payload = await request.validateUsing(AuthSignUpValidator)
    const result = await this.authService.signUp(payload)
    return response.ok(result)
  }

  async signOut({ response, auth, request }: HttpContext): Promise<void> {
    const payload = request.only(['expiresAt'])
    await this.authService.signOut({ ...payload, userId: auth.user?.id! })
    return response.noContent()
  }

  async checkExistField({ request, response }: HttpContext): Promise<void> {
    const payload = await request.validateUsing(AuthCheckExistFieldValidator)
    const result = await this.authService.checkExistField(payload)
    return response.ok(result)
  }
}

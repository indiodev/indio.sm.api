import { AuthRecoveryService } from '#services/auth/auth_recovery.service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthRecoveryController {
  constructor(private authRecoveryService: AuthRecoveryService) {}
  async generateAndSendCode({ request, response }: HttpContext): Promise<void> {
    const payload = await request.input('email')
    const result = await this.authRecoveryService.generateAndSendCode({ email: payload })
    return response.ok(result)
  }

  async verifyCode({ request, response }: HttpContext): Promise<void> {
    const payload = request.input('code')
    const result = await this.authRecoveryService.verifyCode({ code: payload })
    return response.ok(result)
  }

  async resetPassword({ request, response, auth }: HttpContext): Promise<void> {
    const payload = request.only(['password'])
    const result = await this.authRecoveryService.resetPassword({ ...payload, id: auth.user?.id! })
    return response.ok(result)
  }
}

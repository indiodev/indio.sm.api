import { Token } from '#dtos/auth.dto'
import ApplicationException from '#exceptions/application.exception'
import AuthRepository from '#repositories/auth.repository'
import CodeRepository from '#repositories/code.repository'
import UserRepository from '#repositories/user.repository'
import EmailService from '#services/email.service'
import { inject } from '@adonisjs/core'

@inject()
export class AuthRecoveryService {
  constructor(
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
    private codeRepository: CodeRepository,
    private emailService: EmailService
  ) {}

  async generateAndSendCode({ email }: { email: string }): Promise<void> {
    const user = await this.userRepository.findBy({ email })

    if (!user)
      throw new ApplicationException('E-mail não encontrado', {
        cause: 'E-mail not found',
        code: 'EMAIL_NOT_FOUND',
        status: 404,
      })

    const code = Math.floor(100000 + Math.random() * 900000).toString()

    await user?.related('code').create({ identifier: code })

    await this.emailService.senResetPasswordEmail(user, code)
  }

  async verifyCode(payload: { code: string }): Promise<Token> {
    const code = await this.codeRepository.findBy({ identifier: payload.code })
    if (!code) {
      throw new ApplicationException('Código inválido', {
        cause: 'Invalid code',
        code: 'INVALID_CODE',
        status: 400,
      })
    }

    const currentDate = new Date()
    const codeCreatedDate = new Date(code.createdAt.toString())

    const differenceInMilliseconds = currentDate.getTime() - codeCreatedDate.getTime()
    const differenceInMinutes = differenceInMilliseconds / 60000 // corrigido para 60000

    if (differenceInMinutes > 5) {
      await code.delete()
      throw new ApplicationException('Código expirado', {
        cause: 'Code expired',
        code: 'CODE_EXPIRED',
        status: 400,
      })
    }

    const user = await code.related('user').query().firstOrFail()
    return await this.authRepository.create(user)
  }

  async resetPassword(payload: { password: string; id: number }): Promise<void> {
    const user = await this.userRepository.findBy({ id: payload.id })

    if (!user)
      throw new ApplicationException('Usuário não encontrado', {
        cause: 'User not found',
        code: 'USER_NOT_FOUND',
        status: 404,
      })

    await user?.related('code').query().delete()
    await user?.merge({ password: payload.password }).save()
    await this.emailService.sendPasswordChangeConfirmationEmail(user)
  }
}

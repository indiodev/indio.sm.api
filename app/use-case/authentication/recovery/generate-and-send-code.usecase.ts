/* eslint-disable @unicorn/filename-case */
import UserRepository from '#contracts/user.repository'
import ApplicationException from '#exceptions/application.exception'
import { inject } from '@adonisjs/core'

@inject()
export default class AuthenticationRecoveryGenerateAndSendCodeUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email }: { email: string }): Promise<void> {
    const user = await this.userRepository.findByEmail(email)

    if (!user)
      throw new ApplicationException('E-mail não encontrado', {
        cause: 'E-mail not found',
        code: 'EMAIL_NOT_FOUND',
        status: 404,
      })

    const code = Math.floor(100000 + Math.random() * 900000).toString()

    console.log({ code })

    await user?.related('code').create({ identifier: code })

    // await this.emailService.senResetPasswordEmail(user, code)
  }
}

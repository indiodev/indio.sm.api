/* eslint-disable @unicorn/filename-case */
import UserRepository from '#contracts/user.repository'
import ApplicationException from '#exceptions/application.exception'
import { inject } from '@adonisjs/core'

@inject()
export default class AuthenticationRecoveryResetPasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(payload: { password: string; id: number }): Promise<void> {
    const user = await this.userRepository.findById(payload.id)

    if (!user)
      throw new ApplicationException('Usuário não encontrado', {
        cause: 'User not found',
        code: 'USER_NOT_FOUND',
        status: 404,
      })

    await user?.related('code').query().delete()
    await user?.merge({ password: payload.password }).save()
    // await this.emailService.sendPasswordChangeConfirmationEmail(user)
  }
}

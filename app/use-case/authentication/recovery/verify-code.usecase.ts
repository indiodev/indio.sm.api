/* eslint-disable @unicorn/filename-case */
import AuthRepository from '#contracts/auth.repository'
import CodeRepository from '#contracts/code.repository'
import { Token } from '#dtos/auth.dto'
import ApplicationException from '#exceptions/application.exception'
import { inject } from '@adonisjs/core'

@inject()
export default class AuthenticationRecoveryVerifyCodeUseCase {
  constructor(
    private codeRepository: CodeRepository,
    private authRepository: AuthRepository
  ) {}

  async execute(payload: { code: string }): Promise<Token> {
    const code = await this.codeRepository.findByIdentifier(payload.code)
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
}

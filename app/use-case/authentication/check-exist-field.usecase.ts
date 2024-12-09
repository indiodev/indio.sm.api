/* eslint-disable @unicorn/filename-case */
import ResponsibleRepository from '#contracts/responsible.repository'
import UserRepository from '#contracts/user.repository'
import { AuthCheckExistField } from '#dtos/auth.dto'
import ApplicationException from '#exceptions/application.exception'
import { Role } from '#utils/enum.util'
import { NumberNormalizer } from '#utils/function.util'
import { inject } from '@adonisjs/core'

@inject()
export default class AuthenticationCheckExistFieldUseCase {
  constructor(
    private userRepository: UserRepository,
    private responsibleRepository: ResponsibleRepository
  ) {}

  async execute({ access, ...payload }: AuthCheckExistField): Promise<void> {
    if (payload.email) {
      const existEmail = await this.userRepository.findByEmail(payload?.email)

      if (existEmail)
        throw new ApplicationException('E-mail já está em uso', {
          cause: 'E-mail already in use',
          code: 'EMAIL_ALREADY_IN_USE',
          status: 400,
        })
    }

    if (access === Role.RESPONSIBLE) {
      const existCPF = await this.responsibleRepository.findByCPF(NumberNormalizer(payload?.cpf!))

      if (existCPF)
        throw new ApplicationException('CPF já está em uso', {
          cause: 'CPF already in use',
          code: 'CPF_ALREADY_IN_USE',
          status: 400,
        })
    }
  }
}

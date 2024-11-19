import { AuthCheckExistField, AuthSignIn, AuthSignUp, Token } from '#dtos/auth.dto'
import ApplicationException from '#exceptions/application.exception'
import Responsible from '#models/responsible.model'
import User from '#models/user.model'
import AuthRepository from '#repositories/auth.repository'
import ResponsibleRepository from '#repositories/responsible.repository'
import UserRepository from '#repositories/user.repository'
import EmailService from '#services/email.service'
import { Role } from '#utils/enum.util'
import { NumberNormalizer } from '#utils/function.util'
import { inject } from '@adonisjs/core'

@inject()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
    private responsibleRepository: ResponsibleRepository,
    private emailService: EmailService
  ) {}

  async signIn({ access, ...payload }: AuthSignIn): Promise<Token> {
    let user: User | null | undefined

    if (access === Role.ADMINISTRATOR)
      user = await this.userRepository.findBy({ email: payload.login })

    if (access === Role.RESPONSIBLE) {
      const responsible = await this.responsibleRepository.findBy({
        cpf: NumberNormalizer(payload.login),
      })
      user = await responsible?.related('user').query().first()
    }

    if (!user)
      throw new ApplicationException('Usuário não encontrado', {
        cause: 'User not found',
        code: 'USER_NOT_FOUND',
        status: 404,
      })

    const credential = await this.authRepository.verify({
      hashed: user?.password,
      plain: payload.password,
    })

    if (!credential)
      throw new ApplicationException('Senha inválida', {
        cause: 'Invalid credential',
        code: 'INVALID_CREDENTIAL',
        status: 400,
      })

    return await this.authRepository.create(user)
  }

  async signUp({ access, responsible, ...payload }: AuthSignUp): Promise<User> {
    const user = await this.userRepository.findBy({ email: payload.email })

    if (user)
      throw new ApplicationException('E-mail já está em uso', {
        cause: 'E-mail already in use',
        code: 'EMAIL_ALREADY_IN_USE',
        status: 400,
      })

    let exist: Responsible | null | undefined

    if (access === Role.RESPONSIBLE)
      exist = await this.responsibleRepository.findBy({ cpf: responsible?.cpf })

    if (exist)
      throw new ApplicationException('Dados já estão em uso', {
        status: 400,
        cause: 'Data already in use',
        code: 'DATA_ALREADY_IN_USE',
      })

    const created = await this.userRepository.create({
      ...payload,
      ...(access === Role.RESPONSIBLE && { role: Role.RESPONSIBLE }),
      ...(access === Role.ADMINISTRATOR && { role: Role.ADMINISTRATOR }),
    })

    if (access === Role.RESPONSIBLE) {
      await created?.related('responsible').create(responsible!)
      await created.load('responsible')
    }

    await this.emailService.sendConfirmationSingUpEmail(created)
    return created
  }

  async signOut(payload: { userId: number; expiresAt: string }): Promise<void> {
    await this.authRepository.revoke(payload)
  }

  async checkExistField({ access, ...payload }: AuthCheckExistField): Promise<void> {
    if (payload.email) {
      const existEmail = await this.userRepository.findBy({ email: payload?.email })

      if (existEmail)
        throw new ApplicationException('E-mail já está em uso', {
          cause: 'E-mail already in use',
          code: 'EMAIL_ALREADY_IN_USE',
          status: 400,
        })
    }

    if (access === Role.RESPONSIBLE) {
      const existCPF = await this.responsibleRepository.findBy({ cpf: payload?.cpf })

      if (existCPF)
        throw new ApplicationException('CPF já está em uso', {
          cause: 'CPF already in use',
          code: 'CPF_ALREADY_IN_USE',
          status: 400,
        })
    }
  }
}

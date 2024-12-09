import AuthRepository from '#contracts/auth.repository'
import ResponsibleRepository from '#contracts/responsible.repository'
import SchoolRepository from '#contracts/school.repository'
import StudentRepository from '#contracts/student.repository'
import UserRepository from '#contracts/user.repository'
import { AuthSignIn, Token } from '#dtos/auth.dto'
import ApplicationException from '#exceptions/application.exception'
import User from '#models/user.model'
import { Role } from '#utils/enum.util'
import { NumberNormalizer } from '#utils/function.util'
import { inject } from '@adonisjs/core'

@inject()
export default class AuthenticationSignInUseCase {
  constructor(
    private userRepository: UserRepository,
    private responsibleRepository: ResponsibleRepository,
    private studentRepository: StudentRepository,
    private schoolRepository: SchoolRepository,
    private authRepository: AuthRepository
  ) {}

  async execute({ access, ...payload }: AuthSignIn): Promise<Token> {
    let user: User | null | undefined

    if (access === Role.ADMINISTRATOR) user = await this.userRepository.findByEmail(payload.login)

    if (access === Role.RESPONSIBLE) {
      const responsible = await this.responsibleRepository.findByCPF(
        NumberNormalizer(payload.login)
      )
      user = await responsible?.related('user').query().first()
    }

    if (access === Role.STUDENT) {
      const student = await this.studentRepository.findByCPF(NumberNormalizer(payload.login))
      user = await student?.related('user').query().first()
    }

    if (access === Role.SCHOOL) {
      const school = await this.schoolRepository.findByCNPJ(NumberNormalizer(payload.login))
      user = await school?.related('user').query().first()
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
}

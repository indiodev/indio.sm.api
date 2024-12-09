import ResponsibleRepository from '#contracts/responsible.repository'
import SchoolRepository from '#contracts/school.repository'
import StudentRepository from '#contracts/student.repository'
import UserRepository from '#contracts/user.repository'
import { AuthSignUp } from '#dtos/auth.dto'
import ApplicationException from '#exceptions/application.exception'
import Responsible from '#models/responsible.model'
import School from '#models/school.model'
import Student from '#models/student.model'
import User from '#models/user.model'
import { Role } from '#utils/enum.util'
import { NumberNormalizer } from '#utils/function.util'
import { inject } from '@adonisjs/core'

@inject()
export class AuthenticationSignUpUseCase {
  constructor(
    private userRepository: UserRepository,
    private responsibleRepository: ResponsibleRepository,
    private studentRepository: StudentRepository,
    private schoolRepository: SchoolRepository
  ) {}

  async execute({ access, responsible, school, student, ...payload }: AuthSignUp): Promise<User> {
    const user = await this.userRepository.findByEmail(payload.email)

    if (user)
      throw new ApplicationException('E-mail já está em uso', {
        cause: 'E-mail already in use',
        code: 'EMAIL_ALREADY_IN_USE',
        status: 400,
      })

    let exist: Responsible | Student | School | null | undefined

    if (access === Role.RESPONSIBLE) {
      exist = await this.responsibleRepository.findByCPF(NumberNormalizer(responsible?.cpf!))
    }

    if (access === Role.SCHOOL) {
      exist = await this.schoolRepository.findByCNPJ(NumberNormalizer(school?.cnpj!))
    }

    if (access === Role.STUDENT) {
      exist = await this.studentRepository.findByCPF(NumberNormalizer(student?.cpf!))
    }

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
      ...(access === Role.STUDENT && { role: Role.STUDENT }),
      ...(access === Role.SCHOOL && { role: Role.SCHOOL }),
    })

    if (access === Role.RESPONSIBLE) {
      await created?.related('responsible').create(responsible!)
      await created.load('responsible')
    }

    if (access === Role.SCHOOL) {
      await created?.related('school').create(school!)
      await created.load('school')
    }

    if (access === Role.STUDENT) {
      await created?.related('student').create(student!)
      await created.load('student')
    }

    // await this.emailService.sendConfirmationSingUpEmail(created)
    return created
  }
}

import { InMemoryResponsibleRepository } from '#repositories/in-memory/responsible.repository'
import { InMemorySchoolRepository } from '#repositories/in-memory/school.repository'
import { InMemoryStudentRepository } from '#repositories/in-memory/student.repository'
import { InMemoryUserRepository } from '#repositories/in-memory/user.repository'
import { AuthenticationSignUpUseCase } from '#use-case/authentication/signup.usecase'
import { Role } from '#utils/enum.util'
import { test } from '@japa/runner'

let sut: AuthenticationSignUpUseCase
let userRepository: InMemoryUserRepository
let responsibleRepository: InMemoryResponsibleRepository
let studentRepository: InMemoryStudentRepository
let schoolRepository: InMemorySchoolRepository

test.group('Sign Up Use Case', (group) => {
  group.each.setup(() => {
    userRepository = new InMemoryUserRepository()
    responsibleRepository = new InMemoryResponsibleRepository()
    studentRepository = new InMemoryStudentRepository()
    schoolRepository = new InMemorySchoolRepository()
    sut = new AuthenticationSignUpUseCase(
      userRepository,
      responsibleRepository,
      studentRepository,
      schoolRepository
    )
  })
  test('should be able responsible to sign up', async ({ expect }) => {
    const user = await sut.execute({
      name: 'John Doe',
      email: 'qU9w5@example.com',
      password: '123456',
      access: Role.RESPONSIBLE,
      school: undefined,
      student: undefined,
      responsible: {
        cpf: '12345678901',
        phone: '12345678901',
      },
    })

    expect(user.id).toBe(1)
    // expect(1 + 1).toBe(2)
  })
})

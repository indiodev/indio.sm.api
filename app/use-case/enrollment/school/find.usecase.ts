import SchoolRepository from '#contracts/school.repository'
import ApplicationException from '#exceptions/application.exception'
import { inject } from '@adonisjs/core'

@inject()
export default class EnrollmentSchoolFindUseCase {
  constructor(private schoolRepository: SchoolRepository) {}

  async execute(payload: { slug: string }): Promise<Record<string, unknown>> {
    const school = await this.schoolRepository.findBySlug(payload.slug)

    if (!school) {
      throw new ApplicationException('Escola nao encontrada', {
        status: 404,
        cause: 'School not found',
        code: 'SCHOOL_NOT_FOUND',
      })
    }

    await school.load('user')
    await school.load('classes', (c) => c.orderBy('id', 'asc').preload('courses'))

    const { classes } = school
    const transformed = classes.map((c) => {
      const { courses, ...rest } = c.toJSON()
      const [course] = courses
      return { ...rest, course }
    })

    const _school = school.toJSON()
    delete _school.classes

    return { ..._school, classes: transformed }
  }
}

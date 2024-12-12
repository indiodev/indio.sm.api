import { SchoolDashboard, SchoolDashboardMetric } from '#dtos/school.dto'
import ApplicationException from '#exceptions/application.exception'
import { inject } from '@adonisjs/core'

@inject()
export class SchoolDashboardUseCase {
  constructor() {}

  async execute({ school }: SchoolDashboard): Promise<SchoolDashboardMetric> {
    if (!school)
      throw new ApplicationException('Estudante não encontrado', {
        cause: 'Student not found',
        code: 'STUDENT_NOT_FOUND',
        status: 404,
      })

    const [studentQuery] = await school?.related('students').query().count('*')
    const [responsibleQuery] = await school?.related('responsibles').query().count('*')
    const [courseQuery] = await school?.related('courses').query().count('*')

    return {
      student: {
        count: Number(studentQuery?.$extras?.count ?? 0),
      },
      responsible: {
        count: Number(responsibleQuery?.$extras?.count ?? 0),
      },
      course: {
        count: Number(courseQuery?.$extras?.count ?? 0),
      },
    }
  }
}

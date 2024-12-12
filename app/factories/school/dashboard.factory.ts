import { SchoolDashboardUseCase } from '#use-case/school/dashboard.usecase'

export function MakeSchoolDashboardFactory(): SchoolDashboardUseCase {
  return new SchoolDashboardUseCase()
}

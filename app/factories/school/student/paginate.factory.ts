import { SchoolStudentPaginateUseCase } from '#use-case/school/student/paginate.usecase'

export function MakeSchoolStudentPaginateFactory(): SchoolStudentPaginateUseCase {
  return new SchoolStudentPaginateUseCase()
}

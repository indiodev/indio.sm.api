import { SchoolCoursePaginateUseCase } from '#use-case/school/course/paginate.usecase'

export function MakeSchoolCoursePaginateFactory(): SchoolCoursePaginateUseCase {
  return new SchoolCoursePaginateUseCase()
}

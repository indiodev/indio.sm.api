import { SchoolResponsiblePaginateUseCase } from '#use-case/school/responsible/paginate.usecase'

export function MakeSchoolResponsiblePaginateFactory(): SchoolResponsiblePaginateUseCase {
  return new SchoolResponsiblePaginateUseCase()
}

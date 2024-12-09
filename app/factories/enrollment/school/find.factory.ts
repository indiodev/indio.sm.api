import LucidSchoolRepository from '#repositories/lucid/school.repository'
import EnrollmentSchoolFindUseCase from '#use-case/enrollment/school/find.usecase'

export function MakeEnrollmentSchoolFindFactory(): EnrollmentSchoolFindUseCase {
  return new EnrollmentSchoolFindUseCase(new LucidSchoolRepository())
}

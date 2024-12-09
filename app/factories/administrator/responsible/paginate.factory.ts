import LucidResponsibleRepository from '#repositories/lucid/responsible.repository'
import { AdministratorResponsiblePaginateUseCase } from '#use-case/administrator/responsible/paginate.usecase'

export function MakeAdministratorResponsiblePaginateFactory(): AdministratorResponsiblePaginateUseCase {
  return new AdministratorResponsiblePaginateUseCase(new LucidResponsibleRepository())
}

import { MakeAdministratorResponsiblePaginateFactory } from '#factories/administrator/responsible/paginate.factory'
import { AdministratorResponsiblePaginateUseCase } from '#use-case/administrator/responsible/paginate.usecase'
import { BaseQueryPaginateValidator } from '#validators/query.validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
@inject()
export default class AdministratorResponsiblePaginateController {
  private useCase: AdministratorResponsiblePaginateUseCase
  constructor() {
    this.useCase = MakeAdministratorResponsiblePaginateFactory()
  }

  async handle({ request, response }: HttpContext): Promise<void> {
    const {
      page = 1,
      per_page = 15,
      ...query
    } = await BaseQueryPaginateValidator.validate(request.qs())

    const result = await this.useCase.execute({
      ...query,
      page,
      per_page,
    })
    return response.ok(result)
  }
}

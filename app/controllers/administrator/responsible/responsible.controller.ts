import { AdministratorResponsibleService } from '#services/administrator/responsible/responsible.service'
import { BaseQueryPaginateValidator } from '#validators/query.validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
@inject()
export default class AdministratorResponsibleController {
  constructor(private responsibleService: AdministratorResponsibleService) {}

  async paginate({ request, response }: HttpContext): Promise<void> {
    const {
      page = 1,
      per_page = 15,
      ...query
    } = await BaseQueryPaginateValidator.validate(request.qs())

    const result = await this.responsibleService.paginate({
      ...query,
      page,
      per_page,
    })
    return response.ok(result)
  }
}

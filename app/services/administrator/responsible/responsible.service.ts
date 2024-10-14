import { BasePaginate } from '#dtos/query.dto'
import Responsible from '#models/responsible.model'
import ResponsibleRepository from '#repositories/responsible.repository'
import { inject } from '@adonisjs/core'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

@inject()
export class AdministratorResponsibleService {
  constructor(private responsibleRepository: ResponsibleRepository) {}

  async paginate(query: BasePaginate): Promise<ModelPaginatorContract<Responsible>> {
    return await this.responsibleRepository.paginate(query)
  }
}

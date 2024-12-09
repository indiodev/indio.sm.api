import SchoolRepository from '#contracts/school.repository'
import { Create, QueryPaginate, Update } from '#dtos/base.dto'
import School from '#models/school.model'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export class InMemorySchoolRepository implements SchoolRepository {
  public items: School[] = []

  async create(payload: Create<typeof School>): Promise<School> {
    const user = new School()
    Object.assign(user, payload, { id: this.items.length + 1 })
    this.items.push(user)
    return user
  }

  async update(payload: Update<typeof School>): Promise<School> {
    const index = this.items.findIndex((user) => user.id === payload.id)
    // if (index === -1) {
    //   throw new Error('User not found')
    // }
    const updatedUser = { ...this.items[index], ...payload }
    this.items[index] = updatedUser
    return updatedUser
  }

  async delete(id: number): Promise<void> {
    const index = this.items.findIndex((user) => user.id === id)
    // if (index === -1) {
    //   throw new Error('User not found')
    // }
    this.items.splice(index, 1)
  }

  async paginate(query: QueryPaginate<typeof School>): Promise<ModelPaginatorContract<School>> {
    // const { page = 1, limit = 10 } = query
    // const start = (page - 1) * limit
    // const end = start + limit
    // const paginatedItems = this.items.slice(start, end)
    // const total = this.items.length
    console.log('InMemoryUserRepository.paginate', query)
    return {} as ModelPaginatorContract<School>
  }

  async findByCNPJ(cnpj: string): Promise<School | null> {
    return this.items.find((user) => user.cnpj === cnpj) || null
  }
  findBySlug(cnpj: string): Promise<InstanceType<typeof School> | null> {
    console.log('findBySlug', cnpj)
    throw new Error('Method not implemented.')
  }
}

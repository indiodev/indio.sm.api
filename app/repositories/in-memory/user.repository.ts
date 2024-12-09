import UserRepository from '#contracts/user.repository'
import { Create, QueryPaginate, Update } from '#dtos/base.dto'
import User from '#models/user.model'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async create(payload: Create<typeof User>): Promise<User> {
    const user = new User()
    Object.assign(user, payload, { id: this.items.length + 1 }) // Gerar um ID simples
    this.items.push(user)
    return user
  }

  async update(payload: Update<typeof User>): Promise<User> {
    const index = this.items.findIndex((user) => user.id === payload.id)
    if (index === -1) {
      throw new Error('User not found')
    }
    const updatedUser = { ...this.items[index], ...payload }
    this.items[index] = updatedUser
    return updatedUser
  }

  async delete(id: number): Promise<void> {
    const index = this.items.findIndex((user) => user.id === id)
    if (index === -1) {
      throw new Error('User not found')
    }
    this.items.splice(index, 1)
  }

  async paginate(query: QueryPaginate<typeof User>): Promise<ModelPaginatorContract<User>> {
    // const { page = 1, limit = 10 } = query
    // const start = (page - 1) * limit
    // const end = start + limit
    // const paginatedItems = this.items.slice(start, end)
    // const total = this.items.length
    console.log('InMemoryUserRepository.paginate', query)
    return {} as ModelPaginatorContract<User>
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((user) => user.email === email) || null
  }

  async findById(id: number): Promise<User | null> {
    return this.items.find((user) => user.id === id) || null
  }
}

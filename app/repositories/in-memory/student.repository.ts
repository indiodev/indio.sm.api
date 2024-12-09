import StudentRepository from '#contracts/student.repository'
import { Create, QueryPaginate, Update } from '#dtos/base.dto'
import Student from '#models/student.model'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export class InMemoryStudentRepository implements StudentRepository {
  public items: Student[] = []

  async create(payload: Create<typeof Student>): Promise<Student> {
    const user = new Student()
    Object.assign(user, payload, { id: this.items.length + 1 })
    this.items.push(user)
    return user
  }

  async update(payload: Update<typeof Student>): Promise<Student> {
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

  async paginate(query: QueryPaginate<typeof Student>): Promise<ModelPaginatorContract<Student>> {
    // const { page = 1, limit = 10 } = query
    // const start = (page - 1) * limit
    // const end = start + limit
    // const paginatedItems = this.items.slice(start, end)
    // const total = this.items.length
    console.log('InMemoryUserRepository.paginate', query)
    return {} as ModelPaginatorContract<Student>
  }

  async findByCPF(cpf: string): Promise<Student | null> {
    return this.items.find((user) => user.cpf === cpf) || null
  }
}

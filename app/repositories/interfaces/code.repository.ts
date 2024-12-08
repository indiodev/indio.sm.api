import { LucidModel } from '@adonisjs/lucid/types/model'

export interface CodeRepository<T extends LucidModel> {
  findByIdentifier(identifier: string): Promise<InstanceType<T> | null>
}

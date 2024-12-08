import { Token, Verify } from '#dtos/auth.dto'
import { LucidModel } from '@adonisjs/lucid/types/model'

export interface AuthRepository<T extends LucidModel> {
  create(payload: InstanceType<T>): Promise<Token>
  verify(payload: Verify): Promise<boolean>
}

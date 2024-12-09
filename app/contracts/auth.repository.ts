import { Token, Verify } from '#dtos/auth.dto'
import User from '#models/user.model'
import { inject } from '@adonisjs/core'

@inject()
export default abstract class AuthRepository {
  abstract create(payload: InstanceType<typeof User>): Promise<Token>
  abstract verify(payload: Verify): Promise<boolean>
}

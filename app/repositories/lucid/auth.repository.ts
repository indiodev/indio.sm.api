import { Token, Verify } from '#dtos/auth.dto'
import Model from '#models/user.model'
import { AuthRepository } from '#repositories/interfaces/auth.repository'
import stringHelpers from '@adonisjs/core/helpers/string'
import hash from '@adonisjs/core/services/hash'
// import db from '@adonisjs/lucid/services/db'

const _7DAYS = stringHelpers.seconds.parse(60 * 60 * 24 * 7)

export default class LucidAuthRepository implements AuthRepository<typeof Model> {
  constructor() {}

  async create(payload: InstanceType<typeof Model>): Promise<Token> {
    const credential = await Model.tokens.create(payload, [], {
      expiresIn: _7DAYS,
    })
    const { token, type, expiresAt } = credential?.toJSON()
    return { token, type, expiresAt }
  }

  // async revoke(payload: { userId: number; expiresAt: string }): Promise<void> {
  //   await db
  //     .from('auth_access_tokens')
  //     .where('tokenable_id', payload.userId)
  //     .andWhere('expires_at', '=', payload.expiresAt)
  //     .delete()
  // }

  async verify(payload: Verify): Promise<boolean> {
    return hash.verify(payload.hashed, payload.plain)
  }
}

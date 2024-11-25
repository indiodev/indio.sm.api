import Base from '#models/base.model'
import Responsible from '#models/responsible.model'
import { Role } from '#utils/enum.util'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import School from '#models/school.model'
import Student from '#models/student.model'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(Base, AuthFinder) {
  @column()
  declare name: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: Role

  static tokens = DbAccessTokensProvider.forModel(User)

  @hasOne(() => Responsible)
  declare responsible: HasOne<typeof Responsible>

  @hasOne(() => School)
  declare school: HasOne<typeof School>

  @hasOne(() => Student)
  declare student: HasOne<typeof Student>
}

import Code from '#models/code.model'
import { inject } from '@adonisjs/core'

@inject()
export default abstract class CodeRepository {
  abstract findByIdentifier(identifier: string): Promise<InstanceType<typeof Code> | null>
}

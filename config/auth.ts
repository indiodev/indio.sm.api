import { defineConfig } from '@adonisjs/auth'
import { tokensGuard, tokensUserProvider } from '@adonisjs/auth/access_tokens'
import type { Authenticators, InferAuthEvents } from '@adonisjs/auth/types'

const authConfig = defineConfig({
  default: 'api',
  guards: {
    api: tokensGuard({
      provider: tokensUserProvider({
        tokens: 'tokens',
        model: () => import('#models/user.model'),
      }),
    }),
  },
})

export default authConfig

/**
 * Inferring types from the configured auth
 * guards.
 */
declare module '@adonisjs/auth/types' {
  export interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}

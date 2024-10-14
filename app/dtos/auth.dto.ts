import {
  AuthCheckExistFieldSchema,
  AuthSignInSchema,
  AuthSignUpSchema,
} from '#validators/auth.validator'
import { Infer } from '@vinejs/vine/types'

export type Token = {
  token?: string
  type: string
  expiresAt: Date | null
}

export type Verify = {
  hashed: string
  plain: string
}

export type AuthSignUp = Infer<typeof AuthSignUpSchema>
export type AuthSignIn = Infer<typeof AuthSignInSchema>
export type AuthCheckExistField = Infer<typeof AuthCheckExistFieldSchema>

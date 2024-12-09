import { CreateEnrollmentSchema } from '#validators/enrollment.validator'
import { Infer } from '@vinejs/vine/types'

export type CreateEnrollment = Infer<typeof CreateEnrollmentSchema>

import { EnrollmentSchema } from '#validators/enrollment.validator'
import { Infer } from '@vinejs/vine/types'

export type Enrollment = Infer<typeof EnrollmentSchema>

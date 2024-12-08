import { CreateStudentSchema } from '#validators/student.validator'
import { Infer } from '@vinejs/vine/types'

export type CreateStudent = Infer<typeof CreateStudentSchema>

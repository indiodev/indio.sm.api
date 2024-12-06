import vine from '@vinejs/vine'
import { cpfValidatorRule } from './my_validations/index.js'
import { NumberNormalizer } from '#utils/function.util'
import { AddressSchema } from './address.validator.js'
import { CreateStudentSchema } from './student.validator.js'

export const ResponsibleSchema = vine.object({
  first_name: vine.string().trim(),
  last_name: vine.string().trim(),
  phone_number: vine.string().trim().transform(NumberNormalizer),
  cpf: vine
    .string()
    .use(
      cpfValidatorRule({
        minLength: 11,
        requiredDifferentNumbers: true,
        isValid: true,
      })
    )
    .transform(NumberNormalizer),
  rg: vine.string().trim(),
})

export const EnrollmentSchema = vine.object({
  course_id: vine.number(),
  student: CreateStudentSchema,
  responsible: ResponsibleSchema,
  address: AddressSchema,
})

export const EnrollmentValidator = vine.compile(EnrollmentSchema)

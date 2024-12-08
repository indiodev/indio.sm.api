import { Gender } from '#utils/constant'
import { NumberNormalizer } from '#utils/function.util'
import vine from '@vinejs/vine'
import { cpfValidatorRule } from './my_validations/index.js'

export const StudentSchema = vine.object({
  phone: vine.string().trim().transform(NumberNormalizer),
  cpf: vine.string().trim().transform(NumberNormalizer),
})

export const CreateStudentSchema = vine.object({
  email: vine.string().trim(),
  first_name: vine.string().trim(),
  last_name: vine.string().trim(),
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
  rg: vine.string().trim().optional(),
  gender: vine.enum(Gender),
  birth_date: vine.string().trim(),
})

import { Gender } from '#utils/constant'
import { NumberNormalizer } from '#utils/function.util'
import vine from '@vinejs/vine'

export const StudentSchema = vine.object({
  phone: vine.string().trim().transform(NumberNormalizer),
  cpf: vine.string().trim().transform(NumberNormalizer),
})

export const CreateStudentSchema = vine.object({
  email: vine.string().trim(),
  name: vine.string().trim(),
  cpf: vine
    .string()
    .fixedLength(14)
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    // .use(
    //   cpfValidatorRule({
    //     minLength: 11,
    //     requiredDifferentNumbers: true,
    //     isValid: true,
    //   })
    // )
    .transform(NumberNormalizer),
  rg: vine.string().trim().optional(),
  gender: vine.enum(Gender),
  birth_date: vine.string().trim(),
})

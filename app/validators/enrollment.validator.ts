import { Gender } from '#utils/constant'
import {
  CheckExistClassById,
  CheckExistSchoolById,
  CheckNotExistStudentByCPF,
} from '#utils/database.util'
import { NumberNormalizer } from '#utils/function.util'
import { AddressSchema } from '#validators/address.validator'
import vine from '@vinejs/vine'

const BaseEntitySchema = vine.object({
  name: vine.string().trim(),
  email: vine.string().trim(),
  birth_date: vine.string().trim(),
  gender: vine.enum(Gender),
  phone: vine.string().trim().transform(NumberNormalizer),
})

export const EnrollmentCreateStudentSchema = vine.object({
  ...BaseEntitySchema.clone().getProperties(),
  cpf: vine
    .string()
    .unique(CheckNotExistStudentByCPF)
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
})

export const EnrollmentResponsibleCreateSchema = vine.object({
  ...BaseEntitySchema.clone().getProperties(),
  cpf: vine
    .string()
    // .unique(CheckNotExistResponsibleByCPF)
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
})

export const CreateEnrollmentSchema = vine.object({
  class_id: vine.number().unique(CheckExistClassById),
  school_id: vine.number().unique(CheckExistSchoolById),
  student: EnrollmentCreateStudentSchema.clone(),
  responsible: EnrollmentResponsibleCreateSchema.clone().nullable(),
  address: AddressSchema.clone(),
})

export const CreateEnrollmentValidator = vine.compile(CreateEnrollmentSchema)

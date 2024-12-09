import { Database } from '@adonisjs/lucid/database'
import { FieldContext } from '@vinejs/vine/types'
import { NumberNormalizer } from './function.util.js'

export async function CheckExistSchoolById(
  db: Database,
  value: string,
  _: FieldContext
): Promise<boolean> {
  const school = await db.from('schools').where('id', value).first()
  return Boolean(school)
}

export async function CheckExistCourseById(
  db: Database,
  value: string,
  _: FieldContext
): Promise<boolean> {
  const course = await db.from('courses').where('id', value).first()
  return Boolean(course)
}

export async function CheckExistClassById(
  db: Database,
  value: string,
  _: FieldContext
): Promise<boolean> {
  const _class = await db.from('classes').where('id', value).first()
  return Boolean(_class)
}

export async function CheckNotExistResponsibleByCPF(
  db: Database,
  value: string,
  _: FieldContext
): Promise<boolean> {
  const responsible = await db.from('responsibles').where('cpf', NumberNormalizer(value)).first()
  if (responsible) return false
  return true
}

export async function CheckNotExistStudentByCPF(
  db: Database,
  value: string,
  _: FieldContext
): Promise<boolean> {
  const student = await db.from('students').where('cpf', NumberNormalizer(value)).first()

  if (student) return false
  return true
}

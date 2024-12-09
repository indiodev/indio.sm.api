import { DateTime } from 'luxon'

export function NumberNormalizer(value: string): string {
  return value.replace(/[^\d]/g, '')
}

export function DateSerialize(value: DateTime | Date): string {
  if (value instanceof DateTime) return value.toFormat('yyyy-MM-dd')
  if (value instanceof Date) return DateTime.fromJSDate(value).toFormat('yyyy-MM-dd')
  return value
}

export function DateTimeSerialize(value: DateTime | Date): string {
  if (value instanceof DateTime) return value.toFormat('yyyy-MM-dd HH:mm:ss')
  if (value instanceof Date) return DateTime.fromJSDate(value).toFormat('yyyy-MM-dd HH:mm:ss')
  return value
}

export function TimeHourMinuteSerialize(value: DateTime | Date): string {
  if (value instanceof DateTime) return value.toFormat('HH:mm')
  if (value instanceof Date) return DateTime.fromJSDate(value).toFormat('HH:mm')
  return value
}

export function generateClassCode(payload: {
  course_id: number
  school_id: number
  reference: number
}): string {
  // const year = DateTime.now().year
  return 'T'.concat(payload.reference.toString())
  // .concat(payload.reference.toString())
  // .concat('E' + payload.school_id.toString())
  // .concat('C' + payload.course_id.toString())
  // .concat(year.toString())
}

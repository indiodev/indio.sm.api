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

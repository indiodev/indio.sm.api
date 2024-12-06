import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

type Options = {
  minLength?: number
  requiredDifferentNumbers?: boolean
  isValid?: boolean
}

function cpfValidation(value: unknown, options: Options, field: FieldContext): void {
  if (typeof value !== 'string') {
    field.report('O CPF deve ser uma string.', 'cpfValidation', field)
    return
  }

  const { minLength = 11, requiredDifferentNumbers = true, isValid = true } = options

  const errors: string[] = []
  const cpf = value.replace(/\D/g, '')

  if (value.length < minLength) {
    errors.push(`The {{ field }} must be at least ${minLength} characters long.`)
  }

  if (requiredDifferentNumbers && /^(\d)\1+$/.test(cpf)) {
    errors.push(`The {{ field }} cannot contain all identical digits.`)
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const validateCPF = (cpf: string): boolean => {
    const calcDigit = (factor: number, base: number): number => {
      let total = 0
      for (let i = 0; i < base; i++) {
        total += Number.parseInt(cpf[i]) * (factor - i)
      }
      const remainder = total % 11
      return remainder < 2 ? 0 : 11 - remainder
    }

    const digit1 = calcDigit(10, 9)
    const digit2 = calcDigit(11, 10)

    return digit1 === Number.parseInt(cpf[9]) && digit2 === Number.parseInt(cpf[10])
  }

  if (isValid && !validateCPF(cpf)) {
    errors.push('The provided {{ field }} is invalid.')
  }

  if (errors.length > 0) {
    for (const error of errors) {
      field.report(error, 'cpfValidation', field)
    }
  }
}

export const cpfValidatorRule = vine.createRule(cpfValidation)

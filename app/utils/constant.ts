import env from '#start/env'

// trocar o email do envio
export const EMAIL_SENDER = `${env.get('APP_NAME')} <email@gmail.com>`

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NON_BINARY = 'NON_BINARY',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
}

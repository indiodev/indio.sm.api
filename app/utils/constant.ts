import env from '#start/env'

// trocar o email do envio
export const EMAIL_SENDER = `${env.get('APP_NAME')} <email@gmail.com>`

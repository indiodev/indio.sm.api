import { Email } from '#dtos/email'
import User from '#models/user.model'
import env from '#start/env'
import { SendEmailPasswordChangeConfirmationTemplate } from '#templates/email/send_email_to_confirmation_reset_password'
import { SendGenericConfirmationEmailTemplate } from '#templates/email/send_email_to_confirmation_signup'
import { SendEmailToResetPasswordTemplate } from '#templates/email/send_email_to_reset_password'
import { EMAIL_SENDER } from '#utils/constant'
import { inject } from '@adonisjs/core'
import sgMail from '@sendgrid/mail'

// ja ta quase tudo certo, precisamos de um seed com email valido e um email para que possamos cadastrar la no sendGrid
@inject()
export default class EmailService {
  private appName = env.get('APP_NAME')

  private async sendEmail(sendGridDtoWithoutFrom: Omit<Email, 'from'>): Promise<void> {
    sgMail.setApiKey(env.get('SEND_GRID_API_KEY'))
    await sgMail.send({ from: EMAIL_SENDER, ...sendGridDtoWithoutFrom })
  }

  async sendConfirmationSingUpEmail(user: User): Promise<void> {
    const emailDtoWithoutFrom = {
      to: user.email,
      subject: `Bem-vindo à ${this.appName} - Confirmação de Cadastro`,
      text: `Bem-vindo à ${this.appName}`,
      html: SendGenericConfirmationEmailTemplate(user.name),
    }
    await this.sendEmail(emailDtoWithoutFrom)
  }

  async senResetPasswordEmail(user: User, code: string): Promise<void> {
    let html: string
    let subject = `Recuperação de senha - ${this.appName}`

    html = SendEmailToResetPasswordTemplate(code)

    const emailDtoWithoutFrom = {
      to: user.email,
      subject,
      text: `Recuperação de Senha - ${this.appName}`,
      html,
    }

    await this.sendEmail(emailDtoWithoutFrom)
  }

  async sendPasswordChangeConfirmationEmail(user: User): Promise<void> {
    const html = SendEmailPasswordChangeConfirmationTemplate(user.name)

    const emailDtoWithoutFrom = {
      to: user.email,
      subject: `Confirmação de Alteração de Senha - ${this.appName}`,
      text: 'Sua senha foi alterada com sucesso.',
      html,
    }

    await this.sendEmail(emailDtoWithoutFrom)
  }
}

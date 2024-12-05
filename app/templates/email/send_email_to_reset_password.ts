export function SendEmailToResetPasswordTemplate(token: string): string {
  const appName = process.env.APP_NAME || 'Sua Aplicação'

  return `<!DOCTYPE html>
  <html lang="pt-BR">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${appName} - Recuperação de Senha</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f8f8; color: #333;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f8f8; padding: 20px 0;">
          <tr>
              <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 5px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                      <tr>
                          <td style="background-color: #4caf50; color: #fff; text-align: center; padding: 15px;">
                              <h1 style="margin: 0; font-size: 20px;">${appName}</h1>
                          </td>
                      </tr>
                      <tr>
                          <td style="padding: 20px;">
                              <p style="font-size: 16px; margin-bottom: 10px;">Olá,</p>
                              <p style="font-size: 16px; margin-bottom: 20px;">
                                  Você solicitou a recuperação de senha. Use o código abaixo para continuar o processo:
                              </p>
                              <div style="text-align: center; background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                                  <span style="font-size: 24px; font-weight: bold; color: #4caf50;">${token.split('').join(' ')}</span>
                              </div>
                              <p style="font-size: 16px; margin-bottom: 20px;">
                                  Se você não solicitou a recuperação de senha, por favor, ignore este e-mail.
                              </p>
                              <p style="font-size: 16px; margin-bottom: 0;">Atenciosamente,</p>
                              <p style="font-size: 16px; font-weight: bold;">Equipe ${appName}</p>
                          </td>
                      </tr>
                      <tr>
                          <td style="background-color: #f0f0f0; text-align: center; padding: 10px; font-size: 12px; color: #888;">
                              Esta é uma mensagem automática. Por favor, não responda.
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  </html>`
}

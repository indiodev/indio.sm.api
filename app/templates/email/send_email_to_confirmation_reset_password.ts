export function SendEmailPasswordChangeConfirmationTemplate(name: string): string {
  const appName = process.env.APP_NAME

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Senha Alterada</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f8f8f8;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 5px;
      overflow: hidden;
    }
    .header {
      background-color: #4caf50;
      color: #fff;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 20px;
    }
    .footer {
      background-color: #f8f8f8;
      color: #666;
      font-size: 14px;
      text-align: center;
      padding: 15px;
    }
    .social-icons img {
      width: 32px;
      margin: 0 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Senha Alterada</h1>
    </div>
    <div class="content">
      <p>Olá ${name},</p>
      <p>Sua senha foi alterada com sucesso.</p>
      <p>Se você não reconhece essa alteração, entre em contato conosco imediatamente.</p>
    </div>
    <div class="footer">
      <p>${appName}</p>
      <p>Essa é uma mensagem automática, por favor, não responda.</p>
    </div>
  </div>
</body>
</html>`
}

export function SendGenericConfirmationEmailTemplate(name: string): string {
  const appName = process.env.APP_NAME
  const frontEnd = process.env.FRONTEND_URL

  return `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmação de Cadastro</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333333;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            text-align: center;
        }
        .content h1 {
            font-size: 20px;
            color: #444444;
        }
        .content p {
            font-size: 16px;
            color: #666666;
            line-height: 1.5;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #999999;
            margin-top: 20px;
        }
        .button {
            display: inline-block;
            background-color: #007BFF;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="https://example.com/logo.png" alt="Logo">
        </div>
        <div class="content">
            <h1>Bem-vindo, ${name}!</h1>
            <p>Seu cadastro foi realizado com sucesso. Estamos felizes em ter você conosco!</p>
            <p>Para começar a utilizar nossos serviços, clique no botão abaixo:</p>
            <a href="${frontEnd}" class="button">Acessar Plataforma</a>
        </div>
        <div class="footer">
            <p>Se você não realizou este cadastro, ignore este email.</p>
            <p>&copy; ${new Date().getFullYear()} ${appName}. Todos os direitos reservados.</p>
        </div>
    </div>
</body>
</html>
  `
}

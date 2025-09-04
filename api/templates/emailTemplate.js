const emailTemplate = (nombre, email, asunto, mensaje) => {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo Mensaje de Contacto</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
            background-color: #f8fafc;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            padding: 30px 20px;
            text-align: center;
            color: white;
        }
        .email-title {
            font-size: 24px;
            font-weight: bold;
            margin: 0;
            color: white;
        }
        .email-subtitle {
            font-size: 16px;
            opacity: 0.9;
            margin: 5px 0 0 0;
        }
        .email-body {
            padding: 30px;
        }
        .message-card {
            background-color: #f1f5f9;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 25px;
            border-left: 4px solid #3b82f6;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 15px;
            margin-bottom: 25px;
        }
        .info-item {
            background-color: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
        }
        .info-label {
            font-weight: 600;
            color: #64748b;
            font-size: 14px;
            margin-bottom: 5px;
            display: block;
        }
        .info-value {
            color: #1e293b;
            font-size: 16px;
            word-break: break-word;
        }
        .message-content {
            background-color: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
        }
        .message-text {
            color: #374151;
            line-height: 1.8;
            white-space: pre-wrap;
        }
        .email-footer {
            background-color: #f1f5f9;
            padding: 20px;
            text-align: center;
            color: #64748b;
            font-size: 14px;
        }
        .footer-text {
            margin: 5px 0;
        }
        .highlight {
            color: #3b82f6;
            font-weight: 600;
        }
        .divider {
            height: 1px;
            background-color: #e2e8f0;
            margin: 25px 0;
        }
        a {
            color: #3b82f6;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <div class="email-title">📧 Nuevo Mensaje Recibido</div>
            <div class="email-subtitle">Sistema de Contacto - Dislexia Kids</div>
        </div>

        <!-- Body -->
        <div class="email-body">
            <div class="message-card">
                <h3 style="margin: 0 0 10px 0; color: #1e293b;">¡Tienes un nuevo mensaje de contacto!</h3>
                <p style="margin: 0; color: #64748b;">Un usuario ha completado el formulario de contacto en el sitio web.</p>
            </div>

            <!-- Información del usuario -->
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">👤 Nombre completo</span>
                    <div class="info-value">${nombre}</div>
                </div>
                
                <div class="info-item">
                    <span class="info-label">📧 Email de contacto</span>
                    <div class="info-value">
                        <a href="mailto:${email}">${email}</a>
                    </div>
                </div>
                
                <div class="info-item">
                    <span class="info-label">📋 Asunto del mensaje</span>
                    <div class="info-value highlight">${asunto}</div>
                </div>
                
                <div class="info-item">
                    <span class="info-label">⏰ Fecha de envío</span>
                    <div class="info-value">${new Date().toLocaleString(
                      "es-ES",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}</div>
                </div>
            </div>

            <div class="divider"></div>

            <!-- Mensaje -->
            <div>
                <h4 style="margin: 0 0 15px 0; color: #1e293b;">💬 Mensaje del usuario:</h4>
                <div class="message-content">
                    <p class="message-text">${mensaje}</p>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <p class="footer-text">
                <strong>Dislexia Kids</strong> - Sistema de detección temprana de dislexia
            </p>
            <p class="footer-text">
                📍 I.T.S de Tepexi de Rodríguez, Puebla, México
            </p>
            <p class="footer-text">
                ⚠️ Este es un mensaje automático, por favor no responder directamente a este correo.
            </p>
            <p class="footer-text" style="margin-top: 15px;">
                <small>© ${new Date().getFullYear()} Dislexia Kids. Todos los derechos reservados.</small>
            </p>
        </div>
    </div>
</body>
</html>
  `;
};

module.exports = emailTemplate;
// server/api/contact.post.ts
// ─────────────────────────────────────────
// Recibe el formulario, valida los datos y envía el correo
// usando Resend. El correo destino se configura en .env

import { Resend } from 'resend'

interface ContactBody {
  nombre:   string
  telefono: string
  email:    string
  tipo:     string
  ciudad?:  string
  mensaje:  string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body   = await readBody<ContactBody>(event)

  // ── Validación básica ──
  const required = ['nombre', 'telefono', 'email', 'tipo', 'mensaje']
  for (const field of required) {
    if (!body[field as keyof ContactBody]?.trim()) {
      throw createError({ statusCode: 400, message: `El campo ${field} es requerido.` })
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    throw createError({ statusCode: 400, message: 'Correo electrónico inválido.' })
  }

  // ── Enviar con Resend ──
  const resend = new Resend(config.resendApiKey)

  const { error } = await resend.emails.send({
    from:    'Formulario Web <noreply@constructora.cl>',   // ← cambiar por dominio verificado en Resend
    to:      [config.contactEmail],
    replyTo: body.email,
    subject: `Nueva solicitud de cotización — ${body.tipo}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f7f4ef; padding: 32px; border-radius: 4px;">
        <div style="background: #1C1A17; padding: 20px 28px; border-radius: 4px 4px 0 0;">
          <h1 style="font-size: 24px; font-weight: 900; color: #C8862A; margin: 0; letter-spacing: 0.05em; text-transform: uppercase;">
            Nueva Solicitud de Cotización
          </h1>
        </div>
        <div style="background: white; padding: 28px; border-radius: 0 0 4px 4px; border: 1px solid #e4ddd3;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e4ddd3; color: #6b6355; font-size: 13px; width: 140px;">Nombre</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e4ddd3; font-weight: 600; font-size: 14px;">${body.nombre}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e4ddd3; color: #6b6355; font-size: 13px;">Teléfono</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e4ddd3; font-weight: 600; font-size: 14px;">${body.telefono}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e4ddd3; color: #6b6355; font-size: 13px;">Correo</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e4ddd3; font-size: 14px;"><a href="mailto:${body.email}" style="color: #C8862A;">${body.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e4ddd3; color: #6b6355; font-size: 13px;">Tipo de proyecto</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e4ddd3; font-weight: 600; font-size: 14px; color: #C8862A;">${body.tipo}</td>
            </tr>
            ${body.ciudad ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e4ddd3; color: #6b6355; font-size: 13px;">Ciudad</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e4ddd3; font-size: 14px;">${body.ciudad}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; color: #6b6355; font-size: 13px; vertical-align: top;">Mensaje</td>
              <td style="padding: 10px 0; font-size: 14px; line-height: 1.6;">${body.mensaje.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
        </div>
        <p style="font-size: 11px; color: #b8afa3; margin-top: 16px; text-align: center;">
          Enviado desde el formulario de contacto de constructora.cl
        </p>
      </div>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    throw createError({ statusCode: 500, message: 'Error al enviar el correo. Intenta nuevamente.' })
  }

  return { ok: true, message: '¡Mensaje enviado! Te contactaremos en breve.' }
})

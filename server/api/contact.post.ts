// server/api/contact.post.ts
// ─────────────────────────────────────────
// Recibe el formulario, valida los datos y envía el correo
// usando Resend. El correo destino se configura en .env

import { Resend } from 'resend'

// Escapa el texto del usuario antes de insertarlo en el HTML del correo
const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
   .replace(/"/g, '&quot;').replace(/'/g, '&#39;')

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

  // ── Configuración ──
  if (!config.resendApiKey || !config.contactEmail) {
    console.error('Formulario de contacto: falta RESEND_API_KEY o CONTACT_EMAIL en las variables de entorno')
    throw createError({ statusCode: 500, message: 'El formulario no está disponible. Escríbenos por WhatsApp.' })
  }

  // Sanitiza lo que el usuario escribió antes de armar el HTML
  const d = {
    nombre:   esc(body.nombre.trim()),
    telefono: esc(body.telefono.trim()),
    email:    esc(body.email.trim()),
    tipo:     esc(body.tipo.trim()),
    ciudad:   body.ciudad?.trim() ? esc(body.ciudad.trim()) : '',
    mensaje:  esc(body.mensaje.trim()).replace(/\n/g, '<br>'),
  }

  // ── Enviar con Resend ──
  // El remitente DEBE ser de un dominio verificado en Resend.
  // Sin dominio propio solo funciona onboarding@resend.dev, y en ese caso
  // Resend solo entrega a la dirección con la que se creó la cuenta.
  const resend = new Resend(config.resendApiKey)

  const { error } = await resend.emails.send({
    from:    config.resendFrom,
    to:      [config.contactEmail],
    replyTo: body.email.trim(),
    subject: `Nueva solicitud de cotización — ${body.tipo.trim()}`,
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
              <td style="padding: 10px 0; border-bottom: 1px solid #e4ddd3; font-weight: 600; font-size: 14px;">${d.nombre}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e4ddd3; color: #6b6355; font-size: 13px;">Teléfono</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e4ddd3; font-weight: 600; font-size: 14px;">${d.telefono}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e4ddd3; color: #6b6355; font-size: 13px;">Correo</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e4ddd3; font-size: 14px;"><a href="mailto:${d.email}" style="color: #C8862A;">${d.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e4ddd3; color: #6b6355; font-size: 13px;">Tipo de proyecto</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e4ddd3; font-weight: 600; font-size: 14px; color: #C8862A;">${d.tipo}</td>
            </tr>
            ${d.ciudad ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e4ddd3; color: #6b6355; font-size: 13px;">Ciudad</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e4ddd3; font-size: 14px;">${d.ciudad}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; color: #6b6355; font-size: 13px; vertical-align: top;">Mensaje</td>
              <td style="padding: 10px 0; font-size: 14px; line-height: 1.6;">${d.mensaje}</td>
            </tr>
          </table>
        </div>
        <p style="font-size: 11px; color: #b8afa3; margin-top: 16px; text-align: center;">
          Enviado desde el formulario de contacto del sitio web
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

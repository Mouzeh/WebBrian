// /llms.txt — resumen del sitio para asistentes de IA (formato llmstxt.org)
import { NEGOCIO } from '../../composables/negocio'

export default defineEventHandler(async (event) => {
  const site = urlSitio()
  const [proyectos, posts] = await Promise.all([proyectosPublicados(), postsPublicados()])
  const modelos = proyectos.filter(p => p.categoria === 'construccion')
  const terminados = proyectos.filter(p => p.categoria !== 'construccion')

  const linea = (titulo: string, url: string, desc?: string) =>
    `- [${titulo}](${url})${desc ? `: ${desc.replace(/\s+/g, ' ').trim()}` : ''}`

  const partes = [
    `# ${NEGOCIO.nombre}`,
    '',
    `> ${NEGOCIO.descripcion}`,
    '',
    `Ubicación: ${NEGOCIO.ciudad}, ${NEGOCIO.region}, Chile. Zona de trabajo: ${NEGOCIO.areaServida.join(', ')}.`,
    `Contacto: teléfono/WhatsApp ${NEGOCIO.telefono}, correo ${NEGOCIO.email}. Horario: lunes a viernes de ${NEGOCIO.horario.abre} a ${NEGOCIO.horario.cierra}.`,
    `Servicios: ${NEGOCIO.servicios.join(', ')}.`,
    '',
    '## Páginas principales',
    linea('Inicio', `${site}/`, 'Presentación de la constructora, modelos destacados y preguntas frecuentes'),
    linea('Modelos de casas y proyectos', `${site}/proyectos`, 'Catálogo de modelos para construir y casas terminadas'),
    linea('Servicios', `${site}/servicios`, 'Construcción, instalaciones eléctricas y sanitarias, permisos, regularizaciones y topografía'),
    linea('Blog', `${site}/blog`, 'Guías sobre construcción de casas en el sur de Chile'),
    linea('Nosotros', `${site}/nosotros`),
    linea('Contacto y cotización', `${site}/contacto`)
  ]

  if (modelos.length) {
    partes.push('', '## Modelos de casas para construir')
    modelos.forEach(p => partes.push(linea(p.titulo, `${site}/proyectos/${p.slug}`, [p.descripcion?.replace(/\.\s*$/, ''), p.precio ? `Precio desde ${p.precio}` : ''].filter(Boolean).join('. '))))
  }
  if (terminados.length) {
    partes.push('', '## Proyectos terminados')
    terminados.forEach(p => partes.push(linea(p.titulo, `${site}/proyectos/${p.slug}`, p.descripcion)))
  }
  if (posts.length) {
    partes.push('', '## Artículos del blog')
    posts.forEach(p => partes.push(linea(p.titulo, `${site}/blog/${p.slug}`, p.meta_descripcion || p.resumen)))
  }

  partes.push('', '## Opcional', linea('Política de privacidad', `${site}/privacidad`), linea('Términos y condiciones', `${site}/terminos`), '')

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')
  return partes.join('\n')
})

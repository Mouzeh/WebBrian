// /sitemap.xml — páginas fijas + proyectos y artículos publicados
const PAGINAS_FIJAS = [
  { ruta: '/', prioridad: '1.0', frecuencia: 'weekly' },
  { ruta: '/proyectos', prioridad: '0.9', frecuencia: 'weekly' },
  { ruta: '/blog', prioridad: '0.8', frecuencia: 'weekly' },
  { ruta: '/servicios', prioridad: '0.8', frecuencia: 'monthly' },
  { ruta: '/nosotros', prioridad: '0.6', frecuencia: 'monthly' },
  { ruta: '/contacto', prioridad: '0.7', frecuencia: 'monthly' },
  { ruta: '/privacidad', prioridad: '0.2', frecuencia: 'yearly' },
  { ruta: '/terminos', prioridad: '0.2', frecuencia: 'yearly' }
]

const escapar = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const fecha = (f?: string) => (f ? new Date(f).toISOString().slice(0, 10) : undefined)

export default defineEventHandler(async (event) => {
  const site = urlSitio()
  const [proyectos, posts] = await Promise.all([proyectosPublicados(), postsPublicados()])

  const urls = [
    ...PAGINAS_FIJAS.map(p => ({ loc: `${site}${p.ruta}`, prioridad: p.prioridad, frecuencia: p.frecuencia, lastmod: undefined as string | undefined })),
    ...proyectos.map(p => ({ loc: `${site}/proyectos/${p.slug}`, prioridad: '0.8', frecuencia: 'monthly', lastmod: fecha(p.updated_at || p.created_at) })),
    ...posts.map(p => ({ loc: `${site}/blog/${p.slug}`, prioridad: '0.7', frecuencia: 'monthly', lastmod: fecha(p.updated_at || p.publicado_at) }))
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${escapar(u.loc)}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.frecuencia}</changefreq>
    <priority>${u.prioridad}</priority>
  </url>`).join('\n')}
</urlset>
`
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')
  return xml
})

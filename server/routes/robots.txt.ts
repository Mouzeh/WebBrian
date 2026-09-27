// /robots.txt — permite indexar el sitio y bloquea el panel de administración
export default defineEventHandler((event) => {
  const site = urlSitio()
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /Brian',
    'Disallow: /brian',
    'Disallow: /api/',
    '',
    `Sitemap: ${site}/sitemap.xml`,
    ''
  ].join('\n')
})

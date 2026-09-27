// composables/negocio.ts
// ─────────────────────────────────────────
// Datos del negocio usados en SEO (schemas, llms.txt, metadatos).
// Sin dependencias de Nuxt: también se importa desde server/routes.

export const NEGOCIO = {
  nombre: 'Inmobiliaria y Constructora R&J SPA',
  marca: 'R&J Constructora',
  descripcion:
    'Inmobiliaria y constructora en la Región de Los Ríos, Chile. Construimos casas a medida y modelos de casas listos para construir, con acompañamiento desde el diseño y los permisos hasta la entrega.',
  telefono: '+56959266213',
  telefono2: '+56945253552',
  whatsapp: '56959266213',
  email: 'inmobiliariayconstructoraryj@gmail.com',
  ciudad: 'Valdivia',
  region: 'Región de Los Ríos',
  pais: 'CL',
  areaServida: ['Región de Los Ríos', 'Valdivia', 'Región de Los Lagos'],
  horario: { dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], abre: '09:00', cierra: '18:00' },
  redes: [
    'https://www.instagram.com/constructora_ryj_spa',
    'https://www.facebook.com/share/1JUpN2AVtu/'
  ],
  logo: '/images/logosinfondo.png',
  servicios: [
    'Construcción de casas',
    'Modelos de casas prefabricadas y a medida',
    'Instalaciones eléctricas',
    'Instalaciones sanitarias',
    'Permisos de edificación y regularizaciones',
    'Topografía'
  ]
}

// Schema.org del negocio local (GeneralContractor)
export function schemaNegocio(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${siteUrl}/#negocio`,
    name: NEGOCIO.nombre,
    alternateName: NEGOCIO.marca,
    description: NEGOCIO.descripcion,
    url: siteUrl,
    logo: `${siteUrl}${NEGOCIO.logo}`,
    image: `${siteUrl}${NEGOCIO.logo}`,
    telephone: NEGOCIO.telefono,
    email: NEGOCIO.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: NEGOCIO.ciudad,
      addressRegion: NEGOCIO.region,
      addressCountry: NEGOCIO.pais
    },
    areaServed: NEGOCIO.areaServida.map(name => ({ '@type': 'AdministrativeArea', name })),
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: NEGOCIO.horario.dias,
      opens: NEGOCIO.horario.abre,
      closes: NEGOCIO.horario.cierra
    }],
    sameAs: NEGOCIO.redes,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de construcción',
      itemListElement: NEGOCIO.servicios.map(name => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name }
      }))
    }
  }
}

export function schemaSitioWeb(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#web`,
    name: NEGOCIO.marca,
    url: siteUrl,
    inLanguage: 'es-CL',
    publisher: { '@id': `${siteUrl}/#negocio` }
  }
}

// Convierte un texto en slug (para URLs, ids y nombres de archivo)
export function slugificar(texto: string): string {
  return (texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

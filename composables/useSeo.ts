// composables/useSeo.ts
// ─────────────────────────────────────────
// Metadatos por página: título, descripción, canonical, Open Graph y schemas JSON-LD.

import { NEGOCIO } from './negocio'

interface OpcionesSeo {
  titulo: string            // Idealmente 50–60 caracteres
  descripcion: string       // Idealmente 120–160 caracteres
  ruta?: string             // Ruta canónica, ej: '/blog'
  imagen?: string           // URL absoluta o relativa
  tipo?: 'website' | 'article'
  noindex?: boolean
}

// URL base del sitio. Se lee una vez dentro de setup (usePaginaSeo/useSchema) porque
// useRuntimeConfig no puede llamarse después, cuando se generan los metadatos.
let siteUrlCache: string | null = null

function siteUrlBase() {
  if (siteUrlCache === null) {
    siteUrlCache = ((useRuntimeConfig().public.siteUrl as string) || '').replace(/\/$/, '')
  }
  return siteUrlCache
}

export function urlAbsoluta(ruta = '') {
  const siteUrl = siteUrlBase()
  if (!ruta) return siteUrl
  if (ruta.startsWith('http')) return ruta
  return `${siteUrl}${ruta.startsWith('/') ? '' : '/'}${ruta}`
}

export function usePaginaSeo(opciones: OpcionesSeo | (() => OpcionesSeo)) {
  const route = useRoute()
  siteUrlBase()
  const o = computed(() => (typeof opciones === 'function' ? opciones() : opciones))

  const canonical = computed(() => urlAbsoluta(o.value.ruta ?? route.path))
  const imagen = computed(() => urlAbsoluta(o.value.imagen || NEGOCIO.logo))

  useSeoMeta({
    title: () => o.value.titulo,
    description: () => o.value.descripcion,
    ogTitle: () => o.value.titulo,
    ogDescription: () => o.value.descripcion,
    ogType: () => o.value.tipo || 'website',
    ogUrl: () => canonical.value,
    ogImage: () => imagen.value,
    ogSiteName: NEGOCIO.marca,
    ogLocale: 'es_CL',
    twitterCard: 'summary_large_image',
    twitterTitle: () => o.value.titulo,
    twitterDescription: () => o.value.descripcion,
    twitterImage: () => imagen.value,
    robots: () => (o.value.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')
  })

  useHead({
    link: [{ rel: 'canonical', href: () => canonical.value }]
  })
}

// Inserta uno o más schemas JSON-LD
export function useSchema(schema: object | (() => object | object[] | null)) {
  siteUrlBase()
  useHead({
    script: [{
      type: 'application/ld+json',
      key: 'schema-pagina',
      innerHTML: () => {
        const valor = typeof schema === 'function' ? schema() : schema
        return JSON.stringify(valor ?? [])
      }
    }]
  })
}

export function schemaMigas(items: { nombre: string; ruta: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.nombre,
      item: urlAbsoluta(it.ruta)
    }))
  }
}

export function schemaFaq(faqs: { pregunta: string; respuesta: string }[]) {
  if (!faqs?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: f.respuesta }
    }))
  }
}

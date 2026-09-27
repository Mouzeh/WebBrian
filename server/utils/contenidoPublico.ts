// server/utils/contenidoPublico.ts
// Lee proyectos y artículos publicados desde Supabase (REST) para sitemap y llms.txt.

interface FilaProyecto {
  slug: string
  titulo: string
  descripcion?: string
  categoria?: string
  ubicacion?: string
  precio?: string
  updated_at?: string
  created_at?: string
}

interface FilaPost {
  slug: string
  titulo: string
  resumen?: string
  meta_descripcion?: string
  updated_at?: string
  publicado_at?: string
}

async function consultar<T>(tabla: string, select: string): Promise<T[]> {
  const config = useRuntimeConfig()
  const url = config.public.supabaseUrl as string
  const key = config.public.supabaseAnonKey as string
  if (!url || !key) return []
  try {
    return await $fetch<T[]>(`${url}/rest/v1/${tabla}`, {
      query: { select, status: 'eq.published' },
      headers: { apikey: key, Authorization: `Bearer ${key}` }
    })
  } catch (err) {
    console.error(`No se pudo leer ${tabla}:`, err)
    return []
  }
}

export function proyectosPublicados() {
  return consultar<FilaProyecto>('proyectos', 'slug,titulo,descripcion,categoria,ubicacion,precio,updated_at,created_at')
}

export function postsPublicados() {
  return consultar<FilaPost>('blog_posts', 'slug,titulo,resumen,meta_descripcion,updated_at,publicado_at')
}

export function urlSitio() {
  return ((useRuntimeConfig().public.siteUrl as string) || '').replace(/\/$/, '')
}

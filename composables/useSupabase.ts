// composables/useSupabase.ts
// ─────────────────────────────────────────
// Conexión a Supabase + Cloudflare R2 para imágenes.

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Ambiente (habitación/espacio) con su área
export interface Ambiente {
  nombre: string
  area: string // Ej: "22 m²"
}

// Especificaciones técnicas detalladas
export interface EspecificacionesTecnicas {
  superficie_desde?: string
  terraza?: string
  dormitorios?: string
  banos?: string
  altillo?: string
  cocina_tipo?: string
  walk_in_closet?: string
  estructura?: string
  [key: string]: string | undefined // Para campos dinámicos adicionales
}

export interface Proyecto {
  id: string
  slug: string
  titulo: string
  subtitulo?: string
  tipo: 'residencial' | 'comercial' | 'industrial' | 'remodelacion'
  anio: number
  ubicacion: string
  superficie?: string
  duracion?: string
  descripcion: string
  descripcion_completa?: string
  imagen_portada: string
  galeria?: string[]
  destacado: boolean
  cliente?: string
  pisos?: string
  inicio_obra?: string
  entrega?: string
  estructura?: string
  habitaciones?: string
  banos?: string
  area?: string
  estacionamiento?: string
  patio_trasero?: string
  // Plano arquitectónico
  plano_imagen?: string
  plano_pdf?: string
  plano_titulo?: string
  plano_subtitulo?: string
  ambientes?: Ambiente[]
  especificaciones_tecnicas?: EspecificacionesTecnicas
  // 'terminado' = casa ya construida · 'construccion' = render / proyecto para construir
  categoria: 'terminado' | 'construccion'
  status: 'published' | 'draft'
  created_at?: string
}

export interface Servicio {
  id: string
  numero: string
  icono: string
  titulo: string
  descripcion: string
  lista?: string[]
  status: 'published' | 'draft'
}

let supabaseClient: SupabaseClient | null = null

export function useSupabaseClient() {
  const config = useRuntimeConfig()

  if (!supabaseClient) {
    supabaseClient = createClient(
      config.public.supabaseUrl as string,
      config.public.supabaseAnonKey as string
    )
  }

  return supabaseClient
}

export function useProyectos() {
  const supabase = useSupabaseClient()
  const config = useRuntimeConfig()
  const r2Url = config.public.r2PublicUrl as string

  // Helper: construir URL de imagen
  function imgUrl(fileName: string) {
    if (!fileName) return ''
    if (fileName.startsWith('http')) return fileName
    return `${r2Url}/${fileName}`
  }

  // Obtener todos los proyectos publicados
  async function getProyectos(): Promise<Proyecto[]> {
    const { data, error } = await supabase
      .from('proyectos')
      .select('id, slug, titulo, subtitulo, tipo, anio, ubicacion, superficie, descripcion, imagen_portada, destacado, categoria, status')
      .eq('status', 'published')
      .order('anio', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching proyectos:', error)
      return []
    }
    return data ?? []
  }

  // Obtener un proyecto por slug
  async function getProyecto(slug: string): Promise<Proyecto | null> {
    const { data, error } = await supabase
      .from('proyectos')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .limit(1)
      .single()

    if (error) {
      console.error('Error fetching proyecto:', error)
      return null
    }
    return data
  }

  // Obtener proyectos destacados
  async function getProyectosDestacados(limit = 6): Promise<Proyecto[]> {
    const { data, error } = await supabase
      .from('proyectos')
      .select('id, slug, titulo, tipo, anio, ubicacion, superficie, imagen_portada, destacado, categoria')
      .eq('status', 'published')
      .eq('destacado', true)
      .order('anio', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching proyectos destacados:', error)
      return []
    }
    return data ?? []
  }

  // Obtener servicios
  async function getServicios(): Promise<Servicio[]> {
    const { data, error } = await supabase
      .from('servicios')
      .select('*')
      .eq('status', 'published')
      .order('numero', { ascending: true })

    if (error) {
      console.error('Error fetching servicios:', error)
      return []
    }
    return data ?? []
  }

  return { imgUrl, getProyectos, getProyecto, getProyectosDestacados, getServicios }
}

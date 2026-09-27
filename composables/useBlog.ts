// composables/useBlog.ts
// ─────────────────────────────────────────
// Blog y preguntas frecuentes (Supabase) + conversión de Markdown a HTML.

import { marked } from 'marked'
import { slugificar } from './negocio'

export interface FaqItem {
  pregunta: string
  respuesta: string
}

export interface BlogPost {
  id: string
  slug: string
  titulo: string
  meta_titulo?: string
  meta_descripcion?: string
  palabra_clave?: string
  intencion?: 'informativa' | 'comercial' | 'transaccional' | 'navegacional'
  categoria?: string
  resumen?: string          // TL;DR
  puntos_clave?: string[]   // Key takeaways
  contenido: string         // Markdown
  imagen_portada?: string
  imagen_alt?: string
  autor?: string
  faqs?: FaqItem[]
  cta_titulo?: string
  cta_texto?: string
  status: 'published' | 'draft'
  publicado_at?: string
  created_at?: string
  updated_at?: string
}

export interface Faq {
  id: string
  pregunta: string
  respuesta: string
  categoria?: string
  orden: number
  status: 'published' | 'draft'
}

const CAMPOS_LISTA = 'id, slug, titulo, resumen, categoria, imagen_portada, imagen_alt, publicado_at, created_at, contenido'

export function useBlog() {
  const supabase = useSupabaseClient()

  async function getPosts(limite = 50): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(CAMPOS_LISTA)
      .eq('status', 'published')
      .order('publicado_at', { ascending: false, nullsFirst: false })
      .limit(limite)
    if (error) {
      console.error('Error fetching blog_posts:', error)
      return []
    }
    return (data ?? []) as BlogPost[]
  }

  async function getPost(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle()
    if (error) {
      console.error('Error fetching blog_post:', error)
      return null
    }
    return data as BlogPost | null
  }

  async function getFaqs(): Promise<Faq[]> {
    const { data, error } = await supabase
      .from('faqs')
      .select('id, pregunta, respuesta, categoria, orden, status')
      .eq('status', 'published')
      .order('orden', { ascending: true })
    if (error) {
      console.error('Error fetching faqs:', error)
      return []
    }
    return (data ?? []) as Faq[]
  }

  return { getPosts, getPost, getFaqs }
}

// ── Markdown ──

export interface EncabezadoToc {
  id: string
  texto: string
  nivel: 2 | 3
}

const quitarEtiquetas = (html: string) => html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")

// Convierte Markdown a HTML listo para el artículo:
// - ids en h2/h3 (índice de contenidos)
// - imágenes con lazy loading dentro de <figure> con pie de foto
// - tablas envueltas para scroll horizontal en móvil
// - enlaces externos en pestaña nueva
export function markdownAHtml(md: string, imgUrl?: (f: string) => string) {
  let html = marked.parse(md || '', { async: false, gfm: true, breaks: false }) as string
  const toc: EncabezadoToc[] = []
  const usados = new Set<string>()

  html = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_m, nivel, contenido) => {
    const texto = quitarEtiquetas(contenido)
    let id = slugificar(texto) || 'seccion'
    while (usados.has(id)) id += '-2'
    usados.add(id)
    toc.push({ id, texto, nivel: Number(nivel) as 2 | 3 })
    return `<h${nivel} id="${id}">${contenido}</h${nivel}>`
  })

  html = html.replace(/<p>\s*(<img [^>]+>)\s*<\/p>/g, (_m, img: string) => {
    const alt = img.match(/alt="([^"]*)"/)?.[1] || ''
    const titulo = img.match(/title="([^"]*)"/)?.[1] || ''
    const pie = titulo || alt
    return `<figure>${img}${pie ? `<figcaption>${pie}</figcaption>` : ''}</figure>`
  })

  html = html.replace(/<img src="([^"]+)"/g, (_m, src: string) => {
    const url = imgUrl && !/^(https?:)?\/\//.test(src) && !src.startsWith('/') ? imgUrl(src) : src
    return `<img loading="lazy" decoding="async" src="${url}"`
  })

  html = html.replace(/<table>/g, '<div class="tabla-scroll"><table>').replace(/<\/table>/g, '</table></div>')
  html = html.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener"')

  return { html, toc }
}

// Separa el HTML después del primer párrafo (para insertar el CTA)
export function dividirTrasPrimerParrafo(html: string): [string, string] {
  const fin = html.indexOf('</p>')
  if (fin === -1) return [html, '']
  return [html.slice(0, fin + 4), html.slice(fin + 4)]
}

export function tiempoLectura(md: string) {
  const palabras = (md || '').replace(/[#*_>`|\-\[\]()!]/g, ' ').split(/\s+/).filter(Boolean).length
  return { palabras, minutos: Math.max(1, Math.round(palabras / 200)) }
}

export function formatoFecha(fecha?: string) {
  if (!fecha) return ''
  return new Date(fecha).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })
}

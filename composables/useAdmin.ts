// composables/useAdmin.ts
// ─────────────────────────────────────────
// Utilidades compartidas del panel /Brian: sesión, SEO (noindex) y subida de archivos.

export function useAdminSesion(opciones: { alEntrar?: () => void } = {}) {
  const supabase = useSupabaseClient()
  const router = useRouter()

  onMounted(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/Brian')
      return
    }
    opciones.alEntrar?.()
  })

  async function cerrarSesion() {
    await supabase.auth.signOut()
    router.push('/Brian')
  }

  return { cerrarSesion }
}

// Configuración común de las páginas del panel
export function useAdminPagina(titulo: string) {
  useHead({
    title: `${titulo} — Panel R&J`,
    // El panel no usa el preloader del sitio: sin esta clase, <main> queda oculto
    bodyAttrs: { class: 'preloader-done' }
  })
  useSeoMeta({ robots: 'noindex, nofollow' })
}

// Sube un archivo a R2 con un nombre descriptivo (SEO)
export async function subirArchivo(file: File, nombre?: string): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  if (nombre) formData.append('nombre', nombre)
  const res = await $fetch<{ fileName: string }>('/api/upload', { method: 'POST', body: formData })
  return res.fileName
}

export function urlArchivo(fileName: string) {
  if (!fileName) return ''
  if (fileName.startsWith('http')) return fileName
  const r2 = useRuntimeConfig().public.r2PublicUrl as string
  return `${r2}/${fileName}`
}

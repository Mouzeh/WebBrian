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

// Mensaje de error legible a partir de un error de Supabase (incluye el detalle real)
export function mensajeErrorSupabase(error: { message?: string; code?: string; details?: string; hint?: string } | null, tabla: string) {
  if (!error) return ''
  const codigo = error.code || ''
  let causa = ''
  if (codigo === 'PGRST205' || codigo === '42P01' || /does not exist|could not find the table/i.test(error.message || '')) {
    causa = `Supabase no encuentra la tabla "${tabla}". Revisa que la migración se haya ejecutado en el mismo proyecto que usa el sitio y sin errores.`
  } else if (codigo === '42703' || codigo === 'PGRST204' || /column/i.test(error.message || '')) {
    causa = `Falta una columna en "${tabla}" (puede existir una tabla anterior con otra estructura).`
  } else if (codigo === '42501' || /permission|policy/i.test(error.message || '')) {
    causa = `Supabase bloqueó el acceso a "${tabla}" por permisos (RLS).`
  } else if (/fetch|network/i.test(error.message || '')) {
    causa = 'No hay conexión con Supabase.'
  }
  const detalle = [error.message, codigo && `código ${codigo}`].filter(Boolean).join(' · ')
  return `${causa ? `${causa} ` : ''}Detalle: ${detalle}`
}

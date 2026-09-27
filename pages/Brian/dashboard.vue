<template>
  <div class="admin-page">
    <!-- Header -->
    <header class="admin-header">
      <h1>Panel de Administración</h1>
      <button @click="logout" class="btn-logout">Cerrar sesión</button>
    </header>

    <div class="admin-content">
      <!-- Sidebar: Lista de proyectos -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <h2>Proyectos</h2>
          <button @click="nuevoProyecto" class="btn-nuevo">+ Nuevo</button>
        </div>
        <div class="categoria-filtros">
          <button
            v-for="f in filtrosCategoria"
            :key="f.value"
            type="button"
            :class="['filtro-btn', { active: filtroCategoria === f.value }]"
            @click="filtroCategoria = f.value"
          >
            {{ f.label }}
            <span class="filtro-count">{{ contarCategoria(f.value) }}</span>
          </button>
        </div>
        <div class="proyectos-list">
          <div
            v-for="p in proyectosFiltrados"
            :key="p.id"
            :class="['proyecto-item', { active: proyectoActual?.id === p.id }]"
            @click="editarProyecto(p)"
          >
            <div class="p-info">
              <span class="p-titulo">{{ p.titulo }}</span>
              <span :class="['p-categoria', p.categoria]">{{ categoriaLabel(p.categoria) }}</span>
            </div>
            <span :class="['p-status', p.status]">{{ p.status }}</span>
          </div>
          <p v-if="!proyectosFiltrados.length" class="empty">No hay proyectos</p>
        </div>
      </aside>

      <!-- Main: Formulario -->
      <main class="main-form">
        <form @submit.prevent="guardarProyecto" class="form-proyecto">
          <div class="form-header-row">
            <h2>{{ proyectoActual?.id ? 'Editar Proyecto' : 'Nuevo Proyecto' }}</h2>
            <a
              v-if="proyectoActual?.id && form.slug && form.status === 'published'"
              :href="`/proyectos/${form.slug}`"
              target="_blank"
              class="btn-preview"
            >
              👁️ Ver proyecto
            </a>
          </div>

          <!-- Warning si está en borrador -->
          <div v-if="form.status === 'draft'" class="draft-warning">
            ⚠️ Este proyecto está en <strong>Borrador</strong>. No será visible en la web hasta que lo publiques.
          </div>

          <!-- Categoría -->
          <div class="field full">
            <label>Categoría *</label>
            <div class="categoria-selector">
              <label :class="['categoria-opcion', { active: form.categoria === 'terminado' }]">
                <input v-model="form.categoria" type="radio" value="terminado" />
                <strong>Proyecto terminado</strong>
                <small>Casa ya construida y entregada</small>
              </label>
              <label :class="['categoria-opcion', { active: form.categoria === 'construccion' }]">
                <input v-model="form.categoria" type="radio" value="construccion" />
                <strong>Proyecto para construcción</strong>
                <small>Render / diseño de casa por construir</small>
              </label>
            </div>
          </div>

          <!-- Fila 1: Título y Slug -->
          <div class="form-row">
            <div class="field">
              <label>Título *</label>
              <input v-model="form.titulo" type="text" required placeholder="Ej: Torres del Sur" @input="autoGenerateSlug" />
            </div>
            <div class="field">
              <label>Slug (URL) *</label>
              <div class="slug-field">
                <input v-model="form.slug" type="text" required placeholder="torres-del-sur" @input="slugManuallyEdited = true" />
                <button type="button" class="btn-regenerate" @click="regenerateSlug" title="Regenerar desde título">
                  ↻
                </button>
              </div>
              <small class="slug-preview">/proyectos/{{ form.slug || 'mi-proyecto' }}</small>
            </div>
          </div>

          <!-- Fila 2: Tipo y Año -->
          <div class="form-row">
            <div class="field">
              <label>Tipo *</label>
              <select v-model="form.tipo" required>
                <option value="residencial">Residencial</option>
                <option value="comercial">Comercial</option>
                <option value="industrial">Industrial</option>
                <option value="remodelacion">Remodelación</option>
              </select>
            </div>
            <div class="field">
              <label>Año *</label>
              <input v-model.number="form.anio" type="number" required placeholder="2024" />
            </div>
          </div>

          <!-- Fila 3: Ubicación y Superficie -->
          <div class="form-row">
            <div class="field">
              <label>Ubicación *</label>
              <input v-model="form.ubicacion" type="text" required placeholder="Santiago, Chile" />
            </div>
            <div class="field">
              <label>Superficie</label>
              <input v-model="form.superficie" type="text" placeholder="1,200 m²" />
            </div>
          </div>

          <!-- Descripción corta -->
          <div class="field full">
            <label>Descripción corta *</label>
            <textarea v-model="form.descripcion" rows="2" required placeholder="Breve descripción del proyecto..."></textarea>
          </div>

          <!-- Descripción completa -->
          <div class="field full">
            <label>Descripción completa</label>
            <textarea v-model="form.descripcion_completa" rows="5" placeholder="Descripción detallada (opcional)..."></textarea>
          </div>

          <!-- Imagen de portada -->
          <div class="field full">
            <label>Imagen de portada *</label>
            <div class="upload-area" @click="$refs.filePortada.click()">
              <input ref="filePortada" type="file" accept="image/*" hidden @change="subirPortada" />
              <div v-if="form.imagen_portada" class="preview">
                <img :src="getImageUrl(form.imagen_portada)" alt="Portada" />
                <span class="file-name">{{ form.imagen_portada }}</span>
              </div>
              <div v-else class="upload-placeholder">
                <span>Click para subir imagen</span>
              </div>
              <div v-if="uploadingPortada" class="uploading">Subiendo...</div>
            </div>
          </div>

          <!-- Galería -->
          <div class="field full">
            <label>Galería de imágenes</label>
            <div class="galeria-upload">
              <div
                v-for="(img, i) in form.galeria"
                :key="i"
                class="galeria-item"
              >
                <img :src="getImageUrl(img)" alt="Galería" />
                <button type="button" class="remove-img" @click="quitarGaleria(i)">×</button>
              </div>
              <div class="add-galeria" @click="$refs.fileGaleria.click()">
                <input ref="fileGaleria" type="file" accept="image/*" multiple hidden @change="subirGaleria" />
                <span>+</span>
              </div>
            </div>
            <div v-if="uploadingGaleria" class="uploading-text">Subiendo imágenes...</div>
          </div>

          <!-- ══════════════════════════════════════════════════════
               SECCIÓN: PLANO ARQUITECTÓNICO
               ══════════════════════════════════════════════════════ -->
          <div class="section-divider">
            <span>Plano Arquitectónico</span>
          </div>

          <!-- Título y subtítulo del plano -->
          <div class="form-row">
            <div class="field">
              <label>Título del plano</label>
              <input v-model="form.plano_titulo" type="text" placeholder="Ej: El plano que define el hogar" />
            </div>
            <div class="field">
              <label>Subtítulo</label>
              <input v-model="form.plano_subtitulo" type="text" placeholder="Ej: DISTRIBUCIÓN" />
            </div>
          </div>

          <!-- Imagen del plano -->
          <div class="field full">
            <label>Imagen del plano</label>
            <div class="upload-area" @click="$refs.filePlano.click()">
              <input ref="filePlano" type="file" accept="image/*" hidden @change="subirPlano" />
              <div v-if="form.plano_imagen" class="preview">
                <img :src="getImageUrl(form.plano_imagen)" alt="Plano" />
                <span class="file-name">{{ form.plano_imagen }}</span>
                <button type="button" class="btn-remove-inline" @click.stop="form.plano_imagen = ''">×</button>
              </div>
              <div v-else class="upload-placeholder">
                <span>Click para subir imagen del plano</span>
              </div>
              <div v-if="uploadingPlano" class="uploading">Subiendo...</div>
            </div>
          </div>

          <!-- PDF del plano -->
          <div class="field full">
            <label>PDF del plano (para descargar)</label>
            <div class="upload-area pdf-upload" @click="$refs.filePlanoPdf.click()">
              <input ref="filePlanoPdf" type="file" accept=".pdf" hidden @change="subirPlanoPdf" />
              <div v-if="form.plano_pdf" class="preview">
                <div class="pdf-icon">📄</div>
                <span class="file-name">{{ form.plano_pdf }}</span>
                <button type="button" class="btn-remove-inline" @click.stop="form.plano_pdf = ''">×</button>
              </div>
              <div v-else class="upload-placeholder">
                <span>Click para subir PDF del plano</span>
              </div>
              <div v-if="uploadingPlanoPdf" class="uploading">Subiendo...</div>
            </div>
          </div>

          <!-- Ambientes -->
          <div class="field full">
            <label>Ambientes (distribución)</label>
            <div class="ambientes-list">
              <div v-for="(amb, i) in form.ambientes" :key="i" class="ambiente-item">
                <input
                  v-model="amb.nombre"
                  type="text"
                  placeholder="Nombre (Ej: Dorm. Principal)"
                  class="amb-nombre"
                />
                <input
                  v-model="amb.area"
                  type="text"
                  placeholder="Área (Ej: 22 m²)"
                  class="amb-area"
                />
                <button type="button" class="btn-remove-amb" @click="quitarAmbiente(i)">×</button>
              </div>
              <button type="button" class="btn-add-amb" @click="agregarAmbiente">
                + Agregar ambiente
              </button>
            </div>
          </div>

          <!-- Especificaciones técnicas -->
          <div class="field full">
            <label>Especificaciones Técnicas</label>
            <div class="specs-grid">
              <div class="spec-field">
                <label>Superficie desde</label>
                <input v-model="form.especificaciones_tecnicas.superficie_desde" type="text" placeholder="160 m²" />
              </div>
              <div class="spec-field">
                <label>Terraza</label>
                <input v-model="form.especificaciones_tecnicas.terraza" type="text" placeholder="35 m²" />
              </div>
              <div class="spec-field">
                <label>Dormitorios</label>
                <input v-model="form.especificaciones_tecnicas.dormitorios" type="text" placeholder="3" />
              </div>
              <div class="spec-field">
                <label>Baños</label>
                <input v-model="form.especificaciones_tecnicas.banos" type="text" placeholder="2" />
              </div>
              <div class="spec-field">
                <label>Altillo</label>
                <select v-model="form.especificaciones_tecnicas.altillo">
                  <option value="">--</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                  <option value="Opcional">Opcional</option>
                </select>
              </div>
              <div class="spec-field">
                <label>Tipo de cocina</label>
                <select v-model="form.especificaciones_tecnicas.cocina_tipo">
                  <option value="">--</option>
                  <option value="Independiente">Independiente</option>
                  <option value="Americana">Americana</option>
                  <option value="Integrada">Integrada</option>
                </select>
              </div>
              <div class="spec-field">
                <label>Walk-in Closet</label>
                <select v-model="form.especificaciones_tecnicas.walk_in_closet">
                  <option value="">--</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                  <option value="Opcional">Opcional</option>
                </select>
              </div>
              <div class="spec-field">
                <label>Estructura</label>
                <input v-model="form.especificaciones_tecnicas.estructura" type="text" placeholder="Madera / Panel SIP" />
              </div>
            </div>
          </div>

          <!-- ══════════════════════════════════════════════════════
               SECCIÓN: INFORMACIÓN ADICIONAL
               ══════════════════════════════════════════════════════ -->
          <div class="section-divider">
            <span>Información Adicional</span>
          </div>

          <!-- Opciones adicionales -->
          <div class="form-row">
            <div class="field">
              <label>Cliente</label>
              <input v-model="form.cliente" type="text" placeholder="Nombre del cliente" />
            </div>
            <div class="field">
              <label>Pisos</label>
              <input v-model="form.pisos" type="text" placeholder="12 pisos" />
            </div>
          </div>

          <!-- Estado y Destacado -->
          <div class="form-row options">
            <label class="checkbox-field">
              <input v-model="form.destacado" type="checkbox" />
              <span>Proyecto destacado (aparece en inicio)</span>
            </label>
            <div class="field">
              <label>Estado</label>
              <select v-model="form.status">
                <option value="draft">Borrador</option>
                <option value="published">Publicado</option>
              </select>
            </div>
          </div>

          <!-- Botones -->
          <div class="form-actions">
            <button v-if="proyectoActual?.id" type="button" class="btn-delete" @click="eliminarProyecto">
              Eliminar
            </button>
            <button type="submit" :disabled="guardando" class="btn-save">
              {{ guardando ? 'Guardando...' : 'Guardar proyecto' }}
            </button>
          </div>

          <p v-if="mensaje" :class="['mensaje', mensaje.tipo]" v-html="mensaje.texto"></p>
        </form>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const config = useRuntimeConfig()
const router = useRouter()
const supabase = useSupabaseClient()

const r2Url = config.public.r2PublicUrl as string

// Estado
const proyectos = ref<any[]>([])
const proyectoActual = ref<any>(null)
const guardando = ref(false)
const uploadingPortada = ref(false)
const uploadingGaleria = ref(false)
const uploadingPlano = ref(false)
const uploadingPlanoPdf = ref(false)
const mensaje = ref<{ tipo: string; texto: string } | null>(null)

interface Ambiente {
  nombre: string
  area: string
}

interface EspecificacionesTecnicas {
  superficie_desde: string
  terraza: string
  dormitorios: string
  banos: string
  altillo: string
  cocina_tipo: string
  walk_in_closet: string
  estructura: string
}

const especificacionesIniciales: EspecificacionesTecnicas = {
  superficie_desde: '',
  terraza: '',
  dormitorios: '',
  banos: '',
  altillo: '',
  cocina_tipo: '',
  walk_in_closet: '',
  estructura: ''
}

const formInicial = {
  titulo: '',
  slug: '',
  tipo: 'residencial',
  anio: new Date().getFullYear(),
  ubicacion: '',
  superficie: '',
  descripcion: '',
  descripcion_completa: '',
  imagen_portada: '',
  galeria: [] as string[],
  destacado: false,
  cliente: '',
  pisos: '',
  categoria: 'terminado' as 'terminado' | 'construccion',
  status: 'draft',
  // Plano arquitectónico
  plano_imagen: '',
  plano_pdf: '',
  plano_titulo: '',
  plano_subtitulo: '',
  ambientes: [] as Ambiente[],
  especificaciones_tecnicas: { ...especificacionesIniciales }
}

const form = ref({ ...formInicial })

// Verificar autenticación
onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    router.push('/Brian')
    return
  }
  cargarProyectos()
})

function getImageUrl(fileName: string) {
  if (!fileName) return ''
  if (fileName.startsWith('http')) return fileName
  return `${r2Url}/${fileName}`
}

// Generar slug desde texto
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Quitar acentos
    .replace(/[^a-z0-9\s-]/g, '') // Solo letras, números, espacios y guiones
    .trim()
    .replace(/\s+/g, '-') // Espacios a guiones
    .replace(/-+/g, '-') // Múltiples guiones a uno
}

// Auto-generar slug cuando se escribe el título (solo si no hay slug previo)
const slugManuallyEdited = ref(false)

function autoGenerateSlug() {
  // Solo auto-generar si es un proyecto nuevo o no se ha editado manualmente el slug
  if (!proyectoActual.value?.id && !slugManuallyEdited.value) {
    form.value.slug = slugify(form.value.titulo)
  }
}

function regenerateSlug() {
  form.value.slug = slugify(form.value.titulo)
  slugManuallyEdited.value = false
}

// Filtro por categoría en la barra lateral
type FiltroCategoria = 'todos' | 'terminado' | 'construccion'
const filtroCategoria = ref<FiltroCategoria>('todos')
const filtrosCategoria: { value: FiltroCategoria; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'terminado', label: 'Terminados' },
  { value: 'construccion', label: 'Para construir' }
]

const proyectosFiltrados = computed(() =>
  filtroCategoria.value === 'todos'
    ? proyectos.value
    : proyectos.value.filter(p => (p.categoria || 'terminado') === filtroCategoria.value)
)

function contarCategoria(cat: FiltroCategoria) {
  if (cat === 'todos') return proyectos.value.length
  return proyectos.value.filter(p => (p.categoria || 'terminado') === cat).length
}

function categoriaLabel(cat?: string) {
  return cat === 'construccion' ? 'Para construir' : 'Terminado'
}

async function cargarProyectos() {
  const { data } = await supabase
    .from('proyectos')
    .select('*')
    .order('created_at', { ascending: false })

  proyectos.value = data ?? []
}

function nuevoProyecto() {
  proyectoActual.value = null
  form.value = {
    ...formInicial,
    categoria: filtroCategoria.value === 'construccion' ? 'construccion' : 'terminado',
    galeria: [],
    ambientes: [],
    especificaciones_tecnicas: { ...especificacionesIniciales }
  }
  mensaje.value = null
  slugManuallyEdited.value = false
}

function editarProyecto(p: any) {
  proyectoActual.value = p
  form.value = {
    titulo: p.titulo || '',
    slug: p.slug || '',
    tipo: p.tipo || 'residencial',
    anio: p.anio || new Date().getFullYear(),
    ubicacion: p.ubicacion || '',
    superficie: p.superficie || '',
    descripcion: p.descripcion || '',
    descripcion_completa: p.descripcion_completa || '',
    imagen_portada: p.imagen_portada || '',
    galeria: p.galeria || [],
    destacado: p.destacado || false,
    cliente: p.cliente || '',
    pisos: p.pisos || '',
    categoria: p.categoria || 'terminado',
    status: p.status || 'draft',
    // Plano arquitectónico
    plano_imagen: p.plano_imagen || '',
    plano_pdf: p.plano_pdf || '',
    plano_titulo: p.plano_titulo || '',
    plano_subtitulo: p.plano_subtitulo || '',
    ambientes: p.ambientes || [],
    especificaciones_tecnicas: {
      superficie_desde: p.especificaciones_tecnicas?.superficie_desde || '',
      terraza: p.especificaciones_tecnicas?.terraza || '',
      dormitorios: p.especificaciones_tecnicas?.dormitorios || '',
      banos: p.especificaciones_tecnicas?.banos || '',
      altillo: p.especificaciones_tecnicas?.altillo || '',
      cocina_tipo: p.especificaciones_tecnicas?.cocina_tipo || '',
      walk_in_closet: p.especificaciones_tecnicas?.walk_in_closet || '',
      estructura: p.especificaciones_tecnicas?.estructura || ''
    }
  }
  mensaje.value = null
}

async function subirPortada(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  uploadingPortada.value = true
  const fileName = await subirImagen(file)
  if (fileName) {
    form.value.imagen_portada = fileName
  }
  uploadingPortada.value = false
}

async function subirGaleria(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files?.length) return

  uploadingGaleria.value = true
  for (const file of Array.from(files)) {
    const fileName = await subirImagen(file)
    if (fileName) {
      form.value.galeria.push(fileName)
    }
  }
  uploadingGaleria.value = false
}

async function subirImagen(file: File): Promise<string | null> {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const res = await $fetch<{ fileName: string }>('/api/upload', {
      method: 'POST',
      body: formData
    })
    return res.fileName
  } catch (err) {
    console.error('Error subiendo imagen:', err)
    mensaje.value = { tipo: 'error', texto: 'Error al subir imagen' }
    return null
  }
}

function quitarGaleria(index: number) {
  form.value.galeria.splice(index, 1)
}

// Subir imagen del plano
async function subirPlano(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  uploadingPlano.value = true
  const fileName = await subirImagen(file)
  if (fileName) {
    form.value.plano_imagen = fileName
  }
  uploadingPlano.value = false
}

// Subir PDF del plano
async function subirPlanoPdf(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  uploadingPlanoPdf.value = true
  const formData = new FormData()
  formData.append('file', file)

  try {
    const res = await $fetch<{ fileName: string }>('/api/upload', {
      method: 'POST',
      body: formData
    })
    form.value.plano_pdf = res.fileName
  } catch (err) {
    console.error('Error subiendo PDF:', err)
    mensaje.value = { tipo: 'error', texto: 'Error al subir PDF' }
  }
  uploadingPlanoPdf.value = false
}

// Gestión de ambientes
function agregarAmbiente() {
  form.value.ambientes.push({ nombre: '', area: '' })
}

function quitarAmbiente(index: number) {
  form.value.ambientes.splice(index, 1)
}

async function guardarProyecto() {
  if (!form.value.imagen_portada) {
    mensaje.value = { tipo: 'error', texto: 'Debes subir una imagen de portada' }
    return
  }

  guardando.value = true
  mensaje.value = null

  // Filtrar ambientes vacíos
  const ambientesFiltrados = form.value.ambientes.filter(
    (a: Ambiente) => a.nombre.trim() && a.area.trim()
  )

  // Filtrar especificaciones vacías
  const specs = form.value.especificaciones_tecnicas
  const especificacionesFiltradas = Object.fromEntries(
    Object.entries(specs).filter(([_, v]) => v && v.trim())
  )

  const datos = {
    titulo: form.value.titulo,
    slug: form.value.slug.toLowerCase().replace(/\s+/g, '-'),
    tipo: form.value.tipo,
    anio: form.value.anio,
    ubicacion: form.value.ubicacion,
    superficie: form.value.superficie || null,
    descripcion: form.value.descripcion,
    descripcion_completa: form.value.descripcion_completa || null,
    imagen_portada: form.value.imagen_portada,
    galeria: form.value.galeria,
    destacado: form.value.destacado,
    cliente: form.value.cliente || null,
    pisos: form.value.pisos || null,
    categoria: form.value.categoria,
    status: form.value.status,
    // Plano arquitectónico
    plano_imagen: form.value.plano_imagen || null,
    plano_pdf: form.value.plano_pdf || null,
    plano_titulo: form.value.plano_titulo || null,
    plano_subtitulo: form.value.plano_subtitulo || null,
    ambientes: ambientesFiltrados.length > 0 ? ambientesFiltrados : null,
    especificaciones_tecnicas: Object.keys(especificacionesFiltradas).length > 0 ? especificacionesFiltradas : null
  }

  try {
    if (proyectoActual.value?.id) {
      // Actualizar
      const { error } = await supabase
        .from('proyectos')
        .update(datos)
        .eq('id', proyectoActual.value.id)

      if (error) throw error
      mensaje.value = {
        tipo: 'success',
        texto: datos.status === 'published'
          ? `Proyecto actualizado. <a href="/proyectos/${datos.slug}" target="_blank">Ver proyecto →</a>`
          : 'Proyecto actualizado (en borrador)'
      }
    } else {
      // Crear
      const { error } = await supabase
        .from('proyectos')
        .insert(datos)

      if (error) throw error
      mensaje.value = {
        tipo: 'success',
        texto: datos.status === 'published'
          ? `Proyecto creado. <a href="/proyectos/${datos.slug}" target="_blank">Ver proyecto →</a>`
          : 'Proyecto creado (en borrador - no visible en la web)'
      }
    }

    await cargarProyectos()
  } catch (err: any) {
    mensaje.value = { tipo: 'error', texto: err.message || 'Error al guardar' }
  }

  guardando.value = false
}

async function eliminarProyecto() {
  if (!proyectoActual.value?.id) return
  if (!confirm('¿Seguro que quieres eliminar este proyecto?')) return

  const { error } = await supabase
    .from('proyectos')
    .delete()
    .eq('id', proyectoActual.value.id)

  if (error) {
    mensaje.value = { tipo: 'error', texto: 'Error al eliminar' }
    return
  }

  nuevoProyecto()
  await cargarProyectos()
}

async function logout() {
  await supabase.auth.signOut()
  router.push('/Brian')
}
</script>

<style scoped>
* { box-sizing: border-box; }

.admin-page {
  min-height: 100vh;
  background: #f5f5f5;
  font-family: 'DM Sans', sans-serif;
}

.admin-header {
  background: #1C1A17;
  color: white;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-header h1 {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.btn-logout {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.3);
  color: white;
  padding: 8px 16px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-logout:hover {
  background: rgba(255,255,255,0.1);
}

.admin-content {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: calc(100vh - 56px);
}

/* Sidebar */
.sidebar {
  background: white;
  border-right: 1px solid #e5e5e5;
  overflow-y: auto;
}

.sidebar-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
}

.sidebar-header h2 {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.btn-nuevo {
  background: #2b5f00;
  color: white;
  border: none;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.proyectos-list {
  padding: 10px;
}

.proyecto-item {
  padding: 12px 14px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.15s;
}

.proyecto-item:hover {
  background: #f0f0f0;
}

.proyecto-item.active {
  background: #2b5f00;
  color: white;
}

.proyecto-item.active .p-status {
  color: rgba(255,255,255,0.7);
}

.p-titulo {
  font-size: 13px;
  font-weight: 500;
}

.p-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.p-categoria {
  font-size: 10px;
  color: #888;
}

.p-categoria.construccion {
  color: #b86b00;
}

.proyecto-item.active .p-categoria {
  color: rgba(255,255,255,0.7);
}

.categoria-filtros {
  display: flex;
  gap: 4px;
  padding: 10px 10px 0;
}

.filtro-btn {
  flex: 1;
  background: #f5f5f5;
  border: 1px solid #e5e5e5;
  padding: 6px 4px;
  font-size: 11px;
  font-weight: 600;
  color: #555;
  cursor: pointer;
  border-radius: 4px;
}

.filtro-btn.active {
  background: #2b5f00;
  border-color: #2b5f00;
  color: white;
}

.filtro-count {
  opacity: 0.7;
  margin-left: 2px;
}

.categoria-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.field .categoria-opcion {
  text-transform: none;
  letter-spacing: normal;
  font-weight: 400;
}

.categoria-opcion {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  border: 2px solid #e5e5e5;
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}

.categoria-opcion input {
  display: none;
}

.categoria-opcion strong {
  font-size: 14px;
  color: #333;
}

.categoria-opcion small {
  font-size: 12px;
  color: #888;
}

.categoria-opcion.active {
  border-color: #2b5f00;
  background: #f3f8ee;
}

.p-status {
  font-size: 10px;
  text-transform: uppercase;
  color: #999;
}

.p-status.published {
  color: #2b5f00;
}

.proyecto-item.active .p-status.published {
  color: #90EE90;
}

.empty {
  text-align: center;
  color: #999;
  font-size: 13px;
  padding: 20px;
}

/* Main Form */
.main-form {
  padding: 30px 40px;
  overflow-y: auto;
}

.form-proyecto {
  background: white;
  padding: 30px;
  max-width: 900px;
}

.form-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.form-proyecto h2 {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 0;
  color: #1C1A17;
}

.btn-preview {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #2b5f00;
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  transition: background 0.2s;
}

.btn-preview:hover {
  background: #1e4400;
}

.draft-warning {
  background: #fff3cd;
  border: 1px solid #ffc107;
  color: #856404;
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 13px;
  margin-bottom: 20px;
}

.draft-warning strong {
  color: #664d03;
}

.slug-field {
  display: flex;
  gap: 8px;
}

.slug-field input {
  flex: 1;
}

.btn-regenerate {
  background: #e9ecef;
  border: 1px solid #ddd;
  padding: 0 12px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
  border-radius: 4px;
}

.btn-regenerate:hover {
  background: #dee2e6;
}

.slug-preview {
  display: block;
  margin-top: 4px;
  font-size: 11px;
  color: #666;
  font-family: monospace;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-row.options {
  align-items: center;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field.full {
  grid-column: span 2;
  margin-bottom: 20px;
}

.field label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #666;
}

.field input,
.field select,
.field textarea {
  padding: 12px 14px;
  border: 1px solid #ddd;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.2s;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: #2b5f00;
}

.field textarea {
  resize: vertical;
}

/* Upload */
.upload-area {
  border: 2px dashed #ddd;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s;
  position: relative;
}

.upload-area:hover {
  border-color: #2b5f00;
}

.upload-placeholder {
  color: #999;
  font-size: 14px;
}

.preview {
  display: flex;
  align-items: center;
  gap: 16px;
}

.preview img {
  width: 120px;
  height: 80px;
  object-fit: cover;
}

.file-name {
  font-size: 13px;
  color: #666;
}

.uploading {
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #2b5f00;
}

.uploading-text {
  font-size: 12px;
  color: #2b5f00;
  margin-top: 8px;
}

/* Galería */
.galeria-upload {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.galeria-item {
  position: relative;
  width: 100px;
  height: 75px;
}

.galeria-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-img {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 22px;
  height: 22px;
  background: #c53030;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
}

.add-galeria {
  width: 100px;
  height: 75px;
  border: 2px dashed #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 28px;
  color: #999;
  transition: border-color 0.2s, color 0.2s;
}

.add-galeria:hover {
  border-color: #2b5f00;
  color: #2b5f00;
}

/* Checkbox */
.checkbox-field {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}

.checkbox-field input {
  width: 18px;
  height: 18px;
  accent-color: #2b5f00;
}

/* Actions */
.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.btn-save {
  background: #2b5f00;
  color: white;
  border: none;
  padding: 14px 28px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-save:hover:not(:disabled) {
  opacity: 0.9;
}

.btn-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-delete {
  background: transparent;
  color: #c53030;
  border: 1px solid #c53030;
  padding: 14px 20px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-delete:hover {
  background: #c53030;
  color: white;
}

/* Mensaje */
.mensaje {
  margin-top: 16px;
  padding: 12px;
  font-size: 13px;
  text-align: center;
}

.mensaje.success {
  background: #d4edda;
  color: #155724;
}

.mensaje.error {
  background: #f8d7da;
  color: #721c24;
}

.mensaje a {
  color: inherit;
  font-weight: 700;
  text-decoration: underline;
}

.mensaje a:hover {
  text-decoration: none;
}

/* Section Divider */
.section-divider {
  margin: 30px 0 20px;
  padding: 12px 0;
  border-top: 2px solid #2b5f00;
  border-bottom: 1px solid #eee;
}

.section-divider span {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #2b5f00;
}

/* Remove inline button */
.btn-remove-inline {
  background: #c53030;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
}

.btn-remove-inline:hover {
  background: #9b2c2c;
}

/* PDF Upload */
.pdf-upload .preview {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pdf-icon {
  font-size: 32px;
}

/* Ambientes List */
.ambientes-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ambiente-item {
  display: grid;
  grid-template-columns: 1fr 120px 32px;
  gap: 10px;
  align-items: center;
}

.ambiente-item input {
  padding: 10px 12px;
  border: 1px solid #ddd;
  font-size: 14px;
  font-family: inherit;
}

.ambiente-item input:focus {
  outline: none;
  border-color: #2b5f00;
}

.amb-nombre {
  flex: 1;
}

.amb-area {
  width: 120px;
}

.btn-remove-amb {
  background: #c53030;
  color: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-remove-amb:hover {
  background: #9b2c2c;
}

.btn-add-amb {
  background: transparent;
  border: 2px dashed #2b5f00;
  color: #2b5f00;
  padding: 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-add-amb:hover {
  background: rgba(43, 95, 0, 0.05);
}

/* Specs Grid */
.specs-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.spec-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.spec-field label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #888;
}

.spec-field input,
.spec-field select {
  padding: 10px 12px;
  border: 1px solid #ddd;
  font-size: 14px;
  font-family: inherit;
}

.spec-field input:focus,
.spec-field select:focus {
  outline: none;
  border-color: #2b5f00;
}

@media (max-width: 900px) {
  .admin-content {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: none;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .field.full {
    grid-column: span 1;
  }

  .specs-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .ambiente-item {
    grid-template-columns: 1fr 100px 32px;
  }
}

@media (max-width: 500px) {
  .specs-grid {
    grid-template-columns: 1fr;
  }

  .ambiente-item {
    grid-template-columns: 1fr 32px;
  }

  .amb-area {
    width: 100%;
    grid-column: 1;
    grid-row: 2;
  }

  .btn-remove-amb {
    grid-row: 1 / 3;
  }
}
</style>

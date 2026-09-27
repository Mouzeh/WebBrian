<template>
  <div class="admin">
    <AdminTopbar subtitulo="Preguntas frecuentes del sitio" />

    <div class="layout">
      <aside class="sidebar">
        <div class="faq-resumen">
          <div class="faq-resumen-dato">
            <strong>{{ publicadas }}</strong>
            <span>Publicadas</span>
          </div>
          <div class="faq-resumen-dato">
            <strong>{{ faqs.length - publicadas }}</strong>
            <span>Borradores</span>
          </div>
        </div>

        <div class="faq-consejos">
          <span class="config-titulo">Dónde aparecen</span>
          <p>Las preguntas publicadas se muestran en la página de inicio, en la sección "Preguntas frecuentes", y generan el schema <strong>FAQPage</strong> para Google.</p>
          <span class="config-titulo">Consejos</span>
          <ul>
            <li>Escribe la pregunta como la haría un cliente.</li>
            <li>Responde en la primera frase, luego agrega detalle.</li>
            <li>Entre 40 y 300 caracteres por respuesta.</li>
            <li>Ordena las más importantes arriba.</li>
          </ul>
        </div>
      </aside>

      <main class="main">
        <div class="form">
          <div class="form-head">
            <div>
              <span class="form-kicker">Contenido del sitio</span>
              <h1 class="form-title">Preguntas frecuentes</h1>
              <span class="form-sub">
                <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.pregunta" />
                {{ faqs.length }} preguntas · {{ publicadas }} visibles en la web
              </span>
            </div>
            <a href="/#preguntas-frecuentes" target="_blank" class="btn-ghost">
              <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.ojo" />
              Ver en la web
            </a>
          </div>

          <section class="card">
            <header class="card-head">
              <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.pregunta" />
              <div>
                <h2>Listado</h2>
                <p>Edita, ordena y publica. Los cambios se aplican al presionar "Guardar cambios".</p>
              </div>
            </header>

            <div class="faq-editor">
              <div v-for="(f, i) in faqs" :key="f.clave" :class="['faq-editor-item', 'faq-admin-item', { borrador: f.status === 'draft' }]">
                <div class="faq-orden">
                  <button type="button" class="btn-icono" title="Subir" :disabled="i === 0" @click="mover(i, -1)">
                    <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.arriba" />
                  </button>
                  <span class="ambiente-num">{{ String(i + 1).padStart(2, '0') }}</span>
                  <button type="button" class="btn-icono" title="Bajar" :disabled="i === faqs.length - 1" @click="mover(i, 1)">
                    <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.abajo" />
                  </button>
                </div>

                <div class="faq-editor-campos">
                  <input v-model="f.pregunta" type="text" placeholder="Pregunta" />
                  <textarea v-model="f.respuesta" rows="3" placeholder="Respuesta"></textarea>
                  <div class="faq-admin-pie">
                    <input v-model="f.categoria" type="text" list="faq-categorias" class="faq-categoria" placeholder="Categoría (opcional)" />
                    <span :class="['contador', rango(f.respuesta.length)]">{{ f.respuesta.length }} caracteres</span>
                  </div>
                </div>

                <div class="faq-acciones">
                  <div class="segmentos compacto vertical">
                    <button type="button" :class="{ active: f.status === 'published' }" @click="f.status = 'published'">Publicada</button>
                    <button type="button" :class="{ active: f.status === 'draft' }" @click="f.status = 'draft'">Borrador</button>
                  </div>
                  <button type="button" class="btn-icono" title="Eliminar" @click="quitar(i)">
                    <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.basura" />
                  </button>
                </div>
              </div>

              <datalist id="faq-categorias">
                <option v-for="c in categorias" :key="c" :value="c" />
              </datalist>

              <p v-if="!faqs.length && cargado" class="lista-vacia">Aún no hay preguntas. Agrega la primera.</p>

              <button type="button" class="btn-agregar" @click="agregar">
                <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.mas" />
                Agregar pregunta
              </button>
            </div>
          </section>

          <div class="espaciador"></div>
        </div>

        <div class="savebar">
          <div class="savebar-opciones">
            <span class="ayuda">{{ hayCambios ? 'Tienes cambios sin guardar' : 'Todo guardado' }}</span>
          </div>
          <div class="savebar-acciones">
            <button type="button" :disabled="guardando || !hayCambios" class="btn-guardar" @click="guardar">
              <span v-if="guardando" class="spinner"></span>
              <svg v-else class="ic" viewBox="0 0 24 24" v-html="ICONOS.guardar" />
              {{ guardando ? 'Guardando...' : 'Guardar cambios' }}
            </button>
          </div>
        </div>

        <Transition name="toast">
          <div v-if="mensaje" :class="['toast', mensaje.tipo]">
            <svg class="ic" viewBox="0 0 24 24" v-html="mensaje.tipo === 'error' ? ICONOS.alerta : ICONOS.check" />
            <span>{{ mensaje.texto }}</span>
            <button type="button" class="toast-cerrar" @click="mensaje = null">
              <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.cerrar" />
            </button>
          </div>
        </Transition>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import '~/assets/css/admin.css'
import type { Faq } from '~/composables/useBlog'

definePageMeta({ layout: false })
useAdminPagina('Preguntas frecuentes')

const supabase = useSupabaseClient()
useAdminSesion({ alEntrar: () => cargar() })

const ICONOS: Record<string, string> = {
  mas: '<path d="M12 5v14M5 12h14"/>',
  pregunta: '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 015.8 1c0 2-3 3-3 3M12 17h.01"/>',
  ojo: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  arriba: '<path d="M18 15l-6-6-6 6"/>',
  abajo: '<path d="M6 9l6 6 6-6"/>',
  basura: '<path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>',
  guardar: '<path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  alerta: '<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><path d="M12 9v4M12 17h.01"/>',
  cerrar: '<path d="M18 6L6 18M6 6l12 12"/>'
}

interface FaqEditable {
  clave: string          // clave local estable para v-for
  id?: string
  pregunta: string
  respuesta: string
  categoria: string
  status: 'published' | 'draft'
}

const faqs = ref<FaqEditable[]>([])
const original = ref('')
const eliminadas = ref<string[]>([])
const cargado = ref(false)
const guardando = ref(false)
const mensaje = ref<{ tipo: string; texto: string } | null>(null)

let contador = 0
const nuevaClave = () => `n${++contador}`

async function cargar() {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('orden', { ascending: true })
  if (error) {
    console.error('Error cargando faqs:', error)
    mensaje.value = { tipo: 'error', texto: `No se pudieron cargar los datos. ${mensajeErrorSupabase(error, 'faqs')}` }
    return
  }
  faqs.value = ((data ?? []) as Faq[]).map(f => ({
    clave: f.id,
    id: f.id,
    pregunta: f.pregunta,
    respuesta: f.respuesta,
    categoria: f.categoria || '',
    status: f.status
  }))
  eliminadas.value = []
  original.value = JSON.stringify(faqs.value)
  cargado.value = true
}

const hayCambios = computed(() => eliminadas.value.length > 0 || JSON.stringify(faqs.value) !== original.value)
const publicadas = computed(() => faqs.value.filter(f => f.status === 'published').length)
const categorias = computed(() => [...new Set(['General', 'Modelos', 'Permisos', 'Cotización', 'Construcción', ...faqs.value.map(f => f.categoria).filter(Boolean)])])

function rango(n: number) {
  if (!n) return ''
  return n >= 40 && n <= 300 ? 'bien' : n > 300 ? 'medio' : 'mal'
}

function agregar() {
  faqs.value.push({ clave: nuevaClave(), pregunta: '', respuesta: '', categoria: '', status: 'published' })
  nextTick(() => {
    const inputs = document.querySelectorAll<HTMLInputElement>('.faq-admin-item .faq-editor-campos > input')
    inputs[inputs.length - 1]?.focus()
  })
}

function quitar(i: number) {
  const f = faqs.value[i]
  if ((f.pregunta || f.respuesta) && !confirm('¿Eliminar esta pregunta?')) return
  if (f.id) eliminadas.value.push(f.id)
  faqs.value.splice(i, 1)
}

function mover(i: number, dir: -1 | 1) {
  const j = i + dir
  if (j < 0 || j >= faqs.value.length) return
  const lista = [...faqs.value]
  ;[lista[i], lista[j]] = [lista[j], lista[i]]
  faqs.value = lista
}

async function guardar() {
  const incompletas = faqs.value.filter(f => !f.pregunta.trim() || !f.respuesta.trim())
  if (incompletas.length) {
    mensaje.value = { tipo: 'error', texto: 'Completa la pregunta y la respuesta de todas las filas (o elimina las vacías).' }
    return
  }

  guardando.value = true
  mensaje.value = null
  try {
    if (eliminadas.value.length) {
      const { error } = await supabase.from('faqs').delete().in('id', eliminadas.value)
      if (error) throw error
    }

    const filas = faqs.value.map((f, i) => ({
      pregunta: f.pregunta.trim(),
      respuesta: f.respuesta.trim(),
      categoria: f.categoria.trim() || null,
      status: f.status,
      orden: i + 1
    }))

    for (let i = 0; i < faqs.value.length; i++) {
      const f = faqs.value[i]
      const { error } = f.id
        ? await supabase.from('faqs').update(filas[i]).eq('id', f.id)
        : await supabase.from('faqs').insert(filas[i])
      if (error) throw error
    }

    await cargar()
    mensaje.value = { tipo: 'success', texto: 'Preguntas frecuentes guardadas' }
  } catch (err: any) {
    mensaje.value = { tipo: 'error', texto: err.message || 'Error al guardar' }
  }
  guardando.value = false
}

// Aviso al salir con cambios sin guardar
function antesDeSalir(e: BeforeUnloadEvent) {
  if (hayCambios.value) e.preventDefault()
}
onMounted(() => window.addEventListener('beforeunload', antesDeSalir))
onBeforeUnmount(() => window.removeEventListener('beforeunload', antesDeSalir))

let temporizador: ReturnType<typeof setTimeout> | undefined
watch(mensaje, (m) => {
  clearTimeout(temporizador)
  if (m?.tipo === 'success') temporizador = setTimeout(() => { mensaje.value = null }, 5000)
})
</script>

<template>
  <div class="admin">
    <AdminTopbar subtitulo="Artículos del blog" />

    <div class="layout">
      <!-- ═══════════ Lista de artículos ═══════════ -->
      <aside class="sidebar">
        <button type="button" class="btn-nuevo" @click="nuevoPost">
          <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.mas" />
          Nuevo artículo
        </button>

        <div class="buscador">
          <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.buscar" />
          <input v-model="busqueda" type="search" placeholder="Buscar artículo" />
        </div>

        <div class="lista">
          <button
            v-for="p in postsFiltrados"
            :key="p.id"
            type="button"
            :class="['item', { active: actual?.id === p.id }]"
            @click="editarPost(p)"
          >
            <span class="item-thumb">
              <img v-if="p.imagen_portada" :src="urlArchivo(p.imagen_portada)" alt="" loading="lazy" />
              <svg v-else class="ic" viewBox="0 0 24 24" v-html="ICONOS.lapiz" />
            </span>
            <span class="item-body">
              <span class="item-titulo">{{ p.titulo }}</span>
              <span class="item-meta">{{ p.categoria || 'Sin categoría' }} · {{ formatoFecha(p.publicado_at || p.created_at) }}</span>
              <span class="item-tags">
                <span :class="['tag', p.status === 'published' ? 'tag-publicado' : 'tag-borrador']">
                  {{ p.status === 'published' ? 'Publicado' : 'Borrador' }}
                </span>
              </span>
            </span>
          </button>
          <p v-if="!postsFiltrados.length" class="lista-vacia">
            {{ busqueda ? 'Sin resultados' : 'Aún no hay artículos' }}
          </p>
        </div>
      </aside>

      <!-- ═══════════ Editor ═══════════ -->
      <main class="main">
        <form ref="formRef" class="form" @submit.prevent="guardar">
          <div class="form-head">
            <div>
              <span class="form-kicker">{{ actual?.id ? 'Editando artículo' : 'Nuevo artículo' }}</span>
              <h1 class="form-title">{{ form.titulo || 'Sin título' }}</h1>
              <span class="form-sub">
                <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.check" />
                SEO: {{ checklistOk }} de {{ checklist.length }} puntos
              </span>
            </div>
            <a
              v-if="actual?.id && form.status === 'published'"
              :href="`/blog/${form.slug}`"
              target="_blank"
              class="btn-ghost"
            >
              <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.ojo" />
              Ver en la web
            </a>
          </div>

          <nav class="secciones">
            <button
              v-for="s in SECCIONES"
              :key="s.id"
              type="button"
              :class="['seccion-link', { active: seccionActiva === s.id }]"
              @click="irASeccion(s.id)"
            >
              <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS[s.icono]" />
              {{ s.label }}
            </button>
          </nav>

          <!-- ── General ── -->
          <section id="sec-general" class="card">
            <header class="card-head">
              <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.info" />
              <div>
                <h2>Información general</h2>
                <p>El título es el H1 del artículo (el único de la página).</p>
              </div>
            </header>

            <div class="field">
              <label>Título (H1) <em>*</em> <span :class="['contador', rango(form.titulo.length, 20, 70)]">{{ form.titulo.length }} caracteres</span></label>
              <input v-model="form.titulo" type="text" required placeholder="Ej: Cómo construir una casa en la Región de Los Ríos" @input="autoSlug" />
            </div>

            <div class="grid-2">
              <div class="field">
                <label>Dirección web (slug) <em>*</em></label>
                <div class="input-grupo">
                  <span class="input-prefijo">/blog/</span>
                  <input v-model="form.slug" type="text" required @input="slugEditado = true" />
                  <button type="button" class="input-accion" title="Generar desde el título" @click="regenerarSlug">
                    <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.refrescar" />
                  </button>
                </div>
              </div>
              <div class="field">
                <label>Categoría</label>
                <input v-model="form.categoria" type="text" list="categorias-blog" placeholder="Ej: Guías" />
                <datalist id="categorias-blog">
                  <option v-for="c in categoriasExistentes" :key="c" :value="c" />
                </datalist>
              </div>
            </div>

            <div class="grid-2">
              <div class="field">
                <label>Autor</label>
                <input v-model="form.autor" type="text" placeholder="Opcional (por defecto: R&J Constructora)" />
              </div>
              <div class="field">
                <label>Fecha de publicación</label>
                <input v-model="form.publicado_fecha" type="date" />
              </div>
            </div>
          </section>

          <!-- ── SEO ── -->
          <section id="sec-seo" class="card">
            <header class="card-head">
              <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.buscar" />
              <div>
                <h2>SEO e intención de búsqueda</h2>
                <p>Cómo aparecerá el artículo en Google.</p>
              </div>
            </header>

            <div class="grid-2">
              <div class="field">
                <label>Palabra clave principal</label>
                <input v-model="form.palabra_clave" type="text" placeholder="Ej: construir una casa en Valdivia" />
              </div>
              <div class="field">
                <label>Intención de búsqueda</label>
                <div class="segmentos">
                  <button
                    v-for="op in INTENCIONES"
                    :key="op.valor"
                    type="button"
                    :title="op.ayuda"
                    :class="{ active: form.intencion === op.valor }"
                    @click="form.intencion = op.valor"
                  >{{ op.label }}</button>
                </div>
              </div>
            </div>
            <p class="ayuda intencion-ayuda">{{ INTENCIONES.find(i => i.valor === form.intencion)?.ayuda }}</p>

            <div class="field">
              <label>Meta título <span :class="['contador', rango(metaTitulo.length, 30, 60)]">{{ metaTitulo.length }}/60</span></label>
              <input v-model="form.meta_titulo" type="text" :placeholder="`${form.titulo || 'Título del artículo'} | R&J Constructora`" />
            </div>

            <div class="field">
              <label>Meta descripción <span :class="['contador', rango(metaDescripcion.length, 120, 160)]">{{ metaDescripcion.length }}/160</span></label>
              <textarea v-model="form.meta_descripcion" rows="2" placeholder="Resumen atractivo que invite a hacer clic. Incluye la palabra clave."></textarea>
            </div>

            <div class="serp">
              <span class="serp-etiqueta">Vista previa en Google</span>
              <span class="serp-url">{{ siteHost }} › blog › {{ form.slug || 'mi-articulo' }}</span>
              <span class="serp-titulo">{{ recortar(metaTitulo, 60) || 'Título del artículo' }}</span>
              <span class="serp-desc">{{ recortar(metaDescripcion, 160) || 'La meta descripción aparecerá aquí.' }}</span>
            </div>

            <div class="checklist">
              <div class="checklist-head">
                <strong>Revisión SEO</strong>
                <span :class="['checklist-score', checklistOk >= checklist.length - 2 ? 'bien' : checklistOk >= checklist.length / 2 ? 'medio' : 'mal']">
                  {{ checklistOk }}/{{ checklist.length }}
                </span>
              </div>
              <ul>
                <li v-for="c in checklist" :key="c.texto" :class="{ ok: c.ok }">
                  <svg class="ic" viewBox="0 0 24 24" v-html="c.ok ? ICONOS.check : ICONOS.circulo" />
                  {{ c.texto }}
                </li>
              </ul>
            </div>
          </section>

          <!-- ── Resumen / TL;DR ── -->
          <section id="sec-resumen" class="card">
            <header class="card-head">
              <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.rayo" />
              <div>
                <h2>Resumen (TL;DR) y puntos clave</h2>
                <p>Aparece al inicio del artículo en un recuadro destacado.</p>
              </div>
            </header>

            <div class="field">
              <label>Resumen <span class="contador">{{ form.resumen.length }} caracteres</span></label>
              <textarea v-model="form.resumen" rows="3" placeholder="Responde en 2 o 3 frases la pregunta principal del artículo."></textarea>
            </div>

            <div class="field">
              <label>Puntos clave</label>
              <div class="ambientes">
                <div v-for="(_, i) in form.puntos_clave" :key="i" class="ambiente punto">
                  <span class="ambiente-num">{{ String(i + 1).padStart(2, '0') }}</span>
                  <input v-model="form.puntos_clave[i]" type="text" placeholder="Una idea clave en una frase" />
                  <button type="button" class="btn-icono" title="Quitar" @click="form.puntos_clave.splice(i, 1)">
                    <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.cerrar" />
                  </button>
                </div>
                <button type="button" class="btn-agregar" @click="form.puntos_clave.push('')">
                  <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.mas" />
                  Agregar punto clave
                </button>
              </div>
            </div>
          </section>

          <!-- ── Artículo ── -->
          <section id="sec-articulo" class="card">
            <header class="card-head">
              <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.lapiz" />
              <div>
                <h2>Artículo</h2>
                <p>Usa H2 para las secciones y H3 para subsecciones. El CTA se inserta solo después del primer párrafo.</p>
              </div>
            </header>

            <div class="editor">
              <div class="editor-barra">
                <div class="editor-herramientas">
                  <button v-for="h in HERRAMIENTAS" :key="h.id" type="button" :title="h.titulo" class="herramienta" @click="aplicar(h.id)">
                    <span v-if="h.texto" class="herramienta-texto">{{ h.texto }}</span>
                    <svg v-else class="ic" viewBox="0 0 24 24" v-html="h.icono" />
                  </button>
                  <button type="button" title="Insertar imagen" class="herramienta" :disabled="subiendoImagenContenido" @click="imagenContenidoRef?.click()">
                    <span v-if="subiendoImagenContenido" class="spinner"></span>
                    <svg v-else class="ic" viewBox="0 0 24 24" v-html="ICONOS.imagen" />
                  </button>
                  <input ref="imagenContenidoRef" type="file" accept="image/*" hidden @change="insertarImagen" />
                </div>
                <div class="segmentos compacto">
                  <button type="button" :class="{ active: !vistaPrevia }" @click="vistaPrevia = false">Escribir</button>
                  <button type="button" :class="{ active: vistaPrevia }" @click="vistaPrevia = true">Vista previa</button>
                </div>
              </div>

              <textarea
                v-show="!vistaPrevia"
                ref="editorRef"
                v-model="form.contenido"
                class="editor-texto"
                rows="22"
                placeholder="Escribe el primer párrafo respondiendo la pregunta del lector...

## Primera sección (H2)

Texto de la sección.

### Subsección (H3)

- Punto uno
- Punto dos"
              ></textarea>
              <div v-show="vistaPrevia" class="md-preview" v-html="previewHtml"></div>

              <div class="editor-pie">
                <span>{{ lectura.palabras }} palabras · {{ lectura.minutos }} min de lectura · {{ numH2 }} H2 · {{ numH3 }} H3</span>
                <details class="md-ayuda">
                  <summary>Guía rápida de formato</summary>
                  <table>
                    <tbody>
                      <tr><td><code>## Título</code></td><td>Subtítulo H2</td></tr>
                      <tr><td><code>### Título</code></td><td>Subtítulo H3</td></tr>
                      <tr><td><code>**texto**</code></td><td>Negrita</td></tr>
                      <tr><td><code>- elemento</code></td><td>Lista</td></tr>
                      <tr><td><code>1. elemento</code></td><td>Lista numerada</td></tr>
                      <tr><td><code>[texto](/proyectos)</code></td><td>Enlace</td></tr>
                      <tr><td><code>![descripción](url)</code></td><td>Imagen con texto alternativo</td></tr>
                      <tr><td><code>> texto</code></td><td>Cita destacada</td></tr>
                    </tbody>
                  </table>
                </details>
              </div>
            </div>

            <div class="grid-2 cta-campos">
              <div class="field">
                <label>Título del CTA (tras el 1.er párrafo)</label>
                <input v-model="form.cta_titulo" type="text" placeholder="¿Quieres construir tu casa en el sur?" />
              </div>
              <div class="field">
                <label>Texto del CTA</label>
                <input v-model="form.cta_texto" type="text" placeholder="Te asesoramos sin costo..." />
              </div>
            </div>
          </section>

          <!-- ── Imagen ── -->
          <section id="sec-imagen" class="card">
            <header class="card-head">
              <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.imagen" />
              <div>
                <h2>Imagen de portada</h2>
                <p>Se usa en el artículo, en la lista del blog y al compartir en redes.</p>
              </div>
            </header>

            <div class="grid-2">
              <div class="field">
                <label>Imagen</label>
                <div :class="['dropzone small', { filled: form.imagen_portada }]" @click="portadaRef?.click()">
                  <input ref="portadaRef" type="file" accept="image/*" hidden @change="subirPortada" />
                  <img v-if="form.imagen_portada" :src="urlArchivo(form.imagen_portada)" alt="" class="dropzone-img" />
                  <div v-else class="dropzone-vacio">
                    <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.subir" />
                    <strong>Subir imagen</strong>
                    <small>Horizontal, 1600 × 900 px</small>
                  </div>
                  <button v-if="form.imagen_portada" type="button" class="dropzone-quitar" title="Quitar" @click.stop="form.imagen_portada = ''">
                    <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.cerrar" />
                  </button>
                  <div v-if="subiendoPortada" class="subiendo"><span class="spinner"></span> Subiendo...</div>
                </div>
              </div>
              <div class="field">
                <label>Texto alternativo (alt) <span :class="['contador', form.imagen_alt ? 'bien' : 'mal']">{{ form.imagen_alt.length }} caracteres</span></label>
                <textarea v-model="form.imagen_alt" rows="4" placeholder="Describe lo que se ve. Ej: Casa de madera de dos pisos en construcción en Valdivia"></textarea>
                <small class="ayuda">Describe la imagen para Google y para personas con lector de pantalla.</small>
              </div>
            </div>
          </section>

          <!-- ── Preguntas frecuentes ── -->
          <section id="sec-faq" class="card">
            <header class="card-head">
              <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.pregunta" />
              <div>
                <h2>Preguntas frecuentes del artículo</h2>
                <p>Se muestran al final y generan el schema FAQPage para Google.</p>
              </div>
            </header>

            <div class="faq-editor">
              <div v-for="(f, i) in form.faqs" :key="i" class="faq-editor-item">
                <span class="ambiente-num">{{ String(i + 1).padStart(2, '0') }}</span>
                <div class="faq-editor-campos">
                  <input v-model="f.pregunta" type="text" placeholder="Pregunta" />
                  <textarea v-model="f.respuesta" rows="2" placeholder="Respuesta breve y directa"></textarea>
                </div>
                <button type="button" class="btn-icono" title="Quitar" @click="form.faqs.splice(i, 1)">
                  <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.cerrar" />
                </button>
              </div>
              <button type="button" class="btn-agregar" @click="form.faqs.push({ pregunta: '', respuesta: '' })">
                <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.mas" />
                Agregar pregunta
              </button>
            </div>
          </section>

          <div class="espaciador"></div>
        </form>

        <div class="savebar">
          <div class="savebar-opciones">
            <div class="segmentos compacto estado">
              <button type="button" :class="{ active: form.status === 'draft' }" @click="form.status = 'draft'">Borrador</button>
              <button type="button" :class="{ active: form.status === 'published' }" @click="form.status = 'published'">Publicado</button>
            </div>
          </div>
          <div class="savebar-acciones">
            <button v-if="actual?.id" type="button" class="btn-eliminar" @click="eliminar">
              <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.basura" />
              Eliminar
            </button>
            <button type="button" :disabled="guardando" class="btn-guardar" @click="formRef?.requestSubmit()">
              <span v-if="guardando" class="spinner"></span>
              <svg v-else class="ic" viewBox="0 0 24 24" v-html="ICONOS.guardar" />
              {{ guardando ? 'Guardando...' : 'Guardar artículo' }}
            </button>
          </div>
        </div>

        <Transition name="toast">
          <div v-if="mensaje" :class="['toast', mensaje.tipo]">
            <svg class="ic" viewBox="0 0 24 24" v-html="mensaje.tipo === 'error' ? ICONOS.alerta : ICONOS.check" />
            <span v-html="mensaje.texto"></span>
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
import type { BlogPost, FaqItem } from '~/composables/useBlog'

definePageMeta({ layout: false })
useAdminPagina('Blog')

const supabase = useSupabaseClient()
useAdminSesion({ alEntrar: () => { cargar(); nextTick(observarSecciones) } })

const ICONOS: Record<string, string> = {
  mas: '<path d="M12 5v14M5 12h14"/>',
  buscar: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>',
  lapiz: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  circulo: '<circle cx="12" cy="12" r="8"/>',
  ojo: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  refrescar: '<path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>',
  rayo: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
  imagen: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
  subir: '<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M17 8l-5-5-5 5M12 3v12"/>',
  cerrar: '<path d="M18 6L6 18M6 6l12 12"/>',
  pregunta: '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 015.8 1c0 2-3 3-3 3M12 17h.01"/>',
  basura: '<path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>',
  guardar: '<path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
  alerta: '<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><path d="M12 9v4M12 17h.01"/>'
}

const SECCIONES = [
  { id: 'general', label: 'General', icono: 'info' },
  { id: 'seo', label: 'SEO', icono: 'buscar' },
  { id: 'resumen', label: 'TL;DR', icono: 'rayo' },
  { id: 'articulo', label: 'Artículo', icono: 'lapiz' },
  { id: 'imagen', label: 'Imagen', icono: 'imagen' },
  { id: 'faq', label: 'FAQ', icono: 'pregunta' }
]

const INTENCIONES: { valor: NonNullable<BlogPost['intencion']>; label: string; ayuda: string }[] = [
  { valor: 'informativa', label: 'Informativa', ayuda: 'El lector quiere aprender o resolver una duda (guías, "cómo", "qué es").' },
  { valor: 'comercial', label: 'Comercial', ayuda: 'El lector compara opciones antes de decidir (precios, modelos, "mejor", "vs").' },
  { valor: 'transaccional', label: 'Transaccional', ayuda: 'El lector quiere actuar ya: cotizar, contratar o comprar.' },
  { valor: 'navegacional', label: 'Navegacional', ayuda: 'El lector busca una marca o página concreta.' }
]

const HERRAMIENTAS = [
  { id: 'h2', texto: 'H2', titulo: 'Subtítulo H2' },
  { id: 'h3', texto: 'H3', titulo: 'Subtítulo H3' },
  { id: 'negrita', icono: '<path d="M6 4h8a4 4 0 010 8H6zM6 12h9a4 4 0 010 8H6z"/>', titulo: 'Negrita' },
  { id: 'cursiva', icono: '<path d="M19 4h-9M14 20H5M15 4L9 20"/>', titulo: 'Cursiva' },
  { id: 'lista', icono: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>', titulo: 'Lista' },
  { id: 'numerada', icono: '<path d="M10 6h11M10 12h11M10 18h11M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>', titulo: 'Lista numerada' },
  { id: 'cita', icono: '<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.76-2-2-2H4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .01-1 1.03V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.76-2-2-2h-4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z"/>', titulo: 'Cita destacada' },
  { id: 'tabla', icono: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>', titulo: 'Tabla' },
  { id: 'enlace', icono: '<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>', titulo: 'Enlace' },
  { id: 'separador', icono: '<path d="M3 12h18"/>', titulo: 'Separador' }
]

// ── Estado ──
interface FormPost {
  titulo: string
  slug: string
  categoria: string
  autor: string
  publicado_fecha: string
  palabra_clave: string
  intencion: NonNullable<BlogPost['intencion']>
  meta_titulo: string
  meta_descripcion: string
  resumen: string
  puntos_clave: string[]
  contenido: string
  cta_titulo: string
  cta_texto: string
  imagen_portada: string
  imagen_alt: string
  faqs: FaqItem[]
  status: 'draft' | 'published'
}

const vacio = (): FormPost => ({
  titulo: '',
  slug: '',
  categoria: '',
  autor: '',
  publicado_fecha: new Date().toISOString().slice(0, 10),
  palabra_clave: '',
  intencion: 'informativa',
  meta_titulo: '',
  meta_descripcion: '',
  resumen: '',
  puntos_clave: [],
  contenido: '',
  cta_titulo: '',
  cta_texto: '',
  imagen_portada: '',
  imagen_alt: '',
  faqs: [],
  status: 'draft'
})

const posts = ref<BlogPost[]>([])
const actual = ref<BlogPost | null>(null)
const form = ref<FormPost>(vacio())
const busqueda = ref('')
const guardando = ref(false)
const subiendoPortada = ref(false)
const subiendoImagenContenido = ref(false)
const vistaPrevia = ref(false)
const slugEditado = ref(false)
const mensaje = ref<{ tipo: string; texto: string } | null>(null)

const formRef = ref<HTMLFormElement | null>(null)
const editorRef = ref<HTMLTextAreaElement | null>(null)
const portadaRef = ref<HTMLInputElement | null>(null)
const imagenContenidoRef = ref<HTMLInputElement | null>(null)

const siteHost = computed(() => (useRuntimeConfig().public.siteUrl as string || '').replace(/^https?:\/\//, '').replace(/\/$/, ''))

async function cargar() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) {
    console.error('Error cargando blog_posts:', error)
    mensaje.value = { tipo: 'error', texto: `No se pudieron cargar los datos. ${mensajeErrorSupabase(error, 'blog_posts')}` }
    return
  }
  posts.value = (data ?? []) as BlogPost[]
}

const postsFiltrados = computed(() => {
  const q = busqueda.value.trim().toLowerCase()
  return posts.value.filter(p => !q || `${p.titulo} ${p.categoria ?? ''}`.toLowerCase().includes(q))
})

const categoriasExistentes = computed(() =>
  [...new Set(['Guías', 'Diseño', 'Permisos', 'Costos', 'Materiales', ...posts.value.map(p => p.categoria).filter(Boolean) as string[]])]
)

function nuevoPost() {
  actual.value = null
  form.value = vacio()
  slugEditado.value = false
  vistaPrevia.value = false
  mensaje.value = null
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function editarPost(p: BlogPost) {
  actual.value = p
  form.value = {
    titulo: p.titulo || '',
    slug: p.slug || '',
    categoria: p.categoria || '',
    autor: p.autor || '',
    publicado_fecha: (p.publicado_at || p.created_at || new Date().toISOString()).slice(0, 10),
    palabra_clave: p.palabra_clave || '',
    intencion: p.intencion || 'informativa',
    meta_titulo: p.meta_titulo || '',
    meta_descripcion: p.meta_descripcion || '',
    resumen: p.resumen || '',
    puntos_clave: [...(p.puntos_clave || [])],
    contenido: p.contenido || '',
    cta_titulo: p.cta_titulo || '',
    cta_texto: p.cta_texto || '',
    imagen_portada: p.imagen_portada || '',
    imagen_alt: p.imagen_alt || '',
    faqs: (p.faqs || []).map(f => ({ ...f })),
    status: p.status || 'draft'
  }
  slugEditado.value = true
  vistaPrevia.value = false
  mensaje.value = null
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function autoSlug() {
  if (!actual.value?.id && !slugEditado.value) form.value.slug = slugificar(form.value.titulo)
}

function regenerarSlug() {
  form.value.slug = slugificar(form.value.titulo)
  slugEditado.value = false
}

// ── SEO ──
const metaTitulo = computed(() => form.value.meta_titulo || (form.value.titulo ? `${form.value.titulo} | R&J Constructora` : ''))
const metaDescripcion = computed(() => form.value.meta_descripcion || form.value.resumen)

const recortar = (t: string, n: number) => (t.length > n ? `${t.slice(0, n - 1).trim()}…` : t)

function rango(n: number, min: number, max: number) {
  if (!n) return ''
  return n >= min && n <= max ? 'bien' : n > max ? 'mal' : 'medio'
}

const normalizar = (t: string) => (t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

const primerParrafo = computed(() =>
  (form.value.contenido.split(/\n\s*\n/).find(b => b.trim() && !/^\s*(#|-|\d+\.|>|\||!\[)/.test(b)) || '')
)

const lectura = computed(() => tiempoLectura(form.value.contenido))
const numH2 = computed(() => (form.value.contenido.match(/^## /gm) || []).length)
const numH3 = computed(() => (form.value.contenido.match(/^### /gm) || []).length)

const checklist = computed(() => {
  const f = form.value
  const kw = normalizar(f.palabra_clave.trim())
  const contiene = (t: string) => !!kw && normalizar(t).includes(kw)
  return [
    { texto: 'Palabra clave principal definida', ok: !!kw },
    { texto: 'Palabra clave en el título (H1)', ok: contiene(f.titulo) },
    { texto: 'Meta título entre 30 y 60 caracteres', ok: metaTitulo.value.length >= 30 && metaTitulo.value.length <= 60 },
    { texto: 'Meta descripción entre 120 y 160 caracteres', ok: metaDescripcion.value.length >= 120 && metaDescripcion.value.length <= 160 },
    { texto: 'Palabra clave en la meta descripción', ok: contiene(metaDescripcion.value) },
    { texto: 'Palabra clave en el primer párrafo', ok: contiene(primerParrafo.value) },
    { texto: 'Resumen TL;DR completo', ok: f.resumen.trim().length >= 60 },
    { texto: 'Al menos 2 subtítulos H2', ok: numH2.value >= 2 },
    { texto: 'Sin H1 dentro del contenido (solo el título)', ok: !/^# /m.test(f.contenido) },
    { texto: 'Al menos 600 palabras', ok: lectura.value.palabras >= 600 },
    { texto: 'Usa listas o tablas', ok: /^\s*(- |\d+\. |\|)/m.test(f.contenido) },
    { texto: 'Enlace interno (modelos, contacto u otro artículo)', ok: /\]\(\/(proyectos|contacto|blog|servicios)/.test(f.contenido) },
    { texto: 'Imagen de portada con texto alternativo', ok: !!f.imagen_portada && f.imagen_alt.trim().length >= 10 },
    { texto: 'Imágenes del contenido con texto alternativo', ok: !/!\[\s*\]\(/.test(f.contenido) },
    { texto: 'Al menos 2 preguntas frecuentes', ok: f.faqs.filter(q => q.pregunta.trim() && q.respuesta.trim()).length >= 2 }
  ]
})
const checklistOk = computed(() => checklist.value.filter(c => c.ok).length)

// ── Editor Markdown ──
const previewHtml = computed(() => markdownAHtml(form.value.contenido, urlArchivo).html)

function reemplazarSeleccion(transformar: (sel: string) => { texto: string; cursorDesde?: number; cursorHasta?: number }) {
  const ta = editorRef.value
  if (!ta) return
  const inicio = ta.selectionStart
  const fin = ta.selectionEnd
  const antes = form.value.contenido.slice(0, inicio)
  const despues = form.value.contenido.slice(fin)
  const r = transformar(form.value.contenido.slice(inicio, fin))
  form.value.contenido = antes + r.texto + despues
  nextTick(() => {
    ta.focus()
    ta.selectionStart = inicio + (r.cursorDesde ?? r.texto.length)
    ta.selectionEnd = inicio + (r.cursorHasta ?? r.texto.length)
  })
}

// Asegura que el bloque quede en su propia línea
function bloque(texto: string) {
  const ta = editorRef.value
  const antes = ta ? form.value.contenido.slice(0, ta.selectionStart) : form.value.contenido
  const prefijo = !antes || antes.endsWith('\n\n') ? '' : antes.endsWith('\n') ? '\n' : '\n\n'
  return `${prefijo}${texto}\n\n`
}

function envolver(marca: string, ejemplo: string) {
  reemplazarSeleccion(sel => {
    const t = sel || ejemplo
    return { texto: `${marca}${t}${marca}`, cursorDesde: marca.length, cursorHasta: marca.length + t.length }
  })
}

function aplicar(id: string) {
  vistaPrevia.value = false
  switch (id) {
    case 'h2': return reemplazarSeleccion(sel => ({ texto: bloque(`## ${sel || 'Subtítulo de la sección'}`) }))
    case 'h3': return reemplazarSeleccion(sel => ({ texto: bloque(`### ${sel || 'Subtítulo'}`) }))
    case 'negrita': return envolver('**', 'texto importante')
    case 'cursiva': return envolver('_', 'texto')
    case 'lista': return reemplazarSeleccion(sel => ({ texto: bloque((sel || 'Elemento uno\nElemento dos').split('\n').map(l => `- ${l}`).join('\n')) }))
    case 'numerada': return reemplazarSeleccion(sel => ({ texto: bloque((sel || 'Primer paso\nSegundo paso').split('\n').map((l, i) => `${i + 1}. ${l}`).join('\n')) }))
    case 'cita': return reemplazarSeleccion(sel => ({ texto: bloque(`> ${sel || 'Dato o consejo destacado'}`) }))
    case 'tabla': return reemplazarSeleccion(() => ({ texto: bloque('| Columna 1 | Columna 2 | Columna 3 |\n|---|---|---|\n| Dato | Dato | Dato |\n| Dato | Dato | Dato |') }))
    case 'enlace': return reemplazarSeleccion(sel => {
      const t = sel || 'texto del enlace'
      return { texto: `[${t}](/proyectos)`, cursorDesde: t.length + 3, cursorHasta: t.length + 13 }
    })
    case 'separador': return reemplazarSeleccion(() => ({ texto: bloque('---') }))
  }
}

async function insertarImagen(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  const alt = window.prompt('Describe la imagen (texto alternativo para Google y accesibilidad):', form.value.titulo)
  if (alt === null) return
  subiendoImagenContenido.value = true
  try {
    const n = (form.value.contenido.match(/!\[/g) || []).length + 1
    const fileName = await subirArchivo(file, `${form.value.slug || 'blog'}-imagen-${n}`)
    reemplazarSeleccion(() => ({ texto: bloque(`![${alt.trim() || form.value.titulo}](${urlArchivo(fileName)})`) }))
  } catch {
    mensaje.value = { tipo: 'error', texto: 'Error al subir la imagen' }
  }
  subiendoImagenContenido.value = false
}

async function subirPortada(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  subiendoPortada.value = true
  try {
    form.value.imagen_portada = await subirArchivo(file, `${form.value.slug || 'blog'}-portada`)
  } catch {
    mensaje.value = { tipo: 'error', texto: 'Error al subir la imagen' }
  }
  subiendoPortada.value = false
}

// ── Guardar / eliminar ──
async function guardar() {
  const f = form.value
  if (f.status === 'published' && f.imagen_portada && !f.imagen_alt.trim()) {
    mensaje.value = { tipo: 'error', texto: 'Agrega el texto alternativo de la imagen de portada antes de publicar.' }
    irASeccion('imagen')
    return
  }

  guardando.value = true
  mensaje.value = null

  const fechaPublicacion = f.publicado_fecha
    ? new Date(`${f.publicado_fecha}T12:00:00`).toISOString()
    : (f.status === 'published' ? new Date().toISOString() : null)

  const datos = {
    titulo: f.titulo.trim(),
    slug: slugificar(f.slug) || slugificar(f.titulo),
    categoria: f.categoria.trim() || null,
    autor: f.autor.trim() || null,
    palabra_clave: f.palabra_clave.trim() || null,
    intencion: f.intencion,
    meta_titulo: f.meta_titulo.trim() || null,
    meta_descripcion: f.meta_descripcion.trim() || null,
    resumen: f.resumen.trim() || null,
    puntos_clave: f.puntos_clave.map(p => p.trim()).filter(Boolean),
    contenido: f.contenido,
    cta_titulo: f.cta_titulo.trim() || null,
    cta_texto: f.cta_texto.trim() || null,
    imagen_portada: f.imagen_portada || null,
    imagen_alt: f.imagen_alt.trim() || null,
    faqs: f.faqs.filter(q => q.pregunta.trim() && q.respuesta.trim()).map(q => ({ pregunta: q.pregunta.trim(), respuesta: q.respuesta.trim() })),
    status: f.status,
    publicado_at: fechaPublicacion
  }

  try {
    const consulta = actual.value?.id
      ? supabase.from('blog_posts').update(datos).eq('id', actual.value.id).select().single()
      : supabase.from('blog_posts').insert(datos).select().single()
    const { data, error } = await consulta
    if (error) throw error

    await cargar()
    const guardado = posts.value.find(p => p.id === (data as BlogPost).id)
    if (guardado) editarPost(guardado)
    mensaje.value = {
      tipo: 'success',
      texto: datos.status === 'published'
        ? `Artículo publicado. <a href="/blog/${datos.slug}" target="_blank">Ver artículo</a>`
        : 'Artículo guardado como borrador'
    }
  } catch (err: any) {
    const duplicado = err?.code === '23505'
    mensaje.value = { tipo: 'error', texto: duplicado ? 'Ya existe un artículo con esa dirección web (slug).' : (err.message || 'Error al guardar') }
  }
  guardando.value = false
}

async function eliminar() {
  if (!actual.value?.id) return
  if (!confirm('¿Seguro que quieres eliminar este artículo?')) return
  const { error } = await supabase.from('blog_posts').delete().eq('id', actual.value.id)
  if (error) {
    mensaje.value = { tipo: 'error', texto: 'Error al eliminar' }
    return
  }
  nuevoPost()
  await cargar()
  mensaje.value = { tipo: 'success', texto: 'Artículo eliminado' }
}

let temporizador: ReturnType<typeof setTimeout> | undefined
watch(mensaje, (m) => {
  clearTimeout(temporizador)
  if (m?.tipo === 'success') temporizador = setTimeout(() => { mensaje.value = null }, 6000)
})

// ── Navegación por secciones ──
const seccionActiva = ref('general')

function irASeccion(id: string) {
  seccionActiva.value = id
  document.getElementById(`sec-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

let observador: IntersectionObserver | null = null
function observarSecciones() {
  observador?.disconnect()
  observador = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) seccionActiva.value = visible.target.id.replace('sec-', '')
    },
    { rootMargin: '-120px 0px -60% 0px' }
  )
  SECCIONES.forEach(s => {
    const el = document.getElementById(`sec-${s.id}`)
    if (el) observador!.observe(el)
  })
}
onBeforeUnmount(() => observador?.disconnect())
</script>

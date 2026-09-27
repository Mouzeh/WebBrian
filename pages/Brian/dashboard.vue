<template>
  <div class="admin">
    <!-- ═══════════ Barra superior ═══════════ -->
    <header class="topbar">
      <div class="topbar-brand">
        <img src="/images/logosinfondo.png" alt="Logo" class="topbar-logo" />
        <div class="topbar-title">
          <strong>Panel de administración</strong>
          <span>Proyectos y modelos de casas</span>
        </div>
      </div>
      <div class="topbar-actions">
        <a href="/" target="_blank" class="topbar-link">
          <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.externo" />
          <span>Ver sitio</span>
        </a>
        <button type="button" class="topbar-link" @click="logout">
          <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.salir" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </header>

    <div class="layout">
      <!-- ═══════════ Barra lateral ═══════════ -->
      <aside class="sidebar">
        <button type="button" class="btn-nuevo" @click="nuevoProyecto">
          <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.mas" />
          Nuevo proyecto
        </button>

        <div class="buscador">
          <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.buscar" />
          <input v-model="busqueda" type="search" placeholder="Buscar por nombre o comuna" />
        </div>

        <div class="filtros">
          <button
            v-for="f in filtrosCategoria"
            :key="f.value"
            type="button"
            :class="['filtro', { active: filtroCategoria === f.value }]"
            @click="filtroCategoria = f.value"
          >
            {{ f.label }}
            <span class="filtro-count">{{ contarCategoria(f.value) }}</span>
          </button>
        </div>

        <div class="lista">
          <button
            v-for="p in proyectosFiltrados"
            :key="p.id"
            type="button"
            :class="['item', { active: proyectoActual?.id === p.id }]"
            @click="editarProyecto(p)"
          >
            <span class="item-thumb">
              <img v-if="p.imagen_portada" :src="getImageUrl(p.imagen_portada)" alt="" loading="lazy" />
              <svg v-else class="ic" viewBox="0 0 24 24" v-html="ICONOS.casa" />
            </span>
            <span class="item-body">
              <span class="item-titulo">{{ p.titulo }}</span>
              <span class="item-meta">{{ comunaCorta(p.ubicacion) }}</span>
              <span class="item-tags">
                <span :class="['tag', p.categoria === 'construccion' ? 'tag-render' : 'tag-terminado']">
                  {{ categoriaLabel(p.categoria) }}
                </span>
                <span :class="['tag', p.status === 'published' ? 'tag-publicado' : 'tag-borrador']">
                  {{ p.status === 'published' ? 'Publicado' : 'Borrador' }}
                </span>
                <svg v-if="p.destacado" class="ic ic-estrella" viewBox="0 0 24 24" v-html="ICONOS.estrella" />
              </span>
            </span>
          </button>
          <p v-if="!proyectosFiltrados.length" class="lista-vacia">
            {{ busqueda ? 'Sin resultados para la búsqueda' : 'Aún no hay proyectos' }}
          </p>
        </div>

        <!-- Configuración del sitio -->
        <div class="config-sitio">
          <span class="config-titulo">Configuración del sitio</span>
          <label class="switch-field">
            <input
              type="checkbox"
              :checked="mostrarTerminados"
              :disabled="guardandoConfig"
              @change="toggleTerminados(($event.target as HTMLInputElement).checked)"
            />
            <span class="switch"></span>
            <span class="switch-label">
              Mostrar "Proyectos que hablan solos"
              <small>{{ mostrarTerminados ? 'Visible en inicio y /proyectos' : 'Oculto: solo se ven los modelos' }}</small>
            </span>
          </label>
          <p v-if="errorConfig" class="config-error">{{ errorConfig }}</p>
        </div>
      </aside>

      <!-- ═══════════ Formulario ═══════════ -->
      <main class="main">
        <form ref="formRef" class="form" @submit.prevent="guardarProyecto">
          <!-- Encabezado -->
          <div class="form-head">
            <div>
              <span class="form-kicker">{{ proyectoActual?.id ? 'Editando' : 'Nuevo proyecto' }}</span>
              <h1 class="form-title">{{ form.titulo || 'Sin título' }}</h1>
              <span class="form-sub">
                <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.pin" />
                {{ ubicacionTexto || 'Sin ubicación' }}
              </span>
            </div>
            <a
              v-if="proyectoActual?.id && form.slug && form.status === 'published'"
              :href="`/proyectos/${form.slug}`"
              target="_blank"
              class="btn-ghost"
            >
              <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.ojo" />
              Ver en la web
            </a>
          </div>

          <!-- Navegación de secciones -->
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
                <p>Tipo de proyecto, nombre y descripción.</p>
              </div>
            </header>

            <div class="field">
              <label>Categoría</label>
              <div class="opciones-2">
                <label :class="['opcion', { active: form.categoria === 'terminado' }]">
                  <input v-model="form.categoria" type="radio" value="terminado" />
                  <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.check" />
                  <span>
                    <strong>Proyecto terminado</strong>
                    <small>Casa ya construida y entregada</small>
                  </span>
                </label>
                <label :class="['opcion', { active: form.categoria === 'construccion' }]">
                  <input v-model="form.categoria" type="radio" value="construccion" />
                  <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.plano" />
                  <span>
                    <strong>Proyecto para construir</strong>
                    <small>Render / modelo de casa</small>
                  </span>
                </label>
              </div>
            </div>

            <div class="grid-2">
              <div class="field">
                <label>Título <em>*</em></label>
                <input v-model="form.titulo" type="text" required placeholder="Ej: Vivienda N1 Alerces" @input="autoGenerateSlug" />
              </div>
              <div class="field">
                <label>Dirección web (slug) <em>*</em></label>
                <div class="input-grupo">
                  <span class="input-prefijo">/proyectos/</span>
                  <input v-model="form.slug" type="text" required placeholder="vivienda-n1-alerces" @input="slugManuallyEdited = true" />
                  <button type="button" class="input-accion" title="Generar desde el título" @click="regenerateSlug">
                    <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.refrescar" />
                  </button>
                </div>
              </div>
            </div>

            <div class="grid-3">
              <div class="field">
                <label>Tipo <em>*</em></label>
                <select v-model="form.tipo" required>
                  <option value="residencial">Residencial</option>
                  <option value="comercial">Comercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="remodelacion">Remodelación</option>
                </select>
              </div>
              <div class="field">
                <label>Año <em>*</em></label>
                <input v-model.number="form.anio" type="number" required min="1990" max="2100" />
              </div>
              <div v-if="form.categoria === 'construccion'" class="field">
                <label>Precio desde</label>
                <input v-model="form.precio" type="text" placeholder="UF 1.800" />
              </div>
              <div v-else class="field">
                <label>Cliente</label>
                <input v-model="form.cliente" type="text" placeholder="Opcional" />
              </div>
            </div>

            <div class="field">
              <label>Descripción corta <em>*</em> <span class="contador">{{ form.descripcion.length }}/200</span></label>
              <textarea v-model="form.descripcion" rows="2" maxlength="200" required placeholder="Una o dos frases que resuman el proyecto"></textarea>
            </div>

            <div class="field">
              <label>Descripción completa</label>
              <textarea v-model="form.descripcion_completa" rows="5" placeholder="Detalle del proyecto: materiales, terminaciones, entorno..."></textarea>
            </div>
          </section>

          <!-- ── Ubicación ── -->
          <section id="sec-ubicacion" class="card">
            <header class="card-head">
              <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.pin" />
              <div>
                <h2>Ubicación</h2>
                <p>Por defecto: Valdivia, Región de Los Ríos.</p>
              </div>
            </header>

            <div class="grid-2">
              <div class="field">
                <label>Región <em>*</em></label>
                <select v-model="ubic.region" @change="alCambiarRegion">
                  <option v-for="r in REGIONES_CHILE" :key="r.nombre" :value="r.nombre">{{ r.corto }}</option>
                </select>
              </div>
              <div class="field">
                <label>Comuna <em>*</em></label>
                <select v-model="ubic.comuna" required>
                  <option value="" disabled>Selecciona una comuna</option>
                  <option v-for="c in comunasDisponibles" :key="c" :value="c">{{ c }}</option>
                  <option value="__otra">Otra (escribir)</option>
                </select>
              </div>
            </div>

            <div class="grid-2">
              <div v-if="ubic.comuna === '__otra'" class="field">
                <label>Nombre de la localidad <em>*</em></label>
                <input v-model="ubic.comunaOtra" type="text" required placeholder="Ej: Niebla" />
              </div>
              <div class="field">
                <label>Sector o dirección</label>
                <input v-model="ubic.sector" type="text" placeholder="Ej: Isla Teja, Las Ánimas, Km 5 camino a Niebla" />
              </div>
            </div>

            <div class="comunas-rapidas">
              <span>Acceso rápido:</span>
              <button
                v-for="c in COMUNAS_RAPIDAS"
                :key="c.comuna"
                type="button"
                :class="['chip', { active: ubic.region === c.region && ubic.comuna === c.comuna }]"
                @click="elegirComuna(c.region, c.comuna)"
              >
                {{ c.comuna }}
              </button>
            </div>

            <div class="ubicacion-preview">
              <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.pin" />
              <span>Se mostrará como: <strong>{{ ubicacionTexto || '—' }}</strong></span>
            </div>
          </section>

          <!-- ── Imágenes ── -->
          <section id="sec-imagenes" class="card">
            <header class="card-head">
              <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.imagen" />
              <div>
                <h2>Imágenes</h2>
                <p>Portada (obligatoria) y galería. Formatos JPG, PNG o WEBP.</p>
              </div>
            </header>

            <div class="field">
              <label>Imagen de portada <em>*</em></label>
              <div :class="['dropzone', { filled: form.imagen_portada }]" @click="($refs.filePortada as HTMLInputElement).click()">
                <input ref="filePortada" type="file" accept="image/*" hidden @change="subirPortada" />
                <img v-if="form.imagen_portada" :src="getImageUrl(form.imagen_portada)" alt="Portada" class="dropzone-img" />
                <div v-else class="dropzone-vacio">
                  <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.subir" />
                  <strong>Haz clic para subir la portada</strong>
                  <small>Recomendado: horizontal, 1600 × 900 px</small>
                </div>
                <span v-if="form.imagen_portada" class="dropzone-cambiar">Cambiar imagen</span>
                <div v-if="uploadingPortada" class="subiendo"><span class="spinner"></span> Subiendo...</div>
              </div>
            </div>

            <div class="field">
              <label>Galería <span class="contador">{{ form.galeria.length }} imágenes</span></label>
              <div class="galeria">
                <div v-for="(img, i) in form.galeria" :key="img" class="galeria-item">
                  <img :src="getImageUrl(img)" alt="" />
                  <button type="button" class="galeria-quitar" title="Quitar" @click="quitarGaleria(i)">
                    <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.cerrar" />
                  </button>
                </div>
                <button type="button" class="galeria-agregar" @click="($refs.fileGaleria as HTMLInputElement).click()">
                  <input ref="fileGaleria" type="file" accept="image/*" multiple hidden @change="subirGaleria" />
                  <svg v-if="!uploadingGaleria" class="ic" viewBox="0 0 24 24" v-html="ICONOS.mas" />
                  <span v-else class="spinner"></span>
                  <small>{{ uploadingGaleria ? 'Subiendo' : 'Agregar' }}</small>
                </button>
              </div>
            </div>
          </section>

          <!-- ── Especificaciones ── -->
          <section id="sec-especificaciones" class="card">
            <header class="card-head">
              <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.lista" />
              <div>
                <h2>Especificaciones</h2>
                <p>Se muestran en la tarjeta del proyecto. En superficies puedes escribir solo el número y se agrega "m²".</p>
              </div>
            </header>

            <div class="grid-4">
              <div class="field">
                <label>Superficie construida</label>
                <div class="input-grupo">
                  <input v-model="form.especificaciones_tecnicas.superficie_desde" type="text" placeholder="120" />
                  <span class="input-sufijo">m²</span>
                </div>
              </div>
              <div class="field">
                <label>Superficie terreno</label>
                <div class="input-grupo">
                  <input v-model="form.especificaciones_tecnicas.superficie_terreno" type="text" placeholder="300" />
                  <span class="input-sufijo">m²</span>
                </div>
              </div>
              <div class="field">
                <label>Terraza</label>
                <div class="input-grupo">
                  <input v-model="form.especificaciones_tecnicas.terraza" type="text" placeholder="35" />
                  <span class="input-sufijo">m²</span>
                </div>
              </div>
              <div class="field">
                <label>Pisos</label>
                <input v-model="form.pisos" type="text" placeholder="2" />
              </div>
              <div class="field">
                <label>Dormitorios</label>
                <input v-model="form.especificaciones_tecnicas.dormitorios" type="text" placeholder="3" />
              </div>
              <div class="field">
                <label>Baños</label>
                <input v-model="form.especificaciones_tecnicas.banos" type="text" placeholder="2" />
              </div>
              <div class="field">
                <label>Estacionamientos</label>
                <input v-model="form.especificaciones_tecnicas.estacionamientos" type="text" placeholder="2" />
              </div>
              <div class="field">
                <label>Estructura</label>
                <input v-model="form.especificaciones_tecnicas.estructura" type="text" list="estructuras" placeholder="Madera" />
                <datalist id="estructuras">
                  <option value="Madera" />
                  <option value="Panel SIP" />
                  <option value="Metalcon" />
                  <option value="Albañilería" />
                  <option value="Hormigón armado" />
                  <option value="Mixta" />
                </datalist>
              </div>
            </div>

            <div class="grid-3">
              <div class="field">
                <label>Cocina</label>
                <div class="segmentos">
                  <button
                    v-for="op in ['Independiente', 'Americana', 'Integrada']"
                    :key="op"
                    type="button"
                    :class="{ active: form.especificaciones_tecnicas.cocina_tipo === op }"
                    @click="alternar('cocina_tipo', op)"
                  >{{ op }}</button>
                </div>
              </div>
              <div class="field">
                <label>Altillo</label>
                <div class="segmentos">
                  <button
                    v-for="op in ['Sí', 'No', 'Opcional']"
                    :key="op"
                    type="button"
                    :class="{ active: form.especificaciones_tecnicas.altillo === op }"
                    @click="alternar('altillo', op)"
                  >{{ op }}</button>
                </div>
              </div>
              <div class="field">
                <label>Walk-in closet</label>
                <div class="segmentos">
                  <button
                    v-for="op in ['Sí', 'No', 'Opcional']"
                    :key="op"
                    type="button"
                    :class="{ active: form.especificaciones_tecnicas.walk_in_closet === op }"
                    @click="alternar('walk_in_closet', op)"
                  >{{ op }}</button>
                </div>
              </div>
            </div>
          </section>

          <!-- ── Plano ── -->
          <section id="sec-plano" class="card">
            <header class="card-head">
              <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.plano" />
              <div>
                <h2>Plano y distribución</h2>
                <p>Imagen del plano, PDF descargable y superficie de cada ambiente.</p>
              </div>
            </header>

            <div class="grid-2">
              <div class="field">
                <label>Título del plano</label>
                <input v-model="form.plano_titulo" type="text" placeholder="El plano que define el hogar" />
              </div>
              <div class="field">
                <label>Etiqueta</label>
                <input v-model="form.plano_subtitulo" type="text" placeholder="Distribución" />
              </div>
            </div>

            <div class="grid-2">
              <div class="field">
                <label>Imagen del plano</label>
                <div :class="['dropzone small', { filled: form.plano_imagen }]" @click="($refs.filePlano as HTMLInputElement).click()">
                  <input ref="filePlano" type="file" accept="image/*" hidden @change="subirPlano" />
                  <img v-if="form.plano_imagen" :src="getImageUrl(form.plano_imagen)" alt="Plano" class="dropzone-img contain" />
                  <div v-else class="dropzone-vacio">
                    <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.subir" />
                    <strong>Subir imagen del plano</strong>
                  </div>
                  <button v-if="form.plano_imagen" type="button" class="dropzone-quitar" title="Quitar" @click.stop="form.plano_imagen = ''">
                    <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.cerrar" />
                  </button>
                  <div v-if="uploadingPlano" class="subiendo"><span class="spinner"></span> Subiendo...</div>
                </div>
              </div>
              <div class="field">
                <label>PDF del plano</label>
                <div :class="['dropzone small', { filled: form.plano_pdf }]" @click="($refs.filePlanoPdf as HTMLInputElement).click()">
                  <input ref="filePlanoPdf" type="file" accept=".pdf" hidden @change="subirPlanoPdf" />
                  <div v-if="form.plano_pdf" class="dropzone-archivo">
                    <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.archivo" />
                    <span>{{ form.plano_pdf }}</span>
                  </div>
                  <div v-else class="dropzone-vacio">
                    <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.subir" />
                    <strong>Subir PDF</strong>
                  </div>
                  <button v-if="form.plano_pdf" type="button" class="dropzone-quitar" title="Quitar" @click.stop="form.plano_pdf = ''">
                    <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.cerrar" />
                  </button>
                  <div v-if="uploadingPlanoPdf" class="subiendo"><span class="spinner"></span> Subiendo...</div>
                </div>
              </div>
            </div>

            <div class="field fila-toggle">
              <div>
                <label>Permitir descargar el plano</label>
                <small class="ayuda">Muestra el botón "Descargar plano" (usa el PDF; si no hay, la imagen).</small>
              </div>
              <div class="segmentos compacto">
                <button type="button" :class="{ active: form.plano_descargable }" @click="form.plano_descargable = true">Sí</button>
                <button type="button" :class="{ active: !form.plano_descargable }" @click="form.plano_descargable = false">No</button>
              </div>
            </div>

            <div class="field">
              <label>
                Ambientes
                <span class="contador">
                  {{ form.ambientes.length }} ambientes<template v-if="totalAmbientes"> · {{ totalAmbientes }} m² en total</template>
                </span>
              </label>
              <div class="ambientes">
                <div v-for="(amb, i) in form.ambientes" :key="i" class="ambiente">
                  <span class="ambiente-num">{{ String(i + 1).padStart(2, '0') }}</span>
                  <input v-model="amb.nombre" type="text" list="ambientes-sugeridos" placeholder="Nombre del ambiente" />
                  <div class="input-grupo ambiente-area">
                    <input v-model="amb.area" type="text" placeholder="22" />
                    <span class="input-sufijo">m²</span>
                  </div>
                  <button type="button" class="btn-icono" title="Quitar" @click="quitarAmbiente(i)">
                    <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.cerrar" />
                  </button>
                </div>
                <datalist id="ambientes-sugeridos">
                  <option v-for="a in AMBIENTES_SUGERIDOS" :key="a" :value="a" />
                </datalist>
                <button type="button" class="btn-agregar" @click="agregarAmbiente">
                  <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.mas" />
                  Agregar ambiente
                </button>
              </div>
            </div>
          </section>

          <div class="espaciador"></div>
        </form>

        <!-- ═══════════ Barra de guardado ═══════════ -->
        <div class="savebar">
          <div class="savebar-opciones">
            <div class="segmentos compacto estado">
              <button type="button" :class="{ active: form.status === 'draft' }" @click="form.status = 'draft'">Borrador</button>
              <button type="button" :class="{ active: form.status === 'published' }" @click="form.status = 'published'">Publicado</button>
            </div>
            <label class="check-destacado">
              <input v-model="form.destacado" type="checkbox" />
              <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.estrella" />
              Destacado
            </label>
          </div>
          <div class="savebar-acciones">
            <button v-if="proyectoActual?.id" type="button" class="btn-eliminar" @click="eliminarProyecto">
              <svg class="ic" viewBox="0 0 24 24" v-html="ICONOS.basura" />
              Eliminar
            </button>
            <button type="button" :disabled="guardando" class="btn-guardar" @click="enviarFormulario">
              <span v-if="guardando" class="spinner"></span>
              <svg v-else class="ic" viewBox="0 0 24 24" v-html="ICONOS.guardar" />
              {{ guardando ? 'Guardando...' : 'Guardar proyecto' }}
            </button>
          </div>
        </div>

        <!-- Aviso -->
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
import {
  REGIONES_CHILE,
  REGION_POR_DEFECTO,
  COMUNA_POR_DEFECTO,
  comunasDeRegion,
  componerUbicacion,
  separarUbicacion
} from '~/composables/regionesChile'

definePageMeta({
  layout: false
})

useHead({
  title: 'Panel de administración — Construcciones Brian',
  // El panel no usa el preloader del sitio: sin esta clase, <main> queda oculto
  bodyAttrs: { class: 'preloader-done' }
})

// Íconos SVG (trazos 24x24)
const ICONOS: Record<string, string> = {
  externo: '<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><path d="M15 3h6v6M10 14L21 3"/>',
  salir: '<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/>',
  mas: '<path d="M12 5v14M5 12h14"/>',
  buscar: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>',
  casa: '<path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
  estrella: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  ojo: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  plano: '<path d="M3 3h18v18H3z"/><path d="M3 12h8v9M11 3v5M15 12h6M15 12v4"/>',
  refrescar: '<path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>',
  imagen: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
  subir: '<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M17 8l-5-5-5 5M12 3v12"/>',
  cerrar: '<path d="M18 6L6 18M6 6l12 12"/>',
  lista: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  archivo: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/>',
  basura: '<path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>',
  guardar: '<path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
  alerta: '<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><path d="M12 9v4M12 17h.01"/>'
}

// Secciones del formulario
const SECCIONES = [
  { id: 'general', label: 'General', icono: 'info' },
  { id: 'ubicacion', label: 'Ubicación', icono: 'pin' },
  { id: 'imagenes', label: 'Imágenes', icono: 'imagen' },
  { id: 'especificaciones', label: 'Especificaciones', icono: 'lista' },
  { id: 'plano', label: 'Plano', icono: 'plano' }
]
const seccionActiva = ref('general')

function irASeccion(id: string) {
  seccionActiva.value = id
  document.getElementById(`sec-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function volverArriba() {
  seccionActiva.value = 'general'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Quita " m²" del final: el panel ya muestra la unidad y la web la agrega
const sinM2 = (v?: string) => (v || '').replace(/\s*m(²|2)\s*$/i, '')

let observadorSecciones: IntersectionObserver | null = null

function observarSecciones() {
  observadorSecciones?.disconnect()
  observadorSecciones = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) seccionActiva.value = visible.target.id.replace('sec-', '')
    },
    { rootMargin: '-120px 0px -60% 0px' }
  )
  SECCIONES.forEach(s => {
    const el = document.getElementById(`sec-${s.id}`)
    if (el) observadorSecciones!.observe(el)
  })
}

onBeforeUnmount(() => observadorSecciones?.disconnect())

// Ubicación (región / comuna / sector)
const COMUNAS_RAPIDAS = [
  ...['Valdivia', 'Corral', 'Panguipulli', 'Los Lagos', 'Mariquina', 'Paillaco', 'La Unión', 'Río Bueno']
    .map(comuna => ({ region: 'Región de Los Ríos', comuna })),
  { region: 'Región de Los Lagos', comuna: 'Osorno' },
  { region: 'Región de Los Lagos', comuna: 'Puerto Montt' },
  { region: 'Región de La Araucanía', comuna: 'Temuco' }
]

const ubicacionPorDefecto = () => ({
  region: REGION_POR_DEFECTO,
  comuna: COMUNA_POR_DEFECTO,
  comunaOtra: '',
  sector: ''
})

const ubic = ref(ubicacionPorDefecto())

const comunasDisponibles = computed(() => comunasDeRegion(ubic.value.region))

function alCambiarRegion() {
  if (!comunasDisponibles.value.includes(ubic.value.comuna) && ubic.value.comuna !== '__otra') {
    ubic.value.comuna = ''
  }
}

function elegirComuna(region: string, comuna: string) {
  ubic.value.region = region
  ubic.value.comuna = comuna
  ubic.value.comunaOtra = ''
}

const ubicacionTexto = computed(() => componerUbicacion({
  ...ubic.value,
  comuna: ubic.value.comuna === '__otra' ? '' : ubic.value.comuna
}))

function cargarUbicacion(texto: string) {
  const partes = separarUbicacion(texto)
  ubic.value = { ...partes, comuna: partes.comuna || '__otra' }
}

// Texto corto para la lista lateral ("Isla Teja, Valdivia")
function comunaCorta(ubicacion?: string) {
  if (!ubicacion) return 'Sin ubicación'
  return ubicacion.split(',').map(p => p.trim()).filter(p => !/^regi[oó]n/i.test(p)).join(', ') || ubicacion
}

// Ambientes sugeridos
const AMBIENTES_SUGERIDOS = [
  'Dorm. Principal', 'Dormitorio 2', 'Dormitorio 3', 'Dormitorio 4', 'Baño principal', 'Baño 2',
  'Living', 'Comedor', 'Living + Comedor', 'Cocina', 'Logia', 'Terraza', 'Quincho', 'Estar', 'Altillo',
  'Walk-in closet', 'Escritorio', 'Hall de acceso', 'Estacionamiento', 'Bodega'
]

// Alternar un valor de selección (clic de nuevo = limpiar)
function alternar(campo: 'cocina_tipo' | 'altillo' | 'walk_in_closet', valor: string) {
  const specs = form.value.especificaciones_tecnicas
  specs[campo] = specs[campo] === valor ? '' : valor
}

const totalAmbientes = computed(() => {
  const nums = form.value.ambientes
    .map(a => parseFloat(String(a.area).replace(',', '.').match(/\d+(\.\d+)?/)?.[0] ?? ''))
  if (!nums.length || nums.some(n => isNaN(n))) return ''
  const total = nums.reduce((acc, n) => acc + n, 0)
  return Number.isInteger(total) ? String(total) : total.toFixed(1)
})

// Guardar desde la barra inferior (valida el formulario)
const formRef = ref<HTMLFormElement | null>(null)

function enviarFormulario() {
  formRef.value?.requestSubmit()
}

// Búsqueda en la lista lateral
const busqueda = ref('')

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
  superficie_terreno: string
  estacionamientos: string
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
  superficie_terreno: '',
  estacionamientos: '',
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
  precio: '',
  status: 'draft',
  // Plano arquitectónico
  plano_imagen: '',
  plano_pdf: '',
  plano_descargable: true,
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
  cargarConfiguracion()
  nextTick(observarSecciones)
})

// Configuración del sitio
const mostrarTerminados = ref(false)
const guardandoConfig = ref(false)
const errorConfig = ref('')

async function cargarConfiguracion() {
  const { data } = await supabase
    .from('configuracion')
    .select('valor')
    .eq('clave', 'mostrar_terminados')
    .maybeSingle()

  mostrarTerminados.value = data?.valor === true
}

async function toggleTerminados(valor: boolean) {
  guardandoConfig.value = true
  errorConfig.value = ''
  const { error } = await supabase
    .from('configuracion')
    .upsert({ clave: 'mostrar_terminados', valor, updated_at: new Date().toISOString() })

  if (error) {
    errorConfig.value = 'No se pudo guardar la configuración'
  } else {
    mostrarTerminados.value = valor
  }
  guardandoConfig.value = false
}

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

const proyectosFiltrados = computed(() => {
  const q = busqueda.value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return proyectos.value.filter(p => {
    if (filtroCategoria.value !== 'todos' && (p.categoria || 'terminado') !== filtroCategoria.value) return false
    if (!q) return true
    const texto = `${p.titulo} ${p.ubicacion ?? ''}`.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    return texto.includes(q)
  })
})

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
  ubic.value = ubicacionPorDefecto()
  mensaje.value = null
  slugManuallyEdited.value = false
  volverArriba()
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
    precio: p.precio || '',
    status: p.status || 'draft',
    // Plano arquitectónico
    plano_imagen: p.plano_imagen || '',
    plano_pdf: p.plano_pdf || '',
    plano_descargable: p.plano_descargable !== false,
    plano_titulo: p.plano_titulo || '',
    plano_subtitulo: p.plano_subtitulo || '',
    ambientes: (p.ambientes || []).map((a: Ambiente) => ({ nombre: a.nombre, area: sinM2(a.area) })),
    especificaciones_tecnicas: {
      superficie_desde: sinM2(p.especificaciones_tecnicas?.superficie_desde),
      superficie_terreno: sinM2(p.especificaciones_tecnicas?.superficie_terreno),
      estacionamientos: p.especificaciones_tecnicas?.estacionamientos || '',
      terraza: sinM2(p.especificaciones_tecnicas?.terraza),
      dormitorios: p.especificaciones_tecnicas?.dormitorios || '',
      banos: p.especificaciones_tecnicas?.banos || '',
      altillo: p.especificaciones_tecnicas?.altillo || '',
      cocina_tipo: p.especificaciones_tecnicas?.cocina_tipo || '',
      walk_in_closet: p.especificaciones_tecnicas?.walk_in_closet || '',
      estructura: p.especificaciones_tecnicas?.estructura || ''
    }
  }
  cargarUbicacion(p.ubicacion || '')
  mensaje.value = null
  volverArriba()
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
    irASeccion('imagenes')
    return
  }

  if (!ubicacionTexto.value || (ubic.value.comuna === '__otra' && !ubic.value.comunaOtra.trim())) {
    mensaje.value = { tipo: 'error', texto: 'Completa la ubicación (región y comuna)' }
    irASeccion('ubicacion')
    return
  }
  form.value.ubicacion = ubicacionTexto.value

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
    precio: form.value.categoria === 'construccion' ? (form.value.precio || null) : null,
    status: form.value.status,
    // Plano arquitectónico
    plano_imagen: form.value.plano_imagen || null,
    plano_pdf: form.value.plano_pdf || null,
    plano_descargable: form.value.plano_descargable,
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
          ? `Proyecto actualizado. <a href="/proyectos/${datos.slug}" target="_blank">Ver proyecto</a>`
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
          ? `Proyecto creado. <a href="/proyectos/${datos.slug}" target="_blank">Ver proyecto</a>`
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
  mensaje.value = { tipo: 'success', texto: 'Proyecto eliminado' }
}

// Los avisos de éxito se ocultan solos
let temporizadorMensaje: ReturnType<typeof setTimeout> | undefined
watch(mensaje, (m) => {
  clearTimeout(temporizadorMensaje)
  if (m?.tipo === 'success') temporizadorMensaje = setTimeout(() => { mensaje.value = null }, 6000)
})

async function logout() {
  await supabase.auth.signOut()
  router.push('/Brian')
}
</script>

<style scoped>
.admin {
  --verde: #2b5f00;
  --verde-hover: #234e00;
  --verde-suave: #eef5e6;
  --tinta: #1c1a17;
  --texto: #2d2a26;
  --suave: #7a746b;
  --borde: #e6e1d8;
  --fondo: #f4f2ee;
  --blanco: #ffffff;
  --rojo: #c0392b;
  --radio: 10px;

  min-height: 100vh;
  background: var(--fondo);
  color: var(--texto);
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 14px;
}

.admin *,
.admin *::before,
.admin *::after {
  box-sizing: border-box;
}

.ic {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* ═══════════ Barra superior ═══════════ */
.topbar {
  position: sticky;
  top: 0;
  z-index: 30;
  height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--tinta);
  color: white;
}

.topbar-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.topbar-logo {
  display: block;
  width: 130px;
  height: auto;
}

.topbar-title {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  padding-left: 14px;
  border-left: 1px solid rgba(255, 255, 255, 0.15);
}

.topbar-title strong {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.topbar-title span {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
}

.topbar-actions {
  display: flex;
  gap: 6px;
}

.topbar-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  font: inherit;
  font-size: 13px;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.topbar-link:hover {
  background: rgba(255, 255, 255, 0.08);
  color: white;
}

.topbar-link .ic {
  width: 16px;
  height: 16px;
}

/* ═══════════ Layout ═══════════ */
.layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  align-items: start;
}

/* ═══════════ Barra lateral ═══════════ */
.sidebar {
  position: sticky;
  top: 64px;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px 16px;
  background: var(--blanco);
  border-right: 1px solid var(--borde);
}

.btn-nuevo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: var(--radio);
  background: var(--verde);
  color: white;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-nuevo:hover {
  background: var(--verde-hover);
}

.buscador {
  position: relative;
}

.buscador .ic {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--suave);
}

.buscador input {
  width: 100%;
  padding: 10px 12px 10px 36px;
  border: 1px solid var(--borde);
  border-radius: var(--radio);
  background: var(--fondo);
  font: inherit;
  color: var(--texto);
}

.buscador input:focus {
  outline: none;
  border-color: var(--verde);
  background: white;
}

.filtros {
  display: flex;
  gap: 4px;
  padding: 4px;
  background: var(--fondo);
  border-radius: var(--radio);
}

.filtro {
  flex: 1;
  padding: 7px 4px;
  white-space: nowrap;
  border: none;
  border-radius: 7px;
  background: transparent;
  color: var(--suave);
  font: inherit;
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
}

.filtro.active {
  background: white;
  color: var(--tinta);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.filtro-count {
  margin-left: 2px;
  color: var(--suave);
  font-weight: 500;
}

.lista {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0 -6px;
  padding: 0 6px;
}

.item {
  display: flex;
  gap: 12px;
  width: 100%;
  padding: 8px;
  border: 1px solid transparent;
  border-radius: var(--radio);
  background: transparent;
  font: inherit;
  text-align: left;
  color: inherit;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}

.item:hover {
  background: var(--fondo);
}

.item.active {
  background: var(--verde-suave);
  border-color: rgba(43, 95, 0, 0.25);
}

.item-thumb {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  background: var(--fondo);
  color: var(--suave);
}

.item-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-body {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.item-titulo {
  font-weight: 700;
  color: var(--tinta);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-meta {
  font-size: 12px;
  color: var(--suave);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-tags {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 2px;
}

.tag {
  padding: 2px 7px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.tag-terminado { background: #e8eef9; color: #2f4f8a; }
.tag-render { background: #fbeedd; color: #9a5a00; }
.tag-publicado { background: var(--verde-suave); color: var(--verde); }
.tag-borrador { background: #efede9; color: var(--suave); }

.ic-estrella {
  width: 14px;
  height: 14px;
  color: #d9a400;
  fill: #d9a400;
}

.lista-vacia {
  padding: 30px 10px;
  text-align: center;
  color: var(--suave);
  font-size: 13px;
}

.config-sitio {
  padding: 14px;
  border: 1px solid var(--borde);
  border-radius: var(--radio);
  background: var(--fondo);
}

.config-titulo {
  display: block;
  margin-bottom: 10px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--suave);
}

.switch-field {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
}

.switch-field input {
  display: none;
}

.switch {
  position: relative;
  flex-shrink: 0;
  width: 36px;
  height: 20px;
  border-radius: 10px;
  background: #cfcac1;
  transition: background 0.2s;
}

.switch::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  transition: transform 0.2s;
}

.switch-field input:checked + .switch { background: var(--verde); }
.switch-field input:checked + .switch::after { transform: translateX(16px); }
.switch-field input:disabled + .switch { opacity: 0.5; }

.switch-label {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 13px;
  font-weight: 600;
  color: var(--tinta);
}

.switch-label small {
  font-size: 11px;
  font-weight: 400;
  color: var(--suave);
}

.config-error {
  margin-top: 8px;
  font-size: 12px;
  color: var(--rojo);
}

/* ═══════════ Formulario ═══════════ */
.main {
  min-width: 0;
  padding: 28px 36px 0;
}

.form {
  max-width: 960px;
  margin: 0 auto;
}

.form-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.form-kicker {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--verde);
}

.form-title {
  margin: 4px 0 6px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 34px;
  font-weight: 800;
  line-height: 1.05;
  text-transform: uppercase;
  color: var(--tinta);
}

.form-sub {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--suave);
}

.form-sub .ic {
  width: 15px;
  height: 15px;
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid var(--borde);
  border-radius: var(--radio);
  background: white;
  color: var(--tinta);
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
}

.btn-ghost:hover {
  border-color: var(--verde);
  color: var(--verde);
}

/* Navegación de secciones */
.secciones {
  position: sticky;
  top: 64px;
  z-index: 10;
  display: flex;
  gap: 4px;
  margin: 0 -8px 20px;
  padding: 10px 8px;
  overflow-x: auto;
  background: var(--fondo);
}

.seccion-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  color: var(--suave);
  font: inherit;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
}

.seccion-link .ic {
  width: 15px;
  height: 15px;
}

.seccion-link:hover {
  color: var(--tinta);
}

.seccion-link.active {
  background: white;
  border-color: var(--borde);
  color: var(--verde);
}

/* Tarjetas */
.card {
  scroll-margin-top: 130px;
  margin-bottom: 20px;
  padding: 24px 26px 8px;
  border: 1px solid var(--borde);
  border-radius: 14px;
  background: white;
}

.card-head {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 22px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--borde);
}

.card-head > .ic {
  width: 38px;
  height: 38px;
  padding: 9px;
  border-radius: 10px;
  background: var(--verde-suave);
  color: var(--verde);
}

.card-head h2 {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  color: var(--tinta);
}

.card-head p {
  margin: 3px 0 0;
  font-size: 13px;
  color: var(--suave);
}

/* Campos */
.grid-2, .grid-3, .grid-4 {
  display: grid;
  gap: 0 16px;
}
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }

.field {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-bottom: 18px;
  min-width: 0;
}

.field > label {
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-size: 12px;
  font-weight: 700;
  color: var(--texto);
}

.field > label em {
  font-style: normal;
  color: var(--rojo);
}

.contador {
  margin-left: auto;
  font-size: 11px;
  font-weight: 500;
  color: var(--suave);
}

.ayuda {
  font-size: 12px;
  color: var(--suave);
}

.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 11px 13px;
  border: 1px solid var(--borde);
  border-radius: 8px;
  background: white;
  font: inherit;
  color: var(--tinta);
  transition: border-color 0.15s, box-shadow 0.15s;
}

.field textarea {
  resize: vertical;
  line-height: 1.5;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--verde);
  box-shadow: 0 0 0 3px rgba(43, 95, 0, 0.12);
}

.input-grupo {
  display: flex;
  align-items: stretch;
  border: 1px solid var(--borde);
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.input-grupo:focus-within {
  border-color: var(--verde);
  box-shadow: 0 0 0 3px rgba(43, 95, 0, 0.12);
}

.field .input-grupo input {
  flex: 1;
  min-width: 0;
  border: none;
  border-radius: 0;
  box-shadow: none;
}

.input-prefijo,
.input-sufijo {
  display: flex;
  align-items: center;
  padding: 0 11px;
  background: var(--fondo);
  color: var(--suave);
  font-size: 13px;
  white-space: nowrap;
}

.input-accion {
  display: flex;
  align-items: center;
  padding: 0 12px;
  border: none;
  border-left: 1px solid var(--borde);
  background: var(--fondo);
  color: var(--suave);
  cursor: pointer;
}

.input-accion:hover {
  color: var(--verde);
}

.input-accion .ic {
  width: 15px;
  height: 15px;
}

/* Opciones de categoría */
.opciones-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.opcion {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 2px solid var(--borde);
  border-radius: var(--radio);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}

.opcion input {
  display: none;
}

.opcion > .ic {
  width: 34px;
  height: 34px;
  padding: 8px;
  border-radius: 8px;
  background: var(--fondo);
  color: var(--suave);
}

.opcion span {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.opcion strong {
  font-size: 14px;
  color: var(--tinta);
}

.opcion small {
  font-size: 12px;
  color: var(--suave);
}

.opcion.active {
  border-color: var(--verde);
  background: var(--verde-suave);
}

.opcion.active > .ic {
  background: var(--verde);
  color: white;
}

/* Segmentos (Sí / No / ...) */
.segmentos {
  display: flex;
  padding: 3px;
  border: 1px solid var(--borde);
  border-radius: 8px;
  background: var(--fondo);
}

.segmentos button {
  flex: 1;
  padding: 8px 10px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--suave);
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.segmentos button.active {
  background: white;
  color: var(--verde);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.segmentos.compacto {
  width: fit-content;
}

.segmentos.compacto button {
  flex: none;
  padding: 7px 16px;
}

.fila-toggle {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  border: 1px solid var(--borde);
  border-radius: var(--radio);
  background: var(--fondo);
}

.fila-toggle > div:first-child {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.fila-toggle label {
  font-size: 13px;
  font-weight: 700;
}

/* Ubicación */
.comunas-rapidas {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
}

.comunas-rapidas > span {
  margin-right: 4px;
  font-size: 12px;
  color: var(--suave);
}

.chip {
  padding: 5px 11px;
  border: 1px solid var(--borde);
  border-radius: 999px;
  background: white;
  color: var(--texto);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}

.chip:hover {
  border-color: var(--verde);
}

.chip.active {
  border-color: var(--verde);
  background: var(--verde);
  color: white;
}

.ubicacion-preview {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  padding: 12px 14px;
  border-radius: var(--radio);
  background: var(--verde-suave);
  color: var(--verde);
  font-size: 13px;
}

.ubicacion-preview strong {
  color: var(--tinta);
}

/* Subida de archivos */
.dropzone {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  border: 2px dashed var(--borde);
  border-radius: var(--radio);
  background: var(--fondo);
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.15s;
}

.dropzone:hover {
  border-color: var(--verde);
}

.dropzone.filled {
  border-style: solid;
}

.dropzone.small {
  min-height: 160px;
}

.dropzone-img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  display: block;
}

.dropzone.small .dropzone-img {
  height: 160px;
}

.dropzone-img.contain {
  object-fit: contain;
  background: white;
}

.dropzone-vacio {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 20px;
  text-align: center;
  color: var(--suave);
}

.dropzone-vacio .ic {
  width: 28px;
  height: 28px;
  color: var(--verde);
}

.dropzone-vacio strong {
  color: var(--tinta);
}

.dropzone-cambiar {
  position: absolute;
  right: 12px;
  bottom: 12px;
  padding: 7px 12px;
  border-radius: 6px;
  background: rgba(28, 26, 23, 0.8);
  color: white;
  font-size: 12px;
  font-weight: 600;
}

.dropzone-archivo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;
  color: var(--verde);
  font-size: 12px;
  word-break: break-all;
  text-align: center;
}

.dropzone-archivo .ic {
  width: 34px;
  height: 34px;
}

.dropzone-quitar {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: rgba(28, 26, 23, 0.75);
  color: white;
  cursor: pointer;
}

.dropzone-quitar .ic {
  width: 14px;
  height: 14px;
}

.subiendo {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.85);
  font-weight: 600;
  color: var(--verde);
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: girar 0.7s linear infinite;
}

@keyframes girar {
  to { transform: rotate(360deg); }
}

/* Galería */
.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
}

.galeria-item {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: 8px;
  overflow: hidden;
  background: var(--fondo);
}

.galeria-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.galeria-quitar {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: rgba(28, 26, 23, 0.75);
  color: white;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s;
}

.galeria-item:hover .galeria-quitar {
  opacity: 1;
}

.galeria-quitar .ic {
  width: 12px;
  height: 12px;
}

.galeria-agregar {
  aspect-ratio: 4 / 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: 2px dashed var(--borde);
  border-radius: 8px;
  background: var(--fondo);
  color: var(--verde);
  font: inherit;
  cursor: pointer;
}

.galeria-agregar:hover {
  border-color: var(--verde);
}

.galeria-agregar small {
  font-size: 12px;
  font-weight: 600;
}

/* Ambientes */
.ambientes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ambiente {
  display: grid;
  grid-template-columns: 34px 1fr 140px 36px;
  align-items: center;
  gap: 10px;
}

.ambiente-num {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: var(--verde);
  text-align: center;
}

.btn-icono {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--borde);
  border-radius: 8px;
  background: white;
  color: var(--suave);
  cursor: pointer;
}

.btn-icono:hover {
  border-color: var(--rojo);
  color: var(--rojo);
}

.btn-icono .ic {
  width: 14px;
  height: 14px;
}

.btn-agregar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px;
  border: 1px dashed var(--borde);
  border-radius: 8px;
  background: var(--fondo);
  color: var(--verde);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.btn-agregar:hover {
  border-color: var(--verde);
}

.espaciador {
  height: 100px;
}

/* ═══════════ Barra de guardado ═══════════ */
.savebar {
  position: sticky;
  bottom: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  max-width: 1032px;
  margin: 0 auto;
  padding: 14px 36px;
  border-top: 1px solid var(--borde);
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
  box-shadow: 0 -6px 20px rgba(0, 0, 0, 0.05);
}

.savebar-opciones,
.savebar-acciones {
  display: flex;
  align-items: center;
  gap: 14px;
}

.segmentos.estado button.active {
  color: var(--verde);
}

.check-destacado {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 12px;
  border: 1px solid var(--borde);
  border-radius: 8px;
  font-weight: 600;
  color: var(--suave);
  cursor: pointer;
}

.check-destacado input {
  display: none;
}

.check-destacado .ic {
  width: 16px;
  height: 16px;
}

.check-destacado:has(input:checked) {
  border-color: #e7c35a;
  background: #fdf6df;
  color: #8a6a00;
}

.check-destacado:has(input:checked) .ic {
  fill: #d9a400;
  color: #d9a400;
}

.btn-eliminar {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 11px 16px;
  border: 1px solid transparent;
  border-radius: var(--radio);
  background: transparent;
  color: var(--rojo);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.btn-eliminar:hover {
  border-color: #f0c6c0;
  background: #fdf1ef;
}

.btn-eliminar .ic {
  width: 16px;
  height: 16px;
}

.btn-guardar {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 12px 22px;
  border: none;
  border-radius: var(--radio);
  background: var(--verde);
  color: white;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-guardar:hover:not(:disabled) {
  background: var(--verde-hover);
}

.btn-guardar:disabled {
  opacity: 0.7;
  cursor: wait;
}

.btn-guardar .ic {
  width: 16px;
  height: 16px;
}

/* Aviso */
.toast {
  position: fixed;
  right: 24px;
  bottom: 90px;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 420px;
  padding: 14px 14px 14px 16px;
  border-radius: var(--radio);
  background: var(--tinta);
  color: white;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  font-size: 13px;
}

.toast.success > .ic { color: #86d95a; }
.toast.error { background: #7a1f16; }

.toast :deep(a) {
  color: #86d95a;
  font-weight: 700;
}

.toast-cerrar {
  display: flex;
  margin-left: 4px;
  padding: 4px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
}

.toast-cerrar .ic {
  width: 14px;
  height: 14px;
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* ═══════════ Responsive ═══════════ */
@media (max-width: 1100px) {
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 860px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
    height: auto;
    max-height: 420px;
    border-right: none;
    border-bottom: 1px solid var(--borde);
  }

  .main {
    padding: 20px 16px 0;
  }

  .topbar {
    padding: 0 12px;
  }

  .topbar-logo {
    width: 96px;
  }

  .topbar-title {
    display: none;
  }

  .topbar-link span {
    display: none;
  }

  .grid-2, .grid-3, .grid-4, .opciones-2 {
    grid-template-columns: 1fr;
  }

  .form-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .ambiente {
    grid-template-columns: 26px 1fr 96px 36px;
    gap: 6px;
  }

  .savebar {
    flex-direction: column;
    align-items: stretch;
    padding: 12px 16px;
  }

  .savebar-opciones,
  .savebar-acciones {
    justify-content: space-between;
  }

  .toast {
    left: 16px;
    right: 16px;
    bottom: 150px;
  }
}
</style>

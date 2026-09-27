<template>
  <div v-if="proyecto" class="proyecto-page">
    <!-- ═══════════════════════════════════════
         HERO SECTION
         ═══════════════════════════════════════ -->
    <section class="hero">
      <div class="hero-bg">
        <NuxtImg
          :src="proyecto.imagen_portada.startsWith('http') ? proyecto.imagen_portada : imgUrl(proyecto.imagen_portada)"
          :alt="altProyecto(proyecto, 'fachada')"
          class="hero-img"
          loading="eager"
        />
        <div class="hero-overlay"></div>
        <div class="hero-grain"></div>
      </div>

      <!-- Navigation back -->
      <NuxtLink to="/proyectos" class="hero-back">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Volver a proyectos</span>
      </NuxtLink>

      <!-- Hero content -->
      <div class="hero-content">
        <!-- Eyebrow: línea que crece + textos que suben uno a uno -->
        <div class="hero-eyebrow">
          <span class="eyebrow-line"></span>
          <template v-for="(item, i) in heroEyebrow" :key="item.text">
            <svg v-if="i > 0" class="eyebrow-sep" :style="{ '--d': `${0.5 + i * 0.15}s` }" viewBox="0 0 8 8" aria-hidden="true">
              <rect x="1.5" y="1.5" width="5" height="5" transform="rotate(45 4 4)" fill="currentColor" />
            </svg>
            <span class="eyebrow-mask">
              <span :class="['eyebrow-text', { accent: item.accent }]" :style="{ '--d': `${0.45 + i * 0.15}s` }">
                {{ item.text }}
              </span>
            </span>
          </template>
        </div>

        <h1 class="hero-title">
          <span v-for="(word, i) in tituloWords" :key="i" class="title-word" :style="{ '--delay': `${i * 0.1}s` }">
            {{ word }}
          </span>
        </h1>

        <p v-if="proyecto.subtitulo" class="hero-subtitle">{{ proyecto.subtitulo }}</p>

        <!-- Stats bar -->
        <div class="stats-bar">
          <template v-for="(st, i) in heroStats" :key="st.label">
            <div v-if="i > 0" class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-value">{{ st.value }}</span>
              <span class="stat-label">{{ st.label }}</span>
            </div>
          </template>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="scroll-indicator">
        <span>Explorar</span>
        <div class="scroll-line"></div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         ABOUT SECTION
         ═══════════════════════════════════════ -->
    <section class="about reveal">
      <div class="about-container">
        <div class="about-header">
          <div class="section-tag">
            <div class="tag-line"></div>
            <span>Sobre el proyecto</span>
          </div>
          <h2 class="about-title">{{ proyecto.titulo }}</h2>
        </div>

        <div class="about-content">
          <div class="about-text">
            <BlockEditor v-if="proyecto.descripcion_completa" :content="proyecto.descripcion_completa" />
            <p v-else class="desc-paragraph">{{ proyecto.descripcion }}</p>
          </div>

          <!-- Specs card -->
          <aside class="specs-card">
            <div class="specs-header">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Especificaciones</span>
            </div>

            <!-- Superficie destacada -->
            <div v-if="superficieDisplay" class="specs-highlight">
              <span class="highlight-value">{{ superficieDisplay }}</span>
              <span class="highlight-label">Superficie construida{{ proyecto.especificaciones_tecnicas?.superficie_desde ? ' desde' : '' }}</span>
            </div>

            <div v-if="specItems.length" class="specs-grid">
              <div v-for="item in specItems" :key="item.key" class="spec-item">
                <div class="spec-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    v-html="SPEC_ICONS[item.icon]"
                  />
                </div>
                <div class="spec-info">
                  <span class="spec-value">{{ item.value }}</span>
                  <span class="spec-label">{{ item.label }}</span>
                </div>
              </div>
            </div>

            <!-- Ficha técnica -->
            <div class="tech-sheet">
              <div class="tech-row">
                <span class="tech-label">Proyecto</span>
                <span class="tech-value">{{ proyecto.categoria === 'construccion' ? 'Para construir' : 'Terminado' }}</span>
              </div>
              <div class="tech-row">
                <span class="tech-label">Tipo</span>
                <span class="tech-value">{{ tipoLabel }}</span>
              </div>
              <div v-if="proyecto.anio" class="tech-row">
                <span class="tech-label">Año</span>
                <span class="tech-value">{{ proyecto.anio }}</span>
              </div>
              <div v-if="proyecto.ubicacion" class="tech-row">
                <span class="tech-label">Ubicación</span>
                <span class="tech-value">{{ proyecto.ubicacion }}</span>
              </div>
              <div v-if="proyecto.cliente" class="tech-row">
                <span class="tech-label">Cliente</span>
                <span class="tech-value">{{ proyecto.cliente }}</span>
              </div>
              <div v-if="proyecto.inicio_obra" class="tech-row">
                <span class="tech-label">Inicio obra</span>
                <span class="tech-value">{{ proyecto.inicio_obra }}</span>
              </div>
              <div v-if="proyecto.entrega" class="tech-row">
                <span class="tech-label">Entrega</span>
                <span class="tech-value">{{ proyecto.entrega }}</span>
              </div>
            </div>

            <div v-if="proyecto.precio" class="specs-price">
              <span class="price-label">Precio desde</span>
              <span class="price-value">{{ proyecto.precio }}</span>
            </div>

            <!-- CTA -->
            <NuxtLink to="/contacto" class="specs-cta">
              <span>Solicitar información</span>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </NuxtLink>
          </aside>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         FLOOR PLAN SECTION
         ═══════════════════════════════════════ -->
    <section v-if="proyecto.plano_imagen || hasAmbientes" class="floorplan reveal">
      <div class="floorplan-container">
        <!-- Izquierda: plano -->
        <div v-if="proyecto.plano_imagen" class="floorplan-visual">
          <a
            :href="imgUrl(proyecto.plano_imagen)"
            target="_blank"
            rel="noopener"
            class="blueprint"
            title="Ver plano en tamaño completo"
          >
            <span class="bp-corner tl"></span>
            <span class="bp-corner tr"></span>
            <span class="bp-corner bl"></span>
            <span class="bp-corner br"></span>
            <NuxtImg
              :src="imgUrl(proyecto.plano_imagen)"
              :alt="`Plano de planta: ${altProyecto(proyecto)}`"
              class="floorplan-image"
              loading="lazy"
            />
            <span class="bp-zoom">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
              </svg>
            </span>
          </a>
          <div class="bp-caption">
            <span>Planta de arquitectura</span>
            <span>{{ proyecto.titulo }}</span>
            <span>Imagen referencial</span>
          </div>
        </div>

        <!-- Derecha: distribución -->
        <div class="floorplan-info">
          <div class="floorplan-header">
            <div class="section-tag light">
              <div class="tag-line"></div>
              <span>{{ proyecto.plano_subtitulo || 'Distribución' }}</span>
            </div>
            <h2 class="floorplan-title">
              {{ proyecto.plano_titulo || 'El plano que define el hogar' }}
            </h2>
          </div>

          <!-- Resumen del plano -->
          <div v-if="planoResumen.length" class="plan-summary">
            <div v-for="r in planoResumen" :key="r.label" class="summary-item">
              <span class="summary-value">{{ r.value }}</span>
              <span class="summary-label">{{ r.label }}</span>
            </div>
          </div>

          <!-- Ambientes -->
          <div v-if="hasAmbientes" class="ambientes">
            <div class="ambientes-head">
              <span>Ambientes</span>
              <span>{{ ambientesDisplay.length }} espacios</span>
            </div>

            <ol class="ambientes-list">
              <li v-for="(amb, i) in ambientesDisplay" :key="i" class="ambiente-row">
                <span class="amb-num">{{ String(i + 1).padStart(2, '0') }}</span>
                <div class="amb-body">
                  <div class="amb-line">
                    <span class="amb-nombre">{{ amb.nombre }}</span>
                    <span class="amb-dots"></span>
                    <span class="amb-area">{{ amb.area }}</span>
                  </div>
                  <div v-if="amb.pct" class="amb-bar"><span :style="{ width: `${amb.pct}%` }"></span></div>
                </div>
              </li>
            </ol>

            <div v-if="totalAmbientes" class="ambientes-total">
              <span>Total ambientes detallados</span>
              <span>{{ totalAmbientes }}</span>
            </div>
          </div>

          <!-- Descargar plano (se activa desde el panel) -->
          <a
            v-if="planoDescarga"
            :href="planoDescarga.url"
            target="_blank"
            rel="noopener"
            download
            class="btn-download-plan"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <polyline points="7,10 12,15 17,10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Descargar plano {{ planoDescarga.tipo }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         GALLERY SECTION
         ═══════════════════════════════════════ -->
    <section v-if="galeriaUrls.length" class="gallery reveal">
      <div class="gallery-container">
        <div class="section-tag">
          <div class="tag-line"></div>
          <span>Galería del proyecto</span>
        </div>
        <h2 class="gallery-title">Imágenes</h2>

        <div class="gallery-grid">
          <div
            v-for="(url, i) in galeriaUrls"
            :key="i"
            :class="['gallery-item', getGalleryClass(i)]"
            @click="openLightbox(i)"
          >
            <NuxtImg
              :src="url"
              :alt="altProyecto(proyecto, `imagen ${i + 1} de ${galeriaUrls.length}`)"
              class="gallery-img"
              loading="lazy"
            />
            <div class="gallery-overlay">
              <div class="gallery-zoom">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M11 8v6M8 11h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         CTA SECTION
         ═══════════════════════════════════════ -->
    <section class="cta-section reveal">
      <div class="cta-container">
        <div class="cta-content">
          <h2 class="cta-title">
            ¿Te interesa un proyecto<br>
            <span class="cta-accent">como este?</span>
          </h2>
          <p class="cta-text">
            Conversemos sobre tu próximo proyecto. Nuestro equipo está listo para asesorarte.
          </p>
          <div class="cta-buttons">
            <NuxtLink to="/contacto" class="btn btn-primary">
              <span>Contactar ahora</span>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </NuxtLink>
            <a :href="whatsappLink" target="_blank" rel="noopener" class="btn btn-whatsapp">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
        <div class="cta-decoration">
          <div class="decoration-ring"></div>
          <div class="decoration-ring delay"></div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         LIGHTBOX
         ═══════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div v-if="lbVisible" class="lightbox" @click.self="closeLightbox">
          <button class="lb-close" @click="closeLightbox" aria-label="Cerrar">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>

          <div class="lb-content">
            <button class="lb-arrow lb-prev" @click.stop="lbPrev" aria-label="Anterior">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <div class="lb-image-container">
              <NuxtImg
                :src="galeriaUrls[lbIndex]"
                :alt="altProyecto(proyecto, `imagen ${lbIndex + 1} de ${galeriaUrls.length}`)"
                class="lb-image"
              />
            </div>

            <button class="lb-arrow lb-next" @click.stop="lbNext" aria-label="Siguiente">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <div class="lb-footer">
            <div class="lb-counter">{{ lbIndex + 1 }} / {{ galeriaUrls.length }}</div>
            <div class="lb-thumbs">
              <button
                v-for="(url, i) in galeriaUrls"
                :key="i"
                :class="['lb-thumb', { active: i === lbIndex }]"
                @click.stop="lbIndex = i"
              >
                <NuxtImg :src="url" :alt="`Miniatura ${i + 1} de ${proyecto.titulo}`" />
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>

  <!-- ═══════════════════════════════════════
       NOT FOUND
       ═══════════════════════════════════════ -->
  <div v-else class="not-found">
    <div class="not-found-content">
      <div class="not-found-icon">
        <svg viewBox="0 0 64 64" fill="none">
          <rect x="8" y="16" width="48" height="40" rx="4" stroke="currentColor" stroke-width="2"/>
          <path d="M8 28h48" stroke="currentColor" stroke-width="2"/>
          <circle cx="32" cy="42" r="8" stroke="currentColor" stroke-width="2"/>
          <path d="M29 42l6 0M32 39v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <h1>Proyecto no encontrado</h1>
      <p>El proyecto que buscas no existe o fue eliminado.</p>
      <NuxtLink to="/proyectos" class="btn btn-primary">
        <span>Ver todos los proyectos</span>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { imgUrl, getProyecto } = useProyectos()

const { data: proyecto } = await useAsyncData(
  `proyecto-${route.params.slug}`,
  () => getProyecto(route.params.slug as string)
)

// SEO
// SEO: título con intención de búsqueda (tipo de casa + atributos + comuna)
usePaginaSeo(() => {
  const p = proyecto.value
  if (!p) {
    return { titulo: 'Proyecto no encontrado | R&J Constructora', descripcion: 'El proyecto que buscas no existe o ya no está disponible.', noindex: true }
  }
  const e = p.especificaciones_tecnicas || {}
  const comuna = (p.ubicacion || '').split(',').map(s => s.trim()).filter(s => !/^regi[oó]n/i.test(s)).pop()
  const atributos = [
    e.superficie_desde ? conM2(e.superficie_desde) : '',
    e.dormitorios ? `${e.dormitorios} dormitorios` : ''
  ].filter(Boolean).join(', ')
  const prefijo = p.categoria === 'construccion' ? 'Modelo de casa' : 'Casa'
  let titulo = `${prefijo} ${p.titulo}${atributos ? ` (${atributos})` : ''}${comuna ? ` en ${comuna}` : ''} | R&J`
  if (titulo.length > 65) titulo = `${prefijo} ${p.titulo}${comuna ? ` en ${comuna}` : ''} | R&J`
  // Descripción: resumen de atributos + texto del proyecto + precio
  const banos = e.banos || p.banos
  const resumen = [
    e.superficie_desde ? conM2(e.superficie_desde) : '',
    e.dormitorios ? `${e.dormitorios} dormitorios` : '',
    banos ? `${banos} baños` : ''
  ].filter(Boolean).join(', ')
  const intro = `${prefijo} ${p.titulo}${resumen ? ` de ${resumen}` : ''}${comuna ? ` en ${comuna}` : ''}.`
  const precio = p.precio ? ` Desde ${p.precio}.` : ''
  let descripcion = `${intro} ${p.descripcion.replace(/\.?\s*$/, '.')}${precio}`
  if (descripcion.length > 160) descripcion = `${descripcion.slice(0, 157).replace(/\s+\S*$/, '')}…`
  return {
    titulo,
    descripcion,
    ruta: `/proyectos/${p.slug}`,
    imagen: imgUrl(p.imagen_portada)
  }
})

useSchema(() => proyecto.value
  ? schemaMigas([
      { nombre: 'Inicio', ruta: '/' },
      { nombre: proyecto.value.categoria === 'construccion' ? 'Modelos de casas' : 'Proyectos', ruta: '/proyectos' },
      { nombre: proyecto.value.titulo, ruta: `/proyectos/${proyecto.value.slug}` }
    ])
  : null)

// Computed
const heroEyebrow = computed(() => {
  const p = proyecto.value
  if (!p) return []
  return [
    { text: p.categoria === 'construccion' ? 'Proyecto para construir' : 'Proyecto terminado', accent: true },
    { text: tipoLabel.value ?? '', accent: false },
    { text: String(p.anio ?? ''), accent: false }
  ].filter(i => i.text)
})

const tituloWords = computed(() => proyecto.value?.titulo?.split(' ') ?? [])

const tipoLabel = computed(() => {
  const tipos: Record<string, string> = {
    residencial: 'Residencial',
    comercial: 'Comercial',
    industrial: 'Industrial',
    remodelacion: 'Remodelación'
  }
  return tipos[proyecto.value?.tipo ?? ''] ?? proyecto.value?.tipo
})

const galeriaUrls = computed(() => {
  const items = proyecto.value?.galeria ?? []
  return items.map((fileName: string) => imgUrl(fileName)).filter(Boolean)
})

const whatsappLink = computed(() => {
  const message = encodeURIComponent(`Hola, me interesa obtener información sobre el proyecto "${proyecto.value?.titulo}". ¿Podrían ayudarme?`)
  return `https://wa.me/56959266213?text=${message}`
})

// ── Especificaciones ──
const specs = computed(() => proyecto.value?.especificaciones_tecnicas ?? {})

const superficieDisplay = computed(() =>
  conM2(specs.value.superficie_desde || proyecto.value?.area || proyecto.value?.superficie)
)

// Íconos (trazos SVG 24x24)
const SPEC_ICONS: Record<string, string> = {
  bed: '<path d="M3 20v-8a2 2 0 012-2h14a2 2 0 012 2v8"/><path d="M3 16h18"/><path d="M6 10V6a1 1 0 011-1h4a1 1 0 011 1v4"/><path d="M3 20v1M21 20v1"/>',
  bath: '<path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1z"/><path d="M6 12V5a2 2 0 012-2h1"/>',
  floors: '<path d="M3 21h18M5 21V7l7-4 7 4v14"/><path d="M5 14h14"/>',
  terrace: '<path d="M3 11l9-6 9 6"/><path d="M5 11v9M19 11v9M3 20h18"/><path d="M9 20v-5h6v5"/>',
  car: '<rect x="3" y="8" width="18" height="10" rx="2"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/><path d="M5 8l2-4h10l2 4"/>',
  attic: '<path d="M2 12l10-9 10 9"/><path d="M5 10v11h14V10"/><path d="M9 12h6v4H9z"/>',
  closet: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 3v18M10 12h.01M14 12h.01"/>',
  kitchen: '<path d="M4 21V10h16v11"/><path d="M2 10h20"/><path d="M8 6c0-1.5 1-3 1-3M12 6c0-1.5 1-3 1-3M16 6c0-1.5 1-3 1-3"/>',
  structure: '<path d="M3 21h18M4 21V9l8-6 8 6v12"/><path d="M4 9l16 12M20 9L4 21"/>',
  land: '<path d="M3 17l6-6 4 4 8-8"/><path d="M3 21h18"/>',
  yard: '<path d="M12 22v-7"/><path d="M12 15a5 5 0 100-10 5 5 0 000 10z"/><path d="M4 22h16"/>'
}

interface SpecItem { key: string; label: string; value: string; icon: string }

const specItems = computed<SpecItem[]>(() => {
  const p = proyecto.value
  if (!p) return []
  const e = specs.value
  const items: (SpecItem | null)[] = [
    { key: 'dormitorios', label: 'Dormitorios', icon: 'bed', value: e.dormitorios || p.habitaciones || '' },
    { key: 'banos', label: 'Baños', icon: 'bath', value: e.banos || p.banos || '' },
    { key: 'pisos', label: 'Pisos', icon: 'floors', value: p.pisos || '' },
    { key: 'terraza', label: 'Terraza', icon: 'terrace', value: conM2(e.terraza) },
    { key: 'estacionamientos', label: 'Estacionamientos', icon: 'car', value: e.estacionamientos || p.estacionamiento || '' },
    { key: 'altillo', label: 'Altillo', icon: 'attic', value: e.altillo || '' },
    { key: 'walk_in_closet', label: 'Walk-in closet', icon: 'closet', value: e.walk_in_closet || '' },
    { key: 'cocina_tipo', label: 'Cocina', icon: 'kitchen', value: e.cocina_tipo || '' },
    { key: 'estructura', label: 'Estructura', icon: 'structure', value: e.estructura || p.estructura || '' },
    { key: 'superficie_terreno', label: 'Terreno', icon: 'land', value: conM2(e.superficie_terreno) },
    { key: 'patio_trasero', label: 'Patio', icon: 'yard', value: conM2(p.patio_trasero) }
  ]
  return items.filter((i): i is SpecItem => !!i && !!String(i.value).trim())
})

// Datos rápidos del hero
const heroStats = computed(() => {
  const stats: { label: string; value: string }[] = []
  if (superficieDisplay.value) stats.push({ label: 'Superficie', value: superficieDisplay.value })
  const dorm = specs.value.dormitorios || proyecto.value?.habitaciones
  const banos = specs.value.banos || proyecto.value?.banos
  if (dorm) stats.push({ label: 'Dorm. / Baños', value: `${dorm} / ${banos || '—'}` })
  if (proyecto.value?.ubicacion) stats.push({ label: 'Ubicación', value: proyecto.value.ubicacion })
  return stats
})

// ── Plano ──
const hasAmbientes = computed(() => !!proyecto.value?.ambientes?.length)

// Número de un área escrita como "22 m²", "22,5", "22.5 m2"
function areaNum(area?: string): number | null {
  if (!area) return null
  const m = String(area).replace(',', '.').match(/\d+(\.\d+)?/)
  return m ? parseFloat(m[0]) : null
}

const ambientesDisplay = computed(() => {
  const list = proyecto.value?.ambientes ?? []
  const max = Math.max(0, ...list.map(a => areaNum(a.area) ?? 0))
  return list.map(a => {
    const n = areaNum(a.area)
    return {
      nombre: a.nombre,
      area: conM2(a.area),
      pct: n && max ? Math.max(6, Math.round((n / max) * 100)) : 0
    }
  })
})

const totalAmbientes = computed(() => {
  const list = proyecto.value?.ambientes ?? []
  if (list.length < 2) return ''
  const nums = list.map(a => areaNum(a.area))
  if (nums.some(n => n === null)) return ''
  const total = (nums as number[]).reduce((acc, n) => acc + n, 0)
  return `${Number.isInteger(total) ? total : total.toFixed(1)} m²`
})

const planoResumen = computed(() => {
  const r: { label: string; value: string }[] = []
  if (superficieDisplay.value) r.push({ label: 'Sup. construida', value: superficieDisplay.value })
  if (specs.value.terraza) r.push({ label: 'Terraza', value: conM2(specs.value.terraza) })
  const dorm = specs.value.dormitorios || proyecto.value?.habitaciones
  if (dorm) r.push({ label: 'Dormitorios', value: String(dorm) })
  const banos = specs.value.banos || proyecto.value?.banos
  if (banos) r.push({ label: 'Baños', value: String(banos) })
  return r
})

// Descarga habilitada desde el panel (plano_descargable); PDF o, si no hay, la imagen
const planoDescarga = computed(() => {
  const p = proyecto.value
  if (!p || p.plano_descargable === false) return null
  if (p.plano_pdf) return { url: imgUrl(p.plano_pdf), tipo: '(PDF)' }
  if (p.plano_imagen) return { url: imgUrl(p.plano_imagen), tipo: '' }
  return null
})

// Gallery class for asymmetric grid
function getGalleryClass(index: number): string {
  const pattern = ['wide', 'tall', 'normal', 'normal', 'tall', 'wide', 'normal', 'normal']
  return pattern[index % pattern.length]
}

// Lightbox
const lbVisible = ref(false)
const lbIndex = ref(0)

function openLightbox(index: number) {
  lbIndex.value = index
  lbVisible.value = true
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lbVisible.value = false
  document.body.style.overflow = ''
}

function lbPrev() {
  lbIndex.value = (lbIndex.value - 1 + galeriaUrls.value.length) % galeriaUrls.value.length
}

function lbNext() {
  lbIndex.value = (lbIndex.value + 1) % galeriaUrls.value.length
}

// Keyboard navigation
function handleKeydown(e: KeyboardEvent) {
  if (!lbVisible.value) return
  if (e.key === 'ArrowLeft') lbPrev()
  if (e.key === 'ArrowRight') lbNext()
  if (e.key === 'Escape') closeLightbox()
}

// Scroll reveal
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
}

onMounted(() => {
  nextTick(initReveal)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ═══════════════════════════════════════
   CSS VARIABLES
   ═══════════════════════════════════════ */
.proyecto-page {
  --acento-claro: #86d95a;
  --hero-height: 100vh;
  --section-padding: clamp(80px, 12vw, 140px);
  --container-max: 1400px;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ═══════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════ */
.hero {
  position: relative;
  min-height: var(--hero-height);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 6vw 80px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.05);
  animation: heroZoom 20s ease-out forwards;
}

@keyframes heroZoom {
  to { transform: scale(1); }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(15, 15, 15, 0.95) 0%,
    rgba(15, 15, 15, 0.6) 40%,
    rgba(15, 15, 15, 0.3) 70%,
    rgba(15, 15, 15, 0.4) 100%
  );
}

.hero-grain {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
}

/* Back button */
.hero-back {
  position: absolute;
  top: 100px;
  left: 6vw;
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: color 0.3s ease;
  z-index: 10;
}

.hero-back:hover {
  color: var(--acento);
}

.hero-back svg {
  width: 18px;
  height: 18px;
}

/* Hero content */
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
}

/* Eyebrow del hero */
.hero-eyebrow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 14px;
  margin-bottom: 24px;
}

.eyebrow-line {
  width: 48px;
  height: 2px;
  background: var(--acento-claro);
  transform: scaleX(0);
  transform-origin: left;
  animation: eyebrowLine 0.7s var(--ease-out) 0.2s forwards;
}

.eyebrow-mask {
  display: inline-block;
  overflow: hidden;
  padding: 2px 0;
}

.eyebrow-text {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.78);
  transform: translateY(110%);
  animation: eyebrowUp 0.8s var(--ease-out) var(--d, 0s) forwards;
}

.eyebrow-text.accent {
  color: var(--acento-claro);
  font-weight: 800;
}

.eyebrow-sep {
  width: 7px;
  height: 7px;
  color: var(--acento-claro);
  opacity: 0;
  animation: eyebrowFade 0.5s ease var(--d, 0s) forwards;
}

@keyframes eyebrowLine {
  to { transform: scaleX(1); }
}

@keyframes eyebrowUp {
  to { transform: translateY(0); }
}

@keyframes eyebrowFade {
  to { opacity: 0.8; }
}

.hero-title {
  font-family: var(--f-display);
  font-size: clamp(3rem, 10vw, 7rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  color: white;
  margin-bottom: 20px;
  overflow: hidden;
}

.title-word {
  display: inline-block;
  margin-right: 0.22em;
  opacity: 0;
  transform: translateY(100%);
  animation: titleReveal 1s var(--ease-out) forwards;
  animation-delay: var(--delay, 0s);
}

@keyframes titleReveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 32px;
  max-width: 600px;
}

/* Stats bar */
.stats-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 24px 32px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-family: var(--f-display);
  font-size: 20px;
  font-weight: 800;
  color: white;
}

.stat-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.15);
  align-self: center;
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  right: 6vw;
  bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.4);
}

.scroll-indicator span {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  writing-mode: vertical-rl;
}

.scroll-line {
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, var(--acento), transparent);
  animation: scrollBounce 2s ease-in-out infinite;
}

@keyframes scrollBounce {
  0%, 100% { transform: scaleY(1); opacity: 1; }
  50% { transform: scaleY(0.6); opacity: 0.5; }
}

/* ═══════════════════════════════════════
   ABOUT SECTION
   ═══════════════════════════════════════ */
.about {
  padding: var(--section-padding) 6vw;
  background: var(--fondo-puro);
}

.about-container {
  max-width: var(--container-max);
  margin: 0 auto;
}

.section-tag {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.tag-line {
  width: 40px;
  height: 2px;
  background: var(--acento);
}

.section-tag span {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--acento);
}

.about-title {
  font-family: var(--f-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  text-transform: uppercase;
  color: var(--texto);
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 48px;
}

.about-content {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 60px;
  align-items: start;
}

.about-text {
  font-size: 16px;
  line-height: 1.85;
  color: var(--texto-suave);
}

.desc-paragraph {
  font-size: 17px;
  line-height: 1.9;
}

/* Specs card */
.specs-card {
  background: var(--texto);
  border-radius: 20px;
  padding: 32px;
  color: white;
  position: sticky;
  top: 100px;
}

.specs-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 24px;
}

.specs-header svg {
  width: 24px;
  height: 24px;
  color: var(--acento);
}

.specs-header span {
  font-family: var(--f-display);
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.spec-item {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: background 0.3s ease;
}

.spec-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.spec-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(93, 214, 44, 0.15);
  border-radius: 10px;
  flex-shrink: 0;
}

.spec-icon svg {
  width: 20px;
  height: 20px;
  color: var(--acento-claro);
}

.spec-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.spec-value {
  font-family: var(--f-display);
  font-size: 16px;
  font-weight: 700;
}

.spec-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Superficie destacada */
.specs-highlight {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  background: rgba(93, 214, 44, 0.1);
  border: 1px solid rgba(93, 214, 44, 0.25);
}

.highlight-value {
  font-family: var(--f-display);
  font-size: 40px;
  font-weight: 900;
  line-height: 1;
  color: var(--acento-claro);
}

.highlight-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

/* Precio */
.specs-price {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 16px 0 24px;
}
.specs-price .price-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
}
.specs-price .price-value {
  font-family: var(--f-display);
  font-size: 26px;
  font-weight: 900;
  color: var(--acento-claro);
}

/* Tech sheet */
.tech-sheet {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  margin-bottom: 24px;
}

.tech-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 14px;
}

.tech-row:last-child {
  border-bottom: none;
}

.tech-label {
  color: rgba(255, 255, 255, 0.5);
}

.tech-value {
  font-weight: 600;
}

/* Specs CTA */
.specs-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px 24px;
  background: linear-gradient(135deg, var(--acento) 0%, var(--acento-dark) 100%);
  border-radius: 12px;
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.specs-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(93, 214, 44, 0.3);
}

.specs-cta svg {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.specs-cta:hover svg {
  transform: translateX(4px);
}

/* ═══════════════════════════════════════
   FLOOR PLAN SECTION
   ═══════════════════════════════════════ */
.floorplan {
  padding: var(--section-padding) 6vw;
  background: var(--texto);
  color: white;
}

.floorplan-container {
  max-width: var(--container-max);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

.floorplan-visual {
  position: sticky;
  top: 100px;
}

/* Plano estilo lámina de arquitectura */
.blueprint {
  position: relative;
  display: block;
  padding: 28px;
  border-radius: 16px;
  background-color: #f7f6f2;
  background-image:
    linear-gradient(rgba(28, 26, 23, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(28, 26, 23, 0.06) 1px, transparent 1px);
  background-size: 24px 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: zoom-in;
}

.bp-corner {
  position: absolute;
  width: 18px;
  height: 18px;
  border-color: var(--acento-claro);
  border-style: solid;
  border-width: 0;
}
.bp-corner.tl { top: 10px; left: 10px; border-top-width: 2px; border-left-width: 2px; }
.bp-corner.tr { top: 10px; right: 10px; border-top-width: 2px; border-right-width: 2px; }
.bp-corner.bl { bottom: 10px; left: 10px; border-bottom-width: 2px; border-left-width: 2px; }
.bp-corner.br { bottom: 10px; right: 10px; border-bottom-width: 2px; border-right-width: 2px; }

.floorplan-image {
  width: 100%;
  height: auto;
  display: block;
  mix-blend-mode: multiply;
}

.bp-zoom {
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--texto);
  color: white;
  opacity: 0.85;
  transition: opacity 0.2s, transform 0.2s;
}
.bp-zoom svg { width: 18px; height: 18px; }
.blueprint:hover .bp-zoom { opacity: 1; transform: scale(1.08); }

.bp-caption {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
}

.floorplan-info {
  padding: 8px 0;
}

.floorplan-header {
  margin-bottom: 28px;
}

.section-tag.light span {
  color: var(--acento-claro);
}

.floorplan-title {
  font-family: var(--f-display);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  line-height: 1.2;
  color: white;
}

/* Resumen del plano */
.plan-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-bottom: 32px;
  overflow: hidden;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 18px 20px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}
.summary-item:last-child { border-right: none; }

.summary-value {
  font-family: var(--f-display);
  font-size: 24px;
  font-weight: 900;
  color: var(--acento-claro);
  line-height: 1;
}

.summary-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
}

/* Ambientes */
.ambientes-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--acento-claro);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
.ambientes-head span:last-child {
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.05em;
  text-transform: none;
  font-weight: 500;
}

.ambientes-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ambiente-row {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 14px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.amb-num {
  font-family: var(--f-display);
  font-size: 12px;
  font-weight: 800;
  color: var(--acento-claro);
  min-width: 22px;
  padding-top: 3px;
}

.amb-body {
  flex: 1;
  min-width: 0;
}

.amb-line {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.amb-nombre {
  font-size: 15px;
  font-weight: 500;
  color: white;
}

.amb-dots {
  flex: 1;
  border-bottom: 1px dotted rgba(255, 255, 255, 0.25);
  transform: translateY(-4px);
}

.amb-area {
  font-family: var(--f-display);
  font-size: 16px;
  font-weight: 800;
  color: white;
  white-space: nowrap;
}

.amb-bar {
  height: 3px;
  margin-top: 8px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 2px;
  overflow: hidden;
}
.amb-bar span {
  display: block;
  height: 100%;
  background: var(--acento-claro);
  opacity: 0.7;
  border-radius: 2px;
}

.ambientes-total {
  display: flex;
  justify-content: space-between;
  padding: 16px 0 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}
.ambientes-total span:last-child {
  text-transform: none;
  font-family: var(--f-display);
  font-size: 18px;
  letter-spacing: 0;
  color: var(--acento-claro);
}

/* Download button */
.btn-download-plan {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
  padding: 18px 32px;
  background: linear-gradient(135deg, var(--acento) 0%, var(--acento-dark) 100%);
  border-radius: 12px;
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: all 0.3s ease;
  width: 100%;
}

.btn-download-plan:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(93, 214, 44, 0.3);
}

.btn-download-plan svg {
  width: 20px;
  height: 20px;
}

/* ═══════════════════════════════════════
   GALLERY SECTION
   ═══════════════════════════════════════ */
.gallery {
  padding: var(--section-padding) 6vw;
  background: var(--fondo);
}

.gallery-container {
  max-width: var(--container-max);
  margin: 0 auto;
}

.gallery-title {
  font-family: var(--f-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  text-transform: uppercase;
  color: var(--texto);
  margin-bottom: 40px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 250px;
  gap: 12px;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
}

.gallery-item.wide {
  grid-column: span 2;
}

.gallery-item.tall {
  grid-row: span 2;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out);
}

.gallery-item:hover .gallery-img {
  transform: scale(1.08);
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 15, 15, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.gallery-zoom {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 50%;
  color: var(--texto);
  transform: scale(0.8);
  transition: transform 0.3s var(--ease-spring);
}

.gallery-zoom svg {
  width: 24px;
  height: 24px;
}

.gallery-item:hover .gallery-zoom {
  transform: scale(1);
}

/* ═══════════════════════════════════════
   CTA SECTION
   ═══════════════════════════════════════ */
.cta-section {
  padding: var(--section-padding) 6vw;
  background: var(--texto);
  position: relative;
  overflow: hidden;
}

.cta-container {
  max-width: var(--container-max);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.cta-title {
  font-family: var(--f-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  text-transform: uppercase;
  color: white;
  line-height: 1.1;
  margin-bottom: 16px;
}

.cta-accent {
  color: var(--acento);
}

.cta-text {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 32px;
  max-width: 400px;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 28px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn svg {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.btn:hover svg {
  transform: translateX(4px);
}

.btn-primary {
  background: linear-gradient(135deg, var(--acento) 0%, var(--acento-dark) 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(93, 214, 44, 0.3);
}

.btn-whatsapp {
  background: rgba(37, 211, 102, 0.15);
  border: 1px solid rgba(37, 211, 102, 0.3);
  color: #25D366;
}

.btn-whatsapp:hover {
  background: rgba(37, 211, 102, 0.25);
  transform: translateY(-2px);
}

/* Decoration */
.cta-decoration {
  position: relative;
  width: 200px;
  height: 200px;
  flex-shrink: 0;
}

.decoration-ring {
  position: absolute;
  inset: 0;
  border: 2px solid rgba(93, 214, 44, 0.2);
  border-radius: 50%;
  animation: ringPulse 3s ease-in-out infinite;
}

.decoration-ring.delay {
  animation-delay: 1.5s;
}

@keyframes ringPulse {
  0%, 100% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.2); opacity: 1; }
}

/* ═══════════════════════════════════════
   LIGHTBOX
   ═══════════════════════════════════════ */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(10, 10, 10, 0.98);
  display: flex;
  flex-direction: column;
}

.lb-close {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.lb-close:hover {
  background: var(--acento);
}

.lb-close svg {
  width: 24px;
  height: 24px;
}

.lb-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px;
  gap: 24px;
}

.lb-arrow {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.lb-arrow:hover {
  background: var(--acento);
  border-color: var(--acento);
}

.lb-arrow svg {
  width: 24px;
  height: 24px;
}

.lb-image-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 100%;
}

.lb-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.lb-footer {
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.lb-counter {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.5);
}

.lb-thumbs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  max-width: 100%;
  padding: 4px;
}

.lb-thumb {
  width: 64px;
  height: 48px;
  border-radius: 6px;
  overflow: hidden;
  opacity: 0.4;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
  padding: 0;
  background: none;
}

.lb-thumb.active {
  opacity: 1;
  border-color: var(--acento);
}

.lb-thumb:hover {
  opacity: 0.8;
}

.lb-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Lightbox transitions */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

/* ═══════════════════════════════════════
   NOT FOUND
   ═══════════════════════════════════════ */
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 6vw 80px;
  background: var(--fondo-puro);
}

.not-found-content {
  text-align: center;
  max-width: 400px;
}

.not-found-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto 32px;
  color: var(--borde-medio);
}

.not-found-icon svg {
  width: 100%;
  height: 100%;
}

.not-found h1 {
  font-family: var(--f-display);
  font-size: 32px;
  font-weight: 900;
  text-transform: uppercase;
  color: var(--texto);
  margin-bottom: 12px;
}

.not-found p {
  color: var(--texto-suave);
  margin-bottom: 32px;
}

/* ═══════════════════════════════════════
   REVEAL ANIMATIONS
   ═══════════════════════════════════════ */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* ═══════════════════════════════════════
   RESPONSIVE - TABLET
   ═══════════════════════════════════════ */
@media (max-width: 1024px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .specs-card {
    position: static;
  }

  .floorplan-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .floorplan-visual {
    position: static;
    order: 2;
  }

  .floorplan-info {
    order: 1;
  }

  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 200px;
  }

  .cta-container {
    flex-direction: column;
    text-align: center;
  }

  .cta-text {
    margin-left: auto;
    margin-right: auto;
  }

  .cta-buttons {
    justify-content: center;
  }

  .cta-decoration {
    display: none;
  }
}

/* ═══════════════════════════════════════
   RESPONSIVE - MOBILE
   ═══════════════════════════════════════ */
@media (max-width: 768px) {
  .hero {
    min-height: 100svh;
    padding: 0 5vw 60px;
  }

  .hero-back {
    top: 80px;
    left: 5vw;
  }

  .hero-back span {
    display: none;
  }

  .eyebrow-line {
    width: 28px;
  }

  .eyebrow-text {
    font-size: 10px;
    letter-spacing: 0.16em;
  }

  .stats-bar {
    padding: 20px;
    gap: 16px;
  }

  .stat-divider {
    display: none;
  }

  .stat-item {
    flex: 1;
    min-width: 80px;
  }

  .scroll-indicator {
    display: none;
  }

  .specs-grid {
    grid-template-columns: 1fr;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: 220px;
  }

  .gallery-item.wide,
  .gallery-item.tall {
    grid-column: span 1;
    grid-row: span 1;
  }

  /* Floor plan mobile */
  .highlight-value {
    font-size: 32px;
  }

  .bp-caption span:nth-child(2) {
    display: none;
  }


  .lb-content {
    padding: 60px 20px;
  }

  .lb-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .lb-prev {
    left: 10px;
  }

  .lb-next {
    right: 10px;
  }

  .cta-buttons {
    flex-direction: column;
    width: 100%;
  }

  .btn {
    justify-content: center;
    width: 100%;
  }
}

/* ═══════════════════════════════════════
   REDUCED MOTION
   ═══════════════════════════════════════ */
@media (prefers-reduced-motion: reduce) {
  .hero-img {
    animation: none;
    transform: none;
  }

  .title-word {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .eyebrow-line,
  .eyebrow-text,
  .eyebrow-sep {
    animation: none;
    transform: none;
    opacity: 1;
  }

  .scroll-line,
  .decoration-ring {
    animation: none;
  }

  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .gallery-img,
  .gallery-overlay,
  .gallery-zoom,
  .specs-cta,
  .btn {
    transition: none;
  }
}

/* ═══════════════════════════════════════
   PRINT
   ═══════════════════════════════════════ */
@media print {
  .hero {
    min-height: auto;
    padding: 40px;
  }

  .hero-bg {
    display: none;
  }

  .hero-title {
    color: black;
  }

  .scroll-indicator,
  .cta-section,
  .lightbox {
    display: none;
  }
}
</style>

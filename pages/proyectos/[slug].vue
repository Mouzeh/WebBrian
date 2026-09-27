<template>
  <div v-if="proyecto" class="proyecto-page">
    <!-- ═══════════════════════════════════════
         HERO SECTION
         ═══════════════════════════════════════ -->
    <section class="hero">
      <div class="hero-bg">
        <NuxtImg
          :src="proyecto.imagen_portada.startsWith('http') ? proyecto.imagen_portada : imgUrl(proyecto.imagen_portada)"
          :alt="proyecto.titulo"
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
        <div class="hero-badge">
          <span class="badge-dot"></span>
          <span>{{ proyecto.categoria === 'construccion' ? 'Proyecto para construir' : 'Proyecto terminado' }} · {{ tipoLabel }} · {{ proyecto.anio }}</span>
        </div>

        <h1 class="hero-title">
          <span v-for="(word, i) in tituloWords" :key="i" class="title-word" :style="{ '--delay': `${i * 0.1}s` }">
            {{ word }}
          </span>
        </h1>

        <p v-if="proyecto.subtitulo" class="hero-subtitle">{{ proyecto.subtitulo }}</p>

        <!-- Stats bar -->
        <div class="stats-bar">
          <div class="stat-item" v-if="proyecto.area">
            <span class="stat-value">{{ proyecto.area }}</span>
            <span class="stat-label">Superficie</span>
          </div>
          <div class="stat-divider" v-if="proyecto.area && proyecto.habitaciones"></div>
          <div class="stat-item" v-if="proyecto.habitaciones">
            <span class="stat-value">{{ proyecto.habitaciones }} / {{ proyecto.banos || '—' }}</span>
            <span class="stat-label">Dorm. / Baños</span>
          </div>
          <div class="stat-divider" v-if="(proyecto.habitaciones || proyecto.area) && proyecto.ubicacion"></div>
          <div class="stat-item">
            <span class="stat-value">{{ proyecto.ubicacion }}</span>
            <span class="stat-label">Ubicación</span>
          </div>
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

            <div class="specs-grid">
              <div v-if="proyecto.area" class="spec-item">
                <div class="spec-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                    <path d="M3 9h18M9 21V9" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </div>
                <div class="spec-info">
                  <span class="spec-value">{{ proyecto.area }}</span>
                  <span class="spec-label">Área construida</span>
                </div>
              </div>

              <div v-if="proyecto.habitaciones" class="spec-item">
                <div class="spec-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14" stroke="currentColor" stroke-width="2"/>
                    <path d="M3 11h18" stroke="currentColor" stroke-width="2"/>
                    <rect x="7" y="11" width="4" height="5" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </div>
                <div class="spec-info">
                  <span class="spec-value">{{ proyecto.habitaciones }}</span>
                  <span class="spec-label">Habitaciones</span>
                </div>
              </div>

              <div v-if="proyecto.banos" class="spec-item">
                <div class="spec-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1z" stroke="currentColor" stroke-width="2"/>
                    <path d="M6 12V5a2 2 0 012-2h1" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </div>
                <div class="spec-info">
                  <span class="spec-value">{{ proyecto.banos }}</span>
                  <span class="spec-label">Baños</span>
                </div>
              </div>

              <div v-if="proyecto.estacionamiento" class="spec-item">
                <div class="spec-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2"/>
                    <circle cx="7.5" cy="15.5" r="1.5" stroke="currentColor" stroke-width="2"/>
                    <circle cx="16.5" cy="15.5" r="1.5" stroke="currentColor" stroke-width="2"/>
                    <path d="M5 8l2-4h10l2 4" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </div>
                <div class="spec-info">
                  <span class="spec-value">{{ proyecto.estacionamiento }}</span>
                  <span class="spec-label">Estacionamiento</span>
                </div>
              </div>

              <div v-if="proyecto.pisos" class="spec-item">
                <div class="spec-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M3 21h18M5 21V7l7-4 7 4v14" stroke="currentColor" stroke-width="2"/>
                    <path d="M9 21v-6h6v6M9 9h.01M15 9h.01M9 13h.01M15 13h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </div>
                <div class="spec-info">
                  <span class="spec-value">{{ proyecto.pisos }}</span>
                  <span class="spec-label">Pisos</span>
                </div>
              </div>

              <div v-if="proyecto.patio_trasero" class="spec-item">
                <div class="spec-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 3v18M3 12h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <path d="M8 8l4-4 4 4M8 16l4 4 4-4M4 8l-1 4 1 4M20 8l1 4-1 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="spec-info">
                  <span class="spec-value">{{ proyecto.patio_trasero }}</span>
                  <span class="spec-label">Patio trasero</span>
                </div>
              </div>
            </div>

            <!-- Ficha técnica -->
            <div class="tech-sheet">
              <div v-if="proyecto.cliente" class="tech-row">
                <span class="tech-label">Cliente</span>
                <span class="tech-value">{{ proyecto.cliente }}</span>
              </div>
              <div class="tech-row">
                <span class="tech-label">Tipo</span>
                <span class="tech-value">{{ tipoLabel }}</span>
              </div>
              <div v-if="proyecto.anio" class="tech-row">
                <span class="tech-label">Año</span>
                <span class="tech-value">{{ proyecto.anio }}</span>
              </div>
              <div v-if="proyecto.inicio_obra" class="tech-row">
                <span class="tech-label">Inicio obra</span>
                <span class="tech-value">{{ proyecto.inicio_obra }}</span>
              </div>
              <div v-if="proyecto.entrega" class="tech-row">
                <span class="tech-label">Entrega</span>
                <span class="tech-value">{{ proyecto.entrega }}</span>
              </div>
              <div v-if="proyecto.estructura" class="tech-row">
                <span class="tech-label">Estructura</span>
                <span class="tech-value">{{ proyecto.estructura }}</span>
              </div>
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
    <section v-if="proyecto.plano_imagen || hasAmbientes || hasEspecificaciones" class="floorplan reveal">
      <div class="floorplan-container">
        <!-- Left: Floor plan image -->
        <div class="floorplan-visual" v-if="proyecto.plano_imagen">
          <div class="floorplan-image-wrapper">
            <NuxtImg
              :src="imgUrl(proyecto.plano_imagen)"
              :alt="`Plano de ${proyecto.titulo}`"
              class="floorplan-image"
              loading="lazy"
            />
          </div>
        </div>

        <!-- Right: Info -->
        <div class="floorplan-info">
          <div class="floorplan-header">
            <h2 class="floorplan-title">
              {{ proyecto.plano_titulo || 'El plano que define el hogar' }}
            </h2>
            <div class="floorplan-surface" v-if="superficieDisplay">
              <span class="surface-value">{{ superficieDisplay }}</span>
              <span class="surface-label">SUP. CONSTRUIDA DESDE</span>
            </div>
            <div class="floorplan-badge" v-if="proyecto.plano_subtitulo">
              {{ proyecto.plano_subtitulo }}
            </div>
          </div>

          <!-- Tabs -->
          <div class="floorplan-tabs">
            <button
              :class="['tab-btn', { active: activeTab === 'ambientes' }]"
              @click="activeTab = 'ambientes'"
            >
              Ambientes
            </button>
            <button
              :class="['tab-btn', { active: activeTab === 'especificaciones' }]"
              @click="activeTab = 'especificaciones'"
            >
              Especificaciones Técnicas
            </button>
          </div>

          <!-- Tab content: Ambientes -->
          <div v-if="activeTab === 'ambientes'" class="tab-content ambientes-grid">
            <div
              v-for="(amb, i) in proyecto.ambientes"
              :key="i"
              class="ambiente-card"
            >
              <span class="amb-nombre">{{ amb.nombre }}</span>
              <span class="amb-area">{{ amb.area }}</span>
            </div>
            <p v-if="!hasAmbientes" class="no-data">
              No hay información de ambientes disponible.
            </p>
          </div>

          <!-- Tab content: Especificaciones -->
          <div v-if="activeTab === 'especificaciones'" class="tab-content specs-list">
            <div
              v-for="(value, key) in especificacionesDisplay"
              :key="key"
              class="spec-row"
            >
              <span class="spec-key">{{ formatSpecKey(key) }}</span>
              <span class="spec-val">{{ value }}</span>
            </div>
            <p v-if="!hasEspecificaciones" class="no-data">
              No hay especificaciones técnicas disponibles.
            </p>
          </div>

          <!-- Download button -->
          <a
            v-if="proyecto.plano_pdf"
            :href="imgUrl(proyecto.plano_pdf)"
            target="_blank"
            rel="noopener"
            class="btn-download-plan"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <polyline points="7,10 12,15 17,10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Descargar Plano</span>
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
              :alt="`${proyecto.titulo} - imagen ${i + 1}`"
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
                :alt="`Imagen ${lbIndex + 1}`"
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
                <NuxtImg :src="url" :alt="`Thumbnail ${i + 1}`" />
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
useHead({
  title: proyecto.value ? `${proyecto.value.titulo} — Constructora` : 'Proyecto no encontrado',
  meta: proyecto.value ? [
    { name: 'description', content: proyecto.value.descripcion },
    { property: 'og:title', content: proyecto.value.titulo },
    { property: 'og:description', content: proyecto.value.descripcion },
    { property: 'og:image', content: proyecto.value.imagen_portada.startsWith('http') ? proyecto.value.imagen_portada : imgUrl(proyecto.value.imagen_portada) },
  ] : [],
})

// Computed
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

// Floor plan
const activeTab = ref<'ambientes' | 'especificaciones'>('ambientes')

const hasAmbientes = computed(() => {
  return proyecto.value?.ambientes && proyecto.value.ambientes.length > 0
})

const hasEspecificaciones = computed(() => {
  const specs = proyecto.value?.especificaciones_tecnicas
  return specs && Object.keys(specs).some(k => specs[k])
})

const superficieDisplay = computed(() => {
  return proyecto.value?.especificaciones_tecnicas?.superficie_desde || proyecto.value?.area || proyecto.value?.superficie
})

const especificacionesDisplay = computed(() => {
  const specs = proyecto.value?.especificaciones_tecnicas
  if (!specs) return {}
  return Object.fromEntries(
    Object.entries(specs).filter(([_, v]) => v)
  )
})

function formatSpecKey(key: string): string {
  const labels: Record<string, string> = {
    superficie_desde: 'Superficie desde',
    terraza: 'Terraza',
    dormitorios: 'Dormitorios',
    banos: 'Baños',
    altillo: 'Altillo',
    cocina_tipo: 'Cocina',
    walk_in_closet: 'Walk-in Closet',
    estructura: 'Estructura'
  }
  return labels[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

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

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(93, 214, 44, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(93, 214, 44, 0.3);
  padding: 10px 20px;
  border-radius: 100px;
  margin-bottom: 24px;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: var(--acento);
  border-radius: 50%;
  box-shadow: 0 0 12px var(--acento);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

.hero-badge span:last-child {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--acento);
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
  color: var(--acento);
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

.floorplan-image-wrapper {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.floorplan-image {
  width: 100%;
  height: auto;
  display: block;
}

.floorplan-info {
  padding: 20px 0;
}

.floorplan-header {
  margin-bottom: 32px;
}

.floorplan-title {
  font-family: var(--f-display);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 24px;
  color: white;
}

.floorplan-surface {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
}

.surface-value {
  font-family: var(--f-display);
  font-size: 48px;
  font-weight: 900;
  color: var(--acento);
  line-height: 1;
}

.surface-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
}

.floorplan-badge {
  display: inline-block;
  padding: 8px 16px;
  background: rgba(93, 214, 44, 0.15);
  border: 1px solid rgba(93, 214, 44, 0.3);
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--acento);
}

/* Tabs */
.floorplan-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.05);
  padding: 4px;
  border-radius: 12px;
}

.tab-btn {
  flex: 1;
  padding: 14px 20px;
  background: transparent;
  border: none;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 10px;
}

.tab-btn:hover {
  color: white;
}

.tab-btn.active {
  background: var(--acento);
  color: white;
}

/* Tab content */
.tab-content {
  min-height: 200px;
}

.no-data {
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
  text-align: center;
  padding: 40px 0;
}

/* Ambientes grid */
.ambientes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.ambiente-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.ambiente-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(93, 214, 44, 0.3);
}

.amb-nombre {
  font-size: 14px;
  font-weight: 500;
  color: white;
}

.amb-area {
  font-family: var(--f-display);
  font-size: 16px;
  font-weight: 800;
  color: var(--acento);
}

/* Specs list */
.specs-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.spec-row:last-child {
  border-bottom: none;
}

.spec-key {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.5);
}

.spec-val {
  font-size: 15px;
  font-weight: 600;
  color: white;
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

  .hero-badge {
    padding: 8px 14px;
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
  .floorplan-tabs {
    flex-direction: column;
  }

  .ambientes-grid {
    grid-template-columns: 1fr;
  }

  .surface-value {
    font-size: 36px;
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

  .badge-dot,
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

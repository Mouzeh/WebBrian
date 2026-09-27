<template>
  <section
    id="servicios"
    ref="sectionRef"
    class="servicios"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="servicios-title"
  >
    <!-- Background -->
    <div class="servicios-bg" aria-hidden="true">
      <div class="bg-gradient"></div>
      <div class="bg-noise"></div>
      <div class="bg-orbs">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
      </div>
    </div>

    <div class="servicios-container">
      <!-- Header - Dramatic Redesign -->
      <header class="servicios-header">
        <div class="header-tag">
          <span class="tag-dot"></span>
          <span>Expertos Certificados</span>
        </div>

        <!-- Main title with dramatic split -->
        <div class="header-title-wrapper">
          <h2 id="servicios-title" class="header-title">
            <span class="title-line title-line-1">
              <span class="title-word" v-for="(word, i) in ['Soluciones', 'que']" :key="i" :style="{ '--i': i }">{{ word }}</span>
            </span>
            <span class="title-line title-line-2">
              <span class="title-word accent" :style="{ '--i': 2 }">Construyen</span>
              <span class="title-word" :style="{ '--i': 3 }">tu</span>
            </span>
            <span class="title-line title-line-3">
              <span class="title-word accent" :style="{ '--i': 4 }">Futuro</span>
            </span>
          </h2>
        </div>

        <!-- Subtitle -->
        <p class="header-desc">
          <span class="desc-highlight">Profesionales certificados</span> en proyectos sanitarios, electricidad, regularizaciones, permisos de edificación y topografía en la Región de Los Ríos.
        </p>

        <!-- Scroll indicator -->
        <button type="button" class="header-scroll" @click="scrollToServices">
          <span>Explorar servicios</span>
          <div class="scroll-arrow">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </button>
      </header>

      <!-- Services Tabs -->
      <div ref="wrapperRef" class="services-wrapper">
        <!-- Tab Navigation (fija al hacer scroll para cambiar sin subir) -->
        <nav ref="tabsNavRef" class="tabs-nav" role="tablist" aria-label="Categorías de servicios">
          <button
            v-for="(servicio, index) in servicios"
            :key="servicio.id"
            :id="`tab-${servicio.id}`"
            class="tab-btn"
            :class="{ active: activeTab === index }"
            role="tab"
            :aria-selected="activeTab === index"
            :aria-controls="`panel-${servicio.id}`"
            :tabindex="activeTab === index ? 0 : -1"
            @click="selectTab(index)"
            @keydown="handleTabKeydown($event, index)"
          >
            <span class="tab-icon" v-html="servicio.icon" aria-hidden="true"></span>
            <span class="tab-label">{{ servicio.shortTitle }}</span>
            <span class="tab-indicator" aria-hidden="true"></span>
          </button>
        </nav>

        <!-- Tab Content -->
        <div ref="contentRef" class="tabs-content">
          <TransitionGroup name="tab-fade">
            <article
              v-for="(servicio, index) in servicios"
              v-show="activeTab === index"
              :key="servicio.id"
              :id="`panel-${servicio.id}`"
              class="service-panel"
              role="tabpanel"
              :aria-labelledby="`tab-${servicio.id}`"
              :hidden="activeTab !== index"
            >
              <!-- Panel Header -->
              <header class="panel-header">
                <div class="panel-badge">{{ servicio.badge }}</div>
                <h3 class="panel-title">{{ servicio.title }}</h3>
                <p class="panel-intro">{{ servicio.intro }}</p>
              </header>

              <!-- Features Grid -->
              <div class="features-grid">
                <div
                  v-for="(feature, fIndex) in servicio.features"
                  :key="fIndex"
                  class="feature-card"
                  :style="{ '--delay': `${fIndex * 0.1}s` }"
                >
                  <div class="feature-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
                    </svg>
                  </div>
                  <div class="feature-content">
                    <h4 class="feature-title">{{ feature.title }}</h4>
                    <p class="feature-desc">{{ feature.desc }}</p>
                  </div>
                </div>
              </div>

              <!-- Benefits -->
              <aside v-if="servicio.benefits" class="benefits-section" aria-label="Beneficios del servicio">
                <h4 class="benefits-title">Beneficios principales</h4>
                <ul class="benefits-list">
                  <li
                    v-for="(benefit, bIndex) in servicio.benefits"
                    :key="bIndex"
                    :style="{ '--delay': `${bIndex * 0.08}s` }"
                  >
                    <span class="benefit-check" aria-hidden="true">
                      <svg viewBox="0 0 16 16" fill="none">
                        <path d="M13 5L6 12L3 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </span>
                    <span>{{ benefit }}</span>
                  </li>
                </ul>
              </aside>

              <!-- CTA -->
              <div class="panel-cta">
                <a
                  href="/contacto"
                  class="cta-primary"
                  :aria-label="`Solicitar cotización para ${servicio.shortTitle}`"
                >
                  <span>Solicitar Cotización</span>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
                <a
                  :href="whatsappLink(servicio.shortTitle)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="cta-whatsapp"
                  :aria-label="`Consultar por WhatsApp sobre ${servicio.shortTitle}`"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </article>
          </TransitionGroup>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
// El schema del negocio (servicios incluidos) está en layouts/default.vue

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const activeTab = ref(0)
const wrapperRef = ref<HTMLElement | null>(null)
const tabsNavRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

// Altura ocupada arriba por el navbar fijo + las pestañas fijas
const stickyOffset = () => {
  const navH = document.querySelector('.navbar')?.getBoundingClientRect().height ?? 0
  const tabsH = tabsNavRef.value?.getBoundingClientRect().height ?? 0
  return navH + tabsH + 12
}

// Lleva la vista al inicio del contenido del servicio seleccionado
const scrollToContent = () => {
  const el = contentRef.value
  if (!el) return
  const target = el.getBoundingClientRect().top + window.scrollY - stickyOffset()
  if (Math.abs(window.scrollY - target) < 4) return
  window.scrollTo({ top: target, behavior: scrollBehavior() })
}

// Mantiene visible la pestaña activa en la tira horizontal (móvil)
const revealTab = (index: number) => {
  const nav = tabsNavRef.value
  const tab = document.getElementById(`tab-${servicios[index].id}`)
  if (!nav || !tab || nav.scrollWidth <= nav.clientWidth) return
  const left = tab.offsetLeft - (nav.clientWidth - tab.offsetWidth) / 2
  nav.scrollTo({ left, behavior: scrollBehavior() })
}

const selectTab = (index: number) => {
  activeTab.value = index
  nextTick(() => {
    revealTab(index)
    scrollToContent()
  })
}

const scrollToServices = () => {
  const el = wrapperRef.value
  if (!el) return
  const navH = document.querySelector('.navbar')?.getBoundingClientRect().height ?? 0
  const top = el.getBoundingClientRect().top + window.scrollY - navH - 12
  window.scrollTo({ top, behavior: scrollBehavior() })
}

// WhatsApp link generator
const whatsappLink = (servicio: string) => {
  const message = encodeURIComponent(`Hola, me interesa obtener información sobre ${servicio}. ¿Podrían ayudarme?`)
  return `https://wa.me/56959266213?text=${message}`
}

// Keyboard navigation for tabs
const handleTabKeydown = (event: KeyboardEvent, currentIndex: number) => {
  const tabCount = servicios.length
  let newIndex = currentIndex

  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      event.preventDefault()
      newIndex = currentIndex === 0 ? tabCount - 1 : currentIndex - 1
      break
    case 'ArrowRight':
    case 'ArrowDown':
      event.preventDefault()
      newIndex = currentIndex === tabCount - 1 ? 0 : currentIndex + 1
      break
    case 'Home':
      event.preventDefault()
      newIndex = 0
      break
    case 'End':
      event.preventDefault()
      newIndex = tabCount - 1
      break
    default:
      return
  }

  activeTab.value = newIndex
  // Focus the new tab
  nextTick(() => {
    const newTab = document.getElementById(`tab-${servicios[newIndex].id}`)
    newTab?.focus({ preventScroll: true })
    revealTab(newIndex)
  })
}

onMounted(() => {
  if (sectionRef.value) {
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          sectionObserver.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    sectionObserver.observe(sectionRef.value)
  }
})

// Servicios desde composables/servicios.ts (misma fuente que /servicios y el footer)
const servicios = SERVICIOS
  .filter(srv => srv.id !== 'construccion')
  .map(srv => ({
    id: srv.id,
    shortTitle: srv.corto,
    badge: srv.badge,
    title: srv.titulo,
    intro: srv.intro,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${srv.icono}</svg>`,
    features: srv.items.map(item => ({ title: item.titulo, desc: item.desc })),
    benefits: srv.beneficios
  }))
</script>

<style scoped>
/* ═══════════════════════════════════════
   BASE - Mobile First
   ═══════════════════════════════════════ */
.servicios {
  position: relative;
  padding: 80px 5vw;
  background: var(--texto);
  overflow: hidden;
  /* clip (no hidden) para que las pestañas sticky funcionen */
  overflow: clip;
}

/* ═══════════════════════════════════════
   BACKGROUND
   ═══════════════════════════════════════ */
.servicios-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bg-gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 50% at 0% 0%, rgba(43, 95, 0, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse 60% 60% at 100% 100%, rgba(43, 95, 0, 0.1) 0%, transparent 50%);
}

.bg-noise {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.03;
}

/* Floating orbs */
.bg-orbs {
  position: absolute;
  inset: 0;
}

.orb {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 1s ease;
}

.servicios.is-visible .orb {
  opacity: 1;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(93, 214, 44, 0.06) 0%, transparent 60%);
  top: 5%;
  left: -10%;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(51, 116, 24, 0.08) 0%, transparent 60%);
  bottom: 5%;
  right: 0%;
}

/* ═══════════════════════════════════════
   CONTAINER
   ═══════════════════════════════════════ */
.servicios-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

/* ═══════════════════════════════════════
   HEADER - DRAMATIC REDESIGN
   ═══════════════════════════════════════ */
.servicios-header {
  margin-bottom: 60px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.servicios.is-visible .servicios-header {
  opacity: 1;
  transform: translateY(0);
}

.header-tag {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: rgba(93, 214, 44, 0.08);
  border: 1px solid rgba(93, 214, 44, 0.2);
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--acento);
}

.tag-dot {
  width: 6px;
  height: 6px;
  background: var(--acento);
  border-radius: 50%;
}

/* Title Wrapper */
.header-title-wrapper {
  position: relative;
  margin-bottom: 32px;
}

.header-title {
  font-family: var(--f-display);
  font-size: clamp(2.5rem, 8vw, 5.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  margin: 0;
}

.title-line {
  display: block;
  overflow: hidden;
}

.title-word {
  display: inline-block;
  color: var(--fondo-puro);
  opacity: 0;
  transform: translateY(100%);
  animation: wordReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--i) * 0.1s + 0.3s);
  margin-right: 0.2em;
}

.servicios:not(.is-visible) .title-word {
  animation: none;
  opacity: 0;
}

@keyframes wordReveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title-word.accent {
  color: var(--acento);
}


/* Description */
.header-desc {
  font-size: 16px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.5);
  max-width: 550px;
  margin-bottom: 32px;
}

.desc-highlight {
  color: var(--fondo-puro);
  font-weight: 600;
}

/* Scroll Indicator */
.header-scroll {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 0;
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.3s ease;
}

@media (hover: hover) and (pointer: fine) {
  .header-scroll:hover {
    color: var(--acento);
  }
}

.header-scroll span {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.scroll-arrow {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid currentColor;
  border-radius: 50%;
  animation: scrollBounce 2s ease-in-out infinite;
}

.scroll-arrow svg {
  width: 16px;
  height: 16px;
}

@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(5px); }
}

/* ═══════════════════════════════════════
   TABS NAVIGATION
   ═══════════════════════════════════════ */
.services-wrapper {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
}

.servicios.is-visible .services-wrapper {
  opacity: 1;
  transform: translateY(0);
}

.tabs-nav {
  position: sticky;
  top: 64px;
  z-index: 5;
  display: flex;
  gap: 8px;
  margin: 0 -5vw 24px;
  padding: 10px 5vw;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  scrollbar-width: none;
  background: rgba(20, 20, 20, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.tabs-nav::-webkit-scrollbar {
  display: none;
}

.tab-btn {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  scroll-snap-align: center;
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.tab-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(93, 214, 44, 0.1) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

@media (hover: hover) and (pointer: fine) {
  .tab-btn:hover::before {
    opacity: 1;
  }
}

@media (hover: hover) and (pointer: fine) {
  .tab-btn:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(93, 214, 44, 0.3);
    transform: translateY(-2px);
  }
}

.tab-btn:focus-visible {
  outline: 2px solid var(--acento);
  outline-offset: 2px;
}

.tab-btn.active {
  background: rgba(93, 214, 44, 0.1);
  border-color: var(--acento);
  transform: translateX(0);
}

.tab-btn.active::before {
  opacity: 1;
}

.tab-btn.active .tab-icon {
  color: var(--acento);
}

.tab-btn.active .tab-label {
  color: var(--fondo-puro);
}

.tab-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.tab-icon :deep(svg) {
  width: 20px;
  height: 20px;
}

@media (hover: hover) and (pointer: fine) {
  .tab-btn:hover .tab-icon,
  .tab-btn.active .tab-icon {
    color: var(--acento);
    transform: scale(1.1);
  }
}

.tab-label {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
}

@media (hover: hover) and (pointer: fine) {
  .tab-btn:hover .tab-label,
  .tab-btn.active .tab-label {
    color: var(--fondo-puro);
  }
}

.tab-indicator {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--acento) 0%, rgba(93, 214, 44, 0.5) 100%);
  border-radius: 3px 3px 0 0;
  transform: scaleX(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab-btn.active .tab-indicator {
  transform: scaleX(1);
}

/* ═══════════════════════════════════════
   TAB CONTENT
   ═══════════════════════════════════════ */
.tabs-content {
  position: relative;
  min-height: 400px;
  scroll-margin-top: 140px;
}

.service-panel {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 24px;
  backdrop-filter: blur(10px);
}

/* Panel Header */
.panel-header {
  margin-bottom: 32px;
}

.panel-badge {
  display: inline-block;
  padding: 6px 14px;
  background: var(--acento);
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: white;
  margin-bottom: 16px;
}

.panel-title {
  font-family: var(--f-display);
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 800;
  color: var(--fondo-puro);
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.panel-intro {
  font-size: 15px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.6);
}

/* Features Grid */
.features-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.feature-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(20px);
  animation: featureReveal 0.6s ease forwards;
  animation-delay: var(--delay, 0s);
}

@keyframes featureReveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (hover: hover) and (pointer: fine) {
  .feature-card:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(93, 214, 44, 0.25);
    transform: translateY(-4px) translateX(4px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
}

.feature-icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(93, 214, 44, 0.12);
  border: 1px solid rgba(93, 214, 44, 0.2);
  border-radius: 12px;
  color: var(--acento);
  transition: all 0.3s ease;
}

@media (hover: hover) and (pointer: fine) {
  .feature-card:hover .feature-icon {
    background: rgba(93, 214, 44, 0.2);
    transform: scale(1.05);
  }
}

.feature-icon svg {
  width: 22px;
  height: 22px;
}

.feature-content {
  flex: 1;
}

.feature-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--fondo-puro);
  margin-bottom: 6px;
  transition: color 0.3s ease;
}

@media (hover: hover) and (pointer: fine) {
  .feature-card:hover .feature-title {
    color: var(--acento);
  }
}

.feature-desc {
  font-size: 13px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.5);
}

/* Benefits */
.benefits-section {
  padding: 24px;
  background: rgba(93, 214, 44, 0.06);
  border: 1px solid rgba(93, 214, 44, 0.15);
  border-radius: 14px;
  margin-bottom: 32px;
}

.benefits-title {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--acento);
  margin-bottom: 16px;
}

.benefits-list {
  list-style: none;
  display: grid;
  gap: 12px;
}

.benefits-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  opacity: 0;
  transform: translateX(-10px);
  animation: benefitReveal 0.4s ease forwards;
  animation-delay: var(--delay, 0s);
}

@keyframes benefitReveal {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.benefit-check {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--acento);
  border-radius: 50%;
  color: white;
  margin-top: 1px;
}

.benefit-check svg {
  width: 12px;
  height: 12px;
}

/* Panel CTA */
.panel-cta {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cta-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 24px;
  background: var(--acento);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

@media (hover: hover) and (pointer: fine) {
  .cta-primary:hover {
    background: var(--acento-dark);
    transform: translateY(-2px);
  }
}

.cta-primary:focus-visible {
  outline: 2px solid var(--fondo-puro);
  outline-offset: 2px;
}

.cta-primary svg {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

@media (hover: hover) and (pointer: fine) {
  .cta-primary:hover svg {
    transform: translateX(4px);
  }
}

.cta-whatsapp {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 24px;
  background: rgba(37, 211, 102, 0.1);
  border: 1px solid rgba(37, 211, 102, 0.3);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #25D366;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (hover: hover) and (pointer: fine) {
  .cta-whatsapp:hover {
    background: rgba(37, 211, 102, 0.2);
    border-color: #25D366;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(37, 211, 102, 0.2);
  }
}

.cta-whatsapp:focus-visible {
  outline: 2px solid #25D366;
  outline-offset: 2px;
}

.cta-whatsapp svg {
  width: 18px;
  height: 18px;
}

/* Tab Transition */
.tab-fade-enter-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.tab-fade-leave-active {
  transition: opacity 0.2s ease;
  position: absolute;
  width: 100%;
}

.tab-fade-enter-from {
  opacity: 0;
  transform: translateY(15px);
}

.tab-fade-leave-to {
  opacity: 0;
}

/* ═══════════════════════════════════════
   TABLET (min-width: 640px)
   ═══════════════════════════════════════ */
@media (min-width: 640px) {
  .servicios {
    padding: 100px 6vw;
  }

  .servicios-header {
    margin-bottom: 80px;
  }

  .header-desc {
    font-size: 17px;
  }

  .tabs-nav {
    top: 72px;
    gap: 12px;
    margin: 0 -6vw 32px;
    padding: 12px 6vw;
  }

  .tab-btn {
    flex: 1 0 auto;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 14px 16px;
  }

  .service-panel {
    padding: 32px;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .benefits-list {
    grid-template-columns: repeat(2, 1fr);
  }

  .panel-cta {
    flex-direction: row;
  }

  .cta-primary,
  .cta-whatsapp {
    flex: 1;
  }
}

/* ═══════════════════════════════════════
   DESKTOP (min-width: 1024px)
   ═══════════════════════════════════════ */
@media (min-width: 1024px) {
  .servicios {
    padding: 140px 6vw;
  }

  .servicios-header {
    margin-bottom: 100px;
  }

  .header-title {
    font-size: 6rem;
  }

  .header-desc {
    font-size: 18px;
  }

  .tabs-nav {
    gap: 16px;
    margin-bottom: 40px;
  }

  .tab-btn {
    padding: 18px 24px;
  }

  .tab-icon {
    width: 36px;
    height: 36px;
  }

  .tab-icon :deep(svg) {
    width: 28px;
    height: 28px;
  }

  .tab-label {
    font-size: 15px;
  }

  .service-panel {
    padding: 48px;
  }

  .panel-title {
    font-size: 2rem;
  }

  .panel-intro {
    font-size: 16px;
    max-width: 700px;
  }

  .features-grid {
    gap: 24px;
  }

  .feature-card {
    padding: 24px;
  }

  .feature-title {
    font-size: 16px;
  }

  .feature-desc {
    font-size: 14px;
  }
}

/* ═══════════════════════════════════════
   LARGE DESKTOP (min-width: 1280px)
   ═══════════════════════════════════════ */
@media (min-width: 1280px) {
  .servicios-container {
    max-width: 1400px;
  }

  .header-title {
    font-size: 7rem;
  }
}

/* ═══════════════════════════════════════
   REDUCED MOTION
   ═══════════════════════════════════════ */
@media (prefers-reduced-motion: reduce) {
  .servicios-header,
  .services-wrapper,
  .feature-card,
  .benefits-list li {
    opacity: 1;
    transform: none;
    transition: none;
    animation: none;
  }

  .title-word {
    opacity: 1;
    transform: none;
    animation: none;
  }

  .scroll-arrow {
    animation: none;
  }

  .tab-btn,
  .feature-card,
  .cta-primary,
  .cta-whatsapp,
  .feature-icon {
    transition: none;
  }

  .tab-fade-enter-active,
  .tab-fade-leave-active {
    transition: none;
  }
}

/* ═══════════════════════════════════════
   PRINT STYLES
   ═══════════════════════════════════════ */
@media print {
  .servicios {
    background: white;
    padding: 40px 20px;
  }

  .servicios-bg,
  .tab-indicator,
  .cta-whatsapp {
    display: none;
  }

  .header-title,
  .panel-title,
  .feature-title {
    color: #000;
  }

  .header-desc,
  .panel-intro,
  .feature-desc {
    color: #333;
  }

  .service-panel {
    border: 1px solid #ccc;
    page-break-inside: avoid;
  }
}
</style>

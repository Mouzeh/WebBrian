<template>
  <section ref="sectionRef" class="proyectos" :class="{ 'is-visible': isVisible }">
    <!-- Background orbs -->
    <div class="bg-orb orb-1"></div>
    <div class="bg-orb orb-2"></div>

    <!-- Header -->
    <div class="proyectos-header">
      <div class="header-tag">
        <span class="tag-pulse"></span>
        <span class="tag-text">Portafolio</span>
      </div>

      <h2 class="proyectos-title">
        <span class="title-word">Proyectos que</span>
        <span class="title-word title-accent">Hablan Solos</span>
      </h2>

      <p class="proyectos-subtitle">
        Explora nuestra selección de trabajos y descubre la calidad que entregamos.
      </p>
    </div>

    <!-- Tabs -->
    <div class="tabs-container">
      <div class="tabs glass-tabs">
        <button
          :class="['tab', { active: activeTab === 'venta' }]"
          @click="activeTab = 'venta'"
        >
          <span class="tab-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 21V7l9-4 9 4v14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 21V12h6v9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="tab-label">En Venta</span>
        </button>
        <button
          :class="['tab', { active: activeTab === 'ejecutados' }]"
          @click="activeTab = 'ejecutados'"
        >
          <span class="tab-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
            </svg>
          </span>
          <span class="tab-label">Ejecutados</span>
        </button>
        <div class="tab-indicator" :class="{ right: activeTab === 'ejecutados' }"></div>
      </div>
    </div>

    <!-- Proyectos en Venta -->
    <div v-show="activeTab === 'venta'" class="proyectos-grid venta">
      <NuxtLink
        v-for="(p, i) in proyectosVenta"
        :key="p.id"
        :to="`/proyectos/${p.slug}`"
        :class="['proyecto-card', { featured: i === 0 }]"
        :style="{ '--index': i }"
      >
        <div class="card-image">
          <NuxtImg
            :src="p.imagen_portada.startsWith('http') ? p.imagen_portada : imgUrl(p.imagen_portada)"
            :alt="p.titulo"
            class="card-img"
          />
          <div class="card-overlay"></div>
          <div class="card-shine"></div>
        </div>

        <div class="card-badge glass-badge">
          <span class="badge-pulse"></span>
          <span>En Venta</span>
        </div>

        <div class="card-content">
          <div class="card-meta">
            <span class="meta-tag">{{ p.tipo }}</span>
            <span class="meta-divider"></span>
            <span class="meta-year">{{ p.anio }}</span>
          </div>

          <h3 class="card-title">{{ p.titulo }}</h3>

          <div class="card-details">
            <div class="detail-item">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="2"/>
              </svg>
              <span>{{ p.ubicacion }}</span>
            </div>
            <div v-if="p.superficie" class="detail-item">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
              </svg>
              <span>{{ p.superficie }}</span>
            </div>
          </div>

          <div class="card-cta">
            <span class="cta-text">Ver proyecto</span>
            <span class="cta-arrow-wrapper">
              <svg class="cta-arrow" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
      </NuxtLink>

      <div v-if="!proyectosVenta.length" class="empty-state glass-card">
        <div class="empty-icon">
          <svg viewBox="0 0 64 64" fill="none">
            <rect x="8" y="16" width="48" height="40" rx="4" stroke="currentColor" stroke-width="2"/>
            <path d="M8 28h48" stroke="currentColor" stroke-width="2"/>
            <path d="M32 8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <p class="empty-text">Próximamente proyectos en venta</p>
        <p class="empty-subtext">Estamos preparando nuevas oportunidades para ti</p>
      </div>
    </div>

    <!-- Proyectos Ejecutados -->
    <div v-show="activeTab === 'ejecutados'" class="proyectos-grid ejecutados">
      <div
        v-for="(p, i) in proyectosEjecutados"
        :key="p.id"
        class="trabajo-card"
        :style="{ '--index': i }"
        @click="openLightbox(i)"
      >
        <div class="trabajo-image">
          <NuxtImg
            :src="p.imagen_portada.startsWith('http') ? p.imagen_portada : imgUrl(p.imagen_portada)"
            :alt="p.titulo"
            class="trabajo-img"
          />
          <div class="trabajo-overlay">
            <div class="overlay-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                <path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M11 8v6M8 11h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="trabajo-info">
          <span class="trabajo-tipo">{{ p.tipo }}</span>
          <span class="trabajo-titulo">{{ p.titulo }}</span>
        </div>
      </div>

      <div v-if="!proyectosEjecutados.length" class="empty-state glass-card">
        <div class="empty-icon">
          <svg viewBox="0 0 64 64" fill="none">
            <path d="M32 56l-20-12V20l20-12 20 12v24l-20 12z" stroke="currentColor" stroke-width="2"/>
            <path d="M32 56V32M12 20l20 12M52 20l-20 12" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <p class="empty-text">Próximamente trabajos ejecutados</p>
        <p class="empty-subtext">Nuestro portafolio está en construcción</p>
      </div>
    </div>

    <!-- CTA -->
    <div class="proyectos-cta">
      <div class="cta-card glass-card">
        <div class="cta-shine"></div>
        <div class="cta-content">
          <p class="cta-question">¿Tienes un proyecto en mente?</p>
          <NuxtLink to="/contacto" class="btn btn-accent btn-lg">
            Conversemos
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { imgUrl, getProyectos } = useProyectos()

const activeTab = ref<'venta' | 'ejecutados'>('venta')
const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

onMounted(() => {
  if (!sectionRef.value) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.1 }
  )

  observer.observe(sectionRef.value)
})

const { data: allProyectos } = await useAsyncData('proyectos-all', () => getProyectos())

const proyectosVenta = computed(() => {
  return (allProyectos.value ?? []).filter(p =>
    p.tipo === 'residencial' || p.tipo === 'comercial'
  ).slice(0, 6)
})

const proyectosEjecutados = computed(() => {
  return (allProyectos.value ?? []).filter(p =>
    p.tipo === 'industrial' || p.tipo === 'remodelacion'
  ).slice(0, 8)
})

function openLightbox(index: number) {
  console.log('Open lightbox:', index)
}
</script>

<style scoped>
.proyectos {
  padding: var(--space-3xl) 6vw;
  background: var(--fondo-puro);
  position: relative;
  overflow: hidden;
}

/* ─── Background Orbs ─── */
.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(43, 95, 0, 0.06) 0%, transparent 70%);
  top: -200px;
  right: -200px;
  animation: orbDrift 20s ease-in-out infinite;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(43, 95, 0, 0.05) 0%, transparent 70%);
  bottom: -100px;
  left: -100px;
  animation: orbDrift 25s ease-in-out infinite reverse;
}

@keyframes orbDrift {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(40px, 30px); }
}

/* ─── Header ─── */
.proyectos-header {
  text-align: center;
  margin-bottom: var(--space-xl);
  position: relative;
  z-index: 1;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
}

.proyectos.is-visible .proyectos-header {
  opacity: 1;
  transform: translateY(0);
}

.header-tag {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px 8px 12px;
  background: rgba(43, 95, 0, 0.08);
  border: 1px solid rgba(43, 95, 0, 0.15);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-lg);
}

.tag-pulse {
  width: 8px;
  height: 8px;
  background: var(--acento);
  border-radius: 50%;
  box-shadow: 0 0 12px var(--acento);
  animation: tagPulse 2s ease-in-out infinite;
}

@keyframes tagPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.85); }
}

.tag-text {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--acento);
}

.proyectos-title {
  margin-bottom: var(--space-md);
}

.title-word {
  display: block;
  font-family: var(--f-display);
  font-size: clamp(2.5rem, 5.5vw, 4rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  color: var(--texto);
}

.title-accent {
  background: linear-gradient(135deg, var(--acento-light) 0%, var(--acento) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.proyectos-subtitle {
  font-size: 16px;
  color: var(--texto-suave);
  max-width: 400px;
  margin: 0 auto;
}

/* ─── Tabs ─── */
.tabs-container {
  display: flex;
  justify-content: center;
  margin-bottom: var(--space-xl);
  position: relative;
  z-index: 1;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
  transition-delay: 0.15s;
}

.proyectos.is-visible .tabs-container {
  opacity: 1;
  transform: translateY(0);
}

.glass-tabs {
  display: inline-flex;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(43, 95, 0, 0.1);
  padding: 6px;
  position: relative;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-md);
}

.tab {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  padding: 12px 28px;
  font-family: var(--f-display);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--texto-suave);
  cursor: pointer;
  position: relative;
  z-index: 2;
  border-radius: var(--radius-full);
  transition: color var(--duration-fast) var(--ease-out);
}

.tab:active {
  transform: scale(0.97);
}

.tab.active {
  color: white;
}

.tab-icon {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-icon svg {
  width: 100%;
  height: 100%;
}

.tab-indicator {
  position: absolute;
  top: 6px;
  left: 6px;
  width: calc(50% - 6px);
  height: calc(100% - 12px);
  background: linear-gradient(135deg, var(--acento-light) 0%, var(--acento) 100%);
  border-radius: var(--radius-full);
  z-index: 1;
  box-shadow: 0 4px 16px var(--acento-glow);
  transition: transform var(--duration-normal) var(--ease-spring);
}

.tab-indicator.right {
  transform: translateX(100%);
}

/* ─── Glass Card Base ─── */
.glass-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(43, 95, 0, 0.1);
  border-radius: var(--radius-xl);
  position: relative;
  overflow: hidden;
}

/* ─── Grid General ─── */
.proyectos-grid {
  display: grid;
  gap: var(--space-lg);
  position: relative;
  z-index: 1;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
  transition-delay: 0.3s;
}

.proyectos.is-visible .proyectos-grid {
  opacity: 1;
  transform: translateY(0);
}

.proyectos-grid.venta {
  grid-template-columns: repeat(3, 1fr);
}

.proyectos-grid.ejecutados {
  grid-template-columns: repeat(4, 1fr);
}

/* ─── Proyecto Card (Venta) ─── */
.proyecto-card {
  position: relative;
  aspect-ratio: 3/4;
  display: block;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  border-radius: var(--radius-xl);
  transition: transform var(--duration-normal) var(--ease-spring);
}

.proyecto-card:hover {
  transform: translateY(-8px);
}

.proyecto-card.featured {
  grid-column: span 2;
  aspect-ratio: 16/9;
}

.card-image {
  position: absolute;
  inset: 0;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-out);
}

.proyecto-card:hover .card-img {
  transform: scale(1.08);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(28, 26, 23, 0.95) 0%,
    rgba(28, 26, 23, 0.4) 50%,
    transparent 100%
  );
}

.card-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    transparent 40%,
    rgba(255, 255, 255, 0.1) 45%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.1) 55%,
    transparent 60%
  );
  transform: translateX(-100%) translateY(-100%);
  transition: transform 0.8s var(--ease-out);
  pointer-events: none;
}

.proyecto-card:hover .card-shine {
  transform: translateX(100%) translateY(100%);
}

/* Badge */
.glass-badge {
  position: absolute;
  top: var(--space-md);
  right: var(--space-md);
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(43, 95, 0, 0.9);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 10px 16px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.badge-pulse {
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  animation: badgePulse 1.5s ease-in-out infinite;
}

@keyframes badgePulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
}

/* Content */
.card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-lg);
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: var(--space-sm);
}

.meta-tag {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 6px 12px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.meta-divider {
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
}

.meta-year {
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  font-weight: 500;
}

.card-title {
  font-family: var(--f-display);
  font-size: 22px;
  font-weight: 800;
  text-transform: uppercase;
  color: white;
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin-bottom: var(--space-sm);
}

.proyecto-card.featured .card-title {
  font-size: 32px;
}

.card-details {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
}

.detail-item svg {
  width: 14px;
  height: 14px;
  opacity: 0.7;
}

/* CTA */
.card-cta {
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity var(--duration-normal) var(--ease-out),
    transform var(--duration-normal) var(--ease-out);
}

.proyecto-card:hover .card-cta {
  opacity: 1;
  transform: translateY(0);
}

.cta-text {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--acento-light);
}

.cta-arrow-wrapper {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--acento);
  border-radius: 50%;
  transition: transform var(--duration-fast) var(--ease-spring);
}

.proyecto-card:hover .cta-arrow-wrapper {
  transform: translateX(4px);
}

.cta-arrow {
  width: 14px;
  height: 14px;
  color: white;
}

/* ─── Trabajo Card (Ejecutados) ─── */
.trabajo-card {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;
  border-radius: var(--radius-lg);
  transition: transform var(--duration-normal) var(--ease-spring);
}

.trabajo-card:hover {
  transform: scale(1.03);
}

.trabajo-image {
  position: absolute;
  inset: 0;
}

.trabajo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-out);
}

.trabajo-card:hover .trabajo-img {
  transform: scale(1.1);
}

.trabajo-overlay {
  position: absolute;
  inset: 0;
  background: rgba(28, 26, 23, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-out);
}

.trabajo-card:hover .trabajo-overlay {
  opacity: 1;
}

.overlay-icon {
  width: 52px;
  height: 52px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--acento);
  transform: scale(0.8);
  transition: transform var(--duration-normal) var(--ease-spring);
  box-shadow: var(--shadow-lg);
}

.overlay-icon svg {
  width: 24px;
  height: 24px;
}

.trabajo-card:hover .overlay-icon {
  transform: scale(1);
}

.trabajo-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-md);
  background: linear-gradient(to top, rgba(28, 26, 23, 0.95) 0%, transparent 100%);
}

.trabajo-tipo {
  display: block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--acento-light);
  margin-bottom: 4px;
}

.trabajo-titulo {
  font-family: var(--f-display);
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  color: white;
  line-height: 1.2;
}

/* ─── Empty State ─── */
.empty-state {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-3xl) var(--space-xl);
  text-align: center;
}

.empty-icon {
  width: 80px;
  height: 80px;
  color: var(--borde-medio);
  margin-bottom: var(--space-lg);
}

.empty-icon svg {
  width: 100%;
  height: 100%;
}

.empty-text {
  font-family: var(--f-display);
  font-size: 20px;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--texto);
  margin-bottom: var(--space-sm);
}

.empty-subtext {
  font-size: 14px;
  color: var(--texto-suave);
}

/* ─── CTA Section ─── */
.proyectos-cta {
  margin-top: var(--space-2xl);
  position: relative;
  z-index: 1;
}

.cta-card {
  padding: var(--space-xl) var(--space-2xl);
  text-align: center;
}

.cta-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.3) 45%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0.3) 55%,
    transparent 60%
  );
  animation: ctaShine 4s ease-in-out infinite;
  pointer-events: none;
}

@keyframes ctaShine {
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
}

.cta-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xl);
  flex-wrap: wrap;
}

.cta-question {
  font-size: 18px;
  font-weight: 500;
  color: var(--texto);
}

.btn-icon {
  width: 18px;
  height: 18px;
  transition: transform var(--duration-fast) var(--ease-out);
}

.btn:hover .btn-icon {
  transform: translateX(4px);
}

/* ─── Responsive ─── */
@media (max-width: 1024px) {
  .proyectos-grid.venta {
    grid-template-columns: repeat(2, 1fr);
  }

  .proyectos-grid.ejecutados {
    grid-template-columns: repeat(3, 1fr);
  }

  .proyecto-card.featured {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .proyectos {
    padding: var(--space-2xl) 5vw;
  }

  .tab-label {
    display: none;
  }

  .tab {
    padding: 12px 20px;
  }

  .proyectos-grid.venta {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }

  .proyectos-grid.ejecutados {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-sm);
  }

  .proyecto-card.featured {
    grid-column: span 1;
    aspect-ratio: 4/3;
  }

  .proyecto-card.featured .card-title {
    font-size: 22px;
  }

  .proyecto-card:hover {
    transform: none;
  }

  .trabajo-card:hover {
    transform: none;
  }

  .cta-content {
    flex-direction: column;
    gap: var(--space-md);
  }
}

/* ─── Reduced Motion ─── */
@media (prefers-reduced-motion: reduce) {
  .bg-orb {
    animation: none;
  }

  .tag-pulse,
  .badge-pulse {
    animation: none;
  }

  .cta-shine {
    animation: none;
    display: none;
  }

  .card-shine {
    display: none;
  }

  .proyectos-header,
  .tabs-container,
  .proyectos-grid {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .proyecto-card,
  .trabajo-card,
  .tab,
  .tab-indicator,
  .card-img,
  .card-cta,
  .cta-arrow-wrapper,
  .trabajo-img,
  .trabajo-overlay,
  .overlay-icon,
  .btn-icon {
    transition: none;
  }
}
</style>

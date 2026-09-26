<template>
  <div class="servicios-page">
    <!-- Target Cursor solo para CTA -->
    <ClientOnly>
      <TargetCursor
        target-selector=".cursor-target"
        :spin-duration="2.5"
        :hide-default-cursor="false"
        :parallax-on="true"
        cursor-color="#4a7c23"
        cursor-color-on-target="#2B5F00"
      />
    </ClientOnly>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-grid"></div>
      </div>
      <div class="hero-content">
        <div class="hero-label">
          <span class="label-line"></span>
          <span class="label-text">Lo que hacemos</span>
        </div>
        <h1 class="hero-title">
          <span class="title-line">Nuestros</span>
          <span class="title-line accent">Servicios</span>
        </h1>
        <p class="hero-desc">
          Soluciones integrales de construcción para proyectos residenciales, comerciales e industriales.
        </p>
      </div>
      <div class="hero-scroll-indicator">
        <span class="scroll-text">Explorar</span>
        <span class="scroll-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </span>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="services-section">
      <div class="services-grid">
        <article
          v-for="(srv, i) in servicios"
          :key="srv.num"
          class="service-card"
          :style="{ '--delay': `${i * 0.1}s` }"
          @mouseenter="activeCard = i"
          @mouseleave="activeCard = null"
        >
          <!-- Card Background Effect -->
          <div class="card-bg"></div>

          <!-- Number Badge -->
          <div class="card-number">{{ srv.num }}</div>

          <!-- Icon -->
          <div class="card-icon" v-html="srv.icono"></div>

          <!-- Content -->
          <div class="card-content">
            <h3 class="card-title">{{ srv.titulo }}</h3>
            <p class="card-desc">{{ srv.desc }}</p>

            <!-- Features List -->
            <ul class="card-features">
              <li v-for="(item, j) in srv.lista" :key="item" :style="{ '--item-delay': `${j * 0.05}s` }">
                <span class="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M5 12l5 5L20 7"/>
                  </svg>
                </span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- Hover Line -->
          <div class="card-line"></div>
        </article>
      </div>

      <!-- CTA Section -->
      <div class="cta-section">
        <div class="cta-content">
          <div class="cta-text">
            <span>¿Tienes un proyecto</span>
            <span class="cta-accent">en mente?</span>
          </div>
          <NuxtLink to="/contacto" class="cta-button cursor-target">
            <span class="btn-text">Solicitar cotización</span>
            <span class="btn-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </NuxtLink>
        </div>
        <div class="cta-decoration">
          <div class="decoration-circle"></div>
          <div class="decoration-circle delay"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Servicios — R&J SPA' })

const activeCard = ref<number | null>(null)

const servicios = [
  {
    num: '01',
    icono: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    titulo: 'Servicios Eléctricos',
    desc: 'Instalaciones eléctricas domiciliarias e industriales con certificación SEC.',
    lista: ['Instalaciones nuevas', 'Ampliaciones eléctricas', 'Certificaciones TE1', 'Empalmes eléctricos']
  },
  {
    num: '02',
    icono: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v6m0 0a4 4 0 100 8 4 4 0 000-8zm-2 14h4m-2 0v4"/></svg>',
    titulo: 'Servicios Sanitarios',
    desc: 'Instalaciones de agua potable, alcantarillado y gas con los más altos estándares.',
    lista: ['Agua potable', 'Alcantarillado', 'Instalaciones de gas', 'Reparaciones']
  },
  {
    num: '03',
    icono: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>',
    titulo: 'Ley del Mono',
    desc: 'Regularización de construcciones existentes según la normativa vigente.',
    lista: ['Regularización ampliaciones', 'Documentación técnica', 'Gestión municipal', 'Asesoría legal']
  },
  {
    num: '04',
    icono: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8m8 4H8m2-8H8"/></svg>',
    titulo: 'Permisos de Edificación',
    desc: 'Gestión completa de permisos ante la Dirección de Obras Municipales.',
    lista: ['Permisos de obra nueva', 'Permisos de ampliación', 'Recepciones finales', 'Subdivisiones']
  },
  {
    num: '05',
    icono: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4l7.07 17.07 2.51-7.39 7.39-2.51L4 4zM14 14l6 6"/></svg>',
    titulo: 'Topografía',
    desc: 'Levantamientos topográficos y estudios de terreno con equipos de precisión.',
    lista: ['Levantamientos', 'Replanteos', 'Nivelaciones', 'Estudios de suelo']
  },
  {
    num: '06',
    icono: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20h20M5 20V10l7-5 7 5v10M9 20v-6h6v6"/></svg>',
    titulo: 'Construcción General',
    desc: 'Ejecución de obras completas, desde los cimientos hasta la entrega final.',
    lista: ['Obras nuevas', 'Remodelaciones', 'Ampliaciones', 'Terminaciones']
  },
]

// Intersection Observer for scroll animations
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )

  document.querySelectorAll('.service-card, .cta-section').forEach((el) => {
    observer.observe(el)
  })

  onUnmounted(() => observer.disconnect())
})
</script>

<style scoped>
.servicios-page {
  --card-radius: 16px;
}

/* ─── Hero Section ─── */
.hero {
  position: relative;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 140px 6vw 80px;
  background: var(--texto);
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  opacity: 0.03;
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: grid-move 20s linear infinite;
}

@keyframes grid-move {
  0% { transform: translate(0, 0); }
  100% { transform: translate(60px, 60px); }
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.hero-label {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
  animation: fade-up 0.8s ease both;
}

.label-line {
  width: 40px;
  height: 2px;
  background: var(--acento);
}

.label-text {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--borde-medio);
}

.hero-title {
  font-family: var(--f-display);
  font-size: clamp(56px, 8vw, 120px);
  font-weight: 900;
  line-height: 0.9;
  text-transform: uppercase;
  margin-bottom: 28px;
}

.title-line {
  display: block;
  color: white;
  animation: title-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.title-line:nth-child(2) {
  animation-delay: 0.1s;
}

.title-line.accent {
  color: var(--acento);
}

@keyframes title-reveal {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-desc {
  font-size: 17px;
  line-height: 1.7;
  color: var(--borde-medio);
  max-width: 480px;
  animation: fade-up 0.8s ease 0.3s both;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 6vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: fade-up 0.8s ease 0.5s both;
}

.scroll-text {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--borde-medio);
}

.scroll-arrow {
  width: 20px;
  height: 20px;
  color: var(--acento);
  animation: bounce 2s ease infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}

/* ─── Services Section ─── */
.services-section {
  padding: 100px 6vw;
  background: var(--fondo);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 80px;
}

/* ─── Service Card ─── */
.service-card {
  position: relative;
  background: white;
  border-radius: var(--card-radius);
  padding: 40px 32px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  transition:
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.4s ease;
}

.service-card.visible {
  opacity: 1;
  transform: translateY(0);
  animation: card-appear 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--delay);
}

@keyframes card-appear {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.15);
}

.card-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--acento), #6ba32a);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.service-card:hover .card-bg {
  transform: scaleX(1);
}

.card-number {
  position: absolute;
  top: 20px;
  right: 24px;
  font-family: var(--f-display);
  font-size: 48px;
  font-weight: 900;
  color: var(--borde);
  opacity: 0.3;
  line-height: 1;
  transition: opacity 0.3s, color 0.3s;
}

.service-card:hover .card-number {
  opacity: 0.15;
  color: var(--acento);
}

.card-icon {
  width: 56px;
  height: 56px;
  background: var(--acento);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 24px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s;
}

.card-icon svg {
  width: 26px;
  height: 26px;
}

.service-card:hover .card-icon {
  transform: scale(1.1) rotate(-3deg);
}

.card-title {
  font-family: var(--f-display);
  font-size: 22px;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--texto);
  margin-bottom: 12px;
  line-height: 1.2;
}

.card-desc {
  font-size: 14px;
  line-height: 1.7;
  color: var(--texto-suave);
  margin-bottom: 20px;
}

.card-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-features li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--texto-suave);
  opacity: 0.8;
  transition: opacity 0.3s, transform 0.3s;
  transition-delay: var(--item-delay);
}

.service-card:hover .card-features li {
  opacity: 1;
  transform: translateX(4px);
}

.feature-icon {
  width: 16px;
  height: 16px;
  color: var(--acento);
  flex-shrink: 0;
}

.feature-icon svg {
  width: 100%;
  height: 100%;
}

.card-line {
  position: absolute;
  bottom: 0;
  left: 32px;
  right: 32px;
  height: 1px;
  background: var(--borde);
  transform: scaleX(0);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.service-card:hover .card-line {
  transform: scaleX(1);
}

/* ─── CTA Section ─── */
.cta-section {
  position: relative;
  background: var(--texto);
  border-radius: var(--card-radius);
  padding: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
}

.cta-section.visible {
  animation: card-appear 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
}

.cta-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 40px;
}

.cta-text {
  font-family: var(--f-display);
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 900;
  text-transform: uppercase;
  color: white;
  line-height: 1.1;
  display: flex;
  flex-direction: column;
}

.cta-accent {
  color: var(--acento);
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: var(--acento);
  color: white;
  text-decoration: none;
  padding: 18px 32px;
  border-radius: 8px;
  font-family: var(--f-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s;
  white-space: nowrap;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px -10px rgba(74, 124, 35, 0.5);
}

.btn-arrow {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.cta-button:hover .btn-arrow {
  transform: translateX(4px);
}

.cta-decoration {
  position: absolute;
  right: -50px;
  top: 50%;
  transform: translateY(-50%);
}

.decoration-circle {
  width: 300px;
  height: 300px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  animation: pulse-slow 4s ease-in-out infinite;
}

.decoration-circle.delay {
  width: 400px;
  height: 400px;
  animation-delay: 1s;
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.5;
    transform: translateY(-50%) scale(1);
  }
  50% {
    opacity: 0.2;
    transform: translateY(-50%) scale(1.05);
  }
}

/* ─── Responsive ─── */
@media (max-width: 1200px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: 60vh;
    padding: 120px 5vw 60px;
  }

  .services-section {
    padding: 60px 5vw;
  }

  .services-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .service-card {
    padding: 32px 24px;
  }

  .cta-section {
    padding: 40px 24px;
  }

  .cta-content {
    flex-direction: column;
    text-align: center;
    gap: 24px;
  }

  .cta-text {
    align-items: center;
  }

  .decoration-circle {
    display: none;
  }

  .hero-scroll-indicator {
    display: none;
  }
}

/* ─── Reduced Motion ─── */
@media (prefers-reduced-motion: reduce) {
  .hero-grid {
    animation: none;
  }

  .service-card,
  .cta-section {
    opacity: 1;
    transform: none;
    animation: none;
  }

  .service-card:hover {
    transform: none;
  }

  .decoration-circle {
    animation: none;
  }

  .scroll-arrow {
    animation: none;
  }
}
</style>

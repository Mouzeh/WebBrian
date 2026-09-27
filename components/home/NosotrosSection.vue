<template>
  <section ref="sectionRef" class="nosotros" :class="{ 'is-visible': isVisible }">
    <!-- Background orbs -->
    <div class="bg-orb orb-1"></div>
    <div class="bg-orb orb-2"></div>

    <div class="nosotros-container">
      <!-- Contenido principal -->
      <div class="nosotros-content">
        <!-- Tag -->
        <div class="content-tag">
          <span class="tag-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="tag-text">Sobre Nosotros</span>
        </div>

        <!-- Título -->
        <h2 class="nosotros-title">
          <span class="title-word">Profesionalismo</span>
          <span class="title-word">y <span class="title-accent">Compromiso</span></span>
        </h2>

        <!-- Descripción -->
        <p class="nosotros-desc">
          Con más de 15 años de experiencia en el rubro de la construcción,
          ofrecemos soluciones integrales para proyectos residenciales y comerciales.
          Nuestro compromiso es entregar trabajos de calidad, cumpliendo con todas
          las normativas vigentes y superando las expectativas de nuestros clientes.
        </p>

        <!-- Features -->
        <ul class="features-list">
          <li
            v-for="(feature, index) in features"
            :key="index"
            class="feature-item"
            :style="{ '--i': index }"
          >
            <span class="feature-check">
              <span class="check-inner">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M13 5L6 12L3 9" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </span>
            <span class="feature-text">{{ feature }}</span>
          </li>
        </ul>

        <!-- CTA Button -->
        <NuxtLink to="/nosotros" class="btn btn-outline btn-lg">
          Conoce más sobre nosotros
          <svg class="btn-arrow" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
      </div>

      <!-- Visual Side -->
      <div class="nosotros-visual">
        <div class="visual-wrapper">
          <!-- Main Image Frame -->
          <div class="image-frame glass-card">
            <div class="frame-shine"></div>
            <div class="image-container">
              <NuxtImg
                v-if="fotoUrl"
                :src="fotoUrl"
                alt="Fundador R&J SPA"
                width="500"
                height="600"
                class="founder-image"
              />
              <div v-else class="placeholder">
                <div class="placeholder-icon">
                  <svg viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="24" r="12" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 56c0-11.046 8.954-20 20-20s20 8.954 20 20" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </div>
                <span class="placeholder-text">Foto del fundador</span>
              </div>
            </div>

            <!-- Founder Badge -->
            <div class="founder-badge">
              <div class="badge-glow"></div>
              <div class="badge-content">
                <div class="badge-avatar">
                  <span>R&J</span>
                </div>
                <div class="badge-info">
                  <span class="badge-name">R&J SPA</span>
                  <span class="badge-role">Constructora e Inmobiliaria</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Decorative elements -->
          <div class="deco-ring"></div>
          <div class="deco-dots">
            <span v-for="n in 9" :key="n" class="dot"></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const fotoUrl = ref('')
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
    { threshold: 0.15 }
  )

  observer.observe(sectionRef.value)
})

const features = [
  'Profesionales certificados y con experiencia',
  'Cumplimiento de normativas SEC y DOM',
  'Garantía en todos nuestros trabajos',
  'Presupuestos transparentes sin sorpresas'
]

</script>

<style scoped>
.nosotros {
  padding: var(--space-2xl) 20px;
  background: var(--fondo);
  position: relative;
  overflow: hidden;
}

/* ─── Background Orbs ─── */
.bg-orb {
  display: none; /* blur(120px) es costoso en móvil: solo desde tablet */
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  opacity: 0.6;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(43, 95, 0, 0.08) 0%, transparent 70%);
  top: -150px;
  right: -100px;
  animation: orbFloat 18s ease-in-out infinite;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(43, 95, 0, 0.06) 0%, transparent 70%);
  bottom: -100px;
  left: -100px;
  animation: orbFloat 22s ease-in-out infinite reverse;
}

@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, 20px); }
}

.nosotros-container {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-2xl);
  align-items: center;
  position: relative;
  z-index: 1;
}

/* ─── Content ─── */
.nosotros-content {
  max-width: 560px;
  opacity: 0;
  transform: translateX(-40px);
  transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
}

.nosotros.is-visible .nosotros-content {
  opacity: 1;
  transform: translateX(0);
}

.content-tag {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px 8px 10px;
  background: rgba(43, 95, 0, 0.08);
  border: 1px solid rgba(43, 95, 0, 0.15);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-lg);
}

.tag-icon {
  width: 20px;
  height: 20px;
  color: var(--acento);
}

.tag-icon svg {
  width: 100%;
  height: 100%;
}

.tag-text {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--acento);
}

.nosotros-title {
  margin-bottom: var(--space-xl);
}

.title-word {
  display: block;
  font-family: var(--f-display);
  font-size: clamp(2.5rem, 5vw, 3.8rem);
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

.nosotros-desc {
  font-size: 16px;
  line-height: 1.8;
  color: var(--texto-suave);
  margin-bottom: var(--space-xl);
}

/* ─── Features ─── */
.features-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  background: rgba(43, 95, 0, 0.03);
  border: 1px solid rgba(43, 95, 0, 0.08);
  border-radius: var(--radius-lg);
  transition:
    transform var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .feature-item:hover {
    transform: translateX(8px);
    background: rgba(43, 95, 0, 0.06);
    border-color: rgba(43, 95, 0, 0.15);
  }
}

.feature-check {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.check-inner {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, var(--acento-light) 0%, var(--acento) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px var(--acento-glow);
  transition: transform var(--duration-fast) var(--ease-spring);
}

@media (hover: hover) and (pointer: fine) {
  .feature-item:hover .check-inner {
    transform: scale(1.1);
  }
}

.check-inner svg {
  width: 12px;
  height: 12px;
  color: white;
}

.feature-text {
  font-size: 14px;
  font-weight: 500;
  color: var(--texto);
  line-height: 1.4;
}

/* ─── Button ─── */
.btn-arrow {
  width: 18px;
  height: 18px;
  transition: transform var(--duration-fast) var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .btn:hover .btn-arrow {
    transform: translateX(4px);
  }
}

/* ─── Visual ─── */
.nosotros-visual {
  position: relative;
  order: -1;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
  transition-delay: 0.2s;
}

.nosotros.is-visible .nosotros-visual {
  opacity: 1;
  transform: translateX(0);
}

.visual-wrapper {
  position: relative;
  padding: var(--space-md);
}

/* Glass Card base */
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(43, 95, 0, 0.1);
  border-radius: var(--radius-xl);
  position: relative;
  overflow: hidden;
}

/* Stats Stack */
.stats-stack {
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
  z-index: 10;
}

.stat-card {
  flex: 1;
  min-width: 120px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  box-shadow: var(--shadow-lg);
  transition:
    transform var(--duration-normal) var(--ease-spring),
    box-shadow var(--duration-normal) var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .stat-card:hover {
    transform: translateX(8px) scale(1.02);
    box-shadow: var(--shadow-xl);
  }
}

.stat-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.4) 45%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0.4) 55%,
    transparent 60%
  );
  transform: translateX(-100%);
  transition: transform 0.6s var(--ease-out);
  pointer-events: none;
}

@media (hover: hover) and (pointer: fine) {
  .stat-card:hover .stat-shine {
    transform: translateX(100%);
  }
}

.stat-icon {
  width: 32px;
  height: 32px;
  color: var(--acento);
}

.stat-icon svg {
  width: 100%;
  height: 100%;
}

.stat-data {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-number {
  font-family: var(--f-display);
  font-size: 22px;
  font-weight: 900;
  color: var(--acento);
  letter-spacing: -0.02em;
  line-height: 1;
}

.stat-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--texto-suave);
}

/* Image Frame */
.image-frame {
  padding: 8px;
  box-shadow: var(--shadow-xl);
}

.frame-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    transparent 40%,
    rgba(255, 255, 255, 0.3) 45%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0.3) 55%,
    transparent 60%
  );
  transform: translateX(-100%) translateY(-100%);
  animation: frameShine 4s ease-in-out infinite;
  pointer-events: none;
  z-index: 5;
}

@keyframes frameShine {
  0%, 100% { transform: translateX(-100%) translateY(-100%); }
  50% { transform: translateX(100%) translateY(100%); }
}

.image-container {
  aspect-ratio: 4/5;
  background: var(--fondo);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.founder-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .image-frame:hover .founder-image {
    transform: scale(1.03);
  }
}

.placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  color: var(--borde-medio);
  background: linear-gradient(135deg, var(--fondo) 0%, var(--fondo-puro) 100%);
}

.placeholder-icon {
  width: 80px;
  height: 80px;
  opacity: 0.4;
}

.placeholder-icon svg {
  width: 100%;
  height: 100%;
}

.placeholder-text {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.5;
}

/* Founder Badge */
.founder-badge {
  position: absolute;
  bottom: -12px;
  right: 8px;
  z-index: 10;
}

.badge-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, var(--acento-glow) 0%, transparent 70%);
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .founder-badge:hover .badge-glow {
    opacity: 1;
  }
}

.badge-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: white;
  border: 1px solid rgba(43, 95, 0, 0.15);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  transition:
    transform var(--duration-fast) var(--ease-spring),
    box-shadow var(--duration-normal) var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .founder-badge:hover .badge-content {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }
}

.badge-avatar {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--acento-light) 0%, var(--acento) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px var(--acento-glow);
}

.badge-avatar span {
  font-family: var(--f-display);
  font-size: 16px;
  font-weight: 900;
  color: white;
}

.badge-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.badge-name {
  font-family: var(--f-display);
  font-size: 14px;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--texto);
  letter-spacing: -0.01em;
}

.badge-role {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--texto-suave);
}

/* Decorative Elements */
.deco-ring {
  display: none;
  position: absolute;
  top: 50%;
  right: -60px;
  width: 120px;
  height: 120px;
  border: 2px solid rgba(43, 95, 0, 0.15);
  border-radius: 50%;
  transform: translateY(-50%);
  animation: ringPulse 3s ease-in-out infinite;
}

@keyframes ringPulse {
  0%, 100% { opacity: 0.5; transform: translateY(-50%) scale(1); }
  50% { opacity: 0.8; transform: translateY(-50%) scale(1.05); }
}

.deco-dots {
  position: absolute;
  bottom: 40px;
  left: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.dot {
  width: 6px;
  height: 6px;
  background: var(--acento);
  border-radius: 50%;
  opacity: 0.3;
}

.dot:nth-child(odd) {
  opacity: 0.5;
}

/* ─── Responsive ─── */
/* ─── Tablet (mobile first) ─── */
@media (min-width: 769px) {
  .nosotros {
    padding: var(--space-3xl) 6vw;
  }

  .bg-orb {
    display: block;
  }

  .nosotros-container {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }

  .nosotros-visual {
    order: 0;
    max-width: none;
    margin: 0;
  }

  .visual-wrapper {
    padding: var(--space-xl);
  }

  .stats-stack {
    position: absolute;
    left: -20px;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: nowrap;
    margin-bottom: 0;
  }

  .stat-card {
    flex: 0 1 auto;
    min-width: auto;
  }

  .deco-ring {
    display: block;
  }

  .founder-badge {
    right: 24px;
    bottom: -16px;
  }

  .badge-content {
    padding: 12px 18px;
  }

  .badge-avatar {
    width: 44px;
    height: 44px;
  }

  .badge-avatar span {
    font-size: 20px;
  }

  .badge-name {
    font-size: 16px;
  }
}

/* ─── Escritorio ─── */
@media (min-width: 1025px) {
  .nosotros-container {
    gap: var(--space-3xl);
  }

  .stats-stack {
    left: -40px;
  }
}

/* ─── Reduced Motion ─── */
@media (prefers-reduced-motion: reduce) {
  .bg-orb {
    animation: none;
  }

  .deco-ring {
    animation: none;
  }

  .frame-shine {
    animation: none;
    display: none;
  }

  .stat-shine {
    display: none;
  }

  .nosotros-content,
  .nosotros-visual {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .feature-item,
  .stat-card,
  .founder-badge,
  .badge-content,
  .founder-image,
  .check-inner,
  .btn-arrow {
    transition: none;
  }
}
</style>

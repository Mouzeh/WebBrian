<template>
  <section class="hero" @mousemove="handleMouseMove">
    <!-- Animated gradient mesh -->
    <div class="hero-mesh">
      <div class="mesh-gradient mesh-1" :style="meshStyle(0.02)"></div>
      <div class="mesh-gradient mesh-2" :style="meshStyle(-0.015)"></div>
      <div class="mesh-gradient mesh-3" :style="meshStyle(0.01)"></div>
    </div>

    <!-- Floating shapes -->
    <div class="floating-shapes">
      <div class="shape shape-1" :style="shapeStyle(0.03)">
        <svg viewBox="0 0 200 200" fill="none">
          <path d="M100 0L200 100L100 200L0 100L100 0Z" fill="currentColor"/>
        </svg>
      </div>
      <div class="shape shape-2" :style="shapeStyle(-0.02)">
        <svg viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="100" fill="currentColor"/>
        </svg>
      </div>
      <div class="shape shape-3" :style="shapeStyle(0.025)">
        <svg viewBox="0 0 200 200" fill="none">
          <rect width="200" height="200" rx="40" fill="currentColor"/>
        </svg>
      </div>
    </div>

    <!-- Content -->
    <div class="hero-layout">
      <!-- Left: Main content -->
      <div class="hero-main">
        <div class="eyebrow">
          <span class="eyebrow-dot"></span>
          <span class="eyebrow-text">Disponible para proyectos</span>
        </div>

        <h1 class="headline">
          <span class="line line-1">
            <span class="char-wrap">
              <span v-for="(char, i) in 'Hacemos'" :key="'h1-'+i" class="char" :style="{ '--i': i }">{{ char }}</span>
            </span>
          </span>
          <span class="line line-2">
            <span class="char-wrap">
              <span v-for="(char, i) in 'realidad'" :key="'h2-'+i" class="char accent" :style="{ '--i': i + 7 }">{{ char }}</span>
            </span>
            <span class="char-wrap">
              <span class="char space" :style="{ '--i': 15 }">&nbsp;</span>
              <span v-for="(char, i) in 'tu'" :key="'h3-'+i" class="char" :style="{ '--i': i + 16 }">{{ char }}</span>
            </span>
          </span>
          <span class="line line-3">
            <span class="char-wrap">
              <span v-for="(char, i) in 'vision.'" :key="'h4-'+i" class="char" :style="{ '--i': i + 18 }">{{ char }}</span>
            </span>
          </span>
        </h1>

        <p class="description">
          Construccion integral con mas de 15 anos de experiencia.
          Desde el diseno hasta la entrega, cuidamos cada detalle.
        </p>

        <div class="actions">
          <button class="btn-magnetic" @mouseenter="magneticEnter" @mouseleave="magneticLeave" @mousemove="magneticMove">
            <span class="btn-bg"></span>
            <span class="btn-content">
              <span>Iniciar proyecto</span>
              <span class="btn-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </span>
          </button>

          <a href="#trabajos" class="link-hover">
            <span class="link-text">Ver proyectos</span>
            <span class="link-line"></span>
          </a>
        </div>
      </div>

      <!-- Right: Feature cards -->
      <div class="hero-cards">
        <div
          v-for="(card, index) in cards"
          :key="card.id"
          class="feature-card"
          :style="{ '--index': index }"
          @mouseenter="cardHover = index"
          @mouseleave="cardHover = null"
        >
          <div class="card-glow" :class="{ active: cardHover === index }"></div>
          <div class="card-content">
            <span class="card-icon">
              <!-- Experience icon -->
              <svg v-if="card.id === 'experience'" viewBox="0 0 24 24" fill="none">
                <path d="M12 2v20M2 12h20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
              </svg>
              <!-- Projects icon -->
              <svg v-else-if="card.id === 'projects'" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 22V12h6v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <!-- Satisfaction icon -->
              <svg v-else-if="card.id === 'satisfaction'" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <div class="card-text">
              <span class="card-value">{{ card.value }}</span>
              <span class="card-label">{{ card.label }}</span>
            </div>
          </div>
          <div class="card-shine"></div>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="hero-bottom">
      <div class="scroll-indicator">
        <span class="scroll-text">Scroll</span>
        <div class="scroll-track">
          <div class="scroll-thumb"></div>
        </div>
      </div>

      <div class="services-preview">
        <span v-for="service in services" :key="service" class="service-tag">
          {{ service }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const mousePos = ref({ x: 0, y: 0 })
const cardHover = ref<number | null>(null)

const cards = [
  { id: 'experience', value: '15+', label: 'Anos experiencia' },
  { id: 'projects', value: '200+', label: 'Proyectos' },
  { id: 'satisfaction', value: '100%', label: 'Satisfaccion' }
]

const services = ['Electricos', 'Sanitarios', 'Permisos', 'Construccion']

function handleMouseMove(e: MouseEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  mousePos.value = {
    x: (e.clientX - rect.left) / rect.width - 0.5,
    y: (e.clientY - rect.top) / rect.height - 0.5
  }
}

function meshStyle(intensity: number) {
  return {
    transform: `translate(${mousePos.value.x * 100 * intensity}px, ${mousePos.value.y * 100 * intensity}px)`
  }
}

function shapeStyle(intensity: number) {
  return {
    transform: `translate(${mousePos.value.x * 100 * intensity}px, ${mousePos.value.y * 100 * intensity}px)`
  }
}

// Magnetic button effect
function magneticEnter(e: MouseEvent) {
  const btn = e.currentTarget as HTMLElement
  btn.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
}

function magneticLeave(e: MouseEvent) {
  const btn = e.currentTarget as HTMLElement
  btn.style.transform = 'translate(0, 0)'
}

function magneticMove(e: MouseEvent) {
  const btn = e.currentTarget as HTMLElement
  const rect = btn.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  background: var(--fondo-puro);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* ─── Animated Mesh ─── */
.hero-mesh {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.mesh-gradient {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;
}

.mesh-1 {
  width: 60vw;
  height: 60vw;
  top: -20%;
  right: -10%;
  background: radial-gradient(circle, rgba(43, 95, 0, 0.15) 0%, transparent 70%);
}

.mesh-2 {
  width: 50vw;
  height: 50vw;
  bottom: -20%;
  left: -10%;
  background: radial-gradient(circle, rgba(43, 95, 0, 0.1) 0%, transparent 70%);
}

.mesh-3 {
  width: 30vw;
  height: 30vw;
  top: 40%;
  left: 30%;
  background: radial-gradient(circle, rgba(43, 95, 0, 0.08) 0%, transparent 70%);
}

/* ─── Floating Shapes ─── */
.floating-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.shape {
  position: absolute;
  opacity: 0.04;
  transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;
  animation: shapeFloat 20s ease-in-out infinite;
}

.shape svg {
  width: 100%;
  height: 100%;
  color: var(--acento);
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  right: 15%;
  animation-delay: 0s;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: 20%;
  left: 10%;
  animation-delay: -7s;
}

.shape-3 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 30%;
  animation-delay: -14s;
}

@keyframes shapeFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(10deg); }
}

/* ─── Layout ─── */
.hero-layout {
  flex: 1;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 80px;
  align-items: center;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 140px 6vw 60px;
  position: relative;
  z-index: 1;
}

/* ─── Main Content ─── */
.hero-main {
  max-width: 700px;
}

/* Eyebrow */
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  opacity: 0;
  animation: fadeIn 0.8s var(--ease-out) 0.1s forwards;
}

.eyebrow-dot {
  width: 8px;
  height: 8px;
  background: var(--acento);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
}

.eyebrow-text {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--texto-suave);
}

/* Headline */
.headline {
  margin-bottom: 28px;
}

.line {
  display: block;
  overflow: hidden;
}

.char-wrap {
  display: inline-block;
}

.char {
  display: inline-block;
  font-family: var(--f-display);
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--texto);
  opacity: 0;
  transform: translateY(100%) rotateX(-80deg);
  animation: charReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(0.2s + var(--i) * 0.03s);
  transform-origin: bottom;
}

.char.accent {
  background: linear-gradient(135deg, var(--acento) 0%, var(--acento-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.char.space {
  width: 0.3em;
}

@keyframes charReveal {
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }
}

/* Description */
.description {
  font-size: 18px;
  line-height: 1.7;
  color: var(--texto-suave);
  max-width: 480px;
  margin-bottom: 40px;
  opacity: 0;
  animation: fadeUp 0.8s var(--ease-out) 0.9s forwards;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  to { opacity: 1; }
}

/* Actions */
.actions {
  display: flex;
  align-items: center;
  gap: 32px;
  opacity: 0;
  animation: fadeUp 0.8s var(--ease-out) 1.1s forwards;
}

/* Magnetic Button */
.btn-magnetic {
  position: relative;
  padding: 20px 36px;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: var(--radius-full);
  overflow: hidden;
}

.btn-bg {
  position: absolute;
  inset: 0;
  background: var(--texto);
  border-radius: var(--radius-full);
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.btn-magnetic:hover .btn-bg {
  transform: scale(1.05);
}

.btn-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--fondo-puro);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.btn-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.btn-magnetic:hover .btn-icon {
  transform: translate(3px, -3px);
}

/* Link hover */
.link-hover {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--texto);
  font-size: 15px;
  font-weight: 600;
}

.link-line {
  height: 2px;
  background: var(--texto);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.link-hover:hover .link-line {
  transform: scaleX(1);
  transform-origin: left;
}

/* ─── Feature Cards ─── */
.hero-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feature-card {
  position: relative;
  padding: 24px 28px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(43, 95, 0, 0.08);
  border-radius: var(--radius-xl);
  overflow: hidden;
  cursor: default;
  opacity: 0;
  transform: translateX(40px);
  animation: cardReveal 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  animation-delay: calc(0.8s + var(--index) * 0.1s);
  transition:
    transform 0.4s cubic-bezier(0.23, 1, 0.32, 1),
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

@keyframes cardReveal {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.feature-card:hover {
  transform: translateX(-8px);
  border-color: rgba(43, 95, 0, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.card-glow {
  position: absolute;
  inset: -50%;
  background: radial-gradient(circle at center, rgba(43, 95, 0, 0.15) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.card-glow.active {
  opacity: 1;
}

.card-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 20px;
}

.card-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(43, 95, 0, 0.08);
  border-radius: var(--radius-lg);
  color: var(--acento);
  flex-shrink: 0;
}

.card-icon svg {
  width: 20px;
  height: 20px;
}

.card-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card-value {
  font-family: var(--f-display);
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--texto);
}

.card-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--texto-suave);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  transition: left 0.6s ease;
  pointer-events: none;
}

.feature-card:hover .card-shine {
  left: 100%;
}

/* ─── Bottom Bar ─── */
.hero-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 6vw 32px;
  position: relative;
  z-index: 1;
  opacity: 0;
  animation: fadeIn 1s var(--ease-out) 1.3s forwards;
}

/* Scroll indicator */
.scroll-indicator {
  display: flex;
  align-items: center;
  gap: 12px;
}

.scroll-text {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--texto-suave);
}

.scroll-track {
  width: 1px;
  height: 40px;
  background: var(--borde);
  position: relative;
  overflow: hidden;
}

.scroll-thumb {
  width: 100%;
  height: 12px;
  background: var(--acento);
  animation: scrollThumb 2s ease-in-out infinite;
}

@keyframes scrollThumb {
  0% { transform: translateY(-12px); }
  100% { transform: translateY(40px); }
}

/* Services preview */
.services-preview {
  display: flex;
  gap: 8px;
}

.service-tag {
  padding: 8px 16px;
  background: rgba(43, 95, 0, 0.06);
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 600;
  color: var(--texto);
  transition: background-color 0.3s ease;
}

.service-tag:hover {
  background: rgba(43, 95, 0, 0.12);
}

/* ─── Responsive ─── */
@media (max-width: 1024px) {
  .hero-layout {
    grid-template-columns: 1fr;
    gap: 60px;
    padding: 120px 5vw 40px;
  }

  .hero-cards {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .feature-card {
    flex: 1;
    min-width: 140px;
    transform: translateY(20px);
    animation-name: cardRevealMobile;
  }

  @keyframes cardRevealMobile {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .feature-card:hover {
    transform: translateY(-4px);
  }
}

@media (max-width: 768px) {
  .hero-layout {
    padding: 100px 5vw 32px;
  }

  .char {
    font-size: clamp(2.2rem, 10vw, 3.5rem);
  }

  .description {
    font-size: 16px;
  }

  .actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .btn-magnetic {
    width: 100%;
  }

  .btn-content {
    justify-content: center;
  }

  .hero-bottom {
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
  }

  .services-preview {
    flex-wrap: wrap;
  }

  .floating-shapes {
    display: none;
  }
}

@media (max-width: 480px) {
  .feature-card {
    padding: 18px 20px;
  }

  .card-icon {
    font-size: 24px;
  }

  .card-value {
    font-size: 22px;
  }
}

/* ─── Reduced Motion ─── */
@media (prefers-reduced-motion: reduce) {
  .mesh-gradient,
  .shape {
    transition: none;
    animation: none;
  }

  .eyebrow,
  .char,
  .description,
  .actions,
  .feature-card,
  .hero-bottom {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .eyebrow-dot,
  .scroll-thumb {
    animation: none;
  }

  .btn-bg,
  .btn-icon,
  .link-line,
  .card-shine,
  .feature-card {
    transition: none;
  }
}
</style>

<template>
  <Teleport to="body">
    <Transition name="preloader" @after-leave="onComplete">
      <div v-if="isVisible" class="preloader">
        <!-- Background layers -->
        <div class="preloader-bg">
          <div class="bg-noise"></div>
          <div class="bg-gradient"></div>
          <div class="bg-grid"></div>
        </div>

        <!-- Floating orbs -->
        <div class="orbs">
          <div class="orb orb-1"></div>
          <div class="orb orb-2"></div>
          <div class="orb orb-3"></div>
        </div>

        <!-- Center content -->
        <div class="preloader-center">
          <!-- Logo con glow -->
          <div class="logo-wrapper" :class="{ 'animate': animateIn }">
            <div class="logo-glow"></div>
            <div class="logo-ring">
              <svg viewBox="0 0 100 100">
                <circle
                  class="ring-bg"
                  cx="50" cy="50" r="46"
                  fill="none"
                  stroke-width="1"
                />
                <circle
                  class="ring-progress"
                  cx="50" cy="50" r="46"
                  fill="none"
                  stroke-width="2"
                  :style="{ strokeDashoffset: 289 - (289 * progress) }"
                />
              </svg>
            </div>
            <div class="logo-container">
              <NuxtImg
                src="/images/logosinfondo.png"
                alt="R&J SPA"
                class="logo-img"
                width="120"
                height="33"
                preload
              />
            </div>
          </div>

          <!-- Progress indicator -->
          <div class="progress-section" :class="{ 'animate': animateIn }">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ transform: `scaleX(${progress})` }"></div>
              <div class="progress-glow" :style="{ left: `${progress * 100}%` }"></div>
            </div>
            <div class="progress-info">
              <span class="progress-text">Cargando experiencia</span>
              <span class="progress-percent">{{ Math.round(progress * 100) }}%</span>
            </div>
          </div>
        </div>

        <!-- Bottom branding -->
        <div class="preloader-bottom" :class="{ 'animate': animateIn }">
          <div class="brand-line"></div>
          <span class="brand-text">R&J SPA Constructora</span>
        </div>

        <!-- Corner accents -->
        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const isVisible = ref(true)
const animateIn = ref(false)
const progress = ref(0)

onMounted(() => {
  // Solo mostrar en la primera visita de la sesión
  if (sessionStorage.getItem('siteLoaded')) {
    isVisible.value = false
    document.body.classList.add('preloader-done')
    return
  }

  // Activar animaciones después de un pequeño delay
  requestAnimationFrame(() => {
    animateIn.value = true
  })

  // Simular progreso de carga
  const startTime = performance.now()
  const minDuration = 2000
  const maxDuration = 3000

  const updateProgress = () => {
    const elapsed = performance.now() - startTime
    const naturalProgress = Math.min(elapsed / minDuration, 0.9)

    // Easing suave
    progress.value = easeOutExpo(naturalProgress)

    if (elapsed < minDuration) {
      requestAnimationFrame(updateProgress)
    } else {
      // Esperar a que la página esté lista
      checkPageReady()
    }
  }

  const checkPageReady = () => {
    if (document.readyState === 'complete') {
      finishLoading()
    } else {
      window.addEventListener('load', finishLoading, { once: true })
      // Timeout de seguridad
      setTimeout(finishLoading, maxDuration - minDuration)
    }
  }

  const finishLoading = () => {
    // Animar al 100%
    const animateTo100 = () => {
      progress.value = Math.min(progress.value + 0.05, 1)
      if (progress.value < 1) {
        requestAnimationFrame(animateTo100)
      } else {
        // Delay antes de ocultar
        setTimeout(() => {
          sessionStorage.setItem('siteLoaded', 'true')
          isVisible.value = false
        }, 400)
      }
    }
    requestAnimationFrame(animateTo100)
  }

  requestAnimationFrame(updateProgress)
})

function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
}

function onComplete() {
  document.body.classList.add('preloader-done')
}
</script>

<style scoped>
/* ═══════════════════════════════════════
   VARIABLES - Paleta de colores
   ═══════════════════════════════════════ */
.preloader {
  --negro: #0F0F0F;
  --gris: #202020;
  --verde: #5DD62C;
  --verde-dark: #337418;
  --blanco: #F8F8F8;
  --verde-glow: rgba(93, 214, 44, 0.4);
}

/* ═══════════════════════════════════════
   BASE - Mobile First
   ═══════════════════════════════════════ */
.preloader {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--negro);
  overflow: hidden;
}

/* ═══════════════════════════════════════
   BACKGROUND LAYERS
   ═══════════════════════════════════════ */
.preloader-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Noise texture */
.bg-noise {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

/* Gradient overlay */
.bg-gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 50% 50%, rgba(93, 214, 44, 0.08) 0%, transparent 60%),
    radial-gradient(ellipse 60% 80% at 20% 80%, rgba(51, 116, 24, 0.06) 0%, transparent 50%),
    radial-gradient(ellipse 50% 50% at 80% 20%, rgba(93, 214, 44, 0.04) 0%, transparent 50%);
}

/* Grid pattern */
.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(93, 214, 44, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(93, 214, 44, 0.02) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 70%);
}

/* ═══════════════════════════════════════
   FLOATING ORBS
   ═══════════════════════════════════════ */
.orbs {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0;
  animation: orbFloat 12s ease-in-out infinite;
}

.preloader .orb {
  animation: orbAppear 1s ease-out forwards, orbFloat 12s ease-in-out 1s infinite;
}

.orb-1 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, var(--verde) 0%, transparent 70%);
  top: 10%;
  left: 20%;
  animation-delay: 0s, 1s;
}

.orb-2 {
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, var(--verde-dark) 0%, transparent 70%);
  bottom: 20%;
  right: 15%;
  animation-delay: 0.2s, 1.2s;
}

.orb-3 {
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, var(--verde) 0%, transparent 70%);
  top: 60%;
  left: 60%;
  animation-delay: 0.4s, 1.4s;
}

@keyframes orbAppear {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 0.5; transform: scale(1); }
}

@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(20px, -15px) scale(1.05); }
  50% { transform: translate(-15px, 10px) scale(0.95); }
  75% { transform: translate(10px, 5px) scale(1.02); }
}

/* ═══════════════════════════════════════
   CENTER CONTENT
   ═══════════════════════════════════════ */
.preloader-center {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 0 24px;
  width: 100%;
  max-width: 320px;
}

/* ═══════════════════════════════════════
   LOGO
   ═══════════════════════════════════════ */
.logo-wrapper {
  position: relative;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.logo-wrapper.animate {
  opacity: 1;
  transform: scale(1);
}

.logo-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, var(--verde-glow) 0%, transparent 60%);
  filter: blur(30px);
  opacity: 0;
  animation: glowPulse 2s ease-in-out 0.5s infinite;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

.logo-ring {
  position: absolute;
  inset: 0;
}

.logo-ring svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.ring-bg {
  stroke: var(--gris);
}

.ring-progress {
  stroke: var(--verde);
  stroke-linecap: round;
  stroke-dasharray: 289;
  stroke-dashoffset: 289;
  transition: stroke-dashoffset 0.3s ease-out;
  filter: drop-shadow(0 0 8px var(--verde-glow));
}

.logo-container {
  position: relative;
  z-index: 2;
}

.logo-img {
  width: 80px;
  height: auto;
  filter: brightness(1.1) drop-shadow(0 0 20px var(--verde-glow));
}

/* ═══════════════════════════════════════
   PROGRESS
   ═══════════════════════════════════════ */
.progress-section {
  width: 100%;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s;
}

.progress-section.animate {
  opacity: 1;
  transform: translateY(0);
}

.progress-bar {
  position: relative;
  width: 100%;
  height: 3px;
  background: var(--gris);
  border-radius: 3px;
  overflow: visible;
}

.progress-fill {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--verde-dark), var(--verde));
  border-radius: 3px;
  transform-origin: left;
  transition: transform 0.15s ease-out;
}

.progress-glow {
  position: absolute;
  top: 50%;
  width: 20px;
  height: 20px;
  background: var(--verde);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  filter: blur(10px);
  opacity: 0.8;
  transition: left 0.15s ease-out;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.progress-text {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(248, 248, 248, 0.4);
}

.progress-percent {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: var(--verde);
  letter-spacing: 0.05em;
}

/* ═══════════════════════════════════════
   BOTTOM BRANDING
   ═══════════════════════════════════════ */
.preloader-bottom {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.6s ease-out 0.5s;
}

.preloader-bottom.animate {
  opacity: 1;
}

.brand-line {
  width: 24px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--verde), transparent);
}

.brand-text {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(248, 248, 248, 0.3);
}

/* ═══════════════════════════════════════
   CORNER ACCENTS
   ═══════════════════════════════════════ */
.corner {
  position: absolute;
  width: 40px;
  height: 40px;
  border-color: rgba(93, 214, 44, 0.2);
  border-style: solid;
  border-width: 0;
  opacity: 0;
  animation: cornerAppear 0.5s ease-out 0.8s forwards;
}

@keyframes cornerAppear {
  to { opacity: 1; }
}

.corner-tl {
  top: 20px;
  left: 20px;
  border-top-width: 1px;
  border-left-width: 1px;
}

.corner-tr {
  top: 20px;
  right: 20px;
  border-top-width: 1px;
  border-right-width: 1px;
}

.corner-bl {
  bottom: 20px;
  left: 20px;
  border-bottom-width: 1px;
  border-left-width: 1px;
}

.corner-br {
  bottom: 20px;
  right: 20px;
  border-bottom-width: 1px;
  border-right-width: 1px;
}

/* ═══════════════════════════════════════
   EXIT TRANSITION
   ═══════════════════════════════════════ */
.preloader-leave-active {
  transition: opacity 0.6s ease-out;
}

.preloader-leave-active .preloader-center {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease-out;
}

.preloader-leave-active .orb {
  transition: transform 0.6s ease-out, opacity 0.4s ease-out;
}

.preloader-leave-active .corner {
  transition: opacity 0.3s ease-out;
}

.preloader-leave-to {
  opacity: 0;
}

.preloader-leave-to .preloader-center {
  transform: scale(0.95) translateY(-20px);
  opacity: 0;
}

.preloader-leave-to .orb {
  transform: scale(1.5);
  opacity: 0;
}

.preloader-leave-to .corner {
  opacity: 0;
}

/* ═══════════════════════════════════════
   TABLET (min-width: 640px)
   ═══════════════════════════════════════ */
@media (min-width: 640px) {
  .preloader-center {
    max-width: 360px;
    gap: 40px;
  }

  .logo-wrapper {
    width: 160px;
    height: 160px;
  }

  .logo-img {
    width: 90px;
  }

  .bg-grid {
    background-size: 50px 50px;
  }

  .orb-1 {
    width: 280px;
    height: 280px;
    filter: blur(80px);
  }

  .orb-2 {
    width: 200px;
    height: 200px;
    filter: blur(70px);
  }

  .orb-3 {
    width: 150px;
    height: 150px;
    filter: blur(60px);
  }

  .corner {
    width: 60px;
    height: 60px;
  }

  .corner-tl,
  .corner-tr {
    top: 32px;
  }

  .corner-bl,
  .corner-br {
    bottom: 32px;
  }

  .corner-tl,
  .corner-bl {
    left: 32px;
  }

  .corner-tr,
  .corner-br {
    right: 32px;
  }

  .preloader-bottom {
    bottom: 48px;
  }

  .progress-text {
    font-size: 12px;
  }

  .progress-percent {
    font-size: 16px;
  }
}

/* ═══════════════════════════════════════
   DESKTOP (min-width: 1024px)
   ═══════════════════════════════════════ */
@media (min-width: 1024px) {
  .preloader-center {
    max-width: 400px;
    gap: 48px;
  }

  .logo-wrapper {
    width: 180px;
    height: 180px;
  }

  .logo-img {
    width: 100px;
  }

  .bg-grid {
    background-size: 60px 60px;
  }

  .orb-1 {
    width: 400px;
    height: 400px;
    filter: blur(100px);
  }

  .orb-2 {
    width: 300px;
    height: 300px;
    filter: blur(90px);
  }

  .orb-3 {
    width: 200px;
    height: 200px;
    filter: blur(80px);
  }

  .corner {
    width: 80px;
    height: 80px;
  }

  .corner-tl,
  .corner-tr {
    top: 48px;
  }

  .corner-bl,
  .corner-br {
    bottom: 48px;
  }

  .corner-tl,
  .corner-bl {
    left: 48px;
  }

  .corner-tr,
  .corner-br {
    right: 48px;
  }

  .preloader-bottom {
    bottom: 64px;
  }

  .brand-text {
    font-size: 11px;
    letter-spacing: 0.25em;
  }
}

/* ═══════════════════════════════════════
   REDUCED MOTION
   ═══════════════════════════════════════ */
@media (prefers-reduced-motion: reduce) {
  .orb,
  .logo-glow {
    animation: none;
  }

  .orb {
    opacity: 0.3;
  }

  .logo-wrapper,
  .progress-section,
  .preloader-bottom,
  .corner {
    opacity: 1;
    transform: none;
    transition: none;
    animation: none;
  }

  .preloader-leave-active,
  .preloader-leave-active .preloader-center,
  .preloader-leave-active .orb,
  .preloader-leave-active .corner {
    transition-duration: 0.2s;
  }
}
</style>

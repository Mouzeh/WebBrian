<template>
  <section ref="heroRef" :class="['hero', { entered }]">
    <!-- Imagen de fondo con zoom lento + parallax al hacer scroll -->
    <div class="hero-media" :style="{ transform: `translate3d(0, ${parallax}px, 0)` }">
      <img
        :src="HERO_IMAGEN"
        alt="Casa moderna de dos pisos con grandes ventanales al atardecer"
        class="hero-img"
        fetchpriority="high"
        decoding="async"
      />
    </div>
    <div class="hero-shade"></div>
    <div class="hero-grid" aria-hidden="true"></div>

    <!-- Cortinas que se abren al entrar -->
    <div class="hero-curtains" aria-hidden="true">
      <span v-for="i in 4" :key="i" class="curtain" :style="{ '--c': i - 1 }"></span>
    </div>

    <!-- Contenido -->
    <div class="hero-inner">
      <div class="hero-eyebrow">
        <span class="eyebrow-line"></span>
        <span class="eyebrow-mask">
          <span class="eyebrow-text">Inmobiliaria y Constructora · Región de Los Ríos</span>
        </span>
      </div>

      <h1 class="hero-title">
        <span v-for="(linea, i) in TITULO" :key="i" class="title-mask">
          <span :class="['title-line', { accent: linea.accent }]" :style="{ '--l': i }">{{ linea.texto }}</span>
        </span>
      </h1>

      <p class="hero-desc">
        Diseñamos y construimos casas pensadas para el clima y la vida del sur de Chile.
        Elige uno de nuestros modelos o cuéntanos tu proyecto: te acompañamos desde el plano hasta la entrega de llaves.
      </p>

      <div class="hero-actions">
        <NuxtLink to="/proyectos" class="btn-primario">
          <span>Ver modelos de casas</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </NuxtLink>
        <NuxtLink to="/contacto" class="btn-vidrio">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          <span>Cotizar mi proyecto</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Datos + indicador de scroll -->
    <div class="hero-bottom">

      <a href="#nosotros" class="scroll-cue" @click.prevent="bajar">
        <span>Descubre más</span>
        <span class="scroll-track"><span class="scroll-thumb"></span></span>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
// Imagen de stock (Unsplash). Para usar una foto propia, súbela a /public/images/
// y cambia esta línea por ejemplo a: '/images/hero.jpg'
const HERO_IMAGEN = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80'

const TITULO = [
  { texto: 'Construimos', accent: false },
  { texto: 'la casa donde', accent: false },
  { texto: 'empieza tu historia', accent: true }
]

const heroRef = ref<HTMLElement | null>(null)
const entered = ref(false)
const parallax = ref(0)

// Entrar cuando el preloader del sitio termina (o de inmediato si ya se vio)
let observadorBody: MutationObserver | null = null

function entrar() {
  requestAnimationFrame(() => { entered.value = true })
}

// Parallax suave de la imagen al hacer scroll
let ticking = false
function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const y = window.scrollY
    parallax.value = y < window.innerHeight ? y * 0.3 : parallax.value
    ticking = false
  })
}

function bajar() {
  const siguiente = heroRef.value?.nextElementSibling as HTMLElement | null
  siguiente?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  if (document.body.classList.contains('preloader-done')) {
    entrar()
  } else {
    observadorBody = new MutationObserver(() => {
      if (document.body.classList.contains('preloader-done')) {
        observadorBody?.disconnect()
        entrar()
      }
    })
    observadorBody.observe(document.body, { attributes: true, attributeFilter: ['class'] })
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', onScroll, { passive: true })
  }
})

onBeforeUnmount(() => {
  observadorBody?.disconnect()
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.hero {
  --verde-claro: #86d95a;
  --ease-hero: cubic-bezier(0.16, 1, 0.3, 1);

  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  background: #151411;
  color: white;
  isolation: isolate;
}

/* ─── Imagen ─── */
.hero-media {
  position: absolute;
  inset: -6% 0 0 0;
  z-index: -3;
  will-change: transform;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 60%;
  transform: scale(1.18);
  filter: saturate(0.9) brightness(0.9);
}

.hero.entered .hero-img {
  transform: scale(1.04);
  transition: transform 2.8s var(--ease-hero);
}

.hero-shade {
  position: absolute;
  inset: 0;
  z-index: -2;
  background:
    linear-gradient(90deg, rgba(14, 13, 11, 0.88) 0%, rgba(14, 13, 11, 0.55) 45%, rgba(14, 13, 11, 0.1) 75%),
    linear-gradient(0deg, rgba(14, 13, 11, 0.9) 0%, rgba(14, 13, 11, 0) 45%),
    linear-gradient(180deg, rgba(14, 13, 11, 0.55) 0%, rgba(14, 13, 11, 0) 25%);
}

/* Retícula sutil, guiño a planos de arquitectura */
.hero-grid {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 25% 100%, 100% 25%;
  mask-image: linear-gradient(90deg, black 0%, transparent 60%);
  opacity: 0;
  transition: opacity 1.6s ease 1.2s;
}

.hero.entered .hero-grid {
  opacity: 1;
}

/* ─── Cortinas ─── */
.hero-curtains {
  position: absolute;
  inset: 0;
  z-index: 5;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  pointer-events: none;
}

.curtain {
  background: #151411;
  transform-origin: top;
}

.curtain:nth-child(2n) {
  background: #1b1916;
}

.hero.entered .curtain {
  transform: scaleY(0);
  transition: transform 1.1s var(--ease-hero);
  transition-delay: calc(var(--c) * 0.09s);
}

/* ─── Contenido ─── */
.hero-inner {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: 120px 6vw 32px;
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
}

.eyebrow-line {
  width: 56px;
  height: 2px;
  background: var(--verde-claro);
  transform: scaleX(0);
  transform-origin: left;
}

.eyebrow-mask,
.title-mask {
  display: block;
  overflow: hidden;
}

.eyebrow-mask {
  padding: 2px 0;
}

.eyebrow-text {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
  transform: translateY(110%);
}

.hero-title {
  margin: 0 0 24px;
  font-family: var(--f-display, 'Barlow Condensed', sans-serif);
  font-size: clamp(3rem, 7vw, 6.2rem);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.title-mask {
  padding-bottom: 0.04em;
}

.title-line {
  display: inline-block;
  transform: translateY(105%) rotate(2deg);
  transform-origin: left bottom;
}

.title-line.accent {
  color: var(--verde-claro);
}

.hero-desc {
  max-width: 560px;
  margin: 0 0 32px;
  font-size: clamp(15px, 1.15vw, 17px);
  line-height: 1.7;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.78);
  opacity: 0;
  transform: translateY(20px);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  opacity: 0;
  transform: translateY(20px);
}

.hero-actions svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  flex-shrink: 0;
}

.btn-primario,
.btn-vidrio {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 17px 28px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  transition: transform 0.3s var(--ease-hero), background 0.3s, box-shadow 0.3s, border-color 0.3s;
}

.btn-primario {
  background: var(--verde-claro);
  color: #10200a;
  box-shadow: 0 10px 30px rgba(134, 217, 90, 0.25);
}

.btn-primario:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 40px rgba(134, 217, 90, 0.35);
}

.btn-primario svg {
  transition: transform 0.3s var(--ease-hero);
}

.btn-primario:hover svg {
  transform: translateX(4px);
}

.btn-vidrio {
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  color: white;
}

.btn-vidrio:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.14);
}

/* ─── Parte inferior ─── */
.hero-bottom {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 6vw 36px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 24px;
}








.scroll-cue {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  text-decoration: none;
  opacity: 0;
}

.scroll-cue span:first-child {
  writing-mode: vertical-rl;
}

.scroll-track {
  position: relative;
  width: 2px;
  height: 56px;
  background: rgba(255, 255, 255, 0.18);
  overflow: hidden;
}

.scroll-thumb {
  position: absolute;
  left: 0;
  width: 100%;
  height: 40%;
  background: var(--verde-claro);
  animation: scrollThumb 2s ease-in-out infinite;
}

@keyframes scrollThumb {
  0% { top: -40%; }
  100% { top: 100%; }
}

/* ─── Secuencia de entrada ─── */
.hero.entered .eyebrow-line {
  transform: scaleX(1);
  transition: transform 0.9s var(--ease-hero) 0.55s;
}

.hero.entered .eyebrow-text {
  transform: translateY(0);
  transition: transform 0.9s var(--ease-hero) 0.7s;
}

.hero.entered .title-line {
  transform: translateY(0) rotate(0);
  transition: transform 1.2s var(--ease-hero);
  transition-delay: calc(0.75s + var(--l) * 0.12s);
}

.hero.entered .hero-desc {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 1s ease 1.25s, transform 1s var(--ease-hero) 1.25s;
}

.hero.entered .hero-actions {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 1s ease 1.4s, transform 1s var(--ease-hero) 1.4s;
}



.hero.entered .scroll-cue {
  opacity: 1;
  transition: opacity 1s ease 1.9s;
}

/* ─── Responsive ─── */
@media (max-width: 900px) {
  .hero-shade {
    background:
      linear-gradient(0deg, rgba(14, 13, 11, 0.95) 0%, rgba(14, 13, 11, 0.55) 55%, rgba(14, 13, 11, 0.35) 100%);
  }

  .hero-bottom {
    padding-bottom: 28px;
  }






  .scroll-cue {
    display: none;
  }
}

@media (max-width: 560px) {
  .hero-inner {
    padding-top: 120px;
    padding-bottom: 28px;
  }

  .eyebrow-line {
    width: 28px;
  }

  .eyebrow-text {
    font-size: 10px;
    letter-spacing: 0.16em;
  }

  .hero-desc {
    margin-bottom: 28px;
  }

  .btn-primario,
  .btn-vidrio {
    width: 100%;
    justify-content: center;
  }

  .hero-grid {
    display: none;
  }
}

/* ─── Movimiento reducido ─── */
@media (prefers-reduced-motion: reduce) {
  .hero-img,
  .eyebrow-line,
  .eyebrow-text,
  .title-line,
  .hero-desc,
  .hero-actions,
  .scroll-cue,
  .curtain,
  .hero-grid {
    transition: none !important;
  }

  .hero .hero-img { transform: scale(1.04); }
  .hero .eyebrow-line { transform: scaleX(1); }
  .hero .eyebrow-text,
  .hero .title-line { transform: none; }
  .hero .hero-desc,
  .hero .hero-actions,
  .hero .scroll-cue,
  .hero .hero-grid { opacity: 1; transform: none; }
  .hero .curtain { transform: scaleY(0); }
  .scroll-thumb { animation: none; }
}
</style>

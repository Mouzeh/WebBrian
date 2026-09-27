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
          Proyectos sanitarios, regularizaciones, permisos de edificación, topografía, electricidad y construcción en la Región de Los Ríos.
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
          v-for="(srv, i) in SERVICIOS"
          :id="srv.id"
          :key="srv.id"
          class="service-card"
          :style="{ '--delay': `${i * 0.08}s` }"
        >
          <!-- Fondo que se expande desde el ícono al pasar el cursor -->
          <div class="card-bg" aria-hidden="true"><span class="card-grid"></span></div>

          <span class="card-number" aria-hidden="true">{{ srv.num }}</span>

          <div class="card-top">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true" v-html="srv.icono" />
            </div>
            <span class="card-badge">{{ srv.badge }}</span>
          </div>

          <h2 class="card-title">{{ srv.titulo }}</h2>
          <p class="card-desc">{{ srv.desc }}</p>

          <ul class="card-features">
            <li v-for="(item, j) in srv.items" :key="item.titulo" :style="{ '--j': j }">
              <span class="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" /></svg>
              </span>
              <span class="feature-text">
                <strong>{{ item.titulo }}</strong>
                <small>{{ item.desc }}</small>
              </span>
            </li>
          </ul>

          <a :href="whatsapp(srv.titulo)" target="_blank" rel="noopener" class="card-cta">
            <span>Cotizar este servicio</span>
            <span class="card-cta-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </a>
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
usePaginaSeo({
  titulo: 'Servicios de Construcción en Valdivia | R&J Constructora',
  descripcion: 'Proyectos sanitarios, regularizaciones Ley 20.898, permisos de edificación, topografía, electricidad y construcción en Valdivia y la Región de Los Ríos.'
})

// Servicios compartidos con el inicio y el pie de página (composables/servicios.ts)
const whatsapp = (servicio: string) =>
  `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(`Hola, quiero cotizar el servicio de ${servicio}.`)}`

useSchema(() => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Servicios de R&J Constructora',
  itemListElement: SERVICIOS.map((srv, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: srv.titulo,
      description: srv.desc,
      url: urlAbsoluta(`/servicios#${srv.id}`),
      areaServed: { '@type': 'AdministrativeArea', name: 'Región de Los Ríos' },
      provider: { '@id': urlAbsoluta('/#negocio') },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: srv.titulo,
        itemListElement: srv.items.map(it => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: it.titulo, description: it.desc } }))
      }
    }
  }))
}))

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
  --ease-card: cubic-bezier(0.16, 1, 0.3, 1);
  --verde-claro: #86d95a;

  position: relative;
  display: flex;
  flex-direction: column;
  padding: 36px 32px 30px;
  border: 1px solid var(--borde);
  border-radius: 20px;
  background: white;
  overflow: hidden;
  isolation: isolate;
  scroll-margin-top: 100px;
  opacity: 0;
  transform: translateY(30px);
  transition:
    transform 0.6s var(--ease-card),
    box-shadow 0.6s var(--ease-card),
    border-color 0.4s;
}

.service-card.visible {
  opacity: 1;
  transform: translateY(0);
  animation: card-appear 0.7s var(--ease-card) both;
  animation-delay: var(--delay);
}

@keyframes card-appear {
  from { opacity: 0; transform: translateY(40px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* Fondo oscuro que crece desde el ícono */
.card-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(circle at 20% 0%, rgba(134, 217, 90, 0.18), transparent 55%),
    linear-gradient(160deg, #22201c 0%, #151411 100%);
  clip-path: circle(0% at 60px 64px);
  transition: clip-path 0.8s var(--ease-card);
}

.card-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: linear-gradient(180deg, black, transparent 70%);
}

.card-number {
  position: absolute;
  top: 18px;
  right: 26px;
  font-family: var(--f-display);
  font-size: 72px;
  font-weight: 900;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1.5px var(--borde);
  transition: -webkit-text-stroke-color 0.5s, transform 0.8s var(--ease-card);
}

.card-top {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 22px;
}

.card-icon {
  width: 58px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: var(--acento);
  color: white;
  transition: transform 0.7s var(--ease-card), background 0.4s, color 0.4s, box-shadow 0.4s;
}

.card-icon svg {
  width: 27px;
  height: 27px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.card-badge {
  padding: 5px 11px;
  border-radius: 999px;
  background: #eef5e6;
  color: var(--acento);
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: background 0.4s, color 0.4s;
}

.card-title {
  margin-bottom: 10px;
  font-family: var(--f-display);
  font-size: 26px;
  font-weight: 800;
  line-height: 1.1;
  text-transform: uppercase;
  color: var(--texto);
  transition: color 0.4s;
}

.card-desc {
  margin-bottom: 22px;
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--texto-suave);
  transition: color 0.4s;
}

.card-features {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0 0 26px;
  padding: 18px 0 0;
  border-top: 1px solid var(--borde);
  list-style: none;
  transition: border-color 0.4s;
}

.card-features li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  transition: transform 0.5s var(--ease-card);
  transition-delay: calc(var(--j) * 0.06s);
}

.feature-icon {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
  border-radius: 50%;
  background: #eef5e6;
  color: var(--acento);
  transition: background 0.4s, color 0.4s, transform 0.5s var(--ease-card);
  transition-delay: calc(var(--j) * 0.06s);
}

.feature-icon svg {
  width: 13px;
  height: 13px;
  fill: none;
  stroke: currentColor;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.feature-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.feature-text strong {
  font-size: 14.5px;
  font-weight: 700;
  line-height: 1.35;
  color: var(--texto);
  transition: color 0.4s;
}

.feature-text small {
  font-size: 13px;
  line-height: 1.55;
  color: var(--texto-suave);
  transition: color 0.4s;
}

.card-cta {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding: 14px 14px 14px 20px;
  border: 1px solid var(--borde);
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--texto);
  transition: background 0.4s, border-color 0.4s, color 0.4s;
}

.card-cta-icon {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--acento);
  color: white;
  transition: transform 0.5s var(--ease-card), background 0.4s, color 0.4s;
}

.card-cta-icon svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* ─── Estado hover / foco ─── */
@media (hover: hover) {
  .service-card:hover {
    transform: translateY(-8px);
    border-color: transparent;
    box-shadow: 0 30px 70px -25px rgba(20, 19, 16, 0.55);
  }

  .service-card:hover .card-bg {
    clip-path: circle(150% at 60px 64px);
  }

  .service-card:hover .card-number {
    -webkit-text-stroke-color: rgba(134, 217, 90, 0.55);
    transform: translateY(-4px) scale(1.08);
  }

  .service-card:hover .card-icon {
    transform: rotate(-8deg) scale(1.08);
    background: var(--verde-claro);
    color: #10200a;
    box-shadow: 0 10px 30px rgba(134, 217, 90, 0.35);
  }

  .service-card:hover .card-badge {
    background: rgba(134, 217, 90, 0.14);
    color: var(--verde-claro);
  }

  .service-card:hover .card-title,
  .service-card:hover .feature-text strong {
    color: white;
  }

  .service-card:hover .card-desc,
  .service-card:hover .feature-text small {
    color: rgba(255, 255, 255, 0.65);
  }

  .service-card:hover .card-features {
    border-color: rgba(255, 255, 255, 0.12);
  }

  .service-card:hover .card-features li {
    transform: translateX(6px);
  }

  .service-card:hover .feature-icon {
    background: var(--verde-claro);
    color: #10200a;
    transform: scale(1.12);
  }

  .service-card:hover .card-cta {
    background: var(--verde-claro);
    border-color: var(--verde-claro);
    color: #10200a;
  }

  .service-card:hover .card-cta-icon {
    background: #10200a;
    color: var(--verde-claro);
    transform: rotate(-45deg);
  }
}

.card-cta:focus-visible {
  outline: 2px solid var(--acento);
  outline-offset: 3px;
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

@media (hover: hover) and (pointer: fine) {
  .cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px -10px rgba(74, 124, 35, 0.5);
  }
}

.btn-arrow {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

@media (hover: hover) and (pointer: fine) {
  .cta-button:hover .btn-arrow {
    transform: translateX(4px);
  }
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
    padding: 30px 22px 24px;
  }

  .card-number {
    font-size: 56px;
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

  .card-bg,
  .card-icon,
  .card-features li,
  .feature-icon,
  .card-cta-icon {
    transition: none;
  }

  .decoration-circle {
    animation: none;
  }

  .scroll-arrow {
    animation: none;
  }
}
</style>

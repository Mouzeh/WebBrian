<template>
  <section ref="sectionRef" class="contacto" :class="{ 'is-visible': isVisible }">
    <!-- Hexagonal Grid Background -->
    <div class="contacto-grid">
      <ShapeGrid
        shape="hexagon"
        direction="diagonal"
        :speed="0.3"
        :square-size="55"
        border-color="rgba(28, 26, 23, 0.15)"
        hover-fill-color="rgba(28, 26, 23, 0.3)"
        :hover-trail-amount="6"
      />
    </div>

    <!-- Floating orbs -->
    <div class="contacto-orb orb-1"></div>
    <div class="contacto-orb orb-2"></div>

    <div class="contacto-container">
      <!-- Header -->
      <div class="contacto-header">
        <div class="header-tag">
          <span class="tag-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="tag-text">Contacto</span>
        </div>

        <div class="contacto-title">
          <ClientOnly>
            <WarpText
              text="¿Listo para Comenzar?"
              color="#FFFCF5"
              :warp-strength="0.06"
              :warp-scale="1.8"
              :speed="0.5"
              :pointer-influence="0.45"
              :pointer-strength="0.35"
              :refraction="0.015"
              :ripple="true"
              font-size="clamp(2.5rem, 6vw, 4.5rem)"
              :font-weight="900"
              font-family="var(--f-display)"
              letter-spacing="-0.03em"
              :line-height="1"
              :style="{ height: 'clamp(80px, 12vw, 140px)', width: '100%' }"
            />
          </ClientOnly>
        </div>

        <p class="contacto-desc">
          Estamos aqui para ayudarte con tu proximo proyecto.
          Escribenos por WhatsApp o siguenos en redes sociales.
        </p>
      </div>

      <!-- Main CTA Card -->
      <div class="cta-card glass-card">
        <div class="cta-shine"></div>
        <div class="cta-content">
          <div class="cta-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <div class="cta-text-wrapper">
            <p class="cta-label">Contacto directo</p>
            <p class="cta-main">Escribenos por WhatsApp para una respuesta inmediata</p>
          </div>
          <a
            :href="`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`"
            target="_blank"
            class="btn btn-whatsapp btn-lg"
          >
            <span>WhatsApp</span>
            <svg class="btn-arrow" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Social Links -->
      <div class="social-section">
        <span class="social-label">Siguenos en redes</span>
        <div class="social-icons">
          <a
            href="https://www.instagram.com/constructora_ryj_spa"
            target="_blank"
            title="Instagram"
            class="social-icon glass-icon"
          >
            <span class="icon-glow"></span>
            <svg viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a
            href="https://www.facebook.com/share/1JUpN2AVtu/"
            target="_blank"
            title="Facebook"
            class="social-icon glass-icon"
          >
            <span class="icon-glow"></span>
            <svg viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@constructora_ryj_spa"
            target="_blank"
            title="TikTok"
            class="social-icon glass-icon"
          >
            <span class="icon-glow"></span>
            <svg viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Info Cards -->
      <div class="info-grid">
        <div
          v-for="(info, index) in contactInfo"
          :key="info.label"
          class="info-card"
          :style="{ '--index': index }"
        >
          <div class="card-inner">
            <div class="icon-wrapper">
              <span class="info-icon">
                <svg v-if="info.id === 'location'" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z" stroke="currentColor" stroke-width="1.5"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/>
                </svg>
                <svg v-else-if="info.id === 'phone'" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="1.5"/>
                </svg>
                <svg v-else-if="info.id === 'email'" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M22 6l-10 7L2 6" stroke="currentColor" stroke-width="1.5"/>
                </svg>
              </span>
            </div>
            <div class="info-content">
              <span class="info-label">{{ info.label }}</span>
              <component
                :is="info.href ? 'a' : 'span'"
                :href="info.href"
                class="info-value"
                :title="info.value"
              >
                {{ info.value }}
              </component>
              <span v-if="info.subtext" class="info-subtext">{{ info.subtext }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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

const whatsappNumber = '56959266213'
const whatsappMessage = 'Hola, me gustaria solicitar una cotizacion para mi proyecto.'

const contactInfo = [
  { id: 'location', label: 'Ubicación', value: 'Región de Los Ríos', subtext: 'Chile' },
  { id: 'phone', label: 'Teléfono', value: '+56 9 5926 6213', href: 'tel:+56959266213' },
  { id: 'email', label: 'Email', value: 'inmobiliariayconstructoraryj@gmail.com', href: 'mailto:inmobiliariayconstructoraryj@gmail.com' }
]

</script>

<style scoped>
.contacto {
  position: relative;
  padding: var(--space-3xl) 6vw;
  background: var(--acento);
  overflow: hidden;
}

/* ─── Hexagonal Grid ─── */
.contacto-grid {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.6;
  mask-image: radial-gradient(ellipse 90% 70% at 50% 50%, black 20%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 50%, black 20%, transparent 70%);
}

/* ─── Floating Orbs ─── */
.contacto-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  z-index: 1;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(28, 26, 23, 0.1) 0%, transparent 70%);
  top: -100px;
  right: -100px;
  animation: floatOrb 15s ease-in-out infinite;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
  bottom: -80px;
  left: -80px;
  animation: floatOrb 20s ease-in-out infinite reverse;
}

@keyframes floatOrb {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, -20px) scale(1.05); }
}

/* ─── Container ─── */
.contacto-container {
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: 0 auto;
}

/* ─── Header ─── */
.contacto-header {
  text-align: center;
  margin-bottom: var(--space-2xl);
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
}

.contacto.is-visible .contacto-header {
  opacity: 1;
  transform: translateY(0);
}

.header-tag {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px 10px 12px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-lg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  opacity: 0;
  transform: translateY(20px) scale(0.9);
  transition:
    opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
    transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.contacto.is-visible .header-tag {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.header-tag:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.4);
}

.tag-icon {
  width: 18px;
  height: 18px;
  color: var(--fondo-puro);
  transition: transform 0.3s ease;
}

.header-tag:hover .tag-icon {
  transform: rotate(10deg) scale(1.1);
}

.tag-icon svg {
  width: 100%;
  height: 100%;
}

.tag-text {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fondo-puro);
}

.contacto-title {
  margin-bottom: var(--space-md);
}

.title-word {
  display: block;
  font-family: var(--f-display);
  font-size: clamp(2.8rem, 6vw, 4.5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  color: var(--texto);
}

.title-accent {
  color: var(--fondo-puro);
  text-shadow: 0 2px 30px rgba(255, 255, 255, 0.3);
}

.contacto-desc {
  font-size: 17px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  max-width: 500px;
  margin: 0 auto;
}

/* ─── Glass Card Base ─── */
.glass-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: var(--radius-xl);
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

/* ─── CTA Card ─── */
.cta-card {
  padding: var(--space-xl);
  margin-bottom: var(--space-2xl);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
  transition-delay: 0.15s;
}

.contacto.is-visible .cta-card {
  opacity: 1;
  transform: translateY(0);
}

.cta-shine {
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
  animation: ctaShine 5s ease-in-out infinite;
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
  gap: var(--space-lg);
  flex-wrap: wrap;
}

.cta-icon {
  width: 60px;
  height: 60px;
  background: #25D366;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.3);
}

.cta-icon svg {
  width: 30px;
  height: 30px;
  color: white;
}

.cta-text-wrapper {
  flex: 1;
  min-width: 200px;
}

.cta-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #25D366;
  margin-bottom: 4px;
}

.cta-main {
  font-size: 16px;
  color: var(--texto);
  line-height: 1.5;
}

.btn-arrow {
  width: 18px;
  height: 18px;
  transition: transform var(--duration-fast) var(--ease-out);
}

.btn:hover .btn-arrow {
  transform: translateX(4px);
}

/* ─── Social Section ─── */
.social-section {
  text-align: center;
  margin-bottom: var(--space-2xl);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
  transition-delay: 0.3s;
}

.contacto.is-visible .social-section {
  opacity: 1;
  transform: translateY(0);
}

.social-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: var(--space-md);
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: var(--space-sm);
}

.glass-icon {
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--texto);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition:
    transform var(--duration-fast) var(--ease-spring),
    background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);
}

.glass-icon:hover {
  transform: translateY(-4px);
  background: var(--texto);
  border-color: var(--texto);
  color: var(--fondo);
  box-shadow: var(--shadow-lg);
}

.icon-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, rgba(43, 95, 0, 0.2) 0%, transparent 70%);
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-out);
}

.glass-icon:hover .icon-glow {
  opacity: 1;
}

.glass-icon svg {
  width: 24px;
  height: 24px;
  position: relative;
  z-index: 1;
}

.glass-icon svg path {
  fill: #1C1A17;
  transition: fill 0.2s ease;
}

.glass-icon:hover svg path {
  fill: #FFFCF5;
}

/* ─── Info Grid - Compact Design ─── */
.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
  max-width: 800px;
  margin: 0 auto;
}

.info-card {
  position: relative;
  border-radius: 14px;
  padding: 20px 18px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.5);
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s var(--ease-out),
    transform 0.4s var(--ease-out),
    box-shadow 0.3s ease,
    border-color 0.3s ease;
  transition-delay: calc(0.4s + var(--index) * 0.08s);
  overflow: hidden;
}

.contacto.is-visible .info-card {
  opacity: 1;
  transform: translateY(0);
}

.info-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px -10px rgba(0, 0, 0, 0.12);
  border-color: rgba(74, 124, 35, 0.3);
}

/* Hidden elements - simplified design */
.card-glass,
.card-border,
.card-shine,
.icon-bg,
.card-arrow {
  display: none;
}

/* Card inner content */
.card-inner {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 14px;
}

.icon-wrapper {
  flex-shrink: 0;
}

.info-icon {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(74, 124, 35, 0.1);
  border-radius: 10px;
  color: var(--acento);
  transition: background 0.3s ease, color 0.3s ease;
}

.info-card:hover .info-icon {
  background: var(--acento);
  color: white;
}

.info-icon svg {
  width: 18px;
  height: 18px;
}

/* Content */
.info-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.info-label {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--acento);
  opacity: 0.9;
}

.info-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--texto);
  text-decoration: none;
  transition: color 0.2s ease;
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
}

a.info-value:hover {
  color: var(--acento);
}

.info-subtext {
  font-size: 11px;
  color: var(--texto-suave);
  font-weight: 500;
}

/* ─── Responsive ─── */
@media (max-width: 768px) {
  .contacto {
    padding: var(--space-2xl) 5vw;
  }

  .cta-content {
    flex-direction: column;
    text-align: center;
  }

  .cta-text-wrapper {
    text-align: center;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: var(--space-sm);
  }

  .info-card {
    padding: 16px 14px;
  }
}

/* ─── Reduced Motion ─── */
@media (prefers-reduced-motion: reduce) {
  .contacto-orb {
    animation: none;
  }

  .cta-shine {
    animation: none;
    display: none;
  }

  .contacto-grid {
    display: none;
  }

  .contacto-header,
  .cta-card,
  .social-section,
  .info-card {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .info-card:hover {
    transform: none;
  }

  .glass-icon,
  .btn-arrow {
    transition: none;
  }
}
</style>

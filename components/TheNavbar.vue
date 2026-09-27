<template>
  <nav :class="['navbar', { scrolled: isScrolled, 'menu-open': menuOpen }]">
    <div class="navbar-container">
      <!-- Logo -->
      <NuxtLink to="/" class="navbar-logo">
        <NuxtImg src="/images/logo-horizontal.png" alt="R&J SPA" class="logo-img" width="150" height="56" />
      </NuxtLink>

      <!-- Desktop Navigation -->
      <ul class="navbar-links">
        <li v-for="link in navLinks" :key="link.path">
          <NuxtLink :to="link.path" class="nav-link">
            {{ link.label }}
          </NuxtLink>
        </li>
        <li class="nav-cta-wrapper">
          <NuxtLink to="/contacto" class="nav-cta star-border">
            <!-- Star Border SVG -->
            <svg class="star-border-svg" viewBox="0 0 200 50" preserveAspectRatio="none">
              <defs>
                <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="rgba(43, 95, 0, 0)" />
                  <stop offset="40%" stop-color="rgba(43, 95, 0, 0.2)" />
                  <stop offset="50%" stop-color="#2B5F00" />
                  <stop offset="60%" stop-color="rgba(43, 95, 0, 0.2)" />
                  <stop offset="100%" stop-color="rgba(43, 95, 0, 0)" />
                </linearGradient>
              </defs>
              <rect
                class="star-border-rect"
                x="1"
                y="1"
                width="198"
                height="48"
                rx="24"
                ry="24"
                fill="none"
                stroke-width="2"
              />
            </svg>
            <span class="cta-content">
              <span>Contáctanos</span>
              <span class="cta-arrow">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </span>
          </NuxtLink>
        </li>
      </ul>

      <!-- Mobile Burger -->
      <button
        type="button"
        class="navbar-burger"
        @click="menuOpen = !menuOpen"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'"
      >
        <span class="burger-line"></span>
        <span class="burger-line"></span>
        <span class="burger-line"></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div v-if="menuOpen" id="mobile-menu" class="mobile-menu">
        <div class="mobile-menu-content">
          <NuxtLink
            v-for="(link, index) in [...navLinks, { path: '/contacto', label: 'Contáctanos' }]"
            :key="link.path"
            :to="link.path"
            class="mobile-link"
            :style="{ '--delay': `${index * 0.05}s` }"
            @click="menuOpen = false"
          >
            <span class="mobile-link-number">0{{ index + 1 }}</span>
            <span class="mobile-link-text">{{ link.label }}</span>
            <span class="mobile-link-arrow">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </NuxtLink>
        </div>

        <div class="mobile-footer">
          <a href="tel:+56959266213" class="mobile-contact">
            <span class="contact-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span class="contact-text">+56 9 5926 6213</span>
          </a>
          <a href="https://wa.me/56959266213" target="_blank" rel="noopener" class="mobile-contact whatsapp">
            <span class="contact-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </span>
            <span class="contact-text">WhatsApp</span>
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
const isScrolled = ref(false)
const menuOpen = ref(false)

const { data: config } = useConfiguracion()

const navLinks = computed(() => [
  { path: '/', label: 'Inicio' },
  { path: '/servicios', label: 'Servicios' },
  { path: '/nosotros', label: 'Nosotros' },
  { path: '/proyectos/', label: config.value.mostrar_terminados ? 'Proyectos' : 'Modelos' },
  { path: '/blog', label: 'Blog' }
])

const route = useRoute()
watch(() => route.path, () => {
  menuOpen.value = false
})

const closeOnEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') menuOpen.value = false
}

// Si se agranda la ventana a escritorio con el menú abierto, se cierra
const closeOnDesktop = (e: MediaQueryListEvent) => {
  if (e.matches) menuOpen.value = false
}

let desktopQuery: MediaQueryList | null = null

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
  }
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', closeOnEscape)
  desktopQuery = window.matchMedia('(min-width: 961px)')
  desktopQuery.addEventListener('change', closeOnDesktop)
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('keydown', closeOnEscape)
    desktopQuery?.removeEventListener('change', closeOnDesktop)
    document.body.style.overflow = ''
  })
})

// Prevent body scroll when menu is open
watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>


<style scoped>
/* ══════════════════════════════════════════════════════
   NAVBAR — Mobile First
   Base = móvil. Desde 961px se activa la versión escritorio.
   ══════════════════════════════════════════════════════ */

.navbar {
  --nav-h: 64px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-h);
  z-index: 1000;
}

.navbar::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(247, 244, 239, 0.75);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid rgba(43, 95, 0, 0.08);
  transition:
    background-color var(--duration-normal) var(--ease-out),
    border-color var(--duration-normal) var(--ease-out),
    box-shadow var(--duration-normal) var(--ease-out);
}

.navbar.scrolled::before {
  background: rgba(247, 244, 239, 0.92);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.04);
  border-color: rgba(43, 95, 0, 0.12);
}

.navbar.menu-open::before {
  background: var(--fondo);
  border-color: var(--borde);
  box-shadow: none;
}

.navbar-container {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 max(16px, env(safe-area-inset-right)) 0 max(20px, env(safe-area-inset-left));
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

/* ─── Logo ─── */
.navbar-logo {
  display: flex;
  align-items: center;
  min-width: 0;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  transition: transform var(--duration-fast) var(--ease-out);
}

.navbar-logo:active {
  transform: scale(0.98);
}

.logo-img {
  height: 46px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
}

/* ─── Desktop Links (ocultos en móvil) ─── */
.navbar-links {
  display: none;
  align-items: center;
  gap: 4px;
  list-style: none;
}

.nav-link {
  display: block;
  padding: 10px 18px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--texto-suave);
  border-radius: var(--radius-full);
  position: relative;
  transition:
    color var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out);
}

.nav-link.router-link-active {
  color: var(--acento);
  background: rgba(43, 95, 0, 0.1);
}

/* ─── CTA Button with Star Border ─── */
.nav-cta-wrapper {
  margin-left: 12px;
}

.nav-cta {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 22px;
  background: transparent;
  color: var(--acento);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: var(--radius-full);
  overflow: hidden;
  isolation: isolate;
  transition:
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    color 0.3s ease,
    box-shadow 0.3s ease;
}

.star-border-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.star-border-rect {
  stroke: url(#star-gradient);
  stroke-dasharray: 80 520;
  stroke-dashoffset: 0;
  animation: starBorderMove 6s linear infinite;
}

@keyframes starBorderMove {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -600;
  }
}

/* Subtle inner background */
.nav-cta::before {
  content: '';
  position: absolute;
  inset: 1px;
  background: rgba(43, 95, 0, 0.03);
  border-radius: calc(var(--radius-full) - 1px);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: -1;
}

/* Hover glow effect */
.nav-cta::after {
  content: '';
  position: absolute;
  inset: -2px;
  background: radial-gradient(
    ellipse 80% 50% at 50% 50%,
    rgba(43, 95, 0, 0.15) 0%,
    transparent 70%
  );
  border-radius: var(--radius-full);
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: -2;
}

.nav-cta:active {
  transform: translateY(0) scale(0.98);
  transition-duration: 0.1s;
}

.cta-content {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  z-index: 1;
}

.cta-arrow {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.cta-arrow svg {
  width: 100%;
  height: 100%;
}

/* ─── Burger (visible en móvil) ─── */
.navbar-burger {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  background: rgba(43, 95, 0, 0.06);
  border: none;
  border-radius: var(--radius-lg);
  padding: 12px 11px;
  cursor: pointer;
  z-index: 10;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.navbar-burger:active {
  transform: scale(0.94);
  background: rgba(43, 95, 0, 0.12);
}

.burger-line {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--texto);
  border-radius: 2px;
  transform-origin: center;
  transition:
    transform var(--duration-normal) var(--ease-spring),
    opacity var(--duration-fast) var(--ease-out);
}

/* Líneas separadas 7px (2px alto + 5px gap) → la X queda centrada */
.menu-open .burger-line:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-open .burger-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.menu-open .burger-line:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ─── Mobile Menu ─── */
.mobile-menu {
  position: fixed;
  top: var(--nav-h);
  left: 0;
  right: 0;
  height: calc(100vh - var(--nav-h));
  height: calc(100dvh - var(--nav-h));
  background: var(--fondo);
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding:
    var(--space-lg)
    max(20px, env(safe-area-inset-right))
    max(var(--space-lg), env(safe-area-inset-bottom))
    max(20px, env(safe-area-inset-left));
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

.mobile-menu-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 56px;
  padding: 12px 14px;
  text-decoration: none;
  background: rgba(43, 95, 0, 0.03);
  border: 1px solid rgba(43, 95, 0, 0.06);
  border-radius: var(--radius-lg);
  -webkit-tap-highlight-color: transparent;
  animation: slideIn 0.4s var(--ease-out) backwards;
  animation-delay: var(--delay);
  transition:
    background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.mobile-link:active {
  transform: scale(0.98);
  background: rgba(43, 95, 0, 0.08);
  border-color: rgba(43, 95, 0, 0.15);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.mobile-link-number {
  font-family: var(--f-mono, ui-monospace, monospace);
  font-size: 11px;
  font-weight: 600;
  color: var(--acento);
  padding: 4px 8px;
  background: rgba(43, 95, 0, 0.1);
  border-radius: var(--radius-sm);
}

.mobile-link-text {
  flex: 1;
  min-width: 0;
  font-family: var(--f-display);
  font-size: 20px;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--texto);
  letter-spacing: -0.01em;
  line-height: 1.1;
}

.mobile-link-arrow {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(43, 95, 0, 0.08);
  border-radius: 50%;
  color: var(--acento);
  opacity: 0.5;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.mobile-link-arrow svg {
  width: 16px;
  height: 16px;
}

.mobile-link:active .mobile-link-arrow {
  opacity: 1;
}

.mobile-link.router-link-active {
  background: rgba(43, 95, 0, 0.08);
  border-color: rgba(43, 95, 0, 0.15);
}

.mobile-link.router-link-active .mobile-link-text {
  color: var(--acento);
}

.mobile-link.router-link-active .mobile-link-arrow {
  opacity: 1;
}

.mobile-footer {
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: var(--space-lg);
  border-top: 1px solid var(--borde);
}

.mobile-contact {
  flex: 1 1 140px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 48px;
  padding: 12px 18px;
  background: rgba(43, 95, 0, 0.06);
  border-radius: var(--radius-full);
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color var(--duration-fast) var(--ease-out);
}

.mobile-contact:active {
  background: rgba(43, 95, 0, 0.12);
}

.mobile-contact.whatsapp {
  background: #25D366;
}

.mobile-contact.whatsapp .contact-icon,
.mobile-contact.whatsapp .contact-text {
  color: white;
}

.mobile-contact.whatsapp:active {
  background: #1eb958;
}

.contact-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: var(--acento);
}

.contact-icon svg {
  width: 100%;
  height: 100%;
}

.contact-text {
  font-size: 15px;
  font-weight: 600;
  color: var(--texto);
  white-space: nowrap;
}

/* ─── Transitions ─── */
.mobile-menu-enter-active {
  transition:
    opacity var(--duration-normal) var(--ease-out),
    transform var(--duration-normal) var(--ease-out);
}

.mobile-menu-leave-active {
  transition:
    opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ══════════════════════════════════════════════════════
   BREAKPOINTS (mobile first → escritorio)
   ══════════════════════════════════════════════════════ */

/* Móviles pequeños (≤ 360px) */
@media (max-width: 360px) {
  .logo-img {
    height: 40px;
  }

  .mobile-link-text {
    font-size: 18px;
  }
}

/* Móviles en horizontal: menú más compacto */
@media (max-height: 520px) and (orientation: landscape) {
  .mobile-menu-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .mobile-link {
    min-height: 48px;
    padding: 8px 12px;
  }

  .mobile-link-text {
    font-size: 17px;
  }
}

/* Tablets */
@media (min-width: 600px) {
  .navbar {
    --nav-h: 72px;
  }

  .navbar-container {
    padding: 0 6vw;
  }

  .logo-img {
    height: 56px;
  }

  .mobile-menu {
    padding: var(--space-xl) 6vw;
  }

  .mobile-link {
    padding: 18px 16px;
  }

  .mobile-link-text {
    font-size: 22px;
  }

  .mobile-footer {
    padding-top: var(--space-xl);
  }

  .mobile-contact {
    flex: 0 0 auto;
  }
}

/* Escritorio */
@media (min-width: 961px) {
  .navbar-links {
    display: flex;
  }

  .navbar-burger,
  .mobile-menu {
    display: none;
  }
}

/* Hover solo en dispositivos con puntero (evita hover "pegado" en táctil) */
@media (hover: hover) and (pointer: fine) {
  .navbar-logo:hover {
    transform: scale(1.02);
  }

  .nav-link:hover {
    color: var(--texto);
    background: rgba(43, 95, 0, 0.06);
  }

  .nav-cta:hover .star-border-svg {
    opacity: 1;
  }

  .nav-cta:hover::before {
    background: rgba(43, 95, 0, 0.08);
    transform: scale(1.02);
  }

  .nav-cta:hover::after {
    opacity: 1;
    transform: scale(1.1);
  }

  .nav-cta:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(43, 95, 0, 0.12);
  }

  .nav-cta:hover .cta-arrow {
    transform: translateX(4px);
  }

  .navbar-burger:hover {
    background: rgba(43, 95, 0, 0.1);
  }
}

/* ─── Reduced Motion ─── */
@media (prefers-reduced-motion: reduce) {
  .navbar::before,
  .navbar-logo,
  .nav-link,
  .nav-cta,
  .nav-cta::before,
  .cta-arrow,
  .navbar-burger,
  .burger-line,
  .mobile-link,
  .mobile-link-arrow,
  .mobile-contact {
    transition: none;
  }

  .mobile-link,
  .star-border-rect {
    animation: none;
  }

  .star-border-rect {
    stroke: #2B5F00;
    stroke-dasharray: none;
  }
}
</style>

<template>
  <nav :class="['navbar', { scrolled: isScrolled, 'menu-open': menuOpen }]">
    <div class="navbar-container">
      <!-- Logo -->
      <NuxtLink to="/" class="navbar-logo">
        <NuxtImg src="/images/logosinfondo.png" alt="R&J SPA" class="logo-img" width="160" height="48" />
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
        class="navbar-burger"
        @click="menuOpen = !menuOpen"
        :aria-expanded="menuOpen"
        aria-label="Menú de navegación"
      >
        <span class="burger-line"></span>
        <span class="burger-line"></span>
        <span class="burger-line"></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div v-if="menuOpen" class="mobile-menu">
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
            <span class="contact-text">+56 9 1234 5678</span>
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
  { path: '/proyectos/', label: config.value.mostrar_terminados ? 'Proyectos' : 'Modelos' }
])

const route = useRoute()
watch(() => route.path, () => {
  menuOpen.value = false
})

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})

// Prevent body scroll when menu is open
watch(menuOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
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
  border-color: transparent;
}

.navbar-container {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 6vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* ─── Logo ─── */
.navbar-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: transform var(--duration-fast) var(--ease-out);
}

.navbar-logo:hover {
  transform: scale(1.02);
}

.navbar-logo:active {
  transform: scale(0.98);
}

.logo-img {
  height: 48px;
  width: auto;
  object-fit: contain;
}

/* ─── Desktop Links ─── */
.navbar-links {
  display: flex;
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

.nav-link:hover {
  color: var(--texto);
  background: rgba(43, 95, 0, 0.06);
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

/* Star Border SVG */
.star-border-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.nav-cta:hover .star-border-svg {
  opacity: 1;
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

.nav-cta:active {
  transform: translateY(0) scale(0.98);
  transition-duration: 0.1s;
}

/* Content wrapper */
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

.nav-cta:hover .cta-arrow {
  transform: translateX(4px);
}

/* ─── Burger ─── */
.navbar-burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  background: rgba(43, 95, 0, 0.06);
  border: none;
  border-radius: var(--radius-lg);
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  transition: background-color var(--duration-fast) var(--ease-out);
}

.navbar-burger:hover {
  background: rgba(43, 95, 0, 0.1);
}

.burger-line {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--texto);
  border-radius: 2px;
  transition:
    transform var(--duration-normal) var(--ease-spring),
    opacity var(--duration-fast) var(--ease-out);
}

.menu-open .burger-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-open .burger-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.menu-open .burger-line:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* ─── Mobile Menu ─── */
.mobile-menu {
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--fondo);
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: var(--space-xl) 6vw;
  overflow-y: auto;
}

.mobile-menu-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 16px;
  text-decoration: none;
  background: rgba(43, 95, 0, 0.03);
  border: 1px solid rgba(43, 95, 0, 0.06);
  border-radius: var(--radius-lg);
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
  font-family: var(--f-mono);
  font-size: 11px;
  font-weight: 600;
  color: var(--acento);
  padding: 4px 8px;
  background: rgba(43, 95, 0, 0.1);
  border-radius: var(--radius-sm);
}

.mobile-link-text {
  flex: 1;
  font-family: var(--f-display);
  font-size: 22px;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--texto);
  letter-spacing: -0.01em;
}

.mobile-link-arrow {
  width: 32px;
  height: 32px;
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
  padding-top: var(--space-xl);
  border-top: 1px solid var(--borde);
}

.mobile-contact {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: rgba(43, 95, 0, 0.06);
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: background-color var(--duration-fast) var(--ease-out);
}

.mobile-contact:active {
  background: rgba(43, 95, 0, 0.1);
}

.contact-icon {
  width: 20px;
  height: 20px;
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
}

/* ─── Transitions ─── */
.mobile-menu-enter-active {
  transition: opacity var(--duration-normal) var(--ease-out);
}

.mobile-menu-leave-active {
  transition: opacity var(--duration-fast) var(--ease-out);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

/* ─── Responsive ─── */
@media (max-width: 960px) {
  .navbar-links {
    display: none;
  }

  .navbar-burger {
    display: flex;
  }

  .logo-text {
    display: none;
  }
}

@media (max-width: 480px) {
  .mobile-link-text {
    font-size: 18px;
  }

  .mobile-link {
    padding: 16px 14px;
  }
}

/* ─── Reduced Motion ─── */
@media (prefers-reduced-motion: reduce) {
  .navbar::before,
  .navbar-logo,
  .logo-mark,
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

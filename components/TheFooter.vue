<template>
  <footer class="footer">
    <!-- Accent bar -->
    <div class="footer-accent"></div>

    <div class="footer-container">
      <!-- Main Grid -->
      <div class="footer-grid">
        <!-- Brand Column -->
        <div class="footer-brand">
          <NuxtLink to="/" class="footer-logo">
            <NuxtImg src="/images/logosinfondo.png" alt="R&J SPA" class="logo-img" width="180" height="50" />
          </NuxtLink>

          <p class="footer-tagline">
            Servicios integrales de construccion e inmobiliaria.
            Calidad, profesionalismo y compromiso.
          </p>

          <!-- Social Links -->
          <div class="footer-social">
            <a
              href="https://www.instagram.com/constructora_ryj_spa"
              target="_blank"
              title="Instagram"
              class="social-link"
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/share/1JUpN2AVtu/"
              target="_blank"
              title="Facebook"
              class="social-link"
            >
              <svg viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@constructora_ryj_spa"
              target="_blank"
              title="TikTok"
              class="social-link"
            >
              <svg viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Links Columns -->
        <div class="footer-col">
          <h4 class="col-title">Servicios</h4>
          <ul class="col-links">
            <li v-for="service in services" :key="service.id">
              <NuxtLink :to="`/servicios#${service.id}`">{{ service.corto }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="col-title">Empresa</h4>
          <ul class="col-links">
            <li><NuxtLink to="/">Inicio</NuxtLink></li>
            <li><NuxtLink to="/nosotros">Nosotros</NuxtLink></li>
            <li><NuxtLink to="/proyectos/">{{ config.mostrar_terminados ? 'Proyectos' : 'Modelos' }}</NuxtLink></li>
            <li><NuxtLink to="/blog">Blog</NuxtLink></li>
            <li><NuxtLink to="/contacto">Contacto</NuxtLink></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="col-title">Contacto</h4>
          <ul class="col-links contact-links">
            <li>
              <a href="https://wa.me/56959266213" target="_blank" class="contact-item whatsapp">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
            </li>
            <li>
              <a href="tel:+56959266213" class="contact-item">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="2"/>
                </svg>
                <span>+56 9 5926 6213</span>
              </a>
            </li>
            <li>
              <a href="tel:+56945253552" class="contact-item">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="2"/>
                </svg>
                <span>+56 9 4525 3552</span>
              </a>
            </li>
            <li>
              <a href="mailto:inmobiliariayconstructoraryj@gmail.com" class="contact-item">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2"/>
                  <path d="M22 6l-10 7L2 6" stroke="currentColor" stroke-width="2"/>
                </svg>
                <span>inmobiliariayconstructoraryj@gmail.com</span>
              </a>
            </li>
            <li class="contact-item location">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="2"/>
              </svg>
              <span>Región de Los Ríos, Chile</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <span class="footer-copy">
          © {{ currentYear }} Inmobiliaria y Constructora R&J SPA. Todos los derechos reservados.
        </span>

        <!-- Warp Text - Designed by Mouzeh -->
        <a
          href="https://wa.me/56959266213"
          target="_blank"
          class="warp-text-link"
          title="Contactar al diseñador"
        >
          <ClientOnly>
            <WarpText
              text="Sitio diseñado por Mouzeh"
              color="rgba(255, 255, 255, 0.4)"
              :warp-strength="0.05"
              :warp-scale="1.5"
              :speed="0.4"
              :pointer-influence="0.5"
              :pointer-strength="0.3"
              :refraction="0.012"
              :ripple="true"
              font-size="12px"
              :font-weight="500"
              font-family="inherit"
              letter-spacing="0.02em"
              :line-height="1"
              :style="{ height: '32px', minHeight: '32px', width: '180px' }"
            />
          </ClientOnly>
        </a>

        <div class="footer-legal">
          <NuxtLink to="/terminos">Términos</NuxtLink>
          <span class="legal-divider"></span>
          <NuxtLink to="/privacidad">Privacidad</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
const { data: config } = useConfiguracion()

const services = SERVICIOS.filter(srv => srv.id !== 'construccion')

</script>

<style scoped>
.footer {
  background: var(--texto);
  position: relative;
}

.footer-accent {
  height: 4px;
  background: var(--acento);
}

.footer-container {
  padding: var(--space-2xl) 6vw var(--space-lg);
}

/* ─── Grid ─── */
.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  gap: var(--space-2xl);
  padding-bottom: var(--space-2xl);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

/* ─── Brand ─── */
.footer-brand {
  max-width: 320px;
}

.footer-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-bottom: var(--space-lg);
  transition: opacity var(--duration-fast) var(--ease-out);
}

.footer-logo:hover {
  opacity: 0.9;
}

.footer-logo:active {
  opacity: 0.8;
}

.footer-logo .logo-img {
  height: 50px;
  width: auto;
  object-fit: contain;
  filter: brightness(1.1);
}

.footer-tagline {
  font-size: 14px;
  line-height: 1.7;
  color: var(--borde-medio);
  margin-bottom: var(--space-lg);
}

/* ─── Social ─── */
.footer-social {
  display: flex;
  gap: 8px;
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--borde-medio);
  transition:
    background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.social-link:hover {
  background: var(--acento);
  border-color: var(--acento);
  color: white;
}

.social-link:active {
  transform: scale(0.95);
}

.social-link svg {
  width: 18px;
  height: 18px;
}

.social-link svg path {
  fill: rgba(255, 255, 255, 0.5);
  transition: fill 0.2s ease;
}

.social-link:hover svg path {
  fill: white;
}

/* ─── Columns ─── */
.col-title {
  font-family: var(--f-display);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--fondo);
  margin-bottom: var(--space-lg);
}

.col-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.col-links a {
  font-size: 14px;
  color: var(--borde-medio);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.col-links a:hover {
  color: var(--acento);
}

/* ─── Contact Links ─── */
.contact-links {
  gap: 14px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--borde-medio);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

a.contact-item:hover {
  color: var(--acento);
}

.contact-item svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  opacity: 0.7;
}

.contact-item.whatsapp svg {
  fill: #25D366;
  opacity: 1;
}

.contact-item.location {
  color: rgba(255, 255, 255, 0.4);
}

/* ─── Bottom ─── */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-lg);
  flex-wrap: wrap;
  gap: var(--space-md);
}

.footer-copy {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.3);
}

/* ─── Warp Text Link ─── */
.warp-text-link {
  text-decoration: none;
  display: inline-block;
  transition: transform 0.3s ease;
}

.warp-text-link:hover {
  transform: scale(1.02);
}

.footer-legal {
  display: flex;
  align-items: center;
  gap: 16px;
}

.legal-divider {
  width: 1px;
  height: 12px;
  background: rgba(255, 255, 255, 0.15);
}

.footer-legal a {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.3);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.footer-legal a:hover {
  color: var(--acento);
}

/* ─── Responsive ─── */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
  }

  .footer-brand {
    grid-column: span 2;
    max-width: none;
  }
}

@media (max-width: 640px) {
  .footer-container {
    padding: var(--space-xl) 5vw var(--space-md);
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }

  .footer-brand {
    grid-column: span 1;
  }

  .footer-bottom {
    flex-direction: column;
    gap: var(--space-sm);
    text-align: center;
  }

  .warp-text-link {
    order: -1;
    margin-bottom: var(--space-xs);
  }
}

/* ─── Reduced Motion ─── */
@media (prefers-reduced-motion: reduce) {
  .footer-logo,
  .social-link,
  .col-links a,
  .contact-item,
  .footer-legal a,
  .warp-text-link {
    transition: none;
  }
}
</style>

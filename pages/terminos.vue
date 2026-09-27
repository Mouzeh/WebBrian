<template>
  <div class="legal-page">
    <div class="legal-container">
      <header class="legal-header">
        <NuxtLink to="/" class="back-link">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Volver al inicio</span>
        </NuxtLink>
        <h1>Términos y Condiciones</h1>
        <p class="legal-updated">Última actualización: {{ lastUpdated }}</p>
      </header>

      <article class="legal-content">
        <section>
          <h2>1. Información General</h2>
          <p>
            Estos Términos y Condiciones regulan el uso del sitio web de <strong>Inmobiliaria y Constructora R&J SPA</strong>,
            empresa dedicada a servicios de construcción, instalaciones sanitarias, eléctricas y regularización de propiedades
            en la Región de Los Ríos, Chile.
          </p>
          <p>
            Al acceder y utilizar este sitio web, usted acepta estos términos en su totalidad. Si no está de acuerdo con
            alguna parte de estos términos, le solicitamos que no utilice nuestro sitio web.
          </p>
        </section>

        <section>
          <h2>2. Servicios Ofrecidos</h2>
          <p>Nuestra empresa ofrece los siguientes servicios:</p>
          <ul>
            <li>Proyectos e instalaciones sanitarias (agua potable y alcantarillado)</li>
            <li>Servicios e instalaciones eléctricas con certificación SEC</li>
            <li>Regularización de propiedades bajo Ley N° 20.898 (Ley del Mono)</li>
            <li>Levantamientos topográficos</li>
            <li>Gestión de permisos municipales</li>
            <li>Venta y arriendo de propiedades</li>
          </ul>
          <p>
            La información sobre nuestros servicios publicada en este sitio web es de carácter informativo.
            Las cotizaciones y presupuestos específicos se realizan de manera personalizada según cada proyecto.
          </p>
        </section>

        <section>
          <h2>3. Uso del Sitio Web</h2>
          <p>Al utilizar este sitio web, usted se compromete a:</p>
          <ul>
            <li>No utilizar el sitio para fines ilegales o no autorizados</li>
            <li>No intentar acceder a áreas restringidas del sitio</li>
            <li>No transmitir virus o código malicioso</li>
            <li>Proporcionar información veraz en los formularios de contacto</li>
            <li>Respetar los derechos de propiedad intelectual</li>
          </ul>
        </section>

        <section>
          <h2>4. Propiedad Intelectual</h2>
          <p>
            Todo el contenido de este sitio web, incluyendo pero no limitado a textos, imágenes, logotipos,
            diseños, fotografías y videos, es propiedad de Inmobiliaria y Constructora R&J SPA o de sus
            respectivos propietarios y está protegido por las leyes de propiedad intelectual de Chile.
          </p>
          <p>
            Queda prohibida la reproducción, distribución o modificación del contenido sin autorización
            expresa por escrito.
          </p>
        </section>

        <section>
          <h2>5. Cotizaciones y Presupuestos</h2>
          <p>
            Las cotizaciones proporcionadas a través de este sitio web o por nuestros profesionales tienen
            una validez de 30 días desde su emisión, salvo que se indique lo contrario.
          </p>
          <p>
            Los precios están sujetos a cambios sin previo aviso y pueden variar según las condiciones
            específicas de cada proyecto, ubicación y requerimientos técnicos.
          </p>
        </section>

        <section>
          <h2>6. Garantías</h2>
          <p>
            Todos nuestros trabajos cuentan con garantía según lo establecido en la legislación chilena vigente.
            Las garantías específicas serán detalladas en el contrato de cada servicio.
          </p>
          <p>
            Las instalaciones eléctricas incluyen certificación TE1 emitida por profesionales autorizados
            por la SEC (Superintendencia de Electricidad y Combustibles).
          </p>
        </section>

        <section>
          <h2>7. Limitación de Responsabilidad</h2>
          <p>
            Inmobiliaria y Constructora R&J SPA no se hace responsable de:
          </p>
          <ul>
            <li>Daños derivados del uso incorrecto del sitio web</li>
            <li>Interrupciones temporales del servicio por mantenimiento</li>
            <li>Contenido de sitios web de terceros enlazados</li>
            <li>Decisiones tomadas basándose únicamente en la información del sitio</li>
          </ul>
        </section>

        <section>
          <h2>8. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios
            entrarán en vigor desde su publicación en el sitio web. Le recomendamos revisar esta
            página periódicamente.
          </p>
        </section>

        <section>
          <h2>9. Legislación Aplicable</h2>
          <p>
            Estos términos se rigen por las leyes de la República de Chile. Cualquier disputa será
            sometida a los tribunales competentes de la ciudad de Valdivia, Región de Los Ríos.
          </p>
        </section>

        <section>
          <h2>10. Contacto</h2>
          <p>
            Para consultas sobre estos términos y condiciones, puede contactarnos a través de:
          </p>
          <ul>
            <li>Email: inmobiliariayconstructoraryj@gmail.com</li>
            <li>WhatsApp: +56 9 5926 6213</li>
            <li>Teléfono: +56 9 4525 3552</li>
          </ul>
        </section>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
usePaginaSeo({
  titulo: 'Términos y Condiciones | R&J Constructora',
  descripcion: 'Términos y condiciones de uso del sitio web de Inmobiliaria y Constructora R&J SPA, incluyendo cotizaciones, contenidos y responsabilidades.'
})

const lastUpdated = 'Septiembre 2024'
</script>

<style scoped>
.legal-page {
  min-height: 100vh;
  background: var(--fondo-puro);
  padding: 120px 6vw 80px;
}

.legal-container {
  max-width: 800px;
  margin: 0 auto;
}

.legal-header {
  margin-bottom: 48px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--texto-suave);
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 24px;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: var(--acento);
}

.back-link svg {
  width: 18px;
  height: 18px;
}

.legal-header h1 {
  font-family: var(--f-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  text-transform: uppercase;
  color: var(--texto);
  margin-bottom: 12px;
}

.legal-updated {
  font-size: 14px;
  color: var(--texto-suave);
}

.legal-content {
  font-size: 16px;
  line-height: 1.8;
  color: var(--texto-suave);
}

.legal-content section {
  margin-bottom: 40px;
}

.legal-content h2 {
  font-family: var(--f-display);
  font-size: 20px;
  font-weight: 700;
  color: var(--texto);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--acento);
}

.legal-content p {
  margin-bottom: 16px;
}

.legal-content ul {
  margin: 16px 0;
  padding-left: 24px;
}

.legal-content li {
  margin-bottom: 8px;
  position: relative;
}

.legal-content li::marker {
  color: var(--acento);
}

.legal-content strong {
  color: var(--texto);
  font-weight: 600;
}

@media (max-width: 768px) {
  .legal-page {
    padding: 100px 5vw 60px;
  }
}
</style>

<template>
  <div>
    <!-- Portada / Hero -->
    <HomeHeroSection />

    <!-- Nosotros -->
    <HomeNosotrosSection />

    <!-- Servicios -->
    <HomeServiciosSection />

    <!-- Proyectos terminados (se activa desde el panel de administrador) -->
    <HomeProyectosSection v-if="config.mostrar_terminados" />

    <!-- Modelos de Casas -->
    <HomeModelosSection />

    <!-- Preguntas frecuentes (editables desde el panel) -->
    <HomeFaqSection />

    <!-- Contacto -->
    <HomeContactoSection />
  </div>
</template>

<script setup lang="ts">
import { useReveal } from '~/composables/useReveal'

// SEO
usePaginaSeo({
  titulo: 'Construcción de Casas en Valdivia y Los Ríos | R&J',
  descripcion: 'Inmobiliaria y constructora en la Región de Los Ríos. Modelos de casas listos para construir, proyectos a medida, permisos y regularizaciones. Cotiza sin costo.',
  ruta: '/'
})

const { initReveal } = useReveal()
const { data: config } = await useConfiguracion()

onMounted(() => nextTick(initReveal))
</script>

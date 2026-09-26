<template>
  <div>
    <!-- Portada / Hero -->
    <HomeHeroSection />

    <!-- Nosotros -->
    <HomeNosotrosSection />

    <!-- Servicios -->
    <HomeServiciosSection />

    <!-- Proyectos -->
    <HomeProyectosSection />

    <!-- Modelos de Casas -->
    <HomeModelosSection />

    <!-- Contacto -->
    <HomeContactoSection />
  </div>
</template>

<script setup lang="ts">
import { useReveal } from '~/composables/useReveal'

// SEO
useHead({
  title: 'Construcciones Brian — Servicios Integrales de Construcción',
  meta: [
    {
      name: 'description',
      content: 'Servicios profesionales de construcción: eléctricos, sanitarios, permisos de edificación, topografía y más. Más de 15 años de experiencia en Chile.'
    }
  ]
})

const { initReveal } = useReveal()

onMounted(() => nextTick(initReveal))
</script>

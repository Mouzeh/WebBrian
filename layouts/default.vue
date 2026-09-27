<template>
  <div>
    <!-- Preloader -->
    <ClientOnly>
      <ThePreloader />
    </ClientOnly>

    <!-- Navbar Component -->
    <TheNavbar />

    <!-- Contenido de la página -->
    <main>
      <slot />
    </main>

    <!-- Footer Component -->
    <TheFooter />

    <!-- WhatsApp Floating Button -->
    <WhatsAppButton />
  </div>
</template>

<script setup lang="ts">
import { schemaNegocio, schemaSitioWeb } from '~/composables/negocio'

// Schemas globales: negocio local + sitio web
const siteUrl = (useRuntimeConfig().public.siteUrl as string || '').replace(/\/$/, '')

useHead({
  script: [{
    type: 'application/ld+json',
    key: 'schema-negocio',
    innerHTML: JSON.stringify([schemaNegocio(siteUrl), schemaSitioWeb(siteUrl)])
  }]
})
</script>

<style scoped>
</style>

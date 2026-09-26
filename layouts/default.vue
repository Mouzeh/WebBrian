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
</script>

<style scoped>
</style>

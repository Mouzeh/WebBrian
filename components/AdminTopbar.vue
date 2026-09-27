<template>
  <header class="topbar">
    <div class="topbar-brand">
      <img src="/images/logosinfondo.png" alt="Logo" class="topbar-logo" />
      <div class="topbar-title">
        <strong>Panel de administración</strong>
        <span>{{ subtitulo }}</span>
      </div>
    </div>

    <nav class="topbar-nav" aria-label="Secciones del panel">
      <NuxtLink
        v-for="t in TABS"
        :key="t.to"
        :to="t.to"
        :class="['topbar-tab', { active: route.path.toLowerCase() === t.to.toLowerCase() }]"
      >
        <svg class="ic" viewBox="0 0 24 24" v-html="t.icono" />
        <span>{{ t.label }}</span>
      </NuxtLink>
    </nav>

    <div class="topbar-actions">
      <a href="/" target="_blank" class="topbar-link" title="Ver sitio">
        <svg class="ic" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><path d="M15 3h6v6M10 14L21 3" /></svg>
        <span>Ver sitio</span>
      </a>
      <button type="button" class="topbar-link" title="Cerrar sesión" @click="cerrarSesion">
        <svg class="ic" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><path d="M16 17l5-5-5-5M21 12H9" /></svg>
        <span>Salir</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{ subtitulo?: string }>()

const route = useRoute()
const { cerrarSesion } = useAdminSesion()

const TABS = [
  { to: '/Brian/dashboard', label: 'Proyectos', icono: '<path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>' },
  { to: '/Brian/blog', label: 'Blog', icono: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/>' },
  { to: '/Brian/faq', label: 'Preguntas frecuentes', icono: '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 015.8 1c0 2-3 3-3 3M12 17h.01"/>' }
]
</script>

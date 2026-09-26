<template>
  <a
    :href="`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`"
    target="_blank"
    class="whatsapp-fab"
    :class="{ visible: isVisible }"
    title="Contáctanos por WhatsApp"
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
  >
    <!-- Pulse rings -->
    <span class="pulse-ring"></span>
    <span class="pulse-ring delay"></span>

    <!-- Main button -->
    <span class="fab-button">
      <svg class="fab-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </span>

    <!-- Tooltip -->
    <Transition name="tooltip">
      <span v-if="showTooltip" class="fab-tooltip">
        <span class="tooltip-text">¿Necesitas ayuda?</span>
        <span class="tooltip-arrow"></span>
      </span>
    </Transition>
  </a>
</template>

<script setup lang="ts">
const phoneNumber = '56959266213'
const message = 'Hola, me gustaría solicitar una cotización para mi proyecto.'

const isVisible = ref(false)
const showTooltip = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 1500)

  const handleScroll = () => {
    isVisible.value = window.scrollY > 200
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<style scoped>
.whatsapp-fab {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  opacity: 0;
  transform: scale(0.8) translateY(20px);
  pointer-events: none;
  transition:
    opacity var(--duration-slow) var(--ease-out),
    transform var(--duration-slow) var(--ease-spring);
}

.whatsapp-fab.visible {
  opacity: 1;
  transform: scale(1) translateY(0);
  pointer-events: auto;
}

/* ─── Main Button ─── */
.fab-button {
  position: relative;
  z-index: 3;
  width: 60px;
  height: 60px;
  background: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 4px 16px rgba(37, 211, 102, 0.35),
    0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-normal) var(--ease-out);
}

.whatsapp-fab:hover .fab-button {
  transform: scale(1.08);
  box-shadow:
    0 8px 28px rgba(37, 211, 102, 0.45),
    0 4px 12px rgba(0, 0, 0, 0.1);
}

.whatsapp-fab:active .fab-button {
  transform: scale(0.97);
  box-shadow:
    0 2px 10px rgba(37, 211, 102, 0.3),
    0 1px 4px rgba(0, 0, 0, 0.1);
}

.fab-icon {
  width: 30px;
  height: 30px;
  color: white;
}

/* ─── Pulse Rings ─── */
.pulse-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(37, 211, 102, 0.4);
  animation: pulse-out 2.5s var(--ease-out) infinite;
}

.pulse-ring.delay {
  animation-delay: 1.25s;
}

@keyframes pulse-out {
  0% {
    opacity: 0.6;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.6);
  }
}

/* ─── Tooltip ─── */
.fab-tooltip {
  position: absolute;
  right: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
}

.tooltip-text {
  background: var(--texto);
  color: white;
  padding: 10px 16px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: var(--shadow-lg);
}

.tooltip-arrow {
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-left-color: var(--texto);
}

/* Tooltip Transition */
.tooltip-enter-active,
.tooltip-leave-active {
  transition:
    opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateY(-50%) translateX(8px);
}

.tooltip-enter-to,
.tooltip-leave-from {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

/* ─── Responsive ─── */
@media (max-width: 640px) {
  .whatsapp-fab {
    bottom: 20px;
    right: 20px;
  }

  .fab-button {
    width: 54px;
    height: 54px;
  }

  .fab-icon {
    width: 26px;
    height: 26px;
  }

  .fab-tooltip {
    display: none;
  }
}

/* ─── Reduced Motion ─── */
@media (prefers-reduced-motion: reduce) {
  .whatsapp-fab,
  .fab-button {
    transition: none;
  }

  .pulse-ring {
    animation: none;
    opacity: 0;
  }
}
</style>

<template>
  <!-- Trigger: slot clickeable -->
  <div @click="open(index)" style="cursor:pointer">
    <slot />
  </div>

  <!-- Lightbox overlay -->
  <Teleport to="body">
    <Transition name="lb">
      <div v-if="visible" class="lb-overlay" @click.self="close" @keydown.esc="close" tabindex="0" ref="overlay">

        <!-- Cerrar -->
        <button class="lb-close" aria-label="Cerrar" @click="close"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg></button>

        <!-- Imagen activa -->
        <div class="lb-img-wrap">
          <NuxtImg
            :src="images[current]"
            :alt="`Imagen ${current + 1}`"
            class="lb-img"
            width="1400"
            height="900"
          />
        </div>

        <!-- Flechas -->
        <button v-if="images.length > 1" class="lb-arrow lb-prev" aria-label="Anterior" @click.stop="prev"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg></button>
        <button v-if="images.length > 1" class="lb-arrow lb-next" aria-label="Siguiente" @click.stop="next"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg></button>

        <!-- Contador -->
        <div class="lb-counter">{{ current + 1 }} / {{ images.length }}</div>

        <!-- Thumbnails -->
        <div v-if="images.length > 1" class="lb-thumbs">
          <div
            v-for="(img, i) in images"
            :key="i"
            :class="['lb-thumb', { active: i === current }]"
            @click.stop="current = i"
          >
            <NuxtImg :src="img" :alt="`Miniatura de la imagen ${i + 1}`" width="80" height="60" />
          </div>
        </div>

      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  images: string[]
  index?: number
}>()

const visible = ref(false)
const current = ref(0)
const overlay = ref<HTMLElement>()

function open(i = 0) {
  current.value = i
  visible.value = true
  nextTick(() => overlay.value?.focus())
  document.body.style.overflow = 'hidden'
}

function close() {
  visible.value = false
  document.body.style.overflow = ''
}

function prev() {
  current.value = (current.value - 1 + props.images.length) % props.images.length
}

function next() {
  current.value = (current.value + 1) % props.images.length
}

// Teclado
onMounted(() => {
  window.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
function onKey(e: KeyboardEvent) {
  if (!visible.value) return
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft')  prev()
  if (e.key === 'Escape')     close()
}

// Exponer open para uso externo
defineExpose({ open })
</script>

<style scoped>
.lb-overlay {
  position: fixed; inset: 0; z-index: 9000;
  background: rgba(10, 9, 8, 0.96);
  display: flex; align-items: center; justify-content: center;
  flex-direction: column;
  outline: none;
}

.lb-img-wrap {
  flex: 1; display: flex; align-items: center; justify-content: center;
  width: 100%; padding: 60px 80px 20px;
}
.lb-img {
  max-width: 100%; max-height: 75vh;
  object-fit: contain;
  box-shadow: 0 24px 80px rgba(0,0,0,0.6);
}

.lb-close {
  position: absolute; top: 20px; right: 24px;
  background: none; border: none; color: rgba(255,255,255,0.6);
  font-size: 28px; cursor: pointer; z-index: 10;
  transition: color 0.2s;
  line-height: 1;
}
@media (hover: hover) and (pointer: fine) {
  .lb-close:hover { color: var(--acento); }
}

.lb-arrow {
  position: absolute; top: 50%; transform: translateY(-50%);
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
  color: white; font-size: 36px; line-height: 1;
  width: 52px; height: 52px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.2s, color 0.2s;
}
@media (hover: hover) and (pointer: fine) {
  .lb-arrow:hover { background: var(--acento); border-color: var(--acento); }
}
.lb-prev { left: 20px; }
.lb-next { right: 20px; }

.lb-counter {
  font-size: 12px; font-weight: 600; letter-spacing: 0.15em;
  color: rgba(255,255,255,0.4); text-transform: uppercase;
  margin-bottom: 12px;
}

.lb-thumbs {
  display: flex; gap: 6px; padding: 0 20px 20px;
  overflow-x: auto; max-width: 100%;
}
.lb-thumb {
  width: 72px; height: 52px; flex-shrink: 0; cursor: pointer;
  opacity: 0.45; transition: opacity 0.2s; overflow: hidden;
}
.lb-thumb img { width: 100%; height: 100%; object-fit: cover; }
.lb-thumb.active { opacity: 1; outline: 2px solid var(--acento); }

/* Transición */
.lb-enter-active, .lb-leave-active { transition: opacity 0.25s; }
.lb-enter-from, .lb-leave-to { opacity: 0; }
</style>

<template>
  <section v-if="faqs.length" id="preguntas-frecuentes" class="faq">
    <div class="faq-container">
      <div class="faq-intro">
        <div class="label-row">
          <span class="label-line"></span>
          <span class="label-text">Preguntas frecuentes</span>
        </div>
        <h2 class="faq-title">Resolvemos tus <em>dudas</em></h2>
        <p class="faq-desc">
          Lo que más nos preguntan antes de empezar a construir. Si no encuentras tu respuesta, escríbenos y te respondemos a la brevedad.
        </p>
        <NuxtLink to="/contacto" class="faq-cta">
          Hacer una consulta
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </NuxtLink>
      </div>

      <div class="faq-lista">
        <details
          v-for="(f, i) in faqs"
          :key="f.id"
          class="faq-item"
          :open="abierta === i"
          @toggle="alAbrir(i, $event)"
        >
          <summary>
            <span class="faq-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3>{{ f.pregunta }}</h3>
            <span class="faq-icono" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
            </span>
          </summary>
          <p class="faq-respuesta">{{ f.respuesta }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { getFaqs } = useBlog()
const { data } = await useAsyncData('faqs-publicas', () => getFaqs())
const faqs = computed(() => data.value ?? [])

// Schema FAQPage (rich results)
useHead({
  script: [{
    type: 'application/ld+json',
    key: 'schema-faq',
    innerHTML: () => {
      const schema = schemaFaq(faqs.value)
      return JSON.stringify(schema ?? [])
    }
  }]
})

// Solo una respuesta abierta a la vez
const abierta = ref(0)
function alAbrir(i: number, e: Event) {
  if ((e.target as HTMLDetailsElement).open) abierta.value = i
  else if (abierta.value === i) abierta.value = -1
}
</script>

<style scoped>
.faq {
  padding: 120px 6vw;
  background: var(--fondo);
}

.faq-container {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 70px;
  max-width: 1240px;
  margin: 0 auto;
}

.faq-intro {
  position: sticky;
  top: 110px;
  align-self: start;
}

.label-row { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.label-line { width: 30px; height: 2px; background: var(--acento); }
.label-text { font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--acento); }

.faq-title {
  margin-bottom: 18px;
  font-family: var(--f-display);
  font-size: clamp(40px, 5vw, 64px);
  font-weight: 900;
  line-height: 0.95;
  text-transform: uppercase;
  color: var(--texto);
}

.faq-title em { font-style: normal; color: var(--acento); }

.faq-desc {
  margin-bottom: 28px;
  font-size: 16px;
  line-height: 1.75;
  color: var(--texto-suave);
}

.faq-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 26px;
  border-radius: 999px;
  background: var(--texto);
  color: white;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.2s;
}

.faq-cta:hover { background: var(--acento); }

svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.faq-lista {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-item {
  border: 1px solid var(--borde);
  border-radius: 16px;
  background: var(--fondo-puro);
  transition: border-color 0.25s, box-shadow 0.25s;
}

.faq-item[open] {
  border-color: rgba(43, 95, 0, 0.35);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.06);
}

.faq-item summary {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 22px 24px;
  cursor: pointer;
  list-style: none;
}

.faq-item summary::-webkit-details-marker { display: none; }

.faq-num {
  font-family: var(--f-display);
  font-size: 15px;
  font-weight: 800;
  color: var(--acento);
}

.faq-item h3 {
  flex: 1;
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.4;
  color: var(--texto);
}

.faq-icono {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--fondo);
  color: var(--acento);
  transition: transform 0.3s, background 0.3s, color 0.3s;
}

.faq-item[open] .faq-icono {
  transform: rotate(45deg);
  background: var(--acento);
  color: white;
}

.faq-respuesta {
  margin: 0;
  padding: 0 24px 24px 64px;
  font-size: 16px;
  line-height: 1.8;
  color: var(--texto-suave);
  white-space: pre-line;
}

@media (max-width: 900px) {
  .faq { padding: 80px 20px; }
  .faq-container { grid-template-columns: 1fr; gap: 36px; }
  .faq-intro { position: static; }
  .faq-respuesta { padding: 0 20px 22px; }
  .faq-item summary { padding: 18px 20px; gap: 14px; }
}
</style>

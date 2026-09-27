<template>
  <div>
    <div class="page-hero">
      <template v-if="config.mostrar_terminados">
        <div class="label-row"><div class="label-line"></div><span class="label-text light">Nuestro Trabajo</span></div>
        <h1 class="page-title">Proyectos que<br><em>Hablan</em> Solos</h1>
        <p class="page-desc">Conoce nuestra trayectoria a través de los proyectos que hemos realizado.</p>
      </template>
      <template v-else>
        <div class="label-row"><div class="label-line"></div><span class="label-text light">Diseños Exclusivos</span></div>
        <h1 class="page-title">Modelos de<br><em>Casas</em></h1>
        <p class="page-desc">Descubre nuestros diseños de casas listas para construir.</p>
      </template>
    </div>

    <section class="section">
      <!-- Tabs (solo si la sección de proyectos terminados está activa) -->
      <div v-if="config.mostrar_terminados" class="tabs reveal">
        <button
          :class="['tab', { active: activeTab === 'terminado' }]"
          @click="activeTab = 'terminado'"
        >
          Proyectos Terminados
        </button>
        <button
          :class="['tab', { active: activeTab === 'construccion' }]"
          @click="activeTab = 'construccion'"
        >
          Proyectos para Construir
        </button>
      </div>

      <p v-if="config.mostrar_terminados" class="tab-desc">
        {{ activeTab === 'terminado'
          ? 'Casas que ya construimos y entregamos a nuestros clientes.'
          : 'Diseños y renders de casas listas para construir. Elige tu modelo y lo hacemos realidad.' }}
      </p>

      <div class="proyectos-grid">
        <NuxtLink
          v-for="(p, i) in proyectosActivos"
          :key="p.id"
          :to="`/proyectos/${p.slug}`"
          :class="['proyecto-card reveal', { feat: i === 0 }, `delay-${Math.min(i, 3)}`]"
        >
          <NuxtImg
            :src="imgUrl(p.imagen_portada)"
            :alt="altProyecto(p)"
            class="pcard-img"
          />
          <div class="pcard-overlay"></div>
          <div :class="['pcard-badge', p.categoria]">
            {{ p.categoria === 'construccion' ? 'Render' : 'Terminado' }}
          </div>
          <div class="pcard-content">
            <span class="pcard-tag">{{ p.tipo }} - {{ p.anio }}</span>
            <h3 class="pcard-title">{{ p.titulo }}</h3>
            <div class="pcard-meta">
              <span>{{ p.ubicacion }}</span>
              <span v-if="p.superficie">{{ p.superficie }}</span>
            </div>
            <span class="pcard-link">Ver detalles</span>
          </div>
        </NuxtLink>

        <div v-if="!proyectosActivos.length" class="empty-state">
          <p>
            {{ activeTab === 'terminado'
              ? 'Próximamente proyectos terminados'
              : 'Próximamente proyectos para construir' }}
          </p>
        </div>
      </div>

      <div class="proyectos-cta reveal">
        <NuxtLink to="/contacto" class="btn-secondary">
          Tienes un proyecto en mente?
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { data: config } = await useConfiguracion()

usePaginaSeo(() => config.value.mostrar_terminados
  ? {
      titulo: 'Proyectos de Construcción y Modelos de Casas | R&J Constructora',
      descripcion: 'Casas que ya construimos y modelos listos para construir en Valdivia y la Región de Los Ríos. Revisa superficies, dormitorios, planos y precios.',
      ruta: '/proyectos'
    }
  : {
      titulo: 'Modelos de Casas para Construir en el Sur de Chile | R&J',
      descripcion: 'Modelos de casas listos para construir en Valdivia y la Región de Los Ríos: planos, superficies, dormitorios y precios desde. Elige tu casa y cotiza.',
      ruta: '/proyectos'
    })

const { initReveal } = useReveal()
const { imgUrl, getProyectos } = useProyectos()

const route = useRoute()
const activeTab = ref<'terminado' | 'construccion'>(
  route.query.categoria === 'construccion' || !config.value.mostrar_terminados ? 'construccion' : 'terminado'
)

// Si se oculta la sección de terminados, forzar la pestaña de modelos
watch(() => config.value.mostrar_terminados, (mostrar) => {
  if (!mostrar) activeTab.value = 'construccion'
})

const { data: allProyectos } = await useAsyncData('proyectos-all', () => getProyectos())

const proyectosActivos = computed(() =>
  (allProyectos.value ?? []).filter(p => (p.categoria || 'terminado') === activeTab.value)
)

// Al cambiar de pestaña, animar las nuevas tarjetas
watch(activeTab, () => nextTick(initReveal))

onMounted(() => nextTick(initReveal))
</script>

<style scoped>
.page-hero { padding: 140px 6vw 80px; background: var(--texto); position: relative; overflow: hidden; }
.page-hero::before { content: 'PROYECTOS'; position: absolute; bottom: -20px; right: 4vw; font-family: var(--f-display); font-size: clamp(80px,12vw,160px); font-weight: 900; color: rgba(255,255,255,0.04); pointer-events: none; }
.label-row { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.label-line { width: 30px; height: 2px; background: var(--acento); }
.label-text.light { font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--borde-medio); }
.page-title { font-family: var(--f-display); font-size: clamp(48px,6vw,88px); font-weight: 900; text-transform: uppercase; color: white; line-height: 0.93; margin-bottom: 18px; }
.page-title em { font-style: normal; color: var(--acento); }
.page-desc { font-size: 16px; color: var(--borde-medio); font-weight: 300; max-width: 480px; }

.tabs { display: flex; justify-content: center; gap: 4px; margin-bottom: 40px; }
.tab { background: transparent; border: 1px solid var(--borde); padding: 14px 28px; font-family: var(--f-display); font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--texto-suave); cursor: pointer; transition: all 0.2s; }
.tab:hover { border-color: var(--acento); color: var(--acento); }
.tab.active { background: var(--acento); border-color: var(--acento); color: white; }
.tab-desc { text-align: center; color: var(--texto-suave); font-size: 15px; margin: -20px auto 36px; max-width: 560px; }

.proyectos-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; }

.proyecto-card { position: relative; overflow: hidden; aspect-ratio: 3/4; display: block; text-decoration: none; }
.proyecto-card.feat { grid-column: span 2; aspect-ratio: 16/9; }
.pcard-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s var(--ease); filter: brightness(0.72); }
.proyecto-card:hover .pcard-img { transform: scale(1.06); filter: brightness(0.45); }
.pcard-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(28, 26, 23, 0.95) 0%, transparent 55%); }
.pcard-badge { position: absolute; top: 16px; right: 16px; background: var(--acento); color: white; font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; padding: 6px 12px; }
.pcard-badge.construccion { background: var(--texto); }
.pcard-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 24px; }
.pcard-tag { display: inline-block; background: rgba(255, 255, 255, 0.1); color: white; font-size: 9px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; padding: 4px 10px; margin-bottom: 8px; }
.pcard-title { font-family: var(--f-display); font-size: 26px; font-weight: 800; text-transform: uppercase; color: white; line-height: 1.1; }
.proyecto-card.feat .pcard-title { font-size: 40px; }
.pcard-meta { display: flex; gap: 14px; margin-top: 8px; font-size: 11px; color: var(--borde-medio); }
.pcard-link { display: inline-block; margin-top: 14px; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--acento); opacity: 0; transform: translateY(8px); transition: opacity 0.3s, transform 0.3s; }
.proyecto-card:hover .pcard-link { opacity: 1; transform: translateY(0); }


.empty-state { grid-column: 1 / -1; text-align: center; padding: 80px 20px; color: var(--texto-suave); font-size: 16px; background: var(--fondo-puro); }

.proyectos-cta { text-align: center; margin-top: 50px; }
.btn-secondary { display: inline-flex; align-items: center; gap: 10px; background: transparent; border: 2px solid var(--texto); color: var(--texto); text-decoration: none; padding: 16px 32px; font-family: var(--f-display); font-size: 14px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; transition: all 0.2s; }
.btn-secondary:hover { background: var(--texto); color: var(--fondo); }

@media (max-width: 960px) {
  .proyectos-grid { grid-template-columns: repeat(2, 1fr); }
  .proyecto-card.feat { grid-column: span 2; }
}
@media (max-width: 600px) {
  .proyectos-grid { grid-template-columns: 1fr; }
  .proyecto-card.feat { grid-column: span 1; }
  .tabs { flex-direction: column; }
}
</style>

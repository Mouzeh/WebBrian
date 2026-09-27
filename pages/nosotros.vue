<template>
  <div>
    <div class="page-hero" data-text="NOSOTROS">
      <div class="label-row"><div class="label-line"></div><span class="label-text light">Quiénes somos</span></div>
      <h1 class="page-title">Dos décadas<br><em>construyendo</em><br>confianza</h1>
      <p class="page-desc">Una empresa con historia, valores sólidos y un equipo comprometido con la excelencia.</p>
    </div>

    <!-- Historia -->
    <section class="section">
      <div class="nosotros-grid">
        <div class="reveal">
          <div class="label-row"><div class="label-line"></div><span class="label-text">Nuestra historia</span></div>
          <h2 class="section-title" style="margin-bottom:22px">Más que <em>construir</em>,<br>creamos legado</h2>
          <div class="nosotros-body">
            <p>Fundada en 2005, somos una empresa constructora con amplia trayectoria en el desarrollo de proyectos residenciales y comerciales en todo Chile.</p>
            <p>A lo largo de estos años hemos completado más de 120 proyectos, trabajando con clientes que confían en nuestra experiencia, seriedad y capacidad de resolver cualquier desafío constructivo.</p>
            <p>Contamos con un equipo de profesionales altamente calificados y la mejor maquinaria del mercado para garantizar resultados que superen siempre tus expectativas.</p>
          </div>
          <div style="margin-top:36px">
            <NuxtLink to="/contacto" class="btn-primary">
              Hablemos de tu proyecto
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </NuxtLink>
          </div>
        </div>
        <div class="nosotros-img-wrap reveal delay-2">
          <NuxtImg src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" alt="Equipo de trabajo" width="600" height="500" style="width:100%;height:100%;object-fit:cover" />
          <div class="nosotros-badge"><div class="badge-num">20</div><div class="badge-lbl">Años de<br>experiencia</div></div>
        </div>
      </div>
    </section>

    <!-- Valores -->
    <section class="section" style="padding-top:0">
      <div class="label-row reveal"><div class="label-line"></div><span class="label-text">Lo que nos mueve</span></div>
      <h2 class="section-title reveal delay-1" style="margin-bottom:40px">Nuestros<br><em>Valores</em></h2>
      <div class="valores-grid">
        <div v-for="(v, i) in valores" :key="v.titulo" :class="`valor-item reveal delay-${i}`">
          <div class="valor-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="v.icono" /></div>
          <div class="valor-title">{{ v.titulo }}</div>
          <p class="valor-desc">{{ v.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Brian -->
    <section class="section-dark">
      <div class="label-row reveal"><div class="label-line"></div><span class="label-text light">El fundador</span></div>
      <h2 class="section-title light reveal delay-1" style="margin-bottom:48px">Conoce a<br><em>Brian</em></h2>
      <div class="founder-section">
        <div class="founder-image reveal">
          <div v-if="!equipo[0].foto" class="founder-placeholder">
            <span class="placeholder-icon"><svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
            <span class="placeholder-text">Foto de Brian</span>
          </div>
          <NuxtImg v-else :src="equipo[0].foto" :alt="equipo[0].nombre" width="400" height="520" class="founder-img" />
          <div class="founder-badge">
            <div class="badge-title">Brian</div>
            <div class="badge-sub">Fundador & Director</div>
          </div>
        </div>
        <div class="founder-info reveal delay-1">
          <p>Con una vasta experiencia en el rubro de la construccion, Brian ha liderado proyectos residenciales y comerciales a lo largo de Chile.</p>
          <p>Su compromiso con la calidad y la atencion al detalle ha permitido a Construcciones Brian consolidarse como una empresa de confianza en el mercado.</p>
          <ul class="founder-features">
            <li><span class="feature-check"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg></span> Profesional certificado con experiencia</li>
            <li><span class="feature-check"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg></span> Cumplimiento de normativas SEC y DOM</li>
            <li><span class="feature-check"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg></span> Garantia en todos los trabajos</li>
            <li><span class="feature-check"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg></span> Presupuestos transparentes</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Nosotros — Constructora' })
const { initReveal } = useReveal()
onMounted(() => nextTick(initReveal))

const valores = [
  { icono: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4z"/><path d="M17 5h3v2a3 3 0 01-3 3M7 5H4v2a3 3 0 003 3"/>', titulo: 'Excelencia',    desc: 'Cada detalle importa. Nos exigimos al máximo en cada proyecto, desde los cimientos hasta los acabados.' },
  { icono: '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/>', titulo: 'Compromiso',    desc: 'Cumplimos lo que prometemos. Plazos, presupuestos y calidad acordados son nuestro contrato.' },
  { icono: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>', titulo: 'Transparencia', desc: 'Comunicación clara y honesta en cada etapa. Sin sorpresas, sin letra pequeña.' },
]
const equipo = [
  { nombre: 'Brian',  cargo: 'Fundador & Director',      foto: '' },
]
</script>

<style scoped>
.page-hero { padding: 140px 6vw 80px; background: var(--texto); position: relative; overflow: hidden; }
.page-hero::before { content: 'NOSOTROS'; position: absolute; bottom: -20px; right: 4vw; font-family: var(--f-display); font-size: clamp(80px,12vw,160px); font-weight: 900; color: rgba(255,255,255,0.04); pointer-events: none; }
.label-row { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.label-line { width: 30px; height: 2px; background: var(--acento); }
.label-text { font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--texto-suave); }
.label-text.light { color: var(--borde-medio); }
.page-title { font-family: var(--f-display); font-size: clamp(48px,6vw,88px); font-weight: 900; text-transform: uppercase; color: white; line-height: 0.93; margin-bottom: 18px; }
.page-title em { font-style: normal; color: var(--acento); }
.page-desc { font-size: 16px; color: var(--borde-medio); font-weight: 300; max-width: 480px; }
.section-title { font-family: var(--f-display); font-size: clamp(46px,5.5vw,76px); font-weight: 900; line-height: 0.93; text-transform: uppercase; letter-spacing: -0.02em; color: var(--texto); }
.section-title.light { color: var(--fondo); }
.section-title em { font-style: normal; color: var(--acento); }
.nosotros-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.nosotros-body { font-size: 16px; line-height: 1.8; color: var(--texto-suave); font-weight: 300; }
.nosotros-body p+p { margin-top: 16px; }
.nosotros-img-wrap { position: relative; height: 500px; }
.nosotros-badge { position: absolute; bottom: -24px; right: -24px; width: 136px; height: 136px; background: var(--acento); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
.badge-num { font-family: var(--f-display); font-size: 50px; font-weight: 900; color: white; line-height: 1; }
.badge-lbl { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.7); margin-top: 4px; }
.btn-primary { display: inline-flex; align-items: center; gap: 10px; background: var(--texto); color: var(--fondo); text-decoration: none; padding: 15px 28px; font-family: var(--f-display); font-size: 14px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; transition: background 0.2s, transform 0.2s; }
.btn-primary:hover { background: var(--acento); transform: translateY(-2px); }
.valores-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; background: var(--borde); }
.valor-item { background: var(--fondo-puro); padding: 40px 32px; }
.valor-icon { width: 36px; height: 36px; color: var(--acento); margin-bottom: 18px; }
.valor-icon svg { width: 100%; height: 100%; }
.valor-title { font-family: var(--f-display); font-size: 24px; font-weight: 800; text-transform: uppercase; color: var(--texto); margin-bottom: 10px; }
.valor-desc { font-size: 14px; line-height: 1.7; color: var(--texto-suave); font-weight: 300; }
.section-dark { background: var(--texto); padding: 110px 6vw; }
.founder-section { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; max-width: 1000px; }
.founder-image { position: relative; }
.founder-placeholder { aspect-ratio: 3/4; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; }
.placeholder-icon { display: inline-flex; opacity: 0.3; }
.placeholder-text { font-size: 14px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--borde-medio); }
.founder-img { width: 100%; aspect-ratio: 3/4; object-fit: cover; }
.founder-badge { position: absolute; bottom: -20px; left: -20px; background: var(--acento); padding: 20px 28px; }
.badge-title { font-family: var(--f-display); font-size: 24px; font-weight: 900; color: white; text-transform: uppercase; }
.badge-sub { font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.7); margin-top: 2px; }
.founder-info p { font-size: 16px; line-height: 1.8; color: var(--borde-medio); font-weight: 300; margin-bottom: 16px; }
.founder-features { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
.founder-features li { display: flex; align-items: center; gap: 12px; font-size: 14px; color: var(--fondo); }
.feature-check { width: 24px; height: 24px; background: var(--acento); color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; }
@media (max-width: 960px) {
  .nosotros-grid { grid-template-columns: 1fr; }
  .valores-grid { grid-template-columns: 1fr 1fr; }
  .founder-section { grid-template-columns: 1fr; max-width: 500px; margin: 0 auto; }
  .founder-image { order: -1; }
}
@media (max-width: 600px) {
  .valores-grid { grid-template-columns: 1fr; }
}
</style>

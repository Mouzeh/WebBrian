<template>
  <section class="modelos-section">
    <div class="modelos-header">
      <div class="label-row reveal">
        <div class="label-line"></div>
        <span class="label-text">Diseños Exclusivos</span>
      </div>
      <h2 class="section-title reveal delay-1">
        Modelos de<br><em>Casas</em>
      </h2>
      <p class="modelos-intro reveal delay-2">
        Descubre nuestros diseños de casas listas para construir.
        Cada modelo está pensado para maximizar el espacio y la funcionalidad.
      </p>
    </div>

    <div class="modelos-grid">
      <div
        v-for="(modelo, i) in modelos"
        :key="modelo.nombre"
        :class="['modelo-card reveal', `delay-${i % 3}`]"
      >
        <div class="modelo-image">
          <NuxtImg
            :src="modelo.imagen"
            :alt="modelo.nombre"
            width="600"
            height="400"
          />
          <div class="modelo-overlay">
            <button class="btn-ver" @click="verModelo(modelo)">
              Ver Planos
            </button>
          </div>
        </div>
        <div class="modelo-info">
          <h3 class="modelo-nombre">{{ modelo.nombre }}</h3>
          <div class="modelo-specs">
            <div class="spec">
              <span class="spec-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                  <path d="M3 9h18M9 21V9" stroke="currentColor" stroke-width="2"/>
                </svg>
              </span>
              <span class="spec-value">{{ modelo.superficie }}</span>
            </div>
            <div class="spec">
              <span class="spec-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14" stroke="currentColor" stroke-width="2"/>
                  <path d="M3 15h18" stroke="currentColor" stroke-width="2"/>
                  <path d="M7 15V9h4v6M13 15V9h4v6" stroke="currentColor" stroke-width="2"/>
                </svg>
              </span>
              <span class="spec-value">{{ modelo.habitaciones }} Hab.</span>
            </div>
            <div class="spec">
              <span class="spec-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 12V7a2 2 0 012-2h12a2 2 0 012 2v5" stroke="currentColor" stroke-width="2"/>
                  <path d="M2 12h20v5a2 2 0 01-2 2H4a2 2 0 01-2-2v-5z" stroke="currentColor" stroke-width="2"/>
                  <path d="M6 12V9a2 2 0 012-2h8a2 2 0 012 2v3" stroke="currentColor" stroke-width="2"/>
                </svg>
              </span>
              <span class="spec-value">{{ modelo.banos }} Banos</span>
            </div>
          </div>
          <p class="modelo-desc">{{ modelo.descripcion }}</p>
          <div class="modelo-price">
            <span class="price-label">Desde</span>
            <span class="price-value">{{ modelo.precio }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="modelos-cta reveal">
      <p class="cta-text">¿Tienes tu propio diseño? También construimos proyectos personalizados</p>
      <NuxtLink to="/contacto" class="btn-primary">
        Consultar Proyecto Personalizado
        <IconArrow />
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const modelos = [
  {
    nombre: 'Casa Modelo A',
    superficie: '85 m²',
    habitaciones: 3,
    banos: 2,
    descripcion: 'Diseño moderno de un piso, ideal para familias pequeñas. Living comedor integrado y cocina americana.',
    precio: 'UF 1.800',
    imagen: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80'
  },
  {
    nombre: 'Casa Modelo B',
    superficie: '120 m²',
    habitaciones: 4,
    banos: 3,
    descripcion: 'Casa de dos pisos con amplios espacios. Suite principal en segundo piso con walking closet.',
    precio: 'UF 2.500',
    imagen: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80'
  },
  {
    nombre: 'Casa Modelo C',
    superficie: '150 m²',
    habitaciones: 5,
    banos: 3,
    descripcion: 'Diseño premium con quincho integrado. Ideal para terrenos amplios. Estacionamiento para 2 vehículos.',
    precio: 'UF 3.200',
    imagen: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80'
  }
]

function verModelo(modelo: typeof modelos[0]) {
  // TODO: Abrir modal con planos del modelo
  console.log('Ver modelo:', modelo.nombre)
}
</script>

<style scoped>
.modelos-section {
  padding: 120px 6vw;
  background: var(--fondo);
}

.modelos-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 60px;
}

.label-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
}

.label-line {
  width: 30px;
  height: 2px;
  background: var(--acento);
}

.label-text {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--texto-suave);
}

.section-title {
  font-family: var(--f-display);
  font-size: clamp(46px, 5.5vw, 76px);
  font-weight: 900;
  line-height: 0.93;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: var(--texto);
}

.section-title em {
  font-style: normal;
  color: var(--acento);
}

.modelos-intro {
  font-size: 16px;
  line-height: 1.7;
  color: var(--texto-suave);
  font-weight: 300;
  margin-top: 20px;
}

.modelos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.modelo-card {
  background: var(--fondo-puro);
  border: 1px solid var(--borde);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.modelo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
}

.modelo-image {
  position: relative;
  overflow: hidden;
}

.modelo-image img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.5s var(--ease);
}

.modelo-card:hover .modelo-image img {
  transform: scale(1.05);
}

.modelo-overlay {
  position: absolute;
  inset: 0;
  background: rgba(28, 26, 23, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.modelo-card:hover .modelo-overlay {
  opacity: 1;
}

.btn-ver {
  background: var(--acento);
  color: white;
  border: none;
  padding: 12px 24px;
  font-family: var(--f-display);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-ver:hover {
  opacity: 0.9;
}

.modelo-info {
  padding: 28px;
}

.modelo-nombre {
  font-family: var(--f-display);
  font-size: 22px;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--texto);
  margin-bottom: 16px;
}

.modelo-specs {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}

.spec {
  display: flex;
  align-items: center;
  gap: 6px;
}

.spec-icon {
  width: 16px;
  height: 16px;
  color: var(--acento);
}

.spec-icon svg {
  width: 100%;
  height: 100%;
}

.spec-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--texto);
}

.modelo-desc {
  font-size: 14px;
  line-height: 1.7;
  color: var(--texto-suave);
  font-weight: 300;
  margin-bottom: 20px;
}

.modelo-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid var(--borde);
}

.price-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--texto-suave);
}

.price-value {
  font-family: var(--f-display);
  font-size: 28px;
  font-weight: 900;
  color: var(--acento);
}

.modelos-cta {
  text-align: center;
  margin-top: 60px;
  padding: 50px;
  background: var(--texto);
}

.cta-text {
  font-size: 16px;
  color: var(--borde-medio);
  margin-bottom: 24px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--acento);
  color: white;
  text-decoration: none;
  padding: 16px 32px;
  font-family: var(--f-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: opacity 0.2s, transform 0.2s;
  border: none;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

@media (max-width: 960px) {
  .modelos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .modelos-grid {
    grid-template-columns: 1fr;
  }
  .modelo-specs {
    flex-wrap: wrap;
    gap: 12px;
  }
}
</style>

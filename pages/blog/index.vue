<template>
  <div>
    <header class="page-hero">
      <div class="label-row"><div class="label-line"></div><span class="label-text">Blog</span></div>
      <h1 class="page-title">Guías para construir<br><em>tu casa</em> en el sur</h1>
      <p class="page-desc">
        Consejos prácticos sobre diseño, permisos, materiales y costos para construir en Valdivia y la Región de Los Ríos.
      </p>
    </header>

    <section class="blog-section">
      <!-- Categorías -->
      <nav v-if="categorias.length > 1" class="categorias" aria-label="Categorías del blog">
        <button
          v-for="c in ['Todas', ...categorias]"
          :key="c"
          type="button"
          :class="['categoria', { active: categoriaActiva === c }]"
          @click="categoriaActiva = c"
        >
          {{ c }}
        </button>
      </nav>

      <div v-if="postsFiltrados.length" class="posts-grid">
        <article
          v-for="(post, i) in postsFiltrados"
          :key="post.id"
          :class="['post-card', { destacado: i === 0 && categoriaActiva === 'Todas' }]"
        >
          <NuxtLink :to="`/blog/${post.slug}`" class="post-link">
            <div class="post-media">
              <img
                v-if="post.imagen_portada"
                :src="imgUrl(post.imagen_portada)"
                :alt="post.imagen_alt || post.titulo"
                loading="lazy"
                decoding="async"
              />
              <span v-if="post.categoria" class="post-cat">{{ post.categoria }}</span>
            </div>
            <div class="post-body">
              <div class="post-meta">
                <time :datetime="post.publicado_at">{{ formatoFecha(post.publicado_at || post.created_at) }}</time>
                <span>·</span>
                <span>{{ tiempoLectura(post.contenido).minutos }} min de lectura</span>
              </div>
              <h2 class="post-title">{{ post.titulo }}</h2>
              <p v-if="post.resumen" class="post-excerpt">{{ post.resumen }}</p>
              <span class="post-more">
                Leer artículo
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </div>
          </NuxtLink>
        </article>
      </div>

      <div v-else class="vacio">
        <p>Muy pronto publicaremos nuestras primeras guías.</p>
      </div>

      <!-- CTA -->
      <aside class="blog-cta">
        <div>
          <h2>¿Estás pensando en construir?</h2>
          <p>Revisa nuestros modelos de casas o cuéntanos tu proyecto y te ayudamos a planificarlo.</p>
        </div>
        <div class="blog-cta-botones">
          <NuxtLink to="/proyectos" class="btn-cta primario">Ver modelos de casas</NuxtLink>
          <NuxtLink to="/contacto" class="btn-cta">Cotizar mi proyecto</NuxtLink>
        </div>
      </aside>
    </section>
  </div>
</template>

<script setup lang="ts">
usePaginaSeo({
  titulo: 'Blog de Construcción de Casas en el Sur de Chile | R&J',
  descripcion: 'Guías y consejos para construir tu casa en Valdivia y la Región de Los Ríos: diseño, permisos de edificación, materiales, costos y plazos.',
  ruta: '/blog'
})

const { imgUrl } = useProyectos()
const { getPosts } = useBlog()

const { data: posts } = await useAsyncData('blog-posts', () => getPosts())

useSchema(() => [
  schemaMigas([
    { nombre: 'Inicio', ruta: '/' },
    { nombre: 'Blog', ruta: '/blog' }
  ]),
  {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog de R&J Constructora',
    url: urlAbsoluta('/blog'),
    inLanguage: 'es-CL',
    blogPost: (posts.value ?? []).map(p => ({
      '@type': 'BlogPosting',
      headline: p.titulo,
      url: urlAbsoluta(`/blog/${p.slug}`),
      datePublished: p.publicado_at || p.created_at
    }))
  }
])

const categorias = computed(() =>
  [...new Set((posts.value ?? []).map(p => p.categoria).filter(Boolean) as string[])]
)
const categoriaActiva = ref('Todas')

const postsFiltrados = computed(() =>
  (posts.value ?? []).filter(p => categoriaActiva.value === 'Todas' || p.categoria === categoriaActiva.value)
)
</script>

<style scoped>
.page-hero {
  position: relative;
  overflow: hidden;
  padding: 150px 6vw 80px;
  background: var(--texto);
}

.page-hero::before {
  content: 'BLOG';
  position: absolute;
  right: 4vw;
  bottom: -20px;
  font-family: var(--f-display);
  font-size: clamp(80px, 12vw, 160px);
  font-weight: 900;
  color: rgba(255, 255, 255, 0.04);
  pointer-events: none;
}

.label-row { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.label-line { width: 30px; height: 2px; background: #86d95a; }
.label-text { font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--borde-medio); }

.page-title {
  margin-bottom: 18px;
  font-family: var(--f-display);
  font-size: clamp(44px, 6vw, 84px);
  font-weight: 900;
  line-height: 0.95;
  text-transform: uppercase;
  color: white;
}

.page-title em { font-style: normal; color: #86d95a; }

.page-desc {
  max-width: 560px;
  font-size: 17px;
  line-height: 1.7;
  font-weight: 300;
  color: var(--borde-medio);
}

.blog-section {
  max-width: 1240px;
  margin: 0 auto;
  padding: 60px 6vw 100px;
}

/* Categorías */
.categorias {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 36px;
}

.categoria {
  padding: 9px 18px;
  border: 1px solid var(--borde);
  border-radius: 999px;
  background: transparent;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--texto-suave);
  cursor: pointer;
  transition: all 0.2s;
}

@media (hover: hover) and (pointer: fine) {
  .categoria:hover { border-color: var(--acento); color: var(--acento); }
}
.categoria.active { background: var(--acento); border-color: var(--acento); color: white; }

/* Tarjetas */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.post-card {
  border: 1px solid var(--borde);
  border-radius: 18px;
  overflow: hidden;
  background: var(--fondo-puro);
  transition: transform 0.35s var(--ease-out), box-shadow 0.35s;
}

@media (hover: hover) and (pointer: fine) {
  .post-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
  }
}

.post-card.destacado {
  grid-column: span 3;
}

.post-card.destacado .post-link {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
}

.post-link {
  display: block;
  height: 100%;
  color: inherit;
  text-decoration: none;
}

.post-media {
  position: relative;
  aspect-ratio: 16 / 10;
  background: linear-gradient(135deg, #2b5f00, #1c1a17);
  overflow: hidden;
}

.post-card.destacado .post-media { aspect-ratio: auto; min-height: 340px; }

.post-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .post-card:hover .post-media img { transform: scale(1.05); }
}

.post-cat {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--acento);
}

.post-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px 26px 28px;
}

.post-card.destacado .post-body { justify-content: center; padding: 40px; }

.post-meta {
  display: flex;
  gap: 8px;
  font-size: 13px;
  color: var(--texto-suave);
}

.post-title {
  font-family: var(--f-display);
  font-size: 26px;
  font-weight: 800;
  line-height: 1.1;
  text-transform: uppercase;
  color: var(--texto);
}

.post-card.destacado .post-title { font-size: 38px; }

.post-excerpt {
  font-size: 15px;
  line-height: 1.7;
  color: var(--texto-suave);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--acento);
}

.post-more svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.3s;
}

@media (hover: hover) and (pointer: fine) {
  .post-card:hover .post-more svg { transform: translateX(4px); }
}

.vacio {
  padding: 80px 20px;
  border: 1px dashed var(--borde);
  border-radius: 18px;
  text-align: center;
  color: var(--texto-suave);
}

/* CTA */
.blog-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-top: 70px;
  padding: 44px 48px;
  border-radius: 22px;
  background: var(--texto);
  color: white;
}

.blog-cta h2 {
  margin-bottom: 8px;
  font-family: var(--f-display);
  font-size: 34px;
  font-weight: 900;
  text-transform: uppercase;
}

.blog-cta p { color: rgba(255, 255, 255, 0.7); max-width: 480px; line-height: 1.6; }

.blog-cta-botones { display: flex; gap: 12px; flex-wrap: wrap; }

.btn-cta {
  padding: 15px 24px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: white;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.2s;
}

@media (hover: hover) and (pointer: fine) {
  .btn-cta:hover { border-color: white; }
}
.btn-cta.primario { background: #86d95a; border-color: #86d95a; color: #10200a; }

@media (max-width: 960px) {
  .posts-grid { grid-template-columns: repeat(2, 1fr); }
  .post-card.destacado { grid-column: span 2; }
  .post-card.destacado .post-link { grid-template-columns: 1fr; }
  .post-card.destacado .post-media { min-height: 0; aspect-ratio: 16 / 9; }
  .blog-cta { flex-direction: column; align-items: flex-start; padding: 32px; }
}

@media (max-width: 600px) {
  .page-hero { padding: 120px 20px 56px; }
  .blog-section { padding: 40px 16px 70px; }
  .posts-grid { grid-template-columns: 1fr; }
  .post-card.destacado { grid-column: span 1; }
  .post-card.destacado .post-body { padding: 24px; }
  .post-card.destacado .post-title { font-size: 28px; }
  .btn-cta { width: 100%; text-align: center; }
}
</style>

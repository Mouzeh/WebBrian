<template>
  <div v-if="post" class="post-page">
    <!-- Encabezado -->
    <header class="post-hero">
      <nav class="migas" aria-label="Ruta de navegación">
        <NuxtLink to="/">Inicio</NuxtLink>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
        <NuxtLink to="/blog">Blog</NuxtLink>
        <template v-if="post.categoria">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
          <span>{{ post.categoria }}</span>
        </template>
      </nav>

      <h1 class="post-title">{{ post.titulo }}</h1>

      <div class="post-meta">
        <span class="meta-item">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
          <time :datetime="post.publicado_at || post.created_at">{{ formatoFecha(post.publicado_at || post.created_at) }}</time>
        </span>
        <span class="meta-item">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
          {{ lectura.minutos }} min de lectura
        </span>
        <span class="meta-item">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          {{ post.autor || NEGOCIO.marca }}
        </span>
      </div>
    </header>

    <figure v-if="post.imagen_portada" class="post-cover">
      <img
        :src="imgUrl(post.imagen_portada)"
        :alt="post.imagen_alt || post.titulo"
        fetchpriority="high"
        decoding="async"
      />
    </figure>

    <div class="post-layout">
      <article class="post-article">
        <!-- TL;DR / Puntos clave -->
        <aside v-if="post.resumen || post.puntos_clave?.length" class="tldr" aria-label="Resumen del artículo">
          <div class="tldr-head">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
            <span>En resumen</span>
          </div>
          <p v-if="post.resumen" class="tldr-texto">{{ post.resumen }}</p>
          <ul v-if="post.puntos_clave?.length" class="tldr-lista">
            <li v-for="punto in post.puntos_clave" :key="punto">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
              <span>{{ punto }}</span>
            </li>
          </ul>
        </aside>

        <!-- Contenido: primer párrafo + CTA + resto -->
        <div class="contenido" v-html="partes[0]"></div>

        <aside class="cta-inline">
          <div class="cta-inline-texto">
            <strong>{{ post.cta_titulo || '¿Quieres construir tu casa en el sur?' }}</strong>
            <span>{{ post.cta_texto || 'Te asesoramos sin costo: revisamos tu terreno, presupuesto y el modelo que mejor se adapta a tu familia.' }}</span>
          </div>
          <div class="cta-inline-botones">
            <NuxtLink to="/contacto" class="btn primario">Cotizar gratis</NuxtLink>
            <a :href="whatsappLink" target="_blank" rel="noopener" class="btn">
              WhatsApp
            </a>
          </div>
        </aside>

        <div class="contenido" v-html="partes[1]"></div>

        <!-- Preguntas frecuentes del artículo -->
        <section v-if="post.faqs?.length" class="post-faq">
          <h2 id="preguntas-frecuentes">Preguntas frecuentes</h2>
          <details v-for="(f, i) in post.faqs" :key="i" class="faq-item" :open="i === 0">
            <summary>
              <h3>{{ f.pregunta }}</h3>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
            </summary>
            <p>{{ f.respuesta }}</p>
          </details>
        </section>

        <!-- CTA final -->
        <section class="cta-final">
          <h2>Da el primer paso hacia tu casa</h2>
          <p>Conoce nuestros modelos listos para construir o agenda una asesoría para tu proyecto a medida.</p>
          <div class="cta-final-botones">
            <NuxtLink to="/proyectos" class="btn primario">Ver modelos de casas</NuxtLink>
            <NuxtLink to="/contacto" class="btn claro">Hablar con un asesor</NuxtLink>
          </div>
        </section>
      </article>

      <!-- Índice lateral -->
      <aside class="post-aside">
        <nav v-if="toc.length > 1" class="toc" aria-label="Índice del artículo">
          <span class="toc-titulo">En este artículo</span>
          <ol>
            <li v-for="h in toc" :key="h.id" :class="`nivel-${h.nivel}`">
              <a :href="`#${h.id}`" :class="{ activo: seccionActiva === h.id }" @click.prevent="irA(h.id)">{{ h.texto }}</a>
            </li>
          </ol>
        </nav>
        <div class="aside-cta">
          <span>¿Tienes un terreno?</span>
          <p>Te ayudamos a elegir el modelo ideal y a calcular tu presupuesto.</p>
          <NuxtLink to="/contacto">Cotizar mi casa</NuxtLink>
        </div>
      </aside>
    </div>

    <!-- Relacionados -->
    <section v-if="relacionados.length" class="relacionados">
      <h2>Sigue leyendo</h2>
      <div class="relacionados-grid">
        <NuxtLink v-for="r in relacionados" :key="r.id" :to="`/blog/${r.slug}`" class="rel-card">
          <img v-if="r.imagen_portada" :src="imgUrl(r.imagen_portada)" :alt="r.imagen_alt || r.titulo" loading="lazy" />
          <span class="rel-titulo">{{ r.titulo }}</span>
        </NuxtLink>
      </div>
    </section>
  </div>

  <div v-else class="no-encontrado">
    <h1>Artículo no encontrado</h1>
    <p>El artículo que buscas no existe o fue movido.</p>
    <NuxtLink to="/blog">Ver todos los artículos</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { NEGOCIO } from '~/composables/negocio'

const route = useRoute()
const { imgUrl } = useProyectos()
const { getPost, getPosts } = useBlog()

const slug = route.params.slug as string
const { data: post } = await useAsyncData(`blog-${slug}`, () => getPost(slug))
const { data: todos } = await useAsyncData('blog-posts-rel', () => getPosts(12))

if (!post.value && import.meta.server) {
  setResponseStatus(useRequestEvent()!, 404)
}

const render = computed(() => markdownAHtml(post.value?.contenido || '', imgUrl))
const partes = computed(() => dividirTrasPrimerParrafo(render.value.html))
const toc = computed(() => {
  const lista = render.value.toc.filter(h => h.nivel === 2)
  if (post.value?.faqs?.length) lista.push({ id: 'preguntas-frecuentes', texto: 'Preguntas frecuentes', nivel: 2 })
  return lista
})
const whatsappLink = computed(() =>
  `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(`Hola, leí el artículo "${post.value?.titulo}" y quiero más información.`)}`
)
const lectura = computed(() => tiempoLectura(post.value?.contenido || ''))

const relacionados = computed(() => {
  const otros = (todos.value ?? []).filter(p => p.slug !== slug)
  const mismaCat = otros.filter(p => p.categoria && p.categoria === post.value?.categoria)
  return [...mismaCat, ...otros.filter(p => !mismaCat.includes(p))].slice(0, 3)
})

// ── SEO ──
usePaginaSeo(() => {
  const p = post.value
  if (!p) return { titulo: 'Artículo no encontrado | R&J Constructora', descripcion: 'El artículo que buscas no existe.', noindex: true }
  return {
    titulo: p.meta_titulo || `${p.titulo} | R&J Constructora`,
    descripcion: p.meta_descripcion || (p.resumen || '').slice(0, 158),
    ruta: `/blog/${p.slug}`,
    imagen: p.imagen_portada ? imgUrl(p.imagen_portada) : undefined,
    tipo: 'article'
  }
})

useSeoMeta({
  articlePublishedTime: () => post.value?.publicado_at || post.value?.created_at,
  articleModifiedTime: () => post.value?.updated_at,
  articleSection: () => post.value?.categoria
})

useSchema(() => {
  const p = post.value
  if (!p) return null
  const url = urlAbsoluta(`/blog/${p.slug}`)
  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: p.titulo,
      description: p.meta_descripcion || p.resumen,
      image: p.imagen_portada ? [imgUrl(p.imagen_portada)] : undefined,
      datePublished: p.publicado_at || p.created_at,
      dateModified: p.updated_at || p.publicado_at || p.created_at,
      author: p.autor
        ? { '@type': 'Person', name: p.autor }
        : { '@type': 'Organization', name: NEGOCIO.nombre, url: urlAbsoluta('/') },
      publisher: {
        '@type': 'Organization',
        name: NEGOCIO.nombre,
        logo: { '@type': 'ImageObject', url: urlAbsoluta(NEGOCIO.logo) }
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      keywords: p.palabra_clave || undefined,
      articleSection: p.categoria || undefined,
      wordCount: lectura.value.palabras,
      inLanguage: 'es-CL'
    },
    schemaMigas([
      { nombre: 'Inicio', ruta: '/' },
      { nombre: 'Blog', ruta: '/blog' },
      { nombre: p.titulo, ruta: `/blog/${p.slug}` }
    ])
  ]
  const faq = schemaFaq(p.faqs || [])
  if (faq) schemas.push(faq)
  return schemas
})

// ── Índice activo ──
const seccionActiva = ref('')

function irA(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}

let observador: IntersectionObserver | null = null
onMounted(() => {
  observador = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => { if (e.isIntersecting) seccionActiva.value = e.target.id })
    },
    { rootMargin: '-100px 0px -70% 0px' }
  )
  toc.value.forEach(h => {
    const el = document.getElementById(h.id)
    if (el) observador!.observe(el)
  })
})
onBeforeUnmount(() => observador?.disconnect())
</script>

<style scoped>
.post-page {
  --verde-claro: #86d95a;
  background: var(--fondo);
}

svg {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* ─── Encabezado ─── */
.post-hero {
  padding: 140px 6vw 64px;
  background: var(--texto);
  color: white;
}

.post-hero > * {
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.migas {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 26px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.55);
}

.migas a { color: rgba(255, 255, 255, 0.75); text-decoration: none; }
.migas a:hover { color: var(--verde-claro); }
.migas svg { width: 14px; height: 14px; }
.migas span { color: var(--verde-claro); font-weight: 600; }

.post-title {
  margin-bottom: 26px;
  font-family: var(--f-display);
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 900;
  line-height: 1.02;
  text-transform: uppercase;
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 26px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.meta-item { display: inline-flex; align-items: center; gap: 8px; }
.meta-item svg { width: 16px; height: 16px; color: var(--verde-claro); }

.post-cover {
  max-width: 1100px;
  margin: -1px auto 0;
  padding: 0 6vw;
  background: linear-gradient(var(--texto) 50%, transparent 50%);
}

.post-cover img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 8;
  object-fit: cover;
  border-radius: 20px;
}

/* ─── Layout ─── */
.post-layout {
  display: grid;
  grid-template-columns: minmax(0, 720px) 280px;
  justify-content: center;
  gap: 64px;
  max-width: 1160px;
  margin: 0 auto;
  padding: 56px 6vw 40px;
}

/* ─── TL;DR ─── */
.tldr {
  margin-bottom: 40px;
  padding: 26px 28px;
  border: 1px solid rgba(43, 95, 0, 0.2);
  border-left: 4px solid var(--acento);
  border-radius: 14px;
  background: #f1f6ea;
}

.tldr-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--acento);
}

.tldr-head svg { width: 18px; height: 18px; }

.tldr-texto {
  margin-bottom: 14px;
  font-size: 17px;
  line-height: 1.7;
  font-weight: 500;
  color: var(--texto);
}

.tldr-lista {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tldr-lista li {
  display: flex;
  gap: 10px;
  font-size: 15.5px;
  line-height: 1.6;
  color: var(--texto);
}

.tldr-lista svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 3px;
  color: var(--acento);
}

/* ─── Contenido del artículo ─── */
.contenido {
  font-size: 18px;
  line-height: 1.85;
  color: #33302b;
}

.contenido :deep(p) { margin: 0 0 1.4em; }

.contenido :deep(h2) {
  scroll-margin-top: 100px;
  margin: 2.2em 0 0.7em;
  font-family: var(--f-display);
  font-size: clamp(28px, 3vw, 36px);
  font-weight: 800;
  line-height: 1.1;
  text-transform: uppercase;
  color: var(--texto);
}

.contenido :deep(h3) {
  scroll-margin-top: 100px;
  margin: 1.8em 0 0.5em;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--texto);
}

.contenido :deep(a) {
  color: var(--acento);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.contenido :deep(strong) { color: var(--texto); }

.contenido :deep(ul),
.contenido :deep(ol) {
  margin: 0 0 1.5em;
  padding-left: 0;
  list-style: none;
}

.contenido :deep(li) {
  position: relative;
  margin-bottom: 0.6em;
  padding-left: 32px;
}

.contenido :deep(ul > li)::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 0.72em;
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background: var(--acento);
  transform: rotate(45deg);
}

.contenido :deep(ol) { counter-reset: paso; }

.contenido :deep(ol > li) { counter-increment: paso; }

.contenido :deep(ol > li)::before {
  content: counter(paso);
  position: absolute;
  left: 0;
  top: 0.25em;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--acento);
  color: white;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
}

.contenido :deep(blockquote) {
  margin: 1.8em 0;
  padding: 18px 24px;
  border-left: 4px solid var(--acento);
  border-radius: 0 12px 12px 0;
  background: var(--fondo-puro);
  font-size: 19px;
  font-style: italic;
  color: var(--texto);
}

.contenido :deep(blockquote p:last-child) { margin-bottom: 0; }

.contenido :deep(figure) { margin: 2em 0; }

.contenido :deep(figure img) {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 14px;
}

.contenido :deep(figcaption) {
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
  color: var(--texto-suave);
}

.contenido :deep(.tabla-scroll) {
  margin: 1.8em 0;
  overflow-x: auto;
  border: 1px solid var(--borde);
  border-radius: 14px;
}

.contenido :deep(table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 15.5px;
  line-height: 1.5;
}

.contenido :deep(th) {
  padding: 14px 18px;
  background: var(--texto);
  color: white;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-align: left;
  text-transform: uppercase;
  white-space: nowrap;
}

.contenido :deep(td) {
  padding: 13px 18px;
  border-top: 1px solid var(--borde);
}

.contenido :deep(tr:nth-child(even) td) { background: rgba(0, 0, 0, 0.02); }

.contenido :deep(hr) {
  margin: 2.5em 0;
  border: none;
  border-top: 1px solid var(--borde);
}

.contenido :deep(code) {
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.06);
  font-size: 0.9em;
}

/* ─── CTA después del primer párrafo ─── */
.cta-inline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin: 0 0 2.2em;
  padding: 22px 24px;
  border-radius: 16px;
  background: var(--texto);
  color: white;
}

.cta-inline-texto { display: flex; flex-direction: column; gap: 4px; }
.cta-inline-texto strong { font-size: 17px; }
.cta-inline-texto span { font-size: 14px; line-height: 1.55; color: rgba(255, 255, 255, 0.7); }
.cta-inline-botones { display: flex; gap: 8px; flex-shrink: 0; }

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  color: white;
  white-space: nowrap;
  transition: all 0.2s;
}

.btn:hover { border-color: white; }
.btn.primario { background: var(--verde-claro); border-color: var(--verde-claro); color: #10200a; }
.btn.primario:hover { filter: brightness(1.05); }

/* ─── FAQ ─── */
.post-faq { margin-top: 3em; }

.post-faq h2 {
  scroll-margin-top: 100px;
  margin-bottom: 20px;
  font-family: var(--f-display);
  font-size: clamp(28px, 3vw, 36px);
  font-weight: 800;
  text-transform: uppercase;
  color: var(--texto);
}

.faq-item {
  margin-bottom: 10px;
  border: 1px solid var(--borde);
  border-radius: 14px;
  background: var(--fondo-puro);
  overflow: hidden;
}

.faq-item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 22px;
  cursor: pointer;
  list-style: none;
}

.faq-item summary::-webkit-details-marker { display: none; }

.faq-item summary h3 {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.4;
  color: var(--texto);
}

.faq-item summary svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: var(--acento);
  transition: transform 0.25s;
}

.faq-item[open] summary svg { transform: rotate(180deg); }

.faq-item p {
  margin: 0;
  padding: 0 22px 20px;
  font-size: 16px;
  line-height: 1.75;
  color: var(--texto-suave);
}

/* ─── CTA final ─── */
.cta-final {
  margin-top: 3em;
  padding: 40px;
  border-radius: 20px;
  background: linear-gradient(135deg, #2b5f00, #1c1a17);
  color: white;
}

.cta-final h2 {
  margin-bottom: 10px;
  font-family: var(--f-display);
  font-size: 32px;
  font-weight: 900;
  text-transform: uppercase;
}

.cta-final p { margin-bottom: 22px; color: rgba(255, 255, 255, 0.75); line-height: 1.6; }
.cta-final-botones { display: flex; flex-wrap: wrap; gap: 10px; }
.btn.claro { background: white; border-color: white; color: var(--texto); }

/* ─── Índice lateral ─── */
.post-aside {
  position: sticky;
  top: 100px;
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.toc {
  padding: 22px;
  border: 1px solid var(--borde);
  border-radius: 16px;
  background: var(--fondo-puro);
}

.toc-titulo {
  display: block;
  margin-bottom: 12px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--texto-suave);
}

.toc ol { margin: 0; padding: 0; list-style: none; }

.toc a {
  display: block;
  padding: 7px 0 7px 12px;
  border-left: 2px solid var(--borde);
  font-size: 14px;
  line-height: 1.4;
  color: var(--texto-suave);
  text-decoration: none;
  transition: all 0.2s;
}

.toc a:hover { color: var(--texto); }
.toc a.activo { border-left-color: var(--acento); color: var(--acento); font-weight: 600; }

.aside-cta {
  padding: 22px;
  border-radius: 16px;
  background: var(--texto);
  color: white;
}

.aside-cta span { font-family: var(--f-display); font-size: 22px; font-weight: 800; text-transform: uppercase; }
.aside-cta p { margin: 8px 0 16px; font-size: 14px; line-height: 1.55; color: rgba(255, 255, 255, 0.7); }

.aside-cta a {
  display: block;
  padding: 12px;
  border-radius: 999px;
  background: var(--verde-claro);
  color: #10200a;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
}

/* ─── Relacionados ─── */
.relacionados {
  max-width: 1160px;
  margin: 0 auto;
  padding: 20px 6vw 100px;
}

.relacionados h2 {
  margin-bottom: 24px;
  font-family: var(--f-display);
  font-size: 32px;
  font-weight: 900;
  text-transform: uppercase;
  color: var(--texto);
}

.relacionados-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.rel-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--borde);
  border-radius: 16px;
  overflow: hidden;
  background: var(--fondo-puro);
  text-decoration: none;
  transition: transform 0.3s;
}

.rel-card:hover { transform: translateY(-3px); }
.rel-card img { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; }

.rel-titulo {
  padding: 18px 20px;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.35;
  color: var(--texto);
}

.no-encontrado {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 140px 20px 60px;
  text-align: center;
}

.no-encontrado h1 { font-family: var(--f-display); font-size: 44px; text-transform: uppercase; }
.no-encontrado a { color: var(--acento); font-weight: 700; }

/* ─── Responsive ─── */
@media (max-width: 1024px) {
  .post-layout { grid-template-columns: minmax(0, 720px); }
  .post-aside { position: static; order: -1; }
  .aside-cta { display: none; }
}

@media (max-width: 700px) {
  .post-hero { padding: 116px 20px 48px; }
  .post-cover { padding: 0 16px; }
  .post-cover img { border-radius: 14px; aspect-ratio: 16 / 10; }
  .post-layout { padding: 36px 20px 30px; gap: 30px; }
  .contenido { font-size: 17px; line-height: 1.8; }
  .tldr { padding: 20px; }
  .cta-inline { flex-direction: column; align-items: stretch; }
  .cta-inline-botones .btn { flex: 1; }
  .cta-final { padding: 28px 22px; }
  .relacionados { padding: 10px 20px 70px; }
  .relacionados-grid { grid-template-columns: 1fr; }
}
</style>

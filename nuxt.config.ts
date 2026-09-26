// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    '@nuxt/image',
  ],

  googleFonts: {
    families: {
      'Barlow Condensed': [300, 400, 600, 700, 800, 900],
      'DM Sans': {
        wght: [300, 400, 500],
        ital: [300],
      },
    },
    display: 'swap',
    preload: true,
  },

  css: ['~/assets/css/main.css'],

  // Variables de entorno — se configuran en .env
  runtimeConfig: {
    // Solo server-side (privadas)
    resendApiKey: process.env.RESEND_API_KEY,
    contactEmail: process.env.CONTACT_EMAIL,
    // Cloudflare R2 (privadas - solo server)
    r2Endpoint: process.env.R2_ENDPOINT,
    r2AccessKeyId: process.env.R2_ACCESS_KEY_ID,
    r2SecretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    r2BucketName: process.env.R2_BUCKET_NAME,
    // Public (cliente)
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      r2PublicUrl: process.env.R2_PUBLIC_URL,
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
    }
  },

  // SSR habilitado para SEO
  ssr: true,

  // Rutas de la app
  // Las páginas se crean automáticamente por carpeta pages/

  nitro: {
    // Vercel detecta automáticamente, pero lo dejamos explícito
    preset: 'vercel',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'Constructora — Edificamos el Futuro',
      meta: [
        { name: 'description', content: 'Más de 20 años construyendo proyectos residenciales y comerciales en Chile con los más altos estándares de calidad.' },
        { name: 'theme-color', content: '#0F0F0F' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ],
      // CSS crítico para evitar flash de contenido antes del preloader
      style: [
        {
          innerHTML: `
            body:not(.preloader-done) main,
            body:not(.preloader-done) nav,
            body:not(.preloader-done) footer {
              opacity: 0 !important;
              visibility: hidden;
              pointer-events: none;
            }
          `
        }
      ],
      // Script para detectar si ya se mostró el preloader (ejecuta antes del render)
      script: [
        {
          innerHTML: `
            if (sessionStorage.getItem('siteLoaded')) {
              document.body.classList.add('preloader-done');
            }
          `,
          tagPosition: 'bodyOpen'
        }
      ],
    },
    // Transición suave entre páginas
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  compatibilityDate: '2024-11-01',
})

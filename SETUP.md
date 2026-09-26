# 🏗️ Constructora — Guía de Setup Completa

## Estructura del proyecto

```
constructora-nuxt/
├── assets/
│   └── css/
│       └── main.css          ← 🎨 EDITAR COLORES AQUÍ
├── components/
│   └── IconArrow.vue
├── composables/
│   ├── useDirectus.ts         ← Todas las llamadas al CMS
│   └── useReveal.ts           ← Animaciones scroll
├── layouts/
│   └── default.vue            ← Nav + Footer global
├── pages/
│   ├── index.vue              ← Inicio
│   ├── servicios.vue          ← Servicios
│   ├── nosotros.vue           ← Nosotros
│   ├── contacto.vue           ← Contacto + formulario
│   └── proyectos/
│       └── [slug].vue         ← Página individual de proyecto
├── plugins/
│   └── cursor.client.ts       ← Cursor custom (solo cliente)
├── server/
│   └── api/
│       └── contact.post.ts    ← API que envía el email
├── .env.example               ← Variables de entorno (copiar como .env)
├── nuxt.config.ts
└── package.json
```

---

## PASO 1 — Instalar dependencias

```bash
cd constructora-nuxt
npm install
```

---

## PASO 2 — Configurar variables de entorno

Copia `.env.example` como `.env` y rellena:

```bash
cp .env.example .env
```

```env
DIRECTUS_URL=http://localhost:8055
RESEND_API_KEY=re_xxxxxxxx        # obtener en resend.com (gratis)
CONTACT_EMAIL=cliente@email.cl    # correo del cliente
SITE_URL=https://constructora.cl
```

---

## PASO 3 — Instalar y configurar Directus

### En Hostinger (Node.js App #2)

1. En el panel de Hostinger → **Node.js Apps** → **Create new app**
2. Nombre: `directus-cms`, puerto: `8055`
3. En la terminal de Hostinger:

```bash
npm init -y
npm install directus
npx directus init
# → Seleccionar SQLite para empezar (o MySQL si tienen BD)
# → Crear usuario admin: admin@constructora.cl
# → Contraseña: (la que quieras)
npx directus start
```

### Crear las colecciones en Directus

Una vez instalado, entra a `http://tu-hostinger:8055/admin`

#### Colección: `proyectos`
| Campo | Tipo | Notas |
|-------|------|-------|
| slug | string | Único, requerido (ej: `torres-del-sur`) |
| titulo | string | Requerido |
| subtitulo | string | Opcional |
| tipo | dropdown | residencial, comercial, industrial, remodelacion |
| anio | integer | Ej: 2024 |
| ubicacion | string | Ej: Santiago, RM |
| superficie | string | Ej: 2.400 m² |
| duracion | string | Ej: 18 meses |
| descripcion | text | Resumen corto |
| descripcion_completa | rich text (WYSIWYG) | Texto completo |
| imagen_portada | image | Foto principal |
| galeria | image[] (many files) | Fotos adicionales |
| destacado | boolean | Aparece en home |
| cliente | string | Opcional |
| pisos | string | Opcional |
| inicio_obra | string | Opcional |
| entrega | string | Opcional |
| estructura | string | Opcional |
| status | dropdown | published / draft |

#### Colección: `servicios` (opcional)
| Campo | Tipo |
|-------|------|
| numero | string (01, 02...) |
| icono | string (emoji) |
| titulo | string |
| descripcion | text |
| lista | json |
| status | dropdown |

### Habilitar acceso público (para que Nuxt pueda leer)

En Directus: **Settings → Roles → Public → Permissions**
- `proyectos`: ✅ Read
- `servicios`: ✅ Read
- `directus_files`: ✅ Read (para las imágenes)

---

## PASO 4 — Configurar Resend (emails del formulario)

1. Ir a **resend.com** → crear cuenta gratis
2. Verificar el dominio del cliente (ej: `constructora.cl`)
   - Agregar los DNS records que Resend indica
3. Copiar la API Key → pegar en `.env` como `RESEND_API_KEY`
4. En `server/api/contact.post.ts`, cambiar el `from`:
   ```ts
   from: 'Formulario Web <noreply@constructora.cl>',
   ```

> **Si no tienen dominio propio todavía**, Resend permite enviar desde
> `onboarding@resend.dev` en el plan gratuito para pruebas.

---

## PASO 5 — Desarrollo local

```bash
npm run dev
# → http://localhost:3000
```

---

## PASO 6 — Deploy en Hostinger (Node.js App #1)

### Build
```bash
npm run build
```
Esto genera la carpeta `.output/`

### En Hostinger Node.js App #1
1. Subir todos los archivos del proyecto (excepto `node_modules`)
2. Configurar variables de entorno en el panel de Hostinger
3. El archivo de entrada es: `.output/server/index.mjs`
4. Hostinger lo detecta automáticamente

### Variables de entorno en Hostinger
En el panel → Node.js App → Environment Variables:
```
DIRECTUS_URL = https://cms.constructora.cl (o la URL interna)
RESEND_API_KEY = re_xxxx
CONTACT_EMAIL = cliente@email.cl
SITE_URL = https://constructora.cl
NODE_ENV = production
```

---

## PASO 7 — Cambiar colores (para ti como dev)

Abre `assets/css/main.css` y edita solo el bloque `:root`:

```css
:root {
  --acento:        #C8862A;   /* ← cambiar este */
  --acento-dark:   #A86E1E;   /* ← y este (versión oscura) */
  --fondo:         #F7F4EF;   /* ← fondo general */
  --fondo-puro:    #FDFBF8;   /* ← fondo formularios */
  --texto:         #1C1A17;   /* ← texto y secciones oscuras */
  --texto-suave:   #6B6355;   /* ← subtítulos */
}
```

**Paletas sugeridas:**
| Nombre | --acento | --acento-dark | --fondo | --texto |
|--------|----------|---------------|---------|---------|
| Ámbar (actual) | `#C8862A` | `#A86E1E` | `#F7F4EF` | `#1C1A17` |
| Azul corporativo | `#2563EB` | `#1D4ED8` | `#F0F4FF` | `#0F172A` |
| Verde naturaleza | `#16A34A` | `#15803D` | `#F0FDF4` | `#14532D` |
| Gris elegante | `#64748B` | `#475569` | `#F8FAFC` | `#0F172A` |
| Dark gold | `#E2C97A` | `#C9AE55` | `#0F172A` | `#E8E4DC` |

---

## Agregar un nuevo proyecto (flujo del cliente)

1. El cliente entra a `https://cms.constructora.cl/admin`
2. Va a **Proyectos** → **Create item**
3. Llena los campos: título, tipo, ubicación, descripción, sube fotos
4. Marca **status = published**
5. El sitio lo muestra automáticamente (SSR con revalidación)

> Para forzar revalidación inmediata, agregar `key: 'proyectos-' + Date.now()`
> o configurar webhooks de Directus → Nuxt (avanzado, opcional).

---

## Stack final

| Capa | Tecnología |
|------|-----------|
| Frontend | Nuxt 3 (SSR) |
| CMS / Admin | Directus (self-hosted) |
| Emails | Resend (API) |
| Tipografías | Google Fonts (Barlow Condensed + DM Sans) |
| Hosting Nuxt | Hostinger Node.js App #1 |
| Hosting CMS | Hostinger Node.js App #2 |
| Base de datos | SQLite (Directus, incluida) |

**Costo adicional:** $0 — todo corre en el Hostinger Business que ya tienes.

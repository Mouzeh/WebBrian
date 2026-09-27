-- ══════════════════════════════════════════════════════════════════
-- MIGRACIÓN — Blog + Preguntas frecuentes (FAQ)
-- Ejecutar UNA vez en: Supabase Dashboard → SQL Editor
-- ══════════════════════════════════════════════════════════════════

-- Función para updated_at (por si no existe)
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ── TABLA: blog_posts ──
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  titulo TEXT NOT NULL,                       -- H1 del artículo
  meta_titulo TEXT,                           -- <title> (50–60 caracteres)
  meta_descripcion TEXT,                      -- meta description (120–160)
  palabra_clave TEXT,                         -- palabra clave principal
  intencion TEXT DEFAULT 'informativa'
    CHECK (intencion IN ('informativa', 'comercial', 'transaccional', 'navegacional')),
  categoria TEXT,
  resumen TEXT,                               -- TL;DR
  puntos_clave TEXT[] DEFAULT '{}',           -- puntos clave (key takeaways)
  contenido TEXT NOT NULL DEFAULT '',         -- Markdown (H2, H3, listas, tablas, imágenes)
  imagen_portada TEXT,
  imagen_alt TEXT,
  autor TEXT,
  faqs JSONB DEFAULT '[]',                    -- [{ "pregunta": "", "respuesta": "" }]
  cta_titulo TEXT,
  cta_texto TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  publicado_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_publicado ON blog_posts(publicado_at DESC);

DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── TABLA: faqs ──
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pregunta TEXT NOT NULL,
  respuesta TEXT NOT NULL,
  categoria TEXT,
  orden INTEGER NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_faqs_orden ON faqs(orden);

DROP TRIGGER IF EXISTS faqs_updated_at ON faqs;
CREATE TRIGGER faqs_updated_at
  BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── ROW LEVEL SECURITY ──
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Posts publicados son públicos" ON blog_posts;
CREATE POLICY "Posts publicados son públicos" ON blog_posts FOR SELECT USING (status = 'published');
DROP POLICY IF EXISTS "Admins ven todos los posts" ON blog_posts;
CREATE POLICY "Admins ven todos los posts" ON blog_posts FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Admins insertan posts" ON blog_posts;
CREATE POLICY "Admins insertan posts" ON blog_posts FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Admins actualizan posts" ON blog_posts;
CREATE POLICY "Admins actualizan posts" ON blog_posts FOR UPDATE TO authenticated USING (true);
DROP POLICY IF EXISTS "Admins eliminan posts" ON blog_posts;
CREATE POLICY "Admins eliminan posts" ON blog_posts FOR DELETE TO authenticated USING (true);

DROP POLICY IF EXISTS "FAQs publicadas son públicas" ON faqs;
CREATE POLICY "FAQs publicadas son públicas" ON faqs FOR SELECT USING (status = 'published');
DROP POLICY IF EXISTS "Admins ven todas las FAQs" ON faqs;
CREATE POLICY "Admins ven todas las FAQs" ON faqs FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Admins insertan FAQs" ON faqs;
CREATE POLICY "Admins insertan FAQs" ON faqs FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Admins actualizan FAQs" ON faqs;
CREATE POLICY "Admins actualizan FAQs" ON faqs FOR UPDATE TO authenticated USING (true);
DROP POLICY IF EXISTS "Admins eliminan FAQs" ON faqs;
CREATE POLICY "Admins eliminan FAQs" ON faqs FOR DELETE TO authenticated USING (true);

-- Los admins también deben ver los proyectos en borrador desde el panel
DROP POLICY IF EXISTS "Admins ven todos los proyectos" ON proyectos;
CREATE POLICY "Admins ven todos los proyectos" ON proyectos FOR SELECT TO authenticated USING (true);

-- ══════════════════════════════════════════════════════════════════
-- CONTENIDO INICIAL (en BORRADOR: revísalo y publícalo desde el panel)
-- ══════════════════════════════════════════════════════════════════

INSERT INTO faqs (pregunta, respuesta, categoria, orden, status)
SELECT * FROM (VALUES
  ('¿En qué zonas construyen?',
   'Trabajamos principalmente en Valdivia y la Región de Los Ríos. Si tu terreno está en otra comuna, escríbenos y evaluamos el proyecto.',
   'General', 1, 'draft'),
  ('¿Puedo modificar un modelo de casa?',
   'Sí. Los modelos son una base: podemos ajustar la distribución, las terminaciones y la superficie según tu terreno y presupuesto.',
   'Modelos', 2, 'draft'),
  ('¿Se encargan de los permisos de edificación?',
   'Te acompañamos en la tramitación del permiso de edificación y de la recepción final ante la Dirección de Obras Municipales (DOM) de tu comuna.',
   'Permisos', 3, 'draft'),
  ('¿Necesito tener terreno propio para construir?',
   'Necesitas un terreno con título de dominio a tu nombre o la autorización del propietario. Si aún no lo tienes, te orientamos sobre qué revisar antes de comprar.',
   'General', 4, 'draft'),
  ('¿Cómo cotizo mi casa?',
   'Escríbenos por el formulario de contacto o por WhatsApp con la ubicación de tu terreno y el modelo o la superficie que buscas. Te respondemos con una propuesta.',
   'Cotización', 5, 'draft')
) AS v(pregunta, respuesta, categoria, orden, status)
WHERE NOT EXISTS (SELECT 1 FROM faqs);

INSERT INTO blog_posts (
  slug, titulo, meta_titulo, meta_descripcion, palabra_clave, intencion, categoria,
  resumen, puntos_clave, contenido, faqs, status
)
SELECT
  'como-construir-una-casa-en-la-region-de-los-rios',
  'Cómo construir una casa en la Región de Los Ríos: guía paso a paso',
  'Cómo Construir una Casa en Los Ríos: Guía Paso a Paso | R&J',
  'Cómo construir una casa en Valdivia y Los Ríos: terreno, diseño, permiso de edificación, obra y recepción final. Pasos, documentos y consejos.',
  'construir una casa',
  'informativa',
  'Guías',
  'Construir una casa en la Región de Los Ríos se resume en seis etapas: definir presupuesto, revisar el terreno, elegir el diseño, obtener el permiso de edificación, construir y tramitar la recepción final.',
  ARRAY[
    'Antes de comprar o construir, pide el Certificado de Informaciones Previas del terreno en la DOM.',
    'Sin permiso de edificación no se puede iniciar la obra.',
    'El clima lluvioso del sur exige cuidar la aislación, la ventilación y la evacuación de aguas lluvia.',
    'La recepción final municipal es la que deja tu casa regularizada.'
  ],
  E'Construir una casa propia en Valdivia o en cualquier comuna de la Región de Los Ríos es un proyecto grande, pero ordenado por etapas se vuelve mucho más simple. En esta guía te explicamos qué hacer en cada paso y qué documentos necesitas.\n\n## 1. Define tu presupuesto y financiamiento\n\nAntes de elegir un diseño, ten claro cuánto puedes invertir y cómo lo vas a financiar: ahorro propio, crédito hipotecario para construcción o una combinación de ambos.\n\n- Considera un margen para imprevistos.\n- Incluye los costos de permisos, proyectos de especialidades y conexiones de servicios.\n- Si usarás crédito, consulta con tu banco los requisitos antes de firmar con una constructora.\n\n## 2. Revisa el terreno\n\nEl terreno determina qué puedes construir. Revisa estos puntos antes de comprar o diseñar:\n\n### Documentos del terreno\n\n1. **Título de dominio** vigente a tu nombre o autorización del propietario.\n2. **Certificado de Informaciones Previas (CIP)**, que emite la Dirección de Obras Municipales e indica lo que se puede construir.\n3. **Factibilidad de agua potable, alcantarillado y electricidad**.\n\n### Características físicas\n\nObserva la pendiente, el tipo de suelo, los accesos y cómo escurre el agua cuando llueve. En el sur de Chile este último punto es clave.\n\n## 3. Elige el diseño o modelo de casa\n\nPuedes partir de un [modelo de casa listo para construir](/proyectos) y adaptarlo, o diseñar un proyecto a medida con un arquitecto. En ambos casos necesitarás planos firmados por un profesional para tramitar el permiso.\n\n## 4. Obtén el permiso de edificación\n\nEl permiso de edificación se solicita en la Dirección de Obras Municipales (DOM) de tu comuna. Sin este permiso no se puede iniciar la obra.\n\n| Etapa | Qué incluye | Documento clave |\n|---|---|---|\n| Terreno | Revisión de normas y servicios | Certificado de Informaciones Previas |\n| Proyecto | Planos de arquitectura y especialidades | Planos firmados por profesionales |\n| Permiso | Ingreso y revisión en la DOM | Permiso de edificación |\n| Obra | Construcción e inspecciones | Libro de obra |\n| Cierre | Certificados de instalaciones | Recepción final municipal |\n\n## 5. Construcción de la casa\n\nCon el permiso aprobado comienza la obra: fundaciones, estructura, techumbre, instalaciones y terminaciones. En la Región de Los Ríos conviene poner especial atención a:\n\n- **Aislación térmica** en muros, techumbre y piso.\n- **Ventanas** con buen sellado.\n- **Ventilación** para evitar humedad y condensación.\n- **Canaletas y drenajes** adecuados para la lluvia.\n\n> Una casa bien aislada es más cómoda y gasta menos en calefacción durante el invierno.\n\n## 6. Recepción final\n\nAl terminar la obra se solicita la **recepción final** en la DOM, junto con los certificados de las instalaciones eléctricas, sanitarias y de gas cuando corresponda. Con la recepción final tu casa queda regularizada.\n\n## ¿Por dónde empezar?\n\nSi ya tienes terreno, el mejor primer paso es revisar su Certificado de Informaciones Previas y conversar con una constructora sobre el modelo que te acomoda. [Contáctanos](/contacto) y te ayudamos a planificarlo.',
  '[
    {"pregunta": "¿Necesito permiso para construir una casa?", "respuesta": "Sí. Toda construcción nueva requiere un permiso de edificación otorgado por la Dirección de Obras Municipales de la comuna donde está el terreno."},
    {"pregunta": "¿Qué es la recepción final?", "respuesta": "Es el trámite municipal que certifica que la obra se construyó según el permiso aprobado. Con ella la vivienda queda regularizada."},
    {"pregunta": "¿Puedo construir a partir de un modelo de casa?", "respuesta": "Sí. Un modelo de casa es un buen punto de partida y puede adaptarse a tu terreno, presupuesto y necesidades."}
  ]'::jsonb,
  'draft'
WHERE NOT EXISTS (SELECT 1 FROM blog_posts);

-- Avisarle a Supabase que la estructura cambió
NOTIFY pgrst, 'reload schema';

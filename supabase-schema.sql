-- ══════════════════════════════════════════════════════════════════
-- SCHEMA SUPABASE — Constructora
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ══════════════════════════════════════════════════════════════════

-- ── TABLA: proyectos ──
CREATE TABLE proyectos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  titulo TEXT NOT NULL,
  subtitulo TEXT,
  tipo TEXT NOT NULL CHECK (tipo IN ('residencial', 'comercial', 'industrial', 'remodelacion')),
  anio INTEGER NOT NULL,
  ubicacion TEXT NOT NULL,
  superficie TEXT,
  duracion TEXT,
  descripcion TEXT NOT NULL,
  descripcion_completa TEXT,
  imagen_portada TEXT NOT NULL,           -- Nombre del archivo en R2
  galeria TEXT[] DEFAULT '{}',            -- Array de nombres de archivos en R2
  destacado BOOLEAN DEFAULT false,
  cliente TEXT,
  pisos TEXT,
  inicio_obra TEXT,
  entrega TEXT,
  estructura TEXT,
  habitaciones TEXT,
  banos TEXT,
  area TEXT,
  estacionamiento TEXT,
  patio_trasero TEXT,
  categoria TEXT NOT NULL DEFAULT 'terminado' CHECK (categoria IN ('terminado', 'construccion')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── TABLA: servicios ──
CREATE TABLE servicios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  numero TEXT NOT NULL,
  icono TEXT NOT NULL,
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  lista TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── ÍNDICES para mejor performance ──
CREATE INDEX idx_proyectos_status ON proyectos(status);
CREATE INDEX idx_proyectos_categoria ON proyectos(categoria);
CREATE INDEX idx_proyectos_destacado ON proyectos(destacado);
CREATE INDEX idx_proyectos_slug ON proyectos(slug);
CREATE INDEX idx_proyectos_anio ON proyectos(anio DESC);
CREATE INDEX idx_servicios_status ON servicios(status);

-- ── TRIGGER: actualizar updated_at automáticamente ──
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER proyectos_updated_at
  BEFORE UPDATE ON proyectos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ══════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- Permite lectura pública, escritura solo autenticados
-- ══════════════════════════════════════════════════════════════════

ALTER TABLE proyectos ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicios ENABLE ROW LEVEL SECURITY;

-- Lectura pública (anon puede leer proyectos publicados)
CREATE POLICY "Proyectos publicados son públicos"
  ON proyectos FOR SELECT
  USING (status = 'published');

CREATE POLICY "Servicios publicados son públicos"
  ON servicios FOR SELECT
  USING (status = 'published');

-- Escritura solo para usuarios autenticados (admin)
CREATE POLICY "Solo admins pueden insertar proyectos"
  ON proyectos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Solo admins pueden actualizar proyectos"
  ON proyectos FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Solo admins pueden eliminar proyectos"
  ON proyectos FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Solo admins pueden insertar servicios"
  ON servicios FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Solo admins pueden actualizar servicios"
  ON servicios FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Solo admins pueden eliminar servicios"
  ON servicios FOR DELETE
  TO authenticated
  USING (true);

-- ══════════════════════════════════════════════════════════════════
-- DATOS DE EJEMPLO (opcional)
-- ══════════════════════════════════════════════════════════════════

INSERT INTO proyectos (slug, titulo, tipo, anio, ubicacion, descripcion, imagen_portada, destacado, status)
VALUES
  ('torres-del-sur', 'Torres del Sur', 'residencial', 2024, 'Santiago, Chile', 'Complejo residencial de 3 torres con áreas verdes.', 'torres-del-sur.jpg', true, 'published'),
  ('centro-comercial-aurora', 'Centro Comercial Aurora', 'comercial', 2023, 'Viña del Mar, Chile', 'Moderno centro comercial con 50 locales.', 'aurora-mall.jpg', true, 'published');

INSERT INTO servicios (numero, icono, titulo, descripcion, status)
VALUES
  ('01', '🏗️', 'Construcción Residencial', 'Casas y edificios habitacionales con acabados de primera calidad.', 'published'),
  ('02', '🏢', 'Obras Comerciales', 'Centros comerciales, oficinas y edificios que impresionan.', 'published'),
  ('03', '🔧', 'Remodelación', 'Transformamos espacios para adaptarlos a tus nuevas necesidades.', 'published'),
  ('04', '🏭', 'Proyectos Industriales', 'Bodegas y plantas con los más altos estándares técnicos.', 'published');

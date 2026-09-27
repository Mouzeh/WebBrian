-- ══════════════════════════════════════════════════════════════════
-- MIGRACIÓN — Precio de modelos + configuración del sitio
-- Ejecutar UNA vez en: Supabase Dashboard → SQL Editor
-- (después de supabase-migration-categoria.sql)
-- ══════════════════════════════════════════════════════════════════

-- Precio opcional para los modelos de casas (ej: "UF 1.800")
ALTER TABLE proyectos ADD COLUMN IF NOT EXISTS precio TEXT;

-- Configuración general del sitio (clave → valor)
CREATE TABLE IF NOT EXISTS configuracion (
  clave TEXT PRIMARY KEY,
  valor JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE configuracion ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Configuración es pública"
  ON configuracion FOR SELECT
  USING (true);

CREATE POLICY "Solo admins pueden insertar configuración"
  ON configuracion FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Solo admins pueden actualizar configuración"
  ON configuracion FOR UPDATE
  TO authenticated
  USING (true);

-- Por ahora la sección de proyectos terminados queda oculta
INSERT INTO configuracion (clave, valor)
VALUES ('mostrar_terminados', 'false')
ON CONFLICT (clave) DO NOTHING;

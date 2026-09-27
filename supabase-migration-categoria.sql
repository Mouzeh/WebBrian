-- ══════════════════════════════════════════════════════════════════
-- MIGRACIÓN — Categoría de proyecto (terminado / para construcción)
-- Ejecutar UNA vez en: Supabase Dashboard → SQL Editor
-- Los proyectos existentes quedan como 'terminado'.
-- ══════════════════════════════════════════════════════════════════

ALTER TABLE proyectos
  ADD COLUMN IF NOT EXISTS categoria TEXT NOT NULL DEFAULT 'terminado'
  CHECK (categoria IN ('terminado', 'construccion'));

CREATE INDEX IF NOT EXISTS idx_proyectos_categoria ON proyectos(categoria);

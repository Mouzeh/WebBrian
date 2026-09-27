-- ══════════════════════════════════════════════════════════════════
-- MIGRACIÓN — Opción de descargar el plano (Sí / No)
-- Ejecutar UNA vez en: Supabase Dashboard → SQL Editor
-- ══════════════════════════════════════════════════════════════════

ALTER TABLE proyectos ADD COLUMN IF NOT EXISTS plano_descargable BOOLEAN NOT NULL DEFAULT true;

-- Avisarle a Supabase que la estructura cambió
NOTIFY pgrst, 'reload schema';

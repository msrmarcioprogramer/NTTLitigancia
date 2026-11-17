/*
# Create processos_recebidos table

Stores each new legal process submitted through the upload screen, so it can later be compared against the Codex base of litigation.

1. New Tables
- `processos_recebidos`
  - `id` (uuid, primary key)
  - `numero` (text, unique, CNJ process number)
  - `assunto` (text, required)
  - `classe` (text, required, full class name)
  - `categoria_classe` (text, required, one of: civel, execucao, familia, juizado, sumarissimo, penal)
  - `foro` (text, required)
  - `data_distribuicao` (date, required)
  - `valor_causa` (numeric, required, zero or more)
  - `partes` (jsonb, list of parties with role, name and lawyer)
  - `movimentos` (jsonb, list of procedural movements with date and description)
  - `resumo` (text)
  - `texto_peticao` (text, required, full text of the petition)
  - `status` (text, defaults to aguardando_analise)
  - `created_at` (timestamptz, defaults to now)

2. Security
- Row level security enabled on `processos_recebidos`.
- The app has no sign-in, so `anon` and `authenticated` can read and insert rows.
- Update and delete are not granted to the app roles.
- `service_role` (used by the backend) receives full access.

3. Notes
- The numero column is unique, so the same process cannot be stored twice.
- Existing data is never altered by this migration; the table is new.
*/

CREATE TABLE IF NOT EXISTS processos_recebidos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  numero text NOT NULL UNIQUE,
  assunto text NOT NULL,
  classe text NOT NULL,
  categoria_classe text NOT NULL CHECK (categoria_classe IN ('civel', 'execucao', 'familia', 'juizado', 'sumarissimo', 'penal')),
  foro text NOT NULL,
  data_distribuicao date NOT NULL,
  valor_causa numeric(14, 2) NOT NULL CHECK (valor_causa >= 0),
  partes jsonb NOT NULL DEFAULT '[]'::jsonb,
  movimentos jsonb NOT NULL DEFAULT '[]'::jsonb,
  resumo text NOT NULL DEFAULT '',
  texto_peticao text NOT NULL,
  status text NOT NULL DEFAULT 'aguardando_analise',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE processos_recebidos ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT ON processos_recebidos TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON processos_recebidos TO service_role;

DROP POLICY IF EXISTS "anon_select_processos_recebidos" ON processos_recebidos;
CREATE POLICY "anon_select_processos_recebidos" ON processos_recebidos FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_processos_recebidos" ON processos_recebidos;
CREATE POLICY "anon_insert_processos_recebidos" ON processos_recebidos FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_processos_recebidos" ON processos_recebidos;
CREATE POLICY "anon_update_processos_recebidos" ON processos_recebidos FOR UPDATE
TO anon, authenticated USING (false) WITH CHECK (false);

DROP POLICY IF EXISTS "anon_delete_processos_recebidos" ON processos_recebidos;
CREATE POLICY "anon_delete_processos_recebidos" ON processos_recebidos FOR DELETE
TO anon, authenticated USING (false);

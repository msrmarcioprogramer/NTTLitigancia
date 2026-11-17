/*
# Adjust processos_recebidos for PDF uploads

The table now stores records created by uploading a scanned process PDF instead of typing the full process data.

1. Modified Table
- `processos_recebidos`
  - New `pdf_path` (text): location of the PDF inside the storage bucket.
  - New `nome_arquivo` (text): original file name of the uploaded PDF.
  - New `enviado_por` (text): name of the person who uploaded the process.
  - Fields that come from the process content (assunto, classe, categoria_classe, foro, data_distribuicao, valor_causa, texto_peticao) no longer need a value, so they can stay empty until the backend fills them.

2. Security
- No change to row level security or grants. The existing policies still apply.

3. Notes
- No column is dropped, renamed or changed in type, and no existing data is affected.
- The `numero` column remains unique, so the same process cannot be uploaded twice.
*/

ALTER TABLE processos_recebidos
  ADD COLUMN IF NOT EXISTS pdf_path text,
  ADD COLUMN IF NOT EXISTS nome_arquivo text,
  ADD COLUMN IF NOT EXISTS enviado_por text;

ALTER TABLE processos_recebidos
  ALTER COLUMN assunto DROP NOT NULL,
  ALTER COLUMN classe DROP NOT NULL,
  ALTER COLUMN categoria_classe DROP NOT NULL,
  ALTER COLUMN foro DROP NOT NULL,
  ALTER COLUMN data_distribuicao DROP NOT NULL,
  ALTER COLUMN valor_causa DROP NOT NULL,
  ALTER COLUMN texto_peticao DROP NOT NULL;

/*
# Create private bucket for process PDFs

Creates a storage bucket that holds the scanned PDF of each uploaded process.

1. New Storage Bucket
- `processos-pdf`: private (not publicly listed), accepts only PDF files, up to 50 MB each.

2. Security
- Row level security policies on storage objects, limited to the `processos-pdf` bucket:
  - anon and authenticated can upload files to the bucket (insert).
  - anon and authenticated can read files from the bucket (select), which is needed to open the PDF from the app.
- No update or delete policy is created, so uploaded files cannot be overwritten or removed by the app.

3. Notes
- The app has no sign-in, so access follows the anon role. Anyone holding the app's public key can read these files; this must be tightened when sign-in is added.
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('processos-pdf', 'processos-pdf', false, 52428800, ARRAY['application/pdf'])
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "anon_insert_processos_pdf" ON storage.objects;
CREATE POLICY "anon_insert_processos_pdf" ON storage.objects FOR INSERT
TO anon, authenticated WITH CHECK (bucket_id = 'processos-pdf');

DROP POLICY IF EXISTS "anon_select_processos_pdf" ON storage.objects;
CREATE POLICY "anon_select_processos_pdf" ON storage.objects FOR SELECT
TO anon, authenticated USING (bucket_id = 'processos-pdf');

import { supabase } from './supabase';

const BUCKET = 'processos-pdf';
const TABLE = 'processos_recebidos';
const SIGNED_URL_SECONDS = 300;

export const PROCESS_NUMBER_PATTERN = /^\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}$/;

export interface ProcessUpload {
  id: string;
  numero: string;
  criadoEm: string;
  enviadoPor: string | null;
  nomeArquivo: string | null;
  pdfPath: string | null;
}

interface ProcessUploadRow {
  id: string;
  numero: string;
  created_at: string;
  enviado_por: string | null;
  nome_arquivo: string | null;
  pdf_path: string | null;
}

export type SaveResult = { ok: true } | { ok: false; message: string };

export async function listProcessUploads(): Promise<ProcessUpload[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('id, numero, created_at, enviado_por, nome_arquivo, pdf_path')
    .order('created_at', { ascending: false });

  if (error) throw new Error('Não foi possível carregar os envios.');
  if (!Array.isArray(data)) throw new Error('Resposta inesperada ao carregar os envios.');

  return (data as ProcessUploadRow[]).map((row) => ({
    id: row.id,
    numero: row.numero,
    criadoEm: row.created_at,
    enviadoPor: row.enviado_por,
    nomeArquivo: row.nome_arquivo,
    pdfPath: row.pdf_path,
  }));
}

export async function saveProcessUpload(file: File, numero: string, enviadoPor: string): Promise<SaveResult> {
  const pdfPath = `${crypto.randomUUID()}.pdf`;

  const { error: storageError } = await supabase.storage
    .from(BUCKET)
    .upload(pdfPath, file, { contentType: 'application/pdf' });
  if (storageError) {
    return { ok: false, message: 'Não foi possível enviar o arquivo. Tente novamente.' };
  }

  const { error } = await supabase.from(TABLE).insert({
    numero,
    pdf_path: pdfPath,
    nome_arquivo: file.name,
    enviado_por: enviadoPor,
  });
  if (error) {
    return {
      ok: false,
      message:
        error.code === '23505'
          ? 'Este processo já foi enviado anteriormente.'
          : 'Não foi possível salvar o processo. Tente novamente.',
    };
  }

  return { ok: true };
}

export async function createPdfUrl(pdfPath: string): Promise<string> {
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(pdfPath, SIGNED_URL_SECONDS);
  if (error || !data?.signedUrl) throw new Error('Não foi possível abrir o arquivo.');
  return data.signedUrl;
}

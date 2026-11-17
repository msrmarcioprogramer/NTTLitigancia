import { useState, type ChangeEvent, type FormEvent } from 'react';
import { UploadsGrid } from '../components/UploadsGrid';
import { PROCESS_NUMBER_PATTERN, saveProcessUpload } from '../lib/processUploads';

type ExtractStatus = 'idle' | 'extracting' | 'found' | 'not_found' | 'failed';

const MAX_PDF_BYTES = 50 * 1024 * 1024;

const extractMessages: Record<Exclude<ExtractStatus, 'idle' | 'extracting'>, string> = {
  found: 'Número identificado na capa. Confira antes de enviar.',
  not_found: 'Não foi possível identificar o número na capa. Digite-o manualmente.',
  failed: 'Não foi possível ler este PDF. Digite o número manualmente.',
};

export function UploadProcessPage() {
  const [file, setFile] = useState<File | null>(null);
  const [numero, setNumero] = useState('');
  const [enviadoPor, setEnviadoPor] = useState('');
  const [extractStatus, setExtractStatus] = useState<ExtractStatus>('idle');
  const [fileError, setFileError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [successNumero, setSuccessNumero] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    setFileError(null);
    setFormError(null);
    setSuccessNumero(null);
    setNumero('');
    setFile(null);
    setExtractStatus('idle');
    if (!selected) return;

    if (selected.type !== 'application/pdf' && !selected.name.toLowerCase().endsWith('.pdf')) {
      setFileError('Envie um arquivo no formato PDF.');
      return;
    }
    if (selected.size > MAX_PDF_BYTES) {
      setFileError('O arquivo deve ter no máximo 50 MB.');
      return;
    }

    setFile(selected);
    setExtractStatus('extracting');
    try {
      const { extractCoverProcessNumber } = await import('../lib/pdfCover');
      const found = await extractCoverProcessNumber(selected);
      if (found) {
        setNumero(found);
        setExtractStatus('found');
      } else {
        setExtractStatus('not_found');
      }
    } catch {
      setExtractStatus('failed');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setSuccessNumero(null);

    if (!file) {
      setFormError('Selecione o PDF do processo.');
      return;
    }
    const numeroLimpo = numero.trim();
    if (!PROCESS_NUMBER_PATTERN.test(numeroLimpo)) {
      setFormError('O número do processo deve estar no formato 0000000-00.0000.0.00.0000.');
      return;
    }
    if (enviadoPor.trim() === '') {
      setFormError('Informe o usuário responsável pelo envio.');
      return;
    }

    setSaving(true);
    const result = await saveProcessUpload(file, numeroLimpo, enviadoPor.trim());
    setSaving(false);

    if (!result.ok) {
      setFormError(result.message);
      return;
    }

    setSuccessNumero(numeroLimpo);
    setFile(null);
    setNumero('');
    setExtractStatus('idle');
    setReloadKey((key) => key + 1);
  };

  const canSubmit = !saving && extractStatus !== 'extracting';

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">Enviar processo</h1>
        <p className="page-subtitle">
          Envie o PDF digitalizado do processo. O número será lido automaticamente da capa e o processo ficará
          disponível para comparação com a base Códex.
        </p>
      </header>

      <form className="card stack" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <span className="field-label">PDF do processo</span>
          <label className="file-drop">
            <input type="file" accept="application/pdf,.pdf" onChange={handleFileChange} hidden />
            <span className="file-drop-title">{file ? file.name : 'Clique para escolher o PDF'}</span>
            <span className="field-hint">Arquivo PDF digitalizado, até 50 MB</span>
          </label>
          {fileError && (
            <span className="field-error" role="alert">
              {fileError}
            </span>
          )}
          {extractStatus === 'extracting' && <span className="field-hint">Lendo a capa do processo...</span>}
          {extractStatus !== 'idle' && extractStatus !== 'extracting' && (
            <span className={extractStatus === 'found' ? 'field-hint' : 'field-error'}>
              {extractMessages[extractStatus]}
            </span>
          )}
        </div>

        <div className="grid-2">
          <div className="field">
            <label className="field-label" htmlFor="numero">
              Número do processo
            </label>
            <input
              id="numero"
              className="input"
              placeholder="0000000-00.0000.0.00.0000"
              value={numero}
              onChange={(event) => setNumero(event.target.value)}
            />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="enviadoPor">
              Usuário responsável pelo envio
            </label>
            <input
              id="enviadoPor"
              className="input"
              value={enviadoPor}
              onChange={(event) => setEnviadoPor(event.target.value)}
            />
          </div>
        </div>

        {formError && (
          <div className="form-alert" role="alert">
            {formError}
          </div>
        )}

        {successNumero && (
          <div className="notice" role="status">
            <div>
              <strong>Processo enviado</strong>
              <p>O processo {successNumero} foi salvo e aparece na lista abaixo.</p>
            </div>
          </div>
        )}

        <div className="row" style={{ justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary" disabled={!canSubmit}>
            {saving ? 'Enviando...' : 'Enviar processo'}
          </button>
        </div>
      </form>

      <UploadsGrid reloadKey={reloadKey} />
    </div>
  );
}

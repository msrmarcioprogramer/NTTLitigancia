import { useEffect, useState } from 'react';
import { createPdfUrl, listProcessUploads, type ProcessUpload } from '../lib/processUploads';

interface UploadsGridProps {
  reloadKey: number;
}

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; uploads: ProcessUpload[] };

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

export function UploadsGrid({ reloadKey }: UploadsGridProps) {
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [openingId, setOpeningId] = useState<string | null>(null);
  const [openError, setOpenError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });
    listProcessUploads()
      .then((uploads) => {
        if (!cancelled) setState({ status: 'ready', uploads });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            status: 'error',
            message: error instanceof Error ? error.message : 'Não foi possível carregar os envios.',
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const openPdf = async (upload: ProcessUpload) => {
    if (!upload.pdfPath) return;
    setOpeningId(upload.id);
    setOpenError(null);
    try {
      const url = await createPdfUrl(upload.pdfPath);
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      setOpenError(error instanceof Error ? error.message : 'Não foi possível abrir o arquivo.');
    } finally {
      setOpeningId(null);
    }
  };

  return (
    <section className="section" aria-label="Processos enviados">
      <h2 className="section-title">Processos enviados</h2>

      {openError && (
        <div className="form-alert" role="alert">
          {openError}
        </div>
      )}

      <div className="table-wrap">
        {state.status === 'loading' && <div className="empty-state">Carregando envios...</div>}

        {state.status === 'error' && (
          <div className="empty-state" role="alert">
            {state.message}
          </div>
        )}

        {state.status === 'ready' && state.uploads.length === 0 && (
          <div className="empty-state">Nenhum processo enviado ainda.</div>
        )}

        {state.status === 'ready' && state.uploads.length > 0 && (
          <table className="data-table">
            <thead>
              <tr>
                <th>Número do processo</th>
                <th>Data e hora do upload</th>
                <th>Usuário</th>
                <th>Arquivo</th>
              </tr>
            </thead>
            <tbody>
              {state.uploads.map((upload) => (
                <tr key={upload.id}>
                  <td>
                    <span className="cell-number">{upload.numero}</span>
                  </td>
                  <td>{formatDateTime(upload.criadoEm)}</td>
                  <td>{upload.enviadoPor ?? '-'}</td>
                  <td>
                    {upload.pdfPath ? (
                      <button
                        type="button"
                        className="btn btn-ghost btn-small"
                        disabled={openingId === upload.id}
                        onClick={() => openPdf(upload)}
                      >
                        {openingId === upload.id ? 'Abrindo...' : upload.nomeArquivo ?? 'Abrir PDF'}
                      </button>
                    ) : (
                      <span className="card-muted">Sem arquivo</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

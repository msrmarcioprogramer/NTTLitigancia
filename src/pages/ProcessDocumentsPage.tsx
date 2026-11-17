import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createPdfUrl, listProcessUploads, type ProcessUpload } from '../lib/processUploads';
import { useCases } from '../state/CasesContext';

type DocumentState =
  | { status: 'loading' }
  | { status: 'ready'; current: ProcessUpload; reference: ProcessUpload }
  | { status: 'error'; message: string };

export function ProcessDocumentsPage() {
  const { id = '' } = useParams();
  const { getCase, getReference } = useCases();
  const [state, setState] = useState<DocumentState>({ status: 'loading' });

  const caseItem = getCase(id);
  const reference = caseItem ? getReference(caseItem.analise.processoRelacionadoId) : undefined;

  useEffect(() => {
    if (!caseItem || !reference) {
      setState({ status: 'error', message: 'Não encontramos este processo para leitura.' });
      return;
    }

    let cancelled = false;
    setState({ status: 'loading' });

    listProcessUploads()
      .then(async (uploads) => {
        const current = uploads.find((upload) => upload.numero === caseItem.processo.numero);
        const referenceUpload = uploads.find((upload) => upload.numero === reference.numero);

        if (!current || !referenceUpload || !current.pdfPath || !referenceUpload.pdfPath) {
          throw new Error('Os PDFs destes processos ainda não estão disponíveis para leitura.');
        }

        const [currentUrl, referenceUrl] = await Promise.all([
          createPdfUrl(current.pdfPath),
          createPdfUrl(referenceUpload.pdfPath),
        ]);

        if (!cancelled) {
          setState({
            status: 'ready',
            current: { ...current, pdfPath: currentUrl },
            reference: { ...referenceUpload, pdfPath: referenceUrl },
          });
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            status: 'error',
            message: error instanceof Error ? error.message : 'Não foi possível abrir os documentos.',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [caseItem, reference]);

  if (!caseItem || !reference) {
    return (
      <div className="page">
        <div className="card empty-state">
          <p>Não encontramos este processo para leitura.</p>
          <Link to="/casos">Voltar para a listagem</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="document-reader-page">
      <header className="document-reader-header">
        <div>
          <Link className="back-link" to={`/casos/${caseItem.id}/comparacao`}>
            ← Voltar para a análise
          </Link>
          <h1 className="page-title">Leitura dos processos</h1>
          <p className="page-subtitle">
            Consulte os dois documentos lado a lado. Cada coluna possui sua própria rolagem para facilitar a comparação.
          </p>
        </div>
      </header>

      {state.status === 'loading' && <div className="card empty-state">Carregando os documentos...</div>}

      {state.status === 'error' && (
        <div className="card document-reader-error" role="alert">
          <strong>Não foi possível abrir os documentos</strong>
          <p>{state.message}</p>
          <Link className="btn btn-outline btn-small" to={`/casos/${caseItem.id}/comparacao`}>
            Voltar para a análise
          </Link>
        </div>
      )}

      {state.status === 'ready' && (
        <div className="document-reader-grid">
          <DocumentPane title="Processo analisado" upload={state.current} />
          <DocumentPane title="Processo relacionado" upload={state.reference} />
        </div>
      )}
    </div>
  );
}

interface DocumentPaneProps {
  title: string;
  upload: ProcessUpload;
}

function DocumentPane({ title, upload }: DocumentPaneProps) {
  return (
    <section className="document-pane" aria-label={title}>
      <div className="document-pane-header">
        <div>
          <span className="side-label">{title}</span>
          <strong>{upload.numero}</strong>
        </div>
        <span className="document-file-name">{upload.nomeArquivo ?? 'Documento PDF'}</span>
      </div>
      <div className="document-frame-wrap">
        <iframe title={`${title} ${upload.numero}`} src={upload.pdfPath ?? undefined} />
      </div>
    </section>
  );
}

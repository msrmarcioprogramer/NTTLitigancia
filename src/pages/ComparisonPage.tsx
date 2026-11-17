import { Link, useParams } from 'react-router-dom';
import { ProcessColumn } from '../components/ProcessColumn';
import { RiskIndicator, StatusBadge, WeightBadge } from '../components/Badges';
import { formatPercent } from '../lib/format';
import { useCases } from '../state/CasesContext';

export function ComparisonPage() {
  const { id = '' } = useParams();
  const { getCase, getReference } = useCases();
  const caseItem = getCase(id);
  const reference = caseItem ? getReference(caseItem.analise.processoRelacionadoId) : undefined;

  if (!caseItem || !reference) {
    return (
      <div className="page">
        <div className="card empty-state">
          <p>Não encontramos este processo para comparação.</p>
          <Link to="/casos">Voltar para a listagem</Link>
        </div>
      </div>
    );
  }

  const { processo, analise } = caseItem;

  return (
    <div className="page">
      <Link className="back-link" to="/casos">
        ← Voltar para a listagem
      </Link>

      <header className="page-header">
        <h1 className="page-title">Comparação entre processos</h1>
        <p className="page-subtitle">
          Veja lado a lado o processo recebido e o processo mais semelhante da Base de Litigância. Valores e partes
          iguais aparecem destacados.
        </p>
      </header>

      <div className="score-strip">
        <div className="card">
          <div className="kpi-label">Indicador de risco</div>
          <RiskIndicator score={analise.riskScore} />
        </div>
        <div className="card">
          <div className="kpi-label">Similaridade semântica</div>
          <div className="big-score">{formatPercent(analise.similaridade)}</div>
        </div>
        <div className="card">
          <div className="kpi-label">Situação da avaliação</div>
          <div style={{ marginTop: 8 }}>
            <StatusBadge status={caseItem.status} />
          </div>
        </div>
      </div>

      <div className="compare">
        <ProcessColumn label="Processo analisado" processo={processo} counterpart={reference} />
        <ProcessColumn
          label="Processo mais semelhante na Base"
          processo={reference}
          counterpart={processo}
          footer={
            <div className="row" style={{ fontSize: 14 }}>
              <span className="card-muted">Classificado como litigância abusiva:</span>
              <strong>{reference.classificadoComoAbusivo ? 'Sim' : 'Não'}</strong>
            </div>
          }
        />
      </div>

      <section className="section">
        <h2 className="section-title">Evidências identificadas</h2>
        <ul className="evidence-list">
          {analise.evidencias.map((evidencia) => (
            <li className="evidence-item" key={evidencia.titulo}>
              <div className="evidence-body">
                <span className="evidence-title">{evidencia.titulo}</span>
                <span className="evidence-detail">{evidencia.detalhe}</span>
              </div>
              <WeightBadge peso={evidencia.peso} />
            </li>
          ))}
        </ul>
      </section>

      <section className="ai-box" aria-label="Análise da inteligência artificial">
        <span className="ai-label">Análise explicativa da IA</span>
        <p>{analise.explicacaoIA}</p>
        <div className="ai-disclaimer">
          Esta análise é um apoio à decisão. Não substitui o julgamento do magistrado.
        </div>
      </section>

      <div className="row" style={{ justifyContent: 'flex-end' }}>
        <Link className="btn btn-primary" to={`/casos/${caseItem.id}/parecer`}>
          Registrar parecer
        </Link>
      </div>
    </div>
  );
}

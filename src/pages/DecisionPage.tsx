import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ClassBadge, RiskIndicator, StatusBadge, WeightBadge } from '../components/Badges';
import { formatPercent } from '../lib/format';
import { useCases } from '../state/CasesContext';
import type { ReviewStatus } from '../types';

type Decision = Extract<ReviewStatus, 'confirmada' | 'rejeitada'>;

const MIN_PARECER_LENGTH = 30;

export function DecisionPage() {
  const { id = '' } = useParams();
  const { getCase, getReference, registerOpinion } = useCases();
  const [decision, setDecision] = useState<Decision | null>(null);
  const [parecer, setParecer] = useState('');

  const caseItem = getCase(id);
  const reference = caseItem ? getReference(caseItem.analise.processoRelacionadoId) : undefined;

  if (!caseItem || !reference) {
    return (
      <div className="page">
        <div className="card empty-state">
          <p>Não encontramos este processo para avaliação.</p>
          <Link to="/casos">Voltar para a listagem</Link>
        </div>
      </div>
    );
  }

  const { processo, analise } = caseItem;
  const isFinal = caseItem.status === 'confirmada' || caseItem.status === 'rejeitada';
  const canSubmit = decision !== null && parecer.trim().length >= MIN_PARECER_LENGTH;

  const handleSubmit = () => {
    if (!decision || !canSubmit) return;
    registerOpinion(caseItem.id, decision, parecer.trim());
  };

  return (
    <div className="page">
      <Link className="back-link" to={`/casos/${caseItem.id}/comparacao`}>
        ← Voltar para a comparação
      </Link>

      <header className="page-header">
        <h1 className="page-title">Avaliação e parecer</h1>
        <p className="page-subtitle">
          Confirme ou rejeite a indicação de possível litigância abusiva e registre seu parecer. Esta etapa é sua.
        </p>
      </header>

      <div className="grid-2">
        <section className="card stack" aria-label="Resumo do caso">
          <div>
            <div className="side-label">Processo analisado</div>
            <h2 className="section-title" style={{ marginTop: 8 }}>
              {processo.numero}
            </h2>
            <p className="card-muted" style={{ margin: '4px 0 0' }}>
              {processo.assunto}
            </p>
          </div>
          <div className="row">
            <ClassBadge categoria={processo.categoriaClasse} classe={processo.classe} />
            <StatusBadge status={caseItem.status} />
          </div>
          <div className="grid-2" style={{ gap: 16 }}>
            <RiskIndicator score={analise.riskScore} />
            <div>
              <div className="kpi-label">Similaridade</div>
              <div className="big-score" style={{ fontSize: 28 }}>
                {formatPercent(analise.similaridade)}
              </div>
            </div>
          </div>
          <div>
            <div className="kpi-label">Processo mais semelhante</div>
            <div className="cell-number">{reference.numero}</div>
          </div>
          <div>
            <h3 className="card-title">Evidências principais</h3>
            <ul className="evidence-list">
              {analise.evidencias.map((evidencia) => (
                <li className="row" key={evidencia.titulo} style={{ justifyContent: 'space-between' }}>
                  <span>{evidencia.titulo}</span>
                  <WeightBadge peso={evidencia.peso} />
                </li>
              ))}
            </ul>
          </div>
          <Link className="btn btn-outline btn-small" to={`/casos/${caseItem.id}/comparacao`}>
            Rever comparação completa
          </Link>
        </section>

        {isFinal ? (
          <section className="card stack" aria-label="Parecer registrado">
            <h2 className="card-title" style={{ margin: 0 }}>
              Parecer registrado
            </h2>
            <div className="notice">
              <div>
                <strong>
                  {caseItem.status === 'confirmada'
                    ? 'Litigância abusiva confirmada'
                    : 'Indicação rejeitada: não é litigância abusiva'}
                </strong>
                <p>
                  Registrado por {caseItem.magistrado} em {caseItem.avaliadoEm}.
                </p>
              </div>
            </div>
            <div>
              <div className="kpi-label">Parecer</div>
              <p style={{ margin: '8px 0 0' }}>{caseItem.parecer}</p>
            </div>
            <Link className="btn btn-outline" to="/historico">
              Ver no histórico de avaliações
            </Link>
          </section>
        ) : (
          <section className="card stack" aria-label="Formulário de parecer">
            <div>
              <h2 className="card-title" style={{ margin: 0 }}>
                Sua decisão sobre a indicação
              </h2>
            </div>

            <div className="decision-options" role="radiogroup" aria-label="Decisão">
              <button
                type="button"
                role="radio"
                aria-checked={decision === 'confirmada'}
                data-tone="alerta"
                className={`option-card${decision === 'confirmada' ? ' selected' : ''}`}
                onClick={() => setDecision('confirmada')}
              >
                <span className="option-card-title">Confirmar litigância abusiva</span>
                <span className="option-card-text">Há indícios suficientes de repetição abusiva do pedido.</span>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={decision === 'rejeitada'}
                data-tone="regular"
                className={`option-card${decision === 'rejeitada' ? ' selected' : ''}`}
                onClick={() => setDecision('rejeitada')}
              >
                <span className="option-card-title">Não é litigância abusiva</span>
                <span className="option-card-text">Os indícios não se sustentam. O processo segue o trâmite normal.</span>
              </button>
            </div>

            <div className="field">
              <label className="field-label" htmlFor="parecer">
                Parecer
              </label>
              <textarea
                id="parecer"
                className="textarea"
                placeholder="Descreva os fundamentos da sua decisão."
                value={parecer}
                onChange={(event) => setParecer(event.target.value)}
              />
              <span className="field-hint">
                Mínimo de {MIN_PARECER_LENGTH} caracteres. Atualmente: {parecer.trim().length}.
              </span>
            </div>

            <div className="row" style={{ justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-primary" disabled={!canSubmit} onClick={handleSubmit}>
                Registrar parecer
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

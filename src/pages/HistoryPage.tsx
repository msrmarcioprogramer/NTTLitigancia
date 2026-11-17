import { Fragment, useMemo, useState } from 'react';
import { ClassBadge, RiskIndicator, StatusBadge } from '../components/Badges';
import { formatPercent } from '../lib/format';
import { useCases } from '../state/CasesContext';
import type { CaseUnderReview } from '../types';

type Filter = 'todos' | 'aguardando' | 'confirmada' | 'rejeitada';

const filters: { value: Filter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'aguardando', label: 'Aguardando avaliação' },
  { value: 'confirmada', label: 'Confirmadas' },
  { value: 'rejeitada', label: 'Rejeitadas' },
];

function matchesFilter(item: CaseUnderReview, filter: Filter): boolean {
  if (filter === 'todos') return true;
  if (filter === 'aguardando') return item.status === 'pendente' || item.status === 'em_analise';
  return item.status === filter;
}

export function HistoryPage() {
  const { cases } = useCases();
  const [filter, setFilter] = useState<Filter>('todos');
  const [query, setQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return cases.filter(
      (item) =>
        matchesFilter(item, filter) &&
        (term === '' ||
          item.processo.numero.toLowerCase().includes(term) ||
          item.processo.assunto.toLowerCase().includes(term)),
    );
  }, [cases, filter, query]);

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">Histórico de avaliações</h1>
        <p className="page-subtitle">
          Consulte os processos já analisados, o resultado produzido pela IA e o parecer registrado pelo magistrado.
        </p>
      </header>

      <div className="page-header-row">
        <div className="filters" role="tablist" aria-label="Filtrar avaliações">
          {filters.map((option) => (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={filter === option.value}
              className={`chip${filter === option.value ? ' active' : ''}`}
              onClick={() => setFilter(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <input
          className="search"
          type="search"
          placeholder="Buscar por número ou assunto"
          aria-label="Buscar por número ou assunto"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="table-wrap">
        {visible.length === 0 ? (
          <div className="empty-state">Nenhum processo encontrado com os filtros selecionados.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Processo</th>
                <th>Classe</th>
                <th>Risco (IA)</th>
                <th>Similaridade</th>
                <th>Decisão do magistrado</th>
                <th>Avaliado em</th>
                <th aria-label="Detalhes" />
              </tr>
            </thead>
            <tbody>
              {visible.map((item) => {
                const isExpanded = expandedId === item.id;
                return (
                  <Fragment key={item.id}>
                    <tr>
                      <td>
                        <div className="cell-number">{item.processo.numero}</div>
                        <div className="cell-sub">{item.processo.assunto}</div>
                      </td>
                      <td>
                        <ClassBadge categoria={item.processo.categoriaClasse} classe={item.processo.classe} />
                      </td>
                      <td>
                        <RiskIndicator score={item.analise.riskScore} />
                      </td>
                      <td>
                        <span className="similarity">{formatPercent(item.analise.similaridade)}</span>
                      </td>
                      <td>
                        <StatusBadge status={item.status} />
                        {item.magistrado && <div className="cell-sub">{item.magistrado}</div>}
                      </td>
                      <td>{item.avaliadoEm ?? <span className="card-muted">Aguardando</span>}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-ghost btn-small"
                          aria-expanded={isExpanded}
                          onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        >
                          {isExpanded ? 'Ocultar' : 'Detalhes'}
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td colSpan={7} className="details-cell">
                          <div className="grid-2" style={{ padding: '8px 0' }}>
                            <div>
                              <div className="kpi-label">Explicação da IA</div>
                              <p style={{ margin: '6px 0 0' }}>{item.analise.explicacaoIA}</p>
                            </div>
                            <div>
                              <div className="kpi-label">Parecer do magistrado</div>
                              <p style={{ margin: '6px 0 0' }}>
                                {item.parecer ?? 'Ainda não há parecer registrado para este processo.'}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

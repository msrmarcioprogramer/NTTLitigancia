import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClassBadge, RiskIndicator, StatusBadge } from '../components/Badges';
import { formatPercent, statusLabel } from '../lib/format';
import { useCases } from '../state/CasesContext';
import type { ReviewStatus } from '../types';

type Filter = 'todos' | ReviewStatus;

const filters: Filter[] = ['todos', 'pendente', 'em_analise', 'confirmada', 'rejeitada'];

export function CasesListPage() {
  const { cases, getReference } = useCases();
  const [filter, setFilter] = useState<Filter>('todos');

  const visible = filter === 'todos' ? cases : cases.filter((item) => item.status === filter);
  const sorted = [...visible].sort((a, b) => b.analise.riskScore - a.analise.riskScore);

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">Potenciais casos de litigância abusiva</h1>
        <p className="page-subtitle">
          Processos recebidos e analisados pelo sistema, ordenados pelo indicador de risco. A análise é um apoio:
          a decisão final é sempre sua.
        </p>
      </header>

      <div className="filters" role="tablist" aria-label="Filtrar por status">
        {filters.map((value) => {
          const count = value === 'todos' ? cases.length : cases.filter((item) => item.status === value).length;
          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={filter === value}
              className={`chip${filter === value ? ' active' : ''}`}
              onClick={() => setFilter(value)}
            >
              {value === 'todos' ? 'Todos' : statusLabel[value]}
              <span className="chip-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="table-wrap">
        {sorted.length === 0 ? (
          <div className="empty-state">Nenhum processo com este status no momento.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Processo</th>
                <th>Classe</th>
                <th>Indicador de risco</th>
                <th>Similaridade</th>
                <th>Processo relacionado</th>
                <th>Status</th>
                <th aria-label="Ações" />
              </tr>
            </thead>
            <tbody>
              {sorted.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="cell-number">{item.processo.numero}</div>
                    <div className="cell-sub">{item.processo.assunto}</div>
                    <div className="cell-sub">Recebido em {item.recebidoEm}</div>
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
                    <div className="cell-number">
                      {getReference(item.analise.processoRelacionadoId)?.numero ?? 'Não identificado'}
                    </div>
                    <div className="cell-sub">Base de Litigância</div>
                  </td>
                  <td>
                    <StatusBadge status={item.status} />
                  </td>
                  <td>
                    <Link className="btn btn-outline btn-small" to={`/casos/${item.id}/comparacao`}>
                      Analisar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

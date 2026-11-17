import { MonthlyBarChart } from '../components/MonthlyBarChart';
import { abusivosNaBase, distribuicaoPorClasse, entradasPorMes } from '../data/mockData';
import { formatPercent, statusLabel } from '../lib/format';
import { useCases } from '../state/CasesContext';
import type { ReviewStatus } from '../types';

const statusOrder: ReviewStatus[] = ['pendente', 'em_analise', 'confirmada', 'rejeitada'];

const totalBase = entradasPorMes.reduce((sum, point) => sum + point.base, 0);
const totalDistribuicao = distribuicaoPorClasse.reduce((sum, item) => sum + item.total, 0);

export function DashboardPage() {
  const { cases } = useCases();

  const aguardando = cases.filter((item) => item.status === 'pendente' || item.status === 'em_analise').length;
  const confirmadas = cases.filter((item) => item.status === 'confirmada').length;
  const totalRecebidos = cases.length;

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">Visão CODEX</h1>
        <p className="page-subtitle">
          Indicadores da Base de Litigância e dos processos recebidos e analisados pela aplicação.
        </p>
      </header>

      <div className="grid-kpi">
        <div className="card kpi">
          <span className="kpi-label">Processos na Base de Litigância</span>
          <span className="kpi-value">{totalBase.toLocaleString('pt-BR')}</span>
          <span className="kpi-hint">Últimos 11 meses</span>
        </div>
        <div className="card kpi">
          <span className="kpi-label">Abusivos identificados na Base</span>
          <span className="kpi-value">{abusivosNaBase.toLocaleString('pt-BR')}</span>
          <span className="kpi-hint">{formatPercent(abusivosNaBase / totalBase)} do total</span>
        </div>
        <div className="card kpi">
          <span className="kpi-label">Recebidos e analisados</span>
          <span className="kpi-value">{totalRecebidos}</span>
          <span className="kpi-hint">{confirmadas} com litigância confirmada</span>
        </div>
        <div className="card kpi">
          <span className="kpi-label">Aguardando avaliação</span>
          <span className="kpi-value">{aguardando}</span>
          <span className="kpi-hint">Dependem de parecer do magistrado</span>
        </div>
      </div>

      <section className="card stack" aria-label="Processos que entraram na base">
        <div className="page-header-row">
          <h2 className="card-title" style={{ margin: 0 }}>
            Processos que entraram na base por mês
          </h2>
          <div className="chart-legend">
            <span>
              <span className="legend-dot" style={{ background: 'var(--primary-700)' }} />
              Base histórica
            </span>
            <span>
              <span className="legend-dot" style={{ background: 'var(--gold-500)' }} />
              Recebidos pela aplicação
            </span>
          </div>
        </div>
        <MonthlyBarChart data={entradasPorMes} />
      </section>

      <div className="grid-2">
        <section className="card stack" aria-label="Distribuição por classe">
          <h2 className="card-title" style={{ margin: 0 }}>
            Distribuição por classe na Base
          </h2>
          <div className="hbar-list">
            {distribuicaoPorClasse.map((item) => {
              const share = item.total / totalDistribuicao;
              return (
                <div key={item.categoria}>
                  <div className="hbar-head">
                    <span>{item.label}</span>
                    <span className="card-muted">
                      {item.total} ({formatPercent(share)})
                    </span>
                  </div>
                  <div className="hbar-track">
                    <div className="hbar-fill" data-categoria={item.categoria} style={{ width: `${share * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="card stack" aria-label="Situação das avaliações">
          <h2 className="card-title" style={{ margin: 0 }}>
            Situação dos processos recebidos
          </h2>
          <div className="stacked-bar" role="img" aria-label="Distribuição dos processos recebidos por status">
            {statusOrder.map((status) => {
              const count = cases.filter((item) => item.status === status).length;
              if (count === 0) return null;
              return (
                <div
                  key={status}
                  data-status={status}
                  style={{ width: `${(count / totalRecebidos) * 100}%` }}
                  title={`${statusLabel[status]}: ${count}`}
                />
              );
            })}
          </div>
          <ul className="hbar-list" style={{ gap: 10, listStyle: 'none', padding: 0, margin: 0 }}>
            {statusOrder.map((status) => {
              const count = cases.filter((item) => item.status === status).length;
              return (
                <li key={status} className="row" style={{ justifyContent: 'space-between', fontSize: 14 }}>
                  <span>
                    <span className="legend-dot" data-status={status} />
                    {statusLabel[status]}
                  </span>
                  <strong>{count}</strong>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}

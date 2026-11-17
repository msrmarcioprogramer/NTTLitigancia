import type { ReactNode } from 'react';
import { ClassBadge } from './Badges';
import { formatCurrency } from '../lib/format';
import type { LegalProcess } from '../types';

interface ProcessColumnProps {
  label: string;
  processo: LegalProcess;
  counterpart: LegalProcess;
  footer?: ReactNode;
}

function Match() {
  return <span className="match">Igual</span>;
}

export function ProcessColumn({ label, processo, counterpart, footer }: ProcessColumnProps) {
  const counterpartNames = new Set(counterpart.partes.flatMap((party) => [party.nome, party.advogado]));
  const sameValue = processo.valorCausa === counterpart.valorCausa;

  return (
    <section className="card compare-side" aria-label={label}>
      <div>
        <div className="side-label">{label}</div>
        <h2 className="section-title" style={{ marginTop: 8 }}>
          {processo.numero}
        </h2>
        <p className="card-muted" style={{ margin: '4px 0 0' }}>
          {processo.assunto}
        </p>
      </div>

      <div>
        <h3 className="card-title">Dados processuais</h3>
        <dl className="kv">
          <dt>Classe</dt>
          <dd>
            <ClassBadge categoria={processo.categoriaClasse} classe={processo.classe} />
          </dd>
          <dt>Foro</dt>
          <dd>{processo.foro}</dd>
          <dt>Distribuição</dt>
          <dd>{processo.distribuicao}</dd>
          <dt>Valor da causa</dt>
          <dd>
            {formatCurrency(processo.valorCausa)}
            {sameValue && <Match />}
          </dd>
        </dl>
      </div>

      <div>
        <h3 className="card-title">Partes</h3>
        <div className="parties">
          {processo.partes.map((party) => (
            <div className="party" key={`${party.papel}-${party.nome}`}>
              <span className="party-role">{party.papel}</span>
              <span>
                {party.nome}
                {counterpartNames.has(party.nome) && <Match />}
              </span>
              <span className="card-muted">
                Advogado: {party.advogado}
                {counterpartNames.has(party.advogado) && <Match />}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="card-title">Movimentos</h3>
        <ul className="timeline">
          {processo.movimentos.map((movimento, index) => (
            <li key={`${movimento.data}-${index}`}>
              <span className="timeline-date">{movimento.data}</span>
              {movimento.descricao}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="card-title">Conteúdo</h3>
        <p style={{ margin: '0 0 16px', fontSize: 14 }}>{processo.resumo}</p>
        <blockquote className="quote">{processo.trechoPeticao}</blockquote>
      </div>

      {footer}
    </section>
  );
}

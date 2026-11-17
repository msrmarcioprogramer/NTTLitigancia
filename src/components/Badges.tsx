import type { CaseClassCategory, EvidenceWeight, ReviewStatus } from '../types';
import { categoryLabel, riskLevel, riskLevelLabel, statusLabel, weightLabel } from '../lib/format';

export function ClassBadge({ categoria, classe }: { categoria: CaseClassCategory; classe: string }) {
  return (
    <span className="badge badge-class" data-categoria={categoria} title={classe}>
      {categoryLabel[categoria]}
    </span>
  );
}

export function StatusBadge({ status }: { status: ReviewStatus }) {
  return (
    <span className="badge badge-status" data-status={status}>
      {statusLabel[status]}
    </span>
  );
}

export function WeightBadge({ peso }: { peso: EvidenceWeight }) {
  return (
    <span className="badge badge-weight" data-peso={peso}>
      {weightLabel[peso]}
    </span>
  );
}

export function RiskIndicator({ score }: { score: number }) {
  const level = riskLevel(score);
  return (
    <div className="risk" aria-label={`Risco ${riskLevelLabel[level]}, pontuação ${score} de 100`}>
      <div className="risk-value" data-level={level}>
        <span>{riskLevelLabel[level]}</span>
        <span>{score}/100</span>
      </div>
      <div className="score-bar">
        <div className="score-fill" data-level={level} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

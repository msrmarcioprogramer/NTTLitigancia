import type { CaseClassCategory, EvidenceWeight, ReviewStatus } from '../types';

export const categoryLabel: Record<CaseClassCategory, string> = {
  civel: 'Cível',
  execucao: 'Execução',
  familia: 'Família',
  juizado: 'Juizado',
  sumarissimo: 'Sumaríssimo',
  penal: 'Penal',
};

export const statusLabel: Record<ReviewStatus, string> = {
  pendente: 'Pendente',
  em_analise: 'Em análise',
  confirmada: 'Confirmada',
  rejeitada: 'Rejeitada',
};

export const weightLabel: Record<EvidenceWeight, string> = {
  alta: 'Peso alto',
  media: 'Peso médio',
  baixa: 'Peso baixo',
};

export type RiskLevel = 'alto' | 'medio' | 'baixo';

export const riskLevelLabel: Record<RiskLevel, string> = {
  alto: 'Alto',
  medio: 'Médio',
  baixo: 'Baixo',
};

export function riskLevel(score: number): RiskLevel {
  if (score >= 75) return 'alto';
  if (score >= 50) return 'medio';
  return 'baixo';
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export type CaseClassCategory = 'civel' | 'execucao' | 'familia' | 'juizado' | 'sumarissimo' | 'penal';

export type ReviewStatus = 'pendente' | 'em_analise' | 'confirmada' | 'rejeitada';

export type EvidenceWeight = 'alta' | 'media' | 'baixa';

export interface Party {
  papel: 'Autor' | 'Réu';
  nome: string;
  advogado: string;
}

export interface Movement {
  data: string;
  descricao: string;
}

export interface LegalProcess {
  id: string;
  numero: string;
  assunto: string;
  classe: string;
  categoriaClasse: CaseClassCategory;
  foro: string;
  distribuicao: string;
  valorCausa: number;
  partes: Party[];
  movimentos: Movement[];
  resumo: string;
  trechoPeticao: string;
}

export interface ReferenceProcess extends LegalProcess {
  classificadoComoAbusivo: boolean;
}

export interface Evidence {
  titulo: string;
  detalhe: string;
  peso: EvidenceWeight;
}

export interface Analysis {
  riskScore: number;
  similaridade: number;
  processoRelacionadoId: string;
  evidencias: Evidence[];
  explicacaoIA: string;
}

export interface CaseUnderReview {
  id: string;
  recebidoEm: string;
  processo: LegalProcess;
  analise: Analysis;
  status: ReviewStatus;
  parecer?: string;
  avaliadoEm?: string;
  magistrado?: string;
}

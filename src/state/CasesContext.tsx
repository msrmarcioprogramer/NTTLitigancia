import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { casesUnderReview as initialCases, referenceBase } from '../data/mockData';
import type { CaseUnderReview, ReferenceProcess, ReviewStatus } from '../types';

export const JUDGE_NAME = 'Dra. Patrícia Lacerda';

interface CasesContextValue {
  cases: CaseUnderReview[];
  getCase: (id: string) => CaseUnderReview | undefined;
  getReference: (id: string) => ReferenceProcess | undefined;
  registerOpinion: (id: string, status: Extract<ReviewStatus, 'confirmada' | 'rejeitada'>, parecer: string) => void;
}

const CasesContext = createContext<CasesContextValue | null>(null);

export function CasesProvider({ children }: { children: ReactNode }) {
  const [cases, setCases] = useState<CaseUnderReview[]>(initialCases);

  const getCase = useCallback((id: string) => cases.find((item) => item.id === id), [cases]);
  const getReference = useCallback((id: string) => referenceBase.find((item) => item.id === id), []);

  const registerOpinion = useCallback<CasesContextValue['registerOpinion']>((id, status, parecer) => {
    setCases((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              parecer,
              avaliadoEm: new Date().toLocaleDateString('pt-BR'),
              magistrado: JUDGE_NAME,
            }
          : item,
      ),
    );
  }, []);

  const value = useMemo(
    () => ({ cases, getCase, getReference, registerOpinion }),
    [cases, getCase, getReference, registerOpinion],
  );

  return <CasesContext.Provider value={value}>{children}</CasesContext.Provider>;
}

export function useCases(): CasesContextValue {
  const context = useContext(CasesContext);
  if (!context) {
    throw new Error('useCases deve ser usado dentro de CasesProvider');
  }
  return context;
}

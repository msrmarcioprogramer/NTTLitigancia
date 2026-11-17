import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { CasesProvider } from './state/CasesContext';
import { CasesListPage } from './pages/CasesListPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { ProcessDocumentsPage } from './pages/ProcessDocumentsPage';
import { DecisionPage } from './pages/DecisionPage';
import { HistoryPage } from './pages/HistoryPage';
import { DashboardPage } from './pages/DashboardPage';
import { UploadProcessPage } from './pages/UploadProcessPage';

function ProtectedApp() {
  const location = useLocation();
  const isAuthenticated = sessionStorage.getItem('litigancia-authenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <CasesProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/enviar" replace />} />
          <Route path="/enviar" element={<UploadProcessPage />} />
          <Route path="/casos" element={<CasesListPage />} />
          <Route path="/casos/:id/comparacao" element={<ComparisonPage />} />
          <Route path="/casos/:id/documentos" element={<ProcessDocumentsPage />} />
          <Route path="/casos/:id/parecer" element={<DecisionPage />} />
          <Route path="/historico" element={<HistoryPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/casos" replace />} />
        </Route>
      </Routes>
    </CasesProvider>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<ProtectedApp />} />
    </Routes>
  );
}

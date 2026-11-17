import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/enviar', index: '1', label: 'Enviar processo' },
  { to: '/casos', index: '2', label: 'Casos para análise' },
  { to: '/historico', index: '3', label: 'Histórico de avaliações' },
  { to: '/dashboard', index: '4', label: 'Visão CODEX' },
];

export function AppLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">Litigância Abusiva</span>
          <span className="brand-sub">Apoio ao magistrado</span>
        </div>
        <nav className="nav" aria-label="Menu principal">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="nav-link">
              <span className="nav-index">{item.index}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

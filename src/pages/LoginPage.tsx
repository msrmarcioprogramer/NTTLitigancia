import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DEMO_USER = 'user001';
const DEMO_PASSWORD = 'demo2026';

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (username.trim() === DEMO_USER && password === DEMO_PASSWORD) {
      sessionStorage.setItem('litigancia-authenticated', 'true');
      navigate('/enviar', { replace: true });
      return;
    }

    setError('Usuário ou senha inválidos. Confira os dados e tente novamente.');
  }

  return (
    <main className="login-page">
      <section className="login-brand-panel" aria-label="Identificação institucional">
        <div className="login-brand-content">
          <span className="login-eyebrow">Ambiente institucional</span>
          <h1>Litigância Abusiva</h1>
          <p>
            Apoio à análise de processos para uma tomada de decisão mais segura,
            organizada e fundamentada.
          </p>
          <div className="login-rule" />
          <span className="login-brand-caption">Tribunal de Justiça do Estado de São Paulo</span>
        </div>
        <div className="login-panel-pattern" aria-hidden="true" />
      </section>

      <section className="login-form-panel">
        <div className="login-form-wrap">
          <div className="login-heading">
            <span className="login-kicker">Acesso restrito</span>
            <h2>Bem-vindo</h2>
            <p>Entre com suas credenciais para acessar o ambiente de análise.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-field">
              <span>Usuário</span>
              <input
                className="input"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Digite seu usuário"
                autoComplete="username"
                required
              />
            </label>

            <label className="login-field">
              <span>Senha</span>
              <input
                className="input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Digite sua senha"
                autoComplete="current-password"
                required
              />
            </label>

            {error && <p className="form-alert" role="alert">{error}</p>}

            <button className="btn btn-primary login-submit" type="submit">
              Entrar no sistema
            </button>
          </form>

          <p className="login-help">Acesso destinado a usuários autorizados.</p>
        </div>

        <footer className="login-footer">
          <span>Desenvolvido para</span>
          <div className="login-logos">
            <img src="/images/image.png" alt="Tribunal de Justiça do Estado de São Paulo" />
            <img src="/images/image copy.png" alt="NTT DATA" />
          </div>
        </footer>
      </section>
    </main>
  );
}

export const demoCredentials = {
  username: DEMO_USER,
  password: DEMO_PASSWORD,
};

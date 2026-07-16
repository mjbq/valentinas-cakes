import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

interface LocationState {
  registered?: boolean;
}

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const result = login(email.trim(), password);

    if (result.ok) {
      navigate('/');
      return;
    }

    if (result.reason === 'not-found') {
      setError('No existe una cuenta registrada con este correo electrónico.');
    } else if (result.reason === 'blocked') {
      setError('Tu cuenta ha sido bloqueada por exceder los intentos permitidos. Contáctanos para desbloquearla.');
    } else {
      setError(
        `Contraseña incorrecta. Te ${result.attemptsLeft === 1 ? 'queda' : 'quedan'} ${result.attemptsLeft} intento${result.attemptsLeft === 1 ? '' : 's'} antes de que tu cuenta sea bloqueada.`
      );
    }
  }

  return (
    <section className="auth">
      <div className="card auth__card form-card">
        <span className="eyebrow">Bienvenida de vuelta</span>
        <h1>Iniciar sesión</h1>
        <p className="auth__subtitle">Ingresa con tu correo y contraseña para hacer tus pedidos.</p>

        {state?.registered && (
          <div className="alert alert-success">Cuenta creada con éxito. Ya puedes iniciar sesión.</div>
        )}
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Iniciar sesión
          </button>
        </form>

        <p className="auth__footer-text">
          ¿Aún no tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </div>
    </section>
  );
}

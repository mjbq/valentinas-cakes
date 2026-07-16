import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isAdult, isAllowedEmailDomain, isValidEmailFormat, validatePassword } from '../utils/validation';
import '../styles/Auth.css';

interface FormState {
  name: string;
  birthDate: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialState: FormState = { name: '', birthDate: '', email: '', password: '', confirmPassword: '' };

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.name.trim()) newErrors.name = 'Ingresa tu nombre completo.';

    if (!form.birthDate) {
      newErrors.birthDate = 'Ingresa tu fecha de nacimiento.';
    } else if (!isAdult(form.birthDate)) {
      newErrors.birthDate = 'Debes ser mayor de 18 años para registrarte.';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Ingresa tu correo electrónico.';
    } else if (!isValidEmailFormat(form.email)) {
      newErrors.email = 'El formato del correo no es válido.';
    } else if (!isAllowedEmailDomain(form.email)) {
      newErrors.email = 'Solo se aceptan correos @gmail.com o @inacap.cl.';
    }

    const passwordCheck = validatePassword(form.password);
    if (!passwordCheck.valid) {
      newErrors.password = passwordCheck.errors.join(' ');
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!validate()) return;

    const result = register({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      birthDate: form.birthDate,
    });

    if (!result.ok) {
      setFormError('Ya existe una cuenta registrada con este correo electrónico.');
      return;
    }

    navigate('/login', { state: { registered: true } });
  }

  return (
    <section className="auth">
      <div className="card auth__card form-card">
        <span className="eyebrow">Únete</span>
        <h1>Crear cuenta</h1>
        <p className="auth__subtitle">Regístrate para hacer tus pedidos en Valentina's Cakes.</p>

        {formError && <div className="alert alert-error">{formError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="name">Nombre completo</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="birthDate">Fecha de nacimiento</label>
            <input
              id="birthDate"
              type="date"
              value={form.birthDate}
              onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
            />
            {errors.birthDate && <span className="field-error">{errors.birthDate}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="nombre@gmail.com"
            />
            <span className="field-hint">Solo se aceptan correos @gmail.com o @inacap.cl</span>
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <span className="field-hint">
              Mínimo 8 caracteres, con mayúscula, minúscula, número y carácter especial.
            </span>
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword">Repetir contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            />
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Registrarme
          </button>
        </form>

        <p className="auth__footer-text">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </section>
  );
}

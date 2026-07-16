import { useState, type FormEvent } from 'react';
import { isValidEmailFormat } from '../utils/validation';
import '../styles/Contact.css';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initialState: FormState = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = 'Ingresa tu nombre.';
    if (!form.email.trim()) {
      newErrors.email = 'Ingresa tu correo electrónico.';
    } else if (!isValidEmailFormat(form.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido.';
    }
    if (!form.message.trim()) newErrors.message = 'Escribe tu mensaje.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(false);
    if (!validate()) return;

    // Este proyecto es una SPA de portafolio: el envío se simula localmente.
    setSubmitted(true);
    setForm(initialState);
  }

  return (
    <section className="contact">
      <div className="container contact__grid">
        <div className="card contact__form-card">
          <span className="eyebrow">Escríbenos</span>
          <h1>Contacto</h1>
          <p className="contact__intro">
            ¿Tienes dudas sobre tu pedido o quieres cotizar una torta personalizada? Completa el
            formulario y te responderemos a la brevedad.
          </p>

          {submitted && (
            <div className="alert alert-success">¡Gracias por tu mensaje! Te responderemos pronto.</div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              {errors.message && <span className="field-error">{errors.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Enviar mensaje
            </button>
          </form>
        </div>

        <div className="contact__side">
          <div className="card contact__info-card">
            <h2>Información de la empresa</h2>
            <ul className="contact__info-list">
              <li>
                <strong>Dirección:</strong> Av. Los Pastelitos 3456, La Granja, Santiago 
              </li>
              <li>
                <strong>Teléfono:</strong> +56 9 1234 5678 
              </li>
              <li>
                <strong>Correo:</strong> contacto@valentinascakes.cl
              </li>
              <li>
                <strong>Horario:</strong> Lunes a sábado, 10:00 a 19:00 hrs
              </li>
            </ul>
          </div>

          <div className="card contact__map-card">
            <h2>Ubicación</h2>
            <div className="contact__map-wrap">
              <iframe
                title="Ubicación INACAP Sede La Granja"
                src="https://maps.google.com/maps?q=INACAP+Sede+La+Granja&output=embed"
                loading="lazy"
                allowFullScreen
              />
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=INACAP+Sede+La+Granja"
              target="_blank"
              rel="noreferrer"
              className="contact__map-link"
            >
              Abrir en Google Maps ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

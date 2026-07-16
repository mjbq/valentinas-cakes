import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
      <span className="eyebrow">Ups...</span>
      <h1>Página no encontrada</h1>
      <p style={{ color: 'var(--color-choco-soft)', marginBottom: '1.5rem' }}>
        Parece que esta receta no existe. Volvamos a la página de inicio.
      </p>
      <Link to="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </section>
  );
}

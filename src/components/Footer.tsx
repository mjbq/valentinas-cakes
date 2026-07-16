import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="dot-divider" />
      <div className="container footer__inner">
        <div>
          <span className="footer__brand">Valentina's Cakes</span>
          <p className="footer__tagline">Pastelería artesanal hecha con cariño.</p>
        </div>

        <nav className="footer__links">
          <Link to="/">Inicio</Link>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/carrito">Carrito</Link>
        </nav>

        <div className="footer__meta">
          <p>
             María José Bustamante Quezada
          </p>
          <p>
             maria.bustamante40@inacapmail.cl
          </p>
        </div>
      </div>
      <p className="footer__copy">© {new Date().getFullYear()} Valentina's Cakes — Todos los derechos reservados</p>
    </footer>
  );
}

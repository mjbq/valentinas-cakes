import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logo from '../assets/images/logo.png';
import './Navbar.css';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate('/');
  }

  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/catalogo', label: 'Catálogo' },
    { to: '/contacto', label: 'Contacto' },
    { to: '/carrito', label: `Carrito${itemCount > 0 ? ` (${itemCount})` : ''}` },
  ];

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Logo de Valentina's Cakes" className="navbar__logo" />
          <span className="navbar__brand-text">
            Valentina's Cakes
            <small>Pastelería Artesanal</small>
          </span>
        </NavLink>

        <button
          className="navbar__toggle"
          aria-label="Abrir menú de navegación"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar__links ${menuOpen ? 'is-open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `navbar__link${isActive ? ' is-active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}

          {currentUser ? (
            <div className="navbar__user">
              <span className="navbar__greeting">Hola, {currentUser.name.split(' ')[0]}</span>
              <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="navbar__auth-links">
              <NavLink to="/login" className="btn btn-secondary btn-sm" onClick={() => setMenuOpen(false)}>
                Iniciar Sesión
              </NavLink>
              <NavLink to="/registro" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>
                Registrarse
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

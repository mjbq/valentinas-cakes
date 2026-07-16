import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';
import logo from '../assets/images/logo.png';
import '../styles/Home.css';

export default function Home() {
  const { products } = useProducts();
  const featured = products.filter((p) => p.offerPrice).slice(0, 3);
  const highlighted = featured.length >= 3 ? featured : products.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__text">
            <span className="eyebrow">Bienvenida a</span>
            <h1>Valentina's Cakes</h1>
            <p className="hero__subtitle">
              Tortas, kuchenes, pies y galletas artesanales, decoradas a mano para hacer de tu
              celebración un momento inolvidable.
            </p>
            <div className="hero__actions">
              <Link to="/catalogo" className="btn btn-primary">
                Ver catálogo
              </Link>
              <Link to="/contacto" className="btn btn-secondary">
                Hacer un pedido
              </Link>
            </div>
          </div>
          <div className="hero__logo-wrap">
            <img src={logo} alt="Valentina's Cakes - Pastelería Artesanal" className="hero__logo" />
          </div>
        </div>
      </section>

      <div className="dot-divider" />

      <section className="about">
        <div className="container about__inner">
          <div className="about__image" aria-hidden="true">
            <div className="about__image-frame" />
          </div>
          <div>
            <span className="eyebrow">¿Quiénes somos?</span>
            <h2>Repostería hecha con cariño, receta por receta</h2>
            <p>
              Somos una pastelería artesanal de Santiago de Chile, especializada en tortas
              personalizadas, kuchenes, pies caseros y galletas decoradas a mano. Cada pedido se
              elabora con ingredientes de calidad y mucho cariño, cuidando cada detalle para que tu
              celebración sea inolvidable: cumpleaños, matrimonios, bautizos y cualquier ocasión que
              merezca algo dulce.
            </p>
          </div>
        </div>
      </section>
      <section className="benefits">

  <div className="container">

    <div className="featured__header">
      <span className="eyebrow">¿Por qué elegirnos?</span>
      <h2>Nuestros Beneficios</h2>
    </div>

    <div className="benefits__grid">

      <article className="benefit-card">
        <div className="benefit-card__icon">
          <i className="bi bi-cake2-fill"></i>
        </div>

        <h3>Productos Artesanales</h3>

        <p>
          Elaboramos cada torta, cheesecake y cupcake de manera artesanal,
          utilizando ingredientes frescos y de excelente calidad.
        </p>
      </article>

      <article className="benefit-card">
        <div className="benefit-card__icon">
          <i className="bi bi-palette-fill"></i>
        </div>

        <h3>Diseños Personalizados</h3>

        <p>
          Creamos tortas únicas para matrimonios, cumpleaños, bautizos y todo
          tipo de celebraciones según tu idea.
        </p>
      </article>

      <article className="benefit-card">
        <div className="benefit-card__icon">
          <i className="bi-award-fill"></i>
        </div>

        <h3>Hecho con Amor</h3>

        <p>
          Cada preparación se realiza con dedicación y cariño para entregar un
          producto que sorprenda tanto por su sabor como por su presentación.
        </p>
      </article>

    </div>

  </div>

</section>
      <section className="featured">
        <div className="container">
          <div className="featured__header">
            <span className="eyebrow">Nuestros favoritos</span>
            <h2>Productos destacados</h2>
          </div>
          <div className="product-grid product-grid--center">
            {highlighted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

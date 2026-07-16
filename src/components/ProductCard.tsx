import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatCLP } from '../utils/format';
import './ProductCard.css';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { currentUser } = useAuth();

  const hasOffer = typeof product.offerPrice === 'number';
  const outOfStock = product.stock <= 0;

  function handleAdd() {
    if (!currentUser) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      return;
    }
    const result = addToCart(product.id);
    if (!result.ok && result.message) {
      alert(result.message);
    }
  }

  return (
    <article className="product-card card">
      <Link to={`/producto/${product.id}`} className="product-card__image-link">
        <img src={product.image} alt={product.name} className="product-card__image" />
        {hasOffer && <span className="product-card__badge">Oferta</span>}
      </Link>

      <div className="product-card__body">
        <div className="product-card__content">
          <span className="product-card__category">{product.category}</span>
          <h3 className="product-card__name">
            <Link to={`/producto/${product.id}`}>{product.name}</Link>
          </h3>

          <div className="product-card__price-row">
            {hasOffer ? (
              <>
                <span className="product-card__price-old">{formatCLP(product.price)}</span>
                <span className="product-card__price-offer">{formatCLP(product.offerPrice!)}</span>
              </>
            ) : (
              <span className="product-card__price-offer">{formatCLP(product.price)}</span>
            )}
          </div>

          <span className={`product-card__stock ${outOfStock ? 'is-out' : ''}`}>
            {outOfStock ? 'Sin stock' : `Stock disponible: ${product.stock}`}
          </span>
        </div>

        <button
          className="btn btn-primary btn-block btn-sm product-card__cta"
          onClick={handleAdd}
          disabled={outOfStock}
        >
          {outOfStock ? 'Agotado' : 'Agregar al carrito'}
        </button>
      </div>
    </article>
  );
}

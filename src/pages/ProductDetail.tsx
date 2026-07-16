import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import ProductCustomizer from "../components/ProductCustomizer/ProductCustomizer";
import type { ProductCustomization } from "../types";
import { formatCLP } from "../utils/format";
import "../styles/ProductDetail.css";
import { toast } from "react-toastify/unstyled";


export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { getProduct } = useProducts();
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [customization, setCustomization] = 
      useState<ProductCustomization>();

  const product = id ? getProduct(id) : undefined;

  if (!product) {
    return (
      <div className="container product-detail__not-found">
        <h1>Producto no encontrado</h1>
        <p>El producto que buscas ya no está disponible.</p>
        <Link to="/catalogo" className="btn btn-primary">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const hasOffer = typeof product.offerPrice === 'number';
  const outOfStock = product.stock <= 0;

 function handleAdd() {

  if (!currentUser) {

    toast.warning("Debes iniciar sesión para comprar.");

    navigate("/login");

    return;

  }

  if (!product) return;

  // Las tortas deben estar personalizadas
  if (
    product.category === "Tortas" &&
    !customization
  ) {

    toast.warning("Personaliza tu torta antes de agregarla.");
      return;

  }

  const result = addToCart(
    product.id,
    customization
  );

  if (!result.ok && result.message) {

    toast.error(result.message);

    return;

  }

  toast.success("Producto agregado al carrito 🛒");

}

  return (
    <section className="product-detail">
      <div className="container product-detail__grid">
        <div className="product-detail__image-wrap">
          <img src={product.image} alt={product.name} className="product-detail__image" />
          {hasOffer && <span className="product-card__badge">Oferta</span>}
        </div>

        <div className="product-detail__info">
          <span className="product-card__category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="product-detail__description">
              {product.description}
          </p>
            {product.category === "Tortas" && (
                <ProductCustomizer
  basePrice={
    hasOffer
      ? product.offerPrice!
      : product.price
  }
  onChange={setCustomization}
/>
    )}
            <div className="product-detail__price-row">
            {hasOffer ? (
              <>
                <span className="product-card__price-old">{formatCLP(product.price)}</span>
                <span className="product-detail__price-offer">{formatCLP(product.offerPrice!)}</span>
              </>
            ) : (
              <span className="product-detail__price-offer">{formatCLP(product.price)}</span>
            )}
          </div>

          <span className={`product-card__stock ${outOfStock ? 'is-out' : ''}`}>
            {outOfStock ? 'Sin stock disponible' : `Stock disponible: ${product.stock} unidades`}
          </span>

          <div className="product-detail__actions">
            <button className="btn btn-primary" onClick={handleAdd} disabled={outOfStock}>
              {outOfStock ? 'Agotado' : 'Agregar al carrito'}
            </button>
            <Link to="/catalogo" className="btn btn-secondary">
              Seguir viendo el catálogo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

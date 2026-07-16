import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";
import { formatCLP } from "../utils/format";
import "../styles/Cart.css";

export default function Cart() {
  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    confirmPurchase,
    subtotal,
    discount,
    total,
    isBirthdayToday,
  } = useCart();
  const { getProduct } = useProducts();
  const [purchaseMessage, setPurchaseMessage] =
    useState<string | null>(null);
function handleConfirmPurchase() {
    const result = confirmPurchase();
    if (result.ok) {
      setPurchaseMessage(
        "🎉 ¡Compra confirmada! Gracias por elegir Valentina's Cakes."
      );
    } else if (result.message) {
      setPurchaseMessage(result.message);
    }
}

function handleClearCart() {
    const confirmed = window.confirm(
      "¿Estás segura de que deseas vaciar el carrito?"
    );
    if (!confirmed) return;
    clearCart();
    setPurchaseMessage(null);
}
  if (items.length === 0) {
    return (
      <section className="cart cart--empty">
        <div className="container">
          {purchaseMessage ? (
            <div className="alert alert-success cart__confirm-alert">
              {purchaseMessage}
            </div>
          ) : (
            <p>Tu carrito está vacío por ahora.</p>
          )}
          <h1>¿Antojo de algo dulce?</h1>
          <Link
            to="/catalogo"
            className="btn btn-primary"
          >
            Ver catálogo
          </Link>
        </div>
      </section>
    );
  }
   return (
    <section className="cart">
      <div className="container">
        <h1>Carrito de Compras</h1>
        {purchaseMessage && (
          <div className="alert alert-success">
            {purchaseMessage}
          </div>
        )}
        {isBirthdayToday && (
          <div className="alert alert-info">
            🎉 ¡Feliz cumpleaños! Se aplicó un 10% de descuento a tu compra.
          </div>
        )}
        <div className="cart__layout">
          <div className="cart__items">
            {items.map((item) => {
              const product = getProduct(item.productId);
              if (!product) return null;
              const unitPrice =
                item.customization?.totalPrice ??
                product.offerPrice ??
                product.price;
              return (
                <div
                  key={item.id}
                  className="cart-item card"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="cart-item__image"
                  />
                  <div className="cart-item__info">
                    <h3>{product.name}</h3>
                    <span className="cart-item__category">
                      {product.category}
                    </span>
                    {item.customization && (
<div className="cart-item__customization">
<div className="custom-badge">

🎂 Torta Personalizada
</div>
<div className="custom-grid">
<p>
<strong>📏 Tamaño</strong>
<span>{item.customization.size}</span>
</p>
<p>
<strong>🍰 Bizcocho</strong>
<span>{item.customization.cake}</span>
</p>
<p>
<strong>🧁 Cobertura</strong>
<span>{item.customization.frosting}</span>
</p>
<p>
<strong>💲 Extras</strong>
<span>{formatCLP(item.customization.extraPrice)}</span>
</p>
</div>
<div className="custom-section">
<strong>🥄 Rellenos</strong>
<ul>
{item.customization.fillings.map((itemFill) => (
<li key={itemFill}>
✅ {itemFill}
</li>
))}
</ul>
</div>
<div className="custom-section">
<strong>🌸 Decoración</strong>
<ul>
{item.customization.decorations.map((itemDec) => (
<li key={itemDec}>
✨ {itemDec}
</li>
))}
</ul>
</div>
{item.customization.message && (
<div className="custom-message">
💌 "{item.customization.message}"
</div>
)}
</div>

)}
    <p className="cart-item__price">
           Precio Final:
     <strong>
           {" "}
           {formatCLP(unitPrice)}
     </strong>
    </p>
    <div className="cart-item__quantity">
       <button
          className="quantity-btn"
            onClick={() =>
          decreaseQuantity(item.id)
                        }
                      >
            <i className="bi bi-dash"></i>
       </button>

      <span className="quantity-value">
           {item.quantity}
      </span>

      <button
          className="quantity-btn"
          onClick={() =>
          increaseQuantity(item.id)
          }
          disabled={product.stock <= 0}
             >
             <i className="bi bi-plus"></i>
      </button>
  </div>

   <p className="cart-item__subtotal">
       Total:
   <strong>
        {" "}
        {formatCLP(
        unitPrice * item.quantity
     )}
  </strong>
  </p>

  </div>

  <button
      className="cart-item__remove"
       onClick={() =>
       removeFromCart(item.id)
      }
     >
      <i className="bi bi-trash"></i> Eliminar
    </button>
       </div>
      );
     })}

   </div>
       
  <div className="cart__summary card">
        <h2>Resumen de Compra</h2>
        <div className="cart__summary-row">
        <span>Subtotal</span>
        <span>{formatCLP(subtotal)}</span>
        </div>

         {discount > 0 && (
          <div className="cart__summary-row cart__summary-row--discount">
          <span>Descuento cumpleaños (10%)</span>
          <span>- {formatCLP(discount)}</span>
          </div>
          )}

        <div className="cart__summary-row cart__summary-total">
          <span>Total</span>
          <span>{formatCLP(total)}</span>
           </div>

       <button
           className="btn btn-primary btn-block"
           onClick={handleConfirmPurchase}
          >
           <i className="bi bi-credit-card"></i>
            {" "}
            Confirmar compra
       </button>

       <button
          className="btn btn-secondary btn-block"
          onClick={handleClearCart}
        >
          <i className="bi bi-cart-x"></i>
           {" "}
           Vaciar carrito
      </button>

         <Link
          to="/catalogo"
          className="btn btn-outline-primary btn-block"
          >
          Seguir comprando
         </Link>

       </div>
       </div>
      </div>
    </section>
  );
}
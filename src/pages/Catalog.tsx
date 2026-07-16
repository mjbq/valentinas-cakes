import { useMemo, useState } from 'react';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';
import '../styles/Catalog.css';

export default function Catalog() {
  const { products } = useProducts();
  const [category, setCategory] = useState('Todas');

  const categories = useMemo(() => ['Todas', ...new Set(products.map((p) => p.category))], [products]);

  const filtered = category === 'Todas' ? products : products.filter((p) => p.category === category);

  return (
    <section className="catalog">
      <div className="container">
        <div className="catalog__header">
          <span className="eyebrow">Nuestra pastelería</span>
          <h1>Catálogo completo</h1>
          <p>Explora todos nuestros productos artesanales, hechos a pedido con ingredientes frescos.</p>
        </div>

        <div className="catalog__filters" role="tablist" aria-label="Filtrar por categoría">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`catalog__filter-btn ${category === cat ? 'is-active' : ''}`}
              onClick={() => setCategory(cat)}
              role="tab"
              aria-selected={category === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="catalog__empty">No hay productos en esta categoría por el momento.</p>
        ) : (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

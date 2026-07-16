import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from '../utils/storage';

interface ProductsContextValue {
  products: Product[];
  getProduct: (id: string) => Product | undefined;
  decreaseStock: (id: string, quantity: number) => boolean;
  increaseStock: (id: string, quantity: number) => void;
}

const ProductsContext = createContext<ProductsContextValue | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() =>
    loadFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, PRODUCTS)
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
  }, [products]);

  function getProduct(id: string) {
    return products.find((p) => p.id === id);
  }

  function decreaseStock(id: string, quantity: number): boolean {
  const product = products.find((p) => p.id === id);

  if (!product) {
    return false;
  }

  if (product.stock < quantity) {
    return false;
  }

  setProducts((prev) =>
    prev.map((p) =>
      p.id === id
        ? {
            ...p,
            stock: p.stock - quantity,
          }
        : p
    )
  );

  return true;
}

  function increaseStock(id: string, quantity: number) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: p.stock + quantity } : p))
    );
  }

  return (
    <ProductsContext.Provider value={{ products, getProduct, decreaseStock, increaseStock }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts(): ProductsContextValue {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts debe usarse dentro de un ProductsProvider');
  return ctx;
}

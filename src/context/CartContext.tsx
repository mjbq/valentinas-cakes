import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CartItem, ProductCustomization } from "../types";
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from "../utils/storage";
import { useProducts } from "./ProductsContext";
import { useAuth } from "./AuthContext";
import { isSameDayAndMonth } from "../utils/validation";

interface CartSummary {
  items: CartItem[];

  addToCart: (
    productId: string,
    customization?: ProductCustomization
  ) => { ok: boolean; message?: string };

  removeFromCart: (productId: string) => void;

  increaseQuantity: (productId: string) => void;

  decreaseQuantity: (productId: string) => void;

  clearCart: () => void;

  confirmPurchase: () => { ok: boolean; message?: string };

  subtotal: number;

  discount: number;

  total: number;

  isBirthdayToday: boolean;

  itemCount: number;
}

const CartContext = createContext<CartSummary | undefined>(undefined);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>(() =>
    loadFromStorage<CartItem[]>(STORAGE_KEYS.CART, [])
  );

  const {
    products,
    getProduct,
    decreaseStock,
    increaseStock,
  } = useProducts();

  const { currentUser } = useAuth();

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CART, items);
  }, [items]);

  function addToCart(
    productId: string,
    customization?: ProductCustomization
  ): { ok: boolean; message?: string } {

  const product = getProduct(productId);

  if (!product) {
    return {
      ok: false,
      message: "Producto no encontrado.",
    };
  }

  if (product.stock <= 0) {
    return {
      ok: false,
      message: "Producto sin stock disponible.",
    };
  }

  const stockUpdated = decreaseStock(productId, 1);

  if (!stockUpdated) {
    return {
      ok: false,
      message: "No hay suficiente stock disponible.",
    };
  }

  setItems((prev) => {
    const existingItem = prev.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
  return prev.map((item) =>
    item.productId === productId
      ? {
          ...item,
          quantity: item.quantity + 1,
          customization:
            customization ?? item.customization,
        }
      : item
  );
}

    return [
      ...prev,
      {
        productId,
        quantity: 1,
        customization,
      },
    ];
  });

  return { ok: true };
}

function removeFromCart(productId: string) {
  const item = items.find((i) => i.productId === productId);

  if (!item) return;

  increaseStock(productId, item.quantity);

  setItems((prev) =>
    prev.filter((i) => i.productId !== productId)
  );
}

function increaseQuantity(productId: string) {
  const item = items.find((i) => i.productId === productId);

  if (!item) return;

  const stockUpdated = decreaseStock(productId, 1);

  if (!stockUpdated) return;

  setItems((prev) =>
    prev.map((i) =>
      i.productId === productId
        ? {
            ...i,
            quantity: i.quantity + 1,
          }
        : i
    )
  );
}

function decreaseQuantity(productId: string) {
  const item = items.find((i) => i.productId === productId);

  if (!item) return;

  if (item.quantity === 1) {
    removeFromCart(productId);
    return;
  }

  increaseStock(productId, 1);

  setItems((prev) =>
    prev.map((i) =>
      i.productId === productId
        ? {
            ...i,
            quantity: i.quantity - 1,
          }
        : i
    )
  );
}

  function clearCart() {
    if (items.length === 0) return;

    items.forEach((item) => {
      increaseStock(item.productId, item.quantity);
    });

    setItems([]);
  }

  function confirmPurchase(): { ok: boolean; message?: string } {
    if (items.length === 0) {
      return {
        ok: false,
        message: "Tu carrito está vacío.",
      };
    }

    setItems([]);

    return {
      ok: true,
    };
  }
    const isBirthdayToday =
    !!currentUser?.birthDate &&
    isSameDayAndMonth(
      new Date(currentUser.birthDate),
      new Date()
    );

  const subtotal = items.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.productId);

    if (!product) return acc;

    const unitPrice =
      item.customization?.totalPrice ??
      product.offerPrice ??
      product.price;

    return acc + unitPrice * item.quantity;
  }, 0);

  const discount = isBirthdayToday
    ? Math.round(subtotal * 0.1)
    : 0;

  const total = subtotal - discount;

  const itemCount = items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        confirmPurchase,
        subtotal,
        discount,
        total,
        isBirthdayToday,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartSummary {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error(
      "useCart debe usarse dentro de un CartProvider"
    );
  }

  return ctx;
}
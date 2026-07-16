export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  offerPrice?: number;
  stock: number;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  birthDate: string;
  failedAttempts: number;
  blocked: boolean;
  fromApi?: boolean;
}

export interface ProductCustomization {
  size: string;
  cake: string;
  fillings: string[];
  frosting: string;
  decorations: string[];
  message: string;
  extraPrice: number;
  totalPrice: number;
}

export interface CartItem {

  // Identificador único del producto dentro del carrito
  id: string;

  // Id del producto del catálogo
  productId: string;

  // Cantidad
  quantity: number;

  // Personalización
  customization?: ProductCustomization;

  // Fecha de creación (nos servirá para ordenar el carrito)
  createdAt: number;

}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
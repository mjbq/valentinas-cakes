import { Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProductsProvider } from './context/ProductsContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

function ApiStatusBanner() {
  const { apiError } = useAuth();
  if (!apiError) return null;

  return (
    <div className="alert alert-error" style={{ borderRadius: 0, textAlign: 'center', margin: 0 }}>
      No se pudieron cargar los usuarios iniciales desde la API: {apiError} La aplicación sigue
      funcionando con normalidad.
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalog />} />
      <Route path="/producto/:id" element={<ProductDetail />} />
      <Route path="/contacto" element={<Contact />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/carrito"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
     <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <Navbar />
            <ApiStatusBanner />
            <main className="main-content">
              <AppRoutes />
            </main>
            <Footer />
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    
  );
}

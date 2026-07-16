# Valentina's Cakes 🎂

Tienda e-commerce de pastelería artesanal, desarrollada como Evaluación 3 de Programación
Front End (INACAP). SPA construida con **React + Vite + TypeScript + React Router**, con
persistencia en **Local Storage** y consumo de la API pública **JSONPlaceholder**.

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

Luego abre la URL que muestra la terminal (por defecto `http://localhost:5173`).

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Estructura del proyecto

```
src/
  api/            Consumo de la API externa (JSONPlaceholder)
  assets/images/  Logo y fotos de productos
  components/     Navbar, Footer, ProductCard, ProtectedRoute
  context/        AuthContext, ProductsContext, CartContext (estado global)
  data/           Catálogo inicial de productos
  pages/          Home, Catalog, ProductDetail, Contact, Register, Login, Cart, NotFound
  types/          Interfaces TypeScript
  utils/          Validaciones, formato de precios, Local Storage
```

## Funcionalidades implementadas

- **Inicio**: menú, banner, sección "¿Quiénes somos?", 3 productos destacados y footer.
- **Catálogo**: mínimo 6 productos con filtro por categoría, imagen enlazada al detalle.
- **Detalle de producto**: información completa + agregar al carrito.
- **Contacto**: formulario validado, datos de la empresa y mapa de INACAP Sede La Granja.
- **Registro**: valida dominio de correo (@gmail.com / @inacap.cl), mayoría de edad,
  coincidencia y fortaleza de contraseña, y correos duplicados.
- **Login**: bloqueo de cuenta tras 3 intentos fallidos.
- **Carrito**: solo para usuarios logueados, evita productos repetidos (suma cantidad),
  calcula total automáticamente, aplica 10% de descuento si es el cumpleaños del usuario,
  botones para confirmar compra (descuenta stock real) y vaciar carrito (restaura stock).
- **Persistencia**: usuarios, productos, carrito, sesión e intentos de acceso en Local Storage.
- **API externa**: al primer inicio se registran automáticamente los 3 primeros usuarios de
  JSONPlaceholder (contraseña `Inacap123`, fecha de nacimiento `01-01-2000`), con manejo de
  errores de red/servidor.

## Pendiente de personalizar antes de entregar

- En `src/components/Footer.tsx`, reemplaza el nombre y el correo institucional por los tuyos.
- Los datos de contacto (dirección y teléfono) en `src/pages/Contact.tsx` son ficticios, tal
  como pide la pauta; puedes ajustarlos a tu gusto.
- Revisa los precios y descripciones en `src/data/products.ts` y ajústalos si quieres.

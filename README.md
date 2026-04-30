# MetricSales — Frontend

Aplicación web desarrollada en **React + Vite** que forma parte de un sistema de análisis de ventas para tiendas de ropa. El frontend se encarga del registro de usuarios, inicio de sesión, registro de ventas y visualización de métricas en un dashboard interactivo.

---

## Tecnologías utilizadas

- **React 18** — Librería principal de UI
- **Vite** — Bundler y servidor de desarrollo
- **React Router DOM** — Enrutamiento entre vistas
- **Recharts** — Gráficos interactivos (barras, torta)
- **Tailwind CSS** — Estilos utilitarios
- **Fetch API** — Comunicación con el backend

---

## Arquitectura del proyecto

```
src/
├── api/
│   ├── client.js              # Cliente HTTP base (fetch wrapper)
│   ├── endpoints.js           # Constantes de rutas de la API
│   └── services/
│       ├── auth.js            # Login y registro
│       ├── products.js        # Consulta de productos
│       └── sales.js           # Registro y consulta de ventas
├── context/
│   ├── AuthContext.jsx        # Proveedor de autenticación (AuthProvider)
│   └── authContext.js         # Instancia del contexto React
├── hooks/
│   ├── useAuth.js             # Hook para acceder al contexto de autenticación
│   └── useProducts.js         # Hook para cargar productos desde la API
├── views/
│   ├── Home.jsx               # Página principal (login / registro)
│   ├── AuthView.jsx           # Contenedor de formularios de auth
│   ├── StoreEntry.jsx         # Vista de registro de ventas
│   └── Dashboard.jsx          # Vista de métricas y gráficos
├── components/
│   ├── LoginForm.jsx          # Formulario de inicio de sesión
│   ├── RegisterForm.jsx       # Formulario de registro de vendedor
│   ├── ProtectedRoute.jsx     # Ruta protegida (requiere autenticación)
│   ├── Header.jsx             # Barra de navegación
│   ├── RedirectLinks.jsx      # Links de navegación interna
│   └── sales/
│       ├── FormSale.jsx       # Formulario de registro de venta
│       ├── ProductSearch.jsx  # Buscador de productos
│       ├── ProductList.jsx    # Lista del carrito
│       └── UltimateSales.jsx  # Ventas recientes
│   └── dashboard/
│       ├── DashboardHeader.jsx
│       ├── SalesMetrics.jsx
│       ├── TopProductsTable.jsx
│       ├── TopSellersTable.jsx
│       └── graphics/
│           ├── SimpleBarChart.jsx
│           └── PieChartWithCustomizedLabel.jsx
└── main.jsx                   # Punto de entrada y definición de rutas
```

---

## Vistas y flujo de la aplicación

### `/` — Página de inicio
Muestra el formulario de **login** o **registro** según lo que elija el usuario. Si ya está autenticado, redirige automáticamente a `/ventas`.

### `/ventas` — Registro de ventas *(protegida)*
Permite al vendedor autenticado:
- Buscar productos por nombre
- Agregar productos al carrito con cantidad
- Seleccionar tipo de venta (local o domicilio) y tienda
- Registrar la venta enviándola al backend
- Ver las 5 ventas más recientes en tiempo real

### `/dashboard` — Métricas *(protegida)*
Calcula y grafica directamente desde los datos de ventas:
- Total de ventas y monto facturado
- Gráfico de torta: ventas por vendedor
- Gráfico de barras: ventas por mes
- Tabla de productos más vendidos
- Tabla de vendedores con mayor facturación

> El dashboard está preparado para conectarse al servicio de análisis en Python cuando esté disponible.

---

## Autenticación

La autenticación es simple (sin JWT). Al hacer login, el backend retorna los datos del usuario (`id`, `name`, `email`, `vendorCode`, `role`) que se almacenan en `sessionStorage`. El contexto `AuthProvider` expone `user`, `isAuthenticated`, `login` y `logout` a toda la aplicación mediante el hook `useAuth`.

---

## Cómo ejecutar

### Requisitos
- Node.js 18+
- Backend Spring Boot corriendo en `http://localhost:8080`

### Pasos

```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## Conexión con el backend

El cliente HTTP (`src/api/client.js`) apunta a `http://localhost:8080/api`. Los endpoints consumidos son:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/login` | Inicio de sesión |
| POST | `/users` | Registro de vendedor |
| GET | `/products` | Listar productos |
| POST | `/sales` | Registrar venta |
| GET | `/sales` | Listar todas las ventas |

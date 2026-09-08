  # Sistema de Gestión de Despacho Digital — Gas Gotita

Plataforma digital para la Distribuidora de Gas Gotita (Chillán, Región de Ñuble), que reemplaza la gestión manual de pedidos, inventario y caja por un sistema centralizado con seguimiento en tiempo real. El proyecto surge de una ERS (Especificación de Requisitos de Software) que detalla la digitalización completa de la operación: desde la toma de pedidos del cliente hasta la entrega y el cuadre contable diario.

## 🎯 Contexto

La empresa opera actualmente con cuadernos y hojas sueltas, lo que genera falta de trazabilidad, descuadres de caja, saturación de la operadora telefónica y pedidos duplicados o extraviados. El sistema busca centralizar la información y dar autonomía tanto a clientes como a repartidores.

## 👥 Roles del sistema (RBAC)

| Rol | Permisos clave |
|---|---|
| **Administrador** | Único rol que crea/edita usuarios; acceso a reportes contables e inventario maestro |
| **Operadora** | Visualiza todos los pedidos, asigna repartidores y monitorea la flota en mapa |
| **Repartidor** | Gestiona sus pedidos asignados, actualiza estados de entrega y registra pagos |
| **Cliente** | Crea pedidos de forma autónoma y ve el estado de su pedido en tiempo real |

## 📦 Catálogo de productos

El sistema maneja precios diferenciados por tipo de cliente (Residencial / Comercial) y control de stock en tiempo real:

- **Cilindros de gas:** 5, 11, 15 y 45 kg
- **Reguladores:** doméstico estándar, alta presión, dual
- **Mangueras y conexiones:** 1.5 m, 3 m, abrazadera metálica, kit completo
- **Accesorios:** carro porta cilindro, tapa válvula, detector de gas

## ⚙️ Funcionalidades clave

- Login y registro segmentado por rol
- Pedidos en menos de 3 clics desde `cliente.html`, con seguimiento en vivo
- Cálculo dinámico de totales según tipo de cliente (`funciones.js`)
- Registro obligatorio del método de pago (Efectivo, Transferencia, Débito) al completar una entrega
- Al marcar un pedido como "Entregado": descuento automático de stock + registro en el Reporte de Caja Diario
- Seguimiento GPS en tiempo real de repartidores (cliente ve su pedido en camino, operadora ve toda la flota)

## 🧩 Requisitos no funcionales

- **Responsive:** desde 360px (móviles de repartidores) hasta 1280px (escritorio de operadora), con botones táctiles grandes
- **Offline-first:** los repartidores pueden registrar entregas sin señal (Local Storage) y sincronizar al recuperar conexión
- **Seguridad:** autenticación JWT (Bearer Tokens); datos sensibles del cliente visibles solo durante el ciclo de vida del pedido activo

## 🏗️ Arquitectura y stack propuesto (según ERS)

- **Frontend:** React (SPA)
- **Backend:** microservicios en Spring Boot (Java) — uno de autenticación/JWT, otro de pedidos/tarifas/stock
- **Base de datos:** MySQL, modelo normalizado en 3FN
- **Infraestructura:** Docker sobre AWS
- **Mapas:** Leaflet / Google Maps para tracking de repartidores
- **Comunicación:** API REST con JSON

## 📁 Estado actual de la implementación (frontend estático)

El desarrollo actual corresponde a la maqueta en HTML/CSS/JS vanilla de las vistas de cliente, previas a la integración con backend:

```
gotita/
├── Inicio.html
├── Cliente.html
├── Login.html
├── Registro.html
├── Administrador.html
├── Operador.html
├── Repartidor.html
├── css/
│   └── style.css
├── js/
│   └── funciones.js
└── img/
    └── logoGotita.png
    └── gas5kg.jpeg
    └── gas11kg.jpeg
    └── gas15kg.jpeg
    └── gas45kg.jpeg
```

Vistas pendientes (dependen de base de datos para su lógica):
- `Administrador.html`
- `Repartidor.html`
- `Operador.html`

## ✅ Estado del proyecto

- [x] Login y registro (maqueta HTML)
- [x] Formulario de pedidos con cálculo de total (frontend)
- [x] Precios visibles por producto en la interfaz
- [ ] Conexión con backend (Spring Boot + MySQL)
- [ ] Autenticación JWT real
- [ ] Vistas de Administrador, Operadora y Repartidor
- [ ] Integración de mapa (Leaflet/Google Maps)
- [ ] Modo offline-first

## 👤 Autor

  -Martin Escobar.
  -Roció Saez.
  

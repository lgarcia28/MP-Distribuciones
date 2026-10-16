# MP Distribuciones - Portal Mayorista B2B (Rosario, Santa Fe)

Plataforma web de comercio mayorista B2B desarrollada para **MP Distribuciones**, distribuidor de informática, tecnología y conectividad ubicado en **San Nicolás 2277, Rosario, Santa Fe**.

---

## 🚀 Características Principales

### 1. Identidad Visual y UI/UX Dark Tech
- **Colores de Marca:**
  - Fondo Dark Tech: `#090D16` / `#0B0F19`
  - Contenedores Grafito: `#131B2E` / `#161F36`
  - Acentos y Botones: Azul Eléctrico `#0066FF` / `#0084FF` con efectos Glow y Cyan `#00C2FF`
- **Header Dinámico:**
  - Isotipo MP estilizado en cápsula redondeada con gradiente azul.
  - Buscador predictivo en tiempo real por nombre, marca, modelo y SKU.
  - Switch de moneda (ARS $ / USD u$s) con indicador de cotización de referencia editable.
  - Acceso directo a perfil B2B y Drawer del carrito con contador reactivo.

### 2. Los 19 Rubros Oficiales del Negocio
Catálogo precargado con productos y especificaciones reales para cada categoría:
1. `NOTEBOOKS` (Lenovo V15 Ryzen 5, ASUS Vivobook 15 i5, HP 250 G9)
2. `HARDWARE` (AMD Ryzen 5 5600GT, Mother ASUS B550M Wi-Fi, MSI RTX 4060, Kingston Fury Beast)
3. `ALMACENAMIENTO` (SSD NVMe Kingston NV2 1TB 3500MB/s, SSD 2.5" A400, WD Elements 2TB)
4. `PERIFERICOS` (Logitech G203 Lightsync, Redragon Kumara K552 RGB, Combo MK220)
5. `AURICULARES` (HyperX Cloud Stinger 2, JBL Tune 520BT, F9 TWS Powerbank)
6. `CONSOLAS Y GAMERS` (Consola Portátil Retro R36S 64GB, R39S Pro 128GB, Joystick G808)
7. `CONECTIVIDAD` (Router TP-Link Archer AX12 Wi-Fi 6, Placa Wi-Fi USB Mercusys, Switch Gigabit)
8. `SEGURIDAD` (Cámara Imou Ranger 2C 1080p 360°, Cámara Bullet Exterior Hikvision 2MP)
9. `INSUMOS` (Pasta térmica Arctic MX-4, Aire comprimido Delta Compitt)
10. `SMARTWATCHES` (Xiaomi Redmi Watch 4 AMOLED GPS, Haylou Solar Plus RT3)
11. `STREAMING` (Micrófono Fifine K669B USB cardioide, Aro de luz LED 26cm con trípode 2.1m)
12. `CARGADORES NB` (Cargador universal 90W 10 puntas, Cargador Tipo C 65W PD)
13. `CARGADOR Y CABLE CELULAR TIPO C` (Cargador 25W Super Fast Charging, Cable 100W 5A Mallado)
14. `CARGADOR Y CABLE CELULAR IPHONE` (Combo Cargador 20W PD + Cable Lightning, Cable Foxconn)
15. `CARGADOR Y CABLE CELULAR V8` (Cable Micro USB 2.4A mallado, Cargador 2.1A)
16. `CABEZALES, CARGADORES AUTO Y TRANSMISORES DE AUTO` (Transmisor FM Bluetooth, Cargador 36W QC 3.0)
17. `ACCESORIOS, ADAPTADORES Y CABLES` (Cable HDMI 2.1 8K 60Hz, Conversor HDMI a VGA, Hub USB 3.0 4P)
18. `POLIRUBRO` (Blister 4 Pilas AAA recargables, Multímetro Tester digital DT-830B)
19. `VARIOS` (Pad mouse gamer XL 900x400mm, Soporte articulado monitor VESA, Organizador velcro)

### 3. Selector de Moneda y Conversión Automática
- Alterna entre **ARS ($)** y **USD (u$s)** con un solo clic.
- Permite modificar la **cotización de referencia** (por defecto $1.350 ARS) recalculando todo el catálogo y el carrito.

### 4. Acceso B2B con Bloqueo de Precios
- **Modo Invitado:** Los precios se muestran ocultos con el badge `🔒 Iniciar sesión para ver precios mayoristas`.
- **Registro Mayorista Inmediato:** Formulario con Razón Social, CUIT/DNI, Localidad/Provincia, Teléfono/WhatsApp, Email y Contraseña.
- Botones de acceso rápido para pruebas ("Rosario Computación SRL" y "Servicio Técnico Santa Fe").
- Precios desbloqueados automáticamente tras el login.

### 5. Carrito Drawer y Envío de Pedido por WhatsApp
- Carrito tipo Drawer deslizable con control de cantidades `+` / `-`, selector de facturación (**Factura A / Factura B / Consumidor Final**) y método de entrega (**Retiro en San Nicolás 2277 / Cadetería Rosario / Expreso Interior**).
- Al confirmar el pedido, genera el mensaje oficial formateado hacia el WhatsApp oficial de MP Distribuciones: **+54 9 341 340-8439** (`https://wa.me/5493413408439?text=...`):
  * 📦 *NUEVO PEDIDO MAYORISTA - MP DISTRIBUCIONES*
  * 👤 *Cliente:* [Nombre / Razón Social]
  * 🆔 *CUIT/DNI:* [Número]
  * 📍 *Localidad / Entrega:* [Dirección o Retiro en Local]
  * *DETALLE DEL PEDIDO:*
  * • [Cant]x [Nombre / Modelo del producto] - $[Subtotal]
  * 💰 *TOTAL ESTIMADO:* [Moneda] [Total]
  * 💬 *Solicito confirmación de stock y datos de cuenta para transferencia.*

---

## 🛠️ Comandos de Ejecución

Para iniciar el servidor de desarrollo local:
```bash
npm run dev
```

Para generar la versión de producción optimizada:
```bash
npm run build
```

Para previsualizar la compilación de producción:
```bash
npm run preview
```

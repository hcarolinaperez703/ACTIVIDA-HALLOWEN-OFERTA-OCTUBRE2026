# Duelo de Ofertas de Halloween - Claro (Proyecto Exportado)

Este paquete contiene la versión completa y exportable de la aplicación web y PWA **"Duelo de Ofertas de Halloween"** de Claro Colombia.

---

## 📁 Estructura del Proyecto

```text
Proyecto_Exportado/
│
├── index.html                   # Página principal: Arena interactiva del Duelo 3D y sesiones
├── pages/
│   ├── inicio.html             # Resumen del programa de capacitación y módulos
│   ├── contacto.html           # Formulario de soporte de mesas y coordinación
│   └── servicios.html          # Catálogo completo de ofertas Claro Hogar y contraofertas
│
├── assets/
│   ├── css/
│   │   └── styles.css          # Estilos oficiales: paleta Midnight/Claro, tipografías Cinzel y Work Sans
│   ├── js/
│   │   └── app.js              # Lógica interactiva: 5 sesiones simultáneas, cronómetro, PWA y contraoferta
│   ├── images/                 # Íconos vectoriales SVG PWA (192x192 y 512x512)
│   └── fonts/                  # Referencias a fuentes Google Fonts
│
├── docs/
│   └── README.md               # Esta documentación técnica y manual de despliegue
│
└── config/
    └── manifest.json           # Web App Manifest PWA estándar para instalación en dispositivos
```

---

## 🚀 Características Principales

1. **PWA Instalable con Acceso Público:**
   - Cumple los estándares de Progressive Web App con `manifest.json` y service worker.
   - Puede agregarse a la pantalla de inicio en Android, iOS (Safari) o instalarse en Chrome/Edge en escritorio.

2. **Campo: 5 Sesiones Simultáneas Independientes:**
   - Soporta hasta 5 mesas de capacitación en paralelo (`Mesa 01 - Alfa` hasta `Mesa 05 - Épsilon`).
   - Cada sesión maneja de forma independiente su oferta rival, su estado de **Contraoferta Fantasma**, su cronómetro de 45s y su estado operativo.

3. **Estado Dinámico por Sesión:**
   - 🟢 **Activo (en uso)**: Mesa ocupada realizando simulacros de objeciones.
   - 🟡 **Cerrado (disponible)**: Mesa libre para nuevo asesor o siguiente ronda.

4. **Lanzamiento de PWA en Ventana Independiente:**
   - Cada sesión puede abrirse en una ventana PWA autónoma (`?session=N&pwa=standalone`) para proyección en diferentes pantallas o estaciones de trabajo.

5. **3 Tarjetas de Competencia Actuales:**
   - **Competidor Plan Brujo** (Triple $149.900)
   - **Competidor Plan Sepulcro** (Doble $109.200)
   - **Competidor Plan Sombras** (Sencillo $84.900)

---

## 🛠️ Cómo Ejecutar o Publicar

1. **Servidor Local / Estático:**
   Puedes abrir `index.html` directamente en el navegador, o servir la carpeta mediante cualquier servidor estático:
   ```bash
   # Opción con npx
   npx serve Proyecto_Exportado

   # Opción con Python
   cd Proyecto_Exportado && python3 -m http.server 8080
   ```

2. **Despliegue en la Nube:**
   - Sube la carpeta a Firebase Hosting, Vercel, Netlify, GitHub Pages o Cloud Storage sin requerir backend ni bases de datos adicionales.

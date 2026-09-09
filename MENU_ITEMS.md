# Ítems de menú — Clientum CRM

Documento de referencia de los menús visibles del **Dashboard privado** y del
**Sitio Público** de Clientum CRM.

> Última revisión: 2026-09-09  
> Fuentes principales: `src/components/layout/Sidebar.tsx`,
> `src/components/layout/Navbar.tsx`, `src/components/public/PublicNavbar.tsx`,
> `src/components/public/PublicMobileMenu.tsx` y `src/components/public/PublicFooter.tsx`.

---

## 1. Dashboard privado

El dashboard se encuentra disponible para usuarios autenticados en `/app`.
También existen aliases compatibles en `/dashboard`, `/crm` y `/erp`.

### 1.1 Accesos rápidos de Ventas

| Ítem | Destino / función |
| --- | --- |
| Notificaciones | Tareas y actividades pendientes |
| Leads | Contactos con estado `Lead` |
| Negocios | Pipeline comercial / oportunidades |
| Contactos | Directorio de personas |
| Organizaciones | Empresas y cuentas corporativas |
| Notas | Bandeja de actividad |
| Registros de llamadas | Bandeja de actividad y seguimiento |

### 1.2 Panel de control & análisis

| Ítem | Identificador | Función |
| --- | --- | --- |
| Resumen Ejecutivo | `dashboard` | Pipeline de ventas y métricas clave |
| Centro de Funciones | `featureHub` | Conecta, protege y amplía el espacio de trabajo |
| Reportes & BI | `analytics` | Rendimiento, conversión y analítica |

### 1.3 CRM & gestión de ventas

| Ítem | Identificador | Función |
| --- | --- | --- |
| Negocios | `opportunities` | Oportunidades comerciales en vista Kanban o tabla |
| Empresas | `companies` | Cuentas y organizaciones |
| Contactos | `people` | Personas, leads y contactos |
| Tareas & Actividades | `tasks` | Seguimientos y tareas comerciales |
| Bandeja de actividad | `activityInbox` | Notas, llamadas y eventos |
| Calendario | `calendar` | Agenda comercial y próximos seguimientos |
| Propuestas & Presupuestos | `propuestas` | Generación de propuestas PDF |
| Prospección Mapa B2B | `googleMaps` | Búsqueda geolocalizada de prospectos |
| Lead Scoring MEDDIC | `meddic` | Evaluación y calificación de oportunidades |

### 1.4 Comunicación & marketing

| Ítem | Identificador | Función |
| --- | --- | --- |
| WhatsApp CRM | `whatsapp` | Bandeja omnicanal y conversaciones en tiempo real |
| Webmail Cloudflare | `webmail` | Bandeja de correo corporativo |
| Mensajes | `messages` | Centro unificado de conversaciones |
| Chatbot WhatsApp 24/7 | `chatbot` | Automatización de atención por WhatsApp |
| Campañas Masivas | `campaigns` | Campañas y envíos comerciales |

### 1.5 Ecosistema IA & automatización

| Ítem | Identificador | Función |
| --- | --- | --- |
| Asistente Gemini 1.5 | `aiAssistant` | Asistencia estratégica con IA |
| Agent OS (14 Agentes) | `agenteOS` | Agentes especializados para ventas, soporte y operaciones |
| Agente SDR Outreach | `sdrOutreach` | Prospección y seguimiento comercial |
| Estrategias GTM | `gtmStrategy` | Planificación go-to-market |
| Automatizaciones | `workflows` | Flujos, triggers y acciones automáticas |

### 1.6 Operaciones, pagos & e-commerce

| Ítem | Identificador | Función |
| --- | --- | --- |
| Operaciones ERP | `operations` | Operaciones internas y gestión ERP |
| Facturación AFIP (CAE) | `erp` | Comprobantes fiscales A, B y C |
| Cobros MercadoPago | `payments` | Checkouts y estado de pagos |
| Tienda Digital WhatsApp | `tiendaDigital` | Catálogo y pedidos digitales |
| Campus Academia LMS | `campusLMS` | Cursos y capacitación comercial |

### 1.7 Sistema, datos & configuración

| Ítem | Identificador | Función |
| --- | --- | --- |
| Custom Objects Studio | `customObjects` | Objetos y entidades personalizadas |
| CSV Import & Export | `csvStudio` | Importación y exportación de datos |
| Gestor de Dominios | `domainManager` | Dominios, DNS y configuración web |
| Configuración General | `settings` | Integraciones, permisos, auditoría y preferencias |

### 1.8 Acciones complementarias del dashboard

| Acción | Ubicación |
| --- | --- |
| Nuevo Registro | Botón `+` del encabezado lateral |
| Buscar registros | Buscador / paleta de comandos `⌘K` |
| Clientum Copilot | Tarjeta lateral y botón superior |
| Ver Portal Público | Acceso lateral para volver al sitio público |
| Cuentas Clave | Acceso rápido a las primeras oportunidades |
| Configuración de API | Disponible en módulos que requieren credenciales |
| Cambiar idioma | Menú “Más”: ES, EN y PT |
| Restablecer demo | Menú “Más” |
| Alternar Kanban / Tabla | Disponible en Negocios |
| Exportar CSV | Disponible en Negocios |
| Ver perfil | Pie del sidebar |
| Cerrar sesión | Pie del sidebar |

---

## 2. Sitio público

El sitio público se encuentra en `/`. Sus páginas internas se navegan mediante
hash, por ejemplo `/#/producto` o `/#/industrias/agro`.

### 2.1 Menú principal de escritorio

| Ítem | Ruta / acción |
| --- | --- |
| Inicio | `/#/` |
| Producto | Menú desplegable de productos y módulos |
| Industrias | Menú desplegable de soluciones por sector |
| Precios | `/#/precios` |
| Recursos | Menú desplegable de recursos y empresa |
| Contacto | `/#/contacto` |
| Buscar | Buscador público `⌘K` |
| Pedir Demo | `/#/contacto` |
| Ingresar al CRM / Ir al Dashboard | `/app` |

### 2.2 Menú Producto

| Ítem | Ruta |
| --- | --- |
| CRM 360° Omnicanal | `/#/clientum-crm` |
| WhatsApp Multiagente | `/#/producto/whatsapp-ia` |
| Facturación AFIP CAE | `/#/producto/erp` |
| Agente OS Autónomo | `/#/producto/agentes-ia` |
| Automatizaciones DAG | `/#/producto/automatizaciones` |
| Business Intelligence | `/#/producto/bi` |
| Prospección Maps IA | `/#/producto/integraciones` |
| Portal & Canales Digitales | `/#/producto/integraciones` |
| Ver arquitectura completa | `/#/producto` |
| Abrir Simulador WhatsApp | Abre el simulador interactivo |
| Ver Catálogo en Tienda | `/#/tienda/central` |

### 2.3 Menú Industrias

| Ítem | Ruta |
| --- | --- |
| Ver todas las 10 verticales | `/#/industrias` |
| Agroindustria & Maquinaria | `/#/industrias/agro` |
| Estudios Contables | `/#/industrias/estudios-contables` |
| Distribuidoras Mayoristas | `/#/industrias/distribuidoras` |
| Salud & Clínicas | `/#/industrias/salud` |
| Inmobiliarias & Desarrollos | `/#/industrias/inmobiliaria` |
| Gastronomía & Bares | `/#/industrias/gastronomia` |
| E-Commerce & Retail | `/#/industrias/ecommerce` |
| Servicios B2B & Corporativos | `/#/industrias/b2b` |
| Construcción & Corralones | `/#/industrias/construccion` |
| Automotor & Concesionarias | `/#/industrias/automotor` |
| Consultar con un especialista | `/#/contacto` |

### 2.4 Menú Recursos

| Ítem | Ruta |
| --- | --- |
| Casos de Éxito Reales | `/#/casos` |
| Campus Academia LMS | `/#/academia` |
| Servicios de Migración | `/#/servicios` |
| Gestor de Dominios & DNS | `/#/dominios` |
| Sobre Clientum Latam | `/#/about` |

### 2.5 Menú móvil

El menú móvil agrupa el contenido en tres pestañas:

#### Producto

- CRM 360° Omnicanal
- WhatsApp Multiagente & Baileys
- Facturación AFIP con CAE (WSFE)
- Agente OS Autónomo (Gemini 3.7)
- Automatizaciones & Flujos DAG
- Business Intelligence & Forecast

#### Industrias

- Agroindustria & Maquinaria
- Estudios Contables
- Distribuidoras Mayoristas
- Salud & Clínicas
- Inmobiliarias & Desarrollos
- Gastronomía & Bares
- E-Commerce & Retail
- Servicios B2B & Corporativos
- Construcción & Corralones
- Automotor & Concesionarias

#### Recursos

- Planes & Precios
- Casos de Éxito & Clientes
- Academia LMS Clientum
- Servicios de Implementación
- Tienda Digital Oficial
- Gestor de Dominios & Cloudflare

#### Acciones móviles

- Moneda de visualización: Pesos (ARS) / Dólares (USD)
- Iniciar Sesión
- Ingresar al CRM / Ir al Dashboard
- Cotizador
- Simulador
- Auditoría

### 2.6 Navegación del pie de página

#### Producto

- Overview Suite
- CRM 360°
- WhatsApp & Bots IA
- Automatizaciones DAG
- ERP & AFIP con CAE
- Business Intelligence
- Agent OS (14 Agentes)
- Integraciones

#### Industrias

- Directorio General
- Agroindustria
- Estudios Contables
- Distribuidoras Mayoristas
- Salud & Clínicas
- Inmobiliarias
- Gastronomía
- E-Commerce & Retail

#### Servicios

- Catálogo de Servicios
- Consultoría Comercial
- Integración AFIP & ERP
- Desarrollo Web & Tiendas
- Growth & Outreach B2B
- Gestión DNS & Cloudflare
- Tienda Digital Demo

#### Recursos

- Blog & Guías
- Campus Academia LMS
- Casos de Éxito
- Planes & Precios
- Sobre Clientum
- Contacto & Solicitar Demo
- Términos & Privacidad

#### Enlaces legales inferiores

- Términos — `/#/legal`
- Privacidad — `/#/privacidad`
- SLA 99.9% — `/#/terminos`

---

## 3. Rutas públicas adicionales

Además de los menús principales, el sitio incluye estas rutas públicas:

| Sección | Ruta |
| --- | --- |
| Suite de Producto | `/#/producto` |
| Marketing & Outreach | `/#/producto/marketing` |
| SEO Suite & Keywords | `/#/producto/seo` |
| Casos de éxito alternativo | `/#/casos-de-exito` |
| Recursos alternativo | `/#/recursos` |
| Blog | `/#/blog` |
| Demo | `/#/demo` |
| Tienda Digital | `/#/tienda` |
| Tienda Central | `/#/tienda/central` |
| Legal | `/#/legal` |
| Privacidad | `/#/privacidad` |
| Términos / SLA | `/#/terminos` |
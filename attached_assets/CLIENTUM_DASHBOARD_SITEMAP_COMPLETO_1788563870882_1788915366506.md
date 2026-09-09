# Clientum Dashboard — Sitemap completo

## Objetivo
Este sitemap separa la navegación del **dashboard autenticado** por dominios de negocio. La URL base propuesta es `/app`. Las pantallas actuales pueden seguir funcionando con el sistema de tabs existente, pero estas son las rutas canónicas recomendadas para convertir cada módulo en deep-link y lazy-load independiente.

## 1. Shell y acceso
```text
/
├── /sign-in
├── /sign-up
├── /app
├── /app/primeros-pasos
└── /app/mi-cuenta
```

## 2. Dashboard
```text
/app
├── /resumen
├── /actividad
├── /notificaciones
└── /busqueda
```

## 3. CRM
```text
/app/crm
├── /contactos
│   ├── /nuevo
│   └── /:contactId
├── /empresas
│   ├── /nueva
│   └── /:companyId
├── /negocios
│   ├── /pipeline
│   ├── /tabla
│   ├── /nuevo
│   └── /:opportunityId
├── /segmentos
├── /scoring-meddic
├── /prospeccion-maps
└── /propuestas
```

## 4. Productividad
```text
/app/productividad
├── /tareas
├── /calendario
├── /workflows
├── /automatizaciones
└── /actividad
```

## 5. Comunicación
```text
/app/comunicacion
├── /whatsapp
│   ├── /inbox
│   ├── /broadcasts
│   ├── /plantillas
│   ├── /configuracion
│   └── /chatbot
├── /email
│   └── /bandeja
└── /webmail
```

## 6. IA
```text
/app/ia
├── /copilot
├── /asistente
├── /agentes
├── /agent-os
├── /knowledge-base
├── /chatbot
├── /estrategia-gtm
├── /outreach-sdr
├── /ad-copy
└── /seo
```

## 7. Marketing
```text
/app/marketing
├── /campanas
├── /broadcasts
├── /audiencias
├── /contenido
├── /brochures
└── /seo
```

## 8. ERP y finanzas
```text
/app/erp
├── /resumen
├── /facturacion
│   ├── /nueva
│   └── /historial
├── /gastos
├── /inventario
├── /cobros
└── /suscripciones
```

## 9. E-commerce y verticales
```text
/app/commerce
├── /ecommerce
│   ├── /pedidos
│   ├── /catalogo
│   └── /clientes
├── /restaurant
│   ├── /salon
│   ├── /pedidos
│   └── /kds
└── /saas
    ├── /cluster
    ├── /tema
    └── /suscripciones
```

## 10. Presencia digital
```text
/app/sitios
├── /sitios-web
├── /widgets
├── /dominios
├── /tienda-publica
└── /portal-clientes
```

## 11. Datos
```text
/app/datos
├── /csv-studio
├── /objetos-personalizados
├── /importaciones
├── /exportaciones
└── /backups
```

## 12. Analytics
```text
/app/analytics
├── /resumen
├── /ventas
├── /pipeline
├── /ingresos
├── /objetivos
├── /forecast
└── /reportes
```

## 13. Configuración
```text
/app/configuracion
├── /perfil
├── /espacio-de-trabajo
├── /usuarios
├── /roles-y-permisos
├── /integraciones
├── /whatsapp
├── /facturacion
├── /dominios
├── /notificaciones
├── /seguridad
└── /preferencias
```

## 14. Integraciones
```text
/app/integraciones
├── /gmail
├── /google-drive
├── /whatsapp
├── /stripe
├── /mercadopago
├── /wordpress
├── /google-maps
└── /otras
```

## 15. Mapa del dashboard actual a rutas canónicas
| Vista actual | Ruta propuesta |
|---|---|
| gettingStarted | `/app/primeros-pasos` |
| publicStore | `/app/sitios/tienda-publica` |
| webmail | `/app/comunicacion/webmail` |
| opportunities | `/app/crm/negocios/pipeline` |
| companies | `/app/crm/empresas` |
| people | `/app/crm/contactos` |
| tasks | `/app/productividad/tareas` |
| analytics | `/app/analytics/resumen` |
| powerSuite | `/app/ia` |
| whatsapp | `/app/comunicacion/whatsapp/inbox` |
| erp | `/app/erp/resumen` |
| restaurant | `/app/commerce/restaurant` |
| ecommerce | `/app/commerce/ecommerce` |
| saasCluster | `/app/commerce/saas/cluster` |
| sites | `/app/sitios/sitios-web` |
| saasTheme | `/app/commerce/saas/tema` |
| subscriptions | `/app/erp/suscripciones` |
| segments | `/app/crm/segmentos` |
| chatbot | `/app/ia/chatbot` |
| automation | `/app/productividad/automatizaciones` |
| knowledge | `/app/ia/knowledge-base` |
| mapsProspecting | `/app/crm/prospeccion-maps` |
| meddic | `/app/crm/scoring-meddic` |
| campaigns | `/app/marketing/campanas` |
| aiAssistant | `/app/ia/asistente` |
| gtmStrategy | `/app/ia/estrategia-gtm` |
| sdrOutreach | `/app/ia/outreach-sdr` |
| adCopy | `/app/ia/ad-copy` |
| payments | `/app/erp/cobros` |
| clientPortal | `/app/sitios/portal-clientes` |
| seoSuite | `/app/ia/seo` |
| webDev | `/app/sitios/sitios-web` |
| customObjects | `/app/datos/objetos-personalizados` |
| workflows | `/app/productividad/workflows` |
| csvStudio | `/app/datos/csv-studio` |
| settings | `/app/configuracion` |
| brochure | `/app/marketing/brochures` |

## 16. Reglas de arquitectura
- `src/features/*` contiene funcionalidad de negocio por dominio.
- `src/platform/*` contiene shell, navegación y capacidades transversales de plataforma.
- `src/components/shared/*` contiene componentes reutilizables sin lógica de dominio.
- `src/core/*` contiene servicios, UI primitives de aplicación y utilidades de infraestructura frontend.
- `src/app/*` contiene composición, registry y navegación.
- Cada dominio debe poder evolucionar a una ruta lazy independiente sin mover su lógica a `app`.

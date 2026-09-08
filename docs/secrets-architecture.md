# Arquitectura de secretos y credenciales

## Alcance real

Este documento describe la separación que implementa actualmente ClientumCRM.
El inventario funcional puede mencionar proveedores futuros, pero un nombre en
Replit Secrets no activa por sí solo una integración.

## Tres niveles

| Nivel | Almacenamiento | Regla |
| --- | --- | --- |
| Plataforma | Replit Secrets y variables del proceso | Capacidades compartidas del servidor: cifrado, Gemini, SMTP, Firebase y webhook de WhatsApp. |
| Workspace/tenant | `clientum_tenant_credentials` cifrada | Credenciales que pertenecen a una empresa: WhatsApp, AFIP, Mercado Pago y Maps server-side. |
| Público | Bundle del frontend | Solo `VITE_*` que sean configuración pública y estén restringidas por dominio/API. |

Las variables `VITE_*` llegan al navegador. Nunca deben contener tokens privados,
certificados, claves privadas, contraseñas ni secretos de webhook.

## Cifrado y respuesta de la API

`WORKFLOW_ENCRYPTION_KEY` es la clave preferida. Si no existe, el backend usa
`API_KEY_PEPPER` y luego `SESSION_SECRET` como fallback técnico. Debe existir
al menos una clave real y no un placeholder.

La clave no se guarda en PostgreSQL ni se muestra en el panel. Cada payload se
cifra con AES-256-GCM y solo se persisten `iv`, `auth_tag` y
`encrypted_data`. Las respuestas del navegador contienen metadatos enmascarados
(`configured` y una máscara), nunca el valor descifrado.

Una actualización parcial se fusiona con los campos ya guardados; una rotación
envía un valor nuevo; eliminar el módulo elimina el registro del workspace.

## Identidad, tenants y aislamiento

En producción, el servidor obtiene el usuario desde un Firebase ID token
verificado con Firebase Identity Toolkit. En desarrollo, el header
`x-clientum-user-id` existe únicamente para la demo local.

El primer workspace personal se deriva de la identidad:

```text
tenant_<md5(user_id)[0:32]>
```

El cliente no puede elegir un `tenant_id` arbitrario. El servidor resuelve la
membresía antes de leer, fusionar o eliminar credenciales.

Tablas principales:

- `clientum_tenants`: identidad del workspace.
- `clientum_tenant_memberships`: usuarios, membresías y roles.
- `clientum_tenant_credentials`: una fila cifrada por tenant y módulo.
- `clientum_user_api_keys`: API Keys REST internas, separadas del vault de proveedores.

La migración y la inicialización idempotente conservan también las filas
históricas de `clientum_user_credentials` sin descifrar su payload.

## Variables de plataforma consumidas hoy

| Grupo | Variables | Uso |
| --- | --- | --- |
| Servidor | `PORT`, `NODE_ENV` | Puerto y separación entre demo local y producción. |
| Persistencia | `DATABASE_URL` o `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` | PostgreSQL administrado; el pool prefiere `DATABASE_URL` y luego el entorno `PG*`. |
| Seguridad | `WORKFLOW_ENCRYPTION_KEY`, `API_KEY_PEPPER`, `SESSION_SECRET`, `CLIENTUM_API_KEY_ADMIN_IDS` | Cifrado del vault, hash de API Keys internas y administración restringida. |
| IA | `GEMINI_API_KEY` | Backend `/api/ai/*` y categorización de gastos; usa fallback explícito si no es usable. |
| Firebase | `VITE_FIREBASE_*` | Configuración pública del cliente y verificación server-side del ID token. |
| Email | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `MAIL_FROM_ADDRESS`, `MAIL_FROM_NAME` | Estado y envío SMTP desde backend. |
| WhatsApp webhook | `WHATSAPP_APP_SECRET`, `WHATSAPP_WEBHOOK_VERIFY_TOKEN` | Firma `x-hub-signature-256` y challenge de verificación. |
| Desarrollo | `DISABLE_HMR`, `USER_CREDENTIAL_STORE_PATH`, `USER_API_KEY_STORE_PATH` | Vite y fallback cifrado local cuando no hay PostgreSQL. |

El backend valida placeholders y valores vacíos antes de marcar Gemini, SMTP o
el cifrado como utilizables. La presencia de un secret nunca equivale a una
conexión válida.

## Credenciales por workspace

El catálogo permite guardar, por módulo:

- WhatsApp/Meta por workspace: access token, app secret, phone number,
  business account y token de verificación, reservados para integración
  outbound.
- AFIP: CUIT, ambiente, certificado P12, clave privada y contraseña.
- Mercado Pago: access token, webhook secret y public key de la cuenta.
- Google Maps: `GOOGLE_MAPS_SERVER_API_KEY`.

El endpoint de prospección usa la clave server-side del workspace cuando existe.
El resto de proveedores está preparado en el vault y en la UI, pero Mercado
Pago, AFIP y WhatsApp outbound todavía requieren sus endpoints reales,
validación de firma, idempotencia y autorización antes de habilitar envíos.
El webhook de WhatsApp actualmente valida únicamente las variables de
plataforma `WHATSAPP_APP_SECRET` y `WHATSAPP_WEBHOOK_VERIFY_TOKEN`; no toma
esas credenciales desde el vault del workspace.

## Qué no debe confundirse con runtime activo

Cloudflare D1/R2, Shopify, Slack, Google OAuth, Resend, SendGrid, SMS,
N8N/Make/Zapier, PostHog, analítica externa, `APP_URL` y claves públicas de
Maps/Mercado Pago aparecen en el inventario funcional o en el catálogo, pero no
son consumidos por un cliente proveedor activo en el runtime actual. No deben
documentarse como “conectados” solo porque tengan un nombre de variable.

## Operación

```bash
npm run db:migrate
```

La migración usa `DATABASE_URL` o las variables administradas `PG*`. No se deben
solicitar ni copiar credenciales de tenant al `.env.example`.

Si no hay PostgreSQL en desarrollo, el servidor conserva un fallback local
cifrado. Ese archivo es solo para la demo y no es almacenamiento multi-tenant
válido para producción.
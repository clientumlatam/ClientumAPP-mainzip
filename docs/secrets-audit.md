# Auditoría de secretos e integraciones

**Fecha de revisión:** 2026-09-08  
**Alcance:** `.env.example`, `SECRETS.md`, arquitectura de credenciales,
backend Express, cliente React, migración y scripts de operación.

## Resumen ejecutivo

- Se revisaron nombres y rutas de uso, no valores de Secrets. Que una variable
  exista no demuestra que contenga una configuración válida.
- PostgreSQL es la persistencia preferida cuando existe `DATABASE_URL` o el
  entorno administrado `PG*`. Sin PostgreSQL, solo desarrollo usa el fallback
  cifrado local.
- Las credenciales del workspace se guardan cifradas por `tenant_id` y
  `module_id`; el navegador recibe únicamente metadatos enmascarados.
- Maps B2B es el único proveedor externo tenant-scoped que hoy realiza una
  llamada real: usa `GOOGLE_MAPS_SERVER_API_KEY` contra Google Places.
- Gemini, SMTP y las rutas con potencial de consumo pago exigen identidad
  Firebase verificada en producción. El fallback demo solo existe en desarrollo.

## Variables consumidas por el runtime

| Grupo | Variables | Estado |
| --- | --- | --- |
| Servidor | `PORT`, `NODE_ENV` | Activas: puerto y separación demo/producción. |
| Persistencia | `DATABASE_URL`, `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` | Activas: pool PostgreSQL; `DATABASE_URL` tiene prioridad. |
| Vault/API Keys | `WORKFLOW_ENCRYPTION_KEY`, `API_KEY_PEPPER`, `SESSION_SECRET`, `CLIENTUM_API_KEY_ADMIN_IDS` | Activas: cifrado, hashes y autorización administrativa. `SESSION_SECRET` no firma sesiones Express. |
| IA | `GEMINI_API_KEY` | Activa y opcional: `/api/ai/*` y `/api/expense/categorize`; placeholders se rechazan. |
| Firebase | `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`, `VITE_FIREBASE_MEASUREMENT_ID` | Activas: bundle público y verificación del ID token mediante Identity Toolkit. |
| Email | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `MAIL_FROM_ADDRESS`, `MAIL_FROM_NAME` | Activas: estado y envío SMTP; se valida que no sean placeholders. |
| WhatsApp webhook | `WHATSAPP_APP_SECRET`, `WHATSAPP_WEBHOOK_VERIFY_TOKEN` | Activas: firma `x-hub-signature-256` y challenge de Meta. |
| Desarrollo | `DISABLE_HMR`, `USER_CREDENTIAL_STORE_PATH`, `USER_API_KEY_STORE_PATH` | Activas solo para Vite o fallback local. |

## Credenciales por workspace

El catálogo y el backend aceptan estos campos tenant-scoped:

- `GOOGLE_MAPS_SERVER_API_KEY` para `moduleId=googleMaps`.
- Campos de WhatsApp para `whatsapp`, `chatbot`, `campaigns`, `sdrOutreach` y
  `tiendaDigital`; están preparados para outbound, pero el webhook actual lee
  las variables de plataforma directamente.
- Campos de AFIP para `erp`.
- Campos de Mercado Pago para `payments` y `tiendaDigital`.

El endpoint rechaza campos no permitidos, como `GEMINI_API_KEY` o
`CLOUDFLARE_API_TOKEN`. En producción, el tenant se resuelve desde la
membresía del usuario verificado; `x-clientum-user-id` solo funciona en demo.

## Declaradas, almacenadas o planificadas, pero no conectadas

Estas capacidades no deben mostrarse como “conectadas” por el solo hecho de
tener un nombre en el inventario o en Secrets:

- Mercado Pago: access token, webhook, public key y entorno; aún no hay cliente
  de preferencias/pagos/reembolsos.
- AFIP: certificado, clave privada, CUIT, entorno y servicios WSAA/WSFE; la UI
  y el vault están listos, pero no hay emisión de CAE.
- WhatsApp outbound: el webhook valida firmas, pero no hay envío Cloud API.
- Cloudflare D1/Workers, R2, Shopify, Slack, Google OAuth y proveedores SMS.
- Resend, SendGrid, N8N, Make, Zapier, PostHog y analítica externa.
- `APP_URL`, `VITE_GOOGLE_MAPS_API_KEY` y `VITE_MERCADOPAGO_PUBLIC_KEY` no son
  consumidos por un cliente activo en el runtime actual.

## Controles verificados en el código

1. Firebase no se inicializa con configuración vacía.
2. Los fallbacks de login, registro y recuperación están limitados a Vite
   development; credenciales Firebase inválidas no crean una sesión demo.
3. IA, categorización de gastos y envío SMTP requieren autenticación Firebase
   verificada cuando `NODE_ENV=production`.
4. Gemini, SMTP y el cifrado rechazan valores vacíos o placeholders.
5. Las claves de proveedores no se devuelven completas al navegador ni se
   escriben en logs.
6. Actualizaciones parciales conservan los campos cifrados no enviados.
7. La navegación muestra “Configurar API” solo en módulos con credenciales
   propias del workspace, no en módulos con configuración de plataforma.
8. Las API Keys REST internas se separan del vault de proveedores, se muestran
   completas una sola vez y se persisten como hash.
9. Maps devuelve un error explícito si Google Places rechaza una clave
   configurada; no presenta datos demo como si fueran reales.

## Riesgos y trabajo pendiente

- `firestore.rules` permite leer y escribir cualquier documento a un usuario
  autenticado. Si la aplicación vuelve a usar Firestore, deben agregarse reglas
  por usuario u organización antes de producción.
- Mercado Pago, AFIP y WhatsApp outbound requieren endpoints backend,
  validación de firma, idempotencia, permisos y pruebas específicas.
- La membresía multiusuario ya se resuelve server-side, pero falta la pantalla
  administrativa para invitar y retirar miembros del workspace.
- El fallback de archivos cifrados debe permanecer deshabilitado en producción.

## Verificación

La auditoría documental debe acompañarse con:

```bash
npm run lint
npm run build
npm run smoke:navigation
npm run smoke:credentials
git diff --check
```

El workflow debe arrancar con persistencia PostgreSQL cuando el entorno
administrado esté disponible. No se imprimen valores de Secrets durante estas
comprobaciones.
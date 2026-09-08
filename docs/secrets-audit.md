# Auditoría de secretos e integraciones

**Fecha de revisión:** 2026-09-08  
**Alcance:** inventario adjunto, `.env.example`, `SECRETS.md`, backend Express,
cliente React y flujo de credenciales por tenant.

## Resumen ejecutivo

- Los nombres de las variables del inventario están registrados en el entorno
  de trabajo. No se inspeccionaron valores secretos, por lo que su existencia
  no se considera una prueba de que el proveedor esté listo.
- Las credenciales introducidas desde `Configuración` se guardan por
  `tenant_id` y `module_id`, cifradas en PostgreSQL cuando está disponible. El
  navegador recibe únicamente metadatos enmascarados.
- **Prospección Maps B2B** ya tiene configuración visible dentro del módulo.
  Cuando el usuario guarda `GOOGLE_MAPS_SERVER_API_KEY`, la búsqueda utiliza
  la clave de ese usuario contra Google Places. Si no existe, conserva el
  resultado demo/fallback.
- Gemini, correo y endpoints que pueden consumir servicios pagos requieren una
  identidad Firebase verificada en producción. El modo demo continúa limitado al
  entorno de desarrollo.

## Matriz de uso real

### Variables de plataforma consumidas por el runtime

| Grupo | Variables | Uso |
| --- | --- | --- |
| IA | `GEMINI_API_KEY` | Backend para `/api/ai/*` y categorización de gastos. Se rechazan valores vacíos o de documentación. |
| Firebase público | `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`, `VITE_FIREBASE_MEASUREMENT_ID` | Configuración pública del bundle y verificación server-side del ID token mediante Firebase Identity Toolkit. |
| Persistencia | `DATABASE_URL` o `PGHOST`, `PGUSER`, `PGDATABASE` | PostgreSQL para credenciales por tenant y API Keys internas. Se prioriza la conexión administrada. |
| Cifrado/API Keys internas | `WORKFLOW_ENCRYPTION_KEY`, `API_KEY_PEPPER`, `SESSION_SECRET` | Se usa la primera disponible para cifrar el vault y generar hashes HMAC. `SESSION_SECRET` sigue siendo fallback técnico, no una sesión Express. |
| SMTP | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `MAIL_FROM_ADDRESS`, `MAIL_FROM_NAME` | Estado y envío de correo desde backend. La configuración se valida contra placeholders. |
| WhatsApp webhook | `WHATSAPP_APP_SECRET`, `WHATSAPP_WEBHOOK_VERIFY_TOKEN` | Firma `x-hub-signature-256` y challenge de verificación de Meta. |
| Administración | `NODE_ENV`, `CLIENTUM_API_KEY_ADMIN_IDS` | Separación demo/producción y autorización de administración de API Keys de otros usuarios. |

### Credenciales por tenant

Se aceptan desde la configuración del módulo y no son variables globales:

- `GOOGLE_MAPS_SERVER_API_KEY` en `moduleId=googleMaps`, cuando cada empresa
  utiliza su propio proyecto de Google.
- Campos de WhatsApp, Mercado Pago, AFIP y Google Maps definidos en
  `src/data/moduleCredentials.ts`.

La separación es efectiva en producción porque el usuario se obtiene del
Firebase ID token y el servidor resuelve su membresía en
`clientum_tenant_memberships`. El header `x-clientum-user-id` solo sirve para
la demo local. El endpoint rechaza campos que pertenecen a la plataforma, como
`GEMINI_API_KEY` o `CLOUDFLARE_API_TOKEN`.

### Declaradas, pero todavía no conectadas al runtime

Estas variables aparecen en el inventario o catálogo, pero no tienen un
endpoint de proveedor real implementado todavía:

- Mercado Pago: `MERCADOPAGO_ACCESS_TOKEN`,
  `MERCADOPAGO_WEBHOOK_SECRET`, `VITE_MERCADOPAGO_PUBLIC_KEY`,
  `MERCADOPAGO_ENVIRONMENT`.
- AFIP: certificado, clave privada, contraseña, CUIT y endpoints WSAA/WSFE.
- WhatsApp outbound: `WHATSAPP_ACCESS_TOKEN`,
  `WHATSAPP_PHONE_NUMBER_ID` y `WHATSAPP_BUSINESS_ACCOUNT_ID`.
- Cloudflare D1/Workers, R2, Shopify, Slack, Google OAuth y proveedores SMS.
- `APP_URL` y `SESSION_SECRET` no habilitan por sí solos una sesión o dominio
  canónico; esas funciones todavía no están implementadas.

No deben marcarse como “conectadas” en la UI solo porque el nombre exista en
Secrets.

## Cambios de seguridad aplicados

1. Firebase ya no intenta inicializarse con una configuración vacía.
2. Los fallbacks de login, registro y recuperación solo existen en Vite
   development. En producción, una configuración Firebase ausente o un error
   de autenticación falla de forma cerrada.
3. La recuperación demo ya no acepta cualquier cadena de seis caracteres:
   solo acepta el token generado y guardado localmente en el preview.
4. Se eliminaron valores iniciales de email/contraseña demo de los formularios
   y el botón de acceso rápido solo aparece en desarrollo.
5. IA, categorización de gastos y envío SMTP requieren autenticación Firebase
   en producción.
6. La validación de Gemini y SMTP rechaza placeholders, no solo valores
   presentes.
7. Cada módulo del catálogo tiene acceso al mismo modal seguro desde el menú
   lateral o la barra superior. El modal distingue credenciales del workspace,
   configuración pública y secretos/conexiones administrados por la plataforma.
8. Las actualizaciones parciales de credenciales se fusionan en el backend para
   no borrar otros campos cifrados ya configurados.
9. Prospección Maps B2B usa la credencial cifrada del tenant. La clave nunca
   se devuelve al cliente ni se registra.
10. Si Google Places rechaza una búsqueda con una clave configurada, se devuelve
   un error explícito en vez de presentar resultados demo como si fueran reales.

## Riesgos y trabajo pendiente

- `firestore.rules` permite leer y escribir cualquier documento a cualquier
  usuario autenticado. Si la aplicación comienza a usar Firestore, hay que
  reemplazarlo por reglas por usuario/organización antes de producción.
- Mercado Pago, AFIP y envío saliente de WhatsApp requieren implementación
  backend, validación de firma/idempotencia y pruebas específicas antes de
  habilitar sus pantallas como “reales”.
- La membresía multiusuario ya tiene tablas y resolución server-side, pero aún
  falta una pantalla administrativa para invitar y retirar miembros del tenant.

## Verificación ejecutada

- `npm run lint` — correcto.
- `npm run build` — correcto.
- Workflow `Start application` — servidor iniciado en puerto 5000 con
  persistencia PostgreSQL.
- `npm run smoke:navigation` — correcto: valida portada, redirecciones,
  login demo, API Keys por usuario, logout y protección del modo app.
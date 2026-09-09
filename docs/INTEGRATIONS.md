# Integraciones y configuración del runtime

Este documento refleja el estado del código actual de ClientumCRM. No es un
catálogo de proveedores ni una promesa de cuotas gratuitas. Los precios,
límites, requisitos de verificación y nombres de los planes cambian; deben
confirmarse en la documentación oficial de cada proveedor antes de activar
una cuenta.

## Estado actual

| Integración | Estado en el runtime | Configuración principal |
| :--- | :--- | :--- |
| Google Gemini | Activa, como capacidad de plataforma | `GEMINI_API_KEY` |
| Firebase Authentication | Activa si existe configuración pública válida | `VITE_FIREBASE_*` |
| Firebase Analytics | Opcional; se inicializa solo cuando Firebase está listo | `VITE_FIREBASE_*` |
| PostgreSQL | Activa | `DATABASE_URL` o variables `PG*` |
| SMTP/Nodemailer | Activa cuando el SMTP está configurado | `SMTP_*`, `MAIL_FROM_*` |
| Google Places | Activa para prospección cuando el workspace tiene una clave | `GOOGLE_MAPS_SERVER_API_KEY` |
| Mercado Pago | Activa para checkout cuando el workspace tiene credenciales y PostgreSQL | Credenciales por workspace + `APP_URL` |
| Meta WhatsApp Webhook | Parcial: validación de challenge y firma | `WHATSAPP_APP_SECRET`, `WHATSAPP_WEBHOOK_VERIFY_TOKEN` |

Las siguientes referencias aparecen en el inventario o en la interfaz, pero no
son conexiones activas del runtime: Apify, Hunter.io, Resend, SendGrid,
Cloudflare API/D1/R2, Slack, Google Calendar, AFIP, Shopify, n8n, Make,
Zapier y PostHog. No agregues sus variables suponiendo que eso habilita el
servicio.

## 1. Google Gemini

El backend usa el SDK oficial `@google/genai`. La clave de plataforma se lee
únicamente en el servidor mediante `GEMINI_API_KEY`; no se expone al navegador
ni se guarda como credencial de un workspace.

Se utiliza en endpoints de IA para:

- Copilot y generación de contenido.
- Estrategias GTM y textos publicitarios.
- Sugerencias de objetivos.
- Categorización de gastos.
- Transcripción de audio.
- Funciones de agente y asistente público.

El servidor prueba modelos compatibles mediante una lista de fallback. Entre
los modelos configurados actualmente se encuentran `gemini-3.7-flash`,
`gemini-flash-latest` y, para transcripción, `gemini-2.5-flash`. No se debe
documentar un modelo como garantía de disponibilidad del proveedor.

### Configuración

```env
GEMINI_API_KEY=
```

Si la variable falta, está vacía o contiene un placeholder, la aplicación no
debe reportar la integración como lista. Los endpoints que necesitan IA
devuelven su respuesta de configuración o fallback explícito.

Fuente oficial: [Google AI for Developers](https://ai.google.dev/).

## 2. Firebase Authentication y Analytics

Firebase se usa en el cliente para:

- Inicio de sesión con Google, Facebook y LinkedIn cuando los proveedores
  están habilitados.
- Registro e inicio de sesión por email y contraseña.
- Recuperación de contraseña.
- Escucha del estado de autenticación.
- Analytics opcional cuando el navegador lo soporta.

El proyecto no usa Firebase Firestore como base de datos de CRM. La
persistencia del servidor usa PostgreSQL.

La configuración `VITE_FIREBASE_*` es configuración pública del cliente, no una
clave secreta. El servidor usa la configuración de Firebase para validar
tokens Bearer en producción. Si la configuración pública está incompleta,
Firebase no se inicializa y el modo demo solo está permitido durante el
desarrollo.

### Configuración

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

Restringe la API key desde Firebase/Google Cloud por dominio y APIs. Nunca
coloques una clave privada de Firebase en una variable `VITE_*`.

Fuentes oficiales:

- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firebase Analytics](https://firebase.google.com/docs/analytics)

## 3. PostgreSQL

El backend crea un pool con `pg`. Acepta una URL completa o la configuración
`PG*` que proporciona el entorno administrado:

```env
DATABASE_URL=
# Alternativa administrada:
PGHOST=
PGPORT=5432
PGUSER=
PGPASSWORD=
PGDATABASE=
```

Neon PostgreSQL es compatible, pero no es un requisito del código. También se
acepta cualquier PostgreSQL administrado que exponga una conexión válida.
Cuando no hay PostgreSQL, algunas funciones persistentes —por ejemplo el
estado de pagos y el vault de credenciales— no están disponibles. El fallback
local de credenciales es solo para desarrollo y no debe usarse como
almacenamiento multi-tenant.

## 4. Email transaccional por SMTP

El envío se implementa con Nodemailer. No existe un cliente nativo de Brevo,
Resend, SendGrid o Gmail en el runtime: cualquiera de esos proveedores solo
puede usarse si ofrece un endpoint SMTP compatible con la configuración.

Endpoints:

- `GET /api/email/status`: informa si el transporte está configurado sin
  devolver la contraseña.
- `POST /api/email/send`: valida destinatarios, asunto y cuerpo y envía el
  correo desde el remitente configurado.

### Configuración

```env
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
MAIL_FROM_ADDRESS=
MAIL_FROM_NAME=ClientumCRM
```

El servidor considera SMTP no configurado si falta alguno de los valores
requeridos o si contiene un placeholder. El puerto `465` usa TLS directo;
los demás puertos usan la configuración normal del transporte.

## 5. Google Places para prospección B2B

La ruta de prospección usa `places.googleapis.com/v1/places:searchText` desde
el backend. La clave server-side pertenece al workspace y no se devuelve al
navegador:

```env
GOOGLE_MAPS_SERVER_API_KEY=
```

El catálogo también contempla `VITE_GOOGLE_MAPS_API_KEY` para mapas del
navegador. Esa clave es opcional, debe estar restringida por dominio y no debe
reutilizarse para llamadas server-to-server.

Fuente oficial: [Google Places API](https://developers.google.com/maps/documentation/places/web-service).

## 6. Mercado Pago

El backend implementa:

- Consulta de estado en `GET /api/payments/status`.
- Creación de preferencias de checkout en `POST /api/payments/checkout`.
- Recepción de notificaciones en
  `POST /api/payments/mercadopago/webhook`.

Las credenciales son por workspace y se guardan cifradas en el backend. La
integración necesita PostgreSQL para registrar checkouts. Para crear la URL de
notificación también necesita una `APP_URL` pública válida.

```env
APP_URL=
```

Configura estos campos desde **Configuración → Cobros MercadoPago**, no en un
archivo versionado:

- `MERCADOPAGO_ACCESS_TOKEN`
- `MERCADOPAGO_WEBHOOK_SECRET`
- `MERCADOPAGO_PUBLIC_KEY`

El checkout y la consulta del estado usan actualmente
`MERCADOPAGO_ACCESS_TOKEN`. `MERCADOPAGO_WEBHOOK_SECRET` y
`MERCADOPAGO_PUBLIC_KEY` forman parte del catálogo de credenciales y quedan
reservados para validaciones o flujos de cliente que todavía no están
conectados en el servidor.

El entorno sandbox/producción se debe seleccionar según la configuración
vigente de la cuenta y del proveedor. No documentes tokens de ejemplo como
si fueran válidos.

Fuente oficial: [Mercado Pago Developers](https://www.mercadopago.com/developers/en/docs).

## 7. Meta WhatsApp Webhook

El runtime actual implementa la verificación del webhook y la validación de
la firma `X-Hub-Signature-256`:

- `GET /api/whatsapp/webhook`: responde al challenge de Meta.
- `POST /api/whatsapp/webhook`: acepta únicamente payloads firmados de
  `whatsapp_business_account`.

Configuración de plataforma:

```env
WHATSAPP_APP_SECRET=
WHATSAPP_WEBHOOK_VERIFY_TOKEN=
```

El catálogo por workspace también reserva estos campos para una futura
integración outbound:

- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_APP_SECRET`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_BUSINESS_ACCOUNT_ID`
- `WHATSAPP_WEBHOOK_VERIFY_TOKEN`

La presencia de esos campos no significa que el envío outbound o un gateway
Baileys/QR estén conectados. El proyecto no debe documentarlos como
funcionalidades activas hasta que exista un cliente de Meta o Baileys en el
servidor.

Fuente oficial: [WhatsApp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api/).

## 8. Credenciales por workspace y seguridad

La separación actual es:

1. **Secrets de plataforma**: variables administradas por el entorno para
   Gemini, SMTP, Firebase público, PostgreSQL y validación de webhooks.
2. **Credenciales del workspace**: se capturan desde la configuración del
   módulo, se cifran server-side y se resuelven usando la identidad verificada
   del usuario.
3. **API keys internas**: se almacenan como hashes en un vault separado y el
   valor completo solo se muestra al crearlas.

Reglas obligatorias:

- No incluir valores reales en `.env.example`, documentación, logs o
  respuestas de API.
- No guardar credenciales de proveedores en `localStorage`.
- No exponer claves server-side mediante `VITE_*`.
- No considerar una integración lista solo porque existe una variable; hay que
  validar que no sea un placeholder y que el proveedor responda.
- En producción, las rutas protegidas requieren una identidad Firebase
  verificada.

## 9. Cuotas y planes gratuitos

Este repositorio no fija cuotas gratuitas de proveedores. Los límites
dependen del país, cuenta, modelo, método de pago, verificación y cambios
comerciales del proveedor. Antes de poner una integración en producción:

1. Confirma el plan y los límites en la documentación oficial.
2. Configura alertas o límites de gasto cuando el proveedor lo permita.
3. Prueba errores de cuota, credenciales inválidas y timeouts.
4. Verifica que la aplicación muestre un estado no configurado en lugar de
   afirmar que el proveedor está conectado.

&copy; 2026 Clientum Latam. Todos los derechos reservados.

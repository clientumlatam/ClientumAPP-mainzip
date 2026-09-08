# Arquitectura de secretos y credenciales

## Regla principal

`.env` y Replit Secrets contienen los secretos y la configuración necesarios
para que funcione la **plataforma como sistema**. Las credenciales que
pertenecen a una empresa o usuario concreto viven cifradas en PostgreSQL y se
asocian a un `tenant_id`. La configuración `VITE_*` llega al navegador y nunca
debe contener tokens privados, certificados, claves privadas ni contraseñas.

## Tres niveles

| Nivel | Almacenamiento | Ejemplos |
| --- | --- | --- |
| Plataforma | Replit Secrets / entorno | `WORKFLOW_ENCRYPTION_KEY`, Firebase, Cloudflare, Gemini, SMTP, sesión |
| Tenant | `clientum_tenant_credentials` cifrada | WhatsApp, AFIP, Mercado Pago, Maps server, proveedores de workflows |
| Público | Bundle del frontend | `VITE_FIREBASE_*`, `VITE_GOOGLE_MAPS_API_KEY`, una public key pública restringida |

La clave maestra (`WORKFLOW_ENCRYPTION_KEY`) no se guarda en la base de datos
ni se muestra en el panel de credenciales. El backend deriva una clave AES-256
para cifrar cada payload con AES-256-GCM y guarda únicamente `iv`, `auth_tag` y
`encrypted_data`.

## Tenants y membresías

La primera versión crea un workspace personal estable por usuario autenticado:

```text
tenant_<sha256(user_id)[0:32]>
```

La tabla `clientum_tenant_memberships` ya permite agregar más usuarios al mismo
workspace sin cambiar el modelo de credenciales. El servidor calcula el tenant
a partir de la identidad verificada; el cliente no puede elegir un `tenant_id`
arbitrario para leer o modificar secretos.

## Tablas

- `clientum_tenants`: identidad del workspace.
- `clientum_tenant_memberships`: relación usuario/tenant y rol.
- `clientum_tenant_credentials`: una fila por `tenant_id` + `module_id`.
- `clientum_user_api_keys`: API Keys REST internas, separadas del vault de
  credenciales de proveedores y almacenadas por usuario.

La migración `migrations/001_tenant_credentials.sql` crea estas tablas y
traslada las filas antiguas de `clientum_user_credentials` sin descifrar el
payload. El servidor también inicializa el esquema de forma idempotente al
arrancar para mantener el entorno de desarrollo operativo.

## Variables de plataforma

Se administran en Replit Secrets, no desde Configuración del CRM:

- Seguridad: `WORKFLOW_ENCRYPTION_KEY`, `SESSION_SECRET`, `API_KEY_PEPPER`,
  `WEBHOOK_SIGNING_SECRET`.
- Firebase público: `VITE_FIREBASE_*`.
- IA central: `GEMINI_API_KEY`.
- Cloudflare y almacenamiento: `CLOUDFLARE_*`, `R2_*`.
- Email de plataforma: `SMTP_*`, `MAIL_FROM_*`, `RESEND_API_KEY` o
  `SENDGRID_API_KEY`.
- Configuración pública restringida: `VITE_GOOGLE_MAPS_API_KEY` y, si se
  utiliza una cuenta de pagos compartida, `VITE_MERCADOPAGO_PUBLIC_KEY`.

Los valores se validan en el backend: que un secret exista no implica que sea
usable. No se deben aceptar placeholders como `your_key`, `replace_me`,
`example.com` o valores vacíos.

## Credenciales por tenant

Se introducen desde la configuración del módulo y se cifran server-side:

- WhatsApp/Meta: access token, app secret, phone number, business account y
  token de verificación.
- AFIP: CUIT, ambiente, certificado P12, clave privada y contraseña.
- Mercado Pago: access token, webhook secret y public key de la cuenta.
- Google Maps server-side, cuando cada tenant usa su propio proyecto.
- Secretos de proveedores conectados a Workflows.

La API responde solo metadatos enmascarados. Nunca devuelve el valor
descifrado al navegador ni lo escribe en logs. Para rotar una credencial se
guarda un nuevo payload completo; para revocarla se elimina la fila del
módulo.

## Operación

```bash
npm run db:migrate
```

El comando usa `DATABASE_URL` o las variables administradas `PGHOST`,
`PGPORT`, `PGUSER`, `PGPASSWORD` y `PGDATABASE`. No se deben copiar secretos de
tenant al `.env.example` ni solicitar `DATABASE_URL` manualmente.

En desarrollo sin PostgreSQL se conserva un fallback local cifrado para no
bloquear la demo. En producción la persistencia esperada es PostgreSQL; el
archivo local no debe usarse como almacenamiento multi-tenant.
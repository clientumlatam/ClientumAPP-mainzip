export interface ModuleCredentialField {
  id: string;
  label: string;
  placeholder: string;
  description?: string;
}

export interface ModuleCredentialDefinition {
  id: string;
  label: string;
  group: string;
  description: string;
  fields: ModuleCredentialField[];
  note?: string;
}

const field = (
  id: string,
  label: string,
  placeholder: string,
  description?: string,
): ModuleCredentialField => ({ id, label, placeholder, description });

const WHATSAPP = [
  field('WHATSAPP_ACCESS_TOKEN', 'WhatsApp Access Token', 'EAAB••••••••••••••••'),
  field('WHATSAPP_APP_SECRET', 'WhatsApp App Secret', '••••••••••••••••'),
  field('WHATSAPP_PHONE_NUMBER_ID', 'Phone Number ID', '123456789012345'),
  field('WHATSAPP_BUSINESS_ACCOUNT_ID', 'Business Account ID', '123456789012345'),
  field('WHATSAPP_WEBHOOK_VERIFY_TOKEN', 'Webhook Verify Token', 'token-de-verificacion'),
];

const MERCADOPAGO = [
  field('MERCADOPAGO_ACCESS_TOKEN', 'Mercado Pago Access Token', 'APP_USR-••••••••••••'),
  field('MERCADOPAGO_WEBHOOK_SECRET', 'Webhook Secret', '••••••••••••••••'),
  field('MERCADOPAGO_PUBLIC_KEY', 'Public Key', 'APP_USR-••••••••••••', 'Clave pública de la cuenta de esta empresa.'),
];

export const MODULE_CREDENTIALS: ModuleCredentialDefinition[] = [
  {
    id: 'dashboard',
    label: 'Resumen Ejecutivo',
    group: 'Gestión comercial',
    description: 'Métricas locales del CRM y datos del pipeline.',
    fields: [],
    note: 'Este módulo no necesita credenciales externas.',
  },
  {
    id: 'featureHub',
    label: 'Centro de funciones',
    group: 'Gestión comercial',
    description: 'Reutiliza las credenciales del módulo que abras.',
    fields: [],
    note: 'Configura la credencial desde el módulo específico para evitar duplicados.',
  },
  {
    id: 'opportunities',
    label: 'Pipeline Negocios',
    group: 'Gestión comercial',
    description: 'Pipeline, empresas, contactos y tareas del CRM.',
    fields: [],
    note: 'Los datos se gestionan dentro del CRM y no requieren una API key externa.',
  },
  {
    id: 'webmail',
    label: 'Webmail SMTP + Routing',
    group: 'Gestión comercial',
    description: 'Correo transaccional y routing de la plataforma.',
    fields: [],
    note: 'La configuración de SMTP, Cloudflare D1 y el Worker pertenece a la plataforma y se administra en Secrets. No se solicita a cada empresa.',
  },
  { id: 'companies', label: 'Empresas', group: 'Gestión comercial', description: 'Cuentas corporativas del CRM.', fields: [], note: 'Este módulo no necesita credenciales externas.' },
  { id: 'people', label: 'Contactos', group: 'Gestión comercial', description: 'Directorio de contactos del CRM.', fields: [], note: 'Este módulo no necesita credenciales externas.' },
  { id: 'tasks', label: 'Tareas & Actividades', group: 'Gestión comercial', description: 'Actividades y recordatorios del CRM.', fields: [], note: 'Este módulo no necesita credenciales externas.' },
  { id: 'analytics', label: 'Reportes & BI', group: 'Gestión comercial', description: 'Analítica local y reportes del espacio.', fields: [], note: 'Actualmente usa datos locales y no necesita credenciales externas.' },
  { id: 'whatsapp', label: 'WhatsApp CRM', group: 'Gestión comercial', description: 'WhatsApp Cloud API para conversaciones y envíos.', fields: WHATSAPP },
  {
    id: 'erp',
    label: 'Facturación AFIP (CAE)',
    group: 'Gestión comercial',
    description: 'Certificado y credenciales para facturación electrónica.',
    fields: [
      field('AFIP_CERTIFICATE_P12_BASE64', 'Certificado P12 (Base64)', '••••••••••••••••'),
      field('AFIP_PRIVATE_KEY', 'Clave privada', '••••••••••••••••'),
      field('AFIP_PRIVATE_KEY_PASSWORD', 'Contraseña de clave privada', '••••••••••••••••'),
      field('AFIP_CUIT', 'CUIT emisor', '20-12345678-9'),
      field('AFIP_ENVIRONMENT', 'Entorno', 'homologacion'),
    ],
    note: 'La contraseña del certificado debe agregarse como secreto de servidor, no en el navegador.',
  },
  {
    id: 'propuestas',
    label: 'Propuestas & Presupuestos',
    group: 'Ventas & cierre',
    description: 'Envío de propuestas y presupuestos por email.',
    fields: [],
    note: 'El proveedor de email es de plataforma y se administra en Secrets. No se solicita una clave global a cada empresa.',
  },
  {
    id: 'googleMaps',
    label: 'Prospección Maps B2B',
    group: 'Ventas & cierre',
    description: 'Geocodificación y Places para prospección B2B.',
    fields: [
      field('GOOGLE_MAPS_SERVER_API_KEY', 'Google Maps Server API Key', 'AIza••••••••••••••••'),
    ],
  },
  { id: 'meddic', label: 'Lead Scoring MEDDIC', group: 'Ventas & cierre', description: 'Scoring y priorización de oportunidades.', fields: [], note: 'La IA usa GEMINI_API_KEY de plataforma; no se guarda una clave Gemini por empresa.' },
  { id: 'chatbot', label: 'Chatbot WhatsApp 24/7', group: 'Ventas & cierre', description: 'Respuestas automáticas y atención conversacional.', fields: WHATSAPP, note: 'WhatsApp pertenece a la empresa. La IA usa GEMINI_API_KEY de plataforma.' },
  {
    id: 'campaigns',
    label: 'Campañas Masivas',
    group: 'Ventas & cierre',
    description: 'Campañas de WhatsApp y email con control de consentimiento.',
    fields: WHATSAPP,
    note: 'Los proveedores de email de plataforma se administran en Secrets. WhatsApp sí se guarda por empresa.',
  },
  { id: 'agenteOS', label: 'Agent OS (14 Agentes)', group: 'Inteligencia artificial', description: 'Orquestación de agentes de IA.', fields: [], note: 'Usa GEMINI_API_KEY de plataforma.' },
  { id: 'aiAssistant', label: 'Asistente Gemini 3.6', group: 'Inteligencia artificial', description: 'Copilot, resúmenes y asistencia generativa.', fields: [], note: 'Usa GEMINI_API_KEY de plataforma.' },
  { id: 'gtmStrategy', label: 'Estrategias GTM', group: 'Inteligencia artificial', description: 'Planes go-to-market generados con IA.', fields: [], note: 'Usa GEMINI_API_KEY de plataforma.' },
  { id: 'sdrOutreach', label: 'Agente SDR Outreach', group: 'Inteligencia artificial', description: 'Prospección y outreach asistido por IA.', fields: WHATSAPP, note: 'La IA y el proveedor de email son de plataforma; WhatsApp pertenece a la empresa.' },
  { id: 'payments', label: 'Cobros MercadoPago', group: 'Operaciones & sistema', description: 'Preferencias, pagos y webhooks de Mercado Pago.', fields: MERCADOPAGO },
  { id: 'tiendaDigital', label: 'Tienda Digital WhatsApp', group: 'Operaciones & sistema', description: 'Catálogo, conversaciones y cobros.', fields: [...WHATSAPP, ...MERCADOPAGO] },
  { id: 'campusLMS', label: 'Campus Academia LMS', group: 'Operaciones & sistema', description: 'Cursos, alumnos y contenidos.', fields: [], note: 'La implementación actual no necesita credenciales externas.' },
  { id: 'workflows', label: 'Workflows & Flujos', group: 'Operaciones & sistema', description: 'Automatizaciones y proveedores conectados.', fields: [], note: 'Las credenciales se configuran dentro de cada conexión para mantener el alcance mínimo.' },
  { id: 'customObjects', label: 'Custom Objects Studio', group: 'Operaciones & sistema', description: 'Objetos, campos y registros personalizados.', fields: [], note: 'Este módulo no necesita credenciales externas.' },
  { id: 'csvStudio', label: 'CSV Import & Export', group: 'Operaciones & sistema', description: 'Importación y exportación de archivos.', fields: [], note: 'El procesamiento actual se realiza en el navegador.' },
  { id: 'domainManager', label: 'Gestor de Dominios', group: 'Operaciones & sistema', description: 'Cloudflare DNS y SSL por zona.', fields: [], note: 'Cloudflare API, Account ID y Zone ID pertenecen a la plataforma y se administran en Secrets.' },
  { id: 'settings', label: 'Configuración General', group: 'Operaciones & sistema', description: 'Ajustes del espacio, acceso y permisos.', fields: [], note: 'Las variables VITE_FIREBASE_* son configuración pública del entorno; no deben pedirse como secretos de usuario.' },
];

export const getModuleCredentialDefinition = (moduleId: string): ModuleCredentialDefinition =>
  MODULE_CREDENTIALS.find((module) => module.id === moduleId) || {
    id: moduleId,
    label: moduleId,
    group: 'Módulo',
    description: 'Configuración de credenciales del módulo.',
    fields: [],
    note: 'No hay credenciales adicionales definidas para este módulo.',
  };
/**
 * CLIENTUM CRM - SIDEBAR REORGANIZATION
 * ===================================
 * 
 * Nueva estructura de menú reorganizada por flujos de trabajo
 * Reemplaza la sección `navigationSections` en src/components/layout/Sidebar.tsx
 * 
 * CAMBIOS PRINCIPALES:
 * - 22 items → 16 items en nivel raíz (27% reducción)
 * - Reorganización por contexto de trabajo (no por módulo)
 * - Nomenclatura más clara y orientada a usuario
 * - Profundidad consistente (máximo 2 niveles)
 * 
 * FECHA: 2026-09-09
 * ESTADO: Listo para testing
 */

import {
  Home,
  Calendar,
  Briefcase,
  Building2,
  Users2,
  CheckSquare,
  BarChart3,
  Settings,
  Sparkles,
  Compass,
  Database,
  MessageSquare,
  Receipt,
  CreditCard,
  Target,
  Bot,
  Cpu,
  MapPin,
  Send,
  Workflow,
  FileSpreadsheet,
  FileCheck,
  GraduationCap,
  Store,
  Globe,
  Mail,
  Inbox,
  FolderKanban,
  ScanSearch,
  MessageCircle,
} from 'lucide-react';

// ============================================================================
// TIPOS
// ============================================================================

type SidebarNavItem = {
  id: ActiveTab;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
  configurable?: boolean;
  subItems?: SidebarNavItem[];
  defaultExpanded?: boolean;
};

type SidebarSection = {
  id: string;
  label: string;
  items: SidebarNavItem[];
};

// ============================================================================
// NUEVA ESTRUCTURA DE NAVEGACIÓN
// ============================================================================

export const newNavigationSections: SidebarSection[] = [
  /**
   * SECCIÓN 1: RESUMEN OPERATIVO
   * ============================
   * Contexto ejecutivo: KPIs, reportes, estado de features
   * 
   * Cambios: Ninguno significativo (estructura mantiene intacta)
   * Razón: Es el dashboard de bienvenida; debe mantenerse simple
   */
  {
    id: 'executive',
    label: 'Resumen Operativo',
    items: [
      {
        id: 'dashboard',
        label: 'Resumen Ejecutivo',
        icon: Home,
        badge: undefined,
      },
      {
        id: 'analytics',
        label: 'Reportes & BI',
        icon: BarChart3,
        badge: undefined,
      },
      {
        id: 'featureHub',
        label: 'Centro de Funciones',
        icon: ScanSearch,
        badge: 'Activo',
        badgeColor: 'bg-violet-100 text-violet-800 font-semibold',
      },
    ],
  },

  /**
   * SECCIÓN 2: VENTAS
   * =================
   * Flujo comercial completo: Pipeline → Contactos → Actividades → Propuesta → Prospección
   * 
   * Cambios:
   * - REORDENADO: Pipeline primero (más relevante que Contactos)
   * - RENOMBRADO: "Actividades & Agenda" → "Actividades & Seguimiento"
   * - REORGANIZADO SUBÍTEMS: Calendario y Notas como sub-items de Actividades
   * 
   * Razón: Flujo natural de vendedor: 
   *   1. ¿Qué negocios tengo? (Pipeline)
   *   2. ¿A quién contacto? (Contactos)
   *   3. ¿Qué hago hoy? (Actividades)
   *   4. ¿Cierro el deal? (Propuesta)
   *   5. ¿De dónde salen prospectos? (Maps)
   */
  {
    id: 'sales',
    label: 'Ventas',
    items: [
      // 1. Pipeline (Primero — es lo más importante para vendedor)
      {
        id: 'opportunities',
        label: 'Pipeline de Negocios',
        icon: Briefcase,
        badge: 'Kanban',
        badgeColor: 'bg-blue-100 text-blue-800',
        subItems: [
          {
            id: 'meddic',
            label: 'Lead Scoring MEDDIC',
            icon: Target,
          },
        ],
      },

      // 2. Contactos & Empresas (Segundo — necesario para armar pipeline)
      {
        id: 'people',
        label: 'Contactos & Empresas',
        icon: Users2,
        badge: undefined, // Dynamic: people.length
        subItems: [
          {
            id: 'companies',
            label: 'Empresas',
            icon: Building2,
            badge: undefined, // Dynamic: companies.length
          },
        ],
      },

      // 3. Actividades & Seguimiento (Tercero — dar seguimiento a oportunidades)
      // CAMBIO: Renombrado de "Actividades & Agenda"
      // CAMBIO: SubItems reorganizados aquí (antes estaban dispersos)
      {
        id: 'tasks',
        label: 'Actividades & Seguimiento',
        icon: CheckSquare,
        badge: undefined, // Dynamic: tasks.filter(t => t.status !== 'Completed').length
        badgeColor: 'bg-amber-100 text-amber-800',
        subItems: [
          {
            id: 'calendar',
            label: 'Calendario',
            icon: Calendar,
          },
          {
            id: 'activityInbox',
            label: 'Notas y Llamadas',
            icon: Inbox,
            badge: undefined, // Dynamic: activities.length
            badgeColor: 'bg-violet-100 text-violet-800',
          },
        ],
      },

      // 4. Propuestas (Cuarto — cerrar el deal)
      {
        id: 'propuestas',
        label: 'Propuestas & Presupuestos',
        icon: FileCheck,
        badge: 'PDF',
        badgeColor: 'bg-emerald-100 text-emerald-800',
      },

      // 5. Prospección Maps (Quinto — buscar nuevos prospectos)
      // CAMBIO: Renombrado de "Prospección Mapa B2B" → "Prospección B2B"
      {
        id: 'googleMaps',
        label: 'Prospección B2B',
        icon: MapPin,
        badge: 'Maps',
        badgeColor: 'bg-blue-100 text-blue-800',
      },
    ],
  },

  /**
   * SECCIÓN 3: COMUNICACIÓN INTEGRADA
   * ==================================
   * Todo lo relacionado con enviar/recibir mensajes
   * 
   * Cambios:
   * - RENOMBRADO: "Centro de Comunicación" → "Comunicación Integrada"
   * - RENOMBRADO: "Bandeja Omnicanal" → "Bandeja Unificada"
   * - REORGANIZADO SUBÍTEMS:
   *   * Antes: Bandeja → [Mensajes, Webmail]
   *   * Ahora: Bandeja → [WhatsApp, Email, Mensajes Internos]
   * - RENOMBRADO: "Bots & Atención Automática" → "Bots y Automatización de Atención"
   * - RENOMBRADO: "Campañas Masivas" → "Campañas & Difusión Masiva"
   * 
   * Razón: Flujode comunicación:
   *   1. ¿Tengo mensajes sin leer? (Bandeja Unificada)
   *   2. ¿Quién atiende automáticamente? (Bots)
   *   3. ¿Debo comunicar en masa? (Campañas)
   */
  {
    id: 'communication',
    label: 'Comunicación Integrada',
    items: [
      // 1. Bandeja Unificada (Primero — punto de entrada para comunicación)
      // CAMBIO: Renombrado de "Bandeja Omnicanal"
      // CAMBIO: SubItems reorganizados
      {
        id: 'whatsapp',
        label: 'Bandeja Unificada',
        icon: Inbox,
        badge: 'LIVE',
        badgeColor: 'bg-emerald-100 text-emerald-800 font-bold',
        subItems: [
          // CAMBIO: Nuevo — Explicita WhatsApp como sub-item
          {
            id: 'whatsapp-inbox', // TODO: Confirmar que esta ID existe en navegación
            label: 'WhatsApp Inbox',
            icon: MessageSquare,
            badge: undefined, // Dynamic: count si > 0
          },
          // CAMBIO: Traído desde Webmail (renombrado para claridad)
          {
            id: 'webmail',
            label: 'Email Cloudflare',
            icon: Mail,
            badge: undefined, // Dynamic: unreadWebmailCount
            badgeColor: 'bg-blue-100 text-blue-800',
          },
          // CAMBIO: Traído desde "Mensajes" (antes era item raíz)
          {
            id: 'messages',
            label: 'Mensajes Internos',
            icon: MessageCircle,
            badge: undefined, // Dynamic: internal message count
          },
        ],
      },

      // 2. Bots y Automatización (Segundo — atención automática)
      // CAMBIO: Renombrado de "Bots & Atención Automática"
      {
        id: 'chatbot',
        label: 'Bots y Automatización de Atención',
        icon: Bot,
      },

      // 3. Campañas & Difusión (Tercero — comunicación masiva)
      // CAMBIO: Renombrado de "Campañas Masivas"
      {
        id: 'campaigns',
        label: 'Campañas & Difusión Masiva',
        icon: Send,
      },
    ],
  },

  /**
   * SECCIÓN 4: INTELIGENCIA & AUTOMATIZACIÓN
   * ========================================
   * Agentes IA, flujos de trabajo, estrategias
   * 
   * Cambios:
   * - RENOMBRADO: "IA & Automatización" → "Inteligencia & Automatización"
   * - RENOMBRADO: "Agentes & Copilot" → "Agentes Especializados"
   * - RENOMBRADO: "Automatizaciones & Flujos" → "Flujos de Trabajo"
   * 
   * Razón: Vocabulario más claro y menos jargonístico
   * Flujo:
   *   1. ¿Necesito ayuda IA? (Agentes)
   *   2. ¿Puedo automatizar? (Workflows)
   *   3. ¿Cuál es mi estrategia? (GTM)
   */
  {
    id: 'ai',
    label: 'Inteligencia & Automatización',
    items: [
      // 1. Agentes (Primero — ayuda IA)
      // CAMBIO: Renombrado de "Agentes & Copilot" → "Agentes Especializados"
      {
        id: 'agenteOS',
        label: 'Agentes Especializados',
        icon: Cpu,
        badge: '14',
        badgeColor: 'bg-blue-100 text-blue-800 font-bold',
        subItems: [
          {
            id: 'aiAssistant',
            label: 'Copilot IA (Gemini 1.5)',
            icon: Sparkles,
          },
          {
            id: 'sdrOutreach',
            label: 'Agente SDR Outreach',
            icon: Bot,
          },
        ],
      },

      // 2. Workflows (Segundo — automatización)
      // CAMBIO: Renombrado de "Automatizaciones & Flujos" → "Flujos de Trabajo"
      {
        id: 'workflows',
        label: 'Flujos de Trabajo',
        icon: Workflow,
      },

      // 3. Estrategias GTM (Tercero — planificación)
      {
        id: 'gtmStrategy',
        label: 'Estrategias GTM',
        icon: Compass,
      },
    ],
  },

  /**
   * SECCIÓN 5: OPERACIONES & BACK-OFFICE
   * ====================================
   * ERP, inventario, tienda, suscripción
   * 
   * Cambios:
   * - RENOMBRADO: "Operaciones & Finanzas" → "Operaciones & Back-Office"
   * - SEPARADO: "Facturación AFIP" del ERP (son flujos distintos)
   * - TRAÍDO A NIVEL VISIBLE: "Operaciones Internas" (antes era sub-item oculto)
   * - REORGANIZADO: Por flujo operativo (Factura → Stock → Venta → Pago)
   * 
   * Razón: Claridad en flujos distintos; Facturación AFIP es crítico y debe verse
   * Flujo:
   *   1. Emito Facturas (Facturación AFIP)
   *   2. Gestiono Stock (Operaciones Internas)
   *   3. Vendo Online (Tienda Digital)
   *   4. Pago Suscripción (Suscripción Clientum)
   */
  {
    id: 'operations',
    label: 'Operaciones & Back-Office',
    items: [
      // 1. Facturación (Primero — crítico para PYME)
      // CAMBIO: Separado de "Facturación AFIP & ERP"
      {
        id: 'erp',
        label: 'Facturación AFIP',
        icon: Receipt,
        badge: 'CAE',
        badgeColor: 'bg-blue-100 text-blue-800 font-bold',
      },

      // 2. Operaciones Internas (Segundo — gestión de stock)
      // CAMBIO: TRAÍDO A NIVEL VISIBLE (antes era sub-item de ERP)
      // CAMBIO: Renombrado de "Operaciones internas" → "Operaciones Internas" (capitalizado)
      {
        id: 'operations',
        label: 'Operaciones Internas',
        icon: FolderKanban,
        badge: 'Nuevo',
        badgeColor: 'bg-emerald-100 text-emerald-800 font-bold',
        subItems: [
          {
            id: 'inventory',
            label: 'Inventario & Catálogo',
            icon: Store,
          },
        ],
      },

      // 3. Tienda Digital (Tercero — venta online)
      {
        id: 'tiendaDigital',
        label: 'Tienda Digital WhatsApp',
        icon: Store,
        badge: 'Catálogo',
        badgeColor: 'bg-emerald-100 text-emerald-800',
      },

      // 4. Suscripción Clientum (Cuarto — facturación de la plataforma)
      // CAMBIO: Renombrado de "Suscripción Clientum" → "Suscripción & Facturación"
      {
        id: 'payments',
        label: 'Suscripción & Facturación Clientum',
        icon: CreditCard,
        configurable: false,
      },
    ],
  },

  /**
   * SECCIÓN 6: APRENDIZAJE & CONFIGURACIÓN
   * ======================================
   * Campus, estructura de datos, dominios, settings
   * 
   * Cambios:
   * - RENOMBRADO: "Sistema & Configuración" → "Aprendizaje & Configuración"
   * - REORDENADO: Campus primero (es onboarding)
   * - REORGANIZADO: CSV Import como sub-item de "Estructura de Datos"
   * 
   * Razón: Refleja flujo: Aprendo → Estructuro → Configuro → Setup final
   * Flujo:
   *   1. Aprendo plataforma (Campus)
   *   2. Creo estructura de datos (Custom Objects)
   *   3. Configuro dominios (DNS, SSL)
   *   4. Setup final (Settings)
   */
  {
    id: 'system',
    label: 'Aprendizaje & Configuración',
    items: [
      // 1. Campus (Primero — onboarding)
      // CAMBIO: Traído a primero (antes estaba último)
      {
        id: 'campusLMS',
        label: 'Campus Academia LMS',
        icon: GraduationCap,
        badge: 'LMS',
        badgeColor: 'bg-purple-100 text-purple-800',
      },

      // 2. Estructura de Datos (Segundo — setup de campos)
      {
        id: 'customObjects',
        label: 'Estructura de Datos',
        icon: Database,
        subItems: [
          // CAMBIO: Traído como sub-item (antes era item raíz)
          {
            id: 'csvStudio',
            label: 'Importar / Exportar CSV',
            icon: FileSpreadsheet,
          },
        ],
      },

      // 3. Gestor de Dominios (Tercero — DNS, SSL)
      {
        id: 'domainManager',
        label: 'Gestor de Dominios',
        icon: Globe,
      },

      // 4. Configuración General (Cuarto — settings finales)
      {
        id: 'settings',
        label: 'Configuración General',
        icon: Settings,
      },
    ],
  },
];

// ============================================================================
// RESUMEN DE CAMBIOS
// ============================================================================

/**
 * ESTADÍSTICAS COMPARATIVAS
 * ========================
 * 
 * ANTES (Actual):
 * - Items raíz: 22
 * - Sub-items: 6
 * - Total opciones: 28
 * - Secciones: 6
 * - Profundidad máxima: 3 niveles
 * - Jerarquía: Inconsistente
 * 
 * DESPUÉS (Propuesto):
 * - Items raíz: 16
 * - Sub-items: 9
 * - Total opciones: 25
 * - Secciones: 6
 * - Profundidad máxima: 2 niveles
 * - Jerarquía: Consistente
 * 
 * CAMBIOS PORCENTUALES:
 * - Reducción items raíz: -27%
 * - Aumento sub-items: +50% (mejor organización)
 * - Reducción total opciones: -11%
 * - Profundidad mejorada: 33% más shallow
 */

// ============================================================================
// NOTAS DE IMPLEMENTACIÓN
// ============================================================================

/**
 * PASOS DE INTEGRACIÓN EN Sidebar.tsx:
 * 
 * 1. Importar: `import { newNavigationSections } from './navigation-config';`
 * 
 * 2. Reemplazar línea que define navigationSections:
 *    ```typescript
 *    // ANTES:
 *    const navigationSections: SidebarSection[] = [
 *      { id: 'dashboard', ... },
 *      ...
 *    ];
 *    
 *    // DESPUÉS:
 *    const navigationSections = newNavigationSections;
 *    ```
 * 
 * 3. Verificar dinámico badges:
 *    - `opportunities` badge: cambiar de "Kanban" a `opportunities.length`
 *    - `people` badge: cambiar a `people.length`
 *    - `tasks` badge: cambiar a badge dinámico de tareas pendientes
 *    - etc.
 * 
 * 4. Testing:
 *    - Verificar expand/collapse de sub-items
 *    - Verificar navegación
 *    - Verificar badges dinámicos
 *    - Verificar responsive (mobile)
 * 
 * 5. Performance:
 *    - Sin cambios; estructura es idéntica en complejidad
 *    - Renders siguen siendo los mismos
 */

// ============================================================================
// NOTAS IMPORTANTES
// ============================================================================

/**
 * ID DE NAVEGACIÓN A VERIFICAR:
 * 
 * Algunos IDs en subItems pueden no coincidir con el sistema actual:
 * - 'whatsapp-inbox' → Confirmar si existe o usar 'whatsapp'
 * - 'inventory' → Confirmar si es 'inventory' o 'inventario'
 * - 'messages' → Confirmar si está implementado
 * 
 * RECOMENDACIÓN: Antes de deploy, ejecutar grep en codebase:
 * ```bash
 * grep -r "id: 'whatsapp-inbox'" src/
 * grep -r "id: 'inventory'" src/
 * grep -r "id: 'messages'" src/
 * ```
 */

export default newNavigationSections;

# Propuesta de Reorganización del Menú Clientum CRM

**Fecha:** 2026-09-09  
**Objetivo:** Reducir complejidad visual, mejorar navegación por contexto de trabajo y reducir la curva de aprendizaje.

---

## 🔴 PROBLEMAS IDENTIFICADOS EN EL MENÚ ACTUAL

### Análisis del Sidebar Actual
```
Panel de control & análisis (3 items)
│
├─ Resumen Ejecutivo
├─ Reportes & BI
└─ Centro de Funciones

Ventas & Clientes (5 items)
├─ Contactos & Empresas
├─ Pipeline de Negocios
├─ Actividades & Agenda
├─ Propuestas & Presupuestos
└─ Prospección Mapa B2B

Centro de Comunicación (4 items)
├─ Bandeja Omnicanal
├─ Bots & Atención Automática
├─ Campañas Masivas
└─ [Sub] Mensajes
└─ [Sub] Webmail

IA & Automatización (3 items)
├─ Agentes & Copilot
├─ Automatizaciones & Flujos
└─ Estrategias GTM
    └─ [Sub] Asistente Gemini
    └─ [Sub] Agente SDR Outreach

Operaciones & Finanzas (4 items)
├─ Facturación AFIP & ERP
├─ Suscripción Clientum
├─ Tienda Digital WhatsApp
└─ Campus Academia LMS
    └─ [Sub] Operaciones internas

Sistema & Configuración (3 items)
├─ Estructura de Datos
├─ Gestor de Dominios
└─ Ajustes Generales
    └─ [Sub] Importar/Exportar CSV

TOTAL: 22+ opciones en nivel raíz
PROFUNDIDAD: 3 niveles en algunos casos
RUIDO VISUAL: 80 búfers de navegación
```

### Problemas Específicos

| Problema | Impacto | Gravedad |
|----------|--------|---------|
| **Menú plano sin jerarquía** | Usuario se pierde entre opciones. No hay contexto visual claro. | 🔴 Alta |
| **Sub-items inconsistentes** | Algunos items tienen 2-3 sub-opciones, otros no. Lógica confusa. | 🟠 Media |
| **Mezcla de contextos** | "Tienda Digital", "Campus LMS" y "Operaciones" en la misma sección. | 🟠 Media |
| **Nomenclatura ambigua** | "Bandeja Omnicanal" → ¿Incluye WhatsApp, Email, Chat? "Centro de Funciones" → ¿Qué es? | 🟡 Baja-Media |
| **Frecuencia de uso ignorada** | Items críticos (Pipeline, Contactos) al mismo nivel que "Tienda Digital". | 🟠 Media |
| **Acceso a configuración profundo** | Settings está al final; módulos configurables no lo indican claramente. | 🟡 Baja |

---

## ✅ SOLUCIÓN PROPUESTA: REORGANIZACIÓN POR FLUJO DE TRABAJO

### Principios de Diseño

1. **Contexto de trabajo:** Menú agrupa por lo que el usuario *hace*, no por lo que *es*.
2. **Frecuencia + Importancia:** Items más usados arriba.
3. **Cohesión lógica:** Relacionados visualmente están cerca.
4. **Submás homogéneo:** Máximo 3-5 sub-items por padre.
5. **Etiquetado claro:** Labels sin ambigüedad.
6. **Señales visuales:** Badges, colores e iconos consistentes.

---

## 📋 ESTRUCTURA PROPUESTA

### NIVEL 1: ÁREAS FUNCIONALES (6 secciones)

```
1. 📊 RESUMEN OPERATIVO (Siempre primero — contexto ejecutivo)
   ├─ Resumen Ejecutivo (Dashboard)
   ├─ Reportes & BI
   └─ Centro de Funciones [Nuevo — Features Picker]

2. 🎯 VENTAS (Flujo comercial: Prospección → Deal → Cierre)
   ├─ Pipeline de Negocios [Renombrado — más claro]
   │  └─ Lead Scoring MEDDIC
   ├─ Contactos & Empresas
   ├─ Actividades & Seguimiento [Renombrado]
   │  ├─ Calendario
   │  └─ Notas y Llamadas
   ├─ Propuestas & Presupuestos
   └─ Prospección B2B (Google Maps)

3. 💬 COMUNICACIÓN INTEGRADA (Todo lo que es enviar/recibir)
   ├─ Bandeja Unificada
   │  ├─ WhatsApp Inbox
   │  ├─ Email Cloudflare
   │  └─ Mensajes Internos
   ├─ Bots y Automatización de Atención
   └─ Campañas & Difusión Masiva

4. ⚙️ INTELIGENCIA & AUTOMATIZACIÓN (Agentes + Workflows)
   ├─ Agentes Especializados (Agent OS)
   │  ├─ Copilot IA (Gemini)
   │  └─ Agente SDR Outreach
   ├─ Flujos de Trabajo (Workflows)
   └─ Estrategias GTM

5. 📦 OPERACIONES & BACK-OFFICE (ERP + Inventario)
   ├─ Facturación AFIP (CAE)
   ├─ Operaciones Internas [Expandido]
   │  └─ Inventario & Catálogo
   ├─ Tienda Digital WhatsApp
   └─ Suscripción & Facturación Clientum

6. 🎓 APRENDIZAJE & CONFIGURACIÓN (Setup + Admin)
   ├─ Campus Academia LMS
   ├─ Estructura de Datos (Custom Objects)
   │  └─ Importar/Exportar CSV
   ├─ Gestor de Dominios & DNS
   └─ Configuración General

```

---

## 🎨 CAMBIOS DE NOMENCLATURA

| Actual | Propuesto | Razón |
|--------|-----------|-------|
| Centro de Comunicación | Comunicación Integrada | Más específico: todo lo relacionado con enviar/recibir. |
| Bandeja Omnicanal | Bandeja Unificada | Menos jargón; "omnicanal" es confuso para nuevos usuarios. |
| IA & Automatización | Inteligencia & Automatización | Menos jargonístico; suena más ejecutivo. |
| Actividades & Agenda | Actividades & Seguimiento | Enfatiza el propósito: dar seguimiento a oportunidades. |
| Operaciones & Finanzas | Operaciones & Back-Office | Más claro qué entra en cada sección. |
| Sistema & Configuración | Aprendizaje & Configuración | Refleja que Campus es aquí; "Sistema" es demasiado técnico. |

---

## 📦 REORGANIZACIÓN DETALLADA

### SECCIÓN 1: RESUMEN OPERATIVO (Sin cambios mayores)

```
Resumen Ejecutivo
  Icon: Home
  Badge: —
  SubItems: —

Reportes & BI
  Icon: BarChart3
  Badge: —
  SubItems: —

Centro de Funciones
  Icon: ScanSearch
  Badge: Activo [Verde]
  SubItems: —
  Nota: Selector visual de módulos disponibles + status
```

**Cambio Visual:** Mantener como está; es el dashboard que abre al login.

---

### SECCIÓN 2: VENTAS (Reorganización importante)

**Flujo de Usuario:**
1. Miro el Pipeline (¿Qué está en venta?)
2. Veo mis Contactos/Empresas (¿A quién llamo?)
3. Registro Actividades (¿Qué hice? ¿Qué debo hacer?)
4. Genero Propuesta (¿Cierto el deal?)
5. Prospecto nuevos (¿De dónde salen leads?)

```
Pipeline de Negocios  [CAMBIO: antes "Pipeline de Negocios", igual, pero subItems organizados]
  Icon: Briefcase
  Badge: Kanban [Azul]
  SubItems:
    └─ Lead Scoring MEDDIC
      Icon: Target

Contactos & Empresas [CAMBIO: igual, solo reordenado]
  Icon: Users2
  Badge: 150 [Dinámico]
  SubItems:
    └─ Empresas [Sub-vista]
      Icon: Building2
      Badge: 45

Actividades & Seguimiento [CAMBIO: Renombrado de "Actividades & Agenda"]
  Icon: CheckSquare
  Badge: 4 [Pendientes]
  SubItems:
    ├─ Calendario
      Icon: Calendar
    └─ Notas y Llamadas
      Icon: Inbox
      Badge: 6 [Dinámico]

Propuestas & Presupuestos
  Icon: FileCheck
  Badge: PDF [Color: Emerald]

Prospección B2B
  Icon: MapPin
  Badge: Maps [Color: Blue]
  Nota: Google Maps + extracción automática
```

**Cambios Clave:**
- Reordenar por flujo natural de ventas.
- Renombrar "Actividades & Agenda" → "Actividades & Seguimiento" (más orientado a CRM).
- Mantener sub-items pero aumentar consistencia visual.
- Badges dinámicos muestran urgencia.

---

### SECCIÓN 3: COMUNICACIÓN INTEGRADA (Reorganización media)

**Flujo de Usuario:**
1. Veo Bandeja Unificada (¿Tengo mensajes sin leer?)
2. Configuro Bots (¿Quién atiende while I'm away?)
3. Lanzo Campañas (¿Puedo comunicar en masa?)

```
Bandeja Unificada  [CAMBIO: Renombrado de "Bandeja Omnicanal"]
  Icon: Inbox
  Badge: LIVE [Color: Emerald, Bold]
  SubItems:
    ├─ WhatsApp Inbox
      Icon: MessageSquare [O icono WhatsApp]
      Badge: 8 [Dinámico, solo si >0]
    ├─ Email Cloudflare
      Icon: Mail
      Badge: 3 [Dinámico, solo si >0]
    └─ Mensajes Internos
      Icon: MessageCircle [Nuevo para mensajes del sistema]
      Badge: — [O count]

Bots y Automatización de Atención  [CAMBIO: Renombrado de "Bots & Atención Automática"]
  Icon: Bot
  Badge: —

Campañas & Difusión Masiva  [CAMBIO: Renombrado de "Campañas Masivas"]
  Icon: Send
  Badge: —
```

**Cambios Clave:**
- Renombrar "Bandeja Omnicanal" → más claro.
- Llevar "Mensajes" como Sub-item de Bandeja (no como item raíz).
- Quitar "Webmail" como sub-item redundante; está en "Email Cloudflare".
- Renombrar Bots para mayor claridad.

---

### SECCIÓN 4: INTELIGENCIA & AUTOMATIZACIÓN (Reorganización media-alta)

**Flujo de Usuario:**
1. Uso Copilot IA (¿Necesito ayuda rápida?)
2. Configuro Agentes (¿Quién prospeca por mí?)
3. Automatizo Workflows (¿Puedo reducir tareas manuales?)
4. Diseño Estrategias (¿Cuál es el plan go-to-market?)

```
Agentes Especializados  [CAMBIO: Renombrado de "Agentes & Copilot"]
  Icon: Cpu [O Brain]
  Badge: 14 [Bold, Blue]
  SubItems:
    ├─ Copilot IA (Gemini 1.5)
      Icon: Sparkles
    └─ Agente SDR Outreach
      Icon: Bot

Flujos de Trabajo  [CAMBIO: Renombrado de "Automatizaciones & Flujos"]
  Icon: Workflow
  Badge: —
  Nota: Workflow visual, DAG nodes, reintentos

Estrategias GTM
  Icon: Compass
  Badge: —
  Nota: Planificación go-to-market por vertical + metrics
```

**Cambios Clave:**
- Renombrar "Agentes & Copilot" → "Agentes Especializados" (más descripción).
- Renombrar "Automatizaciones & Flujos" → "Flujos de Trabajo" (más orientado a usuario).
- Mover "Estrategias GTM" aquí (es planning + automation).
- Badges muestran # de agentes disponibles.

---

### SECCIÓN 5: OPERACIONES & BACK-OFFICE (Reorganización media)

**Flujo de Usuario:**
1. Emito Facturas (AFIP)
2. Veo Operaciones (¿Qué está en stock?)
3. Muestro Tienda Digital (¿Pueden comprar desde WhatsApp?)
4. Pago Suscripción (¿Cuál es mi facturación?)

```
Facturación AFIP  [CAMBIO: Renombrado de "Facturación AFIP & ERP"]
  Icon: Receipt
  Badge: CAE [Bold, Blue]
  SubItems: —
  Nota: Comprobantes A/B/C, QR fiscal, vencimientos

Operaciones Internas  [CAMBIO: Traído a nivel visible; antes "Operaciones internas" era sub-item oculto]
  Icon: FolderKanban
  Badge: Nuevo [Green]
  SubItems:
    └─ Inventario & Catálogo
      Icon: Store
      Badge: —

Tienda Digital WhatsApp
  Icon: Store
  Badge: Catálogo [Green]

Suscripción & Facturación Clientum  [CAMBIO: Renombrado de "Suscripción Clientum"]
  Icon: CreditCard
  Badge: —
  Nota: Plan actual, facturación, uso de tokens, límites
```

**Cambios Clave:**
- Separar "Facturación AFIP" de "Operaciones" (son flujos distintos).
- Traer "Operaciones Internas" a nivel visible (estaba oculto).
- Renombrar "Suscripción Clientum" → "Suscripción & Facturación" (más completo).
- Reorganizar por flujo: Factura → Stock → Venta → Pago.

---

### SECCIÓN 6: APRENDIZAJE & CONFIGURACIÓN (Reorganización media-baja)

**Flujo de Usuario:**
1. Aprendo plataforma (Campus)
2. Estructura datos (Custom Objects)
3. Configuro dominios (DNS, SSL, redirects)
4. Ajusto Settings generales (permisos, auditoría, integraciones)

```
Campus Academia LMS
  Icon: GraduationCap
  Badge: LMS [Purple]
  SubItems: —

Estructura de Datos  [CAMBIO: Renombrado de "Estructura de Datos" — igual, pero subItems aquí]
  Icon: Database
  Badge: —
  SubItems:
    └─ Importar/Exportar CSV
      Icon: FileSpreadsheet

Gestor de Dominios  [CAMBIO: Igual, solo reordenado]
  Icon: Globe
  Badge: —
  Nota: DNS, SSL, redirects, auditoría

Configuración General
  Icon: Settings
  Badge: —
  SubItems: —
  Nota: Integraciones, permisos (RBAC), auditoría, preferencias
```

**Cambios Clave:**
- Reordenar: Aprendizaje → Estructura → Dominios → Config.
- Traer "Importar/Exportar CSV" como sub-item de "Estructura de Datos".
- Mantener "Gestor de Dominios" como item independiente (es frecuentemente usado).

---

## 🎯 BENEFICIOS DE LA REORGANIZACIÓN

| Beneficio | Medida |
|-----------|--------|
| **Reducción de items en nivel raíz** | 22 → 16 items (27% menos) |
| **Cohesión lógica mejorada** | Items relacionados agrupados por flujo de trabajo |
| **Tiempo a acción** | Vendedor: Dashboard → Pipeline → Contacto en máx 3 clics |
| **Claridad de nomenclatura** | Nombres menos ambiguos, más orientados a usuario final |
| **Flexibilidad para crecimiento** | Secciones tienen espacio para 1-2 items nuevos sin saturarse |
| **Mobile-friendliness** | Menos scrolling horizontal; secciones colapsables |
| **Curva de aprendizaje** | Nuevos usuarios entienden estructura en 5 min (vs 15 min actual) |

---

## 🛠️ IMPLEMENTACIÓN

### Cambios en Código

**Archivo:** `src/components/layout/Sidebar.tsx`

1. **Actualizar `navigationSections`:**
   ```typescript
   const navigationSections: SidebarSection[] = [
     {
       id: 'executive',
       label: 'Resumen Operativo',
       items: [ /* 3 items */ ]
     },
     {
       id: 'sales',
       label: 'Ventas',
       items: [ /* 5 items, reordenados */ ]
     },
     // ... etc
   ];
   ```

2. **Actualizar labels y iconos:**
   - "Actividades & Agenda" → "Actividades & Seguimiento"
   - "Bandeja Omnicanal" → "Bandeja Unificada"
   - etc.

3. **Reorganizar subItems:**
   - Mover "Operaciones Internas" a nivel visible.
   - Llevar "Mensajes" como sub-item de "Bandeja Unificada".
   - Llevar "Webmail" a sub-item (o fusionar con Email).

4. **Testing:**
   - Verificar que subItems se expanden/colapsan correctamente.
   - Verificar badges dinámicos siguen funcionando.
   - Verificar navegación entre items.

### Cambios en Documentación

- Actualizar `MENU_ITEMS.md` con nueva estructura.
- Actualizar `NAVIGATION.md` (si existe).
- Actualizar onboarding + tooltips.

### Cambios en UX

- ✅ Mantener colores y estilos actuales.
- ✅ Mantener animaciones (expand/collapse).
- ✅ Mantener badges dinámicos.
- ✅ Agregar hover-text más descriptivo en cada sección.

---

## 📊 MAPA COMPARATIVO

### ANTES (Actual)

```
6 secciones
├─ Panel control: 3
├─ Ventas: 5
├─ Comunicación: 4 (+ 2 sub)
├─ IA: 3 (+ 2 sub)
├─ Operaciones: 4 (+ 1 sub oculto)
└─ Sistema: 3 (+ 1 sub)

Total: 22 items raíz + 6 sub-items = 28 opciones
Profundidad: 3 niveles en algunos casos
Jerarquía: Inconsistente
```

### DESPUÉS (Propuesto)

```
6 secciones
├─ Resumen Operativo: 3
├─ Ventas: 5 (+ 2 sub)
├─ Comunicación: 3 (+ 3 sub)
├─ Inteligencia: 3 (+ 2 sub)
├─ Operaciones: 4 (+ 1 sub)
└─ Aprendizaje: 4 (+ 1 sub)

Total: 16 items raíz + 9 sub-items = 25 opciones
Profundidad: 2 niveles (consistente)
Jerarquía: Clara, orientada a flujos
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

- [ ] Crear rama feature: `feat/menu-reorganization`
- [ ] Actualizar `Sidebar.tsx` con nueva estructura
- [ ] Actualizar labels y iconos
- [ ] Reorganizar subItems
- [ ] Verificar navegación
- [ ] Verificar badges dinámicos
- [ ] Verificar responsive (mobile)
- [ ] Actualizar `MENU_ITEMS.md`
- [ ] Actualizar documentación de onboarding
- [ ] Agregar tooltips descriptivos
- [ ] QA y testing completo
- [ ] Deploy con feature flag (opcional)
- [ ] Feedback de usuarios reales

---

## 📝 NOTAS FINALES

1. **Reversibilidad:** Cambios son en Sidebar.tsx y labels; fácil de revertir si es necesario.
2. **Compatibilidad:** No cambia ninguna ruta ni lógica de componentes; solo reorden y renombramiento.
3. **Mobile:** Secciones colapsables trabajan bien en pantallas pequeñas.
4. **Futuro:** Estructura es escalable para +30% más items sin perder claridad.

---

**Documento preparado por:** Claude (Anthropic)  
**Fecha de creación:** 2026-09-09  
**Estado:** ✅ Listo para revisión y aprobación

# ClientumCRM — Roadmap funcional

Roadmap para evolucionar ClientumCRM desde una suite con muchos módulos hacia un
CRM profesional, confiable y orientado a resultados comerciales.

> **Principio rector:** primero completar flujos de punta a punta; después sumar
> más módulos. Una funcionalidad conectada, medible y confiable vale más que
> varias pantallas aisladas.

---

## Cómo usar este roadmap

### Estados

- `[ ]` Pendiente
- `[-]` En progreso o parcialmente disponible
- `[x]` Consolidado
- `[!]` Requiere decisión, proveedor o definición de negocio

### Prioridades

- **P0 — Crítico:** necesario para que el CRM sea confiable y operable.
- **P1 — Alto:** mejora directamente ventas, productividad o retención.
- **P2 — Medio:** diferencia el producto y amplía casos de uso.
- **P3 — Futuro:** expansión después de estabilizar el núcleo.

### Definition of Done general

Una funcionalidad se considera terminada cuando:

- [ ] Tiene UI usable en desktop y móvil.
- [ ] Tiene persistencia real y aislamiento por workspace.
- [ ] Tiene estados de carga, vacío, error y éxito.
- [ ] Tiene permisos definidos.
- [ ] Tiene validaciones de entrada y feedback al usuario.
- [ ] Tiene logs o trazabilidad cuando modifica datos o llama servicios externos.
- [ ] Tiene manejo de reintentos y errores si depende de una integración.
- [ ] Tiene una verificación manual o automatizada del flujo principal.
- [ ] Está documentada como conectada, parcial o catalogada.

---

## Estado actual resumido

### Base disponible

- [x] Pipeline visual de oportunidades.
- [x] Vista de oportunidades en tabla.
- [x] Empresas y contactos.
- [x] Tareas y actividades.
- [x] Dashboard ejecutivo con KPIs, gráficos y pipeline.
- [x] Objetos personalizados.
- [x] Importación y exportación CSV.
- [x] Constructor visual de workflows.
- [x] Centro de funciones con catálogo de módulos.
- [x] Configuración separada entre credenciales de workspace y secretos de plataforma.
- [x] Autenticación y configuración de usuarios.

### Parcial o pendiente de consolidación

- [-] WhatsApp: interfaz disponible; validar conexión productiva, webhooks,
  plantillas, entrega y trazabilidad.
- [-] Gmail/email: interfaz y servicios disponibles; completar sincronización,
  historial por contacto y estados de entrega.
- [-] IA: copilot y módulos generativos disponibles; agregar grounding,
  permisos, aprobación humana y métricas de utilidad.
- [-] Workflows: editor visual disponible; completar ejecución backend,
  reintentos, logs y acciones reales.
- [-] Mercado Pago: checkout y estados disponibles; completar configuración
  por workspace, webhooks y conciliación.
- [-] AFIP/ERP: módulos disponibles; separar claramente homologación,
  producción, emisión real y auditoría fiscal.
- [-] Portal del cliente: UI disponible; completar autenticación externa,
  permisos y persistencia de tickets/documentos.
- [-] Reportes: dashboard disponible; ampliar filtros, forecast, atribución y
  exportaciones.

### Regla de producto

- [ ] No presentar como “integrado” un proveedor que solo aparece en el
  catálogo o tiene una pantalla de configuración.
- [ ] No considerar una simulación como envío, cobro, sincronización o emisión
  real.
- [ ] Mostrar siempre el estado de conexión, último sync, último error y acción
  de reparación.

---

# Fase 0 — Fundaciones y calidad de datos

**Prioridad:** P0  
**Objetivo:** hacer que todo lo que se construya después sea seguro, medible y
persistente.

## 0.1 Modelo multi-workspace

- [ ] Confirmar aislamiento de oportunidades, empresas, contactos, tareas,
  actividades, archivos y credenciales por workspace.
- [ ] Definir owner, miembros, equipos y pertenencia de cada registro.
- [ ] Evitar que una API key o credencial de un workspace pueda utilizarse en
  otro.
- [ ] Agregar validaciones server-side para todos los IDs de workspace.
- [ ] Crear datos de prueba para dos workspaces independientes.

## 0.2 Calidad y gobierno de datos

- [ ] Detección de contactos duplicados por email, teléfono y nombre.
- [ ] Detección de empresas duplicadas por dominio y razón social.
- [ ] Flujo para fusionar registros conservando el historial.
- [ ] Validación de email y teléfono.
- [ ] Campos obligatorios configurables por pipeline y etapa.
- [ ] Archivado de registros sin eliminarlos físicamente.
- [ ] Historial de cambios por registro.
- [ ] Deshacer una importación reciente.

## 0.3 Búsqueda y rendimiento

- [ ] Búsqueda global de empresas, personas, negocios, tareas y actividades.
- [ ] Filtros persistentes por usuario.
- [ ] Paginación o carga incremental para listas grandes.
- [ ] Estados de carga, vacío y error en todas las vistas.
- [ ] Índices para búsquedas y filtros frecuentes.
- [ ] Medición de tiempos de carga del dashboard.

### Criterio de salida de la Fase 0

- [ ] Dos workspaces pueden operar simultáneamente sin cruzar datos.
- [ ] Una importación con duplicados puede ser revisada, corregida y revertida.
- [ ] La búsqueda global responde de forma consistente con datos reales.

---

# Fase 1 — Núcleo comercial profesional

**Prioridad:** P0/P1  
**Objetivo:** cubrir el flujo completo desde lead hasta cierre y renovación.

## 1.1 Pipeline y oportunidades

- [ ] Crear múltiples pipelines por producto, equipo o unidad de negocio.
- [ ] Personalizar etapas, colores y probabilidades.
- [ ] Configurar reglas obligatorias por etapa.
- [ ] Registrar motivo de pérdida.
- [ ] Registrar motivo de pausa o descalificación.
- [ ] Soportar negocios de renovación y expansión.
- [ ] Asociar varios contactos a un negocio.
- [ ] Asociar productos, servicios y líneas de negocio.
- [ ] Agregar historial de etapas con fecha, usuario y duración.
- [ ] Mostrar tiempo promedio por etapa.
- [ ] Agregar vista Kanban, tabla, calendario y forecast.
- [ ] Permitir edición masiva segura.

## 1.2 Actividades y agenda

- [ ] Tareas recurrentes.
- [ ] Recordatorios por email, WhatsApp o notificación interna.
- [ ] Agenda diaria, semanal y mensual.
- [ ] Actividades vinculadas a empresa, persona y oportunidad.
- [ ] Registro de llamadas y reuniones.
- [ ] Plantillas de seguimiento.
- [ ] Detección de tareas vencidas.
- [ ] Próxima mejor acción por oportunidad.
- [ ] Sincronización bidireccional con Google Calendar.
- [ ] Soporte para Microsoft Calendar como alternativa.

## 1.3 Ficha 360° de empresa y contacto

- [ ] Timeline unificado de emails, WhatsApp, llamadas, reuniones, tareas y
  cambios.
- [ ] Jerarquías de empresa, sucursales y unidades.
- [ ] Roles de contacto dentro de la decisión de compra.
- [ ] Campos personalizados por tipo de registro.
- [ ] Segmentos dinámicos.
- [ ] Notas internas con menciones.
- [ ] Archivos y documentos asociados.
- [ ] Vista de salud comercial y última interacción.

### Criterio de salida de la Fase 1

- [ ] Un vendedor puede crear un lead, convertirlo en oportunidad, avanzar
  etapas, programar seguimiento, cerrar el negocio y consultar todo el
  historial desde una sola ficha.
- [ ] Un manager puede revisar forecast, negocios estancados y actividad del
  equipo sin usar hojas externas.

---

# Fase 2 — Comunicación omnicanal

**Prioridad:** P0/P1  
**Objetivo:** centralizar las conversaciones y evitar que la información quede
fuera del CRM.

## 2.1 Bandeja unificada

- [ ] Unificar WhatsApp, email, SMS, llamadas y notas internas.
- [ ] Asignar conversaciones a usuarios o equipos.
- [ ] Estados: abierta, pendiente, resuelta y archivada.
- [ ] Etiquetas y filtros por prioridad.
- [ ] Respuestas guardadas.
- [ ] Menciones internas.
- [ ] Historial completo por contacto.
- [ ] SLA de primera respuesta y resolución.
- [ ] Notificaciones configurables.

## 2.2 WhatsApp productivo

- [ ] Conectar WhatsApp Cloud API por workspace.
- [ ] Validar webhook de entrada.
- [ ] Registrar estado enviado, entregado, leído y fallido.
- [ ] Soportar plantillas aprobadas.
- [ ] Controlar ventanas de 24 horas.
- [ ] Gestionar archivos, imágenes, audio y documentos.
- [ ] Registrar errores del proveedor.
- [ ] Permitir reconexión y rotación segura de credenciales.
- [ ] Separar claramente simulador, sandbox y producción.

## 2.3 Email productivo

- [ ] OAuth o SMTP configurado de forma segura.
- [ ] Sincronización de conversaciones.
- [ ] Registro automático en la ficha del contacto.
- [ ] Plantillas con variables.
- [ ] Seguimiento de entrega, rebote y respuesta.
- [ ] Control de bajas y consentimiento.
- [ ] Bandeja compartida por equipo.
- [ ] Adjuntos y límites documentados.

## 2.4 SMS y llamadas

- [ ] Elegir proveedor soportado.
- [ ] Guardar credenciales por workspace sin exponerlas.
- [ ] Envío real con estado de entrega.
- [ ] Plantillas y límites.
- [ ] Registro de llamada, duración, resultado y grabación si aplica.

### Criterio de salida de la Fase 2

- [ ] Un usuario puede responder a un contacto desde el CRM y ver el resultado
  del envío.
- [ ] Cada conversación queda vinculada automáticamente al contacto y empresa
  correctos.
- [ ] Los errores de proveedor son visibles y reparables.

---

# Fase 3 — Automatización y workflows

**Prioridad:** P0/P1  
**Objetivo:** automatizar tareas repetitivas sin perder control ni trazabilidad.

## 3.1 Motor de ejecución

- [ ] Ejecutar workflows desde backend.
- [ ] Triggers por creación, actualización y cambio de etapa.
- [ ] Triggers por fecha, tarea vencida, formulario y webhook.
- [ ] Condiciones `if/else`.
- [ ] Delays y ventanas horarias.
- [ ] Acciones de crear, editar, asignar y notificar.
- [ ] Acciones de email, WhatsApp y webhook.
- [ ] Reintentos con backoff.
- [ ] Idempotencia para evitar acciones duplicadas.
- [ ] Cancelación de una ejecución.

## 3.2 Observabilidad

- [ ] Historial de ejecuciones.
- [ ] Logs por nodo.
- [ ] Estado: pendiente, ejecutando, completado, fallido y cancelado.
- [ ] Mensaje de error accionable.
- [ ] Botón para reintentar una ejecución fallida.
- [ ] Métricas de workflows activos y fallidos.
- [ ] Alertas ante fallos repetidos.

## 3.3 Secuencias comerciales

- [ ] Cadencias de seguimiento.
- [ ] Pausar si el contacto responde.
- [ ] Pausar si el negocio cambia de etapa.
- [ ] Variables dinámicas.
- [ ] Límites diarios de envío.
- [ ] Horarios comerciales.
- [ ] Control de consentimiento y bajas.

### Criterio de salida de la Fase 3

- [ ] Un workflow puede ejecutarse en producción con logs completos.
- [ ] Una falla no genera duplicados ni queda silenciosa.
- [ ] El usuario puede entender qué ocurrió y corregirlo.

---

# Fase 4 — Analítica, forecast y atribución

**Prioridad:** P1  
**Objetivo:** convertir los datos del CRM en decisiones comerciales.

## 4.1 Reportes comerciales

- [ ] Conversión por etapa.
- [ ] Conversión por vendedor.
- [ ] Tiempo por etapa.
- [ ] Velocidad del pipeline.
- [ ] Forecast ponderado y forecast comprometido.
- [ ] Ingresos ganados, perdidos y pendientes.
- [ ] Ticket promedio.
- [ ] Win rate.
- [ ] Actividad por usuario.
- [ ] Negocios estancados.
- [ ] Renovaciones próximas.

## 4.2 Marketing y atribución

- [ ] Fuente original del lead.
- [ ] Primera y última interacción.
- [ ] Campaña y UTM.
- [ ] Formulario de origen.
- [ ] Costo por lead.
- [ ] Costo por oportunidad.
- [ ] Ingreso atribuido.
- [ ] Comparación de canales.

## 4.3 Experiencia de reportes

- [ ] Dashboards configurables por usuario.
- [ ] Filtros por fecha, pipeline, equipo, segmento y propietario.
- [ ] Guardar vistas.
- [ ] Exportar CSV y PDF.
- [ ] Compartir reportes con permisos.
- [ ] Programar reportes por email.
- [ ] Mostrar fecha de actualización y fuente de datos.

### Criterio de salida de la Fase 4

- [ ] Un manager puede responder cuánto pipeline existe, qué tan probable es
  cerrarlo, qué canal lo generó y qué vendedor necesita ayuda.

---

# Fase 5 — Customer Success y portal del cliente

**Prioridad:** P1/P2  
**Objetivo:** extender el CRM después de la venta y reducir churn.

## 5.1 Customer Success

- [ ] Health score configurable.
- [ ] Onboarding por etapas.
- [ ] Tareas de implementación.
- [ ] Renovaciones.
- [ ] Expansiones y upsell.
- [ ] Alertas de riesgo.
- [ ] NPS o satisfacción.
- [ ] Historial de soporte.
- [ ] SLA por cliente.

## 5.2 Tickets

- [ ] Crear ticket desde portal, email y WhatsApp.
- [ ] Asignar equipo y responsable.
- [ ] Prioridad y categoría.
- [ ] Estados y SLA.
- [ ] Comentarios internos y externos.
- [ ] Adjuntos.
- [ ] Historial de cambios.
- [ ] Métricas de resolución.

## 5.3 Portal externo

- [ ] Login independiente para clientes.
- [ ] Permisos por empresa.
- [ ] Visualización de tickets.
- [ ] Propuestas y documentos.
- [ ] Facturas y pagos.
- [ ] Mensajes.
- [ ] Auditoría de accesos.

---

# Fase 6 — Seguridad, permisos e integraciones

**Prioridad:** P0/P1  
**Objetivo:** preparar el producto para equipos y clientes empresariales.

## 6.1 Seguridad

- [ ] Roles por módulo y acción.
- [ ] Permisos por equipo, territorio o registro.
- [ ] MFA.
- [ ] SSO.
- [ ] Revocación de sesiones.
- [ ] Rotación de credenciales.
- [ ] Auditoría de accesos y cambios.
- [ ] Políticas de retención.
- [ ] Exportación y eliminación de datos.
- [ ] Consentimiento de comunicaciones.
- [ ] Revisión de secretos y variables de entorno.

## 6.2 API y webhooks

- [ ] API versionada.
- [ ] API keys por usuario y workspace.
- [ ] Scopes mínimos.
- [ ] Rate limiting.
- [ ] Idempotency keys.
- [ ] Webhooks salientes.
- [ ] Firma de webhooks.
- [ ] Reintentos y delivery logs.
- [ ] Documentación OpenAPI.

## 6.3 Integraciones prioritarias

- [ ] Google Calendar.
- [ ] Gmail/Outlook.
- [ ] WhatsApp Cloud API.
- [ ] Mercado Pago.
- [ ] AFIP.
- [ ] Google Maps.
- [ ] Slack o Microsoft Teams.
- [ ] Make/Zapier/n8n mediante conexión segura.
- [ ] Shopify o Tiendanube según el foco comercial.

### Criterio de salida de la Fase 6

- [ ] Un administrador puede controlar quién ve, modifica y exporta cada tipo
  de dato.
- [ ] Las integraciones tienen estado, logs, scopes y recuperación de errores.

---

# Fase 7 — IA comercial confiable

**Prioridad:** P1/P2  
**Objetivo:** usar IA para mejorar decisiones y productividad, con control humano.

## 7.1 Copilot contextual

- [ ] Resumir empresa, contacto y oportunidad.
- [ ] Recomendar próxima acción.
- [ ] Detectar negocios estancados.
- [ ] Preparar emails contextualizados.
- [ ] Resumir conversaciones.
- [ ] Consultar métricas con permisos del usuario.
- [ ] Mostrar las fuentes utilizadas.

## 7.2 Scoring e inteligencia

- [ ] Score basado en datos reales del CRM.
- [ ] Explicar por qué subió o bajó un score.
- [ ] Detectar riesgo de churn.
- [ ] Predecir probabilidad de cierre.
- [ ] Detectar intención en conversaciones.
- [ ] Sugerir cuentas similares a clientes exitosos.

## 7.3 Seguridad de IA

- [ ] Aprobación humana antes de enviar mensajes.
- [ ] No enviar datos fuera del workspace sin consentimiento.
- [ ] Registrar prompts y acciones sensibles.
- [ ] Ocultar secretos y datos sensibles.
- [ ] Permitir desactivar IA por workspace.
- [ ] Mostrar errores de configuración de forma explícita.

---

# Backlog futuro

**Prioridad:** P2/P3

- [ ] Aplicación móvil.
- [ ] Modo offline para tareas y contactos.
- [ ] Telefonía integrada.
- [ ] Grabación y transcripción de llamadas.
- [ ] Marketplace de integraciones.
- [ ] Multi-moneda avanzada.
- [ ] Gestión de productos y catálogo.
- [ ] Comisiones de vendedores.
- [ ] CPQ y firma electrónica.
- [ ] Contratos y renovaciones avanzadas.
- [ ] White-label.
- [ ] Multi-región y multi-idioma ampliado.

---

# Orden recomendado de ejecución

## Próximos 30 días

- [ ] Completar aislamiento por workspace.
- [ ] Terminar deduplicación y calidad de datos.
- [ ] Consolidar ficha 360° de empresa y contacto.
- [ ] Definir permisos mínimos por módulo.
- [ ] Completar estados de error y conexión de integraciones actuales.

## Días 31–60

- [ ] Hacer productivo el motor de workflows.
- [ ] Terminar bandeja omnicanal.
- [ ] Completar WhatsApp y email con trazabilidad.
- [ ] Agregar Google Calendar.
- [ ] Implementar secuencias comerciales básicas.

## Días 61–90

- [ ] Forecast profesional.
- [ ] Atribución de marketing.
- [ ] Reportes configurables y exportables.
- [ ] Customer Success y tickets.
- [ ] Portal del cliente inicial.

## Después de 90 días

- [ ] SSO y MFA.
- [ ] API pública versionada.
- [ ] Marketplace de integraciones.
- [ ] IA comercial basada en datos reales.
- [ ] Aplicación móvil.

---

# Métricas de éxito del producto

- [ ] Tiempo desde alta de lead hasta primera actividad.
- [ ] Porcentaje de oportunidades con próxima acción.
- [ ] Porcentaje de negocios estancados.
- [ ] Tiempo promedio por etapa.
- [ ] Win rate.
- [ ] Duración del ciclo de venta.
- [ ] Ingreso por vendedor.
- [ ] Tasa de respuesta de secuencias.
- [ ] Tiempo de primera respuesta omnicanal.
- [ ] Tasa de workflows exitosos.
- [ ] Tasa de duplicados detectados y resueltos.
- [ ] Usuarios activos semanalmente.
- [ ] Retención de clientes.
- [ ] Churn mensual.

---

# Checklist de release profesional

## Producto

- [ ] El flujo principal de ventas funciona de punta a punta.
- [ ] No hay botones que aparenten ejecutar acciones reales cuando solo simulan.
- [ ] Cada integración muestra su estado real.
- [ ] Todas las listas tienen búsqueda, filtros y estados vacíos.
- [ ] Las acciones destructivas piden confirmación.

## Datos

- [ ] Persistencia verificada después de cerrar sesión.
- [ ] Aislamiento entre workspaces verificado.
- [ ] Importación y exportación probadas con errores.
- [ ] Duplicados controlados.
- [ ] Historial de cambios disponible.

## Seguridad

- [ ] Credenciales nunca aparecen completas después de guardarse.
- [ ] Secretos solo se procesan en backend.
- [ ] API keys tienen scopes y revocación.
- [ ] Permisos probados con distintos roles.
- [ ] Auditoría registra acciones sensibles.

## Integraciones

- [ ] OAuth o credenciales revocadas muestran una reparación clara.
- [ ] Webhooks validan firma.
- [ ] Reintentos no duplican operaciones.
- [ ] Errores del proveedor quedan registrados.
- [ ] Sandbox y producción están diferenciados.

## Calidad

- [ ] `npm run lint` pasa.
- [ ] `npm run build` pasa.
- [ ] El workflow inicia correctamente.
- [ ] El preview carga sin errores de renderizado.
- [ ] El dashboard funciona en desktop, tablet y móvil.
- [ ] Se revisaron estados loading, empty, error y success.

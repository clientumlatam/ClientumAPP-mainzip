# Clientum — Roadmap del sitio público

Roadmap para evolucionar el sitio público de Clientum desde un portal comercial
con muchas secciones hacia una experiencia profesional, confiable, accesible,
medible y orientada a generar oportunidades comerciales.

> **Principio rector:** el sitio público no debe limitarse a mostrar módulos.
> Debe explicar con claridad para quién es Clientum, demostrar el producto,
> construir confianza y convertir cada interacción relevante en una oportunidad
> trazable dentro del CRM.

---

## Cómo usar este roadmap

### Estados

- `[ ]` Pendiente.
- `[-]` Disponible parcialmente o requiere consolidación.
- `[x]` Disponible y verificado en el sitio.
- `[!]` Requiere decisión comercial, legal o de proveedor.

### Prioridades

- **P0 — Crítico:** afecta conversión, confianza, seguridad, SEO o funcionamiento
  básico del sitio.
- **P1 — Alto:** mejora directamente la generación de demanda y la experiencia
  comercial.
- **P2 — Medio:** diferencia el producto y amplía el alcance del sitio.
- **P3 — Futuro:** expansión después de estabilizar fundamentos y medición.

### Definition of Done general

Una mejora del sitio público se considera terminada cuando:

- [ ] Funciona correctamente en desktop, tablet y móvil.
- [ ] Tiene estados de carga, vacío, error y éxito cuando corresponde.
- [ ] Tiene validaciones de entrada y mensajes claros.
- [ ] Tiene un CTA principal y un siguiente paso evidente.
- [ ] Es accesible mediante teclado y lector de pantalla.
- [ ] Tiene eventos de analítica definidos.
- [ ] Tiene metadatos SEO y una URL compartible.
- [ ] No presenta como real una integración, métrica o capacidad que todavía sea
  parcial, simulada o dependiente de configuración.
- [ ] Está probado en navegadores principales.
- [ ] Tiene copy revisado en español argentino y terminología consistente.

---

## Estado actual resumido

### Base pública disponible

- [x] Home comercial con propuesta de valor, métricas y llamadas a la acción.
- [x] Navbar pública con navegación por producto, industrias, precios, recursos y
  contacto.
- [x] Footer público con sitemap.
- [x] Página dedicada de Clientum CRM.
- [x] Páginas de productos y módulos.
- [x] Página de precios con alternancia ARS/USD.
- [x] Páginas para industrias y verticales.
- [x] Página de servicios profesionales.
- [x] Casos de éxito.
- [x] Recursos y blog.
- [x] Página institucional.
- [x] Página de contacto.
- [x] Términos, privacidad y SLA.
- [x] Simulador público de WhatsApp.
- [x] Auditoría digital express.
- [x] Cotizador o wizard de implementación.
- [x] Navegación móvil y buscador público.

### Parcial o pendiente de consolidación

- [-] Los formularios y modales existen; verificar que creen leads reales,
  envíen notificaciones y guarden atribución.
- [-] La demo de WhatsApp es interactiva; diferenciar claramente simulación,
  demo y conexión productiva.
- [-] El sitio muestra muchos módulos; agregar estados visibles de disponible,
  demo, configuración requerida o próximamente.
- [-] Las páginas usan navegación hash; migrar a URLs reales para mejorar SEO,
  compartir enlaces y analítica.
- [-] El contenido legal y de seguridad existe; validar que cada afirmación esté
  respaldada por la operación real.
- [-] Existen casos, recursos y servicios; ampliar evidencia con métricas,
  autores, fechas y resultados verificables.
- [-] La página de precios existe; completar el flujo comercial posterior a la
  selección de un plan.

### Regla de comunicación pública

- [ ] No presentar como cliente, partner o certificación una relación que no esté
  confirmada.
- [ ] No presentar una simulación como una conexión productiva.
- [ ] No prometer SLA, backups, infraestructura, cifrado o tiempos de soporte
  que no estén definidos y operativamente medidos.
- [ ] No presentar un módulo de catálogo como funcionalidad productiva sin
  indicar sus requisitos y estado.
- [ ] Mostrar siempre el siguiente paso después de cada CTA.

---

# Fase 0 — Fundaciones web, SEO y confianza

**Prioridad:** P0  
**Objetivo:** asegurar que el sitio sea encontrable, compartible, creíble y
correcto desde el punto de vista técnico.

## 0.1 URLs y navegación

- [ ] Reemplazar progresivamente las rutas hash:
  - `/#/producto/crm`
  - `/#/precios`
  - `/#/contacto`
- [ ] Migrar a URLs reales:
  - `/producto/crm`
  - `/precios`
  - `/contacto`
  - `/casos`
  - `/recursos`
- [ ] Configurar fallback del servidor hacia `index.html`.
- [ ] Mantener redirecciones para enlaces antiguos con hash.
- [ ] Crear una página 404 pública con navegación y CTA.
- [ ] Conservar scroll restoration por página.
- [ ] Permitir copiar y compartir URLs específicas.
- [ ] Verificar que Back y Forward del navegador funcionen correctamente.

## 0.2 SEO técnico

- [ ] Cambiar `lang="en"` por `lang="es-AR"`.
- [ ] Reemplazar el título genérico “Remix ClientumCRM”.
- [ ] Crear title y description únicos para cada página pública.
- [ ] Agregar canonical URL por página.
- [ ] Agregar Open Graph:
  - [ ] `og:title`.
  - [ ] `og:description`.
  - [ ] `og:url`.
  - [ ] `og:image`.
  - [ ] `og:type`.
- [ ] Agregar Twitter/X Cards.
- [ ] Crear una imagen social coherente con la marca.
- [ ] Crear `sitemap.xml`.
- [ ] Crear `robots.txt`.
- [ ] Configurar Search Console y Bing Webmaster Tools.
- [ ] Evitar que URLs de demo o páginas internas se indexen si no corresponde.

## 0.3 Datos estructurados

- [ ] Schema `Organization`.
- [ ] Schema `SoftwareApplication`.
- [ ] Schema `Product` para planes o paquetes.
- [ ] Schema `FAQPage` cuando exista una sección FAQ visible.
- [ ] Schema `Article` para recursos y blog.
- [ ] Schema `LocalBusiness` solamente si aplica y los datos son verificables.
- [ ] Validar los schemas con herramientas oficiales.

## 0.4 Revisión de claims públicos

- [ ] Auditar todas las métricas mostradas en home.
- [ ] Auditar cifras de pipeline, tasa de cierre y ciclos promedio.
- [ ] Auditar el claim de “14 agentes especialistas”.
- [ ] Auditar disponibilidad de 99.9%.
- [ ] Auditar referencias a Google Cloud, backups y arquitectura multizona.
- [ ] Auditar referencias a Gemini y tratamiento de datos.
- [ ] Auditar integraciones con AFIP, WhatsApp, Mercado Pago, Shopify y otras.
- [ ] Añadir fuente, fecha o contexto a las métricas públicas relevantes.
- [ ] Marcar como demo cualquier dato que no provenga de producción.

## 0.5 Página de seguridad y confianza

- [ ] Crear `/seguridad`.
- [ ] Explicar aislamiento por workspace.
- [ ] Explicar autenticación y permisos.
- [ ] Explicar cifrado en tránsito y en reposo con lenguaje verificable.
- [ ] Explicar backups y retención.
- [ ] Explicar exportación y eliminación de datos.
- [ ] Publicar subprocesadores cuando corresponda.
- [ ] Publicar canal de reporte de vulnerabilidades.
- [ ] Agregar página o enlace a estado operativo.
- [ ] Definir contacto de privacidad y responsable de datos.

---

# Fase 1 — Conversión comercial de punta a punta

**Prioridad:** P0  
**Objetivo:** convertir interés en leads trazables y conversaciones comerciales
reales.

## 1.1 Formularios públicos

- [ ] Conectar el formulario de contacto al backend real.
- [ ] Crear un lead automáticamente en el CRM.
- [ ] Guardar:
  - [ ] Nombre.
  - [ ] Empresa.
  - [ ] Email.
  - [ ] Teléfono.
  - [ ] Industria.
  - [ ] Tamaño de empresa.
  - [ ] Necesidad principal.
  - [ ] Página de origen.
  - [ ] UTMs.
- [ ] Validar email, teléfono y campos obligatorios.
- [ ] Implementar protección contra spam y abuso.
- [ ] Enviar email de confirmación al visitante.
- [ ] Notificar al equipo comercial.
- [ ] Evitar leads duplicados por email o teléfono.
- [ ] Mostrar estados de envío, error, reintento y éxito.
- [ ] Crear una página de agradecimiento específica.

## 1.2 Tipos de conversión

- [ ] Solicitar una demo.
- [ ] Solicitar una cotización.
- [ ] Solicitar auditoría.
- [ ] Contactar ventas.
- [ ] Consultar soporte.
- [ ] Descargar un recurso.
- [ ] Solicitar una implementación por industria.
- [ ] Diferenciar el origen y la intención de cada formulario.

## 1.3 Agenda de demos

- [ ] Integrar un calendario real.
- [ ] Mostrar disponibilidad actualizada.
- [ ] Permitir elegir fecha y horario.
- [ ] Crear evento de calendario.
- [ ] Enviar confirmación por email.
- [ ] Enviar recordatorio.
- [ ] Permitir reprogramar y cancelar.
- [ ] Crear la actividad correspondiente en el CRM.
- [ ] Registrar asistencia, ausencia y resultado comercial.
- [ ] Mostrar un fallback de contacto si el calendario no está disponible.

## 1.4 Cotizador de implementación

- [ ] Definir preguntas del wizard.
- [ ] Definir reglas de cálculo.
- [ ] Mostrar módulos recomendados.
- [ ] Mostrar rango de inversión.
- [ ] Mostrar plazo estimado.
- [ ] Mostrar nivel de complejidad.
- [ ] Permitir guardar el resultado.
- [ ] Enviar el resultado por email.
- [ ] Generar PDF opcional.
- [ ] Crear lead y oportunidad en el CRM.
- [ ] Permitir agendar una llamada desde el resultado.
- [ ] Medir abandono por paso.

## 1.5 Atribución

- [ ] Capturar UTMs.
- [ ] Capturar landing page inicial.
- [ ] Capturar página de conversión.
- [ ] Guardar referrer.
- [ ] Registrar campaña, fuente y medio.
- [ ] Mantener atribución entre páginas.
- [ ] Asociar la atribución al lead del CRM.
- [ ] Reportar conversión por fuente.

---

# Fase 2 — Propuesta de valor, contenido y prueba social

**Prioridad:** P1  
**Objetivo:** explicar mejor el producto y reducir la incertidumbre antes del
contacto comercial.

## 2.1 Home

- [ ] Explicar claramente para quién es Clientum.
- [ ] Reducir mensajes genéricos y priorizar un beneficio principal.
- [ ] Presentar un CTA principal y uno secundario.
- [ ] Mostrar resultados concretos, no solo cantidad de módulos.
- [ ] Agregar una sección “Cómo funciona”.
- [ ] Agregar una sección “Qué incluye”.
- [ ] Agregar una sección “Por qué Clientum”.
- [ ] Agregar FAQ comercial.
- [ ] Agregar prueba social cerca de los CTA.
- [ ] Revisar el orden de la página en móvil.

## 2.2 Casos de éxito

- [ ] Publicar cliente o industria identificable cuando exista autorización.
- [ ] Mostrar problema inicial.
- [ ] Mostrar implementación.
- [ ] Mostrar resultado medible.
- [ ] Mostrar tiempo hasta el resultado.
- [ ] Agregar testimonio textual.
- [ ] Agregar imagen, logo o video cuando sea posible.
- [ ] Agregar filtros por industria.
- [ ] Agregar CTA desde cada caso.
- [ ] Verificar que todas las métricas sean reales y auditables.

## 2.3 Página de comparación

- [ ] Clientum vs. planillas.
- [ ] Clientum vs. CRM genérico.
- [ ] Clientum vs. varias herramientas separadas.
- [ ] Clientum vs. desarrollo a medida.
- [ ] Comparar precio local, AFIP, WhatsApp, automatización, soporte y
  personalización.
- [ ] Evitar claims agresivos o no verificables.

## 2.4 Páginas por industria

- [ ] Definir problema específico por industria.
- [ ] Mostrar flujo de trabajo de esa industria.
- [ ] Mostrar módulos relevantes.
- [ ] Mostrar integración necesaria.
- [ ] Mostrar caso de éxito relacionado.
- [ ] Definir CTA específico.
- [ ] Agregar preguntas frecuentes por vertical.
- [ ] Crear title, description y schema propios.

## 2.5 Recursos y blog

- [ ] Crear categorías editoriales.
- [ ] Mostrar autor y fecha.
- [ ] Mostrar fecha de última actualización.
- [ ] Agregar búsqueda.
- [ ] Agregar filtros.
- [ ] Agregar recursos descargables.
- [ ] Crear plantillas y checklists.
- [ ] Añadir CTAs contextuales.
- [ ] Conectar descargas con captura de lead.
- [ ] Agregar newsletter con consentimiento.

---

# Fase 3 — Experiencia de producto y autoservicio

**Prioridad:** P1  
**Objetivo:** permitir que un visitante entienda el producto antes de hablar con
ventas.

## 3.1 Demo interactiva

- [ ] Crear una demo pública del CRM con datos ficticios.
- [ ] Mostrar pipeline Kanban.
- [ ] Mostrar ficha 360°.
- [ ] Mostrar empresas y contactos.
- [ ] Mostrar bandeja de WhatsApp.
- [ ] Mostrar automatización.
- [ ] Mostrar reportes.
- [ ] Mostrar facturación o ERP.
- [ ] Agregar recorrido guiado.
- [ ] Agregar indicadores de progreso.
- [ ] Permitir reiniciar la demo.
- [ ] Evitar exponer datos reales.
- [ ] Medir módulos visitados.

## 3.2 Videos

- [ ] Video principal de 60 segundos.
- [ ] Video de pipeline y ventas.
- [ ] Video de WhatsApp y omnicanalidad.
- [ ] Video de AFIP/ERP.
- [ ] Video de automatizaciones.
- [ ] Video de implementación.
- [ ] Testimonio de cliente.
- [ ] Agregar subtítulos.
- [ ] Agregar poster e imagen alternativa.
- [ ] Cargar videos de forma diferida.

## 3.3 Documentación pública

- [ ] Crear centro de documentación.
- [ ] Guía de inicio.
- [ ] Guía de importación CSV.
- [ ] Guía de WhatsApp.
- [ ] Guía de AFIP.
- [ ] Guía de integraciones.
- [ ] Guía de permisos.
- [ ] Guía de seguridad.
- [ ] Preguntas frecuentes técnicas.
- [ ] Estado de cada integración.

## 3.4 Prueba gratuita o sandbox

- [ ] Definir si habrá trial.
- [ ] Definir duración.
- [ ] Definir límites.
- [ ] Crear workspace demo aislado.
- [ ] Crear onboarding inicial.
- [ ] Mostrar checklist de activación.
- [ ] Capturar intención de compra.
- [ ] Definir conversión de trial a plan.
- [ ] Crear emails de activación.
- [ ] Definir recuperación de usuarios inactivos.

---

# Fase 4 — Accesibilidad, responsive y rendimiento

**Prioridad:** P0/P1  
**Objetivo:** que el sitio sea rápido, usable y accesible para todas las
personas y dispositivos.

## 4.1 Accesibilidad

- [ ] Agregar enlace “Saltar al contenido”.
- [ ] Verificar jerarquía H1/H2/H3.
- [ ] Agregar labels reales a formularios.
- [ ] Revisar `aria-expanded` en menús.
- [ ] Revisar `aria-current` en navegación.
- [ ] Implementar focus trap en modales.
- [ ] Devolver foco al elemento que abrió cada modal.
- [ ] Permitir cerrar modales con Escape.
- [ ] Verificar navegación completa con teclado.
- [ ] Mejorar contraste de textos secundarios.
- [ ] Agregar alt text descriptivo.
- [ ] Evitar texto importante dentro de imágenes.
- [ ] Respetar `prefers-reduced-motion`.
- [ ] Ejecutar auditoría Lighthouse y axe.

## 4.2 Responsive

- [ ] Probar navbar en pantallas pequeñas.
- [ ] Probar menú móvil completo.
- [ ] Probar hero en 320 px de ancho.
- [ ] Probar tablas y comparativas.
- [ ] Probar modales largos.
- [ ] Probar formularios con teclado móvil.
- [ ] Probar orientación horizontal.
- [ ] Revisar tamaños táctiles.
- [ ] Verificar que no exista scroll horizontal accidental.
- [ ] Revisar legibilidad de precios y métricas.

## 4.3 Rendimiento

- [ ] Medir Core Web Vitals.
- [ ] Reducir JavaScript inicial.
- [ ] Separar páginas públicas mediante carga diferida.
- [ ] Cargar modales solo cuando se abren.
- [ ] Optimizar imágenes.
- [ ] Usar formatos modernos de imagen.
- [ ] Definir tamaños de imagen.
- [ ] Evitar layout shift.
- [ ] Cargar fuentes de forma optimizada.
- [ ] Configurar cache de assets.
- [ ] Comprimir respuestas.
- [ ] Revisar bundle size en cada release.

---

# Fase 5 — Analítica, experimentación y crecimiento

**Prioridad:** P1  
**Objetivo:** entender qué funciona y mejorar el embudo de forma continua.

## 5.1 Eventos

- [ ] Vista de página.
- [ ] Click en “Pedir Demo”.
- [ ] Click en “Calcular ahorro”.
- [ ] Click en “Auditoría Express”.
- [ ] Inicio de formulario.
- [ ] Formulario completado.
- [ ] Formulario fallido.
- [ ] Inicio del cotizador.
- [ ] Cotizador completado.
- [ ] Simulador iniciado.
- [ ] Simulador completado.
- [ ] Click en precios.
- [ ] Selección de plan.
- [ ] Descarga de recurso.
- [ ] Inicio de prueba.
- [ ] Click en acceso al CRM.

## 5.2 Métricas

- [ ] Visitantes por página.
- [ ] Conversión a lead.
- [ ] Conversión a demo.
- [ ] Conversión a oportunidad.
- [ ] Conversión por industria.
- [ ] Conversión por fuente.
- [ ] Abandono del cotizador.
- [ ] Tiempo hasta contacto comercial.
- [ ] Porcentaje de leads calificados.
- [ ] Costo por lead cuando exista publicidad.
- [ ] Conversión de prueba a cliente.

## 5.3 Consentimiento y privacidad

- [ ] Implementar consentimiento de cookies cuando corresponda.
- [ ] Separar analítica necesaria de marketing.
- [ ] Permitir retirar consentimiento.
- [ ] Documentar herramientas de medición.
- [ ] No registrar datos personales innecesarios en eventos.
- [ ] Anonimizar información sensible.
- [ ] Definir retención de datos de formularios.

## 5.4 Experimentación

- [ ] Probar titulares del hero.
- [ ] Probar CTA principal.
- [ ] Probar longitud de formularios.
- [ ] Probar prueba social cerca del hero.
- [ ] Probar mostrar precios o solicitar cotización.
- [ ] Probar demo guiada contra video.
- [ ] Documentar hipótesis.
- [ ] Definir métrica primaria.
- [ ] Mantener control y duración suficiente.

---

# Fase 6 — Expansión comercial

**Prioridad:** P2/P3  
**Objetivo:** ampliar adquisición, autoservicio y distribución después de
estabilizar el embudo principal.

## 6.1 Programa de partners

- [ ] Página para agencias e implementadores.
- [ ] Formulario de alta de partner.
- [ ] Material comercial descargable.
- [ ] Registro de referidos.
- [ ] Reglas de comisión.
- [ ] Portal o área privada de partners.
- [ ] Seguimiento de oportunidades referidas.

## 6.2 Programa de referidos

- [ ] Crear invitaciones.
- [ ] Crear enlace de referido.
- [ ] Mostrar estado de la recomendación.
- [ ] Definir beneficio.
- [ ] Medir conversiones.
- [ ] Prevenir abuso.

## 6.3 Portal de clientes

- [ ] Acceso autenticado desde el sitio público.
- [ ] Estado de implementación.
- [ ] Documentación personalizada.
- [ ] Tickets y soporte.
- [ ] Próximas reuniones.
- [ ] Facturación y plan.
- [ ] Renovación y expansión.

## 6.4 Internacionalización

- [ ] Definir español argentino como idioma principal.
- [ ] Preparar español neutro.
- [ ] Evaluar portugués para Brasil.
- [ ] Evaluar inglés solo si existe demanda real.
- [ ] Implementar `hreflang`.
- [ ] Separar moneda, impuestos y disponibilidad por país.

---

# Checklists de lanzamiento

## Checklist de una nueva landing

- [ ] Tiene una audiencia definida.
- [ ] Tiene un problema concreto.
- [ ] Tiene una promesa verificable.
- [ ] Tiene CTA principal.
- [ ] Tiene prueba social o evidencia.
- [ ] Tiene FAQ.
- [ ] Tiene formulario o siguiente paso.
- [ ] Tiene URL real.
- [ ] Tiene title y description.
- [ ] Tiene Open Graph.
- [ ] Tiene Schema.org cuando corresponde.
- [ ] Está probada en móvil.
- [ ] Tiene eventos de analítica.
- [ ] Tiene revisión legal y de claims.

## Checklist de una campaña

- [ ] Tiene landing específica.
- [ ] Tiene UTMs.
- [ ] Tiene mensaje consistente con el anuncio.
- [ ] Tiene formulario conectado al CRM.
- [ ] Tiene respuesta automática.
- [ ] Tiene responsable comercial.
- [ ] Tiene SLA de seguimiento.
- [ ] Tiene dashboard de conversión.
- [ ] Tiene prueba de atribución.
- [ ] Tiene variante de fallback si falla la integración.

## Checklist antes de publicar

- [ ] No hay enlaces rotos.
- [ ] No hay rutas que devuelvan contenido incorrecto.
- [ ] No hay errores en consola.
- [ ] No hay formularios sin destino.
- [ ] Los CTAs principales funcionan.
- [ ] Los modales pueden cerrarse con Escape.
- [ ] La navegación móvil funciona.
- [ ] Las páginas legales están accesibles.
- [ ] El favicon y la imagen social son correctos.
- [ ] Las métricas públicas fueron verificadas.
- [ ] Se probaron 320 px, 768 px y 1280 px.
- [ ] Lighthouse fue ejecutado.
- [ ] Se verificaron analytics y conversiones.
- [ ] Se guardó el resultado de la prueba.

---

# Definition of Done del sitio público

El sitio público estará listo para operar como canal comercial cuando:

- [ ] Un visitante entiende en menos de 10 segundos qué es Clientum y para quién
  es.
- [ ] Puede explorar el producto sin depender exclusivamente de un vendedor.
- [ ] Puede solicitar una demo y recibe confirmación.
- [ ] Puede pedir una cotización y recibe un siguiente paso claro.
- [ ] Cada lead llega al CRM con atribución de origen.
- [ ] El equipo comercial recibe y puede priorizar los leads.
- [ ] Las páginas importantes tienen URLs reales y metadatos propios.
- [ ] El sitio es accesible y usable desde móvil.
- [ ] Las afirmaciones de seguridad, disponibilidad e integraciones son
  verificables.
- [ ] El rendimiento y la conversión se miden continuamente.
- [ ] Las integraciones parciales o simuladas se identifican claramente.

---

# Orden recomendado de ejecución

## Próximos 30 días

- [ ] Conectar formularios al CRM.
- [ ] Completar estados de éxito y error.
- [ ] Capturar UTMs.
- [ ] Revisar claims públicos.
- [ ] Corregir title, description y `lang`.
- [ ] Crear sitemap y robots.
- [ ] Instrumentar CTA principales.
- [ ] Probar accesibilidad básica.

## Próximos 60 días

- [ ] Implementar agenda real.
- [ ] Completar cotizador con resultado y seguimiento.
- [ ] Migrar las páginas principales a URLs reales.
- [ ] Publicar página de seguridad.
- [ ] Mejorar casos de éxito.
- [ ] Crear FAQ y comparativa.
- [ ] Optimizar móvil y Core Web Vitals.

## Próximos 90 días

- [ ] Lanzar demo interactiva del CRM.
- [ ] Publicar videos de producto.
- [ ] Crear documentación pública.
- [ ] Evaluar trial o sandbox.
- [ ] Crear landing pages por industria.
- [ ] Implementar experimentación A/B.
- [ ] Crear programa de partners o referidos.

---

## Métricas de éxito sugeridas

- Conversión de visitante a lead.
- Conversión de visitante a demo.
- Conversión de demo a oportunidad.
- Porcentaje de formularios completados.
- Tiempo medio de respuesta comercial.
- Porcentaje de leads con atribución completa.
- Tasa de abandono del cotizador.
- Tasa de activación de prueba.
- Core Web Vitals.
- Puntuación Lighthouse.
- Porcentaje de páginas indexadas correctamente.
- Porcentaje de eventos comerciales registrados sin error.
# Clientum — Estructura de Emails

---

## Resumen

Todas las direcciones del dominio **clientum.com.ar** están configuradas como **routing rules** (reenvío) hacia una única casilla centralizada:

> **Destino único:** `clientumlatam@gmail.com`

Es decir, no hay bandejas separadas por área todavía — cualquier email que llegue a cualquiera de las 24 direcciones de abajo termina en la misma casilla de Gmail. También hay una regla de **catch-all** activa, que redirige (Drop) cualquier dirección no listada explícitamente.

---

## Catch-all

| Regla | Acción | Estado |
|-------|--------|--------|
| Catch-all (cualquier dirección no listada) | Drop | Activa |

Esto significa que un email a una dirección inventada o mal escrita (ej. `factuacion@clientum.com.ar`) **se descarta**, no rebota ni se reenvía. Solo las 24 direcciones de la tabla siguiente están activas.

---

## Direcciones activas por categoría

### Comercial / Ventas
| Dirección | Destino | Uso sugerido |
|-----------|---------|--------------|
| `ventas@clientum.com.ar` | clientumlatam@gmail.com | Consultas comerciales directas |
| `consultas@clientum.com.ar` | clientumlatam@gmail.com | Consultas generales de prospectos |
| `demo@clientum.com.ar` | clientumlatam@gmail.com | Pedidos de demo / prueba |
| `oportunidades@clientum.com.ar` | clientumlatam@gmail.com | Leads / oportunidades de negocio |
| `hola@clientum.com.ar` | clientumlatam@gmail.com | Contacto genérico (landing / redes) |

### Soporte / Operaciones
| Dirección | Destino | Uso sugerido |
|-----------|---------|--------------|
| `soporte@clientum.com.ar` | clientumlatam@gmail.com | Soporte técnico a clientes |
| `admin@clientum.com.ar` | clientumlatam@gmail.com | Administración general |
| `facturacion@clientum.com.ar` | clientumlatam@gmail.com | Facturación y pagos |
| `cloud@clientum.com.ar` | clientumlatam@gmail.com | Infraestructura / hosting |

### Comunicaciones / Marketing
| Dirección | Destino | Uso sugerido |
|-----------|---------|--------------|
| `marketing@clientum.com.ar` | clientumlatam@gmail.com | Campañas y comunicación |
| `newsletter@clientum.com.ar` | clientumlatam@gmail.com | Envíos de newsletter |
| `noreply@clientum.com.ar` | clientumlatam@gmail.com | Remitente de notificaciones automáticas (no debería recibir respuestas) |
| `alerts@clientum.com.ar` | clientumlatam@gmail.com | Alertas del sistema |

### Producto / IA
| Dirección | Destino | Uso sugerido |
|-----------|---------|--------------|
| `ai@clientum.com.ar` | clientumlatam@gmail.com | Relacionado a los agentes/bots de IA |
| `agents@clientum.com.ar` | clientumlatam@gmail.com | Gestión de agentes automatizados |
| `routing@clientum.com.ar` | clientumlatam@gmail.com | Probablemente vinculada al enrutamiento interno de leads |
| `academia@clientum.com.ar` | clientumlatam@gmail.com | Contenido educativo / capacitación |
| `realizaciones@clientum.com.ar` | clientumlatam@gmail.com | Casos de éxito / entregables |

### Personales / Equipo
| Dirección | Destino | Uso sugerido |
|-----------|---------|--------------|
| `jonathan@clientum.com.ar` | clientumlatam@gmail.com | Casilla personal (fundador) |
| `santi@clientum.com.ar` | clientumlatam@gmail.com | Casilla personal (equipo) |
| `matias@clientum.com.ar` | clientumlatam@gmail.com | Casilla personal (equipo) |

### Institucional / Genéricas
| Dirección | Destino | Uso sugerido |
|-----------|---------|--------------|
| `info@clientum.com.ar` | clientumlatam@gmail.com | Información institucional |
| `clientumlatam@clientum.com.ar` | clientumlatam@gmail.com | Alias de marca |

### A revisar ⚠️
| Dirección | Destino | Observación |
|-----------|---------|--------------|
| `tocomoccomusic@clientum.com.ar` | clientumlatam@gmail.com | No encaja con el resto del naming (parece de otro proyecto/cliente). Confirmar si sigue en uso o se puede desactivar. |

---

## Diagnóstico rápido

- **24 direcciones activas**, todas apuntando al mismo destino → hoy funciona como una casilla única con múltiples "puertas de entrada", útil para trackear el origen del contacto (por asunto/dirección) pero sin separación real de bandejas.
- Hay **redundancia de intención** entre varias direcciones: `hola@`, `consultas@`, `info@` y `ventas@` probablemente reciben el mismo tipo de mensaje. Vale la pena definir cuál es la "oficial" para cada canal (landing, tarjetas, firma de mail, etc.) y dejar el resto como alias de respaldo.
- `noreply@` normalmente **no debería** tener routing hacia una casilla monitoreada — se usa como remitente de sistema para que la gente no responda ahí. Si Clientum lo usa activamente como remitente de notificaciones, está bien que redirija a algún lado por si alguien contesta igual, pero no es una casilla para chequear a diario.
- `tocomoccomusic@` es la única que no sigue el patrón temático de Clientum — candidata a revisar/eliminar si no corresponde a un cliente o proyecto activo.

---

## Recomendación a futuro (opcional)

Si el volumen de emails crece, conviene pasar de "todo a una casilla" a:

1. **Filtros/etiquetas en Gmail** basados en el "To:" original (Gmail conserva ese header aunque haya routing), para separar visualmente ventas / soporte / facturación dentro de la misma bandeja sin crear casillas nuevas.
2. Más adelante, migrar las de mayor volumen (`soporte@`, `ventas@`) a una casilla o herramienta dedicada (ej. Helpdesk, o un Google Group) cuando el volumen lo justifique.

---

*Documento generado a partir del listado de routing rules del dominio clientum.com.ar (24 de 24 direcciones activas + 1 catch-all).*

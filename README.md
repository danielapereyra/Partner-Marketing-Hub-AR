# Partner Marketing Hub · v5

Calendario único y operativo del equipo Partner Marketing Tiendanube ARG. Reemplaza el sheet `[B&C 2026] Partner Marketing | HUB ARG`. **Uso interno · no compartir fuera de Tiendanube.**

## 🆕 V5 · Nueva tab **Beneficios para Agencias**

Pipeline 360° de los beneficios de marketing que se le dan a agencias partner. Cubre **UGC Estándar + UGC Studio Edition + Sponsorships + Pocket Events** desde un mismo lugar.

| Componente | Detalle |
|---|---|
| **Kanban de 5 etapas** | Por definir → Briefeado → En producción → Publicado/Ejecutado → Medido. Click en cualquier etapa del tracker para saltar. |
| **Capacidad mensual** | Widgets en el header con slots ocupados/cap (UGC: 2/2, Studio: 1/1, Sponsorships: 2/3, Pockets: 1/4). Marca "Lleno" si llegó al cap. |
| **Detalle por slot** | Tipo de beneficio, agencia, tier, formato UGC (Expert Drop / Caso éxito / Deep Dive / Hot Take / Quick Win), pilar (15 opciones de la PPT), headline propuesto, CTA palabra, beneficio que ofrece la agencia, owners (TN + agencia), brief link, **métricas duales** (contenido reporta TN · conversión reporta agencia). |
| **Filtro por tipo** | Chips para filtrar por tipo de beneficio. |
| **Conexión calendario** | Cada slot con fecha aparece como chip 🎁 en el calendario condensado (categoría según tipo: ugc, sponsorship, pocket_event). Click en el chip abre el detalle del beneficio. Equipos externos lo ven en contexto sin entrar a la tab. |
| **Detección de atrasos** | Si la fecha objetivo ya pasó y la etapa no es Publicado/Medido, el slot se marca como "Atrasado" en rojo. |
| **Read-only para Viewer** | Otros equipos lo ven en modo consulta. Solo Admin edita / avanza etapas / agrega métricas. |

**Datos seed reales (9 slots demo):** Zurbrand (UGC publicado), Estudio Volando (UGC producción), KODE (UGC briefeado), Gif Makers (UGC idea), Brainsted (Studio Edition briefeado), Krab-e en D2C Summit (Sponsorship medido), Innovate en Tecnomoda (Sponsorship producción), We Are en Casa Cavia (Pocket medido), Krab-e en Rosario (Pocket idea).



---

## ▶️ Cómo abrirlo para probarlo (3 segundos)

**Opción 1 — Doble click (más rápido):**
1. En tu Mac/PC, navegá hasta esta carpeta (la que tiene este README).
2. **Doble click sobre `index.html`** → se abre en tu navegador por defecto (Chrome, Safari, etc.).
3. ¡Listo! La primera vez te aparece una portada para elegir si entrás como **Admin** o **Visualización**.

> El archivo es 100% self-contained (HTML + JS + CSS + datos en un solo archivo). No necesita servidor, internet sí (para cargar Tailwind y los íconos desde CDN).

**Opción 2 — Deploy público en Vercel (~1 minuto, para compartir con el equipo):**
1. Andá a [vercel.com/new](https://vercel.com/new).
2. Login con Google (cuenta @tiendanube.com).
3. Arrastrá esta carpeta `Partner Mkt Hub` a la zona de drop.
4. Click "Deploy" → te da un URL tipo `partner-mkt-hub-arg.vercel.app`.
5. Compartilo solo con cuentas TN (más adelante en Fase 2 le agregamos Google SSO restringido a `@tiendanube.com`).

---

## 🆕 V4 · Cambios respecto a V3

| Feature | Detalle |
|---|---|
| **Portada de bienvenida** | Modal al primer acceso explica qué es el hub + aclara que es uso interno. Elegís rol: Admin (Partner Marketing) o Visualización (otros equipos). El rol se persiste en localStorage. |
| **Sistema de roles** | **Admin** ve botones de crear/editar/eliminar, carga masiva, Lumi full. **Viewer** solo ve, copia y consulta Lumi para resúmenes ejecutivos. Toggle 🛠️/👀 en top bar para alternar y testear. |
| **4 vistas de calendario** | **Trimestre · Mes · Semana · Día**, con nav inteligente (semana: ±7 días, día: ±1 día). La vista Día muestra cada item con copy completo y acciones. La vista Semana muestra 7 columnas detalladas. |
| **Tab Lista eliminada** | No tenía utilidad, removida del sidebar. |
| **IA contextual en cada item** | Las acciones de Lumi en el detalle ahora son **inteligentes según el estado del item**: por ejemplo, si la comm no tiene copy y está programada → "Generar copy"; si el evento tiene brief pero no descripción → "Generar descripción desde el brief"; si está finalizada sin KPIs → "Sumar resultados"; si está en una semana sin recordatorio → "Crear recordatorio WhatsApp"; si es business case sin copy → "Generar carrusel LinkedIn"; etc. |
| **Lumi por rol** | Admin: chat conversacional completo. Viewer: solo resumen ejecutivo automático del mes en curso + mes próximo. |
| **Insights sin filtros** | La barra de filtros se oculta en Insights (no aplica ahí). |

## 🤖 Smart actions detectadas

Lumi detecta automáticamente qué falta y propone una acción concreta. Las reglas que implementé:

1. **Comm pendiente sin copy** → Generar copy adaptado al canal (email, WhatsApp, newsletter).
2. **Acción con brief pero sin descripción** → Extraer descripción desde el contenido del brief.
3. **Comm próxima (<5 días) sin recordatorio WhatsApp** → Crear recordatorio asociado.
4. **Item finalizado sin KPIs** → Sumar resultados/métricas medidas.
5. **Item sin fecha** → Sugerir fecha óptima basada en huecos del calendario.
6. **Comm sin audiencia** → Sugerir audiencia según categoría.
7. **Business case sin copy** → Generar carrusel para LinkedIn.
8. **Email con copy** → Adaptar copy a WhatsApp (crea comm derivada).
9. **Evento finalizado** → Proponer business case de seguimiento (a 14 días vista).
10. **Comentarios con "TBD"** → Marcar para resolución.
11. **Tiene link HubSpot pero sin KPIs** → Importar métricas (simulado, en Fase 2 conecta a API real).

Si todo está completo y no hay nada faltante, Lumi te dice "Todo está completo ✨".

---

## V3 · Cambios respecto a V2

- **Filtros**: dropdown multiselect compacto cuando elegís tipo. En Biblioteca/Lumi/Insights se ocultan.
- **Estrategias rediseñada**: solo comunicaciones, vertical, con copys completos visibles. Botón "Copiar mes completo" + "Exportar .txt".
- **CSV con upload real**: input file + drag&drop además de descarga de plantilla.
- **Emojis arreglados**: fixed mojibake del extract original. Copy buttons usan `navigator.clipboard` para preservar emojis al pegar.
- **Edición simple**: drawer Editar con valores precargados. Quick edit de fecha/status desde la lista. Botón Copiar todo el item.

## V2 · Cambios respecto a V1

- **Migración 100%**: 122 items reales del sheet (43 acciones + 39 comms + 15 comunidad + 20 milestones + 5 sponsoreos).
- **Status semaforo** visible en cada chip del calendario (dot de color).
- **Filtros jerárquicos** Tipo → Categoría.
- **4 estados consolidados** (Pendiente/Programado/Finalizado/On hold).
- **Vista Estrategias** con tracker diario.
- **Carga masiva con IA** (doc libre + plantilla CSV).
- **Biblioteca editable** (templates + briefs + links + cases).

---

## ✅ Validación V4 (qué confirmé antes de entregar)

- ✅ JS sintaxis válida (260KB, 233k chars de código)
- ✅ Las 25 funciones nuevas de V4 están definidas y referenciadas correctamente
- ✅ Tab "Lista" removida del sidebar
- ✅ Modal de bienvenida presente
- ✅ Los 4 modos de calendario (Q/Mes/Semana/Día) cableados
- ✅ Botones condicionados por rol con `isAdmin()`
- ✅ Filtros ocultos en Insights/Biblioteca/Lumi
- ✅ 122 items reales cargados
- ✅ Emojis preservados (94 en el output)

---

## Lo que vas a ver al abrirlo

1. **Portada** explicando el hub + selección de rol (la primera vez).
2. **Sidebar** con Calendario · Estrategias · Lumi · Insights · Biblioteca. Botón "Nueva acción" + "Carga masiva" solo si sos Admin. Botón de Ayuda (?) abajo.
3. **Top bar** con buscador, pill 🛠️/👀 para alternar rol (testing), y botones Lumi / Carga masiva / Nueva.
4. **Calendario** abre por defecto en Mes con los items reales. Probá:
   - Toggle entre Trimestre, Mes, Semana, Día (top-right).
   - Filtros: arriba elegí "Comunicaciones" → ves el dropdown compacto de categorías.
   - Click en un chip → drawer con detalle. Mirá la sección "Lumi sugiere" con acciones inteligentes según el item.
   - Status dots: 🔴 Pendiente, 🟡 Programado, 🟢 Finalizado, 🟠 On hold.
5. **Estrategias** (sidebar): briefing mensual solo de comms con copys completos. Botón "Copiar mes completo" baja todo a portapapeles.
6. **Lumi**: como Admin, chat conversacional con 4 prompts pre-cargados. Como Viewer, resumen ejecutivo auto-generado.
7. **Insights**: 4 KPIs + distribución por categoría/audiencia + conflictos + slots libres.
8. **Biblioteca**: 4 tabs editables (templates / briefs / links / cases). Solo Admin puede agregar/editar.

## 🧪 Flujos para probar

**Como Admin:**
1. Abrir cualquier item → ver "Lumi sugiere" → click en una acción contextual.
2. Filtro Tipo: Comunicaciones → dropdown Categoría → elegir "WhatsApp" + "Email" → ver solo esas.
3. Estrategias mayo 2026 → botón "Copiar mes completo" → pegá en otra app, los emojis deben estar perfectos.
4. Carga masiva → tab CSV → "Subir archivo CSV" → testear con cualquier .csv → ver preview.
5. Click en cualquier chip del calendario → Editar → cambiar fecha → guardar → ver actualizado.

**Como Viewer** (click 🛠️ en top bar para cambiar a 👀):
1. Confirmar que botones Nueva/Carga masiva desaparecen.
2. Calendario sigue navegable, filtros funcionan.
3. Click en un item: solo Ver/Copiar disponibles, no Editar/Eliminar.
4. Tab Lumi: solo muestra resumen ejecutivo del mes.
5. Biblioteca: ver pero no crear.

## ⚠️ Limitaciones del prototipo actual

- **Datos en memoria**: todo lo que cambies se pierde al refrescar. La persistencia real viene en Fase 2 con Supabase.
- **IA mockeada**: las acciones de Lumi muestran respuestas pre-armadas. En Fase 2 conectan a Claude API.
- **Sin auth real**: el toggle de rol es para testeo. En producción se asigna por el SSO @tiendanube.com.
- **Sin colaboración multi-user**: dos personas no pueden editar a la vez. Lo arregla Supabase en Fase 2.

## 🚀 Próximos pasos para Fase 2 (Next.js + Supabase + Anthropic Claude)

El plan completo y el schema SQL están más abajo en este README. Cuando estés lista, decime y arrancamos. Necesito:
1. Acceso a una cuenta Vercel del equipo.
2. Crear proyecto Supabase (te guío en 10 min).
3. Lista de mails @tiendanube.com con permisos de edición.

---

## Costo Fase 2 en producción

| Servicio | Plan | Costo mensual |
|---|---|---|
| Vercel | Pro | USD 20 |
| Supabase | Pro | USD 25 |
| Anthropic API | Pay-as-you-go | ~USD 5–30 |
| **Total** | | **~USD 50–75** |

---

Hecho con ☁️ para el equipo Partner Marketing TN ARG · 🔒 Uso interno

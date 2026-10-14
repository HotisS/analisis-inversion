# Instrucciones para Claude Code en este repo

Este repo produce informes Word de análisis de inversión en tres verticales: empresa cotizada, ETF e industria/sector. El README explica la arquitectura.

## Dos tipos de análisis de empresa (14-oct-2026)

- **Análisis value** (el de siempre): informe Word de 28 secciones con DCF, calidad (ROIC − WACC) y objetivo a 12 meses por PER. Vive en `verticales/empresa/`, `informes/`, `cola.md` y `/analiza-empresa`. Todo lo que este archivo dice de «empresa», «informe», «cola» o «cartera» sin más se refiere a value.
- **Análisis growth**: crecimiento muy alto, tecnología nueva y cambio de tendencia en la percepción, aunque la empresa aún no gane dinero. Método y plantilla en `verticales/growth/`, cálculo en `motor/growth.mjs`, informes en `informes-growth/` (resumen en `informes-growth/resumen.md`), cola en `cola-growth.md` y procedimiento en `/analiza-growth`. No usa los requisitos value (ROIC − WACC, PER): tiene su puntuación, sus señales y su regla de compra.

**Antes de nada: `git pull`, y lee `MEMORIA.md` (reglas del usuario) y `cola.md` (qué queda pendiente).** El repo de GitHub es la única fuente: cada cambio, commit y push.

## Empresa cotizada (análisis value): usa `/analiza-empresa`

Para empresas, el procedimiento está en `.claude/commands/analiza-empresa.md` (con `verticales/empresa/lecciones.md` y las herramientas de `herramientas/`: descargas, datos de bolsa, extracto del prompt por subagente; y `motor/integrar.mjs` para juntar las notas) (también si el usuario lo pide con otras palabras: «analiza Viscofan»). Es un análisis largo, de 30-60 minutos, en dos pasos de código: `motor/calcular-empresa.mjs` hace todas las cuentas (DCF, comparables, indicadores, controles) y `motor/rellenar.mjs` genera el Word. Las secciones sin información tras tres búsquedas no se imprimen y se avisan (protocolo de huecos del prompt).

## Mantener el repo ligero (14-oct-2026: cada sesión gastaba demasiados tokens)

Lo que se lee al empezar (`CLAUDE.md`, `MEMORIA.md`, `cola.md`) y en cada análisis (`verticales/empresa/lecciones.md`, que leen también los cinco subagentes) tiene que ser corto y estar al día. **Al cerrar una tarea, antes del último commit:**
- `cola.md`: quita lo terminado (el histórico va a `archivo/`, si merece guardarse; si no, ya está en git).
- `MEMORIA.md`: solo reglas y decisiones vigentes; si una decisión nueva sustituye a otra, **reemplázala** en vez de añadir debajo (una cartera nueva sustituye a la anterior). El registro antiguo, en `archivo/`.
- `lecciones.md`: una lección nueva solo si es general y no está ya; las de un país van a `lecciones-paises.md` y las de un sector o caso contable a `lecciones-casos.md`. Si una herramienta se arregla, borra la lección que avisaba del fallo.
- **Cambios importantes** (método, reglas, una cartera que sustituye a otra, estructura del repo o del flujo, lo que se retira de estos archivos): una entrada corta en `archivo/HISTORICO.md`, la más reciente arriba. Es la memoria histórica: **no se lee en el día a día**, solo cuando el usuario pide revisar cambios pasados o hace falta saber por qué se decidió algo.
- No leas `archivo/`, los `diario.md` de otros informes ni el código de `motor/` salvo que haga falta para la tarea.

Si el usuario pide «limpieza», repasa estos archivos con ese criterio.

## Dos conceptos que no hay que confundir (13-oct-2026)

1. **Metodología del informe**: la del DCF. La «nueva», desde el 10-oct, lleva la prueba de **sostenibilidad del crecimiento** (`dcf.sostenibilidad`). Si la prueba falla, se rebaja el caso base. La columna «Metodología» de `seguimiento.xlsx` dice qué informes la tienen. Para pasar uno viejo: actualización rápida con `notas/actualizacion-vN.mjs` (sin investigación nueva).
2. **Rentabilidad a 12 meses (v2)**: BPA propio × PER propio con una **regla de múltiplos común** que aplica el código (`verticales/empresa/objetivo-12m.md`, `motor/objetivo12m.mjs`); vive en `valoracion.objetivo_12m` de cada informe, **manda en la recomendación** y el resultado va a `verticales/empresa/objetivo12m-revisados.json` y a las columnas «… 12 m» del Excel. Ordena compras y cartera; el valor intrínseco del informe es el «valor real».

Todo análisis nuevo cumple la lista «Análisis terminado» de `.claude/commands/analiza-empresa.md`; los encargos de subagentes para actualizar informes ya hechos están en `verticales/empresa/encargos/`, y la revisión a 12 meses se apunta con `herramientas/apuntar-12m.mjs`.

**Si pide la cartera**, aplica las «Preferencias de cartera» de `MEMORIA.md` (concentración, mínimo del 5 %, rentabilidad + valor real + calidad, motivo de negocio de cada operación).

**Lo que se decida en otro sitio (chat de claude.ai, Cowork, otro equipo) no existe hasta que está en el repo**: si el usuario cita un método, una revisión o una cartera que no está en el repo, pídele el texto o reconstrúyelo, y déjalo escrito aquí (método en `verticales/`, decisión en `MEMORIA.md`) antes de aplicarlo.

## Buscar candidatas: usa `/escanea-mercado`

Para buscar qué analizar («busca oportunidades», «escanea Europa», «qué nichos de agua hay»), el procedimiento está en `.claude/commands/escanea-mercado.md`: `herramientas/escaner.mjs` filtra todas las cotizadas de las tres regiones con los perfiles editables de `escaner/perfiles.json` y deja un Excel en `escaneos/`. Es código, sin coste de API; las candidatas se proponen al usuario y no se lanzan análisis sin su visto bueno.

## ETF y sector

«Analiza la empresa X», «analiza el ETF X», «analiza el sector X (en España)»:

1. Elige la vertical: `empresa`, `etf` o `sector`. Si no está claro (por ejemplo, un nombre que es a la vez empresa y ETF), pregunta.
2. Lee **entero** `verticales/<vertical>/prompt.md` y síguelo como instrucciones: papel, proceso, reglas de datos, campos y comprobaciones. La entrada es lo que ha dicho el usuario; para el sector, si no dice ámbito, España.
3. Investiga con búsqueda web y lectura de documentos. Prioriza siempre fuentes primarias (cuentas, regulador, KID, estadística oficial).
4. Escribe el JSON en `informes/<vertical>-<nombre-corto>-<AAAA-MM-DD>.json`.
5. Genera el informe:
   `node motor/rellenar.mjs --plantilla verticales/<vertical>/plantilla.docx --datos informes/<archivo>.json --salida "informes/<Nombre> - <AAAA-MM-DD>.docx"`
6. Corrige el JSON según los avisos y repite hasta que solo queden avisos de datos que de verdad no existen.
7. Responde con la ruta del informe y cinco líneas como máximo: conclusión, cobertura y las tres lagunas principales.

Reglas que no se negocian: no inventar cifras (mejor `null`), citar fuentes con `[n]`, y no cambiar la estructura del JSON.

## Cuando el usuario pide cambiar las plantillas o los prompts

- Cada campo vive en tres sitios que deben coincidir: `construccion/<vertical>.mjs` (plantilla), `verticales/<vertical>/prompt.md` (bloques JSON) y `verticales/<vertical>/ejemplo.json`.
- Tras cualquier cambio: `npm run plantillas` y `npm test`. La prueba compara las claves del prompt con las del ejemplo y rellena la plantilla buscando avisos.
- Para revisar el aspecto: `powershell -File construccion/a-pdf.ps1 informes/ejemplo-<vertical>.docx` y después `construccion/pdf-a-png.ps1` para ver las páginas.
- `motor/rellenar.mjs` no debe tener dependencias: tiene que funcionar subido suelto a un chat.
- Los `ejemplo.json` son ficticios a propósito: no poner datos de empresas reales ahí.

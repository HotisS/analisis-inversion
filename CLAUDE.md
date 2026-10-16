# Instrucciones para Claude Code en este repo

Este repo produce informes Word de análisis de inversión en tres verticales: empresa cotizada, ETF e industria/sector. El README explica la arquitectura.

## Dos tipos de análisis de empresa (14-oct-2026)

- **Análisis value** (el de siempre): informe Word de 28 secciones con DCF, calidad (ROIC − WACC) y objetivo a 12 meses por PER. Vive en `verticales/empresa/`, `informes/`, `cola.md` y `/analiza-empresa`. Todo lo que este archivo dice de «empresa», «informe», «cola» o «cartera» sin más se refiere a value.
- **Análisis growth**: crecimiento muy alto, tecnología nueva y cambio de tendencia en la percepción, aunque la empresa aún no gane dinero. Método y plantilla en `verticales/growth/`, cálculo en `motor/growth.mjs`, informes en `informes-growth/` (resumen en `informes-growth/resumen.md`), cola en `cola-growth.md` y procedimiento en `/analiza-growth`. No usa los requisitos value (ROIC − WACC, PER): tiene su puntuación, sus señales y su regla de compra.

**Antes de nada: `git pull`, y lee `METODO-VIGENTE.md` (qué versión del método decide hoy, las reglas exactas, los filtros y el registro de descubrimientos; se actualiza con cada cambio), `MEMORIA.md` (reglas del usuario) y `cola.md` (qué queda pendiente).** El repo de GitHub es la única fuente: cada cambio, commit y push. En la nube de Claude, las herramientas de Node que salen a internet van con `NODE_USE_ENV_PROXY=1 node …`.

## Empresa cotizada (análisis value): usa `/analiza-empresa`

Para empresas, el procedimiento está en `.claude/commands/analiza-empresa.md` (con `verticales/empresa/lecciones.md` y las herramientas de `herramientas/`: descargas, datos de bolsa, extracto del prompt por subagente; y `motor/integrar.mjs` para juntar las notas) (también si el usuario lo pide con otras palabras: «analiza Viscofan»). Las cuentas se sacan primero del XBRL del regulador con `herramientas/cuentas.mjs` (SEC y ESEF; Japón y Suiza no) y el precio es el último cierre (`herramientas/precios.mjs`; con uno de más de dos sesiones el motor avisa y no se cierra un Comprar). Es un análisis largo, de 30-60 minutos, en dos pasos de código: `motor/calcular-empresa.mjs` hace todas las cuentas (DCF, comparables, indicadores, controles) y `motor/rellenar.mjs` genera el Word. Las secciones sin información tras tres búsquedas no se imprimen y se avisan (protocolo de huecos del prompt).

## Mantener el repo ligero (14-oct-2026: cada sesión gastaba demasiados tokens)

Lo que se lee al empezar (`CLAUDE.md`, `MEMORIA.md`, `cola.md`) y en cada análisis (`verticales/empresa/lecciones.md`, que leen también los cinco subagentes) tiene que ser corto y estar al día. **Al cerrar una tarea, antes del último commit:**
- `cola.md`: quita lo terminado (el histórico va a `archivo/`, si merece guardarse; si no, ya está en git).
- `MEMORIA.md`: solo reglas y decisiones vigentes; si una decisión nueva sustituye a otra, **reemplázala** en vez de añadir debajo (una cartera nueva sustituye a la anterior). El registro antiguo, en `archivo/`.
- `lecciones.md`: una lección nueva solo si es general y no está ya; las de un país van a `lecciones-paises.md` y las de un sector o caso contable a `lecciones-casos.md`. Si una herramienta se arregla, borra la lección que avisaba del fallo.
- **Cambios importantes** (método, reglas, una cartera que sustituye a otra, estructura del repo o del flujo, lo que se retira de estos archivos): una entrada corta en `archivo/HISTORICO.md`, la más reciente arriba. Es la memoria histórica: **no se lee en el día a día**, solo cuando el usuario pide revisar cambios pasados o hace falta saber por qué se decidió algo.
- No leas `archivo/`, los `diario.md` de otros informes ni el código de `motor/` salvo que haga falta para la tarea.

Si el usuario pide «limpieza», repasa estos archivos con ese criterio.

## Dos conceptos que no hay que confundir (13-oct-2026)

1. **Metodología del informe**: la del DCF. La «nueva», desde el 10-oct, lleva la prueba de **sostenibilidad del crecimiento** (`dcf.sostenibilidad`). Si la prueba falla, se rebaja el caso base. La columna «Metodología» de la hoja «Detalle» de `seguimiento.xlsx` dice qué informes la tienen. Para pasar uno viejo: actualización rápida con `notas/actualizacion-vN.mjs` (sin investigación nueva).
2. **Rentabilidad a 12 meses (regla v3 con tope ×1,1 desde el 14-oct por la tarde; v2 solo en 10 informes sin historia útil y donde la elige el selector)**: BPA propio × PER propio con una **regla de múltiplos común** que aplica el código (`verticales/empresa/objetivo-12m.md`, `motor/objetivo12m.mjs`); vive en `valoracion.objetivo_12m` de cada informe, **manda en la recomendación** y el resultado va a `verticales/empresa/objetivo12m-revisados.json` y a las columnas «… 12 m» del Excel. Ordena compras y cartera; el valor intrínseco del informe es el «valor real».

**Pruebas de robustez obligatorias** (14-oct-2026) antes de dar una señal o proponer una orden: `node herramientas/robustez.mjs <carpeta>` (value) y `robustez-growth.mjs` (growth); qué mide cada prueba y cómo se trata, en `verticales/empresa/robustez.md`. Se comunica la «acción robusta» con las objeciones más fuertes y su respuesta.

Para rehacer el Word de informes hechos con el motor vigente (sin investigar de nuevo): `node herramientas/regenerar.mjs <carpeta…>`. Todo análisis nuevo cumple la lista «Análisis terminado» de `.claude/commands/analiza-empresa.md`; los encargos de subagentes para actualizar informes ya hechos están en `verticales/empresa/encargos/`, y la revisión a 12 meses se apunta con `herramientas/apuntar-12m.mjs`.

**Si pide la cartera**, aplica las «Preferencias de cartera» de `MEMORIA.md` (mínimo 1.000 EUR por posición, rentabilidad + valor real + calidad, motivo de negocio de cada operación).

**Lo que se decida en otro sitio (chat de claude.ai, Cowork, otro equipo) no existe hasta que está en el repo**: si el usuario cita un método, una revisión o una cartera que no está en el repo, pídele el texto o reconstrúyelo, y déjalo escrito aquí (método en `verticales/`, decisión en `MEMORIA.md`) antes de aplicarlo.

## Buscar candidatas: usa `/escanea-mercado`

Para buscar qué analizar («busca oportunidades», «escanea Europa», «qué nichos de agua hay»), el procedimiento está en `.claude/commands/escanea-mercado.md`: `herramientas/escaner.mjs` filtra todas las cotizadas de las tres regiones con los perfiles editables de `escaner/perfiles.json` y deja un Excel en `escaneos/`. Es código, sin coste de API; las candidatas se proponen al usuario y no se lanzan análisis sin su visto bueno.

## Escáner diario de señales (14-oct-2026)

De lunes a viernes a las 9:25 y 15:45 de Madrid una tarea programada (más un informe semanal el domingo y un backtest mensual: rutinas en `escaner/README.md`) lanza `herramientas/escaner-diario.mjs`: precio de ahora de todas las analizadas, robustez con el objetivo fijo y reglas de cartera; las candidatas pasan un «Vup» (lo publicado después del informe + método vigente + robustez) antes de ser señal de compra o venta, y todo queda en el registro de señales con su seguimiento frente al índice (las salidas llevan datos de la cuenta: van a `/mnt/project-files/cartera/real/escaner/`, nunca al repo). Procedimiento: `escaner/README.md`. La cartera que lee está en la carpeta privada, `/mnt/project-files/cartera/real/escaner-cartera.json` (la mantiene el hilo value; plantilla sin datos en `escaner/cartera.ejemplo.json`). **Ningún dato real de la cartera (títulos, precio medio, liquidez, cuentas, ganancias) va al repo**: tablas de órdenes y carteras, en `/mnt/project-files/cartera/`.

## Cobertura y grandes índices (15-oct-2026)

Ninguna empresa con calidad se pierde: `herramientas/cobertura.mjs` (inventario `escaner/cobertura.json`) comprueba que cada una tiene fecha de resultados, noticias, expediente, escáner y fila en el Excel, y marca lo caducado (6 meses) y los resultados sin revisar; `herramientas/indices.mjs` sigue altas y bajas de 21 grandes índices occidentales y asiáticos y los huecos con calidad que no tenemos analizados, y `herramientas/salidas-bolsa.mjs` las salidas a bolsa y escisiones grandes. Procedimiento en `escaner/README.md`. Tras un análisis nuevo: `node herramientas/cobertura.mjs` (y `--arreglar` para su fecha de resultados).

## Cartera real (14-oct-2026)

Seguimiento de la cartera de verdad (posiciones, precio medio, rentabilidad frente al índice mundial, lo previsto frente a lo real, avisos): `herramientas/cartera-real.mjs`, método en `verticales/cartera/metodo.md`. Lee del conector de IBKR (solo lectura, nunca órdenes). **Los datos de la cartera no van al repo, que es público**: viven en `/mnt/project-files/cartera/real/`. El informe del domingo es `--semanal`.

## ETF y sector

**Sector, desde el 14-oct-2026: ficha corta primero.** Antes de analizar la primera empresa de un sector sin ficha (o cuando una tanda trae dos o más del mismo sector), se hace `verticales/sector/ficha.md` (6 campos, 15-20 minutos, queda en `sectores/`) y los informes value reutilizan su perímetro, su `mercado_final` y sus comparables. El informe Word de 18 campos de abajo solo si el usuario lo pide expresamente.

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

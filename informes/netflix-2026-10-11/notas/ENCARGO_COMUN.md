# Encargo común a los subagentes A-E (Netflix, corte 2026-10-11)

Repo: C:\Users\husoe\OneDrive\Escritorio\IUSPI\Proyecto INV\analisis-inversion
Desde Bash: `cd "/c/Users/husoe/OneDrive/Escritorio/IUSPI/Proyecto INV/analisis-inversion"`.
Carpeta de trabajo: informes/netflix-2026-10-11/notas/ (documentos en notas/docs/, con prefijo de tu letra: A_..., B_..., ...)
Temporales: %TEMP%\analisis-inversion\nflx<letra>. Nada de usar y tirar dentro del repo.

## REGLA ESTRICTA DE CARPETAS (no se negocia)
Trabaja SOLO dentro de `informes/netflix-2026-10-11/` (escritura) y del resto del repo (solo lectura: herramientas/, verticales/), y en %TEMP%. Prohibido entrar en carpetas por encima de `analisis-inversion` (es un OneDrive: ni buscar, ni leer, ni listar, ni Glob/Grep por encima). No toques otros informes, el código del repo, `cola.md`, `MEMORIA.md`, `lecciones.md` ni `seguimiento.xlsx`. Sin git add/commit/push. Hay otros análisis corriendo a la vez (Puig, SAP, Grifols, Hermès): no los toques.
No abras ni cierres procesos de Word. NUNCA descargues con el navegador integrado: todo documento se baja con `node herramientas/descargar.mjs` (con `TIEMPO_DESCARGA=180` si un PDF grande se agota).
**Nunca pongas datos personales (correo, nombre del usuario) en ninguna consulta externa, URL ni cabecera** (para EDGAR, `descargar.mjs` ya lleva un User-Agent de aplicación; no uses `curl` a mano contra sec.gov).
No llames a ninguna herramienta `mcp__hearthbot__*`. Reddit está bloqueado: no lo intentes.

## Antes de nada
1. `node herramientas/prompt-de.mjs <tu letra>` (tu parte del prompt, con las claves JSON exactas). NO leas el prompt entero.
2. Lee `verticales/empresa/lecciones.md` (corto).
3. Descarga con: `node herramientas/descargar.mjs --dir informes/netflix-2026-10-11/notas/docs nombre url [nombre url ...]` (deja .txt y .tabla.txt al lado; busca con `grep -n`).

## Empresa
- **Netflix, Inc.** Nasdaq: **NFLX**. CIK 0001065280. ISIN **US64110L1061**. Sede: Los Gatos (California). Índice: S&P 500 / NASDAQ-100.
- **Cuentas en USD** (millones), US GAAP, ejercicio natural (31-dic): periodos `"2016"` … `"2025"`; trimestres `"3T24"` … `"2T26"`. `tipo_cambio` 1.
- **Desdoblamiento 10 por 1 en noviembre de 2025**: todas las cifras por acción (BPA, precios, acciones) **ajustadas al desdoblamiento** (los 10-K posteriores ya las reexpresan; para años antiguos, divide entre 10 el BPA y multiplica las acciones por 10, y dilo).
- Último informe antes del corte: **10-Q del 2T26 (17-jul-2026)** y carta a los accionistas del 16-jul-2026 (ya descargada: `notas/docs/comun_carta_2T26.txt`). Informe anual: **10-K de 2025 (23-ene-2026)**. Lista de presentaciones: `notas/docs/comun_submissions.json`. Series XBRL: `https://data.sec.gov/api/xbrl/companyfacts/CIK0001065280.json`. Documentos en EDGAR: `https://www.sec.gov/Archives/edgar/data/1065280/<acceso sin guiones>/<documento>` (por ejemplo, 10-K 2025: 000106528026000034/nflx-20251231.htm; 10-Q 2T26: 000106528026000212/nflx-20260630.htm; 10-Q 1T26: 000106528026000138/nflx-20260331.htm; proxy 2026: 000119312526159286/d20613ddef14a.htm).
- **Resultados del 3T26: aún no publicados a la fecha de corte** (Netflix suele publicarlos a mediados de octubre; D confirma la fecha exacta). Nada publicado después del 11-oct-2026.
- Precio de cierre del **viernes 9-oct-2026: 70,30 USD** (el corte cae en domingo); máximo de 52 semanas 124,86 (21-oct-2025), mínimo 65,08 (17-jul-2026); −42,4 % en un año. Datos de bolsa ya calculados en `notas/bolsa.json` (no lo rehagas).
- Guía 2026 (carta 2T26): ingresos de 51.000-51.400 M (+13-14 %), margen operativo del 31,5 % (29,5 % en 2025), ingresos publicitarios ≈3.000 M (el doble); 3T26: +12 % y margen del 33,2 %; amortización de contenidos +≈10 % en 2026.
- **Hechos clave del año**: acuerdo para comprar los estudios y HBO Max de Warner Bros. Discovery (8-K del 5-dic-2025, financiación puente del 22-dic-2025), puja hostil de Paramount Skydance, **terminación del acuerdo** (8-K del 27-feb-2026, punto 1.02: comisión de ruptura cobrada; compruébalo y di dónde se contabilizó), emisión de bonos en julio de 2026 (424B5 del 21-jul-2026), cambio de directivos (8-K del 30-jul-2026, punto 5.02), desdoblamiento (oct-nov 2025), copresidentes ejecutivos Sarandos y Peters, Reed Hastings presidente.
- **LA CLAVE CONTABLE: los contenidos.** Los pagos de caja por contenidos (additions to content assets / payments for content assets, dentro del flujo operativo) son el «capex» real; la amortización de contenidos va en el coste de ventas. **Criterio del informe**: `ebitda` = beneficio operativo + amortización y depreciación **de inmovilizado material e intangibles distintos de los contenidos** (la amortización de contenidos se queda como gasto operativo, igual que la tratan Disney, WBD o Paramount en su EBITDA); `capex` en `flujos.historico` = solo inmovilizado material (purchases of property and equipment), porque el flujo operativo ya resta los pagos de contenidos. A debe dar, además, año a año, **pagos de caja por contenidos, amortización de contenidos y su ratio** (y la de producción propia frente a licencias si se publica), en un objeto `extra.contenidos` de `flujos`. D debe usar **el mismo criterio de EBITDA** en los comparables (avisa si el proveedor suma la amortización de contenidos: algunos lo hacen y el EBITDA de Netflix sale al doble).
- Competidores y comparables (B y D): Disney, Warner Bros. Discovery, Paramount Skydance, Comcast (Peacock), Amazon (Prime Video), Alphabet (YouTube), Spotify, Roku, Fox, TKO; elige con criterio.

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Toda cifra se copia del documento original abierto y leído. WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL, o descarga con descargar.mjs y usa grep.
1. Nunca inventes una cifra. Tras **tres intentos distintos** sin éxito: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}. En `huecos` solo datos que faltan tras tres intentos, nunca notas de trabajo.
2. Unidades: magnitudes en **millones** de USD; BPA y DPA en dólares; acciones en millones. Porcentajes en puntos. Números como números. Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas|Foros y redes","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita con [n] (números locales). Cita el documento concreto.
4. **Guardar por partes (CRÍTICO).** Escribe tu `notas/<letra>.json` en los **primeros 5 minutos** y reescríbelo **después de cada campo que termines, como mínimo cada 10 minutos**. JSON válido, **UTF-8 sin BOM** (herramienta Write o Node `fs.writeFileSync`). Claves de primer nivel del prompt + `fuentes` + `huecos`. Al terminar, añade `"_estado": {"terminado": "HH:MM", "resumen": "tus diez líneas"}`.
5. **Solo hechos** con su fuente. Los textos de juicio los redacta el analista principal: déjalos factuales y vuelca hechos útiles en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]). Nada de «subagente», comillas invertidas, «calc.» ni «BORRADOR» en los textos.
6. Solo fuentes gratuitas. No resuelvas captchas ni comprobaciones antibot.
7. **Búsquedas web: el límite es compartido entre muchos subagentes de cinco análisis y se agota pronto.** Primero documentos oficiales (EDGAR, web de inversores ir.netflix.net); búsquedas solo para gobierno, rating, prensa y lo que no tenga otra vía. Scripts propios con Write, en `.mjs` (el repo es "type": "module"), fuera del repo (en %TEMP%) salvo que sean de la nota.
8. Presupuesto: unos 20-25 minutos y unas 80 llamadas (E: 10 minutos y 40). Prioriza por impacto; al límite, cierra con lo que tengas y registra huecos.

## Al terminar
Devuelve un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro. Y aparte, 3 líneas sobre fallos o fricciones de las herramientas del repo.

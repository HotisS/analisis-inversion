# Encargo común a los subagentes A-E (SAP, corte 2026-10-11)

Repo: C:\Users\husoe\OneDrive\Escritorio\IUSPI\Proyecto INV\analisis-inversion
Carpeta de trabajo: informes/sap-2026-10-11/notas/ (documentos en notas/docs/, con prefijo de tu letra: A_..., B_..., ...)
Temporales: %TEMP%\analisis-inversion\sap<letra>. Nada de usar y tirar dentro del repo.

## REGLA ESTRICTA DE CARPETAS (no se negocia)
Trabaja SOLO dentro de `informes/sap-2026-10-11/` (escritura) y del resto del repo (solo lectura: herramientas/, verticales/), y en %TEMP%. Prohibido entrar en carpetas por encima de `analisis-inversion` (ni buscar, ni leer, ni listar): es un OneDrive corporativo. No toques otros informes, ni el código del repo, ni `seguimiento.xlsx`, `cola.md`, `MEMORIA.md`, `lecciones.md`. Sin git add/commit/push. Hay otros análisis corriendo a la vez en el mismo repo (Puig, Grifols, Netflix, Hermès): no los toques.
No abras ni cierres procesos de Word. NUNCA descargues con el navegador integrado: todo documento se baja con `node herramientas/descargar.mjs` (con `TIEMPO_DESCARGA=180` si un PDF grande se agota).
**Nunca pongas datos personales (correo, nombre del usuario) en ninguna consulta externa, URL ni cabecera** (para EDGAR, `descargar.mjs` ya lleva un User-Agent de aplicación; no uses `curl` a mano contra sec.gov).
No llames a ninguna herramienta `mcp__hearthbot__*`. Reddit está bloqueado para WebFetch: no lo intentes.

## Antes de nada
1. `node herramientas/prompt-de.mjs <tu letra>` (tu parte del prompt, con las claves JSON exactas). NO leas el prompt entero.
2. Lee `verticales/empresa/lecciones.md` (corto).
3. Descarga con: `node herramientas/descargar.mjs --dir informes/sap-2026-10-11/notas/docs nombre url [nombre url ...]` (deja .txt y .tabla.txt al lado; busca con `grep -n`; en tablas de estados financieros, mira primero el `.tabla.txt`).

## Empresa
- **SAP SE**. Xetra: **SAP** (Yahoo `SAP.DE`). ISIN **DE0007164600**. ADR en NYSE (SAP), por eso presenta **20-F y 6-K en EDGAR**: CIK **0001000184**. Sede: Walldorf (Alemania). Índices: DAX, Euro Stoxx 50.
- **Cuentas en EUR** (millones), **NIIF** (IFRS-IASB y UE); `tipo_cambio` 1. Ejercicio = año natural (diciembre). Cuenta de resultados **por función** (coste de ventas, I+D, ventas y marketing, generales y administración).
- Último anual: **20-F / Integrated Report 2025** (20-F presentado 2026-02-26; accession 0001104659-26-020058, `sap-20251231x20f.htm`). Último trimestral: **2T26 / informe semestral, 23-jul-2026** (6-K del 2026-07-28, accession 0001104659-26-087251). 1T26: 23-abr-2026 (6-K 2026-04-28 / 04-21). **Financial Analyst Conference (día del inversor): 13-may-2026** (objetivos a medio plazo). Próximos resultados: **3T26 el 21-oct-2026** (calendario de SAP, `notas/docs/comun_calendario.txt`). Lista de presentaciones EDGAR ya descargada: `notas/docs/comun_submissions.json.json`. Series XBRL: `https://data.sec.gov/api/xbrl/companyfacts/CIK0001000184.json` (etiquetas ifrs-full).
- Puntos clave: transición a la nube (Cloud ERP Suite, RISE with SAP, backlog de nube «current cloud backlog»), cifras no NIIF (operating profit no-IFRS excluye pagos en acciones y reestructuración: la guía y el consenso suelen ser no-IFRS → `base_ebitda`), reestructuración 2024 (≈3.000 M), pagos en acciones altos, recompras (programa de 5.000 M), IA (Business AI, Joule) y el debate de si los agentes de IA erosionan el software de aplicaciones, aranceles/divisa USD, investigación de prácticas de compras públicas (DOJ, ya resuelta en 2024) y la investigación de la Comisión Europea sobre el soporte/mantenimiento de ERP. Fin del soporte de ECC en 2027.
- Competidores (B y D): Oracle, Microsoft (Dynamics), Salesforce, Workday, ServiceNow, Infor (no cotiza), Dassault Systèmes, Intuit, Adobe, Datadog/Snowflake no; también Sage, Unit4.
- Fecha de corte: **2026-10-11 (domingo)**: precio de cierre del **viernes 9-oct-2026**. Nada publicado después.

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Toda cifra se copia del documento original abierto y leído. WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL, o descarga con descargar.mjs y usa grep.
1. Nunca inventes una cifra. Tras **tres intentos distintos** sin éxito: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}. En `huecos` solo datos que faltan tras tres intentos, nunca notas de trabajo.
2. Unidades: magnitudes en **millones de EUR**; BPA y DPA en EUR; acciones en millones. Porcentajes en puntos. Números como números. Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas|Foros y redes","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita con [n] (números locales). Cita el documento concreto.
4. **Guardar por partes (CRÍTICO).** Escribe tu `notas/<letra>.json` en los **primeros 5 minutos** y reescríbelo **después de cada campo que termines, como mínimo cada 10 minutos**. JSON válido, **UTF-8 sin BOM** (herramienta Write o Node `fs.writeFileSync`). Claves de primer nivel del prompt + `fuentes` + `huecos`. Al terminar, añade `"_estado": {"terminado": "HH:MM", "resumen": "tus diez líneas"}`.
5. **Solo hechos** con su fuente. Los textos de juicio los redacta el analista principal: déjalos factuales y vuelca hechos útiles en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]). Nada de «subagente», comillas invertidas, «calc.» ni «BORRADOR» en los textos.
6. Solo fuentes gratuitas. No resuelvas captchas ni comprobaciones antibot.
7. **Búsquedas web: el límite es compartido entre muchos subagentes de cinco análisis y se agota pronto.** Primero documentos oficiales (web de SAP, EDGAR, Bundesanzeiger/BaFin); búsquedas solo para gobierno, rating, prensa y lo que no tenga otra vía. Scripts propios con Write, en `.mjs`.
8. Presupuesto: unos 20-25 minutos y unas 80 llamadas (E: 10 minutos y 40 llamadas). Prioriza por impacto; al límite, cierra con lo que tengas y registra huecos.

## Al terminar
Devuelve un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro. Y aparte, 3 líneas sobre fallos o fricciones de las herramientas del repo.

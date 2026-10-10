# Encargo común a los subagentes A-D (Intuit, corte 2026-10-10)

Repo: C:\Users\husoe\OneDrive\Escritorio\IUSPI\Proyecto INV\analisis-inversion
Carpeta de trabajo: informes/intuit-2026-10-10/notas/ (documentos en notas/docs/, con prefijo de tu letra: A_..., B_..., ...)
Temporales: %TEMP%\analisis-inversion\intu<letra>. Nada de usar y tirar dentro del repo.

## REGLA ESTRICTA DE CARPETAS (no se negocia)
Trabaja SOLO dentro de `informes/intuit-2026-10-10/` (escritura) y del resto del repo (solo lectura: herramientas/, verticales/), y en %TEMP%. Prohibido entrar en carpetas por encima de `analisis-inversion` (ni buscar, ni leer, ni listar). No toques otros informes ni el código del repo ni `seguimiento.xlsx`. Sin commits. Hay otros análisis corriendo a la vez (Dunelm (informes/dunelm-2026-10-10/), Nemetschek (informes/nemetschek-2026-10-10/), Uber (informes/uber-2026-10-10/)): no los toques.
No abras ni cierres procesos de Word. NUNCA descargues con el navegador integrado: todo documento se baja con `node herramientas/descargar.mjs` (con `TIEMPO_DESCARGA=180` si un PDF grande se agota).
**Nunca pongas datos personales (correo, nombre del usuario) en ninguna consulta externa, URL ni cabecera** (para EDGAR, `descargar.mjs` ya lleva un User-Agent de aplicación; no uses `curl` a mano contra sec.gov).
No llames a ninguna herramienta `mcp__hearthbot__*`. Reddit está bloqueado: no lo intentes.

## Antes de nada
1. `node herramientas/prompt-de.mjs <tu letra>` (tu parte del prompt, con las claves JSON exactas). NO leas el prompt entero.
2. Lee `verticales/empresa/lecciones.md` (corto).
3. Descarga con: `node herramientas/descargar.mjs --dir informes/intuit-2026-10-10/notas/docs nombre url [nombre url ...]` (deja .txt y .tabla.txt al lado; busca con `grep -n`; en tablas de estados financieros, mira primero el `.tabla.txt`).

## Empresa
- **Intuit Inc.** NASDAQ: **INTU**. CIK 0000896878. ISIN **US4612021034**. Sede: Mountain View (California). Índice: S&P 500 / NASDAQ-100.
- **Cuentas en USD** (millones), US GAAP; `tipo_cambio` 1.
- Ejercicio cerrado el **31 de julio**; la empresa lo nombra por el año en que termina: `"FY2017"` … `"FY2026"`, `meta.cierre_ejercicio_mes` 7, `meta.etiqueta_ejercicio` "fin"; trimestres `"4T26"` = may-jul 2026. En `bolsa.mjs`: `--cierre-mes 7 --etiqueta fin`. **Estacionalidad fuerte** (TurboTax en el 3T fiscal).
- Último informe antes del corte: **10-K de FY2026 (presentado el 9-sep-2026)** y resultados del 25-ago-2026 (8-K). Próximos: 1T FY27 a finales de noviembre de 2026 (D confirma). Lista de presentaciones en `notas/docs/comun_submissions.json` (ya descargada); series en `https://data.sec.gov/api/xbrl/companyfacts/CIK0000896878.json`.
- Puntos clave: segmentos (Global Business Solutions —QuickBooks, Mailchimp—, Consumer —TurboTax—, Credit Karma, ProTax), pagos en acciones altos (US GAAP: dentro del EBITDA; el consenso los excluye: `base_ebitda`), compras grandes (Credit Karma, Mailchimp), el debate de la IA (agentes que hacen la declaración de impuestos o la contabilidad; el programa gratuito del IRS Direct File) y la caída de la acción (−56 % desde máximos según el escáner).
- Competidores (B y D): H&R Block, Xero, Sage, Block (Square), Bill.com, Shopify, Toast, Paycom, Freshworks, NerdWallet.
- Fecha de corte: **2026-10-10 (sábado)**: precio de cierre del **viernes 9-oct-2026**. Nada publicado después.

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Toda cifra se copia del documento original abierto y leído. WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL, o descarga con descargar.mjs y usa grep.
1. Nunca inventes una cifra. Tras **tres intentos distintos** sin éxito: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}. En `huecos` solo datos que faltan tras tres intentos, nunca notas de trabajo («pendiente de revisar» no vale).
2. Unidades: magnitudes en **millones** de la divisa de las cuentas; BPA y DPA en unidades (no peniques ni céntimos); acciones en millones. Porcentajes en puntos. Números como números. Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas|Foros y redes","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita con [n] (números locales). Cita el documento concreto.
4. **Guardar por partes (CRÍTICO).** Escribe tu `notas/<letra>.json` en los **primeros 5 minutos** y reescríbelo **después de cada campo que termines, como mínimo cada 10 minutos**. JSON válido, **UTF-8 sin BOM** (herramienta Write o Node `fs.writeFileSync`). Claves de primer nivel del prompt + `fuentes` + `huecos`. Al terminar, añade `"_estado": {"terminado": "HH:MM", "resumen": "tus diez líneas"}`.
5. **Solo hechos** con su fuente. Los textos de juicio los redacta el analista principal: déjalos factuales y vuelca hechos útiles en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]). Nada de «subagente», comillas invertidas, «calc.» ni «BORRADOR» en los textos.
6. Solo fuentes gratuitas. No resuelvas captchas ni comprobaciones antibot.
7. **Búsquedas web: el límite es compartido entre doce subagentes de tres análisis y se agota pronto.** Primero documentos oficiales (web de la empresa, EDGAR, RNS en Investegate, registro del país); búsquedas solo para gobierno, rating, prensa y lo que no tenga otra vía. Scripts propios con Write, en `.mjs`.
8. Presupuesto: unos 20-25 minutos y unas 80 llamadas. Prioriza por impacto; al límite, cierra con lo que tengas y registra huecos.

## Al terminar
Devuelve un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro. Y aparte, 3 líneas sobre fallos o fricciones de las herramientas del repo.

# Encargo común a los subagentes A-E (Paychex, corte 2026-10-12)

Repo: C:\Users\husoe\OneDrive\Escritorio\IUSPI\Proyecto INV\analisis-inversion
Carpeta de trabajo: informes/paychex-2026-10-12/notas/ (documentos en notas/docs/, con prefijo de tu letra: A_..., B_..., ...)
Temporales: %TEMP%\analisis-inversion\payx<letra>. Nada de usar y tirar dentro del repo.

## REGLA ESTRICTA DE CARPETAS (no se negocia)
Trabaja SOLO dentro de `informes/paychex-2026-10-12/` (escritura) y del resto del repo (solo lectura: herramientas/, verticales/, y `informes/intuit-2026-10-10/` como referencia de comparables), y en %TEMP%. Prohibido entrar en carpetas por encima de `analisis-inversion` en ese OneDrive (ni buscar, ni leer, ni listar, ni Glob/Grep). No toques otros informes ni el código del repo ni `seguimiento.xlsx`. Sin commits. Hay otros análisis corriendo a la vez: no toques sus carpetas.
No abras ni cierres procesos de Word. NUNCA descargues con el navegador integrado: todo documento se baja con `node herramientas/descargar.mjs` (con `TIEMPO_DESCARGA=180` si un PDF grande se agota). **Nombres de descarga sin extensión** (`descargar.mjs` la añade y la duplicaría).
**Nunca pongas datos personales del usuario (correo, nombre) en ninguna consulta externa, URL, cabecera ni User-Agent.** Para EDGAR usa `descargar.mjs`, que ya lleva su User-Agent de aplicación; nada de `curl` a mano contra sec.gov.
No llames a ninguna herramienta `mcp__hearthbot__*`. Reddit está bloqueado: no lo intentes.

## Antes de nada
1. `node herramientas/prompt-de.mjs <tu letra>` (tu parte del prompt, con las claves JSON exactas; imprime también las lecciones, ~57 KB: léelo por partes). NO leas el prompt entero.
2. Lee `verticales/empresa/lecciones.md` si `prompt-de` no te lo ha mostrado entero.
3. Descarga con: `node herramientas/descargar.mjs --dir informes/paychex-2026-10-12/notas/docs nombre url [nombre url ...]` (deja .txt y .tabla.txt al lado; busca con `grep -n`).

## Empresa
- **Paychex, Inc.** NASDAQ: **PAYX**. CIK **0000723531**. ISIN **US7043261079**. Sede: Rochester (Nueva York). Índice: S&P 500 / NASDAQ-100.
- **Cuentas en USD** (millones), **US GAAP**; `tipo_cambio` 1; cotiza en USD.
- Ejercicio cerrado el **31 de mayo**; la empresa lo nombra por el año en que termina: `"FY2017"` … `"FY2026"` (FY2026 = jun-2025 a may-2026). `meta.cierre_ejercicio_mes` 5, `meta.etiqueta_ejercicio` "fin". Trimestres: `"1T27"` = jun-ago 2026 (el último publicado), `"4T26"` = mar-may 2026, etc. En `bolsa.mjs`: `--cierre-mes 5 --etiqueta fin`.
- Último informe antes del corte: **10-Q del 1T FY2027 (trimestre cerrado el 31-ago-2026, presentado el 24-sep-2026)** y nota de resultados del 23-sep-2026 (8-K, ya descargada: `notas/docs/A_8k_1T27_nota.txt`). 10-K de FY2026 presentado el 17-jul-2026 (`payx-20260531.htm`, accession 0001193125-26-307785). Proxy DEF 14A del 4-sep-2026 (junta el 15-oct-2026, después del corte). Lista de presentaciones en `notas/docs/comun_submissions.json` (ya descargada); series en `https://data.sec.gov/api/xbrl/companyfacts/CIK0000723531.json`. URL de un documento: `https://www.sec.gov/Archives/edgar/data/723531/<accession sin guiones>/<documento>`; el índice del filing en `.../index.json`.
- Guía FY2027 (23-sep-2026): ingresos +5-6 %; Management Solutions +5-6 %; PEO e Insurance +7-8 %; intereses de fondos de clientes 200-210 M USD; margen operativo ajustado ~44 %; tipo ~24 %; BPA ajustado +7-9 %.
- **Puntos clave del negocio:**
  - Segmentos/líneas de ingresos: Management Solutions (nóminas, RR. HH., HCM), PEO and Insurance Solutions, e **intereses de los fondos de clientes** (interest on funds held for clients), ingresos sensibles a los tipos de interés.
  - **Fondos de clientes** (funds held for clients, más de 4.000 M USD) y la obligación simétrica (client fund obligations): **no son caja libre**. En el balance y en el puente quedan fuera de la caja y de la deuda (regla del puente: se anulan). La caja propia es «cash and cash equivalents» + «corporate investments» (y las inversiones a largo plazo corporativas, si las hay), no los fondos de clientes. Al pasar el balance histórico, `caja` = caja corporativa, y `activo_corriente`/`pasivo_corriente` déjalos como los publica pero anota en `extra` el importe de fondos de clientes y obligaciones de cada año (el analista decidirá).
  - **Compra de Paycor HCM** (cerrada en abril de 2025, ~4.100 M USD, financiada con deuda emitida en 2025): FY2025 incluye ~1-2 meses de Paycor; FY2026 el año completo. Es un cambio de perímetro: decláralo (`cambios_perimetro`) y busca las cifras pro forma u orgánicas que publique la empresa. En 2024-2025 hubo otras compras menores.
  - Remuneración en acciones dentro del EBITDA (US GAAP); el «adjusted operating income» excluye costes de adquisición y amortización de intangibles adquiridos: compruébalo en la conciliación.
- Comparables (B y D): **ADP, Paycom, Paylocity, Workday, Intuit** (ya hay informe de Intuit del 10-oct-2026 en `informes/intuit-2026-10-10/`, con su `datos.json` y `notas/D.json`: reutiliza cifras llevándolas al nuevo cierre), y además Dayforce (comprada por Thoma Bravo en 2025-26: transacción), TriNet, Insperity, Paycor (antes de la compra), Ceridian, Barrett, Automatic Data Processing, Deel/Gusto/Rippling (privadas).
- Fecha de corte: **2026-10-12 (lunes)**. Si la sesión de EE. UU. no ha cerrado al ejecutar `bolsa.mjs`, usa el cierre del viernes 9-oct-2026 y dilo (la herramienta avisa). Nada publicado después del corte.

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Toda cifra se copia del documento original abierto y leído. WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL, o descarga con descargar.mjs y usa grep.
1. Nunca inventes una cifra. Tras **tres intentos distintos** sin éxito: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}. En `huecos` solo datos que faltan tras tres intentos, nunca notas de trabajo.
2. Unidades: magnitudes en **millones** de USD; BPA y DPA en dólares; acciones en millones. Porcentajes en puntos. Números como números. Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas|Foros y redes","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita con [n] (números locales). Cita el documento concreto, no la web de inversores.
4. **Guardar por partes (CRÍTICO).** Escribe tu `notas/<letra>.json` en los **primeros 5 minutos** y reescríbelo **después de cada campo que termines, como mínimo cada 10 minutos**. JSON válido, **UTF-8 limpio sin BOM, escrito con la herramienta Write** (nunca heredocs ni `node -e` con textos largos; nada de «Ã» ni «Â»). Claves de primer nivel del prompt + `fuentes` + `huecos`. Al terminar, añade `"_estado": {"terminado": "HH:MM", "resumen": "tus diez líneas"}`.
5. **Solo hechos** con su fuente. Los textos de juicio los redacta el analista principal: déjalos factuales y vuelca hechos útiles en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]). Nada de «subagente», comillas invertidas, «calc.» ni «BORRADOR» en los textos.
6. Solo fuentes gratuitas. No resuelvas captchas ni comprobaciones antibot.
7. **Búsquedas web: el límite es compartido con otros análisis en paralelo y se agota pronto.** Primero documentos oficiales (EDGAR, web de inversores de Paychex); búsquedas solo para lo que no tenga otra vía.
8. Presupuesto: unos 20 minutos y unas 80 llamadas (E: 10 minutos y 40 llamadas). Prioriza por impacto; al límite, cierra con lo que tengas y registra huecos.

## Al terminar
Devuelve un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro. Y aparte, 3 líneas sobre fallos o fricciones de las herramientas del repo.

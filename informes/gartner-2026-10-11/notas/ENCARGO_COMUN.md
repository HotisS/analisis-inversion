# Encargo común a los subagentes A-D (Gartner, corte 2026-10-11)

Repo: C:\Users\husoe\OneDrive\Escritorio\IUSPI\Proyecto INV\analisis-inversion (en Bash: cd "/c/Users/husoe/OneDrive/Escritorio/IUSPI/Proyecto INV/analisis-inversion")
Carpeta de trabajo: informes/gartner-2026-10-11/notas/ (documentos en notas/docs/, con prefijo de tu letra: A_..., B_..., ...)
Temporales: %TEMP%\analisis-inversion\gart<letra>. Nada de usar y tirar dentro del repo.

## REGLA ESTRICTA DE CARPETAS (no se negocia)
Trabaja SOLO dentro de `informes/gartner-2026-10-11/` (escritura) y del resto del repo (solo lectura: herramientas/, verticales/), y en %TEMP%. Prohibido entrar en carpetas por encima de `analisis-inversion` (ni buscar, ni leer, ni listar, ni Glob/Grep: es un OneDrive). No toques otros informes, ni el código del repo, ni `cola.md`, `MEMORIA.md`, `lecciones.md`, `seguimiento.xlsx`, plantillas ni motor. Sin git (ni add, ni commit, ni push). No ejecutes `herramientas/seguimiento.mjs`. Hay otros análisis corriendo a la vez en el repo: no toques sus carpetas.
No abras ni cierres procesos de Word. NUNCA descargues con el navegador integrado: todo documento se baja con `node herramientas/descargar.mjs` (con `TIEMPO_DESCARGA=180` si un PDF grande se agota).
**Nunca pongas datos personales (correo, nombre del usuario) en ninguna consulta externa, URL ni cabecera / User-Agent** (para EDGAR, `descargar.mjs` ya lleva un User-Agent de aplicación; no uses `curl` a mano contra sec.gov).
No llames a ninguna herramienta `mcp__hearthbot__*`. Reddit está bloqueado: no lo intentes. No lances subagentes propios.

## Antes de nada
1. `node herramientas/prompt-de.mjs <tu letra>` (tu parte del prompt, con las claves JSON exactas). NO leas el prompt entero.
2. Lee `verticales/empresa/lecciones.md` (corto).
3. Descarga con: `node herramientas/descargar.mjs --dir informes/gartner-2026-10-11/notas/docs nombre url [nombre url ...]` (deja .txt y .tabla.txt al lado; busca con `grep -n`; en tablas de estados financieros, mira primero el `.tabla.txt` o `pdftotext -table -f N -l N`).

## Empresa
- **Gartner, Inc.** NYSE: **IT**. CIK **0000749251** (data.sec.gov: `CIK0000749251`). ISIN **US3666511072**. Sede: Stamford (Connecticut). Índice: S&P 500.
- **Cuentas en USD** (millones), US GAAP; `tipo_cambio` 1. Ejercicio natural (`"2025"`), `cierre_ejercicio_mes` 12, etiqueta "fin". Trimestres `"2T26"`.
- Series anuales en `https://data.sec.gov/api/xbrl/companyfacts/CIK0000749251.json`; presentaciones en `https://data.sec.gov/submissions/CIK0000749251.json`.
- Último informe antes del corte: **10-Q del 2T26** (resultados de finales de julio / principios de agosto de 2026; la acción cayó un 7,7 % el 30-jul-2026). Próximos: resultados del 3T26 a principios de noviembre de 2026 (D confirma la fecha).
- Segmentos: **Research** (suscripciones; Global Technology Sales y Global Business Sales), **Conferences**, **Consulting**. KPI clave: *contract value* (CV) y su crecimiento, retención de clientes y de cartera (*wallet retention*), número de clientes empresa, productividad comercial, plantilla de ventas. EBITDA ajustado de la empresa excluye pagos en acciones (≈ base_ebitda «ajustado»), costes de adquisición e integración.
- Hechos a vigilar: caída de 2025 (−47,9 %) y de 2026 (−24 % en el año; −20,9 % el 3-feb-2026 con los resultados del 4T25; −7,4 % el 8-sep-2026; mínimo de 124,25 USD el 22-jun-2026): frenazo del CV, recortes del gobierno federal de EE. UU. (DOGE), miedo a que la IA generativa sustituya la investigación de pago, recompras masivas, cambios en la dirección (comprobar). Deuda: bonos senior 2028/2029/2030 (comprobar) y línea de crédito.
- Competidores (B y D): Forrester Research (FORR), IDC (privada / Blackstone), Corporate Executive Board (comprada por Gartner en 2017), Info-Tech, McKinsey/Accenture en consultoría; comparables cotizados de información y suscripciones: Verisk, S&P Global, Moody's, MSCI, FactSet, Wolters Kluwer, RELX, Thomson Reuters, TransUnion, Equifax, Forrester, Accenture (consultoría), Informa (conferencias).
- Fecha de corte: **2026-10-11 (domingo)**: precio de cierre del **viernes 9-oct-2026, 191,15 USD** (ya en `notas/bolsa.json`, de `herramientas/bolsa.mjs`). Nada publicado después del corte.

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Toda cifra se copia del documento original abierto y leído. WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL, o descarga con descargar.mjs y usa grep.
1. Nunca inventes una cifra. Tras **tres intentos distintos** sin éxito: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}. En `huecos` solo datos que faltan tras tres intentos, nunca notas de trabajo.
2. Unidades: magnitudes en **millones de USD**; BPA y DPA en USD; acciones en millones. Porcentajes en puntos. Números como números. Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas|Foros y redes","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita con [n] (números locales). Cita el documento concreto.
4. **Guardar por partes (CRÍTICO).** Escribe tu `notas/<letra>.json` en los **primeros 5 minutos** y reescríbelo **después de cada campo que termines, como mínimo cada 10 minutos**. JSON válido, **UTF-8 sin BOM** (herramienta Write o Node `fs.writeFileSync`). Claves de primer nivel del prompt + `fuentes` + `huecos`. Al terminar, añade `"_estado": {"terminado": "HH:MM", "resumen": "tus diez líneas"}`.
5. **Solo hechos** con su fuente. Los textos de juicio los redacta el analista principal: déjalos factuales y vuelca hechos útiles en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]). Nada de «subagente», comillas invertidas, «calc.» ni «BORRADOR» en los textos.
6. Solo fuentes gratuitas. No resuelvas captchas ni comprobaciones antibot.
7. **Búsquedas web: el límite es compartido entre muchos subagentes de cuatro análisis y se agota pronto.** Primero documentos oficiales (EDGAR, web de inversores de Gartner); búsquedas solo para gobierno, rating, prensa y lo que no tenga otra vía. Scripts propios con Write, en `.mjs`.
8. Presupuesto: unos 20-25 minutos y unas 80 llamadas. Prioriza por impacto; al límite, cierra con lo que tengas y registra huecos.

## Al terminar
Devuelve un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro. Y aparte, 3 líneas sobre fallos o fricciones de las herramientas del repo.

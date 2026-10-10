# Encargo común a los subagentes A-D (Adobe, corte 2026-10-10)

Repo: C:\Users\husoe\OneDrive\Escritorio\IUSPI\Proyecto INV\analisis-inversion
Carpeta de trabajo: informes/adobe-2026-10-10/notas/ (documentos en notas/docs/, con prefijo de tu letra: A_10k_fy25, B_figma, ...)
Temporales: %TEMP%\analisis-inversion\adbe<letra>. Nada de usar y tirar dentro del repo.

## REGLA ESTRICTA DE CARPETAS (no se negocia)
Trabaja SOLO dentro de `informes/adobe-2026-10-10/` (escritura) y del resto del repo (solo lectura: herramientas/, verticales/), y en %TEMP%. Prohibido entrar en carpetas por encima de `analisis-inversion` (ni buscar, ni leer, ni listar). No toques otros informes ni el código del repo ni `seguimiento.xlsx`. Sin commits. Hay otro análisis corriendo a la vez (Games Workshop, en `informes/games-workshop-2026-10-10/`): no lo toques.
No abras ni cierres procesos de Word. NUNCA descargues con el navegador integrado: todo documento se baja con `node herramientas/descargar.mjs` (con `TIEMPO_DESCARGA=180` si un PDF grande se agota).
**Nunca pongas datos personales (correo, nombre del usuario) en ninguna consulta externa, URL ni cabecera**: para EDGAR, `descargar.mjs` ya lleva un User-Agent de aplicación; no uses `curl` a mano contra sec.gov.
No llames a ninguna herramienta `mcp__hearthbot__*`. Reddit está bloqueado: no lo intentes.

## Antes de nada
1. `node herramientas/prompt-de.mjs <tu letra>` (tu parte del prompt, con las claves JSON exactas). NO leas el prompt entero.
2. Lee `verticales/empresa/lecciones.md` (corto; ojo a las de EE. UU., EDGAR y consenso de MarketScreener).
3. Descarga con: `node herramientas/descargar.mjs --dir informes/adobe-2026-10-10/notas/docs nombre url [nombre url ...]`. Series anuales limpias en `https://data.sec.gov/api/xbrl/companyfacts/CIK0000796343.json`; lista de presentaciones en `notas/docs/comun_submissions.json` (ya descargada).

## Empresa
- **Adobe Inc.** NASDAQ: **ADBE**. CIK 0000796343. ISIN **US00724F1012**. Sede: San José (California). Índice: S&P 500 / NASDAQ-100.
- **Cuentas en USD** (millones), US GAAP. Cotiza en USD: `tipo_cambio` 1.
- Ejercicio de 52/53 semanas que cierra el viernes más cercano al 30 de noviembre (FY2025 cerró el 28-nov-2025). La empresa lo nombra por el año en que termina: `"FY2016"` … `"FY2025"`, `meta.cierre_ejercicio_mes` 11 y `meta.etiqueta_ejercicio` "fin"; estimaciones `"FY2026e"`…; trimestres `"3T26"` = jun-ago 2026. En `bolsa.mjs`: `--cierre-mes 11 --etiqueta fin` (y `--cierre-dia 28` si hace falta).
- Último informe antes del corte: **10-Q del 3T FY26 (trimestre cerrado el 28-ago-2026, presentado el 22-sep-2026)** y resultados del 10-sep-2026 (8-K). Hay 8-K del 2-sep-2026 y del 14-jul-2026: mira qué son (cambios de directivos u otros). Próximos resultados: 4T FY26 a mediados de diciembre de 2026 (D confirma).
- Fecha de corte: **2026-10-10 (sábado)**: precio de cierre del **viernes 9-oct-2026**. Nada publicado después.
- Puntos clave a cubrir: segmentos (Digital Media: Creative Cloud y Document Cloud; Digital Experience; Publishing and Advertising), ARR de Digital Media, el debate de la IA generativa (Firefly, competencia de Canva, Figma, OpenAI/Midjourney y modelos de vídeo) y si erosiona el poder de precios; pagos en acciones (US GAAP: ya en el EBITDA, el consenso los excluye: mira `base_ebitda`), recompras enormes y deuda.
- Competidores (B y D): Microsoft, Salesforce, Autodesk, Figma, Canva (privada), Intuit, ServiceNow, Dassault, Shutterstock/Getty, Wix.

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Toda cifra se copia del documento original abierto y leído. WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL, o descarga con descargar.mjs y usa grep.
1. Nunca inventes una cifra. Tras **tres intentos distintos** sin éxito: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}.
2. Unidades: magnitudes en **millones de USD**; BPA y DPA en USD; acciones en millones. Porcentajes en puntos. Números como números. Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas|Foros y redes","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita con [n] (números locales). Cita el documento concreto.
4. **Guardar por partes (CRÍTICO).** Escribe tu `notas/<letra>.json` en los **primeros 5 minutos** y reescríbelo **después de cada campo que termines, como mínimo cada 10 minutos**. JSON válido, **UTF-8 sin BOM** (herramienta Write o Node `fs.writeFileSync`). Claves de primer nivel del prompt + `fuentes` + `huecos`. Al terminar, añade `"_estado": {"terminado": "HH:MM", "resumen": "tus diez líneas"}`.
5. **Solo hechos** con su fuente. Los textos de juicio los redacta el analista principal: déjalos factuales y vuelca hechos útiles en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]). Nada de «subagente», comillas invertidas, «calc.» ni «BORRADOR» en los textos.
6. Solo fuentes gratuitas. No resuelvas captchas ni comprobaciones antibot.
7. **Búsquedas web: el límite es compartido entre ocho subagentes de dos análisis.** Primero EDGAR y la web de inversores; búsquedas solo para gobierno, rating, prensa y lo que no tenga otra vía. Scripts propios con Write, en `.mjs`.
8. Presupuesto: unos 20-25 minutos y unas 80 llamadas. Prioriza por impacto; al límite, cierra con lo que tengas y registra huecos.

## Al terminar
Devuelve un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro. Y aparte, 3 líneas sobre fallos o fricciones de las herramientas del repo.

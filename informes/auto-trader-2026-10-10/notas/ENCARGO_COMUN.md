# Encargo común a los subagentes A-E (Auto Trader Group, corte 2026-10-10)

Repo: C:\Users\husoe\OneDrive\Escritorio\IUSPI\Proyecto INV\analisis-inversion
Carpeta de trabajo: informes/auto-trader-2026-10-10/notas/ (documentos en notas/docs/, con prefijo de tu letra: A_ar2025, B_rightmove_ar, ...)
Temporales: %TEMP%\analisis-inversion\auto<letra>. Nada de usar y tirar dentro del repo.

## REGLA ESTRICTA DE CARPETAS (no se negocia)
Trabaja SOLO dentro de `informes/auto-trader-2026-10-10/` (escritura) y del resto del repo (solo lectura: herramientas/, verticales/), y en %TEMP%. Prohibido entrar en carpetas por encima de `analisis-inversion` (ni buscar, ni leer, ni listar). No toques otros informes ni el código del repo ni `seguimiento.xlsx`. Sin commits. Hay otro análisis corriendo a la vez (Constellation Software, en `informes/constellation-software-2026-10-10/`): no lo toques.
No abras ni cierres procesos de Word. NUNCA descargues con el navegador integrado: todo documento se baja con `node herramientas/descargar.mjs` (con `TIEMPO_DESCARGA=180` si un PDF grande se agota).
**Nunca pongas datos personales (correo, nombre del usuario) en ninguna consulta externa, URL ni cabecera** (tampoco en el User-Agent de la SEC: `descargar.mjs` ya lleva uno de aplicación; no uses `curl` a mano contra sec.gov).
No llames a ninguna herramienta `mcp__hearthbot__*`.

## Antes de nada
1. `node herramientas/prompt-de.mjs <tu letra>` (tu parte del prompt, con las claves JSON exactas). NO leas el prompt entero.
2. Lee `verticales/empresa/lecciones.md` (corto).
3. Descarga con: `node herramientas/descargar.mjs --dir informes/auto-trader-2026-10-10/notas/docs nombre url [nombre url ...]` (deja .txt y .tabla.txt al lado; busca con `grep -n` y lee solo las páginas que hacen falta). Tablas desordenadas: `pdftotext -table -f N -l N archivo.pdf -`. `--lista URL` lista los PDF de una página (funciona con https://plc.autotrader.co.uk/investors/).

## Empresa
- **Auto Trader Group plc**. LSE: **AUTO** (Yahoo `AUTO.L`). ISIN **GB00BVYVFW23**. Sede: Manchester. Índice: FTSE 100.
- **Cuentas en GBP** (millones de GBP), NIIF adoptadas en el Reino Unido. Cotiza en peniques en Yahoo (GBp): `meta.divisa` = GBP y precio en GBP (divide entre 100), `meta.divisa_cotizacion` = GBP, `tipo_cambio` 1.
- Ejercicio cierra el **31 de marzo**. La empresa lo nombra por el año en que **termina**: FY26 = abril 2025 - marzo 2026. Periodos: `"FY2017"` … `"FY2026"`; estimaciones `"FY2027e"`…; `meta.cierre_ejercicio_mes` 3 y `meta.etiqueta_ejercicio` **"fin"**. Publica **semestres**: `"1S26"` = abr-sep 2025 (H1 FY26), `"2S26"` = oct-25 a mar-26, `"1S27"` aún no publicado. **En `bolsa.mjs` usa `--cierre-mes 3 --etiqueta fin`** (por defecto pondría «inicio»).
- Último informe antes del corte: **resultados FY26 e informe anual 2026** (mayo-junio de 2026). Próximos: **resultados del 1S FY27**, principios de noviembre de 2026 (D confirma la fecha). Hubo junta el 16-jul-2026.
- Fecha de corte: **2026-10-10 (sábado)**: precio de cierre del **viernes 9-oct-2026**. Nada publicado después.
- Ya descargados en `notas/docs/` (léelos, no los vuelvas a bajar): `comun_ar_fy26` (informe anual 2026 completo, 147 págs.: estrategia, revisión financiera, gobierno, remuneración, cuentas y notas) y `comun_pres_fy26` (presentación a analistas FY26). Web de inversores: https://plc.autotrader.co.uk/investors/ (presentaciones de HY26 y anteriores, RNS).
- FY26 leído: ingresos del grupo 624,3 M GBP (+4 %), Autotrader 585,3 M, beneficio operativo del grupo 392,7 M (+4 %), margen ~70 % en Autotrader; ARPR 2.995 GBP/mes (+5 %); forecourts 13.942 (−0,5 %); 463,2 M devueltos a los accionistas; 58,5 M de acciones amortizadas en el año. Autorama (alquiler de coches nuevos) con pérdidas de 2,0 M. Rechazo de parte de los concesionarios a la forma de lanzar **Deal Builder**. Cambios en el consejo (una consejera, Catherine, ha pasado a ser consejera delegada en otra empresa; comprobar). Segmentos: Autotrader (Retailer, Home Trader, Other; Consumer services; Manufacturer & Agency) y Autorama.
- Competidores a mirar (B y D): Rightmove, Scout24, CarGurus, Cars.com, CAR Group (Carsales), REA Group, Adevinta (privada), eBay/Motors.co.uk, Cazoo (quebrada), Carwow (privada).

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Toda cifra se copia del documento original abierto y leído. WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL, o descarga con descargar.mjs y usa grep.
1. Nunca inventes una cifra. Tras **tres intentos distintos** sin éxito: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}. En `huecos` solo datos que faltan tras tres intentos, nunca notas de trabajo.
2. Unidades: magnitudes en **millones de GBP**; BPA y DPA en GBP (no peniques: 30,1p = 0.301); acciones en millones. Conversiones de competidores al tipo de cierre del ejercicio (contables) o de la fecha de corte (mercado), y dilo. Porcentajes en puntos. Números como números. Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas|Foros y redes","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita con [n] (números locales). Cita el PDF concreto, no la web de inversores.
4. **Guardar por partes (CRÍTICO).** Escribe tu `notas/<letra>.json` en los **primeros 5 minutos** y reescríbelo **después de cada campo que termines, como mínimo cada 10 minutos**. JSON válido, **UTF-8 sin BOM** (herramienta Write o Node `fs.writeFileSync`; nunca PowerShell Set-Content/Out-File). Claves de primer nivel del prompt + `fuentes` + `huecos`. Al terminar, añade `"_estado": {"terminado": "HH:MM", "resumen": "tus diez líneas"}`.
5. **Solo hechos** con su fuente. Los textos de juicio los redacta el analista principal: déjalos factuales y vuelca hechos útiles en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]). Nada de «subagente», comillas invertidas, «calc.» ni «BORRADOR» en los textos.
6. Solo fuentes gratuitas. No resuelvas captchas ni comprobaciones antibot.
7. **Búsquedas web: el límite es compartido entre todos (diez subagentes de dos análisis) y se agota pronto.** Primero documentos oficiales (web de la empresa, Companies House, RNS en londonstockexchange.com o Investegate, EDGAR para competidores de EE. UU.); búsquedas solo para gobierno, rating, prensa y lo que no tenga otra vía. Reino Unido: participaciones significativas y operaciones de directivos en los RNS («Holding(s) in Company», «Director/PDMR Shareholding»); posiciones cortas en la lista diaria de la FCA. Scripts propios con Write, en `.mjs`.
8. Presupuesto: unos 20-25 minutos y unas 80 llamadas (E: 10 minutos y 40 llamadas). Prioriza por impacto; al límite, cierra con lo que tengas y registra huecos.

## Al terminar
Devuelve un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro. Y aparte, 3 líneas sobre fallos o fricciones de las herramientas del repo, con el arreglo que propondrías.

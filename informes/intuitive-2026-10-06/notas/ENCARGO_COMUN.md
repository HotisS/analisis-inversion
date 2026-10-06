# Encargo común a los subagentes A-D (Intuitive Surgical, corte 2026-10-06)

Repo: C:\Users\HugoSol\OneDrive - SUMA CAPITAL SGEIC SA\Escritorio\Vela\analisis-inversion
Carpeta de trabajo: informes/intuitive-2026-10-06/notas/  (documentos descargados en notas/docs/, con prefijo de tu letra: A_10k2025, B_mdt_10k...)

Antes de nada: `node herramientas/prompt-de.mjs <tu letra>` (tu parte del prompt, con las claves JSON exactas) y `verticales/empresa/lecciones.md`. Descarga con:
`node herramientas/descargar.mjs --dir informes/intuitive-2026-10-06/notas/docs nombre url [nombre url ...]` (deja .txt al lado; busca con grep -n y lee solo lo necesario).

## Empresa
- Intuitive Surgical, Inc. Ticker ISRG (NASDAQ Global Select; S&P 500, Nasdaq-100). ISIN US46120E6023. CIK EDGAR 0001035267. Sede: Sunnyvale, California.
- Cuentas en **USD**, **US GAAP**, cuenta por función (product/service revenue, cost of revenue, SG&A, R&D). Ejercicio **natural** (cierra el 31 de diciembre). Cotiza en USD.
- Periodos: ejercicios "2016" ... "2025"; estimaciones "2026e", "2027e", "2028e". Trimestres "3T24" ... "2T26".
- Último informe publicado antes del corte: 10-Q del 2T26 (abril-junio 2026, publicado en julio de 2026). Próximos resultados (3T26): hacia el 20-22 de octubre de 2026 (confírmalo).
- Fecha de corte: 2026-10-06. No uses nada publicado después.
- Particularidades: remuneración en acciones elevada (≈ 700-800 M USD/año: revisa la base del EBITDA del consenso, casi seguro "ajustado" sin SBC); modelo de cuchilla y cartuchos (ingresos recurrentes = instrumentos y accesorios + servicio, ≈ 85 %); KPI: procedimientos da Vinci (crecimiento), base instalada, colocaciones (placements) de sistemas, da Vinci 5, Ion, procedimientos por sistema, ingresos I&A por procedimiento, % leasing/arrendamiento operativo de las colocaciones; mucha caja neta (caja + inversiones a corto y largo plazo, sin deuda financiera) y recompras.
- Competencia: Medtronic (Hugo), J&J (Ottava), CMR Surgical, fabricantes chinos (MicroPort MedBot y otros), Stryker (Mako, ortopedia), Globus, etc. China (aranceles, compra por volumen/«volume-based procurement»), aranceles de EE. UU.

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Toda cifra se copia del documento original abierto y leído (EDGAR, web de inversores). WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL o descarga con descargar.mjs y usa grep.
1. Nunca inventes una cifra. Tras **tres intentos distintos** (1: fuente primaria directa; 2: otra vía/otro documento/otro término; 3: derivarlo o fuente secundaria fiable citada) sin éxito: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}.
2. Unidades: magnitudes en **millones de USD**; precio, BPA, DPA en USD; acciones en millones. Porcentajes en puntos (12,5 % → 12.5). Números como números. Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita con [n] (tus números locales). Una entrada por documento realmente leído y usado; cita el documento concreto, no «la web de inversores».
4. **Guardar por partes**: reescribe tu `notas/<letra>.json` (JSON válido, claves de primer nivel del prompt + `fuentes` + `huecos`) DESPUÉS DE CADA CAMPO que termines (como mucho cada 10 minutos).
5. Escribe **solo hechos** con su fuente. Los textos de juicio (comentario, lectura...) los redacta el analista principal: déjalos sin escribir, pero vuelca los hechos útiles en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]).
6. No modifiques NADA fuera de informes/intuitive-2026-10-06/. Solo fuentes gratuitas. No resuelvas captchas. **No abras ni cierres Word** (el usuario lo tiene abierto).
7. Respeta las claves exactas de tu parte del prompt.

## Fuentes que funcionan
- EDGAR: índice de presentaciones https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001035267&type=10-K ; API JSON https://data.sec.gov/submissions/CIK0001035267.json y https://data.sec.gov/api/xbrl/companyfacts/CIK0001035267.json (XBRL con todas las cifras de 10-K/10-Q: muy útil para 10 años de series). User-Agent de aplicación (descargar.mjs lo pone).
- Web de inversores: https://isrg.intuitive.com (notas de prensa trimestrales con tablas de KPI, presentaciones).
- Consenso: MarketScreener; Stock Analysis (estadísticas, EV, ROIC); Investing / Yahoo para contraste.
- Yahoo chart API JSON para cotizaciones (pero D usa herramientas/bolsa.mjs).

## Al terminar
Devuelve en tu respuesta un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro. Y, aparte, 3-5 líneas sobre **fallos o fricciones de las herramientas del repo** (herramientas/*.mjs, lecciones.md) que hayas encontrado, con el arreglo que propondrías.

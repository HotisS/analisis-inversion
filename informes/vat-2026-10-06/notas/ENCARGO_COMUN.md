# Encargo común a los subagentes A-D (VAT Group, corte 2026-10-06)

Repo: C:\Users\HugoSol\OneDrive - SUMA CAPITAL SGEIC SA\Escritorio\Vela\analisis-inversion
Carpeta de trabajo: informes/vat-2026-10-06/notas/  (documentos descargados en notas/docs/, con prefijo de tu letra: A_ar2024, B_mks_10k...)

Antes de nada: `node herramientas/prompt-de.mjs <tu letra>` (tu parte del prompt, con las claves JSON exactas) y `verticales/empresa/lecciones.md`. Descarga con:
`node herramientas/descargar.mjs --dir informes/vat-2026-10-06/notas/docs nombre url [nombre url ...]` (deja .txt al lado; busca con grep -n y lee solo lo necesario). Ya descargados: `A_fs2025` (estados financieros consolidados 2025 con notas, 59 págs.) y `A_h1_2026_pres` (presentación de resultados del 1S26, 22-jul-2026). Úsalos todos.

## Empresa
- VAT Group AG. Ticker VACN (SIX Swiss Exchange; índice SMI / SPI). ISIN CH0311864901. Sede: Haag (Rheintal), cantón de San Galo, Suiza. Salida a bolsa: abril de 2016.
- Cuentas en **CHF**, **NIIF (IFRS Accounting Standards)** (comprobado en la nota de bases de preparación de 2025). Ejercicio **natural** (cierra el 31 de diciembre). Cotiza en CHF (divisa de cotización = de cuentas, tipo de cambio 1).
- Capital: 30.000.000 acciones nominativas de 0,10 CHF; algo de autocartera (resta la autocartera para las acciones en circulación).
- Información periódica: **informe anual** y **semestral** completos; el 1T y el 3T son **actualizaciones trimestrales** (pedidos, ventas y a veces margen). Último publicado antes del corte: resultados del 1S26 (22-jul-2026), que anunciaron también la **compra de Atonarp** (sensores/espectrometría; cambio de perímetro a vigilar). Próxima publicación: actualización del 3T26, hacia el 22-23 de octubre de 2026 (confírmalo).
- Periodos: ejercicios "2016" ... "2025"; estimaciones "2026e", "2027e", "2028e". Trimestres "1T24"... "2T26" (y semestres "1S24"... "1S26" si solo hay margen semestral).
- Fecha de corte: 2026-10-06. No uses nada publicado después.
- Negocio: líder mundial de válvulas de vacío (cuota declarada ≈ 70 % en válvulas de vacío para semiconductores). Segmentos: **Valves** y **Global Service** (antes había «Industry»; usa la segmentación vigente y lo reexpresado). Mercados finales: semiconductores (mayoría), pantallas, solar, industria general/adyacencias. KPI: pedidos, *book-to-bill*, cartera, ventas por mercado final, peso de China, margen EBITDA, FCF, empleados (FTE), capacidad en Malasia (Penang) y Suiza.
- **Muy cíclica**: el ciclo de inversión en equipos de semiconductores (WFE) manda. Hacen falta los pedidos, las ventas, la cartera y el *book-to-bill* trimestrales de **2019 a 2T26** (para calibrar ciclos: 2019 bajada, 2021-22 pico, 2023 caída, 2024-25 recuperación, 2026 subida con IA).
- Clientes concentrados (Applied Materials, Lam Research, Tokyo Electron, ASML/otros OEM) y competencia sobre todo japonesa (Irie Koken, Nippon Valqua, Shin-Etsu?…) y estadounidense (MKS, Kitz SCT…); verifica.
- Riesgos: China (peso en ventas y controles a la exportación de EE. UU.), efecto del franco (costes en CHF, ventas en USD), cobertura cambiaria.
- Paga dividendo (parte con cargo a reservas de aportaciones de capital, sin retención suiza: dilo si aparece).

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Toda cifra se copia del documento original abierto y leído (web de inversores de VAT, SIX). WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL o descarga con descargar.mjs y usa grep.
1. Nunca inventes una cifra. Tras **tres intentos distintos** (1: fuente primaria directa; 2: otra vía/otro documento/otro término; 3: derivarlo o fuente secundaria fiable citada) sin éxito: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}.
2. Unidades: magnitudes en **millones de CHF** (las cuentas vienen en miles: divide entre 1.000); precio, BPA, DPA en CHF; acciones en millones. Comparables extranjeros convertidos a CHF al tipo de la fecha de corte (dilo). Porcentajes en puntos (12,5 % → 12.5). Números como números. Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita con [n] (tus números locales). Una entrada por documento realmente leído y usado; cita el documento concreto, no «la web de inversores».
4. **Guardar por partes**: reescribe tu `notas/<letra>.json` (JSON válido, claves de primer nivel del prompt + `fuentes` + `huecos`) DESPUÉS DE CADA CAMPO que termines (como mucho cada 10 minutos).
5. Escribe **solo hechos** con su fuente. Los textos de juicio (comentario, lectura...) los redacta el analista principal: déjalos sin escribir, pero vuelca los hechos útiles en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]).
6. No modifiques NADA fuera de informes/vat-2026-10-06/. Solo fuentes gratuitas. No resuelvas captchas. **No abras, cierres ni mates Word (WINWORD)**.
7. Respeta las claves exactas de tu parte del prompt.
8. **Presupuesto: unos 20 minutos y unas 80 llamadas a herramientas.** Prioriza por impacto en la decisión; al llegar al límite, cierra con lo que tengas y registra lo que falte como hueco.

## Fuentes que suelen funcionar
- Web de inversores: https://www.vatgroup.com/en/investors (informes anuales y semestrales, presentaciones, notas de prensa trimestrales, calendario, gobierno). Rutas de PDF del tipo `https://www.vatgroup.com/files/live/sites/vat/files/Investor%20relations/annual-report/2025/financial-statement.pdf` y `.../half-year-report/2026/vat-q2-half-year-2026-presentation.pdf`. Informes antiguos también en https://ir.vatvalve.com (p. ej. `/fileadmin/user_upload/annual_reports/2023/pdf/VAT-Group-Financial-Report-2023.pdf`).
- SIX: participaciones significativas (https://www.ser-ag.com/en/resources/notifications-market-participants/significant-shareholders.html) y operaciones de directivos (management transactions) en ser-ag.com.
- Consenso: MarketScreener (estimaciones a 3 años, mismo proveedor para comparables); Stock Analysis (EV, ROIC); Investing / Yahoo para contraste.
- Bono suizo a 10 años: Trading Economics / Investing / SNB (texto literal). Tipos de cambio: BCE o SNB.

## Al terminar
Devuelve en tu respuesta un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro. Y, aparte, 3-5 líneas sobre **fallos o fricciones de las herramientas del repo** (herramientas/*.mjs, lecciones.md) que hayas encontrado, con el arreglo que propondrías.

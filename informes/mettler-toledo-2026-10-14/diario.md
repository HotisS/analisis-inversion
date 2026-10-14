# Diario · Mettler-Toledo (MTD) · 14-oct-2026

- Commit de partida: 1c5968d (Rovi, 14-oct). Prompt de `verticales/empresa/prompt.md` sin cambios durante el análisis.
- Entorno: nube de Claude Code, igual que Group 1 Automotive y Thermo Fisher. La red solo deja salir a la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan y no se probaron. Las cifras salen de extractos de búsqueda (8-K de resultados 4T25, 1T26 y 2T26, 10-K 2025, 10-Q del 2T26, 8-K de la junta, proxy, Stock Analysis, Finboard, TipRanks, Fintel, Macrotrends, MarketBeat, Barchart, Benzinga), con la URL como fuente. Sin subagentes: notas A-E escritas por mí (builder en el directorio temporal, no en el repo).
- Fecha de corte: 2026-10-14. Divisa: USD. Cierre: diciembre. US GAAP. Precio: 1.595,25 USD, cierre del 13-oct según Benzinga (la sesión del 14 no había cerrado); ese día marcó máximo de 52 semanas. Resultados del 3T26: hacia el 5-nov-2026 (fecha estimada por MarketBeat).
- Tiempos: 12:57 inicio; 13:05 búsquedas de núcleo cerradas (21 búsquedas: 2T26, precio ×4, cuenta, 4T25, BPA ajustado histórico, cierres anuales, deuda, flujos, cuenta detallada, amortización, balance, consenso, 1T26, sentimiento ×3, proxy, mercado, ventas por línea, acciones); 13:08 notas A-E; 13:10 primer cálculo; 13:12 Word y PDF; 13:15 cierre.
- Reutilizado: comparables de Thermo Fisher y Danaher (análisis del 14-oct), Agilent y Waters (PER, del análisis de Thermo Fisher), Hexagon, Cognex y Rockwell (MarketScreener a 7-oct, del análisis de Keyence); bono a 10 años del 13-oct (5,22 %) de Group 1 Automotive; ERP de Damodaran (4,20 %).
- Confianza: Media en cuentas (ventas, BPA y acciones cuadran entre agregadores y comunicados; patrimonio de una sola fuente; depreciación de 2021-2024 estimada); Baja en gobierno, sector, competencia y bolsa (sin proxy completo, sin cifras de competidores, sin beta). Acciones diluidas (20,1 M) estimadas.

## Decisiones

- EBITDA GAAP en el DCF (30,9 % en 2025); BPA del objetivo a 12 meses y PER histórico en base ajustada (diferencia con el GAAP ≈1 % de las ventas en el EBIT), calibrado con 2025 (42,7 frente a 42,73) y con la guía de 2026 (≈47,0 frente a 47,15-47,50).
- Patrimonio negativo por recompras: el ROIC del motor (NOPAT / deuda neta + patrimonio ≈ capital operativo, ≈2.100 M) es del 47,6 % y se explica así en rentabilidad y balance; el ROE no se usa.
- PER histórico sin 2020-2021 (burbuja covid); solo cuatro años limpios (2022-2025): mediana 32,3x, mínimo 29,8x, media 32,7x. Beta de 1,10 por juicio.
- Sostenibilidad «Sí»: reinversión del 3 % del NOPAT, prueba a mano (precio 2,5 % + volumen 2,5 %, cuota ya >50 %, capital operativo la mitad de las ventas). No hubo que rebajar el base; matiz: el 5 % supera el 2,0 % anual de 2021-2025.
- En las notas las citas tienen que ir a la propia lista ([n]); las [A1] dentro de B.json no se traducen. El builder copia la fuente citada de otra nota a la lista propia.
- 17 de 17 controles correctos; síntesis de 642 palabras.

## Resultado

- Recomendación: **Mantener**, convicción Media (la sugerida). Valor intrínseco 874,20 USD (−45,2 %); DCF 608,26 USD (WACC 10,81 %; 753,71 con la prima del mercado); DCF inverso: el precio descuenta un 20,0 % de crecimiento anual (base 4,1 %) o una rentabilidad del 6,2 %. ROIC − WACC: 36,8 puntos.
- **Línea 12 m**: objetivo 1.697,23 USD; ponderada +6,4 %, base +6,8 % (sin dividendo); bajista 1.487,02 / base 1.704,28 / alcista 1.893,33 (PER 29,8x / 31,1x / 32,7x × BPA 2028e 49,90 / 54,80 / 57,90). Consenso 1.459,54 USD (octubre). Comprar por debajo de 874,20 USD; vender por encima de 1.885,81. Detalle en `revision-12m-2026-10-14.md`. No se ha ejecutado `apuntar-12m.mjs` ni `seguimiento.mjs` (lo integra el orquestador).

## Huecos principales

Cifras de competidores (núcleo); consejo completo, remuneración del consejero delegado, accionistas y Form 4 (núcleo); transacciones precedentes y ESG; beta y rentabilidades de bolsa; proveedores, intangibles y vencimientos de la deuda; gastos generales; serie por línea de producto; consenso de 2028e; Reddit y Stocktwits.

## Lecciones

- En las notas A-E las citas `[n]` se refieren a la lista de la propia nota: una cita `[A1]` escrita dentro de B.json no la traduce `integrar` (deja fuentes sin citar). Las citas con letra solo valen en `propio`.
- Con el PER base = PER actual (precio / BPA del año siguiente), el objetivo a 12 meses baja con el precio: en empresas caras con valor intrínseco muy por debajo, el precio de compra lo fija el valor intrínseco, no la rentabilidad a 12 meses.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 35.1x, mínimo 29.1x, media larga 35.9x; antes v2 32.3x/29.8x/32.7x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v2.json y «Mettler-Toledo - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener 9,9 % (antes v3 Mantener 9,9 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 29,8x / 31,1x / 32,7x, 6,4 % Mantener. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).

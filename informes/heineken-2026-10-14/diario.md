# Diario · Heineken N.V. (HEIA) · 14-oct-2026

- Commit de partida: 329c8c0 (Novartis 14-oct; método v2 con regla de múltiplos común).
- Entorno: nube de Claude Code. La red solo deja la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan. Todas las cifras salen de extractos de búsqueda (comunicados de resultados de 2025 y 1S26, Stock Analysis, Fintel, Digrin, aktien.guide) y de MarketScreener a 12-oct tomado del análisis de Diageo del repositorio. Confianza: baja en balance, consenso y precio; media en cuenta y flujos.
- Fecha de corte: 2026-10-14. Divisa: EUR. Cierre del ejercicio: diciembre. Sin subagentes (fases A-E hechas por el orquestador de este análisis).
- 14:01 inicio · 14:10 notas A-E · 14:13 primer cálculo · 14:16 Word y PDF (soffice).
- Decisiones: precio 71,12 EUR (último cierre citado por Simply Wall St, coherente con 40.202 M de capitalización de MarketScreener a 12-oct ÷ ≈565 M de acciones del proveedor); 546 M de acciones (estimación propia, 1.256 M ÷ 2,29 del 1S26 menos la recompra). EBITDA de 2025 en base beia (+579 M de excepcionales, derivado de deuda neta 14.506 M ÷ 2,2x). Deuda neta a jun-26 de 17.500 M (2,6x, estimada). Minoritarios a 4.000 M (estimados). Base rebajado de 3 % a 2 % anual en euros tras la prueba de sostenibilidad (en euros no creció entre 2022 y 2025): veredicto «En parte».
- Resultado: 16 de 18 controles (2 explicados: regresión y capitalización). Mantener, convicción media. DCF 85,75; valor intrínseco 85,14 EUR (+19,7 %).
- Línea 12 m: objetivo 73,22 EUR, ponderada +5,6 %, base +6,5 %, Mantener (compra < 65,32 EUR). Detalle en revision-12m-2026-10-14.md. No se ha ejecutado apuntar-12m.mjs ni seguimiento.mjs (lo hace el integrador).

## Lecciones

- Sin red: el precio de una cotizada europea puede salir de la capitalización de MarketScreener que guardó otro análisis del repositorio (comparables) dividida por el número de acciones que usa el proveedor, contrastada con un «último cierre» citado; los cierres anuales, del ADR × ratio ÷ tipo del BCE de fin de año (Digrin da precios reales, no ajustados).

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (5 años; mediana 21.2x, mínimo 15.8x, media larga 26.1x; antes v2 16.2x/13.9x/16.5x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v2.json y «Heineken - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener 18,2 % (antes v3 Mantener 33,6 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 11,6x / 13,6x / 16,5x, 5,6 % Mantener; con el tope anterior del base (×1,3, 14-oct mediodía): 33,6 % Mantener. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).

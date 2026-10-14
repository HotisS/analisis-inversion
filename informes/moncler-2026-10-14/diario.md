# Diario · Moncler (MONC.MI) · 14-oct-2026

- Commit de partida: c401501 (Cola del 14-oct, 12:00).
- Entorno: nube de Claude Code. La red solo deja salir a la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan. Unas 25 búsquedas. Las cifras salen de los extractos de búsqueda de los comunicados de resultados (eMarket Storage), factsheet e informes anuales de Moncler, Stock Analysis, TipRanks, MarketScreener e Investing, con la URL como fuente; lo que no cuadró va a `null` y a `meta.huecos`. **Confianza baja-media**: cuenta de resultados (ventas, EBIT, beneficio, BPA) y caja neta, buena; balance (patrimonio estimado, proveedores por diferencia), flujos de 2025 (estimados desde el flujo libre publicado) y gobierno, baja.
- Fecha de corte: 2026-10-14. Divisa: EUR. Cierre: diciembre. Precio: 43,44 EUR, cierre del 8-oct en Viena (no hay cierre de Milán del 13-oct en la búsqueda). Próximos resultados: 21-oct-2026 (calendario financiero de Moncler; el encargo decía 23-28).
- Sin subagentes: notas A-E generadas con `notas/construir.mjs` (escribe las cinco notas y traduce las citas con letra a la numeración de cada nota).
- Comparables y transacciones reutilizados de `informes/hermes-2026-10-11` y `informes/lvmh-2026-10-08` (MarketScreener 8-oct); Bund 3,53 % y prima de Damodaran 4,20 % también de ahí.
- Decisiones: EBITDA = EBIT + amortizaciones con NIIF 16 (proveedores); arrendamientos en el puente (1.109,1 M de dic-25) y altas de derechos de uso en el capex (13 % → 12 %); beta sectorial 1,2; 2026e fijo (+3 % publicado); sostenibilidad «Sí» (reinversión del 9 % del NOPAT, prueba hecha a mano con poder de precio y cuota 0,9 % → 1,0 %); pesos DCF 40 / comparables 30 / escenarios 30.
- 14-oct, ≈12:10: informe cerrado, 18 de 19 controles (el de comparables frágiles, explicado); Word (37 páginas) y PDF (soffice). Rentabilidad a 12 meses v2: ponderada +14,2 %, base +10,4 % → **Mantener**, convicción Baja (compra < 42,80 EUR); valor intrínseco 45,00 EUR (+3,6 %); ROIC 20,4 % − WACC 9,52 % ≈ +10,9 puntos. Detalle en revision-12m-2026-10-14.md.

## Lecciones

- En la nube, cuando no aparece el cierre de la bolsa principal, el histórico de Stock Analysis de otra plaza europea en la misma divisa (aquí Viena, VIE:MONC) da un cierre fechado reciente.
- Las notas citan con su propia numeración: si se redactan con citas de letra ([A13]) hay que traducirlas (y copiar la fuente) antes de integrar, o el motor da casi todas las fuentes como no citadas. Ojo: `competencia.foso.fuentes` es una lista de textos, no de fuentes.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 22.8x, mínimo 21.9x, media larga 24x; antes v2 22.9x/21.6x/23x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v2.json y «Moncler - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener 23,5 % (antes v3 Mantener 27,2 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 14,7x / 17,3x / 22,5x, 14,2 % Mantener; con el tope anterior del base (×1,3, 14-oct mediodía): 27,2 % Mantener. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).

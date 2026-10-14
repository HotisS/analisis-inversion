# Diario · Straumann (STMN) · 14-oct-2026

- Commit de partida: cc5c9b1 (Tencent, 14-oct; método v2 con regla de múltiplos común).
- Entorno: nube de Claude Code. Solo WebSearch; WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan. Las cifras salen de extractos de búsqueda de las notas de prensa y presentaciones de Straumann (FY2022, FY2024, FY2025, 1S26, guía de junio de 2026), de Stock Analysis, Stockopedia y Fintel, y de la prensa suiza (AWP). Unas 25 búsquedas, compartidas con otras sesiones.
- Fecha de corte: 2026-10-14. Divisa: CHF. Cierre: diciembre. Cuenta en base core.
- Confianza: **baja-media**. Precio sin cierre fechado del 13-oct (92,00 CHF del 3-oct-2026; páginas sin fecha daban 88,7-98,0). Balance incompleto (sin circulante ni deuda por año): el ROIC del motor de 2025 (25,6 %) es razonable, pero el incremental (5,8 %) no sirve. Comparables reutilizados de los informes de Coloplast (12-oct), Cooper (8-oct) y Cochlear (8-oct) del repo; tasa libre suiza del de Roche (0,54 %).
- Decisiones: circulante dentro del capex (+≈1,2 puntos de las ventas); WACC 7,41 % (beta 1,10 sin medir, prima adicional de 1 punto como Roche y Givaudan); terminal 1,0 % con etapa 2 de cinco años; escenarios 25/50/25; sostenibilidad «Sí» hecha a mano (reinversión < 15 % del NOPAT).
- Tiempos: inicio 14:09; notas A-E 14:20; primer cálculo 14:21; Word y PDF 14:23 (reloj del contenedor).
- Resultado: 17 de 17 controles; 36 páginas; cobertura de campos 80,2 % (gobierno, bolsa y transacciones por debajo del 60 %).
- **Línea 12 m**: objetivo ponderado 104,34 CHF → +14,5 % (base +10,2 %, 100,39) → Mantener, convicción baja. Valor intrínseco 75,97 CHF (−17,4 %); DCF 75,15; con la prima del mercado 92,49. Consenso 114,75. Compra < 75,97 CHF; venta > 117,05. Detalle en `revision-12m-2026-10-14.md`. No se ha ejecutado `apuntar-12m.mjs` ni `seguimiento.mjs` (lo hace el orquestador).

## Lecciones

- Con el PER base igual al PER actual, la rentabilidad del base apenas depende del precio (es el crecimiento del BPA de 2027e a 2028e más el dividendo); el «comprar por debajo de» del motor supone el objetivo fijo. Conviene decirlo así en la síntesis para no prometer un precio de compra que la regla recalculada no daría.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 40.7x, mínimo 38.1x, media larga 45.9x; antes v2 34.9x/31.2x/40x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v2.json y «Straumann - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener 26,1 % (antes v3 Mantener 41,5 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 22,7x / 26,7x / 34,7x, 14,5 % Mantener; con el tope anterior del base (×1,3, 14-oct mediodía): 41,5 % Mantener. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).

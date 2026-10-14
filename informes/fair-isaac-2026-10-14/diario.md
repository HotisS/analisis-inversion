# Diario · Fair Isaac (FICO) · 14-oct-2026

- Commit de partida: c401501 (cola del 14-oct, 12:00; método v2 con regla de múltiplos común). No se cambió de versión del prompt.
- Entorno: nube de Claude Code. La red solo deja la búsqueda web (WebSearch); WebFetch, curl, descargar.mjs y bolsa.mjs no funcionan. ≈30 búsquedas. Cifras de los extractos de búsqueda de los 8-K de resultados (4T FY25, 1T-3T FY26), 10-K FY2025 y 10-Q de 2026 (balance, deuda, ASR, acciones), de agregadores (MarketScreener, Kalkine, Macrotrends, Barchart, AlphaQuery) y de prensa (TIKR, HousingWire, MarketBeat, 24/7 Wall St.), con la URL como fuente. **Confianza baja-media**: cuenta FY2021-25 cuadrada entre dos agregadores; balance FY2021-22 y activo/pasivo corriente sin dato; precio estimado (no se halló el cierre del 13-oct: 667,58 USD del 9-oct × 1,0917 del 12-oct = 728,80 USD); EBITDA LTM estimado; gobierno (proxy) sin leer.
- Sin subagentes (encargo): notas A-E escritas con `notas/notas_build.py`; supuestos en `supuestos.mjs`, textos en `textos.mjs`. Comparables reutilizados de Experian (14-oct) y Equifax (8-oct), con Experian en lugar de FICO.
- Fecha de corte 2026-10-14. Divisa USD. Ejercicio a septiembre, etiqueta «fin». FY2026 cerrado pero sin publicar: primer año de la proyección, fijo en la guía (2.530 M, BPA GAAP 36,86). Próximos resultados: principios de noviembre (fecha estimada 5-nov, sin confirmar).
- Decisiones: base GAAP en todo (BPA, PER histórico, escenarios); PER histórico con cierre de diciembre (no se hallaron los de septiembre), excluidos FY2021 (plusvalía) y FY2024 (97x); WACC 10,29 % (beta 1,2 supuesta + 0,5 puntos de riesgo regulatorio); FY2027e −4 % por la tabla de precios única de la FHFA (29-sep-2026); sostenibilidad «En parte» (pasa reinversión y cuota, falla el poder de precios en hipotecas: el base ya está recortado); transacciones y bolsa omitidas; 300 M de ASR prepagado como activo en el puente.
- 14-oct, ≈12:10: informe cerrado, 17 de 17 controles. Word (34 páginas) y PDF (soffice). Cobertura 76,9 %.
- **Rentabilidad a 12 meses v2**: objetivo 776,50 USD, ponderada +6,5 %, base +8,4 % → **Mantener** (convicción media; compra < 560,84 USD, venta > 862,78 USD); valor intrínseco 560,84 USD (−23,0 %; 659,86 con la prima del mercado). Detalle en revision-12m-2026-10-14.md.

## Lecciones

- Sin bolsa.mjs, el precio de un día concreto puede reconstruirse con un cierre previo citado (AAII: «up X % from the prior close of …») y el movimiento del día de TradingKey; márquese como estimación.
- Con ejercicio a septiembre, Macrotrends solo da cierres de diciembre: para el PER histórico se usan con el BPA del ejercicio cerrado tres meses antes, y se dice.

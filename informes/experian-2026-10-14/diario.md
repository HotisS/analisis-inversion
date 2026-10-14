# Diario · Experian (EXPN.L) · 14-oct-2026

- Commit de partida: cb7f18e (Danaher; método v2 con regla de múltiplos común). Al cerrar, main estaba en 61e0741 (otras sesiones); no se cambió de versión del prompt.
- Entorno: nube de Claude Code. La red solo deja la búsqueda web (WebSearch); WebFetch, curl, descargar.mjs y bolsa.mjs no funcionan. 13 búsquedas. Las cifras salen de los extractos de búsqueda (comunicados FY20-FY26 y 1T FY27, avisos de recompra en Investegate, MarketBeat, interactive investor, PitchBook) con la URL como fuente. **Confianza baja-media**: ingresos, EBIT y BPA benchmark, ROCE, deuda neta, recompras y guía están sacados de la búsqueda; el balance (deuda bruta/caja, patrimonio), el capex, los dividendos pagados, las acciones (905 M), el GBP/USD (1,35) y los precios de cierre de marzo para el PER histórico son estimaciones del analista que cuadran con las cifras publicadas, y están en huecos.
- Presupuesto del encargo: unos 15 minutos (encargo de la sesión); por eso sin subagentes y con las notas A-E escritas por un único script (`notas/notas_build.py`). Sector y comparables reutilizados del informe de Equifax del 8-oct (nota B entera y comparables de su datos-v2, con Equifax en lugar de Experian).
- Fecha de corte: 2026-10-14. Divisa de las cuentas: USD; cotización en GBp (tipo 0,0135 USD/GBp). Ejercicio a marzo, etiqueta «fin» (FY2026 = abr-25 a mar-26). Próximos resultados: semestrales, 18-nov-2026 (TipRanks; por confirmar).
- Decisiones: BPA benchmark en toda la serie (misma base que PER y consenso); WACC con el bono de EE. UU. (5,22 %) porque cuentas y negocio están en dólares; sostenibilidad «Sí» con prueba a mano (reinversión del 6 % del NOPAT; el crecimiento proyectado, 6,8 %, es menor que el orgánico real con el mismo capex); transacciones no buscadas (peso 0).
- 14-oct, ≈11:46: informe cerrado, 16 de 16 controles (dos explicados: diferencia con el consenso y fuentes heredadas de Equifax sin citar). Word y PDF (soffice).
- **Rentabilidad a 12 meses v2**: ponderada +15,6 %, base +11,5 % → Mantener (compra < 33,04 USD ≈ 2.447 p; venta > 42,64 USD); valor intrínseco 42,03 USD (+26,7 %). Detalle en revision-12m-2026-10-14.md.

## Lecciones

- Con la red solo de búsqueda, los avisos de recompra («Transaction in own shares») de Investegate dan el último precio fiable de las británicas que recompran: la búsqueda lista varios con su precio medio.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (5 años; mediana 27.7x, mínimo 23x, media larga 26.6x; antes v2 29.4x/19.2x/27.8x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v2.json y «Experian - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener 27,2 % (antes v3 Mantener 49,9 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 12,5x / 14,7x / 19,1x, 15,6 % Mantener; con el tope anterior del base (×1,3, 14-oct mediodía): 49,9 % Mantener. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).

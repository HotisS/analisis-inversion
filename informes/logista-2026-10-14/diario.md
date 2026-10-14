# Diario · Logista (LOG, EUR) · 14-oct-2026

- Commit de partida: cf85477 (regla v3, 0ab5dfd, presente; `git pull --rebase` sin cambios antes de calcular).
- Entorno: nube de Claude Code, red limitada a WebSearch (WebFetch, curl, descargar.mjs y bolsa.mjs no funcionan; no se probaron). Cifras de extractos de búsqueda: notas de resultados FY25, 1S26 y 9M26 vía Europa Press/Alimarket/Bolsamanía, comunicados de dividendo de Logista, Stock Analysis, MarketScreener/Zonebourse, roic.ai, TipRanks, Fintel, Investing, Merca2, Bankinter, XTB. **Confianza de los datos de núcleo: baja** (precio de XTB de la mañana del 13-oct, no cierre oficial; balance de agregador sin la caja prestada a Imperial ni el circulante; cuenta sin resultado financiero ni impuestos; flujos solo del FY2025). Sin subagentes; notas A-E generadas con `notas/build_notas.mjs` (cada nota con su numeración).
- Tiempos: 16:07 inicio de la investigación; ≈20 búsquedas web; 16:19 Word y PDF (soffice); revisión 12 m y diario a las 16:22.
- Decisiones:
  - Ejercicio a septiembre con etiqueta «fin» (FY2025 = oct-24 a sep-25); ejercicio objetivo FY2028e.
  - Precio 35,86 EUR (13-oct, XTB); 132,5 M de acciones (132,75 M emitidas; dividendo de 277 M ÷ 2,09 EUR).
  - Ingresos brutos reportados (con impuestos repercutidos): margen EBITDA del 3,6 %; EBITDA = EBIT publicado + amortización de Stock Analysis (estimación).
  - Caja flotante prestada a Imperial (≈2.500 M de media, estimación de analistas): no se cuenta al nominal; se valora como la renta perpetua de sus intereses después de impuestos (≈730 M) y se suma a la tesorería en bancos (175 M): caja del puente 905 M. Sensibilidad: 0 → ≈38 EUR; nominal → ≈57 EUR.
  - Capex del DCF con los pagos de arrendamiento (1,0 % de ventas), así que el puente no resta pasivos por arrendamiento.
  - WACC 7,33 % (Bund 3,53 %, beta 0,6 supuesta, prima 5,5 + 0,5, sin deuda); Gordon al 1 %. Pesos DCF 70 / escenarios 30; comparables y transacciones a 0.
  - Sostenibilidad «Sí» a mano (reinversión casi nula; crecimiento 2,1 % por precio). ROIC del motor 49,6 % no interpretable (capital operativo negativo), explicado en controles.
  - Convicción Baja (el motor sugería Media) por la confianza de datos (regla del usuario del 14-oct).
- Resultado: **Mantener, convicción baja**. DCF 43,45; valor intrínseco 43,22 EUR (+20,5 %). DCF inverso: −1,3 % de crecimiento frente al +2,0 % del base; rentabilidad implícita 9,0 %. 18 de 19 controles (1 explicado: puente frente a balance). Cobertura 72,5 %.
- **Línea 12 m (regla v3)**: objetivo ponderado 30,79 EUR, ponderada −8,3 %, base −6,1 % (dividendo 5,9 % incluido) → Mantener; compra < 28,61 EUR, venta > 36,56 EUR. Consenso 32,54 EUR (base −3 %). Detalle en revision-12m-2026-10-14.md. No se ejecutó apuntar-12m ni seguimiento (lo integra el orquestador).
- Para pasar a Comprar (además de precio < 28,61): confirmar con fuente primaria el cierre oficial, la caja prestada a Imperial al 30-sep y su tipo efectivo, el balance completo y la cuenta por debajo del EBIT.

## Lecciones
- Distribuidores con caja flotante de impuestos (Logista: impuestos del tabaco cobrados antes de pagarlos, prestados al accionista): no contar la caja al nominal en el puente (no se puede repartir) ni ignorarla; valorarla por la renta de sus intereses después de impuestos y dar la sensibilidad. El ROIC del motor sale absurdo (capital operativo negativo): explicarlo en controles.
- Cuando el PER adelantado de hoy está muy por encima de toda su historia (Logista 16,5x frente a 8,9-13,6x), la v3 y el DCF divergen con fuerza (−8 % a 12 meses frente a +20 % de valor intrínseco): decirlo en la síntesis como la tensión central, no promediarla.
- 2026-10-14: datos-v2.json y «Logista - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener -5,4 % (antes v3 Mantener -8,3 %). Para comparar, con el tope anterior del base (×1,3, 14-oct mediodía): -8,3 % Mantener. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).

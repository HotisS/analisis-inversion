# Diario · Spirax Group (SPX.L) · 14-oct-2026

- Commit de partida: c24d37f (método v2 con regla de múltiplos común).
- Entorno: nube de Claude Code. La red solo deja la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan y no se probaron. Unas 30 búsquedas. Todas las cifras salen de resultados de búsqueda (RNS de resultados en el NSM de la FCA, Investegate y LSE.co.uk; Stock Analysis y Kalkine; prensa financiera), con la URL como fuente; lo que no cuadraba fue a `null` y a `meta.huecos` (18 huecos).
- Confianza: **baja-media**. Alta en ingresos, beneficio operativo (reportado y ajustado), BPA y dividendos 2021-2025 y en el semestre de 2026 (comunicados de la empresa). Baja en amortizaciones 2021-2024 (estimadas), balance (solo 2024-2025, sin circulante), flujos (parciales), precios de cierre anuales (derivados del ADR SPXSY × 2 ÷ GBP/USD), beta (0,95 estimada), bono británico (4,9 %, último dato de julio 5,05 %), deuda neta de jun-26 (618,2 M, resumen secundario) y comparables (solo PER adelantado de agregadores, cuatro empresas).
- Fecha de corte: 2026-10-14. Divisa: GBP (cotiza en peniques: 7.090 p = 70,90 GBP, 8-oct, último precio hallado). Cierre del ejercicio: diciembre. Ex-dividendo del interino (50,4 p) el 15-oct.
- Sin subagentes: fases A-E hechas por mí y guardadas por partes en `notas/` (A-E.json, propio.mjs, textos.mjs, resumen.mjs).
- Decisiones:
  - EBITDA y BPA en base **ajustada** para el DCF y el objetivo a 12 meses: la amortización del DCF (4 % de las ventas) excluye la de intangibles de compras (≈34,6 M en 2025, por diferencia entre 305,3 M antes de reestructuración y 339,9 M ajustados); la reestructuración de 2025 (40 M) va en `no_recurrentes_en_ebitda`.
  - Sin circulante en el balance: `nwc_pct_ventas` = 0 y la inversión en circulante (≈18 % de las ventas, estimación) va en el capex (5,4 % hasta 2030e y 4,9 % después, frente al 4 % publicado).
  - Puente con la deuda neta publicada (incluye arrendamientos), sin pensiones (dato no hallado).
  - Comparables: 4 (control explicado); transacciones y bolsa omitidas (huecos).
- 11:07: informe cerrado, 15 de 16 controles correctos y 1 explicado (4 comparables). Word y PDF (soffice). DCF 49,10 GBP (WACC 9,46 %), con la prima del mercado 59,85; valor intrínseco (síntesis) 58,62 GBP (−17,3 %). DCF inverso: 8,5 % de crecimiento frente al 3,7 % del base. Sostenibilidad: Sí. ROIC 12,3 % − WACC 9,46 % = 2,8 puntos.
- **Línea 12 m**: objetivo 76,40 GBP (BPA ajustado 2028e 3,22 / 3,69 / 4,01 × PER 17,5 / 20,6 / 26,8; 30/50/20); ponderada +10,2 %, base +9,6 % (con dividendo del 2,4 %) → **Mantener**, convicción media; comprar por debajo de 58,62 GBP, vender por encima de 86,80. Consenso de contraste: 81,19 GBP (17 analistas). Detalle en revision-12m-2026-10-14.md. No ejecutados `apuntar-12m.mjs` ni `seguimiento.mjs` (por encargo).

## Lecciones

- **Valores británicos en peniques**: trabajar en GBP (precio 70,90, no 7.090) con `divisa_cotizacion: "GBP"` y decirlo en limitaciones; los BPA de los comunicados vienen en peniques y hay que pasarlos a libras.
- **Amortización de intangibles de compras sin el estado de flujos**: la diferencia entre el beneficio operativo «antes de reestructuración» de un agregador (Kalkine) y el ajustado de la empresa la da con buena aproximación; con la D&A total del agregador se separa la de inmovilizado.
- **Cierres anuales sin `bolsa.mjs`**: los cierres del ADR de Macrotrends × ratio ÷ tipo de cambio de fin de año sirven de estimación para el PER histórico; comprobar el ratio del ADR (aquí 1 ADR = 0,5 acciones) contra un precio conocido.
- **Sin circulante en el balance**: poner `nwc_pct_ventas` a 0 y llevar la inversión en circulante al capex evita que el motor genere una salida de caja artificial el primer año (salía 317 M).

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 40.4x, mínimo 30.4x, media larga 41x; antes v2 26.1x/23.5x/27.2x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v2.json y «Spirax Group - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener 20,8 % (antes v3 Mantener 42,3 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 17,5x / 20,6x / 26,8x, 10,2 % Mantener; con el tope anterior del base (×1,3, 14-oct mediodía): 42,3 % Mantener. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).

# Diario · Halma plc (HLMA.L) · 14-oct-2026

- Commit de partida: c24d37f (método v2 con regla de múltiplos común).
- Entorno: nube de Claude Code. La red solo deja salir a la búsqueda web (WebSearch); halma.com, la bolsa de Londres, Yahoo y los demás dominios no se pueden abrir, y WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan. Las cifras salen de extractos de búsqueda de las notas de resultados (RNS de halma.com, Investegate) y de agregadores (Stock Analysis, Stockopedia, MarketScreener, Weiss Ratings, Digrin), con la URL como fuente; lo que no cuadra va a `null` y a `meta.huecos` (18 huecos).
- Confianza: **baja-media**. Alta en la cuenta de cabecera (ingresos, BPA y DPA de cinco ejercicios cuadran con las notas de resultados) y en las guías; baja en balance (solo FY2026, deuda derivada), flujos (mezcla de proveedores, Weiss en USD), comparables (solo PER, fechas de junio a octubre) y precio (último cierre con fecha: 3.634 p el 24-sep-2026; no se encontró cotización de octubre).
- Fecha de corte: 2026-10-14. Divisa: GBP (cotiza en peniques; todo en GBP). Ejercicio a marzo, etiqueta «fin» (FY2026 = abr-25 a mar-26). Ejercicio objetivo a 12 meses: FY2029e.
- Fases hechas sin subagentes (notas A-E generadas por `notas/build-notas.mjs`), unas 35 búsquedas web.
- Decisiones:
  - Beneficio **estatutario** en la cuenta, el PER histórico y el objetivo a 12 meses (la amortización de lo comprado es recurrente en un comprador en serie); el ajustado, en el texto.
  - Compras como inversión en el capex del DCF (FY2027e: 515 M comprados − 83 M vendidos; después 6 veces las ventas compradas). Sin circulante en el balance, su inversión (17 % de las ventas nuevas) va dentro del capex y `nwc_pct_ventas` = 0.
  - **Sostenibilidad**: la primera versión (crecimiento 9 % en FY2028e, compras a 4 veces las ventas) fallaba (financiable 4,7 % frente a 7,3 %, capital nuevo al 19,5 % frente a un ROIC del 13 %). Se rebajó el base a 7,5 % en FY2028e y medio punto en los años siguientes, y el coste de las compras a 6 veces las ventas: financiable 7,0 % ≥ proyectado 6,4 %, capital nuevo 11,8 %. Veredicto «En parte».
  - WACC 9,61 % (gilt 5,35 %, beta 0,85 estimada sin serie de cotizaciones, prima 5,5 %).
- Resultado: 17 de 17 controles. Word y PDF (soffice, 38 páginas) a las 11:12.
- **Línea 12 m**: objetivo ponderado 38,23 GBP → +5,9 % (base +8,9 %, asimetría 1,72x) → **Mantener**, convicción media. Compra < 19,39 GBP, venta > 42,75 GBP. Valor intrínseco 19,39 GBP (−46,6 %); DCF 13,91 GBP; DCF inverso: 16,6 % de crecimiento anual. ROIC 13,0 % − WACC 9,61 % = 3,4 puntos. Consenso: 48,09 GBP (contraste). Detalle en `revision-12m-2026-10-14.md`. No se ejecutaron `apuntar-12m.mjs` ni `seguimiento.mjs` (encargo).
- Tiempo: ≈ 40 minutos.

## Lecciones

- **Ejercicio a marzo y objetivo a 12 meses**: con corte en octubre, el ejercicio que cierra en marzo del año+2 queda a 17,5 meses (menos de 18), así que el objetivo es el de marzo del año+3 (FY2029e) y el PER «actual» usa el BPA del año+2 (FY2028e).
- **Con la regla común, el PER del base es el actual**, que se mueve con el precio: la rentabilidad del base es casi el crecimiento del BPA entre el ejercicio siguiente y el objetivo, sea cual sea el precio. En compounders caros, el nivel de compra lo fija el valor intrínseco, no el objetivo a 12 meses.
- **Weiss Ratings** da los estados de las líneas OTC en dólares aunque no lo diga; se reconoce porque los dividendos pagados no cuadran con el DPA × acciones en libras.
- **Sin circulante en el balance**, el motor toma 0 % como último real y cualquier `nwc_pct_ventas` genera una inversión falsa el primer año: mejor meter la inversión en circulante en el capex y explicarlo.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 30.8x, mínimo 26.3x, media larga 32.1x; antes v2 33.3x/33x/34.9x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.

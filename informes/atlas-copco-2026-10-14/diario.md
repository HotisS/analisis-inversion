# Diario · Atlas Copco (ATCO A) · 14-oct-2026

- Commit de partida: 90a6f2c (Cola: Alibaba, Watches of Switzerland, Rovi, Endesa y Repsol con prioridad).
- Entorno: nube de Claude Code. La red solo deja salir a la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan. Todas las cifras salen de los resultados de búsqueda (informes del 4T25, 1T26 y 2T26 de Atlas Copco, cifras clave del informe anual 2025, Stock Analysis, Inderes, Simply Wall St, Eulerpool, Placera, Affärsvärlden, ad-hoc-news), con la URL como fuente. Sin subagentes: notas A-E escritas por mí con `notas/notas_build.py`; supuestos en `notas/supuestos.mjs`, textos en `notas/textos.mjs` y `notas/resumen.mjs`.
- **Confianza**: media en cuenta de resultados 2021-2025 (ingresos, EBITDA, EBIT, beneficio y BPA de dos fuentes que cuadran), trimestres, flujos y PER histórico (PER de Inderes × BPA da cierres que coinciden con lo conocido); baja en balance (solo totales de 2025), consenso (de junio), comparables (solo PER), gobierno y sentimiento. **Precio estimado**: 211,80 SEK = 18,73 EUR (ad-hoc-news, 14-oct) × 11,31 (EUR/SEK implícito de la nota de ASSA ABLOY del mismo día); último cierre comprobado, 209,70 SEK el 9-oct.
- Fecha de corte 2026-10-14; SEK; cierre en diciembre; NIIF-UE; 4.871 M de acciones (A y B, sin autocartera). Próximos resultados: 22-oct-2026 (Affärsvärlden y varias agendas; Earnings Whispers dice 26-oct). Fecha ex del segundo plazo del dividendo (2,50 SEK): 19-oct.
- Decisiones:
  - Amortización = EBITDA (informe anual) − EBIT (Stock Analysis). Resultado financiero, impuestos y minoritarios anuales en `null` (hueco).
  - Circulante: sin desglose de balance; `nwc_pct_ventas` = 0 y 1,6 puntos de ventas más de capex como sustituto (con 18 % el motor metía 32.000 M de salida de caja el primer año).
  - Comprador en serie: compras dentro del capex a 2,5 veces las ventas compradas (2 puntos al año).
  - **Sostenibilidad**: la primera versión fallaba (capital nuevo al 30,9 % frente a un ROIC del 19,7 %). Se rebajó el orgánico de 2027-2032 (−0,5 puntos, 2029 −1) y se subió el capex: 24,5 %, pasa. Veredicto «Sí» con la rebaja hecha.
  - WACC 8,87 % (bono sueco 3,0 % de julio, beta 1,1 entre la de GuruFocus 1,37 y la de industriales de calidad, prima 5,5 %). Con la prima del mercado (4,20 %), DCF 114,84 SEK.
  - PER histórico sin 2020 y 2021 (34,0x y 41,3x, tipos a cero). Comparables: Ingersoll Rand y Epiroc buscados; el resto, del repositorio del mismo día.
- Resultado: 16 de 17 controles correctos y 1 explicado (fuentes primarias: 8). Word (30 páginas) y PDF (soffice). Cobertura de campos 70 %.
- 14-oct, 12:45 UTC: **revisión a 12 meses v2**: objetivo 193,20 SEK, ponderada −7,4 %, base −3,6 % → **Mantener**, convicción media. Valor intrínseco 106,29 SEK (−49,8 %). ROIC − WACC 10,8 puntos. Vender por encima de 217,99 SEK; comprar por debajo de 106,29 SEK. Detalle en `revision-12m-2026-10-14.md`. No se ejecutó `apuntar-12m.mjs` ni `seguimiento.mjs` (lo integra el usuario).
- Tiempo: ≈25 minutos de trabajo (unas 22 búsquedas web).

## Lecciones

- Sin balance completo, `nwc_pct_ventas` distinto de 0 hace que el motor compare con un circulante real de 0 y meta toda la necesidad de circulante en el primer año: pon 0 y súmalo al capex, explicándolo.
- Precio sin `bolsa.mjs`: las notas de ad-hoc-news dan la cotización en euros del día; el EUR/SEK sale de otra nota del mismo día con precio en coronas (ASSA ABLOY).

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 29.7x, mínimo 21.3x, media larga 28.3x; antes v2 28.85x/25.5x/28.16x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v2.json y «Atlas Copco - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener -4,0 % (antes v3 Mantener -4,0 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 25,5x / 28,9x / 28,9x, -7,4 % Mantener. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).

# Diario · Elevance Health (ELV) · 14-oct-2026

- Commit de partida: 961a3fa (Fiserv, 14-oct).
- Entorno: nube de Claude Code. Solo WebSearch; WebFetch, curl, descargar.mjs y bolsa.mjs no funcionan (no se probaron, por instrucción). Unas 25 búsquedas. Confianza: **media** en cuentas, consenso y precio (comunicados 8-K y 10-K citados por la búsqueda, Stock Analysis, EDGAR Tools); **baja** en gobierno (proxy no legible) y sentimiento (Reddit y Stocktwits solo vía SentiSense).
- Fecha de corte: 2026-10-14; precio de cierre del 13-oct (425,27 USD). Divisa USD, cierre en diciembre, US GAAP. Resultados del 3T26 el 21-oct-2026 (después del corte).
- Tiempos: 11:00 lectura del encargo y del prompt; 11:11-11:15 búsquedas (precio, 2T26, 4T25, histórico, balance, flujos, consenso, gobierno, sentimiento); 11:15-11:22 notas A-E (`notas/construir-notas.mjs`) y propio; 11:24 informe cerrado, Word y PDF (soffice, 43 páginas). Unos 40 minutos en total.
- Decisiones:
  - **Lección de UnitedHealth (caja no regulada)**: el EBITDA incluye la renta de la cartera de las filiales reguladas, así que el puente solo cuenta la caja de la matriz (≈ 2.100 M a 30-jun-2026), no los 9.491 M consolidados (≈ 33 USD por acción de diferencia). Además, el capital estatutario que retienen las filiales al crecer (≈ 12 % del aumento de ventas) se suma al capex del DCF.
  - Sector, competencia, comparables y transacciones reutilizados de `informes/unitedhealth-2026-10-12/` (cifras del 9-12 oct), con UnitedHealth como comparable y Elevance fuera; fuentes UNH renumeradas en B y D.
  - Ingresos = operativos; EBIT = beneficio antes de impuestos + intereses; amortizaciones 2022-2024 interpoladas; deuda 2021-2024 del agregador menos ≈ 700 M de arrendamientos (estimaciones marcadas en `meta.limitaciones`).
  - Objetivo a 12 meses sobre BPA ajustado (historia y escenarios en la misma base). Margen 2026e contable (4,6 %, fijo); 5,5 % en 2027e (+12 % de BPA de la guía); 6,0 % en 2030e.
  - Sostenibilidad «En parte»: reinversión < 15 % del NOPAT, prueba a mano con poder de precios y cuota (3,5 % → 3,2 % del gasto sanitario). No falla ninguna prueba que obligue a rebajar el base.
  - Controles: 16 de 16. Huecos: segmentos, vencimientos, adquisiciones, bolsa, consenso de ingresos/EBITDA, consejo y voto de remuneración, ESG.
- Resultado: **Mantener, convicción Baja** (reglas discrepan: absoluta Mantener, relativa Comprar). DCF 465,14 USD; valor intrínseco 444,43 (+4,5 %); DCF inverso: 2,8 % de crecimiento frente a nuestro 4,2 %.
- **Línea 12 m**: objetivo 446,86 USD (2028e, BPA ajustado 26,44/33,55/37,29 × PER 11,2/14,0/14,8), ponderada +6,7 %, base +12,1 %, señal Mantener; compra < 394,53, venta > 504,13. Consenso 451,38 (22 analistas). Detalle en `revision-12m-2026-10-14.md`. Sin `apuntar-12m.mjs` ni `seguimiento.mjs` (los ejecuta el integrador).

## Lecciones

- Aseguradoras de salud: además de dejar fuera la caja regulada del puente, el capital estatutario que exige el crecimiento de las primas no llega al accionista; sumarlo al capex del DCF (≈ 10-12 % del aumento de ventas) evita que la proyección parezca de «activos ligeros» con FCF íntegramente distribuible.
- Con el BPA ajustado de las aseguradoras (sin amortización de intangibles), la fórmula del BPA de los escenarios debe sumar esa amortización al EBIT para quedar en la misma base que el PER histórico.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 18.5x, mínimo 14.6x, media larga 18x; antes v2 14.2x/11.2x/14.8x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.

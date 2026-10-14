# Diario · Sartorius Stedim Biotech (DIM.PA) · 14-oct-2026

- Commit de partida: 6d00db9. Inicio 17:56 UTC; Word y PDF a las 18:20 UTC; cierre 18:25 UTC (con una compactación de contexto por medio). Sin commit ni push (encargo de subagente).
- Hecho a mano, sin subagentes: notas A-E con `notas/construir-notas.mjs` (lee `bolsa.json`, `cuentas-xbrl.json` y los documentos de `notas/docs/`), supuestos en `notas/supuestos.mjs`, textos en `notas/textos.mjs` y `notas/propio.mjs`.
- Ficha sectorial corta hecha en este análisis: `sectores/bioproduccion-2026-10-14.md` y `-comparables.json`.

## Decisiones

- **XBRL ESEF revisado**: ingresos = `RevenueFromContractsWithCustomers` (cuadran con las ventas publicadas de 2020-2025); deuda = préstamos a largo + corto plazo (2025: 1.867,3 + 557,3 = 2.424,6 M), con los arrendamientos aparte (174,6 M). Lo que el XBRL no recoge y va en el puente: factoring sin recurso (307,8 M a dic-25) y devolución de aranceles a clientes (≈ 23 M). Puente al 30-jun-2026.
- **BPA**: `financieros.cuenta` lleva el BPA publicado (2,73 en 2025); el objetivo a 12 m usa el subyacente (4,40 en 2025), como el mercado y la empresa, y como los informes de Merck y Thermo Fisher. Las extraordinarias se repiten (70 M en 2025): en el DCF el margen es el subyacente menos ≈ 1 punto.
- **DCF**: crecimiento 4,8 % en 2026e y 9-9,5 % en 2027-2029e, bajando a 3,5 %; margen del 30,2 % al 33,5 %; capex del 13 % al 8,5 % (capacidad ya construida); circulante 15,5 % (el real; con el 21 % inicial saltaba el control); WACC 8,93 % (beta ajustada 1,10). DCF 90,07 EUR; valor intrínseco 96,08 (−55,6 %). DCF inverso: 22,8 % anual de crecimiento implícito.
- **Calidad: No.** ROIC 6,0 % frente a WACC 8,93 %: el capital invertido pasó de 2.062 M a más de 6.000 M con la capacidad de la pandemia y Polyplus (2.400 M). Sostenibilidad «En parte»: el 7,2 % medio es financiable, pero la empresa incumplió su último plan (4.400 M de ventas en 2025; real 2.967 M).
- **Gobierno de la filial**: Sartorius AG 71,5 % del capital y 82,9 % de los votos; presidente y consejero delegado de la matriz; la matriz presta 2.420 M y cobra servicios (103,7 M) y canon de marca (19,6 M, +63 %). En la junta de 2026 el 66,4 % del capital libre votó contra la remuneración del consejero delegado. Elliott en la matriz (mayo-26) sin propuesta para los minoritarios.
- **Desestocaje**: terminó (2023 −18,7 %, 2024 +0,6 %, 2025 +9,6 %, 1S26 +6,4 % a tipos constantes). La recuperación está en precio: +44 % desde el mínimo de abril, 38,6x nuestro BPA de 2027.
- **Frente a Lonza** (informe del repo): Lonza 27,3x BPA core, ROIC 9,3 % frente a WACC 6,61 %, v2 +15,6 %; SSB paga un 40 % más de múltiplo con peor ROIC.
- **Controles**: 17 de 19 correctos y 2 explicados (caja proyectada frente a la histórica: antes y después de intereses, en pleno pico de capex; BPA > 25 % anual: compara subyacente 2028e con publicado 2025; en base subyacente es 13,5 %). Las citas de las notas A-E iban con letra ([E1]) y no se renumeraban: `construir-notas.mjs` las pasa ahora a numeración local y copia las fuentes de otra nota.
- **Línea 12 m** (`apuntar-12m --simular`): DIM: v3 ponderada 1,6 %, base 10,4 % → Mantener (v2: 18,2 % Mantener) ¡REVISAR! (v3 y v2 a 17 puntos: historia revisada a mano en `revision-12m-2026-10-14.md`; la v2 solo tiene tres años limpios al cierre).
- **Robustez**: SÓLIDA; acción robusta «No mantener» (valor intrínseco un 56 % bajo el precio, no pasa el filtro de seguir en cartera). Objeción más fuerte: la historia del PER; con 2021-2023 dentro, la ponderada sería ≈ +25 %.
- Señal: **Mantener**, convicción media. Comprar por debajo de 96,08 EUR; vender por encima de 244,31 EUR. Próximos resultados: 22-oct-2026 (9M26).

## Lecciones

- **BPA subyacente frente al publicado**: en empresas con mucha amortización de compras (SSB: 112,6 M) el control «crecimiento del BPA ≤ 25 %» compara el BPA subyacente proyectado con el publicado real y salta siempre; hay que explicarlo con la misma base, no cambiar de BPA.
- **Factoring en el puente**: el XBRL ESEF no recoge el factoring sin recurso (307,8 M en SSB, ≈ 12 % de la deuda financiera); buscarlo en la nota de clientes del documento de registro y sumarlo en `otros_ajustes`.
- **Votos de una filial francesa**: con un accionista de control, el resultado de la junta oculta la protesta; el porcentaje en contra hay que calcularlo sobre el capital libre (SSB: 66,4 % contra la remuneración del consejero delegado, aprobada con el voto de la matriz).
- **Historia del PER con un ciclo de existencias**: los años de fondo del desestocaje dan PER adelantados de 55-72x que, dentro de la mediana, llevan la regla al tope; hay que excluirlos y dar la cifra con ellos como objeción de robustez.
- **Citas en notas escritas a mano**: `integrar.mjs` renumera las citas locales ([3]) de las notas A-E pero no las que llevan letra ([E1]); en las notas, citar sin letra o convertirlas antes de integrar.

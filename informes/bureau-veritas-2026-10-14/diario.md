# Diario · Bureau Veritas (BVI) · 14-oct-2026

- Commit de partida: 5946332 (Meta Platforms, 14-oct).
- Entorno: nube de Claude Code. La red solo deja salir a la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan. Las cifras salen de los comunicados de resultados citados por la búsqueda (Business Wire, AMF vía DILA), de agregadores (Stock Analysis, ChartMill, MarketScreener, TipRanks, Tracenable) y de prensa financiera, con la URL como fuente. Unas 30 búsquedas. Notas A-E y propio hechas sin subagentes.
- Fecha de corte: 2026-10-14. Divisa: EUR. Cierre: diciembre. NIIF-UE. Precio: 26,15 EUR del 8-oct (MarketScreener), último cierre que dio la búsqueda; no se pudieron confirmar los del 9-13 de octubre.
- Tiempos: 13:53 inicio; 14:05 notas A-E escritas; 14:12 cálculo cerrado (15 de 16 controles; el de comparables explicado); 14:13 Word y PDF (37 páginas); 14:16 revisión a 12 meses.
- Decisiones:
  - EBITDA = beneficio operativo publicado + amortizaciones totales (NIIF 16). Arrendamientos (465,6 M EUR a dic-25) en el puente y altas de derechos de uso estimadas (≈1,5 % de las ventas) en el capex del DCF; circulante a cero (sin datos) con 0,3 puntos de capex extra en los años de crecimiento.
  - Puente del 30-jun-26: deuda bruta = deuda neta ajustada (1.688,6) + caja (942,1). Minoritarios a ≈18 veces su resultado (387 M EUR, estimación).
  - 2027e recoge la venta de ≈450 M EUR de ingresos (petróleo, petroquímica, carbón y Gobiernos) neta de 138 M EUR comprados; sin compras futuras (el «dos dígitos» del día del inversor las incluye).
  - BPA del objetivo a 12 meses en base ajustada (como el histórico y el consenso), calibrado con 2025.
  - Comparables: solo cuatro (SGS, Intertek a precio de OPA, Eurofins, ALS), peso del 25 % y solo PER. Transacciones con peso cero.
  - Sostenibilidad «Sí»: el motor no hace la prueba de reinversión (la amortización de intangibles comprados supera al capex); hecha a mano en la justificación.
  - Convicción: la sugerida (Media). Datos de núcleo incompletos (segmentos, circulante, gobierno) dichos en la síntesis.
- Confianza: media en cuenta, deuda, consenso y precio; baja en balance (patrimonio de 2025 de un agregador), gobierno y comparables.
- Revisión a 12 meses (v2): objetivo 30,39 EUR; ponderada +19,7 %, base +15,3 % (con dividendo del 3,5 %); valor intrínseco 33,71 EUR → **Comprar** (comprar por debajo de 26,91 EUR). Detalle en `revision-12m-2026-10-14.md`. No se ha ejecutado `apuntar-12m.mjs` ni `seguimiento.mjs` (lo integra el orquestador).

## Lecciones

- Sin red para descargas, Stock Analysis da por búsqueda las líneas del balance que faltan (caja, deuda a largo y corto, arrendamientos a largo y corto) si se piden con sus rótulos exactos («Cash & Equivalents», «Long-Term Leases»); la búsqueda genérica no las devuelve.
- Los precios de cierre de cada ejercicio se pueden sacar de la capitalización al cierre de MarketScreener ÷ acciones medias del año (beneficio ÷ BPA) y cuadrarlos con el rendimiento por dividendo de finanzen.at.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (3 años; mediana 22.2x, mínimo 18x, media larga 20.8x; antes v2 20.9x/18x/21.3x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.

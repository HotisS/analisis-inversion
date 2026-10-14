# Diario · EssilorLuxottica (EL) · 14-oct-2026

- Commit de partida: 46a2719 (Cadence, 14-oct; método v2 con regla de múltiplos común).
- Entorno: nube de Claude Code. La red solo deja salir a la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan y no se probaron. Las cifras salen de extractos de búsqueda (comunicados de resultados de 2023-2026, Stock Analysis, Fintel, Yahoo, Kalkine, MarketScreener y prensa), con la URL como fuente. Unas 30 búsquedas. **Confianza: baja-media**: cuentas de resultados y flujos 2021-2025 cuadran entre fuentes (BAI, beneficio y BPA); el balance histórico está casi vacío y el puente usa la deuda neta con arrendamientos sin desglose (Quartr).
- Reutilizados de otros informes del repo (cifras ya citadas allí): comparables de Hoya (14-oct), Cooper y Fielmann (9-oct), convertidos a EUR con los tipos implícitos en esos informes (180,2 JPY y 1,1186 USD por EUR); transacciones de Fielmann y Cooper.
- Fecha de corte: 2026-10-14. Precio 146,30 EUR (cierre del 13-oct, MarketScreener). Divisa EUR, NIIF, ejercicio natural. 459,6 M de acciones (MarketScreener).
- Tiempos: 14:15 inicio; 14:22 búsquedas terminadas; 14:31 Word y PDF (42 páginas); 14:35 cierre.
- Decisiones:
  - Objetivo a 12 meses en **BPA ajustado** (sin amortización de intangibles de la fusión, ≈1,8 EUR por acción en 2025), la base de la empresa y del mercado; la historia del PER y los comparables, en la misma base. El valor por comparables del motor usa el BPA publicado (más bajo) y queda como suelo.
  - Circulante del DCF al 25,5 % de las ventas (existencias + clientes, sin proveedores, que no tenemos): conservador.
  - Capex con altas de derechos de uso (≈3,3 % de ventas); amortización con los intangibles de la fusión, que bajan con los años.
  - Sostenibilidad: «Sí». La prueba de reinversión del motor no aplica (3 % del NOPAT por la amortización de intangibles); hecha a mano en el texto.
  - Escenarios 30/50/20 (bajista con −2,5 pp de crecimiento y −1,5 pp de margen) por la desaceleración de las gafas con IA y la disputa de gobierno.
  - Consenso: objetivo medio = media de los ocho objetivos revisados en sep-oct (199,75 EUR); los agregadores (261-279) son anteriores a los recortes.
- 14-oct, 14:35: informe cerrado, 17 de 18 controles correctos y 1 explicado (regresión). **Rentabilidad a 12 meses v2: ponderada +12,4 %, base +12,5 % → Mantener (convicción baja); compra < 142,95 EUR; venta > 182,65 EUR; valor intrínseco 158,34 EUR (+8,2 %), DCF 174,69 EUR.** Detalle en revision-12m-2026-10-14.md. No pasa el requisito de calidad (ROIC del capital total 5-6 % frente a WACC del 7,32 %).

## Lecciones

- Con la red limitada a WebSearch, buscar antes en `informes/` del repo si la empresa aparece como comparable en otros análisis del día o de la semana (Hoya, Fielmann y Cooper tenían a EssilorLuxottica con sus múltiplos y sus fuentes): ahorra muchas búsquedas de comparables y transacciones, y da los tipos de cambio implícitos.
- EssilorLuxottica (y otros compradores grandes con PPA): el BPA publicado lleva ≈1,8 EUR de amortización de intangibles; el PER de comparables del motor se aplica al BPA publicado y sale bajo frente a pares que cotizan sobre BPA ajustado. Decirlo y pesar poco ese método.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 36.4x, mínimo 34.6x, media larga 38.7x; antes v2 33.7x/27.5x/33.7x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.

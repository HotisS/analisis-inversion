# Diario · Teleperformance (TEP) · 14-oct-2026

- Commit de partida: 58bdc41 (durante el análisis main avanzó a c581770 por otras sesiones; no se cambió de versión del prompt).
- Entorno: nube de Claude Code. La red solo deja salir a la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan. Las cifras salen de los resultados de búsqueda (comunicados de Business Wire, aviso del BALO, Stock Analysis, ABC Bourse, Digrin, prensa francesa) con la URL como fuente; lo que no cuadra va a `null` y a `meta.huecos`. Unas 30 búsquedas.
- Fecha de corte: 2026-10-14. Divisa: EUR. Cierre del ejercicio: diciembre. Precio: 74,62 EUR, cierre del 13-oct (ABC Bourse), porque la sesión del 14 estaba abierta.
- Confianza: **baja-media**. Cuenta 2021-2025 (ingresos, EBIT, beneficio, BPA, amortización) de agregadores cuadrada con los comunicados; balance parcial (caja, deuda y arrendamientos a 30-jun-2026; patrimonio de 2025 estimado con la ratio deuda/patrimonio); sin resultado financiero ni impuestos por año, sin beta propia (se usa 1,0), sin rentabilidades bursátiles, solo tres comparables, sin tamaño de mercado ni accionariado.
- Decisiones:
  - BPA publicado (no el ajustado de TP, que excluye ≈280 M al año de carteras compradas y reestructuración que se repiten). EBITDA publicado en el DCF.
  - Capex = capex del estado de flujos (2,5 %) + pagos de arrendamientos (3,1 %), porque los arrendamientos van al puente. Amortización del 6,8 % al 5,6 % (se agota la de Majorel).
  - Circulante al 0 % (sin dato de clientes; con un crecimiento del 1 % el efecto es irrelevante).
  - WACC 7,37 %: Bund 2,97 % (dato de junio; no se encontró el de octubre), beta 1,0 frente a 0,59-0,66 publicadas del ADR (datos viejos), prima adicional de 2 puntos por el riesgo de la IA.
  - Bajista duro (−4 puntos de crecimiento, −2,5 de margen, terminal −1 %) al 30 %: es lo que descuenta Concentrix; con un bajista más suave (−2 y −1,5) la ponderada pasaba del 15 % y daba Comprar, y no era verosímil.
  - Sostenibilidad «En parte»: las pruebas de financiación pasan (crecimiento del 0,8 % sin capital); la duda es el volumen. El base no se rebaja (ya supone volúmenes planos, por debajo del comparable de 2024-25).
  - ROIC del motor (13,2 %) inflado por el balance incompleto; el propio, 8,9 % (EBIT publicado × 0,68 sobre ≈8.080 M), +1,5 puntos sobre el WACC.
- 14-oct, 14:35: informe cerrado (17 controles: 15 correctos y 2 explicados), Word y PDF (soffice, 34 páginas). Rentabilidad a 12 meses v2: ponderada +12,2 %, base +17,2 % → **Mantener** (convicción media; compra < 72,79 EUR, venta > 93,00); objetivo 79,20 EUR; valor intrínseco 128,42 EUR (+72,1 %); DCF inverso: −4,9 % anual de ingresos. Detalle en revision-12m-2026-10-14.md.

## Lecciones

- En la nube, el BPA del escenario cuadra mal sin resultado financiero publicado: usar el BAI de los últimos 12 meses de Stock Analysis (que sale en la búsqueda) frente al EBIT para fijar el gasto financiero recurrente.
- Con la cuenta y el balance de agregadores, el motor calcula un capital invertido incompleto: dar el ROIC propio en `rentabilidad.comentario` y usar ese en la decisión.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 18.7x, mínimo 9.9x, media larga 20.9x; antes v2 11.35x/7.36x/12.7x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v2.json y «Teleperformance - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener 21,6 % (antes v3 Mantener 42,3 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 7,4x / 8,2x / 10,6x, 12,2 % Mantener; con el tope anterior del base (×1,3, 14-oct mediodía): 42,3 % Mantener. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).

# Diario · Group 1 Automotive (GPI) · 14-oct-2026

- Commit de partida: 541bf3c (método v2 con regla de múltiplos común, 04e4e35).
- Entorno: nube de Claude Code. La red solo deja salir a la búsqueda web (WebSearch); sec.gov, Yahoo, la web de la empresa y los demás dominios no resuelven, y WebFetch tampoco. Las herramientas `descargar.mjs` y `bolsa.mjs` no funcionan aquí. Las cifras salen de los resultados de búsqueda (comunicados de resultados del 8-K, 10-K citados por la búsqueda, prensa financiera), con la URL como fuente; lo que no se pueda cuadrar va a `null` y a `meta.huecos`.
- Fecha de corte: 2026-10-14. Divisa: USD. Cierre del ejercicio: diciembre.
- 14-oct, 10:40: informe cerrado con propio (supuestos, textos, resumen), 19 de 19 controles; Word y PDF (soffice). Rentabilidad a 12 meses v2: ponderada +7,5 %, base +9,0 % → Mantener (compra < 216 USD); valor intrínseco 378,53 USD. Detalle en revision-12m-2026-10-14.md.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (5 años; mediana 4.2x, mínimo 4.1x, media larga 7.2x; antes v2 9.6x/6.9x/8.3x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.

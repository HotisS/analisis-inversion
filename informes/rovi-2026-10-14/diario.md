# Diario · Rovi (ROVI.MC) · 14-oct-2026

- Commit de partida: 2657a59 (ANYCOLOR, 14-oct).
- Entorno: nube de Claude Code. La red solo deja la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan. Las cifras salen de los extractos de búsqueda (notas de resultados de Rovi de 2025, 1T26 y 1S26; TipRanks, Yahoo y MarketScreener; prensa financiera española), con la URL como fuente. Unas 25 búsquedas. Confianza: baja-media (cabeceras de resultados cruzadas; EBIT 2021-2023, impuestos, flujo operativo y circulante son estimaciones marcadas).
- Fecha de corte: 2026-10-14. Divisa: EUR. Cierre: diciembre. Precio: 58,94 EUR (capitalización de Stock Analysis del 7-oct ÷ 51,24 M de acciones; sin cierre del 13-oct).
- Sin subagentes; notas A-E escritas con `notas/build_notas.mjs`. Comparables reutilizados del informe de Almirall (7-oct), sin Rovi y con Almirall añadida.
- Decisiones: el badwill de 62,4 M de Phoenix (2T26) va como no recurrente en el LTM y fuera del BPA del objetivo; puente con la caja neta publicada (22,5 M); 2021-2022 fuera del PER histórico (pico de la vacuna).
- Sostenibilidad: con el primer base (crecimiento medio del 6,2 %, capex del 5 % a largo plazo) fallaba (financiable 4,1 %). Rebajado 0,5-1 punto en 2027-2033 y capex al 6,5-8,5 %: financiable 5,2 % frente a 5,3 % proyectado; veredicto «En parte».
- 12:56: informe cerrado, 18 de 18 controles; Word y PDF (soffice). Tiempo total ≈ 30 min.
- Línea 12 m: objetivo 65,80 EUR, ponderada +13,3 %, base +12,7 % → Mantener (compra < 51,53 EUR); valor intrínseco 51,53 EUR (−12,6 %). Detalle en revision-12m-2026-10-14.md. No se ha ejecutado `apuntar-12m.mjs` ni `seguimiento.mjs` (lo integra la sesión principal).

## Lecciones

- Con un ROIC incremental histórico negativo por un contrato extraordinario que se acaba (vacuna de Moderna), la prueba de capital nuevo compara contra el ROIC del último año; explicarlo en `controles_explicados`.
- Un badwill dentro del EBITDA se pone en `ltm.no_recurrentes_en_ebitda` con signo negativo; el PER LTM del motor sigue incluyéndolo en el beneficio neto, así que hay que decirlo en `multiplos_historicos.comentario`.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 21.2x, mínimo 11x, media larga 19.1x; antes v2 23.2x/18.3x/21.7x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.

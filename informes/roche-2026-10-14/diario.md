# Diario · Roche Holding (ROP, antes ROG) · 14-oct-2026

- Commit de partida: 90a6f2c.
- Entorno: nube de Claude Code. La red solo deja salir a la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no se usaron (sin red). Las cifras salen de los extractos de búsqueda de los comunicados de Roche (resultados 2025 y 1S26, Finance Reports 2022-2023, fact sheet 2024) y de Stock Analysis (SWX:ROP), con la URL como fuente. ~30 búsquedas. Confianza: media en cuentas, balance y consenso (cuadran entre sí: BAI − impuestos − minoritarios = beneficio publicado cada año; BPA NIIF 2021-2022 coincide con Roche); baja en sector, gobierno y bolsa (huecos registrados).
- Identificación: desde el 17-mar-2026 los Genussscheine (ROG) son Partizipationsscheine (ROP, ISIN CH1499059983), canje 1 por 1, mismos derechos económicos, sin voto. La acción al portador (RO, 106,7 M) vota. Se usa ROP. Divisa CHF, cierre en diciembre, NIIF. Próximas ventas: 22-oct (3T26).
- Precio: 334,30 CHF = capitalización de Stock Analysis (265.960 M) ÷ 795,62 M; el ADR (54,09 USD × 8 × ≈0,777) daba ≈336 el 9-oct. Ojo: Rankia y Digrin muestran 322,30, un dato antiguo.
- Decisiones: ingresos = ventas + royalties (Stock Analysis); DCF con margen EBITDA NIIF (36-36,5 %) y capex del 9 % (5,9 % histórico + compras de biotecnológicas); WACC 5,14 % (bono suizo 0,54 % + 1 punto adicional), terminal 0,5 %; minoritarios de Chugai a mercado (≈24.000 M CHF, cambio JPY/CHF estimado); pensiones sin dato (0). Comparables reutilizados de los informes de Novo Nordisk (8-oct) y CSL (9-oct). Objetivo 12 m en BPA core.
- 14-oct, 12:41: informe cerrado, 18 de 18 controles; Word (34 páginas) y PDF (soffice). Sostenibilidad: Sí. Rentabilidad a 12 meses v2: ponderada −0,7 %, base −3,9 % → Mantener, convicción baja (compra < 286,88 CHF; venta > 368,85). Valor intrínseco 366,92 CHF (+9,8 %); DCF 382,08. Detalle en revision-12m-2026-10-14.md.

## Lecciones

- Suiza: Roche canjeó los Genussscheine (ROG) por Partizipationsscheine (ROP, ISIN CH1499059983) el 17-mar-2026; los proveedores con ROG.SW pueden dar precios congelados (Rankia y Digrin: 322,30).
- Empresas con filial cotizada consolidada al 100 % y minoritarios grandes (Roche-Chugai): minoritarios del puente a valor de mercado, no en libros (24.000 frente a 4.078 M CHF), o el EV/EBITDA y el DCF salen inflados.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (3 años; mediana 23.7x, mínimo 15.9x, media larga 21.4x; antes v2 13.95x/13.2x/14.5x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.

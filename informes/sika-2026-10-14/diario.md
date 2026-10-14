# Diario · Sika AG (SIKA) · 14-oct-2026

- Commit de partida: 40ea1cd (regla de múltiplos v3 ya en main; `git pull --rebase` antes de empezar). **El informe sale con la regla v3** (`per_historico.base: "adelantado"`).
- Entorno: nube de Claude Code. La red solo deja WebSearch (≈27 búsquedas); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no se usaron. Las cifras salen de extractos de búsqueda de los comunicados de Sika (2021, 2023, 2025, 1T26, 1S26), de su página de datos de la acción, de los resultados de las juntas de 2025-2026 y de agregadores (Stock Analysis, TipRanks, MarketScreener, Investing, cash.ch), con la URL como fuente. Notas A-E escritas por mí sin subagentes (`notas/notas_build.py`).
- Confianza: **media** en cuenta de resultados, caja libre y guía (cifras de la empresa); **baja** en precio (último dato fechado: 185,35 CHF el 29-sep, MarketScreener; Morningstar 185,60 el 28-sep; no se encontró el cierre del 13-oct), balance (solo 2023-2025, sin circulante ni pensiones, de TipRanks; jun-26 de Stock Analysis), comparables (solo PER adelantado), bolsa (sin beta: 1,10 estimada) y cierres anuales (2022 y 2025 derivados de rentabilidades publicadas). `resumen.confianza` = Baja: por la decisión del 14-oct no podría salir Comprar; de todos modos la regla ya da Mantener.
- Fecha de corte: 2026-10-14. Divisa: CHF. Cierre: diciembre. NIIF. Acciones 160,48 M (capitalización publicada ÷ precio).
- Tiempos: 15:54 inicio · 16:05 fin de la investigación · 16:10 informe calculado, Word y PDF (soffice) · 16:15 revisión 12 m y diario.
- Decisiones:
  - Cuenta publicada con no recurrentes en `no_recurrentes_en_ebitda` (2022 −88,2; 2023 131,5; 2025 86). EBITDA 2022-2023 = EBIT + amortización de Stock Analysis (estimación); 2021, 2024 y 2025 de la empresa.
  - Balance: deuda total del agregador (incluye arrendamientos) en `deuda_financiera`, arrendamientos 0; sin circulante → `nwc_pct_ventas` 0 y ≈0,7 puntos de circulante metidos en el capex de la proyección.
  - WACC 6,63 %: bono suizo 0,54 % (del informe de Roche del repo), beta 1,10 estimada, prima 5,5 % + 1 punto (como Roche y Givaudan), deuda al 2 %, 16 % de deuda. Terminal 1,0 % en CHF.
  - Sostenibilidad: el motor no hace la prueba (amortización de intangibles comprados > capex); a mano, crecimiento financiable ≈3-3,5 % + precio frente a 5-5,5 % proyectado, con orgánico casi nulo en 2024-2025: **base rebajado medio punto en 2027-2029** (5,0/5,5/5,0 → 4,5/5,0/4,5) y veredicto «En parte». DCF de 182,37 a 176,88 CHF.
  - PER histórico adelantado sobre BPA ajustado (sin plusvalías ni costes de MBCC y Fast Forward), excluido 2021 (burbuja).
  - Comparables: Saint-Gobain, Holcim, RPM, Sherwin-Williams (búsqueda) y Geberit y Schindler (informes de Fluidra y Kone del repo). No se hizo ficha sectorial.
  - Convicción baja, la sugerida por el motor (absoluta Mantener, relativa Comprar).
- Resultado: **Mantener, convicción baja.** Valor intrínseco 174,92 CHF (−5,6 %); DCF 176,88; con la prima implícita del mercado, 235,66 (objetivo 221,27). DCF inverso: crecimiento 4,3 % (base 3,7 %) o margen 21,7 % (base 21 %). 18 de 19 controles correctos y 1 explicado (fuentes sin citar). 60 fuentes.
- Línea 12 m (v3): objetivo 232,42 CHF → ponderada +27,4 %, base +29,0 % (PER 21,6 / 27,0 / 31,4x × BPA 7,43 / 8,72 / 9,50) → Mantener porque el valor intrínseco queda bajo el precio; compra < 174,92 CHF, venta > 262,35 CHF. Consenso 197,36 CHF (22 analistas), al alza. Requisitos de MEMORIA: rentabilidad sí; valor intrínseco no (pasaría < 174,92); calidad no (sostenibilidad «En parte», ROIC − WACC 3,7 puntos). Detalle en `revision-12m-2026-10-14.md`.
- Pendiente (no hecho por encargo): `apuntar-12m.mjs`, `seguimiento.mjs`, cola, commit y push.

## Lecciones

- Cuando el agregador no da circulante (balance incompleto), poner `nwc_pct_ventas` a 0 y meter la inversión en circulante estimada en el capex de la proyección evita el salto artificial del primer año y mantiene la caja libre honesta; decirlo en la justificación de inversión.
- Sin cierres anuales directos, la capitalización a 31-dic de la página de la acción de la empresa ÷ acciones y la rentabilidad anual del discurso del presidente en la junta dan cierres razonables para el PER adelantado.

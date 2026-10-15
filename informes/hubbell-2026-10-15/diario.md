# Diario · Hubbell (HUBB) · 15-oct-2026

- Commit de partida: 30aee4a. Encargo del coordinador (megatendencia electricidad: red eléctrica y centros de datos). Sin subagentes, sin commits ni escritura fuera de la carpeta.
- Entorno: nube de Claude Code. Cuentas 2019-2025 del XBRL de la SEC (`cuentas.mjs --sec HUBB`, CIK 48898) y companyfacts; 10-K 2025 y 2023, 10-Q 2T26, notas de resultados 3T25-2T26, 8-K de NSI, proxy 2026, Form 4 (`form4.mjs`). Precio y cierres con `bolsa.mjs`; movimiento con `movimiento.mjs`. Consenso y estadísticas de Stock Analysis (WebFetch). Comparables y transacciones reutilizados de la nota D de eaton-2026-10-15 (mismo día), sin Vertiv. Tasa libre FRED DGS10 5,21 % (curl).
- Fecha de corte 2026-10-15; precio cierre 14-oct (473,37 USD; la sesión del 15-oct en curso, 462,63 a mediodía). USD, ejercicio natural, US GAAP. BPA GAAP en todo.
- Decisiones: 2019-2022 con operaciones continuadas (alumbrado C&I vendido en 2022); 2016-2018 fuera; pasivo_total 2023 corregido (7.081,1 − 2.877 − 12,3) porque el XBRL mezclaba la cifra previa a la reexpresión; puente a 30-jun-2026 tras NSI (deuda 5.372,6; caja e inversiones 498,4; pensiones netas 87,6). Pesos DCF 60 / escenarios 30 / comparables 10. WACC 9,48 % (beta 1,0). Sostenibilidad «Sí» (motor y analista).
- Resultado: DCF 317,82; valor intrínseco 346,00 (−26,9 %); DCF inverso 14,0 % de crecimiento anual (base 6,4 %); con la prima del mercado 418,73.
- **Línea 12 m (v3)**: objetivo 516,13 USD, ponderada +10,2 %, base +11,5 %; **Mantener**, convicción media. v2 18,3 % / 13,8 %. Comprar < 346,00; vender > 579,78. Robustez SÓLIDA, acción robusta «No mantener» (no comprar); BPA −10 %: −0,7 % / 0,4 %.
- Calidad: ROIC del motor 18,6 % (2025) − WACC 9,48 = 9,1 puntos; tras NSI, estimación propia ≈12-13 % (≈3 puntos).
- Word y PDF (soffice): 19 de 19 controles; cobertura 85,7 %; 38 páginas. Próximos resultados: 27-oct-2026.

## Lecciones
- Empresas de EE. UU. con desinversiones antiguas (Hubbell, alumbrado 2022): el XBRL da ventas y EBIT reexpresados pero `NetIncomeLoss`/BPA con las discontinuadas; usar `IncomeLossFromContinuingOperations` y `...PerDilutedShare` para 2019-2022.
- El XBRL de Hubbell da los dividendos pagados de 2021-2025 bajo `PaymentsOfDividendsMinorityInterest` (etiqueta errónea); `cuentas.mjs` los deja n.d.
- `pasivo_total` del XBRL puede venir de antes de una reexpresión mientras el activo es el reexpresado: el control activo = pasivo + patrimonio lo detecta.
- MarketScreener: la URL adivinada con el código de otra empresa devuelve otra compañía (salió una en EUR): comprobar nombre y divisa en la respuesta.

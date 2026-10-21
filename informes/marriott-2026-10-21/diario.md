# Diario: Marriott International (value, corte 2026-10-21)

- Commit de partida: `04b3e9075d886e8c43eaa5a3c6fc7e27b0387820` (21-oct-2026, 15:49 UTC). Checkout compartido con otros análisis en paralelo: sin git en esta tarea (lo hace el coordinador).
- Inicio ≈ 15:50 UTC; Word y PDF a las 16:16 UTC; robustez y cierre a las 16:18 UTC (reloj del contenedor).
- No había informe anterior de Marriott: análisis desde cero.

## Decisiones

1. **Base de ingresos = ingresos ajustados** de la empresa (sin los ingresos de costes reembolsados, 19.204 M USD en 2025, el 73 % de las ventas GAAP, sin margen). EBIT = resultado operativo GAAP; `no_recurrentes_en_ebitda` = ajustado − GAAP, así que el motor trabaja con el resultado operativo ajustado. Amortizaciones = depreciación + amortización de la inversión en contratos («key money»).
2. **Pagos en acciones como coste** (el EBITDA ajustado de la empresa los suma; aquí no). La inversión del DCF incluye la inversión en contratos (434 M en 2025), que en las cuentas va dentro del flujo operativo.
3. **Pasivo de fidelidad** (7.992 M a fin de 2025; 8.444 M en junio de 2026) tratado como financiación de explotación (crece con el sistema y se repaga en noches cuyo coste ya está en la proyección): fuera del puente y del circulante. Si fuera deuda, ≈ −32 USD por acción (dicho en la lectura del DCF).
4. **Patrimonio negativo**: ROE no informativo (control explicado). ROIC del motor 29,7 % (capital de financiación); medida exigente sin restar la fidelidad ≈ 16,0 %. ROIC − WACC ≥ 5 en las dos: calidad pasa.
5. **Circulante**: clientes = cobros + anticipos; proveedores = cuentas a pagar + nóminas y gastos devengados (−466 M, −6,7 %); sin ello el motor veía un +29,9 % y un flujo falso de 2.557 M el primer año.
6. **Historia del PER adelantada** con BPA ajustado: 2018 sin plusvalías (5,56) y 2023 sin beneficios fiscales (8,47) normalizados; 2019 y 2020 excluidos (BPA de la pandemia), igual que el análisis de Hilton del mismo día.
7. **Sin recompras no anunciadas** en el BPA (259 M de acciones en 2027-2028): 13,03 frente a 13,15 del consenso en 2027.
8. WACC 10,22 % (beta ajustada propia 1,11; Hilton/IHG usaron 1,05). Crecimiento terminal 3,0 %.
9. Sin ficha sectorial de hoteles (la restricción del encargo impide escribir en `sectores/`): sector y comparables apoyados en los análisis de IHG (20-oct) e Hilton (21-oct). Pendiente para el coordinador: ficha corta de hoteles.
10. Regla 13: subida de un mes (+16,5 %) de todo el sector (Hilton +17 %, Hyatt +13 %, IHG +11 %; S&P 500 plano), sin noticia propia: **no cambia**.

## Resultado

- Regla v3: ponderada −10,2 % / base −0,5 % → **Vender** (v2 −9,5 %, Mantener). Con la sesión (405,41 USD): −12,0 % / −2,5 %.
- DCF 155,82 USD; valor intrínseco 170,93 USD; precio 397,31.
- `robustez.mjs`: SÓLIDA, acción robusta «No mantener»; límite de compra común 170,93 USD.
- Controles: 20 de 21 correctos y 1 explicado (tipo de 2023).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales 2016-2025 | `cuentas.mjs --sec MAR` (XBRL SEC) | 10-K 2025 (presentado el 10-feb-2026) |
| Balance y flujos del 1S26, acciones | 10-Q 2T26 | 30-jun-2026 (acciones a 27-jul-2026) |
| Ajustados, guía, trimestres | Notas de resultados 4T20-4T25, 3T25, 1T26, 2T26 | hasta 3-ago-2026 |
| BPA ajustado 2018-2019 | Nota del 4T19 | 26-feb-2020 |
| Gobierno y retribución | Proxy 2026; 8-K de la junta | 27-mar-2026; 8-may-2026 |
| Directivos | 8-K | 14-jul-2025; 9-ene-2026 |
| Deuda y calificación | 8-K línea de crédito; 424B5 de agosto | 24-sep-2026; 11/13-ago-2026 |
| Insiders | `form4.mjs` | 21-oct-2025 a 21-oct-2026 |
| Bolsa (precio, beta, cierres) | `bolsa.mjs` | cierre del 20-oct-2026 |
| Consenso y comparables | `yahoo-datos.mjs` (quoteSummary) | 21-oct-2026, 15:55 UTC |
| Bono a 10 años (5,12 %) | Tesoro de EE. UU. | 20-oct-2026 |
| Prima del mercado (4,2 %) | Damodaran | oct-2026 |
| Noticias y sentimiento | Seeking Alpha RSS, Stocktwits, búsqueda web | hasta 21-oct-2026 |
| Regla 13 | `movimiento.mjs MAR` (y HLT, H, IHG, SPY, XLY) | 21-oct-2026 |
| Integración y cálculo | `integrar.mjs`, `calcular-empresa.mjs` | 21-oct-2026 |
| Word y PDF | `rellenar.mjs`, LibreOffice | 21-oct-2026 16:16 UTC |
| Revisión 12 m | `apuntar-12m.mjs marriott-2026-10-21` | 21-oct-2026 (repetido a las 16:18 UTC) |
| Precio | `precios.mjs MAR` | cierre 20-oct 397,31; sesión 21-oct ≈ 405,1-405,4 (16:17-16:18 UTC) |
| Robustez | `robustez.mjs` (cierre y `--actual`) | 21-oct-2026 16:17 UTC |

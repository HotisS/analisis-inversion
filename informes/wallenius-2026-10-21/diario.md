# Diario: Wallenius Wilhelmsen (WAWI), análisis value del 21-oct-2026

- Commit de partida: `d2977589ca710f25edf7eec154dccbc8edd93c12` (16:34 UTC). Checkout compartido con otro análisis en paralelo: sin pull, commit ni push desde este hilo.
- Inicio: 16:35 UTC.
- Análisis nuevo, método completo (no hay informe anterior de Wallenius Wilhelmsen en `informes/`). Notas A-E escritas por el analista (sin subagentes).
- Fin: 17:15 UTC (≈ 40 minutos).

## Decisiones

- Cuentas: ESEF de filings.xbrl.org (`cuentas.mjs --esef`) para 2020-2024; 2025 y el 1S26 del informe anual 2025 y los trimestrales (el ESEF de 2025 no estaba publicado). Cuenta por naturaleza.
- Divisa: informe en USD; precio y cierres de NOK a USD con Norges Bank (0,106868 USD/NOK el 21-oct-2026), como Equinor.
- Opción de venta de HMG sobre el 20 % de EUKOR tratada como minoritarios (balance y puente: 386 M a valor actual a 30-jun-2026).
- NIIF 16: arrendamientos (1.490 M) en el puente como deuda; las altas de derechos de uso (fletamentos nuevos) cuentan como inversión en el DCF.
- Ciclo: margen EBITDA de mitad de ciclo del 25 % desde 2030e (2019-2021: 16-22 %; 2022-2025: 30-35 %); bajista −5 pp, alcista +4 pp. Barcos encargados (14 Shaper, 1.400 M pendientes, y 4 LNG) en una inversión del 19-21 % de las ventas en 2026e-2027e.
- BPA normalizado: 2025 sin la plusvalía de MIRRAT (2,09) en la historia del PER; casos sin no recurrentes.
- WACC 9,85 %: Tesoro de EE. UU. 5,12 %, beta 1,2, prima 4,2 % + 1 punto (ciclicidad, flotante del 27 %, control familiar).
- Sostenibilidad «No» aunque las pruebas del motor pasan: la calidad no sostiene el margen ni el ROIC de pico; el base ya los baja.
- Comparables: PER NTM con el consenso de Yahoo; EV/EBITDA de los japoneses y EV/ventas de todos fuera (bases no comparables).
- Tipo impositivo (tonelaje) explicado en `controles_explicados`. Controles: 21 correctos y 3 explicados.
- Regla 13: veredicto «retrasa» (resultados del 4-nov y fin de la suspensión de las tasas USTR el 9-nov); no cambia la venta.
- `apuntar-12m.mjs` marca REVISAR (v3 −35,8 % frente a v2 −64,0 %): revisado a mano en `revision-12m-2026-10-21.md`; ambas dan Vender.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas 2020-2024 | `cuentas.mjs --esef` (filings.xbrl.org) | ejercicios 2020-2024 |
| Cuentas 2025 | Informe anual 2025 (Oslo Børs) | 31-dic-2025 (publicado 19-mar-2026) |
| Último trimestre y balance | Informe del 2T26 | 30-jun-2026 (publicado 11-ago-2026) |
| Guía y colocación | Comunicados de Oslo Børs (newsreader) | 6-oct-2026 (colocación), 14-oct (registro) |
| Bolsa, beta, cierres | `bolsa.mjs` (Yahoo) | cierre 21-oct-2026 |
| Consenso y comparables | Yahoo quoteSummary; MarketScreener | 21-oct-2026 |
| Tipo de cambio | Norges Bank | 21-oct-2026 |
| Tasa libre | Tesoro de EE. UU. (curva diaria) | 20-oct-2026 |
| Prima de mercado | Damodaran (ERPbymonth) | oct-2026 |
| Regla 13 | `movimiento.mjs WAWI.OL` | 21-oct-2026 |
| Precio de la decisión | `precios.mjs WAWI` | cierre 21-oct-2026 (174,80 NOK) |
| Revisión 12 m | `apuntar-12m.mjs wallenius-2026-10-21` | 21-oct-2026 |
| Robustez | `robustez.mjs --actual` | 21-oct-2026 |
| Sentimiento | Nordnet, TradingView, Simply Wall St | oct-2026 (SWS dic-2025) |

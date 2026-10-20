# Diario: ExlService (EXLS), análisis value del 20-oct-2026

- Commit de partida: `d6a592463882f7770cb589dc1d5112e1a2c27ea8` (20-oct-2026 12:19:30 UTC). Checkout compartido con otro análisis en paralelo: sin pull, commit ni push desde este encargo; no se tocan cola.md, MEMORIA.md, METODO-VIGENTE.md, lecciones, seguimiento ni cobertura.
- Primer análisis de EXL en el repo (no hay informe anterior): metodología completa desde cero.
- Inicio ≈ 12:21 UTC. Notas A-E hechas por el analista, en orden (sin subagentes), con Cardinal Health como modelo de forma.

## Tiempos (UTC)
- 12:21 lectura de CLAUDE.md, METODO-VIGENTE.md, MEMORIA.md, procedimiento, prompt y lecciones; carpeta y símbolo en `simbolos.json`.
- 12:22-12:35 cuentas XBRL (SEC), documentos (10-K 2025, 10-Q 2T26, notas de resultados 2021-2026, 8-K, proxy 2026), bolsa, movimiento, noticias, Form 4 y Yahoo.
- 12:35-12:40 notas A-E (`notas/construir-notas.mjs`).
- 12:40-12:48 comprobación de la fuente D7 (WNS-Capgemini), propio (`supuestos.mjs`, `propio.mjs`, `textos.mjs`), integración, cálculo (20 de 20 controles), Word y PDF.
- 12:48 `apuntar-12m.mjs`, `precios.mjs EXLS` y `robustez.mjs --actual` con el cierre del 19-oct.
- 12:50-13:32 espera a la apertura de Nueva York (el reloj del contenedor no era fiable; hora tomada de la cabecera HTTP de Google).
- 13:32 `precios.mjs EXLS` y `robustez.mjs --actual` con el precio de la sesión: 40,57 USD (13:32 UTC, Yahoo).

## Decisiones
- **Base del BPA: «con pagos en acciones»** (publicado + amortización de intangibles comprados y costes de compras, netos de impuestos), ni el ajustado de la empresa (que excluye 79,5 M USD de pagos en acciones, 3,8 % de las ventas) ni el GAAP puro. El DCF usa el mismo criterio (margen EBITDA GAAP). Consecuencia: el PER en esta base es ≈ 20-25 % más alto que el «oficial», a los dos lados de la comparación (actual e historia).
- Cuentas de 2016-2020 corregidas por el desdoblamiento 5×1 de 2023 (BPA ÷ 5, acciones × 5); coste de ventas desde 2018 tomado del concepto XBRL `CostOfGoodsAndServiceExcludingDepreciationDepletionAndAmortization`.
- Historia del PER desde 2018 (fuera 2016-2017 por la reforma fiscal de EE. UU.). PER actual con el BPA de 2027e (el ejercicio siguiente, como pide el prompt); con el de los próximos 12 meses sería 20,5x en vez de 20,1x, sin cambiar la señal.
- WACC con 0,5 puntos de prima adicional por el riesgo de sustitución por la IA (la beta histórica no lo recoge) y beta 1,0. Con la prima del mercado el DCF sube a 32,60 USD y sigue bajo el precio: la señal no depende de la tasa.
- Puente: iMerit (170 M pagados el 3-ago-2026, después del balance de junio) más 70 M estimados de los hasta 140 M aplazados se restan como otros ajustes; la disputa fiscal de la India (44,4 M) no se resta (recurrida, sin provisión).
- Fuente D7 (WNS-Capgemini) comprobada en la nota de Capgemini (76,50 USD por acción, ≈ 3.300 M sin deuda neta, cierre el 17-oct-2025) y en el 8-K de WNS (prima del 28 % sobre la media ponderada de 90 días).
- Sin ficha de sector previa (servicios de TI y procesos): no se hace aquí porque el encargo limita la escritura a esta carpeta; el sector está en la nota B. Queda para el hilo principal.
- Riesgo de IA: exposición alta, sentido mixto, efecto −35 a +15 % a 3-5 años; es el bajista del DCF (−4 puntos de crecimiento y −1,5 de margen).

## Resultado
- Recomendación: **Mantener**, convicción media. Objetivo a 12 meses 49,28 USD (ponderada +23,9 %, base +22,8 %; v2 +15,2 % / +11,7 %; BPA −10 % +11,5 % / +10,6 %). Valor intrínseco 26,16 USD (−34,2 %); DCF 27,36. ROIC 28,4 % frente a WACC 10,46 % (+18 puntos); sostenibilidad «Sí». Regla 13: no cambia.
- Revisión a 12 meses: `revision-12m-2026-10-20.md`, apuntada con `apuntar-12m.mjs` (v3 23,9 % / 22,8 % → Mantener; v2 15,2 % Mantener).
- Robustez con el cierre del 19-oct (39,76 USD): SÓLIDA; acción robusta «No mantener»; límite común de compra 26,16 USD.
- Robustez con la sesión del 20-oct (40,57 USD a las 13:32 UTC): SÓLIDA; acción robusta «No mantener»; v3 21,5 % / base 20,4 %; v2 12,9 % / 9,5 %; BPA −10 % 9,3 % / 8,4 %; valor intrínseco un 36 % bajo el precio; límite común 26,16 USD.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas anuales 2016-2025 | `cuentas.mjs --sec EXLS` (XBRL de la SEC, CIK 0001297989) | 10-K 2025 (31-dic-2025) |
| Trimestres, balance y deuda | 10-Q del 2T26 y notas de resultados (SEC) | 30-jun-2026 (acciones a 24-jul-2026) |
| Guía 2026 | Nota de resultados del 2T26 | 28-jul-2026 |
| Crédito de 1.000 M e iMerit | 8-K | 18-ago-2026 y 3-ago-2026 |
| Precio, cierres anuales, beta, volatilidad | `bolsa.mjs --accion EXLS --indice SPY --sector XLK` | cierre del 19-oct-2026 |
| Regla 13 (movimiento) | `movimiento.mjs EXLS` | 19-oct-2026 |
| Noticias de 12 meses | `noticias.mjs` (Google Noticias, Yahoo, 8-K) | 20-oct-2025 a 20-oct-2026 |
| Operaciones de directivos | `form4.mjs` (SEC) | 20-oct-2025 a 20-oct-2026 |
| Consenso, objetivos y comparables | Yahoo Finance quoteSummary | 20-oct-2026 12:33 UTC |
| Tasa libre | Tesoro de EE. UU., 10 años 5,15 % | 19-oct-2026 |
| Prima implícita del mercado | Damodaran, 4,20 % | oct-2026 |
| Tamaño del sector | Gartner (servicios de TI) | previsión de 2026 |
| WNS-Capgemini | Nota de Capgemini y 8-K de WNS | 7-jul y 17-oct-2025 |
| Precio en `precios.json` | `precios.mjs EXLS` | 19-oct-2026 (12:48 UTC) |
| Robustez con el cierre | `robustez.mjs --actual` | 19-oct-2026 (12:48 UTC) |
| Precio de la sesión | `precios.mjs EXLS` (Yahoo) | 20-oct-2026 13:32 UTC (40,57 USD) |
| Robustez con la sesión | `robustez.mjs --actual` | 20-oct-2026 13:32 UTC |

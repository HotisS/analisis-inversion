# Diario: United Therapeutics (UTHR), análisis value del 21-oct-2026

- Commit de partida: `8c0d1eb` (MONY Group…), 08:09 UTC. Checkout compartido con otro análisis en paralelo: sin pull, commit ni push desde este hilo.
- Inicio: 08:09 UTC. Informe, robustez y revisión terminados a las 08:40 UTC (reloj del sistema). Comprobación con la sesión de Nueva York: ver «Precio del día» abajo.
- Análisis nuevo, método completo (no hay informe anterior de UTHR). Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`, con la forma de `informes/cardinal-health-2026-10-19/`.

## Decisiones

1. **Ejercicio natural**; ejercicio objetivo de la regla a 12 meses: **2028e**. PER actual = precio ÷ BPA propio de 2027e (29,77) = 18,6x, la misma base que la historia adelantada.
2. **BPA GAAP diluido** (la empresa no publica ajustado; el consenso de Yahoo es GAAP). Fórmula calibrada con 2025 (27,87 frente a 27,86). Intereses de la caja solo recurrentes (≈ 3,5 %), sin plusvalías de participadas. **El cobro de Liquidia (185 + 145,4 − 10 M) no entra en el BPA**: va al puente después de un 21 % de impuestos (+253 M).
3. **Acciones después de las recompras de septiembre**: 42,9 M (4-sep) − 0,72 M (entrega inicial de la ASR de 477,6 M) − ≈ 0,22 M pendientes + ≈ 3,2 M de opciones = 45,2 M diluidas; la caja del puente resta los 500 M pagados desde el 30-jun (ASR + 22,4 M en mercado). `otros_ajustes` = −500 + 253 = −247. La capitalización publicada (básica) no cuadra con la calculada (diluida): explicado en `controles_explicados`.
4. **Historia del PER**: excluido el cierre de 2018 (BPA de 2019 negativo, −2,39 USD, por el pago a Arena por ralinepag llevado a I+D). Para el cierre de 2025, ÷ nuestro 2026e (26,6 = consenso).
5. **WACC 10,52 %**: beta 0,80 por encima de la medida (0,50; ajustada 0,67) por los hechos binarios, y prima adicional de 1 punto por la concentración en el treprostinil con genéricos a la vista. Sin deuda.
6. **Crecimiento**: 2026e fijo (−0,4 %); 2027e +11,4 % y 2028e +14,2 % (FPI aprobada en abril de 2027 y ralinepag, menos genéricos de Orenitram y fin de Adcirca), por debajo del consenso de 2027 (+13,9 %). Mercado final 2030e de HAP + FPI (15.750 M) en el mismo perímetro que la cuota (25,6 %): cuota implícita 31,3 %, pasa.
7. **Programa de órganos**: sin ventas, no se valora (suma de partes no aplica); su capex sí está en el DCF (13 % y 10 % de las ventas en 2026e-2027e).
8. **Competencia**: Yutrepia (170,4 M en el 2T26; solo HAP tras el acuerdo) y Winrevair (588 M, +75 %) en el bajista (−4 puntos de crecimiento, −3 de margen).
9. **Riesgo de IA**: exposición baja, mixto, ±2 %.
10. **Regla 13**: «no cambia» (sin avisos P; cada movimiento fuerte tiene causa: ensayos TETON, sentencia, recompra; tendencia lateral, así que los resultados del ≈ 28-oct no retrasan).
11. Sin guía anual publicada: `directivos.historial_guidance` queda vacío (cobertura de la sección por debajo del 60 %). Sin EBITDA NTM de comparables ni consenso de 2028e: huecos registrados.

## Resultado

- Regla a 12 meses (v3, sin marcas del selector): ponderada −5,8 %, base +6,3 % → **Mantener**; v2 de control +0,2 % / +10,1 %. BPA −10 %: −15,2 % / −4,3 %.
- Valor intrínseco 485,24 USD (−12,4 %); DCF 505,50 (WACC 10,52 %); con la prima del mercado 569,42.
- Calidad: ROIC 53,6 % − WACC 10,5 % = +43 puntos; sostenibilidad «Sí».
- Robustez: SÓLIDA, acción robusta «No mantener»; límite de compra 453,70 USD (v2 482,38); límite robusto 408,50.
- Controles: 19 de 20 correctos y 1 explicado (capitalización básica frente a diluida).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales 2021-2025 y trimestres | `herramientas/cuentas.mjs` (XBRL de la SEC) | 10-K 2025, presentado el 25-feb-2026; 10-Q 2T26 del 5-ago-2026 |
| Documentos primarios | 10-K 2025 y 2024, 10-Q 2T26, notas de resultados 3T25-2T26, 8-K (Liquidia, ASR de 2025 y 2026, TETON-1 y 2, ralinepag, consejo, junta, crédito), proxy 2026, nota del 20-oct-2026 | 28-abr-2025 a 20-oct-2026 |
| Competencia | Notas del 2T26 de Liquidia y Merck; comunicado del sNDA en FPI | 4-ago a 2-sep-2026 |
| Mercado (HAP, FPI) | IMARC, Coherent | 2025-2026 |
| Datos de bolsa | `herramientas/bolsa.mjs` (Yahoo) | cierre del 20-oct-2026 |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo quoteSummary) | 21-oct-2026 (cierre del 20-oct) |
| Tasa libre | Tesoro de EE. UU., curva diaria | 20-oct-2026 (5,12 %) |
| Prima de mercado | Damodaran, ERPbymonth | oct-2026 (4,20 %) |
| Directivos | `herramientas/form4.mjs` | 21-oct-2025 a 21-oct-2026 |
| Sentimiento | Stocktwits, Seeking Alpha (RSS) | hasta el 21-oct-2026 |
| Movimiento (regla 13) | `herramientas/movimiento.mjs UTHR` | cierre del 20-oct-2026 (553,88 USD) |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 21-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 21-oct-2026 |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs united-therapeutics-2026-10-21` | precio 553,88 (20-oct) |
| Símbolo | `verticales/empresa/simbolos.json` (entrada UTHR añadida) | 21-oct-2026 |
| Precios | `herramientas/precios.mjs UTHR` | cierre del 20-oct-2026 |
| Robustez | `herramientas/robustez.mjs … --actual` | cierre del 20-oct (08:38 UTC, antes de la apertura) |

## Precio del día

- 10:40 UTC: `precios.mjs UTHR` y `robustez.mjs --actual` repetidos. Nueva York aún no ha abierto (13:30 UTC): sigue el cierre del 20-oct (553,88 USD) y el resultado no cambia. La espera hasta la apertura se cortó al llegar al tiempo máximo de la tarea en segundo plano. **Pendiente**: repetir las dos herramientas con la sesión del 21-oct. La señal solo cambia por debajo de 453,70 USD (−18 %) o por encima de 579,73 (+4,7 %).

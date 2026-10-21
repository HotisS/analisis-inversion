# Diario: Viper Energy (VNOM), análisis value del 21-oct-2026

- Commit de partida: `2f975a604501a30f62505de0d1fbc52ccdfde06d` (14:37 UTC). Checkout compartido con otros análisis en paralelo: sin pull, commit ni push desde este hilo.
- Inicio: 14:39 UTC. Fin: ≈ 15:12 UTC (reloj del sistema).
- Análisis nuevo, método completo (no hay informe anterior de Viper). Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`, siguiendo la forma de `informes/cardinal-health-2026-10-19/`; parte propia en `notas/propio.mjs`, `supuestos.mjs` y `textos.mjs`.

## Decisiones

1. **Valor por unidad económica (Up-C)**: acciones A + OpCo Units con acción B + opción de TWR IV = 369,7 M de unidades; DCF de los flujos de OpCo con impuesto completo (28 %), minoritarios del puente = 0. El BPA de la regla es por unidad (= ajustado de la acción A; 2T26 0,81 frente a 0,76 publicado).
2. **Cuentas en dos CIK**: la sociedad nueva tras Sitio (CIK 2074176, 2023-2025) y la anterior (CIK 1602065, 2020-2024, en `notas/xbrl-antiguo/`); 2020-2022 comprobados con el 10-K 2022.
3. **Deterioros de techo (full cost)** de 69 M (2020) y 768 M (2025) en `no_recurrentes_en_ebitda`; fuera del BPA normalizado.
4. **Petróleo en escenarios, no un precio**: base = curva de futuros del WTI del 21-oct (≈ 88 USD en 2026-2027, 77 en 2028, 71 en 2029, 69 en 2030); bajista 68/60/60/62 (paz con Irán, OPEP+); alcista 95/90/85/80 (Ormuz cortado en 2027). Perfiles por año en `escenarios.casos[].perfil`.
5. **Capex = compras de derechos para sostener el volumen**: cero hasta 2029 (perforan los operadores), del 3 % al 16 % de los ingresos en 2030-2035, igual a la amortización en el terminal; g terminal 1 % (+2 % precio, −1 % volumen). Una primera versión con capex hasta el 26 % daba 32,56 USD: se suavizó porque una regalía no paga pozos y el inventario en desarrollo cubre varios años.
6. **Historia del PER adelantada** en BPA normalizado por unidad; se excluye 2021 (divide por el BPA de pico de 2022, lección de energía); 2024 (32,5x) se queda (2,2 veces la mediana). Mediana 14,5x, mínimo 9,1x (2020).
7. **Dividendo ordinario 2,00 USD** (base desde el 3T26); los 0,45 USD restantes del LTM como extraordinario (variable antiguo).
8. **Puente** a 30-jun-2026: deuda 1.695, caja 77, otros ajustes +113 (Riverbend 314 + recompras de julio 29 − caja retenida en el 3T ≈ 120 − flujo del 1 al 21-oct ≈ 110).
9. **Sin ficha sectorial**: no hay de petróleo y regalías y el encargo limitaba la escritura a esta carpeta; el sector va en la nota B.
10. **Regla 13**: veredicto «no cambia» (tendencia lateral, resultados a 12 días, colocación de Diamondback posible pero no anunciada; caídas de −5,9 % y −6 % explicadas por la colocación de marzo y por Diamondback el 16-sep).

## Resultado

- Regla a 12 meses (v3, sin marcas del selector): ponderada −18,3 %, base −18,2 % (con dividendo) al cierre → **Vender**; v2 de control −10,3 %. Con la sesión (46,06 USD): −18,6 % / −18,5 %.
- Valor intrínseco 37,28 USD (−18,7 %); DCF 36,27 (WACC 9,77 %); con la prima del mercado 40,64.
- Calidad: ROIC 5,4 % (2025) frente a WACC 9,77 % → no pasa; sostenibilidad «Sí».
- Robustez (`--actual`): SÓLIDA, acción robusta «No mantener»; límite de compra 32,59 USD (v2 35,35), límite robusto 29,52; BPA −10 %: −26,0 % / −25,9 %.
- Controles: 19 de 23 correctos y 4 explicados (tipos fiscales de 2023 y 2024, circulante de 2025 inflado por Sitio, salto de caja por volumen y precio).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales 2020-2025 | `herramientas/cuentas.mjs --sec VNOM` (CIK 2074176) y CIK 1602065 (XBRL de la SEC) | 10-K 2025, presentado el 25-feb-2026 (cierre 31-dic-2025) |
| Trimestres y LTM | 10-Q del 2T26 y notas de resultados 3T24-2T26 | 30-jun-2026 (10-Q del 5-ago-2026) |
| Documentos primarios | 10-K 2020, 2022, 2024 y 2025; proxy 2026; 8-K de dic-2025 a sep-2026; resultados de Sitio y de Diamondback | 2021 a 8-oct-2026 |
| Datos de bolsa | `herramientas/bolsa.mjs` (Yahoo) | cierre del 20-oct-2026 |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo quoteSummary) | 21-oct-2026 |
| Curva de futuros WTI, Brent y Henry Hub | Yahoo (CME/NYMEX) | 21-oct-2026 (sesión) |
| Previsión de petróleo | EIA, Short-Term Energy Outlook | octubre de 2026 (7-oct) |
| Tasa libre | Tesoro de EE. UU., curva diaria | 20-oct-2026 |
| Prima de riesgo del mercado | Damodaran | octubre de 2026 |
| Directivos y accionistas | `herramientas/form4.mjs`, proxy, 10-Q | 21-oct-2025 a 21-oct-2026 |
| Noticias (12 meses) y sentimiento | Búsqueda web, Seeking Alpha, Stocktwits, 8-K | hasta 21-oct-2026 |
| Regla 13 | `herramientas/movimiento.mjs VNOM` | 21-oct-2026 (sesión, 46,10) |
| Precio de referencia y de hoy | `herramientas/precios.mjs VNOM` | cierre 20-oct (45,85); sesión 21-oct (46,06, ≈ 15:05 UTC) |
| Robustez | `herramientas/robustez.mjs --actual` | 21-oct-2026, 46,06 USD |

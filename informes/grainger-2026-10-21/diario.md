# Diario: Grainger (GWW), análisis value completo, corte 21-oct-2026

- Commit de partida: `04b3e9075d886e8c43eaa5a3c6fc7e27b0387820` (checkout compartido con otros análisis en paralelo: sin pull, commit ni push en esta tarea).
- Inicio ≈ 15:50 UTC del 21-oct-2026; fin ≈ 16:20 UTC (hora del sistema). Nueva York abierto durante todo el análisis.
- Iteración nueva y desde cero: no había informe anterior de Grainger en `informes/`.

## Decisiones

1. **Precio del informe**: cierre del 20-oct (1.335,96 USD). Sesión del 21-oct: 1.344,05 (≈ 15:50 UTC, `movimiento.mjs`) y 1.345,85 (16:14 UTC, `precios.mjs`), usada en `robustez.mjs --actual`.
2. **Amortización**: la del estado de flujos (254 M en 2025), no el concepto del XBRL (330 M), que incluye el gasto no monetario de los arrendamientos operativos. EBITDA = EBIT + esa amortización.
3. **MonotaRO**: consolidada al 100 % en el DCF; su 49,5 % ajeno se resta en el puente **a valor de mercado** (1.129.692 M JPY a 158,13 JPY/USD con el BCE del 20-oct = 7.144 M USD × 49,5 % = 3.536 M), no al contable (405 M). En el BPA, se resta su parte del beneficio (118 / 130 / 143 M en 2026-2028e).
4. **ROIC**: el del motor (34,9 % en 2025, sobre patrimonio + minoritarios + deuda − caja) es positivo y fiable; además, ROIC sobre capital operativo del activo calculado a mano: NOPAT 2.002 ÷ 6.382 M de media = 31,4 % (33-34 % sin la pérdida del Reino Unido). El ROE (48 %) está inflado por las recompras y no se usa.
5. **Reino Unido (Cromwell y Zoro U.K.)**: vendidos o cerrados en dic-2025. 2025 lleva 324 M de ventas y una pérdida no monetaria de 196 M (no recurrente en EBITDA); el crecimiento publicado de 2026 queda ≈ 2 puntos bajo el orgánico. BPA en base ajustada de la empresa (39,48 en 2025).
6. **2026e fijo** con la guía (19.400-19.700 M de ventas, margen operativo del 15,8-16,2 %): 19.646 M, EBITDA 17,35 % con los 43 M de devoluciones IEEPA; 2027e vuelve al 17,1 %.
7. **WACC** 9,83 %: Tesoro 5,12 %, beta 0,90 (mensual 0,96, semanal 0,82), prima 5,5 %, deuda al 5,3 % con un 4 % de peso. Terminal Gordon al 2,5 %.
8. **Puente**: deuda 2.408, caja 589 (30-jun-2026), minoritarios 3.536 a mercado, otros 210 (AWM, pagado el 26-ago-2026). Arrendamientos operativos fuera (US GAAP).
9. **Historia del PER** adelantada 2018-2025 con BPA ajustado (el ajustado de 2017-2018 no está en las fuentes primarias leídas); v2 al cierre 2019-2025.
10. **Convicción media** (el motor sugería alta): la ponderada a 12 meses (−12,6 %) está 2,6 puntos bajo el umbral de venta y las variantes v2 y «sin doble castigo» dan Mantener; la venta la sostiene sobre todo el valor intrínseco (684,02, −49 %).
11. Causa de la caída del 7,1 % del 12-feb-2026 no localizada tras tres búsquedas: registrada en `meta.huecos`.
12. `simbolos.json`: entrada GWW añadida al final, releyendo justo antes (otro análisis había añadido AAPL entre medias).

## Resultado

- `calcular-empresa.mjs`: 21 de 21 controles correctos. DCF 571,68 USD; valor intrínseco 684,02; objetivo 12 m 1.158,80 ponderado (−12,6 %) y 1.302,19 base (−1,8 %); Vender.
- `robustez.mjs`: SÓLIDA, acción robusta «No mantener»; límite de compra 684,02 USD (igual con BPA −10 %). Con el precio de la sesión: −13,2 % / −2,5 %.
- `rellenar.mjs`: cobertura del 90,5 %; avisos solo de tablas o gráficos sin datos (sin suma de partes, sin ESG, sin EBITDA NTM del consenso).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas 2016-2025 | `cuentas.mjs --sec GWW` (XBRL de la SEC, 10-K) | 31-dic-2025 (10-K del 19-feb-2026) |
| Trimestres y balance a 30-jun-2026, guía 2026 | 8-K y 10-Q del 2T26 (SEC) | 30-jun-2026 (publicado el 4-ago-2026) |
| Llamada del 2T26 | Transcripción | 4-ago-2026 |
| Precio, betas, cierres de ejercicio, rentabilidades | `bolsa.json` (Yahoo, históricos) | cierre del 20-oct-2026 |
| Movimiento (regla 13) | `movimiento.mjs GWW` | 21-oct-2026, sesión en curso (≈ 15:50 UTC) |
| Consenso, comparables, capitalización de MonotaRO | `yahoo-datos.mjs` (Yahoo quoteSummary) | 21-oct-2026, 15:54 UTC |
| Operaciones de directivos | Form 4 (SEC) | 21-oct-2025 a 21-oct-2026 |
| Gobierno y remuneración | Proxy 2026 y 8-K de la junta | 29-abr-2026 |
| Tasa libre | Tesoro de EE. UU., curva par | 20-oct-2026 |
| Prima implícita | Damodaran, ERPbymonth | octubre de 2026 |
| Tipos de cambio | BCE | 20-oct-2026 |
| Participación en MonotaRO | MonotaRO, accionistas principales | 2026 |
| Sentimiento | Stocktwits y Seeking Alpha | hasta el 16-oct-2026 |
| Precio para robustez | `precios.mjs GWW` | cierre 20-oct (1.335,96) y sesión 21-oct 16:14 UTC (1.345,85) |
| Objetivo a 12 m | `apuntar-12m.mjs grainger-2026-10-21` | 21-oct-2026 |

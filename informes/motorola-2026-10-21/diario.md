# Diario: Motorola Solutions (MSI), análisis value, corte 21-oct-2026

- Commit de partida: 914ca459dc8a323dd5a38e81017f564248d4227a (2026-10-21 15:12:43 UTC). Checkout compartido con otros tres análisis en paralelo (Royal Unibrew, Qt, Kainos): sin pull, commit ni push.
- Inicio ≈ 15:14 UTC; Word y PDF a las 15:40 UTC; robustez con el cierre y con la sesión a las 15:41-15:42 UTC.
- No hay informe anterior de Motorola Solutions en informes/: análisis desde cero.

## Decisiones

1. **Cuentas**: XBRL de la SEC con `cuentas.mjs` (10-K 2019-2025 y 10-Q del 2T26 a 4-jul-2026). Cuenta por función, US GAAP, arrendamientos operativos fuera de la deuda.
2. **No recurrentes**: solo el deterioro de ESN (2022), las ganancias de Hytera (2024, 2025, 1S26) y el earnout de Silvus (1S26). La reestructuración, los gastos de compras y los pagos en acciones se quedan como coste.
3. **BPA de la regla a 12 meses**: base no GAAP de la empresa (guía y consenso), calibrado con la guía de 2026 (17,64 frente a 17,62-17,72). Margen no GAAP = margen del DCF + 1,95 puntos. Casos con el ajuste del escenario en 2027e y 2028e.
4. **PER actual**: BPA de los próximos 12 meses = 0,19 × 2026e + 0,81 × 2027e (misma base que la historia adelantada). La señal no cambia con solo 2027e o solo 2028e.
5. **ROIC**: el del motor (27,1 %) está inflado por un patrimonio bajo por las recompras. Se calcula a mano sobre el capital invertido operativo: 17,5 % (cierre de 2025, con Silvus), 22,8 % (capital medio de 2025), ≈ 20 % en 2026e y ≈ 18 % con D-Fend. ROIC − WACC ≈ +8 a +10 puntos: pasa.
6. **Silvus**: consolidada desde el 6-ago-2025; su deuda está en el puente (9.032 M a 4-jul-2026). **D-Fend** (cerrada el 20-ago-2026, 1.500 M, 950 M de bonos + 300 M de préstamo) y **Bell Canada** (pendiente) se tratan como neutras: ni en la proyección ni en el puente.
7. **Hytera**: los cobros ordenados (100 M al año; 232 M cobrados) no se suman al puente; las ganancias ya cobradas son no recurrentes.
8. **Comparables**: ocho de EE. UU. (LHX, AXON, TDY, ZBRA, TYL, ALLE, ROP, CSCO), con una mediana del PER NTM de 19,6. Fuera Hexagon (dos divisas en Yahoo), Hytera (sin estimaciones) y JVCKenwood.
9. **WACC**: tasa libre del 5,12 % (Tesoro, 20-oct; FRED no respondió), beta 0,90 y prima del 5,5 %: 9,35 %. Gordon del 3 %.
10. **Ficha sectorial**: no se ha hecho porque el encargo no permite escribir fuera de la carpeta. El perímetro y el mercado salen de la nota B.
11. **Regla 13**: `movimiento.mjs MSI` da una tendencia alcista sin avisos P. Las caídas de oct-2025 y may-2026 y la subida de ago-2026 se explican por los resultados. Veredicto: no cambia.
12. **simbolos.json**: se añade la entrada MSI al final de «empresas». Una primera escritura con JSON.stringify reordenó las claves numéricas; se restauró enseguida el orden original, así que el diff es solo de añadidos.

## Resultado

- Calidad: Sí (ROIC operativo ≈ 20 %, WACC 9,35 %, sostenibilidad «Sí»).
- Regla a 12 meses (cierre de 463,46): ponderada 0,8 %, base 7,1 %, Mantener. La v2 de control da 6,2 %.
- Valor intrínseco: 276,30 USD (−40 %); DCF 264,80.
- Robustez: SÓLIDA. Acción robusta: no comprar ni mantener; límite 276,30 USD.
- Controles: 19 de 19.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas anuales 2019-2025 | `cuentas.mjs --sec MSI` (XBRL, 10-K) | 31-dic-2025 |
| Balance, LTM y deuda | 10-Q del 2T26 (XBRL y documento) | 4-jul-2026 |
| Resultados trimestrales y guía | Notas de resultados 2T25-2T26 (EDGAR 8-K) | 5-ago-2026 |
| Compras y deuda (D-Fend, bonos) | 8-K y 424B2 de agosto de 2026 | 17/20-ago-2026 |
| Recompras | 8-K del 9-sep-2026 | 9-sep-2026 |
| Gobierno y remuneración | Proxy 2026 y 8-K de las juntas 2024-2026 | 18-may-2026 |
| Directivos | Form 4 (EDGAR) | 21-oct-2025 a 21-oct-2026 |
| Cotización, índice y movimiento | `bolsa.mjs`, `movimiento.mjs` (Yahoo) | cierre del 20-oct-2026 |
| Consenso, comparables y objetivos | Yahoo quoteSummary (`yahoo-datos.mjs`) | 21-oct-2026 15:18 UTC |
| Objetivos y recomendaciones | MarketBeat | oct-2026 |
| Tasa libre | Curva del Tesoro de EE. UU. | 20-oct-2026 |
| Prima implícita | Damodaran, ERPbymonth | oct-2026 |
| Mercado LMR | Fortune Business Insights; MarketsandMarkets | 2025 / 2024 |
| Sentimiento | Stocktwits, Seeking Alpha (RSS), MarketBeat | ago-oct-2026 |
| Precio de referencia | `precios.mjs MSI` | 463,46 USD, cierre del 20-oct-2026 |
| Precio de la sesión | `precios.mjs MSI` / `robustez.mjs --actual` | 465,71 USD, 21-oct-2026 ≈ 15:41 UTC |
| Rentabilidad a 12 meses | `apuntar-12m.mjs motorola-2026-10-21` | 21-oct-2026 |
| Robustez | `robustez.mjs` (cierre y `--actual`) | 21-oct-2026 |

## Revisión a 12 meses

MSI, 21-oct-2026: v3 ponderada 0,8 %, base 7,1 %, Mantener. La v2 da 6,2 %. Apuntada con `apuntar-12m.mjs`. Con la sesión (465,71 USD): 0,3 % / 6,6 %.

## Pendiente para el hilo principal

El encargo no permite estos pasos en un checkout compartido:

- `cobertura.mjs --arreglar`;
- `seguimiento.mjs`;
- `cola.md`;
- commit y push.

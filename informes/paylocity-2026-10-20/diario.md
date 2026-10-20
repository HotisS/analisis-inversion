# Diario: Paylocity (PCTY), análisis value completo, corte 20-oct-2026

- Commit de partida: `d92ada56abc38850d35b91a3b90328e196263b0c` (20-oct-2026, 15:41 UTC). Checkout compartido con otro análisis: sin pull, commit ni push desde este encargo.
- Inicio: 15:42 UTC. Notas A-E: 15:58. Primer cálculo: 16:00. Word y PDF: 16:04. Robustez: 16:05. Fin: ≈ 16:07 UTC (≈ 25 minutos de trabajo efectivo tras la recopilación de datos).
- Primera iteración de Paylocity en el repo (no había informe anterior).

## Decisiones

1. **BPA GAAP**, con los pagos en acciones (7,8 % de las ventas) como coste, igual que Paycom. El consenso no GAAP (8,74 / 9,72) solo de contraste; aviso D7 de robustez explicado (diferencia de base).
2. **Fondos de clientes fuera de la caja y del puente** (3.210,5 M de fondos frente a 3.209,0 M de obligaciones). Los intereses (120,0 M en FY2026) son ingresos; FY2027e con ≈ 103 M (guía: saldo 3.400-3.500 M al ≈ 3 %, bajadas en enero y marzo). Sensibilidad propia: 100 pb ≈ 34,5 M antes de impuestos ≈ 0,47 USD por acción; con tipos a cero, −1,41 USD (−24 % del BPA FY2027e).
3. **Capex del DCF = inmovilizado + software activado + aumento neto de los costes de contratos activados** (el flujo operativo ya lo resta; el EBITDA GAAP solo lleva su amortización). FY2027e sube al 10 % por el paso de 7 a 8 años de vida (+120-140 pb de margen sin caja).
4. **Beta 0,90** (media de las medidas 0,64-1,09 y la de Paycom); WACC 10,04 %; terminal Gordon 3,0 %. Con beta 1,0 el DCF bajaba a 114 USD: la señal no cambia.
5. **Ningún año fijo** en el DCF: no hay trimestres de FY2027 publicados (1T el 5-nov-2026).
6. **Historia del PER sin exclusiones** (FY2018-FY2026); FY2017 fuera por BPA no significativo (0,12). La media larga (65,5x) está inflada por 2020-2021, pero el techo de la regla la acota.
7. **Comparables**: ficha sectorial del 14-oct llevada al cierre del 19-oct; Dayforce (ya no cotiza) y PCOR (es Procore, no comparable) fuera.
8. **Controles explicados**: perímetro FY2022 (salto de los fondos de clientes al cierre, no una compra) y capitalización (Yahoo usa el precio de la sesión del 20-oct).
9. `form4.json` no se generó (solo `form4.txt`); se quitó su lectura en `construir-notas.mjs` (no se usaba).

## Revisión a 12 meses

v3 ponderada +19,5 %, base +20,6 %, objetivo 198,54 USD (FY2028e); v2 +11,4 % / +9,7 %; señal **Mantener** (valor intrínseco 131,70 USD, −20,7 %). Apuntada con `apuntar-12m.mjs`. Robustez: SÓLIDA, acción robusta «No mantener»; límite común 131,69 USD. Con 169,86 USD de la sesión (16:05 UTC): +16,9 % / +17,9 %, misma acción.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas anuales FY2017-FY2026 | `cuentas.mjs --sec PCTY` (XBRL de la SEC) y 10-K FY2026 | 30-jun-2026 (10-K presentado el 5-ago-2026) |
| Trimestres, guía FY2027 y objetivos a largo plazo | Notas de resultados (8-K 99.1) 1T25-4T26 y transcripción del 4T26 | 4-ago-2026 (4T26); 4-nov-2025 (objetivos) |
| Línea de crédito | 8-K | 17-sep-2026 |
| Gobierno, remuneración y participaciones | Proxy 2025, 8-K de la junta, 8-K de Conway | 23-oct-2025; 5-dic-2025; 21-ago-2026 |
| Ventas de directivos | `form4.mjs` | 20-oct-2025 a 20-oct-2026 |
| Precio, betas, cierres de ejercicio | `bolsa.mjs` (Yahoo) | Cierre del 19-oct-2026 |
| Consenso y comparables | `yahoo-datos.mjs` | 20-oct-2026, 11:44 de Nueva York |
| Tasa libre y letra a 3 meses | Curva del Tesoro | 19-oct-2026 |
| Prima implícita del mercado | Damodaran (ERPbymonth) | oct-2026 |
| Sector y comparables | Ficha `sectores/nominas-rrhh-2026-10-15.md` | 14/15-oct-2026 |
| Empleo privado | FRED USPRIV | sept-2026 |
| Movimiento del precio (regla 13) | `movimiento.mjs PCTY` | 20-oct-2026 |
| Noticias de 12 meses | Seeking Alpha (RSS), MarketBeat, Stocktwits, StockStory, Finviz | oct-2025 a 20-oct-2026 |
| Precio del día | `precios.mjs PCTY` | 169,86 USD, sesión del 20-oct (16:05 UTC) |
| Robustez | `robustez.mjs` y `--actual` | 19-oct (cierre) y 20-oct (sesión) |

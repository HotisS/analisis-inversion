# Diario · Kainos Group plc (KNOS.L) · corte 21-oct-2026

- Commit de partida: 914ca45 (Airtel Africa: análisis value completo 21-oct…). Sin git pull (checkout compartido con otros análisis).
- Inicio: 21-oct-2026 15:14 UTC. Sin informe anterior de Kainos en `informes/` (el intento del 19-oct no se usa).
- Identificación: Kainos Group plc, LSE KNOS (Yahoo KNOS.L), ISIN GB00BZ0D6727, LEI 213800H2PQMIF3OVZY47, NIIF (UK-adopted), cuentas en GBP, cotiza en GBp. Ejercicio a 31-mar; «FY2026» = abr-2025 a mar-2026 (etiqueta «fin»).
- 15:15 Cuentas ESEF con `cuentas.mjs --esef "Kainos"`: FY2021-FY2026 (6 ejercicios) → `notas/cuentas-xbrl.json`.
- 15:30 Gilt 10 a (IUDMNPY, BoE): último publicado 16-oct 5,30 % (CSV bajado hoy por el análisis de MONY, copiado a notas/docs).
- 15:20-15:30 Bolsa (`bolsa.mjs --accion KNOS.L --indice ^FTMC --sector EXV3.DE --cierre-mes 3 --etiqueta fin`), `movimiento.mjs KNOS.L` (P1 y P2), Yahoo quoteSummary de Kainos y 12 comparables (`notas/yahoo-datos.mjs`), documentos (resultados FY2019-FY2026, semestrales, avances, ESEF FY2022-FY2026, RNS de 2026, GDS, Workday, Ordina), consenso (MarketScreener, Stock Analysis), prensa (ii, Kalkine) y sentimiento (sin Stocktwits).
- 15:26 `precios.mjs KNOS`: 1.287 GBp (20-oct); sesión del 21-oct aún abierta. Símbolo KNOS añadido a `simbolos.json`.
- 15:34 `precios.mjs KNOS`: 1.316 GBp (21-oct, antes de la subasta de cierre). 15:45: **1.320 GBp, cierre del 21-oct** tras la subasta: es el precio del informe (13,20 GBP) y de la robustez.
- 15:35-15:43 Notas A-E (`notas/construir-notas.mjs`), `supuestos.mjs`, `propio.mjs`, `textos.mjs`; `integrar.mjs` y `calcular-empresa.mjs`: 19 de 19 controles (el ROIC del motor, 293,7 %, se explica: capital invertido neto de caja de 14 M).
- 15:44-15:46 Word (`rellenar.mjs`, cobertura 90,2 %; avisos solo de datos que no existen: suma de partes, calificaciones ESG, serie de mercado, vencimientos de deuda, transacciones con múltiplos) y PDF (LibreOffice). `revision-12m-2026-10-21.md`; `apuntar-12m.mjs kainos-2026-10-21` (Mantener 15,5 %); `robustez.mjs --actual`.

## Decisiones

- **Base del BPA: contable diluido** (con la remuneración en acciones como coste, 5,4 M en FY2026), no el ajustado de la empresa (41,1 p frente a 35,1 p). FY2025 normalizado sin la reestructuración (33,1 p). El consenso de MarketScreener (0,464 en FY2027) está en esa base; el de Yahoo (0,525) es el ajustado.
- **Margen del DCF = EBITDA contable** (EBIT + toda la amortización): 14,1 % en FY2026 → 14,5 / 15,5 / 16,0 %. No se vuelve al 18 % de FY2024 por la IA y la comisión a Workday.
- **Caja neta**: 89,1 M a 31-mar-2026 con los depósitos a plazo (el ESEF da 82,8 de caja); arrendamientos 6,1; sin deuda. Se restan 34,6 M de salidas posteriores (recompra de 11,6 M de abr-may y dividendo final de 19,8 p, ex-dividendo el 1-oct) porque las acciones son las de octubre (116,26 M) y el precio ya no lleva el dividendo.
- **Segmentos**: Digital Services, Workday Services y Workday Products por separado (contribución publicada desde FY2024; 23,7 M de costes centrales sin repartir). Suma de partes solo como prueba (Products a 20x su contribución y servicios a 8,3x: 7,6 GBP), no como método.
- **WACC 11,35 %**: gilt 5,30 % + beta 1,10 × 5,5 %; sin prima adicional (la IA va en el bajista: −4 puntos de crecimiento, −2,5 de margen).
- **Historia del PER**: se excluye el cierre de FY2021 (burbuja, 52x). Mediana adelantada de 5 años 29,2x; mínimo 16,1x (febrero de 2026, venta de software por la IA).
- **Regla 13: no cambia.** +64 % en tres meses con causa propia (avance del 18-ago); la venta de la cónyuge del director financiero (1-jul, 5,9 M GBP) fue única y anterior; Qubis y Baillie Gifford reducen tras la subida.
- **Resultado**: Mantener (v3 15,5 % / base 28,1 %; v2 16,8 / 15,5). Valor intrínseco 7,15 GBP (−46 %). Acción robusta: no comprar; límite común A 715 GBp.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas FY2021-FY2026 | `cuentas.mjs --esef` (filings.xbrl.org) y resultados anuales FY2026 | 31-mar-2026 (publicado 18-may-2026; informe anual 24-jun-2026) |
| Semestres | Resultados semestrales 1S FY2025 y 1S FY2026 | 30-sep-2025 |
| Avance del 1S FY2027 | RNS / web de inversores | 18-ago-2026 |
| Accionistas, directivos, junta | RNS (Investegate) | hasta el 7-oct-2026 |
| Bolsa (rentabilidades, beta, cierres de ejercicio) | `bolsa.mjs` (Yahoo) | cierre del 20-oct-2026 |
| Movimiento (regla 13) | `movimiento.mjs KNOS.L` | 21-oct-2026 (sesión) |
| Consenso y comparables | MarketScreener; Yahoo quoteSummary (`notas/yahoo-datos.mjs`) | 21-oct-2026 |
| Tasa libre | Gilt 10 años (BoE IUDMNPY) | 16-oct-2026 |
| Prima implícita | Damodaran | oct-2026 |
| Precio del informe y de la decisión | `precios.mjs KNOS` | cierre del 21-oct-2026 (1.320 GBp, 15:45 UTC) |
| Robustez | `robustez.mjs --actual` | 21-oct-2026 15:46 UTC |

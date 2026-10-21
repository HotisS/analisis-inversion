# Diario · Synopsys (SNPS) · análisis value · 21-oct-2026

- **Commit de partida:** `6572cb38a51124939e12a81e0e9a4544d81397aa` (2026-10-21 16:33:48 UTC).
- **Checkout compartido con otros análisis en paralelo:** sin git pull, commit ni push en este trabajo; los commits los hace el coordinador.
- **Inicio:** ≈ 16:34 UTC. **Fin:** ≈ 17:06 UTC (≈ 32 minutos, más la recogida de datos previa en la misma sesión).

## Decisiones

- **Base del BPA de la regla a 12 meses: no GAAP.** Es la de la empresa, el consenso y la historia del PER, igual que en Cadence (14-oct).
  - El DCF trata la remuneración en acciones como coste (≈ 9-10 % de las ventas). El margen EBITDA del DCF es el margen operativo no GAAP − remuneración en acciones + depreciación.
  - La amortización del DCF es solo la depreciación (2,2 %). La de intangibles de Ansys es contable y en su mayor parte no deducible. El tipo del 18 % es el no GAAP guiado.
- **Correcciones al XBRL de cuentas.mjs:**
  - FY2022 reexpresado sin SIG: ingresos de 4.615,7.
  - Beneficio y BPA de operaciones continuadas en FY2022-FY2025. FY2024 sin la plusvalía de SIG: 1.441,7 / 9,25.
  - Capex solo de inmovilizado: FY2025 169,5. La herramienta sumaba la compra de Ansys en `PaymentsToAcquireIntangibleAssets`.
  - Adquisiciones, desinversiones y emisiones de acciones, a mano desde el 10-K y las notas.
- **FY2026e fijo:** el ejercicio cierra el 31-oct y la guía es del 26-ago. Con la fecha de corte, el motor cuenta solo la fracción que queda (0,03).
- **Puente a 31-jul-2026:**
  - `otros_ajustes` = +1.000 (recompra acelerada pagada en octubre) − ≈ 400 (flujo libre de agosto a octubre implícito en la guía) = 600.
  - Acciones: 189,9 M, que ya restan la entrega inicial de la recompra.
- **Historia del PER:** FY2023 con SIG (11,19, el BPA publicado entonces). La sensibilidad es pequeña: con 10,54 sin SIG, el PER de FY2022 sería 27,8 en vez de 26,1 y la mediana no cambia.
- **Comparables:** Keysight se descarta (equipos de medida). Mediana del PER del próximo ejercicio de 8 empresas: 24,6x.
- **Prueba de sensibilidad con el plan de la empresa** (+15 % anual hasta FY2030, margen no GAAP del 50 %): DCF de 384,57. Ni así llega al precio. La copia de la prueba está en el scratchpad, no en el repo.
- **Regla 13: no cambia.** Los movimientos grandes tienen causa (resultados, día del inversor, miedo a la IA). Dos tramos sin causa concreta (principios de septiembre y 12-20 de octubre, −10,9 %) se registran como huecos.
- **Fecha de resultados del 4T26:** no está anunciada. Se deja `null` en lugar de inventarla.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas anuales FY2016-FY2025 | `cuentas.mjs --sec SNPS` (XBRL) + 10-K FY2025 (22-dic-2025) | 31-oct-2025 |
| Trimestres y balance FY2026 | 10-Q 1T/2T/3T26 y notas de resultados (8-K) | 31-jul-2026 (10-Q del 26-ago-2026) |
| Guía FY2027 y a 2030 | Investor Day (nota de prensa) | 30-sep-2026 |
| Recompra acelerada, Elliott, NVIDIA, reestructuración, directivos | 8-K de EDGAR | 4-nov-2025 a 5-oct-2026 |
| Proxy y junta | DEF 14A (19-feb-2026); 8-K de votos | 16-abr-2026 |
| Bolsa (cierres, beta, rentabilidades) | `bolsa.mjs` SNPS/SPY/SOXX | cierre del 20-oct-2026 |
| Movimiento (regla 13) | `movimiento.mjs SNPS` | 21-oct-2026 (454,67 en sesión) |
| Consenso y comparables | Yahoo quoteSummary (`yahoo-datos.mjs`) | 21-oct-2026, 16:39 UTC |
| Directivos | `form4.mjs` | 21-oct-2025 a 21-oct-2026 |
| Tasa libre | Tesoro de EE. UU. (10 años 5,12 %) | 20-oct-2026 |
| Prima de mercado implícita | Damodaran (4,20 %) | oct-2026 |
| Mercado EDA | ESD Alliance (SEMI), 1T y 2T 2026 | jun-2026 |
| Tipo EUR/USD | BCE (1,1234) | 21-oct-2026 |
| Noticias y sentimiento | prensa (TIKR, Barchart, Yahoo, TS2), Stocktwits, Seeking Alpha | oct-2025 a 21-oct-2026 |
| Precio del informe | `precios.mjs SNPS` | cierre del 20-oct-2026: 447,62 |
| Precio de hoy | `precios.mjs SNPS` | 21-oct-2026, 17:04 UTC: 454,87 |
| Motor, Word y PDF | `integrar.mjs`, `calcular-empresa.mjs`, `rellenar.mjs`, LibreOffice | 21-oct-2026, 17:04 UTC |
| Revisión a 12 meses | `apuntar-12m.mjs synopsys-2026-10-21` (repasado tras el commit de Monster) | 21-oct-2026, 17:05 UTC |
| Robustez | `robustez.mjs` al cierre y `--actual` | 21-oct-2026, 17:05 UTC |

## Resultado

- **Señal: Mantener.**
  - v3: ponderada +35,1 %, base +30,7 %.
  - v2: +22,6 %.
  - BPA −10 %: +21,6 % / +17,6 %.
- **Valor intrínseco:** 329,23 USD frente a un precio de 447,62.
- **Calidad:** ROIC − WACC de −5,6 puntos, no pasa. Sostenibilidad «Sí».
- **Robustez:** SÓLIDA, con acción robusta «No mantener».
  - Límite común: 329,23 USD.
  - Filtro de mantener: hasta 387,33 USD.
  - Con el precio de la sesión (454,87, 17:04 UTC): +33,0 % / +28,6 %. La acción robusta no cambia.
- **Controles:** 19 de 24 correctos y 5 explicados (tipo efectivo FY2023-FY2025, caja proyectada, crecimiento del BPA desde el GAAP). El Word se generó con un 89,4 % de los campos cubiertos.

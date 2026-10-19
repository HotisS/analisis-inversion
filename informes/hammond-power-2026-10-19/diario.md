# Diario · Hammond Power Solutions (HPS.A, TSX) · 19-oct-2026

Análisis value completo desde cero, hecho por un subagente con `/analiza-empresa` (fases A-E propias, sin subagentes; patrón `construir-notas.mjs` + `supuestos.mjs` + `propio.mjs` + `textos.mjs` + `resumen.mjs`). Commit de partida `8e12032`; empezado a las 10:26 UTC.

## Pasos y fecha de sus datos

| Paso | Herramienta / fuente | Fecha de los datos |
|---|---|---|
| Precio, beta, volatilidad, rentabilidades y cierres de ejercicio | `bolsa.mjs HPS-A.TO` frente a XIC.TO (índice) y XLI (sector); `precios.mjs HPS.A` | cierre 16-oct-2026 (el 19-oct aún no había sesión) |
| Movimiento del precio (regla 13) | `movimiento.mjs HPS-A.TO`; meses y días fuertes de HPS-A.TO, VRT y POWL con Yahoo (script en el scratchpad) | 16-oct-2026 |
| Cuentas anuales 2021-2025 | informes anuales de la web de inversores (americas.hammondpowersolutions.com), `notas/docs/`, pdftotext | anual 2025: 19-mar-2026 |
| Trimestres 3T24-2T26 y balance del puente | Q3 2024, Q1-Q3 2025, Q1 y Q2 2026 de la empresa | 2T26 (balance a 27-jun-2026): 30-jul-2026 |
| AEG y Fort Worth | presentación de AEG; comunicados de la empresa | 17-feb-2026; cierre 29-jun-2026; 22-sep-2026 |
| Conferencia del 2T26 | transcripción de Investing.com | 31-jul-2026 |
| Consenso y objetivos | MarketScreener (8 analistas, WebFetch) y MarketBeat | 16 y 19-oct-2026 |
| Comparables (9) | ficha y earningsTrend de Yahoo (`herramientas/yahoo.mjs`, script copiado del de Powell) | 19-oct-2026 |
| Bono de Canadá a 10 años (3,83 %) y USD/CAD (1,4154) | Banco de Canadá, Valet API (BD.CDN.10YR.DQ.YLD) | 15-oct-2026 (bono, último publicado) y 16-oct-2026 (cambio) |
| Prima implícita (4,20 %) | Damodaran ERPbymonth | oct-2026 |
| Transacciones | GE Vernova (Prolec GE), Hubbell (DMC Power), Eaton (Fibrebond), HPS (AEG, Micron) | 2024-10 a 2026-02 |
| Sector | ficha `sectores/transformadores-2026-10-16.md`; GlobalData, MarketsandMarkets, Wood Mackenzie | 2025 |
| Sentimiento | Stockchase, Stocktwits, Seeking Alpha (RSS), Globe and Mail | hasta 16-oct-2026 |
| Próximos resultados | ad-hoc-news y StockAnalysis (la empresa aún no lo ha anunciado; el 3T25 salió el 23-oct) | **29-oct-2026** |
| Cálculo, Word y PDF | `integrar.mjs`, `calcular-empresa.mjs`, `rellenar.mjs`, soffice | 19-oct-2026 |
| Revisión 12 m, robustez | `apuntar-12m.mjs`, `robustez.mjs --actual` | precio 16-oct-2026 |

## Comprobaciones pedidas

- **Estructura de acciones**: 9.126.624 A (cotizadas, un voto) + 2.778.300 B (sin cotizar, cuatro votos, mismos derechos económicos; el dividendo de la B no puede superar al de la A) = 11.904.924 (Q2 Report 2026, nota de capital). William G. Hammond (Arathorn) tiene todas las B y 424.636 A: 26,9 % del capital y ≈ 57 % de los votos. El valor por acción usa las 11,9 M y el precio de la A. Los DSU/PSU/RSU se pagan en efectivo: no diluyen, y su pasivo (39,0 M) va al puente.
- **Bono del día**: el Banco de Canadá publica con un día de retraso; el último dato a la hora del análisis era el del 15-oct-2026 (3,83 %).
- **Cuentas**: Canadá no tiene XBRL en `cuentas.mjs` y SEDAR+ da 403; se usaron los PDF de la empresa (los mismos que presenta en SEDAR+), cuadrados entre sí (cada informe anual reexpresa el año anterior).

## Decisiones

- **Pago en acciones liquidado en efectivo**: deforma el EBITDA y el BPA con la cotización (20,0 M en 2023, 8,8 M en 2025, 29,7 M en el 1S26; recuperación de 1,75 M en el 1S25). Solo el exceso sobre el 1 % de las ventas va como no recurrente; el DCF y el BPA propio llevan ese 1 %.
- **AEG**, cerrada dos días después del balance: 365 M en `otros_ajustes` (pagados con el crédito sindicado) y sus ventas en la proyección desde el 2S26 (2026e fijo en 1.400 M). Margen supuesto del 11 % (no publicado). Su circulante se cobra dos veces (precio y proyección): ≈ 3 CAD por acción de sesgo prudente, dicho en las limitaciones.
- **WACC 9,93 %**: beta 1,1 (medida 0,95 frente al índice de Toronto, que pesa poco en industria; se mueve con Vertiv y Powell), prima de mercado 5,5 % y 1 punto adicional por tamaño y ciclo.
- **PER histórico**: 2021 y 2022 excluidos (PER adelantado de 3-4x, BPA atípico). Quedan 3 años → el selector compara v3 y v2 y decide la más baja (v3). `anios: 3` en `per_historico`.
- **Pesos**: DCF 50, comparables 25, escenarios 25; transacciones con peso 0 (márgenes del 25-46 %, no comparables).
- `mercado_final`: transformadores secos de Norteamérica (perímetro del 23 % de cuota de la empresa) a 2030e, estimación propia (3.700 M USD a +6,5 %); la cuota implícita (32,5 %) va inflada por AEG, fuera del perímetro (≈ 26,5 % sin AEG).

## Resultado

- **Mantener, convicción media.** Objetivo 12 m 234,00 CAD: v3 ponderada −4,4 % / base +0,4 % (motor −4,3 %); v2 de control +0,9 % / +8,0 %; con BPA −10 %: −13,9 %. Valor intrínseco 145,29 (−40,9 %); DCF 116,28; WACC 9,93 % (9,9266 %); ROIC 2025 22,10 %; ROIC − WACC 12,17 puntos; sostenibilidad Sí.
- **Robustez**: SÓLIDA; acción robusta «No mantener» (V1: valor intrínseco muy bajo el precio). Límite de compra 145,29 CAD (también el robusto). No es compra robusta: falla la rentabilidad (−4,4 % < 15 %; base 0,4 % < 12 %) y el valor real (145,29 < 245,75); sí pasan sostenibilidad y ROIC − WACC ≥ 5.
- Regla 13: **no cambia**. Próximos resultados: 29-oct-2026.
- Word y PDF (48 páginas): 19 de 21 controles correctos y 2 explicados (caja proyectada frente a la histórica; BPA +27 % anual desde 2025). Cobertura 86,9 % (gobierno por debajo del 60 %: sin circular de 2026). Avisos del Word: suma de partes y calificaciones ESG sin filas; mapa de comparables sin EV/EBITDA NTM.

## Huecos

Circular de la junta de 2026 (SEDAR+ 403; votos, métricas del variable); operaciones de directivos (SEDI con antibot); EBITDA de AEG; coste del crédito sindicado; serie histórica del mercado de transformadores secos de Norteamérica; EV/EBITDA NTM de los comparables; posición corta; ISIN; fecha oficial de los resultados del 3T26 (solo fuentes secundarias).

## Lecciones propuestas (para el coordinador; no escritas en archivos comunes)

1. **Canadá: pago en acciones liquidado en efectivo (DSU/PSU/RSU)**. En empresas canadienses pequeñas el gasto se revaloriza con la cotización y mueve el EBITDA y el BPA publicados decenas de millones (HPS: 29,7 M en el 1S26, la mitad del beneficio). Tratar como no recurrente el exceso sobre un nivel normal (≈ 1 % de las ventas), proyectar ese nivel y sumar el pasivo acumulado al puente (`otros_ajustes`); no hay dilución.
2. **HPS: la web de inversores está en `americas.hammondpowersolutions.com/investor-relations`** (la de `hammondpowersolutions.com/investors` da 404); de ahí salen los PDF que SEDAR+ no deja descargar.
3. **Historia del PER adelantado en empresas que dieron un salto de beneficio**: el PER adelantado «a toro pasado» de los años anteriores al salto (3-4x) es atípico y la regla de 1/3 de la mediana lo excluye; al quedar 3 años, hay que poner `per_historico.anios` para que el selector actúe (sin ese campo no aplica la regla de historia corta).
4. **Compra cerrada justo después del balance**: además del precio en `otros_ajustes`, el circulante comprado vuelve a cobrarse en la proyección cuando sus ventas entran como crecimiento; decirlo en las limitaciones o restarlo del ajuste si es grande.
5. **`precios.mjs` pide la clave del mapa (`HPS.A`), no el símbolo de Yahoo (`HPS-A.TO`)**: con el símbolo falla con «No están en el mapa».

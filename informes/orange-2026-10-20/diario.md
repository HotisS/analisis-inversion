# Diario · Orange SA (ORA.PA) · 20-oct-2026

- Commit de partida: 2d5cf2f («Growth: protocolo del backtest de rentabilidad frente a caída máxima (fijado antes de calcular)»). Checkout compartido con otros cuatro análisis en paralelo: sin ninguna operación git. Solo se escribió en esta carpeta; temporales en `/tmp/claude-0/fr/orange-2026-10-20/`. No se tocaron `simbolos.json`, `cola.md`, `MEMORIA.md`, `METODO-VIGENTE.md`, `lecciones*.md` ni carteras; no se ejecutaron `apuntar-12m.mjs` (solo `--simular`), `seguimiento.mjs`, `cobertura.mjs`, `precios.mjs` ni `exclusiones.mjs --aplicar`.
- Inicio: 08:31 UTC (10:31 CEST; Euronext abierta). No hay informe anterior de Orange en `informes/`: primera iteración, método completo.
- Tiempos (UTC): cuentas ESEF, URD 2025, 1S26, AMF, Euronext, Bundesbank y BCE 08:31-08:47; comparables, consenso, prensa y sentimiento hasta 08:52; notas A-E (`notas/construir-notas.mjs`) 09:00; parte propia y primer cálculo 09:02; ajuste de supuestos, sensibilidad a la OAT y textos 09:02-09:08; Word y PDF 09:10; `apuntar-12m --simular` y `robustez` 09:11; diario 09:12.
- Sin subagentes: las fases A-E las hice yo; parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs` (patrón de TUI).
- Documentos: orange.com tiene antibot y la Banque de France, la AFT y bnains dan 403. Comunicados de MFN, cuentas del 1S26 en assets.orange.com, URD 2025 en ESEF desde el paquete de la BDIF de la AMF (D.26-0217), declaraciones de umbral y de directivos de la BDIF. URLs en `notas/docs/_manifest.json`.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas 2019-2024 | `cuentas.mjs --esef` con el LEI 969500MCOONR8990S771 | informes anuales 2019-2024 |
| Cuentas 2025 | URD 2025 en ESEF (zip de la BDIF), extraído con un lector iXBRL propio | 2026-03-25 |
| 1S26, balance a 30-jun-2026, segmentos | Comptes consolidés résumés, rapport semestriel y comunicado del 1S26 | 2026-07-28 |
| Trimestres 3T25-2T26, guía 2026 | Comunicados de MFN | 2025-10-23 a 2026-07-28 |
| Plan 2026-2028 | «Trust the future» (MFN) | 2026-02-19 |
| MasOrange, SFR, bonos, acciones y recompra | Comunicados de MFN | 2025-11 a 2026-10 (acciones a 30-sep-2026) |
| Accionistas (Bpifrance, BlackRock) | Declaraciones de umbral de la AMF 226C1231 y 226C0893 | 2026-06 y 2026-08 |
| Operaciones de directivos | BDIF de la AMF (DD) | 2026-05-20 a 2026-10-01 |
| Gobierno y retribución | URD 2025 y junta del 19-may-2026 | 2026-03-25 y 2026-05-19 |
| Precio | Histórico de Euronext (FR0000133308-XPAR) | cierre del 19-oct-2026, 14,20 € (subasta de las 17:35 CEST) |
| Beta, rentabilidades, cierres de ejercicio | `bolsa.mjs --accion ORA.PA --indice EXSA.DE --sector EXV2.DE --corte 2026-10-20 --cierre-mes 12` | cierre del 16-oct-2026 (Yahoo sin el del 19-oct) |
| Movimiento (regla 13) | `movimiento.mjs ORA.PA` | 20-oct-2026 a media sesión (14,29 €) |
| Consenso y objetivos | MarketScreener (16 analistas) y Yahoo | 2026-10-19 |
| Comparables | Yahoo quoteSummary (`notas/comps.mjs`, 9 operadores + Bouygues) | 2026-10-19 |
| Tipos de cambio | BCE | 2026-10-19 |
| Bund a 10 años | Bundesbank (BBSIS, Svensson) | 2026-10-19 (3,49 %) |
| OAT a 10 años | ideal-investisseur (diario) y medias mensuales del BCE (IRS) | 2026-10-19 (4,85 %; diferencial 142 pb) |
| Prima de mercado | Damodaran ERPbymonth | octubre de 2026 (4,20 %) |
| Presupuesto 2027 y CEB | Legifiscal y prensa | 2026-10-01 |
| Tamaño del mercado | Arcep (observatorio 2025) | 2026-06 |
| Sentimiento | Boursorama, ABC Bourse, Les Echos/Saxo, Investing.com, CFE-CGC | 2026-09-23 a 2026-10-19 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 20-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, LibreOffice (perfil en `/tmp/claude-0/fr/orange-2026-10-20/lo-orange`) | 20-oct-2026 |
| Objetivo a 12 m | `apuntar-12m.mjs --simular orange-2026-10-20` (no se escribió nada) | 20-oct-2026 |
| Robustez | `robustez.mjs orange-2026-10-20` | 20-oct-2026 (precio 14,20 del 19-oct) |

## Decisiones

- **Precio**: cierre del 19-oct-2026 en Euronext París (14,20 €), sacado del histórico de Euronext porque Yahoo solo tenía el del 16-oct (14,56 €). Hoy a media sesión, 14,29 €. No se ejecutó `precios.mjs` (prohibido en el encargo): `robustez` avisa D3.
- **BPA ajustado en el objetivo a 12 meses**: el publicado de 2025 (0,14 €) está hundido por el GEPP y el de 2026 inflado por la plusvalía de MasOrange; la historia del PER y los escenarios usan el ajustado de Orange (0,95 € en 2024, 0,86 € en 2025). El de 2023 (0,90 €) es estimación propia. Calibración fija de +116 M.
- **MasOrange en la proyección**: integrada al 100 % desde el 8-jun-2026; el puente usa el balance de junio, ya con su deuda. SFR fuera (protocolo sin firma definitiva).
- **Puente** (30-jun-2026): deuda 47.625, arrendamientos 8.859, caja 11.483, minoritarios a 8 veces su beneficio (5.250), beneficios a empleados netos (2.140), asociadas (1.926) y otros ajustes de 7.828 (híbridos 4.993, Scorefit 1.300, desmantelamiento del cobre neto 1.994, −459 para cuadrar con la deuda neta oficial).
- **Margen**: se resta un punto de reestructuración y cargas «específicas» recurrentes en el DCF (media de 2021-2025: 1,4 % de las ventas); el BPA ajustado lo devuelve.
- **Capex frente a amortización**: primera versión con capex por debajo de la amortización a perpetuidad daba un DCF de 28,7 €; se corrigió para que el capex terminal (19,8 %) supere a la amortización (19,6 %) y el circulante sea el de 2025 (−3 %). Beta de 0,95 (la medida, 0,29-0,52, es inservible) y 55 % de deuda a mercado.
- **WACC y OAT**: regla del repo (Bund 3,49 % + prima adicional de 2 puntos por África y Francia): WACC 6,46 %, DCF 21,39 €, valor real 20,55 €. Sensibilidad con la OAT (4,85 %): WACC 7,07 %, DCF 16,73 € (−22 %), valor real 16,04 € (−22 %; +13 % sobre el precio). Copia de cálculo en `/tmp/claude-0/fr/orange-2026-10-20/oat/`.
- **Exposición a Francia**: 43 % de las ventas y 52 % del EBITDAaL de 2025 (≈ 36 % y 44 % con España todo el año), más Orange Business. Caída desde el 31-jul (−14,3 %): mitad riesgo país (CAC −7,5 % frente a STOXX −1,5 %; Bouygues −16,2 %) y mitad causas propias (venta de Bpifrance, Morgan Stanley, IA, Starlink).
- **Regla 13: retrasa** hasta el 3-nov-2026: Moody's revisa a Francia el 23-oct y el bloqueo de la venta de Bpifrance vence ≈ el 2-nov (posible nueva colocación del Estado). Los resultados del 27-oct no aplazan. En la práctica no cambia nada porque la regla da Mantener.
- **Resultado**: Mantener, convicción media. Objetivo a 12 meses 13,32 € (v3 −0,9 % / base +4,2 %; v2 +0,3 %). Con BPA −10 %: −10,3 % / −5,7 %. Valor real 20,55 € (+44,7 %). ROIC − WACC −1,4 puntos. Sostenibilidad «En parte».

## Robustez

- **Veredicto: SÓLIDA. Acción vigente y acción robusta: No mantener** (14,20 € por encima del filtro de mantener de 12,79 €).
- Límite de compra con el objetivo fijo 12,24 € (v2: 12,39); **límite de compra robusto (v3 y v2 con BPA −10 %): 11,08 €**.
- **Margen de compra robusta (ponderada con BPA −10 % − 15): −10,3 − 15 = −25,3 puntos.**
- Qué falla para ser compra robusta: la rentabilidad (ponderada −0,9 % frente al 15 % exigido; con BPA −10 %, −10,3 %), la calidad (ROIC − WACC −1,4 frente a ≥ 5; sostenibilidad «En parte») y la regla 13 (retrasa hasta el 3-nov).
- Avisos: D3 (sin cierre en `precios.json`), D4-D6 (BPA publicado frente a ajustado; explicados), M2 (historia de 4 años), M6 (elasticidad del objetivo al precio 0,73), E2 (resultados el 27-oct), C1 (retrasa).

## Controles en «Revisar»

- 19 de 30 controles correctos y 11 explicados: tipo impositivo de 2025 (49 %), BPA publicado frente a beneficio ÷ acciones (cupones de híbridos), BAI − impuestos − minoritarios (actividades interrumpidas de España), caja proyectada frente a histórica y crecimiento del BPA desde el publicado de 2025. Ninguno sin explicar.
- Avisos de `rellenar.mjs`: tabla de suma de partes vacía (no aplica) y mapa de comparables sin ROIC de los comparables.
- Huecos: voto de la retribución en la junta de 2026, BPA ajustado del consenso, BPA trimestral, segmentos de 2021-2024, cifras de SFR y Free, Reddit/X.

## Lecciones

- LECCIÓN: `cuentas.mjs --esef "Orange"` coge Orange Polska; hay que pasar el LEI (969500MCOONR8990S771). El ESEF de 2025 no estaba en filings.xbrl.org: está en el zip del URD en la BDIF de la AMF (documento D.26-0217) y se lee con un extractor iXBRL (ojo: la etiqueta de contexto lleva un espacio antes de «>»).
- LECCIÓN: con Yahoo sin el último cierre de París, el histórico CSV de Euronext (`live.euronext.com/en/ajax/AwlHistoricalPrice/getFullDownloadAjax/<ISIN>-XPAR`) da el cierre oficial del día anterior.
- LECCIÓN: en telecos con NIIF 16 y altas de derechos de uso en el capex, revisar que el capex terminal no quede por debajo de la amortización: la primera versión daba un DCF un 34 % mayor solo por eso.

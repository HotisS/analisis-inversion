# Diario · Norwegian Air Shuttle ASA (NAS.OL) · 19-oct-2026

- Commit de partida: d210e19 («Análisis value de la cola de índices, pareja 1: Applied Nutrition y Dixon (ninguna compra robusta)»); durante el trabajo el coordinador movió el HEAD a f04d576. Checkout compartido con otro análisis en paralelo: sin `git pull`, `commit`, `push`, `checkout` ni `stash`. Solo se escribió en esta carpeta, en `verticales/empresa/simbolos.json` (entrada NAS, edición atómica) y en lo que escriben `precios.mjs NAS` (`precios.json`) y `apuntar-12m.mjs norwegian-air-2026-10-19` (`objetivo12m-revisados.json`). No se tocaron `cola.md`, `MEMORIA.md`, `METODO-VIGENTE.md`, `lecciones*.md` ni `seguimiento.xlsx`; no se ejecutaron `seguimiento.mjs`, `cobertura.mjs`, `regenerar.mjs` ni nada con `--todas`.
- Un `git stash` del coordinador borró la carpeta unos segundos a mitad de trabajo: comprobado después, no faltaba nada (notas, docs, `_commit.txt`, `bolsa.json`, `cuentas-xbrl.json`, entrada de `simbolos.json`).
- Tiempos (UTC, reloj del entorno): investigación y notas A-E en la primera parte de la sesión (antes de una compactación del contexto); parte propia, cálculo, Word, PDF, revisión y robustez terminados ≈ 13:30.
- Sin subagentes: las fases A-E las hice yo (`notas/construir-notas.mjs` escribe A-E.json); parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs` (patrón de CLASSYS).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas 2020-2024 | `cuentas.mjs --esef` (LEI 549300IEUH2FEM2Y6B51), XBRL JSON de filings.xbrl.org | informes anuales 2020-2024 |
| Cuentas 2025 | Integrated Annual Report 2025 (NewsWeb, Oslo Børs) | 2026-03 |
| Trimestres 2T25-2T26, balance de 30-jun-2026 | Informes trimestrales y presentaciones (API de NewsWeb) | hasta 2026-07-14 |
| Tráfico y coberturas de combustible | Traffic figures September 2026 | octubre de 2026 (datos de septiembre) |
| NLTG | Comunicado, presentación, junta extraordinaria y folleto | 2026-06 a 2026-10-16 |
| Gobierno y votos | Convocatoria y acta de la junta de 2026; notificaciones de operaciones | 2026-04 a 2026-10 |
| Precio, beta, rentabilidades, cierres de ejercicio | `bolsa.mjs --accion NAS.OL --indice OSEBX.OL --sector EXV9.DE --corte 2026-10-16` | cierre 16-oct-2026 (11,045) |
| Precio común | `precios.mjs NAS` | cierre 16-oct-2026; sesión en curso 19-oct 10,96 |
| Movimiento (regla 13) | `movimiento.mjs NAS.OL` | 19-oct-2026 (10,97, 14:45 CEST) |
| Consenso y objetivos | MarketScreener (6 analistas), Yahoo earningsTrend, prensa de rebajas de octubre | 2026-10-09 a 2026-10-19 |
| Comparables y tipos de cambio | Yahoo quoteSummary (`comps.mjs`, 9 fichas) | 2026-10-19 |
| Bono noruego a 10 años | Norges Bank (GOVT_GENERIC_RATES) | 2026-10-16 (4,542 %) |
| Prima de mercado | Damodaran ERPbymonth | octubre de 2026 (4,20 %) |
| Queroseno | IATA Jet Fuel Price Monitor | última semana publicada en octubre de 2026 (192,44 USD/barril) |
| Posiciones cortas | Finanstilsynet SSR | 2026-10-15 (1,12 %) |
| Sentimiento | Simply Wall St, Stocktwits, Seeking Alpha (Reddit y foros noruegos bloqueados) | hasta 2026-10 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 19-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, LibreOffice | 19-oct-2026 |
| Objetivo a 12 m | `apuntar-12m.mjs norwegian-air-2026-10-19` | 19-oct-2026 |
| Robustez | `robustez.mjs informes/norwegian-air-2026-10-19 --actual` | 19-oct-2026 (10,96) |

## Decisiones

- **Precio**: el informe usa el cierre del 16-oct (11,05), última sesión cerrada al empezar; robustez con `--actual` usa el de hoy (10,96).
- **NLTG fuera del DCF, dentro del BPA a 12 meses**: la compra se paga a precio de mercado (6,6 veces el EBITDA) con caja y 300 M de acciones; el BPA de 2027e-2028e usa 1.351,5 M de acciones y una aportación neta de NLTG de 450 M en el base (150 / 650).
- **Cíclica, sin margen de pico**: margen EBITDA (EBITDAR) del 14,4 % en 2026e (1S publicado y 2S un 20 % por debajo del de 2025 por el queroseno), 17 % en 2027e, 18,5 % en 2028e y 19 % después (media de 2023-2025 menos un punto). BPA de 2025 normalizado (≈ 1,58) sin las ganancias por comprar aviones arrendados.
- **Capex con derechos de uso** (NIIF 16): 14-18 % de las ventas en 2026e-2028e, con los compromisos con Boeing; circulante −5 % (billetes cobrados por adelantado). Puente: `otros_ajustes` 3.405 M por el exceso estacional de billetes cobrados a 30-jun y la obligación del ETS.
- **Beta 1,2** de aerolíneas europeas (la de OSEBX, 0,23, no sirve); prima adicional de 1,5 puntos; WACC 9,06 %.
- **Bajista −2 puntos de margen** (no −3: con −3 el DCF bajista daba 0,32 NOK, una quiebra, más allá de un caso plausible a 12 meses con 13.700 M de caja).
- **Historia del PER**: v3 con 2022-2024 (2021 y 2025 excluidos); v2 con 2023-2025 normalizado. Con 3 años decide la más baja: v2.
- **Recomendación Mantener frente a la regla Comprar**: el 7,2 % de dividendo (0,80 NOK por 2025) difícilmente se repite tras un 2026 en pérdidas; sin él la ponderada es del 12,9 %. Acción robusta: Mantener (Q1, sostenibilidad En parte).
- **Sostenibilidad En parte**: sin foso, ROIC del −71 % al 26 % según el año.
- Huecos: remuneración de 2025 del consejero delegado, años del auditor y foros (Reddit y noruegos bloqueados).

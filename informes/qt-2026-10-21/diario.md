# Diario: Qt Group Oyj (QTCOM.HE), análisis value completo con corte 21-oct-2026

- Commit de partida: `914ca45` (Airtel Africa: análisis value completo 21-oct…). Checkout compartido con otros análisis en paralelo: sin pull, commit ni push desde aquí.
- Inicio: 21-oct-2026, 15:14 UTC. Intento anterior del 19-oct no usado (encargo: empezar desde cero).
- Procedimiento: `.claude/commands/analiza-empresa.md` y `verticales/empresa/prompt.md` enteros; lecciones núcleo, UE/nórdicos/Reino Unido y casos de software.
- Sin subagentes disponibles en esta sesión: las notas A-E las hago yo, en orden.

## Decisiones

- Cuentas oficiales: ESEF de filings.xbrl.org (`cuentas.mjs --esef "Qt Group"`, LEI 743700GO2XU2ZYYDKW67, ejercicios 2020-2025, informe anual 2025 publicado el 12-mar-2026) comprobadas con el informe anual 2025 y el semestral a 30-jun-2026.
- Cuenta por naturaleza (`coste_ventas` = materiales y servicios). 2025 con 5,8 M de costes de la compra de IAR como no recurrentes; LTM jun-26 con 10,1 M (IAR + reorganización).
- Regalías por dispositivo (licencias de distribución, 56,8 M en 2025, −17 % en 1S26) separadas de las licencias por desarrollador en `negocio.segmentos`; se tratan como la parte cíclica (automoción y electrónica).
- Compras: froglogic (2021), Axivion (2022), IAR (oct-2025, ≈ 205 M, préstamo de 150 M). Liquidación forzosa de minoritarios de IAR (5,1 M) en `otros_ajustes`.
- Compensación en acciones: pequeña en la cuenta (0,6 M en 2025); el plan de 2019 se liquidó en 2022 con ≈ 23 M de caja e impuestos (flujo operativo negativo ese año). No se ajusta el DCF.
- BPA de la regla a 12 meses en base PUBLICADA (NIIF, con PPA), la del consenso de MarketScreener; historia adelantada sin 2021 (burbuja). PER actual sobre el BPA de los próximos 12 meses (0,19 × 2026e + 0,81 × 2027e).
- DCF: arrendamientos como inversión (pagos en el capex; no se restan en el puente) y sin ahorro fiscal por la PPA. WACC 10,36 % (Bund 3,44 %, beta 1,35, prima 5,5 + 0,5).
- Precio: la primera pasada de `bolsa.mjs` (15:18-15:29 UTC) solo daba el cierre del 20-oct (33,32); se repitió a las 15:32 UTC y ya daba el cierre del 21-oct (34,28, último cruce 15:29:52 UTC). El informe y la robustez usan 34,28. `movimiento.mjs` aún mostraba 34,14 (dato intradía de Yahoo), sin cambio en las variaciones redondeadas.
- Resultado: regla a 12 meses +47,6 % ponderada y +42,1 % base, pero valor intrínseco 33,50 < 34,28 → Mantener. Robustez `--actual`: sólida, acción robusta Mantener, límite común 33,50 EUR. Calidad: ROIC del motor 17,7 % frente a WACC 10,4 % (pasa); con el capital completo de IAR ≈ 11-12 %.
- Controles del motor: 20 de 20 correctos. Avisos del Word: suma de partes y calificaciones ESG sin filas (no aplican / no hay fuente primaria), mapa de comparables sin ROIC.
- Fin: 21-oct-2026, 15:48 UTC.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas 2020-2025 | `cuentas.mjs --esef` (filings.xbrl.org) e informe anual 2025 | 31-dic-2025 (publicado 12-mar-2026) |
| Semestre y LTM | Semestral de Qt Group (MFN) | 30-jun-2026 (publicado 6-ago-2026) |
| Trimestres 3T24-2T26 | Informes trimestrales y semestrales (MFN, Cision) | 30-jun-2026 |
| Precio, betas, rentabilidades | `bolsa.mjs` (Yahoo) | cierre del 21-oct-2026 (34,28 EUR) |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo quoteSummary) y MarketScreener | 21-oct-2026 |
| Movimiento (regla 13) | `movimiento.mjs QTCOM.HE` | 21-oct-2026 |
| Tasa libre | Bundesbank (Bund a 10 años, 3,44 %) | 21-oct-2026 |
| Prima implícita | Damodaran (4,20 %) | oct-2026 |
| Mercado | Grand View Research, Global Market Insights | 2026 |
| Gobierno y accionistas | Informe anual 2025, junta de 2026, MFN | 30-jun-2026 |
| Precios del repo | `precios.mjs QTCOM` | 21-oct-2026 |
| Revisión 12 m | `apuntar-12m.mjs qt-2026-10-21` | 21-oct-2026 |
| Robustez | `robustez.mjs informes/qt-2026-10-21 --actual` | 21-oct-2026 (34,28 EUR) |

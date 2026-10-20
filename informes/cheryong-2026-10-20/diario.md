# Diario · Cheryong Electric Co., Ltd. (033100.KQ) · 20-oct-2026

- Commit de partida: e377285 («Cola de índices: IHG (pareja 19)»). Checkout compartido con otro análisis en paralelo (Nongfu Spring): ni `pull`, ni `commit`, ni `push`, ni `checkout`, ni `stash`. Solo se escribió en esta carpeta, en `verticales/empresa/simbolos.json` (entrada 033100, 6 líneas añadidas tras la de Silicon2, sin reordenar) y en lo que escriben `precios.mjs 033100` (`precios.json`) y `apuntar-12m.mjs cheryong-2026-10-20` (`objetivo12m-revisados.json`). No se tocaron `cola.md`, `MEMORIA.md`, `METODO-VIGENTE.md`, `lecciones*.md` ni `seguimiento.xlsx`; no se ejecutaron `seguimiento.mjs`, `cobertura.mjs`, `regenerar.mjs` ni nada con `--todas`.
- Tiempos (UTC): inicio ≈ 11:09; investigación (DART, avisos, FnGuide, Naver News y foro, Yahoo, FRED, prensa coreana) con una compactación del contexto por medio hasta ≈ 11:25; notas A-E, supuestos, cálculo, Word y PDF ≈ 11:39; revisión a 12 meses, símbolos, precios, robustez y diario ≈ 11:42.
- Encargo: análisis value completo desde cero; valorar en serio si la escasez de transformadores en EE. UU. es pico de ciclo, los aranceles a Corea, la competencia nueva y el riesgo de IA (viento a favor); regla 13.
- Sin subagentes: las fases A-E las hice yo (`notas/construir-notas.mjs` escribe A-E.json); parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs` (patrón de Silicon2). Ficha sectorial reutilizada: `sectores/transformadores-2026-10-16.md` (perímetro, mercado final y comparables).

## Decisiones

- Cuentas individuales K-IFRS (la empresa no tiene filiales). Corrección propia: la exportación de 2023 es 150.197 M (81,7 %), no la cifra que había en el primer borrador.
- 2026e fijo con el 1S publicado: ventas −35,1 % (145.387 M) y margen EBITDA del 16,5 %. Margen que baja al 13 % en 2032e (el doble que antes de la escasez, un tercio del pico). Sin las plusvalías financieras del 1S26 (16.792 M) en el BPA.
- WACC del 12,5 % (beta 1,1 y 2 puntos adicionales por tamaño, concentración y ciclo); g 2,5 %.
- Pesos 60 % DCF y 40 % escenarios: sin consenso no hay métrica de los próximos 12 meses y los comparables no dan valor en el motor.
- PER histórico: exclusiones por la regla de atípicos (2020, 2022, 2023 y 2025 en la adelantada; 2021 en la de cierre). Historia de 2 años: el selector elige v2.
- Controles explicados: DCF inverso sin solución (el precio pide un margen del 37,8 %, el de 2024), circulante de 2026e del 24 % (25,3 % en junio) y capitalización publicada con un cierre anterior.
- Resultado: Vender (−66,1 % ponderada, −68,1 % base; v3 sin selector −10,6 %). Robustez SÓLIDA, acción robusta No mantener, límite robusto 10.587,51 KRW.

## Pasos y fecha de los datos

| Paso | Herramienta / fuente | Fecha del dato |
|---|---|---|
| Beta, rentabilidades, volatilidad, cierres de ejercicio | `bolsa.mjs --accion 033100.KQ --indice ^KQ11 --sector 267260.KS --corte 2026-10-20` | cierre 20-oct-2026 |
| Precio del informe y precio común | Yahoo (cierre 15:30 KST) y `precios.mjs 033100` | cierre 20-oct-2026: 40.900 KRW |
| Movimiento (regla 13) | `movimiento.mjs 033100.KQ` | 20-oct-2026 |
| Grandes movimientos diarios de 12 meses | Yahoo chart (1 año, diario) | 21-oct-2025 a 20-oct-2026 |
| Cuentas 2020-2025 | DART: informes anuales de 2025 corregido (rcp 20260602000220), 2024 (20250317000538), 2023 (20240318000327), 2022 (20230331000177), 2021 (20220316001029) y 2020 (20210315000260) | 2021-03-15 a 2026-06-02 |
| Semestre 2026 y balance de 30-jun-2026 | DART: informe semestral (20260813001320) | 2026-08-13 |
| Trimestres y cartera de pedidos | DART: trimestrales 1T24-1T26 (20240513000195 a 20260513000274) | 2024-05-13 a 2026-05-13 |
| Avisos (nave de Bosch, resultados 2025, dividendo, plan de valor, litigio) | DART | 2024-04-12 a 2026-03-24 |
| Consenso | FnGuide/WiseReport (ninguna casa en tres meses) | 2026-10-20 |
| Noticias (sector, Dongmi, Sungjin, Trump, sección 232, GIS, exportaciones, movimientos) | Seoul Economic, Maeil, Financial News, SME Daily, Edaily, Money Today, Ezy Economy, Pinpoint, itooza, Joongang Economy, Topstar, Einfomax | 2025-08-19 a 2026-10-20 |
| Bono coreano a 10 años | FRED IRLTLT01KRM156N | septiembre de 2026 |
| Prima de mercado | Damodaran ERPbymonth | octubre de 2026 |
| Comparables y tipos de cambio | Yahoo quoteSummary (11 fichas; Bosung sin datos), KRW=X, CADKRW=X, TWDKRW=X | 2026-10-20 |
| Foro | Naver 종목토론실 (100 mensajes) y Paxnet | 3-sep al 20-oct-2026 (hora de Corea) |
| Integración, cálculo, Word y PDF | `motor/integrar.mjs`, `motor/calcular-empresa.mjs`, `motor/rellenar.mjs`, LibreOffice | 20-oct-2026 |
| Objetivo a 12 m | `apuntar-12m.mjs cheryong-2026-10-20` | 20-oct-2026 |
| Robustez | `robustez.mjs informes/cheryong-2026-10-20 --actual` | 20-oct-2026 (40.900 KRW) |

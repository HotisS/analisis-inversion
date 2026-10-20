# Diario · SILICON2 Co., Ltd. (257720.KQ) · 20-oct-2026

- Commit de partida: a2af656 (HEAD sin cambios al terminar). Checkout compartido con otro análisis en paralelo (IHG). **Al empezar hice un `git pull` antes de leer la prohibición del encargo** («Already up to date»: no cambió nada); después, ni `pull`, ni `commit`, ni `push`, ni `checkout`, ni `stash`. Solo se escribió en esta carpeta, en `verticales/empresa/simbolos.json` (entrada 257720, 6 líneas añadidas tras la de APR, sin reordenar) y en lo que escriben `precios.mjs 257720` (`precios.json`) y `apuntar-12m.mjs silicon2-2026-10-20` (`objetivo12m-revisados.json`). No se tocaron `cola.md`, `MEMORIA.md`, `METODO-VIGENTE.md`, `lecciones*.md` ni `seguimiento.xlsx`; no se ejecutaron `seguimiento.mjs`, `cobertura.mjs`, `regenerar.mjs` ni nada con `--todas`.
- Tiempos (UTC): inicio 10:36; investigación (DART, avisos, FnGuide, Naver News y foro, Yahoo, FRED) con una compactación del contexto por medio hasta ≈ 10:50; notas A-E, cálculo, Word y PDF ≈ 11:04; revisión a 12 meses, símbolos, precios, robustez y diario ≈ 11:08.
- Encargo: análisis value completo desde cero; decir primero el peso mayorista frente a la venta al público; valorar margen de distribuidor, dependencia de las marcas coreanas, aranceles de EE. UU. y riesgo de IA; regla 13.
- Sin subagentes: las fases A-E las hice yo (`notas/construir-notas.mjs` escribe A-E.json); parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs` (patrón de APR).
- Sector: no hay ficha de distribución de cosmética en `sectores/` (la de higiene y cosmética de gran consumo no es este perímetro) y el encargo no permite escribir fuera de esta carpeta: el mercado final (exportaciones coreanas de cosmética) se define en la nota B. Queda pendiente para el coordinador si quiere la ficha.

## Pasos y fecha de los datos

| Paso | Herramienta / fuente | Fecha del dato |
|---|---|---|
| Beta, rentabilidades, volatilidad, cierres de ejercicio | `bolsa.mjs --accion 257720.KQ --indice ^KQ11 --sector 228790.KS --corte 2026-10-20` | cierre 20-oct-2026 |
| Precio del informe y precio común | Yahoo (15:30 KST) y `precios.mjs 257720` | cierre 20-oct-2026: 32.800 KRW |
| Movimiento (regla 13) | `movimiento.mjs 257720.KQ` | 20-oct-2026 |
| Cuentas 2021-2025 | DART: informes anuales de 2025 (rcp 20260320001024), 2023 (20240320000377) y 2022 (20230322000608) | 2023-03-22 a 2026-03-20 |
| Semestre 2026 y balance de 30-jun-2026 | DART: informe semestral (20260814003895) | 2026-08-14 |
| Trimestres 3T23-2T26 | DART: trimestrales 1T25, 3T25, 3T24 y aviso del 2T26 (20260812900140) | 2024-11-14 a 2026-08-12 |
| RCPS de CVC, almacén, junta, recompra, préstamo, conversión, directivos, participaciones | DART: avisos y declaraciones | 2025-07-25 a 2026-10-19 |
| Consenso y objetivos | FnGuide/WiseReport (13 casas) | 2026-10-19 |
| Noticias (won, recortes, Goodai, APR, moida, almacenes, exportaciones, CVC) | Socialvalue, Maeil, Hankyung, Etoday, Bizwatch, BusinessPost, Edaily, Smart Today, Seoul Economic, Choice News | 2026-02-28 a 2026-10-19 |
| Exportaciones coreanas de cosmética | Asociación Coreana de la Industria Cosmética (vía Medical Economy News), Edaily | 2025 y enero-septiembre de 2026 |
| Bono coreano a 10 años | FRED IRLTLT01KRM156N | septiembre de 2026 |
| Prima de mercado | Damodaran ERPbymonth | octubre de 2026 |
| Comparables y tipos de cambio | Yahoo quoteSummary (10 fichas), KRW=X, JPYKRW=X, EURKRW=X | 2026-10-20 |
| Foro | Naver 종목토론실, 400 mensajes | 13 al 20-oct-2026 (hora de Corea) |
| Integración, cálculo, Word y PDF | `motor/integrar.mjs`, `motor/calcular-empresa.mjs`, `motor/rellenar.mjs`, LibreOffice | 20-oct-2026 |
| Objetivo a 12 m | `apuntar-12m.mjs silicon2-2026-10-20` | 20-oct-2026 |
| Robustez | `robustez.mjs informes/silicon2-2026-10-20 --actual` | 20-oct-2026 (32.800 KRW) |

## Decisiones

- **Canal**: mayorista 93,4 %, venta al público 3,9 %, fulfillment 2,8 % (2025, informe anual). No es minorista: el análisis sigue.
- **2026e fijo**: ventas de 1.594.058 M (+42,8 %: 1S real y 2S de ≈ 845.000 M) y beneficio operativo ≈ 281.000 M (3T ≈ 75.000 M, entre Hana y Kiwoom; 4T ≈ 60.000 M). Después 24 / 16 / 11 / 8 / 6 / 5 / 4 %; margen EBITDA del 18 % bajando al 16 % (2025: 19,2 %) por won, poder de las marcas y desintermediación.
- **Circulante** del 33 % de las ventas en 2026e bajando al 30 % (35 % en 2025): el control «caja proyectada» queda explicado, no corregido.
- WACC 11,95 % (bono 4,45 %, beta 1,0 en vez de 0,62-0,79, prima 5,5 % + 2 puntos), g 3 %; capex 5,8 % en 2026e (Yongin) y 1,8 % después; impuesto 22,5 %. Escenarios 25/50/25: bajista −12 pp de crecimiento y −5 pp de margen; alcista +5 / +1,5.
- **RCPS de CVC**: deuda en el DCF (65,45 M de acciones; otros ajustes +300.000 M y la caja con los 300.000 M cobrados) y acciones en el BPA (72,12 M desde 2027e). La base convertida daría un DCF ≈ 1 % más alto.
- **Historia del PER**: cinco cierres; 2022 y 2023 adelantados (3,9x) excluidos como BPA atípico; quedan 3 años → selector de historia corta → **v2** (14,0 %) frente a v3 (25,9 %).
- Regla 13: **no cambia** (causas conocidas y recogidas; sin hechos con fecha; ventas del fundador con motivo declarado).

## Resultado

- Regla **Mantener**, convicción media: ponderada 14,1 % / base 14,0 % (`apuntar-12m`: 14,0 / 13,9); v3 sin selector 25,9 %; BPA −10 % 2,7 %. Objetivo 37.111 KRW; valor intrínseco 42.368 KRW (+29,2 %); DCF 40.735 KRW.
- **Acción robusta: Mantener en cartera (no comprar)**, veredicto FRÁGIL. Límite de compra (objetivo fijo) 32.527 KRW; **límite robusto común 29.313 KRW**.
- ROIC 2025 45,6 % − WACC 11,95 % = 33,7 puntos; sostenibilidad Sí: la calidad pasa.
- Controles: 21 de 22 correctos y 1 explicado (caja proyectada). Cobertura de campos 85 %; capital, directivos y gobierno por debajo del 60 %.
- Huecos: BPA y consenso previo por trimestre, FCF de los últimos doce meses, ESG, CR5, ventas de Goodai Global USA, votaciones de la junta, posición corta, transacciones comparables.

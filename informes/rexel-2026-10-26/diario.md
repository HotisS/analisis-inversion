# Diario · Rexel (RXL.PA) · 2026-10-26

- **Commit de partida**: `bd8ddc0` (Informe tras resultados 26-oct: CME Group). Sin `git pull` ni ninguna operación git: lo hace el hilo principal (encargo `enc-rexel.md`).
- **Modo**: iteración nueva tras las ventas del 3T26 (22-oct-2026), posteriores al informe `rexel-2026-10-20`. Sin subagentes; fases 2-4 bis en orden A, B, C, D, E por el propio analista, con notas `notas/A.json` … `E.json` (parten de las de la carpeta anterior y se reescriben con lo comprobado a la nueva fecha).
- **Fecha de corte**: 2026-10-26. Ticker y clave iguales a la iteración anterior (`RXL`, `rexel-…`).
- **Horas**: Madrid (UTC+1 desde el 25-oct), siempre de `TZ=Europe/Madrid date`.

## Tiempos y datos de cada paso

| Hora (Madrid) | Paso | Fecha de los datos |
|---|---|---|
| 10:52 | Lectura del encargo, del comando, del prompt entero, de lecciones (núcleo, Francia, casos de distribución) y del diario anterior | — |
| 10:52 | Comprobación de que los resultados existen: página de noticias de Rexel lista «Q3 2026 sales» del 22-oct-2026 con comunicado y presentación en PDF | 2026-10-22 |
| 10:53 | Carpeta `informes/rexel-2026-10-26/` con `notas/` y `notas/docs/`; notas A-E y `.mjs` de la anterior copiadas como punto de partida | — |
| 10:53 | `cuentas.mjs --esef "Rexel"`: LEI 969500N6AVPA51648T62, filings.xbrl.org sigue solo con 2021-2023 (igual que el 20-oct) | ESEF 2021-2023 |
| 10:53-10:56 | Descargas: comunicado y presentación de ventas del 3T26, comunicado y estados del 1S26, GCG, acciones a 1-oct, consenso pre-3T de la empresa | hasta 2026-10-22 |
| 10:54 | `bolsa.mjs` (Yahoo, datos hasta el 23-oct; la sesión del 26-oct estaba abierta) y `movimiento.mjs RXL.PA` (intradía 33,47 a las 10:54). Cierre del 23-oct, 32,63 EUR, confirmado con `previousClose` de Yahoo | 2026-10-23 / 2026-10-26 |
| 10:54-10:57 | Prensa de los resultados (Boursorama: Reuters 22-oct 17:45, AOF 23-oct con Jefferies y AlphaValue; AFP 26-oct sobre Moody's y la OAT). Las ventas salieron el 22-oct **tras el cierre** (la reacción es la del 23-oct, +2,6 %) | 2026-10-22 / 2026-10-26 |
| 10:57 | Consenso tras el 3T: MarketScreener sirve otra cotización y datos viejos, Investing y Stock Analysis también (precio de septiembre): se usa Yahoo `quoteSummary` (13 analistas, objetivo 41,86, BPA 2026e 2,60 y 2027e 3,01, revisado al alza en 7 días) y el consenso pre-3T de la empresa para EBITDA y EBIT | 2026-10-26 |
| 10:57 | Bund 3,39 % (Bundesbank, 23-oct), tipos del BCE del 23-oct, comparables de Yahoo (script `rexel-comps.py` en el scratchpad) | 2026-10-23 |
| 10:58 | Cuentas recomprobadas: cuenta de 2025 contra el URD 2025 (ventas 19.414,6, resultado operativo 1.061,6, neto atribuido 588,9, BPA diluido 1,99, EBITDA 1.552,5) y puente contra la nota 15 del 1S26 (deuda 4.300,5 + coberturas 16,4 − intereses a cobrar 2,2 = 4.314,7; arrendamientos 1.611,0; caja 1.033,8) | 2025-12-31 / 2026-06-30 |
| 10:59 | BDIF de la AMF: sin operaciones de directivos desde el 22-jun; **Cevian bajó del 20 % el 21-may-2026** (59,18 M de acciones, ventas en mercado): la nota C anterior lo daba en ≈ 22 % (error corregido) | 2026-10-26 |
| 11:00-11:02 | Notas A, B, C, D y E reescritas en orden (scripts `rexel-nota-X.py` en el scratchpad); E con los hilos de octubre del foro de Boursorama; transcripción del 3T26 de pago (hueco) | 2026-10-26 |
| 11:03 | Supuestos (`supuestos.mjs`) y `propio.mjs` actualizados; primer integrar + calcular (21 de 22 controles; el tipo de 2024, explicado) | 2026-10-26 |
| 11:04 | `movimiento.mjs RXL.PA --json` → `notas/movimiento.json`; comparación desde el 31-jul con CAC 40, BNP, Saint-Gobain, STOXX 600 y WESCO (Yahoo) | 2026-10-23 / 2026-10-26 |
| 11:05 | Sensibilidad a la OAT (≈ 5,1 %) sobre una copia de `datos.json` en el scratchpad (`rexel-sens.json`), no en el repo | 2026-10-23 |
| 11:05-11:08 | `textos.mjs` y `resumen.mjs` reescritos (síntesis de ≈ 650 palabras); vista previa de `robustez.mjs` para la síntesis | 2026-10-26 |
| 11:08 | Integrar + calcular final: 20 de 21 controles correctos y 1 explicado | 2026-10-26 |
| 11:09 | Word (`rellenar.mjs`, cobertura 90,5 %, 26 gráficos) y PDF con soffice; portada, síntesis y «La decisión» revisadas como imagen | 2026-10-26 |
| 11:10 | `revision-12m-2026-10-26.md`; `apuntar-12m.mjs rexel-2026-10-26` (Mantener 2,3 % → 1,4 %) y grep: la carpeta aparece en `objetivo12m-revisados.json` | 2026-10-23 |
| 11:10 | `robustez.mjs rexel-2026-10-26 --actual` y `--json`: SÓLIDA, No mantener, sin CORREGIR (precio intradía 33,29) | 2026-10-26 |

## Decisiones

- **Fecha de los resultados comprobada** en la propia web de Rexel antes de empezar (noticias: «Q3 2026 sales», 22-oct-2026). Se publicaron tras el cierre (Reuters 17:45): la reacción es la del 23-oct (+2,6 % con el CAC −0,4 %).
- **Precio**: cierre del viernes 23-oct (32,63 EUR). El lunes 26-oct la sesión estaba abierta (33,47 a las 10:54).
- **Base del BPA (aviso del hilo)**: la historia del PER (cierre ÷ BPA publicado del año siguiente: 3,04 / 2,57 / 1,99) y el BPA de los escenarios (publicado, con ≈ 50 M de otros gastos y la amortización de intangibles de compras) están en la **misma base contable**. El consenso (ajustado) solo se usa de contraste. El último PER de la historia (2025) usa nuestro BPA publicado de 2026e (2,45).
- **Circulante del DCF** al 15 % de las ventas (14,8 % en 2025): su nivel real; no se proyecta liberación de caja.
- **Beta reapalancada con la deuda de Rexel**: ajustada de 5 años 1,27 → desapalancada con la D/E media del periodo (≈ 0,45) 0,95 → reapalancada con la D/E de hoy (5.953 / 10.079 = 0,59) 1,37; peso de la deuda a mercado 37 % (el 20-oct, 30 % y 1,26 sin reapalancar). WACC 8,29 %.
- **Consenso tras resultados**: MarketScreener (otra cotización), Investing y Stock Analysis servían datos de septiembre; se contrasta con Yahoo `quoteSummary` del 26-oct (revisado al alza en 7 días). Las estimaciones completas (EBITDA, EBIT) son las de la empresa, pre-3T.
- **2026e**: ventas +7,5 % (9M +6,2 %; 4T con perímetro +2,0 %, divisa +2,1 %, calendario +1,0 % del anexo 2) y margen EBITDA del 8,5 % (guía EBITA ajustado ≥ 6,4 % + efecto cobre + amortización de inmovilizado ≈ 2 %). 2027e +10,0 % con GCG (983 M EUR al tipo del 23-oct) y margen 8,8 %.
- **Sostenibilidad**: reinversión neta del 14 % del NOPAT (el motor no hace la prueba): a mano, el orgánico medio (≈ 4,6 %) cabe en el financiable (5,1 %) porque GCG se paga en el puente; el rendimiento supuesto (11,6 %) supera mucho el ROIC incremental histórico (2,1 %): veredicto «En parte», sin rebajar el base (igual criterio que el 20-oct).
- **Corrección de la iteración anterior**: Cevian no tiene ≈ 22 % sino ≈ 19 % (bajó del 20 % el 21-may-2026, aviso AMF 226C0738). Añadidos Principal (> 5 %, feb) y Pzena (< 5 %, mar).
- **Comparables**: crecimiento de ventas de los próximos 12 meses rellenado (antes, hueco) con el consenso de Yahoo; PER de los próximos 12 meses ponderado 2/12 y 10/12.
- **Regla 13**: «no cambia». Los dos hechos pendientes del 20-oct se resolvieron bien (ventas +11,4 % frente a +6,6 % esperado; Moody's mantuvo Francia en Aa3 negativa el 23-oct). Cevian vende sin colocación anunciada. Próximos resultados el 10-feb-2027.
- **Vista previa de robustez**: se ejecutó `robustez.mjs rexel-2026-10-26` sin `--actual` antes de la síntesis (escribe `verticales/empresa/robustez.json`, que la ejecución final del punto 6 vuelve a escribir).

## Resultado

- Recomendación **Mantener**, convicción **Media** (la sugerida: las dos reglas coinciden, lejos de los umbrales).
- **Línea de 12 meses (v3)**: objetivo 31,88 EUR (14,28 / 32,40 / 48,43); ponderada +1,4 %, base +3,0 %; v2 −10,6 %. BPA 2028e 2,42 / 3,00 / 3,34. PER actual 11,8x, mediana adelantada 9,8x, mínimo 5,9x; comparables 17,6x.
- Valor real 38,78 EUR (+18,8 %); DCF 39,41; WACC 8,29 %; ROIC − WACC 0,0 puntos; sostenibilidad «En parte». DCF inverso: crecimiento implícito 0,0 % (base 5,0 %), rentabilidad implícita 9,1 %.
- Comprar por debajo de 28,76; vender por encima de 36,75 (motor).
- **Robustez** (`--actual`, 33,29 intradía): SÓLIDA, acción robusta **No mantener**; límite robusto 25,38; límite B 26,54; nivel de hoy: ninguno (`limites_nivel_cot` vacío); colchón de BPA −15,6 % (comprar) y −10,6 % (mantener) al precio intradía (−13,6 % y −8,6 % al cierre del 23-oct). Avisos M2, M4, M6.
- Revisión a 12 meses: RXL Mantener 2,3 % (33,07) → Mantener 1,4 % (32,63).

LECCIÓN: en Rexel (y en emisores franceses en general) revisar los avisos de franchissement de seuil de la BDIF en cada iteración: la nota anterior daba a Cevian un 22 % cuando había bajado del 20 % en mayo de 2026 con ventas en mercado.
LECCIÓN: Rexel publica las ventas trimestrales tras el cierre (17:45): la reacción a los resultados es la del día siguiente, no la del día de la fecha.

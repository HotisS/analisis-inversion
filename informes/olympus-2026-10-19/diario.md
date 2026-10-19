# Diario: Olympus Corporation (7733.T), corte 2026-10-19

- Commit de partida: `cbe789c Cola de índices: APR (pareja 8, primera)` (`git log -1 --oneline`). Prompt, lecciones (núcleo), sección de Japón de `lecciones-paises.md` y `METODO-VIGENTE.md` leídos.
- Inicio: 16:01 UTC (18:01 Madrid; 01:01 del 20-oct en Tokio): la sesión de Tokio del 19-oct ya había cerrado.
- Iteración nueva de `informes/olympus-2026-10-09/` (y su `revision-12m-2026-10-13.md`), que no se toca. Mismo ticker (7733). En paralelo, en el mismo repo, los análisis de Munters y Booz Allen.
- Sin herramienta de subagentes en esta sesión: las fases A-E las hice yo. Como el último trimestral sigue siendo el 1T FY2027 (7-ago) y el último yuho el de FY2026 (18-jun), seguí la lección de «iteración»: copié las notas A-D de la carpeta anterior y rehíce solo lo que cambia (precio, bolsa, consenso, comparables, tasa libre, FDA, noticias, próximos resultados), comprobando contra los documentos descargados de nuevo hoy. E (sentimiento) es nueva: la anterior no la tenía.

## Fase 1. Identificación (16:01-16:05)
- Olympus Corporation, TSE Prime 7733, ISIN JP3201200007, NIIF, cierre a 31 de marzo, JPY. Olympus nombra el ejercicio por el año en que **termina** (el encargo decía «1T FY2026»: en la etiqueta de la empresa, el último trimestre publicado es el **1T FY2027**, abril-junio de 2026). `meta.etiqueta_ejercicio: "fin"` y `bolsa.mjs --cierre-mes 3 --etiqueta fin`, como el 9-oct.
- Próximos resultados (2T FY2027): **10-nov-2026** (calendario de inversores de Olympus y Kabutan; la nota D del 9-oct decía 9-nov por MarketScreener: corregido).

## Datos y su fecha
| Paso | Fuente | Fecha de los datos |
|---|---|---|
| Cuentas anuales FY2022-FY2026 | Informe de valores (yuho) FY2026, EDINET 18-jun-2026 (versión inglesa de la empresa), tanshin y cuaderno de datos del 4T FY2026 | ejercicio cerrado el 31-mar-2026 |
| Último trimestre, LTM y balance del puente | Tanshin, cuaderno de datos y presentación del 1T FY2027 (7-ago-2026) | 30-jun-2026 |
| Acciones y recompras | Tanshin del 1T (1.114.485.700 emitidas, 51.666.048 en autocartera) e informes mensuales de recompra de EDINET (vía IR BANK; el último, 7-oct-2026: recompra de mayo terminada, 38.948.300 acciones, 59.999,85 M JPY) | 30-jun / 7-oct-2026 |
| Precio | Yahoo Finance (API de gráficos, `regularMarketPrice` a las 15:30 JST): **1.685 JPY, cierre del 19-oct-2026**; contraste con Investing y Kabutan (1.685, −0,3 %) | 19-oct-2026 |
| Bolsa (rentabilidades, beta, volatilidad, caídas) | `bolsa.mjs` | hasta el 16-oct-2026 (la serie diaria aún no tenía el cierre del 19) |
| Movimiento (regla 13) | `movimiento.mjs 7733.T` | hasta el 16-oct-2026 (1.690) |
| Consenso | MarketScreener (estimaciones sin cambios; objetivo medio 2.123,08) e Investing (4/9/1) | 19-oct-2026 |
| Tasa libre | JGB a 10 años del MoF, 2,958 % | 16-oct-2026 (último publicado) |
| Comparables | Estimaciones de MarketScreener del 8-9-oct llevadas al cierre del 19-oct (Tokio) y del 16-oct (EE. UU. y Londres) | 19-oct / 16-oct-2026 |
| Noticias 12 meses | `noticias.mjs --meses 12`, web de inversores, Kabutan, MarketScreener (Bloomberg), Investing | hasta el 19-oct-2026 |
| Sentimiento | Foro de Yahoo!ファイナンス (72 mensajes, 15-20 oct) | 19-oct-2026 |
| Alerta de importación 89-04 | FDA, versión publicada el 19-ago-2026 (Aizu sigue en la lista roja), consultada hoy | 19-oct-2026 |
| Prima implícita | Damodaran, octubre de 2026 (4,20 %) | oct-2026 |

## Hallazgos (16:05-16:12)
- **Carta de advertencia de la FDA del 7-oct-2026** (publicada por Olympus el 13-oct tras el cierre, ir00014): seis plantas (Olympus Medical Systems en Hachioji e Hinode, Aomori, Shirakawa, Olympus Winter & Ibe en Hamburgo, Gyrus ACMI en Brooklyn Park), por respuestas insuficientes a los 483 de finales de 2025. No restringe producción, ventas ni 510(k); respuesta en 15 días hábiles; sin impacto previsto. **−13,5 % el 14-oct** (13,4 M de acciones), la mayor caída diaria desde 2011. Jefferies: «sistémico, años». Nomura, el 15-oct: Comprar → Neutral, 2.700 → 1.900 JPY. A 19-oct la carta no está en la base pública de la FDA.
- El consenso de BPA no se ha movido (98,04 / 113,90 / 124,80); el objetivo medio baja de 2.184,62 a 2.123,08.
- Sin recompras nuevas, sin colocaciones; dimisión del consejero Ishino (29-sep) ya estaba en la nota C.
- `notas/refresco-2026-10-19.mjs` aplica todo esto a las notas copiadas (con fuentes nuevas D34-D42, B27-B28, C21).

## Decisiones (16:12-16:16)
- **Margen**: FY2028e 21,8 → 21,5 % y FY2029e 22,6 → 22,2 % (medio año más de remediación); FY2027e 20,4 % y el final 22,7 % (límite de sostenibilidad de la v2) sin cambios. Ventas sin cambios: la carta no limita ventas.
- **Probabilidades 25/50/25 → 30/50/20** por la carta.
- **WACC 7,18 → 6,90 %**: JGB 3,089 → 2,958 % y peso de la deuda 15 → 18 % (capitalización más baja); beta 0,99 y prima país 0,75 % como el 9-oct.
- **Historia del PER adelantada rehecha a mano**: la de la v4 (herramienta `historia-adelantada.mjs`) metía FY2023 a 85,4x (BPA de FY2024 normalizado, 27,14) y FY2025 a 31,8x (BPA de FY2026 hundido), que inflaban la mediana a 26,7x. Excluidos los dos como BPA atípico: mediana 20,7x, mínimo 15,8x, media 20,9x (FY2021 25,4x, FY2022 20,7x, FY2024 21,6x, FY2026 15,8x con nuestro BPA de FY2027e).
- **Recomendación Mantener** frente a la regla v3 (Comprar): no pasa la v2 (11,9 %), ni el BPA −10 %, ni la calidad (ROIC − WACC 1,0; sostenibilidad «En parte»), y la respuesta de la FDA es un riesgo binario. Justificación escrita.
- **Regla 13**: veredicto global «no cambia» (la carta ya está en el precio y en el bajista; los resultados del 10-nov no retrasan). Pasaría a «descarta» con un decreto de consentimiento o una restricción de ventas.

## Resultado (16:16-16:20)
- DCF 2.030,05 JPY (+20,5 %); comparables 2.061,84; escenarios 1.894,34; valor intrínseco 2.012,45 (+19,4 %); con la prima del mercado 2.020,60. DCF inverso: crecimiento 0,4 % o margen 20,7 %. Asimetría 1,93x.
- 12 meses: ponderada 18,6 %, base 23,2 % (v3, Comprar); v2 11,9 %.
- Controles: 18 de 24 correctos y 6 explicados. Word 61 páginas, 28 gráficos, cobertura 89,8 %; PDF con LibreOffice (perfil `/tmp/lo-olympus`); revisadas como imagen la portada y el resumen.
- Revisión 12 m: `revision-12m-2026-10-19.md`; apuntada con `apuntar-12m.mjs` (entrada 7733 en `objetivo12m-revisados.json` comprobada, fecha 2026-10-19). `simbolos.json`: 7733 ya estaba; su `carpeta` pasa a `olympus-2026-10-19`.
- `robustez.mjs --actual` (con 1.690 del 16-oct, el que tiene `precios.json`): FRÁGIL, acción robusta **Mantener en cartera**; BPA −10 %: 6,6 % / 10,7 %; límite robusto 1.567,29 JPY; colchón de BPA 3 % para comprar. Sin CORREGIR.
- Línea de la revisión a 12 meses: 19-oct-2026, v3 18,6 % / base 23,2 % → regla Comprar, informe Mantener (v2 11,9 %; robusta Mantener).

## Tiempos
Fase 1: 16:01-16:05. Datos frescos, FDA, noticias y sentimiento: 16:05-16:12. Supuestos, textos, cálculo: 16:12-16:16. Word, PDF, revisión 12 m, apuntar y robustez: 16:16-16:21.

## Fallos del sistema
1. **Cierre del día sin vela diaria**: tras el cierre de Tokio, Yahoo da el precio en `meta.regularMarketPrice` (1.685 a las 15:30 JST) pero la vela del 19-oct sale con `close: null`; `bolsa.mjs`, `precios.mjs` y `movimiento.mjs` caen al 16-oct (1.690) y `robustez.mjs --actual` calcula con ese. Arreglo: que `ultimoCierre` use `regularMarketPrice` cuando `regularMarketTime` es posterior al cierre de la bolsa y la vela del día no tiene cierre.
2. **`precios.mjs 7733 --simular`**: `--simular` no existe en `precios.mjs` y escribió `precios.json` (solo la fila de Olympus cambia).
3. **`historia-adelantada.mjs` no excluye BPA normalizados que siguen siendo atípicos** (FY2024 normalizado a 27,14 por la retirada de Veran daba 85,4x). Con 4 años la regla de atípicos (≥ 5 años) no actúa. Arreglo: aplicar el filtro de atípicos también con 4 años o marcar el año normalizado para revisión manual.
4. EDINET API v2 pide clave; IR BANK sirvió el listado (informes de recompra y yuho).

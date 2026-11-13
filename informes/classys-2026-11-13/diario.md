# Diario · CLASSYS Inc. (214150.KQ) · 13-nov-2026

- Commit de partida: 645f096 («Escáner 12-nov: revisiones de Rai Way, CLASSYS…»). Checkout compartido con otros nueve análisis: sin `git pull`, `commit` ni `push`. Solo escribo en esta carpeta (y lo que escriben `apuntar-12m.mjs --precios` y `robustez.mjs`, con `flock`).
- Encargo: iteración tras el 3T26 (publicado el 12-nov, no el 10-11): ventas planas, margen operativo 32,5 %, beneficio atribuido −81 %. El escáner aplicó BPA ×0,85. Investigar la causa del −81 %.
- Sin subagentes: notas A-E las escribo yo con `notas/construir-notas.mjs` (estructura de la iteración del 19-oct; cada dato que cambia, vuelto a comprobar a 13-nov).

## Pasos (hora de Madrid)

| Hora | Paso | Fuente / herramienta | Fecha del dato |
|---|---|---|---|
| 13-11 09:00 | Inicio; lectura de comando, prompt, lecciones (núcleo y Corea) y METODO-VIGENTE | repo 645f096 | — |
| 13-11 08:56 | Búsqueda en DART (ya responde desde la nube): avance del 3T26 (12-nov), prenda de Bain, aviso de la bolsa, guía, informe semestral (auditor, consejo, retribución), participaciones de Capital Research | dart.fss.or.kr (avisos en cp949; informes periódicos en UTF-8 con viewer.do) | 2026-06-26 a 2026-11-12 |
| 13-11 08:58 | IR Book 3Q26 | classys.com/investors/ir-book → `descargar.mjs` | 2026-11-12 |
| 13-11 08:59 | Bolsa y movimiento | `bolsa.mjs --accion 214150.KQ --indice ^KQ11 --sector 143860.KS --corte 2026-11-13`; `movimiento.mjs 214150.KQ` y `^KQ11` | cierre 13-nov-2026 (23.800) |
| 13-11 09:00 | Consenso y analistas | WiseReport c1080001 (lista de informes) y c1050001_data (consenso FnGuide); PDF de Kiwoom, Shinhan y Kyobo desde la API de investigación de Naver | 2026-11-12 / 13 |
| 13-11 09:01 | Comparables y tipos de cambio | Yahoo quoteSummary (script del scratchpad con `herramientas/yahoo.mjs`), KRW=X, CNYKRW=X | 2026-11-13 |
| 13-11 09:02 | Bono y prima | FRED IRLTLT01KRM156N (sep-2026 4,454 %); Damodaran ERPbymonth (nov-2026 4,41 %) | 2026-09 / 2026-11 |
| 13-11 09:03 | Foro de Naver: 300 mensajes (13-oct a 13-nov) | front-api/discussion/list | 2026-11-13 |
| 13-11 09:05 | Notas A-E: `construir-notas.mjs` (base del 19-oct con bolsa y comparables nuevos) + `actualizar-notas.mjs` (todo lo que cambia) | — | — |
| 13-11 09:07 | Supuestos, propio, integración y primer cálculo | `integrar.mjs`, `calcular-empresa.mjs` | — |
| 13-11 09:08 | apuntar-12m y robustez (con flock) | `apuntar-12m.mjs classys-2026-11-13 --precios`; `robustez.mjs` | precio de precios.json: 24.100 (12-nov) |
| 13-11 09:10 | Textos, resumen, Word y PDF | `rellenar.mjs`; `soffice --headless` | — |
| 13-11 09:12 | Revisión a 12 m y comprobar.mjs | `revision-12m-2026-11-13.md`; `comprobar.mjs` | — |

## Decisiones

- **Causa del −81 % del beneficio del 3T26**: mitad contable y no recurrente (resultado no operativo de +5.200 M a −19.300 M: 4.500 M de pérdidas de cambio por operaciones y 10.600 M por conversión de préstamos en won a Brasil y Japón, más ≈ 4.200 M de intereses y otros) y mitad negocio (beneficio operativo −28,2 %: Corea −35,9 %, costes de venta directa en Latinoamérica y Japón, dólar débil). Sin el cambio, −48 % (estimación propia).
- Señal de alarma del informe anterior (margen operativo del 3T26 ≥ 38 %): **cumplida en contra** (32,5 %). Versión nueva con BPA rehecho; probabilidades 30/50/20 (antes 25/50/25); prima adicional 2,0 (antes 1,5) por el préstamo con prenda de Bain.
- 2026e fijo: 370.839 M (+10,1 %), EBITDA 41,8 %, no operativo −21.000 M, impuesto 26,8 %, minoritarios −4.500 M → BPA 1.375. 2027e +15 % / 42 %; 2028e +12 % / 43 % → BPA 1.870 y 2.138 (antes 2.247 y 2.553).
- **Historia del PER**: sale 2025 (sin BPA real de 2026; la iteración anterior lo dividía por nuestro 2026e) y entra 2020. Mediana 22,78x; actual 12,73x; cociente 1,79 → v3 (v2 al lado: 17,8 / 18,3 %, también Comprar). Base de BPA publicada en historia y escenarios.
- WACC 10,59 % (bono 4,45 %, beta ajustada 0,88, prima 5,5 % + 2,0, Kd 4,5 %, deuda 9 %); g 3 %. Puente a 30-jun-2026 (el informe del 3T26 llega el 16-nov).
- Convicción **media** aunque el motor sugiere alta: colchón de BPA del 11 %, guía incumplida, prenda de Bain.
- Regla 13: **no cambia**; pasaría a «retrasa» con una comunicación de ejecución de la prenda o un bloque.
- DART ya responde: se resolvió el hueco del auditor (EY Hanyoung desde 2025) y el del consejo (siete consejeros, tres independientes, consejero coordinador). Sigue sin retribución individual (nadie supera 500 M).
- No se ejecutó `precios.mjs` (archivo compartido): `apuntar-12m --precios` y `robustez.mjs` usan 24.100 KRW (12-nov); el informe usa 23.800 (13-nov).

## Resultado

- **Comprar**, convicción media. v3 29,3 % / base 30,0 % al precio del informe (27,7 / 28,3 % a 24.100); v2 17,8 / 18,3 %. Objetivo 29.781 KRW; valor intrínseco 29.239 KRW (+22,9 %); DCF 30.294 KRW.
- ROIC 2025 32,70 % − WACC 10,59 % = 22,11 puntos; sostenibilidad Sí.
- Robustez **SÓLIDA**, compra robusta sí, **nivel A**: límite robusto 24.186,77 KRW (comprar a mercado en el KOSDAQ si cotiza ≤ 24.187 KRW); filtro de mantener 27.982,56 KRW; banda Vender de la regla > 34.201 KRW. Avisos D7, P3, P5, M6.
- Controles: 21 de 22 correctos y 1 explicado (circulante del primer año). Cobertura 87,2 %; gobierno por debajo del 60 % (sin votos ni retribución individual).
- Revisión a 12 m apuntada (`objetivo12m-revisados.json`, clave 214150 → classys-2026-11-13).

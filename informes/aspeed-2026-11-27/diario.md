# Diario · ASPEED (5274.TWO) · análisis value · corte 27-nov-2026

- Commit de partida: `35e7572` (tanda de rehacer del 27-nov; sin pull, commit ni push en este encargo; sin subagentes: notas A-E hechas por el orquestador).
- Punto de partida: `informes/aspeed-2026-11-13/` (mismo ticker 5274.TWO). Motivo del encargo: «dato mal en el informe: necesita versión nueva» (lista `rehacer-2026-11-27`).

## Pasos (hora de Madrid)

| Hora | Paso |
|---|---|
| 27-11 10:56 | Inicio: encargo, analiza-empresa.md, prompt.md, lecciones (núcleo, Taiwán, semiconductores), METODO-VIGENTE (reglas 1, 2, 6, 13 y 16). Busca del dato mal: `robustez.mjs` del 13-nov (sin CORREGIR), `comprobar.mjs` (nada de la carpeta), diario y listas. |
| 27-11 11:00 | MOPS (XBRL del 2T26 y del 3T26 por `descargar.mjs`; curl directo da «security»): acciones, BPA trimestrales, dividendo y puente cuadran. `movimiento.mjs` y `bolsa.mjs` al 27-nov (9.600). |
| 27-11 11:03 | Hechos desde el 13-nov: conferencias del 16 y 18-nov (presentación de la empresa), caída del 16-20 nov (prensa), Morgan Stanley neutral, recompra del 26-nov, TPEx (participaciones de oct y preavisos), PTT. Yahoo quoteSummary (consenso y 9 comparables), bono 1,86 %. |
| 27-11 11:07 | Notas A, C, D y E puestas al día; propio, textos y resumen reescritos con las cifras del motor; integrar y calcular: Mantener, 18 de 20 controles + 2 explicados. |
| 27-11 11:10 | Word (5 avisos de tablas o gráficos sin datos, los mismos del 13-nov) y PDF con soffice; revisión 12 m; `apuntar-12m.mjs aspeed-2026-11-27 --precios` y `robustez.mjs --actual` con candado. |
| 27-11 11:12 | `comprobar.mjs`: ningún ERROR de ASPEED; aviso C10 (`simbolos.json` apunta a la carpeta del 13-nov: no se toca en esta tanda). Fin. |

## Decisiones

- **El «dato mal» no está en el informe del 13-nov.** La lista de rehacer lo saca de `verticales/empresa/robustez.json` (18-nov), donde la marca D1 CORREGIR es del informe obsoleto `aspeed-2026-10-20` (precio de 15.900 frente a 9.700 de mercado; el propio registro lo marca `obsoleto: aspeed-2026-11-13`). El del 13-nov no tenía CORREGIR ni aviso de `comprobar.mjs`. Revisado contra MOPS: capital 415.830 miles = 41,583 M acciones; BPA básico del 2T26 44,27 y del 3T26 48,13 (diluido 48,09), nueve meses 126,28 diluido; dividendo pagado 3.024,2 M (80 TWD por acción antigua = 72,73 hoy); caja del puente 8.883,9 = 4.624,0 + 764,3 + 3.140,9 + 354,7; arrendamientos 317,8; minoritarios 29,4; participaciones 640,8. Todo cuadra. El hilo de PTT del 5-ago titulado «Q2: 40,87» no es el BPA del 2T26 (el oficial es 44,27). Única cifra corregida: plantilla de 151 (informe anual de 2025) a 120 (presentación de noviembre de 2026), sin efecto en la valoración.
- **Sin cuentas nuevas**: supuestos del DCF, BPA de los escenarios, puente, trimestres y LTM se mantienen. Ventas de noviembre aún no publicadas (≈ 5-dic); octubre ya estaba.
- **Lo nuevo**: precio 9.600 (−20 % desde el 13-nov; mínimo de 7.860 el 20-nov); consenso 2026e 204,33 y 2027e 338,45, objetivo medio 19.503,09; comparables rehechos (mediana del PER NTM de 28,7x a 24,3x), que bajan el valor intrínseco de 5.261,40 a 4.996,61; recompra del 0,24 % aprobada el 26-nov; Morgan Stanley neutral (14.417).
- **Base de BPA**: publicado (diluido reexpresado) en historia y escenarios.
- **Beta**: se mantiene 1,2 en el WACC aunque la mensual suba a 1,42 con la caída (con la ajustada 1,28 el DCF baja menos de un 10 %).
- **Regla 13**: «no cambia» (caída de grupo y de múltiplo, sin hechos pendientes; recompra a favor; sin preavisos de venta).
- **Resultado**: Mantener (regla 12 m: +38,3 % / +32,8 %, pero valor intrínseco 4.996,61 < precio). Robustez SÓLIDA; si la tienes: Vender (filtro de mantener hasta 5.878,36); compra robusta no; nivel ninguno; límite de compra 4.996,61 TWD.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas anuales 2018-2025 | Web de la empresa, sin cambios | 31-dic-2025 |
| 2T26 y 3T26 (comprobación) | MOPS XBRL (mopsov, `descargar.mjs`) | 30-sep-2026 (publicado 6-nov) |
| Ventas mensuales | API de la empresa | octubre (5-nov-2026); noviembre sin publicar |
| Conferencias con inversores | Presentación de la empresa | 16 y 18-nov-2026 |
| Bolsa, beta, cierres, movimiento | `bolsa.mjs`, `movimiento.mjs 5274.TWO` | 27-nov-2026 (9.600) |
| Consenso y comparables | Yahoo quoteSummary | 27-nov-2026 |
| Participaciones y preavisos | TPEx OpenAPI | oct-26 (20-nov) y 26-nov-2026 |
| Recompra | Prensa (Liberty Times, UAnalyze) sobre el anuncio en MOPS | 26-nov-2026 |
| Bono 10 años | Trading Economics (`descargar.mjs`) | 27-nov-2026 (1,86 %) |
| Prima implícita | Damodaran ERPbymonth | nov-2026 (4,41 %) |
| Sentimiento | PTT Stock | 26-nov-2026 |
| Revisión 12 m y robustez | `apuntar-12m.mjs --precios`, `robustez.mjs --actual` | 27-nov-2026 (9.600) |

## Revisión a 12 meses

v3 ponderada +38,3 %, base +32,8 % → Mantener (v2 27,6 %); apuntada en `objetivo12m-revisados.json` con `apuntar-12m.mjs aspeed-2026-11-27 --precios`.

## Para quien mantenga las lecciones (no tocadas)

- `robustez.json` conserva filas de informes obsoletos con sus marcas CORREGIR: las listas de «rehacer» deben filtrar `obsoleto` (ASPEED: D1 del 20-oct atribuida al del 13-nov).
- `simbolos.json` debe pasar 5274.TWO a `aspeed-2026-11-27` (aviso C10).
- Taiwán: el curl directo a `mopsov.twse.com.tw` devuelve «FOR SECURITY REASONS»; `descargar.mjs` sí lo abre.

# Diario · Intuit (INTU) · 20-nov-2026 (análisis value, iteración 4, tras los resultados del 1T FY27)

- Commit de partida: 4e23a15 (Escáner 20-nov: revisiones y señales). Prompt `verticales/empresa/prompt.md` y método vigente (v3 ×1,1 con selector; niveles A y B desde el 16-nov).
- Petición de Hotis («Si rehaz», 21-nov 00:51). Cuatro subagentes en paralelo (A cuentas; D mercado y valoración; B+C sector, equipo y gobierno; E sentimiento), partiendo de las notas del 28-oct y comprobando cada dato con el 10-Q, la nota de resultados y los 8-K del 19-nov. PDF con `soffice`.
- Fecha de corte 2026-11-20; precio = cierre del 20-nov (270,44 USD). Punto de partida: `informes/intuit-2026-10-28/`.

## Pasos (hora de Madrid)

- 21-11 00:52 · Inicio; CLAUDE.md, comando, diario y revisión del 28-oct; carpeta nueva.
- 21-11 00:53 · `cuentas.mjs --sec INTU` (XBRL FY2017-FY2026) y `movimiento.mjs INTU` (270,44 el 20-nov; −23,8 % en un mes).
- 21-11 00:54 · Lanzados los subagentes A, D, B+C y E. `precios.mjs` (377 precios, cierres 19-20 nov).
- 21-11 00:56-00:59 · Notas E, A, B, C y D terminadas: 1T FY27, guía nueva del 2T y del año, venta de Mailchimp (8-K Item 1.01), 10-Q (balance a 31-oct, planes 10b5-1, demandas), `bolsa.mjs` hasta el 20-nov, Tesoro 4,92 %, cinco rebajas de objetivo del 20-nov. El consenso de después de los resultados no estaba publicado.
- 21-11 01:00-01:03 · supuestos, propio, textos y resumen; integrar y calcular (19 de 22 controles correctos, 3 explicados); `apuntar-12m.mjs --precios` y `robustez.mjs --actual`.
- 21-11 01:04 · Word y PDF (60 páginas, portada revisada como imagen).
- 21-11 01:05-01:06 · `cobertura.mjs --arreglar`, `seguimiento.mjs`, `simbolos.json` → carpeta nueva, `comprobar.mjs`: 0 errores.
- 21-11 01:07 · Revisión 12 m y diario; commit y push.

## Decisiones

- Guía nueva de FY2027 (23.081-23.365 M, +8-9 %): FY2027e +8,3 % (antes +9,5 %) y 0,5-1 punto menos en los siguientes años por Credit Karma (guía +3-7 %, antes +11-13 %). Margen EBITDA FY2027e 35,7 % (beneficio operativo GAAP de la guía sin cambios sobre menos ingresos).
- **Mailchimp**: la venta (3.680 M; 3.310 M en efectivo y 368 M en acciones de Bending Spoons) no ha cerrado y la guía la sigue incluyendo. DCF y BPA con Mailchimp dentro; puente sin ajuste. Estimación propia: con ingresos planos y un 35 % de margen EBITDA vale unos 3.400 M al WACC sin crecer, así que cambiar sus flujos por el precio deja el valor casi igual (+1 USD por acción); para el BPA, −5-6 % de beneficio y −4-5 % de acciones con las recompras: casi neutra.
- BPA de 12 meses: resultado financiero −80 M (antes −50: más intereses por los bonos de junio), 27 % de impuestos, 265,6 M de acciones. FY2027e = 20,21 USD, dentro de la guía.
- WACC: Tesoro 4,92 % (20-nov), beta mensual 5 años 1,01 (antes 0,96), deuda 8,8 % → 9,94 %.
- Sostenibilidad «En parte» (sin cambio): QuickBooks Online +19 %, pero TurboTax baja precios y Credit Karma frena por la IA.
- Precio y noticias: «no cambia». La caída del 20-nov tiene causa conocida y ya está en las cifras; ese día el software cayó en general (IGV −4,6 %).
- Comparables: precios al 20-nov y consenso del 10-oct (sin el de después de sus resultados): baja confianza, peso 15 % sin cambio.
- Comparado con el 28-oct: precio 328,45 → 270,44; objetivo ponderado 371,57 → 301,08; ponderada 14,6 → 13,1 %; base 16,8 → 15,2 %; VI 448,17 → 426,00; filtro de mantener 342,27 → 278,13; límite de compra 327,28 → 266,04.

## Revisión a 12 meses

Intuit · 20-nov-26 · 270,44 USD (cierre 20-nov) · objetivo ponderado 301,08 USD (+13,1 % con dividendo) · base 306,59 (+15,2 %) · v2 (selector: desrateada) · VI 426,00 (+57,5 %) · consenso 407,89 (antes de rebajas) · regla **Mantener**, informe **Mantener** (baja) · robustez **FRÁGIL**, compra robusta no · nivel **ninguno** (sostenibilidad «En parte») · si la tienes: **Mantener**, filtro de mantener 278,13 USD · banda Vender de la regla 339,94. Detalle en `revision-12m-2026-11-20.md`.

## Qué vigilar

- Consenso revisado tras los resultados (ventas de FY2027e hoy por encima de la guía).
- Cierre de la venta de Mailchimp (principios de 2027) e impuestos de la operación; guía actualizada sin Mailchimp.
- Campaña fiscal 2027 (enero-abril) y 2T FY2027 hacia finales de febrero: Credit Karma y TurboTax.

## Lecciones

- Sin lección nueva general.

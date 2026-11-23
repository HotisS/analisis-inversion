# Diario — Nemetschek (NEM.DE), corte 2026-11-23 (versión nueva por la caída)

- Commit de partida: c5cc68a Calendario: fecha de resultados de Intuit.
- Motivo: petición de Hotis 23-nov 15:51 («revisa que pasa con nemeshtek»): −16 % en la semana y −33 % en un mes, sin noticia propia según el escáner; versión nueva pedida (lista de informes por actualizar del 23-nov). Iteración anterior: `informes/nemetschek-2026-11-06/`.
- Sin cuentas nuevas desde el 3T26 (5-nov). Hecho sin subagentes: notas A-C copiadas de la iteración del 6-nov y comprobadas (cifras clave del 3T26 contra el comunicado trimestral descargado de nuevo; operaciones de directivos en la BaFin); D (consenso, comparables, bolsa, Bund) y E (sentimiento) rehechas con datos del 23-nov; textos y síntesis reescritos.
- Horas en hora de Madrid (`TZ=Europe/Madrid date +%H:%M`).

## Pasos

- 15:52 Fase 1. Procedimiento, prompt entero y lecciones (núcleo y Alemania). EUR, NIIF-UE, ejercicio natural, Xetra NEM (Yahoo NEM.DE), ISIN DE0006452907. Carpeta nueva.
- 15:53 `movimiento.mjs NEM.DE` (23-nov, intradía 50,65; −6,4 %): 1 m −33,1 %, 12 m −45,6 %, en mínimos de 52 semanas; avisos P3, P4, P5. Cierres diarios de Yahoo del último mes; comparación con SAP, Dassault y el resto del sector.
- 15:54 Noticias (`noticias.mjs --valores NEM --meses 1` y prensa): JPMorgan baja a «Underweight» desde «Overweight» y el objetivo de 110 a 50 EUR el 23-nov (dpa-AFX en ARIVA, ad-hoc-news, AktienCheck); Goldman baja de 100 a 90 (Buy) el 18-nov; Deutsche Bank «Buy» 80 el 16-nov. Sector: peor semana de la tecnología europea desde marzo de 2020 (Reuters vía finwire, 23-nov); 17-nov, peor día en ocho meses (restricciones a chips de IA). BaFin: últimas operaciones de directivos, compras del 30-jul y 19-ago; nada después. EQS e IR no abren desde la nube.
- 15:55 Consenso y comparables con Yahoo `quoteSummary` del 23-nov (NEM y siete comparables): BPA 2027e 2,77 (2,91 hace 60 días), ingresos 1.728 M sin cambios, objetivo medio 86,12 (17). Comparables rehechos (no llevados al precio): EBITDA de los últimos 12 meses publicado, PER de los próximos 12 meses ponderado por meses, EBITDA de los próximos 12 meses a margen constante (estimación propia); Hexagon solo capitalización y PER (perímetro de Octave). MarketScreener bloqueado. BCE 20-nov; Bund 3,37 % (Bundesbank, 23-nov).
- 15:56 `bolsa.mjs` (corte 23-nov): la sesión no había cerrado; precio del informe = cierre del 20-nov, 54,10 EUR. Beta semanal 5 a 1,02.
- 15:57 Notas D, C y E actualizadas (script en el scratchpad); supuestos: solo WACC (Bund 3,37 %, beta 1,02, deuda a mercado 10,5 %). Primer cálculo: DCF 81,04; regla v2 por el selector (desrateada) → 27,1 % / 26,2 %, Comprar.
- 15:58 `robustez.mjs` (sin y con `--actual`): SÓLIDA, si la tienes Mantener; filtro de mantener 62,53; a 54,10 compra no robusta (nivel B); a 50,85 compra robusta, nivel A (≤ 53,91).
- 15:59-16:02 Textos reescritos (limitaciones, bolsa, contexto de la regla 13, múltiplos, comparables, transacciones, sentimiento, WACC, lectura del DCF, escenarios, valoración, riesgos, objetivo a 12 meses) y síntesis (646 palabras). Comprobación del comunicado del 3T26 (ingresos 371,1 / 1.011,8 M, EBITDA 115,9 M, caja 263,9 M, minoritarios 767,1 M y 12,3 M en el trimestre): cuadra con la nota A.
- 16:02 Integración y cálculo: 20 de 21 controles correctos y 1 explicado (2019, NIIF 16). Word (59 páginas, cobertura 92,1 %) y PDF con LibreOffice; portada y resumen revisados como imagen.
- 16:03 `revision-12m-2026-11-23.md`; `simbolos.json` → carpeta nueva; `apuntar-12m.mjs --precios` (NEM: Comprar 39,7 % a 68,00 → Comprar 27,1 % a 54,10). `cobertura.mjs --arreglar`, `seguimiento.mjs`, `comprobar.mjs`.

## Decisiones

- **Supuestos de negocio sin cambios** frente al 6-nov: no hay cifras nuevas de la empresa y el consenso de ingresos no se ha movido. La rebaja de JPMorgan es una opinión sobre riesgos que el informe ya tenía (Design, Media, Thoma Bravo) y que están en el bajista y en el BPA publicado.
- **Probabilidades 25/55/20 sin cambios.** El riesgo nuevo es de múltiplo (desrateo del sector), y lo recoge la regla al pasar a la v2.
- **Convicción media** aunque el motor sugiere alta: a 54,10 la compra no es robusta (BPA −10 %), el desrateo puede seguir (M1) y el ROIC con HCSS bajará en marzo.
- **Base de BPA: publicado** en casos e historia (igual que el 6-nov). Aviso D7 explicado (consenso ajustado).

## Qué ha cambiado frente al 6-nov

- Precio 68,00 → 54,10 (−20 %); 50,85 en la sesión del 23-nov.
- PER actual 32,1 → 25,5; mediana del PER de los comparables 29,5 → 21,3.
- Regla: v3 → v2 (desrateada). Objetivo ponderado 94,30 → 68,08; rentabilidad 39,7 % → 27,1 % (base 38,6 % → 26,2 %).
- Valor intrínseco 79,30 → 77,51; DCF 82,04 → 81,04.
- Filtro de mantener 86,35 → 62,53; límite del nivel A 74,42 → 53,91.

## Revisión a 12 meses

- 2026-11-23: objetivo a 12 meses 68,08 EUR (v2 por el selector: desrateada), ponderada +27,1 %, base +26,2 %, Comprar; v3 sin selector +39,9 %. Detalle en `revision-12m-2026-11-23.md`. Apuntado con `apuntar-12m.mjs --precios`.

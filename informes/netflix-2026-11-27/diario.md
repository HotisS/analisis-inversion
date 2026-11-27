# Diario Netflix 2026-11-27

- Commit de partida: 3d983a2 (git log -1 al empezar; sin pull: checkout compartido de la tanda del 27-nov).
- Inicio: 09:57 (hora de Madrid). Motivo: la acción cae ≈ 21 % desde la compra y el informe tiene un mes; está en la cartera con una ampliación pendiente en nivel A. Corte 27-nov-2026. Anterior: netflix-2026-10-28.
- Fases A-E hechas por el analista sin subagentes. A y B copiadas del 28-oct sin cambios (no hay resultados nuevos: el 3T26 y su 10-Q ya estaban; `cuentas.mjs --sec NFLX` da las mismas series 2016-2025). C, D y E puestas al día con `notas/actualiza-2026-11-27.mjs` (se ejecuta sobre copias de las notas del 28-oct). Textos en `notas/textos.mjs`, `notas/resumen.mjs` y `notas/nuevo.mjs` editados.

## Pasos y fecha de los datos
1. Cuentas SEC: `cuentas.mjs --sec NFLX` (XBRL anual 2016-2025, 27-nov) y 10-Q del 3T26 (30-sep-2026, presentado el 21-oct): sin cambios.
2. Presentaciones en EDGAR desde el 15-oct (submissions, 27-nov): solo Form 4 y 144; sin 8-K posteriores al 20-oct. `form4.mjs` desde el 1-oct: ventas del neto de acciones restringidas entregadas el 3-nov (Sarandos, Peters, Neumann, Hyman); ninguna compra.
3. Precio: `bolsa.mjs` y `movimiento.mjs` al cierre del 25-nov (59,41 USD; 1 m −5,0 %, 12 m −44,5 %, P5). Diario de Yahoo 20-oct a 25-nov: NFLX −5,0 % desde el 27-oct frente a SPY −6,9 % y XLC +1,7 %; caída del 4 al 20-nov (−14,6 %) con el SPY −10,0 %.
4. Consenso: Yahoo quoteSummary del 27-nov (BPA 2026e 3,572, 2027e 3,765; objetivo medio 84,55; sin cambios de recomendación desde el 22-oct). MarketScreener (2028e y EBITDA) del 28-oct.
5. Tesoro a 10 años 4,85 % (CSV del Tesoro, 25-nov); prima de Damodaran de noviembre 4,41 % (ERPbymonth.xlsx); BCE 1,0975 USD/EUR (26-nov).
6. Comparables rehechos con Yahoo al 25-nov (DIS, CMCSA, FOXA, SPOT; TKO y Roku en parte llevados con el precio; FCF yield y Fox NTM del informe anterior escalados). Mediana PER 23,4x.
7. Noticias desde el 28-oct (prensa, 6-26 nov): corrección general del mercado; rumor NBCUniversal (Variety, 14-nov, sin oferta); puja por el Mundial 2030 (19-nov, 1.500-2.000 M); 13F de Pershing (sube a 15,4 M acciones a 30-sep); cierre de Radford (≈380 M, 25-nov, ya en la guía).
8. Sentimiento: Stocktwits 26-27 nov, feed de Seeking Alpha y Motley Fool del 10-24 nov.

## Decisiones
- Supuestos operativos y BPA de los escenarios sin cambios (3,50 / 4,29 / 4,94 en 2028e). WACC 11,04 % (Tesoro 4,85 %, deuda a mercado 5,8 %, beta 1,20).
- Base del BPA: **ajustada** en historia y casos (como el 28-oct).
- El selector pasa a **v2** (30,3 / 16,1 = 1,88 ≥ 1,8) solo por el precio; la v3 al lado (31,0 %).
- Resultado del motivo: la caída desde la compra es casi toda anterior al 28-oct y tiene causa conocida (guía del 3T26, publicidad, visionado, YouTube, rebajas); desde el 28-oct −5,0 % sin noticia propia, menos que el mercado. **La tesis no cambia.** Regla 13: «no cambia».

## Resultados
- Cálculo: DCF 64,30 (+8,2 %), valor intrínseco 64,79 (+9,1 %), mercado 76,02. DCF inverso 6,9 % frente a base 7,9 %. 12 m (v2) 18,9 % / 16,3 % (objetivo 70,63). Regla Comprar, convicción baja (absoluta Mantener, relativa Comprar). 22 de 23 controles correctos y 1 explicado. Sostenibilidad «Sí»; ROIC 38,0 − WACC 11,04 = 27,0.
- Word y PDF «Netflix - 2026-11-27» (soffice, 61 páginas).
- 10:10: `apuntar-12m.mjs netflix-2026-11-27 --precios` (con candado): Comprar 30,7 % (62,52) → Comprar 18,9 % (59,41). `robustez.mjs --actual` (con candado): SÓLIDA; Si la tienes: Mantener (hasta 64,21 USD); compra robusta no (B1: BPA −10 % da 7,0 %); nivel ninguno; límites A 55,29 y B 57,80 USD; colchón 4 % / 8 %.
- `comprobar.mjs`: ningún ERROR de esta carpeta; avisos C10 (simbolos.json NFLX apunta a la carpeta del 28-oct) y C15 (mantener_hasta de NFLX en reglas.json, 20-nov, ya pasó): los arregla el coordinador.

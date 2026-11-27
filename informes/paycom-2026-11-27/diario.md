# Diario — Paycom Software (PAYC), corte 2026-11-27

- Commit de partida: `3d983a2 Escáner 27-nov 9:00: revisiones y señales`. Iteración nueva del informe del 15-oct (tanda del 27-nov, un solo agente sin subagentes, en paralelo con otros en la misma copia; sin commits).
- Motivo: a ≈4,1 % de su nivel B (el límite era el valor intrínseco de 237,29 USD) y resultados del 3T26 del 4-nov muy buenos (escáner: BPA ×1,06, sube la guía).
- Horas (Madrid, `TZ=Europe/Madrid date`): inicio 10:21; Word y PDF 10:36; cierre 10:37 (el reloj del contenedor avanza menos que el trabajo real; se anotan tal cual).

## Pasos y fecha de los datos
1. Cuentas XBRL de la SEC (`cuentas.mjs --sec PAYC`): anuales 2016-2025, sin cambios frente a octubre; correcciones de siempre (DPA, inmovilizado 2024-2025, deuda 2023-2025 = 0, no recurrente de 2024, patrimonio de 2016). Datos a 31-dic-2025.
2. 3T26: nota de resultados (8-K del 4-nov), 10-Q (5-nov, acciones a 27-oct), dividendo (8-K del 2-nov), transcripción completa de la conferencia (TradingKey, 5-nov; Motley Fool y Earnings Whispers no abrían). Datos a 30-sep-2026.
3. Directivos y accionistas: `form4.mjs` desde 1-oct y Form 144 y 13G/A de EDGAR (13 a 25-nov). Hallazgo: plan 10b5-1 del fundador (Item 5 del 10-Q) para vender hasta 1,09 M de acciones del 1-dic-2026 al 1-jun-2027.
4. Bolsa (`bolsa.mjs`, `movimiento.mjs`): cierre del 25-nov-2026 (26 festivo, 27 sin cerrar), 247,49 USD. Cotizaciones diarias de octubre-noviembre de Yahoo.
5. Consenso: Yahoo quoteSummary (25-nov: BPA ajustado 13,07 / 15,13; objetivos y cambios de analistas) y MarketScreener (9-nov: ingresos, EBITDA, EBIT y BPA GAAP 2026-2028).
6. Comparables rehechos (no llevados al precio): ADP, Paychex, Paylocity, Workday, Intuit y TriNet con Yahoo del 25-nov (EV, LTM y consenso de BPA y ventas ponderado por meses); ROIC del informe de Paychex.
7. Tasa libre: CSV del Tesoro, 10 años al 4,85 % (25-nov). Prima implícita de Damodaran, noviembre de 2026: 4,41 %. BCE 26-nov: 1,0975 USD/EUR.
8. Noticias de 12 meses (`noticias.mjs`): EEOC, ventas de directivos, cambio de índice (SmallCap 600 → MidCap 400 el 2-dic, S&P DJI 23-nov). Foros: Stocktwits API y RSS de Seeking Alpha (26-nov).
9. Notas: `construir-notas.mjs` (base del 15-oct) + `actualiza-2026-11-27.mjs` (todo lo nuevo); `supuestos.mjs`, `propio.mjs`, `textos.mjs` reescritos. Integrar, calcular, Word (cobertura 89 %, 28 gráficos), PDF con soffice.
10. `robustez.mjs --actual` y `apuntar-12m.mjs --precios` (con flock); `comprobar.mjs`: ningún ERROR de esta carpeta.

## Decisiones
- DCF: 2026e fijo en la guía (+8,0 %, margen EBITDA GAAP 45,5 %), 2027e +7,5 % y 45,5 % (más gasto comercial anunciado), 46,0 % desde 2028e; capex 5,5 %; impuestos 28,5 %. WACC 9,44 % (Rf 4,85 %, beta 0,90 entre la mensual de 5 años 0,73 y la semanal de 5 años 1,20; deuda 6,3 % al 5,8 %).
- BPA 2028e: 12,96 / 14,76 / 15,96 (antes 11,79 / 13,52 / 14,69; ×1,09). Historia del PER y casos en la misma base (GAAP normalizado, `base_bpa: "ajustado"`); 2025 sigue con nuestro 2026e (cinco años útiles; quitarlo sería menos prudente).
- Comparables: PER sobre BPA ajustado de consenso y EV/EBITDA contable de Yahoo; sesgos opuestos explicados en controles; pesos sin cambios (45/20/5/30).
- Regla 13: veredicto «no cambia»; el plan del fundador se lee como diversificación (adoptado antes de un 3T que batió, ~1,2 % del volumen diario, devuelve su peso al ~10,7 % previo a las recompras), con la condición de pasar a «descarta» si se amplía o vende fuera del plan.
- Recomendación Comprar con convicción Baja (la sugerida).

## Resultado
- DCF 261,32 USD (+5,6 %); valor intrínseco 269,62 USD (+8,9 %); DCF inverso 5,1 % frente a 6,0 %.
- Revisión a 12 meses (v3, 2028e): objetivo 304,74 USD; ponderada 23,7 %, base 22,3 % → Comprar. v2: 15,8 % / 11,5 % → Mantener.
- Robustez: FRÁGIL; si la tienes, Mantener (hasta 278,39 USD); compra robusta no; **nivel B** (límite 250,80 USD; A 239,89 USD); colchón de BPA 8 % / 12 %.
- Calidad: ROIC − WACC 23,4 puntos; sostenibilidad Sí.

## Lecciones
- El 10-Q trae en el Item 5 los planes 10b5-1 de directivos y fundadores: ni `form4.mjs` ni el escáner los ven hasta que hay ventas. Leerlo siempre en una iteración tras resultados (Paycom: plan del fundador para el ~18 % de su participación).
- Los cambios de índice de S&P DJI llegan como «Paycom and Guardian shift indexes» en el RSS de Seeking Alpha (Paycom pasa del SmallCap 600 al MidCap 400 el 2-dic-2026); `noticias.mjs` no lo clasificó.

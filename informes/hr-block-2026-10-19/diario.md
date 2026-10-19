# Diario: H&R Block (HRB), análisis value del 19-oct-2026

- Commit de partida: `3e0f31e96eaf4a790d3980ddb43999436ba05606` (14:44 UTC, «Seguimiento: rehecho tras integrar la pareja 5»). Checkout compartido con otro análisis en paralelo: sin pull, commit ni push desde este hilo (al terminar, HEAD era `c41a165`, del otro hilo).
- Inicio: 14:53 UTC. Fin: ≈ 15:20 UTC (reloj del sistema).
- Análisis nuevo, método completo (no había informe anterior de H&R Block). Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`, siguiendo la forma de `informes/cardinal-health-2026-10-19/`.

## Decisiones

1. **Cuentas XBRL con el cierre forzado al 30 de junio.** `herramientas/cuentas.mjs --sec HRB` elegía el cierre más repetido en la historia (30 de abril, el de FY2012-FY2021) y no daba FY2022-FY2026. Se usó una copia corregida en el scratchpad (opción `--cierre 06-30`) sin tocar la herramienta del repo: `notas/cuentas-xbrl.json` (FY2022-FY2026) y `notas/cuentas-xbrl-abril.json` (histórico de abril, no usado). **Fallo de herramienta a apuntar** en lecciones por el hilo principal (este hilo no toca `lecciones*.md`): con un cambio de cierre de ejercicio, `cuentas.mjs` debería quedarse con el último cierre, no con el más frecuente.
2. **Ejercicio a 30 de junio, etiqueta «fin»** (FY2026 = jul-25 a jun-26). Ejercicio objetivo de la regla a 12 meses: **FY2028e**.
3. **BPA en base ajustada** (la de la guía y el consenso): FY2026 = 5,31 USD; el GAAP (5,69) lleva 84,1 M de beneficio fiscal discreto. BPA propio calibrado con FY2026 (5,31) y la guía FY2027 (6,17 frente a 6,04-6,24); acciones 120,5 M (FY2027e) y 116,4 M (FY2028e) con solo la recompra guiada.
4. **PER actual = precio ÷ BPA de los próximos 12 meses** (8,4/12 de FY2027e + 3,6/12 de FY2028e = 6,33 → 7,7x). La señal de la regla depende de esta elección (solo FY2027e: ≈ 17 %, Comprar; solo FY2028e: ≈ 11 %, Mantener): frágil, explicado en la revisión.
5. **Historia del PER**: solo FY2021-FY2026 (el cierre en abril antes no es comparable); fuera el cierre de FY2020 (COVID y temporada aplazada al 15 de julio).
6. **ROIC con capital diminuto** (recompras: patrimonio 117,5 M): el del motor (125,3 %) no sirve; medida exigente a mano = EBIT 907,7 × (1 − 23,6 %) ÷ (inmovilizado 141,5 + fondo de comercio 812,5 + intangibles 267,0 + derechos de uso 597,6 − circulante 98,1 = 1.720) ≈ 40 %; ROIC − WACC ≈ +31 puntos. En `controles_explicados`.
7. **Sostenibilidad «En parte»** (el motor da «Sí»): el volumen asistido no crece y todo el crecimiento es precio, justo lo que amenazan la IA y las rebajas de TurboTax. El base ya resta volumen desde FY2030e.
8. **WACC con beta 0,80 + 1 punto de prima específica** (beta medida 0,42): el riesgo de sustitución por IA no se mueve con el S&P 500. Bajista con un 30 % de probabilidad.
9. **Recomendación Mantener frente a la Comprar de la regla**, con `justificacion_recomendacion`: sostenibilidad «En parte» y v2 de control 9,7 % (< 10 %). Control «Compra robusta» explicado.
10. **Pesos**: escenarios 50, DCF 40, comparables 10 (comparables de otro riesgo; transacciones sin múltiplos salvo TaxAct).
11. **Puente**: deuda 1.491,5, caja 958,7 (junio, tras la temporada); arrendamientos operativos fuera (US GAAP); otros ajustes 77 M por las recompras entre junio y septiembre (las acciones son de septiembre). Se quitaron los segmentos de FY2024 (no cuadraban) y la capitalización se tomó de acciones × precio.
12. **Precio**: el informe usa el cierre del 16-oct (48,67 USD); la decisión se comprueba con la sesión del 19-oct en `robustez.mjs --actual` (48,31 USD, `precios.mjs` a las 15:17 UTC = 11:17 de Nueva York; 48,02 en Yahoo a las 14:54 UTC).
13. **Regla 13**: veredicto «no cambia». Movimientos fuertes con causa (mayo y agosto: resultados y guía; septiembre −23 %: rebajas de precio y día del inversor de Intuit, sin noticia propia); tendencia alcista; resultados del 1T (≈ 5-nov, sin confirmar) a 17 días y poco informativos por la estacionalidad.

## Resultado

- Regla a 12 meses (v3, sin marcas del selector), cierre del 16-oct: ponderada 15,3 %, base 18,9 % → Comprar en el límite; v2 de control 9,7 % (Mantener). Con la sesión (48,31): 16,3 % / 19,9 %; v2 10,6 %.
- Valor intrínseco 77,95 USD (+60,2 %); DCF 79,61 (WACC 9,22 %); con la prima del mercado 90,29. DCF inverso: ventas −4,3 % al año.
- Robustez (`--actual`): **FRÁGIL, acción robusta «Mantener en cartera»**; límite de compra 48,84 USD (v2 46,45); límite robusto 44,11; BPA −10 %: 5,0 % / 8,2 %. Calidad: ROIC − WACC ≈ +31 puntos (pasa), sostenibilidad «En parte» (no pasa).
- Recomendación del informe: **Mantener, convicción media**.
- Controles: 19 de 20 correctos y 1 explicado (compra robusta).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales FY2022-FY2026 | XBRL de la SEC (`cuentas.mjs` con cierre forzado 06-30, copia en scratchpad) | 10-K FY2026, 14-ago-2026 |
| Notas de resultados y guía | 8-K de la SEC (4T FY2026, 3T, 2T, 1T; 4T FY2022-FY2025) | 11-ago-2026 (último) |
| Gobierno y remuneración | Proxy 2026 (DEF 14A), 8-K 5.02 y 5.07 | 29-sep-2026 |
| Operaciones de directivos | `herramientas/form4.mjs` | 19-oct-2026 (Form 4 hasta 30-sep-2026) |
| Bolsa, beta, cierres anuales | `herramientas/bolsa.mjs` (HRB, SPY, XLY) | cierre del 16-oct-2026 |
| Consenso, objetivos, comparables | Yahoo quoteSummary (`notas/yahoo-datos.mjs`) | 19-oct-2026, 14:56 UTC |
| Tasa libre | Tesoro de EE. UU., curva par | 16-oct-2026 (10 años 5,09 %) |
| Prima implícita del mercado | Damodaran, ERPbymonth | oct-2026 (4,2 %) |
| Sector | IBISWorld, IRS (estadísticas de la temporada), Intuit 4T FY2026 | abr-2026, 8-may-2026, 25-ago-2026 |
| Noticias y sentimiento | Seeking Alpha, MarketBeat, Stocktwits, búsqueda web | hasta 15/16-oct-2026 |
| Movimiento del precio (regla 13) | `herramientas/movimiento.mjs HRB` | 19-oct-2026 (48,02 en sesión) |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 19-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, LibreOffice | 19-oct-2026 |
| Revisión a 12 meses | `revision-12m-2026-10-19.md`, `herramientas/apuntar-12m.mjs` | 19-oct-2026 |
| Precio del día | `herramientas/precios.mjs HRB` | 19-oct-2026, 15:17 UTC (48,31 en sesión) |
| Robustez | `herramientas/robustez.mjs --actual` | 19-oct-2026, 15:18 UTC |

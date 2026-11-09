# Diario — Intercontinental Exchange (ICE), corte 2026-11-09

- Inicio: 2026-11-09 09:34 (hora de Madrid).
- Commit del repo al empezar: 7810b25 Escáner 9-nov 9:00: revisiones (Kainos, GEA, ASPEED), calendario y precios.
- Prompt: verticales/empresa/prompt.md de ese commit (no se cambia a mitad).
- Petición: Hotis (9-nov, 9:32 Madrid) pide rehacer el informe porque el anterior (`informes/ice-2026-10-28/`, corte 28-oct) es anterior a los resultados del 3T26 (29-oct-2026, 10-Q del 3T).
- **Empresa fijada por Hotis** («mantengo todo», 20-oct, sin fecha de fin). El informe del 28-oct daba Vender para quien la tiene por calidad (ROIC − WACC −0,5 < 4,5). Se vuelve a comprobar con cuentas frescas; la señal se da tal cual sale del método.
- Iteración nueva (tercera: 8-oct, 28-oct, 9-nov). Fases 2-4 hechas por mí, sin subagentes (no tengo la herramienta Agent; cuatro análisis en paralelo en el repo). Notas A-E copiadas de la iteración del 28-oct y revisadas campo a campo con lo publicado desde entonces.

## Fase 1 — Identificación
- Intercontinental Exchange, Inc. (Delaware), NYSE: ICE. ISIN US45866F1049. CIK 0001571949. USD, ejercicio natural (31-dic), US GAAP. Ticker y clave igual que en el informe anterior (ICE).
- Precio: cierre del viernes 6-nov-2026, 172,27 USD (bolsa.mjs y movimiento.mjs); el 9-nov Nueva York no ha abierto. +10,8 % desde el informe del 28-oct (155,44). Máximo de 52 semanas el 5-nov (177,94).
- Resultados del 3T26: 29-oct-2026 (8-K, anexo 99.1, y 10-Q en EDGAR). Próximos: 4T26 el 4-feb-2027 (nota del 3T26).

## Tiempos (hora de Madrid)
- 09:34 inicio, git pull (al día), lectura de CLAUDE.md, METODO-VIGENTE.md, MEMORIA.md, analiza-empresa.md, prompt.md entero, lecciones.md, sección de EE. UU. y casos de bolsas.
- 09:35 cuentas.mjs --sec ICE (XBRL 2016-2025, sin cambios en los anuales), bolsa.mjs (corte 6-nov), movimiento.mjs ICE, form4.mjs desde 9-nov-2025.
- 09:36-09:40 EDGAR: nota de resultados y 10-Q del 3T26; 8-K de MarketAxess (junta del 29-oct: fusión aprobada). Tesoro a 10 años 4,86 % (6-nov, CSV del Tesoro). Damodaran: ERP de noviembre de 2026 = 4,41 % (fila nueva del Excel). Yahoo quoteSummary (consenso, objetivos, cambios de recomendación). Precios de los 9 comparables al 6-nov (comparables-2026-11-06.json). Prensa de la conferencia (National Mortgage News, Capital.com) y nota de ICE con Trade[XYZ]. E: Stocktwits y RSS de Seeking Alpha.
- 09:40-09:47 supuestos.mjs, propio.mjs, textos.mjs y resumen.mjs nuevos; integrar.mjs y calcular-empresa.mjs (19 de 20 controles correctos y 1 explicado: regresión R² 0,04).
- 09:47-09:48 Word (28 gráficos, cobertura 93,5 %; único aviso: ESG sin calificaciones) y PDF con soffice (61 páginas); revisadas portada y síntesis (642 palabras).
- 09:48 revision-12m-2026-11-09.md; apuntar-12m.mjs y --precios (con flock); robustez.mjs; comprobar.mjs: ningún ERROR de ICE (los dos ERROR C1 son de Aon y Daiichi, análisis en curso de otros trabajadores); aviso C10: simbolos.json de ICE apunta aún a ice-2026-10-28 (lo cambia el coordinador).

## Qué se ha comprobado de nuevo con el 3T26
- 3T26: ingresos netos 2.765 M (+14,7 %), BPA GAAP 1,67 y ajustado 2,02 (+18 %; consenso 1,97: Superior). 9M26: ingresos 8.408 M (+13,2 %), BPA ajustado 6,27.
- LTM sep-26 (2025 + 9M26 − 9M25): ingresos 10.912, EBIT 5.703, EBITDA 7.264 (+106 de integración y asuntos regulatorios), beneficio 4.162, BPA 7,34, FCF 4.831, DPA 2,04.
- Guía nueva: recurrentes de Bolsas +9 % y Renta fija y datos +8 % en 2026; gastos ajustados del 4T26 1.082-1.092 M (año ≈ 4.228 M); no operativo ajustado 175-185 M; **capex 2026 ≈ 1.050 M (antes ≈ 850)**; 558-563 M acciones en el 4T26. MarketAxess: cierre previsto en el 1T27.
- Puente del 30-sep-2026: deuda 19.600 M (23.304 − 3.704 de los bonos de MarketAxess, cuya caja de 3.700 M está restringida para la compra: los dos fuera), caja 936, minoritarios 78 (48 + 30 rescatables), pensiones 49, participadas 2.994 (Polymarket ≈ 2.000, OKX 200, puesta en equivalencia 537, Bakkt 62, NAV 6). Acciones: 558,86 M en circulación el 26-oct + 2 M de dilución = 560,9 M.
- **Calidad con cuentas frescas**: el motor sigue usando el ROIC del ejercicio 2025 (8,1 %) frente a un WACC del 8,43 % → **−0,3 puntos**. Con el balance del 30-sep y el LTM, a mano: NOPAT (5.703 + 106) × 76,5 % = 4.444 M sobre un capital invertido de 48.641 M (patrimonio 29.899 + minoritarios 78 + deuda 19.600 − caja 936) = 9,1 % → +0,7 puntos. Las dos lecturas quedan muy por debajo de 4,5: **la venta por calidad se confirma**.

## Decisiones
- Base del BPA: ajustado en historia y casos (sin H1). Historia del PER: 2025 ÷ nuestro 2026e (8,20) = 19,8x; mediana 5 años 21,2x, mínimo 18,3x.
- 2026e fijo: +12,1 % (9M26 + consenso del 4T26) y margen EBITDA 67,6 % (guía de gastos). Capex 9,4 % en 2026 y 8,5 % en 2027 (antes 7,7 % y 7,5 %), amortización propia del 5,5 % al 5,8 %. 2027e +5,0 % (consenso +6,3 %), como en el informe anterior.
- BPA: tipo del 24,0 % (cuadre de 9M26), resultado financiero ajustado −725 M en 2026e y −720 M después, minoritarios 70 M, 565 M de acciones en 2026e y 560,9 M después, sin recompras.
- WACC 8,43 % (Rf 4,86 %, beta 0,88 ajustada mensual 5 años, prima 5,0 %, Kd 5,7 %, deuda 17 %). ERP de referencia 4,41 % (noviembre).
- Comparables: los mismos 9 del 23-oct llevados al 6-nov con el precio (no recogen sus 3T26; dicho en limitaciones).
- Regla 13: veredicto «no cambia» (resultados ya publicados; MarketAxess aprobada; sin hecho pendiente con fecha que pueda mover más de un 5 %).
- Recomendación del informe = la de la regla: **Mantener, convicción Baja** (la sugerida: las reglas del valor intrínseco discrepan y la ponderada está a 0,7 puntos del umbral).
- Empresa fijada por Hotis («mantengo todo», 20-oct): se dice aquí; la señal se da tal cual sale del método.

## Resultado
- DCF 174,66 USD (+1,4 %), valor intrínseco (síntesis) 185,94 (+7,9 %), DCF inverso 4,6 % de crecimiento y 67,3 % de margen (rentabilidad implícita 8,5 %). Escenarios 117,85 / 174,66 / 220,56 (asimetría 0,89).
- **Línea 12 m**: objetivo ponderado 194,83 USD → **+14,3 %** (base 191,27 → **+12,2 %**); bajista 134,15, alcista 262,64; v2 de control 14,4 % (base 8,4 %). Regla: **Mantener** (antes Comprar 19,8 %: cambia por el precio, no por el negocio). Comprar por debajo de 171,19; banda Vender por encima de 218,75.
- robustez.mjs: **SÓLIDA**; senal_cartera **Vender (calidad: ROIC − WACC −0,3 < 4,5)**; accion_robusta **No comprar**; sin nivel de compra; limite_mantener_cot **179,00 USD**; colchón de BPA para mantener 4 %; límite robusto por números 154,34.
- Fin: 09:49 (hora de Madrid).

## Fase 2 — Revisión completa pedida por Hotis (vía coordinador, 09:49)
Hotis no acepta un refresco: «el informe anterior solo sirve de punto de partida; cada dato se vuelve a comprobar». Lo que quedó copiado del 28-oct se rehace.

### Tiempos (hora de Madrid)
- 09:49-09:53 Transcripción completa del 3T26 (Stock Analysis/Quartr, 58.000 caracteres, notas/docs/ice-3t26-transcripcion-sa.txt) y estadísticas de octubre de ICE (4-nov, PDF). Fallaron: roic.ai, MarketBeat y Benzinga (transcripción); la presentación del 3T26 no está en una URL pública que se pueda adivinar (404) y la API de ir.theice.com se descartó.
- 09:53-09:56 Lectura del turno de preguntas y de la guía (gastos, tipo fiscal, capex, hipotecas, energía, MarketAxess).
- 09:56-10:00 Comparables cifra a cifra: Yahoo (cierres del 6-nov, cambio EUR y GBP, consenso de ventas y BPA 2026e-2027e, EBITDA trimestral normalizado; notas/docs/yahoo-comparables-2026-11-09.json) y estadísticas de S&P Global Market Intelligence en Stock Analysis (notas/docs/sa-stats/). MarketScreener: 403.
- 10:00 10-Q del 3T26 de MarketAxess (6-nov) para la transacción.
- 10:00-10:02 A, B y C contra el 10-Q de ICE, las estadísticas de octubre, form4.mjs (9-nov) y la lista de presentaciones de EDGAR desde el 20-oct (solo 8-K de resultados, 10-Q y Form 144: nada de proxy ni 8-K nuevos). Fannie Mae de octubre: 403 (se queda la previsión de septiembre).
- 10:02 E: Stocktwits, Seeking Alpha y Motley Fool abiertos directamente; Reddit, MarketBeat, Investing.com, TipRanks e InvestorsHub: 403; interactive investor: 404; Hacker News y Lemmy: sin hilos de ICE.
- 10:02-10:05 textos.mjs, resumen.mjs, D.json, A.json, B.json, C.json y E.json; integrar, calcular (20 de 21 controles y 1 explicado: regresión R² 0,15), apuntar-12m y --precios (con flock), robustez, Word (28 gráficos, cobertura 93,5 %) y PDF con soffice; revision-12m-2026-11-09.md.
- 10:06 comprobar.mjs: 0 errores; aviso C10 (simbolos.json de ICE apunta aún a ice-2026-10-28; lo cambia el coordinador).

### Qué datos cambiaron
- **Comparables (D)**: rehechos con sus 3T26 y el cierre del 6-nov, ya no movidos con el precio desde el 23-oct. Mediana EV/EBITDA de los próximos 12 meses 18,9x → **17,6x**; PER de los próximos 12 meses 26,8x → **23,4x** (bajan Tradeweb 33 → 28, Nasdaq 28 → 23, S&P Global 27 → 24 y LSEG 27 → 18, cuyo BPA era contable). Valor por comparables 233,22 → **209,65 USD**. R² de la regresión 0,04 → 0,15. Cboe tiene ahora EBITDA de los próximos 12 meses y crecimiento. El EBITDA de los próximos 12 meses es estimación propia (EBITDA de los últimos 12 × ventas del consenso de los próximos 12 / ventas de los últimos 12).
- **Transacción MarketAxess (D)**: con su 10-Q del 3T26: caja neta 458 M (antes 305 M a junio), EV 5.427 M (antes 5.580), ventas y EBITDA de los últimos 12 meses 872 y 418 M (antes 870 y 430): EV/EBITDA 13,0x (igual), EV/ventas 6,23x (antes 6,41). Sin transacciones nuevas con fuente primaria y múltiplo.
- **Transcripción (trimestres, guía, DCF, riesgos)**: el capex de 1.050 M se debe sobre todo a la compra de un campus en Atlanta en el 4T26 (puntual: apoya bajar al 8,5 % en 2027, sin cambio de supuesto); tipo fiscal ajustado del 4T26 en la parte alta del 24-26 % (el 24,0 % del BPA sale del cuadre de 9M26; se deja); Tecnología hipotecaria: ingresos de transacción del 4T26 por debajo del 3T y del 4T25, guía de 2027 en enero-febrero, Sprecher «no puede contestar directamente» sobre escindirla y la cifra en un 10 % del beneficio tras MarketAxess; apalancamiento 2,65x; 250 M de deuda amortizados; interés abierto de energía 66 M de lotes; Trade[XYZ] y OKX «pequeños al principio». Se retiran las fuentes de prensa (National Mortgage News, Capital.com) y el hueco de la transcripción.
- **Estadísticas de octubre (B y riesgos)**: volumen +14 %, interés abierto +10 %, energía solo +3 % (Brent +3 %, TTF +13 %). Nuevo KPI y nueva señal del riesgo de energía.
- **A (balance)**: vencimientos al 30-sep (papel comercial 962 M, 2.000 M de bonos de 2027 ya a corto, 2.500 M en 2029 con el bono nuevo, 14.650 M desde 2031), liquidez (936 M de caja libre, unos 2.700 M disponibles de la línea), coste medio 3,9 % y vida media 12 años (antes 3,7 % y 13), ingresos diferidos 416 M.
- **C (gobierno)**: Form 4 hasta el 9-nov: 94,1 M USD vendidos (antes 92,9 M), ventas nuevas de Jackson (4 y 5-nov), Namkung (29-oct y 4-nov) y King (4-nov); ninguna compra.
- **E**: cuatro fuentes abiertas desde el 29-oct (Stocktwits 25 mensajes, 10 alcistas y ninguno bajista; Seeking Alpha noticias y artículos; Motley Fool del 1-nov); fuera Quiver y eToro (de junio-julio).
- **Sin cambios**: supuestos del DCF y del BPA, puente, WACC, escenarios y suma de partes (ya estaban con el 10-Q y la nota del 3T26). EBITDA del consenso: sigue el de MarketScreener del 8-oct (403 hoy).

### Resultado de la fase 2
- Valor intrínseco (síntesis) 185,94 → **181,23 USD (+5,2 %)**; DCF 174,66 (igual).
- **Línea 12 m**: objetivo ponderado 194,83 → **186,50 USD, +9,4 %** (9,5 % en apuntar y robustez); base 191,27 (**+12,2 %**, igual); alcista 23,4x → 229,32; v2 de control 11,8 % (base 8,4 %). Regla: **Mantener**. Comprar por debajo de 163,95 (antes 171,19); banda Vender por encima de 209,49 (antes 218,75).
- robustez.mjs: **FRÁGIL** (antes SÓLIDA): la vigente no pasa el filtro de mantener (ponderada < 10 %) y la v2 de control sí. senal_cartera **Vender (no pasa el filtro de mantener con la regla vigente)**; la calidad tampoco pasa (ROIC − WACC −0,3). accion_robusta **No comprar**. limite_mantener_cot **171,42 USD** (antes 179,00), por debajo del precio; colchón de BPA para mantener: ninguno (antes 4 %). Límite de compra 163,97; límite robusto 147,81 (antes 154,34). Sostenibilidad: Sí.
- Recomendación del informe: **Mantener, convicción Baja** (la ponderada queda medio punto por debajo del filtro de mantener y la v2 lo pasa).
- Fin de la fase 2: 10:06 (hora de Madrid).

# Diario · Aon plc (AON) · 9-nov-2026

- Commit de partida: 7810b25 («Escáner 9-nov 9:00: revisiones (Kainos, GEA, ASPEED), calendario y precios»). `git pull --ff-only` al empezar: ya al día.
- Petición de Hotis (9-nov, 9:32 Madrid): rehacer el informe de Aon, que tiene en cartera, porque el anterior (`informes/aon-2026-10-14`) es anterior a los resultados del 3T26 (28-oct-2026, nota de resultados y 10-Q).
- **Empresa fijada por Hotis hasta el 15-ene-2027.** Con el precio de hoy (≈334,81 USD), la señal de cartera con el informe viejo daba Vender por precio: su filtro de mantener llegaba hasta 330,57. La señal de este informe se da tal cual sale del método.
- Fecha de corte: 2026-11-09 (lunes, antes de abrir Nueva York). Precio = cierre del viernes 6-nov, 334,81 USD (bolsa.mjs y movimiento.mjs). USD, cierre en diciembre, US GAAP, CIK 315293. Mismo ticker que el informe anterior (AON).
- Hecho en la nube: Node con `NODE_USE_ENV_PROXY=1` y PDF con soffice. Sin la herramienta Agent, las fases A-E las hice yo. La primera pasada (09:34-09:50) partió de las notas del 14-oct; el coordinador pidió el procedimiento entero (el informe anterior solo como punto de partida) y la segunda pasada (09:50-10:03) rehízo D, B, C, E y A con documentos originales, como se detalla abajo. Se escriben igualmente `notas/A.json` … `notas/E.json` (con `notas/construir-notas.mjs`).

## Tiempos (hora de Madrid)
- 09:32 petición; 09:34 inicio y pull (al día, 7810b25).
- 09:35 cuentas.mjs --sec AON (XBRL de la SEC) y bolsa.mjs (AON frente a SPY y KIE; beta mensual 0,60).
- 09:35-09:42 descargas y lectura de la nota de resultados del 3T26 (Exhibit 99.1) y del 10-Q del 3T26. Fuentes de mercado:
  - bono a 10 años del Tesoro: 4,86 % el 6-nov;
  - ERP de Damodaran de nov-2026: 4,41 %;
  - BCE: 1,1165;
  - consenso de Yahoo y MarketScreener; Estimize; JPMorgan 13G/A (6,7 %);
  - Form 4: nada nuevo desde el 14-oct.
- 09:42 notas A-E rehechas (construir-notas.mjs): A cuentas y 3T26, B sector, C gobierno, D mercado, E sentimiento.
- 09:43-09:47 propio (supuestos, puente, textos y bolsa.contexto), integrar.mjs (46 fuentes, 10 huecos) y calcular-empresa.mjs. Primera pasada de robustez: C3 (faltaba bolsa.contexto), corregido.
- 09:48 primer cálculo: 19 de 20 controles correctos y 1 explicado (regresión R² 0,13). Word y PDF con soffice: 47 páginas.
- 09:49 revision-12m-2026-11-09.md, apuntar-12m.mjs (+ --precios), robustez.mjs (sin C3) y comprobar.mjs. Su único ERROR, C1 de Daiichi Sankyo, es de otro análisis en paralelo, no de Aon. El aviso C10 dice que simbolos.json aún apunta a la carpeta vieja de AON: lo cambia el coordinador.

## Decisiones
- **Base del BPA: ajustado de la empresa** en casos, historia del PER (adelantada y v2), comparables y consenso (H1). Va declarado `base_bpa: 'ajustado'` en `objetivo_12m` y en `per_historico`. Motivo: USI añade ≈1.060 M de amortización de intangibles al año, y el BPA publicado pro forma de 2025 (11,24) no es comparable con el histórico (17,02).
- Acciones de 2028e: 215,0 M en lugar de 216,5 M (213,0 M diluidas de media en el 3T26 más ≈1 M al año de pagos en acciones, sin recompras). El beneficio por escenario no cambia. BPA 2028e: 20,20 / 22,88 / 24,78.
- Puente al 30-sep-2026 (10-Q):
  - deuda 28.041 (1.722 a corto + 26.319, con los 13.500 M de bonos de USI);
  - caja 15.316 (2.017 de caja + 13.299 de inversiones a corto);
  - minoritarios 116; pensiones 374;
  - otros ajustes 17.135 (precio de USI y costes pendientes).
  - El motor prorratea 2026e desde el cierre de 2025, así que es coherente.
- Margen EBITDA de 2026e: 31,5 → 30,7 % (el 3T26 dio 25,2 % de margen EBITDA GAAP en el trimestre y 27,0 % de margen operativo ajustado).
- WACC: tasa libre 4,86 % (Tesoro, 6-nov), ERP 4,41 % (nov-2026), beta 0,85, Kd 5,8 %, impuesto 21 %, peso de la deuda 31 %. WACC del motor: 8,00 %.
- Comparables: los PER NTM del 14-oct, llevados al cierre del 6-nov con la variación de precio de cada uno (los BPA no cambian). Mediana 18,1x.
- Reaseguro +7 % en el 3T26: lleva una reversión de 24 M (sin ella ≈2,5 %; el orgánico del grupo sin ella ≈5,4 %). Se dice en el texto y no se extrapola.
- Regla 13 (bolsa.contexto con movimiento.mjs): 1 m +20,8 %, 12 m −2,0 %, tendencia lateral, sin avisos. Dos movimientos fuertes:
  - sep-2026, −22,4 % (USI);
  - oct-nov, +27,3 % (rebote del sector tras Marsh el 15-oct y el 3T26 propio).
  - Los dos, con las 7 noticias, dan «no cambia».
- Convicción **Baja**, la que sugiere el motor: la regla absoluta da Mantener y la relativa Comprar. Además, no es compra robusta (B1).

## Resultado
- **Línea 12 m (v3)**: ponderada 413,18 USD → **+24,3 %**; base 418,70 (18,3x × 22,88) → **+26,0 %**; bajista 294,92 (14,6x × 20,20); alcista 520,38 (21,0x × 24,78). v2 de control 18,9 % / 14,4 % (Comprar). Recomendación **Comprar**, convicción Baja.
- Valor intrínseco 361,67 (+8,0 %) tras la segunda pasada (361,27 en la primera). DCF 380,63 (WACC 8,00 %, VT 75 %). Con la prima implícita del mercado: 396,73. DCF inverso 5,6 % frente al 7,5 % del base.
- ROIC 15,6 % − WACC 8,00 % = 7,6 puntos; sostenibilidad Sí.
- Robustez: **SÓLIDA**. «Si la tienes: Mantener». ¿Compra robusta? **No** (B1: con el BPA −10 %, 12,0 % / 13,5 %). Acción robusta Mantener.
- Niveles de compra: nivel hoy B1; límite A 326,11; B1 340,94; límite de compra con el objetivo fijo 361,67 (v2: 341,81).
- **Filtro de mantener hasta 378,36 USD** (precio de venta para quien la tiene).
- Banda de la regla: Vender por encima de 462,56. Colchón de BPA: 8 % para Comprar, 12 % para mantener.
- Frente al 14-oct:
  - precio 275,32 → 334,81 (+21,6 %, rebote del sector);
  - objetivo 360,60 → 413,18 (el múltiplo base sigue al PER actual: 15,2x → 18,3x);
  - ponderada 32,1 → 24,3 %;
  - valor intrínseco 342,28 → 361,67 (bono más bajo, puente al 30-sep y transacciones con Baldwin);
  - filtro de mantener 330,57 → 378,36;
  - compra robusta: de Comprar a no.
- Con el informe nuevo, la señal para quien la tiene pasa de «Vender por precio» a Mantener.
- Revisar: la prueba ampliada P6 (estabilidad del margen EBIT, informativa); el cierre de USI en el 4T26; el CFO interino; los resultados del 4T26 el 29-ene-2027 (estimado).

## Segunda pasada: procedimiento completo (09:50-10:03, hora de Madrid)
Petición del coordinador: rehacer cada fase con la profundidad de `prompt-de.mjs <letra>`, sin heredar cifras del 14-oct sin comprobarlas.
- 09:50 lectura de `prompt-de.mjs D` (comparables: cifras de cada empresa por separado, a la misma fecha y con el mismo criterio).
- 09:51 **D, comparables**:
  - Yahoo quoteSummary de AON, MRSH, WTW, AJG, BRO, RYAN y BWIN: precio del 6-nov, capitalización, EBITDA e ingresos LTM a 30-sep y estimaciones 2026-2027. Guardado en `notas/comparables-yahoo.json`.
  - Notas de resultados del 3T26 de cada rival, descargadas de la SEC a `notas/docs/comp/`.
  - Deuda financiera y caja a 30-sep-2026, tomadas de cada nota de resultados, sin arrendamientos operativos:
    - Marsh: 1.644 + 18.889 de deuda, 1.842 de caja;
    - WTW: 749 + 5.783 de deuda, 1.946 de caja;
    - Gallagher: 1.008 + 11.735 de deuda (sin la financiación de primas), 1.213 de caja;
    - Brown & Brown: 413 + 7.346 de deuda, 1.099 de caja;
    - Ryan: 42 + 3.634 de deuda, 169 de caja.
  - Acciones contrastadas con la portada de cada 10-Q (XBRL dei): Marsh 475,51 M, WTW 92,22 M, Gallagher 256,40 M, Brown & Brown 331,69 M.
  - Lo que se mantiene de la ficha del 14-oct: el EBITDA ajustado NTM de MarketScreener y el ROIC. La página de MarketScreener no se ha actualizado desde el 12-oct.
- 09:52 **D, transacciones**: añadida la exclusión de bolsa de Baldwin (14-sep-2026), tomada de su 8-K: valor empresa 7.700 M, ≈20 veces el EBITDA ajustado de 396 M y prima del 88 %. Baldwin sale de los comparables porque cotiza pegada a la oferta de 32,50 USD. Mediana de las transacciones: 402,42 → 389,44.
- 09:53 **B**:
  - índice de tarifas de Marsh del 3T26 (21-oct): −5 %, noveno trimestre de bajadas;
  - ranking de AM Best de 2025, publicado por Beinsure: los 20 mayores suman 122.000 M y los cinco primeros 73.600 M, con lo que **cr5 ≈ 27 %** (antes era un hueco);
  - IBISWorld como tercera fuente de tamaño de mercado (641.800 M, definición amplia);
  - los 3T26 de Marsh, WTW, Gallagher, Brown & Brown y Ryan, leídos de sus notas de resultados;
  - los ingresos de 2025 de los rivales cuadran con AM Best.
- 09:53-09:55 **C**:
  - `form4.mjs` del 9-nov-2025 al 9-nov-2026, guardado en `notas/form4.json`: compras del presidente del consejo, 7,83 M (24.000 acciones); ventas del secretario general, 4,72 M (13.790 acciones; 3,30 M con plan 10b5-1). Ninguna operación desde el 3-sep-2026.
  - Leídos el proxy de 2026 y los 8-K del 2-ene, 7-ene, 1-jul, 17-ago y 22-sep, y los 13G, en `notas/docs/gob/`.
- 09:55 **A**:
  - cada cifra de la cuenta, el balance y los flujos de las notas comparada con el XBRL de la SEC;
  - diferencias, todas criterios ya documentados: amortización de intangibles sumada; activos fiduciarios fuera; caja que incluye las inversiones a corto (2025: 1.195 + 1.603 = 2.798); arrendamientos operativos fuera;
  - deuda 2019-2025 y 30-sep-2026 cuadrada con DebtCurrent + LongTermDebtNoncurrent;
  - BPA trimestrales cuadrados (4,43 / 2,66 / 2,11 / 5,63 / 2,58 / 2,23);
  - flujo libre de nueve meses: 2.177 − 234 = 1.943.
  - Conferencia del 3T26 leída entera en Webull: intereses del 3T 206 M, ahorros de reestructuración 20 M y flujo libre del trimestre 1.100 M. Siete preguntas de analistas; ninguna cifra de 2027. Se corrige el resumen anterior de las preguntas, que no salía de la transcripción.
- 09:56 **E**:
  - Stocktwits (30 mensajes del 2-sep al 7-nov) y feed de Seeking Alpha leídos;
  - abierto el artículo del 28-oct: Mantener, valor razonable de 300 USD;
  - Reddit da 403 en www y old.reddit.
- 09:57 **Consenso**: segunda fuente, MarketBeat (precios del 23-oct): 20 analistas, 12 comprar, 6 mantener, 2 vender; objetivo 367,59. Yahoo, 9-nov: 363,21. MarketScreener sigue en la página del 12-oct.
- 09:58-10:01 notas rehechas, textos corregidos, integrar.mjs (64 fuentes, 8 huecos) y calcular-empresa.mjs: **19 de 19 controles correctos**. Word y PDF con soffice: 50 páginas (regenerados a las 10:02 tras corregir el último «interina» en riesgos).
- 10:01-10:02 bajo `flock` en /tmp/analisis-apuntar.lock y /tmp/apuntar.lock: apuntar-12m.mjs y luego `--precios`. Después robustez.mjs y comprobar.mjs: 0 errores; avisos C10 de simbolos.json, que hace el coordinador, y C2 de robustez.json, que no es de esta empresa.

### Datos que cambiaron en la segunda pasada
- **Voto sobre la remuneración de 2026: rechazado.** 69,9 M de votos a favor y 110,8 M en contra (38,7 % a favor) en la junta del 26-jun-2026. El informe del 14-oct, y la primera pasada, ponían el 89 % de 2025 y decían que el 8-K de la junta «no recoge el voto»: sí lo recoge.
  - Gobierno: 12 → **11 de 13** criterios. Ahora falla «voto en contra ≤ 20 %», con 61,3 % en contra; ya fallaba la antigüedad del auditor.
  - El presidente del consejo fue reelegido con el 91,4 %.
- **Ratio salarial** del consejero delegado: 826 a 1 (antes era un hueco).
- **Nuevo contrato de Greg Case hasta 2030** (8-K del 2-ene-2026): PSU extraordinarias de 50 M de valor objetivo.
- **Vanguard Capital Management, 7,32 %** (13G de 29-abr-2026): es el mayor accionista declarado y antes faltaba. El 6,29 % de BlackRock y el 5,69 % de Capital World vienen de 13G de 2024.
- **El director financiero interino, Nadin Virani, es un hombre** según el 8-K («Mr. Virani»): corregido «la interina» en notas y textos.
- **Ventas del secretario general**: se listan las cinco (antes solo dos).
- **Comparables**:
  - EV/EBITDA NTM: MRSH 13,6, WTW 11,1, AJG 14,3, BRO 12,0, RYAN 14,4.
  - El PER NTM no cambia (mismo BPA y precio): mediana 18,1x.
  - La regresión pasa de R² 0,13 a 0,46 con el crecimiento de consenso de 2027. Da 459 USD, que no se usa: el 17,4 % de Aon es USI, fuera del rango de la muestra (2-8,5 %).
- **Valoración**:
  - transacciones (mediana): 402,42 → 389,44;
  - valor intrínseco: 361,27 → **361,67** (+8,0 %);
  - con la prima del mercado: 396,33 → 396,73.
  - La línea a 12 meses, la robustez y el filtro de mantener no cambian: 413,18; 24,3 % / 26,0 %; 378,36.
- **Sector**: cr5 ≈ 27 %; tarifas del 3T26 −5 %. Orgánico del 3T26 de los rivales: Marsh 5 %, Gallagher 5 %, WTW 4 %, Ryan 4 %, Brown & Brown 1,2 %.
- **Conferencia del 3T26**: se corrige el resumen de las preguntas de los analistas.

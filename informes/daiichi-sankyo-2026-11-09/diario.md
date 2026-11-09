# Diario: Daiichi Sankyo (4568.T), corte 2026-11-09

- Commit de partida: `7810b25 Escáner 9-nov 9:00: revisiones (Kainos, GEA, ASPEED), calendario y precios` (`git pull --ff-only origin main`: ya al día).
- Inicio: 09:34 (Madrid). Precio: cierre de Tokio del 9-nov-2026, 2.847 JPY (`bolsa.mjs`).
- Iteración del informe del 8-oct-2026 (`daiichi-sankyo-2026-10-08`, última versión v5: Mantener con la regla en Comprar por la v2, +26,8 %; valor intrínseco 2.888,64).
- **Cartera**: no hay fecha de fijación propia; Hotis dijo «mantengo todo» el 20-oct-2026. La señal se da como salida del método (si la tienes / compra robusta), sin órdenes.

## Qué ha pasado desde el 8-oct
- **27-oct, −8,2 %**: en el evento de AstraZeneca en la ESMO, datos de Enhertu en HER2 bajo temprano por debajo de lo esperado; la presentación mueve AVANZAR de «2S de 2026» a «1S de 2027» (ene-mar); BMS y SystImmune presentan datos de iza-bren, rival de Datroway [P6, P7, P9].
- **30-oct, resultados del 2T FY2026**: ingresos del semestre 1.167.233 M (+19,7 %), core OP 221.331 M (+46,9 %, el 61,5 % de la guía de 360.000 M), BPA 83,22. Guía sin cambios (BPA 137,94, DPA 100). Enhertu previsión 915.300 M (+20.500 M); compensación a fabricantes 4.300 M en el semestre; existencias +104.510 M; 116.000 M de bonos el 9-oct [A20-A22].
- **6-nov, −10,1 %**: caída del mercado (TOPIX −5,9 %, Nikkei −6,0 %), sin noticia propia [P8]. El escáner dio Vender ese día; el 9-nov volvió a Mantener a ≈2.847.

## Primera pasada (09:34-09:51)
- Fases A-D sin subagentes (no hay herramienta Agent): las notas A-D se copiaron del 8-oct y se pusieron al día con `notas/actualizar-notas.mjs` (LTM a sep-26, trimestres con el 2T26, consenso de Yahoo, bolsa, alertas de gobierno). **Los comparables se escalaron** del 7-oct con la variación de precio y divisa. Fase E nueva con cuatro plataformas (6 fuentes).
- 09:42 notas puestas al día; 09:46 primer cálculo; 09:48 Word y PDF; 09:50 revisión a 12 meses, `apuntar-12m` (+ `--precios`), `robustez` y `comprobar`. Entregado a las 09:51: Comprar, 38,6 % / 30,4 %, regla v3.

## Segunda pasada, tras la revisión del coordinador (09:52-10:03)
**1. Historia del PER (09:52-09:55).** La primera pasada construyó la historia adelantada a mano: metió FY2025 = 2.766 ÷ nuestro BPA *estimado* de FY2026 (148,3) = 18,65x y sacó FY2020 como atípico. Mediana 30,5x, ratio 1,43 → v3, ponderada 38,6 %. **Error**: la historia adelantada es precio ÷ BPA REAL del año siguiente (`METODO-VIGENTE.md` §2, `verticales/empresa/objetivo-12m.md`), y `herramientas/historia-adelantada.mjs` solo usa BPA publicados, así que FY2025 no puede entrar. Ejecutada la herramienta (`--forzar`): FY2016-FY2024, sin atípicos, mediana 46,1x, mínimo 26,7x, media larga 47,3x; ratio 46,1 / 21,27 = **2,17 ≥ 1,8 → desrateada → decide la v2** (como el 8-oct). La herramienta escribió `datos-v2.json` y una línea en este diario; copié su `per_historico` a `notas/iteracion.mjs` (para que no se pierda al reintegrar), borré `datos-v2.json` (si no, `robustez` y `apuntar-12m` leerían ese archivo y no `datos.json`) y quité la línea.

**2. Comprobación de lo heredado del 8-oct (09:55-10:00).**
- **A**: cada cifra anual de la cuenta, el balance y los flujos de FY2017-FY2025 contrastada con los estados financieros auditados de FY2018, FY2020, FY2022, FY2024 y FY2025 (el corregido), descargados en `notas/docs/anuales/`: ingresos, coste de ventas, gastos generales, EBIT, BAI, impuestos, beneficio, BPA diluido (FY2017-FY2018 divididos por 3 por el desdoblamiento de 2020), amortizaciones, activo, caja, existencias, patrimonio, pasivo, flujo operativo, capex (material + intangible), dividendos y recompras. **Todo cuadra.** También el LTM a sep-26 (ingresos 2.314.925, EBIT 307.605, EBITDA 391.727, beneficio 300.448) contra el Tanshin del 2T, y las acciones (1.862.893.329 − 40.827.459 = 1.822,07 M). La corrección de FY2025 (−28.958 M de gastos generales, BPA 140,37 → 151,10) se ha comprobado contra el aviso del 31-jul.
- **B**: competencia en ADC puesta al día con los resultados del 3T natural: Enhertu 969 M USD (+35 %) y Datroway 78 M USD en AstraZeneca, Trodelvy 506 M USD (+42 %), Padcev 720 M USD (+55 %), Kadcyla −9 % y Polivy +24 % en nueve meses (Roche) y Elahere 224 M USD (+31 %). En la ESMO: iza-bren (BMS/SystImmune) con PFS 11,1 frente a 5,7 meses en pulmón EGFR (HR 0,40) y sac-TMT (Merck/Kelun) en endometrio. Además, la colaboración del 2-oct con Summit (Datroway + ivonescimab), que faltaba.
- **C**: hechos relevantes del 25-sep al 9-nov comprobados uno a uno (retirada de I-DXd, Summit, ESMO, 2T, Prix Galien, bonos del 9-oct); el 12,1 % contra el CEO, comprobado con el acta de votos (1.753.027 en contra, 87,05 % a favor); guía sin cambios.
- **D**: **comparables rehechos con datos propios de cada empresa al 9-nov** (Yahoo quoteSummary, después de sus resultados), no escalados: mediana del PER NTM 17,4x (antes 17,2x); el PER se calcula ponderando el BPA de consenso del ejercicio en curso y del siguiente. El ROIC sigue siendo el de Stock Analysis del 8-oct (la web devuelve un desafío anti-bots; no se intenta saltar). Consenso (Yahoo, 9-nov) ya era del día.
- **E**: dos plataformas más (preguntas de analistas en la conferencia del 2T; prensa sectorial de la ESMO, con el fracaso de Enhertu en neoadyuvancia en TALENT) y Stocktwits revisado de nuevo; 10 fuentes. Reddit, みんかぶ, 株予報, Investing.com Japón y X no se pudieron leer (hueco documentado).
- Textos de base del 8-oct con cifras viejas corregidos (precio 2.702,5 → 2.847 en capital, rentabilidad del dividendo, bonos de octubre, pagos a fabricantes del 2T); catalizadores y riesgos ya puestos al día en la primera pasada.

**3. Recalculo (10:00-10:03).** Reintegrado, recalculado, Word y PDF (65 páginas), `revision-12m-2026-11-09.md` reescrita, `apuntar-12m` y `--precios` con `flock` (sobre `/tmp/apuntar.lock` y `/tmp/analisis-apuntar.lock`), `robustez` y `comprobar` (0 errores).

## Decisiones
- **Tasa libre**: JGB a 10 años 2,696 % (MOF, 6-nov) frente al 3,11 % de octubre; prima de mercado 4,23 % + 0,91 de riesgo país (como en octubre); prima implícita de Damodaran de noviembre 4,41 % para la regla relativa. WACC 6,80 %.
- **FY2026e fijado por la guía** (`fijo: true`, +11,5 %, margen 16,5 % sin los ingresos diferidos). FY2027e +2,0 % por la desaparición de los 96.900 M de hitos de ventas.
- **Puente a 30-sep-2026**: deuda 500.333, arrendamientos 48.200, liquidez 727.800, minoritarios 22.472, asociadas 5.024, otros ajustes −200.660. Pasivos por contrato fuera.
- **BPA del objetivo a 12 meses**: base «publicado» (con 55.000 M de amortización de pagos iniciales), igual que el 8-oct (H1). La historia adelantada la hace la herramienta, con su propia normalización de impuestos (los avisos D5 de robustez se refieren a ese FY2025, normalizado por la herramienta a 131,35).
- **Convicción baja** con Comprar: la rentabilidad con la prima del mercado (15,1 %) roza el umbral, no es compra robusta (BPA −10 % → 13,7 %) y AVANZAR es binario.

## Resultado
- DCF 3.369,25 · PER comparables 3.020,67 · escenarios 3.381,41 · valor intrínseco 3.249,68 (+14,1 %; total 17,3 %; con la prima del mercado 3.187,70 y 15,1 %: las dos reglas dan Comprar). DCF inverso −0,6 % anual frente al 3,3 % del base. Solo aprobados 2.742 JPY.
- Objetivo 12 m 3.497,64 (ponderada +26,0 %, base +19,0 %; regla v2 por desrateada; v3 sin selector 38,6 %). **Comprar, convicción baja, no compra robusta.**
- Robustez: sólida. Si la tienes: Mantener. Compra robusta: no (nivel B1 a 2.847; límite A 2.731,46; B1 2.913,65). Comprar con el objetivo fijo hasta 3.024,85; filtro de mantener hasta 3.226,51; banda Vender desde 3.985,16. Colchón de BPA 7 % / 13 %.
- `apuntar-12m`: 4568 Comprar 25,1 % (2.740,50) → 38,6 % (primera pasada) → **Comprar 26,0 %** (2.847, 9-nov).
- Controles: 20 de 22 correctos y 2 explicados (tipo impositivo de FY2025; EBITDA propio frente al consenso en FY2027e).
- Fin: 10:03 (Madrid).

## Fallos del sistema
1. **Consenso de MarketScreener sin actualizar tras resultados**: el EBITDA y el BPA de FY2028e de consenso siguen siendo anteriores al 30-oct. Yahoo `quoteSummary` (earningsTrend, financialData) sí funciona para Japón y da FY2026e/FY2027e y el objetivo medio al día; propuesta: que `consenso` lo use como primera fuente para 4568.T y similares.
2. **`descargar.mjs --lista` no encuentra los PDF de la biblioteca de Daiichi** (página con JavaScript); hubo que sacar los enlaces de las subpáginas con curl.
3. **Yahoo devuelve 429 a curl**; con node y `NODE_USE_ENV_PROXY=1` funciona.
4. **Historia del PER hecha a mano en vez de con la herramienta** (mío, corregido en la segunda pasada): con un BPA estimado como «año siguiente» de FY2025, la mediana bajó de 46,1x a 30,5x y el selector pasó de v2 a v3 (+12 puntos de ponderada). Propuesta: que `calcular-empresa.mjs` avise si `per_historico.base = "adelantado"` y el texto o los años incluyen un ejercicio cuyo siguiente aún no tiene BPA real en `financieros.cuenta`, o que el comando diga «la historia adelantada siempre con `historia-adelantada.mjs`».
5. **`historia-adelantada.mjs --forzar` escribe `datos-vN.json` y una línea en el diario** aunque luego se vaya a reintegrar: en un informe en curso hay que copiar su `per_historico` a las notas y borrar el archivo, o `robustez`/`apuntar-12m` leen el `datos-vN.json`. Propuesta: opción `--json` que solo imprima el bloque.
6. **Stock Analysis devuelve un desafío anti-bots** a curl desde la nube; WebFetch da una copia de caché vieja (26-oct). Los comparables se rehicieron con Yahoo quoteSummary (sin ROIC).

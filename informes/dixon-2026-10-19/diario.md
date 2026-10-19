# Diario · Dixon Technologies (India) Ltd (DIXON.NS) · 19-oct-2026

- Commit de partida: a1f9540 («Cola de índices: fuera Al Majed y Jamjoom (minoristas)»). Checkout compartido con otro análisis en paralelo: sin `git pull`, `commit`, `push`, `checkout` ni `stash`. Solo se escribió en esta carpeta, en `verticales/empresa/simbolos.json` (entrada DIXON, edición atómica tras releer) y en lo que escriben `precios.mjs DIXON` (`precios.json`) y `apuntar-12m.mjs dixon-2026-10-19` (`objetivo12m-revisados.json`). No se tocaron `cola.md`, `MEMORIA.md`, `METODO-VIGENTE.md`, `lecciones*.md` ni `seguimiento.xlsx`; no se ejecutaron `seguimiento.mjs`, `cobertura.mjs`, `regenerar.mjs` ni nada con `--todas`.
- Tiempos (UTC): inicio ≈ 11:44; investigación hasta ≈ 11:59 (con una compactación del contexto por medio); notas A-E, cálculo, Word y PDF terminados ≈ 12:16; revisión, robustez y diario ≈ 12:20.
- Encargo: análisis value completo desde cero, con el riesgo de IA, la dependencia de clientes (Vivo, Motorola, Xiaomi…) y la del PLI. Sin subagentes: A-E las escribe `notas/construir-notas.mjs`; parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs` (patrón de CLASSYS).
- Lecciones leídas: núcleo de `lecciones.md`; `lecciones-paises.md` no tiene sección India; nada del sector en `lecciones-casos.md`.

## Pasos y fecha de los datos

| Paso | Herramienta / fuente | Fecha del dato |
|---|---|---|
| Precio, beta, rentabilidades, cierres de ejercicio | `bolsa.mjs --accion DIXON.NS --indice ^NSEI --sector NIFTY_CONSR_DURBL.NS --corte 2026-10-19 --cierre-mes 3 --etiqueta fin` (sector sin datos) | cierre 19-oct-2026 |
| Precio común | `precios.mjs DIXON` | cierre 19-oct-2026 (12.100 INR) |
| Movimiento (regla 13) | `movimiento.mjs DIXON.NS` | 19-oct-2026 |
| Cuentas FY2022-FY2026 | Informes anuales FY2025-26, FY2024-25, FY2023-24 y FY2021-22 (web de inversores; `descargar.mjs`) | 2022-08 a 2026-09 |
| Trimestres 2T FY25-1T FY27, balance de 30-jun-2026 | Resultados en la NSE, presentaciones y transcripciones 1T FY26-1T FY27 | hasta 2026-07-31 |
| Anuncios (Vivo, HKC, Gemtek, junta, rating, multas, laboral) | API de anuncios de la NSE (164 en 12 meses) y PDF de cada uno | 2025-10 a 2026-10-14 |
| Accionariado | XBRL de la NSE | 30-sep-2026 y 30-sep-2025 |
| Consenso y objetivos | MarketScreener (27 analistas) y Yahoo earningsTrend | 2026-10-19 |
| Bono indio a 10 años | FRED INDIRLTLT01STM | septiembre de 2026 (7,06 %) |
| Prima de mercado | Damodaran ERPbymonth | octubre de 2026 (4,20 %) |
| Comparables y tipos de cambio | Yahoo quoteSummary (9 fichas + DIXON) y USDINR, TWDINR, HKDINR | 2026-10-19 |
| Aditya Infotech (participada) | Yahoo CPPLUS.NS | 2026-10-19 |
| Mercado EMS | KPMG (vía informe anual FY2025-26) y Kotak AMC | 2026-06 / 2026-07-23 |
| Sentimiento | ValuePickr (API del hilo), Business Today, HDFC Sky, DSIJ | hasta 2026-10-07 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 19-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, LibreOffice | 19-oct-2026 |
| Objetivo a 12 m | `apuntar-12m.mjs dixon-2026-10-19` | 19-oct-2026 |
| Robustez | `robustez.mjs informes/dixon-2026-10-19 --actual` | 19-oct-2026 |

## Decisiones

- India sin XBRL en `cuentas.mjs`: cuentas de los informes anuales auditados (Ind AS consolidados), en lakhs ÷ 10 = millones de INR. FY2023 de las comparativas del informe de FY2024 (el de FY2023 no se descargó).
- Cuenta por naturaleza: `coste_ventas` = materiales + variación de existencias; EBITDA = ingresos de explotación − materiales − personal − otros gastos (el «operating profit» de la empresa, sin otros ingresos).
- **BPA**: el diluido publicado divide el beneficio antes de minoritarios (269,35 INR en FY2026). En `cuenta` va el atribuido (235,68); en la valoración, el **ajustado** sin la plusvalía de Aditya Infotech (FY2025 116,0; FY2026 138,4), la misma base que el BPA propio.
- Ejercicio objetivo **FY2029e** (marzo de 2029). FY2027e no es fijo (un solo trimestre publicado).
- Ventas: FY2027e +24,8 % (guía ≈ 560.000 M sin Vivo + ≈ 50.000 M de Vivo), FY2028e +37,7 % (Vivo un año entero ≈ 230.000 M), después 15 / 11 / 9 / 8 / 7 / 6,5 %. Margen EBITDA 3,2 % → 3,7 % (sin PLI de móviles). Capex 2,2 % → 1,3 %; circulante 0 % (primer intento con −0,5 % y capex menor daba un rendimiento del capital nuevo del 56 % y la prueba de sostenibilidad en «En parte»: se subió el capex).
- WACC 14,04 % (bono 7,06 %, beta 1,13, prima 5,5 % + 1,0 por clientes y política industrial, Kd 8,5 %, deuda 3 %); g 6 % nominal en INR (explicado en controles). Pesos DCF 50 / comparables 20 / escenarios 30. Escenarios 25/50/25: bajista −5 pp de crecimiento y −0,5 pp de margen, g 5 %; alcista +4 / +0,4.
- Puente a 30-jun-2026: deuda 5.790, arrendamientos 5.267, caja 8.050; asociadas 12.820 (Aditya a mercado neta de impuesto 10.240 + JV 2.580); otros_ajustes 1.900 (mitad de la exposición neta del PLI de Padget tras impuestos); minoritarios 45.000 (estimación propia: 25 % del valor del capital).
- BPA propio: resultado financiero −1.000 M, impuesto 25 %, minoritarios 20,5 % / 26 % / 26 % del beneficio (Vivo 49 %), acciones 61,9 / 62,2 / 62,5 M. FY2029e: 154,3 / 218,4 / 278,6 INR (consenso 354,9).
- Historia del PER adelantado: se excluye FY2021 (burbuja, 114,9x) solo de la media larga. Mediana 75,3x, actual 67,8x → decide la v3.
- Comparables: BYD Electronic fuera (margen operativo 0,7 %, cuentas en CNY). PER NTM = precio ÷ BPA del ejercicio en curso y del siguiente ponderados por los meses que quedan.
- Rule 0: cifras de buscador no usadas salvo abiertas en la página original (Business Today, Kotak, ValuePickr por su API). Se quitó una nota automática (Sahi) cuyo dato solo venía del resumen.
- Regla 13: veredicto **no cambia**. No hay compra que aplazar; el 2T FY27 no tiene fecha.

## Resultado

- Recomendación **Mantener**, convicción media. v3 22,9 % / base 29,2 %; v2 33,4 % / 22,5 %; BPA −10 % 10,6 % / 16,3 %. Objetivo 14.854 INR; valor intrínseco 3.640 INR (−69,9 %; DCF 2.358). Comprar por debajo de 3.640; vender por encima de 16.516.
- ROIC FY2026 26,0 % − WACC 14,04 % = 12,0 puntos; sostenibilidad Sí.
- Robustez **SÓLIDA**, acción robusta **No mantener**, límite robusto 3.640,23 INR; avisos D7, M4 y V1.
- Controles: 19 de 23 correctos y 4 explicados (DCF inverso sin solución, g 6 % en INR, EBITDA propio FY2028e y FY2029e frente al consenso). Cobertura de campos 86,3 %.
- Huecos: votos de la junta sobre remuneración, fecha de entrada de los independientes, resultado de las divisiones antes de FY2025, posición corta, múltiplos de transacciones, Reddit.

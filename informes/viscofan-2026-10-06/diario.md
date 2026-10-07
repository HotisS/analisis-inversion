# Diario del análisis de Viscofan (fecha de corte 2026-10-06)

Procedimiento: `/analiza-empresa`, siguiendo `verticales/empresa/prompt.md`. Lo hice todo yo, sin subagentes, y las fases 2-4 en orden. Reloj del sistema: empecé a las 17:02 y generé el informe definitivo a las 17:42, unos **40-45 minutos** en total. Resultado: 45 páginas, 28 gráficos, 53 fuentes (25 primarias), cobertura de campos del 95,2 % y **12 de 12 controles correctos**. Word abre el documento sin repararlo.

## 1. Tiempo y fuentes por fase

| Fase | Tiempo aprox. | Qué leí |
|---|---|---|
| 0. Lectura del comando, el prompt, el README y el motor | 3 min | `analiza-empresa.md`, `prompt.md` entero, `calcular-empresa.mjs` entero (para saber qué controla y cómo calcula). |
| 1. Identificación | 3 min | Web de inversores de Viscofan. Cotiza en una sola línea (VIS, ES0184262212), cierre en diciembre, NIIF-UE; índice IBEX Medium Cap (ya no está en el IBEX 35). |
| 2. Documentación primaria | 13-15 min | Descargué 25 PDF y xlsx de `public.viscofan.com` y los leí con `pdftotext` y un lector xlsx propio (jszip). Leí de verdad: la memoria consolidada de 2025 (notas 2, 7, 12, 13, 15, 18, 20, 22, 23, 25 y 26: combinaciones de negocio, arrendamientos, patrimonio, provisiones y contingencias, deuda, segmentos, BPA, remuneraciones, vinculadas, honorarios y hechos posteriores); la nota de resultados de 2025; la presentación de Beat'30; el informe semestral del 1S26 (notas de deuda, autocartera, riesgos y hechos posteriores); la presentación del 1S26; las notas de 1T25, 9M24, 9M25 y 1T26; los anexos financieros de 2020 a 1S26; los informes anuales de 2021 a 2024 (bolsa, guía, BPA y arrendamientos); el IAGC y el IARC de 2025; los acuerdos de la junta de 2026; y la presentación de Beyond25. |
| 3. Sector y competencia | 6 min | Form 10-K 2025 de Icahn Enterprises (Viskase, en la SEC), resultados 2021 y 1S22 de Devro, Shenguan (prensa sobre HKEX), Kalle, GM Insights, Meticulous Research, la modificación del reglamento EUDR de julio de 2026 y el informe de Hunterbrook a través de la prensa. |
| 4. Mercado y valoración | 10 min | MarketScreener (consenso de Viscofan, tabla de valoración, estimaciones de 7 comparables), Stock Analysis (estadísticas de Viscofan y de 9 comparables), Investing (recomendaciones y bonos), Trading Economics, BCE, Damodaran, factsheet de BME, el 8-K de Sealed Air, el RNS de CP Kelco, Devro/SARIA, Darling/Gelnex, Renta 4, Merca2, OCU, Simply Wall St y Demócrata (posiciones cortas). |
| 5-6. Cálculo, supuestos y DCF inverso | 4 min | Dos pasadas del motor y una tercera con una copia del motor en el scratchpad para investigar el DCF inverso (ver §4). |
| 7. Redacción | 8 min | Textos escritos en `notas/textos.mjs` con las cifras de `calc` copiadas tal cual. |
| 8. Revisión de comité y entrega | 4 min | Las diez preguntas. Corregí cinco afirmaciones que no se sostenían, verifiqué la tasa libre de riesgo en una segunda fuente, generé el Word, lo pasé a PDF y revisé las páginas como imágenes. |

Los ficheros de trabajo están en `notas/`: `hechos.mjs` (cifras), `textos.mjs` (juicio), `comps.mjs` y `comps.json` (comparables), `construir.mjs` (genera `datos.json`) y `xlsx2txt.mjs`.

## 2. Datos difíciles, no encontrados y los tres intentos

**Costaron, pero aparecieron**
- **Pasivos por arrendamiento de 2020-2023**: hubo que leer la nota 7.2 de cada informe anual.
- **Número de acciones**: hay que combinar el capital (46,0 M tras la amortización de mayo de 2026) con la autocartera a 30 de junio (396.357). El dividendo flexible amplía y amortiza capital dos veces al año, y las «recompras» del estado de flujos son sobre todo la otra cara del pago en acciones.
- **Retirada de APG**: pasó del 9,997 % a menos del 3 % en 2025. Solo se ve comparando la tabla de accionistas de las memorias de 2024 y 2025, que pdftotext desordena.
- **Viskase**: sus cifras no estaban en el resumen del 10-K que devolvió WebFetch. Tuve que bajar el 10-K de la SEC (5,6 MB) y buscar en el texto: ventas −10 %, margen bruto del 10 %, cierre de plantas y 45 M USD de capital de Icahn para atender la deuda.
- **Tasa libre de riesgo**: los buscadores daban cifras contradictorias (3,09 %, 3,42 % e incluso «más del 6 % en agosto de 2026», que es falso). La confirmé en dos proveedores: 4,08 % el 6-oct-2026 en Investing y en Trading Economics.
- **Múltiplo de CP Kelco**: el titular dice 10x, pero incluye sinergias. La nota 5 del RNS da 131 M USD de EBITDA, así que sin sinergias son 13,7x.

**No encontrados** (registrados en `meta.huecos`, cada uno con sus tres intentos): resultado por división (la empresa es monosegmento según la NIIF 8), ingresos por destino, BPA trimestral, consenso previo de 3T24 a 2T25, transcripciones de las conferencias, operaciones de directivos de los últimos 12 meses (el registro de la CNMV es un formulario dinámico y la página de otra información relevante de Viscofan se carga por JavaScript), rentabilidad total del índice y volatilidad, calificaciones ESG (MSCI, Sustainalytics y CDP no se ven sin registro), fecha de los resultados del 9M26, importes de las compras de 2016-2019, múltiplos de Gelnex y de las compras brasileñas, y márgenes de Kalle y ViskoTeepak. La serie del tamaño de mercado y los múltiplos históricos NTM son **estimaciones propias**, marcadas como tales.

**El informe de auditoría de 2025 está escaneado.** No es texto y no se puede leer con pdftotext ni en la memoria completa de la junta. La opinión «Favorable» se apoya en el IAGC (sin salvedades en 2024) y en la aprobación de las cuentas en la junta.

## 3. Instrucciones del prompt ambiguas, contradictorias o imposibles

1. **«Si un campo es null, el informe no lo imprime: ni n.d. ni la fila».** Es falso en la plantilla: las tablas imprimen «n.d.» (margen por segmento, BPA trimestral, porcentaje de APG, fecha de algunos directivos e incluso la columna de detalle de los controles en «OK»).
2. **El prompt supone una cuenta por función** (`coste_ventas`, `gastos_generales`). Viscofan, como muchas industriales españolas, presenta la cuenta por naturaleza y el prompt no dice qué hacer. Usé los consumos como coste de ventas y dejé `gastos_generales` en null. Consecuencias: un margen bruto del 67 % que no es comparable, días de inventario de 345, y un Beneish M cuyo SGAI el motor fija en 1 sin avisar.
3. **Segmentos «tal como los reporta la empresa», con su resultado.** No sirve para empresas monosegmento. Las divisiones salen con margen «n.d.» y una etiqueta de «EBITDA» que no tiene sentido.
4. **Geografías «por destino».** Casi ninguna empresa española lo publica; Viscofan da el origen de la venta.
5. **Múltiplos históricos NTM de 5-10 años «de un proveedor citado» y rentabilidad total del índice y de un índice sectorial.** No existen en fuentes gratuitas. El prompt prohíbe gastar en datos (lo dijo el usuario) y a la vez los exige.
6. **Consenso «de al menos dos fuentes cruzadas».** Solo MarketScreener da estimaciones completas gratis. Investing da recomendaciones y precios objetivo, y Simply Wall St solo ingresos y BPA.
7. **Fechas de las fuentes en formato AAAA-MM-DD.** Muchos PDF no tienen fecha de publicación visible. Usé la fecha de cierre del periodo y lo indico en el título. El formato obliga a inventar o a forzar.
8. **«Toda fuente se cita al menos una vez» frente a «una entrada por documento realmente leído».** El control empuja a meter citas solo para cumplir. Tuve que añadir citas a cinco fuentes que había leído pero no usado en los textos.
9. **30-60 minutos para 27 secciones, más de 40 tablas y la lectura de 5-10 informes anuales con notas.** Solo es posible con pdftotext y lectura selectiva por nota. WebFetch no lee la web de Viscofan (error de certificado) ni PDF de 30-80 MB.
10. **«Usa las cifras de `calc` tal cual»** choca con un `calc` que devuelve «n.d.» en la cifra central del informe (el crecimiento implícito). Tuve que calcularlo aparte y marcarlo.
11. **No avisa de que los resúmenes de WebSearch inventan cifras.** Me dieron un EBITDA del 1S26 de 315,4 M (el real es 134,5 M), un múltiplo de 16x para Gelnex (calculado por el buscador) y el bono al 6 %. El protocolo debería obligar a verificar toda cifra en la página original.

## 4. Problemas del motor de cálculo y de la plantilla

1. **El DCF inverso no encuentra el crecimiento implícito («n.d.»)** y ningún control lo marca. La bisección busca en [−30, +40] pp. Con un circulante del 45-48 % de las ventas, a +40 pp el flujo libre es tan negativo que el valor también lo es (−34 €/acción), así que no hay cambio de signo. Con una copia del motor y el intervalo [−10, +10] sale un 1,7 %. Arreglo propuesto: buscar el cambio de signo por tramos, o limitar el intervalo a ±15 pp, y añadir un control «DCF inverso calculable».
2. **El crecimiento NTM de la empresa en la tabla de comparables (9,6 %) mezcla bases.** Compara ingresos NTM (24 % de 2026e y 76 % de 2027e) con el LTM a junio de 2026, es decir, unos 15 meses de crecimiento. Por eso la regresión crecimiento-múltiplo da 11,4x y 73,09 € por acción, un resultado engañoso que el informe imprime sin aviso.
3. **La cobertura de intereses usa el resultado financiero neto, diferencias de cambio incluidas.** Sale 7,2x en 2025 (la real, EBIT sobre gastos financieros, es 20,7x) y «n.d.» en 2021 y 2024 porque el resultado financiero fue positivo.
4. **El payout incluye los dividendos extraordinarios** (91-99 % en 2023-2025) y no hay campo para separarlos.
5. **El flujo libre no corrige la clasificación de los intereses.** Viscofan los clasifica en financiación, otras empresas en explotación, y el motor no homogeneiza.
6. **La puntuación de gobierno es complaciente: 9 de 9.** No recoge que presidente y vicepresidenta son «otros externos» con 17 y 28 años en el consejo, ni el 73,5 % del voto de remuneraciones de 2025. El criterio de «ningún independiente con más de 12 años» es redundante en España, porque la ley ya lo impide. Además, el criterio sin dato (operaciones de directivos) sale del denominador y sube el porcentaje.
7. **Múltiplos históricos**: el motor compara el NTM actual con la serie aportada sin comprobar que la definición sea la misma (el «percentil 0 %» depende de cómo se construyó la serie).
8. **Comparables con ejercicio no natural** (Tate & Lyle cierra en marzo y Amcor en junio): el prompt no explica cómo ponderar el NTM. Lo hice a mano en `comps.mjs`.
9. **Plantilla**: títulos huérfanos al pie de página (el «19. Transacciones precedentes» queda solo al final de la página 27), filas «n.d.» y la columna «Tipo de margen» de segmentos sin dato.
10. **Sin control del DCF inverso, sin control de coherencia del crecimiento NTM y sin control de tipo impositivo anómalo** (el 10,1 % de 2025 no salta).

**Anomalías en los propios documentos de Viscofan** (no son del sistema, pero el sistema tampoco las detecta): el anexo del 1S26 copia como «EBITDA recurrente» de 2026 el del 1S25 (145.161 miles); el BPA diluido de 2025 (3,52 €) es mayor que el básico (3,50 €); y el dividendo complementario anunciado fue de 1,757 €, pero se pagaron 1,799 €.

## 5. Qué mejoraría para llegar al nivel de un banco de inversión

1. **Datos de pago o un conector a un proveedor** (FactSet, Bloomberg o S&P Capital IQ): historia del consenso para medir revisiones a 3 y 12 meses, múltiplos NTM históricos, rentabilidad total, betas, posiciones cortas en serie y transcripciones de las conferencias. Hoy son los mayores huecos.
2. **Un modelo operativo, no solo un DCF de márgenes**: volumen × precio × divisa por región, coste de pieles, celulosa y gas con su sensibilidad, y circulante por días. La tesis de Viscofan es de margen y divisa, y el motor no permite modelarla.
3. **Soportar las cuentas por naturaleza y las empresas monosegmento**: campos opcionales para consumos, personal y otros gastos, con márgenes y días calculados de forma coherente.
4. **Más métodos de valoración**: un LBO (CD&R pagó 10x por Sealed Air), un análisis de prima de control y una sensibilidad a la divisa (USD/EUR) en la página del DCF.
5. **Due diligence específica**: datos de cumplimiento de la EPA (ECHO) para Danville, el 10-K de Viskase completo, comprobaciones de canal con clientes cárnicos y entrevistas a expertos sobre precios de envolturas.
6. **Controles de calidad nuevos**: DCF inverso calculable, coherencia de las bases de crecimiento, tipo impositivo fuera de rango, dividendos extraordinarios y verificación de cifras de buscador frente a la página original.
7. **Plantilla**: aplicar de verdad el «no imprimir null», mantener los títulos con su contenido y añadir un gráfico trimestral de margen y divisa.


## Actualización v3 (7 oct 2026): regla relativa y DCF en tres etapas

Sin investigación nueva. Script: `notas/actualizacion-v3.mjs` (parte de `datos-v2.json`, escribe `datos-v3.json`). Fuente nueva [54]: prima implícita del S&P 500 de Damodaran, octubre de 2026 (4,20 %).

| | v2 | v3 |
|---|---|---|
| Recomendación | Mantener | **Comprar** |
| Convicción | Media | **Baja** |
| Valor objetivo (nuestro WACC 7,99 %) | 55,98 € (RTE +12,0 %, asimetría 0,94) | igual |
| Valor objetivo con la prima del mercado (WACC 7,24 %) | — | 62,50 € (RTE +24,4 %, asimetría 3,24) |
| Regla absoluta / relativa | Mantener / — | Mantener / Comprar |
| Comprar por debajo de / vender por encima de | 51,46 € / 66,82 € | 57,16 € / 65,83 € |

- **etapa2: no.** El ROIC (16,4 %) supera al WACC en 8,4 puntos, pero el mercado de envolturas crece un 3,4-4 % [26][41], Viscofan ya tiene el 31 % de las celulósicas y la proyección converge a ese ritmo en 2032 sin dar crédito a todo Beat'30.
- **Convicción baja por «Ojo con la causa».** El Comprar nace solo de la tasa de descuento: el precio ofrece un 8,5 % frente al 7,24 % que pide el mercado, y nuestras cifras coinciden con el consenso (EBITDA a menos de un 1,1 %). Con la prima del mercado, nuestro DCF (67,51 €) se acerca al objetivo medio de los analistas (69,29 €). Los resultados de 9M26 prueban el margen, no cierran esa diferencia.
- **Sensibilidad a la prima** (medida con el motor): la regla relativa sigue en Comprar hasta una prima del 5,0 % y pasa a Mantener con un 5,2 %.

**Fallos del sistema vistos en esta actualización**
1. La portada pone «Comprar» al lado del valor objetivo absoluto (55,98 €) y de una rentabilidad del +12,0 %, por debajo del 15 % de la regla. El lector ve una contradicción. Cuando manda la relativa, la portada debería dar su objetivo y su rentabilidad, o los dos.
2. El motor no da la prima a la que cambia la regla relativa: tuve que buscarla probando valores. Es el número que mide el riesgo de un Comprar relativo.
3. Explicar las dos reglas cuesta 60-80 palabras de síntesis. La v2 ya estaba en 648, así que hubo que recortar finanzas, gobierno y riesgos.

# dLocal (DLO): análisis growth, 14-oct-2026

**Señal (método v11, vigente): Comprar (convicción baja)** · Puntuación 73,7/100 · Señales de cambio de tendencia 4/8 · EV/beneficio bruto 6,5x · EV/EBITDA de los 12 meses siguientes 10,3x
Precio 15,02 USD (cierre del 13-oct) · Objetivo 12 m 17,1 USD (ponderada +14,8 %, base +15,7 %, bajista −37,6 %, alcista +65,3 %) · Compra hasta 16,4 USD
Peso orientativo: 3,5 % según la regla. **Hoy no entra**: el bolsillo growth está lleno y no supera con holgura a ninguna de las cinco. Queda **suplente nº 2**, detrás de MongoDB.
Referencia v9: Comprar (baja), ponderada +35,6 %, base +38,8 %, bajista −34,4 %, objetivo 20,2 USD, compra hasta 19,5 USD. v9 usa las ventas de la regla mecánica, 2.804 M en el base; v11 toma las del informe, 2.300 M, que son menores y están cerca del consenso.
**Al precio actual** (14,63 USD, 14-oct a las 17:52 UTC; objetivo del informe fijo en 17,1): ponderada **+18,2 %**, base +18,9 %. Sigue por debajo del «compra hasta».
Alertas de robustez del motor (`calc.alertas`): dos, la proyección mecánica supera en más de 1,2 veces la del informe y no hay guía de ingresos (sección 11). Prueba `robustez-growth`: **SÓLIDA** en Comprar, pero mis pruebas propias muestran que el margen es estrecho si el crecimiento frena más de lo previsto.

> **Valorada por EV/EBITDA de los 12 meses siguientes.** dLocal gana dinero de forma estable (beneficio operativo de 235 M en 12 meses, FCF positivo todos los años) y su margen bruto es de procesador de pagos (34 %). Un múltiplo de ingresos premiaría unas ventas que crecen mucho más que el beneficio, porque la comisión media baja. **Lectura en una línea:** el volumen se dispara y la acción está barata para lo que crece, pero cada dólar procesado deja menos, y la regla compra con poco margen y convicción baja.

## 1. La tesis en cinco líneas

1. dLocal es la «tubería» de pagos que usan las grandes empresas globales (comercio electrónico, viajes, transporte, streaming) para cobrar y pagar en más de 60 países emergentes de Latinoamérica, África y Asia, con un solo contrato y una sola conexión. En 12 meses procesó **55.246 M USD (+75 %)**, facturó **1.356 M (+57 %)** y ganó **204 M** netos [1][2].
2. Es rentable y genera caja: FCF ajustado de 186 M en 12 meses (14 % de las ventas), caja neta propia de ~381 M, dividendo (30 % del FCF del año anterior, ~1,3 %) y una recompra de 300 M en curso [1][4].
3. El punto débil es el margen: el beneficio bruto sobre volumen ha caído del 1,07 % al 0,72 % en un año. El beneficio bruto crece «solo» un 29 % y el operativo un 15 % en el 2T. La empresa lo atribuye a descuentos por volumen a sus mayores clientes y a más pagos locales, de menor margen [1].
4. La regla da **Comprar con convicción baja**: puntuación 73,7, ponderada +14,8 %, base +15,7 %, bajista −37,6 %. Cotiza a 10,3 veces el EBITDA de los 12 meses siguientes y a 6,5 veces el beneficio bruto, cerca de su mediana de 3 años, y el precio solo descuenta crecer un 10 % anual durante 10 años.
5. Conclusión: **buena compra por la regla, pero no sustituye a ninguna de las cinco del bolsillo**. Su ventaja frente a la más floja (Snowflake) es de unos 4 puntos, con convicción menor, y añadiría más riesgo de Latinoamérica a una cartera que ya tiene Nu. Queda **suplente nº 2**.

## 2. Negocio y tecnología

dLocal (fundada en Montevideo en 2016, sede legal en las Islas Caimán, en el Nasdaq desde 2021) conecta a comerciantes globales con los medios de pago locales de los mercados emergentes [5]:
- **Cobros («pay-ins»)**: tarjetas locales, transferencias, pagos en efectivo, PIX en Brasil, OXXO en México y cientos de monederos y medios alternativos. El comerciante cobra en moneda local y recibe dólares.
- **Pagos («pay-outs»)**: pagos a conductores, repartidores, vendedores y creadores en cada país.
- **Servicios añadidos**: cambio de divisa y repatriación del dinero (su gran ventaja en países con control de cambios, como Argentina), anticipos a comerciantes, prevención del fraude, pagos a plazos y, desde abril de 2026, **Stablecoin Full**, que permite cobrar, pagar y guardar saldos en monedas estables en 44 mercados [13].

**Ingresos del 1S26 por zona** [2]: Brasil 20 %, Argentina 18 %, México 18 %, resto de Latinoamérica 25 % y África y Asia 20 % (Egipto, Nigeria, Sudáfrica, Vietnam, Mozambique y otros).

- **Tecnología 3/5**: el valor no está en el software, que otros pueden replicar, sino en lo que cuesta montar: licencias en decenas de países, conexiones con cientos de bancos y medios de pago locales, capacidad de cambiar y sacar divisas y diez años de datos de fraude. Es difícil de copiar, pero Adyen, Stripe, EBANX, PayU y los adquirentes locales compiten con alternativas.
- **Posición 4/5**: es el especialista cotizado de referencia en cobros transfronterizos en emergentes y gana cuota con los grandes. La retención neta de ingresos fue del **145 %** en 2025 [5].

## 3. Crecimiento

| Trimestre | TPV (M USD) | Crec. | Ingresos (M USD) | Crec. | Beneficio bruto | Crec. | Beneficio bruto / TPV |
|---|---|---|---|---|---|---|---|
| 2T25 | 9.212 | 53 % | 256,5 | 50 % | 98,9 | 42 % | 1,07 % |
| 3T25 | 10.390 | 59 % | 282,5 | 52 % | 103,2 | 32 % | 0,99 % |
| 4T25 | 13.107 | 70 % | 337,9 | 65 % | 115,8 | 38 % | 0,88 % |
| 1T26 | 14.055 | 73 % | 335,9 | 55 % | 118,7 | 40 % | 0,84 % |
| 2T26 | 17.694 | 92 % | 399,7 | 56 % | 127,2 | 29 % | 0,72 % |

Fuentes: [1][3][4][6].

| Ejercicio | TPV (M USD) | Ingresos (M USD) | Crec. | Beneficio bruto | EBITDA ajustado | Beneficio operativo |
|---|---|---|---|---|---|---|
| 2023 | — | 650,4 | — | 276,9 | 202,3 | 179,7 |
| 2024 | 25.575 | 746,0 | 15 % | 294,7 | 188,7 | 140,5 |
| 2025 | 40.816 | 1.093,6 | 47 % | 402,8 | 278,1 | 219,9 |
| 2026 (guía, punto medio) | +65 % | 1.590 (consenso) | 45 % | ~514 (+27,5 %) | — | ~286 (+30 %) |

- **Ventas de 12 meses** (3T25-2T26): **1.356 M USD, +57,0 %**. **CAGR propio a 2 años: 38,4 %** (707,7 M en los 12 meses a jun-2024). **Aceleración: +0,4 pp** (55,8 % en el 2T frente a una media de 55,4 % en los cuatro anteriores).
- **Lo que de verdad importa es el beneficio bruto**: 464,9 M en 12 meses, **+34,5 %**, y en el 2T solo +29 %. Los ingresos crecen casi el doble que el beneficio bruto porque baja la comisión neta. El método puntúa las ventas (20 de 25 puntos en crecimiento); con el beneficio bruto puntuaría algo menos.
- **Retención neta**: 145 % en 2025 (113 % en 2024). Casi todo el crecimiento viene de clientes que ya estaban; los nuevos aportaron el 2 % de los ingresos de 2025 [5].
- **Guía**: dLocal no guía ingresos, solo TPV, beneficio bruto y beneficio operativo. En marzo guió para 2026 un TPV del +50-60 %, un beneficio bruto del +22,5-27,5 % y un beneficio operativo del +27,5-32,5 %. El 13-ago subió el TPV a +60-70 % y el beneficio bruto a +25-30 %, y dejó igual el operativo [1][4]. El beneficio bruto guiado implica un 2S26 de **~+22 %**, más lento que el 1S (+34 %), y el beneficio operativo guiado exige **~+43 %** en el 2S. Por eso `guia_12m_pct` queda vacío (sin guía de ingresos, v9 no recorta) y el freno lo pone v11 con las ventas del informe.

## 4. Mercado y competencia

- **Mercado alcanzable: ~30.000 M USD de ingresos** (estimación propia [15]). Sale de aplicar la comisión de dLocal sobre volumen (~2,5 % en ingresos) a ~1,2 billones de USD de pagos digitales de empresas globales en mercados emergentes. Es una cifra prudente: la empresa habla de un mercado mucho mayor. **Penetración: 4,5 %.**
- **Rivales**: Adyen y Stripe (globales, que entran en los mismos países), EBANX (brasileño, el rival más directo), PayU, Nuvei y Checkout.com, y los adquirentes y procesadores locales (Cielo, Getnet, Mercado Pago, Prosa…). Los grandes clientes pueden también conectarse directamente con adquirentes locales.
- **Por qué gana**: un solo contrato y una sola conexión para 60 países, la capacidad de sacar dinero de mercados con control de cambios (Argentina, Egipto, Nigeria) y la escala. Los grandes clientes concentran cada vez más volumen en dLocal y por eso piden descuentos.
- **Concentración de clientes**: los 10 mayores suman el **61 %** de los ingresos y **dos** superan cada uno el 10 % [2][5]. No se publica cuánto suman exactamente los dos; en `clientes_top2_pct` se apunta el mínimo seguro, 20 %. La cifra probable está entre el 20 % y el 30 %, por debajo del listón de alerta del método (40 %).
- **Riesgo de divisa y de país**: dLocal cobra en monedas locales y paga en dólares a los comerciantes. Gana con el diferencial de cambio y sufre cuando una moneda se desploma o se cierra la salida de divisas.
  - **Argentina** (18 % de los ingresos, que se duplicaron en un año): control de cambios cambiante, investigaciones administrativas abiertas desde 2023 a su filial y préstamos en pesos para financiar anticipos. Una devaluación brusca o un cierre del mercado de cambios golpearía al trimestre, como en el 4T25 [2][4].
  - **Egipto**: en 2024 la devaluación y la falta de dólares le hicieron perder volumen; en 2025 volvió un gran cliente. Tiene caja retenida por requisitos regulatorios en Egipto y Marruecos [2][4].
  - **Nigeria**: «aumento puntual de costes» en el 2T26 y coberturas abiertas en naira [1][2].
  - **México**: presión de precios de los grandes clientes y sensibilidad a los aranceles. **Brasil**: cambios fiscales (la empresa lo cita como riesgo) [4].

**Riesgo de IA: medio, más de precio que de sustitución.** Razones:
- **Lo que la IA no sustituye**: licencias, conexiones con bancos y medios de pago locales, y la gestión de divisas en países con control de cambios. Es infraestructura regulada y física-financiera, no un programa que se pueda reescribir.
- **Lo que la IA sí empeora**: abarata construir integraciones y cumplimiento normativo, así que los rivales (Stripe, Adyen, EBANX) y los propios grandes clientes pueden replicar conexiones locales más rápido. Eso acelera lo que ya pasa: la comisión baja. Los pagos hechos por agentes de IA y las monedas estables podrían además saltarse parte del circuito tradicional.
- **A favor**: las empresas de IA y de software de EE. UU. venden suscripciones en emergentes y necesitan cobrar en moneda local; dLocal usa IA en fraude y cumplimiento (acuerdo con Oscilar, sep-2026 [12]) y lanzó su producto de monedas estables para no quedarse fuera [13].

## 5. Cambio de tendencia

| # | Señal | Sí/No | Prueba | Fuente |
|---|---|---|---|---|
| 1 | Revisiones al alza | Sí | El 13-ago sube la guía 2026 de TPV y de beneficio bruto. Suben el objetivo Goldman Sachs (de 17 a 19 USD, 31-jul) y Truist (de 17 a 18, 27-ago); Weiss pasa a Comprar (8-oct). Es una señal basada en la guía y en precios objetivo: el beneficio operativo guiado no sube y el BPA del 2T quedó un centavo bajo lo esperado. | [1][11] |
| 2 | Precio sobre la media de 200 sesiones | Sí | 15,02 USD frente a una media de 13,54 que sube despacio (13,38 hace tres meses). | [8] |
| 3 | Fuerza relativa a 6 meses | No | +10,0 % frente a +20,4 % del Nasdaq-100. A 12 meses, +5,8 % frente a +23,5 %. | [8] |
| 4 | Mejora del múltiplo | Sí | EV/EBITDA de los 12 meses siguientes de ~7,7x en el mínimo del 15-may (11,01 USD, tras el 1T) a 10,3x hoy, un 34 % más. | [8][14] |
| 5 | Inflexión operativa | No | Ya era rentable y los márgenes bajan: el beneficio operativo sobre el beneficio bruto pasa del 56 % al 50 % en un año. Mejora frente al 1T (44 %), pero no es una inflexión. | [1] |
| 6 | Sentimiento mejorando | No | Mixto. 9 de 10 analistas en Comprar, pero los cortos siguen altos (14 % del capital flotante) y Seeking Alpha está en Neutral por el margen. La acción no subió con el 2T. | [9][10][12] |
| 7 | Compras de directivos o institucionales | No | Solo ventas: General Atlantic vende 9,84 M de acciones a 13,60 USD el 17-ago y el cofundador Sebastián Kanovich vende con plan programado. | [7] |
| 8 | Catalizador nuevo | Sí | Resultados del 3T a mediados de noviembre y guía de 2027 en marzo; la mejora de márgenes prometida para el 2S26; monedas estables; recompra de 300 M. | [1][13] |

**Euforia: no.** Sube un 5,8 % en 12 meses y cotiza a 6,5 veces el beneficio bruto.

## 6. Economía unitaria y camino a la rentabilidad

- **Margen bruto: 34,3 %** en 12 meses (464,9 / 1.356). Baja cada trimestre: 39 % en el 2T25 y 32 % en el 2T26. Sobre volumen, del 1,07 % al 0,72 %.
- **FCF ajustado de 12 meses: 186 M USD**, el **13,7 % de las ventas** (150 M un año antes). Es la definición de la empresa: flujo operativo menos inversiones y sin el circulante de los comerciantes, que sube y baja con el dinero de terceros [1].
- **Regla del 40: 57 + 13,7 = 70,7** (5 de 5). Con el crecimiento del beneficio bruto (34,5 %) quedaría en ~48: sigue siendo buena, pero no extraordinaria.
- **Apalancamiento operativo**: en 2025 sí (EBITDA ajustado sobre beneficio bruto del 64 % al 69 %). En 2026, no por ahora: los gastos suben un 46 % en el 2T por las contrataciones de 2025, el Mundial y los sueldos. La empresa promete mejora en el 2S; su guía de beneficio operativo lo exige.
- **Beneficio neto de 12 meses: 204 M** (214 M sin el ajuste fiscal de años anteriores del 1T). PER de 12 meses ~22; PER de consenso 2026 ~18 y 2027 ~13 [9].

## 7. Caja, deuda y dilución

- **Caja propia: 448 M USD** a 30-jun (369 de caja corporativa y 79 en letras del Tesoro de EE. UU., de las que 59 garantizan préstamos en pesos). **No se cuentan 426 M de caja de comerciantes**, que es dinero de los clientes [2].
- **Deuda: 67 M** (préstamos en pesos argentinos a muy corto plazo y arrendamientos). El 12-ago firmó un préstamo de **150 M** a tres años (SOFR + 2 %), «para fines generales»; si lo dispone, suma lo mismo a caja y a deuda.
- **Pista**: FCF positivo.
- **Acciones: 288,4 M** emitidas a 30-jun (172,2 M clase A y 116,2 M clase B, con voto reforzado) y **296,2 M diluidas** con los planes de empleados. Las recompras posteriores a junio no están publicadas.
- **Dilución: −1,7 %** (recompra de 6,9 M de acciones a 12,49 USD de media en el 1S26).
- **Pagos en acciones: 1,9 % de las ventas** (5,5 % del beneficio bruto). Muy por debajo del listón de alerta (15 %).
- **Litigios**: demanda colectiva en Nueva York (Laurenzi, 2023) por la información de la salida a bolsa; sin provisión [2].

## 8. Dirección y ejecución

- **Historial (4/5)**: en 2025 superó con holgura su guía (TPV +60 % y beneficio bruto +37 %) y en 2026 ha subido dos de las tres guías. Pero en 2022-2024 tuvo sustos que hundieron la acción: un informe bajista de Muddy Waters, la salida del consejero delegado y una caída del margen mal anticipada [mem.].
- **Dirección (3/5)**: desde 2024 el consejero delegado es **Pedro Arnt**, antiguo director financiero de MercadoLibre. La asignación de capital es sensata: dividendo del 30 % del FCF, recompras a ~12,5 USD y casi sin deuda. En contra: los fundadores controlan el voto (clase B) y venden, General Atlantic reduce su participación, y hay investigaciones abiertas en Argentina y una demanda colectiva [2][7].

## 9. Valoración

**Métrica: EV/EBITDA de los 12 meses siguientes.** dLocal es rentable de forma estable y así la valora el mercado. Un detalle del motor: con un margen EBITDA congelado, valorar por EV/EBITDA equivale a valorar por EV/ventas con la misma rebaja por desaceleración. Por eso lo que mueve el objetivo son las ventas y el crecimiento, no el margen.

- **Hoy**: EV ≈ **4.068 M USD** (15,02 × 296,2 M acciones + 67 de deuda − 448 de caja). EBITDA ajustado de los 12 meses siguientes (jul-26 a jun-27) ≈ **396 M**, estimación propia: ~202 M del 2S26 (el beneficio operativo que implica la guía, más amortizaciones y pagos en acciones) y ~194 M del 1S27 (beneficio operativo de 2027 ~25 % por encima de 2026). **EV/EBITDA: 10,3x.** Yahoo da 12,25x con 12 meses pasados y toda la caja [10].
- **Ventas de los 12 meses siguientes**: ~1.812 M, **+33,6 %** (consenso de 2026 de 1.590 M y de 2027 de 2.080 M [9]). **EV/ventas: 2,2x. EV/beneficio bruto: 6,5x** (tope del método: 35x).
- **Historia (estimación propia [14])**: mediana de 3 años de **~10,3x**, mínimo de **~7,4x** (mar-2025) y máximo de ~28x (sep-2023). Hoy está justo en su mediana.
- **Comparables** (EV/EBITDA, de memoria [15]): Adyen ~25x, Wise ~11x, Flywire ~12x, Shift4 ~9x, PayPal ~8x, Payoneer ~8x, StoneCo ~5x y PagSeguro ~4x; mediana **~10x**.
- **Ventas del ejercicio objetivo** (12 meses a jun-2028, la misma ventana que la regla mecánica):
  - bajista: 1.900 M (+18 % anual: un gran cliente se va o una crisis de divisa en Argentina o Egipto);
  - **base: 2.300 M**. El consenso de 2027 es de **2.080 M** y no hay consenso público de 2028; con +22 % en 2028, la ventana a jun-2028 sale en ~2.290 M. La base coincide con esa extrapolación del consenso;
  - alcista: 2.600 M.
  - La regla mecánica da 2.015 / 2.804 / 3.156 M porque parte del +47 % de crecimiento; v11 toma la menor en cada escenario.
- **Crecimiento** de los 12 meses siguientes: 33,6 %; del año objetivo: 26,9 %. **Factor de desaceleración 0,89.**

| Escenario | Ventas (M USD) | EV/EBITDA | Precio 12 m | Rentabilidad (con 1,3 % de dividendo) | Prob. |
|---|---|---|---|---|---|
| Bajista | 1.900 (informe) | 5,5x | 9,2 USD | −37,6 % | 25 % |
| Base | 2.300 (informe) | 9,2x | 17,2 USD | +15,7 % | 50 % |
| Alcista | 2.600 (informe) | 12,0x | 24,6 USD | +65,3 % | 25 % |
| **Ponderado (v11)** | | | **17,1 USD** | **+14,8 %** | |
| Ponderado (v9, ventas mecánicas 2.015 / 2.804 / 3.156) | | igual | 20,2 USD | +35,6 % | |

- **Asimetría 1,7. Compra hasta 16,4 USD**: lo marca la ponderada del +5 %. El bajista a ese precio sería de −43 %, dentro del listón.
- **Coherencia con el beneficio bruto**: el EBITDA implícito del escenario base en el año objetivo (~505 M) equivale a que el EBITDA crezca un ~27 % en el año objetivo frente a los 12 meses siguientes, el ritmo que guía la empresa para el beneficio bruto en 2026. No exige que vuelva el margen de antes.
- **Consenso**: objetivo medio de **18,8 USD** (10 analistas, de 15 a 21; 9 en Comprar) [9][11], por encima de nuestro ponderado.
- **DCF inverso**: con un coste de capital del 11 % (riesgo emergente), margen FCF del 13,7 % constante y crecimiento final del 3 %, el precio descuenta **~10 % anual durante 10 años**. Con un margen del 12 % serían ~12 %. Es poco para una empresa que crece por encima del 30 % en beneficio bruto, y explica por qué la regla compra.

## 10. Foros y sentimiento

- **Analistas**: mayoría compradora (9 de 10, objetivo de 18,8 USD). UBS pasó a Comprar en julio, y Goldman y Truist subieron objetivos tras el 2T [11].
- **Seeking Alpha** (7-oct, resumen de Pluang): «Neutral»; la compresión del margen es una consecuencia de la escala y no un defecto, pero el PER adelantado de ~17 refleja el miedo a que siga [12]. Insider Monkey (27-sep): 23 fondos frente a 26 el trimestre anterior y cortos del 14 %. Los argumentos de los bajistas son la comisión, los márgenes y el riesgo de ejecución en emergentes [12].
- **Reacción del mercado**: tras el 2T (récord de TPV) la acción bajó de 14,76 a 13,64 USD en tres sesiones, con la venta de General Atlantic de por medio. Tras el 1T cayó un 13 % en un día. El mercado mira el beneficio bruto, no el volumen [8].
- **Reddit, StockTwits y foros en castellano** (Rankia, Investing.com ES): las búsquedas no devolvieron hilos recientes ni lecturas fiables. **Laguna**: no se rellena.
- **Contraste con los datos**: el negocio crece más que nunca en volumen y caja; la percepción es escéptica por la comisión. Que no haya euforia ayuda a la valoración, pero el sentimiento no acompaña todavía (por eso la señal 6 es «no»).

## 11. Riesgos, robustez y qué rompería la tesis

**Alertas del motor (`calc.alertas`): dos.**
1. **«Proyección mecánica (2.804 M) > 1,2 × la del analista (2.300 M): v11 usa la del analista.»** La regla parte de un crecimiento del 47 % (el de los ingresos), que no se sostendrá con la comisión bajando y comparaciones más duras en 2027 (lo dice el propio consejero delegado). v11 usa las ventas del informe, cercanas al consenso, y la señal sigue en Comprar. **No debilita la señal; la hace más prudente.** Con la mecánica (v9) la ponderada sería del +35,6 %, demasiado optimista.
2. **«Sin guía anual de 12 meses: el recorte por la guía (v9) no actúa.»** dLocal guía TPV, beneficio bruto y beneficio operativo, no ingresos. Su guía de beneficio bruto (+25-30 % en 2026, ~+22 % en el 2S) es más baja que el crecimiento de ingresos y es la que manda en el beneficio. **Debilita algo la señal**: si los ingresos crecieran como el beneficio bruto, la regla daría Vender (tabla de abajo). La base del informe (2.300 M) supone que los ingresos siguen creciendo más que el beneficio bruto, como en los últimos cinco trimestres.

El motor revisó y dio por buenos: el múltiplo de hoy no dobla su mediana (10,3 frente a 10,3); `ebitda_ntm_m` está relleno y cuadra con el múltiplo; el «compra hasta» respeta el bajista; los dos mayores clientes suman al menos un 20 % (cota inferior; el listón es 40 %); y los pagos en acciones son el 1,9 % de las ventas.

**Prueba `robustez-growth --precios`: SÓLIDA, Comprar.** Variantes: v11 +14,8 / +15,7 Comprar; v7 +35,6 / +38,8 Comprar; ventas del analista +14,8 / +15,8 Comprar; 25/50/25, igual; **35/50/15 +4,6 / +15,7, Mantener**; precio de hoy (14,62, objetivo fijo) +18,3 / +18,9 Comprar. Avisos:
- **G2: el objetivo se mueve con el precio** (elasticidad 0,99). Al ir por EBITDA con el múltiplo de hoy, recalcular el motor con otro precio arrastra el objetivo. Por eso se deja **fijo el objetivo de 17,1 USD** y el límite es 16,4.
- **G4: sin guía de ingresos**: es la alerta 2.
- **G9: Comprar con convicción baja**: peso del 3,5 % y en dos tramos.

**Pruebas propias de sensibilidad** (mismo motor v11, cambiando un dato cada vez):

| Variante | Puntuación | Ponderada | Base | Bajista | Señal |
|---|---|---|---|---|---|
| Vigente | 73,7 | +14,8 % | +15,7 % | −37,6 % | Comprar (baja) |
| Ventas 1.850 / 2.200 / 2.450 (crecimiento del año objetivo igual) | 73,7 | +10,0 % | +11,1 % | −39,0 % | Comprar (baja) |
| Crecimiento del año objetivo 21 % en vez de 27 % | 73,7 | +3,5 % | +4,3 % | −43,3 % | Mantener |
| Las dos anteriores a la vez | 73,7 | −1,2 % | +0,2 % | −44,5 % | Mantener |
| Ventas creciendo como el beneficio bruto (base 2.000, año objetivo +10 %) | 73,7 | −15,6 % | −18,1 % | −52,2 % | Vender |
| Crecimiento de los 12 meses siguientes 30 % y del año objetivo 22 % | 73,7 | +12,8 % | +13,9 % | −38,5 % | Comprar (baja) |
| Sin la señal de revisiones | 71,2 | +14,8 % | +15,7 % | −37,6 % | Comprar (baja) |
| Tecnología 4 | 75,0 | +14,8 % | +15,7 % | −37,6 % | Comprar (media) |
| Probabilidades 35/50/15 | 73,7 | +4,6 % | +15,7 % | −37,6 % | Mantener |

**Lectura honesta:** la herramienta la da por sólida porque sus variantes no tocan el crecimiento, pero **la señal es frágil frente al ritmo de crecimiento de 2027-2028**. Lo que más pesa es la rebaja por desaceleración: si el año objetivo crece un 21 % en vez de un 27 %, la ponderada cae al +3,5 % y pasa a Mantener. Si los ingresos convergen al crecimiento del beneficio bruto, sería Vender. A favor: el volumen acelera (+92 %), la retención es del 145 % y el consenso de 2027 (+31 %) está por encima del supuesto prudente. Es una compra **de convicción baja, en tramos y vigilando el beneficio bruto**, no la variable de volumen.

**Riesgos del negocio:**
- **Comisión a la baja**: es el riesgo central. Si el beneficio bruto sobre volumen sigue cayendo al ritmo de 2025-2026 (−0,35 puntos al año), el beneficio crecería poco aunque el volumen se dispare.
- **Concentración**: diez clientes son el 61 % y dos pasan del 10 % cada uno. Perder uno o que pida otra rebaja grande (como los «Tier 0» de México) se nota en un trimestre.
- **Divisa y país**: Argentina (18 % de los ingresos), Egipto, Nigeria y México. Devaluaciones, controles de cambios, impuestos (Brasil) o aranceles (México).
- **Gobierno y reputación**: fundadores con voto reforzado que venden, salida progresiva de General Atlantic (21 % de la clase A: más ventas posibles), investigaciones en Argentina y demanda colectiva abierta.
- **IA y competencia**: riesgo medio por presión de precios (sección 4).

**Señales de venta concretas** (si se tuviera): beneficio bruto creciendo menos del 15 % dos trimestres seguidos; beneficio bruto sobre volumen por debajo del 0,6 %; perder uno de los dos mayores clientes; guía de 2027 de beneficio bruto por debajo del +15 %; o un problema regulatorio que impida operar en Argentina o Brasil.

## 12. Catalizadores con fecha

| Fecha | Evento |
|---|---|
| 25-oct-2026 | Segunda vuelta de las elecciones en Brasil (riesgo de divisa y fiscal) |
| Mediados de nov-2026 (sin fecha publicada) | Resultados del 3T26: primer trimestre de la mejora de márgenes prometida para el 2S [1] |
| Mar-2027 | Resultados de 2026, **guía de 2027** y nuevo dividendo; vence la recompra de 300 M [4] |
| 2026-2027 | Despliegue de Stablecoin Full; nuevas licencias y países [13] |
| Continuo | Posibles nuevas ventas de General Atlantic; política de cambios en Argentina, Egipto y Nigeria |

## 13. Encaje en cartera

- **Bolsillo growth lleno (~20 %)**: Nu (+19 %), Axon (+36 %), Shopify (+18 %), Snowflake (+13 %) y Samsara (+15 %), al precio actual con v11. La liquidez libre es casi nula, así que solo cabe sustituir. Alphabet se vende mañana y no cuenta como exposición a IA de la cartera.
- **dLocal al precio actual: +18,2 % de ponderada** (objetivo fijo de 17,1 USD frente a 14,63). Supera a Snowflake (+13 %) y a Samsara (+15 %), pero **no las sustituye**:
  - el margen frente a Snowflake es de unos 4 puntos y la convicción es menor (baja frente a media);
  - la señal es frágil al crecimiento de 2027-2028 (sección 11) y depende de la comisión, mientras que Snowflake y Samsara aceleran con márgenes al alza;
  - el bolsillo ya tiene Nu: dLocal sumaría más riesgo de Brasil, México y Argentina y de sus monedas.
- **Suplente nº 2**, detrás de MongoDB (+21 %) y delante de Toast (+15 %). Entraría si sale alguna de las cinco y se confirma en el 3T que el beneficio bruto vuelve a crecer al ~25 %. Lo haría en dos tramos de un 1,75 % cada uno, con límite de 16,4 USD.
- **Qué aportaría**: la única exposición a pagos transfronterizos en emergentes, con caja neta, dividendo y recompras, a un precio bajo (10x EBITDA). Diversifica frente al software de EE. UU., pero no frente a Latinoamérica.
- No está en la cartera value ni tiene informe value. Wise (Mantener) y Adyen (lista de espera value) son los comparables más cercanos del repositorio.

## 14. Puntuación

| Bloque | Puntos | Máximo | Detalle |
|---|---|---|---|
| A. Crecimiento | 20,0 | 25 | Ventas a 12 meses +57 % (5), CAGR propio a 2 años 38,4 % (4), aceleración +0,4 pp (3) |
| B. Mercado y tecnología | 14,7 | 20 | Penetración 4,5 % (4), tecnología 3, posición 4 |
| C. Cambio de tendencia | 10,0 | 20 | 4 señales (revisiones, media de 200, múltiplo y catalizador); sin euforia |
| D. Economía unitaria | 12,0 | 15 | Margen bruto 34,3 % (2), regla del 40 = 70,7 (5), FCF creciente (5) |
| E. Caja y dilución | 10,0 | 10 | FCF positivo, recompras (dilución −1,7 %) |
| F. Ejecución y dirección | 7,0 | 10 | Historial 4, dirección 3 |
| **Total** | **73,7** | **100** | |

**Mejora de método propuesta** (pendiente de probar con el backtest, no aplicada): en los procesadores de pagos cuya comisión baja (dLocal, y antes Toast), los ingresos crecen mucho más que el beneficio bruto y la regla mecánica sobrestima. Dos opciones: (a) que v9 acepte una **guía de beneficio bruto** cuando la empresa no guía ingresos, con un campo `guia_metrica` («ventas» o «beneficio bruto»); o (b) proyectar y valorar sobre **beneficio bruto** en lugar de ingresos cuando el margen bruto haya caído más de 5 puntos en un año. En dLocal, con (b) la señal pasaría a Vender, lo que indica que la regla actual puede ser generosa con este tipo de empresa.

## Fuentes

[1] dLocal, 6-K del 13-ago-2026 (SEC, 0001846832-26-000031), EX-99.1: resultados del 2T26, guía 2026 subida, recompra y préstamo de 150 M
[2] dLocal, estados financieros intermedios a 30-jun-2026 (mismo 6-K, XBRL dlo-20260630): ingresos por país, concentración de clientes, acciones, caja corporativa y de comerciantes, deuda, litigios, Argentina, coberturas
[3] dLocal, 6-K del 14-may-2026: resultados del 1T26
[4] dLocal, 6-K del 18-mar-2026: resultados del 4T25 y de 2025, primera guía 2026, dividendo y recompra
[5] dLocal, 20-F de 2025 (SEC, 18-mar-2026): retención neta, concentración de clientes, EBITDA ajustado 2023-2025, riesgos
[6] dLocal, 6-K de resultados del 2T24, 2T25 y 3T25 (SEC): series trimestrales
[7] SEC: Schedule 13D/A de General Atlantic (19-ago-2026), formulario 144 (17-ago) y formulario 4 de Sebastián Kanovich (ago-2026)
[8] Yahoo Finance chart API (DLO, ^NDX, ^GSPC): cierre de 15,02 USD el 13-oct-2026; 14,625 USD el 14-oct a las 17:52 UTC; medias y rentabilidades calculadas
[9] StockAnalysis (DLO, 14-oct-2026): cierre anterior de 15,02 USD y 14,63 USD en sesión; consenso de 10 analistas, objetivo de 18,8 USD, ingresos 2026-2027 y BPA
[10] Yahoo Finance, estadísticas clave (14-oct-2026): EV/EBITDA, PER, cortos y medias móviles
[11] MarketBeat e Investing.com (oct-2026): cambios de recomendación y objetivos
[12] Finsee (resumen del 2T26), Pluang (resumen de Seeking Alpha, 7-oct-2026) e Insider Monkey (27-sep-2026)
[13] Coinalertnews y Stablecoin Insider: lanzamiento de Stablecoin Full (abr-2026)
[14] Cálculo propio del EV/EBITDA de los 12 meses siguientes en 2023-2026 (precios de [8], EBITDA de [4][5][6], caja neta ~300 M); usa el EBITDA que luego se dio
[15] De memoria, sin verificar en esta sesión: múltiplos de los comparables, guía inicial de 2025, historia de 2022-2024 (informe de Muddy Waters, cambio de consejero delegado) y mercado alcanzable (estimación propia)

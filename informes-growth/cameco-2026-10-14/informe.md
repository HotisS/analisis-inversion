# Cameco (CCJ): análisis growth, 14-oct-2026

**Señal (método v11, vigente): Vender (no comprar)** · Puntuación 40,5/100 · Señales de cambio de tendencia 1/8 · EV/beneficio bruto 29,7x · EV/EBITDA de los 12 meses siguientes 27,2x
Precio 86,15 USD (cierre del 13-oct en la bolsa de Nueva York) · Objetivo 12 m 77,7 USD (ponderada −9,7 %, base −7,3 %, bajista −45 %, alcista +20,9 %) · Compra hasta 74,1 USD
Peso orientativo: **no entra** (no es Comprar y el bolsillo growth está lleno).
Referencia v9: la misma señal y las mismas cifras. Vender, ponderada −9,7 %, base −7,3 %, objetivo 77,7 USD, compra hasta 74,1 USD. Las ventas que proyecta la regla son menores que las del informe, así que v11 y v9 coinciden.
**Al precio actual** (81,50 USD, 14-oct a las 18:35 UTC; objetivo del informe fijo en 77,7): ponderada **−4,5 %**. Hoy cae un 5,4 % junto con todo el sector nuclear (Centrus −10 %, Oklo −8,6 %, GE Vernova −6,7 %); no hay noticia propia de Cameco.
**Moneda:** Cameco publica sus cuentas en dólares canadienses (CAD). Aquí todo se pasa a dólares de EE. UU. (USD) a 1,4249 CAD por USD (14-oct), la moneda en la que cotiza CCJ. Precio y objetivo van en la misma moneda: el objetivo de 77,7 USD equivale a 110,7 CAD en Toronto (CCO), donde la acción cerró a 122,57 CAD el 13-oct.
Alertas de robustez del motor (`calc.alertas`): ninguna. Prueba `robustez-growth`: **FRÁGIL** (la única variante que cambia la señal, la de las ventas del analista, da Mantener y no Comprar; la acción robusta sigue siendo no comprar).

## 1. La tesis en cinco líneas

1. Cameco es la mayor productora occidental de uranio. Tiene las minas de más ley del mundo (McArthur River y Cigar Lake, en Canadá), conversión de combustible y el 49 % de Westinghouse, cuya tecnología usa más de la mitad de los reactores del mundo [1].
2. El relato es muy bueno: largo plazo del uranio en máximos de 18 años (~96 USD/lb), préstamo del Gobierno de EE. UU. de hasta 17.500 M USD para reactores AP1000, un marco con Corea de 120.000 M USD y la salida a bolsa de Westinghouse en preparación [1][3][11].
3. Las cuentas no acompañan todavía. Las ventas proporcionales están planas (−1,1 % en 12 meses) y el EBITDA ajustado baja un 13 % en el semestre. La guía apunta a un 2S26 algo peor (−1,6 %) porque Cameco entrega menos a propósito y vende con contratos antiguos con techo de precio: cobró 68 USD/lb en el 2T con el mercado a 85-90 [1].
4. El precio ya cuenta con el crecimiento. Paga 27 veces el EBITDA de los 12 meses siguientes (su mediana es ~22x) y descuenta crecer un 17 % anual durante 10 años. La acción ha caído un 37 % desde enero, pero en tres años sigue subiendo un 137 % [7][9].
5. El método da **Vender** porque la puntuación (40,5) queda por debajo de 50: no hay crecimiento de ventas y solo hay una señal de cambio de tendencia. Es un buen negocio cíclico a un precio de crecimiento, y no encaja en el bolsillo growth.

## 2. Negocio y tecnología

Cameco (Saskatoon, Canadá) tiene tres patas. Ventas del 1S26, en CAD [1]:
- **Uranio** (1.370 M, el 83 % de lo que consolida). Controla McArthur River/Key Lake (69,8 %) y Cigar Lake (57,4 % desde julio, tras comprar la parte de TEPCO junto con Orano) y tiene el 40 % de JV Inkai (Kazajistán). En 2026 producirá 19,5-21,5 M de libras (su parte). Vende sobre todo con **contratos a largo plazo**: más de 28 M de libras al año de media en los próximos cinco años, más en 2026-2028 y menos en 2029-2030. Una parte va a precio fijo con escalado y otra referenciada al mercado, con suelo y techo [1].
- **Servicios de combustible** (286 M, el 17 %). Conversión a UF6 y UO2 en Port Hope y haces de combustible para reactores CANDU. Producirá 13-14 M de kgU [1].
- **Westinghouse** (49 %, con Brookfield el 51 %; comprada en noviembre de 2023). Combustible para el ~40 % de los reactores del mundo, servicios de recarga y el diseño AP1000, el único reactor de generación III+ diseñado, licenciado y funcionando. Tiene una cartera de hasta 91 oportunidades de AP1000 [1].

**Método de participación (cómo se cuenta Westinghouse).** Cameco no suma las ventas ni la deuda de Westinghouse (ni las de Inkai). En su cuenta de resultados aparece solo una línea con su parte del beneficio de Westinghouse, que en el 1S26 fue una pérdida de 56 M CAD por la amortización de la compra. Su **EBITDA ajustado sí incluye el 49 % del EBITDA de Westinghouse** (284 M CAD en el 1S26). Si se divide el valor de empresa de Cameco por ese EBITDA sin sumar la deuda de Westinghouse, el múltiplo sale barato por error. Si se usa el EBITDA contable sin Westinghouse, sale carísimo: StockAnalysis da 67x. Para no duplicar ni mezclar, **este informe es proporcional**:
- ventas = Cameco + 49 % de Westinghouse;
- EBITDA = el ajustado de Cameco, que ya lleva el 49 % de Westinghouse (no se suma además su beneficio ni un valor aparte por la participación);
- deuda = la de Cameco (997 M CAD) + el 49 % de la de Westinghouse (2.386 M CAD);
- caja = 1.113 + 142 M CAD.

En USD: ventas de 12 meses de 4.815 M, deuda de 2.374 M, caja de 881 M y valor de empresa de 39.017 M [1].

**Por qué EV/EBITDA y no PER.** Cameco gana dinero de forma estable, así que se valora por beneficio y no por ventas. El PER está distorsionado: la amortización del precio pagado por Westinghouse (~390 M CAD al año, su parte), los derivados de divisa y las participadas mueven el beneficio. El beneficio ajustado de 12 meses es de 1,22 CAD por acción (PER ~100x) y el consenso de 2027 es de 2,60 CAD (PER ~47x). El EBITDA ajustado esquiva ese ruido y es la medida que usa la propia empresa [1][5].

**Tecnología 4/5**: los yacimientos de ley muy alta y las licencias son casi imposibles de replicar, y el AP1000 es una ventaja real. No le doy 5 porque el uranio es una materia prima.

## 3. Crecimiento

Ventas proporcionales en M CAD (Cameco + 49 % de Westinghouse) y EBITDA ajustado [1][8]:

| Periodo | Cameco | 49 % Westinghouse | Total proporcional | Crec. interanual | EBITDA ajustado |
|---|---|---|---|---|---|
| 2024 | 3.136 | 2.892 | 6.028 | — | 1.531 |
| 2025 | 3.482 | 3.458 | 6.940 | +15 % | 1.929 |
| 2T25 | 877 | 1.034 | 1.911 | +51 % (Dukovany) | 673 |
| 3T25 | 615 | 697 | 1.312 | −9,4 % | 309 |
| 4T25 | 1.201 | 958 | 2.159 | +6,6 % | 591 |
| 1T26 | 845 | 868 | 1.713 | +9,9 % | 509 |
| 2T26 | 814 | 863 | 1.677 | −12,2 % | 391 |
| 12 meses a jun-26 | 3.475 | 3.386 | 6.861 (4.815 M USD) | −1,1 % | 1.799 |
| 2026, guía o consenso | 3.445 (guía) | sin guía de ventas | — | — | ~1.770 (estimación propia) |
| 2027, consenso | 3.980 | sin consenso | — | — | ~2.450 (estimación propia) |

- **Aceleración: −26,7 pp.** Exagera el frenazo. El 2T25 llevaba unos 235 M CAD únicos de la obra de Dukovany (República Checa); sin ese efecto, el 2T26 caería ~1 %.
- **Guía**: Cameco espera ventas de 3.320-3.570 M CAD en 2026. Subió en julio por el precio del uranio y el dólar, no por más volumen. Eso implica un **2S26 del −1,6 %**, que es el valor de `guia_12m_pct`. Westinghouse solo guía EBITDA: entre 370 y 430 M USD para su parte de Cameco, por debajo de los ~560 M de 2025. Exceso sobre la guía: desconocido [1].
- **CAGR propio a 2 años: 6,8 %**, con el escenario base del informe. Para la parte de Cameco usa el consenso de 2027; para Westinghouse, un +5 % anual que es estimación propia, porque no hay consenso.
- **Por qué no crece si el uranio sube**: los contratos firmados hace años tienen techo. Cameco cobró 67,79 USD/lb en el 2T26 (+18 %) con el mercado a largo plazo en 95,50, y además entrega menos en 2026 por disciplina comercial. El consenso espera el salto en 2027: ventas de Cameco +14 % y beneficio por acción +79 % [1][6].
- **Compras**: el 2,9 % adicional de Cigar Lake (julio de 2026) aumenta la producción propia, pero no las ventas, que dependen de los contratos. Mueve el crecimiento de 12 meses menos de 2 puntos, así que no se rellena el orgánico ni hace falta la v12. La v12 da, de todos modos, el mismo resultado.

## 4. Mercado y competencia

- **Mercado alcanzable en 2028: ~60.000 M USD** (estimación propia, en parte de memoria). Lo forman el uranio (~180-190 M de libras al año a ~90 USD), la conversión, y el combustible, los servicios y los equipos nuevos de Westinghouse [12]. **Penetración del 8 %**.
- **Posición 5/5**: Cameco es la primera productora occidental y Westinghouse el primer proveedor occidental de combustible y reactores. La rival grande es Kazatomprom (Kazajistán), que ha subido su coste a 39-40,5 USD/lb. Les siguen Orano (Francia), las rusas Rosatom y TVEL (vetadas en EE. UU.) y nuevas minas como NexGen, Denison y Paladin [10].
- **Por qué gana**: tiene la ley más alta, está en un país estable y sus contratos le dan visibilidad. El comprador, una eléctrica, prima la seguridad de suministro sobre el precio.

## 5. Cambio de tendencia

| # | Señal | ¿Sí/no? | Prueba | Fuente |
|---|---|---|---|---|
| 1 | Revisiones al alza | No | El BPA de 2026 baja de 1,67 a 1,45 CAD en 90 días y el de 2027 de 2,68 a 2,60 | [5] |
| 2 | Precio sobre la media de 200 sesiones | No | 86,15 frente a 105,6 (−18 %), con la media girando a la baja | [7] |
| 3 | Fuerza relativa a 6 meses | No | −25,8 % frente a +12,0 % del S&P 500 | [7] |
| 4 | Mejora del múltiplo ≥ 20 % | No | EV/EBITDA en su mínimo de 12 meses (~27x), frente a ~43x en abril | [9] |
| 5 | Inflexión operativa | No | EBITDA ajustado −42 % en el 2T y margen de Westinghouse del 19 % frente al 34 % | [1] |
| 6 | Sentimiento mejorando | No | −37 % desde enero pese a las buenas noticias | [10] |
| 7 | Compras de directivos o de inversores de referencia | No | Solo avisos de venta (Form 144). Institucionales mixtos: RBC y BMO compran, Fidelity vende | [2][5] |
| 8 | Catalizador nuevo (6 meses) | **Sí** | Resultados el 30-oct, préstamo del DOE, marco con Corea y salida a bolsa de Westinghouse | [1][3] |

**Euforia: no** (subida a 12 meses del −6,5 %). La hubo en enero de 2026 (134 USD y ~43x EBITDA), y el precio se ha desinflado desde entonces. **Ojo:** el múltiplo de hoy (27x) sigue por encima de su mediana (22,5x), y a tres años la acción sube un 137 %. El ciclo del uranio ya está en la parte alta de los precios a largo plazo. Bloque C: 2,5/20.

## 6. Economía unitaria y camino a la rentabilidad

- **Margen bruto proporcional: 26,1 %.** Cameco tiene un 35 % (con amortizaciones) y Westinghouse un ~17 %. Es margen de minería e industria y puntúa 1/5.
- **Margen EBITDA ajustado** sobre ventas proporcionales: 26 % en 12 meses y ~29 % en los 12 siguientes (estimado).
- **FCF de 12 meses: ~556 M CAD (390 M USD)**: flujo de operaciones de 942 M menos inversiones de 386 M. Es un **8,1 %** de las ventas proporcionales. Es positivo pero baja: en 2025 fue de 1.075 M CAD, y el consenso de 2026 es de 184 M por la compra de uranio y el capital circulante [1][6].
- **Regla del 40: 7** (−1,1 + 8,1): 0/5.
- **Apalancamiento al precio**: la ventaja de Cameco es que, a medida que vencen los contratos con techo, el precio realizado sube hacia el de mercado. El consenso de 2027 lo recoge.

## 7. Caja, deuda y dilución

- Caja de 1.113 M CAD y deuda de 997 M (Cameco). Tiene una línea de crédito de 1.000 M sin usar. Deuda neta/EBITDA ~0,1x [1].
- Westinghouse tiene 4.869 M CAD de deuda al 100 % (2.386 M la parte de Cameco). No la avala Cameco, pero es parte del valor que se compra. Por eso está incluida.
- Dilución mínima (435,5 M de acciones; +0,05 % al año). Pagos en acciones de ~1,5 % de las ventas.
- Riesgo fiscal: un litigio con Hacienda de Canadá por precios de transferencia. Cameco ganó los años 2003-2006 y tiene 559 M CAD depositados o avalados [1].

## 8. Dirección y ejecución

- El consejero delegado es Tim Gitzel. La disciplina comercial es reconocida: no vende barato. La compra de Westinghouse en 2023 parece hoy acertada [1].
- **Historial 3/5**: cumple la producción guiada casi todos los años, pero hay interrupciones frecuentes (inundaciones en mayo, el molino de McClean Lake en julio). El 2T26 quedó muy por debajo del consenso de beneficio (0,18 frente a ~0,38 CAD) [1][10].
- **Dirección 4/5**: asignación de capital prudente y deuda baja. Los directivos tienen solo un 0,19 % del capital [6].

## 9. Valoración

Método: EV/EBITDA de los 12 meses siguientes, en proporcional (explicado en el apartado 2). EBITDA de los 12 meses siguientes: 1.437 M USD, estimación propia a partir de la guía de Westinghouse y del consenso de beneficio. Múltiplo de hoy: **27,2x**. Mediana desde 2024: 22,5x (mínimo 13,6x). Comparables: 29,7x (BWX Technologies 29,7x, Paladin 39,7x, Kazatomprom ~8x de memoria).

| Escenario | Ventas en la ventana objetivo (M USD) | Múltiplo EV/EBITDA | Precio (USD) | Rentabilidad |
|---|---|---|---|---|
| Bajista | 4.744 | 16,3x | 47,2 | −45 % |
| Base | 4.674 | 27,2x | 79,7 | −7,3 % |
| Alcista | 4.645 | 35,4x | 104,0 | +20,9 % |
| **Ponderado (25/50/25)** | | | **77,7** | **−9,7 %** |

- **Ventas que proyecta el motor**: parte de la guía (−1,6 %) y se queda casi plano. Son menores que las del informe (bajista 4.842, base 5.495 y alcista 5.965 M USD), así que v11 usa las del motor. **Consenso**: solo existe para la parte de Cameco (3.980 M CAD en 2027, unos 2.800 M USD). Para Westinghouse no hay. El escenario base del informe pone a Cameco en el consenso y a Westinghouse a +5 % anual.
- **Rareza del método** (ver mejora más abajo): con un crecimiento de partida negativo, el «bajista» proyecta más ventas que el «alcista». Aquí la diferencia es pequeña (±2 %) y la diferencia entre escenarios viene del múltiplo.
- **Con las ventas del propio informe** (la prueba de robustez), la ponderada sería de **+7,3 %** y la señal Mantener. No sería Comprar, porque la puntuación no cambia.
- **Consenso de precio**: 127 USD (19 de 21 analistas dicen Comprar). Está muy por encima porque esperan el salto de precio de los contratos en 2027-2028 y le dan valor a Westinghouse con su cartera de reactores.
- **DCF inverso**: el precio descuenta que el flujo de caja crezca un **17 % anual durante 10 años** (con un 8,5 % de coste de capital).

## 10. Foros y sentimiento

- **Analistas**: muy positivos (11 «compra fuerte», 8 «compra» y 2 «mantener»). Pero las estimaciones de beneficio bajan y Barclays recortó su objetivo dos veces [5][6].
- **Prensa y análisis**: TIKR (1-oct) lo llama «reajuste de valoración, no tesis rota». Seeking Alpha («Great Business, Bad Price») y Simply Wall St (valor de 73 USD) dicen Vender por caro. Motley Fool sigue vendiendo el relato de la escasez de combustible [10].
- **Reddit, StockTwits y foros en castellano** (Rankia): las búsquedas no devolvieron hilos fechados en este otoño. No puedo afirmar el tono minorista con pruebas. Lo que sí se ve es la rotación fuera de lo nuclear en julio, septiembre y hoy, con caídas de todo el grupo [11].
- **Contraste**: la euforia de enero ya ha salido. Queda un mercado dividido entre el relato (reactores, centros de datos) y unas cuentas que no mejoran hasta 2027.
- **Riesgo de la IA**: la IA no sustituye el uranio ni el combustible nuclear, así que el riesgo de sustitución es bajo. El riesgo es el contrario: buena parte de la prima de la acción depende de la narrativa de «la IA necesita electricidad nuclear». Si se enfría la inversión en centros de datos, los múltiplos del sector caen aunque el negocio no cambie, como ha pasado hoy (−5,4 %).

## 11. Riesgos y qué rompería la tesis

**Alertas de robustez** (`calc.alertas`, v11): **ninguna**. No salta la de múltiplo caro porque 27,2x no llega al doble de su mediana. Tampoco la de proyección por encima del analista: la mecánica es menor. No hay EBITDA sin `ebitda_ntm_m` y el margen implícito, del 28,6 %, coincide con el de `ebitda_ntm_m`.

**Prueba `robustez-growth` (FRÁGIL)**:
- La única variante que cambia la señal es la de las «ventas del analista» (+7,3 %, Mantener). Aun así no llega a Comprar, porque la puntuación (40,5) no depende de las ventas. No debilita el «no comprar».
- G2: el objetivo se mueve con el precio. Por eso se deja fijo (77,7 USD) al revisar el precio.
- G6: el bajista es del −45 %.
- G8: el precio descuenta un 17 % anual, frente al ~6 % que se supone al final del periodo.

**Riesgos**:
- **Precio del uranio y ciclo**: la acción se mueve con el precio a largo plazo. Si los contratos nuevos se firman más bajos, se pierde el salto de 2027.
- **Westinghouse**: los reactores dependen de acuerdos definitivos, financiación pública y política de EE. UU.; el marco con Corea no es vinculante. Una salida a bolsa a una valoración baja haría daño.
- **Operaciones** en el norte de Saskatchewan (inundaciones, el ácido sulfúrico de McClean Lake) e Inkai (transporte por Rusia).
- **Narrativa de IA y energía**: explicada en el apartado 10.
- **Litigio fiscal** en Canadá.

**Qué rompería la tesis de largo plazo**: cancelación de los proyectos AP1000 en EE. UU., una caída del precio a largo plazo por debajo de ~75 USD/lb o un problema grave en McArthur River o Cigar Lake.

## 12. Catalizadores con fecha

- **30-oct-2026**: resultados del 3T (consenso de 0,34 CAD por acción y 737 M CAD de ventas).
- **4T26-1T27**: acuerdos definitivos del préstamo del DOE y del marco con Corea. Precio de salida a bolsa de Westinghouse (sin fecha).
- **4T26**: audiencias para renovar la licencia de Port Hope (vence en febrero de 2027).
- **Febrero de 2027**: guía de 2027, la primera con el salto de los contratos.

## 13. Encaje en cartera

- **No entra.** La señal es Vender, así que no se compra. No sustituye a ninguna de las cinco del bolsillo growth, que está lleno: Nu (+19 %), Axon (+36 %), Shopify (+18 %), Snowflake (+13 %) y Samsara (+15 %), todas a precio actual con v11 y por encima de Cameco (−4,5 % a precio actual). Tampoco entra en la lista de suplentes (MongoDB, Toast, Zscaler, dLocal, Dexcom, argenx, Datadog, Saab, Natera), porque todas son Comprar y Cameco no.
- **Liquidez libre**: casi nula; solo cabría sustituyendo, y no procede.
- **Diversificación**: la cartera no tiene exposición nuclear ni a materias primas. Cameco aportaría algo distinto, pero no a este precio. Alphabet, que se vende mañana, no cuenta como exposición a la IA; Cameco tampoco la cubriría, y su prima depende de esa misma narrativa.
- **Cuándo mirarla otra vez**: tras la guía de 2027 (febrero) o si cae por debajo de ~74 USD (el «compra hasta»). Aun así necesitaría que la puntuación pasara de 50, y para eso hace falta crecimiento real de ventas.
- **Para la cartera value**: como negocio cíclico con caja y activos únicos, encaja mejor en el método value (beneficio normalizado del ciclo) que en el growth.

## 14. Puntuación

| Bloque | Puntos | Máximo | Por qué |
|---|---|---|---|
| A. Crecimiento | 0 | 25 | Ventas −1,1 %, CAGR 6,8 %, aceleración −26,7 pp |
| B. Mercado y tecnología | 16 | 20 | Penetración del 8 %, tecnología 4, posición 5 |
| C. Cambio de tendencia | 2,5 | 20 | 1 señal de 8 |
| D. Economía unitaria | 5 | 15 | Margen bruto 26 %, regla del 40 de 7, FCF positivo |
| E. Caja y dilución | 10 | 10 | FCF positivo y sin dilución |
| F. Ejecución y dirección | 7 | 10 | Historial 3, dirección 4 |
| **Total** | **40,5** | **100** | Por debajo de 50: Vender |

**Mejoras de método que deja este informe** (pendientes de probar en el backtest):
1. **Participadas grandes por el método de participación** (Westinghouse): usar siempre la consolidación proporcional (ventas, EBITDA y deuda con la misma participación) y decirlo en `nota_margen_obj`. Mezclar el EBITDA ajustado con un valor de empresa sin la deuda de la participada infla o desinfla el múltiplo; StockAnalysis da 67x frente a 27x.
2. **Escenarios con crecimiento negativo**: la proyección multiplica el crecimiento de partida por 0,5 (bajista) y 1,2 (alcista). Si la partida es negativa, el bajista sale con más ventas que el alcista. Propuesta: con partida < 0, bajista ×1,5 y alcista ×0,5.

## Fuentes

[1] Cameco, 6-K de 31-jul-2026 (SEC, acc. 0001193125-26-326768): nota de resultados del 2T26, MD&A (guía 2026, precios del uranio, contratos, Westinghouse, acciones) y estados intermedios (balance a 30-jun; nota 6 con las cuentas al 100 % de Westinghouse).
[2] SEC EDGAR, presentaciones de Cameco (CIK 1009001): 40-F de 2025, Form 144 de dic-2025, ene-2026 y mar-2026, 13G de jul-2026.
[3] Cameco, 6-K de 23-jun-2026 (préstamo condicional del DOE), 2-jul (Cigar Lake al 57,4 %), 1 y 14-jul (parada y reanudación de Cigar Lake), 31-jul (S-1 confidencial de Westinghouse) y 1-oct-2026 (marco EE. UU.-Corea).
[4] Cameco, 6-K de 28-oct-2025: acuerdo con el Departamento de Comercio de EE. UU.
[5] Yahoo Finance quoteSummary (14-oct-2026): estimaciones y revisiones, recomendaciones, precios objetivo, institucionales y fecha de resultados.
[6] StockAnalysis.com (S&P Global, 14-oct-2026): consenso de ventas y BPA 2026-2027, objetivo medio 127 USD, 21 analistas, estadísticas.
[7] Yahoo Finance chart API (CCJ, CCO.TO, CAD=X, ^GSPC; cierre de 86,15 USD el 13-oct y 81,50 intradía el 14-oct a las 18:35 UTC) y Nasdaq.com, histórico (cierre de 86,15 USD el 13-oct).
[8] Cameco, 6-K de 1-may-2026 (1T26), 13-feb-2026 (resultados, MD&A y estados de 2025), 5-nov-2025 (3T25), 31-jul-2025 (2T25) y 20-feb-2025 (2024).
[9] Múltiplos históricos: cálculo propio con [7], [8] y el XBRL de la SEC (ifrs-full); aproximado.
[10] TIKR (1-oct-2026); Seeking Alpha, «Cameco: Great Business, Bad Price»; Simply Wall St; Motley Fool (13-oct-2026).
[11] Precios del uranio: MD&A del 2T26 [1]; fin de septiembre de 2026, 89,63 (spot) y 96,50 USD/lb (largo plazo), según Crux Investor (fuente secundaria); Quiver Quant y Tickeron (texto generado por IA, orientativo).
[12] Mercado alcanzable: estimación propia, en parte de memoria.
[13] Comparables: Yahoo Finance, estadísticas clave a 14-oct-2026.

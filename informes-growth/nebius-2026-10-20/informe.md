# Nebius Group (NBIS): análisis growth, 2026-10-20

**Señal: Vender / no comprar** (no se tiene: no entra) · Puntuación 60,8/100 · Señales de cambio de tendencia 5/8
Precio 170,24 USD (cierre del lunes 19-oct-2026, Nasdaq) · Objetivo 12 m 43,1 USD (ponderada −74,7 %, base −76,0 %, bajista −92,3 %, alcista −54,5 %) · Compra hasta 26,20 USD
Peso orientativo: no entra · Robustez: SÓLIDA (las cinco variantes dan Vender)

## Pasos hechos y fecha de los datos

| Paso | Qué se hizo | Fecha del dato |
|---|---|---|
| 1 | Comprobado: sin informe value ni growth previo, no está en exclusiones ni en la cola | 20-oct-2026 |
| 2 | Cuentas oficiales leídas en la SEC: 20-F de 2025 y 6-K de resultados del 3T25, 4T25, 1T26 y 2T26 (nota, carta y estados intermedios) | 30-jun-2026 (último trimestre publicado) |
| 3 | Financiaciones posteriores al cierre: crédito de 775 M (jul) y convertibles de 5.750 M con canje (ago), en los 6-K | 24-ago-2026 |
| 4 | Precio y movimiento (`movimiento.mjs`), con QQQ y CoreWeave de contraste | Cierre del 19-oct-2026, leído a las 06:45 UTC del 20-oct |
| 5 | Consenso, objetivos de analistas, noticias de 12 meses y foros | 7 a 20-oct-2026 |
| 6 | 46 formularios 4 de directivos (12 meses) sumados uno a uno | 20-oct-2025 a 19-oct-2026 |
| 7 | Motor `growth.mjs` v11 y `robustez-growth.mjs --precios` | 20-oct-2026 |

## 1. La tesis en cinco líneas

1. Nebius alquila capacidad de cálculo con GPU de NVIDIA a laboratorios de IA y grandes empresas, con su propio software encima (nube de IA, «Token Factory» de inferencia, Tavily para agentes). Es la parte que quedó de Yandex fuera de Rusia, con el fundador Arkady Volozh al frente [1][2].
2. Crece como pocas: ventas del 2T26 de 582 M (+454 %), ARR de 3.000 M en junio y guía de 7.000-9.000 M a final de año; cartera contratada de 37.500 M, sobre todo Microsoft y Meta [1][2][3].
3. Pero cada dólar de ventas exige varios de inversión: 11.100 M de inversión en 12 meses, 20.000-25.000 M previstos en 2026, financiados con convertibles (14.250 M emitidos en 15 meses), venta de acciones y cobros anticipados. Flujo de caja libre de −5.900 M en 12 meses [1][2].
4. Con la regla v11, que limita el crecimiento de partida al 60 % y rebaja el múltiplo por desaceleración, el valor sale muy por debajo del precio (−76 % en el base). Es la consecuencia conocida de esa regla en empresas que crecen más de un 60 %; incluso con las ventas del propio contrato firmado (ver 9), no compraría: el EV/beneficio bruto (42,5) pasa del tope de 35 y el bajista cae más de un 50 %.
5. Conclusión: negocio con tracción real, pero precio, capital y concentración de clientes hacen que el método no lo compre. La caída de octubre (−28 %) es de sector (CoreWeave, Gartner), no de la empresa.

## 2. Negocio y tecnología

- **Qué vende.** Horas de GPU (Blackwell, y Vera Rubin desde 2027) en centros de datos propios y alquilados en EE. UU., Europa e Israel, con la capa de software para entrenar y servir modelos: nube «Aether», inferencia gestionada «Token Factory» (cargas de inferencia ×3 en el 2T26), búsqueda para agentes (Tavily, 2,5 millones de desarrolladores) [2].
- **Qué tiene de nuevo.** Pila completa diseñada para IA desde el principio (servidores, red y software propios), velocidad de despliegue y acceso temprano a lo último de NVIDIA, que es además accionista (9,3 %) [2][4][17]. Compras de equipos de inferencia (Eigen AI, Clarifai, Inferize) para diferenciarse del simple alquiler [4].
- **A quién.** Laboratorios de IA (Reflection, Cohere, AMI de Yann LeCun, Black Forest Labs), una firma cuantitativa, empresas (Palantir la nombra socio preferente de IA soberana) y dos hiperescaladores con contratos enormes: Microsoft (17.400-19.400 M) y Meta (hasta 27.000 M desde principios de 2027) [2][3][4][5].
- **Otros negocios.** Avride (coches autónomos y robots de reparto, con Uber), TripleTen (formación) y participaciones en ClickHouse (valorada en 15.000 M en enero) y Toloka; la nube de IA es el 98 % de las ventas [1][2].

## 3. Crecimiento

| Trimestre | Ventas (M USD) | Crec. interanual | Coste de ventas + amortizaciones | Resultado operativo GAAP |
|---|---|---|---|---|
| 2T25 | 105,1 | +625 % | 105,3 | −111,2 |
| 3T25 | 146,1 | +355 % | 141,9 | −130,2 |
| 4T25 | 227,7 | +547 % | 249,2 | −234,5 |
| 1T26 | 399,0 | +684 % | 315,8 | −128,0 |
| 2T26 | 582,3 | +454 % | 393,3 | −175,9 |

| Ejercicio | Ventas | Crecimiento |
|---|---|---|
| 2024 | 91,5 | — |
| 2025 | 529,8 | +479 % |
| 2026 (guía, reafirmada 12-ago) | 3.000-3.400 | +466 % a +542 % |
| 2027 (consenso) | ≈ 10.400-12.300 | ≈ +240 % |

Fuentes: [1][2][9][10][11].

- **12 meses a jun-2026:** 1.355,1 M, +506,9 %. **Aceleración:** −99,8 pp (454 % frente a una media del 553 % en los cuatro trimestres anteriores): es efecto base; frente al trimestre anterior las ventas crecieron un 46 %.
- **ARR:** 1.250 M (dic-25) → 1.920 M (mar-26) → 3.000 M (jun-26). Para llegar a 7.000-9.000 M en diciembre tiene que más que doblar en seis meses, y depende de que la capacidad entre a tiempo [2].
- **Guía:** lo que queda de 2026 implica 2.219 M en el 2S (+494 %). La empresa cumplió su guía de ARR de 2025 (1.250 M frente a 900-1.100 M), pero en nov-2025 se quedó corta en ventas (146 frente a 155 M esperados) [2][19].
- **Visibilidad:** cartera contratada de 37.490,6 M, el 36 % (≈ 13.500 M) a reconocer en los 24 meses a jun-2028 [3]. El 70 % de los contratos del 2T llevó cobro anticipado [2].

## 4. Mercado y competencia

- **Mercado alcanzable en 2028: unos 150.000 M** (estimación DE MEMORIA, no verificada: alquiler de GPU y nube de IA fuera de los propios hiperescaladores). Penetración ≈ 0,9 %.
- **Posición:** la segunda «neocloud» cotizada tras CoreWeave, por delante de IREN, Applied Digital o Lambda, con 5 GW de potencia contratada prevista a final de 2026 y 800 MW-1 GW conectados [2].
- **Rivales:** los hiperescaladores (AWS, Azure, Google, Oracle) con su propia capacidad y chips; CoreWeave (más grande y mucho más endeudada); antiguas mineras de bitcoin reconvertidas (IREN, Cipher); Meta, cliente y a la vez constructor propio.
- **Por qué gana hoy:** hay escasez de capacidad y quien tiene GPU y potencia conectada vende todo («podríamos vender toda la capacidad de 2027 hoy») [2]. Es una ventaja de oferta. **Riesgo de IA para la tesis:** si el gasto en IA se frena o sobra capacidad, el precio por GPU baja y la que se compró cara pierde valor. Gartner estimó el 14-oct que más del 80 % de las «neoclouds» no seguirán siendo independientes en 2030 [14].

## 5. Cambio de tendencia

| Señal | ¿Sí? | Prueba | Fuente |
|---|---|---|---|
| 1. Revisiones al alza | Sí | Ventas de 2027 del consenso de ≈ 11.000 M (jun) a ≈ 12.300 M (oct); objetivos subidos (BNP Exane 399, Rosenblatt 304, Citi 324) | [10][11] |
| 2. Precio sobre la media de 200 y girando al alza | No | 170,24, un 2,4 % por debajo; tendencia lateral | [6] |
| 3. Fuerza relativa a 6 meses | No | +7,0 % frente a +11,1 % del Nasdaq-100 | [6] |
| 4. EV/ventas ≥ 20 % sobre su mínimo de 12 meses | Sí | De 4,6 veces (3-mar-2026) a 8,0 veces hoy | [12] |
| 5. Inflexión operativa | Sí | Margen operativo GAAP del −106 % al −30 %; EBITDA ajustado de −21 a +236 M | [1] |
| 6. Sentimiento mejorando | No | Empeora: −28 % en octubre por CoreWeave y Gartner; cortos del 19,5 % | [9][13][14] |
| 7. Compras de directivos o inversores de referencia | Sí | NVIDIA invierte 2.000 M y declara el 9,3 %; en contra, 423 M de ventas de directivos (planes y de impuestos) | [17][18] |
| 8. Catalizador nuevo en 6 meses | Sí | Resultados del 3T26; capacidad de Meta con Vera Rubin a principios de 2027; Palantir | [2][4][13] |

**Euforia: no** (+38,4 % en 12 meses; +7,0 % en 6).

## 6. Economía unitaria y camino a la rentabilidad

- **Margen bruto económico: 18,9 %** en 12 meses. El «coste de ventas» que publica Nebius (348,8 M, margen del 74,3 %) **no incluye la amortización de las GPU**, que en este negocio es el coste directo principal (751,4 M). Este informe usa el margen con amortizaciones; con el del 74,3 % la puntuación sube a 64,8 y la señal no cambia [1].
- **La amortización se alargó:** los servidores pasan de 4 a 5 años en 2026 [2]. Si las GPU quedan obsoletas antes (cada generación de NVIDIA llega en 12-18 meses), el margen real es peor que el contable.
- **Regla del 40:** 507 % de crecimiento − 434 % de margen FCF = 73.
- **EBITDA ajustado:** 41 % del grupo y 50 % de la nube de IA en el 2T26 [2]; no descuenta la reposición de GPU.
- **FCF:** −5.884 M en 12 meses (flujo de explotación 5.258 M, inflado por los cobros anticipados, − inversiones 11.142 M). El consenso lo ve negativo de 2026 a 2029 [1][10]: camino a la rentabilidad «lejos».

## 7. Caja, deuda y dilución

- **Caja pro forma: 14.497 M** (8.042 M a 30-jun + 775 M del crédito + ≈ 5.680 M netos de los convertibles de agosto). **Deuda:** 10.909 M en convertibles fuera de dinero (marzo y agosto), crédito y deuda a corto; los convertibles de 2025 (conversión a 51 y 139 USD) se cuentan como acciones [1][3][4][7].
- **Pista: 29,6 meses** con la quema de los últimos 12 meses. Ojo: la inversión guiada exige 12.000-17.000 M más en el 2S26; con los cobros anticipados previstos (más de 9.000 M en 2026) llega a fin de año, pero 2027 (más de 1 GW al año) necesitará más deuda o acciones. El consenso ve la deuda neta en ≈ 34.000 M a final de 2027 [2][10].
- **Dilución: +13,6 % en 12 meses** (NVIDIA 21,1 M de acciones, venta en el mercado de 12,7 M a 223,6 USD). Quedan 12,3 M de acciones en ese programa [2][3].
- **Pagos en acciones:** 13,9 % de las ventas (inflado por 116 M únicos de la compra de Eigen AI); por debajo del 15 % de la alerta [1].
- **Convertibles:** 14.250 M emitidos desde jun-2025, con conversión entre 51 y 325 USD: si la acción sube, diluyen; si baja, son deuda a devolver en 2029-2034 [3][4].

## 8. Dirección y ejecución

- **Dirección (4/5):** fundador con una gran participación de control (acciones de clase B), equipo técnico de Yandex. Ha financiado el crecimiento con habilidad y a precios altos (acciones a 223,6 USD, convertibles a 313-325 USD). En contra: una dilución fuerte y ventas de directivos de 423 M en 12 meses, casi todas por planes 10b5-1 o para pagar impuestos; el fundador solo ha vendido para impuestos [18].
- **Historial (4/5):** cumplió la guía de ARR de 2025 y ha entregado a Microsoft todos los tramos a tiempo; tropezó en ventas en el 3T25 [2][19].

## 9. Valoración

| Escenario | Ventas jul-2027 a jun-2028 (M) | EV/ventas | Precio | Rentabilidad |
|---|---|---|---|---|
| Bajista (25 %) | 2.211 | 3,4 | 13,1 | −92,3 % |
| Base (50 %) | 3.274 | 5,6 | 40,9 | −76,0 % |
| Alcista (25 %) | 3.757 | 8,7 | 77,5 | −54,5 % |
| **Ponderado** | | | **43,1** | **−74,7 %** |

- **Por qué sale tan bajo.** La regla mecánica (igual para todas, como en el backtest) parte como mucho de un 60 % de crecimiento, que decae: 1.355 M × 1,60 × 1,51 = 3.274 M. El consenso para esa ventana ronda los 14.800 M y la cartera ya firmada da ≈ 13.500 M en los 24 meses a jun-2028 [3][10][11]. El método está escrito así a propósito: en el backtest, los fracasos con crecimientos de más del 60 % (Zoom, Peloton) se parecían en su pico a esto. La prueba de robustez lo marca (G3) como unidades distintas; no lo son: es la diferencia entre la regla y el contrato.
- **Contraste, sin el tope** (cálculo propio, no decide): con las ventas del analista (bajista 9.000, base 13.000, alcista 16.000 M) y los mismos múltiplos, el objetivo sería ≈ 195 USD (ponderada +14,6 %, base +5,5 %, bajista −57,6 %, alcista +105 %). Tampoco compraría: EV/beneficio bruto de 42,5 (tope 35) y bajista peor que −50 %. Pasaría ambos filtros por debajo de unos 142 USD.
- **Múltiplos:** EV de 55.213 M; 8,0 veces las ventas de los 12 meses siguientes (6.875 M), frente a una mediana de 8,7 desde que volvió a cotizar (oct-2024) y 5-6 veces CoreWeave e IREN (aproximado) [12].
- **Consenso:** objetivo medio 283,6 USD (mediana 302; rango 84-410), 15 de 22 analistas en Comprar [9]. El mercado se fía del contrato; el método, no del todo.
- **DCF inverso** (aproximado): el precio pide crecer un ~45 % al año durante 10 años desde las ventas de hoy.

## 10. Foros y sentimiento

- **StockTwits (20-oct):** 10 alcistas y 4 bajistas de 30 mensajes; muchos «compro en el suelo de 163 USD», y varios recuerdan que se mueve «en bloque con CoreWeave» y no por su propia historia [15].
- **Prensa y análisis:** en octubre domina el miedo a la deuda de CoreWeave (bonos al 15-16 %), el aviso de Gartner y la duda de si sobra capacidad [13][14]; los análisis independientes (Seeking Alpha, TIKR) defienden que el balance de Nebius es mejor que el de CoreWeave y que cotiza a ~6 veces las ventas siguientes [13][16].
- **Posiciones cortas** del 19,5 % del capital flotante [9]. **Reddit** no accesible desde aquí y **sin hilo en Rankia**: laguna.
- **Contraste con los datos:** el sentimiento ha girado a negativo, pero los datos del 2T26 (guía reafirmada, contratos nuevos) no cambiaron. No hay euforia: el riesgo no es la burbuja de la acción sino la del sector.

## 10 bis. Precio y noticias antes de decidir

**Movimiento (19-oct):** 1 m −23,8 %, 3 m −21,5 %, 6 m +7,0 %, 12 m +38,4 %; −40,6 % desde el máximo de 286,69 USD (18-jun) y +130,5 % sobre el mínimo de 73,87 (5-feb); 2,4 % bajo la media de 200 sesiones; tendencia lateral; volatilidad del 118 %. Aviso P3 (caída fuerte en un mes), con causa explicada abajo [6].

| Periodo | Movimiento | Causa | Veredicto |
|---|---|---|---|
| nov-2025 | −27,5 % | 3T25 por debajo de lo esperado y venta de valores de IA | no cambia |
| mar-abr-2026 | +33 % | NVIDIA invierte 2.000 M; contrato con Meta de hasta 27.000 M | no cambia |
| may-2026 | +67 % | 1T26 (+684 %) y entrada en el Nasdaq-100 | no cambia |
| jul-2026 | −31 % | Recogida de beneficios tras +290 % y caída del sector | no cambia |
| ago-2026 | +8 % | +39 % con el 2T26 y −21 % por los convertibles de 5.750 M | no cambia |
| oct-2026 | −28 % | Contagio de CoreWeave, aviso de Gartner y tipos; sin noticia propia | no cambia |

| Fecha | Tipo | Hecho | Veredicto |
|---|---|---|---|
| 22-oct (sin confirmar) | Resultados | 3T26; consenso de ventas ≈ 905 M. Otros calendarios dan el 10-nov | no cambia |
| 16-oct | Rumor | −12 % por la deuda de CoreWeave; Nebius tiene más caja que deuda | no cambia |
| 14-oct | Rumor | Gartner sobre las «neoclouds» | no cambia |
| 7-oct | Recomendación | Rosenblatt Comprar, 304 USD; media 283,6 | no cambia |
| 5-oct | Directivos | COO vende 117,8 M por plan 10b5-1; 423 M en 12 meses | no cambia |
| 1-oct | Compra | Inferize | no cambia |
| 8-sep | Contrato | Palantir, socio preferente de IA soberana | no cambia |
| 24-ago | Convertible | 5.750 M y canje de 800 M por 15,8 M de acciones (ya contados); quedan 12,3 M de acciones a la venta en el mercado | no cambia |
| 20-jul | Accionista | NVIDIA declara el 9,3 % | no cambia |
| 17-jul | Deuda | Crédito garantizado de 775 M | no cambia |

**Veredicto global: no cambia.** La caída es de sector; no hay colocación anunciada ni decisión con fecha. Los resultados no aplazan nada (regla 11). La necesidad de financiar 2027 es un riesgo continuo, no un hecho pendiente.

## 11. Riesgos y qué rompería la tesis

- **Alerta del motor: dos clientes suman el 47 % de las ventas** (C 26 % y D 21 % en el 1S26; tres, el 59 % en el 2T26) y la cartera contratada es sobre todo de Microsoft y Meta [3]. Si uno no renueva o construye lo suyo, el agujero es enorme.
- **Capital:** 20.000-25.000 M de inversión este año y más de 1 GW al año desde 2027; depende de que sigan abiertos los mercados de convertibles y deuda. El caso CoreWeave (bonos al 16 %) muestra lo rápido que se cierran [10][13].
- **Obsolescencia y precio por GPU:** amortización a 5 años con generaciones de 12-18 meses; el precio por MW de los contratos subió en 2026, pero puede bajar si sobra capacidad.
- **Riesgo de IA (ciclo):** el negocio entero es el gasto en IA; una pausa de los laboratorios (muchos sin beneficios) o de los hiperescaladores lo golpea antes que a nadie. Gartner: 3,5 billones expuestos a deterioro [14].
- **Ejecución física:** potencia, obras y equipos a tiempo (Meta desde principios de 2027).
- **Dilución:** +13,6 % en 12 meses y convertibles que convierten entre 51 y 325 USD.
- **Gobierno:** control del fundador con acciones de voto reforzado; historia de Yandex.
- **Señales de venta concretas** (si se tuviera): un cliente grande que cancela o recorta; recorte de la guía de ARR de 2026; una financiación cara (cupón de más del 8-10 %) o una ampliación con descuento; impago o deterioro de las GPU.

## 12. Catalizadores con fecha

- **3T26:** fecha sin confirmar (22-oct según Nasdaq y FactSet; 10-11 nov según otros). Clave: ventas frente a 905 M, ARR camino de 7.000-9.000 M y la guía de inversión.
- **Final de 2026:** 800 MW-1 GW conectados, 5 GW contratados, ARR de 7.000-9.000 M [2].
- **Principios de 2027:** primera capacidad de Meta con Vera Rubin [4].
- **4T26-1T27:** nuevas financiaciones (créditos garantizados sobre los contratos de Microsoft y Meta) [7].

## 13. Encaje en cartera

- **No entra.** Señal robusta Vender / no comprar (las cinco variantes); compra hasta 26,20 USD con la regla, muy lejos de los 170,24 de hoy.
- El bolsillo growth tiene tope del 20 % de la cartera; esta no ocupa sitio. Las compras growth que cumplen hoy son las que da el escáner diario (`robustez-growth.mjs --precios`).
- Si se quisiera exposición a la nube de IA pese al método, el contraste del apartado 9 dice que ni con las ventas del contrato pasaría los filtros por encima de ~142 USD; y lo prudente sería una posición pequeña, entera de una vez, sabiendo que el bajista es de más del −50 %.

## 14. Puntuación

| Bloque | Puntos | Máximo |
|---|---|---|
| A. Crecimiento | 16,7 | 25 |
| B. Mercado y tecnología | 14,7 | 20 |
| C. Cambio de tendencia (5 de 8 señales) | 12,5 | 20 |
| D. Economía unitaria | 6,0 | 15 |
| E. Caja y dilución | 3,0 | 10 |
| F. Ejecución y dirección | 8,0 | 10 |
| **Total** | **60,8** | **100** |

Robustez (`robustez-growth.mjs --precios`, precio de hoy 170,24 USD del 19-oct): **SÓLIDA, señal robusta Vender**. Variantes: v11, v7, pesos 25/50/25 y 35/50/15 y precio de hoy, todas Vender. Avisos: G2 (el objetivo se deja fijo al revisar el precio), G3 (ventas del analista muy por encima de la mecánica: explicado en el apartado 9), G6 (bajista del −92 %) y P3 (caída del mes, explicada en 10 bis).

## Fuentes

[1] Nebius, notas de resultados del 2T26 (12-ago-2026), 1T26, 4T25 y 3T25, 6-K ex. 99.1 (SEC): ventas, costes, flujos, balance y acciones.
[2] Nebius, cartas a los accionistas del 2T26, 1T26 y 4T25 (6-K ex. 99.2): ARR, guía 2026, márgenes, cobros anticipados, potencia, venta de acciones en el mercado, amortización a 5 años.
[3] Nebius, estados financieros intermedios del 1S26 (6-K ex. 99.2, 12-ago-2026): clientes, cartera contratada de 37.490,6 M, convertibles, warrants de NVIDIA.
[4] Nebius, 6-K de 2026: NVIDIA (11-mar), Meta (16-mar), convertibles (20-mar, 19 y 24-ago), Eigen AI, Palantir (8-sep), Inferize (1-oct).
[5] Nebius, 20-F de 2025 (30-abr-2026): convertibles de 2025 y contrato con Microsoft.
[6] Yahoo Finance vía `movimiento.mjs` (cierre del 19-oct-2026): NBIS, QQQ y CRWV.
[7] Nebius, 6-K del 17-jul-2026: crédito garantizado de 775 M.
[8] Quartr, Blockspace y Finsee: conferencia del 2T26 (guía e inversión de 20.000-25.000 M).
[9] StockAnalysis (7 y 20-oct-2026): capitalización, cortos, consenso de 2026 y objetivos.
[10] TIKR (28-jun y 17-oct-2026): consenso de 2027-2028, FCF, deuda neta prevista, 3T26.
[11] TickFlow y FX Leaders (oct-2026): consenso por trimestres y objetivos de BNP Exane, Rosenblatt, Citi y DA Davidson.
[12] Cálculo propio: EV/ventas de los 4 trimestres siguientes desde oct-2024 (`notas/multiplos.txt`).
[13] TIKR, FX Leaders, 24/7 Wall St. y GuruFocus (14-19 oct-2026): caídas de octubre, CoreWeave y fecha de resultados.
[14] Gartner, nota de prensa del 14-oct-2026.
[15] StockTwits, flujo público de NBIS (20-oct-2026).
[16] Seeking Alpha (titulares de oct-2026).
[17] SEC: 13G de NVIDIA (20-jul-2026) y 13G/A de Goldman Sachs (7-oct-2026).
[18] SEC: 46 formularios 4 (oct-2025 a oct-2026), sumados.
[19] Zacks y Motley Fool (nov-2025): resultados del 3T25.
[20] Schaeffer's Research y Webull (may-jun 2026).
[21] Benzinga y Motley Fool (jul-ago 2026).
[22] Benzinga (previsiones, oct-2026).

# DoorDash (DASH): análisis growth, 14-oct-2026

**Señal (método v7): Mantener, en vigilancia** · Puntuación 63,8/100 · Señales de cambio de tendencia 3/8 · EV/beneficio bruto 8,8x
Precio 193,09 USD (cierre del 13-oct) · Objetivo 12 m 201,5 USD (ponderada +4,4 %, base +7,2 %, bajista −44,9 %, alcista +48,1 %) · Compra hasta 191,9 USD
Peso orientativo: no entra. Le falta rentabilidad (ponderada < 5 %); el bolsillo growth está lleno y no supera a ninguna de las cinco.

> **Calculado con el método v7** (`verticales/growth/metodo.md`). **Qué se toma como ventas**: los ingresos GAAP, es decir, lo que DoorDash se queda de cada pedido (comisión del comercio y tarifas del cliente, ya restado lo que paga a repartidores y comercios), que son el 13,5 % del GOV (valor bruto de los pedidos). **El crecimiento es orgánico, sin Deliveroo** (comprada el 2-oct-2025): la empresa publica sus ingresos sin Deliveroo. Con las cifras publicadas (+33,6 % en 12 meses), la regla proyectaría dos años al +32 % un salto que no se repite desde el 4T26. Las ventas de partida son las publicadas de 12 meses (15.891 M USD, con 3 trimestres de Deliveroo). Ventas del año objetivo por la regla mecánica: 23.778 M en el base, partiendo de +24,2 %. Múltiplos: 2,3x / 3,8x / 4,9x EV/ventas NTM.
>
> **Candidata v9: el mismo resultado** (Mantener en vigilancia, +4,4 %). DoorDash solo guía el trimestre siguiente, y en GOV y EBITDA, no en ingresos; por la regla de la plantilla, `guia_12m_pct` = null y v9 = v7. **Extrapolando a 12 meses la guía del 3T26 pasada a ventas** (+20,5 % orgánico, más su batida media de +1,7 pp = 22,2 %), sale **ponderada +1,4 %**, base +4,1 %, bajista −45,7 % y compra hasta **186,5 USD**: también Mantener (en vigilancia).
>
> **Precio actual** (regla del usuario): hoy, 14-oct, a las **16:39 UTC, 181,31 USD (−6,1 %)** (Nasdaq; Yahoo da 181,23 a las 16:38 UTC). Es un día de caída general (Nasdaq-100 −1,7 %, Uber −3,2 %, Grab −4,2 %), sin noticia propia confirmada. **Con el mismo `datos.json` y solo el precio cambiado** (la convención de `cartera-growth.md`): ponderada **+11,1 %**, base +14,1 %, bajista −41,3 %, es decir **Comprar (baja)** con v7, y +8,0 % (Comprar baja) con la guía extrapolada. **Pero** si también se rebaja el múltiplo de hoy a 4,0x (el que da ese precio), la ponderada vuelve a +4,4 % y el precio máximo a 180,4 USD. El Comprar de hoy sale solo de una sesión a la baja (sección 13).

## 1. La tesis en cinco líneas

1. DoorDash es la plataforma de reparto local líder de EE. UU. (restaurantes y, cada vez más, alimentación y tiendas), con Wolt y, desde octubre de 2025, Deliveroo fuera de EE. UU. (~40 países). Factura **15.891 M USD en 12 meses** y crece **+24 % orgánico** (+36 % publicado con Deliveroo) a una escala de ~130.000 M USD de GOV anual. Genera **2.139 M USD de FCF** (13,5 % de las ventas).
2. **No es comercio minorista**: no compra ni vende mercancía (salvo DashMart, pequeño, de memoria). Cobra una comisión por conectar comercios, clientes y repartidores y por la logística. Es una plataforma de servicios, como Uber Eats.
3. La percepción está rota: **−29 % en 12 meses**. Le pesan cuatro golpes: el plan de inversión de noviembre de 2025 (−17 % en un día), la caída hasta 146,6 USD en marzo, el miedo a los agentes de IA en septiembre (−16 % en un mes) y la consolidación de Uber (Delivery Hero, ezCater). Solo **3 de 8 señales**.
4. El negocio no está roto: cumple la guía todos los trimestres, el EBITDA del 2T batió su rango y el FCF sube un 25 %. **Pero no está barato para lo que crece**: 4,3x ventas NTM, ~26x EBITDA ajustado y PER GAAP ~100. La regla deja la ponderada en **+4,4 %**, a 0,6 puntos del listón del 5 %, con un **bajista de −45 %** (asimetría de 1,1).
5. Conclusión: **Mantener en vigilancia; no entra en un bolsillo lleno**. Además duplica la exposición que el usuario ya tiene en **Uber** (reparto, ciclo, regulación de repartidores, autónomos), y el usuario descartó Duolingo justo por miedo al ciclo y a la IA. Se revisa con los resultados del 3T (4-nov).

## 2. Negocio y tecnología

- **Marketplaces** (DoorDash en EE. UU. y otros países, Wolt en el norte y el este de Europa, Deliveroo en Reino Unido, Francia, Italia, Oriente Medio y Asia): el cliente pide y un repartidor independiente («Dasher») recoge y entrega. DoorDash cobra comisión al comercio (en torno al 15-30 %, de memoria) y tarifas de envío y servicio al cliente. Paga al repartidor. Le queda el **13,5 % del GOV** como ingresos [1].
- **Suscripciones**: DashPass, Wolt+ y Deliveroo Plus, más de **35 millones de socios** a final de 2025. Bajan las tarifas a cambio de frecuencia: en el 2T26 los socios hicieron ~75 % de los pedidos de alimentación y tiendas en EE. UU. [1][2].
- **Plataforma para comercios** (Commerce Platform): Drive (reparto para el canal propio del comercio), pedidos online propios (150.000 comercios, +40 %), SevenRooms (reservas y CRM de restauración, comprada en 2025; locales nuevos +100 %), publicidad (Symbiosys) [1].
- **Tecnología 3/5**: logística muy optimizada (asignación, rutas, predicción) con datos de ~1.000 M de pedidos por trimestre, más efecto red local (más comercios atraen más clientes y repartidores, y bajan los tiempos). Pero **Uber Eats lo replica** en casi todos los mercados: es un buen producto con alternativas. Lo nuevo es el asistente «Ask», el agente de pedidos en Mensajes de Apple (30-sep), dd-cli para agentes de IA, el robot de reparto **Dot** y DoorDash Air (drones con licencia FAA Part 135) [1][10].
- **Posición 5/5**: líder claro en EE. UU. (en torno a dos tercios del reparto de comida, de memoria [13]), con crecimiento de nuevos clientes y de la frecuencia de las cohortes antiguas. Fuera de EE. UU. es nº 1 o 2 en la mayoría de países de Wolt y Deliveroo.

## 3. Crecimiento

| Trimestre | Pedidos (M) | GOV (M USD) | Ingresos (M USD) | Crec. publicado | Crec. sin Deliveroo | Beneficio bruto GAAP | EBITDA ajustado | FCF |
|---|---|---|---|---|---|---|---|---|
| 2T25 | 761 | 24.244 | 3.284 | 24,9 % | 24,9 % | 1.608 | 655 | 355 |
| 3T25 | 776 | 25.015 | 3.446 | 27,3 % | 27,3 % | 1.689 | 754 | 723 |
| 4T25 | 903 | 29.683 | 3.955 | 37,7 % | 25,6 % | 1.911 | 780 | 254 |
| 1T26 | 933 | 31.604 | 4.036 | 33,1 % | 21,2 % | 1.944 | 754 | 420 |
| 2T26 | 970 | 33.078 | 4.454 | 35,6 % | 24,0 % | 2.223 | 914 | 742 |
| Guía 3T26 | — | 33.000-34.000 | ~4.520 (cálculo) | ~+31 % | ~+20 % | — | 950-1.100 | — |

Fuentes: [1][2][3]. Ingresos sin Deliveroo: 3.608 (4T25), 3.674 (1T26), 4.071 (2T26) M USD.

| Ejercicio | Ingresos (M USD) | Crec. | FCF (M USD) |
|---|---|---|---|
| 2023 | 8.635 | — | — |
| 2024 | 10.722 | 24,2 % | 1.802 |
| 2025 | 13.717 | 27,9 % (24,7 % sin Deliveroo) | 1.826 |

- **12 meses** (3T25-2T26): **15.891 M USD**; **+24,4 % sin Deliveroo** (14.799 frente a 11.895 M) y +33,6 % publicado. **CAGR propio a 2 años: 24,1 %** orgánico (28,6 % publicado). **Aceleración: −0,8 pp** (+24,0 % frente a una media de +24,8 % en los cuatro anteriores; con Deliveroo saldría +4,9 pp, un espejismo).
- **Motor del crecimiento**: los pedidos sin Deliveroo crecen un +17 % (nuevos clientes y frecuencia) y el GOV un +23 %, por el ticket medio y por la alimentación y las tiendas. El restaurante de EE. UU. aceleró «ligeramente» en el 2T y crece como en 2022.
- **Retención neta**: no aplica ni se publica (`nrr_pct` = null). Lo que da la empresa son cohortes: la frecuencia de pedido de las cohortes antiguas sigue subiendo.
- **Guía**: **solo trimestral, en GOV y EBITDA ajustado**; no guía ingresos ni el año. **Paso a ventas**: 3T26 GOV 33.500 M (punto medio) × 13,5 % = ~4.520 M de ingresos (+31 % publicado). Sin Deliveroo (~3.300 M de GOV por trimestre), el GOV orgánico guiado crece ~+20,7 %. Los ingresos orgánicos han crecido al ritmo del GOV (±1-3 pp), así que la guía en ventas ≈ **+20,5 % orgánico**: un frenazo frente al +24 % del 2T.
- **Batida sobre la guía** (`exceso_guia_pp` = 1,7): GOV real frente al punto medio guiado, en puntos de crecimiento: +2,8 (3T25), +2,3 (4T25), +0,9 (1T26) y +0,7 (2T26). **Mengua**: en febrero la empresa avisó de que, después de batir siempre el máximo del rango, su plan ya lo situaba dentro, y así fue en el 1T y el 2T [2].

## 4. Mercado y competencia

- **Mercado alcanzable: ~100.000 M USD de ingresos en 2028** (estimación propia de memoria [13]): reparto local de restaurantes, alimentación y tiendas en sus ~40 países, a una comisión neta del ~13 % sobre un GOV posible de ~750.000 M. **Penetración: 15,9 %**. Es la cifra más blanda del informe; con un mercado de 60.000 M la penetración sería del 26 % y la puntuación bajaría 1,3 puntos.
- **Rivales**: en EE. UU., **Uber Eats** (nº 2, que el usuario tiene en cartera vía Uber), Instacart en alimentación, Amazon (alimentación en el día, Grubhub con Prime en el pasado) y los canales propios de las cadenas. Fuera, Uber + **Delivery Hero** (OPA de ~14.800 M USD, cierre en el 2S27 [8]), Just Eat Takeaway (de Prosus) y Glovo. En el 10-Q, DoorDash cita a Amazon, Uber Eats, Prosus y Delivery Hero [4].
- **Por qué gana**: densidad en los suburbios y ciudades medianas de EE. UU. (más rentables que los grandes centros), DashPass y una ejecución operativa muy disciplinada. La compra de Deliveroo le da escala internacional para repartir el coste de la plataforma tecnológica única (1S27).
- **Comparables** (EV/ventas de 12 meses, 8-oct [8]): Instacart 2,45x, Grab 2,96x, Lyft 0,74x y Uber ~3x (de memoria). Mediana tomada: **2,7x**, frente a 5,1x de DoorDash. La prima se explica porque crece el doble que Uber en reparto y en el EBITDA, pero deja poco margen.

### Ciclo de consumo (la preocupación del usuario)

**DoorDash es más cíclica que el software y algo más que Toast.** Pedir a domicilio es un gasto discrecional, de conveniencia, con tarifas altas (comisión + envío + servicio + propina). En una recesión, el cliente reduce primero la frecuencia y el tamaño del pedido, y la empresa lo dice en cada guía: «el gasto del consumidor podría deteriorarse» [1]. Sensibilidades concretas:
- **Precio de la gasolina**: en el 2T26 financió un «programa de alivio de la gasolina» a los repartidores de más de 50 M USD [2]. Un repunte del petróleo sube el coste por pedido.
- **Seguros y costes regulados**: suben cada año (aviso del 4T).
- **Atenuantes**: (1) en 2022-2023, con inflación alta y tipos al alza, siguió creciendo por encima del 20 % (de memoria); (2) el crecimiento viene de clientes nuevos y de la frecuencia de los socios de DashPass, que crece con la antigüedad de la cohorte; (3) la alimentación y las tiendas (~30 % de los usuarios mensuales de EE. UU.) son menos discrecionales; (4) es muy internacional (40 países), lo que diversifica el ciclo de EE. UU.
- **Comparación con Toast**: Toast cobra sobre todo el gasto del restaurante (también en el local) y crece abriendo locales, así que una recesión la frenaría hacia +15 %. DoorDash depende del gasto más prescindible (la conveniencia), pero con más palancas de frecuencia. **Conclusión: riesgo cíclico medio-alto.** El bajista de la regla (−45 %, volver a 2,3x ventas, cerca del mínimo de 3 años de 2,8x) es justo lo que pasó en 2022 y en marzo de 2026 (−46 % desde el máximo).

### Regulación laboral de los repartidores

- **EE. UU.**: la Proposición 22 de California mantiene a los repartidores como independientes con mínimos de pago. Nueva York exige **22,13 USD/hora** antes de propinas (abr-2026), y DoorDash subió hasta 0,50 USD por pedido en tarifas; en septiembre reconoció pagos atrasados a repartidores de NY [10]. Seattle tiene un mínimo por encargo. Cada nuevo mínimo encarece el pedido y baja la demanda (lo dice el 10-Q [4]).
- **Europa**: la **Directiva europea de trabajo en plataformas** (en vigor desde dic-2024, transposición nacional hasta dic-2026) puede presumir la relación laboral. El 10-Q lo señala como riesgo para su modelo de independientes en el Espacio Económico Europeo [4]: afecta a Wolt y a la parte europea de Deliveroo (Francia, Italia, Bélgica…). Reino Unido (el mayor mercado de Deliveroo) no está en la UE y su Supremo avaló en 2023 a los repartidores autónomos de Deliveroo (de memoria).
- **Australia**: orden de estándares mínimos desde el 17-ago-2026 [10].
- **Competencia**: Uber demandó a DoorDash en 2025 por prácticas anticompetitivas (exclusivas con comercios) [4]. En marzo de 2026, un proyecto de ley del Senado de EE. UU. contra los acuerdos especiales con grandes cadenas le costó un −4 % en un día [10].
- **Lectura**: es un riesgo de costes continuo, no de existencia. La empresa lo traslada a precios y tiene escala para absorberlo mejor que los rivales pequeños, pero es la misma exposición que ya tiene el usuario con Uber.

### La compra de Deliveroo

- **Precio**: 3.724 M USD en caja (2-oct-2025), con 1.987 M de fondo de comercio y ~450 M al año de amortización de intangibles, que hunde el beneficio GAAP [4].
- **Lo que aporta**: ~380 M USD de ingresos por trimestre (+10 % al grupo), ~200 M de EBITDA en 2026 (lo que se esperaba al comprarla) y aceleración de pedidos y usuarios en Reino Unido, Francia e Italia; en el 2T superó lo previsto [1][2].
- **Riesgos**: integración en la plataforma tecnológica única (1S27); Reino Unido y Francia son mercados maduros con Uber Eats y Just Eat. La empresa invierte para recuperar cuota (por eso Deliveroo aportó menos de 25 M de EBITDA en el 1T26). Y **el crecimiento publicado se inflará hasta el 3T26 y caerá de golpe al orgánico (~+20 %) en el 4T26**: el mercado lo sabe, pero los titulares de «crecimiento que frena» llegarán en febrero de 2027.
- **Valoración**: compra razonable (~1,5x ventas, muy por debajo de DoorDash), financiada sin ampliar capital (bonos convertibles de 2.750 M al 0 % con conversión a 292 USD). Suma diversificación geográfica (menos ciclo de EE. UU.), pero también regulación europea.

### Riesgo de IA y vehículos autónomos

- **Agentes de IA** (el miedo de septiembre): si ChatGPT, Gemini o Siri piden directamente al restaurante, DoorDash podría perder la relación con el cliente y la comisión de «descubrimiento». **Defensa**: el valor está en la ejecución física (repartidor, tiempos, reclamaciones), no en el menú. DoorDash se ofrece como la capa de pedidos de esos agentes: app en ChatGPT, agente en Mensajes de Apple, dd-cli. Tony Xu los compara con «los nuevos Google»: un canal de captación, no un sustituto [10]. **Riesgo real a medio plazo**: si el agente es el canal, se lleva parte del margen, como Google con las agencias de viajes.
- **Autónomos**: robots de acera, drones y coches sin conductor (Waymo, Tesla, Zoox) pueden **bajar el coste por pedido**, que hoy es sobre todo el repartidor (la mayor partida del coste). DoorDash invierte (Dot, DoorDash Air) y prevé que Dot haga «un porcentaje de un dígito alto» de los pedidos en su mayor mercado de prueba a final de año [1]. Pero el autónomo **también baja la barrera de entrada**: Amazon, Waymo o Uber podrían repartir sin red de repartidores. En reparto, la densidad de pedidos (donde DoorDash es líder) sigue siendo la ventaja: el autónomo hace más rentable al que más pedidos concentra. **Pesa menos que en Uber** (en reparto el autónomo sustituye un coste; en viajes amenaza el producto), pero suma incertidumbre a 5-10 años.

## 5. Cambio de tendencia

| # | Señal | Sí/No | Prueba | Fuente |
|---|---|---|---|---|
| 1 | Revisiones al alza | No | Mixtas. El EBITDA del 2T batió la guía y la del 3T queda por encima del consenso; BofA sube a 275 y Wells Fargo a 230 (5-oct). Pero Cantor baja de 260 a 240 (12-oct) y el consenso de precio objetivo cae de ~262 (feb) a ~259 (jul). | [1][9] |
| 2 | Precio sobre la media de 200 sesiones | No | 193,09 sobre 185,42 (+4 %), pero la media sigue bajando: 221 (abr) → 196 (jul) → 185 (oct). Hoy, a 181, está por debajo. | [6] |
| 3 | Fuerza relativa a 6 meses | Sí (por la mínima) | +21,0 % frente a +20,4 % del Nasdaq-100 y +13,3 % del S&P 500. Al precio de hoy dejaría de cumplirse (+13,6 % frente a ~+18 %). | [6] |
| 4 | Mejora del múltiplo | Sí | EV/ventas NTM de ~3,4x (146,60 USD, 27-mar) a ~4,3x (+28 %), por debajo de su mediana de 3 años (~4,6x). | [6][12] |
| 5 | Inflexión operativa | No | Margen operativo GAAP de 12 meses del 4,5 %, igual que hace un año (amortización de Deliveroo). FCF en alza (+25 %), pero ya era positivo. | [1][3] |
| 6 | Sentimiento mejorando | No | Empeora: −16 % en septiembre por los agentes de IA, la consolidación de Uber, investigaciones de despachos de abogados y la demanda por la tarifa de DashPass. | [9][10][11] |
| 7 | Compras de directivos o institucionales | No | 144 ventas (planes de los fundadores Xu y Tang, directivos) frente a dos compras de 20 acciones de un consejero. | [5] |
| 8 | Catalizador nuevo | Sí | Resultados del 3T el 4-nov; la alimentación y las tiendas, rentables en el 2S26; plataforma única en el 1S27; Dot y drones; agentes de pedidos. | [1][2][10] |

**Euforia: no.** Ha caído un −29 % en 12 meses y cotiza a 8,8x el beneficio bruto NTM.

## 6. Economía unitaria y camino a la rentabilidad

- **Margen bruto GAAP: 48,9 %** en 12 meses (7.767 / 15.891). Es el que publica la empresa: ingresos − coste de los ingresos − amortización asociada. Sobre el GOV, 6,7 % en el 2T.
- **FCF de 12 meses: 2.139 M USD**, el **13,5 % de las ventas** (1.713 M un año antes). Aviso de la empresa: en 2026, el calendario de pagos a comercios de fin de año restará entre 700 y 800 M al FCF publicado [1]. **Ojo**: el FCF no resta los pagos en acciones (~1.110 M en 12 meses). Restándolos, el FCF «del accionista» es ~1.000 M (6-7 % de las ventas).
- **Regla del 40: 24,4 + 13,5 = 37,9** (2 de 5 puntos).
- **Rentabilidad**: **FCF creciente**. El beneficio neto GAAP de 12 meses es de 841 M (5,3 % de las ventas), a la baja por la amortización de Deliveroo. El EBITDA ajustado de 12 meses es de 3.202 M (+30 %; 2,7 % del GOV).
- **Apalancamiento operativo**: limitado a propósito. La dirección reinvierte (plataforma global, autónomos, internacional, alimentación); en el 2T, la I+D crece +52 % y los gastos generales +39 %, por encima de los ingresos (+36 %). El EBITDA sobre GOV sube despacio (2,7 % → 2,8 %).

## 7. Caja, deuda y dilución

- **Caja e inversiones: 6.216 M USD** a 30-jun (4.424 de caja, 923 a corto y 869 a largo plazo); sin contar 308 M restringidos ni 513 M en procesadores de pago [4].
- **Deuda: 2.750 M** en bonos convertibles al 0 % con vencimiento en 2030 (conversión a 291,97 USD, muy por encima del precio, con coberturas compradas). Línea de crédito sin disponer. **Caja neta ~3.470 M.** Los ~5.700 M de gastos devengados incluyen lo que se debe a comercios y repartidores: el circulante financia el negocio.
- **Pista**: FCF positivo.
- **Acciones**: 433,3 M (408,9 M clase A y 24,3 M clase B) a 30-jun, más 26,7 M de RSU (9,3 M son el plan del CEO, que depende de precios de la acción) y 2,1 M de opciones. **Diluidas tomadas: ~453 M** (sin el plan del CEO).
- **Dilución: ~0,2 %** (diluidas medias 439,3 M frente a 438,4 M un año antes), **gracias a la recompra**: 1.049 M USD (6,8 M acciones) en lo que va de 2026, y quedan 3.951 M autorizados. Sin recompra, la emisión bruta (~2-3 % al año) diluiría.
- **Pagos en acciones: ~1.110 M en 12 meses, el 7,0 % de las ventas** (guía para 2026: 1.200-1.300 M). Por debajo del 15 % del método, pero alto en dólares: se come la mitad del FCF.

## 8. Dirección y ejecución

- **Historial (5/5)**: ha cumplido o batido la guía de GOV y de EBITDA en los ocho últimos trimestres comprobados en la SEC. El EBITDA del 2T26 (914 M) superó el máximo del rango (870 M) [1][2]. **Matiz**: la batida de GOV mengua (de +2-3 pp a +0,7 pp) y la empresa ya lo avisó.
- **Dirección (3/5)**: Tony Xu, cofundador y CEO, con el control de voto de las acciones clase B junto a los otros fundadores [13]. A favor: disciplina operativa, compras sensatas (Wolt, Deliveroo, SevenRooms) y recompra. En contra: **traslado de la sede legal a Nevada** (18-sep-2026), aprobado por consentimiento escrito de los accionistas de control sin junta, que recorta derechos del minoritario [5]. También ventas continuas de los fundadores (Xu y Tang, por planes 10b5-1), el plan del CEO de 10,4 M RSU por precio, pagos en acciones altos y un plan de inversión de noviembre de 2025 que sorprendió al mercado (−17 % en un día [10]).

## 9. Valoración

**Ejercicio objetivo**: los 12 meses a jun-2028, como en el backtest. **Métrica: EV/ventas NTM.** DoorDash ya es rentable en EBITDA, pero su margen sobre ventas aún sube y el EV/EBITDA (~26x de 12 meses, ~21x NTM) mezclaría el esfuerzo de inversión. El filtro de compra es el **EV/beneficio bruto**.

- **EV de hoy**: 193,09 × 453 + 2.750 − 6.216 = **84.004 M USD** [12]. Capitalización ~87.500 M.
- **Ventas NTM: ~19.535 M (+23 %)**: el 3T26 por la guía (con Deliveroo frente a un 3T25 sin él) y el resto al +20-22 % orgánico. **EV/ventas NTM: 4,3x. EV/beneficio bruto NTM: 8,8x** (tope 35x). PER GAAP de 12 meses: ~100 (beneficio por acción de 1,92 USD; lo deprime la amortización de Deliveroo).
- **Mediana de 3 años: ~4,6x** NTM (cierres trimestrales de jun-2023 a jun-2026; máximo 7,2x en sep-2025). **Mínimo: ~2,8x** (jun-2023) [12].
- **Comparables: ~2,7x** (Instacart, Grab, Uber) [8].
- **Desaceleración**: del 23 % NTM al 18 % en el año objetivo → factor 0,88.

| Escenario | Ventas jun-2028 (M USD) | Múltiplo | Precio 12 m | Rentabilidad |
|---|---|---|---|---|
| Bajista (25 %) | 19.638 | 2,3x | 106,4 | −44,9 % |
| Base (50 %) | 23.778 | 3,8x | 206,9 | +7,2 % |
| Alcista (25 %) | 25.545 | 4,9x | 285,9 | +48,1 % |
| **Ponderado (regla v7)** | | | **201,5** | **+4,4 %** |

Acciones dentro de 12 meses: 454 M (+0,2 %); caja de 6.216 M y deuda de 2.750 M (el FCF futuro no se suma, por la regla). **Asimetría: 1,1. Precio máximo de compra: 191,9 USD**, el que da ponderada +5 % (el tope de 35x beneficio bruto estaría en ~746 USD).

**Variantes** (mismo motor, solo cambia lo indicado; las de prueba no se guardan):

| Variante | Partida | Ponderada | Base | Bajista | Señal | Compra hasta |
|---|---|---|---|---|---|---|
| **v7 (vigente), orgánico, cierre 193,09** | 24,2 % | **+4,4 %** | +7,2 % | −44,9 % | **Mantener (vigilancia)** | **191,9** |
| v9 (guía null: solo trimestral) | 24,2 % | +4,4 % | +7,2 % | −44,9 % | Mantener (vigilancia) | 191,9 |
| Guía del 3T extrapolada + batida (22,2 %), cierre | 22,2 % | +1,4 % | +4,1 % | −45,7 % | Mantener (vigilancia) | 186,5 |
| v7 a 181,31 (solo cambia el precio) | 24,2 % | +11,1 % | +14,1 % | −41,3 % | Comprar (baja) | 191,9 |
| Guía extrapolada a 181,31 (solo el precio) | 22,2 % | +8,0 % | +10,9 % | −42,2 % | Comprar (baja) | 186,5 |
| v7 a 181,31 con el múltiplo de hoy (4,0x) | 24,2 % | +4,4 % | +7,2 % | −44,7 % | Mantener (vigilancia) | 180,4 |
| Crecimiento publicado con Deliveroo (no válido) | 31,6 % | +16,0 % | +19,1 % | −41,7 % | Comprar (baja) | 213,3 |
| Probabilidades prudentes 35/50/15 (ciclo) | 24,2 % | −4,9 % | +7,2 % | −44,9 % | Mantener | 174,8 |

**La señal depende de una sesión y de cómo se cuente Deliveroo.** Con el crecimiento publicado saldría Comprar (+16 %), pero sería contar dos años más una compra que ya está en la base. Con el orgánico y la guía, la ponderada está entre +1 % y +4 %.

- **Consenso**: precio objetivo medio de **~259 USD** (29 compra y 9 mantener; foto de julio [9]), muy por encima de nuestro objetivo (201,5). El mercado de analistas proyecta márgenes que la regla no cuenta. Consenso de ventas del año objetivo: no encontrado (null).
- **DCF inverso**: con WACC del 10 %, margen FCF que sube del 13,5 % al 20 % en 10 años y crecimiento terminal del 3 %, el precio descuenta **~11,7 % anual durante 10 años** (15 % con margen final del 15 %; 9 % con el 25 %). Restando los pagos en acciones del FCF, sale ~16 %. Exige más que Toast (~6 %): es razonable para quien crece al 20-24 %, pero no deja margen de seguridad.

## 10. Foros y sentimiento

- **Prensa**: en septiembre, «DoorDash cae un 16 % en un mes» por los agentes de IA que piden directamente (24/7 Wall St.). Uber compra Delivery Hero (jul) y ezCater (catering), lo que «reordena el reparto» (TIKR, Reuters). Despachos de abogados (Scott+Scott) anuncian investigaciones a los consejeros por la caída. Hay una demanda colectiva en California por la tarifa de servicio obligatoria en pedidos «sin envío» de DashPass [10][11].
- **Analistas**: siguen mayoritariamente en compra (29 de 38), pero los objetivos bajan desde feb-2026 (Cantor de 285 a 220-240) y solo hay subidas puntuales (BofA, Wells Fargo) [9].
- **StockTwits** (14-oct): 18.620 seguidores; 4 alcistas y 2 bajistas de 30 mensajes. Dominan las opciones (compra de puts de dic a 180 por 915.000 USD hoy) y las comparaciones con Uber («Uber a 18x PER adelantado, DoorDash a 54x: ¿cuál?»). Hoy, −6 % y «los datos macro arrastran» [11].
- **Reddit (r/stocks, r/investing, r/doordash)**: bloqueado desde aquí. **Laguna.** **Seeking Alpha** y **foros en castellano** (Rankia, Investing.com ES): sin hilos recientes leídos. **Laguna.**
- **Contraste con los datos**: el sentimiento es peor que las cifras (EBITDA récord, FCF +25 %, guía cumplida). Pero el mercado ha dejado de pagar la prima de 2025 (7x ventas) y la ha bajado a la mediana. No hay euforia; hay miedo a la IA y a la competencia.

## 11. Riesgos y qué rompería la tesis

1. **Ciclo de consumo**: gasto discrecional con tarifas altas. Una recesión baja la frecuencia y el ticket; la gasolina y los seguros suben el coste. El bajista (−45 %) es volver a 2,3x ventas.
2. **Agentes de IA**: que el canal de pedidos pase a ChatGPT, Gemini o Siri y se lleve parte de la comisión.
3. **Competencia**: Uber + Delivery Hero fuera de EE. UU. y Uber Eats + ezCater en EE. UU.; Amazon en alimentación.
4. **Regulación laboral**: mínimos de pago (Nueva York, Seattle, Australia) y la directiva europea (dic-2026); demandas por tarifas y propinas.
5. **Integración de Deliveroo** y salto a la baja del crecimiento publicado en el 4T26.
6. **Autónomos**: bajan la barrera de entrada a largo plazo.
7. **Gobierno**: control de los fundadores, traslado a Nevada, pagos en acciones de ~1.200 M al año.

**Señales de venta concretas** (para quien la tenga; aquí, para descartarla):
- GOV orgánico por debajo del +15 % dos trimestres seguidos.
- Primera vez que no cumple la guía trimestral de GOV o de EBITDA.
- EBITDA ajustado sobre GOV a la baja dos trimestres seguidos sin explicación de inversión.
- Pérdida de cuota en EE. UU. frente a Uber Eats (datos de terceros) o una ley de reclasificación laboral en un estado grande o en la UE que la obligue a contratar.

Hoy no hay tesis rota.

## 12. Catalizadores con fecha

| Fecha | Hecho | Sentido |
|---|---|---|
| 4-nov-2026 | Resultados del 3T26 (último trimestre inflado por Deliveroo) y guía del 4T (el primero orgánico) | +/− |
| 2S26 | Economía unitaria positiva en alimentación y tiendas (guiado) | + |
| Dic-2026 | Fin de la transposición de la directiva europea de trabajo en plataformas | − |
| Fin de 2026 | Dot con un porcentaje de un dígito alto de los pedidos de su mayor mercado de prueba | + |
| Feb-2027 | Resultados del 4T26, carta anual y plan de inversión de 2027 (en 2025 provocó un −17 %) | +/− |
| 1S27 | Plataforma tecnológica global única (DoorDash, Wolt y Deliveroo) | + |
| 2S27 | Cierre previsto de la compra de Delivery Hero por Uber | − |

## 13. Encaje en cartera

**Situación** (`MEMORIA.md` e `informes-growth/cartera-growth.md`): el **bolsillo growth está lleno (~20 %)** con Nu, argenx, Shopify, Axon y Snowflake, y la liquidez libre es casi nula. Solo cabe sustituir. Suplentes, por orden: Samsara, Datadog, MongoDB, Zscaler, Dexcom, Toast y Wise.

**Solapamiento con Uber**: el usuario **ya tiene Uber** en la cartera value (~6 %), y Uber Eats es el nº 2 del reparto en EE. UU. y el gran rival de DoorDash fuera (con Delivery Hero). Tener las dos duplica los mismos riesgos: ciclo del consumo discrecional, regulación de repartidores independientes, seguros, agentes de IA y autónomos. No es una cobertura: si a uno le va mejor en cuota, al otro le va peor, pero los dos caen juntos en una recesión o con una ley laboral. Más que un growth nuevo, DoorDash sería **doblar la apuesta por el reparto**.

| Valor | Convicción | Ponderada al precio actual | Bajista | EV/beneficio bruto |
|---|---|---|---|---|
| Shopify | media | +17,7 % | −43 % | 27,7x |
| Snowflake | media | +16,1 % | — | — |
| **DoorDash** | **— (Mantener) / baja a 181,31** | **+4,4 % al cierre; +11,1 % a 181,31 solo cambiando el precio; +4,4 % con el múltiplo de hoy** | **−45 %** | **8,8x** |

**¿Sustituye a alguna? No.**
- Frente a **Shopify** (+17,7 %) y **Snowflake** (+16,1 %), las dos de menor ponderada: incluso en la lectura más favorable de hoy (+11,1 %, convicción baja), DoorDash está 5-7 puntos por debajo, con peor puntuación (63,8 frente a 77,8 de Shopify), solo 3 señales y un bajista igual de profundo. Cambiar no compensa.
- Añade ciclo y solapa con Uber. El usuario descartó Duolingo por miedo al ciclo y a la IA, y DoorDash tiene **las dos cosas**: ciclo de consumo y una amenaza de IA (los agentes de pedidos) que en septiembre le costó un −16 %.

**Puesto**: al precio de corte es **Mantener en vigilancia, no suplente** (junto a HubSpot e Insulet). Si se toma el precio de hoy con la convención de solo cambiar el precio, sería Comprar (baja) con +11,1 % y quedaría **suplente nº 7, detrás de Toast** (mismo ciclo de restauración, pero sin solapar con Uber y a 7,8x el beneficio bruto) **y por delante de Wise** (+5,5 %). Se revisa el 4-nov: pasaría a suplente firme si el GOV orgánico guiado para el 4T26 va por encima del +20 % y la acción sigue por debajo de ~180-186 USD (el precio máximo con la guía).

**Si algún día entrara** (hueco libre y Comprar confirmado): 3,5 % (~1.040 EUR, ~6 acciones), en dos tramos, con límite de 180 USD. **Motivo de negocio**: líder del reparto local de EE. UU. con FCF de 2.100 M que crece +24 % orgánico. **Encaje**: no es comercio minorista (plataforma de servicios con comisión), no es juego y no choca con `MEMORIA.md`, pero solapa con Uber: si entrara, habría que pensar en reducir Uber.

## 14. Puntuación

| Bloque | Puntos | Máx. | Detalle |
|---|---|---|---|
| A. Crecimiento | 15,0 | 25 | Ventas 12 m +24,4 % orgánico (3), CAGR a 2 años 24,1 % (3), aceleración −0,8 pp (3) |
| B. Mercado y tecnología | 13,3 | 20 | Penetración 15,9 % (2), tecnología 3, posición 5 |
| C. Cambio de tendencia | 7,5 | 20 | 3/8 señales, sin euforia |
| D. Economía unitaria | 10,0 | 15 | Margen bruto 48,9 % (3), regla del 40 = 37,9 (2), FCF creciente (5) |
| E. Caja y dilución | 10,0 | 10 | FCF positivo (5), dilución 0,2 % (5) |
| F. Ejecución y dirección | 8,0 | 10 | Historial 5, dirección 3 |
| **Total** | **63,8** | **100** | Señal: **Mantener (en vigilancia)**; ponderada +4,4 % < 5 % |

**Mejoras de método detectadas (para probar con el backtest, sin tocar el motor)**:
1. **Compras grandes (crecimiento inorgánico)**: la regla mecánica toma el crecimiento publicado y proyectaría dos años al +32 % una compra que deja de sumar en un trimestre. Aquí se usaron los crecimientos orgánicos que publica la empresa. Propuesta: un campo `crecimiento.organico` (o `inorganico_pp`) obligatorio cuando una compra pese más del 5 % de las ventas, y que el motor avise si la aceleración es > +5 pp sin él.
2. **Recalcular al precio actual**: el método toma como base «el múltiplo de hoy», así que, si al cambiar el precio también se cambia `multiplo_actual`, la ponderada no se mueve (+4,4 % a 193 o a 181). Si no se cambia (la convención de `cartera-growth.md`), una sesión del −6 % convierte un Mantener en Comprar. Propuesta: fijar en la regla que el múltiplo de referencia es el del cierre del análisis (y decirlo), o anclar el base a la mediana entre el de hoy y el de 3 años.
3. **Guía solo trimestral**: ya es la tercera empresa (tras Nvidia y Shopify 2023) en la que v9 no actúa. DoorDash muestra que extrapolar el trimestre siguiente (pasado a ventas y sin la compra) recorta 3 puntos; valdría probar en el backtest la variante «guía del trimestre siguiente, anualizada».

## Fuentes

[1] DoorDash, nota de resultados del 2T 2026 (5-ago-2026), 8-K ex. 99.1 (SEC, leída directamente): pedidos, GOV, ingresos con y sin Deliveroo, beneficio bruto, EBITDA, FCF, recompra, guía del 3T26, IA, autónomos, SevenRooms y programa de la gasolina.
[2] DoorDash, notas de resultados del 3T24 al 1T26 (8-K ex. 99.1, SEC; 4T25 del 18-feb-2026): guías y reales trimestrales de GOV y EBITDA, ingresos sin Deliveroo, aportación de Deliveroo y aviso sobre la batida de la guía.
[3] SEC XBRL companyfacts (CIK 1792789): series trimestrales de ingresos, beneficio operativo, acciones, caja e inversiones 2023-2026.
[4] DoorDash, 10-Q del 2T26 (5-ago-2026, SEC): balance, bonos convertibles 2030, acciones, RSU y opciones, pagos en acciones, compra de Deliveroo y factores de riesgo (Proposición 22, Nueva York, directiva europea, demanda de Uber, autónomos).
[5] SEC: Formularios 4 y 144 de abr-oct 2026 (leídos directamente); 8-K del 18-sep-2026 y Schedule 14C del 27-ago-2026 (traslado a Nevada).
[6] Yahoo Finance chart API (DASH, QQQ, ^GSPC, UBER, CART, GRAB): cierres, máximos y mínimos, medias de 200 sesiones calculadas; sesión del 14-oct (181,23 USD a las 16:38 UTC).
[7] Nasdaq.com API (14-oct-2026): cierre del 13-oct de 193,09 USD; 181,31 USD a las 12:39 ET (16:39 UTC).
[8] Informe value de Uber del repo (`informes/uber-2026-10-08`, MarketScreener a 8-oct-2026): comparables y OPA sobre Delivery Hero.
[9] TipRanks/TheFly, MarketScreener, Stock Alarm, FN2, Barchart y TIKR: cambios de precio objetivo y consenso (fotos de feb, may, jul, ago y oct de 2026; las de octubre, por resumen de búsqueda, sin leer la fuente original).
[10] 24/7 Wall St. (23-sep-2026), The Star/Bloomberg (1-oct-2026), Restaurant Business, CNBC (6-nov-2025), TIKR (jul-2026), Kalkine, StockTitan, Claims Journal (22-sep-2026), DoorDash (Nueva York, 13-abr-2026) y DoorDash Australia (orden de estándares mínimos), StockStory (19-mar-2026, proyecto de ley del Senado).
[11] StockTwits, flujo público de DASH (API, 14-oct-2026). Reddit, bloqueado desde aquí.
[12] Cálculo propio: EV, ventas NTM, múltiplos históricos, DCF inverso y variantes con el motor.
[13] **De memoria, sin verificar con fuente primaria en esta sesión**: mercado alcanzable (~100.000 M USD), cuota en EE. UU. (~2/3), comisiones típicas, DashMart, comportamiento en 2022-2023, sentencia del Supremo británico sobre Deliveroo (2023) y control de voto de los fundadores.

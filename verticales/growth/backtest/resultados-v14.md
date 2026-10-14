# Backtest growth: candidata v14 (tercera ronda de mejoras, sobre v13)

## 1. Hipótesis y reglas, fijadas antes de mirar resultados (14-oct-2026, noche)

Punto de partida: **v13** (candidata, no vigente: v12 + guía recortada + tres alertas). Cada mejora se prueba por separado (v13 + una sola mejora) con `node herramientas/growth-backtest-v14.mjs`, sin escribir nada. Grupos, medidas y regla de adopción, los de v13: entrenamiento = fase 1 (20, `casos/`) + neutrales 2019 y 2021 (34); validación = neutrales 2023 (17) + industriales (`casos3/`, 13); las 51 neutrales juntas; compras, cuántas baten al Nasdaq-100 a 24 meses (margen de Wilson al 95 %), exceso medio y señales que cambian.

**Regla de adopción.** Se adopta una mejora solo si (a) no añade ninguna compra que quede por debajo del QQQ a 24 meses ni quita ninguna que lo bata (ni una ganadora de la fase 1), en ningún grupo; (b) la precisión mejora o queda igual; y (c) corrige un sesgo demostrado con la prueba fijada abajo o, si los casos no tienen el dato, un error de coherencia visible con las cifras de un informe actual. Si solo apunta en la buena dirección, o cumple (c) pero falla (a), queda como **alerta**. Si nada pasa, no hay v14. Los umbrales los fija el encargo; no se ajustan mirando resultados (las variantes de umbral salen solo como sensibilidad).

**Datos.** No se escriben datos en los casos ni en los `datos.json`: los campos nuevos se pasan al motor en memoria. En los casos, solo con lo que dice la nota del propio caso o un dato público a la fecha (se cita); en los informes, con la cifra y la línea del propio informe.

**Lo que ya se había visto al fijar esto:** la tabla de v13 de los informes (señal, ponderada, probabilidades y ventas de los escenarios: Cameco tiene el bajista con más ventas que el alcista, 4.744 frente a 4.645 M) y las notas de dilución de los casos (qué casos dicen que la dilución pasada vino de una ampliación). No se había calculado ninguna mejora.

### Mejora 1. Probabilidades 35/50/15 automáticas

- **Hipótesis:** el método (§2.4) ya pide 35/50/15 si la empresa depende de un solo producto o de un hecho que no se repite, pero lo aplica el analista y no siempre igual (Ascendis, Alnylam e Insmed lo llevan; otras con el mismo perfil, no). Un producto que es casi toda la venta o una decisión de reembolso o regulatoria abierta sobre una parte grande de ella hacen el escenario bajista más probable de lo que dice 25/50/25.
- **Campos:** `mercado.peso_primer_producto_pct` = % de las ventas de los últimos 12 meses del mayor producto. Producto = un fármaco (la molécula, con todas sus marcas y formulaciones), un dispositivo o sistema médico (con sus generaciones: G6/G7, Omnipod DASH/5 son el mismo), una prueba diagnóstica con nombre propio, o, fuera de la salud, una marca o modelo con línea propia de ventas en las cuentas. No es producto una plataforma de software o servicios con varios módulos, un segmento entero ni una familia de productos distintos. `riesgos.decision_pendiente_pct` = % de las ventas de 12 m sujeto a una decisión de reembolso, precio, aprobación o actuación regulatoria **con un proceso abierto a la fecha** (propuesta publicada, expediente, aviso formal) y resolución esperada en los 24 meses del objetivo.
- **Regla:** si `peso_primer_producto_pct > 70` o `decision_pendiente_pct > 30`, probabilidades = 35/50/15, salvo que las del analista ya sean al menos tan prudentes (bajista ≥ 35 y alcista ≤ 15), que se respetan. Sin los campos, igual que v13.
- **Datos en los casos (antes de calcular):** Exact Sciences 2021 (cribado = Cologuard 59 % de las ventas de 2020) y 2023 (69 % de 2022); Coinbase 2023 (aviso Wells de la SEC del 22-mar-2023 sobre el mercado al contado, staking, Prime y Wallet: ingresos por transacciones 74 % de 2022). El resto de casos: sin producto con línea propia > 70 % (biotecnológicas sin ventas de producto, software, plataformas) ni proceso regulatorio abierto a la fecha. Se espera que sea casi neutra por construcción.
- **Prueba (c):** coherencia. Sesgo demostrado si al menos un informe actual cumple la condición y lleva 25/50/25 mientras otros del mismo perfil llevan 35/50/15 (el mismo riesgo pesado distinto según el analista).

### Mejora 2. Dilución prevista separada de la pasada

- **Hipótesis:** cuando la dilución de los últimos 12 meses viene de una ampliación ya cobrada, el dinero ya está en `caja_m` y las acciones nuevas ya están en `acciones_diluidas_m`; repetir esa dilución en las acciones de dentro de 12 meses la cuenta dos veces (Rocket Lab 22 %, Kratos 11,5 %, Celestica 10,1 %).
- **Campo:** `finanzas.dilucion_esperada_pct` (se acepta también `caja.dilucion_esperada_pct`): dilución prevista en los 12 meses siguientes sin la ampliación ya cobrada (pagos en acciones, convertibles que entrarán, ampliaciones anunciadas).
- **Regla:** acciones dentro de 12 meses = acciones diluidas × (1 + `dilucion_esperada_pct`); la puntuación (bloque E) sigue con la pasada (la dilución ocurrió). **Salvaguarda:** si la pista de caja es < 24 meses (habrá que pedir dinero otra vez), se usa la mayor de las dos. Sin el campo, igual que v13.
- **Datos en los casos:** solo donde la nota del caso dice que la dilución pasada vino de ampliaciones por caja ya cobradas (no compras pagadas en acciones ni salidas a bolsa sin nota): Invitae 2019, Roku 2021, PacBio 2021, CRISPR 2019, Editas 2019, Intellia 2019, 2021 y 2023, Beam 2023, Recursion 2023, PacBio 2023, Tesla 2021, Zillow 2019, 2U 2019 y Shopify 2021. Como los casos no dan la dilución sin la ampliación, **esperada = 3 %** (la dilución típica por pagos en acciones) o la pasada si es menor; sensibilidad con 5 %. Fuera, por mezclar compras en acciones: Teladoc 2021, Unity 2023, Invitae 2021, Twilio 2021, Exact Sciences 2021. Sensibilidad aparte (no decide): Rivian 2021, Beyond Meat 2019 y Snowflake 2021 (salidas a bolsa sin nota).
- **Prueba (c):** coherencia: doble cuenta demostrada si la nota del caso o del informe dice que la ampliación está a la vez en la caja y en las acciones.

### Mejora 3. Escenarios con crecimiento de partida negativo

- **Hipótesis:** el bajista multiplica el crecimiento de partida por 0,5 y el alcista por 1,2; con partida negativa el bajista cae menos que el base y el alcista más (Cameco).
- **Regla:** crecimiento de cada escenario = g + (f − 1) × |g| (f = 0,5 / 1 / 1,2). Con g ≥ 0 es lo mismo que hoy; con g < 0: bajista 1,5 g, alcista 0,8 g. Solo en la proyección mecánica (después, v11 sigue tomando la menor entre mecánica y analista).
- **Prueba (c):** sesgo demostrado si en algún caso o informe las ventas del bajista superan las del alcista (incoherencia visible).

### Mejora 4. Procesadores de pagos con la comisión a la baja

- **Hipótesis:** si el ingreso o el beneficio bruto por unidad de volumen cae mucho, las ventas crecen más que el beneficio bruto y la proyección sobre ventas exagera (dLocal: beneficio bruto sobre volumen de 1,07 % a 0,72 %).
- **Campos:** `mercado.margen_volumen_cambio_pct` (variación interanual del beneficio bruto, o del ingreso si no hay, por unidad de volumen, en %) y `crecimiento.beneficio_bruto_12m_pct`.
- **Regla prevista:** proyectar sobre beneficio bruto si los casos tienen el dato; **si no lo tienen, solo alerta**: cuando el margen por volumen cae > 10 % en un año, alerta con la ponderada que saldría proyectando con el crecimiento del beneficio bruto. Ningún caso tiene volumen ni beneficio bruto por periodos: se espera que quede como alerta.

## 2. Resultados en el backtest (`node herramientas/growth-backtest-v14.mjs`, sin escribir nada)

| Variante (v13 + una mejora) | Fase 1: ganadoras / fracasos con Comprar | Entrenamiento 2019-21: compras, baten (margen 95 %) | Validación 2023 | Las 51 | Industriales | Señales que cambian |
|---|---|---|---|---|---|---|
| v13 (candidata) | 7/13 y 0/7 | 4 de 34, 4 baten (100 %; 51-100) | 2 de 17, 1 bate (50 %; 9-91) | 6 de 51, 5 baten (83 %; 44-97) | 2 de 13, 1 bate | — |
| 1. Probabilidades 35/50/15 automáticas | igual | igual | igual | igual | igual | 0 (marca solo Coinbase 2023, ya Vender) |
| 2. Dilución esperada (3 %) | igual | igual | igual | igual | igual | 1: Zillow 2019 Vender → Mantener (batió al QQQ: +273 % frente a +78 %) |
| 3. Partida negativa | igual | igual | igual | igual | igual | 0 |
| 4. Pagos: alerta | igual | igual | igual | igual | igual | 0 (ningún caso tiene el dato) |
| **v14** (las cuatro) | 7/13 y 0/7 | 4 de 34, 4 baten | 2 de 17, 1 bate | 6 de 51, 5 baten (83 %; 44-97) | 2 de 13, 1 bate | 1 (Zillow 2019) |

Exceso medio de las compras frente al QQQ a 24 meses, igual en todas: +371 pp en el entrenamiento, −15 pp en la validación, +243 pp en las 51 y −21 pp en los industriales. **Ninguna mejora añade ni quita una compra en ningún grupo.**

### Mejora 1

- Casos marcados: solo **Coinbase 2023** (decisión pendiente 74 %): Vender en v13 y en la variante (ponderada −32 → −36 %); batió al índice, pero no cambia nada.
- **Sensibilidad (no decide; el umbral del 70 % lo fija el encargo):** Exact Sciences 2023 tiene el 69 % de las ventas en Cologuard. Con un umbral del 65 % pasaría de Comprar (+11,5 %) a Mantener (+0,8 %), y es la única compra fallida de la validación (−36 % a 24 meses). Es una pista a favor de la regla, no una prueba: un solo caso, y el umbral se movería mirando el resultado.
- **Prueba (c), coherencia: demostrada.** Diez informes cumplen la condición. Cinco ya llevan 35/50/15 por decisión del analista (Alnylam 78 %, Ascendis 80 %, Madrigal 100 %, iRhythm 100 % y TransMedics 100 %). Otros cinco, con el mismo perfil, llevan 25/50/25: argenx (Vyvgart ~95 %), Dexcom (MCG 100 %), Insulet (Omnipod 100 %), Vertex (Trikafta ~75 %) y Glaukos (decisión de cobertura de Medicare abierta sobre iDose, ~40 % de las ventas). El mismo riesgo se pesa distinto según el analista.

### Mejora 2

- 15 casos con la dilución pasada documentada como ampliación ya cobrada. Ninguno pasa a Comprar. Zillow 2019 sube de Vender a Mantener (−11,7 → −9,9 %; lo ganó).
- **Ojo:** la ponderada sube más en biotecnológicas que queman caja (Editas −0,7 → +13,7 %, Invitae +3,7 → +30,9 %, Intellia 2023 −1,3 → +5,3 %, Recursion +35 → +48 %), y casi todas acabaron mal. Siguen en Vender o Mantener por la puntuación. La causa es el supuesto de los casos (3 % para todas): en una empresa que quema caja, la dilución prevista tiene que incluir las ampliaciones que vendrán, y así lo dice la definición del campo. La salvaguarda de pista < 24 meses no basta para eso, así que queda como regla de rellenado (sección 5).
- Sensibilidad: con 5 % en vez de 3 %, ningún cambio de señal (tampoco Zillow). Si se añaden Rivian, Beyond Meat y Snowflake (salidas a bolsa sin nota), siguen en Vender o Mantener.
- **Prueba (c), coherencia: demostrada.** Las notas de los 15 casos y los informes de Kratos, Rocket Lab y Celestica dicen que el dinero de la ampliación ya está en `caja_m` y las acciones nuevas ya están en `acciones_diluidas_m`. Repetir la dilución las cuenta dos veces.

### Mejora 3

- **Prueba (c): demostrada.** En v13, 6 de los 84 casos tienen más ventas en el bajista que en el alcista: CRISPR 2019, Nvidia 2019, Intellia 2021, PacBio 2021, Coinbase 2023 y Jabil 2023. Con la mejora, ninguno. En los informes pasa con Cameco (4.744 frente a 4.645 M), y con la mejora se corrige (4.604 frente a 4.702 M).
- Efecto: solo el bajista empeora, entre 2 y 17 puntos. No cambia ninguna señal. Los casos con partida negativa reparten resultados (4 de 7 batieron al índice), así que la regla no se adopta porque acierte más, sino porque quita una incoherencia.

### Mejora 4

Ningún caso tiene volumen ni beneficio bruto por periodos, así que solo queda como alerta, tal como estaba previsto. De los informes, salta en dLocal (beneficio bruto sobre volumen −32,7 % en un año). Proyectando con el crecimiento del beneficio bruto (34,5 %), la ponderada sería +14,3 % en vez de +14,8 %, y sigue en Comprar porque dLocal ya se valora por EBITDA. Remitly (margen por dólar −2 %) y Wise (comisión −4 %) no la activan.

## 3. Efecto en los informes actuales (54 informes; `calc` sigue en v11; campos nuevos en memoria)

### Datos leídos de los informes (no escritos en los `datos.json`)

| Campo | Informe | Valor | De dónde sale |
|---|---|---|---|
| `peso_primer_producto_pct` | Alnylam | 78 | «Amvuttra ya es el 78 % de los ingresos» |
| ídem | argenx | 95 | «casi todo es Vyvgart» (riesgos, punto 4); Vyvgart IV + Hytrulo = el producto |
| ídem | Ascendis | 80 | «Yorvipath es el 80 % de las ventas de producto» |
| ídem | Dexcom | 100 | vende solo sensores MCG (G7, G6, ONE+, Stelo: el mismo sistema en generaciones y versiones) |
| ídem | Insulet | 100 | Omnipod (DASH y 5) es todo el negocio; «el 98 % de los ingresos es recurrente (pods)» |
| ídem | iRhythm, Madrigal, TransMedics | 100 | Zio; «vende un solo fármaco» (Rezdiffra); OCS (producto y servicio) |
| ídem | Vertex | 75 | 2T26: Trikafta/Kaftrio 2.497 M de ~3.335 M (FQ 3.208 M = 96 %); Alyftrek es otra molécula |
| ídem (no marca) | Eli Lilly 65, Insmed ~60 (Brinsupri en 12 m; 73 % solo en el 2T), Glaukos 40 (iDose) | — | tirzepatida 65 %; ventas de 12 m 1.138 M menos Arikayce ~460 M; «iDose es ~40 % de las ventas» |
| `decision_pendiente_pct` | Glaukos | 40 | cinco de los siete contratistas de Medicare propusieron en mayo LCD sobre iDose; decisión final 4T26-1S27 |
| ídem (no marca) | Dexcom ~15, iRhythm 26, Natera 16,5 | — | subasta de Medicare o tarifa de los CMS sobre la parte de Medicare (< 30 %) |
| `dilucion_esperada_pct` | Kratos 2; Rocket Lab 3; Celestica 0,5 | — | las sensibilidades del propio informe («dilución futura del 2 % sin más ampliaciones»; «3 %, solo pagos en acciones; la emisión ya está en caja»; «0,5 %, la ampliación ya está en caja») |
| `margen_volumen_cambio_pct` | dLocal −32,7 (beneficio bruto 12 m +34,5 %, 2T +29 %); Remitly −2,1; Wise −3,8 | — | beneficio bruto / TPV 1,07 → 0,72 %; margen por dólar enviado 1,45 → 1,42 %; comisión 0,52 → 0,50 % |

### Qué cambia (v13 → v14)

| Informe | v13 | v14 | Por qué |
|---|---|---|---|
| **argenx (suplente)** | Comprar, +11,4 %, hasta 866,8 | **Mantener, −0,5 %**, hasta 774,5 | 35/50/15 (Vyvgart ~95 %) |
| **Dexcom (suplente)** | Comprar, +10,5 %, hasta 89,5 | **Mantener, +1,7 %**, hasta 82,3 | 35/50/15 (un solo sistema, MCG) |
| Vertex | Mantener, −2,6 % | **Vender, −10,2 %** | 35/50/15 (Trikafta ~75 %) |
| Glaukos | Mantener, +2,5 % | Mantener, −6,8 % | 35/50/15 (LCD abiertas sobre iDose, ~40 %) |
| Insulet | Mantener, +15,9 % | Mantener, +2,6 % | 35/50/15 (Omnipod) |
| Rocket Lab | Mantener, +1,3 % | Mantener, +20,0 % (sigue frenada por 35 × el beneficio bruto; hasta 28,7) | dilución 22 → 3 % |
| Kratos | Vender, −16,9 % | Vender, −9,1 % | dilución 11,5 → 2 % |
| Celestica | Vender, −26,2 % | Vender, −19,2 % | dilución 10,1 → 0,5 % |
| Cameco | Vender, −9,7 %, bajista −45,0 % | Vender, −9,7 %, bajista −46,8 % | partida negativa |
| dLocal (suplente) | Comprar, +14,8 % | igual + alerta de margen por volumen | alerta |
| **Cartera** (Nu, Axon, Shopify, Snowflake, Samsara) y suplentes MongoDB, Toast, Zscaler, Datadog, Saab, Natera | Comprar | **igual** | ninguna condición |

## 4. Decisión

| Mejora | Decisión | Motivo |
|---|---|---|
| 1. Probabilidades 35/50/15 automáticas | **Adoptada en v14** | Neutra en el backtest (solo marca Coinbase 2023, que ya era Vender) y corrige una incoherencia demostrada: cinco informes con el mismo perfil que otros cinco llevan 25/50/25. El 70 % lo fija el encargo; con un 65 % habría evitado Exact Sciences 2023, la única compra fallida de la validación (solo es una pista). |
| 2. Dilución prevista separada de la pasada | **Adoptada en v14** | No añade ni quita compras. La única señal que cambia es Zillow 2019, que sube de Vender a Mantener y era ganadora. Quita una doble cuenta documentada. Condición al rellenar: en empresas que queman caja, la prevista incluye las ampliaciones que harán falta. |
| 3. Escenarios con partida negativa | **Adoptada en v14** | Neutra en señales. Quita la incoherencia de que el bajista venda más que el alcista (6 casos y Cameco). |
| 4. Pagos con la comisión a la baja | **Alerta** (en v14, no cambia cifras) | No hay datos en los casos para probarla. En dLocal, proyectar con el beneficio bruto apenas cambia la ponderada (+14,8 → +14,3 %). |

**v14 = v13 + mejoras 1, 2 y 3 + alerta de pagos.** Comprobado: con v1-v13, las salidas son idénticas antes y después del cambio en 137 archivos (84 casos y 53 informes; 1.781 cálculos, 0 diferencias). `VIGENTE` sigue en v11. Se ve con `node motor/growth.mjs <datos.json> --version v14` (no escribe).

**Lectura honesta.** Ninguna de las cuatro mejora la tasa de acierto medida: 6 compras en las 51 neutrales y 5 baten al índice, igual que v7-v13. Lo que cambia es la coherencia: el mismo riesgo pesa igual en todos los informes, no se cuenta dos veces la dilución y los escenarios están ordenados. Hay que tener en cuenta un efecto real: la mejora 1 baja de Comprar a Mantener a dos suplentes (argenx y Dexcom) sin que el backtest pueda decir si acierta, porque casi no hay casos con un solo producto. Hacer vigente v14 es una decisión de criterio («el mismo riesgo, la misma regla»), no de datos.

**Recomendación.** Proponer al usuario v12 + v13 + v14 juntas como vigentes. En cartera no cambia nada. En suplentes, argenx y Dexcom bajarían a Mantener (en el orden de sustitución quedarían detrás de MongoDB, Toast, Zscaler, dLocal, Datadog, Saab y Natera). Antes de pasarla a vigente, hay que escribir en los `datos.json` los campos nuevos (los de la tabla de §3) y pedirlos en la plantilla para las tandas siguientes (Corcept, de la tanda 14, depende casi entero de un fármaco). No hay órdenes: son propuestas.

## 5. Borrador para `metodo.md` §7 (no aplicado)

- 14-oct-2026 (noche): **candidata v14** (no vigente; [backtest/resultados-v14.md](backtest/resultados-v14.md)). v14 = v13 + (1) **probabilidades 35/50/15 automáticas** si un producto es > 70 % de las ventas de 12 m (`mercado.peso_primer_producto_pct`; producto = un fármaco con sus marcas, un dispositivo con sus generaciones, una prueba con nombre propio o una marca o modelo con línea propia de ventas; no una plataforma de software ni un segmento) o si hay una decisión de reembolso, precio o regulatoria con proceso abierto sobre > 30 % (`riesgos.decision_pendiente_pct`), salvo que el analista ya use algo igual de prudente; (2) **dilución prevista** (`finanzas.dilucion_esperada_pct`) en vez de la pasada en las acciones a 12 meses, cuando la pasada es una ampliación ya cobrada (ya en caja y en acciones). Con pista < 24 meses se usa la mayor de las dos; la puntuación sigue con la pasada; en empresas que queman caja, la prevista incluye las ampliaciones que harán falta; (3) **partida negativa**: el bajista proyecta 1,5 × g y el alcista 0,8 × g, para que el bajista no venda más que el alcista (Cameco); (4) **alerta** si el margen por volumen de un procesador de pagos cae > 10 % en un año (`mercado.margen_volumen_cambio_pct`, con `crecimiento.beneficio_bruto_12m_pct` para dar la ponderada sobre beneficio bruto). En el backtest es neutra: no añade ni quita ninguna compra (6 de 51 neutrales, 5 baten), y solo cambia Zillow 2019, de Vender a Mantener. En los informes: argenx y Dexcom (suplentes) pasan de Comprar a Mantener y Vertex de Mantener a Vender; Glaukos e Insulet bajan de ponderada; Rocket Lab, Kratos y Celestica suben al quitar la doble dilución sin cambiar de señal. La cartera no cambia. Campos nuevos que rellenar: `mercado.peso_primer_producto_pct`, `riesgos.decision_pendiente_pct`, `finanzas.dilucion_esperada_pct`, `mercado.margen_volumen_cambio_pct` y `crecimiento.beneficio_bruto_12m_pct`.

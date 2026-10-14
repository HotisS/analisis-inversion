# Backtest growth: candidata v13 (segunda ronda de mejoras sobre v12)

## 1. Hipótesis y reglas, fijadas antes de mirar resultados (14-oct-2026, noche)

Punto de partida: **v12** (candidata: v11 + crecimiento orgánico). Cada mejora se prueba por separado (v12 + una sola mejora) con `node herramientas/growth-backtest-v13.mjs`, sin escribir nada.

**Grupos de casos.** Entrenamiento: fase 1 (20 famosos, `casos/`) + cohortes neutrales 2019 y 2021 (34, `casos2/`). Validación: cohorte neutral 2023 (17) + industriales (`casos3/`, 13). Las 51 neutrales se dan también juntas. Medidas: compras, cuántas baten al Nasdaq-100 (QQQ) a 24 meses (margen de Wilson al 95 %), exceso medio y señales que cambian; en la fase 1, ganadoras y fracasos con Comprar. Los umbrales se eligen **solo con el entrenamiento** y se publican en la validación tal cual.

**Regla de adopción (la de v12):** se adopta una mejora solo si (a) no añade ninguna compra que quede por debajo del QQQ a 24 meses ni quita ninguna que lo bata (ni una ganadora de la fase 1), en ningún grupo; (b) la precisión mejora o queda igual; y (c) corrige un sesgo demostrado con la prueba fijada abajo (o, si los casos no tienen el dato, un error de coherencia visible con las cifras de un informe actual). Si solo apunta en la buena dirección sin llegar a (c), o si cumple (c) pero falla (a), queda como **alerta** (no cambia cifras ni señal). Si nada pasa, no hay v13.

**Datos.** No se escriben datos nuevos en los casos ni en los `datos.json`. Los campos nuevos se pasan al motor en memoria y su valor sale de texto escrito con la información de la fecha (en los casos, la evidencia de la señal 3, «fuerza relativa a 6 meses»; en los informes, la cifra y la línea del propio informe).

### Mejora 1. Múltiplo caro (EV/ventas o EV/EBITDA de hoy > 2 × su mediana de 3 años)

- **Hipótesis:** con el múltiplo de hoy muy por encima de su historia, el escenario malo realista es que vuelva a su mediana, y el bajista de v12 (base × 0,6, con base = múltiplo de hoy × factor de desaceleración) es demasiado optimista: puede quedar por encima de la propia mediana.
- **Elegida (de las dos del encargo): bajista con el múltiplo acotado a la mediana**: si `múltiplo de hoy > 2 × mediana_3a`, múltiplo bajista = mín(bajista de v12, mediana_3a). No se elige «no comprar» porque es binario y la cifra que lo apoya (0 de 7) es la misma muestra de la que salió el umbral (sobreajuste); el bajista acotado es gradual, tiene razón de negocio (es el riesgo de vuelta a la media que v2 quitó del caso base) y solo veta a través de los filtros existentes (bajista < −50 %, ponderada < 5 %) y del «compra hasta». El veto se calcula como **control**, no como candidata.
- **Umbral:** 2 ×, fijado por la alerta de v11; no se ajusta aquí. Los 7 casos que lo sugirieron son de 2019 y 2021 (entrenamiento); la validación (2023, industriales) es muestra que no lo inspiró.
- **Prueba del sesgo (c):** en los casos marcados (los de todos los grupos), proporción cuyo resultado real a 12 meses quedó por debajo de la rentabilidad bajista de v12, frente a la misma proporción en los no marcados. Sesgo demostrado si en los marcados es ≥ 1/3 y al menos el doble que en los no marcados.

### Mejora 2. Regla del 40 con los pagos en acciones

- **Hipótesis:** el FCF de las empresas con muchos pagos en acciones (Datadog, Snowflake, Zscaler) no descuenta ese coste, y la regla del 40 (crecimiento + margen FCF) les da puntos que no son caja para el accionista.
- **Regla:** si `finanzas.sbc_sobre_ventas_pct > T`, regla del 40 = crecimiento 12 m + margen FCF − pagos en acciones / ventas. Solo cambia la puntuación (bloque D, como mucho ~5 puntos).
- **Umbral T** ∈ {10, 15}, elegido en el entrenamiento: el que dé mejor precisión de Comprar; a igualdad, el que cambie menos señales; a igualdad, 15.
- **Prueba del sesgo (c):** tasa de casos que baten al QQQ entre los que tienen SBC > T frente a los demás; sesgo demostrado si es como mucho la mitad, en entrenamiento y en validación.

### Mejora 3. Euforia también a 6 meses

- **Hipótesis:** la euforia de v7 (subida ≥ 150 % en 12 meses con EV/beneficio bruto > 20) no ve las subidas verticales recientes (Snowflake +166 % y Datadog +156 % en 6 meses).
- **Regla:** campo nuevo `tendencia.subida_6m_pct`; si subida a 6 meses ≥ U y EV/beneficio bruto NTM > 20 (el mismo «múltiplo alto» de la euforia de 12 meses, sin ajustar), es euforia y veta la compra, como la de 12 meses.
- **Dato en los casos:** la subida a 6 meses que da la evidencia de la señal 3 de cada caso (escrita con los precios de la fecha; sin cifra → `null`, no marca). Tabla en la herramienta.
- **Umbral U** ∈ {80, 100}, elegido en el entrenamiento: queda descalificado el U que quite alguna compra ganadora (bate al QQQ o ganadora de la fase 1); entre los que quedan y marcan ≥ 3 casos, el de menor tasa de casos marcados que baten al QQQ; a igualdad, el mayor U. Si ningún U pasa: **solo alerta**, con el U de menor tasa entre los que marcan ≥ 3 (o 80 si ninguno marca 3).
- **Prueba del sesgo (c):** tasa de marcados que baten al QQQ (o ganadoras) frente a la de los no marcados, en entrenamiento y validación.

### Mejora 4. Exceso sobre la guía = 0 si la empresa ya recortó la guía del año en curso

- **Hipótesis:** el exceso sobre la guía se mide con el último ejercicio cerrado; si en el ejercicio en curso la empresa ha recortado su guía, ese exceso ya no describe lo que hace hoy (Alnylam: +50 pp de exceso de 2025 con la guía de 2026 rebajada el 30-jul).
- **Regla:** campo nuevo `crecimiento.guia_recortada` (true si la empresa ha rebajado, en el ejercicio en curso, el punto medio de su guía anual de ventas, o de la métrica que usa `guia_12m_pct`). Si es true, el exceso que se suma a la guía es 0 (si fuera negativo, se deja). Solo recorta. Sin el campo, igual que v12.
- **Prueba prevista:** ningún caso tiene el dato (escribirlo hoy sería sesgo retrospectivo): neutra por construcción. Se evalúa por coherencia y en los informes que dicen que la guía se recortó (cifra y línea del informe).

**Lo que ya se sabía al fijar esto (para que conste):** por `resultados-v11.md`, que con el múltiplo > 2 × su mediana hay 7 neutrales (0 baten) y 4 de la fase 1, entre ellos Nvidia 2016, una compra ganadora. No se había mirado ningún resultado de las mejoras 2, 3 y 4.

## 2. Resultados en el backtest (`node herramientas/growth-backtest-v13.mjs`, sin escribir nada)

**Comprobación previa:** ningún caso tiene `guia_recortada` (mejora 4 = v12 por construcción). La subida a 6 meses sale de la evidencia de la señal 3 en 77 de 84 casos; en 7 no hay cifra de 6 meses (5 neutrales de 2019 «sin prueba», GE Vernova 2024 por ser escisión, y Beyond Meat 2019, Palantir 2021 y Rivian 2021, con menos de 6 meses en bolsa).

| Variante (v12 + una mejora) | Fase 1: ganadoras / fracasos con Comprar | Entrenamiento 2019-21: compras, baten (margen 95 %) | Validación 2023 | Las 51 | Industriales | Señales que cambian |
|---|---|---|---|---|---|---|
| v12 (candidata) | 7/13 y 0/7 | 4 de 34, 4 baten (100 %; 51-100) | 2 de 17, 1 bate (50 %; 9-91) | 6 de 51, 5 baten (83 %; 44-97) | 2 de 13, 1 bate | — |
| 1. Múltiplo caro: bajista a la mediana | **6/13** y 0/7 | igual | igual | igual | igual | 1: **Nvidia 2016** Comprar → Mantener (ganadora, +128 % a 36 m) |
| 1. Control: múltiplo caro veta | **6/13** y 0/7 | igual | igual | igual | igual | 1: Nvidia 2016 |
| 2. Regla del 40 − SBC, T = 10 | igual | igual | igual | igual | igual | 2 (Mantener → Vender): Twilio 2023 (bate al QQQ por 0,8 pp) y Unity 2023 (no bate) |
| 2. Regla del 40 − SBC, T = 15 | igual | igual | igual | igual | igual | 2: las mismas |
| 3. Euforia 6 m, veto U = 80 | **6/13** y 0/7 | igual | igual | igual | igual | 1: **CrowdStrike 2020** Comprar → Mantener (ganadora, +69 % a 36 m) |
| 3. Euforia 6 m, veto U = 100 | igual | igual | igual | igual | igual | 0 |
| 4. Guía recortada | igual | igual | igual | igual | igual | 0 (ningún caso tiene el dato) |
| **v13** (v12 + 4 + alertas de 1, 2 y 3) | 7/13 y 0/7 | 4 de 34, 4 baten | 2 de 17, 1 bate | 6 de 51, 5 baten (83 %; 44-97) | 2 de 13, 1 bate | **0** |

Exceso medio de las compras frente al QQQ a 24 meses, igual en todas: +371 pp en el entrenamiento 2019-21, −15 pp en la validación 2023, +243 pp en las 51 y −21 pp en los industriales. **En los 51 neutrales ninguna mejora cambia una sola compra**: el método ya no compraba ninguno de los casos que marcan.

### Mejora 1: prueba del sesgo

| Grupo | Casos con resultado a 12 m | Real a 12 m peor que el bajista de v12 | Peor que el bajista acotado | Baten al QQQ a 24 m (o ganadoras) |
|---|---|---|---|---|
| Múltiplo > 2 × mediana | 11 | **6 (55 %)** | 4 (36 %) | 1 (Nvidia 2016) |
| Resto | 73 | 13 (18 %) | 13 (18 %) | 31 (42 %) |

Solo neutrales: 3 de 7 por debajo del bajista (43 %). **El sesgo está demostrado** con la prueba fijada (≥ 1/3 y más del doble que el resto): con el múltiplo que dobla su historia, el bajista de v12 se queda corto la mitad de las veces. Acotarlo a la mediana lo corrige en parte (55 % → 36 %). Pero la regla **quita Nvidia 2016** (bajista −46 % → −62 %: pasa el listón de −50 %), así que falla el punto (a). Tesla 2021 muestra el otro lado: el bajista acotado (−79 %) era mucho peor que lo que pasó a 12 meses (+61 %).

Casos marcados: Nvidia 2016 (7,0 frente a 2,3 de mediana), Palantir 2021, Peloton 2021, Teladoc 2021 (fase 1); Invitae 2019 y 2021, PacBio 2021, Roku 2021, Teladoc 2021, Tesla 2021, Zillow 2021 (neutrales). En la validación (2023, industriales) no hay ninguno: el umbral no se puede validar fuera de la muestra que lo sugirió.

### Mejora 2: umbral y prueba del sesgo

- T = 10 y T = 15 dan la misma precisión en el entrenamiento (no cambia ninguna compra) y cambian las mismas 2 señales: por la regla fijada, **T = 15**.
- Baten al QQQ (o ganadoras) con SBC > 15 %: entrenamiento 4 de 12 (33 %) frente a 17 de 42 (40 %) del resto; validación 2 de 8 (25 %) frente a 9 de 22 (41 %). Algo menos, pero lejos de «la mitad»: **sesgo no demostrado**. Con SBC > 10 %, en el entrenamiento baten *más* (44 % frente a 36 %).
- Las compras con SBC alto ganaron: CrowdStrike 2020, Duolingo 2023, Palantir 2023 y Twitter 2019 (SBC > 10 %); la regla no quita ninguna, solo baja su puntuación 1-3 puntos.

### Mejora 3: umbral y prueba del sesgo (subida a 6 m ≥ U con EV/beneficio bruto > 20)

- **U = 80, descalificado**: en el entrenamiento quita CrowdStrike 2020 (+86 % en 6 meses, EV/BB 33; ganadora). Marca 6: CrowdStrike 2020 (bate), Peloton 2021, Snowflake 2021, Zoom 2020, Intellia 2021, PacBio 2021 (no baten).
- **U = 100, el elegido**: marca 4 en el entrenamiento (Peloton 2021, Zoom 2020, Intellia 2021, PacBio 2021) y ninguno bate (0 % frente al 42 % del resto); en la validación marca 1, PacBio 2023 (no bate; 0 % frente al 38 %). No quita ninguna compra.
- **Pero los 4 del entrenamiento ya tenían la euforia de 12 meses** (subida ≥ 150 %): el veto a 6 meses no añade nada allí. Lo único nuevo es PacBio 2023, que v12 ya no compraba. La prueba fijada pasa en la letra (0 de 5 frente a ~40 %), pero el **efecto propio** de la regla descansa en 1 caso. Probabilidad de 0 de 5 por azar con una base del 40 %: ~8 %, como el 0 de 7 del múltiplo caro, que se dejó como indicio. Sensibilidad: con la subida desde la salida a bolsa, Beyond Meat 2019 y Palantir 2021 también se marcarían (dos fracasos más).

## 3. Efecto en los informes actuales (46 informes; `calc` sigue en v11; campos nuevos en memoria)

### Datos leídos de los informes (no escritos en los `datos.json`)

| Campo | Informe | Valor | De dónde sale |
|---|---|---|---|
| `guia_recortada` | Alnylam | true | `nota_guia`: «Guía anual de ventas netas de producto 2026 rebajada el 30-jul de 4.900-5.300 a 4.700-5.100 M USD» |
| ídem | HubSpot | true | informe: «el año 2026 en 3.678-3.686 M (+18 %), recortado en 22 M en agosto» |
| ídem | Insulet | true | `crecimiento.nota`: «Guía (5-ago-2026): 2026 +20-22 % a tipo constante (… antes +21-23 %)» |
| ídem (no) | AeroVironment, Boston Scientific | — | AeroVironment recortó la del FY26; la del FY27 (el año en curso) sigue igual. Boston Scientific avisa de que «es poco probable» que la cumpla, pero no la ha rebajado aún (28-oct) |
| `subida_6m_pct` | todos | la cifra de 6 meses de la evidencia de su señal 3 | p. ej. Snowflake +166,5 %, Datadog +156 %, Natera +96 %, Zscaler +86,4 %, Cloudflare +70 %; tabla en la herramienta |

### Qué cambiaría cada mejora como regla (v12 → v12 + mejora)

| Informe | v12 | 1. Bajista a la mediana | 2. Regla del 40 − SBC (T = 15) | 3. Euforia 6 m (U = 100) | 4. Guía recortada |
|---|---|---|---|---|---|
| **Snowflake (cartera)** | Comprar, +8,0 %, hasta 368 | igual | puntuación 78 → 75, sigue Comprar | **Mantener** (+166,5 % en 6 m, EV/BB 27,8) | — |
| Samsara (cartera) | Comprar, +14,7 % | igual | 78,5 → 76,5 | igual (+55 %) | — |
| Axon (cartera) | Comprar, +32,3 % | igual | 68,2 → 67,2 | igual | — |
| Nu, Shopify (cartera) | Comprar | igual | igual | igual | — |
| **Datadog (suplente)** | Comprar, +7,1 % | igual | 79,8 → 77,8 | **Mantener** (+156 %, EV/BB 25,6) | — |
| **Natera (suplente)** | Comprar, +8,1 %, hasta 407,5 | **Mantener** (bajista −42,4 → −53,4 %; hasta 369,1) | 74,7 → 72,7 | igual (+96 %: no llega a 100) | — |
| MongoDB, Zscaler (suplentes) | Comprar | igual | 74,5 → 72,5; 69 → 67 | igual (+58 %, +86 %) | — |
| Toast, dLocal, Dexcom, argenx, Saab (suplentes) | Comprar | igual | igual | igual | — |
| Cloudflare | Mantener, +12,0 % | +9,9 % (bajista −53,7 %) | 81,3 → 79,3 | igual (+70 %) | — |
| CrowdStrike | Mantener, +10,6 % | +7,5 % (bajista −55,2 %) | 81,2 → 78,2 | sin cifra de 6 m | — |
| Insulet | Mantener, +22,4 %, hasta 157,3 | — | — | — | **+15,9 %, hasta 151,9** (sigue Mantener por puntuación, 54,5) |
| HubSpot | Mantener, −0,4 % | — | 66,8 → 64,8 (T = 10) | — | −0,9 % |
| Alnylam | Vender, −10,1 % | — | — | — | igual (v11 ya usa las ventas del informe, más bajas) |

Con **v13** (solo la mejora 4 como regla) no cambia de señal ningún informe; cambian las cifras de Insulet y HubSpot, y las alertas nuevas salen en Snowflake, Samsara, Axon, Datadog, MongoDB, Zscaler, Natera, Cloudflare y CrowdStrike (la de euforia a 6 meses solo cuando el informe rellene `tendencia.subida_6m_pct`).

## 4. Decisión

| Mejora | Decisión | Motivo |
|---|---|---|
| 1. Múltiplo caro: bajista a la mediana | **Alerta** (con la cifra del bajista acotado) | Sesgo demostrado (el bajista falla en 6 de 11 casos frente a 13 de 73), pero como regla quita Nvidia 2016, una ganadora; sin casos en la validación. El veto, peor: quita lo mismo sin graduar. |
| 2. Regla del 40 restando pagos en acciones (> 15 %) | **Alerta** (regla del 40 y puntuación sin ellos) | Neutra en compras, pero no separa: las de pagos altos batieron 6 de 20 frente a 26 de 64 (30 % frente a 41 %), lejos de la mitad. |
| 3. Euforia a 6 meses (≥ 100 % con EV/BB > 20) | **Alerta**; el veto, pendiente de decisión del usuario | U = 80 quita CrowdStrike 2020. U = 100 no quita nada y sus 5 casos fracasaron, pero 4 ya los vetaba la euforia de 12 meses: su efecto propio es 1 caso. Como regla pasaría Snowflake (cartera) y Datadog (suplente) a Mantener. |
| 4. Exceso sobre la guía = 0 si ya recortó la guía del año | **Adoptada en v13** | Neutra en el backtest (por construcción), solo recorta y corrige una incoherencia visible: sumar «lo que suele batir la guía» a una empresa que este año la ha rebajado (Alnylam, HubSpot, Insulet). No cambia ninguna señal. |

**v13 = v12 + guía recortada + tres alertas.** Probado: con v1-v12 las salidas son idénticas antes y después del cambio en 129 archivos (84 casos y 45 informes; 1.548 cálculos, 0 diferencias). `VIGENTE` sigue en v11. Se ve con `node motor/growth.mjs <datos.json> --version v13` (no escribe).

**Lectura honesta.** Ninguna de las cuatro mejora la tasa de acierto medida: en los 51 neutrales el método ya no compraba ninguno de los casos que marcan, y la tasa realista sigue siendo la de v7 (6 compras, 5 baten; esperar algo más de la mitad). Lo que esta ronda aporta es **saber dónde mirar**: el bajista se queda corto cuando el múltiplo dobla su historia (Natera, Cloudflare, CrowdStrike) y las subidas verticales recientes con múltiplo alto fracasaron siempre en la muestra (Snowflake y Datadog, hoy). Para v13 como vigente hace falta rellenar `crecimiento.guia_recortada` (Alnylam, HubSpot, Insulet) y `tendencia.subida_6m_pct` en los informes; sin ellos, v13 da lo mismo que v12 salvo las alertas de múltiplo y de pagos en acciones.

**Recomendación.** Hacer vigente v12 + v13 juntas cuando el usuario dé el visto bueno (no cambian ninguna señal). En cartera: **Snowflake** es la única con una alerta seria (+166,5 % en 6 meses con EV/beneficio bruto 27,8, y la ponderada, +8 %, está cerca del listón del 5 %); conviene no ampliarla con el tramo 2 si no se confirma el crecimiento en resultados, y decidir si se quiere el veto de euforia a 6 meses como regla (la pasaría a Mantener). En suplentes, **Natera** baja a la cola (con el bajista en su mediana no compraría) y **Datadog** tiene la misma alerta que Snowflake. Ninguna orden: son propuestas.

## 5. Borrador para `metodo.md` §7 (no aplicado)

- 14-oct-2026 (noche): **candidata v13** (no vigente; [backtest/resultados-v13.md](backtest/resultados-v13.md)). v13 = v12 + **guía recortada**: con `crecimiento.guia_recortada = true` (la empresa ha rebajado en el ejercicio en curso el punto medio de su guía anual), el exceso sobre la guía que se suma a la partida de la proyección es 0, porque el exceso del año pasado ya no describe lo que hace hoy (Alnylam, HubSpot, Insulet). Además, tres alertas que no cambian nada: (1) con el múltiplo de hoy > 2 × su mediana de 3 años, el bajista con el múltiplo en la mediana (en el backtest el resultado real a 12 meses quedó por debajo del bajista en 6 de 11 casos así, frente a 13 de 73; como regla habría quitado Nvidia 2016); (2) regla del 40 y puntuación restando los pagos en acciones si superan el 15 % de las ventas (las de pagos altos batieron al Nasdaq-100 en 6 de 20 casos frente a 26 de 64: no separa); (3) euforia a 6 meses, con el campo nuevo `tendencia.subida_6m_pct` ≥ 100 % y EV/beneficio bruto > 20 (0 de 5 casos así batieron al índice, pero 4 ya los vetaba la euforia de 12 meses; con 80 % habría quitado CrowdStrike 2020). En el backtest es neutra: ninguna señal cambia en 84 casos. En los informes no cambia ninguna señal; Insulet baja de +22,4 % a +15,9 % (sigue Mantener). Alertas en cartera: Snowflake (euforia a 6 meses, +166,5 %; pagos en acciones 30 %), Samsara y Axon (pagos en acciones); en suplentes, Natera (bajista −53,4 % con el múltiplo en su mediana), Datadog (euforia a 6 meses), MongoDB y Zscaler (pagos en acciones). Campos nuevos que rellenar en los informes: `crecimiento.guia_recortada` y `tendencia.subida_6m_pct` (la cifra de 6 meses de la señal 3).

## 6. Corrección de v12 (14-oct-2026, noche): base pro forma con el orgánico

**Fallo.** Con `crecimiento_actual_organico_pct`, v12 aplicaba el crecimiento orgánico sobre las ventas de los últimos 12 meses, que no llevan el año entero de las compras ya cerradas. La proyección quedaba por debajo de ventas casi aseguradas. Caso: Construction Partners, bajista mecánico de 3.740 M frente a 3.961 M de ventas de los próximos 12 meses (3.477,9 × 1,139, con compras ya cerradas).

**Regla corregida (en `proyeccion()`, opción `proforma`, activa en v12 y v13):**

1. Base de partida pro forma = ventas de 12 m × (1 + `crecimiento_actual_pct` − orgánico). Esa diferencia es lo que suman en los 12 meses siguientes las compras ya cerradas, que es la misma cifra que les falta a las ventas de 12 m para llevar el año entero. Si el informe escribe `crecimiento.ventas_proforma_12m_m` (opcional, con fuente), manda ese.
2. Sobre esa base se aplica el orgánico como antes (como mucho la partida mecánica y la guía), en los tres escenarios. La parte comprada no se multiplica por el factor del escenario (0,5 / 1 / 1,2): ya está hecha.
3. Cada escenario queda como mucho en la proyección de v11 (la regla solo recorta, como estaba diseñada v12).
4. Sin base pro forma posible (ni `ventas_proforma_12m_m` ni `crecimiento_actual_pct`): proyección de v11. El orgánico sigue en la rebaja por desaceleración.

**Por qué esta y no las otras.** No pide datos nuevos (los 7 informes con orgánico ya tienen las dos cifras); usar el crecimiento total solo el primer año daría casi lo mismo en el escenario base, pero en el bajista seguiría partiendo por la mitad las compras ya cerradas. No se ha escrito `ventas_proforma_12m_m` en ningún `datos.json`: no hace falta.

**Comprobaciones.** Regresión con 132 archivos (84 casos y 48 informes) × 13 versiones = 1.716 cálculos: v1-v11, 0 diferencias; v12 y v13 cambian solo en los 7 informes con orgánico. Backtest (`growth-backtest-v12.mjs` y `-v13.mjs`): igual que antes, ninguna señal cambia en los 84 casos (ninguno tiene orgánico). En `growth-backtest-v12.mjs` la variante «1 orgánico» lleva ya la corrección. `VIGENTE` sigue en v11.

En v13 la corrección viene heredada de v12 (no es una mejora nueva de esta ronda). Las cifras de §3 de los 46 informes no cambian salvo en estos 7, que en §3 no aparecían.

**Efecto en los 7 informes** (señal, ponderada a 12 m, bajista, «compra hasta»; v13 = v12 corregida en los 7):

| Informe | v11 | v12 antes | v12 corregida | Nota |
|---|---|---|---|---|
| Construction Partners | Mantener, +2,6 %, −63,2 %, 63,6 USD | Mantener, −0,2 %, −59,8 %, 69,4 | **Mantener, +7,8 %, −55,3 %, 77,1** | bajista mecánico 3.740 → 3.961 M (= ventas de los próximos 12 m); precio 86,3 |
| Howmet | Mantener, −9,8 %, −53,0 %, 186,2 | Mantener, −4,5 %, −50,5 %, 197,2 | Mantener, −4,3 %, −50,0 %, 197,7 | manda la proyección de v11 (más baja) |
| Quanta Services | Vender, −18,8 %, −60,7 %, 532,4 | Mantener, −9,2 %, −54,9 %, 595,4 | Mantener, −2,4 %, −52,0 %, 640,4 | ídem |
| GE Vernova | Vender, −14,8 %, −52,6 %, 814 | Mantener, −3,2 %, −46,0 %, 925,6 | Mantener, −1,9 %, −45,7 %, 937,5 | ídem |
| Comfort Systems | Vender, −17,6 %, −57,2 %, 1.276,2 | Vender, −14,7 %, −55,8 %, 1.320,9 | igual que antes | manda la cifra del analista (más baja) |
| DoorDash | Mantener, +0,8 %, −44,9 %, 185,3 | Mantener, +3,3 %, −44,3 %, 190,0 | Mantener, +4,0 %, −43,5 %, 191,2 | le sigue faltando para Comprar |
| Rheinmetall | Mantener, +3,5 %, −55,4 %, 847 EUR | Mantener, +7,9 %, −52,1 %, 911,5 | igual que antes | manda la proyección de v11 |

Ninguna señal cambia frente a la v12 anterior. Ninguna está en cartera ni en suplentes.

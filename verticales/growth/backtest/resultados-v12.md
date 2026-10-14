# Backtest growth: candidata v12 (cuatro mejoras sobre v11)

## 1. Hipótesis y reglas, fijadas antes de mirar resultados (14-oct-2026, 18:00 UTC)

v12 = v11 + las mejoras que pasen la prueba. Cada mejora se prueba por separado sobre v11 (v11 + una sola mejora) y se mide igual que v9-v11: los 51 casos neutrales (`casos2/`, protocolo.md: compras, precisión de Comprar frente al Nasdaq-100 a 24 meses con margen de Wilson al 95 %, exceso medio), los 20 casos de la fase 1 (`casos/`) y los 13 industriales (`casos3/`). Después, en los 40 informes de `informes-growth/` (copia de los `datos.json` de las 17:55; sin escribir `calc`).

**Regla de adopción (la del encargo, fijada aquí):** se adopta una mejora solo si (a) no añade ninguna compra que quede por debajo del QQQ a 24 meses ni quita ninguna que lo bata, en ningún grupo de casos; (b) mejora la precisión o es neutra; y (c) corrige un sesgo demostrado (en el backtest o, si el backtest no tiene los datos, en un informe actual con las cifras escritas en él). Si empeora algo o no se puede probar ni por datos ni por coherencia, se rechaza. Si no pasa ninguna, no hay v12.

**Datos:** en los casos del backtest solo se usan campos que ya existen; no se añaden datos nuevos a los casos (escribirlos hoy sería sesgo retrospectivo). En los informes, los campos nuevos solo se leen de lo que el propio informe ya dice (cifra y línea citadas), sin escribir en los `datos.json`: se pasan al motor en memoria.

### Mejora 1. Crecimiento orgánico

- **Hipótesis:** en compradores en serie (Howmet, Quanta, Comfort Systems, GE Vernova) el crecimiento de los 12 meses siguientes (`valoracion.crecimiento_actual_pct`) lleva compras y el del año objetivo (`crecimiento_obj_pct`) es orgánico: la rebaja del múltiplo por desaceleración compara dos cosas distintas y exagera el frenazo; y la proyección mecánica proyecta dos años una compra que deja de sumar al cumplir un año.
- **Regla:** campo opcional `crecimiento.crecimiento_actual_organico_pct` (crecimiento esperado de las ventas en los 12 meses siguientes sin compras ni ventas de negocios, misma ventana que `crecimiento_actual_pct`). Si existe: (1) crecimiento de partida de la proyección = mín(partida mecánica, orgánico), antes del recorte por la guía (solo recorta); (2) en la rebaja por desaceleración, el crecimiento actual es el orgánico. El EV/ventas NTM, el EV/beneficio bruto y el margen implícito no cambian (las ventas de los 12 meses siguientes sí llevan lo comprado). Sin el campo, igual que v11.
- **Prueba prevista:** ningún caso del backtest tiene el dato: v12 = v11 por construcción, y se comprueba al correr. Se evalúa por coherencia y en los informes que lo citan.

### Mejora 2. Euforia en las valoradas por EBITDA

- **Hipótesis:** en industriales el veto de euforia actual (subida ≥ 150 % con EV/beneficio bruto > 20) casi no actúa: suben menos y el beneficio bruto es bajo. La euforia en ellos se ve en el múltiplo frente a su historia con una subida fuerte (Quanta, Comfort Systems).
- **Regla:** si la métrica es EBITDA, `mediana_3a` existe, el múltiplo de hoy > 1,5 × su mediana de 3 años y la subida a 12 meses ≥ U, entonces euforia. U se elige entre 60, 80 y 100 **solo con la muestra de entrenamiento**: valoradas por EBITDA con fecha hasta dic-2022 (Rheinmetall 2022 de la fase 1 y Eaton, Generac, Rheinmetall y Vestas 2022 de `casos3`); validación aparte: `casos3` de 2023-2024 (9). Se elige el U con menos casos marcados que baten al QQQ, con al menos 3 marcados; a igualdad, el menor U. **Si ningún U marca 3 casos en el entrenamiento, no hay muestra: queda como alerta (U = 80, el centro del rango) y no veta.**
- **Contraste auxiliar** (no decide el veto, porque la regla es solo para EBITDA): la misma condición sobre las valoradas por EV/ventas (EV/ventas NTM > 1,5 × mediana y subida ≥ U), entrenando con 2019, 2021 y fase 1 (≥ 5 marcados) y validando con 2023.

### Mejora 3. Doble castigo con crecimientos > 60 %

- **Hipótesis:** cuando el crecimiento de partida mecánico supera el tope del 60 %, la proyección ya está recortada; si además la rebaja del múltiplo se mide desde el crecimiento real (p. ej. 107 % en Insmed) se castiga dos veces la misma desaceleración.
- **Regla:** si la partida mecánica sin topar supera el 60 % (el tope actúa), la rebaja por desaceleración se mide desde mín(crecimiento actual, partida de la proyección). Además, alerta (no cambia nada) si las ventas mecánicas base < 0,85 × las del informe (`ventas_objetivo_m.base`) o el consenso (`consenso_ventas_obj_m`).
- **Prueba prevista:** los casos con el tope activo y crecimiento actual > 60 % son sobre todo fracasos de la fase 1 en su pico (Zoom 2020, Peloton 2021, Beyond Meat 2019, Snowflake 2021) y Square 2021 en los neutrales. **Riesgo fijado de antemano:** si la mejora convierte en Comprar alguno de esos fracasos, se rechaza.

### Mejora 4. Guía anual frente a objetivo a medio plazo

- **Hipótesis:** (a) cuando la empresa no da guía anual y lo que hay es un objetivo a medio plazo (Saab), el exceso medido frente a la primera guía anual del año anterior mezcla dos referencias; (b) cuando el exceso del año pasado fue grande pero el año en curso cumple justo (TransMedics: +14,6 pp en 2025, casi nada en 2026), el exceso del año pasado sobrestima lo que suele batir hoy.
- **Regla:** campos opcionales `crecimiento.tipo_guia` ('anual' | 'medio_plazo'), `crecimiento.exceso_guia_mp_pp` (exceso del último ejercicio sobre el objetivo a medio plazo vigente al empezar ese ejercicio) y `crecimiento.exceso_guia_actual_pp` (crecimiento implícito en la guía vigente del año en curso menos el de su primera guía; solo si ya hay al menos dos trimestres publicados de ese año). v12: con 'medio_plazo', el exceso que se suma a la guía es `exceso_guia_mp_pp`; y si `exceso_guia_actual_pp` ≤ 2 pp (el año en curso «cumple justo»), el exceso es el menor de los dos años. Sin los campos, igual que v11.
- **Prueba prevista:** ningún caso del backtest tiene estos campos (y solo 13 tienen guía): v12 = v11 por construcción. Se evalúa por coherencia y en los informes (Saab, TransMedics y los que guían por años).

## 2. Resultados en el backtest (`node herramientas/growth-backtest-v12.mjs`, sin escribir nada)

**Comprobación previa:** ninguno de los 84 casos (20 de la fase 1, 51 neutrales y 13 industriales) tiene `crecimiento_actual_organico_pct`, `tipo_guia`, `exceso_guia_mp_pp` ni `exceso_guia_actual_pp`, como se esperaba. Las mejoras 1 y 4 son, por tanto, idénticas a v11 en el backtest **por construcción**: no se pueden probar con resultados, solo por coherencia y en los informes. No se han añadido esos datos a los casos (escribirlos hoy, sabiendo el final, sería sesgo retrospectivo).

| Variante (v11 + una mejora) | Fase 1: ganadoras / fracasos con Comprar | Ajuste 2019-21: compras, baten al QQQ (margen 95 %) | Validación 2023 | Las 51 | Industriales (`casos3`) | Señales que cambian |
|---|---|---|---|---|---|---|
| v11 (vigente) | 7/13 y 0/7 | 4 de 34, 4 baten (100 %; 51-100) | 2 de 17, 1 bate (50 %; 9-91) | 6 de 51, 5 baten (83 %; 44-97) | 2 de 13, 1 bate | — |
| 1. Orgánico | igual | igual | igual | igual | igual | 0 (ningún caso tiene el dato) |
| 2. Euforia EBITDA como veto (U = 60, 80 o 100) | igual | igual | igual | igual | igual | 0 (ningún caso pasa de 1,5 × su mediana) |
| 3. Desaceleración desde la partida topada | igual | igual | igual | igual | igual | 0, pero sube la ponderada de tres fracasos |
| 4. Tipo de guía y exceso del año en curso | igual | igual | igual | igual | igual | 0 (ningún caso tiene el dato) |
| **v12 (v11 + 1 + alertas de 2 y 3)** | 7/13 y 0/7 | 4 de 34, 4 baten | 2 de 17, 1 bate | 6 de 51, 5 baten (83 %; 44-97) | 2 de 13, 1 bate | **0** |

Exceso medio de las compras frente al QQQ a 24 meses, igual en todas: +371 pp en el ajuste, −15 pp en la validación, +243 pp en las 51 y −21 pp en los industriales. Peor compra, igual: Exact Sciences 2023 (−36 %) y Enphase 2023 (−70 %).

### Mejora 2: elección del umbral

- **Valoradas por EBITDA, entrenamiento** (Rheinmetall 2022 de la fase 1 y Eaton, Generac, Rheinmetall y Vestas 2022): **0 de 5 casos** tienen el múltiplo > 1,5 × su mediana, con cualquier U. **Validación** (9 de 2023-2024): 0 de 9. El que más se acerca es Comfort Systems 2023 (1,42 × y +64 %), que fue una ganadora (+121 % a 24 meses). Sin ningún caso marcado no se puede elegir U ni probar un veto: **por la regla fijada, queda como alerta con U = 80 y no veta.**
- **Contraste con las valoradas por EV/ventas** (no decide, pero informa): en el entrenamiento (fase 1, 2019 y 2021) la condición marca 14 de 53 casos con cualquier U (todos los marcados habían subido más del 100 %), y solo 3 batieron (21 %, frente al 38 % de todo el entrenamiento). Pero entre los marcados están **dos de las compras ganadoras de v11, Nvidia 2016 y Roku 2019**: un veto las habría quitado. En la validación (2023) no marca ninguno. Conclusión: como señal de riesgo apunta en la buena dirección; como veto, quitaría ganadoras. Confirma alerta y no veto.

### Mejora 3: lo que mueve

Solo actúa en tres casos, los tres con el tope del 60 % activo y crecimiento real muy por encima:

| Caso | v11: ponderada, señal | Mejora 3: ponderada, señal | Factor de desaceleración | Qué pasó después |
|---|---|---|---|---|
| Snowflake nov-2021 (fase 1) | −9,4 %, Mantener | **+10,2 %**, Mantener (la frenan el bajista y el EV/beneficio bruto > 35) | 0,78 → 0,96 | −67 % a 36 meses |
| Beyond Meat jul-2019 (fase 1) | −35 %, Vender | −15,5 %, Vender | 0,70 → 0,91 | −87 % a 36 meses |
| Square mar-2021 (neutral) | −14,4 %, Vender | −13,9 %, Vender | 0,70 → 0,71 | −70 % a 24 meses (QQQ +0,6 %) |

No cambia ninguna señal, pero **las tres subidas son de fracasos en su pico**: el «doble castigo» acertó. En Zoom 2020 y Peloton 2021 no cambia nada (el suelo de 0,7 actúa igual). La hipótesis de sesgo no se sostiene: con crecimientos > 60 % el crecimiento real de hoy es justo lo que no se repite, y castigar el múltiplo desde ahí es prudente.

## 3. Efecto en los informes actuales (40 informes de `informes-growth/`, datos de las 17:55; `calc` sigue en v11)

### Datos leídos de los informes (no escritos en los `datos.json`)

| Informe | Campo | Valor | De dónde sale |
|---|---|---|---|
| Howmet | `crecimiento_actual_organico_pct` | 15 | informe, sensibilidad: «orgánico (15 % en vez de 18,6 % con CAM)» |
| Quanta Services | ídem | 21 | informe, mejoras: «la partida bajaría del 28 % a ~21 %» |
| GE Vernova | ídem | 13 | `nota_guia`: guía del 2S26 «sin [Prolec], ~+13 %» |
| Comfort Systems | ídem | 30,2 | `crecimiento_actual_pct` (33,7) menos las 3-4 pp de compras que da `nota_guia` |
| DoorDash | ídem | 21 | informe: «el resto al +20-22 % orgánico» |
| Zscaler | ídem | 17 | `nota_guia`: guía FY27 +17 % «casi orgánico» |
| Saab | `tipo_guia`, `exceso_guia_mp_pp` | medio_plazo, 7,6 | 2025 orgánico +25,6 % menos el objetivo vigente al empezar 2025 (~18 %, subido en el 4T24) |
| TransMedics | `exceso_guia_actual_pp` | 0,8 | primera guía 2026 742 M (+22,5 %), vigente 747 M (+23,4 %) sobre 605,5 M de 2025 |
| Natera, Eli Lilly, Vertex | ídem | 9,6; 6,9; 1,1 | primera guía 2026 frente a la vigente (`nota_guia`) |
| Howmet, Quanta, Comfort | ídem | 11,8; 21,1; ~20 | ídem |

Quanta y Comfort no dan una cifra orgánica de los 12 meses siguientes tal cual; las de arriba son las que el propio informe usa o se restan con su cifra de compras. Hay que confirmarlas al rellenar el campo.

### Qué cambia

| Informe | v11 | Mejora 1 (= v12) | Por qué |
|---|---|---|---|
| **GE Vernova** | Vender, −14,8 %, compra hasta 814 USD | **Mantener**, −2,5 %, compra hasta 932 USD | La rebaja del múltiplo comparaba 18 % (con Prolec) con un 10 % orgánico; con el 13 % orgánico, factor 0,75 → 0,88 |
| Howmet | Mantener, −9,8 %, hasta 186 USD | Mantener, −1,7 %, hasta 203 USD | factor 0,82 → 0,91; sigue fuera por puntuación (59,7) y rentabilidad |
| Quanta Services | Vender, −18,8 % | Vender, −10,1 % | factor 0,72 → 0,85; sigue en Vender |
| Comfort Systems | Vender, −17,6 % | Vender, −14,4 % | factor 0,70 → 0,73 |
| DoorDash | Mantener (vigilancia), +0,8 % | Mantener (vigilancia), +4,0 % | factor 0,88 → 0,93; le falta 1 punto para Comprar |
| Zscaler | Comprar (baja), +12,2 %, hasta 244,3 | Comprar (baja), +12,3 %, hasta 244,6 | casi nada (compras < 2 pp) |

- **Mejora 2 (alerta):** no salta en ningún informe. Quanta (1,43 ×, +60 %) y Comfort Systems (1,41 ×, +92 %) se quedan justo por debajo de 1,5 ×; las dos ya son Vender con v11. No se baja el umbral a la vista de estos dos casos.
- **Mejora 3:** la regla subiría Insmed de −30,2 % a −18,3 % (sigue en Vender) y pasaría **Palantir de Vender a Mantener**: rechazada (§2). La alerta sí entra: salta en Insmed (mecánica 2.748 M frente a 3.300 del informe y 3.357 del consenso), Palantir (14.873 frente a 17.900), Celestica (30.865 frente a 38.000) y Besi (1.178 frente a 1.450 y 1.670).
- **Mejora 4:** no cambia ninguna cifra. En Saab la guía más el exceso (20 + 7,6) sigue por encima de la partida mecánica (24 %); en TransMedics la partida baja de 29,9 % a 26,6 %, pero v11 ya usa las ventas del informe (940 M), más bajas que cualquiera de las dos mecánicas, así que la ponderada sigue en −9,0 %. Natera, Eli Lilly y las demás baten la guía de este año en más de 2 pp: la regla no actúa.
- **Cartera (Nu, Axon, Shopify, Snowflake, Samsara) y suplentes (MongoDB, Toast, Zscaler, Dexcom, Datadog, argenx, Natera, Saab): ninguna cambia de señal ni de límite** (Zscaler, +0,3 USD en el «compra hasta»).

## 4. Decisión

| Mejora | Decisión | Motivo |
|---|---|---|
| 1. Crecimiento orgánico | **Adoptada en v12** | Neutra en el backtest (por construcción) y corrige un error de coherencia demostrado con las cifras de Howmet y GE Vernova: el crecimiento del año objetivo nunca lleva compras (no se proyectan) y el de hoy sí. Cambia GE Vernova de Vender a Mantener; nada en cartera. |
| 2. Euforia por múltiplo de EBITDA | **Solo alerta** (1,5 × mediana y subida ≥ 80 %) | Ningún caso de entrenamiento ni de validación la cumple; en el contraste con EV/ventas, un veto habría quitado Nvidia 2016 y Roku 2019. |
| 3. Doble castigo con > 60 % | **Rechazada la regla; entra solo la alerta** | Las tres veces que actúa sube el objetivo de un fracaso en su pico (Snowflake 2021 de −9 % a +10 %). El castigo era prudente, no un sesgo. |
| 4. Guía anual o a medio plazo | **Rechazada** | No cambia nada ni en el backtest ni en los informes: v11 (ventas del analista como tope) ya cubre el caso de TransMedics, y en Saab no actúa. Se deja como regla de datos: decir en `nota_guia` si la guía es anual o un objetivo a medio plazo. |

**v12 = v11 + crecimiento orgánico + dos alertas.** Probado: con todas las versiones anteriores (v1-v11) las salidas son idénticas antes y después del cambio en los 84 casos y los 40 informes (1.364 cálculos, 0 diferencias); `VIGENTE` sigue en v11. Se ve con `node motor/growth.mjs <datos.json> --version v12` (no escribe).

**Lectura honesta:** v12 no es una mejora demostrada con resultados. El backtest no tiene datos orgánicos (habría que reconstruirlos de las memorias de cada fecha, sin saber el final: muestra futura). Es una corrección de coherencia de bajo riesgo: solo actúa donde el analista escribe el orgánico, y depende de esa cifra, así que debe salir de lo que publica la empresa (crecimiento orgánico o «sin compras» en la nota de resultados o en el 10-Q). **Recomendación:** hacerla vigente cuando Howmet, Quanta, GE Vernova, Comfort Systems y DoorDash tengan `crecimiento_actual_organico_pct` escrito con fuente; sin ese campo, v12 da lo mismo que v11. Regla de datos (añadida al ver los resultados, no cambia el código): rellenarlo solo si las compras o ventas de negocios mueven el crecimiento de los 12 meses siguientes más de 2 pp.

## 5. Borrador para `metodo.md` §7 (no aplicado)

- 14-oct-2026 (noche): **candidata v12** (no vigente; [backtest/resultados-v12.md](backtest/resultados-v12.md)). v12 = v11 + **crecimiento orgánico**: con el campo `crecimiento.crecimiento_actual_organico_pct` (crecimiento de los 12 meses siguientes sin compras ni ventas de negocios; se rellena si estas mueven más de 2 pp), la proyección parte como mucho del orgánico y la rebaja del múltiplo por desaceleración se mide desde él, porque el crecimiento del año objetivo ya es orgánico. Además, dos alertas que no cambian nada: euforia en las valoradas por EBITDA (múltiplo > 1,5 × su mediana de 3 años y subida ≥ 80 % en 12 meses) y proyección mecánica < 0,85 × la del informe o el consenso. En el backtest es neutra (ningún caso tiene el dato; ninguna señal cambia en 84). En los informes cambia GE Vernova (Vender → Mantener) y sube la rentabilidad de Howmet, Quanta, Comfort Systems y DoorDash sin cambiar su señal; nada en cartera ni en suplentes. Probadas y rechazadas: medir la desaceleración desde la partida topada cuando se crece > 60 % (subía el objetivo de Snowflake 2021, Beyond Meat 2019 y Square 2021, tres fracasos), el veto de euforia por múltiplo de EBITDA (ningún caso para probarlo; con EV/ventas habría quitado Nvidia 2016 y Roku 2019) y la regla de guía anual o a medio plazo (sin efecto: v11 ya lo cubre).

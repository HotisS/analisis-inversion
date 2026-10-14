# Backtest growth: candidata v9 («proyectar desde la guía de la empresa»)

## Definición, fijada antes de mirar resultados (14-oct-2026)

**v9 = v7 + recorte por la guía.** En la proyección mecánica de ventas, el crecimiento de partida `g1` (el de v7: media entre el pasado —mitad 12 meses, mitad último trimestre— y el CAGR propio a 2 años, entre −20 % y +60 %) pasa a ser

`g1 = mín(g1 de v7, guia_12m_pct + exceso_guia_pp)`

- `crecimiento.guia_12m_pct`: crecimiento de ingresos que la empresa guiaba en la fecha para los 12 meses siguientes (en la práctica, el punto medio de la guía del ejercicio en curso o siguiente publicada antes de la fecha; si solo hay guía trimestral, no se extrapola: `null`).
- `crecimiento.exceso_guia_pp`: lo que, de media, el crecimiento real superó al guiado (punto medio) en los últimos 4 trimestres publicados, en puntos porcentuales; si no se conoce, 0 (= la guía tal cual).
- Solo recorta, nunca sube. Sin guía (`null`), igual que v7. El resto (decaimiento del 15 % anual, escenarios ×0,5 y ×1,2, múltiplos, filtros y señal) igual que v7.
- Si `valoracion.crecimiento_actual_pct` viene vacío, el crecimiento de los 12 meses siguientes (EV/ventas y EV/beneficio bruto NTM) sale de `g1`, y por tanto también se recorta.
- Regla de elección: la de `metodo.md` §6 / `protocolo.md` §4 (mejor precisión de Comprar a 24 m en el ajuste —fase 2 2019-21 + fase 1— con al menos 5 compras; a igualdad, mayor exceso). La validación (2023) se publica tal cual.
- Cómo se mide el exceso (fijado antes de buscar los datos): si la empresa da guía trimestral, media de los 4 últimos trimestres de (crecimiento interanual real − crecimiento del punto medio de la guía dada al empezar ese trimestre); si solo da guía anual, (crecimiento real del último ejercicio − crecimiento de la primera guía anual de ese ejercicio). La guía es la del ejercicio en curso si la fecha cae en su primera mitad, y la del ejercicio siguiente si ya existe; nunca la del consenso. Las cifras de memoria se marcan.
- Solo puede cambiar Comprar → Mantener/Vender (recorta ventas, no toca múltiplos con `crecimiento_actual_pct` relleno), así que la guía solo se busca para los casos que v7 u v8 compran (13 de 71); el resto queda igual que v7 por construcción y se dice.

## Datos de guía usados (13 casos que v7 u v8 compran)

Los 58 casos restantes no compran con v7 ni con v8; como v9 solo recorta ventas, no pueden pasar a Comprar y su resultado en las medidas del protocolo (que solo distinguen Comprar / no Comprar) es idéntico por construcción: no se buscó su guía (campo ausente = sin cambio).

| Caso | Guía 12 m | Exceso | Partida v9 (v7) | v7: ponderada / base | v9: ponderada / base | Señal v7 → v9 | Con la guía sin exceso | 24 m (36 m en fase 1) |
|---|---|---|---|---|---|---|---|---|
| Axon 2023-03 | 20 | +17,3 | 34,1 (34,1) | +28,2 / +31,7 | +28,2 / +31,7 | Comprar → Comprar | Mantener (+4,5 / +7,3) | +173 % |
| CrowdStrike 2020-06 | 59,3 | +9 [mem.] | 60 (60) | +22,0 / +25,1 | igual | Comprar → Comprar | Comprar | +69 % |
| Duolingo 2023-03 | 33,2 | +4 [mem.] | 37,2 (37,3) | +17,5 / +11,9 | +17,4 / +11,9 | Comprar → Comprar | Comprar | −3 % |
| Nvidia 2016-11 | null (solo trimestral) | — | 35,1 | +5,2 / +7,9 | igual | Comprar → Comprar | — | +128 % |
| Palantir 2023-05 | 14,8 | +1,7 [mem.] | 16,5 (17,1) | +17,3 / +12,3 | +16,3 / +11,3 | Comprar → Comprar | Comprar | +1.308 % |
| Shopify 2017-02 | 51,6 | +19 [mem.] | 60 (60) | +30,0 / +33,3 | igual | Comprar → Comprar | Comprar | +833 % |
| Tesla 2019-10 | null (guía de entregas) | — | 20,3 | +5,7 / +14,1 | igual | Comprar → Comprar | — | +917 % |
| Roku 2019 | 36,4 | null | 36,4 (40,9) | +17,7 / +20,9 | +10,8 / +13,8 | Comprar → Comprar | Comprar | +405 % |
| Square 2019 | 32,8 | null | 32,8 (42,7) | +25,7 / +29,0 | +9,9 / +12,9 | Comprar → Comprar | Comprar | +203 % |
| Tesla 2019 | null (guía de entregas) | — | 60 | +110,6 / +97,7 | igual | Comprar → Comprar | — | +1.093 % |
| Twitter 2019 | null (solo trimestral) | — | 19,2 | +6,8 / +9,4 | igual | Comprar → Comprar | — | +94 % |
| Exact Sciences 2023 | 9,9 | +4,7 | 14,6 (14,5) | +11,5 / +14,9 | igual | Comprar → Comprar | Mantener (+2,3 / +5,4) | −36 % |
| Shopify 2023 | null (solo trimestral) | — | 21,8 | +23,3 / +17,4 | igual | Comprar → Comprar | — | +99 % |

Fuentes de las guías: notas de resultados y 8-K de la SEC de cada fecha (Axon: 8-K de may-2022 con la guía previa de 1.040 M; Exact Sciences: guía 2023 de 2.265-2.315 M y primera guía 2022 de 1.975-2.027 M; Duolingo: guía 2023 de 486-498 M), y los datos ya recogidos en cada caso. «[mem.]» = de memoria, sin comprobar. Detalle en `crecimiento.nota_guia` de cada caso.

## Resultados (mismo protocolo y regla de elección)

| Versión | Fase 1 (20 famosos): ganadoras / fracasos con Comprar | Ajuste fase 2 2019-21: compras, precisión 24 m, exceso medio vs QQQ | Validación 2023: compras, precisión | Las 51: compras, precisión (margen 95 %) | Peor compra |
|---|---|---|---|---|---|
| v7 (vigente) | 7/13 y 0/7 | 4, 100 % (51-100), +371 pp | 2, 50 % (9-91) | 6, 83 % (44-97) | −36 % |
| v8 | 6/13 y 0/7 | 4, 100 % (51-100), +371 pp | 2, 50 % (9-91) | 6, 83 % (44-97) | −36 % |
| **v9** | **7/13 y 0/7** | **4, 100 % (51-100), +371 pp** | **2, 50 % (9-91)** | **6, 83 % (44-97)** | −36 % |

(Los márgenes por remuestreo de las 51 varían ±6 pp entre filas solo porque el generador de azar es común a todas las versiones; las compras son las mismas.)

**Casos que cambian de señal: ninguno.** v9 compra exactamente lo mismo que v7 en los 71 casos. Recorta la ponderada donde la empresa guiaba por debajo de la mecánica (Square 2019 de +25,7 % a +9,9 %, Roku 2019 de +17,7 % a +10,8 %, Palantir 2023 un punto), sin llegar a quitar ninguna compra. Todas las ganadoras compradas tenían una guía (más su exceso habitual) por encima de lo que hacía falta para comprar.

**Variante de control, «guía tal cual» (sin sumar el exceso)**, que no es la candidata: quitaría dos compras, Axon 2023 (+173 % a 36 meses; guiaba ≥ 20 % y creció un 31 %) y Exact Sciences 2023 (−36 % a 24 meses, en la validación). Una buena y una mala: no mejora y confirma que sumar el exceso sobre la guía es necesario (Axon batía su guía anual en 17 pp).

**Tasa de acierto realista con v9**: la misma que v7 (las 51: 6 compras, 5 baten al Nasdaq-100, 83 %, margen 44-97 %; lo prudente es esperar algo más de la mitad). El backtest **no puede decir si v9 es mejor**: con 0 casos que cambien, no hay evidencia a favor ni en contra; solo muestra que no estropea ninguna compra pasada. Ojo: en 6 de los 13 casos la guía es null (solo guía trimestral o de unidades), así que la regla tampoco se ha probado ahí.

## Efecto en las 8 empresas de las tandas 4 y 5 (datos de 14-oct-2026, sin revisar precios)

Regla de datos añadida al aplicarla a fechas de octubre (después del backtest, porque en los casos todas las fechas caían en la primera mitad del ejercicio): si el ejercicio guiado ya pasó su primera mitad y no hay guía del siguiente, se usa el crecimiento implícito en lo que queda del año guiado.

| Empresa | Guía 12 m | Exceso | Partida v7 → v9 | v7: ponderada → señal | v9: ponderada → señal | Precio máx. v7 → v9 | Sin exceso |
|---|---|---|---|---|---|---|---|
| Datadog | 26,8 (2S26 implícito) | +5,7 (aprox.) | 31,1 → 31,1 | +10,9 % Comprar (media) | igual | 299,3 → 299,3 | Mantener en vigilancia (+4,4 %) |
| Duolingo | 11,2 (2S26 implícito) | +1,2 | 29,1 → 12,4 | +40,6 % Comprar (baja) | **+12,7 % Comprar (baja)** | 187,5 → 150,4 | Comprar (+10,8 %) |
| Wise | 17,5 (FY27, tipo constante) | +1,5 | 21,4 → 19,0 | +7,6 % Comprar (baja) | **+4,3 % Mantener en vigilancia** | 12,5 → 12,1 | Mantener (+2,1 %) |
| Celestica | 65 (2027, «> 65 %») | null | 60 → 60 | −26,2 % Vender | igual | 251,1 | igual |
| Snowflake | 35,7 (producto, resto del año) | +5,9 (aprox.) | 31,9 → 31,9 | +11,1 % Comprar (media) | igual | 378,5 | igual |
| Samsara | 23,0 (2S FY27 implícito) | +6,2 | 29,8 → 29,2 | +20,6 % Comprar (media) | +19,6 % Comprar (media) | 47,4 → 47,0 | Comprar (+9,5 %) |
| Zscaler | 17,0 (FY27) | +2,9 | 24,8 → 19,9 | +22,9 % Comprar (baja) | **+14,2 % Comprar (baja)** | 267,1 → 248,6 | Comprar (+9,3 %) |
| Dexcom | 10,0 (2S26 implícito) | null | 13,4 → 10,0 | +16,7 % Comprar (baja) | **+10,5 % Comprar (baja)** | 94,5 → 89,5 | igual |

Con v9 solo cambia de señal **Wise** (Comprar → Mantener en vigilancia, por 0,7 puntos de ponderada). Datadog se queda en Comprar porque suele batir su guía (sin ese exceso pasaría a vigilancia, como decía su informe). Duolingo, Zscaler y Dexcom siguen en Comprar con mucho menos margen y menor precio máximo. Los campos de guía están en `crecimiento.guia_12m_pct`, `exceso_guia_pp` y `nota_guia` de cada `datos.json`; para verlo: `node motor/growth.mjs informes-growth/<carpeta>/datos.json --version v9` (no escribe nada porque v9 no es la vigente).

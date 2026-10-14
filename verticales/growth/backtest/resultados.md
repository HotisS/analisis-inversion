# Backtest del método growth: resultados

Lo genera `node herramientas/growth-backtest.mjs`. 20 casos (13 ganadoras, 7 fracasos), con los datos de cada fecha. Versión vigente: **v4**.

## Resumen por versión

| Versión | Qué cambia | Ganadoras con Comprar | Fracasos con Comprar | Aciertos | Compras | Rent. media 12 m de las compras | 36 m | Rent. media 12 m de todos los casos |
|---|---|---|---|---|---|---|---|---|
| v1 | Primera versión (14-oct, 14:30) | 0/13 | 0/7 | 7/20 | 0 | — % | — % | +116 % |
| v2 | Objetivo con el múltiplo de hoy (sin vuelta a la media), rebaja suave por desaceleración | 3/13 | 1/7 | 9/20 | 4 | +68 % | +256 % | +116 % |
| v3 | v2 + filtro de valoración (EV/beneficio bruto ≤ 35) + euforia que veta + listones 60 puntos y 15 % | 3/13 | 0/7 | 10/20 | 3 | +110 % | +358 % | +116 % |
| v4 | v3 + el alcista puede volver a su mediana o a comparables (techo ×1,6) + compra si el precio no exige más múltiplo (base ≥ 0, ponderada ≥ 10 %) con ≥ 4 señales | 5/13 | 0/7 | 12/20 | 5 | +114 % | +476 % | +116 % |
| v5 | v4 pidiendo 2 señales en vez de 4 | 5/13 | 0/7 | 12/20 | 5 | +114 % | +476 % | +116 % |
| v6 | v4 sin mínimo de señales (cuentan solo dentro de la puntuación) | 5/13 | 0/7 | 12/20 | 5 | +114 % | +476 % | +116 % |
| v7 | v6 con ponderada ≥ 5 % | 7/13 | 0/7 | 14/20 | 7 | +177 % | +489 % | +116 % |
| v8 | v7 + proyección que respeta la desaceleración + la señal de múltiplo no cuenta si ya está > 1,3 × su mediana | 6/13 | 0/7 | 13/20 | 6 | +116 % | +418 % | +116 % |

## Detalle

### v1: Primera versión (14-oct, 14:30)

| Caso | Tipo | Momento | Punt. | Señales | EV/vtas ÷ crec. | Ponderada | Base | Bajista | Señal | Motivo | 12 m después | 36 m después |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| AppLovin 2024-02-20 | ganadora | principio | 75.8 | 7 (euforia) | 0.18 | -33 % | -33 % | -74 % | **Vender** | ponderada ≤ -10 % | +672 % | +378 % |
| Axon Enterprise 2023-03-01 | ganadora | mitad | 86.8 | 7 | 0.47 | +6 % | +15 % | -48 % | **Mantener** | no compra: ponderada < 20 %, bajista peor que -45 % | +50 % | +173 % |
| Beyond Meat 2019-07-26 | fracaso | pico | 73 | 6 (euforia) | 0.5 | -66 % | -66 % | -86 % | **Vender** | ponderada ≤ -10 % | -42 % | -87 % |
| Celestica 2024-02-01 | ganadora | principio | 49 | 6 (euforia) | 0.06 | -40 % | -40 % | -69 % | **Vender** | puntuación < 50 | +264 % | +825 % |
| CrowdStrike 2020-06-05 | ganadora | principio | 80.7 | 6 | 0.43 | -18 % | -18 % | -64 % | **Vender** | ponderada ≤ -10 % | +154 % | +69 % |
| Duolingo 2023-03-01 | ganadora | principio | 84.2 | 7 | 0.25 | +8 % | +8 % | -46 % | **Mantener** | no compra: ponderada < 20 %, base < 10 %, bajista peor que -45 % | +120 % | -3 % |
| Meta Platforms 2023-02-03 | ganadora | principio | 53.7 | 6 | 1.28 | -7 % | -4 % | -53 % | **Mantener** | no compra: puntuación < 70, ponderada < 20 %, base < 10 %, bajista peor que -45 % | +155 % | +275 % |
| Netflix 2013-01-25 | ganadora | principio | 56.2 | 7 | 0.17 | -14 % | +0 % | -67 % | **Vender** | ponderada ≤ -10 % | +126 % | +309 % |
| NVIDIA 2016-11-15 | ganadora | principio | 77.7 | 6 (euforia) | 0.23 | -64 % | -64 % | -80 % | **Vender** | ponderada ≤ -10 % | +125 % | +128 % |
| NVIDIA 2023-03-01 | ganadora | mitad | 58 | 6 | 1.92 | -33 % | -26 % | -57 % | **Vender** | ponderada ≤ -10 % | +258 % | +695 % |
| Palantir Technologies 2021-02-01 | fracaso | pico | 72 | 6 (euforia) | 1.5 | -42 % | -42 % | -74 % | **Vender** | ponderada ≤ -10 % | -59 % | -50 % |
| Palantir Technologies 2023-05-10 | ganadora | principio | 66.2 | 7 | 0.65 | +15 % | +16 % | -36 % | **Mantener** | no compra: puntuación < 70, ponderada < 20 % | +119 % | +1308 % |
| Peloton Interactive 2021-01-15 | fracaso | pico | 78.2 | 7 (euforia) | 0.12 | -71 % | -68 % | -85 % | **Vender** | ponderada ≤ -10 % | -77 % | -96 % |
| Rheinmetall 2022-03-15 | ganadora | principio | 55 | 6 | 0.11 | -25 % | -24 % | -60 % | **Vender** | ponderada ≤ -10 % | +48 % | +736 % |
| Rivian Automotive 2021-12-01 | fracaso | pico | 27.8 | 1 | — | -33 % | -23 % | -50 % | **Vender** | puntuación < 50 | -73 % | -90 % |
| Shopify 2017-02-20 | ganadora | principio | 76.7 | 6 (euforia) | 0.17 | -6 % | -3 % | -57 % | **Mantener** | no compra: ponderada < 20 %, base < 10 %, bajista peor que -45 % | +127 % | +833 % |
| Snowflake 2021-11-15 | fracaso | pico | 74.7 | 6 | 0.85 | -32 % | -32 % | -70 % | **Vender** | ponderada ≤ -10 % | -61 % | -67 % |
| Teladoc Health 2021-02-16 | fracaso | pico | 74.5 | 5 | 0.71 | -80 % | -80 % | -93 % | **Vender** | ponderada ≤ -10 % | -72 % | -93 % |
| Tesla 2019-10-25 | ganadora | principio | 61.8 | 7 | 0.12 | -6 % | +5 % | -51 % | **Mantener** | no compra: puntuación < 70, ponderada < 20 %, base < 10 %, bajista peor que -45 % | +541 % | +917 % |
| Zoom Video Communications 2020-10-15 | fracaso | pico | 85.2 | 7 (euforia) | 0.51 | -41 % | -33 % | -72 % | **Vender** | ponderada ≤ -10 % | -48 % | -88 % |

### v2: Objetivo con el múltiplo de hoy (sin vuelta a la media), rebaja suave por desaceleración

| Caso | Tipo | Momento | Punt. | Señales | EV/vtas ÷ crec. | Ponderada | Base | Bajista | Señal | Motivo | 12 m después | 36 m después |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| AppLovin 2024-02-20 | ganadora | principio | 75.8 | 7 (euforia) | 0.18 | 0 % | +3 % | -56 % | **Mantener** | no compra: ponderada < 20 %, base < 10 %, bajista peor que -50 % | +672 % | +378 % |
| Axon Enterprise 2023-03-01 | ganadora | mitad | 86.8 | 7 | 0.47 | +51 % | +55 % | -31 % | **Comprar** | cumple todos los requisitos de compra | +50 % | +173 % |
| Beyond Meat 2019-07-26 | fracaso | pico | 73 | 6 (euforia) | 0.5 | -35 % | -33 % | -72 % | **Vender** | ponderada ≤ -10 % | -42 % | -87 % |
| Celestica 2024-02-01 | ganadora | principio | 49 | 6 (euforia) | 0.06 | +3 % | +6 % | -43 % | **Vender** | puntuación < 50 | +264 % | +825 % |
| CrowdStrike 2020-06-05 | ganadora | principio | 80.7 | 6 | 0.43 | +22 % | +25 % | -47 % | **Comprar** | cumple todos los requisitos de compra | +154 % | +69 % |
| Duolingo 2023-03-01 | ganadora | principio | 84.2 | 7 | 0.25 | +19 % | +22 % | -39 % | **Mantener** | no compra: ponderada < 20 % | +120 % | -3 % |
| Meta Platforms 2023-02-03 | ganadora | principio | 53.7 | 6 | 1.28 | -6 % | -4 % | -38 % | **Mantener** | no compra: puntuación < 70, ponderada < 20 %, base < 10 % | +155 % | +275 % |
| Netflix 2013-01-25 | ganadora | principio | 56.2 | 7 | 0.17 | -2 % | +0 % | -44 % | **Mantener** | no compra: puntuación < 70, ponderada < 20 %, base < 10 % | +126 % | +309 % |
| NVIDIA 2016-11-15 | ganadora | principio | 77.7 | 6 (euforia) | 0.23 | +12 % | +15 % | -44 % | **Mantener** | no compra: ponderada < 20 % | +125 % | +128 % |
| NVIDIA 2023-03-01 | ganadora | mitad | 58 | 6 | 1.92 | -27 % | -26 % | -50 % | **Vender** | ponderada ≤ -10 % | +258 % | +695 % |
| Palantir Technologies 2021-02-01 | fracaso | pico | 72 | 6 (euforia) | 1.5 | +26 % | +29 % | -43 % | **Comprar** | cumple todos los requisitos de compra | -59 % | -50 % |
| Palantir Technologies 2023-05-10 | ganadora | principio | 66.2 | 7 | 0.65 | +13 % | +16 % | -34 % | **Mantener** | no compra: puntuación < 70, ponderada < 20 % | +119 % | +1308 % |
| Peloton Interactive 2021-01-15 | fracaso | pico | 78.2 | 7 (euforia) | 0.12 | -26 % | -15 % | -63 % | **Vender** | ponderada ≤ -10 % | -77 % | -96 % |
| Rheinmetall 2022-03-15 | ganadora | principio | 55 | 6 | 0.11 | -2 % | +0 % | -42 % | **Mantener** | no compra: puntuación < 70, ponderada < 20 %, base < 10 % | +48 % | +736 % |
| Rivian Automotive 2021-12-01 | fracaso | pico | 27.8 | 1 | — | -30 % | -23 % | -50 % | **Vender** | puntuación < 50 | -73 % | -90 % |
| Shopify 2017-02-20 | ganadora | principio | 76.7 | 6 (euforia) | 0.17 | +30 % | +33 % | -42 % | **Comprar** | cumple todos los requisitos de compra | +127 % | +833 % |
| Snowflake 2021-11-15 | fracaso | pico | 74.7 | 6 | 0.85 | -9 % | -7 % | -60 % | **Mantener** | no compra: ponderada < 20 %, base < 10 %, bajista peor que -50 % | -61 % | -67 % |
| Teladoc Health 2021-02-16 | fracaso | pico | 74.5 | 5 | 0.71 | -23 % | -21 % | -69 % | **Vender** | ponderada ≤ -10 % | -72 % | -93 % |
| Tesla 2019-10-25 | ganadora | principio | 61.8 | 7 | 0.12 | -8 % | +5 % | -51 % | **Mantener** | no compra: puntuación < 70, ponderada < 20 %, base < 10 %, bajista peor que -50 % | +541 % | +917 % |
| Zoom Video Communications 2020-10-15 | fracaso | pico | 85.2 | 7 (euforia) | 0.51 | -32 % | -22 % | -68 % | **Vender** | ponderada ≤ -10 % | -48 % | -88 % |

### v3: v2 + filtro de valoración (EV/beneficio bruto ≤ 35) + euforia que veta + listones 60 puntos y 15 %

| Caso | Tipo | Momento | Punt. | Señales | EV/vtas ÷ crec. | Ponderada | Base | Bajista | Señal | Motivo | 12 m después | 36 m después |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| AppLovin 2024-02-20 | ganadora | principio | 78.8 | 7 | 0.18 | -1 % | +2 % | -56 % | **Mantener** | no compra: ponderada < 15 %, base < 10 %, bajista peor que -50 % | +672 % | +378 % |
| Axon Enterprise 2023-03-01 | ganadora | mitad | 86.8 | 7 | 0.47 | +28 % | +32 % | -37 % | **Comprar** | cumple todos los requisitos de compra | +50 % | +173 % |
| Beyond Meat 2019-07-26 | fracaso | pico | 76 | 6 (euforia) | 0.5 | -35 % | -33 % | -72 % | **Vender** | ponderada ≤ -10 % | -42 % | -87 % |
| Celestica 2024-02-01 | ganadora | principio | 52 | 6 | 0.06 | +5 % | +8 % | -42 % | **Mantener** | no compra: puntuación < 60, ponderada < 15 %, base < 10 % | +264 % | +825 % |
| CrowdStrike 2020-06-05 | ganadora | principio | 80.7 | 6 | 0.43 | +22 % | +25 % | -47 % | **Comprar** | cumple todos los requisitos de compra | +154 % | +69 % |
| Duolingo 2023-03-01 | ganadora | principio | 84.2 | 7 | 0.25 | +9 % | +12 % | -42 % | **Mantener** | no compra: ponderada < 15 % | +120 % | -3 % |
| Meta Platforms 2023-02-03 | ganadora | principio | 53.7 | 6 | 1.28 | 0 % | +3 % | -37 % | **Mantener** | no compra: puntuación < 60, ponderada < 15 %, base < 10 % | +155 % | +275 % |
| Netflix 2013-01-25 | ganadora | principio | 56.2 | 7 | 0.17 | +2 % | +4 % | -42 % | **Mantener** | no compra: puntuación < 60, ponderada < 15 %, base < 10 % | +126 % | +309 % |
| NVIDIA 2016-11-15 | ganadora | principio | 80.7 | 6 | 0.23 | +5 % | +8 % | -46 % | **Mantener** | no compra: ponderada < 15 %, base < 10 % | +125 % | +128 % |
| NVIDIA 2023-03-01 | ganadora | mitad | 58 | 6 | 1.92 | -7 % | -5 % | -44 % | **Mantener** | no compra: puntuación < 60, ponderada < 15 %, base < 10 % | +258 % | +695 % |
| Palantir Technologies 2021-02-01 | fracaso | pico | 75 | 6 (euforia) | 1.5 | +12 % | +15 % | -47 % | **Mantener** | no compra: ponderada < 15 %, euforia, EV/beneficio bruto > 35 | -59 % | -50 % |
| Palantir Technologies 2023-05-10 | ganadora | principio | 66.2 | 7 | 0.65 | +9 % | +12 % | -35 % | **Mantener** | no compra: ponderada < 15 % | +119 % | +1308 % |
| Peloton Interactive 2021-01-15 | fracaso | pico | 81.2 | 7 (euforia) | 0.12 | -26 % | -15 % | -63 % | **Vender** | ponderada ≤ -10 % | -77 % | -96 % |
| Rheinmetall 2022-03-15 | ganadora | principio | 55 | 6 | 0.11 | +2 % | +5 % | -41 % | **Mantener** | no compra: puntuación < 60, ponderada < 15 %, base < 10 % | +48 % | +736 % |
| Rivian Automotive 2021-12-01 | fracaso | pico | 27.8 | 1 | — | -30 % | -23 % | -50 % | **Vender** | puntuación < 50 | -73 % | -90 % |
| Shopify 2017-02-20 | ganadora | principio | 79.7 | 6 | 0.17 | +30 % | +33 % | -42 % | **Comprar** | cumple todos los requisitos de compra | +127 % | +833 % |
| Snowflake 2021-11-15 | fracaso | pico | 74.7 | 6 | 0.85 | -9 % | -7 % | -60 % | **Mantener** | no compra: ponderada < 15 %, base < 10 %, bajista peor que -50 %, EV/beneficio bruto > 35 | -61 % | -67 % |
| Teladoc Health 2021-02-16 | fracaso | pico | 74.5 | 5 | 0.71 | -23 % | -21 % | -69 % | **Vender** | ponderada ≤ -10 % | -72 % | -93 % |
| Tesla 2019-10-25 | ganadora | principio | 61.8 | 7 | 0.12 | 0 % | +14 % | -48 % | **Mantener** | no compra: ponderada < 15 % | +541 % | +917 % |
| Zoom Video Communications 2020-10-15 | fracaso | pico | 88.2 | 7 (euforia) | 0.51 | -32 % | -22 % | -68 % | **Vender** | ponderada ≤ -10 % | -48 % | -88 % |

### v4: v3 + el alcista puede volver a su mediana o a comparables (techo ×1,6) + compra si el precio no exige más múltiplo (base ≥ 0, ponderada ≥ 10 %) con ≥ 4 señales

| Caso | Tipo | Momento | Punt. | Señales | EV/vtas ÷ crec. | Ponderada | Base | Bajista | Señal | Motivo | 12 m después | 36 m después |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| AppLovin 2024-02-20 | ganadora | principio | 78.8 | 7 | 0.18 | -1 % | +2 % | -56 % | **Mantener** | no compra: ponderada < 10 %, bajista peor que -50 % | +672 % | +378 % |
| Axon Enterprise 2023-03-01 | ganadora | mitad | 86.8 | 7 | 0.47 | +28 % | +32 % | -37 % | **Comprar** | cumple todos los requisitos de compra | +50 % | +173 % |
| Beyond Meat 2019-07-26 | fracaso | pico | 76 | 6 (euforia) | 0.5 | -35 % | -33 % | -72 % | **Vender** | ponderada ≤ -10 % | -42 % | -87 % |
| Celestica 2024-02-01 | ganadora | principio | 52 | 6 | 0.06 | +5 % | +8 % | -42 % | **Mantener** | no compra: puntuación < 60, ponderada < 10 % | +264 % | +825 % |
| CrowdStrike 2020-06-05 | ganadora | principio | 80.7 | 6 | 0.43 | +22 % | +25 % | -47 % | **Comprar** | cumple todos los requisitos de compra | +154 % | +69 % |
| Duolingo 2023-03-01 | ganadora | principio | 84.2 | 7 | 0.25 | +18 % | +12 % | -42 % | **Comprar** | cumple todos los requisitos de compra | +120 % | -3 % |
| Meta Platforms 2023-02-03 | ganadora | principio | 53.7 | 6 | 1.28 | +7 % | +3 % | -37 % | **Mantener** | no compra: puntuación < 60, ponderada < 10 % | +155 % | +275 % |
| Netflix 2013-01-25 | ganadora | principio | 56.2 | 7 | 0.17 | +2 % | +4 % | -42 % | **Mantener** | no compra: puntuación < 60, ponderada < 10 % | +126 % | +309 % |
| NVIDIA 2016-11-15 | ganadora | principio | 80.7 | 6 | 0.23 | +5 % | +8 % | -46 % | **Mantener** | no compra: ponderada < 10 % → en vigilancia | +125 % | +128 % |
| NVIDIA 2023-03-01 | ganadora | mitad | 58 | 6 | 1.92 | -7 % | -5 % | -44 % | **Mantener** | no compra: puntuación < 60, ponderada < 10 %, base < 0 % | +258 % | +695 % |
| Palantir Technologies 2021-02-01 | fracaso | pico | 75 | 6 (euforia) | 1.5 | +12 % | +15 % | -47 % | **Mantener** | no compra: euforia, EV/beneficio bruto > 35 | -59 % | -50 % |
| Palantir Technologies 2023-05-10 | ganadora | principio | 66.2 | 7 | 0.65 | +17 % | +12 % | -35 % | **Comprar** | cumple todos los requisitos de compra | +119 % | +1308 % |
| Peloton Interactive 2021-01-15 | fracaso | pico | 81.2 | 7 (euforia) | 0.12 | -26 % | -15 % | -63 % | **Vender** | ponderada ≤ -10 % | -77 % | -96 % |
| Rheinmetall 2022-03-15 | ganadora | principio | 55 | 6 | 0.11 | +2 % | +5 % | -41 % | **Mantener** | no compra: puntuación < 60, ponderada < 10 % | +48 % | +736 % |
| Rivian Automotive 2021-12-01 | fracaso | pico | 27.8 | 1 | — | -30 % | -23 % | -50 % | **Vender** | puntuación < 50 | -73 % | -90 % |
| Shopify 2017-02-20 | ganadora | principio | 79.7 | 6 | 0.17 | +30 % | +33 % | -42 % | **Comprar** | cumple todos los requisitos de compra | +127 % | +833 % |
| Snowflake 2021-11-15 | fracaso | pico | 74.7 | 6 | 0.85 | -9 % | -7 % | -60 % | **Mantener** | no compra: ponderada < 10 %, base < 0 %, bajista peor que -50 %, EV/beneficio bruto > 35 | -61 % | -67 % |
| Teladoc Health 2021-02-16 | fracaso | pico | 74.5 | 5 | 0.71 | -23 % | -21 % | -69 % | **Vender** | ponderada ≤ -10 % | -72 % | -93 % |
| Tesla 2019-10-25 | ganadora | principio | 61.8 | 7 | 0.12 | +6 % | +14 % | -48 % | **Mantener** | no compra: ponderada < 10 % → en vigilancia | +541 % | +917 % |
| Zoom Video Communications 2020-10-15 | fracaso | pico | 88.2 | 7 (euforia) | 0.51 | -31 % | -22 % | -68 % | **Vender** | ponderada ≤ -10 % | -48 % | -88 % |

### v5: v4 pidiendo 2 señales en vez de 4

| Caso | Tipo | Momento | Punt. | Señales | EV/vtas ÷ crec. | Ponderada | Base | Bajista | Señal | Motivo | 12 m después | 36 m después |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| AppLovin 2024-02-20 | ganadora | principio | 78.8 | 7 | 0.18 | -1 % | +2 % | -56 % | **Mantener** | no compra: ponderada < 10 %, bajista peor que -50 % | +672 % | +378 % |
| Axon Enterprise 2023-03-01 | ganadora | mitad | 86.8 | 7 | 0.47 | +28 % | +32 % | -37 % | **Comprar** | cumple todos los requisitos de compra | +50 % | +173 % |
| Beyond Meat 2019-07-26 | fracaso | pico | 76 | 6 (euforia) | 0.5 | -35 % | -33 % | -72 % | **Vender** | ponderada ≤ -10 % | -42 % | -87 % |
| Celestica 2024-02-01 | ganadora | principio | 52 | 6 | 0.06 | +5 % | +8 % | -42 % | **Mantener** | no compra: puntuación < 60, ponderada < 10 % | +264 % | +825 % |
| CrowdStrike 2020-06-05 | ganadora | principio | 80.7 | 6 | 0.43 | +22 % | +25 % | -47 % | **Comprar** | cumple todos los requisitos de compra | +154 % | +69 % |
| Duolingo 2023-03-01 | ganadora | principio | 84.2 | 7 | 0.25 | +18 % | +12 % | -42 % | **Comprar** | cumple todos los requisitos de compra | +120 % | -3 % |
| Meta Platforms 2023-02-03 | ganadora | principio | 53.7 | 6 | 1.28 | +7 % | +3 % | -37 % | **Mantener** | no compra: puntuación < 60, ponderada < 10 % | +155 % | +275 % |
| Netflix 2013-01-25 | ganadora | principio | 56.2 | 7 | 0.17 | +2 % | +4 % | -42 % | **Mantener** | no compra: puntuación < 60, ponderada < 10 % | +126 % | +309 % |
| NVIDIA 2016-11-15 | ganadora | principio | 80.7 | 6 | 0.23 | +5 % | +8 % | -46 % | **Mantener** | no compra: ponderada < 10 % → en vigilancia | +125 % | +128 % |
| NVIDIA 2023-03-01 | ganadora | mitad | 58 | 6 | 1.92 | -7 % | -5 % | -44 % | **Mantener** | no compra: puntuación < 60, ponderada < 10 %, base < 0 % | +258 % | +695 % |
| Palantir Technologies 2021-02-01 | fracaso | pico | 75 | 6 (euforia) | 1.5 | +12 % | +15 % | -47 % | **Mantener** | no compra: euforia, EV/beneficio bruto > 35 | -59 % | -50 % |
| Palantir Technologies 2023-05-10 | ganadora | principio | 66.2 | 7 | 0.65 | +17 % | +12 % | -35 % | **Comprar** | cumple todos los requisitos de compra | +119 % | +1308 % |
| Peloton Interactive 2021-01-15 | fracaso | pico | 81.2 | 7 (euforia) | 0.12 | -26 % | -15 % | -63 % | **Vender** | ponderada ≤ -10 % | -77 % | -96 % |
| Rheinmetall 2022-03-15 | ganadora | principio | 55 | 6 | 0.11 | +2 % | +5 % | -41 % | **Mantener** | no compra: puntuación < 60, ponderada < 10 % | +48 % | +736 % |
| Rivian Automotive 2021-12-01 | fracaso | pico | 27.8 | 1 | — | -30 % | -23 % | -50 % | **Vender** | puntuación < 50 | -73 % | -90 % |
| Shopify 2017-02-20 | ganadora | principio | 79.7 | 6 | 0.17 | +30 % | +33 % | -42 % | **Comprar** | cumple todos los requisitos de compra | +127 % | +833 % |
| Snowflake 2021-11-15 | fracaso | pico | 74.7 | 6 | 0.85 | -9 % | -7 % | -60 % | **Mantener** | no compra: ponderada < 10 %, base < 0 %, bajista peor que -50 %, EV/beneficio bruto > 35 | -61 % | -67 % |
| Teladoc Health 2021-02-16 | fracaso | pico | 74.5 | 5 | 0.71 | -23 % | -21 % | -69 % | **Vender** | ponderada ≤ -10 % | -72 % | -93 % |
| Tesla 2019-10-25 | ganadora | principio | 61.8 | 7 | 0.12 | +6 % | +14 % | -48 % | **Mantener** | no compra: ponderada < 10 % → en vigilancia | +541 % | +917 % |
| Zoom Video Communications 2020-10-15 | fracaso | pico | 88.2 | 7 (euforia) | 0.51 | -31 % | -22 % | -68 % | **Vender** | ponderada ≤ -10 % | -48 % | -88 % |

### v6: v4 sin mínimo de señales (cuentan solo dentro de la puntuación)

| Caso | Tipo | Momento | Punt. | Señales | EV/vtas ÷ crec. | Ponderada | Base | Bajista | Señal | Motivo | 12 m después | 36 m después |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| AppLovin 2024-02-20 | ganadora | principio | 78.8 | 7 | 0.18 | -1 % | +2 % | -56 % | **Mantener** | no compra: ponderada < 10 %, bajista peor que -50 % | +672 % | +378 % |
| Axon Enterprise 2023-03-01 | ganadora | mitad | 86.8 | 7 | 0.47 | +28 % | +32 % | -37 % | **Comprar** | cumple todos los requisitos de compra | +50 % | +173 % |
| Beyond Meat 2019-07-26 | fracaso | pico | 76 | 6 (euforia) | 0.5 | -35 % | -33 % | -72 % | **Vender** | ponderada ≤ -10 % | -42 % | -87 % |
| Celestica 2024-02-01 | ganadora | principio | 52 | 6 | 0.06 | +5 % | +8 % | -42 % | **Mantener** | no compra: puntuación < 60, ponderada < 10 % | +264 % | +825 % |
| CrowdStrike 2020-06-05 | ganadora | principio | 80.7 | 6 | 0.43 | +22 % | +25 % | -47 % | **Comprar** | cumple todos los requisitos de compra | +154 % | +69 % |
| Duolingo 2023-03-01 | ganadora | principio | 84.2 | 7 | 0.25 | +18 % | +12 % | -42 % | **Comprar** | cumple todos los requisitos de compra | +120 % | -3 % |
| Meta Platforms 2023-02-03 | ganadora | principio | 53.7 | 6 | 1.28 | +7 % | +3 % | -37 % | **Mantener** | no compra: puntuación < 60, ponderada < 10 % | +155 % | +275 % |
| Netflix 2013-01-25 | ganadora | principio | 56.2 | 7 | 0.17 | +2 % | +4 % | -42 % | **Mantener** | no compra: puntuación < 60, ponderada < 10 % | +126 % | +309 % |
| NVIDIA 2016-11-15 | ganadora | principio | 80.7 | 6 | 0.23 | +5 % | +8 % | -46 % | **Mantener** | no compra: ponderada < 10 % → en vigilancia | +125 % | +128 % |
| NVIDIA 2023-03-01 | ganadora | mitad | 58 | 6 | 1.92 | -7 % | -5 % | -44 % | **Mantener** | no compra: puntuación < 60, ponderada < 10 %, base < 0 % | +258 % | +695 % |
| Palantir Technologies 2021-02-01 | fracaso | pico | 75 | 6 (euforia) | 1.5 | +12 % | +15 % | -47 % | **Mantener** | no compra: euforia, EV/beneficio bruto > 35 | -59 % | -50 % |
| Palantir Technologies 2023-05-10 | ganadora | principio | 66.2 | 7 | 0.65 | +17 % | +12 % | -35 % | **Comprar** | cumple todos los requisitos de compra | +119 % | +1308 % |
| Peloton Interactive 2021-01-15 | fracaso | pico | 81.2 | 7 (euforia) | 0.12 | -26 % | -15 % | -63 % | **Vender** | ponderada ≤ -10 % | -77 % | -96 % |
| Rheinmetall 2022-03-15 | ganadora | principio | 55 | 6 | 0.11 | +2 % | +5 % | -41 % | **Mantener** | no compra: puntuación < 60, ponderada < 10 % | +48 % | +736 % |
| Rivian Automotive 2021-12-01 | fracaso | pico | 27.8 | 1 | — | -30 % | -23 % | -50 % | **Vender** | puntuación < 50 | -73 % | -90 % |
| Shopify 2017-02-20 | ganadora | principio | 79.7 | 6 | 0.17 | +30 % | +33 % | -42 % | **Comprar** | cumple todos los requisitos de compra | +127 % | +833 % |
| Snowflake 2021-11-15 | fracaso | pico | 74.7 | 6 | 0.85 | -9 % | -7 % | -60 % | **Mantener** | no compra: ponderada < 10 %, base < 0 %, bajista peor que -50 %, EV/beneficio bruto > 35 | -61 % | -67 % |
| Teladoc Health 2021-02-16 | fracaso | pico | 74.5 | 5 | 0.71 | -23 % | -21 % | -69 % | **Vender** | ponderada ≤ -10 % | -72 % | -93 % |
| Tesla 2019-10-25 | ganadora | principio | 61.8 | 7 | 0.12 | +6 % | +14 % | -48 % | **Mantener** | no compra: ponderada < 10 % → en vigilancia | +541 % | +917 % |
| Zoom Video Communications 2020-10-15 | fracaso | pico | 88.2 | 7 (euforia) | 0.51 | -31 % | -22 % | -68 % | **Vender** | ponderada ≤ -10 % | -48 % | -88 % |

### v7: v6 con ponderada ≥ 5 %

| Caso | Tipo | Momento | Punt. | Señales | EV/vtas ÷ crec. | Ponderada | Base | Bajista | Señal | Motivo | 12 m después | 36 m después |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| AppLovin 2024-02-20 | ganadora | principio | 78.8 | 7 | 0.18 | -1 % | +2 % | -56 % | **Mantener** | no compra: ponderada < 5 %, bajista peor que -50 % | +672 % | +378 % |
| Axon Enterprise 2023-03-01 | ganadora | mitad | 86.8 | 7 | 0.47 | +28 % | +32 % | -37 % | **Comprar** | cumple todos los requisitos de compra | +50 % | +173 % |
| Beyond Meat 2019-07-26 | fracaso | pico | 76 | 6 (euforia) | 0.5 | -35 % | -33 % | -72 % | **Vender** | ponderada ≤ -10 % | -42 % | -87 % |
| Celestica 2024-02-01 | ganadora | principio | 52 | 6 | 0.06 | +5 % | +8 % | -42 % | **Mantener** | no compra: puntuación < 60, ponderada < 5 % | +264 % | +825 % |
| CrowdStrike 2020-06-05 | ganadora | principio | 80.7 | 6 | 0.43 | +22 % | +25 % | -47 % | **Comprar** | cumple todos los requisitos de compra | +154 % | +69 % |
| Duolingo 2023-03-01 | ganadora | principio | 84.2 | 7 | 0.25 | +18 % | +12 % | -42 % | **Comprar** | cumple todos los requisitos de compra | +120 % | -3 % |
| Meta Platforms 2023-02-03 | ganadora | principio | 53.7 | 6 | 1.28 | +7 % | +3 % | -37 % | **Mantener** | no compra: puntuación < 60 | +155 % | +275 % |
| Netflix 2013-01-25 | ganadora | principio | 56.2 | 7 | 0.17 | +2 % | +4 % | -42 % | **Mantener** | no compra: puntuación < 60, ponderada < 5 % | +126 % | +309 % |
| NVIDIA 2016-11-15 | ganadora | principio | 80.7 | 6 | 0.23 | +5 % | +8 % | -46 % | **Comprar** | cumple todos los requisitos de compra | +125 % | +128 % |
| NVIDIA 2023-03-01 | ganadora | mitad | 58 | 6 | 1.92 | -7 % | -5 % | -44 % | **Mantener** | no compra: puntuación < 60, ponderada < 5 %, base < 0 % | +258 % | +695 % |
| Palantir Technologies 2021-02-01 | fracaso | pico | 75 | 6 (euforia) | 1.5 | +12 % | +15 % | -47 % | **Mantener** | no compra: euforia, EV/beneficio bruto > 35 | -59 % | -50 % |
| Palantir Technologies 2023-05-10 | ganadora | principio | 66.2 | 7 | 0.65 | +17 % | +12 % | -35 % | **Comprar** | cumple todos los requisitos de compra | +119 % | +1308 % |
| Peloton Interactive 2021-01-15 | fracaso | pico | 81.2 | 7 (euforia) | 0.12 | -26 % | -15 % | -63 % | **Vender** | ponderada ≤ -10 % | -77 % | -96 % |
| Rheinmetall 2022-03-15 | ganadora | principio | 55 | 6 | 0.11 | +2 % | +5 % | -41 % | **Mantener** | no compra: puntuación < 60, ponderada < 5 % | +48 % | +736 % |
| Rivian Automotive 2021-12-01 | fracaso | pico | 27.8 | 1 | — | -30 % | -23 % | -50 % | **Vender** | puntuación < 50 | -73 % | -90 % |
| Shopify 2017-02-20 | ganadora | principio | 79.7 | 6 | 0.17 | +30 % | +33 % | -42 % | **Comprar** | cumple todos los requisitos de compra | +127 % | +833 % |
| Snowflake 2021-11-15 | fracaso | pico | 74.7 | 6 | 0.85 | -9 % | -7 % | -60 % | **Mantener** | no compra: ponderada < 5 %, base < 0 %, bajista peor que -50 %, EV/beneficio bruto > 35 | -61 % | -67 % |
| Teladoc Health 2021-02-16 | fracaso | pico | 74.5 | 5 | 0.71 | -23 % | -21 % | -69 % | **Vender** | ponderada ≤ -10 % | -72 % | -93 % |
| Tesla 2019-10-25 | ganadora | principio | 61.8 | 7 | 0.12 | +6 % | +14 % | -48 % | **Comprar** | cumple todos los requisitos de compra | +541 % | +917 % |
| Zoom Video Communications 2020-10-15 | fracaso | pico | 88.2 | 7 (euforia) | 0.51 | -31 % | -22 % | -68 % | **Vender** | ponderada ≤ -10 % | -48 % | -88 % |

### v8: v7 + proyección que respeta la desaceleración + la señal de múltiplo no cuenta si ya está > 1,3 × su mediana

| Caso | Tipo | Momento | Punt. | Señales | EV/vtas ÷ crec. | Ponderada | Base | Bajista | Señal | Motivo | 12 m después | 36 m después |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| AppLovin 2024-02-20 | ganadora | principio | 78.8 | 7 | 0.18 | -1 % | +2 % | -56 % | **Mantener** | no compra: ponderada < 5 %, bajista peor que -50 % | +672 % | +378 % |
| Axon Enterprise 2023-03-01 | ganadora | mitad | 86.8 | 7 | 0.47 | +28 % | +32 % | -37 % | **Comprar** | cumple todos los requisitos de compra | +50 % | +173 % |
| Beyond Meat 2019-07-26 | fracaso | pico | 73.5 | 5 (euforia) | 0.5 | -35 % | -33 % | -72 % | **Vender** | ponderada ≤ -10 % | -42 % | -87 % |
| Celestica 2024-02-01 | ganadora | principio | 49.5 | 5 | 0.06 | +5 % | +8 % | -42 % | **Vender** | puntuación < 50 | +264 % | +825 % |
| CrowdStrike 2020-06-05 | ganadora | principio | 78.2 | 5 | 0.43 | +22 % | +25 % | -47 % | **Comprar** | cumple todos los requisitos de compra | +154 % | +69 % |
| Duolingo 2023-03-01 | ganadora | principio | 84.2 | 7 | 0.25 | +18 % | +12 % | -42 % | **Comprar** | cumple todos los requisitos de compra | +120 % | -3 % |
| Meta Platforms 2023-02-03 | ganadora | principio | 53.7 | 6 | 1.28 | +7 % | +3 % | -37 % | **Mantener** | no compra: puntuación < 60 | +155 % | +275 % |
| Netflix 2013-01-25 | ganadora | principio | 56.2 | 7 | 0.17 | -6 % | -4 % | -45 % | **Mantener** | no compra: puntuación < 60, ponderada < 5 %, base < 0 % | +126 % | +309 % |
| NVIDIA 2016-11-15 | ganadora | principio | 78.2 | 5 | 0.23 | +5 % | +8 % | -46 % | **Comprar** | cumple todos los requisitos de compra | +125 % | +128 % |
| NVIDIA 2023-03-01 | ganadora | mitad | 58 | 6 | 1.92 | -40 % | -39 % | -55 % | **Vender** | ponderada ≤ -10 % | +258 % | +695 % |
| Palantir Technologies 2021-02-01 | fracaso | pico | 72.5 | 5 (euforia) | 1.5 | +12 % | +15 % | -47 % | **Mantener** | no compra: euforia, EV/beneficio bruto > 35 | -59 % | -50 % |
| Palantir Technologies 2023-05-10 | ganadora | principio | 66.2 | 7 | 0.65 | +17 % | +12 % | -35 % | **Comprar** | cumple todos los requisitos de compra | +119 % | +1308 % |
| Peloton Interactive 2021-01-15 | fracaso | pico | 78.7 | 6 (euforia) | 0.12 | -26 % | -15 % | -63 % | **Vender** | ponderada ≤ -10 % | -77 % | -96 % |
| Rheinmetall 2022-03-15 | ganadora | principio | 55 | 6 | 0.11 | +2 % | +5 % | -41 % | **Mantener** | no compra: puntuación < 60, ponderada < 5 % | +48 % | +736 % |
| Rivian Automotive 2021-12-01 | fracaso | pico | 27.8 | 1 | — | -30 % | -23 % | -50 % | **Vender** | puntuación < 50 | -73 % | -90 % |
| Shopify 2017-02-20 | ganadora | principio | 79.7 | 6 | 0.17 | +30 % | +33 % | -42 % | **Comprar** | cumple todos los requisitos de compra | +127 % | +833 % |
| Snowflake 2021-11-15 | fracaso | pico | 74.7 | 6 | 0.85 | -13 % | -11 % | -61 % | **Vender** | ponderada ≤ -10 % | -61 % | -67 % |
| Teladoc Health 2021-02-16 | fracaso | pico | 72 | 4 | 0.71 | -23 % | -21 % | -69 % | **Vender** | ponderada ≤ -10 % | -72 % | -93 % |
| Tesla 2019-10-25 | ganadora | principio | 61.8 | 7 | 0.12 | -38 % | -35 % | -63 % | **Vender** | ponderada ≤ -10 % | +541 % | +917 % |
| Zoom Video Communications 2020-10-15 | fracaso | pico | 88.2 | 7 (euforia) | 0.51 | -31 % | -22 % | -68 % | **Vender** | ponderada ≤ -10 % | -48 % | -88 % |

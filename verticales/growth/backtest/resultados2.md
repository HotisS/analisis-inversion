# Backtest growth, fase 2: resultados

Protocolo: [protocolo.md](protocolo.md). Lo genera `node herramientas/growth-backtest2.mjs --validacion`. Horizonte principal 24 meses frente al Nasdaq-100 (QQQ). Márgenes al 95 % (Wilson para porcentajes, bootstrap para medias). Versión vigente: **v7**.

## Ajuste (cohortes 2019 y 2021)

34 casos; 8 (24 %) batieron al QQQ a 24 meses: es el acierto de comprar a ciegas toda la lista.

| Versión | Compras / casos | Precisión de Comprar a 24 m (margen 95 %) | Exceso medio de las compras frente al QQQ | Frente a comprar toda la lista | Acierto total | Peor compra a 24 m | Precisión a 12 m |
|---|---|---|---|---|---|---|---|
| v1 | 0/34 | — (—-—) | — pp (— a —) | — pp (— a —) | 76 % (60-88) | — % | — |
| v2 | 3/34 | 33 % (6-79) | +80 pp (-81 a +327) | +84 pp (-20 a +218) | 74 % (57-85) | -80 % | 67 % |
| v3 | 2/34 | 100 % (34-100) | +672 pp (+327 a +1016) | +562 pp (+218 a +906) | 82 % (66-92) | +405 % | 100 % |
| v4 | 0/34 | — (—-—) | — pp (— a —) | — pp (— a —) | 76 % (60-88) | — % | — |
| v5 | 2/34 | 100 % (34-100) | +672 pp (+327 a +1016) | +562 pp (+218 a +906) | 82 % (66-92) | +405 % | 100 % |
| v6 | 3/34 | 100 % (44-100) | +490 pp (+125 a +1016) | +380 pp (+16 a +906) | 85 % (70-94) | +203 % | 67 % |
| v7 | 4/34 | 100 % (51-100) | +371 pp (+71 a +793) | +262 pp (-39 a +684) | 88 % (73-95) | +94 % | 50 % |
| v8 | 4/34 | 100 % (51-100) | +371 pp (+71 a +793) | +262 pp (-39 a +684) | 88 % (73-95) | +94 % | 50 % |

## Validación (cohorte 2023, reservada)

17 casos; 3 (18 %) batieron al QQQ a 24 meses: es el acierto de comprar a ciegas toda la lista.

| Versión | Compras / casos | Precisión de Comprar a 24 m (margen 95 %) | Exceso medio de las compras frente al QQQ | Frente a comprar toda la lista | Acierto total | Peor compra a 24 m | Precisión a 12 m |
|---|---|---|---|---|---|---|---|
| v1 | 0/17 | — (—-—) | — pp (— a —) | — pp (— a —) | 82 % (59-94) | — % | — |
| v2 | 0/17 | — (—-—) | — pp (— a —) | — pp (— a —) | 82 % (59-94) | — % | — |
| v3 | 0/17 | — (—-—) | — pp (— a —) | — pp (— a —) | 82 % (59-94) | — % | — |
| v4 | 2/17 | 50 % (9-91) | -15 pp (-82 a +53) | +37 pp (-30 a +105) | 82 % (59-94) | -36 % | 50 % |
| v5 | 2/17 | 50 % (9-91) | -15 pp (-82 a +53) | +37 pp (-30 a +105) | 82 % (59-94) | -36 % | 50 % |
| v6 | 2/17 | 50 % (9-91) | -15 pp (-82 a +53) | +37 pp (-30 a +105) | 82 % (59-94) | -36 % | 50 % |
| v7 | 2/17 | 50 % (9-91) | -15 pp (-82 a +53) | +37 pp (-30 a +105) | 82 % (59-94) | -36 % | 50 % |
| v8 | 2/17 | 50 % (9-91) | -15 pp (-82 a +53) | +37 pp (-30 a +105) | 82 % (59-94) | -36 % | 50 % |

## Todas las cohortes

51 casos; 11 (22 %) batieron al QQQ a 24 meses: es el acierto de comprar a ciegas toda la lista.

| Versión | Compras / casos | Precisión de Comprar a 24 m (margen 95 %) | Exceso medio de las compras frente al QQQ | Frente a comprar toda la lista | Acierto total | Peor compra a 24 m | Precisión a 12 m |
|---|---|---|---|---|---|---|---|
| v1 | 0/51 | — (—-—) | — pp (— a —) | — pp (— a —) | 78 % (65-88) | — % | — |
| v2 | 3/51 | 33 % (6-79) | +80 pp (-81 a +327) | +84 pp (-20 a +218) | 76 % (63-86) | -80 % | 67 % |
| v3 | 2/51 | 100 % (34-100) | +672 pp (+327 a +1016) | +562 pp (+218 a +906) | 82 % (70-90) | +405 % | 100 % |
| v4 | 2/51 | 50 % (9-91) | -15 pp (-82 a +53) | +37 pp (-30 a +105) | 78 % (65-88) | -36 % | 50 % |
| v5 | 4/51 | 75 % (30-95) | +328 pp (-15 a +775) | +300 pp (+32 a +706) | 82 % (70-90) | -36 % | 75 % |
| v6 | 5/51 | 80 % (38-96) | +288 pp (+13 a +660) | +243 pp (+15 a +590) | 84 % (72-92) | -36 % | 60 % |
| v7 | 6/51 | 83 % (44-97) | +243 pp (+10 a +592) | +187 pp (-18 a +506) | 86 % (74-93) | -36 % | 50 % |
| v8 | 6/51 | 83 % (44-97) | +243 pp (+14 a +586) | +187 pp (-21 a +510) | 86 % (74-93) | -36 % | 50 % |

## Detalle con v7

| Caso | Cohorte | Punt. | Señales | EV/BB | Ponderada | Señal | Motivo | 24 m | QQQ 24 m |
|---|---|---|---|---|---|---|---|---|---|
| Amazon | 2019 | 55.3 | 0 | 8 | +14 % | **Mantener** | no compra: puntuación < 60 | +74 % | +78 % |
| Baidu (ADS) | 2019 | 49.7 | 0 | 5.5 | +12 % | **Vender** | puntuación < 50 | +32 % | +78 % |
| CRISPR Therapeutics | 2019 | 28.8 | 1 | Infinity | -37 % | **Vender** | puntuación < 50 | +241 % | +78 % |
| Editas Medicine | 2019 | 31.8 | 1 | Infinity | -1 % | **Vender** | puntuación < 50 | +72 % | +78 % |
| Illumina | 2019 | 51.3 | 0 | 16.8 | +7 % | **Mantener** | no compra: puntuación < 60 | +24 % | +78 % |
| Netflix | 2019 | 51 | 2 | 23.5 | +10 % | **Mantener** | no compra: puntuación < 60, pista < 24 meses | +46 % | +78 % |
| Intellia Therapeutics | 2019 | 28.3 | 0 | Infinity | -13 % | **Vender** | puntuación < 50 | +370 % | +78 % |
| Nvidia | 2019 | 52.5 | 1 | 15.7 | -3 % | **Mantener** | no compra: puntuación < 60, ponderada < 5 %, base < 0 % | +197 % | +78 % |
| Invitae | 2019 | 63 | 6 (euforia) | 20.2 | +4 % | **Mantener** | no compra: ponderada < 5 %, bajista peor que -50 %, euforia | +63 % | +78 % |
| Proto Labs | 2019 | 43.7 | 0 | 10.8 | +20 % | **Vender** | puntuación < 50 | +16 % | +78 % |
| Roku | 2019 | 72.2 | 3 | 17.5 | +18 % | **Comprar** | cumple todos los requisitos de compra | +405 % | +78 % |
| Square (Block) | 2019 | 65 | 0 | 19.8 | +26 % | **Comprar** | cumple todos los requisitos de compra | +203 % | +78 % |
| Stratasys | 2019 | 38 | 0 | 2.2 | +2 % | **Vender** | puntuación < 50 | +25 % | +78 % |
| Tesla | 2019 | 66.5 | 3 | 11.5 | +111 % | **Comprar** | cumple todos los requisitos de compra | +1093 % | +78 % |
| 2U | 2019 | 51.8 | 1 | Infinity | +12 % | **Mantener** | no compra: puntuación < 60, EV/beneficio bruto > 35 | -46 % | +78 % |
| Twitter | 2019 | 61 | 2 | 9.7 | +7 % | **Comprar** | cumple todos los requisitos de compra | +94 % | +78 % |
| Zillow Group (clase C) | 2019 | 58.2 | 1 | 4.7 | -12 % | **Vender** | ponderada ≤ -10 % | +273 % | +78 % |
| Baidu | 2021 | 57.5 | 5 | 7.8 | +9 % | **Mantener** | no compra: puntuación < 60 | -31 % | +1 % |
| CRISPR Therapeutics | 2021 | 33 | 2 (euforia) | Infinity | -18 % | **Vender** | puntuación < 50 | -63 % | +1 % |
| Exact Sciences | 2021 | 57.2 | 3 | 18.7 | +49 % | **Mantener** | no compra: puntuación < 60 | -48 % | +1 % |
| Intellia Therapeutics | 2021 | 39.5 | 3 (euforia) | Infinity | -22 % | **Vender** | puntuación < 50 | -54 % | +1 % |
| Invitae | 2021 | 49.8 | 1 (euforia) | 49.4 | -28 % | **Vender** | puntuación < 50 | -96 % | +1 % |
| Pacific Biosciences of California | 2021 | 54.8 | 7 (euforia) | 128.8 | -70 % | **Vender** | ponderada ≤ -10 % | -65 % | +1 % |
| Proto Labs | 2021 | 43.8 | 1 | 15.9 | +4 % | **Vender** | puntuación < 50 | -73 % | +1 % |
| Roku | 2021 | 77.7 | 6 (euforia) | 35.6 | -8 % | **Mantener** | no compra: ponderada < 5 %, base < 0 %, bajista peor que -50 %, euforia, EV/beneficio bruto > 35 | -80 % | +1 % |
| Shopify | 2021 | 74.7 | 2 (euforia) | 60.4 | +25 % | **Mantener** | no compra: euforia, EV/beneficio bruto > 35 | -57 % | +1 % |
| Spotify Technology | 2021 | 49.2 | 1 | 18 | +3 % | **Vender** | puntuación < 50 | -50 % | +1 % |
| Square (hoy Block) | 2021 | 74.7 | 4 | 19.6 | -14 % | **Vender** | ponderada ≤ -10 % | -70 % | +1 % |
| Tencent Holdings | 2021 | 59.7 | 0 | 18.4 | +6 % | **Mantener** | no compra: puntuación < 60 | -37 % | +1 % |
| Teladoc Health | 2021 | 64.5 | 1 | 29.8 | -22 % | **Vender** | ponderada ≤ -10 % | -86 % | +1 % |
| Tesla | 2021 | 73.7 | 6 (euforia) | 88.1 | +37 % | **Mantener** | no compra: euforia, EV/beneficio bruto > 35 | -7 % | +1 % |
| Twilio | 2021 | 73.2 | 3 (euforia) | 44.5 | +13 % | **Mantener** | no compra: euforia, EV/beneficio bruto > 35 | -80 % | +1 % |
| Unity Software | 2021 | 55 | 0 | 36.4 | +17 % | **Mantener** | no compra: puntuación < 60, EV/beneficio bruto > 35 | -68 % | +1 % |
| Zillow Group | 2021 | 58.5 | 5 | 16 | -4 % | **Mantener** | no compra: puntuación < 60, ponderada < 5 %, base < 0 % | -66 % | +1 % |
| Beam Therapeutics | 2023 | 28.7 | 0 | Infinity | -3 % | **Vender** | puntuación < 50 | -36 % | +46 % |
| Coinbase Global | 2023 | 39.5 | 3 | 6.7 | -32 % | **Vender** | puntuación < 50 | +155 % | +46 % |
| CRISPR Therapeutics | 2023 | 38.8 | 1 | Infinity | -24 % | **Vender** | puntuación < 50 | -25 % | +46 % |
| Exact Sciences | 2023 | 67 | 6 | 8.3 | +12 % | **Comprar** | cumple todos los requisitos de compra | -36 % | +46 % |
| Intellia Therapeutics | 2023 | 43.7 | 0 | Infinity | -1 % | **Vender** | puntuación < 50 | -81 % | +46 % |
| Pacific Biosciences of California | 2023 | 47.7 | 6 | 67.6 | -36 % | **Vender** | puntuación < 50 | -90 % | +46 % |
| UiPath | 2023 | 59.3 | 6 | 7.9 | +10 % | **Mantener** | no compra: puntuación < 60 | -41 % | +46 % |
| Roblox | 2023 | 55.7 | 4 | 12.9 | 0 % | **Mantener** | no compra: puntuación < 60, ponderada < 5 %, base < 0 % | +30 % | +46 % |
| Roku | 2023 | 44.5 | 3 | 4.8 | +7 % | **Vender** | puntuación < 50 | +7 % | +46 % |
| Recursion Pharmaceuticals | 2023 | 34 | 0 | Infinity | +35 % | **Vender** | puntuación < 50 | -21 % | +46 % |
| Shopify | 2023 | 67.5 | 5 | 17.3 | +23 % | **Comprar** | cumple todos los requisitos de compra | +99 % | +46 % |
| Block (Square) | 2023 | 42.2 | 1 | 6.3 | +9 % | **Vender** | puntuación < 50 | -21 % | +46 % |
| Teladoc Health | 2023 | 37.3 | 0 | 2.7 | +21 % | **Vender** | puntuación < 50 | -69 % | +46 % |
| Tesla | 2023 | 53.7 | 0 | 26.9 | +28 % | **Mantener** | no compra: puntuación < 60 | +25 % | +46 % |
| Twilio | 2023 | 51.2 | 3 | 4.7 | +20 % | **Mantener** | no compra: puntuación < 60 | +47 % | +46 % |
| Unity Software | 2023 | 50.8 | 1 | 12.6 | +9 % | **Mantener** | no compra: puntuación < 60, bajista peor que -50 % | -40 % | +46 % |
| Zoom Video Communications | 2023 | 42.7 | 0 | 5 | +7 % | **Vender** | puntuación < 50 | 0 % | +46 % |

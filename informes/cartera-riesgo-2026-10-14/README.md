# Cartera, rentabilidad esperada, riesgo y Sharpe · 14-oct-2026

**Carteras comparadas.** *Actual*: la real a 13-oct (precios del 13-oct). *Propuesta*: la value vigente (`informes/cartera-2026-10-14-15h.md`, commit 0bc7a5b: vender Zoetis, Puig, Hermès, ICE, Equifax e IBKR; comprar 29 Nemetschek, 5 LVMH y 76 Bureau Veritas; Wolters Kluwer y Auto Trader canceladas) **más el primer tramo de las compras growth** (`informes-growth/cartera-growth.md`: 43 Nu, 1 argenx, 2 Axon, 4 Shopify, al cierre del 13-oct con EURUSD 1,116 ≈ 2.690 EUR).

**Hueco de liquidez.** Con el primer tramo growth quedan 1.610 EUR. El segundo tramo (43 Nu, 1 argenx, 1 Axon, 4 Shopify ≈ 2.320 EUR) dejaría la liquidez en ≈ −710 EUR. Ese hueco lo cuadra el hilo value al cerrar su 5ª hora; aquí no se decide ninguna venta.

## Tabla de cartera

| Valor | Actual títulos | Actual EUR | Nuevo títulos | Nuevo EUR | Rent. esperada 12 m: ponderada (base) | Contribución pp (actual → nuevo) |
|---|---|---|---|---|---|---|
| Oro (IGLN) | 68 | 4.856 | 68 | 4.856 | 0,0 % (0,0 %) | 0,00 → 0,00 |
| Edenred | 136 | 3.971 | 136 | 3.971 | +5,8 % (+10,7 %) | +0,77 → +0,77 |
| Daiichi Sankyo | 100 | 1.470 | 100 | 1.470 | +31,6 % (+22,7 %) | +1,56 → +1,56 |
| Uber | 28 | 1.785 | 28 | 1.785 | +11,5 % (+19,4 %) | +0,69 → +0,69 |
| Viscofan | 32 | 1.699 | 32 | 1.699 | +16,5 % (+14,2 %) | +0,94 → +0,94 |
| Alphabet | 5 | 1.581 | 5 | 1.581 | +1,1 % (+5,8 %) | +0,06 → +0,06 |
| Netflix | 23 | 1.448 | 23 | 1.448 | +18,2 % (+15,7 %) | +0,88 → +0,88 |
| SAP | 7 | 1.381 | 7 | 1.381 | +15,5 % (+13,4 %) | +0,72 → +0,72 |
| Intuit | 5 | 1.347 | 5 | 1.347 | +15,1 % (+17,3 %) | +0,68 → +0,68 |
| Nemetschek | 0 | 0 | 29 | 2.069 | +15,4 % (+14,8 %) | 0,00 → +1,07 |
| LVMH | 0 | 0 | 5 | 1.920 | +16,8 % (+13,1 %) | 0,00 → +1,08 |
| Bureau Veritas | 0 | 0 | 76 | 1.987 | +19,7 % (+15,2 %) | 0,00 → +1,31 |
| Zoetis | 20 | 1.342 | 0 | 0 | +0,5 % (+1,4 %) | +0,02 → 0,00 |
| Puig | 70 | 1.296 | 0 | 0 | +7,1 % (+6,9 %) | +0,31 → 0,00 |
| Hermès | 1 | 1.285 | 0 | 0 | +13,0 % (+9,2 %) | +0,56 → 0,00 |
| ICE | 6 | 839 | 0 | 0 | +8,7 % (+5,8 %) | +0,24 → 0,00 |
| Equifax | 6 | 793 | 0 | 0 | +15,6 % (+10,9 %) | +0,41 → 0,00 |
| IBKR | 1,8 | 141 | 0 | 0 | 0,0 % (0,0 %) | 0,00 → 0,00 |
| Nu (growth, tramo 1) | 0 | 0 | 43 | 600 | +27,4 % (+21,8 %) | 0,00 → +0,55 |
| argenx (growth, tramo 1) | 0 | 0 | 1 | 719 | +45,7 % (+40,8 %) | 0,00 → +1,10 |
| Axon (growth, tramo 1) | 0 | 0 | 2 | 741 | +34,2 % (+28,3 %) | 0,00 → +0,85 |
| Shopify (growth, tramo 1) | 0 | 0 | 4 | 633 | +14,9 % (+18,1 %) | 0,00 → +0,32 |
| Liquidez | | 4.583 | | 1.610 | 0 % | 0,00 → 0,00 |
| **Total** | | **29.817** | | **29.817** | | |
| **Rentabilidad esperada total** | | | | | **+7,9 % → +12,6 %** (base +8,2 % → +12,4 %) | **+7,85 → +12,58** |

Rentabilidad esperada = la ponderada del método (optimista). La realista es ≈ la mitad: **+3,9 % actual → +6,3 % propuesta**. Sin oro ni liquidez, la parte en acciones pasa de +11,5 % a +16,1 % ponderada.

## Riesgo y Sharpe

Precios semanales de Yahoo Finance (cierre ajustado por dividendos y splits) de oct-2021 a la semana del 5-oct-2026, pasados a EUR con el tipo de cambio de cada semana (incluye el efecto divisa). Volatilidad = √(pesos × covarianza × pesos), con covarianza anualizada de rentabilidades semanales. Caída máxima = la peor caída de pico a valle de la cartera con los pesos de hoy, rebalanceada cada semana, con la liquidez al 0 %. Tipo sin riesgo hacia delante 2,4 % (depósito BCE); para el histórico, el €STR medio del periodo (≈2,8 % a 3 años, ≈1,7 % a 5 años).

| Cifra | Actual | Propuesta |
|---|---|---|
| Rentabilidad esperada optimista (ponderada) | +7,9 % | +12,6 % |
| Rentabilidad esperada realista (≈ la mitad) | +3,9 % | +6,3 % |
| Volatilidad anual (3 años) | 11,2 % | 14,1 % |
| Volatilidad anual (5 años) | 11,4 % | 14,5 % |
| Caída máxima histórica (3 años) | −12,6 % | −18,0 % |
| Caída máxima histórica (5 años) | −16,9 % | −22,8 % |
| **Sharpe estimado optimista** (vol. 3 años) | **0,49** | **0,72** |
| **Sharpe estimado realista** (vol. 3 años) | **0,14** | **0,28** |
| Sharpe histórico últimos 3 años (rent. anual +6,1 % / +10,7 %) | 0,30 | 0,56 |
| Sharpe histórico últimos 5 años (rent. anual +6,1 % / +8,4 %) | 0,38 | 0,46 |

Qué significa cada cifra y sus límites:

- **Volatilidad**: cuánto se mueve la cartera en un año normal; con 14 %, un año 14 puntos peor de lo esperado (≈ −2 % en la propuesta optimista) pasa más o menos uno de cada seis. Es del pasado y se queda corta en crisis.
- **Caída máxima**: lo peor que habría pasado con estos pesos en 3 o 5 años. Esos años no tuvieron un crac de verdad (2020 queda fuera): en un mal año de bolsa la propuesta puede caer un 30 % o más.
- **Sharpe estimado**: rentabilidad por encima del depósito por cada punto de volatilidad. El optimista (0,72) depende de que se cumplan los objetivos del método, que históricamente aciertan a medias; el realista (0,28) es la cifra más honesta. Por encima de 0,5 sostenido es bueno; el índice mundial suele dar 0,3-0,4 a largo plazo.
- **Sharpe histórico**: cómo habría ido con estos mismos valores. Está inflado por selección: se eligen hoy empresas que ya sabemos que fueron bien, así que no predice el futuro. Sirve solo como contraste.
- Puig cotiza desde mayo de 2024 y Nu desde diciembre de 2021: en las semanas sin datos su peso se reparte entre las demás acciones.

**Lectura.** La propuesta sube la rentabilidad esperada más de lo que sube el riesgo (Sharpe de 0,49 a 0,72 optimista; de 0,14 a 0,28 realista). El riesgo sube sobre todo porque baja la liquidez del 15 % al 5 % y entran cuatro growth muy volátiles (Shopify 62 %, Axon 59 %, Nu 40 % de volatilidad anual en EUR). El oro (16 %) casi no se mueve con las acciones (correlación media 0,06) y es lo que más amortigua.

## Exposición por divisa y sector

| Divisa | Actual | Propuesta |
|---|---|---|
| EUR | 32,3 % | 43,7 % |
| USD | 31,1 % | 29,7 % |
| Oro (cotiza en USD) | 16,3 % | 16,3 % |
| EUR (liquidez) | 15,4 % | 5,4 % |
| JPY | 4,9 % | 4,9 % |

| Sector | Actual | Propuesta |
|---|---|---|
| Software | 9,1 % | 18,2 % |
| Oro | 16,3 % | 16,3 % |
| Internet y comunicación | 16,1 % | 16,1 % |
| Financiero y pagos | 16,6 % | 15,3 % |
| Consumo y lujo | 14,4 % | 12,1 % |
| Servicios a empresas y datos | 2,7 % | 9,1 % |
| Salud | 9,4 % | 7,3 % |
| Liquidez | 15,4 % | 5,4 % |

Nu es un banco de Brasil y México que cotiza en USD: su riesgo real de divisa es el real brasileño. argenx es belga pero se compra en Nasdaq (USD).

## Volatilidad de cada valor (anual, en EUR)

| Valor | 3 años | 5 años | Correlación media con el resto (3 años) |
|---|---|---|---|
| Oro (IGLN) | 17,0 % | 15,5 % | 0,06 |
| Edenred | 39,8 % | 34,6 % | 0,11 |
| Daiichi Sankyo | 34,6 % | 34,2 % | 0,12 |
| Uber | 36,3 % | 42,2 % | 0,23 |
| Viscofan | 16,3 % | 16,7 % | 0,01 |
| Alphabet | 30,5 % | 31,5 % | 0,16 |
| Netflix | 34,9 % | 41,9 % | 0,21 |
| SAP | 29,6 % | 27,6 % | 0,30 |
| Intuit | 37,0 % | 36,6 % | 0,17 |
| Nemetschek | 35,3 % | 38,2 % | 0,28 |
| LVMH | 30,5 % | 29,9 % | 0,20 |
| Bureau Veritas | 21,8 % | 21,8 % | 0,21 |
| Zoetis | 30,1 % | 29,5 % | 0,17 |
| Puig | 29,7 % | 29,7 % | 0,10 |
| Hermès | 29,0 % | 30,6 % | 0,21 |
| ICE | 21,4 % | 22,1 % | 0,20 |
| Equifax | 33,3 % | 32,5 % | 0,29 |
| IBKR | 34,0 % | 32,7 % | 0,19 |
| Nu (growth, tramo 1) | 40,2 % | 48,3 % | 0,18 |
| argenx (growth, tramo 1) | 35,9 % | 39,2 % | 0,07 |
| Axon (growth, tramo 1) | 58,5 % | 52,6 % | 0,23 |
| Shopify (growth, tramo 1) | 61,6 % | 67,4 % | 0,26 |

## Archivos

- `bajar_precios.py`: baja los precios semanales a `precios/`.
- `calculo.py`: pesos, rentabilidad esperada, volatilidad, caída máxima, Sharpe y exposiciones → `resultados.json`.
- `tablas.py`: genera las tablas de este informe (`tablas.md`).

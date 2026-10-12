# Rentabilidad a 6 meses de las dos carteras en estático (12-oct-2026)

Las dos carteras, la **actual** y la **nueva** (la del rebalanceo propuesto), se miden en estático: los mismos títulos durante todo el periodo, sin operar, con el efectivo al 0 %. Todos los importes están en euros, convertidos al tipo de cambio de cada fecha.

- **Fecha inicial:** viernes 10-abr-2026, que es el último cierre igual o anterior al 12-abr (un domingo).
- **Fecha final:** viernes 9-oct-2026, el último cierre completo. El 12-oct la sesión europea seguía abierta, EE. UU. no había abierto y Tokio cerraba por festivo.

| Valor | Títulos actual | Títulos nuevo | Precio hace 6 m (EUR) | Precio hoy (EUR) | Rentabilidad 6 m (precio) | Con dividendos | Contribución pp (actual → nuevo) |
|---|--:|--:|--:|--:|--:|--:|--:|
| Oro (IGLN) | 68 | 68 | 79,20 | 72,49 | −8,5 % | −8,5 % | −1,75 → −1,75 |
| Edenred | 136 | 81 | 18,43 | 28,25 | +53,2 % | +60,5 % | +5,12 → +3,04 |
| Alphabet A | 5 | 2 | 271,35 | 313,62 | +15,6 % | +15,7 % | +0,81 → +0,32 |
| Daiichi Sankyo | 100 | 100 | 14,91 | 14,80 | −0,7 % | +1,2 % | −0,04 → −0,04 |
| Netflix | 23 | 0 | 88,11 | 62,69 | −28,8 % | −28,8 % | −2,24 → 0,00 |
| PepsiCo | 12 | 12 | 134,34 | 112,34 | −16,4 % | −14,5 % | −1,01 → −1,01 |
| SAP | 7 | 7 | 139,38 | 191,46 | +37,4 % | +39,2 % | +1,40 → +1,39 |
| Zoetis | 20 | 28 | 100,81 | 66,72 | −33,8 % | −32,9 % | −2,62 → −3,65 |
| Hermès | 1 | 0 | 1.757,50 | 1.283,00 | −27,0 % | −26,3 % | −1,82 → 0,00 |
| Puig | 70 | 70 | 17,36 | 18,08 | +4,1 % | +6,6 % | +0,19 → +0,19 |
| Grifols A | 120 | 84 | 8,93 | 9,88 | +10,6 % | +11,5 % | +0,44 → +0,30 |
| ICE | 6 | 6 | 137,37 | 139,29 | +1,4 % | +2,1 % | +0,04 → +0,04 |
| Equifax | 6 | 6 | 152,22 | 130,01 | −14,6 % | −14,0 % | −0,51 → −0,51 |
| Wolters Kluwer | 0 | 28 | 62,68 | 75,00 | +19,7 % | +23,8 % | 0,00 → +1,32 |
| Auto Trader | 0 | 287 | 5,45 | 5,77 | +5,8 % | +7,5 % | 0,00 → +0,35 |
| Trigano | 0 | 12 | 152,40 | 125,30 | −17,8 % | −16,2 % | 0,00 → −1,24 |
| Deckers | 0 | 14 | 92,26 | 73,92 | −19,9 % | −19,9 % | 0,00 → −0,98 |
| Pluxee | 0 | 50 | 11,07 | 14,49 | +30,9 % | +30,9 % | 0,00 → +0,65 |
| Technip Energies | 0 | 20 | 39,12 | 29,14 | −25,5 % | −23,0 % | 0,00 → −0,76 |
| Efectivo | 2.920 € | 357 € | — | — | 0,0 % | 0,0 % | 0,00 → 0,00 |
| **Total (EUR inicial → final)** | **26.073 → 25.554** | **26.159 → 25.551** | | | | | **−2,0 → −2,3** |

## Rentabilidad de cada cartera

| | Actual | Nueva |
|---|--:|--:|
| Valor inicial (10-abr) | 26.073 € | 26.159 € |
| Valor final (9-oct), por precio | 25.554 € | 25.551 € |
| **Rentabilidad por precio** | **−2,0 % (−519 €)** | **−2,3 % (−608 €)** |
| Dividendos cobrados en el periodo (brutos) | 341 € | 405 € |
| **Rentabilidad con dividendos** | **−0,7 % (−178 €)** | **−0,8 % (−203 €)** |

**La diferencia entre las dos carteras es pequeña: la nueva rinde 0,3 pp menos por precio y 0,1 pp menos con dividendos.** A favor de la nueva juegan no tener Netflix (+2,24 pp) ni Hermès (+1,82 pp) y haber entrado en Wolters Kluwer (+1,32), Pluxee (+0,65) y Auto Trader (+0,35). En contra pesan los 55 títulos de Edenred que vende (−2,08 pp: Edenred es el valor que más sube, un +53 %), Trigano (−1,24), las 8 acciones más de Zoetis (−1,03), Deckers (−0,98), Technip Energies (−0,76) y las 3 acciones menos de Alphabet (−0,49). El resto de valores apenas cambia el resultado.

## Método, fechas y fuentes

- **Precios:** cierres diarios de Yahoo Finance (API de gráficos v8, la misma fuente que `herramientas/yahoo.mjs`), descargados el 12-oct-2026. La serie de cierre ya viene ajustada por splits. En el periodo no hubo ningún split ni escisión. El split 10:1 de Netflix fue en noviembre de 2025, antes del periodo, así que los dos precios ya son post-split: 70,30 USD, es decir 62,69 EUR, el 9-oct.
- **Tickers:** IGLN.L (LSE, cotiza en USD), EDEN.PA, GOOGL, 4568.T, NFLX, PEP, SAP.DE, ZTS, RMS.PA, PUIG.MC, GRF.MC, ICE, EFX, WKL.AS, AUTO.L (cotiza en peniques, GBp: se divide entre 100), TRI.PA, DECK, PLX.PA y TE.PA.
- **Tipos de cambio** (Yahoo, EURUSD=X, EURGBP=X y EURJPY=X, al cierre de cada fecha):

  | Fecha | EUR/USD | EUR/GBP | EUR/JPY |
  |---|--:|--:|--:|
  | 10-abr-2026 | 1,1691 | 0,87048 | 185,99 |
  | 9-oct-2026 | 1,1213 | 0,84746 | 177,23 |

  Los dividendos se convierten al tipo de cambio de su fecha ex-dividendo.
- **Precios en divisa local (10-abr → 9-oct):**

  | Valor | Inicial | Final |
  |---|--:|--:|
  | IGLN | 92,60 USD | 81,285 USD |
  | Edenred | 18,435 € | 28,25 € |
  | Alphabet | 317,24 USD | 351,66 USD |
  | Daiichi Sankyo | 2.772,5 JPY | 2.623 JPY |
  | Netflix | 103,01 USD | 70,30 USD |
  | PepsiCo | 157,06 USD | 125,97 USD |
  | SAP | 139,38 € | 191,46 € |
  | Zoetis | 117,86 USD | 74,81 USD |
  | Hermès | 1.757,5 € | 1.283 € |
  | Puig | 17,36 € | 18,08 € |
  | Grifols A | 8,934 € | 9,88 € |
  | ICE | 160,60 USD | 156,19 USD |
  | Equifax | 177,97 USD | 145,78 USD |
  | Wolters Kluwer | 62,68 € | 75,00 € |
  | Auto Trader | 474,4 GBp | 488,7 GBp |
  | Trigano | 152,40 € | 125,30 € |
  | Deckers | 107,86 USD | 82,89 USD |
  | Pluxee | 11,07 € | 14,49 € |
  | Technip Energies | 39,12 € | 29,14 € |
- **Dividendos:** solo cuentan los que tienen fecha ex-dividendo dentro del periodo (11-abr a 9-oct), según los eventos de Yahoo. Se suman en bruto, sin retenciones y sin reinvertir.
  - Algunos dividendos quedan fuera porque su fecha ex-dividendo es anterior al 10-abr: Daiichi Sankyo (39 JPY, 30-mar) y Trigano (2,10 €, 31-mar).
  - Dividendos incluidos: Edenred 1,33 €; Alphabet 2 × 0,22 USD; Daiichi Sankyo 50 JPY; PepsiCo 2 × 1,48 USD; SAP 2,50 €; Zoetis 2 × 0,53 USD; Hermès 13 €; Puig 0,4216 €; Grifols A 0,0824 €; ICE 2 × 0,52 USD; Equifax 2 × 0,56 USD; Wolters Kluwer 1,59 € y 1,01 €; Auto Trader 7,8 GBp; Trigano 2,40 €; Technip Energies 1,00 €.
  - El oro (IGLN), Netflix, Deckers y Pluxee no repartieron dividendo.
- **Cálculo:**
  - Valor de cada cartera = suma de títulos × precio en EUR + efectivo.
  - Contribución de cada valor (en pp) = títulos × (precio final − precio inicial) / valor inicial total de la cartera × 100. Se calcula sobre el precio, sin dividendos.

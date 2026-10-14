# Empresas marcadas por las pruebas de robustez (14-oct-2026)

> **Actualización 14-oct, noche (selector de método y objetivo fijo):** las Comprar robustas pasan a ser Daiichi, Nemetschek, Viscofan (en el borde con v2: límite 53,78 EUR), Intuit (en el borde: límite 301,66 USD) y Dunelm (minorista, excluida). Bureau Veritas y ANYCOLOR dejan de serlo (v2 13,4 % y 12,7 %). Cifras al día en `verticales/empresa/robustez.json`.

Generado con `node herramientas/robustez.mjs --todas --escribir` y `robustez-growth.mjs --precios --escribir` al cierre del 14-oct (EE. UU. y Tokio, 13-oct). Las cifras son las de `objetivo12m-revisados.json` (v3 ×1,1 decide, v2 controla). Significado de cada código: `verticales/empresa/robustez.md`.

## Resumen value (148 informes)

- Veredicto: frágil 44, sólida 104. Ningún dato de precio o divisa bloqueado: los fallos de precio de hoy (Experian, Constellation) ya están corregidos en los datos; el de Constellation sigue en la tabla de órdenes (CAD contra USD).
- Dan Comprar con la regla vigente (sin contar la confianza) 48; **siguen siendo Comprar con todas las pruebas 5**: Bureau Veritas, Daiichi Sankyo, Dunelm, Nemetschek, Viscofan.
- Marcas: D4 AVISO 1 · D5 AVISO 1 · D5 VARIANTE 9 · D6 AVISO 2 · D6 CONFIANZA 21 · D7 AVISO 12 · E1 CONFIANZA 2 · E2 AVISO 61 · M1 AVISO 3 · M1 VARIANTE 30 · M2 AVISO 52 · M2 CONFIANZA 9 · M3 VARIANTE 11 · M4 VARIANTE 39 · M6 AVISO 107 · V1 AVISO 54 · V2 AVISO 3 · V3 CONFIANZA 45.

## Value: empresas con alguna marca que cambia el tratamiento (VARIANTE, CONFIANZA o CORREGIR) o señal frágil

| Empresa | v3 / v2 | Veredicto | Acción vigente → robusta | Marcas | Qué cambia la acción | Límite de compra (broker) |
|---|---|---|---|---|---|---|
| Adobe | 17,0 / 6,3 | frágil | Comprar → **No mantener** | M1 | v2 (control): No mantener (6,3 %); v2 sin doble castigo: No mantener (6,3 %) | 240,34 USD (v2 218,50) |
| Adyen | 35,5 / 22,8 | sólida | Mantener en cartera → **Mantener en cartera** | M1 | — | 908,88 EUR (v2 908,88) |
| Aena | -10,5 / -6,9 | sólida | No mantener → **No mantener** | M2, V3 | — | 19,64 EUR (v2 20,09) |
| Alcon | 26,3 / — | sólida | Comprar → **Mantener en cartera** | D6, V3 | — | 56,29 CHF |
| Alibaba | 23,2 / -22,8 | frágil | Comprar → **No mantener** | D5, M3, M4, M4, V3 | v2 (control): No mantener (-22,8 %); v2 sin doble castigo: No mantener (-19,9 %) | 118,76 USD (v2 74,40) |
| Almirall | 18,0 / — | sólida | Comprar → **Mantener en cartera** | D6, M2 | — | 10,41 EUR |
| Alphabet | -2,6 / 1,0 | sólida | No mantener → **No mantener** | M4 | — | 252,74 USD (v2 252,74) |
| Amadeus | 25,8 / 14,3 | frágil | Comprar → **Mantener en cartera** | V3 | v2 (control): Mantener en cartera (14,3 %); v2 sin doble castigo: Mantener en cartera (14,3 %) | 57,22 EUR (v2 52,20) |
| ANYCOLOR | 21,6 / 15,4 | frágil | Comprar → **Mantener en cartera** | M2, M4 | v2 (control): Mantener en cartera (15,4 %); v2 sin doble castigo: Mantener en cartera (15,4 %) | 3320,90 JPY (v2 3136,45) |
| ASML | 16,7 / 16,2 | sólida | No mantener → **No mantener** | D6 | — | 1082,19 EUR (v2 1082,19) |
| Auto Trader | 19,1 / 8,4 | frágil | Comprar → **No mantener** | M1 | v2 (control): No mantener (8,4 %); v2 sin doble castigo: No mantener (8,4 %) | 5,30 GBP (v2 4,83) |
| Booking | 25,8 / 14,3 | frágil | Comprar → **Mantener en cartera** | M1 | v2 (control): Mantener en cartera (14,3 %); v2 sin doble castigo: Mantener en cartera (14,3 %) | 171,50 USD (v2 156,04) |
| Bureau Veritas | 26,6 / 19,5 | sólida | Comprar → **Comprar** | M2 | — | 30,39 EUR (v2 28,32) |
| Burkhalter | -8,8 / -8,8 | sólida | No mantener → **No mantener** | M4 | — | 98,17 CHF (v2 98,14) |
| Cadence | 29,2 / 12,0 | sólida | No mantener → **No mantener** | D6, M1, M3 | — | 147,55 USD (v2 147,55) |
| CAF | -0,5 / 8,9 | sólida | No mantener → **No mantener** | M4 | — | 68,98 EUR (v2 75,48) |
| Cochlear | 18,9 / — | sólida | No mantener → **No mantener** | D6 | — | 100,16 AUD |
| Coloplast | 25,9 / 14,8 | frágil | Comprar → **Mantener en cartera** | M1 | v2 (control): Mantener en cartera (14,8 %); v2 sin doble castigo: Mantener en cartera (14,8 %) | 498,65 DKK (v2 454,57) |
| Constellation | 15,1 / — | sólida | Comprar → **Mantener en cartera** | D6 | — | 3096,23 CAD |
| Cooper | 25,9 / 14,2 | frágil | Comprar → **Mantener en cartera** | M1 | v2 (control): Mantener en cartera (14,2 %); v2 sin doble castigo: Mantener en cartera (14,2 %) | 57,10 USD (v2 53,38) |
| Copart | 19,9 / 8,4 | frágil | Mantener en cartera → **No mantener** | — | v2 (control): No mantener (8,4 %); v2 sin doble castigo: No mantener (8,4 %) | 25,71 USD (v2 24,87) |
| CSL | 23,6 / 7,8 | sólida | No mantener → **No mantener** | M1, M3, M4 | — | 139,52 AUD (v2 139,52) |
| CTS Eventim | 23,3 / 12,0 | frágil | Comprar → **Mantener en cartera** | — | v2 (control): Mantener en cartera (12,0 %); v2 sin doble castigo: Mantener en cartera (12,0 %) | 64,43 EUR (v2 58,72) |
| Daiichi Sankyo | 38,8 / 27,5 | sólida | Comprar → **Comprar** | D5, D5, M1 | — | 2888,64 JPY (v2 2784,31) |
| Danaher | 25,9 / 13,8 | sólida | No mantener → **No mantener** | D6 | — | 150,84 USD (v2 150,84) |
| Dassault Systèmes | 20,1 / 9,4 | frágil | Comprar → **No mantener** | M1 | v2 (control): No mantener (9,4 %); v2 sin doble castigo: No mantener (9,4 %) | 23,49 EUR (v2 21,39) |
| Deckers | 15,2 / 4,3 | frágil | Comprar → **No mantener** | — | v2 (control): No mantener (4,3 %); v2 sin doble castigo: No mantener (4,3 %) | 84,16 USD (v2 76,18) |
| Deutsche Börse | 0,6 / 6,9 | sólida | No mantener → **No mantener** | V3 | — | 265,56 EUR (v2 282,20) |
| Diageo | 5,5 / — | sólida | No mantener → **No mantener** | D6 | — | 15,95 GBP |
| DSV | 26,8 / 14,8 | frágil | Comprar → **Mantener en cartera** | D6 | v2 (control): Mantener en cartera (14,8 %); v2 sin doble castigo: Mantener en cartera (14,8 %) | 1274,87 DKK (v2 1153,67) |
| Edenred | 24,8 / 10,3 | frágil | Comprar → **Mantener en cartera** | M1, M4 | v2 (control): Mantener en cartera (10,3 %); v2 sin doble castigo: Mantener en cartera (12,5 %) | 31,34 EUR (v2 27,70) |
| Edwards | 14,4 / — | sólida | No mantener → **No mantener** | D6, V3 | — | 57,69 USD |
| Elevance | 22,0 / 6,7 | frágil | Comprar → **No mantener** | M3 | v2 (control): No mantener (6,7 %); v2 sin doble castigo: No mantener (6,7 %) | 444,43 USD (v2 394,49) |
| Enagás | -9,5 / -9,6 | sólida | No mantener → **No mantener** | D5 | — | 13,18 EUR (v2 13,16) |
| Endesa | -13,5 / -24,8 | sólida | No mantener → **No mantener** | M4, V3 | — | 32,49 EUR (v2 28,23) |
| Equifax | 32,0 / 19,9 | sólida | Comprar → **Mantener en cartera** | D6, M1 | — | 162,26 USD (v2 153,18) |
| EssilorLuxottica | 23,2 / 12,2 | frágil | Comprar → **Mantener en cartera** | M1, V3 | v2 (control): Mantener en cartera (12,2 %); v2 sin doble castigo: Mantener en cartera (12,2 %) | 158,34 EUR (v2 144,55) |
| Experian | 26,8 / 15,5 | frágil | Comprar → **Mantener en cartera** | V3 | v2 (control): Mantener en cartera (15,5 %); v2 sin doble castigo: Mantener en cartera (15,5 %) | 2937,62 GBp (v2 2676,37) |
| Ferrovial | 9,9 / — | sólida | No mantener → **No mantener** | V3 | — | 28,75 EUR |
| FICO | 17,4 / 6,5 | sólida | No mantener → **No mantener** | M1, V3 | — | 560,84 USD (v2 560,84) |
| Fielmann | 26,0 / 14,4 | frágil | Comprar → **Mantener en cartera** | M1 | v2 (control): Mantener en cartera (14,4 %); v2 sin doble castigo: Mantener en cartera (14,4 %) | 40,16 EUR (v2 36,49) |
| Fiserv | 15,8 / 5,5 | frágil | Comprar → **No mantener** | M1, V3 | v2 (control): No mantener (5,5 %); v2 sin doble castigo: No mantener (5,5 %) | 46,97 USD (v2 42,80) |
| Fluidra | 25,4 / 14,2 | frágil | Comprar → **Mantener en cartera** | — | v2 (control): Mantener en cartera (14,2 %); v2 sin doble castigo: Mantener en cartera (14,2 %) | 18,86 EUR (v2 17,18) |
| Games Workshop | -3,2 / -1,8 | sólida | No mantener → **No mantener** | M4 | — | 102,00 GBP (v2 102,00) |
| Gartner | 15,0 / 4,3 | frágil | Comprar → **No mantener** | M1 | v2 (control): No mantener (4,3 %); v2 sin doble castigo: No mantener (4,3 %) | 197,01 USD (v2 178,60) |
| Givaudan | 8,7 / 4,9 | sólida | No mantener → **No mantener** | V3 | — | 3233,97 CHF (v2 3233,97) |
| Grifols | 22,5 / 10,9 | frágil | Comprar → **Mantener en cartera** | D5, M1 | v2 (control): Mantener en cartera (10,9 %); v2 sin doble castigo: Mantener en cartera (10,9 %) | 10,45 EUR (v2 9,47) |
| Group 1 | -4,3 / 7,5 | sólida | No mantener → **No mantener** | M4, V3 | — | 192,78 USD (v2 216,40) |
| Halma | 7,3 / 7,3 | sólida | No mantener → **No mantener** | V3 | — | 19,39 GBP (v2 19,39) |
| Heineken | 17,8 / 7,6 | frágil | Comprar → **No mantener** | V3 | v2 (control): No mantener (7,6 %); v2 sin doble castigo: No mantener (7,6 %) | 75,53 EUR (v2 68,95) |
| Iberdrola | -8,3 / -16,9 | sólida | No mantener → **No mantener** | V3 | — | 13,83 EUR (v2 13,83) |
| ICE | 22,5 / 11,6 | frágil | Comprar → **Mantener en cartera** | — | v2 (control): Mantener en cartera (11,6 %); v2 sin doble castigo: Mantener en cartera (11,6 %); BPA consenso: Mantener en cartera (10,0 %) | 160,42 USD (v2 151,76) |
| ICON | 35,5 / 20,2 | sólida | Mantener en cartera → **Mantener en cartera** | D6, M1, M3 | — | 163,26 USD (v2 163,26) |
| Inditex | -5,5 / 5,5 | sólida | No mantener → **No mantener** | M4 | — | 44,48 EUR (v2 44,48) |
| Indra | -2,9 / -23,0 | sólida | No mantener → **No mantener** | D5, M3, M4 | — | 52,83 EUR (v2 40,88) |
| Intuit | 26,0 / 14,7 | frágil | Comprar → **Mantener en cartera** | M1 | v2 (control): Mantener en cartera (14,7 %); v2 sin doble castigo: Mantener en cartera (14,7 %) | 330,30 USD (v2 300,56) |
| Kering | 14,6 / — | frágil | Mantener en cartera → **Mantener en cartera** | D6, V3 | pesos 25/50/25: Comprar (17,2 %) | 212,39 EUR |
| KONE | 11,9 / 10,4 | sólida | No mantener → **No mantener** | V3 | — | 45,49 EUR (v2 45,49) |
| Kongsberg | -7,6 / 18,1 | sólida | No mantener → **No mantener** | D6, M3, M4 | — | 175,75 NOK (v2 175,75) |
| Krones | 13,8 / 3,4 | frágil | Mantener en cartera → **No mantener** | — | v2 (control): No mantener (3,4 %); v3 tope ×1,3: Comprar (21,1 %); v2 sin doble castigo: No mantener (3,4 %); pesos 25/50/25: Comprar (21,3 %) | 107,50 EUR (v2 97,68) |
| Kuehne+Nagel | 2,8 / — | sólida | No mantener → **No mantener** | M4, V3 | — | 184,20 CHF |
| L’Oréal | 18,4 / 9,7 | sólida | No mantener → **No mantener** | V3 | — | 284,54 EUR (v2 284,54) |
| Logista | -6,0 / — | sólida | No mantener → **No mantener** | V3 | — | 29,59 EUR |
| Lonza | 18,0 / — | sólida | No mantener → **No mantener** | V3 | — | 456,97 CHF |
| Lululemon | 13,8 / 3,2 | frágil | Mantener en cartera → **No mantener** | M1 | v2 (control): No mantener (3,2 %); v3 tope ×1,3: Comprar (34,6 %); v2 sin doble castigo: No mantener (3,2 %); pesos 25/50/25: Comprar (21,1 %) | 93,33 USD (v2 84,68) |
| LVMH | 29,6 / 17,8 | sólida | Comprar → **Mantener en cartera** | E1 | — | 410,00 EUR (v2 397,18) |
| Medpace | -7,2 / 3,8 | sólida | No mantener → **No mantener** | M4 | — | 326,15 USD (v2 326,15) |
| Merck KGaA | 23,6 / 9,5 | frágil | Mantener en cartera → **No mantener** | — | v2 (control): No mantener (9,5 %); v2 sin doble castigo: No mantener (9,5 %) | 134,52 EUR (v2 134,52) |
| Meta | -11,7 / -11,8 | sólida | No mantener → **No mantener** | M4, M4, V3 | — | 529,62 USD (v2 529,62) |
| Moncler | 22,2 / 14,1 | frágil | Comprar → **Mantener en cartera** | V3 | v2 (control): Mantener en cartera (14,1 %); v2 sin doble castigo: Mantener en cartera (14,1 %) | 45,00 EUR (v2 43,99) |
| Nestlé | 23,5 / 6,5 | frágil | Comprar → **No mantener** | M3 | v2 (control): No mantener (6,5 %); v2 sin doble castigo: No mantener (6,5 %) | 83,90 CHF (v2 73,06) |
| Netflix | 30,7 / 18,5 | sólida | Mantener en cartera → **Mantener en cartera** | M1 | — | 61,10 USD (v2 61,10) |
| Novo Nordisk | 18,7 / 8,7 | frágil | Comprar → **No mantener** | M1 | v2 (control): No mantener (8,7 %); v2 sin doble castigo: No mantener (8,7 %) | 264,25 DKK (v2 241,85) |
| Nvidia | 14,3 / — | sólida | Mantener en cartera → **Mantener en cartera** | D6 | — | 224,02 USD |
| Olympus | 10,2 / 12,3 | sólida | Mantener en cartera → **Mantener en cartera** | D6, M4 | — | 1902,53 JPY (v2 1902,53) |
| On | 35,8 / 12,5 | sólida | No mantener → **No mantener** | D5, D6, M1, M2, M3 | — | 28,75 USD (v2 28,75) |
| Partners Group | 31,8 / — | sólida | Comprar → **Mantener en cartera** | M1, V3 | — | 679,76 CHF |
| PepsiCo | 18,6 / 8,5 | frágil | Comprar → **No mantener** | — | v2 (control): No mantener (8,5 %); v2 sin doble castigo: No mantener (8,5 %) | 131,26 USD (v2 120,15) |
| Pernod Ricard | 18,9 / — | sólida | Comprar → **Mantener en cartera** | V3 | — | 68,37 EUR |
| Pluxee | 8,2 / — | frágil | No mantener → **No mantener** | M2 | pesos 25/50/25: Mantener en cartera (12,4 %) | 14,15 EUR |
| Rentokil | 35,4 / 22,9 | sólida | Mantener en cartera → **Mantener en cartera** | D6, M1 | — | 283,22 GBp (v2 283,22) |
| Repsol | -18,8 / -18,8 | sólida | No mantener → **No mantener** | M4, M4, V3 | — | 21,25 EUR (v2 21,25) |
| Rightmove | 26,7 / 14,9 | frágil | Comprar → **Mantener en cartera** | — | v2 (control): Mantener en cartera (14,9 %); v2 sin doble castigo: Mantener en cartera (14,9 %) | 5,21 GBP (v2 5,03) |
| Roche | 17,4 / -10,5 | frágil | Mantener en cartera → **No mantener** | M2, M3 | v2 (control): No mantener (-10,5 %); v2 sin doble castigo: No mantener (-10,5 %) | 366,92 CHF (v2 286,78) |
| Rovi | 6,5 / 13,0 | frágil | No mantener → **No mantener** | M4, V3 | v2 (control): Mantener en cartera (13,0 %); sin doble castigo: Mantener en cartera (12,6 %); v2 sin doble castigo: Mantener en cartera (13,0 %) | 51,53 EUR (v2 51,53) |
| Ryanair | -1,8 / — | sólida | No mantener → **No mantener** | V3 | — | 18,88 EUR |
| Salesforce | 36,9 / 15,9 | sólida | Mantener en cartera → **Mantener en cartera** | M3 | — | 208,20 USD (v2 208,20) |
| Sanofi | 28,2 / 17,4 | sólida | Comprar → **Mantener en cartera** | M2, V3 | — | 78,82 EUR (v2 72,71) |
| SAP | 28,8 / 19,0 | sólida | Mantener en cartera → **Mantener en cartera** | M4 | — | 191,35 EUR (v2 191,35) |
| Schindler | 5,3 / — | sólida | No mantener → **No mantener** | V3 | — | 243,90 CHF |
| Sectra | 11,0 / 15,6 | sólida | No mantener → **No mantener** | M4, M4, V3 | — | 125,24 SEK (v2 125,24) |
| ServiceNow | 17,6 / — | sólida | No mantener → **No mantener** | V3 | — | 76,82 USD |
| Shimano | 0,9 / 14,1 | sólida | No mantener → **No mantener** | M4, V3 | — | 13.019,08 JPY (v2 13.019,08) |
| Siemens Healthineers | 24,9 / — | sólida | Comprar → **Mantener en cartera** | V3 | — | 41,95 EUR |
| Sika | 25,6 / — | sólida | Mantener en cartera → **Mantener en cartera** | V3 | — | 174,92 CHF |
| Spirax | 20,5 / 10,2 | sólida | No mantener → **No mantener** | M1, V3 | — | 58,62 GBP (v2 58,62) |
| Straumann | 26,0 / 14,5 | sólida | No mantener → **No mantener** | V3 | — | 75,97 CHF (v2 75,97) |
| Sunbelt (Ashtead) | -7,6 / -4,8 | sólida | No mantener → **No mantener** | M4, V3 | — | 41,22 USD (v2 41,22) |
| Technip Energies | -10,2 / -8,4 | sólida | No mantener → **No mantener** | M4, M4 | — | 23,59 EUR (v2 24,05) |
| Teleperformance | 21,0 / 11,8 | frágil | Comprar → **Mantener en cartera** | M1, V3 | v2 (control): Mantener en cartera (11,8 %); v2 sin doble castigo: Mantener en cartera (11,8 %) | 78,26 EUR (v2 72,33) |
| Tencent | 23,8 / 12,1 | frágil | Comprar → **Mantener en cartera** | V3 | v2 (control): Mantener en cartera (12,1 %); v2 sin doble castigo: Mantener en cartera (12,1 %) | 453,45 HKD (v2 411,73) |
| Texas Instruments | -4,7 / -18,8 | sólida | No mantener → **No mantener** | M4, M4 | — | 166,38 USD (v2 166,38) |
| Tomra | 46,0 / 32,1 | sólida | Mantener en cartera → **Mantener en cartera** | M1 | — | 86,77 NOK (v2 86,77) |
| Trigano | -10,1 / -8,0 | sólida | No mantener → **No mantener** | M4 | — | 97,74 EUR (v2 100,04) |
| TSMC | 6,1 / 11,2 | frágil | No mantener → **No mantener** | D6, M4, M4 | v2 (control): Mantener en cartera (11,2 %); v2 sin doble castigo: Mantener en cartera (15,9 %) | 2142,85 TWD (v2 2142,85) |
| Uber | 11,5 / — | sólida | Mantener en cartera → **Mantener en cartera** | D5, D5, M2 | — | 69,16 USD |
| Unilever | 14,4 / 8,4 | frágil | Mantener en cartera → **No mantener** | V3 | v2 (control): No mantener (8,4 %); v2 sin doble castigo: No mantener (8,4 %) | 4802,98 GBp (v2 4553,22) |
| UnitedHealth | 26,3 / 18,4 | sólida | Mantener en cartera → **Mantener en cartera** | E1 | — | 371,62 USD (v2 371,62) |
| VAT | 15,1 / 4,0 | sólida | No mantener → **No mantener** | D6, M4, M4 | — | 272,01 CHF (v2 272,01) |
| Veeva | 14,5 / — | sólida | No mantener → **No mantener** | V3 | — | 166,15 USD |
| Verisk | 23,9 / 12,6 | frágil | Comprar → **Mantener en cartera** | — | v2 (control): Mantener en cartera (12,6 %); v2 sin doble castigo: Mantener en cartera (12,6 %) | 182,74 USD (v2 172,93) |
| Vertiv | 17,0 / 24,4 | sólida | No mantener → **No mantener** | D6, M4 | — | 168,18 USD (v2 168,18) |
| Watches of Switzerland | 2,2 / -5,1 | sólida | No mantener → **No mantener** | M4, M4, V3 | — | 6,05 GBP (v2 5,63) |
| Wolters Kluwer | 15,1 / 5,1 | frágil | Comprar → **No mantener** | — | v2 (control): No mantener (5,1 %); v2 sin doble castigo: No mantener (5,1 %) | 78,13 EUR (v2 71,34) |
| Zoetis | 15,4 / 5,4 | frágil | Comprar → **No mantener** | M1 | v2 (control): No mantener (5,4 %); v2 sin doble castigo: No mantener (5,4 %) | 74,59 USD (v2 68,11) |

## Growth (2 informes, precio de Yahoo del 14-oct)

| Empresa | v9 pond. / base | Señal | Veredicto | Señal robusta | Marcas | Con ventas del analista |
|---|---|---|---|---|---|---|
| Rheinmetall AG | 3,5 / -2,1 | Mantener | sólida | Mantener | — | — |
| Spotify Technology | -0,6 / -5,0 | Mantener | sólida | Mantener | — | — |

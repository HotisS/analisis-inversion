# Backtest de la rentabilidad esperada a 3 años · 2026-10-15 · BPA ingenuo

Generado con `node herramientas/backtest-3a.mjs`. Protocolo y criterio fijados antes en `tres-anios-preregistro-2026-10-15.md`. 43 empresas, 97 cierres con 12 meses y 3 años a la vez (cierres t de 2019 a 2022; 56 de diseño y 41 de validación por empresas alternas). BPA futuro ingenuo (crecimiento mediano de la historia conocida, entre −10 % y +25 %). A 12 meses decide la regla vigente (v3 ×1,1 con selector); a 3 años, mediana adelantada de 5 años × BPA de t+4, anualizada con dividendos. «Real 3 a» = rentabilidad anual real de t a t+3 con dividendos.

### Todos (97 cierres; mediana real de todos: 12,9 % a 12 m, 9,6 % anual a 3 a)

| Estrategia | Compras | Real 12 m | Real 3 a (anual) | Resto 3 a (anual) | Compras ≥ 10 % anual a 3 a | Compras en pérdida a 3 a |
|---|--:|--:|--:|--:|--:|--:|
| A. Solo 12 m (vigente) | 19 | 12,4 % | 13,9 % | 9,4 % | 58 % | 11 % |
| B. 12 m o radar (3 a ≥ 15 % y base 12 m ≥ 0) | 30 | 16,7 % | 12,7 % | 9,1 % | 57 % | 13 % |
|   · solo las añadidas por el radar | 11 | 20,9 % | 10,4 % | 9,6 % | 55 % | 18 % |
| C. Solo 3 años (≥ 15 % anual) | 30 | 16,7 % | 12,7 % | 9,1 % | 57 % | 13 % |
| D. 12 m y 3 años (≥ 10 % anual) | 19 | 12,4 % | 13,9 % | 9,4 % | 58 % | 11 % |
|   · B con el múltiplo de control | 29 | 12,4 % | 12,3 % | 9,2 % | 55 % | 14 % |

### Validación (41 cierres; mediana real de todos: 13,1 % a 12 m, 9,4 % anual a 3 a)

| Estrategia | Compras | Real 12 m | Real 3 a (anual) | Resto 3 a (anual) | Compras ≥ 10 % anual a 3 a | Compras en pérdida a 3 a |
|---|--:|--:|--:|--:|--:|--:|
| A. Solo 12 m (vigente) | 7 | 27,9 % | 20,2 % | 7,7 % | 71 % | 14 % |
| B. 12 m o radar (3 a ≥ 15 % y base 12 m ≥ 0) | 11 | -1,3 % | 9,4 % | 8,9 % | 45 % | 27 % |
|   · solo las añadidas por el radar | 4 | -37,9 % | -1,2 % | 10,9 % | 0 % | 50 % |
| C. Solo 3 años (≥ 15 % anual) | 11 | -1,3 % | 9,4 % | 8,9 % | 45 % | 27 % |
| D. 12 m y 3 años (≥ 10 % anual) | 7 | 27,9 % | 20,2 % | 7,7 % | 71 % | 14 % |
|   · B con el múltiplo de control | 11 | -1,3 % | 9,4 % | 8,9 % | 45 % | 27 % |

### Diseño (56 cierres; mediana real de todos: 12,6 % a 12 m, 10,1 % anual a 3 a)

| Estrategia | Compras | Real 12 m | Real 3 a (anual) | Resto 3 a (anual) | Compras ≥ 10 % anual a 3 a | Compras en pérdida a 3 a |
|---|--:|--:|--:|--:|--:|--:|
| A. Solo 12 m (vigente) | 12 | 11,9 % | 11,8 % | 10,1 % | 50 % | 8 % |
| B. 12 m o radar (3 a ≥ 15 % y base 12 m ≥ 0) | 19 | 33,7 % | 13,9 % | 9,1 % | 63 % | 5 % |
|   · solo las añadidas por el radar | 7 | 38,0 % | 18,9 % | 9,4 % | 86 % | 0 % |
| C. Solo 3 años (≥ 15 % anual) | 19 | 33,7 % | 13,9 % | 9,1 % | 63 % | 5 % |
| D. 12 m y 3 años (≥ 10 % anual) | 12 | 11,9 % | 11,8 % | 10,1 % | 50 % | 8 % |
|   · B con el múltiplo de control | 18 | 27,3 % | 13,1 % | 9,2 % | 61 % | 6 % |

### Cierres hasta 2020 (49 cierres; mediana real de todos: 37,8 % a 12 m, 11,2 % anual a 3 a)

| Estrategia | Compras | Real 12 m | Real 3 a (anual) | Resto 3 a (anual) | Compras ≥ 10 % anual a 3 a | Compras en pérdida a 3 a |
|---|--:|--:|--:|--:|--:|--:|
| A. Solo 12 m (vigente) | 5 | 55,5 % | 34,8 % | 11,0 % | 60 % | 20 % |
| B. 12 m o radar (3 a ≥ 15 % y base 12 m ≥ 0) | 9 | 54,3 % | 23,0 % | 11,0 % | 67 % | 11 % |
|   · solo las añadidas por el radar | 4 | 46,4 % | 16,7 % | 11,2 % | 75 % | 0 % |
| C. Solo 3 años (≥ 15 % anual) | 9 | 54,3 % | 23,0 % | 11,0 % | 67 % | 11 % |
| D. 12 m y 3 años (≥ 10 % anual) | 5 | 55,5 % | 34,8 % | 11,0 % | 60 % | 20 % |
|   · B con el múltiplo de control | 9 | 54,3 % | 23,0 % | 11,0 % | 67 % | 11 % |

### Cierres desde 2021 (48 cierres; mediana real de todos: -12,7 % a 12 m, 8,7 % anual a 3 a)

| Estrategia | Compras | Real 12 m | Real 3 a (anual) | Resto 3 a (anual) | Compras ≥ 10 % anual a 3 a | Compras en pérdida a 3 a |
|---|--:|--:|--:|--:|--:|--:|
| A. Solo 12 m (vigente) | 14 | -0,4 % | 13,6 % | 5,1 % | 57 % | 7 % |
| B. 12 m o radar (3 a ≥ 15 % y base 12 m ≥ 0) | 21 | -1,6 % | 12,3 % | 3,3 % | 52 % | 14 % |
|   · solo las añadidas por el radar | 7 | -27,8 % | 9,4 % | 8,6 % | 43 % | 29 % |
| C. Solo 3 años (≥ 15 % anual) | 21 | -1,6 % | 12,3 % | 3,3 % | 52 % | 14 % |
| D. 12 m y 3 años (≥ 10 % anual) | 14 | -0,4 % | 13,6 % | 5,1 % | 57 % | 7 % |
|   · B con el múltiplo de control | 20 | -2,9 % | 10,9 % | 5,1 % | 50 % | 15 % |

### La cifra a 3 años como predicción del precio a t+3 (todos)

| Cifra | Sesgo (mediana de predicho ÷ real − 1) | Error (mediana del error absoluto) |
|---|--:|--:|
| 3 años, vuelta entera a la mediana | -10,8 % | 37,6 % |
| 3 años, múltiplo de control (menor de actual y mediana) | -17,8 % | 35,2 % |
| 12 m, regla vigente (para comparar) | -16,2 % | 29,1 % |

### Las que añade el radar (todos los cierres)

| Empresa | Cierre | 12 m esperada (pond./base) | 3 a esperada (anual) | Real 12 m | Real 3 a (anual) |
|---|--:|--:|--:|--:|--:|
| Games Workshop | 2022 | 7,3 / 26,4 % | 20,3 % | 34,5 % | 31,5 % |
| VAT | 2020 | -1,2 / 11,7 % | 16,6 % | 108,3 % | 25,8 % |
| UnitedHealth | 2019 | 13,1 / 19,0 % | 18,8 % | 20,9 % | 23,0 % |
| Microsoft | 2021 | 10,7 / 17,1 % | 19,9 % | -4,3 % | 18,9 % |
| Copart | 2022 | 11,7 / 17,6 % | 17,7 % | 38,0 % | 12,3 % |
| Intuitive | 2019 | 10,8 / 16,6 % | 18,3 % | 38,4 % | 10,4 % |
| Alphabet | 2021 | 9,9 / 17,9 % | 18,3 % | -39,1 % | 9,4 % |
| Adobe | 2019 | 10,5 / 16,3 % | 19,1 % | 54,3 % | 2,1 % |
| DSV | 2021 | 14,7 / 18,5 % | 20,7 % | -27,8 % | 0,5 % |
| Dunelm | 2021 | 12,9 / 25,4 % | 28,7 % | -36,8 % | -2,8 % |
| Trigano | 2021 | 7,1 / 14,2 % | 15,9 % | -48,9 % | -12,8 % |

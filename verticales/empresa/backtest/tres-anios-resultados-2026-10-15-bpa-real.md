# Backtest de la rentabilidad esperada a 3 años · 2026-10-15 · BPA real

Generado con `node herramientas/backtest-3a.mjs --bpa-real`. Protocolo y criterio fijados antes en `tres-anios-preregistro-2026-10-15.md`. 42 empresas, 97 cierres con 12 meses y 3 años a la vez (cierres t de 2019 a 2022; 55 de diseño y 42 de validación por empresas alternas). BPA futuro real (previsión perfecta: el error es solo del múltiplo). A 12 meses decide la regla vigente (v3 ×1,1 con selector); a 3 años, mediana adelantada de 5 años × BPA de t+4, anualizada con dividendos. «Real 3 a» = rentabilidad anual real de t a t+3 con dividendos.

### Todos (97 cierres; mediana real de todos: 12,9 % a 12 m, 9,7 % anual a 3 a)

| Estrategia | Compras | Real 12 m | Real 3 a (anual) | Resto 3 a (anual) | Compras ≥ 10 % anual a 3 a | Compras en pérdida a 3 a |
|---|--:|--:|--:|--:|--:|--:|
| A. Solo 12 m (vigente) | 23 | 44,9 % | 18,0 % | 8,7 % | 74 % | 0 % |
| B. 12 m o radar (3 a ≥ 15 % y base 12 m ≥ 0) | 29 | 43,4 % | 19,7 % | 7,4 % | 76 % | 0 % |
|   · solo las añadidas por el radar | 6 | 34,1 % | 26,0 % | 9,4 % | 83 % | 0 % |
| C. Solo 3 años (≥ 15 % anual) | 22 | 45,8 % | 19,9 % | 8,6 % | 82 % | 9 % |
| D. 12 m y 3 años (≥ 10 % anual) | 19 | 44,9 % | 18,0 % | 8,7 % | 79 % | 0 % |
|   · B con el múltiplo de control | 29 | 43,4 % | 19,7 % | 7,4 % | 76 % | 0 % |

### Validación (42 cierres; mediana real de todos: 12,8 % a 12 m, 9,5 % anual a 3 a)

| Estrategia | Compras | Real 12 m | Real 3 a (anual) | Resto 3 a (anual) | Compras ≥ 10 % anual a 3 a | Compras en pérdida a 3 a |
|---|--:|--:|--:|--:|--:|--:|
| A. Solo 12 m (vigente) | 12 | 45,8 % | 13,2 % | 6,8 % | 67 % | 0 % |
| B. 12 m o radar (3 a ≥ 15 % y base 12 m ≥ 0) | 15 | 46,6 % | 13,2 % | 4,2 % | 67 % | 0 % |
|   · solo las añadidas por el radar | 3 | 108,7 % | 26,6 % | 8,2 % | 67 % | 0 % |
| C. Solo 3 años (≥ 15 % anual) | 11 | 56,1 % | 16,1 % | 6,8 % | 73 % | 9 % |
| D. 12 m y 3 años (≥ 10 % anual) | 9 | 46,6 % | 13,2 % | 6,8 % | 78 % | 0 % |
|   · B con el múltiplo de control | 15 | 46,6 % | 13,2 % | 4,2 % | 67 % | 0 % |

### Diseño (55 cierres; mediana real de todos: 12,9 % a 12 m, 10,4 % anual a 3 a)

| Estrategia | Compras | Real 12 m | Real 3 a (anual) | Resto 3 a (anual) | Compras ≥ 10 % anual a 3 a | Compras en pérdida a 3 a |
|---|--:|--:|--:|--:|--:|--:|
| A. Solo 12 m (vigente) | 11 | 43,4 % | 19,7 % | 9,2 % | 82 % | 0 % |
| B. 12 m o radar (3 a ≥ 15 % y base 12 m ≥ 0) | 14 | 37,5 % | 21,5 % | 8,7 % | 86 % | 0 % |
|   · solo las añadidas por el radar | 3 | 33,7 % | 25,4 % | 9,6 % | 100 % | 0 % |
| C. Solo 3 años (≥ 15 % anual) | 11 | 34,5 % | 23,4 % | 9,2 % | 91 % | 9 % |
| D. 12 m y 3 años (≥ 10 % anual) | 10 | 40,6 % | 18,9 % | 9,3 % | 80 % | 0 % |
|   · B con el múltiplo de control | 14 | 37,5 % | 21,5 % | 8,7 % | 86 % | 0 % |

### Cierres hasta 2020 (49 cierres; mediana real de todos: 37,8 % a 12 m, 11,2 % anual a 3 a)

| Estrategia | Compras | Real 12 m | Real 3 a (anual) | Resto 3 a (anual) | Compras ≥ 10 % anual a 3 a | Compras en pérdida a 3 a |
|---|--:|--:|--:|--:|--:|--:|
| A. Solo 12 m (vigente) | 15 | 44,9 % | 19,7 % | 9,5 % | 73 % | 0 % |
| B. 12 m o radar (3 a ≥ 15 % y base 12 m ≥ 0) | 17 | 50,3 % | 23,2 % | 9,3 % | 76 % | 0 % |
|   · solo las añadidas por el radar | 2 | 115,6 % | 33,9 % | 10,9 % | 100 % | 0 % |
| C. Solo 3 años (≥ 15 % anual) | 12 | 57,0 % | 21,4 % | 9,3 % | 83 % | 8 % |
| D. 12 m y 3 años (≥ 10 % anual) | 12 | 44,2 % | 18,9 % | 9,7 % | 75 % | 0 % |
|   · B con el múltiplo de control | 17 | 50,3 % | 23,2 % | 9,3 % | 76 % | 0 % |

### Cierres desde 2021 (48 cierres; mediana real de todos: -12,7 % a 12 m, 8,7 % anual a 3 a)

| Estrategia | Compras | Real 12 m | Real 3 a (anual) | Resto 3 a (anual) | Compras ≥ 10 % anual a 3 a | Compras en pérdida a 3 a |
|---|--:|--:|--:|--:|--:|--:|
| A. Solo 12 m (vigente) | 8 | 23,6 % | 13,6 % | 7,0 % | 75 % | 0 % |
| B. 12 m o radar (3 a ≥ 15 % y base 12 m ≥ 0) | 12 | 17,1 % | 14,5 % | 2,2 % | 75 % | 0 % |
|   · solo las añadidas por el radar | 4 | 15,6 % | 20,3 % | 7,2 % | 75 % | 0 % |
| C. Solo 3 años (≥ 15 % anual) | 10 | 34,1 % | 17,7 % | 5,1 % | 80 % | 10 % |
| D. 12 m y 3 años (≥ 10 % anual) | 7 | 46,6 % | 13,9 % | 6,9 % | 86 % | 0 % |
|   · B con el múltiplo de control | 12 | 17,1 % | 14,5 % | 2,2 % | 75 % | 0 % |

### La cifra a 3 años como predicción del precio a t+3 (todos)

| Cifra | Sesgo (mediana de predicho ÷ real − 1) | Error (mediana del error absoluto) |
|---|--:|--:|
| 3 años, vuelta entera a la mediana | -16,0 % | 23,9 % |
| 3 años, múltiplo de control (menor de actual y mediana) | -20,1 % | 25,4 % |
| 12 m, regla vigente (para comparar) | -11,6 % | 17,8 % |

### Las que añade el radar (todos los cierres)

| Empresa | Cierre | 12 m esperada (pond./base) | 3 a esperada (anual) | Real 12 m | Real 3 a (anual) |
|---|--:|--:|--:|--:|--:|
| Gartner | 2020 | 12,2 / 8,1 % | 73,2 % | 108,7 % | 41,2 % |
| Games Workshop | 2022 | 5,4 / 25,3 % | 26,4 % | 34,5 % | 31,5 % |
| ATOSS | 2019 | -4,5 / 1,4 % | 16,1 % | 122,5 % | 26,6 % |
| Microsoft | 2022 | 10,9 / 17,6 % | 20,4 % | 33,7 % | 25,4 % |
| Medpace | 2021 | 3,4 / 10,9 % | 15,4 % | -2,4 % | 15,1 % |
| Alphabet | 2021 | 2,4 / 15,6 % | 16,7 % | -39,1 % | 9,4 % |

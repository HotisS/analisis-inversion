# Backtest del selector de método · 2026-11-01

Generado con `node herramientas/backtest-selector.mjs`. Reglas y criterio fijados antes en `selector-preregistro-2026-10-14.md`. 347 empresas, 364 cierres (213 de diseño y 151 de validación, por empresas alternas; 298 con horizonte 2022-2025). Pesos 25/50/25. BPA futuro real (el error es solo del múltiplo). Cierres con BPA atípico en la historia: 30.

### Validación (decide) (151 cierres)

| Estrategia | Sesgo pond. | Error pond. | Sesgo base | Error base | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Siempre v3 ×1,1 | -6,8 % | 17,2 % | -1,6 % | 17,6 % | 62 | 33,0 % | 8,8 % | 71 % | 8 % |
| Siempre v2 | -4,1 % | 17,0 % | -4,1 % | 18,8 % | 62 | 32,3 % | 8,8 % | 71 % | 8 % |
| Solo robustas | -8,0 % | 17,8 % | -5,0 % | 18,8 % | 46 | 33,0 % | 12,0 % | 72 % | 7 % |
| Selector | -7,1 % | 17,2 % | -2,6 % | 18,9 % | 55 | 33,4 % | 9,3 % | 73 % | 7 % |

### Diseño (213 cierres)

| Estrategia | Sesgo pond. | Error pond. | Sesgo base | Error base | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Siempre v3 ×1,1 | -6,8 % | 17,8 % | -0,4 % | 16,7 % | 78 | 31,6 % | 10,2 % | 65 % | 12 % |
| Siempre v2 | -7,2 % | 16,9 % | -6,1 % | 18,3 % | 82 | 25,2 % | 8,2 % | 68 % | 9 % |
| Solo robustas | -11,2 % | 17,6 % | -8,8 % | 17,0 % | 66 | 33,4 % | 10,2 % | 68 % | 9 % |
| Selector | -10,1 % | 17,2 % | -5,6 % | 16,7 % | 72 | 33,4 % | 10,2 % | 67 % | 10 % |

### Corte temporal: horizonte 2022-2025 (298 cierres)

| Estrategia | Sesgo pond. | Error pond. | Sesgo base | Error base | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Siempre v3 ×1,1 | -3,2 % | 16,9 % | 0,9 % | 17,2 % | 115 | 27,1 % | 6,9 % | 63 % | 11 % |
| Siempre v2 | -3,0 % | 16,0 % | -1,7 % | 18,3 % | 116 | 23,7 % | 6,9 % | 65 % | 10 % |
| Solo robustas | -7,0 % | 16,3 % | -4,2 % | 17,0 % | 91 | 27,1 % | 7,8 % | 65 % | 10 % |
| Selector | -4,9 % | 16,2 % | -0,5 % | 17,6 % | 104 | 28,3 % | 7,5 % | 64 % | 11 % |

### Todos (364 cierres)

| Estrategia | Sesgo pond. | Error pond. | Sesgo base | Error base | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Siempre v3 ×1,1 | -6,8 % | 17,5 % | -1,1 % | 17,5 % | 140 | 32,4 % | 9,3 % | 68 % | 10 % |
| Siempre v2 | -6,1 % | 16,9 % | -5,2 % | 18,5 % | 144 | 28,1 % | 8,5 % | 69 % | 8 % |
| Solo robustas | -10,9 % | 17,6 % | -7,5 % | 17,7 % | 112 | 33,0 % | 10,6 % | 70 % | 8 % |
| Selector | -9,0 % | 17,2 % | -3,7 % | 17,8 % | 127 | 33,4 % | 9,7 % | 69 % | 9 % |

### Qué regla del selector mandó y cómo le fue (validación)

| Regla que manda | Cierres | Error pond. selector | Error pond. v3 | Comprar selector (real mediana; < −10 %) | Comprar v3 (real mediana; < −10 %) |
|---|--:|--:|--:|--:|--:|
| atípico → desrateada → v2 | 1 | 46,2 % | 40,9 % | 0 | 1 (108,7 %; 0 %) |
| atípico → historia corta → la más baja | 9 | 17,8 % | 17,8 % | 5 (13,1 %; 0 %) | 4 (10,6 %; 0 %) |
| atípico → v3 | 9 | 14,6 % | 15,6 % | 2 (17,4 %; 0 %) | 2 (17,4 %; 0 %) |
| desrateada → v2 | 4 | 12,7 % | 14,0 % | 3 (54,2 %; 0 %) | 3 (54,2 %; 0 %) |
| historia corta → la más baja | 51 | 16,8 % | 16,4 % | 19 (21,6 %; 11 %) | 26 (19,7 %; 12 %) |
| v3 | 77 | 18,1 % | 18,1 % | 26 (43,6 %; 8 %) | 26 (43,6 %; 8 %) |

### Lo mismo, todos los cierres

| Regla que manda | Cierres | Error pond. selector | Error pond. v3 | Comprar selector (real mediana; < −10 %) | Comprar v3 (real mediana; < −10 %) |
|---|--:|--:|--:|--:|--:|
| atípico → desrateada → v2 | 3 | 36,8 % | 40,9 % | 2 (19,3 %; 0 %) | 3 (27,2 %; 0 %) |
| atípico → historia corta → la más baja | 12 | 23,8 % | 22,8 % | 7 (13,1 %; 0 %) | 6 (10,6 %; 0 %) |
| atípico → v3 | 15 | 14,6 % | 15,8 % | 2 (17,4 %; 0 %) | 2 (17,4 %; 0 %) |
| desrateada → v2 | 13 | 27,6 % | 20,3 % | 9 (65,1 %; 0 %) | 10 (59,7 %; 10 %) |
| historia corta → la más baja | 119 | 16,1 % | 16,4 % | 43 (24,3 %; 12 %) | 55 (22,6 %; 13 %) |
| v3 | 202 | 17,9 % | 17,9 % | 64 (35,9 %; 9 %) | 64 (35,9 %; 9 %) |

# Backtest del selector de método · 2026-10-14 · BPA ingenuo

Generado con `node herramientas/backtest-selector.mjs --bpa-ingenuo`. Reglas y criterio fijados antes en `selector-preregistro-2026-10-14.md`. 136 empresas, 191 cierres (70 de diseño y 121 de validación, por empresas alternas; 143 con horizonte 2022-2025). Pesos 25/50/25. BPA futuro ingenuo (crecimiento mediano anterior). Cierres con BPA atípico en la historia: 23.

### Validación (decide) (121 cierres)

| Estrategia | Sesgo pond. | Error pond. | Sesgo base | Error base | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Siempre v3 ×1,1 | -5,9 % | 24,7 % | -1,4 % | 23,2 % | 40 | 28,7 % | 14,1 % | 55 % | 23 % |
| Siempre v2 | -7,8 % | 24,6 % | -9,6 % | 25,0 % | 62 | 20,4 % | 15,2 % | 52 % | 24 % |
| Solo robustas | -10,2 % | 25,9 % | -12,1 % | 24,7 % | 38 | 24,7 % | 15,2 % | 53 % | 24 % |
| Selector | -6,6 % | 24,4 % | -3,0 % | 24,0 % | 39 | 27,9 % | 14,6 % | 54 % | 23 % |

### Diseño (70 cierres)

| Estrategia | Sesgo pond. | Error pond. | Sesgo base | Error base | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Siempre v3 ×1,1 | -6,9 % | 17,3 % | -5,4 % | 17,6 % | 17 | 18,0 % | 13,9 % | 53 % | 6 % |
| Siempre v2 | -5,1 % | 17,0 % | -4,7 % | 16,8 % | 25 | 18,4 % | 13,9 % | 52 % | 8 % |
| Solo robustas | -10,4 % | 17,9 % | -8,3 % | 17,6 % | 15 | 18,8 % | 13,9 % | 53 % | 7 % |
| Selector | -6,9 % | 17,3 % | -6,5 % | 17,6 % | 16 | 18,4 % | 13,5 % | 56 % | 6 % |

### Corte temporal: horizonte 2022-2025 (143 cierres)

| Estrategia | Sesgo pond. | Error pond. | Sesgo base | Error base | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Siempre v3 ×1,1 | 1,2 % | 19,1 % | 6,6 % | 18,8 % | 52 | 18,4 % | 7,7 % | 52 % | 19 % |
| Siempre v2 | 1,9 % | 20,1 % | 1,4 % | 20,8 % | 75 | 12,0 % | 7,7 % | 47 % | 23 % |
| Solo robustas | -2,2 % | 20,1 % | 0,2 % | 19,5 % | 48 | 16,3 % | 8,1 % | 50 % | 21 % |
| Selector | 0,5 % | 20,0 % | 4,5 % | 18,9 % | 50 | 18,4 % | 7,8 % | 52 % | 20 % |

### Todos (191 cierres)

| Estrategia | Sesgo pond. | Error pond. | Sesgo base | Error base | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Siempre v3 ×1,1 | -6,2 % | 22,0 % | -1,6 % | 21,1 % | 57 | 21,6 % | 14,0 % | 54 % | 18 % |
| Siempre v2 | -6,6 % | 23,7 % | -8,5 % | 23,1 % | 87 | 18,8 % | 14,2 % | 52 % | 20 % |
| Solo robustas | -10,2 % | 23,8 % | -8,9 % | 22,5 % | 53 | 21,6 % | 14,2 % | 53 % | 19 % |
| Selector | -6,6 % | 22,0 % | -5,5 % | 21,7 % | 55 | 21,6 % | 14,0 % | 55 % | 18 % |

### Qué regla del selector mandó y cómo le fue (validación)

| Regla que manda | Cierres | Error pond. selector | Error pond. v3 | Comprar selector (real mediana; < −10 %) | Comprar v3 (real mediana; < −10 %) |
|---|--:|--:|--:|--:|--:|
| atípico → historia corta → la más baja | 5 | 31,9 % | 31,9 % | 0 | 0 |
| atípico → v3 | 10 | 17,4 % | 19,4 % | 2 (51,4 %; 0 %) | 2 (51,4 %; 0 %) |
| desrateada → v2 | 5 | 21,2 % | 13,6 % | 5 (54,2 %; 20 %) | 5 (54,2 %; 20 %) |
| historia corta → la más baja | 29 | 23,9 % | 21,6 % | 7 (21,6 %; 14 %) | 8 (24,7 %; 13 %) |
| v3 | 72 | 26,3 % | 26,3 % | 25 (12,4 %; 28 %) | 25 (12,4 %; 28 %) |

### Lo mismo, todos los cierres

| Regla que manda | Cierres | Error pond. selector | Error pond. v3 | Comprar selector (real mediana; < −10 %) | Comprar v3 (real mediana; < −10 %) |
|---|--:|--:|--:|--:|--:|
| atípico → desrateada → v2 | 1 | 3,4 % | 0,8 % | 1 (34,2 %; 0 %) | 1 (34,2 %; 0 %) |
| atípico → historia corta → la más baja | 9 | 31,9 % | 30,3 % | 1 (108,7 %; 0 %) | 1 (108,7 %; 0 %) |
| atípico → v3 | 13 | 14,4 % | 14,4 % | 3 (33,7 %; 0 %) | 3 (33,7 %; 0 %) |
| desrateada → v2 | 7 | 20,0 % | 13,3 % | 7 (46,6 %; 14 %) | 7 (46,6 %; 14 %) |
| historia corta → la más baja | 46 | 24,3 % | 22,5 % | 10 (11,7 %; 10 %) | 12 (13,4 %; 8 %) |
| v3 | 115 | 22,0 % | 22,0 % | 33 (18,0 %; 24 %) | 33 (18,0 %; 24 %) |

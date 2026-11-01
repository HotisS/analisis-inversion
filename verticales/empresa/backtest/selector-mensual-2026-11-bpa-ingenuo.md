# Backtest del selector de método · 2026-11-01 · BPA ingenuo

Generado con `node herramientas/backtest-selector.mjs --bpa-ingenuo`. Reglas y criterio fijados antes en `selector-preregistro-2026-10-14.md`. 347 empresas, 362 cierres (212 de diseño y 150 de validación, por empresas alternas; 296 con horizonte 2022-2025). Pesos 25/50/25. BPA futuro ingenuo (crecimiento mediano anterior). Cierres con BPA atípico en la historia: 30.

### Validación (decide) (150 cierres)

| Estrategia | Sesgo pond. | Error pond. | Sesgo base | Error base | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Siempre v3 ×1,1 | -6,6 % | 21,3 % | -5,2 % | 18,1 % | 57 | 27,9 % | 15,2 % | 63 % | 16 % |
| Siempre v2 | -9,8 % | 19,4 % | -9,6 % | 18,8 % | 76 | 28,0 % | 15,9 % | 59 % | 18 % |
| Solo robustas | -12,8 % | 21,6 % | -11,4 % | 18,5 % | 52 | 28,5 % | 15,9 % | 63 % | 15 % |
| Selector | -9,6 % | 20,4 % | -6,9 % | 17,8 % | 54 | 28,0 % | 15,9 % | 63 % | 17 % |

### Diseño (212 cierres)

| Estrategia | Sesgo pond. | Error pond. | Sesgo base | Error base | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Siempre v3 ×1,1 | -8,8 % | 19,3 % | -3,9 % | 18,8 % | 68 | 18,4 % | 13,5 % | 53 % | 16 % |
| Siempre v2 | -5,6 % | 21,1 % | -5,8 % | 20,0 % | 94 | 15,0 % | 13,6 % | 50 % | 16 % |
| Solo robustas | -10,8 % | 20,9 % | -8,7 % | 19,7 % | 63 | 13,7 % | 13,9 % | 49 % | 17 % |
| Selector | -9,1 % | 20,9 % | -6,2 % | 19,5 % | 64 | 14,5 % | 13,7 % | 50 % | 17 % |

### Corte temporal: horizonte 2022-2025 (296 cierres)

| Estrategia | Sesgo pond. | Error pond. | Sesgo base | Error base | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Siempre v3 ×1,1 | -3,3 % | 18,4 % | 1,7 % | 17,1 % | 117 | 19,7 % | 9,5 % | 56 % | 17 % |
| Siempre v2 | -1,8 % | 19,1 % | -1,8 % | 18,1 % | 152 | 17,2 % | 9,7 % | 52 % | 19 % |
| Solo robustas | -5,0 % | 19,5 % | -3,7 % | 18,0 % | 108 | 19,0 % | 10,6 % | 55 % | 18 % |
| Selector | -4,0 % | 18,9 % | -0,3 % | 17,5 % | 111 | 18,8 % | 10,0 % | 55 % | 18 % |

### Todos (362 cierres)

| Estrategia | Sesgo pond. | Error pond. | Sesgo base | Error base | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Siempre v3 ×1,1 | -7,1 % | 20,1 % | -4,4 % | 18,3 % | 125 | 21,4 % | 13,6 % | 58 % | 16 % |
| Siempre v2 | -7,0 % | 20,2 % | -7,1 % | 19,1 % | 170 | 19,0 % | 14,0 % | 54 % | 17 % |
| Solo robustas | -11,9 % | 21,1 % | -9,2 % | 19,1 % | 115 | 19,7 % | 14,3 % | 56 % | 17 % |
| Selector | -9,1 % | 20,7 % | -6,5 % | 18,7 % | 118 | 19,4 % | 14,2 % | 56 % | 17 % |

### Qué regla del selector mandó y cómo le fue (validación)

| Regla que manda | Cierres | Error pond. selector | Error pond. v3 | Comprar selector (real mediana; < −10 %) | Comprar v3 (real mediana; < −10 %) |
|---|--:|--:|--:|--:|--:|
| atípico → desrateada → v2 | 1 | 3,4 % | 0,8 % | 1 (34,2 %; 0 %) | 1 (34,2 %; 0 %) |
| atípico → historia corta → la más baja | 10 | 30,9 % | 27,4 % | 1 (108,7 %; 0 %) | 1 (108,7 %; 0 %) |
| atípico → v3 | 8 | 10,0 % | 8,6 % | 2 (17,1 %; 0 %) | 2 (17,1 %; 0 %) |
| desrateada → v2 | 2 | 16,8 % | 18,5 % | 2 (31,5 %; 0 %) | 2 (31,5 %; 0 %) |
| historia corta → la más baja | 51 | 21,6 % | 21,6 % | 22 (17,0 %; 18 %) | 25 (17,4 %; 16 %) |
| v3 | 78 | 21,3 % | 21,3 % | 26 (33,6 %; 19 %) | 26 (33,6 %; 19 %) |

### Lo mismo, todos los cierres

| Regla que manda | Cierres | Error pond. selector | Error pond. v3 | Comprar selector (real mediana; < −10 %) | Comprar v3 (real mediana; < −10 %) |
|---|--:|--:|--:|--:|--:|
| atípico → desrateada → v2 | 1 | 3,4 % | 0,8 % | 1 (34,2 %; 0 %) | 1 (34,2 %; 0 %) |
| atípico → historia corta → la más baja | 14 | 31,0 % | 27,4 % | 1 (108,7 %; 0 %) | 1 (108,7 %; 0 %) |
| atípico → v3 | 15 | 20,5 % | 24,4 % | 3 (33,7 %; 0 %) | 3 (33,7 %; 0 %) |
| desrateada → v2 | 10 | 20,6 % | 13,5 % | 10 (50,4 %; 10 %) | 10 (50,4 %; 10 %) |
| historia corta → la más baja | 120 | 19,7 % | 18,8 % | 39 (13,6 %; 15 %) | 46 (17,0 %; 13 %) |
| v3 | 202 | 20,9 % | 20,9 % | 64 (19,0 %; 20 %) | 64 (19,0 %; 20 %) |

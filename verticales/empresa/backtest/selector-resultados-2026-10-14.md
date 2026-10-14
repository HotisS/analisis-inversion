# Backtest del selector de método · 2026-10-14

Generado con `node herramientas/backtest-selector.mjs`. Reglas y criterio fijados antes en `selector-preregistro-2026-10-14.md`. 136 empresas, 193 cierres (70 de diseño y 123 de validación, por empresas alternas; 145 con horizonte 2022-2025). Pesos 25/50/25. BPA futuro real (el error es solo del múltiplo). Cierres con BPA atípico en la historia: 23.

### Validación (decide) (123 cierres)

| Estrategia | Sesgo pond. | Error pond. | Sesgo base | Error base | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Siempre v3 ×1,1 | -7,6 % | 20,0 % | -0,2 % | 21,8 % | 47 | 42,9 % | 5,0 % | 74 % | 11 % |
| Siempre v2 | -9,2 % | 20,3 % | -7,4 % | 22,7 % | 48 | 39,6 % | 3,2 % | 75 % | 8 % |
| Solo robustas | -11,6 % | 20,4 % | -7,9 % | 21,9 % | 37 | 44,4 % | 8,1 % | 76 % | 8 % |
| Selector | -9,4 % | 20,0 % | -3,4 % | 21,1 % | 45 | 44,3 % | 5,0 % | 78 % | 9 % |

### Diseño (70 cierres)

| Estrategia | Sesgo pond. | Error pond. | Sesgo base | Error base | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Siempre v3 ×1,1 | -9,0 % | 14,6 % | -1,1 % | 14,6 % | 20 | 32,6 % | 10,3 % | 70 % | 5 % |
| Siempre v2 | -7,4 % | 14,1 % | -8,3 % | 12,9 % | 17 | 32,6 % | 8,6 % | 76 % | 0 % |
| Solo robustas | -11,7 % | 14,7 % | -8,8 % | 13,0 % | 14 | 33,4 % | 10,3 % | 79 % | 0 % |
| Selector | -10,5 % | 14,4 % | -4,9 % | 14,0 % | 18 | 29,9 % | 12,1 % | 67 % | 6 % |

### Corte temporal: horizonte 2022-2025 (145 cierres)

| Estrategia | Sesgo pond. | Error pond. | Sesgo base | Error base | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Siempre v3 ×1,1 | -2,8 % | 15,0 % | 2,6 % | 16,6 % | 49 | 34,2 % | 1,3 % | 65 % | 10 % |
| Siempre v2 | -3,7 % | 15,9 % | -1,4 % | 18,3 % | 47 | 33,7 % | 1,3 % | 68 % | 9 % |
| Solo robustas | -7,6 % | 15,8 % | -4,0 % | 17,0 % | 37 | 35,9 % | 3,6 % | 68 % | 8 % |
| Selector | -4,1 % | 14,7 % | 1,1 % | 17,4 % | 47 | 35,7 % | 2,7 % | 66 % | 11 % |

### Todos (193 cierres)

| Estrategia | Sesgo pond. | Error pond. | Sesgo base | Error base | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Siempre v3 ×1,1 | -7,7 % | 17,1 % | -0,7 % | 18,6 % | 67 | 38,4 % | 7,7 % | 73 % | 9 % |
| Siempre v2 | -7,6 % | 17,6 % | -7,6 % | 19,2 % | 65 | 37,3 % | 7,5 % | 75 % | 6 % |
| Solo robustas | -11,6 % | 18,1 % | -8,7 % | 19,1 % | 51 | 43,4 % | 8,7 % | 76 % | 6 % |
| Selector | -10,0 % | 16,3 % | -3,6 % | 18,9 % | 63 | 41,4 % | 8,1 % | 75 % | 8 % |

### Qué regla del selector mandó y cómo le fue (validación)

| Regla que manda | Cierres | Error pond. selector | Error pond. v3 | Comprar selector (real mediana; < −10 %) | Comprar v3 (real mediana; < −10 %) |
|---|--:|--:|--:|--:|--:|
| atípico → historia corta → la más baja | 5 | 17,2 % | 17,2 % | 2 (64,1 %; 0 %) | 1 (108,3 %; 0 %) |
| atípico → v3 | 10 | 9,3 % | 12,9 % | 0 | 0 |
| desrateada → v2 | 6 | 12,7 % | 17,2 % | 5 (65,1 %; 0 %) | 5 (65,1 %; 0 %) |
| historia corta → la más baja | 28 | 19,7 % | 17,5 % | 11 (37,8 %; 9 %) | 14 (37,5 %; 14 %) |
| v3 | 74 | 24,3 % | 24,3 % | 27 (42,9 %; 11 %) | 27 (42,9 %; 11 %) |

### Lo mismo, todos los cierres

| Regla que manda | Cierres | Error pond. selector | Error pond. v3 | Comprar selector (real mediana; < −10 %) | Comprar v3 (real mediana; < −10 %) |
|---|--:|--:|--:|--:|--:|
| atípico → desrateada → v2 | 3 | 36,8 % | 40,9 % | 2 (19,3 %; 0 %) | 3 (27,2 %; 0 %) |
| atípico → historia corta → la más baja | 7 | 17,2 % | 17,2 % | 3 (45,7 %; 0 %) | 2 (77,0 %; 0 %) |
| atípico → v3 | 13 | 14,6 % | 15,6 % | 2 (17,4 %; 0 %) | 2 (17,4 %; 0 %) |
| desrateada → v2 | 7 | 9,4 % | 14,1 % | 6 (59,7 %; 0 %) | 6 (59,7 %; 0 %) |
| historia corta → la más baja | 45 | 19,0 % | 19,0 % | 16 (37,5 %; 6 %) | 20 (35,3 %; 10 %) |
| v3 | 118 | 16,6 % | 16,6 % | 34 (43,6 %; 12 %) | 34 (43,6 %; 12 %) |

## Decisión (criterio del preregistro)

Validación frente a siempre-v3: error 20,0 % = 20,0 % (cumple), Comprar +44,3 % frente a +42,9 % y 9 % con pérdida frente a 11 % (cumple), sesgo absoluto 9,4 frente a 7,6 (+1,8 puntos, dentro del límite de 2). Diseño, corte temporal y BPA ingenuo: en ninguno empeora a la vez el error y las pérdidas. **Se adopta.**

Lo que no se puede afirmar: la mejora es pequeña y la regla de desrateadas se apoya en 7 cierres (hoy hay ≈30 empresas desrateadas); en el pasado no cambió ninguna compra, solo bajó el error. La de historia corta es mixta: el error sube (19,7 % frente a 17,5 %) y las compras con pérdida bajan (9 % frente a 14 %); se mantiene porque protege la compra, que es lo que decide las órdenes. Reprobar cuando haya más cierres desrateados.

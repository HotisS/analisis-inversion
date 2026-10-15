# Backtest del aguante de la compra · 2026-10-15 · BPA ingenuo

Generado con `node herramientas/backtest-aguante.mjs --bpa-ingenuo`. Protocolo fijado antes en `aguante-preregistro-2026-10-15.md`. 194 empresas, 380 cierres con la regla calculable en t y en t+1 (199 de diseño y 181 de validación). Vuelco = en t+1 la regla dice «No mantener»; malo si el precio no subió un 10 %. Horizonte 12 meses (techo de lo que pasa a 3 meses).

### Todos los cierres (decide) (380 cierres con regla en t y en t+1)

| Estrategia | Compras (% de c = 0) | Vuelco malo a 12 m | Vuelco con subida | Rent. real mediana | < −10 % | Rent. real de los vuelcos malos |
|---|--:|--:|--:|--:|--:|--:|
| Selector solo (Comprar vigente, sin exigir v2) | 136 | 11 % | 18 % | 7,5 % | 29 % | -1,6 % |
| Robusta, colchón c = 0 | 127 | 10 % | 19 % | 7,6 % | 28 % | 3,6 % |
| Robusta, colchón c = 2 | 110 (87 %) | 11 % | 18 % | 7,6 % | 29 % | 5,6 % |
| Robusta, colchón c = 3 | 104 (82 %) | 11 % | 18 % | 7,6 % | 28 % | 3,6 % |
| Robusta, colchón c = 5 | 94 (74 %) | 9 % | 18 % | 7,9 % | 27 % | 7,6 % |
| Robusta, colchón c = 8 | 76 (60 %) | 8 % | 20 % | 8,4 % | 28 % | 5,6 % |

Por **margen de la compra robusta** (ponderada robusta − 15):

| Margen | Compras | Vuelco malo a 12 m | Vuelco con subida | Rent. real mediana | < −10 % | Rent. real de los vuelcos malos |
|---|--:|--:|--:|--:|--:|--:|
| 0-3 puntos | 21 | 10 % | 24 % | 7,4 % | 24 % | -8,1 % |
| 3-8 | 24 | 21 % | 13 % | 0,4 % | 38 % | -1,6 % |
| 8-15 | 52 | 10 % | 25 % | 9,1 % | 21 % | 7,5 % |
| ≥ 15 | 30 | 3 % | 10 % | 5,1 % | 33 % | 3,6 % |

Criterio (vuelco malo baja ≥ 5 puntos conservando ≥ 60 % de las compras): c = 2: ✗ (-1 puntos, 87 % de las compras); c = 3: ✗ (-0 puntos, 82 % de las compras); c = 5: ✗ (2 puntos, 74 % de las compras); c = 8: ✗ (2 puntos, 60 % de las compras).

### Validación (signo) (181 cierres con regla en t y en t+1)

| Estrategia | Compras (% de c = 0) | Vuelco malo a 12 m | Vuelco con subida | Rent. real mediana | < −10 % | Rent. real de los vuelcos malos |
|---|--:|--:|--:|--:|--:|--:|
| Selector solo (Comprar vigente, sin exigir v2) | 68 | 12 % | 15 % | 5,2 % | 31 % | 1,0 % |
| Robusta, colchón c = 0 | 62 | 11 % | 15 % | 5,9 % | 29 % | 3,6 % |
| Robusta, colchón c = 2 | 54 (87 %) | 13 % | 13 % | 5,9 % | 30 % | 3,6 % |
| Robusta, colchón c = 3 | 52 (84 %) | 13 % | 13 % | 7,0 % | 27 % | 3,6 % |
| Robusta, colchón c = 5 | 49 (79 %) | 10 % | 14 % | 7,6 % | 24 % | 7,5 % |
| Robusta, colchón c = 8 | 43 (69 %) | 7 % | 16 % | 7,5 % | 26 % | 3,6 % |

Por **margen de la compra robusta** (ponderada robusta − 15):

| Margen | Compras | Vuelco malo a 12 m | Vuelco con subida | Rent. real mediana | < −10 % | Rent. real de los vuelcos malos |
|---|--:|--:|--:|--:|--:|--:|
| 0-3 puntos | 9 | 0 % | 22 % | 3,3 % | 33 % | n.d. % |
| 3-8 | 10 | 40 % | 0 % | 0,4 % | 40 % | 3,0 % |
| 8-15 | 24 | 8 % | 25 % | 7,6 % | 21 % | -0,2 % |
| ≥ 15 | 19 | 5 % | 5 % | 6,5 % | 32 % | 3,6 % |

Criterio (vuelco malo baja ≥ 5 puntos conservando ≥ 60 % de las compras): c = 2: ✗ (-2 puntos, 87 % de las compras); c = 3: ✗ (-2 puntos, 84 % de las compras); c = 5: ✗ (1 puntos, 79 % de las compras); c = 8: ✗ (4 puntos, 69 % de las compras).

### Diseño (199 cierres con regla en t y en t+1)

| Estrategia | Compras (% de c = 0) | Vuelco malo a 12 m | Vuelco con subida | Rent. real mediana | < −10 % | Rent. real de los vuelcos malos |
|---|--:|--:|--:|--:|--:|--:|
| Selector solo (Comprar vigente, sin exigir v2) | 68 | 10 % | 22 % | 8,6 % | 28 % | -2,3 % |
| Robusta, colchón c = 0 | 65 | 9 % | 23 % | 8,8 % | 26 % | -1,1 % |
| Robusta, colchón c = 2 | 56 (86 %) | 9 % | 23 % | 8,7 % | 29 % | 8,6 % |
| Robusta, colchón c = 3 | 52 (80 %) | 8 % | 23 % | 8,7 % | 29 % | -1,1 % |
| Robusta, colchón c = 5 | 45 (69 %) | 7 % | 22 % | 8,6 % | 29 % | 8,6 % |
| Robusta, colchón c = 8 | 33 (51 %) | 9 % | 24 % | 8,8 % | 30 % | 8,6 % |

Por **margen de la compra robusta** (ponderada robusta − 15):

| Margen | Compras | Vuelco malo a 12 m | Vuelco con subida | Rent. real mediana | < −10 % | Rent. real de los vuelcos malos |
|---|--:|--:|--:|--:|--:|--:|
| 0-3 puntos | 12 | 17 % | 25 % | 10,6 % | 17 % | -8,1 % |
| 3-8 | 14 | 7 % | 21 % | 0,7 % | 36 % | -10,8 % |
| 8-15 | 28 | 11 % | 25 % | 10,4 % | 21 % | 8,6 % |
| ≥ 15 | 11 | 0 % | 18 % | -0,1 % | 36 % | n.d. % |

Criterio (vuelco malo baja ≥ 5 puntos conservando ≥ 60 % de las compras): c = 2: ✗ (0 puntos, 86 % de las compras); c = 3: ✗ (2 puntos, 80 % de las compras); c = 5: ✗ (3 puntos, 69 % de las compras); c = 8: ✗ (0 puntos, 51 % de las compras).

# Backtest del aguante de la compra · 2026-10-15 · BPA real

Generado con `node herramientas/backtest-aguante.mjs`. Protocolo fijado antes en `aguante-preregistro-2026-10-15.md`. 194 empresas, 175 cierres con la regla calculable en t y en t+1 (95 de diseño y 80 de validación). Vuelco = en t+1 la regla dice «No mantener»; malo si el precio no subió un 10 %. Horizonte 12 meses (techo de lo que pasa a 3 meses).

### Todos los cierres (techo, BPA real) (175 cierres con regla en t y en t+1)

| Estrategia | Compras (% de c = 0) | Vuelco malo a 12 m | Vuelco con subida | Rent. real mediana | < −10 % | Rent. real de los vuelcos malos |
|---|--:|--:|--:|--:|--:|--:|
| Selector solo (Comprar vigente, sin exigir v2) | 59 | 7 % | 44 % | 37,3 % | 8 % | -2,0 % |
| Robusta, colchón c = 0 | 49 | 8 % | 43 % | 37,8 % | 8 % | -2,0 % |
| Robusta, colchón c = 2 | 46 (94 %) | 9 % | 41 % | 38,9 % | 9 % | -2,0 % |
| Robusta, colchón c = 3 | 45 (92 %) | 9 % | 42 % | 40,1 % | 7 % | -2,0 % |
| Robusta, colchón c = 5 | 39 (80 %) | 5 % | 41 % | 44,3 % | 3 % | 5,5 % |
| Robusta, colchón c = 8 | 34 (69 %) | 3 % | 44 % | 48,0 % | 3 % | 3,6 % |

Por **margen de la compra robusta** (ponderada robusta − 15):

| Margen | Compras | Vuelco malo a 12 m | Vuelco con subida | Rent. real mediana | < −10 % | Rent. real de los vuelcos malos |
|---|--:|--:|--:|--:|--:|--:|
| 0-3 puntos | 4 | 0 % | 50 % | 28,4 % | 25 % | n.d. % |
| 3-8 | 11 | 27 % | 36 % | 9,7 % | 18 % | -7,5 % |
| 8-15 | 9 | 11 % | 44 % | 27,2 % | 0 % | 3,6 % |
| ≥ 15 | 25 | 0 % | 44 % | 52,6 % | 4 % | n.d. % |

Criterio (vuelco malo baja ≥ 5 puntos conservando ≥ 60 % de las compras): c = 2: ✗ (-1 puntos, 94 % de las compras); c = 3: ✗ (-1 puntos, 92 % de las compras); c = 5: ✗ (3 puntos, 80 % de las compras); c = 8: ✓ (5 puntos, 69 % de las compras).

### Validación (signo) (80 cierres con regla en t y en t+1)

| Estrategia | Compras (% de c = 0) | Vuelco malo a 12 m | Vuelco con subida | Rent. real mediana | < −10 % | Rent. real de los vuelcos malos |
|---|--:|--:|--:|--:|--:|--:|
| Selector solo (Comprar vigente, sin exigir v2) | 28 | 4 % | 50 % | 41,5 % | 7 % | -7,5 % |
| Robusta, colchón c = 0 | 21 | 5 % | 48 % | 40,1 % | 10 % | -7,5 % |
| Robusta, colchón c = 2 | 21 (100 %) | 5 % | 48 % | 40,1 % | 10 % | -7,5 % |
| Robusta, colchón c = 3 | 21 (100 %) | 5 % | 48 % | 40,1 % | 10 % | -7,5 % |
| Robusta, colchón c = 5 | 16 (76 %) | 0 % | 44 % | 43,9 % | 6 % | n.d. % |
| Robusta, colchón c = 8 | 14 (67 %) | 0 % | 43 % | 44,6 % | 7 % | n.d. % |

Por **margen de la compra robusta** (ponderada robusta − 15):

| Margen | Compras | Vuelco malo a 12 m | Vuelco con subida | Rent. real mediana | < −10 % | Rent. real de los vuelcos malos |
|---|--:|--:|--:|--:|--:|--:|
| 0-3 puntos | 0 | n.d. % | n.d. % | n.d. % | n.d. % | n.d. % |
| 3-8 | 7 | 14 % | 57 % | 37,3 % | 14 % | -7,5 % |
| 8-15 | 3 | 0 % | 100 % | 44,9 % | 0 % | n.d. % |
| ≥ 15 | 11 | 0 % | 27 % | 44,3 % | 9 % | n.d. % |

Criterio (vuelco malo baja ≥ 5 puntos conservando ≥ 60 % de las compras): c = 2: ✗ (0 puntos, 100 % de las compras); c = 3: ✗ (0 puntos, 100 % de las compras); c = 5: ✗ (5 puntos, 76 % de las compras); c = 8: ✗ (5 puntos, 67 % de las compras).

### Diseño (95 cierres con regla en t y en t+1)

| Estrategia | Compras (% de c = 0) | Vuelco malo a 12 m | Vuelco con subida | Rent. real mediana | < −10 % | Rent. real de los vuelcos malos |
|---|--:|--:|--:|--:|--:|--:|
| Selector solo (Comprar vigente, sin exigir v2) | 31 | 10 % | 39 % | 33,4 % | 10 % | 3,6 % |
| Robusta, colchón c = 0 | 28 | 11 % | 39 % | 36,8 % | 7 % | 3,6 % |
| Robusta, colchón c = 2 | 25 (89 %) | 12 % | 36 % | 37,8 % | 8 % | 3,6 % |
| Robusta, colchón c = 3 | 24 (86 %) | 13 % | 38 % | 44,0 % | 4 % | 3,6 % |
| Robusta, colchón c = 5 | 23 (82 %) | 9 % | 39 % | 50,3 % | 0 % | 5,5 % |
| Robusta, colchón c = 8 | 20 (71 %) | 5 % | 45 % | 53,4 % | 0 % | 3,6 % |

Por **margen de la compra robusta** (ponderada robusta − 15):

| Margen | Compras | Vuelco malo a 12 m | Vuelco con subida | Rent. real mediana | < −10 % | Rent. real de los vuelcos malos |
|---|--:|--:|--:|--:|--:|--:|
| 0-3 puntos | 4 | 0 % | 50 % | 28,4 % | 25 % | n.d. % |
| 3-8 | 4 | 50 % | 0 % | 4,0 % | 25 % | -12,8 % |
| 8-15 | 6 | 17 % | 17 % | 27,2 % | 0 % | 3,6 % |
| ≥ 15 | 14 | 0 % | 57 % | 55,2 % | 0 % | n.d. % |

Criterio (vuelco malo baja ≥ 5 puntos conservando ≥ 60 % de las compras): c = 2: ✗ (-1 puntos, 89 % de las compras); c = 3: ✗ (-2 puntos, 86 % de las compras); c = 5: ✗ (2 puntos, 82 % de las compras); c = 8: ✓ (6 puntos, 71 % de las compras).

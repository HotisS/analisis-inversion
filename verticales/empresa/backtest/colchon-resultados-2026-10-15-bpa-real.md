# Backtest del colchón de la compra robusta · 2026-10-15 · BPA real

Generado con `node herramientas/backtest-colchon.mjs`. Protocolo fijado antes en `colchon-preregistro-2026-10-15.md`. 179 empresas, 234 cierres (123 de diseño y 111 de validación). BPA futuro real (techo).

### Todos los cierres (techo, BPA real) (234 cierres)

| Estrategia | Compras (% de c = 0) | Rent. real mediana | ≥ 15 % | < −10 % |
|---|--:|--:|--:|--:|
| Selector solo (vigente sin exigir v2), c = 0 | 75 | 35,7 % | 71 % | 9 % |
| Robusta, colchón c = 0 | 62 | 35,1 % | 71 % | 8 % |
| Robusta, colchón c = 2 | 57 (92 %) | 37,3 % | 72 % | 9 % |
| Robusta, colchón c = 3 | 56 (90 %) | 37,5 % | 71 % | 9 % |
| Robusta, colchón c = 5 | 48 (77 %) | 43,9 % | 77 % | 6 % |
| Robusta, colchón c = 8 | 43 (69 %) | 44,4 % | 79 % | 7 % |

**Compras que pierde cada colchón** frente a c = 0 (62 compras):

| Colchón | Perdidas | Rent. real mediana de las perdidas | ≥ 15 % | < −10 % |
|---|--:|--:|--:|--:|
| c = 2 | 5 | 15,7 % | 60 % | 0 % |
| c = 3 | 6 | 18,8 % | 67 % | 0 % |
| c = 5 | 14 | 14,4 % | 50 % | 14 % |
| c = 8 | 19 | 15,7 % | 53 % | 11 % |

Criterio (a) < −10 % baja ≥ 3 puntos, (b) conserva ≥ 60 % de las compras, (c) mediana no baja: c = 2: a✗ b✓ c✓; c = 3: a✗ b✓ c✓; c = 5: a✗ b✓ c✓; c = 8: a✗ b✓ c✓.

### Validación (signo) (111 cierres)

| Estrategia | Compras (% de c = 0) | Rent. real mediana | ≥ 15 % | < −10 % |
|---|--:|--:|--:|--:|
| Selector solo (vigente sin exigir v2), c = 0 | 35 | 34,2 % | 69 % | 3 % |
| Robusta, colchón c = 0 | 30 | 33,4 % | 67 % | 3 % |
| Robusta, colchón c = 2 | 27 (90 %) | 37,3 % | 70 % | 4 % |
| Robusta, colchón c = 3 | 27 (90 %) | 37,3 % | 70 % | 4 % |
| Robusta, colchón c = 5 | 23 (77 %) | 37,8 % | 74 % | 4 % |
| Robusta, colchón c = 8 | 21 (70 %) | 37,8 % | 76 % | 5 % |

**Compras que pierde cada colchón** frente a c = 0 (30 compras):

| Colchón | Perdidas | Rent. real mediana de las perdidas | ≥ 15 % | < −10 % |
|---|--:|--:|--:|--:|
| c = 2 | 3 | 9,9 % | 33 % | 0 % |
| c = 3 | 3 | 9,9 % | 33 % | 0 % |
| c = 5 | 7 | 13,2 % | 43 % | 0 % |
| c = 8 | 9 | 13,2 % | 44 % | 0 % |

Criterio (a) < −10 % baja ≥ 3 puntos, (b) conserva ≥ 60 % de las compras, (c) mediana no baja: c = 2: a✗ b✓ c✓; c = 3: a✗ b✓ c✓; c = 5: a✗ b✓ c✓; c = 8: a✗ b✓ c✓.

### Diseño (123 cierres)

| Estrategia | Compras (% de c = 0) | Rent. real mediana | ≥ 15 % | < −10 % |
|---|--:|--:|--:|--:|
| Selector solo (vigente sin exigir v2), c = 0 | 40 | 35,8 % | 73 % | 15 % |
| Robusta, colchón c = 0 | 32 | 38,7 % | 75 % | 13 % |
| Robusta, colchón c = 2 | 30 (94 %) | 38,7 % | 73 % | 13 % |
| Robusta, colchón c = 3 | 29 (91 %) | 41,4 % | 72 % | 14 % |
| Robusta, colchón c = 5 | 25 (78 %) | 52,6 % | 80 % | 8 % |
| Robusta, colchón c = 8 | 22 (69 %) | 53,4 % | 82 % | 9 % |

**Compras que pierde cada colchón** frente a c = 0 (32 compras):

| Colchón | Perdidas | Rent. real mediana de las perdidas | ≥ 15 % | < −10 % |
|---|--:|--:|--:|--:|
| c = 2 | 2 | 72,8 % | 100 % | 0 % |
| c = 3 | 3 | 23,2 % | 100 % | 0 % |
| c = 5 | 7 | 21,9 % | 57 % | 29 % |
| c = 8 | 10 | 21,4 % | 60 % | 20 % |

Criterio (a) < −10 % baja ≥ 3 puntos, (b) conserva ≥ 60 % de las compras, (c) mediana no baja: c = 2: a✗ b✓ c✓; c = 3: a✗ b✓ c✓; c = 5: a✓ b✓ c✓; c = 8: a✓ b✓ c✓.

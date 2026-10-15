# Backtest del colchón de la compra robusta · 2026-10-15 · BPA ingenuo

Generado con `node herramientas/backtest-colchon.mjs --bpa-ingenuo`. Protocolo fijado antes en `colchon-preregistro-2026-10-15.md`. 179 empresas, 232 cierres (122 de diseño y 110 de validación). BPA futuro ingenuo (crecimiento mediano anterior).

### Todos los cierres (decide) (232 cierres)

| Estrategia | Compras (% de c = 0) | Rent. real mediana | ≥ 15 % | < −10 % |
|---|--:|--:|--:|--:|
| Selector solo (vigente sin exigir v2), c = 0 | 67 | 13,7 % | 49 % | 19 % |
| Robusta, colchón c = 0 | 65 | 13,4 % | 48 % | 20 % |
| Robusta, colchón c = 2 | 58 (89 %) | 16,3 % | 50 % | 21 % |
| Robusta, colchón c = 3 | 57 (88 %) | 18,8 % | 51 % | 21 % |
| Robusta, colchón c = 5 | 51 (78 %) | 18,8 % | 51 % | 22 % |
| Robusta, colchón c = 8 | 46 (71 %) | 22,4 % | 54 % | 20 % |

**Compras que pierde cada colchón** frente a c = 0 (65 compras):

| Colchón | Perdidas | Rent. real mediana de las perdidas | ≥ 15 % | < −10 % |
|---|--:|--:|--:|--:|
| c = 2 | 7 | 3,4 % | 29 % | 14 % |
| c = 3 | 8 | 5,4 % | 25 % | 13 % |
| c = 5 | 14 | 5,4 % | 36 % | 14 % |
| c = 8 | 19 | 7,4 % | 32 % | 21 % |

Criterio (a) < −10 % baja ≥ 3 puntos, (b) conserva ≥ 60 % de las compras, (c) mediana no baja: c = 2: a✗ b✓ c✓; c = 3: a✗ b✓ c✓; c = 5: a✗ b✓ c✓; c = 8: a✗ b✓ c✓.

### Validación (signo) (110 cierres)

| Estrategia | Compras (% de c = 0) | Rent. real mediana | ≥ 15 % | < −10 % |
|---|--:|--:|--:|--:|
| Selector solo (vigente sin exigir v2), c = 0 | 31 | 13,4 % | 45 % | 26 % |
| Robusta, colchón c = 0 | 30 | 11,5 % | 43 % | 27 % |
| Robusta, colchón c = 2 | 28 (93 %) | 13,6 % | 46 % | 25 % |
| Robusta, colchón c = 3 | 28 (93 %) | 13,6 % | 46 % | 25 % |
| Robusta, colchón c = 5 | 26 (87 %) | 16,3 % | 50 % | 23 % |
| Robusta, colchón c = 8 | 23 (77 %) | 18,8 % | 52 % | 22 % |

**Compras que pierde cada colchón** frente a c = 0 (30 compras):

| Colchón | Perdidas | Rent. real mediana de las perdidas | ≥ 15 % | < −10 % |
|---|--:|--:|--:|--:|
| c = 2 | 2 | -3,7 % | 0 % | 50 % |
| c = 3 | 2 | -3,7 % | 0 % | 50 % |
| c = 5 | 4 | -6,2 % | 0 % | 50 % |
| c = 8 | 7 | -1,6 % | 14 % | 43 % |

Criterio (a) < −10 % baja ≥ 3 puntos, (b) conserva ≥ 60 % de las compras, (c) mediana no baja: c = 2: a✗ b✓ c✓; c = 3: a✗ b✓ c✓; c = 5: a✓ b✓ c✓; c = 8: a✓ b✓ c✓.

### Diseño (122 cierres)

| Estrategia | Compras (% de c = 0) | Rent. real mediana | ≥ 15 % | < −10 % |
|---|--:|--:|--:|--:|
| Selector solo (vigente sin exigir v2), c = 0 | 36 | 25,5 % | 53 % | 14 % |
| Robusta, colchón c = 0 | 35 | 23,2 % | 51 % | 14 % |
| Robusta, colchón c = 2 | 30 (86 %) | 25,5 % | 53 % | 17 % |
| Robusta, colchón c = 3 | 29 (83 %) | 27,9 % | 55 % | 17 % |
| Robusta, colchón c = 5 | 25 (71 %) | 23,2 % | 52 % | 20 % |
| Robusta, colchón c = 8 | 23 (66 %) | 27,9 % | 57 % | 17 % |

**Compras que pierde cada colchón** frente a c = 0 (35 compras):

| Colchón | Perdidas | Rent. real mediana de las perdidas | ≥ 15 % | < −10 % |
|---|--:|--:|--:|--:|
| c = 2 | 5 | 11,4 % | 40 % | 0 % |
| c = 3 | 6 | 9,4 % | 33 % | 0 % |
| c = 5 | 10 | 23,7 % | 50 % | 0 % |
| c = 8 | 12 | 9,5 % | 42 % | 8 % |

Criterio (a) < −10 % baja ≥ 3 puntos, (b) conserva ≥ 60 % de las compras, (c) mediana no baja: c = 2: a✗ b✓ c✓; c = 3: a✗ b✓ c✓; c = 5: a✗ b✓ c✓; c = 8: a✗ b✓ c✓.

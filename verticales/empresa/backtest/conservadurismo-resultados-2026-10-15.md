# Backtest de los tres sesgos conservadores · 2026-10-15 · BPA ingenuo

Generado con `node herramientas/backtest-conservadurismo.mjs`. Protocolo: `conservadurismo-preregistro-2026-10-15.md`. 195 empresas, 260 cierres (131 diseño, 129 validación).

### Sesgo 1: la v2 en desrateadas

#### Todos (decide): 8 cierres desrateados

| Variante | Cierres | Sesgo pond. | Error pond. | Compras | Rent. real mediana | ≥ 15 % | < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|
| S0 vigente (v2) | 8 | -4,2 % | 16,8 % | 8 | 40,4 % | 75 % | 13 % |
| S1 v2 con tope ×1,1 | 8 | 5,4 % | 12,7 % | 8 | 40,4 % | 75 % | 13 % |
| S2 v2 con tope ×1,2 | 8 | 14,9 % | 14,9 % | 8 | 40,4 % | 75 % | 13 % |
| S3 v3 ×1,1 sin selector | 8 | 2,6 % | 12,7 % | 8 | 40,4 % | 75 % | 13 % |

Criterio (error ≤ vigente + 0,5; mediana de compras no menor; < −10 % no más de +3): S1 ✓, S2 ✓.

#### Validación (signo): 4 cierres desrateados

| Variante | Cierres | Sesgo pond. | Error pond. | Compras | Rent. real mediana | ≥ 15 % | < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|
| S0 vigente (v2) | 4 | -13,1 % | 13,1 % | 4 | 55,9 % | 100 % | 0 % |
| S1 v2 con tope ×1,1 | 4 | -4,4 % | 9,8 % | 4 | 55,9 % | 100 % | 0 % |
| S2 v2 con tope ×1,2 | 4 | 4,2 % | 9,8 % | 4 | 55,9 % | 100 % | 0 % |
| S3 v3 ×1,1 sin selector | 4 | -6,3 % | 8,9 % | 4 | 55,9 % | 100 % | 0 % |

Criterio (error ≤ vigente + 0,5; mediana de compras no menor; < −10 % no más de +3): S1 ✓, S2 ✓.

#### Diseño: 4 cierres desrateados

| Variante | Cierres | Sesgo pond. | Error pond. | Compras | Rent. real mediana | ≥ 15 % | < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|
| S0 vigente (v2) | 4 | 10,9 % | 16,8 % | 4 | 16,0 % | 50 % | 25 % |
| S1 v2 con tope ×1,1 | 4 | 22,0 % | 22,0 % | 4 | 16,0 % | 50 % | 25 % |
| S2 v2 con tope ×1,2 | 4 | 33,1 % | 33,1 % | 4 | 16,0 % | 50 % | 25 % |
| S3 v3 ×1,1 sin selector | 4 | 22,0 % | 22,0 % | 4 | 16,0 % | 50 % | 25 % |

Criterio (error ≤ vigente + 0,5; mediana de compras no menor; < −10 % no más de +3): S1 ✗, S2 ✗.

### Sesgo 2: el escalón del selector

#### Todos (decide): 260 cierres

| Variante | Cierres | Sesgo pond. | Error pond. | Compras | Rent. real mediana | ≥ 15 % | < −10 % | Inestable (±5 % de precio) |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| Selector vigente (escalón en 1,8) | 260 | -6,4 % | 21,3 % | 74 | 12,9 % | 47 % | 19 % | 10 % |
| S4 mezcla continua 1,5-2,1 | 260 | -6,4 % | 21,5 % | 74 | 12,9 % | 47 % | 19 % | 10 % |

Criterio (error ≤ vigente + 0,3; mediana no menor; < −10 % no mayor; menos inestable): S4 ✗.

#### Validación (signo): 129 cierres

| Variante | Cierres | Sesgo pond. | Error pond. | Compras | Rent. real mediana | ≥ 15 % | < −10 % | Inestable (±5 % de precio) |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| Selector vigente (escalón en 1,8) | 129 | -6,6 % | 20,1 % | 40 | 18,4 % | 53 % | 20 % | 9 % |
| S4 mezcla continua 1,5-2,1 | 129 | -6,6 % | 20,1 % | 40 | 18,4 % | 53 % | 20 % | 9 % |

Criterio (error ≤ vigente + 0,3; mediana no menor; < −10 % no mayor; menos inestable): S4 ✗.

#### Diseño: 131 cierres

| Variante | Cierres | Sesgo pond. | Error pond. | Compras | Rent. real mediana | ≥ 15 % | < −10 % | Inestable (±5 % de precio) |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| Selector vigente (escalón en 1,8) | 131 | -5,9 % | 23,2 % | 34 | 9,7 % | 41 % | 18 % | 11 % |
| S4 mezcla continua 1,5-2,1 | 131 | -5,9 % | 23,2 % | 34 | 9,7 % | 41 % | 18 % | 11 % |

Criterio (error ≤ vigente + 0,3; mediana no menor; < −10 % no mayor; menos inestable): S4 ✗.

### Sesgo 3: recompras no anunciadas

#### Todos (decide): 40 cierres de recompradores en serie (reducción mediana de acciones 2,1 % al año)

| Variante | Error del BPA t+2 (mediana abs.) | Sesgo del BPA | Compras | Rent. real mediana | ≥ 15 % | < −10 % |
|---|--:|--:|--:|--:|--:|--:|
| B0 como el analista (beneficio, acciones fijas) | 15,9 % | 0,4 % | 10 | 37,4 % | 60 % | 20 % |
| B1 recompra entera | 14,9 % | 3,0 % | 13 | 34,2 % | 54 % | 15 % |
| B2 recompra a la mitad | 14,6 % | 1,7 % | 10 | 37,4 % | 60 % | 20 % |
| B3 vigente del backtest (BPA) | 14,6 % | 3,1 % | 12 | 35,1 % | 58 % | 17 % |

Criterio (error del BPA ≥ 1 punto menor que B0; mediana de compras no menor; < −10 % no mayor): B2 ✓, B1 ✗.

#### Validación (signo): 16 cierres de recompradores en serie (reducción mediana de acciones 2,9 % al año)

| Variante | Error del BPA t+2 (mediana abs.) | Sesgo del BPA | Compras | Rent. real mediana | ≥ 15 % | < −10 % |
|---|--:|--:|--:|--:|--:|--:|
| B0 como el analista (beneficio, acciones fijas) | 20,8 % | 9,5 % | 5 | 34,2 % | 60 % | 20 % |
| B1 recompra entera | 17,8 % | 15,4 % | 6 | 22,1 % | 50 % | 17 % |
| B2 recompra a la mitad | 19,1 % | 12,4 % | 5 | 34,2 % | 60 % | 20 % |
| B3 vigente del backtest (BPA) | 17,1 % | 15,5 % | 5 | 34,2 % | 60 % | 20 % |

Criterio (error del BPA ≥ 1 punto menor que B0; mediana de compras no menor; < −10 % no mayor): B2 ✓, B1 ✗.

#### Diseño: 24 cierres de recompradores en serie (reducción mediana de acciones 1,8 % al año)

| Variante | Error del BPA t+2 (mediana abs.) | Sesgo del BPA | Compras | Rent. real mediana | ≥ 15 % | < −10 % |
|---|--:|--:|--:|--:|--:|--:|
| B0 como el analista (beneficio, acciones fijas) | 11,7 % | -1,0 % | 5 | 40,7 % | 60 % | 20 % |
| B1 recompra entera | 13,7 % | 2,8 % | 7 | 35,9 % | 57 % | 14 % |
| B2 recompra a la mitad | 11,6 % | 0,9 % | 5 | 40,7 % | 60 % | 20 % |
| B3 vigente del backtest (BPA) | 11,9 % | 2,6 % | 7 | 35,9 % | 57 % | 14 % |

Criterio (error del BPA ≥ 1 punto menor que B0; mediana de compras no menor; < −10 % no mayor): B2 ✗, B1 ✗.

### Añadido por la tarde (15-oct): sesgo 1 con la red más ancha (`--ratio`)

Para tener más cierres que los 8 desrateados (ratio ≥ 1,8), se repite el sesgo 1 bajando el umbral (sensibilidad, no es el método). Las columnas son las de arriba.

| Umbral | Cierres | S0 vigente: sesgo / error / rent. mediana de compras | S1 tope ×1,1: sesgo / error / rent. mediana | ¿Cumple S1? |
|---|--:|--:|--:|---|
| ratio ≥ 1,5 (todos) | 19 | +1,9 % / 21,2 % / 28,7 % | +12,1 % / 20,2 % / 23,2 % | ✗ (mediana de compras menor) |
| ratio ≥ 1,5 (validación) | 12 | −12,6 % / 21,3 % / 65,1 % | −4,4 % / 15,6 % / 55,9 % | ✗ |
| ratio ≥ 1,3 (todos) | 39 | +1,9 % / 24,8 % / 23,2 % | +12,1 % / 23,9 % / 22,4 % | ✗ |
| ratio ≥ 1,3 (validación) | 20 | −3,6 % / 25,3 % / 35,0 % | +6,1 % / 19,3 % / 34,2 % | ✗ |

Lectura: con 39 cierres el tope ×1,1 pasa de un sesgo de +1,9 % a +12,1 % (promete 12 puntos más de lo que luego se gana) y las compras que añade rinden menos. **S1 no se adopta**, y ya no hace falta esperar a más datos: la prueba con la red ancha es suficiente para rechazarla.

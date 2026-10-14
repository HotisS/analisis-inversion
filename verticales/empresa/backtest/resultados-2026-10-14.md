# Backtest de la regla de múltiplos del objetivo a 12 meses · 2026-10-14

Generado por `node motor/backtest-multiplos.mjs`. 117 empresas con al menos tres cierres con precio y BPA; 188 observaciones (empresa × cierre t con t+1 y t+2 conocidos): 48 de entrenamiento (horizonte hasta 2021) y 140 de prueba (horizonte 2022-2025). BPA futuro: real (previsión perfecta: el error es solo del múltiplo).

**Cómo leerlo.** Sesgo = mediana de (precio predicho ÷ precio real − 1): negativo, la regla se queda corta. Error = mediana del error absoluto. «Real < bajista» y «Real > alcista» = cuántos años acabaron fuera de las colas (para unas colas de percentil 10 y 90 deberían rondar el 10 %; para 25/50/25, el 25 %). «Base = actual» = cuántas veces el base no supone ningún cambio de múltiplo. Compras = años en que la regla habría dicho Comprar (ponderada ≥ 15 % y base ≥ 12 %, con el BPA real); su rentabilidad real (mediana, con dividendo) frente al resto, cuántas acabaron con ≥ 15 % y cuántas perdieron más del 10 %.

**it3 calibrada en entrenamiento**: exponente de reversión λ = 0, bajista = base × 0,75 (o el mínimo de 5 años si es menor), alcista = techo base × 2,03.

### Todas las observaciones (pesos 25/50/25)

| Variante | n | Sesgo base | Error base | Sesgo pond. | Error pond. | Real < bajista | Real > alcista | Base = actual | Compras | Rent. real Comprar | Rent. real resto | Comprar con ≥ 15 % | Comprar con < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| v2 | 188 | -7,5 % | 20,0 % | -7,6 % | 18,1 % | 14 % | 43 % | 64 % | 64 (34 %) | 36,6 % | 7,5 % | 75 % | 6 % |
| it1 | 188 | -12,7 % | 20,6 % | -16,1 % | 21,9 % | 11 % | 59 % | 43 % | 49 (26 %) | 43,4 % | 9,1 % | 73 % | 6 % |
| it2 | 188 | -2,1 % | 20,6 % | -9,4 % | 20,0 % | 12 % | 47 % | 0 % | 60 (32 %) | 40,6 % | 8,5 % | 72 % | 8 % |
| it2cierre | 188 | 3,0 % | 21,9 % | -1,3 % | 20,4 % | 19 % | 31 % | 0 % | 92 (49 %) | 34,2 % | 2,7 % | 71 % | 10 % |
| it2b | 188 | -8,8 % | 21,7 % | -13,0 % | 23,3 % | 15 % | 54 % | 0 % | 60 (32 %) | 40,6 % | 8,5 % | 72 % | 8 % |
| it2c | 188 | -8,8 % | 21,7 % | -12,9 % | 23,3 % | 14 % | 54 % | 0 % | 60 (32 %) | 40,6 % | 8,5 % | 72 % | 8 % |
| it3 | 188 | 0,1 % | 21,1 % | -4,1 % | 17,2 % | 5 % | 36 % | 100 % | 59 (31 %) | 38,4 % | 8,4 % | 73 % | 12 % |

### Solo prueba (fuera de muestra para it3; mismo subconjunto para todas) (pesos 25/50/25)

| Variante | n | Sesgo base | Error base | Sesgo pond. | Error pond. | Real < bajista | Real > alcista | Base = actual | Compras | Rent. real Comprar | Rent. real resto | Comprar con ≥ 15 % | Comprar con < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| v2 | 140 | -1,2 % | 18,5 % | -3,0 % | 16,3 % | 19 % | 32 % | 66 % | 46 (33 %) | 32,9 % | 0,7 % | 67 % | 9 % |
| it1 | 140 | -8,5 % | 18,1 % | -12,9 % | 18,3 % | 12 % | 52 % | 47 % | 37 (26 %) | 34,2 % | 3,4 % | 65 % | 8 % |
| it2 | 140 | 3,6 % | 18,7 % | -3,0 % | 16,3 % | 13 % | 38 % | 0 % | 47 (34 %) | 34,2 % | 0,7 % | 64 % | 11 % |
| it2cierre | 140 | 12,2 % | 21,2 % | 6,8 % | 20,4 % | 24 % | 21 % | 0 % | 68 (49 %) | 27,2 % | -2,8 % | 62 % | 13 % |
| it2b | 140 | -4,2 % | 19,6 % | -10,1 % | 21,2 % | 17 % | 47 % | 0 % | 47 (34 %) | 34,2 % | 0,7 % | 64 % | 11 % |
| it2c | 140 | -4,2 % | 19,6 % | -10,1 % | 20,7 % | 16 % | 46 % | 0 % | 47 (34 %) | 34,2 % | 0,7 % | 64 % | 11 % |
| it3 | 140 | 3,7 % | 18,9 % | -1,6 % | 16,0 % | 5 % | 28 % | 100 % | 41 (29 %) | 34,2 % | 3,4 % | 66 % | 15 % |

### Solo prueba, con pesos 15/70/15 (pesos 15/70/15)

| Variante | n | Sesgo base | Error base | Sesgo pond. | Error pond. | Real < bajista | Real > alcista | Base = actual | Compras | Rent. real Comprar | Rent. real resto | Comprar con ≥ 15 % | Comprar con < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| v2 | 140 | -1,2 % | 18,5 % | -1,7 % | 17,7 % | 19 % | 32 % | 66 % | 47 (34 %) | 32,1 % | 0,7 % | 66 % | 9 % |
| it1 | 140 | -8,5 % | 18,1 % | -11,3 % | 17,3 % | 12 % | 52 % | 47 % | 39 (28 %) | 27,2 % | 1,9 % | 64 % | 8 % |
| it2 | 140 | 3,6 % | 18,7 % | -0,7 % | 17,0 % | 13 % | 38 % | 0 % | 55 (39 %) | 31,6 % | -1,3 % | 64 % | 11 % |
| it2cierre | 140 | 12,2 % | 21,2 % | 8,9 % | 20,5 % | 24 % | 21 % | 0 % | 71 (51 %) | 27,2 % | -3,3 % | 61 % | 14 % |
| it2b | 140 | -4,2 % | 19,6 % | -8,2 % | 20,2 % | 17 % | 47 % | 0 % | 49 (35 %) | 31,6 % | 0,7 % | 63 % | 10 % |
| it2c | 140 | -4,2 % | 19,6 % | -8,2 % | 20,2 % | 16 % | 46 % | 0 % | 49 (35 %) | 31,6 % | 0,7 % | 63 % | 10 % |
| it3 | 140 | 3,7 % | 18,9 % | 1,6 % | 17,4 % | 5 % | 28 % | 100 % | 54 (39 %) | 22,6 % | 1,3 % | 56 % | 15 % |

### Solo empresas por debajo de su mediana adelantada (81) (pesos 25/50/25)

| Variante | n | Sesgo base | Error base | Sesgo pond. | Error pond. | Real < bajista | Real > alcista | Base = actual | Compras | Rent. real Comprar | Rent. real resto | Comprar con ≥ 15 % | Comprar con < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| v2 | 81 | -10,2 % | 19,1 % | -9,2 % | 17,1 % | 12 % | 35 % | 94 % | 37 (46 %) | 44,4 % | 13,6 % | 81 % | 5 % |
| it1 | 81 | -9,5 % | 18,8 % | -9,2 % | 18,1 % | 15 % | 44 % | 100 % | 37 (46 %) | 44,4 % | 14,6 % | 78 % | 5 % |
| it2 | 81 | 2,4 % | 21,4 % | -2,5 % | 22,6 % | 19 % | 33 % | 0 % | 48 (59 %) | 44,4 % | 13,1 % | 75 % | 8 % |
| it2cierre | 81 | 5,1 % | 22,3 % | 1,5 % | 21,5 % | 25 % | 21 % | 0 % | 56 (69 %) | 35,1 % | 13,1 % | 71 % | 11 % |
| it2b | 81 | 2,4 % | 21,4 % | -1,1 % | 22,5 % | 25 % | 33 % | 0 % | 48 (59 %) | 44,4 % | 13,1 % | 75 % | 8 % |
| it2c | 81 | 2,4 % | 21,4 % | -1,1 % | 22,6 % | 22 % | 33 % | 0 % | 48 (59 %) | 44,4 % | 13,1 % | 75 % | 8 % |
| it3 | 81 | -9,5 % | 18,8 % | -8,1 % | 16,6 % | 5 % | 33 % | 100 % | 34 (42 %) | 48,0 % | 14,1 % | 82 % | 6 % |

### Solo empresas por encima de su mediana adelantada (107) (pesos 25/50/25)

| Variante | n | Sesgo base | Error base | Sesgo pond. | Error pond. | Real < bajista | Real > alcista | Base = actual | Compras | Rent. real Comprar | Rent. real resto | Comprar con ≥ 15 % | Comprar con < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| v2 | 107 | -5,1 % | 20,1 % | -7,6 % | 19,5 % | 16 % | 50 % | 41 % | 27 (25 %) | 33,7 % | 0,7 % | 67 % | 7 % |
| it1 | 107 | -17,2 % | 21,8 % | -19,8 % | 24,4 % | 7 % | 70 % | 0 % | 12 (11 %) | 35,6 % | 3,7 % | 58 % | 8 % |
| it2 | 107 | -4,0 % | 20,3 % | -12,5 % | 18,6 % | 7 % | 57 % | 0 % | 12 (11 %) | 35,6 % | 3,7 % | 58 % | 8 % |
| it2cierre | 107 | 2,2 % | 21,5 % | -3,0 % | 18,8 % | 15 % | 39 % | 0 % | 36 (34 %) | 33,5 % | -3,3 % | 69 % | 8 % |
| it2b | 107 | -17,2 % | 21,8 % | -19,8 % | 24,4 % | 7 % | 70 % | 0 % | 12 (11 %) | 35,6 % | 3,7 % | 58 % | 8 % |
| it2c | 107 | -17,2 % | 21,8 % | -19,8 % | 24,4 % | 7 % | 69 % | 0 % | 12 (11 %) | 35,6 % | 3,7 % | 58 % | 8 % |
| it3 | 107 | 8,6 % | 25,0 % | -2,3 % | 17,9 % | 5 % | 37 % | 100 % | 25 (23 %) | 33,4 % | 3,5 % | 60 % | 20 % |

### Lo que hizo el múltiplo adelantado de verdad (PER adelantado en t+1 ÷ PER actual en t)

| | p10 | p25 | Mediana | p75 | p90 |
|---|--:|--:|--:|--:|--:|
| Todas (188) | 0,64 | 0,83 | 1,00 | 1,27 | 1,71 |
| Por debajo de su mediana (81) | 0,78 | 0,96 | 1,11 | 1,40 | 1,81 |
| Por encima de su mediana (107) | 0,54 | 0,77 | 0,92 | 1,15 | 1,64 |

Rentabilidad real a un año con dividendo (todas): p10 -27,7 %, mediana 14,7 %, p90 66,4 %. Años por horizonte: {"2020":16,"2021":32,"2022":35,"2023":43,"2024":51,"2025":11}.

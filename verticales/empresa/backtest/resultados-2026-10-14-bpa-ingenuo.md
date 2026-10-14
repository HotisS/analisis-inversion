# Backtest de la regla de múltiplos del objetivo a 12 meses · 2026-10-14

Generado por `node motor/backtest-multiplos.mjs --bpa-ingenuo`. 117 empresas con al menos tres cierres con precio y BPA; 186 observaciones (empresa × cierre t con t+1 y t+2 conocidos): 48 de entrenamiento (horizonte hasta 2021) y 138 de prueba (horizonte 2022-2025). BPA futuro: ingenuo (crecimiento mediano anterior, entre −10 % y +25 %).

**Cómo leerlo.** Sesgo = mediana de (precio predicho ÷ precio real − 1): negativo, la regla se queda corta. Error = mediana del error absoluto. «Real < bajista» y «Real > alcista» = cuántos años acabaron fuera de las colas (para unas colas de percentil 10 y 90 deberían rondar el 10 %; para 25/50/25, el 25 %). «Base = actual» = cuántas veces el base no supone ningún cambio de múltiplo. Compras = años en que la regla habría dicho Comprar (ponderada ≥ 15 % y base ≥ 12 %, con el BPA ingenuo); su rentabilidad real (mediana, con dividendo) frente al resto, cuántas acabaron con ≥ 15 % y cuántas perdieron más del 10 %.

**it3 calibrada en entrenamiento**: exponente de reversión λ = 0, bajista = base × 0,64 (o el mínimo de 5 años si es menor), alcista = techo base × 1,86.

### Todas las observaciones (pesos 25/50/25)

| Variante | n | Sesgo base | Error base | Sesgo pond. | Error pond. | Real < bajista | Real > alcista | Base = actual | Compras | Rent. real Comprar | Rent. real resto | Comprar con ≥ 15 % | Comprar con < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| v2 | 186 | -8,6 % | 23,9 % | -7,5 % | 23,9 % | 23 % | 42 % | 67 % | 84 (45 %) | 19,4 % | 14,2 % | 52 % | 20 % |
| it1 | 186 | -14,7 % | 24,6 % | -16,4 % | 24,9 % | 17 % | 55 % | 40 % | 47 (25 %) | 18,8 % | 15,2 % | 51 % | 21 % |
| it2 | 186 | -1,4 % | 23,0 % | -6,3 % | 24,1 % | 16 % | 45 % | 0 % | 55 (30 %) | 21,6 % | 14,1 % | 55 % | 18 % |
| it2cierre | 186 | 6,5 % | 23,7 % | 2,8 % | 24,8 % | 26 % | 34 % | 0 % | 104 (56 %) | 18,6 % | 14,0 % | 53 % | 21 % |
| it2b | 186 | -9,3 % | 25,3 % | -12,5 % | 25,7 % | 22 % | 49 % | 0 % | 59 (32 %) | 21,6 % | 13,9 % | 56 % | 17 % |
| it2c | 186 | -9,3 % | 25,3 % | -12,7 % | 25,6 % | 20 % | 49 % | 0 % | 58 (31 %) | 20,8 % | 14,0 % | 55 % | 17 % |
| it3 | 186 | -3,8 % | 21,3 % | -7,3 % | 23,0 % | 6 % | 40 % | 100 % | 44 (24 %) | 22,4 % | 14,2 % | 55 % | 25 % |

### Solo prueba (fuera de muestra para it3; mismo subconjunto para todas) (pesos 25/50/25)

| Variante | n | Sesgo base | Error base | Sesgo pond. | Error pond. | Real < bajista | Real > alcista | Base = actual | Compras | Rent. real Comprar | Rent. real resto | Comprar con ≥ 15 % | Comprar con < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| v2 | 138 | 1,3 % | 21,5 % | 1,4 % | 20,7 % | 29 % | 30 % | 76 % | 72 (52 %) | 11,7 % | 7,7 % | 47 % | 24 % |
| it1 | 138 | -2,4 % | 20,0 % | -5,2 % | 20,5 % | 22 % | 43 % | 49 % | 43 (31 %) | 12,4 % | 8,4 % | 49 % | 23 % |
| it2 | 138 | 7,1 % | 21,8 % | 2,1 % | 20,8 % | 21 % | 30 % | 0 % | 50 (36 %) | 18,4 % | 7,7 % | 52 % | 20 % |
| it2cierre | 138 | 16,0 % | 23,4 % | 13,2 % | 24,8 % | 33 % | 20 % | 0 % | 90 (65 %) | 12,2 % | 5,3 % | 48 % | 24 % |
| it2b | 138 | 3,8 % | 20,6 % | 0,0 % | 21,4 % | 28 % | 35 % | 0 % | 55 (40 %) | 20,0 % | 6,9 % | 55 % | 18 % |
| it2c | 138 | 3,8 % | 20,6 % | 0,0 % | 21,4 % | 27 % | 35 % | 0 % | 54 (39 %) | 19,4 % | 7,1 % | 54 % | 19 % |
| it3 | 138 | 5,2 % | 21,3 % | 1,3 % | 20,2 % | 9 % | 26 % | 100 % | 41 (30 %) | 18,8 % | 8,1 % | 51 % | 27 % |

### Solo prueba, con pesos 15/70/15 (pesos 15/70/15)

| Variante | n | Sesgo base | Error base | Sesgo pond. | Error pond. | Real < bajista | Real > alcista | Base = actual | Compras | Rent. real Comprar | Rent. real resto | Comprar con ≥ 15 % | Comprar con < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| v2 | 138 | 1,3 % | 21,5 % | 0,7 % | 21,2 % | 29 % | 30 % | 76 % | 75 (54 %) | 9,7 % | 8,1 % | 45 % | 25 % |
| it1 | 138 | -2,4 % | 20,0 % | -3,6 % | 22,2 % | 22 % | 43 % | 49 % | 46 (33 %) | 20,2 % | 7,9 % | 52 % | 22 % |
| it2 | 138 | 7,1 % | 21,8 % | 3,7 % | 21,8 % | 21 % | 30 % | 0 % | 59 (43 %) | 18,0 % | 7,4 % | 53 % | 20 % |
| it2cierre | 138 | 16,0 % | 23,4 % | 14,9 % | 24,4 % | 33 % | 20 % | 0 % | 96 (70 %) | 11,7 % | 5,3 % | 47 % | 24 % |
| it2b | 138 | 3,8 % | 20,6 % | 0,7 % | 21,8 % | 28 % | 35 % | 0 % | 58 (42 %) | 19,4 % | 3,7 % | 55 % | 17 % |
| it2c | 138 | 3,8 % | 20,6 % | 0,8 % | 21,8 % | 27 % | 35 % | 0 % | 58 (42 %) | 19,4 % | 3,7 % | 55 % | 17 % |
| it3 | 138 | 5,2 % | 21,3 % | 2,5 % | 20,5 % | 9 % | 26 % | 100 % | 60 (43 %) | 10,5 % | 8,3 % | 47 % | 30 % |

### Solo empresas por debajo de su mediana adelantada (75) (pesos 25/50/25)

| Variante | n | Sesgo base | Error base | Sesgo pond. | Error pond. | Real < bajista | Real > alcista | Base = actual | Compras | Rent. real Comprar | Rent. real resto | Comprar con ≥ 15 % | Comprar con < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| v2 | 75 | -4,7 % | 19,1 % | -2,3 % | 19,3 % | 27 % | 28 % | 97 % | 54 (72 %) | 25,5 % | 17,1 % | 57 % | 19 % |
| it1 | 75 | -4,7 % | 19,1 % | -5,1 % | 20,0 % | 25 % | 37 % | 100 % | 45 (60 %) | 21,6 % | 19,4 % | 53 % | 22 % |
| it2 | 75 | 8,1 % | 18,8 % | 5,4 % | 21,2 % | 28 % | 23 % | 0 % | 52 (69 %) | 22,4 % | 18,8 % | 56 % | 19 % |
| it2cierre | 75 | 13,1 % | 20,3 % | 12,2 % | 21,9 % | 36 % | 13 % | 0 % | 63 (84 %) | 20,0 % | 18,0 % | 57 % | 17 % |
| it2b | 75 | 8,1 % | 18,8 % | 6,5 % | 21,7 % | 36 % | 23 % | 0 % | 57 (76 %) | 23,2 % | 16,2 % | 58 % | 18 % |
| it2c | 75 | 8,1 % | 18,8 % | 7,8 % | 21,7 % | 33 % | 23 % | 0 % | 56 (75 %) | 22,4 % | 17,1 % | 57 % | 18 % |
| it3 | 75 | -4,7 % | 19,1 % | -5,4 % | 20,2 % | 5 % | 23 % | 100 % | 43 (57 %) | 23,2 % | 18,4 % | 56 % | 23 % |

### Solo empresas por encima de su mediana adelantada (111) (pesos 25/50/25)

| Variante | n | Sesgo base | Error base | Sesgo pond. | Error pond. | Real < bajista | Real > alcista | Base = actual | Compras | Rent. real Comprar | Rent. real resto | Comprar con ≥ 15 % | Comprar con < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| v2 | 111 | -9,9 % | 27,2 % | -12,2 % | 29,6 % | 20 % | 52 % | 46 % | 30 (27 %) | 11,4 % | 13,1 % | 43 % | 23 % |
| it1 | 111 | -22,5 % | 30,9 % | -27,3 % | 31,8 % | 12 % | 68 % | 0 % | 2 (2 %) | 7,4 % | 12,9 % | 0 % | 0 % |
| it2 | 111 | -12,5 % | 26,0 % | -16,8 % | 26,7 % | 8 % | 60 % | 0 % | 3 (3 %) | 11,4 % | 12,4 % | 33 % | 0 % |
| it2cierre | 111 | -1,6 % | 27,0 % | -6,1 % | 26,3 % | 20 % | 49 % | 0 % | 41 (37 %) | 11,4 % | 13,0 % | 46 % | 27 % |
| it2b | 111 | -22,5 % | 30,9 % | -27,3 % | 31,8 % | 12 % | 68 % | 0 % | 2 (2 %) | 7,4 % | 12,9 % | 0 % | 0 % |
| it2c | 111 | -22,5 % | 30,9 % | -27,3 % | 31,8 % | 12 % | 68 % | 0 % | 2 (2 %) | 7,4 % | 12,9 % | 0 % | 0 % |
| it3 | 111 | -1,5 % | 25,2 % | -10,3 % | 25,1 % | 7 % | 51 % | 100 % | 1 (1 %) | -36,8 % | 12,4 % | 0 % | 100 % |

### Lo que hizo el múltiplo adelantado de verdad (PER adelantado en t+1 ÷ PER actual en t)

| | p10 | p25 | Mediana | p75 | p90 |
|---|--:|--:|--:|--:|--:|
| Todas (186) | 0,63 | 0,78 | 1,00 | 1,31 | 1,83 |
| Por debajo de su mediana (75) | 0,76 | 0,93 | 1,06 | 1,39 | 1,91 |
| Por encima de su mediana (111) | 0,56 | 0,74 | 0,91 | 1,21 | 1,57 |

Rentabilidad real a un año con dividendo (todas): p10 -26,0 %, mediana 16,2 %, p90 65,3 %. Años por horizonte: {"2020":16,"2021":32,"2022":34,"2023":43,"2024":50,"2025":11}.

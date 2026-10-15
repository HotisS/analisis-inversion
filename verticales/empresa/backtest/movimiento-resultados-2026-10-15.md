# Backtest del movimiento del precio · 2026-10-15 · BPA ingenuo

Generado con `node herramientas/backtest-movimiento.mjs`. Protocolo: `movimiento-preregistro-2026-10-15.md`. 195 empresas, 260 cierres, 260 con precio diario de Yahoo en el 31-dic de t (84 símbolos). Criterio: bloqueadas con mediana ≥ 5 puntos peor y ≥ 5 puntos más en pérdida que las que quedan, ≤ 25 % de las compras, mismo signo en validación.

### Todos los cierres (decide) (260 cierres con precio diario; 72 compras robustas)

| Regla | Compras bloqueadas | Rent. real mediana (bloqueadas) | ≥ 15 % | < −10 % | Las que quedan: n | Rent. mediana | < −10 % | Todos los cierres bloqueados: n | Rent. mediana | ¿Cumple? |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| R1 subida fuerte (+25 % 1 m o +40 % 3 m) | 2 (3 %) | 39,4 % | 100 % | 0 % | 70 | 11,2 % | 20 % | 4 | 30,8 % | no |
| R2 a ≤ 5 % del máx. 52 s tras +20 % en 3 m | 7 (10 %) | 55,5 % | 57 % | 43 % | 65 | 11,4 % | 17 % | 33 | 13,9 % | no |
| R3 caída fuerte (−20 % 1 m o −30 % 3 m) | 0 (0 %) | n.d. % | n.d. % | n.d. % | 72 | 11,9 % | 19 % | 0 | n.d. % | no |
| R4 a ≤ 3 % del mínimo de 52 s | 2 (3 %) | 49,6 % | 100 % | 0 % | 70 | 11,2 % | 20 % | 3 | 24,3 % | no |
| R5 ≥ 15 % bajo la media de 200 | 5 (7 %) | 58,3 % | 60 % | 0 % | 67 | 11,4 % | 21 % | 8 | 21,7 % | no |
| R6 tendencia bajista (añadida después) | 24 (33 %) | 10,3 % | 46 % | 21 % | 48 | 12,4 % | 19 % | 50 | 9,1 % | no |

Sin regla: todas las compras robustas | 72 | 11,9 % | 46 % | 19 % |

### Validación (signo) (129 cierres con precio diario; 39 compras robustas)

| Regla | Compras bloqueadas | Rent. real mediana (bloqueadas) | ≥ 15 % | < −10 % | Las que quedan: n | Rent. mediana | < −10 % | Todos los cierres bloqueados: n | Rent. mediana | ¿Cumple? |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| R1 subida fuerte (+25 % 1 m o +40 % 3 m) | 1 (3 %) | 55,5 % | 100 % | 0 % | 38 | 16,3 % | 21 % | 1 | 55,5 % | no |
| R2 a ≤ 5 % del máx. 52 s tras +20 % en 3 m | 5 (13 %) | 55,5 % | 60 % | 40 % | 34 | 16,3 % | 18 % | 21 | 14,9 % | no |
| R3 caída fuerte (−20 % 1 m o −30 % 3 m) | 0 (0 %) | n.d. % | n.d. % | n.d. % | 39 | 18,8 % | 21 % | 0 | n.d. % | no |
| R4 a ≤ 3 % del mínimo de 52 s | 2 (5 %) | 49,6 % | 100 % | 0 % | 37 | 13,7 % | 22 % | 3 | 24,3 % | no |
| R5 ≥ 15 % bajo la media de 200 | 2 (5 %) | 70,2 % | 100 % | 0 % | 37 | 13,7 % | 22 % | 2 | 70,2 % | no |
| R6 tendencia bajista (añadida después) | 12 (31 %) | 13,5 % | 50 % | 25 % | 27 | 19,1 % | 19 % | 24 | 18,5 % | no |

Sin regla: todas las compras robustas | 39 | 18,8 % | 51 % | 21 % |

### Diseño (131 cierres con precio diario; 33 compras robustas)

| Regla | Compras bloqueadas | Rent. real mediana (bloqueadas) | ≥ 15 % | < −10 % | Las que quedan: n | Rent. mediana | < −10 % | Todos los cierres bloqueados: n | Rent. mediana | ¿Cumple? |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| R1 subida fuerte (+25 % 1 m o +40 % 3 m) | 1 (3 %) | 23,2 % | 100 % | 0 % | 32 | 9,2 % | 19 % | 3 | 27,1 % | no |
| R2 a ≤ 5 % del máx. 52 s tras +20 % en 3 m | 2 (6 %) | 24,3 % | 50 % | 50 % | 31 | 9,7 % | 16 % | 12 | 10,8 % | no |
| R3 caída fuerte (−20 % 1 m o −30 % 3 m) | 0 (0 %) | n.d. % | n.d. % | n.d. % | 33 | 9,7 % | 18 % | 0 | n.d. % | no |
| R4 a ≤ 3 % del mínimo de 52 s | 0 (0 %) | n.d. % | n.d. % | n.d. % | 33 | 9,7 % | 18 % | 0 | n.d. % | no |
| R5 ≥ 15 % bajo la media de 200 | 3 (9 %) | -0,1 % | 33 % | 0 % | 30 | 9,7 % | 20 % | 6 | -3,2 % | no |
| R6 tendencia bajista (añadida después) | 12 (36 %) | 6,2 % | 42 % | 17 % | 21 | 9,7 % | 19 % | 26 | -0,4 % | no |

Sin regla: todas las compras robustas | 33 | 9,7 % | 39 % | 18 % |

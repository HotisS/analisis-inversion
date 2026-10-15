# Backtest del ROIC sin fondo de comercio y de las cíclicas · 2026-10-15 · BPA ingenuo

Generado con `node herramientas/backtest-calidad-ciclicas.mjs`. Protocolo y criterios fijados antes en `calidad-ciclicas-preregistro-2026-10-15.md`. 164 empresas, 214 cierres (204 con ROIC y fondo de comercio en t; 188 de cíclicas). BPA futuro ingenuo (crecimiento mediano conocido, entre −10 % y +25 %). A 12 meses decide la regla vigente (v3 ×1,1 con selector). Pesos 25/50/25.

## Prueba 1: el filtro de calidad con el ROIC sin fondo de comercio

### Todos (204 cierres con ROIC y fondo de comercio)

| Estrategia | Compras | Rent. real 12 m | ≥ 15 % | < −10 % | Rent. real 3 a (anual; n) |
|---|--:|--:|--:|--:|--:|
| Q0. Publicado (vigente) | 48 | 22,4 % | 56 % | 17 % | 13,2 % (29) |
| Q1. Sin fondo de comercio siempre | 52 | 20,2 % | 54 % | 19 % | 13,2 % (31) |
|   · añadidas por Q1 (todas) | 4 | 0,4 % | 25 % | 50 % | 17,7 % (2) |
|   · añadidas, compradores en serie | 4 | 0,4 % | 25 % | 50 % | 17,7 % (2) |
|   · añadidas, compra única o sin historia | 0 | 0,0 % | n.d. % | n.d. % | n.d. % (0) |
| Q2. Sin fondo de comercio solo en compra única | 48 | 22,4 % | 56 % | 17 % | 13,2 % (29) |
|   · añadidas por Q2 | 0 | 0,0 % | n.d. % | n.d. % | n.d. % (0) |
| Comprar a 12 m sin filtro de calidad | 59 | 18,0 % | 51 % | 20 % | 10,0 % (36) |

### Validación (88 cierres con ROIC y fondo de comercio)

| Estrategia | Compras | Rent. real 12 m | ≥ 15 % | < −10 % | Rent. real 3 a (anual; n) |
|---|--:|--:|--:|--:|--:|
| Q0. Publicado (vigente) | 20 | 26,4 % | 60 % | 20 % | 13,7 % (12) |
| Q1. Sin fondo de comercio siempre | 21 | 23,2 % | 57 % | 24 % | 14,3 % (13) |
|   · añadidas por Q1 (todas) | 1 | -21,2 % | 0 % | 100 % | 24,8 % (1) |
|   · añadidas, compradores en serie | 1 | -21,2 % | 0 % | 100 % | 24,8 % (1) |
|   · añadidas, compra única o sin historia | 0 | 0,0 % | n.d. % | n.d. % | n.d. % (0) |
| Q2. Sin fondo de comercio solo en compra única | 20 | 26,4 % | 60 % | 20 % | 13,7 % (12) |
|   · añadidas por Q2 | 0 | 0,0 % | n.d. % | n.d. % | n.d. % (0) |
| Comprar a 12 m sin filtro de calidad | 25 | 23,2 % | 56 % | 20 % | 12,4 % (16) |

### Diseño (116 cierres con ROIC y fondo de comercio)

| Estrategia | Compras | Rent. real 12 m | ≥ 15 % | < −10 % | Rent. real 3 a (anual; n) |
|---|--:|--:|--:|--:|--:|
| Q0. Publicado (vigente) | 28 | 19,8 % | 54 % | 14 % | 9,6 % (17) |
| Q1. Sin fondo de comercio siempre | 31 | 18,0 % | 52 % | 16 % | 10,0 % (18) |
|   · añadidas por Q1 (todas) | 3 | 13,4 % | 33 % | 33 % | 10,5 % (1) |
|   · añadidas, compradores en serie | 3 | 13,4 % | 33 % | 33 % | 10,5 % (1) |
|   · añadidas, compra única o sin historia | 0 | 0,0 % | n.d. % | n.d. % | n.d. % (0) |
| Q2. Sin fondo de comercio solo en compra única | 28 | 19,8 % | 54 % | 14 % | 9,6 % (17) |
|   · añadidas por Q2 | 0 | 0,0 % | n.d. % | n.d. % | n.d. % (0) |
| Comprar a 12 m sin filtro de calidad | 34 | 13,6 % | 47 % | 21 % | 9,5 % (20) |

### Contexto: ¿predice algo cada medida de calidad? (todos los cierres)

| Todos los cierres según el filtro | Cierres | Rent. real 12 m | < −10 % |
|---|--:|--:|--:|
| Pasa calidad publicada | 154 | 14,7 % | 22 % |
| No pasa calidad publicada | 50 | 13,6 % | 24 % |
| Pasa calidad sin fondo de comercio | 182 | 14,7 % | 21 % |
| No pasa calidad sin fondo de comercio | 22 | 9,9 % | 32 % |
| Pasa sin f. de comercio y no publicada | 28 | 14,8 % | 18 % |
|   · de ellas, compradores en serie | 15 | 13,4 % | 20 % |
|   · de ellas, compra única | 12 | 16,3 % | 17 % |

### Las compras que añade el ROIC sin fondo de comercio (todos los cierres)

| Empresa | Cierre | ROIC publicado | ROIC sin f. de comercio | WACC | En serie | Rent. real 12 m |
|---|--:|--:|--:|--:|---|--:|
| Amazon | 2023 | 16,1 % | 18,2 % | 12,1 % | sí | 44,4 % |
| Waste Connections | 2022 | 7,8 % | 15,8 % | 7,8 % | sí | 13,4 % |
| Fielmann | 2023 | 10,7 % | 13,4 % | 7,7 % | sí | -12,5 % |
| SAP | 2021 | 11,5 % | 34,6 % | 9,3 % | sí | -21,2 % |

## Prueba 2: cíclicas, años de fondo de ciclo fuera de la historia del PER

### Solo cíclicas (188 cierres; 144 con algún año de fondo de ciclo)

| Estrategia | Sesgo pond. | Error pond. | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|
| Vigente (selector) | -6,4 % | 23,6 % | 61 | 18,0 % | 13,9 % | 51 % | 20 % |
| Sin años de fondo de ciclo, solo cíclicas | -8,2 % | 23,2 % | 61 | 18,8 % | 13,2 % | 52 % | 20 % |
| Sin años de fondo de ciclo, todas | -8,2 % | 23,2 % | 61 | 18,8 % | 13,2 % | 52 % | 20 % |

### Solo cíclicas, validación (76 cierres; 47 con algún año de fondo de ciclo)

| Estrategia | Sesgo pond. | Error pond. | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|
| Vigente (selector) | -3,2 % | 24,1 % | 24 | 21,0 % | 13,1 % | 54 % | 21 % |
| Sin años de fondo de ciclo, solo cíclicas | -3,8 % | 23,3 % | 22 | 21,0 % | 13,1 % | 55 % | 23 % |
| Sin años de fondo de ciclo, todas | -3,8 % | 23,3 % | 22 | 21,0 % | 13,1 % | 55 % | 23 % |

### Solo cíclicas, diseño (112 cierres; 97 con algún año de fondo de ciclo)

| Estrategia | Sesgo pond. | Error pond. | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|
| Vigente (selector) | -9,6 % | 23,4 % | 37 | 13,7 % | 14,1 % | 49 % | 19 % |
| Sin años de fondo de ciclo, solo cíclicas | -11,1 % | 23,2 % | 39 | 18,0 % | 13,9 % | 51 % | 18 % |
| Sin años de fondo de ciclo, todas | -11,1 % | 23,2 % | 39 | 18,0 % | 13,9 % | 51 % | 18 % |

### No cíclicas (26 cierres; 0 con algún año de fondo de ciclo)

| Estrategia | Sesgo pond. | Error pond. | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|
| Vigente (selector) | -14,6 % | 22,1 % | 1 | 27,9 % | 14,3 % | 100 % | 0 % |
| Sin años de fondo de ciclo, solo cíclicas | -14,6 % | 22,1 % | 1 | 27,9 % | 14,3 % | 100 % | 0 % |
| Sin años de fondo de ciclo, todas | -14,6 % | 22,1 % | 1 | 27,9 % | 14,3 % | 100 % | 0 % |

### Todos (214 cierres; 144 con algún año de fondo de ciclo)

| Estrategia | Sesgo pond. | Error pond. | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|
| Vigente (selector) | -8,0 % | 23,6 % | 62 | 18,4 % | 14,0 % | 52 % | 19 % |
| Sin años de fondo de ciclo, solo cíclicas | -9,8 % | 23,2 % | 62 | 19,4 % | 13,5 % | 53 % | 19 % |
| Sin años de fondo de ciclo, todas | -9,8 % | 23,2 % | 62 | 19,4 % | 13,5 % | 53 % | 19 % |

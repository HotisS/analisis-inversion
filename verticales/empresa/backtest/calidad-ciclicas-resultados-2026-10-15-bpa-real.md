# Backtest del ROIC sin fondo de comercio y de las cíclicas · 2026-10-15 · BPA real

Generado con `node herramientas/backtest-calidad-ciclicas.mjs --bpa-real`. Protocolo y criterios fijados antes en `calidad-ciclicas-preregistro-2026-10-15.md`. 164 empresas, 215 cierres (205 con ROIC y fondo de comercio en t; 189 de cíclicas). BPA futuro real (previsión perfecta). A 12 meses decide la regla vigente (v3 ×1,1 con selector). Pesos 25/50/25.

## Prueba 1: el filtro de calidad con el ROIC sin fondo de comercio

### Todos (205 cierres con ROIC y fondo de comercio)

| Estrategia | Compras | Rent. real 12 m | ≥ 15 % | < −10 % | Rent. real 3 a (anual; n) |
|---|--:|--:|--:|--:|--:|
| Q0. Publicado (vigente) | 43 | 43,4 % | 81 % | 7 % | 20,3 % (32) |
| Q1. Sin fondo de comercio siempre | 52 | 43,2 % | 79 % | 8 % | 17,1 % (36) |
|   · añadidas por Q1 (todas) | 9 | 37,8 % | 67 % | 11 % | 1,8 % (4) |
|   · añadidas, compradores en serie | 5 | 15,7 % | 60 % | 20 % | n.d. % (0) |
|   · añadidas, compra única o sin historia | 4 | 41,7 % | 75 % | 0 % | 1,8 % (4) |
| Q2. Sin fondo de comercio solo en compra única | 46 | 43,2 % | 80 % | 7 % | 18,0 % (35) |
|   · añadidas por Q2 | 3 | 37,8 % | 67 % | 0 % | -2,1 % (3) |
| Comprar a 12 m sin filtro de calidad | 64 | 37,5 % | 72 % | 9 % | 16,2 % (43) |

### Validación (89 cierres con ROIC y fondo de comercio)

| Estrategia | Compras | Rent. real 12 m | ≥ 15 % | < −10 % | Rent. real 3 a (anual; n) |
|---|--:|--:|--:|--:|--:|
| Q0. Publicado (vigente) | 21 | 42,9 % | 86 % | 10 % | 20,3 % (16) |
| Q1. Sin fondo de comercio siempre | 24 | 45,3 % | 88 % | 8 % | 16,7 % (18) |
|   · añadidas por Q1 (todas) | 3 | 50,3 % | 100 % | 0 % | 1,8 % (2) |
|   · añadidas, compradores en serie | 1 | 71,1 % | 100 % | 0 % | n.d. % (0) |
|   · añadidas, compra única o sin historia | 2 | 48,0 % | 100 % | 0 % | 1,8 % (2) |
| Q2. Sin fondo de comercio solo en compra única | 22 | 43,9 % | 86 % | 9 % | 20,2 % (17) |
|   · añadidas por Q2 | 1 | 45,7 % | 100 % | 0 % | -2,1 % (1) |
| Comprar a 12 m sin filtro de calidad | 31 | 41,4 % | 74 % | 13 % | 11,3 % (22) |

### Diseño (116 cierres con ROIC y fondo de comercio)

| Estrategia | Compras | Rent. real 12 m | ≥ 15 % | < −10 % | Rent. real 3 a (anual; n) |
|---|--:|--:|--:|--:|--:|
| Q0. Publicado (vigente) | 22 | 43,9 % | 77 % | 5 % | 20,9 % (16) |
| Q1. Sin fondo de comercio siempre | 28 | 37,5 % | 71 % | 7 % | 17,1 % (18) |
|   · añadidas por Q1 (todas) | 6 | 11,9 % | 50 % | 17 % | -2,0 % (2) |
|   · añadidas, compradores en serie | 4 | 4,1 % | 50 % | 25 % | n.d. % (0) |
|   · añadidas, compra única o sin historia | 2 | 22,9 % | 50 % | 0 % | -2,0 % (2) |
| Q2. Sin fondo de comercio solo en compra única | 24 | 40,6 % | 75 % | 4 % | 17,1 % (18) |
|   · añadidas por Q2 | 2 | 22,9 % | 50 % | 0 % | -2,0 % (2) |
| Comprar a 12 m sin filtro de calidad | 33 | 37,3 % | 70 % | 6 % | 19,7 % (21) |

### Contexto: ¿predice algo cada medida de calidad? (todos los cierres)

| Todos los cierres según el filtro | Cierres | Rent. real 12 m | < −10 % |
|---|--:|--:|--:|
| Pasa calidad publicada | 154 | 14,7 % | 22 % |
| No pasa calidad publicada | 51 | 13,4 % | 25 % |
| Pasa calidad sin fondo de comercio | 182 | 14,7 % | 21 % |
| No pasa calidad sin fondo de comercio | 23 | 8,6 % | 35 % |
| Pasa sin f. de comercio y no publicada | 28 | 14,8 % | 18 % |
|   · de ellas, compradores en serie | 15 | 13,4 % | 20 % |
|   · de ellas, compra única | 12 | 16,3 % | 17 % |

### Las compras que añade el ROIC sin fondo de comercio (todos los cierres)

| Empresa | Cierre | ROIC publicado | ROIC sin f. de comercio | WACC | En serie | Rent. real 12 m |
|---|--:|--:|--:|--:|---|--:|
| SAP | 2023 | 8,5 % | 25,8 % | 9,3 % | sí | 71,1 % |
| DSV | 2020 | 12,7 % | 76,8 % | 8,0 % | sin historia | 50,3 % |
| ICON | 2022 | 5,6 % | 18,7 % | 10,1 % | no | 45,7 % |
| Amazon | 2023 | 16,1 % | 18,2 % | 12,1 % | sí | 44,4 % |
| VAT | 2019 | 11,7 % | 16,0 % | 8,1 % | no | 37,8 % |
| Waste Connections | 2023 | 8,1 % | 16,3 % | 7,8 % | sí | 15,7 % |
| CSL | 2023 | 13,6 % | 17,5 % | 8,9 % | no | 8,1 % |
| Stryker | 2021 | 10,3 % | 21,8 % | 9,3 % | sí | -7,5 % |
| Fielmann | 2023 | 10,7 % | 13,4 % | 7,7 % | sí | -12,5 % |

## Prueba 2: cíclicas, años de fondo de ciclo fuera de la historia del PER

### Solo cíclicas (189 cierres; 145 con algún año de fondo de ciclo)

| Estrategia | Sesgo pond. | Error pond. | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|
| Vigente (selector) | -9,1 % | 17,2 % | 63 | 35,9 % | 8,7 % | 71 % | 10 % |
| Sin años de fondo de ciclo, solo cíclicas | -9,4 % | 17,8 % | 59 | 35,9 % | 8,7 % | 73 % | 8 % |
| Sin años de fondo de ciclo, todas | -9,4 % | 17,8 % | 59 | 35,9 % | 8,7 % | 73 % | 8 % |

### Solo cíclicas, validación (77 cierres; 48 con algún año de fondo de ciclo)

| Estrategia | Sesgo pond. | Error pond. | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|
| Vigente (selector) | -4,9 % | 16,3 % | 30 | 35,8 % | 7,4 % | 70 % | 13 % |
| Sin años de fondo de ciclo, solo cíclicas | -4,9 % | 17,1 % | 27 | 35,7 % | 7,6 % | 70 % | 15 % |
| Sin años de fondo de ciclo, todas | -4,9 % | 17,1 % | 27 | 35,7 % | 7,6 % | 70 % | 15 % |

### Solo cíclicas, diseño (112 cierres; 97 con algún año de fondo de ciclo)

| Estrategia | Sesgo pond. | Error pond. | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|
| Vigente (selector) | -10,3 % | 17,5 % | 33 | 37,3 % | 11,4 % | 73 % | 6 % |
| Sin años de fondo de ciclo, solo cíclicas | -11,1 % | 18,1 % | 32 | 37,5 % | 10,8 % | 75 % | 3 % |
| Sin años de fondo de ciclo, todas | -11,1 % | 18,1 % | 32 | 37,5 % | 10,8 % | 75 % | 3 % |

### No cíclicas (26 cierres; 0 con algún año de fondo de ciclo)

| Estrategia | Sesgo pond. | Error pond. | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|
| Vigente (selector) | -14,3 % | 15,4 % | 6 | 42,4 % | 10,1 % | 83 % | 0 % |
| Sin años de fondo de ciclo, solo cíclicas | -14,3 % | 15,4 % | 6 | 42,4 % | 10,1 % | 83 % | 0 % |
| Sin años de fondo de ciclo, todas | -14,3 % | 15,4 % | 6 | 42,4 % | 10,1 % | 83 % | 0 % |

### Todos (215 cierres; 145 con algún año de fondo de ciclo)

| Estrategia | Sesgo pond. | Error pond. | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |
|---|--:|--:|--:|--:|--:|--:|--:|
| Vigente (selector) | -10,0 % | 17,2 % | 69 | 35,9 % | 8,7 % | 72 % | 9 % |
| Sin años de fondo de ciclo, solo cíclicas | -10,9 % | 17,6 % | 65 | 37,3 % | 8,7 % | 74 % | 8 % |
| Sin años de fondo de ciclo, todas | -10,9 % | 17,6 % | 65 | 37,3 % | 8,7 % | 74 % | 8 % |

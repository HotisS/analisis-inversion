# ¿Somos demasiado conservadores? Tres sesgos del método: protocolo fijado ANTES de mirar resultados (15-oct-2026, 11:55 UTC)

Origen: pregunta del usuario (15-oct) y notas `conservadurismo.md` de Auto Trader y Wolters Kluwer (hilo value, a1b8f1e y b324e18). Este archivo se sube al repo antes de ejecutar el backtest y no se cambia después.

## Datos

Los de `backtest-selector.mjs` (cierres, BPA real y BPA ingenuo; selector vigente: desrateada si mediana adelantada ≥ 1,8 × PER de hoy → v2; historia ≤ 3 años → la más baja; si no, v3 ×1,1). Mitades por ticker. BPA ingenuo decide; real como techo.

## Sesgo 1: en las desrateadas la v2 no depende del precio

En v2 el base es min(PER de hoy, mediana), así que en una desrateada el objetivo es PER de hoy × BPA futuro: la rentabilidad es el crecimiento del BPA + dividendo, al precio que sea (Wolters: 6,0 % a 72 y a 78 EUR). Variantes, solo en los cierres desrateados (≥ 1,8):

| Variante | Base del múltiplo |
|---|---|
| S0 vigente | v2: min(actual, mediana) |
| S1 v2 con tope ×1,1 | min(actual × 1,1, mediana): admite volver un 10 % del múltiplo |
| S2 v2 con tope ×1,2 | min(actual × 1,2, mediana) |
| S3 v3 ×1,1 sin selector | referencia (el 14-oct salió peor en desrateadas) |

Métricas: sesgo y error de la ponderada, compras, rentabilidad real mediana de las compras, % ≥ 15 %, % < −10 %. **Adopción**: S1 (o S2 si S1 no) si el error no empeora más de 0,5 puntos, la rentabilidad mediana de las compras no baja y el % < −10 % no sube más de 3 puntos, con el mismo signo en validación. Si no, se mantiene S0 y la desrateada solo se compra cuando el precio cae por debajo del límite (que es lo que hace hoy el objetivo fijo).

## Sesgo 2: el selector salta con el precio del día

Con el corte en 1,8, un 3 % de precio cambia de método y la rentabilidad salta de 11 a 22 % (Auto Trader). Variantes: **S4 mezcla continua**: peso de la v2 w = (ratio − 1,5) / 0,6 acotado a [0, 1]; ponderada y base = (1 − w) × v3 + w × v2. **S5 histéresis**: no se puede probar con cierres anuales (no hay historia del método por empresa); se mide en su lugar la **inestabilidad**: % de cierres en que la decisión Comprar cambia al mover el precio un ±5 %, con el selector vigente y con la mezcla. **Adopción** de S4: error de la ponderada no peor en más de 0,3 puntos, rentabilidad mediana de las compras no menor y % < −10 % no mayor que el vigente, con el mismo signo en validación, y menos inestabilidad.

## Sesgo 3: las recompras no anunciadas no se cuentan

El analista proyecta el beneficio y solo resta las acciones de las recompras anunciadas; en un recomprador en serie el BPA futuro queda corto. En el backtest, **recomprador en serie** = acciones diluidas que bajan ≥ 1 % en al menos 3 de los últimos 4 ejercicios conocidos en t. Proyecciones del BPA (ingenuo) a t+2 en esos cierres:

| Variante | BPA futuro |
|---|---|
| B0 como el analista | crecimiento mediano del **beneficio neto**, acciones constantes |
| B1 recompra entera | el mismo, más la reducción mediana anual de acciones |
| B2 recompra a la mitad | el mismo, más la mitad de esa reducción |
| B3 vigente del backtest | crecimiento mediano del BPA (lleva las recompras pasadas dentro) |

Métricas: error del BPA proyectado frente al real de t+2 (mediana del error absoluto y sesgo) y, con cada BPA en la regla vigente, compras, rentabilidad real mediana, % < −10 %. **Adopción** de B2 (o B1 si cumple y B2 no): error del BPA al menos 1 punto menor que B0, rentabilidad mediana de las compras no menor y % < −10 % no mayor, mismo signo en validación. Si se adopta, en los informes el BPA de los escenarios cuenta la recompra media de los últimos cuatro años con ese descuento, solo en recompradores en serie con política declarada, y se dice en la nota.

## Qué se explica en cualquier caso

Qué cambiaría en Auto Trader, Wolters Kluwer y las demás desrateadas vigentes con cada variante que se adopte (y con las que no, como dato).

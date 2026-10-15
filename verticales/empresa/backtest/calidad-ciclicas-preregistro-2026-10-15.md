# ROIC sin fondo de comercio y cíclicas: protocolo fijado ANTES de mirar resultados (15-oct-2026, 08:15 UTC)

Encargo del usuario (15-oct, 07:31: «ok pues a ello», a seguir mejorando el método con orden: cada cambio con backtest y protocolo fijado antes, aplicado todo junto en la revisión programada del domingo, §4.10). Este archivo se sube al repo **antes** de ejecutar el backtest y no se cambia después. Lo que se retoque tras ver los datos se dice y se trata como hipótesis nueva.

## Datos

Los de `backtest-selector.mjs` (cierres de ejercicio y BPA real de los informes del repo) más, por año, el ROIC que calcula el motor (`calc.rentabilidad`: NOPAT ÷ capital invertido medio) y el fondo de comercio del balance (`balance.historico`). El WACC es el del informe (no hay serie histórica; es el mismo para todos los años de una empresa). Observación = empresa × cierre t con ≥ 3 años de historia adelantada, precio t+1 y BPA t+2, y ROIC y fondo de comercio conocidos en t. A 12 meses decide la regla vigente (v3 ×1,1 con selector). BPA ingenuo como caso principal (el honesto) y real como techo. Mitades fijas por orden alfabético del ticker (pares diseño, impares validación), como siempre.

## Prueba 1: el filtro de calidad con el ROIC sin fondo de comercio

- **ROIC publicado** (el de hoy): NOPAT(t) ÷ capital invertido medio de t y t−1.
- **ROIC sin fondo de comercio**: NOPAT(t) ÷ (capital invertido medio − fondo de comercio medio de t y t−1). Si el capital así queda ≤ 0, no aplica (se usa el publicado).
- **Calidad** = ROIC − WACC ≥ 5 puntos (el filtro de compra vigente, §4.1), con uno u otro ROIC.
- **Comprador en serie** (conocido en t): el fondo de comercio ha subido más de un 5 % en al menos 3 de los años conocidos hasta t (hacen falta ≥ 4 años de fondo de comercio; con menos, «sin historia» y se trata como publicado). Lo demás es **compra única o sin compras**.

Estrategias, sobre los cierres en que la regla de 12 meses dice Comprar:

| Estrategia | Compra si |
|---|---|
| **Q0. Publicado (vigente)** | Comprar a 12 m y calidad con el ROIC publicado |
| **Q1. Sin fondo de comercio siempre** | Comprar a 12 m y calidad con el ROIC sin fondo de comercio |
| **Q2. Sin fondo de comercio solo en compra única** | Comprar a 12 m y (calidad publicada, o calidad sin fondo de comercio **y** no comprador en serie) |

Se mide de cada una: compras, rentabilidad real mediana a 12 meses (con dividendo), % con ≥ 15 %, % con < −10 %; y **las añadidas** (Q1 − Q0 y Q2 − Q0) por separado, divididas en compradores en serie y compra única. Además, como contexto, la rentabilidad real de todos los cierres según pasen o no cada filtro (¿alguna de las dos medidas de calidad predice algo?).

**Criterio de adopción**: las compras que añade Q2 tienen una rentabilidad real mediana no más de 3 puntos por debajo de las de Q0 y un % con < −10 % no más de 5 puntos por encima, en la muestra entera con BPA ingenuo, y sin cambiar de signo en la mitad de validación. Si se cumple, el filtro de compra pasa a ser Q2 (el ROIC sin fondo de comercio cuenta solo en compra única o sin compras; el comprador en serie sigue juzgándose por el publicado). Si las añadidas de los compradores en serie también cumplen, se dice, pero **no se adopta Q1**: el fondo de comercio de un comprador en serie es el precio de su crecimiento. Si no se cumple nada, el ROIC sin fondo de comercio queda como dato al lado del publicado (el motor lo calcula igual) sin peso en la decisión.

## Prueba 2: cíclicas

- **Cíclica en t** (solo con lo conocido en t, ≥ 4 años de BPA): el BPA máximo es ≥ 1,5 veces el mínimo, o hay una caída de más del 25 % de un año al siguiente.
- **Año de fondo de ciclo**: BPA(y) < 0,7 × mediana del BPA conocido en t. Se quita de la historia del PER (en base adelantada, se quita el cierre y−1, cuyo PER usa el BPA de y). Si quedan menos de 3 años, no se aplica.

Estrategias: vigente (selector); vigente quitando los años de fondo de ciclo **solo en cíclicas**; vigente quitándolos **en todas**. Métricas del selector: sesgo y error de la ponderada, compras, rentabilidad real mediana de las compras, % con ≥ 15 % y % con < −10 %; en todos los cierres y solo en cíclicas.

**Criterio de adopción**: en las cíclicas, error de la ponderada igual o menor (tolerancia +0,5), compras con rentabilidad mediana igual o mayor y % con < −10 % igual o menor que la vigente, en la muestra entera con BPA ingenuo; sin cambiar de signo en la mitad de validación ni empeorar en las no cíclicas (si se aplica a todas). Si se cumple solo en cíclicas, se adopta solo en cíclicas.

**Bajista sin doble castigo** (Epiroc): no se puede probar con cierres (el backtest no tiene BPA por escenario, y el hilo ya lo probó en toda la muestra el 14-oct: neutro). Hoy solo se **cuantifica** en los informes vigentes: cuántas cíclicas cambiarían de señal si el múltiplo del bajista fuera el del base (el BPA bajista ya lleva el ciclo). Sin backtest no se adopta; queda como propuesta con su efecto medido.

## Lo que no se prueba aquí

Sostenibilidad con reinversión pequeña y el campo `riesgos.ia` son cambios de motor y plantilla sin backtest posible: se implementan como dato y control, sin peso automático en la decisión, y se cuenta en cuántos informes el motor discreparía del analista.

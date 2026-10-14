# Selector de método: reglas fijadas ANTES de mirar resultados (14-oct-2026, 17:30 UTC)

Encargo del usuario (14-oct, 17:20: «diseñalo y backtestea, por que sean robustas tus afirmaciones»). En vez de decidir siempre con v3 ×1,1 y usar v2 de control, las pruebas de robustez eligen empresa por empresa qué valoración aplica. Este archivo se sube al repo **antes** de ejecutar el backtest (el commit lo fecha) y no se cambia después. Si alguna regla se retoca tras ver los datos, se dice y se trata como una hipótesis nueva, no como validada.

## Reglas del selector (en este orden; manda la primera que se cumple)

Todas se calculan con lo que se sabía en el cierre t (nunca con datos posteriores).

1. **BPA atípico en la historia** (caso Uber): un año y de la historia cuyo BPA salta más de ×1,5 o cae a menos de ÷1,5 frente al año anterior **y** frente al siguiente en el mismo sentido (pico o valle aislado) se quita de la historia del PER. Después se siguen aplicando las reglas 2-4 con la historia limpia.
2. **Desrateada** (casos Edenred, Intuit, Zoetis): si la mediana adelantada de 5 años es ≥ 1,8 × el PER actual adelantado, la historia es de otro régimen y no se supone que vuelva. Decide **v2** (base = el menor entre el actual y la mediana al cierre, que en la práctica es el actual).
3. **Historia corta** (casos ANYCOLOR, Bureau Veritas): con 3 años de historia adelantada, decide la **más baja** de v3 y v2 (ponderada y base de la misma regla).
4. **Resto**: **v3 ×1,1** (la vigente).

Fuera del selector, porque el backtest no lo puede medir: la divisa (es un dato, se corrige; CORREGIR), el doble castigo del bajista (el backtest no tiene BPA por escenario, y el hilo Mejoras ya lo probó: neutro), la confianza de datos y los resultados posteriores al informe (reglas de orden).

## Estrategias que se comparan

| Estrategia | Ponderada y base | Comprar |
|---|---|---|
| Siempre v3 | v3 ×1,1 | ponderada ≥ 15 % y base ≥ 12 % |
| Siempre v2 | v2 | igual |
| Solo robustas | la más baja de v3 y v2 | las dos dan Comprar |
| **Selector** | la regla que elige el selector | igual, con esa regla |

## Datos y validación

- Cierres de los informes del repo, como `motor/backtest-multiplos.mjs` (precio de cierre de cada ejercicio y BPA real; horizonte un año; objetivo = múltiplo × BPA de t+2). BPA real (error solo del múltiplo) y, como contraste, BPA ingenuo.
- **Mitad para validación**: las empresas se reparten en dos mitades fijas por el orden alfabético del ticker (posiciones pares = diseño, impares = validación). El selector no tiene parámetros que ajustar, así que la mitad de diseño solo sirve para ver si el resultado se repite. Además se da el corte temporal (prueba = horizonte 2022-2025).

## Criterio de adopción (fijado ahora)

El selector se adopta si en la **mitad de validación** cumple las tres cosas frente a «siempre v3»:
1. Error mediano de la ponderada igual o menor (tolerancia +0,5 puntos).
2. Las Comprar: rentabilidad real mediana igual o mayor y porcentaje con pérdida > 10 % igual o menor.
3. No empeora el sesgo absoluto de la ponderada en más de 2 puntos.

Y además no puede ser peor que «siempre v3» en las dos cosas a la vez (error y pérdidas de las Comprar) en la mitad de diseño, en el corte temporal ni con BPA ingenuo. Si una regla del selector por separado empeora y las demás no, se dice y se propone sin ella (eso ya es hipótesis nueva).

Métricas: sesgo y error de la ponderada y del base (mediana de predicho ÷ real − 1 y de su valor absoluto), número de Comprar, rentabilidad real mediana de las Comprar, % de Comprar con ≥ 15 % real y % con < −10 % real.

# Rentabilidad esperada a 3 años: protocolo fijado ANTES de mirar resultados (15-oct-2026, 07:40 UTC)

Encargo del usuario (15-oct, 07:12: «calcular la rentabilidad esperada a 3 años y tratar de ponderar eso en la decisión, ¿es buena o mala idea? hay oportunidades con mucho recorrido pero que esperamos flat a 12 m y quizás nos las estamos saltando»; «sí» a probarlo con backtest). Este archivo se sube al repo **antes** de ejecutar el backtest (el commit lo fecha) y no se cambia después. Si algo se retoca tras ver los datos, se dice y se trata como hipótesis nueva, no como validada.

## La cifra a 3 años (definición única)

Al cierre t, con lo que se sabía entonces:

- **Múltiplo a 3 años = mediana adelantada de 5 años** (PER = cierre del año ÷ BPA del año siguiente). A 12 meses la regla v3 solo supone media vuelta a la mediana, con tope ×1,1, porque un año no da para más; a 3 años se supone la vuelta entera. Sin techo ni suelo.
- **BPA a 3 años = BPA del ejercicio t+4** (el que el mercado mirará dentro de 3 años, misma base adelantada que a 12 meses, donde se usa t+2).
- **Rentabilidad a 3 años (anual)** = (múltiplo × BPA(t+4) ÷ precio t)^(1/3) − 1 + dividendos de t+1 a t+3 ÷ precio t ÷ 3.
- Variante de control: múltiplo = el menor entre el actual y la mediana (como la v2), para ver cuánto pesa suponer la vuelta entera.

BPA: **ingenuo** (el honesto: crecimiento mediano de la historia conocida en t, acotado entre −10 % y +25 % al año, aplicado desde el último BPA conocido) como caso principal, porque nadie sabe el BPA a cuatro años; **real** (previsión perfecta, error solo del múltiplo) como techo de lo que la cifra podría dar.

## Datos

Los mismos que `backtest-selector.mjs`: cierres de ejercicio y BPA real de los informes del repo. Observación = empresa × cierre t con al menos 3 años de historia adelantada en t, y con precio t+1 y BPA t+2 (para 12 meses) **y** precio t+3 y BPA t+4 (para 3 años). Todas las estrategias se comparan sobre la **misma muestra** (la que tiene las dos cosas). La cifra a 12 meses es la regla vigente (v3 ×1,1 con selector) calculada como en `backtest-selector.mjs`.

## Estrategias que se comparan

| Estrategia | Compra si |
|---|---|
| **A. Solo 12 m (vigente)** | ponderada 12 m ≥ 15 % y base 12 m ≥ 12 % |
| **B. 12 m o radar** | A, **o** base 12 m ≥ 0 % (plana pero no negativa) y rentabilidad anual a 3 años ≥ 15 % |
| **C. Solo 3 años** | rentabilidad anual a 3 años ≥ 15 % |
| **D. 12 m y 3 años** | A **y** rentabilidad anual a 3 años ≥ 10 % |

Lo que se mide de cada una: número de compras; rentabilidad real mediana a 12 meses y a 3 años (anual, con dividendos); % de compras con ≥ 10 % anual a 3 años; % de compras con pérdida a 3 años; lo mismo del resto de la muestra. Para B, además, las compras **añadidas** por el radar (B menos A) por separado: son las que de verdad contesta la pregunta.

## Validación

Mitades fijas por orden alfabético del ticker (pares = diseño, impares = validación), como en el selector; y corte temporal (t ≤ 2020 frente a t ≥ 2021). Sin parámetros que ajustar: las mitades solo dicen si el resultado se repite.

## Criterio de adopción (fijado ahora)

La cifra a 3 años entra en la decisión de compra solo si, **con BPA ingenuo y en la muestra entera**:

1. **Para el radar (B)**: las compras añadidas por el radar tienen una rentabilidad real mediana anual a 3 años **≥ 10 %** y no más de un **25 %** de ellas acaba en pérdida a 3 años; y su mediana no queda más de 3 puntos por debajo de la de las compras de A. Si se cumple, se propone usarla para **posiciones pequeñas** (la mitad del tamaño normal) cuando a 12 meses salga plana pero no negativa.
2. **Para el filtro (D)**: D mejora la mediana a 3 años de A en **≥ 3 puntos** sin quitar más de la mitad de las compras. Si se cumple, se propone como **desempate** (entre dos Comprar, antes la de mejor 3 años), nunca como veto.
3. **C sola** no se adopta en ningún caso (sustituiría el método vigente, que no es la pregunta).

Y en ningún caso se adopta si el resultado cambia de signo en la mitad de validación o en el corte temporal, o si con BPA real sale peor que con ingenuo (señal de que la cifra no mide nada). Si no se cumple nada, la cifra a 3 años queda como **dato informativo** en el informe y en el radar de seguimiento, sin peso en la decisión.

## El radar de seguimiento (independiente del backtest)

Con los informes de hoy: empresas que pasan calidad (sostenibilidad «Sí» y ROIC − WACC ≥ 5) con señal Mantener a 12 meses (ponderada entre −10 % y 15 %) y rentabilidad anual a 3 años ≥ 15 %. Para cada una, lo que la pasaría a Comprar: el precio (el límite de compra vigente, `comprar_por_debajo`) o el hecho (los próximos resultados, un margen o un crecimiento concreto que el informe ya nombra). La cifra a 3 años en los informes de hoy se calcula con el BPA del caso base del objetivo a 12 meses llevado dos años más con el crecimiento del EBIT del DCF del propio informe, y la mediana adelantada de 5 años del informe.

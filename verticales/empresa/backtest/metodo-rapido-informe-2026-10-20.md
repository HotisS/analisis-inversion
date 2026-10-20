# Backtest del método value rápido · informe (20-oct-2026)

**Es un estudio. No cambia el método vigente, ni la cartera, ni las listas.** Protocolo fijado antes de mirar los datos: `metodo-rapido-preregistro-2026-10-20.md` (commit 3d157d2). Tablas completas: `metodo-rapido-resultados-2026-10-20.md`. Script: `herramientas/backtest-metodo-rapido.mjs`.

## La fórmula rápida

Rentabilidad del caso base ≈ (1 + g) × (PER que permite la regla ÷ PER de hoy) + dividendo − 1, donde:
- g es el crecimiento del BPA de la propia empresa (la mediana de su historia, entre −10 % y +25 %);
- el PER que permite la regla es el de la v3: PER de hoy × √(PER mediano de 5 años ÷ PER de hoy), como mucho un 10 % arriba o abajo.

La ponderada es (escenario malo + 2 × base + bueno) ÷ 4. Después se aplican el selector v2/v3, la prueba del BPA −10 % y los niveles, igual que en la regla 16.

Cada decisión se toma **1 día hábil después de publicar las cuentas anuales**, con el precio de ese día y solo con las cifras publicadas hasta entonces. En EE. UU. son las cifras originales de la SEC con su fecha. Se mide la rentabilidad total a 12 meses frente al índice: el SPY en EE. UU. y el índice de su mercado en las demás.

**Muestra**:
- **EE. UU.**: 491 empresas del S&P 500 y 400 con 5.081 decisiones entre 2012 y 2025.
- **Las nuestras**: 183 empresas con informe, con 462 decisiones, casi todas de 2020-2025.

## Lo que sale (EE. UU., exceso frente al SPY)

| Grupo | Casos | Rentabilidad media | Exceso medio | Exceso mediano | Bate al índice | Pierde > 10 % |
|---|--:|--:|--:|--:|--:|--:|
| **A** | 153 | 21,5 % | **+5,9** | +0,9 | 52 % | 18 % |
| B1 | 109 | 19,0 % | +2,3 | −0,1 | 50 % | 16 % |
| B2 | 90 | 19,9 % | +3,1 | **−4,5** | 43 % | 24 % |
| C | 42 | 26,3 % | +11,1 | +2,0 | 55 % | 14 % |
| Buenos números, mala calidad | 465 | 15,3 % | +0,2 | −2,0 | 46 % | 21 % |
| Mantener | 1.030 | 15,5 % | −0,4 | −1,7 | 47 % | 17 % |
| Vender | 3.192 | 16,1 % | +2,0 | +0,4 | 51 % | 16 % |
| Todas | 5.081 | 16,3 % | +1,6 | −0,2 | 50 % | 17 % |

(El exceso va en puntos porcentuales frente al SPY.)

1. **Nivel A gana al índice, pero poco y sin seguridad.**
   - En media gana +5,9 puntos al año, +4,3 más que el conjunto de todas las empresas.
   - El intervalo del 90 % va de −0,3 a +9,6 puntos (remuestreo por empresa), así que casi es significativo, pero no del todo.
   - En mediana gana +0,9 puntos y bate al índice el 52 % de las veces. Ganó en 9 de los 14 años, y aguanta igual en las dos validaciones: +0,9 puntos de exceso mediano por empresas y +0,9 en 2019-2025.
2. **Lo que funciona es la calidad, no los números.**
   - Las empresas con números de A pero sin calidad quedan por debajo del índice: −3,2 puntos de mediana, y el 23 % pierde más de un 10 %.
   - Al exigirles la calidad completa pasan a +0,9 puntos.
   - La rentabilidad esperada por sí sola no distingue a las ganadoras.
3. **B1 rinde como el índice. B2 es el nivel flojo**: −4,5 puntos de mediana y −12,9 en 2019-2025. **C sale bien, pero son 42 casos**, con un intervalo enorme, así que no se puede fiar.
4. **«Vender» no rinde peor que «Mantener»**: +0,4 puntos frente a −1,7, también en las dos validaciones. Con la fórmula rápida, la señal de venta solo por los números no sirve. Esto apoya no vender solo porque baja la rentabilidad a 12 meses, sino con el análisis completo.
5. **Las nuestras** solo tienen números (sin calidad con fecha). La compra por números queda en −2,2 puntos de mediana frente a su índice, y el 32 % pierde más de un 10 %. La muestra es pequeña y casi toda de 2020-2025.
6. **Los sectores que fallan** son el inmobiliario (el BPA no sirve para las socimis), la energía y los materiales: con números de A pierden entre 10 y 17 puntos (son cíclicas, con el PER bajo en el pico).
   - Si se quitan esos tres, A pasa a +1,6 puntos de mediana y +7,1 de media.
   - **Es exploratorio, porque no estaba en el protocolo.**

## Mejoras probadas (fijadas antes)

| Variante | Exceso mediano, validación por empresas | Exceso mediano, 2019-2025 | Veredicto |
|---|--:|--:|---|
| Vigente (números A) | −2,2 | −7,3 | — |
| Umbral 20/15 | −6,0 | −3,5 | no pasa |
| Umbral 10/8 | −1,2 | −5,2 | pasa, pero gana poco y sigue bajo el índice |
| Tope ×1,0 | −6,1 | −8,1 | no pasa |
| Tope ×1,2 | −2,2 | −7,3 | igual (el tope casi nunca manda) |
| g máximo +15 % | +2,7 | +3,9 | pasa con solo 13 casos: no sirve |
| **Exigir calidad completa** | **+0,9** | **+0,9** | **pasa (ya está en el nivel A)** |
| El 20 % con más ponderada cada año | −2,1 | −3,2 | pasa por poco |

**Conclusión**: no hay que tocar ni los umbrales ni el tope. La mejora que de verdad cuenta es la que ya tenemos, la calidad exigente. Hay dos cosas que merecería probar un domingo con su propio protocolo:
- Apartar las inmobiliarias y las cíclicas del PER (energía y materiales), o valorarlas con otra medida.
- Dar a B2 un tope menor, o quitarlo.

## Si es robusto

- **A favor**:
  - Las reglas se fijaron antes de mirar.
  - Las fechas y las cifras son las del momento de la decisión (en EE. UU.).
  - Se validó por empresas y por años.
  - Son 5.081 decisiones.
- **Sesgo de supervivencia (no se quita)**: todas las empresas están hoy en el S&P, así que las rentabilidades absolutas salen infladas (todas +16,3 % al año). La comparación entre grupos y frente al índice es más fiable que las cifras absolutas.
- **Otros límites**:
  - El crecimiento «ingenuo» toca el tope de +25 % en el 20 % de los casos, y el método real usa el consenso.
  - La calidad es un sustituto: ROIC − 8 % ≥ 5 tres años seguidos. La sostenibilidad del informe no se puede reconstruir, y en los bancos es desconocida.
  - Solo 120 empresas del S&P 400 tenían su ficha de la SEC a mano.
  - Hay una decisión al año por empresa.
- **Frente al backtest de niveles de esta mañana** (A +26,6 %, 56 casos): aquel medía la rentabilidad absoluta al cierre del ejercicio. Aquí, con la fecha real y frente al índice, la ventaja es mucho menor.

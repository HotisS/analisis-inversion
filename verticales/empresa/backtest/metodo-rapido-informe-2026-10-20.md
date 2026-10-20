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
   - El intervalo del 90 % va de −0,3 a +9,6 puntos (remuestreo por empresa). Dicho en llano: si repitiéramos la prueba muchas veces con otras empresas parecidas, en unas 6 de cada 100 la ventaja de A saldría cero o negativa (p ≈ 0,06). El listón habitual es 5 de cada 100, así que casi llega, pero no del todo.
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

## Anexo (añadido el mismo día a petición del coordinador)

**Preregistro**: las reglas, los grupos, las mejoras y el criterio se fijaron en el commit 3d157d2 a las 16:21 UTC, antes de descargar los datos. Los resultados van en el commit 3d51351.

**Las empresas con informe**: hay 303, de las que 289 tienen símbolo de Yahoo. Con 183 de ellas salen 462 decisiones medibles. Las ≈520 del diseño contaban también las decisiones de 2025, que aún no tienen 12 meses, y las que no tienen precio diario de Yahoo. Muchas solo tienen 5 años de cuentas y necesitan 3 de historia del PER antes de cada decisión. Sin calidad con fecha, solo se miden por números (tabla 5 de los resultados).

**Lectura del ajuste frente a la validación**:
- **A aguanta en las cuatro partes**: entre +0,9 y +1,2 puntos de exceso mediano y entre +17,8 % y +20,6 % de rentabilidad mediana absoluta.
- **B2 queda por debajo del índice en las cuatro**, y sobre todo en 2019-2025 (−12,9).
- **B1 no es estable**: −5,4 en la mitad de ajuste y +1,6 en la de validación.
- **C tiene 15-27 casos por parte**, demasiado pocos.
- **Vender queda igual o por encima de Mantener en las cuatro partes.**

**Año a año**: A bate al SPY en 9 de 14 años. Sus peores años son 2014 (−15,5), 2019 (−10,3), 2015 (−10,1) y 2017 (−10,1). Mantener tiene su peor año en 2023 (−16,5), el año del rally de las grandes tecnológicas.

### Ajuste frente a validación (EE. UU.)

Cada celda: rentabilidad mediana absoluta · exceso mediano frente al SPY · casos.

| Grupo | Ajuste: mitad de empresas | Validación: otra mitad | Ajuste: 2012-2018 | Validación: 2019-2025 |
|---|--:|--:|--:|--:|
| A | +18,7 % · +1,2 · 69 | +20,6 % · +0,9 · 84 | +17,8 % · +1,1 · 76 | +19,9 % · +0,9 · 77 |
| B1 | +13,5 % · -5,4 · 54 | +14,7 % · +1,6 · 55 | +13,9 % · -0,1 · 43 | +15,0 % · -1,0 · 66 |
| B2 | +15,3 % · -2,8 · 39 | +12,2 % · -5,3 · 51 | +17,0 % · -0,7 · 36 | +5,5 % · -12,9 · 54 |
| C | +21,4 % · -2,9 · 20 | +15,4 % · +2,6 · 22 | +22,5 % · +2,5 · 15 | +17,5 % · +1,5 · 27 |
| Buenos números sin calidad | +13,4 % · -2,0 · 249 | +8,8 % · -1,8 · 216 | +16,1 % · +0,9 · 206 | +8,9 % · -5,5 · 259 |
| Mantener | +14,1 % · -1,4 · 540 | +11,4 % · -1,9 · 490 | +17,3 % · +2,3 · 348 | +11,4 % · -4,0 · 682 |
| Vender | +13,2 % · +0,6 · 1615 | +14,4 % · +0,2 · 1577 | +14,9 % · +2,1 · 1504 | +12,8 % · -2,0 · 1688 |
| Todas | +13,4 % · -0,1 · 2586 | +13,7 % · -0,4 · 2495 | +15,4 % · +1,9 · 2228 | +12,0 % · -2,8 · 2853 |

### Año a año (EE. UU.): A y Mantener

Rentabilidad mediana absoluta · exceso mediano frente al SPY · casos.

| Año de decisión | A | Mantener | SPY (mediana de las fechas) |
|---|--:|--:|--:|
| 2012 | +30,0 % · +4,0 · 7 | +21,4 % · +0,7 · 20 | +26,1 % |
| 2013 | +31,7 % · +7,9 · 14 | +21,8 % · -2,2 · 62 | +24,1 % |
| 2014 | -1,1 % · -15,5 · 10 | +10,0 % · +0,8 · 44 | +16,0 % |
| 2015 | -15,3 % · -10,1 · 6 | -2,5 % · +0,2 · 43 | -5,7 % |
| 2016 | +41,8 % · +19,1 · 13 | +25,5 % · +3,9 · 69 | +24,0 % |
| 2017 | +7,8 % · -10,1 · 9 | +23,5 % · +6,3 · 53 | +16,8 % |
| 2018 | +18,1 % · +9,4 · 17 | +12,2 % · +6,4 · 57 | +4,5 % |
| 2019 | +3,6 % · -10,3 · 17 | +10,0 % · -5,4 · 101 | +16,5 % |
| 2020 | +31,3 % · +10,0 · 9 | +23,1 % · -2,6 · 85 | +25,0 % |
| 2021 | +13,2 % · -5,2 · 9 | +16,1 % · +5,7 · 52 | +12,5 % |
| 2022 | +4,7 % · +4,7 · 17 | -0,8 % · +4,3 · 114 | -6,0 % |
| 2023 | +30,5 % · +1,3 · 16 | +8,8 % · -16,5 · 108 | +28,7 % |
| 2024 | +47,4 % · +24,4 · 3 | +14,1 % · -6,8 · 130 | +19,1 % |
| 2025 | +27,1 % · +9,9 · 6 | +11,5 % · -3,7 · 92 | +15,8 % |

### Cifras de apoyo para el domingo

- Números A en Real Estate: 92 casos, exceso mediano -10,3, pierden > 10 %: 23 %
- Números A en Energy: 34 casos, exceso mediano -17,5, pierden > 10 %: 38 %
- Números A en Materials: 28 casos, exceso mediano -13,0, pierden > 10 %: 29 %
- A sin esos tres sectores: 136 casos, exceso mediano +1,6, medio +7,1
- B2, Ajuste: mitad de empresas: 39 casos, exceso mediano -2,8
- B2, Validación: otra mitad: 51 casos, exceso mediano -5,3
- B2, Ajuste: 2012-2018: 36 casos, exceso mediano -0,7
- B2, Validación: 2019-2025: 54 casos, exceso mediano -12,9


## Prueba fuera de muestra: empresas que no cubrimos (añadida 20-oct, solo EE. UU.)

El usuario la pidió a las 16:33 UTC para descartar un sesgo de selección. Europa queda fuera por decisión suya: no hay BPA con fecha de publicación antes de 2021. El protocolo se fijó antes de bajar los datos (commit 41104bc, 16:34 UTC). Tablas: `metodo-rapido-resultados-2026-10-20-sp600-no-cubiertas.md`.

**1. La misma prueba sin las 69 empresas que cubrimos** (422 empresas del S&P 500 y 400, 4.278 decisiones; exceso frente al SPY, en puntos):

| Grupo | Casos | Media | Mediana | Exceso medio | Exceso mediano | Bate al SPY | Pierde > 10 % |
|---|--:|--:|--:|--:|--:|--:|--:|
| A | 130 | +19,7 % | +18,1 % | +4,2 | +0,5 | 51 % | 18 % |
| B1 | 92 | +18,8 % | +14,7 % | +1,7 | −1,0 | 49 % | 14 % |
| B2 | 79 | +17,7 % | +10,9 % | +1,3 | −6,9 | 39 % | 25 % |
| C | 36 | +25,5 % | +12,4 % | +10,6 | −2,9 | 47 % | 17 % |
| Buenos números sin calidad | 449 | +15,3 % | +11,9 % | +0,1 | −2,5 | 46 % | 22 % |
| Mantener | 882 | +14,4 % | +11,7 % | −1,3 | −3,1 | 45 % | 18 % |
| Vender | 2.610 | +15,0 % | +12,4 % | +1,0 | −0,8 | 48 % | 17 % |
| Todas | 4.278 | +15,2 % | +12,4 % | +0,6 | −1,4 | 47 % | 18 % |

A queda +3,6 puntos de media sobre «todas». El intervalo del 90 % va de −1,4 a +9,2, y en el 14 % de las repeticiones la ventaja sale cero o negativa. Sin nuestras empresas la ventaja es algo menor, pero el patrón se repite: lo que suma es la calidad, B2 es flojo y Vender no rinde peor que Mantener.

**2. 200 empresas al azar del S&P 600 que no cubrimos** (semilla fija). 155 dieron 1.324 decisiones; al resto le faltan 4 años de BPA o precio.

| Grupo | Casos | Media | Mediana | Exceso medio SPY | Exceso mediano SPY | Bate al SPY | Exceso medio S&P 600 (IJR) | Pierde > 10 % |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| A | 29 | +16,5 % | +11,3 % | +2,3 | −2,6 | 48 % | +8,0 | 34 % |
| B1 | 21 | +9,9 % | +0,4 % | −6,5 | −7,3 | 33 % | −1,2 | 33 % |
| B2 | 38 | +10,1 % | +1,4 % | −6,3 | −13,4 | 34 % | −2,7 | 26 % |
| C | 9 | +24,3 % | +38,2 % | +11,2 | +14,5 | 67 % | +21,9 | 33 % |
| Buenos números sin calidad | 132 | +13,7 % | +5,6 % | −2,5 | −7,2 | 44 % | +1,2 | 27 % |
| Mantener | 307 | +12,6 % | +9,0 % | −3,1 | −4,2 | 45 % | −0,3 | 28 % |
| Vender | 788 | +11,1 % | +5,7 % | −2,8 | −8,1 | 40 % | +0,9 | 24 % |
| Todas | 1.324 | +11,9 % | +6,1 % | −2,8 | −7,0 | 41 % | +0,8 | 26 % |

- **La dirección se repite**: A queda +5,1 puntos de media sobre «todas» (+7,2 frente al IJR). Pero con 29 casos el intervalo va de −8,8 a +17,8, así que no prueba nada.
- **El criterio fijado no se puede aplicar** porque pedía al menos 30 casos de A, y hay 29.
- **En las pequeñas, los buenos números sin calidad no ganan nada** sobre «todas» (+0,3).
- **Al revés que en las grandes, Vender sí rinde peor que Mantener** (−8,1 frente a −4,2 de exceso mediano).
- **B1 y B2 quedan claramente bajo el índice.**

**Conclusión**: con empresas que no elegimos, el resultado no cambia de signo: A y la calidad suman, y B2 resta. No parece que el resultado venga de haber elegido nosotros las empresas, aunque la muestra pequeña no da para más. El sesgo de supervivencia sigue igual, porque todas cotizan hoy.

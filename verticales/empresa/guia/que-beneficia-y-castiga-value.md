---
title: "Análisis value: qué lo beneficia y qué lo castiga"
subtitle: "Explicación del método vigente, pieza por pieza, con ejemplos reales"
date: "20 de octubre de 2026 (precios del cierre del 19-oct y sesión en curso del 20-oct)"
---

# Para qué sirve este documento

Explica, sin cambiar nada del método, qué hace subir o bajar las tres cifras que deciden en el análisis value: **la rentabilidad a 12 meses**, **el límite de compra** y **el valor real**. Todo sale del código que decide hoy (`motor/objetivo12m.mjs`, `motor/calcular-empresa.mjs`, `herramientas/robustez.mjs`) y de `METODO-VIGENTE.md`. Los ejemplos son Intuit, Zoetis, Uber, Edenred y TUI, con los precios de hoy y `robustez.mjs --actual`.

# 1. La idea en una línea

La rentabilidad a 12 meses del caso base es, casi exactamente:

> **Rentabilidad del base ≈ (BPA del ejercicio objetivo ÷ BPA del año que viene) × (PER que permite la regla ÷ PER de hoy) − 1 + dividendo**

Es decir, tres motores: **cuánto crece el beneficio por acción**, **cuánto múltiplo nos deja recuperar (o nos quita) la regla** y **el dividendo**. Todo lo demás (escenarios, valor real, calidad, pruebas) recorta o filtra, pero no suma.

Comprobación con los cinco ejemplos (cifras del informe, al precio del informe):

| Empresa | BPA objetivo ÷ BPA año que viene | PER regla ÷ PER hoy | Dividendo | Base calculado | Base del motor |
|---|---|---|---|---|---|
| TUI | 1,28 ÷ 0,97 = **+32 %** | 6,8 ÷ 6,9 = −2 % | 1,5 % | ≈ +30 % | +30,4 % |
| Edenred | 2,47 ÷ 2,21 = +12 % | 15,0 ÷ 13,6 = **+10 %** (tope) | 4,4 % | ≈ +27 % | +27,7 % |
| Uber | 4,30 ÷ 3,61 = +19 % | 19,8 ÷ 19,8 = 0 % | 0 % | ≈ +19 % | +19,1 % |
| Intuit | 23,10 ÷ 20,05 = +15 % | 15,1 ÷ 15,1 = 0 % | 1,6 % | ≈ +17 % | +16,8 % |
| Zoetis | 6,01 ÷ 5,80 = **+4 %** | 12,3 ÷ 12,3 = 0 % | 2,9 % | ≈ +7 % | +6,6 % |

Lectura: TUI vive del crecimiento del BPA; Edenred, del múltiplo que recupera más el dividendo; Zoetis apenas tiene motor (BPA casi plano y sin recuperación de múltiplo).

# 2. Pieza por pieza

## 2.1 El BPA de partida y su crecimiento (el motor que más pesa)

**Qué es.** El BPA propio de los tres escenarios para el **ejercicio objetivo**: el primero que cierra más de 18 meses después de la fecha del informe. Por eso la rentabilidad «a 12 meses» recoge en realidad **unos dos años de crecimiento del BPA** (el PER de hoy se mide sobre el BPA del año que viene; el objetivo, sobre el del siguiente).

**Lo sube.** Un BPA que crece mucho entre el año que viene y el ejercicio objetivo (TUI +32 %). Recompras de acciones, mejora de márgenes, rebote de un año malo.

**Lo baja.** BPA plano (Zoetis +4 %), un BPA propio prudente frente a la calle (Uber: nuestro 4,30 frente a 5,80 del consenso, −26 %), años con partidas fiscales que se normalizan (Uber 2024-2025: el BPA publicado se rebaja con un tipo normal del 25 %).

**Cuánto pesa.** Todo: cada punto de BPA mueve el objetivo un punto, en los tres escenarios a la vez. Es lo que mide la prueba del BPA −10 % (punto 2.9).

**Qué lo castiga más.** Un BPA que crece por encima del 25 % anual sin ser un rebote: marca **D6 CONFIANZA** y un Comprar baja a Mantener. Y un BPA propio por encima del consenso más de un 15 %: **D7**, la señal tiene que aguantar con el BPA de la calle.

## 2.2 El PER de salida (la regla de múltiplos)

**v3 (la vigente en general).** Base = PER de hoy × √(mediana de 5 años ÷ PER de hoy): recorre **la mitad del camino** hacia su mediana histórica (en PER adelantado), en los dos sentidos, **sin alejarse del PER de hoy más de ×1,1 ni menos de ÷1,1**.

- **Beneficia:** cotizar por debajo de su historia. Pero como mucho **+10 %** por múltiplo (Edenred: la mitad del camino de 13,6x a 21x sería 16,9x; el tope la deja en 15,0x).
- **Castiga:** cotizar por encima de su historia (le quita hasta un 10 %; TUI pierde un poco porque 6,9x está algo por encima de su mediana de 6,8x).

**El selector de método** decide empresa por empresa:

1. **Desrateada** (mediana de 5 años ≥ 1,8 veces el PER de hoy) → decide la **v2**: base = **el PER de hoy**, sin ninguna recuperación. Se supone que la historia es de otro régimen y no vuelve.
2. **Historia de 3 años o menos** → decide **la más baja** de v3 y v2.
3. El resto → v3 con tope ×1,1.

**Qué castiga más el selector.** A las que han caído mucho de múltiplo. **Intuit** (mediana 49x frente a 15x hoy, 3,3 veces) y **Zoetis** (36x frente a 12x) pasan a v2: cero recuperación. Con la v3 sin selector, Intuit daría hoy **+17,3 %** (Comprar); con la v2 que decide, **+6,5 %**. Uber (historia de 3 años) también queda en v2, con un alcista igual al base porque ni su historia útil ni los comparables pagan más.

**Bajista y alcista.**

- **Bajista v3** = el menor entre el mínimo de 5 años y base × 0,80. **v2**: mínimo de 5 años si es menor, si no base × 0,85.
- **Alcista v3** = el mayor entre media larga, mediana de 5 años y mediana de comparables, con **techo base × 1,35** (v2: × 1,30). Los comparables **solo pueden subir** el alcista, nunca bajarlo (Edenred, comparables a 9,5x, no le resta).

## 2.3 Los escenarios y sus probabilidades

**Qué es.** Objetivo ponderado = probabilidad × (PER del escenario × BPA del escenario), con las probabilidades del propio informe (25/50/25 por defecto).

**Lo baja.** El bajista castiga **dos veces**: BPA más bajo y PER más bajo a la vez. Por eso la ponderada suele quedar por debajo del base. Y unas probabilidades inclinadas a la baja: Zoetis 30/50/20 e Intuit 25/55/20 (con 25/50/25, Intuit pasaría de 6,5 % a 8,7 %).

**Lo sube.** Un alcista con recorrido (TUI: alcista 15,0 EUR, +122 %) y probabilidades simétricas.

**Qué lo castiga más.** El **doble castigo** cuando el BPA bajista ya es un 15 % o más inferior al base y además el PER bajista cae por debajo de base × 0,80. Lo marca **M4**: Edenred (BPA −23 % y PER 9,7x) y TUI (BPA −38 % y PER 5,2x). Sin doble castigo, Edenred subiría de 27,7 % a 31,4 %. Es una variante que se enseña, no decide.

## 2.4 El objetivo fijo y el precio de hoy

**Qué es.** El objetivo se calcula **una vez**, al precio del informe, y queda fijo. Con un precio nuevo solo se mueve la rentabilidad: rentabilidad = (objetivo + dividendo) ÷ precio de hoy − 1. Recalcular el objetivo exige una versión nueva del informe.

**Beneficia:** que el precio baje después del informe (la rentabilidad sube punto por punto). **Castiga:** que suba.

**Por qué es así.** En la v2 y en la v3 con tope, el base es el PER de hoy (o el de hoy × 1,1). Si se recalculase con cada precio, el objetivo subiría con la cotización y el límite de compra no limitaría nada (caso Nu, que dio pie a la regla). La prueba **M6** mide esa «elasticidad»: Intuit 1,03, Zoetis 1,00, Uber 0,96, Edenred 0,68, TUI 0,50.

**El sesgo que crea (ver 3.1).** En las desrateadas, el objetivo queda anclado al PER del día del informe, que es un día cualquiera.

## 2.5 El dividendo

Suma su rentabilidad por dividendo del informe (dividendo por acción fijo). Edenred +4,4 puntos, Zoetis +2,9, Intuit +1,6, TUI +1,5, Uber 0. Pesa poco salvo en empresas maduras, pero en Edenred es casi una sexta parte de la rentabilidad.

## 2.6 Las tres señales y el límite de compra

- **Comprar:** ponderada ≥ 15 %, base ≥ 12 % y valor real ≥ precio.
- **Mantener (filtro de cartera):** ponderada ≥ 10 %, base ≥ 5 % y valor real no más de un 15 % por debajo del precio.
- **Vender (regla del informe):** ponderada ≤ −10 %.

**Límite de compra** (con el objetivo fijo) = el menor de: (objetivo ponderado + dividendo) ÷ 1,15; (objetivo base + dividendo) ÷ 1,12; valor real. **Límite robusto** = el precio más alto al que además pasa la v2 de control y la compra con el BPA un 10 % peor. Ese es el que se usa para comprar a mercado.

## 2.7 El valor real (valor intrínseco)

**Qué es.** Una media ponderada de métodos de largo plazo, con los pesos que declara cada informe (no es un 60/40 fijo): DCF 40-55 %, escenarios del DCF 25-35 %, comparables 10-15 %, y a veces transacciones o suma de partes. Ejemplos: Intuit 55/15/5/25 (DCF, comparables, transacciones, escenarios); Edenred 55/10/35; Uber 40/15/30 más 15 de suma de partes.

**Lo sube:** WACC bajo, crecimiento a perpetuidad alto, márgenes que suben, comparables caros.
**Lo baja:** WACC alto (Uber 10,7 %), que la prueba de sostenibilidad falle (el DCF rebaja el base), comparables baratos.

**Cuánto pesa.** **No suma rentabilidad**: solo filtra. Para comprar, valor real ≥ precio; para mantener, ≥ 85 % del precio. Casi nunca muerde: TUI tiene un valor real de 19,26 EUR frente a 6,72 (aviso **V2**: el DCF va muy por encima del objetivo a 12 meses, la señal la da el objetivo). Donde más se acerca es en **Uber**: 73,59 USD frente a 69,96, a un 5 %.

## 2.8 La calidad

- **ROIC − WACC ≥ 5 puntos** para comprar o ampliar (cifras sin redondear). Para vender por calidad, por debajo de 4,5; entre 4,5 y 5 se mantiene sin ampliar.
- **Sostenibilidad del crecimiento «Sí»** para comprar. «En parte» no obliga a vender, pero **no se compra ni se amplía**. El motor da «En parte» si el capital nuevo tendría que rendir más de 1,25 veces lo histórico, si la cuota implícita supera 1,5 veces la actual, o si el crecimiento proyectado supera con holgura al histórico.
- Excepciones del usuario: LVMH, Fluidra y DSV.

**Cuánto pesa.** No cambia la rentabilidad: es un sí o un no. **Edenred** es el ejemplo: por números da Comprar (27,7 %), pero con sostenibilidad «En parte» la acción robusta baja a Mantener (marca **Q1**). Intuit también es «En parte».

## 2.9 La prueba del BPA −10 % (la que más compras tumba)

**Qué es.** Para que una compra sea robusta, tiene que seguir pasando (ponderada ≥ 15 % y base ≥ 12 %) con el BPA de los tres escenarios un 10 % peor.

**La cuenta que conviene recordar.** Con el objetivo fijo, quitar un 10 % al BPA quita un 10 % al objetivo. Así que la prueba sube el listón real de compra a:

> **ponderada ≥ 27,8 % y base ≥ 24,4 %** (porque 1,278 × 0,9 = 1,15 y 1,244 × 0,9 = 1,12; el dividendo ayuda un poco).

| Empresa | Ponderada hoy | Con BPA −10 % | ¿Pasa? |
|---|---|---|---|
| TUI | 37,3 % | 23,8 % | Sí (colchón de BPA del 15 %) |
| Edenred | 27,7 % | 15,4 % | Sí, por poco (colchón del 11 %) |
| Uber | 13,7 % | 2,3 % | No: con un BPA un 10 % peor ni siquiera llegaría al 10 % de mantener (colchón para mantener: 4 %) |

**Qué castiga.** A las de crecimiento modesto y a las que están cerca del umbral. **Qué beneficia.** A las de BPA que crece mucho, aunque son justo las que más dependen de acertar el BPA.

La prueba **solo se exige para comprar**. Uber pasa el filtro de mantener (13,7 % y 21,7 %) y se queda; no se compraría más.

## 2.10 Las otras pruebas de robustez

Pasan variantes razonables y se queda **la peor**. Las que más pesan:

- **v2 de control:** la compra robusta tiene que pasar con v3 y con v2. Edenred: v3 27,7 %, v2 15,0 %; su límite común lo marca la v2 (29,63 EUR).
- **Confianza:** confianza de datos «Baja» (V3), historia de 3 años o menos (M2; en Uber), BPA que crece más de un 25 % anual (D6) o precio que se ha movido más de un 15 % desde el informe (E3). Cualquiera de estas baja un Comprar a Mantener.
- **Datos:** precio de más de 4 días o en otra divisa (D1-D3, bloquean la señal).
- **Exclusiones del usuario** (X1).

## 2.11 Precio y noticias (regla 13)

No toca la rentabilidad ni el objetivo. Da un veredicto: **no cambia**, **retrasa** (solo un hecho pendiente ajeno al análisis que pueda mover el precio más de un 5 % en contra; los resultados cercanos **no** retrasan) o **descarta**. Con «retrasa» la acción robusta pasa a Esperar (C1); con «descarta», a Mantener (C2); sin el bloque, no hay orden (C3). Edenred y TUI: «no cambia». Los avisos de movimiento (P1-P5, por ejemplo Intuit y Zoetis, que cotizan un 18 % y un 22 % bajo su media de 200 sesiones) solo piden explicar la causa.

# 3. Sesgos conocidos

## 3.1 Objetivo fijado a un precio viejo: una subida puede dar una señal de venta falsa

En las desrateadas (v2) el base **es** el PER del día del informe. Ese día no tiene nada de especial: si el informe se hubiese hecho una semana después, con otro precio, el objetivo sería otro casi en la misma proporción (elasticidad ≈ 1).

| | Precio del informe | Precio de hoy | Ponderada con objetivo fijo | Si se rehiciera hoy (aprox.) |
|---|---|---|---|---|
| **Intuit** | 302,75 USD (10-oct) | 325,62 (+7,6 %) | **6,5 % → no pasa mantener** | ≈ 14-15 % → pasaría mantener |
| **Zoetis** | 71,33 USD (7-oct) | 79,59 (+11,6 %) | −5,4 % | ≈ 5 % → **tampoco** pasaría |

La columna «si se rehiciera hoy» es una aproximación con la elasticidad de la prueba M6, no una cifra del método.

**Conclusión.** En **Intuit** la señal de «no mantener» sale **casi entera del ancla**: el precio ha subido un 7,6 % y la rentabilidad cae 8 puntos (de 14,6 % a 6,5 %), sin que haya cambiado nada del negocio. En **Zoetis**, no: ya en el informe daba 5,6 %, por debajo del 10 %, por su BPA casi plano, sin recuperación de múltiplo y con escenarios inclinados a la baja. El método lo deja así a propósito (si no, el límite no limitaría) y la salida prevista es **una versión nueva del informe** cuando cambian los datos (resultados), no recalcular con el precio. La regla de no tocar lo comprado en 3 meses (regla 12) amortigua este sesgo mientras tanto.

El efecto contrario también existe: si el precio cae justo después del informe, la rentabilidad sube punto por punto y puede dar una compra que con un informe nuevo sería más floja.

## 3.2 Las desrateadas no recuperan nada de múltiplo

El selector manda a v2 a las que cotizan a menos de 1/1,8 de su mediana: base = PER de hoy. Es prudente (el backtest de 123 cierres lo apoya, pero esa parte se basa solo en 7 casos) y castiga a las que han caído por algo pasajero. Intuit: 17,3 % con v3 frente a 6,5 % con v2.

## 3.3 El tope de ×1,1 limita la recuperación

Aunque la historia diga que el múltiplo puede subir un 50 %, la regla solo da un 10 %. Protege de las trampas de valor y deja fuera parte de las recuperaciones de verdad (con el tope antiguo de ×1,3, Edenred daría 37,4 %).

## 3.4 Doble castigo en el bajista

Un bajista con BPA mucho más bajo **y** PER mínimo cuenta el mismo riesgo dos veces. Baja la ponderada de Edenred unos 4 puntos y algo la de TUI. Se ve como variante (M4), no decide.

## 3.5 La prueba del BPA −10 % sube el listón casi al doble

Del 15 % que se ve al ≈ 28 % real. Favorece a las de BPA muy creciente (TUI) frente a las estables, aunque las primeras tengan más riesgo de error en el propio BPA.

## 3.6 La «rentabilidad a 12 meses» lleva unos dos años de BPA

Como el ejercicio objetivo cierra más de 18 meses después del informe, beneficia a las que tienen mucho crecimiento por delante y deja la cifra muy expuesta a nuestro BPA propio (D6, D7).

## 3.7 Las probabilidades las pone el analista

Inclinar 5 puntos del alcista al bajista (Zoetis 30/50/20, Intuit 25/55/20) resta 2-3 puntos de ponderada.

## 3.8 Historia corta

Con 3 años o menos manda la más baja de v3 y v2 y además hay marca de confianza (Uber). Castiga a las empresas jóvenes o con años de pérdidas.

# 4. Resumen: qué beneficia y qué castiga

| Pieza | Beneficia (sube rentabilidad, límite o valor real) | Castiga | Peso |
|---|---|---|---|
| BPA del ejercicio objetivo | BPA que crece mucho en unos 2 años (TUI +32 %); recompras; rebote | BPA plano (Zoetis +4 %); BPA propio por debajo de la calle (Uber −26 %); normalizar impuestos | **El mayor**: 1 a 1 en el objetivo |
| PER base (v3) | Cotizar por debajo de su mediana (hasta +10 %, Edenred) | Cotizar por encima de su mediana (hasta −10 %) | Alto, con tope ±10 % |
| Selector | Historia limpia de más de 3 años y no desrateada | Desrateada → v2 sin recuperación (Intuit 17,3 % → 6,5 %); historia corta → la más baja (Uber) | Muy alto cuando salta |
| Bajista | Mínimo de 5 años cerca del base | Doble castigo, BPA y PER a la vez (Edenred, TUI) | Medio (25-30 % de peso) |
| Alcista | Media larga, mediana o comparables altos (techo ×1,35) | Sin historia ni comparables que paguen más: alcista = base (Uber) | Medio |
| Probabilidades | 25/50/25 o más alcista | Inclinarlas a la baja (Zoetis 30/50/20) | 2-3 puntos |
| Objetivo fijo y precio | Que el precio baje tras el informe | Que suba tras el informe (Intuit +7,6 % → −8 puntos); señal de venta que puede ser falsa en desrateadas | 1 a 1 en la rentabilidad |
| Dividendo | Dividendo alto (Edenred 4,4 %) | Sin dividendo (Uber) | Bajo, salvo en las maduras |
| Valor real | WACC bajo, crecimiento terminal alto, márgenes al alza | WACC alto (Uber, valor real solo un 5 % sobre el precio); sostenibilidad que falla | Solo filtra (≥ precio para comprar, ≥ 85 % para mantener) |
| Calidad | ROIC − WACC ≥ 5 y sostenibilidad «Sí» (TUI, Zoetis) | Sostenibilidad «En parte» (Edenred, Intuit): no se compra; ROIC − WACC < 4,5: se vende | Sí o no |
| BPA −10 % | Rentabilidad muy por encima del umbral (TUI 37 %) | Estar cerca: hace falta ≈ 28 % de ponderada y ≈ 24 % de base (Uber no aguanta) | Decide la compra robusta |
| v2 de control | Que las dos reglas coincidan (TUI 37 % y 33 %) | Que se separen: manda la más baja en el límite (Edenred 29,63) | Alto en el límite |
| Confianza y datos | Datos de fuente primaria, precio al día | Confianza «Baja», historia ≤ 3 años, BPA +25 %/año, precio movido > 15 % | Baja un Comprar a Mantener |
| Precio y noticias | Veredicto «no cambia» | «Retrasa» (Esperar) o «descarta» | Sí o no; no toca la cifra |

# 5. Las cinco empresas hoy

| Empresa | Precio | Ponderada / base | Regla | Acción robusta | Qué la decide |
|---|---|---|---|---|---|
| TUI | 6,72 EUR | 37,3 % / 30,9 % | v3 | **Comprar** (límite robusto 7,08) | BPA +32 % hasta FY2028; aguanta BPA −10 % (23,8 %) |
| Edenred | 29,64 EUR | 27,7 % / 29,5 % | v3 (v2 15,0 %) | Mantener | Pasa los números, pero sostenibilidad «En parte» (Q1); límite común 29,63 |
| Uber | 69,96 USD | 13,7 % / 21,7 % | v2 (historia 3 años) | Mantener | Pasa mantener; con BPA −10 % cae al 2,3 % |
| Intuit | 325,62 USD | 6,5 % / 8,6 % | v2 (desrateada) | No pasa mantener | Ancla del objetivo fijo (+7,6 % desde el informe) y sin recuperación de múltiplo |
| Zoetis | 79,59 USD | −5,4 % / −4,5 % | v2 (desrateada) | No pasa mantener | BPA casi plano, sin recuperación de múltiplo y escenarios 30/50/20; ya fallaba al precio del informe |

*Datos: `robustez.mjs --actual` del 20-oct-2026 con `precios.mjs` (cierre del 19-oct y sesión en curso del 20-oct en Europa). Los informes son Intuit 10-oct, Zoetis 7-oct, Uber 10-oct, Edenred 19-oct y TUI 19-oct. Este documento explica el método; no lo cambia ni propone órdenes.*

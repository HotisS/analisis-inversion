# Backtest growth: candidata v11 («ventas: la menor entre la mecánica y la del analista»)

## Definición, fijada antes de mirar resultados (14-oct-2026)

**v11 = v9 + tope de ventas del analista + «compra hasta» que respeta el bajista.**

1. **Ventas del ejercicio objetivo, escenario a escenario** (bajista, base, alcista): `mín(proyección mecánica de v9, valoracion.ventas_objetivo_m[escenario])` cuando la del analista existe (número > 0) para ese escenario; si no, la mecánica (= v9). Solo recorta, nunca sube. El consenso (`consenso_ventas_obj_m`) **no entra** en el cálculo (plantilla: consenso solo como contraste); solo dispara una alerta.
2. **Control de unidad.** Si la base del analista es menor que la mitad de la base mecánica, se supone que `ventas_objetivo_m` no está en la misma unidad que `mercado.ventas_12m_m` (algún informe escribió ahí EBITDA para esquivar el fallo latente de v1-v3, véase resultados-v10.md) y **no se usa** (v11 = v9 en esa empresa), con alerta.
3. **Margen en las valoradas por EBITDA (o beneficio)**: el margen implícito de hoy se aplica siempre a las ventas, sean mecánicas o del analista (en v1-v9, con ventas del analista no se aplicaba; desde v4 no se notaba porque la proyección era siempre mecánica). Sin margen objetivo (eso es v10, que v11 no incluye).
4. **«Compra hasta»**: además de ponderada ≥ 5 % y base ≥ 0 % (y el tope de EV/beneficio bruto), el precio al que el bajista llega al listón de compra (−50 %): `precio ≤ precio bajista ÷ (1 + (−50 − dividendo)/100)`. En v1-v10 el límite no comprobaba el bajista: se podía «comprar hasta» un precio al que el propio motor ya no daba Comprar.
5. Todo lo demás igual que v9: crecimiento de partida con el recorte por la guía, crecimiento NTM (`crecimiento_actual_pct`), rebaja por desaceleración, múltiplos, filtros, señal.

**Por qué (razón de negocio, no de caso):** la regla mecánica proyecta el pasado reciente; cuando la empresa ya ha dado una guía o el analista ha construido la proyección por productos (argenx, con el 36 % de la mecánica por encima de su propia proyección y del consenso), proyectar más que quien conoce el negocio es optimismo sin base. Tomar la menor es una regla de prudencia simétrica con v9 (que recorta con la guía): la mecánica sigue mandando cuando el analista es más optimista, para no dejar entrar el sesgo del analista.

**Regla de decisión (fijada aquí):** la de `metodo.md` §6 / `protocolo.md` §4 (mejor precisión de Comprar a 24 m en el ajuste, con al menos 5 compras; a igualdad, más exceso), y además, como en v10: (a) que no añada ninguna compra que quede por debajo del QQQ a 24 m, (b) que no quite ninguna que lo bata, (c) que la razón de negocio se sostenga. Si no cambia ninguna señal en el backtest, la decisión es de coherencia y se dice.

**Aviso fijado antes de calcular:** en los casos del backtest (`casos/`, `casos2/`, `casos3/`) `ventas_objetivo_m` va a `null` por diseño (LEEME.md: «así no entra lo que se supo después»). Si alguna proyección del analista apareciera en un caso, estaría escrita en 2026 con el resultado a la vista (sesgo retrospectivo) y no serviría para validar v11. Lo compruebo al correr.

## Resultados del backtest (14-oct-2026; script de comparación v9/v11 sobre `casos/`, `casos2/` y `casos3/`, sin escribir nada)

**Comprobación previa:** de los 84 casos (20 de la fase 1, 51 de la fase 2 y 13 industriales), **ninguno tiene `ventas_objetivo_m` ni `consenso_ventas_obj_m`** (todos `null`, como manda LEEME.md). No hay, por tanto, proyección «del analista» hecha con sesgo retrospectivo que contamine el backtest; pero, por la misma razón, **la parte central de v11 (el tope del analista) no actúa en ningún caso**: v11 = v9 en ventas, ponderada y señal por construcción. Lo único que cambia es el «compra hasta» (punto 4).

| Versión | Fase 1 (20 famosos): ganadoras / fracasos con Comprar | Ajuste 2019-21: compras, precisión | Validación 2023: compras, precisión | Las 51: compras, precisión (margen 95 %) | Industriales (`casos3`, 13): compras, baten al QQQ |
|---|---|---|---|---|---|
| v9 | 7/13 / 0/7 | 4, 100 % | 2, 50 % | 6, 83 % (44-97) | 2, 1 |
| v11 | 7/13 / 0/7 | 4, 100 % | 2, 50 % | 6, 83 % (44-97) | 2, 1 |

Exceso medio de las compras frente al QQQ a 24 m: igual (+371 pp en el ajuste, −15 pp en la validación, −21 pp en industriales). Peor compra: igual (Exact Sciences 2023, −36 %; Enphase 2023, −70 % en industriales).

**Casos que cambian de señal: ninguno.** Cambia el «compra hasta» en 20 casos (todos con el bajista cerca o por debajo de −50 %). En los tres que eran Comprar: Tesla 2019 (553 → 391 USD, precio 280), Shopify 2017 (74,3 → 69,6, precio 60) y Enphase 2023 (281 → 265, precio 210): el precio de compra queda por debajo del límite nuevo en los tres, así que ninguna compra desaparece. Con v9, en esos 20 casos el «compra hasta» llegaba a un precio al que el propio motor ya no habría dado Comprar.

### Las alertas en el backtest (información para v12, no cambian nada)

Sobre los 64 casos neutrales con resultado (fase 2 + industriales; 19 batieron al QQQ a 24 m, el 30 %):

| Alerta | Casos | Batieron al QQQ | Compras de v9 con la alerta | Lectura |
|---|---|---|---|---|
| Múltiplo de hoy > 2 × su mediana de 3 años | 7 | **0** | 0 | La más informativa: 0 de 7 (Invitae 2019 y 2021, PacBio, Roku, Teladoc, Tesla y Zillow 2021); en la fase 1, 3 de 4 eran fracasos (Palantir 2021, Peloton, Teladoc; la ganadora, Nvidia 2016). Con 7 casos la probabilidad de 0/7 por azar con un 30 % de base es ~8 %: indicio, no prueba. El método ya no compraba ninguno. |
| «Compra hasta» con bajista < −50 % (v9) | 17 | 3 | 2 (Tesla 2019 bate; Enphase 2023 no) | Es un fallo de coherencia del límite, no una predicción; v11 lo corrige. |
| Pagos en acciones > 15 % de las ventas | 16 | 4 (25 %) | 0 | Como la base (30 %): no separa. Se queda como aviso de calidad del FCF. |
| Sin guía anual de 12 meses | 52 | 11 | 5 | En el backtest casi nadie tiene la guía apuntada: es un aviso de datos, no de riesgo. |
| Exceso sobre la guía > 10 pp | 1 (+2 en fase 1) | 0 | 0 | Generac 2022 (fracaso); en la fase 1, Axon 2023 y Shopify 2017 (ganadoras). Sin muestra. |
| Mecánica > 1,2 × analista o consenso, ventas del analista en otra unidad, EBITDA sin `ebitda_ntm_m`, margen raro, métrica rara, clientes | 0-1 | — | — | No hay datos en los casos. |

## Efecto en los informes del 14-oct-2026 (sin escribir `calc`, que sigue en v9)

Ver la tabla del encargo en la respuesta de la sesión y `node motor/growth.mjs <datos.json> --version v11`. Cambian de señal tres: **Eli Lilly Comprar → Mantener** (ponderada +16,3 → −1,1 %; la mecánica, 129.600 M, va un 18 % por encima de la del informe, 109.900 M, porque el exceso sobre la guía de 12,6 pp casi anula el recorte de v9; el bajista pasa a −50,3 %), **Comfort Systems Mantener → Vender** (mecánica 21.650 M frente a 17.886 M del informe = consenso; ponderada −1,2 → −17,6 %) y **HubSpot pierde la vigilancia** (+2,7 → −0,4 %). Bajan mucho sin cambiar de señal: **argenx** (+45,7 → +11,4 %, compra hasta 1.134 → 867 USD), **Natera** (+21,8 → +8,1 %, 459 → 408) y **Nu** (+27,4 → +15,1 %, 18,9 → 16,6). En Rheinmetall y Spotify el informe escribió EBITDA en `ventas_objetivo_m`: el control de unidad lo detecta y v11 no lo usa (= v9).

## Lectura honesta y recomendación

1. **El backtest no puede validar ni rechazar v11.** No hay proyecciones del analista en los casos (a propósito: escribirlas hoy sería sesgo retrospectivo puro, porque sabríamos qué ventas hubo). Reconstruir el consenso de cada fecha de memoria tendría el mismo problema. La única prueba limpia es hacia delante: guardar v9 y v11 de cada informe y comparar a 12 y 24 meses.
2. **La razón de negocio sí se sostiene y es simétrica con v9.** v9 ya admite que la mecánica no debe proyectar más que la guía de la empresa; v11 extiende lo mismo a la proyección del propio informe (que se construye con la guía, los productos y el consenso). Solo recorta: no puede crear compras, solo quitarlas o bajar el límite. El riesgo es el contrario al de v9: que el analista sea demasiado prudente y deje fuera ganadoras que baten su propia guía año tras año (Natera, con +23 pp de exceso sobre la guía; Eli Lilly, +12,6 pp). Ahí es donde v11 más mueve y donde tiene más probabilidad de equivocarse.
3. **Dependencia nueva**: con v11 el resultado depende de un número que escribe el analista, no solo de datos. Para que no se convierta en una palanca, `ventas_objetivo_m` debe referirse a la misma ventana que la mecánica (dos años sobre los 12 meses de la fecha; varios informes usan el año natural 2028, seis meses más tarde, lo que favorece a la mecánica y hace a v11 algo menos dura) y estar justificada en el informe (guía, consenso, productos).
4. **Recomendación:** adoptar **ya** la corrección del «compra hasta» (punto 4): es coherencia pura, no cambia ninguna señal del backtest y evita límites de compra a los que el motor no compraría (Nu 18,9 → 16,6 por el bajista; Axon 528 → 476). Para el tope del analista, **adoptarlo como vigente solo con decisión explícita del usuario y como regla de prudencia, no como mejora demostrada**; mientras tanto, la alerta «mecánica > 1,2 × analista o consenso» (activa ya con v9) señala los casos donde v9 chirría (hoy: argenx y Comfort Systems; Natera por el consenso; Eli Lilly en el límite, 1,18×). Si se adopta, las tres señales que cambian (Eli Lilly, Comfort Systems, HubSpot) se explican en sus informes.

# Pruebas de robustez (paso obligatorio antes de dar una señal; 14-oct-2026)

**Por qué.** El 14-oct el usuario señaló varias empresas y en todas había un fallo: Uber (BPA inflado por créditos fiscales), Experian (precio en USD y no en GBp), la v3 (48 informes en el tope por medianas de PER de otra época), Edenred (bajista que castiga dos veces el mismo riesgo), Nu (objetivo que se movía con el precio) y Constellation (precio en CAD comparado con un objetivo en USD). Pidió que la decisión sea **defendible** y que el fallo se encuentre antes de que él lo señale. Estas pruebas buscan esos fallos en todos los informes y dicen cómo se trata cada caso. **No cambian el método** (es de `objetivo-12m.md` y `motor/objetivo12m.mjs`): recalculan con la misma función bajo variantes razonables.

**Cuándo.** En cada análisis nuevo (lista «Análisis terminado» de `/analiza-empresa` y paso 8 de `/analiza-growth`), en cada revisión de un informe y **antes de proponer o mantener una orden** (junto con la regla de precio actual).

```
node herramientas/robustez.mjs <carpeta> [<carpeta> …]       # value
node herramientas/robustez.mjs --todas --escribir             # todas → verticales/empresa/robustez.json
NODE_USE_ENV_PROXY=1 node herramientas/robustez-growth.mjs --precios [<carpeta> …] [--escribir]   # growth
```

## Tratamientos

| Tratamiento | Qué significa | Qué se hace |
|---|---|---|
| CORREGIR | El dato está mal (precio, divisa, fecha) | No se da señal hasta corregirlo |
| VARIANTE | El dato está bien, pero la regla no sirve para esta empresa | Decide la variante que dice la prueba |
| CONFIANZA | La cifra depende de algo poco firme | Un Comprar baja a Mantener (como la confianza «Baja») |
| AVISO | No cambia la señal | Se dice en la defensa |

**Veredicto.** SÓLIDA si todas las variantes razonables dan la misma acción (Comprar / Mantener en cartera / No mantener); FRÁGIL si alguna la cambia (se dice cuál); BLOQUEADA si hay un CORREGIR. La **acción robusta** es la peor de las variantes razonables, rebajada de Comprar a Mantener si hay una marca de CONFIANZA. Es la que se comunica y la que decide las órdenes. Variantes razonables: la vigente (v3 ×1,1 con el selector de método), la v3 sin selector, la v2 de control, la v3 con el tope anterior (×1,3), sin doble castigo en el bajista (v3 y v2), pesos 25/50/25 y el BPA del consenso cuando el nuestro va por encima. «BPA −10 %» y «precio ±5 %» miden el **colchón** y no cambian el veredicto. Todas se calculan con el **objetivo fijo** (el del precio del informe) y la rentabilidad al precio del día; M6 es la única que recalcula con el PER movido, para medir cuánto se movería el objetivo.

## Pruebas value (`herramientas/robustez.mjs`)

| Código | Prueba | Tratamiento | Caso que la originó |
|---|---|---|---|
| D1 | Precio del informe a más de un −20 % / +25 % del cierre de mercado, o fuera de su rango de 52 semanas | CORREGIR | Constellation |
| D2 | Esa diferencia coincide con un tipo de cambio o con peniques | CORREGIR | Experian |
| D3 | Precio con más de 4 días, o sin cierre en `precios.json` | CORREGIR / AVISO | Regla de precio actual |
| D4 | BPA real ≠ beneficio ÷ acciones (±15 %) | AVISO | — |
| D5 | Tipo efectivo < 8 %, beneficio neto > EBIT, o salto del BPA > 50 % sin salto del EBIT: BPA con partidas que no se repiten | VARIANTE (BPA normalizado; no usar la historia v3 construida con ese BPA) | Uber |
| D6 | Nuestro BPA base crece > 25 % al año desde el último real | CONFIANZA; AVISO si desde el BPA de los últimos doce meses crece ≤ 25 % (rebote ya visible en las cuentas) | Constellation, DSV; Neurocrine (rebote) |
| D7 | Nuestro BPA base a más de un 15 % del consenso | VARIANTE si vamos por encima (la señal debe aguantar con el del consenso); AVISO si vamos por debajo | — |
| M1 | Desrateada: mediana adelantada ≥ 1,8 × el PER de hoy (v3 en su tope) | VARIANTE: si la caída es de régimen (regulación, IA, competencia), decide v2 | Edenred, Intuit, Zoetis |
| M2 | Historia del PER de 3 años o menos (o sin historia útil) | CONFIANZA, salvo que v2 también dé Comprar | ANYCOLOR, Bureau Veritas, Uber |
| M3 | v3 y v2 a más de 15 puntos | VARIANTE: decide la más baja hasta revisar la historia a mano | — |
| M4 | Doble castigo: BPA bajista ≥ 15 % bajo el base y además PER bajista < 0,79 × el base | VARIANTE «sin doble castigo» (PER bajista = base × 0,80) | Edenred |
| M5 | La ponderada sale del alcista (base < 5 %) | CONFIANZA | — |
| M6 | El objetivo se mueve con el precio (elasticidad > 0,5): el base es el PER de hoy | AVISO: los límites se calculan con el **objetivo fijo**, nunca recalculando a otro precio | Nu |
| B1 | La variante «BPA −10 %» no pasa la compra (ponderada < 15 % o base < 12 %) | AVISO: no es compra robusta (regla 12: pasar v3 y v2, aguantar BPA −10 % y precio bajo el límite común); Comprar baja a Mantener | Viscofan (11,0 %), Hershey (8,1 %), Daiichi (base 8,8 %), UMG (6,2 %), Rai Way (base 11,1 %) |
| L1 | Precio por encima del límite común de compra (el menor de v3 y v2, objetivo fijo) | AVISO: Comprar baja a Mantener (regla 12) | — |
| V1 | Valor intrínseco > 15 % bajo el precio | AVISO (no pasa el filtro de mantener) | Hermès, Alphabet |
| V2 | DCF > 1,6 × el objetivo a 12 meses | AVISO (tesis a años o DCF optimista) | — |
| V3 | Confianza de datos «Baja» | CONFIANZA | Experian, Amadeus |
| E1 | Resultados publicados después del corte del informe | CONFIANZA hasta comprobarlos | LVMH (3T del 12-oct) |
| E2 | Resultados en los próximos 14 días | AVISO: comprobar la fecha y mirar lo publicado; **no aplaza la compra** (backtest 15-oct: esperar cuesta y pierde compras) | — |
| E3 | El precio se ha movido más de un 15 % desde el informe | CONFIANZA (revisar la tesis) | — |
| C1 | `bolsa.contexto.veredicto` = «retrasa» (regla 13: hecho pendiente ajeno al análisis que puede mover el precio > 5 %; los resultados cercanos no son motivo) | AVISO: la acción robusta pasa a **Esperar** con la condición (`espera`) | Rai Way (overhang del 15 % de RAI) |
| C2 | `bolsa.contexto.veredicto` = «descarta» | AVISO: Comprar pasa a Mantener hasta rehacer el informe | — |
| C3 | Sin bloque `bolsa.contexto` y la acción es Comprar | AVISO: no se propone la orden hasta rellenarlo (`movimiento.mjs` + noticias con veredicto) | informes anteriores al 15-oct |
| P1 | Subida fuerte: +25 % en un mes o +40 % en tres (`movimiento.json`) | AVISO: explicar la causa en `bolsa.contexto`; no cambia la señal (backtest 15-oct) | Paycom |
| P2 | A ≤ 5 % del máximo de 52 semanas tras subir ≥ 20 % en tres meses | AVISO (idem) | Interparfums |
| P3 | Caída fuerte: −20 % en un mes o −30 % en tres | AVISO (idem) | — |
| P4 | A ≤ 3 % del mínimo de 52 semanas | AVISO (idem) | Rai Way, OMA |
| P5 | ≥ 15 % por debajo de la media de 200 sesiones (tendencia bajista) | AVISO (idem) | Rai Way, Rollins |

Además, para cada empresa: **límite de compra y de mantener con el objetivo fijo, en la divisa del broker** (el informe puede llevar las cuentas en otra: Constellation USD/CAD, Experian USD/GBp), el mismo límite con v2 y el **colchón de BPA**: cuánto puede bajar nuestro BPA antes de perder la acción de hoy.

## Pruebas growth (`herramientas/robustez-growth.mjs`)

| Código | Prueba | Tratamiento |
|---|---|---|
| G1 | Precio de Yahoo (o divisa) frente al del informe | CORREGIR |
| G2 | Objetivo atado al precio | AVISO: el límite es el «precio máximo de compra» del informe con el objetivo fijo (caso Nu) |
| G3 | Proyección mecánica > 10 % sobre las ventas del propio informe o del consenso | VARIANTE: se comunica la rentabilidad menor. Si las ventas del analista no están en la misma unidad (< 0,6 o > 1,6 veces), AVISO para corregir el campo |
| G4 | Sin guía de la empresa (v9 = v7) | AVISO |
| G5 | Subida ≥ 100 % en 12 meses | CONFIANZA (peso pequeño; sin tramos, regla 11) |
| G6 | Bajista peor que −40 % | AVISO (peso pequeño, entero de una vez) |
| G7 | Margen bruto del 100 % (financiera) | AVISO (el filtro EV/beneficio bruto no aplica) |
| G8 | El DCF inverso descuenta más crecimiento que el nuestro | CONFIANZA |
| G9 | Comprar con convicción baja | AVISO |
| G10 | `contexto_mercado.veredicto` «retrasa» → **Esperar** con la condición; «descarta» → Mantener; sin bloque con señal Comprar → no se propone la orden (regla 13) | AVISO |
| G11 | Con `--precios`: avisos P1-P5 de `movimiento.mjs` (explicar la causa en `contexto_mercado`; no cambian la señal) | AVISO |

Variantes growth: v9, v7, ventas del analista, pesos 25/50/25 y 35/50/15 (este último y el precio de hoy, solo para medir el colchón).

## Lo que no se automatiza (va en la defensa escrita)

Riesgo de IA sobre el negocio, regulación pendiente, ciclo y calidad (ROIC − WACC a mano cuando el capital invertido es negativo: Booking, ANYCOLOR, CTS Eventim, Edenred). Para cada empresa de la cartera o de una orden: **las dos o tres objeciones más fuertes y por qué la decisión se sostiene o cambia**.

# Cola growth (de 4 en 4)

Solo growth (la value es `cola.md`). Método vigente **v9** (`verticales/growth/metodo.md`; v7 como referencia). Antes de proponer una empresa se comprueba que no tenga informe value (`informes/`) ni growth (`informes-growth/`). Resumen de todas las analizadas: `informes-growth/resumen.md`. Cartera y suplentes: `informes-growth/cartera-growth.md`.

## Pendiente

| Qué | Estado |
|---|---|
| Tanda 8: Eli Lilly (LLY), Boston Scientific (BSX), Monolithic Power (MPWR), Comfort Systems (FIX) | En marcha (14-oct, 16:55) |
| Backtest del margen EBITDA objetivo en industriales (candidata v10) | En marcha (14-oct, 16:55) |
| Revisar Wise con su actualización del 2T | 15-oct; si sube a convicción media, se propone como sustituta |

Hecho el 14-oct: tandas 1 a 7 (28 empresas growth), backtest de la v9 (adoptada) y regla de revisión de precio con el objetivo fijo. El detalle está en git y en `verticales/growth/metodo.md` §7.

## Cómo se hace una tanda

1. `git pull`. Un subagente por empresa, las 4 en paralelo. Cada uno lee `verticales/growth/metodo.md`, `plantilla.md` (con los campos de guía) y `.claude/commands/analiza-growth.md`; investiga con fuentes primarias (SEC, resultados), precio de cierre en dos fuentes y precio actual con hora, las 8 señales, foros y riesgo de IA; escribe `datos.json` (con `guia_12m_pct` y `exceso_guia_pp`), ejecuta `node motor/growth.mjs` y escribe `informe.md`. No hace git. Nunca datos personales del usuario en consultas.
2. Al acabar: `node motor/growth.mjs --todos`; Word y PDF (`pandoc` y `soffice --headless --convert-to pdf`); PDF también en la carpeta del proyecto; precios revisados con el objetivo fijo; `cartera-growth.md` y la sección growth de las órdenes al día; commit, `git pull --rebase` y push.
3. Entrega única: tabla (puntos, señales, ponderada/base, señal, compra hasta), una línea de por qué y de riesgo, encaje (con el bolsillo lleno, solo sustituciones), mejoras de método y la lista de la tanda siguiente.

## Mejoras del método por probar con backtest

Se prueban con `herramientas/growth-backtest*.mjs` y se apuntan en `metodo.md` §7; se adoptan si mejoran, con la versión anterior al lado.

- **Valoración de industriales y rentables:** margen EBITDA objetivo (`margen_ebitda_obj_pct`; Siemens Energy, Celestica, GE Vernova) y `ebitda_ntm_m` para no escribir el múltiplo a mano (en prueba, v10); tope propio por EV/EBITDA o PER cuando el de 35x beneficio bruto no filtra (Celestica, Wise, Arista); modo para bancos (Nu: PER o P/VC frente a ROE, morosidad, CET1) y campo `tipo_multiplo`.
- **Proyección:** guía orgánica si una compra aporta > 3 pp (Zscaler, GE Vernova, DoorDash); pasar a ventas una guía dada en otra métrica (Toast, DoorDash) y anualizar la trimestral cuando no hay anual; `guia_12m_pct` con lo que queda del ejercicio y la tasa de salida, y exceso sobre la guía reciente si la serie baja (Insulet); guía firme como suelo si cumple siempre (Celestica); en pagos en bruto, crecimiento y regla del 40 sobre beneficio bruto (Shopify, Toast); `dilucion_esperada_pct` aparte de la ya en caja (Rocket Lab, Celestica).
- **Riesgo y probabilidades (35/50/15):** salida del consejero delegado o de dos altos directivos en 3 meses (MongoDB); dos clientes > 40 % de las ventas (Arista); investigación penal o de supervisor abierta (Wise); riesgo de sustitución tecnológica con retención, altas y ARR nuevo cayendo a la vez (HubSpot); «desaceleración fuerte» de tesis rota en cifras, separando la anunciada de la sorpresa (Duolingo).
- **Puntuación y señales:** regla del 40 con FCF menos pagos en acciones si superan el 10-15 % de las ventas (Datadog, Duolingo, Snowflake); euforia también a 6 meses (Datadog); bajista acotado por la mediana de 3 años si el múltiplo de hoy la dobla (Natera); comparables solo con fuente del día o con tope (MongoDB); revisiones basadas en estimaciones, no en precios objetivo (Nu); margen bruto del negocio recurrente en empresas mixtas (Axon).

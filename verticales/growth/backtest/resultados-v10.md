# Backtest growth: candidata v10 («margen EBITDA objetivo»)

## Definición, fijada antes de mirar resultados (14-oct-2026)

**v10 = v9 + margen EBITDA objetivo** en las empresas valoradas por EV/EBITDA (industriales y fabricantes de margen bajo).

- Hasta v9, si la métrica es EBITDA, el código pasa el múltiplo de EBITDA a ventas con el margen EBITDA implícito de hoy, `margenImpl = (EV/ventas NTM) ÷ (EV/EBITDA NTM)`, y lo deja **congelado** en los tres escenarios. En un industrial que está subiendo margen (Vertiv, GE Vernova, Siemens Energy) eso infravalora el objetivo; en uno que lo pierde, lo sobrevalora.
- v10: si la métrica es EBITDA y hay `valoracion.margen_ebitda_obj_pct` (margen EBITDA del ejercicio objetivo según la guía o los objetivos públicos a medio plazo de la empresa), el precio de cada escenario es ventas × margen × múltiplo de EBITDA con
  - bajista: margen de hoy (`margenImpl`);
  - base: media entre el de hoy y el objetivo;
  - alcista: el objetivo.
  Sin `margen_ebitda_obj_pct` (`null`), igual que v9. Múltiplos, proyección de ventas (mecánica con el recorte de la guía de v9), filtros y señal, igual que v9.
- **Campo opcional `valoracion.ebitda_ntm_m`** (EBITDA ajustado de los 12 meses siguientes): en v10, si existe, `multiplo_actual = EV / ebitda_ntm_m` (el múltiplo deja de escribirse a mano) y el margen de hoy sale de él: `ebitda_ntm_m ÷ ventas NTM`. v1-v9 no lo leen.
- **Fallo latente corregido en v10**: hasta v9, con ventas del analista (`ventas_objetivo_m`) y métrica EBITDA, `margenImpl` vale 1 y el precio multiplica el múltiplo de EBITDA por las **ventas** (objetivo inflado varias veces). Desde v4 no se nota porque la proyección es siempre mecánica (`forzar_mecanica`), pero v1-v3 lo tienen, y por eso algún informe (Rheinmetall) escribió EBITDA en `ventas_objetivo_m` para esquivarlo. En v10 el margen se aplica también a las ventas del analista. v1-v9 no se tocan (el backtest de las versiones viejas debe dar lo mismo).

### Cómo se rellena `margen_ebitda_obj_pct` (fijado antes de buscar los datos)

1. Objetivo a medio plazo publicado **antes de la fecha** (día del inversor, plan estratégico) en margen EBITDA ajustado → punto medio del rango.
2. Si el objetivo está en margen operativo/EBITA ajustado → se suma la amortización (D&A sin amortización de intangibles de compras si el ajustado la excluye) sobre ventas del último ejercicio cerrado.
3. Si el año del objetivo es posterior al ejercicio objetivo del caso (fecha + 2 años) en más de un año, se interpola en línea recta entre el margen de hoy (año 1) y el objetivo en su año. Si es igual, anterior o un año después, el objetivo tal cual.
4. Sin objetivo a medio plazo: margen implícito de la guía del ejercicio en curso o siguiente si ya existe. Sin nada: `null` (= v9).
5. Nunca el consenso. Lo de memoria se marca «[mem.]».

`ebitda_ntm_m` en el backtest: EBITDA ajustado guiado por la empresa para el ejercicio en curso (punto medio) si el ejercicio acaba al menos 6 meses después de la fecha; si no, el del ejercicio siguiente si ya hay guía; si no hay guía de EBITDA, EBITDA ajustado de los últimos 12 meses × (1 + `crecimiento_actual_pct`). En los casos de `casos3/` `multiplo_actual` se pone igual a EV / `ebitda_ntm_m`, para que v9 y v10 partan del mismo margen de hoy y la única diferencia sea el margen objetivo.

### Muestra y vara de medir (fijadas antes de ver resultados)

- En `casos/` y `casos2/` solo **un caso** usa EV/EBITDA (Rheinmetall 2022-03): el backtest existente **no puede validar v10**. Se monta `casos3/` con industriales y fabricantes «growth» valorados por EBITDA, con lista y fechas fijadas aquí:
  - Ganadoras conocidas (propuestas por el encargo; **sesgo de supervivencia evidente**): Vertiv 31-mar-2023, Celestica 31-mar-2023, Comfort Systems 31-mar-2023, Jabil 31-mar-2023, Siemens Energy 31-mar-2023, Eaton 31-mar-2022, GE Vernova 30-abr-2024 (primer fin de mes tras la escisión del 2-abr-2024).
  - Contrapeso de la misma familia (industriales de energía y equipos con objetivos públicos de margen que acabaron mal o regular): Generac 31-mar-2022, SolarEdge 31-mar-2023, Enphase 31-mar-2023, Array Technologies 31-mar-2023, Vestas 31-mar-2022.
- Horizonte principal 24 meses (secundario 12), **frente al Nasdaq-100 (QQQ)** como dice `protocolo.md`; se da también el S&P 500 (SPY) porque es la vara natural de un industrial. Precios de cierre ajustados por splits, sin dividendos.
- Medidas: compras, precisión de Comprar (bate al QQQ a 24 m), exceso medio de las compras, acierto total, y los casos que cambian de señal entre v9 y v10.
- Regla de decisión: con menos de ~15 casos no hay estadística; v10 se recomienda solo si (a) no añade ninguna compra que quede por debajo del QQQ a 24 meses, (b) no quita ninguna compra que lo bata y (c) la razón de negocio se sostiene. Si no cambia ninguna señal, es neutra y la decisión es de coherencia (como v9), no de resultados.

Añadido al rellenar los datos, **antes de calcular ningún resultado**: un objetivo sin año («a medio plazo», «a largo plazo») se toma a 4 años de su publicación (punto medio del medio plazo habitual de 3-5 años). Afecta a Siemens Energy y Vestas.

## Datos (`casos3/`, 13 casos)

12 casos nuevos más Rheinmetall 2022-03 copiado de `casos/` (con resultado a 24 meses, `ebitda_ntm_m` y margen objetivo). Precios y resultados: cierres de Yahoo Finance. Cuentas de EE. UU.: XBRL de la SEC (companyfacts) presentado antes de cada fecha. Guías: 8-K de resultados (Vertiv, Array, Generac, Jabil) y comunicados (GE Vernova, Celestica, Siemens Energy). **Mucho va de memoria y está marcado en cada caso** (`fuentes`, `nota_margen_obj`, `nota_ebitda_ntm`): sobre todo los objetivos de margen de Vertiv (16 % de margen operativo ajustado, año dudoso), Eaton (21-22 % de margen de segmentos en 2025), Rheinmetall (~12 % hacia 2025) y Vestas (EBIT del 10 %), y casi todo Siemens Energy y Vestas, que no presentan en la SEC. Las señales 2-4 se calculan con los precios (la 4 es aproximada); el resto, juicio con lo que se sabía.

Solo 6 de los 13 tienen objetivo de margen publicado (Vertiv, Siemens Energy, Eaton, GE Vernova, Vestas, Rheinmetall); en los otros 7 v10 es idéntica a v9 por construcción (Celestica, Comfort Systems, Jabil, Generac, SolarEdge, Enphase y Array solo daban guía del año o trimestral).

## Resultados (`node herramientas/growth-backtest3.mjs`)

| Caso | Tipo | Punt. | Señales | Margen EBITDA hoy → objetivo | v9: ponderada / base / alcista | v9 | v10: ponderada / base / alcista | v10 | 24 m | QQQ 24 m | SPY 24 m |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Array Technologies 2023-03 | fracaso | 74.7 | 8 | +13,5 % → — | -4,4 / -10,4 / +68,7 % | Mantener | -4,4 / -10,4 / +68,7 % | Mantener | -77,7 % | +46,1 % | +36,6 % |
| Celestica 2023-03 | ganadora | 59.7 | 4 | +7 % → — | +32,9 / +25,7 / +120,9 % | Mantener | +32,9 / +25,7 / +120,9 % | Mantener | +510,9 % | +46,1 % | +36,6 % |
| Comfort Systems USA 2023-03 | ganadora | 62 | 4 | +8,1 % → — | +7,4 / +10,4 / +56,6 % | Comprar | +7,4 / +10,4 / +56,6 % | Comprar | +120,8 % | +46,1 % | +36,6 % |
| Eaton 2022-03 | ganadora | 39 | 0 | +23,8 % → +24,7 % | -16 / -13,5 / +16,9 % | Vender | -13,8 / -11,6 / +21,8 % | Vender | +106 % | +22,5 % | +15,8 % |
| Enphase Energy 2023-03 | fracaso | 78.3 | 2 | +33 % → — | +63,1 / +53,8 / +181,6 % | Comprar | +63,1 / +53,8 / +181,6 % | Comprar | -70,5 % | +46,1 % | +36,6 % |
| GE Vernova 2024-04 | ganadora | 52.7 | 6 | +6,1 % → +8 % | +0,3 / +2,7 / +32,8 % | Mantener | +17,7 / +17,7 / +72,3 % | Mantener | +604,9 % | +57,3 % | +43,2 % |
| Generac 2022-03 | fracaso | 55 | 0 | +23 % → — | -3,1 / -8,5 / +65,2 % | Mantener | -3,1 / -8,5 / +65,2 % | Mantener | -57,6 % | +22,5 % | +15,8 % |
| Jabil 2023-03 | ganadora | 52.7 | 4 | +7,8 % → — | -0,9 / -0,2 / +40,2 % | Mantener | -0,6 / -0,2 / +41,6 % | Mantener | +54,3 % | +46,1 % | +36,6 % |
| Rheinmetall 2022-03 | ganadora | 55 | 6 | +15,3 % → +16,5 % | +2,3 / +5 / +39,9 % | Mantener | +7,2 / +9,3 / +51,2 % | Mantener | +195,6 % | +32,2 % | +19,6 % |
| Siemens Energy 2023-03 | ganadora | 50.7 | 4 | +7,1 % → +12,1 % | +0,5 / +2,6 / +37,7 % | Mantener | +43,3 / +39,5 / +135,6 % | Mantener | +166 % | +46,1 % | +36,6 % |
| SolarEdge 2023-03 | fracaso | 75.5 | 5 | +12,2 % → — | +18,7 / +12,2 / +102,7 % | Mantener | +18,7 / +12,2 / +102,7 % | Mantener | -94,7 % | +46,1 % | +36,6 % |
| Vertiv 2023-03 | ganadora | 56.2 | 7 | +13 % → +17,3 % | -10,2 / -17,6 / +77,5 % | Vender | +20,9 / +5,7 / +155,7 % | Mantener ← | +404,5 % | +46,1 % | +36,6 % |
| Vestas Wind Systems 2022-03 | fracaso | 38.3 | 2 | +9,3 % → +17,3 % | -2,2 / +0,2 / +30,3 % | Vender | +46,6 / +42,6 / +140,8 % | Vender | -3,4 % | +22,5 % | +15,8 % |

| Versión | Compras | Baten al QQQ a 24 m | Baten al SPY a 24 m | Exceso medio de las compras vs QQQ | Acierto total (vs QQQ) | Peor compra |
|---|---|---|---|---|---|---|
| v9 | 2/13 | 1/2 | 1/2 | -21 pp | 5/13 | -70,5 % |
| v10 | 2/13 | 1/2 | 1/2 | -21 pp | 5/13 | -70,5 % |

(← = cambia de señal. Rentabilidades sin dividendos.)

## Casos que cambian de señal

- **Vertiv 2023-03: Vender → Mantener.** Con el margen congelado (13,0 %), v9 sale con ponderada −10 % y vende; con el margen hacia el objetivo (17,3 %) la ponderada pasa a +21 %. No llega a Comprar porque la puntuación es 56 (< 60), la pista de caja es de 12 meses (FCF negativo en 2022 por circulante) y el bajista es peor que −50 %. Hizo +404 % a 24 meses. Va en la dirección buena, pero no cambia ninguna compra.
- Ningún otro. v10 sube mucho la ponderada de Siemens Energy (+0,5 → +43 %), GE Vernova (+0,3 → +18 %), Rheinmetall (+2 → +7 %) y **Vestas (−2 → +47 %)**, pero todas se quedan fuera por la puntuación (< 60), que en estos industriales es el filtro que manda (margen bruto bajo, crecimiento modesto, pocas señales).

Compras: las mismas en v9 y v10 (Comfort Systems, +121 %, bate; Enphase, −70 %, no bate): precisión 1 de 2 y exceso medio −21 pp frente al QQQ en las dos versiones.

## Lectura honesta y recomendación

1. **La muestra no valida v10.** 13 casos, 6 con objetivo de margen y un solo cambio de señal (que no es una compra). No hay diferencia medible entre v9 y v10 en las medidas del protocolo, y con esta muestra no la puede haber: haría falta del orden de 30-50 industriales con objetivos de margen publicados, elegidos sin saber cómo acabaron. La lista de ganadoras la propuso el encargo sabiendo el final (sesgo de supervivencia); el contrapeso de fracasos lo elegí yo, también sabiendo el final.
2. **El riesgo de v10 está a la vista: premia el objetivo, no su credibilidad.** Vestas prometía un 10 % de EBIT y nunca llegó (5,7 % en 2025); v10 le da casi la misma subida de ponderada que a Siemens Energy, que sí mejoró (y que tampoco cumplió su ≥ 8 % a tiempo; subió por los pedidos de gas y redes). Si la puntuación no la hubiera parado, v10 habría comprado Vestas en 2022. Una salvaguarda razonable (solo contar el objetivo si `historial_0a5` ≥ 3, o recortarlo a la mitad del camino si la empresa no cumplió su última guía de margen) tiene lógica de negocio, pero sale de mirar estos casos y no se ha probado aparte.
3. **Lo que sí sale del backtest, y no es de v10:** en industriales la puntuación (< 60) deja fuera a casi todas las ganadoras (Vertiv 56, Siemens Energy 51, GE Vernova 53, Rheinmetall 55, Celestica 59,7) y la única compra que falla es un fabricante en el pico de su ciclo con EBITDA récord (Enphase 2023, 33x EBITDA, −70 %). El método growth está pensado para software; para industriales cíclicos el margen de hoy ya puede estar en máximos.
4. **Recomendación: no adoptar v10 como vigente.** Dejarla como candidata y como contraste (`--version v10`) para las valoradas por EV/EBITDA, y apuntar `ebitda_ntm_m` y `margen_ebitda_obj_pct` en los informes nuevos para ir haciendo muestra. Sí merecen pasar a la vigente, cuando se toque la versión, las dos correcciones que no cambian nada en el backtest: el múltiplo calculado desde `ebitda_ntm_m` (higiene de datos) y aplicar el margen a las ventas del analista (fallo latente; con v3, Dexcom sale con base +247 % porque multiplica 17,8x por las **ventas**; desde v4 no se nota porque la proyección es siempre mecánica).

## Efecto en los informes recientes (14-oct-2026; sin escribir `calc`, que sigue en v9)

Campos añadidos (solo nuevos, con fuente en `nota_margen_obj`): `ebitda_ntm_m` en los seis (la estimación de EBITDA NTM que ya usaba cada informe; el múltiplo calculado coincide con el escrito) y `margen_ebitda_obj_pct` donde la empresa publica objetivo: Siemens Energy 18,8 % (14-16 % de margen antes de especiales en FY2028 + amortizaciones ~3,8 %, de memoria), GE Vernova 20 % (perspectiva 2028 del 28-ene-2026) y Dexcom 34,6 % (EBITDA ajustado 36-37 % en 2030, interpolado a 2028). Celestica, Arista e Insulet: `null`.

| Informe | Margen hoy → objetivo | v9: ponderada / base · señal · compra hasta | v10: ponderada / base · señal · compra hasta |
|---|---|---|---|
| Siemens Energy (143,06 EUR) | 15,9 → 18,8 % | +8,5 / +9,7 % · Mantener · 147,9 | +20,1 / +19,2 % · **Mantener** (puntuación 57,5 < 60) · 163,7 |
| GE Vernova (1.004 USD) | 17,6 → 20 % | −14,8 / −12,6 % · Vender · 814 | −8,2 / −7,0 % · **Mantener** (ya no Vender) · 878 |
| Dexcom (85,06 USD) | 32,7 → 34,6 % | +10,5 / +13,4 % · Comprar · 89,5 | +14,4 / +16,7 % · **Comprar** · 92,6 |
| Celestica (357,44 USD) | 9,6 → — | −26,2 / −24,4 % · Vender | igual |
| Arista (204,52 USD) | 49,2 → — | +2,1 / +4,8 % · Mantener (vigilancia) | igual |
| Insulet (138,13 USD) | 25,0 → — | +22,5 / +16,1 % · Mantener (puntuación) | igual |

Con v10 cambiaría una señal: GE Vernova pasaría de Vender a Mantener. Siemens Energy sigue en Mantener (la puntuación manda) y Dexcom sigue en Comprar, con más margen hasta su límite.

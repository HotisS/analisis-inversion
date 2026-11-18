# Diario · Powell Industries (POWL) · 18-nov-2026

Commit de partida: **254cbac**. Encargo: rehacer el análisis value tras el 4T y el cierre de FY2026 (nota del 16-nov y 10-K del 17-nov). Informe anterior: `informes/powell-2026-10-19/`.

## Pasos (hora de Madrid)

| Hora | Paso | Datos a fecha de |
|---|---|---|
| 12:21 | Inicio; lectura del encargo, del método vigente y del informe anterior | — |
| 12:22 | `cuentas.mjs` (XBRL de la SEC FY2017-FY2026), descargas (8-K, 10-K, dividendo, conferencia) y `bolsa.mjs` | 10-K del 17-nov; nota del 16-nov; cierre del 17-nov (150,86 USD) |
| 12:25 | Form 4 de directivos | hasta el 17-nov |
| 12:27 | Comparables (9, Yahoo), `movimiento.mjs`, noticias y supuestos | Yahoo del 18-nov; Treasury del 17-nov (5,10 %); ERP de noviembre (4,41 %) |
| 12:28 | `propio.mjs` (PER histórico, puente, consenso) | — |
| 12:32-12:34 | Notas A-E (`construir-notas.mjs`), textos y resumen | — |
| 12:35 | integrar → calcular → Word y PDF; `apuntar-12m --precios` y `robustez --actual` con flock; `comprobar.mjs` | cierre del 17-nov |
| 12:37 | Revisión a 12 meses, diario y última comprobación | — |

## Decisiones

- **Crecimiento FY2027e del 27 %**: 1.300 M de la cartera de 2.700 M se facturan en FY2027, y los pedidos que se facturan en el año suman unos 300-420 M. FY2028e +15 %: el resto de la cartera, con capacidad nueva.
- **Margen EBITDA del 21,5 % y del 21 %, bajando al 17 %**: el margen bruto de FY2026 (31,3 %) lleva 150 pb de cierres de proyecto (230 pb en el 4T). La cartera ronda el 30 %.
- **Circulante negativo en FY2027e (−3 %)**: los anticipos (578,7 M) se consumen al ejecutar la cartera. El flujo operativo de FY2026 no se toma como caja libre.
- **Resultado financiero recurrente de 28 y 30 M**: son los intereses de la caja (860,8 M). Se excluye 1,5 M de seguros, que no se repiten.
- **WACC del 11,85 %**: misma beta y prima que en octubre, con el Treasury al día.
- **Se mantiene el bajista de 6,7x** (sep-2023) porque lo marca la regla. La variante sin doble castigo (−3,7 %, Mantener) se explica en el informe y baja la convicción a media.
- **Comparables rehechos** con el consenso de Yahoo del 18-nov (mediana del PER NTM: 18,8x).
- **Consenso de Yahoo sin actualizar** (BPA FY2027e 6,82, sin cambios en 30 días). Se cita así y no se toma como posterior a los resultados.

## Resultado

- **Regla v3**: ponderada −11,7 % (apuntar-12m: −11,8 %), base +1,1 % → **Vender**, convicción media. Objetivo 132,81 USD.
- **Control v2**: +8,9 % / +2,2 % (Mantener). Marca M3.
- **Valor**: DCF 93,53 USD; valor intrínseco 99,54 USD (−34 %).
- **Calidad**: sostenibilidad Sí; ROIC − WACC 277,1 puntos.
- **Robustez**: SÓLIDA. Si la tienes: Vender. Compra robusta: no.
  - Nivel hoy: ninguno; límites A y B en 99,54 USD.
  - Filtro de mantener (limite_mantener_cot): 117,11 USD.
- **Regla 13**: no cambia.

## Qué cambió frente al informe de octubre

| | Octubre | Noviembre |
|---|---|---|
| BPA FY2026 | 5,29 estimado | 6,04 real |
| BPA FY2028e | 7,19 | 8,36 (+16 %; consenso 8,25) |
| DCF | 79,49 | 93,53 |
| Valor intrínseco | 89,61 | 99,54 |
| Objetivo | 142,30 | 132,81 |
| Ponderada | −13,6 % | −11,7 % |
| Precio | 165,14 | 150,86 |

El objetivo baja aunque suba el BPA porque la regla parte del PER de hoy y el precio cayó un 9 %. La señal sigue en Vender, más cerca del umbral.

**Señal de alarma anterior** («margen EBITDA ≥ 22 % en dos trimestres de FY2027 con pedidos > ventas → Mantener»): **no se cumple todavía**. Aún no hay trimestres de FY2027. El 4T FY26 (25,9 %) es de FY2026 e incluye 230 pb de cierres de proyecto. Se mantiene para el 1T FY2027 (≈ 2-feb-2027).

## Avisos

- `comprobar.mjs`: sin ERROR de esta carpeta.
- C10: `simbolos.json` aún apunta POWL a la carpeta de octubre. Lo arregla el coordinador; no se toca aquí.
- `robustez.mjs --actual` con una sola carpeta no escribe en `robustez.json`. La salida está copiada en la revisión a 12 meses.

## Lecciones

- El consenso de Yahoo puede seguir sin recoger los resultados uno o dos días después de publicarlos. Hay que mirar el BPA de hace 30 días y la fecha de los cambios de objetivo antes de comparar.
- Tras un split, el primer 10-K posterior ya ajusta en el XBRL los tres últimos ejercicios. Los anteriores hay que dividirlos a mano.
- En las cíclicas con un PER mínimo muy bajo en la historia, la v3 (bajista con doble castigo) y la v2 se separan más de 20 puntos. Hay que dar siempre la variante sin doble castigo para medir la convicción.
- `noticias.mjs` necesita el ticker (`--valores POWL`), no la clave. Con el apellido Powell trae ruido de Jerome Powell: hay que filtrarlo a mano.

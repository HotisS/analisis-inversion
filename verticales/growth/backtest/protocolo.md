# Backtest growth, segunda fase: protocolo fijado ANTES de ver los datos (14-oct-2026, 15:00 UTC)

Pide del usuario (14-oct, 14:56): «4 iteraciones más, prueba hasta 50 candidatas, casos de éxito y fracaso, y mide en temporalidad razonable y neutral para ver tasa de acierto REALISTA, sin autoengañarnos». La primera fase (20 casos famosos, `casos/`) tiene dos sesgos: elegimos las empresas sabiendo cómo acabaron y elegimos la fecha de entrada sabiendo dónde estaba el suelo. Esta fase los quita con estas reglas, que no se cambian después de ver resultados.

## 1. Universo: lo elige un tercero, no nosotros
- **Lista**: las mayores posiciones del ETF ARK Innovation (ARKK), el fondo «growth disruptivo» de referencia, según su 13F del trimestre anterior a cada fecha (es pública y anterior a la fecha). Se toman por peso las **17 primeras empresas cotizadas** (fuera fondos, trusts de bitcoin y efectivo). Si una ya no cotiza después (comprada, quiebra), se queda, con el precio de la compra o 0.
- Así entran ganadoras, fracasos y casos normales en la proporción que hubo de verdad, y no los que recordamos.

## 2. Fechas de entrada: fijas e iguales para todos
- **29-mar-2019, 31-mar-2021 y 31-mar-2023** (cierre del día; si es festivo, el anterior). Un año normal, el pico de la burbuja growth y la salida del mercado bajista: el método se mide en tres climas distintos.
- Solo se usa información publicada antes de cada fecha (último trimestre publicado, guía de entonces, precio de entonces).

## 3. Horizonte y vara de medir
- **Horizonte principal: 24 meses** (31-mar de dos años después). Secundario: 12 meses. Los dos, para todos igual.
- **Comparación con el Nasdaq-100 (QQQ)** en el mismo periodo: un acierto de compra es una compra que bate al QQQ; un acierto de descarte es una no compra que queda por debajo del QQQ.
- Medidas:
  1. **Precisión de Comprar**: % de compras que baten al QQQ a 24 meses (lo que importa para el usuario: cuando el método dice compra, ¿acierta?).
  2. **Exceso medio de las compras** frente al QQQ y frente a la media de toda la lista de esa fecha (¿añade algo sobre comprar la lista entera?).
  3. **Acierto total** (compras que baten + descartes que no baten) / casos.
  4. Peor caso de las compras.
  - Margen: intervalo de confianza del 95 % de Wilson para los porcentajes, y del 95 % por remuestreo (bootstrap) para el exceso medio. Con ~50 casos el margen será grande y se dirá.

## 4. Ajuste y validación separados
- **Ajuste**: cohortes 2019 y 2021 (~34 casos) + los 20 casos famosos de la primera fase. Las versiones v5-v8 se diseñan mirando solo estos.
- **Validación**: cohorte 2023 (~17 casos). **No se mira hasta tener la versión final**; se publica su resultado tal cual, aunque sea malo. También se da v4 sobre las tres cohortes (para v4 todas son casos nuevos).
- Regla de elección de la versión final: la mejor **precisión de Comprar a 24 meses en el ajuste con al menos 5 compras**; a igualdad, la de mayor exceso medio. Las reglas nuevas deben tener una razón de negocio, no estar hechas para un caso.

## 5. Datos
- Mismo formato que la primera fase (`LEEME.md`), en `casos2/<cohorte>/<empresa>.json`, con `resultado.rent_12m_pct`, `rent_24m_pct` y los del QQQ en el mismo periodo (`qqq_12m_pct`, `qqq_24m_pct`).
- Las cifras de memoria se marcan; si un dato clave no aparece, `null` y el código lo trata de forma conservadora (no suma puntos).

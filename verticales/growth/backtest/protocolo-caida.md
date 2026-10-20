# Backtest growth: mínimo de «rentabilidad frente a caída máxima». Protocolo fijado ANTES de calcular (20-oct-2026, 08:45 UTC)

Pide del usuario (Hotis, 20-oct): «para growth quiero no solo la rentabilidad, sino también un mínimo de caída máxima frente a rentabilidad; busca un buen mínimo». Se suma a la regla del mismo día (rentabilidad ponderada a 12 m ≥ +25 % y largo plazo mayor) y a la de v11 (bajista no peor que −50 %). Nada de esto cambia METODO-VIGENTE.md ni el escáner hasta que Hotis apruebe el mínimo.

Lo que ya se sabía al escribir esto: el formato de los casos (`casos/`, `casos2/`, `casos3/`), que v11 da Comprar en 6 de las 51 neutrales y 2 de las 13 industriales, y la cifra de MongoDB hoy (+26,0 % a 12 m, bajista −39 %). **No se había calculado ninguna razón ni ninguna caída real de los casos.**

## 1. La razón

**R = rentabilidad ponderada a 12 m (v11) ÷ caída**, con la caída en positivo. R = 1 quiere decir «espero ganar lo mismo que puedo perder». Tres medidas de caída candidatas:

1. **Bajista del modelo**: −(rentabilidad del escenario bajista de v11 a 12 m). Mira hacia delante y sale del mismo análisis.
2. **Caída máxima histórica**: la mayor caída de pico a suelo del precio (cierres semanales ajustados de Yahoo) en los 3 años anteriores a la fecha del caso (mínimo 1 año de historia; si no, sin dato).
3. **La peor de las dos** (la mayor caída).

## 2. Qué se mide (resultado real, Yahoo, cierres diarios ajustados de la misma serie)

- **Caída sufrida**: el peor cierre de los 12 meses siguientes frente al cierre de la fecha del caso (0 si nunca baja). Es lo que nota quien compra.
- **Exceso a 24 m frente al Nasdaq-100 (QQQ)**, con las rentabilidades ya guardadas en cada caso (las mismas de los backtests anteriores).

## 3. Grupos

- **Entrenamiento**: neutrales 2019 y 2021 (34 casos, ARKK top 17).
- **Validación**: neutrales 2023 (17) + industriales (`casos3/`, 13). Se publica tal cual salga.
- Los 20 famosos de la fase 1 solo como información (están elegidos sabiendo cómo acabaron).
- Casos sin datos de Yahoo (deslistadas, etc.): fuera de la medida que no se pueda calcular, y se dice cuáles.

## 4. Elección de la medida (antes que el mínimo)

Gana la medida cuya razón R tenga, **en el entrenamiento**, la mayor correlación de rangos (Spearman) con el exceso real a 24 m; a igualdad (diferencia < 0,05), la que mejor prediga la caída sufrida (Spearman entre la caída candidata y la sufrida). Además se comprueba en validación, sin cambiar la elección.

## 5. Elección del mínimo

- Rejilla fijada: **R ≥ 0,25 / 0,5 / 0,75 / 1 / 1,25 / 1,5 / 2**.
- Para cada mínimo, en el entrenamiento: casos que pasan, % que baten al QQQ a 24 m (margen de Wilson al 95 %), caída sufrida media y mediana, frente a los que no pasan.
- **Regla**: el mínimo con mayor % de aciertos (baten al QQQ) entre los que pasan, **con al menos 8 casos que pasan** en el entrenamiento; a igualdad (±5 pp), el **más bajo** (deja más compras y es menos ajuste a la muestra).
- Validación: mismo mínimo, sin tocarlo, resultado tal cual.
- Comprobación de que el mínimo no sobra: cuántas de las compras de v11 (y de las que pasan además la regla de +25 %) quita, y cómo les fue.

## 6. Honestidad

- Son 64 casos neutrales; con 3 medidas y 7 mínimos se prueban 21 combinaciones: el mejor resultado del entrenamiento está inflado por haber elegido. Por eso cuenta la validación, y por eso se da el margen de Wilson.
- Si ninguna medida separa (correlación < 0,15 en entrenamiento o no se sostiene en validación), se dice que el backtest no apoya un mínimo concreto y se propone uno por coherencia, no por evidencia.

## 7. Hoy

Con el mínimo elegido, a precio de hoy (objetivo fijo de cada informe, como el escáner): qué growth de `informes-growth/` pasan la señal v11, +25 % a 12 m con largo plazo mayor, y el mínimo de R.

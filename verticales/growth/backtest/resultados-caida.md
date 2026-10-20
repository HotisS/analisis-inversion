# Backtest growth: mínimo de «rentabilidad frente a caída» (20-oct-2026)

Protocolo fijado antes de calcular: [protocolo-caida.md](protocolo-caida.md) (commit 2d5cf2f). Cálculo: `node herramientas/growth-backtest-caida.mjs` (datos de Yahoo en `caida-datos.json`, bajados con `--descargar`). Método v11. **No cambia METODO-VIGENTE.md ni el escáner: propuesta pendiente de Hotis.**

Razón R = rentabilidad ponderada a 12 m ÷ caída (en positivo). Caída sufrida = peor cierre de los 12 meses siguientes frente al de la fecha del caso.

Sin datos de Yahoo (fuera de las medidas con caída real o histórica): Invitae 2019 y 2021, 2U 2019, Twitter 2019 y Exact Sciences 2021 y 2023 (deslistadas); sin 1 año de historia: Unity 2021, GE Vernova 2024 y cuatro de la fase 1. Casi todas las deslistadas acabaron mal: su ausencia favorece algo a las medidas que dependen de Yahoo.

## 1. Medida (Spearman)

| Grupo | Medida | n | R frente a exceso a 24 m sobre el QQQ | Caída prevista frente a caída sufrida |
|---|---|---|---|---|
| Entrenamiento 2019-21 | bajista del modelo | 34 | 0,17 | 0,23 |
| | caída histórica 3 años | 28 | 0,21 | 0,12 |
| | la peor de las dos | 28 | 0,23 | 0,29 |
| | (la rentabilidad sola) | 34 | 0,18 | |
| Validación 2023 + industriales | bajista del modelo | 30 | −0,07 | 0,25 |
| | caída histórica 3 años | 28 | −0,05 | 0,18 |
| | la peor de las dos | 28 | −0,04 | 0,12 |
| Las 64 neutrales | bajista del modelo | 64 | 0,02 | 0,24 |
| | caída histórica 3 años | 56 | 0,05 | −0,04 |
| | la peor de las dos | 56 | 0,05 | −0,03 |

Por la regla del protocolo ganaría «la peor de las dos» en el entrenamiento, pero **ninguna se sostiene en validación** (todas ≈ 0) y dividir por la caída no añade nada a la rentabilidad sola (0,18). La única relación estable es débil: el bajista del modelo ordena algo la caída que luego se sufre (0,23-0,25 en los dos grupos).

## 2. Mínimo

Ningún mínimo de la rejilla cumple la regla del protocolo (≥ 8 casos que pasan en el entrenamiento con más aciertos): con el bajista, R ≥ 0,25 deja 11 casos y baten 1 (9 %), peor que los que no pasan (30 %); con la histórica o la peor, ya en 0,25 pasan solo 7. En las 64 neutrales (bajista del modelo):

| Mínimo | Pasan | Baten al QQQ a 24 m | Caída sufrida media | No pasan: baten | No pasan: caída |
|---|---|---|---|---|---|
| (todos) | 64 | 19 (30 %; 20-42) | 38 % | | |
| R ≥ 0,5 | 11 | 4 (36 %; 15-65) | 32 % | 28 % | 39 % |
| R ≥ 0,75 | 6 | 2 (33 %; 10-70) | 33 % | 29 % | 38 % |
| R ≥ 1 | 5 | 1 (20 %; 4-62) | 37 % | 31 % | 38 % |

**Conclusión del backtest: no apoya ningún mínimo concreto.** Las que pasan no baten más al índice ni caen claramente menos (márgenes de Wilson solapados por completo). Las caídas reales dentro del año son grandes en casi todas: media 38 %, también en las ganadoras (Tesla 2019, −36 % antes de multiplicar por diez).

## 3. Lo que quitaría a las compras de v11

Compras v11 en neutrales e industriales: Tesla 2019 (R 3,7; batió), Roku 2019 (0,23; batió), Square 2019 (0,21; batió), Twitter 2019 (0,18; batió), Shopify 2023 (0,62; batió), Exact Sciences 2023 (0,25; no), Enphase 2023 (1,70; no, −117 pp) y Comfort Systems 2023 (0,15; batió). Con R ≥ 0,75 quedarían Tesla 2019 y Enphase (1 de 2). **Las ganadoras de v11 tenían casi todas rentabilidad esperada baja y R bajo**; lo mismo pasa con la regla de +25 % del 20-oct (de las 8, solo Tesla 2019 y Enphase dan ≥ 25 %; en las 64 neutrales, de las 7 con ≥ 25 % batieron 2, el 29 %, como la media).

## 4. Propuesta por coherencia (no por evidencia)

- Medida: **bajista del modelo** al precio de hoy con el objetivo fijo del informe (mira hacia delante, existe en todas, incluidas las salidas a bolsa recientes, y es la única que ordena algo la caída sufrida en los dos grupos).
- Mínimo: **R ≥ 0,75** («espero ganar al menos 3 por cada 4 que puedo perder en el escenario malo»). Con +25 % y el bajista de v11 no peor que −50 %, R ya es ≥ 0,5 siempre: 0,5 no filtraría nada; 1 deja fuera casi todo growth (hoy, todas salvo Axon y Cloudflare, que no cumplen otras reglas).
- Límite de compra que implica: precio ≤ (objetivo 12 m + 0,75 × precio bajista) ÷ 1,75; se toma el menor con los otros límites.
- Es una regla de comodidad ante el riesgo, no de acierto: el backtest dice que no sube la tasa de acierto (realista: ~30-35 % de las growth baten al Nasdaq-100 a 24 m, pasen o no).

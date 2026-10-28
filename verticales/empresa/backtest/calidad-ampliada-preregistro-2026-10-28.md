# Calidad ampliada · protocolo fijado antes de mirar datos (2026-10-28)

Petición del usuario (28-oct, 11:01 y 11:01 Madrid): «complementar el análisis de calidad con más pruebas, para hacerlo más completo y robusto», «para la metodología entera». **Estudio: no cambia el método vigente.** Lo que pase se propone al usuario con el efecto empresa por empresa; nada cambia en niveles ni señales sin su sí.

## Qué hay hoy
Calidad value = **ROIC − WACC** (≥ 5 para comprar, < 4,5 vende) + **sostenibilidad del crecimiento** (Sí / En parte / No). El motor ya calcula Altman Z, Piotroski F, Beneish M y flujo operativo / beneficio, pero solo se enseñan: no deciden. La nota de calidad de cartera (28-oct) solo usa ROIC − WACC y la sostenibilidad.

## Datos
- Los del backtest del método rápido (`metodo-rapido-preregistro-2026-10-20.md`): S&P 500 + S&P 400 de hoy; cuentas anuales de la SEC (companyfacts, 10-K) con la fecha de presentación del primer 10-K que da cada cifra; decisión 1 día hábil después; rentabilidad total a 12 meses frente al SPY. Ejercicios 2012-2024.
- **Muestra fuera**: S&P 600 de hoy (pequeñas), mismas reglas, frente al IJR.
- Solo cifras publicadas antes de la decisión. Últimos 5 ejercicios conocidos.
- Descarga: `herramientas/bajar-datos-backtest.mjs` (datos fuera del repo).

## Pruebas nuevas (fijas; «n.d.» si falta el dato, y n.d. no cuenta como fallo)
| Clave | Prueba | Pasa si |
|---|---|---|
| P1 | ROIC estable | ROIC ≥ WACC (8 %) en **todos** los ejercicios conocidos de los últimos 5 (mínimo 4 con dato): nunca destruyó valor |
| P2 | Conversión en caja | Σ (flujo operativo − inversión en inmovilizado) de 3 años ÷ Σ beneficio neto de 3 años ≥ 0,8 (con beneficio acumulado > 0) |
| P3 | Devengos (Sloan) | (beneficio neto − flujo operativo) ÷ activo total del último año ≤ 5 % |
| P4 | Deuda | Deuda neta ÷ EBITDA (EBIT + amortizaciones) ≤ 3 (caja neta pasa; EBITDA ≤ 0 con deuda neta > 0 falla) |
| P5 | Cobertura de intereses | EBIT ÷ gasto por intereses ≥ 5 (sin gasto por intereses y sin deuda: pasa) |
| P6 | Margen estable | Máximo − mínimo del margen EBIT de los últimos 5 ejercicios ≤ 10 puntos (mínimo 4 con dato) |
| P7 | Sin dilución | Acciones diluidas medias: crecimiento anual compuesto de 3 años ≤ 2 % |
| P8 | Piotroski | F ≥ 6 de 9 (como el motor; con ≥ 7 criterios con dato, escalado a 9) |
| P9 | Altman Z | Z > 1,81 (fuera de la zona de riesgo; capitalización del día de la decisión). No aplica a financieras ni inmobiliarias (n.d.) |
| P10 | Ventas que no encogen | Ventas del último año ≥ ventas de hace 3 años |

Financieras e inmobiliarias: P4, P5 y P9 n.d. (el ROIC del backtest ya las trata mal; se mantienen en la muestra como en el estudio del 20-oct).

**Nota de pruebas** = % de pruebas con dato que pasan (mínimo 6 con dato).

## Grupos (los del 20-oct)
Números A / B con el selector, v2 y BPA −10 %; calidad «completa» = ROIC − 8 ≥ 5 en los 3 últimos años. A = números A + completa; B1 = números B + completa; B2 y C con calidad aflojada.

## Qué se mide (exceso mediano frente al índice, % que pierde > 10 %, n)
1. **Universo entero**: pasa frente a falla, para cada prueba. Dice si la prueba separa buenas de malas en general.
2. **Compras con la calidad de hoy (A + B1)**: pasa frente a falla. Dice si la prueba añade algo a lo que ya exigimos.
3. **Filtro sobre A + B1**: (A + B1 que pasa) frente a (A + B1).
4. **Nota de pruebas**: tercios dentro del universo y dentro de A + B1.
5. **Growth** (informativo para el método growth): empresas con ventas que crecen ≥ 20 % anual en 3 años; pasa frente a falla en P2, P4, P5, P7 y P9.

## Validación y criterio (fijos)
- Cortes: validación por empresas (tickers alternos en orden alfabético), tiempo (2012-2018 ajuste / 2019-2025 validación) y S&P 600 (muestra fuera).
- **Filtro duro** (entra en la regla de compra, niveles y escáner): en el punto 3, el exceso mediano mejora frente a A + B1 en la validación por empresas **Y** en 2019-2025 **Y** en el S&P 600, sin subir el % < −10 % más de 3 puntos, con n ≥ 30 en cada corte y sin dejar fuera más de la mitad de las compras.
- **Componente de la nota y aviso en el informe**: no llega a filtro duro, pero en el punto 1 «pasa» bate a «falla» en exceso mediano en los tres cortes (empresas, 2019-2025 y S&P 600) y en el punto 2 no va en contra (pasa ≥ falla en el conjunto).
- **Solo informativa**: el resto. Se enseña en el informe sin decidir.
- Con 10 pruebas, alguna saldrá bien por azar: por eso se exigen los tres cortes a la vez.

## Nota de calidad ampliada (si alguna prueba entra como componente)
Nota nueva = 0,6 × nota actual (ROIC − WACC y sostenibilidad) + 0,4 × 10 × (fracción de pruebas adoptadas que pasa). Se enseña al lado de la actual hasta el sí del usuario.

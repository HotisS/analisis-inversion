# Calidad ampliada · informe (2026-10-28)

Petición del usuario (28-oct, 11:01 Madrid): complementar el análisis de calidad con más pruebas, para la metodología entera. Protocolo fijado antes de mirar datos: `calidad-ampliada-preregistro-2026-10-28.md` (commit 37462e0). Resultados completos: `calidad-ampliada-resultados-2026-10-28.md`. Script: `herramientas/backtest-calidad-ampliada.mjs`; datos: `herramientas/bajar-datos-backtest.mjs`.

## Muestra
9.483 decisiones de 857 empresas del S&P 500/400 y 5.565 de 561 del S&P 600 (muestra fuera), 2012-2025, decisión 1 día hábil después de cada 10-K, rentabilidad total a 12 meses frente al SPY o al IJR. Compras con la calidad de hoy (A + B1): 414 y 182.

## Resultado en una frase
**Ninguna de las 10 pruebas pasa el criterio fijado**: ni como filtro de compra ni como parte de la nota. Quedan como **informativas**.

## Lo que se ve
1. **No suben la rentabilidad.** En el universo entero, «pasa» no bate a «falla» de forma estable: en exceso mediano frente al índice la diferencia va de −4,3 a +2,4 puntos y cambia de signo según el corte. Las acciones baratas con números flojos rebotan a 12 meses tanto o más que las sólidas.
2. **Sí bajan algo el riesgo de caída fuerte en el universo entero** (lectura hecha después, no estaba en el criterio). Ejemplos en el S&P 500/400 (% que cae más de un 25 % en 12 meses, pasa frente a falla): margen estable 5,0 frente a 9,0; caja ≥ 0,8 × beneficio 5,6 frente a 8,5; ROIC estable 5,7 frente a 7,7; sin dilución 5,5 frente a 8,2; devengos 6,1 frente a 10,1. En el S&P 600 va en el mismo sentido en casi todas.
3. **Dentro de lo que ya compramos (A + B1) no añaden casi nada**: el requisito de ROIC − WACC ≥ 5 durante 3 años ya se queda con las sólidas. Quitar las que fallan una prueba baja el exceso mediano en casi todos los cortes. Las dos únicas con señal de riesgo son **deuda neta / EBITDA > 3** (caídas de más del 25 %: 18,8 % frente a 8,3 %, con solo 11 casos) y **dilución > 2 % anual** (14,1 % frente a 8,6 %, 32 casos). Muy pocos casos para decidir.
4. **Nota de pruebas por tercios**: no ordena la rentabilidad (el tercio alto de A + B1 rinde peor en la muestra grande y algo mejor en el S&P 600).
5. **Growth** (ventas ≥ +20 % anual): ninguna prueba ayuda; las que pasan Altman, cobertura de intereses o Piotroski rinden igual o peor. El método growth no cambia.

## Qué se hace
- Las 10 pruebas se calculan en cada informe value nuevo (sección 9, tabla de calidad contable: «Calidad ampliada: pruebas que pasa» y una fila por prueba), en `robustez.mjs` (`calidad_pruebas`, `calidad_fallan`) y en el escáner (línea informativa bajo la tabla de compras posibles). Módulo único: `motor/calidad-ampliada.mjs`.
- **No cambian**: requisitos de compra, niveles A/B1/B2/C, filtro de mantener, señales, acción robusta, nota de calidad de cartera.
- Candidatas para un protocolo de domingo (§4.10), solo si el usuario lo pide: aviso de riesgo en compras con deuda neta / EBITDA > 3 o dilución > 2 % anual, medido por caídas fuertes y no por rentabilidad.

## Límites
Solo EE. UU. (no hay cuentas europeas con fecha antes de 2021); ROIC aproximado (EBIT × 0,79 ÷ capital) y WACC fijo del 8 %; universo de hoy (sesgo de supervivencia, igual para «pasa» y «falla»); financieras con P4, P5 y P9 sin dato; BPA ingenuo para los números.

# Preregistro: ¿esperar a los resultados antes de comprar (o de vender)? · 15-oct-2026

Escrito y subido antes de ver ningún resultado. Pregunta del usuario (15-oct 13:42): «esperar a resultados es contraproducente en las compras: si son buenos puede subir y matar la compra; esperar a resultados o ir con momentum hay que considerarlo para las ventas, no para la compra». El hilo de cartera propone: compras sin espera por resultados (solo cuenta un hecho pendiente que no esté en el análisis, como una colocación); en ventas, esperar a resultados o seguir la tendencia sí.

## Datos

- Compras robustas y señales de venta del backtest común (`backtest-comun.mjs`, BPA ingenuo, cierres anuales 31-dic de t).
- Precio diario de Yahoo (caché de `movimiento.mjs`, 12 años).
- **Fechas reales de resultados**: solo empresas de EE. UU., de los 8-K con punto 2.02 de la SEC (`herramientas/fechas-resultados-sec.mjs` → `fechas-resultados-sec.json`). Para el resto no hay fechas históricas fiables y no se estiman: se dice que la prueba es con las de EE. UU.

## Qué se mide

Para cada compra robusta en t y cada publicación de resultados R en los 12 meses siguientes **mientras la compra sigue viva** (el cierre del día anterior a R, P0, no supera el límite robusto, el precio al que todavía pasan v3 y v2):
- **salto** = cierre del día siguiente a R (P1) / P0 − 1 (lo que cambia por esperar a los resultados);
- **compra perdida** = P1 > límite robusto (esperando, ya no se puede comprar);
- **caída fuerte** = salto ≤ −10 % (lo que evita esperar);
- rentabilidad real a 3 y a 12 meses desde P0 y desde P1 (con dividendos del año) para las dos entradas;
- separado por **holgada** (margen de la ponderada v3 ≥ 15 puntos sobre el 15 %, al precio P0) y **justa**; y por **tendencia** en P0 (`metricas`: bajista / lateral / alcista).

Para las señales de venta (cierre t que no pasa el filtro de mantener con el método vigente), cada R de los 12 meses siguientes: el mismo salto, separado por tendencia en P0.

Mitades por ticker (diseño / validación) como siempre; decide el total, la validación confirma el signo.

## Criterios (fijados antes)

1. **Aplazar la compra con resultados cercanos** se mantiene solo si esperar evita más de lo que cuesta: mediana del salto ≤ −1 % **y** compras perdidas ≤ 20 % **y** la rentabilidad mediana a 12 meses entrando después (P1) no es menor que entrando antes (P0). Si falla cualquiera, se quita. Se mira por separado en las justas: si el criterio se cumple solo en ellas, se mantiene solo para compras justas.
2. **Bajista + resultados cercanos**: lo mismo dentro de los eventos con tendencia bajista.
3. **Hecho pendiente que mueva > 5 %** (colocación, ampliación): no medible con estos datos (no hay registro histórico de hechos); queda como regla de juicio.
4. **Ventas: esperar si la tendencia es alcista y hay resultados cerca** se adopta si en los eventos alcistas la mediana del salto es ≥ +1 % y más del 55 % de los saltos son positivos, con el mismo signo en validación; se mira también en lateral y bajista.

Script: `herramientas/backtest-espera-resultados.mjs`; resultados en `espera-resultados-resultados-2026-10-15.md`.

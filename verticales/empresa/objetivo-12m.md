# Rentabilidad esperada a 12 meses: PER propio × BPA propio (método «v2», 12-oct-2026)

**Origen.** Lo definió el usuario el 12-oct en el hilo del proyecto de claude.ai «PROYECTOS GH - INV», con la revisión a fondo de Alphabet (que pasó de −28 % a +1,5 %). Ese hilo no tenía acceso al repo y aquí no llegó nada. El 13-oct se copió el método desde el texto que pegó el usuario. **Una regla anterior de este archivo (cerrar la mitad del descuento al valor intrínseco, «k») era una reconstrucción equivocada y queda retirada.**

**Por qué.** El informe toma el valor intrínseco del DCF como objetivo a 12 meses. Con flujos de caja deprimidos (capex de IA en Alphabet) o con un descuento que el mercado tardará años en cerrar, la cifra no sirve para comparar compras a un año. Este método valora a 12 meses con beneficio y múltiplo propios. **El consenso solo se usa de contraste, nunca en el cálculo.**

## Pasos (por empresa, con criterio)

1. **Ejercicio objetivo**: el que mirará el mercado dentro de 12 meses. Es el primero que cierra más de 18 meses después de la fecha de corte; con corte en octubre de 2026 y cierre en diciembre, 2028e.
2. **BPA propio en tres escenarios**, a partir de la proyección del propio informe (`dcf.anios`, sobre las ventas del último ejercicio real):
   - ventas × margen EBITDA − amortización (% de ventas del DCF) = EBIT;
   - − resultado financiero neto (intereses de la deuda; sin ganancias de participadas que no se repiten; ingresos de la caja solo si son recurrentes);
   - − impuestos (tipo del DCF) − minoritarios − dividendos de preferentes;
   - ÷ acciones: las de hoy más la dilución conocida (ampliaciones, convertibles, ATM) y **sin recompras que no estén anunciadas**.
   - Escenarios: los desplazamientos de crecimiento y margen de `escenarios.casos` del informe en los años no fijos. Si la amortización es de capex ya comprometido, no se baja en el bajista.
3. **PER propio**, con la historia del PER de los últimos 12 meses al cierre de cada año (precio de cierre ÷ BPA real, del informe):
   - **Base**: el más prudente entre el PER actual sobre el BPA propio del ejercicio siguiente y la mediana de cinco años. Se contrasta con la media de los comparables (`comparables`).
   - **Bajista**: el mínimo de cinco años, si queda por debajo del precio de hoy; si no, el siguiente más bajo que lo haga. Se contrasta con el percentil 25 de los comparables.
   - **Alcista**: la media histórica larga (ocho años), **sin años de pérdidas, de burbuja o con un BPA atípico**: se excluyen y se dice cuáles.
4. **Objetivo a 12 meses** = media simple de bajista, base y alcista (PER × BPA de cada uno). **Rentabilidad** = objetivo / precio − 1 + dividendo. **Asimetría** = alcista frente a bajista.
5. **Señal**: Comprar ≥ 15 %, Vender ≤ −10 %, Mantener en medio. La convicción se razona como en el informe.
6. **Contraste con el consenso** (no entra en el cálculo): el BPA de los analistas del mismo ejercicio y el objetivo medio. Si nos separamos más de un 10 %, se explica de dónde sale la diferencia (ventas, margen, dilución, múltiplo).
7. **Comparar**: la cifra se pone junto a las demás (cartera y compras) y se dice si cambia alguna decisión.

## Dónde queda

- Revisión de cada empresa: `informes/<carpeta>/revision-12m-AAAA-MM-DD.md`, con la tabla de BPA (ventas → EBIT → beneficio → BPA por escenario), la tabla de PER histórico, la tabla de escenarios (supuesto, cálculo, objetivo y rentabilidad), el contraste con el consenso y una línea en `diario.md`.
- Resultado: `verticales/empresa/objetivo12m-revisados.json` (`revisados.<TICKER>`: fecha, objetivo, rentabilidad, señal y nota con los tres cálculos). **Manda sobre todo lo demás.**
- `herramientas/objetivo12m.mjs`: calculadora de apoyo. Hace los pasos 1-4 con los datos del informe, sin ajustes de dilución ni de partidas financieras y con la media de todos los años de PER. **No es la revisión**: aplicada a ciegas da disparates (PER de burbuja en el alcista, BPA en otra base). Sirve de punto de partida. Con `--sin-revisiones` ignora el JSON.
- `seguimiento.xlsx`: columnas «Objetivo 12 m», «Rentabilidad 12 m», «Señal 12 m» y «Origen del objetivo 12 m». Solo se rellenan con revisiones hechas: lo que no tiene revisión sale vacío.
- **Cartera y compras**: se ordenan por esta rentabilidad a 12 meses. El valor intrínseco del informe se da al lado como «valor real».

## Qué no es

No es la «metodología nueva» del informe del 10-oct, la **sostenibilidad del crecimiento** en el DCF (columna «Metodología» del Excel). Son dos cosas distintas: el método del informe y el paso a una rentabilidad a 12 meses.

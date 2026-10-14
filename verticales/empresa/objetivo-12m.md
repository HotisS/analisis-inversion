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
3. **PER propio, con la regla común** (cerrada el 14-oct-2026; la aplica el código, `motor/objetivo12m.mjs`, igual para todas). Historia del PER de los últimos 12 meses al cierre de cada año (precio de cierre ÷ BPA real, del informe y en la **misma base de BPA** que los escenarios), **sin años de pérdidas, de burbuja o con BPA atípico** (se dice cuáles):
   - **Base**: el menor entre el PER actual (precio de hoy ÷ nuestro BPA del ejercicio siguiente) y la mediana de cinco años.
   - **Bajista**: el mínimo de cinco años si queda por debajo del base. Si no (la empresa ya cotiza en mínimos), **base × 0,85**. Nunca por encima del base.
   - **Alcista**: la mayor entre la media histórica larga (ocho años, sin los excluidos) y la mediana del PER de los comparables, **sin bajar del base y con un techo de base × 1,30**.
   - Si el PER no sirve (pérdidas, deuda muy alta, cíclica en recesión), el caso lleva otra métrica (EV/EBITDA) con su precio y se explica; es la única excepción.
   *Por qué se cerró la regla (14-oct).* Las 73 revisiones del 13-oct elegían los múltiplos caso a caso y casi siempre hacia arriba: el alcista tomaba la media de épocas de múltiplos altos (Edenred 25x de antes de los topes, Lululemon 35x, Hermès 48x, Netflix 38x) y, cuando la empresa ya cotizaba en mínimos, el bajista repetía el PER del base (25 empresas) o incluso uno mayor (DSV, Fluidra, Krones). Las del 12-oct, hechas a mano, habían descartado esas medias y salían con alcistas de base × 1,0-1,35 y bajistas de base × 0,80-0,85: la regla recoge eso.
4. **Objetivo a 12 meses** = media de bajista, base y alcista (PER × BPA de cada uno) **ponderada con las probabilidades de los escenarios del informe** (`escenarios.casos[].probabilidad_pct`; 25/50/25 si faltan). **Rentabilidad 12 m** = objetivo / precio − 1 + dividendo. Se da también la **rentabilidad del base** y la **asimetría**.
   *Decisión del usuario, 13-oct.* El hilo usaba la media simple de los tres; inflaba la cifra porque el alcista, que supone volver al PER histórico, pesaba un tercio. La media simple se guarda solo para comparar.
5. **Señal**: **Comprar** si la ponderada ≥ 15 %, la del base ≥ 12 % y el valor intrínseco del informe ≥ precio (valor real); **Vender** si la ponderada ≤ −10 %; **Mantener** en medio. Para seguir en cartera: ponderada ≥ 10 % y base ≥ 5 % (MEMORIA). La convicción se razona como en el informe.
6. **Contraste con el consenso** (no entra en el cálculo): el BPA de los analistas del mismo ejercicio y el objetivo medio. Si nos separamos más de un 10 %, se explica de dónde sale la diferencia (ventas, margen, dilución, múltiplo).
7. **Comparar**: la cifra se pone junto a las demás (cartera y compras) y se dice si cambia alguna decisión.

## Dónde queda

- **En el informe**: `valoracion.objetivo_12m` del `datos*.json` (BPA de los tres casos, `per_historico`, `comparables_per`, consenso solo de contraste, `diferencia_consenso`, `comentario`; ver el prompt, sección 23). El motor calcula los múltiplos con la regla, la ponderada, el base, la señal y los precios de compra y venta (`calc.recomendacion.objetivo_12m`), y **la recomendación del informe sigue a esta regla**; la del DCF queda como `regla_valor_intrinseco`. Portada, resumen, «La decisión» y la sección 23 lo enseñan.
- **Detalle de cada empresa**: `informes/<carpeta>/revision-12m-AAAA-MM-DD.md`, con la tabla de BPA (ventas → EBIT → beneficio → BPA por escenario), el PER histórico con los excluidos, los escenarios, el contraste con el consenso y una línea en `diario.md`.
- **Resultado**: `verticales/empresa/objetivo12m-revisados.json`, que escribe `node herramientas/apuntar-12m.mjs <carpeta…>` leyendo `valoracion.objetivo_12m` del último `datos*.json` con la misma función del motor (`--precio X` para recalcular a otro precio). **Manda sobre todo lo demás** en el Excel y la cartera.
- `herramientas/objetivo12m.mjs`: calculadora de apoyo para empezar una revisión. No es la revisión.
- `seguimiento.xlsx`: columnas «Objetivo 12 m», «Rentabilidad 12 m», «Señal 12 m» y «Origen del objetivo 12 m».
- **Cartera y compras**: se ordenan por la rentabilidad a 12 meses **al precio del día**. El valor intrínseco se da al lado como «valor real».

## Qué no es

No es la «metodología nueva» del informe del 10-oct, la **sostenibilidad del crecimiento** en el DCF (columna «Metodología» del Excel). Son dos cosas distintas: el método del informe y el paso a una rentabilidad a 12 meses.

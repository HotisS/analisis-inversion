# Ficha sectorial corta (14-oct-2026)

**Qué es.** La vertical de sector completa (`prompt.md`, 18 campos, informe Word) no se ha usado nunca para un informe real; lo que sí se repite en cada análisis value es el trabajo sectorial de las secciones 3 y 4, los comparables y el `mercado_final` de la prueba de sostenibilidad, y se rehace para cada empresa del mismo sector (cuatro farmacéuticas en una misma hora, ocho de bolsas y datos financieros, seis de lujo). Esta ficha se hace **una vez por sector** y la reutilizan los informes value que vengan después. El informe Word de 18 campos queda disponible por si el usuario lo pide expresamente («analiza el sector X con el informe completo»).

**Dónde queda.** `sectores/<sector>-<AAAA-MM-DD>.md` (nuevo directorio en la raíz) y, si hay cifras de comparables, `sectores/<sector>-<AAAA-MM-DD>-comparables.json` con la estructura de `comparables.empresas` del prompt de empresa, para copiarlas al nuevo informe llevándolas al cierre del día (variación de precio desde la fecha de la ficha). Caduca a los 30 días para las cifras de mercado; el resto vale hasta que algo cambie.

**Cuándo se hace.** Antes de analizar la primera empresa de un sector que no tenga ficha, o cuando la cola trae dos o más empresas del mismo sector en la misma tanda (entonces la hace el primer análisis y la usan los demás). 15-20 minutos, con fuentes primarias (asociaciones, reguladores, informes anuales de las cotizadas).

## Campos (todos con cifra y fuente; `n.d.` si no hay dato fiable)

1. **Perímetro**: qué actividades entran y cuáles no, códigos NACE/GICS, y el ámbito geográfico que se usará como `mercado_final` en los informes value (mismo perímetro que la cuota de las empresas).
2. **Tamaño y crecimiento**: tamaño del mercado hoy y a 5 años (dos fuentes independientes, en millones de la divisa de la ficha), crecimiento histórico y previsto, y de qué depende (volumen, precio, mezcla).
3. **Estructura competitiva y cotizadas**: las 6-10 cotizadas del sector con ticker, capitalización, crecimiento de ventas, margen EBITDA, ROIC, DN/EBITDA y PER y EV/EBITDA de los próximos 12 meses (misma base de cifras para todas; es la tabla de comparables), cuotas si se conocen y CR5 o HHI si hay fuente.
4. **Economía del negocio**: márgenes, intensidad de capital, circulante, conversión en caja y ROIC típicos (mediana y cuartil superior de las cotizadas), y qué separa a las mejores de la mediana (escala, mezcla, poder de precio).
5. **Ciclo y regulación**: sensibilidad a la economía (qué pasó en 2009, 2020 y 2022-2023), la regulación vigente y la que viene con fecha, y qué cotizadas tienen más exposición.
6. **Lo que vigilar**: tres o cuatro indicadores con fuente y periodicidad (precios, volúmenes, pedidos, licencias), y los riesgos del sector que un informe de empresa debe recoger en su sección 25.

Cierra con cinco líneas: dónde se gana dinero en la cadena, si el sector merece buscar oportunidades y en qué eslabón, y qué empresas de la cola o de la cartera se benefician o sufren.

## Cómo la usa un informe value

- Sección 3 (`sector`): tamaño, crecimiento, motores y regulación salen de la ficha (citada como fuente propia, con la fecha) y el analista solo actualiza lo que haya cambiado.
- `competencia.cuota_pct` y `dcf.sostenibilidad.mercado_final`: el perímetro y el tamaño de la ficha, para que la prueba de cuota compare lo mismo.
- `comparables.empresas`: el JSON de comparables de la ficha, llevado al cierre del día; se quitan o añaden empresas explicando por qué en `criterio`.
- Si la ficha tiene más de 30 días, el analista actualiza las cifras de mercado de los comparables y deja el resto.

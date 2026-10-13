# Diario · PepsiCo (PEP) · iteración 2 · corte 2026-10-09

- Commit de partida: `cf18597 Seguimiento con la convicción según criterios`. No se cambió el prompt durante el análisis. Sin commits.
- Inicio: 15:06 (hora de Madrid).
- Punto de partida: iteración 1 (`informes/pepsico-2026-10-08/`, Comprar, convicción baja, objetivo 151,16 USD con precio 123,73), que no se toca.

## Tiempos
- 15:06-15:12 · Fase 1: procedimiento, prompt y lecciones; lista de presentaciones de EDGAR. Resultados del 3T26 (12 semanas al 5-sep-2026) en el 8-K del 8-oct y el 10-Q del mismo día. Guía de BPA core a tipo constante rebajada de «parte baja de +4 % a +6 %» a «+1 % a +2 %». Precio: la sesión del 9-oct en Nueva York no ha cerrado (15:10 de Madrid); se usa el cierre del 8-oct, 128,34 USD (+3,7 % sobre el 7-oct). Descargadas la nota de prensa, el 10-Q y los comentarios preparados del 3T26; la transcripción del 3T26 aún no está publicada (la URL redirige al índice).
- 15:12-15:36 · Sesión anterior interrumpida tras la fase 1 (sin notas A-D). Se retoma a las 15:36.
- 15:38 · Notas A-D de la iteración 1 copiadas como punto de partida en `notas/`. Lanzados los cuatro subagentes con encargo acotado al 3T26: A (trimestre, LTM a sep-26, balance y flujos de 36 semanas, segmentos), B (comprobación ligera del sector y competidores), C (Form 4 y 8-K desde el 8-oct, historial de la guía con el recorte de 2026), D (precio, bolsa, consenso tras el 3T26, comparables y puente al 5-sep-2026).
- 15:40-15:45 · Terminan C (15:40), B (15:41), D (15:43) y A (15:44). Precio: cierre del 8-oct, 128,34 USD (la sesión del 9 no había cerrado). Consenso de BPA 2026e de 8,54 a 8,31 (MarketScreener), PO medio de 148,64 a 144,82. Bono a 10 años 5,22 %. Puente al 5-sep-2026: deuda 51.881, caja 11.163. LTM sep-26: ventas 98.241, EBITDA recurrente 18.720. B detecta la venta de Utz a Intersnack (jul-2026), ausente en la iteración 1. C envió por error en una consulta con curl a EDGAR el correo del usuario como User-Agent.
- 15:46-16:05 · Fase 6: DCF con margen del 19,2 % en 2026-2027 (consenso tras el 3T26) y 19,6 % a largo plazo (antes 19,8 %), crecimiento de 2026 al 5,8 % (guía ~6 %), tasa libre 5,22 %. DCF 163,03 USD; valor objetivo 152,55 (antes 151,16); rentabilidad total 23,4 %; DCF inverso: crecimiento del 0,2 % o margen del 16,9 %. Regla: Comprar con las dos primas; el motor sugiere convicción media.
- 16:05-16:15 · Fases 7-8: textos y resumen reescritos con el 3T26; Word (64 páginas, 28 gráficos, cobertura 91,5 %) y PDF; páginas 1-4 revisadas como imagen.

## Decisiones (iteración 2)
- **Convicción baja frente a la media sugerida**: la iteración 1 decía que una guía de BPA core por debajo del +4 % nos llevaría a Mantener, y se ha cumplido (+1-2 %). Se mantiene Comprar porque la rebaja ya está en las cifras y el valor no cae, pero la convicción se queda en baja: tercera rebaja a mitad de año, beneficio core del 3T26 sin aranceles −0,9 % y pago aplazado de poppi de 278 a 12 M.
- **Consenso en base «NIIF»** como en la iteración 1 (D volvió a proponer restar un 0,9 % de las ventas).
- **Utz/Intersnack** no entra en transacciones: el 8-K no publica valor empresa ni múltiplo; se menciona en el comentario.

## Fallos del sistema (iteración 2)
1. La sesión anterior se cortó tras la fase 1 sin dejar notas; se retomó copiando las de la iteración 1.
2. El subagente C hizo una consulta a EDGAR con `curl` poniendo el correo del usuario en el User-Agent. **Arreglo:** lección añadida; que el comando prohíba datos personales en cabeceras.
3. `integrar` no borra con `null` un campo de una nota (`ajuste_ebitda_pct_ventas` 0,9 de D queda en datos.json aunque la base sea «NIIF»); el motor lo ignora, pero confunde.

## Actualización v2 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`), salida `datos-v2.json` y `PepsiCo - 2026-10-09 v2.docx` / `.pdf`. Mismo precio (128,34 USD) y fecha de corte. Añade `dcf.sostenibilidad` y reescribe solo la frase del veredicto en «El negocio» de la síntesis.

| | v1 | v2 |
|---|---|---|
| Recomendación · convicción | Comprar · Baja (sugerida Media) | Comprar · Baja (sugerida Media) |
| Valor objetivo (WACC 7,54 %) | 152,55 USD, RTE 23,4 %, asimetría 2,05x | igual |
| Con la prima del mercado (WACC 7,14 %) | 166,39 USD, RTE 34,2 %, asimetría 3,69x | igual |
| Niveles | Comprar < 149,65; Vender > 182,91 | igual |
| ¿La calidad sostiene el crecimiento? | — | **En parte** (3,4 % medio proyectado) |

- **Puente**: 2026e = 0,5 volumen + 2,5 precio + 2,8 otros (divisa y compras de 2025, guía del 6 %) [21, 23]; 2027e = 1,0 + 1,8; 2028e = 1,5 + 2,0. **Mercado final: null**: la única cuota con perímetro es la de patatas fritas de bolsa en EE. UU. (56 % de 11.600 M) [50], ≈ 7 % de las ventas; no hay tamaño mundial (hueco del informe).
- **En parte**: foso de marcas y reparto directo y ROIC del 21,3 %, ventas al alza todos los años de 2017-2025; pero el poder de precios se agotó (PFNA baja precio en 2026 para recuperar volumen) y el base pide volumen en Norteamérica sin recortar precios.
- El motor no avisa de crecimiento sin financiar ni de cuota (reinversión neta del 9 % del NOPAT; capex 4,6-4,8 % frente a 3,7 % de amortización): **no se tocan supuestos**. Como es «En parte», la síntesis explica por qué el base queda por encima del orgánico de 2024-2025: el precio descuenta un 0,2 %, y con un 2 % anual desde 2027 (cálculo aparte con el mismo motor) el objetivo sería 141,29 USD (RTE 14,6 %): seguiría en Comprar.
- Convicción: el control ya estaba explicado en la síntesis (baja por la tercera rebaja de guía); no cambia.

**Fallos del sistema vistos**
1. La tabla «La decisión» dice «sin inversión neta» aunque la reinversión neta acumulada es de 13.175 M (9 % del NOPAT): el umbral de «activos ligeros» es demasiado amplio para un fabricante con capex por encima de la amortización. Arreglo: decir «inversión neta baja (9 % del NOPAT)» y calcular el crecimiento financiable igualmente.
2. El texto del motor mezcla dos casos («en un negocio de activos ligeros… en un comprador en serie…») en vez de elegir el que aplica.
3. Con `mercado_final` null no hay prueba de cuota en la tabla; para un grupo multicategoría sin tamaño de mercado mundial, la prueba queda en manos del texto.
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 140,41 USD, rentabilidad 13,9 %, señal Mantener (`revision-12m-2026-10-13.md`).

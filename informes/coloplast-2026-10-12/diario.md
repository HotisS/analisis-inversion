# Diario — Coloplast (COLO-B.CO), corte 2026-10-12

- Commit de partida: 5d3dc20 (Informe de Pro Medicus). Prompt: verticales/empresa/prompt.md de ese commit.
- 17:23 (Copenhague, sesión cerrada) Inicio. Primer análisis de Coloplast en el repo.
- Fase 1, identificación:
  - Coloplast A/S, acción B en Nasdaq Copenhague (COLO B, Yahoo COLO-B.CO, ISIN DK0060448595). DKK, NIIF-UE. Doble clase: A no cotizadas (10 votos) y B cotizadas (1 voto), mismos derechos económicos.
  - Ejercicio a 30-sep; la empresa lo llama «2024/25». **Etiqueta fijada: año en que termina** (`etiqueta_ejercicio: "fin"`, `cierre_ejercicio_mes: 9`): FY2025 = 2024/25; FY2026 = 2025/26, cerrado el 30-sep-2026 pero sin publicar. Trimestres: 1T26 = oct-dic 2025.
  - Calendario (anuncio de 11-feb-2026): resultados 2025/26 e informe anual el **3-nov-2026** (adelantados desde el 5-nov); junta el 1-dic-2026.
  - `bolsa.mjs` (COLO-B.CO, ^OMXC25, EXV4.DE, cierre-mes 9): cierre del 12-oct-2026, 446,30 DKK; máx. 52s 631,40 (5-nov-25), mín. 369,70 (18-jun-26).
  - Último informe: 9M 2025/26 (18-ago-2026): orgánico 6 %, EBIT antes de especiales 5.599 M (26 %), deterioro de 3.000 M del fondo de comercio de Kerecis en el 2T26, NIBD 22.986 M (2,6x), FCF 20 % de ventas, guía sin cambios (5-6 % orgánico, EBIT ~+5 % cc). Nuevo CEO Gavin Wood; actualización estratégica prometida para el 3-nov.
- 17:35 Lanzo los cinco subagentes A-E en primer plano con `notas/ENCARGO_COMUN.md`.
- 17:35-17:49 Los cinco subagentes terminaron en primer plano (E 8 min, B 10, C 12, D 13, A 13), con `_estado` y notas válidas en UTF-8 (sin «Ã»).
- Decisiones de integración:
  - Partidas especiales en `no_recurrentes_en_ebitda` (seis de siete años, ~1 % de las ventas): dicho en `financieros.ajustes`. LTM jun-26 con 3.306 M de especiales (3.000 de Kerecis): EBITDA LTM comparable 9.046 M.
  - Doble clase: 18 M A + 210,2 M B − 2,832 M autocartera; 225,3 M diluidas a precio de la B: capitalización 100.551 M. MarketScreener (94.100 M a 417,90) cuenta lo mismo: control explicado.
  - Voto libre en contra: no calculable (juntas de 2023-2025 sin recuento de votos); hueco de núcleo con la estimación de C en `extra`. Control: Coloplast Fonden con el 51,36 % de los votos desde el 1-oct-2026.
  - Puente a 30-jun-26: deuda 22.834, arrendamientos 969, caja 817 (NIBD 22.986 cuadra), pensiones 98, otras inversiones 119, otros ajustes 2.338 = contingente de Uromedica 210 + impuesto a largo de la IP de Kerecis 2.422 − activo fiscal 294. Deuda neta ajustada 25.422 M (2,8x).
  - Tasa libre: Bund 3,53 % (Bundesbank, 12-oct); corona en el MTC II (7,4748 DKK/EUR); bono danés 3,29 % de media en septiembre, por debajo del Bund. Beta 0,85 (0,79 ajustada frente al STOXX 600; 1,02 sectorial reapalancada). Prima 5,5 %. WACC 7,23 %; relativo 6,34 %.
  - Cuota para la prueba de sostenibilidad: 22,8 % del mercado accesible total (~122.000 M DKK, puntos medios de los rangos de la empresa; estimación propia) en vez del 37,5 % de ostomía, para que la cuota implícita compare el mismo perímetro. Mercado FY2035e 189.000 M (4,5 % anual).
  - Comparables: 7 de D; transacciones con peso 0 (Kerecis a 17,5x ventas sesga la mediana a 1.090 DKK). `multiplos_historicos` sin FY2026 (sin cuentas publicadas).
- Resultado: DCF 578,10; objetivo 555,17 (+24,4 %; total 29,5 % con el 5,2 % de dividendo); relativo 675,63. Alcista 688,94 (+54,4 %), bajista 358,27 (−19,7 %), asimetría 2,76x. DCF inverso: 1,4 % de crecimiento frente al 4,8 % base (margen implícito 27,9 % frente al 33 %); rentabilidad implícita 8,3 %. Consenso FY2027e-FY2028e: ventas −1,4/−1,7 %, EBITDA +1,8/+2,3 % frente al nuestro. Las dos reglas, Comprar; convicción sugerida Alta, **bajada a Media** por el riesgo binario con fecha del 3-nov (resultados y revisión de Impact4 del nuevo CEO).
- Word (57 páginas, 27 gráficos, cobertura 90,3 %) y PDF; revisadas como imagen las páginas 1-4. Síntesis de 627 palabras. Quedan 4 controles en «Revisar», todos explicados.

## Lecciones nuevas
- **ESEF de emisores de la UE**: filings.xbrl.org guarda gratis los informes anuales y trimestrales en ESEF (API `/api/filings?filter[entity.identifier]=<LEI>`); fue la vía de A con coloplast.com bloqueado. Merece `herramientas/esef.mjs --lei X`. El `.txt` que saca `descargar.mjs` de los XHTML parte las tablas: haría falta un `.tabla.txt` también para HTML.
- **Comunicados nórdicos**: MFN (`https://www.mfn.se/all/a/coloplast`) abre con `descargar.mjs` y enlaza los PDF de GlobeNewswire; las búsquedas por organización de GlobeNewswire dan 403. Las notas de Nasdaq Copenhague (`view.news.eu.nasdaq.com`) también bajan bien.
- **Dinamarca**: posiciones cortas ≥ 0,5 % en un xlsx mensual de la Finanstilsynet (página «published-net-short-positions»); no hay lector de xlsx en el repo (C escribió uno en %TEMP%). Las juntas danesas aprueban la remuneración sin recuento: el voto libre en contra no se puede calcular; registrar como hueco con la asistencia de la junta.
- **Doble clase con acciones A no cotizadas** (Coloplast): las A cuentan a precio de la B; el proveedor (MarketScreener) ya las incluye. El control puede cambiar de manos sin OPA por donación a una fundación (exención de la Finanstilsynet, 1-oct-2026).
- **Impuestos aplazados por traslados de propiedad intelectual** (Kerecis: 2.422 M a largo plazo, a pagar en Islandia): asimilables a deuda en el puente (~9,4 DKK por acción neto del activo fiscal).
- **Cuota de un solo mercado frente a mercado accesible total**: si la empresa publica cuotas por área, la prueba de sostenibilidad compara mejor con el total accesible (suma de puntos medios de los rangos, marcada como estimación) y la cuota de ventas sobre él.
- **MarketScreener con base mixta** (Coloplast FY2026e): EBITDA y EBIT antes de especiales, BPA después del deterioro; su EBITDA FY2026e implica una amortización de 1.856 M frente a ~1.470 M: usar el BPA ajustado de S&P Global (Stock Analysis) para el PER.
- Damodaran `betaEurope.xls` es BIFF binario y `descargar.mjs` lo guarda como .xlsx: no hay lector. `prompt-de.mjs` imprime también las lecciones (57 KB) y obliga a leer a trozos.
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 503 DKK, rentabilidad +18,0 %, señal Comprar (`revision-12m-2026-10-13.md`).
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada +14,8 % → +14,8 %, base +14,6 %, señal Mantener (`revision-12m-2026-10-13.md`).

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (5 años; mediana 44.3x, mínimo 33.3x, media larga 39.8x; antes v2 35.1x/23.8x/33.6x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v2.json y «Coloplast - 2026-10-12 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Comprar 26,0 % (antes v3 Comprar 47,8 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 15,8x / 18,6x / 24,2x, 14,8 % Mantener; con el tope anterior del base (×1,3, 14-oct mediodía): 47,8 % Comprar. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).

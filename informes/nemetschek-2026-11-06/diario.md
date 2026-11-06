# Diario — Nemetschek (NEM.DE), corte 2026-11-06 (tras los resultados del 3T26)

- Commit de partida: df11955 GigaCloud Technology (GCT): análisis value y growth del 6-nov-2026.
- Motivo: resultados del 3T26 publicados el 5-nov-2026 a las 07:00 (comunicado trimestral, nota de prensa, presentación y conferencia). Iteración anterior: `informes/nemetschek-2026-10-10/` (datos-v3.json). Metodología completa, sin subagentes: notas A-E copiadas de la anterior y rehechas en lo que cambia.
- Horas en hora de Madrid (`TZ=Europe/Madrid date +%H:%M`).

## Pasos

- 09:25 Fase 1. EUR, NIIF-UE, ejercicio natural, Xetra NEM (Yahoo NEM.DE), ISIN DE0006452907. Carpeta nueva con `notas/` y `notas/docs/`. Lectura del procedimiento, prompt, lecciones (núcleo, Alemania/UE, software) y METODO-VIGENTE §2 y §4.
- 09:26 `bolsa.mjs` (NEM.DE, EXS3.DE, EXV3.DE, corte 6-nov): la historia diaria de Yahoo llega al 4-nov (75,70) y no trae la barra del 5-nov. El cierre del 5-nov (68,00 EUR, −10,2 %) sale del `chartPreviousClose` del gráfico del 6-nov y lo confirman MarketScreener (68,00) y Tradegate (67,90). Precio del informe: 68,00 EUR, `fecha_precio` 2026-11-05 (la sesión del 6-nov no había cerrado). Datos: Yahoo a 6-nov.
- 09:27-09:29 Documentos del 3T26 (datos del 5-nov): nota de prensa (EQS), comunicado trimestral con estados completos y presentación (enlaces sacados de la página de informes con WebFetch; descargados con `descargar.mjs`), resumen de la conferencia (MarketBeat). Lectura con `pdftotext -layout`.
- 09:30 `cuentas.mjs --esef`: falla con el nombre y con el LEI (391200QSLOCQDLVZHY72, 404). filings.xbrl.org no tiene a Nemetschek (lección de Alemania). Las cuentas anuales 2016-2025 siguen siendo las de la nota A anterior (informes anuales, comprobadas el 10-oct); el 3T26 sale del comunicado y la presentación. Hueco registrado.
- 09:30-09:32 Consenso y mercado (datos del 4-nov al 6-nov): MarketScreener (estimaciones del 4-nov, aún sin actualizar), Yahoo quoteSummary (6-nov: BPA e ingresos, tendencia de revisiones, 18 analistas, objetivo medio 87,13), prensa con cambios de objetivo tras los resultados (mwb, Morgan Stanley, Jefferies, DZ, JPMorgan) y consenso previo del trimestre (orgánico 13,6 %, BPA 0,46). Bund del Bundesbank (3,27 % el 5-nov). Damodaran: prima implícita de noviembre 4,41 %. Comparables: precios de Yahoo del 9-oct y del 5-nov y BCE del 5-nov.
- 09:32 Gobierno (C): EQS sin operaciones de directivos ni hechos relevantes nuevos desde el 20-ago (solo el aviso de BlackRock del 10-sep, ya en la nota). Sentimiento (E): foro de wallstreet-online sin actividad nueva, RSS de Seeking Alpha sin análisis desde julio, comentario de Kapitalmarktexperten sobre la dilución de Thoma Bravo.
- 09:33 Notas A, D y E actualizadas con un script de scratchpad (trimestres 4T24-3T26, LTM sep-26, KPI, puente a 30-sep, consenso, comparables, fuentes). `movimiento.mjs NEM.DE` (6-nov, intradía 68,15) y `noticias.mjs --meses 12` para la regla 13; causas de junio y julio en prensa (Oracle, recortes de objetivo de Jefferies y Goldman; cierre de HCSS y guía ampliada).
- 09:35 Supuestos nuevos (`notas/supuestos.mjs`) y BPA propio de 2026e-2028e con el minoritario antes de impuestos; primer cálculo.
- 09:39 Textos (`notas/textos.mjs`) y resumen (`notas/resumen.mjs`) reescritos con las cifras del motor; bloque `bolsa.contexto` y `valoracion.objetivo_12m`.
- 09:41 Integración y cálculo: 19 de 21 controles correctos y 2 explicados (2019 NIIF 16; Procore). Síntesis ajustada a 649 palabras.
- 09:43 Word (58 páginas, cobertura 92,4 %) y PDF con LibreOffice; portada y síntesis revisadas como imagen.
- 09:43 `revision-12m-2026-11-06.md`; `apuntar-12m.mjs --precios` con candado (NEM: Mantener 23,2 % a 73,55 → Comprar 39,7 % a 68,00); `simbolos.json` → carpeta nueva, con candado. `comprobar.mjs`: 0 errores.
- 09:44 `robustez.mjs` (sin --escribir): SÓLIDA; si la tienes, Mantener; filtro de mantener 86,35; compra robusta sí, nivel A (A 74,42; B1 77,80); colchón de BPA 18 % / 22 %.

## Decisiones

- **Puente a 30-sep-2026** (HCSS ya en balance): deuda 689,8, arrendamientos 43,6, caja 263,9, pensiones 2,4, asociadas 14,3, otros ajustes 0. **Minoritarios 1.841,8 M** = 767,1 contables + 1.074,7 M que la empresa llevó a reservas por la «adquisición de una filial»: el ≈ 28 % de Build entregado a Thoma Bravo se registró a 1.791,4 M. Sustituye a la estimación propia de octubre (1.900 M) por un dato de la empresa.
- **Impuesto del DCF 20,5 %** (antes 23 %): Build tributa por transparencia y el grupo solo paga por su 72 % (tipo de 9M26 20,1 %). El minoritario se resta en el puente por su derecho antes de impuestos.
- **Amortización** al 8,4 % (2026e) y 9,2 % (2027e) de las ventas, con la de HCSS (≈ 80 M al año); antes, 6,0 y 6,5 %.
- **Crecimiento 2027e** +21,0 % (antes +20,0 %): HCSS entera; orgánico ≈ 10,5 %, algo menor que en octubre por el 3T26. 2028e +12,0 % (antes 12,5 %).
- **BPA en base publicada** en casos e historia del PER (`base_bpa: "publicado"` en los dos). BPA 2028e 2,10 / 2,65 / 2,94 (antes 2,28 / 2,83 / 3,09). El consenso (3,22) mezcla BPA ajustado; aviso D7 de robustez explicado.
- **Comparables**: estimaciones de MarketScreener del 9-oct llevadas al 5-nov con la variación de precio (los comparables subieron mucho tras sus resultados: Bentley +28,5 %, Procore +34,5 %); limitación declarada.
- **Convicción media**, la sugerida. Comprar por la regla (las dos reglas coinciden).

## Qué ha cambiado frente al 10-oct

- Resultados del 3T26: ingresos 371,1 M (+26,6 %; +12,5 % orgánico a tipo constante frente al 13,6 % esperado), EBITDA 115,9 M (31,2 %; orgánico 34,8 %, +2 % sobre el consenso según JPMorgan), BPA 0,40 EUR (0,46 esperado). Guía de 2026 confirmada; Manage y Media la rebajan. La acción cayó un 10,2 % el 5-nov.
- DCF 76,10 → 82,04 EUR; valor intrínseco 73,35 → 79,30; objetivo a 12 meses ponderado 89,93 → 94,30; rentabilidad ponderada 34,4 % → 39,7 % (base 33,7 % → 38,6 %; v2 22,1 % → 26,9 %).
- **Nuevo riesgo de calidad**: el capital invertido pasa de 1.118 M (2025) a 3.380 M (sep-26). Con las cuentas anuales de 2026 (marzo de 2027) el ROIC del motor bajará a ≈ 11 % (estimación propia con capital medio), ≈ 3 puntos sobre el WACC: por debajo de los 4,5 del filtro de mantener. Hoy el motor aún usa el ROIC de 2025 (19,2 %; ROIC − WACC 10,9).

## Revisión a 12 meses

- 2026-11-06: objetivo a 12 meses 94,30 EUR (v3 con tope ×1,1, elegida por el selector), ponderada +39,7 %, base +38,6 %, Comprar; v2 de control +26,9 % Comprar. Detalle en `revision-12m-2026-11-06.md`. Apuntado con `apuntar-12m.mjs --precios`.

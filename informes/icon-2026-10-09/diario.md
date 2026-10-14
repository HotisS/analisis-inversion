# Diario — ICON plc (ICLR), corte 2026-10-09

- Inicio: 2026-10-09 10:30 (Madrid). Commit del repo: 2a53e46 (Informe de Cooper Companies). Prompt sin cambios durante el análisis.

## Fase 1 — Identificación (10:30-10:32)
- ICON plc, Nasdaq ICLR, ISIN IE0005711209, CIK 1060955, sede Dublín. US GAAP, cuentas en USD, ejercicio a 31-dic. Emisor extranjero: 20-F y 6-K (sin proxy ni Form 4; Form 144 sí).
- Hallazgo clave: investigación del comité de auditoría (anunciada 12-feb-26) sobre reconocimiento de ingresos; 6-K de no fiabilidad (29-abr-26); NT 20-F; aviso de Nasdaq; 20-F 2025 presentado tarde (27-may-26) con 2023 y 2024 reexpresados; 6-K/A reexpresa 9M25. Debilidades materiales de control.
- Nuevo CEO: Barry Balfe (elegido en la junta del 31-jul-26). Presidente Ciaran Murray.
- Refinanciación: bonos de 2.150 M USD (13-ago-26) para devolver un puente garantizado, los préstamos a plazo y los bonos 2027.
- Próximos resultados: 3T26 el 27-oct-26 tras el cierre (6-K del 8-oct-26).
- Subagentes A-D lanzados 10:32.
- Corte por límite de uso hacia las 10:47; reanudado a las 15:03 por el coordinador (notas A-D completas). Sin relanzar subagentes.

## Fase 5-6 — Integración y primer cálculo (15:05-15:20)
- Leídos diario, comando, prompt entero y lecciones. Integración sin citas huérfanas (88 fuentes, 17 huecos).
- Primer cálculo: DCF 154,88 USD (−5,8 %), WACC 10,10 %, VT 55 %; objetivo 166,62 (+1,3 %); regla absoluta Mantener, relativa Comprar (195,76 con la prima del 4,2 %) → Mantener, convicción sugerida Baja.
- Controles en «Revisar»: tipo impositivo 2023-2025 (3,2-9,1 %, Irlanda e impuestos diferidos de la amortización de PRA: se explica), R² de la regresión 0,05 (no se usa), rentabilidad y riesgos vacías (las escribo).
- Comparables: el motor no admite `excluir` en comparables; quito WuXi AppTec y Tigermed (China, EBITDA con plusvalías, margen 60 %) y dejo seis (IQVIA, Medpace, Charles River, Labcorp, Fortrea, Thermo Fisher). La mediana NTM apenas cambia (14,7x → ~14,6x).
- Base del EBITDA: contable con pagos en acciones, reestructuración y costes de transacción dentro (2,6 puntos de ventas por debajo del ajustado de ICON); consenso con `base_ebitda: ajustado` y ajuste 2,6 %.

## Fases 6-8 — Supuestos, redacción y comité (15:20-15:55)
- Pesos 45/40/15 (DCF/escenarios/comparables): la muestra de comparables es frágil (13,4-15,7x al quitar una) y no recoge el descuento por la reexpresión. Con 40/20 la regla absoluta daba Mantener (+1,3 %); con 45/15, Vender (−0,8 %, asimetría 0,48). Relativa Comprar (194,24, +18,1 %). Se contradicen → Mantener; convicción Baja (sugerida).
- Cambio de perímetro de 2025 retirado (Symphony se vendió en 2026; el deterioro no es un cambio de perímetro): Altman y Beneish vuelven a ser interpretables. Beneish −2,61: no detecta la reexpresión.
- DCF inverso: el precio pide 4,9 % de crecimiento (base 4,1 %) y 17,2 % de margen final (≈ 20 % ajustado, el de 2024); rentabilidad implícita 9,8 % frente a WACC 10,1 % y 8,9 % del mercado.
- Comité: supuesto más agresivo, crecer al 5 % en 2028-2030 tras tres años al ~1 %; proyección dentro del 3,1 % del consenso; bajista basado en lo ya ocurrido en 2025-26. Síntesis 648 palabras.
- Tropiezo: reescribir la síntesis con node -e dentro de Bash rompió las comillas y dejó el archivo vacío; rehecho con Edit.
- Controles: 15 correctos y 5 explicados (tipo impositivo 2023-2025, regresión, fragilidad de comparables).
- Entrega 15:58: Word y PDF (59 páginas), páginas 1-4 revisadas como imagen; lecciones y seguimiento actualizados.

## Actualización v2 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`), salida `datos-v2.json`, `ICON - 2026-10-09 v2.docx` y su PDF. Añade `dcf.sostenibilidad` (puente de ingresos 2026e-2030e, mercado final y veredicto) y la frase obligatoria en «El negocio» de la síntesis; para no pasar de 650 palabras se quitan de la síntesis la frase de múltiplos (12,8x frente a 14,6x), el Beneish y el detalle «nueve… sin compras». Ninguna cifra del DCF cambia: mismo precio (164,50 USD) y fecha de corte.

| | v1 | v2 |
|---|---|---|
| Recomendación · convicción | Mantener · Baja | Mantener · Baja |
| Valor objetivo (WACC 10,10 %) | 163,26 USD, RTE −0,8 % | 163,26 USD, RTE −0,8 % |
| Con la prima del mercado (4,20 %, WACC 8,92 %) | 194,24 USD, RTE +18,1 % | 194,24 USD, RTE +18,1 % |
| Comprar por debajo / vender por encima | 155,42 / 202,28 USD | 155,42 / 202,28 USD |
| Sostenibilidad | — | **En parte** (las tres pruebas pasan) |

- **Las pruebas pasan**: crecimiento medio proyectado del 3,5 %, por debajo del 4,5 % previsto para el mercado; la cuota implícita baja del 11,0 % al 10,0 % en 2035e (mercado final de 116.500 M USD = 75.000 M de desarrollo clínico externalizado en 2025 [18] al 4,5 % anual [25], el mismo perímetro de `competencia.cuota_pct`). Reinversión neta acumulada de −554 M: no pide capital nuevo, así que no hay crecimiento financiable ni ROIC implícito que comparar (ROIC 6,8 %, incremental histórico 4,2 %).
- **Veredicto «En parte», no «Sí»**: el foso se estrecha (+0,8 % anual en 2023-2025 frente al +34 % acumulado de Medpace), no hay subidas de tarifa publicadas y el ROIC está bajo el WACC; el +5 % de 2028-2030 supone dejar de perder cuota. Como el caso base ya queda por debajo de lo que pide la prueba (la cuota baja), no se rebaja: la actualización es de método.
- Puente: volumen y precio son reparto propio (ICON no publica precio); 2026e lleva −0,6 puntos en «otros» por Symphony, vendida en mayo (estimación propia, sin cifra publicada de sus ingresos).

**Fallos del sistema vistos**
1. La reinversión neta sale negativa porque la amortización incluye 227 M de intangibles de PRA: el motor escribe «activos ligeros» y menciona al «comprador en serie» sin serlo (ya anotado en lecciones como «Activos ligeros engañoso»). Arreglo: separar la amortización de intangibles comprados de la depreciación al medir la reinversión.
2. El motor pasa la prueba de cuota cuando la cuota baja, pero no avisa de años concretos que la recuperan (aquí 2028-2030 a +5 % frente a un mercado al 4,5 %): la prueba es de punto final, no de trayectoria.
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 196,15 USD, rentabilidad +19,2 %, señal Comprar (`revision-12m-2026-10-13.md`).
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada +19,2 % → +20,0 %, base +17,8 %, señal Mantener (`revision-12m-2026-10-13.md`).

- 2026-10-14: datos-v3.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (5 años; mediana 50.5x, mínimo 29x, media larga 49.7x; antes v2 27.6x/23.6x/28.1x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.

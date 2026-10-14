# Diario · Visa (V) · 14-oct-2026

- Commit de partida: e6cdb57 (Halma, 14-oct; método v2 con regla de múltiplos común).
- Entorno: nube de Claude Code, red limitada a WebSearch (sin WebFetch, curl, descargar.mjs ni bolsa.mjs). Cifras de extractos de búsqueda con su URL.
- Fecha de corte: 2026-10-14. Divisa: USD. Cierre: septiembre (FY = año en que termina; FY2026 cerró el 30-sep-2026, resultados ≈28-oct). Ejercicio objetivo 12 m: FY2028e.
- 11:14 UTC: inicio.
- Fuentes: 8-K de resultados (FY2022-FY2025 y trimestres FY2025-26), 10-K FY2021-FY2025, 10-Q del 3T FY2026, proxy 2026, Nilson, Zacks vía prensa, Stock Analysis, Macrotrends, GuruFocus/Yahoo. Comparables y transacciones reutilizados del análisis de Adyen del 12-oct (cierre del 9-oct) y pasados a USD al 1,1181 del BCE; bono a 10 años (5,22 %, 13-oct) del análisis de Group 1 del mismo día. Unas 30 búsquedas web.
- Confianza: media en cuentas FY2022-FY2025, guía, precio y consenso (cruzados con dos extractos); baja en balance antiguo, gobierno (sin votos de junta, 13G ni Form 4), bolsa (sin betas ni rentabilidades) y sector (solo transacciones de Nilson). Algunas cifras de FY2021-FY2023 (impuestos, deuda, recompras de FY2022-23) salen de un solo extracto o de la diferencia entre líneas publicadas.
- Decisiones: BPA y PER en base ajustada (la de Visa); provisiones de litigios cubiertos fuera del EBITDA del DCF (las paga el escrow financiado con la clase B), 2.900 M como no recurrentes en FY2025 (estimación). Acciones clase A equivalentes 1.880 M (estimación desde la media diluida del 3T, 1.900 M). Historia del PER solo FY2022-FY2025 (sin precios verificados antes). Beta 0,90 sin dato verificado. Terminal 3,0 %. FY2026e fijo (+14,3 %).
- Subagentes: no (encargo: sin subagentes). Notas A-E escritas a mano; propio.mjs + supuestos.mjs + textos.mjs + resumen.mjs.
- 11:30 UTC: integración y cálculo con 16 de 16 controles; Word (rellenar.mjs, cobertura 79 %) y PDF con soffice.
- Línea 12 m: Visa · FY2028e · BPA 14,80 / 16,40 / 17,26 · PER 23,7x / 26,7x / 26,8x · objetivo ponderado 422,27 USD (+7,2 %), base 437,88 (+11,2 %) · VI 290,56 (−26,6 %) · Mantener, convicción media · compra < 290,56 · consenso 419,36. Detalle en revision-12m-2026-10-14.md.
- Fin: ≈11:35 UTC (≈25 min de reloj).

## Lecciones
- Visa (clase A con clases B/C y preferentes convertibles): usar acciones «clase A equivalentes» (base del BPA diluido) y tratar las provisiones de litigios cubiertos de EE. UU. como no caja para la clase A (las paga el escrow que diluye a la clase B); dejarlas fuera del EBITDA del DCF y del BPA del objetivo, y decirlo.
- Los comparables de un análisis de 1-3 días antes con divisa distinta (Adyen en EUR) se reutilizan pasando la capitalización con el tipo del BCE de la misma fecha; los múltiplos no cambian.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 25.3x, mínimo 21.5x, media larga 26x; antes v2 26.8x/23.7x/26.8x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v2.json y «Visa - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener 2,2 % (antes v3 Mantener 2,2 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 23,7x / 26,7x / 26,8x, 7,2 % Mantener. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).

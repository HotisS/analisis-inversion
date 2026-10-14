# Diario · Danaher (DHR) · 14-oct-2026

- Commit de partida: 25ae421 (Visa, 14-oct). Prompt sin cambios. Presupuesto corto (≈18-20 min): no se leyó el prompt entero; se siguió la estructura del análisis de Thermo Fisher de hoy.
- Entorno: nube, solo WebSearch (WebFetch, curl, descargar.mjs y bolsa.mjs no se probaron). 15 búsquedas. Sin subagentes; notas A-E con un builder en el scratchpad.
- Precio: 215,60 USD, implícito en la capitalización del 7-oct (151.570 M, Stock Analysis, citada en la nota D de Thermo Fisher) / 702,9 M de acciones. Último cierre encontrado: 200,14 USD (12-sep). Resultados 3T26: 21-oct-2026.
- Confianza: Media en BPA ajustado, FCF, balance de junio y guía; Baja en EBIT/amortizaciones (estimados), gobierno (sin proxy), bolsa y PER histórico (solo 3 años limpios). Sector y ESG reutilizados de Thermo Fisher (las citas A12, A14, A15, C2 de esos textos quedan sin fuente en esta carpeta).

## Decisiones
- EBITDA GAAP estimado (EBIT ≈4.690 + amortización ≈2.400 en 2025) en el DCF; BPA ajustado en el objetivo a 12 m.
- PER histórico: solo 2023-2025 (2020-2022 covid; antes, escisiones de Envista y Veralto).
- Sostenibilidad «Sí» (orgánico 4-6 % = mercado; Masimo ya pagado). No se rebaja el base.
- Controles: 14 de 16; pendientes «10 fuentes primarias» (explicado) y fuentes sin citar.

## Resultado
- **Mantener**, convicción Media. VI 150,84 USD (−30,0 %); DCF 119,97 (WACC 9,20 %); el precio descuenta un crecimiento del 12,4 % anual.
- **Línea 12 m**: objetivo 245,70 USD; ponderada +14,6 %, base +10,0 % (con dividendo); bajista 186,23 / base 235,87 / alcista 324,82 (PER 19,5x / 22,9x / 29,8x × BPA 2028e 9,55 / 10,30 / 10,90). Consenso 230,89. Comprar por debajo de 150,84; vender por encima de 274,46. No se ejecutó apuntar-12m.mjs ni seguimiento.mjs.

## Huecos principales
Cierre del 13-oct; cuenta de resultados publicada (EBIT, amortizaciones, impuestos); segmentos y geografías; proxy (remuneración, voto, Form 4); rentabilidades de bolsa; consenso 2027e; foros (Reddit, Seeking Alpha, Stocktwits sin hilos).

## Lecciones
- Con presupuesto de 18 minutos, copiar la estructura de notas y textos de un comparable del mismo día (Thermo Fisher) e importar sus textos de sector desde su `textos.mjs` ahorra la mitad del tiempo; ojo: arrastra citas a fuentes de la otra carpeta.
- En Danaher el PER actual (22,9x sobre 2027e) queda muy por debajo de la mediana (30,5x): la regla usa el actual en el base y el alcista sube a 29,8x, lo que infla la ponderada; mirar el base.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 40.3x, mínimo 34.4x, media larga 40.1x; antes v2 30.5x/29.3x/30.2x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v2.json y «Danaher - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener 26,1 % (antes v3 Mantener 49,0 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 19,5x / 22,9x / 29,8x, 14,6 % Mantener; con el tope anterior del base (×1,3, 14-oct mediodía): 49,0 % Mantener. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).

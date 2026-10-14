# Diario · Givaudan (GIVN) · 14-oct-2026

- Commit de partida: a3fc7ce (el clon avanzó a 1a222c5 por otras sesiones durante el trabajo; el prompt y el motor no cambiaron).
- Entorno: nube de Claude Code. La red solo deja la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan. Las cifras salen de extractos de búsqueda (comunicados de Givaudan citados por la búsqueda, Stock Analysis, MarketScreener, Fintel, Stockopedia, cash.ch/AWP, Reuters vía Euronext y MarketScreener), con la URL como fuente. **Confianza baja-media**: ventas, EBITDA, beneficio, caja libre, deuda neta y dividendo cuadran con los comunicados; faltan impuestos y resultado financiero exactos (tipo del 15 % estimado), deuda bruta y caja, la deuda neta de junio (estimada en ≈4.500 M con el ratio 2,8x), beta, rango de 52 semanas, gobierno detallado y segmentos en cifras.
- Fecha de corte: 2026-10-14. Divisa: CHF. Cierre: diciembre. Precio: 3.714 CHF, el nivel que la prensa (Investing.com/Reuters) da a la sesión del 13-oct tras las ventas de nueve meses (+6,5-7 %); el cierre exacto y el del 14-oct no salieron. Cierres anuales = PER anual de MarketScreener × BPA diluido (estimación).
- Tiempos: 13:00 inicio · 13:15 fin de la investigación (≈24 búsquedas) · 13:26 informe calculado, Word y PDF · 13:30 revisión 12 m y diario.
- Decisiones:
  - Notas A-E escritas por mí sin subagentes (generadas con `notas/notas_build.py`); las citas cruzadas se copian como fuente local (`integrar` las une por URL).
  - Balance: deuda financiera = deuda neta publicada (caja 0); sin fila de 2024 (solo deuda), porque el motor sacaba un ROIC de 29,6 % sin patrimonio. ROIC 2025 = 14,2 % con todo el fondo de comercio.
  - WACC 5,19 %: bono suizo 0,54 % (del informe de Roche), beta 0,75 estimada, prima 5,5 % + 1 punto adicional (como Roche), deuda al 2 %, 12 % de deuda. Terminal 1,0 % en CHF.
  - Sostenibilidad: el motor no hace la prueba (amortización de intangibles comprados > capex: reinversión negativa); hecha a mano. Cuota estable (≈21 %); el problema era el crecimiento en francos (4,5 % inicial frente al 3,1 % anual de 2019-2025 con compras). **Base rebajado a 3,5 % en 2027-2030** (≈1 punto anual de divisa): DCF de 3.729 a 3.482 CHF. Veredicto «En parte».
  - Circulante: 21,6 % de las ventas (clientes de dic-25) en vez de 0, que daba un control en rojo.
  - PER histórico sin 2020-2021 (54,2x y 46,6x de tipos cero). BPA en base publicada (la fórmula da ≈114 frente a 115,5 en 2025).
  - Convicción baja, la sugerida por el motor (la regla absoluta da Vender y la relativa Mantener: depende de la tasa).
- Resultado: **Mantener, convicción baja.** Valor intrínseco 3.233,97 CHF (−12,9 %); DCF 3.481,66; con la prima implícita del mercado, 4.046,65 (+9,0 %). DCF inverso: crecimiento del 3,6 % (base 2,7 %) o margen del 25,7 % (base 24,5 %). 16 de 17 controles correctos y 1 explicado (4 comparables). 45 fuentes.
- Línea 12 m: objetivo 3.880,86 CHF → ponderada +6,4 %, base +6,9 % (PER 27,1 / 29,5 / 31,9x × BPA 115,6 / 132,1 / 144,1) → Mantener; compra < 3.233,97 CHF, venta > 4.392,07 CHF. Consenso 3.461 CHF (19 analistas, julio); objetivos recientes 3.800-3.968. Detalle en `revision-12m-2026-10-14.md`. No pasa los requisitos de compra de MEMORIA (rentabilidad y valor real); calidad: ROIC − WACC 9,0 puntos.
- Pendiente (no hecho por encargo): `apuntar-12m.mjs`, `seguimiento.mjs`, cola, commit y push.

## Lecciones

- Empresas con mucha amortización de intangibles comprados (Givaudan): con circulante y capex razonables la reinversión neta sale negativa y el motor no hace la prueba de sostenibilidad; la prueba útil es el crecimiento en la divisa de las cuentas frente al histórico, porque el plan de la empresa habla en moneda local (en Suiza, el franco resta 1-3 puntos al año).
- Con el balance a medias (solo deuda neta de un año), el motor calcula el capital invertido sin patrimonio y saca un ROIC disparatado: mejor no meter esa fila.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 32x, mínimo 29.3x, media larga 36.3x; antes v2 32.2x/27.1x/31.9x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v2.json y «Givaudan - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener 10,9 % (antes v3 Mantener 10,9 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 27,1x / 29,5x / 31,9x, 6,4 % Mantener. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).

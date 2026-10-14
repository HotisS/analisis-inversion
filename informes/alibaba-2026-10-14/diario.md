# Diario · Alibaba (BABA) · 14-oct-2026

- Commit de partida: 8576e98 (Sectra, 14-oct).
- Entorno: nube de Claude Code. La red solo deja la búsqueda web (WebSearch); EDGAR, HKEX, la web de la empresa, Yahoo y los proveedores no abren, y `descargar.mjs`/`bolsa.mjs` no funcionan. Reddit está bloqueado para el buscador. Cifras de los extractos de búsqueda de los 6-K y del 20-F, de Stock Analysis/Fintel y de prensa, con la URL como fuente. Confianza general: **Baja-Media** (cuentas de FY2025-26 y 1T27 cruzadas con dos extractos; FY2022-23 del resultado operativo y precios de marzo de 2022 con una sola fuente o derivados).
- Identificación: ADS de NYSE (1 ADS = 8 ordinarias de 9988.HK). Cuentas en RMB (US GAAP), cierre en marzo, etiqueta «fin». Precio 110,85 USD (cierre 13-oct, Morningstar) × 6,70 RMB/USD (yuan extraterritorial a 30-sep) = 742,70 RMB. Acciones: 19.885 M ordinarias tras la colocación de 710 M de agosto = 2.486 M de ADS (capitalización ≈276.000 M USD, cuadra con Stock Analysis).
- 12:42 inicio · 12:52 búsquedas de núcleo (≈30) · 12:55 notas A-E (`notas/construir.mjs`) · 12:56 primer cálculo · 12:58 Word y PDF.
- Decisiones:
  - BPA de la regla a 12 meses en base **no GAAP** de la empresa: el publicado lleva cada año revalorizaciones de participadas y plusvalías (Trendyol en FY2026), la misma trampa que Amazon. Historia limpia FY2022-25; fuera FY2026 (BPA hundido por la inversión) y FY2020-21 (burbuja).
  - EBITDA = resultado operativo + (EBITDA ajustado − EBITA ajustado) + amortización de intangibles; deterioro del fondo de comercio a `no_recurrentes_en_ebitda`.
  - Puente a 30-jun-2026: caja líquida 474.505 M, deuda 293.165 M (Stock Analysis), colocación como caja (−68.600 M en `otros_ajustes`), participadas por el método de la participación a valor contable (206.803 M, Ant incluida); los valores estratégicos no se suman para no duplicar la tesorería a largo plazo. Minoritarios estimados (65.384 M).
  - WACC en RMB: bono chino 1,67 %, beta 1,0, prima 5,5 %, prima adicional 2,9 (país + VIE/1260H); terminal 1,1 % (≤ tasa libre − 0,5).
  - Sostenibilidad: la prueba del motor falla (ROIC FY2026 4,5 %, capital nuevo al 51 %); rebajado un punto el crecimiento de todos los años; el resto es recuperación de margen. Veredicto «En parte», control explicado.
- Resultado: 17 de 19 controles + 2 explicados (capital nuevo; sector vacío). Vender, convicción Baja (reglas discrepan). DCF 874,85 RMB (130,57 USD); valor intrínseco 807,95 RMB (120,59 USD, +8,8 %).
- **Línea 12 m**: objetivo ponderado 565,83 RMB (84,45 USD) → −22,8 %; base 642,72 RMB (95,93 USD) → −12,5 %; señal Vender; compra < 74,38 USD. Detalle en `revision-12m-2026-10-14.md`. No se ha ejecutado `apuntar-12m.mjs` ni `seguimiento.mjs` (encargo).
- Huecos principales: sector (tamaño de mercado), segmentos con ingresos, partidas de la cuenta (impuestos, minoritarios), consejo y votos, transacciones, comparables chinos con EBITDA y capitalización, beta y volatilidad.

## Lecciones

- Emisor chino en ADS con cuentas en RMB: todo por ADS en RMB, `tipo_cambio` = RMB por USD; el PER histórico necesita el cierre de marzo × el tipo de conveniencia de cada comunicado.
- Alibaba: el BPA publicado no sirve para el PER (revalorizaciones de participadas cada año); el no GAAP de la empresa sí, y la fórmula del BPA propio cuadra sumando los pagos en acciones y ≈15.000-20.000 M de intereses netos y participadas.
- Con tasa libre china (1,67 %) el terminal queda en ≈1,1 % por la regla de coherencia; el riesgo VIE/geopolítico va en `prima_adicional_pct`.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 22.1x, mínimo 9.7x, media larga 19.8x; antes v2 12.98x/8.4x/12.26x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.

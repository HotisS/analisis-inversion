# Diario · Tencent (0700.HK) · 14-oct-2026

- Commit de partida: b4de659 (Nestlé, 14-oct). Prompt y método v2 con la regla de múltiplos común.
- Entorno: nube de Claude Code. La red solo deja la búsqueda web (WebSearch); HKEX, tencent.com, Yahoo y los proveedores no abren; `descargar.mjs` y `bolsa.mjs` no funcionan. Cifras de los extractos de búsqueda de los comunicados de resultados (2T26, 2025, 2024), del informe anual 2025 (activo, patrimonio, pasivo) y de Stock Analysis/Stockopedia (cuenta, flujos, caja), con la URL como fuente. Comparables estadounidenses y chinos reutilizados de los informes del repo de Meta, Alphabet, Netflix y Alibaba (7-14 oct). **Confianza general: Baja-Media**: titulares y totales cruzados con dos fuentes; segmentos de 2021-2024 y patrimonio por año de las cuentas anuales sin poder abrir el documento (cuadran con los totales); faltan impuestos, financiero, circulante y deuda de 2021-2023.
- Identificación: Tencent Holdings Limited, 0700.HK (HKEX, HKD), ISIN KYG875721634, cuentas en RMB (NIIF), cierre en diciembre, etiqueta «fin». Precio 425,20 HKD (cierre 13-oct, Yahoo) × 0,859 RMB/HKD (6,70 RMB/USD ÷ 7,80) = 365,25 RMB. Acciones diluidas 9.250 M (estimación: 9.118 M emitidas en mayo − recompras + ≈2,5 % de dilución).
- 13:38 inicio · 13:40-13:58 búsquedas (≈30) · 14:00 notas A-E (`notas/construir.py`) · 14:02 primer cálculo · 14:06 textos y resumen · 14:07 Word y PDF.
- Decisiones:
  - EBITDA = resultado operativo sin «otras ganancias» (Stock Analysis) + amortización de inmovilizado y derechos de uso: deja fuera las revalorizaciones de participadas; la amortización de contenidos queda como gasto.
  - BPA de la regla a 12 meses en base **no NIIF** (el NIIF salta con la cartera: 224.822 M en 2021, 115.216 M en 2023). Fórmula propia cuadrada con 2025 (259.900 M frente a 259.600 M). Historia limpia 2023-2025; 2022 excluido (BPA deprimido); sin precios de 2018-2021.
  - Puente a 30-jun-2026: caja 511.200 M, deuda 453.000 M (caja − caja neta), minoritarios contables de dic-25, participaciones (487.200 cotizadas + 387.900 no cotizadas) con un 20 % de descuento = 700.080 M.
  - WACC en RMB como Alibaba: bono chino 1,67 %, beta 1,0, prima 5,5 %, adicional 2,9 (VIE, 1260H, regulación); terminal 1,1 %. WACC 9,31 %.
  - Inversión en IA: capex 22 % de las ventas en 2026e bajando a 10,5 %; amortización del 4,5 % al 10,5 % en 2029e.
  - Sostenibilidad: el motor no hace la prueba (reinversión 12 % del NOPAT); a mano, el capital nuevo de 2026-28 rinde ≈15 % < ROIC incremental histórico 20,6 %: no falla, no se rebaja el base. Veredicto «En parte» (rentabilidad de la IA sin probar).
- Resultado: 16 de 16 controles (uno explicado: base −32,7 % frente al consenso). Mantener, convicción Media (la sugerida). DCF 464,31 RMB; valor intrínseco 470,61 RMB (547,9 HKD, +28,8 %). ROIC 17,5 % − WACC 9,31 % = 8,2 puntos.
- **Línea 12 m**: objetivo ponderado 404,75 RMB (471,2 HKD) → +12,1 %; base 391,37 RMB (455,6 HKD) → +8,5 %; señal Mantener; compra < 353,70 RMB (411,76 HKD). Detalle en `revision-12m-2026-10-14.md`. No se ha ejecutado `apuntar-12m.mjs` ni `seguimiento.mjs` (encargo).
- Huecos principales: bolsa (beta, rentabilidades), transacciones, sector (serie y cuotas), competidores con cifras, remuneración y votos, circulante y deuda de 2021-2023, consenso de ingresos y EBITDA, foros directos (Reddit/Stocktwits/LIHKG/Futu no accesibles).

## Lecciones

- Empresas holding de internet (Tencent): el ROIC del motor incluye la cartera de participaciones en el capital invertido; dar aparte el ROIC operativo y sumar la cartera en el puente con descuento.
- Cotizada en HKD con cuentas en RMB: `tipo_cambio` = RMB por HKD (≈0,86 en oct-26) derivado del RMB/USD y la banda del HKD; precios de cierre históricos y dividendos en HKD pasados a RMB con el tipo de cada cierre.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 17.1x, mínimo 13x, media larga 17.8x; antes v2 16.8x/16.3x/17.5x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.

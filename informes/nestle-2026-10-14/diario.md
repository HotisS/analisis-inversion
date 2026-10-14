# Diario · Nestlé (NESN) · 14-oct-2026

- Commit de partida: 1c3990f (CME Group, 14-oct).
- Entorno: nube de Claude Code. La red solo deja salir a la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan. Unas 30 búsquedas. Las cifras salen de los extractos de búsqueda (comunicados de resultados de 2021-2026 reproducidos por MFN, Stockopedia o Nasdaq; Stock Analysis; MarketScreener; Investing; prensa suiza), con la URL como fuente. **Confianza baja-media**: cuenta anual de Stock Analysis (ingresos totales ≈0,4 % por encima de las ventas de Nestlé), balance incompleto (sin circulante ni minoritarios ni pensiones), comparables solo con múltiplos y de fechas distintas, sin beta de mercado (0,65 estimada) ni transacciones.
- Fecha de corte: 2026-10-14; precio: cierre del 13-oct (77,30 CHF), la sesión del 14 no había cerrado. Divisa CHF; ejercicio natural; NIIF.
- 13:36 inicio · 13:46 notas A-E escritas · 13:50 primer cálculo con 17/17 controles · 13:52 Word y PDF (soffice).
- Decisiones:
  - Puente con la deuda neta publicada a 30-jun-26 (56.300 M, incluye arrendamientos); L'Oréal (20,16 %) a mercado: 203.000 M EUR × 0,93 = ≈38.060 M CHF; Rusia: 1.000 M en `otros_ajustes` (deterioro citado por la prensa).
  - EBITDA del DCF en base publicada, con la reestructuración «no recurrente» (≈0,8 % de las ventas) dentro, porque se repite todos los años; el BPA del objetivo a 12 meses y el PER histórico, en base subyacente (la que sigue el mercado).
  - Crecimiento en CHF = orgánico − divisa − perímetro (aguas y helados): −1 % en 2026e, −2 % en 2027e, ≈2 % después; terminal del 0,5 % (regla de la tasa libre suiza al 0,6 %). WACC 4,48 %: el DCF (101,74 CHF) depende mucho de la tasa; con WACC del 5,5 % daría ≈80 CHF.
  - Sostenibilidad «En parte»: ninguna prueba falla (crecimiento medio del 0,8 %, reinversión del 7 % del NOPAT), así que no se rebaja el base; el matiz es el volumen.
  - PER histórico sin 2020-2021 (tipos cero).
- Resultado: Mantener, convicción media (la sugerida). Valor intrínseco 92,60 CHF (+19,8 %).
- **Rentabilidad a 12 meses v2**: objetivo 80,01 CHF → ponderada +7,5 %, base +8,5 % (dividendo 4,0 %) → Mantener (compra < 72,27 CHF; venta > 92,34 CHF). Detalle en `revision-12m-2026-10-14.md`. No se ha ejecutado `apuntar-12m.mjs` ni `seguimiento.mjs` (lo integra el orquestador).

## Lecciones

- En las notas A-E, las citas a fuentes de **otra** nota (`[A1]` dentro de B.json) no las traduce `integrar.mjs`: se quedan literales y la fuente queda sin citar. En las notas, cita solo la lista propia (copia la fuente si hace falta); las letras, solo en `propio`.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 24.3x, mínimo 21.3x, media larga 26.8x; antes v2 19.1x/15.7x/19.1x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.

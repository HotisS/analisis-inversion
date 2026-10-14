# Diario · Shimano (7309) · 14-oct-2026

- Commit de partida: e4c324c (el clon avanzó a 1e1fb81 por otras sesiones durante el trabajo; el prompt y el motor no cambiaron).
- Entorno: nube de Claude Code. La red solo deja la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan. Las cifras salen de extractos de búsqueda (Kessan Tanshin citados por la búsqueda, Stock Analysis, Investing, MarketScreener, Strainer, Nikkei, prensa sectorial), con la URL como fuente. **Confianza baja-media**: cuenta, flujos, guía y precio cuadran entre dos fuentes; balance incompleto (sin existencias, clientes ni proveedores; caja y patrimonio solo 2023-2025), sin gobierno verificado ni beta.
- Fecha de corte: 2026-10-14. Divisa: JPY. Cierre: diciembre. Precio: cierre del 13-oct (17.845 JPY, Yahoo!ファイナンス); el del 14-oct no salió en la búsqueda.
- Tiempos: 12:55 inicio · 13:05 fin de la investigación (≈27 búsquedas) · 13:12 informe calculado, Word y PDF · 13:20 revisión 12 m y diario.
- Decisiones:
  - Notas A-E escritas por mí sin subagentes (generadas con un script en el scratchpad); las citas cruzadas entre notas se copian como fuente local (`integrar` las une por URL).
  - Circulante del DCF a 0 (no hay existencias en las fuentes) y su inversión sumada al capex (8,0 % / 7,5 % de ventas frente a amortización del 6 %).
  - WACC 8,31 %: JGB 3,089 % (MoF, del informe de ANYCOLOR del repo), beta 0,95 estimada (sin dato accesible), prima 5,5 %, sin deuda. Terminal 2,0 % en JPY.
  - Sostenibilidad: falla la prueba de reinversión (ROIC de fondo de ciclo 8,4 %, mal medido sin balance operativo). Rebaja mínima del base: crecimiento medio 3,7 % → 3,4 % y margen final 21 % → 20 %. Veredicto «En parte» y control explicado.
  - Objetivo 12 m en base recurrente (EBIT + 5.000 M de ingresos financieros, impuesto 29 %): quita las diferencias de cambio de la caja que hunden 2025 y disparan el 1S26. PER histórico sin 2021-2022 (pico de pandemia).
- Resultado: **Mantener, convicción media** (sugerida por el motor). Valor intrínseco 13.019,08 JPY (−27,0 %); DCF 13.743,13; DCF inverso: margen EBITDA del 25,7 % o crecimiento del 8,8 %. 16 de 18 controles correctos y 2 explicados; 71 fuentes (11 primarias, todas citadas).
- Línea 12 m: objetivo 20.001,97 JPY → ponderada +14,1 %, base +17,6 % (PER 31,3 / 34,8 / 35,4x × BPA 438,6 / 592,7 / 707,0) → Mantener; compra < 13.019,08 JPY, venta > 22.614,42 JPY. Consenso 19.214,50 JPY (10 analistas). Detalle en `revision-12m-2026-10-14.md`. No pasa los requisitos de compra de MEMORIA (falla valor real y calidad).
- Pendiente (no hecho por encargo): `apuntar-12m.mjs`, `seguimiento.mjs`, cola, commit y push.

## Lecciones

- Japón, empresas con mucha caja en divisas (Shimano): el beneficio neto lo mueven las diferencias de cambio (−55 % en 2025, ×7 en el 1S26). El objetivo a 12 meses y el PER histórico deben ir en BPA recurrente (EBIT + ingresos financieros normales), o la regla de múltiplos sale disparatada.
- Sin existencias en las fuentes, el motor toma circulante real 0 y un `nwc_pct_ventas` positivo crea una inversión enorme el primer año: poner 0 y sumar el circulante incremental al capex.
- La regla común da +17,6 % en el base a una empresa que siempre cotiza a 30-38x mientras el DCF da −23 %: el filtro de valor intrínseco ≥ precio es lo que la frena. Es la situación «calidad cara en fondo de ciclo».

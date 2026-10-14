# Diario · Alcon (ALC) · 14-oct-2026

- Commit de partida: cf85477 (regla de múltiplos v3 ya en main, 0ab5dfd); al calcular, HEAD en 55341c9 (lo actualizó otra sesión; sin cambios en el motor que afecten).
- Entorno: nube de Claude Code. Solo funciona WebSearch; WebFetch, curl, descargar.mjs y bolsa.mjs no. Unas 30 búsquedas. Las cifras salen de extractos de búsqueda de los 6-K, del 20-F y de agregadores (Stock Analysis, MarketScreener, Macrotrends, Digrin), con la URL como fuente. Sin subagentes: notas A-E escritas por mí.
- Confianza: **baja** en los datos de núcleo. El precio es el último cierre fechado encontrado (64,75 USD en NYSE, 30-sep-2026, AAII); la capitalización de Stock Analysis del 8-oct (30.517 M) implica ≈62 USD. Acciones (491 M) estimadas. Balance de agregadores (el de 2025 sí del 20-F por búsqueda). Comparables tomados de los informes del repo de Cooper (9-oct), EssilorLuxottica (14-oct) y Straumann (14-oct).
- Decisiones: cuentas en USD (NIIF), cotización en CHF a 1,237 USD/CHF (OFX, 4-sep). EBITDA = el de MarketScreener (EBIT publicado + amortizaciones; cuadra con el 20-F de 2021). BPA del objetivo 12 m, PER histórico y comparables en base core. Beta 0,85 estimada (sin bolsa.mjs). Veredicto de sostenibilidad «En parte»: no falla ninguna prueba (reinversión mínima, cuota estable), así que el base no se rebaja.
- 14-oct, ≈16:25: informe cerrado; 16 de 21 controles correctos y 5 explicados (tipo impositivo de 2023, circulante sin proveedores de 2025, precio viejo, capitalización y Comprar pendiente por confianza baja). Word y PDF (soffice).
- **Línea 12 m (v3)**: objetivo 89,84 USD (72,63 CHF); ponderada +39,3 %, base +36,7 %; valor intrínseco 69,63 USD (+7,5 %); ROIC − WACC −4,5 puntos. Regla: Comprar → **Mantener (convicción baja)** por confianza baja de los datos. Detalle en revision-12m-2026-10-14.md. Para pasar a Comprar: confirmar con fuente primaria el cierre de octubre, las acciones y la deuda a 30-sep (3T26 el 10-nov) y precio < 69,63 USD; y aun así no pasa el filtro de calidad de MEMORIA (ROIC − WACC ≥ 5).

## Lecciones

- En la nube sin bolsa.mjs, la capitalización de los comparables de otros informes del repo da un precio implícito más reciente que el último cierre fechado que devuelve la búsqueda; úsala como contraste del precio.
- Empresas con fondo de comercio de una escisión (Alcon, igual que EssilorLuxottica o Cooper): el ROIC contable queda por debajo del WACC aunque el negocio sea bueno; dar también el ROIC core y el incremental, y avisar de que el filtro de calidad no pasará.
- 2026-10-14: datos-v2.json y «Alcon - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener 26,5 % (antes v3 Mantener 39,3 %). Para comparar, con el tope anterior del base (×1,3, 14-oct mediodía): 39,3 % Mantener. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).


# Diario · Edwards Lifesciences (EW) · 14-oct-2026

- Commit de partida: 46da3e5 (regla de múltiplos v3 ya en main; `git pull --rebase` antes de calcular).
- Entorno: nube de Claude Code. La red solo deja la búsqueda web (WebSearch); sec.gov, Yahoo, la web de la empresa, WebFetch, `descargar.mjs` y `bolsa.mjs` no funcionan. ≈25 búsquedas. Las cifras salen de extractos de búsqueda de los 10-K 2024/2025, de los 8-K de resultados y de agregadores (Stock Analysis, EDGAR Tools, Fintel, FN2), con la URL como fuente. Comparables y transacciones reutilizados del informe de Intuitive del repo (6-oct-2026), que sí tenía acceso a MarketScreener y Stock Analysis.
- **Confianza de los datos de núcleo: baja.** Precio de cierre del 13-oct de una fuente de prensa (85,76 USD); balance de 2025 de agregador salvo caja, clientes y existencias; cuenta de operaciones continuadas solo 2023-2025 (Critical Care discontinuada); amortizaciones estimadas. Para pasar a Comprar habría que confirmar con el 10-K/10-Q: cuenta 2021-2025 en base continuada, amortizaciones, balance completo y BPA ajustado histórico.
- Fecha de corte: 2026-10-14. Divisa: USD. Cierre del ejercicio: diciembre. US GAAP.
- 16:12 inicio; 16:35 notas A-E y propio; 16:40 primer cálculo; 16:45 Word y PDF (soffice). ≈35 minutos.
- Decisiones: cuenta solo de operaciones continuadas 2023-2025 (los años anteriores mezclan Critical Care); margen EBITDA contable (con remuneración en acciones y parte de los cargos recurrentes) del 31 % al 33 %; WACC 10,15 % (tasa libre 5,22 %, beta 1,0 sin fuente, prima 5 %); terminal 3 %; sostenibilidad «Sí» con prueba de cuota a mano (reinversión < 15 % del NOPAT: el motor no la hace); pesos DCF 50 / escenarios 40 / comparables 10. Convicción Baja (el motor sugiere Media) por la confianza de los datos y porque valor intrínseco y objetivo a 12 meses dan señales opuestas.
- Revisión a 12 meses (v3): objetivo 97,61 USD, ponderada +13,8 %, base +16,0 % → Mantener (compra < 57,69 USD, venta > 108,46). Valor intrínseco 57,69 USD (−32,7 %). Detalle en revision-12m-2026-10-14.md. No se ejecutó `apuntar-12m.mjs` ni `seguimiento.mjs` (lo hace el orquestador).

## Lecciones

- Empresas con una desinversión reciente presentada como discontinuada (Edwards/Critical Care): el PER adelantado de los cierres anteriores a la venta mezcla perímetros; restar del precio el valor por acción de lo vendido antes de dividir por el BPA continuado del año siguiente.
- Reutilizar comparables de otro informe del repo de pocos días antes ahorra búsquedas en la nube; el informe de Intuitive traía además la propia empresa (capitalización, EV, BPA de consenso), útil para cuadrar acciones y caja.
- 2026-10-14: datos-v2.json y «Edwards Lifesciences - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener 13,8 % (antes v3 Mantener 13,8 %).

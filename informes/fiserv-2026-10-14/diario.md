# Diario · Fiserv (FISV) · 14-oct-2026

- Commit de partida: c24d37f (método v2 con regla de múltiplos común).
- Identificación: Fiserv, Inc.; **ticker FISV en Nasdaq desde el 11-nov-2025** (en NYSE como FI entre jun-2023 y nov-2025; se comprobó en el anuncio del 29-oct-2025 y en el 10-K 2025). ISIN US3377381088. US GAAP, cierre en diciembre, USD.
- Entorno: nube de Claude Code; la red solo deja la búsqueda web (WebSearch). WebFetch, curl, descargar.mjs y bolsa.mjs no se usaron. Cifras de extractos de búsqueda de los 8-K (4T25, 1T26, 2T26), el 10-K 2025, el 10-Q 2T26 (nota de deuda), Stock Analysis, Macrotrends y prensa, con la URL como fuente. **Confianza: baja-media.** Cuenta (ingresos, EBIT, amortizaciones, beneficio, BPA) y caja: media; balance (solo totales, deuda y caja), comparables (julio-agosto, no a la fecha de corte), gobierno y sector: baja. El presupuesto de búsquedas compartido (200) se agotó hacia el minuto 12 de investigación: sin tamaño de mercado, márgenes de competidores, beta, say-on-pay ni remuneración del CEO (en huecos).
- Sin subagentes: notas A-E escritas desde un script en el scratchpad (no en la carpeta), `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `textos2.mjs` + `resumen.mjs`.
- Tiempos: 10:55 inicio · 11:00 investigación cerrada (≈40 búsquedas) · 11:02 notas A-E · 11:08 cálculo final · 11:09 Word (36 páginas) y PDF (soffice).
- Decisiones:
  - Hecho clave nuevo frente a lo que decía el encargo: tras el recorte de 2025 hubo **un segundo recorte el 6-ago-2026** (BPA ajustado 2026 de 8,00-8,30 a 7,20-7,40 USD; orgánico −1 % a 0 %) y **cambio de CEO** (Lyons a Truist; Takis Georgakopoulos desde el 15-jun-2026).
  - DCF sobre ingresos GAAP; la amortización del DCF excluye los ≈1.400 M anuales de intangibles comprados (converge al capex del 8 %), para no inflar el escudo fiscal y para que el BPA del DCF esté en la base ajustada del PER histórico. Cuadre del BPA: 8,66 en 2025 (real 8,64) y 7,21 en 2026e (guía 7,20-7,40).
  - Base prudente: +1,5/+2,5/+3 % en 2027-29e (la mitad del +4-6 % del plan del día del inversor) y margen EBITDA del 39-40 % (42,6 % en 2025). WACC 8,42 % (tasa libre 5,22 %, beta 1,15 estimada, +1,5 de prima específica). DCF 118,18 USD; el DCF inverso pide −5,5 % anual de ingresos.
  - Sostenibilidad «En parte»: no se rebaja más el base (ya a la mitad de la guía; crecimiento sin capital nuevo), pero el ROIC (8,9 %) apenas cubre el WACC.
  - PER histórico solo con 2024-2025 en base ajustada (el BPA ajustado de 2021-23 no se pudo leer); no cambia la regla porque el base toma el PER actual (6,3x).
  - Consenso de 2027 (9,01) anterior al recorte de agosto: se usa solo de contraste y se dice.
- Controles: 16 de 17 correctos y 1 explicado (fuentes sin citar). Cobertura de campos del Word: 76,6 %.
- **Línea 12 m**: objetivo ponderado 49,22 USD (+5,5 %), base 49,08 (+5,2 %), sin dividendo → **Mantener**, convicción Media. Compra < 42,80 USD; venta > 54,69 USD. VI 100,68 USD (+115,8 %). Detalle en revision-12m-2026-10-14.md. No se ejecutó apuntar-12m.mjs ni seguimiento.mjs (lo integra el usuario).

## Lecciones
- **Presupuesto de búsquedas compartido**: con varias sesiones en paralelo en la nube, el límite de 200 WebSearch por turno se agotó tras ≈40 búsquedas propias; hay que pedir primero lo que mueve la decisión (precio, guía, deuda, caja libre, consenso) y dejar sector y competidores para el final.
- **Cambio de ticker**: comprobar siempre el ticker vigente (Fiserv volvió a FISV en Nasdaq en nov-2025); los proveedores mezclan páginas de FI y FISV, y Macrotrends da series distintas en cada una.
- **Empresas con grandes compras (First Data)**: en el DCF, quitar de la amortización la de intangibles comprados (no deducible en su mayoría) y llevarla al capex; así el BPA del DCF coincide con el ajustado de la empresa y la regla a 12 meses compara en la misma base.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 25.7x, mínimo 20.3x, media larga 26x; antes v2 15.6x/7.8x/15.6x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.

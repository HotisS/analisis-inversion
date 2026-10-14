# Diario · Ferrovial SE (FER, EUR) · 14-oct-2026

- Commit de partida: 14bff90; `git pull --rebase` antes de calcular → 2100da9 (regla v3, 0ab5dfd, presente).
- Entorno: nube de Claude Code, red limitada a WebSearch (WebFetch, curl, descargar.mjs y bolsa.mjs no funcionan). Cifras de extractos de búsqueda (notas de resultados FY25 y 1S26, informe anual integrado, cierres oficiales de la empresa, Stock Analysis, TipRanks, Investing, UBS publicado por Tennessee Lookout, prensa), con URL. **Confianza de los datos de núcleo: baja** (precio de Lang & Schwarz y no de cierre oficial; balance de agregador y sin caja/deuda bruta; cuenta sin resultado financiero, puesta en equivalencia, impuestos ni minoritarios). Sin subagentes; notas A-E generadas con `notas/build_notas.mjs` (cada nota con su numeración propia).
- Tiempos: 15:51 inicio; ≈27 búsquedas web; 16:05 Word y PDF (soffice); revisión 12 m y diario a las 16:07.
- Decisiones:
  - Precio 45,11 EUR (14-oct, Lang & Schwarz vía ad-hoc-news); 713 M de acciones (beneficio LTM 606 M ÷ BPA LTM 0,85; scrip de 400 M a 0,5578 EUR).
  - EBITDA y EBIT ajustados de la empresa; beneficio limpio (sin plusvalías de rotación): 2023 460 M, 2024 ≈639 M, 2025 ≈589 M (estimación propia).
  - Puente: deuda neta consolidada dic-25 (5.893 M, incluye proyectos) con caja 0; 407 ETR (48,29 %) en asociadas a precio de la compra de 2025 (≈CAD 19.800 M ≈ 12.400 M EUR con EUR/CAD ≈1,60, estimación); minoritarios de las Managed Lanes ≈5.000 M (estimación de valor de mercado).
  - WACC 7,93 % (Bund 3,53 %, beta 0,9 sin poder calcularla, prima 5,5 + 0,5). Comparables y transacciones a peso 0 (PER 14-21x no comparables con concesiones de 50-90 años). Suma de partes no aplicada.
  - Sostenibilidad «En parte»: el motor no aplica la prueba (reinversión 5 % del NOPAT); a mano: precio demostrado, volumen del 407 a la baja, ROIC 5,2 % < WACC y crecimiento nuevo (I-24) a TIR ≈7 %. No hubo que rebajar el base.
  - Convicción Baja (el motor sugería Media) por la confianza baja de los datos (regla del usuario del 14-oct).
- Resultado: **Mantener, convicción baja**. DCF 29,00; valor intrínseco 28,75 EUR (−36,3 %). DCF inverso: 11,1 % de crecimiento frente al 4,4 % del base; rentabilidad implícita 5,7 %. 17 de 17 controles. Cobertura 80,5 %.
- **Línea 12 m (regla v3)**: objetivo ponderado 49,03 EUR, ponderada +9,9 %, base +14,2 % (dividendo 1,2 % incluido) → Mantener; compra < 28,75 EUR, venta > 55,09 EUR. Consenso 61,32 EUR (base −16,9 %). Detalle en revision-12m-2026-10-14.md. No se ejecutó apuntar-12m ni seguimiento (lo integra el orquestador).
- Para pasar a Comprar habría que confirmar con fuente primaria: cierre oficial, cuenta completa (puesta en equivalencia del 407, minoritarios), balance (caja y deuda bruta) y participaciones en cada Managed Lane; aun así no pasaría la calidad (ROIC − WACC −2,7 puntos).

## Lecciones
- Holdings de concesiones con la joya en puesta en equivalencia (Ferrovial-407 ETR): el EBITDA consolidado no la recoge; valorarla en el puente con la última transacción (precio por % comprado) y los minoritarios de las filiales consolidadas a valor de mercado, no contable; el BPA publicado lleva plusvalías de rotación casi todos los años: construir el BPA limpio antes de la historia del PER.
- 2026-10-14: datos-v2.json y «Ferrovial - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener 9,9 % (antes v3 Mantener 9,9 %).

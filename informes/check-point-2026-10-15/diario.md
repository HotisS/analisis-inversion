# Diario · Check Point Software (CHKP) · 15-oct-2026

- Commit de partida: 76166ce. Encargo del coordinador (encargo9; cribado de gestores: PER adelantado ≈11,9x, caja neta, margen operativo > 40 %; escáner: ROIC − WACC ≈+19, FCF 8 %). Sin commits ni pull por parte de este análisis.
- Entorno: nube de Claude Code, sin subagentes (fases 2-4 hechas por mí). Cuentas 2018-2025 del XBRL de la SEC (`cuentas.mjs --sec CHKP`, CIK 1015922, 20-F en US GAAP), comprobadas con el 20-F 2025; 6-K de resultados 3T25-2T26; 20-F 2023 y 2021 para los ingresos por categoría; proxy y resultados de la junta de 2026; Form 4 (CHKP presenta Form 4 desde 2026). Precio y cierres con `bolsa.mjs`. Tasa libre: FRED DGS10 5,21 % (13-oct). Ficha sectorial reutilizada: `sectores/software-2026-10-14.md` (y comparables del informe de Qualys del mismo día).
- Fecha de corte 2026-10-15; precio del 14-oct (134,08 USD; la sesión del 15 no había cerrado); divisa USD; ejercicio natural; US GAAP. Notas A-E con `notas/construir-notas.mjs`; propio con `propio.mjs` + `supuestos.mjs` + `textos.mjs`.
- Decisiones:
  - El XBRL de `cuentas.mjs` solo trae la depreciación: sumada la amortización de intangibles comprados (68,1 M en 2025) a `amortizaciones` y al EBITDA.
  - Caja = caja + valores negociables + depósitos (4.203,4 M a jun-26); en 2018-2023 sin los depósitos a corto (no están en el XBRL).
  - Ingresos diferidos (2.180 M) como pasivos de contrato en el circulante; arrendamientos operativos fuera de la deuda.
  - Convertibles 0 % 2030 a nominal (2.000 M) en el puente; conversión a 243,65 USD, sin acciones nuevas.
  - BPA 2025 publicado 9,62 con 1,90 USD de impuesto no recurrente (acuerdo con Hacienda israelí): BPA normalizado 7,40 (14 %) en la historia del PER (v3 y v2). Explicado en controles.
  - Subvenciones israelíes de I+D (55 M en el 1S26, ≈4 puntos de margen) tratadas como recurrentes (ley permanente); dicho en ajustes y preguntas.
  - Capex del DCF 4,5 % → 3,0 %: inmovilizado + campus de Tel Aviv (hasta 2032, sin cifra) + compras pequeñas recurrentes (Check Point crece en parte comprando).
  - BPA 2028e con la recompra ya anunciada (≈1.475 M de los 2.000 M de mayo de 2026, a ≈145 USD) menos la emisión por pagos en acciones: 97,0 M de acciones.
  - WACC 9,86 %: beta 0,8 (mensual 0,46, ajustada 0,64, volatilidad 41 %) + 1 punto de prima por Israel; deuda 12,7 %.
  - Comparables a peso 0 (PER ajustado y crecimientos del 15-50 %); `comparables_per.mediana` = 20,7 (media larga propia) para no inflar el alcista con PER ajustados.
- Resultado: DCF 131,69; valor intrínseco 130,70 (−2,5 %); DCF inverso 4,7 % (base 4,4 %); con la prima del mercado, 147,22 (síntesis 145,96). Escenarios 98,55 / 131,69 / 154,93.
- ROIC del motor 320,8 % (capital invertido casi nulo e impuesto negativo); ROIC propio ≈24 % (NOPAT 715 M al 14 %, capital ≈2.942 M sin restar ingresos diferidos): ROIC − WACC ≈+14 puntos. Calidad: Sí. Sostenibilidad: Sí (motor: Sí; no salta el control). Altman 5,39, Piotroski 5, Beneish −2,68.
- **Línea 12 m (v3, selector sin marcas)**: objetivo 161,83 USD, ponderada +20,7 %, base +23,2 %; **Mantener**, convicción media (absoluta y relativa: Mantener). v2: 16,1 % / 11,9 %. Comprar < 130,70; vender > 179,81. Robustez: SÓLIDA, acción robusta «Mantener en cartera»; D5 tratado (BPA normalizado); D3 (sin precios.json). Detalle en revision-12m-2026-10-15.md.
- Riesgo IA: exposición Media, sentido Mixto, efecto −10 % a +5 % a 3-5 años.
- **Confianza de los datos: media-alta** (cuentas primarias; consenso de una sola fuente). Falta: guía histórica 2021-2025, crecimiento de los trimestres de 2024-1S25, votos de la junta, posición corta, ESG, coste del campus y retención de clientes. Próximos resultados: 2-nov-2026.
- Word y PDF (soffice): 20 de 22 controles y 2 explicados. Cobertura 86,4 %.
- Tiempo: unos 40 minutos (09:00-09:42 UTC).

## Lecciones

- `cuentas.mjs --sec` en emisores de 20-F: `amortizaciones` solo trae la depreciación (24,8 M frente a 92,9 M con intangibles): sumar `AmortizationOfIntangibleAssets` antes de calcular el EBITDA.
- Los índices `index.json` de EDGAR dan 403 con el UA del encargo; con el de `descargar.mjs` («analisis-inversion research admin@example.com») funcionan.
- En la página de MarketScreener hay que usar el código del Nasdaq (CHECK-POINT-SOFTWARE-TECH-4858); otras URL adivinadas llevan a empresas distintas.
- Posible error en el informe de Qualys del 15-oct: la sanción de la SEC de octubre de 2024 por SolarWinds fue a Unisys, Avaya, Check Point y Mimecast; Qualys no aparece en la nota de la SEC (2024-174). Conviene revisarlo.

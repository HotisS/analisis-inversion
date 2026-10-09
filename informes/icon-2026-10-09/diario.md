# Diario — ICON plc (ICLR), corte 2026-10-09

- Inicio: 2026-10-09 10:30 (Madrid). Commit del repo: 2a53e46 (Informe de Cooper Companies). Prompt sin cambios durante el análisis.

## Fase 1 — Identificación (10:30-10:32)
- ICON plc, Nasdaq ICLR, ISIN IE0005711209, CIK 1060955, sede Dublín. US GAAP, cuentas en USD, ejercicio a 31-dic. Emisor extranjero: 20-F y 6-K (sin proxy ni Form 4; Form 144 sí).
- Hallazgo clave: investigación del comité de auditoría (anunciada 12-feb-26) sobre reconocimiento de ingresos; 6-K de no fiabilidad (29-abr-26); NT 20-F; aviso de Nasdaq; 20-F 2025 presentado tarde (27-may-26) con 2023 y 2024 reexpresados; 6-K/A reexpresa 9M25. Debilidades materiales de control.
- Nuevo CEO: Barry Balfe (elegido en la junta del 31-jul-26). Presidente Ciaran Murray.
- Refinanciación: bonos de 2.150 M USD (13-ago-26) para devolver un puente garantizado, los préstamos a plazo y los bonos 2027.
- Próximos resultados: 3T26 el 27-oct-26 tras el cierre (6-K del 8-oct-26).
- Subagentes A-D lanzados 10:32.
- Corte por límite de uso hacia las 10:47; reanudado a las 15:03 por el coordinador (notas A-D completas). Sin relanzar subagentes.

## Fase 5-6 — Integración y primer cálculo (15:05-15:20)
- Leídos diario, comando, prompt entero y lecciones. Integración sin citas huérfanas (88 fuentes, 17 huecos).
- Primer cálculo: DCF 154,88 USD (−5,8 %), WACC 10,10 %, VT 55 %; objetivo 166,62 (+1,3 %); regla absoluta Mantener, relativa Comprar (195,76 con la prima del 4,2 %) → Mantener, convicción sugerida Baja.
- Controles en «Revisar»: tipo impositivo 2023-2025 (3,2-9,1 %, Irlanda e impuestos diferidos de la amortización de PRA: se explica), R² de la regresión 0,05 (no se usa), rentabilidad y riesgos vacías (las escribo).
- Comparables: el motor no admite `excluir` en comparables; quito WuXi AppTec y Tigermed (China, EBITDA con plusvalías, margen 60 %) y dejo seis (IQVIA, Medpace, Charles River, Labcorp, Fortrea, Thermo Fisher). La mediana NTM apenas cambia (14,7x → ~14,6x).
- Base del EBITDA: contable con pagos en acciones, reestructuración y costes de transacción dentro (2,6 puntos de ventas por debajo del ajustado de ICON); consenso con `base_ebitda: ajustado` y ajuste 2,6 %.

## Fases 6-8 — Supuestos, redacción y comité (15:20-15:55)
- Pesos 45/40/15 (DCF/escenarios/comparables): la muestra de comparables es frágil (13,4-15,7x al quitar una) y no recoge el descuento por la reexpresión. Con 40/20 la regla absoluta daba Mantener (+1,3 %); con 45/15, Vender (−0,8 %, asimetría 0,48). Relativa Comprar (194,24, +18,1 %). Se contradicen → Mantener; convicción Baja (sugerida).
- Cambio de perímetro de 2025 retirado (Symphony se vendió en 2026; el deterioro no es un cambio de perímetro): Altman y Beneish vuelven a ser interpretables. Beneish −2,61: no detecta la reexpresión.
- DCF inverso: el precio pide 4,9 % de crecimiento (base 4,1 %) y 17,2 % de margen final (≈ 20 % ajustado, el de 2024); rentabilidad implícita 9,8 % frente a WACC 10,1 % y 8,9 % del mercado.
- Comité: supuesto más agresivo, crecer al 5 % en 2028-2030 tras tres años al ~1 %; proyección dentro del 3,1 % del consenso; bajista basado en lo ya ocurrido en 2025-26. Síntesis 648 palabras.
- Tropiezo: reescribir la síntesis con node -e dentro de Bash rompió las comillas y dejó el archivo vacío; rehecho con Edit.
- Controles: 15 correctos y 5 explicados (tipo impositivo 2023-2025, regresión, fragilidad de comparables).
- Entrega 15:58: Word y PDF (59 páginas), páginas 1-4 revisadas como imagen; lecciones y seguimiento actualizados.

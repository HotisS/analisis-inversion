# Diario · Sungrow Power Supply (300274.SZ, ChiNext) · 16-oct-2026

- Commit de partida: 7409c4a. Encargo del coordinador. Sin subagentes, sin commits ni escritura fuera de la carpeta.
- Fuentes: sin XBRL (China). Cuentas 2023-2025 en NIIF del informe contable del folleto de la salida a Hong Kong (HKEX, 24-abr-2026, apéndice I); 2021-2022 de los informes anuales CAS (CNINFO); 1S26 y trimestres CAS (CNINFO). BPA 2021-22 ÷ 1,4 (4 acciones liberadas por cada 10 en 2024). Consenso MarketScreener (20 analistas) y Kaiyuan (31-ago-2026).
- Cotización: solo la acción A de Shenzhen (ChiNext); no hay acciones H ni ADR (la salida a Hong Kong de abril de 2026 no aparece cotizada; 03661.HK es SG Micro). Desde Europa: Shenzhen-Hong Kong Stock Connect (HKSCC tiene el 8,08 %); en ChiNext el acceso por Stock Connect puede estar limitado a inversores profesionales institucionales: comprobar en IBKR.
- Corte 2026-10-16; precio 76,86 CNY (cierre del 16-oct, bolsa.json). Tasa libre ChinaBond 10 a 1,66 %; beta 1,25 (mensual 5 a 1,31, ajustada 1,21); prima 5,5 + 1,0 de riesgo país; WACC 9,20 %.
- Decisiones: 2026e fijado con el 1S26 real (−23,5 % de ventas); margen EBITDA del 20,5 % al 17,5 % por la competencia de precios en almacenamiento; capex 3,0 %→2,2 % (fábricas fuera de China); g terminal 1 %. `mercado_final` en null (la cuota publicada es solo de inversores por volumen); prueba de cuota en el texto. Pesos DCF 40 / escenarios 40 / comparables 20. Transacciones y sentimiento sin datos (huecos tras tres búsquedas: guba con antibot, Stocktwits 404).
- Resultado: DCF 85,15 CNY (VT 58 %); valor intrínseco 86,24 (+12,2 %); DCF inverso 4,1 % frente al 6,7 % del base; rentabilidad implícita 10,2 %. Con la prima de mercado 99,77. ROIC del motor 2025 54,6 % (caja fuera); prudente con toda la caja en el capital 24,2 % y con NOPAT 2026e 17,4 %: ROIC − WACC ≥ 8 puntos en todos los casos. Sostenibilidad «Sí» (motor y analista).
- **Línea 12 m (v3 ×1,1)**: objetivo 84,91 CNY, ponderada +12,2 %, base +13,6 % → **Mantener**, convicción baja (regla relativa Comprar). v2 +12,7 % / +8,1 %. Robustez SÓLIDA, acción robusta Mantener; BPA −10 %: +1,1 % / +2,4 %. Comprar < 74,99 (fijo 74,97); límite robusto 67,61.
- Regla 13: veredicto «no cambia» (Nomura a Neutral, UE sin fondos para inversores de alto riesgo, proyecto de veto en EE. UU., recompra de 500-1.000 M, recortes de Kaiyuan y Jefferies). Movimiento: 1 m −11,7 %, 3 m −28,8 %, 6 m −37,9 %, 12 m −50,2 %. Resultados del 3T26 el 30-oct (CNINFO).
- Word y PDF (soffice): 19 de 23 controles correctos y 4 explicados; cobertura 78,8 %. Robustez avisa D3 (sin cierre en precios.json: no ejecuté precios.mjs porque escribe un archivo común).

## Lecciones (para integrar)

- China sin XBRL: el folleto de la salida a Hong Kong (HKEX, en inglés) trae tres años de cuentas NIIF auditadas, riesgos, industria y accionistas; mejor base que los informes CAS en chino.
- Índices chinos en Yahoo (000300.SS, 399300.SZ) sin datos: usar ETF (510300.SS para el CSI 300, 159915.SZ para ChiNext) en `bolsa.mjs`.
- Comprobar en HKEX el código de una supuesta acción H: las búsquedas atribuyeron 3661.HK a Sungrow y es SG Micro.

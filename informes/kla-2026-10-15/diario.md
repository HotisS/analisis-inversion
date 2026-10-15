# Diario · KLA Corporation (KLAC) · 15-oct-2026

- Commit de partida: 70ba47e. Encargo del coordinador (megatendencia IA, exposición indirecta). Sin subagentes, sin commits ni pull; no se escribe fuera de la carpeta.
- Entorno: nube de Claude Code. Cuentas FY2017-FY2026 del XBRL de la SEC (`cuentas.mjs --sec KLAC`, CIK 319201) más companyfacts para I+D, deterioros, valores negociables y pasivos de contrato; 10-K FY2026, notas de resultados del 3T26 y 4T26, 8-K del día del inversor, del split y del dividendo, proxy 2026 y votos de 2025 (todo con `descargar.mjs`). Precio y cierres con `bolsa.mjs`; `movimiento.mjs KLAC`; `form4.mjs`. Consenso de MarketScreener y Stock Analysis (WebFetch). Comparables de Stock Analysis del 15-oct. Tasa libre FRED DGS10 5,21 % (curl).
- Fecha de corte 2026-10-15; precio = cierre del 14-oct (178,81 USD), la sesión del 15-oct abierta (≈173). USD, ejercicio a junio (etiqueta «fin»), US GAAP.
- Decisiones: (1) split 10:1 del 11-jun-2026: FY2019-FY2023 reexpresados (BPA y DPA ÷ 10, acciones × 10); (2) EBIT = ventas − coste − I+D − SG&A − deterioros; EBITDA sin los deterioros de PCB (FY2020, FY2024, FY2025; explicados); (3) caja con valores negociables (FY2023 solo los de < 1 año, el XBRL no da el total); (4) arrendamientos operativos fuera de la deuda (US GAAP); (5) circulante con pasivos de contrato; (6) historia del PER adelantada con el FY2026 excluido (pico del 30-jun) y los BPA FY2024-FY2025 normalizados sin deterioros; v2 al lado (historia al cierre) para el selector; (7) transacciones a null (sin operaciones con múltiplo); (8) mercado_final null: la cuota del 58 % es de un segmento, prueba de cuota a mano.
- WACC 12,16 % (beta ajustada 1,30; bruta 1,45); terminal 3 %; etapa 2 de 5 años (ROIC − WACC ≈ 60 puntos).
- Resultado: DCF 77,16; valor intrínseco 91,32 (−48,9 %); con la prima del mercado 105,42. DCF inverso: 26,9 % de crecimiento anual FY2027-FY2033 (base 13,0 %).
- **Línea 12 m (v3 ×1,1, selector sin marcas)**: objetivo 163,49 USD, ponderada −8,1 %, base +10,0 %; Mantener (convicción media). v2: −25,3 % Vender. Comprar < 91,32; vender > 182,55. Robustez SÓLIDA, acción robusta «No mantener» (no comprar); BPA −10 %: −17,3 % / −1,0 %. Calidad: ROIC 72,3 % − WACC 12,16 % = +60,1; sostenibilidad «Sí».
- Regla 13: veredicto «no cambia» (movimientos de sector, sin hechos pendientes con fecha salvo resultados del 28-oct).
- Word (41 páginas) y PDF (soffice): 18 de 23 controles correctos y 5 explicados; cobertura 88,9 %.
- Confianza de datos: media-alta en cuentas (XBRL + 10-K), media en consenso (una fuente a 3 años) y comparables (PER ajustado), baja en sector (sin serie pública del control de procesos) y ESG.
- Tiempo: unos 45 minutos.

## Lecciones

- **Split reciente (KLA 10:1 en junio de 2026)**: `cuentas.mjs` da los años anteriores al ejercicio del split en acciones viejas (BPA ×10) y los posteriores ya reexpresados; el salto aparece entre FY2023 y FY2024. Reexpresar a mano; `bolsa.mjs` ya da los cierres ajustados.
- **`cuentas.mjs --sec` no da EBIT ni EBITDA cuando la empresa no publica `OperatingIncomeLoss`** (KLA): calcularlo con I+D (`ResearchAndDevelopmentExpense`) y deterioros (`GoodwillAndIntangibleAssetImpairment`) del companyfacts; cuadra con el BAI al decimal.
- **Caja de las tecnológicas de EE. UU.**: `cuentas.mjs` da solo el efectivo; los valores negociables (`AvailableForSaleSecuritiesDebtSecurities`) hay que sumarlos aparte, y en algún año el XBRL no trae el total.
- **`robustez.mjs --actual` sin la empresa en `simbolos.json`** da D3 (no comprueba el precio): normal en un análisis nuevo que no puede escribir fuera de su carpeta.
- MarketScreener: la URL «KLA-CORPORATION-4880» lleva a otra empresa (VIAVI); la buena es `KLA-CORPORATION-102616480`.

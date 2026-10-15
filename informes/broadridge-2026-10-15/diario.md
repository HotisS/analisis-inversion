# Diario · Broadridge (BR) · 15-oct-2026

- Commit de partida: ffbb0d3 (al empezar); durante el análisis el repo pasó a a406355 (riesgos.ia y veredicto de sostenibilidad del motor, aplicados por encargo del coordinador). Sin pull ni commits propios (los hace el coordinador).
- Entorno: nube de Claude Code con red abierta. Sin subagentes: notas A-E escritas por `notas/construir-notas.mjs`; la parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs`.
- Reutilizado de ayer (comprobado): `cuentas-xbrl.json`, `form4.json` y documentos de `notas/docs` (10-K 2026, proxy 2026, notas de resultados 1T-4T 2026, 4T 2020 y 2021, presentación de mayo). Descargados hoy: notas de resultados de 4T 2022 y 4T 2024, 10-K 2021 (Itiviti) y el pricing term sheet de los bonos de 2036 (rating). `bolsa.json` rehecho con corte 15-oct: último cierre 14-oct (168,26 USD).
- Fichas sectoriales reutilizadas: `sectores/software-2026-10-14.md` y `sectores/bolsas-datos-financieros-2026-10-14.md` (FactSet y Thomson Reuters como comparables).
- Fecha de corte 2026-10-15; USD; ejercicio a 30 de junio con etiqueta «fin» (FY2026 = jul-25 a jun-26).
- Decisiones de datos: el XBRL daba el beneficio antes de impuestos solo de EE. UU. (BAI = beneficio neto + impuesto) y la amortización sin intangibles ni otros activos (EBITDA = EBIT + 508 M en 2026); cuenta desde FY2019 porque la amortización completa está en las notas de 2020-2026. Cuentas a pagar = «payables and accrued expenses». Arrendamientos operativos fuera. Capex del DCF con los costes de conversión de clientes (3,7 %). Monedas Canton netas de impuesto (−168 M) en `otros_ajustes`.
- BPA: publicado normalizado (sin 227 M de activos digitales en 2026 ni la cobertura de Itiviti en 2021), no el ajustado de la empresa. BPA FY2028e 8,96 / 10,37 / 11,14.
- Resultado: DCF 166,72 (WACC 9,30 %, beta 0,90, bono 5,21 %); valor intrínseco 165,77 (−1,5 %); DCF inverso 4,2 % de crecimiento (base 4,1 %), rentabilidad implícita 9,2 %; con la prima del mercado 191,11. ROIC 18,3 % (55,6 % sin fondo de comercio; motor: «compra única grande»); ROIC − WACC 9,0 puntos. Sostenibilidad «Sí» (motor «Sí», sin control). 20 de 20 controles.
- **Línea 12 m**: selector → v3 ×1,1 (mediana adelantada 27,7x / actual 18,1x = 1,53; 8 años). v3 ponderada +27,7 %, base +24,9 %; v2 +19,6 % / +13,9 %. Objetivo 211,03 USD. **Mantener** (VI < precio), convicción baja (absoluta Mantener, relativa Comprar). Comprar < 165,77; vender > 238,81. Robustez: SÓLIDA, acción robusta Mantener; D3 aviso (BR no está en `precios.json`: hay que añadir el símbolo a `verticales/empresa/simbolos.json`, archivo compartido que no toco).
- Riesgo IA: exposición Media, sentido Mixto, −10 % a 3-5 años en un caso adverso parcial.
- Word y PDF (soffice): 40 páginas, cobertura 89 %.
- Para subir la confianza: consenso de 2028 y EBITDA de consenso (MarketScreener no abrió), múltiplos de transacciones, crecimiento trimestral de 2025, fecha confirmada del 1T (≈3-nov-2026).
- Tiempo: unos 45 minutos.

## Lecciones

- `cuentas.mjs --sec` en Broadridge: `IncomeLossFromContinuingOperationsBeforeIncomeTaxes…` era solo el beneficio antes de impuestos de EE. UU. (el total va en otra etiqueta): cuadrar BAI = beneficio neto + impuesto siempre. Y la amortización (`DepreciationAmortizationAndAccretionNet`) excluía intangibles comprados y costes de conversión activados (EBITDA 1.438 frente a 1.809 M).
- Empresas que activan costes de captar clientes (conversión, puesta en marcha): su amortización sale del EBITDA, así que el capex del DCF debe incluir ese gasto (va en «otros activos no corrientes» del flujo operativo).

# Diario · Euronext (ENX) · 14-oct-2026

- Commit de partida: 3ea7765 («Cola: sexta hora en marcha (tanda 1)»). Prompt y regla de múltiplos (v3) sin cambios durante el análisis.
- Entorno: nube de Claude Code con red abierta. Sin subagentes: notas A-E escritas por `notas/construir-notas.mjs`; parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs`.
- Fecha de corte 2026-10-14; divisa EUR; ejercicio natural; NIIF-UE. Precio 166,80 EUR, cierre de Euronext París del 14-oct (`bolsa.mjs`, sesión cerrada).
- Fuentes de núcleo: XBRL ESEF 2020-2025 (`cuentas.mjs --esef`), notas de resultados 4T25, 1T26 y 2T26 (con balance y flujos), web de gobierno y accionistas, actas de voto de las juntas de 2025 y 2026, consenso de MarketScreener (14-oct), Bund del Bundesbank (3,53 %), ficha sectorial de bolsas del repo (comparables al 13/14-oct).
- Tiempos: inicio 16:50 UTC; cuentas y bolsa en 2 minutos; documentos y búsquedas hasta ≈ 17:00; notas, cálculo, Word y PDF hasta ≈ 17:10 (el reloj del contenedor avanzó poco: unos 40-45 minutos de trabajo real).
- Decisiones:
  - **Ingresos** = «revenue and income» (`RevenueAndOperatingIncome`), no `RevenueFromContractsWithCustomers` que da `cuentas.mjs`: incluye el resultado de tesorería de la cámara (69,6 M en 2025).
  - **Balance sin la cámara**: restados los activos y pasivos CCP (318.063 M y 318.085 M en 2025); deuda financiera = corto + largo (`cuentas.mjs` solo daba el largo); fondo de comercio e intangibles en una sola línea.
  - Cifras **publicadas**, no ajustadas: los costes «no subyacentes» se repiten todos los años desde 2021. El consenso de EBITDA es el ajustado → `base_ebitda: "ajustado"` con 1,0 % de ventas.
  - DCF: amortización sin la de intangibles de compras (≈ 95 M), capex 6,5 % (plan 4-6 % + derechos de uso), circulante −16 %. WACC 7,36 % (beta 0,85; la mensual frente al CAC es 0,72).
  - Puente a 30-jun-2026: minoritarios a valor estimado de mercado (900 M = ≈ 65 M de beneficio × 14) en vez de 189 M contables; Euroclear y Sicovam a valor razonable (454 M) más asociadas (17 M); caja en tránsito de Nord Pool (228 M) en `otros_ajustes`. Convertible 2032 (conversión 191,17 EUR) como deuda; acciones del puente 101,24 M (en circulación), las del BPA a 12 meses 103,8 M (diluidas, como el publicado).
  - Comparables: los seis operadores de mercado de la ficha sectorial (DB1, LSEG, ICE, CME, NDAQ, TW) pasados a EUR a 1,1126; mediana PER NTM 23,4x.
- Resultado: DCF 185,12 EUR (+11,0 %); valor intrínseco 182,06 (+9,1 %); DCF inverso 3,3 % de crecimiento 2027-2032 frente al 5,0 % del base; con la prima del mercado 235,12. ROIC 10,9 % frente a WACC 7,36 % (+3,5 puntos). Sostenibilidad «Sí» (prueba a mano: reinversión negativa). Calidad: «Sí». Mantener, convicción baja (reglas absoluta Mantener / relativa Comprar). 17 de 18 controles y 1 explicado (regresión). Cobertura 86,8 %.
- **Línea 12 m (v3)**: objetivo 154,30 EUR (BPA 2028e 7,37 / 8,08 / 8,50 × PER 14,0 / 19,5 / 23,4), ponderada −5,6 %, base −3,6 % → Mantener; v2: ponderada −3,8 %, base −5,1 %. Comprar < 136,94; vender > 174,98. Detalle en `revision-12m-2026-10-14.md`. Comprobado con `apuntar-12m.mjs --simular` (no apuntado: lo hace el coordinador).
- Para subir la confianza: URD 2025 (remuneración del consejero delegado, vencimientos de deuda, geografías), registro de la AFM (operaciones de directivos y cortos), desglose de recomendaciones.

## Lecciones

- `cuentas.mjs --esef` toma `RevenueFromContractsWithCustomers` como ingresos: en bolsas y cámaras falta el resultado de tesorería y otros ingresos; usar `RevenueAndOperatingIncome`. También tomó solo la deuda a largo (`LongtermBorrowings`) como `deuda_financiera`: sumar `ShorttermBorrowings`.
- Bolsas con cámara (Euronext, Deutsche Börse, LSEG): restar del balance los activos y pasivos de la cámara (`eur:ClearingBusinessAssets/Liabilities` en el ESEF de Euronext) antes de calcular; si no, activo y pasivo corriente salen en cientos de miles de millones y el Altman y la liquidez no significan nada.
- La ficha sectorial puede aparecer durante el análisis (la hacía otro hilo): mirar `sectores/` otra vez antes de cerrar los comparables.
- 2026-10-15: datos-v2.json y «Euronext - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener -4,1 % (antes v3 Mantener -5,6 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 16,3x / 19,2x / 23,4x, -3,8 % Mantener; con el tope anterior del base (×1,3, 14-oct mediodía): -5,6 % Mantener. Decide la v3 con tope ×1,1, elegida por el selector de método (sin marcas: decide la v3; METODO-VIGENTE.md).

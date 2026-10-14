# Diario · Roper Technologies (ROP) · 14-oct-2026

- Commit de partida: f120c4d («Seguimiento: regenerado»). Sin `git pull` ni commits (lo hace el coordinador).
- Entorno: nube de Claude Code con red abierta. Cuentas con `cuentas.mjs --sec ROP`; documentos de EDGAR con `descargar.mjs` (10-K 2025, 10-Q 2T26, notas de resultados 4T22, 4T23, 4T24, 4T25 y 2T26, proxy 2026, 8-K de la junta y del nuevo consejero); Form 4 con `form4.mjs`; precio y bolsa con `bolsa.mjs` (cierre del 13-oct); bono del Tesoro (5,21 %) del CSV oficial; consenso de MarketScreener y MarketBeat (WebFetch); sentimiento del RSS de Seeking Alpha y la API de Stocktwits.
- Reutilizado del repo: sector (Mordor y Grand View), transacciones (Centerview en el DEFM14A de MeridianLink y Weave) y comparables de Tyler y Descartes del informe de Constellation Software (10-oct); múltiplos de Constellation, Veeva e Intuit de sus informes (10 y 14-oct). No hay ficha sectorial de software en `sectores/`.
- Notas A-E y propio hechos por mí sin subagentes (`notas/construir-notas.mjs` escribe A-E; `propio.mjs` + `supuestos.mjs` + `textos.mjs`).
- **Regla de 12 meses: v3 con tope ×1,1** (la vigente desde la tarde del 14-oct), `per_historico.base: "adelantado"` y `per_historico.v2` relleno con la historia al cierre.
- Decisiones:
  - `cuentas.mjs`: aquí `DepreciationDepletionAndAmortization` sí es el total (39,8 de depreciación + 858,4 de amortización de intangibles = 898,2 en 2025), así que el EBITDA del XBRL es correcto; comprobado contra la conciliación de la nota de resultados.
  - Cuenta 2021-2025 de operaciones continuadas (reexpresada); beneficio y BPA de operaciones continuadas. Flujo de 2022 sin los 954 M de impuestos de las plusvalías de las ventas.
  - BPA «limpio» (GAAP con amortización, sin Indicor/Certinia ni partidas puntuales) para la historia del PER y los casos: 9,83 (2022), 11,59 (2023), 12,88 (2024), 14,04 (2025). El BPA GAAP de 2026 lleva 9,16 USD de revalorización de Indicor.
  - DCF solo orgánico (sin compras); amortización de intangibles que se agota del 10,8 % al 1,5 % de las ventas en 2035; circulante −11,5 % (ingresos diferidos).
  - Puente a 30-jun-2026: deuda 11.319, caja 365, Indicor a valor razonable 1.792 (asociadas) menos 200 de impuestos estimados del cobro.
  - Escenarios 30/50/20 (más peso al bajista por la IA). Pesos DCF 40 / comparables 20 / escenarios 40.
  - **ROIC publicado 6,4 % frente a WACC 8,38 % (−2,0 puntos)**: cae por debajo solo por el fondo de comercio (21.341 M de 27.594 M de capital invertido). Sin fondo de comercio: 28,4 %. Decide el publicado: **calidad No**.
- Resultado: DCF 480,27; valor intrínseco 475,57 (+29,1 %); DCF inverso 1,6 % de crecimiento anual 2027-2035 (base 4,5 %); rentabilidad implícita 9,7 %. Con la prima del mercado, 553,37.
- **Línea 12 m (v3 ×1,1)**: objetivo 447,02 USD, ponderada +22,2 % (`apuntar-12m --simular`; el informe dice 22,3 %), base +22,6 % → regla **Comprar**; **v2 11,5 % / 11,7 % → Mantener**. Robustez: FRÁGIL, acción robusta **Mantener en cartera**; resultados el 22-oct (E2). Recomendación del informe: **Mantener**, convicción media, con justificación (frágil con la v2, calidad no pasa, resultados en 8 días). Comprar < 391,73 (v3) / < 357,34 (v2); vender > 500,54.
- Word y PDF (soffice): 16 de 18 controles correctos y 2 explicados (regresión sin poder explicativo; compra no robusta). Cobertura 91,1 %.
- Para subir la confianza: recompras del 3T26 (22-oct), cifra de puestos por cliente en Aderant/Deltek, rating y calificaciones ESG, geografías.

## Lecciones

- En Roper `DepreciationDepletionAndAmortization` del XBRL ya suma la amortización de intangibles: comprobar en la conciliación del EBITDA de la nota de resultados antes de añadirla (la nota de sesiones anteriores no aplica a todas).
- Con revalorizaciones de participadas a valor razonable dentro del beneficio (Indicor), la historia del PER y los casos van en un BPA «limpio» sacado de las conciliaciones de la empresa (BPA ajustado − amortización de compras); la cifra GAAP de 2026 del consenso no es comparable.
- Comprador en serie con ROIC publicado bajo el WACC por el fondo de comercio: dar las dos cifras y decidir con la publicada; la regla a 12 meses puede dar Comprar y la robustez (v2) frenarlo.

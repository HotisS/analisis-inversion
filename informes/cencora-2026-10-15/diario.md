# Diario: Cencora, Inc. (COR), corte 2026-10-15

- Commit de partida: 3aeb028 (Seguimiento: regenerado). Hecho a mano en la nube, sin subagentes (notas A-E escritas por `notas/construir-notas.mjs`; parte propia en `notas/propio.mjs`, `supuestos.mjs` y `textos.mjs`; temporales en `notas/tmp/`).
- Origen: escáner «calidad a precio» (PER adelantado ≈ 17x; ROIC − WACC ≈ +26; margen muy estable). Ficha sectorial nueva: `sectores/distribucion-farmaceutica-2026-10-15.md` (+ `-comparables.json`).
- Datos: XBRL de la SEC (`cuentas-xbrl.json`, FY2016-FY2025), 10-K FY2025, 10-Q del 3T26, notas de resultados FY2019-FY2025 y 1T-3T FY2026 (EDGAR), proxy 2026, 8-K de la junta, Form 4 (`form4.json`), bolsa.mjs (`bolsa.json`), Yahoo quoteSummary para consenso y comparables (`notas/tmp/yahoo-comps.mjs` → `comparables-yahoo.json`; `notas/tmp/fichas.mjs` → `fichas-competidores.json`), Tesoro de EE. UU. (10 años 5,19 % el 14-oct), RSS de Seeking Alpha y API de Stocktwits.

## Decisiones
- Ejercicio a septiembre etiquetado por el año en que termina; FY2026 cerrado pero sin publicar (4-nov-2026): último real FY2025, LTM a jun-2026, FY2026e fijo en el DCF (guía). Objetivo a 12 meses sobre FY2028e.
- XBRL: la deuda solo traía el largo plazo; se sumó la parte corta (DebtCurrent; 10-K para FY2024-FY2025). Arrendamientos operativos fuera (US GAAP). Las amortizaciones del XBRL sí incluyen los intangibles (cuadra con el 10-K: 1.051 M en FY2025).
- `no_recurrentes_en_ebitda` = resultado operativo ajustado − GAAP − amortización de intangibles comprados (FY2020: 7.229 M por opioides). El DCF resta después 0,07 puntos de margen por la reestructuración e integración, que se repiten cada año.
- **BPA de la regla a 12 meses en base ajustada de la empresa** (la del consenso), historia adelantada y al cierre en la misma base, de las notas de resultados FY2019-FY2025. El GAAP no sirve (deterioros, opioides, plusvalía de OneOncology).
- Puente: opioides 4.200 M × (1 − 21 %) = 3.318 M (deducibles, sin descontar: prudente) + pagos contingentes y unidades de capital de RCA y OneOncology ≈ 2.012 M en `otros_ajustes`. MWI se deja en la proyección (venta pendiente de la FTC; valor empresa de 3.500 M ≈ neutro).
- ROIC: el motor da 71,8 % por el circulante negativo; sin él (inmovilizado + fondo de comercio + intangibles) 16,7 % en FY2025 y 15,2 % a jun-2026 → ROIC − WACC ≈ +7-8 puntos con la medida exigente: calidad «Sí». `roic_sin_fc_pct` del motor: null (capital invertido del motor menor que el fondo de comercio); con el fondo de comercio el ROIC no cae bajo el WACC en ninguna medida.
- Sostenibilidad «Sí» (motor también «Sí»: financiable bruto 11,5 % frente a 4,3 % proyectado). El control no salta.
- Riesgo de IA: exposición Baja, sentido Mixto, efecto ±2 % a 3-5 años.
- Beta 0,75 (ajustada mensual 0,73). WACC 8,32 %; con la prima implícita (4,2 %), DCF 403,15.
- Transacciones sin múltiplos publicados (hueco); peso 0. Comparables: 8 (sin Sinopharm).

## Resultado
- **Mantener, convicción baja.** DCF 337,93 (+0,5 %); valor intrínseco 324,64 (−3,4 %); DCF inverso 4,1 % de crecimiento (= base).
- 12 meses (v3, selector sin marcas): objetivo 308,78, ponderada −7,4 %, base −0,1 %. v2: 328,33, −1,6 % / +5,7 %. Consenso 370,17.
- Comprar por debajo de 270,55 (v2: 287,55); vender por encima de 345,70. Próximos resultados: 4-nov-2026 (FY2026 y guía FY2027).
- Robustez: SÓLIDA; acción robusta «No mantener»; D3 aviso (sin cierre en precios.json, no se toca desde este hilo), D6 CONFIANZA explicada (BPA ajustado frente a GAAP), M6 aviso. Sin CORREGIR.
- Línea de revisión 12 m: `revision-12m-2026-10-15.md` (apuntar-12m solo con `--simular`).
- Word y PDF (soffice): 18 de 19 controles + 1 explicado; cobertura 89,2 %; 27 gráficos; 42 páginas.
- Precio de una acción ≈ 299,6 EUR (1,0 % de una cartera de 30.000 EUR).

## Lecciones
- En empresas de EE. UU. con BPA GAAP muy deformado (opioides, deterioros, amortización de compras), la regla a 12 meses va en BPA ajustado de la empresa con la historia de las notas de resultados; la prueba D6 de robustez compara con el GAAP de `financieros.cuenta` y salta (CONFIANZA) aunque en la misma base el crecimiento sea normal: explicarlo en `controles_explicados` y en la entrega.
- `cuentas.mjs --sec` con Cencora: la deuda sale sin la parte corta (concepto `DebtCurrent`, que la herramienta no suma); el `LongTermDebt` de companyfacts sí la incluye.
- Las notas de resultados anuales de EDGAR (anexo 99.1 del 8-K de noviembre) dan el resultado operativo ajustado y la amortización de intangibles de cada año: con ellas `no_recurrentes_en_ebitda` sale en una línea.

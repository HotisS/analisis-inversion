# Diario: Autodesk (ADSK), análisis value del 15-oct-2026

- Commit de partida: dd1e35a. Inicio ≈08:09 UTC; fin ≈08:40 UTC (más el trabajo anterior a la compactación del contexto). Sin subagentes: notas A-E y propio hechos en este hilo.
- Origen: escáner «calidad a precio» (PER adelantado ≈16x con el BPA non-GAAP; −28 % desde máximos).

## Decisiones
- Cuentas del XBRL de la SEC (`cuentas.mjs`); LTM a jul-26 desde los 10-Q. Precio: cierre del 14-oct (231,14 USD).
- BPA en base «GAAP sin no recurrentes»: los pagos en acciones (788 M, 11 % de las ventas) cuentan como gasto. Con esa base el PER adelantado es 24,5x, no los ≈18x del non-GAAP que ve el escáner.
- Las comisiones activadas del nuevo modelo de transacción (467 → 913 M) se suman al capex.
- El puente resta el pago de MaintainX (3.530 M, cerrada el 3-ago) en «otros ajustes»: la caja de jul-26 aún no lo recogía.
- WACC: 10,86 % (tasa libre del 5,19 % de la curva del Tesoro, beta de 1,15 y prima del 5,5 %). Terminal: Gordon al 3 %. Pesos: DCF 50, escenarios 30, comparables 20.
- Riesgo de IA: exposición Alta, sentido Mixto; bajista −41 % (crecimiento −4 pp, margen −3 pp).
- Sostenibilidad: Sí, el analista y el motor coinciden (el control no saltó).
- Calidad: Sí (ROIC 38,4 % frente a un WACC del 10,86 %). El ROIC no cae por debajo del WACC por el fondo de comercio, así que no hace falta el ROIC sin fondo de comercio.
- Consenso: solo MarketScreener; sin desglose de recomendaciones ni objetivos mínimo y máximo (la página de consenso da Access Denied). Por eso la sección de consenso queda por debajo del 60 % de cobertura.

## Revisión a 12 meses
ADSK 15-oct-2026: v2 por el selector (desrateada, 1,9x). Ponderada +20,8 %, base +17,1 %, objetivo 279,23 USD. Mantener (valor intrínseco 199,13 < precio 231,14). v3 sin selector: +33,4 % / +29,1 %. Robustez SÓLIDA; acción robusta: Mantener.

## Lecciones
- El EBITDA de MarketScreener para Autodesk suma toda la amortización al EBIT non-GAAP (incluidos los intangibles que el non-GAAP ya excluye): el ajuste al EBITDA con pagos en acciones como gasto es del 10,8 % de las ventas, no del 9 %.
- En el software estadounidense el PER del escáner (non-GAAP) y el de la regla (pagos en acciones como gasto) pueden separarse un 30-35 %: comprobarlo antes de proponer una candidata «barata».
- MarketScreener bloquea la página de consenso a curl (Access Denied de Akamai); la ficha de datos financieros sí se descarga.

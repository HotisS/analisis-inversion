# Diario · Prysmian (PRY.MI) · 15-oct-2026

- Commit de partida: 70ba47e. Inicio 16:39 UTC; Word y PDF a las 17:00 UTC. Sin subagentes (encargo del hilo principal); sin git ni escrituras fuera de la carpeta.
- Precio: 109,80 EUR, cierre del 15-oct (bolsa.mjs con FTSEMIB.MI y EXH4.DE).
- Cuentas: `cuentas.mjs --esef "Prysmian"` solo llega a 2021-2024; 2025 y 1S26 salen de las notas de prensa y la presentación (emarketstorage). EBITDA «recurrente» = EBIT + amortizaciones + no recurrentes (ajustado − pagos en acciones − derivados de metal).

## Decisiones
- Atkore (EV 3.800 M USD = 3.390 M EUR, BCE 1,1208; cierre previsto 19-oct) va como capex de 2027e (17,5 % = 4,6 + 12,9) y no en el puente. Con la compra en el puente, la prueba de sostenibilidad fallaba (el capital nuevo «rendía» un 36,2 %); como capex, 19,0 % frente a 18,5 % histórico → «Sí». En el puente solo el híbrido (1.000 M) menos la ampliación cobrada (850 M): otros_ajustes 150.
- Bajista a −2 pp de crecimiento (con −3 pp el DCF bajista daba −57 %, incoherente con la cartera de pedidos); BPA bajista 5,00.
- `per_historico.v2` fuera de esquema (aviso de integrar): esperado, lo lee el selector.
- Robustez: SÓLIDA, Mantener / Mantener; v2 19,3 %/15,1 %; BPA −10 % → 1,1 %; límite robusto 96,52 EUR. apuntar-12m solo `--simular`.
- Word: 5 avisos de datos (sin suma de partes, sin calificaciones ESG, sin desglose geográfico, serie de múltiplos mensual vacía, mapa de comparables sin EV/EBITDA NTM). Cobertura 87,6 %.

## Lecciones (para pasar a lecciones-paises.md / lecciones.md)
- Italia: el ESEF de filings.xbrl.org llega solo hasta 2024 y su campo «ingresos» es «ventas e ingresos totales» (incluye otros ingresos): no usarlo como ventas. Las notas de prensa anuales y semestrales están en emarketstorage.it.
- Los identificadores de comparables de MarketScreener devolvían empresas equivocadas; las páginas de estadísticas de Stock Analysis funcionan para PER, EV/EBITDA y márgenes.
- Una compra grande ya firmada y pendiente de cierre: mejor como capex del año en que entra en la proyección que en el puente, para que la prueba de reinversión vea su coste.

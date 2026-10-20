# Diario · Shanxi Fenjiu (600809.SS) · corte 20-oct-2026

- Commit de partida: `44b551af197575460b55a4d6e5a49fb0d5cff3be` («Cola de índices: Hollywood Bowl (pareja 15)»). Checkout compartido con otro análisis: sin pull, commit ni push desde este encargo.
- Inicio 08:58 UTC; cuentas y notas A-E hasta ≈ 09:15; supuestos, textos, motor y Word hasta 09:25; cierre 09:28 UTC.

## Decisiones

- **Cuentas**: `cuentas.mjs` no cubre China. CAS de los informes anuales 2021-2025, semestral 2026 y trimestrales (CNINFO/SSE), tomados de la copia estructurada de Eastmoney y contrastados con los PDF. Coste de ventas = coste + impuesto especial y recargos (税金及附加). Los rendimientos de la tesorería pasan del resultado de explotación al financiero.
- **Puente** a 30-jun-2026: caja = efectivo 9.721,40 + depósitos a plazo y certificados 25.669,69; sin deuda; otros ajustes +8.008,77 (dividendo de 2025 por pagar, pagado el 31-jul).
- **Anticipos de distribuidores** (合同负债): 8.672 M (2024) → 7.007 M (2025) → 6.658 M (jun-26). Se usan como indicador adelantado; el circulante proyectado es el 14,5 % de las ventas (13,5 % en 2025).
- **Existencias de baijiu envejecido**: 14.784 M a jun-26, más de la mitad vino base y semielaborado. Se tratan como activo operativo (no caducan); no se ajustan.
- **Control estatal**: SASAC de Shanxi (56,65 % a través del grupo). Prima adicional de 2,0 puntos en el WACC por China, el control estatal y el declive del consumo.
- **2026e fijo**: 1S26 real + 2S26 −16 % (como el 2T26). BPA propio: 7,38 / 7,77 / 8,55 (2026e-2028e), un 6-9 % bajo el consenso.
- **Dividendo a 12 meses**: 4,80 CNY (65 % del BPA de 2026e); `ltm.dpa_extraordinario` = 1,76 para que el motor no cuente los 6,56 de 2025.
- **Mercado final 2030e**: 700.000 M (estimación propia sobre la serie NBS hasta 2024).
- **Recomendación**: Comprar por la regla v3, convicción Baja; acción robusta Mantener (v2 14,4 % y BPA −10 % 13,1 %). Límite robusto 115,48 CNY.
- **Stock Connect**: 600809 comprable y vendible (lista de HKEX del 20-oct); IBKR ofrece Shanghai Connect a particulares (salvedad de IBHK).
- **Riesgo de IA**: bajo, neutral.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas anuales | Informes anuales 2021-2025 (CNINFO/SSE), copia de Eastmoney | 31-dic-2025 |
| Cuentas semestrales y balance del puente | Informe semestral 2026 | 30-jun-2026 |
| Trimestres | Informes 1T26, 9M25, datos operativos | 30-jun-2026 |
| Dividendo y reparto | Anuncios de reparto y pago, plan 2025-2027 | 31-jul-2026 |
| Gobierno y directivos | Informe anual, junta, anuncios del 27-jul | 28-jul-2026 |
| Consenso | Eastmoney (30 informes), seis notas del 1S26, Yahoo | 20-oct-2026 |
| Bolsa (rentabilidades, beta, cierres) | `herramientas/bolsa.mjs` (600809.SS, 510300.SS, 512690.SS) | 20-oct-2026 |
| Movimiento (regla 13) | `NODE_USE_ENV_PROXY=1 node herramientas/movimiento.mjs 600809.SS` | 20-oct-2026 |
| Comparables | Yahoo (`notas/comparables-yahoo.mjs`) | 20-oct-2026 |
| Tasa libre | ChinaBond, curva a 10 años | 19-oct-2026 |
| Prima de mercado implícita | Damodaran, ERPbymonth | oct-2026 |
| Lista de Stock Connect | HKEX, List of SSE Securities | 20-oct-2026 |
| Precio | Sina (15:34:59 de Pekín) y `herramientas/precios.mjs 600809` | cierre 20-oct-2026 |
| Notas e integración | `notas/construir-notas.mjs`, `motor/integrar.mjs` | 20-oct-2026 |
| Cálculo | `motor/calcular-empresa.mjs` (20 de 21 controles; 1 explicado) | 20-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, soffice | 20-oct-2026 |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs fenjiu-2026-10-20` | 20-oct-2026 |
| Robustez | `node herramientas/robustez.mjs informes/fenjiu-2026-10-20 --actual` | 20-oct-2026 |

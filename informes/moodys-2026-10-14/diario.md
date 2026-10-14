# Diario · Moody's (MCO) · 14-oct-2026

- Commit de partida: 3ca3db3 (Booking Holdings, 14-oct). Prompt y regla de múltiplos común vigentes en ese commit.
- Entorno: nube de Claude Code. La red solo deja WebSearch; WebFetch, curl, descargar.mjs y bolsa.mjs no funcionan. Todas las cifras salen de los resultados de búsqueda (comunicados de resultados del 8-K, 10-K y 10-Q citados, ChartRow, Stock Analysis, Fidelity, Weiss, prensa), con la URL como fuente. Sin subagentes: notas A-E hechas por el analista principal con `notas/construir_notas.py` (Python que escribe los JSON).
- Reutilizado del informe de S&P Global (12-oct): serie, Porter, drivers y regulación del sector; competidores; comparables (con S&P Global en lugar de Moody's) y transacciones, con sus fuentes renumeradas; tasa libre (5,24 %, FRED del 9-oct) y prima de Damodaran (4,2 %).
- Confianza: media en cuenta, trimestres y flujos (cuadran entre comunicados y proveedores); baja en balance (patrimonio 2021-2022 por diferencia, sin circulante), gobierno (proxy no leído) y consenso (una sola fuente de BPA, sin 2027-2028). Precio del 9-oct (464,23 USD), no del 13-oct. Beta 1,15 estimada (sin bolsa.mjs).
- Tiempos (reloj del contenedor): 12:15 inicio; 12:24 notas A-E (≈ 25 búsquedas); 12:28 informe completo con 17 de 17 controles; 12:30 Word (45 págs.) y PDF con soffice; 12:33 revisión a 12 meses y diario.
- Decisiones: ROIC sobre patrimonio + deuda neta (8.623 M, incluye fondo de comercio e intangibles): 30,5 %; las recompras hunden el patrimonio (ROE 64,6 %, sin sentido) pero no el capital invertido. Sin el fondo de comercio el capital operativo es casi nulo (cobros por adelantado). Circulante proyectado en 0 %. Terminal «media» (Gordon 3 % y 18x EBITDA). Sostenibilidad: «Sí», prueba a mano (reinversión neta negativa): precio + volumen sin ganar cuota. BPA de la rentabilidad a 12 meses en base ajustada (la de la empresa), con la historia del PER en la misma base.
- Línea 12 m: objetivo ponderado 524,93 USD (+13,9 %), base 506,27 (+9,9 %), valor intrínseco 357,41 (−23,0 %) → **Mantener**, convicción media. Comprar por debajo de 357,41; vender por encima de 587,65. Consenso 553 USD (base −8,5 %).

## Lecciones
- Con un competidor directo analizado días antes (S&P Global), su `datos.json` sirve para sector, competidores, comparables y transacciones: basta un remapeo de citas `[n]` a la lista de fuentes de la nota (función `Lista.remap` en `construir_notas.py`).
- En entorno solo-búsqueda, el precio de cierre del día anterior al corte puede no aparecer; usar el último cierre fechado (Yahoo) y decirlo.

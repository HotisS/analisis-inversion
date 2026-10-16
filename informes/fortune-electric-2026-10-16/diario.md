# Diario · Fortune Electric (1519.TW) · 16-oct-2026

- Commit de partida: 7409c4a (entorno actual en 44d54a4 sin cambios míos fuera de esta carpeta).
- Entorno: nube de Claude Code, sin subagentes (fases A-E hechas por mí). Origen: hueco de los grandes índices (MSCI EM, MSCI Taiwan); el escáner daba ROIC − WACC ≈ 33, ventas +47 %/año en 3 años y margen de seguridad ≈ 41 %.
- Fecha de corte 2026-10-16; precio: cierre del 16-oct (656 TWD, `bolsa.mjs`). Divisa TWD; cierre en diciembre; NIIF de Taiwán; auditor Deloitte.

## Fuentes y limitaciones
- MOPS, openapi de la TWSE y la web de la empresa bloqueados (aviso de seguridad, 查詢過量, Incapsula). Los PDF oficiales en inglés (informe anual 2025; estados consolidados 2025, 2023 y 2022) y el semestral de jun-26 en chino salieron de doc.twse.com.tw vía WebFetch y pdftotext.
- Trimestres de Stock Analysis (curl sin User-Agent; con UA da 403), cuadrados con los semestrales. Ventas mensuales de HiStock y Anue.
- Consenso: FactSet vía Anue (BPA en la base antigua de 315,9 M acciones: se divide por 1,1) y Stock Analysis/S&P.
- Bono de Taiwán a 10 años: 2,03 % (Trading Economics). Cambios del BCE del 15-oct y USD/TWD 32,338 de la prensa de Taipéi (Yahoo limitado).

## Decisiones
- BPA y DPA de todos los años reexpresados sobre 347,47 M acciones (ampliación gratuita del 5-ago-2026).
- 2026e fijo (+3,2 %): nueve meses −0,7 % y 4T ≈ 9.000 M. Base +24 % 2027e y +18 % 2028e (consenso +26 % y +21 %), luego 10/6/4/3 %. Margen EBITDA 24-24,5 % hasta 2028e y bajada al 18 % en 2032e (pico de ciclo; 5-7 % en 2021-22). Capex 8 % → 3 % (incluye altas de derechos de uso); circulante 15 % → 18 % (los anticipos se devuelven al acortarse los plazos); impuestos 22 %.
- WACC 8,94 %: tasa libre 2,03 %, beta 1,1, prima 5,5 % + 1,0 (Taiwán y concentración). Terminal Gordon 1,5 %.
- Puente jun-26: resta el dividendo de 3.474,7 M pagado en agosto (seguía en la caja); suma 555,6 M de depósitos a plazo; arrendamientos 2.142,1 M (suelo de Taichung).
- Escenarios 30/50/20; bajista con perfil en 2028e (−23 pp de crecimiento, −6 pp de margen) y −3/−3 después.
- ROIC del motor 51,6 % (capital invertido de 7.884 M con 7.533 M de anticipos restados); sin anticipos ≈ 26 %; en 2021-22, 5-6 %. ROIC − WACC sin redondear: 51,6 − 8,94 = 42,66 (≈17 sin anticipos).
- Sostenibilidad «Sí» (pruebas del motor pasan; cuota mundial 1,2 % → 1,5 % en 2030).

## Resultado
- Mantener, convicción media. DCF 183,70 TWD; valor intrínseco (síntesis) 231,40 TWD (−64,7 %); DCF inverso sin solución (rentabilidad implícita 3,6 %).
- **Línea 12 m:** objetivo ponderado 599,58 TWD (−7,1 %; base +13,6 %), Mantener; comprar < 231,40, vender > 677,31. Detalle en `revision-12m-2026-10-16.md`. No se han ejecutado `apuntar-12m.mjs`, `seguimiento.mjs`, `cobertura.mjs` ni `calendario.mjs` (lo hace el integrador); falta añadir 1519.TW a `simbolos.json`.
- Robustez: SÓLIDA; acción robusta «No mantener». Regla 13: `movimiento.mjs 1519.TW` → 1 m −5,9 %, 3 m +4,4 %, 6 m −17,7 %, 12 m +24,2 %, −33,2 % del máximo, tendencia bajista, sin avisos. Veredicto: no cambia.
- Controles: 19 de 20 correctos y 1 explicado (DCF inverso sin solución).
- Próximos resultados: ≈13-nov-2026 (estimación de Stock Analysis; plazo legal 14-nov).

## Lecciones (para el integrador)
- Taiwán: las ampliaciones gratuitas anuales cambian la base del BPA cada agosto; el consenso de FactSet que publica la prensa suele seguir en la base anterior. Reexpresar todo a la base vigente antes de la regla a 12 m.
- Fabricantes con anticipos de clientes grandes: el ROIC del motor se dispara porque los pasivos de contrato restan capital; dar también el ROIC sin anticipos y el de mitad de ciclo.

# Diario · Thermo Fisher Scientific (TMO) · 14-oct-2026

- Commit de partida: 508aa90 (ASML, 14-oct). Prompt de `verticales/empresa/prompt.md` sin cambios durante el análisis.
- Entorno: nube de Claude Code, igual que Group 1 Automotive. La red solo deja salir a la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan y no se probaron. Las cifras salen de extractos de búsqueda (8-K de resultados, 10-K 2025, DEF 14A 2026, Stock Analysis, prensa), con la URL como fuente. Sin subagentes: notas A-E escritas por mí con `notas/` como siempre (builder en el directorio temporal, no en el repo).
- Fecha de corte: 2026-10-14. Divisa: USD. Cierre: diciembre. US GAAP. Precio: 663,04 USD, cierre del 13-oct (la sesión del 14 no había cerrado). Resultados del 3T26: 21-oct-2026.
- Tiempos: 11:00 inicio; 11:15 búsquedas de núcleo cerradas (17 búsquedas: precio, 2T26, 1T26, 4T25, cuentas, balance, flujos, consenso, comparables, proxy, sentimiento); 11:22 notas A-E; 11:26 primer cálculo e informe; 11:30 cierre.
- Reutilizado: comparables de IQVIA, Charles River (análisis de Medpace, 8-oct) y Qiagen (bioMérieux, 8-oct), y el bono a 10 años del 13-oct (5,22 %) de Group 1 Automotive.
- Confianza: Media en cuentas (Stock Analysis cuadra con los comunicados en ingresos, EBIT, beneficio y FCF); Baja en gobierno, sector, competencia y bolsa (sin proxy completo, sin tamaño de mercado ni cifras de competidores, sin beta publicada). Algunas cifras antiguas (flujo operativo y capex 2021-2024, BPA trimestrales 3T24-3T25, cierres 2018-2023) son de memoria de los documentos de la empresa y cuadran con totales publicados: dicho en `meta.limitaciones`.

## Decisiones

- EBITDA GAAP en el DCF (23,6 % en 2025); BPA del objetivo a 12 meses y PER histórico en base ajustada (sin amortización de intangibles), con el margen ajustado = GAAP + 1,3 puntos, calibrado con 2025 y con la guía de 2026 (−1,7 %).
- PER histórico sin 2020-2021 (covid). Beta de 0,85 por juicio (sin dato publicado accesible).
- Sostenibilidad «Sí»: la reinversión neta es casi nula y el motor no hace la prueba; hecha a mano (orgánico del 4,5-5 % = el del mercado y el del 2T26, sin compras nuevas, capex por encima del de 2025). No hubo que rebajar el base. Matiz: ROIC 7,3 % < WACC 9,10 % por el fondo de comercio.
- Puente: deuda y caja del 27-jun-2026 (42.549 / 4.064 M); −1.025 M por la venta de microbiología cobrada en agosto y +325 M de pagos aplazados de Clario (otros_ajustes −700).
- 16 de 16 controles correctos; síntesis de 649 palabras.

## Resultado

- Recomendación: **Mantener**, convicción Media (la sugerida). Valor intrínseco 456,88 USD (−31,1 %); DCF 345,74 USD (WACC 9,10 %); DCF inverso: el precio descuenta un 13,9 % de crecimiento anual (base 4,5 %) o una rentabilidad del 6,6 %.
- **Línea 12 m**: objetivo 703,14 USD; ponderada +6,3 %, base +7,3 % (con dividendo); bajista 628,05 / base 709,71 / alcista 765,07 (PER 23,7x / 24,6x / 25,2x × BPA 2028e 26,50 / 28,85 / 30,36). Consenso 635,08 USD (agosto). Comprar por debajo de 456,88 USD; vender por encima de 783,26. Detalle en `revision-12m-2026-10-14.md`. No se ha ejecutado `apuntar-12m.mjs` ni `seguimiento.mjs` (lo integra el usuario).

## Huecos principales

Tamaño del mercado y cifras de competidores (núcleo); consejo completo, voto de remuneración, accionistas y Form 4 (núcleo); EV/EBITDA y márgenes de DHR, A, WAT y MTD (solo PER); rentabilidades de bolsa y beta; coste de ventas, impuestos y activo corriente por año; geografías; consenso de 2028e.

## Lecciones

- Con la red limitada a WebSearch, los comparables de otras carpetas del mismo sector y de la misma semana (Medpace, bioMérieux) ahorran 3-4 búsquedas; los de Thermo Fisher en Medpace sirvieron además de contraste del propio múltiplo (PER NTM 24,3x a 8-oct).
- En compradores en serie con BPA ajustado sin amortización de intangibles, el BPA del objetivo a 12 meses debe restar solo la depreciación; calibrarlo con la guía del año en curso (aquí −1,7 %) evita errores de base.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 33.9x, mínimo 29.3x, media larga 33.7x; antes v2 24.6x/23.7x/25.2x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.

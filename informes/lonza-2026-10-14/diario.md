# Diario · Lonza (LONN) · 14-oct-2026

- Commit de partida: 3ca7dde (EssilorLuxottica, 14-oct). Otra sesión trabaja en paralelo en el análisis growth; no se ha tocado nada fuera de esta carpeta.
- Entorno: nube de Claude Code. La red solo deja la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan. Las cifras salen de extractos de búsqueda (informe de resultados 2025 de Lonza vía SGX, ad hoc de lonza.com, AWP/VZ, finanzen.ch, Stock Analysis, Investing.com, aktien.guide, informes anuales para los cierres), con la URL como fuente. **Confianza baja**: ventas, CORE EBITDA, CORE EPS, deuda neta, caja libre operativa, capex y ROIC cuadran con los comunicados; faltan la cuenta completa de 2022-2024, el balance por años, el circulante, la deuda bruta, segmentos, tamaño del mercado, beta, rentabilidades de bolsa, remuneración y accionistas.
- Fecha de corte: 2026-10-14. Divisa: CHF. Cierre: diciembre. Precio: 570,20 CHF, la cotización de la tarde del 13-oct (finanzen.ch); el 14-oct, día del inversor en Vacaville, cotizaba a 575,60 a media mañana. Cierres anuales de los informes anuales (2021-2025).
- Tiempos: 14:33 inicio · 14:40 fin de la investigación (≈30 búsquedas) · 14:47 informe calculado, Word y PDF (37 páginas) · 14:50 revisión 12 m y diario.
- Decisiones:
  - Notas A-E escritas por mí sin subagentes (`notas/notas_build.py`); supuestos en `supuestos.mjs`, textos en `textos.mjs` y `resumen.mjs`.
  - Perímetro: 2022-2023 del grupo (con CHI) y 2024-2025 del negocio continuado reexpresado; EBITDA = CORE EBITDA; BPA del objetivo a 12 m y del PER histórico = CORE EPS. Solo 4 ejercicios (control explicado).
  - Puente: deuda neta del grupo a dic-25 (3.258 M) con caja 719 M y deuda bruta estimada 3.977 M; otros_ajustes −2.000 M por CHI (1.700 M en efectivo + 300 M prudentes por el 40 % retenido).
  - WACC 6,61 %: bono suizo 0,54 %, beta 1,0 estimada, prima 5,5 % + 1 punto adicional (como Roche y Givaudan), deuda al 2 % y 8 %. Terminal 1,0 % en CHF, sin etapa 2 (ROIC − WACC < 5 con el motor).
  - Sostenibilidad: la prueba de reinversión falla (capital nuevo al 32,2 % frente a ROIC 9,3 %, que incluye CHI). Caso base rebajado dos veces: crecimiento de 9,5 % a 9,0/8,5 % en 2027-2028 y caída más rápida hasta el 2 % en 2035; margen final del 37 % al 36 %; capex subido al 19 % en 2027-2028 y 13,5 % al final. DCF de 591 → 481 → 446,65 CHF. Veredicto «En parte» (control explicado; no se puede hacer pasar sin un capex irreal).
  - PER histórico sin 2021 (60,1x, burbuja de vacunas).
  - Convicción baja, la sugerida (absoluta Vender, relativa Mantener).
- Resultado: **Mantener, convicción baja.** Valor intrínseco 456,97 CHF (−19,9 %); DCF 446,65; con la prima implícita del mercado, DCF 584,01 y valor 565,91. DCF inverso: crecimiento del 9,1 % en 2027-2035 (base 5,8 %) o margen del 41,6 % (base 36 %). 17 de 18 controles correctos y 1 explicado. 48 fuentes.
- Línea 12 m: objetivo 654,39 CHF → ponderada +15,6 %, base +13,5 % (PER 23,6 / 27,8 / 33,9x × CORE EPS 19,0 / 23,1 / 26,1) → Mantener por el filtro de valor real; compra < 456,97 CHF, venta > 732,65 CHF. Consenso 681 CHF (23 analistas). Pasa los umbrales de rentabilidad de MEMORIA (≥15 y ≥12) pero no el de valor real; calidad: ROIC − WACC 2,7 puntos con el motor (≈5,3 con el ROIC publicado del 11,9 %), no llega a 5 con el motor.
- Pendiente (no hecho por encargo): `apuntar-12m.mjs`, `seguimiento.mjs`, cola, commit y push.

## Lecciones

- Empresa con una división en venta clasificada como interrumpida (Lonza-CHI): el capital invertido del motor incluye sus activos y el ROIC sale bajo (9,3 % frente a 11,9 % publicado), lo que hace fallar la prueba de sostenibilidad; meter el cobro esperado en `otros_ajustes` y explicar el ROIC sin la división.
- CDMO con capex del 15-20 % de las ventas: el crecimiento del plan (11-13 %) no pasa la prueba de reinversión ni con capex alto; el exceso viene de llenar capacidad ya pagada y del margen, y conviene decirlo en vez de forzar el capex.
- 2026-10-14: datos-v2.json y «Lonza - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v2 Mantener 15,6 % (antes v2 Mantener 15,6 %).

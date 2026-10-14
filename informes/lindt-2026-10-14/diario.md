# Diario · Lindt & Sprüngli (certificado LISP.SW) · 14-oct-2026

- Commit de partida: 75628ac. Sin commits ni push (lo hace el coordinador). Inicio 17:33 UTC.
- Entorno: nube de Claude Code, sin subagentes. Notas A-E con `notas/construir-notas.mjs`; parte del analista en `propio.mjs` + `supuestos.mjs` + `textos.mjs` (mismo formato que Kuehne+Nagel).
- Documentos primarios descargados (descargar.mjs, en `notas/docs/`): informe anual 2025, informe semestral 2026 (y 2025), notas de prensa y presentaciones de resultados 2025 y 1S26, ventas 2025, actualización de guía del 29-sep-2026 y programa de recompra 2026. Suiza sin XBRL: cuentas de los PDF.
- **Unidad de análisis: el certificado LISP** (el más líquido). 1 nominativa LISN (nominal 100 CHF) = 10 certificados (nominal 10 CHF) en dividendo y liquidación; el certificado no vota. BPA y dividendo «por acción / 10 certificados» ÷ 10; acciones = equivalentes a certificado (2,282 M diluidos). LISN 81.600 frente a 10 × LISP = 78.400: prima del 4,1 % por el voto.
- Bolsa: bolsa.mjs con LISP.SW, ^SSMI y EXH3.DE (alimentación y bebidas; EXV3 era tecnología, corregido). Precio 7.840,00 CHF (cierre del 14-oct); beta 0,89; caída desde máximos del 44 %.
- **Confianza de los datos: media.** 2024, 2025 y 1S26 de fuente primaria; detalle de 2021-2023 (balance y flujos) del resumen a cinco años del informe anual 2025 y de Stock Analysis (marcado como estimación). Consenso de MarketScreener (por nominativa ÷ 10). Tasa libre 0,54 % (Trading Economics; la API del SNB estaba desfasada), como Roche, Givaudan y Lonza.
- Decisiones: 2026e fijo con la guía de septiembre (0-2 % orgánico, tomamos 1 %, y −3 puntos de divisa → −2 % en francos; margen EBIT 16,5-17 %). Pensiones netas en el puente (70 M); 116,4 M de recompras tras junio en otros ajustes. Sostenibilidad «Sí» (crecimiento 3,5 % frente a mercado del 4 % y reinversión del 13 %). Pesos DCF 50 / comparables 10 / escenarios 40. Ciclo del cacao: viento de cola para el margen bruto de 2027, devuelto en parte con rebajas de precio para recuperar volumen (margen EBIT +30 pb al año, no más).
- Resultado: DCF 8.137,76 (+3,8 %), WACC 5,53 %, valor terminal el 76 %; escenarios 6.022 / 8.138 / 9.231; comparables 6.188; **valor intrínseco 7.840,62 (0,0 %)**. DCF inverso: 3,4 % de crecimiento implícito (base 4,3 %). Con la prima del mercado (4,2 %): 10.583,76. ROIC 13,2 % (el excedente de pensiones infla el capital; sin él, más del 20 %) frente a WACC 5,53 %: calidad Sí.
- **Línea 12 m (v3 ×1,1)**: objetivo 9.787,29 CHF; ponderada +27,1 %, base +21,9 % → regla Comprar; **v2: +15,5 % / +11,1 % Mantener**. Recomendación del informe: **Mantener, convicción baja** (absoluta Mantener, relativa Comprar; v2 no confirma). Comprar < 7.840,62 (robusta < 7.775,57); vender > 11.074,77. Detalle en revision-12m-2026-10-14.md.
- **Robustez** (robustez.mjs, sin --escribir): **FRÁGIL**; acción de la regla Comprar, acción robusta **Mantener en cartera** (cambia con v2). Colchón de BPA: 9 % para Comprar, 14 % para mantener. Avisos D3 (sin cierre en precios.json) y M6 (elasticidad del objetivo 1,01); ningún CORREGIR. Objeción más fuerte: el Comprar depende del múltiplo (de 23,2 a 25,5 veces) con dos recortes de guía en siete meses, v2 lo deja en Mantener y el valor intrínseco es igual al precio.
- **Riesgo de IA: bajo.** Bienes físicos de marca vendidos en tienda y regalo; la IA no sustituye el producto. Solo efectos indirectos (precios dinámicos de la distribución, eficiencia propia).
- **Sentimiento en foros: negativo y empeorando** (desconfianza en la guía tras los dos recortes; poco debate). Confianza baja.
- Word y PDF (soffice): cobertura 89,6 %, 28 gráficos; 19 de 22 controles correctos y 3 explicados (R² de la regresión, estabilidad de comparables, compra robusta).
- Ficha sectorial «Chocolate y confitería prémium» en `sectores/chocolate-2026-10-14.md` con 7 comparables en `sectores/chocolate-2026-10-14-comparables.json`.
- Para subir la confianza: balance y flujos de 2021-2023 de los informes anuales originales (no accesibles en la biblioteca de Lindt), ventas 2026 (19-ene-2027) y guía 2027 con los resultados anuales (9-mar-2027).
- Próximos resultados: ventas 2026 el 19-ene-2027; resultados anuales el 9-mar-2027.
- Tiempo: unos 30 minutos de reloj tras la reanudación (17:33-18:00 UTC).

## Lecciones

- La biblioteca de documentos de Lindt se carga con JavaScript, pero los PDF están en el HTML como `href=/media/...pdf` sin comillas: un grep de esos enlaces basta para descargarlos con descargar.mjs.
- La API de datos del SNB devolvía series desfasadas; para el bono suizo a 10 años, Trading Economics (como en Roche, Givaudan y Lonza).
- Doble línea de acciones (nominativa y certificado): trabajar en una sola unidad (equivalentes a certificado) para BPA, acciones, dividendo y precio; los PER del informe anual suelen ir por nominativa.
- Un excedente de pensiones grande infla el capital invertido del motor y rebaja el ROIC; explicarlo en el texto de rentabilidad del capital.
- El ETF sectorial europeo de alimentación es EXH3.DE (EXV3 es tecnología).

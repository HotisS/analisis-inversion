# Diario · Diagnostyka (DIA.WA) · 15-oct-2026

- Commit de partida: bdddf8d. Empezado a las 08:32 UTC; Word y PDF a las 08:56 UTC (≈ 25 minutos de reloj, más la parte anterior a la compactación del contexto).
- Origen: escaneo «calidad a precio» (PER adelantado ≈ 15,7x, ROIC − WACC ≈ +17, ventas +19 % anual, −24 % desde máximos).
- Entorno: nube de Claude Code. Notas A-E y propio hechos por mí sin subagentes (`notas/construir-notas.mjs` escribe A-E; `propio.mjs` + `supuestos.mjs` + `textos.mjs`). Ficha sectorial nueva: `sectores/laboratorios-clinicos-2026-10-15.md` (+ comparables JSON), citada como P4.
- **Cuentas**: `cuentas.mjs --esef "Diagnostyka"` no encuentra la entidad y filings.xbrl.org da 404 con el LEI 259400TB69IYA2WJEU71 (GLEIF). Cuentas copiadas de los PDF oficiales de grupadiagnostyka.pl (consolidadas 2024 y 2025, semestral 2026, informes de gestión, presentaciones 3T24-2T26). 2022 parcial; 2021 fuera (716 M PLN de ingresos COVID que distorsionaban la prueba de sostenibilidad).
- **Precio**: 159,00 PLN, cierre del 14-oct en Yahoo (del 5 al 13-oct Yahoo repite 159 sin volumen). WIG y WIG20 rotos en Yahoo: rentabilidad del índice n.d.; beta propia frente a ETFBW20TR 0,56 (poco representativa), se usa 0,85.
- **WACC en PLN 10,23 %**: bono polaco a 10 años 6,23 % (BCE, sep-2026), beta 0,85, prima 5,5 %, prima adicional 0,4 % (prima país de Damodaran 1,10 % menos el diferencial de impago de 0,72 % que ya lleva el bono en PLN), deuda al 6,6 %, peso 18 %. Terminal al 3,5 % (inflación objetivo 2,5 % + 1 % real; explicado).
- Control: los fundadores Głownia y Prusek y el CEO Swadźba (no MedTech/Jakubowski, como suponía el encargo) tienen el 47 % del capital y el 64 % de los votos con acciones de voto doble.
- NFZ: paga a la atención primaria una cápita que incluye las pruebas, así que la mayoría de los precios se negocian; precio público solo en cribados e imagen (6 % de las ventas). Crecimiento orgánico del 17,9-20,9 % en 2023-2025; las compras son pequeñas (≈ 2 puntos al año).
- **Confianza de los datos de núcleo: media.** Cuentas de fuente primaria, pero copiadas a mano de PDF; precio de Yahoo con sesiones sin volumen; consenso solo de Yahoo (MarketScreener y Stockopedia bloqueados); foros polacos sin acceso.
- Resultado: DCF 111,10 PLN (−30,1 %); síntesis 119,47 (−24,9 %); con la prima del mercado 138,75 (−12,7 %). DCF inverso: 15,3 % anual de crecimiento (base 8,5 %) o margen del 28,3 %. ROIC 21,3 % (30,4 % sin fondo de comercio) frente a WACC 10,23 %. Sostenibilidad «Sí» (motor y analista); el control no rebaja el base. Calidad: «Sí».
- **12 meses**: selector v2 (1 año de historia): objetivo 186,14 PLN, ponderada 19,8 %, base 16,5 % (apuntar-12m --simular: 19,9 / 16,6); v3 25,5 / 28,1. **Mantener**, convicción media: valor intrínseco por debajo del precio. Comprar < 119,47; vender > 211,71. Robustez SÓLIDA, acción robusta «No mantener».
- IA: exposición media, sentido mixto, ±5 %. Sentimiento: de entusiasmo en la OPV a escepticismo por el margen (prensa y blogs; confianza baja).
- Word y PDF (soffice): 20 de 21 controles y 1 explicado (terminal 3,5 %). Cobertura 86,2 %. Avisos: sin múltiplos históricos (cotiza desde 2025), sin calificaciones ESG, sin suma de partes.
- Próximos resultados: 3T26 el 26-nov-2026.

## Lecciones

- En Polonia, la prima adicional del WACC en PLN no es la prima de riesgo país entera de Damodaran: el bono en PLN ya lleva el diferencial de impago (0,72 %); sumar los dos cuenta el riesgo país dos veces. Aquí, 1,10 − 0,72 = 0,4 %.
- Para una empresa que tuvo ingresos COVID en 2021 (laboratorios), quitar 2021 de la cuenta: con él, el crecimiento histórico sale bajo y la prueba de sostenibilidad da «En parte» por un motivo falso.
- En `propio.mjs`, si los textos de catalizadores, riesgos y preguntas van dentro de `T.secciones`, no los pises después con `T.catalizadores ?? null`: el motor marca la sección «riesgos» como vacía.
- Yahoo devuelve para valores de Varsovia días repetidos sin volumen; usar el último cierre con volumen y anotarlo. Los índices WIG/WIG20 no tienen serie útil en Yahoo.

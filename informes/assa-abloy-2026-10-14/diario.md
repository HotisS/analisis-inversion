# Diario · ASSA ABLOY (ASSA B) · 14-oct-2026

- Commit de partida: d87c72a (TSMC 14-oct; método v2 con regla de múltiplos común).
- Entorno: nube de Claude Code. La red solo deja salir a la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan. Todas las cifras salen de los resultados de búsqueda (informes del 4T25 y 2T26 en Cision, presentaciones del 1T26 y 2T26, informe anual 2025, Stock Analysis, Stockopedia, Inderes, MarketScreener, Investing.com, prensa), con la URL como fuente; lo que no cuadró va a `null` y a `meta.huecos`. Sin subagentes: notas A-E escritas por mí con `notas/notas_build.py`.
- **Confianza**: media en cuenta de resultados 2021-2025, deuda neta, trimestres y consenso de BPA (cifras de dos fuentes que cuadran: BPA × acciones = beneficio; PER × BPA = precios de cierre conocidos); baja en balance detallado, comparables (solo PER), gobierno (sin consejo, remuneración ni votos), sector (sin tamaño de mercado del perímetro de la empresa) y sentimiento (solo Nordnet y comunidades de Simply Wall St y GuruFocus; nada en Reddit, Seeking Alpha ni Stocktwits).
- Fecha de corte 2026-10-14; SEK; cierre en diciembre; NIIF-UE. Precio 353,10 SEK (08:51 UTC del 14-oct, ad-hoc-news), 1.111 M de acciones (BPA × acciones cuadra con el beneficio de 2021-2025). Próximos resultados: 27-oct-2026 según onvista, Investing y ad-hoc-news (el encargo decía 22-23 oct).
- Decisiones:
  - Cinco ejercicios (2021-2025); 2025 con 1.513 M de partidas que afectan a la comparabilidad en `no_recurrentes_en_ebitda` (EBITDA ajustado 30.745 M = Inderes).
  - Puente con la deuda neta financiera publicada a 30-jun-2026 (68.246 M) tal cual.
  - Comprador en serie (lección de `lecciones-casos.md`): compras dentro del capex. Con 2,0-2,2 veces las ventas compradas la prueba de sostenibilidad fallaba (capital nuevo al 24,6 % y 15,2 %); el caso base lleva 2,5 veces (HHI a 14x EBITDA), orgánico del 3 % y margen máximo del 20,9 %, y pasa (13,0 %). Veredicto «En parte».
  - WACC 7,47 % (bono sueco 3,0 % de julio, beta 0,95 estimada, prima 5,5 %). Con la prima del mercado (4,20 %), DCF 356,97 SEK.
  - PER histórico sin 2021 (28,2x, tipos a cero).
- Resultado: 18 de 18 controles correctos. Word (36 páginas) y PDF (soffice).
- 14-oct, 11:40 UTC: **revisión a 12 meses v2**: objetivo 373,40 SEK, ponderada +7,6 %, base +9,0 % → **Mantener**, convicción baja (reglas discrepan por la tasa). Valor intrínseco 299,67 SEK (−15,1 %). ROIC − WACC 3,0 puntos. Comprar por debajo de 299,67 SEK; no pasa el requisito de calidad de la cartera a ningún precio. Detalle en `revision-12m-2026-10-14.md`. No se ejecutó `apuntar-12m.mjs` ni `seguimiento.mjs` (lo integra el usuario).
- Tiempo: ≈40 minutos de trabajo (unas 25 búsquedas web).

## Lecciones

- Comprador en serie con ROIC bajo por fondo de comercio (ASSA ABLOY, 10,5 %): la prueba de sostenibilidad solo pasa con el coste real de las compras (≈2,5 veces las ventas, no 1,3) y eso hunde el DCF frente al precio; el valor intrínseco queda por debajo del objetivo a 12 meses y la convicción baja por la tasa. Dilo en la síntesis.
- Sin `bolsa.mjs`, los precios de cierre anuales salen bien de multiplicar el PER de cierre de MarketScreener por el BPA del año (comprobable con el BPA × acciones = beneficio).

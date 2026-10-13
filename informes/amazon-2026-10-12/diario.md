# Diario — Amazon (AMZN), corte 2026-10-12

- Commit de partida: a5ae59d Cartera: efectivo inicial 2.920 EUR y tabla actual frente a nueva con contribución por valor.
- Fase 1: Amazon.com, Inc., AMZN (Nasdaq), ISIN US0231351067, CIK 1018724; USD, US GAAP, ejercicio natural; Delaware, Seattle. Corte lunes 12-oct-2026 con la sesión de EE. UU. sin cerrar: precio del viernes 9-oct (262,43 USD, bolsa.mjs; beta 5 años mensual 1,49 frente a SPY). Último informe: 10-Q del 2T26 (31-jul-2026); 3T26 aún sin publicar (finales de octubre; D confirma). Primer análisis de Amazon en el repo (sin iteración previa).
- Criterios contables fijados para los subagentes: arrendamientos financieros + financing obligations a la deuda (los operativos no, US GAAP); EBITDA = beneficio operativo + D&A del inmovilizado (con arrendamiento financiero) e intangibles, sin la amortización de derechos de uso operativos ni de contenidos; ganancias de Anthropic/Rivian fuera de la explotación (otros ingresos); capex neto de incentivos; compra de Globalstar (S-4) pendiente.
- Lanzo A-E a la vez, en primer plano (otros dos análisis en paralelo: máximo cinco subagentes).
- Subagentes A-E terminados (A 12 min, B 16, C 10, D 12, E 5). Integro.
- Integración: 103 fuentes, 14 huecos. Supuestos: 2026e fijo (+15,2 %, EBITDA 19,8 %, capex 26,4 % con la guía de ≈220.000 M), consenso 2027-28 algo por encima del nuestro; margen EBITDA al 30,5 % y capex al 12 % en 2033e (amortización 11 %); WACC 12,06 % (beta 1,32, prima 5,5 %, Tesoro 5,22 %); g 3,0 %; etapa de transición de 7 años. Puente: participaciones en Anthropic/OpenAI 224.895 M menos impuesto latente estimado 36.500 M (otros_ajustes).
- Resultado: DCF 187,97; objetivo 213,96 (−18,5 %); con la prima del mercado 251,97 (−4,0 %). Regla Mantener (absoluta Vender, relativa Mantener), convicción Baja (sugerida). Alcista +1,0 %, bajista −59,0 %. DCF inverso: 15,2 % de crecimiento 2027-33 frente al 10,8 % base; rentabilidad implícita 9,9 %. Sostenibilidad «En parte». Suma de partes 236,97 (peso 10).
- Word y PDF (57 páginas) generados; portada y «La decisión» revisadas. Quedan 2 controles en «Revisar», explicados (rendimiento del capital nuevo y regresión de comparables).

## Lecciones nuevas
- Participaciones con plusvalías latentes enormes (Anthropic/OpenAI en Amazon: 224.895 M a nivel 3): el puente las suma a valor contable, pero hay que restar el impuesto latente (aquí estimado, 21 % sobre ~174.000 M) en `otros_ajustes`; además el ROIC del motor las mete en el capital invertido y dispara el control de «rendimiento del capital nuevo».
- Amazon (US GAAP): la línea de amortizaciones del estado de flujos mezcla inmovilizado, contenidos y derechos de uso operativos; el EBITDA del consenso de MarketScreener suma todo eso y la remuneración en acciones (+6,6 % de las ventas). El BPA 2026e de MarketScreener incluye las ganancias de Anthropic (12,89 frente a 8,31 de Stock Analysis): el PER NTM no sirve.
- Sentimiento: el feed RSS de Seeking Alpha (`seekingalpha.com/api/sa/combined/<TICKER>.xml`) y los índices mensuales de Motley Fool (`fool.com/sitemap/AAAA/MM`) abren y dan artículos con fecha; Stocktwits y los artículos de Seeking Alpha dan 403.
- `descargar.mjs` duplica la extensión si el nombre ya la lleva (`X.json.json`).

- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 351 USD (ponderado; base 338), rentabilidad +33,9 % (base +28,7 %), señal Comprar (`revision-12m-2026-10-13.md`).

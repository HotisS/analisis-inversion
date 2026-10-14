# Diario · Novonesis (NSIS-B.CO) · 14-oct-2026

- Commit de partida: e41ffb4 (al terminar, HEAD local en 657198e por commits del coordinador; no he hecho commit, push, pull ni stash).
- Entorno: nube de Claude Code. Inicio anotado 17:30 UTC; fin 17:53 UTC (reloj del contenedor). En trabajo efectivo pasó del presupuesto de 40-50 minutos por la conversión de divisas y la base del BPA.
- Fecha de corte 2026-10-14; cuentas en EUR (`meta.divisa`), cotización en DKK, `tipo_cambio` 0,13377 (BCE: 7,4754). Ejercicio natural. Notas A-E y propio hechos por mí sin subagentes (`notas/construir-notas.mjs` escribe A-E; `propio.mjs` + `supuestos.mjs` + `textos.mjs`).
- Fuentes primarias: informe anual 2025 (ESEF, en `notas/docs/`, no se versiona), informe del 1S26, anuncio de la compra de la Feed Enzyme Alliance (11-feb-2025), XBRL ESEF (`cuentas.mjs --esef "Novozymes"`). Bolsa: `bolsa.mjs` (NSIS-B.CO, ^OMXC25). Consenso y comparables: MarketScreener (14-oct).
- **Comprobaciones del encargo**: (1) ingresos del XBRL = cuenta publicada (4.157,6 M en 2025). (2) Deuda: «Borrowings» del XBRL suma largo 1.303,9 + corto 1.701,5 = 3.005,4 M (dic-25), con arrendamientos (189,6) y derivados (2,3) dentro; deuda financiera 2.815,8. En el puente (jun-26) van bonos, bancos, hipotecaria y derivados (2.876,4) y arrendamientos aparte (192,0). (3) BPA ajustado: el publicado «excl. PPA» (1,99 en 2025) cuadra con nuestra fórmula; el NIIF es 1,25.
- **ROIC**: el motor da 5,7 % (2025); la empresa publica 5,6 % ajustado con fondo de comercio y 10,1 % sin él. Con WACC 7,71 %: −2,0 puntos con el publicado (decide), +2,4 sin fondo de comercio. Novozymes antes de la fusión: 17-20 %. ROIC incremental 2,9 %. Calidad: «En parte».
- Decisiones: partidas especiales (sin deterioros) y ajustes de inventario PPA como no recurrentes del EBITDA; en el DCF se restan del margen (se repiten); amortización del DCF sin PPA. Sostenibilidad «Sí» (capital operativo sin fondo de comercio rinde ≈ 39 %; cuota estable en un mercado del 6,6-7,3 %). Pesos DCF 40 / comparables 20 / escenarios 40. PER de dsm-firmenich e IFF fuera de la mediana (BPA NIIF no comparable).
- Resultado: DCF 44,15 EUR; valor intrínseco 44,94 (−25,2 %); DCF inverso 11,4 % de crecimiento o 47,9 % de margen; con la prima del mercado (4,2 %) 54,57 (−9,1 %). Regla absoluta y relativa Vender; recomendación Mantener (la v3 a 12 meses manda).
- **Línea 12 m (v3)**: objetivo 64,29 EUR (480,60 DKK), ponderada 8,5 % (simulador 8,4 %), base 13,1 % (13,0 %); v2 7,9 %. **Mantener**, convicción media. Comprar < 44,94 EUR (≈ 336 DKK); vender > 72,40 EUR (≈ 541 DKK). Robustez SÓLIDA; acción robusta: no mantener en cartera (valor intrínseco −25 %).
- Word y PDF (soffice): 16 de 18 controles y 2 explicados (regresión, crecimiento del BPA base por cambio de base). Cobertura 89,5 %.
- Ficha sectorial: `sectores/ingredientes-especiales-2026-10-14.md` y `-comparables.json` (para Symrise).
- Pendiente de confirmar: votación de la remuneración en la junta de 2026, operaciones de directivos, consenso en base sin PPA (estimación propia), cuotas de mercado en enzimas sin fuente primaria. Próximos resultados: 3T26 el 5-nov-2026.

## Lecciones

- El emisor ESEF de Novonesis sigue llamándose «Novozymes A/S»: `cuentas.mjs --esef "Novozymes"` (LEI 529900T6WNZXD2R3JW38); con «Novonesis» no lo encuentra.
- El XBRL ESEF de Novozymes anterior a 2024 está en DKK: hay que pasarlo a EUR (medias implícitas y cierres del BCE) antes de juntarlo con 2024-2025.
- Si las cuentas están en una divisa y la cotización en otra, poner el precio en la divisa de las cuentas y `divisa_cotizacion` + `tipo_cambio`; con el precio en DKK tratado como EUR el DCF salía −90 %.
- En empresas con mucha amortización PPA tras una fusión, usar el BPA «ajustado sin PPA» publicado para la historia del PER y el objetivo a 12 meses, y pasar el consenso NIIF a esa base; el control de crecimiento del BPA (> 25 %) y D6 de robustez saltan por el cambio de base y hay que explicarlo.
- «Borrowings» del XBRL incluye arrendamientos y derivados: separarlos en el puente.

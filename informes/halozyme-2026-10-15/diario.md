# Diario · Halozyme (HALO) · 15-oct-2026

- Commit de partida: 70ba47e. Encargo del coordinador (megatendencia salud y biotecnología: regalías de ENHANZE). Sin subagentes, sin commits ni pull; solo se escribe en esta carpeta.
- Entorno: nube de Claude Code. Cuentas 2016-2025 del XBRL de la SEC (`cuentas.mjs --sec HALO`, CIK 1159036), comprobadas con el 10-K 2025, el 10-K 2022 y el 10-Q del 2T26; notas de prensa 4T25, 1T26, 2T26 y guía de enero; 8-K de 2026 (convertibles, cambios de directivos, junta); proxy 2026; Form 4 (`form4.mjs`). Precio y cierres con `bolsa.mjs` (SPY, IBB); `movimiento.mjs HALO`. Tasa libre FRED DGS10 5,21 % (curl).
- Corte 2026-10-15; precio = cierre del 14-oct (116,82 USD): a las 16:39 UTC la sesión del 15-oct no había cerrado (cotizaba ≈121). USD, ejercicio natural, US GAAP. Notas A-E y propio hechos por mí (`notas/construir-notas.mjs` escribe A-E; `propio.mjs` + `supuestos.mjs` + `textos.mjs`).
- Decisiones: amortización = depreciación + amortización de intangibles comprados (el XBRL las da aparte); no recurrentes 2025 = 374,2 M (I+D en curso de Surf Bio 284,9, deterioro 48,7, costes de compra 14,6, indemnizaciones 24,6, otros 1,4); coste del pleito con Merck dentro (recurrente). Caja con valores negociables. Deuda al principal; puente a 30-jun-2026 con la emisión de septiembre en otros ajustes (+468,3 M de deuda neta). Acciones 118,4 M (113,5 + 2,4 de opciones/RSU + ≈2,5 por el valor en dinero de los convertibles 2027-2028). Comparables con peso 0 (bases mezcladas, reutilizados en parte de Neurocrine al mismo corte). Pesos DCF 60 / escenarios 40. WACC 9,58 % (beta 1,0). Capex con compras de tecnología de reposición desde 2028 (3-4 % de ventas).
- DCF: crecimiento 34 % (fijo, guía) / 12 / 10 / 3 (rebaja europea de DARZALEX en mar-2029) / 4 / 3 / 2 / −3 (fin de la protección en EE. UU. hacia 2033); terminal 2 %. Sostenibilidad: el motor dice «Sí», el analista «En parte» (patentes de rHuPH20 2027-2029, MDASE anulada en EE. UU.).
- Resultado: DCF 101,88; valor intrínseco 100,36 (−14,1 %); DCF inverso 6,9 % anual (base 4,4 %); con la prima del mercado 119,22. ROIC 34,5 % − WACC 9,58 % = +24,9 puntos.
- **Línea 12 m (v3)**: objetivo 121,40 USD, ponderada +3,9 %, base +1,8 %; **Mantener**, convicción baja. Comprar < 100,36; vender > 134,88. Robustez: SÓLIDA, acción robusta «No mantener» → para quien no la tiene, **No comprar**; límite robusto 95,04 USD; con BPA −10 %: −6,5 % / −8,4 % (límite 85,54). `apuntar-12m.mjs --simular`: v3 3,9 % / 1,8 % Mantener (no escrito).
- Regla 13: veredicto global «no cambia» (subida explicada por resultados del 2T26, guía y sentencia de La Haya; convertibles ya cerrados; ventas de la CEO con plan 10b5-1). Avisos P1 y P2.
- Confianza de los datos: media-alta en cuentas; media en consenso (un proveedor) y en la duración de las regalías (la empresa no cuantifica la rebaja). Próximos resultados: ≈5-nov-2026 (estimada).
- Word y PDF (soffice): 18 de 21 controles correctos y 3 explicados. Cobertura 88,6 %. 43 páginas.
- Tiempo: ≈16:35-17:05 UTC de reloj.

## Lecciones

- En US GAAP con compras de tecnología (Halozyme), `cuentas.mjs` da `DepreciationDepletionAndAmortization` sin la amortización de intangibles (`AmortizationOfIntangibleAssets`, línea propia de la cuenta): sumarla a mano o el EBITDA sale un 15 % bajo.
- Las compras tratadas como «compra de activos» llevan la I+D en curso a gasto (Surf Bio, 284,9 M) y no aparecen en `adquisiciones` del XBRL (concepto «Acquisition of in-process research and development»): sumarla a mano a las compras del estado de flujos.
- `form4.mjs --salida` deja las operaciones con fecha: útil para agrupar ventas por mes y ver si son de un plan 10b5-1.
- `robustez.mjs --actual` no da precio en vivo si la empresa no está en `simbolos.json`/`precios.json` (aviso D3): el precio del día hay que leerlo de `movimiento.mjs`.
- Empresas de regalías con patentes que caducan: el motor da sostenibilidad «Sí» (sin capital) aunque el crecimiento dependa de patentes; el veredicto del analista debe recoger el calendario de patentes.

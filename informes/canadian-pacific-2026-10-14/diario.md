# Diario · Canadian Pacific Kansas City (CP.TO / CP) · 14-oct-2026

- Commit de partida: 596dbbb. Entorno: nube de Claude Code, red abierta (SEC EDGAR, bolsa.mjs, WebSearch/WebFetch). Sin subagentes: notas A-E con `notas/construir-notas.mjs`; `propio.mjs` + `supuestos.mjs` + `textos.mjs`.
- Fecha de corte 2026-10-14; divisa CAD (cuentas y cotización de Toronto); US GAAP; ejercicio natural; formato «naturaleza». Precio 122,70 CAD (cierre TSX 14-oct); NYSE 86,13 USD; una acción ≈ 77,08 EUR (< 7 % de 30.000 EUR).
- Cuentas: `cuentas.mjs --sec CP` (10-K 2021-2025, 10-K/A 2025, 10-Q 2T26), contrastadas con los PDF de `notas/docs/`. **Deuda**: el XBRL de 2023-2025 solo trae el papel comercial; corregida a mano con el balance (2023 22.494; 2024 22.623; 2025 23.188; jun-26 25.147, incluye corto plazo y papel comercial). La amortización de intangibles de KCS sí está en la D&A publicada. 2023 con BAI −3.053 e impuesto −6.976 por la revalorización de KCS: se deja como publicado y se explica en controles.
- Decisiones: BPA normalizado = publicado sin no recurrentes, con la amortización de la compra (serie 2018-2025: 2,90; 3,29; 3,53; 3,76; 3,60; 3,60; 3,98; 4,30). Arrendamientos operativos fuera de la deuda (US GAAP). Puente a 30-jun-26 con 360 M de recompras de julio. Pesos DCF 40 / comparables 30 / escenarios 30. Sinergias de KCS ya en márgenes (objetivo de 1.000 M USD alcanzado en gran parte); aranceles y T-MEC en el bajista y en riesgos. Comparables: UNP, CSX, CN, NSC (con la oferta de UP dentro); Aurizon como referencia; GMXT fuera (sin datos abiertos); BNSF solo en sector.
- Resultado: DCF 98,50 (WACC 8,02 %); valor intrínseco 101,19 (−17,5 %); con la prima del mercado 115,01. DCF inverso: 6,9 % de crecimiento (base 4,5 %) o margen del 61 %. ROIC 6,0 % frente a WACC 8,02 % (−2,0 puntos; 8,6 % sin fondo de comercio ni intangibles): calidad **No**. Sostenibilidad **En parte**.
- **Línea 12 m (v3, selector «sin marcas»)**: objetivo 133,17 CAD, ponderada +9,3 %, base +14,5 % (v2: 10,2 % / 10,8 %); **Mantener**, convicción media. Comprar < 101,19; vender > 149,03. `apuntar-12m.mjs --simular`: «CP: v3 ponderada 9,3 %, base 14,5 % → Mantener (v2: 10,2 % Mantener)».
- Robustez (`robustez.mjs`, sin `--escribir`): SÓLIDA; acción robusta «No mantener» (filtro de mantener hasta 119,05). Avisos: D3 (sin cierre en precios.json), V1 (VI 18 % bajo el precio), E2 (resultados el 28-oct, dentro de 14 días). BPA −10 %: −1,5 % / +3,2 %. Objeción más fuerte: el precio ya paga crecimiento de dos cifras (DCF inverso 6,9 %) con ROIC bajo el WACC.
- Word y PDF (soffice, 42 páginas): 18 de 19 controles y 1 explicado; 43 fuentes; cobertura 89,8 %. Ficha sectorial `sectores/ferrocarriles-2026-10-14.md` y comparables en JSON.
- Confianza de datos: alta (SEC). Sin confirmar: operaciones de directivos (SEDI), reparto de recomendaciones, ROIC de comparables, ratings ESG.
- Tiempo: unos 22 minutos de reloj (20:06-20:28 UTC).

## Lecciones

- `cuentas.mjs --sec` con CPKC (y posiblemente otras que presentan 10-K desde Canadá) en 2023-2025 solo recogió `CommercialPaper` como deuda: comprobar siempre la deuda total con el balance del 10-K.
- Los directivos de emisores canadienses declaran en SEDI, no con el Form 4 de la SEC: buscar ahí las operaciones de directivos.
- Stockchase: el identificador de la URL puede ser de otra empresa; comprobar el nombre antes de usar el sentimiento.
- Cuando la D&A publicada incluye mucha amortización de una compra (KCS ≈ 2,3 % de ventas), la prueba de reinversión del motor no se aplica bien: hacerla a mano con capex de mantenimiento frente a depreciación del inmovilizado.

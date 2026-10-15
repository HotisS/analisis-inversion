# Diario · SFS Group (SFSN.SW) · 15-oct-2026

- Commit de partida: 9340b9e (Seguimiento: regenerado). Encargo de la 9ª hora; sin `git pull`, commit ni push (los hace el coordinador).
- Entorno: nube de Claude Code con red abierta. Documentos de la web de SFS con `descargar.mjs` (informes anuales 2022-2025, semestrales 2025-2026, presentación del día del inversor 2026, acta de la junta 2026, consenso del 1S26 recogido por la empresa). Precio y bolsa con `bolsa.mjs` (SFSN.SW, ^SSHI, EXH4.DE). Consenso de MarketScreener, Stock Analysis y cash.ch (WebFetch). Suiza no tiene XBRL: cuentas copiadas de los PDF.
- Fecha de corte 2026-10-15; precio 140,60 CHF, cierre del 14-oct (la sesión del 15-oct no había cerrado). Divisa CHF; ejercicio natural; Swiss GAAP FER. Una acción ≈ 150,70 EUR (BCE 0,9330 CHF/EUR): 0,5 % de una cartera de 30.000 EUR.
- Notas A-E y propio hechos por mí, sin subagentes (`notas/construir-notas.mjs` escribe A-E; `propio.mjs` + `supuestos.mjs` + `textos.mjs`). Temporales en `notas/tmp/`.
- Ficha sectorial nueva: `sectores/componentes-fijaciones-2026-10-15.md` (la de distribución industrial cubre solo Hoffmann/D&L; la de instrumentos no encaja).
- **Decisiones**:
  - **Fondo de comercio repuesto en el balance** (1.022,7-1.524,1 M en 2021-2025): FER lo compensa contra el patrimonio; la propia empresa lo suma en su ROIC (9,3 % en 2025). Con él, el ROIC del motor es 8,1 % (WACC 6,70 %: +1,4 puntos, no pasa el requisito de calidad); sin él, 14,8 %. `calc.compras`: compra única grande (Hoffmann). Decide el publicado.
  - Sin arrendamientos (FER: el alquiler está en el EBITDA): comparables por EV/EBITDA no homogéneos; el valor relativo se apoya en el PER.
  - No recurrentes en el EBITDA: 46,7 M (2025, programa de red productiva), 22,9 M (2022, existencias de Hoffmann), −3,1 M (2021); LTM jun-26: 35,6 M.
  - BPA de 2025 normalizado (6,62) en la historia del PER, para que la base sea la de los casos (sin costes únicos). Cierre de 2019 fuera (BPA de 2020 de la COVID). Historia v2 al cierre en `per_historico.v2`.
  - Cíclica: bajista con perfil (2027e: −8 pp de crecimiento y −2,5 pp de margen) como 2020 y 2023-2024. BPA base de 2028 (8,08) ya es de ciclo medio-alto (margen EBIT del 12,9 %, mitad de la guía 12-15 %); no se usa un BPA de pico.
  - Sostenibilidad «En parte» (el motor dice «Sí»: no salta el control). Razón: ROIC incremental histórico del 2,4 % y ROIC con fondo de comercio de solo 1,4 puntos sobre el WACC; ninguna prueba falla, sin rebaja del base.
  - Convicción baja (la sugerida): las reglas discrepan solo por la tasa de descuento (relativa Comprar con la prima del mercado).
  - Apple: la empresa no nombra clientes; ningún cliente pasa del 10 % de las ventas; electrónica 13,8 % (móviles y discos duros nearline). No se ha encontrado una fuente primaria que cite a Apple: se dice así en el informe.
- **Resultado**: DCF 133,60 CHF (−5,0 %), valor intrínseco 141,21 (+0,4 %), WACC 6,70 %, VT 72 %. DCF inverso: 5,7 % de crecimiento 2027-2032 (base 3,3 %) o margen EBITDA del 18,1 % (base 17,5 %). Con la prima del mercado, 171,77.
- **Línea 12 m (v3, selector sin marcas)**: objetivo 144,13 CHF, ponderada +4,3 %, base +2,9 % → **Mantener**, convicción baja. v2 de control −3,3 % / −4,0 %. Comprar < 127,53 (robusto con v2: < 118,22); vender > 162,92. Filtro de mantener hasta 133,33. Detalle en revision-12m-2026-10-15.md.
- Robustez: SÓLIDA; acción robusta «No mantener» (ninguna variante llega al 15 %; la de BPA −10 % da −5,9 %). Avisos: D3 (sin cierre en `precios.json`: SFSN no está aún en `simbolos.json`, lo añade el coordinador), M4 doble castigo en el bajista (variante: 5,7 % / 2,9 %, sin cambio de acción).
- Word y PDF (soffice): 19 de 19 controles correctos, cobertura 88,7 %, 27 gráficos.
- Próximos resultados: informe anual 2026 el 26-feb-2027 (en 2026 hubo primeras cifras el 23-ene; la de 2027 no está publicada).
- Tiempo: unos 40 minutos.

## Lecciones

- Swiss GAAP FER (SFS y otras suizas medianas): el fondo de comercio se compensa contra el patrimonio; para que el ROIC del motor sea comparable con el de una empresa NIIF hay que reponerlo en `fondo_comercio`, activo, patrimonio y reservas (la cifra está en el «Information on the publication» del informe anual, cálculo del ROIC). Sin reponerlo, el motor da un ROIC «sin fondo de comercio» que pasaría la calidad por error.
- En FER no hay arrendamientos en balance: EV/EBITDA frente a comparables NIIF sale artificialmente barato; usar el PER.
- Voto de remuneración con accionista de control: el acta suiza da los votos presentes; restando los del pacto (que vota a favor) sale el voto en contra sobre el capital libre (aquí 41 % frente al 15 % publicado).

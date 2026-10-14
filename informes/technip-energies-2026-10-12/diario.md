# Diario — Technip Energies N.V. (TE), corte 2026-10-12

- Commit de partida: 4a7bd39 (Informe de ATOSS Software). Prompt y lecciones leídos enteros; no cambio de versión durante el análisis.
- Primer análisis de la empresa (no hay carpetas anteriores en `informes/`).

## Fase 1 — Identificación
- Technip Energies N.V. (sociedad neerlandesa, sede operativa en Nanterre, París). Euronext París, ticker TE, ISIN NL0014559478. Divisa de cuentas y cotización: EUR. Ejercicio a 31-dic. NIIF-UE. Publica además cifras «ajustadas» (JV proporcionales: Arctic LNG 2, Mozambique, etc.); usar las NIIF y explicar la diferencia.
- Próximos resultados: 9M 2026 el 29-oct-2026, 7:30 París (calendario publicado por la empresa; MarketScreener estima el 28).
- Fecha de corte 2026-10-12 (lunes): si la sesión de París no ha cerrado al tomar el precio, cierre del viernes 9-oct (lo resuelve `bolsa.mjs`).
- Punto clave: contratista llave en mano (GNL). Caja neta muy grande que en buena parte son anticipos de clientes (pasivos por contrato). Regla del puente: los anticipos que se compensan con entregas son circulante; decidir y dar el efecto por acción.

## Fases 2-4 bis
- Cinco subagentes A-E lanzados a la vez, en primer plano.
- A, B, C, D (≈15-19 min cada uno) y E (≈5 min) terminaron con notas completas y JSON válido. Web de inversores con 403: los PDF bajan de ten.com; participaciones y operaciones de directivos del registro AFM (emisor neerlandés: la BDIF de la AMF no las tiene).

## Integración, cálculo y decisiones
- Base NIIF en cuentas, DCF y puente (JV por puesta en equivalencia, 327,1 M en el puente); consenso ajustado con `base_ebitda: "ajustado"` y 0,8 % de ventas (D). Ingresos NIIF y ajustados casi iguales.
- Anticipos (regla del puente): pasivos por contrato que se compensan con entregas → circulante. Circulante del motor −46,6 % de ventas en 2025 (−51,8 % en 2021), −54 % en junio. DCF de −46 % (2026e) a −30 % (2032e): devuelve ~1.000 M de float. `otros_ajustes` 461 M = subida del pasivo neto por contrato en el 1S26 (caja estacional ya en el puente, lección de ATOSS): −2,65 EUR/acción. Sensibilidades: caja «asociada a proyectos» de la empresa (1.827,5 M) como deuda −10,50 EUR/acción; todo el pasivo neto por contrato −21,93 EUR.
- WACC 8,82 % (Bund 3,53 %, beta 0,90, prima 5,5 % + 1 punto). g 2,0 %. DCF 44,41; VO 39,94 (+37,1 %); rentabilidad total 40,5 %; alcista +94,0 %, bajista −27,4 %; DCF inverso −0,7 % frente al 3,9 % base. Comprar, convicción Media (la sugerida).
- Controles en «Revisar»: ninguno sin explicar (3 explicados: ROIC con capital invertido negativo, regresión, salto LTM-NTM por las provisiones del 1S26).
- Word y PDF generados (55 páginas, 28 gráficos, cobertura 92,4 %, sin avisos).

## Lecciones nuevas
- **Contratistas con capital invertido negativo** (Technip Energies): el ROIC, el ROIC incremental y la prueba de reinversión de `sostenibilidad` salen negativos o sin sentido; explicarlo en `controles_explicados` y hacer la prueba con cartera, margen y poder de precios.
- **Anticipos en el DCF**: la forma coherente fue dejar los pasivos por contrato en el circulante, proyectar que su peso baje (float que se devuelve) y llevar a `otros_ajustes` solo la subida del semestre del puente; dar aparte el efecto por acción de la «caja asociada a proyectos» que publica la empresa.
- **Emisores neerlandeses en París**: participaciones y operaciones de directivos en el registro AFM (exportación CSV), no en la BDIF de la AMF. La web de Technip Energies es ten.com.
- El circulante normalizado con `nwc_pct_ventas` y el primer año con `fraccion` (~0,22 en octubre): la caja del puente de junio no ve los flujos jul-oct; con anticipos estacionales importa.
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 26,4 EUR, rentabilidad −5,9 %, señal Mantener (`revision-12m-2026-10-13.md`).
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada -5,1 % → -5,1 %, base +4,6 %, señal Mantener (`revision-12m-2026-10-13.md`).

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 9.3x, mínimo 7.6x, media larga 9.7x; antes v2 11.8x/8.7x/13.5x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v2.json y «Technip Energies - 2026-10-12 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener -9,6 % (antes v3 Vender -14,2 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 8,7x / 11,8x / 13,5x, -5,0 % Mantener; con el tope anterior del base (×1,3, 14-oct mediodía): -14,2 % Vender. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).

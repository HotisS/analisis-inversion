# Diario · TUI AG (TUI1.DE) · 19-oct-2026

- Commit de partida: f04d576 («Análisis value de la cola de índices, pareja 2: McKesson y Elm (ninguna compra robusta)»). Checkout compartido con otros análisis en paralelo: sin `git pull`, `commit`, `push`, `checkout` ni `stash`. Solo se escribió en esta carpeta, en `verticales/empresa/simbolos.json` (entrada TUI1, inserción atómica tras releer el archivo) y en lo que escriben `precios.mjs TUI1` (`precios.json`) y `apuntar-12m.mjs tui-2026-10-19` (`objetivo12m-revisados.json`). No se tocaron `cola.md`, `MEMORIA.md`, `METODO-VIGENTE.md`, `lecciones*.md` ni `seguimiento.xlsx`; no se ejecutaron `seguimiento.mjs`, `cobertura.mjs`, `regenerar.mjs` ni nada con `--todas`.
- Inicio: 13:26 UTC (15:26 CEST; Xetra abierta). No hay informe anterior de TUI en `informes/`: primera iteración, método completo.
- Tiempos (UTC): cuentas, documentos y datos de mercado 13:26-13:42; notas A-E (`notas/construir-notas.mjs`) 13:51; parte propia y primer cálculo 13:53; controles limpios o explicados, Word y PDF 13:57; `apuntar-12m`, `precios.mjs` y `robustez --actual` 13:58.
- Sin subagentes: las fases A-E las hice yo; parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs` (patrón de Norwegian Air y CLASSYS).
- Documentos: la web de inversores de TUI carga los PDF con JavaScript (`descargar.mjs --lista` no encuentra nada). Se sacaron de la API pública del CMS de TUI (Sanity, proyecto b6xulh2p, consulta GROQ de `sanity.fileAsset` por nombre de archivo, sin autenticación); URLs en `notas/docs/_manifest.json`.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas FY2021-FY2023 | `cuentas.mjs --esef "TUI"` (LEI 529900SL2WSPV293B552) + XBRL JSON de filings.xbrl.org (resultado de participadas, EBIT, amortización) | informes anuales FY2021-FY2023 (sep-21 a sep-23) |
| Cuentas FY2024-FY2025 | Annual Report 2024 y 2025 (CMS de TUI) | 2024-12-04 y 2025-12-10 |
| Trimestres Q1 FY2025-Q3 FY2026, balance a 30-jun-2026 | Quarterly Statements y Half-Year Reports | hasta 2026-08-12 |
| Guía FY2026, reservas y coberturas | Pre-close Trading Update y presentación | 2026-09-22 (coberturas a 14-sep-2026) |
| Segmentos trimestrales | Quarterly segment data (xlsx) | 2026-08-12 |
| Gobierno, remuneración y votos | Remuneration Report y Corporate Governance Statement FY2025; resultados de la junta | 2025-12-10 y 2026-02-10 |
| Operaciones de directivos | Hargreaves Lansdown / EQS (director deals) | 2026-02-11 a 2026-09-22 |
| Precio, beta, rentabilidades, cierres de ejercicio | `bolsa.mjs --accion TUI1.DE --indice EXS3.DE --sector EXV9.DE --corte 2026-10-19 --cierre-mes 9` | cierre 16-oct-2026 (6,75) |
| Precio común | `precios.mjs TUI1` | cierre 16-oct-2026 (6,754); sesión en curso 19-oct 6,656 |
| Movimiento (regla 13) | `movimiento.mjs TUI1.DE` y serie diaria de Yahoo (meses y ventanas de 21 sesiones) | 19-oct-2026 |
| Consenso y objetivos | Yahoo earningsTrend (12-13 analistas) y finanzen.net (6 bancos) | 2026-09-22 a 2026-10-19 |
| Comparables | Yahoo quoteSummary (`notas/comps.mjs`, 10 fichas) | 2026-10-19 |
| Tipos de cambio | BCE | 2026-10-16 (USD 1,1253; GBP 0,84385) |
| Bund a 10 años | Bundesbank (BBSIS, Svensson) | 2026-10-16 (3,48 %); 2026-10-19 (3,49 %) |
| Prima de mercado | Damodaran ERPbymonth | octubre de 2026 (4,20 %) |
| Queroseno | IATA Jet Fuel Price Monitor | octubre de 2026 (192,44 USD/barril) |
| Tamaño del mercado | UN Tourism / Amadeus (Europa 2025) y UN Tourism 1T 2026 | 2026-05 |
| Sentimiento | Stocktwits $TUIFF, Börse Express, finanztrends (foros alemanes y Seeking Alpha sin acceso) | hasta 2026-10 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 19-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, LibreOffice (perfil `/tmp/lo-tui`) | 19-oct-2026 |
| Objetivo a 12 m | `apuntar-12m.mjs tui-2026-10-19` | 19-oct-2026 |
| Robustez | `robustez.mjs informes/tui-2026-10-19 --actual` | 19-oct-2026 (6,66 a las 15:57 CEST) |

## Decisiones

- **Precio**: el informe usa el cierre del 16-oct (6,75 €), última sesión cerrada al empezar (Xetra abierta). La decisión se toma con `robustez --actual` al precio de hoy: 6,656 € (Yahoo, 15:57 CEST del 19-oct).
- **Participadas fuera del EBIT**: TUI mete en el EBIT el resultado de TUI Cruises, los hoteles con Riu y Royalton (463,9 M en FY2025, 34 % del EBIT). Van en `participadas_en_ebitda` y se valoran en el puente: TUI Cruises a 9 veces su resultado para TUI (314 M) y el resto (≈ 150 M) a 6 veces: 3.730 M (en libros 1.987,7 M). En el BPA a 12 meses sí cuentan (475 / 535 / 580 M en FY2028e).
- **Minoritarios a mercado**: la familia Riu se lleva ≈ 200 M al año; se restan 1.650 M (8 veces) en vez de los 1.024,8 M contables.
- **Circulante muy negativo**: `activos_contrato` = pagos anticipados a hoteles; `pasivos_contrato` = cobros anticipados de clientes. NWC del DCF −20,5 % de las ventas (−21,6 % a sep-25).
- **Capex con derechos de uso** (NIIF 16): 4,9 % de las ventas en FY2026e bajando al 4,3 % (FY2025: 906 M de inmovilizado e intangibles + 150 M de derechos de uso = 4,4 %); arrendamientos como deuda en el puente.
- **Puente a 30-jun-2026 sin ajuste estacional**: la deuda neta de junio (2.348 M) es mayor que la de septiembre (1.305 M a sep-25); prudente.
- **Convertible de 2031** (487 M) fuera de dinero: 507,4 M de acciones básicas y el convertible como deuda.
- **Cíclica, sin BPA de pico**: FY2026e fijo con la guía de 1.200-1.300 M; FY2027e con margen EBITDA sin participadas del 7,0 % (queroseno sin cubrir: 63 % del invierno y 39 % del verano 2027); FY2028e del 7,4 % y 7,5 % después (media de FY2023-FY2025). BPA base de FY2028e 1,28 € frente a 1,25 € en FY2025: EBIT subyacente igual al de FY2025, sin los 250 M de ahorros prometidos. Nuestro FY2027e (0,97 €) va un 27 % por debajo del consenso (1,33 €).
- **BPA publicado, no subyacente**, en la historia y en la previsión, para que case el PER.
- **WACC 8,83 %**: Bund 3,48 %, beta 1,30 (ajustada mensual a 5 años frente al MDAX), prima 5,5 % y prima adicional de 1,5 puntos (rescate de 2020, cobros anticipados devolvibles, geopolítica), deuda al 6 % y 45 % de peso.
- **Historia del PER**: v3 adelantada FY2022-FY2025 (FY2021 excluido por pérdidas en FY2022; FY2025 sobre nuestro FY2026e porque el ejercicio está cerrado sin publicar). Mediana 6,75x. Decide la v3 (4 años; sin marca de desrateo). v2 de control: 32,6 % → Comprar.
- **Sostenibilidad «Sí»** (el motor también dice «Sí»): crecimiento proyectado del 2,4 % anual, menor que el del mercado, casi sin capital nuevo y con poder de precios en hoteles y cruceros. ROIC sin participadas 20,2 % frente a WACC 8,83 %.
- **Escisión de cruceros u hoteles**: no hay nada anunciado ni en los documentos de la empresa ni en la prensa revisada; se deja como no-hecho en la sección 16 y como disparador para rehacer la suma de partes.
- **Regla 13**: veredicto «no cambia». Movimientos de más de un 10 % en un mes: nov-dic-2025 +25,6 % (resultados de FY2025), feb-mar-2026 −26 % (1T, junta y guerra de Irán), may-2026 −15,7 % (rebaja de guía y 1S) con rebote del +14,7 %. Sin avisos P1-P5, sin ventas de directivos (solo compras), sin ampliaciones ni colocaciones pendientes. Los resultados del 9-dic no aplazan.
- **Controles**: 20 de 22 correctos y 2 explicados (ventas de segmentos de FY2024 no publicadas; rentabilidad implícita del DCF inverso fuera de rango porque el precio es un tercio del DCF).
- **Resultado**: regla Comprar (v3 36,7 % / base 30,4 %; con el precio de hoy 38,7 % / 32,2 %). Robustez SÓLIDA, acción robusta **Comprar**; límite robusto común 7,08 €; BPA −10 % → 25,0 % / 19,2 %. El DCF (20,18 €) y el valor intrínseco (19,26 €) quedan muy por encima del objetivo a 12 meses (aviso V2): la señal la da el objetivo.
- Huecos: porcentajes exactos de los mayores accionistas, consenso de EBITDA y de FY2028, transacciones comparables, calificaciones ESG y foros alemanes.

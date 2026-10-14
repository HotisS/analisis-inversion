# Genera las notas A-E de Shimano (corte 2026-10-14). Todas las cifras salen de extractos de búsqueda (WebSearch), con la URL.
import json, sys, os
D = sys.argv[1]
EXT = 'Extracto de búsqueda; la página no se pudo abrir (solo WebSearch en este entorno)'

def F(i, titulo, editor, tipo, fecha, url):
    return {"id": i, "titulo": titulo, "editor": editor, "tipo": tipo, "fecha": fecha, "url": url}

def H(seccion, campo, tipo, intentos, decision="Omitido"):
    return {"seccion": seccion, "campo": campo, "tipo": tipo, "intentos": intentos, "decision": decision}

NOTAS = {}
def save(letra, obj):
    NOTAS[letra] = obj

# ---------------- A. Cuentas ----------------
fa = [
 F(1, 'Consolidated Financial Results for FY2025 (JGAAP), Kessan Tanshin. ' + EXT, 'Shimano Inc.', 'Primaria', '2026-02-10', 'https://finance-frontend-pc-dist.west.edge.storage-yahoo.jp/disclosure/20260210/20260209552874.pdf'),
 F(2, 'Shimano: Consolidated Financial Results for FY2025 (JGAAP). ' + EXT, 'MarketScreener (copia del comunicado)', 'Primaria', '2026-02-10', 'https://www.marketscreener.com/news/shimano-consolidated-financial-results-for-fy2025-jgaap-ce7e5adfdd8ef724'),
 F(3, 'Shimano (TYO:7309) Financials - Income Statement (2021-2025 y LTM jun-26). ' + EXT, 'Stock Analysis', 'Datos de mercado', '2026-10', 'https://stockanalysis.com/quote/tyo/7309/financials/'),
 F(4, 'Shimano (TYO:7309) Cash Flow Statement. ' + EXT, 'Stock Analysis', 'Datos de mercado', '2026-10', 'https://stockanalysis.com/quote/tyo/7309/financials/cash-flow-statement/'),
 F(5, 'Shimano Inc, 7309:TYO financials (amortización 2023-2025). ' + EXT, 'FT Markets', 'Datos de mercado', '2026-10', 'https://markets.ft.markitdigital.com/data/equities/tearsheet/financials?s=7309%3ATYO&subView=IncomeStatement'),
 F(6, 'Shimano Inc (7309) Balance Sheet / Financial summary (activo, patrimonio, caja y pasivo corriente 2021-2025). ' + EXT, 'Investing.com', 'Datos de mercado', '2026-10', 'https://www.investing.com/equities/shimano-inc-financial-summary'),
 F(7, 'Shimano Inc. 10-Year Income Statement (impuesto sobre beneficios). ' + EXT, 'MarketScreener', 'Datos de mercado', '2026-10', 'https://uk.marketscreener.com/quote/stock/SHIMANO-INC-438398/finances-income-statement/'),
 F(8, 'Shimano (7309) Q2 2026 report: ventas y beneficio del 1S26. ' + EXT, 'Gyokai Digest', 'Prensa', '2026-07-28', 'https://www.gyokaidigest.com/en/companies/shimano/report/2026-Q2'),
 F(9, 'Shimano raises guidance after strong Q2. ' + EXT, 'SGI News', 'Prensa', '2026-07-29', 'https://sginews.com/Content/shimano-raises-guidance-after-strong-q2.aspx'),
 F(10, 'Shimano (7309) Q2 2026 earnings summary (guía revisada, dividendo 363 JPY). ' + EXT, 'Quartr', 'Datos de mercado', '2026-07-28', 'https://quartr.com/events/shimano-inc-7309-q2-2026_F9ZM0gSU'),
 F(11, 'Shimano reports first-half profit surge and raises forecast. ' + EXT, 'FilingReader', 'Prensa', '2026-07-28', 'https://filingreader.com/news-wire/tokyo/2026-07-28/shimano-reports-first-half-profit-surge-and-raises-forecast'),
 F(12, 'EXEC: Shimano Sees Robust H1 Fishing Tackle Sales; Bike Business Remains Weak (balance y caja a 30-jun-26). ' + EXT, 'SGB Executive', 'Prensa', '2026-07-29', 'https://sgbonline.com/exec-shimano-sees-robust-h1-fishing-tackle-sales-bike-business-remains-weak/'),
 F(13, 'Shimano Q1 sales flat but operating income down sharply in its bike division. ' + EXT, 'Bicycle Retailer', 'Prensa', '2026-04-23', 'https://www.bicycleretailer.com/industry-news/2026/04/23/shimano-q1-sales-flat-operating-income-down-sharply-its-bike-division'),
 F(14, 'Bleak start to 2026 for Shimano as sales drop and operating income slashed by half. ' + EXT, 'road.cc', 'Prensa', '2026-04-24', 'https://road.cc/news/bleak-start-to-2026-for-shimano-as-sales-drop-and-operating-income-slashed-by-half'),
 F(15, 'Shimano’s uneven recovery: currency losses wipe out 3% sales growth in 2025. ' + EXT, 'Velora Cycling', 'Prensa', '2026-02-11', 'https://veloracycling.com/news/shimano-bicycle-sales-increase-net-income-falls-2025'),
 F(16, 'EXEC: Shimano Gets Nice Europe Lift in Bicycle Components in 2025 to Offset Sharp China Decline (segmentos 2025). ' + EXT, 'SGB Executive', 'Prensa', '2026-02-11', 'https://sgbonline.com/exec-shimano-gets-nice-europe-lift-in-bicycle-components-in-2025-to-offset-sharp-china-decline/'),
 F(17, 'Shimano: Supplemental Information FY2025-Q2 (segmentos 2024). ' + EXT, 'Shimano Inc. (vía MarketScreener)', 'Primaria', '2025-07-29', 'https://www.marketscreener.com/news/shimano-supplemental-information-fy2025-q2-ce7c5fd9da8eff26'),
 F(18, 'シマノ【7309】業績推移・財務諸表 (BPA 2018-2025). ' + EXT, 'Strainer', 'Datos de mercado', '2026-10', 'https://strainer.jp/companies/2412/performance'),
 F(19, 'シマノの業績・財務 (acciones emitidas a fin de 2024 y 2025). ' + EXT, 'Buffett Code', 'Datos de mercado', '2026-10', 'https://www.buffett-code.com/company/7309/financial'),
 F(20, '株式状況 (acciones emitidas y autocartera a 30-jun-2026). ' + EXT, 'Shimano Inc.', 'Primaria', '2026-06-30', 'https://www.shimano.com/jp/ir/stockinformation.html'),
 F(21, 'Shimano (TSE:7309) Valuation in Focus After Buyback Completion (2.603.300 acciones por 49.990 M JPY). ' + EXT, 'Simply Wall St', 'Analistas', '2026-02', 'https://simplywall.st/stocks/jp/consumer-durables/tse-7309/shimano-shares/news/shimano-tse7309-valuation-in-focus-after-buyback-completion'),
 F(22, 'Consolidated Financial Results for the First Half of FY2025 (JGAAP): compra de autocartera 30.019 M y dividendos 13.756 M en el 1S25. ' + EXT, 'Shimano Inc.', 'Primaria', '2025-07-29', 'https://finance-frontend-pc-dist.west.edge.storage-yahoo.jp/disclosure/20250729/20250729522091.pdf'),
 F(23, 'Shimano announces bike sales +3% in 2020 (ventas 378.040 M, beneficio neto 63.472 M). ' + EXT, 'Bicycle Retailer', 'Prensa', '2021-02-09', 'https://bicycleretailer.com/international/2021/02/09/shimano-announces-bike-sales-3-2020-makes-no-mention-supply-chain'),
 F(24, 'Bicycle parts maker Shimano invests $179 million to build Singapore plant. ' + EXT, 'Caixin (Nikkei)', 'Prensa', '2021-07-12', 'https://www.caixinglobal.com/2021-07-12/bicycle-parts-maker-shimano-invests-179-million-to-build-singapore-plant-101739154.html'),
 F(25, 'Tackle giant reports double-digit sales increase for first half of year. ' + EXT, 'Angling International', 'Prensa', '2026-07-29', 'https://angling-international.com/2026/07/29/tackle-giant-reports-double-digit-sales-increase-for-first-half-of-year/'),
 F(26, 'Consolidated Financial Results for the First Quarter of FY2026 (JGAAP). ' + EXT, 'Shimano Inc.', 'Primaria', '2026-04-23', 'https://finance-frontend-pc-dist.west.edge.storage-yahoo.jp/disclosure/20260423/20260423508691.pdf'),
 F(27, 'Yahoo Finance: Shimano Inc. (7309.T) Income Statement (gastos de explotación). ' + EXT, 'Yahoo Finance', 'Datos de mercado', '2026-10', 'https://finance.yahoo.com/quote/7309.T/financials/'),
 F(28, 'Shimano Q1 2026 results: five takeaways (inventario en Europa, precios de las bicicletas). ' + EXT, 'SGI Europe', 'Prensa', '2026-04-24', 'https://www.sgieurope.com/financial-results/shimano-q1-five-takeaways/120743.article'),
]

def cta(p, ing, bruto, ebit, amort, imp, bn, bpa, dpa):
    bai = bn + imp
    return {"periodo": p, "ingresos": ing, "coste_ventas": ing - bruto, "gastos_generales": bruto - ebit, "ebitda": ebit + amort,
            "amortizaciones": amort, "ebit": ebit, "resultado_financiero": bai - ebit, "bai": bai, "impuestos": imp, "minoritarios": 0,
            "beneficio_neto": bn, "gastos_financieros": None, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None,
            "bpa": bpa, "dpa": dpa, "dpa_extraordinario": 0, "acciones_diluidas": round(bn / bpa, 2)}

cuenta = [
 cta('2021', 546515, 231418, 148289, 18749, 37600, 115937, 1252.62, None),
 cta('2022', 628909, 265645, 169159, 20992, 45700, 128178, 1408.22, None),
 cta('2023', 474362, 182515, 83654, 23937, 22100, 61142, 676.77, None),
 cta('2024', 450993, 172303, 65086, 25037, 22000, 76329, 853.36, 309.0),
 cta('2025', 466243, 166616, 51678, 27208, 22200, 33991, 388.17, 339.0),
]

A = {
 "_estado": "Hecho por el analista principal con 22 búsquedas web (sin WebFetch ni descargas). Faltan circulante (existencias, clientes, proveedores), patrimonio y caja de 2021-2022, dividendos de 2021-2023 y calendario de recompras por año: ver huecos.",
 "negocio": {
  "descripcion": "Shimano es el mayor fabricante mundial de componentes de bicicleta (cambios, frenos, bielas, bujes, motores de bicicleta eléctrica EP) y uno de los grandes de material de pesca (carretes, cañas). Vende sobre todo a fabricantes de bicicletas (equipo de origen) y, en menor medida, al mercado de recambio a través de distribuidores; en pesca vende a tiendas especializadas. Fabrica en Japón (Sakai, Shimonoseki), Singapur, Malasia, China y otros países de Asia; la nueva planta de Singapur (≈20.000 M JPY) amplió capacidad tras la pandemia [24]. Dos segmentos: componentes de bicicleta (76 % de las ventas de 2025) y pesca (24 %) [16].",
  "como_gana_dinero": None,
  "segmentos": [
   {"nombre": "Componentes de bicicleta", "descripcion": "Grupos de cambio y frenos de carretera, montaña y ciudad, bicicleta eléctrica (EP) y recambio.", "tipo_resultado": "EBIT",
    "historico": [{"periodo": "2024", "ingresos": 345640, "resultado": 54160}, {"periodo": "2025", "ingresos": 354972, "resultado": 42841}]},
   {"nombre": "Pesca", "descripcion": "Carretes, cañas y accesorios de pesca.", "tipo_resultado": "EBIT",
    "historico": [{"periodo": "2024", "ingresos": 104990, "resultado": 10929}, {"periodo": "2025", "ingresos": 110832, "resultado": 8865}]},
   {"nombre": "Otros", "descripcion": "Resto de actividades.", "tipo_resultado": None,
    "historico": [{"periodo": "2024", "ingresos": 363, "resultado": None}, {"periodo": "2025", "ingresos": 439, "resultado": None}]},
  ],
  "segmentos_nota": "2025 de la prensa sectorial que reproduce el comunicado (bicicleta 354.972 M, +2,7 %, resultado 42.841 M, −20,9 %; pesca 110.832 M, +5,6 %, resultado 8.865 M, −18,9 %) [16]; pesca 2024 de la información suplementaria (104.990 y 10.929 M) [17]; bicicleta 2024 deducida de las variaciones de 2025 (estimación propia: 354.972/1,027 y 42.841/0,791). «Otros» por diferencia con el total. 1S26: bicicleta 181.379 M (≈0 %) y resultado 20.064 M (−15,1 %); pesca 65.466 M (+17,4 %) y 7.179 M (+59,8 %) [12, 25].",
  "geografias": [],
  "clientes": None,
  "kpis": [
   {"kpi": "Ventas de componentes de bicicleta (1S)", "valor_anterior": "≈181.000 M JPY (1S25)", "valor_actual": "181.379 M JPY (1S26)", "variacion": "≈0 %", "comentario": "Volumen plano; Europa mejor, Norteamérica, China y Asia débiles por inventarios y aranceles [12, 13]."},
   {"kpi": "Resultado de explotación de bicicleta (1S)", "valor_anterior": "≈23.600 M JPY (1S25)", "valor_actual": "20.064 M JPY (1S26)", "variacion": "−15,1 %", "comentario": "Divisa, gastos generales y presión de costes de materias primas [12, 13]."},
   {"kpi": "Ventas de pesca (1S)", "valor_anterior": "≈55.800 M JPY (1S25)", "valor_actual": "65.466 M JPY (1S26)", "variacion": "+17,4 %", "comentario": "Fuerte demanda fuera de Japón [25]."},
   {"kpi": "Resultado de explotación de pesca (1S)", "valor_anterior": "≈4.490 M JPY (1S25)", "valor_actual": "7.179 M JPY (1S26)", "variacion": "+59,8 %", "comentario": "Apalancamiento operativo [12]."},
  ],
  "confianza": "Media",
 },
 "financieros": {
  "cuenta": cuenta,
  "ltm": {"periodo": "LTM jun-26", "fecha_fin": "2026-06-30", "ingresos": 475893, "ebitda": 78605, "ebit": 50805, "beneficio_neto": 57980, "bpa": 671.5, "dpa": 351.0, "dpa_extraordinario": 0, "fcf": None, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None},
  "cambios_perimetro": [],
  "comentario": None, "ajustes": None,
  "confianza": "Media",
 },
 "trimestres": {
  "items": [
   {"periodo": "1T25", "ingresos": 113556, "crecimiento_pct": None, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": None},
   {"periodo": "2T25", "ingresos": 123773, "crecimiento_pct": None, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": None},
   {"periodo": "2S25", "ingresos": 228914, "crecimiento_pct": None, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": None},
   {"periodo": "1T26", "ingresos": 117644, "crecimiento_pct": 3.6, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": None},
   {"periodo": "2T26", "ingresos": 129415, "crecimiento_pct": 4.6, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": "Superior"},
  ],
  "nota": "1T26 (117.644 M, +3,6 %; resultado de explotación 10.400 M, −35,6 %) [13, 26]; 1S26 247.059 M (+4,1 %) y resultado de explotación 27.249 M (−3,1 %) [8, 11]; 2T26 = 129.415 M [9]; resultado de explotación del 2T26 por diferencia, 16.849 M. 1T25, 2T25 y 2S25 deducidos de las variaciones publicadas (estimación propia). Beneficio neto del 2T26: 15.136 M frente a una pérdida de 5.825 M en el 2T25 (diferencias de cambio) [9]. Simply Wall St indica que el 2T26 batió en BPA y ventas al consenso [D6].",
  "ultima_presentacion": None,
  "confianza": "Media",
 },
 "balance": {
  "historico": [
   {"periodo": "2021", "activo_total": 705400, "activo_corriente": None, "pasivo_corriente": 81500, "pasivo_total": None, "fondo_comercio": None, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": None, "deuda_financiera": 0, "arrendamientos": 0, "patrimonio_neto": None, "minoritarios": None, "reservas": None},
   {"periodo": "2022", "activo_total": 826400, "activo_corriente": None, "pasivo_corriente": 78600, "pasivo_total": None, "fondo_comercio": None, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": None, "deuda_financiera": 0, "arrendamientos": 0, "patrimonio_neto": None, "minoritarios": None, "reservas": None},
   {"periodo": "2023", "activo_total": 871731, "activo_corriente": None, "pasivo_corriente": 61800, "pasivo_total": 69336, "fondo_comercio": None, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 493933, "deuda_financiera": 0, "arrendamientos": 0, "patrimonio_neto": 800800, "minoritarios": 1595, "reservas": None},
   {"periodo": "2024", "activo_total": 958953, "activo_corriente": None, "pasivo_corriente": 55800, "pasivo_total": 75342, "fondo_comercio": None, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 534045, "deuda_financiera": 0, "arrendamientos": 0, "patrimonio_neto": 882000, "minoritarios": 1611, "reservas": None},
   {"periodo": "2025", "activo_total": 938250, "activo_corriente": None, "pasivo_corriente": 58900, "pasivo_total": 68749, "fondo_comercio": None, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 472800, "deuda_financiera": 0, "arrendamientos": 0, "patrimonio_neto": 867881, "minoritarios": 1620, "reservas": None},
  ],
  "balance_nota": "Activo total, pasivo corriente y patrimonio total (con minoritarios) de Investing.com [6]; 2025 del comunicado: activo 938.250 M, patrimonio neto 869.501 M y ratio de fondos propios del 92,5 % (dominante ≈ 867.881 M; minoritarios ≈ 1.620 M por diferencia) [1, 2]. Minoritarios de 2023-2024 supuestos iguales a los de 2025 (estimación propia). Caja: 2025 = efectivo y equivalentes del estado de flujos (472.800 M) [2]; 2023-2024 de Investing [6]. Sin deuda financiera: Stock Analysis da «no debt» y caja neta de 463.720 M [D7]. NIIF 16 no aplica (normas japonesas). A 30-jun-26: activo 949.242 M y efectivo 459.116 M [12].",
  "vencimientos": [],
  "liquidez": "Efectivo y equivalentes de 459.116 M JPY a 30-jun-2026, sin deuda financiera [12, D7].",
  "rating": "Sin rating (no emite deuda)",
  "coste_deuda_pct": None, "vida_media_anios": None,
  "otros_pasivos": None, "comentario": None,
  "confianza": "Baja",
 },
 "flujos": {
  "historico": [
   {"periodo": "2021", "flujo_operativo": 112439, "capex": 16156, "pagos_arrendamientos": 0, "adquisiciones": 0, "desinversiones": 0, "dividendos": None, "recompras": None, "emision_acciones": 0, "intereses_en_financiacion": 0},
   {"periodo": "2022", "flujo_operativo": 110684, "capex": 20247, "pagos_arrendamientos": 0, "adquisiciones": 0, "desinversiones": 0, "dividendos": None, "recompras": None, "emision_acciones": 0, "intereses_en_financiacion": 0},
   {"periodo": "2023", "flujo_operativo": 114567, "capex": 24783, "pagos_arrendamientos": 0, "adquisiciones": 0, "desinversiones": 0, "dividendos": None, "recompras": None, "emision_acciones": 0, "intereses_en_financiacion": 0},
   {"periodo": "2024", "flujo_operativo": 87032, "capex": 36824, "pagos_arrendamientos": 0, "adquisiciones": 0, "desinversiones": 0, "dividendos": None, "recompras": None, "emision_acciones": 0, "intereses_en_financiacion": 0},
   {"periodo": "2025", "flujo_operativo": 63780, "capex": 35519, "pagos_arrendamientos": 0, "adquisiciones": 0, "desinversiones": 0, "dividendos": 29700, "recompras": 49990, "emision_acciones": 0, "intereses_en_financiacion": 0},
  ],
  "flujos_nota": "Flujo operativo y capex de Stock Analysis; 2024-2025 coinciden con el estado de flujos del comunicado (capex 36.824 y 35.519 M) [4, 1]. 2025: financiación −80.319 M [2]; recompra de 2.603.300 acciones por 49.990 M [21]; dividendos ≈ 29.700 M por diferencia (estimación propia; 1S25: 13.756 M [22]).",
  "comentario": None,
  "confianza": "Media",
 },
 "calidad": None,
 "capital": {
  "politica": None,
  "adquisiciones": [],
  "comentario": None,
  "confianza": "Media",
 },
 "fuentes": fa,
 "huecos": [
  H("balance", "Existencias, clientes, proveedores y activo corriente 2021-2025", "Núcleo", "1) Kessan Tanshin FY2025 en PDF (no se puede abrir: solo WebSearch); 2) búsqueda en Stock Analysis, Investing y Stockopedia (extractos sin años); 3) búsqueda en japonés (棚卸資産) en IR BANK, Strainer y the-shashi sin cifras"),
  H("balance", "Patrimonio y caja de 2021-2022", "Complemento", "1) informe anual; 2) Investing (solo activo y pasivo corriente); 3) Stock Analysis (sin extracto)"),
  H("flujos", "Dividendos y recompras de 2021-2024", "Complemento", "1) estados de flujos (PDF no accesibles); 2) Stock Analysis y Yahoo (columnas sin año); 3) prensa sobre recompras"),
  H("calidad", "Auditor, opinión y señales contables", "Complemento", "1) Securities Report (PDF no accesible); 2) búsqueda del auditor en prensa; 3) Simply Wall St y TipRanks sin dato"),
  H("negocio", "Ventas por geografía", "Complemento", "1) nota de segmentos geográficos del Tanshin (PDF no accesible); 2) prensa sectorial (solo tendencias por región); 3) Statista (de pago)"),
 ],
}
save('A', A)

# ---------------- B. Sector y competencia ----------------
fb = [
 F(1, 'Shimano sets the bar for industry stabilisation. ' + EXT, 'Bike Europe', 'Sectorial', '2026-03', 'https://onlinemagazine.bike-eu.com/en/edition-march-2026/shimano-sets-the-bar-for-industry-stabilisation'),
 F(2, 'Shimano’s inventory crisis. ' + EXT, 'SGI Europe', 'Sectorial', '2026', 'https://www.sgieurope.com/financial-results/shimanos-inventory-crisis/119829.article'),
 F(3, 'Shimano’s 2026 crisis deepens: operating income halved as tariffs bite. ' + EXT, 'BikeTips', 'Prensa', '2026-04', 'https://biketips.com/shimano-2026-sales-drop-operating-income-tariffs/'),
 F(4, 'Shimano reports 16% growth in bicycle component sales and signals «signs of recovery» in European market. ' + EXT, 'BikeRadar', 'Prensa', '2026', 'https://www.bikeradar.com/news/shimano-reports-growth-in-bicycle-component-sales'),
 F(5, 'Fox Factory Hldg Reports Q2 2026 Results: Full Earnings Call Transcript. ' + EXT, 'Benzinga', 'Prensa', '2026-09', 'https://www.benzinga.com/news/26/09/61862484/fox-factory-hldg-reports-q2-2026-results-full-earnings-call-transcript'),
 F(6, 'Shimano (historia de la empresa). ' + EXT, 'Wikipedia', 'Prensa', '2026', 'https://en.wikipedia.org/wiki/Shimano'),
 F(7, 'Global performances mixed in 2025 as Shimano reports 3% growth in bike division. ' + EXT, 'Bicycle Retailer', 'Prensa', '2026-02-10', 'https://bicycleretailer.com/industry-news/2026/02/10/global-performances-mixed-2025-shimano-reports-3-growth-bike-division'),
 F(8, 'Shimano raises component prices: what it means for Shimano stock. ' + EXT, 'ad-hoc-news', 'Prensa', '2026', 'https://www.ad-hoc-news.de/boerse/news/nebenwerte/shimano-raises-component-prices-what-it-means-for-shimano-stock/70228925'),
 F(9, 'Weak home sales buck strong fishing trend at Shimano. ' + EXT, 'Angling International', 'Sectorial', '2026-02-16', 'https://angling-international.com/2026/02/16/weak-home-sales-buck-strong-fishing-trend-at-shimano/'),
]
B = {
 "historia": {
  "resumen": "Shimano nació en 1921 en Sakai (Osaka) como taller de piñones libres de Shozaburo Shimano. Tras la guerra se hizo proveedor de componentes para los fabricantes de bicicletas japoneses y, desde los años setenta, de los grandes del mundo con los grupos Dura-Ace (1973) y Deore XT. En los ochenta convirtió el cambio indexado y los grupos integrados en estándar del sector, y desde 1970 vende material de pesca. Es una empresa familiar: la familia Shimano sigue en la presidencia. La pandemia disparó la demanda en 2020-2022 (ventas récord de 628.909 M JPY en 2022) y después llegó el exceso de inventario en toda la cadena, del que aún sale [6, A3].",
  "hitos": [
   {"anio": "1921", "hito": "Fundación en Sakai (Osaka) por Shozaburo Shimano [6]."},
   {"anio": "1973", "hito": "Lanzamiento de Dura-Ace, su gama alta de carretera [6]."},
   {"anio": "1990", "hito": "Cambios integrados en la maneta de freno (STI), estándar del sector desde entonces [6]."},
   {"anio": "2021", "hito": "Inversión de ≈20.000 M JPY en una planta nueva en Singapur y ≈13.000 M en Japón para atender el pico de demanda [A24]."},
   {"anio": "2022", "hito": "Ventas récord de 628.909 M JPY y resultado de explotación de 169.159 M (margen del 26,9 %) [A3]."},
   {"anio": "2023", "hito": "El exceso de inventario de los fabricantes hunde las ventas un 25 % [A3, 2]."},
   {"anio": "2025", "hito": "Recompra de 2,6 M de acciones por ≈50.000 M JPY y pérdida de cambio de 19.600 M [A21, A15]."},
   {"anio": "2026", "hito": "1S26: pesca +17 % y bicicleta plana; guía de ventas elevada a 491.000 M JPY [A12, A10]."},
  ],
  "confianza": "Media",
 },
 "negocio": {
  "como_gana_dinero": "Shimano vende componentes a los fabricantes de bicicletas (equipo de origen), que los montan en bicicletas nuevas, y recambios a distribuidores; su margen depende del volumen de bicicletas nuevas, de la mezcla (gama alta de carretera y bicicleta eléctrica frente a ciudad) y del yen, porque fabrica sobre todo en Japón y Asia y vende en dólares y euros. Con costes fijos elevados, el apalancamiento operativo es alto: el margen de explotación pasó del 26,9 % en 2022 al 11,1 % en 2025 con unas ventas un 26 % menores [A3]. La pesca (24 % de las ventas) tiene márgenes menores (8 % en 2025) pero es menos cíclica [A16]. La caja (≈459.000 M JPY) rinde intereses y genera diferencias de cambio que mueven mucho el beneficio neto (pérdida de 19.600 M en 2025, ganancia en 2026) [A15, A8].",
 },
 "sector": {
  "definicion": "Mercado mundial de componentes de bicicleta (transmisiones, frenos, bujes, motores de bicicleta eléctrica) vendidos a fabricantes y en recambio, y, en segundo plano, material de pesca. Shimano compite sobre todo con SRAM (privada) y, en suspensiones, con Fox Factory. No hemos podido leer un estudio de tamaño de mercado con dos fuentes; la sección se apoya en la evolución de las ventas de los participantes [A3, 5].",
  "tamano": None, "unidad_serie": None, "serie": [],
  "tcac_historico_pct": None, "tcac_previsto_pct": None, "cr5_pct": None, "estructura": "Concentrada",
  "drivers": [
   {"driver": "Ciclo de inventario de fabricantes y tiendas", "efecto": "+/−", "horizonte": "Cíclico", "evidencia": "Ventas de Shimano: 628.909 M JPY en 2022, 450.993 M en 2024; en 2026 aún hay inventario algo alto en Europa, Asia, Latinoamérica y China [A3, 2, A13]."},
   {"driver": "Bicicleta eléctrica y gama alta", "efecto": "+", "horizonte": "Estructural", "evidencia": "Más contenido por bicicleta; los nuevos grupos de gama alta previstos para 2027 deberían liberar compras aplazadas, según el análisis de Traders Web [D17]."},
   {"driver": "Aranceles de EE. UU. y precios de las bicicletas", "efecto": "−", "horizonte": "Cíclico", "evidencia": "La dirección culpa a los aranceles del «estancamiento» en EE. UU.; los precios de venta al público bajan y dificultan trasladar costes [3, A28]."},
   {"driver": "Tipo de cambio del yen", "efecto": "+/−", "horizonte": "Cíclico", "evidencia": "La divisa restó 19.600 M JPY en 2025 y ayudó en 2026 [A15, A11]."},
   {"driver": "Pesca recreativa fuera de Japón", "efecto": "+", "horizonte": "Estructural", "evidencia": "Pesca +17,4 % en el 1S26 y +5,6 % en 2025 [A12, A16]; Japón, débil [9]."},
  ],
  "porter": [
   {"fuerza": "Rivalidad", "intensidad": 3, "justificacion": "Duopolio de hecho con SRAM en transmisiones de gama media y alta; competencia de fabricantes chinos en gama baja [1, 3]."},
   {"fuerza": "Poder de los clientes", "intensidad": 3, "justificacion": "Fabricantes grandes (Giant, Trek, Specialized) con inventarios altos negocian volúmenes, pero dependen del estándar Shimano [2]."},
   {"fuerza": "Poder de los proveedores", "intensidad": 2, "justificacion": "Acero, aluminio y fibra de carbono: materias primas sin proveedor dominante; presión de costes en 2026 [A13]."},
   {"fuerza": "Amenaza de entrada", "intensidad": 2, "justificacion": "Barreras de ingeniería, patentes, escala y red de servicio; los entrantes chinos (gama baja) no han llegado a la gama alta [1]."},
   {"fuerza": "Amenaza de sustitutos", "intensidad": 2, "justificacion": "Otros medios de transporte y ocio; la bicicleta eléctrica amplía el mercado más que sustituirlo [4]."},
  ],
  "ciclo": {"posicion": "Recuperación", "comentario": "Tras el pico de 2021-2022 (demanda de la pandemia), la cadena acumuló inventario y las ventas de Shimano cayeron un 28 % hasta 2024. En 2025 las ventas de bicicleta volvieron a crecer (+2,7 %) por Europa, y en el 1S26 siguen planas con Europa mejor y China, Asia y Norteamérica débiles [A16, A12]. Es una recuperación lenta: el inventario de Europa aún es «algo alto» [A13]."},
  "regulacion": None,
  "tendencias": None,
  "confianza": "Baja",
 },
 "competencia": {
  "cuota_pct": None,
  "posicion": "Líder mundial en componentes de bicicleta; segundo actor relevante, SRAM (privada, sin cuentas públicas). Cuota no publicada por la empresa ni por un estudio accesible.",
  "competidores": [
   {"nombre": "SRAM", "pais": "EE. UU.", "ticker": None, "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Rival directo en transmisiones de carretera y montaña; privada, sin cuentas públicas."},
   {"nombre": "Fox Factory", "pais": "EE. UU.", "ticker": "FOXF", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Suspensiones y componentes (y vehículos); guía de ventas de 2026: 1.328-1.416 M USD; pérdidas en los últimos 12 meses [5, D12]."},
   {"nombre": "Globeride (Daiwa)", "pais": "Japón", "ticker": "7990", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Principal rival en pesca; capitalización de 52.200 M JPY [D9]."},
  ],
  "foso": {"veredicto": "Amplio", "tendencia": "Estable", "fuentes": [
   {"fuente": "Efectos de red", "puntuacion": 2, "evidencia": "Estándar de compatibilidad y red mundial de tiendas y mecánicos formados en Shimano; no es un efecto de red en sentido estricto."},
   {"fuente": "Costes de cambio", "puntuacion": 3, "evidencia": "Los fabricantes diseñan cuadros y gamas con años de antelación sobre los componentes de Shimano; el recambio sigue al equipo de origen."},
   {"fuente": "Intangibles (marca, patentes, licencias)", "puntuacion": 4, "evidencia": "Marcas Dura-Ace, Ultegra, XTR y Deore; estándar del sector desde los años ochenta [6]."},
   {"fuente": "Ventaja en costes", "puntuacion": 4, "evidencia": "Margen de explotación del 27 % en 2022 y del 11 % en el fondo del ciclo (2025), con Fox en pérdidas [A3, D12]."},
   {"fuente": "Escala eficiente", "puntuacion": 4, "evidencia": "Mercado de componentes de gama media-alta con dos actores globales; las plantas de Japón, Singapur y Malasia dan una escala que un entrante no replica [A24]."},
  ]},
  "amenazas": None,
  "confianza": "Baja",
 },
 "esg": None,
 "fuentes": fb,
 "huecos": [
  H("sector", "Tamaño y crecimiento del mercado de componentes de bicicleta", "Núcleo", "1) búsqueda de estudios de mercado (sin cifra fiable en los extractos); 2) Bike Europe y SGI Europe (solo tendencias); 3) cuentas de competidores (SRAM privada)"),
  H("competencia", "Cuota de mercado de Shimano", "Núcleo", "1) informe integrado de la empresa (no accesible); 2) prensa sectorial (sin cifra citada); 3) estimación por ventas de competidores (SRAM sin cuentas)"),
  H("esg", "Calificaciones ESG y controversias", "Complemento", "1) informe de sostenibilidad (no accesible); 2) MSCI/Sustainalytics (sin extracto); 3) prensa (retirada de bielas Hollowtech 2023 sin cifra actualizada)"),
 ],
}
save('B', B)

# ---------------- C. Equipo y gobierno ----------------
fc = [
 F(1, 'Aviso de Shimano firmado por Taizo Shimano, presidente y consejero representante. ' + EXT, 'Shimano Inc.', 'Primaria', '2026-02', 'https://www.shimano.com/en/cms/news/japan/2064469fab8b3a090d56cb2408c72e490d46ae27.pdf'),
 F(2, 'Shimano management and board (antigüedad media del equipo 5,4 años y del consejo 10,4 años). ' + EXT, 'Simply Wall St', 'Datos de mercado', '2026', 'https://simplywall.st/stocks/us/consumer-durables/otc-smnn.y/shimano/management'),
 F(3, 'Shimano Inc - Company Profile: executives. ' + EXT, 'GlobalData', 'Datos de mercado', '2026', 'https://www.globaldata.com/company-profile/shimano-inc/executives/'),
]
C = {
 "directivos": {
  "equipo": [
   {"nombre": "Yozo Shimano", "cargo": "Presidente del consejo y primer ejecutivo (Chairman & CEO)", "desde": "2021", "participacion_pct": None, "trayectoria": "Miembro de la familia fundadora; primer ejecutivo desde marzo de 2021, periodo del pico de la pandemia y de la corrección posterior [2]."},
   {"nombre": "Taizo Shimano", "cargo": "Presidente y consejero representante", "desde": None, "participacion_pct": None, "trayectoria": "Miembro de la familia fundadora; firma como presidente los avisos de la empresa en 2026 [1]."},
  ],
  "historial_guidance": [
   {"anio": "2025", "guia": "La guía de beneficio neto se rebajó dos veces durante el año (la segunda, en julio de 2025, provocó una caída del 23 % en un día)", "real": "Beneficio neto de 33.991 M JPY (−55,5 %)", "cumplida": "No"},
   {"anio": "2026", "guia": "Febrero: ventas 467.000 M, resultado de explotación 47.000 M y beneficio neto 42.000 M; julio: ventas 491.000 M y beneficio neto 43.000 M, explotación sin cambios", "real": "1S26: ventas 247.059 M (50 % de la guía) y explotación 27.249 M (58 %)", "cumplida": "Parcial"},
  ],
  "comentario": None,
  "confianza": "Baja",
 },
 "gobierno": {
  "consejo": [
   {"nombre": "Yozo Shimano", "cargo": "Presidente del consejo y CEO", "tipo": "Ejecutivo", "desde": None, "comisiones": None},
   {"nombre": "Taizo Shimano", "cargo": "Presidente y consejero representante", "tipo": "Ejecutivo", "desde": None, "comisiones": None},
   {"nombre": "Kazuo Ichijo", "cargo": "Consejero", "tipo": "Independiente", "desde": None, "comisiones": None},
   {"nombre": "Mitsuhiro Katsumaru", "cargo": "Consejero", "tipo": "Independiente", "desde": None, "comisiones": None},
   {"nombre": "Sadayuki Sakakibara", "cargo": "Consejero", "tipo": "Independiente", "desde": None, "comisiones": None},
  ],
  "presidente_ceo_separados": False, "presidente_ejecutivo": True, "consejero_coordinador": None, "una_accion_un_voto": True,
  "operaciones_vinculadas_relevantes": False, "variable_ligado_rentabilidad": None, "auditoria_independiente": None, "insiders_sin_operaciones": None,
  "accionista_control": True, "presidente_vinculado_control": True, "cambios_cupula_24m": 0,
  "voto_remuneracion_pct": None, "voto_remuneracion_contra_pct": None, "voto_remuneracion_contra_libre_pct": None, "voto_cupula_pct": None,
  "remuneracion_ceo": None,
  "remuneracion": None,
  "accionistas": [
   {"nombre": "Autocartera", "pct": 1.78, "tipo": "Autocartera", "variacion": "1.539.103 acciones a 30-jun-2026; la empresa amortizó acciones tras la recompra de 2025 (emitidas: 89,07 M a fin de 2024 y 86,47 M a fin de 2025) [A20, A19]"},
  ],
  "insiders": [],
  "control_y_defensas": "Empresa familiar: la familia Shimano ocupa la presidencia del consejo y la presidencia ejecutiva, y decide de hecho la sucesión, aunque su participación directa no se ha podido verificar. Una acción, un voto; sin clases de acciones. Tratamos a la familia como accionista de control a efectos del criterio de gobierno. Los independientes (tres según Simply Wall St) no se han podido comprobar en el informe de gobierno [2].",
  "alertas": ["Dos rebajas de la guía de beneficio neto en 2025; la segunda, en julio de 2025, provocó una caída del 23 % en un día [D21].", "Datos de gobierno sin verificar en el informe de gobierno corporativo (no accesible desde este entorno)."],
  "confianza": "Baja",
 },
 "fuentes": fc,
 "huecos": [
  H("gobierno", "Remuneración del primer ejecutivo, votos de la junta y participación de la familia", "Núcleo", "1) informe de gobierno corporativo y Securities Report (no accesibles); 2) búsqueda en inglés de resultados de la junta del 24-mar-2026; 3) Simply Wall St y GlobalData (sin cifras)"),
  H("gobierno", "Accionistas significativos", "Núcleo", "1) Securities Report (no accesible); 2) web de la empresa (solo autocartera en el extracto); 3) Buffett Code y Kabutan (sin lista)"),
 ],
}
save('C', C)

# ---------------- D. Mercado y valoración ----------------
fd = [
 F(1, '(株)シマノ【7309】：株価 (cierre del 13-oct-2026: 17.845 JPY; próximos resultados 27-oct-2026). ' + EXT, 'Yahoo!ファイナンス', 'Datos de mercado', '2026-10-13', 'https://finance.yahoo.co.jp/quote/7309.T'),
 F(2, 'シマノ(7309) 株価 (rango del año: 21.530 el 30-jul-2026 y 15.320 el 9-jun-2026). ' + EXT, 'Matsui Securities', 'Datos de mercado', '2026-10-02', 'https://finance.matsui.co.jp/stock/7309/index'),
 F(3, '【シマノ】[7309] 過去10年間の株価推移 (cierres anuales 2020-2025). ' + EXT, 'Nikkei', 'Datos de mercado', '2026-10', 'https://www.nikkei.com/nkd/company/history/yprice/?scode=7309'),
 F(4, 'Shimano Inc (7309) Stock Forecast & Price Target (10 analistas: 2 comprar, 7 mantener, 1 vender; objetivo medio 19.214,5 JPY). ' + EXT, 'Investing.com', 'Analistas', '2026-10', 'https://www.investing.com/equities/shimano-inc-consensus-estimates'),
 F(5, 'Shimano Inc. Stock (7309): consenso. ' + EXT, 'MarketScreener', 'Analistas', '2026-10', 'https://www.marketscreener.com/quote/stock/SHIMANO-INC-6491559/'),
 F(6, 'Shimano Inc. Just Beat Analyst Forecasts (BPA de 2026 del consenso: 563 JPY, 12 analistas). ' + EXT, 'Simply Wall St', 'Analistas', '2026-07', 'https://simplywall.st/stocks/jp/consumer-durables/tse-7309/shimano-shares/news/shimano-inc-just-beat-analyst-forecasts-and-analysts-have-be-2'),
 F(7, 'Shimano (TYO:7309) Statistics & Valuation Metrics (caja neta 463.720 M, sin deuda, BPA LTM 671,50). ' + EXT, 'Stock Analysis', 'Datos de mercado', '2026-10', 'https://stockanalysis.com/quote/tyo/7309/statistics/'),
 F(8, 'Shimano Share Price, Forecast & Financials (BPA del próximo ejercicio 546 JPY; objetivo 17.787). ' + EXT, 'Stockopedia', 'Analistas', '2026-10', 'https://www.stockopedia.com/share-prices/shimano-TYO:7309/'),
 F(9, 'グローブライド(7990): PER予想 9,2 veces; capitalización 52.200 M JPY (7-oct-2026). ' + EXT, 'Kabuyoho', 'Datos de mercado', '2026-10-07', 'https://kabuyoho.jp/reportTarget?bcode=7990'),
 F(10, 'Thule Group (THUPY): PER adelantado 18,0 (22-jul-2026). ' + EXT, 'Yahoo Finance', 'Datos de mercado', '2026-07-22', 'https://finance.yahoo.com/quote/THUPY/'),
 F(11, 'Giant Manufacturing (9921): PER adelantado 15,6. ' + EXT, 'MuslimXchange (datos de mercado)', 'Datos de mercado', '2026-09', 'https://muslimxchange.com/ticker/9921-giant-manufacturing-co-ltd/'),
 F(12, 'Fox Factory Holding (FOXF): cotización 18,77 USD y BPA LTM −7,14. ' + EXT, 'Yahoo Finance', 'Datos de mercado', '2026-10', 'https://ca.finance.yahoo.com/quote/FOXF/'),
 F(13, 'Bandai Namco (7832): múltiplos recogidos en el informe de ANYCOLOR del 14-oct-2026 de este repositorio (MarketScreener y Stock Analysis)', 'Repositorio analisis-inversion', 'Datos de mercado', '2026-10-06', 'informes/anycolor-2026-10-14/datos.json'),
 F(14, 'Asics (7936) y Amer Sports (AS): múltiplos recogidos en el informe de Deckers del 11-oct-2026 de este repositorio', 'Repositorio analisis-inversion', 'Datos de mercado', '2026-10-09', 'informes/deckers-2026-10-11/datos.json'),
 F(15, 'JGB yield curve, constant maturity (10 años: 3,089 %), tomado del informe de ANYCOLOR del repo', 'Ministry of Finance Japan', 'Primaria', '2026-10-08', 'https://www.mof.go.jp/english/policy/jgbs/reference/interest_rate/jgbcme.csv'),
 F(16, 'ERPbymonth.xlsx (prima implícita del S&P 500, octubre de 2026: 4,20 %)', 'Aswath Damodaran (NYU Stern)', 'Datos de mercado', '2026-10', 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx'),
 F(17, 'シマノ: 話題の銘柄 (compras aplazadas a la espera de nuevos grupos de gama alta; subida del resultado de explotación previsto para 2027). ' + EXT, 'Traders Web', 'Analistas', '2026', 'https://www.traders.co.jp/premium/wadai/23872'),
 F(18, 'シマノ(7309): 決算・業績進捗 y señales (próximos resultados: 27-oct-2026). ' + EXT, 'Kabuyoho', 'Datos de mercado', '2026-10-09', 'https://kabuyoho.jp/sp/report?bcode=7309'),
 F(19, 'Shimano: analyst forecast (3 analistas; objetivo medio ≈19.901 JPY). ' + EXT, 'TipRanks', 'Analistas', '2026-10', 'https://www.tipranks.com/stocks/jp:7309/forecast'),
 F(20, 'シマノ 時系列 (cierres de septiembre de 2026: 19.255 el 4-sep, 18.225 el 18-sep). ' + EXT, 'Traders Web', 'Datos de mercado', '2026-09-18', 'https://www.traders.co.jp/stocks/61_7309/historical'),
 F(21, '【株価が動いた理由】シマノ −23,33 %: segunda rebaja de la guía de beneficio neto y límite diario a la baja. ' + EXT, 'PayPay Securities', 'Prensa', '2025-07-30', 'https://media.paypay-sec.co.jp/cat2/mj250730_2'),
 F(22, 'シマノ【7309】株の基本情報 (BPA previsto por la empresa para 2026: 511,3 JPY). ' + EXT, 'Kabutan', 'Datos de mercado', '2026-10', 'https://kabutan.jp/stock/?code=7309'),
]
D_ = {
 "identificacion": {
  "nombre": "Shimano Inc.", "nombre_corto": "Shimano", "ticker": "7309", "isin": "JP3358000002", "mercado": "Bolsa de Tokio (Prime)", "indice_referencia": "Nikkei 225 / TOPIX",
  "pais": "Japón", "pais_iso": "JP", "sector": "Consumo discrecional", "industria": "Productos de ocio (componentes de bicicleta y pesca)", "sede": "Sakai (Osaka), Japón", "fundacion": "1921", "empleados": None, "web": "www.shimano.com",
  "precio": 17845, "fecha_precio": "2026-10-13", "acciones": 84.99, "capitalizacion_publicada": None, "free_float_pct": None,
  "max_52s": 21530, "min_52s": 14895, "volumen_medio_diario": None, "proximos_resultados": "2026-10-27",
 },
 "consenso": {
  "guidance": None,
  "estimaciones": [
   {"periodo": "2026e", "ingresos": None, "ebitda": None, "ebit": None, "bpa": 563.0, "dpa": 363.0, "fuente": "Simply Wall St (12 analistas) [6]; dividendo: guía de la empresa [A10]"},
  ],
  "recomendaciones": {"n_analistas": 10, "comprar": 2, "mantener": 7, "vender": 1, "po_medio": 19214.5, "po_min": None, "po_max": None},
  "revisiones": None,
  "base_ebitda": "NIIF", "ajuste_ebitda_pct_ventas": None,
  "confianza": "Baja",
 },
 "bolsa": None,
 "multiplos_historicos": {
  "serie": [
   {"anio": "2021", "precio_cierre": 30660, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": True},
   {"anio": "2022", "precio_cierre": 20920, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": True},
   {"anio": "2023", "precio_cierre": 21835, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2024", "precio_cierre": 21390, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2025", "precio_cierre": 16535, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": True},
  ],
  "comentario": None,
  "confianza": "Media",
 },
 "comparables": {
  "criterio": None,
  "empresas": [
   {"nombre": "Globeride (Daiwa)", "ticker": "7990", "pais": "JP", "capitalizacion": 52200, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 9.2, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "Thule Group", "ticker": "THULE", "pais": "SE", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 18.0, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "Giant Manufacturing", "ticker": "9921", "pais": "TW", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 15.6, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "Bandai Namco", "ticker": "7832", "pais": "JP", "capitalizacion": None, "ev_ventas": 2.44, "ev_ebitda_ltm": 13.7, "ev_ebitda_ntm": 12.3, "per_ntm": 22.5, "crecimiento_pct": 6.5, "margen_ebitda_pct": 17.7, "roic_pct": 31.26, "dn_ebitda": -1.6, "fcf_yield_pct": 3.3},
   {"nombre": "Asics", "ticker": "7936", "pais": "JP", "capitalizacion": None, "ev_ventas": 3.3, "ev_ebitda_ltm": 15.4, "ev_ebitda_ntm": 12.4, "per_ntm": 22.1, "crecimiento_pct": 16.9, "margen_ebitda_pct": 20.8, "roic_pct": 41.8, "dn_ebitda": -0.08, "fcf_yield_pct": 2.6},
   {"nombre": "Amer Sports", "ticker": "AS", "pais": "US", "capitalizacion": None, "ev_ventas": 2.37, "ev_ebitda_ltm": 12.7, "ev_ebitda_ntm": 9.7, "per_ntm": 18.6, "crecimiento_pct": 18.6, "margen_ebitda_pct": 17.5, "roic_pct": 9.5, "dn_ebitda": 0.96, "fcf_yield_pct": 3.1},
  ],
  "comentario": None,
  "confianza": "Baja",
 },
 "transacciones": None,
 "fuentes": fd,
 "huecos": [
  H("bolsa", "Rentabilidades, beta, volatilidad y caída máxima", "Complemento", "1) bolsa.mjs sin red; 2) búsqueda de beta en Stock Analysis y Yahoo (sin extracto); 3) históricos de Nikkei (solo cierres anuales)"),
  H("transacciones", "Operaciones comparables en componentes de bicicleta y pesca", "Complemento", "1) búsqueda no hecha por presupuesto de búsquedas compartido; 2) operaciones conocidas sin múltiplo publicado (compras de capital privado de Accell, 2022); 3) prensa sectorial"),
  H("consenso", "Estimaciones de 2027e y 2028e (ventas, EBITDA, BPA)", "Núcleo", "1) MarketScreener (solo abre con WebFetch, bloqueado); 2) Investing y Simply Wall St (solo 2026e); 3) StocksGuide (cifras contradictorias)"),
 ],
}
save('D', D_)

# ---------------- E. Sentimiento ----------------
fe = [
 F(1, 'Kabuyoho: señales técnicas y valoración de Shimano (alternan «compra» en julio y «venta» en septiembre de 2026; «algo barata» por PBR). ' + EXT, 'Kabuyoho', 'Foros y redes', '2026-10-07', 'https://kabuyoho.jp/sp/reportTop?bcode=7309'),
 F(2, 'Simply Wall St: Did Shimano’s sizable share buyback reveal a new direction for capital allocation? (narrativa de la comunidad). ' + EXT, 'Simply Wall St', 'Foros y redes', '2026', 'https://simplywall.st/stocks/jp/consumer-durables/tse-7309/shimano-shares/news/did-shimanos-tse7309-sizable-share-buyback-reveal-a-new-dire'),
 F(3, 'TipRanks: Shimano ADR (SMNNY), puntos bajistas: ventas a la baja, margen de 2025 y caída del flujo de caja libre. ' + EXT, 'TipRanks', 'Foros y redes', '2026-10', 'https://www.tipranks.com/stocks/smnny'),
 F(4, 'note: [Understanding Financial Statement Analysis through Manga] The Shock of a 46% Drop in Operating Profit… (blog de inversor particular). ' + EXT, 'note.com', 'Foros y redes', '2026-04', 'https://note.com/mangawakaru/n/n247acd3d53c6?hl=en'),
 F(5, 'note: 【決算解説】シマノ（7309）2025年12月期 «Ventas casi planas, beneficio hundido y por qué aún puede aumentar la retribución» (blog de inversor particular). ' + EXT, 'note.com', 'Foros y redes', '2026-02', 'https://note.com/kabuya66/n/n20f5949b09c2'),
 F(6, 'Simply Wall St: Shimano P/E 26,8x frente a 14,5x del ocio japonés; DCF de la comunidad muy por encima del precio. ' + EXT, 'Simply Wall St', 'Foros y redes', '2026-10', 'https://simplywall.st/stocks/us/consumer-durables/otc-smnn.y/shimano/valuation'),
]
E = {
 "sentimiento": {
  "tono": "Dividido", "tendencia": "Estable",
  "revisadas": [
   {"plataforma": "Kabuyoho (señales y valoración para particulares)", "fecha": "2026-10", "n_comentarios": None, "tono": "Dividido", "resumen": "La señal de tendencia pasó de «compra» en julio a «venta» en septiembre; por PBR la ve «algo barata» [1]."},
   {"plataforma": "Simply Wall St (narrativas de la comunidad)", "fecha": "2026-10", "n_comentarios": None, "tono": "Dividido", "resumen": "La recompra se lee como gestión activa del capital, pero no compensa las rebajas de guía; el PER (26,8x) parece caro frente al ocio japonés y el DCF de la comunidad, barato [2, 6]."},
   {"plataforma": "TipRanks (ADR)", "fecha": "2026-10", "n_comentarios": None, "tono": "Negativo", "resumen": "Destaca ventas en descenso, la caída del margen de 2025 y del flujo de caja libre como límites para dividendos y recompras [3]."},
   {"plataforma": "note.com (blogs de inversores japoneses)", "fecha": "2026-04", "n_comentarios": None, "tono": "Neutro", "resumen": "Explican que el beneficio neto sube por divisa y partidas no operativas mientras el de explotación cae; uno defiende que la caja permite seguir subiendo la retribución [4, 5]."},
  ],
  "temas": [
   {"tema": "¿Ha tocado fondo el ciclo de la bicicleta?", "postura": "Dividida", "peso": "Alto", "contraste": "Las ventas de bicicleta del 1S26 están planas y el margen de ese segmento cae un 15 %: el fondo de volumen parece cerca, el de margen todavía no [A12]."},
   {"tema": "Beneficio neto inflado por la divisa", "postura": "Bajista", "peso": "Medio", "contraste": "Tienen razón: el 1S26 suma ganancias de cambio y una venta de activos; el resultado de explotación guiado para 2026 (47.000 M) es un 9 % menor que el de 2025 [A10, A11]."},
   {"tema": "Caja y retribución al accionista", "postura": "Alcista", "peso": "Medio", "contraste": "Caja de ≈459.000 M JPY (≈30 % de la capitalización) y dividendo de 363 JPY (2,0 %); la recompra de 2025 fue de ≈50.000 M [A12, A10, A21]."},
   {"tema": "Valoración exigente por PER", "postura": "Bajista", "peso": "Medio", "contraste": "Cotiza a ≈32x nuestro BPA de 2027e, pero sin la caja el PER cae a ≈22x; el mercado paga la recuperación del margen."},
  ],
  "lectura": None,
  "confianza": "Baja",
 },
 "fuentes": fe,
 "huecos": [
  H("sentimiento", "Hilos de Reddit, Stocktwits y del tablón de Yahoo!ファイナンス", "Complemento", "1) búsqueda de Reddit y Seeking Alpha (sin hilos de los últimos tres meses); 2) búsqueda del tablón de Yahoo!ファイナンス y de Minkabu (sin extractos de comentarios); 3) API de Stocktwits (sin acceso: solo WebSearch)", "Omitido"),
 ],
}
save('E', E)
import re
def fix(letra, obj):
    fu = obj['fuentes']
    glob = {L: {str(f['id']): f for f in NOTAS[L]['fuentes']} for L in NOTAS}
    extra = {}
    def local(L, n):
        if L == letra: return n
        key = L + n
        if key not in extra:
            f = dict(glob[L][n]); f['id'] = len(fu) + 1; fu.append(f); extra[key] = str(f['id'])
        return extra[key]
    def rep(m):
        cur = letra; out = []
        for t in re.split(r'\s*,\s*', m.group(1)):
            mm = re.match(r'^([A-E])?(\d+)$', t)
            if not mm: return m.group(0)
            if mm.group(1): cur = mm.group(1)
            out.append(local(cur, mm.group(2)))
        return '[' + ', '.join(out) + ']'
    def walk(x, top=False):
        if isinstance(x, str): return re.sub(r'\[((?:[A-E]?\d+)(?:\s*,\s*[A-E]?\d+)*)\]', rep, x)
        if isinstance(x, list): return [walk(i) for i in x]
        if isinstance(x, dict): return {k: (v if (top and k == 'fuentes') else walk(v)) for k, v in x.items()}
        return x
    return walk(obj, True)
for L in list(NOTAS):
    o = fix(L, NOTAS[L])
    with open(os.path.join(D, L + '.json'), 'w', encoding='utf-8') as f:
        json.dump(o, f, ensure_ascii=False, indent=1)
print('ok')

# Genera las notas A-E de Sika (corte 2026-10-14) a partir de los extractos de búsqueda.
# Entorno nube: solo WebSearch. Cada nota cita solo su propia lista de fuentes.
import json, os
D = os.path.dirname(os.path.abspath(__file__))

def w(nombre, obj):
    with open(os.path.join(D, nombre), 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)

def F(i, titulo, editor, tipo, fecha, url):
    return {"id": i, "titulo": titulo, "editor": editor, "tipo": tipo, "fecha": fecha, "url": url}

# ---------------------------------------------------------------- A. Cuentas
fa = [
    F(1, "Media release: business year 2025 (20-feb-2026)", "Sika AG", "Primaria", "2026-02-20", "https://www.sika.com/dms/getdocument.get/992fbd18-f3fb-4605-93be-b028fd3d9ff0/glo-en-media-release-business-year-2025-20022026.pdf"),
    F(2, "Sika reports full year 2025 results (ad hoc)", "Sika AG vía GlobeNewswire", "Primaria", "2026-02-20", "https://www.globenewswire.com/news-release/2026/02/20/3241673/0/en/SIKA-REPORTS-FULL-YEAR-2025-RESULTS-EXECUTING-PLAN-TO-ACCELERATE-GROWTH.html"),
    F(3, "Half year report 2026: 4,0 % de crecimiento en moneda local y mejora de la guía", "Sika AG", "Primaria", "2026-07-28", "https://www.sika.com/en/media/media-releases/2026/half-year-report-2026.html"),
    F(4, "Sika FY26 H1 net profit slips 0.4% to CHF 552.1 million", "Vermögenszentrum (AWP/RTT)", "Prensa", "2026-07-28", "https://www.vermoegenszentrum.ch/en/stock-exchange-and-markets/news/sika-fy26-h1-net-profit-slips-04-chf-5521-million-net-sales-fall-15"),
    F(5, "Sika AG (SWX:SIKA) Income statement", "Stock Analysis", "Datos de mercado", "2026-10", "https://stockanalysis.com/quote/swx/SIKA/financials/"),
    F(6, "Sika AG (SWX:SIKA) Cash flow statement", "Stock Analysis", "Datos de mercado", "2026-10", "https://stockanalysis.com/quote/swx/SIKA/financials/cash-flow-statement/"),
    F(7, "Sika AG (CH:SIKA) Financials (balance anual)", "TipRanks", "Datos de mercado", "2026-10", "https://www.tipranks.com/stocks/ch:sika/financials"),
    F(8, "Sika AG (SWX:SIKA) Statistics & valuation metrics (último trimestre)", "Stock Analysis", "Datos de mercado", "2026-10", "https://stockanalysis.com/quote/swx/SIKA/statistics/"),
    F(9, "Media release: business year 2023 (16-feb-2024)", "Sika AG", "Primaria", "2024-02-16", "https://www.sika.com/content/dam/dms/corporate/media/glo-en-media-release-business-year-2023-16022024.pdf"),
    F(10, "Annual report 2022: facts & figures", "Sika AG", "Primaria", "2023-02", "https://reports.sika.com/en/annual-report-2022/financials"),
    F(11, "Media release: business year 2021 (18-feb-2022)", "Sika AG", "Primaria", "2022-02-18", "https://www.sika.com/content/dam/dms/corporate/media/glo-en-media-release-business-year-2021-18022022.pdf"),
    F(12, "Sika shares: key data", "Sika AG", "Primaria", "2026", "https://www.sika.com/en/investors/shares/key-data-on-sika-shares.html"),
    F(13, "AGM presentation 24-mar-2026 (ventas por región 2025)", "Sika AG", "Primaria", "2026-03-24", "https://www.sika.com/dms/getdocument.get/c2be81cf-9630-46b7-abc0-da9a16b9b8b3/glo-agm-presentation-24032026.pdf"),
    F(14, "Media release Q1 2026 (14-abr-2026)", "Sika AG", "Primaria", "2026-04-14", "https://www.sika.com/dms/getdocument.get/df266823-ccd9-4a5d-8270-d83a6077d4e6/glo-en-media-release-Q1-14042026.pdf"),
    F(15, "Sika to acquire MBCC Group (11-nov-2021)", "Sika AG", "Primaria", "2021-11-11", "https://gbr.sika.com/en/media/news/2021/sika-to-acquire-mbcc-group.html"),
    F(16, "Sika (SIKA) H1 2026 earnings call highlights", "GuruFocus", "Prensa", "2026-07-28", "https://www.gurufocus.com/news/8983968/sika-ag-skfof-h1-2026-earnings-call-highlights-navigating-challenges-with-strategic-growth-and-efficiency"),
    F(17, "Sika wächst wieder aus eigener Kraft", "Moneycab", "Prensa", "2026-07-28", "https://www.moneycab.com/?p=2067057"),
    F(18, "Annual report 2025 Quick Report (crecimiento por región)", "Sika AG", "Primaria", "2026-02-20", "https://reports.sika.com/en/annual-report-2025/quick-report"),
]

def cta(p, ing, cv, ebitda, am, ebit, nr, bn, bpa, dpa, acc):
    return {"periodo": p, "ingresos": ing, "coste_ventas": cv, "gastos_generales": None, "ebitda": ebitda, "amortizaciones": am, "ebit": ebit,
            "resultado_financiero": None, "bai": None, "impuestos": None, "minoritarios": None, "beneficio_neto": bn, "gastos_financieros": None,
            "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": nr, "bpa": bpa, "dpa": dpa, "dpa_extraordinario": 0, "acciones_diluidas": acc}

A = {
 "_estado": "Completo con huecos (entorno nube: solo WebSearch)",
 "negocio": {
  "segmentos": [
   {"nombre": "EMEA", "descripcion": "Europa, Oriente Medio y África: la región mayor; crecimiento del 2,2 % en moneda local en 2025 [18].", "tipo_resultado": None, "historico": [{"periodo": "2025", "ingresos": 5030, "resultado": None}]},
   {"nombre": "Américas", "descripcion": "Norteamérica y Latinoamérica; +2,2 % en moneda local en 2025 [18].", "tipo_resultado": None, "historico": [{"periodo": "2025", "ingresos": 3880, "resultado": None}]},
   {"nombre": "Asia/Pacífico", "descripcion": "Incluye China, en contracción de dos dígitos; −5,3 % en moneda local en 2025 [18].", "tipo_resultado": None, "historico": [{"periodo": "2025", "ingresos": 2291, "resultado": None}]}
  ],
  "geografias": [{"nombre": "EMEA", "peso_pct": 44.9}, {"nombre": "Américas", "peso_pct": 34.6}, {"nombre": "Asia/Pacífico", "peso_pct": 20.5}],
  "geografias_criterio": "origen",
  "kpis": [
   {"kpi": "Ventas (M CHF)", "valor_anterior": "11.763 (2024)", "valor_actual": "11.201 (2025); 5.590 en el 1S26", "variacion": "−4,8 % en CHF; +0,6 % en moneda local", "comentario": "Efecto divisa de −5,4 % en 2025 y −5,5 % en el 1S26 [1, 3]."},
   {"kpi": "Crecimiento orgánico", "valor_anterior": "≈−0,5 % (2025, est.)", "valor_actual": "+2,9 % (1S26); +5,7 % (2T26)", "variacion": "aceleración", "comentario": "El 2T26 fue el mejor trimestre orgánico desde 2024 [3, 17]."},
   {"kpi": "Margen EBITDA", "valor_anterior": "19,3 % (2024)", "valor_actual": "18,4 % publicado / 19,2 % sin Fast Forward (2025); 19,0 % (1S26)", "variacion": "−90 pb publicado", "comentario": "108 M CHF de costes únicos de Fast Forward en 2025 (86 M dentro del EBITDA) [1]."},
   {"kpi": "Caja libre operativa (M CHF)", "valor_anterior": "1.402,9 (2024)", "valor_actual": "1.356,1 (2025)", "variacion": "−3 %", "comentario": "Conversión del 12,1 % de las ventas (11,9 % en 2024); 139,6 M en el 1S26 frente a 181,9 M [1, 3]."},
   {"kpi": "Ahorros de Fast Forward", "valor_anterior": "—", "valor_actual": "80 M CHF previstos en 2026", "variacion": "en plazo", "comentario": "Programa de eficiencia lanzado en 2025 que se paga en menos de dos años [1, 3]."}
  ],
  "confianza": "Media"
 },
 "financieros": {
  "cuenta": [
   cta("2021", 9252.3, 4461, 1758.0, 366.6, 1391.4, None, 1048.0, 6.60, 2.90, 158.8),
   cta("2022", 10491.8, 5312, 1964.2, 384.5, 1579.7, -88.2, 1162.5, 7.29, 3.20, 159.5),
   cta("2023", 11238.6, 5214, 2034.4, 485.3, 1549.1, 131.5, 1062.6, 6.65, 3.30, 159.8),
   cta("2024", 11763.1, 5347, 2269.5, 546.5, 1723.0, None, 1247.6, 7.76, 3.60, 160.8),
   cta("2025", 11201.3, 5047, 2064.7, 545.7, 1519.0, 86.0, 1045.3, 6.50, 3.70, 160.8)
  ],
  "ltm": {"periodo": "LTM jun-26", "fecha_fin": "2026-06-30", "ingresos": 11116, "ebitda": 2057.3, "ebit": None, "beneficio_neto": 1043.0, "bpa": 6.48, "dpa": 3.70, "dpa_extraordinario": 0, "fcf": None, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": 86.0},
  "cambios_perimetro": [{"periodo": "2023", "descripcion": "MBCC Group (antigua química de construcción de BASF), consolidada desde mayo de 2023: ≈3.236 M CHF pagados en caja [6, 15]."}],
  "confianza": "Media"
 },
 "trimestres": {
  "items": [
   {"periodo": "1S25", "ingresos": 5675, "crecimiento_pct": None, "crecimiento_organico_pct": None, "ebitda": 1070.4, "margen_ebitda_pct": 18.9, "bpa": 3.45, "vs_consenso": None},
   {"periodo": "2S25", "ingresos": 5526.3, "crecimiento_pct": None, "crecimiento_organico_pct": None, "ebitda": 994.3, "margen_ebitda_pct": 18.0, "bpa": 3.05, "vs_consenso": "Inferior"},
   {"periodo": "1S26", "ingresos": 5590, "crecimiento_pct": -1.5, "crecimiento_organico_pct": 2.9, "ebitda": 1063.0, "margen_ebitda_pct": 19.0, "bpa": 3.43, "vs_consenso": "Superior"}
  ],
  "confianza": "Media"
 },
 "balance": {
  "historico": [
   {"periodo": "2023", "activo_total": 15050, "activo_corriente": None, "pasivo_corriente": None, "pasivo_total": 9130, "fondo_comercio": None, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 648.2, "deuda_financiera": 5840, "arrendamientos": 0, "patrimonio_neto": 5920, "minoritarios": None, "reservas": None},
   {"periodo": "2024", "activo_total": 15980, "activo_corriente": None, "pasivo_corriente": None, "pasivo_total": 8950, "fondo_comercio": None, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 712.9, "deuda_financiera": 5720, "arrendamientos": 0, "patrimonio_neto": 7030, "minoritarios": None, "reservas": None},
   {"periodo": "2025", "activo_total": 15360, "activo_corriente": None, "pasivo_corriente": None, "pasivo_total": 8700, "fondo_comercio": None, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 807.6, "deuda_financiera": 5518, "arrendamientos": 0, "patrimonio_neto": 6660, "minoritarios": None, "reservas": None}
  ],
  "vencimientos": [],
  "liquidez": "Caja de 807,6 M CHF a dic-25 y 625,3 M en el último trimestre publicado (jun-26), con deuda bruta de 6.080 M [7, 8].",
  "rating": None, "coste_deuda_pct": None, "vida_media_anios": None,
  "confianza": "Baja"
 },
 "flujos": {
  "historico": [
   {"periodo": "2021", "flujo_operativo": 1064, "capex": 157, "pagos_arrendamientos": None, "adquisiciones": 304.4, "desinversiones": 0, "dividendos": 354, "recompras": 0, "emision_acciones": 0, "intereses_en_financiacion": 0},
   {"periodo": "2022", "flujo_operativo": 1100, "capex": 238, "pagos_arrendamientos": None, "adquisiciones": 142.7, "desinversiones": 0, "dividendos": 411, "recompras": 0, "emision_acciones": 0, "intereses_en_financiacion": 0},
   {"periodo": "2023", "flujo_operativo": 1714, "capex": 257, "pagos_arrendamientos": None, "adquisiciones": 3236, "desinversiones": 0, "dividendos": 493, "recompras": 0, "emision_acciones": 0, "intereses_en_financiacion": 0},
   {"periodo": "2024", "flujo_operativo": 1743, "capex": 331, "pagos_arrendamientos": None, "adquisiciones": 256.9, "desinversiones": 0, "dividendos": 529, "recompras": 0, "emision_acciones": 0, "intereses_en_financiacion": 0},
   {"periodo": "2025", "flujo_operativo": 1708, "capex": 348, "pagos_arrendamientos": None, "adquisiciones": 199.6, "desinversiones": 0, "dividendos": 577, "recompras": 0, "emision_acciones": 0, "intereses_en_financiacion": 0}
  ],
  "confianza": "Media"
 },
 "calidad": {"auditor": None, "anios_auditor": None, "opinion": "Favorable (sin salvedades conocidas)", "confianza": "Baja"},
 "fuentes": fa,
 "huecos": [
  {"seccion": "balance", "campo": "Circulante, fondo de comercio, intangibles y reservas", "tipo": "Núcleo", "intentos": "1) Informe anual 2025 de Sika (PDF no accesible: solo WebSearch); 2) Stock Analysis, TipRanks y Twelve Data (el fondo de comercio de Twelve Data, 14.100 M, no cuadra con un activo de 15.360 M); 3) cálculo desde la cuenta (imposible sin balance)", "decision": "Omitido"},
  {"seccion": "balance", "campo": "Balance 2021-2022", "tipo": "Núcleo", "intentos": "1) Informes anuales 2021-2022; 2) TipRanks (solo tres años); 3) Stock Analysis", "decision": "Omitido"},
  {"seccion": "financieros", "campo": "Resultado financiero, impuestos y minoritarios por año", "tipo": "Complemento", "intentos": "1) Comunicados de resultados (extractos sin ese detalle); 2) Stock Analysis; 3) derivado: resultado financiero implícito de ≈−187 M en 2025 con un tipo del 21,5 % (estimación propia)", "decision": "Omitido en la cuenta; usado como estimación en el BPA"},
  {"seccion": "flujos", "campo": "Pagos de arrendamientos y dividendos pagados exactos", "tipo": "Complemento", "intentos": "1) Estado de flujos de Sika; 2) Stock Analysis (sin dividendos en el extracto); 3) dividendos = DPA del año anterior × acciones (estimación propia)", "decision": "Calculado y marcado como estimación"}
 ]
}
w("A.json", A)

# ---------------------------------------------------------------- B. Sector y competencia
fb = [
    F(1, "Construction Chemicals Market Forecast Report 2025 (ResearchAndMarkets)", "GlobeNewswire", "Sectorial", "2025-08-19", "https://www.globenewswire.com/news-release/2025/08/19/3135462/0/en/Construction-Chemicals-Market-Forecast-Report-2025-BASF-SE-and-Sika-AG-Lead-Innovation-in-Sustainable-Construction-Chemicals.html"),
    F(2, "Construction chemicals market size (2025: 91.850 M USD; 6,9 % 2026-2034)", "Fortune Business Insights", "Sectorial", "2025", "https://www.fortunebusinessinsights.com/markt-f-r-bauchemikalien-102539"),
    F(3, "Construction chemicals market to reach USD 118,53 billion by 2031 (Mordor Intelligence)", "Barchart", "Sectorial", "2026", "https://www.barchart.com/story/news/260581/construction-chemicals-market-to-reach-11853-billion-by-2031-driven-by-infrastructure-growth-greenbuilding-codes-mordor-intelligence-reports"),
    F(4, "Saint-Gobain enters into definitive agreement to acquire Fosroc", "Middle East Construction News", "Prensa", "2025", "https://meconstructionnews.com/59880/saint-gobain-enters-into-definitive-agreement-to-acquire-fosroc"),
    F(5, "JPMorgan upgrades Kingspan, stays selective on European building materials", "Investing.com", "Prensa", "2026", "https://au.investing.com/news/stock-market-news/jpmorgan-upgrades-kingspan-stays-selective-on-european-building-materials-4634058"),
    F(6, "Annual report 2025 Quick Report", "Sika AG", "Primaria", "2026-02-20", "https://reports.sika.com/en/annual-report-2025/quick-report"),
    F(7, "Sika to acquire MBCC Group (11-nov-2021)", "Sika AG", "Primaria", "2021-11-11", "https://gbr.sika.com/en/media/news/2021/sika-to-acquire-mbcc-group.html"),
    F(8, "Sika AG (Wikipedia: historia y cronología)", "Wikipedia", "Prensa", "2026", "https://en.wikipedia.org/wiki/Sika_AG"),
    F(9, "Sika upgraded at BofA on FY26 oil, data center tailwinds", "Investing.com", "Analistas", "2026", "https://www.investing.com/news/stock-market-news/sika-upgraded-at-bofa-on-fy26-oil-data-center-tailwinds-pt-raised-4760485"),
    F(10, "Sika: Frankenstärke belastet Konzern (28-jul-2026)", "Plattform J", "Prensa", "2026-07-28", "https://www.plattformj.ch/artikel/245263/"),
]
B = {
 "_estado": "Parcial (entorno nube)",
 "sector": {
  "tamano": "≈82.500 M USD en 2025 (≈66.000 M CHF), según ResearchAndMarkets [1]; Fortune Business Insights da 91.850 M USD [2]",
  "unidad_serie": "millones de CHF (a 0,80 CHF/USD)",
  "serie": [{"anio": "2025", "tamano": 66000}, {"anio": "2030e", "tamano": 81500}],
  "tcac_historico_pct": None, "tcac_previsto_pct": 4.3, "cr5_pct": None, "estructura": "Moderadamente concentrada",
  "confianza": "Baja"
 },
 "competencia": {
  "cuota_pct": 17.0,
  "posicion": "N.º 1 mundial en química de construcción tras comprar MBCC (la antigua división de BASF) en 2023; Saint-Gobain es el n.º 2 tras sumar Chryso, GCP y Fosroc [1, 4, 7].",
  "competidores": [
   {"nombre": "Saint-Gobain (Construction Chemicals)", "pais": "FR", "ticker": "SGO", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Compró Chryso (2021), GCP (2022) y Fosroc (2025, ≈1.025 M USD): el rival que más ha crecido por compras [4]."},
   {"nombre": "Holcim (Solutions & Products)", "pais": "CH", "ticker": "HOLN", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Cubiertas y aislamiento (Firestone Building Products, Elevate); compite en impermeabilización de cubiertas."},
   {"nombre": "RPM International", "pais": "US", "ticker": "RPM", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Tremco y Euclid: selladores, impermeabilización y aditivos en Norteamérica."},
   {"nombre": "Mapei", "pais": "IT", "ticker": None, "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Familiar, fuerte en adhesivos cerámicos y morteros; no cotiza."},
   {"nombre": "Henkel (Adhesive Technologies, Ceresit)", "pais": "DE", "ticker": "HEN3", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Rival en adhesivos industriales y morteros de consumo."}
  ],
  "confianza": "Baja"
 },
 "historia": {
  "hitos": [
   {"anio": "1910", "hito": "Kaspar Winkler funda la empresa en Zúrich con un impermeabilizante de mortero (Sika-1) [8]."},
   {"anio": "2014-2018", "hito": "Disputa por el control con Saint-Gobain, que pactó comprar la participación de la familia Burkard; termina en 2018 con la recompra y el fin de las acciones de doble voto [8]."},
   {"anio": "2018", "hito": "Desdoblamiento 1:60 y una sola clase de acciones [8]."},
   {"anio": "2019", "hito": "Compra de Parex (Francia, morteros), ≈2.500 M CHF [8]."},
   {"anio": "2023", "hito": "Cierre de la compra de MBCC Group a Lone Star (VE de 5.500 M CHF; 11,5x el EBITDA 2022e) [7]."},
   {"anio": "2025", "hito": "Programa de eficiencia Fast Forward (108 M CHF de costes únicos) tras un año de ventas planas y China en caída [6]."},
   {"anio": "2026", "hito": "Compra de Akkim (Turquía), con cierre previsto en el 3T26; mejora de la guía de crecimiento [10]."}
  ],
  "confianza": "Media"
 },
 "fuentes": fb,
 "huecos": [
  {"seccion": "competencia", "campo": "Ingresos y margen EBIT de los competidores en química de construcción", "tipo": "Núcleo", "intentos": "1) Informes anuales de Saint-Gobain, Holcim y RPM (no accesibles); 2) búsqueda por segmento; 3) prensa sectorial", "decision": "Omitido"},
  {"seccion": "sector", "campo": "Serie anual del tamaño del mercado y CR5", "tipo": "Complemento", "intentos": "1) ResearchAndMarkets; 2) Fortune Business Insights; 3) Mordor Intelligence (cifras de base distintas)", "decision": "Omitido"}
 ]
}
w("B.json", B)

# ---------------------------------------------------------------- C. Equipo y gobierno
fc = [
    F(1, "AGM voting results 2026", "Sika AG", "Primaria", "2026-03-24", "https://www.sika.com/dms/getdocument.get/7c2d4c37-05ab-4a6e-a768-0578ac07c53b/glo-agm-voting-results-2026.pdf"),
    F(2, "Results of the 2026 Annual General Meeting of Sika AG", "Sika AG", "Primaria", "2026-03-24", "https://www.sika.com/en/media/media-releases/2026/results-2026-annual-general-meeting-of-sika-ag.html"),
    F(3, "AGM voting results 2025", "Sika AG", "Primaria", "2025-03-25", "https://sika.com/dam/dms/corporate/media/glo-agm-voting-results-2025.pdf"),
    F(4, "Sika management: CEO compensation", "Simply Wall St", "Datos de mercado", "2026-03", "https://simplywall.st/stocks/ch/materials/vtx-sika/sika-shares/management"),
    F(5, "Sika ownership structure", "Simply Wall St (S&P Global)", "Datos de mercado", "2026-03", "https://simplywall.st/stocks/ch/materials/vtx-sika/sika-shares/ownership"),
    F(6, "Compensation report 2025", "Sika AG", "Primaria", "2026-02-20", "https://www.sika.com/dam/dms/corporate/media/glo-ar-25-compensation-report.pdf"),
    F(7, "Discurso del presidente en la junta general 2026 (Thierry Vanlancker)", "Sika AG", "Primaria", "2026-03-24", "https://www.sika.com/dms/getdocument.get/e6dbcbb1-fc45-4a21-b069-bb15bd4a54c9/glo-de-gv-rede-thierry-fj-vanlancker-24032026.pdf"),
    F(8, "Media release: business year 2025 (guía 2026 original)", "Sika AG", "Primaria", "2026-02-20", "https://www.sika.com/dms/getdocument.get/992fbd18-f3fb-4605-93be-b028fd3d9ff0/glo-en-media-release-business-year-2025-20022026.pdf"),
    F(9, "Half year report 2026 (guía revisada)", "Sika AG", "Primaria", "2026-07-28", "https://www.sika.com/en/media/media-releases/2026/half-year-report-2026.html"),
    F(10, "Sika verfehlt Erwartungen nach schwachem viertem Quartal", "Moneycab", "Prensa", "2026-02-20", "https://www.moneycab.com/?p=2036867"),
]
C = {
 "_estado": "Parcial (entorno nube)",
 "directivos": {
  "equipo": [
   {"nombre": "Thomas Hasler", "cargo": "Consejero delegado (CEO)", "desde": "2021", "participacion_pct": None, "trayectoria": "En Sika desde 1989; dirigió Sika Norteamérica y la división Global Business antes de suceder a Paul Schuler. Cerró la compra de MBCC y lanzó Fast Forward en 2025."},
   {"nombre": "Adrian Widmer", "cargo": "Director financiero (CFO)", "desde": "2014", "participacion_pct": None, "trayectoria": "Director financiero desde 2014; ha financiado las compras de Parex y MBCC manteniendo la calificación de grado de inversión."},
   {"nombre": "Thierry Vanlancker", "cargo": "Presidente del consejo", "desde": "2024", "participacion_pct": None, "trayectoria": "Antiguo consejero delegado de AkzoNobel; reelegido en 2026 con el 92,06 % como consejero [1]."}
  ],
  "historial_guidance": [
   {"anio": "2025", "guia": "Crecimiento en moneda local del 3-6 % y margen EBITDA en ascenso (guía inicial)", "real": "+0,6 % en moneda local; margen 18,4 % (19,2 % sin costes únicos); guía rebajada en el año", "cumplida": "No"},
   {"anio": "2026", "guia": "Febrero: +1-4 % en moneda local y margen EBITDA del 19,5-20,0 %; julio: +3-6 % y 19,0-19,5 %", "real": "1S26: +4,0 % en moneda local y 19,0 % de margen", "cumplida": "Parcial"}
  ],
  "confianza": "Baja"
 },
 "gobierno": {
  "consejo": [
   {"nombre": "Thierry Vanlancker", "cargo": "Presidente", "tipo": "Independiente", "desde": "2023", "comisiones": None},
   {"nombre": "Viktor Balli", "cargo": "Consejero", "tipo": "Independiente", "desde": "2021", "comisiones": None}
  ],
  "presidente_ceo_separados": True, "presidente_ejecutivo": False, "consejero_coordinador": None, "una_accion_un_voto": True,
  "operaciones_vinculadas_relevantes": False, "variable_ligado_rentabilidad": None, "auditoria_independiente": None, "insiders_sin_operaciones": None,
  "accionista_control": False, "presidente_vinculado_control": False, "cambios_cupula_24m": 0,
  "voto_remuneracion_pct": 93.62, "voto_remuneracion_contra_pct": None, "voto_remuneracion_contra_libre_pct": None, "voto_cupula_pct": None,
  "remuneracion_ceo": {"anio": "2025", "total": 4.30, "fijo": 1.39, "variable_corto": None, "variable_largo": None, "ratio_salario_medio": None},
  "accionistas": [
   {"nombre": "BlackRock", "pct": 7.7, "tipo": "Gestora", "variacion": "n.d."},
   {"nombre": "UBS Asset Management", "pct": 5.6, "tipo": "Gestora", "variacion": "n.d."},
   {"nombre": "The Vanguard Group", "pct": 4.4, "tipo": "Gestora", "variacion": "n.d."},
   {"nombre": "Norges Bank Investment Management", "pct": 3.0, "tipo": "Fondo soberano", "variacion": "n.d."}
  ],
  "insiders": [],
  "confianza": "Baja"
 },
 "fuentes": fc,
 "huecos": [
  {"seccion": "gobierno", "campo": "Composición completa del consejo y comisiones", "tipo": "Núcleo", "intentos": "1) Informe de gobierno 2025 (PDF no accesible); 2) web de Sika; 3) resultados de la junta (solo algunos nombres)", "decision": "Omitido (consejo parcial)"},
  {"seccion": "gobierno", "campo": "Operaciones de directivos", "tipo": "Complemento", "intentos": "1) SIX (anónimas, no accesibles desde la nube); 2) MarketScreener insiders; 3) prensa", "decision": "Omitido"},
  {"seccion": "directivos", "campo": "Participación accionarial de la dirección", "tipo": "Complemento", "intentos": "1) Informe de remuneraciones 2025; 2) Simply Wall St; 3) MarketScreener", "decision": "Omitido"}
 ]
}
w("C.json", C)

# ---------------------------------------------------------------- D. Mercado y valoración
fd = [
    F(1, "Sika AG: cotización y capitalización (185,35 CHF el 29-sep-2026)", "MarketScreener", "Datos de mercado", "2026-09-29", "https://uk.marketscreener.com/quote/stock/SIKA-AG-44486751/sector/"),
    F(2, "SIKA stock price quote (185,60 CHF, 28-sep-2026)", "Morningstar", "Datos de mercado", "2026-09-28", "https://www.morningstar.com/stocks/xswx/sika/quote"),
    F(3, "Sika AG (SIKA.SW) quote: rango de 52 semanas 120,35-197,60 CHF", "Yahoo Finance", "Datos de mercado", "2026-10", "https://sg.finance.yahoo.com/quote/SIKA.SW/"),
    F(4, "Sika AG: valuation ratios, analysts' forecasts", "MarketScreener", "Analistas", "2026-10", "https://www.marketscreener.com/quote/stock/SIKA-AG-187802033/valuation/"),
    F(5, "Sika stock holds steady as analysts see earnings growth (datos de Yahoo Finance del 11-sep-2026)", "Ad-hoc-news", "Analistas", "2026-09-11", "https://www.ad-hoc-news.de/boerse/news/corporate-news/sika-stock-holds-steady-as-analysts-see-earnings-growth/70093106"),
    F(6, "Sika AG (SIKA): consenso, objetivo medio y calendario", "Investing.com", "Analistas", "2026-10", "https://de.investing.com/equities/sika-i"),
    F(7, "Sika N: consenso AWP (19 analistas)", "cash.ch", "Analistas", "2026", "https://www.cash.ch/aktien/sika-n-41879292"),
    F(8, "Nach der Kurskonsolidierung: Analysten erhöhen vor Quartalszahlen die Kursziele für Sika", "cash.ch", "Prensa", "2026-10", "https://www.cash.ch/news/top-news/nach-der-kurskonsolidierung-analysten-erhohen-vor-quartalszahlen-die-kursziele-fur-sika-974433"),
    F(9, "Aktie der Woche: Ist die Trendumkehr bei diesem Baustoff-Titel geschafft?", "cash.ch", "Prensa", "2026-08", "https://www.cash.ch/news/top-news/aktie-der-woche-ist-die-trendumkehr-bei-diesem-baustoff-titel-geschafft-957694"),
    F(10, "Annual report 2023 Quick Report (cierre de 273,70 CHF)", "Sika AG", "Primaria", "2024-02-16", "https://reports.sika.com/en/annual-report-2023/quick-report"),
    F(11, "Sika shares: key data (capitalización a 31-dic de 2023 y 2024)", "Sika AG", "Primaria", "2026", "https://www.sika.com/en/investors/shares/key-data-on-sika-shares.html"),
    F(12, "Discurso del presidente en la junta 2026 (acción −23,6 % en 2025; SMI +14,1 %)", "Sika AG", "Primaria", "2026-03-24", "https://www.sika.com/dms/getdocument.get/e6dbcbb1-fc45-4a21-b069-bb15bd4a54c9/glo-de-gv-rede-thierry-fj-vanlancker-24032026.pdf"),
    F(13, "Sherwin-Williams key statistics (PER adelantado)", "Yahoo Finance", "Datos de mercado", "2026-09", "https://finance.yahoo.com/quote/SHW/key-statistics"),
    F(14, "RPM International summary (PER adelantado)", "GuruFocus", "Datos de mercado", "2026-09", "https://www.gurufocus.com/stock/RPM/summary"),
    F(15, "Holcim (HCMLY) quote: PER adelantado 14,8x (23-sep-2026)", "Yahoo Finance", "Datos de mercado", "2026-09-23", "https://ca.finance.yahoo.com/quote/HCMLY/"),
    F(16, "Saint-Gobain valuation (PER 2026e 11,9x, 23-sep-2026)", "MarketScreener", "Analistas", "2026-09-23", "https://www.marketscreener.com/quote/stock/SAINT-GOBAIN-4697/valuation/"),
    F(17, "Informe Fluidra 08-oct-2026 de este repositorio (comparable Geberit)", "Repositorio analisis-inversion", "Datos de mercado", "2026-10-08", "informes/fluidra-2026-10-08/datos-v2.json"),
    F(18, "Informe Kone 14-oct-2026 de este repositorio (comparable Schindler)", "Repositorio analisis-inversion", "Datos de mercado", "2026-10-14", "informes/kone-2026-10-14/datos.json"),
    F(19, "Sika to acquire MBCC Group: VE 5.500 M CHF, 11,5x EBITDA 2022e", "Sika AG", "Primaria", "2021-11-11", "https://gbr.sika.com/en/media/news/2021/sika-to-acquire-mbcc-group.html"),
    F(20, "Saint-Gobain to acquire Fosroc (≈1.025 M USD)", "Middle East Construction News", "Prensa", "2025", "https://meconstructionnews.com/59880/saint-gobain-enters-into-definitive-agreement-to-acquire-fosroc"),
    F(21, "Bono de la Confederación a 10 años (0,54 % el 8-oct-2026), tomado del informe de Roche del 14-oct-2026 de este repositorio", "Repositorio analisis-inversion (SNB)", "Primaria", "2026-10-08", "informes/roche-2026-10-14/datos.json"),
    F(22, "ERPbymonth.xlsx (prima implícita del S&P 500, octubre de 2026: 4,20 %)", "Aswath Damodaran (NYU Stern)", "Datos de mercado", "2026-10", "https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx"),
    F(23, "Sika upgraded at BofA (BPA ajustado 7,45 / 8,17 / 8,95 CHF en 2026-2028)", "Investing.com", "Analistas", "2026", "https://www.investing.com/news/stock-market-news/sika-upgraded-at-bofa-on-fy26-oil-data-center-tailwinds-pt-raised-4760485"),
    F(24, "Sika Aktie: Kursziele nach den Halbjahreszahlen (JPMorgan 215, Octavian 230)", "cash.ch", "Prensa", "2026-08", "https://www.cash.ch/news/top-news/schweizer-aktie-der-woche-smi-sorgenkind-gibt-lebenszeichen-von-sich-928817"),
    F(25, "Stock price history for Sika (SIKA.SW): rentabilidad anual", "CompaniesMarketCap", "Datos de mercado", "2026", "https://companiesmarketcap.com/sika/stock-price-history/"),
    F(26, "Sika Quartalszahlen besser als erwartet, Aktie legt über 7 Prozent zu (abr-2026)", "cash.ch", "Prensa", "2026-04-14", "https://www.cash.ch/news/top-news/sika-quartalszahlen-besser-als-erwartet-aktie-legt-uber-7-prozent-zu-927531"),
]
D_ = {
 "_estado": "Parcial (entorno nube: sin cierre reciente)",
 "identificacion": {
  "nombre": "Sika AG", "nombre_corto": "Sika", "ticker": "SIKA", "isin": "CH0418792922", "mercado": "SIX Swiss Exchange", "indice_referencia": "SMI",
  "pais": "Suiza", "pais_iso": "CH", "sector": "Materiales", "industria": "Química (especialidades para la construcción)", "sede": "Baar (Zug)", "fundacion": "1910", "empleados": None, "web": "www.sika.com",
  "precio": 185.35, "fecha_precio": "2026-09-29", "acciones": 160.48, "capitalizacion_publicada": 29740, "free_float_pct": None,
  "max_52s": 197.60, "min_52s": 120.35, "volumen_medio_diario": None, "proximos_resultados": "2026-10-23"
 },
 "consenso": {
  "estimaciones": [
   {"periodo": "2026e", "ingresos": 11202, "ebitda": 2191, "ebit": None, "bpa": 7.31, "dpa": None, "fuente": "MarketScreener [4]; Yahoo (11-sep) da 11.410 M y 7,49 CHF [5]"},
   {"periodo": "2027e", "ingresos": 11780, "ebitda": 2358, "ebit": None, "bpa": 8.20, "dpa": None, "fuente": "MarketScreener [4]"},
   {"periodo": "2028e", "ingresos": 12305, "ebitda": 2554, "ebit": None, "bpa": 9.04, "dpa": None, "fuente": "MarketScreener [4]"}
  ],
  "recomendaciones": {"n_analistas": 22, "comprar": 14, "mantener": None, "vender": None, "po_medio": 197.36, "po_min": 150, "po_max": 240},
  "base_ebitda": "NIIF", "ajuste_ebitda_pct_ventas": None,
  "confianza": "Media"
 },
 "bolsa": {
  "tipo_rentabilidad": "de precio (sin dividendos)",
  "rentabilidades": [{"periodo": "En el año", "accion_pct": 12.4, "indice_pct": None, "sector_pct": None}],
  "anual": [
   {"anio": "2022", "accion_pct": -40.2, "indice_pct": None},
   {"anio": "2023", "accion_pct": 20.3, "indice_pct": None},
   {"anio": "2024", "accion_pct": -21.2, "indice_pct": None},
   {"anio": "2025", "accion_pct": -23.6, "indice_pct": 14.1}
  ],
  "beta": None, "volatilidad_pct": None, "max_drawdown_pct": None, "posicion_corta_pct": None,
  "confianza": "Baja"
 },
 "multiplos_historicos": {
  "serie": [
   {"anio": "2021", "precio_cierre": 380.3, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": True},
   {"anio": "2022", "precio_cierre": 227.5, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2023", "precio_cierre": 273.7, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2024", "precio_cierre": 215.8, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2025", "precio_cierre": 164.9, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False}
  ],
  "confianza": "Baja"
 },
 "comparables": {
  "empresas": [
   {"nombre": "Saint-Gobain", "ticker": "SGO", "pais": "FR", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 10.9, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "Holcim", "ticker": "HOLN", "pais": "CH", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 14.8, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "RPM International", "ticker": "RPM", "pais": "US", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 19.4, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "Schindler", "ticker": "SCHP", "pais": "CH", "capitalizacion": None, "ev_ventas": 2.08, "ev_ebitda_ltm": 13.9, "ev_ebitda_ntm": None, "per_ntm": 24.0, "crecimiento_pct": 2.5, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "Geberit", "ticker": "GEBN", "pais": "CH", "capitalizacion": None, "ev_ventas": 5.5, "ev_ebitda_ltm": 18.7, "ev_ebitda_ntm": 17.4, "per_ntm": 25.3, "crecimiento_pct": 4.4, "margen_ebitda_pct": 29.4, "roic_pct": 27.1, "dn_ebitda": 0.8, "fcf_yield_pct": 3.9},
   {"nombre": "Sherwin-Williams", "ticker": "SHW", "pais": "US", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 27.0, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None}
  ],
  "confianza": "Baja"
 },
 "transacciones": {
  "operaciones": [
   {"fecha": "2021-11", "objetivo": "MBCC Group (química de construcción ex BASF)", "comprador": "Sika", "ev": 5500, "ev_ventas": None, "ev_ebitda": 11.5, "prima_pct": None, "excluir": False, "comentario": "11,5x el EBITDA 2022e pro forma; 8,5x con sinergias de 160-180 M [19]."},
   {"fecha": "2025-02", "objetivo": "Fosroc", "comprador": "Saint-Gobain", "ev": 820, "ev_ventas": None, "ev_ebitda": None, "prima_pct": None, "excluir": False, "comentario": "≈1.025 M USD en caja (≈820 M CHF); múltiplo no publicado en la fuente [20]."}
  ],
  "confianza": "Baja"
 },
 "fuentes": fd,
 "huecos": [
  {"seccion": "identificacion", "campo": "Cierre del 13/14-oct-2026", "tipo": "Núcleo", "intentos": "1) Yahoo/SIX (no accesibles; snapshots sin fecha); 2) cash.ch, Investing, Morningstar (último dato fechado: 185,60 el 28-sep); 3) MarketScreener (185,35 el 29-sep)", "decision": "Se usa 185,35 CHF del 29-sep (confianza baja)"},
  {"seccion": "bolsa", "campo": "Beta, volatilidad, caída máxima y rentabilidades del índice", "tipo": "Complemento", "intentos": "1) bolsa.mjs (sin red); 2) Yahoo key statistics; 3) Stock Analysis", "decision": "Omitido; beta 1,10 estimada en el WACC"},
  {"seccion": "comparables", "campo": "Capitalización, EV/EBITDA y crecimiento de los comparables", "tipo": "Núcleo", "intentos": "1) MarketScreener por empresa; 2) Yahoo key statistics; 3) informes del repositorio (solo Geberit y Schindler)", "decision": "Solo PER adelantado"},
  {"seccion": "transacciones", "campo": "Múltiplos de Chryso, GCP y Fosroc", "tipo": "Complemento", "intentos": "1) Comunicados de Saint-Gobain; 2) prensa sectorial; 3) búsqueda por operación", "decision": "Omitido"}
 ]
}
w("D.json", D_)

# ---------------------------------------------------------------- E. Sentimiento
fe = [
    F(1, "Sika: foro de la comunidad (getquin)", "getquin", "Foros y redes", "2026-10", "https://app.getquin.com/es/instrument/CH0418792922/sika/foro"),
    F(2, "Sika: narrativas de la comunidad y valor razonable", "Simply Wall St", "Foros y redes", "2026-09", "https://www.simplywall.st/stock/SWX/SIKA"),
    F(3, "Sika lifts sales outlook as investors revisit whether the shares are fully valued", "Webull (Simply Wall St)", "Foros y redes", "2026-08", "https://www.webull.com/news/15315278333748224"),
    F(4, "Schweizer Aktie der Woche: SMI-Sorgenkind gibt Lebenszeichen von sich", "cash.ch", "Prensa", "2026-08", "https://www.cash.ch/news/top-news/schweizer-aktie-der-woche-smi-sorgenkind-gibt-lebenszeichen-von-sich-928817"),
    F(5, "Sika AG GF Value (modestly undervalued)", "GuruFocus", "Foros y redes", "2026-08", "https://www.gurufocus.com/term/FloatPercentageOfTSO/MEX:SIKA N"),
    F(6, "Sika Kursziel: 28 analistas, 18 comprar", "aktien.guide", "Foros y redes", "2026-07", "https://aktien.guide/kursziel/Sika-CH0418792922"),
]
E = {
 "_estado": "Parcial: sin Reddit, Stocktwits ni foros de cash.ch legibles desde la nube",
 "sentimiento": {
  "tono": "Dividido", "tendencia": "Mejora",
  "revisadas": [
   {"plataforma": "getquin (foro de la acción)", "fecha": "2026-10", "n_comentarios": 15, "tono": "Dividido", "resumen": "Particulares que promedian a la baja tras la caída de 2025 frente a otros que no ven crecimiento en volumen y temen a China y al franco [1]."},
   {"plataforma": "Simply Wall St (narrativas)", "fecha": "2026-09", "n_comentarios": 10, "tono": "Positivo", "resumen": "Valores razonables de la comunidad entre 185 y 350 CHF; una narrativa bajista sostiene que la regulación y los costes erosionarán los márgenes de la química de construcción [2]."},
   {"plataforma": "Webull / Simply Wall St (artículo con comentarios)", "fecha": "2026-08", "n_comentarios": 5, "tono": "Dividido", "resumen": "La tesis alcista se apoya en infraestructura en Europa y EE. UU.; el riesgo citado es que la construcción china siga débil [3]."},
   {"plataforma": "cash.ch (prensa con lectores)", "fecha": "2026-08", "n_comentarios": 10, "tono": "Positivo", "resumen": "«SMI-Sorgenkind» que da señales de vida: +10,6 % en una semana y +19,2 % en cuatro tras los resultados del semestre [4]."}
  ],
  "temas": [
   {"tema": "Vuelta del crecimiento orgánico (5,7 % en el 2T26)", "postura": "Alcista", "peso": "Alto", "contraste": "Cierto: el 2T26 creció un 5,7 % orgánico y la guía subió al 3-6 % en moneda local; el 3T se espera más lento por volumen."},
   {"tema": "China y el franco fuerte", "postura": "Bajista", "peso": "Alto", "contraste": "El efecto divisa restó 5,5 puntos en el 1S26 y Asia/Pacífico cayó un 5,3 % en moneda local en 2025: el riesgo es real y está en el bajista."},
   {"tema": "Valoración tras la caída de 2025", "postura": "Alcista", "peso": "Medio", "contraste": "El PER adelantado (≈23x) está ≈25 % por debajo de su mediana de cinco años (≈31x)."},
   {"tema": "Márgenes y Fast Forward", "postura": "Dividida", "peso": "Medio", "contraste": "La guía de margen bajó de 19,5-20 % a 19-19,5 % en julio pese a los 80 M de ahorro: los foristas escépticos tienen parte de razón."}
  ],
  "confianza": "Baja"
 },
 "fuentes": fe,
 "huecos": [
  {"seccion": "sentimiento", "campo": "Reddit, Stocktwits y foro de cash.ch", "tipo": "Complemento", "intentos": "1) Búsqueda de hilos de Reddit y Seeking Alpha; 2) foros suizos (cash.ch, finanzen.net); 3) agregadores (getquin, Simply Wall St)", "decision": "Solo agregadores y prensa con comentarios"}
 ]
}
w("E.json", E)
print("ok")

import json, os
D = '/home/user/analisis-inversion/informes/cadence-2026-10-14/notas'
def w(letra, obj):
    with open(os.path.join(D, letra + '.json'), 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)

def F(i, t, e, tipo, fecha, url):
    return {"id": i, "titulo": t, "editor": e, "tipo": tipo, "fecha": fecha, "url": url}

# ---------------- A. Cuentas ----------------
fa = [
 F(1, "Cadence Reports Fourth Quarter and Fiscal Year 2025 Financial Results", "Cadence (Business Wire)", "Primaria", "2026-02-17", "https://www.businesswire.com/news/home/20260216202086/en"),
 F(2, "Q4 2025 CFO Commentary", "Cadence", "Primaria", "2026-02-17", "https://s206.q4cdn.com/597110084/files/doc_financials/2025/q4/Q4-2025-CFO-Commentary-FINAL.pdf"),
 F(3, "Form 10-K FY2025", "Cadence / SEC", "Primaria", "2026-02", "https://www.sec.gov/Archives/edgar/data/813672/000081367226000016/cdns-20251231.htm"),
 F(4, "Cadence Reports Second Quarter 2026 Financial Results (8-K, anexo 99.01)", "Cadence / SEC", "Primaria", "2026-07-27", "https://www.sec.gov/Archives/edgar/data/0000813672/000081367226000089/cdns07272026ex9901.htm"),
 F(5, "Q2 2026 CFO Commentary", "Cadence", "Primaria", "2026-07-27", "https://s206.q4cdn.com/597110084/files/doc_financials/2026/q2/Q2-2026-CFO-Commentary-FINAL.pdf"),
 F(6, "Form 10-Q del 2T26 (periodo cerrado el 30-jun-2026)", "Cadence / SEC", "Primaria", "2026-07", "https://www.sec.gov/Archives/edgar/data/0000813672/000081367226000092/cdns-20260630.htm"),
 F(7, "Cadence Reports First Quarter 2026 Financial Results", "Cadence (Business Wire)", "Primaria", "2026-04-27", "https://www.businesswire.com/news/home/20260426710019/en/Cadence-Reports-First-Quarter-2026-Financial-Results"),
 F(8, "Cadence Reports Fourth Quarter and Fiscal Year 2021 Financial Results (8-K, anexo 99.01)", "Cadence / SEC", "Primaria", "2022-02-22", "https://www.sec.gov/Archives/edgar/data/813672/000081367222000010/cdns02222022ex9901.htm"),
 F(9, "CFO Commentary del 4T21 (serie de BPA non-GAAP 2018-2021)", "Cadence / SEC", "Primaria", "2022-02-22", "https://www.sec.gov/Archives/edgar/data/813672/000081367222000010/cfocommentary02222022ex9902.htm"),
 F(10, "Cadence Reports Fourth Quarter and Fiscal Year 2023 Financial Results", "Cadence (Business Wire)", "Primaria", "2024-02-12", "https://www.businesswire.com/news/home/20240211761371/en"),
 F(11, "CADENCE DESIGN SYSTEMS INC: cuentas de resultados FY2021-FY2025 (datos XBRL de EDGAR)", "edgar.tools", "Datos de mercado", "2026-02", "https://app.edgar.tools/companies/CDNS"),
 F(12, "Cadence Design Systems Inc (CDNS): beneficio bruto por ejercicio", "Kalkine Media", "Datos de mercado", "2026", "https://kalkinemedia.com/us/companies/nyse-cdns"),
 F(13, "4Q23 8-K schedules (flujos de 2022 y 2023)", "Cadence", "Primaria", "2024-02-12", "https://newstaging.cadence.com/content/dam/cadence-www/global/en_US/documents/company/investors/4q23-8-k-schedules.pdf"),
 F(14, "4Q21 8-K schedules (flujos de 2021)", "Cadence", "Primaria", "2022-02-22", "https://s206.q4cdn.com/597110084/files/doc_news/archive/2022/02/4q21-8-k-schedules.pdf"),
 F(15, "CDNS cash flow (2024-2025: amortizaciones, capex, recompras)", "Finboard", "Datos de mercado", "2026", "https://finboard.net/companies/CDNS/cash-flow"),
 F(16, "Q4 2025 Earnings Tables (balance al 31-dic-2025)", "Cadence", "Primaria", "2026-02-17", "https://s206.q4cdn.com/597110084/files/doc_financials/2025/q4/Q425-Earnings-Tables-for-Web.pdf"),
 F(17, "Annual Report (ARS) FY2024: balances de 2023 y 2024", "Cadence / SEC", "Primaria", "2025-03", "https://www.sec.gov/Archives/edgar/data/813672/000119312525062624/d865678dars.pdf"),
 F(18, "Can Cadence's Cash Generation Support Both Growth and Share Buybacks?", "Zacks", "Prensa", "2026-08", "https://www.zacks.com/stock/news/2982665/can-cadences-cash-generation-support-both-growth-and-share-buybacks"),
 F(19, "Cadence Design Systems Q2 Earnings Call Highlights", "MarketBeat", "Prensa", "2026-07-27", "https://www.marketbeat.com/instant-alerts/cadence-design-systems-q2-earnings-call-highlights-2026-07-27/"),
 F(20, "4Q24 CFO Commentary", "Cadence", "Primaria", "2025-02-18", "https://s206.q4cdn.com/597110084/files/doc_financials/2024/q4/4q24-cfo-commentary.pdf"),
 F(21, "Q3 2025 CFO Commentary (series trimestrales)", "Cadence", "Primaria", "2025-10-27", "https://s206.q4cdn.com/597110084/files/doc_financials/2025/q3/Q3-2025-CFO-Commentary-Final.pdf"),
 F(22, "CFO Commentary del 4T22", "Cadence / SEC", "Primaria", "2023-02-13", "https://www.sec.gov/Archives/edgar/data/813672/000081367223000010/cfocommentary02132023ex9902.htm"),
 F(23, "Cadence Q1 2026: Product & Maintenance y Services, ingresos recurrentes del 77 %", "Nasdaq (Zacks)", "Prensa", "2026-05", "https://www.nasdaq.com/articles/cadence-cdns-174-last-earnings-report-can-it-continue"),
 F(24, "Is CDNS a Buy or a Sell? The Bull and Bear Case (2026): ingresos de China en 2025", "Walnut Invest", "Prensa", "2026-07", "https://walnutinvest.com/stocks/cdns/is-it-a-buy-or-sell"),
 F(25, "CDNS cash flow statement (remuneración en acciones 2024-2025)", "Stock Analysis", "Datos de mercado", "2026", "https://stockanalysis.com/stocks/cdns/financials/cash-flow-statement/"),
]

def cta(p, ing, gp, ebit, da, bn, bpa, acc):
    return {"periodo": p, "ingresos": ing, "coste_ventas": (ing - gp) if gp else None, "gastos_generales": None,
            "ebitda": ebit + da, "amortizaciones": da, "ebit": ebit, "resultado_financiero": None, "bai": None,
            "impuestos": None, "minoritarios": 0, "beneficio_neto": bn, "gastos_financieros": None,
            "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None, "bpa": bpa, "dpa": 0, "dpa_extraordinario": 0,
            "acciones_diluidas": acc}

A = {
 "_estado": "Completo con lagunas (nube: solo WebSearch; cifras de extractos de búsqueda de 8-K, 10-K, 10-Q y proveedores con su URL)",
 "negocio": {
  "descripcion": "Cadence vende el software y la propiedad intelectual con que se diseñan los chips y, cada vez más, los sistemas que los llevan. Tres familias: EDA de núcleo (diseño digital y firma, verificación funcional con los emuladores Palladium y Protium, diseño personalizado y analógico), propiedad intelectual de semiconductores (interfaces, memoria y, desde 2025, la IP Artisan comprada a Arm) y diseño y análisis de sistemas (simulación multifísica, placas y encapsulado; BETA CAE en 2024 y el negocio de diseño e ingeniería de Hexagon, MSC Software, cerrado el 23-feb-2026) [6, 4]. Sus clientes son los fabricantes de semiconductores, los hiperescaladores que diseñan sus propios chips y, con la simulación, la automoción y la aeronáutica. En 2025 facturó 5.297 M USD (+14 %) y cerró el 2T26 con una cartera de pedidos récord de 8.100 M [1, 4].",
  "como_gana_dinero": "Licencias de software en contratos plurianuales (normalmente tres años) que se reconocen casi todas a lo largo del contrato, más ventas de hardware de emulación y de IP que se reconocen al entregar. En el 1T26 el 77 % de los ingresos fue recurrente [23]. El margen depende del apalancamiento: el coste es sobre todo plantilla de I+D, y el margen operativo non-GAAP subió del 42,8 % del 2T25 al 45,5 % del 2T26 [4]. La remuneración en acciones (455 M en 2025, un 8,6 % de las ventas) es el gran ajuste entre las cifras GAAP y las non-GAAP [25]. La estacionalidad viene del hardware y de la IP, que concentran ingresos en trimestres concretos; la cartera (8.100 M, con unos 4.000 M a reconocer en 12 meses al cierre del 1T26) da visibilidad [4, 7].",
  "segmentos": [],
  "geografias": [{"nombre": "China", "peso_pct": 12.8}, {"nombre": "Resto del mundo", "peso_pct": 87.2}],
  "geografias_criterio": "destino",
  "clientes": "Cadence no publica concentración de clientes por encima del 10 % en los extractos consultados. La base es concentrada por naturaleza: los grandes diseñadores de chips (fabricantes de procesadores, de memoria, hiperescaladores con chip propio) firman contratos plurianuales que se renuevan y amplían. La prueba del poder de precios es indirecta: el margen operativo non-GAAP subió del 37 % en 2021 al ~45 % en 2025 con crecimientos del 14-20 % [1, 8], y la cartera de pedidos pasó de 7.800 M a fin de 2025 a 8.100 M en junio de 2026 [1, 4]. China pesó 680 M en 2025 (12,8 % de las ventas, +19 %) y es el riesgo de concentración por país, por los controles de exportación de EE. UU. [24].",
  "kpis": [
   {"kpi": "Cartera de pedidos (backlog)", "valor_anterior": "7.800 M USD (dic-25)", "valor_actual": "8.100 M USD (jun-26)", "variacion": "+4 %", "comentario": "Récord; da visibilidad a 2026-2027 [1, 4]."},
   {"kpi": "Margen operativo non-GAAP", "valor_anterior": "42,8 % (2T25)", "valor_actual": "45,5 % (2T26)", "variacion": "+2,7 puntos", "comentario": "Apalancamiento operativo pese a integrar Hexagon D&E [4]."},
   {"kpi": "Ingresos recurrentes", "valor_anterior": "n. d.", "valor_actual": "77 % (1T26)", "variacion": "n. d.", "comentario": "El resto es hardware de emulación e IP de reconocimiento inmediato [23]."},
   {"kpi": "Flujo de caja operativo", "valor_anterior": "1.729 M USD (2025)", "valor_actual": "≈ 2.000 M USD (guía 2026)", "variacion": "+16 %", "comentario": "Guía elevada en julio [2, 4]."}
  ],
  "confianza": "Media"
 },
 "financieros": {
  "cuenta": [
   cta("2021", 2988, 2681, 779, 142, 696, 2.50, 278.4),
   cta("2022", 3562, 3190, 1074, 132, 849, 3.09, 274.8),
   cta("2023", 4090, 3655, 1251, 145, 1041, 3.82, 272.5),
   cta("2024", 4641, 3994, 1351, 197, 1055, 3.85, 274.0),
   cta("2025", 5297, 4575, 1492, 228, 1109, 4.06, 273.2),
  ],
  "ltm": {"periodo": "LTM jun-26", "fecha_fin": "2026-06-30", "ingresos": 5838, "ebitda": None, "ebit": None, "beneficio_neto": None, "bpa": None, "dpa": 0, "dpa_extraordinario": 0, "fcf": None, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None},
  "cambios_perimetro": [
   {"periodo": "2024", "descripcion": "BETA CAE (simulación estructural), consolidada desde 2024; emisión de 2.500 M de bonos en septiembre."},
   {"periodo": "2026", "descripcion": "Hexagon D&E (MSC Software), consolidada desde el 23-feb-2026: ≈ 2.700 M EUR, un 30 % en acciones (3,2 M de títulos) [6]."}
  ],
  "comentario": "Los ingresos crecieron de 2.988 M en 2021 a 5.297 M en 2025, un 15,4 % anual compuesto, con una parte inorgánica (OpenEye en 2022, BETA CAE en 2024, Secure-IC y la IP Artisan en 2025) que la empresa no separa en los extractos consultados [1, 11]. El margen EBIT GAAP se movió en una banda del 26-30 %; el non-GAAP subió del 37 % de 2021 al 42 % de 2023 y a ~45 % en 2025 [1, 8, 10]. La diferencia (unos 16 puntos en 2025) es la remuneración en acciones (8,6 % de las ventas), la amortización de intangibles comprados y los costes de adquisición e integración. En 2026 la guía es de 6.260-6.340 M de ingresos (+19 % en el punto medio), BPA GAAP de 4,76-4,86 USD y non-GAAP de 8,05-8,15 USD [5]. El 2T26 creció un 24,2 % (1.584 M) con un margen operativo non-GAAP del 45,5 % [4].",
  "ajustes": "Usamos las cifras GAAP en la cuenta. La dirección guía y el mercado valora sobre el BPA non-GAAP, que excluye la remuneración en acciones (455 M en 2025), la amortización de intangibles comprados, los costes de adquisición e integración y sus efectos fiscales: 7,14 USD frente a 4,06 USD GAAP en 2025, y 5,97 frente a 3,85 en 2024 [1, 20]. Esos ajustes se repiten todos los años: la remuneración en acciones es un coste recurrente y en el DCF la tratamos como gasto. El impuesto, el resultado financiero y el BAI no aparecieron en los extractos de búsqueda y quedan sin dato.",
  "confianza": "Media"
 },
 "trimestres": {
  "items": [
   {"periodo": "3T24", "ingresos": 1215, "crecimiento_pct": 18.8, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": 1.64, "vs_consenso": None},
   {"periodo": "4T24", "ingresos": 1356, "crecimiento_pct": 26.9, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": 1.88, "vs_consenso": None},
   {"periodo": "1T25", "ingresos": 1242, "crecimiento_pct": 23.1, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": 1.57, "vs_consenso": None},
   {"periodo": "2T25", "ingresos": 1275, "crecimiento_pct": 20.2, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": 1.65, "vs_consenso": None},
   {"periodo": "3T25", "ingresos": 1339, "crecimiento_pct": 10.2, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": 1.93, "vs_consenso": "Superior"},
   {"periodo": "4T25", "ingresos": 1440, "crecimiento_pct": 6.2, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": 1.99, "vs_consenso": None},
   {"periodo": "1T26", "ingresos": 1474, "crecimiento_pct": 18.7, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": 1.96, "vs_consenso": "Superior"},
   {"periodo": "2T26", "ingresos": 1584, "crecimiento_pct": 24.2, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": 2.11, "vs_consenso": "Superior"}
  ],
  "ultima_presentacion": "BPA non-GAAP de cada trimestre. En la conferencia del 1T26 (27-abr) la dirección subió la guía de ingresos al +17 % pero bajó la de BPA non-GAAP a 7,85-7,95 USD por la dilución de Hexagon D&E (≈ 160 M de ingresos en 2026 y ≈ 0,28 USD menos de BPA) [7, 23]. Tres meses después (27-jul) el discurso cambió de tono: ingresos del 2T26 de 1.584 M (+24,2 %), BPA non-GAAP de 2,11 USD por encima de la guía (2,02-2,08), cartera récord de 8.100 M y guía anual elevada a 6.260-6.340 M de ingresos (+19 %) y 8,05-8,15 USD de BPA, con un flujo operativo de unos 2.000 M [4, 5]. La dirección atribuyó el crecimiento a la demanda de diseño para IA y a sus agentes de IA (ChipStack y otros) [19]. Para el 3T26 guía 1.595-1.625 M y 2,01-2,07 USD de BPA [5]. Las preguntas de los analistas se centraron en la sostenibilidad del hardware de emulación tras un trimestre récord, en China y en la integración de Hexagon; la dirección evitó dar cifras de 2027 [19].",
  "confianza": "Media"
 },
 "balance": {
  "historico": [
   {"periodo": "2021", "activo_total": 4386, "activo_corriente": None, "pasivo_corriente": None, "pasivo_total": 1646, "fondo_comercio": 928, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": None, "deuda_financiera": None, "arrendamientos": 0, "patrimonio_neto": 2741, "minoritarios": 0, "reservas": None},
   {"periodo": "2022", "activo_total": 5137, "activo_corriente": None, "pasivo_corriente": None, "pasivo_total": None, "fondo_comercio": 1374, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": None, "deuda_financiera": None, "arrendamientos": 0, "patrimonio_neto": None, "minoritarios": 0, "reservas": None},
   {"periodo": "2023", "activo_total": 5669, "activo_corriente": None, "pasivo_corriente": 1591, "pasivo_total": 2265, "fondo_comercio": 1536, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 1008, "deuda_financiera": 650, "arrendamientos": 0, "patrimonio_neto": 3404, "minoritarios": 0, "reservas": None},
   {"periodo": "2024", "activo_total": 8974, "activo_corriente": None, "pasivo_corriente": 1370, "pasivo_total": 4301, "fondo_comercio": None, "intangibles": 595, "inmovilizado_material": None, "existencias": None, "clientes": 680, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 2644, "deuda_financiera": 2478, "arrendamientos": 0, "patrimonio_neto": 4674, "minoritarios": 0, "reservas": None},
   {"periodo": "2025", "activo_total": 10153, "activo_corriente": None, "pasivo_corriente": 1635, "pasivo_total": 4679, "fondo_comercio": None, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": 945, "proveedores": None, "activos_contrato": None, "pasivos_contrato": 934, "caja": 3001, "deuda_financiera": 2480, "arrendamientos": 0, "patrimonio_neto": 5474, "minoritarios": 0, "reservas": None}
  ],
  "vencimientos": [{"anio": "2027", "importe": 500}, {"anio": "2029", "importe": 1000}, {"anio": "2034", "importe": 1000}],
  "liquidez": "Caja de 1.440 M USD al 30-jun-2026, tras pagar en efectivo ≈ 70 % de Hexagon D&E (3.001 M a fin de 2025) [6]. Deuda a largo plazo de 2.482 M: bonos de 2027 (500 M), 2029 (1.000 M) y 2034 (1.000 M) [6, 18].",
  "rating": None,
  "coste_deuda_pct": None,
  "vida_media_anios": None,
  "otros_pasivos": "US GAAP: los arrendamientos operativos no van a la deuda. Los ingresos diferidos (778 M corrientes y 156 M a largo plazo a fin de 2025) son el anticipo de los clientes y se compensan con entregas: circulante, no deuda [3]. No aparecieron en la búsqueda covenants, pensiones relevantes ni pagos aplazados de adquisiciones; el 30 % de Hexagon D&E se pagó en acciones (3,2 M de títulos) [6].",
  "comentario": "El balance pasó de caja neta a una ligera deuda neta en 2026 por las compras: la caja cayó de 3.001 M a 1.440 M entre diciembre y junio, con 2.482 M de bonos, una deuda neta de ≈ 1.040 M, menos de 0,5 veces el EBITDA [6, 18]. Los clientes subieron de 680 M a 945 M en 2025 (+39 % frente a ventas +14 %), por la facturación de hardware y de contratos al final del año [16]: es lo que más vigilar del circulante. Los ingresos diferidos (934 M) financian buena parte del capital circulante [3].",
  "confianza": "Media"
 },
 "flujos": {
  "historico": [
   {"periodo": "2021", "flujo_operativo": 1101, "capex": None, "pagos_arrendamientos": 0, "adquisiciones": None, "desinversiones": 0, "dividendos": 0, "recompras": None, "emision_acciones": None, "intereses_en_financiacion": 0},
   {"periodo": "2022", "flujo_operativo": 1242, "capex": None, "pagos_arrendamientos": 0, "adquisiciones": None, "desinversiones": 0, "dividendos": 0, "recompras": None, "emision_acciones": None, "intereses_en_financiacion": 0},
   {"periodo": "2023", "flujo_operativo": 1349, "capex": None, "pagos_arrendamientos": 0, "adquisiciones": None, "desinversiones": 0, "dividendos": 0, "recompras": None, "emision_acciones": None, "intereses_en_financiacion": 0},
   {"periodo": "2024", "flujo_operativo": 1261, "capex": 143, "pagos_arrendamientos": 0, "adquisiciones": None, "desinversiones": 0, "dividendos": 0, "recompras": 550, "emision_acciones": None, "intereses_en_financiacion": 0},
   {"periodo": "2025", "flujo_operativo": 1729, "capex": 142, "pagos_arrendamientos": 0, "adquisiciones": None, "desinversiones": 0, "dividendos": 0, "recompras": 925, "emision_acciones": None, "intereses_en_financiacion": 0}
  ],
  "comentario": "El flujo operativo creció de 1.101 M en 2021 a 1.729 M en 2025 [14, 13, 2]; en 2024 bajó a 1.261 M por el circulante y los impuestos, y en 2025 se recuperó. La conversión del beneficio GAAP es alta (1,56 veces en 2025) porque la remuneración en acciones (455 M) no consume caja: medido con ese coste, el flujo libre de 2025 (≈ 1.587 M) se queda en ≈ 1.130 M [15, 25]. El capex es pequeño (≈ 140 M, un 2,7 % de las ventas en 2025), casi todo de mantenimiento de centros de datos y oficinas [15]. Para 2026 la guía es de unos 2.000 M de flujo operativo y la intención de destinar ≈ 50 % del flujo libre a recompras [5].",
  "confianza": "Media"
 },
 "calidad": {
  "auditor": "KPMG LLP",
  "anios_auditor": None,
  "opinion": "Favorable",
  "comentario": "La calidad del beneficio depende de qué se acepte como recurrente. La remuneración en acciones creció de 210 M en 2021 a 455 M en 2025 (del 7,0 % al 8,6 % de las ventas) [14, 25], y la empresa la excluye de su BPA non-GAAP, que en 2025 fue un 76 % mayor que el GAAP (7,14 frente a 4,06 USD) [1]. Las recompras (925 M en 2025) apenas compensan la dilución: las acciones diluidas medias pasaron de 278,4 M en 2021 a 273,2 M en 2025 [11]. Los clientes crecieron un 39 % en 2025 frente a un 14 % de las ventas, por hardware y facturación de final de año [16]. La parte de hardware de emulación (Palladium/Protium) es más volátil que el software. Sin balances completos de 2021-2022 los indicadores del motor (Altman, Piotroski, Beneish) salen parciales; con lo disponible no hay señales de manipulación.",
  "senales": [
   {"senal": "Remuneración en acciones creciente", "nivel": "Media", "comentario": "8,6 % de las ventas en 2025 y fuera del BPA non-GAAP; la tratamos como coste en el DCF [25]."},
   {"senal": "Clientes +39 % frente a ventas +14 % (2025)", "nivel": "Baja", "comentario": "Facturación de hardware y de contratos al cierre; vigilar los días de cobro en 2026 [16]."},
   {"senal": "Compras seguidas (BETA CAE, Secure-IC, Artisan, Hexagon D&E)", "nivel": "Baja", "comentario": "Complican la lectura del crecimiento orgánico, que la empresa no separa [6]."}
  ],
  "confianza": "Media"
 },
 "capital": {
  "politica": "Sin dividendo. La prioridad declarada es invertir en el crecimiento orgánico y en compras complementarias, y devolver el resto con recompras: la guía de 2026 prevé destinar en torno al 50 % del flujo libre a recompras [5]. En el 2T26 recompró 200 M [4]; en 2025, 925 M, y en 2024, 550 M [15, 18].",
  "adquisiciones": [
   {"anio": "2024", "objetivo": "BETA CAE Systems (simulación estructural)", "importe": None, "ev_ebitda": None, "financiacion": "Caja y acciones", "resultado": "Integrada en diseño y análisis de sistemas; sin deterioros conocidos."},
   {"anio": "2025", "objetivo": "IP Artisan de Arm y Secure-IC", "importe": None, "ev_ebitda": None, "financiacion": "Caja", "resultado": "Amplía la cartera de IP; cifras no publicadas en los extractos."},
   {"anio": "2026", "objetivo": "Hexagon Design & Engineering (MSC Software)", "importe": 3019, "ev_ebitda": None, "financiacion": "≈ 70 % caja y 30 % acciones (3,2 M títulos)", "resultado": "Cerrada el 23-feb-2026; ≈ 160 M de ingresos en 2026 y dilutiva en ≈ 0,28 USD de BPA el primer año [6, 23]."}
  ],
  "comentario": "La dirección asigna el capital con disciplina en lo orgánico (capex del 2,7 % de las ventas, márgenes al alza) y con más riesgo en las compras: Hexagon D&E costó ≈ 2.700 M EUR (≈ 3.019 M USD al cambio de 1,1181) por un negocio de unos 190 M USD de ingresos anuales, unas 16 veces ventas (estimación propia: 160 M en diez meses de 2026, anualizados) [6, 23]. Las recompras apenas neutralizan la dilución de la remuneración en acciones: en cinco años las acciones diluidas solo bajan un 1,9 % [11].",
  "confianza": "Media"
 },
 "fuentes": fa,
 "huecos": [
  {"seccion": "financieros", "campo": "impuestos, resultado financiero y BAI de 2021-2025", "tipo": "Complemento", "intentos": "1) 10-K FY2025 vía búsqueda (solo totales de ingresos, EBIT y beneficio); 2) edgar.tools y Kalkine (sin la línea de impuestos); 3) 8-K del 4T23 (solo impuestos diferidos)", "decision": "Omitido"},
  {"seccion": "balance", "campo": "caja y deuda de 2021-2022, activo y pasivo corriente, fondo de comercio de 2024-2025, rating y coste de la deuda", "tipo": "Complemento", "intentos": "1) 10-K y ARS en sec.gov (sin red, solo extractos); 2) Q4 earnings tables (solo clientes y totales); 3) Fintel y Tickerleague (periodos posteriores)", "decision": "Omitido"},
  {"seccion": "flujos", "campo": "capex, recompras y adquisiciones de 2021-2023", "tipo": "Complemento", "intentos": "1) 8-K del 4T21 y 4T23 (solo flujo operativo, amortizaciones y acciones); 2) Finboard y Stock Analysis (2024-2025); 3) Zacks (recompras 2024)", "decision": "Omitido"},
  {"seccion": "negocio", "campo": "ingresos por familia de producto (EDA, IP, sistemas) y por región salvo China", "tipo": "Complemento", "intentos": "1) CFO Commentary del 1T26 y 2T26 (extractos sin desglose); 2) prensa de resultados (solo producto y servicios); 3) Walnut Invest (solo China)", "decision": "Omitido"}
 ]
}
w('A', A)

# ---------------- B. Sector ----------------
fb = [
 F(1, "ESD Alliance Reports Electronic System Design Industry Posts $5.5 Billion in Revenue in Q4 2025", "SEMI / ESD Alliance", "Sectorial", "2026-04", "https://www.semi.org/en/semi-press-release/esd-alliance-reports-electronic-system-design-industry-posts-5.5-billion-dollars-in-revenue-in-q4-2025"),
 F(2, "ESD Alliance reports EDA market reaches $5.6bn in Q3 2025", "eeNews Europe", "Sectorial", "2026-01", "https://www.eenewseurope.com/en/esd-alliance-reports-eda-market-reaches-5-6bn-in-q3-2025/"),
 F(3, "ESD Alliance: Electronic System Design Industry Posts $5.1 Billion in Revenue in Q1 2025", "CIMdata", "Sectorial", "2025-07", "https://www.cimdata.com/en/industry-summary-articles/item/28053-esd-alliance-reports-electronic-system-design-industry-posts-5-1-billion-in-revenue-in-q1-2025"),
 F(4, "Cadence completes acquisition of Hexagon's Design and Engineering business", "Evertiq", "Prensa", "2026-02-24", "https://evertiq.com/news/2026-02-24-cadence-completes-acquisition-of-hexagons-de-business"),
 F(5, "Cadence Stock Fell 9% in a Day on a Chinese AI Chip Demo", "TIKR", "Prensa", "2026", "https://www.tikr.com/blog/cadence-stock-fell-9-in-a-day-on-a-chinese-ai-chip-demo-heres-where-the-stock-could-go-in-2026"),
 F(6, "Synopsys (SNPS) stock falls 7% as guidance underwhelms", "TipRanks", "Prensa", "2026", "https://www.tipranks.com/news/synopsys-snps-stock-falls-7-as-guidance-underwhelms"),
 F(7, "Cadence Down 16% in the Past 6 Months: How to Play the Stock?", "Nasdaq (Zacks)", "Prensa", "2026", "https://www.nasdaq.com/articles/cadence-down-16-past-6-months-how-play-stock"),
 F(8, "Cadence Reports Second Quarter 2026 Financial Results (8-K)", "Cadence / SEC", "Primaria", "2026-07-27", "https://www.sec.gov/Archives/edgar/data/0000813672/000081367226000089/cdns07272026ex9901.htm"),
 F(9, "Is CDNS a Buy or a Sell? The Bull and Bear Case (2026)", "Walnut Invest", "Prensa", "2026-07", "https://walnutinvest.com/stocks/cdns/is-it-a-buy-or-sell"),
 F(10, "Cadence completes acquisition of Hexagon's D&E business (comunicado)", "Cadence (Nasdaq)", "Primaria", "2026-02-23", "https://www.nasdaq.com/press-release/cadence-completes-acquisition-hexagons-design-and-engineering-business-advancing"),
]
B = {
 "_estado": "Completo con cobertura media (nube: solo WebSearch)",
 "historia": {
  "resumen": "Cadence nació en 1988 de la fusión de SDA Systems y ECAD, dos pioneros del diseño electrónico asistido por ordenador. En los años noventa y dos mil creció comprando (Cooper & Chyan, Verisity, entre otras) y sufrió en 2008-09 pérdidas y un cambio de dirección. Lip-Bu Tan, primer ejecutivo de 2009 a 2021, la reorientó al crecimiento orgánico, la propiedad intelectual y el «diseño de sistemas», y multiplicó el margen operativo. Anirudh Devgan, su sucesor desde diciembre de 2021, ha acelerado la expansión hacia la simulación multifísica con compras (Future Facilities, OpenEye, BETA CAE, Hexagon D&E) y hacia la IA aplicada al diseño de chips [10, 4].",
  "hitos": [
   {"anio": "1988", "hito": "Fusión de SDA Systems y ECAD: nace Cadence."},
   {"anio": "2009", "hito": "Lip-Bu Tan, primer ejecutivo: giro hacia margen, IP y sistemas."},
   {"anio": "2021", "hito": "Anirudh Devgan sucede a Tan como primer ejecutivo."},
   {"anio": "2022", "hito": "Compra de OpenEye (simulación molecular) por unos 500 M USD."},
   {"anio": "2024", "hito": "Compra de BETA CAE y emisión de 2.500 M USD en bonos."},
   {"anio": "2025", "hito": "Compra de la IP Artisan de Arm y de Secure-IC; acuerdo para comprar Hexagon D&E (≈ 2.700 M EUR) [4]."},
   {"anio": "2026", "hito": "Cierre de Hexagon D&E (23-feb) y cartera récord de 8.100 M USD (jun) [10, 8]."}
  ],
  "confianza": "Media"
 },
 "sector": {
  "definicion": "El mercado relevante es el del diseño de sistemas electrónicos tal como lo mide la ESD Alliance de SEMI: herramientas de diseño de chips (EDA), propiedad intelectual de semiconductores, ingeniería asistida (CAE), diseño de placas y servicios, en todo el mundo. Es el perímetro donde compiten Cadence, Synopsys y Siemens EDA. Usamos la serie de la ESD Alliance porque es la única que suma los ingresos declarados por las empresas; los informes de consultoras de pago no estaban disponibles [1, 2, 3].",
  "tamano": "≈ 21.200 M USD en 2025 (suma propia de los cuatro trimestres publicados por la ESD Alliance) [1, 2, 3]",
  "unidad_serie": "millones de USD",
  "serie": [{"anio": "2025", "tamano": 21220}],
  "tcac_historico_pct": None,
  "tcac_previsto_pct": 9.0,
  "cr5_pct": None,
  "estructura": "Concentrada",
  "drivers": [
   {"driver": "Chips para IA y centros de datos", "efecto": "+", "horizonte": "Estructural", "evidencia": "Cadence atribuye a la IA el crecimiento del 24,2 % del 2T26 y una cartera récord de 8.100 M [8]."},
   {"driver": "Hiperescaladores que diseñan su propio chip", "efecto": "+", "horizonte": "Estructural", "evidencia": "Amplían la base de clientes más allá de los fabricantes tradicionales [9]."},
   {"driver": "Propiedad intelectual de semiconductores", "efecto": "+", "horizonte": "Estructural", "evidencia": "Fue la categoría que más creció en el 4T25: +18,3 %, hasta 2.083 M [1]."},
   {"driver": "Simulación multifísica y gemelos digitales", "efecto": "+", "horizonte": "Estructural", "evidencia": "CAE creció un 9,4 % en el 4T25 (1.887 M) [1]; Synopsys compró Ansys y Cadence, Hexagon D&E [4]."},
   {"driver": "Controles de exportación a China", "efecto": "−", "horizonte": "Cíclico", "evidencia": "China pesa ≈ 13 % de las ventas de Cadence; Synopsys bajó su guía citando tensiones entre EE. UU. y China [6, 9]."}
  ],
  "porter": [
   {"fuerza": "Rivalidad", "intensidad": 2, "justificacion": "Duopolio de hecho con Synopsys, más Siemens EDA; compiten en funcionalidad y no en precio."},
   {"fuerza": "Poder de los clientes", "intensidad": 3, "justificacion": "Clientes grandes y concentrados que negocian contratos plurianuales, pero sin alternativa fácil."},
   {"fuerza": "Poder de los proveedores", "intensidad": 1, "justificacion": "El insumo es talento de ingeniería; no hay proveedores críticos."},
   {"fuerza": "Amenaza de entrada", "intensidad": 2, "justificacion": "Décadas de I+D y certificación con las fundiciones; los nuevos (IA, rivales chinos) entran por nichos [5]."},
   {"fuerza": "Amenaza de sustitutos", "intensidad": 2, "justificacion": "La IA generativa puede abaratar partes del flujo de diseño; hoy la usan los propios incumbentes [5]."}
  ],
  "ciclo": {"posicion": "Expansión", "comentario": "La ESD Alliance mostró crecimientos del 8,6-12,8 % en cada trimestre de 2025 [1, 2, 3], y Cadence crece un 19 % en 2026 según su guía [8]. El EDA es poco cíclico porque las licencias son plurianuales: en 2008-09 Cadence sufrió por un cambio de modelo de licencias, no por la demanda; en 2020 y 2022 siguió creciendo a dos dígitos mientras los semiconductores corregían. Lo cíclico es el hardware de emulación y la parte de China."},
  "regulacion": "La norma que más pesa son los controles de exportación de EE. UU. a China, que en 2025 llegaron a exigir licencias para vender EDA a clientes chinos y se relajaron después; Synopsys bajó su guía en 2026 citando esas tensiones [6, 9]. No hay regulación sectorial de precios. La compra de Hexagon D&E necesitó autorizaciones de competencia y se cerró sin remedios conocidos [4].",
  "tendencias": "Tres tendencias: los chips para IA (más transistores, encapsulado 3D y chiplets) multiplican el trabajo de diseño y verificación; los diseñadores incorporan agentes de IA, que Cadence vende (ChipStack y otros) y que pueden cambiar cómo se cobra; y la convergencia del diseño electrónico con la simulación mecánica y térmica, donde Synopsys (con Ansys) y Cadence (con BETA CAE y MSC) compiten ahora con Siemens y Dassault [4, 5]. Una demostración de diseño de chips con IA de código abierto de un laboratorio chino tumbó la acción un 9 % en un día: el mercado teme por el poder de precios [5].",
  "confianza": "Media"
 },
 "competencia": {
  "cuota_pct": 25.0,
  "posicion": "2.º proveedor mundial de diseño de sistemas electrónicos, tras Synopsys; ≈ 25 % del mercado de la ESD Alliance en 2025 (estimación propia: 5.297 M sobre ≈ 21.200 M)",
  "competidores": [
   {"nombre": "Synopsys", "pais": "EE. UU.", "ticker": "SNPS", "ingresos": 7054, "cuota_pct": None, "margen_ebit_pct": 13.0, "comentario": "Líder del EDA y, tras comprar Ansys (2025), de la simulación; ejercicio a octubre de 2025 con 7.054 M de ingresos y un margen GAAP deprimido por la compra. Guía de 2026 de 9.630-9.710 M [6]."},
   {"nombre": "Siemens EDA (Siemens AG)", "pais": "Alemania", "ticker": None, "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Antigua Mentor Graphics; fuerte en verificación física y placas. No publica cifras separadas."},
   {"nombre": "Dassault Systèmes (SIMULIA)", "pais": "Francia", "ticker": "DSY", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Rival en simulación tras la entrada de Cadence en CAE con BETA CAE y MSC."},
   {"nombre": "Empresas chinas de EDA (Empyrean y otras)", "pais": "China", "ticker": None, "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Ganan cuota en su mercado interior con apoyo público y por los controles de exportación [5, 9]."}
  ],
  "foso": {
   "veredicto": "Amplio",
   "tendencia": "Estable",
   "fuentes": [
    {"fuente": "Efectos de red", "puntuacion": 3, "evidencia": "Las fundiciones certifican sus procesos con las herramientas de Cadence y Synopsys; los ingenieros se forman en ellas."},
    {"fuente": "Costes de cambio", "puntuacion": 5, "evidencia": "Flujos de diseño de años y equipos formados; contratos plurianuales que se renuevan; cartera de 8.100 M [8]."},
    {"fuente": "Intangibles (marca, patentes, licencias)", "puntuacion": 4, "evidencia": "Décadas de I+D acumulada y catálogo de IP certificada."},
    {"fuente": "Ventaja en costes", "puntuacion": 2, "evidencia": "No compite en precio; el margen viene de la escala del software."},
    {"fuente": "Escala eficiente", "puntuacion": 4, "evidencia": "Un mercado de ≈ 21.000 M repartido entre tres grandes; un cuarto entrante no tendría escala [1]."}
   ]
  },
  "amenazas": "Tres amenazas. La IA generativa podría abaratar el diseño y presionar el precio por licencia, o al revés, aumentar el uso; la caída del 9 % por una demostración china muestra que el mercado lo teme [5]. China puede sustituir a los proveedores estadounidenses en su mercado (≈ 13 % de las ventas) [9]. Y Synopsys-Ansys ofrece un paquete integrado de diseño y simulación que obliga a Cadence a comprar caro para no quedarse atrás. Probabilidad de erosión del foso en cinco años: baja; de presión sobre el precio en China: media.",
  "confianza": "Media"
 },
 "esg": {
  "calificaciones": [],
  "materialidad": "Para una empresa de software los asuntos ESG que mueven las cifras son el talento (la plantilla de I+D es el coste principal y la remuneración en acciones pesa un 8,6 % de las ventas) y el cumplimiento de los controles de exportación, que puede costar multas y ventas en China [9]. Las emisiones directas son pequeñas.",
  "controversias": "No hemos encontrado en las búsquedas sanciones ni litigios materiales de los últimos tres años. La exposición a China por controles de exportación es el punto a vigilar.",
  "confianza": "Baja"
 },
 "fuentes": fb,
 "huecos": [
  {"seccion": "sector", "campo": "serie histórica del mercado y CR5", "tipo": "Complemento", "intentos": "1) ESD Alliance (solo trimestres de 2025 en los extractos); 2) prensa sectorial (eeNews, CIMdata); 3) informes de consultoras (de pago)", "decision": "Omitido"},
  {"seccion": "esg", "campo": "calificaciones MSCI y Sustainalytics", "tipo": "Complemento", "intentos": "1) informe de sostenibilidad (sin red); 2) búsqueda de calificaciones (sin resultado); 3) proveedores (de pago)", "decision": "Omitido"}
 ]
}
w('B', B)

# ---------------- C. Gobierno ----------------
fc = [
 F(1, "Cadence 2026 Annual Meeting: DEFA14A (propuestas de la junta de 2026)", "Boardroom Alpha / SEC", "Primaria", "2026-03-25", "https://www.boardroomalpha.com/sec/cdns-defa14a-2026-03-25-0001193125-26-124270"),
 F(2, "Proxy Statement 2025 (DEF 14A)", "Cadence / SEC", "Primaria", "2025-03", "https://www.sec.gov/Archives/edgar/data/813672/000119312525062605/d877390ddef14a.htm"),
 F(3, "Cadence Design Systems: perfil y remuneración de directivos", "Yahoo Finance", "Datos de mercado", "2026", "https://finance.yahoo.com/quote/CDNS/profile/"),
 F(4, "Cadence Reports Fourth Quarter and Fiscal Year 2025 Financial Results (guía 2026)", "Cadence (Business Wire)", "Primaria", "2026-02-17", "https://www.businesswire.com/news/home/20260216202086/en"),
 F(5, "Cadence Reports Second Quarter 2026 Financial Results (8-K)", "Cadence / SEC", "Primaria", "2026-07-27", "https://www.sec.gov/Archives/edgar/data/0000813672/000081367226000089/cdns07272026ex9901.htm"),
 F(6, "Cadence Reports First Quarter 2026 Financial Results", "Cadence (Business Wire)", "Primaria", "2026-04-27", "https://www.businesswire.com/news/home/20260426710019/en/Cadence-Reports-First-Quarter-2026-Financial-Results"),
 F(7, "CFO Commentary Q2 2025 (guía 2025 elevada)", "Cadence", "Primaria", "2025-07-28", "https://s206.q4cdn.com/597110084/files/doc_financials/2025/q2/CFO-Commentary-Q2-2025-Final-Updated.pdf"),
 F(8, "CADENCE DESIGN SYS INC (CDNS) Stock Ownership", "Chartmill", "Datos de mercado", "2026-07", "https://www.chartmill.com/stock/quote/CDNS/ownership"),
]
C = {
 "_estado": "Parcial (nube: solo WebSearch; el proxy de 2026 y el Form 4 no se pudieron leer)",
 "directivos": {
  "equipo": [
   {"nombre": "Anirudh Devgan", "cargo": "Presidente ejecutivo de la compañía (President) y primer ejecutivo", "desde": "2021", "participacion_pct": None, "trayectoria": "Ingeniero de IBM y Magma; en Cadence desde 2012 al frente del negocio digital y de verificación, presidente desde 2017 y primer ejecutivo desde diciembre de 2021. Con él los ingresos pasaron de 2.988 M (2021) a 5.297 M (2025) y el margen operativo non-GAAP del 37 % al ~45 % [4]. En 2025 ejerció opciones por 28,8 M USD [3]."},
   {"nombre": "John Wall", "cargo": "Director financiero", "desde": "2017", "participacion_pct": None, "trayectoria": "En Cadence desde 1997; director financiero desde 2017. Firma la guía, que en los últimos años se ha cumplido o superado [4, 5]."}
  ],
  "historial_guidance": [
   {"anio": "2024", "guia": "BPA non-GAAP inicial de 2024 (feb-24) y ajustes posteriores", "real": "5,97 USD de BPA non-GAAP [4]", "cumplida": "Parcial"},
   {"anio": "2025", "guia": "BPA non-GAAP de 6,85-6,95 USD (jul-25) [7]", "real": "7,14 USD [4]", "cumplida": "Sí"},
   {"anio": "2026", "guia": "Ingresos de 5.900-6.000 M y BPA non-GAAP de 8,05-8,15 USD (feb-26), sin Hexagon [4]", "real": "Guía de jul-26: 6.260-6.340 M y 8,05-8,15 USD con Hexagon [5]", "cumplida": "Sí"}
  ],
  "comentario": "La dirección es estable: Devgan lleva cinco años como primer ejecutivo tras una sucesión anunciada, y Wall nueve como director financiero. La guía suele ser prudente y se supera: 2025 terminó en 7,14 USD de BPA non-GAAP frente a 6,85-6,95 de la guía de julio [4, 7], y en 2026 la empresa absorbió la dilución de Hexagon (≈ 0,28 USD) y aun así volvió al rango inicial de BPA [5, 6]. No hemos encontrado un plan de sucesión público.",
  "confianza": "Media"
 },
 "gobierno": {
  "consejo": [],
  "presidente_ceo_separados": True,
  "presidente_ejecutivo": False,
  "consejero_coordinador": None,
  "una_accion_un_voto": True,
  "operaciones_vinculadas_relevantes": False,
  "variable_ligado_rentabilidad": None,
  "auditoria_independiente": True,
  "insiders_sin_operaciones": False,
  "accionista_control": False,
  "presidente_vinculado_control": False,
  "cambios_cupula_24m": 0,
  "voto_remuneracion_pct": 90.0,
  "voto_remuneracion_contra_pct": None,
  "voto_remuneracion_contra_libre_pct": None,
  "voto_cupula_pct": None,
  "remuneracion_ceo": None,
  "remuneracion": "La remuneración se vota cada dos años: en la junta de 2024 la aprobó cerca del 90 % de los votos emitidos, y la media de los cinco años anteriores fue del 91 % [2]. En 2026 la junta votó de nuevo la remuneración (propuesta 3) y una ampliación del plan de acciones (Omnibus Equity Incentive Plan), que sostiene una remuneración en acciones del 8,6 % de las ventas [1]. No hemos podido leer el proxy de 2026: las métricas del variable (habitualmente ingresos, margen operativo non-GAAP y rentabilidad relativa para el accionista) y la cifra total del primer ejecutivo quedan sin verificar.",
  "accionistas": [
   {"nombre": "Hexagon AB", "pct": 1.17, "tipo": "Industrial (pago en acciones de la venta de D&E)", "variacion": "Entra en feb-2026 con 3,2 M de acciones (estimación propia del porcentaje sobre ≈ 273 M)"}
  ],
  "insiders": [],
  "control_y_defensas": "Sin accionista de control: el capital está en manos de fondos institucionales y una sola clase de acciones con un voto por acción. No hemos encontrado operaciones vinculadas relevantes ni blindajes más allá de los habituales en Delaware. Hexagon recibió un 1,2 % del capital en el pago de D&E [1].",
  "alertas": ["Ninguna relevante detectada en los extractos de búsqueda; el proxy de 2026, el registro de Form 4 y el resultado de la junta de 2026 no se pudieron leer."],
  "confianza": "Baja"
 },
 "fuentes": fc,
 "huecos": [
  {"seccion": "gobierno", "campo": "composición del consejo (once consejeros propuestos en 2026, sin detalle), presidente, remuneración del primer ejecutivo y votos de 2026", "tipo": "Núcleo", "intentos": "1) DEF 14A de 2026 en sec.gov (sin red); 2) búsqueda del resultado de la junta de 2026 (sin resultado); 3) Yahoo Finance (solo paga sin acciones)", "decision": "Omitido; sección con lo verificado y confianza baja"},
  {"seccion": "gobierno", "campo": "operaciones de directivos de 12 meses (Form 4)", "tipo": "Complemento", "intentos": "1) form4.mjs (sin red); 2) Chartmill (hasta jul-26, sin detalle legible); 3) MarketBeat (sin detalle)", "decision": "Omitido"},
  {"seccion": "gobierno", "campo": "accionistas significativos (13G)", "tipo": "Complemento", "intentos": "1) 13G en sec.gov (sin red); 2) Chartmill; 3) búsqueda de prensa", "decision": "Omitido"}
 ]
}
w('C', C)

# ---------------- D. Mercado ----------------
fd = [
 F(1, "Cadence Design Systems (CDNS): 352,84 USD al cierre del 9-oct-2026, rango de 52 semanas 262,75-416,69", "Syfe", "Datos de mercado", "2026-10-09", "https://www.syfe.com/stocks/us/cdns"),
 F(2, "CDNS summary: 352,60 USD el 2-oct-2026", "MarketChameleon", "Datos de mercado", "2026-10-02", "https://marketchameleon.com/Overview/CDNS/Summary/"),
 F(3, "CDNS stock info: 351,35 USD (4-oct-2026), ≈ +12 % en el año", "Trade Ideas", "Datos de mercado", "2026-10-04", "https://www.trade-ideas.com/stock-info/CDNS/"),
 F(4, "Cadence Design Systems - Stock Price History (cierres anuales)", "Macrotrends", "Datos de mercado", "2025", "https://macrotrends.net/stocks/charts/CDNS/cadence-design-systems/stock-price-history"),
 F(5, "Cadence Design Systems price target raised to $420.00 (consenso de 18 analistas)", "MarketBeat", "Analistas", "2026-07-28", "https://www.marketbeat.com/instant-alerts/cadence-design-systems-nasdaqcdns-price-target-raised-to-42000-2026-07-28/"),
 F(6, "Piper Sandler raises Cadence price target to $349.00", "MarketBeat", "Analistas", "2026-07-28", "https://www.marketbeat.com/instant-alerts/piper-sandler-raises-cadence-design-systems-nasdaqcdns-price-target-to-34900-2026-07-28/"),
 F(7, "Cadence Q2 earnings top estimates, 2026 revenue outlook raised (consenso de BPA 2026)", "Zacks", "Analistas", "2026-07-28", "https://www.zacks.com/stock/news/2962234/cadence-q2-earnings-top-estimates-2026-revenue-outlook-raised"),
 F(8, "Cadence Design Systems (CDNS) Stock Forecast (BPA estimado 2026-2028)", "Tickflow", "Analistas", "2026-07-31", "https://tickflow.io/stock/CDNS/forecast"),
 F(9, "Cadence Design Systems US1273871087 forecast (BPA 2028e)", "Stocksguide", "Analistas", "2026", "https://stocksguide.com/en/forecast/Cadence-Design-Systems-US1273871087"),
 F(10, "Q2 2026 CFO Commentary (guía de 2026 y del 3T26)", "Cadence", "Primaria", "2026-07-27", "https://s206.q4cdn.com/597110084/files/doc_financials/2026/q2/Q2-2026-CFO-Commentary-FINAL.pdf"),
 F(11, "CFO Commentary del 4T21 (BPA non-GAAP de 2018-2021)", "Cadence / SEC", "Primaria", "2022-02-22", "https://www.sec.gov/Archives/edgar/data/813672/000081367222000010/cfocommentary02222022ex9902.htm"),
 F(12, "Cadence Reports Fourth Quarter and Fiscal Year 2023 Financial Results (BPA non-GAAP 2022-2023)", "Cadence (Business Wire)", "Primaria", "2024-02-12", "https://www.businesswire.com/news/home/20240211761371/en"),
 F(13, "Cadence Reports Fourth Quarter and Fiscal Year 2025 Financial Results (BPA non-GAAP 2025)", "Cadence (Business Wire)", "Primaria", "2026-02-17", "https://www.businesswire.com/news/home/20260216202086/en"),
 F(14, "US Treasury yields, 13-oct-2026 (bono a 10 años 5,22 %)", "CNBC", "Datos de mercado", "2026-10-13", "https://www.cnbc.com/2026/10/13/us-treasurys-bonds-yields.html"),
 F(15, "Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %", "A. Damodaran, NYU Stern", "Datos de mercado", "2026-10", "https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx"),
 F(16, "Comparables de software de diseño (PTC, Autodesk, Synopsys, Bentley, Nemetschek, Dassault): estadísticas y consenso recogidos el 6/10-oct-2026", "Stock Analysis / MarketScreener", "Datos de mercado", "2026-10-07", "https://stockanalysis.com/stocks/ptc/statistics/"),
 F(17, "Synopsys: PER adelantado (forward P/E 22,5-24)", "Stockunlock / Simply Wall St", "Datos de mercado", "2026-08", "https://stockunlock.com/stockDetails/SNPS/general"),
 F(18, "Tipos de cambio de referencia del euro (12-oct-2026: 1,1181 USD/EUR)", "Banco Central Europeo", "Datos de mercado", "2026-10-12", "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist.zip"),
#F(19, "Synopsys to acquire Ansys (≈ 35.000 M USD)", "Synopsys / SEC", "Primaria", "2024-01-16", "https://news.synopsys.com/2024-01-16-Synopsys-to-Acquire-Ansys,-Creating-a-Leader-in-Silicon-to-Systems-Design-Solutions"),
#F(20, "Siemens to acquire Altair Engineering (10.600 M USD)", "Siemens", "Primaria", "2024-10-30", "https://press.siemens.com/global/en/pressrelease/siemens-strengthens-leadership-industrial-software-and-ai-acquisition-altair-engineering"),
 F(21, "Cadence completes acquisition of Hexagon's D&E business (≈ 2.700 M EUR)", "Evertiq", "Prensa", "2026-02-24", "https://evertiq.com/news/2026-02-24-cadence-completes-acquisition-of-hexagons-de-business"),
 F(22, "Earnings date: resultados del 3T26 el 26-oct-2026", "Earnings Whispers", "Datos de mercado", "2026-10", "https://beta.earningswhispers.com/go/w/CDNS"),
 F(23, "Cadence Design Systems: 282,90 USD el 18-sep-2026", "MarketBeat", "Datos de mercado", "2026-09-18", "https://www.marketbeat.com/stocks/NASDAQ/CDNS/chart/"),
]
def comp(n, t, p, cap, evv, el, en, per, g, m, roic, dn, fcf):
    return {"nombre": n, "ticker": t, "pais": p, "capitalizacion": cap, "ev_ventas": evv, "ev_ebitda_ltm": el, "ev_ebitda_ntm": en, "per_ntm": per, "crecimiento_pct": g, "margen_ebitda_pct": m, "roic_pct": roic, "dn_ebitda": dn, "fcf_yield_pct": fcf}
fx = 1.1181
Dn = {
 "_estado": "Completo con lagunas (nube: solo WebSearch; precio del 9-oct-2026, sin bolsa.mjs)",
 "identificacion": {
  "nombre": "Cadence Design Systems, Inc.", "nombre_corto": "Cadence", "ticker": "CDNS", "isin": "US1273871087", "mercado": "Nasdaq Global Select", "indice_referencia": "S&P 500 / Nasdaq-100",
  "pais": "Estados Unidos", "pais_iso": "US", "sector": "Tecnologías de la información", "industria": "Software de aplicación", "sede": "San José (California)", "fundacion": "1988", "empleados": None, "web": "https://www.cadence.com",
  "precio": 352.84, "fecha_precio": "2026-10-09", "acciones": 276.0, "capitalizacion_publicada": None, "free_float_pct": None,
  "max_52s": 416.69, "min_52s": 262.75, "volumen_medio_diario": None, "proximos_resultados": "2026-10-26"
 },
 "consenso": {
  "guidance": "Guía de 2026 elevada el 27-jul-2026: ingresos de 6.260-6.340 M (+19 % en el punto medio, con Hexagon D&E), BPA GAAP de 4,76-4,86 USD, BPA non-GAAP de 8,05-8,15 USD y flujo operativo de unos 2.000 M; para el 3T26, ingresos de 1.595-1.625 M y BPA non-GAAP de 2,01-2,07 USD [10]. La guía de febrero (5.900-6.000 M, sin Hexagon) y la de abril (6.125-6.225 M; BPA non-GAAP rebajado a 7,85-7,95 por la dilución) se han superado. No hay plan a medio plazo publicado con cifras.",
  "estimaciones": [
   {"periodo": "2026e", "ingresos": 6300, "ebitda": None, "ebit": None, "bpa": 8.12, "dpa": 0, "fuente": "Guía de la empresa (ingresos) y media de analistas (BPA non-GAAP) [10, 8]"},
   {"periodo": "2027e", "ingresos": None, "ebitda": None, "ebit": None, "bpa": 9.40, "dpa": 0, "fuente": "Suma de las medias trimestrales de 2027 (≈ 9,0-9,4 USD) [8]"},
   {"periodo": "2028e", "ingresos": None, "ebitda": None, "ebit": None, "bpa": 11.19, "dpa": 0, "fuente": "Stocksguide [9]"}
  ],
  "recomendaciones": {"n_analistas": 18, "comprar": 15, "mantener": 3, "vender": 0, "po_medio": 401.44, "po_min": 349.0, "po_max": None},
  "revisiones": "Tras el 2T26 los objetivos subieron: Bank of America, Rosenblatt, Baird y Citigroup a 420 USD; Piper Sandler, en Neutral, a 349 USD [5, 6]. El consenso de BPA de 2026 que publicaba Zacks antes de la guía nueva (7,94 USD) ha subido hacia los 8,1 USD [7, 8]. No hemos encontrado revisiones de octubre. Las estimaciones son todas non-GAAP (sin remuneración en acciones ni amortización de intangibles), de una sola fuente gratuita para 2027 y 2028: confianza baja en el contraste.",
  "base_ebitda": "ajustado",
  "ajuste_ebitda_pct_ventas": None,
  "confianza": "Baja"
 },
 "bolsa": None,
 "multiplos_historicos": {
  "serie": [
   {"anio": "2021", "precio_cierre": 186.35, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": True},
   {"anio": "2022", "precio_cierre": 160.64, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2023", "precio_cierre": 272.37, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2024", "precio_cierre": 300.46, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2025", "precio_cierre": 313.6, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False}
  ],
  "comentario": "Cierres anuales de Macrotrends [4]; el de 2025 es una estimación propia (351,35 USD el 4-oct-2026 con una subida en el año de ≈ 12 % [3]). Sobre el BPA non-GAAP de cada año, el PER de cierre fue de 23,3 veces en 2018, 31,5 en 2019, 48,7 en 2020, 56,6 en 2021, 37,6 en 2022, 52,9 en 2023, 50,3 en 2024 y ≈ 43,9 en 2025 [11, 12, 13]. Excluimos 2020 y 2021 por la burbuja del software. Hoy cotiza a 43,5 veces el BPA non-GAAP guiado para 2026 (8,10 USD): en la parte baja de su banda de 2022-2025 (37,6-52,9) pese a crecer más rápido que entonces.",
  "confianza": "Media"
 },
 "comparables": {
  "criterio": "Seis cotizadas de software de diseño e ingeniería: Synopsys, el único par directo en EDA (y en simulación tras comprar Ansys); Autodesk, PTC y Dassault (diseño mecánico, PLM y simulación, donde Cadence entra con BETA CAE y MSC); Bentley y Nemetschek (ingeniería y construcción). Fuera: Siemens (conglomerado), Ansys y Altair (compradas) y Arm (licencias de IP con otro modelo). PER en base ajustada (non-GAAP), la misma que nuestro BPA; las demás cifras de los datos de comparables recogidos el 6-10 de octubre, con la capitalización en USD a 1,1181 USD/EUR [16, 17, 18].",
  "empresas": [
   comp("Synopsys", "SNPS", "US", round(86052*fx), 11.42, 28.9, 22.7, 24.0, 17.1, 22.04, 2.23, 3.48, 2.84),
   comp("Autodesk", "ADSK", "US", 49188, 6.23, 21.6, 16.6, 25.1, 12.4, 28.8, 58.5, -0.29, 5.8),
   comp("PTC", "PTC", "US", round(18798*fx), 8.16, 16.7, 15.5, 29.1, 4.9, 43.19, 19.74, 0.98, 4.47),
   comp("Dassault Systèmes", "DSY", "FR", round(28794*fx), 4.39, 12.4, 11.2, 20.7, 7.4, 35.1, 13.8, -0.7, 5.7),
   comp("Bentley Systems", "BSY", "US", round(9698*fx), 7.48, 21.0, 17.6, 28.1, 11.2, 29.19, 13.6, 2.39, 4.52),
   comp("Nemetschek", "NEM", "DE", round(7480*fx), 5.87, 18.9, 14.4, 25.9, 20.0, 28.16, 21.85, 0.42, 4.82)
  ],
  "comentario": None,
  "confianza": "Media"
 },
 "transacciones": None,
 "fuentes": fd,
 "huecos": [
  {"seccion": "bolsa", "campo": "rentabilidades, beta, volatilidad, caída máxima y posición corta", "tipo": "Complemento", "intentos": "1) bolsa.mjs (sin red); 2) búsqueda de históricos (solo cierres sueltos); 3) Macrotrends (cierres anuales hasta 2024)", "decision": "Omitido"},
  {"seccion": "identificacion", "campo": "precio del 13-oct-2026", "tipo": "Núcleo", "intentos": "1) búsqueda del cierre del 13-oct (sin resultado); 2) Syfe (cierre del 9-oct, 352,84 USD); 3) MarketChameleon y Trade Ideas (352,60 y 351,35 USD el 2 y 4-oct)", "decision": "Calculado y marcado como estimación: cierre del 9-oct"},
  {"seccion": "consenso", "campo": "ingresos y EBITDA de 2027-2028 y objetivo máximo", "tipo": "Complemento", "intentos": "1) MarketScreener (no abre); 2) Zacks y Benzinga (solo 2026); 3) Tickflow y Stocksguide (solo BPA)", "decision": "Omitido"},
  {"seccion": "transacciones", "campo": "sección entera (operaciones con múltiplo publicado)", "tipo": "Complemento", "intentos": "1) comunicados de Synopsys-Ansys y Siemens-Altair (sin red para leerlos); 2) prensa (Evertiq: Hexagon D&E sin ingresos publicados); 3) informe anual de Hexagon (sin red)", "decision": "Omitido"}
 ]
}
w('D', Dn)

# ---------------- E. Sentimiento ----------------
fe = [
 F(1, "Cadence Stock Fell 9% in a Day on a Chinese AI Chip Demo. Here's Where the Stock Could Go in 2026", "TIKR", "Foros y redes", "2026", "https://www.tikr.com/blog/cadence-stock-fell-9-in-a-day-on-a-chinese-ai-chip-demo-heres-where-the-stock-could-go-in-2026"),
 F(2, "CDNS vs WDAY: sentimiento de Stocktwits y menciones en Reddit (5-sep-2026)", "AltIndex", "Foros y redes", "2026-09-05", "https://altindex.com/stock-comparison/cdns-vs-wday"),
 F(3, "Cadence Design Systems (CDNS) Sentiment (noticias, Reddit, YouTube, X y Substack)", "SentiSense", "Foros y redes", "2026-08-09", "https://app.sentisense.ai/stocks/CDNS/sentiment"),
 F(4, "Is CDNS a Buy or a Sell? The Bull and Bear Case (2026)", "Walnut Invest", "Foros y redes", "2026-07", "https://walnutinvest.com/stocks/cdns/is-it-a-buy-or-sell"),
 F(5, "CDNS Falls 12.9% in the Past Month. Is the Sell-Off an Opportunity?", "Nasdaq (Zacks)", "Foros y redes", "2026-09", "https://www.nasdaq.com/articles/cdns-falls-129-past-month-sell-opportunity"),
 F(6, "Why Cadence stock is sliding today (29-sep-2026)", "Wealth Awesome", "Foros y redes", "2026-09-29", "https://wealthawesome.com/why-cadence-stock-is-sliding-today-09292026"),
 F(7, "Cadence Design Systems Falls as Higher Yields Pressure Tech and EDA Names", "Quiver Quantitative", "Foros y redes", "2026-09", "https://www.quiverquant.com/news/Cadence+Design+Systems+Falls+as+Higher+Yields+Pressure+Tech+and+EDA+Names"),
]
E = {
 "_estado": "Completo con cobertura baja (nube: solo WebSearch; Reddit y Stocktwits solo a través de agregadores)",
 "sentimiento": {
  "tono": "Dividido",
  "tendencia": "Mejora",
  "revisadas": [
   {"plataforma": "AltIndex (Stocktwits y Reddit agregados)", "fecha": "2026-09", "n_comentarios": None, "tono": "Negativo", "resumen": "A principios de septiembre la relación entre mensajes alcistas y bajistas en Stocktwits había caído un 11,8 % en el mes, mientras las menciones en Reddit casi se duplicaban (+92 %): mucho ruido con la acción en mínimos de varios meses [2]."},
   {"plataforma": "SentiSense (noticias, Reddit, X, YouTube y Substack)", "fecha": "2026-08", "n_comentarios": 600, "tono": "Neutro", "resumen": "Unas 20 menciones al día; tono neutro tras los resultados del 2T26, con la conversación repartida entre la IA como motor y la valoración [3]."},
   {"plataforma": "TIKR y Walnut Invest (análisis para particulares)", "fecha": "2026-07", "n_comentarios": 10, "tono": "Dividido", "resumen": "La tesis alcista es la IA y el récord de emulación; la bajista, el múltiplo, China y el miedo a que la IA abarate el diseño de chips tras la demostración de un laboratorio chino que tumbó la acción un 9 % [1, 4]."},
   {"plataforma": "Prensa con comentarios (Zacks/Nasdaq, Wealth Awesome, Quiver)", "fecha": "2026-09", "n_comentarios": 15, "tono": "Negativo", "resumen": "En septiembre la caída se atribuye a la subida de los tipos y a la rotación fuera del software de crecimiento, no a la empresa; se pregunta si es una oportunidad [5, 6, 7]."}
  ],
  "temas": [
   {"tema": "La IA como sustituto del EDA (demostración china de diseño con IA)", "postura": "Bajista", "peso": "Alto", "contraste": "Los datos no lo muestran todavía: ingresos del 2T26 +24,2 % y cartera récord de 8.100 M del informe. Es un riesgo de precio a largo plazo que recogemos en el bajista."},
   {"tema": "Valoración y tipos de interés", "postura": "Bajista", "peso": "Alto", "contraste": "Cierto en parte: con el bono a 10 años al 5,22 % el DCF con la remuneración en acciones como coste queda muy por debajo del precio; el PER non-GAAP (43,5 veces 2026e) está en la parte baja de su historia."},
   {"tema": "China y controles de exportación", "postura": "Bajista", "peso": "Medio", "contraste": "China es un 12,8 % de las ventas y creció un 19 % en 2025; un endurecimiento recortaría el crecimiento unos 2-3 puntos un año."},
   {"tema": "IA y emulación: ciclo de diseño de chips", "postura": "Alcista", "peso": "Medio", "contraste": "Respaldado: guía de 2026 elevada al +19 % y margen operativo non-GAAP del 45,5 % en el 2T26."}
  ],
  "lectura": "El sentimiento de los particulares está dividido y venía empeorando hasta finales de septiembre, cuando la acción tocó ≈ 283 USD; el rebote de octubre (≈ 353 USD) antes de los resultados del 26-oct sugiere que mejora. No es euforia ni capitulación. El riesgo que más se repite, que la IA abarate el diseño de chips, no aparece en las cifras de la empresa pero sí en el múltiplo: es la razón por la que el mercado paga hoy menos que en 2023-2024. Va en contra del consenso de analistas (15 de 18 en comprar). No cambia la valoración; recuerda que una mala lectura sobre la IA puede mover la acción un 9 % en un día.",
  "confianza": "Baja"
 },
 "fuentes": fe,
 "huecos": [
  {"seccion": "sentimiento", "campo": "hilos de Reddit, Stocktwits y Seeking Alpha de los últimos tres meses", "tipo": "Complemento", "intentos": "1) búsqueda de hilos de Reddit (ninguno); 2) Stocktwits y Seeking Alpha (no aparecen); 3) agregadores AltIndex y SentiSense y prensa con comentarios", "decision": "Omitido; sección con agregadores y confianza baja"}
 ]
}
w('E', E)
print('ok')

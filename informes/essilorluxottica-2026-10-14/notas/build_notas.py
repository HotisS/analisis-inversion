# Genera las notas A-E de EssilorLuxottica (corte 2026-10-14). Entorno nube: solo WebSearch.
# Todas las cifras salen de extractos de búsqueda (URL citada) o de informes del repo de 9-14 oct (comparables y transacciones).
import json, os
D = os.path.dirname(os.path.abspath(__file__))

def save(letra, obj):
    with open(os.path.join(D, letra + '.json'), 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)

def F(i, titulo, editor, tipo, fecha, url):
    return {"id": i, "titulo": titulo, "editor": editor, "tipo": tipo, "fecha": fecha, "url": url}

# ---------------------------------------------------------------- A. Cuentas
FA = [
 F(1, "Q4/FY 2025 Results – Press Release", "EssilorLuxottica", "Primaria", "2026-02-11", "https://www.essilorluxottica.com/cap/content/283060"),
 F(2, "EssilorLuxottica Q4/FY 2025 results (copia del comunicado)", "BioSpace / EssilorLuxottica", "Primaria", "2026-02-11", "https://www.biospace.com/press-releases/essilorluxottica-q4-fy-2025-results-revenue-growing-18-4-in-q4-and-11-2-in-the-fy-adj-operating-margin-at-16-0-in-the-fy"),
 F(3, "Q2/H1 2026 results: solid revenue trajectory at 9.7% in H1 (comunicado)", "EssilorLuxottica (MFN)", "Primaria", "2026-07-28", "https://mfn.se/one/a/essilorluxottica/essilorluxottica-q2-h1-2026-results-solid-revenue-trajectory-at-9-7-in-h1-with-q2-at-8-7-increasing-profitability-with-adj-operating-profit-15-a067ffa3.iframe"),
 F(4, "EssilorLuxottica (EL) H1 2026 earnings summary", "Quartr", "Datos de mercado", "2026-07-29", "https://quartr.com/events/essilorluxottica-soci-t-anonyme-el-h1-2026_ofYbaHZW"),
 F(5, "EssilorLuxottica (EPA:EL) Income Statement", "Stock Analysis", "Datos de mercado", "2026-07-24", "https://stockanalysis.com/quote/epa/EL/financials/income-statement/"),
 F(6, "EssilorLuxottica (EPA:EL) Cash Flow Statement", "Stock Analysis", "Datos de mercado", "2026-07-24", "https://stockanalysis.com/quote/epa/EL/financials/cash-flow-statement/"),
 F(7, "EssilorLuxottica (EPA:EL) Balance Sheet", "Stock Analysis", "Datos de mercado", "2026-07-24", "https://stockanalysis.com/quote/epa/EL/financials/balance-sheet/"),
 F(8, "EssilorLuxottica Société anonyme – Balance Sheet (Annual, Capital IQ)", "Fintel", "Datos de mercado", "2026-07", "https://fintel.io/bs/fr/el"),
 F(9, "EssilorLuxottica (ESLOF) Financials", "Yahoo Finance", "Datos de mercado", "2026-07", "https://finance.yahoo.com/quote/ESLOF/financials/"),
 F(10, "EssilorLuxottica (OTC ESLOF) – estados financieros", "Kalkine", "Datos de mercado", "2026", "https://kalkine.com.au/company/otc-eslof/"),
 F(11, "Interim Financial Report 2025", "EssilorLuxottica", "Primaria", "2025-07-28", "https://www.essilorluxottica.com/api/getCapContent/?id=259816&download=false"),
 F(12, "Q2/H1 2023 results (comunicado depositado en la AMF)", "EssilorLuxottica", "Primaria", "2023-07-25", "https://echanges.dila.gouv.fr/OPENDATA/AMF/MKW/2023/07/FCMKW111493_20230725.pdf"),
 F(13, "EssilorLuxottica publish Q4 & full year 2023 financial results", "BoardSport Source", "Prensa", "2024-02-14", "https://www.boardsportsource.com/essilorluxottica-publish-q4-full-year-2023-financial-results/"),
 F(14, "EssilorLuxottica: sound sales growth and margin expansion in 2024", "BoardSport Source", "Prensa", "2025-02-12", "https://www.boardsportsource.com/essilorluxottica-sound-sales-growth-and-margin-expansion-in-2024-with-smart-glasses-a-new-driver/"),
 F(15, "EssilorLuxottica FY25 profit down, revenues rise; sees growth ahead", "FashionUnited", "Prensa", "2026-02-12", "https://fashionunited.uk/news/business/essilorluxottica-fy25-profit-down-revenues-rise-sees-growth-ahead/2026021286245"),
 F(16, "Q2/H1 2025 Results – Press Release", "EssilorLuxottica", "Primaria", "2025-07-28", "https://www.essilorluxottica.com/cap/content/259500"),
 F(17, "Q3/9M 2025 Revenue – Press Release", "EssilorLuxottica", "Primaria", "2025-10-23", "https://www.essilorluxottica.com/cap/content/262766"),
 F(18, "AI Smart Glasses and Myopia Management Portfolio Drive Q2 and First Half Revenue Growth", "Vision Monday", "Prensa", "2026-07-28", "https://www.visionmonday.com/eyecare/article/ai-smart-glasses-and-myopia-management-portfolio-drive-q2-and-first-half-revenue-growth-for-essilorluxottica/"),
 F(19, "EssilorLuxottica and the price of reinventing eyewear", "MarketScreener", "Prensa", "2026", "https://uk.marketscreener.com/news/essilorluxottica-and-the-price-of-reinventing-eyewear-ce7e51dcde8df722"),
 F(20, "EssilorLuxottica Q1 revenues up 10.8 percent", "FashionUnited", "Prensa", "2026-04-23", "https://fashionunited.uk/news/business/essilorluxottica-q1-revenues-up-10-8-percent/2026042387640"),
 F(21, "EssilorLuxottica slips as doubts linger over smart glasses growth (Reuters)", "Investing.com", "Prensa", "2026-04-23", "https://www.investing.com/news/stock-market-news/essilorluxottica-slips-as-doubts-linger-over-smart-glasses-growth-4631576"),
 F(22, "Essilorluxottica (ESLOF) Full Year 2025 Earnings Call Highlights", "Yahoo Finance", "Prensa", "2026-02-12", "https://finance.yahoo.com/news/essilorluxottica-eslof-full-2025-earnings-010534221.html"),
 F(23, "EssilorLuxottica completa l'acquisizione di Supreme per 1,5 miliardi e dell'80% di Heidelberg", "Milano Finanza", "Prensa", "2024-10-02", "https://www.milanofinanza.it/fashion/essilorluxottica-completa-l-acquisizione-di-supreme-per-1-5-miliardi-e-dell-80-di-heidelberg-202410021207237518"),
 F(24, "EssilorLuxottica: Financial Data, Forecasts (dividendos por acción)", "MarketScreener", "Datos de mercado", "2026-09", "https://uk.marketscreener.com/quote/stock/ESSILORLUXOTTICA-50911031/finances/"),
 F(25, "Moodie Davitt: EssilorLuxottica delivers strong first-half growth", "The Moodie Davitt Report", "Prensa", "2026-07-28", "https://moodiedavittreport.com/essilorluxottica-delivers-strong-first-half-growth-amid-challenging-market-conditions/"),
]

cuenta = [
 {"periodo": "2021", "ingresos": 19820, "coste_ventas": None, "gastos_generales": None, "ebitda": 4768, "amortizaciones": 2461, "ebit": 2307, "resultado_financiero": -130, "bai": 2177, "impuestos": 587, "minoritarios": 142, "beneficio_neto": 1448, "gastos_financieros": 130, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None, "bpa": 3.25, "dpa": 2.51, "dpa_extraordinario": 0, "acciones_diluidas": 445.5},
 {"periodo": "2022", "ingresos": 24494, "coste_ventas": None, "gastos_generales": None, "ebitda": 6078, "amortizaciones": 2921, "ebit": 3157, "resultado_financiero": -125, "bai": 3032, "impuestos": 751, "minoritarios": 129, "beneficio_neto": 2152, "gastos_financieros": 148, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None, "bpa": 4.83, "dpa": 3.23, "dpa_extraordinario": 0, "acciones_diluidas": 445.6},
 {"periodo": "2023", "ingresos": 25395, "coste_ventas": None, "gastos_generales": None, "ebitda": 6176, "amortizaciones": 3000, "ebit": 3176, "resultado_financiero": -140, "bai": 3036, "impuestos": 609, "minoritarios": 138, "beneficio_neto": 2289, "gastos_financieros": 140, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None, "bpa": 5.08, "dpa": 3.95, "dpa_extraordinario": 0, "acciones_diluidas": 450.6},
 {"periodo": "2024", "ingresos": 26508, "coste_ventas": 9703, "gastos_generales": None, "ebitda": 6545, "amortizaciones": 3097, "ebit": 3448, "resultado_financiero": -157, "bai": 3291, "impuestos": 800, "minoritarios": 132, "beneficio_neto": 2359, "gastos_financieros": 184, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None, "bpa": 5.13, "dpa": 3.95, "dpa_extraordinario": 0, "acciones_diluidas": 459.8},
 {"periodo": "2025", "ingresos": 28491, "coste_ventas": 11237, "gastos_generales": None, "ebitda": 6529, "amortizaciones": 3150, "ebit": 3379, "resultado_financiero": -184, "bai": 3195, "impuestos": 752, "minoritarios": 128, "beneficio_neto": 2315, "gastos_financieros": 264, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None, "bpa": 4.98, "dpa": 4.00, "dpa_extraordinario": 0, "acciones_diluidas": 464.9},
]

balance_hist = [
 {"periodo": "2021", "activo_total": None, "activo_corriente": None, "pasivo_corriente": None, "pasivo_total": 23540, "fondo_comercio": None, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": None, "deuda_financiera": None, "arrendamientos": None, "patrimonio_neto": None, "minoritarios": None, "reservas": None},
 {"periodo": "2022", "activo_total": None, "activo_corriente": None, "pasivo_corriente": None, "pasivo_total": 22414, "fondo_comercio": None, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": None, "deuda_financiera": None, "arrendamientos": None, "patrimonio_neto": None, "minoritarios": None, "reservas": None},
 {"periodo": "2023", "activo_total": None, "activo_corriente": None, "pasivo_corriente": None, "pasivo_total": 21631, "fondo_comercio": None, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": None, "deuda_financiera": None, "arrendamientos": None, "patrimonio_neto": None, "minoritarios": None, "reservas": None},
 {"periodo": "2024", "activo_total": None, "activo_corriente": None, "pasivo_corriente": None, "pasivo_total": 23277, "fondo_comercio": 32100, "intangibles": 11000, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 2251, "deuda_financiera": None, "arrendamientos": None, "patrimonio_neto": None, "minoritarios": None, "reservas": None},
 {"periodo": "2025", "activo_total": 63895, "activo_corriente": None, "pasivo_corriente": None, "pasivo_total": 24402, "fondo_comercio": 31013, "intangibles": 9753, "inmovilizado_material": None, "existencias": 3542, "clientes": 3765, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 3544, "deuda_financiera": 10844, "arrendamientos": None, "patrimonio_neto": 39493, "minoritarios": None, "reservas": None},
]

flujos_hist = [
 {"periodo": "2021", "flujo_operativo": 4545, "capex": 1030, "pagos_arrendamientos": None, "adquisiciones": 7078, "desinversiones": 0, "dividendos": None, "recompras": None, "emision_acciones": 0, "intereses_en_financiacion": 0},
 {"periodo": "2022", "flujo_operativo": 4783, "capex": 1572, "pagos_arrendamientos": None, "adquisiciones": 965, "desinversiones": 0, "dividendos": None, "recompras": None, "emision_acciones": 0, "intereses_en_financiacion": 0},
 {"periodo": "2023", "flujo_operativo": 4861, "capex": 1531, "pagos_arrendamientos": 930, "adquisiciones": 114, "desinversiones": 0, "dividendos": None, "recompras": None, "emision_acciones": 0, "intereses_en_financiacion": 0},
 {"periodo": "2024", "flujo_operativo": 4874, "capex": 1522, "pagos_arrendamientos": 952, "adquisiciones": 1755, "desinversiones": 0, "dividendos": None, "recompras": None, "emision_acciones": 0, "intereses_en_financiacion": 0},
 {"periodo": "2025", "flujo_operativo": 5291, "capex": 1525, "pagos_arrendamientos": 966, "adquisiciones": 911, "desinversiones": 0, "dividendos": None, "recompras": None, "emision_acciones": 0, "intereses_en_financiacion": 0},
]

A = {
 "_estado": "Completa con huecos (entorno nube: solo WebSearch). 14-oct-2026.",
 "negocio": {
  "descripcion": "EssilorLuxottica diseña, fabrica y distribuye lentes oftálmicas (Varilux, Transitions, Stellest), monturas y gafas de sol (Ray-Ban, Oakley, licencias de lujo) y equipos de diagnóstico, y los vende a ópticas independientes y cadenas (Professional Solutions, 13.600 M EUR en 2025) y al público en sus propias tiendas y webs (Direct to Consumer, 14.891 M EUR: Sunglass Hut, LensCrafters, GrandVision, Supreme) [1]. Desde 2023 suma una tercera palanca: las gafas con inteligencia artificial que fabrica con Meta (Ray-Ban Meta, Oakley Meta), que vendieron unos 7 millones de pares en 2025 [21]. Norteamérica es el 45 % de las ventas [1].",
  "como_gana_dinero": "El grueso del beneficio sale de las lentes graduadas: un producto médico de reposición (cada 2-3 años), con marca y tecnología propias y un margen bruto del 61 % para el grupo en 2025 (ajustado) [1, 2]. Las monturas y gafas de sol aportan marca y volumen; las tiendas propias capturan el margen minorista. El margen operativo ajustado fue del 16,0 % a tipo constante en 2025, 70 puntos básicos menos que en 2024 por los aranceles de EE. UU. (unos 300 M EUR) y por la mezcla de gafas inteligentes, de menor margen [1, 21]; en el primer semestre de 2026 subió al 18,6 % (18,9 % a tipo constante) [3]. La amortización del precio de la fusión de 2018 y de GrandVision (no caja) explica la diferencia entre el beneficio publicado (2.315 M EUR) y el ajustado (3.157 M EUR) [1].",
  "segmentos": [
   {"nombre": "Professional Solutions", "descripcion": "Venta a ópticas, cadenas y distribuidores: lentes, monturas, equipos.", "tipo_resultado": None, "historico": [{"periodo": "2024", "ingresos": 12547, "resultado": None}, {"periodo": "2025", "ingresos": 13600, "resultado": None}]},
   {"nombre": "Direct to Consumer", "descripcion": "Tiendas propias y comercio electrónico (Sunglass Hut, LensCrafters, GrandVision, Supreme).", "tipo_resultado": None, "historico": [{"periodo": "2024", "ingresos": 13960, "resultado": None}, {"periodo": "2025", "ingresos": 14891, "resultado": None}]},
  ],
  "geografias": [{"nombre": "Norteamérica", "peso_pct": 44.9}, {"nombre": "EMEA", "peso_pct": 38.5}, {"nombre": "Asia-Pacífico", "peso_pct": 11.4}, {"nombre": "Latinoamérica", "peso_pct": 5.2}],
  "geografias_criterio": "destino",
  "clientes": "Base muy atomizada: cientos de miles de ópticas independientes y cadenas en Professional Solutions y consumidores finales en Direct to Consumer; ningún cliente relevante en las cuentas [1]. El poder de precios se ve en la mezcla: el crecimiento a tipo constante del 11,2 % en 2025 combinó volumen (gafas con IA, control de miopía, que creció un 24 % en el 2T26) con precio y mezcla en lentes de gama alta [1, 18]. El riesgo de cliente está en el canal: Meta es socio y a la vez accionista (al menos un 3 % del capital) y sus decisiones de lanzamiento mueven las ventas de gafas inteligentes [21].",
  "kpis": [
   {"kpi": "Crecimiento a tipo constante", "valor_anterior": "+6,0 % (2024)", "valor_actual": "+11,2 % (2025); +9,7 % (1S26)", "variacion": "Acelera", "comentario": "Primer año con crecimiento de dos dígitos [1, 3]."},
   {"kpi": "Margen operativo ajustado", "valor_anterior": "16,7 % (2024, tipo constante)", "valor_actual": "16,0 % (2025); 18,6 % (1S26)", "variacion": "−70 pb y recuperación", "comentario": "Aranceles y mezcla de gafas con IA [1, 3]."},
   {"kpi": "Gafas con IA (unidades)", "valor_anterior": "n. d.", "valor_actual": "≈7 millones de pares (2025)", "variacion": "Casi se duplicaron en el 2T26", "comentario": "Socio Meta [3, 21]."},
   {"kpi": "Flujo de caja libre", "valor_anterior": "2.400 M EUR (2024)", "valor_actual": "2.800 M EUR (2025); 1.070 M EUR (1S26)", "variacion": "+400 M", "comentario": "Récord [1, 4]."},
   {"kpi": "Control de miopía (Stellest)", "valor_anterior": "n. d.", "valor_actual": "+24 % en el 2T26", "variacion": "Acelera", "comentario": "[18]"},
  ],
  "confianza": "Media",
 },
 "financieros": {
  "cuenta": cuenta,
  "ltm": {"periodo": "2025", "fecha_fin": "2025-12-31", "ingresos": 28491, "ebitda": 6529, "ebit": 3379, "beneficio_neto": 2315, "bpa": 4.98, "dpa": 4.00, "dpa_extraordinario": 0, "fcf": 2800, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None},
  "cambios_perimetro": [{"periodo": "2021", "descripcion": "GrandVision, consolidada desde julio de 2021 (adquisiciones de 7.078 M EUR en el año)"}, {"periodo": "2024", "descripcion": "Supreme (≈1.500 M USD) y el 80 % de Heidelberg Engineering, consolidadas desde el 4T24"}],
  "comentario": "Las ventas pasaron de 19.820 M EUR en 2021 a 28.491 M en 2025 (TCAC del 9,5 %), con dos saltos inorgánicos: GrandVision en 2021 (+37 % ese año) y Supreme y Heidelberg en el 4T24 [5, 23]. Sin compras, el grupo crece al 6-11 % a tipo constante (6,0 % en 2024, 11,2 % en 2025, 9,7 % en el 1S26) [1, 3, 14]. El margen EBIT publicado sube del 11,6 % en 2021 al 13,0 % en 2024 y cae al 11,9 % en 2025 por los aranceles de EE. UU. (≈300 M EUR) y la mezcla de gafas con IA [5, 21]. El beneficio neto atribuido se estanca en 2.289-2.359 M EUR desde 2023 [5]. Las amortizaciones de 2023 y 2025 son estimación propia: la de 2024 sale del EBITDA de los 12 meses a junio de 2025 (6.648 M) y de los semestres publicados [11]; la de 2025 duplica la del 1S25 (1.556 M), y la de 2023 interpola entre 2022 y 2024.",
  "ajustes": "La empresa publica cifras «ajustadas» que excluyen sobre todo la amortización de los intangibles reconocidos en la fusión Essilor-Luxottica (2018) y en las compras posteriores, además de costes de integración y otros no recurrentes. El beneficio neto ajustado fue de 3.157 M EUR en 2025 (3.122 M en 2024; 2.946 M en 2023, según el comunicado de 2023) frente a 2.315 M publicados, una diferencia de 842 M EUR (1,81 EUR por acción) [1, 13, 14]. En 2022, el margen neto ajustado fue del 11,7 % de las ventas [13]. Usamos el BPA publicado en las cuentas y el ajustado para el objetivo a 12 meses, porque es el que mira el mercado.",
  "confianza": "Media",
 },
 "trimestres": {
  "items": [
   {"periodo": "1T25", "ingresos": 6849, "crecimiento_pct": None, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": None},
   {"periodo": "2T25", "ingresos": 7175, "crecimiento_pct": None, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": None},
   {"periodo": "3T25", "ingresos": 6867, "crecimiento_pct": None, "crecimiento_organico_pct": 11.7, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": "Superior"},
   {"periodo": "4T25", "ingresos": 7600, "crecimiento_pct": None, "crecimiento_organico_pct": 18.4, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": "Superior"},
   {"periodo": "1T26", "ingresos": 7126, "crecimiento_pct": 4.0, "crecimiento_organico_pct": 10.8, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": "En línea"},
   {"periodo": "2T26", "ingresos": 7692, "crecimiento_pct": 7.2, "crecimiento_organico_pct": 8.7, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": "En línea"},
  ],
  "ultima_presentacion": "En febrero, con las cuentas de 2025, la dirección presentó el primer año de crecimiento de dos dígitos a tipo constante (11,2 %, con un 4T de +18,4 %) y sustituyó los objetivos a 2026 por una guía a cinco años: «crecimiento sólido» de las ventas y del beneficio operativo ajustado «ampliamente alineado» a tipo constante [1, 15]. En abril (1T26, +10,8 %) el mensaje cambió de tono: las gafas con IA crecieron solo a un dígito medio frente al 18 % del final de 2025, y el director financiero cifró en 300 M EUR el coste de los aranceles de 2025 [20, 21]. Las preguntas se repitieron sobre la desaceleración de las gafas inteligentes, su margen y la competencia de Google, Samsung y Apple; el consejero delegado dijo que no había visto productos rivales reales en el mercado [21]. En julio (1S26: +9,7 %, margen operativo ajustado del 18,6 %, +80 pb) la dirección avisó de una base de comparación más dura en el segundo semestre [3, 4]; los analistas leyeron después que había rebajado las expectativas de ventas de 2026.",
  "confianza": "Media",
 },
 "balance": {
  "historico": balance_hist,
  "vencimientos": [],
  "liquidez": "Caja de 3.544 M EUR a cierre de 2025 [7]; deuda neta de 13.390 M EUR a 30-jun-2026 incluidos arrendamientos, 2,0 veces el EBITDA de 12 meses [4].",
  "rating": None, "coste_deuda_pct": None, "vida_media_anios": None,
  "otros_pasivos": "No hemos podido leer las notas del informe anual (entorno sin acceso a la web de la empresa). La deuda neta sin arrendamientos ronda 7.300 M EUR según MarketScreener [19]; con arrendamientos, 13.390 M EUR a junio de 2026 [4]. La deuda financiera bruta de 2025 (10.844 M) es estimación propia: deuda neta sin arrendamientos más caja. Los minoritarios (128 M EUR de resultado en 2025) vienen de filiales no participadas al 100 % [5].",
  "comentario": "El activo está dominado por el fondo de comercio (31.013 M EUR) y los intangibles (9.753 M), herencia de la fusión de 2018 y de GrandVision: el 64 % del activo total [7]. La deuda neta con arrendamientos subió de 10.250 M EUR a finales de 2022 a 13.390 M en junio de 2026, por Supreme y Heidelberg (2024) y por el pago del dividendo [4, 12]; aun así, la ratio sobre EBITDA es de 2,0 veces [4].",
  "confianza": "Baja",
 },
 "flujos": {
  "historico": flujos_hist,
  "comentario": "El flujo operativo crece de 4.545 M EUR en 2021 a 5.291 M en 2025 y el capex se estabiliza en unos 1.525 M (5,4 % de las ventas) [6]. La empresa calcula el flujo de caja libre restando también los pagos de arrendamientos: 2.400 M en 2023 y 2024, y un récord de 2.800 M en 2025; 1.070 M en el 1S26, más de 100 M por encima del 1S25 [1, 3, 13, 14]. Los pagos de arrendamientos de 2023-2025 (930-966 M) son estimación propia: flujo operativo menos capex menos el flujo libre publicado. Los dividendos se pagan en parte en acciones (opción de dividendo en acciones a 175,06 EUR en 2026), por lo que la caja que sale es menor que el dividendo bruto. Las compras suman 10.823 M EUR en cinco años, dos tercios en 2021 (GrandVision) [6].",
  "confianza": "Media",
 },
 "calidad": {
  "auditor": None, "anios_auditor": None, "opinion": "Favorable (cuentas de 2025 auditadas; informe en emisión a 11-feb-2026)",
  "comentario": "Las cuentas de 2025 estaban auditadas al publicar los resultados [1]. La calidad del beneficio depende de la lectura de los ajustes: el beneficio ajustado supera al publicado en 842 M EUR (36 %), sobre todo por la amortización de intangibles de la fusión, que no es caja; eso es razonable, pero el mercado y los analistas valoran sobre la cifra ajustada y la diferencia no se reduce deprisa [1]. El flujo de caja libre (2.800 M) es un 21 % mayor que el beneficio publicado y un 11 % menor que el ajustado, lo que da credibilidad a la cifra ajustada [1]. El motor no puede calcular bien Altman, Piotroski ni Beneish con el balance incompleto que tenemos: no los interpretamos.",
  "senales": [
   {"senal": "Fondo de comercio e intangibles = 64 % del activo", "nivel": "Media", "comentario": "Un deterioro (GrandVision, Supreme) no afectaría a la caja pero sí al beneficio publicado [7]."},
   {"senal": "Diferencia persistente entre beneficio ajustado y publicado (≈840 M EUR)", "nivel": "Baja", "comentario": "Es amortización de intangibles de compras; el FCF la respalda [1]."},
  ],
  "confianza": "Baja",
 },
 "capital": {
  "politica": "Dividendo de 4,00 EUR por acción con cargo a 2025 (3,95 EUR en 2023 y 2024), con opción de cobro en acciones, lo que diluye ligeramente el capital (de 445,5 a 464,9 millones de acciones diluidas entre 2021 y 2025) [1, 5, 24]. La prioridad declarada es crecer: compras de complemento (Supreme, Heidelberg, cadenas en EE. UU. y Europa), inversión en gafas inteligentes y tecnología médica, y mantener la deuda neta en torno a 2 veces el EBITDA [1, 4].",
  "adquisiciones": [
   {"anio": "2021", "objetivo": "GrandVision (cadena óptica europea)", "importe": 7078, "ev_ebitda": None, "financiacion": "Caja y deuda", "resultado": "Integrada; el canal propio crece al 6,7 % (2025) [1, 6]."},
   {"anio": "2024", "objetivo": "Supreme (marca de ropa)", "importe": 1330, "ev_ebitda": None, "financiacion": "Caja (1.500 M USD)", "resultado": "Diversificación lejos del núcleo; sin cifras propias publicadas [23]."},
   {"anio": "2024", "objetivo": "Heidelberg Engineering (80 %, diagnóstico oftálmico)", "importe": 350, "ev_ebitda": None, "financiacion": "Caja", "resultado": "Base del negocio de tecnología médica [23]."},
  ],
  "comentario": "La dirección ha usado el balance sobre todo para comprar: 10.823 M EUR en cinco años, frente a un dividendo que sube despacio y sin recompras relevantes [6]. El rendimiento de ese capital es bajo: el ROIC publicado (≈5 %) está por debajo del coste del capital, porque el capital invertido incluye 40.766 M EUR de fondo de comercio e intangibles [7]. Con el beneficio ajustado el ROIC ronda el 8 %, apenas por encima del WACC. Supreme, una marca de ropa, es la compra más difícil de justificar por negocio. La dilución del dividendo en acciones (+4 % de acciones en cinco años) resta al BPA.",
  "confianza": "Media",
 },
 "fuentes": FA,
 "huecos": [
  {"seccion": "balance", "campo": "Balance completo 2021-2024 (activo corriente, proveedores, deuda bruta, arrendamientos, patrimonio)", "tipo": "Núcleo", "intentos": "1) Informe anual y comunicados en essilorluxottica.com: WebFetch y curl bloqueados; 2) Stock Analysis y Fintel por búsqueda: solo pasivo total y algunas partidas de 2024-2025; 3) Yahoo y Kalkine: sin balance", "decision": "Omitido"},
  {"seccion": "balance", "campo": "Calendario de vencimientos, rating, coste y vida media de la deuda", "tipo": "Complemento", "intentos": "1) Nota de deuda del informe anual: sin acceso; 2) búsqueda de rating y folletos: sin resultado; 3) prensa: sin resultado", "decision": "Omitido"},
  {"seccion": "flujos", "campo": "Dividendos y recompras pagados en caja", "tipo": "Complemento", "intentos": "1) Estado de flujos: sin acceso; 2) Stock Analysis por búsqueda: no los da; 3) MarketScreener: solo dividendo por acción", "decision": "Omitido"},
  {"seccion": "trimestres", "campo": "EBITDA y BPA trimestral", "tipo": "Complemento", "intentos": "1) Comunicados: solo ventas trimestrales; 2) Quartr: solo semestre; 3) prensa: sin cifras", "decision": "Omitido"},
  {"seccion": "calidad", "campo": "Auditor y años en el cargo", "tipo": "Complemento", "intentos": "1) Informe anual: sin acceso; 2) búsqueda: sin resultado; 3) prensa: sin resultado", "decision": "Omitido"},
 ],
}
save('A', A)

# ---------------------------------------------------------------- B. Sector y competencia
FB = [
 F(1, "Global Eyewear Market Size, Share & Forecast 2026-2031", "Ken Research", "Sectorial", "2026", "https://www.kenresearch.com/global-eyewear-market"),
 F(2, "Eyewear Market Size report 2025-2034", "Global Market Insights", "Sectorial", "2025", "https://www.gminsights.com/industry-analysis/eyewear-Market"),
 F(3, "Q4/FY 2025 Results – Press Release", "EssilorLuxottica", "Primaria", "2026-02-11", "https://www.essilorluxottica.com/cap/content/283060"),
 F(4, "Meta AI glasses hype fades as Ray-Ban maker shares slip (Reuters)", "Malay Mail", "Prensa", "2026-04-23", "https://www.malaymail.com/news/money/2026/04/23/meta-ai-glasses-hype-fades-as-ray-ban-maker-shares-slip/217404"),
 F(5, "EssilorLuxottica recule, les analystes rabotent toujours leurs objectifs", "Option Finance", "Prensa", "2026-09-25", "https://www.optionfinance.fr/info-financiere-en-continu/d/2026-09-25-essilorluxottica-recule-les-analystes-rabotent-toujours-leurs-objectifs.html"),
 F(6, "EssilorLuxottica et Meta lancent une version plus accessible de leurs lunettes IA", "Option Finance", "Prensa", "2026-06-23", "https://www.optionfinance.fr/info-financiere-en-continu/d/2026-06-23-essilorluxottica-et-meta-lancent-une-version-plus-accessible-de-leurs-lunettes-ia.html"),
 F(7, "Hoya Is the Second-Largest Eyeglass Lensmaker and the Dominant Leader in Mask Blanks", "Morningstar", "Analistas", "2026-06", "https://www.morningstar.com/company-reports/1485209-hoya-is-the-second-largest-eyeglass-lensmaker-and-the-dominant-leader-in-mask-blanks"),
 F(8, "Fielmann Annual Report 2025", "Fielmann Group AG", "Primaria", "2026", "https://www.fielmann-group.com/fileadmin/fielmann/Dokumente/Publikationen/Geschaeftsberichte/EN/Fielmann_Annual_Report_2025.pdf"),
 F(9, "HOYA Corporation (TYO:7741) Financials – Income Statement", "Stock Analysis", "Datos de mercado", "2026-10", "https://stockanalysis.com/quote/tyo/7741/financials/"),
 F(10, "EssilorLuxottica acquires majority stake in Heidelberg Engineering", "Eyewire News", "Prensa", "2024", "https://eyewire.news/news/essilorluxottica-acquires-majority-stake-in-heidelberg-engineering"),
 F(11, "EssilorLuxottica slips as doubts linger over smart glasses growth (Reuters)", "Investing.com", "Prensa", "2026-04-23", "https://www.investing.com/news/stock-market-news/essilorluxottica-slips-as-doubts-linger-over-smart-glasses-growth-4631576"),
 F(12, "EssilorLuxottica to acquire a 76.72% stake in GrandVision from HAL", "EssilorLuxottica (AMF)", "Primaria", "2019-07-31", "https://echanges.dila.gouv.fr/OPENDATA/AMF/MKW/2019/07/FCMKW114936_20190731.pdf"),
 F(13, "National Vision Holdings: previsiones financieras", "MarketScreener", "Datos de mercado", "2026-10-09", "https://www.marketscreener.com/quote/stock/NATIONAL-VISION-HOLDINGS--38226958/finances/"),
]
B = {
 "historia": {
  "resumen": "EssilorLuxottica nace en octubre de 2018 de la fusión entre Essilor (lentes oftálmicas, Francia, fundada en 1849 como cooperativa de ópticos) y Luxottica (monturas y gafas de sol, Italia, fundada en 1961 por Leonardo Del Vecchio). Delfin, el holding de la familia Del Vecchio, es el primer accionista con el 32,4 %. En 2021 compró GrandVision, la mayor cadena óptica europea, a HAL [12]. Desde 2019 fabrica con Meta las gafas Ray-Ban Stories, y desde 2023 las Ray-Ban Meta con IA, que se han convertido en la tercera palanca de crecimiento [3, 4]. En 2024 compró Supreme y el 80 % de Heidelberg Engineering (diagnóstico) [10].",
  "hitos": [
   {"anio": "2018", "hito": "Fusión de Essilor y Luxottica."},
   {"anio": "2021", "hito": "Compra de GrandVision (76,72 % a HAL a 28 EUR por acción y OPA posterior) [12]."},
   {"anio": "2022", "hito": "Muere Leonardo Del Vecchio; Francesco Milleri, presidente y consejero delegado."},
   {"anio": "2023", "hito": "Lanzamiento de Ray-Ban Meta con IA."},
   {"anio": "2024", "hito": "Compra de Supreme y del 80 % de Heidelberg Engineering [10]."},
   {"anio": "2025", "hito": "Primer año con crecimiento de dos dígitos a tipo constante (11,2 %); máximo histórico de la acción (323,80 EUR, 13-nov) [3]."},
   {"anio": "2026", "hito": "La acción cae más de un 45 % desde el máximo por la desaceleración de las gafas con IA y la competencia; disputa de gobierno en Delfin [4, 5]."},
  ],
  "confianza": "Media",
 },
 "negocio": {},
 "sector": {
  "definicion": "El mercado relevante es el de la óptica mundial (lentes graduadas, monturas, gafas de sol y lentes de contacto, a precio de venta al público), donde EssilorLuxottica está en todos los eslabones: fabricación de lentes, marcas de monturas y venta minorista. Las estimaciones públicas varían mucho según el perímetro: Ken Research da unos 222.000 M USD en 2025 y Global Market Insights 161.000 M USD [1, 2]. Usamos el punto medio, unos 190.000 M USD (≈170.000 M EUR), como orden de magnitud. Las gafas con IA son un mercado nuevo que aún no recogen estas series.",
  "tamano": "≈ 161.000-222.000 M USD en 2025 según la fuente (≈ 170.000 M EUR en el punto medio) [1, 2]",
  "unidad_serie": "millones de EUR", "serie": [],
  "tcac_historico_pct": None, "tcac_previsto_pct": 6.5,
  "cr5_pct": None, "estructura": "Moderadamente concentrada",
  "drivers": [
   {"driver": "Envejecimiento y presbicia", "efecto": "+", "horizonte": "Estructural", "evidencia": "Las lentes progresivas (Varilux) son el producto de mayor precio; la población mayor de 50 años crece en todos los mercados desarrollados [3]."},
   {"driver": "Miopía infantil", "efecto": "+", "horizonte": "Estructural", "evidencia": "La cartera de control de miopía creció un 24 % en el 2T26 [3]."},
   {"driver": "Gafas con IA", "efecto": "+/−", "horizonte": "Estructural", "evidencia": "≈7 millones de pares en 2025, pero crecimiento de un dígito medio en el 1T26 y rivales de Google, Samsung y Apple [4, 6]."},
   {"driver": "Aranceles de EE. UU. y dólar", "efecto": "−", "horizonte": "Cíclico", "evidencia": "300 M EUR de coste en 2025; el dólar débil restó 4 puntos al crecimiento en el 1S26 (9,7 % a tipo constante, 5,7 % publicado) [3, 11]."},
   {"driver": "Consumo de lujo", "efecto": "−", "horizonte": "Cíclico", "evidencia": "Los analistas citan el retroceso del lujo como freno de las gafas de sol de licencia [5]."},
  ],
  "porter": [
   {"fuerza": "Rivalidad", "intensidad": 2, "justificacion": "Duopolio de hecho en lentes con Hoya (2.º mundial) y Zeiss (privada) [7]."},
   {"fuerza": "Poder de los clientes", "intensidad": 2, "justificacion": "Ópticas muy atomizadas; las grandes cadenas (Fielmann, Specsavers, National Vision) negocian más [8, 13]."},
   {"fuerza": "Poder de los proveedores", "intensidad": 2, "justificacion": "Materias primas comunes; en gafas con IA depende de la tecnología y la plataforma de Meta."},
   {"fuerza": "Amenaza de entrada", "intensidad": 3, "justificacion": "Baja en lentes (tecnología, regulación médica); alta en gafas inteligentes (Google, Samsung, Apple) [5]."},
   {"fuerza": "Amenaza de sustitutos", "intensidad": 2, "justificacion": "Cirugía refractiva y lentes de contacto, de crecimiento lento frente a las gafas."},
  ],
  "ciclo": {"posicion": "Madurez del ciclo", "comentario": "La óptica graduada es poco cíclica (es un producto de salud de reposición); las gafas de sol y las marcas de lujo sí lo son. En 2020 las ventas del grupo cayeron con el cierre de tiendas y se recuperaron en 2021; en 2022 el crecimiento a tipo constante se mantuvo. Hoy el ciclo lo marcan los aranceles, el consumo de lujo y la adopción de las gafas con IA [3, 5]."},
  "regulacion": "Las lentes graduadas son productos sanitarios (en la UE, reglamento de productos sanitarios), lo que exige registro y frena la entrada. En EE. UU., los aranceles a las importaciones desde 2025 costaron unos 300 M EUR al grupo, que fabrica buena parte de las monturas en Italia y China [11]. Las gafas con IA abren un frente de privacidad y protección de datos: el lanzamiento de nuevos modelos en septiembre de 2026 insistió en la confidentialidad [5].",
  "tendencias": "Tres tendencias: la tecnología médica (diagnóstico, control de miopía, audición con Nuance Audio), en la que el grupo invierte para salir del comercio de monturas [3]; las gafas inteligentes, donde la alianza con Meta da ventaja pero llegan Google, Samsung y probablemente Apple en 2027 [5, 6]; y la presión de precios en la gama de entrada (Meta Glasses desde 299 USD en junio de 2026) [6].",
  "confianza": "Baja",
 },
 "competencia": {
  "cuota_pct": None,
  "posicion": "1.º mundial en lentes oftálmicas (por delante de Hoya y Zeiss), en monturas y gafas de sol de marca y en óptica minorista; socio de Meta en gafas con IA [3, 7].",
  "competidores": [
   {"nombre": "Hoya", "pais": "Japón", "ticker": "7741", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "2.º en lentes oftálmicas; su negocio de óptica crece a un dígito bajo y gana más con los semiconductores [7, 9]."},
   {"nombre": "Carl Zeiss Vision", "pais": "Alemania", "ticker": None, "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "3.º en lentes; de la fundación Carl Zeiss, no cotiza."},
   {"nombre": "Fielmann", "pais": "Alemania", "ticker": "FIE", "ingresos": 2448, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Primera cadena de Alemania, cliente y rival en minorista [8]."},
   {"nombre": "National Vision", "pais": "EE. UU.", "ticker": "EYE", "ingresos": 1684, "cuota_pct": None, "margen_ebit_pct": 3.0, "comentario": "Óptica de precio bajo en EE. UU. [13]."},
   {"nombre": "Safilo", "pais": "Italia", "ticker": "SFL", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Monturas y gafas de sol con licencias; perdió licencias de lujo frente a Kering Eyewear y Thélios."},
  ],
  "foso": {"veredicto": "Amplio", "tendencia": "Estable", "fuentes": [
   {"fuente": "Efectos de red", "puntuacion": 1, "evidencia": "La red de ópticas y tiendas propias da distribución a los lanzamientos (Ray-Ban Meta), pero no es un efecto de red en sentido estricto."},
   {"fuente": "Costes de cambio", "puntuacion": 3, "evidencia": "Las ópticas trabajan con su sistema de pedidos, laboratorio y crédito; el consumidor repite marca de lente."},
   {"fuente": "Intangibles (marca, patentes, licencias)", "puntuacion": 5, "evidencia": "Ray-Ban, Oakley, Varilux, Transitions, Stellest; margen bruto ajustado del 61 % [3]."},
   {"fuente": "Ventaja en costes", "puntuacion": 3, "evidencia": "Escala industrial mundial en lentes y monturas."},
   {"fuente": "Escala eficiente", "puntuacion": 4, "evidencia": "28.491 M EUR de ventas, más que el siguiente competidor en lentes multiplicado por varias veces [3, 9]."},
  ]},
  "amenazas": "La amenaza principal no está en las lentes sino en las gafas con IA: si Google (con Warby Parker y Gentle Monster), Samsung o Apple ganan cuota, el grupo pierde el motor de crecimiento que el mercado pagó en 2025 y se queda con un producto de menor margen [4, 5]. Probabilidad media en tres años. En lentes, la amenaza es más lenta: Hoya y Zeiss en gama alta y los fabricantes asiáticos en la de entrada. La compra de Supreme muestra que el grupo puede dispersarse fuera de su foso.",
  "confianza": "Media",
 },
 "esg": {
  "calificaciones": [],
  "materialidad": "Los asuntos materiales son la gobernanza (control de Delfin y disputa entre Leonardo Maria Del Vecchio y el presidente y consejero delegado Francesco Milleri en 2026), la privacidad de los datos de las gafas con IA y la cadena de suministro en China e Italia, expuesta a aranceles [5]. No hemos encontrado calificaciones ESG recientes en fuentes accesibles.",
  "controversias": "Litigio con GrandVision y HAL resuelto a favor de EssilorLuxottica (2021). En 2026, disputa en el holding Delfin sobre la presidencia de Milleri; el consejo de EssilorLuxottica le renovó por unanimidad su confianza en septiembre.",
  "confianza": "Baja",
 },
 "fuentes": FB,
 "huecos": [
  {"seccion": "sector", "campo": "Serie de tamaño del mercado y CR5", "tipo": "Complemento", "intentos": "1) Informes de la empresa: sin acceso; 2) estudios de mercado por búsqueda: rangos de 161.000-222.000 M USD sin serie homogénea; 3) asociaciones (Vision Council): sin resultado", "decision": "Omitido"},
  {"seccion": "competencia", "campo": "Cuota de mercado de EssilorLuxottica y márgenes EBIT de los competidores", "tipo": "Complemento", "intentos": "1) Informes anuales de Hoya y Fielmann vía otros informes del repo: sin cuota global; 2) búsqueda: sin cifra; 3) Morningstar: solo posición", "decision": "Omitido"},
  {"seccion": "esg", "campo": "Calificaciones ESG", "tipo": "Complemento", "intentos": "1) Informe de sostenibilidad: sin acceso; 2) búsqueda MSCI/Sustainalytics: sin resultado; 3) prensa: sin resultado", "decision": "Omitido"},
 ],
}
del B["negocio"]
save('B', B)

# ---------------------------------------------------------------- C. Directivos y gobierno
FC = [
 F(1, "Mais que se passe-t-il avec la gouvernance d'EssilorLuxottica ?", "Option Finance", "Prensa", "2026-09-07", "https://www.optionfinance.fr/info-financiere-en-continu/d/2026-09-07-mais-que-se-passe-t-il-avec-la-gouvernance-dessilorluxottica.html"),
 F(2, "EssilorLuxottica heir buys out siblings in €10 billion deal (Reuters)", "Quartz", "Prensa", "2026-04-27", "https://qz.com/essilorluxottica-del-vecchio-heir-sibling-buyout-delfin-042726"),
 F(3, "Alerte AFG n° 25: EssilorLuxottica, assemblée générale 2026", "AFG (Association française de la gestion financière)", "Analistas", "2026-04", "https://www.afg.asso.fr/app/uploads/2026/04/Div-n°-6493_04-_Alerte-n°-25-ESSILOR.pdf"),
 F(4, "Assemblée générale EssilorLuxottica 28 avril 2026", "Rendement Bourse", "Prensa", "2026-04-28", "https://rendementbourse.com/el-essilorluxottica-sa/assemblee-generale"),
 F(5, "Meta renforce son influence sur EssilorLuxottica", "Luxury Tribune", "Prensa", "2025", "https://www.luxurytribune.com/meta-renforce-son-influence-sur-essilorluxottica-et-parie-sur-les-lunettes-intelligentes"),
 F(6, "Q4/FY 2025 Results – Press Release", "EssilorLuxottica", "Primaria", "2026-02-11", "https://www.essilorluxottica.com/cap/content/283060"),
 F(7, "Déclarations des dirigeants (DD) 2026: dividende en actions à 175,06 EUR", "AMF (BDIF)", "Primaria", "2026", "https://bdif.amf-france.org/back/api/v1/documents/2026/2026DD1119059/09AC7264423DB045A3D16F6D87CECC860435B469A2FD084583075FB039C834CC.pdf"),
 F(8, "Milleri: Meta vuole entrare nel capitale", "Milano Finanza", "Prensa", "2024-07-25", "https://www.milanofinanza.it/fashion/essilorluxottica-francesco-milleri-conferma-meta-vuole-entrare-nel-capitale-202407252322184131"),
 F(9, "EssilorLuxottica slips as doubts linger over smart glasses growth (Reuters)", "Investing.com", "Prensa", "2026-04-23", "https://www.investing.com/news/stock-market-news/essilorluxottica-slips-as-doubts-linger-over-smart-glasses-growth-4631576"),
]
C = {
 "directivos": {
  "equipo": [
   {"nombre": "Francesco Milleri", "cargo": "Presidente y consejero delegado", "desde": "2018", "participacion_pct": None, "trayectoria": "Consultor y empresario; consejero delegado de Luxottica desde 2017 y artífice de la fusión con Essilor. Presidente y consejero delegado desde 2022; bajo su mandato las ventas pasaron de 19.820 a 28.491 M EUR (2021-2025) [6]."},
   {"nombre": "Paul du Saillant", "cargo": "Consejero delegado adjunto", "desde": "2020", "participacion_pct": None, "trayectoria": "Procedente de Essilor; responsable de la integración y de las operaciones."},
   {"nombre": "Stefano Grassi", "cargo": "Director financiero", "desde": "2019", "participacion_pct": None, "trayectoria": "Director financiero de Luxottica antes de la fusión; cuantificó en 300 M EUR el coste de los aranceles de 2025 [9]."},
  ],
  "historial_guidance": [
   {"anio": "2025", "guia": "Objetivos 2022-2026: crecimiento anual de un dígito alto a tipo constante y margen operativo ajustado del 19-20 % en 2026", "real": "+11,2 % a tipo constante en 2025; margen ajustado del 16,0 %", "cumplida": "Parcial"},
   {"anio": "2026", "guia": "Guía a cinco años: crecimiento sólido de ventas y beneficio operativo ajustado alineado (feb-26)", "real": "+9,7 % y margen del 18,6 % en el 1S26; la dirección rebajó después las expectativas de ventas del año", "cumplida": "Parcial"},
  ],
  "comentario": "El equipo es estable y viene de la fusión (Milleri, du Saillant, Grassi). La credibilidad está tocada en dos frentes: el objetivo de margen del 19-20 % de 2026 se abandonó en febrero por una guía cualitativa a cinco años, y en septiembre la dirección empujó a los analistas a bajar las ventas de 2026 [6]. La sucesión es el riesgo: Milleri concentra presidencia y dirección y su continuidad al frente de Delfin está en cuestión [1].",
  "confianza": "Media",
 },
 "gobierno": {
  "consejo": [
   {"nombre": "Francesco Milleri", "cargo": "Presidente y consejero delegado", "tipo": "Ejecutivo", "desde": "2018", "comisiones": None},
   {"nombre": "Paul du Saillant", "cargo": "Consejero delegado adjunto", "tipo": "Ejecutivo", "desde": "2020", "comisiones": None},
  ],
  "presidente_ceo_separados": False, "presidente_ejecutivo": True, "consejero_coordinador": None, "una_accion_un_voto": None,
  "operaciones_vinculadas_relevantes": False, "variable_ligado_rentabilidad": None, "auditoria_independiente": None, "insiders_sin_operaciones": False,
  "accionista_control": True, "presidente_vinculado_control": True, "cambios_cupula_24m": 0,
  "voto_remuneracion_pct": None, "voto_remuneracion_contra_pct": None, "voto_remuneracion_contra_libre_pct": None, "voto_cupula_pct": None,
  "remuneracion_ceo": None,
  "remuneracion": "La política de 2026 (resoluciones 9 y 10 de la junta del 28 de abril) permite una remuneración excepcional de hasta una vez la remuneración total máxima del directivo, algo que la AFG señaló como alerta [3, 4]. No hemos podido leer el informe de remuneraciones ni el resultado de las votaciones: no damos cifras.",
  "accionistas": [
   {"nombre": "Delfin (familia Del Vecchio)", "pct": 32.4, "tipo": "Holding familiar", "variacion": "Leonardo Maria Del Vecchio compra el 25 % de sus hermanos en Delfin (≈10.000 M EUR, abril de 2026) y pasaría al 37,5 % del holding [2]."},
   {"nombre": "Meta Platforms", "pct": 3.0, "tipo": "Socio industrial", "variacion": "Al menos un 3 %, confirmado por un consejero a finales de 2025 [5, 8]."},
  ],
  "insiders": [],
  "control_y_defensas": "Delfin controla de hecho la junta con el 32,4 % y el presidente y consejero delegado (Milleri) preside también Delfin [1, 2]. En septiembre de 2026, Leonardo Maria Del Vecchio, que se hace con el control de Delfin, se opuso al control de facto de Milleri y sugirió que los accionistas de Delfin podrían no renovarle la presidencia del holding el año próximo; el consejo de EssilorLuxottica respondió renovándole por unanimidad su confianza como presidente y consejero delegado [1]. Meta, socio comercial, tiene al menos un 3 % [5].",
  "alertas": ["Disputa entre el heredero que controla Delfin y el presidente y consejero delegado (septiembre de 2026) [1].", "Presidencia y dirección ejecutiva en la misma persona, que preside además el accionista de control [1].", "Política de remuneración con cláusula de remuneración excepcional señalada por la AFG [3]."],
  "confianza": "Baja",
 },
 "fuentes": FC,
 "huecos": [
  {"seccion": "gobierno", "campo": "Consejo completo, comisiones, votaciones de remuneración y remuneración del primer ejecutivo", "tipo": "Núcleo", "intentos": "1) Documento de registro universal 2025: sin acceso; 2) resultados de la junta de 2026 por búsqueda: no publicados en los extractos; 3) AFG y prensa: solo la alerta sobre la política", "decision": "Omitido"},
  {"seccion": "gobierno", "campo": "Operaciones de directivos de 12 meses", "tipo": "Complemento", "intentos": "1) API de BDIF (AMF): sin red; 2) búsqueda: solo PDF sueltos sin contenido legible; 3) prensa: sin resultado", "decision": "Omitido"},
 ],
}
save('C', C)

# ---------------------------------------------------------------- D. Mercado y valoración
FD = [
 F(1, "EssilorLuxottica Stock (EL) – Quote Euronext Paris", "MarketScreener", "Datos de mercado", "2026-10-13", "https://www.marketscreener.com/quote/stock/ESSILORLUXOTTICA-4641/"),
 F(2, "EssilorLuxottica SA Share Price (EPA:EL)", "Stockopedia", "Datos de mercado", "2026-10-09", "https://www.stockopedia.com/share-prices/essilor-luxottica-sa-EPA:EL/"),
 F(3, "Valuation EssilorLuxottica (acciones en circulación)", "MarketScreener", "Datos de mercado", "2026-08", "https://uk.marketscreener.com/quote/stock/ESSILORLUXOTTICA-438209/valuation/"),
 F(4, "EssilorLuxottica: Financial Data Forecasts (consenso)", "MarketScreener", "Datos de mercado", "2026-09-23", "https://ca.marketscreener.com/quote/stock/ESSILORLUXOTTICA-4000692/finances/"),
 F(5, "EssilorLuxottica Kursziel (consenso de BPA 2026)", "aktien.guide", "Datos de mercado", "2026", "https://aktien.guide/kursziel/EssilorLuxottica-FR0000121667"),
 F(6, "EssilorLuxottica forecast (objetivos de 30 analistas)", "stocksguide", "Datos de mercado", "2026", "https://stocksguide.com/en/forecast/EssilorLuxottica-FR0000121667"),
 F(7, "EssilorLuxottica: Goldman senkt Kursziel auf 165 Euro", "Goldesel", "Prensa", "2026-09-25", "https://goldesel.de/aktien/news/essilorluxottica-goldman-senkt-kursziel-auf-165-euro-und-bleibt-neutral"),
 F(8, "EssilorLuxottica: Deutsche Bank senkt Kursziel auf 174 Euro (157 EUR)", "Goldesel", "Prensa", "2026-10-05", "https://goldesel.de/aktien/news/essilorluxottica-deutsche-bank-senkt-kursziel-auf-174-euro-aktie-mit-hold-bewertung-unter-beobachtung"),
 F(9, "EssilorLuxottica Aktie: BofA senkt Kursziel auf 205 Euro", "Goldesel", "Prensa", "2026-10-09", "https://goldesel.de/aktien/news/essilorluxottica-aktie-bofa-senkt-kursziel-auf-205-euro-bleibt-bei-kaufen"),
 F(10, "EssilorLuxottica recule, les analystes rabotent toujours leurs objectifs", "Option Finance", "Prensa", "2026-09-25", "https://www.optionfinance.fr/info-financiere-en-continu/d/2026-09-25-essilorluxottica-recule-les-analystes-rabotent-toujours-leurs-objectifs.html"),
 F(11, "EssilorLuxottica stock falls 47 percent as targets reset", "ad-hoc-news", "Prensa", "2026-10", "https://www.ad-hoc-news.de/boerse/news/corporate-news/essilorluxottica-stock-falls-47-percent-as-targets-reset/70164942"),
 F(12, "EssilorLuxottica: cotation et variation depuis le 1er janvier", "ABC Bourse", "Datos de mercado", "2026-07-22", "https://www.abcbourse.com/cotation/ELp"),
 F(13, "Action EssilorLuxottica: une année record, faut-il attendre ? (cierre de 2022)", "Café de la Bourse", "Prensa", "2023", "https://www.cafedelabourse.com/bourse/action-essilorluxottica-annee-record-attendre"),
 F(14, "EssilorLuxottica dans le peloton de tête du CAC40 en 2024", "Tradingsat (BFM Bourse)", "Prensa", "2024-12", "https://www.tradingsat.com/essilorluxottica-FR0000121667/actualites/essilorluxottica-essilorluxottica-dans-le-peloton-de-tete-du-cac40-en-2024-1129804.html"),
 F(15, "EssilorLuxottica (EURONEXT:EL): máximo histórico", "TradingView", "Datos de mercado", "2026", "https://fr.tradingview.com/symbols/EURONEXT-EL/"),
 F(16, "HOYA Corporation (TYO:7741) Statistics & Valuation (comparables del informe de Hoya del 14-oct-2026)", "Stock Analysis", "Datos de mercado", "2026-10-14", "https://stockanalysis.com/quote/tyo/7741/statistics/"),
 F(17, "Previsiones de Cooper, Alcon, Bausch + Lomb (comparables del informe de Cooper del 9-oct-2026)", "MarketScreener", "Datos de mercado", "2026-10-08", "https://www.marketscreener.com/quote/stock/THE-COOPER-COMPANIES-INC-12149/finances/"),
 F(18, "Sonova Holding AG: previsiones financieras (comparables del informe de Fielmann del 9-oct-2026)", "MarketScreener", "Datos de mercado", "2026-10-09", "https://www.marketscreener.com/quote/stock/SONOVA-HOLDING-AG-70127/finances/"),
 F(19, "Demant A/S: previsiones financieras", "MarketScreener", "Datos de mercado", "2026-10-09", "https://www.marketscreener.com/quote/stock/DEMANT-A-S-56225597/finances/"),
 F(20, "National Vision Holdings: previsiones financieras", "MarketScreener", "Datos de mercado", "2026-10-09", "https://www.marketscreener.com/quote/stock/NATIONAL-VISION-HOLDINGS--38226958/finances/"),
 F(21, "Terumo Corporation: previsiones financieras (comparables del informe de Olympus del 9-oct-2026)", "MarketScreener", "Datos de mercado", "2026-10-09", "https://www.marketscreener.com/quote/stock/TERUMO-CORPORATION-6491240/finances/"),
 F(22, "Fielmann Group: informe semestral a 30-jun-2026 (múltiplos del informe de Fielmann del 9-oct-2026)", "Fielmann Group AG", "Primaria", "2026-08-27", "https://www.fielmann-group.com/fileadmin/fielmann/Dokumente/Publikationen/Quartalsberichte/EN/2026/Fielmann_Group_AG_report_half_year_2026.pdf"),
 F(23, "Tipos de cambio de referencia del euro", "Banco Central Europeo", "Datos de mercado", "2026-10-08", "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"),
 F(24, "Amplifon: Company Update tras la compra de GN Hearing", "Intermonte SIM", "Analistas", "2026-03-17", "https://www.websim.it/static/upload/amp/amplifon-17-03-26.pdf"),
 F(25, "Hologic to be Acquired by Blackstone and TPG", "Hologic (SEC, 8-K)", "Primaria", "2025-10-21", "https://www.sec.gov/Archives/edgar/data/859737/000119312525244423/d72397dex991.htm"),
 F(26, "CooperCompanies to Acquire Generate Life Sciences", "The Cooper Companies (SEC, 8-K)", "Primaria", "2021-11-10", "https://www.sec.gov/Archives/edgar/data/711404/000119312521326207/d204711dex991.htm"),
 F(27, "Bausch + Lomb to acquire XIIDRA from Novartis", "Bausch + Lomb (SEC, 8-K)", "Primaria", "2023-06-30", "https://www.sec.gov/Archives/edgar/data/1860742/000119312523179447/d493799dex991.htm"),
 F(28, "Fielmann Annual Report 2024 (Shopko Optical)", "Fielmann Group AG", "Primaria", "2025", "https://www.fielmann-group.com/fileadmin/fielmann/Dokumente/Publikationen/Geschaeftsberichte/EN/Fielmann_Annual_Report_2024.pdf"),
 F(29, "EssilorLuxottica to acquire a 76.72% stake in GrandVision from HAL", "EssilorLuxottica (AMF)", "Primaria", "2019-07-31", "https://echanges.dila.gouv.fr/OPENDATA/AMF/MKW/2019/07/FCMKW114936_20190731.pdf"),
 F(30, "Damodaran: Implied ERP by month (ERPbymonth.xlsx)", "NYU Stern (A. Damodaran)", "Datos de mercado", "2026-10", "https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx"),
 F(31, "German 10-year Bund yield eases from 15-year high", "Trading Economics", "Datos de mercado", "2026-08-21", "https://tradingeconomics.com/germany/government-bond-yield/news/577250"),
 F(32, "EssilorLuxottica (ESLOF) key statistics (beta a 5 años)", "Yahoo Finance", "Datos de mercado", "2026-08", "https://finance.yahoo.com/quote/ESLOF/key-statistics/"),
 F(33, "Aufnahme: EssilorLuxottica Umsatzzahlen kommen am 20. Oktober", "Finanztrends", "Prensa", "2026-10", "https://www.finanztrends.de/news/essilorluxottica-aktie-umsatzzahlen-kommen-am-20-oktober/"),
 F(35, "Q4/FY 2025 Results – Press Release", "EssilorLuxottica", "Primaria", "2026-02-11", "https://www.essilorluxottica.com/cap/content/283060"),
 F(36, "Q2/H1 2026 results (comunicado)", "EssilorLuxottica (MFN)", "Primaria", "2026-07-28", "https://mfn.se/one/a/essilorluxottica/essilorluxottica-q2-h1-2026-results-solid-revenue-trajectory-at-9-7-in-h1-with-q2-at-8-7-increasing-profitability-with-adj-operating-profit-15-a067ffa3.iframe"),
 F(34, "Jefferies / Bernstein / Stifel: objetivos tras la presentación de las nuevas gafas IA", "Tradingsat (BFM Bourse)", "Prensa", "2026-09-25", "https://www.tradingsat.com/essilorluxottica-FR0000121667/actualites/essilorluxottica-essilorluxottica-recule-les-analystes-rabotent-toujours-leurs-objectifs-1170792.html"),
]
JPY, USD = 180.2, 1.1186  # unidades por EUR implícitas en las capitalizaciones de EL de los informes de Hoya (14-oct) y Cooper (9-oct)
D_ = {
 "identificacion": {
  "nombre": "EssilorLuxottica Société anonyme", "nombre_corto": "EssilorLuxottica", "ticker": "EL", "isin": "FR0000121667", "mercado": "Euronext París", "indice_referencia": "CAC 40 / Euro Stoxx 50",
  "pais": "Francia", "pais_iso": "FR", "sector": "Salud", "industria": "Equipos y suministros sanitarios (óptica)", "sede": "Charenton-le-Pont (París)", "fundacion": "2018", "empleados": None, "web": "www.essilorluxottica.com",
  "precio": 146.30, "fecha_precio": "2026-10-13", "acciones": 459.6, "capitalizacion_publicada": None, "free_float_pct": None,
  "max_52s": 323.80, "min_52s": None, "volumen_medio_diario": None, "proximos_resultados": "2026-10-20",
 },
 "consenso": {
  "guidance": "En febrero de 2026, con las cuentas de 2025, la empresa sustituyó los objetivos del plan 2022-2026 por una guía a cinco años: crecimiento «sólido» de las ventas y del beneficio operativo ajustado «ampliamente alineado», a tipo constante [35]. La confirmó en abril y en julio, avisando de una base de comparación más exigente en el segundo semestre. A finales de septiembre, según Bernstein, la dirección empujó al mercado a rebajar las previsiones de ventas de 2026 [10]. Las ventas del tercer trimestre se publican el 20 de octubre [33].",
  "estimaciones": [
   {"periodo": "2026e", "ingresos": 30266, "ebitda": 7221, "ebit": None, "bpa": 5.77, "dpa": None, "fuente": "MarketScreener, 23-sep-2026 (BPA = beneficio neto 2.650 M / 459,6 M acciones, base publicada) [4]"},
   {"periodo": "2027e", "ingresos": 32871, "ebitda": 7936, "ebit": None, "bpa": 6.62, "dpa": None, "fuente": "MarketScreener, 23-sep-2026 (beneficio neto ≈3.040 M) [4]"},
  ],
  "recomendaciones": {"n_analistas": None, "comprar": None, "mantener": None, "vender": None, "po_medio": None, "po_min": 157, "po_max": 300},
  "revisiones": "Las revisiones son a la baja y continuas desde abril. En septiembre y octubre: Goldman de 200 a 165 EUR (neutral), RBC de 230 a 190 EUR, Barclays de 265 a 260 EUR, Deutsche Bank de 174 a 157 EUR (mantener), Oddo BHF de 220 a 186 EUR, Bernstein de 200 a 185 EUR, BofA de 237 a 205 EUR (comprar) y Jefferies a 250 EUR (comprar) [7, 8, 9, 10, 34]. El motivo es la desaceleración de las gafas con IA frente a una base alta, la competencia y los aranceles. Los objetivos medios publicados por los agregadores (261-279 EUR) son anteriores a estos recortes y no los usamos [5, 6].",
  "base_ebitda": "NIIF", "ajuste_ebitda_pct_ventas": None,
  "confianza": "Baja",
 },
 "bolsa": None,
 "multiplos_historicos": {
  "serie": [
   {"anio": "2021", "precio_cierre": None, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2022", "precio_cierre": 177.0, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2023", "precio_cierre": None, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2024", "precio_cierre": None, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2025", "precio_cierre": 269.9, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
  ],
  "comentario": "Solo tenemos dos cierres anuales fiables: unos 177 EUR al final de 2022 y unos 270 EUR al final de 2025 (deducido de la caída del 39,09 % en el año hasta 164,40 EUR del 22 de julio) [12, 13]. En 2024 la acción subió más de un 31 % [14]. Con el BPA ajustado, el PER fue de unas 27,5 veces en 2022 y 39,8 veces en 2025, máximo alcanzado con la euforia de las gafas con IA (323,80 EUR el 13-nov-2025) [15]. Hoy, a 146,30 EUR, cotiza a unas 21,5 veces el BPA ajustado de 2025 y a 18,4 veces nuestro BPA ajustado de 2027e: el múltiplo más bajo en al menos cinco años.",
  "confianza": "Baja",
 },
 "comparables": {
  "criterio": "Nueve cotizadas de salud visual y auditiva y tecnología médica de consumo: Hoya (2.º en lentes), Alcon, Cooper y Bausch + Lomb (lentes de contacto y cirugía ocular), Fielmann y National Vision (cadenas ópticas), Sonova y Demant (audición, mismo modelo de fabricante con red propia) y Terumo (tecnología médica). Warby Parker queda fuera (PER de 87 veces, sin beneficio estable). No hay comparable puro de monturas y gafas de sol de lujo cotizado y líquido (Safilo es pequeño). Cifras de los informes del repo de Hoya (14-oct), Cooper y Fielmann (9-oct), convertidas a EUR con 180,2 JPY y 1,1186 USD por EUR [16-23].",
  "empresas": [
   {"nombre": "Hoya", "ticker": "7741", "pais": "JP", "capitalizacion": round(8365113 / JPY), "ev_ventas": 8.07, "ev_ebitda_ltm": 22.4, "ev_ebitda_ntm": None, "per_ntm": 31.7, "crecimiento_pct": None, "margen_ebitda_pct": 36.1, "roic_pct": 45.2, "dn_ebitda": -1.5, "fcf_yield_pct": 2.8},
   {"nombre": "Alcon", "ticker": "ALC", "pais": "CH", "capitalizacion": round(30517 / USD), "ev_ventas": 3.09, "ev_ebitda_ltm": 11.7, "ev_ebitda_ntm": 10.6, "per_ntm": None, "crecimiento_pct": 6.2, "margen_ebitda_pct": 25.7, "roic_pct": 4.75, "dn_ebitda": 1.2, "fcf_yield_pct": 5.74},
   {"nombre": "Cooper Companies", "ticker": "COO", "pais": "US", "capitalizacion": round(10350 / USD), "ev_ventas": 3.07, "ev_ebitda_ltm": 10.6, "ev_ebitda_ntm": 10.3, "per_ntm": 15.3, "crecimiento_pct": 3.2, "margen_ebitda_pct": 29.1, "roic_pct": 4.6, "dn_ebitda": 1.9, "fcf_yield_pct": 6.6},
   {"nombre": "Bausch + Lomb", "ticker": "BLCO", "pais": "CA", "capitalizacion": round(6125 / USD), "ev_ventas": 2.01, "ev_ebitda_ltm": 10.7, "ev_ebitda_ntm": 9.5, "per_ntm": None, "crecimiento_pct": 6.3, "margen_ebitda_pct": 17.5, "roic_pct": 3.61, "dn_ebitda": 5.3, "fcf_yield_pct": 2.24},
   {"nombre": "Fielmann", "ticker": "FIE", "pais": "DE", "capitalizacion": 3115, "ev_ventas": 1.58, "ev_ebitda_ltm": 6.8, "ev_ebitda_ntm": 6.6, "per_ntm": 13.7, "crecimiento_pct": 5.4, "margen_ebitda_pct": 23.0, "roic_pct": 13.9, "dn_ebitda": 1.1, "fcf_yield_pct": 6.5},
   {"nombre": "National Vision", "ticker": "EYE", "pais": "US", "capitalizacion": 1183, "ev_ventas": 0.75, "ev_ebitda_ltm": 7.4, "ev_ebitda_ntm": 6.5, "per_ntm": 18.7, "crecimiento_pct": 4.5, "margen_ebitda_pct": 9.7, "roic_pct": 4.4, "dn_ebitda": 0.9, "fcf_yield_pct": 3.7},
   {"nombre": "Sonova", "ticker": "SOON", "pais": "CH", "capitalizacion": 16267, "ev_ventas": 4.4, "ev_ebitda_ltm": 16.7, "ev_ebitda_ntm": 14.5, "per_ntm": 22.8, "crecimiento_pct": 7.0, "margen_ebitda_pct": 26.0, "roic_pct": 17.0, "dn_ebitda": 1.0, "fcf_yield_pct": 4.1},
   {"nombre": "Demant", "ticker": "DEMANT", "pais": "DK", "capitalizacion": 9069, "ev_ventas": 3.51, "ev_ebitda_ltm": 15.1, "ev_ebitda_ntm": 13.0, "per_ntm": 21.3, "crecimiento_pct": 9.8, "margen_ebitda_pct": 23.3, "roic_pct": 10.7, "dn_ebitda": 3.3, "fcf_yield_pct": 4.9},
   {"nombre": "Terumo", "ticker": "4543", "pais": "JP", "capitalizacion": round(3405000 / JPY), "ev_ventas": 2.95, "ev_ebitda_ltm": 11.9, "ev_ebitda_ntm": 10.0, "per_ntm": 17.8, "crecimiento_pct": 9.0, "margen_ebitda_pct": 24.0, "roic_pct": None, "dn_ebitda": 0.11, "fcf_yield_pct": 4.4},
  ],
  "comentario": None,
  "confianza": "Media",
 },
 "transacciones": {
  "operaciones": [
   {"fecha": "2026-03", "objetivo": "GN Hearing (audífonos)", "comprador": "Amplifon", "ev": 2300, "ev_ventas": 2.3, "ev_ebitda": 10.5, "prima_pct": None, "excluir": False, "comentario": "≈2.300 M EUR sin caja ni deuda; ventas ≈1.000 M y EBITDA ajustado ≈220 M EUR, sin sinergias [24]."},
   {"fecha": "2025-10", "objetivo": "Hologic (tecnología médica)", "comprador": "Blackstone y TPG", "ev": round(18300 / USD), "ev_ventas": 4.46, "ev_ebitda": 13.7, "prima_pct": 46, "excluir": False, "comentario": "Hasta 79 USD por acción; EBITDA ajustado de 1.339,7 M USD [25]."},
   {"fecha": "2023-06", "objetivo": "Xiidra (Novartis)", "comprador": "Bausch + Lomb", "ev": round(1750 / USD), "ev_ventas": 3.59, "ev_ebitda": None, "prima_pct": None, "excluir": False, "comentario": "Pago inicial de 1.750 M USD [27]."},
   {"fecha": "2021-11", "objetivo": "Generate Life Sciences", "comprador": "Cooper Companies", "ev": round(1600 / USD), "ev_ventas": 6.4, "ev_ebitda": None, "prima_pct": None, "excluir": False, "comentario": "Fertilidad y bancos de células; ventas ≈250 M USD [26]."},
   {"fecha": "2024-07", "objetivo": "Shopko Optical (cadena óptica de EE. UU.)", "comprador": "Fielmann Group", "ev": 278.5, "ev_ventas": 1.62, "ev_ebitda": None, "prima_pct": None, "excluir": False, "comentario": "Ventas proforma de 171,4 M EUR [28]."},
   {"fecha": "2019-07", "objetivo": "GrandVision (76,72 %)", "comprador": "EssilorLuxottica", "ev": None, "ev_ventas": None, "ev_ebitda": None, "prima_pct": None, "excluir": True, "comentario": "28 EUR por acción; el 76,72 % costaba unos 5.500 M EUR con 3.700 M EUR de ventas; sin valor empresa ni EBITDA publicados [29]."},
  ],
  "comentario": "Las dos operaciones con EBITDA publicado se pagaron a 10,5 y 13,7 veces, por debajo o en línea con lo que hoy paga el mercado por EssilorLuxottica (unas 12 veces el EBITDA de 2025). Con Delfin al 32,4 % y una capitalización de 67.000 M EUR, una opa es improbable; la disputa en Delfin podría, como mucho, llevar a cambios en el holding, no en el capital de la cotizada [24, 25].",
  "confianza": "Media",
 },
 "notas_integrador": {"red": "Solo WebSearch. Precio de 146,30 EUR (cierre del 13-oct, MarketScreener); 146,35 el 9-oct en Stockopedia y Morningstar.", "tipos": "JPY 180,2 y USD 1,1186 por EUR, implícitos en la capitalización de EL de los informes de Hoya y Cooper."},
 "fuentes": FD,
 "huecos": [
  {"seccion": "bolsa", "campo": "Rentabilidades totales, beta calculada, volatilidad, caída máxima y posición corta", "tipo": "Complemento", "intentos": "1) bolsa.mjs sin red; 2) WebFetch a Yahoo bloqueado; 3) búsqueda: solo cifras sueltas (beta de 0,55-0,92 según línea)", "decision": "Omitido"},
  {"seccion": "multiplos_historicos", "campo": "Precios de cierre de 2021, 2023 y 2024", "tipo": "Complemento", "intentos": "1) bolsa.mjs sin red; 2) búsqueda en francés e inglés de los cierres anuales: sin cifra; 3) informes anuales (DEU) con el cierre: sin acceso", "decision": "Omitido"},
  {"seccion": "consenso", "campo": "Número de analistas, reparto de recomendaciones y objetivo medio actualizado", "tipo": "Complemento", "intentos": "1) MarketScreener e Investing: sin acceso directo; 2) agregadores (stocksguide, aktien.guide): datos anteriores a los recortes de sep-oct; 3) prensa: objetivos sueltos (157-300 EUR)", "decision": "Omitido"},
 ],
}
save('D', D_)

# ---------------------------------------------------------------- E. Sentimiento
FE = [
 F(1, "EssilorLuxottica (ENXTPA:EL) Expands Smart Eyewear, Is It Still 38% Below Fair Value? (narrativas de la comunidad de Simply Wall St)", "Webull / Simply Wall St", "Foros y redes", "2026-10", "https://www.webull.com/news/15699434643063808"),
 F(2, "EssilorLuxottica (ENXTPA:EL) Results Put Its Valuation Narrative Back In Focus", "Webull / Simply Wall St", "Foros y redes", "2026-08", "https://www.webull.com/news/15310544008012800"),
 F(3, "In Paris, EssiLux falls; analysts divided between optimistic and cautious", "Il Sole 24 Ore", "Prensa", "2026", "https://en.ilsole24ore.com/art/in-paris-essilux-accounts-fall-analysts-divided-optimistic-and-cautious-AIhf0ueC"),
 F(4, "EssilorLuxottica recule, les analystes rabotent toujours leurs objectifs (con comentarios de lectores)", "Tradingsat (BFM Bourse)", "Foros y redes", "2026-09-25", "https://www.tradingsat.com/essilorluxottica-FR0000121667/actualites/essilorluxottica-essilorluxottica-recule-les-analystes-rabotent-toujours-leurs-objectifs-1170792.html"),
 F(5, "EssilorLuxottica forum discussion", "getquin", "Foros y redes", "2026-10", "https://app.getquin.com/es/acciones/FR0000121667/essilorluxottica"),
 F(6, "EssilorLuxottica stock falls 47 percent as targets reset", "ad-hoc-news", "Prensa", "2026-10", "https://www.ad-hoc-news.de/boerse/news/corporate-news/essilorluxottica-stock-falls-47-percent-as-targets-reset/70164942"),
 F(7, "Mais que se passe-t-il avec la gouvernance d'EssilorLuxottica ?", "Option Finance", "Prensa", "2026-09-07", "https://www.optionfinance.fr/info-financiere-en-continu/d/2026-09-07-mais-que-se-passe-t-il-avec-la-gouvernance-dessilorluxottica.html"),
]
E = {
 "sentimiento": {
  "tono": "Dividido", "tendencia": "Empeora",
  "revisadas": [
   {"plataforma": "Simply Wall St (narrativas de particulares, vía Webull)", "fecha": "2026-10", "n_comentarios": 3, "tono": "Positivo", "resumen": "Las narrativas de la comunidad sitúan el valor razonable muy por encima del precio (un 38 % de descuento en la última) y ven la caída como exagerada, condicionada a que las gafas con IA no erosionen el margen [1, 2]."},
   {"plataforma": "Tradingsat / BFM Bourse (noticia y comentarios)", "fecha": "2026-09", "n_comentarios": 5, "tono": "Negativo", "resumen": "Tras los recortes de objetivos de finales de septiembre, la conversación gira en torno a la caída continua y a la falta de suelo; se repite la idea de que la empresa vendió una historia tecnológica que no se cumple [4]."},
   {"plataforma": "getquin (comunidad de inversores particulares)", "fecha": "2026-10", "n_comentarios": 4, "tono": "Dividido", "resumen": "Unos ven una oportunidad de comprar a la mitad del máximo una empresa con foso; otros temen una «trampa de valor» por la competencia de Google, Samsung y Apple en gafas con IA [5]."},
   {"plataforma": "Prensa económica italiana y francesa (Il Sole 24 Ore, Option Finance)", "fecha": "2026-09", "n_comentarios": 2, "tono": "Dividido", "resumen": "Analistas divididos entre optimistas y prudentes; preocupación nueva por la gobernanza tras la disputa en Delfin [3, 7]."},
  ],
  "temas": [
   {"tema": "Las gafas con IA: motor o trampa", "postura": "Dividida", "peso": "Alto", "contraste": "Los datos dan razón a las dos partes: casi se duplicaron en el 2T26, pero frenaron en el 1T26 y su margen es menor que el del grupo. Nuestro base no depende de ellas."},
   {"tema": "Valoración barata frente a la historia", "postura": "Alcista", "peso": "Medio", "contraste": "Cierto: el PER sobre BPA ajustado (18,4 veces 2027e) es el más bajo en al menos cinco años; pero los foros usan valores razonables de modelos automáticos, no cifras propias."},
   {"tema": "Gobierno: Del Vecchio frente a Milleri", "postura": "Bajista", "peso": "Medio", "contraste": "Riesgo real y reciente (septiembre de 2026) [7]; lo recogemos en gobierno y en riesgos."},
   {"tema": "Recortes de objetivos de los analistas", "postura": "Bajista", "peso": "Alto", "contraste": "Ocho recortes en un mes (157-250 EUR); el sentimiento sigue al consenso, no se adelanta [6]."},
  ],
  "lectura": "El sentimiento está dividido y empeorando: el particular ve una ganga a la mitad del máximo, y la prensa y los analistas siguen recortando. No es capitulación (no vemos ventas masivas ni pánico), sino cansancio tras una caída del 47 %. Lo que aporta a la decisión es el riesgo de gobierno, que apenas aparecía en el discurso de los analistas, y la confirmación de que el catalizador que falta es que las gafas con IA dejen de bajar las estimaciones; las ventas del 3T del 20 de octubre son la prueba.",
  "confianza": "Baja",
 },
 "fuentes": FE,
 "huecos": [{"seccion": "sentimiento", "campo": "Reddit, Stocktwits y foro de Boursorama", "tipo": "Complemento", "intentos": "1) Reddit y Stocktwits por búsqueda: sin hilos recientes en los resultados; 2) Boursorama por búsqueda: sin resultados; 3) getquin y narrativas de Simply Wall St: leídas", "decision": "Omitido"}],
}
save('E', E)
print('ok')

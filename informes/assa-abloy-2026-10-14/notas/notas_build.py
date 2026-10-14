# Genera las notas A-E de ASSA ABLOY (corte 2026-10-14). Solo hechos de los resultados de búsqueda, con su URL.
import json, os, sys
D = sys.argv[1]
def w(n, o):
    with open(os.path.join(D, n + '.json'), 'w', encoding='utf-8') as f:
        json.dump(o, f, ensure_ascii=False, indent=1)

# ---------------- A. Cuentas ----------------
fA = [
 {"id":1,"titulo":"Quarterly Report Q4 2025 (informe del ejercicio 2025)","editor":"ASSA ABLOY / Cision","tipo":"Primaria","fecha":"2026-02-05","url":"https://mb.cision.com/Main/7333/4302869/3918217.pdf"},
 {"id":2,"titulo":"Quarterly Report Q2 2026","editor":"ASSA ABLOY / Cision","tipo":"Primaria","fecha":"2026-07-17","url":"https://mb.cision.com/Main/7333/4375615/4197393.pdf"},
 {"id":3,"titulo":"Q2 Presentation 2026","editor":"ASSA ABLOY","tipo":"Primaria","fecha":"2026-07-17","url":"https://www.assaabloy.com/group/en/documents/investors/interim-presentations/2026/Q2%20Presentation%202026.pdf"},
 {"id":4,"titulo":"ASSA ABLOY (STO:ASSA.B) Income statement","editor":"Stock Analysis","tipo":"Datos de mercado","fecha":"2026-10","url":"https://stockanalysis.com/quote/sto/ASSA.B/financials/income-statement/"},
 {"id":5,"titulo":"ASSA ABLOY (STO:ASSA.B) Cash flow statement","editor":"Stock Analysis","tipo":"Datos de mercado","fecha":"2026-10","url":"https://stockanalysis.com/quote/sto/ASSA.B/financials/cash-flow-statement/"},
 {"id":6,"titulo":"ASSA B Balance sheet","editor":"Stockopedia","tipo":"Datos de mercado","fecha":"2026-10","url":"https://www.stockopedia.com/share-prices/assa-abloy-ab-STO:ASSA B/balance-sheet/"},
 {"id":7,"titulo":"ASSA ABLOY financials and estimates (income statements)","editor":"Inderes","tipo":"Datos de mercado","fecha":"2026-10","url":"https://www.inderes.dk/companies/ASSA-ABLOY/financials-and-estimates/income-statements"},
 {"id":8,"titulo":"ASSA ABLOY AB (SS:ASSA-B) financials","editor":"Kalkine Media","tipo":"Datos de mercado","fecha":"2026-10","url":"https://kalkinemedia.com/se/companies/ss-assa-b"},
 {"id":9,"titulo":"Annual Report 2025","editor":"ASSA ABLOY","tipo":"Primaria","fecha":"2026-03-16","url":"https://www.assaabloy.com/group/en/documents/investors/annual-reports/2025/Annual Report 2025.pdf"},
 {"id":10,"titulo":"ASSA ABLOY balance sheet (2023-2024)","editor":"Tracenable","tipo":"Datos de mercado","fecha":"2026-10","url":"https://tracenable.com/company/assa-abloy/balance-sheet"},
 {"id":11,"titulo":"ASSA ABLOY stock analysis (deuda total, amortizaciones)","editor":"TipRanks","tipo":"Datos de mercado","fecha":"2026-10","url":"https://www.tipranks.com/stocks/se:assa.b/stock-analysis"},
 {"id":12,"titulo":"Q1 Presentation 2026","editor":"ASSA ABLOY","tipo":"Primaria","fecha":"2026-04","url":"https://www.assaabloy.com/group/en/documents/investors/interim-presentations/2026/Q1%20Presentation%202026.pdf"},
 {"id":13,"titulo":"ASSA ABLOY (OM:ASSA B) Earnings put its valuation story back in focus","editor":"Simply Wall St / Webull","tipo":"Prensa","fecha":"2026-07","url":"https://www.webull.com/news/15305856882861056"},
 {"id":14,"titulo":"Assa Abloy (OSTO:ASSA B) Accounts payable / effective interest rate (jun-2026)","editor":"GuruFocus","tipo":"Datos de mercado","fecha":"2026-07","url":"https://www.gurufocus.com/term/effective-interest-rate/OSTO:ASSA B"},
 {"id":15,"titulo":"Debt financing and credit rating","editor":"ASSA ABLOY","tipo":"Primaria","fecha":"2026-07","url":"https://www.assaabloy.com/group/en/investors/debt/debt-financing-and-credit-rating"},
 {"id":16,"titulo":"ASSA ABLOY to acquire HHI division of Spectrum Brands (USD 4.300 M, 14x EBITDA ajustado)","editor":"ASSA ABLOY / Nasdaq","tipo":"Primaria","fecha":"2021-09-08","url":"https://www.nasdaq.com/press-release/assa-abloy-to-acquire-hardware-and-home-improvement-hhi-division-of-spectrum-brands"},
 {"id":18,"titulo":"ASSA ABLOY (STO:ASSA.B) Balance sheet (existencias, clientes y proveedores 2025)","editor":"Stock Analysis","tipo":"Datos de mercado","fecha":"2026-10","url":"https://stockanalysis.com/quote/sto/ASSA.B/financials/balance-sheet/"},
 {"id":17,"titulo":"ASSA ABLOY Quarterly Report Q4 2025 (resumen de prensa)","editor":"Inderes","tipo":"Primaria","fecha":"2026-02-05","url":"https://www.inderes.fi/releases/assa-abloy-quarterly-report-q4-2025"},
]
cuenta = [
 dict(periodo="2021",ingresos=95007,coste_ventas=57231,gastos_generales=23238,ebitda=18022,amortizaciones=3841,ebit=14181,resultado_financiero=-643,bai=13538,impuestos=2638,minoritarios=0,beneficio_neto=10900,gastos_financieros=649,participadas_en_ebitda=None,no_recurrentes_en_ebitda=None,bpa=9.81,dpa=4.20,dpa_extraordinario=0,acciones_diluidas=1111),
 dict(periodo="2022",ingresos=120793,coste_ventas=72862,gastos_generales=28712,ebitda=22620,amortizaciones=4088,ebit=18532,resultado_financiero=-1011,bai=17521,impuestos=4225,minoritarios=5,beneficio_neto=13291,gastos_financieros=1070,participadas_en_ebitda=None,no_recurrentes_en_ebitda=None,bpa=11.97,dpa=4.80,dpa_extraordinario=0,acciones_diluidas=1110),
 dict(periodo="2023",ingresos=140716,coste_ventas=84212,gastos_generales=34660,ebitda=26959,amortizaciones=5174,ebit=21785,resultado_financiero=-2531,bai=19254,impuestos=5615,minoritarios=6,beneficio_neto=13633,gastos_financieros=2687,participadas_en_ebitda=None,no_recurrentes_en_ebitda=None,bpa=12.27,dpa=5.40,dpa_extraordinario=0,acciones_diluidas=1111),
 dict(periodo="2024",ingresos=150162,coste_ventas=87434,gastos_generales=38540,ebitda=29850,amortizaciones=5575,ebit=24275,resultado_financiero=-3382,bai=20893,impuestos=5272,minoritarios=0,beneficio_neto=15621,gastos_financieros=3515,participadas_en_ebitda=None,no_recurrentes_en_ebitda=None,bpa=14.08,dpa=5.90,dpa_extraordinario=0,acciones_diluidas=1110),
 dict(periodo="2025",ingresos=152409,coste_ventas=87440,gastos_generales=41617,ebitda=29232,amortizaciones=6081,ebit=23151,resultado_financiero=-3328,bai=19823,impuestos=5115,minoritarios=7,beneficio_neto=14701,gastos_financieros=None,participadas_en_ebitda=None,no_recurrentes_en_ebitda=1513,bpa=13.23,dpa=6.40,dpa_extraordinario=0,acciones_diluidas=1111),
]
A = {
 "_estado": "completo (cifras de extractos de búsqueda)",
 "negocio": {
  "segmentos": [],
  "geografias": [],
  "kpis": [
   {"kpi":"Crecimiento orgánico","valor_anterior":"3 % (2025)","valor_actual":"4 % (2T26); ≈3 % (1S26)","variacion":"+1 punto","comentario":"EMEIA fuerte, Américas, Global Technologies y Entrance Systems buenas; Asia-Pacífico cae [2, 3]."},
   {"kpi":"Crecimiento por compras","valor_anterior":"5 % (2025, 23 compras)","valor_actual":"2 % (2T26); 5 compras con ≈2.000 M SEK de ventas anuales en el 2T","variacion":"−3 puntos","comentario":"El ritmo de compras sigue, con piezas más pequeñas [1, 2]."},
   {"kpi":"Efecto divisa en ventas","valor_anterior":"−7 % (2025)","valor_actual":"−3 % (2T26); ≈−6 % (1S26)","variacion":"menos negativo","comentario":"La corona fuerte resta ventas y beneficio al convertir [1, 3]."},
   {"kpi":"Margen EBITA","valor_anterior":"17,2 % (2025); 17,2 % (2T25)","valor_actual":"18,1 % (2T26)","variacion":"+0,9 puntos","comentario":"Récord; apalancamiento operativo con crecimiento orgánico del 4 % [2]."},
   {"kpi":"Conversión de caja (flujo operativo / beneficio)","valor_anterior":"110 % (2024)","valor_actual":"106 % (2025)","variacion":"−4 puntos","comentario":"Flujo operativo de la empresa de 22.660 M SEK en 2025 [9]."},
  ],

 },
 "financieros": {
  "cuenta": cuenta,
  "ltm": {"periodo":"LTM jun-26","fecha_fin":"2026-06-30","ingresos":151377,"ebitda":31100,"ebit":25000,"beneficio_neto":16376,"bpa":14.74,"dpa":6.40,"dpa_extraordinario":0,"fcf":None,"participadas_en_ebitda":None,"no_recurrentes_en_ebitda":None},
  "cambios_perimetro": [{"periodo":"2023","descripcion":"HHI (herrajes y cerraduras residenciales de Spectrum Brands, USD 4.300 M), consolidada desde mediados de 2023: el balance de 2023 la incluye entera y la cuenta solo medio año [16, 5]."}],
  "confianza":"Media",
 },
 "trimestres": {
  "items": [
   {"periodo":"1T25","ingresos":37949,"crecimiento_pct":None,"crecimiento_organico_pct":None,"ebitda":None,"margen_ebitda_pct":None,"bpa":3.19,"vs_consenso":None},
   {"periodo":"2T25","ingresos":38015,"crecimiento_pct":None,"crecimiento_organico_pct":None,"ebitda":None,"margen_ebitda_pct":None,"bpa":3.57,"vs_consenso":None},
   {"periodo":"1T26","ingresos":35672,"crecimiento_pct":-6.0,"crecimiento_organico_pct":2.0,"ebitda":None,"margen_ebitda_pct":None,"bpa":3.18,"vs_consenso":None},
   {"periodo":"2T26","ingresos":39259,"crecimiento_pct":3.3,"crecimiento_organico_pct":4.0,"ebitda":None,"margen_ebitda_pct":None,"bpa":3.98,"vs_consenso":"Superior"},
  ],
  "confianza":"Media",
 },
 "balance": {
  "historico": [
   dict(periodo="2021",activo_total=129975,activo_corriente=39267,pasivo_corriente=31276,pasivo_total=60375,fondo_comercio=62500,intangibles=None,inmovilizado_material=None,existencias=None,clientes=17564,proveedores=None,activos_contrato=None,pasivos_contrato=None,caja=4333,deuda_financiera=28800,arrendamientos=0,patrimonio_neto=69600,minoritarios=None,reservas=None),
   dict(periodo="2022",activo_total=154564,activo_corriente=None,pasivo_corriente=None,pasivo_total=68564,fondo_comercio=75900,intangibles=None,inmovilizado_material=None,existencias=None,clientes=None,proveedores=None,activos_contrato=None,pasivos_contrato=None,caja=3417,deuda_financiera=33700,arrendamientos=0,patrimonio_neto=86000,minoritarios=None,reservas=None),
   dict(periodo="2023",activo_total=196351,activo_corriente=None,pasivo_corriente=None,pasivo_total=104751,fondo_comercio=92900,intangibles=None,inmovilizado_material=None,existencias=18600,clientes=20930,proveedores=11320,activos_contrato=None,pasivos_contrato=None,caja=1702,deuda_financiera=59760,arrendamientos=5440,patrimonio_neto=91600,minoritarios=None,reservas=72130),
   dict(periodo="2024",activo_total=223605,activo_corriente=None,pasivo_corriente=None,pasivo_total=116505,fondo_comercio=None,intangibles=None,inmovilizado_material=None,existencias=21020,clientes=23440,proveedores=12590,activos_contrato=None,pasivos_contrato=None,caja=4529,deuda_financiera=66940,arrendamientos=6560,patrimonio_neto=107100,minoritarios=None,reservas=81820),
   dict(periodo="2025",activo_total=208371,activo_corriente=49395,pasivo_corriente=47920,pasivo_total=106771,fondo_comercio=None,intangibles=137958,inmovilizado_material=None,existencias=19247,clientes=23153,proveedores=11030,activos_contrato=None,pasivos_contrato=None,caja=1404,deuda_financiera=73200,arrendamientos=0,patrimonio_neto=101600,minoritarios=None,reservas=None),
  ],
  "vencimientos": [],
  "liquidez":"Caja de ≈1.400 M SEK a cierre de 2025 [6] y una línea de crédito sindicada (RCF) de 1.600 M EUR sin disponer a 30-jun-2026 [15].",
  "rating":None,
  "coste_deuda_pct":4.3,
  "vida_media_anios":None,
  "confianza":"Media",
 },
 "flujos": {
  "historico": [
   dict(periodo="2021",flujo_operativo=12456,capex=1713,pagos_arrendamientos=None,adquisiciones=2121,desinversiones=0,dividendos=4333,recompras=0,emision_acciones=0,intereses_en_financiacion=0),
   dict(periodo="2022",flujo_operativo=14357,capex=1996,pagos_arrendamientos=None,adquisiciones=8583,desinversiones=0,dividendos=4666,recompras=0,emision_acciones=0,intereses_en_financiacion=0),
   dict(periodo="2023",flujo_operativo=21294,capex=2639,pagos_arrendamientos=None,adquisiciones=53566,desinversiones=0,dividendos=5332,recompras=0,emision_acciones=0,intereses_en_financiacion=0),
   dict(periodo="2024",flujo_operativo=21391,capex=2562,pagos_arrendamientos=1440,adquisiciones=12136,desinversiones=0,dividendos=5999,recompras=0,emision_acciones=0,intereses_en_financiacion=0),
   dict(periodo="2025",flujo_operativo=21412,capex=2773,pagos_arrendamientos=1740,adquisiciones=11409,desinversiones=0,dividendos=6563,recompras=0,emision_acciones=0,intereses_en_financiacion=0),
  ],
  "confianza":"Media",
 },
 "calidad": {"auditor":None,"anios_auditor":None,"opinion":None,"confianza":"Baja"},
 "capital": {
  "adquisiciones": [
   {"anio":"2023","objetivo":"HHI (Hardware and Home Improvement de Spectrum Brands: Kwikset, Weiser, Baldwin; residencial EE. UU.)","importe":37000,"ev_ebitda":14.0,"financiacion":"Caja y deuda nueva","resultado":"Anunciada en sept-2021 por USD 4.300 M (14x el EBITDA ajustado esperado; ≈10x neto de ventajas fiscales y con sinergias); cerrada en 2023 tras el litigio con el DOJ. El salto de la deuda de 33.700 a 59.760 M SEK y del fondo de comercio de 75.900 a 92.900 M en 2023 es esta compra [16, 5, 8, 11]. Importe en SEK, estimación propia al tipo de 2021 (≈8,6 SEK/USD)."},
   {"anio":"2025","objetivo":"23 compras (bolt-on) en el año","importe":11409,"ev_ebitda":None,"financiacion":"Caja operativa y deuda","resultado":"Aportaron un 5 % de crecimiento (6.576 M SEK de ventas en el año) [1, 17]; pago en caja de 11.409 M [5]."},
   {"anio":"2026","objetivo":"Compras del 1S26 (cinco en el 2T con ≈2.000 M SEK de ventas anuales)","importe":None,"ev_ebitda":None,"financiacion":"Caja operativa y deuda","resultado":"Aportan un 2 % de crecimiento en el 2T26 [2, 3]."},
  ],
  "confianza":"Media",
 },
 "fuentes": fA,
 "huecos": [
  {"seccion":"negocio","campo":"segmentos (cinco divisiones: EMEIA, Americas, Asia Pacific, Global Technologies, Entrance Systems) con ventas y EBIT de 5 años","tipo":"Núcleo","intentos":"1) Informe del 4T25 en Cision: la búsqueda solo devolvió el resumen del grupo; 2) presentación del 2T26: solo comentarios cualitativos por división; 3) informe anual 2025 buscado por división: sin cifras en el extracto","decision":"Omitido"},
  {"seccion":"negocio","campo":"geografias","tipo":"Complemento","intentos":"1) Informe anual 2025; 2) presentación del 2T26; 3) proveedores de datos: sin desglose en los extractos","decision":"Omitido"},
  {"seccion":"balance","campo":"desglose completo 2021-2025 (existencias, proveedores, arrendamientos de 2021, 2022 y 2025, inmovilizado), vencimientos y rating","tipo":"Núcleo","intentos":"1) Informes anuales de ASSA ABLOY: extractos sin balance; 2) Stockopedia, Stock Analysis y Tracenable: solo partidas sueltas; 3) TipRanks y Kalkine: deuda total y fondo de comercio; arrendamientos solo 2023-2024","decision":"Calculado y marcado como estimación"},
  {"seccion":"calidad","campo":"auditor, años y opinión","tipo":"Complemento","intentos":"1) Informe anual 2025 (no abre); 2) búsqueda del informe de auditoría: sin resultado útil; 3) presupuesto de búsquedas compartido agotándose","decision":"Omitido"},
 ],
}
w('A', A)

# ---------------- B. Sector y competencia ----------------
fB = [
 {"id":1,"titulo":"Access Control Market Size, Share & Trends (USD 10.620 M en 2025 a 15.800 M en 2030, 8,3 %)","editor":"MarketsandMarkets","tipo":"Sectorial","fecha":"2025","url":"https://www.marketsandmarkets.com/ResearchInsight/access-control-market-size.asp"},
 {"id":2,"titulo":"Access Control Market global report (USD 13.100 M en 2025, 8,1 % anual a 2032)","editor":"The Report Cubes","tipo":"Sectorial","fecha":"2025","url":"https://www.thereportcubes.com/public/report-store/access-control-market-global-report"},
 {"id":3,"titulo":"Q2 Presentation 2026","editor":"ASSA ABLOY","tipo":"Primaria","fecha":"2026-07-17","url":"https://www.assaabloy.com/group/en/documents/investors/interim-presentations/2026/Q2%20Presentation%202026.pdf"},
 {"id":4,"titulo":"Global Access Control Market to Hit $15.8 Billion by 2030","editor":"Asadria","tipo":"Prensa","fecha":"2025","url":"https://www.asadria.com/?p=23746"},
 {"id":5,"titulo":"ASSA ABLOY acquires the HHI division of Spectrum Brands for MUSD 4300","editor":"Security World Market","tipo":"Prensa","fecha":"2021-09","url":"https://www.securityworldmarket.com/int/News/Business-News/assa-abloy-acquires-the-hhi-division-of-spectrum-brands-for-musd-4300"},
]
B = {
 "historia": {"hitos":[{"anio":"2021","hito":"Anuncia la compra de HHI de Spectrum Brands (Kwikset, Weiser, Baldwin) por USD 4.300 M, su mayor operación [5]."},{"anio":"2023","hito":"Cierra la compra de HHI y entra de lleno en la cerradura residencial de EE. UU. [5]."},{"anio":"2025","hito":"23 compras en el año, que aportan un 5 % de crecimiento [3]."}],"confianza":"Baja"},
 "sector": {
  "tamano":"Control de accesos (hardware, software y servicios): USD 10.620 M en 2025 según MarketsandMarkets [1] y USD 13.100 M según The Report Cubes [2]; ambos por debajo de las ventas de ASSA ABLOY, porque el mercado de cerraduras mecánicas, puertas, puertas automáticas e identificación es mucho mayor que el «control de accesos» de estos estudios.",
  "unidad_serie":"millones de USD",
  "serie":[{"anio":"2025","tamano":10620},{"anio":"2030e","tamano":15800}],
  "tcac_historico_pct":None,"tcac_previsto_pct":8.3,"cr5_pct":None,"estructura":"Moderadamente concentrada",
  "confianza":"Baja",
 },
 "competencia": {
  "competidores":[
   {"nombre":"Allegion","pais":"Irlanda / EE. UU.","ticker":"ALLE","ingresos":None,"cuota_pct":None,"margen_ebit_pct":None,"comentario":"Cerraduras y control de accesos (Schlage, Von Duprin); el comparable más puro, fuerte en institucional de EE. UU."},
   {"nombre":"dormakaba","pais":"Suiza","ticker":"DOKA","ingresos":None,"cuota_pct":None,"margen_ebit_pct":None,"comentario":"Cerraduras, puertas automáticas y control de accesos; margen inferior y en plan de mejora."},
   {"nombre":"Fortune Brands Innovations","pais":"EE. UU.","ticker":"FBIN","ingresos":None,"cuota_pct":None,"margen_ebit_pct":None,"comentario":"Master Lock y, desde 2023, Yale y August en EE. UU. y Canadá, que ASSA ABLOY tuvo que vender para cerrar HHI."},
   {"nombre":"Johnson Controls","pais":"Irlanda / EE. UU.","ticker":"JCI","ingresos":None,"cuota_pct":None,"margen_ebit_pct":None,"comentario":"Seguridad y control de accesos electrónico dentro de soluciones de edificio [1]."},
   {"nombre":"Honeywell","pais":"EE. UU.","ticker":"HON","ingresos":None,"cuota_pct":None,"margen_ebit_pct":None,"comentario":"Control de accesos electrónico dentro de automatización de edificios [1]."},
  ],
  "confianza":"Baja",
 },
 "fuentes": fB,
 "huecos":[
  {"seccion":"sector","campo":"tamaño del mercado de cerraduras, puertas y accesos (perímetro de ASSA ABLOY) y CR5","tipo":"Núcleo","intentos":"1) Informe anual 2025 (cuota declarada): no abre; 2) estudios de control de accesos: perímetro más estrecho que las ventas de la empresa; 3) informe de cerraduras de control de accesos (USD 989 M en 2023): segmento demasiado pequeño","decision":"Omitido"},
  {"seccion":"competencia","campo":"ingresos y margen EBIT de los competidores","tipo":"Núcleo","intentos":"1) Búsquedas de múltiplos de Allegion y dormakaba: solo PER; 2) MarketScreener: sin cuentas en el extracto; 3) presupuesto de búsquedas compartido","decision":"Omitido"},
  {"seccion":"esg","campo":"calificaciones y controversias","tipo":"Complemento","intentos":"1) Informe de sostenibilidad 2025: no abre; 2) búsqueda de MSCI/Sustainalytics: sin resultado; 3) prensa: sin controversias halladas","decision":"Omitido"},
 ],
}
w('B', B)

# ---------------- C. Equipo y gobierno ----------------
fC = [
 {"id":1,"titulo":"Q2 report 2026 (presentación con Nico Delvaux, CEO, y Erik Pieder, CFO)","editor":"ASSA ABLOY","tipo":"Primaria","fecha":"2026-07-17","url":"https://www.assaabloy.com/group/en/investors/reports-presentations/interim-reports/q2-2026"},
 {"id":2,"titulo":"ASSA ABLOY company shareholders","editor":"MarketScreener","tipo":"Datos de mercado","fecha":"2026-10","url":"https://uk.marketscreener.com/quote/stock/ASSA-ABLOY-AB-22363198/company-shareholders/"},
 {"id":3,"titulo":"ASSA ABLOY ownership","editor":"Simply Wall St","tipo":"Datos de mercado","fecha":"2026-10","url":"https://simplywall.st/stocks/de/capital-goods/fra-alz/assa-abloy-shares/ownership"},
 {"id":4,"titulo":"ASSA ABLOY management","editor":"Simply Wall St","tipo":"Datos de mercado","fecha":"2026-10","url":"https://simplywall.st/stocks/se/capital-goods/sto-assa-b/assa-abloy-shares/management"},
]
C = {
 "directivos": {
  "equipo":[
   {"nombre":"Nico Delvaux","cargo":"Presidente y consejero delegado (President & CEO)","desde":"2018","participacion_pct":None,"trayectoria":"Dirige el grupo desde 2018 tras llevar la división Entrance Systems; presenta los resultados con el director financiero [1]. Bajo su mando, compra de HHI y ventas de 152.409 M SEK en 2025 frente a 95.007 M en 2021."},
   {"nombre":"Erik Pieder","cargo":"Director financiero (CFO)","desde":None,"participacion_pct":None,"trayectoria":"Director financiero que presenta los resultados trimestrales con el CEO [1]."},
  ],
  "historial_guidance":[],
  "confianza":"Baja",
 },
 "gobierno": {
  "consejo":[],
  "presidente_ceo_separados":True,"presidente_ejecutivo":False,"consejero_coordinador":None,"una_accion_un_voto":False,
  "operaciones_vinculadas_relevantes":False,"variable_ligado_rentabilidad":None,"auditoria_independiente":None,"insiders_sin_operaciones":None,
  "accionista_control":True,"presidente_vinculado_control":None,"cambios_cupula_24m":0,
  "voto_remuneracion_pct":None,"voto_remuneracion_contra_pct":None,"voto_remuneracion_contra_libre_pct":None,"voto_cupula_pct":None,
  "remuneracion_ceo":None,
  "accionistas":[
   {"nombre":"Investment AB Latour","pct":9.49,"tipo":"Accionista de referencia (acciones A y B)","variacion":"Sin cambios relevantes conocidos; MarketScreener da 5,33 % con otra base de capital [2, 3]"},
   {"nombre":"Melker Schörling AB","pct":3.06,"tipo":"Accionista de referencia (acciones A y B)","variacion":"Sin cambios conocidos [3]"},
   {"nombre":"Swedbank Robur Fonder","pct":None,"tipo":"Institucional","variacion":"Segundo en la lista de MarketScreener [2]"},
  ],
  "insiders":[],
  "alertas":["Acciones A con diez votos frente a uno de las B: Latour y Melker Schörling AB pesan en votos bastante más que su 9,5 % y 3,1 % del capital [2, 3]."],
  "confianza":"Baja",
 },
 "fuentes": fC,
 "huecos":[
  {"seccion":"gobierno","campo":"consejo completo, votos en junta, remuneración del CEO, operaciones de directivos y porcentaje de votos de Latour y MSAB","tipo":"Núcleo","intentos":"1) Informe anual y de remuneraciones 2025: no abren desde la nube; 2) MarketScreener y Simply Wall St: solo capital, sin votos; 3) búsqueda de la remuneración de Nico Delvaux y del presidente del consejo: sin resultado fiable","decision":"Omitido"},
  {"seccion":"directivos","campo":"historial de cumplimiento de objetivos","tipo":"Complemento","intentos":"1) Objetivos financieros (10 % de crecimiento y 16-17 % de margen EBITA) en el informe anual: no abre; 2) presentaciones trimestrales: sin tabla; 3) prensa: sin serie","decision":"Omitido"},
 ],
}
w('C', C)

# ---------------- D. Mercado y valoración ----------------
fD = [
 {"id":1,"titulo":"Assa Abloy B stock trades at EUR 31.23 with SEK 388.4 billion market value / cotización del 14-oct-2026 (353,10 SEK, capitalización 392.200 M SEK)","editor":"ad-hoc-news","tipo":"Prensa","fecha":"2026-10-14","url":"https://www.ad-hoc-news.de/boerse/news/corporate-news/assa-abloy-b-stock-trades-at-eur-31-23-with-sek-388-4-billion-market-value/70280242"},
 {"id":2,"titulo":"Assa Abloy stock heads toward its October 27 results","editor":"ad-hoc-news","tipo":"Prensa","fecha":"2026-10","url":"https://www.ad-hoc-news.de/boerse/news/corporate-news/assa-abloy-stock-heads-toward-its-october-27-results/70255245"},
 {"id":3,"titulo":"Goldman Sachs raises target for Assa Abloy stock to SEK 392 (Neutral)","editor":"ad-hoc-news","tipo":"Prensa","fecha":"2026-10-13","url":"https://www.ad-hoc-news.de/boerse/news/corporate-news/goldman-sachs-raises-target-for-assa-abloy-stock-to-sek-392/70322656"},
 {"id":4,"titulo":"ASSA ABLOY valuation (PER y EV/EBITDA 2021-2028)","editor":"MarketScreener","tipo":"Datos de mercado","fecha":"2026-10-02","url":"https://ca.marketscreener.com/quote/stock/ASSA-ABLOY-AB-22363198/valuation/"},
 {"id":5,"titulo":"ASSA ABLOY finances (BPA 2021-2028e y margen EBIT)","editor":"MarketScreener","tipo":"Datos de mercado","fecha":"2026-10","url":"https://uk.marketscreener.com/quote/stock/ASSA-ABLOY-AB-22363198/finances/"},
 {"id":6,"titulo":"ASSA ABLOY consensus estimates","editor":"Investing.com","tipo":"Datos de mercado","fecha":"2026-10","url":"https://www.investing.com/equities/assa-abloy-consensus-estimates"},
 {"id":7,"titulo":"Assa Abloy Kursziel (24 analistas, BPA 2026e 15,77)","editor":"aktien.guide","tipo":"Datos de mercado","fecha":"2026-10","url":"https://aktien.guide/kursziel/Assa-Abloy-SE0007100581"},
 {"id":8,"titulo":"Höjd genomsnittlig riktkurs för Assa Abloy efter rapport (feb-2026: 396,62 SEK)","editor":"Affärsvärlden","tipo":"Prensa","fecha":"2026-02","url":"https://www.affarsvarlden.se/aktierekar/hojd-genomsnittlig-riktkurs-for-assa-abloy-efter-rapport"},
 {"id":9,"titulo":"Sweden 10Y bond yield hits 32-month high (2,98 %)","editor":"Trading Economics","tipo":"Datos de mercado","fecha":"2026-07-21","url":"https://tradingeconomics.com/sweden/government-bond-yield/news/568580"},
 {"id":10,"titulo":"Allegion forward P/E","editor":"valueinvesting.io","tipo":"Datos de mercado","fecha":"2026-10","url":"https://valueinvesting.io/ALLE/metric/forward-pe"},
 {"id":11,"titulo":"Schindler valuation (PER 2026e)","editor":"MarketScreener","tipo":"Datos de mercado","fecha":"2026-10","url":"https://uk.marketscreener.com/quote/stock/SCHINDLER-HOLDING-AG-41754375/valuation/"},
 {"id":12,"titulo":"Legrand valuation (PER 2026e-2027e)","editor":"MarketScreener","tipo":"Datos de mercado","fecha":"2026-10","url":"https://www.marketscreener.com/quote/stock/LEGRAND-491568/valuation/"},
 {"id":13,"titulo":"dormakaba (PER 2026e-2027e)","editor":"MarketScreener","tipo":"Datos de mercado","fecha":"2026-10","url":"https://hk.marketscreener.com/quote/stock/DORMAKABA-113582650/"},
 {"id":14,"titulo":"Informes Halma y Spirax del 14-oct-2026 de este repositorio (PER NTM de Atlas Copco, Indutrade, IMI y Halma, con sus fuentes)","editor":"Este repositorio","tipo":"Datos de mercado","fecha":"2026-10-14","url":"informes/halma-2026-10-14/datos.json; informes/spirax-2026-10-14/datos.json"},
 {"id":15,"titulo":"Damodaran, Implied ERP by month (ERPbymonth.xlsx), oct-2026: 4,20 %","editor":"NYU Stern","tipo":"Datos de mercado","fecha":"2026-10","url":"https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx"},
 {"id":16,"titulo":"ASSA ABLOY dividends (precio en fechas de dividendo)","editor":"Digrin","tipo":"Datos de mercado","fecha":"2026-10","url":"https://digrin.com/stocks/detail/ASSA-B.ST/"},
 {"id":17,"titulo":"ASSA ABLOY to acquire HHI (14x EBITDA ajustado esperado de 2021)","editor":"Spectrum Brands, Form 8-K","tipo":"Primaria","fecha":"2021-09-08","url":"https://www.sec.gov/Archives/edgar/data/109177/000010917721000048/exhibit991-2021_09x08xsecu.htm"},
]
D_ = {
 "identificacion": {"nombre":"ASSA ABLOY AB (publ)","nombre_corto":"ASSA ABLOY","ticker":"ASSA B","isin":"SE0007100581","mercado":"Nasdaq Stockholm (Large Cap)","indice_referencia":"OMX Stockholm 30","pais":"Suecia","pais_iso":"SE","sector":"Industria","industria":"Productos de construcción (cerraduras, puertas y control de accesos)","sede":"Estocolmo (Suecia)","fundacion":"1994","empleados":None,"web":"www.assaabloy.com","precio":353.10,"fecha_precio":"2026-10-14","acciones":1111,"capitalizacion_publicada":392200,"free_float_pct":None,"max_52s":396.90,"min_52s":314.20,"volumen_medio_diario":None,"proximos_resultados":"2026-10-27"},
 "consenso": {
  "estimaciones":[
   {"periodo":"2026e","ingresos":None,"ebitda":None,"ebit":None,"bpa":15.31,"dpa":None,"fuente":"MarketScreener [5]; margen EBIT del 16,6 %"},
   {"periodo":"2027e","ingresos":None,"ebitda":None,"ebit":None,"bpa":17.06,"dpa":None,"fuente":"MarketScreener [5]; margen EBIT del 17,0 %"},
   {"periodo":"2028e","ingresos":None,"ebitda":None,"ebit":None,"bpa":18.62,"dpa":None,"fuente":"MarketScreener [5]; margen EBIT del 17,3 %"},
  ],
  "recomendaciones":{"n_analistas":22,"comprar":14,"mantener":8,"vender":0,"po_medio":408.8,"po_min":340,"po_max":500},
  "base_ebitda":"NIIF","ajuste_ebitda_pct_ventas":None,
  "confianza":"Media",
 },
 "multiplos_historicos": {"serie":[
   {"anio":"2021","precio_cierre":276.6,"ev_ebitda_ntm":None,"per_ntm":None,"excluir":True},
   {"anio":"2022","precio_cierre":223.8,"ev_ebitda_ntm":None,"per_ntm":None,"excluir":False},
   {"anio":"2023","precio_cierre":290.8,"ev_ebitda_ntm":None,"per_ntm":None,"excluir":False},
   {"anio":"2024","precio_cierre":326.7,"ev_ebitda_ntm":None,"per_ntm":None,"excluir":False},
   {"anio":"2025","precio_cierre":358.5,"ev_ebitda_ntm":None,"per_ntm":None,"excluir":False},
  ],"confianza":"Media"},
 "comparables": {"empresas":[
   {"nombre":"Allegion","ticker":"ALLE","pais":"US","capitalizacion":None,"ev_ventas":None,"ev_ebitda_ltm":None,"ev_ebitda_ntm":None,"per_ntm":20.6,"crecimiento_pct":None,"margen_ebitda_pct":None,"roic_pct":None,"dn_ebitda":None,"fcf_yield_pct":None},
   {"nombre":"dormakaba","ticker":"DOKA","pais":"CH","capitalizacion":None,"ev_ventas":None,"ev_ebitda_ltm":None,"ev_ebitda_ntm":None,"per_ntm":18.6,"crecimiento_pct":None,"margen_ebitda_pct":None,"roic_pct":None,"dn_ebitda":None,"fcf_yield_pct":None},
   {"nombre":"Schindler","ticker":"SCHP","pais":"CH","capitalizacion":None,"ev_ventas":None,"ev_ebitda_ltm":None,"ev_ebitda_ntm":None,"per_ntm":24.5,"crecimiento_pct":None,"margen_ebitda_pct":None,"roic_pct":None,"dn_ebitda":None,"fcf_yield_pct":None},
   {"nombre":"Legrand","ticker":"LR","pais":"FR","capitalizacion":None,"ev_ventas":None,"ev_ebitda_ltm":None,"ev_ebitda_ntm":None,"per_ntm":23.9,"crecimiento_pct":None,"margen_ebitda_pct":None,"roic_pct":None,"dn_ebitda":None,"fcf_yield_pct":None},
   {"nombre":"Atlas Copco","ticker":"ATCO A","pais":"SE","capitalizacion":None,"ev_ventas":None,"ev_ebitda_ltm":None,"ev_ebitda_ntm":None,"per_ntm":28.3,"crecimiento_pct":None,"margen_ebitda_pct":None,"roic_pct":None,"dn_ebitda":None,"fcf_yield_pct":None},
   {"nombre":"Indutrade","ticker":"INDT","pais":"SE","capitalizacion":None,"ev_ventas":None,"ev_ebitda_ltm":None,"ev_ebitda_ntm":None,"per_ntm":28.0,"crecimiento_pct":None,"margen_ebitda_pct":None,"roic_pct":None,"dn_ebitda":None,"fcf_yield_pct":None},
   {"nombre":"Halma","ticker":"HLMA","pais":"GB","capitalizacion":None,"ev_ventas":None,"ev_ebitda_ltm":None,"ev_ebitda_ntm":None,"per_ntm":29.0,"crecimiento_pct":None,"margen_ebitda_pct":None,"roic_pct":None,"dn_ebitda":None,"fcf_yield_pct":None},
   {"nombre":"IMI","ticker":"IMI","pais":"GB","capitalizacion":None,"ev_ventas":None,"ev_ebitda_ltm":None,"ev_ebitda_ntm":None,"per_ntm":21.9,"crecimiento_pct":None,"margen_ebitda_pct":None,"roic_pct":None,"dn_ebitda":None,"fcf_yield_pct":None},
  ],"confianza":"Baja"},
 "transacciones": {"operaciones":[
   {"fecha":"2021-09","objetivo":"HHI (Spectrum Brands)","comprador":"ASSA ABLOY","ev":37000,"ev_ventas":None,"ev_ebitda":14.0,"prima_pct":None,"excluir":False,"comentario":"USD 4.300 M; 14x el EBITDA ajustado esperado de 2021 (≈10x neto de ventajas fiscales y con sinergias) [17]. EV en SEK, estimación propia a ≈8,6 SEK/USD."},
  ],"confianza":"Baja"},
 "fuentes": fD,
 "huecos":[
  {"seccion":"bolsa","campo":"rentabilidades, beta, volatilidad, caída máxima y posición corta","tipo":"Complemento","intentos":"1) bolsa.mjs (Yahoo): sin red en la nube; 2) búsqueda de beta y rentabilidad: cifras sin fecha y discrepantes; 3) Finansinspektionen (cortos): no abre","decision":"Omitido"},
  {"seccion":"transacciones","campo":"operaciones 2-5 con múltiplo (Yale/August a Fortune Brands, compras de dormakaba y Allegion)","tipo":"Complemento","intentos":"1) Búsqueda de la venta de Yale/August (USD 800 M): sin múltiplo; 2) compras de Allegion y dormakaba: sin resultados; 3) presupuesto de búsquedas compartido","decision":"Omitido"},
  {"seccion":"comparables","campo":"capitalización, EV/EBITDA, crecimiento, margen y ROIC de los comparables","tipo":"Núcleo","intentos":"1) MarketScreener de cada comparable: solo PER en el extracto; 2) valueinvesting y Benzinga (Allegion): PER y capitalización sin fecha; 3) informes de Halma y Spirax del repositorio: solo PER","decision":"Omitido"},
  {"seccion":"identificacion","campo":"cierre del 13-oct-2026","tipo":"Complemento","intentos":"1) bolsa.mjs: sin red; 2) búsqueda del cierre: solo cotizaciones intradía; 3) ad-hoc-news: 353,10 SEK a las 08:51 UTC del 14-oct, usado","decision":"Calculado y marcado como estimación"},
 ],
}
w('D', D_)

# ---------------- E. Sentimiento ----------------
fE = [
 {"id":1,"titulo":"Assa Abloy B: foro de la acción (Nordnet Social)","editor":"Nordnet","tipo":"Foros y redes","fecha":"2026-10","url":"https://www.nordnet.se/aktier/kurser/assa-abloy-b-assa-b-xsto"},
 {"id":2,"titulo":"ASSA ABLOY (OM:ASSA B) Earnings put its valuation story back in focus (narrativa de la comunidad, valor ≈401 SEK)","editor":"Simply Wall St / Webull","tipo":"Foros y redes","fecha":"2026-07","url":"https://www.webull.com/news/15305856882861056"},
 {"id":3,"titulo":"Assa Abloy (OSTO:ASSA B) GF Value y GF Score","editor":"GuruFocus","tipo":"Foros y redes","fecha":"2026-07","url":"https://www.gurufocus.com/term/earning-yield/OSTO:ASSA B"},
 {"id":4,"titulo":"Barclays raises Assa Abloy target / Goldman Sachs raises target to SEK 392 (comentarios de mercado)","editor":"ad-hoc-news","tipo":"Prensa","fecha":"2026-10","url":"https://www.ad-hoc-news.de/boerse/news/corporate-news/barclays-raises-assa-abloy-target-as-assa-abloy-stock-costs-eur-31-14/70252910"},
 {"id":5,"titulo":"Pareto y Deutsche Bank repiten mantener en Assa Abloy","editor":"Affärsvärlden","tipo":"Prensa","fecha":"2026","url":"https://www.affarsvarlden.se/aktierekar/analysuppdateringar-for-assa-abloy-pareto-och-deutsche-bank-upprepar-behall"},
]
E = {
 "sentimiento": {
  "tono":"Dividido","tendencia":"Estable",
  "revisadas":[
   {"plataforma":"Nordnet Social (foro de la acción, Suecia)","fecha":"2026-10","n_comentarios":15,"tono":"Dividido","resumen":"Un grupo la ve cara (EV/EBITDA por encima de 15 y PER por encima de 26) y otro la trata como valor de dividendo creciente a largo plazo, con quince años de subidas del dividendo y compras continuas [1]."},
   {"plataforma":"Simply Wall St (narrativas de la comunidad)","fecha":"2026-07","n_comentarios":5,"tono":"Positivo","resumen":"Tras el 2T26 la narrativa de la comunidad sitúa el valor en torno a 401 SEK, por encima de la cotización, y destaca las compras recientes [2]."},
   {"plataforma":"GuruFocus (comunidad y valoración)","fecha":"2026-07","n_comentarios":3,"tono":"Neutro","resumen":"La considera «a su precio justo»: GF Value de ≈328 SEK frente a ≈335 SEK de cotización en julio, con alta puntuación de calidad [3]."},
   {"plataforma":"Prensa de mercado con comentarios (ad-hoc-news, Affärsvärlden)","fecha":"2026-10","n_comentarios":6,"tono":"Neutro","resumen":"Subidas de precio objetivo antes del 3T (Barclays, Goldman a 392 SEK con neutral) y varios «mantener» de bancos nórdicos: se espera un buen trimestre pero se discute el múltiplo [4, 5]."},
  ],
  "temas":[
   {"tema":"Valoración exigente (PER 26x histórico)","postura":"Bajista","peso":"Alto","contraste":None},
   {"tema":"Compounder de dividendos y compras en serie","postura":"Alcista","peso":"Alto","contraste":None},
   {"tema":"Residencial de EE. UU. y aranceles","postura":"Dividida","peso":"Medio","contraste":None},
   {"tema":"Efecto de la corona fuerte","postura":"Bajista","peso":"Medio","contraste":None},
  ],
  "confianza":"Baja",
 },
 "fuentes": fE,
 "huecos":[
  {"seccion":"sentimiento","campo":"Reddit, Seeking Alpha, Stocktwits, Placera y Flashback","tipo":"Complemento","intentos":"1) Búsqueda en Reddit y Seeking Alpha de 2026: sin hilos; 2) Placera, Avanza y Flashback en sueco: sin hilos recientes; 3) WebFetch de las API de Stocktwits y Seeking Alpha: sin red en la nube","decision":"Omitido"},
 ],
}
w('E', E)
print('ok')

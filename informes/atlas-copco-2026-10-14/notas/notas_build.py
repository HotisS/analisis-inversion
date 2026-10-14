# Genera las notas A-E de Atlas Copco (corte 2026-10-14). Solo hechos de los resultados de búsqueda, con su URL.
import json, os, sys
D = sys.argv[1]
def w(n, o):
    with open(os.path.join(D, n + '.json'), 'w', encoding='utf-8') as f:
        json.dump(o, f, ensure_ascii=False, indent=1)

# ---------------- A. Cuentas ----------------
fA = [
 {"id":1,"titulo":"Interim report on Q4 and full year summary 2025","editor":"Atlas Copco / Cision","tipo":"Primaria","fecha":"2026-01-27","url":"https://www.atlascopcogroup.com/content/dam/brands/atlas-copco-group/cision/20260127-en-Q4_2025.pdf.coredownload.pdf"},
 {"id":2,"titulo":"Second-quarter report 2026: Record order intake, solid revenue and profit growth","editor":"Atlas Copco","tipo":"Primaria","fecha":"2026-07-16","url":"https://www.atlascopcogroup.com/en/media/press-releases/2026/2026-q2"},
 {"id":3,"titulo":"Quarterly results presentation Q2 2026","editor":"Atlas Copco","tipo":"Primaria","fecha":"2026-07-16","url":"https://www.atlascopcogroup.com/content/dam/atlas-copco/group/documents/investors/financial-publications/english/20260716-quarterly-results-presentations-q2-2026-en-fl.pdf.coredownload.inline.pdf"},
 {"id":4,"titulo":"First-quarter report 2026: Organic order and revenue growth driven by vacuum equipment","editor":"Atlas Copco","tipo":"Primaria","fecha":"2026-04-28","url":"https://www.atlascopcogroup.com/en/media/press-releases/2026/2026-q1"},
 {"id":5,"titulo":"Atlas Copco AB (STO:ATCO.A) Income statement 2021-2025","editor":"Stock Analysis","tipo":"Datos de mercado","fecha":"2026-10","url":"https://stockanalysis.com/quote/sto/ATCO.A/financials/income-statement/"},
 {"id":6,"titulo":"Atlas Copco AB (STO:ATCO.A) Cash flow statement 2021-2025 y LTM jun-26","editor":"Stock Analysis","tipo":"Datos de mercado","fecha":"2026-10","url":"https://stockanalysis.com/quote/sto/ATCO.A/financials/cash-flow-statement/"},
 {"id":7,"titulo":"Atlas Copco AB (STO:ATCO.A) Balance sheet 2025","editor":"Stock Analysis","tipo":"Datos de mercado","fecha":"2026-10","url":"https://stockanalysis.com/quote/sto/ATCO.A/financials/balance-sheet/"},
 {"id":8,"titulo":"Annual Report 2025, ESEF (tabla de cifras clave: EBITDA 2021-2025)","editor":"Atlas Copco","tipo":"Primaria","fecha":"2026-03-20","url":"https://www.atlascopcogroup.com/content/dam/atlas-copco/group/documents/investors/financial-publications/english/atla-2025-12-31-1-en-preview.xhtml"},
 {"id":9,"titulo":"President and CEO comments on Q4 report and full-year summary (dividendo 3,00 + 2,00 SEK)","editor":"Atlas Copco","tipo":"Primaria","fecha":"2026-01-27","url":"https://www.atlascopcogroup.com/en/media/press-releases/2026/20260127-ceo-comment"},
 {"id":10,"titulo":"Atlas Copco AB (OSTO:ATCO B) Shares outstanding 4.879 M (jun-2026)","editor":"GuruFocus","tipo":"Datos de mercado","fecha":"2026-07","url":"https://www.gurufocus.com/term/bs-share/OSTO:ATCO B"},
 {"id":11,"titulo":"Interim report Q1 2025 / Q2 2025 (resultado financiero y tipo impositivo trimestral)","editor":"Atlas Copco","tipo":"Primaria","fecha":"2025-07-18","url":"https://www.atlascopcogroup.com/content/dam/atlas-copco/group/documents/investors/financial-publications/english/20250429-q1-2025-handout-en-rs.pdf"},
]
cuenta = [
 dict(periodo="2021",ingresos=110912,coste_ventas=None,gastos_generales=None,ebitda=29025,amortizaciones=5466,ebit=23559,resultado_financiero=None,bai=None,impuestos=None,minoritarios=None,beneficio_neto=18130,gastos_financieros=None,participadas_en_ebitda=None,no_recurrentes_en_ebitda=None,bpa=3.72,dpa=1.90,dpa_extraordinario=0,acciones_diluidas=4871),
 dict(periodo="2022",ingresos=141325,coste_ventas=None,gastos_generales=None,ebitda=36549,amortizaciones=6333,ebit=30216,resultado_financiero=None,bai=None,impuestos=None,minoritarios=None,beneficio_neto=23477,gastos_financieros=None,participadas_en_ebitda=None,no_recurrentes_en_ebitda=None,bpa=4.82,dpa=2.30,dpa_extraordinario=0,acciones_diluidas=4871),
 dict(periodo="2023",ingresos=172664,coste_ventas=None,gastos_generales=None,ebitda=44852,amortizaciones=7761,ebit=37091,resultado_financiero=None,bai=None,impuestos=None,minoritarios=None,beneficio_neto=28040,gastos_financieros=None,participadas_en_ebitda=None,no_recurrentes_en_ebitda=None,bpa=5.76,dpa=2.80,dpa_extraordinario=0,acciones_diluidas=4871),
 dict(periodo="2024",ingresos=176771,coste_ventas=None,gastos_generales=None,ebitda=46951,amortizaciones=8785,ebit=38166,resultado_financiero=None,bai=None,impuestos=None,minoritarios=None,beneficio_neto=29782,gastos_financieros=None,participadas_en_ebitda=None,no_recurrentes_en_ebitda=None,bpa=6.11,dpa=3.00,dpa_extraordinario=0,acciones_diluidas=4871),
 dict(periodo="2025",ingresos=168343,coste_ventas=None,gastos_generales=None,ebitda=43643,amortizaciones=9529,ebit=34114,resultado_financiero=None,bai=None,impuestos=None,minoritarios=None,beneficio_neto=26420,gastos_financieros=None,participadas_en_ebitda=None,no_recurrentes_en_ebitda=None,bpa=5.43,dpa=3.00,dpa_extraordinario=2.00,acciones_diluidas=4871),
]
A = {
 "_estado": "completo (cifras de extractos de búsqueda)",
 "negocio": {
  "segmentos": [], "geografias": [],
  "kpis": [
   {"kpi":"Pedidos recibidos (crecimiento orgánico)","valor_anterior":"+1 % en equipos (2025); +5 % (1T26)","valor_actual":"+26 % (2T26): 50.951 M SEK, récord","variacion":"+21 puntos","comentario":"Vacío para semiconductores (pedidos de Vacuum Technique ≈+60 %) y crecimiento de dos dígitos en las cuatro áreas [A2, A3]."},
   {"kpi":"Ventas (crecimiento orgánico)","valor_anterior":"+3 % (1T26)","valor_actual":"+8 % (2T26)","variacion":"+5 puntos","comentario":"Ventas de 44.974 M SEK (+9 % publicado) [A2]."},
   {"kpi":"Margen operativo ajustado","valor_anterior":"20,7 % (2025); 20,4 % (2T25)","valor_actual":"21,0 % (2T26)","variacion":"+0,6 puntos","comentario":"Publicado 20,6 %, plano [A2]."},
   {"kpi":"Rentabilidad sobre el capital empleado (ROCE)","valor_anterior":"28 % (2024)","valor_actual":"24 % (2025 y 2T26)","variacion":"−4 puntos","comentario":"Baja por las compras y el menor beneficio de 2025 [A1, A2]."},
   {"kpi":"Compras cerradas","valor_anterior":"—","valor_actual":"29 en 2025","variacion":"—","comentario":"Pago en caja de 11.560 M SEK [A1, A6]."},
  ],
 },
 "financieros": {
  "cuenta": cuenta,
  "ltm": {"periodo":"LTM jun-26","fecha_fin":"2026-06-30","ingresos":169917,"ebitda":None,"ebit":34530,"beneficio_neto":26650,"bpa":5.47,"dpa":5.00,"dpa_extraordinario":2.00,"fcf":None,"participadas_en_ebitda":None,"no_recurrentes_en_ebitda":None},
  "cambios_perimetro": [],
  "confianza":"Media",
 },
 "trimestres": {
  "items": [
   {"periodo":"1T25","ingresos":42730,"crecimiento_pct":None,"crecimiento_organico_pct":None,"ebitda":None,"margen_ebitda_pct":None,"bpa":1.35,"vs_consenso":None},
   {"periodo":"2T25","ingresos":41210,"crecimiento_pct":None,"crecimiento_organico_pct":None,"ebitda":None,"margen_ebitda_pct":None,"bpa":1.34,"vs_consenso":None},
   {"periodo":"3T25","ingresos":41625,"crecimiento_pct":None,"crecimiento_organico_pct":None,"ebitda":None,"margen_ebitda_pct":None,"bpa":1.38,"vs_consenso":None},
   {"periodo":"4T25","ingresos":42778,"crecimiento_pct":None,"crecimiento_organico_pct":None,"ebitda":None,"margen_ebitda_pct":None,"bpa":1.36,"vs_consenso":None},
   {"periodo":"1T26","ingresos":40540,"crecimiento_pct":-5.1,"crecimiento_organico_pct":3.0,"ebitda":None,"margen_ebitda_pct":None,"bpa":1.28,"vs_consenso":None},
   {"periodo":"2T26","ingresos":44974,"crecimiento_pct":9.1,"crecimiento_organico_pct":8.0,"ebitda":None,"margen_ebitda_pct":None,"bpa":1.45,"vs_consenso":None},
  ],
  "confianza":"Media",
 },
 "balance": {
  "historico": [
   dict(periodo="2025",activo_total=202454,activo_corriente=None,pasivo_corriente=None,pasivo_total=92071,fondo_comercio=None,intangibles=77078,inmovilizado_material=None,existencias=None,clientes=None,proveedores=None,activos_contrato=None,pasivos_contrato=None,caja=15523,deuda_financiera=34899,arrendamientos=0,patrimonio_neto=110383,minoritarios=177,reservas=None),
  ],
  "vencimientos": [],
  "liquidez":"Caja de 15.523 M SEK a cierre de 2025 frente a una deuda total de 34.899 M (6.471 M a corto) [A7]: deuda neta de 19.376 M, ≈0,4 veces el EBITDA.",
  "rating":None, "coste_deuda_pct":None, "vida_media_anios":None,
  "confianza":"Baja",
 },
 "flujos": {
  "historico": [
   dict(periodo="2021",flujo_operativo=23152,capex=3359,pagos_arrendamientos=None,adquisiciones=2334,desinversiones=0,dividendos=8889,recompras=0,emision_acciones=0,intereses_en_financiacion=0),
   dict(periodo="2022",flujo_operativo=21377,capex=5031,pagos_arrendamientos=None,adquisiciones=10591,desinversiones=0,dividendos=9250,recompras=0,emision_acciones=0,intereses_en_financiacion=0),
   dict(periodo="2023",flujo_operativo=28084,capex=5451,pagos_arrendamientos=None,adquisiciones=4314,desinversiones=0,dividendos=11203,recompras=0,emision_acciones=0,intereses_en_financiacion=0),
   dict(periodo="2024",flujo_operativo=36887,capex=6024,pagos_arrendamientos=None,adquisiciones=7424,desinversiones=0,dividendos=13647,recompras=0,emision_acciones=0,intereses_en_financiacion=0),
   dict(periodo="2025",flujo_operativo=32566,capex=6187,pagos_arrendamientos=None,adquisiciones=11560,desinversiones=0,dividendos=14606,recompras=0,emision_acciones=0,intereses_en_financiacion=0),
  ],
  "confianza":"Media",
 },
 "calidad": {"auditor":None,"anios_auditor":None,"opinion":None,"confianza":"Baja"},
 "capital": {
  "adquisiciones": [
   {"anio":"2022","objetivo":"Compras de complemento (entre ellas, vacío y compresores)","importe":10591,"ev_ebitda":None,"financiacion":"Caja operativa","resultado":"Pago en caja del año [A6]."},
   {"anio":"2025","objetivo":"29 compras de complemento","importe":11560,"ev_ebitda":None,"financiacion":"Caja operativa","resultado":"Pago en caja de 11.560 M SEK, un 6,9 % de las ventas [A1, A6]."},
  ],
  "confianza":"Media",
 },
 "fuentes": fA,
 "huecos": [
  {"seccion":"negocio","campo":"segmentos (Compressor, Vacuum, Industrial y Power Technique) con ventas y margen de 5 años","tipo":"Núcleo","intentos":"1) Informe del 2T26: el extracto solo da el grupo; 2) presentación del 2T26: comentarios cualitativos; 3) informe anual 2025 (ESEF): sin cifras por área en el extracto","decision":"Omitido"},
  {"seccion":"financieros","campo":"resultado financiero, impuestos y minoritarios anuales","tipo":"Núcleo","intentos":"1) Stock Analysis: solo ingresos, EBIT, beneficio y BPA en el extracto; 2) informes trimestrales de 2025: solo trimestres (−135 y −86 M de resultado financiero, tipos del 22 %); 3) informe anual 2025: no abre","decision":"Omitido"},
  {"seccion":"balance","campo":"balance 2021-2024 y desglose de 2025 (fondo de comercio, circulante, arrendamientos), rating y vencimientos","tipo":"Núcleo","intentos":"1) Stock Analysis: solo totales de 2025; 2) Stockopedia: caja de 15.923 M, discrepante; 3) informe anual: no abre desde la nube","decision":"Omitido"},
  {"seccion":"calidad","campo":"auditor, años y opinión","tipo":"Complemento","intentos":"1) Informe anual 2025: no abre; 2) búsqueda: sin resultado; 3) presupuesto de búsquedas compartido","decision":"Omitido"},
 ],
}
w('A', A)

# ---------------- B. Sector y competencia ----------------
fB = [
 {"id":1,"titulo":"Semiconductor orders to fuel Atlas Copco's revenue rebound in 2026 (Visible Alpha: pedidos de Vacuum Technique +44 % en 2026)","editor":"S&P Global Market Intelligence","tipo":"Sectorial","fecha":"2026-08-28","url":"https://www.spglobal.com/market-intelligence/en/news-insights/research/2026/08/semiconductor-orders-to-fuel-atlas-copco-s-revenue-rebound-in-2026"},
 {"id":2,"titulo":"Atlas Copco Group (ATCO) Q2 2026 earnings summary","editor":"Quartr","tipo":"Prensa","fecha":"2026-07-16","url":"https://quartr.com/events/atlas-copco-group-atco-q2-2026_3s04yWjI"},
 {"id":3,"titulo":"Dagens industri: Atlas Copco är ett kap (pedidos de vacío +60 % en el 2T26)","editor":"Aktiespararna","tipo":"Prensa","fecha":"2026-07","url":"https://www.aktiespararna.se/nyheter/dagens-industri-atlas-copco-ar-ett-kap"},
]
B = {
 "historia": {"hitos":[{"anio":"1873","hito":"Fundación en Estocolmo; pionera de la compresión de aire."},{"anio":"2018","hito":"Escisión de Epiroc (minería e infraestructuras)."},{"anio":"2022","hito":"Desdoblamiento 4 por 1 de las acciones."},{"anio":"2026","hito":"Pedidos récord en el 2T por el vacío para semiconductores [B2]."}],"confianza":"Baja"},
 "sector": {
  "tamano":None,"unidad_serie":None,"serie":[],
  "tcac_historico_pct":None,"tcac_previsto_pct":None,"cr5_pct":None,"estructura":"Moderadamente concentrada",
  "confianza":"Baja",
 },
 "competencia": {
  "competidores":[
   {"nombre":"Ingersoll Rand","pais":"EE. UU.","ticker":"IR","ingresos":None,"cuota_pct":None,"margen_ebit_pct":None,"comentario":"Segundo en compresores y vacío industrial; también comprador en serie."},
   {"nombre":"Kaeser Kompressoren","pais":"Alemania","ticker":None,"ingresos":None,"cuota_pct":None,"margen_ebit_pct":None,"comentario":"Familiar, fuerte en compresores de tornillo en Europa."},
   {"nombre":"Ebara","pais":"Japón","ticker":"6361","ingresos":None,"cuota_pct":None,"margen_ebit_pct":None,"comentario":"Bombas de vacío secas para semiconductores, rival directo de Edwards (Atlas Copco)."},
   {"nombre":"Pfeiffer Vacuum (Busch)","pais":"Alemania","ticker":None,"ingresos":None,"cuota_pct":None,"margen_ebit_pct":None,"comentario":"Vacío industrial y de alto vacío; controlada por Busch desde 2023."},
   {"nombre":"Bosch Rexroth / Desoutter (herramientas)","pais":"Alemania / Francia","ticker":None,"ingresos":None,"cuota_pct":None,"margen_ebit_pct":None,"comentario":"Competencia en herramientas de montaje industrial (Industrial Technique)."},
  ],
  "confianza":"Baja",
 },
 "fuentes": fB,
 "huecos":[
  {"seccion":"sector","campo":"tamaño de los mercados de compresores, vacío y herramientas y CR5","tipo":"Núcleo","intentos":"1) Informe anual 2025 (cuotas declaradas): no abre; 2) estudios de mercado de compresores y vacío: no buscados por el presupuesto de búsquedas compartido; 3) S&P Global: solo pedidos de vacío","decision":"Omitido"},
  {"seccion":"competencia","campo":"ingresos, cuota y margen de los competidores","tipo":"Núcleo","intentos":"1) Búsqueda de múltiplos de Ingersoll Rand: solo PER; 2) Ebara y Pfeiffer: no buscados; 3) presupuesto de búsquedas compartido","decision":"Omitido"},
  {"seccion":"esg","campo":"calificaciones y controversias","tipo":"Complemento","intentos":"1) Informe de sostenibilidad: no abre; 2) búsqueda: no hecha por presupuesto; 3) prensa: sin controversias halladas","decision":"Omitido"},
 ],
}
w('B', B)

# ---------------- C. Equipo y gobierno ----------------
fC = [
 {"id":1,"titulo":"President and CEO comments on Q4 report and full-year summary","editor":"Atlas Copco","tipo":"Primaria","fecha":"2026-01-27","url":"https://www.atlascopcogroup.com/en/media/press-releases/2026/20260127-ceo-comment"},
 {"id":2,"titulo":"CEO comments on Q2 2026 (crecimiento de dos dígitos de pedidos en todas las áreas)","editor":"Atlas Copco / Cision","tipo":"Primaria","fecha":"2026-07-16","url":"https://mb.cision.com/Main/90/4375221/4194483.pdf"},
]
C = {
 "directivos": {
  "equipo":[
   {"nombre":"Vagner Rego","cargo":"Presidente y consejero delegado (President & CEO)","desde":"2024","participacion_pct":None,"trayectoria":"Comenta los resultados trimestrales del grupo [C1, C2]; viene de la casa (dirigió Compressor Technique)."},
  ],
  "historial_guidance":[],
  "confianza":"Baja",
 },
 "gobierno": {
  "consejo":[],
  "presidente_ceo_separados":True,"presidente_ejecutivo":False,"consejero_coordinador":None,"una_accion_un_voto":False,
  "operaciones_vinculadas_relevantes":False,"variable_ligado_rentabilidad":None,"auditoria_independiente":None,"insiders_sin_operaciones":None,
  "accionista_control":True,"presidente_vinculado_control":True,"cambios_cupula_24m":1,
  "voto_remuneracion_pct":None,"voto_remuneracion_contra_pct":None,"voto_remuneracion_contra_libre_pct":None,"voto_cupula_pct":None,
  "remuneracion_ceo":None,
  "accionistas":[
   {"nombre":"Investor AB (familia Wallenberg)","pct":None,"tipo":"Accionista de referencia (sobre todo acciones A)","variacion":"Sin cambios conocidos"},
  ],
  "insiders":[],
  "alertas":["Acciones A con un voto y B con una décima de voto: Investor AB controla la junta con bastante más peso en votos que en capital (porcentaje no comprobado en esta sesión)."],
  "confianza":"Baja",
 },
 "fuentes": fC,
 "huecos":[
  {"seccion":"gobierno","campo":"consejo, participación de Investor AB, votos en junta, remuneración del CEO y operaciones de directivos","tipo":"Núcleo","intentos":"1) Informe anual y de remuneraciones 2025: no abren desde la nube; 2) búsquedas no hechas por el presupuesto de búsquedas compartido (priorizado precio, cuentas y consenso); 3) sin datos de Finansinspektionen","decision":"Omitido"},
  {"seccion":"directivos","campo":"equipo directivo completo e historial de cumplimiento de objetivos","tipo":"Complemento","intentos":"1) Web del grupo: no abre; 2) informes trimestrales: solo el CEO; 3) presupuesto de búsquedas","decision":"Omitido"},
 ],
}
w('C', C)

# ---------------- D. Mercado y valoración ----------------
fD = [
 {"id":1,"titulo":"Atlas Copco A stock trades at EUR 18.73, market value SEK 1.0 trillion","editor":"ad-hoc-news","tipo":"Prensa","fecha":"2026-10-14","url":"https://www.ad-hoc-news.de/boerse/news/corporate-news/atlas-copco-a-stock-trades-at-eur-18-73-market-value-sek-1-0-trillion/70280301"},
 {"id":2,"titulo":"Atlas Copco stock faces caution ahead of Q3 report (cierre de 209,70 SEK el 9-oct; rango de 52 semanas 149,45-214,10)","editor":"ad-hoc-news","tipo":"Prensa","fecha":"2026-10","url":"https://www.ad-hoc-news.de/boerse/news/corporate-news/atlas-copco-stock-faces-caution-ahead-of-q3-report/70255634"},
 {"id":3,"titulo":"Atlas Copco: financials and estimates (PER de cierre 2019-2025)","editor":"Inderes","tipo":"Datos de mercado","fecha":"2026-10","url":"https://www.inderes.se/en/companies/Atlas-Copco/financials-and-estimates"},
 {"id":4,"titulo":"Atlas Copco AB future growth (beneficio esperado 2026-2028: 28.300, 32.500 y 35.500 M SEK)","editor":"Simply Wall St","tipo":"Datos de mercado","fecha":"2026-06-24","url":"https://simplywall.st/stocks/de/capital-goods/fra-aco0/atlas-copco-shares/future"},
 {"id":5,"titulo":"Atlas Copco (ATCO A.ST): objetivo de consenso 204 SEK, 27 analistas, 18 comprar","editor":"Eulerpool","tipo":"Datos de mercado","fecha":"2026","url":"https://eulerpool.com/stock/SE0017486889"},
 {"id":6,"titulo":"Handelsbanken upprepar köp för Atlas Copco och höjer riktkursen till 240 kronor","editor":"Placera","tipo":"Prensa","fecha":"2026-10-07","url":"https://www.placera.se/telegram/atlas-copco-handelsbanken-upprepar-kop-for-atlas-copco-och-hojer-riktkursen-till-240-kronor-20261007"},
 {"id":7,"titulo":"Atlas Copco Kept at Underperform as RBC Notes Muted Demand; target 145 SEK","editor":"Placera / MT Newswires","tipo":"Prensa","fecha":"2026-04-30","url":"https://www.placera.se/telegram/atlas-copco-kept-at-underperform-as-rbc-notes-rather-muted-demand-outlook-commentary-price-target-up-20260430"},
 {"id":8,"titulo":"Atlas Copco (Affärsvärlden): riktkurser Citigroup 242, Goldman Sachs 187, Bernstein 240","editor":"Affärsvärlden","tipo":"Prensa","fecha":"2026-08","url":"https://www.affarsvarlden.se/aktie/atlas-copco"},
 {"id":9,"titulo":"Atlas Copco AB (OSTO:ATCO B) Beta 1,37 (7-sep-2026)","editor":"GuruFocus","tipo":"Datos de mercado","fecha":"2026-09-07","url":"https://www.gurufocus.com/term/beta/OSTO:ATCO B"},
 {"id":10,"titulo":"Ingersoll Rand forward P/E (24,1 a 31-jul-2026)","editor":"Yahoo Finance","tipo":"Datos de mercado","fecha":"2026-07-31","url":"https://finance.yahoo.com/quote/IR/key-statistics/"},
 {"id":11,"titulo":"Epiroc A, P/E (FWD) 24,8","editor":"Snowball Analytics","tipo":"Datos de mercado","fecha":"2026","url":"https://snowball-analytics.com/public/asset/EPI-A.ST"},
 {"id":12,"titulo":"Informes de ASSA ABLOY, Kone, Halma y Spirax del 14-oct-2026 de este repositorio (PER de los próximos 12 meses de Schindler, Legrand, Indutrade, Halma, IMI y ASSA ABLOY, con sus fuentes)","editor":"Este repositorio","tipo":"Datos de mercado","fecha":"2026-10-14","url":"informes/assa-abloy-2026-10-14/datos.json; informes/kone-2026-10-14/datos.json; informes/halma-2026-10-14/datos.json"},
 {"id":13,"titulo":"Damodaran, Implied ERP by month (ERPbymonth.xlsx), oct-2026: 4,20 %","editor":"NYU Stern","tipo":"Datos de mercado","fecha":"2026-10","url":"https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx"},
 {"id":14,"titulo":"Sweden 10Y bond yield hits 32-month high (2,98 %)","editor":"Trading Economics","tipo":"Datos de mercado","fecha":"2026-07-21","url":"https://tradingeconomics.com/sweden/government-bond-yield/news/568580"},
 {"id":15,"titulo":"Atlas Copco Aktie: kurs 206,80 SEK (8-sep), fecha ex de dividendo 19-oct-2026","editor":"NPinvestor","tipo":"Datos de mercado","fecha":"2026-09","url":"https://npinvestor.dk/aktier/atlas-copco/"},
]
D_ = {
 "identificacion": {"nombre":"Atlas Copco AB (publ)","nombre_corto":"Atlas Copco","ticker":"ATCO A","isin":"SE0017486889","mercado":"Nasdaq Stockholm (Large Cap)","indice_referencia":"OMX Stockholm 30","pais":"Suecia","pais_iso":"SE","sector":"Industria","industria":"Maquinaria industrial (compresores, vacío, herramientas de montaje y equipos de energía)","sede":"Nacka, Estocolmo (Suecia)","fundacion":"1873","empleados":None,"web":"www.atlascopcogroup.com","precio":211.80,"fecha_precio":"2026-10-14","acciones":4871,"capitalizacion_publicada":None,"free_float_pct":None,"max_52s":214.10,"min_52s":149.45,"volumen_medio_diario":None,"proximos_resultados":"2026-10-22"},
 "consenso": {
  "estimaciones":[
   {"periodo":"2026e","ingresos":None,"ebitda":None,"ebit":None,"bpa":5.81,"dpa":None,"fuente":"Simply Wall St, beneficio de 28.300 M ÷ 4.871 M acciones (24-jun-2026) [D4]"},
   {"periodo":"2027e","ingresos":None,"ebitda":None,"ebit":None,"bpa":6.67,"dpa":None,"fuente":"Simply Wall St, 32.500 M ÷ 4.871 M [D4]"},
   {"periodo":"2028e","ingresos":None,"ebitda":None,"ebit":None,"bpa":7.29,"dpa":None,"fuente":"Simply Wall St, 35.500 M ÷ 4.871 M [D4]"},
  ],
  "recomendaciones":{"n_analistas":27,"comprar":18,"mantener":None,"vender":None,"po_medio":204.0,"po_min":145,"po_max":242},
  "base_ebitda":"NIIF","ajuste_ebitda_pct_ventas":None,
  "confianza":"Baja",
 },
 "multiplos_historicos": {"serie":[
   {"anio":"2021","precio_cierre":153.6,"ev_ebitda_ntm":None,"per_ntm":None,"excluir":True},
   {"anio":"2022","precio_cierre":122.9,"ev_ebitda_ntm":None,"per_ntm":None,"excluir":False},
   {"anio":"2023","precio_cierre":173.4,"ev_ebitda_ntm":None,"per_ntm":None,"excluir":False},
   {"anio":"2024","precio_cierre":168.6,"ev_ebitda_ntm":None,"per_ntm":None,"excluir":False},
   {"anio":"2025","precio_cierre":166.2,"ev_ebitda_ntm":None,"per_ntm":None,"excluir":False},
  ],"confianza":"Media"},
 "comparables": {"empresas":[
   {"nombre":"Ingersoll Rand","ticker":"IR","pais":"US","capitalizacion":None,"ev_ventas":None,"ev_ebitda_ltm":None,"ev_ebitda_ntm":None,"per_ntm":24.1,"crecimiento_pct":None,"margen_ebitda_pct":None,"roic_pct":None,"dn_ebitda":None,"fcf_yield_pct":None},
   {"nombre":"Epiroc","ticker":"EPI A","pais":"SE","capitalizacion":None,"ev_ventas":None,"ev_ebitda_ltm":None,"ev_ebitda_ntm":None,"per_ntm":24.8,"crecimiento_pct":None,"margen_ebitda_pct":None,"roic_pct":None,"dn_ebitda":None,"fcf_yield_pct":None},
   {"nombre":"ASSA ABLOY","ticker":"ASSA B","pais":"SE","capitalizacion":None,"ev_ventas":None,"ev_ebitda_ltm":None,"ev_ebitda_ntm":None,"per_ntm":21.8,"crecimiento_pct":None,"margen_ebitda_pct":None,"roic_pct":None,"dn_ebitda":None,"fcf_yield_pct":None},
   {"nombre":"Schindler","ticker":"SCHP","pais":"CH","capitalizacion":None,"ev_ventas":None,"ev_ebitda_ltm":None,"ev_ebitda_ntm":None,"per_ntm":24.5,"crecimiento_pct":None,"margen_ebitda_pct":None,"roic_pct":None,"dn_ebitda":None,"fcf_yield_pct":None},
   {"nombre":"Legrand","ticker":"LR","pais":"FR","capitalizacion":None,"ev_ventas":None,"ev_ebitda_ltm":None,"ev_ebitda_ntm":None,"per_ntm":23.9,"crecimiento_pct":None,"margen_ebitda_pct":None,"roic_pct":None,"dn_ebitda":None,"fcf_yield_pct":None},
   {"nombre":"Indutrade","ticker":"INDT","pais":"SE","capitalizacion":None,"ev_ventas":None,"ev_ebitda_ltm":None,"ev_ebitda_ntm":None,"per_ntm":28.0,"crecimiento_pct":None,"margen_ebitda_pct":None,"roic_pct":None,"dn_ebitda":None,"fcf_yield_pct":None},
   {"nombre":"Halma","ticker":"HLMA","pais":"GB","capitalizacion":None,"ev_ventas":None,"ev_ebitda_ltm":None,"ev_ebitda_ntm":None,"per_ntm":29.0,"crecimiento_pct":None,"margen_ebitda_pct":None,"roic_pct":None,"dn_ebitda":None,"fcf_yield_pct":None},
   {"nombre":"IMI","ticker":"IMI","pais":"GB","capitalizacion":None,"ev_ventas":None,"ev_ebitda_ltm":None,"ev_ebitda_ntm":None,"per_ntm":21.9,"crecimiento_pct":None,"margen_ebitda_pct":None,"roic_pct":None,"dn_ebitda":None,"fcf_yield_pct":None},
  ],"confianza":"Baja"},
 "transacciones": {"operaciones":[],"confianza":"Baja"},
 "fuentes": fD,
 "huecos":[
  {"seccion":"bolsa","campo":"rentabilidades, volatilidad, caída máxima y posición corta","tipo":"Complemento","intentos":"1) bolsa.mjs (Yahoo): sin red en la nube; 2) búsqueda: cifras sin fecha; 3) Finansinspektionen: no abre","decision":"Omitido"},
  {"seccion":"identificacion","campo":"cierre del 13-oct-2026","tipo":"Complemento","intentos":"1) bolsa.mjs: sin red; 2) búsqueda del cierre: solo 209,70 SEK del 9-oct; 3) ad-hoc-news del 14-oct: 18,73 EUR, convertido con el EUR/SEK implícito de la nota de ASSA ABLOY del mismo día (11,31) = 211,80 SEK","decision":"Calculado y marcado como estimación"},
  {"seccion":"consenso","campo":"BPA de consenso actualizado tras el 2T26 y objetivo medio fechado","tipo":"Núcleo","intentos":"1) MarketScreener: solo PER 2026-27 (34,5x y 28,8x) sin fecha; 2) Inderes y Investing: sin tabla en el extracto; 3) Simply Wall St (24-jun) y Eulerpool (sin fecha): usados con confianza baja","decision":"Calculado y marcado como estimación"},
  {"seccion":"transacciones","campo":"operaciones comparables con múltiplo","tipo":"Complemento","intentos":"1) Compra de Pfeiffer por Busch: no buscada; 2) compras propias: sin múltiplo publicado; 3) presupuesto de búsquedas","decision":"Omitido"},
 ],
}
w('D', D_)

# ---------------- E. Sentimiento ----------------
fE = [
 {"id":1,"titulo":"Atlas Copco AB (OSTO:ATCO B): GF Value 153,59 SEK frente a 175,95 SEK, «modestamente sobrevalorada»","editor":"GuruFocus","tipo":"Foros y redes","fecha":"2026","url":"https://www.gurufocus.com/term/dividends/OSTO:ATCO B"},
 {"id":2,"titulo":"Narrativas de la comunidad sobre Atlas Copco (servicio e innovación)","editor":"Simply Wall St","tipo":"Foros y redes","fecha":"2026","url":"https://simplywall.st/narratives/strategic-growth-in-services-and-innovation-fuels-future-revenue-and-margin-expansion"},
 {"id":3,"titulo":"Dagens industri: Atlas Copco är ett kap","editor":"Aktiespararna","tipo":"Prensa","fecha":"2026-07","url":"https://www.aktiespararna.se/nyheter/dagens-industri-atlas-copco-ar-ett-kap"},
 {"id":4,"titulo":"Handelsbanken höjer riktkursen till 240 kronor (valoración relativa más baja que en años anteriores)","editor":"Placera","tipo":"Prensa","fecha":"2026-10-07","url":"https://www.placera.se/telegram/atlas-copco-handelsbanken-upprepar-kop-for-atlas-copco-och-hojer-riktkursen-till-240-kronor-20261007"},
 {"id":5,"titulo":"Atlas Copco Is Perpetually Overvalued","editor":"Seeking Alpha","tipo":"Foros y redes","fecha":"2024-10","url":"https://seekingalpha.com/article/4738212-atlas-copco-is-perpetually-overvalued-q3-24-wrap-up"},
 {"id":6,"titulo":"Barclays lifts Atlas Copco to overweight as «forgotten» stock returns to growth","editor":"Stockopedia","tipo":"Prensa","fecha":"2026","url":"https://www.stockopedia.com/share-prices/atlas-copco-ab-STO:ATCO A/news/barclays-lifts-atlas-copco-to-apos-overweight-apos-as-apos-forgotten-apos-stock-returns-to-growth-019e69fb-6014-7e87-b93c-a1065e5772f6/"},
]
E = {
 "sentimiento": {
  "tono":"Positivo","tendencia":"Mejorando",
  "revisadas":[
   {"plataforma":"Prensa sueca con comentarios de lectores (Dagens industri, Placera, Affärsvärlden)","fecha":"2026-07/10","n_comentarios":8,"tono":"Positivo","resumen":"Tras los pedidos récord del 2T26 la ven como «una ganga» frente a su historia (25 veces el resultado operativo esperado) y suben objetivos (Handelsbanken a 240 SEK) [E3, E4]."},
   {"plataforma":"GuruFocus (comunidad y valoración)","fecha":"2026","n_comentarios":3,"tono":"Negativo","resumen":"«Modestamente sobrevalorada»: GF Value de ≈154 SEK frente a ≈176 SEK, con puntuación de calidad alta [E1]."},
   {"plataforma":"Seeking Alpha (artículos de autores)","fecha":"2024-10","n_comentarios":2,"tono":"Negativo","resumen":"Tesis recurrente de «perpetuamente sobrevalorada»: gran negocio a precio que nunca deja margen de seguridad; no se halló nada de los últimos tres meses [E5]."},
   {"plataforma":"Simply Wall St (narrativas)","fecha":"2026","n_comentarios":3,"tono":"Positivo","resumen":"Narrativas de crecimiento por servicio y vacío; valor de la comunidad cercano al objetivo de los analistas (≈199 SEK) [E2]."},
  ],
  "temas":[
   {"tema":"Ciclo de semiconductores (vacío)","postura":"Alcista","peso":"Alto","contraste":None},
   {"tema":"Valoración: siempre cara","postura":"Bajista","peso":"Alto","contraste":None},
   {"tema":"Calidad (servicio, ROCE 24 %)","postura":"Alcista","peso":"Medio","contraste":None},
  ],
  "confianza":"Baja",
 },
 "fuentes": fE,
 "huecos":[
  {"seccion":"sentimiento","campo":"Reddit, Stocktwits, Placera forum y Flashback de los últimos tres meses","tipo":"Complemento","intentos":"1) Búsqueda en Reddit: solo páginas de GuruFocus; 2) Placera/Seeking Alpha: notas de analistas, sin hilos recientes; 3) WebFetch de las API de Stocktwits y Seeking Alpha: sin red en la nube","decision":"Omitido"},
 ],
}
w('E', E)
print('ok')

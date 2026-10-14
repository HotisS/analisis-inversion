# -*- coding: utf-8 -*-
# Constructor de la nota B (sector, competencia, historia, ESG). Ejecutar: python3 -I B_build.py
import json, os

F = []  # fuentes
def src(titulo, editor, tipo, fecha, url):
    for f in F:
        if f["url"] == url and f["titulo"] == titulo:
            return f["id"]
    F.append({"id": len(F) + 1, "titulo": titulo, "editor": editor, "tipo": tipo, "fecha": fecha, "url": url})
    return len(F)

S = {}
S["10k25"] = src("Form 10-K 2025", "Group 1 Automotive", "Primaria", "2026-02-13", "https://www.sec.gov/Archives/edgar/data/1031203/000103120326000064/gpi-20251231.htm")
S["q425"] = src("Group 1 Automotive Reports Fourth Quarter and Full Year 2025 Financial Results", "Group 1 Automotive", "Primaria", "2026-01-29", "https://www.group1corp.com/2026-01-29-Group-1-Automotive-Reports-Fourth-Quarter-and-Full-Year-2025-Financial-Results")
S["ars25"] = src("Informe anual 2025 (ARS, 10-K en PDF)", "Group 1 Automotive", "Primaria", "2026-02-13", "https://www.sec.gov/Archives/edgar/data/1031203/000103120326000098/a2025_10kxasxfiledx2x13x26.pdf")
S["q126"] = src("Group 1 Automotive Reports First Quarter 2026 Financial Results", "Group 1 Automotive", "Primaria", "2026-04", "https://www.prnewswire.com/news-releases/group-1-automotive-reports-first-quarter-2026-financial-results-302757965.html")
S["10k97"] = src("Form 10-K 1997", "Group 1 Automotive", "Primaria", "1998-03", "https://www.sec.gov/Archives/edgar/data/0001031203/000095012998001348/0000950129-98-001348.txt")
S["enc"] = src("Group 1 Automotive, Inc. (historia de la compañía)", "Encyclopedia.com", "Prensa", "2006", "https://www.encyclopedia.com/books/politics-and-business-magazines/group-1-automotive-inc")
S["inch_ann"] = src("Group 1 Automotive Agrees to Acquire Inchcape U.K. Dealerships", "Group 1 Automotive", "Primaria", "2024-04-15", "https://www.group1corp.com/2024-04-15-Group-1-Automotive-Agrees-to-Acquire-Inchcape-U-K-Dealerships")
S["inch_cdm"] = src("US giant Group 1 completes £346m Inchcape acquisition, doubling its UK footprint", "Car Dealer Magazine", "Prensa", "2024-08-01", "https://cardealermagazine.co.uk/us-giant-group-1-completes-346m-inchcape-acquisition-doubling-its-uk-footprint/305827")
S["prime"] = src("8-K: acuerdo para comprar Prime Automotive Group (Ex. 99.1)", "Group 1 Automotive", "Primaria", "2021-09-13", "https://www.sec.gov/Archives/edgar/data/1031203/000119312521270867/d203790dex991.htm")
S["10k21"] = src("Form 10-K 2021", "Group 1 Automotive", "Primaria", "2022-02", "https://www.sec.gov/Archives/edgar/data/1031203/000103120322000007/gpi-20211231.htm")
S["brasil"] = src("8-K: venta de las operaciones en Brasil (Ex. 99.1)", "Group 1 Automotive", "Primaria", "2022-07", "https://www.sec.gov/Archives/edgar/data/1031203/000119312522188297/d376107dex991.htm")
S["ceo"] = src("8-K: transición del primer ejecutivo (Hesterberg a Kenningham)", "Group 1 Automotive", "Primaria", "2022-08-24", "https://www.sec.gov/Archives/edgar/data/1031203/000119312522228066/d382733d8k.htm")
S["uab"] = src("Group 1 Automotive Closes UAB Motors Acquisition", "Group 1 Automotive", "Primaria", "2013-02-28", "https://www.group1corp.com/2013-02-28-Group-1-Automotive-Closes-UAB-Motors-Acquisition-Adds-Additional-Board-Member")
S["wiki"] = src("Group 1 Automotive (enciclopedia)", "Wikipedia", "Prensa", "2026", "https://en.wikipedia.org/wiki/Group_1_Automotive")
S["am_uk"] = src("Group 1 Automotive sets sight on further growth in the UK", "AM (am-online)", "Prensa", "2024", "https://www.am-online.com/news/group-1-automotive-sets-sight-on-further-growth-in-the-uk")

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "B.json")
nota = json.load(open(OUT, encoding="utf-8"))

nota["historia"] = {
    "resumen": ("Group 1 Automotive se constituyó en Houston el 21 de diciembre de 1995 para consolidar concesionarios de automóviles en EE. UU. y salió a bolsa en noviembre de 1997 a 12 USD por acción, comprando a la vez cuatro grupos de Texas y Oklahoma [%(k97)d]. "
                "Bajo Earl Hesterberg (primer ejecutivo de abril de 2005 a 2022) entró en el Reino Unido (2007) y en Brasil (2013), y después se concentró en EE. UU. y el Reino Unido: compró Prime Automotive (28 concesionarios en el noreste, 934,2 M USD) en 2021 y vendió Brasil en 2022 [%(prime)d, %(k21)d, %(br)d]. "
                "Daryl Kenningham es primer ejecutivo desde el 1 de enero de 2023 [%(ceo)d]. La compra de la red minorista de Inchcape en el Reino Unido (54 concesionarios, ≈ 346 M GBP, agosto de 2024) duplicó el tamaño británico; a cierre de 2025 tenía 254 concesionarios, 315 franquicias y 36 marcas [%(ia)d, %(ic)d, %(q4)d].")
    % {"k97": S["10k97"], "prime": S["prime"], "k21": S["10k21"], "br": S["brasil"], "ceo": S["ceo"], "ia": S["inch_ann"], "ic": S["inch_cdm"], "q4": S["q425"]},
    "hitos": [
        {"anio": "1995", "hito": "Constitución en Houston (21 de diciembre) como consolidador de concesionarios [%d, %d]." % (S["10k97"], S["enc"])},
        {"anio": "1997", "hito": "Salida a bolsa (4 de noviembre, 12 USD por acción) y compra simultánea de los grupos Howard, McCall, Smith y Kingwood en Texas y Oklahoma [%d]." % S["10k97"]},
        {"anio": "2005", "hito": "Earl Hesterberg, primer ejecutivo (abril de 2005); dirige la compañía hasta finales de 2022 [%d]." % S["ceo"]},
        {"anio": "2007", "hito": "Entrada en el Reino Unido con la compra de Chandlers Garage (BMW y MINI en el sureste de Inglaterra) [%d, %d]." % (S["am_uk"], S["wiki"])},
        {"anio": "2013", "hito": "Entrada en Brasil con la compra del 100 %% de UAB Motors (18 concesionarios) [%d]." % S["uab"]},
        {"anio": "2021", "hito": "Compra de Prime Automotive Group: 28 concesionarios, inmuebles y 3 talleres de chapa en el noreste de EE. UU. por 934,2 M USD [%d, %d]." % (S["prime"], S["10k21"])},
        {"anio": "2022", "hito": "Venta de UAB (Brasil, 16 concesionarios) por 510 M BRL en efectivo; el grupo se queda solo en EE. UU. y Reino Unido [%d]." % S["brasil"]},
        {"anio": "2023", "hito": "Daryl Kenningham, en la casa desde 2011, primer ejecutivo desde el 1 de enero [%d]." % S["ceo"]},
        {"anio": "2024", "hito": "Compra de la red minorista de Inchcape en el Reino Unido (54 concesionarios, ≈ 346 M GBP, ≈ 2.700 M USD de ingresos anuales); duplica el tamaño británico [%d, %d]." % (S["inch_ann"], S["inch_cdm"])},
        {"anio": "2025", "hito": "Ingresos récord de 22.571 M USD (+13,2 %%) con 192,8 M USD de deterioros; ventas y cierres de concesionarios con ≈ 775 M USD de ingresos anuales [%d, %d]." % (S["q425"], S["ars25"])},
    ],
    "confianza": "Alta",
}

nota["historia"]["hitos"].append({"anio": "2026", "hito": "Acuerdo para comprar Hennessy Automotive (Atlanta), operación estimada en ≈ 1.300 M USD por la prensa sectorial [%d]." % src("Group 1 Automotive signs deal estimated at $1.3B to acquire Hennessy Automotive Companies", "Kerrigan Advisors", "Prensa", "2026-07", "https://www.kerriganadvisors.com/in-the-news/group-1-automotive-signs-deal-estimated-at-1-3b-to-acquire-hennessy-automotive-companies")})

# ---------- Fuentes de sector y competencia ----------
S["cox_dic25"] = src("Cox Automotive Forecast: Despite Q4 Slowdown, New-Vehicle Sales Forecast to Reach 16.3 Million in 2025", "Cox Automotive", "Sectorial", "2025-12", "https://www.coxautoinc.com/insights/cox-automotive-forecast-dec-2025-u-s-auto-sales-forecast/")
S["cox_q326"] = src("Cox Automotive Raises Full-Year New-Vehicle Sales Forecast (3T 2026)", "Cox Automotive", "Sectorial", "2026-09", "https://www.coxautoinc.com/press-releases/q3-september-2026-cox-automotive-new-vehicle-sales-forecast-press-release/")
S["doe19"] = src("FOTW #1116: U.S. Light-Duty Vehicle Sales in 2019 Were Nearly 17 Million Vehicles", "U.S. Department of Energy", "Sectorial", "2020-01-13", "https://www.energy.gov/cmei/vehicles/articles/fotw-1116-january-13-2020-us-light-duty-vehicle-sales-2019-were-nearly-17")
S["ap21"] = src("New auto sales up in 2021, but long way before full recovery", "WJLA (AP)", "Prensa", "2021-12", "https://wjla.com/news/nation-world/new-auto-sales-up-in-2021-but-long-way-before-full-recovery")
S["motor22"] = src("U.S. auto sales expected to finish 2022 down 8% year over year", "MOTOR (Cox Automotive)", "Prensa", "2022-12", "https://www.motor.com/2022/12/u-s-auto-sales-expected-to-finish-2022-down-8-year-over-year-as-general-motors-reclaims-top-spot-honda-and-nissan-fall-significantly/")
S["aai24"] = src("Reading the Meter (diciembre de 2024)", "Alliance for Automotive Innovation", "Sectorial", "2024-12-05", "https://www.autosinnovate.org/posts/papers-reports/Reading%20the%20Meter%2012-5-2024.pdf")
S["nada"] = src("NADA Data (informes anuales 2024 y 2025)", "NADA", "Sectorial", "2026", "https://www.nada.org/nada/newsdata/nada-data")
S["nada25"] = src("2025 Annual Financial Profile of America's Franchised New-Car Dealerships", "NADA", "Sectorial", "2026", "https://www.nada.org/media/4695/download?inline=")
S["cox_us_dic"] = src("Used-Vehicle Retail Sales Climb in December, Defying Seasonal Slowdown", "Cox Automotive", "Sectorial", "2026-01", "https://www.coxautoinc.com/insights/used-retail-vehicle-sales-december-2025/")
S["niada"] = src("Used vehicle sales surpassing 2025 forecast", "NIADA", "Sectorial", "2025-09", "https://niada.com/dashboard/used-vehicle-sales-surpassing-2025-forecast/")
S["cox_inv"] = src("Used-Vehicle Inventory Holds Steady to Start 2026 as Sales Momentum Builds", "Cox Automotive", "Sectorial", "2026-01", "https://www.coxautoinc.com/insights/used-vehicle-inventory-december-2025/")
S["kbb"] = src("Kelley Blue Book Report: Average New-Vehicle Transaction Prices Flirt with All-Time High (septiembre de 2026)", "Cox Automotive / Kelley Blue Book", "Sectorial", "2026-10-13", "https://www.coxautoinc.com/insights/sept-2026-atp-report/")
S["smmt25"] = src("UK new car market breaches two million as almost one in four buyers go electric", "SMMT", "Sectorial", "2026-01", "https://www.smmt.co.uk/uk-new-car-market-breaches-two-million-as-almost-one-in-four-buyers-go-electric/")
S["smmt_jul"] = src("Huge EV boost in July yet mandate gap persists", "SMMT", "Sectorial", "2026-08", "https://www.smmt.co.uk/huge-ev-boost-in-july-yet-mandate-gap-persists/")
S["te_sep"] = src("BEV registrations climb beyond ZEV Mandate target", "Transport + Energy", "Prensa", "2026-10-02", "https://transportandenergy.com/2026/10/02/bev-registrations-climb-beyond-zev-mandate-target/")
S["ja24"] = src("UK 2024 car market falls just short of 2 million", "Just Auto", "Prensa", "2025-01", "https://www.just-auto.com/news/uk-2024-car-market-falls-just-short-of-2-million/")
S["coxuk23"] = src("Cox Automotive reiterates 2024 market forecasts and predicts a scramble for stability", "Cox Automotive UK", "Sectorial", "2024-01", "https://coxauto.co.uk/knowledge-centre/content-hub/cox-automotive-reiterates-2024-market-forecasts-and-predicts-a-scramble-for-stability/")
S["smmt_used"] = src("EVs power up used car market in three year growth run", "SMMT", "Sectorial", "2026-02", "https://www.smmt.co.uk/evs-power-up-used-car-market-in-three-year-growth-run/")
S["at_ar26"] = src("Auto Trader Group: Annual Report and Financial Statements 2026", "Auto Trader Group plc", "Primaria", "2026-06", "https://plc.autotrader.co.uk/media/d4wcf00t/at-ar26-web.pdf")
S["an_top"] = src("Top 150 Dealership Groups 2026", "Automotive News", "Sectorial", "2026-04", "https://www.autonews.com/retail/top-150-dealership-groups/2026/")
S["an_cons"] = src("Top 150 dealership groups show consolidation, new-vehicle sales", "Automotive News", "Prensa", "2026-04", "https://www.autonews.com/retail/top-150-dealership-groups/an-top-150-dealerships-2026-intersection-0412/")
S["an_org"] = src("Top 150 Dealers 2026: 62 Groups Grew Without Adding a Store", "GoodCarBadCar", "Prensa", "2026-04", "https://www.goodcarbadcar.net/top-150-dealers-2026-organic-growth/")
S["auton_10k"] = src("AutoNation, Inc. Form 10-K 2025", "AutoNation", "Primaria", "2026-02", "https://www.sec.gov/Archives/edgar/data/350698/000162828026007800/an-20251231.htm")
S["auton_ars"] = src("AutoNation, Inc. Annual Report 2025 (ARS)", "AutoNation", "Primaria", "2026", "https://www.sec.gov/Archives/edgar/data/350698/000162828026018709/a2025ars.pdf")
S["pag_q4"] = src("Penske Automotive Group Reports Fourth Quarter and Full Year 2025 Results", "Penske Automotive Group", "Primaria", "2026-02", "https://www.prnewswire.com/news-releases/penske-automotive-group-reports-fourth-quarter-and-full-year-2025-results-302684889.html")
S["pag_10k"] = src("Penske Automotive Group Form 10-K 2025", "Penske Automotive Group", "Primaria", "2026-02", "https://www.sec.gov/Archives/edgar/data/1019849/000162828026012830/pag-20251231.htm")
S["lad_q4"] = src("Lithia & Driveway: resultados del cuarto trimestre y del ejercicio 2025 (8-K, Ex. 99)", "Lithia Motors", "Primaria", "2026-02", "https://www.sec.gov/Archives/edgar/data/1023128/000102312826000004/a2025q4exx99earningsrelease.htm")
S["lad_10k"] = src("Lithia Motors Form 10-K 2025", "Lithia Motors", "Primaria", "2026-02", "https://www.sec.gov/Archives/edgar/data/1023128/000102312826000015/lad-20251231.htm")
S["abg_q4"] = src("Asbury Automotive Group Reports Fourth Quarter Results (2025)", "Asbury Automotive Group", "Primaria", "2026-02-05", "https://www.morningstar.com/news/business-wire/20260205073949/asbury-automotive-group-reports-fourth-quarter-results")
S["abg_hc"] = src("Asbury Automotive Group Completes Acquisition of Herb Chambers Dealerships", "Simpson Thacher", "Prensa", "2025-07-22", "https://www.stblaw.com/about-us/news/view/2025/07/22/asbury-automotive-group-completes-acquisition-of-herb-chambers-dealerships")
S["sah_q4"] = src("Sonic Automotive Reports Fourth Quarter and Full Year Financial Results (2025)", "Sonic Automotive", "Primaria", "2026-02-18", "https://www.businesswire.com/news/home/20260218554758/en/Sonic-Automotive-Reports-Fourth-Quarter-and-Full-Year-Financial-Results")
S["kmx_q4"] = src("CarMax Reports Fourth Quarter and Fiscal Year 2026 Results (8-K)", "CarMax", "Primaria", "2026-04", "https://www.sec.gov/Archives/edgar/data/1170010/000117001026000017/q4fy26earningsrelease.htm")
S["gpi_q226"] = src("Q2 2026 Earnings Release (Form 8-K, Exhibit 99.1)", "Group 1 Automotive", "Primaria", "2026-07-30", "https://www.sec.gov/Archives/edgar/data/0001031203/000103120326000121/a2026q2exhibit991.htm")
S["cdm_q226"] = src("Group 1 blames consumer affordability pressures as second quarter earnings fall", "Car Dealer Magazine", "Prensa", "2026-07", "https://cardealermagazine.co.uk/group-1-blames-consumer-affordability-pressures-as-second-quarter-earnings-fall/326015")

def c(*keys):
    return "[" + ", ".join(str(S[k]) for k in keys) + "]"

# ---------- negocio (parte descriptiva) ----------
nota["negocio"] = {
    "descripcion": ("Group 1 es el cuarto grupo de concesionarios de automóviles con sede en EE. UU. por ventas de 2025 %s. A 31 de diciembre de 2025 operaba 254 concesionarios, 315 franquicias de 36 marcas y 32 talleres de chapa y pintura: 145 concesionarios y 21 talleres en 17 estados de EE. UU. y 109 concesionarios y 11 talleres en 62 ciudades del Reino Unido %s. "
                    "Vende y alquila (leasing) coches nuevos y usados, intermedia la financiación, vende contratos de servicio y seguros, repara y mantiene vehículos y vende recambios, todo bajo contratos de franquicia con los fabricantes y con una plataforma digital omnicanal %s. "
                    "En 2025 vendió 224.166 coches nuevos y 234.906 usados al por menor, y 64.955 usados al por mayor %s; a 31 de marzo de 2026 la red era de 253 concesionarios y 313 franquicias %s. EE. UU. aportó 16.627 M USD de ingresos (73,7 %%) y el Reino Unido 5.945 M USD (26,3 %%) %s.") % (c("an_top"), c("10k25", "q425"), c("10k25"), c("q425"), c("q126"), c("ars25")),
    "como_gana_dinero": ("El coche nuevo genera la mayor parte de los ingresos, pero poco margen; el beneficio sale sobre todo de la posventa y de la financiación y seguros (F&I). "
                         "En 2025 el margen bruto total fue del 16,0 %% sobre 22.571 M USD de ingresos, y recambios y taller aportaron 1.585,6 M USD de beneficio bruto (el 43,8 %% del total) con un margen bruto del 55,7 %% %s. "
                         "La posventa es la parte más recurrente: depende del parque en circulación y de las garantías del fabricante, no de las ventas del año. "
                         "El margen operativo es fino (3,3 %% en 2025; 4,1 %% sin los 192,8 M USD de deterioros), así que pequeños cambios en el beneficio bruto por unidad mueven mucho el resultado %s. "
                         "En 2025 el Reino Unido dio una pérdida antes de impuestos de 113,2 M USD frente a un beneficio de 563,1 M USD en EE. UU. %s.") % (c("q425"), c("ars25", "q425"), c("ars25")),
    "confianza": "Media",
}

# ---------- sector ----------
nota["sector"] = {
    "definicion": ("El mercado relevante es la venta minorista de automóviles a través de concesionarios franquiciados en EE. UU. (≈ 74 %% de los ingresos del grupo) y el Reino Unido (≈ 26 %%), con su posventa y su F&I %s. "
                   "Se mide en unidades porque es la serie oficial y comparable: ventas de vehículos ligeros nuevos en EE. UU. Las cifras de 2019 (Wards, vía el Departamento de Energía), 2020-2022 (recuentos de Kelley Blue Book y Cox), 2023-2024 (Wards y NADA) y 2025 (NADA) vienen de fuentes distintas con definiciones parecidas pero no idénticas %s. "
                   "En dinero, NADA da más de 1,3 billones USD de ventas de los concesionarios franquiciados de EE. UU. en 2025 %s. "
                   "El Reino Unido se contrasta con la SMMT: 2,02 millones de matriculaciones nuevas y 7,81 millones de compraventas de usados en 2025 %s.") % (c("ars25"), c("doe19", "ap21", "motor22", "aai24", "nada"), c("nada"), c("smmt25", "smmt_used")),
    "tamano": ("Más de 1,3 billones USD de ventas de los 16.990 concesionarios franquiciados de EE. UU. en 2025 (más de 1,2 billones en 2024), con 16,2 millones de vehículos ligeros nuevos y 164.600 M USD en recambios y taller %s. "
               "Reino Unido: 2.020.520 coches nuevos matriculados en 2025, frente a 1.952.778 en 2024 y 1.903.054 en 2023 %s, y 7,81 millones de compraventas de usados %s.") % (c("nada", "nada25"), c("smmt25", "ja24", "coxuk23"), c("smmt_used")),
    "unidad_serie": "millones de vehículos ligeros nuevos vendidos en EE. UU. (año natural)",
    "serie": [
        {"anio": "2019", "tamano": 17.0},
        {"anio": "2020", "tamano": 14.6},
        {"anio": "2021", "tamano": 14.9},
        {"anio": "2022", "tamano": 13.9},
        {"anio": "2023", "tamano": 15.5},
        {"anio": "2024", "tamano": 15.9},
        {"anio": "2025", "tamano": 16.2},
        {"anio": "2026e", "tamano": 16.1},
    ],
    "tcac_historico_pct": 2.1,
    "tcac_previsto_pct": None,
    "cr5_pct": None,
    "estructura": "Fragmentada",
    "drivers": [
        {"driver": "Volumen de coches nuevos en EE. UU.", "efecto": "+/−", "horizonte": "Cíclico",
         "evidencia": "16,2 millones en 2025, el mejor año desde 2019; Cox empezó 2026 previendo 15,8 millones (−2,4 %%) por menor crecimiento, menos empleo y el fin de las ayudas fiscales a eléctricos, y en septiembre lo subió a 16,1 millones %s." % c("cox_dic25", "cox_q326")},
        {"driver": "Asequibilidad y precio de transacción", "efecto": "−", "horizonte": "Cíclico",
         "evidencia": "Precio medio de transacción de un coche nuevo de 50.562 USD en septiembre de 2026, a 52 USD del récord de diciembre de 2025, con incentivos del 6,6 %% del precio (7,3 %% un año antes) %s. Group 1 culpó a la asequibilidad de la caída del beneficio del 2T26 %s." % (c("kbb"), c("cdm_q226", "gpi_q226"))},
        {"driver": "Posventa (recambios y taller)", "efecto": "+", "horizonte": "Estructural",
         "evidencia": "Los concesionarios franquiciados de EE. UU. facturaron 164.600 M USD en posventa en 2025 frente a ≈ 156.000 M en 2024, con más de 276 millones de órdenes de reparación (270 millones en 2024) %s. En Group 1 el beneficio bruto de posventa creció un 15,9 %% en 2025 %s." % (c("nada", "nada25"), c("q425"))},
        {"driver": "Oferta y precio de coches usados", "efecto": "+/−", "horizonte": "Cíclico",
         "evidencia": "Cox subió en 2025 su previsión de usados vendidos a 37,9-38,5 millones %s; prevé 20,3 millones de ventas minoristas de usados en 2026 (−0,7 %%) %s, con un precio medio de anuncio de 26.043 USD a principios de 2026 (+1 %%) %s. En el Reino Unido, la falta de matriculaciones de la pandemia reducirá un 17 %% la oferta de coches de 5-7 años en dos años %s." % (c("niada"), c("cox_us_dic"), c("cox_inv"), c("at_ar26"))},
        {"driver": "Transición al eléctrico y mandato ZEV británico", "efecto": "−", "horizonte": "Estructural",
         "evidencia": "El mandato exige un 28 %% de eléctricos en 2025 y un 33 %% en 2026; el mercado se quedó en el 23,4 %% en 2025 y la SMMT prevé un 27,4 %% en 2026, lo que empuja a los fabricantes a descontar eléctricos %s. En EE. UU. el precio medio del eléctrico fue de 55.879 USD con incentivos del 11 %% en septiembre de 2026 %s." % (c("smmt25", "smmt_jul", "te_sep"), c("kbb"))},
        {"driver": "Consolidación de concesionarios", "efecto": "+", "horizonte": "Estructural",
         "evidencia": "Los diez primeros grupos vendieron 1,8 millones de coches nuevos en 2025 (11,1 %% del mercado, +0,3 puntos) y los 150 primeros el 27 %% (+0,3 puntos) %s." % c("an_cons")},
    ],
    "porter": [
        {"fuerza": "Rivalidad", "intensidad": 3,
         "justificacion": "Mercado fragmentado: 16.990 concesionarios franquiciados en EE. UU. y los diez primeros grupos con solo el 11,1 %% de las ventas de nuevos %s. Los cinco grandes cotizados ganan entre el 3 %% y el 4,5 %% de margen operativo %s." % (c("nada", "an_cons"), c("auton_ars", "pag_q4", "lad_10k", "ars25"))},
        {"fuerza": "Poder de los clientes", "intensidad": 3,
         "justificacion": "El particular compara precios en línea y sufre la asequibilidad: precio medio de 50.562 USD con incentivos del 6,6 %% %s. A cambio, la posventa ligada a la garantía y a la marca deja márgenes brutos del 55,7 %% en Group 1 %s." % (c("kbb"), c("q425"))},
        {"fuerza": "Poder de los proveedores", "intensidad": 4,
         "justificacion": "Los fabricantes conceden y retiran las franquicias, fijan el producto y el reparto de unidades; en el Reino Unido trasladan la presión del mandato ZEV (33 %% en 2026) a la red %s. Group 1 perdió 113,2 M USD antes de impuestos en el Reino Unido en 2025 %s." % (c("smmt_jul"), c("ars25"))},
        {"fuerza": "Amenaza de entrada", "intensidad": 2,
         "justificacion": "Para vender nuevos hace falta una franquicia del fabricante; el crecimiento llega por compra de concesionarios existentes (Group 1 compró ≈ 3.900 M USD de ingresos anuales en 2024; Asbury pagó 1.450 M USD por Herb Chambers en 2025) %s." % c("inch_ann", "abg_hc")},
        {"fuerza": "Amenaza de sustitutos", "intensidad": 2,
         "justificacion": "En usados compiten minoristas sin franquicia como CarMax (780.684 usados en su ejercicio a febrero de 2026, −1,1 %%) %s; en nuevos el sustituto es la venta directa del fabricante y las plataformas digitales (Amazon prepara Amazon Autos en el Reino Unido) %s." % (c("kmx_q4"), c("at_ar26"))},
    ],
    "ciclo": {
        "posicion": "Madurez del ciclo",
        "comentario": ("Las ventas de nuevos en EE. UU. se recuperaron de 13,9 millones en 2022 a 16,2 millones en 2025, aún por debajo de los 17,0 millones de 2019, y Cox prevé 16,1 millones en 2026 %s. "
                       "Los precios están en máximos (50.562 USD) y la asequibilidad frena el volumen %s. "
                       "En 2020 las ventas cayeron a 14,6 millones y en 2022, por falta de chips, a la cifra más baja desde 2011, cuando se vendían 12,7 millones tras la Gran Recesión %s; con poca oferta los márgenes por unidad de los concesionarios subieron. "
                       "No hay en las fuentes leídas datos de 2008-09 por grupo.") % (c("motor22", "nada", "doe19", "cox_q326"), c("kbb"), c("ap21", "motor22")),
    },
    "regulacion": ("En el Reino Unido, el mandato ZEV exige un 28 %% de eléctricos en 2025 y un 33 %% en 2026, por encima de lo que vende el mercado %s. "
                   "La FCA confirmó el 30 de marzo de 2026 un plan de compensación por comisiones ocultas en la financiación de coches, paralizado tras recursos de varios prestamistas; afecta a la intermediación de crédito de los concesionarios británicos %s. "
                   "En EE. UU., el fin de las ayudas fiscales a la compra de eléctricos pesa sobre la previsión de 2026 %s. "
                   "Los aranceles a la importación de coches no se han podido documentar con fuente en este análisis (ver huecos).") % (c("smmt25", "smmt_jul"), c("at_ar26"), c("cox_dic25")),
    "tendencias": ("Electrificación: en el Reino Unido los eléctricos llegaron al 23,4 %% de las matriculaciones en 2025 y al 36,3 %% en septiembre de 2026 (dato preliminar) %s; los usados eléctricos crecieron un 45,7 %% en 2025 %s. "
                   "Digitalización: Group 1 tiene una plataforma omnicanal propia %s y Amazon prepara Amazon Autos en el Reino Unido %s. "
                   "Consolidación: 101 de los 150 mayores grupos crecieron en 2025 y 62 lo hicieron sin añadir tiendas %s; Group 1 compra (Inchcape en 2024, Hennessy en 2026) y vende concesionarios que no rinden (≈ 775 M USD de ingresos anuales en 2025) %s. "
                   "La escala favorece a Group 1 frente a los concesionarios independientes, pero la venta directa de los fabricantes y el eléctrico (menos mantenimiento) son riesgos para la posventa a largo plazo.") % (c("smmt25", "te_sep"), c("smmt_used"), c("10k25"), c("at_ar26"), c("an_org"), c("q425")),
    "confianza": "Media",
}
json.dump(nota, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=2)

# ---------- competencia ----------
nota["competencia"] = {
    "cuota_pct": 1.2,
    "posicion": ("4.º grupo de concesionarios con sede en EE. UU. por ventas de 2025 (254 concesionarios y 524.027 unidades en la clasificación de Automotive News) %s. "
                 "Estimación propia de cuota: 224.166 coches nuevos al por menor frente a ≈ 18,2 millones vendidos en EE. UU. (16,2 M) y el Reino Unido (2,02 M) ≈ 1,2 %% %s. "
                 "En el Reino Unido es uno de los mayores grupos tras comprar la red de Inchcape (109 concesionarios) %s.") % (c("an_top"), c("q425", "nada", "smmt25"), c("10k25", "inch_cdm")),
    "competidores": [
        {"nombre": "Lithia Motors (Lithia & Driveway)", "pais": "EE. UU.", "ticker": "LAD", "ingresos": 37630, "cuota_pct": None, "margen_ebit_pct": 4.2,
         "comentario": "Mayor grupo por unidades (447 concesionarios, 953.078 unidades); ingresos +4,0 %% en 2025; presente también en el Reino Unido y Canadá %s." % c("an_top", "lad_q4", "lad_10k")},
        {"nombre": "Penske Automotive Group", "pais": "EE. UU.", "ticker": "PAG", "ingresos": 31808.5, "cuota_pct": None, "margen_ebit_pct": 4.0,
         "comentario": "Lujo y camiones comerciales (3.400 M USD); el 39 %% de los ingresos minoristas se genera fuera de EE. UU., sobre todo en el Reino Unido; ingresos planos en 2025 %s." % c("pag_q4", "pag_10k")},
        {"nombre": "AutoNation", "pais": "EE. UU.", "ticker": "AN", "ingresos": 27631.4, "cuota_pct": None, "margen_ebit_pct": 4.5,
         "comentario": "Solo EE. UU.; 271 concesionarios; resultado operativo de 1.239,9 M USD con 159 M USD de deterioros; financiera propia %s." % c("auton_ars", "auton_10k", "an_top")},
        {"nombre": "CarMax", "pais": "EE. UU.", "ticker": "KMX", "ingresos": 25881.1, "cuota_pct": None, "margen_ebit_pct": None,
         "comentario": "Mayor minorista de usados sin franquicia: 780.684 unidades (−1,1 %%) en el ejercicio a febrero de 2026; beneficio −50,6 %%; margen operativo no localizado %s." % c("kmx_q4")},
        {"nombre": "Asbury Automotive Group", "pais": "EE. UU.", "ticker": "ABG", "ingresos": 17999.0, "cuota_pct": None, "margen_ebit_pct": None,
         "comentario": "Solo EE. UU.; compró Herb Chambers (Boston) por 1.450 M USD en 2025; margen operativo ajustado del 5,6 %% (el contable no se localizó) %s." % c("abg_q4", "abg_hc")},
        {"nombre": "Sonic Automotive", "pais": "EE. UU.", "ticker": "SAH", "ingresos": 15200, "cuota_pct": None, "margen_ebit_pct": None,
         "comentario": "Concesionarios (12.900 M USD) más EchoPark, cadena de usados sin franquicia (2.100 M USD); beneficio neto 118,7 M USD (−45 %%) %s." % c("sah_q4")},
    ],
    "foso": {
        "veredicto": "Estrecho",
        "tendencia": "Estable",
        "fuentes": [
            {"fuente": "Efectos de red", "puntuacion": 0, "evidencia": "Un concesionario no gana valor por tener más clientes; el negocio es local."},
            {"fuente": "Costes de cambio", "puntuacion": 2, "evidencia": "La posventa en garantía y la reparación de la marca atan al cliente al concesionario oficial: margen bruto de posventa del 55,7 %% frente al 16,0 %% del grupo %s." % c("q425")},
            {"fuente": "Intangibles (marca, patentes, licencias)", "puntuacion": 3, "evidencia": "315 franquicias de 36 marcas concedidas por los fabricantes; solo se crece comprando franquicias existentes %s." % c("q425", "inch_ann")},
            {"fuente": "Ventaja en costes", "puntuacion": 1, "evidencia": "Margen operativo del 3,3 %% en 2025 (4,1 %% sin deterioros), por debajo de AutoNation (4,5 %%), Lithia (4,2 %%) y Penske (4,0 %%) %s." % c("ars25", "auton_ars", "lad_10k", "pag_q4")},
            {"fuente": "Escala eficiente", "puntuacion": 2, "evidencia": "Cuarto grupo de EE. UU.; agrupa concesionarios por zonas y compra redes enteras (Inchcape, ≈ 2.700 M USD de ingresos; Hennessy en Atlanta) %s." % c("an_top", "inch_ann")},
        ],
    },
    "amenazas": ("La venta directa o por agencia de los fabricantes quitaría al concesionario el margen del coche nuevo (riesgo medio en el Reino Unido, bajo en EE. UU. mientras sigan las leyes estatales de franquicia; sin fuente citable en este análisis). "
                 "El eléctrico reduce el mantenimiento a largo plazo y el mandato ZEV obliga a vender eléctricos con descuento en el Reino Unido %s. "
                 "Los minoristas de usados y las plataformas digitales (CarMax, Amazon Autos) compiten por el comprador %s. "
                 "Y la asequibilidad (precio medio de 50.562 USD) presiona el beneficio bruto por unidad %s.") % (c("smmt_jul"), c("kmx_q4", "at_ar26"), c("kbb")),
    "confianza": "Media",
}
json.dump(nota, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=2)

# ---------- ESG ----------
nota["esg"] = {
    "calificaciones": [],
    "materialidad": ("El asunto que más mueve las cifras es la transición al eléctrico en el Reino Unido: el mandato ZEV pide un 33 %% de eléctricos en 2026 frente al 27,4 %% previsto por la SMMT %s, en un negocio que perdió 113,2 M USD antes de impuestos en 2025 %s. "
                     "El segundo es la conducta en la venta de financiación: la FCA prepara compensaciones por comisiones en créditos de coche %s. "
                     "El tercero es la ciberseguridad de los proveedores de software de gestión: AutoNation registró en 2025 60,5 M USD de recuperaciones de seguros por la caída de CDK de 2024, que paralizó a miles de concesionarios %s.") % (c("smmt_jul"), c("ars25"), c("at_ar26"), c("auton_10k")),
    "controversias": "No se ha localizado en las fuentes consultadas ninguna sanción ni litigio relevante de Group 1 en los últimos tres años; la búsqueda específica no pudo completarse (ver huecos), así que esta ausencia no está verificada.",
    "confianza": "Baja",
}

ag = "cupo de búsquedas web del turno agotado tras ~30 búsquedas compartidas; sin red para EDGAR ni webs (solo WebSearch)"
nota["huecos"] = [
    {"seccion": "Sector", "campo": "cr5_pct (cuota de los cinco mayores grupos)", "tipo": "Complemento",
     "intentos": "1) Automotive News Top 150 2026: da unidades totales por grupo (nuevos y usados) y la cuota de los diez primeros en nuevos (11,1 %%), no la de los cinco; 2) NADA Data: no publica concentración; 3) derivarlo con las unidades del Top 150 no es válido porque mezcla nuevos y usados (la suma de cinco superaría a la de diez). %s." % ag,
     "decision": "Omitido"},
    {"seccion": "Sector", "campo": "tcac_previsto_pct", "tipo": "Complemento",
     "intentos": "1) Cox Automotive: solo previsión de 2026 (16,1 M); 2) NADA: sin previsión a cinco años; 3) no hay serie a cinco años en fuentes accesibles.",
     "decision": "Omitido"},
    {"seccion": "Sector", "campo": "Aranceles a la importación de vehículos, tipos de los créditos y modelo de agencia en el Reino Unido", "tipo": "Complemento",
     "intentos": "1) Búsqueda Cox Automotive sobre aranceles y asequibilidad: no ejecutada; 2) búsqueda SMMT/AM sobre agencia: no ejecutada; 3) %s." % ag,
     "decision": "Omitido"},
    {"seccion": "Sector", "campo": "Tamaño del mercado de F&I y de usados en dólares (2025)", "tipo": "Complemento",
     "intentos": "1) NADA Data 2025: el resumen da el reparto (nuevos 54,9 %%, usados 31,8 %%, posventa 13,3 %%) pero no las cifras; 2) Cox Automotive: sin cifra cerrada de usados de 2025; 3) %s." % ag,
     "decision": "Omitido"},
    {"seccion": "Competencia", "campo": "Margen operativo contable de CarMax, Asbury y Sonic; cuota de cada competidor", "tipo": "Núcleo",
     "intentos": "1) Comunicados de resultados del 4T25: los resúmenes no dan el resultado operativo contable (Asbury solo el ajustado, 5,6 %%); 2) búsqueda conjunta en Stock Analysis y 10-K: sin resultado; 3) %s. Cuotas no calculables con el mismo criterio (los grupos mezclan EE. UU., Reino Unido y Canadá)." % ag,
     "decision": "Omitido"},
    {"seccion": "ESG", "campo": "Calificaciones ESG (MSCI, Sustainalytics, ISS, CDP) y controversias", "tipo": "Complemento",
     "intentos": "1) Informe de sostenibilidad de Group 1: no accesible sin red; 2) búsqueda MSCI/Sustainalytics: no ejecutada; 3) %s." % ag,
     "decision": "Omitido"},
]

json.dump(nota, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=2)

nota["fuentes"] = F
json.dump(nota, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("ok", len(F), "fuentes")

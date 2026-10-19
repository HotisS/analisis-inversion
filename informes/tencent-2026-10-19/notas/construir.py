# Escribe las notas A-E de Tencent (corte 2026-10-19) desde los documentos oficiales descargados en notas/docs
# (informes anuales 2022-2025, informe intermedio 2026, comunicado y presentación del 2T26, avisos de HKEX) y los datos de
# mercado de Yahoo (bolsa.json, yahoo-consenso.mjs). Millones de RMB salvo que se diga otra cosa.
import json, os
DIR = os.path.dirname(os.path.abspath(__file__))
def w(letra, obj):
    with open(os.path.join(DIR, f'{letra}.json'), 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)

TC = 0.85194  # RMB por HKD, BCE 16-oct-2026 (7,5240 CNY/EUR ÷ 8,8316 HKD/EUR)
TC_FIN = {"2018": 0.87818, "2019": 0.89405, "2020": 0.84321, "2021": 0.8145, "2022": 0.88479, "2023": 0.90957, "2024": 0.93985, "2025": 0.89939}
r2 = lambda x: round(x, 2)

# ---------------------------------------------------------------- A. Cuentas
TA = "https://static.www.tencent.com/uploads"
fuentesA = [
 {"id": 1, "titulo": "Tencent Holdings Limited, Annual Report 2025 (cuentas consolidadas auditadas 2025 y 2024, notas, resumen financiero de 5 años)", "editor": "Tencent", "tipo": "Primaria", "fecha": "2026-04-09", "url": f"{TA}/2026/04/09/62d786fcf3d3c8cb7e54791ee95439ac.pdf"},
 {"id": 2, "titulo": "Tencent Holdings Limited, Annual Report 2024", "editor": "Tencent", "tipo": "Primaria", "fecha": "2025-04-08", "url": f"{TA}/2025/04/08/1132b72b565389d1b913aea60a648d73.pdf"},
 {"id": 3, "titulo": "Tencent Holdings Limited, Annual Report 2023 (2022 reexpresado)", "editor": "Tencent", "tipo": "Primaria", "fecha": "2024-04-08", "url": f"{TA}/2024/04/08/e95c902973fc282be3b3e285c6245281.pdf"},
 {"id": 4, "titulo": "Tencent Holdings Limited, Annual Report 2022 (cuentas 2022 y 2021)", "editor": "Tencent", "tipo": "Primaria", "fecha": "2023-04-06", "url": f"{TA}/2023/04/06/214dce4c5312264800b20cfab64861ba.pdf"},
 {"id": 5, "titulo": "Tencent Holdings Limited, Interim Report 2026 (seis meses a 30-jun-2026)", "editor": "Tencent", "tipo": "Primaria", "fecha": "2026-08-27", "url": "https://www.tencent.com/wp-content/uploads/2026/08/E700_IR.pdf"},
 {"id": 6, "titulo": "Tencent Announces 2026 Second Quarter Results (comunicado con cuentas trimestrales)", "editor": "Tencent", "tipo": "Primaria", "fecha": "2026-08-12", "url": "https://www.tencent.com/wp-content/uploads/2026/08/Tencent-Announces-2026-Second-Quarter-Results.pdf"},
 {"id": 7, "titulo": "2026 Second Quarter Results Presentation", "editor": "Tencent", "tipo": "Primaria", "fecha": "2026-08-12", "url": "https://static.www.tencent.com/website-2026-upload/2Q26-earnings-PPT_20260812_1800-88b183.pdf"},
 {"id": 8, "titulo": "Next Day Disclosure Return, 15-oct-2026 (acciones emitidas y recompras pendientes de amortizar)", "editor": "Tencent / HKEX", "tipo": "Primaria", "fecha": "2026-10-15", "url": "https://www.tencent.com/wp-content/uploads/2026/10/e_Next-Day-Disclosure-Return_20261015.pdf"},
 {"id": 9, "titulo": "Monthly Return of Equity Issuer, septiembre de 2026", "editor": "Tencent / HKEX", "tipo": "Primaria", "fecha": "2026-10-07", "url": "https://www.tencent.com/wp-content/uploads/2026/10/e_THL_monthly-return-September-2026.pdf"},
 {"id": 10, "titulo": "Pricing of US$1.8 Billion and CNY26 Billion Notes under the Global Medium Term Note Programme", "editor": "Tencent / HKEX", "tipo": "Primaria", "fecha": "2026-10-14", "url": "https://www.tencent.com/wp-content/uploads/2026/10/E700_Pricing-Announcement.pdf"},
 {"id": 11, "titulo": "Tencent Prices its US$2.45 Billion and CNY15 Billion Notes (junio de 2026)", "editor": "Tencent", "tipo": "Primaria", "fecha": "2026-06-10", "url": f"{TA}/2026/06/10/cf0d756a74c7a3de33bf29592da39fc5.pdf"},
 {"id": 12, "titulo": "Euro foreign exchange reference rates (CNY, HKD, USD), históricos", "editor": "Banco Central Europeo", "tipo": "Datos de mercado", "fecha": "2026-10-16", "url": "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist.zip"},
]

# Cuenta (formato por función). EBIT = resultado operativo − otras ganancias/(pérdidas) netas = EBITDA de la empresa − amortizaciones
# (inmovilizado, inversiones inmobiliarias, derechos de uso, intangibles y derechos de uso del suelo). EBITDA = el que publica Tencent.
# 2021 de AR2022 (formato antiguo: EBITDA sin intereses ni otras ganancias); 2022 reexpresado de AR2023; 2024 de AR2025.
# periodo, ingresos, coste, ventas+gg, ebitda, amort, bai, impuestos, minoritarios, bn, bpa dil., dpa HKD, acciones dil., gastos fin.
filas = [
 ("2021", 560118, 314174, 40594 + 89847, 173173, 21517 + 4649 + 31504, 248062, 20252, 2988, 224822, 23.164, 1.60, 9696, 7918),
 ("2022", 554552, 315806, 29229 + 106696, 164037, 21724 + 6720 + 32772, 210225, 21516, 466, 188243, 19.341, 2.40, 9695, 9985),
 ("2023", 609015, 315906, 34211 + 103525, 214381, 19908 + 6397 + 32703, 161324, 43276, 2832, 115216, 11.887, 3.40, 9610, 11885),
 ("2024", 660257, 311011, 36388 + 112761, 256310, 21141 + 6191 + 28881, 241485, 45018, 2394, 194073, 20.486, 4.50, 9408, 12447),
 ("2025", 751766, 329173, 41727 + 136127, 310767, 26580 + 6219 + 33229, 277249, 47448, 4959, 224842, 24.153, 5.30, 9244, 13456),
]
cuenta = []
for p, ing, cv, gg, ebitda, am, bai, imp, mino, bn, bpa, dpa, acc, gf in filas:
    ebit = ebitda - am
    cuenta.append({"periodo": p, "ingresos": ing, "coste_ventas": cv, "gastos_generales": gg, "ebitda": ebitda, "amortizaciones": am,
        "ebit": ebit, "resultado_financiero": bai - ebit, "bai": bai, "impuestos": imp, "minoritarios": mino, "beneficio_neto": bn,
        "gastos_financieros": gf, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None, "bpa": bpa,
        "dpa": r2(dpa * TC_FIN[p]), "dpa_extraordinario": 0, "acciones_diluidas": acc})

anios = ["2021", "2022", "2023", "2024", "2025"]
segs = [
 ("Servicios de valor añadido (juegos y redes sociales)", "Juegos nacionales (164.200 M en 2025) e internacionales (77.400 M) y redes sociales (127.700 M: Video Accounts en directo, suscripciones de música y vídeo, objetos virtuales) [1].", [291572, 287565, 298375, 319168, 369281]),
 ("Servicios de marketing (publicidad)", "Publicidad en Weixin (Video Accounts, Mini Programs, búsqueda), QQ y plataformas propias; hasta 2023 «Online Advertising» [1, 3].", [88666, 82729, 101482, 121374, 144973]),
 ("Fintech y servicios empresariales", "Weixin Pay (pagos comerciales), gestión patrimonial, crédito al consumo, Tencent Cloud y comisiones de comercio de Mini Shops [1].", [172195, 177064, 203763, 211956, 229435]),
 ("Otros", "Producción e inversión en cine y televisión, y otros [1].", [7685, 7194, 5395, 7759, 8077]),
]
segmentos = [{"nombre": n, "descripcion": d, "tipo_resultado": None,
              "historico": [{"periodo": anios[i], "ingresos": v[i], "resultado": None} for i in range(5)]} for n, d, v in segs]

# Balance. caja = caja total que publica Tencent (caja y equivalentes + depósitos a plazo + productos de tesorería) = caja neta + deuda.
bal = [
 # periodo, activo, act. corr., pas. corr., pasivo, fondo com., intang. total, inmov. (PPE+obra en curso+suelo+inv. inmob.), exist., clientes, prov., deuda, arrend., PN, minor., reservas, caja neta
 ("2021", 1612364, 484812, 403098, 735671, 112173, 171376, 61914 + 5923 + 17728, 1063, 49331, 109470, 136936 + 19003 + 145590, 16501 + 5446, 806299, 70394, 669911, -20243),
 ("2022", 1578131, 565989, 434204, 795271, 116731, 161802, 53978 + 9229 + 18046, 2333, 45467, 92381, 163668 + 11580 + 148669 + 10446, 18424 + 6354, 721391, 61469, 705981, -14832),
 ("2023", 1577246, 518446, 352157, 703565, 126220, 177727, 53232 + 13583 + 17179, 456, 46606, 100948, 155819 + 41537 + 137101 + 14161, 16468 + 6154, 808591, 65090, 813911, 54740),
 ("2024", 1780995, 496180, 396909, 727099, 142126, 196127, 80185 + 12302 + 23117 + 801, 440, 48203, 118712, 146521 + 52885 + 130586 + 8623, 13897 + 5600, 973548, 80348, 892030, 76798),
 ("2025", 2038986, 595460, 412751, 797921, 153789, 205999, 149905 + 9670 + 22339 + 950, 530, 49930, 121127, 208369 + 42618 + 126204 + 10542, 13280 + 5386, 1154152, 86913, 1010436, 107145),
]
balance_hist = []
for p, at, ac, pc, pt, fc, it, im, ex, cl, pr, deu, arr, pn, mi, res, cn in bal:
    balance_hist.append({"periodo": p, "activo_total": at, "activo_corriente": ac, "pasivo_corriente": pc, "pasivo_total": pt,
        "fondo_comercio": fc, "intangibles": it - fc, "inmovilizado_material": im, "existencias": ex, "clientes": cl, "proveedores": pr,
        "activos_contrato": None, "pasivos_contrato": None, "caja": cn + deu, "deuda_financiera": deu, "arrendamientos": arr,
        "patrimonio_neto": pn, "minoritarios": mi, "reservas": res})

# Flujos. capex = inmovilizado material + obra en curso + inversiones inmobiliarias + intangibles (incluye contenidos y licencias
# de juegos, coherente con el EBITDA, que suma su amortización) + derechos de uso del suelo.
fl = [
 ("2021", 175186, 29302 + 31159 + 1704, 4423, 21944, 12503, 2170, 1043, 7525),
 ("2022", 146091, 22679 + 27645 + 526, 5969, 12267, 12952, 29307, 995, 9342),
 ("2023", 221962, 21008 + 26042 + 357, 6652, 7633, 20983, 43767, 1070, 11478),
 ("2024", 258521, 62927 + 26394 + 6727, 6369, 7847, 28859, 102331, 1932, 12417),
 ("2025", 303052, 87482 + 25399 - 6, 6783, 11541, 37535, 73312, 2721, 13180),
]
flujos_hist = [{"periodo": p, "flujo_operativo": fo, "capex": cx, "pagos_arrendamientos": pa, "adquisiciones": ad, "desinversiones": 0,
                "dividendos": dv, "recompras": rc, "emision_acciones": em, "intereses_en_financiacion": it} for p, fo, cx, pa, ad, dv, rc, em, it in fl]

# LTM a 30-jun-2026 = 2025 − 1S25 + 1S26 [1, 5]
ltm_fo = 303052 - 151265 + 154061
ltm_capex = 112875 - (45558 + 11899) + (95615 + 11547)
ltm_lease = 6783 - 3265 + 3636
ltm_int = 13180 - 7003 + 6408

A = {
 "_estado": "completo (documentos oficiales)",
 "negocio": {
  "segmentos": segmentos,
  "geografias": None, "geografias_criterio": None,
  "kpis": [
   {"kpi": "Usuarios mensuales de Weixin y WeChat", "valor_anterior": "1.411 M (jun-25)", "valor_actual": "1.439 M (jun-26)", "variacion": "+2 %", "comentario": "Base casi saturada en China; el crecimiento viene del tiempo de uso (Video Accounts +20 % en el 2T26) [6]."},
   {"kpi": "Ingresos de juegos nacionales (trimestre)", "valor_anterior": "40.400 M (2T25)", "valor_actual": "47.300 M (2T26)", "variacion": "+17 %", "comentario": "Delta Force, VALORANT y Roco Kingdom: World [6, 7]."},
   {"kpi": "Ingresos de juegos internacionales (trimestre)", "valor_anterior": "18.800 M (2T25)", "valor_actual": "18.600 M (2T26)", "variacion": "−0,8 % (+4 % a tipo constante)", "comentario": "Supercell, a la baja; Wuthering Waves y VALORANT, al alza [6]."},
   {"kpi": "Ingresos de marketing (trimestre)", "valor_anterior": "35.762 M (2T25)", "valor_actual": "43.565 M (2T26)", "variacion": "+22 %", "comentario": "Modelo de recomendación de anuncios con IA y AIM+ [6]."},
   {"kpi": "Suscripciones de pago (VAS)", "valor_anterior": "264 M (jun-25)", "valor_actual": "259 M (jun-26)", "variacion": "−2 %", "comentario": "Vídeo y música [6]."},
   {"kpi": "Inversión en inmovilizado (trimestre)", "valor_anterior": "19.107 M (2T25)", "valor_actual": "52.784 M (2T26)", "variacion": "+176 %", "comentario": "Capacidad de cálculo para IA; caja libre del 2T26 de −13.800 M (37.600 M sin los anticipos por compra de capacidad) [6]."},
   {"kpi": "Resultado operativo no NIIF sin nuevos productos de IA (trimestre)", "valor_anterior": "72.400 M (2T25)", "valor_actual": "86.100 M (2T26)", "variacion": "+19 %", "comentario": "Con ellos, 75.600 M (+9 %): los nuevos productos de IA (Hy, Yuanbao, CodeBuddy, WorkBuddy, Xiaowei) restaron ≈10.500 M en el trimestre [6, 7]."},
  ],
 },
 "financieros": {
  "cuenta": cuenta,
  "ltm": {"periodo": "LTM jun-26", "fecha_fin": "2026-06-30", "ingresos": 751766 - 364526 + 401243, "ebitda": 310767 - 153284 + 169943,
          "ebit": (310767 - 153284 + 169943) - (66028 - (11371 + 3070 + 16198) + (17887 + 3175 + 15100)),
          "beneficio_neto": 224842 - 103449 + 114115, "bpa": r2(24.153 - 11.126 + 12.417), "dpa": r2(5.30 * TC_FIN["2025"]), "dpa_extraordinario": 0,
          "fcf": ltm_fo - ltm_capex - ltm_lease - ltm_int, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None},
  "cambios_perimetro": [],
 },
 "trimestres": {
  "items": [
   {"periodo": "3T24", "ingresos": 167193, "crecimiento_pct": 8.0, "crecimiento_organico_pct": None, "ebitda": 64397, "margen_ebitda_pct": 38.5, "bpa": None, "vs_consenso": None},
   {"periodo": "4T24", "ingresos": 172446, "crecimiento_pct": 11.0, "crecimiento_organico_pct": None, "ebitda": 63917, "margen_ebitda_pct": 37.1, "bpa": None, "vs_consenso": None},
   {"periodo": "1T25", "ingresos": 180022, "crecimiento_pct": 13.0, "crecimiento_organico_pct": None, "ebitda": 153284 - 79467, "margen_ebitda_pct": 41.0, "bpa": r2(11.126 - 5.996), "vs_consenso": None},
   {"periodo": "2T25", "ingresos": 184504, "crecimiento_pct": 15.0, "crecimiento_organico_pct": None, "ebitda": 79467, "margen_ebitda_pct": 43.1, "bpa": 5.996, "vs_consenso": None},
   {"periodo": "3T25", "ingresos": 192869, "crecimiento_pct": 15.4, "crecimiento_organico_pct": None, "ebitda": 80357, "margen_ebitda_pct": 41.7, "bpa": None, "vs_consenso": None},
   {"periodo": "4T25", "ingresos": 194371, "crecimiento_pct": 12.7, "crecimiento_organico_pct": None, "ebitda": 77126, "margen_ebitda_pct": 39.7, "bpa": None, "vs_consenso": None},
   {"periodo": "1T26", "ingresos": 196458, "crecimiento_pct": 9.1, "crecimiento_organico_pct": None, "ebitda": 84167, "margen_ebitda_pct": 42.8, "bpa": 6.302, "vs_consenso": "Inferior"},
   {"periodo": "2T26", "ingresos": 204785, "crecimiento_pct": 11.0, "crecimiento_organico_pct": None, "ebitda": 85776, "margen_ebitda_pct": 41.9, "bpa": 6.104, "vs_consenso": "Inferior"},
  ],
 },
 "balance": {
  "historico": balance_hist,
  "vencimientos": [{"anio": "2026", "importe": 42618 + 10542}, {"anio": "2027", "importe": 19671}, {"anio": "2028-2030", "importe": 183771 + 59880}, {"anio": "2031+", "importe": 4927 + 66324}],
  "liquidez": "Caja total de 511.154 M y caja neta de 58.191 M a 30-jun-2026 (107.145 M a dic-25): préstamos de 298.942 M y bonos de 154.021 M [6]. Después del cierre del semestre emitió bonos por 1.800 M USD y 26.000 M RMB (oct-26, al 2,40-6,75 %) [10], tras 2.450 M USD y 15.000 M RMB en junio [11]: más deuda bruta y más caja, sin cambio de la caja neta.",
  "rating": None, "coste_deuda_pct": 3.7, "vida_media_anios": None,
 },
 "flujos": {"historico": flujos_hist},
 "calidad": {
  "auditor": "PricewaterhouseCoopers (Hong Kong)", "anios_auditor": None, "opinion": "Favorable",
  "senales": [
   {"senal": "Beneficio NIIF dominado por la cartera de inversiones", "nivel": "Media", "comentario": "Las ganancias de inversiones y las participadas llevan el BAI de 115.503 M de EBIT a 248.062 M en 2021 y de 155.373 M a 161.324 M en 2023 [1, 3, 4]: el beneficio atribuido NIIF salta de 224.822 M (2021) a 115.216 M (2023) sin que el negocio lo haga. Medida útil: el no NIIF (123.788 M en 2021, 259.626 M en 2025) [1]."},
   {"senal": "El no NIIF excluye los pagos en acciones", "nivel": "Media", "comentario": "Pagos en acciones de 31.859 M en 2025 (25.660 M liquidados en acciones), un 4,2 % de las ventas, más 6.345 M de amortización de intangibles comprados [1]: coste real que el beneficio no NIIF no resta. Nuestro BPA de la regla a 12 meses es no NIIF por coherencia con la historia y el consenso, y se dice."},
   {"senal": "Anticipos por capacidad de cálculo en el flujo operativo", "nivel": "Media", "comentario": "Los anticipos a largo plazo pasan de 24.540 M (dic-25) a 91.203 M (jun-26) y la compra de inmovilizado del semestre es de 95.615 M [5, 6]; parte de la inversión en IA sale por el flujo operativo (la empresa da la caja libre del 2T26 sin ellos: 37.600 M frente a −13.800 M) [6]. Comparar el FCF con el capex del estado de flujos y no solo con el del comunicado."},
  ],
 },
 "capital": {
  "politica": "Dividendo ordinario anual creciente en HKD: 1,60 por 2021, 2,40 por 2022, 3,40 por 2023, 4,50 por 2024 y 5,30 por 2025 (pagado en 2026: 41.595 M RMB en el primer semestre) [1, 2, 3, 4, 5]. Recompras: 102.331 M RMB en 2024 y 73.312 M en 2025; en el primer semestre de 2026, 50,0 M de acciones por ≈24.400 M HKD (81,9 M en el mismo semestre de 2025) [1, 5]. En 2026 la prioridad de la caja es la capacidad de cálculo para IA (inversión de 52.784 M en el 2T26) y la financia en parte con bonos [6, 10, 11].",
  "adquisiciones": [],
 },
 "fuentes": fuentesA,
 "huecos": [
  {"seccion": "negocio", "campo": "Geografías", "tipo": "Complemento", "intentos": "1) Nota de segmentos del informe anual 2025: solo por línea de negocio; 2) informe intermedio 2026: igual; 3) comunicados: solo juegos internacionales (77.400 M en 2025)", "decision": "Omitido"},
  {"seccion": "negocio", "campo": "Resultado por segmento", "tipo": "Complemento", "intentos": "1) Nota 6 del informe anual: solo beneficio bruto por segmento; 2) informe intermedio: igual; 3) presentación del 2T26: margen bruto por segmento, sin EBIT", "decision": "Omitido"},
  {"seccion": "trimestres", "campo": "BPA de 3T24, 4T24, 3T25 y 4T25 y consenso previo de cada trimestre", "tipo": "Complemento", "intentos": "1) Informes anuales 2024 y 2025: solo el BPA del 4T; 2) informe intermedio: 1T y 2T; 3) consenso previo trimestral: sin fuente gratuita archivada", "decision": "Omitido"},
  {"seccion": "balance", "campo": "Rating y vida media de la deuda", "tipo": "Complemento", "intentos": "1) Notas 36 y 37 del informe anual 2025: plazos y tipos, sin rating; 2) anuncios de los bonos de junio y octubre de 2026: sin rating en el texto; 3) búsqueda de Moody's/S&P sin documento primario", "decision": "Omitido"},
 ],
}
w('A', A)

# ---------------------------------------------------------------- B. Sector y competencia
fuentesB = [
 {"id": 1, "titulo": "China's game market revenue tops 350 billion yuan in 2025 (CADPA)", "editor": "China Daily", "tipo": "Sectorial", "fecha": "2025-12-22", "url": "https://regional.chinadaily.com.cn/Qiushi/2025-12/22/c_1149473.htm"},
 {"id": 2, "titulo": "China's video gaming revenue hits new high in 2024 (CADPA: 325.800 M RMB, +7,53 %)", "editor": "South China Morning Post", "tipo": "Prensa", "fecha": "2024-12", "url": "https://www.scmp.com/tech/big-tech/article/3290626/chinas-video-gaming-revenue-hits-new-high-2024-back-blockbuster-releases"},
 {"id": 3, "titulo": "Tencent Holdings Limited, Annual Report 2025", "editor": "Tencent", "tipo": "Primaria", "fecha": "2026-04-09", "url": f"{TA}/2026/04/09/62d786fcf3d3c8cb7e54791ee95439ac.pdf"},
 {"id": 4, "titulo": "2026 Second Quarter Results Presentation", "editor": "Tencent", "tipo": "Primaria", "fecha": "2026-08-12", "url": "https://static.www.tencent.com/website-2026-upload/2Q26-earnings-PPT_20260812_1800-88b183.pdf"},
 {"id": 5, "titulo": "Tencent Announces 2026 Second Quarter Results", "editor": "Tencent", "tipo": "Primaria", "fecha": "2026-08-12", "url": "https://www.tencent.com/wp-content/uploads/2026/08/Tencent-Announces-2026-Second-Quarter-Results.pdf"},
 {"id": 6, "titulo": "NetEase, Alibaba, Kuaishou y Baidu: ventas de los últimos 12 meses y margen operativo (quoteSummary)", "editor": "Yahoo Finance", "tipo": "Datos de mercado", "fecha": "2026-10-19", "url": "https://finance.yahoo.com/quote/9999.HK/"},
 {"id": 7, "titulo": "Trump administration weighs forcing Tencent to sell stakes in Epic Games, Riot Games and Supercell", "editor": "Tom's Hardware (sobre Financial Times)", "tipo": "Prensa", "fecha": "2026-03-04", "url": "https://www.tomshardware.com/"},
 {"id": 8, "titulo": "China's Tencent taps Oracle for 100,000 AI chips in $7B lease deal (report)", "editor": "Seeking Alpha / Financial Times", "tipo": "Prensa", "fecha": "2026-10-01", "url": "https://seekingalpha.com/symbol/TCEHY"},
 {"id": 9, "titulo": "ByteDance folds AI tools into Doubao super-app to fight Tencent", "editor": "Bloomberg", "tipo": "Prensa", "fecha": "2026-08-24", "url": "https://www.bloomberg.com/"},
 {"id": 10, "titulo": "Tencent Holdings Limited, Annual Report 2023 (segmento «Online Advertising»)", "editor": "Tencent", "tipo": "Primaria", "fecha": "2024-04-08", "url": f"{TA}/2024/04/08/e95c902973fc282be3b3e285c6245281.pdf"},
]
B = {
 "historia": {
  "resumen": "Tencent nació en Shenzhen en 1998, fundada por Ma Huateng y otros socios, con un servicio de mensajería (OICQ, luego QQ). Naspers (hoy a través de Prosus) entró en 2001 y sigue siendo el primer accionista, con el 22,60 % en junio de 2026 [3]. Cotiza en Hong Kong desde el 16-jun-2004 [3]. QQ financió los juegos en línea y Weixin (2011) se convirtió en la plataforma de comunicación, pagos y miniaplicaciones de China. Entre 2021 y 2022 vivió la campaña regulatoria contra las plataformas y la congelación de licencias de juegos, y repartió en especie sus participaciones en JD.com y Meituan. Desde 2025 el eje es la IA: modelos Hy (antes Hunyuan), WorkBuddy y CodeBuddy, el agente Xiaowei dentro de Weixin y una inversión que se triplica en 2026 [4, 5].",
  "hitos": [
   {"anio": "1998", "hito": "Fundación en Shenzhen; mensajería OICQ (QQ)."},
   {"anio": "2001", "hito": "Entrada de Naspers (MIH) en el capital."},
   {"anio": "2004", "hito": "Salida a la bolsa de Hong Kong (16 de junio)."},
   {"anio": "2011", "hito": "Lanzamiento de Weixin/WeChat; Weixin Pay en 2013."},
   {"anio": "2016", "hito": "Compra de Supercell con un consorcio; Riot Games ya era filial desde 2015."},
   {"anio": "2021-22", "hito": "Campaña regulatoria y congelación de licencias; repartos en especie de JD.com (2021) y Meituan (2022-23)."},
   {"anio": "2025", "hito": "Ingresos de 751.766 M (+13,9 %) y beneficio no NIIF de 259.626 M; empieza el ciclo de inversión en IA [3]."},
   {"anio": "2026", "hito": "Hy3 en producción (julio), WorkBuddy líder en agentes de oficina; inversión del 2T26 de 52.784 M (+176 %) y emisiones de bonos en junio y octubre [4, 5]."},
  ],
  "confianza": "Alta",
 },
 "negocio": {
  "descripcion": "Tencent es la mayor empresa de internet de China por beneficio. Tres negocios comparten la base de 1.439 M de usuarios mensuales de Weixin y WeChat y los 520 M de QQ [5]: (1) servicios de valor añadido (49 % de los ingresos de 2025): juegos propios y licenciados en China (164.200 M) y fuera (77.400 M, Supercell, Riot, PUBG MOBILE) y redes sociales (127.700 M: directos en Video Accounts, música y vídeo de pago) [3]; (2) servicios de marketing (19 %): publicidad en Video Accounts, Mini Programs, búsqueda y Moments; y (3) fintech y servicios empresariales (31 %): Weixin Pay, gestión patrimonial, crédito al consumo, Tencent Cloud y comisiones de Mini Shops [3]. Además tiene una cartera de participaciones valorada en 875.100 M a junio de 2026 (cotizadas a mercado 487.200 M y no cotizadas a valor contable 387.900 M) [5].",
  "como_gana_dinero": "El margen sale de la escala: un usuario más de Weixin cuesta casi nada y un juego de éxito dura una década (Honour of Kings, Peacekeeper Elite). El margen bruto pasó del 43,9 % en 2021 al 56,2 % en 2025 por la mezcla: más publicidad y juegos propios, menos vídeo caro [3]. Casi todo es recurrente: compras dentro de los juegos, publicidad y comisiones de pago. El cambio de 2026 es la inversión en IA: servidores que se amortizan en pocos años, con una inversión trimestral que pasa de 19.107 M a 52.784 M y unos nuevos productos de IA que restan ≈10.500 M de resultado operativo por trimestre [5]. El beneficio futuro depende de que la IA suba el precio de la publicidad y el gasto en la nube y en agentes más deprisa que esa amortización.",
  "clientes": "Ningún cliente pesa: los cinco mayores fueron el 6,5 % de los ingresos de 2025 [3]. Cientos de millones de jugadores y usuarios de pago, millones de anunciantes y comercios. El poder de precios se ve en la publicidad (marketing +19,4 % en 2025 y +22 % en el 2T26, con más precio por impresión gracias a la segmentación con IA) [3, 5] y en la nube, que en 2026 sube precios por la escasez de capacidad («a more favourable pricing environment») [5]. En juegos, la regulación limita el tiempo de los menores, no el precio de los objetos virtuales.",
  "confianza": "Alta",
 },
 "sector": {
  "definicion": "Tencent compite en varios mercados chinos: juegos, publicidad digital, pagos y nube. Tomamos como referencia el que más pesa en su beneficio, el mercado de videojuegos de China en ventas reales (CADPA): 350.790 M RMB en 2025 (+7,7 %) [1] y 325.800 M en 2024 (+7,5 %) [2]. Los años anteriores salen del mismo comunicado de CADPA citado por la prensa (2023 ≈303.000 M, +14 %; 2022 derivado). La publicidad, los pagos y la nube no tienen una cifra contrastada en dos fuentes: se describen en tendencias y drivers.",
  "tamano": "≈350.800 M RMB en 2025 (videojuegos en China, CADPA) [1, 2]",
  "unidad_serie": "millones de RMB",
  "serie": [{"anio": "2022", "tamano": 265900}, {"anio": "2023", "tamano": 303000}, {"anio": "2024", "tamano": 325800}, {"anio": "2025", "tamano": 350790}],
  "tcac_historico_pct": 9.7, "tcac_previsto_pct": None, "cr5_pct": None, "estructura": "Concentrada",
  "drivers": [
   {"driver": "IA en la publicidad (segmentación y campañas automáticas)", "efecto": "+", "horizonte": "Estructural", "evidencia": "Marketing +19,4 % en 2025 y +22 % en el 2T26 [3, 5]."},
   {"driver": "Licencias de juegos y protección de menores", "efecto": "+/−", "horizonte": "Cíclico", "evidencia": "Congelaciones de 2018 y 2021-22; con licencias normalizadas el mercado crece un 7,5-7,7 % en 2024-25 [1, 2]."},
   {"driver": "Coste y acceso a la capacidad de cálculo", "efecto": "−", "horizonte": "Estructural", "evidencia": "Inversión del 2T26 de 52.784 M (+176 %); arrendamiento de 100.000 chips vía Oracle por ≈7.000 M USD (oct-26, prensa) [5, 8]."},
   {"driver": "Agentes de IA (WorkBuddy, Xiaowei) como nueva puerta de entrada", "efecto": "+/−", "horizonte": "Estructural", "evidencia": "WorkBuddy, primero en interacciones de agentes de oficina en China (jun-26); ByteDance integra Doubao en una superaplicación [4, 9]."},
   {"driver": "Consumo en China", "efecto": "+/−", "horizonte": "Cíclico", "evidencia": "Fintech y servicios empresariales +8,2 % en 2025 y +9 % en el 2T26 [3, 5]."},
  ],
  "porter": [
   {"fuerza": "Rivalidad", "intensidad": 3, "justificacion": "ByteDance (Douyin, Doubao) compite por el tiempo de uso, la publicidad y la IA de consumo; Alibaba, Huawei y ByteDance en la nube [9]."},
   {"fuerza": "Poder de los clientes", "intensidad": 2, "justificacion": "Usuarios y anunciantes atomizados: los cinco mayores clientes son el 6,5 % [3]."},
   {"fuerza": "Poder de los proveedores", "intensidad": 4, "justificacion": "Chips de IA escasos por los controles de exportación; Tencent arrienda capacidad en el extranjero y compra a fabricantes chinos [5, 8]."},
   {"fuerza": "Amenaza de entrada", "intensidad": 2, "justificacion": "La red de Weixin y la escala en juegos no se replican; en IA, la barrera es el capital."},
   {"fuerza": "Amenaza de sustitutos", "intensidad": 3, "justificacion": "Vídeo corto (Douyin) y asistentes de IA pueden desplazar el tiempo de uso; Video Accounts crece más de un 20 % en tiempo de uso [5]."},
  ],
  "ciclo": {"posicion": "Madurez del ciclo", "comentario": "Juegos y publicidad en China crecen a un dígito alto (videojuegos +7,7 % en 2025 [1]). El ciclo lo marca más la regulación que la economía: en 2022 los ingresos de Tencent bajaron un 1,0 % por la congelación de licencias y los confinamientos, y el mercado de juegos un ≈10 %; en 2020 los juegos subieron con el confinamiento [3, 2]. En 2026 la variable es el ciclo de inversión en IA: la amortización crece más que las ventas y frena el beneficio."},
  "regulacion": "Licencias de juegos de la NPPA y límites de tiempo de juego a menores; supervisión de pagos y crédito por el banco central; seguridad de datos y normas sobre contenido generado por IA. Fuera de China: Tencent está en la lista 1260H del Pentágono desde enero de 2025 y el comité CFIUS de EE. UU. estudia desde marzo de 2026 si obligarle a vender sus participaciones en Epic, Riot y Supercell, sin decisión ni fecha publicadas [7]. Los controles de exportación de chips de EE. UU. condicionan la IA.",
  "tendencias": "La IA decide: mejora la publicidad, sube la demanda de nube y abre los agentes (WorkBuddy, CodeBuddy, Xiaowei), pero exige una inversión que se triplica y aún resta resultado [4, 5]. El vídeo corto sigue ganando tiempo de uso; Tencent responde con Video Accounts y, en octubre, con una plataforma de microdramas frente a Hongguo de ByteDance (prensa china). En juegos ganan peso PC, consolas y el mercado internacional.",
  "confianza": "Media",
 },
 "competencia": {
  "cuota_pct": 46.8,
  "posicion": "1.º en juegos en China (ingresos de juegos nacionales de 164.200 M en 2025, ≈47 % de las ventas del mercado según CADPA; las bases no son idénticas), 1.º en mensajería (Weixin), 1.º en pagos móviles por usuarios y 2.º en PaaS en la nube [3, 4, 1].",
  "competidores": [
   {"nombre": "ByteDance (Douyin, Doubao)", "pais": "China", "ticker": None, "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Rival principal en publicidad, tiempo de uso, microdramas e IA de consumo; no cotiza ni publica cuentas."},
   {"nombre": "NetEase", "pais": "China", "ticker": "9999.HK", "ingresos": 116603, "cuota_pct": None, "margen_ebit_pct": 40.2, "comentario": "Segundo grupo de juegos de China; ventas de los últimos 12 meses y margen operativo del último trimestre [6]."},
   {"nombre": "Alibaba", "pais": "China", "ticker": "9988.HK", "ingresos": 1044971, "cuota_pct": None, "margen_ebit_pct": 7.3, "comentario": "Nube e IA (Qwen) y publicidad de comercio electrónico; margen hundido por el comercio rápido y la IA [6]."},
   {"nombre": "Kuaishou", "pais": "China", "ticker": "1024.HK", "ingresos": 144373, "cuota_pct": None, "margen_ebit_pct": 10.5, "comentario": "Vídeo corto, publicidad y Kling (vídeo con IA) [6]."},
   {"nombre": "Baidu", "pais": "China", "ticker": "9888.HK", "ingresos": 127314, "cuota_pct": None, "margen_ebit_pct": 9.7, "comentario": "Búsqueda, nube de IA (Ernie) y conducción autónoma [6]."},
   {"nombre": "Ant Group (Alipay)", "pais": "China", "ticker": None, "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Rival en pagos móviles y gestión patrimonial; no cotiza."},
  ],
  "foso": {"veredicto": "Amplio", "tendencia": "Estable", "fuentes": [
   {"fuente": "Efectos de red", "puntuacion": 5, "evidencia": "Weixin reúne comunicación, pagos, miniaplicaciones y ahora agentes para 1.439 M de usuarios [5]; margen bruto del 43,9 % al 56,2 % en 2021-2025 [3]."},
   {"fuente": "Costes de cambio", "puntuacion": 4, "evidencia": "Contactos, grupos, pagos, cuentas de juego y documentos viven en Weixin, QQ y Tencent Docs."},
   {"fuente": "Intangibles (marca, patentes, licencias)", "puntuacion": 4, "evidencia": "Juegos «perennes» de más de 4.000 M RMB al año; Delta Force y VALORANT en máximos de usuarios diarios en el 2T26 [5]."},
   {"fuente": "Ventaja en costes", "puntuacion": 3, "evidencia": "Distribución propia de juegos y publicidad sin coste de adquisición de usuarios; margen operativo del 32,9 % frente al 7-10 % de Alibaba, Kuaishou y Baidu [6]."},
   {"fuente": "Escala eficiente", "puntuacion": 4, "evidencia": "Solo Tencent, Alibaba, ByteDance y Huawei financian la IA a esta escala en China [5]."},
  ]},
  "amenazas": "Tres amenazas: (1) que los agentes de IA cambien la puerta de entrada a internet y Weixin pierda tiempo de uso frente a Doubao de ByteDance (probabilidad media a cinco años) [9]; (2) un nuevo endurecimiento regulatorio sobre juegos o fintech como el de 2021-22 (media); (3) que la inversión en IA no se recupere y el foso se mantenga con un ROIC menor (media-alta en 2026-28) [5]. Fuera de China, una venta forzosa de Riot, Supercell o Epic recortaría los juegos internacionales (77.400 M de ingresos en 2025) [3, 7].",
  "confianza": "Media",
 },
 "esg": {
  "calificaciones": [],
  "materialidad": "Tres asuntos materiales: (1) la protección de menores en los juegos (límites de tiempo y gasto; una norma nueva puede recortar ingresos, como en 2021); (2) la privacidad de 1.439 M de usuarios de Weixin, que además pesa en la revisión de CFIUS sobre sus juegos en EE. UU. [5, 7]; y (3) el consumo eléctrico de los centros de datos de IA, que crece con la inversión (×2,8 en el 2T26) [5].",
  "controversias": "Lista 1260H del Pentágono desde enero de 2025, recurrida por Tencent; revisión de CFIUS abierta en 2026 [7]. Pleito de Sony por el juego «Light of Motiram» (parecido a Horizon), cerrado con un acuerdo y la retirada del juego en diciembre de 2025 (prensa de videojuegos). En octubre de 2026, unos investigadores atribuyeron a agentes de IA alojados en Tencent Cloud 2.600 intentos de extraer datos de Amap (Alibaba); Tencent dijo que no venían de sus modelos Hy y que refuerza los controles; no consta actuación de un regulador.",
  "confianza": "Media",
 },
 "fuentes": fuentesB,
 "huecos": [
  {"seccion": "sector", "campo": "TCAC previsto y CR5 del mercado de juegos", "tipo": "Complemento", "intentos": "1) CADPA (vía China Daily y SCMP): solo años cerrados; 2) Niko Partners: previsión en USD sin desglose público; 3) cuotas de los cinco primeros: sin fuente con cifras", "decision": "Omitido"},
  {"seccion": "esg", "campo": "Calificaciones ESG", "tipo": "Complemento", "intentos": "1) MSCI ESG (búsqueda de la ficha): requiere registro; 2) Sustainalytics: requiere registro; 3) informe ESG de Tencent: no publica la nota de las agencias", "decision": "Omitido"},
 ],
}
w('B', B)

# ---------------------------------------------------------------- C. Directivos y gobierno
fuentesC = [
 {"id": 1, "titulo": "Tencent Holdings Limited, Annual Report 2025 (informe de gobierno, consejeros, remuneración, participaciones)", "editor": "Tencent", "tipo": "Primaria", "fecha": "2026-04-09", "url": f"{TA}/2026/04/09/62d786fcf3d3c8cb7e54791ee95439ac.pdf"},
 {"id": 2, "titulo": "Tencent Holdings Limited, Interim Report 2026 (participaciones significativas y de consejeros a 30-jun-2026)", "editor": "Tencent", "tipo": "Primaria", "fecha": "2026-08-27", "url": "https://www.tencent.com/wp-content/uploads/2026/08/E700_IR.pdf"},
 {"id": 3, "titulo": "Date of Board Meeting (3T26: 18-nov-2026) y composición del consejo", "editor": "Tencent / HKEX", "tipo": "Primaria", "fecha": "2026-09-24", "url": "https://www.tencent.com/wp-content/uploads/2026/09/E700_BM.pdf"},
 {"id": 4, "titulo": "Poll results of the annual general meeting held on 14 May 2025", "editor": "Tencent / HKEX", "tipo": "Primaria", "fecha": "2025-05-14", "url": "https://static.www.tencent.com/uploads/2025/05/14/0dce12a0fba41a029bde4ba9c6602595.pdf"},
 {"id": 5, "titulo": "Poll results of the annual general meeting held on 14 May 2024", "editor": "Tencent / HKEX", "tipo": "Primaria", "fecha": "2024-05-14", "url": "https://www1.hkexnews.hk/listedco/listconews/sehk/2024/0514/2024051401111.pdf"},
 {"id": 6, "titulo": "Tencent Holdings Limited, Annual Report 2024 (participaciones significativas a dic-24)", "editor": "Tencent", "tipo": "Primaria", "fecha": "2025-04-08", "url": f"{TA}/2025/04/08/1132b72b565389d1b913aea60a648d73.pdf"},
 {"id": 7, "titulo": "Tencent unveils 13 May 2026 AGM agenda: mandatos de emisión y recompra del 10 %, reelección de Koos Bekker e Ian Stone", "editor": "Tiger Brokers", "tipo": "Prensa", "fecha": "2026-04", "url": "https://www.itiger.com/news/1120737362"},
 {"id": 8, "titulo": "Tencent Announces 2026 Second Quarter Results", "editor": "Tencent", "tipo": "Primaria", "fecha": "2026-08-12", "url": "https://www.tencent.com/wp-content/uploads/2026/08/Tencent-Announces-2026-Second-Quarter-Results.pdf"},
]
C = {
 "directivos": {
  "equipo": [
   {"nombre": "Ma Huateng (Pony Ma)", "cargo": "Cofundador, presidente y consejero delegado", "desde": "1998", "participacion_pct": 8.85, "trayectoria": "Fundó Tencent en 1998 y la dirige desde entonces; único consejero ejecutivo. Con él los ingresos pasaron de 560.118 M en 2021 a 751.766 M en 2025 y el beneficio no NIIF de 123.788 M a 259.626 M tras la campaña regulatoria [1]."},
   {"nombre": "Martin Lau Chi Ping", "cargo": "President", "desde": "2006", "participacion_pct": None, "trayectoria": "Antiguo banquero de inversión; lleva la estrategia, las inversiones y la relación con los inversores [1]."},
   {"nombre": "John Lo Shek Hon", "cargo": "Director financiero", "desde": "2016", "participacion_pct": None, "trayectoria": "Director financiero desde 2016: dividendos crecientes, recompras y financiación de la IA con bonos en 2026 [1]."},
   {"nombre": "James Gordon Mitchell", "cargo": "Director de estrategia", "desde": "2011", "participacion_pct": None, "trayectoria": "Estrategia e inversiones internacionales, sobre todo en juegos [1]."},
  ],
  "historial_guidance": [
   {"anio": "2025", "guia": "Inversión en 2025 por encima de 2024 (marzo de 2025)", "real": "79.198 M frente a 76.760 M (definición de la empresa), por debajo de lo que había dado a entender por falta de chips", "cumplida": "Parcial"},
   {"anio": "2026", "guia": "Más inversión en IA, menos recompras y dividendo al alza (marzo de 2026)", "real": "Dividendo de 5,30 HKD (+18 %); recompras del semestre de 50,0 M de acciones (81,9 M un año antes); inversión del 2T26 de 52.784 M (+176 %)", "cumplida": "Sí"},
  ],
  "comentario": "Equipo muy estable: Ma Huateng (desde 1998), Martin Lau (desde 2006) y John Lo (desde 2016) pasaron juntos la campaña regulatoria de 2021-22 [1]. Tencent no da guía numérica de ingresos ni de beneficio, así que el historial se mide por la inversión y la política de capital, y se ha cumplido en lo esencial [1, 2, 8]. La sucesión es el riesgo: Ma Huateng (54 años) acumula presidencia y dirección y no hay número dos designado públicamente; el consejo tiene ocho miembros, cinco independientes [3].",
  "confianza": "Alta",
 },
 "gobierno": {
  "consejo": [
   {"nombre": "Ma Huateng", "cargo": "Presidente y consejero delegado", "tipo": "Ejecutivo", "desde": "1999", "comisiones": "—"},
   {"nombre": "Jacobus Petrus (Koos) Bekker", "cargo": "Consejero no ejecutivo (Naspers/Prosus)", "tipo": "Dominical", "desde": "2012", "comisiones": "—"},
   {"nombre": "Charles St Leger Searle", "cargo": "Consejero no ejecutivo (Naspers/Prosus)", "tipo": "Dominical", "desde": "2001", "comisiones": "Auditoría"},
   {"nombre": "Li Dong Sheng", "cargo": "Consejero independiente", "tipo": "Independiente", "desde": "2004", "comisiones": "Auditoría, nombramientos"},
   {"nombre": "Ian Charles Stone", "cargo": "Consejero independiente", "tipo": "Independiente", "desde": "2004", "comisiones": "Auditoría, remuneración"},
   {"nombre": "Yang Siu Shun", "cargo": "Consejero independiente", "tipo": "Independiente", "desde": "2016", "comisiones": "Auditoría (presidente)"},
   {"nombre": "Ke Yang", "cargo": "Consejera independiente", "tipo": "Independiente", "desde": "2019", "comisiones": "—"},
   {"nombre": "Zhang Xiulan", "cargo": "Consejera independiente", "tipo": "Independiente", "desde": "2022", "comisiones": "—"},
  ],
  "presidente_ceo_separados": False, "presidente_ejecutivo": True, "consejero_coordinador": False, "una_accion_un_voto": True,
  "operaciones_vinculadas_relevantes": False, "variable_ligado_rentabilidad": False, "auditoria_independiente": True,
  "insiders_sin_operaciones": False, "accionista_control": False, "presidente_vinculado_control": False, "cambios_cupula_24m": 0,
  "voto_remuneracion_pct": 96.6, "voto_remuneracion_contra_pct": 3.4, "voto_remuneracion_contra_libre_pct": None, "voto_cupula_pct": None,
  "remuneracion_ceo": {"anio": "2025", "total": 48.53, "fijo": 9.16, "variable_corto": 39.38, "variable_largo": 0.0, "ratio_salario_medio": 42},
  "remuneracion": "En Hong Kong no hay voto consultivo del informe de remuneración: la junta vota cada año la autorización al consejo para fijar la remuneración de los consejeros, aprobada con un 96,6-96,7 % a favor en 2024 y 2025 [4, 5]. Ma Huateng cobró 48,53 M RMB en 2025 (45,07 M en 2024): 9,16 M fijos y 39,38 M de bonus, sin acciones (ya tiene el 8,85 %) [1, 2]; unas 42 veces el coste medio por empleado (130.699 M de gastos de personal entre ≈113.000 empleados medios; estimación propia) [1]. El informe no publica métricas ni pesos del bonus ni cláusulas de recuperación: el variable no está ligado de forma visible a ROIC, TSR o caja. El grueso de la retribución de los directivos es en acciones (31.859 M de pagos en acciones en 2025) [1].",
  "accionistas": [
   {"nombre": "Prosus / Naspers (MIH Internet Holdings B.V.)", "pct": 22.60, "tipo": "Industrial (primer accionista)", "variacion": "24,01 % (dic-24) → 22,80 % (dic-25) → 22,60 % (jun-26): vende de forma continua para financiar sus recompras [2, 6, 1]."},
   {"nombre": "Ma Huateng (Advance Data Services, incl. Ma Huateng Global Foundation)", "pct": 8.85, "tipo": "Fundador", "variacion": "Estable (804,9 M de acciones) [2]."},
   {"nombre": "Acciones del plan de incentivos (fideicomiso)", "pct": 0.93, "tipo": "Planes de empleados", "variacion": "84,3 M de acciones a 30-jun-2026 (81,1 M en dic-25) [2]."},
  ],
  "insiders": [],
  "control_y_defensas": "Sociedad de las Islas Caimán con una sola clase de acciones; opera en China a través de entidades de interés variable (VIE): Tencent Computer es propiedad legal de los fundadores chinos (Ma Huateng tiene el 54,29 % de su capital registrado) y Tencent la controla por contratos [1, 2]. Prosus (22,60 %) es el primer accionista con dos consejeros dominicales, pero no controla la junta ni nombra al primer ejecutivo; el fundador (8,85 %) preside y dirige [2, 3]. El mandato de emisión del 10 % recibe un 31-35 % de votos en contra cada año (2024: 34,5 %; 2025: 30,9 %) por la dilución posible [4, 5].",
  "alertas": [
   "Presidente y consejero delegado en la misma persona, sin consejero coordinador independiente [3].",
   "Estructura VIE: los derechos del accionista extranjero dependen de contratos con entidades chinas [1].",
   "Lista 1260H del Pentágono (desde enero de 2025) y revisión de CFIUS sobre Epic, Riot y Supercell abierta en 2026.",
   "Venta continua de Prosus (24,01 % → 22,60 % en 18 meses) [2, 6].",
   "Dos independientes en el consejo desde 2004 (más de 20 años), lo que reduce su independencia de hecho [3].",
  ],
  "confianza": "Alta",
 },
 "fuentes": fuentesC,
 "huecos": [
  {"seccion": "gobierno", "campo": "Operaciones de consejeros en 12 meses", "tipo": "Complemento", "intentos": "1) Informe intermedio 2026: solo saldos de participación a 30-jun; 2) avisos de HKEX de la empresa: sin operaciones de consejeros, solo recompras; 3) registro de divulgación de intereses (SDI) de HKEX: no consultable sin navegador", "decision": "Omitido"},
  {"seccion": "gobierno", "campo": "Votos de la junta de mayo de 2026", "tipo": "Complemento", "intentos": "1) Web de inversores (anuncios de mayo de 2026): no listados en la página actual; 2) HKEXnews: búsqueda sin acceso directo; 3) prensa: solo el orden del día", "decision": "Se usan las juntas de 2024 y 2025"},
 ],
}
w('C', C)

# ---------------------------------------------------------------- D. Mercado y valoración
bolsa = json.load(open(os.path.join(DIR, 'bolsa.json'), encoding='utf-8'))
yc = json.load(open(os.path.join(DIR, 'yahoo-comparables.json'), encoding='utf-8'))
USD = 6.6862  # RMB por USD, BCE 16-oct-2026

def comp(nombre, ticker, pais, sym, cap_rmb, per_ntm, crec, ev_ventas=None):
    x = yc[sym]
    return {"nombre": nombre, "ticker": ticker, "pais": pais, "capitalizacion": round(cap_rmb), "ev_ventas": ev_ventas if ev_ventas is not None else r2(x['ev_ventas']),
            "ev_ebitda_ltm": round(x['ev_ebitda'], 1), "ev_ebitda_ntm": None, "per_ntm": per_ntm, "crecimiento_pct": crec,
            "margen_ebitda_pct": round(x['margen_ebitda'] * 100, 1), "roic_pct": None,
            "dn_ebitda": round((x['deuda'] - x['caja']) / x['ebitda'], 1), "fcf_yield_pct": None}

# crecimiento_pct: ventas de los próximos 12 meses, consenso de Yahoo (earningsTrend 0y y +1y) ponderado por meses:
# 0,2 × año en curso + 0,8 × año siguiente (Alibaba, ejercicio a marzo: 0,45 / 0,55).
comps = [
 comp("Alibaba", "9988.HK", "CN", "9988.HK", 2165333.3 * TC, 13.9, 11.2),
 comp("NetEase", "9999.HK", "CN", "9999.HK", 632966.6 * TC, 12.1, 7.5),
 comp("Baidu", "9888.HK", "CN", "9888.HK", 216373.2 * TC, 11.0, 4.7),
 comp("Kuaishou", "1024.HK", "CN", "1024.HK", 125996.7 * TC, 10.6, 3.4),
 comp("PDD Holdings", "PDD", "CN", "PDD", 115722.1 * USD, 6.8, 10.5, ev_ventas=0.71),
 comp("Meta Platforms", "META", "US", "META", 1789495.7 * USD, 21.2, 21.9),
 comp("Alphabet", "GOOGL", "US", "GOOGL", 4209054.6 * USD, 22.8, 24.8),
 comp("Netflix", "NFLX", "US", "NFLX", 289685.3 * USD, 18.5, 11.6),
]
comps[4]["ev_ebitda_ltm"] = 3.3  # PDD: Yahoo mezcla capitalización en USD y cuentas en RMB; recalculado en RMB
fcf = {"9988.HK": -82644.1 / (2165333.3 * TC), "9999.HK": 32770.6 / (632966.6 * TC), "9888.HK": -2095.4 / (216373.2 * TC), "1024.HK": 15966.6 / (125996.7 * TC),
       "PDD": 74635.3 / (115722.1 * USD), "META": 21553.6 / 1789495.7, "GOOGL": 22665.0 / 4209054.6, "NFLX": 25387.6 / 289685.3}
for c in comps:
    c["fcf_yield_pct"] = round(fcf[c["ticker"]] * 100, 1)

fuentesD = [
 {"id": 1, "titulo": "Tencent (0700.HK), 2800.HK y 3033.HK: históricos diarios hasta el 16-oct-2026 (precio, rango, volumen, rentabilidades, beta, volatilidad, cierres anuales)", "editor": "Yahoo Finance, históricos diarios", "tipo": "Datos de mercado", "fecha": "2026-10-16", "url": "https://finance.yahoo.com/quote/0700.HK/history/"},
 {"id": 2, "titulo": "Euro foreign exchange reference rates (CNY, HKD y USD del 16-oct-2026 y de cada cierre de año)", "editor": "Banco Central Europeo", "tipo": "Datos de mercado", "fecha": "2026-10-16", "url": "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist.zip"},
 {"id": 3, "titulo": "China 10Y Bond Yield: 1,66 % el 19-oct-2026", "editor": "Trading Economics", "tipo": "Datos de mercado", "fecha": "2026-10-19", "url": "https://tradingeconomics.com/china/government-bond-yield"},
 {"id": 4, "titulo": "Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %", "editor": "Damodaran Online", "tipo": "Datos de mercado", "fecha": "2026-10", "url": "https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx"},
 {"id": 5, "titulo": "Tencent Holdings: consenso (43 analistas, objetivo medio 560,64 CNY, 366,08-757,08) y estimaciones anuales 2026-2028", "editor": "MarketScreener", "tipo": "Analistas", "fecha": "2026-10-19", "url": "https://www.marketscreener.com/quote/stock/TENCENT-HOLDINGS-LIMITED-3045861/consensus/"},
 {"id": 6, "titulo": "0700.HK: earningsTrend y financialData (BPA no NIIF 2026e 28,89 y 2027e 30,50 RMB; 41 analistas, objetivo 655,19 HKD, 429,71-888,67)", "editor": "Yahoo Finance", "tipo": "Analistas", "fecha": "2026-10-19", "url": "https://finance.yahoo.com/quote/0700.HK/analysis/"},
 {"id": 7, "titulo": "Comparables: capitalización, valor empresa, EBITDA, márgenes, caja, deuda, FCF y BPA estimados de 9988.HK, 9999.HK, 9888.HK, 1024.HK, PDD, META, GOOGL y NFLX", "editor": "Yahoo Finance (quoteSummary)", "tipo": "Datos de mercado", "fecha": "2026-10-19", "url": "https://finance.yahoo.com/"},
 {"id": 8, "titulo": "Tencent Announces 2026 Second Quarter Results (participaciones cotizadas 487.200 M y no cotizadas 387.900 M; caja y deuda)", "editor": "Tencent", "tipo": "Primaria", "fecha": "2026-08-12", "url": "https://www.tencent.com/wp-content/uploads/2026/08/Tencent-Announces-2026-Second-Quarter-Results.pdf"},
 {"id": 9, "titulo": "Next Day Disclosure Return, 15-oct-2026", "editor": "Tencent / HKEX", "tipo": "Primaria", "fecha": "2026-10-15", "url": "https://www.tencent.com/wp-content/uploads/2026/10/e_Next-Day-Disclosure-Return_20261015.pdf"},
 {"id": 10, "titulo": "Tencent Holdings Limited, Interim Report 2026 (acciones emitidas, del plan de incentivos y recompradas a 30-jun-2026; acciones diluidas del 2T26)", "editor": "Tencent", "tipo": "Primaria", "fecha": "2026-08-27", "url": "https://www.tencent.com/wp-content/uploads/2026/08/E700_IR.pdf"},
 {"id": 11, "titulo": "Date of Board Meeting: resultados del 3T26 el 18-nov-2026", "editor": "Tencent / HKEX", "tipo": "Primaria", "fecha": "2026-09-24", "url": "https://www.tencent.com/wp-content/uploads/2026/09/E700_BM.pdf"},
]
iden = bolsa['identificacion']
D = {
 "identificacion": {
  "nombre": "Tencent Holdings Limited", "nombre_corto": "Tencent", "ticker": "0700.HK", "isin": "KYG875721634", "mercado": "Hong Kong Stock Exchange (línea en HKD; también línea en RMB 80700)",
  "indice_referencia": "Hang Seng (Tracker Fund 2800.HK)", "pais": "China (sociedad de las Islas Caimán)", "pais_iso": "CN", "sector": "Servicios de comunicación",
  "industria": "Medios e internet interactivos; entretenimiento", "sede": "Shenzhen", "fundacion": "1998", "empleados": 115927, "web": "https://www.tencent.com",
  "precio": r2(iden['precio'] * TC), "fecha_precio": iden['fecha_precio'], "acciones": 9133.0, "capitalizacion_publicada": round(3762314.0 * TC), "free_float_pct": 68.5,
  "max_52s": r2(iden['max_52s'] * TC), "min_52s": r2(iden['min_52s'] * TC),
  "volumen_medio_diario": f"≈ {bolsa['volumen_3m']['importe_dia_millones']:,.0f} M HKD/día (3 meses)".replace(',', '.'), "proximos_resultados": "2026-11-18",
 },
 "consenso": {
  "guidance": "Tencent no da guía numérica de ingresos ni de beneficio. En la presentación del 2T26 (12-ago-2026) reiteró que el negocio de siempre crece con fuerza y financia la IA, y que aumentó de forma sustancial la compra de capacidad de cálculo, que convertirá el uso de sus aplicaciones y modelos en ingresos [8]. Hy4 se lanzará antes de fin de año. No hay plan a medio plazo con cifras.",
  "estimaciones": [
   {"periodo": "2026e", "ingresos": 824828, "ebitda": 356688, "ebit": 263403, "bpa": 28.89, "dpa": 5.02, "fuente": "MarketScreener (ventas, EBITDA ajustado, EBIT, DPA; 43 analistas) y Yahoo (BPA no NIIF, 32 analistas) [5, 6]"},
   {"periodo": "2027e", "ingresos": 902991, "ebitda": 389600, "ebit": 274264, "bpa": 30.50, "dpa": 5.20, "fuente": "MarketScreener y Yahoo (BPA no NIIF, 33 analistas) [5, 6]"},
   {"periodo": "2028e", "ingresos": 990906, "ebitda": 441783, "ebit": 299138, "bpa": None, "dpa": 5.75, "fuente": "MarketScreener (BPA NIIF 28,96; sin no NIIF) [5]"},
  ],
  "recomendaciones": {"n_analistas": 43, "comprar": None, "mantener": None, "vender": None, "po_medio": 560.64, "po_min": 366.08, "po_max": 757.08},
  "revisiones": "El BPA no NIIF del consenso baja: 2026e de 29,73 RMB hace 90 días a 28,89 hoy (−2,8 %) y 2027e de 32,65 a 30,50 (−6,6 %) [6], por la amortización y el gasto de los nuevos productos de IA tras el 2T26. Los objetivos también bajan: Nomura de 727 a 695 HKD (14-ago) y Jefferies de 750 a 711 HKD (9-oct), con más recortes que subidas desde marzo [5]. Yahoo da 41 analistas con recomendación media «strong buy» y objetivo de 655,19 HKD (429,71-888,67) [6]; MarketScreener, 43 con «Comprar» y 560,64 CNY (≈658 HKD) [5]. El EBITDA de MarketScreener es el ajustado de Tencent (suma los pagos liquidados en acciones: 336.427 M en 2025).",
  "base_ebitda": "ajustado", "ajuste_ebitda_pct_ventas": 3.4,
 },
 "bolsa": {**bolsa['bolsa'], "posicion_corta_pct": None},
 "multiplos_historicos": {"serie": [
   {"anio": a, "precio_cierre": r2(c * TC_FIN[a]), "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False}
   for a, c in [(x['anio'], x['precio_cierre']) for x in bolsa['cierres_ejercicio']] if a in ("2021", "2022", "2023", "2024", "2025")]},
 "comparables": {
  "criterio": "Plataformas de internet con publicidad, juegos o nube. Chinas (Alibaba, NetEase, Baidu, Kuaishou, PDD), con el mismo riesgo país y BPA ajustado como el no NIIF de Tencent, y estadounidenses (Meta, Alphabet, Netflix), con el mismo modelo de publicidad, contenidos e IA. Todas con datos de Yahoo del mismo día (16-19 oct) [7]; PER de los próximos 12 meses = precio ÷ (0,2 × BPA 2026e + 0,8 × BPA 2027e) (Alibaba, ejercicio a marzo: 0,45/0,55); capitalización en millones de RMB al tipo del BCE del 16-oct [2]. ByteDance no cotiza. El EV/EBITDA de las chinas mezcla definiciones: la comparación útil es el PER.",
  "empresas": comps,
 },
 "transacciones": None,
 "valoracion": {
  "puente": {"fecha": "2026-06-30", "deuda_financiera": 212650 + 154021 + 86292, "arrendamientos": 13366 + 5499, "caja": 58191 + 212650 + 154021 + 86292, "minoritarios": 86660, "pensiones": 0, "asociadas": round((487200 + 387900) * 0.8), "otros_ajustes": 0},
 },
 "fuentes": fuentesD,
 "huecos": [
  {"seccion": "transacciones", "campo": "Operaciones comparables con múltiplo", "tipo": "Complemento", "intentos": "1) Notas de combinaciones de negocios de los informes anuales 2023-2025: compras pequeñas sin múltiplo; 2) operaciones del sector (Microsoft-Activision, compra de EA, Take-Two-Zynga): perímetros de juegos occidentales sin EBITDA comparable publicado en el documento oficial leído; 3) prensa: múltiplos con sinergias o sin base", "decision": "Omitido"},
  {"seccion": "consenso", "campo": "Desglose de recomendaciones (comprar/mantener/vender)", "tipo": "Complemento", "intentos": "1) MarketScreener: solo en gráfico; 2) Yahoo: solo la media («strong buy»); 3) ValueInvesting.io: 403", "decision": "Omitido"},
  {"seccion": "bolsa", "campo": "Posición corta", "tipo": "Complemento", "intentos": "1) HKEX publica ventas en corto diarias, no posición; 2) SFC (short position reporting): requiere descarga de archivo semanal no localizada; 3) Yahoo: sin dato para 0700.HK", "decision": "Omitido"},
 ],
}
w('D', D)

# ---------------------------------------------------------------- E. Sentimiento
fuentesE = [
 {"id": 1, "titulo": "Guba (Eastmoney), foro de 00700 Tencent: ≈80 hilos del 4 al 20-oct-2026", "editor": "Eastmoney", "tipo": "Foros y redes", "fecha": "2026-10-19", "url": "https://guba.eastmoney.com/list,hk00700.html"},
 {"id": 2, "titulo": "Stocktwits, flujo de $TCEHY (ago-oct 2026)", "editor": "Stocktwits", "tipo": "Foros y redes", "fecha": "2026-10-08", "url": "https://api.stocktwits.com/api/2/streams/symbol/TCEHY.json"},
 {"id": 3, "titulo": "Seeking Alpha, análisis y noticias de TCEHY (ago-oct 2026)", "editor": "Seeking Alpha", "tipo": "Foros y redes", "fecha": "2026-10-19", "url": "https://seekingalpha.com/api/sa/combined/TCEHY.xml"},
 {"id": 4, "titulo": "Morningstar: «Tencent: AI Panic Hits Earnings Multiple, Not the Fundamentals» y «Shares Look Cheap…»", "editor": "Morningstar", "tipo": "Analistas", "fecha": "2026-09-22", "url": "https://www.morningstar.com/"},
]
E = {
 "sentimiento": {
  "tono": "Dividido", "tendencia": "Empeora",
  "revisadas": [
   {"plataforma": "Guba (Eastmoney), foro de 00700", "fecha": "2026-10", "n_comentarios": 80, "tono": "Negativo", "resumen": "Pesimismo de particulares chinos: «el modelo no tiene ventaja, la capacidad de cálculo es alquilada», la caída con un yuan que se aprecia y la competencia de ByteDance en microdramas (Hongguo); minoría que ve el Hang Seng Tech «a precio de saldo» [1]."},
   {"plataforma": "Stocktwits ($TCEHY)", "fecha": "2026-10", "n_comentarios": 30, "tono": "Dividido", "resumen": "Mensajes sueltos: compradores que la ven barata y que dicen que «China ganó la carrera de la IA», frente a quien teme dilución, flujo de caja negativo por la inversión y riesgo de tener acciones chinas [2]."},
   {"plataforma": "Seeking Alpha (TCEHY)", "fecha": "2026-09", "n_comentarios": 25, "tono": "Positivo", "resumen": "Autores mayoritariamente alcistas («AI spending is surging, but the stock appears too cheap», «Still a buy beyond the macro shadows»); noticias de bonos para IA y del arrendamiento de chips vía Oracle [3]."},
   {"plataforma": "Morningstar (análisis)", "fecha": "2026-09", "n_comentarios": 2, "tono": "Positivo", "resumen": "Defiende que la caída es de múltiplo y no de fundamentales, y que el éxito de los agentes de Meta refuerza la tesis alcista [4]."},
  ],
  "temas": [
   {"tema": "Retorno de la inversión en IA y caja libre negativa", "postura": "Bajista", "peso": "Alto", "contraste": "Cierto en caja: FCF del 2T26 de −13.800 M y BPA de consenso recortado un 2,8-6,6 % en 90 días; pero el negocio de siempre crece (resultado operativo no NIIF sin IA +19 %)."},
   {"tema": "Tencent está barata", "postura": "Alcista", "peso": "Alto", "contraste": "Coincide con las cifras: 11,9 veces nuestro BPA de 2027e frente a una mediana adelantada de 17,2 veces; pero el BPA −10 % y la regla v2 no pasan la compra."},
   {"tema": "Competencia de ByteDance (Doubao, microdramas)", "postura": "Bajista", "peso": "Medio", "contraste": "Riesgo recogido en competencia y en el bajista; Video Accounts sigue ganando tiempo de uso (+20 %)."},
   {"tema": "Riesgo geopolítico (1260H, CFIUS, acciones chinas)", "postura": "Bajista", "peso": "Medio", "contraste": "Recogido en la prima adicional del WACC y en riesgos; sin fecha de decisión de CFIUS."},
  ],
  "lectura": "El sentimiento está dividido y ha empeorado con la caída del 38 % desde el máximo: los particulares chinos son pesimistas (IA alquilada, competencia de ByteDance) y los autores occidentales ven una oportunidad de valoración. No hay euforia; si acaso, cansancio. Coincide con la revisión a la baja del BPA del consenso y no contradice a los analistas, que siguen en «comprar» con objetivos recortados. No aporta un riesgo que el informe no tenga: el debate es el retorno de la IA, que es la variable central de la tesis.",
  "confianza": "Media",
 },
 "fuentes": fuentesE,
 "huecos": [],
}
w('E', E)
print('A-E escritas')

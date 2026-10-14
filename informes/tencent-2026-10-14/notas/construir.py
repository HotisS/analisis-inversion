# Escribe las notas A-E de Tencent (corte 2026-10-14) a partir de los extractos de búsqueda.
# Entorno nube: solo WebSearch. Cifras en millones de RMB salvo que se diga otra cosa.
import json, os
DIR = os.path.dirname(os.path.abspath(__file__))
def w(letra, obj):
    with open(os.path.join(DIR, f'{letra}.json'), 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)

HKD = 0.859  # RMB por HKD (6,70 RMB/USD ÷ 7,80 HKD/USD), ver D2-D3

# ---------------------------------------------------------------- A. Cuentas
fuentesA = [
 {"id": 1, "titulo": "Tencent Announces 2026 Second Quarter Results (comunicado, extracto de búsqueda)", "editor": "Tencent / PR Newswire", "tipo": "Primaria", "fecha": "2026-08-12", "url": "https://en.prnasia.com/releases/apac/tencent-announces-2026-second-quarter-results-543788.shtml"},
 {"id": 2, "titulo": "Tencent Announces 2026 Second Quarter Results (PDF)", "editor": "Tencent", "tipo": "Primaria", "fecha": "2026-08-12", "url": "https://www.tencent.com/wp-content/uploads/2026/08/Tencent-Announces-2026-Second-Quarter-Results.pdf"},
 {"id": 3, "titulo": "Tencent Announces 2025 Annual and Fourth Quarter Results", "editor": "Tencent / PR Newswire", "tipo": "Primaria", "fecha": "2026-03-18", "url": "https://en.prnasia.com/releases/apac/tencent-announces-2025-annual-and-fourth-quarter-results-525781.shtml"},
 {"id": 4, "titulo": "Tencent Announces 2024 Annual and Fourth Quarter Results", "editor": "Tencent / PR Newswire", "tipo": "Primaria", "fecha": "2025-03-19", "url": "https://en.prnasia.com/releases/apac/tencent-announces-2024-annual-and-fourth-quarter-results-482244.shtml"},
 {"id": 5, "titulo": "Tencent Holdings (TCEHY): cuenta de resultados anual 2021-2025 (ingresos, beneficio bruto, resultado operativo sin otras ganancias)", "editor": "Stock Analysis", "tipo": "Datos de mercado", "fecha": "2026-10", "url": "https://stockanalysis.com/quote/otc/TCEHY/financials/"},
 {"id": 6, "titulo": "Tencent Holdings (TCEHY): estado de flujos anual 2021-2025 (flujo operativo, amortizaciones)", "editor": "Stock Analysis", "tipo": "Datos de mercado", "fecha": "2026-10", "url": "https://stockanalysis.com/quote/otc/TCEHY/financials/cash-flow-statement/"},
 {"id": 7, "titulo": "Tencent Holdings: cuenta de resultados (beneficio atribuido 2021-2025)", "editor": "Stockopedia", "tipo": "Datos de mercado", "fecha": "2026-10", "url": "https://www.stockopedia.com/share-prices/tencent-holdings-PNK:TCEHY/income-statement/"},
 {"id": 8, "titulo": "Tencent Holdings: flujos de caja (inversiones en inmovilizado 2021-2025)", "editor": "Stockopedia", "tipo": "Datos de mercado", "fecha": "2026-10", "url": "https://www.stockopedia.com/share-prices/tencent-holdings-PNK:TCEHY/cashflow/"},
 {"id": 9, "titulo": "Tencent Holdings: balance (caja e inversiones a corto 2021-2025)", "editor": "Stockopedia", "tipo": "Datos de mercado", "fecha": "2026-10", "url": "https://www.stockopedia.com/share-prices/tencent-holdings-PNK:TCEHY/balance-sheet/"},
 {"id": 10, "titulo": "Tencent Holdings Limited, Annual Report 2025 (activo, patrimonio y pasivo 2021-2025)", "editor": "Tencent", "tipo": "Primaria", "fecha": "2026-04-09", "url": "https://static.www.tencent.com/uploads/2026/04/09/62d786fcf3d3c8cb7e54791ee95439ac.pdf"},
 {"id": 11, "titulo": "Tencent (TCEHY): BPA diluido y acciones diluidas 2021-2024", "editor": "TipRanks", "tipo": "Datos de mercado", "fecha": "2026-10", "url": "https://www.tipranks.com/stocks/tcehy/financials/income-statement"},
 {"id": 12, "titulo": "Tencent Annual Report 2022 (beneficio no NIIF 2018-2022, BPA 2022)", "editor": "Tencent", "tipo": "Primaria", "fecha": "2023-04", "url": "https://www.lobbyregister.bundestag.de/media/1b/a6/214920/Tencent-Annual-Report-2022.pdf"},
 {"id": 13, "titulo": "Tencent beats FY estimates as AI capabilities boost sales (segmentos 2025)", "editor": "Hargreaves Lansdown", "tipo": "Prensa", "fecha": "2026-03-18", "url": "https://www.hl.co.uk/shares/stock-market-news/company--news/archive/tencent-beats-fy-estimates-as-ai-capabilities-boost-sales"},
 {"id": 14, "titulo": "Tencent 1Q26 results presentation", "editor": "Tencent (vía InvestGame)", "tipo": "Primaria", "fecha": "2026-05-13", "url": "https://investgame.net/news/pdf/2026-05-13-tencent_q126_wp/"},
 {"id": 15, "titulo": "Tencent shares fall as AI spending squeezes profit", "editor": "Caixin Global", "tipo": "Prensa", "fecha": "2026-08-13", "url": "https://www.caixinglobal.com/2026-08-13/tencent-shares-fall-as-ai-spending-squeezes-profit-102473810.html"},
 {"id": 16, "titulo": "Tencent Q2 revenue climbs 11% on AI-driven ad gains, but profit misses the mark", "editor": "Crypto Briefing", "tipo": "Prensa", "fecha": "2026-08-12", "url": "https://cryptobriefing.com/tencent-q2-revenue-ai-ad-gains-profit-miss/"},
 {"id": 17, "titulo": "Tencent repurchases shares worth HK$500m (mandato de recompra de 13-may-2026; 9.118 M de acciones emitidas)", "editor": "FilingReader (aviso HKEX)", "tipo": "Primaria", "fecha": "2026-05-27", "url": "https://filingreader.com/news-wire/hongkong/2026-05-27/tencent-repurchases-shares-worth-hk500m-in-capital-return-drive"},
 {"id": 18, "titulo": "Tencent repurchases HK$204m in shares under buyback mandate (34,98 M de acciones acumuladas)", "editor": "FilingReader (aviso HKEX)", "tipo": "Primaria", "fecha": "2026-07-06", "url": "https://filingreader.com/news-wire/hongkong/2026-07-06/tencent-repurchases-hk204m-in-shares-under-buyback-mandate"},
 {"id": 19, "titulo": "Tencent expects 2025 capex below guidance, sufficient GPU reserves", "editor": "Tiger Brokers", "tipo": "Prensa", "fecha": "2025-11-13", "url": "https://www-web.itiger.com/news/1171126593"},
 {"id": 20, "titulo": "Tencent Q2 2026 earnings analysis", "editor": "Beancount.io", "tipo": "Prensa", "fecha": "2026-09-14", "url": "https://beancount.io/blog/2026/09/14/tencent-q2-2026-earnings-analysis"},
]

# Cuenta: ingresos, beneficio bruto y resultado operativo sin «otras ganancias» (Stock Analysis [5]); amortizaciones [6];
# beneficio atribuido [7]; BPA diluido NIIF [11] (2025: beneficio diluido 223.270 / 9.312 M de acciones diluidas [7, 3]).
filas = [
 # periodo, ingresos, bruto, ebit, amort, bn, bpa, dpa_hkd, tc_cierre, acciones
 ("2021", 560118, 245931, 123850, 27794, 224822, 23.16, 1.60, 0.817, 9700),
 ("2022", 554552, 238887, 110880, 30137, 188243, 19.34, 2.40, 0.893, 9700),
 ("2023", 609015, 293112, 162964, 27387, 115216, 11.89, 3.40, 0.907, 9610),
 ("2024", 660257, 349298, 207957, 28323, 194073, 20.49, 4.50, 0.940, 9410),
 ("2025", 751766, 422870, 245628, 33988, 224842, 23.98, 5.30, 0.900, 9312),
]
cuenta = []
for p, ing, bruto, ebit, am, bn, bpa, dpa, tc, acc in filas:
    cuenta.append({"periodo": p, "ingresos": ing, "coste_ventas": ing - bruto, "gastos_generales": bruto - ebit,
        "ebitda": ebit + am, "amortizaciones": am, "ebit": ebit, "resultado_financiero": None, "bai": None, "impuestos": None,
        "minoritarios": None, "beneficio_neto": bn, "gastos_financieros": None, "participadas_en_ebitda": None,
        "no_recurrentes_en_ebitda": None, "bpa": bpa, "dpa": round(dpa * tc, 2), "dpa_extraordinario": 0, "acciones_diluidas": acc})

segs = {
 "Servicios de valor añadido (juegos y redes sociales)": [291572, 287565, 298375, 319168, 369300],
 "Servicios de marketing (publicidad)": [88666, 82729, 101482, 121374, 145000],
 "Fintech y servicios empresariales (pagos, nube)": [172195, 177064, 203763, 211956, 229400],
}
anios = ["2021", "2022", "2023", "2024", "2025"]
tot = [r[1] for r in filas]
otros = [tot[i] - sum(v[i] for v in segs.values()) for i in range(5)]
segmentos = [{"nombre": k, "descripcion": None, "tipo_resultado": None,
              "historico": [{"periodo": anios[i], "ingresos": v[i], "resultado": None} for i in range(5)]} for k, v in segs.items()]
segmentos.append({"nombre": "Otros", "descripcion": None, "tipo_resultado": None,
                  "historico": [{"periodo": anios[i], "ingresos": otros[i], "resultado": None} for i in range(5)]})
segmentos[0]["descripcion"] = "Juegos nacionales e internacionales y servicios de redes sociales (suscripciones de vídeo y música, objetos virtuales)."
segmentos[1]["descripcion"] = "Publicidad en Weixin (Video Accounts, Mini Programs, búsqueda), QQ y plataformas propias."
segmentos[2]["descripcion"] = "Weixin Pay y demás servicios financieros (pagos comerciales, gestión patrimonial, crédito al consumo) y Tencent Cloud."
segmentos[3]["descripcion"] = "Inversiones en producción de cine y televisión y otros."

A = {
 "_estado": "completo (extractos de búsqueda; ver huecos)",
 "negocio": {
  "segmentos": segmentos,
  "geografias": None, "geografias_criterio": None,
  "kpis": [
   {"kpi": "Ingresos de juegos nacionales (trimestre)", "valor_anterior": "≈40.400 M (2T25, derivado)", "valor_actual": "47.300 M (2T26)", "variacion": "+17 %", "comentario": "Delta Force, Honour of Kings y Peacekeeper Elite [1]."},
   {"kpi": "Ingresos de marketing (trimestre)", "valor_anterior": "≈35.700 M (2T25, derivado)", "valor_actual": "43.600 M (2T26)", "variacion": "+22 %", "comentario": "Mejores modelos de recomendación con IA y más inventario en Video Accounts [1]."},
   {"kpi": "Servicios de valor añadido (trimestre)", "valor_anterior": "≈91.100 M (2T25, derivado)", "valor_actual": "98.414 M (2T26)", "variacion": "+8 %", "comentario": "Los juegos crecen; las redes sociales, menos [1]."},
   {"kpi": "Inversión en inmovilizado (trimestre)", "valor_anterior": "19.100 M (2T25, derivado)", "valor_actual": "52.800 M (2T26)", "variacion": "+176 %", "comentario": "Servidores y centros de datos para IA; la caja libre del trimestre fue de −13.800 M [1, 15]."},
   {"kpi": "Usuarios mensuales de Yuanbao (asistente de IA)", "valor_anterior": None, "valor_actual": "114 M", "variacion": None, "comentario": "La dirección pasó recursos a WorkBuddy (agentes para empresas) y bajó la prioridad de Yuanbao [20]."},
  ],
 },
 "financieros": {
  "cuenta": cuenta,
  "ltm": {"periodo": "LTM dic-25", "fecha_fin": "2025-12-31", "ingresos": 751766, "ebitda": 279616, "ebit": 245628, "beneficio_neto": 224842,
          "bpa": 23.98, "dpa": round(5.30 * 0.900, 2), "dpa_extraordinario": 0, "fcf": 182600, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None},
  "cambios_perimetro": [],
 },
 "trimestres": {
  "items": [
   {"periodo": "1T25", "ingresos": 180022, "crecimiento_pct": 13.0, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": None},
   {"periodo": "2T25", "ingresos": 184504, "crecimiento_pct": 15.0, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": None},
   {"periodo": "3T25", "ingresos": 192869, "crecimiento_pct": 15.0, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": None},
   {"periodo": "4T25", "ingresos": 194371, "crecimiento_pct": 12.7, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": None},
   {"periodo": "1T26", "ingresos": 196500, "crecimiento_pct": 9.0, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": "Inferior"},
   {"periodo": "2T26", "ingresos": 204785, "crecimiento_pct": 11.0, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": "Inferior"},
  ],
  "ultima_presentacion": "En el 2T26 (12 de agosto) Tencent facturó 204.785 M (+11 %), por encima del consenso, pero el beneficio atribuido NIIF (56.000 M, +0,7 %) quedó por debajo de los ≈58.400 M esperados, y el no NIIF (68.400 M) creció un 9 % [1, 16]. La inversión en inmovilizado se disparó a 52.800 M (+176 %) y la caja libre fue negativa (−13.800 M; 37.600 M sin los anticipos por capacidad de cálculo para IA), la primera vez desde que la publica [1, 15]. La dirección presentó un resultado operativo no NIIF «sin los nuevos productos de IA» de 86.100 M (+19 %) para separar el negocio de siempre del gasto en IA, y anunció un aumento sustancial de la inversión en el segundo semestre con la llegada de chips ASIC diseñados en China [20]. Frente al 1T26 (ingresos +9 %, por debajo de lo esperado [14]), el discurso pasó de «ritmo prudente» a «aceleración»: en marzo había dicho que recortaría recompras para financiar la IA [3]. Los analistas preguntaron sobre todo por el retorno de la inversión en IA y por si la publicidad y los juegos la financian; la dirección no dio cifra de inversión anual ni plazo de retorno [20].",
 },
 "balance": {
  "historico": [
   {"periodo": "2021", "activo_total": 1612364, "activo_corriente": None, "pasivo_corriente": None, "pasivo_total": 735671, "fondo_comercio": None, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 264101, "deuda_financiera": None, "arrendamientos": None, "patrimonio_neto": 806299, "minoritarios": 70394, "reservas": None},
   {"periodo": "2022", "activo_total": 1578131, "activo_corriente": None, "pasivo_corriente": None, "pasivo_total": 795271, "fondo_comercio": None, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 290756, "deuda_financiera": None, "arrendamientos": None, "patrimonio_neto": 721391, "minoritarios": 61469, "reservas": None},
   {"periodo": "2023", "activo_total": 1577246, "activo_corriente": None, "pasivo_corriente": None, "pasivo_total": 703565, "fondo_comercio": None, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 379155, "deuda_financiera": None, "arrendamientos": None, "patrimonio_neto": 808591, "minoritarios": 65090, "reservas": None},
   {"periodo": "2024", "activo_total": 1780995, "activo_corriente": None, "pasivo_corriente": None, "pasivo_total": 727099, "fondo_comercio": None, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 415400, "deuda_financiera": 338600, "arrendamientos": None, "patrimonio_neto": 973548, "minoritarios": 80348, "reservas": None},
   {"periodo": "2025", "activo_total": 2038986, "activo_corriente": None, "pasivo_corriente": None, "pasivo_total": 797921, "fondo_comercio": None, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 426753, "deuda_financiera": 319653, "arrendamientos": None, "patrimonio_neto": 1154152, "minoritarios": 86913, "reservas": None},
  ],
  "vencimientos": None,
  "liquidez": "Caja total de 511.200 M y caja neta de 58.200 M a 30-jun-2026 (−22 % interanual): la deuda bruta (préstamos y bonos) ronda los 453.000 M [1].",
  "rating": None, "coste_deuda_pct": None, "vida_media_anios": None,
 },
 "flujos": {
  "historico": [
   {"periodo": "2021", "flujo_operativo": 175186, "capex": 60461, "pagos_arrendamientos": None, "adquisiciones": None, "desinversiones": None, "dividendos": None, "recompras": None, "emision_acciones": None, "intereses_en_financiacion": None},
   {"periodo": "2022", "flujo_operativo": 146091, "capex": 50324, "pagos_arrendamientos": None, "adquisiciones": None, "desinversiones": None, "dividendos": None, "recompras": None, "emision_acciones": None, "intereses_en_financiacion": None},
   {"periodo": "2023", "flujo_operativo": 221962, "capex": 47050, "pagos_arrendamientos": None, "adquisiciones": None, "desinversiones": None, "dividendos": None, "recompras": None, "emision_acciones": None, "intereses_en_financiacion": None},
   {"periodo": "2024", "flujo_operativo": 258521, "capex": 89321, "pagos_arrendamientos": None, "adquisiciones": None, "desinversiones": None, "dividendos": None, "recompras": None, "emision_acciones": None, "intereses_en_financiacion": None},
   {"periodo": "2025", "flujo_operativo": 303052, "capex": 112881, "pagos_arrendamientos": None, "adquisiciones": None, "desinversiones": None, "dividendos": None, "recompras": None, "emision_acciones": None, "intereses_en_financiacion": None},
  ],
 },
 "calidad": {
  "auditor": "PricewaterhouseCoopers (Hong Kong)", "anios_auditor": None, "opinion": "Favorable",
  "senales": [
   {"senal": "Beneficio NIIF lleno de partidas de la cartera de inversiones", "nivel": "Media", "comentario": "El beneficio atribuido salta de 224.822 M (2021) a 115.216 M (2023) y vuelve a 224.842 M (2025) por revalorizaciones, deterioros y repartos en especie de participadas (JD.com en 2021, Meituan en 2022), no por el negocio [7, 12]. El no NIIF (123.788 M en 2021, 259.600 M en 2025) es la medida útil [3, 12]."},
   {"senal": "Remuneración en acciones excluida del beneficio no NIIF", "nivel": "Media", "comentario": "La diferencia entre el resultado operativo no NIIF (280.700 M) y el operativo sin otras ganancias (245.628 M) en 2025, ≈35.000 M (4,7 % de las ventas), es sobre todo pagos en acciones y amortización de intangibles comprados [3, 5]: un coste real que el no NIIF no resta."},
   {"senal": "Inversión registrada frente a pagada", "nivel": "Baja", "comentario": "En el 3T25 la inversión contable (12.980 M) y la pagada (≈20.000 M) difirieron por el devengo de servidores [19]; en el 2T26 la caja libre incluye anticipos por capacidad de cálculo: vigilar la diferencia entre devengo y pago."},
  ],
 },
 "capital": {
  "politica": "Dividendo ordinario creciente en HKD (1,60 por acción por 2021, 2,40 por 2022, 3,40 por 2023, 4,50 por 2024 y 5,30 por 2025, pagado el 1-jun-2026) [3, 4] y recompras: unos 112.000 M HKD en 2024 [4]. En marzo de 2026 la dirección dijo que recompraría menos para financiar la IA, manteniendo el dividendo [3]; la junta del 13-may-2026 renovó el mandato (hasta 911,8 M de acciones, el 10 %) [17]. A 6-jul-2026 el programa del año sumaba 34,98 M de acciones (≈0,38 % del capital) [18].",
  "adquisiciones": [],
 },
 "fuentes": fuentesA,
 "huecos": [
  {"seccion": "financieros", "campo": "Resultado financiero, impuestos, minoritarios y BAI por año", "tipo": "Núcleo", "intentos": "1) Informe anual 2025 (PDF de tencent.com) no abre desde la nube; 2) Stock Analysis y Stockopedia por búsqueda: solo dan ingresos, bruto, operativo y beneficio; 3) comunicados de resultados por búsqueda: solo cifras de titular", "decision": "Omitido"},
  {"seccion": "balance", "campo": "Activo y pasivo corriente, clientes, proveedores, deuda de 2021-2023, arrendamientos", "tipo": "Núcleo", "intentos": "1) Informe anual 2025 no accesible; 2) Stockopedia y Fintel por búsqueda: líneas en blanco; 3) caja neta publicada solo para 2024, 2025 y 2T26", "decision": "Omitido"},
  {"seccion": "flujos", "campo": "Dividendos, recompras, pagos de arrendamientos y adquisiciones por año", "tipo": "Complemento", "intentos": "1) Estado de flujos del informe anual no accesible; 2) Stockopedia: filas en blanco; 3) prensa: solo el total de recompras de 2024 en HKD", "decision": "Omitido"},
  {"seccion": "negocio", "campo": "Geografías", "tipo": "Complemento", "intentos": "1) Tencent no publica ingresos por país salvo los juegos internacionales; 2) informe anual no accesible; 3) prensa: solo crecimiento de juegos internacionales", "decision": "Omitido"},
 ],
}
w('A', A)

# ---------------------------------------------------------------- B. Sector y competencia
fuentesB = [
 {"id": 1, "titulo": "China's game market revenue tops 350 billion yuan in 2025 (CADPA, vía Xinhua/China Daily)", "editor": "China Daily", "tipo": "Sectorial", "fecha": "2025-12-22", "url": "https://regional.chinadaily.com.cn/Qiushi/2025-12/22/c_1149473.htm"},
 {"id": 2, "titulo": "China gaming market hits record revenue in 2025 (Niko Partners: 51.800 M USD)", "editor": "Outlook Respawn", "tipo": "Prensa", "fecha": "2025-12", "url": "https://respawn.outlookindia.com/gaming/gaming-news/china-gaming-market-hits-record-revenue-in-2025"},
 {"id": 3, "titulo": "Tencent Announces 2025 Annual and Fourth Quarter Results", "editor": "Tencent / PR Newswire", "tipo": "Primaria", "fecha": "2026-03-18", "url": "https://en.prnasia.com/releases/apac/tencent-announces-2025-annual-and-fourth-quarter-results-525781.shtml"},
 {"id": 4, "titulo": "Tencent's sales rise 13% in boost for broader AI ambitions", "editor": "Bloomberg", "tipo": "Prensa", "fecha": "2026-03-18", "url": "https://www.bloomberg.com/news/articles/2026-03-18/tencent-s-sales-rise-13-in-boost-for-broader-ai-ambitions"},
 {"id": 5, "titulo": "Can Tencent give the memory boom a new lease on life?", "editor": "KrASIA", "tipo": "Prensa", "fecha": "2026-08", "url": "https://kr-asia.com/can-tencent-give-the-memory-boom-a-new-lease-on-life"},
 {"id": 6, "titulo": "Tencent Announces 2026 Second Quarter Results", "editor": "Tencent / PR Newswire", "tipo": "Primaria", "fecha": "2026-08-12", "url": "https://en.prnasia.com/releases/apac/tencent-announces-2026-second-quarter-results-543788.shtml"},
 {"id": 7, "titulo": "Alibaba: informe de análisis del 14-oct-2026 (ingresos FY2026 y plan de inversión de 380.000 M RMB)", "editor": "Repo analisis-inversion (informes/alibaba-2026-10-14)", "tipo": "Analistas", "fecha": "2026-10-14", "url": "https://stockanalysis.com/stocks/baba/"},
 {"id": 8, "titulo": "Tencent reports $7.7B profit as shares fall 26% year-to-date amid AI spending debate (lista del Pentágono 1260H)", "editor": "StartupAmsterdam (agregador)", "tipo": "Prensa", "fecha": "2026-08", "url": "https://startupmap.iamsterdam.com/news/feed/tencent-reports-7-7b-profit-as-shares-fall-26-year-to-date-amid-ai-spending-debate"},
]
B = {
 "historia": {
  "resumen": "Tencent nació en Shenzhen en 1998, fundada por Ma Huateng (Pony Ma) y otros cuatro socios, con un servicio de mensajería (OICQ, luego QQ). En 2001 entró Naspers (hoy Prosus), que llegó a tener un tercio del capital y sigue siendo el primer accionista [3]. Salió a la bolsa de Hong Kong en 2004. QQ financió el salto a los juegos en línea a mediados de los 2000 y Weixin (WeChat, 2011) se convirtió en la plataforma de comunicación, pagos y miniaplicaciones de China. Desde 2018 ha vivido dos golpes regulatorios (congelación de licencias de juegos en 2018 y 2021-22, campaña contra las plataformas en 2021) y ha repartido en especie participaciones en JD.com y Meituan. Desde 2024 el eje es la IA (modelos Hunyuan, nube y agentes) [3, 4].",
  "hitos": [
   {"anio": "1998", "hito": "Fundación en Shenzhen; servicio de mensajería OICQ (QQ)."},
   {"anio": "2001", "hito": "Entrada de Naspers (MIH) en el capital."},
   {"anio": "2004", "hito": "Salida a la bolsa de Hong Kong."},
   {"anio": "2011", "hito": "Lanzamiento de Weixin/WeChat."},
   {"anio": "2013", "hito": "Weixin Pay; inicio de los pagos móviles frente a Alipay."},
   {"anio": "2016", "hito": "Compra de Supercell (Finlandia) con un consorcio."},
   {"anio": "2021-22", "hito": "Campaña regulatoria y congelación de licencias de juegos; repartos en especie de JD.com (2021) y Meituan (2022)."},
   {"anio": "2025-26", "hito": "Giro a la IA: modelos Hunyuan, Yuanbao y WorkBuddy; la inversión se triplica en el 2T26 [6]."},
  ],
  "confianza": "Media",
 },
 "negocio": {
  "descripcion": "Tencent es la mayor empresa de internet de China por beneficio. Sus tres negocios comparten la base de usuarios de Weixin y QQ: (1) servicios de valor añadido (49 % de los ingresos de 2025): juegos propios y licenciados en China y fuera (Honour of Kings, Peacekeeper Elite, Delta Force, Supercell, Riot) y suscripciones de vídeo y música; (2) servicios de marketing (19 %): publicidad en Video Accounts, Mini Programs y búsqueda de Weixin; y (3) fintech y servicios empresariales (31 %): Weixin Pay, gestión patrimonial, crédito al consumo y la nube [3]. Además posee una cartera de inversiones en cotizadas y no cotizadas valorada en ≈875.000 M a junio de 2026 [6].",
  "como_gana_dinero": "El margen sale de la escala: un usuario más en Weixin cuesta casi nada y los juegos de móvil de éxito duran diez años. El margen bruto pasó del 44 % en 2021 al 56 % en 2025 por la mezcla (más publicidad y juegos propios, menos contenido de vídeo caro) [3]. Casi todos los ingresos son recurrentes: compras dentro de los juegos, publicidad y comisiones de pago. El gran cambio de 2026 es la inversión: la IA exige servidores que se amortizan en 4-6 años, y la inversión trimestral pasó de 19.100 M a 52.800 M [6]. El beneficio futuro depende de que la IA suba el precio de la publicidad y el gasto en la nube más deprisa que la amortización.",
  "clientes": "Ningún cliente pesa de forma relevante: cientos de millones de jugadores y usuarios de pago, millones de anunciantes y comercios. El poder de precios se ve en la publicidad: los ingresos de marketing crecieron un 19 % en 2025 por precio y por impresiones, y un 22 % en el 2T26, gracias a la segmentación con IA [3, 6]. En juegos, la regulación limita el tiempo de los menores, pero no el precio de los objetos virtuales.",
  "confianza": "Media",
 },
 "sector": {
  "definicion": "Tencent no tiene un solo mercado: juegos, publicidad digital, pagos y nube en China. Usamos como referencia el mercado de videojuegos de China (CADPA, ventas reales), el que más pesa en su beneficio: 350.790 M RMB en 2025 (+7,7 %), con 683 millones de jugadores [1]. Niko Partners lo sitúa en 51.800 M USD (≈370.000 M RMB) [2]. La publicidad, los pagos y la nube no tienen una cifra de mercado contrastada en las fuentes consultadas.",
  "tamano": "≈350.800 M RMB en 2025 (videojuegos en China, CADPA) [1]",
  "unidad_serie": "millones de RMB",
  "serie": [{"anio": "2025", "tamano": 350790}],
  "tcac_historico_pct": None, "tcac_previsto_pct": None, "cr5_pct": None, "estructura": "Concentrada",
  "drivers": [
   {"driver": "IA en la publicidad (segmentación y creatividades)", "efecto": "+", "horizonte": "Estructural", "evidencia": "Marketing +19 % en 2025 y +22 % en el 2T26 [3, 6]."},
   {"driver": "Licencias de juegos y regulación de menores", "efecto": "+/−", "horizonte": "Cíclico", "evidencia": "Congelaciones de 2018 y 2021-22; en 2025 el mercado crece un 7,7 % con licencias normalizadas [1]."},
   {"driver": "Coste de la capacidad de cálculo (chips)", "efecto": "−", "horizonte": "Estructural", "evidencia": "Inversión del 2T26 de 52.800 M (+176 %); los controles de EE. UU. obligan a chips ASIC chinos [5, 6]."},
   {"driver": "Consumo en China", "efecto": "+/−", "horizonte": "Cíclico", "evidencia": "Pagos comerciales y crédito al consumo crecen; fintech y empresas +8 % en 2025 [3]."},
  ],
  "porter": [
   {"fuerza": "Rivalidad", "intensidad": 3, "justificacion": "ByteDance (Douyin) compite por el tiempo de uso y la publicidad; Alibaba, ByteDance y Huawei, en la nube e IA [7]."},
   {"fuerza": "Poder de los clientes", "intensidad": 2, "justificacion": "Usuarios y anunciantes atomizados; Weixin es casi obligatorio en China."},
   {"fuerza": "Poder de los proveedores", "intensidad": 3, "justificacion": "Chips de IA escasos por los controles de exportación de EE. UU. [5]."},
   {"fuerza": "Amenaza de entrada", "intensidad": 2, "justificacion": "La red de Weixin y la escala de los juegos son difíciles de replicar."},
   {"fuerza": "Amenaza de sustitutos", "intensidad": 3, "justificacion": "Vídeo corto y asistentes de IA pueden desplazar el tiempo de uso de las aplicaciones de Tencent."},
  ],
  "ciclo": {"posicion": "Madurez del ciclo", "comentario": "Los juegos y la publicidad en China crecen a un dígito alto (videojuegos +7,7 % en 2025 [1]); el ciclo lo marca más la regulación que la economía: en 2021-22 los ingresos de Tencent cayeron (−1 % en 2022) por la congelación de licencias y los confinamientos [3]. En 2026 la variable es el ciclo de inversión en IA."},
  "regulacion": "Licencias de juegos de la NPPA y límites al tiempo de juego de los menores; supervisión de los pagos y el crédito por el banco central; seguridad de datos. En EE. UU., Tencent está en la lista 1260H de empresas militares chinas del Pentágono desde enero de 2025, lo que limita a algunos inversores estadounidenses [8]; los controles de exportación de chips frenan la IA [5].",
  "tendencias": "La IA es la tendencia que decide: mejora la publicidad (precio por impresión) y abre la nube y los agentes (WorkBuddy), pero exige una inversión que se triplica [6]. El vídeo corto (Douyin, Kuaishou) sigue ganando tiempo de uso; Tencent responde con Video Accounts. En juegos, los títulos para PC y consola y el mercado internacional ganan peso.",
  "confianza": "Baja",
 },
 "competencia": {
  "cuota_pct": None,
  "posicion": "1.º en juegos en China (más de la mitad de las ventas del mercado según la industria; sin cifra contrastada aquí), 1.º en mensajería (Weixin) y 2.º en pagos móviles tras Alipay.",
  "competidores": [
   {"nombre": "ByteDance (Douyin, Doubao)", "pais": "China", "ticker": None, "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Rival principal en publicidad, tiempo de uso e IA de consumo; no cotiza."},
   {"nombre": "NetEase", "pais": "China", "ticker": "NTES", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Segundo grupo de juegos de China."},
   {"nombre": "Alibaba", "pais": "China", "ticker": "BABA", "ingresos": 1023670, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Nube e IA (Qwen) y publicidad de comercio electrónico; plan de inversión de 380.000 M RMB [7]."},
   {"nombre": "Ant Group (Alipay)", "pais": "China", "ticker": None, "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Rival en pagos móviles y gestión patrimonial."},
   {"nombre": "Kuaishou", "pais": "China", "ticker": "1024.HK", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Vídeo corto y publicidad."},
  ],
  "foso": {"veredicto": "Amplio", "tendencia": "Estable", "fuentes": [
   {"fuente": "Efectos de red", "puntuacion": 5, "evidencia": "Weixin reúne la comunicación, los pagos y las miniaplicaciones de más de mil millones de usuarios; el margen bruto sube del 44 % al 56 % en 2021-2025 [3]."},
   {"fuente": "Costes de cambio", "puntuacion": 4, "evidencia": "Contactos, grupos, pagos y cuentas de juego viven en Weixin y QQ."},
   {"fuente": "Intangibles (marca, patentes, licencias)", "puntuacion": 4, "evidencia": "Franquicias de juegos que duran una década (Honour of Kings) y licencias de la NPPA."},
   {"fuente": "Ventaja en costes", "puntuacion": 3, "evidencia": "Distribución propia de juegos y publicidad sin coste de adquisición de usuarios."},
   {"fuente": "Escala eficiente", "puntuacion": 4, "evidencia": "Solo Tencent, Alibaba, ByteDance y Huawei pueden financiar la IA a esta escala [5, 7]."},
  ]},
  "amenazas": "Tres amenazas: (1) que la IA de consumo cambie la puerta de entrada a internet (asistentes como Doubao de ByteDance) y Weixin pierda tiempo de uso; probabilidad media a cinco años; (2) un nuevo endurecimiento regulatorio sobre juegos o fintech, como en 2021-22 (media); (3) que la inversión en IA no se recupere y el foso se mantenga con un ROIC menor (media-alta en 2026-28) [5, 6].",
  "confianza": "Media",
 },
 "esg": {
  "calificaciones": [],
  "materialidad": "Lo material para Tencent es (1) la protección de menores en los juegos (límites de tiempo y gasto; una norma nueva puede recortar ingresos, como en 2021); (2) la privacidad y la seguridad de datos de más de mil millones de usuarios de Weixin; y (3) el consumo eléctrico de los centros de datos de IA, que crece con la inversión (×2,8 en el 2T26) [6].",
  "controversias": "En enero de 2025 el Pentágono incluyó a Tencent en la lista 1260H de empresas militares chinas; Tencent lo niega y lo recurre [8]. No hemos encontrado sanciones nuevas relevantes en 2026 en las fuentes consultadas.",
  "confianza": "Baja",
 },
 "fuentes": fuentesB,
 "huecos": [
  {"seccion": "sector", "campo": "Serie de 5 años del mercado, TCAC y CR5", "tipo": "Núcleo", "intentos": "1) CADPA por búsqueda: solo 2025; 2) Niko Partners: 2025 y previsión 2026 en USD; 3) publicidad digital en China: sin cifra en las búsquedas", "decision": "Omitido"},
  {"seccion": "competencia", "campo": "Ingresos y margen EBIT de los competidores, cuota", "tipo": "Núcleo", "intentos": "1) Webs de inversores no accesibles; 2) Stock Analysis por búsqueda solo para Alibaba; 3) cupo de búsquedas compartido", "decision": "Omitido"},
  {"seccion": "esg", "campo": "Calificaciones ESG", "tipo": "Complemento", "intentos": "1) MSCI y Sustainalytics no accesibles; 2) informe ESG no accesible; 3) sin búsqueda por cupo", "decision": "Omitido"},
 ],
}
w('B', B)

# ---------------------------------------------------------------- C. Directivos y gobierno
fuentesC = [
 {"id": 1, "titulo": "Tencent Holdings Limited, Annual Report 2025 (consejo, comisiones, informe de los administradores)", "editor": "Tencent", "tipo": "Primaria", "fecha": "2026-04-09", "url": "https://static.www.tencent.com/uploads/2026/04/09/62d786fcf3d3c8cb7e54791ee95439ac.pdf"},
 {"id": 2, "titulo": "Prosus reduces Tencent stake below 23% through share sales", "editor": "FilingReader (aviso JSE)", "tipo": "Primaria", "fecha": "2025-07-28", "url": "https://filingreader.com/news-wire/johannesburg/2025-07-28/prosus-reduces-tencent-stake-below-23-through-share-sales"},
 {"id": 3, "titulo": "Chinese tech giant worth R8.2 trillion that South Africans can buy at a discount (participación de Naspers/Prosus ≈23 %)", "editor": "BusinessTech", "tipo": "Prensa", "fecha": "2026-06", "url": "https://businesstech.co.za/news/technology/861656/chinese-tech-giant-worth-r8-2-trillion-that-south-africans-can-buy-at-a-discount/"},
 {"id": 4, "titulo": "Huateng Ma: participación (8,84 % a 31-dic-2025)", "editor": "MarketScreener", "tipo": "Datos de mercado", "fecha": "2025-12-31", "url": "https://in.marketscreener.com/insider/HUATENG-MA-A073PY/"},
 {"id": 5, "titulo": "Who owns Tencent", "editor": "Revenue Memo", "tipo": "Prensa", "fecha": "2025", "url": "https://www.revenuememo.com/p/who-owns-tencent"},
 {"id": 6, "titulo": "Tencent expects 2025 capex below guidance, sufficient GPU reserves", "editor": "Tiger Brokers", "tipo": "Prensa", "fecha": "2025-11-13", "url": "https://www-web.itiger.com/news/1171126593"},
 {"id": 7, "titulo": "Tencent discloses share changes, active repurchases and upcoming board meeting", "editor": "FilingReader (aviso HKEX)", "tipo": "Primaria", "fecha": "2025-12-23", "url": "https://filingreader.com/news-wire/hongkong/2025-12-23/tencent-discloses-share-changes-active-repurchases-and-upcoming-board"},
 {"id": 8, "titulo": "騰訊業績與回購 (la dirección recorta recompras para financiar la IA)", "editor": "Wantrich / China Times", "tipo": "Prensa", "fecha": "2026-03-19", "url": "https://wantrich.chinatimes.com/news/20260319900461-420201"},
]
C = {
 "directivos": {
  "equipo": [
   {"nombre": "Ma Huateng (Pony Ma)", "cargo": "Cofundador, presidente y consejero delegado", "desde": "1998", "participacion_pct": 8.84, "trayectoria": "Fundó Tencent en 1998 y la dirige desde entonces; único consejero ejecutivo. Con él los ingresos pasaron de 560.118 M en 2021 a 751.766 M en 2025 tras superar la campaña regulatoria [1, 4]."},
   {"nombre": "Martin Lau Chi Ping", "cargo": "Presidente ejecutivo (President)", "desde": "2006", "participacion_pct": None, "trayectoria": "Antiguo banquero de inversión; dirige la estrategia, las inversiones y la relación con los inversores [1]."},
   {"nombre": "John Lo Shek Hon", "cargo": "Director financiero", "desde": "2016", "participacion_pct": None, "trayectoria": "Director financiero desde 2016; responsable de la política de recompras y de la financiación de la inversión en IA [1]."},
   {"nombre": "James Gordon Mitchell", "cargo": "Director de estrategia", "desde": "2011", "participacion_pct": None, "trayectoria": "Lleva la estrategia y las inversiones internacionales (juegos) [1]."},
  ],
  "historial_guidance": [
   {"anio": "2025", "guia": "Inversión en 2025 por encima de la de 2024, dentro del rango dado a principios de año", "real": "Inversión por debajo del rango por la escasez de chips, aunque por encima de 2024 (aviso de noviembre de 2025)", "cumplida": "Parcial"},
   {"anio": "2026", "guia": "Recompras menores para financiar la IA; dividendo mantenido (marzo de 2026)", "real": "Dividendo de 5,30 HKD pagado; recompras más lentas (34,98 M de acciones a 6-jul)", "cumplida": "Sí"},
  ],
  "comentario": "Equipo muy estable: Ma Huateng (desde 1998), Martin Lau (desde 2006) y John Lo (desde 2016) han pasado juntos la campaña regulatoria de 2021-22 [1]. Tencent no da guía numérica de ingresos ni de beneficio, así que el historial se mide por la inversión y la política de capital: la inversión de 2025 quedó por debajo del rango por falta de chips [6] y el giro de 2026 (menos recompras, más IA) se anunció y se cumplió [8]. La sucesión es el riesgo: Ma Huateng tiene 55 años y no hay número dos designado públicamente.",
  "confianza": "Media",
 },
 "gobierno": {
  "consejo": [
   {"nombre": "Ma Huateng", "cargo": "Presidente y consejero delegado", "tipo": "Ejecutivo", "desde": "1999", "comisiones": "Nombramientos (presidente), Inversiones"},
   {"nombre": "Jacobus Petrus (Koos) Bekker", "cargo": "Consejero", "tipo": "Dominical", "desde": "2012", "comisiones": None},
   {"nombre": "Charles St Leger Searle", "cargo": "Consejero", "tipo": "Dominical", "desde": "2001", "comisiones": "Auditoría, Inversiones"},
   {"nombre": "Li Dong Sheng", "cargo": "Consejero", "tipo": "Independiente", "desde": "2004", "comisiones": "Nombramientos"},
   {"nombre": "Ian Charles Stone", "cargo": "Consejero", "tipo": "Independiente", "desde": "2004", "comisiones": "Auditoría, Retribuciones"},
   {"nombre": "Yang Siu Shun", "cargo": "Consejero", "tipo": "Independiente", "desde": "2016", "comisiones": "Auditoría (presidente)"},
   {"nombre": "Ke Yang", "cargo": "Consejera", "tipo": "Independiente", "desde": "2016", "comisiones": "Retribuciones"},
   {"nombre": "Zhang Xiulan", "cargo": "Consejera", "tipo": "Independiente", "desde": "2020", "comisiones": "Medio ambiente, sociedad y gobierno"},
  ],
  "presidente_ceo_separados": False, "presidente_ejecutivo": True, "consejero_coordinador": False, "una_accion_un_voto": True,
  "operaciones_vinculadas_relevantes": False, "variable_ligado_rentabilidad": False, "auditoria_independiente": True, "insiders_sin_operaciones": False,
  "accionista_control": False, "presidente_vinculado_control": False, "cambios_cupula_24m": 0,
  "voto_remuneracion_pct": None, "voto_remuneracion_contra_pct": None, "voto_remuneracion_contra_libre_pct": None, "voto_cupula_pct": None,
  "remuneracion_ceo": None,
  "remuneracion": "En Hong Kong la remuneración no se somete a voto consultivo anual. El grueso de la retribución de la cúpula es en acciones (planes de opciones y de acciones restringidas), cuyo coste (≈4-5 % de las ventas junto con la amortización de intangibles comprados) el beneficio no NIIF excluye [1]. No hemos podido leer las métricas del variable ni la remuneración del consejero delegado: el informe anual no abre desde este entorno.",
  "accionistas": [
   {"nombre": "Prosus / Naspers", "pct": 23.0, "tipo": "Industrial (primer accionista)", "variacion": "Vende de forma continua desde 2022 (≈29 % entonces) para financiar sus recompras; 22,999 % en julio de 2025 [2, 3]."},
   {"nombre": "Ma Huateng (vía Advance Data Services)", "pct": 8.84, "tipo": "Fundador", "variacion": "Estable [4, 5]."},
  ],
  "insiders": [],
  "control_y_defensas": "Tencent es una sociedad de las Islas Caimán con una sola clase de acciones, pero opera en China a través de entidades de interés variable (VIE) por las restricciones a la inversión extranjera en internet: el accionista tiene derechos contractuales, no la propiedad directa de las licencias. Prosus (≈23 %) es el primer accionista y tiene dos consejeros dominicales, pero no controla la junta; el fundador (8,84 %) preside el consejo y es el único ejecutivo [1, 2, 4]. La venta continua de Prosus es un vendedor permanente en el mercado.",
  "alertas": [
   "Presidente y consejero delegado en la misma persona, sin consejero coordinador independiente.",
   "Estructura VIE: los derechos del accionista extranjero dependen de contratos con entidades chinas.",
   "Inclusión en la lista 1260H del Pentágono (enero de 2025): limita a ciertos inversores de EE. UU.",
   "Venta continua de Prosus/Naspers (de ≈29 % a ≈23 % desde 2022).",
  ],
  "confianza": "Baja",
 },
 "fuentes": fuentesC,
 "huecos": [
  {"seccion": "gobierno", "campo": "Remuneración del consejero delegado, votos en junta, operaciones de directivos", "tipo": "Núcleo", "intentos": "1) Informe anual 2025 (PDF) no accesible desde la nube; 2) actas de la junta de mayo de 2026 en HKEX no accesibles; 3) búsqueda: solo la participación de Ma Huateng", "decision": "Omitido"},
 ],
}
w('C', C)

# ---------------------------------------------------------------- D. Mercado y valoración
fuentesD = [
 {"id": 1, "titulo": "Tencent Holdings (0700.HK): cierre del 13-oct-2026 en 425,20 HKD; rango de 52 semanas 411,00-664,00 HKD", "editor": "Yahoo Finance", "tipo": "Datos de mercado", "fecha": "2026-10-13", "url": "https://au.finance.yahoo.com/quote/0700.HK/"},
 {"id": 2, "titulo": "HKD to CNY exchange rate history (0,853 RMB por HKD a 5-ago-2026; 0,915 a 30-sep-2025)", "editor": "OFX", "tipo": "Datos de mercado", "fecha": "2026-08-05", "url": "https://www.ofx.com/en-au/exchange-rates/hkd-to-cny/"},
 {"id": 3, "titulo": "Offshore yuan holds gains (≈6,70 RMB por USD a 30-sep-2026)", "editor": "Trading Economics", "tipo": "Datos de mercado", "fecha": "2026-09-30", "url": "https://tradingeconomics.com/china/currency/news/587959"},
 {"id": 4, "titulo": "China 10Y yield hits over 1-year low (≈1,67 %)", "editor": "Trading Economics", "tipo": "Datos de mercado", "fecha": "2026-10", "url": "https://tradingeconomics.com/china/government-bond-yield/news/585190"},
 {"id": 5, "titulo": "Tencent (0700): precio objetivo medio a un año de 677,42 HKD (430,26-925,05) a 2-oct-2026", "editor": "Fintel", "tipo": "Analistas", "fecha": "2026-10-02", "url": "https://fintel.io/s/hk/0700"},
 {"id": 6, "titulo": "Tencent (700.HK) analyst estimates: 51 analistas (26 comprar, 20 compra fuerte, 4 mantener, 1 venta fuerte)", "editor": "ValueInvesting.io", "tipo": "Analistas", "fecha": "2026-10", "url": "https://valueinvesting.io/700.HK/estimates"},
 {"id": 7, "titulo": "Tencent Holdings: Kursziel und Gewinnprognose (BPA medio 2026e 35,64 HKD y 2027e 39,38 HKD, 47 analistas)", "editor": "Aktien.guide", "tipo": "Analistas", "fecha": "2026-10", "url": "https://aktien.guide/kursziel/Tencent-Holdings-Ltd-KYG875721634"},
 {"id": 8, "titulo": "Tencent Holdings (0700.HK): historial de precios mensual (cierres de diciembre 2022-2025)", "editor": "Digrin", "tipo": "Datos de mercado", "fecha": "2026-10", "url": "https://www.digrin.com/stocks/detail/0700.HK/price"},
 {"id": 9, "titulo": "Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %", "editor": "Damodaran Online", "tipo": "Datos de mercado", "fecha": "2026-10", "url": "https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx"},
 {"id": 10, "titulo": "Citigroup suggests Chinese internet stocks are nearing attractive valuation lows (PER a un año de Baidu y otros)", "editor": "Tiger Brokers", "tipo": "Analistas", "fecha": "2026-09", "url": "https://www.itiger.com/news/1106754947"},
 {"id": 11, "titulo": "PDD Holdings: valoración (PER 2026e)", "editor": "MarketScreener", "tipo": "Datos de mercado", "fecha": "2026-10", "url": "https://uk.marketscreener.com/quote/stock/PDD-HOLDINGS-INC-45049866/valuation/"},
 {"id": 12, "titulo": "NetEase: valoración (PER 2027e 12,8x a 21-ago-2026)", "editor": "MarketScreener", "tipo": "Datos de mercado", "fecha": "2026-08-21", "url": "https://www.marketscreener.com/quote/stock/NETEASE-INC-111325397/valuation/"},
 {"id": 13, "titulo": "Meta Platforms: estadísticas (informe del repo del 14-oct-2026)", "editor": "Stock Analysis", "tipo": "Datos de mercado", "fecha": "2026-10-09", "url": "https://stockanalysis.com/stocks/meta/statistics/"},
 {"id": 14, "titulo": "Alphabet: estadísticas (informe del repo del 8-oct-2026)", "editor": "Stock Analysis", "tipo": "Datos de mercado", "fecha": "2026-10-07", "url": "https://stockanalysis.com/stocks/googl/statistics/"},
 {"id": 15, "titulo": "Netflix: estadísticas (informe del repo del 11-oct-2026)", "editor": "Stock Analysis", "tipo": "Datos de mercado", "fecha": "2026-10-09", "url": "https://stockanalysis.com/stocks/nflx/statistics/"},
 {"id": 16, "titulo": "Alibaba (BABA): cotización del 13-oct-2026 (informe del repo del 14-oct-2026)", "editor": "Morningstar", "tipo": "Datos de mercado", "fecha": "2026-10-13", "url": "https://www.morningstar.com/stocks/xnys/baba/quote"},
 {"id": 17, "titulo": "Bank of America raises Tencent's capex forecast, citing underappreciated AI leadership (objetivo 780 HKD; FCF 2026e 67.200 M)", "editor": "Tiger Brokers", "tipo": "Analistas", "fecha": "2026-08", "url": "https://www.itiger.com/hant/news/1148243660"},
 {"id": 18, "titulo": "Tencent Holdings stock price hits 5-week low (435,60 HKD, mínimo desde julio)", "editor": "Trading Economics", "tipo": "Datos de mercado", "fecha": "2026-09", "url": "https://tradingeconomics.com/700:hk/news/580253"},
 {"id": 19, "titulo": "Tencent Announces 2026 Second Quarter Results (caja, deuda y valor de las participaciones a 30-jun-2026)", "editor": "Tencent / PR Newswire", "tipo": "Primaria", "fecha": "2026-08-12", "url": "https://en.prnasia.com/releases/apac/tencent-announces-2026-second-quarter-results-543788.shtml"},
 {"id": 20, "titulo": "Analysts trim Tencent price target to HK$560 from HK$610 (Mizuho, neutral)", "editor": "Simply Wall St", "tipo": "Analistas", "fecha": "2026-08", "url": "https://simplywall.st/stock/SEHK/700"},
]
precio_hkd = 425.20
D = {
 "identificacion": {
  "nombre": "Tencent Holdings Limited", "nombre_corto": "Tencent", "ticker": "0700.HK", "isin": "KYG875721634",
  "mercado": "Bolsa de Hong Kong (HKEX), en HKD", "indice_referencia": "Hang Seng", "pais": "China (sociedad de las Islas Caimán)", "pais_iso": "CN",
  "sector": "Servicios de comunicación", "industria": "Medios y servicios interactivos", "sede": "Shenzhen", "fundacion": "1998", "empleados": None, "web": "https://www.tencent.com",
  "precio": round(precio_hkd * HKD, 2), "fecha_precio": "2026-10-13", "acciones": 9250, "capitalizacion_publicada": None, "free_float_pct": None,
  "max_52s": round(664.00 * HKD, 2), "min_52s": round(411.00 * HKD, 2), "volumen_medio_diario": "≈12,7 M de acciones el 13-oct (≈5.400 M HKD)", "proximos_resultados": None,
 },
 "consenso": {
  "guidance": "Tencent no publica guía de ingresos ni de beneficio. En marzo de 2026 dijo que al menos duplicaría la inversión en IA en 2026 y que recompraría menos para financiarla, manteniendo el dividendo [17]; en agosto anunció un aumento sustancial de la inversión en el segundo semestre con chips ASIC chinos.",
  "estimaciones": [
   {"periodo": "2026e", "ingresos": None, "ebitda": None, "ebit": None, "bpa": round(35.64 * HKD, 2), "dpa": None, "fuente": "Aktien.guide, 47 analistas, 35,64 HKD a 0,859 RMB/HKD [7]"},
   {"periodo": "2027e", "ingresos": None, "ebitda": None, "ebit": None, "bpa": round(39.38 * HKD, 2), "dpa": None, "fuente": "Aktien.guide, 39,38 HKD a 0,859 RMB/HKD [7]"},
  ],
  "recomendaciones": {"n_analistas": 51, "comprar": 46, "mantener": 4, "vender": 1, "po_medio": round(677.42 * HKD, 2), "po_min": round(430.26 * HKD, 2), "po_max": round(925.05 * HKD, 2)},
  "revisiones": "Tras el 2T26 los objetivos se separan: Mizuho baja de 610 a 560 HKD (neutral) por la caja libre negativa [20]; Citi sube a 765 HKD y Bank of America mantiene 780 HKD (compra), aunque sube su inversión estimada de 2026-28 un 23-25 % y baja su caja libre de 2026 a 67.200 M [17]. En marzo Morgan Stanley había recortado un 6-7 % su resultado operativo no NIIF de 2026-27 por el gasto en IA. Tendencia: recortes de beneficio y caja, objetivos estables en media (677 HKD [5]).",
  "base_ebitda": "NIIF", "ajuste_ebitda_pct_ventas": None,
  "confianza": "Baja",
 },
 "bolsa": None,
 "multiplos_historicos": {
  "serie": [
   {"anio": "2021", "precio_cierre": None, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": True},
   {"anio": "2022", "precio_cierre": round(317.23 * 0.893, 2), "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2023", "precio_cierre": round(293.60 * 0.907, 2), "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2024", "precio_cierre": round(419.80 * 0.940, 2), "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2025", "precio_cierre": round(599.00 * 0.900, 2), "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
  ],
 },
 "comparables": {
  "criterio": "Plataformas de internet con publicidad, juegos o nube. Chinas (Alibaba, NetEase, Baidu, PDD), con el mismo riesgo país y la misma base de BPA ajustado, y estadounidenses (Meta, Alphabet, Netflix), con el mismo modelo de publicidad e IA. Los múltiplos de las estadounidenses vienen de los informes del repo de 7-14 de octubre; los de las chinas, de MarketScreener, Citi y el informe de Alibaba [10-16]. Capitalización en millones de RMB a 6,70 RMB/USD.",
  "empresas": [
   {"nombre": "Alibaba", "ticker": "BABA", "pais": "CN", "capitalizacion": 1846352, "ev_ventas": 1.42, "ev_ebitda_ltm": 14.2, "ev_ebitda_ntm": None, "per_ntm": 15.3, "crecimiento_pct": None, "margen_ebitda_pct": 10.0, "roic_pct": 4.5, "dn_ebitda": -1.8, "fcf_yield_pct": -2.7},
   {"nombre": "NetEase", "ticker": "NTES", "pais": "CN", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 12.8, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "Baidu", "ticker": "BIDU", "pais": "CN", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 13.3, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "PDD Holdings", "ticker": "PDD", "pais": "CN", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 9.4, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "Meta", "ticker": "META", "pais": "US", "capitalizacion": round(1842670 * 6.70), "ev_ventas": 8.04, "ev_ebitda_ltm": 18.0, "ev_ebitda_ntm": None, "per_ntm": 21.4, "crecimiento_pct": 19.4, "margen_ebitda_pct": 44.6, "roic_pct": 35.7, "dn_ebitda": -0.1, "fcf_yield_pct": 2.4},
   {"nombre": "Alphabet", "ticker": "GOOGL", "pais": "US", "capitalizacion": round(4336386 * 6.70), "ev_ventas": 9.27, "ev_ebitda_ltm": 23.2, "ev_ebitda_ntm": 16.7, "per_ntm": 24.5, "crecimiento_pct": 24.3, "margen_ebitda_pct": 39.9, "roic_pct": 37.7, "dn_ebitda": -0.3, "fcf_yield_pct": 1.2},
   {"nombre": "Netflix", "ticker": "NFLX", "pais": "US", "capitalizacion": round(296575 * 6.70), "ev_ventas": 6.24, "ev_ebitda_ltm": 19.8, "ev_ebitda_ntm": 16.0, "per_ntm": 18.7, "crecimiento_pct": 11.6, "margen_ebitda_pct": 31.5, "roic_pct": 38.0, "dn_ebitda": 0.3, "fcf_yield_pct": 3.8},
  ],
 },
 "transacciones": None,
 "valoracion": {
  "puente": {"fecha": "2026-06-30", "deuda_financiera": 453000, "arrendamientos": 0, "caja": 511200, "minoritarios": 86913, "pensiones": 0, "asociadas": 700080, "otros_ajustes": 0},
 },
 "notas_integrador": "Precio y acciones en RMB a 0,859 RMB/HKD. Participaciones: cotizadas a valor de mercado 487.200 M + no cotizadas a valor contable 387.900 M = 875.100 M a 30-jun-2026 [19], con un 20 % de descuento (impuestos latentes y holding) = 700.080 M.",
 "fuentes": fuentesD,
 "huecos": [
  {"seccion": "bolsa", "campo": "Rentabilidades, beta, volatilidad, caída máxima", "tipo": "Complemento", "intentos": "1) bolsa.mjs sin red; 2) Yahoo y HKEX no abren; 3) búsqueda: solo cierres sueltos y rango de 52 semanas", "decision": "Omitido"},
  {"seccion": "transacciones", "campo": "Operaciones comparables con múltiplo", "tipo": "Complemento", "intentos": "1) No hay compras de plataformas comparables en China con múltiplo publicado; 2) búsqueda de operaciones de juegos (Supercell, Riot) sin múltiplo reciente; 3) cupo de búsquedas", "decision": "Omitido"},
  {"seccion": "multiplos_historicos", "campo": "Precio de cierre de 2021 (y 2018-2020)", "tipo": "Complemento", "intentos": "1) bolsa.mjs sin red; 2) Digrin por búsqueda: solo 2022-2025; 3) búsqueda en prensa: sin cierre anual", "decision": "Omitido"},
  {"seccion": "consenso", "campo": "Ingresos y EBITDA del consenso", "tipo": "Núcleo", "intentos": "1) MarketScreener no abre; 2) búsqueda: solo BPA medio en HKD (Aktien.guide); 3) CMBI: solo beneficio no NIIF de 2026 sin cifra completa", "decision": "Omitido"},
 ],
}
w('D', D)

# ---------------------------------------------------------------- E. Sentimiento
fuentesE = [
 {"id": 1, "titulo": "Tencent Holdings (SEHK:700): narrativas de la comunidad (valor razonable de 370 a 814 HKD)", "editor": "Simply Wall St", "tipo": "Foros y redes", "fecha": "2026-09", "url": "https://simplywall.st/stock/SEHK/700"},
 {"id": 2, "titulo": "Tencent: pengeluaran AI meningkat, saham terlihat murah (resumen de un artículo de Seeking Alpha)", "editor": "Pluang", "tipo": "Foros y redes", "fecha": "2026-09", "url": "https://pluang.com/en/news-feed/tencent-pengeluaran-ai-meningkat-saham-terlihat-murah"},
 {"id": 3, "titulo": "Market «votes with its feet» on AI investment? BofA: Tencent is stable, patience is a virtue (preguntas de los inversores en la gira)", "editor": "LongPort", "tipo": "Foros y redes", "fecha": "2026-08", "url": "https://longportapp.cn/news/280257070"},
 {"id": 4, "titulo": "Tencent's buyback slows (36Kr: recompras de 29.100 M HKD hasta agosto)", "editor": "36Kr", "tipo": "Prensa", "fecha": "2026-09-02", "url": "https://eu.36kr.com/en/p/3965937491648001"},
 {"id": 5, "titulo": "Tencent enters costly AI investment phase, market reacts negatively", "editor": "Tiger Brokers (comunidad)", "tipo": "Foros y redes", "fecha": "2026-08", "url": "https://www.itiger.com/news/1104630752"},
 {"id": 6, "titulo": "《異動股》騰訊曾挫逾5%失守50天線 (22-jul-2026)", "editor": "etnet", "tipo": "Prensa", "fecha": "2026-07-22", "url": "https://www.etnet.com.hk/mobile/tc/warrants/quote_news.php?code=62779"},
 {"id": 7, "titulo": "Turning point in the AI war? Wall Street's takeaway after meeting management: Tencent is fighting its «Battle of Midway»", "editor": "LongPort", "tipo": "Foros y redes", "fecha": "2026-09", "url": "https://longportapp.cn/news/296158887"},
]
E = {
 "sentimiento": {
  "tono": "Dividido", "tendencia": "Empeora",
  "revisadas": [
   {"plataforma": "Simply Wall St (narrativas de particulares)", "fecha": "2026-09", "n_comentarios": 5, "tono": "Dividido", "resumen": "Las narrativas van de un valor razonable de 370 HKD (la más seguida, que ve la acción cara por la inversión en IA) a 508-814 HKD (que la ven barata) [1]."},
   {"plataforma": "Seeking Alpha (artículo de autor independiente, vía Pluang)", "fecha": "2026-09", "n_comentarios": 1, "tono": "Positivo", "resumen": "Defiende que la acción está barata (≈13,5 veces el BPA de 2026, por debajo de su media de cinco años) y que recompras y dividendos sostienen el precio; reconoce que la IA baja la caja libre a corto plazo y menciona la lista 1260H [2]."},
   {"plataforma": "LongPort (comunidad de inversores, gira de BofA)", "fecha": "2026-08", "n_comentarios": 3, "tono": "Neutro", "resumen": "Las preguntas de los inversores en Hong Kong fueron casi solo sobre IA: inversión, cómo se cobra, mercado de chips y modelos; el mensaje que circula es «paciencia» [3, 7]."},
   {"plataforma": "Tiger Brokers (comunidad)", "fecha": "2026-08", "n_comentarios": 4, "tono": "Negativo", "resumen": "Tras el 2T26 domina la decepción por la caja libre negativa y el beneficio por debajo de lo esperado; se discute si el mercado «castiga» a los que más invierten en IA [5]."},
  ],
  "temas": [
   {"tema": "La inversión en IA destruye caja a corto plazo", "postura": "Bajista", "peso": "Alto", "contraste": "Cierto: caja libre de −13.800 M en el 2T26 e inversión ×2,8 [A]. Nuestro DCF lo recoge con una inversión del 22 % de las ventas en 2026 y amortizaciones que se triplican hasta 2029."},
   {"tema": "Recompras más lentas", "postura": "Bajista", "peso": "Medio", "contraste": "Cierto: 29.100 M HKD hasta agosto frente a ≈112.000 M HKD en 2024 [4]. No contamos recompras no anunciadas en el BPA."},
   {"tema": "Barata frente a su historia (PER ≈12-13x)", "postura": "Alcista", "peso": "Alto", "contraste": "Cierto en múltiplo, pero el BPA de 2027-28 lo frena la amortización de la IA: nuestro PER actual (sobre nuestro BPA de 2027e) es de ≈11-12x."},
   {"tema": "Riesgo geopolítico (lista 1260H, chips)", "postura": "Bajista", "peso": "Medio", "contraste": "Está en riesgos y en la prima adicional del WACC (2,9 puntos)."},
  ],
  "lectura": "El sentimiento acompaña a la caída (−36 % desde el máximo de 52 semanas): el inversor particular y el institucional discuten lo mismo, si la inversión en IA rendirá, y nadie tiene la respuesta antes de 2027. No hay euforia ni capitulación: hay división, con los analistas mucho más optimistas (objetivo medio de 677 HKD) que el precio. El foro no aporta un riesgo que el informe no tenga; sí confirma que el catalizador es una prueba de rentabilidad de la IA (nube, publicidad) en los próximos resultados.",
  "confianza": "Baja",
 },
 "fuentes": fuentesE,
 "huecos": [
  {"seccion": "sentimiento", "campo": "Reddit, Stocktwits, LIHKG, Futu y Xueqiu", "tipo": "Complemento", "intentos": "1) Reddit y Stocktwits bloqueados para la búsqueda; 2) búsqueda en chino (連登, 富途, 雪球): sin hilos, solo prensa; 3) búsqueda en inglés de r/stocks y r/ValueInvesting: sin hilos de 2026", "decision": "Omitido"},
 ],
}
# Sin citas con letra dentro de E: retiro la [A]
for t in E["sentimiento"]["temas"]:
    t["contraste"] = t["contraste"].replace(" [A]", "")
w('E', E)
print('ok')

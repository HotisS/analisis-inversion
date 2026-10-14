# Genera las notas A-E de Lonza (corte 2026-10-14). Todas las cifras salen de extractos de búsqueda (WebSearch), con la URL.
import json, sys, os
D = sys.argv[1]
EXT = 'Extracto de búsqueda; la página no se pudo abrir (solo WebSearch en este entorno)'

def F(i, titulo, editor, tipo, fecha, url):
    return {"id": i, "titulo": titulo + '. ' + EXT, "editor": editor, "tipo": tipo, "fecha": fecha, "url": url}

def H(seccion, campo, tipo, intentos, decision="Omitido"):
    return {"seccion": seccion, "campo": campo, "tipo": tipo, "intentos": intentos, "decision": decision}

def save(letra, obj):
    with open(os.path.join(D, letra + '.json'), 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)

# ---------------- A. Cuentas ----------------
fa = [
 F(1, 'Full-Year Results 2025 Report (negocio continuado: ventas 6.531 M CHF, CORE EBITDA 2.064 M y 31,6 %, 2024 reexpresado 1.653 M y 30,2 %; BPA 13,04 / 13,00 diluido frente a 8,51 / 8,49; CORE EPS 15,08 / 15,03 frente a 13,12 / 13,10; deuda neta del grupo 3.258 M, 1,4x; caja libre operativa 545 M continuado y 674 M grupo; capex del grupo 1.373 M y 1.417 M; ROIC 11,9 % y 10,9 %)', 'Lonza Group AG (vía SGX)', 'Primaria', '2026-01-28', 'https://links.sgx.com/1.0.0/corporate-announcements/JX40DSPFWE3XG83V/873319_20260128_Lonza%20Full-Year%20Results%202025%20Report_FINAL.pdf'),
 F(2, 'Lonza FY2025 revenue at CHF 6.53 billion, profit at CHF 909 million; resultado de explotación ≈1.240 M', 'iTiger / Tiger Brokers', 'Prensa', '2026-01-28', 'https://www.itiger.com/news/1159765677'),
 F(3, 'Ad hoc 22-jul-2026: H1 2026 (ventas 3,4 mil M, +16,0 % a tipos constantes, CORE EBITDA 1,2 mil M y 34,8 %, guía de margen 2026 al 33-34 %, ventas +11-12 % a tipos constantes)', 'Lonza Group AG', 'Primaria', '2026-07-22', 'https://www.lonza.com/news/2026-07-22-06-30'),
 F(4, 'Lonza H1 core EBITDA climbs 27.4% to CHF 1.2 billion; revenue rises 11.2% to CHF 3.37 billion', 'VZ VermögensZentrum (AWP)', 'Prensa', '2026-07-22', 'https://www.vermoegenszentrum.ch/en/stock-exchange-and-markets/news/lonza-h1-core-ebitda-climbs-274-chf-12-billion-revenue-rises-112'),
 F(5, 'Lonza H1 Results Climb (beneficio atribuido 591 M frente a 426 M; BPA básico 8,16 frente a 5,67)', 'VZ VermögensZentrum (RTTNews)', 'Prensa', '2026-07-22', 'https://www.vermoegenszentrum.ch/en/stock-exchange-and-markets/news/lonza-h1-results-climb-lifts-fy26-core-ebitda-margin-view-backs'),
 F(6, 'Lonza Group AG (LONN.SW): caja libre operativa del 1S26 de 426 M frente a 116 M; capex 530 M (15,7 % de las ventas)', 'TickerSpark', 'Datos de mercado', '2026-07', 'https://tickerspark.ai/ticker/lonn.sw'),
 F(7, 'Lonza Group AG (SWX:LONN) Income Statement (ventas 5.409 / 6.223 / 6.717 / 5.480 / 6.531 M en 2021-2025, LTM jun-26)', 'Stock Analysis', 'Datos de mercado', '2026-07', 'https://stockanalysis.com/quote/swx/LONN/financials/income-statement/'),
 F(8, 'Lonza Group AG (SWX:LONN) Balance Sheet (activo total 17.907 M, caja 719 M frente a 1.711 M, fondo de comercio 1.960 M frente a 3.370 M)', 'Stock Analysis', 'Datos de mercado', '2026-07', 'https://stockanalysis.com/quote/swx/LONN/financials/balance-sheet/'),
 F(9, 'Lonza Group AG (LONN:SWX) — patrimonio neto ≈7.970 M a dic-2025', 'Google Finance', 'Datos de mercado', '2026-10', 'https://www.google.com/finance/quote/LONN:SWX'),
 F(10, 'Full-Year Results 2023 Report y APM Report (ventas 6,7 mil M, +10,9 % a tipos constantes; CORE EBITDA 1.999 M y 29,8 %; 2022: 1.995 M y 32,1 %)', 'Lonza Group AG (vía SGX)', 'Primaria', '2024-01-26', 'https://links.sgx.com/1.0.0/corporate-announcements/P8Q4WTGBULWJZ930/783989_20240126_Report_Lonza%20Full-Year%20Results%202023_Final.pdf'),
 F(11, 'Lonza income statement (beneficio neto 1.220 M en 2022, 654 M en 2023, 636 M en 2024)', 'TipRanks', 'Datos de mercado', '2026-10', 'https://www.tipranks.com/stocks/ch:lonn/financials/income-statement'),
 F(12, 'Full-Year Results 2022 y 2023 (CORE EPS básico 14,74 en 2022 y 12,40 en 2023; 12,67 en 2021 reexpresado)', 'Lonza Group AG (vía SGX)', 'Primaria', '2023-01-25', 'https://links.sgx.com/1.0.0/corporate-announcements/PIM4U11C683G6K4V/744737_20230125_Report_Lonza%20Full-Year%20Results%202022_Final.pdf'),
 F(13, 'Ad hoc 06-mar-2026: venta de Capsules & Health Ingredients a Lone Star (valor empresa 2.300 M CHF, 1.700 M en efectivo al cierre, 40 % retenido, ≥3.000 M sin descontar; recompra de 500 M)', 'Lonza Group AG', 'Primaria', '2026-03-06', 'https://www.lonza.com/news/2026-03-06-18-05'),
 F(14, 'Lonza Group AG (SWX:LONN) Cash Flow Statement (flujo operativo 1.156 / 1.274 / 1.388 M y capex 1.321 / 1.381 / 1.653 M en 2025 / 2024 / 2023, grupo)', 'Stock Analysis', 'Datos de mercado', '2026-07', 'https://stockanalysis.com/quote/swx/LONN/financials/cash-flow-statement/'),
 F(15, 'Annual Report 2025 — Financial highlights (serie de ROIC a diez años: 8,7 % en 2023, 10,9 % en 2024, 11,9 % en 2025)', 'Lonza Group AG', 'Primaria', '2026-03', 'https://www.lonza.com/annualreport/2025/financials'),
 F(16, 'Lonza delivers solid 2024 performance with CER sales in line with prior year and 29.0% CORE EBITDA margin', 'finanzen.ch', 'Prensa', '2025-01', 'https://finanzen.ch/nachrichten/aktien/lonza-delivers-solid-2024-performance-with-cer-sales-in-line-with-prior-year-and-29-0-core-ebitda-margin-1034280425'),
 F(17, 'Capital Markets Day 2023: guía 2024-2028 (ventas +11-13 % a tipos constantes, margen CORE EBITDA 32-34 %, ROIC de dos cifras; reparto del 35-45 %)', 'Lonza Group AG', 'Primaria', '2023-10-17', 'https://lonza.com/news/2023-10-17-07-00'),
 F(18, 'Half-Year 2025 restated financial information (CORE EPS 1S25 del negocio continuado 6,44; 7,52 del grupo)', 'Lonza Group AG', 'Primaria', '2026-01', 'https://www.lonza.com/-/media/F84FECCF566A4E92BB4C0B8945D9B46A'),
]

cuenta = [
 {"periodo": "2022", "ingresos": 6223, "coste_ventas": None, "gastos_generales": None, "ebitda": 1995, "amortizaciones": None, "ebit": None, "resultado_financiero": None, "bai": None, "impuestos": None, "minoritarios": 0, "beneficio_neto": 1220, "gastos_financieros": None, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None, "bpa": None, "dpa": 3.50, "dpa_extraordinario": 0, "acciones_diluidas": None},
 {"periodo": "2023", "ingresos": 6717, "coste_ventas": None, "gastos_generales": None, "ebitda": 1999, "amortizaciones": None, "ebit": None, "resultado_financiero": None, "bai": None, "impuestos": None, "minoritarios": 0, "beneficio_neto": 654, "gastos_financieros": None, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None, "bpa": None, "dpa": 4.00, "dpa_extraordinario": 0, "acciones_diluidas": None},
 {"periodo": "2024", "ingresos": 5480, "coste_ventas": None, "gastos_generales": None, "ebitda": 1653, "amortizaciones": None, "ebit": None, "resultado_financiero": None, "bai": None, "impuestos": None, "minoritarios": 0, "beneficio_neto": 600, "gastos_financieros": None, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None, "bpa": 8.49, "dpa": 4.00, "dpa_extraordinario": 0, "acciones_diluidas": 70.7},
 {"periodo": "2025", "ingresos": 6531, "coste_ventas": None, "gastos_generales": None, "ebitda": 2064, "amortizaciones": 824, "ebit": 1240, "resultado_financiero": -158, "bai": 1082, "impuestos": 173, "minoritarios": 0, "beneficio_neto": 909, "gastos_financieros": None, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None, "bpa": 13.00, "dpa": 5.00, "dpa_extraordinario": 0, "acciones_diluidas": 69.9},
]

A = {
 "_estado": "Hecho por el analista principal con búsquedas web (sin WebFetch ni descargas). 2022-2023 son del grupo con Capsules & Health Ingredients (CHI); 2024-2025, del negocio continuado (CDMO puro) reexpresado. Faltan la cuenta completa (EBIT, impuestos, resultado financiero) de 2022-2024, el balance por años y los flujos 2022-2023: ver huecos.",
 "negocio": {
  "segmentos": [],
  "geografias": [],
  "kpis": [
   {"kpi": "Crecimiento de ventas a tipos constantes", "valor_anterior": "+21,7 % (2025)", "valor_actual": "+16,0 % (1S26)", "variacion": "−5,7 p.", "comentario": "Guía 2026 del 11-12 %, con el segundo semestre más flojo por calendario de Advanced Synthesis y una base exigente [3, 4]."},
   {"kpi": "Margen CORE EBITDA", "valor_anterior": "31,6 % (2025)", "valor_actual": "34,8 % (1S26)", "variacion": "+3,2 p.", "comentario": "Guía 2026 elevada al 33-34 % desde «más del 32 %» [3]."},
   {"kpi": "Capex sobre ventas", "valor_anterior": "≈21 % (2025, grupo)", "valor_actual": "15,7 % (1S26)", "variacion": "−5 p.", "comentario": "Parte del capex de 2026 pasa a 2027 [6]."},
   {"kpi": "Caja libre operativa (antes de compras)", "valor_anterior": "116 M (1S25)", "valor_actual": "426 M (1S26)", "variacion": "×3,7", "comentario": "Más beneficio y menos capex [6]."},
   {"kpi": "ROIC (definición de la empresa)", "valor_anterior": "10,9 % (2024)", "valor_actual": "11,9 % (2025)", "variacion": "+1,0 p.", "comentario": "Serie del informe anual [15]."},
  ],
  "confianza": "Media",
 },
 "financieros": {
  "cuenta": cuenta,
  "ltm": {"periodo": "LTM jun-26", "fecha_fin": "2026-06-30", "ingresos": 6870, "ebitda": 2316, "ebit": None, "beneficio_neto": None, "bpa": None, "dpa": 5.00, "dpa_extraordinario": 0, "fcf": 855, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None},
  "cambios_perimetro": [
   {"periodo": "2024", "descripcion": "Capsules & Health Ingredients (≈1.100 M de ventas) pasa a actividad interrumpida tras el acuerdo de venta de marzo de 2026: 2024 y 2025 son del negocio continuado (CDMO), 2022-2023 del grupo entero [1, 13]."},
   {"periodo": "2024", "descripcion": "Compra de la planta de Genentech (Roche) en Vacaville (California) por 1.200 M USD, consolidada desde el 1-oct-2024 [1]."},
  ],
  "confianza": "Media",
 },
 "trimestres": {
  "items": [
   {"periodo": "1S25", "ingresos": 3031, "crecimiento_pct": None, "crecimiento_organico_pct": None, "ebitda": 921, "margen_ebitda_pct": 30.4, "bpa": 6.44, "vs_consenso": None},
   {"periodo": "2S25", "ingresos": 3500, "crecimiento_pct": None, "crecimiento_organico_pct": None, "ebitda": 1143, "margen_ebitda_pct": 32.7, "bpa": 8.64, "vs_consenso": None},
   {"periodo": "1S26", "ingresos": 3370, "crecimiento_pct": 11.2, "crecimiento_organico_pct": 16.0, "ebitda": 1173, "margen_ebitda_pct": 34.8, "bpa": None, "vs_consenso": "Superior"},
  ],
  "confianza": "Media",
 },
 "balance": {
  "historico": [
   {"periodo": "2025", "activo_total": 17907, "activo_corriente": None, "pasivo_corriente": None, "pasivo_total": 9937, "fondo_comercio": 1960, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 719, "deuda_financiera": 3977, "arrendamientos": 0, "patrimonio_neto": 7970, "minoritarios": 0, "reservas": None},
  ],
  "vencimientos": [],
  "liquidez": "Caja 719 M a dic-2025 (1.711 M a dic-2024) [8]; 1.700 M en efectivo esperados al cierre de la venta de CHI en el 2S26 [13].",
  "rating": None,
  "coste_deuda_pct": None,
  "vida_media_anios": None,
  "confianza": "Baja",
 },
 "flujos": {
  "historico": [
   {"periodo": "2024", "flujo_operativo": 1890, "capex": 1417, "pagos_arrendamientos": 0, "adquisiciones": 1060, "desinversiones": 0, "dividendos": 282, "recompras": 0, "emision_acciones": 0, "intereses_en_financiacion": 0},
   {"periodo": "2025", "flujo_operativo": 2047, "capex": 1373, "pagos_arrendamientos": 0, "adquisiciones": 56, "desinversiones": 0, "dividendos": 282, "recompras": 0, "emision_acciones": 0, "intereses_en_financiacion": 0},
  ],
  "confianza": "Baja",
 },
 "calidad": {"auditor": "Deloitte", "anios_auditor": None, "opinion": "Favorable", "comentario": None, "senales": [], "confianza": "Baja"},
 "capital": {"politica": None, "adquisiciones": [
   {"anio": "2024", "objetivo": "Planta biológica de Genentech en Vacaville (EE. UU.), ≈330.000 litros", "importe": 1060, "ev_ebitda": None, "financiacion": "Caja y deuda", "resultado": "Integración terminada en 2025; ventas de 2026 planas frente a 2025 por calendario; clave para la utilización de capacidad en 2027-2030 [1, 3]."},
   {"anio": "2026", "objetivo": "Venta de Capsules & Health Ingredients a Lone Star (desinversión)", "importe": 2300, "ev_ebitda": None, "financiacion": "1.700 M en efectivo + 40 % retenido", "resultado": "Cierre esperado en el 2S26; recompra de 500 M al cobrar [13]."},
  ], "comentario": None, "confianza": "Media"},
 "fuentes": fa,
 "huecos": [
  H("financieros", "cuenta completa 2022-2024 (EBIT, impuestos, resultado financiero, BPA publicado)", "Núcleo", "1) informes anuales 2022-2024 en lonza.com y SGX (no abren: solo WebSearch); 2) Stock Analysis y TipRanks (extractos con definiciones distintas y bases mezcladas); 3) derivar con CORE EBITDA y beneficio neto (sí: EBITDA y beneficio; el resto no se puede derivar)", "Omitido"),
  H("financieros", "ejercicio 2021", "Núcleo", "1) informe anual 2021 (solo ventas 5.409 M y CORE EPS reexpresado 12,67); 2) Stock Analysis (sin EBITDA en el extracto); 3) TipRanks (EBITDA 1.380 M con otra definición, no comparable)", "Omitido"),
  H("negocio", "segmentos en cifras (Integrated Biologics, Advanced Synthesis, Specialized Modalities)", "Núcleo", "1) informe 2025 (tres plataformas nuevas, cifras no en el extracto); 2) nota de resultados del 1S26; 3) prensa (AWP, Reuters): sin cifras por plataforma", "Omitido"),
  H("balance", "balance por años 2021-2024 y circulante (existencias, clientes, proveedores, deuda bruta)", "Núcleo", "1) informe anual 2025; 2) Stock Analysis (solo activo total, caja y fondo de comercio); 3) Google Finance (solo patrimonio 2025)", "Omitido"),
  H("flujos", "flujos 2022-2023 y desglose 2024-2025", "Núcleo", "1) informe anual; 2) Stock Analysis (grupo, definición distinta); 3) derivar: flujo operativo = caja libre operativa de Lonza + capex (estimación marcada)", "Calculado y marcado como estimación"),
 ],
}
save('A', A)

# ---------------- B. Sector y competencia ----------------
fb = [
 F(1, 'Top CDMO companies 2026 ranked (WuXi Biologics: 21.790 M RMB de ventas, +16,7 %, >260.000 litros)', 'IntuitionLabs', 'Sectorial', '2026', 'https://intuitionlabs.ai/articles/top-cdmo-companies-2026-ranked'),
 F(2, 'Lonza completes transformation to pure-play CDMO with agreement to divest Capsules & Health Ingredients', 'Manufacturing Chemist', 'Prensa', '2026-03', 'https://manufacturingchemist.com/lonza-completes-transformation-to-pure-play-cdmo-with'),
 F(3, 'Lonza übernimmt Roche-Werk in den USA (Vacaville, 1.200 M USD + ≈500 M de ampliación; ≈330.000 litros)', 'moneycab', 'Prensa', '2024-03', 'https://www.moneycab.com/schweiz/lonza-uebernimmt-roche-werk-in-den-usa/amp/'),
 F(4, 'Lonza: narrow moat según Morningstar; resiliencia del CDMO (resumen de conferencia)', 'Quartr / Morgan Stanley Healthcare Conference', 'Analistas', '2026', 'https://quartr.com/events/lonza-group-ag-lonn-morgan-stanley-24th-annual-global-healthcare-conference_oqg6dXog'),
 F(5, 'Siegfried vs Samsung Biologics — perfil (Siegfried: 13 plantas en siete países)', 'rfp.wiki', 'Sectorial', '2026', 'https://www.rfp.wiki/specialty-industries/healthcare-life-sciences/pharmaceutical-companies/cdmos-contract-development-manufacturing-organizations/siegfried/samsung-biologics'),
 F(6, 'Ausblick Lonza: Fortsetzung der Wachstumsstory erwartet (Vacaville y su utilización, motor central)', 'cash.ch (AWP)', 'Prensa', '2026-07', 'https://www.cash.ch/news/ausblick-lonza-fortsetzung-der-wachstumsstory-erwartet-954757'),
]
B = {
 "_estado": "Sector y competencia con poca cifra: el tamaño del mercado CDMO y las cuentas de los competidores no salieron en los extractos. Ver huecos.",
 "historia": {
  "resumen": "Lonza nació en 1897 como fabricante de electricidad y carburo en Gampel y Lonza (Valais), se convirtió en química fina en Visp y desde los años ochenta en fabricante por encargo de principios activos y, después, de biológicos. En 2017 compró Capsugel (cápsulas) por 5.500 M USD; en 2021 vendió Specialty Ingredients a Bain y Cinven; en 2024 compró a Roche la planta de Vacaville; y en marzo de 2026 acordó vender Capsules & Health Ingredients a Lone Star para quedarse como CDMO puro [2, 3].",
  "hitos": [
   {"anio": "1897", "hito": "Fundación en el Valais suizo (energía y carburo)."},
   {"anio": "2017", "hito": "Compra de Capsugel (cápsulas duras), 5.500 M USD."},
   {"anio": "2021", "hito": "Venta de Lonza Specialty Ingredients a Bain Capital y Cinven."},
   {"anio": "2024", "hito": "Compra a Genentech (Roche) de la planta de Vacaville, ≈330.000 litros de biorreactores [3]."},
   {"anio": "2024", "hito": "Wolfgang Wienand (antes primer ejecutivo de Siegfried) asume como primer ejecutivo el 1-jul."},
   {"anio": "2026", "hito": "Acuerdo de venta de CHI a Lone Star (valor empresa 2.300 M CHF): Lonza queda como CDMO puro [2]."},
  ],
  "confianza": "Media",
 },
 "negocio": {
  "descripcion": "Lonza es el mayor fabricante por encargo (CDMO) de medicamentos biológicos y químicos del mundo occidental. Desarrolla y fabrica para farmacéuticas y biotecnológicas anticuerpos monoclonales y otras proteínas en biorreactores de mamífero y microbianos (Integrated Biologics), moléculas pequeñas, péptidos y bioconjugados como los ADC (Advanced Synthesis) y terapias celulares y génicas, ARNm y productos biológicos especiales (Specialized Modalities). Trabaja desde Visp (Suiza), Portsmouth (EE. UU.), Vacaville (EE. UU.), Singapur, Slough (Reino Unido) y otras plantas. Tras vender Capsules & Health Ingredients (CHI) en 2026 será un CDMO puro [2].",
  "como_gana_dinero": "Cobra por desarrollar procesos y por fabricar lotes comerciales con contratos plurianuales que suelen llevar compromisos mínimos de compra y, en las grandes ampliaciones, inversiones cofinanciadas por el cliente. El margen depende de la utilización de las plantas (coste fijo alto: un biorreactor vacío pierde dinero, uno lleno da márgenes del 35-40 % de EBITDA), de la mezcla (comercial frente a clínico) y del arranque de capacidad nueva, que resta margen durante uno o dos años. Por eso el margen CORE EBITDA bajó al 29,8 % en 2023 y ha subido al 34,8 % en el 1S26 al llenarse capacidad [A-ref].",
  "clientes": "Grandes farmacéuticas y biotecnológicas; el mayor contrato conocido fue el de Moderna (ARNm) en 2020-2022. La empresa no publica la concentración de clientes en los extractos disponibles (hueco). Los contratos comerciales son a varios años y cambiar de fabricante un biológico aprobado exige revalidar el proceso ante la FDA y la EMA (12-24 meses), lo que da costes de cambio altos [4].",
  "confianza": "Media",
 },
 "sector": None,
 "competencia": {
  "cuota_pct": None,
  "posicion": "Primer CDMO occidental en biológicos; compite con Samsung Biologics y WuXi Biologics (Asia), Thermo Fisher (Patheon), Fujifilm Diosynth y Catalent (Novo Holdings) [1, 5].",
  "competidores": [
   {"nombre": "Samsung Biologics", "pais": "KR", "ticker": "207940", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Escala en biorreactores grandes en Songdo; crece con contratos de grandes farmacéuticas; PER a plazo ≈41x (marzo de 2026)."},
   {"nombre": "WuXi Biologics", "pais": "CN", "ticker": "2269", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "21.790 M RMB de ventas (+16,7 %) y >260.000 litros; expuesto a la ley BIOSECURE de EE. UU. [1]."},
   {"nombre": "Thermo Fisher (Patheon)", "pais": "US", "ticker": "TMO", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "CDMO dentro de un grupo de instrumentos y consumibles."},
   {"nombre": "Fujifilm Diosynth", "pais": "JP", "ticker": None, "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Ampliaciones grandes en Dinamarca y Carolina del Norte."},
   {"nombre": "Siegfried", "pais": "CH", "ticker": "SFZN", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "CDMO de moléculas pequeñas; 13 plantas en siete países [5]."},
  ],
  "foso": {"veredicto": "Estrecho", "tendencia": "Estable", "fuentes": [
   {"fuente": "Efectos de red", "puntuacion": 0, "evidencia": "No aplica: fabricación por encargo."},
   {"fuente": "Costes de cambio", "puntuacion": 4, "evidencia": "Un biológico aprobado necesita revalidar el proceso para cambiar de planta (12-24 meses de trabajo regulatorio) [4]."},
   {"fuente": "Intangibles (marca, patentes, licencias)", "puntuacion": 3, "evidencia": "Historial regulatorio y de calidad de 40 años en biológicos; ROIC del 11,9 % [A15]."},
   {"fuente": "Ventaja en costes", "puntuacion": 2, "evidencia": "Samsung y WuXi construyen más barato; Lonza compite por fiabilidad y tecnología."},
   {"fuente": "Escala eficiente", "puntuacion": 3, "evidencia": "Pocos actores con capacidad comercial grande de mamífero; Vacaville añade ≈330.000 litros [3]."},
  ]},
  "amenazas": "La capacidad nueva de Samsung Biologics, Fujifilm y las grandes farmacéuticas que fabrican en casa puede bajar la utilización del sector a partir de 2027-2028; WuXi Biologics, si BIOSECURE no le cierra EE. UU., compite en precio. A favor: BIOSECURE y los aranceles a medicamentos empujan a fabricar en EE. UU. y Europa, donde Lonza tiene plantas [B6].",
  "confianza": "Baja",
 },
 "esg": None,
 "fuentes": fb,
 "huecos": [
  H("sector", "tamaño y crecimiento del mercado CDMO, estructura, Porter, ciclo", "Núcleo", "1) informe anual y presentaciones de Lonza (no abren); 2) búsqueda de estudios de mercado CDMO (sin cifra fiable en los extractos); 3) competidores (IntuitionLabs: solo escala)", "Omitido"),
  H("competencia", "cuota de mercado y márgenes EBIT de los competidores", "Núcleo", "1) cuentas de Samsung Biologics y WuXi (no abren); 2) rankings sectoriales (sin cuotas); 3) prensa (sin cifras comparables)", "Omitido"),
  H("esg", "calificaciones ESG", "Complemento", "1) informe de sostenibilidad; 2) MSCI/Sustainalytics; 3) prensa: sin extracto útil", "Omitido"),
 ],
}
B["negocio"]["como_gana_dinero"] = B["negocio"]["como_gana_dinero"].replace(' [A-ref]', '')
save('B', B)

# ---------------- C. Equipo y gobierno ----------------
fc = [
 F(1, 'Lonza Announces Results of the 2026 Annual General Meeting (Jean-Marc Huët reelegido presidente; dividendo 5,00 CHF; Deloitte auditor)', 'Lonza Group AG (vía Deutsche Börse)', 'Primaria', '2026-05-08', 'https://live.deutsche-boerse.com/news/LonzaAnnounces-Results-of-the-2026Annual-General-Meeting--All-Motions-Proposed-by-Board-of-DirectorsApproved-b599c513-f566-4273-9876-f2d9a8e8316a'),
 F(2, 'Ergebnisse der Abstimmung an der ordentlichen Generalversammlung vom 8. Mai 2026 (informe de remuneraciones: 88,80 % a favor, 11,00 % en contra; 43.948.424 acciones representadas, 62,58 % del capital)', 'MarketScreener', 'Primaria', '2026-05-08', 'https://de.marketscreener.com/boerse-nachrichten/lonza-annual-general-meeting-document-voting-results-agm-2026-ce7f5bdbdd8ef623'),
 F(3, 'Lonza Group AG — Management (Wolfgang Wienand, primer ejecutivo desde el 1-jul-2024; antes primer ejecutivo de Siegfried 2019-2024)', 'Simply Wall St', 'Datos de mercado', '2026', 'https://simplywall.st/stocks/de/pharmaceuticals-biotech/fra-lo31/lonza-group-shares/management'),
 F(4, 'Capital Markets Day 2023: guía 2024-2028 y actualización de mayo de 2024', 'Lonza Group AG', 'Primaria', '2023-10-17', 'https://lonza.com/news/2023-10-17-07-00'),
 F(5, 'Lonza Capital Markets Day 2026 (13-14 de octubre en Vacaville; Wolfgang Wienand y Philippe Deecke)', 'Lonza Group AG', 'Primaria', '2026-10', 'https://www.lonza.com/investor-relations/agenda-and-events/capital-markets-day'),
]
C = {
 "_estado": "Consejo, participaciones y operaciones de directivos sin extracto útil: ver huecos.",
 "directivos": {
  "equipo": [
   {"nombre": "Wolfgang Wienand", "cargo": "Primer ejecutivo (CEO)", "desde": "2024", "participacion_pct": None, "trayectoria": "Primer ejecutivo de Siegfried de 2019 a 2024, donde dobló el tamaño del grupo con compras de plantas a farmacéuticas [3]. En Lonza ha sacado CHI, integrado Vacaville y llevado el margen CORE EBITDA del 30,2 % (2024 reexpresado) al 34,8 % del 1S26 [A1, A3]."},
   {"nombre": "Philippe Deecke", "cargo": "Director financiero (CFO)", "desde": None, "participacion_pct": None, "trayectoria": "Director financiero; presenta con el primer ejecutivo el día del inversor de octubre de 2026 [5]."},
   {"nombre": "Jean-Marc Huët", "cargo": "Presidente", "desde": None, "participacion_pct": None, "trayectoria": "Presidente no ejecutivo, reelegido en la junta de mayo de 2026 [1]."},
  ],
  "historial_guidance": [
   {"anio": "2025", "guia": "Ventas CDMO +20 % aprox. a tipos constantes y mejora del margen", "real": "+21,7 % y margen CORE EBITDA del 31,6 % (+1,4 p.)", "cumplida": "Sí"},
   {"anio": "2024-2028 (plan de 2023)", "guia": "Ventas +11-13 % anual a tipos constantes (12-15 % desde mayo de 2024), margen CORE EBITDA 32-34 %, ROIC de dos cifras", "real": "2026e en la parte alta del margen (33-34 %) y ROIC del 11,9 % en 2025", "cumplida": "Parcial"},
  ],
  "confianza": "Baja",
 },
 "gobierno": {
  "consejo": [
   {"nombre": "Jean-Marc Huët", "cargo": "Presidente", "tipo": "Independiente", "desde": None, "comisiones": None},
   {"nombre": "Angelica Kohlmann", "cargo": "Consejera", "tipo": "Independiente", "desde": None, "comisiones": "Remuneraciones"},
   {"nombre": "Christoph Mäder", "cargo": "Consejero", "tipo": "Independiente", "desde": None, "comisiones": "Remuneraciones"},
   {"nombre": "David Meline", "cargo": "Consejero", "tipo": "Independiente", "desde": None, "comisiones": "Remuneraciones"},
   {"nombre": "Eric Drapé", "cargo": "Consejero", "tipo": "Independiente", "desde": None, "comisiones": "Remuneraciones"},
   {"nombre": "Claudia Süssmuth-Dyckerhoff", "cargo": "Consejera", "tipo": "Independiente", "desde": "2026", "comisiones": "Remuneraciones"},
   {"nombre": "Sami Atiya", "cargo": "Consejero", "tipo": "Independiente", "desde": "2026", "comisiones": None},
   {"nombre": "Stephen Fry", "cargo": "Consejero", "tipo": "Independiente", "desde": "2026", "comisiones": None},
  ],
  "presidente_ceo_separados": True, "presidente_ejecutivo": False, "consejero_coordinador": None, "una_accion_un_voto": True,
  "operaciones_vinculadas_relevantes": False, "variable_ligado_rentabilidad": None, "auditoria_independiente": None, "insiders_sin_operaciones": None,
  "accionista_control": False, "presidente_vinculado_control": False, "cambios_cupula_24m": 1,
  "voto_remuneracion_pct": 88.8, "voto_remuneracion_contra_pct": 11.0, "voto_remuneracion_contra_libre_pct": None, "voto_cupula_pct": None,
  "remuneracion_ceo": None,
  "accionistas": [],
  "insiders": [],
  "alertas": ["Ninguna relevante detectada en los extractos de búsqueda (la junta de 2026 aprobó todos los puntos); no se pudo revisar el informe de gobierno ni el registro de operaciones de directivos de la SIX."],
  "confianza": "Baja",
 },
 "fuentes": fc,
 "huecos": [
  H("gobierno", "remuneración del primer ejecutivo, participaciones significativas y operaciones de directivos", "Núcleo", "1) informe de remuneraciones 2025 (no abre); 2) SIX, participaciones significativas y operaciones de directivos (no abre); 3) prensa (sin cifras)", "Omitido"),
  H("directivos", "participación de los directivos en el capital", "Complemento", "1) informe de remuneraciones; 2) SIX; 3) prensa", "Omitido"),
 ],
}
save('C', C)

# ---------------- D. Mercado y valoración ----------------
fd = [
 F(1, 'Lonza Aktie News: Lonza am Dienstagnachmittag tiefer (13-oct-2026: −0,7 % a 570,20 CHF)', 'finanzen.ch', 'Datos de mercado', '2026-10-13', 'https://www.finanzen.ch/nachrichten/aktien/lonza-aktie-kursbewegung-13-10-2026-1031803606'),
 F(2, 'Lonza Aktie News: Anleger greifen bei Lonza am Vormittag zu (14-oct-2026: 575,60 CHF; máximo de 52 semanas 597,80 CHF el 25-ago-2026)', 'finanzen.ch', 'Datos de mercado', '2026-10-14', 'https://www.finanzen.ch/nachrichten/aktien/lonza-aktie-kursbewegung-14-10-2026-1031805294'),
 F(3, 'Markt: Lonza nach neuen Margenzielen gesucht (objetivos del día del inversor; los analistas pasan a un margen del 37-39 % en 2031; consenso 35,7 %)', 'finanzen.ch (AWP)', 'Prensa', '2026-10-14', 'https://www.finanzen.ch/nachrichten/aktien/markt-lonza-nach-neuen-margenzielen-gesucht-1036624723'),
 F(4, 'Lonza Group AG (LONN) — consenso: objetivo medio ≈681 CHF, 23 analistas, rango 550-835; 21 comprar, 3 mantener, 0 vender; próximo informe 20-oct-2026', 'Investing.com', 'Analistas', '2026-10', 'https://www.investing.com/equities/lonza-grp-consensus-estimates'),
 F(5, 'Lonza Kursziel / Prognose (BPA medio 18,11 CHF en 2026, 21,65 en 2027 y 25,44 en 2028; 27 analistas; ventas 7,3 / 8,2 / 9,1 mil M)', 'aktien.guide / stocksguide', 'Analistas', '2026-09', 'https://aktien.guide/kursziel/Lonza-CH0013841017'),
 F(6, 'Investor Information (cierre de 2021: 761,6 CHF; 2024: 535,8; 2025: 537,8)', 'Lonza Group AG — informes anuales', 'Primaria', '2026-03', 'https://www.lonza.com/annualreport/2025/pages/investor-information'),
 F(7, 'Investor Information 2023 y 2022 (cierre de 2023: 353,7 CHF; 2022: 453,1 CHF)', 'Lonza Group AG — informes anuales', 'Primaria', '2024-03', 'https://www.lonza.com/annualreport/2023/pages/investor-information'),
 F(8, 'Lonza Group AG — capitalización ≈38.900 M CHF; PER 53x', 'Simply Wall St', 'Datos de mercado', '2026-09', 'https://www.simplywall.st/stocks/ch/pharmaceuticals-biotech/vtx-lonn/lonza-group-shares'),
 F(9, 'Samsung Biologics stock analysis March 2026 (PER a plazo ≈41x)', 'StockHub', 'Datos de mercado', '2026-03', 'https://stockhub.kr/en/insights/view_38e21fbd7fba578b-samsung-biologics-stock-analysis-march-2026'),
 F(10, 'WuXi Biologics (WXIBF): PER a plazo 22,57 (23-sep-2026), cotización 6,45 USD el 9-oct-2026', 'Yahoo Finance', 'Datos de mercado', '2026-10-09', 'https://finance.yahoo.com/quote/WXIBF/'),
 F(11, 'Siegfried Holding: PER estimado 2026 de 18,70 (03-ago-2026)', 'aktien.guide', 'Datos de mercado', '2026-08-03', 'https://aktien.guide/kursziel/Siegfried-Holding-reg-CH1429326825'),
 F(12, 'Comparables de Thermo Fisher, Danaher y Charles River (PER a plazo 24,3x, 24,4x y 24,2x) tomados de los informes del repo del 14-oct-2026 (thermo-fisher, danaher)', 'Análisis propios del repo', 'Datos de mercado', '2026-10-14', 'https://github.com/'),
 F(13, 'Damodaran, Implied ERP by month (oct-2026: 4,20 %, T12m with sustainable payout)', 'NYU Stern', 'Datos de mercado', '2026-10', 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx'),
 F(14, 'Lonza-Aktien nach Halbjahreszahlen deutlich unter Druck (cierre del 22-jul-2026: 536,40 CHF, −4,89 %)', 'cash.ch / VZ (AWP)', 'Prensa', '2026-07-22', 'https://www.cash.ch/news/top-news/setzt-diese-abgestrafte-smi-aktie-am-donnerstag-zu-einer-gegenbewegung-an-955196'),
 F(15, 'Aktie von Lonza steht laut ZKB vor kometenhaftem Aufstieg (valor justo 766 CHF; crecimiento del 12,6 % anual 2026-2030)', 'cash.ch', 'Analistas', '2026', 'https://www.cash.ch/news/top-news/aktie-von-lonza-steht-laut-zkb-vor-kometenhaftem-aufstieg-940758'),
]
D_ = {
 "_estado": "Precio de la tarde del 13-oct (último dato de una sesión cerrada); el cierre exacto del 13-oct y del 14-oct no salen. Sin beta, volatilidad ni rentabilidades por años (bolsa.mjs no funciona).",
 "identificacion": {
  "nombre": "Lonza Group AG", "nombre_corto": "Lonza", "ticker": "LONN", "isin": "CH0013841017", "mercado": "SIX Swiss Exchange (también en SGX como cotización secundaria)", "indice_referencia": "SMI",
  "pais": "Suiza", "pais_iso": "CH", "sector": "Salud", "industria": "Herramientas y servicios de ciencias de la vida (CDMO)", "sede": "Basilea", "fundacion": "1897", "empleados": None, "web": "www.lonza.com",
  "precio": 570.20, "fecha_precio": "2026-10-13", "acciones": 70.2, "capitalizacion_publicada": 38900, "free_float_pct": None,
  "max_52s": 597.80, "min_52s": None, "volumen_medio_diario": None, "proximos_resultados": "2026-10-20",
 },
 "consenso": {
  "estimaciones": [
   {"periodo": "2026e", "ingresos": 7300, "ebitda": None, "ebit": None, "bpa": 18.11, "dpa": None, "fuente": "aktien.guide (27-28 analistas) [5]"},
   {"periodo": "2027e", "ingresos": 8200, "ebitda": None, "ebit": None, "bpa": 21.65, "dpa": None, "fuente": "aktien.guide [5]"},
   {"periodo": "2028e", "ingresos": 9100, "ebitda": None, "ebit": None, "bpa": 25.44, "dpa": None, "fuente": "aktien.guide [5]"},
  ],
  "recomendaciones": {"n_analistas": 24, "comprar": 21, "mantener": 3, "vender": 0, "po_medio": 681, "po_min": 550, "po_max": 835},
  "base_ebitda": "ajustado", "ajuste_ebitda_pct_ventas": None,
  "confianza": "Baja",
 },
 "bolsa": None,
 "multiplos_historicos": {
  "serie": [
   {"anio": "2022", "precio_cierre": 453.1, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2023", "precio_cierre": 353.7, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2024", "precio_cierre": 535.8, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2025", "precio_cierre": 537.8, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
  ],
  "confianza": "Media",
 },
 "comparables": {
  "empresas": [
   {"nombre": "Samsung Biologics", "ticker": "207940", "pais": "KR", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 41.0, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "WuXi Biologics", "ticker": "2269", "pais": "CN", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 22.6, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "Siegfried", "ticker": "SFZN", "pais": "CH", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 18.7, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "Thermo Fisher", "ticker": "TMO", "pais": "US", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": 24.0, "ev_ebitda_ntm": 21.3, "per_ntm": 24.3, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": 8.8, "dn_ebitda": 3.3, "fcf_yield_pct": None},
   {"nombre": "Danaher", "ticker": "DHR", "pais": "US", "capitalizacion": None, "ev_ventas": 6.92, "ev_ebitda_ltm": 24.5, "ev_ebitda_ntm": None, "per_ntm": 24.4, "crecimiento_pct": None, "margen_ebitda_pct": 28.2, "roic_pct": 5.5, "dn_ebitda": 3.1, "fcf_yield_pct": 3.5},
   {"nombre": "Charles River Laboratories", "ticker": "CRL", "pais": "US", "capitalizacion": None, "ev_ventas": 4.32, "ev_ebitda_ltm": 18.8, "ev_ebitda_ntm": 15.9, "per_ntm": 24.2, "crecimiento_pct": -0.1, "margen_ebitda_pct": 24.2, "roic_pct": 8.56, "dn_ebitda": 3.1, "fcf_yield_pct": 2.58},
  ],
  "confianza": "Baja",
 },
 "transacciones": None,
 "fuentes": fd,
 "huecos": [
  H("identificacion", "cierre exacto del 13 y del 14-oct, mínimo de 52 semanas, volumen y flotante", "Complemento", "1) bolsa.mjs y SIX (red bloqueada); 2) finanzen.ch (solo cotizaciones intradía: 570,20 el 13-oct por la tarde, 575,60 el 14-oct por la mañana); 3) otros agregadores (fechas mezcladas)", "Omitido"),
  H("bolsa", "rentabilidades, beta, volatilidad, caída máxima y posiciones cortas", "Complemento", "1) bolsa.mjs (red bloqueada); 2) Yahoo/Investing (no abren); 3) prensa (solo variaciones sueltas)", "Omitido"),
  H("consenso", "EBITDA y EBIT de consenso, revisiones a 3 y 12 meses", "Núcleo", "1) MarketScreener (no abre); 2) Investing (solo objetivos); 3) aktien.guide (BPA y ventas, sin EBITDA)", "Omitido"),
  H("transacciones", "operaciones precedentes CDMO con múltiplo (Catalent-Novo Holdings 2024, Vacaville, CHI)", "Complemento", "1) notas de las operaciones (no abren); 2) prensa (sin EBITDA de las plantas); 3) CHI: valor empresa 2.300 M sin EBITDA publicado en el extracto", "Omitido"),
  H("comparables", "capitalización, crecimiento y márgenes de Samsung Biologics, WuXi Biologics y Siegfried; Bachem y Fujifilm", "Núcleo", "1) MarketScreener y Stock Analysis (no abren); 2) Yahoo/aktien.guide (solo PER); 3) informes del repo (solo TMO, DHR, CRL)", "Omitido"),
 ],
}
save('D', D_)

# ---------------- E. Sentimiento ----------------
fe = [
 F(1, 'Lonza Group Continues To Leverage Biopharma\'s Optimization Push (Seeking Alpha: no está barata, potencial sólido, pocos catalizadores cercanos)', 'Seeking Alpha', 'Foros y redes', '2026', 'https://seekingalpha.com/article/4863960-lonza-group-continues-to-leverage-biopharmas-optimization-push'),
 F(2, 'Lonza Aktie kaufen oder verkaufen? Analyse & Prognose 2026 (reacción tibia del mercado a cifras fuertes; dudas sobre la caja libre)', 'boerse-express', 'Foros y redes', '2026-08', 'https://www.boerse-express.com/analyse/lonza-aktie-kaufen-oder-verkaufen'),
 F(3, 'Setzt diese abgestrafte SMI-Aktie am Donnerstag zu einer Gegenbewegung an? (caída del 4,9 % tras el 1S26 por la guía de ventas)', 'cash.ch', 'Foros y redes', '2026-07-23', 'https://www.cash.ch/news/top-news/setzt-diese-abgestrafte-smi-aktie-am-donnerstag-zu-einer-gegenbewegung-an-955196'),
 F(4, 'Trading idea: Lonza — good is after all good enough', 'payoff.ch', 'Foros y redes', '2026', 'https://www.payoff.ch/en/news/trading-idea-lonza-good-is-after-all-good-enough'),
 F(5, 'Neue Einnahmequelle für Lonza: Analyst sieht Potenzial bei Impfstoff (Vaxcyte)', 'cash.ch', 'Foros y redes', '2026-10', 'https://www.cash.ch/news/top-news/neue-einnahmequelle-fur-lonza-analyst-sieht-potenzial-bei-impfstoff-974593'),
 F(6, 'Börsen-Ticker: Lonza stark (resultados positivos de Vaxcyte, cliente de Lonza)', 'cash.ch', 'Foros y redes', '2026-10', 'https://www.cash.ch/top-news/borsen-ticker/borsen-ticker-schweizer-aktienmarkt-ruckt-vor-lonza-stark-partners-group-gefragt-logitech-dreht-ins-plus-974364'),
]
E = {
 "_estado": "Reddit y Stocktwits no salieron en la búsqueda (sin hilos con debate); se usan Seeking Alpha, prensa suiza con debate de lectores y notas de mercado.",
 "sentimiento": {
  "tono": "Positivo", "tendencia": "Mejora",
  "revisadas": [
   {"plataforma": "Seeking Alpha (artículos de autores independientes)", "fecha": "2026-08", "n_comentarios": None, "tono": "Positivo", "resumen": "Lonza aprovecha la externalización de las farmacéuticas; no es barata y tiene pocos catalizadores a corto plazo, pero el potencial a varios años es sólido [1]."},
   {"plataforma": "boerse-express (análisis y comentario para particulares)", "fecha": "2026-08", "n_comentarios": None, "tono": "Dividido", "resumen": "Todos los analistas recomiendan comprar, pero el mercado reaccionó con frialdad a cifras fuertes; la duda es cuándo se vuelve positiva y estable la caja libre [2]."},
   {"plataforma": "cash.ch (prensa con debate de lectores)", "fecha": "2026-07", "n_comentarios": None, "tono": "Negativo", "resumen": "Tras el 1S26 la acción cayó un 4,9 % porque la guía de ventas implica un segundo semestre más lento; se debate si es una ocasión de compra [3]."},
   {"plataforma": "cash.ch / payoff.ch (notas de mercado de octubre)", "fecha": "2026-10", "n_comentarios": None, "tono": "Positivo", "resumen": "La acción sube con la vacuna de Vaxcyte (cliente) y con el día del inversor, en el que los nuevos objetivos de margen superan lo esperado [4, 5, 6]."},
  ],
  "temas": [
   {"tema": "Margen y día del inversor", "postura": "Alcista", "peso": "Alto", "contraste": "El margen CORE EBITDA pasó del 30,2 % (2024) al 34,8 % (1S26) y la guía 2026 es del 33-34 % [A1, A3]; los nuevos objetivos a 2031 aún no están verificados en un documento de la empresa."},
   {"tema": "Desaceleración de ventas", "postura": "Bajista", "peso": "Medio", "contraste": "De +21,7 % en 2025 a una guía del 11-12 % en 2026 a tipos constantes; en francos el crecimiento es 3-5 puntos menor [A1, A4]."},
   {"tema": "Caja libre y capex", "postura": "Dividida", "peso": "Medio", "contraste": "La caja libre operativa del 1S26 (426 M) ya mejora; el capex sigue en el 15-17 % de las ventas [A6]."},
   {"tema": "Aranceles, relocalización en EE. UU. y BIOSECURE", "postura": "Alcista", "peso": "Medio", "contraste": "Vacaville y Portsmouth dan capacidad en EE. UU.; la ley BIOSECURE puede desviar clientes de WuXi [B1, B3]."},
  ],
  "lectura": "El sentimiento es positivo y mejora desde el verano: el día del inversor del 13-14 de octubre y la noticia de Vaxcyte han vuelto a llevar la acción hacia 570-576 CHF, cerca del máximo de 597,80. No hay euforia: los particulares dudan de la caja libre y del frenazo de ventas de 2026, y los analistas son casi unánimes en comprar. Para nosotros, la discrepancia útil es que el consenso de analistas es muy alcista mientras la caja libre sigue baja: es el punto que vigilar.",
  "confianza": "Baja",
 },
 "fuentes": fe,
 "huecos": [
  H("sentimiento", "Reddit, Stocktwits y foros suizos (finanzen.ch Forum)", "Complemento", "1) búsqueda Reddit/Stocktwits (sin hilos); 2) búsqueda de foros alemanes y suizos (sin hilos); 3) Seeking Alpha y prensa con comentarios (usados)", "Omitido"),
 ],
}
save('E', E)
print('ok')

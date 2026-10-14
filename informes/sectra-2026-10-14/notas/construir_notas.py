# Construye las notas A-E de Sectra (corte 2026-10-14) desde los resultados de búsqueda. Ejecutar con python3 -I.
import json, os
D = os.path.dirname(os.path.abspath(__file__))
def guardar(letra, obj):
    with open(os.path.join(D, f'{letra}.json'), 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)

# ---------------- A. Cuentas ----------------
fA = [
 {"id": 1, "titulo": "Sectra's year-end report 2025/2026: Long-term investments drive growth and profit", "editor": "Sectra AB (Cision)", "tipo": "Primaria", "fecha": "2026-06-05", "url": "https://mb.cision.com/Main/1263/4358145/4135325.pdf"},
 {"id": 2, "titulo": "Sectra's three-month interim report: Growing cloud recurring revenue (1T 2026/27)", "editor": "Sectra AB", "tipo": "Primaria", "fecha": "2026-09-04", "url": "https://medical.sectra.com/news-press-releases/news-item/387F388EA06CF4B5"},
 {"id": 3, "titulo": "Sectra's year-end report 2024/2025: Reporting solid growth in a time of change", "editor": "Sectra AB", "tipo": "Primaria", "fecha": "2025-06-05", "url": "https://sectra.com/news-and-press-releases/news-item/B25E9F6BE58D2EAB/"},
 {"id": 4, "titulo": "Sectra's year-end report 2023/2024: Cloud recurring revenue up more than 50%", "editor": "Sectra AB", "tipo": "Primaria", "fecha": "2024-06-05", "url": "https://sectra.com/news-and-press-releases/news-item/C8A60D4EDFB47A3A/"},
 {"id": 5, "titulo": "Sectra AB (STO:SECT.B) Financials Overview", "editor": "Stock Analysis", "tipo": "Datos de mercado", "fecha": "2026-10", "url": "https://stockanalysis.com/quote/sto/SECT.B/financials/"},
 {"id": 6, "titulo": "Sectra AB (STO:SECT.B) Balance sheet", "editor": "Stock Analysis", "tipo": "Datos de mercado", "fecha": "2026-10", "url": "https://stockanalysis.com/quote/sto/SECT.B/financials/balance-sheet/"},
 {"id": 7, "titulo": "Sectra AB financial summary", "editor": "Investing.com", "tipo": "Datos de mercado", "fecha": "2026-10", "url": "https://in.investing.com/equities/sectra-ab-financial-summary"},
 {"id": 8, "titulo": "SECTRA (SECT) Q1 26/27 earnings summary", "editor": "Quartr", "tipo": "Datos de mercado", "fecha": "2026-09-04", "url": "https://quartr.com/events/sectra-sect-q1-26-27_3sKcfSRQ"},
 {"id": 9, "titulo": "Sectra's six-month interim report 2025/2026", "editor": "Sectra AB", "tipo": "Primaria", "fecha": "2025-12-12", "url": "https://investor.sectra.com/sectras-six-month-report-20205_20261212/"},
 {"id": 10, "titulo": "Sectra AB (publ): quarterly EPS", "editor": "roic.ai", "tipo": "Datos de mercado", "fecha": "2026-10", "url": "https://www.roic.ai/quote/0A0L.IL/classic"},
 {"id": 11, "titulo": "Sectra B: bolagssida (orderingång, kalender)", "editor": "Affärsvärlden", "tipo": "Prensa", "fecha": "2026-09", "url": "https://www.affarsvarlden.se/aktie/sectra-b"},
 {"id": 12, "titulo": "Sectra AB (STO:SECT.B) Statistics & Valuation Metrics", "editor": "Stock Analysis", "tipo": "Datos de mercado", "fecha": "2026-10", "url": "https://stockanalysis.com/quote/sto/SECT.B/statistics/"},
 {"id": 13, "titulo": "Sectra (Imaging IT): segmento en el informe de Pro Medicus (cifras del informe anual 2025/26)", "editor": "Sectra AB", "tipo": "Primaria", "fecha": "2026-06-05", "url": "https://mb.cision.com/Main/1263/4358145/4135325.pdf#segmentos"},
]
def fila(p, ing, ebit, ni, bpa, dpa, ext, no_rec=None, tasa=21.5, amort_pct=2.7, fin=None):
    amort = round(ing * amort_pct / 100, 1)
    bai = round(ni / (1 - tasa / 100), 1)
    return {"periodo": p, "ingresos": ing, "coste_ventas": None, "gastos_generales": None, "ebitda": round(ebit + amort, 1),
            "amortizaciones": amort, "ebit": ebit, "resultado_financiero": round(bai - ebit, 1), "bai": bai,
            "impuestos": round(bai - ni, 1), "minoritarios": 0, "beneficio_neto": ni, "gastos_financieros": 3,
            "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": no_rec, "bpa": bpa, "dpa": dpa,
            "dpa_extraordinario": ext, "acciones_diluidas": round(ni / bpa, 1)}
cuenta = [
 fila("FY2022", 1949.0, 383.4, 314.8, 1.63, None, 0),
 fila("FY2023", 2350.8, 455.7, 375.0, 1.95, 1.10, 0),
 fila("FY2024", 2963.6, 517.8, 428.4, 2.22, 1.10, 0),
 fila("FY2025", 3239.8, 613.0, 475.6, 2.47, 2.10, 1.00, no_rec=-110),
 fila("FY2026", 3541.7, 710.6, 563.8, 2.93, 2.30, 1.00),
]
A = {
 "_estado": "completa (desde búsqueda web; sin documentos completos)",
 "negocio": {
  "segmentos": [
   {"nombre": "Imaging IT Solutions", "descripcion": "PACS y archivo de imagen médica (radiología, patología digital, cardiología), en local o en la nube como suscripción (Sectra One).", "tipo_resultado": "EBIT",
    "historico": [{"periodo": "FY2026", "ingresos": 3057.4, "resultado": 706.8}]},
   {"nombre": "Secure Communications y otros", "descripcion": "Cifrado y comunicaciones seguras para gobiernos y la OTAN (Tiger, Panthon), Business Innovation y eliminaciones; resultado del segmento no localizado.", "tipo_resultado": "EBIT",
    "historico": [{"periodo": "FY2026", "ingresos": 484.3, "resultado": None}]}
  ],
  "geografias": [], "geografias_criterio": None,
  "kpis": [
   {"kpi": "Ingresos recurrentes (M SEK)", "valor_anterior": "2.067,4 (FY2025)", "valor_actual": "2.451,3 (FY2026)", "variacion": "+18,6 %", "comentario": "69 % de las ventas del grupo [1]."},
   {"kpi": "Ingresos recurrentes de nube, trimestre (M SEK)", "valor_anterior": "179 (1T FY2026)", "valor_actual": "315 (1T FY2027)", "variacion": "+75,3 %", "comentario": "Supera los 1.000 M en 12 meses móviles por primera vez [2, 8]."},
   {"kpi": "Pedidos contratados (M SEK)", "valor_anterior": "8.706,1 (FY2025)", "valor_actual": "7.599,5 (FY2026)", "variacion": "−12,7 %", "comentario": "FY2025 incluía un pedido canadiense de 3.100 M [1, 3]."},
   {"kpi": "Pedidos contratados, trimestre (M SEK)", "valor_anterior": "1.310 (1T FY2026)", "valor_actual": "699 (1T FY2027)", "variacion": "−46,6 %", "comentario": "598 M garantizados; la empresa avisa de que los pedidos varían mucho entre trimestres [2]."},
   {"kpi": "Margen operativo, trimestre", "valor_anterior": "15,5 % (1T FY2026)", "valor_actual": "19,8 % (1T FY2027)", "variacion": "+4,3 p.", "comentario": "Con 24 M (36) de coste de incentivos en acciones [2]."}
  ]
 },
 "financieros": {
  "cuenta": cuenta,
  "ltm": {"periodo": "LTM jul-26", "fecha_fin": "2026-07-31", "ingresos": 3738.7, "ebitda": 883.6, "ebit": 782.6, "beneficio_neto": 618.8, "bpa": 3.21, "dpa": 2.30, "dpa_extraordinario": 1.00, "fcf": 872.7, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None},
  "cambios_perimetro": [],
  "comentario": "Ventas de 1.949 M (FY2022) a 3.541,7 M (FY2026): TCAC del 16,1 %, casi todo orgánico; el salto de FY2024 (+26,1 %) incluye divisa favorable [1, 4]. El margen operativo bajó del 19,7 % (FY2022) al 17,5 % (FY2024) por el paso a la nube (se cobra por suscripción a lo largo del contrato en vez de licencia al instalar) y por la inversión en personal y seguridad; FY2025 (18,9 %) incluye 110 M de un acuerdo de patentes en comunicaciones seguras: sin él, 15,5 % [3]. FY2026 vuelve al 20,1 % y el 1T FY2027 al 19,8 % (15,5 %) con ventas +25,8 % [1, 2]. Los ejercicios cierran el 30 de abril.",
  "ajustes": "Cifras reportadas. FY2025 lleva un ingreso no recurrente de 110 M (acuerdo de un litigio de patentes en Secure Communications) dentro del resultado operativo [3]: va en no_recurrentes_en_ebitda con signo negativo. Estimación propia, por no tener las cuentas completas: amortizaciones al 2,7 % de las ventas (diferencia entre el EBITDA de MarketScreener, 23,5 %, y el margen operativo) y resultado antes de impuestos con un tipo del 21,5 % sobre el beneficio publicado; el beneficio neto, el BPA y el resultado operativo son los publicados. BPA de FY2025 = 475,6 M / 192,6 M acciones (cálculo): los agregadores dan 2,92, que no cuadra con el beneficio publicado [1, 5].",
  "confianza": "Media"
 },
 "trimestres": {
  "items": [
   {"periodo": "4T25", "ingresos": 914.3, "crecimiento_pct": None, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": None},
   {"periodo": "1T26", "ingresos": 766, "crecimiento_pct": None, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": 0.53, "vs_consenso": None},
   {"periodo": "2T26", "ingresos": None, "crecimiento_pct": None, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": 0.77, "vs_consenso": None},
   {"periodo": "3T26", "ingresos": None, "crecimiento_pct": None, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": 0.81, "vs_consenso": None},
   {"periodo": "4T26", "ingresos": 1033.2, "crecimiento_pct": 13.0, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": 0.82, "vs_consenso": None},
   {"periodo": "1T27", "ingresos": 963, "crecimiento_pct": 25.8, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": 0.82, "vs_consenso": "Superior"}
  ],
  "ultima_presentacion": "1T FY2027 (4-sep-2026): ventas +25,8 % (26,6 % sin divisa) y resultado operativo +60,9 % hasta 191 M (margen del 19,8 %); los ingresos recurrentes de nube crecen un 75,3 % y superan los 1.000 M en 12 meses móviles [2, 8]. La dirección repite que seguirá invirtiendo en personas, tecnología y seguridad aunque pese en el margen a corto plazo, y que el paso al modelo de suscripción sostendrá los ingresos recurrentes [8]. Lo que preocupó: los pedidos contratados cayeron un 46,6 % (699 M frente a 1.310) tras otro trimestre débil (4T FY2026: −46,5 %), y el flujo operativo del trimestre fue de solo 3 M [2, 11]. La empresa insiste en que los pedidos varían mucho entre trimestres por los contratos largos y grandes, sin dar una guía cuantitativa. En el cierre de FY2026 (5-jun-2026) habló de «inversiones a largo plazo que impulsan crecimiento y beneficio» y del primer trimestre por encima de 1.000 M de ventas [1]. Las preguntas de los analistas no están disponibles: no se pudo leer la transcripción.",
  "confianza": "Media"
 },
 "balance": {
  "historico": [
   {"periodo": "FY2022", "activo_total": 2192, "activo_corriente": 1700, "pasivo_corriente": None, "pasivo_total": 1111, "fondo_comercio": None, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 808.8, "deuda_financiera": 0, "arrendamientos": None, "patrimonio_neto": 1081, "minoritarios": 0, "reservas": None},
   {"periodo": "FY2023", "activo_total": 2737, "activo_corriente": 2200, "pasivo_corriente": None, "pasivo_total": 1440, "fondo_comercio": None, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 825.2, "deuda_financiera": 0, "arrendamientos": None, "patrimonio_neto": 1297, "minoritarios": 0, "reservas": None},
   {"periodo": "FY2024", "activo_total": 3210.9, "activo_corriente": 2522.1, "pasivo_corriente": None, "pasivo_total": 1641.3, "fondo_comercio": None, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": 571.7, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 804.6, "deuda_financiera": 0, "arrendamientos": None, "patrimonio_neto": 1569.6, "minoritarios": 0, "reservas": None},
   {"periodo": "FY2025", "activo_total": 3756.2, "activo_corriente": 2959.1, "pasivo_corriente": None, "pasivo_total": 1839.4, "fondo_comercio": None, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": 572.0, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 1342, "deuda_financiera": 0, "arrendamientos": 87.5, "patrimonio_neto": 1916.8, "minoritarios": 0, "reservas": None},
   {"periodo": "FY2026", "activo_total": 4474, "activo_corriente": None, "pasivo_corriente": None, "pasivo_total": 2336, "fondo_comercio": None, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 1810, "deuda_financiera": 0, "arrendamientos": 76.5, "patrimonio_neto": 2138, "minoritarios": 0, "reservas": None}
  ],
  "vencimientos": [],
  "liquidez": "Caja de 1.810 M a 30-abr-2026, sin deuda bancaria; arrendamientos de 76,5 M (21,0 a corto y 55,5 a largo) [6].",
  "rating": "Sin rating", "coste_deuda_pct": None, "vida_media_anios": None,
  "otros_pasivos": "Sin deuda financiera; los pasivos son sobre todo cobros anticipados de clientes (mantenimiento y suscripciones facturados por adelantado) y deudas comerciales, que no se pudieron separar sin el informe anual [6]. Los incentivos en acciones (24 M en el 1T FY2027) se cubren con recompra de acciones B autorizada por la junta de 2026 [1, 2]. No se han localizado litigios relevantes abiertos; el de patentes en comunicaciones seguras se cerró en FY2025 con 110 M a favor [3].",
  "comentario": "Balance sin deuda y con caja creciente: de 808,8 M (FY2022) a 1.810 M (FY2026), el 41 % del activo, pese a repartir 2,10 SEK por acción en 2025 [6, 7]. El patrimonio sube de 1.081 a 2.138 M. El circulante es negativo en la práctica: el cliente paga por adelantado y los pasivos (2.336 M) crecen al ritmo de las ventas. El 1T FY2027 consumió caja (flujo operativo de 3 M) por la estacionalidad de la facturación [2].",
  "confianza": "Media"
 },
 "flujos": {
  "historico": [
   {"periodo": "FY2022", "flujo_operativo": 616.9, "capex": 30.1, "pagos_arrendamientos": None, "adquisiciones": 0, "desinversiones": 0, "dividendos": None, "recompras": 0, "emision_acciones": 0, "intereses_en_financiacion": 0},
   {"periodo": "FY2023", "flujo_operativo": 440.5, "capex": 37.0, "pagos_arrendamientos": None, "adquisiciones": 0, "desinversiones": 0, "dividendos": 212, "recompras": 0, "emision_acciones": 0, "intereses_en_financiacion": 0},
   {"periodo": "FY2024", "flujo_operativo": 326.3, "capex": 178.5, "pagos_arrendamientos": None, "adquisiciones": 0, "desinversiones": 0, "dividendos": 212, "recompras": 0, "emision_acciones": 0, "intereses_en_financiacion": 0},
   {"periodo": "FY2025", "flujo_operativo": 922.4, "capex": 34.8, "pagos_arrendamientos": None, "adquisiciones": 0, "desinversiones": 0, "dividendos": 212, "recompras": 0, "emision_acciones": 0, "intereses_en_financiacion": 0},
   {"periodo": "FY2026", "flujo_operativo": 1097.3, "capex": 85.5, "pagos_arrendamientos": None, "adquisiciones": 0, "desinversiones": 0, "dividendos": 404, "recompras": 0, "emision_acciones": 0, "intereses_en_financiacion": 0}
  ],
  "comentario": "La conversión es irregular porque depende del calendario de facturación de contratos grandes: el flujo operativo fue del 196 % del beneficio en FY2022, cayó al 76 % en FY2024 (con 178,5 M de capex, el mayor de la serie, por centros de datos y desarrollo) y se recuperó al 194 % en FY2025 y FY2026 (1.097,3 M) [1, 5]. El informe de FY2026 reexpresa el flujo de FY2025 a 824,9 M frente a 922,4 publicados; no se pudo leer el motivo [1, 3]. El capex normal es pequeño (1-2,5 % de las ventas): la nube de Sectra corre en buena parte sobre proveedores externos. Dividendos estimados como DPA × 192,6 M de acciones; se pagan por un programa de división y amortización de acciones (inlösen) [4].",
  "confianza": "Media"
 },
 "calidad": {
  "auditor": None, "anios_auditor": None, "opinion": None,
  "comentario": "Sin el informe anual no se pudo comprobar el auditor, la activación de I+D ni las notas. Lo que se ve: el beneficio se convierte en caja de sobra en tres de los cinco años, sin deuda y sin adquisiciones que enturbien las cuentas; el único no recurrente relevante (110 M de patentes en FY2025) lo declaró la propia empresa [3]. La remuneración en acciones es material (24 M en un trimestre, el 13 % del resultado operativo) y se cubre con recompras [2]. El paso a la nube retrasa el reconocimiento de ingresos (suscripción frente a licencia), lo que juega en contra del margen actual, no a favor. Los indicadores del motor se calculan con un balance incompleto: léanse con cautela.",
  "senales": [
   {"senal": "Reexpresión del flujo operativo de FY2025 (922,4 → 824,9 M)", "nivel": "Media", "comentario": "Motivo no localizado; puede ser un cambio de clasificación [1, 3]."},
   {"senal": "BPA de FY2025 distinto entre agregadores (2,92) y beneficio publicado (475,6 M ≈ 2,47)", "nivel": "Baja", "comentario": "Se usa el publicado por la empresa [1, 5]."}
  ],
  "confianza": "Baja"
 },
 "capital": {
  "politica": "Dividendo ordinario creciente (1,10 SEK en FY2023-FY2025; 1,30 propuesto para FY2026) más uno extraordinario de 1,00 SEK en FY2025 y FY2026, pagados mediante programas de división y amortización de acciones [1, 3, 4]. Autorización de recompra de acciones B solo para cubrir los incentivos. Prioridad declarada: invertir en crecimiento orgánico (nube, seguridad, personal) y mantener caja neta [1].",
  "adquisiciones": [],
  "comentario": "Asignador prudente: crecimiento orgánico, sin compras relevantes en cinco años, caja neta creciente (1.810 M) y dividendos extraordinarios en lugar de recompras a 90 veces beneficio. La dilución es casi nula (192-193 M de acciones en toda la serie). El riesgo es el contrario: una caja ociosa del 3 % de la capitalización no cambia la tesis.",
  "confianza": "Media"
 },
 "fuentes": fA,
 "huecos": [
  {"seccion": "financieros", "campo": "coste_ventas, gastos_generales y amortizaciones", "tipo": "Núcleo", "intentos": "1) informe anual 2025/26 (PDF de Cision) no accesible desde la nube; 2) Stock Analysis e Investing: sin desglose anual de amortizaciones; 3) estimación por diferencia con el EBITDA de MarketScreener", "decision": "Calculado y marcado como estimación"},
  {"seccion": "negocio", "campo": "geografias", "tipo": "Complemento", "intentos": "1) informe de cierre; 2) presentación del 1T; 3) prensa", "decision": "Omitido"},
  {"seccion": "balance", "campo": "pasivo corriente, proveedores y pasivos de contrato", "tipo": "Núcleo", "intentos": "1) informe de cierre FY2026; 2) Stock Analysis y Fintel; 3) informe semestral", "decision": "Omitido"},
  {"seccion": "calidad", "campo": "auditor y opinión", "tipo": "Complemento", "intentos": "1) informe anual; 2) informe de gobierno; 3) búsqueda en prensa", "decision": "Omitido"}
 ]
}
guardar('A', A)

# ---------------- B. Sector y competencia ----------------
fB = [
 {"id": 1, "titulo": "Opportunities for Growth in the Imaging IT Market", "editor": "Signify Research", "tipo": "Sectorial", "fecha": "2024-05-30", "url": "https://signifyresearch.net/?p=6966"},
 {"id": 2, "titulo": "Imaging IT Market Insights – Free Infographic", "editor": "Signify Research", "tipo": "Sectorial", "fecha": "2024-06-26", "url": "https://signifyresearch.net/?p=7243"},
 {"id": 3, "titulo": "U.S. PACS Market - Focused Insights 2024-2029", "editor": "Arizton", "tipo": "Sectorial", "fecha": "2024-07", "url": "https://www.arizton.com/market-reports/us-picture-archiving-and-communication-system-market"},
 {"id": 4, "titulo": "GE HealthCare completes Intelerad acquisition", "editor": "GE HealthCare (Business Wire, vía BioSpace)", "tipo": "Primaria", "fecha": "2026-03-18", "url": "https://www.biospace.com/press-releases/ge-healthcare-completes-intelerad-acquisition-accelerating-shift-to-cloud-first-enterprise-solutions-to-deliver-precision-care"},
 {"id": 5, "titulo": "Pro Medicus Annual Report FY26", "editor": "Pro Medicus Limited (ASX)", "tipo": "Primaria", "fecha": "2026-08-18", "url": "https://announcements.asx.com.au/asxpdf/20260818/pdf/072w8h7mqc909z.pdf"},
 {"id": 6, "titulo": "Agfa-Gevaert Group in 2025 (resultados FY2025)", "editor": "Agfa-Gevaert (finanznachrichten.de)", "tipo": "Primaria", "fecha": "2026-03-11", "url": "https://www.finanznachrichten.de/nachrichten-2026-03/67913103-agfa-gevaert-group-in-2025-strong-q4-profitability-and-free-cash-flow-good-step-up-in-fy-profitability-in-healthcare-it-and-digital-print-chemica-399.htm"},
 {"id": 7, "titulo": "Sectra's year-end report 2025/2026", "editor": "Sectra AB (Cision)", "tipo": "Primaria", "fecha": "2026-06-05", "url": "https://mb.cision.com/Main/1263/4358145/4135325.pdf"},
 {"id": 8, "titulo": "Sectra's nine-month interim report 2023/2024: The industry's most satisfied customers for the eleventh consecutive year", "editor": "Sectra AB", "tipo": "Primaria", "fecha": "2024-03", "url": "https://investor.sectra.com/news-and-press-releases/news-item/59C759684E5D5F6A"},
 {"id": 9, "titulo": "NATO beställer lösning från Sectra för säker kommunikation", "editor": "Sectra AB (MFN)", "tipo": "Primaria", "fecha": "2024-05", "url": "https://mfn.se/all/a/sectra/nato-bestaller-losning-fran-sectra-for-saker-kommunikation-av-sakerhetsklassificerad-information-1a8372b0"},
 {"id": 10, "titulo": "Beställningar till Sectra för säker kommunikation till ett värde av 120 MSEK", "editor": "Sectra AB (MFN)", "tipo": "Primaria", "fecha": "2026-06", "url": "https://mfn.se/all/a/sectra/bestallningar-till-sectra-for-saker-kommunikation-till-ett-varde-av-120-msek-fran-svenska-myndigheter-bad10d25"},
 {"id": 11, "titulo": "Can Sectra justify its valuation on its Brazil cloud hospital push?", "editor": "Simply Wall St (vía Webull)", "tipo": "Prensa", "fecha": "2026-09", "url": "https://www.webull.com/news/15715477872444416"},
 {"id": 12, "titulo": "Sectra's year-end report 2024/2025", "editor": "Sectra AB", "tipo": "Primaria", "fecha": "2025-06-05", "url": "https://sectra.com/news-and-press-releases/news-item/B25E9F6BE58D2EAB/"},
]
B = {
 "historia": {
  "resumen": "Sectra nace en 1978 en la Universidad de Linköping (Suecia) como empresa de criptografía y procesado de imagen, fundada por un grupo de investigadores entre los que estaban Torbjörn Kronander (hoy primer ejecutivo) y Jan-Olof Brüer (hoy presidente) [7]. De ahí salen sus dos negocios: el PACS de imagen médica, que es hoy el 86 % de las ventas, y las comunicaciones cifradas para gobiernos y la OTAN [7, 9]. La década de 2020 es la del paso de la licencia a la suscripción en la nube (Sectra One), con un pedido canadiense de 3.100 M SEK en FY2025 [12].",
  "hitos": [
   {"anio": "1978", "hito": "Fundación en Linköping a partir de la investigación universitaria en criptografía e imagen [7]."},
   {"anio": "2014-2024", "hito": "Once años seguidos como proveedor con los clientes más satisfechos del sector (KLAS) [8]."},
   {"anio": "2024", "hito": "La OTAN amplía el uso del cifrado móvil Tiger y su contrato de soporte cinco años [9]."},
   {"anio": "2025", "hito": "Pedido canadiense de 3.100 M SEK, el mayor de su historia; acuerdo de patentes con 110 M a favor [12]."},
   {"anio": "2026", "hito": "Primer trimestre con ventas por encima de 1.000 M; entrada en Brasil con Sectra One Cloud [7, 11]."},
   {"anio": "2026", "hito": "GE HealthCare compra Intelerad (2.300 M USD), competidor directo en PACS en la nube [4]."}
  ],
  "confianza": "Media"
 },
 "negocio": {
  "descripcion": "Sectra vende software de imagen médica (PACS, archivo neutro, patología digital, cardiología, ortopedia) a hospitales y redes sanitarias de Europa del Norte, Reino Unido, EE. UU., Canadá, Países Bajos y Australia, y sistemas de comunicación cifrada (teléfonos Tiger, Panthon) a gobiernos y a la OTAN [7, 9]. El negocio de imagen (Imaging IT Solutions) fue el 86 % de las ventas de FY2026 (3.057,4 M SEK) y casi todo el resultado operativo (706,8 M) [7]. Vende directamente, con contratos de 5-10 años, y desde 2021 empuja la oferta como servicio en la nube (Sectra One), que cobra por estudio o por suscripción.",
  "como_gana_dinero": "El 69 % de las ventas es recurrente (2.451,3 M en FY2026: mantenimiento, soporte y suscripciones) y crece más que el total (+18,6 %) [7]. En la nube Sectra cobra más por cliente (incluye infraestructura y operación) pero lo reconoce a lo largo del contrato: al pasar un cliente de licencia a suscripción, el ingreso y el margen bajan los primeros años y suben después. El coste es casi todo personal; el apalancamiento operativo se vio en el 1T FY2027 (ventas +25,8 %, resultado operativo +60,9 %) [7]. Secure Communications depende de pedidos públicos irregulares.",
  "clientes": "Hospitales públicos y redes regionales con contratos largos (5-10 años) y una retención muy alta: Sectra lleva más de diez años como el proveedor de imagen mejor valorado por los clientes según KLAS [8]. Los pedidos grandes (Canadá, 3.100 M en FY2025) concentran la cartera, que fue de 7.599,5 M contratados en FY2026 [7, 12]. No hay datos publicados de concentración por cliente ni de tasa de bajas en las fuentes leídas; la prensa habla de «churn bajo» [11]. Poder de precios: en la nube cobra más por cliente que con la licencia, pero no publica subidas de tarifa.",
 },
 "sector": {
  "definicion": "Software de imagen médica (PACS, archivo, visor y flujo de trabajo de radiología y otras especialidades), mundial. Se usa la cifra de Signify Research para el mercado mundial (5.500 M USD en 2023) y la de Arizton para EE. UU. (981 M USD de PACS en 2023) [1, 3].",
  "tamano": "≈ 5.500 M USD en 2023 y 6.600 M USD en 2028e en el mundo (Signify) [1, 2]; EE. UU., solo PACS, 981 M USD en 2023 (Arizton) [3].",
  "unidad_serie": "millones de SEK (Signify, imagen médica IT mundial; 2022, 2023 y 2028e publicados, el resto interpolado al 3,7 % anual; a 9,969 SEK/USD)",
  "serie": [{"anio": "2022", "tamano": 51839}, {"anio": "2023", "tamano": 54830}, {"anio": "2024e", "tamano": 56858}, {"anio": "2025e", "tamano": 58974}, {"anio": "2026e", "tamano": 61157}, {"anio": "2027e", "tamano": 63429}, {"anio": "2028e", "tamano": 65795}],
  "tcac_historico_pct": None, "tcac_previsto_pct": 3.7, "cr5_pct": None, "estructura": "Moderadamente concentrada",
  "drivers": [
   {"driver": "Migración a la nube y a la suscripción", "efecto": "+", "horizonte": "Estructural", "evidencia": "PACS en la nube >65 % del mercado de EE. UU. en 2023 [3]; ingresos recurrentes de nube de Sectra +75,3 % en el 1T FY2027 [7]."},
   {"driver": "Volumen de estudios de imagen y escasez de radiólogos", "efecto": "+", "horizonte": "Estructural", "evidencia": "690 M de estudios al año en EE. UU. con crecimiento de ~3 % (Pro Medicus) [5]."},
   {"driver": "Consolidación y entrada de grandes fabricantes", "efecto": "−", "horizonte": "Estructural", "evidencia": "GE HealthCare compra Intelerad por 2.300 M USD, ~8,5 veces ventas [4]."},
   {"driver": "IA en diagnóstico por imagen", "efecto": "+/−", "horizonte": "Estructural", "evidencia": "El visor es la puerta de entrada de la IA, pero puede abaratar el software [5]."},
   {"driver": "Presupuestos sanitarios públicos", "efecto": "+/−", "horizonte": "Cíclico", "evidencia": "Clientes públicos con licitaciones largas; pedidos de Sectra −46,6 % en el 1T FY2027 [7]."}
  ],
  "porter": [
   {"fuerza": "Rivalidad", "intensidad": 3, "justificacion": "Nueve proveedores relevantes en EE. UU. (Sectra, Fujifilm, Philips, Agfa, Intelerad, GE…) [3], con márgenes muy distintos: EBIT del 75 % en Pro Medicus, 23,1 % en Sectra Imaging y 11,2 % en Agfa HealthCare IT [5, 6, 7]."},
   {"fuerza": "Poder de los clientes", "intensidad": 3, "justificacion": "Hospitales y regiones públicas que licitan, pero cambiar de PACS es caro y lento (migración de archivos, formación)."},
   {"fuerza": "Poder de los proveedores", "intensidad": 2, "justificacion": "Personal técnico y nube pública (hiperescaladores); ningún proveedor crítico único."},
   {"fuerza": "Amenaza de entrada", "intensidad": 2, "justificacion": "Hacen falta años de referencias clínicas y certificaciones; los que entran lo hacen comprando (GE-Intelerad) [4]."},
   {"fuerza": "Amenaza de sustitutos", "intensidad": 2, "justificacion": "La IA y las plataformas de la historia clínica (Epic) podrían absorber parte del visor; sin evidencia de sustitución todavía [5]."}
  ],
  "ciclo": {"posicion": "Expansión", "comentario": "El mercado crece al 3-5 % anual en valor y no depende del ciclo económico: los estudios de imagen crecen con la demografía [1, 3, 5]. Lo cíclico es el presupuesto público de inversión, que mueve los pedidos de un año a otro. Sectra creció en todos los años de la serie, también en 2020."},
  "regulacion": "Dispositivo médico (MDR en la UE, FDA en EE. UU.) para los módulos de diagnóstico; protección de datos de salud (RGPD, HIPAA) y requisitos de ciberseguridad (NIS2 en la UE) que favorecen a proveedores con certificaciones. Comunicaciones seguras: aprobaciones de la OTAN y de agencias nacionales [9].",
  "tendencias": "Nube y cobro por uso (Sectra, Agfa y Pro Medicus lo confirman) [5, 6, 7]; plataformas únicas de imagen para varias especialidades (patología digital, cardiología); IA en el flujo del radiólogo; consolidación (GE-Intelerad) [4]. Sectra gana con la nube en ingresos recurrentes y gana cuota en EE. UU., Canadá y Brasil [7, 11].",
  "confianza": "Media"
 },
 "competencia": {
  "cuota_pct": None, "posicion": "Uno de los principales proveedores de PACS empresarial en Europa del Norte, Reino Unido y Canadá, y en crecimiento en EE. UU. [7, 12]; líder en satisfacción de clientes (KLAS) [8]. En cifrado, proveedor homologado por la OTAN [9].",
  "competidores": [
   {"nombre": "Pro Medicus (Visage)", "pais": "Australia", "ticker": "PME", "ingresos": 1821, "cuota_pct": None, "margen_ebit_pct": 74.9, "comentario": "PACS en la nube para grandes redes de EE. UU., cobra por estudio; 261,7 M AUD de ventas en FY2026 (a 0,1437 AUD/SEK) [5]."},
   {"nombre": "Agfa HealthCare IT", "pais": "Bélgica", "ticker": "AGFB", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": 11.2, "comentario": "Enterprise Imaging; pedidos de nube +38 % en 2025 [6]."},
   {"nombre": "GE HealthCare (con Intelerad)", "pais": "EE. UU.", "ticker": "GEHC", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Compró Intelerad (≈270 M USD de ventas, ~90 % recurrentes) en mar-2026 [4]."},
   {"nombre": "Philips (Enterprise Imaging)", "pais": "Países Bajos", "ticker": "PHIA", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Proveedor histórico de PACS en EE. UU. y Europa [3]."},
   {"nombre": "Fujifilm (Synapse)", "pais": "Japón", "ticker": "4901", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Proveedor histórico de PACS en EE. UU. [3]."}
  ],
  "foso": {"veredicto": "Estrecho", "tendencia": "Estable", "fuentes": [
   {"fuente": "Efectos de red", "puntuacion": 1, "evidencia": "Poco efecto de red; las referencias clínicas ayudan a ganar concursos."},
   {"fuente": "Costes de cambio", "puntuacion": 4, "evidencia": "Migrar el archivo de imagen de una región y formar a los radiólogos lleva años; contratos de 5-10 años y 69 % de ingresos recurrentes [7]."},
   {"fuente": "Intangibles (marca, patentes, licencias)", "puntuacion": 3, "evidencia": "Once años como proveedor mejor valorado por los clientes (KLAS) [8]; homologaciones de la OTAN en cifrado [9]."},
   {"fuente": "Ventaja en costes", "puntuacion": 2, "evidencia": "Margen EBIT del 23,1 % en imagen, el doble que Agfa (11,2 %) pero a un tercio del de Pro Medicus (74,9 %) [5, 6, 7]."},
   {"fuente": "Escala eficiente", "puntuacion": 2, "evidencia": "Mercado de pocos proveedores por región, pero GE, Philips y Fujifilm son mucho más grandes [3, 4]."}
  ]},
  "amenazas": "La principal es que los grandes fabricantes (GE con Intelerad, Philips) empaqueten el PACS en la nube con sus equipos y aprieten el precio en las renovaciones de 2027-2030 [4]. La segunda, que Pro Medicus siga ganando las grandes redes de EE. UU., el mercado donde Sectra quiere crecer [5]. La tercera, la IA: un visor más barato o integrado en la historia clínica. Probabilidad media en cinco años; el coste de cambio protege la base instalada.",
  "confianza": "Media"
 },
 "esg": {
  "calificaciones": [],
  "materialidad": "Lo material es la ciberseguridad y la protección de datos de salud: un incidente en la nube de Sectra dañaría a la vez el negocio de imagen y la credibilidad del de cifrado [7]. El segundo asunto es el capital humano: el coste es casi todo personal y la empresa dice invertir en atraer y retener técnicos [7].",
  "controversias": "No se han encontrado sanciones ni incidentes en los últimos tres años en las fuentes leídas. El único litigio relevante, de patentes en comunicaciones seguras, se cerró a favor de Sectra en FY2025 (110 M) [12].",
  "confianza": "Baja"
 },
 "fuentes": fB,
 "huecos": [
  {"seccion": "competencia", "campo": "cuota_pct", "tipo": "Núcleo", "intentos": "1) informe de cierre FY2026; 2) Signify y Arizton (sin cuotas por proveedor gratis); 3) KLAS (solo satisfacción)", "decision": "Omitido"},
  {"seccion": "sector", "campo": "cr5_pct", "tipo": "Complemento", "intentos": "1) Signify; 2) Arizton; 3) prensa sectorial", "decision": "Omitido"},
  {"seccion": "esg", "campo": "calificaciones", "tipo": "Complemento", "intentos": "1) informe de sostenibilidad; 2) MSCI/Sustainalytics; 3) prensa", "decision": "Omitido"}
 ]
}
guardar('B', B)

# ---------------- C. Equipo y gobierno ----------------
fC = [
 {"id": 1, "titulo": "Why invest in Sectra: shareholders (a 30-abr-2026)", "editor": "Sectra AB", "tipo": "Primaria", "fecha": "2026-04-30", "url": "https://investor.sectra.com/shareholders"},
 {"id": 2, "titulo": "Executive management", "editor": "Sectra AB", "tipo": "Primaria", "fecha": "2026-09", "url": "https://investor.sectra.com/governance/executive-management/"},
 {"id": 3, "titulo": "Report from Sectra's 2026 Annual General Meeting", "editor": "Sectra AB", "tipo": "Primaria", "fecha": "2026-09", "url": "https://investor.sectra.com/news-and-press-releases/news-item/93FEE2DD92012B71"},
 {"id": 4, "titulo": "Sectra corporate governance report (cláusula de tanteo de las acciones A)", "editor": "Sectra AB", "tipo": "Primaria", "fecha": "2017-06-29", "url": "https://investor.sectra.com/170627_sectra_corporate_governance_report_june_29_2017"},
 {"id": 5, "titulo": "Sectra's year-end report 2025/2026", "editor": "Sectra AB (Cision)", "tipo": "Primaria", "fecha": "2026-06-05", "url": "https://mb.cision.com/Main/1263/4358145/4135325.pdf"},
 {"id": 6, "titulo": "Sectras VD vill ”bli som Apple” – och förvånas över att aktien rasar", "editor": "Affärsvärlden", "tipo": "Prensa", "fecha": "2026-03", "url": "https://www.affarsvarlden.se/artikel/sectras-vd-vill-bli-som-apple-och-forvanas-over-att-aktien-rasar"},
]
C = {
 "directivos": {
  "equipo": [
   {"nombre": "Torbjörn Kronander", "cargo": "Primer ejecutivo y consejero; cofundador", "desde": None, "participacion_pct": 8.0, "trayectoria": "Cofundador de Sectra en 1978 a partir de la investigación en Linköping. Bajo su mando las ventas pasaron de 1.949 M (FY2022) a 3.541,7 M (FY2026) sin deuda ni compras relevantes [1, 2, 5]."},
   {"nombre": "Jan-Olof Brüer", "cargo": "Presidente del consejo; cofundador", "desde": None, "participacion_pct": 7.9, "trayectoria": "Cofundador y presidente, reelegido en la junta de 2026; comparte con Kronander la sociedad Shannon AB (10,7 % de los votos) [1, 3]."}
  ],
  "historial_guidance": [],
  "comentario": "Equipo de fundadores con 40 años en la empresa y alineado como accionista (cada uno ~8 % del capital). La credibilidad descansa en el historial de crecimiento sin sorpresas contables, no en guías: Sectra no publica previsiones anuales. El riesgo es la sucesión: el primer ejecutivo es cofundador y la junta de 2026 metió en el consejo a Joel Kronander y Michael Brüer, de la familia de los fundadores [3]. En marzo de 2026 el primer ejecutivo dijo a la prensa querer «ser como Apple» y mostró sorpresa por la caída de la acción [6].",
  "confianza": "Media"
 },
 "gobierno": {
  "consejo": [
   {"nombre": "Jan-Olof Brüer", "cargo": "Presidente", "tipo": "Dominical", "desde": None, "comisiones": None},
   {"nombre": "Torbjörn Kronander", "cargo": "Consejero y primer ejecutivo", "tipo": "Ejecutivo", "desde": None, "comisiones": None},
   {"nombre": "Joel Kronander", "cargo": "Consejero (antes suplente)", "tipo": "Dominical", "desde": "2026", "comisiones": None},
   {"nombre": "Michael Brüer", "cargo": "Consejero (antes suplente)", "tipo": "Dominical", "desde": "2026", "comisiones": None}
  ],
  "presidente_ceo_separados": True, "presidente_ejecutivo": False, "consejero_coordinador": None, "una_accion_un_voto": False,
  "operaciones_vinculadas_relevantes": False, "variable_ligado_rentabilidad": None, "auditoria_independiente": None, "insiders_sin_operaciones": None,
  "accionista_control": True, "presidente_vinculado_control": True, "cambios_cupula_24m": 0,
  "voto_remuneracion_pct": None, "voto_remuneracion_contra_pct": None, "voto_remuneracion_contra_libre_pct": None, "voto_cupula_pct": None,
  "remuneracion_ceo": None,
  "remuneracion": "Plan de incentivos a largo plazo en acciones B, cubierto con recompra autorizada por la junta de 2026; coste de 24 M en el 1T FY2027 (36 M un año antes) [3, 5]. No se pudieron leer las métricas ni la remuneración del primer ejecutivo.",
  "accionistas": [
   {"nombre": "Torbjörn Kronander", "pct": 8.0, "tipo": "Fundador (11,7 % de los votos)", "variacion": "Sin cambios relevantes conocidos"},
   {"nombre": "Jan-Olof Brüer", "pct": 7.9, "tipo": "Fundador (11,6 % de los votos)", "variacion": "Sin cambios relevantes conocidos"},
   {"nombre": "Frithjof Qvigstad", "pct": 5.6, "tipo": "Cofundador (7,2 % de los votos)", "variacion": "n.d."},
   {"nombre": "Shannon AB (Kronander y Brüer)", "pct": 2.8, "tipo": "Sociedad de los fundadores (10,7 % de los votos)", "variacion": "n.d."}
  ],
  "insiders": [],
  "control_y_defensas": "Dos clases: las acciones A tienen diez votos y están en manos de los fundadores, con cláusula de tanteo estatutaria [4]. Kronander, Brüer y su sociedad Shannon suman el 18,7 % del capital y el 34,0 % de los votos; con Qvigstad, el 41 % [1]. Controlan de hecho la junta y el nombramiento del consejo, que en 2026 incorporó a dos familiares [3]. No se han detectado operaciones vinculadas relevantes.",
  "alertas": ["Consejo con familiares de los fundadores incorporados en 2026 (Joel Kronander y Michael Brüer) [3].", "Sucesión del primer ejecutivo cofundador sin plan público."],
  "confianza": "Media"
 },
 "fuentes": fC,
 "huecos": [
  {"seccion": "gobierno", "campo": "remuneracion_ceo, votos de la junta y comisiones", "tipo": "Núcleo", "intentos": "1) informe de remuneraciones 2025/26 (no accesible); 2) acta de la junta de 2026 (solo nota de prensa); 3) prensa sueca", "decision": "Omitido"},
  {"seccion": "gobierno", "campo": "insiders", "tipo": "Complemento", "intentos": "1) registro de la Finansinspektionen (no accesible); 2) Affärsvärlden; 3) búsqueda «Sectra insynshandel»", "decision": "Omitido"},
  {"seccion": "directivos", "campo": "director financiero e historial de guía", "tipo": "Núcleo", "intentos": "1) página de dirección; 2) informe anual; 3) prensa", "decision": "Omitido (Sectra no publica guía anual)"}
 ]
}
guardar('C', C)

# ---------------- D. Mercado ----------------
fD = [
 {"id": 1, "titulo": "Sectra AB: Financial Data Forecasts Estimates (cierre del 9-oct-2026, 310,20 SEK)", "editor": "MarketScreener", "tipo": "Datos de mercado", "fecha": "2026-10-12", "url": "https://www.marketscreener.com/quote/stock/SECTRA-AB-60037704/finances/"},
 {"id": 2, "titulo": "Sectra AB: Valuation Ratios, Analysts' Forecasts", "editor": "MarketScreener", "tipo": "Datos de mercado", "fecha": "2026-10", "url": "https://www.marketscreener.com/quote/stock/SECTRA-AB-128528588/valuation/"},
 {"id": 3, "titulo": "Sectra Ab (publ): previsión y cotización (cierre del 9-oct-2026)", "editor": "StockInvest.us", "tipo": "Datos de mercado", "fecha": "2026-10-10", "url": "https://stockinvest.us/stock/SECT-B.ST"},
 {"id": 4, "titulo": "Marknadsnyheter 31 augusti 2026 (SEB höjer riktkursen för Sectra till 370 kr)", "editor": "MarketMate", "tipo": "Prensa", "fecha": "2026-08-31", "url": "https://www.marketmate.se/?p=114293"},
 {"id": 5, "titulo": "Sectra B: bolagssida (DNB Carnegie 340 kr, rapportdatum)", "editor": "Affärsvärlden", "tipo": "Prensa", "fecha": "2026-09", "url": "https://www.affarsvarlden.se/aktie/sectra-b"},
 {"id": 6, "titulo": "Evolution of the Average Target: Sectra AB", "editor": "MarketScreener", "tipo": "Datos de mercado", "fecha": "2026-10", "url": "https://www.marketscreener.com/quote/stock/SECTRA-AB-172175613/consensus/"},
 {"id": 7, "titulo": "Veeva Systems: Financial Data Forecasts Estimates", "editor": "MarketScreener", "tipo": "Datos de mercado", "fecha": "2026-10-12", "url": "https://www.marketscreener.com/quote/stock/VEEVA-SYSTEMS-INC-14551091/finances/"},
 {"id": 8, "titulo": "Doximity: Financial Data Forecasts Estimates", "editor": "MarketScreener", "tipo": "Datos de mercado", "fecha": "2026-10-12", "url": "https://www.marketscreener.com/quote/stock/DOXIMITY-INC-124007887/finances/"},
 {"id": 9, "titulo": "Craneware: Financial Data Forecasts Estimates", "editor": "MarketScreener", "tipo": "Datos de mercado", "fecha": "2026-10-12", "url": "https://www.marketscreener.com/quote/stock/CRANEWARE-PLC-4007384/finances/"},
 {"id": 10, "titulo": "WiseTech Global: Financial Data Forecasts Estimates", "editor": "MarketScreener", "tipo": "Datos de mercado", "fecha": "2026-10-12", "url": "https://www.marketscreener.com/quote/stock/WISETECH-GLOBAL-LIMITED-27114123/finances/"},
 {"id": 11, "titulo": "Xero: Financial Data Forecasts Estimates", "editor": "MarketScreener", "tipo": "Datos de mercado", "fecha": "2026-10-12", "url": "https://www.marketscreener.com/quote/stock/XERO-LIMITED-11900043/finances/"},
 {"id": 12, "titulo": "Technology One: Financial Data Forecasts Estimates", "editor": "MarketScreener", "tipo": "Datos de mercado", "fecha": "2026-10-12", "url": "https://www.marketscreener.com/quote/stock/TECHNOLOGY-ONE-LIMITED-6491442/finances/"},
 {"id": 13, "titulo": "Nemetschek: Financial Data Forecasts Estimates", "editor": "MarketScreener", "tipo": "Datos de mercado", "fecha": "2026-10-12", "url": "https://www.marketscreener.com/quote/stock/NEMETSCHEK-SE-436349/finances/"},
 {"id": 14, "titulo": "Pro Medicus: informe de análisis del 12-oct-2026 (múltiplos al cierre del 12-oct)", "editor": "Análisis propio del repo (datos de MarketScreener y ASX)", "tipo": "Datos de mercado", "fecha": "2026-10-12", "url": "https://github.com/HotisS/analisis-inversion/tree/main/informes/pro-medicus-2026-10-12"},
 {"id": 15, "titulo": "Euro foreign exchange reference rates (9-oct-2026)", "editor": "Banco Central Europeo", "tipo": "Primaria", "fecha": "2026-10-09", "url": "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"},
 {"id": 16, "titulo": "Microsoft accelerates industry cloud strategy for healthcare with the acquisition of Nuance", "editor": "Microsoft", "tipo": "Primaria", "fecha": "2021-04-12", "url": "https://news.microsoft.com/2021/04/12/microsoft-accelerates-industry-cloud-strategy-for-healthcare-with-the-acquisition-of-nuance/"},
 {"id": 17, "titulo": "Inovalon to be acquired by Nordic Capital (8-K)", "editor": "Inovalon / SEC EDGAR", "tipo": "Primaria", "fecha": "2021-08-19", "url": "https://www.sec.gov/Archives/edgar/data/1619954/000161995421000116/ex-991x08192021.htm"},
 {"id": 18, "titulo": "Oracle to acquire Cerner (8-K)", "editor": "Oracle / SEC EDGAR", "tipo": "Primaria", "fecha": "2021-12-20", "url": "https://www.sec.gov/Archives/edgar/data/1341439/000119312521362532/d276733dex991.htm"},
 {"id": 19, "titulo": "Volpara enters into Scheme Implementation Agreement with Lunit", "editor": "Volpara (ASX)", "tipo": "Primaria", "fecha": "2023-12-14", "url": "https://announcements.asx.com.au/asxpdf/20231214/pdf/05yjxz43x7cx9d.pdf"},
 {"id": 20, "titulo": "GE HealthCare completes Intelerad acquisition", "editor": "GE HealthCare (BioSpace)", "tipo": "Primaria", "fecha": "2026-03-18", "url": "https://www.biospace.com/press-releases/ge-healthcare-completes-intelerad-acquisition-accelerating-shift-to-cloud-first-enterprise-solutions-to-deliver-precision-care"},
 {"id": 21, "titulo": "Sweden 10Y Bond Yield Hits 32-month High", "editor": "Trading Economics", "tipo": "Datos de mercado", "fecha": "2026-07-21", "url": "https://tradingeconomics.com/sweden/government-bond-yield/news/568580"},
 {"id": 22, "titulo": "Implied ERP by month (ERPbymonth.xlsx), oct-2026", "editor": "Aswath Damodaran (NYU Stern)", "tipo": "Datos de mercado", "fecha": "2026-10", "url": "https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx"},
 {"id": 23, "titulo": "Sectra (OSTO:SECT B) Stock Price / 52-week range", "editor": "ChartMill", "tipo": "Datos de mercado", "fecha": "2026-10-01", "url": "https://www.chartmill.com/stock/quote/SECTB.ST/profile"},
 {"id": 24, "titulo": "Sectra Aktie: Kursziel und Dividende (ISIN SE0022419784)", "editor": "aktien.guide", "tipo": "Datos de mercado", "fecha": "2026-07", "url": "https://aktien.guide/kursziel/Sectra-SE0022419784"},
 {"id": 25, "titulo": "Sectra: förväntad vinst och P/E (Aktiespararna sätter avvakta)", "editor": "Placera (Finwire)", "tipo": "Prensa", "fecha": "2026-09-02", "url": "https://www.placera.se/telegram/sectra-aktiespararna-satter-avvakta-pa-sectra--ser-begransad-uppsida-20260902"},
 {"id": 26, "titulo": "Martin Blomgren: Sectra imponerar men svårsmält värdering", "editor": "EFN", "tipo": "Prensa", "fecha": "2026-06", "url": "https://efn.se/martin-blomgren-sectra-imponerar-men-svarsmalt-vardering"},
]
X = 1 / 0.1437  # SEK por AUD (BCE, 9-oct-2026, vía el informe de Pro Medicus)
def comp(n, t, p, cap_aud, evv, el, en, per, g, m, roic, dn, fcf):
    return {"nombre": n, "ticker": t, "pais": p, "capitalizacion": round(cap_aud * X), "ev_ventas": evv, "ev_ebitda_ltm": el, "ev_ebitda_ntm": en, "per_ntm": per, "crecimiento_pct": g, "margen_ebitda_pct": m, "roic_pct": roic, "dn_ebitda": dn, "fcf_yield_pct": fcf}
Dn = {
 "identificacion": {
  "nombre": "Sectra AB (publ)", "nombre_corto": "Sectra", "ticker": "SECT B", "isin": "SE0022419784", "mercado": "Nasdaq Stockholm (Large Cap)", "indice_referencia": "OMX Stockholm 30",
  "pais": "Suecia", "pais_iso": "SE", "sector": "Salud", "industria": "Tecnología sanitaria (software de imagen médica)", "sede": "Linköping (Suecia)", "fundacion": "1978", "empleados": None, "web": "sectra.com",
  "precio": 310.20, "fecha_precio": "2026-10-09", "acciones": 192.6, "capitalizacion_publicada": 59736, "free_float_pct": None,
  "max_52s": 343.0, "min_52s": 173.3, "volumen_medio_diario": None, "proximos_resultados": "2026-11-25"
 },
 "consenso": {
  "guidance": "Sectra no publica previsiones anuales. Sus objetivos financieros no se pudieron leer completos en las fuentes accesibles. En el 1T FY2027 (4-sep-2026) la dirección dijo que seguirá invirtiendo en personas, tecnología y seguridad aunque pese en la rentabilidad a corto plazo, y que el paso a la suscripción sostendrá los ingresos recurrentes.",
  "estimaciones": [
   {"periodo": "FY2027e", "ingresos": 4165, "ebitda": None, "ebit": 931.5, "bpa": 3.88, "dpa": None, "fuente": "MarketScreener, 3 analistas [2]"},
   {"periodo": "FY2028e", "ingresos": 4840, "ebitda": None, "ebit": 1135, "bpa": 4.48, "dpa": None, "fuente": "MarketScreener, 3 analistas [2]"}
  ],
  "recomendaciones": {"n_analistas": 3, "comprar": 3, "mantener": 0, "vender": 0, "po_medio": 340, "po_min": 340, "po_max": 370},
  "revisiones": "Al alza tras el 1T: SEB subió el objetivo de 340 a 370 SEK (31-ago-2026) y DNB Carnegie de 330 a 340 (1-sep-2026), los dos con Comprar [4, 5]. El objetivo medio de MarketScreener ronda los 340 SEK con tres analistas [1, 6]. Solo hay una fuente con estimaciones completas (MarketScreener, con dos tablas que difieren un 10 % en el resultado operativo de FY2027: 831,5 frente a 931,5 M) [1, 2]; se usa la más reciente.",
  "base_ebitda": "NIIF", "ajuste_ebitda_pct_ventas": None,
  "confianza": "Baja"
 },
 "comparables": {
  "criterio": None,
  "empresas": [
   comp("Pro Medicus", "PME", "AU", 17622, 66.04, 84.6, 60.5, 87.0, 38.2, 78.0, 110.5, -1.2, 0.7),
   comp("Veeva Systems", "VEEV", "US", 70071, 11.96, 26.3, 23.3, 41.7, 13.1, 45.6, None, -4.08, 3.2),
   comp("Doximity", "DOCS", "US", 8579, 7.91, 15.5, 15.5, 40.3, 5.9, 55.5, None, -2.22, 4.9),
   comp("Craneware", "CRW", "GB", 711, 2.44, 7.8, 9.7, 51.5, -7.5, 32.6, None, -0.15, 5.2),
   comp("WiseTech Global", "WTC", "AU", 11482, 6.92, 16.2, 12.9, 25.4, 8.0, 40.0, None, 3.04, 4.6),
   comp("Xero", "XRO", "NZ", 10695, 4.16, 16.2, 13.0, 42.1, 25.8, 27.5, None, 0.23, 3.7),
   comp("TechnologyOne", "TNE", "AU", 10248, 14.56, 32.7, 27.7, 51.2, 15.5, 44.4, None, -1.01, 1.6),
   comp("Nemetschek", "NEM", "DE", 12479, 5.78, 18.6, 14.7, 26.6, 20.9, 31.2, None, 0.36, 4.9),
  ],
  "comentario": None,
  "confianza": "Media"
 },
 "transacciones": {
  "operaciones": [
   {"fecha": "2021-04", "objetivo": "Nuance Communications (IA clínica y dictado radiológico)", "comprador": "Microsoft", "ev": round(28220 * X), "ev_ventas": 15.3, "ev_ebitda": None, "prima_pct": 23, "excluir": False, "comentario": "19.700 M USD con la deuda neta [16]."},
   {"fecha": "2021-08", "objetivo": "Inovalon (datos y software sanitario)", "comprador": "Nordic Capital e Insight Partners", "ev": round(10457 * X), "ev_ventas": 10.9, "ev_ebitda": 39.1, "prima_pct": 25.3, "excluir": False, "comentario": "~7.300 M USD [17]."},
   {"fecha": "2021-12", "objetivo": "Cerner (historia clínica electrónica)", "comprador": "Oracle", "ev": round(42050 * X), "ev_ventas": 5.3, "ev_ebitda": 18.2, "prima_pct": None, "excluir": False, "comentario": "Estimación del valor empresa con su deuda [18]."},
   {"fecha": "2023-12", "objetivo": "Volpara Health (IA para imagen mamaria)", "comprador": "Lunit", "ev": round(285.5 * X), "ev_ventas": 7.5, "ev_ebitda": None, "prima_pct": 47.4, "excluir": False, "comentario": "Con pérdidas operativas [19]."},
   {"fecha": "2026-03", "objetivo": "Intelerad (PACS en la nube)", "comprador": "GE HealthCare", "ev": round(3295 * X), "ev_ventas": 8.5, "ev_ebitda": None, "prima_pct": None, "excluir": False, "comentario": "2.300 M USD por ~270 M USD de ventas, ~90 % recurrentes, margen EBITDA >30 % [20]. La más comparable."}
  ],
  "comentario": "Las operaciones de software sanitario se han pagado a 5-15 veces las ventas; la más parecida, Intelerad, a 8,5 veces, con un margen EBITDA superior al 30 % [20]. Sectra cotiza a más de 15 veces sus ventas de los últimos 12 meses, por encima de cualquier precio de control pagado. Una OPA es poco probable: los fundadores tienen el 34 % de los votos con acciones A de diez votos.",
  "confianza": "Media"
 },
 "notas_integrador": [
  "Comparables tomados del informe de Pro Medicus (MarketScreener al 12-oct-2026, 3 días antes), capitalizaciones pasadas de AUD a SEK con 1 SEK = 0,1437 AUD (BCE del 9-oct) [14, 15]. Los múltiplos no dependen del tipo. Pro Medicus: múltiplos del motor de su informe; crecimiento = ingresos NTM 362 / LTM 262 − 1.",
  "Consenso de Sectra en el informe de Pro Medicus: PER NTM 72,5x y EV/EBITDA NTM 49,9x a 310,20 SEK; margen EBITDA 23,5 %; ROE 27,8 % [1].",
  "Precio: 310,20 SEK, cierre del 9-oct-2026 (MarketScreener y StockInvest); no se encontró un cierre posterior verificable [1, 3]."
 ],
 "fuentes": fD,
 "huecos": [
  {"seccion": "bolsa", "campo": "sección entera (rentabilidades, beta, volatilidad, caída máxima)", "tipo": "Complemento", "intentos": "1) herramientas/bolsa.mjs (sin red a Yahoo); 2) búsqueda de históricos en Nasdaq y Börsdata; 3) agregadores sin series fechadas", "decision": "Omitido"},
  {"seccion": "multiplos_historicos", "campo": "precio de cierre de cada ejercicio (30 de abril)", "tipo": "Complemento", "intentos": "1) bolsa.mjs; 2) informe anual («börskurs vid årets slut»); 3) Yahoo, TipRanks y finanzen.net sin fechas de abril", "decision": "Omitido"},
  {"seccion": "identificacion", "campo": "precio a la fecha de corte", "tipo": "Núcleo", "intentos": "1) bolsa.mjs; 2) Nordnet y Affärsvärlden (sin dato en la búsqueda); 3) StockInvest y MarketScreener: cierre del 9-oct", "decision": "Calculado y marcado como estimación (cierre del 9-oct)"}
 ]
}
guardar('D', Dn)

# ---------------- E. Sentimiento ----------------
fE = [
 {"id": 1, "titulo": "Martin Blomgren: Sectra imponerar men svårsmält värdering", "editor": "EFN", "tipo": "Prensa", "fecha": "2026-06", "url": "https://efn.se/martin-blomgren-sectra-imponerar-men-svarsmalt-vardering"},
 {"id": 2, "titulo": "Peter Hedlund: Sectra är ett fint bolag men en dyr aktie", "editor": "EFN", "tipo": "Prensa", "fecha": "2026", "url": "https://efn.se/peter-hedlund-sectra-ar-ett-fint-bolag-men-en-dyr-aktie"},
 {"id": 3, "titulo": "Aktiespararna sätter avvakta på Sectra – ser begränsad uppsida", "editor": "Placera (Finwire)", "tipo": "Prensa", "fecha": "2026-09-02", "url": "https://www.placera.se/telegram/sectra-aktiespararna-satter-avvakta-pa-sectra--ser-begransad-uppsida-20260902"},
 {"id": 4, "titulo": "Affärsvärlden lockas inte av Sectra, neutralt råd", "editor": "Placera (Finwire)", "tipo": "Prensa", "fecha": "2026-09-04", "url": "https://www.placera.se/telegram/sectra-affarsvarlden-lockas-inte-av-sectra-neutralt-rad-20260904"},
 {"id": 5, "titulo": "Sectra: comentario sobre la caída tras el aviso de margen (publicación de usuario)", "editor": "getquin", "tipo": "Foros y redes", "fecha": "2026-03", "url": "https://app.getquin.com/en/post/kTWRQqCsZR"},
 {"id": 6, "titulo": "Sectra: Transition to SaaS model promises long-term revenue stability (narrativas de la comunidad)", "editor": "Simply Wall St Community", "tipo": "Foros y redes", "fecha": "2026-09", "url": "https://simplywall.st/community/narratives/se/healthcare/sto-sect-b/sectra-shares/imaging-it-subscriptions-and-cloud-growth-fuel-profits-driving-expansion-in-healthcare-it"},
 {"id": 7, "titulo": "Sectra (OM:SECT B) approved a special dividend and posted strong earnings, is it too pricey?", "editor": "Simply Wall St (vía Webull)", "tipo": "Foros y redes", "fecha": "2026-09", "url": "https://www.webull.com/news/15548628484009984"},
 {"id": 8, "titulo": "Sectras VD vill ”bli som Apple” – och förvånas över att aktien rasar", "editor": "Affärsvärlden", "tipo": "Prensa", "fecha": "2026-03", "url": "https://www.affarsvarlden.se/artikel/sectras-vd-vill-bli-som-apple-och-forvanas-over-att-aktien-rasar"},
]
E = {
 "sentimiento": {
  "tono": "Dividido", "tendencia": "Mejora",
  "revisadas": [
   {"plataforma": "Placera / Aktiespararna (comentario a inversores particulares)", "fecha": "2026-09", "n_comentarios": 1, "tono": "Neutro", "resumen": "«Avvakta»: buen negocio pero con poco recorrido a 12 meses a 84 veces el beneficio de este año y 65 el del siguiente [3]."},
   {"plataforma": "Affärsvärlden (columna de inversión)", "fecha": "2026-09", "n_comentarios": 1, "tono": "Neutro", "resumen": "Consejo neutral tras el 1T: crecimiento y apalancamiento buenos, churn bajo, pero «seguimos desde la banda» por la valoración [4]."},
   {"plataforma": "EFN (columnas de opinión)", "fecha": "2026-06", "n_comentarios": 2, "tono": "Dividido", "resumen": "Historia atractiva (nube y ciberseguridad), pero un PER de alrededor de 100 durante años es difícil de digerir [1, 2]."},
   {"plataforma": "getquin (red social de inversores)", "fecha": "2026-03", "n_comentarios": 10, "tono": "Dividido", "resumen": "Tras caer más de un 50 % desde el máximo por el aviso de márgenes del paso al SaaS, unos ven entrada y otros siguen viendo una valoración «para la perfección» [5]."},
   {"plataforma": "Simply Wall St Community (narrativas)", "fecha": "2026-09", "n_comentarios": 10, "tono": "Positivo", "resumen": "La narrativa más seguida pone el valor razonable en 340 SEK, apoyada en la suscripción y la nube; varias advierten del PER de 90 frente a 52 de los pares suecos [6, 7]."}
  ],
  "temas": [
   {"tema": "Valoración (PER cercano a 100)", "postura": "Bajista", "peso": "Alto", "contraste": "Cierto: a 310,20 SEK el PER de los últimos 12 meses es de unas 97 veces (BPA de 3,21) y el de FY2027 de consenso, 80 [2]."},
   {"tema": "Nube y suscripción como motor", "postura": "Alcista", "peso": "Alto", "contraste": "Los ingresos recurrentes de nube crecen un 75 % y el margen ya se recupera (19,8 % en el 1T) [3, 4]."},
   {"tema": "Caída de los pedidos", "postura": "Bajista", "peso": "Medio", "contraste": "Dos trimestres seguidos con −46 %, pero contra comparables con pedidos gigantes; la cartera contratada sigue en 7.600 M."},
   {"tema": "Miedo a la IA en el software", "postura": "Bajista", "peso": "Medio", "contraste": "La caída de 2025-26 coincidió con el castigo general al software por la IA [1]; sin evidencia en las cuentas de Sectra."}
  ],
  "lectura": "El inversor particular sueco y la prensa de inversión coinciden con los datos en lo esencial: el negocio es bueno y la valoración, extrema. No hay euforia: Aktiespararna y Affärsvärlden recomiendan esperar justo cuando los tres bancos que la cubren dicen Comprar (340-370 SEK), así que el sentimiento particular va contra el de los analistas. El temor que más pesa (pedidos a la baja) es real pero ruidoso; el de la IA no se ve en las cifras. Ninguna cifra del informe sale de aquí.",
  "confianza": "Media"
 },
 "fuentes": fE,
 "huecos": [
  {"seccion": "sentimiento", "campo": "Reddit, Stocktwits y foro de Placera", "tipo": "Complemento", "intentos": "1) búsqueda de hilos en Reddit y Stocktwits; 2) Placera forum y Flashback; 3) Seeking Alpha", "decision": "Omitido: sin red para abrir los foros, solo resultados de búsqueda"}
 ]
}
guardar('E', E)
print('notas escritas')

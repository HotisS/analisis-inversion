# Construye las notas A-E de Engie (corte 2026-10-20) con los documentos de notas/docs y el XBRL de cuentas.mjs.
# Cada cifra lleva la fuente; lo que no cuadra va a null y a huecos.
import json, os
D = os.path.dirname(os.path.abspath(__file__))

def w(nombre, obj):
    with open(os.path.join(D, nombre), 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)

def F(i, titulo, editor, tipo, fecha, url):
    return {"id": i, "titulo": titulo, "editor": editor, "tipo": tipo, "fecha": fecha, "url": url}

def H(seccion, campo, tipo, intentos, decision):
    return {"seccion": seccion, "campo": campo, "tipo": tipo, "intentos": intentos, "decision": decision}

URD = {
 2025: "https://filings.xbrl.org/LAXUQCHT4FH58LRZDY46/2025-12-31/ESEF/FR/0/engie-2025-12-31-1-fr/reports/engie-2025-12-31-1-fr.xhtml",
 2024: "https://filings.xbrl.org/LAXUQCHT4FH58LRZDY46/2024-12-31/ESEF/FR/0/LAXUQCHT4FH58LRZDY46-2024-12-31-0-FR/reports/LAXUQCHT4FH58LRZDY46-2024-12-31-0-FR.xhtml",
 2023: "https://filings.xbrl.org/LAXUQCHT4FH58LRZDY46/2023-12-31/ESEF/FR/0/engie-2023-12-31-FR/reports/engie-2023-12-31-FR.xhtml",
 2022: "https://filings.xbrl.org/LAXUQCHT4FH58LRZDY46/2022-12-31/ESEF/FR/0/engie-2022-12-31-FR/reports/engie-2022-12-31-FR.xhtml",
 2021: "https://filings.xbrl.org/LAXUQCHT4FH58LRZDY46/2021-12-31/ESEF/FR/0/engie-2021-12-31AR/reports/engie-2021-12-31AR.xhtml",
}

# ======================= A. Cuentas =======================
fA = [
 F(1, "Document d'enregistrement universel 2025 (ESEF, francés): estados consolidados, segmentos, deuda, riesgos", "ENGIE", "Primaria", "2026-03-12", URD[2025]),
 F(2, "Rapport financier semestriel au 30 juin 2026 (depositado en la AMF)", "ENGIE / AMF", "Primaria", "2026-07-31", "https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2026/07/FCECO082884_20260731.pdf"),
 F(3, "H1 2026 results presentation", "ENGIE", "Primaria", "2026-07-31", "https://www.engie.com/app/uploads/2026/07/H1-2026-Presentation.pdf"),
 F(4, "H1 2026 results conference call transcript", "ENGIE", "Primaria", "2026-07-31", "https://www.engie.com/app/uploads/2026/07/ENGIE-1H26-Transcript.pdf"),
 F(5, "FY 2025 results press release", "ENGIE", "Primaria", "2026-02-25", "https://www.engie.com/app/uploads/2026/03/PR-ENGIE-FY-2025-VDEF.pdf"),
 F(6, "FY 2025 results, UKPN presentation & mid-term outlook", "ENGIE", "Primaria", "2026-02-25", "https://www.engie.com/sites/default/files/assets/documents/2026-03/FY%202025%20results%2C%20UKPN%20Presentation%20%26%20Mid%20term%20outllok%20-%20site%20web%20-%20vDEF.pdf"),
 F(7, "FY 2025 Databook", "ENGIE", "Primaria", "2026-02-25", "https://www.engie.com/app/uploads/2026/03/ENGIE-FY-2025-Databook_VDEF_0.pdf"),
 F(8, "2025 Management report and annual consolidated financial statements", "ENGIE", "Primaria", "2026-02-25", "https://www.engie.com/app/uploads/2026/03/2025-Management-report-and-annual-consolidated-financial-statements.pdf"),
 F(9, "FY 2025 results conference call transcript", "ENGIE", "Primaria", "2026-02-25", "https://www.engie.com/app/uploads/2026/03/ENGIE-FY-2025-Transcript.pdf"),
 F(10, "Document d'enregistrement universel 2024 (ESEF)", "ENGIE", "Primaria", "2025-03", URD[2024]),
 F(11, "Document d'enregistrement universel 2023 (ESEF)", "ENGIE", "Primaria", "2024-03", URD[2023]),
 F(12, "Document d'enregistrement universel 2022 (ESEF)", "ENGIE", "Primaria", "2023-03", URD[2022]),
 F(13, "Document d'enregistrement universel 2021 (ESEF)", "ENGIE", "Primaria", "2022-03", URD[2021]),
 F(14, "Informes anuales ESEF 2020-2025 en xBRL-JSON (cuentas.mjs, LEI LAXUQCHT4FH58LRZDY46)", "XBRL International (filings.xbrl.org)", "Primaria", "2026-10-20", "https://filings.xbrl.org/LAXUQCHT4FH58LRZDY46/"),
 F(15, "ENGIE H1 2026 results (comunicado)", "ENGIE Newsroom", "Primaria", "2026-07-31", "https://en.newsroom.engie.com/news/engie-h1-2026-results-d8cd5-314df.html"),
 F(16, "H1 2025 results presentation", "ENGIE", "Primaria", "2025-07-31", "https://www.engie.com/app/uploads/2026/03/H1-2025-Presentation.pdf"),
]

def C(p, ing, cv, ebitda, am, ebit, rf, bai, imp, mino, bn, gf, part, nr, bpa, dpa, acc):
    return {"periodo": p, "ingresos": ing, "coste_ventas": cv, "gastos_generales": None, "ebitda": ebitda, "amortizaciones": am,
            "ebit": ebit, "resultado_financiero": rf, "bai": bai, "impuestos": imp, "minoritarios": mino, "beneficio_neto": bn,
            "gastos_financieros": gf, "participadas_en_ebitda": part, "no_recurrentes_en_ebitda": nr, "bpa": bpa, "dpa": dpa,
            "dpa_extraordinario": 0, "acciones_diluidas": acc}

# ebit = «résultat des activités opérationnelles» publicado (XBRL); ebitda = ebit + amortizaciones;
# no_recurrentes = EBIT de la empresa (récurrent) − ebit publicado; participadas = parte recurrente de asociadas y negocios conjuntos.
cuenta = [
 C("2021", 57866, 38861, 11140, 4418, 6722, -1350, 5372, 1695, 97, 3661, 2061, 750, -577, 1.46, 0.85, 2419.4),
 C("2022", 93865, 74535, 5795, 4668, 1127, -3003, -1876, -83, 173, 216, 3700, 1076, 7918, 0.06, 1.40, 2420.0),
 C("2023", 82565, 56992, 11031, 4933, 6098, -2163, 3935, 1031, 695, 2208, 3340, 1088, 3986, 0.88, 1.43, 2421.4),
 C("2024", 73812, 49465, 14255, 5225, 9030, -1842, 7188, 2215, 867, 4106, 3845, 1062, 1311, 1.65, 1.48, 2436.0),
 C("2025", 71944, 49047, 13553, 5262, 8291, -1973, 6318, 1570, 921, 3827, 2994, 1008, 1180, 1.51, 1.35, 2443.0),
]

A = {
 "_estado": "completo (XBRL ESEF 2021-2025, URD 2025, informe semestral 1S26 de la AMF, presentaciones y databook)",
 "financieros": {
  "cuenta": cuenta,
  "ltm": {"periodo": "LTM jun-26", "fecha_fin": "2026-06-30", "ingresos": 70585, "ebitda": 13629, "ebit": 8554, "beneficio_neto": 4227,
          "bpa": 1.63, "dpa": 1.35, "dpa_extraordinario": 0, "fcf": None, "participadas_en_ebitda": 1052, "no_recurrentes_en_ebitda": 703},
  "cambios_perimetro": [
   {"periodo": "2022", "descripcion": "Venta de EQUANS a Bouygues (7.100 M de valor empresa): sale del perímetro como actividad interrumpida; +2.183 M de resultado de operaciones interrumpidas en el beneficio neto de 2022 [12]."},
   {"periodo": "2026", "descripcion": "Compra del 100 % de UK Power Networks (redes eléctricas de Londres, sureste y este de Inglaterra), anunciada el 25-feb y cerrada el 7-may-2026: 12.200 M de precio (10.600 M GBP) más ≈7.000 M de deuda asumida; base de activos regulada (RAV) de 11.400 M a junio; 180 M de EBIT en el 1S26 y, en año completo, ≈1.200 M de ventas y ≈250 M de beneficio neto [2, 3, 6]."},
   {"periodo": "2026", "descripcion": "Carta de intenciones del 30-abr-2026 para vender toda la actividad nuclear belga al Estado belga, con efecto neutro en valor según la empresa; la firma de las condiciones principales (Heads of Terms) se aplazó del 1-oct al 4-nov-2026 [2, 3]."},
  ],
  "comentario": "Las ventas siguen al precio del gas y la electricidad y no miden la actividad: 57.866 M en 2021, 93.865 M en 2022 con la crisis energética, 71.944 M en 2025 y 36.707 M en el 1S26 (−3,6 %) [14, 2]. Lo que mide la actividad es el EBIT recurrente de la empresa: 6.145 M (2021), 9.045 M (2022), 10.084 M (2023), 10.341 M (2024) y 9.471 M (2025), con 2022-2024 inflados por precios de pico [5, 7]. El EBIT del informe es el «résultat des activités opérationnelles» publicado (XBRL) y la diferencia con el recurrente se trata como no recurrente y se devuelve al EBITDA y al EBIT: valoración a mercado de derivados de materias primas (−7.918 M de efecto en 2022 por las coberturas), deterioros, reestructuraciones y plusvalías [12, 1]. La parte recurrente del resultado de asociadas y negocios conjuntos (750-1.088 M al año) se saca del EBITDA y del EBIT y se valora en el puente. La cuenta se presenta por naturaleza: en coste de ventas, las compras y consumos de energía. El beneficio neto incluye actividades interrumpidas en 2021 (+80 M) [13] y 2022 (+2.183 M, EQUANS), y el BPA descuenta los cupones de los híbridos (140 M en 2025) [1, 12].",
  "ajustes": "Engie publica un «résultat net récurrent part du Groupe» (NRIgs) que excluye la valoración a mercado de coberturas, deterioros, reestructuraciones y plusvalías: 3.158 M (2021), 5.510 M (2022), 5.366 M (2023), 5.531 M (2024) y 4.896 M (2025, 1,96 € por acción), y 2.955 M en el 1S26 (3.057 M en el 1S25) [5, 7, 2]. Es la base de su dividendo (65-75 % de pay-out, suelo de 1,10 €) y la base de BPA que usamos en el objetivo a 12 meses. Cuadre de 2025: EBITDA 14,7 mil M − amortización 5,3 = EBIT 9,5; − financiero recurrente 2,0; − impuestos recurrentes 1,6; − minoritarios y otros 0,9 = 4,9 mil M [6]. El LTM a junio de 2026 se calcula con 2025 + 1S26 − 1S25; el FCF de los últimos 12 meses queda sin dato porque los pagos de pasivos nucleares belgas (financiados con activos de Synatom) distorsionan el flujo operativo.",
  "confianza": "Alta",
 },
 "trimestres": {
  "items": [
   {"periodo": "1S25", "ingresos": 38066, "crecimiento_pct": None, "crecimiento_organico_pct": None, "ebitda": 8259, "margen_ebitda_pct": 21.7, "bpa": 1.16, "vs_consenso": None},
   {"periodo": "2S25", "ingresos": 33878, "crecimiento_pct": None, "crecimiento_organico_pct": None, "ebitda": 6474, "margen_ebitda_pct": 19.1, "bpa": 0.35, "vs_consenso": None},
   {"periodo": "1S26", "ingresos": 36707, "crecimiento_pct": -3.6, "crecimiento_organico_pct": None, "ebitda": 7858, "margen_ebitda_pct": 21.4, "bpa": 1.28, "vs_consenso": "EBIT sin nuclear de 5.263 M (+3,3 %) y guía de 2026 subida"},
  ],
  "ultima_presentacion": "El 31-jul-2026 Engie subió la guía de 2026: NRIgs de 4.900-5.500 M, EBIT sin nuclear de 9.200-10.200 M y EBITDA de 14.300-15.300 M, con un coste financiero recurrente de 2.300-2.500 M y una tasa impositiva recurrente del 18-22 % que ya incluye la sobretasa francesa a las grandes empresas [2, 3, 15]. El EBIT sin nuclear del 1S26 creció un 3,3 % (5.263 M) con 180 M de UKPN, mientras el NRIgs bajó a 2.955 M (3.057 M en el 1S25 [16]) por la salida del nuclear. La dirección destacó la liquidez de 20.900 M y la deuda económica de 4,2 veces el EBITDA tras UKPN [3, 4].",
  "confianza": "Alta",
 },
 "balance": {
  "historico": [
   {"periodo": "2021", "activo_total": 225333, "activo_corriente": 107915, "pasivo_corriente": 95019, "pasivo_total": 183353, "fondo_comercio": 12799, "intangibles": 6784, "inmovilizado_material": 51079, "existencias": 6175, "clientes": 32555, "proveedores": 32822, "activos_contrato": 8344, "pasivos_contrato": 2671, "caja": 13890, "deuda_financiera": 39005, "arrendamientos": 2043, "patrimonio_neto": 36994, "minoritarios": 4986, "reservas": 5238},
   {"periodo": "2022", "activo_total": 235490, "activo_corriente": 103969, "pasivo_corriente": 93778, "pasivo_total": 196205, "fondo_comercio": 12854, "intangibles": 7364, "inmovilizado_material": 55488, "existencias": 8145, "clientes": 31310, "proveedores": 39801, "activos_contrato": 12575, "pasivos_contrato": 3292, "caja": 15570, "deuda_financiera": 37716, "arrendamientos": 2875, "patrimonio_neto": 34253, "minoritarios": 5032, "reservas": 5036},
   {"periodo": "2023", "activo_total": 194640, "activo_corriente": 75617, "pasivo_corriente": 76027, "pasivo_total": 158916, "fondo_comercio": 12864, "intangibles": 8449, "inmovilizado_material": 57950, "existencias": 5343, "clientes": 20092, "proveedores": 22976, "activos_contrato": 9530, "pasivos_contrato": 3960, "caja": 16578, "deuda_financiera": 44140, "arrendamientos": 3147, "patrimonio_neto": 30057, "minoritarios": 5667, "reservas": 5198},
   {"periodo": "2024", "activo_total": 189544, "activo_corriente": 79359, "pasivo_corriente": 72884, "pasivo_total": 148086, "fondo_comercio": 13291, "intangibles": 7964, "inmovilizado_material": 64388, "existencias": 5061, "clientes": 16173, "proveedores": 19153, "activos_contrato": 9229, "pasivos_contrato": 3818, "caja": 16928, "deuda_financiera": 48264, "arrendamientos": 3743, "patrimonio_neto": 34556, "minoritarios": 6902, "reservas": 8937},
   {"periodo": "2025", "activo_total": 169249, "activo_corriente": 58394, "pasivo_corriente": 53830, "pasivo_total": 128419, "fondo_comercio": 13110, "intangibles": 7919, "inmovilizado_material": 65499, "existencias": 2852, "clientes": 13573, "proveedores": 17226, "activos_contrato": 8006, "pasivos_contrato": 3606, "caja": 14507, "deuda_financiera": 50894, "arrendamientos": 3674, "patrimonio_neto": 32951, "minoritarios": 7879, "reservas": 9455},
  ],
  "vencimientos": [
   {"anio": "2026", "importe": 780}, {"anio": "2027", "importe": 3354}, {"anio": "2028", "importe": 3184},
   {"anio": "2029", "importe": 3756}, {"anio": "2030", "importe": 3159}, {"anio": "2031+", "importe": 25686},
  ],
  "liquidez": "Liquidez de 20.900 M a junio de 2026 (caja de 13.537 M más líneas comprometidas) [2, 3]. Deuda financiera bruta de 69.425 M (55.188 M a largo y 14.237 M a corto) con 3.699 M de arrendamientos; deuda financiera neta de 54.922 M y deuda económica neta de 60.275 M (4,2 veces el EBITDA), frente a 38.902 M y 45.182 M (3,1 veces) a cierre de 2025: la diferencia es UKPN [2]. Vencimientos de bonos de 780 M en lo que queda de 2026 y ≈3.200-3.800 M al año en 2027-2030 [2].",
  "rating": "S&P BBB+ (estable), Moody's Baa1 (estable), Fitch BBB+ (estable) [3]",
  "coste_deuda_pct": 4.0,
  "vida_media_anios": 11.2,
  "otros_pasivos": "Híbridos perpetuos contabilizados en el patrimonio: 6.693 M a junio de 2026 tras emitir 2.300 M en abril y junio para UKPN [2]. Provisiones nucleares belgas de 9.399 M, cubiertas en parte por 6.679 M de activos dedicados (Synatom); desmantelamiento no nuclear de 1.659 M y pensiones netas de ≈974 M [2]. Todo ello está en la deuda económica de 60.275 M.",
  "comentario": "La deuda financiera (sin arrendamientos) subió de 39.005 M en 2021 a 50.894 M en 2025 con el plan de inversión en renovables y redes, y saltó a 64.760 M en junio de 2026 con UKPN (19.000 M entre precio y deuda asumida, financiados con 3.000 M de ampliación de capital a 28 €, 2.300 M de híbridos y deuda) [2, 14]. El 91 % de la deuda neta es a tipo fijo tras derivados, con un coste medio bruto del 4,0 % y una vida media de 11,2 años a cierre de 2025 [1]: la subida de la OAT afecta poco y despacio al coste financiero, sobre todo a la refinanciación de 3.000-4.000 M al año y a la deuda nueva del plan. El balance de 2021-2022 estaba inflado por los derivados de materias primas (activo total de 235.490 M en 2022).",
  "confianza": "Alta",
 },
 "flujos": {
  "historico": [
   {"periodo": "2021", "flujo_operativo": 7313, "capex": 5990, "pagos_arrendamientos": 560, "adquisiciones": 392, "desinversiones": 0, "dividendos": 1859, "recompras": None, "emision_acciones": None, "intereses_en_financiacion": 719},
   {"periodo": "2022", "flujo_operativo": 8586, "capex": 6379, "pagos_arrendamientos": 501, "adquisiciones": 289, "desinversiones": 6728, "dividendos": 2665, "recompras": None, "emision_acciones": None, "intereses_en_financiacion": 822},
   {"periodo": "2023", "flujo_operativo": 13117, "capex": 7328, "pagos_arrendamientos": 418, "adquisiciones": 1392, "desinversiones": 27, "dividendos": 4067, "recompras": None, "emision_acciones": None, "intereses_en_financiacion": 1058},
   {"periodo": "2024", "flujo_operativo": 13144, "capex": 9385, "pagos_arrendamientos": 461, "adquisiciones": 670, "desinversiones": 883, "dividendos": 4147, "recompras": 86, "emision_acciones": 1040, "intereses_en_financiacion": 1732},
   {"periodo": "2025", "flujo_operativo": -1476, "capex": 7267, "pagos_arrendamientos": 458, "adquisiciones": 653, "desinversiones": 1514, "dividendos": 4529, "recompras": 22, "emision_acciones": 367, "intereses_en_financiacion": 1512},
  ],
  "comentario": "El flujo operativo de 2025 (−1.476 M) es atípico: incluye el pago de 13.986 M de pasivos nucleares belgas al Estado (acuerdo de extensión de Doel 4 y Tihange 3 y traspaso de los residuos), financiado con activos de Synatom que entran en inversión (+8.523 M); el «cash flow from operations» que publica Engie sin ese efecto fue de 13.600 M [5, 1, 8]. En el 1S26 el flujo operativo fue de 7.133 M y la inversión de 3.145 M (sin UKPN) [2]. La inversión bruta del plan es de 34.000-38.000 M en 2026-2028 con ≈6.000 M de ventas de activos [6]. Los dividendos incluyen los pagados a minoritarios; las desinversiones de 2021 eran negativas en el XBRL (−173 M) y se dejan en 0.",
  "confianza": "Media",
 },
 "calidad": {
  "auditor": "Deloitte & Associés y EY & Autres",
  "anios_auditor": 18,
  "opinion": "Sin salvedades (2025) [1]",
  "comentario": "Los dos auditores lo son desde 2008 y la junta de 2026 votó su renovación [1]. La distancia entre el beneficio publicado y el recurrente es grande y de signo cambiante: la valoración a mercado de las coberturas de materias primas movió miles de millones en 2022-2023, y hay deterioros y plusvalías cada año; por eso el informe parte del EBIT recurrente [5, 12]. La conversión en caja está distorsionada en 2025 por el pago nuclear belga (financiado con activos dedicados) y en 2022 por las garantías de derivados.",
  "senales": [
   {"senal": "Valoración a mercado de coberturas de energía fuera del recurrente", "nivel": "Media", "comentario": "−7.918 M de diferencia entre EBIT recurrente y publicado en 2022 y +3.986 M en 2023: el beneficio publicado no sirve para medir la tendencia [12, 11]."},
   {"senal": "Pasivos nucleares belgas y su traspaso al Estado", "nivel": "Media", "comentario": "Provisiones de 9.399 M con 6.679 M de activos dedicados; la venta al Estado belga sigue sin firmar (Heads of Terms aplazados al 4-nov-2026) [2]."},
   {"senal": "Fondo de comercio provisional de UKPN", "nivel": "Baja", "comentario": "7.700 M de fondo de comercio provisional; el fondo de comercio total pasó de 13.110 M a 20.893 M en junio [2]."},
  ],
  "confianza": "Media",
 },
 "capital": {
  "politica": "Dividendo del 65-75 % del NRIgs con un suelo de 1,10 € por acción (1,35 € con cargo a 2025, 67 % de pay-out) [5]. Inversión bruta de 34.000-38.000 M en 2026-2028 en redes, renovables y almacenamiento, con ≈6.000 M de rotación de activos, y mantenimiento de un rating «strong investment grade» [6]. Sin recompras salvo las de cobertura de planes (110 M en el 1S26) [2].",
  "adquisiciones": [
   {"anio": "2026", "objetivo": "UK Power Networks (100 %)", "importe": 19200, "ev_ebitda": 8.8, "financiacion": "Ampliación acelerada de 3.000 M a 28 € (107,1 M de acciones), 2.300 M de híbridos y deuda", "resultado": "Cerrada el 7-may; 180 M de EBIT en el 1S26; el valor empresa es ≈10 veces el EBITDA de 2027 y ≈1,5 veces la RAV [2, 6]."},
   {"anio": "2022", "objetivo": "Venta de EQUANS a Bouygues", "importe": 7100, "ev_ebitda": None, "financiacion": "Venta", "resultado": "Salida de los servicios técnicos; +2.183 M de resultado de operaciones interrumpidas [12]."},
  ],
  "comentario": None,
  "confianza": "Alta",
 },
 "negocio": {
  "segmentos": [
   {"nombre": "Renovables y generación flexible (R&F Power)", "descripcion": "Renovables (eólica, solar, hidráulica), almacenamiento y centrales de gas flexibles en Europa, América y Oriente Medio.", "tipo_resultado": "EBIT", "historico": [{"periodo": "2024", "ingresos": 10398, "resultado": 3695}, {"periodo": "2025", "ingresos": 9860, "resultado": 3577}]},
   {"nombre": "Redes (Networks)", "descripcion": "Redes reguladas de gas en Francia (GRDF distribución, NaTran transporte, almacenamiento), redes eléctricas en Latinoamérica y, desde mayo de 2026, UKPN en el Reino Unido.", "tipo_resultado": "EBIT", "historico": [{"periodo": "2024", "ingresos": 7236, "resultado": 2430}, {"periodo": "2025", "ingresos": 7992, "resultado": 3054}]},
   {"nombre": "Infraestructuras energéticas locales (LEI)", "descripcion": "Redes de calor y frío, producción descentralizada y servicios energéticos para ciudades e industria.", "tipo_resultado": "EBIT", "historico": [{"periodo": "2024", "ingresos": 8900, "resultado": 491}, {"periodo": "2025", "ingresos": 8831, "resultado": 482}]},
   {"nombre": "Suministro y gestión de energía (SEM)", "descripcion": "Comercialización a hogares y empresas (sobre todo Francia y Bélgica) y gestión de la cartera de energía y trading.", "tipo_resultado": "EBIT", "historico": [{"periodo": "2024", "ingresos": 44717, "resultado": 3101}, {"periodo": "2025", "ingresos": 42495, "resultado": 2357}]},
   {"nombre": "Nuclear", "descripcion": "Nuclear belga (Doel 4 y Tihange 3 prolongadas), en proceso de venta al Estado belga.", "tipo_resultado": "EBIT", "historico": [{"periodo": "2024", "ingresos": 68, "resultado": 1448}, {"periodo": "2025", "ingresos": 539, "resultado": 714}]},
   {"nombre": "Otros", "descripcion": "Estructura central y otras actividades.", "tipo_resultado": "EBIT", "historico": [{"periodo": "2024", "ingresos": 2492, "resultado": -823}, {"periodo": "2025", "ingresos": 2226, "resultado": -714}]},
  ],
  "geografias": [
   {"nombre": "Francia", "peso_pct": 40.3},
   {"nombre": "Bélgica", "peso_pct": 11.2},
   {"nombre": "Resto de la UE", "peso_pct": 23.4},
   {"nombre": "Resto de Europa", "peso_pct": 6.5},
   {"nombre": "Norteamérica", "peso_pct": 8.1},
   {"nombre": "Sudamérica", "peso_pct": 6.4},
   {"nombre": "Asia, Oriente Medio y Oceanía", "peso_pct": 3.8},
   {"nombre": "África", "peso_pct": 0.4}
  ],
  "kpis": [
   {"kpi": "Peso de Francia en el EBIT sin nuclear", "valor_anterior": "45 % (2025: 3.941 de 8.757 M)", "valor_actual": "44,8 % (1S26: 2.356 de 5.263 M)", "variacion": "≈35 % en 2028 con UKPN", "comentario": "Francia es el 40,3 % de las ventas por destino y el 42,8 % del capital industrial empleado [1, 3, 6]."},
   {"kpi": "EBIT regulado o contratado a largo plazo", "valor_anterior": "42 % (2024)", "valor_actual": "55 % (2025)", "variacion": "67 % objetivo en 2028", "comentario": "Sube con UKPN y los contratos de renovables (PPA) [6, 9]."},
   {"kpi": "RAB de gas en Francia", "valor_anterior": "32.100 M (2025)", "valor_actual": "31.500 M (jun-26)", "variacion": "−2 %", "comentario": "GRDF 17.600 M, NaTran 9.200 M y almacenamiento 4.400 M; la RAB de gas francés deja de crecer [6, 3]."},
   {"kpi": "PPA con empresas tecnológicas (centros de datos)", "valor_anterior": None, "valor_actual": "7 GW firmados", "variacion": None, "comentario": "47 % del objetivo de 50 TWh de 2030 [3]."},
  ],
  "confianza": "Alta",
 },
 "fuentes": fA,
 "huecos": [
  H("financieros", "FCF de los últimos 12 meses", "Complemento", "1) Flujo del 1S26 [2]: incluye pagos nucleares; 2) databook FY25 [7]: sin LTM; 3) presentación 1S26 [3]: solo «cash flow from operations»", "Omitido"),
  H("negocio", "ingresos por geografía de 2021-2024 en el mismo criterio", "Complemento", "1) URD 2024 [10]; 2) databook [7]; 3) XBRL [14]: cambio de criterio de segmentos en 2024", "Omitido"),
 ],
}
w('A.json', A)

# ======================= B. Negocio y sector =======================
fB = [
 F(1, "Document d'enregistrement universel 2025: historia, estrategia, mercados y riesgos", "ENGIE", "Primaria", "2026-03-12", URD[2025]),
 F(2, "FY 2025 results, UKPN presentation & mid-term outlook", "ENGIE", "Primaria", "2026-02-25", "https://www.engie.com/sites/default/files/assets/documents/2026-03/FY%202025%20results%2C%20UKPN%20Presentation%20%26%20Mid%20term%20outllok%20-%20site%20web%20-%20vDEF.pdf"),
 F(3, "H1 2026 results presentation", "ENGIE", "Primaria", "2026-07-31", "https://www.engie.com/app/uploads/2026/07/H1-2026-Presentation.pdf"),
 F(4, "H1 2026 results conference call transcript", "ENGIE", "Primaria", "2026-07-31", "https://www.engie.com/app/uploads/2026/07/ENGIE-1H26-Transcript.pdf"),
 F(5, "Informe Iberdrola 2026-10-14 del repo (margen EBIT de 2025 de Iberdrola, de su nota de prensa de resultados)", "Iberdrola", "Primaria", "2026-02-25", "https://www.iberdrola.com/documents/20125/5739678/iberdrola-invierte-14460-millones-en-2025-y-aumenta-el-beneficio-neto-un-12-por-ciento.pdf"),
 F(6, "Engie : sous pression après un été pourtant solide", "ABC Bourse", "Prensa", "2026-09-30", "https://www.abcbourse.com/analyses/engie_sous_pression_apres_un_ete_pourtant_solide-7137"),
]
B = {
 "_estado": "completo (URD 2025 y presentaciones; sector con datos de la empresa y del regulador)",
 "historia": {
  "resumen": "Engie nace en 2008 de la fusión de Gaz de France y Suez (GDF Suez) y adopta el nombre Engie en 2015 [1]. Con Isabelle Kocher (2016-2020) y sobre todo con Catherine MacGregor (desde 2021) se desprende del carbón, de EQUANS (servicios, 2022) y de parte de la exploración y GNL, y se centra en renovables, generación flexible, redes e infraestructuras locales [1]. En 2025 cerró el acuerdo con Bélgica para prolongar diez años Doel 4 y Tihange 3 y traspasar los residuos nucleares, y en 2026 compró UK Power Networks y negocia vender todo el nuclear belga al Estado [1, 2, 3]. El Estado francés sigue siendo el primer accionista (22,6 % del capital).",
  "hitos": [
   {"anio": "2008", "hito": "Fusión de Gaz de France y Suez [1]."},
   {"anio": "2015", "hito": "Cambio de nombre a Engie y plan de salida del carbón [1]."},
   {"anio": "2021", "hito": "Catherine MacGregor, consejera delegada; venta de EQUANS anunciada [1]."},
   {"anio": "2022", "hito": "Crisis energética: beneficio recurrente récord (5.510 M) [1]."},
   {"anio": "2025", "hito": "Acuerdo nuclear con Bélgica: prolongación de Doel 4 y Tihange 3 y traspaso de los residuos por ≈15.000 M [1]."},
   {"anio": "2026", "hito": "Compra de UK Power Networks (19.000 M con deuda) y carta de intenciones para vender el nuclear belga al Estado [2, 3]."},
  ],
  "confianza": "Alta",
 },
 "negocio": {
  "descripcion": "Engie es una utility europea con cuatro negocios: renovables y generación flexible (3.577 M de EBIT en 2025), redes reguladas (3.054 M: gas en Francia y, desde 2026, electricidad en el Reino Unido), suministro y gestión de energía (2.357 M) e infraestructuras locales (482 M), más el nuclear belga en venta (714 M) [1, 2]. El 55 % del EBIT es regulado o contratado a largo plazo y la empresa quiere llegar al 67 % en 2028 [2].",
  "como_gana_dinero": "En redes cobra una retribución regulada sobre la base de activos (en Francia la fija la CRE: 4,0 % real sobre la RAB histórica de GRDF y 5,3 % sobre la nueva; en el Reino Unido, Ofgem) [2]. En renovables vende la energía con contratos a largo plazo (PPA) o a mercado; en generación flexible cobra por disponibilidad y por los precios de punta; en suministro gana un margen sobre la energía que vende a hogares y empresas, sobre todo en Francia y Bélgica [1].",
  "clientes": "Consumidores de gas de toda Francia (vía peajes de GRDF), unos 22 millones de contratos de suministro en Europa, industria, administraciones y grandes tecnológicas con PPA (7 GW firmados) [1, 3].",
  "geografias_criterio": "destino",
  "confianza": "Alta",
 },
 "sector": {
  "definicion": "Utilities integradas europeas con redes reguladas, renovables y comercialización. El mercado relevante es el de la inversión en redes y en generación baja en carbono en Europa, el Reino Unido, las Américas y Oriente Medio.",
  "tamano": None, "unidad_serie": None, "serie": [], "tcac_historico_pct": None, "tcac_previsto_pct": None, "cr5_pct": None,
  "estructura": "Moderadamente concentrada",
  "drivers": [
   {"driver": "Electrificación y centros de datos", "efecto": "+", "horizonte": "Estructural", "evidencia": "7 GW de PPA con tecnológicas y cartera de 7 GW para centros de datos [3]."},
   {"driver": "Tipos de interés", "efecto": "−", "horizonte": "Cíclico", "evidencia": "Sector intensivo en capital y deuda: la OAT a 10 años pasó del 3,85 % (media de julio) al 4,93 % el 19-oct [3]."},
   {"driver": "Declive del gas en Francia", "efecto": "−", "horizonte": "Estructural", "evidencia": "La RAB de gas francés baja de 32.100 a 31.500 M; la CRE estudia el futuro de las infraestructuras de gas hasta 2050 (informe de 1-jul-2026) [2, 3]."},
   {"driver": "Precios de la energía", "efecto": "+/−", "horizonte": "Cíclico", "evidencia": "Precios altos del gas en otoño de 2026 y volatilidad [6]."},
  ],
  "porter": [
   {"fuerza": "Rivalidad", "intensidad": 3, "justificacion": "En redes no hay competencia; en renovables y comercialización compite con EDF, TotalEnergies, Iberdrola, Enel y RWE."},
   {"fuerza": "Nuevos entrantes", "intensidad": 2, "justificacion": "Renovables abiertas a fondos de infraestructuras; redes con barreras regulatorias."},
   {"fuerza": "Sustitutos", "intensidad": 3, "justificacion": "Electrificación sustituye al gas en calefacción (bomba de calor), lo que amenaza el volumen de GRDF."},
   {"fuerza": "Poder de clientes", "intensidad": 2, "justificacion": "Hogares fragmentados; grandes tecnológicas negocian PPA."},
   {"fuerza": "Poder de proveedores", "intensidad": 3, "justificacion": "Fabricantes de turbinas, paneles y baterías concentrados; gas importado."},
  ],
  "ciclo": {"posicion": "Expansión", "comentario": "Ciclo inversor en redes y renovables; márgenes de generación y comercialización a la baja tras el pico de 2022-2024."},
  "regulacion": "Francia: CRE (tarifas de redes de gas por periodos de cuatro años; GRDF negociará en 2027 el periodo siguiente). Reino Unido: Ofgem (RIIO-ED2 hasta marzo de 2028). Bélgica: acuerdo nuclear con el Estado. UE: mercado eléctrico y objetivos de renovables [1, 2].",
  "tendencias": "Más peso de redes y contratos a largo plazo, rotación de activos para financiar el plan y almacenamiento con baterías; en Francia, presión fiscal sobre las grandes empresas y debate político sobre los precios de la energía de cara a las presidenciales de 2027.",
  "confianza": "Media",
 },
 "competencia": {
  "cuota_pct": None,
  "posicion": "Segunda utility francesa tras EDF; primer operador de redes de gas de Francia y, con UKPN, primera distribuidora eléctrica del Reino Unido por clientes [1, 2].",
  "competidores": [
   {"nombre": "EDF", "pais": "Francia", "ticker": None, "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "100 % del Estado; nuclear y redes eléctricas en Francia."},
   {"nombre": "Iberdrola", "pais": "España", "ticker": "IBE.MC", "ingresos": 44076, "cuota_pct": None, "margen_ebit_pct": 22.1, "comentario": "Redes en el Reino Unido, EE. UU., Brasil y España [5]."},
   {"nombre": "Enel", "pais": "Italia", "ticker": "ENEL.MI", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Integrada con redes en Italia, España y Latinoamérica."},
   {"nombre": "RWE", "pais": "Alemania", "ticker": "RWE.DE", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Renovables y generación flexible, sin redes."},
   {"nombre": "TotalEnergies", "pais": "Francia", "ticker": "TTE.PA", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": 11.7, "comentario": "Competidor en comercialización y renovables en Francia."},
  ],
  "foso": {
   "veredicto": "Estrecho", "tendencia": "Estable",
   "fuentes": [
    {"fuente": "Efectos de red", "puntuacion": 0, "evidencia": "No aplica."},
    {"fuente": "Costes de cambio", "puntuacion": 1, "evidencia": "Bajos en comercialización."},
    {"fuente": "Activos intangibles / licencias", "puntuacion": 3, "evidencia": "Concesiones de redes de gas en Francia y licencia de UKPN [1, 2]."},
    {"fuente": "Ventaja de costes", "puntuacion": 2, "evidencia": "Escala en renovables y en gestión de energía."},
    {"fuente": "Escala eficiente", "puntuacion": 2, "evidencia": "Monopolios naturales de redes."},
   ],
  },
  "amenazas": "El foso de las redes es regulatorio y lo fija el regulador; el del gas francés se erosiona con la electrificación. En comercialización y generación la ventaja es pequeña.",
  "confianza": "Media",
 },
 "esg": {
  "calificaciones": [
   {"agencia": "MSCI", "calificacion": "AA", "fecha": "2025"},
   {"agencia": "Sustainalytics", "calificacion": "21,8 (riesgo medio)", "fecha": "2025"},
   {"agencia": "S&P Global CSA", "calificacion": "81/100", "fecha": "2025"},
   {"agencia": "ISS ESG", "calificacion": "B- Prime", "fecha": "2025"},
   {"agencia": "CDP", "calificacion": "A-", "fecha": "2025"},
  ],
  "materialidad": "Los asuntos que más pesan en las cifras son: la transición del gas (la RAB de GRDF depende del volumen de gas a largo plazo y la CRE estudia escenarios hasta 2050), el ritmo de inversión en renovables y almacenamiento (la mitad del plan de 34.000-38.000 M) y los pasivos nucleares belgas, que la venta al Estado debe cerrar [1, 2, 3].",
  "controversias": "Litigio fiscal de UKPN con la autoridad británica (HMRC), con vista en el Upper Tribunal en noviembre de 2026; reclamaciones de Engie contra la tasa extraordinaria italiana a la energía de 2022 (308 M) [1, 2].",
  "confianza": "Media",
 },
 "fuentes": fB,
 "huecos": [
  H("sector", "tamaño del mercado, serie y CR5", "Núcleo", "1) URD 2025 [1]: sin tamaño; 2) presentaciones [2, 3]: sin serie; 3) búsqueda de Eurelectric/IEA: no abierta", "Omitido"),
  H("competencia", "cuotas de mercado y márgenes de competidores", "Complemento", "1) URD 2025 [1]; 2) informes del repo (solo Iberdrola y TotalEnergies); 3) MarketScreener: sin márgenes comparables", "Omitido"),
 ],
}
w('B.json', B)

# ======================= C. Directivos y gobierno =======================
fC = [
 F(1, "Document d'enregistrement universel 2025: gobierno, remuneración, accionariado", "ENGIE", "Primaria", "2026-03-12", URD[2025]),
 F(2, "Base BDIF de la AMF: declaraciones de operaciones de directivos de ENGIE (últimos 12 meses)", "AMF", "Primaria", "2026-10-20", "https://bdif.amf-france.org/back/api/v1/informations?RechercheTexte=ENGIE&TypesInformation=DD&From=0&Size=40"),
 F(3, "Rapport financier semestriel au 30 juin 2026 (capital y accionariado)", "ENGIE / AMF", "Primaria", "2026-07-31", "https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2026/07/FCECO082884_20260731.pdf"),
 F(4, "FY 2025 results press release (guía y cumplimiento)", "ENGIE", "Primaria", "2026-02-25", "https://www.engie.com/app/uploads/2026/03/PR-ENGIE-FY-2025-VDEF.pdf"),
 F(5, "Declaración de cruce de umbral del Estado francés (por debajo de un tercio de los votos, 4-mar-2026)", "AMF", "Primaria", "2026-03-23", "https://echanges.dila.gouv.fr/OPENDATA/AMF/307/8888/01/FC307620207_20260323.pdf"),
]
C_ = {
 "_estado": "completo (URD 2025 y BDIF de la AMF)",
 "directivos": {
  "equipo": [
   {"nombre": "Catherine MacGregor", "cargo": "Consejera delegada", "desde": "2021", "participacion_pct": None, "trayectoria": "Ingeniera; 23 años en Schlumberger y presidenta de TechnipFMC Ingeniería antes de llegar a Engie. Ha simplificado el grupo (salida de EQUANS, del carbón y del nuclear) y lo ha llevado a redes y renovables [1]."},
   {"nombre": "Pierre-François Riolacci", "cargo": "Director financiero", "desde": "2021", "participacion_pct": None, "trayectoria": "Antes director financiero de Veolia [1]."},
   {"nombre": "Jean-Pierre Clamadieu", "cargo": "Presidente no ejecutivo", "desde": "2018", "participacion_pct": None, "trayectoria": "Ex consejero delegado de Solvay [1]."},
  ],
  "historial_guidance": [
   {"anio": "2023", "guia": "NRIgs de 5.000-5.600 M (subida en el año)", "real": "5.366 M", "cumplida": "Sí"},
   {"anio": "2024", "guia": "NRIgs de 5.200-5.800 M", "real": "5.531 M", "cumplida": "Sí"},
   {"anio": "2025", "guia": "NRIgs de 4.400-5.000 M (subida a 4.600-5.200 M)", "real": "4.896 M", "cumplida": "Sí"},
   {"anio": "2026", "guia": "NRIgs de 4.900-5.500 M (subida el 31-jul)", "real": "2.955 M en el 1S26", "cumplida": "En curso"},
  ],
  "comentario": "Equipo estable desde 2021 que ha cumplido la guía todos los años y suele subirla a mitad de ejercicio [4, 1]. La asignación de capital ha sido disciplinada (rotación de activos, salida del carbón y del nuclear) y la compra de UKPN, la mayor desde la fusión, se pagó a ≈1,5 veces la RAV y en parte con acciones a 28 € [1].",
  "confianza": "Alta",
 },
 "gobierno": {
  "consejo": [
   {"nombre": "Jean-Pierre Clamadieu", "cargo": "Presidente", "tipo": "Independiente", "desde": "2018", "comisiones": "Nombramientos"},
   {"nombre": "Catherine MacGregor", "cargo": "Consejera delegada", "tipo": "Ejecutivo", "desde": "2021", "comisiones": None},
   {"nombre": "Fabrice Brégier", "cargo": "Consejero", "tipo": "Independiente", "desde": "2019", "comisiones": None},
   {"nombre": "Marie-José Nadeau", "cargo": "Consejera", "tipo": "Independiente", "desde": "2015", "comisiones": None},
   {"nombre": "Ross McInnes", "cargo": "Consejero", "tipo": "Independiente", "desde": "2016", "comisiones": "Auditoría (presidente)"},
   {"nombre": "Céline Fornaro", "cargo": "Representante del Estado", "tipo": "Dominical", "desde": None, "comisiones": None},
   {"nombre": "Representantes de los trabajadores (3) y del accionariado asalariado (1)", "cargo": "Consejeros", "tipo": "Otro", "desde": None, "comisiones": None},
  ],
  "presidente_ceo_separados": True,
  "presidente_ejecutivo": False,
  "consejero_coordinador": False,
  "una_accion_un_voto": False,
  "operaciones_vinculadas_relevantes": False,
  "variable_ligado_rentabilidad": True,
  "auditoria_independiente": True,
  "insiders_sin_operaciones": False,
  "accionista_control": False,
  "presidente_vinculado_control": False,
  "cambios_cupula_24m": 0,
  "voto_remuneracion_pct": None, "voto_remuneracion_contra_pct": None, "voto_remuneracion_contra_libre_pct": None, "voto_cupula_pct": None,
  "remuneracion_ceo": {"anio": "2025", "total": 4.80, "fijo": 1.15, "variable_corto": 1.58, "variable_largo": 2.07, "ratio_salario_medio": 53},
  "remuneracion": "Consejera delegada (2025): fijo de 1,15 M €, variable de 1,58 M € (125,1 % del objetivo) y 192.567 acciones de rendimiento valoradas en 2,07 M € [1]. Unas 53 veces el salario medio en Francia del grupo (≈90.000 €, estimación propia). El presidente cobra 450.000 € fijos.",
  "accionistas": [
   {"nombre": "Estado francés (APE)", "pct": 22.64, "tipo": "Estado", "variacion": "Del 23,64 % al 22,64 % por la ampliación de marzo; 33,80 % de los votos (voto doble) [3, 5]"},
   {"nombre": "Capital Group", "pct": 6.25, "tipo": "Institucional", "variacion": None},
   {"nombre": "BlackRock", "pct": 5.90, "tipo": "Institucional", "variacion": None},
   {"nombre": "Caisse des Dépôts (CDC)", "pct": 3.36, "tipo": "Estado", "variacion": None},
   {"nombre": "Accionariado asalariado", "pct": 4.0, "tipo": "Empleados", "variacion": "LINK 2026 (4,3 M de acciones, julio) [3]"},
  ],
  "insiders": [
   {"fecha": "2026-07-30", "persona": "Varios directivos (plan de accionariado asalariado LINK 2026 a 21,71 €)", "operacion": "Compra", "acciones": None, "importe": None},
  ],
  "control_y_defensas": "El Estado francés tiene el 22,64 % del capital y el 33,80 % de los votos por el voto doble y tres puestos en el consejo (un representante y dos propuestos); la ley exige que conserve al menos un tercio del capital o de los votos de la antigua GDF y tiene una acción de oro sobre los activos de gas estratégicos [1, 5]. Una OPA hostil es prácticamente imposible.",
  "alertas": [
   "El Estado puede reducir su participación para financiar el déficit (en 2026 bajó de un tercio de los votos por la ampliación, no por ventas) [5].",
   "El Estado como accionista puede presionar en precios regulados, dividendo e inversión en Francia.",
  ],
  "confianza": "Media",
 },
 "fuentes": fC,
 "huecos": [
  H("gobierno", "votos de la junta de 2026 sobre remuneración", "Complemento", "1) URD 2025 [1]: anterior a la junta; 2) web de la junta: no abierta; 3) BDIF [2]: no los recoge", "Omitido"),
 ],
}
w('C.json', C_)

# ======================= D. Mercado =======================
fD = [
 F(1, "Gráfico de ENGI.PA (cierre del 19-oct-2026: 22,77 €; previousClose consultado el 20-oct a las 08:17 UTC)", "Yahoo Finance", "Datos de mercado", "2026-10-19", "https://finance.yahoo.com/quote/ENGI.PA/"),
 F(2, "Históricos diarios ENGI.PA, EXSA.DE, EXH9.DE (bolsa.mjs): rentabilidades, betas, cierres de ejercicio", "Yahoo Finance", "Datos de mercado", "2026-10-16", "https://finance.yahoo.com/quote/ENGI.PA/history/"),
 F(3, "ENGIE: consenso de ventas, EBITDA, EBIT, beneficio, BPA, dividendo y deuda 2026e-2028e; 19 analistas; objetivo medio 30,54 €", "MarketScreener", "Datos de mercado", "2026-10-20", "https://www.marketscreener.com/quote/stock/ENGIE-4995/finances/"),
 F(4, "ENGIE: recomendaciones de analistas (17 comprar, 2 mantener; objetivo 24,5-33,8 €)", "Investing.com", "Datos de mercado", "2026-10-20", "https://www.investing.com/equities/gdf-suez-consensus-estimates"),
 F(5, "Comparables (Iberdrola, Naturgy, Endesa, Snam, National Grid): precio, consenso y deuda", "MarketScreener", "Datos de mercado", "2026-10-20", "https://www.marketscreener.com/"),
 F(6, "FY 2025 results, UKPN presentation & mid-term outlook (múltiplo pagado por UKPN)", "ENGIE", "Primaria", "2026-02-25", "https://www.engie.com/sites/default/files/assets/documents/2026-03/FY%202025%20results%2C%20UKPN%20Presentation%20%26%20Mid%20term%20outllok%20-%20site%20web%20-%20vDEF.pdf"),
 F(7, "Italgas: compra de 2i Rete Gas (valor empresa 5.306 M)", "Italgas", "Primaria", "2024-10", "https://www.italgas.it/en/"),
 F(8, "Movimiento del precio (movimiento.mjs ENGI.PA, 20-oct-2026)", "Yahoo Finance", "Datos de mercado", "2026-10-20", "https://finance.yahoo.com/quote/ENGI.PA/"),
 F(9, "Rentabilidad del 31-jul al 19-oct-2026 de ENGI.PA, STOXX 600, STOXX Utilities, CAC 40, Veolia, Orange, Iberdrola, Enel, RWE y EDP (notas/docs/yahoo-relativo-0731-1019.csv)", "Yahoo Finance", "Datos de mercado", "2026-10-20", "https://finance.yahoo.com/"),
 F(10, "Rendimiento del bono francés a 10 años (4,90 % el 20-oct; 4,93 % el 19-oct)", "Trading Economics", "Datos de mercado", "2026-10-20", "https://tradingeconomics.com/france/government-bond-yield"),
 F(11, "Rendimiento del Bund a 10 años (3,49 % el 19-oct-2026)", "Deutsche Bundesbank", "Primaria", "2026-10-19", "https://www.bundesbank.de/en/statistics/money-and-capital-markets/interest-rates-and-yields"),
 F(12, "L'écart entre l'OAT et le Bund atteint 120 points de base, un niveau inédit depuis 2012", "France-Épargne", "Prensa", "2026-09-30", "https://www.france-epargne.fr/news/lecart-entre-loat-et-le-bund-atteint-120-points-de-base-un-niveau-inedit-depuis-2012.md"),
 F(13, "Engie : sous pression après un été pourtant solide (objetivo 22 €)", "ABC Bourse", "Prensa", "2026-09-30", "https://www.abcbourse.com/analyses/engie_sous_pression_apres_un_ete_pourtant_solide-7137"),
 F(14, "Engie prolonge ses discussions avec l'Etat belge sur la cession de ses activités nucléaires (Heads of Terms al 4-nov)", "Fortuneo / AOF", "Prensa", "2026-09", "https://bourse.fortuneo.fr/actualites/engie-prolonge-ses-discussions-avec-l-etat-belge-sur-la-cession-de-ses-activites-nucleaires-9534604"),
 F(15, "FY 2025 results press release (calendario: resultados de 9M el 5-nov-2026)", "ENGIE", "Primaria", "2026-02-25", "https://www.engie.com/app/uploads/2026/03/PR-ENGIE-FY-2025-VDEF.pdf"),
 F(16, "Declaración de cruce de umbral del Estado (4-mar-2026, por la ampliación de capital)", "AMF", "Primaria", "2026-03-23", "https://echanges.dila.gouv.fr/OPENDATA/AMF/307/8888/01/FC307620207_20260323.pdf"),
 F(17, "Rendimientos a largo plazo de la deuda pública (IRS de convergencia): Francia y Alemania, julio-septiembre de 2026", "Banco Central Europeo", "Primaria", "2026-10", "https://data.ecb.europa.eu/data/datasets/IRS"),
 F(18, "Damodaran: implied equity risk premium por mes (4,20 %, octubre de 2026)", "NYU Stern (Damodaran)", "Datos de mercado", "2026-10", "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/implpr.html"),
]
D_ = {
 "_estado": "completo (bolsa.mjs, MarketScreener, Investing.com; precio del 19-oct de Yahoo)",
 "identificacion": {
  "nombre": "ENGIE SA", "nombre_corto": "Engie", "ticker": "ENGI.PA", "isin": "FR0010208488", "mercado": "Euronext París",
  "indice_referencia": "STOXX Europe 600", "pais": "Francia", "pais_iso": "FR", "sector": "Utilities", "industria": "Multi-Utilities",
  "sede": "Courbevoie (La Défense)", "fundacion": "2008", "empleados": 91000, "web": "www.engie.com",
  "precio": 22.77, "fecha_precio": "2026-10-19", "acciones": 2540.0, "capitalizacion_publicada": None, "free_float_pct": 67.9,
  "max_52s": 29.89, "min_52s": 19.42, "volumen_medio_diario": 112, "proximos_resultados": "2026-11-05",
 },
 "consenso": {
  "guidance": "2026 (subida el 31-jul): NRIgs de 4.900-5.500 M, EBIT sin nuclear de 9.200-10.200 M, EBITDA de 14.300-15.300 M. 2027: NRIgs de 4.900-5.500 M y EBIT sin nuclear de 9.800-10.800 M; 2028: NRIgs de 5.200-5.800 M y EBIT sin nuclear de 10.300-11.300 M (+7 % anual de EBIT) [6].",
  "estimaciones": [
   {"periodo": "2026e", "ingresos": 78789, "ebitda": 15116, "ebit": 9746, "bpa": 1.90, "dpa": 1.42, "fuente": "MarketScreener, 20-oct-2026 [3]"},
   {"periodo": "2027e", "ingresos": 81425, "ebitda": 16287, "ebit": 10513, "bpa": 2.00, "dpa": 1.46, "fuente": "MarketScreener, 20-oct-2026 [3]"},
   {"periodo": "2028e", "ingresos": 84707, "ebitda": 17020, "ebit": 10980, "bpa": 2.13, "dpa": 1.55, "fuente": "MarketScreener, 20-oct-2026 [3]"},
  ],
  "recomendaciones": {"n_analistas": 19, "comprar": 17, "mantener": 2, "vender": 0, "po_medio": 30.54, "po_min": 24.5, "po_max": 33.8},
  "revisiones": "Las estimaciones de beneficio de 2026 subieron tras la guía del 31-jul; el objetivo medio (30,54 €) no ha bajado con la acción, que cotiza un 25 % por debajo [3, 4]. Bernstein fijó 29,40 € en septiembre. La excepción es ABC Bourse (análisis técnico), con objetivo de 22 € y previsión bajista [13].",
  "base_ebitda": "ajustado",
  "ajuste_ebitda_pct_ventas": 1.3,
  "confianza": "Media",
 },
 "bolsa": {
  "tipo_rentabilidad": "total (con dividendos)",
  "rentabilidades": [
   {"periodo": "En el año", "accion_pct": 9.8, "indice_pct": 11.6, "sector_pct": 16.0},
   {"periodo": "1 año", "accion_pct": 25.7, "indice_pct": 15.6, "sector_pct": 21.0},
   {"periodo": "3 años (anual.)", "accion_pct": 25.9, "indice_pct": 17.4, "sector_pct": 21.2},
   {"periodo": "5 años (anual.)", "accion_pct": 23.6, "indice_pct": 9.5, "sector_pct": 11.8},
   {"periodo": "10 años (anual.)", "accion_pct": 12.4, "indice_pct": 9.4, "sector_pct": 11.1},
  ],
  "anual": [],
  "beta": 0.75, "volatilidad_pct": 21.0, "max_drawdown_pct": None, "posicion_corta_pct": None,
  "comentario": "Hasta julio de 2026 Engie fue una de las mejores utilities europeas: +23,6 % anual en cinco años con dividendos frente al 11,8 % del sector, por el beneficio de la crisis energética, el dividendo y el giro a redes con UKPN [2]. Desde el 31-jul ha caído un 16,0 % (27,11 € a 22,77 €) frente al −1,3 % del STOXX 600, el −1,0 % de las utilities europeas y el −7,5 % del CAC 40 [9]. Las francesas con el Estado en el capital han caído más (Orange −14,3 %, Veolia −7,4 %), mientras Iberdrola sube un 2,8 % [9]. Los datos de rentabilidad llegan al 16-oct (Yahoo); el precio del informe es el cierre del 19-oct.",
  "contexto": None,
  "confianza": "Media",
 },
 "multiplos_historicos": {
  "serie": [
   {"anio": "2021", "precio_cierre": 13.01, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2022", "precio_cierre": 13.39, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": True},
   {"anio": "2023", "precio_cierre": 15.92, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": True},
   {"anio": "2024", "precio_cierre": 15.31, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2025", "precio_cierre": 22.41, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
  ],
  "comentario": None,
  "confianza": "Media",
 },
 "comparables": {
  "criterio": "Utilities europeas con peso de redes reguladas y negocio de gas o electricidad integrado: Iberdrola, Naturgy, Endesa (integradas ibéricas), Snam (redes de gas en Italia) y National Grid (redes en el Reino Unido y EE. UU., la referencia de UKPN). No entran EDF (no cotiza), Enel y RWE (sin datos homogéneos abiertos a la fecha).",
  "empresas": [
   {"nombre": "Iberdrola", "ticker": "IBE.MC", "pais": "ES", "capitalizacion": 141670, "ev_ventas": None, "ev_ebitda_ltm": 11.9, "ev_ebitda_ntm": 11.3, "per_ntm": 20.0, "crecimiento_pct": 3.2, "margen_ebitda_pct": 36.4, "roic_pct": None, "dn_ebitda": 3.0, "fcf_yield_pct": None},
   {"nombre": "Naturgy", "ticker": "NTGY.MC", "pais": "ES", "capitalizacion": 29400, "ev_ventas": None, "ev_ebitda_ltm": 7.9, "ev_ebitda_ntm": 7.7, "per_ntm": 14.5, "crecimiento_pct": 0.2, "margen_ebitda_pct": 27.4, "roic_pct": None, "dn_ebitda": 2.3, "fcf_yield_pct": None},
   {"nombre": "Endesa", "ticker": "ELE.MC", "pais": "ES", "capitalizacion": 44700, "ev_ventas": None, "ev_ebitda_ltm": 9.7, "ev_ebitda_ntm": 9.1, "per_ntm": 17.9, "crecimiento_pct": 0.2, "margen_ebitda_pct": 26.9, "roic_pct": None, "dn_ebitda": 1.8, "fcf_yield_pct": None},
   {"nombre": "Snam", "ticker": "SRG.MI", "pais": "IT", "capitalizacion": 19580, "ev_ventas": None, "ev_ebitda_ltm": 13.0, "ev_ebitda_ntm": 11.9, "per_ntm": 13.3, "crecimiento_pct": 6.0, "margen_ebitda_pct": 76.4, "roic_pct": None, "dn_ebitda": 5.9, "fcf_yield_pct": None},
   {"nombre": "National Grid", "ticker": "NG.L", "pais": "GB", "capitalizacion": 67000, "ev_ventas": None, "ev_ebitda_ltm": 13.9, "ev_ebitda_ntm": 11.3, "per_ntm": 12.8, "crecimiento_pct": 15.0, "margen_ebitda_pct": 44.8, "roic_pct": None, "dn_ebitda": 5.6, "fcf_yield_pct": None},
  ],
  "comentario": None,
  "confianza": "Baja",
 },
 "transacciones": {
  "operaciones": [
   {"fecha": "2026-02", "objetivo": "UK Power Networks (100 %)", "comprador": "Engie", "ev": 18300, "ev_ventas": None, "ev_ebitda": 8.8, "prima_pct": None, "excluir": False, "comentario": "Valor empresa de 15.800 M GBP, ≈8,8 veces el EBITDA del ejercicio a marzo de 2025 y ≈1,5 veces la RAV [6]."},
   {"fecha": "2024-10", "objetivo": "2i Rete Gas", "comprador": "Italgas", "ev": 5306, "ev_ventas": 6.5, "ev_ebitda": 9.7, "prima_pct": None, "excluir": False, "comentario": "Distribución de gas en Italia [7]."},
  ],
  "comentario": "Solo dos operaciones con múltiplo publicado; el sector se valora por EV/RAB (≈1,0-1,5 veces). Engie es compradora, no objetivo: el Estado francés bloquea cualquier oferta.",
  "confianza": "Baja",
 },
 "fuentes": fD,
 "huecos": [
  H("bolsa", "rentabilidad anual por año natural, caída máxima y posición corta", "Complemento", "1) bolsa.mjs [2]: sin serie anual en el JSON; 2) AMF (posiciones cortas): sin posición publicada ≥ 0,5 %; 3) Yahoo: sin caída máxima", "Omitido"),
  H("comparables", "ROIC, FCF y EV/ventas de comparables; Enel, RWE, EDP", "Complemento", "1) MarketScreener [5]: sin ROIC; 2) Yahoo quoteSummary: bloqueado (Too Many Requests); 3) informes del repo: fechas distintas", "Omitido"),
  H("transacciones", "más operaciones con múltiplo", "Complemento", "1) informe Enagás del repo; 2) presentación de UKPN [6]; 3) búsqueda web: Teréga y National Gas sin múltiplo de EBITDA", "Omitido"),
 ],
}
w('D.json', D_)

# ======================= E. Sentimiento =======================
fE = [
 F(1, "Forum ENGIE (lista de hilos de julio-octubre de 2026)", "Boursorama", "Foros y redes", "2026-10-20", "https://www.boursorama.com/bourse/forum/1rPENGI/"),
 F(2, "Hilo «Engie et les taux» (14-oct-2026)", "Boursorama", "Foros y redes", "2026-10-14", "https://www.boursorama.com/bourse/forum/1rPENGI/detail/468561506/"),
 F(3, "Hilo «Vente du nucléaire belge reportée à la veille des résultats» (20-oct-2026)", "Boursorama", "Foros y redes", "2026-10-20", "https://www.boursorama.com/bourse/forum/1rPENGI/detail/468579343/"),
 F(4, "Hilo «pourquoi une telle baisse» / gas y tipos (sep-oct 2026)", "Boursorama", "Foros y redes", "2026-10", "https://www.boursorama.com/bourse/forum/1rPENGI/detail/468440575/"),
 F(5, "Hilo «Je constate que les groupes liés à l'État, dont ENGIE, sont massacrés» (29-sep-2026)", "Boursorama", "Foros y redes", "2026-09-29", "https://www.boursorama.com/bourse/forum/1rPENGI/"),
 F(6, "Engie : sous pression après un été pourtant solide", "ABC Bourse", "Prensa", "2026-09-30", "https://www.abcbourse.com/analyses/engie_sous_pression_apres_un_ete_pourtant_solide-7137"),
 F(7, "Hilo «Oh la la encore en baisse… 31 ? Utopique !» y «Ont vise 21 €» (jul-oct 2026)", "Boursorama", "Foros y redes", "2026-10", "https://www.boursorama.com/bourse/forum/1rPENGI/detail/468202823/"),
]
E = {
 "_estado": "completo con huecos (Boursorama y ABC Bourse; Stocktwits y Seeking Alpha sin acceso)",
 "sentimiento": {
  "tono": "Negativo",
  "tendencia": "Empeorando",
  "revisadas": [
   {"plataforma": "Boursorama (foro de Engie)", "fecha": "2026-10", "n_comentarios": 40, "tono": "Negativo", "resumen": "Unos 40 hilos de julio a octubre: mayoría de títulos bajistas («Baisse brutal», «Krach ?», «En route vers 21 €»), varios que atribuyen la caída a las elecciones, al Estado accionista y a los tipos largos, y algunos de accionistas que esperan buenas noticias de Bélgica y de los resultados del 5-nov [1, 4, 5, 7]."},
   {"plataforma": "Boursorama: «Engie et les taux»", "fecha": "2026-10-14", "n_comentarios": 14, "tono": "Neutro", "resumen": "Explica que la deuda está casi toda a tipo fijo y que el efecto directo de los tipos en el beneficio es pequeño, pero que el precio sí depende de los tipos por la competencia de los bonos y el descuento de los flujos [2]."},
   {"plataforma": "Boursorama: nuclear belga", "fecha": "2026-10-20", "n_comentarios": 2, "tono": "Positivo", "resumen": "Lee el aplazamiento de la firma al 4-nov, víspera de resultados, como señal de buenas noticias [3]."},
   {"plataforma": "ABC Bourse (análisis técnico)", "fecha": "2026-09-30", "n_comentarios": None, "tono": "Negativo", "resumen": "Previsión bajista y objetivo de 22 € pese a un verano «sólido»: precio del gas alto, presión política sobre las facturas y ruptura de soportes [6]."},
  ],
  "temas": [
   {"tema": "Riesgo político francés y Estado accionista", "postura": "Bajista", "peso": "Alto", "contraste": "Cierto en parte: las francesas con el Estado en el capital caen más que el CAC desde julio (Engie −16 %, Orange −14 %, CAC −7,5 %), pero Francia es el 45 % del EBIT y baja al ≈35 % en 2028."},
   {"tema": "Tipos de interés largos", "postura": "Bajista", "peso": "Alto", "contraste": "El 91 % de la deuda neta es a tipo fijo (coste del 4,0 %); el efecto en el beneficio es lento, el efecto en la valoración es inmediato."},
   {"tema": "Venta del nuclear belga y resultados del 5-nov", "postura": "Alcista", "peso": "Medio", "contraste": "La venta es neutra en valor según la empresa: quita riesgo, no añade beneficio."},
   {"tema": "Precio del gas", "postura": "Mixta", "peso": "Medio", "contraste": "Engie no es productora de gas; un gas caro presiona las facturas y la política, más que el beneficio."},
  ],
  "lectura": "El inversor particular francés está desanimado y atribuye la caída a Francia (elecciones, Estado, presupuesto) y a los tipos; nadie discute la guía de beneficio. Es el tono típico de una caída por factor país, no por la empresa, y suele ser contrario: el consenso profesional sigue en «comprar» con 30,54 €.",
  "confianza": "Media",
 },
 "fuentes": fE,
 "huecos": [
  H("sentimiento", "Stocktwits, Reddit y comentarios de Seeking Alpha", "Complemento", "1) Stocktwits API: sin acceso desde el entorno; 2) Seeking Alpha: sin artículos abiertos; 3) Reddit: sin hilos de Engie en 2026", "Omitido"),
 ],
}
w('E.json', E)
print('ok')

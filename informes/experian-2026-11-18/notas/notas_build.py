# Construye las notas A-E de Experian (corte 2026-11-18) a partir de los documentos de notas/docs,
# notas/cuentas-xbrl.json (ESEF) y notas/bolsa.json. B y parte de E parten de la iteración del 14-oct
# (sector heredado del informe de Equifax del 8-oct) con los cambios posteriores añadidos.
import json, os, copy
H = os.path.dirname(os.path.abspath(__file__))
ANT = os.path.join(H, '..', '..', 'experian-2026-10-14', 'notas')
X = json.load(open(os.path.join(H, 'cuentas-xbrl.json')))
BOLSA = json.load(open(os.path.join(H, 'bolsa.json')))
def w(n, d):
    json.dump(d, open(os.path.join(H, n + '.json'), 'w'), ensure_ascii=False, indent=1)

FX = 1.0989 / 0.83305          # GBP/USD BCE 17-nov-2026
TC = round(FX / 100, 7)        # USD por penique
PRECIO_P = 2819                # cierre 17-nov-2026 (GBp)
PRECIO = round(PRECIO_P * TC, 2)
ACC = 880.6                    # 882,6 M con voto a 30-sep-2026 menos 2,0 M en fideicomisos de empleados

xc = {c['periodo']: c for c in X['financieros']['cuenta']}
xb = {c['periodo']: c for c in X['balance']['historico']}
xf = {c['periodo']: c for c in X['flujos']['historico']}

# ---------------- A. Cuentas ----------------
# Benchmark (definición de la empresa): ingresos totales, EBIT benchmark de actividades continuadas (KPI del informe anual),
# BPA benchmark publicado. Amortización benchmark (sin intangibles adquiridos): 613 (FY26) y 547 (FY25) publicadas;
# FY20-FY24 = amortización total del XBRL × 0,72 (la de intangibles adquiridos pesó un 28-30 % en FY25-26): estimación.
ing = {2020: 5179, 2021: 5372, 2022: 6288, 2023: 6619, 2024: 7097, 2025: 7523, 2026: 8445}
ebit = {2020: 1386, 2021: 1379, 2022: 1653, 2023: 1798, 2024: 1944, 2025: 2102, 2026: 2407}
bpa = {2020: 1.030, 2021: 1.031, 2022: 1.245, 2023: 1.351, 2024: 1.455, 2025: 1.569, 2026: 1.798}
acc = {2020: 910, 2021: 910, 2022: 911, 2023: 912, 2024: 913, 2025: 914, 2026: 913}
tasa = {2020: 25.8, 2021: 25.8, 2022: 25.0, 2023: 25.0, 2024: 24.0, 2025: 25.3, 2026: 25.5}
dpa = {2024: 0.585, 2025: 0.625, 2026: 0.6925}
am = {2025: 547, 2026: 613}
cuenta = []
for y in range(2020, 2027):
    k = f'FY{y}'
    a = am.get(y, round(xc[k]['amortizaciones'] * 0.72))
    bn = round(bpa[y] * acc[y])
    mino = max(0, xc[k].get('minoritarios') or 0)
    bai = round((bn + mino) / (1 - tasa[y] / 100))
    cuenta.append({'periodo': k, 'ingresos': ing[y], 'coste_ventas': None, 'gastos_generales': None,
                   'ebitda': ebit[y] + a, 'amortizaciones': a, 'ebit': ebit[y], 'resultado_financiero': bai - ebit[y],
                   'bai': bai, 'impuestos': round(bai * tasa[y] / 100), 'minoritarios': mino, 'beneficio_neto': bn,
                   'gastos_financieros': xc[k].get('gastos_financieros'), 'participadas_en_ebitda': None,
                   'no_recurrentes_en_ebitda': None, 'bpa': bpa[y], 'dpa': dpa.get(y), 'dpa_extraordinario': 0,
                   'acciones_diluidas': acc[y]})
# Cifras publicadas FY26 exactas: intereses netos benchmark 185, BAI benchmark 2.212 (sobre EBIT total 2.397)
cuenta[-1].update({'resultado_financiero': -185, 'bai': 2212, 'impuestos': round(2212 * 0.255)})

balance = []
for y in range(2020, 2027):
    k = f'FY{y}'; b = xb[k]
    arr = {2025: 140, 2026: 140}.get(y, 0)
    balance.append({'periodo': k, 'activo_total': None, 'activo_corriente': b['activo_corriente'], 'pasivo_corriente': b['pasivo_corriente'],
                    'pasivo_total': None, 'fondo_comercio': b['fondo_comercio'], 'intangibles': b['intangibles'],
                    'inmovilizado_material': b.get('inmovilizado_material') if b.get('inmovilizado_material') is not None else 330,
                    'existencias': 0, 'clientes': b['clientes'], 'proveedores': b['proveedores'], 'activos_contrato': None, 'pasivos_contrato': None,
                    'caja': b['caja'], 'deuda_financiera': b['deuda_financiera'] - arr, 'arrendamientos': arr,
                    'patrimonio_neto': b['patrimonio_neto'], 'minoritarios': b['minoritarios'], 'reservas': None})
flujos = []
for y in range(2020, 2027):
    k = f'FY{y}'; f = xf[k]
    flujos.append({'periodo': k, **{c: f.get(c) for c in ['flujo_operativo', 'capex', 'pagos_arrendamientos', 'adquisiciones', 'desinversiones', 'dividendos', 'recompras', 'emision_acciones']}, 'intereses_en_financiacion': 0})

A = {
 '_estado': 'Completa (corte 2026-11-18). Cuentas del ESEF (FY2020-FY2026) para balance y flujos; cuenta en base benchmark de la empresa (informe anual 2026 y comunicados); semestre a 30-sep-2026 del RNS del 18-nov-2026.',
 'negocio': {
  'descripcion': 'Experian plc (sociedad de Jersey con sede en Dublín, cotiza en Londres) es el mayor buró de crédito del mundo por ingresos: 8.445 M USD en el ejercicio a marzo de 2026 y 8.825 M en los doce meses a septiembre de 2026 [1, 2]. Vende datos de crédito, analítica, software de decisión (Ascend), identidad y fraude a empresas (B2B, el 74 % de los ingresos del semestre) y servicios al consumidor (Consumer Services, el 26 %: puntuación gratuita, suscripciones y comparador de crédito y seguros con 224 M de miembros gratuitos) [1].',
  'como_gana_dinero': 'Cobra por consulta (informe o puntuación cada vez que un prestamista decide), por suscripción de software de decisión y analítica, por campañas de marketing con datos, por verificación de identidad, empleo e ingresos y, en Consumer Services, por suscripciones y comisiones de referencia cuando un consumidor contrata un crédito o un seguro a través del comparador [1, 3].',
  'segmentos': [
   {'nombre': 'Norteamérica', 'descripcion': 'B2B (Financial Services y Verticals: salud, automoción, marketing) y Consumer Services; 66 % de los ingresos.', 'tipo_resultado': 'EBIT', 'historico': [{'periodo': '1S FY26', 'ingresos': 2756, 'resultado': 976}, {'periodo': '1S FY27', 'ingresos': 2949, 'resultado': 1060}]},
   {'nombre': 'Latinoamérica', 'descripcion': 'Serasa Experian en Brasil y el resto de Latinoamérica; B2B y Consumer Services (Limpa Nome, comparador).', 'tipo_resultado': 'EBIT', 'historico': [{'periodo': '1S FY26', 'ingresos': 570, 'resultado': 146}, {'periodo': '1S FY27', 'ingresos': 722, 'resultado': 187}]},
   {'nombre': 'Reino Unido e Irlanda', 'descripcion': 'B2B (información de crédito y de empresas, identidad y fraude) y Consumer Services.', 'tipo_resultado': 'EBIT', 'historico': [{'periodo': '1S FY26', 'ingresos': 441, 'resultado': 86}, {'periodo': '1S FY27', 'ingresos': 470, 'resultado': 91}]},
   {'nombre': 'EMEA y Asia-Pacífico', 'descripcion': 'Burós y software de decisión en Europa continental, Australia (Illion), India y Asia.', 'tipo_resultado': 'EBIT', 'historico': [{'periodo': '1S FY26', 'ingresos': 287, 'resultado': 14}, {'periodo': '1S FY27', 'ingresos': 307, 'resultado': 26}]},
  ],
  'segmentos_nota': 'Actividades continuadas, millones de USD, EBIT benchmark por región antes de costes centrales [1]. El EBIT del 1S FY26 se deriva del margen publicado y su variación (estimación). Por línea de negocio (orgánico del semestre): Financial Services 54 % (+10 %), Verticals 20 % (+7 %), Consumer Services 26 % (+1 %) [1].',
  'geografias': [
   {'nombre': 'Norteamérica', 'peso_pct': 66},
   {'nombre': 'Latinoamérica', 'peso_pct': 16},
   {'nombre': 'Reino Unido e Irlanda', 'peso_pct': 11},
   {'nombre': 'EMEA y Asia-Pacífico', 'peso_pct': 7},
  ],
  'geografias_criterio': 'Peso en los ingresos del semestre a sep-26 y crecimiento orgánico [1].',
  'clientes': 'Bancos, emisores de tarjetas, prestamistas hipotecarios y de automoción, aseguradoras, hospitales y consumidores; ningún cliente individual material según el informe anual [3].',
  'kpis': [
   {'kpi': 'Crecimiento orgánico', 'valor_anterior': '8 % (FY26)', 'valor_actual': '7 % (1S FY27; 7 % en el 1T y en el 2T)', 'variacion': '−1 punto', 'comentario': 'B2B 9 %, Consumer Services 1 % [1, 2].'},
   {'kpi': 'Margen EBIT benchmark (continuadas)', 'valor_anterior': '28,6 % (FY26)', 'valor_actual': '28,8 % (1S FY27)', 'variacion': '+50 pb interanual', 'comentario': 'Apalancamiento operativo y productividad con IA, menos 60 pb de dilución por los derechos de FICO y las compras [1].'},
   {'kpi': 'ROCE', 'valor_anterior': '17,2 % (FY26)', 'valor_actual': '17,3 % (1S FY27)', 'variacion': '+0,1 puntos', 'comentario': '[1, 3]'},
   {'kpi': 'Deuda neta / EBITDA benchmark', 'valor_anterior': '1,7x (mar-26)', 'valor_actual': '1,9x (sep-26)', 'variacion': '+0,2x', 'comentario': 'Recompras de 774 M y compras de 329 M en el semestre [1].'},
   {'kpi': 'Conversión de caja', 'valor_anterior': '77 % (1S FY26)', 'valor_actual': '81 % (1S FY27)', 'variacion': '+4 puntos', 'comentario': 'Guía > 90 % en el año [1].'},
   {'kpi': 'Miembros gratuitos de Consumer Services', 'valor_anterior': '216 M (mar-26)', 'valor_actual': '224 M (sep-26)', 'variacion': '+8 M', 'comentario': '[1]'},
  ],
  'confianza': 'Alta',
 },
 'financieros': {
  'cuenta': cuenta,
  'bpa_ajustado': [{'periodo': f'FY{y}', 'bpa_ajustado': bpa[y], 'fuente': '[3]'} for y in range(2020, 2027)],
  'ltm': {'periodo': 'LTM sep-26', 'fecha_fin': '2026-09-30', 'ingresos': 8825, 'ebitda': 3162, 'ebit': 2529,
          'beneficio_neto': 1721, 'bpa': 1.923, 'dpa': 0.7125, 'dpa_extraordinario': 0, 'fcf': None,
          'participadas_en_ebitda': None, 'no_recurrentes_en_ebitda': None},
  'ltm_nota': 'FY26 − 1S FY26 + 1S FY27: ingresos 8.445 − 4.070 + 4.450; EBITDA benchmark 1.565 (2S FY26) + 1.597; EBIT benchmark total 2.397 − 1.145 + 1.277; BPA benchmark 179,8 − 85,0 + 97,5 c; beneficio = BPA × ≈895 M de acciones medias (estimación); dividendo 48,00 + 23,25 c [1, 2].',
  'notas_de_origen': 'Ingresos totales publicados (ESEF y KPI del informe anual 2026, que da FY20-FY26 en el mismo gráfico); EBIT benchmark de actividades continuadas y BPA benchmark del informe anual 2026 (pág. 44 y 65) [3]. Amortización benchmark (sin intangibles adquiridos) publicada para FY25 (547) y FY26 (613) [2]; FY20-FY24 estimada como el 72 % de la amortización total del ESEF. Beneficio benchmark = BPA × acciones medias; BAI e impuestos derivados con la tasa benchmark (25,5 % FY26, 25,3 % FY25 publicadas; antes, aproximadas). FY26: intereses netos benchmark 185 M y BAI benchmark 2.212 M publicados [2]. Ejercicio a marzo, etiquetado por el año en que termina (FY2026 = abril 2025-marzo 2026).',
  'cambios_perimetro': [
   {'periodo': 'FY2026', 'descripcion': 'Compras de ClearSale (Brasil), AtData (EE. UU.) y KYC360 (Reino Unido) por 792 M USD [2].'},
   {'periodo': 'FY2027', 'descripcion': 'Own Up y Konfir (1-abr-2026), idwall (Brasil) y eInsights (tras el semestre): 329 M USD pagados en el semestre; aportación inorgánica de ≈1 punto de crecimiento [1].'},
  ],
  'comentario': 'Crecimiento constante: ingresos de 5.179 M USD (FY20) a 8.445 M (FY26), un 8,5 % anual, y BPA benchmark de 103,0 a 179,8 centavos (+9,7 % anual) [3]. El margen EBIT benchmark sube de 26,9 % a 28,6 % y otros 50 pb en el semestre (28,8 %). El BPA básico del semestre (90,4 c) queda un 7 % por debajo del benchmark (97,5 c): la diferencia es sobre todo la amortización de intangibles adquiridos (10,3 c) [1]. Primer semestre FY27: BPA benchmark +15 % (+13 % a tipos constantes) con ingresos +8 % a tipos constantes [1].',
  'ajustes': 'Se usa el benchmark de la empresa en toda la serie (misma base que el PER histórico, los escenarios y el consenso). Excluye la amortización de intangibles adquiridos (263 M USD en el FY26), partidas excepcionales y remediciones financieras no monetarias [2].',
  'confianza': 'Alta',
 },
 'trimestres': {
  'items': [
   {'periodo': '1T FY27 (abr-jun 26)', 'ingresos': None, 'crecimiento_pct': 10, 'crecimiento_organico_pct': 7, 'ebitda': None, 'margen_ebitda_pct': None, 'bpa': None, 'vs_consenso': None},
   {'periodo': '2T FY27 (jul-sep 26)', 'ingresos': None, 'crecimiento_pct': None, 'crecimiento_organico_pct': 7, 'ebitda': None, 'margen_ebitda_pct': None, 'bpa': None, 'vs_consenso': None},
   {'periodo': '1S FY26 (abr-sep 25)', 'ingresos': 4070, 'crecimiento_pct': None, 'crecimiento_organico_pct': None, 'ebitda': 1445, 'margen_ebitda_pct': 35.5, 'bpa': 0.85, 'vs_consenso': None},
   {'periodo': '1S FY27 (abr-sep 26)', 'ingresos': 4450, 'crecimiento_pct': 9, 'crecimiento_organico_pct': 7, 'ebitda': 1597, 'margen_ebitda_pct': 35.9, 'bpa': 0.975, 'vs_consenso': 'En línea'},
  ],
  'notas_de_origen': 'Semestral del 18-nov-2026: ingresos 4.450 M USD (+9 % reales, +8 % a tipos constantes, +7 % orgánico; 7 % en el 1T y en el 2T); EBIT benchmark de continuadas 1.279 M (+11 %), margen 28,8 % (+50 pb); BPA benchmark 97,5 c (+15 %); flujo operativo benchmark 1.029 M (+16 %) [1]. Norteamérica se frena del 7 % orgánico en el 1T al 5 % en el 2T (hipotecas y Consumer Services −7 % en el 2T); Latinoamérica acelera del 12 % al 18 % [1]. Guía FY27 rebajada en ingresos: orgánico 6-7 % (antes 6-8 %) por el efecto de los tipos sobre las hipotecas en EE. UU.; EBIT benchmark ≈ +10 %, BPA benchmark ≈ +12 % (antes «dos dígitos») y margen de al menos +50 pb (antes «≈ +50 pb») [1, 2]. «En línea»: el BPA del semestre (+15 %) cumple lo que implicaba la guía; no se encontró el consenso del semestre compilado por la empresa.',
  'ultima_presentacion': '2026-11-18',
  'proxima_publicacion': '2027-02-02',
  'confianza': 'Alta',
 },
 'balance': {
  'historico': balance,
  'intermedio': {'periodo': '30-sep-2026', 'caja': 257, 'deuda_financiera': 6173, 'arrendamientos': 129, 'deuda_neta': 6045, 'comentario': 'Bonos a largo 5.373 M, papel comercial 151 M, préstamos 589 M, arrendamientos 129 M, derivados de cobertura 60 M; caja y depósitos 257 M [1].'},
  'notas_de_origen': 'ESEF FY2020-FY2026 (cuentas-xbrl.json) [4]. La deuda financiera del ESEF incluye arrendamientos e intereses devengados: en FY25-26 se separan ≈140 M de arrendamientos; en los años anteriores van dentro. Inmovilizado material FY26 no etiquetado en el ESEF: ≈330 M (estimación por continuidad). Activo y pasivo totales y reservas no etiquetados: se dejan en blanco.',
  'vencimientos': [], 'vencimientos_nota': 'Sin vencimientos de bonos en los próximos doce meses a 30-sep-2026 (la deuda a menos de un año es papel comercial, 151 M) [1]. Bono de 1.000 M USD al 5,35 % con vencimiento en 2036 emitido en junio de 2026 [5].',
  'liquidez': 'Facilidades bancarias comprometidas no dispuestas de 2.510 M USD a marzo de 2026 [3].',
  'rating': 'A3 / A- (Moody\'s / S&P), según el aviso de emisión de junio de 2026 [5].',
  'coste_deuda_pct': 4.5, 'vida_media_anios': None, 'otros_pasivos': None,
  'comentario': 'Deuda neta de 6.045 M USD a 30-sep-2026 (1,9 veces el EBITDA benchmark), frente a 5.179 M en marzo: sube por las recompras (774 M netos en el semestre) y las compras (329 M). Sigue por debajo de su horquilla objetivo de 2,0-2,5x; la cobertura de intereses (EBIT benchmark / intereses netos) es de unas 11 veces [1].',
  'confianza': 'Alta',
 },
 'flujos': {
  'historico': flujos,
  'intermedio': {'periodo': '1S FY27', 'flujo_operativo_benchmark': 1029, 'capex': 356, 'fcf_benchmark': 700, 'adquisiciones': 329, 'dividendos': 428, 'recompras': 774},
  'notas_de_origen': 'ESEF FY2020-FY2026 [4]. Flujo operativo del ESEF = efectivo de las operaciones después de impuestos e intereses según el concepto etiquetado; capex = inmovilizado material e intangible. Semestre: flujo operativo benchmark 1.029 M (conversión 81 %), flujo libre benchmark 700 M [1].',
  'comentario': 'Conversión de caja alta y estable: flujo operativo benchmark de 2.221 M en el FY26 (93 % del EBIT benchmark) [3]. El capex baja del 9 % de los ingresos al 8 % (guía FY27) y a ≈7 % a medio plazo al terminar la migración a la nube [1, 2].',
  'confianza': 'Alta',
 },
 'calidad': None,
 'rentabilidad': None,
 'capital': {
  'politica': 'Dividendo progresivo (69,25 c en el FY26, +11 %; primer dividendo a cuenta del FY27 de 23,25 c, +9 %) y recompras: 727 M USD en el FY26, 774 M netos en el semestre y un programa nuevo de 500 M USD anunciado el 18-nov-2026 (hasta el 30-jun-2027), que eleva a 2.500 M lo anunciado en el año natural [1, 2, 6].',
  'adquisiciones': [
   {'anio': 'FY2026', 'objetivo': 'ClearSale (fraude, Brasil), AtData (correo electrónico, EE. UU.) y KYC360 (cumplimiento, Reino Unido)', 'importe': 792, 'ev_ebitda': None, 'financiacion': 'Caja y deuda', 'resultado': 'Integradas; aportan ≈1 punto de crecimiento inorgánico [2]'},
   {'anio': 'FY2027', 'objetivo': 'Own Up (hipotecas, EE. UU.), Konfir (verificación de ingresos, Reino Unido), idwall (identidad, Brasil; ≈86 M USD) y eInsights (salud, tras el semestre)', 'importe': 329, 'ev_ebitda': None, 'financiacion': 'Caja y deuda', 'resultado': 'Pagado en el 1S FY27; integraciones en curso [1, 2]'},
  ],
  'comentario': 'La empresa reparte casi todo el flujo libre y algo más con deuda: en el semestre, 428 M de dividendos y 774 M de recompras frente a 700 M de flujo libre benchmark; el apalancamiento sube a 1,9x, aún dentro de su marco.',
  'confianza': 'Alta',
 },
 'fuentes': [
  {'id': 1, 'titulo': 'Half-year Financial Report (six months ended 30 September 2026)', 'editor': 'Experian plc (RNS, vía Investegate)', 'tipo': 'Primaria', 'fecha': '2026-11-18', 'url': 'https://www.investegate.co.uk/announcement/rns/experian--expn/half-year-financial-report/9880537'},
  {'id': 2, 'titulo': 'Full-year Financial Report FY26', 'editor': 'Experian plc (RNS, vía Investegate)', 'tipo': 'Primaria', 'fecha': '2026-05-20', 'url': 'https://www.investegate.co.uk/announcement/rns/experian--expn/full-year-financial-report/9576492'},
  {'id': 3, 'titulo': 'Annual Report 2026', 'editor': 'Experian plc', 'tipo': 'Primaria', 'fecha': '2026-06', 'url': 'https://www.experianplc.com/content/dam/marketing/global/plc/en/assets/documents/reports/2026/experian-annual-report-2026.pdf'},
  {'id': 4, 'titulo': 'Cuentas ESEF FY2020-FY2026 (filings.xbrl.org, LEI 635400RXXHHYT1JTSZ26)', 'editor': 'XBRL International / FCA NSM', 'tipo': 'Primaria', 'fecha': '2026-11-18', 'url': 'https://filings.xbrl.org/'},
  {'id': 5, 'titulo': 'Bond Issue (1.000 M USD al 5,35 % con vencimiento en 2036)', 'editor': 'Experian plc (RNS)', 'tipo': 'Primaria', 'fecha': '2026-06-17', 'url': 'https://www.investegate.co.uk/announcement/rns/experian--expn/bond-issue/9622851'},
  {'id': 6, 'titulo': 'Share repurchase programme (500 M USD)', 'editor': 'Experian plc (RNS)', 'tipo': 'Primaria', 'fecha': '2026-11-18', 'url': 'https://www.investegate.co.uk/announcement/rns/experian--expn/share-repurchase-programme/9881343'},
 ],
 'huecos': [
  {'seccion': 'financieros', 'campo': 'coste de ventas y gastos generales; amortización benchmark FY20-FY24', 'tipo': 'Complemento', 'intentos': '1) ESEF: la cuenta va por naturaleza agregada sin esos conceptos; 2) informe anual 2026: solo FY25-FY26; 3) comunicados anuales anteriores: no descargados por presupuesto.', 'decision': 'Estimado (amortización) / omitido (coste de ventas)'},
 ],
}
w('A', A)

# ---------------- B. Sector (heredado, con lo nuevo) ----------------
B = json.load(open(os.path.join(ANT, 'B.json')))
nb = len(B['fuentes'])
B['fuentes'] += [
 {'id': nb + 1, 'titulo': 'Why Fair Isaac Corporation plunged today (FHFA: VantageScore en la misma tabla de precios que FICO)', 'editor': 'The Motley Fool', 'tipo': 'Prensa', 'fecha': '2026-09-29', 'url': 'https://www.fool.com/investing/2026/09/29/why-fair-isaac-corporation-plunged-today/'},
 {'id': nb + 2, 'titulo': 'Bi-Merge Credit Report Timeline & Updates', 'editor': 'Certified Credit', 'tipo': 'Sectorial', 'fecha': '2026-10-17', 'url': 'https://www.certifiedcredit.com/bi-merge-credit-report-timeline/'},
 {'id': nb + 3, 'titulo': 'Half-year Financial Report FY27', 'editor': 'Experian plc (RNS)', 'tipo': 'Primaria', 'fecha': '2026-11-18', 'url': 'https://www.investegate.co.uk/announcement/rns/experian--expn/half-year-financial-report/9880537'},
]
for d in B['sector']['drivers']:
    if d['driver'].startswith('Presión regulatoria'):
        d['evidencia'] = (f'La FHFA metió VantageScore 4.0 en la misma tabla de precios que FICO para Fannie Mae y Freddie Mac (28-sep-2026) y Rocket Mortgage la adoptó como puntuación preferente [{nb + 1}]; '
                          f'el paso de tres informes a dos («bi-merge») sigue en estudio, sin guía formal ni fecha a 17-oct-2026 [{nb + 2}]. Experian cuenta con el modelo de distribución tradicional de FICO en su guía FY27 y dice que un cambio no afecta a su EBIT ni a su BPA benchmark [{nb + 3}].')
B['sector']['drivers'].append({'driver': 'Tipos de interés y volumen hipotecario en EE. UU.', 'efecto': '+/−', 'horizonte': 'Cíclico',
    'evidencia': f'Experian rebaja la guía orgánica del FY27 de 6-8 % a 6-7 % por el efecto de los tipos altos sobre los volúmenes hipotecarios en EE. UU.; el bono a 10 años de EE. UU. estaba en el 5,10 % el 17-nov-2026 [{nb + 3}].'})
B['_estado'] = 'Heredada de la iteración del 14-oct (que reutilizó la nota de sector de Equifax del 8-oct) con los cambios regulatorios y de guía posteriores añadidos; cifras de mercado y competidores sin rehacer.'
w('B', B)

# ---------------- C. Gobierno ----------------
C = json.load(open(os.path.join(ANT, 'C.json')))
C['directivos']['historial_guidance'] = [
 {'anio': 'FY2026', 'guia': 'Orgánico 6-8 %, margen +30-50 pb, BPA de dos dígitos', 'real': 'Orgánico 8 %, margen +60 pb a tipos constantes, BPA +15 %', 'cumplida': 'Sí'},
 {'anio': 'FY2027 (en curso)', 'guia': 'Mayo: orgánico 6-8 %, margen ≈ +50 pb, BPA de dos dígitos. Noviembre: orgánico 6-7 %, margen ≥ +50 pb, BPA ≈ +12 %', 'real': '1S: orgánico 7 %, margen +50 pb, BPA +15 %', 'cumplida': 'Parcial'},
]
C['directivos']['comentario'] = 'Cumplidora: el FY26 terminó en la parte alta de la guía [2]; en el FY27 estrecha la de ingresos (6-7 %) por las hipotecas en EE. UU. pero concreta la de BPA en ≈ +12 % [1]. Equipo estable desde 2014 (Cassin y Pitchford); el cambio de este año es de presidente: Adam Crozier sustituyó a Mike Rogers tras la junta del 22-jul-2026 [3].'
C['directivos']['confianza'] = 'Alta'
G = C['gobierno']
G['consejo'] = [
 {'nombre': 'Adam Crozier', 'cargo': 'Presidente no ejecutivo (desde el 22-jul-2026)', 'tipo': 'Independiente', 'desde': '2026', 'comisiones': 'Nombramientos (presidente), Remuneración'},
 {'nombre': 'Brian Cassin', 'cargo': 'Consejero delegado', 'tipo': 'Ejecutivo', 'desde': '2014', 'comisiones': '—'},
 {'nombre': 'Lloyd Pitchford', 'cargo': 'Director financiero', 'tipo': 'Ejecutivo', 'desde': '2014', 'comisiones': '—'},
 {'nombre': 'Alison Brittain', 'cargo': 'Consejera independiente coordinadora', 'tipo': 'Independiente', 'desde': None, 'comisiones': None},
 {'nombre': 'Kathleen DeRose', 'cargo': 'Consejera independiente; preside Remuneración', 'tipo': 'Independiente', 'desde': None, 'comisiones': 'Remuneración (presidenta)'},
]
G['cambios_cupula_24m'] = True
G['remuneracion_ceo'] = {'anio': 'FY2026', 'total': 10.7, 'fijo': 2.0, 'variable_corto': 3.4, 'variable_largo': 5.3, 'ratio_salario_medio': 100}
G['remuneracion'] = 'Cifra única del CEO del FY26: 8,09 M GBP (≈10,7 M USD al 1,32: fijo 1,50, bonus 2,59 y acciones 4,00 M GBP) (10,63 M en el FY25), con sueldo de 1,35 M GBP tras la subida de abril de 2025 consultada con los accionistas. El variable a largo plazo (CIP y PSP) pesa el BPA benchmark (crecimiento medio del 5 % al 9 % para cobrar del mínimo al máximo; el plan de 2023 dio un 10,4 % y cobró entero), el flujo operativo benchmark acumulado y el ROCE ajustado (mínimo 14,5 %) [4]. Premia crecimiento con retorno del capital, no tamaño a cualquier precio; la relación con el empleado mediano es de unas 100 veces [4].'
G['accionistas'] = [{'nombre': 'Massachusetts Financial Services', 'tipo': 'Institucional', 'pct': 5.08, 'variacion': 'Notificada el 25-nov-2025'},
                    {'nombre': 'Autocartera', 'tipo': 'Autocartera', 'pct': 6.0, 'variacion': '56,3 M de acciones en tesorería a 30-oct-2026 sobre 935,6 M emitidas; las recompras se amortizan [5]'}]
G['insiders'] = []
G['insiders_sin_operaciones'] = True
G['control_y_defensas'] = 'Capital disperso, sin accionista de control (el mayor declarado tiene el 5,1 %); una acción, un voto; sociedad de Jersey con el Código de Gobierno Corporativo del Reino Unido [3, 4].'
G['alertas'] = ['Ninguna relevante detectada tras revisar el informe anual 2026 y los RNS de 12 meses (cambio ordenado de presidente anunciado en abril de 2026).']
G['confianza'] = 'Media'
C['fuentes'] = [
 {'id': 1, 'titulo': 'Half-year Financial Report FY27', 'editor': 'Experian plc (RNS)', 'tipo': 'Primaria', 'fecha': '2026-11-18', 'url': 'https://www.investegate.co.uk/announcement/rns/experian--expn/half-year-financial-report/9880537'},
 {'id': 2, 'titulo': 'Full-year Financial Report FY26', 'editor': 'Experian plc (RNS)', 'tipo': 'Primaria', 'fecha': '2026-05-20', 'url': 'https://www.investegate.co.uk/announcement/rns/experian--expn/full-year-financial-report/9576492'},
 {'id': 3, 'titulo': 'Chair appointment (Adam Crozier)', 'editor': 'Experian plc (RNS)', 'tipo': 'Primaria', 'fecha': '2026-04-21', 'url': 'https://www.investegate.co.uk/announcement/rns/experian--expn/chair-appointment/9529298'},
 {'id': 4, 'titulo': 'Annual Report 2026 (informe de remuneración e informe de los consejeros)', 'editor': 'Experian plc', 'tipo': 'Primaria', 'fecha': '2026-06', 'url': 'https://www.experianplc.com/content/dam/marketing/global/plc/en/assets/documents/reports/2026/experian-annual-report-2026.pdf'},
 {'id': 5, 'titulo': 'Total Voting Rights (30-oct-2026)', 'editor': 'Experian plc (RNS)', 'tipo': 'Primaria', 'fecha': '2026-10-30', 'url': 'https://www.investegate.co.uk/announcement/rns/experian--expn/total-voting-rights/9851172'},
 {'id': 6, 'titulo': 'Director/PDMR Shareholding (4-ago-2026)', 'editor': 'Experian plc (RNS)', 'tipo': 'Primaria', 'fecha': '2026-08-04', 'url': 'https://www.investegate.co.uk/announcement/rns/experian--expn/director-pdmr-shareholding/9704577'},
]
C['huecos'] = [{'seccion': 'gobierno', 'campo': 'votaciones de la junta del 22-jul-2026 y antigüedad del resto del consejo', 'tipo': 'Complemento', 'intentos': '1) RNS «Results of AGM» (no descargado por presupuesto); 2) informe anual 2026: solo la política; 3) web de Experian: bloqueo antibot (Incapsula).', 'decision': 'Omitido'}]
w('C', C)

# ---------------- D. Mercado y valoración ----------------
bi = BOLSA['identificacion']
comp = json.load(open('/tmp/claude-0/tanda-experian/comp.json'))
cmap = {c['t']: c for c in comp}
def fila(t, nombre, pais, conv=1.0, per_div=1.0):
    c = cmap[t]
    ev = c['ev'] / 1e6 * conv; mc = c['mcap'] / 1e6 * conv
    return {'nombre': nombre, 'ticker': t, 'pais': pais, 'capitalizacion': round(mc), 'ev_ventas': round(c['ev'] / c['ventas'], 2),
            'ev_ebitda_ltm': round(c['ev'] / c['ebitda'], 1), 'ev_ebitda_ntm': None, 'per_ntm': round(c['per_ntm'] / per_div, 1),
            'crecimiento_pct': round(c['crec'] * 100, 1) if c['crec'] is not None else None,
            'margen_ebitda_pct': round(c['margen_ebitda'] * 100, 1) if c['margen_ebitda'] else None, 'roic_pct': None,
            'dn_ebitda': round((c['deuda'] - c['caja']) / c['ebitda'], 1), 'fcf_yield_pct': round(c['fcf'] / c['mcap'] * 100, 1)}
empresas = [fila('EFX', 'Equifax', 'US'), fila('TRU', 'TransUnion', 'US'), fila('FICO', 'Fair Isaac (FICO)', 'US'),
            fila('VRSK', 'Verisk Analytics', 'US'), fila('MCO', "Moody's", 'US'), fila('SPGI', 'S&P Global', 'US'),
            fila('MSCI', 'MSCI', 'US'), fila('FA', 'First Advantage', 'US'), fila('REL.L', 'RELX', 'GB', conv=FX, per_div=100)]
anual = []
pc = {c['anio']: c for c in BOLSA['cierres_ejercicio']}
fxc = {2020: 1.23597, 2021: 1.37603, 2022: 1.31225, 2023: 1.23692, 2024: 1.26430, 2025: 1.29465, 2026: 1.32415}
serie = []
for y in range(2020, 2027):
    p = pc[f'FY{y}']['precio_cierre'] * fxc[y] / 100
    per = round(p / bpa[y + 1], 1) if y + 1 in bpa else None
    serie.append({'anio': f'FY{y}', 'precio_cierre': round(p, 2), 'ev_ebitda_ntm': None, 'per_ntm': per, 'excluir': False})
D = {
 'identificacion': {
  'nombre': 'Experian plc', 'nombre_corto': 'Experian', 'ticker': 'EXPN (LSE)', 'isin': 'GB00B19NLV48', 'mercado': 'London Stock Exchange',
  'indice_referencia': 'FTSE 100', 'pais': 'Reino Unido (sociedad de Jersey, sede en Dublín)', 'pais_iso': 'GB', 'sector': 'Industria (GICS)',
  'industria': 'Servicios profesionales: datos y analítica de crédito', 'sede': 'Dublín (Irlanda)', 'fundacion': '1996', 'empleados': 25400,
  'web': 'www.experianplc.com', 'precio': PRECIO, 'fecha_precio': '2026-11-17', 'acciones': ACC, 'capitalizacion_publicada': None,
  'free_float_pct': None, 'max_52s': round(bi['max_52s'] * TC, 2), 'min_52s': round(bi['min_52s'] * TC, 2),
  'volumen_medio_diario': round(BOLSA['volumen_3m']['acciones_dia'] / 1e6, 2), 'proximos_resultados': '2027-02-02',
 },
 'consenso': {
  'guidance': 'FY27 (18-nov-2026): crecimiento orgánico 6-7 % (antes 6-8 %), inorgánico ≈1 %, divisa ≈+1 %, margen EBIT benchmark de al menos +50 pb, EBIT benchmark ≈ +10 %, BPA benchmark ≈ +12 % (≈201 c), intereses netos ≈250 M, tasa 25,5-26 %, ≈880 M de acciones medias, capex ≈8 % de ingresos [1]. Marco a medio plazo: orgánico de un dígito alto, margen +30-50 pb al año, capex hacia el 7 % [1].',
  'estimaciones': [
   {'periodo': 'FY2027e', 'ingresos': 9084, 'ebitda': None, 'ebit': None, 'bpa': 1.993, 'dpa': None, 'fuente': 'Yahoo Finance (earningsTrend, 18-nov-2026) [2]'},
   {'periodo': 'FY2028e', 'ingresos': 9822, 'ebitda': None, 'ebit': None, 'bpa': 2.266, 'dpa': None, 'fuente': 'Yahoo Finance (18 analistas, 18-nov-2026) [2]'},
  ],
  'recomendaciones': {'n_analistas': 18, 'comprar': 16, 'mantener': 1, 'vender': 1, 'po_medio': round(3715.85 * TC, 2), 'po_min': round(2461.51 * TC, 2), 'po_max': round(4798.27 * TC, 2)},
  'revisiones': 'BPA FY28e del consenso: 2,294 USD hace 90 días, 2,275 hace 30 y 2,266 hoy (recortes leves); FY27e 2,017 → 1,993 [2]. Objetivo medio 3.716 p (≈49,0 USD al 1,319) con 18 analistas: 5 compra fuerte, 11 compra, 1 mantener, 1 venta fuerte [2]. Cifras de Yahoo a la mañana del 18-nov: pueden no recoger aún los cambios tras el semestral.',
  'base_ebitda': None, 'ajuste_ebitda_pct_ventas': None, 'confianza': 'Media',
 },
 'bolsa': {**{k: BOLSA['bolsa'][k] for k in ['tipo_rentabilidad', 'rentabilidades', 'anual', 'volatilidad_pct', 'max_drawdown_pct']},
  'beta': 1.0, 'posicion_corta_pct': None,
  'comentario': 'Cierre del 17-nov-2026: 2.819 p (la sesión del 18-nov, día de resultados, seguía abierta a la hora del corte: 2.857 p a media sesión). Rango de 52 semanas 2.203-3.510 p; −14,3 % en un año con dividendos frente a +11,9 % del FTSE 100 (ISF.L) [3]. Beta 1,01 mensual a 5 años y 0,91 semanal a 2 años frente al FTSE 100; se usa 1,0. Volatilidad del 32,6 % y caída máxima del 41,9 % entre jul-2025 y feb-2026 (miedo a la IA y a la competencia en puntuación hipotecaria) [3]. Precios en peniques pasados a USD con el GBP/USD del BCE del 17-nov (1,3191) [4].',
  'contexto': None, 'confianza': 'Alta'},
 'multiplos_historicos': {'serie': serie, 'comentario': 'Precio de cierre de cada ejercicio (marzo) en peniques × GBP/USD del BCE de ese día; PER adelantado = ese precio ÷ BPA benchmark real del ejercicio siguiente [3, 4, A3]. FY26 sin PER: falta el BPA real del FY27.', 'confianza': 'Alta'},
 'comparables': {'criterio': 'Las mismas ocho cotizadas de datos y analítica de riesgo del informe del 14-oct (Equifax, TransUnion, FICO, Verisk, Moody\'s, S&P Global, MSCI, First Advantage) más RELX, cuyo negocio de riesgo (LexisNexis Risk) compite directamente con Experian en identidad, fraude y seguros. Cifras rehechas con Yahoo Finance al 18-nov-2026 (precio, valor de empresa y estimaciones posteriores a los resultados del 3T de las estadounidenses): PER NTM = precio ÷ media ponderada por meses de las estimaciones de BPA del ejercicio en curso y el siguiente [2]. Todos los BPA son ajustados (misma base que el benchmark de Experian). EV/EBITDA LTM con el EBITDA contable de Yahoo, no ajustado: solo orientativo; la comparación que cuenta es el PER.',
  'empresas': empresas, 'comentario': None, 'confianza': 'Media'},
 'transacciones': {'operaciones': [], 'comentario': 'No se buscaron transacciones; peso 0 en la valoración. Las compras propias de Experian (ClearSale, AtData, Own Up) no publican múltiplos comparables.', 'confianza': 'Baja'},
 'fuentes': [
  {'id': 1, 'titulo': 'Half-year Financial Report FY27 (FY27 modelling considerations)', 'editor': 'Experian plc (RNS)', 'tipo': 'Primaria', 'fecha': '2026-11-18', 'url': 'https://www.investegate.co.uk/announcement/rns/experian--expn/half-year-financial-report/9880537'},
  {'id': 2, 'titulo': 'Yahoo Finance quoteSummary (earningsTrend, financialData, recommendationTrend) de EXPN.L y comparables', 'editor': 'Yahoo Finance', 'tipo': 'Datos de mercado', 'fecha': '2026-11-18', 'url': 'https://finance.yahoo.com/quote/EXPN.L/analysis/'},
  {'id': 3, 'titulo': 'Históricos diarios EXPN.L, ISF.L, EXV2.DE (herramientas/bolsa.mjs)', 'editor': 'Yahoo Finance', 'tipo': 'Datos de mercado', 'fecha': '2026-11-17', 'url': 'https://finance.yahoo.com/quote/EXPN.L/history/'},
  {'id': 4, 'titulo': 'Tipos de cambio de referencia del euro (USD y GBP)', 'editor': 'Banco Central Europeo', 'tipo': 'Oficial', 'fecha': '2026-11-17', 'url': 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist.zip'},
  {'id': 5, 'titulo': 'Daily Treasury Par Yield Curve Rates (10 años: 5,10 % el 17-nov-2026)', 'editor': 'U.S. Department of the Treasury', 'tipo': 'Oficial', 'fecha': '2026-11-17', 'url': 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2026/all?type=daily_treasury_yield_curve&field_tdr_date_value=2026&page&_format=csv'},
  {'id': 6, 'titulo': 'Total Voting Rights (30-sep-2026: 882.595.885 acciones con voto)', 'editor': 'Experian plc (RNS)', 'tipo': 'Primaria', 'fecha': '2026-10-01', 'url': 'https://www.investegate.co.uk/announcement/rns/experian--expn/total-voting-rights/9799796'},
  {'id': 7, 'titulo': 'Implied ERP by month (T12m with sustainable payout)', 'editor': 'Aswath Damodaran (NYU Stern)', 'tipo': 'Académica', 'fecha': '2026-10', 'url': 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx'},
 ],
 'huecos': [],
}
w('D', D)

# ---------------- E. Sentimiento ----------------
E = json.load(open(os.path.join(ANT, 'E.json')))
ne = len(E['fuentes'])
E['fuentes'] += [
 {'id': ne + 1, 'titulo': 'Experian and Relx fall as City unease over AI impact outweighs buyback billions', 'editor': 'City A.M.', 'tipo': 'Prensa', 'fecha': '2026-05-20', 'url': 'https://www.cityam.com/?p=2426322'},
 {'id': ne + 2, 'titulo': 'Fair Isaac and TransUnion shares slide after hours on report of two-bureau mortgage credit plan', 'editor': 'AskTraders', 'tipo': 'Prensa', 'fecha': '2026-10-01', 'url': 'https://www.asktraders.com/analysis/fair-isaac-and-transunion-shares-slide-after-hours-on-report-of-two-bureau-mortgage-credit-plan/'},
]
E['sentimiento']['revisadas'].insert(0, {'plataforma': 'Prensa de mercado (AskTraders, Motley Fool) sobre el riesgo regulatorio hipotecario', 'fecha': '2026-10', 'n_comentarios': 2, 'tono': 'Negativo',
    'resumen': f'El debate de octubre gira en torno a la FHFA (VantageScore al precio de FICO y el posible paso a dos informes de crédito); se lee como presión de precios sobre las tres agencias [{ne + 2}].'})
E['sentimiento']['temas'].insert(0, {'tema': 'FHFA: puntuación hipotecaria y paso a dos informes («bi-merge»)', 'postura': 'Bajista', 'peso': 'Alto',
    'contraste': 'Fundado como riesgo de precio, pero acotado: la hipoteca de EE. UU. es una parte pequeña de los ingresos del grupo; la propia guía sube el BPA (≈ +12 %) aunque recorta los ingresos por los volúmenes hipotecarios.'})
E['sentimiento']['tendencia'] = 'Estable'
E['sentimiento']['lectura'] = 'El sentimiento sigue dividido: los profesionales siguen casi todos en comprar (16 de 18) y los particulares se mueven con cada titular de la FHFA y de la IA, que mueven a las tres agencias a la vez (−18,8 % en el mes hasta el 29-sep, +23,7 % en el mes hasta el 4-nov). El semestral no cambia el relato: cifras sólidas y guía de ingresos algo más baja. No entra en la valoración.'
E['_estado'] = 'Actualizada sobre la nota del 14-oct con la prensa de septiembre-noviembre de 2026.'
w('E', E)
print('ok', PRECIO, TC, [ (e['nombre'], e['per_ntm']) for e in empresas ])
print([(s['anio'], s['precio_cierre'], s['per_ntm']) for s in serie])

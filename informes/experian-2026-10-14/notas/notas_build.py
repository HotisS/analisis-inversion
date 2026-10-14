import json, sys
OUT = '/home/user/analisis-inversion/informes/experian-2026-10-14/notas/'
EFX = '/home/user/analisis-inversion/informes/equifax-2026-10-08/'
def w(n, d): json.dump(d, open(OUT + n + '.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
def H(sec, campo, tipo, intentos, decision='Omitido'):
    return {'seccion': sec, 'campo': campo, 'tipo': tipo, 'intentos': intentos, 'decision': decision}
FY26 = 'https://www.experianplc.com/newsroom/press-releases/2026/full-year-results-fy26'
FY25 = 'https://www.experianplc.com/newsroom/press-releases/2025/full-year-results-fy25'

# ---------------- A: cuentas ----------------
fA = [
 {'id': 1, 'titulo': 'Full-year results FY26 (ejercicio a 31-mar-2026)', 'editor': 'Experian plc', 'tipo': 'Primaria', 'fecha': '2026-05-20', 'url': FY26},
 {'id': 2, 'titulo': 'Full-year results FY25', 'editor': 'Experian plc', 'tipo': 'Primaria', 'fecha': '2025-05-14', 'url': FY25},
 {'id': 3, 'titulo': 'Full-year results FY23', 'editor': 'Experian plc', 'tipo': 'Primaria', 'fecha': '2023-05-17', 'url': 'https://www.experianplc.com/media/4693/experian-full-year-fy23-results.pdf'},
 {'id': 4, 'titulo': 'Full-year results FY22', 'editor': 'Experian plc', 'tipo': 'Primaria', 'fecha': '2022-05-18', 'url': 'https://www.experianplc.com/media/4409/experian-full-year-fy22-results-final.pdf'},
 {'id': 5, 'titulo': 'Full-year results FY20', 'editor': 'Experian plc', 'tipo': 'Primaria', 'fecha': '2020-05-20', 'url': 'https://www.experianplc.com/media/3991/experian-full-year-fy20-results_20-may-2020.pdf'},
 {'id': 6, 'titulo': 'Experian FY26 Profit Rises (BPA benchmark 179,8 c y básico 164,5 c)', 'editor': 'Nasdaq / RTTNews', 'tipo': 'Secundaria', 'fecha': '2026-05-20', 'url': 'https://www.nasdaq.com/articles/experian-fy26-profit-rises'},
 {'id': 7, 'titulo': 'ii view: Experian shares reverse despite $1bn share buyback (deuda neta 5.180 M USD)', 'editor': 'interactive investor', 'tipo': 'Secundaria', 'fecha': '2026-05-20', 'url': 'https://www.ii.co.uk/analysis-commentary/ii-view-experian-shares-reverse-despite-1bn-share-buyback-ii539115'},
 {'id': 8, 'titulo': 'Trading update, first quarter FY27', 'editor': 'Experian plc', 'tipo': 'Primaria', 'fecha': '2026-07-16', 'url': 'https://www.experianplc.com/newsroom/press-releases/2026/trading-update--first-quarter-fy27'},
 {'id': 9, 'titulo': 'Experian H2 earnings call highlights (margen EBIT benchmark 28,6 %)', 'editor': 'Yahoo Finance', 'tipo': 'Secundaria', 'fecha': '2026-05-20', 'url': 'https://finance.yahoo.com/markets/stocks/articles/experian-h2-earnings-call-highlights-100512191.html'},
 {'id': 10, 'titulo': 'Experian plc (LON:EXPN): cuenta de resultados y flujos', 'editor': 'Stock Analysis', 'tipo': 'Secundaria', 'fecha': '2026-10', 'url': 'https://stockanalysis.com/quote/lon/EXPN/financials/cash-flow-statement/'},
 {'id': 11, 'titulo': 'Experian overview (ingresos LTM 8.450 M USD; FY25 7.520; FY24 7.100)', 'editor': 'PitchBook', 'tipo': 'Secundaria', 'fecha': '2026-06-01', 'url': 'https://pitchbook.com/profiles/company/11901-43'},
 {'id': 12, 'titulo': 'Experian Q1 revenues grow on strong B2B momentum', 'editor': 'Hargreaves Lansdown', 'tipo': 'Secundaria', 'fecha': '2026-07-16', 'url': 'https://www.hl.co.uk/shares/stock-market-news/company--news/experian-q1-revenues-grow-on-strong-b2b-momentum,-organic-revenue-guidance-disappoints'},
]
def fila(p, ing, ebit, bpa, dpa=None, ebitda=None, am=None, fin=None, bn=None, acc=None):
    return {'periodo': p, 'ingresos': ing, 'coste_ventas': None, 'gastos_generales': None, 'ebitda': ebitda, 'amortizaciones': am,
            'ebit': ebit, 'resultado_financiero': fin, 'bai': (ebit + fin) if (ebit and fin) else None, 'impuestos': None, 'minoritarios': None,
            'beneficio_neto': bn, 'gastos_financieros': None, 'participadas_en_ebitda': None, 'no_recurrentes_en_ebitda': None,
            'bpa': bpa, 'dpa': dpa, 'dpa_extraordinario': 0, 'acciones_diluidas': acc}
cuenta = [
 fila('FY2019', 4861, 1355, 0.98, None, None, None, None, 892, 910),
 fila('FY2020', 5179, 1429, 1.03, None, None, None, None, 937, 909),
 fila('FY2021', 5372, 1455, 1.029, None, None, None, None, 935, 909),
 fila('FY2022', 6288, 1724, 1.245, None, None, None, None, 1137, 913),
 fila('FY2023', 6619, 1840, 1.351, None, None, None, None, 1236, 915),
 fila('FY2024', 7097, 1949, 1.455, 0.585, None, None, -150, 1333, 916),
 fila('FY2025', 7516, 2105, 1.569, 0.625, 2595, 490, -170, 1438, 916),
 fila('FY2026', 8450, 2411, 1.798, 0.6925, 3050, 639, -165, 1645, 915),
]
A = {
 '_estado': 'Cerrada con lo que da la búsqueda web (entorno sin descarga de documentos). Cifras benchmark (las que usa la empresa: sin amortización de intangibles adquiridos ni partidas no recurrentes).',
 'negocio': {
  'descripcion': 'Experian plc (Jersey, sede operativa en Dublín, cotiza en Londres) es el mayor buró de crédito del mundo por ingresos: 8.450 M USD en el ejercicio a marzo de 2026 [1, 11]. Vende datos de crédito y analítica a empresas (B2B: Financial Services, Decisioning, Marketing, Health, Automotive) y servicios directos al consumidor (Consumer Services: informes y puntuación gratuitos y de pago, comparador de crédito y seguros) en Norteamérica, Latinoamérica (Serasa en Brasil), Reino Unido e Irlanda, y EMEA/Asia-Pacífico [1].',
  'como_gana_dinero': 'Cobra por consulta (informe o puntuación de crédito cada vez que un prestamista decide), por suscripción de software de decisión y analítica, por campañas de marketing con datos y, en Consumer Services, por suscripciones y comisiones de referencia (cuando un consumidor contrata un crédito o un seguro a través de su comparador). Más del 90 % de los ingresos viene de datos propios según Stifel.',
  'segmentos': [], 'segmentos_nota': 'La desagregación por segmento y región del FY26 no se pudo leer (los comunicados no abren en este entorno). Norteamérica aportó unos 5.587 M USD en el FY26 según el informe de Equifax del 8-oct.',
  'geografias': [], 'geografias_criterio': None, 'clientes': None,
  'kpis': [{'nombre': 'Crecimiento orgánico', 'valor': '8 % FY26; 7 % en el 1T FY27 (B2B 9 %, Consumer Services 2 %)', 'fuente': '[1, 8]'},
           {'nombre': 'ROCE', 'valor': '17,2 % FY26 (16,6 % FY25)', 'fuente': '[1, 2]'},
           {'nombre': 'Deuda neta / EBITDA benchmark', 'valor': '1,7x FY26 (objetivo 2,0-2,5x)', 'fuente': '[1]'}],
  'confianza': 'Media'},
 'financieros': {
  'cuenta': cuenta,
  'notas_de_origen': 'Ingresos totales a tipo de cambio real; EBIT y BPA benchmark (definición de la empresa) [1, 2, 3, 4, 5, 6, 11]. BPA FY2021 calculado hacia atrás desde el +21 % del FY22 (124,5 c) [4]. EBITDA FY25-26 derivado de deuda neta / EBITDA (1,8x y 1,7x) [1, 2, 7]; amortización = EBITDA − EBIT. Beneficio benchmark = BPA × acciones (estimación propia). Ejercicio con cierre en marzo, etiquetado por el año en que termina (FY2026 = abril 2025-marzo 2026).',
  'bpa_ajustado': [{'periodo': 'FY2019', 'bpa_ajustado': 0.98, 'fuente': '[5]'}, {'periodo': 'FY2020', 'bpa_ajustado': 1.03, 'fuente': '[5]'},
                   {'periodo': 'FY2021', 'bpa_ajustado': 1.029, 'fuente': '[4] (calculado)'}, {'periodo': 'FY2022', 'bpa_ajustado': 1.245, 'fuente': '[3, 4]'},
                   {'periodo': 'FY2023', 'bpa_ajustado': 1.351, 'fuente': '[3]'}, {'periodo': 'FY2024', 'bpa_ajustado': 1.455, 'fuente': '[2]'},
                   {'periodo': 'FY2025', 'bpa_ajustado': 1.569, 'fuente': '[2]'}, {'periodo': 'FY2026', 'bpa_ajustado': 1.798, 'fuente': '[1, 6]'}],
  'ltm': None, 'ltm_nota': 'El último informe completo es el anual de marzo de 2026; el 1T FY27 solo da crecimientos de ingresos [8].',
  'cambios_perimetro': [{'periodo': 'FY2026', 'descripcion': 'Compras de ClearSale (Brasil) y otras: aportación inorgánica de unos 3-4 puntos de crecimiento (13 % total frente a 8 % orgánico, con algo de divisa) [1].'}],
  'comentario': 'Diez años de crecimiento sostenido: ingresos de 4.861 M USD (FY19) a 8.450 M (FY26), un 8,2 % anual, y BPA benchmark de 98 a 180 centavos (+9,1 % anual). El margen EBIT benchmark sube de 27,9 % a 28,6 % (con la caída de 2021-23 por la inversión en la nube y en Consumer Services). El BPA básico del FY26 (164,5 c) queda un 8 % por debajo del benchmark: la diferencia es sobre todo la amortización de intangibles adquiridos [6].',
  'ajustes': 'Se usa el benchmark de la empresa en toda la serie (misma base que el PER y el consenso).',
  'confianza': 'Baja'},
 'trimestres': {'items': [
   {'periodo': '1T FY27', 'ingresos': None, 'crecimiento_pct': 10, 'crecimiento_organico_pct': 7, 'ebitda': None, 'margen_ebitda_pct': None, 'bpa': None, 'vs_consenso': 'Inferior'}],
  'notas_de_origen': 'Trading update del 16-jul-2026: +10 % a tipos reales, +8 % a tipos constantes, +7 % orgánico; B2B +9 %, Consumer Services +2 % (fin de dos contratos de protección tras brechas de datos; sin ellos, +8 %) [8, 12]. La acción cayó en torno a un 5,7 % porque la guía orgánica (6-8 %) decepcionó [12].',
  'ultima_presentacion': '2026-07-16', 'proxima_publicacion': '2026-11-18 (resultados semestrales; fecha de terceros, por confirmar)', 'confianza': 'Baja'},
 'balance': {'historico': [
   {'periodo': 'FY2025', 'activo_total': None, 'activo_corriente': None, 'pasivo_corriente': None, 'pasivo_total': None, 'fondo_comercio': None, 'intangibles': None, 'inmovilizado_material': None, 'existencias': 0, 'clientes': None, 'proveedores': None, 'activos_contrato': None, 'pasivos_contrato': None, 'caja': 250, 'deuda_financiera': 4917, 'arrendamientos': 0, 'patrimonio_neto': 5000, 'minoritarios': None, 'reservas': None},
   {'periodo': 'FY2026', 'activo_total': None, 'activo_corriente': None, 'pasivo_corriente': None, 'pasivo_total': None, 'fondo_comercio': None, 'intangibles': None, 'inmovilizado_material': None, 'existencias': 0, 'clientes': None, 'proveedores': None, 'activos_contrato': None, 'pasivos_contrato': None, 'caja': 300, 'deuda_financiera': 5480, 'arrendamientos': 0, 'patrimonio_neto': 5400, 'minoritarios': None, 'reservas': None}],
  'intermedio': None,
  'notas_de_origen': 'Deuda neta FY26 5.180 M USD (+11 %) [7]; FY25 ≈4.670 M (5.180/1,11). El reparto entre deuda bruta y caja y el patrimonio neto son estimaciones propias de orden de magnitud (no se pudo leer el balance); el capital invertido que resulta (≈10.600 M) cuadra con el ROCE publicado del 17,2 % [1].',
  'vencimientos': [], 'vencimientos_nota': None, 'liquidez': None,
  'rating': 'Baa1 / A- (Moody\'s / S&P), según los folletos de bonos anteriores; no comprobado en esta sesión.',
  'coste_deuda_pct': 4.0, 'vida_media_anios': None, 'otros_pasivos': None,
  'comentario': 'Deuda neta de 1,7 veces el EBITDA benchmark, por debajo de su objetivo de 2,0-2,5 veces: hay margen para más recompras o compras sin tensar el balance [1].',
  'confianza': 'Baja'},
 'flujos': {'historico': [
   {'periodo': 'FY2025', 'flujo_operativo': 2270, 'capex': 680, 'pagos_arrendamientos': None, 'adquisiciones': None, 'desinversiones': None, 'dividendos': 560, 'recompras': None, 'emision_acciones': None, 'intereses_en_financiacion': 0},
   {'periodo': 'FY2026', 'flujo_operativo': 2950, 'capex': 760, 'pagos_arrendamientos': None, 'adquisiciones': None, 'desinversiones': None, 'dividendos': 590, 'recompras': 725, 'emision_acciones': None, 'intereses_en_financiacion': 0}],
  'intermedio': None,
  'notas_de_origen': 'Flujo libre FY26 de 2.190 M USD según Stock Analysis (flujo operativo − capex) [10]; flujo operativo benchmark (después de capex) de más de 2.200 M [9]; recompras de 725 M USD en el FY26 [1]. El capex (≈9 % de ventas) y los dividendos son estimaciones propias que cuadran esas cifras.',
  'comentario': 'Conversión de caja alta: el flujo operativo benchmark (más de 2.200 M) supera el 90 % del EBIT benchmark [9].', 'confianza': 'Baja'},
 'calidad': None, 'rentabilidad': None,
 'capital': {'politica': 'Dividendo progresivo (69,25 c en el FY26, +11 %) y recompras: 725 M USD en el FY26 y un programa nuevo de 1.000 M USD vigente hasta el 30-jun-2027, que se ejecuta desde julio de 2026 [1, 7].', 'adquisiciones': 'Compras frecuentes de tamaño medio (ClearSale en Brasil, IllionAU en Australia en ejercicios anteriores) [1].', 'comentario': None, 'confianza': 'Media'},
 'fuentes': fA,
 'huecos': [
  H('financieros', 'coste de ventas, gastos generales, impuestos, BAI y amortizaciones FY2019-FY2024', 'Núcleo', '1) Comunicado FY26 en experianplc.com: no abre (solo búsqueda web); 2) Investegate/FCA NSM: misma limitación; 3) Stock Analysis: la búsqueda solo devuelve cifras sueltas.'),
  H('balance', 'balance completo (fondo de comercio, circulante, patrimonio exacto) FY2019-FY2026', 'Núcleo', '1) Comunicado FY26; 2) informe anual FY26; 3) Stock Analysis: no legibles desde la búsqueda. Deuda neta FY26 sí [7].', 'Estimado'),
  H('flujos', 'estado de flujos FY2019-FY2024 y capex exacto FY2025-26', 'Núcleo', '1) Comunicados anuales; 2) Stock Analysis (solo FCF 2.190); 3) prensa: solo flujo benchmark >2.200 M.', 'Estimado'),
  H('negocio', 'segmentos y geografías FY2022-FY2026', 'Complemento', '1) Comunicado FY26; 2) resumen de la conferencia; 3) nota de Equifax (solo Norteamérica).')],
}
w('A', A)

# ---------------- B: sector (de la nota de Equifax del 8-oct) ----------------
B0 = json.load(open(EFX + 'notas/B.json', encoding='utf-8'))
B = {'sector': B0['sector'], 'competencia': B0['competencia'], 'fuentes': B0['fuentes'],
     'huecos': [h for h in B0.get('huecos', []) if h.get('seccion', '').startswith('Sector')]}
comp = B['competencia']
comp['competidores'] = [c for c in comp['competidores'] if 'Experian' not in c['nombre']]
comp['competidores'].insert(0, {'nombre': 'Equifax', 'pais': 'EE. UU.', 'ticker': 'EFX', 'ingresos': 6074, 'cuota_pct': 31.8, 'margen_ebit_pct': None,
    'comentario': 'Segunda agencia global; su ventaja es Workforce Solutions (verificación de empleo e ingresos, 209 M de registros activos), donde Experian es mucho menor. Cifras de su informe del 8-oct [1].'})
comp['cuota_pct'] = 44.2
comp['posicion'] = '1.ª de las tres agencias de crédito globales por ingresos: 44,2 % de los 19.096 M USD que suman Experian, Equifax y TransUnion en su último ejercicio (estimación propia de la nota de Equifax del 8-oct) [1, 9, 13]. Líder en Reino Unido y en Brasil (Serasa); en EE. UU. compite a la par con Equifax y TransUnion.'
B['historia'] = {'resumen': 'Experian nace en 1996, cuando Great Universal Stores (GUS) compra la división de información de crédito de TRW en EE. UU. y la une a CCN, su buró británico. En 2006 GUS la separa y sale a bolsa en Londres. Compró Serasa (Brasil) en 2007 y la completó en 2012. Brian Cassin es consejero delegado desde 2014. En 2023-26 sumó compras en Latinoamérica y Australia y pasó a Consumer Services gratuitos con comparador de crédito.', 'hitos': [], 'confianza': 'Media'}
B['esg'] = {'calificaciones': [], 'materialidad': 'Seguridad y exactitud de los datos de los consumidores (la brecha de Serasa de 2021 y los litigios en EE. UU. son el riesgo reputacional principal), regulación del crédito al consumo (CFPB, FCA, LGPD en Brasil) y uso de inteligencia artificial en la decisión de crédito.', 'controversias': 'Reclamaciones de consumidores ante la CFPB, compartidas con los otros dos burós.', 'confianza': 'Baja'}
w('B', B)

# ---------------- C: gobierno ----------------
fC = [{'id': 1, 'titulo': 'Experian plc: Board of directors', 'editor': 'Experian plc', 'tipo': 'Primaria', 'fecha': '2026', 'url': 'https://www.experianplc.com/about-us/our-leadership/board-of-directors'},
      {'id': 2, 'titulo': 'Full-year results FY26', 'editor': 'Experian plc', 'tipo': 'Primaria', 'fecha': '2026-05-20', 'url': FY26}]
C = {'directivos': {'equipo': [
   {'nombre': 'Brian Cassin', 'cargo': 'Consejero delegado (CEO)', 'desde': '2014', 'participacion_pct': None, 'trayectoria': 'Director financiero de Experian (2012-2014) y antes banca de inversión en Greenhill; con él los ingresos pasan de unos 4.800 M USD a 8.450 M y el BPA benchmark casi se duplica [1, 2].'},
   {'nombre': 'Lloyd Pitchford', 'cargo': 'Director financiero (CFO)', 'desde': '2014', 'participacion_pct': None, 'trayectoria': 'Antes director financiero de Intertek y de BG Group en partes de su carrera [1].'}],
  'historial_guidance': 'Cumplidora: el FY26 terminó con un 8 % orgánico y 60 puntos básicos de mejora de margen a tipos constantes, por encima de la guía; el BPA benchmark (179,8 c) quedó en línea con el consenso que recopila la empresa (179,2 c) [2].',
  'comentario': 'Equipo estable desde hace doce años; el riesgo es de sucesión, no de ejecución.', 'confianza': 'Media'},
 'gobierno': {'consejo': [{'nombre': 'Mike Rogers', 'cargo': 'Presidente no ejecutivo', 'tipo': 'Independiente', 'desde': '2017', 'comisiones': 'Nombramientos'},
                          {'nombre': 'Brian Cassin', 'cargo': 'Consejero delegado', 'tipo': 'Ejecutivo', 'desde': '2014', 'comisiones': '—'},
                          {'nombre': 'Lloyd Pitchford', 'cargo': 'Director financiero', 'tipo': 'Ejecutivo', 'desde': '2014', 'comisiones': '—'}],
  'presidente_ceo_separados': True, 'presidente_ejecutivo': False, 'consejero_coordinador': True, 'una_accion_un_voto': True,
  'operaciones_vinculadas_relevantes': False, 'variable_ligado_rentabilidad': True, 'auditoria_independiente': True, 'insiders_sin_operaciones': None,
  'accionista_control': False, 'presidente_vinculado_control': False, 'cambios_cupula_24m': False,
  'voto_remuneracion_pct': None, 'voto_remuneracion_contra_pct': None, 'voto_remuneracion_contra_libre_pct': None, 'voto_cupula_pct': None,
  'remuneracion_ceo': None, 'remuneracion': 'Variable a largo plazo ligado al crecimiento del BPA benchmark, al ROCE y al flujo de caja (política de remuneración de Experian) [1].',
  'accionistas': [], 'insiders': None, 'control_y_defensas': 'Capital disperso, sin accionista de control; sociedad de Jersey con gobierno según el Código de Gobierno Corporativo del Reino Unido [1].',
  'alertas': [], 'confianza': 'Baja'},
 'fuentes': fC,
 'huecos': [H('gobierno', 'votaciones de la junta de julio de 2026, remuneración del CEO, participaciones de directivos y consejo completo', 'Complemento', '1) Informe anual FY26; 2) resultados de la junta (RNS); 3) búsqueda web: presupuesto de búsquedas reservado a lo que mueve la decisión.')]}
w('C', C)

# ---------------- D: mercado ----------------
E0 = json.load(open(EFX + 'datos-v2.json', encoding='utf-8'))
emp = [c for c in E0['comparables']['empresas'] if c['nombre'] != 'Experian']
emp.insert(0, {'nombre': 'Equifax', 'ticker': 'EFX', 'pais': 'US', 'capitalizacion': 16730, 'ev_ventas': None, 'ev_ebitda_ltm': None, 'ev_ebitda_ntm': 9.6, 'per_ntm': 17.8, 'crecimiento_pct': None, 'margen_ebitda_pct': None, 'roic_pct': None, 'dn_ebitda': None, 'fcf_yield_pct': None})
fD = [
 {'id': 1, 'titulo': 'Transaction in Own Shares (2-oct-2026: 490.977 acciones a 2.457,51 p de media)', 'editor': 'Experian plc / Investegate', 'tipo': 'Primaria', 'fecha': '2026-10-02', 'url': 'https://www.investegate.co.uk/announcement/rns/experian--expn/transaction-in-own-shares/9787918'},
 {'id': 2, 'titulo': 'Transaction in Own Shares (septiembre de 2026: 2.680-2.800 p)', 'editor': 'Experian plc / Investegate', 'tipo': 'Primaria', 'fecha': '2026-09', 'url': 'https://www.investegate.co.uk/announcement/rns/experian--expn/transaction-in-own-shares/9780739'},
 {'id': 3, 'titulo': 'Experian (LON:EXPN) forecast y alertas de objetivos (media 4.087 p, 6 analistas)', 'editor': 'MarketBeat', 'tipo': 'Secundaria', 'fecha': '2026-07-29', 'url': 'https://www.marketbeat.com/instant-alerts/experian-lonexpn-sets-new-1-year-low-heres-why-2026-07-29/'},
 {'id': 4, 'titulo': 'Rothschild Redb forecasts stronger earnings for Experian (BPA FY27 1,98 y FY28 2,28 USD)', 'editor': 'MarketBeat', 'tipo': 'Secundaria', 'fecha': '2025-10-17', 'url': 'https://www.marketbeat.com/instant-alerts/rothschild-redb-forecasts-stronger-earnings-for-experian-2025-10-17'},
 {'id': 5, 'titulo': 'Informe de Equifax del 8-oct-2026: comparables (MarketScreener y Stock Analysis al 7-oct)', 'editor': 'Este repositorio', 'tipo': 'Secundaria', 'fecha': '2026-10-08', 'url': 'informes/equifax-2026-10-08/datos-v2.json'},
 {'id': 6, 'titulo': 'Experian overview (precio 35,99 USD y capitalización 32.100 M USD a 1-jun-2026)', 'editor': 'PitchBook', 'tipo': 'Secundaria', 'fecha': '2026-06-01', 'url': 'https://pitchbook.com/profiles/company/11901-43'},
 {'id': 7, 'titulo': 'Informe de Group 1 Automotive del 14-oct-2026 (bono de EE. UU. a 10 años 5,22 %, FRED DGS10)', 'editor': 'Este repositorio', 'tipo': 'Secundaria', 'fecha': '2026-10-14', 'url': 'informes/group-1-automotive-2026-10-14/datos.json'},
 {'id': 8, 'titulo': 'Damodaran, implied ERP by month (oct-2026: 4,20 %)', 'editor': 'NYU Stern', 'tipo': 'Primaria', 'fecha': '2026-10', 'url': 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx'},
 {'id': 10, 'titulo': 'Trading update, first quarter FY27 (guía FY27)', 'editor': 'Experian plc', 'tipo': 'Primaria', 'fecha': '2026-07-16', 'url': 'https://www.experianplc.com/newsroom/press-releases/2026/trading-update--first-quarter-fy27'},
 {'id': 9, 'titulo': 'Experian (GB:EXPN) earnings: próximos resultados 18-nov-2026', 'editor': 'TipRanks', 'tipo': 'Secundaria', 'fecha': '2026-10', 'url': 'https://www.tipranks.com/stocks/GB:EXPN/earnings'},
]
cierres = {'FY2019': (2080, 1.30), 'FY2020': (2250, 1.24), 'FY2021': (2500, 1.38), 'FY2022': (2950, 1.31), 'FY2023': (2710, 1.235), 'FY2024': (3450, 1.26), 'FY2025': (3580, 1.29), 'FY2026': (2600, 1.33)}
serie = [{'anio': k, 'precio_cierre': round(p * fx / 100, 2), 'ev_ebitda_ntm': None, 'per_ntm': None, 'excluir': False} for k, (p, fx) in cierres.items()]
D = {
 'identificacion': {'nombre': 'Experian plc', 'nombre_corto': 'Experian', 'ticker': 'EXPN (LSE)', 'isin': 'GB00B19NLV48', 'mercado': 'London Stock Exchange', 'indice_referencia': 'FTSE 100',
   'pais': 'Reino Unido (sociedad de Jersey, sede en Dublín)', 'pais_iso': 'GB', 'sector': 'Industria (GICS)', 'industria': 'Servicios profesionales: datos y analítica de crédito',
   'sede': 'Dublín (Irlanda)', 'fundacion': '1996', 'empleados': 25000, 'web': 'www.experianplc.com',
   'precio': 33.18, 'fecha_precio': '2026-10-02', 'acciones': 905, 'capitalizacion_publicada': None, 'free_float_pct': None, 'max_52s': None, 'min_52s': None,
   'volumen_medio_diario': None, 'proximos_resultados': '2026-11-18'},
 'consenso': {'guidance': 'FY27: crecimiento orgánico del 6-8 %, inorgánico de ≈1 %, divisa +1-2 %, margen +≈50 pb orgánico a tipos constantes y BPA benchmark con crecimiento de dos dígitos [10].',
   'estimaciones': [
     {'periodo': 'FY2027e', 'ingresos': None, 'ebitda': None, 'ebit': None, 'bpa': 1.98, 'dpa': None, 'fuente': 'Rothschild Redburn (una casa, oct-2025, anterior a los resultados FY26) [4]'},
     {'periodo': 'FY2028e', 'ingresos': None, 'ebitda': None, 'ebit': None, 'bpa': 2.28, 'dpa': None, 'fuente': 'Rothschild Redburn (una casa) [4]'}],
   'recomendaciones': {'n_analistas': 6, 'comprar': 6, 'mantener': 0, 'vender': 0, 'po_medio': 55.18, 'po_min': 47.25, 'po_max': 62.1},
   'revisiones': 'Recortes de precio objetivo tras los resultados de mayo y el 1T (Deutsche Bank de 4.550 a 4.000 p; UBS 3.700 p; Jefferies 4.600 p). Objetivo medio 4.087 p (≈55,2 USD al 1,35) con 6 analistas, todos en comprar [3]. Una sola fuente de estimaciones de BPA, dirección conocida pero cifras de antes del FY26.',
   'base_ebitda': None, 'ajuste_ebitda_pct_ventas': None, 'confianza': 'Baja'},
 'bolsa': {'tipo_rentabilidad': None, 'rentabilidades': [], 'anual': [], 'beta': 0.9, 'volatilidad_pct': None, 'max_drawdown_pct': None, 'posicion_corta_pct': None,
   'comentario': 'Precio en mínimos de dos años: 2.457,5 p el 2-oct-2026 (recompras de la empresa), desde 2.800 p a mediados de septiembre y unos 3.600-3.800 p a finales de 2025; la caída llegó al 32 % en el primer trimestre de 2026 por el miedo a la inteligencia artificial [1, 2]. Beta: supuesto de 0,9 (no se pudo calcular con bolsa.mjs).', 'confianza': 'Baja'},
 'multiplos_historicos': {'serie': serie, 'comentario': 'Precios de cierre de marzo en peniques (aproximados) pasados a USD con el GBP/USD de cada cierre; ver huecos.', 'confianza': 'Baja'},
 'comparables': {'criterio': __import__('re').sub(r'\[[0-9, ]+\]', '[5]', E0['comparables']['criterio']).replace('Equifax figura en', 'Muestra del informe de Equifax (8-oct); Equifax figura en') + ' Para Experian se quita la propia Experian y se añade Equifax con sus cifras del mismo informe [5].',
   'empresas': emp, 'comentario': None, 'confianza': 'Media'},
 'transacciones': {'operaciones': [], 'comentario': 'No se buscaron transacciones (presupuesto); peso 0 en la valoración.', 'confianza': 'Baja'},
 'fuentes': fD,
 'huecos': [
   H('identificacion', 'precio de cierre del 13-oct-2026, rango de 52 semanas y volumen', 'Núcleo', '1) bolsa.mjs y Yahoo: sin red; 2) búsqueda «Experian share price October 2026»: sin cotización; 3) RNS de recompra: último dato el 2-oct (2.457,51 p).', 'Estimado'),
   H('identificacion', 'acciones en circulación exactas', 'Núcleo', '1) comunicado FY26; 2) RNS de derechos de voto; 3) búsqueda: no aparecen. Se usan 905 M (≈915 M de marzo menos las recompras).', 'Estimado'),
   H('identificacion', 'tipo de cambio GBP/USD a la fecha de corte', 'Núcleo', '1) BCE: sin red; 2) búsqueda: no se intentó por presupuesto; 3) se usa 1,35 (0,0135 USD por penique), coherente con PitchBook de junio.', 'Estimado'),
   H('multiplos_historicos', 'precios de cierre de marzo FY2019-FY2026', 'Núcleo', '1) bolsa.mjs: sin red; 2) búsquedas: sin series; 3) valores aproximados del analista (±5 %).', 'Estimado'),
   H('consenso', 'consenso actual de BPA FY27-FY29 (MarketScreener / empresa)', 'Núcleo', '1) MarketScreener: WebFetch no funciona; 2) búsqueda de consenso: solo una casa de oct-2025; 3) TipRanks: solo trimestral.')]}
w('D', D)

# ---------------- E: sentimiento ----------------
fE = [
 {'id': 1, 'titulo': 'Experian: mispriced and misunderstood', 'editor': 'Trustnet', 'tipo': 'Prensa', 'fecha': '2026-08', 'url': 'https://www.trustnet.com/news/13476070/experian-mispriced-and-misunderstood'},
 {'id': 2, 'titulo': 'ii view: Experian\'s North America sales slow again', 'editor': 'interactive investor', 'tipo': 'Prensa', 'fecha': '2026-07', 'url': 'https://www.ii.co.uk/analysis-commentary/ii-view-experians-north-america-sales-slow-again-ii539702'},
 {'id': 3, 'titulo': 'Stifel: caída del 23 % exagerada; más del 90 % de ingresos de datos propios', 'editor': 'Proactive Investors', 'tipo': 'Prensa', 'fecha': '2026-08', 'url': 'https://www.proactiveinvestors.co.uk/companies/news/1092881'},
 {'id': 4, 'titulo': "Experian's Billion-Dollar Pacifier Fails to Calm the AI Panic", 'editor': 'Moby / Yahoo Finance', 'tipo': 'Foros y redes', 'fecha': '2026-07', 'url': 'https://finance.yahoo.com/markets/stocks/articles/experians-billion-dollar-pacifier-fails-165207991.html'},
 {'id': 5, 'titulo': 'Foro de Experian en LSE.co.uk (hilos tras resultados)', 'editor': 'LSE.co.uk', 'tipo': 'Foros y redes', 'fecha': '2026-05', 'url': 'https://www.lse.co.uk/profiles/crossley/?page=6'},
 {'id': 6, 'titulo': 'Experian Q1 revenue rises 10% as B2B and Latin America drive growth (blog de inversor particular)', 'editor': 'joshthompson.co.uk', 'tipo': 'Foros y redes', 'fecha': '2026-07', 'url': 'https://joshthompson.co.uk/investing/experian-q1-trading-update-revenue-growth-fy27/'},
]
E = {'sentimiento': {'tono': 'Dividido', 'tendencia': 'Empeora',
  'revisadas': [
   {'plataforma': 'Trustnet (gestor de fondos)', 'fecha': '2026-08', 'n_comentarios': 1, 'tono': 'Positivo', 'resumen': 'La ve castigada sin razón en la venta general por la inteligencia artificial: crecimiento del 8 % y contratos renovados a 4-10 años en vez de 3 [1].'},
   {'plataforma': 'interactive investor (análisis y comentarios)', 'fecha': '2026-07', 'n_comentarios': 2, 'tono': 'Neutro', 'resumen': 'Destaca la desaceleración de Norteamérica y que el efecto de la inteligencia artificial sobre el negocio sigue siendo difícil de prever [2].'},
   {'plataforma': 'Proactive Investors (nota de Stifel)', 'fecha': '2026-08', 'n_comentarios': 1, 'tono': 'Positivo', 'resumen': 'Mantiene comprar: más del 90 % de los ingresos sale de datos propios, lo que limita el riesgo de desintermediación; la caída en el año es exagerada [3].'},
   {'plataforma': 'Moby (Yahoo Finance, comentario de particulares)', 'fecha': '2026-07', 'n_comentarios': 1, 'tono': 'Negativo', 'resumen': 'Lee la recompra de 1.000 M USD como gesto defensivo que no calma el «pánico a la IA» [4].'},
   {'plataforma': 'Foro LSE.co.uk y blogs de particulares', 'fecha': '2026-07', 'n_comentarios': 6, 'tono': 'Dividido', 'resumen': 'Unos compran en mínimos de dos años por el PER más bajo en una década; otros temen que modelos de puntuación alternativos y la IA abaraten la consulta de crédito [5, 6].'}],
  'temas': [
   {'tema': 'La inteligencia artificial como sustituto de los datos de crédito', 'postura': 'Bajista', 'peso': 'Alto', 'contraste': 'Las cifras no lo muestran todavía: B2B crece al 9 % orgánico en el 1T FY27 y el margen sube. El dato propio (historial de pagos que aportan los prestamistas) no se replica con IA; la amenaza real es de precio en las consultas de menor valor.'},
   {'tema': 'Desaceleración de Consumer Services y de Norteamérica', 'postura': 'Bajista', 'peso': 'Medio', 'contraste': 'Fundada en parte: Consumer Services crece solo un 2 %, pero por el fin de dos contratos de protección tras brechas de datos; sin ellos el grupo crece al 8 %.'},
   {'tema': 'Recompras y valoración en mínimos', 'postura': 'Alcista', 'peso': 'Medio', 'contraste': 'El PER sobre el BPA del FY28e es de unas 15 veces, la mitad de la mediana de cinco años; la recompra compra un 3 % del capital al año.'}],
  'lectura': 'El sentimiento está dividido y empeora desde el verano: la conversación gira casi solo en torno al riesgo de la inteligencia artificial, no a las cifras, que siguen creciendo al 7-8 % orgánico con margen al alza. Los analistas profesionales siguen en comprar y los particulares dudan. Esa distancia entre cifras y relato es típica de una capitulación parcial: no anticipa un riesgo que el análisis no recoja, pero sí que el catalizador (los semestrales de noviembre) necesita algo más que cumplir la guía para cambiar el tono. No entra en la valoración.',
  'confianza': 'Baja'},
 'fuentes': fE, 'huecos': [H('sentimiento', 'Reddit, Stocktwits y Seeking Alpha', 'Complemento', '1) búsqueda web: no devuelve hilos de Reddit; 2) Stocktwits y SA RSS: sin red; 3) foro LSE.co.uk: solo índice de perfiles.')]}
w('E', E)
print('ok')

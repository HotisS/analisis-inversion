import json
OUT = '/home/user/analisis-inversion/informes/fair-isaac-2026-10-14/notas/'
def w(n, d): json.dump(d, open(OUT + n + '.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
def H(sec, campo, tipo, intentos, decision='Omitido'):
    return {'seccion': sec, 'campo': campo, 'tipo': tipo, 'intentos': intentos, 'decision': decision}
SEC = 'https://www.sec.gov/Archives/edgar/data/'

# ---------------- A: cuentas ----------------
fA = [
 {'id': 1, 'titulo': 'Form 10-K FY2025 (ejercicio a 30-sep-2025)', 'editor': 'Fair Isaac Corp. (SEC)', 'tipo': 'Primaria', 'fecha': '2025-11-06', 'url': SEC + '814547/000081454725000030/fico-20250930.htm'},
 {'id': 2, 'titulo': 'Comunicado de resultados 4T FY2025 (8-K, Ex. 99.1)', 'editor': 'Fair Isaac Corp. (SEC)', 'tipo': 'Primaria', 'fecha': '2025-11-06', 'url': SEC + '814547/000081454725000026/exhibit991erq42025.htm'},
 {'id': 3, 'titulo': 'Comunicado de resultados 1T FY2026 (8-K, Ex. 99.1)', 'editor': 'Fair Isaac Corp. (SEC)', 'tipo': 'Primaria', 'fecha': '2026-01-28', 'url': SEC + '814547/000081454726000010/exhibit991erq12026.htm'},
 {'id': 4, 'titulo': 'Comunicado de resultados 2T FY2026 (8-K, Ex. 99.1)', 'editor': 'Fair Isaac Corp. (SEC)', 'tipo': 'Primaria', 'fecha': '2026-04-28', 'url': SEC + '0000814547/000081454726000020/exhibit991erq22026.htm'},
 {'id': 5, 'titulo': 'Comunicado de resultados 3T FY2026 (8-K, Ex. 99.1)', 'editor': 'Fair Isaac Corp. (SEC)', 'tipo': 'Primaria', 'fecha': '2026-07-29', 'url': SEC + '0000814547/000081454726000031/exhibit991erq32026.htm'},
 {'id': 6, 'titulo': 'Form 10-Q a 30-jun-2026 (balance, deuda, recompras, ASR)', 'editor': 'Fair Isaac Corp. (SEC)', 'tipo': 'Primaria', 'fecha': '2026-07-30', 'url': SEC + '0000814547/000081454726000030/fico-20260630.htm'},
 {'id': 7, 'titulo': 'Form 10-Q a 31-mar-2026 (balance comparativo a 30-sep-2025)', 'editor': 'Fair Isaac Corp. (SEC)', 'tipo': 'Primaria', 'fecha': '2026-04-29', 'url': SEC + '0000814547/000081454726000021/fico-20260331.htm'},
 {'id': 8, 'titulo': 'Fair Isaac: cuenta de resultados FY2021-FY2025 (resultado de explotación, intereses, impuestos)', 'editor': 'MarketScreener', 'tipo': 'Datos de mercado', 'fecha': '2026-10', 'url': 'https://www.marketscreener.com/quote/stock/FAIR-ISAAC-CORPORATION-5523345/finances-income-statement/'},
 {'id': 9, 'titulo': 'Fair Isaac Corporation (NYSE:FICO): estados financieros (BAI, amortizaciones, beneficio)', 'editor': 'Kalkine Media', 'tipo': 'Datos de mercado', 'fecha': '2026-10', 'url': 'https://kalkinemedia.com/us/companies/nyse-FICO'},
 {'id': 10, 'titulo': 'Fair Isaac EPS diluido 2010-2025', 'editor': 'Macrotrends', 'tipo': 'Datos de mercado', 'fecha': '2026-10', 'url': 'https://macrotrends.net/stocks/charts/FICO/fair-isaac/eps-earnings-per-share-diluted'},
 {'id': 11, 'titulo': 'FICO: estado de flujos anual (flujo operativo y capex FY2021-FY2025)', 'editor': 'Barchart', 'tipo': 'Datos de mercado', 'fecha': '2026-10', 'url': 'https://barchart.com/stocks/quotes/FICO/cash-flow'},
 {'id': 12, 'titulo': 'Carta anual FY2025 (Scores +27 %, ≈1.170 M USD)', 'editor': 'Fair Isaac Corp.', 'tipo': 'Primaria', 'fecha': '2026-01', 'url': 'https://investors.fico.com/static-files/4dd43bd8-b07f-472c-9e53-5cb224ec9acd'},
 {'id': 13, 'titulo': 'Fair Isaac Q3 earnings call highlights (Direct Licensing, VantageScore, 10T)', 'editor': 'MarketBeat', 'tipo': 'Prensa', 'fecha': '2026-07-29', 'url': 'https://www.marketbeat.com/instant-alerts/fair-isaac-q3-earnings-call-highlights-2026-07-29/'},
 {'id': 14, 'titulo': 'Fair Isaac (FICO) EPS diluido FY2025: 26,54 USD', 'editor': 'AlphaQuery', 'tipo': 'Datos de mercado', 'fecha': '2026-10', 'url': 'https://www.alphaquery.com/stock/FICO/fundamentals/annual/earnings-per-share-diluted'},
]
def fila(p, ing, ebit, am, fin, imp, bn, bpa, acc, gf):
    return {'periodo': p, 'ingresos': ing, 'coste_ventas': None, 'gastos_generales': None, 'ebitda': round(ebit + am, 1), 'amortizaciones': am,
            'ebit': ebit, 'resultado_financiero': fin, 'bai': round(ebit + fin, 1), 'impuestos': imp, 'minoritarios': 0,
            'beneficio_neto': bn, 'gastos_financieros': gf, 'participadas_en_ebitda': None, 'no_recurrentes_en_ebitda': None,
            'bpa': bpa, 'dpa': 0, 'dpa_extraordinario': 0, 'acciones_diluidas': acc}
cuenta = [
 fila('FY2021', 1316.5, 413.0, 25.6, 60.1, 81.1, 392.1, 13.40, 29.26, 40.1),
 fila('FY2022', 1377.3, 542.4, 20.5, -71.1, 97.8, 373.5, 14.18, 26.34, 69.0),
 fila('FY2023', 1513.6, 642.8, 14.6, -89.2, 124.2, 429.4, 16.93, 25.36, 95.6),
 fila('FY2024', 1717.5, 733.6, 13.8, -91.6, 129.2, 512.8, 20.45, 25.08, 106.0),
 fila('FY2025', 1990.9, 924.9, 15.0, -122.3, 150.7, 651.9, 26.54, 24.56, 134.0),
]
def bal(p, at, pt, gw, cli, caja, deuda, pn):
    return {'periodo': p, 'activo_total': at, 'activo_corriente': None, 'pasivo_corriente': None, 'pasivo_total': pt, 'fondo_comercio': gw,
            'intangibles': None, 'inmovilizado_material': None, 'existencias': 0, 'clientes': cli, 'proveedores': None, 'activos_contrato': None,
            'pasivos_contrato': None, 'caja': caja, 'deuda_financiera': deuda, 'arrendamientos': 0, 'patrimonio_neto': pn, 'minoritarios': 0, 'reservas': None}
balance_hist = [
 bal('FY2021', None, None, None, None, None, None, None),
 bal('FY2022', None, None, None, None, None, None, None),
 bal('FY2023', 1575.3, 2263.3, 773.3, None, None, 1861.7, -688.0),
 bal('FY2024', 1717.9, 2680.6, 782.8, 426.6, 150.7, 2209.0, -962.7),
 bal('FY2025', 1868.1, 3613.9, 783.3, 529.1, 134.1, 3055.7, -1745.8),
]
def flu(p, fo, capex, rec):
    return {'periodo': p, 'flujo_operativo': fo, 'capex': capex, 'pagos_arrendamientos': 0, 'adquisiciones': 0, 'desinversiones': 0,
            'dividendos': 0, 'recompras': rec, 'emision_acciones': 0, 'intereses_en_financiacion': 0}
flujos_hist = [flu('FY2021', 423.8, 7.6, None), flu('FY2022', 509.5, 6.0, None), flu('FY2023', 468.9, 4.2, None),
               flu('FY2024', 633.0, 25.6, None), flu('FY2025', 778.8, 39.4, 1410.0)]
seg = lambda nombre, desc, hist: {'nombre': nombre, 'descripcion': desc, 'tipo_resultado': None, 'historico': [{'periodo': p, 'ingresos': i, 'resultado': None} for p, i in hist]}
A = {
 '_estado': 'Cerrada con lo que da la búsqueda web (entorno sin descarga de documentos). Cifras GAAP reportadas.',
 'negocio': {
  'descripcion': 'Fair Isaac Corporation (Bozeman, Montana; fundada en 1956) vende la puntuación de crédito FICO Score y software de decisión. Dos segmentos: Scores (≈1.170 M USD en el FY2025, el 59 % de los ingresos; el 68 % en el 3T FY26) cobra un derecho por cada puntuación que las tres agencias de crédito (Equifax, Experian, TransUnion) calculan y revenden a prestamistas (B2B) y por las puntuaciones que compran los consumidores en myFICO y socios (B2C); Software (≈821 M USD) vende la plataforma FICO Platform y aplicaciones de originación, fraude y cobro a bancos [1, 12].',
  'como_gana_dinero': 'Scores es un peaje casi sin coste: el segmento gana en torno al 88-90 % sobre ventas porque el cálculo lo hacen las agencias con sus datos y FICO solo cobra la licencia. El crecimiento de los últimos cuatro años es sobre todo **precio**: la puntuación hipotecaria pasó de unos 0,60 USD en 2022 a 4,95 USD en 2026, más 33 USD por préstamo cerrado en el programa de licencia directa [5, 13]. En el 3T FY26 el B2B de Scores creció un 49 % por el precio unitario de la originación hipotecaria y el B2C un 5 % [5]. Software es recurrente (ARR de 747 M USD a sep-2025, +4 %; plataforma +16 %, el resto −2 %) y su margen es mucho menor [1, 2].',
  'segmentos': [
   seg('Scores', 'Licencia de la puntuación FICO (B2B por agencias y B2C myFICO)', [('FY2023', 773.9), ('FY2024', 920.6), ('FY2025', 1169.2)]),
   seg('Software', 'FICO Platform y aplicaciones de decisión, fraude y cobro', [('FY2023', 739.7), ('FY2024', 796.9), ('FY2025', 821.7)]),
  ],
  'geografias': [{'nombre': 'América', 'peso_pct': 87.0}, {'nombre': 'Europa, Oriente Medio y África', 'peso_pct': 9.0}, {'nombre': 'Asia-Pacífico', 'peso_pct': 4.0}],
  'geografias_criterio': 'destino',
  'clientes': 'Los clientes directos de Scores son las tres agencias de crédito, que revenden la puntuación a bancos, emisores de tarjetas, financieras de automóvil y originadores de hipotecas; el 10-K las identifica como concentración relevante de las cuentas por cobrar [1]. El poder de precios está demostrado: subidas de dos y tres dígitos en la puntuación hipotecaria desde 2023 sin pérdida de volumen hasta el 3T FY26 [5, 13]. El límite es político: la FHFA (regulador de Fannie Mae y Freddie Mac) aceptó VantageScore 4.0 en julio de 2025, la extendió a todos los prestamistas en septiembre de 2026 y el 29-sep-2026 anunció una única tabla de precios con las dos puntuaciones [B3, B4]. En Software, la retención neta en dólares es del 102 % (112 % en la plataforma) [1].',
  'kpis': [
   {'kpi': 'Ingresos de Scores (trimestre)', 'valor_anterior': '324,3 M USD (3T FY25)', 'valor_actual': '458,9 M USD (3T FY26)', 'variacion': '+41 %', 'comentario': 'B2B +49 % por precio hipotecario; B2C +5 % [5]'},
   {'kpi': 'Ingresos de Software (trimestre)', 'valor_anterior': '212,1 M USD (3T FY25)', 'valor_actual': '215,3 M USD (3T FY26)', 'variacion': '+2 %', 'comentario': 'Plataforma +66 %, resto −25 % [5]'},
   {'kpi': 'ARR de Software', 'valor_anterior': '≈718 M USD (sep-2024)', 'valor_actual': '747,3 M USD (sep-2025)', 'variacion': '+4 %', 'comentario': 'Retención neta 102 % [1]'},
   {'kpi': 'Acuerdos de licencia directa hipotecaria', 'valor_anterior': '0 % del volumen', 'valor_actual': '≈60 % del volumen cubierto', 'variacion': 'Pendiente de certificación de una GSE', 'comentario': 'Llamada del 3T FY26 [13]'},
  ],
  'confianza': 'Media'},
 'financieros': {
  'cuenta': cuenta,
  'ltm': {'periodo': 'LTM jun-26', 'fecha_fin': '2026-06-30', 'ingresos': 2393.7, 'ebitda': 1237, 'ebit': 1222, 'beneficio_neto': 815.1, 'bpa': 34.62, 'dpa': 0, 'dpa_extraordinario': 0, 'fcf': None, 'participadas_en_ebitda': None, 'no_recurrentes_en_ebitda': None},
  'cambios_perimetro': [],
  'confianza': 'Media'},
 'trimestres': {
  'items': [
   {'periodo': '1T25', 'ingresos': 440.0, 'crecimiento_pct': 15.0, 'crecimiento_organico_pct': None, 'ebitda': None, 'margen_ebitda_pct': None, 'bpa': 6.14, 'vs_consenso': None},
   {'periodo': '2T25', 'ingresos': 498.7, 'crecimiento_pct': 15.0, 'crecimiento_organico_pct': None, 'ebitda': None, 'margen_ebitda_pct': None, 'bpa': 6.59, 'vs_consenso': None},
   {'periodo': '3T25', 'ingresos': 536.4, 'crecimiento_pct': 20.0, 'crecimiento_organico_pct': None, 'ebitda': None, 'margen_ebitda_pct': None, 'bpa': 7.40, 'vs_consenso': None},
   {'periodo': '4T25', 'ingresos': 515.8, 'crecimiento_pct': 14.0, 'crecimiento_organico_pct': None, 'ebitda': None, 'margen_ebitda_pct': None, 'bpa': 6.42, 'vs_consenso': None},
   {'periodo': '1T26', 'ingresos': 512.0, 'crecimiento_pct': 16.4, 'crecimiento_organico_pct': None, 'ebitda': None, 'margen_ebitda_pct': None, 'bpa': 6.61, 'vs_consenso': None},
   {'periodo': '2T26', 'ingresos': 691.7, 'crecimiento_pct': 38.7, 'crecimiento_organico_pct': None, 'ebitda': None, 'margen_ebitda_pct': None, 'bpa': 11.14, 'vs_consenso': 'Superior'},
   {'periodo': '3T26', 'ingresos': 674.2, 'crecimiento_pct': 25.7, 'crecimiento_organico_pct': None, 'ebitda': None, 'margen_ebitda_pct': None, 'bpa': 10.45, 'vs_consenso': 'Superior'},
  ],
  'confianza': 'Media'},
 'balance': {
  'historico': balance_hist,
  'vencimientos': [{'anio': 'FY2027', 'importe': 300}, {'anio': 'FY2028', 'importe': 1200}, {'anio': 'FY2029+', 'importe': 3400}],
  'liquidez': 'Caja de 248,4 M USD a 30-jun-2026 y 290 M disponibles de la línea de crédito de 1.000 M (710 M dispuestos) [6].',
  'rating': 'BB+ / Ba1 (grado especulativo alto; dato de memoria de emisiones anteriores, no comprobado en este entorno)',
  'coste_deuda_pct': 5.3, 'vida_media_anios': None,
  'confianza': 'Media'},
 'flujos': {'historico': flujos_hist, 'confianza': 'Media'},
 'calidad': {'auditor': 'Deloitte & Touche LLP', 'anios_auditor': None, 'opinion': 'Favorable', 'confianza': 'Baja'},
 'fuentes': fA,
 'huecos': [
  H('financieros', 'coste_ventas y gastos_generales', 'Complemento', '1) 10-K FY2025 (no abre en este entorno); 2) MarketScreener y Kalkine por búsqueda; 3) Stock Analysis por búsqueda: solo dan resultado de explotación'),
  H('balance', 'balance FY2021-FY2022 y activo/pasivo corriente', 'Núcleo', '1) 10-K FY2022 (no abre); 2) 10-Q con comparativos por búsqueda (solo FY2023-FY2025); 3) agregadores (Tracenable, Statista) de pago'),
  H('flujos', 'recompras FY2021-FY2024', 'Complemento', '1) 10-K FY2025 por búsqueda (solo da 1.400 M en el FY2025 y 0,8 mil M ambiguo en el FY2024); 2) Barchart; 3) Macrotrends: sin la serie'),
  H('trimestres', 'margen EBITDA trimestral', 'Complemento', '1) comunicados 8-K por búsqueda; 2) Quartr; 3) MarketBeat: solo ingresos y BPA'),
 ],
}
w('A', A)

# ---------------- B: sector y competencia ----------------
fB = [
 {'id': 1, 'titulo': 'Informe de Equifax del 8-oct-2026 (sector de burós y puntuación, nota B)', 'editor': 'Este repositorio', 'tipo': 'Sectorial', 'fecha': '2026-10-08', 'url': 'informes/equifax-2026-10-08/datos-v2.json'},
 {'id': 2, 'titulo': 'Informe de Experian del 14-oct-2026', 'editor': 'Este repositorio', 'tipo': 'Sectorial', 'fecha': '2026-10-14', 'url': 'informes/experian-2026-10-14/datos.json'},
 {'id': 3, 'titulo': 'FICO Sinks 27% as Trump Admin Announces Plans to End Its Mortgage Scoring Monopoly', 'editor': 'TIKR', 'tipo': 'Prensa', 'fecha': '2026-09-30', 'url': 'https://www.tikr.com/blog/fico-sinks-27-as-trump-admin-announces-plans-to-end-its-mortgage-scoring-monopoly'},
 {'id': 4, 'titulo': 'FHFA: las GSE pasan a una sola tabla de precios con VantageScore', 'editor': 'HousingWire', 'tipo': 'Prensa', 'fecha': '2026-09-29', 'url': 'https://www.housingwire.com/articles/fhfa-gses-one-grid/'},
 {'id': 5, 'titulo': 'Fair Isaac Stock Drops 17% After Federal Regulator Vows to End Credit Bureau Overcharging (VantageScore para todos los prestamistas)', 'editor': 'TIKR', 'tipo': 'Prensa', 'fecha': '2026-09-04', 'url': 'https://www.tikr.com/blog/fair-isaac-stock-drops-fhfa-vantagescore-directive'},
 {'id': 6, 'titulo': "FICO's monopoly cracks but the dip could be a gift for patient investors (VantageScore >9 % de las hipotecas titulizadas del piloto)", 'editor': 'Barchart', 'tipo': 'Prensa', 'fecha': '2026-10', 'url': 'https://www.barchart.com/story/news/4495770/ficos-monopoly-cracks-but-the-dip-could-be-a-gift-for-patient-investors'},
 {'id': 7, 'titulo': 'FICO stock plunges on VantageScore competition (VantageScore ≈0,99 USD frente a ≈10 USD)', 'editor': 'Financial Modeling Prep', 'tipo': 'Prensa', 'fecha': '2026-09-29', 'url': 'https://site.financialmodelingprep.com/market-news/fico-stock-plunges-vantage-score-competition'},
 {'id': 8, 'titulo': 'Why Fair Isaac Corporation plunged today (Rocket Mortgage adopta VantageScore 4.0 por defecto)', 'editor': 'The Motley Fool', 'tipo': 'Prensa', 'fecha': '2026-09-29', 'url': 'https://www.fool.com/investing/2026/09/29/why-fair-isaac-corporation-plunged-today/'},
]
B = {
 'sector': {
  'definicion': 'El mercado relevante es la puntuación de crédito al consumo en EE. UU.: la licencia del algoritmo que los prestamistas usan para decidir hipotecas, tarjetas, préstamos de automóvil y personales, distribuida a través de las tres agencias de crédito. Es un mercado de pocos miles de millones de dólares dentro del de información crediticia (≈ 45.000 M USD en el mundo según el informe de Experian) [1, 2]. No hay estadística oficial de su tamaño: los ingresos de Scores de FICO (≈1.700 M USD estimados en el FY2026) son su mejor aproximación, porque FICO tiene más del 90 % de las decisiones [6].',
  'tamano': 'Sin cifra pública fiable; ingresos de Scores de FICO ≈1.170 M USD en el FY2025 [A12] como aproximación (cuota > 90 %)',
  'unidad_serie': None, 'serie': [], 'tcac_historico_pct': None, 'tcac_previsto_pct': None, 'cr5_pct': 99.0, 'estructura': 'Concentrada',
  'drivers': [
   {'driver': 'Precio de la puntuación hipotecaria', 'efecto': '+/−', 'horizonte': 'Estructural', 'evidencia': 'De ≈0,60 USD a 4,95 USD por puntuación y 33 USD por préstamo cerrado: explica casi todo el +41 % de Scores del 3T FY26 [A5]; ahora es el blanco del regulador [3, 4]'},
   {'driver': 'Originación hipotecaria', 'efecto': '+/−', 'horizonte': 'Cíclico', 'evidencia': 'Tipos altos y asequibilidad mantienen las originaciones por debajo de su media histórica (llamada del 3T FY26) [A13]'},
   {'driver': 'Competencia de VantageScore 4.0 en hipotecas', 'efecto': '−', 'horizonte': 'Estructural', 'evidencia': 'Aceptada por la FHFA en jul-2025, abierta a todos los prestamistas el 4-sep-2026 y en la misma tabla de precios desde el anuncio del 29-sep-2026 [3, 4, 5]'},
   {'driver': 'Crédito al consumo no hipotecario (tarjetas, automóvil)', 'efecto': '+', 'horizonte': 'Cíclico', 'evidencia': 'B2C +5 % y B2B no hipotecario estable en el 3T FY26 [A5]'},
  ],
  'porter': [
   {'fuerza': 'Rivalidad', 'intensidad': 3, 'justificacion': 'Un solo rival real (VantageScore, propiedad de las tres agencias), que cobra ≈0,99 USD frente a ≈10 USD [7].'},
   {'fuerza': 'Poder de los clientes', 'intensidad': 4, 'justificacion': 'Las agencias son a la vez distribuidoras de FICO y dueñas de su competidor; las GSE y su regulador fijan qué puntuación vale [4].'},
   {'fuerza': 'Poder de los proveedores', 'intensidad': 2, 'justificacion': 'Los datos los ponen las agencias, pero el coste de FICO es mínimo (margen de Scores ≈ 88-90 %) [1].'},
   {'fuerza': 'Amenaza de entrada', 'intensidad': 2, 'justificacion': 'Validar un modelo para las GSE lleva años; solo VantageScore lo ha logrado [5].'},
   {'fuerza': 'Amenaza de sustitutos', 'intensidad': 3, 'justificacion': 'Datos alternativos (flujo de caja bancario, alquiler) y modelos propios de los grandes bancos fuera de la hipoteca titulizada.'},
  ],
  'ciclo': {'posicion': 'Recuperación', 'comentario': 'Las originaciones hipotecarias siguen bajas por tipos altos (llamada del 3T FY26) [A13]. En 2008-09 los ingresos de FICO bajaron, pero la puntuación se mantuvo; en 2022 la subida de tipos hundió las hipotecas y FICO compensó con precio. Hoy el ciclo importa menos que el precio regulado.'},
  'regulacion': 'La FHFA permitió en julio de 2025 que los prestamistas de Fannie Mae y Freddie Mac usen VantageScore 4.0 en vez de Classic FICO; el 4-sep-2026 lo extendió a todos los prestamistas tras un piloto de 50, y el 29-sep-2026 su director anunció una sola tabla de precios con las dos puntuaciones, sin fecha de entrada en vigor [3, 4, 5]. FICO 10T sigue aprobada para más adelante. FICO lanzó en 2025 una licencia directa a revendedores hipotecarios pendiente de certificación de una GSE [A13].',
  'tendencias': 'La puntuación se desacopla de la agencia: FICO vende directamente a revendedores y las agencias empujan VantageScore (Equifax lo regaló hasta finales de 2026 a quien compre FICO) [1]. Rocket Mortgage pasó a VantageScore 4.0 por defecto [8]. Los prestamistas pueden «comparar puntuaciones» y elegir la más favorable, lo que, según la dirección, no ha reducido aún el volumen de FICO [A13].',
  'confianza': 'Media'},
 'competencia': {
  'cuota_pct': 90.0, 'posicion': '1.º en puntuación de crédito al consumo en EE. UU. (cuota de mediados a altos del 90 % según BMO, antes del cambio de la FHFA) [6]; en software de decisión compite con SAS, Experian PowerCurve y Pega',
  'competidores': [
   {'nombre': 'VantageScore Solutions (Equifax, Experian, TransUnion)', 'pais': 'EE. UU.', 'ticker': None, 'ingresos': None, 'cuota_pct': None, 'margen_ebit_pct': None, 'comentario': 'Puntuación alternativa a ≈0,99 USD; >9 % de las hipotecas titulizadas por los prestamistas del piloto [6, 7]'},
   {'nombre': 'Equifax', 'pais': 'EE. UU.', 'ticker': 'EFX', 'ingresos': 6200, 'cuota_pct': None, 'margen_ebit_pct': None, 'comentario': 'Distribuye FICO y promociona VantageScore [1]'},
   {'nombre': 'Experian', 'pais': 'Reino Unido/Irlanda', 'ticker': 'EXPN', 'ingresos': 8450, 'cuota_pct': None, 'margen_ebit_pct': 28.6, 'comentario': 'Mayor buró del mundo; también vende software de decisión (PowerCurve) [2]'},
   {'nombre': 'TransUnion', 'pais': 'EE. UU.', 'ticker': 'TRU', 'ingresos': None, 'cuota_pct': None, 'margen_ebit_pct': None, 'comentario': 'Tercer buró, copropietario de VantageScore [1]'},
  ],
  'foso': {'veredicto': 'Estrecho', 'tendencia': 'Se estrecha', 'fuentes': [
   {'fuente': 'Efectos de red', 'puntuacion': 4, 'evidencia': 'La puntuación FICO es el idioma común de originadores, inversores en titulizaciones y agencias de rating; >90 % de los grandes prestamistas la usan [A12].'},
   {'fuente': 'Costes de cambio', 'puntuacion': 3, 'evidencia': 'Cambiar exige revalidar modelos y precios de titulizaciones; la tabla única de la FHFA reduce ese coste en hipotecas [4].'},
   {'fuente': 'Intangibles (marca, patentes, licencias)', 'puntuacion': 4, 'evidencia': 'Marca conocida por el consumidor y aprobación regulatoria de Classic FICO y 10T [5].'},
   {'fuente': 'Ventaja en costes', 'puntuacion': 2, 'evidencia': 'El competidor cobra 10 veces menos [7].'},
   {'fuente': 'Escala eficiente', 'puntuacion': 4, 'evidencia': 'Un mercado que solo admite uno o dos estándares.'}]},
  'confianza': 'Media'},
 'fuentes': fB,
 'huecos': [H('sector', 'tamaño y serie del mercado de puntuación', 'Núcleo', '1) 10-K de FICO (no publica el mercado); 2) estudios sectoriales por búsqueda; 3) informe de Equifax: solo el de información crediticia', 'Omitido'),
            H('competencia', 'ingresos y márgenes de VantageScore y TransUnion', 'Complemento', '1) VantageScore no publica cuentas; 2) informe de Equifax; 3) búsqueda: sin cifra')],
}
w('B', B)

# ---------------- C: directivos y gobierno ----------------
fC = [
 {'id': 1, 'titulo': 'Proxy statement 2026 (DEF 14A)', 'editor': 'Fair Isaac Corp. (SEC)', 'tipo': 'Primaria', 'fecha': '2026-01-21', 'url': SEC + '814547/000119312526024403/d27709ddef14a.htm'},
 {'id': 2, 'titulo': 'Form 4: venta de 1.069 acciones del consejero delegado (14-oct-2025)', 'editor': 'Stock Titan (SEC)', 'tipo': 'Primaria', 'fecha': '2025-10-14', 'url': 'https://www.stocktitan.net/sec-filings/FICO/form-4-fair-isaac-corp-insider-trading-activity-b3fd239a1810.html'},
 {'id': 3, 'titulo': 'Form 4 de directivos y consejeros FY2026 (Manolis, Rees, Kelly)', 'editor': 'Fair Isaac Corp. (SEC)', 'tipo': 'Primaria', 'fecha': '2026-08-21', 'url': SEC + '0000814547/000121465926010850/marketforms-73801.xml'},
 {'id': 4, 'titulo': 'FICO recorta un 15 % de la plantilla e integra IA en el desarrollo de producto', 'editor': 'Timothy Sykes / Reuters', 'tipo': 'Prensa', 'fecha': '2026-10-12', 'url': 'https://www.timothysykes.com/news/fair-isaac-corporation-fico-news-2026_10_12/'},
]
C = {
 'directivos': {
  'equipo': [
   {'nombre': 'William (Will) Lansing', 'cargo': 'Consejero delegado', 'desde': '2012', 'participacion_pct': 0.2, 'trayectoria': 'Antes dirigió InfoSpace y ValueVision. Con él los ingresos pasaron de ≈680 M USD a 1.991 M en el FY2025 y la acción se multiplicó por más de 30 hasta 2024, con la subida de precios de Scores y la recompra de más de un tercio del capital [A1, 2].'},
   {'nombre': 'Steven Weber', 'cargo': 'Director financiero', 'desde': '2021', 'participacion_pct': None, 'trayectoria': 'Director financiero desde 2021; ha financiado las recompras con deuda (de 1.862 M USD en sep-2023 a 5.610 M en jun-2026) [A6].'},
   {'nombre': 'Braden Kelly', 'cargo': 'Consejero (presidente del consejo según la información de años anteriores)', 'desde': '2019', 'participacion_pct': None, 'trayectoria': 'Consejero independiente; ejerció opciones en agosto de 2026 [3].'},
  ],
  'historial_guidance': [
   {'anio': 'FY2026', 'guia': 'Ingresos 2.350 M USD y BPA GAAP 33,47 (nov-2025)', 'real': 'Guía elevada a 2.530 M y 36,86 USD en jul-2026 (cierre pendiente)', 'cumplida': 'Sí'},
   {'anio': 'FY2025', 'guia': 'BPA no GAAP ≈ 28-29 USD', 'real': 'BPA no GAAP 29,88 USD; ingresos 1.991 M', 'cumplida': 'Sí'},
  ],
  'confianza': 'Baja'},
 'gobierno': {
  'consejo': [],
  'presidente_ceo_separados': True, 'presidente_ejecutivo': False, 'consejero_coordinador': None, 'una_accion_un_voto': True,
  'operaciones_vinculadas_relevantes': False, 'variable_ligado_rentabilidad': None, 'auditoria_independiente': True, 'insiders_sin_operaciones': False,
  'accionista_control': False, 'presidente_vinculado_control': False, 'cambios_cupula_24m': 0,
  'voto_remuneracion_pct': None, 'voto_remuneracion_contra_pct': None, 'voto_remuneracion_contra_libre_pct': None, 'voto_cupula_pct': None,
  'remuneracion_ceo': None,
  'accionistas': [],
  'insiders': [
   {'fecha': '2025-10-14', 'persona': 'Will Lansing (consejero delegado)', 'operacion': 'Venta', 'acciones': 1069, 'importe': None},
   {'fecha': '2026-07-29', 'persona': 'Eva Manolis (directiva)', 'operacion': 'Venta', 'acciones': 967, 'importe': 1.35},
  ],
  'alertas': ['Enfrentamiento público con el director de la FHFA (Bill Pulte) por el precio de la puntuación hipotecaria: riesgo regulatorio y político directo [B3, B4].',
              'Recorte del 15 % de la plantilla anunciado el 6-oct-2026 con ≈27 M USD de indemnizaciones [4].'],
  'confianza': 'Baja'},
 'fuentes': fC,
 'huecos': [H('gobierno', 'consejo, remuneración del primer ejecutivo, votos y accionistas', 'Núcleo', '1) DEF 14A 2026 (no abre en este entorno); 2) búsqueda del proxy y del 8-K de la junta del 4-mar-2026; 3) agregadores: sin cifras', 'Omitido')],
}
w('C', C)

# ---------------- D: mercado y valoración ----------------
fD = [
 {'id': 1, 'titulo': 'Why Fair Isaac Corporation’s (FICO) Stock Is Up (cierre previo 667,58 USD, 9-oct-2026)', 'editor': 'AAII', 'tipo': 'Datos de mercado', 'fecha': '2026-10-12', 'url': 'https://www.aaii.com/investingideas/article/548639-why-fair-isaac-corporation8217s-fico-stock-is-up-1242'},
 {'id': 2, 'titulo': 'Fair Isaac Corp Stock (FICO) Moved Up by 9.17% on Oct 12', 'editor': 'TradingKey', 'tipo': 'Datos de mercado', 'fecha': '2026-10-12', 'url': 'https://www.tradingkey.com/news/market-movers/262212284-market-movers-fico-20261012'},
 {'id': 3, 'titulo': 'Fair Isaac Corporation (FICO) share price (6-oct-2026: 684 USD; rango 52 semanas 586-1.886)', 'editor': 'Angel One', 'tipo': 'Datos de mercado', 'fecha': '2026-10-06', 'url': 'https://www.angelone.in/us-stocks/fair-isaac-corporation'},
 {'id': 4, 'titulo': 'Bank of America cut its Fair Isaac price target in half (neutral, 700 USD)', 'editor': '24/7 Wall St.', 'tipo': 'Analistas', 'fecha': '2026-10-01', 'url': 'https://247wallst.com/investing/2026/10/01/bank-of-america-cut-its-fair-isaac-price-target-in-half-and-the-stock-still-fell-below-it/'},
 {'id': 5, 'titulo': 'FICO Stock Whipsaws As Targets Cut But Core Franchise Holds (Wells Fargo 950, RBC 1.525)', 'editor': 'StocksToTrade', 'tipo': 'Analistas', 'fecha': '2026-10-12', 'url': 'https://stockstotrade.com/news/fair-isaac-corporation-fico-news-2026_10_12/'},
 {'id': 6, 'titulo': 'Fair Isaac shares gap up (BMO 1.150 USD, cierre 592,47 USD el 30-sep)', 'editor': 'MarketBeat', 'tipo': 'Analistas', 'fecha': '2026-10-01', 'url': 'https://www.marketbeat.com/instant-alerts/price-fair-isaac-nyse-fico-shares-gap-up-time-to-buy-2026-10-01/'},
 {'id': 7, 'titulo': 'Fair Isaac receives consensus recommendation of Moderate Buy (15 analistas, objetivo medio 1.627,93 USD)', 'editor': 'MarketBeat', 'tipo': 'Analistas', 'fecha': '2026-07-28', 'url': 'https://www.marketbeat.com/instant-alerts/fair-isaac-corporation-nysefico-receives-consensus-recommendation-of-moderate-buy-from-analysts-2026-07-28/'},
 {'id': 8, 'titulo': 'Earnings preview: consenso BPA FY2026 37,37 USD y FY2027 42,15 USD', 'editor': 'Barchart / Yahoo Finance', 'tipo': 'Analistas', 'fecha': '2026-08', 'url': 'https://finance.yahoo.com/news/earnings-preview-expect-fair-isaac-105417919.html'},
 {'id': 9, 'titulo': 'Fair Isaac – 39 Year Stock Price History (cierres anuales)', 'editor': 'Macrotrends', 'tipo': 'Datos de mercado', 'fecha': '2026-10', 'url': 'https://www.macrotrends.net/stocks/charts/FICO/fair-isaac/stock-price-history'},
 {'id': 10, 'titulo': 'Informe de Experian del 14-oct-2026 (comparables a 7-8 oct, de la muestra del informe de Equifax)', 'editor': 'Este repositorio', 'tipo': 'Datos de mercado', 'fecha': '2026-10-14', 'url': 'informes/experian-2026-10-14/datos.json'},
 {'id': 11, 'titulo': 'Informe de Group 1 Automotive del 14-oct-2026 (bono de EE. UU. a 10 años 5,22 %, FRED DGS10)', 'editor': 'Este repositorio', 'tipo': 'Datos de mercado', 'fecha': '2026-10-14', 'url': 'informes/group-1-automotive-2026-10-14/datos.json'},
 {'id': 12, 'titulo': 'Damodaran, implied ERP by month (oct-2026: 4,20 %)', 'editor': 'NYU Stern', 'tipo': 'Primaria', 'fecha': '2026-10', 'url': 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx'},
 {'id': 13, 'titulo': 'Fair Isaac 10-Q (21.597.635 acciones en circulación a 17-jul-2026)', 'editor': 'Fair Isaac Corp. (SEC)', 'tipo': 'Primaria', 'fecha': '2026-07-30', 'url': SEC + '0000814547/000081454726000030/fico-20260630.htm'},
]
comp = [
 {'nombre': 'Experian', 'ticker': 'EXPN', 'pais': 'GB', 'capitalizacion': 30028, 'ev_ventas': 4.17, 'ev_ebitda_ltm': 11.5, 'ev_ebitda_ntm': None, 'per_ntm': 15.5, 'crecimiento_pct': None, 'margen_ebitda_pct': 36.1, 'roic_pct': 17.9, 'dn_ebitda': 1.7, 'fcf_yield_pct': 7.3},
 {'nombre': 'Equifax', 'ticker': 'EFX', 'pais': 'US', 'capitalizacion': 16730, 'ev_ventas': None, 'ev_ebitda_ltm': None, 'ev_ebitda_ntm': 9.6, 'per_ntm': 17.8, 'crecimiento_pct': None, 'margen_ebitda_pct': None, 'roic_pct': None, 'dn_ebitda': None, 'fcf_yield_pct': None},
 {'nombre': 'TransUnion', 'ticker': 'TRU', 'pais': 'US', 'capitalizacion': 12040, 'ev_ventas': 3.46, 'ev_ebitda_ltm': 9.7, 'ev_ebitda_ntm': 8.6, 'per_ntm': 16.7, 'crecimiento_pct': 9.7, 'margen_ebitda_pct': 36, 'roic_pct': 7.6, 'dn_ebitda': 2.6, 'fcf_yield_pct': 6.6},
 {'nombre': 'Verisk Analytics', 'ticker': 'VRSK', 'pais': 'US', 'capitalizacion': 21950, 'ev_ventas': 8.27, 'ev_ebitda_ltm': 14.7, 'ev_ebitda_ntm': 13.5, 'per_ntm': 20.9, 'crecimiento_pct': 6, 'margen_ebitda_pct': 56.2, 'roic_pct': 31.7, 'dn_ebitda': 1.5, 'fcf_yield_pct': 5.6},
 {'nombre': "Moody's", 'ticker': 'MCO', 'pais': 'US', 'capitalizacion': 77870, 'ev_ventas': 10.5, 'ev_ebitda_ltm': 20.1, 'ev_ebitda_ntm': 17.9, 'per_ntm': 25.8, 'crecimiento_pct': 7.2, 'margen_ebitda_pct': 51.1, 'roic_pct': 32, 'dn_ebitda': 1.2, 'fcf_yield_pct': 3.8},
 {'nombre': 'S&P Global', 'ticker': 'SPGI', 'pais': 'US', 'capitalizacion': 116490, 'ev_ventas': 8.53, 'ev_ebitda_ltm': 16.4, 'ev_ebitda_ntm': 15.6, 'per_ntm': 22.7, 'crecimiento_pct': 2, 'margen_ebitda_pct': 51.1, 'roic_pct': 11.1, 'dn_ebitda': 1.4, 'fcf_yield_pct': 4.8},
 {'nombre': 'MSCI', 'ticker': 'MSCI', 'pais': 'US', 'capitalizacion': 40380, 'ev_ventas': 14, 'ev_ebitda_ltm': 22.9, 'ev_ebitda_ntm': 20, 'per_ntm': 26, 'crecimiento_pct': 10, 'margen_ebitda_pct': 60.8, 'roic_pct': 39.9, 'dn_ebitda': 3, 'fcf_yield_pct': 4},
]
D = {
 'identificacion': {
  'nombre': 'Fair Isaac Corporation', 'nombre_corto': 'FICO', 'ticker': 'FICO', 'isin': 'US3032501047', 'mercado': 'NYSE', 'indice_referencia': 'S&P 500',
  'pais': 'Estados Unidos', 'pais_iso': 'US', 'sector': 'Tecnologías de la información', 'industria': 'Software de aplicaciones', 'sede': 'Bozeman (Montana)', 'fundacion': '1956',
  'empleados': None, 'web': 'https://www.fico.com', 'precio': 728.80, 'fecha_precio': '2026-10-12', 'acciones': 21.6, 'capitalizacion_publicada': None, 'free_float_pct': 99.0,
  'max_52s': 1886.0, 'min_52s': 586.53, 'volumen_medio_diario': '≈ 1.000 M USD/día en jornadas de noticias (31-jul-2026); sin media de 3 meses', 'proximos_resultados': '2026-11-05'},
 'consenso': {
  'guidance': 'Guía del FY2026 (a 30-sep-2026), elevada el 29-jul-2026: ingresos de 2.530 M USD (antes 2.450 M), BPA GAAP de 36,86 USD (antes 35,60) y no GAAP de 42,43 (antes 40,45) [A5]. No hay guía del FY2027: llegará con los resultados del 4T, a principios de noviembre. El 6-oct-2026 anunció un recorte del 15 % de la plantilla con ≈27 M USD de indemnizaciones [C4].',
  'estimaciones': [
   {'periodo': 'FY2026e', 'ingresos': 2530, 'ebitda': None, 'ebit': None, 'bpa': 37.37, 'dpa': 0, 'fuente': 'Barchart (consenso, ago-2026); ingresos = guía [8, A5]'},
   {'periodo': 'FY2027e', 'ingresos': None, 'ebitda': None, 'ebit': None, 'bpa': 42.15, 'fuente': 'Barchart (consenso anterior al 3T FY26) [8]', 'dpa': 0},
  ],
  'recomendaciones': {'n_analistas': 15, 'comprar': 10, 'mantener': 5, 'vender': 0, 'po_medio': 1081.25, 'po_min': 700, 'po_max': 1525},
  'base_ebitda': 'NIIF', 'ajuste_ebitda_pct_ventas': None,
  'confianza': 'Baja'},
 'bolsa': None,
 'multiplos_historicos': {'serie': [
  {'anio': 'FY2021', 'precio_cierre': 433.67, 'ev_ebitda_ntm': None, 'per_ntm': None, 'excluir': True},
  {'anio': 'FY2022', 'precio_cierre': 598.58, 'ev_ebitda_ntm': None, 'per_ntm': None, 'excluir': False},
  {'anio': 'FY2023', 'precio_cierre': 1164.01, 'ev_ebitda_ntm': None, 'per_ntm': None, 'excluir': False},
  {'anio': 'FY2024', 'precio_cierre': 1990.93, 'ev_ebitda_ntm': None, 'per_ntm': None, 'excluir': True},
  {'anio': 'FY2025', 'precio_cierre': 1690.62, 'ev_ebitda_ntm': None, 'per_ntm': None, 'excluir': False},
 ], 'confianza': 'Baja'},
 'comparables': {'empresas': comp, 'confianza': 'Media'},
 'transacciones': None,
 'fuentes': fD,
 'huecos': [
  H('identificacion', 'precio de cierre del 13-oct-2026', 'Núcleo', '1) bolsa.mjs y Yahoo (sin red); 2) búsqueda de cotización del 13-oct (MarketBeat, Investing, TradingView: sin fecha); 3) cierre del 9-oct (667,58 USD, AAII) × la subida del 12-oct (+9,17 %, TradingKey) = 728,80 USD', 'Calculado y marcado como estimación'),
  H('bolsa', 'rentabilidades, beta, volatilidad y caída máxima', 'Complemento', '1) bolsa.mjs (sin red); 2) búsqueda de rentabilidades; 3) agregadores sin fecha: no comparables entre sí', 'Omitido'),
  H('transacciones', 'operaciones precedentes con múltiplo', 'Complemento', '1) búsqueda de compras de software de decisión y puntuación; 2) informe de Equifax (sin transacciones); 3) prensa: sin múltiplos publicados', 'Omitido'),
  H('consenso', 'estimaciones de ingresos y EBITDA FY2027-FY2028 tras el 29-sep-2026', 'Núcleo', '1) MarketScreener (no abre); 2) MarketBeat y Barchart por búsqueda (solo BPA anterior al 3T); 3) notas de BofA, Wells Fargo y BMO por búsqueda (solo objetivos)', 'Omitido'),
 ],
}
w('D', D)

# ---------------- E: sentimiento ----------------
fE = [
 {'id': 1, 'titulo': 'Fair Isaac: Market Fears Are Overblown, The Moat Remains', 'editor': 'Seeking Alpha', 'tipo': 'Foros y redes', 'fecha': '2026-09', 'url': 'https://seekingalpha.com/article/4816109-fair-isaac-market-fears-are-overblown-the-moat-remains'},
 {'id': 2, 'titulo': "FICO's monopoly cracks but the dip could be a gift for patient investors", 'editor': 'Barchart', 'tipo': 'Foros y redes', 'fecha': '2026-10', 'url': 'https://www.barchart.com/story/news/4495770/ficos-monopoly-cracks-but-the-dip-could-be-a-gift-for-patient-investors'},
 {'id': 3, 'titulo': 'One Regulator Just Ended Fair Isaac’s (FICO) Mortgage Monopoly. The Stock Fell 16% – Is It Justified?', 'editor': 'Insider Monkey', 'tipo': 'Foros y redes', 'fecha': '2026-09', 'url': 'https://www.insidermonkey.com/blog/one-regulator-just-ended-fair-isaacs-fico-mortgage-monopoly-the-stock-fell-16-is-it-justified-1828451/'},
 {'id': 4, 'titulo': 'Why Fair Isaac Corporation plunged today', 'editor': 'The Motley Fool', 'tipo': 'Foros y redes', 'fecha': '2026-09-29', 'url': 'https://www.fool.com/investing/2026/09/29/why-fair-isaac-corporation-plunged-today/'},
 {'id': 5, 'titulo': 'Fair Isaac Corp Stock (FICO) Moved Up by 9.17% on Oct 12 (rebote por cierre de cortos)', 'editor': 'TradingKey', 'tipo': 'Foros y redes', 'fecha': '2026-10-12', 'url': 'https://www.tradingkey.com/news/market-movers/262212284-market-movers-fico-20261012'},
 {'id': 6, 'titulo': 'Fair Isaac Corp (FICO) Stock Down 5.0% -- Now Undervalued?', 'editor': 'GuruFocus', 'tipo': 'Foros y redes', 'fecha': '2026-10', 'url': 'https://www.gurufocus.com/news/8921584/fair-isaac-corp-fico-stock-down-50-now-undervalued-gf-score-87100'},
]
E = {
 'sentimiento': {
  'tono': 'Dividido', 'tendencia': 'Empeora',
  'revisadas': [
   {'plataforma': 'Seeking Alpha (artículo y comentarios)', 'fecha': '2026-09', 'n_comentarios': 20, 'tono': 'Positivo', 'resumen': 'El autor y buena parte de los comentarios ven el miedo exagerado: el foso sigue ahí porque la puntuación FICO está integrada en todo el ecosistema hipotecario [1].'},
   {'plataforma': 'Barchart (columna de opinión)', 'fecha': '2026-10', 'n_comentarios': 1, 'tono': 'Dividido', 'resumen': 'La caída puede ser una oportunidad, pero la clave es si VantageScore se extiende más allá de los 50 prestamistas del piloto, que ya la usan en más del 9 % de sus hipotecas titulizadas [2].'},
   {'plataforma': 'Insider Monkey (blog de inversores)', 'fecha': '2026-09', 'n_comentarios': 1, 'tono': 'Negativo', 'resumen': 'El riesgo es estructural: las tres agencias que distribuyen FICO son dueñas de VantageScore y tienen incentivo para venderla; el crecimiento dependía de subidas de precio, justo lo que se ataca [3].'},
   {'plataforma': 'The Motley Fool', 'fecha': '2026-09', 'n_comentarios': 1, 'tono': 'Dividido', 'resumen': 'Barata a unas 14 veces el beneficio esperado, pero nadie sabe si perderá cuota o tendrá que bajar precios; Rocket Mortgage ya usa VantageScore por defecto [4].'},
   {'plataforma': 'TradingKey / StocksToTrade (comentario de mercado)', 'fecha': '2026-10', 'n_comentarios': 2, 'tono': 'Neutro', 'resumen': 'El +9 % del 12-oct se lee como cierre de cortos y reacción al recorte de plantilla, no como cambio de tesis [5].'},
  ],
  'temas': [
   {'tema': 'Fin del monopolio hipotecario (tabla única de la FHFA)', 'postura': 'Bajista', 'peso': 'Alto', 'contraste': 'Es real: el anuncio del 29-sep elimina la ventaja de precio para el prestamista; nuestro caso base ya recorta el precio hipotecario en el FY2027 [B4].'},
   {'tema': '«El foso sigue: la puntuación está integrada en todo»', 'postura': 'Alcista', 'peso': 'Medio', 'contraste': 'Cierto fuera de la hipoteca (tarjetas, automóvil), donde no hay regulador que imponga el cambio; en hipotecas, la dirección dice que no ha perdido volumen hasta el 3T FY26 [A13].'},
   {'tema': 'Barata frente a su historia (≈14-20 veces beneficio)', 'postura': 'Alcista', 'peso': 'Medio', 'contraste': 'El PER histórico (42-69 veces) no sirve de ancla: descontaba subidas de precio que el regulador ya no permitirá.'},
   {'tema': 'Deuda para recomprar acciones', 'postura': 'Dividida', 'peso': 'Bajo', 'contraste': 'La deuda bruta subió a 5.610 M USD (≈4 veces el EBITDA) y el patrimonio es de −4.100 M; con caja estable no es un problema de solvencia, pero quita margen si caen los ingresos [A6].'},
  ],
  'confianza': 'Media'},
 'fuentes': fE,
 'huecos': [H('sentimiento', 'Reddit y Stocktwits', 'Complemento', '1) búsqueda de hilos de Reddit (sin resultados); 2) búsqueda de Stocktwits (sin resultados); 3) se usan Seeking Alpha, Motley Fool, Barchart e Insider Monkey', 'Omitido')],
}
w('E', E)
print('ok')

# Construye las notas A-E de Moody's (corte 2026-10-14) a partir de lo leído en las búsquedas web
# (entorno nube: solo WebSearch) y de lo reutilizable del informe de S&P Global (12-oct-2026).
# Ejecutar: python3 -I informes/moodys-2026-10-14/notas/construir_notas.py
import json, re, os

DIR = os.path.dirname(os.path.abspath(__file__))
SP = json.load(open(os.path.join(DIR, '..', '..', 'sp-global-2026-10-12', 'datos.json'), encoding='utf-8'))
SPF = {f['id']: f for f in SP['fuentes']}


class Lista:
    """Lista de fuentes de una nota, con importación de fuentes del informe de S&P Global."""
    def __init__(self, propias):
        self.f = []
        for p in propias:
            self.add(*p)
        self.mapa = {}

    def add(self, titulo, editor, tipo, fecha, url):
        self.f.append({'id': len(self.f) + 1, 'titulo': titulo, 'editor': editor, 'tipo': tipo, 'fecha': fecha, 'url': url})
        return len(self.f)

    def sp(self, n):
        if n not in self.mapa:
            s = SPF[n]
            self.mapa[n] = self.add(s['titulo'], s.get('editor'), s['tipo'], s['fecha'], s.get('url'))
        return self.mapa[n]

    def remap(self, obj):
        """Cambia las citas [n] de un texto (o estructura) del informe de S&P a la numeración de esta nota."""
        if isinstance(obj, str):
            def rep(m):
                partes = []
                for t in m.group(1).split(','):
                    t = t.strip()
                    if '-' in t:
                        a, b = t.split('-')
                        partes += [str(self.sp(i)) for i in range(int(a), int(b) + 1)]
                    else:
                        partes.append(str(self.sp(int(t))))
                return '[' + ', '.join(partes) + ']'
            return re.sub(r'\[(\d+(?:\s*[-,]\s*\d+)*)\]', rep, obj)
        if isinstance(obj, list):
            return [self.remap(x) for x in obj]
        if isinstance(obj, dict):
            return {k: self.remap(v) for k, v in obj.items()}
        return obj


def guardar(letra, d):
    with open(os.path.join(DIR, f'{letra}.json'), 'w', encoding='utf-8') as fh:
        json.dump(d, fh, ensure_ascii=False, indent=2)


# ---------------------------------------------------------------- A. Cuentas
A = Lista([
    ("Moody's: resultados del 4T25 y del ejercicio 2025 (8-K, Ex. 99.1)", "Moody's Corporation", 'Primaria', '2026-02-18', 'https://www.sec.gov/Archives/edgar/data/1059556/000162828026008788/a4q25earningsrelease.htm'),
    ("Moody's: resultados del 2T26 (8-K, Ex. 99.1)", "Moody's Corporation", 'Primaria', '2026-07-22', 'https://www.sec.gov/Archives/edgar/data/0001059556/000162828026049104/a2q26earningsrelease.htm'),
    ("Moody's: resultados del 1T26", "Moody's Corporation", 'Primaria', '2026-04-22', 'https://s203.q4cdn.com/694693571/files/doc_financials/2026/q1/1Q26-Earnings-Release-vFINAL.pdf'),
    ("Moody's: resultados del 3T25 (8-K, Ex. 99.1)", "Moody's Corporation", 'Primaria', '2025-10-22', 'https://www.sec.gov/Archives/edgar/data/1059556/000162828025045770/a3q25earningsrelease.htm'),
    ("Moody's: informe anual 10-K de 2025", "Moody's Corporation", 'Primaria', '2026-02-24', 'https://www.sec.gov/Archives/edgar/data/1059556/000162828026009136/mco-20251231.htm'),
    ("Moody's: 10-Q del 2T26", "Moody's Corporation", 'Primaria', '2026-07-24', 'https://www.sec.gov/Archives/edgar/data/0001059556/000162828026049398/mco-20260630.htm'),
    ("MCO: cuenta de resultados anual", 'ChartRow', 'Datos de mercado', '2026-10', 'https://chartrow.com/quote/mco/financials'),
    ("Moody's (MCO): estado de flujos de efectivo", 'Stock Analysis', 'Datos de mercado', '2026-10', 'https://stockanalysis.com/stocks/mco/financials/cash-flow-statement/'),
    ("Moody's (MCO): balance", 'Stock Analysis', 'Datos de mercado', '2026-10', 'https://stockanalysis.com/stocks/mco/financials/balance-sheet/'),
    ("Moody's Corp: datos financieros", 'Fidelity International', 'Datos de mercado', '2026-10', 'https://www.fidelity.co.uk/factsheet-data/factsheet/US6153691059-moodys-corp/financials'),
    ("Moody's (MCO): estados financieros", 'MarketBeat', 'Datos de mercado', '2026-10', 'https://www.marketbeat.com/stocks/NYSE/MCO/financials'),
    ("Moody's: resultados del 4T19 y del ejercicio 2019", "Moody's Corporation (Business Wire)", 'Primaria', '2020-02-12', 'https://www.businesswire.com/news/home/20200212005216/en'),
    ("Moody's Q2 earnings call highlights", 'Nasdaq', 'Prensa', '2026-07-22', 'https://www.nasdaq.com/articles/moodys-q2-earnings-call-highlights'),
    ("Moody's Q4 2025 earnings call transcript", 'MarketBeat', 'Prensa', '2026-02-18', 'https://www.marketbeat.com/earnings/reports/2026-2-18-moodys-co-stock/'),
    ("Moody's rated 2 trillion in debt again in Q2 earnings: here's the catch", 'TIKR', 'Prensa', '2026-07-23', 'https://www.tikr.com/blog/moodys-rated-2-trillion-in-debt-again-in-q2-earnings-heres-the-catch'),
    ("Moody's, conti battono le attese nel secondo trimestre", 'Teleborsa', 'Prensa', '2026-07-22', 'https://www.teleborsa.it/AMP/News/2026/07/22/moody-s-conti-battono-le-attese-nel-secondo-trimestre-123.html'),
    ("Moody's Corporation: balance trimestral", 'Weiss Ratings', 'Datos de mercado', '2026-10', 'https://weissratings.com/en/stock/mco-nyse/balance-sheet/quarterly'),
    ("Moody's (MCO) Q2 2026 earnings summary", 'Quartr', 'Prensa', '2026-07-22', 'https://quartr.com/events/moody-s-corporation-mco-q2-2026_3PH302vQ'),
    ("Moody's stock posts 46% operating margins in Q1 2026", 'TIKR', 'Prensa', '2026-04-23', 'https://www.tikr.com/blog/moodys-stock-posts-46-operating-margins-in-q1-2026-heres-what-investors-need-to-know'),
])

# Cuenta: ingresos y beneficio operativo de ChartRow [7] (cuadran con los comunicados [1, 4]); BPA diluido GAAP [7, 1];
# amortizaciones 2023-2025 de Stock Analysis [8]; 2021-2022 de los 10-K (dato de la serie de Stock Analysis).
# BAI e impuestos 2024-2025: resultado financiero = gasto financiero neto del 10-K (237 y 213 M) [5]; impuesto por diferencia.
def fila(p, ing, ebit, amort, fin, bn, bpa, dpa, acc, gf):
    bai = ebit + fin
    return {'periodo': p, 'ingresos': ing, 'coste_ventas': None, 'gastos_generales': None, 'ebitda': ebit + amort,
            'amortizaciones': amort, 'ebit': ebit, 'resultado_financiero': fin, 'bai': bai, 'impuestos': round(bai - bn, 0),
            'minoritarios': 0, 'beneficio_neto': bn, 'gastos_financieros': gf, 'participadas_en_ebitda': None,
            'no_recurrentes_en_ebitda': None, 'bpa': bpa, 'dpa': dpa, 'dpa_extraordinario': 0, 'acciones_diluidas': acc}

cuenta = [
    fila('2021', 6218, 2844, 257, -129, 2214, 11.78, 2.48, 188.0, 171),
    fila('2022', 5468, 1880, 331, -162, 1374, 7.44, 2.80, 184.6, 230),
    fila('2023', 5916, 2140, 373, -136, 1607, 8.73, 3.08, 184.1, 263),
    fila('2024', 7088, 2880, 431, -237, 2058, 11.26, 3.40, 182.8, 270),
    fila('2025', 7718, 3351, 480, -213, 2461, 13.67, 3.76, 180.0, 251),
]

financieros = {
    'cuenta': cuenta,
    'ltm': {'periodo': 'LTM jun-26', 'fecha_fin': '2026-06-30', 'ingresos': 8160, 'ebitda': 4171, 'ebit': 3676,
            'beneficio_neto': 2807, 'bpa': 15.77, 'dpa': 3.95, 'dpa_extraordinario': 0, 'fcf': 2967,
            'participadas_en_ebitda': None, 'no_recurrentes_en_ebitda': None},
    'cambios_perimetro': [],
    'comentario': (
        "Los ingresos pasaron de 6.218 M USD en 2021 a 7.718 M en 2025 [7, 1], con un bache en 2022 (−12 %) cuando la subida de tipos hundió la emisión de deuda y los ingresos de calificación. "
        "Desde entonces el crecimiento se ha acelerado: +8 % en 2023, +20 % en 2024 (emisión récord) y +9 % en 2025 [1, 7]. En el primer semestre de 2026 los ingresos crecieron un 11,5 % (2.079 M en el 1T, +8 %; 2.185 M en el 2T, +15 %, +16 % orgánico) [2, 3]. "
        "El margen operativo GAAP subió del 34,4 % de 2022 al 43,4 % de 2025 [7], y el ajustado del 48,1 % al 51,1 % en 2025 (+300 pb) [1]; en el 2T26 llegó al 47,9 % GAAP y 55,3 % ajustado [2]. "
        "El motor de margen es MIS (Moody's Investors Service: margen ajustado del 63,6 % en 2025 y del 68,3 % en el 2T26) [1, 2], con apalancamiento operativo muy alto: los ingresos transaccionales de MIS crecieron un 34 % en el 2T26 [2]. "
        "MA (Moody's Analytics) crece más despacio (+9 % en 2025; +4 % publicado y +8 % orgánico en el 2T26) pero con un 33,6 % de margen y ARR creciendo un 8 % [2, 3]. "
        "El crecimiento es casi todo orgánico: las compras de los últimos años son pequeñas, salvo RMS (2021). "
        "El ejercicio 2025 lleva un tipo impositivo bajo en el 4T (11,1 %) por la prescripción de contingencias fiscales de una compra antigua [1]."),
    'ajustes': (
        "Se usan cifras reportadas (US GAAP) en la cuenta. Moody's publica además un BPA ajustado que excluye la amortización de intangibles comprados, las reestructuraciones, los abandonos de activos y las plusvalías de participaciones previas [5]: 14,94 USD en 2025 frente a 13,67 GAAP [1], 12,47 frente a 11,26 en 2024, 9,90 frente a 8,73 en 2023, 8,57 frente a 7,44 en 2022 y 12,29 frente a 11,78 en 2021 (serie ajustada de los comunicados anuales; 8,29 en 2019 [12]). "
        "La diferencia (1,1-1,3 USD por acción) es sobre todo la amortización de intangibles comprados, que se repite cada año, más reestructuraciones casi anuales. "
        "En el 2T26 el BPA GAAP (5,03 USD) superó al ajustado (4,68) [2]: hay una ganancia no operativa no recurrente en el trimestre (no se pudo leer su detalle en el comunicado), que infla el BPA LTM (15,77 USD) frente al ajustado LTM (16,57 USD, suma de 3,92 + 3,64 + 4,33 + 4,68) [2, 3, 4, 1]. "
        "El LTM de EBIT (3.676 M) es estimación propia: 3.351 M de 2025 − 1S25 estimado al 43 % de margen + 1S26 al 44,3 % y 47,9 % de margen GAAP publicados [1, 2, 3]."),
    'confianza': 'Media',
}

trimestres = {
    'items': [
        {'periodo': '1T25', 'ingresos': 1924, 'crecimiento_pct': 8.0, 'crecimiento_organico_pct': None, 'ebitda': None, 'margen_ebitda_pct': None, 'bpa': 3.46, 'vs_consenso': None},
        {'periodo': '2T25', 'ingresos': 1898, 'crecimiento_pct': 4.5, 'crecimiento_organico_pct': None, 'ebitda': None, 'margen_ebitda_pct': None, 'bpa': 3.21, 'vs_consenso': None},
        {'periodo': '3T25', 'ingresos': 2007, 'crecimiento_pct': 11.0, 'crecimiento_organico_pct': None, 'ebitda': None, 'margen_ebitda_pct': None, 'bpa': 3.60, 'vs_consenso': 'Superior'},
        {'periodo': '4T25', 'ingresos': 1889, 'crecimiento_pct': 13.0, 'crecimiento_organico_pct': None, 'ebitda': None, 'margen_ebitda_pct': None, 'bpa': 3.41, 'vs_consenso': None},
        {'periodo': '1T26', 'ingresos': 2079, 'crecimiento_pct': 8.1, 'crecimiento_organico_pct': 6.0, 'ebitda': None, 'margen_ebitda_pct': None, 'bpa': 3.73, 'vs_consenso': 'Superior'},
        {'periodo': '2T26', 'ingresos': 2185, 'crecimiento_pct': 15.0, 'crecimiento_organico_pct': 16.0, 'ebitda': None, 'margen_ebitda_pct': None, 'bpa': 5.03, 'vs_consenso': 'Superior'},
    ],
    'ultima_presentacion': (
        "En el 2T26 (22-jul) Rob Fauber habló de un trimestre «sobresaliente»: ingresos +15 %, BPA ajustado +31 % a 4,68 USD frente a 4,25-4,26 esperados [13, 15, 18]. "
        "La dirección subió la previsión de emisión calificada a un crecimiento de un dígito medio, estrechó el BPA ajustado de 2026 a 16,50-17,00 USD (antes 16,40-17,00) y subió la recompra a hasta 3.000 M USD (2.000 M en febrero y 2.500 M en abril) [2, 13]. "
        "El discurso cambió entre las dos conferencias: en abril el peso estaba en la emisión récord de más de 2 billones USD y el margen ajustado de MA (+250 pb) [3]; en julio, en las «corrientes de fondo» de la financiación (refinanciaciones, inversión en IA y centros de datos, crédito privado, finanzas digitales, transición energética y emergentes) [13]. "
        "Fauber dijo que los hiperescaladores ya habían superado la emisión que Moody's preveía para todo 2026 y que, sin centros de datos ni IA, la emisión crecía igualmente a doble dígito [13]. "
        "Las preguntas de los analistas se centraron en la IA: la dirección dijo que la demanda inicial viene de investigación, datos de entidades, noticias y modelos de crédito «listos para IA» [13]. "
        "Lo que no se aclaró: el ARR total de MA y la previsión de ARR, y la sostenibilidad de una emisión que ya ha crecido mucho dos años seguidos; la guía del BPA quedó con el punto medio (16,75 USD) ligeramente por debajo del consenso (16,78) [16]."),
    'confianza': 'Media',
}

bal = lambda p, at, pt, gw, caja, deuda, pn: {
    'periodo': p, 'activo_total': at, 'activo_corriente': None, 'pasivo_corriente': None, 'pasivo_total': pt,
    'fondo_comercio': gw, 'intangibles': None, 'inmovilizado_material': None, 'existencias': 0, 'clientes': None,
    'proveedores': None, 'activos_contrato': None, 'pasivos_contrato': None, 'caja': caja, 'deuda_financiera': deuda,
    'arrendamientos': 0, 'patrimonio_neto': pn, 'minoritarios': 0, 'reservas': None}
balance = {
    'historico': [
        bal('2021', 14700, 11800, None, 1811, 7413, 2900),
        bal('2022', 14350, 11700, None, 1769, 7389, 2650),
        bal('2023', 14600, 11282, None, 2130, 7001, 3318),
        bal('2024', 15500, 11935, None, 2408, 7428, 3565),
        bal('2025', 15800, 11750, 6368, 2384, 6994, 4050),
    ],
    'vencimientos': [],
    'liquidez': 'Caja y equivalentes de 1.467 M USD y 29 M de inversiones a corto plazo a 30-jun-2026 (2.384 M a cierre de 2025) [2, 9]; flujo libre de 1.530 M en el primer semestre [2]. La línea de crédito comprometida no se pudo leer en el 10-Q.',
    'rating': None,
    'coste_deuda_pct': 3.6,
    'vida_media_anios': None,
    'otros_pasivos': (
        "Deuda a 30-jun-2026: 571 M a corto plazo (designada como cobertura de inversión neta en euros) y 6.375 M a largo, 6.946 M en total sin arrendamientos [6, 9]. "
        "Los arrendamientos son operativos en US GAAP (oficinas): su gasto ya está en el EBITDA y no se suman a la deuda. "
        "Pasivos que no son deuda pero cuentan: ingresos diferidos de las suscripciones de MA y de las tarifas anuales de seguimiento de MIS (cobrados por adelantado), que hacen que el circulante sea negativo y financian el crecimiento; contingencias fiscales de compras antiguas (una parte prescribió en el 4T25 y bajó el tipo al 11,1 %) [1]; litigios propios de una agencia de calificación. No se pudieron leer las notas de pensiones ni de garantías."),
    'comentario': (
        "Moody's opera con poco capital y deuda estable: la deuda bruta se ha movido entre 7.000 y 7.400 M desde 2021 [9] mientras el beneficio operativo subía de 1.880 M (2022) a 3.351 M (2025) [7], así que el apalancamiento ha bajado a ≈ 1,2 veces el EBITDA. "
        "El patrimonio neto es pequeño (4.050 M en 2025, 3.318 M en 2023) [17, 10] porque la empresa devuelve casi todo el flujo libre con recompras y dividendos; el activo es sobre todo fondo de comercio (6.368 M en 2025) e intangibles de compras [9]. "
        "En 2026 la caja ha bajado a 1.467 M por la recompra acelerada (≈ 2.200 M hasta julio) [2, 15]. Patrimonio de 2021-2022 estimado por diferencia entre activo y pasivo de Stock Analysis [9]: estimación propia."),
    'confianza': 'Baja',
}

flujos = {
    'historico': [
        {'periodo': '2021', 'flujo_operativo': 2214, 'capex': 155, 'pagos_arrendamientos': 0, 'adquisiciones': None, 'desinversiones': 0, 'dividendos': 465, 'recompras': 774, 'emision_acciones': 0, 'intereses_en_financiacion': 0},
        {'periodo': '2022', 'flujo_operativo': 1655, 'capex': 250, 'pagos_arrendamientos': 0, 'adquisiciones': None, 'desinversiones': 0, 'dividendos': 513, 'recompras': 1149, 'emision_acciones': 0, 'intereses_en_financiacion': 0},
        {'periodo': '2023', 'flujo_operativo': 2151, 'capex': 271, 'pagos_arrendamientos': 0, 'adquisiciones': None, 'desinversiones': 0, 'dividendos': 564, 'recompras': 561, 'emision_acciones': 0, 'intereses_en_financiacion': 0},
        {'periodo': '2024', 'flujo_operativo': 2838, 'capex': 317, 'pagos_arrendamientos': 0, 'adquisiciones': None, 'desinversiones': 0, 'dividendos': 620, 'recompras': 1383, 'emision_acciones': 0, 'intereses_en_financiacion': 0},
        {'periodo': '2025', 'flujo_operativo': 2901, 'capex': 326, 'pagos_arrendamientos': 0, 'adquisiciones': None, 'desinversiones': 0, 'dividendos': 701, 'recompras': 1706, 'emision_acciones': 0, 'intereses_en_financiacion': 0},
    ],
    'comentario': (
        "La conversión del beneficio en caja es alta y estable: el flujo libre de 2025 fue de 2.575 M (2.901 M operativo − 326 M de capex) [1, 8], un 105 % del beneficio neto; en los últimos 12 meses a junio de 2026, 2.967 M [8]. "
        "El capex (4,2 % de las ventas en 2025) es sobre todo software capitalizado y tecnología de MA; con amortizaciones de 480 M (que incluyen ≈ 200 M de intangibles comprados) la inversión neta es casi nula. "
        "La caja se devuelve: dividendos (701 M) y recompras (1.706 M) se llevaron el 94 % del flujo libre de 2025 [8], y en 2026 la guía es devolver al menos el 90 % del flujo libre (2.700-2.900 M tras la revisión de julio) con hasta 3.000 M de recompras [1, 2]. "
        "2022 fue el año flojo (1.655 M operativos) por la caída de la emisión. Flujos de 2021-2022 de la serie de Stock Analysis [8]. Compras de cada año: no se pudieron cuadrar con fuente (null)."),
    'confianza': 'Media',
}

negocio_A = {
    'segmentos': [
        {'nombre': "Moody's Investors Service (MIS)", 'descripcion': 'Calificaciones de crédito: corporativos, financieras, finanzas públicas y titulizaciones; ingresos transaccionales (nuevas emisiones) y recurrentes (seguimiento).', 'tipo_resultado': None,
         'historico': [{'periodo': '2025', 'ingresos': 4100, 'resultado': None}]},
        {'nombre': "Moody's Analytics (MA)", 'descripcion': 'Datos, investigación, software de riesgo (banca, seguros) y KYC (Orbis, Bureau van Dijk); suscripciones con ARR.', 'tipo_resultado': None,
         'historico': [{'periodo': '2025', 'ingresos': 3618, 'resultado': None}]},
    ],
    'kpis': [
        {'kpi': 'Ingresos de MIS (trimestre)', 'valor_anterior': '1.010 M (2T25)', 'valor_actual': '1.260 M (2T26)', 'variacion': '+25 %', 'comentario': 'Transaccionales 891 M (+34 %); recurrentes 369 M (+6 %) [2, 13].'},
        {'kpi': 'Margen ajustado de MIS', 'valor_anterior': '64,2 % (2T25)', 'valor_actual': '68,3 % (2T26)', 'variacion': '+410 pb', 'comentario': 'Apalancamiento operativo con la emisión récord [2].'},
        {'kpi': 'ARR de MA', 'valor_anterior': '3.343 M (1T25)', 'valor_actual': '3.607 M (1T26)', 'variacion': '+8 %', 'comentario': 'KYC +13 %, banca +10 %, seguros +9 %, investigación +6 % (2T26) [3, 13].'},
        {'kpi': 'Margen ajustado de MA', 'valor_anterior': '32,1 % (2T25)', 'valor_actual': '33,6 % (2T26)', 'variacion': '+150 pb', 'comentario': '30,0 % → 32,5 % en el 1T [2, 3].'},
        {'kpi': 'Margen operativo ajustado del grupo', 'valor_anterior': '48,1 % (2024)', 'valor_actual': '51,1 % (2025)', 'variacion': '+300 pb', 'comentario': 'Guía 2026: 50-53 % [1].'},
    ],
    'geografias': [],
}

guardar('A', {'_estado': 'Completo con lo que permitió la búsqueda web (14-oct, 15 búsquedas). Segmentos con un solo año; balance sin circulante.',
              'negocio': negocio_A, 'financieros': financieros, 'trimestres': trimestres, 'balance': balance, 'flujos': flujos,
              'calidad': {'auditor': 'KPMG LLP', 'anios_auditor': None, 'opinion': 'Favorable', 'comentario': None, 'senales': [], 'confianza': 'Baja'},
              'capital': {'politica': ("Moody's devuelve al menos el 90 % del flujo libre: en 2026, dividendo trimestral +10 % y recompras de hasta 3.000 M USD (subidas desde 2.000 M en febrero y 2.500 M en abril), de las que ≈ 2.200 M ya se habían hecho en julio [1, 2, 15]. "
                                      "La deuda bruta se mantiene en ≈ 7.000 M, así que las recompras salen del flujo libre (2.700-2.900 M previstos en 2026) y de la caja acumulada [2, 6]."),
                          'adquisiciones': [], 'comentario': None, 'confianza': 'Media'},
              'fuentes': A.f,
              'huecos': [
                  {'seccion': 'balance', 'campo': 'vencimientos', 'tipo': 'Complemento', 'intentos': '1) 10-K 2025, nota de deuda (sin acceso: solo búsqueda web); 2) 10-Q 2T26 en la búsqueda; 3) prensa de las emisiones de bonos', 'decision': 'Omitido'},
                  {'seccion': 'balance', 'campo': 'rating', 'tipo': 'Complemento', 'intentos': '1) 10-K 2025; 2) folletos de bonos; 3) prensa', 'decision': 'Omitido'},
                  {'seccion': 'balance', 'campo': 'circulante (clientes, activo y pasivo corriente)', 'tipo': 'Complemento', 'intentos': '1) 10-Q 2T26; 2) Stock Analysis en la búsqueda; 3) Weiss Ratings', 'decision': 'Omitido'},
                  {'seccion': 'flujos', 'campo': 'adquisiciones por año', 'tipo': 'Complemento', 'intentos': '1) 10-K; 2) Stock Analysis; 3) prensa', 'decision': 'Omitido'},
                  {'seccion': 'negocio', 'campo': 'segmentos 2021-2024 y resultado por segmento', 'tipo': 'Complemento', 'intentos': '1) comunicados 4T; 2) 10-K; 3) prensa', 'decision': 'Omitido'},
              ]})

# ---------------------------------------------------------------- B. Sector y competencia
B = Lista([
    ("Moody's: resultados del 2T26 (8-K, Ex. 99.1)", "Moody's Corporation", 'Primaria', '2026-07-22', 'https://www.sec.gov/Archives/edgar/data/0001059556/000162828026049104/a2q26earningsrelease.htm'),
    ("Moody's: resultados del 4T25 y del ejercicio 2025 (8-K, Ex. 99.1)", "Moody's Corporation", 'Primaria', '2026-02-18', 'https://www.sec.gov/Archives/edgar/data/1059556/000162828026008788/a4q25earningsrelease.htm'),
    ("Moody's (MCO): is its credit-ratings duopoly moat unbreakable?", 'Insider Monkey', 'Prensa', '2026-10-02', 'https://www.insidermonkey.com/news/moodys-mco-is-its-credit-ratings-duopoly-moat-unbreakable-1848040/'),
    ("Moody's Q2 earnings call highlights", 'Nasdaq', 'Prensa', '2026-07-22', 'https://www.nasdaq.com/articles/moodys-q2-earnings-call-highlights'),
    ("Moody Corporation stock fell 23% in early 2026: why the private credit boom could fuel a rebound", 'TIKR', 'Prensa', '2026-07', 'https://www.tikr.com/blog/moody-corporation-stock-fell-23-in-early-2026-why-the-private-credit-boom-could-fuel-a-63-rebound'),
])
s = SP['sector']
drivers = [d for d in s['drivers'] if 'ETF' not in d['driver'] and 'pasiva' not in d['driver']]
porter = s['porter']
sector = {
    'definicion': (
        "El mercado relevante de Moody's es doble y mundial: **calificaciones de crédito** (MIS, 53 % de los ingresos de 2025 y la mayor parte del beneficio) y **datos, análisis y software de riesgo** para bancos, aseguradoras y empresas (MA, 47 %) [2]. "
        "Para las calificaciones no hay una serie independiente de tamaño: se usan los ingresos de las NRSRO que publica la SEC y la cuota de calificaciones vigentes (informe de S&P Global del 12-oct). "
        "Para datos y análisis, la serie de Burton-Taylor de gasto mundial en datos y análisis de mercados financieros, que cubre parte de MA (investigación de crédito, datos de entidades) pero no el software de riesgo ni el KYC. "
        "Es el mismo marco que el informe de S&P Global del 12-oct, del que se reutilizan serie, Porter y regulación."),
    'tamano': B.remap(s['tamano']),
    'unidad_serie': s['unidad_serie'],
    'serie': s['serie'],
    'tcac_historico_pct': s['tcac_historico_pct'], 'tcac_previsto_pct': None,
    'cr5_pct': s['cr5_pct'], 'estructura': 'Concentrada',
    'drivers': B.remap(drivers),
    'porter': B.remap(porter),
    'ciclo': {'posicion': 'Expansión', 'comentario': (
        "La emisión calificada por Moody's superó los 2 billones USD en el 1T26 y otra vez en el 2T26, y los ingresos transaccionales de MIS crecieron un 34 % en el 2T26 [1, 4]. "
        "La dirección subió en julio la previsión de emisión de 2026 a un crecimiento de un dígito medio, tras dos años fuertes [4]. "
        "En 2022 la subida de tipos hundió la emisión y los ingresos del grupo cayeron un 12 % (MIS mucho más) mientras MA seguía creciendo [2]. "
        "Estamos en la parte alta del ciclo de emisión: diferenciales estrechos, refinanciación del muro de vencimientos de 2027-2028 y deuda para centros de datos de IA.")},
    'regulacion': (
        "MIS está registrada en la SEC como NRSRO (Credit Rating Agency Reform Act de 2006 y Dodd-Frank), supervisada por ESMA en la UE y por la FCA en el Reino Unido; la normativa limita conflictos de interés y exige transparencia de métodos. "
        "La SEC vigila en sus exámenes anuales el crecimiento de las calificaciones privadas de crédito privado. El Reglamento europeo de calificaciones ESG se aplica desde mediados de 2026. "
        "Las agencias se benefician de que la regulación de bancos, aseguradoras y fondos, y los mandatos de inversión, citen calificaciones de agencias reconocidas (informe de S&P Global del 12-oct)."),
    'tendencias': (
        "Tres tendencias. La **IA generativa** es amenaza para los datos genéricos de MA (clientes y nuevos competidores que construyen sus propias herramientas) y oportunidad para los datos propios y verificables: Moody's vende datos de entidades, investigación y modelos de crédito «listos para IA» [4]. "
        "El **crédito privado** crece rápido y pide calificaciones privadas; Moody's lo cita entre los motores de la emisión de 2026 [4, 5]. "
        "La **financiación de la infraestructura de IA** (hiperescaladores, centros de datos) ha disparado la emisión de grado de inversión en 2026 [4]. Moody's gana con las tres, con el riesgo de que la de IA sea un pico."),
    'confianza': 'Media',
}
comp_sp = SP['competencia']['competidores']
sp_row = {'nombre': 'S&P Global', 'pais': 'EE. UU.', 'ticker': 'SPGI', 'ingresos': 13589, 'cuota_pct': 49.6, 'margen_ebit_pct': 43.0,
          'comentario': 'Primera agencia del mundo (49,6 % de las calificaciones vigentes de las NRSRO a 2024) y primera en índices; Ratings facturó 4.724 M USD en 2025. Ingresos y margen de 2025 pro forma tras escindir Mobility (informe de S&P Global, 12-oct).'}
otros = [c for c in comp_sp if c['ticker'] not in ('MCO',)]
competidores = [sp_row] + B.remap(otros)
competencia = {
    'cuota_pct': 31.39,
    'posicion': "**2.ª agencia de calificación del mundo**: 31,39 % de las calificaciones vigentes de las NRSRO a 31-dic-2024, frente al 49,60 % de S&P y el 12,40 % de Fitch (SEC, informe anual de NRSRO, citado en el informe de S&P Global); por ingresos, MIS facturó unos 4.100 M USD en 2025 frente a 4.724 M de S&P Ratings [2]. En datos y software de riesgo (MA) compite con S&P Market Intelligence, LSEG, Bloomberg, FactSet y Verisk, sin cuota de dos cifras.",
    'competidores': competidores,
    'foso': {'veredicto': 'Amplio', 'tendencia': 'Estable', 'fuentes': [
        {'fuente': 'Efectos de red', 'puntuacion': 4, 'evidencia': 'Una calificación vale porque la usan todos: mandatos de inversión, índices de renta fija y normas de capital piden calificaciones de agencias reconocidas; un emisor que no tiene la de Moody\'s paga más diferencial. Tres agencias reúnen el 93 % de las calificaciones vigentes [3].'},
        {'fuente': 'Costes de cambio', 'puntuacion': 4, 'evidencia': 'MA vende suscripciones integradas en los procesos de riesgo y KYC de bancos y aseguradoras (ARR 3.607 M, +8 %) [1]; en MIS los ingresos recurrentes de seguimiento (369 M en el 2T26, +6 %) se cobran mientras la deuda viva [4].'},
        {'fuente': 'Intangibles (marca, patentes, licencias)', 'puntuacion': 5, 'evidencia': 'Registro NRSRO y de ESMA/FCA, un siglo de historial de impagos que sirve de base a los modelos, y marca reconocida por todos los inversores; el margen ajustado de MIS (68,3 % en el 2T26) es la prueba [1].'},
        {'fuente': 'Ventaja en costes', 'puntuacion': 3, 'evidencia': 'La escala reparte los costes fijos de analistas y tecnología: el margen ajustado del grupo subió 300 pb en 2025 a 51,1 % [2].'},
        {'fuente': 'Escala eficiente', 'puntuacion': 4, 'evidencia': 'El mercado de calificaciones solo admite dos agencias globales completas y una tercera; KBRA y DBRS ganan cuota en nichos (titulizaciones) sin alterar el reparto [3].'},
    ]},
    'amenazas': (
        "La amenaza más probable es la IA generativa sobre MA: si los clientes construyen modelos de riesgo y KYC con datos más baratos, el ARR de MA (+8 %) podría frenarse y su margen (33,6 %) dejar de subir; la dirección dice que hoy la IA aumenta la demanda de sus datos [4]. "
        "En calificaciones, la amenaza es regulatoria (responsabilidad civil, separación de negocios, topes de tarifas) o de cuota en crédito privado frente a KBRA y otras; la probabilidad de un cambio que rompa el duopolio en cinco años es baja."),
    'confianza': 'Media',
}
negocio_B = {
    'descripcion': (
        "Moody's Corporation tiene dos negocios. **MIS** califica el crédito de empresas, bancos, aseguradoras, Estados, municipios y titulizaciones: cobra al emisor una tarifa al calificar cada emisión (ingresos transaccionales, 891 M en el 2T26) y una tarifa anual de seguimiento (recurrentes, 369 M) [1]. "
        "**MA** vende datos, investigación de crédito, modelos y software de riesgo a bancos (préstamo, capital, IFRS 9), aseguradoras (catástrofes, con RMS) y empresas (KYC y datos de entidades con Orbis de Bureau van Dijk), casi todo por suscripción (ARR 3.607 M en el 1T26) [1]. "
        "Los clientes son emisores e intermediarios de los mercados de capitales de todo el mundo y unas 15.000 entidades financieras y corporativas; Estados Unidos es algo más de la mitad de los ingresos."),
    'como_gana_dinero': (
        "En 2025, MIS ingresó unos 4.100 M y MA 3.618 M [2]. MIS es un negocio de costes casi fijos: cada emisión adicional entra con margen muy alto, de ahí el 68,3 % de margen ajustado del 2T26 con los transaccionales +34 % [1]; cuando la emisión cae, como en 2022, el margen baja con la misma rapidez. "
        "MA es más estable (más del 90 % recurrente) y crece al ritmo del ARR (+8 %), con margen del 33,6 % y en subida [1]. "
        "El poder de precios es la palanca silenciosa: las tarifas suben cada año por encima de la inflación en las dos divisiones. El crecimiento combina emisión (volumen, cíclica), precio (estructural) y ARR de MA."),
    'clientes': (
        "Sin concentración: ningún cliente llega al 10 % de los ingresos. En MIS el cliente es el emisor, que necesita la calificación para colocar su deuda; la tarifa es un porcentaje pequeño del coste de la emisión, lo que da poder de precios. "
        "En MA la retención es alta y el ARR crece un 8 % con subidas de precio y ventas cruzadas [1]. No se pudo leer en el 10-K la tasa de retención ni el desglose por cliente."),
    'geografias': [],
    'confianza': 'Media',
}
historia = {
    'resumen': (
        "John Moody publicó en 1909 las primeras calificaciones de bonos de ferrocarriles. Dun & Bradstreet compró la empresa en 1962 y la escindió en 2000 como Moody's Corporation, cotizada en Nueva York. "
        "Berkshire Hathaway es el mayor accionista desde los años noventa. Tras la crisis de 2008 las agencias pasaron por demandas y nueva regulación (Dodd-Frank). Desde 2007 la empresa ha construido Moody's Analytics con compras: Bureau van Dijk (2017, ≈ 3.300 M EUR) y RMS (2021, ≈ 2.000 M USD). Rob Fauber es consejero delegado desde 2021."),
    'hitos': [
        {'anio': '1909', 'hito': 'John Moody publica calificaciones de bonos ferroviarios.'},
        {'anio': '1962', 'hito': 'Dun & Bradstreet compra Moody\'s.'},
        {'anio': '2000', 'hito': 'Escisión de Dun & Bradstreet y salida a bolsa como Moody\'s Corporation.'},
        {'anio': '2007', 'hito': 'Se crea Moody\'s Analytics como división separada de la agencia.'},
        {'anio': '2017', 'hito': 'Compra de Bureau van Dijk (datos de empresas, Orbis).'},
        {'anio': '2021', 'hito': 'Compra de RMS (modelos de catástrofes para seguros); Rob Fauber, consejero delegado.'},
        {'anio': '2022', 'hito': 'La subida de tipos hunde la emisión: ingresos −12 %.'},
        {'anio': '2026', 'hito': 'Emisión calificada récord (más de 2 billones USD por trimestre) y recompras de hasta 3.000 M.'},
    ],
    'confianza': 'Media',
}
guardar('B', {'_estado': 'Completo (sector reutilizado del informe de S&P Global del 12-oct).', 'historia': historia, 'negocio': negocio_B,
              'sector': sector, 'competencia': competencia, 'fuentes': B.f,
              'huecos': [{'seccion': 'sector', 'campo': 'tcac_previsto_pct', 'tipo': 'Complemento', 'intentos': '1) Burton-Taylor; 2) informe de S&P Global; 3) prensa', 'decision': 'Omitido'}]})

# ---------------------------------------------------------------- C. Equipo y gobierno
C = Lista([
    ("Moody's: proxy statement 2026 (DEF 14A)", "Moody's Corporation", 'Primaria', '2026-03-04', 'https://s203.q4cdn.com/694693571/files/doc_financials/2025/Annual/MOODYS-CORP_PROXY_BOOKMARK_2026_V1_PWO-60975.pdf'),
    ("Moody's: 8-K con los resultados de la junta de 2026", "Moody's Corporation", 'Primaria', '2026-04-16', 'https://www.boardroomalpha.com/sec/mco-8-k-2026-04-16-0001059556-26-000031'),
    ("Moody's CEO Robert Fauber sells 1,467 shares", 'MarketBeat (Form 4)', 'Datos de mercado', '2026-08-04', 'https://www.marketbeat.com/instant-alerts/insider-selling-moodys-nysemco-ceo-sells-1467-shares-2026-08-04/'),
    ("Insider selling: Moody's CEO sells 1,467 shares", 'InsiderTrades (Form 4)', 'Datos de mercado', '2026-04-04', 'https://www.insidertrades.com/alerts/nyse-mco-insider-buying-and-selling-2026-04-04'),
    ("Date set for Moody's earnings release and investor teleconference", "Moody's Corporation (Business Wire)", 'Primaria', '2026-09-30', 'https://finviz.com/news/396917/date-set-for-moodys-earnings-release-and-investor-teleconference'),
    ("Moody's: resultados del 1T26", "Moody's Corporation", 'Primaria', '2026-04-22', 'https://s203.q4cdn.com/694693571/files/doc_financials/2026/q1/1Q26-Earnings-Release-vFINAL.pdf'),
    ("Moody's: resultados del 2T26", "Moody's Corporation", 'Primaria', '2026-07-22', 'https://www.sec.gov/Archives/edgar/data/0001059556/000162828026049104/a2q26earningsrelease.htm'),
    ("Moody's: resultados del 4T25", "Moody's Corporation", 'Primaria', '2026-02-18', 'https://www.sec.gov/Archives/edgar/data/1059556/000162828026008788/a4q25earningsrelease.htm'),
    ("Moody's: resultados del 3T25", "Moody's Corporation", 'Primaria', '2025-10-22', 'https://www.sec.gov/Archives/edgar/data/1059556/000162828025045770/a3q25earningsrelease.htm'),
    ("Berkshire Hathaway: 13F", 'SEC', 'Primaria', '2025', 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001067983&type=13F-HR'),
    ("Moody's Corporation elects Lisa P. Sawicki to Board of Directors (8-K)", "Moody's Corporation", 'Primaria', '2026-01-12', 'https://www.sec.gov/Archives/edgar/data/1059556/000105955626000004/pressreleasejan12.htm'),
])
directivos = {
    'equipo': [
        {'nombre': 'Robert (Rob) Fauber', 'cargo': 'Consejero delegado (President & CEO)', 'desde': '2021', 'participacion_pct': 0.03, 'trayectoria': 'En Moody\'s desde 2005; antes dirigió MIS y fue director de operaciones. Con él los ingresos pasaron de 6.218 M (2021) a 7.718 M (2025) y el margen ajustado a 51,1 % [8]. Conserva 51.964 acciones directas tras sus ventas programadas de 2026 [3].'},
        {'nombre': 'Noémie Heuland', 'cargo': 'Directora financiera', 'desde': None, 'participacion_pct': None, 'trayectoria': 'Firma las conferencias de resultados con Fauber [5].'},
        {'nombre': 'Christina Kosmowski', 'cargo': "Consejera delegada de Moody's Analytics", 'desde': '2026', 'participacion_pct': None, 'trayectoria': 'Nombrada en abril de 2026, efectiva en junio [6].'},
    ],
    'historial_guidance': [
        {'anio': '2025', 'guia': 'BPA ajustado 14,50-14,75 USD (octubre de 2025)', 'real': '14,94 USD', 'cumplida': 'Sí'},
        {'anio': '2026', 'guia': 'BPA ajustado 16,40-17,00 USD (febrero), 16,50-17,00 (julio); ingresos +un dígito alto', 'real': '1S26: 9,01 USD ajustados, +22 %', 'cumplida': 'Parcial'},
    ],
    'comentario': (
        "El equipo cumple y supera la guía: en 2025 el BPA ajustado (14,94 USD) batió el rango alto que había dado en octubre (14,75) [8, 9], y en 2026 ya ha subido dos veces la recompra y el suelo del BPA [7]. "
        "La sucesión parece ordenada: Fauber llegó desde dentro (MIS) y en 2026 se nombró a una nueva consejera delegada para MA [6]. "
        "Las ventas de Fauber son pequeñas y programadas (plan 10b5-1) [3, 4]."),
    'confianza': 'Baja',
}
gobierno = {
    'consejo': [
        {'nombre': 'Vincent A. Forlenza', 'cargo': 'Presidente del consejo (no ejecutivo)', 'tipo': 'Independiente', 'desde': None, 'comisiones': None},
        {'nombre': 'Robert Fauber', 'cargo': 'Consejero delegado (President & CEO)', 'tipo': 'Ejecutivo', 'desde': '2021', 'comisiones': None},
        {'nombre': 'Lisa P. Sawicki', 'cargo': 'Consejera', 'tipo': 'Independiente', 'desde': '2026', 'comisiones': 'Auditoría; Gobierno y Nombramientos'},
        {'nombre': 'Sumit Dhawan', 'cargo': 'Consejero', 'tipo': 'Independiente', 'desde': '2025', 'comisiones': None},
    ],
    'presidente_ceo_separados': True, 'presidente_ejecutivo': False, 'consejero_coordinador': None, 'una_accion_un_voto': True,
    'operaciones_vinculadas_relevantes': False, 'variable_ligado_rentabilidad': None, 'auditoria_independiente': None,
    'insiders_sin_operaciones': False, 'accionista_control': False, 'presidente_vinculado_control': False, 'cambios_cupula_24m': 0,
    'voto_remuneracion_pct': None, 'voto_remuneracion_contra_pct': None, 'voto_remuneracion_contra_libre_pct': None, 'voto_cupula_pct': None,
    'remuneracion_ceo': None,
    'remuneracion': (
        "La junta del 14-abr-2026 aprobó la remuneración de los directivos en voto consultivo y reeligió a los diez consejeros; Fauber obtuvo 149,8 M de votos a favor y 0,6 M en contra (99,6 %) [2]. "
        "No se pudo leer el detalle del proxy (métricas del variable, importe total de 2025) desde este entorno [1]."),
    'accionistas': [
        {'nombre': 'Berkshire Hathaway', 'pct': 14.2, 'tipo': 'Inversor a largo plazo', 'variacion': '24,67 M de acciones según sus 13F hasta 2025, sin cambios conocidos; el porcentaje sube con las recompras de Moody\'s. No verificado a octubre de 2026 [10].'},
    ],
    'insiders': [
        {'fecha': '2026-03-03', 'persona': 'Robert Fauber (CEO)', 'operacion': 'Venta', 'acciones': 5213, 'importe': 2.38},
        {'fecha': '2026-05-01', 'persona': 'Robert Fauber (CEO)', 'operacion': 'Venta', 'acciones': 1467, 'importe': 0.68},
        {'fecha': '2026-06-01', 'persona': 'Robert Fauber (CEO)', 'operacion': 'Venta', 'acciones': 1467, 'importe': 0.67},
        {'fecha': '2026-08-03', 'persona': 'Robert Fauber (CEO)', 'operacion': 'Venta', 'acciones': 1467, 'importe': 0.71},
    ],
    'control_y_defensas': (
        "Presidente del consejo y consejero delegado separados: Vincent Forlenza preside y Fauber es el primer ejecutivo [11]. El consejo tiene diez miembros tras la entrada de Lisa Sawicki (expresidenta mundial de PwC) en marzo de 2026, en las comisiones de auditoría y de nombramientos [11]; el resto del consejo y la independencia de cada consejero no se pudieron leer en el proxy. Una sola clase de acciones, sin accionista de control: Berkshire Hathaway tiene en torno al 14 % y no está en el consejo [10]. "
        "Los consejeros se eligen cada año (diez en 2026) con mayoría simple [2]. No hay operaciones vinculadas relevantes conocidas. Los directivos tienen el 0,14 % del capital."),
    'alertas': ['Ventas programadas (10b5-1) del consejero delegado en 2026, de importe pequeño [3, 4].', 'No se pudo leer el proxy completo: composición del consejo, comisiones y métricas del variable quedan sin verificar.'],
    'confianza': 'Baja',
}
guardar('C', {'_estado': 'Parcial: el proxy no se pudo leer (solo búsqueda web).', 'directivos': directivos, 'gobierno': gobierno, 'fuentes': C.f,
              'huecos': [
                  {'seccion': 'gobierno', 'campo': 'consejo completo y comisiones', 'tipo': 'Núcleo', 'intentos': '1) proxy DEF 14A 2026; 2) 8-K de la junta (solo votos de Fauber); 3) web de inversores en la búsqueda', 'decision': 'Omitido'},
                  {'seccion': 'gobierno', 'campo': 'remuneracion_ceo y voto de remuneración', 'tipo': 'Complemento', 'intentos': '1) proxy; 2) 8-K de la junta; 3) prensa', 'decision': 'Omitido'},
              ]})

# ---------------------------------------------------------------- D. Mercado y valoración
D = Lista([
    ("Moody's (MCO): gráfico y cotización", 'Yahoo Finance', 'Datos de mercado', '2026-10-09', 'https://finance.yahoo.com/quote/MCO/chart/'),
    ("Moody's (MCO): cotización, capitalización y rango de 52 semanas", 'Syfe', 'Datos de mercado', '2026-09-04', 'https://www.syfe.com/stocks/us/MCO'),
    ("Moody's (MCO): estadísticas", 'Stock Analysis', 'Datos de mercado', '2026-10-09', 'https://stockanalysis.com/stocks/mco/statistics/'),
    ("Moody's: precios objetivo de los analistas", 'Benzinga', 'Analistas', '2026-08-12', 'https://www.benzinga.com/quote/MCO/price-targets'),
    ("MCO: precio objetivo", 'VCP Scanner', 'Analistas', '2026-07-02', 'https://www.vcpscanner.com/stock/mco/price-target'),
    ("Moody's: estimaciones de consenso", 'Trendlyne', 'Analistas', '2026-10', 'https://us.trendlyne.com/us/equity/consensus-estimates/1404133/MCO/moody-s-corp/'),
    ("Moody Corporation stock fell 23% in early 2026", 'TIKR', 'Prensa', '2026-07', 'https://www.tikr.com/blog/moody-corporation-stock-fell-23-in-early-2026-why-the-private-credit-boom-could-fuel-a-63-rebound'),
    ("Moody's: histórico de cotizaciones (41 años)", 'Macrotrends', 'Datos de mercado', '2026-10', 'https://secure.macrotrends.net/stocks/charts/MCO/moodys/stock-price-history'),
    ("Moody's Corporation (MCO): histórico de precios", 'Digrin', 'Datos de mercado', '2026-10', 'https://www.digrin.com/stocks/detail/MCO/price'),
    ("Moody's: datos financieros y estimaciones", 'MarketScreener', 'Datos de mercado', '2026-10-12', 'https://www.marketscreener.com/quote/stock/MOODY-S-CORPORATION-16724/finances/'),
    ("MCO vs SPGI: how Moody's and S&P Global compare", 'Walnut', 'Datos de mercado', '2026-07', 'https://walnutinvest.com/stocks/compare/mco-vs-spgi'),
    ("Moody's, conti battono le attese nel secondo trimestre", 'Teleborsa', 'Prensa', '2026-07-22', 'https://www.teleborsa.it/AMP/News/2026/07/22/moody-s-conti-battono-le-attese-nel-secondo-trimestre-123.html'),
    ("Moody's receives average rating of Moderate Buy from analysts", 'MarketBeat', 'Analistas', '2026-03-14', 'https://www.marketbeat.com/instant-alerts/moodys-corporation-nysemco-receives-average-rating-of-moderate-buy-from-analysts-2026-03-14/'),
    ("Moody's: resultados del 2T26 (8-K, Ex. 99.1)", "Moody's Corporation", 'Primaria', '2026-07-22', 'https://www.sec.gov/Archives/edgar/data/0001059556/000162828026049104/a2q26earningsrelease.htm'),
    ("Moody's: resultados del 4T25 (8-K, Ex. 99.1)", "Moody's Corporation", 'Primaria', '2026-02-18', 'https://www.sec.gov/Archives/edgar/data/1059556/000162828026008788/a4q25earningsrelease.htm'),
    ("Date set for Moody's earnings release and investor teleconference", "Moody's Corporation (Business Wire)", 'Primaria', '2026-09-30', 'https://finviz.com/news/396917/date-set-for-moodys-earnings-release-and-investor-teleconference'),
    ("S&P Global: análisis de inversión (datos.json del repo, corte 12-oct-2026)", 'Repositorio propio', 'Analistas', '2026-10-12', None),
    ("Moody's (MCO): is its credit-ratings duopoly moat unbreakable?", 'Insider Monkey', 'Prensa', '2026-10-02', 'https://www.insidermonkey.com/news/moodys-mco-is-its-credit-ratings-duopoly-moat-unbreakable-1848040/'),
])

identificacion = {
    'nombre': "Moody's Corporation", 'nombre_corto': "Moody's", 'ticker': 'MCO', 'isin': 'US6153691059', 'mercado': 'NYSE',
    'indice_referencia': 'S&P 500', 'pais': 'Estados Unidos', 'pais_iso': 'US', 'sector': 'Financieras', 'industria': 'Mercados de capitales (datos y calificaciones)',
    'sede': 'Nueva York', 'fundacion': '1909', 'empleados': None, 'web': 'ir.moodys.com',
    'precio': 464.23, 'fecha_precio': '2026-10-09', 'acciones': 173.2, 'capitalizacion_publicada': 80395, 'free_float_pct': None,
    'max_52s': 546.88, 'min_52s': 402.28, 'volumen_medio_diario': None, 'proximos_resultados': '2026-10-21',
}
consenso = {
    'guidance': (
        "Guía de 2026 (22-jul-2026): ingresos con crecimiento de un dígito alto, emisión calificada con crecimiento de un dígito medio, margen operativo ajustado del 50-53 %, BPA ajustado de 16,50-17,00 USD (16,40-17,00 en febrero y abril), flujo libre de 2.700-2.900 M (2.800-3.000 M en febrero) y recompras de hasta 3.000 M [14, 15]. "
        "No hay un plan a medio plazo nuevo publicado en 2026 que se haya podido leer. Próximos resultados (3T26): 21-oct-2026, antes de la apertura [16]."),
    'estimaciones': [
        {'periodo': '2026e', 'ingresos': None, 'ebitda': None, 'ebit': None, 'bpa': 16.78, 'dpa': 4.12, 'fuente': 'Consenso de BPA ajustado citado por Teleborsa tras el 2T26 [12]; dividendo trimestral de 1,03 USD (+10 %) [15]'},
    ],
    'recomendaciones': {'n_analistas': 19, 'comprar': 15, 'mantener': 4, 'vender': 0, 'po_medio': 553, 'po_min': 490, 'po_max': 610},
    'revisiones': (
        "Tras el 2T26 los objetivos subieron (Baird de 557 a 572 USD, Mizuho de 521 a 530) [4]. Las fuentes discrepan en la media: 553 USD con 19-20 analistas en Benzinga (agosto) [4], 541 USD en VCP Scanner (julio) [5], 536 USD con 23 analistas en Trendlyne [6] y 550 USD en MarketBeat (marzo) [13]. "
        "El BPA de 2026 del consenso (16,78 USD) quedó apenas por encima del punto medio de la guía [12]. No se pudieron leer las estimaciones de 2027-2028 (MarketScreener solo abre con WebFetch). Solo hay una fuente para el BPA."),
    'base_ebitda': 'NIIF', 'ajuste_ebitda_pct_ventas': None,
    'confianza': 'Baja',
}
bolsa = {
    'tipo_rentabilidad': 'de precio (sin dividendos)',
    'rentabilidades': [
        {'periodo': 'En el año', 'accion_pct': -9.1, 'indice_pct': None, 'sector_pct': None},
    ],
    'anual': [
        {'anio': '2022', 'accion_pct': -28.7, 'indice_pct': None},
        {'anio': '2023', 'accion_pct': 40.2, 'indice_pct': None},
        {'anio': '2024', 'accion_pct': 21.2, 'indice_pct': None},
        {'anio': '2025', 'accion_pct': 7.9, 'indice_pct': None},
    ],
    'beta': None, 'volatilidad_pct': None, 'max_drawdown_pct': None, 'posicion_corta_pct': None,
    'comentario': (
        "La acción cerró 2025 en 510,85 USD [9] y cayó un 23 % a comienzos de 2026 (mínimo de 52 semanas de 402,28 USD) por el miedo a que la IA abarate los datos y a una emisión irregular [7, 2]. "
        "Se recuperó con los resultados del 1T y el 2T (487 USD el 10-jul y 493,55 el 4-sep) [7, 2] y volvió a bajar en septiembre-octubre hasta 464,23 USD el 9-oct [1], un 15 % por debajo del máximo de 546,88 [2]. "
        "En el año pierde un 9 % pese a que el BPA ajustado del primer semestre ha crecido un 22 %: el múltiplo se ha comprimido. Rentabilidades de precio calculadas con cierres de Digrin y Yahoo [9, 1]; sin dividendos ni índice (sin datos de bolsa.mjs en este entorno)."),
    'confianza': 'Baja',
}
# Precios de cierre de cada ejercicio (sin ajustar por dividendos) [9]; 2018-2021 de memoria del histórico de Digrin: se dejan sin cifra.
multiplos = {
    'serie': [
        {'anio': '2021', 'precio_cierre': 390.58, 'ev_ebitda_ntm': None, 'per_ntm': None, 'excluir': False},
        {'anio': '2022', 'precio_cierre': 278.62, 'ev_ebitda_ntm': None, 'per_ntm': None, 'excluir': True},
        {'anio': '2023', 'precio_cierre': 390.56, 'ev_ebitda_ntm': None, 'per_ntm': None, 'excluir': False},
        {'anio': '2024', 'precio_cierre': 473.37, 'ev_ebitda_ntm': None, 'per_ntm': None, 'excluir': False},
        {'anio': '2025', 'precio_cierre': 510.85, 'ev_ebitda_ntm': None, 'per_ntm': None, 'excluir': False},
    ],
    'comentario': None, 'confianza': 'Media',
}
# Comparables: los del informe de S&P Global (precio del 9-oct-2026, MarketScreener y Stock Analysis), sin Moody's y con S&P Global.
comps = [c for c in SP['comparables']['empresas'] if c['ticker'] != 'MCO']
spc = SP['calc']['clave']
comps = [{'nombre': 'S&P Global', 'ticker': 'SPGI', 'pais': 'US', 'capitalizacion': 120266, 'ev_ventas': spc['ev_ventas_ltm'], 'ev_ebitda_ltm': spc['ev_ebitda_ltm'],
          'ev_ebitda_ntm': spc['ev_ebitda_ntm'], 'per_ntm': spc['per_ntm'], 'crecimiento_pct': 7.6, 'margen_ebitda_pct': spc['margen_ebitda_pct'],
          'roic_pct': None, 'dn_ebitda': spc['dn_ebitda'], 'fcf_yield_pct': spc['fcf_yield_pct']}] + comps
comparables = {
    'criterio': D.remap(SP['comparables']['criterio']).replace("Moody's es el gemelo de Calificaciones.", "S&P Global es el gemelo (calificaciones e índices; sus múltiplos, del informe del 12-oct [17]).") + ' Todos del informe de S&P Global del 12-oct, con precios del 9-oct, el mismo día que el precio de Moody\'s [17].',
    'empresas': comps,
    'comentario': None,
    'confianza': 'Media',
}
transacciones = {'operaciones': D.remap(SP['transacciones']['operaciones']), 'comentario': (
    "Las operaciones del sector se pagan a 13-31 veces el EBITDA (mediana en torno a 18 veces) y a 4-18 veces las ventas: los activos de datos con ingresos recurrentes cotizan caros también en privado. "
    "Moody's no es un objetivo realista (80.000 M de capitalización, Berkshire como mayor accionista y una agencia de calificación que ningún competidor podría comprar por competencia), así que las transacciones solo sirven de referencia de valor para MA."), 'confianza': 'Media'}
guardar('D', {'_estado': 'Completo con lo que permitió la búsqueda; consenso de una fuente.', 'identificacion': identificacion, 'consenso': consenso, 'bolsa': bolsa,
              'multiplos_historicos': multiplos, 'comparables': comparables, 'transacciones': transacciones, 'fuentes': D.f,
              'huecos': [
                  {'seccion': 'consenso', 'campo': 'estimaciones 2027e-2028e', 'tipo': 'Núcleo', 'intentos': '1) MarketScreener (no abre sin WebFetch); 2) Trendlyne y Benzinga en la búsqueda; 3) prensa tras el 2T26', 'decision': 'Omitido'},
                  {'seccion': 'bolsa', 'campo': 'beta, volatilidad, caída máxima e índices', 'tipo': 'Complemento', 'intentos': '1) bolsa.mjs (sin red); 2) Yahoo en la búsqueda; 3) Stock Analysis', 'decision': 'Omitido'},
                  {'seccion': 'identificacion', 'campo': 'precio del 13-oct-2026', 'tipo': 'Núcleo', 'intentos': '1) Yahoo; 2) MarketBeat y Google Finance; 3) prensa', 'decision': 'Calculado y marcado como estimación'},
              ]})

# ---------------------------------------------------------------- E. Sentimiento
E = Lista([
    ("Moody's Corporation: strong Q2, I reiterate my Buy rating as fundamentals are still sound", 'Seeking Alpha', 'Foros y redes', '2026-07-24', 'https://seekingalpha.com/article/4925241-moodys-corporation-strong-q2-i-reiterate-my-buy-rating-as-fundamentals-are-still-sound'),
    ("Moody's (MCO): is its credit-ratings duopoly moat unbreakable?", 'Insider Monkey', 'Foros y redes', '2026-10-02', 'https://www.insidermonkey.com/news/moodys-mco-is-its-credit-ratings-duopoly-moat-unbreakable-1848040/'),
    ("Moody's (MCO) is a buy: structural tailwinds defy valuation fears post Q2 beat", 'Kavout', 'Foros y redes', '2026-07', 'https://www.kavout.com/market-lens/moody-s-mco-is-a-buy-structural-tailwinds-defy-valuation-fears-post-q2-beat'),
    ("Is MCO a buy or a sell? The bull and bear case (2026)", 'Walnut', 'Foros y redes', '2026-07', 'https://walnutinvest.com/stocks/mco/is-it-a-buy-or-sell'),
    ("Moody Corporation stock fell 23% in early 2026", 'TIKR', 'Foros y redes', '2026-07', 'https://www.tikr.com/blog/moody-corporation-stock-fell-23-in-early-2026-why-the-private-credit-boom-could-fuel-a-63-rebound'),
    ("Moody's: ratings recovery not enough at this valuation", 'Seeking Alpha', 'Foros y redes', '2025-10', 'https://seekingalpha.com/article/4831825-moodys-ratings-recovery-not-enough-at-this-valuation'),
    ("Insider selling: Moody's CEO sells 1,467 shares", 'MarketBeat', 'Foros y redes', '2026-08-04', 'https://www.marketbeat.com/instant-alerts/insider-selling-moodys-nysemco-ceo-sells-1467-shares-2026-08-04/'),
])
sentimiento = {
    'tono': 'Positivo', 'tendencia': 'Mejora',
    'revisadas': [
        {'plataforma': 'Seeking Alpha (artículo y comentarios)', 'fecha': '2026-07', 'n_comentarios': 10, 'tono': 'Positivo', 'resumen': 'Tras el 2T26 un autor reitera Comprar: la prima frente a los comparables se justifica por crecer más en ingresos y beneficio [1].'},
        {'plataforma': 'Insider Monkey', 'fecha': '2026-10', 'n_comentarios': 5, 'tono': 'Positivo', 'resumen': 'Pregunta si el foso del duopolio es irrompible; sitúa la acción a unas 28 veces beneficios y un 19 % por debajo del máximo [2].'},
        {'plataforma': 'Kavout (Market Lens)', 'fecha': '2026-07', 'n_comentarios': 5, 'tono': 'Positivo', 'resumen': 'Ve la IA como viento a favor para los datos verificables y el crédito privado como motor; dice que cotiza con descuento frente al consenso [3].'},
        {'plataforma': 'Walnut (casos alcista y bajista)', 'fecha': '2026-07', 'n_comentarios': 5, 'tono': 'Dividido', 'resumen': 'El caso bajista: calificaciones cíclicas si los tipos suben o se cierra el crédito, y herramientas de IA que quitan cuota a la analítica [4].'},
        {'plataforma': 'TIKR (blog)', 'fecha': '2026-07', 'n_comentarios': 5, 'tono': 'Positivo', 'resumen': 'Explica la caída del 23 % de principios de año por el miedo a la IA y a una emisión irregular; defiende los datos propios de impagos y el crédito privado (calificaciones +80 % en el 1T) [5].'},
        {'plataforma': 'MarketBeat (alertas de directivos y comentarios)', 'fecha': '2026-08', 'n_comentarios': 5, 'tono': 'Neutro', 'resumen': 'Las ventas programadas del consejero delegado se comentan como señal menor [7].'},
    ],
    'temas': [
        {'tema': 'La IA abarata los datos de Moody\'s Analytics', 'postura': 'Dividida', 'peso': 'Alto', 'contraste': 'Fue la causa de la caída de principios de año. Los datos aún no lo muestran: ARR de MA +8 % y margen +150 pb en el 2T26. Riesgo real a vigilar en el ARR.'},
        {'tema': 'Emisión récord: ¿pico del ciclo?', 'postura': 'Dividida', 'peso': 'Alto', 'contraste': 'Transaccionales de MIS +34 % en el 2T26. El informe pone un bajista con caída de la emisión como en 2022.'},
        {'tema': 'Crédito privado y deuda para centros de datos', 'postura': 'Alcista', 'peso': 'Medio', 'contraste': 'La dirección lo confirma como motor; no hay cifra de su peso en ingresos.'},
        {'tema': 'Valoración: prima frente a S&P Global', 'postura': 'Dividida', 'peso': 'Medio', 'contraste': 'Moody\'s cotiza a ≈ 25,8 veces el beneficio de los próximos 12 meses frente a 20,7 veces S&P Global; el informe lo recoge en comparables.'},
    ],
    'lectura': (
        "El tono de inversores y comentaristas es positivo y mejora desde el 2T26, después de la caída del 23 % de principios de año por el miedo a la IA [5]. "
        "No hay euforia: la valoración sigue siendo el debate central y varios artículos de 2025 recomendaban Mantener por múltiplo [6]. "
        "Los foros no aportan un riesgo que el informe no tenga (IA en MA y ciclo de emisión) y van con el consenso de analistas (mayoría Comprar). No se encontraron hilos de Reddit ni Stocktwits con debate real en las búsquedas."),
    'confianza': 'Baja',
}
guardar('E', {'_estado': 'Completo (sin Reddit ni Stocktwits: solo búsqueda web).', 'sentimiento': sentimiento, 'fuentes': E.f, 'huecos': []})
print('Notas A-E escritas')

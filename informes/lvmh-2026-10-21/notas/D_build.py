# Actualiza notas/D.json (LVMH, corte 2026-10-21) a partir de la copia del 8-oct. Ejecutar con python3 -I.
import json, os
P = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'D.json')
d = json.load(open(P, encoding='utf8'))
comp = json.load(open(os.path.join(os.path.dirname(P), 'D_comp.json'), encoding='utf8'))

# ---------------- identificacion ----------------
d['identificacion'].update({
    'precio': 386.75, 'fecha_precio': '2026-10-20', 'acciones': 491.51, 'capitalizacion_publicada': 190706,
    'max_52s': 654.7, 'min_52s': 375.65,
    'volumen_medio_diario': '≈ 242 M EUR/día (≈ 0,57 M acciones; 3 meses) [1]',
    'proximos_resultados': '2027-01',
})

# ---------------- consenso ----------------
d['consenso'] = {
    'guidance': ('LVMH no da objetivos numéricos de ventas ni de margen. Con las ventas del tercer trimestre (12-oct-26) repitió que sigue «confiada» pese a un entorno «incierto» y que reforzará su liderazgo mundial en 2026, sin cifras [31]. '
                 'En nueve meses facturó 57.148 M EUR, un −2 % publicado y un +2 % orgánico; el tercer trimestre creció un 1 % orgánico (18.504 M), con Moda y Marroquinería en −5 % por la desaceleración en China, mientras EE. UU., Europa y Japón crecieron [31]. '
                 'En el semestre el resultado operativo recurrente fue de 8.700 M EUR, un 22,5 % de las ventas [21]. Desde el 30-jun ha vendido Marc Jacobs (1-sep) y casi todo DFS, y paga un dividendo a cuenta de 5,50 EUR el 3-dic-26 [31, 21].'),
    'estimaciones': [
        {'periodo': '2026e', 'ingresos': 80446, 'ebitda': 24034, 'ebit': 17260, 'bpa': 22.02, 'dpa': 12.93, 'fuente': 'MarketScreener, consenso de 27 analistas, 21-oct-26 [4]'},
        {'periodo': '2027e', 'ingresos': 84213, 'ebitda': 25527, 'ebit': 18389, 'bpa': 23.95, 'dpa': 13.65, 'fuente': 'MarketScreener, consenso de 27 analistas, 21-oct-26 [4]'},
        {'periodo': '2028e', 'ingresos': 88514, 'ebitda': 27122, 'ebit': 19687, 'bpa': 26.24, 'dpa': 14.45, 'fuente': 'MarketScreener, consenso de 27 analistas, 21-oct-26 [4]'},
    ],
    'recomendaciones': {'n_analistas': 27, 'comprar': 17, 'mantener': 10, 'vender': 0, 'po_medio': 498.36, 'po_min': 415, 'po_max': 594.7},
    'revisiones': ('Tras el tercer trimestre el consenso de MarketScreener baja poco las cifras y mucho los precios objetivo [4, 5]. Frente al 8-oct, el BPA de 2026 pasa de 22,19 a 22,02 EUR (−0,8 %), el de 2027 de 24,41 a 23,95 (−1,9 %) y el de 2028 de 26,82 a 26,24 (−2,2 %); el EBITDA de 2026, de 24.315 a 24.034 M (−1,2 %). '
                   'El precio objetivo medio cae de 526,49 a 498,36 EUR (−5,3 %) y el máximo de 640 a 594,70. Lo explica el trimestre: +1 % orgánico frente al +1,3 % esperado y Moda y Marroquinería en −5 % frente al −1,8 % del consenso de Visible Alpha [36]. UBS (525 a 510), JP Morgan (525 a 500) y Jefferies (440 a 415) recortaron el 13-oct [37-39]. '
                   'Stock Analysis (S&P Global, 15-oct) da 27 analistas: 17 comprar, 10 mantener y ninguno vender, objetivo medio 502,95 EUR y BPA de 22,26 y 24,14 EUR para 2026-27 [35]. Solo MarketScreener da gratis las estimaciones completas a tres años. El EBITDA del consenso es NIIF 16: el de 2025 (25.756 M) coincide con el resultado operativo recurrente más las amortizaciones, también las de derechos de uso [2].'),
    'base_ebitda': 'NIIF', 'ajuste_ebitda_pct_ventas': None,
    'confianza': 'Media',
}

# ---------------- bolsa ----------------
b = json.load(open(os.path.join(os.path.dirname(P), 'bolsa.json'), encoding='utf8'))['bolsa']
d['bolsa'].update({
    'tipo_rentabilidad': b['tipo_rentabilidad'], 'rentabilidades': b['rentabilidades'], 'anual': b['anual'],
    'beta': b['beta'], 'volatilidad_pct': b['volatilidad_pct'], 'max_drawdown_pct': b['max_drawdown_pct'], 'posicion_corta_pct': None,
    'comentario': ('LVMH pierde un 38,5 % en 2026 hasta el 19-oct, con dividendos, frente al −0,8 % del CAC 40 y el −8,4 % del ETF de lujo mundial; a tres y cinco años va también por detrás de los dos [1]. '
                   'El año tiene cuatro golpes. El 28-ene, al día siguiente de las cuentas de 2025, cayó un 7,9 % [1, 8]. En marzo la guerra con Irán, con Oriente Medio en torno al 6 % de las ventas, le costó un 28 % en el trimestre, su peor arranque de año en bolsa [43]. Las esperanzas de paz lo levantaron un 14 % entre mayo y junio [44]. Desde agosto, la debilidad del consumidor chino lo llevó a mínimos de seis años [6, 7]. '
                   'El tercer trimestre (12-oct) no lo hundió: el 13-oct tocó 375,65 EUR y cerró en 384,05, y la empresa recompra a diario para amortizar [32, 33]. La caída es sobre todo propia: Hermès y el ETF de lujo caen mucho menos [1, 12].'),
    'contexto': {
        'movimiento': {'fecha': '2026-10-21', 'var_1m_pct': -5.1, 'var_3m_pct': -15.1, 'var_6m_pct': -18.4, 'var_12m_pct': -38.0,
                       'dist_max_52s_pct': -41.0, 'dist_min_52s_pct': 1.7, 'dist_max_historico_pct': -57.3, 'tendencia': 'bajista', 'volatilidad_60d_pct': 23.2,
                       'avisos': ['P4 En mínimos de 52 semanas (2 % sobre el mínimo).', 'P5 Un 20 % por debajo de la media de 200 sesiones (tendencia bajista).']},
        'movimientos_fuertes': [
            {'periodo': 'oct-2025', 'var_pct': 21.9, 'causa': 'Ventas del 3T25 (14-oct-25) por encima de lo esperado: +1 % frente a ventas planas del consenso y Moda y Marroquinería en −2 % frente al −4 % esperado, con mejora en Asia [42]. Es el punto de partida de la caída de 12 meses (máximo de 654,70 EUR el 13-nov-25) [1].', 'veredicto': 'no cambia', 'condicion': None},
            {'periodo': 'ene-feb 2026', 'var_pct': -18.8, 'causa': 'Cuentas de 2025 (27-ene-26): la acción cayó un 7,9 % el 28-ene, su peor sesión del año, y siguió bajando en febrero [1, 8]. Son resultados publicados que el informe ya recoge.', 'veredicto': 'no cambia', 'condicion': None},
            {'periodo': 'feb-mar 2026', 'var_pct': -17.7, 'causa': 'Guerra con Irán: Oriente Medio pesaba ≈6 % de las ventas (estimación de RBC) y era de las regiones que más crecían; la acción perdió un 28 % en el primer trimestre, su peor arranque de año en bolsa [43]. Hecho de mercado ya conocido; el efecto en ventas (≈1 punto de crecimiento) está en las cuentas del 1S26 [21].', 'veredicto': 'no cambia', 'condicion': None},
            {'periodo': 'may-jun 2026', 'var_pct': 14.0, 'causa': 'Rebote del lujo europeo por las esperanzas de acuerdo en Oriente Medio (7-may: LVMH, Hermès, Kering, Richemont y Moncler suben entre un 1,7 % y un 3,1 % en la segunda sesión seguida) [44]. Se deshizo después.', 'veredicto': 'no cambia', 'condicion': None},
            {'periodo': 'ago-sep 2026', 'var_pct': -14.1, 'causa': 'Debilidad del consumidor chino y recorte de Bernstein a su previsión de crecimiento orgánico del sector para el 3T (del 6,3 % al 4,9 %); el 2-sep marcó mínimos de 14 meses y siguió cayendo hasta los 378,55 EUR de cierre del 2-oct [6, 7, 32]. El 3T26 confirmó la causa (Moda −5 % por China) [31].', 'veredicto': 'no cambia', 'condicion': None},
        ],
        'noticias': [
            {'fecha': '2026-04-23', 'tipo': 'directivos', 'hecho': 'La consejera Ariane Gorin compra 500 acciones a 480,09 EUR en Euronext París [34].', 'veredicto': 'no cambia', 'condicion': None},
            {'fecha': '2026-06-22', 'tipo': 'directivos', 'hecho': 'Delphine Arnault (2-jun, 24.000 acciones) y Antoine Arnault (22-jun, 50.000 acciones), consejeros, pignoran cuentas de valores: es una garantía, no una venta. No hay ventas de directivos declaradas a la AMF en los últimos seis meses [34].', 'veredicto': 'no cambia', 'condicion': None},
            {'fecha': '2026-09-01', 'tipo': 'fusión u oferta', 'hecho': 'Marc Jacobs, vendida a WHP Global (con G-III Apparel, que pone ≈500 M USD por su parte); LVMH no publica el precio. En el 3T26 dice además que ha vendido casi todo DFS [31, 46].', 'veredicto': 'no cambia', 'condicion': None},
            {'fecha': '2026-10-16', 'tipo': 'accionista de referencia', 'hecho': 'Recompra para amortizar: 1,96 M acciones por 844 M EUR del 28-jul al 16-oct (media 429,80 EUR), 600.000 solo del 13 al 16-oct [33]. Es demanda de la propia empresa, no una colocación.', 'veredicto': 'no cambia', 'condicion': None},
            {'fecha': '2026-10-12', 'tipo': 'resultados', 'hecho': 'Ventas del 3T26: +1 % orgánico (18.504 M EUR) frente al +1,3 % esperado; Moda y Marroquinería −5 % frente al −1,8 % del consenso; nueve meses +2 % orgánico y −2 % publicado [31, 36]. Resultados ya publicados: los recoge este informe.', 'veredicto': 'no cambia', 'condicion': None},
            {'fecha': '2026-10-13', 'tipo': 'recomendación', 'hecho': 'Recortes de objetivo tras el 3T26: UBS mantiene Comprar (525 a 510 EUR), JP Morgan Neutral (525 a 500), Jefferies Neutral (440 a 415); Berenberg baja estimaciones y sigue en Mantener (14-oct); Bernstein reitera Comprar con 480 EUR (19-oct) [37-41].', 'veredicto': 'no cambia', 'condicion': None},
            {'fecha': '2026-12-01', 'tipo': 'resultados', 'hecho': 'Próximo hecho con fecha: dividendo a cuenta de 5,50 EUR (último día con derecho el 30-nov, pago el 3-dic) [21]. Los resultados anuales de 2026 no tienen fecha publicada; los de 2025 salieron el 27-ene [8].', 'veredicto': 'no cambia', 'condicion': None},
        ],
        'proximos_resultados': '2027-01',
        'veredicto': 'no cambia',
        'condicion': None,
        'comentario': ('La acción está en mínimos de 52 semanas y un 20 % por debajo de su media de 200 sesiones (avisos P4 y P5). La caída tiene causas conocidas que el informe recoge: la guerra con Irán, China y el −5 % de Moda en el 3T26 [31, 43]. '
                       'No hay ningún hecho pendiente que pueda mover el precio más de un 5 % en contra: ni colocaciones (la familia Arnault no vende y la empresa recompra para amortizar [33, 34]), ni ampliaciones, ni litigios con fecha. Los disturbios en Francia del 17-19-oct (saqueos de tiendas de LVMH y Hermès y cierres de Sephora) son un hecho externo sin cifra y con poco peso en las ventas; no llegan a «grave» [41, 45]. '
                       'Los próximos resultados (enero de 2027) no aplazan la decisión (regla 11). Veredicto: no cambia.'),
    },
    'confianza': 'Alta',
})

# ---------------- multiplos_historicos ----------------
d['multiplos_historicos']['comentario'] = (
    'Con el cierre del 20-oct (386,75 EUR), LVMH cotiza a 8,9 veces el EBITDA de 2026e y 17,6 veces el beneficio, según MarketScreener [11]. Al cierre de 2024 y de 2025 los múltiplos equivalentes eran 12,7 y 13,5 veces el EBITDA y 25,3 y 29,5 veces el beneficio del año [11]. '
    'Con el BPA del año siguiente, el PER de los cierres de 2020 a 2024 fue de 21,4 a 29,2 veces, mediana 25,9: hoy ronda 16. El descuento no viene de un desplome del beneficio: el consenso espera un BPA de 22,02 EUR en 2026 frente a 21,85 en 2025 [4]. '
    'Viene de una compresión del múltiplo mayor que la del sector, porque el mercado descuenta que el crecimiento de 2015-2023, apoyado en China y en las subidas de precio, no vuelve [6, 36].')

# ---------------- comparables ----------------
emp = []
for c in comp:
    emp.append({k: v for k, v in c.items() if not k.startswith('_')})
d['comparables'] = {
    'criterio': d['comparables']['criterio'] + ' Cifras rehechas el 21-oct con el cierre del 20-oct [12-19].',
    'empresas': emp,
    'comentario': ('Las ocho comparables se dividen en dos grupos. Hermès (16,3 veces el EBITDA de los próximos 12 meses), L\'Oréal (18,0), Richemont (13,4) y Brunello Cucinelli (13,3) cotizan con prima por crecimiento o por calidad de marca. Kering (8,5), Moncler (7,2), Prada (6,6) y Pernod Ricard (9,7) cotizan con descuento [12-19]. '
                   'MarketScreener sitúa a LVMH en 8,9 veces el EBITDA de 2026e y 17,6 veces el beneficio [11], junto a Kering y Pernod, aunque su margen EBITDA (31,9 % en 2025) supera al de ambas. La mediana del PER de los próximos 12 meses de las comparables es de 24,9 veces y la del EV/EBITDA de 11,5; LVMH ronda 16 y 8,5. '
                   'El crecimiento de Richemont (10,8 % anual) sale de su ejercicio a marzo de 2027 (+12,4 % de ventas en el consenso) y parece alto. El PER de Kering usa un BPA de 2026 hundido (5,04 EUR) y exagera su múltiplo. Ojo: la deuda neta de MarketScreener no trata igual los arrendamientos en todas; el EV/EBIT es más fiable que el EV/EBITDA para comparar. '
                   'Para la suma de partes: moda y marroquinería frente a Hermès, Kering, Prada y Moncler; vinos y licores frente a Pernod; perfumes y cosmética frente a L\'Oréal; relojes y joyería frente a Richemont.'),
    'confianza': 'Media',
}

# ---------------- transacciones (solo comentario) ----------------
d['transacciones']['comentario'] += (' En 2026 LVMH ha vendido Marc Jacobs (1-sep, a WHP Global y G-III) y casi todo DFS sin publicar el precio [31, 46]: no dan múltiplo.')

# ---------------- valoracion ----------------
v = d['valoracion']
v['puente'] = {'fecha': '2026-06-30', 'deuda_financiera': 20447, 'arrendamientos': 16261, 'caja': 12202, 'minoritarios': 1599,
               'pensiones': 403, 'asociadas': 3192, 'otros_ajustes': 7260}
v['notas_integrador'] = open(os.path.join(os.path.dirname(P), 'D_notas_integrador.txt'), encoding='utf8').read()

# ---------------- fuentes ----------------
F = {f['id']: f for f in d['fuentes']}
F[1].update({'fecha': '2026-10-19', 'titulo': 'Históricos diarios de MC.PA, CAC.PA y GLUX.PA (bolsa.mjs, hasta el 19-oct-26) y de MC.PA hasta el 21-oct-26 (movimiento.mjs)'})
for i in (4, 5, 8, 11, 12, 13, 14, 15, 16, 17, 18, 19):
    F[i]['fecha'] = '2026-10-21'
F[14]['url'] = 'https://www.marketscreener.com/quote/stock/COMPAGNIE-FINANCIERE-RICH-14354614/finances/'
for i in (12, 13, 15, 16, 17):
    F[i]['url'] = F[i]['url'].replace('/valuation/', '/finances/')
    F[i]['titulo'] = F[i]['titulo'].replace('estimaciones y valoración', 'estimaciones financieras')
F[10].update({'fecha': '2026-10-20'})
nuevas = [
    {'titulo': 'Continued growth in the third quarter of 2026 (ventas del 3T26, nota de prensa)', 'editor': 'LVMH', 'tipo': 'Primaria', 'fecha': '2026-10-12', 'url': 'https://lvmh-com.cdn.prismic.io/lvmh-com/Y6AfTE0Y7WFnyftQ_LVMH2026ThirdQuarterRevenue.pdf'},
    {'titulo': 'LVMH (FR0000121014-XPAR): históricos diarios de cotización, octubre de 2026', 'editor': 'Euronext', 'tipo': 'Datos de mercado', 'fecha': '2026-10-21', 'url': 'https://live.euronext.com/en/ajax/AwlHistoricalPrice/getFullDownloadAjax/FR0000121014-XPAR'},
    {'titulo': 'Déclarations des transactions sur actions propres, semaines du 28 juillet au 16 octobre 2026 (nueve declaraciones)', 'editor': 'LVMH', 'tipo': 'Primaria', 'fecha': '2026-10-20', 'url': 'https://lvmh-com.cdn.prismic.io/lvmh-com/94hLYI7lC5OC73PL_D%C3%A9clarationtransactionssuractionspropressemainedu13au16octobre2026.pdf'},
    {'titulo': 'Déclarations des dirigeants sur les titres LVMH (2026DD1116814, 2026DD1118498, 2026DD1122439)', 'editor': 'AMF (BDIF)', 'tipo': 'Primaria', 'fecha': '2026-06-23', 'url': 'https://bdif.amf-france.org/back/api/v1/informations?RechercheTexte=LVMH&TypesInformation=DD&From=0&Size=40'},
    {'titulo': 'LVMH (EPA:MC) stock forecast: analyst ratings and price targets', 'editor': 'Stock Analysis (datos de S&P Global)', 'tipo': 'Datos de mercado', 'fecha': '2026-10-15', 'url': 'https://stockanalysis.com/quote/epa/MC/forecast/'},
    {'titulo': "LVMH's China letdown points to prolonged luxury industry pain", 'editor': 'Reuters (vía MarketScreener)', 'tipo': 'Prensa', 'fecha': '2026-10-13', 'url': 'https://www.marketscreener.com/news/lvmh-s-china-letdown-points-to-prolonged-luxury-industry-pain-ce785ddddd81ff24'},
    {'titulo': 'LVMH: Receives a Buy rating from UBS', 'editor': 'MarketScreener (dpa-AFX Analyser)', 'tipo': 'Analistas', 'fecha': '2026-10-13', 'url': 'https://www.marketscreener.com/news/lvmh-receives-a-buy-rating-from-ubs-ce785ddddc8ffe23'},
    {'titulo': 'LVMH: Gets a Neutral rating from JP Morgan', 'editor': 'MarketScreener', 'tipo': 'Analistas', 'fecha': '2026-10-13', 'url': 'https://www.marketscreener.com/news/lvmh-gets-a-neutral-rating-from-jp-morgan-ce785ddddd80f625'},
    {'titulo': 'LVMH: Jefferies reiterates its Neutral rating', 'editor': 'MarketScreener', 'tipo': 'Analistas', 'fecha': '2026-10-13', 'url': 'https://www.marketscreener.com/news/lvmh-jefferies-reiterates-its-neutral-rating-ce785ddddd81ff2d'},
    {'titulo': 'LVMH: Receives a Buy rating from Bernstein', 'editor': 'MarketScreener', 'tipo': 'Analistas', 'fecha': '2026-10-19', 'url': 'https://www.marketscreener.com/news/lvmh-receives-a-buy-rating-from-bernstein-ce785cdbda8bf422'},
    {'titulo': 'LVMH: noticias (titulares del 13 al 20-oct-26: Berenberg, BofA, DZ Bank, Deutsche Bank, saqueos en Francia)', 'editor': 'MarketScreener', 'tipo': 'Datos de mercado', 'fecha': '2026-10-21', 'url': 'https://www.marketscreener.com/quote/stock/LVMH-4669/news/'},
    {'titulo': "LVMH's third-quarter sales beat forecasts as group returns to growth", 'editor': 'Reuters (vía Yahoo Finance)', 'tipo': 'Prensa', 'fecha': '2025-10-14', 'url': 'https://finance.yahoo.com/news/lvmhs-third-quarter-sales-beat-160331210.html'},
    {'titulo': "Bernard Arnault's LVMH shares plunge 28% in Q1 2026, worst start to a year", 'editor': 'nss magazine', 'tipo': 'Prensa', 'fecha': '2026-04-02', 'url': 'https://www.nssmag.com/en/fashion/44856/bernard-arnault-lvmh-shares-plunge-28-percent-q1-2026-worst-start-year'},
    {'titulo': 'Luxury stocks rise on Middle East peace hopes', 'editor': 'Investing.com', 'tipo': 'Prensa', 'fecha': '2026-05-07', 'url': 'https://www.investing.com/news/stock-market-news/luxury-stocks-rise-on-middle-east-peace-hopes-4668083'},
    {'titulo': 'City hall in flames, stores looted: 1,800 arrested after riots in France', 'editor': 'blue News', 'tipo': 'Prensa', 'fecha': '2026-10-18', 'url': 'https://www.bluewin.ch/en/news/international/city-hall-in-flames-stores-looted-1-800-arrested-after-riots-in-france-li.3639993'},
    {'titulo': 'G-III Apparel Group, 10-Q del trimestre a 31-jul-26 (compra de Marc Jacobs)', 'editor': 'G-III Apparel / SEC EDGAR', 'tipo': 'Primaria', 'fecha': '2026-09-08', 'url': 'https://www.sec.gov/Archives/edgar/data/821002/000110465926105950/giii-20260731x10q.htm'},
]
nid = max(F) + 1
assert nid == 31, nid
for n in nuevas:
    n2 = {'id': nid}; n2.update(n); d['fuentes'].append(n2); nid += 1
# La 33 cita también semestral [2]? no. Reordenar no hace falta.

# ---------------- huecos ----------------
d['huecos'] = [
    {'seccion': 'identificacion', 'campo': 'proximos_resultados (día exacto)', 'tipo': 'Complemento',
     'intentos': '1) API de contenidos de lvmh.com (tipo «event»): el último evento con fecha es el pago del dividendo a cuenta (3-dic-26); no hay fecha de los resultados de 2026; 2) MarketScreener, calendario: solo el dividendo (1-dic) [8]; 3) referencia del año anterior: resultados de 2025 el 27-ene-26 [8]',
     'decision': 'Calculado y marcado como estimación: enero de 2027 (2027-01), sin día'},
    {'seccion': 'consenso', 'campo': 'revisiones a 3 y 12 meses del BPA', 'tipo': 'Complemento',
     'intentos': '1) MarketScreener, finanzas: solo la cifra vigente; el gráfico de revisiones es una imagen; 2) MarketScreener, consenso: la evolución del objetivo es una imagen sin valores; 3) Stock Analysis: sin historial de estimaciones en la versión gratuita',
     'decision': 'Omitido; se da el cambio desde el 8-oct (análisis anterior)'},
    {'seccion': 'comparables', 'campo': 'Diageo, Estée Lauder, Rémy Cointreau, Ulta', 'tipo': 'Complemento',
     'intentos': '1) MarketScreener, finanzas de Diageo: sin EBIT, BPA ni capitalización en la extracción (8-oct); 2) MarketScreener, Estée Lauder: solo resumen cualitativo (8-oct); 3) Rémy y Ulta no se intentaron por presupuesto',
     'decision': 'Omitidos; la tabla queda con ocho'},
    {'seccion': 'comparables', 'campo': 'roic_pct', 'tipo': 'Complemento',
     'intentos': '1) MarketScreener no lo da en las páginas abiertas; 2) Stock Analysis no se abrió para los comparables; 3) calcularlo requería las cuentas de cada comparable',
     'decision': 'Omitido'},
    {'seccion': 'bolsa', 'campo': 'posicion_corta_pct', 'tipo': 'Complemento',
     'intentos': '1) BDIF de la AMF: la búsqueda por emisor solo devuelve declaraciones de directivos; 2) no se buscó el registro de posiciones cortas netas de la AMF por presupuesto; 3) -',
     'decision': 'Omitido'},
    {'seccion': 'transacciones', 'campo': 'Kering-Valentino (30 %, jul-2023) y Mytheresa-YNAP', 'tipo': 'Complemento',
     'intentos': '1) kering.com no abre con WebFetch y no se encontró la URL directa de la nota; 2) búsqueda web: solo prensa con el precio (1.700 M EUR por el 30 %), sin las cuentas de Valentino; 3) no se intentó con el documento de registro de Kering por tiempo',
     'decision': 'Omitido'},
    {'seccion': 'transacciones', 'campo': 'Nota oficial de Moncler sobre Stone Island', 'tipo': 'Complemento',
     'intentos': '1) PDF de monclergroup.com: redirige a la portada; 2) informe anual de 2020 de Moncler: 403 y redirección; 3) prensa italiana (Trend Online, 7-dic-20) con las cifras de la nota',
     'decision': 'Cifras de prensa; múltiplo de 2020 calculado y marcado como estimación'},
    {'seccion': 'valoracion', 'campo': 'precio cobrado por Marc Jacobs y por DFS (después del 30-jun)', 'tipo': 'Complemento',
     'intentos': '1) Ventas del 3T26 de LVMH: solo dice que se vendieron, sin precio [31]; 2) 10-Q de G-III (SEC): ≈500 M USD de su parte, sin el total ni lo que cobra LVMH [46]; 3) prensa: «hasta 850 M USD» al anunciarse (mayo) y ≈925 M USD al cierre, cifras que no cuadran entre sí y sin fuente primaria',
     'decision': 'Omitido del puente (caja a 30-jun); efecto ≈1,5 EUR por acción'},
]

d['_estado'] = 'terminado'
json.dump(d, open(P, 'w', encoding='utf8'), ensure_ascii=False, indent=2)
print('ok', len(d['fuentes']))

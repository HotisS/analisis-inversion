# Nota D (20-nov-2026): actualiza D.json desde la nota del 28-oct. Se ejecuta una vez.
import json, re, copy
P = 'informes/intuit-2026-11-20/notas/D.json'
d = json.load(open(P, encoding='utf-8'))
viejo = copy.deepcopy(d)

# ---------- renumeración de citas viejas que se conservan ----------
MAPA = {1: 5, 2: 2, 10: 16}
for i in range(11, 20): MAPA[i] = i + 6      # MarketScreener comparables 11-19 -> 17-25
for i in range(20, 32): MAPA[i] = i + 6      # transacciones 20-31 -> 26-37
def ren(txt):
    def f(m):
        partes = re.split(r'(,\s*|-)', m.group(1))
        return '[' + ''.join(str(MAPA[int(p)]) if p.strip().isdigit() else p for p in partes) + ']'
    return re.sub(r'\[([\d,\s-]+)\]', f, txt)
def ren_obj(o):
    if isinstance(o, str): return ren(o)
    if isinstance(o, list): return [ren_obj(x) for x in o]
    if isinstance(o, dict): return {k: ren_obj(v) for k, v in o.items()}
    return o

# ---------- identificación ----------
idn = d['identificacion']
idn.update({
    'precio': 270.44, 'fecha_precio': '2026-11-20', 'acciones': 265.6,
    'capitalizacion_publicada': None, 'max_52s': 682.27, 'min_52s': 252.84,
    'volumen_medio_diario': '≈ 1.163 M USD/día (3,62 M de acciones; 3 meses)',
    'proximos_resultados': None,
})
idn['extra'] = [
    'Acciones en circulación: 264,551 M a 31-oct-2026 (estado de cambios en el patrimonio) y 264,015 M a 12-nov-2026 (portada del 10-Q) [1]. Se usan las de 31-oct más 1 M de acciones potenciales diluidas (268 M diluidas frente a 267 M básicas de media en el 1T FY2027) = 265,6 M, para casar con la caja del mismo balance [1, 2].',
    'Precio: cierre del viernes 20-nov-2026, 270,44 USD, un 12,8 % menos que el 19-nov (310,02) tras los resultados del 1T FY2027 publicados el 19-nov después del cierre; volumen de 9,83 M de acciones, 2,7 veces la media de 3 meses [7]. Ese día el S&P 500 cayó un 3,7 % y el ETF de software IGV un 4,6 % [7].',
    'Capitalización: 265,6 M × 270,44 = 71.829 M USD (cálculo propio); con las 264,015 M de acciones del 12-nov serían 71.400 M [1, 7]. No hay capitalización publicada de un proveedor al cierre del 20-nov.',
    'Máximo de 52 semanas 682,27 USD el 21-nov-2025 (sale de la ventana el 23-nov); mínimo 252,84 USD el 22-jun-2026 [7].',
    'Próximos resultados (2T FY2027): la empresa no ha dado fecha; el año pasado publicó el 2T a finales de febrero. Se deja sin fecha.',
    'Recompras del 1T FY2027: 4,6 M de acciones por 1.500 M USD (unos 326 USD de media, cálculo propio), 22 M liquidados a principios de noviembre; autorización pendiente de 6.400 M [1].',
]
json.dump(d, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# ---------- consenso ----------
c = d['consenso']
c['guidance'] = ('El 19-nov-2026, con los resultados del 1T FY2027, Intuit rebajó la guía de ingresos del FY2027 a 23.081-23.365 M USD (+8-9 %), desde 23.279-23.512 M (+9-10 %) fijados el 25-ago, por Credit Karma, que pasa a 2.721-2.826 M (+3-7 %) desde 2.92-2.97 mil M (+11-13 %) [2, 6, 14]. Consumo queda en +2-4 %, Global Business Solutions en +13-14 % y Mailchimp en −1-0 % [2]. Reiteró el beneficio operativo GAAP (7.408-7.490 M), el no GAAP (8.063-8.145 M, ya con pagos en acciones) y el BPA: GAAP 20,12-20,36 USD y no GAAP 22,88-23,12 USD [2]. Para el 2T FY2027 espera ingresos de 4.931-4.954 M (+6-7 %), BPA GAAP de 2,55-2,60 y no GAAP de 3,17-3,22 USD [2]. La guía no incluye la venta de Mailchimp (cierre previsto a principios de 2027); se actualizará al cerrar [2]. El 1T superó la guía: ingresos de 4.354 M (+12 %) y BPA GAAP de 2,59 USD (guía 1,71-1,75) [2, 6].')
c['estimaciones'] = [
    {'periodo': 'FY2027e', 'ingresos': 23411, 'ebitda': 10522, 'ebit': 8642, 'bpa': 20.34, 'dpa': 5.43, 'fuente': 'MarketScreener, consulta del 27-oct-2026, anterior a los resultados del 1T [12]'},
    {'periodo': 'FY2028e', 'ingresos': 25535, 'ebitda': 11586, 'ebit': 9652, 'bpa': 23.61, 'dpa': 5.99, 'fuente': 'MarketScreener, consulta del 27-oct-2026, anterior a los resultados del 1T [12]'},
    {'periodo': 'FY2029e', 'ingresos': 27749, 'ebitda': 12890, 'ebit': 11164, 'bpa': 26.54, 'dpa': 6.85, 'fuente': 'MarketScreener, consulta del 27-oct-2026, anterior a los resultados del 1T [12]'},
]
c['recomendaciones'] = {'n_analistas': 34, 'comprar': 20, 'mantener': 12, 'vender': 2, 'po_medio': 407.89, 'po_min': 290, 'po_max': 732}
c['revisiones'] = ('Ninguna fuente gratuita había recogido aún el consenso posterior a los resultados del 19-nov al cierre del 20-nov: Yahoo Finance seguía con el trimestre de octubre como «en curso» (BPA no GAAP de 2,64 USD frente a 2,91 publicados) [11], Stock Analysis se actualizó por última vez el 11-nov [10] y MarketScreener servía páginas de octubre. Antes de los resultados, el BPA no GAAP del FY2027 era de 23,80 USD (32 analistas) y el del FY2028 de 26,91 (31), frente a 23,95 y 27,08 hace 30 días [11]; la caída desde 27,28 y 30,75 hace 90 días es sobre todo el cambio de base de agosto (las medidas no GAAP incluyen desde el 1-ago los pagos en acciones), no un recorte de previsiones [6, 11]. Las ventas del FY2027 del consenso (23.410 M) quedan por encima del techo de la nueva guía (23.365 M) y tendrán que bajar unos 200 M [2, 11]. El 20-nov recortaron el objetivo Morgan Stanley (315 a 310, mantener), Barclays (408 a 385, sobreponderar), Jefferies (500 a 445, compra), UBS (360 a 315, neutral) y Bank of America (360 a 310, neutral) [13]; ninguno cambió de recomendación en esa fuente.')
c['extra'] = [
    'El EBITDA de MarketScreener excluye los pagos en acciones: el del FY2026 (9.122 M) es el beneficio operativo no GAAP (8.935 M) más la depreciación (187 M) [5, 12].',
    'Pagos en acciones: 2.056 M en el FY2026 (9,6 % de 21.448 M de ingresos) y 495 M en el 1T FY2027 (11,4 % de 4.354 M, frente a 543 M un año antes) [2, 4]. La guía de agosto preveía 2.020 M en el FY2027 (8,6 % del punto medio de entonces) [6]; con la nueva guía de ingresos serían el 8,7 % (cálculo propio). El ajuste se deja en 8,6 %.',
    'El BPA del consenso de MarketScreener es GAAP (20,34 USD el FY2027, dentro de la guía GAAP 20,12-20,36) [2, 12]. El de Yahoo es no GAAP y mezcla bases: su media del FY2027 (23,80) supera el techo de la guía no GAAP con pagos en acciones (23,12), y el máximo (29,21) solo cuadra con la base antigua [2, 11].',
    'Objetivo medio de Stock Analysis (S&P Global, 34 analistas): 407,89 USD, mediana 400, mínimo 290 y máximo 732, actualizado el 11-nov, antes de los resultados; 15 compras fuertes, 5 compras, 12 mantener, 1 venta y 1 venta fuerte en noviembre [10]. Con los cinco recortes del 20-nov el objetivo medio bajará; con el precio de 270,44 queda por debajo del mínimo de los analistas (290) [7, 10, 13].',
    'Tendencia de los objetivos a 3 meses: recortes (TD Cowen subió de 346 a 350 el 9-nov; el 20-nov cinco recortes de entre 5 y 50 USD) [10, 13].',
    'Resultado del 1T FY2027: BPA no GAAP de 2,91 USD frente a 2,64 de consenso de S&P Global Capital IQ, e ingresos de 4.400 M frente a 4.310 M de Visible Alpha [2, 13].',
]
c['confianza'] = 'Baja'
json.dump(d, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# ---------- bolsa ----------
b = json.load(open('informes/intuit-2026-11-20/notas/bolsa.json', encoding='utf-8'))
bo = d['bolsa']
bo['tipo_rentabilidad'] = b['bolsa']['tipo_rentabilidad']
bo['rentabilidades'] = b['bolsa']['rentabilidades']
bo['anual'] = b['bolsa']['anual']
bo['beta'] = 1.01; bo['volatilidad_pct'] = 54.2; bo['max_drawdown_pct'] = -68.2; bo['posicion_corta_pct'] = 2.63
bo['comentario'] = ('Intuit pierde un 59,2 % en 2026 hasta el 20 de noviembre, frente a un S&P 500 que sube un 0,9 % y un ETF de software (IGV) que cae un 13,3 % [7]. La caída máxima es del 68,2 %, del 30-jul-2025 al 25-jun-2026, con un mínimo de 252,84 USD el 22 de junio [7]. En el último mes baja un 23,8 %: un 7,2 % el 17-nov, en una jornada en que el IGV cedió un 3,3 % y sin noticia propia [7, 14], y un 12,8 % el 20-nov, tras rebajar la guía de ingresos del FY2027 por Credit Karma y anunciar la venta de Mailchimp por 3.680 M, un día en que el S&P 500 bajó un 3,7 % y el IGV un 4,6 % [2, 7, 13]. A diez años sube un 8,8 % anual, frente al 12,2 % del S&P 500 y el 15,0 % del IGV [7]. La beta mensual de 5 años es 1,01 y la semanal de 2 años 0,66 [7]. Las posiciones cortas eran el 2,63 % de las acciones (septiembre) [38].')
bo['contexto'] = {
    'movimiento': {'fecha': '2026-11-20', 'var_1m_pct': -23.8, 'var_3m_pct': -26.9, 'var_6m_pct': -15.5, 'var_12m_pct': -58.4,
                   'dist_max_52s_pct': -60.0, 'dist_min_52s_pct': 6.0, 'dist_max_historico_pct': -66.5, 'tendencia': 'bajista',
                   'volatilidad_60d_pct': 50.3,
                   'avisos': ['P3 Caída fuerte: -24 % en un mes: hay que saber por qué.', 'P5 Un 22 % por debajo de la media de 200 sesiones (tendencia bajista).']},
    'movimientos_fuertes': [
        {'periodo': '20-nov-2026', 'var_pct': -12.8, 'causa': 'Rebaja de la guía de ingresos del FY2027 a +8-9 % por Credit Karma (+3-7 % frente a +11-13 %), guía del 2T de +6-7 % y venta de Mailchimp por 3.680 M, un tercio de los 12.000 M pagados en 2021; el S&P 500 cayó un 3,7 % y el IGV un 4,6 % ese día [2, 3, 7, 13, 14].', 'veredicto': 'no cambia', 'condicion': None},
        {'periodo': '17-nov-2026', 'var_pct': -7.2, 'causa': 'Sin noticia propia: ventas antes de resultados en un día de caída del software (IGV −3,3 %, S&P 500 −1,0 %) [7, 14].', 'veredicto': 'no cambia', 'condicion': None},
        {'periodo': 'oct-nov-2026 (1 mes)', 'var_pct': -23.8, 'causa': 'Suma de las dos sesiones anteriores; del 20-oct al 16-nov la acción se movía entre 328 y 357 USD [7].', 'veredicto': 'no cambia', 'condicion': None},
    ],
    'noticias': [
        {'fecha': '2026-11-19', 'tipo': 'resultados', 'hecho': 'Resultados del 1T FY2027 por encima de la guía (ingresos +12 %, BPA GAAP 2,59 USD) y guía de ingresos del FY2027 rebajada a 23.081-23.365 M con el BPA reiterado [2].', 'veredicto': 'no cambia', 'condicion': None},
        {'fecha': '2026-11-19', 'tipo': 'fusión u oferta', 'hecho': 'Acuerdo de venta de Mailchimp a Bending Spoons por unos 3.680 M USD (3.310 M en efectivo y 368 M en acciones de Bending Spoons, con seis meses de bloqueo); cierre previsto a principios de 2027, sujeto a la HSR y otras autorizaciones; fecha límite 19-ago-2027 ampliable tres meses. El efectivo irá a recompras dentro del FY2027 [1, 2, 3].', 'veredicto': 'no cambia', 'condicion': None},
        {'fecha': '2026-11-20', 'tipo': 'recomendación', 'hecho': 'Recortes de objetivo: Morgan Stanley 315 a 310, Barclays 408 a 385, Jefferies 500 a 445, UBS 360 a 315 y Bank of America 360 a 310, sin cambios de recomendación [13].', 'veredicto': 'no cambia', 'condicion': None},
    ],
    'proximos_resultados': None,
    'veredicto': 'no cambia',
    'condicion': None,
    'comentario': ('La acción cae un 23,8 % en un mes, casi todo en dos sesiones: el 17-nov (−7,2 %, sin noticia propia, con el software a la baja) y el 20-nov (−12,8 %), tras una guía de ingresos más baja por Credit Karma y la venta de Mailchimp con una fuerte pérdida frente a lo pagado [2, 3, 7, 13]. El BPA del año se mantuvo, y la caída coincidió con un día malo del mercado (S&P 500 −3,7 %) [2, 7]. No hay colocaciones ni hechos pendientes que muevan el precio más de un 5 % salvo el cierre de Mailchimp, que ya está anunciado con su precio; los próximos resultados (2T) son en febrero. Propuesta de la nota D: no cambia; el analista debe confirmar con la tendencia bajista.'),
}
bo['extra'] = [
    'Beta frente al S&P 500: 1,01 mensual a 5 años (ajustada 1,01), 1,19 semanal a 5 años (ajustada 1,13) y 0,66 semanal a 2 años [7]. bolsa.mjs avisa de la diferencia entre la semanal de 2 años y la de 5.',
    'Volatilidad diaria anualizada de 1 año: 54,2 %; de 60 sesiones, 50,3 % [7].',
    'Volumen medio de 3 meses: 3,62 M de acciones al día, unos 1.163 M USD; el 20-nov se negociaron 9,83 M [7].',
    'Mayores caídas diarias de los últimos 12 meses: −20,0 % el 21-may-2026, −12,8 % el 20-nov-2026, −10,9 % el 3-feb-2026, −8,9 % el 2-jun-2026 y −7,2 % el 17-nov-2026 [7].',
    'Posición corta: 2,63 % de las acciones (dato de septiembre en Stock Analysis); no se ha encontrado uno más reciente [38].',
    'La rentabilidad es solo de precio porque el índice ^GSPC no incluye dividendos [7].',
]
json.dump(d, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# ---------- múltiplos históricos ----------
mh = d['multiplos_historicos']
mh['comentario'] = ('Precios de cierre del último día hábil de cada ejercicio (31 de julio o anterior) [7]. Entre el cierre del FY2025 (785,13 USD) y el del FY2026 (316,07 USD) la acción perdió un 59,7 %, mientras el BPA GAAP subía de 13,67 a 16,46 USD [5, 7]: la caída es de múltiplo, no de beneficios. A 270,44 USD cotiza a 13,4 veces el punto medio de la guía de BPA GAAP del FY2027 (20,24) y a 11,8 veces el no GAAP (23,00) (cálculo propio) [2, 7]. Los múltiplos de los próximos 12 meses de cada año no están en abierto.')
mh['extra'] = [
    'Fechas de los cierres: 31-jul-2017, 31-jul-2018, 31-jul-2019, 31-jul-2020, 30-jul-2021, 29-jul-2022, 31-jul-2023, 31-jul-2024, 31-jul-2025 y 31-jul-2026 [7]; iguales a los de la nota del 28-oct.',
    'PER GAAP al cierre de cada ejercicio con el BPA de ese ejercicio: 57,4 veces en el FY2025 (785,13/13,67) y 19,2 veces en el FY2026 (316,07/16,46) [5, 7].',
]
json.dump(d, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# ---------- comparables: llevados del 27-oct al 20-nov con la variación de precio ----------
var = {'HRB': -4.1, 'PAYX': 3.1, 'PAYC': -7.7, 'BILL': 24.3, 'XYZ': -7.0, 'TOST': -1.1, 'SHOP': -25.4, 'FRSH': -19.1, 'ADBE': -12.3}
comp = d['comparables']
comp['criterio'] = ren(comp['criterio'])
for e in comp['empresas']:
    v = var[e['ticker']] / 100
    cap0 = e['capitalizacion']
    ev0 = cap0 / (1 - e['dn_ebitda'] / e['ev_ebitda_ltm'])
    dn = ev0 - cap0
    cap1 = cap0 * (1 + v); ev1 = cap1 + dn; k = ev1 / ev0
    e['capitalizacion'] = round(cap1)
    e['ev_ventas'] = round(e['ev_ventas'] * k, 2)
    e['ev_ebitda_ltm'] = round(e['ev_ebitda_ltm'] * k, 1)
    e['ev_ebitda_ntm'] = round(e['ev_ebitda_ntm'] * k, 1)
    e['per_ntm'] = round(e['per_ntm'] * (1 + v), 1)
    e['dn_ebitda'] = round(e['dn_ebitda'] / k, 2)
    e['fcf_yield_pct'] = round(e['fcf_yield_pct'] / (1 + v), 1)
pers = sorted(e['per_ntm'] for e in comp['empresas'])
evn = sorted(e['ev_ebitda_ntm'] for e in comp['empresas'])
evl = sorted(e['ev_ebitda_ltm'] for e in comp['empresas'])
med = lambda s: s[len(s) // 2]
comp['comentario'] = ('Todos los múltiplos de EBITDA están en base GAAP, con los pagos en acciones como gasto, igual que el EBITDA de las cuentas de Intuit [5, 16]. El EBITDA de los últimos 12 meses sale de las cuentas que recoge Yahoo Finance [16]; el de los próximos 12 meses es el consenso de MarketScreener [17-25] menos la diferencia entre el EBITDA de MarketScreener y el GAAP del último ejercicio, en el mismo porcentaje de ventas. Precios al cierre del 20-nov-2026 [15]. '
    f'La mediana de EV/EBITDA es de {str(med(evl)).replace(".", ",")} veces en los últimos 12 meses y de {str(med(evn)).replace(".", ",")} veces en los próximos 12, y la del PER de los próximos 12 meses, de {str(med(pers)).replace(".", ",")} veces [15-25].')
comp['extra'] = [
    'Precios llevados del 27-oct al 20-nov-2026 con la variación de cada acción en Yahoo Finance: H&R Block −4,1 %, Paychex +3,1 %, Paycom −7,7 %, BILL +24,3 %, Block −7,0 %, Toast −1,1 %, Shopify −25,4 %, Freshworks −19,1 %, Adobe −12,3 % (Intuit −17,7 %) [15]. Capitalización, PER, valor empresa y rentabilidad por flujo libre se mueven con el precio; la deuda neta y el consenso de beneficio de los comparables son los del 10-oct [16-25].',
    'Limitación: siete de los nueve (H&R Block, Paycom, BILL, Block, Toast, Shopify y Freshworks) han publicado resultados trimestrales después del 10-oct, y sus estimaciones no se han rehecho; los movimientos de BILL, Shopify y Freshworks (más del 19 % en un mes) son probablemente reacciones a resultados y sus múltiplos de los próximos 12 meses pueden estar desfasados. Rehacerlos con el consenso posterior es la primera tarea pendiente de esta sección.',
    'Valor empresa = capitalización + deuda neta del último ejercicio cerrado según MarketScreener [17-25]; la deuda neta se ha despejado de los múltiplos del 28-oct (DN = VE × DN/EBITDA ÷ VE/EBITDA LTM).',
    'Pesos de los próximos 12 meses (nov-2026 a oct-2027): ejercicios a diciembre, 2/12 de 2026 y 10/12 de 2027 en el consenso original del 10-oct, que usaba 25 % y 75 %; no se ha recalculado.',
    'El PER de los próximos 12 meses usa el BPA de MarketScreener, cuya base (GAAP o ajustado) cambia según la empresa [17-25]; el de Intuit en MarketScreener es GAAP [12].',
    'Diferencia entre el EBITDA de MarketScreener y el GAAP del último ejercicio, en % de ventas: Freshworks 19,6; BILL 15,3; Adobe 8,4; Toast 4,3; Paycom 4,1; Shopify 0,8; Block 0,2; H&R Block y Paychex 0 [16-25].',
    'ROIC del último ejercicio: EBIT × (1 − tipo impositivo) / capital invertido, con los datos de Yahoo Finance [16]. Rentabilidad por flujo libre: flujo libre de los últimos 12 meses / capitalización [16].',
]
comp['confianza'] = 'Baja'
json.dump(d, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# ---------- transacciones ----------
t = d['transacciones']
t['operaciones'] = ren_obj(t['operaciones'])
t['operaciones'].insert(0, {
    'fecha': '2026-11', 'objetivo': 'Mailchimp', 'comprador': 'Bending Spoons', 'ev': 3680, 'ev_ventas': 2.9, 'ev_ebitda': None, 'prima_pct': None, 'excluir': False,
    'comentario': ('Precio base de 3.680 M USD libre de caja y deuda (3.310 M en efectivo y 368 M en 8,82 M de acciones nuevas de Bending Spoons), sujeto a ajustes de caja, deuda y circulante [1, 3]. Ingresos de los últimos 12 meses a oct-2026: 1.268 M (1.272 M en el FY2026 − 317 M del 1T FY2026 + 313 M del 1T FY2027) [1, 4]: 2,9 veces ventas (cálculo propio). El resultado operativo del segmento en esos 12 meses fue de 667 M (604 − 139 + 202), 5,5 veces, pero excluye pagos en acciones, amortización de intangibles y costes corporativos, así que no es un EBITDA [1, 4]. Pendiente de cierre (principios de 2027). Intuit pagó unos 12.000 M en 2021 [27].')})
t['comentario'] = ('Ocho operaciones de software para pymes, impuestos, nóminas y finanzas entre 2020 y 2026, seis con múltiplo de ventas publicado o calculable: de 2,9 veces (Mailchimp, vendida por Intuit en noviembre de 2026) a 10,6 veces (Avalara) [26-37, 1, 3, 4]. Ninguna publicó múltiplo de EBITDA. Las primas de las OPA sobre cotizadas fueron del 19 % al 77 % [28, 31, 33, 35]. Intuit compró Credit Karma a 7,1 veces ventas y Mailchimp por 12.000 M en 2021, y vende Mailchimp por 3.680 M: el 31 % de lo pagado, con ingresos planos (1.267 M en el FY2024, 1.272 M en el FY2026) [3, 4, 26, 27].')
t['extra'] = [
    'Mailchimp no está clasificada como mantenida para la venta a 31-oct-2026 porque el consejo aprobó la venta en noviembre; Intuit espera una plusvalía antes de impuestos al cierre, cuyo importe dependerá del valor contable neto de Mailchimp, los ajustes y el valor de las acciones de Bending Spoons [1].',
    'Las acciones de Bending Spoons (368 M) tienen seis meses de bloqueo y su número se fijó a la firma; su valor razonable se fijará al cierre [1].',
    'Mailchimp, segmento propio desde el 1-ago-2026: ingresos de 1.267, 1.287 y 1.272 M en los FY2024-2026 y resultado operativo del segmento de 516, 548 y 604 M [4]; en el 1T FY2027, 313 M de ingresos (−1 %) y 202 M de resultado del segmento (+45 %) [1].',
    'Otras compras recientes del sector: Intuit anunció la compra de Sequence el 15-oct-2026 sin precio publicado; no entra en la tabla.',
    'Con unos 72.000 M USD de capitalización, Intuit es mucho mayor que cualquiera de estas operaciones [7].',
]
json.dump(d, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# ---------- dcf (datos para el WACC) ----------
d['dcf']['wacc'] = {'tasa_libre_pct': 4.92, 'beta': 1.01, 'prima_mercado_pct': None, 'prima_adicional_pct': 0, 'coste_deuda_pct': 5.6, 'tasa_impositiva_pct': 24, 'peso_deuda_pct': 8.8}
d['dcf']['extra'] = [
    'Tasa libre: Tesoro de EE. UU. a 10 años al 4,92 % el 20-nov-2026 (curva oficial diaria del Tesoro, «Daily Treasury Par Yield Curve Rates»); 5,04 % el 19-nov y 4,99 % el 27-oct [8].',
    'Beta mensual de 5 años 1,01 frente al S&P 500 (ajustada 1,01); semanal de 5 años 1,19 (ajustada 1,13) y semanal de 2 años 0,66 [7]. En la nota del 28-oct la mensual era 0,96.',
    'Tipo efectivo del 1T FY2027: 28 %, 24 % sin las partidas discretas de pagos en acciones [2].',
    'Coste de la deuda: bonos emitidos en junio de 2026 con tipo efectivo del 5,083 % (2031) y del 5,620 % (2036); se usa el 5,6 % del bono a diez años [5]. Gasto financiero de 72 M en el 1T FY2027 (58 M un año antes) por la emisión de 1.750 M de junio, compensada en parte por la devolución de 750 M en agosto [1].',
    'Peso de la deuda a valor de mercado: 6.922 M de deuda frente a 71.829 M de capitalización (265,6 M de acciones a 270,44 USD), un 8,8 % del capital total (cálculo propio) [1, 7].',
]
json.dump(d, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# ---------- valoración: puente a 31-oct-2026 ----------
d['valoracion']['puente'] = {'fecha': '2026-10-31', 'deuda_financiera': 6922, 'arrendamientos': 0, 'caja': 5321, 'minoritarios': 0, 'pensiones': 0, 'asociadas': 0, 'otros_ajustes': 22}
d['valoracion']['referencia_mercado'] = {'mercado': 'S&P 500 (prima implícita de Damodaran, ERP T12m with sustainable payout)', 'prima_implicita_pct': 4.2, 'fecha': '2026-10', 'fuente': 'Damodaran, ERPbymonth.xlsx [9]'}
d['valoracion']['extra'] = [
    'Balance a 31-oct-2026: deuda a corto 500 M y a largo 6.422 M (6.922 M); caja y equivalentes 4.042 M e inversiones a corto 1.279 M (5.321 M) [1, 2]. La nota de resultados redondea a 6.900 M de deuda y 5.300 M de caja e inversiones [2].',
    'La deuda incluye 970 M de líneas de crédito garantizadas y sin recurso a Intuit de sociedades vehículo que financian préstamos a pymes; esas sociedades tienen 350 M de caja (dentro de la caja del puente) y 780 M de préstamos pignorados [1]. No se suman al puente los préstamos para invertir (1.566 M) ni para la venta (92 M), activos del negocio de crédito [1].',
    'Otros ajustes: 22 M de recompras de finales de octubre liquidadas a principios de noviembre (las acciones ya están restadas a 31-oct) [1].',
    'La venta de Mailchimp NO ha cerrado (firmada el 19-nov, cierre previsto a principios de 2027): no entra en el puente. Al cerrar, Intuit cobrará unos 3.310 M en efectivo más 368 M en acciones de Bending Spoons, antes de ajustes e impuestos, y piensa dedicar el efectivo a recompras dentro del FY2027 [1, 2, 3]. Si se quisiera reflejar, son unos 12,5 USD por acción antes de impuestos (3.310 ÷ 265,6, cálculo propio), a cambio de unos 1.268 M de ingresos anuales.',
    'Entre el 31-jul y el 31-oct la caja e inversiones a corto bajaron de 7.200 a 5.321 M: recompras de 1.500 M, devolución de 750 M de bonos en agosto, entre otros usos [1].',
    'No se suman las inversiones a largo plazo (371 M) [1]. Arrendamientos: solo operativos (686 M a largo), fuera del puente en US GAAP [1].',
    'Vencimientos (10-K): tras devolver 750 M en agosto quedan 500 M a corto [1, 5].',
    'Dividendo trimestral de 1,38 USD por acción pagadero el 15-ene-2027 (+15 %) [2].',
    'Prima implícita de Damodaran: se mantiene la de octubre (4,20 %); la de noviembre se publica a principios de diciembre [9].',
]
json.dump(d, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# ---------- fuentes ----------
of = {f['id']: f for f in viejo['fuentes']}
F = [
    (1, 'Intuit Inc. Form 10-Q del 1T FY2027 (trimestre cerrado el 31-oct-2026)', 'Intuit Inc. / SEC EDGAR', 'Primaria', '2026-11-19', 'https://www.sec.gov/Archives/edgar/data/896878/000089687826000045/intu-20261031.htm'),
    (2, 'Intuit Reports First-Quarter Results and Enters Agreement to Sell Mailchimp to Bending Spoons (Exhibit 99.01, Form 8-K)', 'Intuit Inc. / SEC EDGAR', 'Primaria', '2026-11-19', 'https://www.sec.gov/Archives/edgar/data/896878/000089687826000043/fy27q1earningspressrelease.htm'),
    (3, 'Form 8-K: Equity and Asset Purchase Agreement con Bending Spoons US Inc. (venta de Mailchimp)', 'Intuit Inc. / SEC EDGAR', 'Primaria', '2026-11-19', 'https://www.sec.gov/Archives/edgar/data/896878/000119312526468834/d182669d8k.htm'),
    (4, 'Form 8-K: información del 10-K FY2026 reexpresada con Mailchimp como segmento (Exhibit 99.01)', 'Intuit Inc. / SEC EDGAR', 'Primaria', '2026-11-19', 'https://www.sec.gov/Archives/edgar/data/896878/000089687826000047/intu-20261119_d2.htm'),
    (5, of[1]['titulo'], of[1]['editor'], 'Primaria', of[1]['fecha'], of[1]['url']),
    (6, of[2]['titulo'], of[2]['editor'], 'Primaria', of[2]['fecha'], of[2]['url']),
    (7, 'Históricos diarios de INTU, S&P 500 (^GSPC) e iShares Expanded Tech-Software (IGV) (herramientas bolsa.mjs y movimiento.mjs)', 'Yahoo Finance', 'Datos de mercado', '2026-11-20', 'https://finance.yahoo.com/quote/INTU/history/'),
    (8, 'Daily Treasury Par Yield Curve Rates 2026 (10 Yr)', 'U.S. Department of the Treasury', 'Datos de mercado', '2026-11-20', 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2026/all?type=daily_treasury_yield_curve&field_tdr_date_value=2026&page&_format=csv'),
    (9, of[8]['titulo'], of[8]['editor'], 'Sectorial', of[8]['fecha'], of[8]['url']),
    (10, 'Intuit (INTU) Stock Forecast & Price Target (actualizado el 11-nov-2026; consultado el 20-nov)', 'Stock Analysis', 'Analistas', '2026-11-11', 'https://stockanalysis.com/stocks/intu/forecast/'),
    (11, 'Intuit Inc. (INTU) Analyst Estimates (consultado el 20-nov-2026, aún sin los resultados del 1T)', 'Yahoo Finance', 'Analistas', '2026-11-20', 'https://finance.yahoo.com/quote/INTU/analysis/'),
    (12, of[3]['titulo'] + ' (consulta del 27-oct-2026)', of[3]['editor'], 'Datos de mercado', '2026-10-27', of[3]['url']),
    (13, 'Intuit stock falls 9% on FY27 revenue forecast cut, Mailchimp sale; analysts cut PTs', 'Finwire', 'Prensa', '2026-11-20', 'https://finwire.io/news/stock-markets-news/intuit-stock-falls-9-on-fy27-revenue-forecast-cut-mailchimp-sale-analysts-cut-pts'),
    (14, 'Intuit Slides Toward $279.66 After Cutting Its Credit Karma Outlook and Selling Mailchimp; Market movers INTU 17-nov-2026', 'TradingKey', 'Prensa', '2026-11-20', 'https://www.tradingkey.com/analysis/stocks/us-stocks/262314593-intuit-slides-toward-279-66-credit-karma-outlook-cut-mailchimp-sale-november-20-2026-tradingkey'),
    (15, 'Cierres diarios de HRB, PAYX, PAYC, BILL, XYZ, TOST, SHOP, FRSH, ADBE e INTU del 27-oct y el 20-nov-2026 (notas/D-precios.mjs)', 'Yahoo Finance', 'Datos de mercado', '2026-11-20', 'https://finance.yahoo.com/'),
]
for o in range(10, 32):
    f = of[o]
    F.append((MAPA[o], f['titulo'], f['editor'], f['tipo'], f['fecha'], f['url']))
F.append((38, of[9]['titulo'], of[9]['editor'], of[9]['tipo'], of[9]['fecha'], of[9]['url']))
F.sort()
d['fuentes'] = [{'id': i, 'titulo': t_, 'editor': e, 'tipo': ty, 'fecha': fe, 'url': u} for i, t_, e, ty, fe, u in F]

# ---------- huecos ----------
d['huecos'] = [
    {'seccion': 'consenso', 'campo': 'estimaciones posteriores a los resultados del 19-nov-2026', 'tipo': 'Núcleo',
     'intentos': '1) Yahoo Finance, página de estimaciones (el 20-nov seguía con el trimestre de octubre como en curso); 2) Stock Analysis, previsiones (actualizadas el 11-nov) y MarketScreener, consenso y finanzas (servía páginas de octubre); 3) MarketBeat (página en caché de 2025) y prensa del 20-nov (solo recortes de objetivo)',
     'decision': 'Se usan las estimaciones previas a los resultados, con su fecha; la guía de BPA se reiteró, la de ingresos bajó un 0,8 %'},
    {'seccion': 'comparables', 'campo': 'consenso de los comparables posterior a sus resultados de octubre-noviembre', 'tipo': 'Núcleo',
     'intentos': '1) No se rehicieron por tiempo: se llevaron los precios del 27-oct al 20-nov con la variación de Yahoo; 2) MarketScreener sirve páginas de semanas atrás por WebFetch; 3) Yahoo quoteSummary con crumb no autorizado en esta sesión',
     'decision': 'Calculado y marcado como estimación (precios al 20-nov, consenso del 10-oct)'},
    {'seccion': 'consenso', 'campo': 'objetivo medio y recomendaciones posteriores al 20-nov', 'tipo': 'Complemento',
     'intentos': '1) Stock Analysis (11-nov); 2) MarketScreener (página de octubre); 3) MarketBeat y Finwire (solo cinco recortes)',
     'decision': 'Se usa el objetivo medio del 11-nov y se citan los recortes del 20-nov aparte'},
    {'seccion': 'transacciones', 'campo': 'ev_ebitda de Mailchimp (venta de 2026)', 'tipo': 'Complemento',
     'intentos': '1) 8-K del acuerdo con Bending Spoons (sin EBITDA); 2) 10-Q y 8-K reexpresado (solo resultado operativo del segmento, sin pagos en acciones ni costes corporativos); 3) nota de resultados del 1T FY2027 (sin EBITDA del segmento)',
     'decision': 'Omitido; se da el resultado del segmento (5,5 veces) en el comentario'},
    {'seccion': 'multiplos_historicos', 'campo': 'ev_ebitda_ntm y per_ntm de cada ejercicio', 'tipo': 'Complemento',
     'intentos': '1) MarketScreener, página de finanzas de Intuit (solo múltiplos de ejercicios estimados); 2) Stock Analysis, estadísticas (el histórico es de pago); 3) Yahoo Finance (sin series históricas de múltiplos adelantados)', 'decision': 'Omitido'},
    {'seccion': 'transacciones', 'campo': 'ev_ventas de Mailchimp (compra de 2021) y de Divvy (2021)', 'tipo': 'Complemento',
     'intentos': '1) comunicados de la compra en EDGAR (Intuit, 13-sep-2021; Bill.com, 6-may-2021: no dan ingresos); 2) búsqueda en los documentos de Intuit de sep-dic 2021; 3) datos XBRL de Intuit (sin ingresos pro forma de Mailchimp)', 'decision': 'Omitido'},
    {'seccion': 'identificacion', 'campo': 'proximos_resultados (2T FY2027)', 'tipo': 'Complemento',
     'intentos': '1) nota de resultados del 1T FY2027 (sin fecha); 2) 10-Q (sin fecha); 3) Stock Analysis (sin fecha nueva)', 'decision': 'Omitido'},
]
d['_estado'] = {'terminado': '2026-11-20', 'resumen': 'Nota D actualizada al cierre del 20-nov-2026 (270,44 USD) tras los resultados del 1T FY2027 y la venta de Mailchimp: puente a 31-oct, Tesoro 4,92 %, bolsa.mjs y movimiento.mjs del 20-nov; consenso de antes de resultados (no había otro gratis); comparables llevados al 20-nov con la variación de precio.'}
json.dump(d, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok', med(pers), med(evn), med(evl), pers)

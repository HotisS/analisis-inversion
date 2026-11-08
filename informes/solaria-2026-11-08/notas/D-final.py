import json
base = '/home/user/analisis-inversion/informes/solaria-2026-11-08/notas/'
p = base + 'D.json'
d = json.load(open(p))
tabla = json.load(open(base + 'D-comparables-tabla.json'))

d['_estado'] = 'completo (identificacion, consenso, bolsa, multiplos_historicos, comparables, transacciones, datos de WACC y puente)'
d['consenso']['revisiones'] = d['consenso']['revisiones'].replace('Berenberg (junio) [12]', 'Berenberg (junio) [14]')

empresas = []
for r in tabla:
    if r['ticker'] == 'SLR.MC':
        continue
    empresas.append({k: r[k] for k in ['nombre', 'ticker', 'pais', 'capitalizacion', 'ev_ventas', 'ev_ebitda_ltm', 'ev_ebitda_ntm', 'per_ntm', 'crecimiento_pct', 'margen_ebitda_pct', 'roic_pct', 'dn_ebitda', 'fcf_yield_pct']})

d['comparables'] = {
    "criterio": "Ocho productores independientes de renovables cotizados en Europa con activos propios y consenso gratuito: tres españoles (Grenergy, Acciona Energía, Ecoener), EDP Renováveis, ERG, Ørsted, Voltalia y Scatec. Todos con datos de Yahoo Finance al cierre del 6-nov-2026 y conversión a EUR con el tipo del BCE de ese día [21, 22]. Fuera: Neoen y Encavis (excluidas de bolsa tras sus OPA) [26, 27], Boralex y Northland (Yahoo no da capitalización ni estimaciones completas). Grenergy y Voltalia mezclan generación con venta de proyectos y servicios; Ørsted es eólica marina.",
    "empresas": empresas,
    "comentario": "Método, para el integrador: capitalización, valor empresa (el de Yahoo: capitalización + deuda total − caja), EBITDA e ingresos de los últimos 12 meses y BPA y ventas del consenso, todo de Yahoo [21]. PER NTM = precio ÷ (14,8 % del BPA 2026e + 85,2 % del 2027e). Yahoo no da EBITDA estimado: el EV/EBITDA NTM es una estimación propia a margen constante (EBITDA LTM × ventas NTM/2026e del consenso) y `crecimiento_pct` es ese mismo factor (ventas NTM sobre 2026e del consenso, la misma definición en los dos lados), no el cociente con las ventas LTM de Yahoo, que en EDPR, Acciona y Scatec usan otra definición. ROIC: Yahoo no lo da (null). FCF de Yahoo (operativo − capex) negativo en casi todos por la inversión en crecimiento. Control con Solaria en la misma base: EV/EBITDA LTM 10,7x, NTM 9,2x, PER NTM 9,7x, DN/EBITDA 4,1x [21]. Solaria cotiza con descuento claro en PER (9,7x frente a una mediana cercana a 18x), en parte porque su margen del 88 % y su BPA incluyen «otros ingresos» (Generia y rotación) [4, 5]. Acciona Energía y EDPR tienen PER altos por beneficios deprimidos por precios bajos.",
    "confianza": "Media"
}

d['transacciones'] = {
    "operaciones": [
        {"fecha": "2024-03", "objetivo": "Encavis (Alemania; solar y eólica, IPP)", "comprador": "KKR y Viessmann", "ev": 4700, "ev_ventas": None, "ev_ebitda": 15.8, "prima_pct": 54.0, "excluir": False, "comentario": "OPA a 17,50 EUR por acción: valor del capital 2.800 M EUR y valor empresa 4.700 M EUR con la deuda neta de 1.906 M EUR a 30-sep-2023; 15,8x el EBITDA 2024e (> 300 M EUR). Prima del 54 % sobre el precio no afectado y del 33 % sobre la media de 3 meses [26]."},
        {"fecha": "2024-05", "objetivo": "Neoen (Francia; solar, eólica y baterías, 8,3 GW)", "comprador": "Brookfield", "ev": None, "ev_ventas": None, "ev_ebitda": None, "prima_pct": 26.9, "excluir": False, "comentario": "Compra del 53,32 % a 39,85 EUR por acción y OPA obligatoria sobre el resto: 6.100 M EUR por el 100 % del capital; prima del 26,9 % sobre el cierre de 31,40 EUR del 29-may-2024 [27]. Valor empresa y múltiplo no publicados en la fuente leída."},
        {"fecha": "2025", "objetivo": "Generia Land (terrenos para renovables de Solaria, 50 %)", "comprador": "Fondo de infraestructuras (no identificado)", "ev": None, "ev_ventas": None, "ev_ebitda": None, "prima_pct": None, "excluir": True, "comentario": "Operación de la propia Solaria: el fondo se compromete a aportar 125 M EUR por el 50 %; valor razonable de los activos netos (100 %) de 134,5 M EUR y plusvalía de 54,6 M EUR en otros ingresos de 2025. Solaria retiene el 71 % económico (96,0 M EUR) mientras el inversor no complete la aportación (19 M EUR a 31-dic-2025) [4]. No es comparable (terrenos, no generación)."}
    ],
    "comentario": "Solo una operación con múltiplo publicado y verificado (Encavis, 15,8x EBITDA, prima del 54 %) [26]; la de Neoen confirma primas del 25-55 % en OPA sobre IPP europeos [27]. La familia Díaz-Tejeiro controla el 36,4 % y Stoneshield el 9,5 % [3], así que una opa necesitaría su acuerdo. Solaria cotiza a 10,7x EBITDA LTM, muy por debajo de esos 15,8x, pero con más deuda relativa al capital y más peso de ingresos no recurrentes.",
    "confianza": "Baja"
}

d['dcf'] = {
    "wacc": {
        "tasa_libre_pct": 3.29,
        "beta": None,
        "prima_mercado_pct": None,
        "prima_adicional_pct": None,
        "coste_deuda_pct": 3.9,
        "tasa_impositiva_pct": None,
        "peso_deuda_pct": 42.0
    },
    "_datos_wacc": "Solo datos, sin supuestos. Tasa libre: rendimiento del Bund a 10 años (curva del Bundesbank, serie BBSIS D.I.ZST.ZI.EUR.S1311.B.A604.R10XX) el 6-nov-2026: 3,29 % (3,43 % el 28-oct; 3,38 % el 4-nov) [23]. Betas de la acción frente al ETF del IBEX (BBVAI.MC) [1]: mensual 5 años 1,00; semanal 5 años 0,64; semanal 2 años 0,36; ajustadas 1,00 y 0,76. Yahoo: 1,04 [2]. La beta frente al IBEX puede infravalorar el riesgo (lección de utilities): conviene contrastarla con la sectorial. Damodaran, Europa (enero de 2026), Green & Renewable Energy: 60 empresas, beta apalancada 0,72, D/E 86,3 %, tipo efectivo 9,8 %, beta desapalancada 0,44 y corregida por caja 0,46; Power: 0,62 apalancada, 0,45 desapalancada corregida; mercado total sin financieras 0,92 [25]. Reapalancada con la estructura de Solaria (D/E de mercado 72 % = 1.538,8 / 2.126; tipo marginal del 25 %): 0,46 × (1 + 0,75 × 0,72) ≈ 0,71 (cálculo propio). Coste de la deuda: 3,9 % medio a 30-jun-2026, 84 % a tipo fijo o cubierto, 91 % deuda de proyecto con vencimiento medio residual de 10 años [5]. Tipo impositivo efectivo 1S26: 18,8 % (29,0 / 153,9) [5]. Peso de la deuda a valor de mercado: deuda bruta con arrendamientos 1.538,8 M EUR sobre 1.538,8 + 2.126 = 42 % [5, 2]. Prima de mercado implícita (Damodaran, nov-2026): 4,41 % [24]."
}

d['valoracion'] = {
    "puente": {
        "fecha": "2026-06-30",
        "deuda_financiera": 1355.3,
        "arrendamientos": 183.5,
        "caja": 209.4,
        "minoritarios": 5.2,
        "pensiones": 0,
        "asociadas": 96.5,
        "otros_ajustes": 0
    },
    "rab": None,
    "referencia_mercado": {"mercado": "S&P 500 (Damodaran; vale para mercados desarrollados)", "prima_implicita_pct": 4.41, "fecha": "2026-11", "fuente": "Damodaran, ERPbymonth.xlsx, última fila (1-nov-2026), «ERP (T12m with sustainable payout)» [24]"},
    "_notas_puente": "Último balance publicado: 30-jun-2026 (Solaria no publica balance trimestral al 30-sep; el 9M26 sale hacia el 16-nov) [5]. Deuda financiera = obligaciones y bonos a largo 113,8 + entidades de crédito a largo 1.078,5 + obligaciones y bonos a corto 94,6 + entidades de crédito a corto 68,4 = 1.355,3 M EUR. Arrendamientos (NIIF 16) = 173,5 + 10,0 = 183,5. Caja 209,4. Deuda neta = 1.329,4 M EUR, que cuadra con los 1.329 M EUR que publica la empresa (1.146 sin NIIF 16), sin derivados [5]. Derivados de cobertura (pasivo 20,6, activo 11,0) fuera del puente, como hace la empresa. Minoritarios a valor contable, 5,2 (Indarberri, 30 % del EVE) [4, 5]. Asociadas: Generia Land, puesta en equivalencia, 96,5 M EUR a 31-dic-2025 (valor razonable de experto independiente en la operación de 2025) [4]; dentro de los 211,4 M EUR de «otros activos financieros no corrientes» del 1S26 [5]. Activos no corrientes mantenidos para la venta: 28,9 M EUR, no incluidos (decide el integrador). Acciones y caja: los 131,6 M de acciones son posteriores a la colocación de abril, cuya caja ya está en el balance de junio; no hace falta ajuste. Deuda neta/EBITDA LTM según la empresa: 3,9x [5]."
}

d['fuentes'] += [
    {"id": 21, "titulo": "quoteSummary de GRE.MC, ANE.MC, EDPR.LS, ERG.MI, ORSTED.CO, VLTSA.PA, ENER.MC, SCATC.OL y SLR.MC (precio, valor empresa, EBITDA e ingresos LTM, consenso de BPA y ventas)", "editor": "Yahoo Finance", "tipo": "Datos de mercado", "fecha": "2026-11-06", "url": "https://query1.finance.yahoo.com/v10/finance/quoteSummary/"},
    {"id": 22, "titulo": "Tipos de cambio de referencia del euro (DKK 7,4752; NOK 10,526)", "editor": "Banco Central Europeo", "tipo": "Primaria", "fecha": "2026-11-06", "url": "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"},
    {"id": 23, "titulo": "Rendimiento de los bonos federales a 10 años, curva diaria (BBSIS)", "editor": "Deutsche Bundesbank", "tipo": "Primaria", "fecha": "2026-11-06", "url": "https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A"},
    {"id": 24, "titulo": "Implied ERP by month (ERPbymonth.xlsx)", "editor": "Aswath Damodaran, NYU Stern", "tipo": "Sectorial", "fecha": "2026-11-01", "url": "https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx"},
    {"id": 25, "titulo": "Betas by sector, Europe (betaEurope.xls)", "editor": "Aswath Damodaran, NYU Stern", "tipo": "Sectorial", "fecha": "2026-01-05", "url": "https://pages.stern.nyu.edu/~adamodar/pc/datasets/betaEurope.xls"},
    {"id": 26, "titulo": "Encavis: Announcement Presentation (oferta de KKR)", "editor": "Encavis", "tipo": "Primaria", "fecha": "2024-03-14", "url": "https://www.encavis.com/Dokumente/IR/Conference%20Calls/Gesch%C3%A4ftsjahr%202024/20240314-Encavis-Announcement-Presentation.pdf"},
    {"id": 27, "titulo": "Brookfield to acquire Neoen for €6.1 billion", "editor": "Energy-Storage.news", "tipo": "Prensa", "fecha": "2024-05-31", "url": "https://energy-storage.news/brookfield-to-acquire-neoen-for-e6-1-billion"}
]
d['huecos'] += [
    {"seccion": "comparables", "campo": "roic_pct y EBITDA NTM del consenso de cada comparable", "tipo": "Complemento", "intentos": "1) Yahoo quoteSummary: no da ROIC ni EBITDA estimado; 2) MarketScreener: una página por empresa, fuera del presupuesto de llamadas; 3) derivado: EV/EBITDA NTM a margen constante (estimación propia, explicada en el comentario)", "decision": "Calculado y marcado como estimación (EBITDA NTM); ROIC omitido"},
    {"seccion": "transacciones", "campo": "valor empresa y múltiplos de Neoen-Brookfield, Atlantica-ECP, Opdenergy-Antin, X-Elio y otras", "tipo": "Complemento", "intentos": "1) Notas oficiales: solo leída la de Encavis (múltiplo publicado); 2) prensa (Energy-Storage.news para Neoen): sin valor empresa ni múltiplo; 3) búsquedas: sin texto original con múltiplos dentro del presupuesto", "decision": "Omitido (solo 1 operación con múltiplo; por debajo del mínimo de 3)"},
    {"seccion": "valoracion", "campo": "balance a 30-sep-2026", "tipo": "Núcleo", "intentos": "1) CNMV: el 9M26 no está publicado (se espera hacia el 16-nov); 2) web de Solaria: último documento, presentación del 1S26; 3) Yahoo: mostRecentQuarter = 30-jun-2026", "decision": "Puente con el balance a 30-jun-2026"}
]
json.dump(d, open(p, 'w'), ensure_ascii=False, indent=2)
print('ok', len(d['fuentes']))

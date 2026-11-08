import json
src = json.load(open('/home/user/analisis-inversion/informes/solaria-2026-11-08/notas/D-comparables-yahoo.json'))
fx = src['fx_bce']
W0 = (31 + 23) / 365.0  # parte del ejercicio 2026 que queda tras el 8-nov-2026
W1 = 1 - W0
PAIS = {'GRE.MC': 'ES', 'ANE.MC': 'ES', 'EDPR.LS': 'PT', 'ERG.MI': 'IT', 'ORSTED.CO': 'DK', 'VLTSA.PA': 'FR', 'ENER.MC': 'ES', 'SCATC.OL': 'NO', 'SLR.MC': 'ES'}
NOMBRE = {'GRE.MC': 'Grenergy', 'ANE.MC': 'Acciona Energía', 'EDPR.LS': 'EDP Renováveis', 'ERG.MI': 'ERG', 'ORSTED.CO': 'Ørsted', 'VLTSA.PA': 'Voltalia', 'ENER.MC': 'Ecoener', 'SCATC.OL': 'Scatec', 'SLR.MC': 'Solaria (control)'}
out = []
for t, e in src['empresas'].items():
    if t not in PAIS or 'error' in e:
        continue
    k = 1.0 / fx[e['divisa_fin']]  # a EUR
    mcap = e['market_cap'] / 1e6 * k
    ev = e['ev'] / 1e6 * k
    rev = e['ingresos_ttm'] / 1e6 * k
    ebitda = e['ebitda_ttm'] / 1e6 * k
    fac = (W0 * e["rev_0y"] + W1 * e["rev_1y"]) / e["rev_0y"] if e["rev_0y"] and e["rev_1y"] else None
    rev_ntm = rev * fac if fac else None
    ebitda_ntm = ebitda * rev_ntm / rev if rev_ntm else None
    eps_ntm = W0 * e['eps_0y'] + W1 * e['eps_1y'] if e['eps_0y'] is not None and e['eps_1y'] is not None else None
    per_ntm = e['precio'] / eps_ntm if eps_ntm and eps_ntm > 0 else None
    dn = (e['deuda_total'] - e['caja']) / 1e6 * k
    row = {
        'nombre': NOMBRE[t], 'ticker': t, 'pais': PAIS[t],
        'capitalizacion': round(mcap), 'ev_ventas': round(ev / rev, 2),
        'ev_ebitda_ltm': round(ev / ebitda, 1),
        'ev_ebitda_ntm': round(ev / ebitda_ntm, 1) if ebitda_ntm else None,
        'per_ntm': round(per_ntm, 1) if per_ntm else None,
        'crecimiento_pct': round((rev_ntm / rev - 1) * 100, 1) if rev_ntm else None,
        'margen_ebitda_pct': round(ebitda / rev * 100, 1),
        'roic_pct': None,
        'dn_ebitda': round(dn / ebitda, 1),
        'fcf_yield_pct': round(e['fcf_ttm'] / 1e6 * k / mcap * 100, 1) if e['fcf_ttm'] is not None else None,
        '_ev': round(ev), '_ebitda_ltm': round(ebitda, 1), '_ebitda_ntm_est': round(ebitda_ntm, 1) if ebitda_ntm else None,
        '_ingresos_ltm': round(rev, 1), '_eps_ntm': round(eps_ntm, 3) if eps_ntm is not None else None, '_divisa': e['divisa_fin'], '_fx_por_eur': fx[e['divisa_fin']],
    }
    out.append(row)
json.dump(out, open('/home/user/analisis-inversion/informes/solaria-2026-11-08/notas/D-comparables-tabla.json', 'w'), indent=1, ensure_ascii=False)
for r in out:
    print(r)

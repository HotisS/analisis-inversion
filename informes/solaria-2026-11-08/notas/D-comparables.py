import json, subprocess, sys, urllib.request, http.cookiejar, xml.etree.ElementTree as ET

TICKERS = ['GRE.MC', 'ANE.MC', 'EDPR.LS', 'ERG.MI', 'ORSTED.CO', 'VLTSA.PA', 'ENER.MC', 'SCATC.OL', 'BLX.TO', 'NPI.TO', 'SLR.MC']
OUT = '/home/user/analisis-inversion/informes/solaria-2026-11-08/notas/D-comparables-yahoo.json'

cj = http.cookiejar.CookieJar()
op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
op.addheaders = [('User-Agent', 'Mozilla/5.0')]
try:
    op.open('https://fc.yahoo.com', timeout=20)
except Exception:
    pass
crumb = op.open('https://query1.finance.yahoo.com/v1/test/getcrumb', timeout=20).read().decode()

# ECB reference rates (units of currency per 1 EUR)
fx = {'EUR': 1.0}
x = op.open('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml', timeout=20).read()
root = ET.fromstring(x)
fxdate = None
for el in root.iter():
    if el.get('time'):
        fxdate = el.get('time')
    if el.get('currency'):
        fx[el.get('currency')] = float(el.get('rate'))

def g(v):
    return v.get('raw') if isinstance(v, dict) else v

res = {'fx_bce': fx, 'fx_fecha': fxdate, 'empresas': {}}
mods = 'price,financialData,defaultKeyStatistics,earningsTrend,summaryDetail,incomeStatementHistory'
for t in TICKERS:
    try:
        url = f'https://query1.finance.yahoo.com/v10/finance/quoteSummary/{t}?modules={mods}&crumb={crumb}'
        r = json.load(op.open(url, timeout=30))['quoteSummary']['result'][0]
    except Exception as e:
        res['empresas'][t] = {'error': str(e)}
        continue
    p, fd, ks = r['price'], r['financialData'], r['defaultKeyStatistics']
    tr = {x['period']: x for x in r.get('earningsTrend', {}).get('trend', [])}
    def est(per, k1, k2):
        return g(tr.get(per, {}).get(k1, {}).get(k2)) if per in tr else None
    res['empresas'][t] = {
        'nombre': p.get('longName') or p.get('shortName'),
        'divisa_cot': p.get('currency'), 'divisa_fin': fd.get('financialCurrency'),
        'precio': g(p.get('regularMarketPrice')), 'hora': g(p.get('regularMarketTime')),
        'market_cap': g(p.get('marketCap')), 'ev': g(ks.get('enterpriseValue')),
        'ebitda_ttm': g(fd.get('ebitda')), 'ingresos_ttm': g(fd.get('totalRevenue')),
        'deuda_total': g(fd.get('totalDebt')), 'caja': g(fd.get('totalCash')),
        'fcf_ttm': g(fd.get('freeCashflow')), 'roe': g(fd.get('returnOnEquity')),
        'ebitda_margin': g(fd.get('ebitdaMargins')),
        'ev_ebitda_yahoo': g(ks.get('enterpriseToEbitda')), 'ev_rev_yahoo': g(ks.get('enterpriseToRevenue')),
        'forward_pe': g(ks.get('forwardPE')), 'trailing_eps': g(ks.get('trailingEps')),
        'eps_0y': est('0y', 'earningsEstimate', 'avg'), 'eps_1y': est('+1y', 'earningsEstimate', 'avg'),
        'n_eps_1y': est('+1y', 'earningsEstimate', 'numberOfAnalysts'),
        'rev_0y': est('0y', 'revenueEstimate', 'avg'), 'rev_1y': est('+1y', 'revenueEstimate', 'avg'),
        'rev_prev_year': est('0y', 'revenueEstimate', 'yearAgoRevenue'),
        'fin_0y': tr.get('0y', {}).get('endDate'),
        'last_fy': g(ks.get('lastFiscalYearEnd')), 'mrq': g(ks.get('mostRecentQuarter')),
    }
json.dump(res, open(OUT, 'w'), indent=1, ensure_ascii=False)
print('fx', fxdate)
for t, e in res['empresas'].items():
    print(t, {k: e.get(k) for k in ['nombre', 'divisa_cot', 'divisa_fin', 'precio', 'market_cap', 'ev', 'ebitda_ttm', 'ingresos_ttm', 'eps_0y', 'eps_1y', 'rev_0y', 'rev_1y', 'fin_0y', 'forward_pe', 'fcf_ttm', 'deuda_total', 'caja', 'roe']} if 'error' not in e else e)

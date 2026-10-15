"""Descarga los datos del screening de megatendencias.

- Precios semanales ajustados (Yahoo Finance, gráfico v8) de todos los tickers de universo.json, del índice y de las divisas.
- Visitas mensuales de Wikipedia (inglés, usuarios) de los artículos de cada megatendencia, y el total de visitas de
  Wikipedia en inglés para normalizar (la API de Wikimedia empieza en julio de 2015).

Salida: megatendencias/datos/precios_semanales.csv y megatendencias/datos/wiki_mensual.csv
Uso: python3 megatendencias/descargar.py [--solo-precios | --solo-wiki]
"""
import json, sys, time, csv, os, urllib.request, urllib.error
from datetime import datetime, timezone

AQUI = os.path.dirname(os.path.abspath(__file__))
DATOS = os.path.join(AQUI, 'datos')
os.makedirs(DATOS, exist_ok=True)
U = json.load(open(os.path.join(AQUI, 'universo.json'), encoding='utf-8'))

UA_YAHOO = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'
UA_WIKI = 'AnalisisInversionResearch/1.0 (https://github.com/HotisS/analisis-inversion; screening de megatendencias)'


def pedir(url, ua, intentos=8):
    for i in range(intentos):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': ua, 'Api-User-Agent': ua})
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.loads(r.read().decode('utf-8'))
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
            time.sleep(3 * (i + 1))
        except Exception:
            time.sleep(3 * (i + 1))
    raise RuntimeError(f'Sin respuesta tras {intentos} intentos: {url[:100]}')


def precios():
    tickers = sorted({t for n in U['nodos'].values() for t in n['tickers']} | {U['indice']['ticker']} | set(U['fx'].values()))
    filas = {}
    meta = {}
    for t in tickers:
        url = f'https://query1.finance.yahoo.com/v8/finance/chart/{urllib.request.quote(t)}?period1=1230768000&period2=' + str(int(time.time())) + '&interval=1wk&includeAdjustedClose=true'
        d = pedir(url, UA_YAHOO)
        if not d or not d.get('chart', {}).get('result'):
            print('SIN DATOS', t); continue
        r = d['chart']['result'][0]
        ts = r.get('timestamp') or []
        adj = (r['indicators'].get('adjclose') or [{}])[0].get('adjclose') or r['indicators']['quote'][0]['close']
        meta[t] = r['meta'].get('currency')
        for s, v in zip(ts, adj):
            if v is None:
                continue
            f = datetime.fromtimestamp(s, tz=timezone.utc).strftime('%Y-%m-%d')
            filas.setdefault(f, {})[t] = v
        print(t, meta[t], len(ts), datetime.fromtimestamp(ts[0], tz=timezone.utc).date() if ts else '-')
        time.sleep(0.4)
    with open(os.path.join(DATOS, 'precios_semanales.csv'), 'w', newline='') as f:
        w = csv.writer(f)
        w.writerow(['fecha'] + tickers)
        for fecha in sorted(filas):
            w.writerow([fecha] + [filas[fecha].get(t, '') for t in tickers])
    json.dump(meta, open(os.path.join(DATOS, 'divisas.json'), 'w'), indent=1)


def wiki():
    fin = datetime.now(timezone.utc).strftime('%Y%m01')
    articulos = sorted({a for m in U['megatendencias'].values() for a in m['wiki']})
    serie = {}
    url_total = f'https://wikimedia.org/api/rest_v1/metrics/pageviews/aggregate/en.wikipedia/all-access/user/monthly/2015070100/{fin}00'
    for it in pedir(url_total, UA_WIKI)['items']:
        serie.setdefault(it['timestamp'][:6], {})['__TOTAL__'] = it['views']
    for a in articulos:
        url = f'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/{urllib.request.quote(a, safe="")}/monthly/20150701/{fin}'
        cache = os.path.join(DATOS, 'wiki_cache', a.replace('/', '_') + '.json')
        os.makedirs(os.path.dirname(cache), exist_ok=True)
        if os.path.exists(cache):
            d = json.load(open(cache))
        else:
            try:
                d = pedir(url, UA_WIKI)
            except RuntimeError:
                print('REINTENTAR MÁS TARDE', a); time.sleep(30); continue
            json.dump(d or {}, open(cache, 'w'))
        n = 0
        for it in (d or {}).get('items', []):
            serie.setdefault(it['timestamp'][:6], {})[a] = it['views']; n += 1
        print(a, n)
        time.sleep(1.5)
    cols = ['__TOTAL__'] + articulos
    with open(os.path.join(DATOS, 'wiki_mensual.csv'), 'w', newline='') as f:
        w = csv.writer(f)
        w.writerow(['mes'] + cols)
        for mes in sorted(serie):
            w.writerow([mes] + [serie[mes].get(c, 0) for c in cols])


if __name__ == '__main__':
    if '--solo-wiki' not in sys.argv:
        precios()
    if '--solo-precios' not in sys.argv:
        wiki()

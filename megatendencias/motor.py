"""Motor del screening de megatendencias: datos en euros, señales en cada fecha (solo con lo publicado hasta ese día)
y las 10 versiones del método. Lo usan backtest.py (pasado) y hoy.py (presente).

Principio: en la fecha t solo se usan precios hasta el cierre del mes t y visitas de Wikipedia hasta el mes t-1
(las del mes t se publican al día siguiente). El mapa megatendencia → sectores es fijo y está en universo.json.
"""
import json, os
import numpy as np
import pandas as pd

AQUI = os.path.dirname(os.path.abspath(__file__))
DATOS = os.path.join(AQUI, 'datos')
U = json.load(open(os.path.join(AQUI, 'universo.json'), encoding='utf-8'))


# ───────────────────────── datos ─────────────────────────
def cargar():
    p = pd.read_csv(os.path.join(DATOS, 'precios_semanales.csv'), parse_dates=['fecha']).set_index('fecha').sort_index()
    divisas = json.load(open(os.path.join(DATOS, 'divisas.json')))
    p = p.groupby(p.index.to_period('W-FRI')).last()
    p.index = p.index.to_timestamp(how='end').normalize()
    p = p.ffill(limit=2)
    eur = pd.DataFrame(index=p.index)
    for t, div in divisas.items():
        if t.endswith('=X') or t not in p:
            continue
        s = p[t]
        if div == 'GBp':
            s, div = s / 100, 'GBP'
        if div != 'EUR':
            s = s / p[U['fx'][div]]
        eur[t] = s
    # Nodos: un ETF o una cesta igualada (rebalanceo semanal de los miembros con precio)
    sem = {}
    for k, n in U['nodos'].items():
        cols = [t for t in n['tickers'] if t in eur]
        r = eur[cols].pct_change(fill_method=None)
        r = r.where(eur[cols].notna() & eur[cols].shift().notna())
        rr = r.mean(axis=1, skipna=True)
        valido = r.notna().sum(axis=1) >= max(1, (len(cols) + 1) // 2)  # cesta: al menos la mitad de miembros
        rr = rr.where(valido)
        primero = rr.first_valid_index()
        if primero is None:
            continue
        idx = (1 + rr.loc[primero:].fillna(0)).cumprod()
        sem[k] = idx
    sem = pd.DataFrame(sem)
    bench = eur[U['indice']['ticker']]
    mens = sem.resample('ME').last()
    bmens = bench.resample('ME').last()
    # Una serie mensual solo vale desde que el nodo tiene precio ese mes
    primera = sem.apply(lambda s: s.first_valid_index())
    for k in mens:
        mens.loc[mens.index < primera[k], k] = np.nan
    wiki = pd.read_csv(os.path.join(DATOS, 'wiki_mensual.csv'), dtype={'mes': str})
    wiki['mes'] = pd.to_datetime(wiki['mes'], format='%Y%m') + pd.offsets.MonthEnd(0)
    wiki = wiki.set_index('mes')
    return dict(sem=sem, mens=mens, bench_sem=bench.reindex(sem.index), bench=bmens, wiki=wiki, eur=eur)


# ───────────────────────── señales ─────────────────────────
def atencion(D, fecha, retraso=1, corto=3, largo=12):
    """Atención de cada megatendencia: cuota de visitas de sus artículos sobre el total de Wikipedia en inglés,
    media de los últimos `corto` meses frente a los `largo` anteriores (log). Usa datos hasta fecha - retraso."""
    w = D['wiki']
    w = w[w.index <= fecha - pd.offsets.MonthEnd(retraso)]
    out = {}
    if len(w) < corto + largo:
        return pd.Series(dtype=float)
    for m, M in U['megatendencias'].items():
        cols = [a for a in M['wiki'] if a in w]
        cuota = w[cols].sum(axis=1) / w['__TOTAL__']
        ult = cuota.iloc[-corto:].mean()
        ant = cuota.iloc[-(corto + largo):-corto].mean()
        out[m] = np.log((ult + 1e-9) / (ant + 1e-9))
    return pd.Series(out)


def senales(D, fecha):
    """Tabla por nodo con las señales en la fecha (fin de mes)."""
    m = D['mens'][D['mens'].index <= fecha]
    b = D['bench'][D['bench'].index <= fecha]
    if len(m) < 14:
        return None
    def rel(a, z=0):
        # rentabilidad relativa (log) entre t-a y t-z meses
        x = np.log(m.iloc[-1 - z] / m.iloc[-1 - a]) - np.log(b.iloc[-1 - z] / b.iloc[-1 - a])
        return x
    S = pd.DataFrame(index=m.columns)
    S['r12_1'] = rel(12, 1)
    S['r12'] = rel(12)
    S['r6'] = rel(6)
    S['r3'] = rel(3)
    S['r1'] = rel(1)
    S['sma10'] = m.iloc[-1] / m.iloc[-10:].mean() - 1
    ret = np.log(m / m.shift())
    S['vol'] = ret.iloc[-12:].std() * np.sqrt(12)
    S['acel'] = S['r6'] - S['r12'] / 2
    # Máximo de 36 meses: distancia (para ver si el sector ya está muy estirado)
    S['dist_max36'] = m.iloc[-1] / m.iloc[-36:].max() - 1
    S = S[m.iloc[-13:].notna().all()]  # al menos 13 meses de historia
    return S


def contagio(D, fecha, lideres, sem_corta=26, sem_larga=78):
    """Contagio por datos: cuánto ha subido la correlación semanal (exceso sobre el índice) de cada nodo con la
    cesta de nodos líderes, últimas `sem_corta` semanas frente a las `sem_larga` anteriores."""
    s = D['sem'][D['sem'].index <= fecha]
    b = D['bench_sem'][D['bench_sem'].index <= fecha]
    r = np.log(s / s.shift()).sub(np.log(b / b.shift()), axis=0)
    r = r.iloc[-(sem_corta + sem_larga):]
    lid = r[lideres].mean(axis=1)
    out = {}
    for k in r:
        if k in lideres or r[k].iloc[:sem_larga].notna().sum() < sem_larga * 0.8:
            continue
        c1 = r[k].iloc[-sem_corta:].corr(lid.iloc[-sem_corta:])
        c0 = r[k].iloc[:sem_larga].corr(lid.iloc[:sem_larga])
        out[k] = c1 - c0
    return pd.Series(out)


def z(s):
    s = s.astype(float)
    sd = s.std()
    return (s - s.mean()) / sd if sd and sd > 0 else s * 0


def fuerza_megatendencias(D, fecha, S, peso_atencion=1.0):
    """Fuerza de cada megatendencia = atención (z) + momento de sus nodos directos (z de la media de r6)."""
    att = atencion(D, fecha)
    mom = {}
    for m, M in U['megatendencias'].items():
        d = [k for k in M['D'] if k in S.index]
        mom[m] = S.loc[d, 'r6'].mean() if d else np.nan
    mom = pd.Series(mom)
    F = pd.DataFrame({'atencion': att, 'momento_directos': mom})
    F['fuerza'] = peso_atencion * z(F['atencion'].fillna(0)) + z(F['momento_directos'].fillna(F['momento_directos'].mean()))
    return F.sort_values('fuerza', ascending=False)


# ───────────────────────── versiones ─────────────────────────
def elegir(D, fecha, version, K=5):
    """Devuelve (lista de nodos elegidos, tabla de puntuaciones, explicación por nodo)."""
    S = senales(D, fecha)
    if S is None or len(S) < 15:
        return [], None, {}
    v = VERSIONES[version]
    return v(D, fecha, S, K)


def _top(score, K, S=None, filtro=None):
    sc = score.dropna()
    if filtro is not None:
        sc = sc[filtro.reindex(sc.index).fillna(False)]
    return list(sc.sort_values(ascending=False).index[:K])


def v1(D, fecha, S, K):
    """Momento puro: los K sectores que más han batido al índice en 12 meses (sin el último)."""
    return _top(S['r12_1'], K), S, {}


def v2(D, fecha, S, K):
    """Momento reciente con tendencia: r6 relativa, solo sectores por encima de su media de 10 meses."""
    return _top(S['r6'], K, filtro=S['sma10'] > 0), S, {}


def v3(D, fecha, S, K):
    """Megatendencia por atención: las 3 megatendencias con más subida de atención; sus nodos DIRECTOS con tendencia."""
    F = fuerza_megatendencias(D, fecha, S, peso_atencion=1.0)
    top = F.sort_values('atencion', ascending=False).index[:3]
    cand = sorted({k for m in top for k in U['megatendencias'][m]['D'] if k in S.index})
    sc = S.loc[cand, 'r6']
    return _top(sc, K, filtro=S['sma10'] > 0), S, {k: 'directo' for k in cand}


def _indirectos(F, S, n_meg):
    cand = {}
    for m in F.index[:n_meg]:
        for k in U['megatendencias'][m]['I']:
            if k in S.index:
                cand.setdefault(k, []).append(m)
    return cand


def v4(D, fecha, S, K):
    """Indirectos de las megatendencias más fuertes (atención + momento de los directos), ordenados por su r6 con tendencia."""
    F = fuerza_megatendencias(D, fecha, S)
    cand = _indirectos(F, S, 3)
    sc = S.loc[list(cand), 'r6'] if cand else pd.Series(dtype=float)
    return _top(sc, K, filtro=S['sma10'] > 0), S, cand


def v5(D, fecha, S, K):
    """Indirectos REZAGADOS: de las megatendencias fuertes, los indirectos que aún no han corrido (r12 por debajo de la
    media de los directos) pero ya giran (r3 > 0 y por encima de su media de 10 meses)."""
    F = fuerza_megatendencias(D, fecha, S)
    cand = _indirectos(F, S, 3)
    ok = []
    for k, ms in cand.items():
        ref = np.nanmean([np.nan] + [S.loc[[d for d in U['megatendencias'][m]['D'] if d in S.index], 'r12'].mean() for m in ms])
        if S.loc[k, 'r12'] < ref and S.loc[k, 'r3'] > 0 and S.loc[k, 'sma10'] > 0:
            ok.append(k)
    sc = S.loc[ok, 'r3'] if ok else pd.Series(dtype=float)
    return _top(sc, K), S, cand


def v6(D, fecha, S, K):
    """Contagio por datos, sin mapa: líderes = 3 sectores con más r12_1; candidatos = los que más han subido su
    correlación con los líderes y ya giran (r3 > 0, por encima de la media de 10 meses)."""
    lid = list(S['r12_1'].sort_values(ascending=False).index[:3])
    c = contagio(D, fecha, lid)
    filtro = (S['r3'] > 0) & (S['sma10'] > 0)
    return _top(c, K, filtro=filtro), S, {k: 'contagio' for k in c.index}


def _puntos_mapa(F, S, n_meg=4):
    """Puntos de cada nodo por pertenecer a megatendencias fuertes: directo 1, indirecto 1 (se suma la fuerza)."""
    pts = pd.Series(0.0, index=S.index)
    por = {}
    for m in F.index[:n_meg]:
        f = max(F.loc[m, 'fuerza'], 0)
        for tipo in ('D', 'I'):
            for k in U['megatendencias'][m][tipo]:
                if k in pts.index:
                    pts[k] += f
                    por.setdefault(k, []).append(f'{m}:{tipo}')
    return pts, por


def fuerza_por_nodo(D, fecha, S, peso_atencion=1.0, solo_con_atencion=False):
    """Para cada nodo, la fuerza de la megatendencia más fuerte de la que es directo (fz_D) o indirecto (fz_I),
    y la lista de megatendencias que lo explican."""
    F = fuerza_megatendencias(D, fecha, S, peso_atencion)
    fzD = pd.Series(np.nan, index=S.index); fzI = pd.Series(np.nan, index=S.index)
    por = {}
    for m, M in U['megatendencias'].items():
        f = F.loc[m, 'fuerza']
        if solo_con_atencion and not (F.loc[m, 'atencion'] > 0):
            f = min(f, 0)
        for tipo, serie in (('D', fzD), ('I', fzI)):
            for k in M[tipo]:
                if k in serie.index:
                    serie[k] = np.nanmax([serie[k], f])
                    por.setdefault(k, []).append((m, tipo, float(f)))
    for k in por:
        por[k].sort(key=lambda x: -x[2])
    return fzD, fzI, por, F


def puntuar(D, fecha, S, pD=1.0, pI=1.0, pmom=1.0, solo_con_atencion=False, tendencia=True, max_por_meg=None,
            K=5, tope_sma=None, mom_def='mix'):
    fzD, fzI, por, F = fuerza_por_nodo(D, fecha, S, solo_con_atencion=solo_con_atencion)
    tema = pd.concat([pD * fzD, pI * fzI], axis=1).max(axis=1)
    tema = tema.fillna(tema.min())  # nodo sin megatendencia: la peor nota de tema
    mom = (z(S['r12_1']) + z(S['r6'])) / 2 if mom_def == 'mix' else z(S[mom_def])
    sc = pmom * z(mom) + z(tema)
    if tendencia:
        sc = sc.where(S['sma10'] > 0)
    if tope_sma is not None:
        sc = sc.where(S['sma10'] < tope_sma)
    cuenta, out = {}, []
    for k in sc.dropna().sort_values(ascending=False).index:
        megas = [x[0] for x in por.get(k, [])[:1]] or ['_sin']   # la megatendencia principal del nodo
        if max_por_meg and cuenta.get(megas[0], 0) >= max_por_meg:
            continue
        out.append(k)
        cuenta[megas[0]] = cuenta.get(megas[0], 0) + 1
        if len(out) == K:
            break
    T = S.assign(fz_D=fzD, fz_I=fzI, tema=tema, momento=mom, score=sc)
    return out, T, por


def v7(D, fecha, S, K):
    """Momento + fuerza de la megatendencia: z(momento 12-1 y 6 m) + z(fuerza de la megatendencia más fuerte del
    sector, como directo o indirecto), con tendencia. Se descarta el contagio por datos (v6: correlación negativa)."""
    return puntuar(D, fecha, S, K=K)


def v8(D, fecha, S, K):
    """v7, pero la megatendencia solo cuenta si se habla cada vez más de ella (atención en Wikipedia al alza)."""
    return puntuar(D, fecha, S, solo_con_atencion=True, K=K)


def v9(D, fecha, S, K):
    """v8 dando prioridad a la exposición INDIRECTA (los directos cuentan la mitad) y como mucho 2 sectores por
    megatendencia, para no comprar cinco veces la misma idea."""
    return puntuar(D, fecha, S, pD=0.5, pI=1.0, solo_con_atencion=True, max_por_meg=2, K=K)


def v10(D, fecha, S, K):
    """VERSIÓN FINAL. Optimización de v9 con una rejilla de 48 combinaciones en la muestra de diseño (peso del
    momento 1/2/3, momento 12-1 o mezcla 12-1 y 6 m, peso de los directos 0,5/1, atención obligatoria sí/no, límite
    por megatendencia sí/no). Zona estable elegida: momento (mezcla de 12-1 y 6 m) y tema con el mismo peso, directos
    e indirectos igual, sin exigir atención al alza (restaba) y como mucho 2 sectores por megatendencia (sumaba en
    todas las combinaciones)."""
    return puntuar(D, fecha, S, pD=1.0, pI=1.0, pmom=1.0, solo_con_atencion=False, max_por_meg=2, K=K)


VERSIONES = {f'v{i}': f for i, f in enumerate([v1, v2, v3, v4, v5, v6, v7, v8, v9, v10], start=1)}

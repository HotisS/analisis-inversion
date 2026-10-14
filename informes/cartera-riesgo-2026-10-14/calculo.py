# Riesgo y Sharpe de la cartera actual y la propuesta (14-oct-2026).
# Entrada: precios/*.json (bajar_precios.py). Salida: resultados.json y texto por pantalla.
import json, os, numpy as np, pandas as pd
D = os.path.dirname(os.path.abspath(__file__))
RF = 0.024          # tipo sin riesgo hacia delante (facilidad de depósito BCE ≈ 2,4 %)
RF_HIST3 = 0.028    # media aproximada del €STR oct-2023 a oct-2026 (≈3,9 % en 2023-24 bajando a ≈2 %)

# valor, ticker, divisa, sector, actual títulos, actual EUR, nuevo títulos, nuevo EUR, ponderada, base
P = [
 ("Oro (IGLN)","IGLN.L","USD","Oro",68,4856,68,4856,0.0,0.0),
 ("Edenred","EDEN.PA","EUR","Financiero y pagos",136,3971,136,3971,5.8,10.7),
 ("Daiichi Sankyo","4568.T","JPY","Salud",100,1470,100,1470,31.6,22.7),
 ("Uber","UBER","USD","Internet y comunicación",28,1785,28,1785,11.5,19.4),
 ("Viscofan","VIS.MC","EUR","Consumo y lujo",32,1699,32,1699,16.5,14.2),
 ("Alphabet","GOOGL","USD","Internet y comunicación",5,1581,5,1581,1.1,5.8),
 ("Netflix","NFLX","USD","Internet y comunicación",23,1448,23,1448,18.2,15.7),
 ("SAP","SAP.DE","EUR","Software",7,1381,7,1381,15.5,13.4),
 ("Intuit","INTU","USD","Software",5,1347,5,1347,15.1,17.3),
 ("Nemetschek","NEM.DE","EUR","Software",0,0,29,2069,15.4,14.8),
 ("LVMH","MC.PA","EUR","Consumo y lujo",0,0,5,1920,16.8,13.1),
 ("Bureau Veritas","BVI.PA","EUR","Servicios a empresas y datos",0,0,76,1987,19.7,15.2),
 ("Zoetis","ZTS","USD","Salud",20,1342,0,0,0.5,1.4),
 ("Puig","PUIG.MC","EUR","Consumo y lujo",70,1296,0,0,7.1,6.9),
 ("Hermès","RMS.PA","EUR","Consumo y lujo",1,1285,0,0,13.0,9.2),
 ("ICE","ICE","USD","Financiero y pagos",6,839,0,0,8.7,5.8),
 ("Equifax","EFX","USD","Servicios a empresas y datos",6,793,0,0,15.6,10.9),
 ("IBKR","IBKR","USD","Financiero y pagos",1.8,141,0,0,0.0,0.0),
 # growth, primer tramo (precio 13-oct, EURUSD 1,116)
 ("Nu (growth, tramo 1)","NU","USD","Financiero y pagos",0,0,43,600,27.4,21.8),
 ("argenx (growth, tramo 1)","ARGX","USD","Salud",0,0,1,719,45.7,40.8),
 ("Axon (growth, tramo 1)","AXON","USD","Servicios a empresas y datos",0,0,2,741,34.2,28.3),
 ("Shopify (growth, tramo 1)","SHOP","USD","Software",0,0,4,633,14.9,18.1),
]
CASH_ACT = 4583
CASH_NEW = 29817 - sum(p[7] for p in P)   # liquidez de la propuesta value (≈4.300) menos los primeros tramos growth
FX = {"USD": "EURUSD_X", "JPY": "EURJPY_X", "GBP": "EURGBP_X"}

def load(t):
    j = json.load(open(os.path.join(D, "precios", t.replace("=", "_") + ".json")))
    s = pd.Series({(pd.Timestamp(r["t"] + 12 * 3600, unit="s")).normalize(): r["adj"] for r in j["rows"]})
    s.index = s.index.to_period("W").to_timestamp()      # alinear por semana (+12 h: Europa y Japón fechan el domingo en UTC)
    return s[~s.index.duplicated(keep="last")], j["currency"]

fx = {k: load(v)[0] for k, v in FX.items()}
px = {}
for p in P:
    s, cur = load(p[1])
    if cur != "EUR":
        s = s / fx[cur].reindex(s.index).ffill()        # a EUR (precio en divisa / EURxxx)
    px[p[0]] = s
px = pd.DataFrame(px).sort_index()
px = px.iloc[:-1]                                         # quitar la semana en curso (incompleta)
ret = px.pct_change(fill_method=None)

def weights(col_t, col_e, cash):
    w = pd.Series({p[0]: p[col_e] for p in P}, dtype=float)
    tot = w.sum() + cash
    return w / tot, cash / tot, tot

def stats(w, wc, years):
    r = ret.iloc[-52 * years:]
    cov = r.cov() * 52                                     # covarianza anual, pares con datos comunes
    ww = w[w > 0]
    vol = float(np.sqrt(ww @ cov.loc[ww.index, ww.index] @ ww))
    # serie histórica con pesos fijos (rebalanceo semanal); si un valor no cotizaba, su peso va al resto de acciones
    avail = r[ww.index].notna()
    wmat = avail.mul(ww, axis=1)
    wmat = wmat.div(wmat.sum(axis=1), axis=0).mul(ww.sum())
    port = (r[ww.index].fillna(0) * wmat).sum(axis=1)       # liquidez al 0 %
    eq = (1 + port).cumprod()
    dd = float((eq / eq.cummax() - 1).min())
    ann = float(eq.iloc[-1] ** (52 / len(eq)) - 1)
    hvol = float(port.std() * np.sqrt(52))
    return dict(vol=vol, mdd=dd, ret_hist=ann, vol_hist=hvol, n=len(r))

res = {}
for name, ct, ce, cash in [("actual", 4, 5, CASH_ACT), ("propuesta", 6, 7, CASH_NEW)]:
    w, wc, tot = weights(ct, ce, cash)
    e_pond = float((w * pd.Series({p[0]: p[8] for p in P})).sum()) / 100
    e_base = float((w * pd.Series({p[0]: p[9] for p in P})).sum()) / 100
    s3, s5 = stats(w, wc, 3), stats(w, wc, 5)
    eq_w = w.drop("Oro (IGLN)"); eqs = eq_w.sum()
    out = dict(total=tot, cash=cash, w_cash=wc, e_pond=e_pond, e_base=e_base, e_real=e_pond / 2,
               e_pond_acciones=float((eq_w * pd.Series({p[0]: p[8] for p in P})).sum()) / eqs / 100,
               s3=s3, s5=s5)
    for lab, e in [("opt", e_pond), ("real", e_pond / 2)]:
        out["sharpe_" + lab + "_v3"] = (e - RF) / s3["vol"]
        out["sharpe_" + lab + "_v5"] = (e - RF) / s5["vol"]
    out["sharpe_hist3"] = (s3["ret_hist"] - RF_HIST3) / s3["vol_hist"]
    out["sharpe_hist5"] = (s5["ret_hist"] - 0.017) / s5["vol_hist"]   # €STR medio oct-21/oct-26 ≈ 1,7 %
    cur = {}; sec = {}
    for p in P:
        kc = "Oro (cotiza en USD)" if p[3] == "Oro" else p[2]
        cur[kc] = cur.get(kc, 0) + p[ce]; sec[p[3]] = sec.get(p[3], 0) + p[ce]
    cur["EUR (liquidez)"] = cash; sec["Liquidez"] = cash
    out["divisa"] = {k: v / tot for k, v in cur.items()}; out["sector"] = {k: v / tot for k, v in sec.items()}
    res[name] = out

# volatilidad y correlación de cada valor (3 años)
r3 = ret.iloc[-156:]
res["vol_valor_3a"] = {k: float(v) for k, v in (r3.std() * np.sqrt(52)).items()}
res["vol_valor_5a"] = {k: float(v) for k, v in (ret.iloc[-260:].std() * np.sqrt(52)).items()}
c = r3.corr()
res["corr_media_3a"] = {k: float((c[k].drop(k)).mean()) for k in c}
res["corr_oro_acciones_3a"] = float(c["Oro (IGLN)"].drop("Oro (IGLN)").mean())
res["semanas"] = [str(px.index[0].date()), str(px.index[-1].date()), len(px)]
json.dump(res, open(os.path.join(D, "resultados.json"), "w"), ensure_ascii=False, indent=1)
print(json.dumps({k: v for k, v in res.items() if k in ("actual", "propuesta", "semanas", "corr_oro_acciones_3a")}, ensure_ascii=False, indent=1))

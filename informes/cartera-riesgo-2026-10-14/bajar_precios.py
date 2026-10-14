# Baja precios semanales (5 años, cierre ajustado por dividendos y splits) de Yahoo Finance
import json, sys, time, urllib.request, os
T = ["IGLN.L","EDEN.PA","4568.T","UBER","VIS.MC","GOOGL","NFLX","SAP.DE","INTU","ZTS","PUIG.MC","RMS.PA",
     "ICE","EFX","IBKR","NEM.DE","MC.PA","BVI.PA","NU","ARGX","AXON","SHOP","EURUSD=X","EURJPY=X","EURGBP=X"]
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "precios")
os.makedirs(out, exist_ok=True)
for t in T:
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{t}?range=5y&interval=1wk&events=div%2Csplit"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    d = json.load(urllib.request.urlopen(req))["chart"]["result"][0]
    ts = d["timestamp"]; q = d["indicators"]
    adj = q.get("adjclose", [{}])[0].get("adjclose") or q["quote"][0]["close"]
    cl = q["quote"][0]["close"]
    rows = [{"t": a, "adj": b, "close": c} for a, b, c in zip(ts, adj, cl) if b is not None]
    json.dump({"ticker": t, "currency": d["meta"]["currency"], "price": d["meta"]["regularMarketPrice"], "rows": rows},
              open(os.path.join(out, t.replace("=", "_") + ".json"), "w"))
    print(t, d["meta"]["currency"], d["meta"]["regularMarketPrice"], len(rows))
    time.sleep(0.3)

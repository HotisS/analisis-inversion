# Genera las tablas del informe desde calculo.py y resultados.json
import json
exec(open("calculo.py").read().split("CASH_ACT")[0])
r = json.load(open("resultados.json"))
f = lambda x: f"{x:,.0f}".replace(",", ".")
g = lambda x, d=1: (f"{x:+.{d}f}" if x else f"{0:.{d}f}").replace(".", ",")
TA, TN = r["actual"]["total"], r["propuesta"]["total"]
print("| Valor | Actual títulos | Actual EUR | Nuevo títulos | Nuevo EUR | Rent. esperada 12 m: ponderada (base) | Contribución pp (actual → nuevo) |")
print("|---|---|---|---|---|---|---|")
for p in P:
    t = lambda x: (f"{x:g}".replace(".", ",") if x else "0")
    print(f"| {p[0]} | {t(p[4])} | {f(p[5])} | {t(p[6])} | {f(p[7])} | {g(p[8])} % ({g(p[9])} %) | {g(p[5]/TA*p[8],2)} → {g(p[7]/TN*p[8],2)} |")
print(f"| Liquidez | | {f(r['actual']['cash'])} | | {f(r['propuesta']['cash'])} | 0 % | 0,00 → 0,00 |")
print(f"| **Total** | | **{f(TA)}** | | **{f(TN)}** | | |")
a, n = r["actual"], r["propuesta"]
print(f"| **Rentabilidad esperada total** | | | | | **{g(a['e_pond']*100)} % → {g(n['e_pond']*100)} %** (base {g(a['e_base']*100)} % → {g(n['e_base']*100)} %) | **{g(a['e_pond']*100,2)} → {g(n['e_pond']*100,2)}** |")
print()
for k in ("divisa", "sector"):
    keys = sorted(set(a[k]) | set(n[k]), key=lambda x: -n[k].get(x, 0))
    print(f"| {k.capitalize()} | Actual | Propuesta |\n|---|---|---|")
    for x in keys: print(f"| {x} | {g(a[k].get(x,0)*100).lstrip('+')} % | {g(n[k].get(x,0)*100).lstrip('+')} % |")
    print()

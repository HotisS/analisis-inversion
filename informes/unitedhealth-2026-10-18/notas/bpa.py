import sys
# Supuestos del DCF base (propio.mjs) y desplazamientos de los escenarios
anios = [('2026e', 0.2, 6.85, 0.95, 19.5, True), ('2027e', 3.4, 7.3, 1.0, 21.0, False), ('2028e', 5.5, 7.6, 1.0, 21.0, False)]
interes = {'2026e': 3850, '2027e': 3800, '2028e': 3750}
minor = {'2026e': 770, '2027e': 790, '2028e': 810}
acc = {'2026e': 905, '2027e': 902, '2028e': 902}
esc = {'Bajista': (-1.5, -1.5), 'Base': (0, 0), 'Alcista': (1.0, 1.0)}
# cuadre con 2025: EBIT ajustado 21.716 (18.964 + 2.752), intereses 4.002, 21 %, minoritarios 751, 911 M acciones
print('cuadre 2025', round(((18964 + 2752 - 4002) * 0.79 - 751) / 911, 2), 'publicado 13,23; ajustado 16,35')
out = {}
for e, (dg, dm) in esc.items():
    v = 447567
    for p, g, m, am, t, fijo in anios:
        g2 = g + (0 if fijo else dg); m2 = m + (0 if fijo else dm)
        v = v * (1 + g2 / 100)
        ebitda = v * m2 / 100; ebit = ebitda - v * am / 100
        bn = (ebit - interes[p]) * (1 - t / 100) - minor[p]
        bpa = bn / acc[p]
        out[(e, p)] = (round(v), round(ebit), round(bn), round(bpa, 2))
for k, x in out.items(): print(k, x)

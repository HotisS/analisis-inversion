"""Backtest de las 10 versiones del screening de megatendencias.

Protocolo (fijado antes de mirar resultados):
- Cada fin de mes desde dic-2016 se eligen K=5 sectores con lo que se sabía ese día (precios hasta el cierre del mes,
  Wikipedia hasta el mes anterior).
- Se mide la rentabilidad en euros de cada sector a 6 y 12 meses frente al MSCI World en euros (IWDA).
- MUESTRA DE DISEÑO (para iterar): elecciones de dic-2016 a dic-2021. VALIDACIÓN (no se toca al iterar): elecciones
  de ene-2022 en adelante (12 meses medidos hasta sep-2026; 6 meses hasta mar-2026).
- Cartera de prueba: cada trimestre se compran los 5 sectores a partes iguales y se mantienen 3 meses; se encadena.
- Comparaciones: índice mundial y la media de todos los sectores del universo (para separar el acierto del screening
  de que los sectores temáticos, en conjunto, lo hagan mejor o peor que el índice).

Uso: python3 megatendencias/backtest.py [v1 v2 ...]   → escribe megatendencias/resultados/backtest.json y .md
"""
import json, os, sys
import numpy as np
import pandas as pd
import motor

INICIO = pd.Timestamp('2016-12-31')
CORTE = pd.Timestamp('2021-12-31')
K = 5


def adelante(D, f, meses):
    m, b = D['mens'], D['bench']
    i = m.index.get_loc(f)
    if i + meses >= len(m.index):
        return None, None
    g = m.index[i + meses]
    rn = m.loc[g] / m.loc[f] - 1
    rb = b.loc[g] / b.loc[f] - 1
    return rn, rb


def evaluar(D, version, fechas):
    filas = []
    for f in fechas:
        elegidos, _, _ = motor.elegir(D, f, version, K)
        r6, b6 = adelante(D, f, 6)
        r12, b12 = adelante(D, f, 12)
        disponibles = D['mens'].loc[f].dropna().index
        fila = {'fecha': f.strftime('%Y-%m'), 'elegidos': elegidos}
        for h, r, b in ((6, r6, b6), (12, r12, b12)):
            if r is None or not elegidos:
                continue
            sel = r[elegidos].dropna()
            fila[f'exc{h}'] = float(sel.mean() - b)           # cartera igualada de los 5 frente al índice
            fila[f'acierto{h}'] = float((sel > b).mean())     # % de sectores que baten al índice
            fila[f'univ{h}'] = float(r[disponibles].mean() - b)  # media del universo frente al índice
        filas.append(fila)
    return filas


def cartera_trimestral(D, version, desde, hasta):
    m, b = D['mens'], D['bench']
    fechas = [f for f in m.index if desde <= f <= hasta and f.month in (3, 6, 9, 12)]
    v_c, v_b, v_u = [1.0], [1.0], [1.0]
    for i, f in enumerate(fechas[:-1]):
        g = fechas[i + 1]
        el, _, _ = motor.elegir(D, f, version, K)
        disp = m.loc[f].dropna().index
        r = m.loc[g] / m.loc[f] - 1
        rc = r[el].dropna().mean() if el else 0.0
        v_c.append(v_c[-1] * (1 + rc))
        v_b.append(v_b[-1] * (b.loc[g] / b.loc[f]))
        v_u.append(v_u[-1] * (1 + r[disp].mean()))
    anos = (fechas[-1] - fechas[0]).days / 365.25
    tae = lambda v: v[-1] ** (1 / anos) - 1
    serie = pd.Series(v_c, index=fechas)
    caida = float((serie / serie.cummax() - 1).min())
    return {'desde': fechas[0].strftime('%Y-%m'), 'hasta': fechas[-1].strftime('%Y-%m'),
            'tae_screening': tae(v_c), 'tae_indice': tae(v_b), 'tae_universo': tae(v_u), 'peor_caida': caida}


def resumen(filas, h):
    x = [f for f in filas if f'exc{h}' in f]
    if not x:
        return {}
    e = np.array([f[f'exc{h}'] for f in x])
    u = np.array([f[f'univ{h}'] for f in x])
    return {'n': len(x), 'exceso_medio': float(e.mean()), 'exceso_mediano': float(np.median(e)),
            'pct_fechas_bate': float((e > 0).mean()), 'acierto_sectores': float(np.mean([f[f'acierto{h}'] for f in x])),
            'exceso_sobre_universo': float((e - u).mean()), 'pct_fechas_bate_universo': float((e > u).mean())}


def main(versiones):
    D = motor.cargar()
    fechas = [f for f in D['mens'].index if f >= INICIO]
    salida = {}
    for v in versiones:
        filas = evaluar(D, v, fechas)
        dis = [f for f in filas if pd.Timestamp(f['fecha']) + pd.offsets.MonthEnd(0) <= CORTE]
        val = [f for f in filas if pd.Timestamp(f['fecha']) + pd.offsets.MonthEnd(0) > CORTE]
        por_ano = {}
        for f in filas:
            a = f['fecha'][:4]
            if 'exc12' in f:
                por_ano.setdefault(a, []).append(f['exc12'])
        salida[v] = {
            'doc': motor.VERSIONES[v].__doc__.strip(),
            'diseno': {'12m': resumen(dis, 12), '6m': resumen(dis, 6)},
            'validacion': {'12m': resumen(val, 12), '6m': resumen(val, 6)},
            'cartera_diseno': cartera_trimestral(D, v, INICIO, CORTE),
            'cartera_validacion': cartera_trimestral(D, v, CORTE, D['mens'].index[-1]),
            'cartera_todo': cartera_trimestral(D, v, INICIO, D['mens'].index[-1]),
            'exceso12_por_ano': {a: float(np.mean(x)) for a, x in por_ano.items()},
            'elecciones_enero': {f['fecha']: f['elegidos'] for f in filas if f['fecha'].endswith('-01') or f['fecha'].endswith('-07')},
        }
        d, va = salida[v]['diseno']['12m'], salida[v]['validacion']['12m']
        cd, cv = salida[v]['cartera_diseno'], salida[v]['cartera_validacion']
        if '--validar' not in sys.argv:
            print(f"{v}: DISEÑO 12m exc {d['exceso_medio']:+.1%} bate {d['pct_fechas_bate']:.0%} vs-univ {d['exceso_sobre_universo']:+.1%} acierto {d['acierto_sectores']:.0%} | 6m exc {salida[v]['diseno']['6m']['exceso_medio']:+.1%} | cartera {cd['tae_screening']:+.1%} idx {cd['tae_indice']:+.1%} univ {cd['tae_universo']:+.1%} caída {cd['peor_caida']:.0%}")
            continue
        print(f"{v}: DISEÑO 12m exc {d['exceso_medio']:+.1%} bate {d['pct_fechas_bate']:.0%} vs-univ {d['exceso_sobre_universo']:+.1%} | "
              f"cartera {cd['tae_screening']:+.1%} idx {cd['tae_indice']:+.1%} univ {cd['tae_universo']:+.1%} || "
              f"VALID 12m exc {va.get('exceso_medio', float('nan')):+.1%} bate {va.get('pct_fechas_bate', float('nan')):.0%} | "
              f"cartera {cv['tae_screening']:+.1%} idx {cv['tae_indice']:+.1%} univ {cv['tae_universo']:+.1%}")
    os.makedirs(os.path.join(motor.AQUI, 'resultados'), exist_ok=True)
    ruta = os.path.join(motor.AQUI, 'resultados', 'backtest.json')
    previo = json.load(open(ruta)) if os.path.exists(ruta) else {}
    previo.update(salida)
    json.dump(previo, open(ruta, 'w'), indent=1, ensure_ascii=False, default=float)


if __name__ == '__main__':
    main([a for a in sys.argv[1:] if not a.startswith('--')] or list(motor.VERSIONES))

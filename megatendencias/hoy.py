"""Aplica la versión final (v10) a hoy: fuerza de cada megatendencia, los 5 sectores elegidos, 3 reservas, la
comparación con el momento puro (v1) y el radar de indirectos que aún no se mueven.
Escribe megatendencias/resultados/hoy.json. Uso: python3 megatendencias/hoy.py"""
import json, os
import numpy as np
import motor
from motor import U


def main():
    D = motor.cargar()
    f = D['mens'].index[-1]
    S = motor.senales(D, f)
    elegidos, T, por = motor.elegir(D, f, 'v10', K=8)
    F = motor.fuerza_megatendencias(D, f, S)
    v1 = motor.elegir(D, f, 'v1', K=5)[0]
    def fila(k):
        return {'clave': k, 'nombre': U['nodos'][k]['nombre'], 'etf_o_cesta': U['nodos'][k]['tickers'],
                'puntuacion': round(float(T.loc[k, 'score']), 2) if not np.isnan(T.loc[k, 'score']) else None,
                'rel_12m': round(float(S.loc[k, 'r12']), 3), 'rel_6m': round(float(S.loc[k, 'r6']), 3),
                'rel_3m': round(float(S.loc[k, 'r3']), 3), 'sobre_media_10m': round(float(S.loc[k, 'sma10']), 3),
                'megatendencias': [{'clave': m, 'nombre': U['megatendencias'][m]['nombre'], 'tipo': 'directo' if t == 'D' else 'indirecto',
                                    'fuerza': round(x, 2)} for m, t, x in por.get(k, [])],
                'tambien_en_momento_puro': k in v1}
    # Radar: indirectos de las 4 megatendencias más fuertes que aún no tienen tendencia (no se compran: v5 lo probó)
    radar = []
    for m in F.index[:4]:
        for k in U['megatendencias'][m]['I']:
            if k in S.index and k not in elegidos and S.loc[k, 'r6'] <= 0:
                radar.append({**fila(k), 'por': U['megatendencias'][m]['nombre']})
    out = {
        'fecha_datos': str(D['sem'].index[-1].date()),
        'megatendencias': [{'clave': m, 'nombre': U['megatendencias'][m]['nombre'], 'atencion': round(float(F.loc[m, 'atencion']), 3),
                            'momento_directos_6m': round(float(F.loc[m, 'momento_directos']), 3), 'fuerza': round(float(F.loc[m, 'fuerza']), 2)}
                           for m in F.index],
        'elegidos': [fila(k) for k in elegidos[:5]],
        'reservas': [fila(k) for k in elegidos[5:8]],
        'momento_puro_v1': v1,
        'radar_indirectos_sin_tendencia': radar,
    }
    os.makedirs(os.path.join(motor.AQUI, 'resultados'), exist_ok=True)
    json.dump(out, open(os.path.join(motor.AQUI, 'resultados', 'hoy.json'), 'w'), indent=1, ensure_ascii=False)
    print(json.dumps(out, indent=1, ensure_ascii=False))


if __name__ == '__main__':
    main()

"""Episodios: cuándo detectó la versión final (v10) cada megatendencia conocida de los últimos 10 años y qué
rentabilidad tuvo después el sector frente al índice mundial en euros. Solo usa las elecciones mensuales del
backtest (con datos de cada fecha). Escribe resultados/episodios.json."""
import json, os
import pandas as pd
import motor

EPISODIOS = [
    ('IA (ChatGPT, nov-2022)', '2022-11-30', ['semis', 'equipos_chips', 'software', 'nube']),
    ('IA → electricidad (indirecto)', '2022-11-30', ['equipo_electrico', 'red_electrica', 'electricas_us', 'nuclear', 'uranio', 'centros_datos', 'cobre']),
    ('Guerra de Ucrania (feb-2022) → defensa', '2022-02-28', ['defensa_eu', 'defensa_us']),
    ('Guerra de Ucrania → energía (indirecto)', '2022-02-28', ['gas', 'petroleo', 'servicios_petro']),
    ('Covid (feb-2020) → salud y digital', '2020-02-29', ['bioproduccion', 'biotech', 'internet', 'videojuegos', 'nube']),
    ('GLP-1 / obesidad (2021-2023)', '2021-06-30', ['obesidad']),
    ('Inflación y subida de tipos (2021-2022)', '2021-06-30', ['bancos_eu', 'bancos_us', 'seguros', 'petroleo', 'mineria']),
    ('Transición energética (2020)', '2020-01-31', ['solar', 'renovables', 'litio']),
    ('Oro y metales (2025)', '2024-12-31', ['mineras_oro', 'oro', 'cobre', 'tierras_raras']),
]


def main():
    D = motor.cargar()
    fechas = [f for f in D['mens'].index if f >= pd.Timestamp('2016-12-31')]
    elec = {}
    for f in fechas:
        elec[f] = motor.elegir(D, f, 'v10', 5)[0]
    m, b = D['mens'], D['bench']
    out = []
    for nombre, desde, nodos in EPISODIOS:
        d = pd.Timestamp(desde)
        for k in nodos:
            primera = next((f for f in fechas if f >= d and k in elec[f]), None)
            fila = {'episodio': nombre, 'sector': U_nombre(k), 'clave': k, 'desde': d.strftime('%Y-%m')}
            if primera is not None:
                fila['detectado'] = primera.strftime('%Y-%m')
                fila['meses_tarde'] = (primera.year - d.year) * 12 + primera.month - d.month
                i = m.index.get_loc(primera)
                for h in (6, 12):
                    if i + h < len(m.index):
                        g = m.index[i + h]
                        fila[f'exceso{h}'] = float(m.loc[g, k] / m.loc[primera, k] - b.loc[g] / b.loc[primera])
                # Meses que estuvo elegido en los 24 siguientes al inicio
            fila['meses_elegido_24'] = sum(1 for f in fechas if d <= f < d + pd.DateOffset(months=24) and k in elec[f])
            out.append(fila)
    json.dump({'elecciones': {f.strftime('%Y-%m'): e for f, e in elec.items()}, 'episodios': out},
              open(os.path.join(motor.AQUI, 'resultados', 'episodios.json'), 'w'), indent=1, ensure_ascii=False)
    for f in out:
        print(f)


def U_nombre(k):
    return motor.U['nodos'][k]['nombre']


if __name__ == '__main__':
    main()

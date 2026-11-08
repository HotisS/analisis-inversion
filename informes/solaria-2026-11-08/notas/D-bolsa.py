import json
p = '/home/user/analisis-inversion/informes/solaria-2026-11-08/notas/D.json'
b = json.load(open('/home/user/analisis-inversion/informes/solaria-2026-11-08/notas/bolsa.json'))
d = json.load(open(p))
d['_estado'] = 'identificacion, consenso, bolsa y multiplos_historicos hechos; siguen puente/WACC, comparables, transacciones'
bol = b['bolsa']
d['bolsa'] = {
    "tipo_rentabilidad": "total (con dividendos)",
    "rentabilidades": bol['rentabilidades'],
    "anual": [a for a in bol['anual'] if int(a['anio']) >= 2016],
    "beta": 1.0,
    "volatilidad_pct": bol['volatilidad_pct'],
    "max_drawdown_pct": bol['max_drawdown_pct'],
    "posicion_corta_pct": 7.49,
    "comentario": "Índice: ETF Accion IBEX 35 (BBVAI.MC, con dividendos); sector: iShares Global Clean Energy en EUR (IQQH.DE) [1]. Solaria es una acción de momentos: +248 % en 2020, −58 % en 2024, +132 % en 2025 y −11 % en 2026 hasta el 6-nov, frente a un IBEX que sube un 14,9 % [1]. En cinco años no ha ganado nada (+0,6 % anual frente al +20,2 % del IBEX) y sufrió una caída máxima del 74,6 % entre ago-2022 y abr-2025 [1]. En 2026 marcó máximo de 25,85 EUR el 24-abr, justo antes de la colocación a 24 EUR, y desde entonces cae un 37 %: dilución, subida de la rentabilidad de la deuda (es una empresa con 3,9x de deuda neta/EBITDA y capex alto) [5, 17], recorte del objetivo de capacidad de 4,3 a 3,6 GW [13] y un 7,5 % del capital en cortos declarados [6]. La beta mensual de 5 años es 1,00, pero la semanal de 2 años es 0,36: se mueve por sus propios hechos y por los cortos, no con el índice [1].",
    "contexto": {
        "movimiento": {
            "fecha": "2026-11-06", "var_1m_pct": 2.3, "var_3m_pct": -0.1, "var_6m_pct": -33.1, "var_12m_pct": 7.1,
            "dist_max_52s_pct": -37.3, "dist_min_52s_pct": 17.7, "dist_max_historico_pct": -37.3,
            "tendencia": "bajista", "volatilidad_60d_pct": 52.3,
            "avisos": ["P5 Un 18 % por debajo de la media de 200 sesiones (tendencia bajista)."]
        },
        "movimientos_fuertes": [
            {"periodo": "3-mar-2026", "var_pct": -11.0, "causa": "Mayor caída diaria del año (de 21,2 a 18,9 EUR) [1]; no se encontró noticia de la empresa ese día en la CNMV ni en prensa (búsquedas en XTB, MarketScreener y CNMV). Al día siguiente recuperó un 4,9 % y el 10-mar otro 4,8 % [1].", "veredicto": "no cambia", "condicion": None},
            {"periodo": "abr-2026", "var_pct": -4.2, "causa": "Colocación acelerada: 7,69 M de acciones nuevas (6,15 % del capital) y acciones propias a 24 EUR, ≈ 5 % de descuento, unos 300-310 M EUR para baterías, hibridación y data centers; la acción cayó un 5 % [8, 9]. Hecho cerrado: dilución ya en el número de acciones.", "veredicto": "no cambia", "condicion": None},
            {"periodo": "26-may a 28-jul-2026", "var_pct": -20.5, "causa": "Caída de un mes hasta el 28-jul (de 24,47 EUR el 26-may a 17,06), con −7,2 % el 30-jun y −4,8 % el 28-jul [1, 15]. No hubo noticia negativa de la empresa (junta el 30-jun, ayudas IDAE de 41 M EUR y DIA de La Spina en Italia el 28-jul) [7]. Causas sectoriales y de posición: subida de la rentabilidad de la deuda, miedo a precios de captura solares bajos en verano y aumento de cortos hasta más del 5 % del capital [15, 16]; tras los resultados de Acciona Energía (precio medio −13,7 %) el sector cayó otro 5 % el 3-ago [16].", "veredicto": "no cambia", "condicion": None},
            {"periodo": "ago-sep-2026", "var_pct": 13.0, "causa": "Rebote de un mes hasta el 11-sep desde los mínimos de agosto (≈ 15,8 EUR): declaración de impacto ambiental favorable para 175 MW eólicos en Garoña (Maira Delta y Gamma), ligados al PPA con Repsol, y cierre de cortos; Morgan Stanley había bajado el objetivo de 21 a 19 EUR [15].", "veredicto": "no cambia", "condicion": None},
            {"periodo": "14-sep-2026", "var_pct": -8.4, "causa": "Caída diaria sin noticia de la empresa identificada; XTB atribuye las caídas de septiembre a la subida de la rentabilidad de la deuda (vencimientos de más de 150 M EUR y coste medio de la deuda > 4 %) y a los cortos [17].", "veredicto": "no cambia", "condicion": None},
            {"periodo": "23-25-sep-2026", "var_pct": -12.0, "causa": "−5,9 % y −6,5 % los dos días previos a los resultados del 1S26 por posicionamiento de cortos (sin cambios de recomendación) [18] y +8,6 % (+9,5 % intradía) el 25-sep tras resultados por encima de lo esperado (EBITDA +50 %), pese al recorte del objetivo de capacidad 2026 de 4,3 a 3,6 GW [13, 5].", "veredicto": "no cambia", "condicion": None},
            {"periodo": "oct-2026", "var_pct": -5.3, "causa": "Mínimo de 52 semanas el 22-oct (13,61 EUR intradía) tras la convocatoria de elecciones generales anticipadas para el 29-nov, que deja en el aire el decreto sobre centros de datos en el que Solaria estaba expuesta [19]; el 27-oct rebotó un 9,6 % sin noticia identificada [1].", "veredicto": "retrasa", "condicion": "Hasta las elecciones del 29-nov-2026 y lo que se sepa del decreto de centros de datos."}
        ],
        "noticias": [
            {"fecha": "2026-04-15", "tipo": "rumor", "hecho": "Bloomberg: Solaria negocia entrar en un consorcio de Telefónica y ACS para centros de datos de unos 4.000 M EUR en España; la acción subió un 4 %. Sin confirmar [20].", "veredicto": "no cambia", "condicion": None},
            {"fecha": "2026-04-28", "tipo": "ampliación o convertible", "hecho": "Colocación acelerada de 7,69 M de acciones nuevas y acciones propias a 24 EUR (184 M EUR de ampliación) [5, 8, 9]. No hay otra ampliación ni convertible anunciados; con deuda neta/EBITDA de 3,9x tras la colocación, el riesgo de otra a corto plazo es bajo, pero el plan de data centers y baterías exige capital [5].", "veredicto": "no cambia", "condicion": None},
            {"fecha": "2026-08-17", "tipo": "recomendación", "hecho": "Morgan Stanley recorta el precio objetivo de 21 a 19 EUR [15]. Morgan Stanley declara además un 7,6 % en instrumentos financieros (no acciones) [13].", "veredicto": "no cambia", "condicion": None},
            {"fecha": "2026-09-24", "tipo": "resultados", "hecho": "1S26: ingresos totales 223,3 M EUR (+44 %), EBITDA 210,1 M EUR (+50 %), beneficio 124,9 M EUR (+52 %); deuda neta 1.329 M EUR (3,9x); capacidad 2026 rebajada a 3,6 GW [5, 13].", "veredicto": "no cambia", "condicion": None},
            {"fecha": "2026-10-05", "tipo": "demanda o regulador", "hecho": "Elecciones generales anticipadas el 29-nov-2026: el decreto de centros de datos queda en pausa [19].", "veredicto": "retrasa", "condicion": "Hasta conocer el resultado electoral (29-nov-2026) y el destino del decreto."},
            {"fecha": "2026-10-15", "tipo": "fusión u oferta", "hecho": "Acuerdo con el Gobierno de Uruguay para un campus de centros de datos de hasta 500 MW en zona franca con 350 MW solares [7].", "veredicto": "no cambia", "condicion": None},
            {"fecha": "2026-11-04", "tipo": "accionista de referencia", "hecho": "Cortos declarados en la CNMV (≥ 0,5 %): JPMorgan AM 2,41 %, AHL 1,08 %, Marchant 1,00 %, Marshall Wace 0,84 %, CFM 0,83 %, Acadian 0,70 %, Two Sigma 0,63 %: 7,49 % del capital (≈ 10 M de acciones, ≈ 8 días de volumen) [6]. Stoneshield tiene el 9,5 % (7,1 % en acciones) y la familia Díaz-Tejeiro el 36,4 % [3, 13]; no consta ninguna venta de la familia en 2026.", "veredicto": "no cambia", "condicion": None},
            {"fecha": "2026-11-19", "tipo": "resultados", "hecho": "Capital Markets Day en Londres el 19-nov-2026 [7]; los resultados de 9M26 se esperan hacia el 16-nov (fecha estimada por Yahoo, sin confirmar) [2]. Con tendencia bajista y resultados a ≤ 15 días, la regla manda esperar.", "veredicto": "retrasa", "condicion": "Hasta los resultados de 9M26 y el Capital Markets Day del 19-nov-2026."}
        ],
        "proximos_resultados": "2026-11-16",
        "veredicto": "retrasa",
        "condicion": "Hasta los resultados de 9M26 y el Capital Markets Day del 19-nov-2026 (nueva guía y plan de capital), y las elecciones del 29-nov.",
        "comentario": "La acción ha perdido un 37 % desde el máximo del 24-abr. La explican tres cosas: la colocación a 24 EUR, que fijó un techo y diluyó un 6 %; la subida de la rentabilidad de la deuda en una empresa apalancada; y una posición corta del 7,5 % que amplifica cada movimiento (−12 % antes del 1S26 y +9,5 % después) [6, 17, 18]. Los resultados no decepcionan (EBITDA del 1S26 +50 % y guía de 331 M EUR al 64 %) [5]; el recorte de capacidad sí. Hay tres hechos pendientes en tres semanas que pueden mover el precio más de un 5 %: el 9M26 (≈ 16-nov), el Capital Markets Day del 19-nov con la guía nueva y quizá más necesidades de capital, y las elecciones del 29-nov con el decreto de centros de datos [2, 7, 19]. Con tendencia bajista, el veredicto es retrasar hasta el CMD."
    },
    "confianza": "Media"
}
d['multiplos_historicos'] = {
    "serie": [
        {"anio": c['anio'], "precio_cierre": c['precio_cierre'], "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False}
        for c in b['cierres_ejercicio'] if 2020 <= int(c['anio']) <= 2025
    ],
    "comentario": "Precios de cierre de Yahoo (cierre ajustado por dividendos no aplica: no paga) [1]; el de 2025 (18,15 EUR) y el de 2024 (7,82 EUR) coinciden con los de las cuentas anuales [4]. El cierre de 2021 y de 2022 es el mismo, 17,12 EUR (comprobado en la serie diaria: 30-dic-2021 y 30-dic-2022) [1]. 2020 (23,64 EUR, burbuja renovable con PER > 90x sobre un BPA de 0,24) debería excluirse de la mediana: lo decide el integrador con la cuenta de resultados. Sin múltiplos NTM gratuitos por año.",
    "confianza": "Alta"
}
d['fuentes'] += [
    {"id": 13, "titulo": "Quiénes son los dueños de Solaria, la acción que repuntó 9,52 % y lideró el Ibex 35 hoy", "editor": "Bloomberg Línea", "tipo": "Prensa", "fecha": "2026-09-25", "url": "https://www.bloomberglinea.com/mercados/quienes-son-los-duenos-de-solaria-la-accion-que-repunto-952-y-lidero-el-ibex-35-hoy/"},
    {"id": 14, "titulo": "Solaria: News and key events", "editor": "MarketScreener", "tipo": "Datos de mercado", "fecha": "2026-09-18", "url": "https://uk.marketscreener.com/quote/stock/SOLARIA-ENERGIA-Y-MEDIO-A-273983/news-key-events/"},
    {"id": 15, "titulo": "Las acciones de Solaria se disparan más de un 3 %: esta es la tormenta perfecta que impulsa al valor", "editor": "XTB", "tipo": "Prensa", "fecha": "2026-08-19", "url": "https://www.xtb.com/es/analisis-de-mercado/las-acciones-de-solaria-se-disparan-mas-de-un-3-esta-es-la-tormenta-perfecta-que-impulsa-al-valor"},
    {"id": 16, "titulo": "Las acciones de Solaria caen más de un 5 % en la sesión de hoy: ¿qué está ocurriendo?", "editor": "XTB", "tipo": "Prensa", "fecha": "2026-08-03", "url": "https://www.xtb.com/es/analisis-de-mercado/las-acciones-de-solaria-caen-mas-de-un-5-en-la-sesion-de-hoy-que-esta-ocurriendo"},
    {"id": 17, "titulo": "Las acciones de Solaria caen más de un 4 %. ¿Qué ocurre?", "editor": "XTB", "tipo": "Prensa", "fecha": "2026-09-02", "url": "https://www.xtb.com/es/analisis-de-mercado/las-acciones-de-solaria-caen-mas-de-un-4-que-ocurre"},
    {"id": 18, "titulo": "Las acciones de Solaria se desploman un 6,5 % antes de sus resultados; y «Las acciones de Solaria sufren otro desplome: ¿culpa de los cortos?» (28-sep-2026)", "editor": "XTB", "tipo": "Prensa", "fecha": "2026-09-23", "url": "https://www.xtb.com/es/analisis-de-mercado/las-acciones-de-solaria-se-desploman-un-6-5-antes-de-sus-resultados-que-esta-pasando"},
    {"id": 19, "titulo": "Las acciones de Solaria acusan la convocatoria de elecciones", "editor": "XTB", "tipo": "Prensa", "fecha": "2026-10-05", "url": "https://www.xtb.com/es/analisis-de-mercado/por-que-caen-las-acciones-de-solaria-2"},
    {"id": 20, "titulo": "Las acciones de Solaria se disparan: ¿qué hay detrás? (posible acuerdo de centros de datos con Telefónica y ACS)", "editor": "XTB", "tipo": "Prensa", "fecha": "2026-04-15", "url": "https://www.xtb.com/es/analisis-de-mercado/las-acciones-de-solaria-suben-un-4-por-un-posible-acuerdo-de-centros-de-datos"}
]
d['huecos'].append({"seccion": "bolsa", "campo": "causa de las caídas del 3-mar, 30-jun, 14-sep y de la subida del 27-oct-2026", "tipo": "Complemento", "intentos": "1) CNMV, otra información relevante: sin comunicaciones esos días; 2) XTB, MarketScreener y Estrategias de Inversión (403): sin artículo de esas fechas; 3) búsquedas en prensa por fecha: sin resultado", "decision": "Omitido"})
json.dump(d, open(p, 'w'), ensure_ascii=False, indent=2)
print('ok')

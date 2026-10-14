# Construye las notas A-E de Iberdrola (corte 2026-10-14) con lo leído en los resultados de búsqueda.
# Entorno nube: solo WebSearch. Cada cifra lleva la URL de la página que la publica; lo que no cuadra, a null y a huecos.
import json, os
D = os.path.dirname(os.path.abspath(__file__))

import re
_X = re.compile(r'\s?\[[A-Z]\d*(?:\s*,\s*[A-Z]?\d+)*\]')
def limpia(o, top=False):
    if isinstance(o, str): return _X.sub('', o)
    if isinstance(o, list): return [limpia(x) for x in o]
    if isinstance(o, dict): return {k: (v if (top and k == 'fuentes') else limpia(v)) for k, v in o.items()}
    return o
def w(nombre, obj):
    obj = limpia(obj, True)
    with open(os.path.join(D, nombre), 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)

def F(i, titulo, editor, tipo, fecha, url):
    return {"id": i, "titulo": titulo, "editor": editor, "tipo": tipo, "fecha": fecha, "url": url}

# ---------------- A. Cuentas ----------------
fA = [
 F(1, "Iberdrola (BME:IBE) Income Statement (ingresos, EBIT, amortización, BAI, impuestos, minoritarios, beneficio, acciones diluidas, FCF)", "Stock Analysis", "Datos de mercado", "2026-07-31", "https://stockanalysis.com/quote/bme/IBE/financials/income-statement/"),
 F(2, "Iberdrola (BME:IBE) Balance Sheet (activo total, fondo de comercio, caja)", "Stock Analysis", "Datos de mercado", "2026-07-31", "https://stockanalysis.com/quote/bme/IBE/financials/balance-sheet/"),
 F(3, "Iberdrola invierte 14.460 millones en 2025 y aumenta el beneficio neto un 12 % (nota de prensa de resultados 2025)", "Iberdrola", "Primaria", "2026-02-25", "https://www.iberdrola.com/documents/20125/5739678/iberdrola-invierte-14460-millones-en-2025-y-aumenta-el-beneficio-neto-un-12-por-ciento.pdf"),
 F(4, "Resultados 2025: infografía (beneficio neto ajustado 6.231 M, EBITDA ajustado 15.684 M)", "Iberdrola", "Primaria", "2026-02-25", "https://www.iberdrola.com/documents/20125/5693233/PR25FY-infografia.pdf"),
 F(5, "Iberdrola closes 2025 with record profit of 6.285 billion (EBITDA reportado 16.592 M, ingresos 45.547 M)", "Ara", "Prensa", "2026-02-25", "https://en.ara.cat/economy/iberdrola-closes-2025-with-record-profit-of-6-285-billion_1_5658733.html"),
 F(6, "Inversiones en redes en R. Unido, EE. UU. y Brasil impulsan el beneficio neto de Iberdrola a junio hasta 4.340 millones (+22 %)", "Iberdrola", "Primaria", "2026-07-22", "https://www.iberdrola.com/documents/20125/6089933/260722-inversiones-redes-r-unido-ee-uu-brasil-impulsan-beneficio-neto-iberdrola-junio-hasta-4340-millones-22.pdf"),
 F(7, "Resultados 1S26: infografía", "Iberdrola", "Primaria", "2026-07-22", "https://www.iberdrola.com/documents/20125/6038293/PR261S-infografia.pdf"),
 F(8, "Iberdrola gana más, compra una distribuidora en Finlandia y dispara la inversión (FFO/deuda 22,4 %, deuda neta ≈54.000 M)", "Roams", "Prensa", "2026-07-22", "https://roams.es/actualidad/energia/iberdrola-gana-mas-compra-distribuidora-finlandia-dispara-inversion/"),
 F(9, "Iberdrola impulsa su beneficio un 11,4 % y mejora previsiones (1T26)", "Estrategias de Inversión", "Prensa", "2026-04-29", "https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/iberdrola-impulsa-su-beneficio-un-114-y-mejora-n-912415"),
 F(10, "Iberdrola ganó 1.711 millones hasta marzo", "The Objective", "Prensa", "2026-04-29", "https://theobjective.com/economia/2026-04-29/iberdrola-gano-1711-millones-marzo/"),
 F(11, "Inversión récord de 17.000 millones impulsa el beneficio neto de Iberdrola hasta 5.612 millones (+17 %)", "Iberdrola", "Primaria", "2025-02-27", "https://iberdrola.com/documents/20125/4994767/250227-pr-inversion-record-17000-millones-impulsa-beneficio-neto-iberdrola-hasta-5612-millones-17-mas.pdf"),
 F(12, "Iberdrola gana 4.803 millones en 2023, un 10,7 % más, e invierte 11.382 millones", "Bolsamanía", "Prensa", "2024-02-22", "https://www.bolsamania.com/noticias/resultados-anuncios/iberdrola-gana-4803-millones-2023-107-mas-invierte-11382-millones--16278578.html"),
 F(13, "Resultados 2022: infografía (beneficio 4.339 M, EBITDA 13.228 M)", "Iberdrola", "Primaria", "2023-02-22", "https://www.iberdrola.com/documents/20125/2955440/PR22FY-infografia.pdf"),
 F(14, "Medidas alternativas del rendimiento 1T22 (deuda neta ajustada 2021: 39.119 M)", "Iberdrola", "Primaria", "2022-04", "https://www.iberdrola.com/documents/20125/1708762/Medidas_Alternativas_Rendimiento_1T22.pdf"),
 F(15, "Medidas alternativas del rendimiento FY22 (deuda neta ajustada 43.749 M; FFO/deuda 25,4 %)", "Iberdrola", "Primaria", "2023-02", "https://www.iberdrola.com/documents/20125/2955414/medidas-alternativas-rendimiento-FY22.pdf"),
 F(16, "Medidas alternativas del rendimiento 23FY (deuda neta ajustada 47.832 M; FFO/deuda 23,2 %; DN/EBITDA 3,32x)", "Iberdrola", "Primaria", "2024-02", "https://www.iberdrola.com/documents/20125/3894078/medidas-alternativas-rendimiento-23FY.pdf"),
 F(17, "IBE — Iberdrola SA Income Statement (beneficio antes de impuestos 2021-2025)", "Stockopedia", "Datos de mercado", "2026", "https://www-proxy.stockopedia.com/share-prices/iberdrola-sa-MCE:IBE/income-statement/"),
 F(18, "IBERDROLA SA (IBE1.DE) Income Statement (minoritarios 2023)", "Chartmill", "Datos de mercado", "2026", "https://www.chartmill.com/stock/quote/IBE1.DE/financials/income-statement"),
 F(19, "Los resultados de Iberdrola cumplen con las previsiones (BPA 2025: 0,925 €)", "OCU", "Analistas", "2026-02", "https://www.ocu.org/inversiones/invertir/acciones/articulos/2026/02/los-resultados-de-iberdrola-cumplen-con-las-previsiones"),
 F(20, "Iberdrola fija el dividendo complementario de 0,427 € (resultados 2025; dividendo total 0,68 €)", "El Independiente", "Prensa", "2026-02-25", "https://www.elindependiente.com/economia/2026/02/25/iberdrola-resultados-2025-beneficio-record-inversiones/amp/"),
 F(21, "Estatutos sociales, artículo 10, texto de 24-jul-2026 (6.673.141.516 acciones)", "Iberdrola", "Primaria", "2026-07-24", "https://www.iberdrola.com/documents/20125/42013/estatutos-modif-260724.pdf"),
 F(22, "Reducción de capital por amortización de 182.845.603 acciones propias (BORME)", "BORME", "Primaria", "2026-07-01", "https://boe.es/borme/dias/2026/07/01/pdfs/BORME-C-2026-3876.pdf"),
 F(23, "Getquin: resumen de resultados 2025 por negocio (EBITDA ajustado Redes 7.973 M, Renovables 5.148 M, Producción y Clientes 2.563 M)", "Getquin", "Datos de mercado", "2026-02-25", "https://app.getquin.com/es/post/MZiohwpRJe"),
 F(24, "Iberdrola posts its strongest year yet: €6.285bn profit, €14.46bn investment (redes 8.975 M; renovables 5.260 M)", "SolarQuarter", "Prensa", "2026-03-02", "https://solarquarter.com/2026/03/02/iberdrola-posts-its-strongest-year-yet-e6-285b-profit-e14-46b-investment-and-massive-us-uk-network-spending-power-growth-in-2025/"),
 F(25, "Iberdrola pulveriza todos sus registros (FFO 12.811 M, +8,2 %; deuda neta 50.200 M)", "Vozpópuli", "Prensa", "2026-02-25", "https://www.vozpopuli.com/economia/energia/iberdrola-pulveriza-todos-sus-registros-y-alcanza-unos-beneficios-de-6285-millones.html"),
 F(26, "Iberdrola gana 4.339 millones en 2022, un 12 % más (deuda neta, inversiones 10.730 M)", "Estrategias de Inversión", "Prensa", "2023-02-22", "https://www.estrategiasdeinversion.com/actualidad/noticias/empresas/iberdrola-gana-4339-millones-un-12-mas-pese-a-n-596073"),
 F(27, "Iberdrola Cash Flow Statement (flujo operativo 2023 12.130 M; capex 7.877 M)", "Stockopedia", "Datos de mercado", "2026", "https://stockopedia.com/share-prices/iberdrola-sa-MCE:IBE/cashflow"),
 F(28, "Iberdrola Financial Health (deuda total ≈54.300 M; patrimonio ≈63.400 M)", "Simply Wall St", "Datos de mercado", "2026", "https://simplywall.st/stocks/es/utilities/bme-ibe/iberdrola-shares/health"),
]

# Cuenta: Stock Analysis [1] para ingresos, EBIT, amortización (EBITDA = EBIT + amortización), impuestos, minoritarios y beneficio;
# BAI de Stockopedia [17] (coincide con Stock Analysis en 2025); resultado financiero = BAI − EBIT (incluye participadas y otros).
# La diferencia entre BAI − impuestos − minoritarios y el beneficio atribuido son operaciones interrumpidas (México) y cupones de híbridos.
cuenta = [
 {"periodo": "2021", "ingresos": 39114, "coste_ventas": None, "gastos_generales": None, "ebitda": 11637, "amortizaciones": 4294, "ebit": 7343, "resultado_financiero": -1042, "bai": 6301, "impuestos": 1914, "minoritarios": 467, "beneficio_neto": 3885, "gastos_financieros": None, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None, "bpa": 0.58, "dpa": None, "dpa_extraordinario": 0, "acciones_diluidas": 6700},
 {"periodo": "2022", "ingresos": 53949, "coste_ventas": None, "gastos_generales": None, "ebitda": 12758, "amortizaciones": 4774, "ebit": 7984, "resultado_financiero": -1692, "bai": 6292, "impuestos": 1161, "minoritarios": 721, "beneficio_neto": 4339, "gastos_financieros": None, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None, "bpa": 0.65, "dpa": None, "dpa_extraordinario": 0, "acciones_diluidas": 6672},
 {"periodo": "2023", "ingresos": 49335, "coste_ventas": None, "gastos_generales": None, "ebitda": 13799, "amortizaciones": 4826, "ebit": 8973, "resultado_financiero": -1948, "bai": 7025, "impuestos": 1610, "minoritarios": 591, "beneficio_neto": 4803, "gastos_financieros": None, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None, "bpa": 0.72, "dpa": None, "dpa_extraordinario": 0, "acciones_diluidas": 6700},
 {"periodo": "2024", "ingresos": 42988, "coste_ventas": None, "gastos_generales": None, "ebitda": 14174, "amortizaciones": 6535, "ebit": 7639, "resultado_financiero": -1827, "bai": 5812, "impuestos": 1343, "minoritarios": 336, "beneficio_neto": 5612, "gastos_financieros": None, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None, "bpa": 0.84, "dpa": 0.64, "dpa_extraordinario": 0, "acciones_diluidas": 6700},
 {"periodo": "2025", "ingresos": 44076, "coste_ventas": None, "gastos_generales": None, "ebitda": 15558, "amortizaciones": 5803, "ebit": 9755, "resultado_financiero": -1658, "bai": 8097, "impuestos": 1671, "minoritarios": 505, "beneficio_neto": 6285, "gastos_financieros": 3983, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None, "bpa": 0.925, "dpa": 0.68, "dpa_extraordinario": 0, "acciones_diluidas": 6747},
]

# Balance: muy incompleto en este entorno. Deuda financiera = deuda neta ajustada publicada + caja (la caja solo se conoce en 2025);
# en los años sin caja, deuda_financiera = deuda neta ajustada y caja 0 (el motor ve la deuda neta correcta, no la bruta).
def bal(p, at, gw, caja, deuda, pn):
    return {"periodo": p, "activo_total": at, "activo_corriente": None, "pasivo_corriente": None, "pasivo_total": None, "fondo_comercio": gw, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": caja, "deuda_financiera": deuda, "arrendamientos": None, "patrimonio_neto": pn, "minoritarios": None, "reservas": None}
balance_hist = [
 bal("2021", None, None, 0, 39119, None),
 bal("2022", None, None, 0, 43749, None),
 bal("2023", None, None, 0, 47832, None),
 bal("2024", None, None, 0, 51700, None),
 bal("2025", 160762, 8389, 6347, 56547, 63400),
]

# Flujos: flujo_operativo = FFO publicado por Iberdrola (FFO/deuda × deuda neta en 2021-2023 [14-16]; 12.811 M en 2025 [25] y
# 12.811/1,082 en 2024). capex = inversión total publicada (orgánica); adquisiciones aparte.
flujos_hist = [
 {"periodo": "2021", "flujo_operativo": 8997, "capex": None, "pagos_arrendamientos": None, "adquisiciones": None, "desinversiones": None, "dividendos": None, "recompras": None, "emision_acciones": None, "intereses_en_financiacion": 0},
 {"periodo": "2022", "flujo_operativo": 11112, "capex": 10730, "pagos_arrendamientos": None, "adquisiciones": None, "desinversiones": None, "dividendos": None, "recompras": None, "emision_acciones": None, "intereses_en_financiacion": 0},
 {"periodo": "2023", "flujo_operativo": 11097, "capex": 11382, "pagos_arrendamientos": None, "adquisiciones": None, "desinversiones": None, "dividendos": None, "recompras": None, "emision_acciones": None, "intereses_en_financiacion": 0},
 {"periodo": "2024", "flujo_operativo": 11840, "capex": 12000, "pagos_arrendamientos": None, "adquisiciones": 5000, "desinversiones": None, "dividendos": None, "recompras": None, "emision_acciones": None, "intereses_en_financiacion": 0},
 {"periodo": "2025", "flujo_operativo": 12811, "capex": 12563, "pagos_arrendamientos": None, "adquisiciones": 1897, "desinversiones": None, "dividendos": None, "recompras": None, "emision_acciones": 5000, "intereses_en_financiacion": 0},
]

A = {
 "_estado": "completo con huecos (búsqueda web; sin documentos abiertos)",
 "financieros": {
  "cuenta": cuenta,
  "ltm": {"periodo": "LTM jun-26", "fecha_fin": "2026-06-30", "ingresos": None, "ebitda": None, "ebit": None, "beneficio_neto": 7059, "bpa": None, "dpa": 0.68, "dpa_extraordinario": 0, "fcf": 3391, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None},
  "cambios_perimetro": [
   {"periodo": "2024", "descripcion": "Compra de Electricity North West (Reino Unido) y de los minoritarios de Avangrid: unos 5.000 M de operaciones corporativas [11]."},
   {"periodo": "2025", "descripcion": "Ampliación de capital de 5.000 M (julio de 2025) y compra del 30,3 % de Neoenergia a Previ por 1.897 M [24]; México clasificado como actividad interrumpida."},
  ],
  "comentario": "Las ventas siguen al precio de la energía y no miden la actividad: 39.114 M en 2021, 53.949 M en 2022 (crisis de precios), 49.335 M en 2023, 42.988 M en 2024 y 44.076 M en 2025 según Stock Analysis [1]; la empresa publica 45.547 M para 2025 (+1,8 %) [5], con otro perímetro de actividades interrumpidas. Lo que crece es el EBITDA: 11.637 M en 2021 y 15.558 M en 2025 con la definición de Stock Analysis (EBIT + amortización) [1], un 7,5 % anual; el ajustado de la empresa fue de 15.684 M en 2025 (+3 %), con Redes +21 % (perímetro de ENW y más base de activos) y Producción y Clientes −10 % por menores precios en España y Reino Unido [4, 5]. El beneficio atribuido pasó de 3.885 M a 6.285 M (+12,8 % anual) [1, 3]. El EBITDA reportado por la empresa (16.592 M en 2025, 16.848 M en 2024) incluye plusvalías y partidas que el ajustado excluye [5, 11].",
  "ajustes": "Iberdrola publica un beneficio neto ajustado: 6.231 M en 2025 (+10,5 %), que excluye la plusvalía de la venta de contadores en Reino Unido (379 M), el reconocimiento de costes pasados en EE. UU. (389 M) e incluye −465 M de ajustes de valor en renovables y clientes [4, 5]. En el 1S26, 3.565 M ajustados frente a 4.336 M contables por la plusvalía neta de 953 M de la venta de México a Cox y el efecto de las capital allowances británicas (182 M) [6, 7]. El BPA de las cuentas del informe es el contable dividido entre las acciones diluidas de Stock Analysis (estimación propia en 2021, 2023 y 2024, con ≈6.700 M); el de 2025, 0,925 €, es el publicado [19].",
  "confianza": "Media",
 },
 "trimestres": {
  "items": [
   {"periodo": "1T25", "ingresos": None, "crecimiento_pct": None, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": None},
   {"periodo": "1T26", "ingresos": 12010, "crecimiento_pct": 0.0, "crecimiento_organico_pct": None, "ebitda": 4100, "margen_ebitda_pct": 34.1, "bpa": None, "vs_consenso": None},
   {"periodo": "1S26", "ingresos": 22469, "crecimiento_pct": 4.2, "crecimiento_organico_pct": None, "ebitda": 8050, "margen_ebitda_pct": 35.8, "bpa": None, "vs_consenso": "Superior"},
  ],
  "ultima_presentacion": "En el 1T26 (29-abr) la dirección subió la guía de 2026 a un crecimiento del beneficio neto ajustado superior al 8 %, sin plusvalías de rotación de activos, con un beneficio ajustado de 1.865 M (+11,4 %) y Redes +9 % hasta 2.048 M de EBITDA, mientras Producción y Clientes bajaba un 3 % [9, 10]. En el 1S26 (22-jul) el beneficio ajustado fue de 3.565 M (+7,8 %) y el EBITDA ajustado de 8.050 M (+7,4 %; +8,8 % sin divisa), por encima del consenso de Bloomberg, RBC y Renta 4, con inversiones de 7.000 M (+25 %, más del 70 % en Reino Unido, EE. UU. y Brasil) [6, 7, 8]. El mensaje cambió de «crecer en redes» a «crecer en redes y comprar redes»: el 21-jul anunció la compra del 80 % de Caruna (Finlandia), valorada en 5.000 M con deuda [8]. Lo que más se preguntó: la deuda (≈54.000 M en junio, +3.790 M en seis meses) y el FFO/deuda del 22,4 % [8]. No encontramos en este entorno la transcripción de las conferencias: el resumen sale de las notas de prensa.",
  "confianza": "Media",
 },
 "balance": {
  "historico": balance_hist,
  "vencimientos": [],
  "liquidez": "Caja e inversiones a corto plazo de 6.347 M a cierre de 2025 (caja 3.670 M) y 4.011 M en junio de 2026 [2]; las líneas de crédito no dispuestas no se pudieron leer en este entorno.",
  "rating": None,
  "coste_deuda_pct": 4.8,
  "vida_media_anios": None,
  "otros_pasivos": "Iberdrola tiene bonos híbridos perpetuos que contabiliza como patrimonio y que su deuda neta ajustada no incluye entera; su importe no se pudo leer en este entorno (hueco) y es la principal partida asimilable a deuda que falta en el puente. El patrimonio total ronda los 63.400 M con una deuda total de ≈54.300 M según Simply Wall St [28]. Pensiones, provisiones de desmantelamiento nuclear y garantías quedan sin dato. El coste medio de la deuda bajó 16 pb hasta el 4,81 % en 2024 [11].",
  "comentario": "La deuda neta ajustada pasó de 39.119 M en 2021 a 43.749 M en 2022, 47.832 M en 2023, ≈51.700 M en 2024 y 50.200 M en 2025 (bajó 1.500 M gracias a la ampliación de 5.000 M y a la rotación de activos) [14, 15, 16, 25]; en marzo de 2026 era de 51.900 M y en junio de ≈54.000 M por la inversión, la apreciación del real y el dólar y la recompra de un híbrido [8, 9]. El FFO/deuda se mantiene en el 22-25 % (23,0 % en 2021, 25,4 % en 2022, 23,2 % en 2023 y 22,4 % en junio de 2026) y la deuda neta/EBITDA en ≈3,3 veces [14, 15, 16, 8]: el plan se financia con caja, rotación de activos y capital, sin que el apalancamiento baje.",
  "confianza": "Baja",
 },
 "flujos": {
  "historico": flujos_hist,
  "comentario": "El flujo operativo del informe es el FFO que publica Iberdrola (antes del circulante): ≈9.000 M en 2021 y 12.811 M en 2025 (+8,2 %) [14, 25]. La inversión orgánica pasó de 10.730 M en 2022 a 11.382 M en 2023, 12.000 M en 2024 y 12.563 M en 2025 (14.460 M con la compra del 30,3 % de Neoenergia, 1.897 M) [26, 12, 11, 24]: casi todo el FFO se reinvierte, y el dividendo en efectivo, las compras y la deuda que no baja se pagan con rotación de activos (México, 2024 y 2026) y con la ampliación de 5.000 M de 2025. Stock Analysis da un FCF de 4.791 M en 2023, 4.252 M en 2024 y 4.019 M en 2025 [1] porque su capex no incluye toda la inversión que la empresa declara; con la inversión total, el FCF es casi nulo. No hay desglose oficial entre mantenimiento y crecimiento: estimación propia, el mantenimiento se acerca a la amortización (≈5.800 M) y el resto (≈6.000-8.000 M al año) es crecimiento de la base de activos de redes y renovables.",
  "confianza": "Baja",
 },
 "calidad": {
  "auditor": None, "anios_auditor": None, "opinion": None,
  "comentario": "La diferencia entre el beneficio contable y el ajustado es grande y cambia de signo: +54 M en 2025 (plusvalía de contadores y costes de EE. UU. frente a ajustes de valor de renovables) [4] y +771 M en el 1S26 (plusvalía de México) [6, 7]. Las cuentas mezclan perímetros: México como actividad interrumpida, ENW desde 2024 y Neoenergia al 100 % desde 2025, de modo que las ventas de Stock Analysis (44.076 M) y las de la empresa (45.547 M) no coinciden en 2025 [1, 5]. El EBITDA publicado incluye plusvalías de rotación de activos que forman parte del modelo de financiación: se repiten, aunque con importes irregulares. Los indicadores de Altman, Piotroski y Beneish del motor no son interpretables aquí porque faltan el circulante y casi todo el balance.",
  "senales": [
   {"senal": "Plusvalías de rotación de activos recurrentes (México 2024 y 2026, contadores británicos 2025)", "nivel": "Media", "comentario": "Financian el plan; el beneficio ajustado las excluye, el contable no [4, 6]."},
   {"senal": "Ajustes de valor de la cartera renovable (465 M en el 4T25)", "nivel": "Media", "comentario": "Muestran el deterioro de la rentabilidad de producción y clientes [4, 5]."},
  ],
  "confianza": "Baja",
 },
 "capital": {
  "politica": "Dividendo con un pay-out del 65-75 % del beneficio neto ajustado y suelo creciente; unos 20.000 M a dividendos en 2024-2028 [P]. Se paga con el sistema de Iberdrola Retribución Flexible: en julio de 2026 el 74,6 % del capital eligió acciones (98,14 M de acciones nuevas) y el dividendo en efectivo fue de 0,427 € [21]; para que el número de acciones no crezca, Iberdrola amortiza la autocartera (182,8 M de acciones el 30-jun-2026) [22]. Prioridad declarada: inversión en redes en países con rating A (85 % del plan de 58.000 M en 2025-2028) [P].",
  "adquisiciones": [
   {"anio": "2024", "objetivo": "Electricity North West (88 %, Reino Unido) y minoritarios de Avangrid", "importe": 5000, "ev_ebitda": None, "financiacion": "Caja, deuda y rotación de activos (venta de México)", "resultado": "Redes +21 % de EBITDA en 2025 con ENW consolidada [5]."},
   {"anio": "2025", "objetivo": "30,3 % de Neoenergia (Brasil) a Previ", "importe": 1897, "ev_ebitda": None, "financiacion": "Ampliación de capital de 5.000 M", "resultado": "Brasil, entre los motores del 1S26 [6]."},
   {"anio": "2026", "objetivo": "80 % de Caruna (distribución eléctrica, Finlandia)", "importe": 4000, "ev_ebitda": None, "financiacion": "Pendiente de cierre; valorada en 5.000 M con deuda al 100 %", "resultado": "Cierre previsto a finales de 2026 o principios de 2027 [8]."},
  ],
  "comentario": None,
  "confianza": "Media",
 },
 "negocio": {
  "segmentos": [
   {"nombre": "Redes", "descripcion": "Transporte y distribución regulados en España (i-DE), Reino Unido (SP Energy Networks y ENW), EE. UU. (Avangrid) y Brasil (Neoenergia).", "tipo_resultado": "EBITDA", "historico": [{"periodo": "2025", "ingresos": None, "resultado": 7973}]},
   {"nombre": "Renovables", "descripcion": "Eólica terrestre y marina, solar e hidráulica.", "tipo_resultado": "EBITDA", "historico": [{"periodo": "2025", "ingresos": None, "resultado": 5148}]},
   {"nombre": "Producción y Clientes", "descripcion": "Generación convencional y nuclear, comercialización a clientes.", "tipo_resultado": "EBITDA", "historico": [{"periodo": "2025", "ingresos": None, "resultado": 2563}]},
  ],
  "geografias": [],
  "kpis": [
   {"kpi": "Inversión total", "valor_anterior": "≈17.000 M (2024, con compras)", "valor_actual": "14.460 M (2025)", "variacion": "−15 %", "comentario": "Dos tercios en Redes (8.975 M) [24]."},
   {"kpi": "EBITDA ajustado de Redes", "valor_anterior": "—", "valor_actual": "7.973 M (2025)", "variacion": "+21 %", "comentario": "ENW y más base de activos [5, 23]."},
   {"kpi": "FFO/deuda neta", "valor_anterior": "23,2 % (2023)", "valor_actual": "22,4 % (jun-26)", "variacion": "−0,8 pp", "comentario": "Por encima del umbral habitual de las agencias para BBB+ [16, 8]."},
   {"kpi": "Deuda neta ajustada", "valor_anterior": "50.200 M (dic-25)", "valor_actual": "≈54.000 M (jun-26)", "variacion": "+3.790 M", "comentario": "Inversión, divisas y recompra de un híbrido [8]."},
  ],
 },
 "fuentes": fA,
 "huecos": [
  {"seccion": "balance", "campo": "circulante, patrimonio atribuido, minoritarios, arrendamientos y vencimientos", "tipo": "Núcleo", "intentos": "1) Informe anual 2025 en iberdrola.com: no accesible (solo búsqueda web); 2) Stock Analysis y Simply Wall St: los extractos cortan antes del pasivo; 3) Medidas alternativas del rendimiento: solo deuda neta ajustada y ratios", "decision": "Omitido"},
  {"seccion": "flujos", "campo": "dividendos pagados, arrendamientos y desinversiones por año", "tipo": "Núcleo", "intentos": "1) Estado de flujos del informe anual: no accesible; 2) Stock Analysis y Stockopedia: extractos incompletos; 3) Notas de prensa: solo FFO e inversión", "decision": "Omitido"},
  {"seccion": "financieros", "campo": "dpa 2021-2023", "tipo": "Complemento", "intentos": "1) Notas de prensa de resultados; 2) Stock Analysis (solo 2025); 3) Prensa: cifras contradictorias", "decision": "Omitido"},
  {"seccion": "calidad", "campo": "auditor y opinión", "tipo": "Complemento", "intentos": "1) Informe anual: no accesible; 2) IAGC: no accesible; 3) prensa: sin resultado", "decision": "Omitido"},
 ],
}
w("A.json", A)

# ---------------- B. Sector y competencia ----------------
fB = [
 F(1, "Iberdrola invertirá 58.000 millones hasta 2028 para crecer más en redes en EE. UU. y Reino Unido (Capital Markets Day)", "Iberdrola", "Primaria", "2025-09-24", "https://www.iberdrola.com/documents/20125/5481017/250924-iberdrola-invertira-58000-millones-hasta-2028-crecer-mas-redes-estados-unidos-reino-unido.pdf"),
 F(2, "Iberdrola dispara inversión, beneficio y dividendo en su nuevo plan a 2028", "El Observador / Europa Press", "Prensa", "2025-09-22", "https://www.elobservador.com.uy/espana/economia-y-finanzas/iberdrola-dispara-inversion-beneficio-y-dividendo-su-nuevo-plan-2028-n6017949"),
 F(3, "Is IBDRY a Buy or a Sell? The Bull and Bear Case (2026)", "Walnut", "Datos de mercado", "2026-10-09", "https://walnutinvest.com/stocks/ibdry/is-it-a-buy-or-sell"),
 F(4, "Iberdrola (Wikipedia): historia, fusión de Hidroeléctrica Española e Iberduero (1992), ScottishPower (2007)", "Wikipedia", "Prensa", "2026", "https://en.wikipedia.org/wiki/Iberdrola"),
 F(5, "Iberdrola Renovables (Wikipedia): salida a bolsa 2007 y reintegración 2011", "Wikipedia", "Prensa", "2026", "https://en.wikipedia.org/wiki/Iberdrola_Renovables"),
 F(6, "Iberdrola se posiciona como la primera energética europea: supera los 100.000 millones en bolsa", "Deia", "Prensa", "2025-04-03", "https://www.deia.eus/economia/2025/04/03/iberdrola-posiciona-primera-energetica-europea-9480619.amp.html"),
 F(7, "Iberdrola roza los 125.000 millones de capitalización en su 125 aniversario (≈+40 % en 2025)", "Energías Renovables", "Prensa", "2026-01-08", "https://www.energias-renovables.com/panorama/iberdrola-roza-los-125-000-millones-de-20260108"),
]
B = {
 "_estado": "parcial (búsqueda web; sin informes de competidores)",
 "historia": {
  "resumen": "Iberdrola nace en 1992 de la fusión de Hidroeléctrica Española e Iberduero [4]. Con Ignacio Galán como primer ejecutivo desde 2001 apostó antes que nadie por la eólica, compró ScottishPower en 2007 y Energy East en EE. UU. en 2008, sacó a bolsa Iberdrola Renovables en 2007 y la reintegró en 2011 [4, 5]. En la última década ha girado hacia las redes reguladas: Avangrid (EE. UU.), Neoenergia (Brasil), ENW (Reino Unido, 2024), la exclusión de Avangrid (2024) y la compra de Caruna (Finlandia, 2026) [P]. En abril de 2025 superó los 100.000 M de capitalización y en enero de 2026 rozaba los 125.000 M [6, 7].",
  "hitos": [
   {"anio": "1992", "hito": "Fusión de Hidroeléctrica Española e Iberduero [4]."},
   {"anio": "2001", "hito": "Ignacio Galán, primer ejecutivo; apuesta por la eólica [4]."},
   {"anio": "2007", "hito": "Compra de ScottishPower y salida a bolsa de Iberdrola Renovables [4, 5]."},
   {"anio": "2008", "hito": "Compra de Energy East (EE. UU.), origen de Avangrid [4]."},
   {"anio": "2024", "hito": "Compra de Electricity North West y exclusión de bolsa de Avangrid [P]."},
   {"anio": "2025", "hito": "Plan de 58.000 M a 2028, ampliación de 5.000 M y Neoenergia al 100 % [1, P]."},
   {"anio": "2026", "hito": "Venta de México a Cox y compra del 80 % de Caruna [P]."},
  ],
  "confianza": "Media",
 },
 "negocio": {
  "descripcion": "Iberdrola es la mayor eléctrica europea por capitalización. Tiene tres negocios: Redes (transporte y distribución regulados en España, Reino Unido, EE. UU. y Brasil), Renovables (eólica terrestre y marina, solar e hidráulica) y Producción y Clientes (nuclear, ciclos combinados y comercialización a hogares y empresas en España, Reino Unido, EE. UU., Brasil y otros países europeos) [1, 3]. El plan 2025-2028 destina 58.000 M de inversión, unos 37.000 M a redes, el 85 % en países con rating A; Reino Unido (≈20.000 M) y EE. UU. (≈16.000 M) son los destinos principales [1, 3].",
  "como_gana_dinero": "En redes cobra una retribución regulada sobre su base de activos (tasa financiera fijada por el regulador de cada país más la amortización), de modo que el beneficio crece con la inversión reconocida y no con el volumen: es la parte que más pesa (7.973 M de EBITDA ajustado de 15.684 M en 2025, el 51 %) y la que más crece (+21 %) [A]. En renovables vende la energía con contratos a largo plazo o al mercado (5.148 M); en producción y clientes gana el margen entre el coste de generar o comprar y la tarifa (2.563 M, −10 % en 2025 por precios más bajos en España y Reino Unido) [A]. Apalancamiento operativo bajo; el riesgo está en la regulación, los tipos de interés y los precios mayoristas.",
  "clientes": "Clientes regulados de redes (los consumidores de cada zona de distribución pagan peajes fijados por el regulador) y clientes minoristas y mayoristas de energía; no hay concentración relevante. El poder de precios no es comercial sino regulatorio: depende de las revisiones tarifarias (RIIO-ED2/ED3 en Reino Unido, casos tarifarios en Nueva York y Maine, CNMC en España) [P].",
  "geografias_criterio": "origen",
  "confianza": "Media",
 },
 "sector": {
  "definicion": "Eléctricas integradas europeas con peso creciente de redes reguladas. El mercado relevante para Iberdrola es la inversión en redes eléctricas y renovables en Reino Unido, EE. UU., España y Brasil, donde la electrificación (centros de datos, bombas de calor, vehículo eléctrico) exige ampliar las redes [1, 3]. No se pudo leer en este entorno una fuente oficial del tamaño del mercado.",
  "tamano": None, "unidad_serie": None, "serie": [],
  "tcac_historico_pct": None, "tcac_previsto_pct": None, "cr5_pct": None, "estructura": "Moderadamente concentrada",
  "drivers": [
   {"driver": "Electrificación y centros de datos", "efecto": "+", "horizonte": "Estructural", "evidencia": "Iberdrola invierte 58.000 M en 2025-2028, un 30 % más que en 2021-2024 [1]."},
   {"driver": "Tipos de interés", "efecto": "+/−", "horizonte": "Cíclico", "evidencia": "Coste medio de la deuda 4,81 % en 2024 [A]; las tasas reguladas se ajustan con retraso."},
   {"driver": "Precios mayoristas de la electricidad", "efecto": "−", "horizonte": "Cíclico", "evidencia": "Producción y Clientes −10 % de EBITDA en 2025 por menores precios [A]."},
   {"driver": "Revisiones regulatorias", "efecto": "+/−", "horizonte": "Estructural", "evidencia": "85 % de la inversión en países con rating A y marcos estables [1]."},
  ],
  "porter": [
   {"fuerza": "Rivalidad", "intensidad": 2, "justificacion": "En redes no hay competencia (monopolio regulado); en comercialización y renovables sí."},
   {"fuerza": "Poder de los clientes", "intensidad": 2, "justificacion": "El regulador fija la retribución en nombre de los clientes."},
   {"fuerza": "Poder de los proveedores", "intensidad": 3, "justificacion": "Escasez de transformadores, cables y turbinas marinas eleva costes."},
   {"fuerza": "Amenaza de entrada", "intensidad": 1, "justificacion": "Las redes son concesiones; la escala para invertir 15.000 M al año la tienen pocos."},
   {"fuerza": "Amenaza de sustitutos", "intensidad": 2, "justificacion": "El autoconsumo reduce volumen pero no la necesidad de red."},
  ],
  "ciclo": {"posicion": "Expansión", "comentario": "Ciclo inversor de redes en expansión por la electrificación; el beneficio de redes creció un 21 % en 2025 [A]. Las eléctricas reguladas resistieron 2008-09 y 2020; en 2022 los precios disparan las ventas pero no el beneficio de redes."},
  "regulacion": "Reino Unido (Ofgem, RIIO-ED2 hasta 2028 y transporte RIIO-T3 desde 2026), EE. UU. (casos tarifarios estatales en Nueva York, Maine y Connecticut), España (CNMC, nuevo periodo de retribución de redes desde 2026) y Brasil (concesiones de distribución). Las revisiones fijan la tasa sobre la base de activos y, con ella, la mitad del beneficio [1, P].",
  "tendencias": "Electrificación, centros de datos y conexiones a red impulsan la inversión; la eólica marina sufre sobrecostes y en EE. UU. la política federal frena las renovables. Iberdrola gana con el giro a redes y pierde en producción y clientes [1, A].",
  "confianza": "Baja",
 },
 "competencia": {
  "cuota_pct": None,
  "posicion": "Mayor eléctrica europea por capitalización (≈145.000 M) y primera en redes en Reino Unido y España por base de activos entre las cotizadas integradas [6, 7, P].",
  "competidores": [
   {"nombre": "Enel", "pais": "Italia", "ticker": "ENEL.MI", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Integrada con redes en Italia, España (Endesa) y Latinoamérica."},
   {"nombre": "Endesa", "pais": "España", "ticker": "ELE.MC", "ingresos": 21424, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Rival en España, controlada por Enel."},
   {"nombre": "EDP", "pais": "Portugal", "ticker": "EDP.LS", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Renovables (EDPR) y redes en Portugal y Brasil."},
   {"nombre": "Naturgy", "pais": "España", "ticker": "NTGY.MC", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Gas y electricidad en España."},
   {"nombre": "SSE", "pais": "Reino Unido", "ticker": "SSE.L", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Redes y renovables en Reino Unido."},
   {"nombre": "National Grid", "pais": "Reino Unido", "ticker": "NG.L", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Redes puras en Reino Unido y EE. UU."},
  ],
  "foso": {"veredicto": "Estrecho", "tendencia": "Estable", "fuentes": [
   {"fuente": "Efectos de red", "puntuacion": 0, "evidencia": "No aplica a una eléctrica."},
   {"fuente": "Costes de cambio", "puntuacion": 2, "evidencia": "En redes el cliente no puede cambiar de distribuidor; en comercialización, sí."},
   {"fuente": "Intangibles (marca, patentes, licencias)", "puntuacion": 4, "evidencia": "Concesiones y licencias de redes en cuatro países [B1]."},
   {"fuente": "Ventaja en costes", "puntuacion": 2, "evidencia": "Coste de deuda del 4,8 % y acceso a capital (ampliación de 5.000 M en 2025) [A]."},
   {"fuente": "Escala eficiente", "puntuacion": 4, "evidencia": "Monopolios regulados por zona; inversión de 58.000 M en el plan [1]."},
  ]},
  "amenazas": "El foso de las redes es regulatorio: la retribución la fija un regulador que puede bajar la tasa (Reino Unido en cada RIIO, EE. UU. en cada caso tarifario). En producción y renovables no hay foso: la caída de precios en España y Reino Unido restó un 10 % al EBITDA en 2025 [A]. La política de EE. UU. contra la eólica marina es la amenaza más concreta.",
  "confianza": "Baja",
 },
 "esg": {
  "calificaciones": [],
  "materialidad": "Las emisiones son bajas frente a las eléctricas europeas por su mezcla renovable y nuclear; el asunto material es regulatorio y de inversión: la taxonomía europea y la descarbonización justifican la retribución de redes y renovables. La seguridad de la red (incendios y tormentas en EE. UU.) es el riesgo operativo.",
  "controversias": "La causa judicial en la Audiencia Nacional por los encargos a la empresa de Villarejo afectó a antiguos directivos; Ignacio Galán quedó desimputado en 2024 [P]. No se pudo leer en este entorno el estado de otras sanciones.",
  "confianza": "Baja",
 },
 "fuentes": fB,
 "huecos": [
  {"seccion": "sector", "campo": "tamaño del mercado, serie y CR5", "tipo": "Núcleo", "intentos": "1) IEA y Eurelectric: no accesibles; 2) búsqueda web de tamaño de inversión en redes: sin fuente con cifra fiable; 3) informes de competidores: no accesibles", "decision": "Omitido"},
  {"seccion": "competencia", "campo": "ingresos y margen EBIT de los competidores y cuota", "tipo": "Núcleo", "intentos": "1) Informes anuales de Enel, EDP, SSE: no accesibles; 2) Stock Analysis: sin búsqueda disponible por límite; 3) informe de Endesa del repo: solo Endesa", "decision": "Omitido"},
  {"seccion": "esg", "campo": "calificaciones ESG", "tipo": "Complemento", "intentos": "1) MSCI; 2) Sustainalytics; 3) informe de sostenibilidad: no accesibles", "decision": "Omitido"},
 ],
}
w("B.json", B)

# ---------------- C. Equipo y gobierno ----------------
fC = [
 F(1, "Los accionistas respaldan masivamente la gestión y la estrategia de Iberdrola en la Junta del 125 aniversario", "Iberdrola", "Primaria", "2026-05-29", "https://www.iberdrola.com/documents/20125/5965887/260529-accionistas-respaldan-masivamente-gestion-estrategia-iberdrola-junta-125-aniversario.pdf"),
 F(2, "Iberdrola avala la hoja de ruta de Galán con un 97,88 % de apoyo medio", "Estrategias de Inversión", "Prensa", "2026-05-29", "https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/iberdrola-avala-la-hoja-de-ruta-de-galan-con-un-n-921799"),
 F(3, "Junta General 2026: resultado de las votaciones", "Iberdrola", "Primaria", "2026-05-29", "https://www.iberdrola.com/documents/20125/5614659/jga26-resultado-votaciones.pdf"),
 F(4, "Junta General 2026: número total de acciones y derechos de voto (6.757.845.603 acciones)", "Iberdrola", "Primaria", "2026-05", "https://www.iberdrola.com/documents/20125/5614659/jga26-numero-total-acciones-derechos-voto.pdf"),
 F(5, "Resultados de Iberdrola: se elevan las previsiones para 2026", "Morningstar", "Analistas", "2026-04-30", "https://global.morningstar.com/es/acciones/resultados-de-iberdrola-se-elevan-las-previsiones-para-2026"),
]
C = {
 "_estado": "parcial (sin IAGC ni IARC)",
 "directivos": {
  "equipo": [
   {"nombre": "Ignacio S. Galán", "cargo": "Presidente ejecutivo", "desde": "2001", "participacion_pct": None, "trayectoria": "Primer ejecutivo desde 2001 y presidente desde 2006; llevó a Iberdrola de eléctrica española a la mayor de Europa por capitalización (más de 125.000 M) [B4, B7]."},
   {"nombre": "Pedro Azagra", "cargo": "Consejero delegado", "desde": "2025", "participacion_pct": None, "trayectoria": "Sustituyó a Armando Martínez en junio de 2025; antes, consejero delegado de Avangrid y responsable de desarrollo corporativo; la Junta de 2026 ratificó su nombramiento [1, 2]."},
  ],
  "historial_guidance": [
   {"anio": "2025", "guia": "Beneficio neto ajustado > 6.200 M (sin costes pasados de EE. UU.)", "real": "6.231 M ajustado (+10,5 %)", "cumplida": "Sí"},
   {"anio": "2026", "guia": "Beneficio neto ajustado > +6 %, elevada a > +8 % en abril", "real": "1S26: +7,8 % ajustado; guía reiterada", "cumplida": "Parcial"},
  ],
  "comentario": "Equipo estable y con historial de cumplimiento: la guía de 2025 se superó y la de 2026 se subió en abril [A, 5]. El riesgo es de sucesión: el presidente ejecutivo lleva 25 años y concentra el poder; el relevo del consejero delegado en 2025 (Azagra, de Avangrid) dibuja la sucesión, pero Galán sigue siendo ejecutivo.",
  "confianza": "Media",
 },
 "gobierno": {
  "consejo": [
   {"nombre": "Ignacio S. Galán", "cargo": "Presidente ejecutivo", "tipo": "Ejecutivo", "desde": "2001", "comisiones": None},
   {"nombre": "Pedro Azagra", "cargo": "Consejero delegado", "tipo": "Ejecutivo", "desde": "2025", "comisiones": None},
   {"nombre": "María Ángeles Alcalá Díaz", "cargo": "Consejera", "tipo": "Independiente", "desde": None, "comisiones": None},
   {"nombre": "Isabel García Tejerina", "cargo": "Consejera", "tipo": "Independiente", "desde": None, "comisiones": None},
   {"nombre": "Anthony L. Gardner", "cargo": "Consejero", "tipo": "Independiente", "desde": None, "comisiones": None},
   {"nombre": "Marina Grossi", "cargo": "Consejera", "tipo": "Independiente", "desde": "2026", "comisiones": None},
  ],
  "presidente_ceo_separados": True, "presidente_ejecutivo": True, "consejero_coordinador": True, "una_accion_un_voto": False,
  "operaciones_vinculadas_relevantes": False, "variable_ligado_rentabilidad": None, "auditoria_independiente": None, "insiders_sin_operaciones": None,
  "accionista_control": False, "presidente_vinculado_control": False, "cambios_cupula_24m": 1,
  "voto_remuneracion_pct": None, "voto_remuneracion_contra_pct": None, "voto_remuneracion_contra_libre_pct": None, "voto_cupula_pct": None,
  "remuneracion_ceo": None,
  "remuneracion": None,
  "accionistas": [
   {"nombre": "Autocartera amortizada", "pct": None, "tipo": "Autocartera", "variacion": "182,8 M de acciones amortizadas el 30-jun-2026 [A22]"},
  ],
  "insiders": [],
  "control_y_defensas": "Capital disperso sin accionista de control. Los estatutos de Iberdrola limitan los derechos de voto de un mismo accionista (límite estatutario del 10 %): no rige el principio de una acción, un voto. El presidente es ejecutivo desde hace 25 años; la separación de funciones con el consejero delegado es reciente. La Junta de 2026 aprobó todos los puntos con un apoyo medio del 97,88 % [2, 3].",
  "alertas": ["Presidente ejecutivo con 25 años en la cúpula y sucesión todavía sin cerrar.", "Límite estatutario de voto (10 %), defensa frente a una OPA."],
  "confianza": "Baja",
 },
 "fuentes": fC,
 "huecos": [
  {"seccion": "gobierno", "campo": "IAGC e IARC (comisiones, remuneración, votos de remuneración, accionistas significativos)", "tipo": "Núcleo", "intentos": "1) CNMV e iberdrola.com: no accesibles en este entorno; 2) búsqueda web de participaciones significativas (Qatar, Norges, BlackRock): sin resultado con cifra; 3) acta de la Junta 2026: solo apoyo medio 97,88 %", "decision": "Omitido"},
  {"seccion": "gobierno", "campo": "operaciones de directivos 12 meses", "tipo": "Complemento", "intentos": "1) CNMV: no accesible; 2) prensa: sin resultado; 3) agregadores: no consultados por límite de búsquedas", "decision": "Omitido"},
 ],
}
w("C.json", C)

# ---------------- D. Mercado y valoración ----------------
fD = [
 F(1, "Cotización de Iberdrola (cierre del 13-oct-2026: 21,68 €; rango 21,56-21,93 €)", "Bolsamanía", "Datos de mercado", "2026-10-13", "https://www.bolsamania.com/accion/IBERDROLA"),
 F(2, "Dónde invertir en bolsa hoy (cierre del Ibex el 13-oct-2026)", "El Español / Invertia", "Prensa", "2026-10-14", "https://www.elespanol.com/invertia/mercados/20261014/invertir-bolsa-hoy-valores-aprovechar-reaccion-alcista/1003744419222_0.html"),
 F(3, "Iberdrola: así abre la cotización hoy (máximo y mínimo de 52 semanas 21,41 € y 17,88 €)", "El Cronista", "Datos de mercado", "2026-08-04", "https://www.cronista.com/espana/ibex-euro/iberdrola-asi-abre-la-cotizacion-hoy-martes-04-de-agosto-cuanto-rinden-los-dividendos/"),
 F(4, "Iberdrola (IBE): consenso de 23 analistas (objetivo medio 20,51 €, 17,30-23,50 €; 6 comprar, 16 mantener, 1 vender)", "Investing.com", "Analistas", "2026-08", "https://mx.investing.com/equities/iberdrola"),
 F(5, "Iberdrola afronta octubre con una valoración exigente (consenso mantener, objetivo 20 €)", "DailyForex", "Analistas", "2026-10", "https://es.dailyforex.com/stock-market-today/2026/10/iberdrola-afronta-octubre-con-una-valoracion-exigente-2026/250300"),
 F(6, "Iberdrola, S.A.: consenso (ventas 45.710 / 46.710 M y beneficio 6.730 / 7.080 M en 2026-2027; PER 20,3x / 19,5x)", "MarketScreener", "Analistas", "2026-07", "https://ca.marketscreener.com/quote/stock/IBERDROLA-S-A-4007481/"),
 F(7, "Bank of America mejora sus previsiones para Iberdrola (beneficio ajustado 2026e 6.740 M)", "Capital Bolsa", "Analistas", "2026-04-30", "https://www.bolsamania.com/capitalbolsa/noticias/empresas/bank-of-america-mejora-sus-previsiones-para-iberdrola-tras-un-trimestre-mas-fuerte-de-lo-esperado--22392665.html"),
 F(8, "Iberdrola: datos históricos de cotización (cierres de 2019-2024)", "Traders Union", "Datos de mercado", "2026", "https://tradersunion.com/currencies/price-history/ibe-eur/"),
 F(9, "Rendimiento del Bund a 10 años (12-oct-2026), serie BBSIS (vía informe de Endesa de este repositorio)", "Deutsche Bundesbank", "Primaria", "2026-10-12", "https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z"),
 F(10, "Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026", "Damodaran (NYU Stern)", "Datos de mercado", "2026-10", "https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx"),
 F(11, "Comparables de eléctricas europeas (Endesa, Naturgy, Redeia, Enel, EDP, Engie, E.ON, SSE) del informe de Endesa de este repositorio (14-oct-2026)", "Repositorio", "Datos de mercado", "2026-10-14", "informes/endesa-2026-10-14/datos.json"),
 F(12, "Opinión y relación de analistas (Santander mantener 18,10 €; UBS comprar 21,40 €)", "Iberdrola", "Primaria", "2026", "https://www.iberdrola.com/accionistas-inversores/inversores/opinion-analistas"),
 F(13, "Iberdrola, rumbo a nuevos máximos en el Ibex 35 tras sus resultados de 2025 (Bankinter, objetivo 21,50 €)", "Estrategias de Inversión", "Prensa", "2026-02-26", "https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/iberdrola-rumbo-a-nuevos-maximos-en-el-ibex-35-n-893753"),
 F(14, "Iberdrola, potencial de doble dígito (Renta 4: PER medio de 5 años 15,5x)", "Estrategias de Inversión", "Prensa", "2025", "https://www.estrategiasdeinversion.com/analisis/los-brokers-recomiendan/recomendaciones-espana/iberdrola-potencial-en-bolsa-de-doble-digito-para-n-851637"),
 F(15, "Iberdrola: fecha de resultados (21-oct-2026, antes de la apertura)", "TipRanks", "Datos de mercado", "2026-10", "https://www.tipranks.com/stocks/it:1ibe/statistics"),
 F(16, "Iberdrola (BME:IBE) After Strong Half Year Results Still Looks Fully Valued", "Simply Wall St / Webull", "Analistas", "2026-08", "https://www.webull.com/news/15328938668532736"),
 F(17, "Iberdrola Valuation Multiples (EV/EBITDA LTM 12,7x, 6-may-2026)", "MarketInOut", "Datos de mercado", "2026-05-06", "https://www.marketinout.com/stock/es/ibe"),
]
D_ = {
 "_estado": "completo con huecos (sin bolsa.mjs)",
 "identificacion": {
  "nombre": "Iberdrola, S.A.", "nombre_corto": "Iberdrola", "ticker": "IBE.MC", "isin": "ES0144580Y14", "mercado": "Bolsa de Madrid (SIBE)", "indice_referencia": "IBEX 35",
  "pais": "España", "pais_iso": "ES", "sector": "Utilities", "industria": "Electric Utilities", "sede": "Bilbao", "fundacion": "1992", "empleados": None, "web": "www.iberdrola.com",
  "precio": 21.68, "fecha_precio": "2026-10-13", "acciones": 6673.1, "capitalizacion_publicada": None, "free_float_pct": None,
  "max_52s": 21.93, "min_52s": 17.88, "volumen_medio_diario": None, "proximos_resultados": "2026-10-21",
 },
 "consenso": {
  "guidance": "2026: beneficio neto ajustado con crecimiento superior al 8 % sin plusvalías de rotación (elevada desde > 6 % en abril y reiterada en julio) [A9, A6]. Plan 2025-2028 (24-sep-2025): 58.000 M de inversión, beneficio neto ajustado de ≈7.600 M en 2028, pay-out del 65-75 % y ≈20.000 M de dividendos en 2024-2028; en 2026 la empresa dijo esperar superar esos objetivos [B1, B2, 4].",
  "estimaciones": [
   {"periodo": "2026e", "ingresos": 45710, "ebitda": None, "ebit": None, "bpa": None, "dpa": None, "fuente": "MarketScreener, julio de 2026 [6]"},
   {"periodo": "2027e", "ingresos": 46710, "ebitda": None, "ebit": None, "bpa": None, "dpa": None, "fuente": "MarketScreener, julio de 2026 [6]"},
  ],
  "recomendaciones": {"n_analistas": 23, "comprar": 6, "mantener": 16, "vender": 1, "po_medio": 20.51, "po_min": 17.30, "po_max": 23.50},
  "revisiones": "Las estimaciones de beneficio han subido en 2026: Bank of America elevó en abril su beneficio ajustado de 2026 a 6.740 M (+8,1 %) [7]; MarketScreener recoge 6.730 M para 2026 y 7.080 M para 2027 [6]. El objetivo medio (≈20-20,5 €) ha quedado por debajo del precio: la acción ha subido más que las revisiones [4, 5]. Solo hay una fuente gratuita con estimaciones: el BPA del consenso es el beneficio de MarketScreener dividido entre las acciones de hoy (estimación propia).",
  "base_ebitda": "NIIF", "ajuste_ebitda_pct_ventas": None,
  "confianza": "Media",
 },
 "bolsa": {
  "tipo_rentabilidad": "de precio (sin dividendos)",
  "rentabilidades": [],
  "anual": [
   {"anio": "2021", "accion_pct": -11.0, "indice_pct": None},
   {"anio": "2022", "accion_pct": 5.0, "indice_pct": None},
   {"anio": "2023", "accion_pct": 8.6, "indice_pct": None},
   {"anio": "2024", "accion_pct": 12.0, "indice_pct": None},
   {"anio": "2025", "accion_pct": 39.1, "indice_pct": 49.0},
  ],
  "beta": None, "volatilidad_pct": None, "max_drawdown_pct": None, "posicion_corta_pct": None,
  "comentario": "La acción pasó de 10,41 € a cierre de 2021 a 13,30 € en 2024 [8] y a ≈18,5 € en 2025 (≈+40 %, estimación con la capitalización de 125.000 M de enero de 2026 [B7]), por detrás del IBEX (+49 % en 2025, empujado por los bancos). En 2026 sube otro ≈17 % hasta 21,68 € (13-oct) [1], máximos históricos, con el mercado pagando el giro a redes reguladas en Reino Unido y EE. UU. Las rentabilidades de los índices no se pudieron obtener en este entorno.",
  "confianza": "Baja",
 },
 "multiplos_historicos": {
  "serie": [
   {"anio": "2021", "precio_cierre": 10.41, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2022", "precio_cierre": 10.93, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2023", "precio_cierre": 11.87, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2024", "precio_cierre": 13.30, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2025", "precio_cierre": 18.50, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
  ],
  "comentario": None,
  "confianza": "Media",
 },
 "comparables": {
  "criterio": "Eléctricas integradas europeas con redes reguladas (Endesa, Enel, EDP, Naturgy, Engie, E.ON, SSE) y una red pura española (Redeia), tomadas del informe de Endesa de este repositorio del mismo día [11]: Endesa, Naturgy y Redeia con todas sus cifras; el resto solo con el PER previsto de agregadores (mayo-septiembre de 2026). National Grid, el comparable más directo en redes británicas y estadounidenses, no se pudo cotejar en este entorno.",
  "empresas": [
   {"nombre": "Endesa", "ticker": "ELE.MC", "pais": "ES", "capitalizacion": 43288, "ev_ventas": 2.55, "ev_ebitda_ltm": 8.7, "ev_ebitda_ntm": 9.1, "per_ntm": 18.3, "crecimiento_pct": 1.0, "margen_ebitda_pct": 29.2, "roic_pct": 13.4, "dn_ebitda": 1.6, "fcf_yield_pct": 4.6},
   {"nombre": "Naturgy", "ticker": "NTGY.MC", "pais": "ES", "capitalizacion": 27264, "ev_ventas": 2.02, "ev_ebitda_ltm": 7.2, "ev_ebitda_ntm": 7.3, "per_ntm": 13.9, "crecimiento_pct": 0.8, "margen_ebitda_pct": 27.4, "roic_pct": None, "dn_ebitda": 2.3, "fcf_yield_pct": 8.7},
   {"nombre": "Redeia", "ticker": "RED.MC", "pais": "ES", "capitalizacion": 7941, "ev_ventas": 7.81, "ev_ebitda_ltm": 10.4, "ev_ebitda_ntm": 10.0, "per_ntm": 15.9, "crecimiento_pct": 5.3, "margen_ebitda_pct": 75.8, "roic_pct": None, "dn_ebitda": 4.4, "fcf_yield_pct": 5.0},
   {"nombre": "Enel", "ticker": "ENEL.MI", "pais": "IT", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 13.4, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "EDP", "ticker": "EDP.LS", "pais": "PT", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 16.7, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "Engie", "ticker": "ENGI.PA", "pais": "FR", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 13.9, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "E.ON", "ticker": "EOAN.DE", "pais": "DE", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 16.4, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "SSE", "ticker": "SSE.L", "pais": "GB", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 13.5, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
  ],
  "comentario": None,
  "confianza": "Baja",
 },
 "transacciones": {
  "operaciones": [
   {"fecha": "2026-07", "objetivo": "Caruna (80 %, distribución eléctrica en Finlandia)", "comprador": "Iberdrola", "ev": 5000, "ev_ventas": None, "ev_ebitda": None, "prima_pct": None, "excluir": False, "comentario": "Valor de 5.000 M con deuda asumida, al 100 % [A8]."},
   {"fecha": "2025-07", "objetivo": "Neoenergia (30,3 %)", "comprador": "Iberdrola", "ev": None, "ev_ventas": None, "ev_ebitda": None, "prima_pct": None, "excluir": False, "comentario": "1.897 M por el 30,3 % comprado a Previ [A24]."},
   {"fecha": "2024", "objetivo": "Electricity North West (88 %)", "comprador": "Iberdrola", "ev": None, "ev_ventas": None, "ev_ebitda": None, "prima_pct": None, "excluir": False, "comentario": "Parte de los ≈5.000 M de operaciones corporativas de 2024 con los minoritarios de Avangrid [A11]."},
   {"fecha": "2026", "objetivo": "Negocio de Iberdrola en México", "comprador": "Cox", "ev": None, "ev_ventas": None, "ev_ebitda": None, "prima_pct": None, "excluir": False, "comentario": "Plusvalía neta de 953 M en el 1S26 [A6]."},
  ],
  "comentario": "Iberdrola es compradora, no objetivo: con ≈145.000 M de capitalización y el límite estatutario de voto, una OPA es improbable. Las operaciones del sector se publican como EV/RAB y no hemos podido leer los múltiplos en este entorno.",
  "confianza": "Baja",
 },
 "fuentes": fD,
 "huecos": [
  {"seccion": "identificacion", "campo": "precio del 14-oct (sesión abierta), volumen y flotante", "tipo": "Complemento", "intentos": "1) bolsa.mjs (Yahoo): sin red; 2) búsqueda de la cotización del 14-oct: sin dato de cierre; 3) Bolsamanía: cierre del 13-oct (21,68 €)", "decision": "Calculado y marcado como estimación"},
  {"seccion": "bolsa", "campo": "beta, volatilidad, caída máxima, rentabilidades frente a índices y posición corta", "tipo": "Complemento", "intentos": "1) bolsa.mjs: sin red; 2) TipRanks: betas de 0,13-0,21 incoherentes entre líneas; 3) CNMV: no accesible", "decision": "Omitido"},
  {"seccion": "consenso", "campo": "EBITDA y BPA del consenso por año y estimaciones de 2028", "tipo": "Núcleo", "intentos": "1) MarketScreener: solo ventas, beneficio y PER de 2026-2027; 2) Investing: solo objetivos; 3) prensa: BofA 2026e", "decision": "Omitido"},
  {"seccion": "transacciones", "campo": "múltiplos EV/EBITDA y EV/RAB de las operaciones", "tipo": "Complemento", "intentos": "1) notas de Iberdrola: solo importes; 2) prensa: sin múltiplos; 3) informes de Enagás y Endesa del repo: otras operaciones", "decision": "Omitido"},
 ],
}
w("D.json", D_)

# ---------------- E. Sentimiento ----------------
fE = [
 F(1, "Iberdrola (IBE): foro de inversores", "Rankia", "Foros y redes", "2026-09", "https://www.rankia.co/acciones/iberdrola-ibe/foro?page=3"),
 F(2, "Iberdrola (IBE): seguimiento de acciones (foro)", "Rankia", "Foros y redes", "2026-07", "https://www.rankia.com/foros/bolsa/temas/2003626-iberdrola-ibe-seguimiento-acciones"),
 F(3, "Narrativa comunitaria: las mejoras regulatorias impulsarán la modernización de la red", "Simply Wall St (comunidad)", "Foros y redes", "2026-08", "https://www.simplywall.st/narratives/3uyvw44l-recent-upgrades-and-sector-momentum-will-drive-broader-grid-modernization-efforts"),
 F(4, "Assessing Iberdrola (BME:IBE) valuation after weaker first quarter 2026 earnings", "Simply Wall St", "Foros y redes", "2026-05", "https://simplywall.st/stocks/es/utilities/bme-ibe/iberdrola-shares/news/assessing-iberdrola-bmeibe-valuation-after-weaker-first-quar"),
 F(5, "Iberdrola (MEX:IBE N): Forward Dividend Yield y GF Value («significativamente sobrevalorada»)", "GuruFocus", "Foros y redes", "2026-07", "https://www.gurufocus.com/term/ForwardDividendYield/MEX:IBE N"),
 F(6, "Is IBDRY a Buy or a Sell? The Bull and Bear Case (2026) (con el titular de Seeking Alpha «Iberdrola: Even More Predictability Ahead!»)", "Walnut", "Foros y redes", "2026-10", "https://walnutinvest.com/stocks/ibdry/is-it-a-buy-or-sell"),
 F(7, "Pulso del mercado intradía (hilo general con comentarios sobre Iberdrola)", "Rankia", "Foros y redes", "2026-10", "https://www.rankia.com/foros/bolsa/temas/2629169-pulso-mercado-intradia?page=41160"),
]
E = {
 "_estado": "completo (búsqueda web; Reddit y Stocktwits sin resultados)",
 "sentimiento": {
  "tono": "Dividido", "tendencia": "Estable",
  "revisadas": [
   {"plataforma": "Rankia (foro de Iberdrola)", "fecha": "2026-09", "n_comentarios": 20, "tono": "Positivo", "resumen": "Accionistas de largo plazo contentos con el dividendo flexible y los máximos; varios dudan de comprar a estos precios y esperan un recorte [1, 2]."},
   {"plataforma": "Rankia (pulso del mercado)", "fecha": "2026-10", "n_comentarios": 10, "tono": "Neutro", "resumen": "Iberdrola aparece como valor refugio del IBEX frente a los bancos; poca discusión de fondo [7]."},
   {"plataforma": "Simply Wall St (narrativas de la comunidad)", "fecha": "2026-08", "n_comentarios": 6, "tono": "Dividido", "resumen": "Las narrativas sitúan el valor razonable en 19-20,5 €, por debajo del precio, aunque valoran la visibilidad de las redes [3, 4]."},
   {"plataforma": "GuruFocus y Walnut (resúmenes con Seeking Alpha)", "fecha": "2026-10", "n_comentarios": 5, "tono": "Dividido", "resumen": "GuruFocus la marca como sobrevalorada y con pay-out alto; el artículo de Seeking Alpha citado mantiene «comprar» por la previsibilidad del plan de 58.000 M [5, 6]."},
  ],
  "temas": [
   {"tema": "Valoración en máximos", "postura": "Bajista", "peso": "Alto", "contraste": "Cierto: PER de ≈21x el beneficio de 2026e frente a una mediana histórica de ≈17x y a 14,9x de los comparables [D6, D11]."},
   {"tema": "Previsibilidad de las redes reguladas", "postura": "Alcista", "peso": "Alto", "contraste": "Las redes ya son el 51 % del EBITDA y crecieron un 21 % en 2025 [A4, A5]."},
   {"tema": "Dividendo flexible y dilución", "postura": "Dividida", "peso": "Medio", "contraste": "La dilución se compensa con amortizaciones de autocartera (182,8 M de acciones en junio de 2026) [A22]."},
   {"tema": "Deuda creciente", "postura": "Bajista", "peso": "Bajo", "contraste": "≈54.000 M en junio (+3.790 M en seis meses) con FFO/deuda del 22,4 % [A8]."},
  ],
  "lectura": "El inversor particular sigue a Iberdrola como valor de dividendo y refugio, sin euforia: el debate de los tres últimos meses es si merece la pena comprar en máximos. La preocupación por la valoración coincide con nuestras cifras y con los analistas (objetivo medio por debajo del precio). No anticipa ningún riesgo que el informe no recoja. Reddit y Stocktwits no devolvieron hilos en este entorno.",
  "confianza": "Baja",
 },
 "fuentes": fE,
 "huecos": [
  {"seccion": "sentimiento", "campo": "Reddit, Stocktwits y comentarios de Seeking Alpha", "tipo": "Complemento", "intentos": "1) búsqueda en Reddit (r/eupersonalfinance, r/SpainFIRE): sin hilos; 2) Stocktwits: sin resultados; 3) Seeking Alpha: solo un titular vía agregador", "decision": "Omitido"},
 ],
}
w("E.json", E)
print("notas escritas")

# Construye las notas A-E de Endesa (corte 2026-10-14) a partir de lo leído en los resultados de búsqueda.
# Entorno nube: solo WebSearch. Cada cifra lleva la URL de la página que la publica.
import json, os, re
D = os.path.dirname(os.path.abspath(__file__))

def w(nombre, obj):
    with open(os.path.join(D, nombre), 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)

# ---------------- A. Cuentas ----------------
fA = [
 {"id": 1, "titulo": "Resultados del primer semestre de 2026 (nota de prensa)", "editor": "Endesa", "tipo": "Primaria", "fecha": "2026-07-29", "url": "https://www.endesa.com/es/prensa/sala-de-prensa/noticias/informacion-economica/resultado-primer-semestre-2026"},
 {"id": 2, "titulo": "Resultados 2025 y Plan Estratégico 2026-2028 (nota de prensa)", "editor": "Endesa", "tipo": "Primaria", "fecha": "2026-02-24", "url": "https://www.endesa.com/es/prensa/sala-de-prensa/noticias/informacion-economica/resultados-2025-plan-estrategico-2026-2028"},
 {"id": 3, "titulo": "Endesa (BME:ELE) Income Statement", "editor": "Stock Analysis", "tipo": "Datos de mercado", "fecha": "2026-07-31", "url": "https://stockanalysis.com/quote/bme/ELE/financials/income-statement/"},
 {"id": 4, "titulo": "Endesa (BME:ELE) Balance Sheet", "editor": "Stock Analysis", "tipo": "Datos de mercado", "fecha": "2026-07-31", "url": "https://stockanalysis.com/quote/bme/ELE/financials/balance-sheet/"},
 {"id": 5, "titulo": "Endesa (BME:ELE) Cash Flow Statement", "editor": "Stock Analysis", "tipo": "Datos de mercado", "fecha": "2026-07-31", "url": "https://stockanalysis.com/quote/bme/ELE/financials/cash-flow-statement/"},
 {"id": 6, "titulo": "Endesa balance sheet (pasivo total y patrimonio)", "editor": "TipRanks", "tipo": "Datos de mercado", "fecha": "2026-07", "url": "https://www.tipranks.com/stocks/es:ele/financials/balance-sheet"},
 {"id": 7, "titulo": "Endesa recorta un 71 % sus ganancias en 2023, hasta 742 millones, por el laudo del gas y el impuesto extraordinario", "editor": "Bolsamanía / Europa Press", "tipo": "Prensa", "fecha": "2024-02-27", "url": "https://www.bolsamania.com/noticias_print/empresas/economia-amp-endesa-recorta-un-71-ganancias-en-2023-hasta-742-millones-por-impacto-de-laudo-del-gas-e-impuestazo--16341819.html"},
 {"id": 8, "titulo": "Endesa registra un beneficio neto ordinario de 1.902 millones en 2021", "editor": "Energías Renovables", "tipo": "Prensa", "fecha": "2022-02-23", "url": "https://www.energias-renovables.com/panorama/endesa-registra-un-beneficio-neto-ordinario-de-20220223"},
 {"id": 9, "titulo": "Beneficio neto de 1.404 millones hasta septiembre de 2024", "editor": "Endesa", "tipo": "Primaria", "fecha": "2024-10-30", "url": "https://www.endesa.com/es/prensa/sala-de-prensa/noticias/informacion-economica/beneficio-neto-1404-millones-hasta-septiembre"},
 {"id": 10, "titulo": "Endesa gana 1.888 millones en 2024, un 154 % más", "editor": "Mallorcadiario / Europa Press", "tipo": "Prensa", "fecha": "2025-02-26", "url": "https://www.mallorcadiario.com/endesa-se-forra-gano-1888-millones-2024-154-por-ciento-mas"},
 {"id": 11, "titulo": "Resultados de enero-septiembre de 2025", "editor": "Endesa", "tipo": "Primaria", "fecha": "2025-10-29", "url": "https://www.endesa.com/es/prensa/sala-de-prensa/noticias/informacion-economica/resultados-septiembre-2025"},
 {"id": 12, "titulo": "Endesa dispara un 41,2 % su beneficio hasta junio y eleva su previsión para el año", "editor": "Estrategias de Inversión", "tipo": "Prensa", "fecha": "2026-07-29", "url": "https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/endesa-dispara-un-412-su-beneficio-hasta-junio-n-938959"},
 {"id": 13, "titulo": "Endesa cierra el primer semestre con un beneficio de 1.470 millones (deuda neta y flujo de caja)", "editor": "Energías Renovables", "tipo": "Prensa", "fecha": "2026-07-29", "url": "https://www.energias-renovables.com/panorama/endesa-cierra-el-primer-semestre-con-un-20260729"},
 {"id": 14, "titulo": "Endesa recorta un 9 % sus ganancias a junio de 2024, hasta 800 millones", "editor": "Alicante Plaza / Europa Press", "tipo": "Prensa", "fecha": "2024-07-24", "url": "https://alicanteplaza.es/alicanteplaza/endesarecortaun9susgananciasajuniohastalos800millonesperoreafirmaobjetivospara2024"},
 {"id": 15, "titulo": "Lucro da Endesa sobe 16,4 % em 2025 para 2.198 milhões de euros", "editor": "RTP / Lusa", "tipo": "Prensa", "fecha": "2026-02-24", "url": "https://www.rtp.pt/noticias/economia/lucro-da-endesa-sobe-164-em-2025-para-2198-milhoes-de-euros_n1721205"},
 {"id": 16, "titulo": "Endesa en cifras (2025)", "editor": "Endesa", "tipo": "Primaria", "fecha": "2026", "url": "https://endesa.com/es/sobre-endesa/nuestro-negocio/cifras"},
 {"id": 17, "titulo": "Endesa's 2025 results beat guidance (net debt 10.1 bn, leverage 1.8x, cost of debt 3.3 %)", "editor": "The Corner", "tipo": "Prensa", "fecha": "2026-02-24", "url": "https://thecorner.eu/companies/endesas-results-show-solid-cash-generation-and-allow-year-guidance-to-be-reiterated/121356/"},
 {"id": 18, "titulo": "Endesa gana 1.394 millones en 2020 y propone un dividendo de 2,01 euros", "editor": "Bolsamanía", "tipo": "Prensa", "fecha": "2021-02-24", "url": "https://www.bolsamania.com/noticias/resultados-anuncios/endesa-gana-1394-millones-euros-2020-propone-dividendo-201-euros--7822439.html"},
 {"id": 19, "titulo": "S&P Global mantiene la calificación BBB/A-2 de Endesa", "editor": "Merca2", "tipo": "Prensa", "fecha": "2026-03-21", "url": "https://www.merca2.es/2026/03/21/endesa-spglobal-calificacion-bbb-2361989/"},
 {"id": 20, "titulo": "Anuncio de reducción de capital por amortización de acciones propias (BORME-C-2026-5281)", "editor": "BORME", "tipo": "Primaria", "fecha": "2026-10-01", "url": "https://www.boe.es/borme/dias/2026/10/01/pdfs/BORME-C-2026-5281.pdf"},
 {"id": 21, "titulo": "Capital social", "editor": "Endesa", "tipo": "Primaria", "fecha": "2026-03-28", "url": "https://www.endesa.com/es/accionistas-e-inversores/la-accion/capital-social"},
 {"id": 22, "titulo": "Endesa incrementa su beneficio neto un 10 % (1S22: deuda neta 10.275 M; cierre 2021: 8.806 M)", "editor": "Energías Renovables", "tipo": "Prensa", "fecha": "2022-07-28", "url": "https://www.energias-renovables.com/panorama/endesa-incrementa-su-beneficio-neto-un-10-20220728"},
 {"id": 23, "titulo": "Endesa gana 2.541 millones en 2022, un 77 % más", "editor": "Onda Vasca / Europa Press", "tipo": "Prensa", "fecha": "2023-02-23", "url": "https://www.ondavasca.com/endesa-gana-2-541-millones-en-2022-un-77-mas/"},
 {"id": 24, "titulo": "Endesa: análisis tras el plan 2026-2028 (recompra, dividendo)", "editor": "Renta 4", "tipo": "Analistas", "fecha": "2026-02-25", "url": "https://www.r4.com/articulos-y-analisis/valores/endesa-incremento-de-la-inversion-en-redes-siendo-selectivos-en-renovables"},
 {"id": 25, "titulo": "Endesa paga hoy un dividendo de 1,084 euros por acción", "editor": "Finect", "tipo": "Prensa", "fecha": "2026-07-10", "url": "https://www.finect.com/usuario/davidcarmona/articulos/endesa-paga-hoy-un-dividendo-de-1084-euros-por-accion"},
 {"id": 26, "titulo": "Endesa: estado de salud financiera (patrimonio 9,57 bn)", "editor": "Simply Wall St", "tipo": "Datos de mercado", "fecha": "2026", "url": "https://simplywall.st/stocks/es/utilities/bme-ele/endesa-shares/health"},
]

cuenta = [
 dict(periodo="2021", ingresos=20899, coste_ventas=None, gastos_generales=None, ebitda=4278, amortizaciones=2322, ebit=1956, resultado_financiero=-32, bai=1924, impuestos=489, minoritarios=None, beneficio_neto=1435, gastos_financieros=177, participadas_en_ebitda=None, no_recurrentes_en_ebitda=None, bpa=1.36, dpa=1.437, dpa_extraordinario=0, acciones_diluidas=1058.8),
 dict(periodo="2022", ingresos=32896, coste_ventas=None, gastos_generales=None, ebitda=5565, amortizaciones=1878, ebit=3687, resultado_financiero=-200, bai=3487, impuestos=946, minoritarios=None, beneficio_neto=2541, gastos_financieros=343, participadas_en_ebitda=None, no_recurrentes_en_ebitda=None, bpa=2.40, dpa=1.585, dpa_extraordinario=0, acciones_diluidas=1058.8),
 dict(periodo="2023", ingresos=25459, coste_ventas=None, gastos_generales=None, ebitda=3777, amortizaciones=2132, ebit=1645, resultado_financiero=-580, bai=1065, impuestos=323, minoritarios=None, beneficio_neto=742, gastos_financieros=705, participadas_en_ebitda=None, no_recurrentes_en_ebitda=None, bpa=0.70, dpa=1.00, dpa_extraordinario=0, acciones_diluidas=1058.8),
 dict(periodo="2024", ingresos=21307, coste_ventas=None, gastos_generales=None, ebitda=5293, amortizaciones=2222, ebit=3071, resultado_financiero=-482, bai=2589, impuestos=701, minoritarios=None, beneficio_neto=1888, gastos_financieros=639, participadas_en_ebitda=None, no_recurrentes_en_ebitda=None, bpa=1.78, dpa=1.318, dpa_extraordinario=0, acciones_diluidas=1060.0),
 dict(periodo="2025", ingresos=21424, coste_ventas=None, gastos_generales=None, ebitda=5756, amortizaciones=2425, ebit=3331, resultado_financiero=-416, bai=2915, impuestos=681, minoritarios=36, beneficio_neto=2198, gastos_financieros=544, participadas_en_ebitda=None, no_recurrentes_en_ebitda=None, bpa=2.10, dpa=1.584, dpa_extraordinario=0, acciones_diluidas=1047.0),
]

A = {
 "_estado": "completo (búsqueda web; sin documentos abiertos)",
 "financieros": {
  "cuenta": cuenta,
  "ltm": {"periodo": "LTM jun-26", "fecha_fin": "2026-06-30", "ingresos": 21539, "ebitda": 6296, "ebit": None, "beneficio_neto": 2627, "bpa": None, "dpa": 1.584, "dpa_extraordinario": 0, "fcf": 2010, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None},
  "cambios_perimetro": [],
  "comentario": "Ingresos de 20.899 M en 2021, 32.896 M en 2022 (precios mayoristas de la crisis energética), 25.459 M en 2023, 21.307 M en 2024 y 21.424 M en 2025 [3]: la línea de ventas sigue al precio de la energía y no mide la actividad. El EBITDA pasó de 4.278 M en 2021 [8] a 5.565 M en 2022 y cayó a 3.777 M en 2023 por el laudo del contrato de gas con Sonatrach y el gravamen temporal sobre las energéticas [7]; se recuperó a 5.293 M en 2024 [10] y a 5.756 M en 2025 (+8,7 %) [16, 15]. En el 1S26 el EBITDA subió un 20 %, hasta 3.240 M, con las redes ya en el 36 % del total (1.200 M, +24 %) [1, 12]. El beneficio neto ordinario fue de 1.902 M en 2021 [8], 2.398 M en 2022, 951 M en 2023 [7], 1.993 M en 2024 [10] y 2.351 M en 2025 [2]; el contable de 2025, 2.198 M [15].",
  "ajustes": "Endesa publica un «beneficio neto ordinario» que excluye deterioros, plusvalías y otros extraordinarios y es la base del dividendo (pay-out mínimo del 70 %) [2, 24]. La diferencia con el contable fue de −467 M en 2021 (ordinario 1.902 frente a 1.435) [8, 3], +143 M en 2022 [23], −209 M en 2023 (laudo del gas) [7], −105 M en 2024 [10] y −153 M en 2025 (2.351 frente a 2.198) [2, 15]. En el 1S26 el ordinario (1.480 M) quedó ligeramente por encima del contable (1.470 M) [12]. La cuenta se toma de Stock Analysis (ingresos, resultado de explotación, BAI y beneficio) y el EBITDA de las notas de la empresa; las amortizaciones son la diferencia, e incluyen deterioros y dotaciones de provisiones.",
  "confianza": "Media"
 },
 "trimestres": {
  "items": [
   {"periodo": "1S24", "ingresos": 10416, "crecimiento_pct": -20.6, "crecimiento_organico_pct": None, "ebitda": 2413, "margen_ebitda_pct": 23.2, "bpa": None, "vs_consenso": None},
   {"periodo": "2S24", "ingresos": 10891, "crecimiento_pct": None, "crecimiento_organico_pct": None, "ebitda": 2880, "margen_ebitda_pct": 26.4, "bpa": None, "vs_consenso": None},
   {"periodo": "1S25", "ingresos": 10880, "crecimiento_pct": 4.5, "crecimiento_organico_pct": None, "ebitda": 2700, "margen_ebitda_pct": 24.8, "bpa": None, "vs_consenso": None},
   {"periodo": "2S25", "ingresos": 10544, "crecimiento_pct": -3.2, "crecimiento_organico_pct": None, "ebitda": 3056, "margen_ebitda_pct": 29.0, "bpa": None, "vs_consenso": None},
   {"periodo": "1S26", "ingresos": 10995, "crecimiento_pct": 1.1, "crecimiento_organico_pct": None, "ebitda": 3240, "margen_ebitda_pct": 29.5, "bpa": None, "vs_consenso": "Superior"}
  ],
  "ultima_presentacion": "En los resultados del 1S26 (29-jul-2026) la dirección subió la guía de beneficio neto ordinario de 2026 a «más de 2.400 M», desde 2.300-2.400 M en febrero, tras un EBITDA de 3.240 M (+20 %) y un beneficio ordinario de 1.480 M (+42 %) [1, 12]. El mensaje cambió de tono frente a febrero: entonces el peso estaba en el plan de inversión de 10.600 M (5.500 M en redes) condicionado a un real decreto que eleve el límite de inversión en distribución [2]; en julio, en que las actividades reguladas ya dan cerca del 50 % del EBITDA y en que la recompra va según el calendario (1.100 M ejecutados y un nuevo tramo de 500 M) [13]. Lo que no despejó: cuánto del salto del semestre es repetible (la propia empresa admite impactos extraordinarios positivos) y qué pasa con la inversión en redes si el decreto no llega. Fue además la primera presentación del nuevo consejero delegado, Gianni Vittorio Armani, que sustituyó a José Bogas el 28-abr-2026. Los semestres de 2S24 y 2S25 se obtienen restando el primer semestre del año; el EBITDA del 1S25 (2.700 M) se deriva del +20 % del 1S26.",
  "confianza": "Media"
 },
 "balance": {
  "historico": [
   {"periodo": "2021", "activo_total": 39968, "activo_corriente": 11652, "pasivo_corriente": 15822, "pasivo_total": 34420, "fondo_comercio": 462, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": None, "deuda_financiera": 8806, "arrendamientos": 0, "patrimonio_neto": 5548, "minoritarios": None, "reservas": None},
   {"periodo": "2022", "activo_total": 50067, "activo_corriente": 19925, "pasivo_corriente": 20682, "pasivo_total": 44200, "fondo_comercio": 462, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": None, "deuda_financiera": 10900, "arrendamientos": 0, "patrimonio_neto": 5867, "minoritarios": None, "reservas": None},
   {"periodo": "2023", "activo_total": 41283, "activo_corriente": 12458, "pasivo_corriente": 14575, "pasivo_total": 34080, "fondo_comercio": 462, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": None, "deuda_financiera": 10400, "arrendamientos": 0, "patrimonio_neto": 7203, "minoritarios": None, "reservas": None},
   {"periodo": "2024", "activo_total": 37345, "activo_corriente": 9113, "pasivo_corriente": 8970, "pasivo_total": 28290, "fondo_comercio": 462, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 840, "deuda_financiera": 10140, "arrendamientos": 0, "patrimonio_neto": 9055, "minoritarios": None, "reservas": None},
   {"periodo": "2025", "activo_total": 37482, "activo_corriente": 8363, "pasivo_corriente": 9008, "pasivo_total": 27872, "fondo_comercio": 607, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": None, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 195, "deuda_financiera": 10305, "arrendamientos": 0, "patrimonio_neto": 9610, "minoritarios": None, "reservas": None}
  ],
  "vencimientos": [],
  "liquidez": "Caja de 195 M a diciembre de 2025 [4]; la empresa se apoya en líneas comprometidas y en la financiación intragrupo de Enel, cuyo importe disponible no aparece en las fuentes consultadas.",
  "rating": "S&P: BBB / A-2, perspectiva positiva (reafirmado el 21-mar-2026, tras el plan 2026-2028) [19]",
  "coste_deuda_pct": 3.2,
  "vida_media_anios": None,
  "otros_pasivos": "Endesa tiene provisiones relevantes que no son deuda financiera pero se le parecen: los planes de reducción de plantilla (expedientes y acuerdos de suspensión de contrato), las obligaciones por pensiones y el desmantelamiento de las centrales nucleares y térmicas. Las cuentas que las cuantifican no se pudieron abrir en este entorno, así que el puente no las suma y lo dice como hueco. S&P avisa de que el colchón financiero se estrecha por la inversión y la remuneración al accionista (dividendo con pay-out ≥ 70 % y recompra de 2.000 M), aunque mantiene la perspectiva positiva [19].",
  "comentario": "La deuda financiera neta pasó de 6.853 M en 2020 a 8.806 M en 2021 y a ≈10.900 M en 2022 (garantías y circulante de la crisis de precios) [22, 7], bajó a 10.400 M en 2023 [7] y a 9.300 M en 2024 [10], y volvió a subir a 10.110 M en 2025 [17] y a 10.305 M en junio de 2026 [13] por la recompra y el dividendo. El apalancamiento sobre EBITDA cayó de 2,8 veces en 2023 [9] a 1,8 veces en 2024-2025 y 1,6 veces en junio de 2026 [13]; el coste medio de la deuda, al 3,2 % [13]. La deuda financiera del histórico es la deuda neta de la empresa más la caja cuando se conoce (2024-2025); 2021-2023 solo como deuda neta. Incluye los arrendamientos, por eso esa columna va a cero.",
  "confianza": "Media"
 },
 "flujos": {
  "historico": [
   {"periodo": "2021", "flujo_operativo": 2621, "capex": 2082, "pagos_arrendamientos": 0, "adquisiciones": None, "desinversiones": None, "dividendos": None, "recompras": 0, "emision_acciones": 0, "intereses_en_financiacion": 0},
   {"periodo": "2022", "flujo_operativo": 1672, "capex": 2132, "pagos_arrendamientos": 0, "adquisiciones": None, "desinversiones": None, "dividendos": None, "recompras": 0, "emision_acciones": 0, "intereses_en_financiacion": 0},
   {"periodo": "2023", "flujo_operativo": 4697, "capex": 2284, "pagos_arrendamientos": 0, "adquisiciones": None, "desinversiones": None, "dividendos": None, "recompras": 0, "emision_acciones": 0, "intereses_en_financiacion": 0},
   {"periodo": "2024", "flujo_operativo": 3567, "capex": 1846, "pagos_arrendamientos": 0, "adquisiciones": None, "desinversiones": None, "dividendos": None, "recompras": 0, "emision_acciones": 0, "intereses_en_financiacion": 0},
   {"periodo": "2025", "flujo_operativo": 4051, "capex": 1844, "pagos_arrendamientos": 0, "adquisiciones": None, "desinversiones": None, "dividendos": None, "recompras": None, "emision_acciones": 0, "intereses_en_financiacion": 0}
  ],
  "comentario": "El flujo operativo fue de 2.621 M en 2021, 1.672 M en 2022 (garantías y circulante de la crisis energética), 4.697 M en 2023 (devolución de ese circulante), 3.567 M en 2024 y 4.051 M en 2025 [5, 10]; en los doce meses a junio de 2026, 3.967 M [5]. La inversión del estado de flujos según Stock Analysis (1.844 M en 2025) es menor que la inversión bruta que comunica la empresa (≈3.200 M en 2025, el 77 % en redes y renovables) [5, 15], porque la segunda incluye intangibles, costes de captación de clientes y la inversión financiada por terceros: el DCF usa la cifra de la empresa y del plan (10.600 M en 2026-2028) [2], no la del proveedor. Con la inversión del plan, la caja libre después de dividendos queda cerca de cero y la recompra se financia con deuda, como muestra la subida de la deuda neta en 2025-2026.",
  "confianza": "Media"
 },
 "calidad": {
  "auditor": None, "anios_auditor": None, "opinion": None,
  "comentario": "No se pudieron abrir las cuentas auditadas (solo búsqueda web), así que no hay lectura propia de las notas. Lo que sí se ve: (1) la empresa gestiona con un beneficio «ordinario» que excluye extraordinarios en ambos sentidos (laudo del gas en 2023, deterioros en 2021 y 2025), con diferencias de 100-470 M al año frente al contable; (2) el EBITDA de 2022-2023 está movido por el gas y por el gravamen temporal, y no es comparable; (3) el balance encoge de 50.067 M en 2022 a 37.482 M en 2025 al deshacerse los derivados y garantías de la crisis [4]. Los indicadores del motor (Altman, Piotroski, Beneish) se calculan con huecos de circulante y deben leerse con cautela en una eléctrica con derivados de energía.",
  "senales": [
   {"senal": "Beneficio ordinario frente a contable", "nivel": "Media", "comentario": "La empresa reparte sobre el ordinario; la diferencia fue de −467 M en 2021 y de −153 M en 2025 [8, 2, 15]."},
   {"senal": "Inversión del estado de flujos muy inferior a la comunicada", "nivel": "Baja", "comentario": "1.844 M frente a ≈3.200 M en 2025: diferencia de perímetro (intangibles, captación de clientes), no un problema contable, pero la caja libre de los agregadores sale inflada [5, 15]."}
  ],
  "confianza": "Baja"
 },
 "capital": {
  "politica": "Pay-out mínimo del 70 % del beneficio neto ordinario en 2026-2028, con un crecimiento del dividendo por acción de en torno al 4 % anual [2, 24]; con cargo a 2025 se repartieron 1,584 € por acción (0,50 a cuenta en enero y 1,084 complementario el 10-jul-2026), un 20 % más que en 2024 [25]. Recompra de 2.000 M hasta 2027 en tramos de 500 M: 1.100 M ejecutados a junio de 2026 y un nuevo tramo de 500 M lanzado [13]; un sexto tramo de 500 M está anunciado, sujeto a la junta. Las acciones compradas se amortizan: 17,0 M en marzo de 2026 (capital de 1.041,7 M de acciones) [21] y la reducción de los tramos tercero y cuarto acordada el 29-sep-2026 (hasta 87,97 M de acciones autorizadas) [20]. Apalancamiento máximo de 2,5 veces la deuda neta sobre EBITDA.",
  "adquisiciones": [],
  "comentario": "La asignación de capital de los últimos dos años ha sido favorable al accionista: dividendo +20 % en 2025 y una recompra del 4-5 % del capital financiada con deuda, a la vez que la inversión en redes sube. El coste es la holgura del balance (deuda neta de 9.300 M a 10.305 M en 18 meses) [10, 13]. El motor no dispone de los dividendos pagados por año (hueco), así que el acumulado de usos de la caja sale incompleto.",
  "confianza": "Media"
 },
 "fuentes": fA,
 "huecos": [
  {"seccion": "balance", "campo": "existencias, clientes, proveedores, inmovilizado, intangibles y reservas 2021-2025; caja 2021-2023", "tipo": "Núcleo", "intentos": "1) Informe anual 2025 en endesa.com y CNMV: no accesibles (solo búsqueda web); 2) Stock Analysis y TipRanks vía búsqueda: solo activo total, corriente, pasivo corriente y fondo de comercio; 3) Simply Wall St y Google Finance: solo patrimonio y caja de 2025", "decision": "Omitido"},
  {"seccion": "flujos", "campo": "dividendos pagados, recompras y adquisiciones por año", "tipo": "Complemento", "intentos": "1) Estado de flujos de Stock Analysis vía búsqueda: el extracto se corta antes de la financiación; 2) Stockopedia: valores vacíos; 3) notas de prensa: solo dividendo por acción", "decision": "Omitido"},
  {"seccion": "balance", "campo": "vencimientos y vida media de la deuda", "tipo": "Complemento", "intentos": "1) Informe anual: no accesible; 2) presentación de resultados: no accesible; 3) prensa: solo coste medio (3,2 %)", "decision": "Omitido"},
  {"seccion": "calidad", "campo": "auditor y opinión", "tipo": "Complemento", "intentos": "1) Informe anual: no accesible; 2) IAGC: no accesible; 3) prensa: sin mención", "decision": "Omitido"},
  {"seccion": "financieros", "campo": "minoritarios 2021-2024 (incluidos en impuestos) e impuestos separados", "tipo": "Complemento", "intentos": "1) Stock Analysis: el extracto se corta antes de la línea de impuestos; 2) TipRanks: columnas ambiguas; 3) prensa: no los da", "decision": "Calculado y marcado como estimación"}
 ]
}
w("A.json", A)

# ---------------- B. Sector y competencia ----------------
fB = [
 {"id": 1, "titulo": "La CNMC ejecuta un recorte sin precedentes (circulares de retribución de redes 2026-2031, tasa del 6,58 %)", "editor": "Energías Renovables", "tipo": "Prensa", "fecha": "2025-12-23", "url": "https://www.energias-renovables.com/panorama/la-cnmc-ejecuta-un-recorte-sin-precedentes-20251223"},
 {"id": 2, "titulo": "Endesa peleará en los tribunales la regulación de la CNMC sobre las redes eléctricas", "editor": "Forbes España", "tipo": "Prensa", "fecha": "2026-02", "url": "https://forbes.es/economia/879315/endesa-peleara-en-los-tribunales-la-regulacion-de-la-cnmc-sobre-las-redes-electricas/"},
 {"id": 3, "titulo": "El Gobierno de España prorroga la central nuclear de Almaraz hasta 2030", "editor": "Euronews", "tipo": "Prensa", "fecha": "2026-08-14", "url": "https://es.euronews.com/my-europe/2026/08/14/el-gobierno-de-espana-prorroga-la-central-nuclear-de-almaraz-hasta-2030-y-aplaza-su-cierre"},
 {"id": 4, "titulo": "El CSN aprueba la prórroga de Almaraz hasta 2030", "editor": "Roams", "tipo": "Prensa", "fecha": "2026-07", "url": "https://roams.es/actualidad/energia/csn-aprueba-prorroga-almaraz-2030-gobierno-hasta-octubre-decidir/"},
 {"id": 5, "titulo": "La demanda de electricidad hoy en España (REE: +2,8 % en 2025)", "editor": "Energías Renovables", "tipo": "Sectorial", "fecha": "2026-04-01", "url": "https://www.energias-renovables.com/panorama/la-demanda-de-electricidad-hoy-en-espa-20260401"},
 {"id": 6, "titulo": "Nota de prensa: demanda nacional de junio de 2026", "editor": "Red Eléctrica", "tipo": "Sectorial", "fecha": "2026-07-02", "url": "https://www.ree.es/sites/default/files/2026-07/0207_NP%20_Demanda_nacional_junio.pdf"},
 {"id": 7, "titulo": "Endesa invertirá 10.600 M hasta 2028, la mitad en redes de distribución", "editor": "Ara", "tipo": "Prensa", "fecha": "2026-02-24", "url": "https://es.ara.cat/economia/energia/endesa-invertira-10-600-m-2028-mitad-ira-redes-distribucion_1_5657738.html"},
 {"id": 8, "titulo": "Endesa en cifras (2025)", "editor": "Endesa", "tipo": "Primaria", "fecha": "2026", "url": "https://endesa.com/es/sobre-endesa/nuestro-negocio/cifras"},
 {"id": 9, "titulo": "Endesa redujo en 2019 un 20 % su beneficio (cuotas de mercado)", "editor": "Energías Renovables", "tipo": "Prensa", "fecha": "2020-02-25", "url": "https://www.energias-renovables.com/panorama/endesa-redujo-en-2019-un-20-su-20200225"},
 {"id": 10, "titulo": "Las eléctricas advierten que la retribución a las redes de la CNMC compromete la electrificación", "editor": "Forbes España", "tipo": "Prensa", "fecha": "2025", "url": "https://forbes.es/economia/821042/las-electricas-advierten-que-la-retribucion-a-las-redes-de-la-cnmc-compromete-la-electrificacion-del-pais/"},
 {"id": 11, "titulo": "Sector energético español: qué valores ofrecen más potencial, dividendo y crecimiento", "editor": "CapitalBolsa (Bolsamanía)", "tipo": "Analistas", "fecha": "2026-08-06", "url": "https://www.bolsamania.com/capitalbolsa/noticias/recomendaciones/sector-energetico-espanol-que-valores-ofrecen-mas-potencial-dividendo-y-crecimiento--23203422.html"},
 {"id": 12, "titulo": "Endesa: aceleran la inversión en redes siendo selectivos en renovables", "editor": "Renta 4", "tipo": "Analistas", "fecha": "2026-03-27", "url": "https://www.r4.com/articulos-y-analisis/valores/endesa-aceleran-la-inversion-en-redes-siendo-selectivos-en-renovables"},
]
B = {
 "historia": {
  "resumen": "Endesa nació en 1944 como empresa pública (Empresa Nacional de Electricidad) y se privatizó por tramos entre 1988 y 1998. En 2007-2009, tras la batalla con Gas Natural y E.ON, la compraron Enel y Acciona; Enel se quedó con el 92 % en 2009 y vendió el negocio latinoamericano a su propia filial en 2014, con un dividendo extraordinario que redujo Endesa a España y Portugal. Desde 2014 cotiza con un capital flotante de cerca del 30 %. La crisis de precios de 2022-2023 (laudo del gas con Sonatrach, gravamen temporal) le costó dos tercios del beneficio de 2023; desde 2024 se ha reorientado a redes, con recompra de acciones y relevo del consejero delegado en 2026.",
  "hitos": [
   {"anio": "1944", "hito": "Fundación como Empresa Nacional de Electricidad, de capital público."},
   {"anio": "1998", "hito": "Culmina la privatización."},
   {"anio": "2009", "hito": "Enel compra la participación de Acciona y controla el 92 %."},
   {"anio": "2014", "hito": "Venta de Latinoamérica a Enel y colocación en bolsa: el flotante sube a ≈30 %."},
   {"anio": "2023", "hito": "Beneficio neto de 742 M por el laudo del gas y el gravamen temporal [A7]."},
   {"anio": "2025", "hito": "Beneficio ordinario récord de 2.351 M y recompra de 2.000 M."},
   {"anio": "2026", "hito": "Armani sustituye a Bogas como consejero delegado (28-abr); Almaraz prorrogada hasta 2030 (12-ago) [3]."}
  ],
  "confianza": "Media"
 },
 "negocio": {
  "descripcion": "Endesa es la primera eléctrica integrada de España por clientes y la segunda por tamaño tras Iberdrola. Tiene tres negocios: distribución de electricidad (más de 321.800 km de red que llevan la luz a casi 22 millones de personas en Cataluña, Andalucía, Baleares, Canarias, Aragón y Extremadura; 143.555 GWh distribuidos en 2025) [8]; generación (nuclear —Ascó, Vandellós y su 36 % de Almaraz—, hidráulica, renovables, ciclos combinados y las centrales de las islas, cuya energía se paga por un régimen regulado específico) [4]; y comercialización de electricidad y gas a más de 9,5 millones de clientes en España y Portugal, sobre todo en el mercado libre [8].",
  "como_gana_dinero": "Cerca de la mitad del EBITDA es regulado: la red de distribución cobra una retribución fijada por la CNMC sobre su base de activos (tasa financiera del 6,58 % para 2026-2031) [1] y la generación de los territorios no peninsulares cobra por coste reconocido. La otra mitad es generación y venta liberalizada: Endesa vende a sus clientes a precio fijo buena parte de lo que produce con nuclear e hidráulica, así que su margen depende del diferencial entre el precio de venta y el coste de la energía que produce o compra, del volumen hidráulico y de los impuestos sobre la generación. En el 1S26 las redes aportaron 1.200 M de EBITDA (36 % del total, +24 %) [A1].",
  "segmentos": [],
  "geografias": [],
  "clientes": "Más de 9,5 millones de clientes de electricidad y gas en España y Portugal, sobre todo en el mercado libre [8]; en 2019 la empresa tenía el 34,1 % de las ventas a clientes del mercado liberalizado y el 44,1 % de la distribución [9]. No hay concentración de clientes. El poder de precios es limitado: la tarifa regulada (PVPC) y la competencia de Iberdrola, Naturgy, Repsol y TotalEnergies marcan el techo; la ventaja está en el coste (nuclear e hidráulica ya amortizadas) y en la integración con la generación.",
  "kpis": [
   {"kpi": "Energía distribuida (GWh)", "valor_anterior": None, "valor_actual": "143.555 (2025)", "variacion": None, "comentario": "Red de 321.843 km [8]."},
   {"kpi": "Clientes (España y Portugal)", "valor_anterior": None, "valor_actual": "> 9,5 millones", "variacion": None, "comentario": "Sobre todo mercado libre [8]."},
   {"kpi": "EBITDA de redes (1S)", "valor_anterior": "≈ 970 M (1S25)", "valor_actual": "1.200 M (1S26)", "variacion": "+24 %", "comentario": "36 % del EBITDA del grupo [A1]."},
   {"kpi": "Inversión bruta (1S)", "valor_anterior": "≈ 965 M (1S25)", "valor_actual": "1.100 M (1S26)", "variacion": "+14 %", "comentario": "La de redes, 600 M (+38 %) [A1]."}
  ],
  "confianza": "Media"
 },
 "sector": {
  "definicion": "El mercado relevante es la electricidad en España: la distribución regulada (Endesa, i-DE de Iberdrola, UFD de Naturgy y otras menores) y la generación y venta liberalizadas. Se mide por la demanda nacional en GWh (Red Eléctrica) porque el tamaño en euros oscila con el precio mayorista y no dice nada de la actividad; por eso la serie va en GWh.",
  "tamano": "256.086 GWh de demanda nacional en 2025 (+2,8 %) [5]",
  "unidad_serie": "GWh de demanda nacional",
  "serie": [{"anio": "2025", "tamano": 256086}],
  "tcac_historico_pct": None, "tcac_previsto_pct": None, "cr5_pct": None, "estructura": "Concentrada",
  "drivers": [
   {"driver": "Electrificación (vehículo eléctrico, bombas de calor, centros de datos)", "efecto": "+", "horizonte": "Estructural", "evidencia": "Demanda +2,8 % en 2025 [5]; Endesa dice que rechaza parte de las solicitudes de conexión por falta de capacidad de red [A15]."},
   {"driver": "Retribución de redes de la CNMC", "efecto": "+/−", "horizonte": "Estructural", "evidencia": "Tasa del 6,58 % para 2026-2031 (+100 pb), por debajo del 7 % que pedía el sector; Endesa la recurre [1, 2]."},
   {"driver": "Precio mayorista y canibalización solar", "efecto": "−", "horizonte": "Cíclico", "evidencia": "La demanda ajustada cayó un 0,9 % en junio de 2026 y un 2,1 % en abril [6]; con más solar, los precios a mediodía se hunden."},
   {"driver": "Calendario nuclear", "efecto": "+", "horizonte": "Estructural", "evidencia": "Almaraz prorrogada hasta el 8-jun-2030 (Orden TED/864/2026) [3]; Ascó y Cofrentes serían las siguientes [4]."}
  ],
  "porter": [
   {"fuerza": "Rivalidad", "intensidad": 3, "justificacion": "Tres grandes integradas (Iberdrola, Endesa, Naturgy) más Repsol y TotalEnergies en comercialización; competencia en precio en el mercado libre."},
   {"fuerza": "Poder de los clientes", "intensidad": 2, "justificacion": "Clientes atomizados; el PVPC regulado marca la referencia de precio."},
   {"fuerza": "Poder de los proveedores", "intensidad": 2, "justificacion": "Gas y combustible nuclear con pocos proveedores (el laudo de Sonatrach de 2023 costó cientos de millones), pero el peso del gas cae."},
   {"fuerza": "Amenaza de entrada", "intensidad": 2, "justificacion": "En redes no hay entrada (monopolio territorial regulado); en comercialización, sí, con márgenes estrechos."},
   {"fuerza": "Amenaza de sustitutos", "intensidad": 2, "justificacion": "El autoconsumo solar reduce la energía comprada pero sigue pagando la red."}
  ],
  "ciclo": {"posicion": "Madurez del ciclo", "comentario": "La demanda volvió a crecer en 2025 (+2,8 %) tras años de caídas, pero en 2026 está plana una vez ajustada por temperatura y laboralidad [5, 6]. Los márgenes de generación se normalizaron tras la crisis de precios de 2022-2023 y el nuevo periodo regulatorio de redes (2026-2031) ya está fijado [1]. El sector se comportó como refugio en 2020 y sufrió en 2022-2023 por las medidas de intervención (tope del gas, gravamen temporal)."},
  "regulacion": "Circulares de la CNMC de diciembre de 2025: tasa de retribución financiera del 6,58 % para transporte y distribución eléctrica en 2026-2031, 100 pb más que en el periodo anterior, pero por debajo del 7 % pedido; Endesa las recurre [1, 2]. El plan de 5.500 M en redes depende de un real decreto que eleve el límite de inversión en distribución [A2]. Almaraz se prorrogó hasta junio de 2030 por orden ministerial de 12-ago-2026, con informe favorable del CSN [3, 4]. La fiscalidad sobre la nuclear (tasa de Enresa e impuestos autonómicos) sigue siendo un riesgo.",
  "tendencias": "La electrificación y los centros de datos piden más red: es la parte del negocio que crece (EBITDA de redes +24 % en el 1S26) [A1]. La solar abarata la energía de día y castiga los márgenes de generación sin almacenamiento; Endesa es selectiva en renovables y prioriza redes [12]. La extensión de la vida nuclear, que hace un año parecía improbable, ya está aprobada para Almaraz.",
  "confianza": "Media"
 },
 "competencia": {
  "cuota_pct": None,
  "posicion": "Segunda eléctrica de España por tamaño y primera en clientes de electricidad; en 2019 tenía el 44,1 % de la distribución y el 34,1 % de las ventas en el mercado libre [9].",
  "competidores": [
   {"nombre": "Iberdrola (España)", "pais": "ES", "ticker": "IBE.MC", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Primera eléctrica; dueña del 53 % de Almaraz [4]."},
   {"nombre": "Naturgy", "pais": "ES", "ticker": "NTGY.MC", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Integrada de gas y electricidad; 11 % de Almaraz [4]."},
   {"nombre": "Repsol (Cliente)", "pais": "ES", "ticker": "REP.MC", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Competidor creciente en comercialización."},
   {"nombre": "EDP España", "pais": "PT", "ticker": "EDP.LS", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Asturias y comercialización."}
  ],
  "foso": {"veredicto": "Estrecho", "tendencia": "Estable", "fuentes": [
   {"fuente": "Efectos de red", "puntuacion": 0, "evidencia": "No aplica."},
   {"fuente": "Costes de cambio", "puntuacion": 1, "evidencia": "El cliente doméstico cambia de comercializadora sin coste."},
   {"fuente": "Intangibles (marca, patentes, licencias)", "puntuacion": 4, "evidencia": "Concesión de distribución en su territorio (monopolio regulado) y licencias nucleares no replicables."},
   {"fuente": "Ventaja en costes", "puntuacion": 3, "evidencia": "Nuclear e hidráulica amortizadas: margen de generación por encima del ciclo combinado."},
   {"fuente": "Escala eficiente", "puntuacion": 3, "evidencia": "Red de 321.843 km: no tiene sentido duplicarla [8]."}
  ]},
  "amenazas": "El foso de redes es regulatorio: lo que gana lo fija la CNMC cada seis años, y la tasa de 2026-2031 quedó por debajo de lo pedido [1]. En generación, el cierre nuclear (Almaraz en 2030; Ascó y Vandellós después) y la canibalización solar estrechan la ventaja de costes; en comercialización, la competencia de Repsol y de las petroleras presiona márgenes.",
  "confianza": "Baja"
 },
 "esg": {
  "calificaciones": [],
  "materialidad": "Lo que más afecta a las cifras: (1) la nuclear, que da energía sin CO₂ pero con tasas de residuos y un calendario de cierre que ya se ha movido una vez [3]; (2) la descarbonización de las islas (Canarias y Baleares), donde la generación térmica cobra por coste regulado; (3) la inversión en redes para la electrificación, que la taxonomía europea considera alineada.",
  "controversias": "El laudo del contrato de gas con Sonatrach y el gravamen temporal recortaron el beneficio de 2023 a 742 M [A7]. Endesa recurre las circulares de retribución de redes de la CNMC [2]. No se han encontrado sanciones relevantes recientes en las fuentes consultadas.",
  "confianza": "Baja"
 },
 "fuentes": fB,
 "huecos": [
  {"seccion": "sector", "campo": "serie de 5-8 años, TCAC y CR5", "tipo": "Núcleo", "intentos": "1) REE, balance eléctrico anual: no accesible; 2) búsqueda de demanda 2021-2024: solo 2025 y meses de 2026; 3) CNMC, informe de supervisión: no accesible", "decision": "Omitido"},
  {"seccion": "competencia", "campo": "ingresos y márgenes de los competidores en España; cuota actual", "tipo": "Núcleo", "intentos": "1) Informes anuales de Iberdrola y Naturgy: no accesibles; 2) búsqueda de cuotas 2025: solo datos de 2019; 3) CNMC: no accesible", "decision": "Omitido"},
  {"seccion": "negocio", "campo": "segmentos con histórico y geografías", "tipo": "Núcleo", "intentos": "1) Informe anual y presentación de resultados: no accesibles; 2) búsqueda de EBITDA por negocio 2025: solo redes del 1S26; 3) prensa: sin desglose completo", "decision": "Omitido"},
  {"seccion": "esg", "campo": "calificaciones ESG", "tipo": "Complemento", "intentos": "1) Web de Endesa: no accesible; 2) MSCI y Sustainalytics: no accesibles; 3) prensa: sin cifras", "decision": "Omitido"}
 ]
}
w("B.json", B)

# ---------------- C. Equipo y gobierno ----------------
fC = [
 {"id": 1, "titulo": "Junta General de Accionistas 2026 (nombramiento de Gianni Vittorio Armani)", "editor": "Endesa", "tipo": "Primaria", "fecha": "2026-04-28", "url": "https://www.endesa.com/es/prensa/sala-de-prensa/noticias/informacion-economica/junta-general-accionistas-2026"},
 {"id": 2, "titulo": "Bogas pone fin en abril a su etapa de consejero delegado de Endesa tras 12 años", "editor": "Bolsamanía / Europa Press", "tipo": "Prensa", "fecha": "2026-03-24", "url": "https://www.bolsamania.com/noticias_amp/empresas/economia-amp-bogas-pone-fin-en-abril-a-su-etapa-de-consejero-delegado-de-endesa-tras-12-anos-al-frente-de-la-electrica--22150504.html"},
 {"id": 3, "titulo": "Endesa prescinde de José Bogas tras 12 años como CEO", "editor": "Vozpópuli", "tipo": "Prensa", "fecha": "2026-03-24", "url": "https://www.vozpopuli.com/economia/energia/endesa-prescinde-de-jose-bogas-tras-12-anos-como-ceo-de-endesa.html"},
 {"id": 4, "titulo": "Junta General Ordinaria de Accionistas 2026 (orden del día y documentación)", "editor": "Endesa", "tipo": "Primaria", "fecha": "2026-04", "url": "https://www.endesa.com/es/accionistas-e-inversores/gobierno-corporativo/junta-general-ordinaria-de-accionistas-2026"},
 {"id": 5, "titulo": "S&P Global mantiene la calificación BBB/A-2 de Endesa (Enel, 70,1 %)", "editor": "Merca2", "tipo": "Prensa", "fecha": "2026-03-21", "url": "https://www.merca2.es/2026/03/21/endesa-spglobal-calificacion-bbb-2361989/"},
 {"id": 6, "titulo": "Endesa aprueba una nueva composición de los comités de su consejo", "editor": "Merca2", "tipo": "Prensa", "fecha": "2024-06-03", "url": "https://www.merca2.es/2024/06/03/endesa-nueva-composicion-comites-consejo-incorporacion-nuevos-consejeros-1695540/"},
 {"id": 7, "titulo": "Enel prepara el relevo de Bogas en Endesa", "editor": "The Objective", "tipo": "Prensa", "fecha": "2025-10-03", "url": "https://theobjective.com/economia/energia/2025-10-03/enel-relevo-bogas-endesa/"},
 {"id": 8, "titulo": "Guía 2024 y 2025 frente a lo logrado (resultados 9M24 y 2025)", "editor": "Alicante Plaza / Europa Press", "tipo": "Prensa", "fecha": "2024-10-30", "url": "https://alicanteplaza.es/alicanteplaza/endesadisparaun326susgananciasaseptiembrehasta1404millones"},
 {"id": 9, "titulo": "Endesa convence: los analistas celebran unas guías que baten al consenso", "editor": "Bolsamanía", "tipo": "Analistas", "fecha": "2026-02-26", "url": "https://www.bolsamania.com/noticias/empresas/endesa-convence-analistas-celebran-guias-baten-consenso-elevan-precios-objetivos--21823148.html"},
]
C = {
 "directivos": {
  "equipo": [
   {"nombre": "Gianni Vittorio Armani", "cargo": "Consejero delegado", "desde": "2026", "participacion_pct": None, "trayectoria": "Director global de Enel Grids and Innovation desde julio de 2023 y consejero de Endesa desde 2023; nombrado por unanimidad el 28-abr-2026 a propuesta del accionista de control [1, 2]. Antes dirigió Terna y ANAS en Italia. Sin historial medible todavía en el cargo."},
   {"nombre": "Juan Sánchez-Calero", "cargo": "Presidente no ejecutivo", "desde": "2017", "participacion_pct": None, "trayectoria": "Catedrático de Derecho Mercantil y consejero independiente; presidía también la Comisión de Nombramientos y Retribuciones en 2024 [6]."},
   {"nombre": "José Damián Bogas", "cargo": "Consejero (otro externo); consejero delegado 2014-2026", "desde": "2014", "participacion_pct": None, "trayectoria": "Doce años como consejero delegado: llevó a Endesa de la venta de Latinoamérica a la reorientación hacia redes; dejó el cargo en la junta de 2026 y sigue como consejero externo [2, 3]."}
  ],
  "historial_guidance": [
   {"anio": "2024", "guia": "EBITDA 4.900-5.200 M; beneficio ordinario 1.600-1.700 M [8]", "real": "EBITDA 5.293 M; ordinario 1.993 M [A10]", "cumplida": "Sí"},
   {"anio": "2025", "guia": "EBITDA 5.400-5.600 M; beneficio ordinario 1.900-2.000 M [A11]", "real": "EBITDA 5.756 M; ordinario 2.351 M [A2, A16]", "cumplida": "Sí"},
   {"anio": "2026", "guia": "Beneficio ordinario 2.300-2.400 M (feb), elevado a > 2.400 M (jul) [A1]", "real": "En curso: 1.480 M en el 1S26", "cumplida": "Parcial"}
  ],
  "comentario": "La dirección ha batido con holgura las guías de 2024 y 2025 (ordinario un 17 % y un 18 % por encima del techo), pero las guías se fijaban con margen. El relevo de Bogas lo decidió Enel, que eligió a un directivo propio de redes: es coherente con la estrategia, pero subraya que la cúpula responde al accionista de control [2, 7].",
  "confianza": "Media"
 },
 "gobierno": {
  "consejo": [
   {"nombre": "Juan Sánchez-Calero", "cargo": "Presidente", "tipo": "Independiente", "desde": "2017", "comisiones": "Nombramientos y Retribuciones (presidente en 2024)"},
   {"nombre": "Gianni Vittorio Armani", "cargo": "Consejero delegado", "tipo": "Ejecutivo", "desde": "2023", "comisiones": "—"},
   {"nombre": "José Damián Bogas", "cargo": "Vocal", "tipo": "Otro externo", "desde": "2014", "comisiones": "—"},
   {"nombre": "Angela Eliseo", "cargo": "Vocal", "tipo": "Dominical", "desde": "2026", "comisiones": "—"},
   {"nombre": "Ana Muñoz Merino", "cargo": "Vocal", "tipo": "Independiente", "desde": "2026", "comisiones": "—"}
  ],
  "presidente_ceo_separados": True, "presidente_ejecutivo": False, "consejero_coordinador": None, "una_accion_un_voto": True,
  "operaciones_vinculadas_relevantes": True, "variable_ligado_rentabilidad": None, "auditoria_independiente": None, "insiders_sin_operaciones": None,
  "accionista_control": True, "presidente_vinculado_control": False, "cambios_cupula_24m": 1,
  "voto_remuneracion_pct": None, "voto_remuneracion_contra_pct": None, "voto_remuneracion_contra_libre_pct": None, "voto_cupula_pct": None,
  "remuneracion_ceo": None,
  "remuneracion": "La junta de 2026 votó el informe anual de remuneraciones, la política 2026-2029 y un incentivo estratégico 2026-2028 [4]; los porcentajes de voto y las métricas del variable no se pudieron leer en este entorno.",
  "accionistas": [
   {"nombre": "Enel S.p.A.", "pct": 70.1, "tipo": "Control", "variacion": "Sube de forma pasiva con la amortización de las acciones recompradas [5]"},
   {"nombre": "Autocartera (recompra pendiente de amortizar)", "pct": None, "tipo": "Autocartera", "variacion": "Reducción de capital de los tramos tercero y cuarto acordada el 29-sep-2026 [A20]"}
  ],
  "insiders": [],
  "control_y_defensas": "Enel controla el 70,1 % y nombra de hecho al consejero delegado (Armani salió de su división de redes) [5, 1]. Las operaciones con Enel son recurrentes y relevantes: compras de gas y combustible, servicios de tecnología y financiación intragrupo; la comisión de auditoría las revisa, pero el minoritario depende de esa supervisión. No hay límites de voto ni clases de acciones. La recompra de 2.000 M concentra el capital en manos de Enel sin que pague nada; una exclusión de bolsa a medio plazo no está anunciada, pero es la lectura natural de esa dinámica.",
  "alertas": ["Relevo del consejero delegado decidido por el accionista de control (abril de 2026) [2].", "Operaciones vinculadas recurrentes con Enel (gas, servicios, financiación)."],
  "confianza": "Baja"
 },
 "fuentes": fC,
 "huecos": [
  {"seccion": "gobierno", "campo": "consejo completo, comisiones, votos de remuneración, remuneración del consejero delegado e insiders", "tipo": "Núcleo", "intentos": "1) IAGC e IARC 2025 en CNMV y endesa.com: no accesibles; 2) resultados de la junta 2026 (PDF): no accesible, la búsqueda no da porcentajes; 3) prensa: solo nombramientos sueltos", "decision": "Omitido"}
 ]
}
w("C.json", C)

# ---------------- D. Mercado y valoración ----------------
fD = [
 {"id": 1, "titulo": "Acciones Endesa hoy en bolsa (14-oct-2026)", "editor": "Rankia", "tipo": "Datos de mercado", "fecha": "2026-10-14", "url": "https://www.rankia.com/acciones/endesa-ele"},
 {"id": 2, "titulo": "Endesa (ELE): datos históricos", "editor": "Investing.com", "tipo": "Datos de mercado", "fecha": "2026-10-12", "url": "https://www.investing.com/equities/endesa-historical-data"},
 {"id": 3, "titulo": "Endesa (ELE): consenso de 23 analistas", "editor": "Investing.com", "tipo": "Analistas", "fecha": "2026-10", "url": "https://mx.investing.com/equities/endesa"},
 {"id": 4, "titulo": "Endesa, S.A.: valoración y consenso (Underperform, objetivo medio 35,97 €)", "editor": "MarketScreener", "tipo": "Analistas", "fecha": "2026-10", "url": "https://www.marketscreener.com/quote/stock/ENDESA-S-A-69599/"},
 {"id": 5, "titulo": "Endesa, S.A.: estimaciones (ventas, EBITDA, PER 2026-2028)", "editor": "MarketScreener", "tipo": "Analistas", "fecha": "2026-08-21", "url": "https://uk.marketscreener.com/quote/stock/ENDESA-S-A-69599/valuation/"},
 {"id": 6, "titulo": "Endesa: estimaciones tras el 1S26 (BPA 2026e 2,33 €)", "editor": "Webull / Simply Wall St", "tipo": "Analistas", "fecha": "2026-08", "url": "https://www.webull.com/news/15326170454451200"},
 {"id": 7, "titulo": "Cotización de Endesa (41,94 € a 2-oct-2026; capitalización 43.691 M; Bankinter, objetivo 45 €)", "editor": "Bolsamanía", "tipo": "Datos de mercado", "fecha": "2026-10-02", "url": "https://www.bolsamania.com/capitalbolsa/accion/ENDESA-1632486"},
 {"id": 8, "titulo": "Jefferies raises Endesa's target price ahead of results, but sees no upside", "editor": "The Corner", "tipo": "Analistas", "fecha": "2026-07", "url": "https://thecorner.eu/?p=126868"},
 {"id": 9, "titulo": "Endesa sube con fuerza tras sus cuentas y su Plan Estratégico: esto opinan los expertos", "editor": "Bolsamanía", "tipo": "Analistas", "fecha": "2026-02-25", "url": "https://www.bolsamania.com/noticias_amp/analisis-fundamental/endesa-sube-fuerza-cuentas-plan-estrategico-opinan-expertos--21805406.html"},
 {"id": 10, "titulo": "Rendimiento del Bund a 10 años (12-oct-2026), serie BBSIS (vía informes de ASML y Adyen de este repositorio)", "editor": "Deutsche Bundesbank", "tipo": "Primaria", "fecha": "2026-10-12", "url": "https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en"},
 {"id": 11, "titulo": "Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026", "editor": "Aswath Damodaran, NYU Stern", "tipo": "Datos de mercado", "fecha": "2026-10", "url": "https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx"},
 {"id": 12, "titulo": "Endesa, S.A. (ELEZF / ELE.MC): beta a 5 años mensual", "editor": "Yahoo Finance", "tipo": "Datos de mercado", "fecha": "2026", "url": "https://ca.finance.yahoo.com/quote/ELEZF"},
 {"id": 13, "titulo": "Comparables de Naturgy y Redeia del informe de Enagás de este repositorio (7-oct-2026)", "editor": "Análisis propio (informes/enagas-2026-10-07)", "tipo": "Datos de mercado", "fecha": "2026-10-07", "url": "informes/enagas-2026-10-07/datos-v3.json"},
 {"id": 14, "titulo": "Engie (ENGI.PA) Forward P/E", "editor": "ValueInvesting.io", "tipo": "Datos de mercado", "fecha": "2026-05-16", "url": "https://valueinvesting.io/ENGI.PA/metric/forward-pe"},
 {"id": 15, "titulo": "Iberdrola's grid ambitions power shares (PER previsto de MarketScreener)", "editor": "Finimize", "tipo": "Datos de mercado", "fecha": "2026-09-10", "url": "https://finimize.com/content/ibdsf-asset-snapshot"},
 {"id": 16, "titulo": "Utilities Sector Stocks in Europe (PER previsto de Enel, EDP y E.ON)", "editor": "Chartmill", "tipo": "Datos de mercado", "fecha": "2026", "url": "https://www.chartmill.com/stock/markets/europe/sector/234-utilities"},
 {"id": 17, "titulo": "SSE plc: Forward P/E", "editor": "Yahoo Finance", "tipo": "Datos de mercado", "fecha": "2026", "url": "https://finance.yahoo.com/quote/SSEZY/"},
 {"id": 18, "titulo": "Endesa en la bolsa (38,83 € y casi +25 % en el año, julio de 2026)", "editor": "Estrategias de Inversión", "tipo": "Prensa", "fecha": "2026-07", "url": "https://www.estrategiasdeinversion.com/analisis/los-brokers-recomiendan/recomendaciones-espana/una-accion-del-ibex-35-con-energia-para-pulverizar-n-916341"},
 {"id": 19, "titulo": "Endesa brilla en el Ibex 35 pero Jefferies enfría (≈29 € y +37,5 % en 2025)", "editor": "Estrategias de Inversión", "tipo": "Prensa", "fecha": "2025-10", "url": "https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/endesa-brilla-en-el-ibex-35-pero-jefferies-enfria-n-854231"},
 {"id": 20, "titulo": "Endesa (ELE.MC) estadísticas", "editor": "eToro", "tipo": "Datos de mercado", "fecha": "2026-10", "url": "https://www.etoro.com/es/markets/ele.mc/stats"},
 {"id": 21, "titulo": "Endesa ADR (ELEZY) forecast: consensus rating", "editor": "MarketBeat", "tipo": "Analistas", "fecha": "2026-10", "url": "https://www.marketbeat.com/stocks/OTCMKTS/ELEZY/forecast/"},
 {"id": 22, "titulo": "Endesa: consenso de 20 brokers (2,60 sobre 5)", "editor": "Estrategias de Inversión", "tipo": "Analistas", "fecha": "2026", "url": "https://www.estrategiasdeinversion.com/cotizacion/endesa-/analisis/"},
 {"id": 23, "titulo": "Endesa: la recompra de acciones debería seguir apoyando la cotización", "editor": "Renta 4", "tipo": "Analistas", "fecha": "2025-11-25", "url": "https://www.r4.com/articulos-y-analisis/valores/endesa-la-recompra-de-acciones-deberia-seguir-apoyando-la-cotizacion"},
 {"id": 24, "titulo": "Endesa (ELE.MC): fecha de resultados (28-oct-2026)", "editor": "Yahoo Finance", "tipo": "Datos de mercado", "fecha": "2026-10", "url": "https://finance.yahoo.com/quote/ELE.MC/"},
]
D_ = {
 "identificacion": {
  "nombre": "Endesa, S.A.", "nombre_corto": "Endesa", "ticker": "ELE", "isin": "ES0130670112", "mercado": "Bolsa de Madrid (Mercado Continuo)", "indice_referencia": "IBEX 35",
  "pais": "España", "pais_iso": "ES", "sector": "Servicios públicos", "industria": "Eléctricas integradas", "sede": "Madrid", "fundacion": "1944", "empleados": None, "web": "www.endesa.com",
  "precio": 43.03, "fecha_precio": "2026-10-14", "acciones": 1006.0, "capitalizacion_publicada": 43691, "free_float_pct": 29.9,
  "max_52s": 43.20, "min_52s": 29.29, "volumen_medio_diario": None, "proximos_resultados": "2026-10-28"
 },
 "consenso": {
  "guidance": "Plan 2026-2028 (24-feb-2026): inversión bruta de 10.600 M (5.500 M en redes, condicionados a un real decreto que eleve el límite de inversión), EBITDA de 6.200-6.500 M y beneficio ordinario de 2.500-2.600 M en 2028, pay-out ≥ 70 % y dividendo +≈4 % anual, recompra de 2.000 M [A2, 9]. Guía de 2026: beneficio ordinario elevado a «más de 2.400 M» el 29-jul-2026, desde 2.300-2.400 M [A1].",
  "estimaciones": [
   {"periodo": "2026e", "ingresos": 21903, "ebitda": 6002, "ebit": None, "bpa": 2.35, "dpa": None, "fuente": "MarketScreener (ventas y EBITDA; BPA = precio de 41,40 € ÷ PER de 17,6x, 21-ago-2026) [5]; Simply Wall St: 2,33 € [6]"},
   {"periodo": "2027e", "ingresos": 21722, "ebitda": 6087, "ebit": None, "bpa": 2.35, "dpa": None, "fuente": "MarketScreener (BPA implícito en el PER de 17,6x) [5]"},
   {"periodo": "2028e", "ingresos": 21909, "ebitda": 6240, "ebit": None, "bpa": 2.39, "dpa": None, "fuente": "MarketScreener (BPA implícito en el PER de 17,3x) [5]"}
  ],
  "recomendaciones": {"n_analistas": 23, "comprar": 1, "mantener": 13, "vender": 9, "po_medio": 35.71, "po_min": None, "po_max": 45.0},
  "revisiones": "Los objetivos han subido con el precio, pero menos: tras el plan de febrero los analistas elevaron objetivos [9]; en verano Jefferies subió el suyo a 35 € (mantener) y BNP Paribas pasó a neutral con 34 € [8]; Bankinter tiene 45 € (comprar) [7]. El objetivo medio es de 35,71 € en Investing (23 analistas: 1 comprar, 13 mantener, 9 vender) [3] y de 35,97 € en MarketScreener («Underperform») [4]. El BPA de 2026 del consenso subió de 2,29 € a 2,33 € tras el 1S26 [6]. Solo hay una fuente de estimaciones completas (MarketScreener); el BPA se deduce de su PER y su precio.",
  "base_ebitda": "NIIF", "ajuste_ebitda_pct_ventas": None,
  "confianza": "Media"
 },
 "bolsa": {
  "tipo_rentabilidad": None, "rentabilidades": [], "anual": [],
  "beta": 0.62, "volatilidad_pct": 19.6, "max_drawdown_pct": None, "posicion_corta_pct": None,
  "comentario": "La acción ha pasado de ≈21 € a cierre de 2024 (deducido de los 29 € y +37,5 % en lo que iba de 2025 en octubre de ese año) [19] a ≈31 € a cierre de 2025 (38,83 € con casi +25 % en el año en julio de 2026) [18] y a 43,03 € hoy [1]: +100 % en 22 meses, más que duplicando con el dividendo. Lo explican el beneficio ordinario (+18 % en 2025 y +42 % en el 1S26), la recompra de 2.000 M, la subida de la tasa regulada de redes y la prórroga de Almaraz. Cotiza en máximos del año (mínimo de 52 semanas, 29,29 €) [1, 20]. Beta a 5 años de 0,52-0,66 según la línea cotizada [12]; volatilidad anual del 19,6 % (julio de 2026) [18].",
  "confianza": "Baja"
 },
 "multiplos_historicos": {
  "serie": [
   {"anio": "2024", "precio_cierre": 21.1, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2025", "precio_cierre": 31.1, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False}
  ],
  "comentario": "Solo hay dos cierres de ejercicio fiables, y son estimaciones: ≈21,1 € en 2024 (29 € en octubre de 2025 con +37,5 % en el año) [19] y ≈31,1 € en 2025 (38,83 € en julio de 2026 con casi +25 % en el año) [18]. Con el BPA ordinario, el PER de cierre fue de ≈11,2x en 2024 y ≈13,8x en 2025; hoy, 43,03 € sobre el BPA de 2026 del consenso (2,35 €) son ≈18,3x. La media de diez años del ADR (18,6x, Wisesheets) está distorsionada por 2019 y 2023. El salto de múltiplo es la tesis bajista: el mercado paga hoy por Endesa como por una red regulada pura (Redeia 15,9x, Iberdrola ≈19,6x), y Endesa todavía tiene la mitad del EBITDA en generación y comercialización.",
  "confianza": "Baja"
 },
 "comparables": {
  "criterio": "Eléctricas integradas europeas con redes reguladas y generación (Iberdrola, Enel, EDP, Naturgy, Engie, E.ON, SSE) y una red pura española (Redeia) como referencia del múltiplo regulado. Naturgy y Redeia se toman del informe de Enagás del 7-oct-2026 de este repositorio [13]; el resto solo con el PER previsto de agregadores con fechas distintas (mayo-septiembre de 2026), porque en este entorno no se pudieron abrir las fichas de cada empresa.",
  "empresas": [
   {"nombre": "Iberdrola", "ticker": "IBE.MC", "pais": "ES", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 19.6, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "Naturgy", "ticker": "NTGY.MC", "pais": "ES", "capitalizacion": 27264, "ev_ventas": 2.02, "ev_ebitda_ltm": 7.2, "ev_ebitda_ntm": 7.3, "per_ntm": 13.9, "crecimiento_pct": 0.8, "margen_ebitda_pct": 27.4, "roic_pct": None, "dn_ebitda": 2.3, "fcf_yield_pct": 8.7},
   {"nombre": "Redeia", "ticker": "RED.MC", "pais": "ES", "capitalizacion": 7941, "ev_ventas": 7.81, "ev_ebitda_ltm": 10.4, "ev_ebitda_ntm": 10.0, "per_ntm": 15.9, "crecimiento_pct": 5.3, "margen_ebitda_pct": 75.8, "roic_pct": None, "dn_ebitda": 4.4, "fcf_yield_pct": 5.0},
   {"nombre": "Enel", "ticker": "ENEL.MI", "pais": "IT", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 13.4, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "EDP", "ticker": "EDP.LS", "pais": "PT", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 16.7, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "Engie", "ticker": "ENGI.PA", "pais": "FR", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 13.9, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "E.ON", "ticker": "EOAN.DE", "pais": "DE", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 16.4, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "SSE", "ticker": "SSE.L", "pais": "GB", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 13.5, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None}
  ],
  "comentario": None,
  "confianza": "Baja"
 },
 "transacciones": None,
 "fuentes": fD,
 "huecos": [
  {"seccion": "transacciones", "campo": "sección entera", "tipo": "Complemento", "intentos": "1) Búsqueda de compras de redes eléctricas en España y Europa con EV/RAB: sin cifras en los extractos; 2) informe de Enagás del repositorio: solo transacciones de gas; 3) prensa: operaciones sin múltiplo publicado", "decision": "Omitido"},
  {"seccion": "multiplos_historicos", "campo": "precios de cierre 2021-2023", "tipo": "Complemento", "intentos": "1) bolsa.mjs y Yahoo: sin red en este entorno; 2) búsqueda de cierres anuales en Bolsamanía e Investing: sin datos en los extractos; 3) Wisesheets y Digrin: PER del ADR sin serie anual limpia", "decision": "Omitido"},
  {"seccion": "bolsa", "campo": "rentabilidades por periodo, anuales, caída máxima, posición corta y volumen", "tipo": "Complemento", "intentos": "1) bolsa.mjs: sin red; 2) búsqueda de históricos: solo cotizaciones sueltas; 3) CNMV posiciones cortas: no accesible", "decision": "Omitido"},
  {"seccion": "comparables", "campo": "capitalización, EV/EBITDA, crecimiento y deuda de Iberdrola, Enel, EDP, Engie, E.ON y SSE", "tipo": "Núcleo", "intentos": "1) MarketScreener de cada empresa: no accesible; 2) Stock Analysis vía búsqueda: sin fichas; 3) agregadores (ValueInvesting, Chartmill, Yahoo): solo PER previsto con fechas distintas", "decision": "Omitido"},
  {"seccion": "valoracion", "campo": "base de activos regulada (RAB) de distribución", "tipo": "Complemento", "intentos": "1) Presentación del plan 2026-2028: no accesible; 2) búsqueda de RAB de Endesa: sin cifra; 3) CNMC: no accesible", "decision": "Omitido"}
 ]
}
w("D.json", D_)

# ---------------- E. Sentimiento ----------------
fE = [
 {"id": 1, "titulo": "Seguimiento de Endesa (ELE): resultados, noticias y dividendos (foro)", "editor": "Rankia", "tipo": "Foros y redes", "fecha": "2026-09", "url": "https://www.rankia.com/foros/bolsa/temas/2491364-seguimiento-endesa-ele-resultados-noticias-dividendos"},
 {"id": 2, "titulo": "Endesa: narrativas de la comunidad (valores razonables 27,40 €, 35,42 € y 44,30 €)", "editor": "Simply Wall St", "tipo": "Foros y redes", "fecha": "2026-08", "url": "https://simplywall.st/community/narratives/es/utilities/bme-ele/endesa-shares/yhar1qh0-downgraded-sector-ratings-will-limit-network-investment-upside-ahead/updates/10-analysts-have-modestly-increased-their-fair-value-price-targ"},
 {"id": 3, "titulo": "Narrativa: Spain energy regulation and grid risks will crush outlook", "editor": "Simply Wall St", "tipo": "Foros y redes", "fecha": "2026-08", "url": "https://simplywall.st/community/narratives/es/utilities/bme-ele/endesa-shares/yhar1qh0-spain-energy-regulation-and-grid-risks-will-crush-outlook-daqj"},
 {"id": 4, "titulo": "Endesa (BME:ELE) Earnings Lift Puts Its Pricey Valuation Narrative In Focus", "editor": "Webull (Simply Wall St)", "tipo": "Foros y redes", "fecha": "2026-08", "url": "https://www.webull.com/news/15332745068160000"},
 {"id": 5, "titulo": "Acción de Endesa: sentimiento de los inversores (TipRanks)", "editor": "Naga", "tipo": "Foros y redes", "fecha": "2026-10", "url": "https://naga.com/lat/instruments/ELE.re"},
 {"id": 6, "titulo": "Estas dos eléctricas del Ibex son un regalo técnico", "editor": "Bolsamanía", "tipo": "Foros y redes", "fecha": "2026", "url": "https://www.bolsamania.com/noticias/analisis-tecnico/estas-dos-electricas-ibex-son-regalo-tecnico--21542525.html"},
 {"id": 7, "titulo": "Endesa: actualización semanal de análisis técnico y consenso", "editor": "Estrategias de Inversión", "tipo": "Foros y redes", "fecha": "2026-10", "url": "https://www.estrategiasdeinversion.com/cotizacion/endesa-/analisis/"},
 {"id": 8, "titulo": "Dividendo de Endesa en julio: fechas, importe y consejo", "editor": "OCU Inversiones", "tipo": "Foros y redes", "fecha": "2026-06", "url": "https://www.ocu.org/inversiones/invertir/acciones/articulos/2026/06/dividendo-de-endesa-en-julio-fechas-importe-y-consejo"},
]
E = {
 "sentimiento": {
  "tono": "Dividido", "tendencia": "Estable",
  "revisadas": [
   {"plataforma": "Rankia (hilo de seguimiento de Endesa)", "fecha": "2026-09", "n_comentarios": 15, "tono": "Positivo", "resumen": "El hilo gira en torno a los comunicados de la recompra (compras semanales a ≈37 € en mayo), el sexto tramo de 500 M y el complementario de 1,084 €; el tono es de accionista de dividendo satisfecho, con dudas sobre si a estos precios compensa seguir comprando [1]."},
   {"plataforma": "Simply Wall St (narrativas de la comunidad)", "fecha": "2026-08", "n_comentarios": 3, "tono": "Dividido", "resumen": "Tres narrativas con valores razonables de 44,30 € (electrificación y redes), 35,42 € (rebajas de rating sectorial que limitan la inversión en redes) y 27,40 € (regulación y riesgos de red), frente a ≈41 € de cotización entonces [2, 3]."},
   {"plataforma": "Webull / Simply Wall St (comentario de resultados)", "fecha": "2026-08", "n_comentarios": 2, "tono": "Negativo", "resumen": "Tras el 1S26 el debate se centra en si el salto de beneficio justifica una valoración que ya consideran cara [4]."},
   {"plataforma": "TipRanks vía Naga (indicador de sentimiento)", "fecha": "2026-10", "n_comentarios": 1, "tono": "Negativo", "resumen": "El indicador agregado de sentimiento de los inversores particulares marca negativo [5]."},
   {"plataforma": "Bolsamanía y Estrategias de Inversión (análisis técnico y comentarios)", "fecha": "2026-10", "n_comentarios": 4, "tono": "Positivo", "resumen": "Tendencia alcista de largo plazo, cotizando por encima de la resistencia de 41-42 €, con soporte lejano en ≈31 €; el consenso de 20 brokers da 2,60 sobre 5 [6, 7]."},
   {"plataforma": "OCU Inversiones (consejo al pequeño inversor)", "fecha": "2026-06", "n_comentarios": 1, "tono": "Neutro", "resumen": "Cobrar el dividendo de julio y no ampliar a estos precios [8]."}
  ],
  "temas": [
   {"tema": "Dividendo y recompra", "postura": "Alcista", "peso": "Alto", "contraste": "Correcto en el fondo: pay-out ≥ 70 % y recompra de 2.000 M [A2, A13]. Pero a 43 € la rentabilidad por dividendo baja a ≈3,8 %, por debajo del Bund más la prima de una eléctrica."},
   {"tema": "Valoración cara tras doblar en dos años", "postura": "Bajista", "peso": "Alto", "contraste": "Los datos le dan la razón: PER de ≈18x frente a 11-14x de cierre en 2024-2025 y objetivo medio de los analistas un 17 % por debajo [D3]."},
   {"tema": "Regulación de redes (tasa del 6,58 %, real decreto de inversión)", "postura": "Dividida", "peso": "Medio", "contraste": "La tasa sube 100 pb, pero el plan de 5.500 M depende del real decreto [B1, A2]."},
   {"tema": "Almaraz y la nuclear", "postura": "Alcista", "peso": "Bajo", "contraste": "La prórroga hasta 2030 ya está aprobada [B3]: es un riesgo despejado, no un catalizador pendiente."}
  ],
  "lectura": "El particular español está contento con el dividendo y la recompra, y el foro no muestra euforia; pero los agregadores de sentimiento y las narrativas de Simply Wall St ya hablan de valoración exigente, en la misma línea que el consenso de analistas (9 de 23 en vender). No anticipa un riesgo que el informe no recoja: confirma que la discusión es el múltiplo, no el negocio.",
  "confianza": "Baja"
 },
 "fuentes": fE,
 "huecos": [
  {"seccion": "sentimiento", "campo": "Reddit, Stocktwits y Seeking Alpha recientes", "tipo": "Complemento", "intentos": "1) Búsqueda de Stocktwits y Reddit sobre Endesa: sin hilos; 2) Seeking Alpha: último artículo de marzo de 2024; 3) comentarios de Investing: no aparecen en la búsqueda", "decision": "Omitido"}
 ]
}
w("E.json", E)

# Citas a otras notas dentro de una nota ([A1], [D3]...): se copian esas fuentes a la lista propia y se renumeran.
import glob
listas = {'A': fA, 'B': fB, 'C': fC, 'D': fD, 'E': fE}
for L, nombre in [('A','A.json'),('B','B.json'),('C','C.json'),('D','D.json'),('E','E.json')]:
    ruta = os.path.join(D, nombre)
    txt = open(ruta, encoding='utf-8').read()
    obj = json.loads(txt)
    fu = obj['fuentes']
    extra = {}
    def rep(m):
        partes = [x.strip() for x in m.group(1).split(',')]
        out = []
        for x in partes:
            mm = re.fullmatch(r'([A-E])(\d+)', x)
            if not mm:
                out.append(x); continue
            O, n = mm.group(1), int(mm.group(2))
            if O == L:
                out.append(str(n)); continue
            k = (O, n)
            if k not in extra:
                src = next(f for f in listas[O] if f['id'] == n)
                nuevo = dict(src); nuevo['id'] = len(fu) + 1; fu.append(nuevo); extra[k] = nuevo['id']
            out.append(str(extra[k]))
        return '[' + ', '.join(out) + ']'
    def walk(o):
        if isinstance(o, dict): return {k: (v if k == 'fuentes' else walk(v)) for k, v in o.items()}
        if isinstance(o, list): return [walk(v) for v in o]
        if isinstance(o, str): return re.sub(r'\[((?:[A-E]?\d+)(?:\s*,\s*[A-E]?\d+)*)\]', rep, o)
        return o
    obj = walk(obj); obj['fuentes'] = fu
    w(nombre, obj)
print("notas escritas")

#!/usr/bin/env python3
# Construye notas/A.json (subagente A, cuentas de Rovi) a partir de cifras copiadas de las fuentes primarias.
import json, os
D = os.path.dirname(os.path.abspath(__file__))
xb = json.load(open(os.path.join(D, 'cuentas-xbrl.json')))

fuentes = [
 {"id": 1, "titulo": "Financial results for the full year 2025 (nota de resultados con cuentas consolidadas auditadas)", "editor": "Laboratorios Farmacéuticos Rovi", "tipo": "Primaria", "fecha": "2026-02-25", "url": "https://www.rovi.es/sites/default/files/rovi_results_press_release_vdef_3.pdf"},
 {"id": 2, "titulo": "Cuentas anuales consolidadas e informe de gestión 2025 con informe de auditoría (traducción inglesa)", "editor": "Laboratorios Farmacéuticos Rovi / KPMG Auditores", "tipo": "Primaria", "fecha": "2026-02-24", "url": "https://www.rovi.es/sites/default/files/audit_report_annual_accounts_and_management_report_rovi_group_2025.pdf"},
 {"id": 3, "titulo": "Informe financiero anual 2021 en formato ESEF (cifras 2020-2021)", "editor": "Rovi vía filings.xbrl.org", "tipo": "Primaria", "fecha": "2022-02", "url": "https://filings.xbrl.org/95980020140005936480/2021-12-31/ESEF/ES/0/95980020140005936480-20211231-es/reports/95980020140005936480-20211231-es.xhtml"},
 {"id": 4, "titulo": "Informe financiero anual 2022 en formato ESEF", "editor": "Rovi vía filings.xbrl.org", "tipo": "Primaria", "fecha": "2023-02", "url": "https://filings.xbrl.org/95980020140005936480/2022-12-31/ESEF/ES/0/95980020140005936480-20221231-es/reports/95980020140005936480-20221231-es.xhtml"},
 {"id": 5, "titulo": "Informe financiero anual 2023 en formato ESEF", "editor": "Rovi vía filings.xbrl.org", "tipo": "Primaria", "fecha": "2024-02", "url": "https://filings.xbrl.org/95980020140005936480/2023-12-31/ESEF/ES/0/95980020140005936480-20231231-es/reports/95980020140005936480-20231231-es.xhtml"},
 {"id": 6, "titulo": "Informe financiero anual 2024 en formato ESEF", "editor": "Rovi vía filings.xbrl.org", "tipo": "Primaria", "fecha": "2025-02", "url": "https://filings.xbrl.org/95980020140005936480/2024-12-31/ESEF/ES/0/95980020140005936480-20241231-es/reports/95980020140005936480-20241231-es.xhtml"},
 {"id": 7, "titulo": "Informe financiero anual 2025 en formato ESEF", "editor": "Rovi vía filings.xbrl.org", "tipo": "Primaria", "fecha": "2026-02", "url": "https://filings.xbrl.org/95980020140005936480/2025-12-31/ESEF/ES/0/95980020140005936480-2025-12-31-1-es/reports/95980020140005936480-2025-12-31-1-es.xhtml"},
 {"id": 8, "titulo": "Resultados del primer trimestre de 2026 (nota de prensa)", "editor": "Laboratorios Farmacéuticos Rovi", "tipo": "Primaria", "fecha": "2026-05-06", "url": "https://rovi.es/sites/default/files/1t_2026_resultados_nota_de_prensa_def.pdf"},
 {"id": 9, "titulo": "Presentación de resultados del primer trimestre de 2026", "editor": "Laboratorios Farmacéuticos Rovi", "tipo": "Primaria", "fecha": "2026-05-06", "url": "https://www.rovi.es/sites/default/files/1t_2026_rovi_presentacion_def_1.pdf"},
 {"id": 10, "titulo": "Resultados del primer semestre de 2026 (nota de prensa)", "editor": "Laboratorios Farmacéuticos Rovi", "tipo": "Primaria", "fecha": "2026-07-23", "url": "https://www.rovi.es/sites/default/files/1s_2026_resultados_nota_de_prensa_def.pdf"},
 {"id": 11, "titulo": "H1 2026 results presentation", "editor": "Laboratorios Farmacéuticos Rovi", "tipo": "Primaria", "fecha": "2026-07-23", "url": "https://www.rovi.es/sites/default/files/h1_2026_rovi_presentation_def.pdf"},
 {"id": 12, "titulo": "Informe financiero semestral a 30-jun-2026 remitido a la CNMV (estados intermedios condensados con revisión limitada, versión inglesa)", "editor": "Laboratorios Farmacéuticos Rovi / CNMV", "tipo": "Primaria", "fecha": "2026-07-23", "url": "https://www.rovi.es/sites/default/files/informe_financiero_semestral_30.06.26_ingles_para_cnmv.pdf"},
 {"id": 13, "titulo": "Financial results for the first quarter of 2025", "editor": "Laboratorios Farmacéuticos Rovi", "tipo": "Primaria", "fecha": "2025-05-08", "url": "https://www.rovi.es/sites/default/files/rovi_press_release_def.pdf"},
 {"id": 14, "titulo": "Financial results for the first half of 2025", "editor": "Laboratorios Farmacéuticos Rovi", "tipo": "Primaria", "fecha": "2025-07-24", "url": "https://www.rovi.es/sites/default/files/rovi_press_release_def_2.pdf"},
 {"id": 15, "titulo": "Financial results for the nine-month period ending 30 September 2025", "editor": "Laboratorios Farmacéuticos Rovi", "tipo": "Primaria", "fecha": "2025-11-06", "url": "https://www.rovi.es/sites/default/files/rovi_press_release_def_5.pdf"},
 {"id": 17, "titulo": "Las acciones de Rovi se desploman más de un 15 % tras presentar resultados", "editor": "XTB", "tipo": "Prensa", "fecha": "2026-05-06", "url": "https://www.xtb.com/es/analisis-de-mercado/las-acciones-de-rovi-se-desploman-mas-de-un-15-tras-presentar-resultados"},
 {"id": 16, "titulo": "Capital Markets Day 2025 (presentación)", "editor": "Laboratorios Farmacéuticos Rovi", "tipo": "Primaria", "fecha": "2025-03-25", "url": "https://www.rovi.es/sites/default/files/20250325_rovi_cmd_2025_eng_vdef.pdf"},
]

# ---------- Cuenta de resultados ----------
cuenta_x = {r['periodo']: r for r in xb['financieros']['cuenta']}
# coste de ventas = aprovisionamientos + variación de existencias (signo XBRL: positivo = gasto) [3-7]
coste = {"2020": 178.7, "2021": 263.9, "2022": 300.9, "2023": 341.1, "2024": 286.1, "2025": 261.5}
# gastos de explotación sin aprovisionamientos ni amortización: personal + otros gastos - trabajos para el inmovilizado (incluye I+D) [3-7]
gg = {"2020": 148.1, "2021": 183.3, "2022": 240.1, "2023": 244.6, "2024": 271.0, "2025": 278.5}
dpa = {"2020": 0.3812, "2021": 0.9556, "2022": 1.2938, "2023": 1.1037, "2024": 0.9351, "2025": 0.9594}
acc = {"2020": 55.5, "2021": 55.5, "2022": 53.466, "2023": 53.192, "2024": 51.210, "2025": 51.146}
cuenta = []
for p in ["2020", "2021", "2022", "2023", "2024", "2025"]:
    x = cuenta_x[p]
    r = {"periodo": p, "ingresos": x['ingresos'], "coste_ventas": coste[p], "gastos_generales": gg[p],
         "ebitda": x['ebitda'], "amortizaciones": x['amortizaciones'], "ebit": x['ebit'],
         "resultado_financiero": x['resultado_financiero'], "bai": x['bai'], "impuestos": x['impuestos'],
         "minoritarios": x['minoritarios'] if x['minoritarios'] is not None else 0, "beneficio_neto": x['beneficio_neto'],
         "gastos_financieros": x['gastos_financieros'], "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None,
         "bpa": x['bpa'], "dpa": dpa[p], "dpa_extraordinario": 0, "acciones_diluidas": acc[p]}
    cuenta.append(r)
# 2020: beneficio y BPA del ESEF 2021 (el XBRL etiqueta el BPA 2020 con escala errónea: 1100 = 1,10 EUR) [3]
cuenta[0]['beneficio_neto'] = 61.1
cuenta[0]['bpa'] = 1.10
cuenta[0]['minoritarios'] = 0
# 2025: minoritarios -0,08 (pérdida atribuida a minoritarios) [1]
cuenta[5]['minoritarios'] = -0.1
# 2024: EBITDA publicado 207,4 (el XBRL da 207,5 por redondeo de EBIT+amortización) [1]
cuenta[4]['ebitda'] = 207.4
cuenta[4]['ebit'] = 179.4

financieros = {
 "cuenta": cuenta,
 "ltm": {"periodo": "LTM jun-26", "fecha_fin": "2026-06-30",
         "ingresos": 773.1, "ebitda": 271.8, "ebit": 238.1, "beneficio_neto": 185.2, "bpa": 3.62,
         "dpa": 0.9594, "dpa_extraordinario": 0, "fcf": 177.2,
         "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": -57.9},
 "cambios_perimetro": [
   {"periodo": "2025", "descripcion": "Cells IA Technologies (94,995 %), consolidada por integración global desde el 27-ene-25 (antes, puesta en equivalencia); fondo de comercio de 2,7 M; efecto inmaterial en la cuenta."},
 ],
 "comentario": "Los ingresos operativos pasaron de 420,0 M en 2020 a 743,5 M en 2025, con un pico de 829,5 M en 2023 que se debió a la fabricación de la vacuna de Moderna: el negocio de fabricación a terceros (CDMO) pasó de 92 M en 2020 a 409 M en 2023 y volvió a 336 M en 2024 y a 269,5 M en 2025 [1, 16]. Las especialidades farmacéuticas crecieron de 328 M a 473,9 M (un 7,6 % anual), con Okedi en 56,7 M (+97 %) y la franquicia de heparinas en 266,8 M (+7 %) en 2025 [1, 16]. Todo el crecimiento es orgánico salvo Phoenix, que entra el 1-abr-26.\n\nEl margen EBITDA fue del 22,5 % en 2020, 34,1 % en 2022 (el máximo, con la vacuna), 27,2 % en 2024 y 29,1 % en 2025. El de 2025 lleva 12,6 M de «otros ingresos» por la ayuda del CDTI al proyecto LAISOLID, que reconoce de una vez los gastos de I+D de enero de 2023 a diciembre de 2025; sin ellos, el margen bruto habría sido del 64,8 % y no del 66,5 % [1]. La I+D subió de 25,8 M a 37,8 M en 2025 y a 33,3 M solo en el 1S26 (fase III de Letrozol SIE) [1, 10]. En el 1S26 el EBITDA publicado de 121,2 M incluye 62,4 M de badwill de Phoenix; sin él, el EBITDA cae un 10 %, a 58,8 M, y el margen baja al 17,1 % [10].",
 "ajustes": "Uso cifras publicadas. Rovi no publica un EBITDA ajustado: da medidas «antes de I+D» y «con I+D plana», que no uso. No recurrentes: proyectos estratégicos dentro de los gastos generales de 8,5 M en 2024 y 3,2 M en 2025, que se repiten y no ajusto [1]. En 2025, la ayuda del CDTI aporta 12,6 M de otros ingresos, en su mayor parte de gastos de 2023-2024; Rovi no da el reparto por años, así que no ajusto. En el 1S26 hay un badwill de 62,4 M (ingreso sin efecto fiscal, que baja el tipo efectivo al 16,9 %) y 4,5 M de gastos no recurrentes: la inspección fiscal de retenciones de 2020-2022, bajas de activos y proyectos estratégicos [10, 12]. En el LTM pongo -57,9 M de no recurrentes (-62,4 + 4,5). La inspección también deja intereses de demora en el resultado financiero: sin ellos, el gasto financiero neto habría sido de 0,3 M [10].",
 "confianza": "Alta"
}

# ---------- Trimestres ----------
# Trimestres derivados por diferencia de acumulados publicados (1T, 1S, 9M, año) [1, 8, 10, 13-15]; BPA = beneficio atribuido / 51,15 M acciones medias.
q = [
 ("3T24", 235.3, None, 97.3, 69.2),
 ("4T24", 199.1, None, 40.2, 23.4),
 ("1T25", 154.9, 2.4, 30.3, 18.1),
 ("2T25", 159.7, None, 35.3, 21.6),
 ("3T25", 210.5, None, 83.9, 58.0),
 ("4T25", 218.4, None, 66.7, 42.7),
 ("1T26", 152.5, None, 20.3, 9.4),
 ("2T26", 191.7, None, 100.9, 75.0),
]
prev = {"3T25": 235.3, "4T25": 199.1, "2T25": 178.1, "1T26": 154.9, "2T26": 159.7}
items = []
for per, ing, g, eb, bn in q:
    gr = round((ing / prev[per] - 1) * 100, 1) if per in prev else g
    items.append({"periodo": per, "ingresos": ing, "crecimiento_pct": gr, "crecimiento_organico_pct": None,
                  "ebitda": eb, "margen_ebitda_pct": round(eb / ing * 100, 1), "bpa": round(bn / 51.15, 2), "vs_consenso": None})
items[6]["vs_consenso"] = "Inferior"
# crecimientos de 3T24 y 4T24 (frente a 3T23 y 4T23) no calculados: faltan los trimestres de 2023
items[0]["crecimiento_pct"] = None
items[1]["crecimiento_pct"] = None
trimestres = {
 "items": items,
 "ultima_presentacion": "Conferencia del 1T26 (6-may-26): Rovi rebajó la guía de 2026 de un crecimiento de los ingresos operativos «de un dígito alto a doble dígito bajo» a «entre la banda baja y la media de la primera decena» (un dígito bajo a medio; la nota en español añade «es decir, entre 0 % y 10 %») [1, 8, 11]. La acción cayó más de un 15 % ese día; según XTB, el EBIT (12,1 M) quedó un 12,5 % por debajo del consenso y el beneficio (9,5 M), un 9,5 % por debajo [17]. Dio dos motivos. El primero, que el contrato de llenado de jeringas precargadas con una farmacéutica global (información privilegiada del 25-abr-24) se retrasa porque la fabricación rutinaria espera la autorización regulatoria y hay más incertidumbre sobre la demanda, aunque se mantienen los mínimos contractuales. El segundo, la presión en precios de las heparinas y menos pedidos de socios que tienen inventario alto [8]. En el trimestre, el EBITDA cayó un 33 % (20,3 M), con las especialidades un 3 % abajo y la bemiparina 9,4 M por debajo [8, 9].\n\nConferencia del 1S26 (23-jul-26): mantuvo la guía, mejoró la de heparinas (caída de un dígito medio frente al dígito alto previsto antes) y puso el foco en la CDMO (+38 %, con BMS en torno al 13 % de esas ventas) y en Okedi (34,0 M, +27 %; pico de 100-200 M) [10, 11]. Añadió una guía de gastos generales sin Phoenix: subida de un dígito medio a alto [12]. No dio guía de márgenes ni de EBITDA, ni fecha para el contrato de jeringas. Los trimestres de la tabla salen por diferencia entre los acumulados publicados (1T, 1S, 9M y año) [1, 8, 10, 13-15]; el 2T26 lleva el badwill de 62,4 M (sin él, el EBITDA es de 38,5 M y el margen del 20,1 %). No he encontrado transcripción pública de las preguntas de los analistas: lo que se dice sobre ellas sale de las presentaciones y notas, no de la conferencia.",
 "confianza": "Media"
}

# ---------- Balance ----------
bal_x = {r['periodo']: r for r in xb['balance']['historico']}
arr = {"2020": None, "2021": 17.7, "2022": 17.9, "2023": 18.8, "2024": 16.1, "2025": 15.7}
deuda_tot = {"2020": 74.4, "2021": 73.2, "2022": 72.2, "2023": 65.4, "2024": 114.4, "2025": 121.8}
pc = {"2020": 30.8, "2021": 59.1, "2022": 116.4, "2023": 40.5, "2024": 6.6, "2025": 6.1}
reservas = {"2020": 302.2, "2021": 445.4, "2022": 456.0, "2023": 555.5, "2024": 486.2, "2025": 578.3}
hist = []
for p in ["2020", "2021", "2022", "2023", "2024", "2025"]:
    x = bal_x[p]
    r = {k: x[k] for k in ["activo_total", "activo_corriente", "pasivo_corriente", "pasivo_total", "fondo_comercio", "intangibles",
                           "inmovilizado_material", "existencias", "clientes", "proveedores", "caja", "patrimonio_neto", "minoritarios"]}
    r = {"periodo": p, **r}
    r["fondo_comercio"] = r["fondo_comercio"] or 0
    r["activos_contrato"] = None
    r["pasivos_contrato"] = pc[p]
    r["arrendamientos"] = arr[p]
    r["deuda_financiera"] = round(deuda_tot[p] - arr[p], 1) if arr[p] is not None else None
    r["reservas"] = reservas[p]
    hist.append(r)
hist[0]["patrimonio_neto"] = 373.7
hist[0]["minoritarios"] = 0
order = ["periodo", "activo_total", "activo_corriente", "pasivo_corriente", "pasivo_total", "fondo_comercio", "intangibles", "inmovilizado_material", "existencias", "clientes", "proveedores", "activos_contrato", "pasivos_contrato", "caja", "deuda_financiera", "arrendamientos", "patrimonio_neto", "minoritarios", "reservas"]
hist = [{k: h[k] for k in order} for h in hist]

balance = {
 "historico": hist,
 "vencimientos": [
   {"anio": "2026", "importe": 23.7}, {"anio": "2027", "importe": 24.4},
   {"anio": "2028-2030", "importe": 53.5}, {"anio": "2031+", "importe": 8.5}],
 "liquidez": "A 30-jun-26: efectivo de 127,0 M más 3,3 M de depósitos y activos a coste amortizado (130,2 M de tesorería bruta) frente a 107,7 M de deuda con arrendamientos, es decir, caja neta de 22,5 M; además, tres pólizas de 20 M cada una sin disponer, que vencen en 2026 y 2027 [10].",
 "rating": "Sin rating (no tiene bonos emitidos; financiación bancaria, BEI y anticipos públicos) [2]",
 "coste_deuda_pct": 2.4,
 "vida_media_anios": None,
 "otros_pasivos": "Los pasivos por contrato (anticipos de clientes de la CDMO, sobre todo Moderna) llegaron a 116,4 M en 2022 y bajaron a 6,1 M en 2025. En el 1S26 suben 46,4 M, sobre todo por los 35,9 M que se asumen con Phoenix, y entran 20,8 M de impuestos diferidos por la misma compra [10, 12]. Los ingresos diferidos suman 29,0 M a cierre de 2025, en su mayoría la ayuda LAISOLID cobrada y pendiente de imputar [1]. Hay 11,0 M de anticipos reembolsables de organismos públicos sin interés [1]. Rovi cerró con Hacienda la inspección del impuesto de sociedades de 2020-2022 (los activos por impuesto diferido suben 15,3 M) y la de retenciones, con gastos e intereses de demora en el 1S26 [10]. Paga alquileres a sociedades de la familia López-Belmonte (Norba y Lobelvia) [4, 6]. No hay pensiones de prestación definida relevantes. No he encontrado covenants publicados en las notas revisadas.",
 "comentario": "La deuda financiera sin arrendamientos pasó de 55,5 M en 2021 a 106,0 M en 2025: Rovi tomó préstamos a tipo fijo (2,75-3,49 %) en 2024 y 2025 mientras recompraba acciones, y la caja bajó a 25-27 M en 2023-2024 [1]. En 2025 la deuda neta (definición de Rovi, con arrendamientos) se redujo de 85,1 M a 21,9 M, y a 30-jun-26 había caja neta de 22,5 M [1, 10]. El circulante es pesado: existencias de 288-338 M en 2023-2025, más de un año de coste de ventas, por la materia prima de las heparinas. En 2025 bajaron 42,0 M por el abaratamiento de esa materia prima [1]. Los clientes subieron 48,1 M en 2025 [1]. El vencimiento por años es el contractual sin descontar (incluye intereses) de préstamos y deuda pública a cierre de 2025, sin arrendamientos [2].",
 "confianza": "Alta"
}

# ---------- Flujos ----------
fl_x = {r['periodo']: r for r in xb['flujos']['historico']}
compras = {"2020": 37.26, "2021": 78.78, "2022": 177.01, "2023": 133.9, "2024": 89.71, "2025": 54.86}
reemision = {"2020": 37.49, "2021": 42.33, "2022": 77.77, "2023": 52.64, "2024": 41.92, "2025": 54.85}
aport_min = {"2020": 0, "2021": 0, "2022": 1.37, "2023": 2.78, "2024": 5.41, "2025": 1.51}
adq = {"2020": 0, "2021": 0, "2022": 0, "2023": 0.6, "2024": 19.1, "2025": 3.5}
pag_arr = {"2020": None, "2021": None, "2022": 3.4, "2023": 4.5, "2024": 6.1, "2025": 6.4}
fh = []
for p in ["2020", "2021", "2022", "2023", "2024", "2025"]:
    x = fl_x[p]
    neto = compras[p] - reemision[p]
    fh.append({"periodo": p, "flujo_operativo": x['flujo_operativo'], "capex": x['capex'], "pagos_arrendamientos": pag_arr[p],
               "adquisiciones": adq[p], "desinversiones": x['desinversiones'], "dividendos": x['dividendos'],
               "recompras": round(max(neto, 0), 1), "emision_acciones": round(max(-neto, 0) + aport_min[p], 1),
               "intereses_en_financiacion": x['intereses_en_financiacion']})
flujos = {
 "historico": fh,
 "comentario": "El flujo operativo va a golpes por los anticipos de clientes de la CDMO: 237,6 M en 2022, cuando los pasivos por contrato subieron a 116 M, y 113,2 M en 2023, cuando se consumieron [4, 5]. En 2025 subió a 187,1 M por el cobro de 40,1 M de la ayuda del CDTI y la bajada de 43,0 M de existencias, aunque los clientes absorbieron 30,2 M y los servicios de fabricación prepagados restaron 17,9 M [1]. Rovi da su propio flujo libre: 120,0 M en 2025 frente a 76,2 M en 2024, y 64,7 M en el 1S26 [1, 10]. El capex de 2025 fue de 67,8 M, de los que la empresa llama mantenimiento 21,6 M y crecimiento 46,2 M (líneas de llenado 33,3 M y Glicopepton 11,1 M) [1]. Las recompras son netas de las reventas de autocartera, porque Rovi compra y revende acciones de forma continua: en 2025, 54,9 M de compras y 54,9 M de reventas [1]. Los pagos de arrendamientos de 2024-2025 son una estimación propia (saldo inicial + altas de derechos de uso − saldo final); los de 2022-2023, la parte a corto plazo del pasivo al cierre anterior [2, 4, 5].",
 "confianza": "Media"
}

calidad = {
 "auditor": "KPMG Auditores, S.L.",
 "anios_auditor": 9,
 "opinion": "Favorable (sin salvedades). Cuestiones clave de auditoría: reconocimiento de ingresos por venta de bienes (472,5 M) y por servicios de fabricación a terceros, incluidos los que se reconocen por grado de avance [2].",
 "comentario": "KPMG audita a Rovi desde el ejercicio 2017 y se le renueva cada año; la opinión de 2025 es favorable [2]. Rovi no capitaliza I+D de forma relevante: los intangibles se quedan en unos 33-41 M en todo el periodo y los trabajos para el inmovilizado son de 0,7 M en 2025 [1, 3-7]. No hay pagos en acciones relevantes ni acciones dilutivas [2]. La cuenta se presenta por naturaleza: el coste de ventas y los gastos generales de esta nota siguen la definición de Rovi. Hay tres partidas que distorsionan la comparación entre años. La primera, los anticipos de la CDMO, que en 2022-2023 movieron el flujo operativo en más de 100 M. La segunda, la ayuda del CDTI reconocida de golpe en 2025. La tercera, el badwill de Phoenix en 2026, que hace que el beneficio del 1S26 (84,4 M) no sirva como base: sin badwill, el EBIT del semestre fue de 40,9 M, un 20 % menos [10]. Los indicadores del motor (Altman, Piotroski, Beneish) hay que leerlos con estas tres partidas presentes.",
 "senales": [
   {"senal": "Badwill de 62,4 M por Phoenix, provisional y sin efecto fiscal", "nivel": "Media", "comentario": "Rovi pagó 28,0 M USD (24,1 M EUR) por una planta cuyos activos netos valoró en 86,5 M: inmovilizado a valor razonable de 141,0 M frente a 165,4 M en libros, menos 35,9 M de pasivos por contrato y 20,8 M de impuestos diferidos. La asignación es provisional durante 12 meses. Duplica el beneficio del 1S26 [12]."},
   {"senal": "Ayuda del CDTI reconocida de golpe en 2025", "nivel": "Baja", "comentario": "Los 12,6 M de otros ingresos de 2025 cubren gastos de I+D desde enero de 2023: inflan el margen de 2025 y el del 1S26 (12,8 M) frente a años anteriores [1, 10]."},
   {"senal": "Inspección fiscal de 2020-2022 (sociedades y retenciones)", "nivel": "Baja", "comentario": "Acuerdo con la Agencia Tributaria que modifica las bases imponibles de 2020-2022, con 15,3 M más de activos por impuesto diferido, y gastos e intereses de demora en el 1S26 [10]."},
   {"senal": "Ingresos de la CDMO por grado de avance y anticipos", "nivel": "Media", "comentario": "Parte de los ingresos por servicios se reconoce en el tiempo, y en 2022-2023 los anticipos de Moderna movieron el circulante y el flujo operativo en más de 100 M. Es cuestión clave de auditoría [2, 4, 5]."},
 ],
 "confianza": "Media"
}

capital = {
 "politica": "Rovi reparte en torno al 35 % del beneficio consolidado atribuido en un único dividendo anual tras la junta: 0,9351 EUR con cargo a 2024 y 0,9594 EUR con cargo a 2025, este último pagado el 15-jul-26 [1, 10]. Hubo programas de recompra con amortización de acciones (el capital bajó de 3,36 M a 3,07 M de nominal entre 2021 y 2025) y compra y reventa continua de autocartera [3, 7]. Las prioridades que declara son la capacidad de llenado estéril (CDMO), la I+D de la tecnología ISM, con una media de 40-60 M al año de I+D en 2025-2030, y la integración vertical de la heparina (Glicopepton) [16]. Objetivos para 2030 del Capital Markets Day: ingresos operativos de 1,5 a 1,8 veces los de 2024, CDMO de unos 700 M y EBITDA antes de I+D de 2,5 a 2,8 veces el de 2024 [16].",
 "adquisiciones": [
   {"anio": "2026", "objetivo": "Planta de inyectables de Bristol Myers Squibb en Phoenix (Arizona, EE. UU.)", "importe": 24.1, "ev_ebitda": None, "financiacion": "Caja (28,0 M USD)", "resultado": "Badwill de 62,4 M. Contrato de fabricación para BMS de 5 años con un pago mínimo de 50 M USD al año. Entre abril y junio aportó 14,0 M de ingresos y 0,6 M de pérdida [12, 1]."},
   {"anio": "2025", "objetivo": "Cells IA Technologies (software médico), del 26 % al 94,995 %", "importe": 4.8, "ev_ebitda": None, "financiacion": "Caja y ampliación de capital", "resultado": "Fondo de comercio de 2,7 M. Inmaterial [2, 12]."},
   {"anio": "2024", "objetivo": "Terafront Farmatech (25,5 %, sociedad conjunta con Innvierte del CDTI)", "importe": 19.1, "ev_ebitda": None, "financiacion": "Caja", "resultado": "Puesta en equivalencia. Participación de 19,2 M a cierre de 2025, sin resultados relevantes [2]."},
 ],
 "comentario": "Entre 2020 y 2025 el flujo operativo acumulado fue de 872 M. Rovi lo usó en capex (317 M, con fuerte inversión en capacidad de llenado), dividendos (255 M) y recompras netas (265 M, concentradas en 2021-2024) [3-7]. Las acciones medias bajaron de 55,5 M a 51,1 M, un 8 % [4-7]. Recompró sobre todo en 2022-2023, con el beneficio de la vacuna en máximos, y la caja llegó a bajar a 25 M en 2023 [5]. Las compras han sido pequeñas y baratas, la mayor la de Phoenix en 2026, con badwill. Su rentabilidad depende de que llene la planta más allá del mínimo de BMS: en el 2T26 dio pérdidas [12]. La tesis de capital es orgánica: CDMO de unos 700 M en 2030 frente a 269,5 M en 2025 [16].",
 "confianza": "Media"
}

negocio = {
 "descripcion": None, "como_gana_dinero": None,
 "segmentos": [
   {"nombre": "Especialidades farmacéuticas", "descripcion": "Heparinas (enoxaparina biosimilar, bemiparina), Okedi (risperidona ISM), productos con licencia (Neparvis, Volutsa, Orvatez, Rolcya), agentes de contraste y otros productos hospitalarios.", "tipo_resultado": None,
    "historico": [{"periodo": "2020", "ingresos": 328, "resultado": None}, {"periodo": "2021", "ingresos": 384, "resultado": None}, {"periodo": "2022", "ingresos": 414, "resultado": None}, {"periodo": "2023", "ingresos": 420, "resultado": None}, {"periodo": "2024", "ingresos": 427.5, "resultado": None}, {"periodo": "2025", "ingresos": 473.9, "resultado": None}]},
   {"nombre": "Fabricación a terceros (CDMO)", "descripcion": "Llenado y acabado estéril de jeringas precargadas, viales y cartuchos en Madrid, San Sebastián de los Reyes y Granada, y desde abril de 2026 en Phoenix (EE. UU.). Clientes: Moderna, BMS, Roche y una farmacéutica global con contrato de jeringas.", "tipo_resultado": None,
    "historico": [{"periodo": "2020", "ingresos": 92, "resultado": None}, {"periodo": "2021", "ingresos": 265, "resultado": None}, {"periodo": "2022", "ingresos": 404, "resultado": None}, {"periodo": "2023", "ingresos": 409, "resultado": None}, {"periodo": "2024", "ingresos": 336.2, "resultado": None}, {"periodo": "2025", "ingresos": 269.5, "resultado": None}]},
   {"nombre": "Otros", "descripcion": "Servicios no significativos y redondeo de las cifras de 2020-2023, que vienen de un gráfico de la empresa en millones enteros.", "tipo_resultado": None,
    "historico": [{"periodo": "2020", "ingresos": 0.0, "resultado": None}, {"periodo": "2021", "ingresos": -0.3, "resultado": None}, {"periodo": "2022", "ingresos": -0.3, "resultado": None}, {"periodo": "2023", "ingresos": 0.5, "resultado": None}, {"periodo": "2024", "ingresos": 0.0, "resultado": None}, {"periodo": "2025", "ingresos": 0.1, "resultado": None}]},
 ],
 "geografias": [{"nombre": "España", "peso_pct": 38.4}, {"nombre": "Fuera de España", "peso_pct": 61.6}],
 "geografias_criterio": "destino",
 "clientes": None,
 "kpis": [
   {"kpi": "Ventas de Okedi (M EUR)", "valor_anterior": "28,8 (2024)", "valor_actual": "56,7 (2025); 34,0 en el 1S26", "variacion": "+97 %; +27 % en el 1S26", "comentario": "Ventas máximas objetivo de 100-200 M [1, 11]"},
   {"kpi": "Franquicia de heparinas (M EUR)", "valor_anterior": "248,7 (2024)", "valor_actual": "266,8 (2025); 130,1 en el 1S26", "variacion": "+7 %; -4 % en el 1S26", "comentario": "Guía 2026 de las HBPM: caída de un dígito medio [1, 10, 11]"},
   {"kpi": "Enoxaparina biosimilar (M EUR)", "valor_anterior": "145,2 (2024)", "valor_actual": "157,7 (2025)", "variacion": "+9 %", "comentario": "Pedidos de socios internacionales [1]"},
   {"kpi": "Ventas de la CDMO (M EUR)", "valor_anterior": "336,2 (2024)", "valor_actual": "269,5 (2025); 106,3 en el 1S26", "variacion": "-20 %; +38 % en el 1S26", "comentario": "Objetivo de unos 700 M en 2030 [1, 10, 16]"},
   {"kpi": "Gasto en I+D (M EUR)", "valor_anterior": "25,8 (2024)", "valor_actual": "37,8 (2025); 33,3 en el 1S26", "variacion": "+47 %; +98 % en el 1S26", "comentario": "Fase III de Letrozol SIE [1, 10]"},
   {"kpi": "Ventas fuera de España (% de los ingresos operativos)", "valor_anterior": "64 % (2024)", "valor_actual": "62 % (2025); 59 % en el 1S26", "variacion": "-2 pp", "comentario": "Baja por la CDMO en 2025 [1, 10]"},
   {"kpi": "Capex de mantenimiento (M EUR)", "valor_anterior": "15,6 (2024)", "valor_actual": "21,6 (2025)", "variacion": "+39 %", "comentario": "El capex total fue de 67,8 M [1]"},
 ],
 "confianza": "Alta"
}

huecos = [
 {"seccion": "flujos", "campo": "pagos_arrendamientos 2020-2021", "tipo": "Núcleo", "intentos": "1) Estado de flujos ESEF 2021: los pagos de arrendamiento van dentro de «amortización de deuda financiera», sin desglose; 2) Notas de deuda financiera del ESEF 2022: saldo de 2021, pero no de 2020 ni los pagos; 3) Estimación por variación del saldo: no hay saldo de arrendamientos de 2020", "decision": "Omitido"},
 {"seccion": "balance", "campo": "arrendamientos y deuda financiera sin arrendamientos 2020", "tipo": "Núcleo", "intentos": "1) Bloques de texto del ESEF 2021 (no traen la nota de deuda); 2) Nota de deuda del ESEF 2022 (solo 2022 y 2021); 3) Deuda total de 2020 (74,4 M con arrendamientos) sin desglose", "decision": "Omitido"},
 {"seccion": "balance", "campo": "vida_media_anios", "tipo": "Complemento", "intentos": "1) Nota 18 de las cuentas de 2025; 2) Tabla de préstamos de la nota de prensa del 1S26 (vencimientos de 2028 a 2032, sin vida media); 3) Cálculo: los flujos sin descontar no permiten una media fiable", "decision": "Omitido"},
 {"seccion": "trimestres", "campo": "vs_consenso de 3T24-4T25 y 2T26", "tipo": "Complemento", "intentos": "1) Notas de prensa (no citan consenso); 2) Presentaciones (no lo citan); 3) No hay consenso trimestral previo archivado y accesible", "decision": "Omitido"},
 {"seccion": "trimestres", "campo": "transcripciones de las conferencias del 1T26 y del 1S26", "tipo": "Complemento", "intentos": "1) Web de inversores de Rovi (solo notas, presentaciones y resúmenes ejecutivos); 2) Comunicados a la CNMV (sin transcripción); 3) Resumen de Quartr citado en el informe del 14-oct, no accesible para comprobarlo", "decision": "Omitido"},
 {"seccion": "trimestres", "campo": "resultados del 3T26 (9M26)", "tipo": "Complemento", "intentos": "1) Web de inversores a 27-oct-26: no publicados (los de 9M25 salieron el 6-nov-25); 2) Lista de PDF de la web: el último es el del 1S26; 3) Sin publicar a la fecha de corte", "decision": "Omitido"},
]

out = {"negocio": negocio, "financieros": financieros, "trimestres": trimestres, "balance": balance, "flujos": flujos,
       "calidad": calidad, "rentabilidad": None, "capital": capital, "fuentes": fuentes, "huecos": huecos}
json.dump(out, open(os.path.join(D, 'A.json'), 'w'), ensure_ascii=False, indent=1)
print('ok')

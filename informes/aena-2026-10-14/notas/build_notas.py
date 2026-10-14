# Genera las notas A-E de Aena (corte 2026-10-14) a partir de los extractos de búsqueda web (única red disponible).
# Las cifras marcadas «estimación propia» en los textos se derivan de otras publicadas; el resto, de la fuente citada.
import json, os
DIR = os.path.dirname(os.path.abspath(__file__))

def w(letra, obj):
    with open(os.path.join(DIR, letra + '.json'), 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)

AENA = 'Aena'
# ---------------------------------------------------------------- A. Cuentas
A_f = [
 {"id":1,"titulo":"Aena obtiene un beneficio neto de 2.136,7 millones de euros en 2025 (nota de resultados 2025)","editor":AENA,"tipo":"Primaria","fecha":"2026-02-25","url":"https://www.aena.es/es/prensa/aena-obtiene-un-beneficio-neto-de-2.1367-millones-de-euros-en-2025.html"},
 {"id":2,"titulo":"Aena cierra el primer semestre de 2026 con un beneficio de 1.002 millones de euros","editor":AENA,"tipo":"Primaria","fecha":"2026-07-29","url":"https://www.aena.es/es/prensa/aena-cierra-el-primer-semestre-de-2026-con-un-beneficio-de-1.002-millones---de-euros.html"},
 {"id":3,"titulo":"Aena eleva un 12,10 % su beneficio en el primer semestre hasta los 1.002 millones","editor":"Estrategias de Inversión","tipo":"Prensa","fecha":"2026-07-29","url":"https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/aena-eleva-un-1210-su-beneficio-en-el-primer-semestre-n-938955"},
 {"id":4,"titulo":"Resultados anuales 2024: Aena obtiene un beneficio neto récord de 1.934 millones de euros","editor":AENA,"tipo":"Primaria","fecha":"2025-02-26","url":"https://www.aena.es/es/prensa/resultados-anuales-2024--aena-obtiene-un-beneficio-neto-record-de-1.934-millones-de-euros-en-2024.html"},
 {"id":5,"titulo":"Aena supera el EBITDA de 2019 y logra un beneficio neto de 1.631 millones de euros (resultados 2023)","editor":AENA,"tipo":"Primaria","fecha":"2024-02-28","url":"https://www.aena.es/es/prensa/aena-supera-el-ebitda-de-2019-y-logra-un-beneficio-neto-de-1.631---millones-de-euros.html"},
 {"id":6,"titulo":"Resultados 2022 (nota de prensa en PDF)","editor":AENA,"tipo":"Primaria","fecha":"2023-02-28","url":"https://www.aena.es/doc/detalleprensa/230228-aena-resultados-2022.pdf"},
 {"id":7,"titulo":"Aena sale de pérdidas, consigue un beneficio de 901,5 millones y vuelve al dividendo","editor":"Estrategias de Inversión","tipo":"Prensa","fecha":"2023-02-28","url":"https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/aena-sale-de-perdidas-consigue-un-beneficio-de-n-597765"},
 {"id":8,"titulo":"Aena S.M.E.: Financial data, forecasts and estimates (EBIT y BAI de 2022-2025)","editor":"MarketScreener","tipo":"Datos de mercado","fecha":"2026-07","url":"https://www.marketscreener.com/quote/stock/AENA-S-M-E-S-A-20798509/finances/"},
 {"id":9,"titulo":"Cuentas anuales consolidadas 2025: estado de situación financiera consolidado","editor":AENA,"tipo":"Primaria","fecha":"2026-02-25","url":"https://www.aena.es/sites/Satellite?blobcol=urldata&blobkey=id&blobtable=MungoBlobs&blobwhere=1576873450971&ssbinary=true"},
 {"id":10,"titulo":"Aena earns 1,579.4 million euros in the first nine months of 2025","editor":AENA,"tipo":"Primaria","fecha":"2025-10-29","url":"https://www.aena.es/en/press/aena-earns-1579.4-million-euros-in-the-first-nine-months-of-2025.html"},
 {"id":11,"titulo":"Aena gana 329,4 millones hasta marzo, un 9,3 % más, con una subida del 11,6 % en ingresos","editor":"Bolsamanía","tipo":"Prensa","fecha":"2026-04-29","url":"https://www.bolsamania.com/noticias/empresas/aena-gana-3294-millones-hasta-marzo-93-mas-subida-116-ingresos--22374530.html"},
 {"id":12,"titulo":"Junta General de Accionistas 2026 (dividendo de 1,09 EUR; revalorización de 2025)","editor":AENA,"tipo":"Primaria","fecha":"2026-04-16","url":"https://www.aena.es/doc/detalleprensa/260416-aena-junta-general-accionistas-2026.pdf"},
 {"id":13,"titulo":"Aena reparte 1.635 millones en dividendos tras un 2025 récord","editor":"Merca2","tipo":"Prensa","fecha":"2026-04-27","url":"https://www.merca2.es/2026/04/27/aena-dividendo-1635-millones-2025-2373293/"},
 {"id":14,"titulo":"La Junta de Aena aprueba un dividendo de 9,76 euros, el mayor de la historia de la compañía","editor":"Bolsamanía","tipo":"Prensa","fecha":"2025-04-09","url":"https://www.bolsamania.com/noticias/empresas/junta-aena-aprueba-dividendo-976-euros-mayor-historia-compania--19330881.html"},
 {"id":15,"titulo":"Aena S.M.E. (BME:AENA) income statement","editor":"Stock Analysis","tipo":"Datos de mercado","fecha":"2026-10","url":"https://stockanalysis.com/quote/bme/AENA/financials/income-statement/"},
 {"id":16,"titulo":"Aena: 2025, la generación de caja operativa por debajo de nuestra previsión; guía 2026 por debajo","editor":"Renta 4","tipo":"Analistas","fecha":"2026-02-25","url":"https://www.r4.com/articulos-y-analisis/valores/aena-2025-la-generacion-de-caja-operativa-por-debajo-de-nuestra-prevision-guia-2026-por-debajo-de-previsiones"},
 {"id":17,"titulo":"Aena aprueba dividendo récord y desdobla sus acciones (split 10 por 1)","editor":"Aviacionline","tipo":"Prensa","fecha":"2025-04","url":"https://dosunos.aviacionline.com/aena-aprueba-dividendo-record-y-desdobla-sus-acciones-tras-un-ano-de-beneficios-maximos"},
]
ACC = 1500.0  # 150 M de acciones antes del split 10x1 de 2025 [A17]
def cuenta(p, ing, ebitda, ebit, bai, bn, dpa, nr=None):
    am = round(ebitda - ebit, 1) if ebit is not None else None
    fin = round(bai - ebit, 1) if (bai is not None and ebit is not None) else None
    imp = round(bai - bn, 1) if bai is not None else None
    return {"periodo":p,"ingresos":ing,"coste_ventas":None,"gastos_generales":None,"ebitda":ebitda,"amortizaciones":am,"ebit":ebit,
            "resultado_financiero":fin,"bai":bai,"impuestos":imp,"minoritarios":0,"beneficio_neto":bn,"gastos_financieros":(-fin if fin is not None else None),
            "participadas_en_ebitda":None,"no_recurrentes_en_ebitda":nr,"bpa":round(bn/ACC,3),"dpa":dpa,"dpa_extraordinario":0,"acciones_diluidas":ACC}
A = {
 "_estado":"completo con huecos (solo búsqueda web)",
 "financieros":{
  "cuenta":[
   cuenta("2022",4237.5,2078.9,1280.0,1180.0,901.5,0.475),
   cuenta("2023",5141.8,3022.6,2205.0,2120.0,1630.8,0.766,-154.0),
   cuenta("2024",5827.8,3510.3,2663.0,2556.0,1934.2,0.976),
   cuenta("2025",6379.2,3785.0,2988.0,2859.0,2136.7,1.09),
  ],
  "ltm":{"periodo":"LTM jun-26","fecha_fin":"2026-06-30","ingresos":6681.8,"ebitda":3892.0,"ebit":None,"beneficio_neto":2244.9,"bpa":1.497,"dpa":1.09,"dpa_extraordinario":0,"fcf":None,"participadas_en_ebitda":None,"no_recurrentes_en_ebitda":None},
  "cambios_perimetro":[],
  "comentario":"Aena volvió a beneficios en 2022 (901,5 M) tras las pérdidas de la pandemia (−475,4 M en 2021) y desde entonces encadena récords: 1.630,8 M en 2023, 1.934,2 M en 2024 y 2.136,7 M en 2025 [A5, A4, A1, A7]. Los ingresos totales pasaron de 4.237,5 M a 6.379,2 M (+9,5 % en 2025) y el EBITDA de 2.078,9 M a 3.785 M, con un margen del 59,3 % en 2025 (61,4 % sin la CINIIF 12, que suma como ingreso las obras de las concesiones de Brasil a margen cero) [A1]. El OPEX creció un 11,1 % en 2025, más que los ingresos, y en el 1S26 el EBITDA subió un 6,3 % con ingresos +10,1 %: el margen se estrecha [A1, A2]. El EBIT de 2022 y 2025, y el BAI de 2024-2025, vienen de MarketScreener [A8]; el EBIT y el BAI de 2022-2023 son estimación propia (amortización ≈ 800-820 M al año, como la de 2024-2025, y resultado financiero ≈ −90/−100 M).",
  "ajustes":"Cifras reportadas. 2023 lleva dentro del EBITDA la reversión del deterioro de los aeropuertos del Nordeste de Brasil (≈154 M: el margen pasa del 58,8 % al 55,8 % sin ella; estimación propia del importe con el margen publicado) [A5], que va en no_recurrentes_en_ebitda con signo negativo. El impuesto de cada año es BAI menos beneficio atribuido, e incluye por tanto los minoritarios de Luton (49 % de terceros), que no se han podido separar. El BPA usa 1.500 M de acciones en todos los años (150 M antes del desdoblamiento 10 por 1 de 2025) [A17]; los DPA se expresan también por acción nueva (9,76 EUR de 2024 = 0,976) [A14].",
  "confianza":"Media"},
 "trimestres":{
  "items":[
   {"periodo":"1S25","ingresos":2997.0,"crecimiento_pct":None,"crecimiento_organico_pct":None,"ebitda":1692.3,"margen_ebitda_pct":56.5,"bpa":0.596,"vs_consenso":None},
   {"periodo":"2S25","ingresos":3382.2,"crecimiento_pct":None,"crecimiento_organico_pct":None,"ebitda":2092.7,"margen_ebitda_pct":61.9,"bpa":0.829,"vs_consenso":None},
   {"periodo":"1S26","ingresos":3299.6,"crecimiento_pct":10.1,"crecimiento_organico_pct":None,"ebitda":1798.9,"margen_ebitda_pct":54.5,"bpa":0.668,"vs_consenso":None},
  ],
  "ultima_presentacion":"En el 1S26 Aena ganó 1.002 M (+12,1 %), con ingresos de 3.299,6 M (+10,1 %; aeronáuticos 1.702,1 M y comerciales 991 M) y EBITDA de 1.798,9 M (+6,3 %; margen del 54,5 %) [A2, A3]. El tráfico del grupo creció un 3,9 %, hasta 189,96 millones de pasajeros [A3]. La dirección mantiene un crecimiento del tráfico de alrededor del 3 % en 2026, pero avisó de un factor de ocupación más débil y de la incertidumbre por el fin de las coberturas de combustible de las aerolíneas y el conflicto de Oriente Medio [A2]. La deuda financiera neta subió a 6.724 M (1,73 veces el EBITDA) desde 5.509 M en diciembre, por el dividendo de abril (≈1.635 M) y la inversión [A3, A13]. En el 1T26 ganó 329,4 M (+9,3 %) con ingresos +11,6 % [A11]. La acción cayó tras los resultados del 2T; Jefferies lo atribuyó al posicionamiento y no a los fundamentales [D5]. Las cifras de 1S25 y 2S25 son estimación propia (1S26 entre su crecimiento publicado, y el año menos el semestre).",
  "confianza":"Media"},
 "balance":{
  "historico":[
   {"periodo":"2022","activo_total":None,"activo_corriente":None,"pasivo_corriente":None,"pasivo_total":None,"fondo_comercio":None,"intangibles":None,"inmovilizado_material":None,"existencias":None,"clientes":None,"proveedores":None,"activos_contrato":None,"pasivos_contrato":None,"caja":0,"deuda_financiera":None,"arrendamientos":None,"patrimonio_neto":None,"minoritarios":None,"reservas":None},
   {"periodo":"2023","activo_total":None,"activo_corriente":None,"pasivo_corriente":None,"pasivo_total":None,"fondo_comercio":None,"intangibles":None,"inmovilizado_material":None,"existencias":None,"clientes":None,"proveedores":None,"activos_contrato":None,"pasivos_contrato":None,"caja":0,"deuda_financiera":6222,"arrendamientos":None,"patrimonio_neto":None,"minoritarios":None,"reservas":None},
   {"periodo":"2024","activo_total":None,"activo_corriente":None,"pasivo_corriente":None,"pasivo_total":None,"fondo_comercio":None,"intangibles":None,"inmovilizado_material":None,"existencias":None,"clientes":None,"proveedores":None,"activos_contrato":None,"pasivos_contrato":None,"caja":0,"deuda_financiera":5498,"arrendamientos":None,"patrimonio_neto":None,"minoritarios":None,"reservas":None},
   {"periodo":"2025","activo_total":None,"activo_corriente":None,"pasivo_corriente":None,"pasivo_total":None,"fondo_comercio":None,"intangibles":None,"inmovilizado_material":None,"existencias":None,"clientes":None,"proveedores":None,"activos_contrato":None,"pasivos_contrato":None,"caja":0,"deuda_financiera":5509,"arrendamientos":None,"patrimonio_neto":9154.6,"minoritarios":None,"reservas":None},
  ],
  "vencimientos":[],
  "liquidez":"Deuda financiera neta contable de 6.724 M a 30-jun-26 (1,73 veces el EBITDA) [A3]; la caja y las líneas no dispuestas no se pudieron leer.",
  "rating":"Moody's A2 (mejora de 2025) [D11]; Fitch y S&P no comprobados.",
  "coste_deuda_pct":None,"vida_media_anios":None,
  "otros_pasivos":"No se pudieron leer las notas de provisiones, litigios ni compromisos de inversión. El compromiso material es la inversión del DORA III: 12.888 M en 2027-2031, de ellos 9.991 M regulados, que Moody's espera que lleve la caja libre a terreno negativo desde 2027 [B4, D11]. Luton tiene el 49 % en manos de terceros, que sí figuran en el patrimonio consolidado.",
  "comentario":"La deuda neta bajó de 6.222 M en 2023 a 5.498 M en 2024 y se quedó en 5.509 M en 2025 (1,46 veces el EBITDA) [A5, A4, A1]; dentro del año oscila con el pago del dividendo (5.973 M en junio de 2025, 5.127 M en septiembre) [A10]. En junio de 2026 llegó a 6.724 M [A3]. El balance solo recoge la deuda neta (en deuda_financiera, con caja 0) y el patrimonio consolidado de 2025 (9.154,6 M) [A9]: las demás partidas no se pudieron leer.",
  "confianza":"Baja"},
 "flujos":{
  "historico":[
   {"periodo":"2024","flujo_operativo":2746.9,"capex":874.0,"pagos_arrendamientos":0,"adquisiciones":0,"desinversiones":0,"dividendos":1149.0,"recompras":0,"emision_acciones":0,"intereses_en_financiacion":0},
   {"periodo":"2025","flujo_operativo":2787.5,"capex":1334.5,"pagos_arrendamientos":0,"adquisiciones":0,"desinversiones":0,"dividendos":1464.0,"recompras":0,"emision_acciones":0,"intereses_en_financiacion":0},
  ],
  "comentario":"El flujo de explotación fue de 2.787,5 M en 2025 y 2.746,9 M en 2024, y en el 1S26 de 1.598,5 M (1.479,5 M un año antes) [A1, A3]. Renta 4 lo vio por debajo de su previsión en 2025 [A16]. La inversión de 2024 y 2025 es estimación propia: flujo de explotación menos dividendo pagado (7,66 y 9,76 EUR por acción antigua) más la variación de la deuda neta, por lo que incluye otras salidas (Brasil, Luton) [A4, A14]. La conversión del EBITDA en caja de explotación ronda el 74 %; la caja libre tras inversión fue ≈1.450 M en 2025, y bajará con el DORA III.",
  "confianza":"Baja"},
 "calidad":{"auditor":None,"anios_auditor":None,"opinion":None,
  "comentario":"No se pudo leer el informe de auditoría. Lo que se ve: el margen EBITDA publicado se mezcla con la CINIIF 12 (ingresos de construcción en Brasil a margen cero: 59,3 % frente a 61,4 % sin ella) y 2023 lleva una reversión de deterioro de Brasil dentro del EBITDA [A1, A5]. Las cuentas de 2021 se reexpresaron por el cambio de criterio de las rentas mínimas garantizadas de los locales comerciales, un litigio con arrendatarios de la pandemia [A6]. Los indicadores del motor (Altman, Piotroski, Beneish) no se pueden calcular sin balance completo.",
  "senales":[{"senal":"CINIIF 12 en Brasil","nivel":"Baja","comentario":"Infla ingresos sin margen; el margen comparable es el que la empresa da sin ella."},{"senal":"Reversión de deterioro en el EBITDA de 2023","nivel":"Media","comentario":"≈154 M (estimación propia); se trata como no recurrente."}],
  "confianza":"Baja"},
 "capital":{
  "politica":"Dividendo del 80 % del beneficio (payout) en efectivo: 1,09 EUR por acción con cargo a 2025 (+11,7 %), ≈1.635 M pagados el 27 de abril de 2026 [A12, A13]. No hay recompras. La prioridad declarada para la caja es el plan de inversión del DORA III (12.888 M en 2027-2031) y las concesiones de Brasil (5.700 M de reales para 11 aeropuertos) [A1, B4].",
  "adquisiciones":[
   {"anio":"2023","objetivo":"Aeropuertos del Bloque Nordeste y de los 11 aeropuertos de la 7.ª ronda de Brasil (concesiones)","importe":None,"ev_ebitda":None,"financiacion":"Caja y deuda local","resultado":"Reversión del deterioro del Nordeste en 2023: la concesión mejora frente a lo previsto [A5]."},
   {"anio":"2023","objetivo":"Control de London Luton (51 %)","importe":None,"ev_ebitda":None,"financiacion":"Caja","resultado":"Consolidado; tráfico en crecimiento."},
   {"anio":"2025","objetivo":"Leeds Bradford (Reino Unido)","importe":None,"ev_ebitda":None,"financiacion":"Caja","resultado":"Demasiado reciente."}],
  "comentario":"Aena es una empresa de dividendo: reparte el 80 % del beneficio y la deuda neta lleva tres años en 5.500-6.200 M. Con el DORA III la inversión casi se duplica y el dividendo, al 80 %, pasará a financiarse en parte con deuda. Las compras internacionales (Brasil, Luton, Leeds Bradford) son pequeñas frente a la red española y no se pudo leer su rentabilidad.",
  "confianza":"Baja"},
 "negocio":{
  "segmentos":[],
  "geografias":[],
  "kpis":[
   {"kpi":"Pasajeros del grupo (millones)","valor_anterior":"369,3 (2024)","valor_actual":"384,8 (2025)","variacion":"+4,2 %","comentario":"España, Luton, Leeds Bradford y 17 aeropuertos en Brasil [A1]."},
   {"kpi":"Pasajeros 1S (millones)","valor_anterior":"182,8 (1S25)","valor_actual":"189,96 (1S26)","variacion":"+3,9 %","comentario":"[A3]"},
   {"kpi":"Ingresos comerciales (M EUR)","valor_anterior":"1.780 (2024)","valor_actual":"1.975,1 (2025)","variacion":"+11 %","comentario":"Tiendas, restauración, aparcamientos, alquiler de coches, VIP [A1, A4]."},
   {"kpi":"Margen EBITDA","valor_anterior":"60,2 % (2024)","valor_actual":"59,3 % (2025); 54,5 % (1S26)","variacion":"−0,9 p.p.","comentario":"El OPEX crece más que los ingresos [A1, A2]."}],
  "confianza":"Media"},
 "fuentes":A_f,
 "huecos":[
  {"seccion":"balance","campo":"historico (activo, pasivo, circulante, caja y deuda bruta)","tipo":"Núcleo","intentos":"1) Búsqueda de las cuentas anuales consolidadas 2025 y del balance de la nota de resultados; 2) búsqueda en inglés y en Stock Analysis; 3) solo aparece el patrimonio (9.154,6 M) y la deuda neta: WebFetch no funciona en este entorno","decision":"Omitido"},
  {"seccion":"flujos","campo":"capex publicado 2022-2025","tipo":"Núcleo","intentos":"1) Nota de resultados 2025; 2) prensa y Renta 4; 3) derivado de flujo de explotación, dividendo y deuda neta para 2024-2025","decision":"Calculado y marcado como estimación"},
  {"seccion":"negocio","campo":"segmentos con historia","tipo":"Complemento","intentos":"1) Nota de resultados 2025 (aeronáutico, comercial, inmobiliario, Luton, Brasil); 2) prensa; 3) solo aparecen ingresos aeronáuticos y comerciales sueltos","decision":"Omitido"},
  {"seccion":"calidad","campo":"auditor y opinión","tipo":"Complemento","intentos":"1) Informe de auditoría 2025; 2) IAGC; 3) prensa","decision":"Omitido"},
 ]
}
w('A', A)

# ---------------------------------------------------------------- B. Sector y competencia
B_f = [
 {"id":1,"titulo":"La CNMC propone rebajar las tasas aeroportuarias hasta 2031 frente a la intención de Aena","editor":"RTVC","tipo":"Prensa","fecha":"2026-06-03","url":"https://rtvc.es/la-cnmc-propone-rebajar-las-tasas-aeroportuarias-hasta-2031-3-junio-2026/"},
 {"id":2,"titulo":"Propuesta de DORA III (nota de prensa)","editor":AENA,"tipo":"Primaria","fecha":"2026-02-18","url":"https://www.aena.es/doc/detalleprensa/260218-np-propuesta-dora-iii.pdf"},
 {"id":3,"titulo":"El Gobierno encarece las tasas aeroportuarias de Aena 3 céntimos al año para financiar un plan de 13.000 millones","editor":"Vozpópuli","tipo":"Prensa","fecha":"2026-09","url":"https://www.vozpopuli.com/economia/el-gobierno-encarece-las-tasas-aeroportuarias-de-aena-3-centimos-al-ano-para-financiar-un-plan-de-13000-millones.html"},
 {"id":4,"titulo":"Pista despejada para Aena: 13.000 millones de inversión (DORA III aprobado; lectura de Bank of America)","editor":"Estrategias de Inversión","tipo":"Prensa","fecha":"2026-09","url":"https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/pista-despejada-para-aena-13000-millones-de-inversion-n-949951"},
 {"id":5,"titulo":"Spanish government approves Aena's DORA III with €13bn investment","editor":"Travel Extra","tipo":"Prensa","fecha":"2026-09","url":"https://www.travelextra.ie/spanish-government-approves-aenas-dora-iii-with-e13bn-investment/"},
 {"id":6,"titulo":"Informe de la CNMC sobre la propuesta de DORA 2027-2031","editor":"CNMC","tipo":"Primaria","fecha":"2026-06","url":"https://cnmc.es/en/node/420721"},
 {"id":7,"titulo":"Aena: la propuesta de la CNMC para DORA III, ligeramente por debajo de nuestras previsiones pero mejora visibilidad","editor":"Renta 4","tipo":"Analistas","fecha":"2026-06-03","url":"https://www.r4.com/articulos-y-analisis/valores/aena-la-propuesta-de-la-cnmc-para-dora-iii-ligeramente-por-debajo-de-nuestras-previsiones-pero-mejora-visibilidad"},
 {"id":8,"titulo":"Estadísticas de tráfico de julio de 2026","editor":AENA,"tipo":"Primaria","fecha":"2026-08-12","url":"https://www.aena.es/doc/detalleprensa/260812-eas-estadisticas-julio.pdf"},
 {"id":9,"titulo":"Guerra de tasas en Aena: las aerolíneas piden rebajas","editor":"Vozpópuli","tipo":"Prensa","fecha":"2026","url":"https://www.vozpopuli.com/economia/transporte/guerra-de-tasas-en-aena-las-aerolineas-piden-rebajas-por-el-beneficio-de-sus-pasajeros-en-las-tiendas.html"},
 {"id":10,"titulo":"Aena sube en torno al 2 % tras solicitar el aumento de las tarifas (6,5 % en 2026)","editor":"Estrategias de Inversión","tipo":"Prensa","fecha":"2025-07","url":"https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/aena-sube-cerca-de-un-2-tras-solicitar-el-aumento-n-829733"},
 {"id":11,"titulo":"Still too early to talk about Aena's investment plan without tariffs being defined in Dora III","editor":"The Corner","tipo":"Prensa","fecha":"2026","url":"https://thecorner.eu/companies/still-too-early-to-talk-about-aenas-investment-plan-without-tariffs-being-defined-in-dora-iii-framework/123674/"},
]
B = {
 "historia":{"resumen":"Aena nació como el gestor público de los aeropuertos españoles y salió a bolsa en febrero de 2015 con el 49 % del capital; ENAIRE (Ministerio de Transportes) conserva el 51 %. Es el primer operador aeroportuario del mundo por pasajeros: 46 aeropuertos y dos helipuertos en España, el 51 % de London Luton, Leeds Bradford y 17 aeropuertos en Brasil [A3]. La pandemia la llevó a pérdidas en 2020-2021; en 2023 superó el EBITDA de 2019 [A5]. En 2025 desdobló sus acciones 10 por 1 [A17]. Desde 2017 sus tarifas se fijan cada cinco años en el DORA; el tercero (2027-2031) se aprobó en septiembre de 2026 [B4].",
  "hitos":[{"anio":"2015","hito":"Salida a bolsa del 49 %; ENAIRE conserva el 51 %."},{"anio":"2017","hito":"Primer DORA (2017-2021): tarifas reguladas a cinco años."},{"anio":"2020","hito":"Pandemia: pérdidas en 2020 y 2021."},{"anio":"2022","hito":"Vuelta a beneficios (901,5 M) y al dividendo [A7]."},{"anio":"2023","hito":"Control de Luton y reversión del deterioro de Brasil; beneficio récord [A5]."},{"anio":"2025","hito":"Desdoblamiento 10 por 1 y dividendo récord de 9,76 EUR por acción antigua [A14, A17]."},{"anio":"2026","hito":"DORA III aprobado: tarifas +0,33 % al año en 2027-2031 y 12.888 M de inversión [B3, B4]."}],
  "confianza":"Media"},
 "negocio":{
  "descripcion":"Aena explota la red de aeropuertos de interés general de España (46 aeropuertos y dos helipuertos), que concentra la práctica totalidad del tráfico aéreo comercial del país, y fuera de España el 51 % de London Luton, Leeds Bradford y 17 aeropuertos en Brasil [A3]. Cobra a las aerolíneas y a los pasajeros tasas aeroportuarias reguladas (aterrizaje, pasajeros, seguridad) y explota los espacios comerciales del aeropuerto: tiendas libres de impuestos, restauración, aparcamientos, alquiler de coches, salas VIP y publicidad, además de suelo inmobiliario. En 2025 movió 384,8 millones de pasajeros e ingresó 6.379,2 M [A1].",
  "como_gana_dinero":"Algo más de la mitad de los ingresos son aeronáuticos (1.702,1 M de 3.299,6 M en el 1S26), regulados: el DORA fija el ingreso máximo por pasajero para cinco años con una rentabilidad regulada sobre la base de activos [A2, B2]. El resto, comercial (991 M en el 1S26, +11 % en 2025), no está regulado y crece con el tráfico y con el gasto por pasajero; es donde está el margen [A1, A2]. El negocio tiene costes en gran parte fijos: con un margen EBITDA del 59 %, cada punto de tráfico adicional cae casi entero al EBITDA. El ingreso regulado depende sobre todo del DORA: con tarifas casi congeladas en 2027-2031 (+0,33 % al año), el crecimiento vendrá del volumen y del negocio comercial [B3].",
  "clientes":"Los clientes de la parte regulada son las aerolíneas; Ryanair, Vueling (IAG) e Iberia concentran una parte relevante del tráfico español y negocian colectivamente a través de ALA, que pidió una rebaja de tarifas del 4,9 % para el DORA III [B3, B9]. El poder de precios está limitado por la regulación: Aena pidió +3,82 % al año y el Gobierno concedió +0,33 %, con la CNMC proponiendo −0,59 % [B1, B3]. En el negocio comercial sí hay poder de precios: los ingresos comerciales crecieron un 11 % en 2025 con el tráfico al +4,2 % [A1].",
  "confianza":"Media"},
 "sector":{
  "definicion":"El mercado relevante es el tráfico aéreo comercial de pasajeros de España, donde Aena gestiona la red de aeropuertos de interés general en régimen de monopolio regulado; Luton y Brasil son negocios pequeños dentro del grupo. El tamaño se mide en pasajeros (Aena prevé unos 326 millones en la red española en 2026, +1,3 %) [D10], no en euros de un mercado competitivo.",
  "tamano":"≈ 326 millones de pasajeros en la red española en 2026e (previsión de Aena) [D10]; 384,8 millones el grupo en 2025 [A1].",
  "unidad_serie":"millones de pasajeros (grupo)","serie":[{"anio":"2024","tamano":369.3},{"anio":"2025","tamano":384.8}],
  "tcac_historico_pct":None,"tcac_previsto_pct":1.3,"cr5_pct":None,"estructura":"Concentrada",
  "drivers":[
   {"driver":"Turismo internacional hacia España","efecto":"+","horizonte":"Estructural","evidencia":"Tráfico del grupo +4,2 % en 2025 y +4 % en enero-julio de 2026 [A1, B8]."},
   {"driver":"Tarifas del DORA III","efecto":"−","horizonte":"Estructural","evidencia":"+0,33 % al año en 2027-2031, frente al +3,82 % pedido [B3, B4]."},
   {"driver":"Capacidad y ocupación de las aerolíneas","efecto":"+/−","horizonte":"Cíclico","evidencia":"La dirección avisó de un factor de ocupación más débil en 2026 [A2]."},
   {"driver":"Gasto comercial por pasajero","efecto":"+","horizonte":"Estructural","evidencia":"Ingresos comerciales +11 % en 2025 [A1]."},
   {"driver":"Coste del combustible y geopolítica","efecto":"−","horizonte":"Cíclico","evidencia":"Fin de las coberturas de las aerolíneas y Oriente Medio [A2]."}],
  "porter":[
   {"fuerza":"Rivalidad","intensidad":1,"justificacion":"Monopolio de la red española; solo compiten aeropuertos de otros países por los vuelos de conexión."},
   {"fuerza":"Poder de los clientes","intensidad":4,"justificacion":"Las aerolíneas presionan en el DORA (ALA pidió −4,9 %) y el Gobierno y la CNMC deciden la tarifa [B3, B9]."},
   {"fuerza":"Poder de los proveedores","intensidad":2,"justificacion":"Constructoras y servicios con muchos oferentes; el personal es en parte público."},
   {"fuerza":"Amenaza de entrada","intensidad":1,"justificacion":"Sin aeropuertos alternativos de escala en España."},
   {"fuerza":"Amenaza de sustitutos","intensidad":2,"justificacion":"Alta velocidad ferroviaria en rutas nacionales; el tráfico internacional no tiene sustituto."}],
  "ciclo":{"posicion":"Madurez del ciclo","comentario":"El tráfico supera con holgura el de 2019 y crece al 3-4 %, por debajo del 16 % de 2023 [A5, A3]. En 2020 el tráfico cayó a una fracción y Aena perdió dinero dos años; en 2022 la subida de costes no se trasladó a tarifas. La guía de 2026 (+1,3 % en España) y la debilidad de la ocupación indican fin de la fase de recuperación [D10, A2]."},
  "regulacion":"Las tarifas aeronáuticas de la red española se fijan en el Documento de Regulación Aeroportuaria (DORA) de cinco años. El DORA III (2027-2031), aprobado en Consejo de Ministros en septiembre de 2026, permite subir el ingreso regulado un 0,33 % al año, frente al +3,82 % que pidió Aena y el −0,59 % que proponía la CNMC; prevé 12.888 M de inversión, de ellos 9.991 M regulados [B3, B4, B5]. La CNMC proponía además un coste de capital del 7,4 %, frente al 9 % que defendía Aena [B1, B11].",
  "tendencias":"Más tráfico de bajo coste y de largo radio, más gasto comercial por pasajero y ampliaciones de capacidad (Madrid-Barajas y Barcelona-El Prat concentran buena parte de la inversión del DORA III) [B2]. La descarbonización de la aviación (combustibles sostenibles) puede encarecer los billetes. Aena gana con el volumen y el gasto comercial, pero las tarifas casi congeladas le trasladan el riesgo de costes.",
  "confianza":"Media"},
 "competencia":{
  "cuota_pct":None,"posicion":"1.º operador aeroportuario del mundo por pasajeros; monopolio de la red de aeropuertos de interés general de España.",
  "competidores":[],
  "foso":{"veredicto":"Amplio","tendencia":"Estable","fuentes":[
   {"fuente":"Efectos de red","puntuacion":2,"evidencia":"Las aerolíneas concentran bases y conexiones en Madrid, Barcelona y Palma."},
   {"fuente":"Costes de cambio","puntuacion":3,"evidencia":"Una aerolínea que vuela a España no tiene alternativa a la red de Aena."},
   {"fuente":"Intangibles (marca, patentes, licencias)","puntuacion":5,"evidencia":"Gestión en exclusiva de la red española por ley; concesiones en Brasil y Luton."},
   {"fuente":"Ventaja en costes","puntuacion":3,"evidencia":"Red de 46 aeropuertos con gestión centralizada; margen EBITDA del 59 % [A1]."},
   {"fuente":"Escala eficiente","puntuacion":5,"evidencia":"Infraestructura que no admite un segundo operador."}]},
  "amenazas":"El foso no lo amenaza un competidor sino el regulador: el ingreso aeronáutico depende de lo que el Gobierno conceda cada cinco años, y el DORA III ha dado mucho menos de lo pedido (+0,33 % frente a +3,82 %) [B3]. Un cambio de la tasa de rentabilidad regulada, del tratamiento de los ingresos comerciales (las aerolíneas piden que compensen tarifas) o de la participación del Estado es el riesgo principal [B9].",
  "confianza":"Media"},
 "esg":{"calificaciones":[],"materialidad":"Lo material es la descarbonización de la aviación (combustibles sostenibles, impuestos al queroseno) por su efecto en el tráfico, y el ruido y la ocupación de suelo de las ampliaciones de Barajas y El Prat, que exigen tramitación ambiental [B2].","controversias":"Conflicto con las aerolíneas por las tarifas del DORA III y la subida de 2026 [B3, B9]. No se encontraron sanciones relevantes en los últimos tres años.","confianza":"Baja"},
 "fuentes":B_f,
 "huecos":[
  {"seccion":"competencia","campo":"competidores con margen EBIT","tipo":"Núcleo","intentos":"1) Búsqueda de márgenes de ADP, Fraport y Flughafen Zürich; 2) búsqueda de comparables en MarketScreener; 3) solo aparecen PER sueltos","decision":"Omitido"},
  {"seccion":"esg","campo":"calificaciones","tipo":"Complemento","intentos":"1) Informe de sostenibilidad; 2) MSCI; 3) prensa","decision":"Omitido"},
 ]
}
w('B', B)

# ---------------------------------------------------------------- C. Gobierno
C_f = [
 {"id":1,"titulo":"Aena reparte 1.635 millones en dividendos (ENAIRE controla el 51 %)","editor":"Merca2","tipo":"Prensa","fecha":"2026-04-27","url":"https://www.merca2.es/2026/04/27/aena-dividendo-1635-millones-2025-2373293/"},
 {"id":2,"titulo":"Junta General de Accionistas 2026","editor":AENA,"tipo":"Primaria","fecha":"2026-04-16","url":"https://www.aena.es/doc/detalleprensa/260416-aena-junta-general-accionistas-2026.pdf"},
 {"id":3,"titulo":"Aena: seguimiento de la acción (hilo con el hecho relevante de la fusión de GAP)","editor":"Rankia","tipo":"Foros y redes","fecha":"2026","url":"https://www.rankia.com/foros/bolsa/temas/1987511-aena-seguimiento-accion"},
]
C = {
 "directivos":{"equipo":[{"nombre":"Maurici Lucena","cargo":"Presidente y consejero delegado","desde":"2018","participacion_pct":None,"trayectoria":"Nombrado por el Gobierno en 2018; ha llevado a Aena de las pérdidas de la pandemia a beneficios récord (2.136,7 M en 2025) y a la aprobación del DORA III [A1, B4]."}],
  "historial_guidance":[{"anio":"2025","guia":"Crecimiento de tráfico en España (previsión de comienzo de año)","real":"Tráfico del grupo +4,2 %","cumplida":"Sí"},{"anio":"2026","guia":"Tráfico en España +1,3 % (febrero), ≈+3 % (julio)","real":"+3,9 % en el 1S26 (grupo)","cumplida":"Parcial"}],
  "comentario":"La dirección la nombra el Gobierno a través de ENAIRE: la continuidad depende del ciclo político. El mismo presidente desde 2018 da estabilidad. Las guías de tráfico han sido prudentes (+1,3 % en 2026 frente a +3,9 % real en el semestre) [D10, A3].",
  "confianza":"Baja"},
 "gobierno":{"consejo":[],"presidente_ceo_separados":False,"presidente_ejecutivo":True,"consejero_coordinador":None,"una_accion_un_voto":True,
  "operaciones_vinculadas_relevantes":True,"variable_ligado_rentabilidad":None,"auditoria_independiente":None,"insiders_sin_operaciones":None,
  "accionista_control":True,"presidente_vinculado_control":True,"cambios_cupula_24m":0,"voto_remuneracion_pct":None,"voto_remuneracion_contra_pct":None,"voto_remuneracion_contra_libre_pct":None,"voto_cupula_pct":None,
  "remuneracion_ceo":None,"remuneracion":None,
  "accionistas":[{"nombre":"ENAIRE (Ministerio de Transportes)","pct":51.0,"tipo":"Control público","variacion":"Sin cambios"}],
  "insiders":[],
  "control_y_defensas":"ENAIRE, entidad pública del Ministerio de Transportes, tiene el 51 % y nombra al presidente-consejero delegado [C1]. El Estado es a la vez accionista de control y quien aprueba las tarifas en el DORA: el conflicto de interés es estructural, y el DORA III se ha decidido en el Consejo de Ministros. Por ser empresa pública (S.M.E.), operaciones como las ampliaciones de capacidad o las compras internacionales también pasan por el Gobierno.",
  "alertas":["Accionista de control público que además fija las tarifas (DORA III).","Presidente ejecutivo nombrado por el Gobierno: posible cambio con un cambio de ciclo político."],
  "confianza":"Baja"},
 "fuentes":C_f,
 "huecos":[{"seccion":"gobierno","campo":"consejo, remuneración, votos de la junta, operaciones de directivos","tipo":"Núcleo","intentos":"1) IAGC e IARC 2025 en la CNMV; 2) nota de la junta de 2026; 3) prensa: no se pueden abrir documentos en este entorno","decision":"Omitido"}]
}
w('C', C)

# ---------------------------------------------------------------- D. Mercado y valoración
D_f = [
 {"id":1,"titulo":"Cotización de Aena (17:35 del 9-oct-2026: 24,88 EUR)","editor":"Bolsamanía","tipo":"Datos de mercado","fecha":"2026-10-09","url":"https://www.bolsamania.com/accion/AENA"},
 {"id":2,"titulo":"Aena S.M.E.: cotización (24,88 EUR)","editor":"MarketScreener","tipo":"Datos de mercado","fecha":"2026-10-09","url":"https://www.marketscreener.com/quote/stock/AENA-S-M-E-S-A-20798509/"},
 {"id":3,"titulo":"Aena (AENA): ficha de la acción, rango de 52 semanas 21,96-28,86 EUR","editor":"Rankia","tipo":"Datos de mercado","fecha":"2026-09-27","url":"https://www.rankia.com/acciones/aena-aena"},
 {"id":4,"titulo":"Earnings update / analyst estimates for Aena (19 analistas, objetivo 26,82 EUR, 20-31,50)","editor":"Simply Wall St","tipo":"Analistas","fecha":"2026-07","url":"https://simplywall.st/stocks/es/transportation/bme-aena/aena-sme-shares/news/earnings-update-aena-sme-sa-bmeaena-just-reported-its-interi"},
 {"id":5,"titulo":"Jefferies reitera su recomendación de compra sobre Aena (objetivo 29,50 EUR)","editor":"Bolsamanía","tipo":"Analistas","fecha":"2026-08-03","url":"https://www.bolsamania.com/noticias/empresas/economia--jefferies-reitera-su-recomendacion-de-compra-sobre-aena-tras-mantener-intactas-sus-perspectivas-financieras--23176892.html"},
 {"id":6,"titulo":"Aena: potencial de más del 60 % ... y dividendo en abril (recomendaciones: 2 compra fuerte, 6 compra, 12 mantener, 4 venta; objetivo medio ≈26,6 EUR)","editor":"Estrategias de Inversión","tipo":"Prensa","fecha":"2026-04","url":"https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/aena-potencial-de-mas-del-60-para-volar-hasta-n-901743"},
 {"id":7,"titulo":"Aéroports de Paris: PER estimado 2026 18,17x y 2027 14,54x","editor":"Börse Stuttgart","tipo":"Datos de mercado","fecha":"2026-07-21","url":"https://www.boerse-stuttgart.de/en/products/equities/stuttgart/a0j2wm-a-roports-de-paris-s-a/"},
 {"id":8,"titulo":"Fraport: PER (14,97x)","editor":"Börse Stuttgart","tipo":"Datos de mercado","fecha":"2026-07","url":"https://www.boerse-stuttgart.de/en/products/equities/stuttgart/577330-fraport"},
 {"id":9,"titulo":"Grupo Aeroportuario del Sureste: PER 2026e 14,2x","editor":"MarketScreener","tipo":"Datos de mercado","fecha":"2026-08","url":"https://au.marketscreener.com/quote/stock/GRUPO-AEROPORTUARIO-DEL-S-6492978/"},
 {"id":10,"titulo":"Aena: previsión de tráfico 2026 en España (+1,3 %, ≈326 millones) y opinión de los analistas","editor":"Estrategias de Inversión","tipo":"Prensa","fecha":"2026-04","url":"https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/una-accion-del-ibex-35-muy-fuerte-y-con-dividendo-n-907487"},
 {"id":11,"titulo":"Moody's mejora la calificación de Aena a A2","editor":"Estrategias de Inversión","tipo":"Prensa","fecha":"2025","url":"https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/moodys-mejora-calificacion-de-aena-a-a2-con-perspectiva-n-849953"},
 {"id":12,"titulo":"Aena S.M.E.: precio de diciembre de 2025 (23,60-23,82 EUR) y rango de 52 semanas","editor":"Simply Wall St","tipo":"Datos de mercado","fecha":"2025-12","url":"https://www.simplywall.st/stocks/es/transportation/bme-aena/aena-sme-shares"},
 {"id":13,"titulo":"Aena S.M.E. (ANYYY): histórico mensual de precios ajustados","editor":"Digrin","tipo":"Datos de mercado","fecha":"2026","url":"https://www.digrin.com/stocks/detail/ANYYY/price"},
 {"id":14,"titulo":"Rendimiento del Bund a 10 años (12-oct-2026), serie BBSIS (vía informes del repositorio del 14-oct)","editor":"Deutsche Bundesbank","tipo":"Primaria","fecha":"2026-10-12","url":"https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en"},
 {"id":15,"titulo":"Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026","editor":"Aswath Damodaran, NYU Stern","tipo":"Datos de mercado","fecha":"2026-10","url":"https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx"},
 {"id":16,"titulo":"Corporación América Airports: PER adelantado 12,9x","editor":"Webull / Simply Wall St","tipo":"Datos de mercado","fecha":"2026-08","url":"https://www.webull.com/news/15245222998385664"},
 {"id":17,"titulo":"Flughafen Zürich: PER (20,8x)","editor":"Wisesheets","tipo":"Datos de mercado","fecha":"2026","url":"https://www.wisesheets.io/pe-ratio/FPRUF"},
 {"id":18,"titulo":"Aena se desploma un 4 % y lidera caídas del Ibex 35 pese a ganar 1.579 millones hasta septiembre","editor":"Valencia Plaza","tipo":"Prensa","fecha":"2025-10-29","url":"https://valenciaplaza.com/valenciaplaza/bolsas/aena-se-desploma-un-4-y-lidera-caidas-del-ibex-35-pese-a-ganar-1579-millones-hasta-septiembre-un-9-mas"},
]
D = {
 "identificacion":{"nombre":"Aena S.M.E., S.A.","nombre_corto":"Aena","ticker":"AENA","isin":"ES0105046017","mercado":"Bolsa de Madrid (Mercado Continuo)","indice_referencia":"IBEX 35",
  "pais":"España","pais_iso":"ES","sector":"Industria","industria":"Infraestructuras de transporte (aeropuertos)","sede":"Madrid","fundacion":"1991","empleados":None,"web":"www.aena.es",
  "precio":24.88,"fecha_precio":"2026-10-09","acciones":1500.0,"capitalizacion_publicada":38820,"free_float_pct":49.0,
  "max_52s":28.86,"min_52s":21.96,"volumen_medio_diario":None,"proximos_resultados":"2026-10-28"},
 "consenso":{
  "guidance":"Tráfico en la red española de +1,3 % en 2026 (≈326 millones de pasajeros), publicado en febrero; en julio la dirección habló de un crecimiento cercano al 3 % y avisó de la debilidad del factor de ocupación [D10, A2]. Política de dividendo del 80 % del beneficio [A12]. El DORA III fija el marco de 2027-2031: tarifas +0,33 % al año e inversión de 12.888 M [B4]. No hay guía numérica de EBITDA.",
  "estimaciones":[{"periodo":"2026e","ingresos":6870,"ebitda":None,"ebit":None,"bpa":1.56,"dpa":None,"fuente":"Simply Wall St (19 analistas) [D4]"}],
  "recomendaciones":{"n_analistas":24,"comprar":8,"mantener":12,"vender":4,"po_medio":26.82,"po_min":20.0,"po_max":31.5},
  "revisiones":"Las recomendaciones de abril (2 compra fuerte, 6 compra, 12 mantener y 4 venta) dan un consenso de mantener [D6]. Tras el DORA III, Bank of America mantiene compra con 30,7 EUR (esperaba tarifas planas) y Jefferies compra con 29,5 EUR [B4, D5]. Sabadell sigue en infraponderar por la incertidumbre de la inversión [B11]. Solo hay una fuente con BPA de 2026e (1,56 EUR) y ninguna fiable para 2027-2028.",
  "base_ebitda":"NIIF","ajuste_ebitda_pct_ventas":None,"confianza":"Baja"},
 "bolsa":{"tipo_rentabilidad":"de precio (sin dividendos)","rentabilidades":[],"anual":[{"anio":"2025","accion_pct":20.7,"indice_pct":None}],"beta":None,"volatilidad_pct":None,"max_drawdown_pct":None,"posicion_corta_pct":None,
  "comentario":"La acción subió un 20,7 % en 2025 [A12] y alcanzó máximos de ≈28,9 EUR en febrero de 2026; desde entonces ha corregido hasta 24,88 EUR (9-oct), un 14 % por debajo del máximo, por la incertidumbre del DORA III y el estrechamiento del margen del 1S26 [D1, D3, D5]. La aprobación del DORA III con +0,33 % al año, por encima de lo que esperaban algunos analistas, no ha levantado la cotización.",
  "confianza":"Baja"},
 "multiplos_historicos":{"serie":[
   {"anio":"2022","precio_cierre":11.73,"ev_ebitda_ntm":None,"per_ntm":None,"excluir":True},
   {"anio":"2023","precio_cierre":16.41,"ev_ebitda_ntm":None,"per_ntm":None,"excluir":False},
   {"anio":"2024","precio_cierre":19.74,"ev_ebitda_ntm":None,"per_ntm":None,"excluir":False},
   {"anio":"2025","precio_cierre":23.82,"ev_ebitda_ntm":None,"per_ntm":None,"excluir":False}],
  "comentario":"Precios de cierre por acción nueva (tras el desdoblamiento 10 por 1). 2025: 23,82 EUR, el de diciembre de Simply Wall St, que cuadra con un cierre de 2024 de 19,74 EUR y la revalorización del 20,7 % que publicó Aena [D12, A12]. 2022 y 2023 son estimación propia a partir de la serie ajustada del ADR (Digrin) llevada a euros y sin dividendos [D13]: confianza baja. 2022 se excluye por el beneficio de recuperación tras la pandemia (PER ≈19,5x sobre un BPA de 0,60).",
  "confianza":"Baja"},
 "comparables":{"criterio":"Operadores aeroportuarios cotizados: Aéroports de Paris, Fraport y Flughafen Zürich (europeos regulados), ASUR y Corporación América (concesiones en América), y Vinci como referencia (concesiones con Vinci Airports). Faltan Ferrovial (Heathrow, no consolidado) y los grupos asiáticos, por no encontrar cifras.",
  "empresas":[
   {"nombre":"Aéroports de Paris","ticker":"ADP","pais":"FR","capitalizacion":None,"ev_ventas":None,"ev_ebitda_ltm":None,"ev_ebitda_ntm":None,"per_ntm":18.2,"crecimiento_pct":None,"margen_ebitda_pct":None,"roic_pct":None,"dn_ebitda":None,"fcf_yield_pct":None},
   {"nombre":"Fraport","ticker":"FRA","pais":"DE","capitalizacion":None,"ev_ventas":None,"ev_ebitda_ltm":None,"ev_ebitda_ntm":None,"per_ntm":15.0,"crecimiento_pct":None,"margen_ebitda_pct":None,"roic_pct":None,"dn_ebitda":None,"fcf_yield_pct":None},
   {"nombre":"Flughafen Zürich","ticker":"FHZN","pais":"CH","capitalizacion":None,"ev_ventas":None,"ev_ebitda_ltm":None,"ev_ebitda_ntm":None,"per_ntm":20.8,"crecimiento_pct":None,"margen_ebitda_pct":None,"roic_pct":None,"dn_ebitda":None,"fcf_yield_pct":None},
   {"nombre":"ASUR","ticker":"ASURB","pais":"MX","capitalizacion":None,"ev_ventas":None,"ev_ebitda_ltm":None,"ev_ebitda_ntm":None,"per_ntm":14.2,"crecimiento_pct":None,"margen_ebitda_pct":None,"roic_pct":None,"dn_ebitda":None,"fcf_yield_pct":None},
   {"nombre":"Corporación América Airports","ticker":"CAAP","pais":"LU","capitalizacion":None,"ev_ventas":None,"ev_ebitda_ltm":None,"ev_ebitda_ntm":None,"per_ntm":12.9,"crecimiento_pct":None,"margen_ebitda_pct":None,"roic_pct":None,"dn_ebitda":None,"fcf_yield_pct":None}],
  "comentario":None,"confianza":"Baja"},
 "transacciones":None,
 "fuentes":D_f,
 "huecos":[
  {"seccion":"bolsa","campo":"rentabilidades, beta, volatilidad, caída máxima","tipo":"Complemento","intentos":"1) bolsa.mjs (sin red en este entorno); 2) búsqueda de Yahoo e Investing; 3) solo la revalorización de 2025","decision":"Omitido"},
  {"seccion":"comparables","campo":"capitalización, EV/EBITDA, márgenes y crecimiento de cada comparable","tipo":"Núcleo","intentos":"1) MarketScreener por empresa; 2) Börse Stuttgart y Wisesheets; 3) solo PER sueltos de fechas y criterios distintos","decision":"Omitido"},
  {"seccion":"transacciones","campo":"operaciones precedentes","tipo":"Complemento","intentos":"1) Búsqueda de compras de aeropuertos 2019-2026; 2) prensa; 3) sin múltiplos publicados en los extractos","decision":"Omitido"},
  {"seccion":"consenso","campo":"estimaciones 2027e-2028e","tipo":"Núcleo","intentos":"1) MarketScreener; 2) Simply Wall St y TipRanks; 3) cifras contradictorias entre fuentes","decision":"Omitido"},
 ]
}
w('D', D)

# ---------------------------------------------------------------- E. Sentimiento
E_f = [
 {"id":1,"titulo":"AENA (AENA): seguimiento de la acción (626 respuestas)","editor":"Rankia","tipo":"Foros y redes","fecha":"2026-09","url":"https://www.rankia.com/foros/bolsa/temas/1987511-aena-seguimiento-accion"},
 {"id":2,"titulo":"Jefferies mantiene la compra sobre Aena: «la consideramos la mejor posicionada a corto plazo» (y comentarios de lectores)","editor":"Bolsamanía","tipo":"Foros y redes","fecha":"2026-08","url":"https://www.bolsamania.com/noticias/analisis-fundamental/jefferies-mantiene-compra-aena-consideramos-mejor-posicionada-corto-plazo--23174664.html"},
 {"id":3,"titulo":"Still too early to talk about Aena's investment plan without tariffs being defined in Dora III","editor":"The Corner","tipo":"Foros y redes","fecha":"2026","url":"https://thecorner.eu/companies/still-too-early-to-talk-about-aenas-investment-plan-without-tariffs-being-defined-in-dora-iii-framework/123674/"},
 {"id":4,"titulo":"Pista despejada para Aena: 13.000 millones de inversión (debate tras el DORA III)","editor":"Estrategias de Inversión","tipo":"Foros y redes","fecha":"2026-09","url":"https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/pista-despejada-para-aena-13000-millones-de-inversion-n-949951"},
 {"id":5,"titulo":"Guerra de tasas en Aena: las aerolíneas piden rebajas por el beneficio de sus pasajeros en las tiendas","editor":"Vozpópuli","tipo":"Foros y redes","fecha":"2026","url":"https://www.vozpopuli.com/economia/transporte/guerra-de-tasas-en-aena-las-aerolineas-piden-rebajas-por-el-beneficio-de-sus-pasajeros-en-las-tiendas.html"},
]
E = {"sentimiento":{"tono":"Dividido","tendencia":"Estable",
  "revisadas":[
   {"plataforma":"Rankia, hilo «AENA: seguimiento de la acción»","fecha":"2026-09","n_comentarios":20,"tono":"Dividido","resumen":"Hilo largo (626 respuestas) con debate sobre el DORA III, el dividendo y la caída desde los máximos de febrero; la parte indexada recoge sobre todo hechos relevantes (fusión de GAP) [E1]."},
   {"plataforma":"Bolsamanía (análisis de Jefferies y comentarios)","fecha":"2026-08","n_comentarios":10,"tono":"Positivo","resumen":"La caída tras el 2T se lee como posicionamiento y no como fundamentales; el DORA III, como catalizador [E2]."},
   {"plataforma":"Estrategias de Inversión (tras la aprobación del DORA III)","fecha":"2026-09","n_comentarios":10,"tono":"Dividido","resumen":"Alivio porque el Gobierno descarta bajar tarifas, pero dudas sobre cómo se financian 13.000 M con tarifas casi planas [E4]."},
   {"plataforma":"The Corner y Vozpópuli (debate tarifario)","fecha":"2026-09","n_comentarios":10,"tono":"Negativo","resumen":"Las aerolíneas y parte de los lectores ven a Aena como un monopolio que debe compensar tarifas con ingresos comerciales [E3, E5]."}],
  "temas":[
   {"tema":"DORA III: tarifas +0,33 % frente a 13.000 M de inversión","postura":"Dividida","peso":"Alto","contraste":"Los datos dan la razón a la duda: la inversión regulada (9.991 M) casi duplica el ritmo actual y el ingreso regulado apenas sube; la rentabilidad del capital nuevo es la regulada, no la histórica [B3, B4]."},
   {"tema":"Dividendo del 80 % y rentabilidad ≈4,4 %","postura":"Alcista","peso":"Medio","contraste":"Cierto hoy (1,09 EUR) [A12], pero con la caja libre camino de ser negativa desde 2027 el dividendo dependerá de la deuda [D11]."},
   {"tema":"Estado como accionista y regulador","postura":"Bajista","peso":"Medio","contraste":"Es un riesgo real: ENAIRE tiene el 51 % y el Consejo de Ministros fija las tarifas [C1]."},
   {"tema":"Turismo récord y tráfico","postura":"Alcista","peso":"Medio","contraste":"Tráfico +3,9 % en el 1S26, pero la dirección avisa de menor ocupación [A2, A3]."}],
  "lectura":"El sentimiento está dividido y no es extremo: los particulares valoran el dividendo y el turismo, y temen que el Estado use a Aena para financiar inversión sin subir tarifas. Coincide con el consenso de analistas (mayoría de mantener) y con nuestra lectura: el riesgo no es el tráfico sino la rentabilidad de la inversión del DORA III. No aporta ningún riesgo que el análisis no recoja.",
  "confianza":"Baja"},
 "fuentes":E_f,"huecos":[{"seccion":"sentimiento","campo":"Reddit, Stocktwits y Seeking Alpha","tipo":"Complemento","intentos":"1) Búsqueda en inglés de Reddit y Seeking Alpha; 2) búsqueda de foros españoles; 3) solo Rankia y comentarios de prensa indexados","decision":"Omitido"}]}
w('E', E)
print('ok')

# Las notas citan con números propios: [A3] dentro de A pasa a [3]; una cita a otra nota ([B4] dentro de A) copia
# esa fuente a la lista propia (integrar quita los duplicados) y se renumera.
import re
notas = {l: json.load(open(os.path.join(DIR, l + '.json'), encoding='utf-8')) for l in 'ABCDE'}
orig = {l: {f['id']: f for f in notas[l]['fuentes']} for l in 'ABCDE'}
for l, nota in notas.items():
    fl = nota['fuentes']
    def mapa(tok):
        tok = tok.strip()
        m = re.fullmatch(r'([A-E])(\d+)', tok)
        if not m: return tok
        X, n = m.group(1), int(m.group(2))
        if X == l: return str(n)
        src = orig[X][n]
        for f in fl:
            if f['url'] == src['url'] and f['titulo'] == src['titulo']: return str(f['id'])
        nid = max(f['id'] for f in fl) + 1
        fl.append({**src, 'id': nid}); return str(nid)
    def sub(m):
        return '[' + ', '.join(mapa(t) for t in m.group(1).split(',')) + ']'
    def rec(o):
        if isinstance(o, str): return re.sub(r'\[((?:\s*[A-E]\d+\s*,?)+)\]', sub, o)
        if isinstance(o, list): return [rec(x) for x in o]
        if isinstance(o, dict): return {k: (rec(v) if k != 'fuentes' else v) for k, v in o.items()}
        return o
    nota2 = rec(nota); nota2['fuentes'] = fl
    w(l, nota2)
print('citas renumeradas')

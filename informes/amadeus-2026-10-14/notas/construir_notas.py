# Construye las notas A-E de Amadeus (corte 2026-10-14) a partir de lo leído en los resultados de búsqueda.
# Entorno nube: solo WebSearch. Cada cifra lleva la URL de la página que la publica; lo derivado se marca.
import json, os
D = os.path.dirname(os.path.abspath(__file__))

def w(nombre, obj):
    with open(os.path.join(D, nombre), 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)

def F(i, titulo, editor, tipo, fecha, url):
    return {"id": i, "titulo": titulo, "editor": editor, "tipo": tipo, "fecha": fecha, "url": url}

# ---------------- A. Cuentas ----------------
fA = [
 F(1, "Amadeus H1 2026: Amadeus delivers resilient performance (nota de prensa)", "Amadeus", "Primaria", "2026-07-31", "https://amadeus.com/en/newsroom/press-releases/amadeus-h1-2026-resilient-performance"),
 F(2, "Amadeus FY 2025 results: revenue growth (nota de prensa)", "Amadeus", "Primaria", "2026-02-27", "https://amadeus.com/en/newsroom/press-releases/amadeus-fy-2025-results-revenue-growth"),
 F(3, "Global Report 2025: capítulo Inversores (BPA ajustado y dividendo por acción)", "Amadeus", "Primaria", "2026-02", "https://amadeus.com/documents/en/global-report-2025/chapters/investors.pdf"),
 F(4, "Global Report 2025: perfil y desempeño corporativo (EBITDA 2025)", "Amadeus", "Primaria", "2026-02", "https://amadeus.com/documents/en/global-report-2025/chapters/amadeus-profile-and-corporate-performance.pdf"),
 F(5, "FY 2024 results press release", "Amadeus", "Primaria", "2025-02-28", "https://corporate.amadeus.com/documents/en/investors/2024/financial-results/q4-2024/fy-2024-results-press-release.pdf"),
 F(6, "FY 2023 Management Review", "Amadeus", "Primaria", "2024-02-29", "https://corporate.amadeus.com/documents/en/investors/2023/quarterly-results/q4-2023/fy-2023-management-review.pdf"),
 F(7, "Amadeus returns to positive annual profit and its target leverage levels in 2022, resuming dividend", "Amadeus", "Primaria", "2023-02-28", "https://amadeus.com/en/newsroom/press-releases/amadeus-returns-to-positive-annual-profit-and-its-target-leverage-levels-in-2022-resuming-dividend"),
 F(8, "Amadeus 1T 2026: resultados de sólido crecimiento (nota de prensa)", "Amadeus", "Primaria", "2026-05-08", "https://amadeus.com/es/sala-de-prensa/notas-de-prensa/amadeus-1t-2026-resultados-solido-crecimiento"),
 F(9, "Infografía de resultados del 1S 2026 (segmentos y volúmenes)", "Amadeus", "Primaria", "2026-07-31", "https://amadeus.com/content/dam/amadeuswebevo/press-releases/2026/07/infographic-fr-h1-2026.pdf"),
 F(10, "Amadeus IT Group S.A. (BME:AMS): ficha financiera (beneficio neto y EBITDA 2021-2023)", "Kalkine Media", "Datos de mercado", "2026", "https://kalkinemedia.com/au/companies/bme-ams"),
 F(11, "Amadeus IT Group Full Year 2024 Earnings: EPS Beats Expectations (BPA 2023-2024 y BPA de los últimos 12 meses)", "Simply Wall St", "Datos de mercado", "2026-02", "https://simplywall.st/stocks/es/consumer-services/bme-ams/amadeus-it-group-shares/news/amadeus-it-group-full-year-2024-earnings-eps-beats-expectati/amp"),
 F(12, "AMADEUS IT GROUP SA (AI3A.DE) Stock Cash Flow (flujo operativo y capex 2022-2025)", "Chartmill", "Datos de mercado", "2026", "https://www.chartmill.com/stock/quote/AI3A.DE/financials/cash-flow"),
 F(13, "Amadeus IT Group: balance sheet (activo total, fondo de comercio y caja 2023-2024)", "Tracenable", "Datos de mercado", "2026", "https://tracenable.com/company/amadeus-it-group/balance-sheet"),
 F(14, "AMADY balance sheet (activo total y patrimonio 2020-2024)", "TipRanks", "Datos de mercado", "2026", "https://www.tipranks.com/stocks/amady/financials/balance-sheet"),
 F(15, "Amadeus IT Group SA: balance sheet (activo total a dic-2025)", "Alpha Spread", "Datos de mercado", "2026", "https://new.alphaspread.com/security/mad/ams/financials/balance-sheet"),
 F(16, "Amadeus IT Group (BME:AMS) balance sheet (caja e inversiones a corto 2025)", "Stock Analysis", "Datos de mercado", "2026", "https://stockanalysis.com/quote/bme/AMS/financials/balance-sheet/"),
 F(17, "Potencial de más del 20 % para una acción del Ibex 35 que empieza a ver la luz al final del túnel (EBITDA del 2T26)", "Estrategias de Inversión", "Prensa", "2026-08-03", "https://www.estrategiasdeinversion.com/analisis/los-brokers-recomiendan/recomendaciones-espana/potencial-de-mas-del-20-para-una-accion-del-ibex-n-940325"),
 F(18, "Amadeus da luz verde al dividendo de 664,6 millones y la reelección de Maroto", "Estrategias de Inversión", "Prensa", "2026-06-03", "https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/amadeus-da-luz-verde-al-dividendo-de-6646-millones-n-923055"),
 F(19, "Resultados Amadeus primer semestre: 700,2 millones, un 3,7 % menos por el impacto de Oriente Próximo", "Merca2", "Prensa", "2026-07-31", "https://www.merca2.es/2026/07/31/resultados-amadeus-primer-semestre-2428155/"),
 F(20, "Amadeus logra beneficio récord de 1.335,6 millones en 2025 y propone un dividendo de 664,6 millones", "Forbes España", "Prensa", "2026-02-27", "https://forbes.es/forbestravel/881261/amadeus-logra-beneficio-record-de-1-3479-millones-en-2025-y-propone-un-pago-de-diviendo-de-6646-millones/"),
 F(21, "Amadeus cierra con alza del 4,7 % en bolsa tras ganar 1.258 millones en 2024", "Forbes España", "Prensa", "2025-02-28", "https://forbes.es/turismo/636143/amadeus-cierra-con-alza-del-47-en-bolsa-tras-ganar-1-258-millones-en-2024-y-anunciar-dividendo-del-50-del-beneficio/"),
 F(22, "Amadeus (AMS) Q2 2026 earnings summary (capex del 1S26)", "Quartr", "Datos de mercado", "2026-07-31", "https://quartr.com/events/amadeus-it-group-s-a-ams-q2-2026_3gfMG9yt"),
 F(23, "Amadeus to acquire IDEMIA Public Security (nota de prensa)", "Amadeus", "Primaria", "2026-04-29", "https://amadeus.com/en/newsroom/press-releases/amadeus-to-acquire-idemia-public-security-ips"),
 F(24, "Amadeus IT Group: news and key events (recompra de hasta 500 M desde el 2-mar-2026)", "MarketScreener", "Datos de mercado", "2026-10", "https://www.marketscreener.com/quote/stock/AMADEUS-IT-GROUP-S-A-4027320/news-key-events/"),
 F(25, "Amadeus IT Group, S.A. - Balance Sheet (Quarterly) (patrimonio a 31-mar-2026)", "Fintel", "Datos de mercado", "2026-05", "https://fintel.io/bs/es/ams"),
 F(26, "Amadeus prevé ingresar hasta 6.840 millones en 2025 con un EBITDA de hasta 2.580 millones", "Forbes España", "Prensa", "2025-02-28", "https://forbes.es/forbestravel/730201/amadeus-preve-ingresar-hasta-6-840-millones-en-2025-con-un-114-mas-y-un-ebitda-de-2-580-millones-11/"),
 F(27, "Amadeus IT Group SA: transcripción de la conferencia del 1S 2026 (resumen)", "GuruFocus", "Analistas", "2026-07-31", "https://www.gurufocus.com/stock/AMADF/transcripts/8995527"),
 F(28, "Amadeus adquiere SkyLink para acelerar el despliegue de la IA en los viajes", "Bolsamanía", "Prensa", "2026-02", "https://www.bolsamania.com/noticias_amp/empresas/amadeus-adquiere-skylink-acelerar-uso-ia-viajes--21831348.html"),
 F(29, "Amadeus: resultados 1T26 que superan ligeramente las previsiones", "Renta 4", "Analistas", "2026-05-08", "https://www.r4.com/articulos-y-analisis/valores/amadeus-resultados-1t26-que-superan-ligeramente-las-previsiones"),
 F(30, "Amadeus gana 364 millones en el primer trimestre de 2025 y eleva sus ingresos a 1.632 millones", "Forbes España", "Prensa", "2025-05-08", "https://forbes.es/forbestravel/704900/amadeus-gana-364-millones-de-euros-en-el-primer-trimestre-de-2025-y-eleva-sus-ingresos-a-1-632-millones-un-9-mas/"),
 F(31, "Capital social (participaciones significativas y reducción de capital)", "Amadeus", "Primaria", "2026-07", "https://amadeus.com/es/centro-inversores/capital-social"),
]

# Desglose de 2024 y 2025 por debajo del EBIT: estimación propia con un tipo del 21 % (el publicado no se pudo leer).
def bajo_ebit(ebit, neto, tipo=0.21):
    bai = round(neto / (1 - tipo), 1)
    return dict(bai=bai, impuestos=round(bai - neto, 1), resultado_financiero=round(bai - ebit, 1))

c24 = bajo_ebit(1634.9, 1258.6)
c25 = bajo_ebit(1758.4, 1335.6)
cuenta = [
 dict(periodo="2021", ingresos=2670.4, coste_ventas=None, gastos_generales=None, ebitda=575.9, amortizaciones=None, ebit=None, resultado_financiero=None, bai=None, impuestos=None, minoritarios=None, beneficio_neto=-136.7, gastos_financieros=None, participadas_en_ebitda=None, no_recurrentes_en_ebitda=None, bpa=None, dpa=0, dpa_extraordinario=0, acciones_diluidas=None),
 dict(periodo="2022", ingresos=4485.9, coste_ventas=None, gastos_generales=None, ebitda=1589.2, amortizaciones=None, ebit=None, resultado_financiero=None, bai=None, impuestos=None, minoritarios=None, beneficio_neto=664.4, gastos_financieros=None, participadas_en_ebitda=None, no_recurrentes_en_ebitda=None, bpa=None, dpa=0.74, dpa_extraordinario=0, acciones_diluidas=None),
 dict(periodo="2023", ingresos=5441.2, coste_ventas=None, gastos_generales=None, ebitda=2063.2, amortizaciones=680.0, ebit=1383.2, resultado_financiero=None, bai=None, impuestos=None, minoritarios=None, beneficio_neto=1117.6, gastos_financieros=None, participadas_en_ebitda=None, no_recurrentes_en_ebitda=None, bpa=2.50, dpa=None, dpa_extraordinario=0, acciones_diluidas=447.0),
 dict(periodo="2024", ingresos=6141.7, coste_ventas=None, gastos_generales=None, ebitda=2327.7, amortizaciones=692.8, ebit=1634.9, resultado_financiero=c24['resultado_financiero'], bai=c24['bai'], impuestos=c24['impuestos'], minoritarios=0, beneficio_neto=1258.6, gastos_financieros=None, participadas_en_ebitda=None, no_recurrentes_en_ebitda=7.4, bpa=2.87, dpa=1.39, dpa_extraordinario=0, acciones_diluidas=438.5),
 dict(periodo="2025", ingresos=6517.0, coste_ventas=None, gastos_generales=None, ebitda=2506.6, amortizaciones=748.2, ebit=1758.4, resultado_financiero=c25['resultado_financiero'], bai=c25['bai'], impuestos=c25['impuestos'], minoritarios=0, beneficio_neto=1335.6, gastos_financieros=None, participadas_en_ebitda=None, no_recurrentes_en_ebitda=None, bpa=3.10, dpa=1.54, dpa_extraordinario=0, acciones_diluidas=430.8),
]

balance_hist = [
 dict(periodo="2021", activo_total=11180, activo_corriente=None, pasivo_corriente=None, pasivo_total=11180-3750, fondo_comercio=None, intangibles=None, inmovilizado_material=None, existencias=None, clientes=None, proveedores=None, activos_contrato=None, pasivos_contrato=None, caja=None, deuda_financiera=None, arrendamientos=None, patrimonio_neto=3750, minoritarios=None, reservas=None),
 dict(periodo="2022", activo_total=11710, activo_corriente=None, pasivo_corriente=None, pasivo_total=11710-4580, fondo_comercio=None, intangibles=None, inmovilizado_material=None, existencias=None, clientes=None, proveedores=None, activos_contrato=None, pasivos_contrato=None, caja=None, deuda_financiera=None, arrendamientos=None, patrimonio_neto=4580, minoritarios=None, reservas=None),
 dict(periodo="2023", activo_total=10795.4, activo_corriente=None, pasivo_corriente=None, pasivo_total=round(10795.4-4480, 1), fondo_comercio=3710.8, intangibles=None, inmovilizado_material=None, existencias=None, clientes=None, proveedores=None, activos_contrato=None, pasivos_contrato=None, caja=1038.0, deuda_financiera=round(2140.6+1038.0, 1), arrendamientos=None, patrimonio_neto=4480, minoritarios=None, reservas=None),
 dict(periodo="2024", activo_total=11784.3, activo_corriente=None, pasivo_corriente=None, pasivo_total=round(11784.3-5060, 1), fondo_comercio=4090.6, intangibles=None, inmovilizado_material=None, existencias=None, clientes=None, proveedores=None, activos_contrato=None, pasivos_contrato=None, caja=1049.1, deuda_financiera=round(2111.3+1049.1, 1), arrendamientos=None, patrimonio_neto=5060, minoritarios=None, reservas=None),
 dict(periodo="2025", activo_total=11471, activo_corriente=None, pasivo_corriente=None, pasivo_total=11471-4800, fondo_comercio=None, intangibles=None, inmovilizado_material=None, existencias=None, clientes=None, proveedores=None, activos_contrato=None, pasivos_contrato=None, caja=1115.2, deuda_financiera=round(2141.4+1115.2, 1), arrendamientos=None, patrimonio_neto=4800, minoritarios=None, reservas=None),
]

flujos_hist = [
 dict(periodo="2021", flujo_operativo=None, capex=None, pagos_arrendamientos=None, adquisiciones=None, desinversiones=None, dividendos=0, recompras=0, emision_acciones=None, intereses_en_financiacion=0),
 dict(periodo="2022", flujo_operativo=1440, capex=566.7, pagos_arrendamientos=None, adquisiciones=None, desinversiones=None, dividendos=0, recompras=0, emision_acciones=None, intereses_en_financiacion=0),
 dict(periodo="2023", flujo_operativo=1790, capex=600.5, pagos_arrendamientos=None, adquisiciones=None, desinversiones=None, dividendos=None, recompras=0, emision_acciones=None, intereses_en_financiacion=0),
 dict(periodo="2024", flujo_operativo=2150, capex=788.1, pagos_arrendamientos=None, adquisiciones=None, desinversiones=None, dividendos=None, recompras=0, emision_acciones=None, intereses_en_financiacion=0),
 dict(periodo="2025", flujo_operativo=2200, capex=814.6, pagos_arrendamientos=None, adquisiciones=None, desinversiones=None, dividendos=None, recompras=1300, emision_acciones=None, intereses_en_financiacion=0),
]

A = {
 "_estado": "completo (búsqueda web; sin documentos abiertos)",
 "financieros": {
  "cuenta": cuenta,
  "ltm": {"periodo": "LTM dic-25", "fecha_fin": "2025-12-31", "ingresos": 6517.0, "ebitda": 2506.6, "ebit": 1758.4, "beneficio_neto": 1335.6, "bpa": 3.10, "dpa": 1.54, "dpa_extraordinario": 0, "fcf": 1302.2, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None},
  "cambios_perimetro": [],
  "comentario": "Los ingresos pasaron de 2.670 M en 2021 (aún con el tráfico aéreo hundido por la pandemia) a 4.486 M en 2022, 5.441 M en 2023, 6.142 M en 2024 y 6.517 M en 2025 [10, 7, 6, 5, 2]. Desde 2023 el crecimiento es casi todo orgánico: +12,9 % en 2024 y +6,1 % en 2025 (+8,5 % a tipo constante; el dólar restó 2,4 puntos) [5, 2]. El EBITDA subió de 576 M en 2021 a 2.507 M en 2025, con el margen del 35,4 % de 2022 al 37,9 % de 2024 y el 38,5 % de 2025 [7, 5, 4]: el apalancamiento operativo de una plataforma con costes de desarrollo fijos. En el 1S26 los ingresos solo crecieron un 2,3 % (5,1 % a tipo constante) porque las reservas de distribución aérea cayeron un 3,7 % desde marzo por la guerra en Oriente Medio; Air IT Solutions (+8,7 % a tipo constante) y Hospitality (+9,2 %) lo compensaron, y el EBIT ajustado creció un 4,9 % [1, 9]. 2021 y 2022 no son comparables (pandemia).",
  "ajustes": "Amadeus publica un beneficio y un BPA «ajustados» que excluyen, sobre todo, la amortización de los intangibles surgidos en compras (asignación del precio de compra), las diferencias de cambio no realizadas y los costes de adquisiciones: el beneficio ajustado de 2025 fue de 1.420,2 M frente a 1.335,6 M contables (≈85 M de diferencia) y el BPA ajustado diluido de 3,23 € [4, 3, 2]; en 2024, 1.347,9 M ajustados frente a 1.258,6 M [5, 21]; en 2023 el BPA ajustado fue de 2,51 € y en 2022 de 1,56 € [6]. El EBITDA de 2024 publicado (2.335,1 M) excluye 7,4 M de costes de adquisiciones, que aquí se devuelven como no recurrentes [5]. El resultado financiero y los impuestos de 2024 y 2025 son estimación propia (tipo efectivo del 21 %), porque el desglose no se pudo leer; el EBIT de 2023 se deduce del +18,2 % publicado para 2024 [5]. La diferencia entre el beneficio de 2024 de la nota original (1.258,6 M) y el comparativo de 2025 (1.252,7 M) es una reexpresión menor [20, 21].",
  "confianza": "Media"
 },
 "trimestres": {
  "items": [
   {"periodo": "1T25", "ingresos": 1632.0, "crecimiento_pct": 9.0, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": None},
   {"periodo": "2T25", "ingresos": 1628.0, "crecimiento_pct": None, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": None},
   {"periodo": "1T26", "ingresos": 1682.6, "crecimiento_pct": 3.1, "crecimiento_organico_pct": None, "ebitda": 661.4, "margen_ebitda_pct": 39.3, "bpa": None, "vs_consenso": "Superior"},
   {"periodo": "2T26", "ingresos": 1652.3, "crecimiento_pct": 1.5, "crecimiento_organico_pct": 2.2, "ebitda": 673.0, "margen_ebitda_pct": 40.7, "bpa": None, "vs_consenso": "Superior"},
  ],
  "ultima_presentacion": "En la conferencia del 1T26 (8-may) la dirección mantuvo la guía anual (ingresos con crecimiento de un dígito alto a tipo constante, BPA ajustado con crecimiento de dos dígitos bajos y caja libre de 1.350-1.450 M) y los resultados superaron ligeramente las previsiones de Renta 4 [8, 29]. En la del 1S26 (31-jul) el tono cambió: la guerra en Oriente Medio hizo caer las reservas aéreas desde marzo (−3,7 % en el semestre), la dirección rebajó el crecimiento de ingresos del grupo a «un dígito medio-alto», el de distribución aérea a «un dígito bajo-medio» y el del BPA ajustado a «un dígito alto o dos dígitos bajos», y mantuvo el margen EBIT ajustado (29,8 %) y la caja libre [1, 27]. El crecimiento de ingresos del 2T bajó al 2,2 % a tipo constante desde el 7,9 % del 1T, pero el EBITDA del trimestre (673 M) batió al consenso en un 3 % [17]. Las preguntas se centraron en el efecto de los agentes de IA sobre la distribución, la recuperación del tráfico en Oriente Medio y la compra de IDEMIA Public Security (1.200 M más hasta 150 M variables, cierre previsto a mediados de 2027) [23, 27]; la dirección no dio una cifra del efecto de la IA ni un objetivo de margen para 2027. Ingresos del 2T25 y del 2T26 deducidos de los semestrales (estimación propia).",
  "confianza": "Media"
 },
 "balance": {
  "historico": balance_hist,
  "vencimientos": [],
  "liquidez": "Caja y equivalentes de 791,8 M más 323,4 M de inversiones a corto plazo a cierre de 2025 [16]; deuda financiera neta de 2.141,4 M (dic-25) y 2.577,5 M a 30-jun-2026, 1,0 veces el EBITDA de los últimos 12 meses [2, 1]. Líneas de crédito no dispuestas: no localizadas.",
  "rating": None,
  "coste_deuda_pct": None,
  "vida_media_anios": None,
  "otros_pasivos": "La deuda financiera neta que publica Amadeus (según el contrato de financiación) no incluye los pasivos por arrendamiento (NIIF 16), que no se pudieron localizar en este entorno (hueco); por su tamaño (oficinas y centro de datos de Erding, ya muy migrado a la nube pública) su efecto por acción es pequeño. Compromisos que no figuran todavía en el balance: la compra de IDEMIA Public Security por 1.200 M en efectivo más hasta 150 M de pago variable, con cierre previsto a mediados de 2027 [23], y el dividendo complementario de 1,01 €/acción (436,2 M) pagado el 3-jul-2026, después del balance de junio [18]. Las pensiones y provisiones por litigios no se pudieron leer.",
  "comentario": "La deuda neta se ha mantenido en torno a 2.100-2.150 M de 2023 a 2025 (1,0x, 0,91x y ≈0,85x el EBITDA) [6, 5, 2] pese a pagar dividendos del 50 % del beneficio y a recomprar 1.300 M en 2025: la caja libre (1.302 M en 2025) lo financia casi todo [2]. Sube a 2.577,5 M en junio de 2026 por el dividendo a cuenta (0,53 €/acción en enero), la nueva recompra de hasta 500 M y la estacionalidad [1, 24], y subirá ≈1.200-1.350 M más con IDEMIA en 2027 [23]: el apalancamiento iría a ≈1,4-1,5x, todavía dentro de lo que la empresa considera prudente. El balance histórico solo tiene las líneas que dan los agregadores (sin circulante comercial ni intangibles): ROIC y Altman/Beneish se leen con cautela.",
  "confianza": "Baja"
 },
 "flujos": {
  "historico": flujos_hist,
  "comentario": "El flujo operativo pasó de 1.440 M en 2022 a 2.200 M en 2025 y el capex (sobre todo desarrollo de software capitalizado) de 567 M a 815 M, un 12,5 % de las ventas en 2025 [12]. La caja libre que define la empresa (después de capex, intereses e impuestos) fue de 805 M en 2022, 1.149 M en 2023, 1.335 M en 2024 y 1.302 M en 2025, un 97 % del beneficio contable de 2025 [6, 5, 2]: conversión alta y estable. En el 1S26 la caja libre fue de 472,2 M (+0,8 %) con el capex un 16,8 % más bajo (327,6 M, 9,8 % de las ventas) [1, 22]; la guía de 1.350-1.450 M para el año se mantuvo [27]. La empresa invierte más de 1.400 M al año en I+D (más del 20 % de las ventas), de los que la mitad larga se capitaliza [2]: la amortización (748 M en 2025) es casi igual al capex, así que la inversión neta es pequeña; estimación propia: ≈70 % del capex es mantenimiento y evolución de plataformas existentes. Dividendos pagados por año y adquisiciones: no localizados (hueco).",
  "confianza": "Media"
 },
 "calidad": {
  "auditor": None, "anios_auditor": None, "opinion": None,
  "comentario": "No se pudieron abrir las cuentas auditadas ni el informe de auditoría (solo búsqueda web). Lo relevante para la calidad del beneficio: (1) Amadeus capitaliza una parte grande de su I+D (más de 1.400 M de inversión en 2025, más del 20 % de los ingresos [2]); el capex de 815 M es casi igual a la amortización de 748 M, así que el beneficio no está inflado por una capitalización creciente, pero sí depende de la vida útil que se asigne al software; (2) el BPA «ajustado» excluye la amortización de intangibles de compras y efectos de cambio (≈85 M en 2025) [3, 4]: la diferencia es estable y pequeña, y el informe usa el ajustado solo para el PER, en la misma base en la historia y en la proyección; (3) la caja libre convierte ≈97 % del beneficio contable [2]. Los indicadores del motor (Altman, Piotroski, Beneish) se calculan con huecos de circulante y deben leerse con cautela.",
  "senales": [
   {"senal": "Capitalización de I+D elevada", "nivel": "Media", "comentario": "Más de 1.400 M de I+D al año; si la vida útil del software se acortara, la amortización subiría. Capex y amortización están igualados (815 frente a 748 M en 2025) [12, 2]."},
   {"senal": "Beneficio ajustado frente a contable", "nivel": "Baja", "comentario": "Diferencia estable de ≈85-90 M al año (amortización de intangibles de compras y cambio) [3, 5]."},
  ],
  "confianza": "Baja"
 },
 "capital": {
  "politica": "Dividendo del 50 % del beneficio (1,54 €/acción con cargo a 2025, +6 %; 664,6 M), en dos pagos: 0,53 € a cuenta en enero y 1,01 € complementario en julio [18, 3]. Recompras: 1.300 M terminados en el 4T25 [2] y un nuevo programa de hasta 500 M desde el 2-mar-2026, en tramos (el de junio, hasta 150 M) [24, 18]; la junta de 2026 autorizó comprar hasta el 10 % del capital en cinco años y amortizar 18,9 M de acciones propias, con lo que el capital quedó en 431,57 M de acciones el 30-jun-2026 [31]. Prioridades: inversión en I+D, compras selectivas (IDEMIA Public Security, SkyLink) y devolución del exceso con un apalancamiento objetivo de 1-1,5x el EBITDA [23, 28].",
  "adquisiciones": [
   {"anio": "2026", "objetivo": "IDEMIA Public Security (biometría, control de fronteras y seguridad pública)", "importe": 1200, "ev_ebitda": None, "financiacion": "Caja y deuda; hasta 150 M de pago variable adicional; cierre previsto a mediados de 2027", "resultado": "Pendiente de aprobaciones regulatorias [23]"},
   {"anio": "2026", "objetivo": "SkyLink (IA conversacional para reservas)", "importe": None, "ev_ebitda": None, "financiacion": "Caja", "resultado": "Integración en la oferta de IA agéntica; importe no publicado [28]"},
  ],
  "comentario": "La dirección ha devuelto en 2025 casi el doble de su caja libre (1.300 M de recompra más ≈620 M de dividendos frente a 1.302 M de caja libre) manteniendo la deuda neta en ≈0,85x el EBITDA [2]: el balance tenía holgura. La compra de IDEMIA Public Security (1.200-1.350 M) es la mayor desde TravelClick (2018) y diversifica hacia la biometría de fronteras, donde Amadeus ya había entrado con Vision-Box; su rentabilidad no se puede juzgar todavía (sin múltiplo publicado) [23]. El ROIC incremental y la dilución están en las tablas del motor; con acciones en ≈431,6 M frente a 447 M en 2023, las recompras han reducido el número de acciones ≈3,5 % en dos años [11, 31].",
  "confianza": "Media"
 },
 "fuentes": fA,
 "huecos": [
  {"seccion": "balance", "campo": "circulante comercial, intangibles, inmovilizado, reservas, arrendamientos, vencimientos, rating y coste de la deuda", "tipo": "Núcleo", "intentos": "1) Cuentas anuales 2025 y Management Review en amadeus.com: no accesibles (solo búsqueda web); 2) Stock Analysis, Tracenable, TipRanks y Alpha Spread vía búsqueda: solo activo total, patrimonio, fondo de comercio y caja; 3) prensa financiera: solo deuda neta y apalancamiento", "decision": "Omitido"},
  {"seccion": "financieros", "campo": "resultado financiero, impuestos, BPA 2021-2022 y acciones 2021-2022", "tipo": "Núcleo", "intentos": "1) Notas de prensa anuales: el extracto de búsqueda no da el desglose; 2) Kalkine, Stockopedia y macrotrends: series incompletas o en USD; 3) derivado con un tipo del 21 % para 2024-2025", "decision": "Calculado y marcado como estimación"},
  {"seccion": "flujos", "campo": "dividendos pagados, adquisiciones y pagos de arrendamientos por año", "tipo": "Complemento", "intentos": "1) Estado de flujos de la empresa: no accesible; 2) Chartmill y Barchart: solo flujo operativo y capex; 3) notas de prensa: solo dividendo por acción y recompras", "decision": "Omitido"},
  {"seccion": "calidad", "campo": "auditor, años y opinión", "tipo": "Complemento", "intentos": "1) Informe de auditoría 2025: no accesible; 2) IAGC en la CNMV: no accesible; 3) prensa: sin resultados", "decision": "Omitido"},
 ],
}
w('A.json', A)

# ---------------- B. Sector y competencia ----------------
fB = [
 F(1, "Amadeus IT Group SA AMS: perfil y foso (cuota de las reservas aéreas de la industria)", "Morningstar", "Analistas", "2026", "https://www.morningstar.com/quotes/0P0000P5MC"),
 F(2, "Amadeus H1 2026: Amadeus delivers resilient performance (nota de prensa)", "Amadeus", "Primaria", "2026-07-31", "https://amadeus.com/en/newsroom/press-releases/amadeus-h1-2026-resilient-performance"),
 F(3, "Sabre Corp: resultados del 2T 2026 (Form 8-K)", "Sabre / SEC", "Primaria", "2026-08-07", "https://www.sec.gov/Archives/edgar/data/0001597033/000162828026053858/q22026earningsrelease.htm"),
 F(4, "Sabre exceeds Q2 CY2026 expectations, stock jumps 11 % (capitalización)", "Barchart", "Prensa", "2026-08-07", "https://www.barchart.com/story/news/3690735/sabre-nasdaqsabr-exceeds-q2-cy2026-expectations-stock-jumps-11-1"),
 F(5, "Cuotas de los GDS: Amadeus ≈40 %, Sabre ≈30 %, Travelport 15-20 % (comentario sectorial)", "10 Minutes News for Hoteliers", "Sectorial", "2025-09", "https://en.10minhotel.com/?p=157239"),
 F(6, "Amadeus AI hotel tools strategy (HITEC, comercio con IA y Google UCP)", "Skift", "Sectorial", "2026-06-16", "https://skift.com/es/2026/06/16/amadeus-ai-hotel-tools-strategy-hitec-exclusive/"),
 F(7, "Amadeus has an answer for AI's infinite search problem (cobro por búsquedas de agentes)", "Skift", "Sectorial", "2026-06-23", "https://skift.com/es/2026/06/23/amadeus-has-an-answer-for-ais-infinite-search-problem/"),
 F(8, "JP Morgan recorta el precio a Amadeus ante las presiones derivadas de Oriente Medio (previsión de tráfico de IATA)", "Bolsamanía", "Prensa", "2026-07", "https://www.bolsamania.com/noticias_print/analisis-fundamental/jp-morgan-recorta-precio-amadeus-presiones-oriente-medio--22773648.html"),
 F(9, "Amadeus IT Group (conferencia de inversores: tesis sobre IA, OTA y cobro por exceso de búsquedas)", "Investor.fm", "Analistas", "2026", "https://conference.investor.fm/amadeus-it-group-2/"),
 F(10, "Amadeus revela una gran expansión de su estrategia de IA en hospitality (nota de prensa)", "Amadeus", "Primaria", "2026-06", "https://amadeus.com/es/sala-de-prensa/notas-de-prensa/amadeus-revela-gran-expansion-estrategia-ia-sector-hospitality"),
 F(11, "Amadeus to acquire IDEMIA Public Security (nota de prensa)", "Amadeus", "Primaria", "2026-04-29", "https://amadeus.com/en/newsroom/press-releases/amadeus-to-acquire-idemia-public-security-ips"),
 F(12, "Amadeus FY 2025 results (nota de prensa)", "Amadeus", "Primaria", "2026-02-27", "https://amadeus.com/en/newsroom/press-releases/amadeus-fy-2025-results-revenue-growth"),
]
B = {
 "historia": {
  "resumen": "Amadeus nació en 1987 como sistema de reservas compartido de Air France, Iberia, Lufthansa y SAS, para competir con los sistemas de las aerolíneas estadounidenses. Salió a bolsa en 1999, fue excluida en 2005 por un consorcio de capital riesgo (BC Partners y Cinven) con las aerolíneas, y volvió al mercado en 2010. Desde entonces ha pasado de distribuidor (GDS) a proveedor de los sistemas centrales de las aerolíneas (Altéa, Navitaire) y, con TravelClick (2018), de los hoteles. En 2020 la pandemia hundió sus ingresos a 2.174 M; en 2023 recuperó los niveles de 2019 [12]. En 2026 compra IDEMIA Public Security para crecer en biometría de fronteras [11].",
  "hitos": [
   {"anio": "1987", "hito": "Fundación por Air France, Iberia, Lufthansa y SAS"},
   {"anio": "1999", "hito": "Salida a bolsa en Madrid"},
   {"anio": "2005", "hito": "Exclusión de bolsa por BC Partners y Cinven con las aerolíneas fundadoras"},
   {"anio": "2010", "hito": "Vuelta a bolsa; entra en el IBEX 35"},
   {"anio": "2016", "hito": "Compra de Navitaire (sistemas para aerolíneas de bajo coste)"},
   {"anio": "2018", "hito": "Compra de TravelClick: entrada fuerte en tecnología hotelera"},
   {"anio": "2020", "hito": "Pandemia: ingresos −61 % y pérdidas; ampliación de capital y convertible"},
   {"anio": "2024", "hito": "Compra de Vision-Box (biometría aeroportuaria)"},
   {"anio": "2026", "hito": "Compra de SkyLink (IA conversacional) y acuerdo para comprar IDEMIA Public Security (1.200 M) [11]"},
  ],
  "confianza": "Media"
 },
 "negocio": {
  "descripcion": "Amadeus es la plataforma tecnológica que conecta a proveedores de viajes (aerolíneas, hoteles, ferrocarriles) con quienes los venden (agencias, agencias en línea, empresas) y que gestiona los sistemas centrales de muchas aerolíneas. Tiene tres segmentos: Air Distribution (el sistema de distribución global o GDS; 1.585 M de ingresos y 238 M de reservas en el 1S26), Air IT Solutions (sistema de pasajeros Altéa y Navitaire, 1.089 M de pasajeros embarcados y 1.207 M de ingresos en el 1S26) y Hospitality & Other Solutions (software hotelero, pagos y biometría; 543 M) [2]. Sus clientes son unas 200 aerolíneas en sus sistemas de pasajeros, decenas de miles de agencias y más de 40.000 hoteles; opera en la nube pública (Microsoft Azure) tras migrar desde su centro de datos de Erding.",
  "como_gana_dinero": "Casi todo es transaccional y recurrente: en distribución cobra a la aerolínea una tarifa por reserva hecha a través de su GDS (y paga un incentivo a la agencia); en Air IT cobra por pasajero embarcado en las aerolíneas que usan Altéa o Navitaire, con contratos de varios años; en hoteles, licencias, suscripciones y transacciones [2]. El ingreso depende del volumen de viajes (reservas y pasajeros) y del precio por unidad, que sube por nuevas funciones (el ingreso por pasajero embarcado creció un 7,5 % en el 1S26) [2]. Los costes de desarrollo son en buena parte fijos y el margen EBITDA pasó del 35 % al 38,5 % en tres años; la distribución es más cíclica (cayó un 3,7 % en volumen en el 1S26 por Oriente Medio) y las soluciones para aerolíneas y hoteles, más estables.",
  "segmentos": [
   {"nombre": "Air Distribution", "descripcion": "GDS: reservas de agencias y agencias en línea", "tipo_resultado": None, "historico": [{"periodo": "1S26", "ingresos": 1585, "resultado": None}]},
   {"nombre": "Air IT Solutions", "descripcion": "Sistemas de pasajeros (Altéa, Navitaire) y soluciones aeroportuarias", "tipo_resultado": None, "historico": [{"periodo": "1S26", "ingresos": 1207, "resultado": None}]},
   {"nombre": "Hospitality & Other Solutions", "descripcion": "Software hotelero, pagos y biometría", "tipo_resultado": None, "historico": [{"periodo": "1S26", "ingresos": 543, "resultado": None}]},
  ],
  "geografias": [], "geografias_criterio": None,
  "clientes": "Concentración baja: ninguna aerolínea pesa de forma relevante en los ingresos (no se publica el primer cliente) y el GDS reparte el volumen entre decenas de miles de agencias. Los contratos de Air IT son de 10 años o más y la migración de un sistema de pasajeros cuesta años, de ahí que los cambios de proveedor sean raros. El poder de precios se ve en el ingreso por pasajero embarcado (+7,5 % a tipo constante en el 1S26, con pasajeros +1,1 %) y en la tarifa media de distribución, que siguió subiendo con las reservas a la baja [2]; Amadeus empezó a cobrar a los agentes de IA y a las agencias en línea por el exceso de búsquedas por encima de unas 1.000 por reserva [9, 7]. El riesgo está en la distribución: las aerolíneas empujan la venta directa (NDC) para pagar menos tarifa de GDS.",
  "kpis": [
   {"kpi": "Reservas aéreas en agencias (1S)", "valor_anterior": "≈247 M (1S25)", "valor_actual": "238 M (1S26)", "variacion": "−3,7 %", "comentario": "Guerra en Oriente Medio desde marzo [2]"},
   {"kpi": "Pasajeros embarcados (1S)", "valor_anterior": "≈1.077 M (1S25)", "valor_actual": "1.089 M (1S26)", "variacion": "+1,1 %", "comentario": "Tráfico aéreo más lento [2]"},
   {"kpi": "Ingreso por pasajero embarcado (Air IT)", "valor_anterior": "—", "valor_actual": "+7,5 % a tipo constante", "variacion": "+7,5 %", "comentario": "Nuevas funciones y aerolíneas migradas [2]"},
   {"kpi": "Ingresos de Hospitality & Other (1S)", "valor_anterior": "—", "valor_actual": "543 M", "variacion": "+9,2 % a tipo constante", "comentario": "Nuevos clientes y pagos [2]"},
   {"kpi": "Inversión en I+D (año)", "valor_anterior": "—", "valor_actual": "> 1.400 M (2025)", "variacion": "—", "comentario": "Más del 20 % de los ingresos [12]"},
  ],
  "confianza": "Media"
 },
 "sector": {
  "definicion": "El mercado relevante es la tecnología para la industria del viaje: la distribución electrónica de vuelos y hoteles a agencias (GDS), los sistemas de pasajeros de las aerolíneas y el software hotelero. En el GDS mundial compiten tres empresas: Amadeus, Sabre y Travelport (privada), que se reparten casi todo el volumen de reservas de agencias [1]. No se pudo leer ninguna estimación independiente del tamaño del mercado en euros con fuente fiable en este entorno, así que la sección se apoya en las cuotas y en los volúmenes (reservas y pasajeros) que publican las propias empresas.",
  "tamano": None, "unidad_serie": None, "serie": [],
  "tcac_historico_pct": None, "tcac_previsto_pct": None, "cr5_pct": 100.0, "estructura": "Concentrada",
  "drivers": [
   {"driver": "Tráfico aéreo mundial", "efecto": "+/−", "horizonte": "Cíclico", "evidencia": "IATA rebajó en 2026 su previsión de crecimiento del tráfico hacia el 2 % por la guerra en Oriente Medio; la guía de Amadeus partía del 4,5 % [8]"},
   {"driver": "Precio por unidad (funciones nuevas, NDC, merchandising)", "efecto": "+", "horizonte": "Estructural", "evidencia": "Ingreso por pasajero embarcado +7,5 % en el 1S26 [2]"},
   {"driver": "Venta directa de las aerolíneas (NDC)", "efecto": "−", "horizonte": "Estructural", "evidencia": "Las aerolíneas usan NDC para pagar menos al GDS; Amadeus lo integra en su plataforma [1, 9]"},
   {"driver": "Agentes de IA y búsqueda conversacional", "efecto": "+/−", "horizonte": "Estructural", "evidencia": "Más búsquedas por reserva (cobro por exceso) y riesgo de que los agentes reserven directo; Amadeus es socio de Google en su protocolo de comercio [6, 7]"},
   {"driver": "Digitalización hotelera y biometría", "efecto": "+", "horizonte": "Estructural", "evidencia": "Hospitality +9,2 % en el 1S26; compra de IDEMIA Public Security [2, 11]"},
  ],
  "porter": [
   {"fuerza": "Rivalidad", "intensidad": 2, "justificacion": "Tres GDS; Sabre en pérdidas y con capitalización de ≈840 M USD, sin capacidad de guerra de precios [4]"},
   {"fuerza": "Poder de los clientes", "intensidad": 3, "justificacion": "Grandes aerolíneas y agencias en línea negocian tarifas e incentivos y empujan la venta directa (NDC) [1]"},
   {"fuerza": "Poder de los proveedores", "intensidad": 2, "justificacion": "Nube pública (Microsoft) y talento de ingeniería; sin dependencia crítica de un proveedor"},
   {"fuerza": "Amenaza de entrada", "intensidad": 2, "justificacion": "Construir un sistema de pasajeros o un GDS con miles de conexiones lleva décadas; la IA reduce algo la barrera en la búsqueda, no en la reserva y la liquidación [9]"},
   {"fuerza": "Amenaza de sustitutos", "intensidad": 3, "justificacion": "Venta directa de aerolíneas y agentes de IA que reserven sin pasar por el GDS [6, 7]"},
  ],
  "ciclo": {"posicion": "Madurez del ciclo", "comentario": "El tráfico aéreo superó los niveles de 2019 en 2024 y crece ya a ritmos de un dígito; en 2026 el conflicto en Oriente Medio frenó las reservas desde marzo (−3,7 % en el 1S) [2, 8]. En 2008-09 las reservas cayeron en torno a un 10 %, en 2020 los ingresos de Amadeus se hundieron un 61 % y en 2022 recuperaron con fuerza [12]: la distribución es cíclica y las soluciones para aerolíneas y hoteles amortiguan."},
  "regulacion": "La distribución aérea por GDS está regulada en la UE por el Código de Conducta de los sistemas de reserva (Reglamento 80/2009), que obliga a mostrar las ofertas de forma neutral; en EE. UU. la norma equivalente se derogó. La nueva Ley de Mercados Digitales y la regulación de la IA pueden cambiar cómo los asistentes de IA muestran y reservan viajes. La compra de IDEMIA Public Security necesita aprobaciones regulatorias y de seguridad nacional en varios países (cierre previsto a mediados de 2027) [11].",
  "tendencias": "La IA es la gran pregunta: el mercado teme que los agentes de IA reserven directamente en las webs de aerolíneas y hoteles y salten el GDS. Amadeus responde integrándose como infraestructura (socio de Google en su protocolo de comercio universal, acuerdos con Microsoft, compra de SkyLink) y cobrando por el exceso de búsquedas que generan los agentes [6, 7, 10]. La venta directa por NDC avanza despacio y Amadeus agrega también ese contenido. Ganan los que controlan el inventario, el precio y la liquidación; pierde la intermediación pura de búsqueda.",
  "confianza": "Baja"
 },
 "competencia": {
  "cuota_pct": 45.0,
  "posicion": "1.º GDS mundial, con entre el 40 % y la mitad de las reservas aéreas de agencias según la fuente [1, 5]; 1.º en sistemas de pasajeros de aerolíneas de red (Altéa) y uno de los principales proveedores de software hotelero.",
  "competidores": [
   {"nombre": "Sabre", "pais": "EE. UU.", "ticker": "SABR", "ingresos": None, "cuota_pct": 30.0, "margen_ebit_pct": None, "comentario": "2.º GDS (≈30 %); vendió su negocio hotelero en 2025, sigue con pérdidas; EBITDA ajustado previsto ≈600 M USD en 2026 [3, 5]"},
   {"nombre": "Travelport", "pais": "Reino Unido", "ticker": None, "ingresos": None, "cuota_pct": 17.5, "margen_ebit_pct": None, "comentario": "3.º GDS (15-20 %), propiedad de fondos desde 2019; pierde cuota [5]"},
   {"nombre": "Oracle Hospitality", "pais": "EE. UU.", "ticker": "ORCL", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Competidor en software hotelero (gestión de propiedades)"},
  ],
  "foso": {
   "veredicto": "Amplio", "tendencia": "Estable",
   "fuentes": [
    {"fuente": "Efectos de red", "puntuacion": 5, "evidencia": "Más agencias atraen más contenido de aerolíneas y viceversa: la mitad de las reservas aéreas de agencias pasan por su plataforma [1]"},
    {"fuente": "Costes de cambio", "puntuacion": 5, "evidencia": "Migrar un sistema de pasajeros lleva años y los contratos duran más de diez; ingreso por pasajero +7,5 % con volumen +1,1 % [2]"},
    {"fuente": "Intangibles (marca, patentes, licencias)", "puntuacion": 3, "evidencia": "Software propio con más de 1.400 M de I+D al año; poca marca ante el consumidor [12]"},
    {"fuente": "Ventaja en costes", "puntuacion": 3, "evidencia": "Escala de desarrollo: margen EBITDA del 38,5 % frente a pérdidas de Sabre [3]"},
    {"fuente": "Escala eficiente", "puntuacion": 4, "evidencia": "Tres GDS en el mundo; nadie ha entrado en treinta años [1]"},
   ]
  },
  "amenazas": "La amenaza principal es la desintermediación por IA: si los asistentes de Google, OpenAI o las agencias en línea reservan directamente con las aerolíneas por NDC, la tarifa de distribución (casi la mitad de los ingresos) perdería volumen. Probabilidad media a cinco años: la reserva de un vuelo exige inventario, tarifas, emisión del billete y liquidación que hoy solo dan los GDS y los sistemas de pasajeros, y Amadeus está dentro de ese circuito (Google, Microsoft) [6, 9]. Amenaza secundaria: la presión de las grandes aerolíneas para bajar tarifas al renovar contratos.",
  "confianza": "Media"
 },
 "esg": {
  "calificaciones": [],
  "materialidad": "Los asuntos materiales son la ciberseguridad y la continuidad del servicio (un fallo deja sin facturar a cientos de aerolíneas y aeropuertos), la privacidad de los datos de los viajeros (el negocio de biometría con IDEMIA Public Security añade datos sensibles y escrutinio regulatorio) [11] y la huella energética de la nube, ya trasladada a Microsoft Azure. No se localizaron cifras de emisiones ni de alineamiento con la taxonomía.",
  "controversias": "No se encontraron sanciones ni litigios relevantes en los últimos tres años en la búsqueda realizada (prensa española e internacional); las calificaciones ESG no se pudieron leer.",
  "confianza": "Baja"
 },
 "fuentes": fB,
 "huecos": [
  {"seccion": "sector", "campo": "tamaño y crecimiento del mercado de tecnología del viaje", "tipo": "Núcleo", "intentos": "1) Informes de Amadeus (Global Report): no accesibles; 2) búsqueda de estudios de mercado de GDS y travel tech: sin cifra fiable; 3) Morningstar y prensa sectorial: solo cuotas", "decision": "Omitido"},
  {"seccion": "negocio", "campo": "segmentos 2021-2025 y geografías", "tipo": "Núcleo", "intentos": "1) Notas de prensa anuales: el extracto solo da el grupo; 2) infografías: solo el 1S26; 3) agregadores: sin segmentos", "decision": "Omitido"},
  {"seccion": "competencia", "campo": "ingresos y margen EBIT de Sabre, Travelport y Oracle Hospitality", "tipo": "Complemento", "intentos": "1) 8-K de Sabre: el extracto solo da el trimestre; 2) Barchart y Zacks: trimestres y EBITDA ajustado; 3) Travelport es privada", "decision": "Omitido"},
  {"seccion": "esg", "campo": "calificaciones ESG", "tipo": "Complemento", "intentos": "1) Global Report 2025: no accesible; 2) MSCI y Sustainalytics: no accesibles; 3) prensa: sin resultados", "decision": "Omitido"},
 ],
}
w('B.json', B)

# ---------------- C. Equipo y gobierno ----------------
fC = [
 F(1, "El consejero delegado de Amadeus, Luis Maroto, ganó 4,37 millones en 2025, un 9,6 % más", "Forbes España", "Prensa", "2026-02-27", "https://forbes.es/economia/881289/el-consejero-delegado-de-amadeus-luis-maroto-gano-437-millones-en-2025-un-96-mas/"),
 F(2, "Amadeus da luz verde al dividendo de 664,6 millones y la reelección de Maroto", "Estrategias de Inversión", "Prensa", "2026-06-03", "https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/amadeus-da-luz-verde-al-dividendo-de-6646-millones-n-923055"),
 F(3, "Capital social: participaciones significativas a 30-jun-2026", "Amadeus", "Primaria", "2026-07", "https://amadeus.com/es/centro-inversores/capital-social"),
 F(4, "Citi reduce a la mitad su peso en Amadeus hasta el 1,2 %", "Demócrata / Europa Press", "Prensa", "2026-07", "https://www.democrata.es/ca/economia/citi-redueix-a-la-meitat-el-seu-pes-en-amadeus-fins-al-1-2-valorat-en-269-milions/"),
 F(5, "Luis Maroto, consejero delegado (biografía)", "Amadeus", "Primaria", "2026", "https://amadeus.com/es/quienes-somos/liderazgo/luis-maroto"),
 F(6, "La junta de Amadeus aprueba la reelección de Maroto como consejero delegado", "Valencia Plaza", "Prensa", "2026-06", "https://valenciaplaza.com/valenciaplaza/la-junta-de-amadeus-aprueba-la-reeleccion-de-maroto-como-ceo-y-la-renovacion-de-maroto-como-ceo"),
 F(7, "Amadeus prevé ingresar hasta 6.840 millones en 2025 con un EBITDA de hasta 2.580 millones (guía 2025; salida del director financiero)", "Forbes España", "Prensa", "2025-02-28", "https://forbes.es/forbestravel/730201/amadeus-preve-ingresar-hasta-6-840-millones-en-2025-con-un-114-mas-y-un-ebitda-de-2-580-millones-11/"),
 F(8, "Amadeus FY 2025 results (nota de prensa)", "Amadeus", "Primaria", "2026-02-27", "https://amadeus.com/en/newsroom/press-releases/amadeus-fy-2025-results-revenue-growth"),
 F(9, "Amadeus H1 2026 (nota de prensa) y resumen de la conferencia", "Amadeus", "Primaria", "2026-07-31", "https://amadeus.com/en/newsroom/press-releases/amadeus-h1-2026-resilient-performance"),
 F(10, "FY 2024 results press release (guía 2024 frente a real)", "Amadeus", "Primaria", "2025-02-28", "https://corporate.amadeus.com/documents/en/investors/2024/financial-results/q4-2024/fy-2024-results-press-release.pdf"),
]
C = {
 "directivos": {
  "equipo": [
   {"nombre": "Luis Maroto", "cargo": "Consejero delegado", "desde": "2011", "participacion_pct": None, "trayectoria": "En Amadeus desde 1999 (antes director financiero y de operaciones); consejero delegado desde 2011. Llevó a la empresa de ≈2.700 M de ingresos en 2010 a 6.517 M en 2025 y por la pandemia sin perder ningún gran cliente; asumió además la dirección financiera de forma transitoria tras la salida de Till Streichert en septiembre de 2024 [5, 7, 8]. Reelegido consejero por un año en junio de 2026 [2]."},
   {"nombre": "William Connelly", "cargo": "Presidente no ejecutivo", "desde": None, "participacion_pct": None, "trayectoria": "Consejero independiente reelegido por periodos de un año; presidente del consejo, con una retribución de 430.000 € en 2025 [1]."},
  ],
  "historial_guidance": [
   {"anio": "2024", "guia": "Crecimiento de dos dígitos en ingresos y EBITDA", "real": "Ingresos +12,9 %, EBITDA +13,2 % [10]", "cumplida": "Sí"},
   {"anio": "2025", "guia": "Ingresos de 6.690-6.840 M y EBITDA de hasta 2.580 M [7]", "real": "Ingresos 6.517 M (+8,5 % a tipo constante; el dólar restó) y EBITDA 2.506,6 M [8]", "cumplida": "Parcial"},
   {"anio": "2026", "guia": "Ingresos +dígito alto a tipo constante, BPA ajustado +dos dígitos bajos, caja libre 1.350-1.450 M (febrero)", "real": "Rebajada en julio: ingresos +dígito medio-alto, BPA +dígito alto/dos dígitos bajos; caja libre mantenida [9]", "cumplida": "Parcial"},
  ],
  "comentario": "La cúpula es estable: Maroto lleva quince años como consejero delegado y dos décadas largas en la casa, y la dirección cumplió la guía de 2024 y la de 2025 a tipo constante; en 2025 el dólar dejó los ingresos en euros por debajo del rango [7, 8]. Dos puntos débiles: el puesto de director financiero lo ocupa el propio consejero delegado de forma transitoria desde septiembre de 2024 (no se localizó un nombramiento posterior) [7], y la reelección de Maroto por solo un año en 2026 sugiere que la sucesión está abierta sin un plan público [2]. Es una pregunta para la dirección.",
  "confianza": "Media"
 },
 "gobierno": {
  "consejo": [
   {"nombre": "William Connelly", "cargo": "Presidente", "tipo": "Independiente", "desde": None, "comisiones": None},
   {"nombre": "Luis Maroto", "cargo": "Consejero delegado", "tipo": "Ejecutivo", "desde": None, "comisiones": None},
  ],
  "presidente_ceo_separados": True, "presidente_ejecutivo": False, "consejero_coordinador": None, "una_accion_un_voto": True,
  "operaciones_vinculadas_relevantes": False, "variable_ligado_rentabilidad": None, "auditoria_independiente": None, "insiders_sin_operaciones": False, "accionista_control": False, "presidente_vinculado_control": False, "cambios_cupula_24m": 0, "voto_remuneracion_pct": None, "voto_remuneracion_contra_pct": None, "voto_remuneracion_contra_libre_pct": None, "voto_cupula_pct": None,
  "remuneracion_ceo": {"anio": "2025", "total": 4.37, "fijo": None, "variable_corto": None, "variable_largo": None, "ratio_salario_medio": None},
  "remuneracion": "El consejero delegado devengó 4,37 M € en 2025, un 9,6 % más que en 2024 [1]; el presidente, 0,43 M € (+25 %) [1]. No se pudo leer el IARC, así que no hay detalle de las métricas y pesos del variable, del plan a largo plazo ni de las cláusulas de recuperación; en ejercicios anteriores el plan a largo plazo de Amadeus usaba el BPA ajustado, la caja libre y el TSR relativo (dato no verificado en este análisis).",
  "accionistas": [
   {"nombre": "BlackRock", "pct": 5.498, "tipo": "Institucional", "variacion": "≈+0,25 puntos frente a 2024"},
   {"nombre": "Massachusetts Financial Services", "pct": 5.090, "tipo": "Institucional", "variacion": "n.d."},
   {"nombre": "Capital Research and Management", "pct": 5.032, "tipo": "Institucional", "variacion": "n.d."},
   {"nombre": "Fidelity International", "pct": 4.082, "tipo": "Institucional", "variacion": "n.d."},
   {"nombre": "Fundsmith", "pct": 3.020, "tipo": "Institucional", "variacion": "n.d."},
   {"nombre": "Citigroup", "pct": 1.268, "tipo": "Institucional", "variacion": "Bajó desde el 3,097 % (jul-2026) [4]"},
  ],
  "insiders": [],
  "control_y_defensas": "Amadeus no tiene accionista de control: las aerolíneas fundadoras salieron del capital tras la vuelta a bolsa y hoy los mayores accionistas son gestoras institucionales con un 3-5,5 % cada una (BlackRock, MFS, Capital Research, Fidelity, Fundsmith) [3]. Una acción, un voto, sin límites estatutarios conocidos. El presidente es independiente y está separado del consejero delegado. La empresa es, por tamaño y accionariado disperso, un posible objetivo de una opa, aunque la participación en sistemas críticos de aerolíneas y fronteras (IDEMIA) haría probable un control de inversiones extranjeras.",
  "alertas": [
   "Director financiero interino (el propio consejero delegado) desde septiembre de 2024; no se localizó nombramiento posterior [7].",
   "Reelección del consejero delegado por un solo año (junio de 2026): sucesión sin plan público [2].",
  ],
  "confianza": "Baja"
 },
 "fuentes": fC,
 "huecos": [
  {"seccion": "gobierno", "campo": "composición completa del consejo, comisiones, votos de la junta e IARC", "tipo": "Núcleo", "intentos": "1) IAGC e IARC 2025 en la CNMV y amadeus.com: no accesibles; 2) acta de la junta de 2026: no accesible; 3) prensa: solo presidente, consejero delegado y retribuciones", "decision": "Omitido"},
  {"seccion": "gobierno", "campo": "operaciones de consejeros y directivos de 12 meses", "tipo": "Complemento", "intentos": "1) Registro de la CNMV: no accesible; 2) búsqueda de compras y ventas de directivos: sin resultados; 3) MarketScreener (insiders): no accesible", "decision": "Omitido"},
 ],
}
w('C.json', C)

# ---------------- D. Mercado y valoración ----------------
fD = [
 F(1, "Precios históricos de Amadeus-A (14-oct-2026, 11:44: 52,68 €; cierre anterior 52,62 €; 8-oct 51,28 €; 9-oct 52,30 €)", "Bolsamanía", "Datos de mercado", "2026-10-14", "https://www.bolsamania.com/accion/AMADEUS-IT-GRP-BR-A/historico-precios"),
 F(2, "Amadeus Stock Price Today (rango de 52 semanas 46,21-69,30 €; próximos resultados 6-nov-2026)", "Investing.com", "Datos de mercado", "2026-10", "https://www.investing.com/equities/amadeus"),
 F(3, "Amadeus IT Group (AMS.MC) Analyst Ratings, Estimates & Forecasts (BPA 2026e 3,46 €, 2027e 3,88 €)", "Yahoo Finance", "Datos de mercado", "2026-10", "https://finance.yahoo.com/quote/AMS.MC/analysis/"),
 F(4, "Amadeus IT Group: consenso (objetivo medio 67,20 €, 22 analistas, 50,00-80,90 €)", "MarketScreener", "Datos de mercado", "2026-07-10", "https://es.marketscreener.com/cotizacion/accion/AMADEUS-IT-GROUP-S-A-4027320/consenso/"),
 F(5, "Amadeus IT Group: previsiones de beneficio 2026-2028", "Simply Wall St", "Datos de mercado", "2026-10", "https://simplywall.st/stocks/us/consumer-services/otc-amad.f/amadeus-it-group/future"),
 F(6, "Amadeus empieza a agotar la paciencia de los analistas: Oddo le recorta la valoración", "Estrategias de Inversión", "Prensa", "2026-07", "https://www.estrategiasdeinversion.com/analisis/los-brokers-recomiendan/recomendaciones-espana/amadeus-empieza-a-agotar-la-paciencia-de-los-analistas-n-929103"),
 F(7, "Es el farolillo rojo del Ibex 35 en 2026… (caída del 7,16 % en 2025)", "Estrategias de Inversión", "Prensa", "2026-04", "https://www.estrategiasdeinversion.com/analisis/los-brokers-recomiendan/recomendaciones-espana/es-el-farolillo-rojo-del-ibex-35-en-2026-y-algunos-n-909217"),
 F(8, "Potencial de más del 20 % para una acción del Ibex 35 que empieza a ver la luz al final del túnel (54,90 €, −12,4 % en el año)", "Estrategias de Inversión", "Prensa", "2026-08-03", "https://www.estrategiasdeinversion.com/analisis/los-brokers-recomiendan/recomendaciones-espana/potencial-de-mas-del-20-para-una-accion-del-ibex-n-940325"),
 F(9, "Una acción del Ibex 35 ofrece más del 25 % de potencial (objetivo medio de Reuters 66,69 €)", "Merca2", "Prensa", "2026-06-16", "https://www.merca2.es/2026/06/16/acciones-ibex-35-dividendo-potencial-25-2398534/"),
 F(10, "Amadeus (AMS): recomendaciones (18 comprar, 2 mantener, 2 vender)", "Investing.com", "Datos de mercado", "2026-10", "https://es.investing.com/equities/amadeus"),
 F(11, "Prima de riesgo implícita del S&P 500 (ERPbymonth.xlsx, octubre de 2026: 4,20 %)", "Aswath Damodaran (NYU Stern)", "Datos de mercado", "2026-10", "https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx"),
 F(12, "Rendimiento del Bund alemán a 10 años (3,53 %, 12-oct-2026)", "Deutsche Bundesbank", "Datos de mercado", "2026-10-12", "https://www.bundesbank.de/en/statistics/money-and-capital-markets/interest-rates-and-yields"),
 F(13, "Expedia Group: previsiones y estadísticas (cotización del 2-oct-2026)", "Finviz", "Datos de mercado", "2026-10-02", "https://finviz.com/stock?t=EXPE&ty=fc"),
 F(14, "EV/EBITDA y capitalización de Expedia y Airbnb (septiembre de 2026)", "FinanceCharts", "Datos de mercado", "2026-09", "https://www.financecharts.com/stocks/EXPE/value/ev-to-ebitda"),
 F(15, "Trip.com Group: valoración (PER futuro y capitalización)", "Simply Wall St", "Datos de mercado", "2026-10", "https://simplywall.st/stocks/us/consumer-services/nasdaq-tcom/tripcom-group/valuation"),
 F(16, "Análisis de Booking Holdings (14-oct-2026): múltiplos calculados con precio 158,43 USD, consenso y puente", "Repositorio de análisis (informe propio)", "Analistas", "2026-10-14", "https://github.com/HotisS/analisis-inversion/tree/main/informes/booking-2026-10-14"),
 F(17, "Análisis de SAP (11-oct-2026): múltiplos de SAP y de Dassault Systèmes", "Repositorio de análisis (informe propio)", "Analistas", "2026-10-11", "https://github.com/HotisS/analisis-inversion/tree/main/informes/sap-2026-10-11"),
 F(18, "Análisis de Experian (14-oct-2026): múltiplos calculados", "Repositorio de análisis (informe propio)", "Analistas", "2026-10-14", "https://github.com/HotisS/analisis-inversion/tree/main/informes/experian-2026-10-14"),
 F(19, "Análisis de RELX (14-oct-2026): múltiplos de RELX y de Wolters Kluwer", "Repositorio de análisis (informe propio)", "Analistas", "2026-10-14", "https://github.com/HotisS/analisis-inversion/tree/main/informes/relx-2026-10-14"),
 F(20, "Sabre exceeds Q2 CY2026 expectations (capitalización ≈838 M USD, pérdidas)", "Barchart", "Prensa", "2026-08-07", "https://www.barchart.com/story/news/3690735/sabre-nasdaqsabr-exceeds-q2-cy2026-expectations-stock-jumps-11-1"),
 F(21, "Rentabilidad de Amadeus en 2026 (−19,2 % en el año)", "extraETF", "Datos de mercado", "2026-10", "https://extraetf.com/es/stock-profile/ES0109067019"),
 F(22, "Amadeus nuevo recorte… potencial del 15 % (Jefferies 60 €, BNP 78 €)", "Estrategias de Inversión", "Prensa", "2026-07", "https://www.estrategiasdeinversion.com/analisis/los-brokers-recomiendan/recomendaciones-espana/nuevo-recorte-para-amadeus-pero-el-potencial-alcista-n-929531"),
]
usd = 1.1206  # USD por EUR (BCE, 9-oct-2026, del informe de SAP del repositorio)
gbp = 1.15    # EUR por GBP aproximado (estimación; solo para ordenar tamaños)
comps = [
 dict(nombre="Booking Holdings", ticker="BKNG", pais="US", capitalizacion=round(121199/usd), ev_ventas=4.38, ev_ebitda_ltm=11.9, ev_ebitda_ntm=None, per_ntm=13.2, crecimiento_pct=None, margen_ebitda_pct=36.7, roic_pct=None, dn_ebitda=0.3, fcf_yield_pct=7.5),
 dict(nombre="Expedia Group", ticker="EXPE", pais="US", capitalizacion=round(31800/usd), ev_ventas=None, ev_ebitda_ltm=8.3, ev_ebitda_ntm=None, per_ntm=10.8, crecimiento_pct=None, margen_ebitda_pct=None, roic_pct=None, dn_ebitda=None, fcf_yield_pct=None),
 dict(nombre="Trip.com Group", ticker="TCOM", pais="CN", capitalizacion=round(40400/usd), ev_ventas=None, ev_ebitda_ltm=None, ev_ebitda_ntm=None, per_ntm=9.0, crecimiento_pct=None, margen_ebitda_pct=None, roic_pct=None, dn_ebitda=None, fcf_yield_pct=None),
 dict(nombre="Airbnb", ticker="ABNB", pais="US", capitalizacion=round(109000/usd), ev_ventas=None, ev_ebitda_ltm=36.7, ev_ebitda_ntm=None, per_ntm=29.2, crecimiento_pct=None, margen_ebitda_pct=None, roic_pct=None, dn_ebitda=None, fcf_yield_pct=None),
 dict(nombre="SAP", ticker="SAP", pais="DE", capitalizacion=221940, ev_ventas=5.65, ev_ebitda_ltm=18.2, ev_ebitda_ntm=15.1, per_ntm=24.2, crecimiento_pct=None, margen_ebitda_pct=31.1, roic_pct=15.5, dn_ebitda=-0.1, fcf_yield_pct=3.6),
 dict(nombre="Dassault Systèmes", ticker="DSY", pais="FR", capitalizacion=28794, ev_ventas=None, ev_ebitda_ltm=None, ev_ebitda_ntm=11.2, per_ntm=20.7, crecimiento_pct=5.3, margen_ebitda_pct=35.1, roic_pct=None, dn_ebitda=None, fcf_yield_pct=None),
 dict(nombre="Experian", ticker="EXPN", pais="GB", capitalizacion=round(30028/usd), ev_ventas=4.17, ev_ebitda_ltm=11.5, ev_ebitda_ntm=None, per_ntm=15.5, crecimiento_pct=None, margen_ebitda_pct=36.1, roic_pct=17.9, dn_ebitda=1.7, fcf_yield_pct=7.3),
 dict(nombre="RELX", ticker="REL", pais="GB", capitalizacion=round(44715*gbp), ev_ventas=5.55, ev_ebitda_ltm=14.0, ev_ebitda_ntm=None, per_ntm=17.8, crecimiento_pct=None, margen_ebitda_pct=39.7, roic_pct=33.2, dn_ebitda=2.3, fcf_yield_pct=5.1),
 dict(nombre="Wolters Kluwer", ticker="WKL", pais="NL", capitalizacion=round(13724*gbp), ev_ventas=3.35, ev_ebitda_ltm=10.2, ev_ebitda_ntm=9.3, per_ntm=12.9, crecimiento_pct=7.3, margen_ebitda_pct=32.9, roic_pct=25.4, dn_ebitda=2.0, fcf_yield_pct=8.3),
]
Dn = {
 "identificacion": {
  "nombre": "Amadeus IT Group, S.A.", "nombre_corto": "Amadeus", "ticker": "AMS", "isin": "ES0109067019", "mercado": "Bolsas y Mercados Españoles (Mercado Continuo, Madrid)", "indice_referencia": "IBEX 35",
  "pais": "España", "pais_iso": "ES", "sector": "Consumo discrecional (GICS)", "industria": "Tecnología para viajes (servicios de reservas y software para aerolíneas y hoteles)", "sede": "Madrid", "fundacion": "1987", "empleados": None, "web": "amadeus.com",
  "precio": 52.68, "fecha_precio": "2026-10-14", "acciones": 431.6, "capitalizacion_publicada": None, "free_float_pct": None,
  "max_52s": 69.30, "min_52s": 46.21, "volumen_medio_diario": None, "proximos_resultados": "2026-11-06"
 },
 "consenso": {
  "guidance": "Guía de 2026 publicada el 27-feb-2026: ingresos del grupo con crecimiento de un dígito alto a tipo constante, BPA ajustado diluido con crecimiento de dos dígitos bajos y caja libre de 1.350-1.450 M, con un tráfico aéreo mundial del +4,5 %. El 31-jul-2026, con el 1S, la rebajó por la guerra en Oriente Medio: ingresos con crecimiento de un dígito medio-alto, distribución aérea de un dígito bajo-medio y BPA ajustado de un dígito alto a dos dígitos bajos; mantuvo el margen EBIT ajustado (29,8 %) y la caja libre. No hay un plan a medio plazo con cifras publicado en 2026. Próxima actualización: resultados del 3T el 6-nov-2026 [2].",
  "estimaciones": [
   {"periodo": "2026e", "ingresos": None, "ebitda": None, "ebit": None, "bpa": 3.46, "dpa": None, "fuente": "Yahoo Finance, 19 analistas (BPA ajustado) [3]"},
   {"periodo": "2027e", "ingresos": None, "ebitda": None, "ebit": None, "bpa": 3.88, "dpa": None, "fuente": "Yahoo Finance [3]"},
   {"periodo": "2028e", "ingresos": None, "ebitda": None, "ebit": None, "bpa": 4.01, "dpa": None, "fuente": "Simply Wall St: beneficio de ≈1.730 M ÷ 431,6 M de acciones (estimación propia) [5]"},
  ],
  "recomendaciones": {"n_analistas": 22, "comprar": 18, "mantener": 2, "vender": 2, "po_medio": 67.20, "po_min": 50.00, "po_max": 80.90},
  "revisiones": "Los objetivos han bajado en 2026: Jefferies de 78 a 60 € y después a 65 € tras el 1S [8, 22], Oddo BHF de 63 a 60 € (neutral) [6], BNP Paribas de 79 a 78 € [22], y Kepler Cheuvreux pasó a «reducir» con 50 € en junio [4]. El objetivo medio de Reuters pasó de 66,69 € (junio) a 66,40 € [9] y el de MarketScreener es de 67,20 € (julio, 22 analistas) [4]; Yahoo da 69,15 € [3]. Las estimaciones de BPA de 2026-2027 subieron ligeramente en 90 días según Yahoo [3], porque la recompra compensa el menor volumen. Solo hay una fuente gratuita con estimaciones completas de BPA (Yahoo); el resto se contrasta con objetivos y recomendaciones.",
  "base_ebitda": "NIIF", "ajuste_ebitda_pct_ventas": None,
  "confianza": "Media"
 },
 "bolsa": {
  "tipo_rentabilidad": "de precio (sin dividendos)",
  "rentabilidades": [
   {"periodo": "En el año", "accion_pct": -15.9, "indice_pct": None, "sector_pct": None},
  ],
  "anual": [
   {"anio": "2025", "accion_pct": -7.2, "indice_pct": None},
  ],
  "beta": None, "volatilidad_pct": None, "max_drawdown_pct": None, "posicion_corta_pct": None,
  "comentario": "La acción cae ≈16 % en 2026 (52,68 € frente a un cierre de 2025 estimado en ≈62,7 €) tras perder un 7,2 % en 2025, cuando el IBEX vivió uno de sus mejores años [7, 8]: es de los valores más castigados del índice. Dos causas: el miedo a que los agentes de IA desintermedien la distribución (desde finales de 2025) y la guerra en Oriente Medio, que frenó las reservas desde marzo [8]. Marcó mínimos de 46,21 € el 17-feb-2026, rebotó tras el 1T (8-may) y el 1S (31-jul, +2,9 % en la sesión) y desde septiembre oscila entre 51 y 57 € [1, 2]. No se pudieron calcular beta, volatilidad ni caída máxima (sin acceso a históricos).",
  "confianza": "Baja"
 },
 "multiplos_historicos": {
  "serie": [
   {"anio": "2024", "precio_cierre": 67.50, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2025", "precio_cierre": 62.67, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
  ],
  "comentario": "Solo hay dos cierres de ejercicio fiables, estimados desde rentabilidades publicadas: ≈62,67 € en 2025 (54,90 € el 3-ago-2026 con −12,4 % en el año) [8] y ≈67,50 € en 2024 (el de 2025 deshaciendo la caída del 7,16 % del año) [7]. Con el BPA ajustado diluido (3,23 € en 2025 y ≈3,02 € estimado en 2024), el PER de cierre fue de ≈19,4x en 2025 y ≈22,4x en 2024; hoy, 52,68 € sobre el BPA de consenso de 2026 (3,46 €) son 15,2x [3]. La compresión del múltiplo (de 22x a 15x en dos años) con el beneficio creciendo al 7-10 % es la tesis del mercado: paga por Amadeus como por un negocio que la IA puede erosionar.",
  "confianza": "Baja"
 },
 "comparables": {
  "criterio": "Dos grupos: (1) plataformas de viajes con las que comparte demanda y ciclo (Booking, Expedia, Trip.com, Airbnb); (2) software e información europeos de alta recurrencia y margen parecido (SAP, Dassault Systèmes, Experian, RELX, Wolters Kluwer), que es como valoraba el mercado a Amadeus antes de 2025. Sabre, el competidor directo, se excluye: tiene pérdidas y una deuda que hace su PER inservible [20]; Travelport no cotiza. Los múltiplos vienen de informes del repositorio de la misma semana (9-14 oct) [16-19] y de agregadores [13-15]; las capitalizaciones en USD se pasan a 1,1206 USD/EUR y las de GBP a ≈1,15 EUR/GBP (aproximado).",
  "empresas": comps,
  "comentario": "La mediana del PER de los próximos 12 meses de los nueve comparables es de 15,5x, con un rango de 9x (Trip.com) a 29x (Airbnb); Amadeus cotiza a ≈15x el BPA de consenso de 2026, en la mediana y por debajo de todo el grupo de software europeo (13-24x) salvo Wolters Kluwer, que también sufre el miedo a la IA. Por margen EBITDA (38,5 %), conversión de caja y deuda (≈1x EBITDA), Amadeus se parece más al grupo de software (mediana ≈18x) que al de agencias en línea (mediana ≈12x). El descuento frente a su propia historia (22x en 2024) y frente a SAP o RELX solo se justifica si la distribución pierde volumen de forma permanente.",
  "confianza": "Baja"
 },
 "transacciones": None,
 "fuentes": fD,
 "huecos": [
  {"seccion": "transacciones", "campo": "operaciones precedentes con múltiplo", "tipo": "Complemento", "intentos": "1) Nota de IDEMIA Public Security: sin EBITDA publicado; 2) Travelport (2019) y Sabre Hospitality (2025): múltiplos no localizados en la búsqueda; 3) prensa: sin múltiplos fiables", "decision": "Omitido"},
  {"seccion": "bolsa", "campo": "beta, volatilidad, caída máxima, rentabilidades a 1-10 años, índices y posiciones cortas", "tipo": "Complemento", "intentos": "1) bolsa.mjs (Yahoo): sin red; 2) Investing y Bolsamanía vía búsqueda: solo precios sueltos; 3) CNMV posiciones cortas: no accesible", "decision": "Omitido"},
  {"seccion": "multiplos_historicos", "campo": "cierres de 2021-2023", "tipo": "Complemento", "intentos": "1) Históricos de Bolsamanía e Investing vía búsqueda: solo 2026; 2) prensa de fin de año: variaciones sin precio; 3) derivados de rentabilidades: solo 2024 y 2025", "decision": "Omitido"},
  {"seccion": "consenso", "campo": "ingresos y EBITDA de consenso 2026-2028", "tipo": "Complemento", "intentos": "1) MarketScreener: no accesible (solo con WebFetch); 2) Yahoo: solo BPA; 3) Simply Wall St: solo beneficio", "decision": "Omitido"},
 ],
}
w('D.json', Dn)

# ---------------- E. Sentimiento ----------------
fE = [
 F(1, "Amadeus (AMS): seguimiento de la acción (hilo del foro, ≈590 respuestas)", "Rankia", "Foros y redes", "2026-09", "https://www.rankia.com/foros/bolsa/temas/582421-amadeus-ams-seguimiento-accion"),
 F(2, "The AI fear arbitrage opportunity (narrativa de la comunidad)", "Simply Wall St (comunidad)", "Foros y redes", "2026-08", "https://www.simplywall.st/narratives/rnsdijbj-the-ai-fear-arbitrage-opportunity"),
 F(3, "10 analysts have lowered their price target for Amadeus (narrativa y comentarios)", "Simply Wall St (comunidad)", "Foros y redes", "2026-08", "https://simplywall.st/community/narratives/es/consumer-services/bme-ams/amadeus-it-group-shares/401ywxn4-cloud-migration-and-asia-pacific-trends-will-unlock-travel-opportunities-tzq9/updates/10-analysts-have-lowered-their-price-target-for-amadeus-it-grou"),
 F(4, "Amadeus IT Group: presentación de una tesis alcista en una conferencia de inversores particulares", "Investor.fm", "Foros y redes", "2026", "https://conference.investor.fm/amadeus-it-group-2/"),
 F(5, "Amadeus IT Group (BME:AMS) lifted 2026 revenue guidance, is the stock still cheap? (comentarios)", "Webull / Simply Wall St", "Foros y redes", "2026-09", "https://www.webull.com/news/15346476103394304"),
 F(6, "Foro de Amadeus (AMS) en Rankia (ficha y comentarios recientes)", "Rankia", "Foros y redes", "2026-10", "https://www.rankia.com/acciones/amadeus-ams/foro"),
 F(7, "Assessing whether Amadeus IT Group looks undervalued after recent share price weakness", "Simply Wall St", "Foros y redes", "2026-09", "https://simplywall.st/stocks/es/consumer-services/bme-ams/amadeus-it-group-shares/news/assessing-whether-amadeus-it-group-bmeams-looks-undervalued/amp"),
]
E = {
 "sentimiento": {
  "tono": "Dividido", "tendencia": "Mejora",
  "revisadas": [
   {"plataforma": "Rankia (hilo de seguimiento de Amadeus)", "fecha": "2026-09", "n_comentarios": 30, "tono": "Neutro", "resumen": "Mensajes sobre todo informativos (resultados, amortización de acciones, dividendo) y técnicos: zonas de entrada en 50-52 € y dudas sobre si el suelo de febrero aguanta [1, 6]."},
   {"plataforma": "Simply Wall St (narrativas de la comunidad)", "fecha": "2026-08", "n_comentarios": 20, "tono": "Positivo", "resumen": "La tesis más repetida es «arbitraje del miedo a la IA»: los agentes de IA necesitan inventario, precios, emisión y liquidación, que controla Amadeus; valores razonables de 62-87 € [2, 3]."},
   {"plataforma": "Investor.fm (presentación y preguntas)", "fecha": "2026-06", "n_comentarios": 10, "tono": "Positivo", "resumen": "Defiende que la IA no puede sustituir sistemas de pasajeros con requisitos de disponibilidad y responsabilidad, que las agencias en línea vuelven al GDS y que el valor cotiza a ≈15x beneficios [4]."},
   {"plataforma": "Webull / Simply Wall St (artículos con comentarios)", "fecha": "2026-09", "n_comentarios": 10, "tono": "Dividido", "resumen": "Unos lo ven barato frente a su historia; otros señalan que su PER de los últimos 12 meses (≈18,6x) sigue por encima de la media de su grupo y deja poco margen si el volumen no vuelve [5, 7]."},
  ],
  "temas": [
   {"tema": "La IA como amenaza o como oportunidad", "postura": "Dividida", "peso": "Alto", "contraste": "Los datos no muestran todavía pérdida de cuota: el ingreso por pasajero sube un 7,5 % y Amadeus cobra ya por el exceso de búsquedas de agentes; el riesgo es real a cinco años y está en el escenario bajista."},
   {"tema": "Valoración barata frente a la historia", "postura": "Alcista", "peso": "Alto", "contraste": "Correcto en múltiplo (≈15x frente a 19-22x en 2024-2025), pero la regla de múltiplos del informe no supone que vuelva a la mediana histórica en el caso base."},
   {"tema": "Tráfico aéreo y Oriente Medio", "postura": "Bajista", "peso": "Medio", "contraste": "Las reservas cayeron un 3,7 % en el 1S26; el informe proyecta recuperación gradual en 2027, no un rebote."},
   {"tema": "Recompras y dividendo", "postura": "Alcista", "peso": "Medio", "contraste": "Rentabilidad por dividendo ≈2,9 % y recompra de hasta 500 M en 2026; la compra de IDEMIA (1.200 M) reduce el margen para más recompras en 2027."},
  ],
  "lectura": "El sentimiento de los particulares es dividido con sesgo alcista: casi nadie discute la calidad del negocio y la mayoría ve la caída como un exceso del miedo a la IA, pero el foro español es más técnico que fundamental y no hay euforia. No es un extremo de capitulación ni de euforia, así que no aporta una señal contraria. Coincide con los analistas (18 de 22 recomiendan comprar) en ver valor, y ninguno de los dos grupos tiene una prueba de que la IA no vaya a reducir el volumen del GDS: ese es el riesgo que el informe pone en el escenario bajista.",
  "confianza": "Baja"
 },
 "fuentes": fE,
 "huecos": [
  {"seccion": "sentimiento", "campo": "Reddit, Stocktwits y Seeking Alpha", "tipo": "Complemento", "intentos": "1) Búsqueda en Reddit (r/EuropeanStocks, r/ValueInvesting): sin hilos; 2) Seeking Alpha: solo transcripciones antiguas; 3) Stocktwits: sin acceso en este entorno", "decision": "Omitido"},
 ],
}
w('E.json', E)
print('notas escritas')

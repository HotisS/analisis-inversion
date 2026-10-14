# Genera las notas A-E de Givaudan (corte 2026-10-14). Todas las cifras salen de extractos de búsqueda (WebSearch), con la URL.
import json, sys, os, re
D = sys.argv[1]
EXT = 'Extracto de búsqueda; la página no se pudo abrir (solo WebSearch en este entorno)'

def F(i, titulo, editor, tipo, fecha, url):
    return {"id": i, "titulo": titulo, "editor": editor, "tipo": tipo, "fecha": fecha, "url": url}

def H(seccion, campo, tipo, intentos, decision="Omitido"):
    return {"seccion": seccion, "campo": campo, "tipo": tipo, "intentos": intentos, "decision": decision}

NOTAS = {}
def save(letra, obj):
    NOTAS[letra] = obj

# ---------------- A. Cuentas ----------------
fa = [
 F(1, '2025 Full year results (ventas 7.472 M CHF, EBITDA 1.751 M, beneficio neto 1.071 M, caja libre 1.053 M, deuda neta 3.678 M, dividendo 72 CHF). ' + EXT, 'Givaudan SA', 'Primaria', '2026-01-29', 'https://www.givaudan.com/print/2745501'),
 F(2, '2025 Financial summary (EBITDA 2024 1.765 M, flujo operativo 1.512 M y 1.625 M). ' + EXT, 'Givaudan SA', 'Primaria', '2026-01-29', 'https://www.givaudan.com/files/giv-2025-financial-summary.pdf'),
 F(3, 'Givaudan SA (SWX:GIVN) Income Statement 2021-2025 y LTM jun-26. ' + EXT, 'Stock Analysis', 'Datos de mercado', '2026-10', 'https://stockanalysis.com/quote/swx/GIVN/financials/income-statement/'),
 F(4, '2023 Full year results (EBITDA 1.473 M, 21,3 %; caja libre 920 M). ' + EXT, 'Givaudan SA', 'Primaria', '2024-01-23', 'https://www.givaudan.com/print/2733536'),
 F(5, '2022 Full year results (EBITDA 1.476 M, margen 2021 del 22,2 %; caja libre 479 M en 2022 y 843 M en 2021). ' + EXT, 'Givaudan SA', 'Primaria', '2023-01-24', 'https://givaudan.com/file/1312421/download'),
 F(6, '2026 Half-year results (ventas 3.799 M, +3,6 % comparable; EBITDA ajustado 923 M, 24,3 %; publicado 820 M; no recurrentes 103 M; caja libre ajustada −119 M; deuda neta/EBITDA 2,8; BPA ajustado 60,25 CHF). ' + EXT, 'Givaudan SA', 'Primaria', '2026-07-23', 'https://www.givaudan.com/print/2747956'),
 F(7, '2026 First quarter sales (1.875 M CHF, +2,8 % comparable). ' + EXT, 'Givaudan SA', 'Primaria', '2026-04-14', 'https://www.givaudan.com/print/2746761'),
 F(8, '2026 Nine month sales (5.891 M CHF, +5,2 % comparable, +2,6 % en francos). ' + EXT, 'Givaudan SA', 'Primaria', '2026-10-13', 'https://www.givaudan.com/media/media-releases/2026/2026-nine-month-sales'),
 F(9, 'Givaudan sales beat market view on fine fragrance strength, boosting shares (Reuters: perfumería +13,5 % en el trimestre; consenso 3,9 %). ' + EXT, 'Euronext / Reuters', 'Prensa', '2026-10-13', 'https://live.euronext.com/en/financial-news/givaudan-sales-beat-market-view-fine-fragrance-strength-boosting-shares'),
 F(10, 'Givaudan SA balance sheet (activo total 11.864 M y patrimonio 4.568 M a 31-dic-2025). ' + EXT, 'Fintel (Capital IQ)', 'Datos de mercado', '2026-10', 'https://fintel.io/bs/mx/givn n'),
 F(11, 'Givaudan SA (SWX:GIVN) Balance Sheet (fondo de comercio 4.722 M, existencias 1.425 M, clientes 1.617 M). ' + EXT, 'Stock Analysis', 'Datos de mercado', '2026-10', 'https://stockanalysis.com/quote/swx/GIVN/financials/balance-sheet/'),
 F(12, 'Givaudan H1 Profit, Sales Down; Backs LFL Sales Growth View Ahead. ' + EXT, 'VZ VermögensZentrum (AWP)', 'Prensa', '2026-07-23', 'https://www.vermoegenszentrum.ch/en/stock-exchange-and-markets/news/givaudan-h1-profit-sales-down-backs-lfl-sales-growth-view-ahead'),
 F(13, 'Givaudan keeps 2026-2030 like-for-like sales growth target at 4%-6% (caja libre ajustada > 12 % de las ventas). ' + EXT, 'VZ VermögensZentrum (AWP)', 'Prensa', '2026', 'https://www.vermoegenszentrum.ch/en/stock-exchange-and-markets/news/givaudan-keeps-2026-2030-sales-growth-target-4-6'),
 F(14, 'Givaudan’s Fragrance & Beauty growth offsets weaker first-half profits. ' + EXT, 'Personal Care Insights', 'Prensa', '2026-07', 'https://www.personalcareinsights.com/news/givaudan-fragrance-beauty-results.html'),
 F(15, 'Givaudan SA income statement 2019-2020 (ventas 6.203 y 6.322 M; beneficio neto 702 y 743 M). ' + EXT, 'Stockopedia', 'Datos de mercado', '2026-10', 'https://stockopedia.com/share-prices/givaudan-sa-SWX:GIVN/income-statement'),
 F(16, 'Givaudan Beats Organic Growth Expectations (1T26: Taste & Wellbeing −0,4 %, Fragrance & Beauty +5,9 %). ' + EXT, 'Invezz / Reuters', 'Prensa', '2026-04-14', 'https://invezz.com/en-ae/news/2026/04/14/givaudan-beats-sales-estimates-as-fragrance-demand-lifts-shares/'),
]

def cta(p, ing, ebitda, ebit, bn, bpa, dpa, tipo=15.0):
    bai = round(bn / (1 - tipo / 100))
    imp = bai - bn
    return {"periodo": p, "ingresos": ing, "coste_ventas": None, "gastos_generales": None, "ebitda": ebitda,
            "amortizaciones": ebitda - ebit, "ebit": ebit, "resultado_financiero": bai - ebit, "bai": bai, "impuestos": imp, "minoritarios": 0,
            "beneficio_neto": bn, "gastos_financieros": None, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": None,
            "bpa": bpa, "dpa": dpa, "dpa_extraordinario": 0, "acciones_diluidas": round(bn / bpa, 3)}

cuenta = [
 cta('2021', 6684, 1484, 1089, 821, 88.37, None),
 cta('2022', 7117, 1476, 1112, 856, 92.51, None),
 cta('2023', 6915, 1473, 1116, 893, 96.47, None),
 cta('2024', 7412, 1765, 1394, 1090, 117.63, 70.0),
 cta('2025', 7472, 1751, 1381, 1071, 115.46, 72.0),
]

A = {
 "_estado": "Hecho por el analista principal con búsquedas web (sin WebFetch ni descargas). Faltan impuestos y resultado financiero exactos, balance detallado por años, flujos 2021-2023 y segmentos en cifras: ver huecos.",
 "negocio": {
  "descripcion": "Givaudan es el mayor fabricante mundial de aromas y fragancias. Diseña y produce fragancias para perfumería fina y para productos de consumo (detergentes, higiene, cosmética), ingredientes de fragancia y cosméticos activos (división Fragrance & Beauty), y aromas, sabores e ingredientes nutricionales para alimentación y bebidas (Taste & Wellbeing). Vende a grandes grupos de consumo (Nestlé, Unilever, P&G, L'Oréal, Coca-Cola…) y a clientes locales y regionales, con contratos plurianuales en los que es proveedor homologado (la llamada «core list») [1, 6].",
  "como_gana_dinero": None,
  "segmentos": [
   {"nombre": "Fragrance & Beauty", "descripcion": "Perfumería fina, fragancias de consumo, ingredientes de fragancia y activos cosméticos.", "tipo_resultado": None, "historico": []},
   {"nombre": "Taste & Wellbeing", "descripcion": "Aromas, sabores e ingredientes para alimentación, bebidas y nutrición.", "tipo_resultado": None, "historico": []},
  ],
  "segmentos_nota": "No hemos podido leer las ventas por división en cifras absolutas de 2024-2025. Crecimiento comparable: 2025, Fragrance & Beauty +7,9 % (perfumería fina +18,3 %) y Taste & Wellbeing +2,4 % [1]; 1S26, +6,5 % y +0,5 % [6, 12]; 1T26, +5,9 % y −0,4 % [16]. En el 1T26 Fragrance & Beauty facturó 1.004 M de 1.875 M (≈54 %) [7]. En los nueve meses de 2026 la perfumería del 3T creció un 13,5 % y los sabores de Norteamérica cayeron un 3,3 % [9, 8].",
  "geografias": [],
  "clientes": None,
  "kpis": [
   {"kpi": "Crecimiento comparable del grupo", "valor_anterior": "+5,1 % (2025)", "valor_actual": "+5,2 % (9M26)", "variacion": "Aceleración en el 3T", "comentario": "1T26 +2,8 %, 1S26 +3,6 %, 9M26 +5,2 %: el 3T rondó el +8 % (estimación propia por diferencia) [7, 6, 8]."},
   {"kpi": "Margen EBITDA ajustado", "valor_anterior": "25,2 % (1S25)", "valor_actual": "24,3 % (1S26)", "variacion": "−0,9 puntos", "comentario": "Divisa, costes de materias primas y mezcla [6]."},
   {"kpi": "Caja libre ajustada / ventas", "valor_anterior": "14,1 % (2025)", "valor_actual": "−3,1 % (1S26)", "variacion": "Fuerte caída estacional", "comentario": "Más inversión y capital circulante temporalmente alto [6]; objetivo > 12 % de media 2026-2030 [13]."},
   {"kpi": "Deuda neta / EBITDA", "valor_anterior": "2,1 (dic-25)", "valor_actual": "2,8 (jun-26)", "variacion": "+0,7", "comentario": "Dividendo pagado en marzo y caja libre negativa del semestre [1, 6]."},
  ],
  "confianza": "Media",
 },
 "financieros": {
  "cuenta": cuenta,
  "ltm": {"periodo": "LTM jun-26", "fecha_fin": "2026-06-30", "ingresos": 7407, "ebitda": 1626, "ebit": None, "beneficio_neto": 954, "bpa": 102.70, "dpa": 72.0, "dpa_extraordinario": 0, "fcf": None, "participadas_en_ebitda": None, "no_recurrentes_en_ebitda": 103},
  "cambios_perimetro": [],
  "comentario": None, "ajustes": None,
  "confianza": "Media",
 },
 "trimestres": {
  "items": [
   {"periodo": "1T26", "ingresos": 1875, "crecimiento_pct": None, "crecimiento_organico_pct": 2.8, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": "Superior"},
   {"periodo": "2T26", "ingresos": 1924, "crecimiento_pct": None, "crecimiento_organico_pct": 4.3, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": None},
   {"periodo": "3T26", "ingresos": 2092, "crecimiento_pct": None, "crecimiento_organico_pct": None, "ebitda": None, "margen_ebitda_pct": None, "bpa": None, "vs_consenso": "Superior"},
  ],
  "nota": "1T26: 1.875 M, +2,8 % comparable (consenso 1,9 %) [7, 16]. 2T26 = 1S26 (3.799 M) − 1T26 (estimación propia por diferencia); crecimiento comparable del 2T26 del 4,3 % según el AWP [6]. 3T26 = 9M26 (5.891 M) − 1S26 (estimación propia por diferencia); el crecimiento comparable de los nueve meses fue del 5,2 % frente a un consenso del 3,9 %, así que el del 3T rondó el 8 % (estimación propia) [8, 9]. La cifra de 3T en francos (+11 % implícito frente a 1.878 M del 3T25) no cuadra del todo con una divisa negativa: hay que verificarla con el comunicado.",
  "ultima_presentacion": None,
  "confianza": "Media",
 },
 "balance": {
  "historico": [
     {"periodo": "2025", "activo_total": 11864, "activo_corriente": None, "pasivo_corriente": None, "pasivo_total": 7296, "fondo_comercio": 4722, "intangibles": None, "inmovilizado_material": None, "existencias": None, "clientes": 1617, "proveedores": None, "activos_contrato": None, "pasivos_contrato": None, "caja": 0, "deuda_financiera": 3678, "arrendamientos": 0, "patrimonio_neto": 4568, "minoritarios": 0, "reservas": None},
  ],
  "balance_nota": "Deuda financiera = deuda neta publicada (deuda a corto y largo plazo menos efectivo, definición de la empresa): 3.678 M a dic-25 y 4.002 M a dic-24 [1]; no hemos podido separar deuda bruta y caja (caja = 0 en la tabla). Activo total, pasivo y patrimonio de dic-25 de Fintel (Capital IQ) [10]; fondo de comercio y clientes de Stock Analysis [11]; existencias de dic-24 de la información semestral de 2025 citada por la búsqueda [11]. Junio de 2026: deuda neta/EBITDA de 2,8 [6]; estimamos la deuda neta en ≈4.500 M (3.678 M + dividendo de ≈664 M + caja libre ajustada de −119 M; estimación propia). Minoritarios despreciables.",
  "vencimientos": [],
  "liquidez": "Deuda neta de ≈4.500 M CHF a 30-jun-2026 (estimación propia), 2,8 veces el EBITDA [6].",
  "rating": None,
  "coste_deuda_pct": None, "vida_media_anios": None,
  "otros_pasivos": None, "comentario": None,
  "confianza": "Baja",
 },
 "flujos": {
  "historico": [
   {"periodo": "2024", "flujo_operativo": 1625, "capex": 280, "pagos_arrendamientos": None, "adquisiciones": 0, "desinversiones": 0, "dividendos": 627, "recompras": 0, "emision_acciones": 0, "intereses_en_financiacion": 0},
   {"periodo": "2025", "flujo_operativo": 1512, "capex": 285, "pagos_arrendamientos": None, "adquisiciones": 0, "desinversiones": 0, "dividendos": 646, "recompras": 0, "emision_acciones": 0, "intereses_en_financiacion": 0},
  ],
  "flujos_nota": "Flujo operativo antes de inversiones de 1.512 M (2025) y 1.625 M (2024) [2]; inversión neta en inmovilizado material de 233 M y 223 M más intangibles de 52 M y 57 M (3,8 % de las ventas) [1]. Caja libre publicada (después de intereses y arrendamientos): 843 M (2021), 479 M (2022), 920 M (2023), 1.158 M (2024) y 1.053 M (2025) [5, 4, 1]. Dividendos pagados: dividendo por acción del ejercicio anterior × 9,23 M acciones (estimación propia: 68 CHF en 2024 y 70 CHF en 2025).",
  "comentario": None,
  "confianza": "Media",
 },
 "calidad": None,
 "capital": {"politica": None, "adquisiciones": [], "comentario": None, "confianza": "Media"},
 "fuentes": fa,
 "huecos": [
  H("financieros", "Impuestos, resultado financiero y coste de ventas por año", "Núcleo", "1) informe anual 2025 en PDF (no se puede abrir: solo WebSearch); 2) Stock Analysis (extracto sin esas líneas); 3) resumen financiero de 2025 (sin el dato en el extracto). Se usa un tipo efectivo del 15 % (estimación propia) para separar impuestos."),
  H("balance", "Deuda bruta, caja, existencias y proveedores por año", "Núcleo", "1) resumen financiero del 1S26 (PDF no accesible); 2) Stock Analysis y Fintel (cifras sueltas que no reconcilian); 3) búsqueda de la deuda neta a junio de 2026 (solo el ratio 2,8x)"),
  H("negocio", "Ventas y EBITDA por división en cifras absolutas", "Complemento", "1) informe anual (no accesible); 2) prensa (solo crecimientos); 3) presentación del 1S26 (PDF no accesible)"),
  H("flujos", "Flujo operativo y capex de 2021-2023", "Complemento", "1) comunicados de 2022 y 2023 (solo caja libre en el extracto); 2) Stock Analysis (sin extracto); 3) TipRanks (solo ratios)"),
 ],
}
save('A', A)

# ---------------- B. Sector y competencia ----------------
fb = [
 F(1, 'Global F&F market heads toward 55 billion by 2030 (IAL Consultants: 43.070 M USD en 2025, +4,2 %; aromas 54 %, fragancias 46 %; Givaudan líder destacado, seguido de dsm-firmenich, IFF y Symrise). ' + EXT, 'Perfumer & Flavorist', 'Sectorial', '2026', 'https://www.perfumerflavorist.com/flavor/trends/news/22975125/global-ff-market-heads-toward-55-billion-by-2030'),
 F(2, 'Flavors and Fragrances Market 2026-2034 (34.320 M USD en 2025; crecimiento del 3,0 % anual). ' + EXT, 'IMARC Group', 'Sectorial', '2026', 'https://www.imarcgroup.com/flavors-fragrances-market'),
 F(3, 'Givaudan, Firmenich, IFF e Symrise: o «Santo Graal» das fragrâncias e sabores. ' + EXT, 'InfoMoney', 'Prensa', '2022', 'https://www.infomoney.com.br/?p=1945737'),
 F(4, 'Givaudan Aktie: DSM-Firmenich belastet den Sektor. ' + EXT, 'Börse Express', 'Prensa', '2026', 'https://www.boerse-express.com/news/articles/givaudan-aktie-dsm-firmenich-belastet-den-sektor-913440'),
 F(5, 'Givaudan – riecht es nach Erholung? (análisis del VZ). ' + EXT, 'VZ VermögensZentrum', 'Analistas', '2026', 'https://www.vermoegenszentrum.ch/boersen-und-maerkte/vz-analysen/givaudan-riecht-es-nach-erholung'),
 F(6, 'Givaudan: Perfumery drives nine-month growth. ' + EXT, 'Premium Beauty News', 'Sectorial', '2026-10-13', 'https://www.premiumbeautynews.com/en/givaudan-perfumery-drives-nine,28347'),
]
B = {
 "historia": {
  "resumen": "Givaudan nace en 1895 en Vernier (Ginebra) como fabricante de perfumes de los hermanos Léon y Xavier Givaudan. Fue filial de Roche desde 1963 hasta su escisión y salida a bolsa en la SIX en 2000. Desde entonces ha crecido con compras: la división de aromas de Quest (2007) la hizo número uno del mundo, y entre 2014 y 2021 compró Spicetec, Naturex, Albert Vieille, Fragrance Oils, Drom y otras para entrar en ingredientes naturales y activos cosméticos. Ha subido el dividendo todos los años desde la salida a bolsa (25 subidas seguidas en 2026) [A1, B3].",
  "hitos": [
   {"anio": "1895", "hito": "Fundación en Ginebra por Léon y Xavier Givaudan."},
   {"anio": "2000", "hito": "Escisión de Roche y salida a bolsa en la SIX Swiss Exchange [A1]."},
   {"anio": "2007", "hito": "Compra de Quest International: liderazgo mundial en aromas y fragancias."},
   {"anio": "2018", "hito": "Compra de Naturex (ingredientes naturales)."},
   {"anio": "2025", "hito": "Plan 2030: crecimiento comparable del 4-6 % y caja libre > 12 % de las ventas [A13]."},
   {"anio": "2026", "hito": "Christian Stammkoetter, primer ejecutivo; Gilles Andrier pasa a presidir el consejo [C1]."},
  ],
  "confianza": "Media",
 },
 "negocio": {
  "como_gana_dinero": "Givaudan cobra por fórmulas a medida: el cliente encarga una fragancia o un sabor para un producto concreto y, si el producto se vende, Givaudan suministra el compuesto durante toda su vida comercial. El compuesto es una parte pequeña del coste del producto final (≈1-5 %) pero decide la preferencia del consumidor, así que el cliente rara vez cambia de proveedor a mitad de vida del producto: de ahí márgenes EBITDA del 21-25 % y una caja libre de 12-15 % de las ventas [A1, A4]. Los dos motores son el volumen de consumo de sus clientes y el traslado a precio de los costes de materias primas, con unos meses de retraso.",
 },
 "sector": {
  "definicion": "Mercado mundial de aromas y fragancias (compuestos e ingredientes) vendidos a la industria de alimentación, bebidas, cuidado personal, hogar y perfumería. Cuatro grandes (Givaudan, dsm-firmenich, IFF y Symrise) y una cola de proveedores regionales [1].",
  "tamano": 43070, "unidad_serie": "M USD", "serie": [],
  "tcac_historico_pct": None, "tcac_previsto_pct": 4.2, "cr5_pct": None, "estructura": "Concentrada",
  "drivers": [
   {"driver": "Perfumería fina", "efecto": "+", "horizonte": "Estructural", "evidencia": "Perfumería fina +18,3 % en 2025 y +13,5 % en el 3T26 en Givaudan [A1, A9]."},
   {"driver": "Volumen de los grandes grupos de alimentación", "efecto": "−", "horizonte": "Cíclico", "evidencia": "Taste & Wellbeing +0,5 % en el 1S26; sabores de Norteamérica −3,3 % en nueve meses [A6, A8]."},
   {"driver": "Mercados emergentes", "efecto": "+", "horizonte": "Estructural", "evidencia": "Clientes locales y regionales de alto crecimiento [5]."},
   {"driver": "Costes de materias primas", "efecto": "+/−", "horizonte": "Cíclico", "evidencia": "Inflación de costes de un dígito bajo prevista para el 2S26 [A12]."},
   {"driver": "Investigaciones de competencia", "efecto": "−", "horizonte": "Regulatorio", "evidencia": "Acuerdos y provisiones de litigios en los no recurrentes del 1S26 (103 M) [A6]."},
  ],
  "porter": [
   {"fuerza": "Rivalidad", "intensidad": 3, "justificacion": "Oligopolio de cuatro con competencia por los encargos de los grandes clientes [1]."},
   {"fuerza": "Poder de los clientes", "intensidad": 3, "justificacion": "Grandes grupos de consumo con listas cortas de proveedores, pero el coste de cambiar una fórmula ya lanzada es alto [A1]."},
   {"fuerza": "Poder de los proveedores", "intensidad": 2, "justificacion": "Materias primas naturales y petroquímicas dispersas; Givaudan integra parte de los naturales."},
   {"fuerza": "Amenaza de entrada", "intensidad": 1, "justificacion": "Bibliotecas de moléculas, regulación y relación con clientes: no ha entrado nadie relevante en décadas."},
   {"fuerza": "Amenaza de sustitutos", "intensidad": 1, "justificacion": "No hay sustituto para el aroma o el sabor de un producto de consumo."},
  ],
  "ciclo": {"posicion": "Expansión", "comentario": "Tras el ajuste de inventarios de 2022-2023, el sector volvió a crecer en 2024-2025. En 2026 la perfumería tira y la alimentación está floja en Norteamérica [A8, A9]."},
  "regulacion": None, "tendencias": None,
  "confianza": "Media",
 },
 "competencia": {
  "cuota_pct": 21.0,
  "posicion": "Número uno mundial por ventas, con ventaja clara sobre dsm-firmenich, IFF y Symrise [1].",
  "competidores": [
   {"nombre": "dsm-firmenich", "pais": "Suiza / Países Bajos", "ticker": "DSFIR", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Número dos; Firmenich se fusionó con DSM en 2023; cotiza también en la SIX [4]."},
   {"nombre": "IFF", "pais": "EE. UU.", "ticker": "IFF", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Número tres; endeudada tras la compra de Frutarom y DuPont N&B [D5]."},
   {"nombre": "Symrise", "pais": "Alemania", "ticker": "SY1", "ingresos": None, "cuota_pct": None, "margen_ebit_pct": None, "comentario": "Número cuatro; fuerte en nutrición animal y sabores [D4]."},
  ],
  "foso": {"veredicto": "Amplio", "tendencia": "Estable", "fuentes": [
   {"fuente": "Efectos de red", "puntuacion": 1, "evidencia": "No aplica."},
   {"fuente": "Costes de cambio", "puntuacion": 5, "evidencia": "La fórmula va unida al producto durante toda su vida; cambiarla arriesga la preferencia del consumidor."},
   {"fuente": "Intangibles (marca, patentes, licencias)", "puntuacion": 4, "evidencia": "Biblioteca de moléculas y perfumistas; 25 años de dividendo creciente [A1]."},
   {"fuente": "Ventaja en costes", "puntuacion": 3, "evidencia": "Escala de compras de materias primas; margen EBITDA del 23-24 % frente a 18-22 % de sus rivales [D4]."},
   {"fuente": "Escala eficiente", "puntuacion": 4, "evidencia": "Cuatro grandes reparten casi todo el mercado de los grandes clientes [1]."},
  ]},
  "amenazas": None,
  "confianza": "Media",
 },
 "esg": None,
 "fuentes": fb,
 "huecos": [
  H("competencia", "Cuota de mercado publicada", "Complemento", "1) IAL Consultants (sin cifras por empresa en el extracto); 2) IMARC (sin cuotas); 3) informe anual (no accesible). Cuota estimada con ventas / mercado de IAL (estimación propia)."),
  H("esg", "Calificaciones ESG", "Complemento", "1) informe integrado (no accesible); 2) MSCI y Sustainalytics (sin extracto); 3) no se buscó más por presupuesto compartido de búsquedas"),
 ],
}
save('B', B)

# ---------------- C. Equipo y gobierno ----------------
fc = [
 F(1, 'Givaudan announces Chief Executive Officer and Chairman succession plans (Stammkoetter CEO desde el 1-mar-2026; Andrier propuesto como presidente en la junta del 19-mar-2026, sustituye a Calvin Grieder). ' + EXT, 'Givaudan SA', 'Primaria', '2025-08-27', 'https://www.givaudan.com/print/2741431'),
 F(2, 'Christian Stammkoetter, new CEO of Givaudan from March 1, 2026 (antes presidente de Asia, Oriente Medio y África de Danone). ' + EXT, 'Industries Cosmétiques', 'Prensa', '2025-08', 'https://www.industries-cosmetiques.fr/en/christian-stammkoetter-new-givaudan-general-manager-from-march-1-2026'),
 F(3, 'Fragrance Maker Givaudan Names New CEO, Unveils 2030 Growth Strategy. ' + EXT, 'ESM Magazine', 'Prensa', '2025', 'https://www.esmmagazine.com/supply-chain/fragrance-maker-givaudan-names-new-ceo-unveils-2030-growth-strategy-295083'),
]
C = {
 "directivos": {
  "equipo": [
   {"nombre": "Christian Stammkoetter", "cargo": "Primer ejecutivo (CEO)", "desde": "2026", "participacion_pct": None, "trayectoria": "Viene de Danone, donde presidía Asia, Oriente Medio y África [C2]."},
   {"nombre": "Gilles Andrier", "cargo": "Presidente del consejo", "desde": "2026", "participacion_pct": None, "trayectoria": "Primer ejecutivo durante unos 20 años (2005-2026); presidente desde la junta de marzo de 2026 [1]."},
  ],
  "historial_guidance": [
   {"anio": "2021-2025", "guia": "Crecimiento comparable del 4-5 % y caja libre del 12-17 % de las ventas (plan 2025)", "real": "Crecimiento medio por encima del 5 % y caja libre del 6,7-15,6 %", "cumplida": "Parcial"},
   {"anio": "2026", "guia": "Crecimiento comparable del 4-6 % de media 2026-2030 (sin guía anual)", "real": "+5,2 % en nueve meses", "cumplida": "Sí"},
  ],
  "comentario": None,
  "confianza": "Media",
 },
 "gobierno": {
  "consejo": [
   {"nombre": "Gilles Andrier", "cargo": "Presidente", "tipo": "No independiente", "desde": "2026", "comisiones": None},
  ],
  "presidente_ceo_separados": True, "presidente_ejecutivo": False, "consejero_coordinador": None, "una_accion_un_voto": True,
  "operaciones_vinculadas_relevantes": False, "variable_ligado_rentabilidad": None, "auditoria_independiente": None, "insiders_sin_operaciones": None,
  "accionista_control": False, "presidente_vinculado_control": False, "cambios_cupula_24m": 2,
  "voto_remuneracion_pct": None, "voto_remuneracion_contra_pct": None, "voto_remuneracion_contra_libre_pct": None, "voto_cupula_pct": None,
  "remuneracion_ceo": None, "remuneracion": None,
  "accionistas": [],
  "insiders": [],
  "control_y_defensas": "Capital disperso, una acción un voto; sin accionista de control conocido en las fuentes disponibles. El antiguo primer ejecutivo preside el consejo desde marzo de 2026, algo que los códigos de buen gobierno desaconsejan porque reduce la independencia de la supervisión del nuevo equipo [1].",
  "alertas": ["El ex primer ejecutivo pasa a presidente del consejo (marzo de 2026) [1].", "Investigaciones de competencia en el sector de fragancias (Europa, EE. UU., Reino Unido, Suiza): acuerdos y provisiones dentro de los 103 M de no recurrentes del 1S26 [A6]."],
  "confianza": "Baja",
 },
 "fuentes": fc,
 "huecos": [
  H("gobierno", "Composición del consejo, remuneración, votos de la junta y accionistas significativos", "Núcleo", "1) informe de remuneraciones y de gobierno (PDF no accesible); 2) API de participaciones de la SIX (sin red); 3) búsqueda de resultados de la junta del 19-mar-2026 (sin extracto)"),
 ],
}
save('C', C)

# ---------------- D. Mercado y valoración ----------------
fd = [
 F(1, 'Givaudan’s organic sales growth beats market view on fragrance strength / Why is Givaudan stock surging today (la acción sube ≈6,5-7 % y llega a 3.714 CHF el 13-oct-2026). ' + EXT, 'MarketScreener / Investing.com (Reuters)', 'Prensa', '2026-10-13', 'https://www.marketscreener.com/news/givaudan-s-organic-sales-growth-beats-market-view-on-fragrance-strength-ce785dddda8ff72c'),
 F(2, 'Givaudan SA valuation: PER anual 2020-2025 (46,6x; 54,2x; 30,6x; 36,1x; 33,7x; 27,1x) y BPA estimado 2026-2028 (115,3; 126,1; 133,4 CHF). ' + EXT, 'MarketScreener', 'Analistas', '2026', 'https://www.marketscreener.com/quote/stock/GIVAUDAN-SA-2956033/valuation/'),
 F(3, 'Givaudan SA quotes (cierre de 3.422 CHF el 17-jul-2026, +8,8 % en el año). ' + EXT, 'MarketScreener', 'Datos de mercado', '2026-07-17', 'https://in.marketscreener.com/quote/stock/GIVAUDAN-SA-2956033/quotes/'),
 F(4, 'Symrise y Kerry: PER de los próximos 12 meses (21,1x y 17,5x) recogidos en el informe de Viscofan del 6-oct-2026 de este repositorio', 'Repositorio analisis-inversion', 'Datos de mercado', '2026-10-06', 'informes/viscofan-2026-10-06/datos.json'),
 F(5, 'IFF: PER adelantado 15,5-17,5x (julio de 2026). ' + EXT, 'StockHub / Yahoo Finance', 'Datos de mercado', '2026-07', 'https://www.stockhub.kr/en/stock/IFF'),
 F(6, 'DSM-Firmenich (DSFIR): PER adelantado 20,9x (16-sep-2026). ' + EXT, 'Yahoo Finance', 'Datos de mercado', '2026-09-16', 'https://finance.yahoo.com/quote/DSMFF'),
 F(7, 'Givaudan (SWX:GIVN) after half-year results: 19 analistas, BPA de 2026 ≈113 CHF y objetivo medio ≈3.461 CHF (4.500 máximo, 2.800 mínimo). ' + EXT, 'Simply Wall St (vía Webull)', 'Analistas', '2026-07', 'https://www.webull.com/news/15292306654241792'),
 F(8, 'Analyst düpiert SMI-Titel kurz vor Zahlenupdate mit Herunterstufung (ZKB: valor razonable 3.968 CHF; PER ajustado 26,7x frente a una media de 10 años de 35,7x). ' + EXT, 'cash.ch', 'Analistas', '2026-10', 'https://www.cash.ch/news/top-news/analyst-dupiert-smi-titel-kurz-vor-zahlenupdate-mit-herunterstufung-975891'),
 F(9, 'Givaudan price target raised to CHF 3,800 from CHF 3,700 at JPMorgan (neutral). ' + EXT, 'TipRanks (The Fly)', 'Analistas', '2026', 'https://www.tipranks.com/news/the-fly/givaudan-price-target-raised-to-chf-3800-from-chf-3700-at-jpmorgan'),
 F(10, 'Bono de la Confederación a 10 años (0,54 % el 8-oct-2026), tomado del informe de Roche del 14-oct-2026 de este repositorio', 'Repositorio analisis-inversion (SNB)', 'Primaria', '2026-10-08', 'informes/roche-2026-10-14/datos.json'),
 F(11, 'ERPbymonth.xlsx (prima implícita del S&P 500, octubre de 2026: 4,20 %)', 'Aswath Damodaran (NYU Stern)', 'Datos de mercado', '2026-10', 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx'),
 F(12, 'ROUNDUP: Givaudan überrascht trotz Umsatzrückgang positiv (la acción a ≈2.942 CHF el 14-abr-2026, un 6 % por debajo del inicio de año). ' + EXT, 'extraETF (dpa-AFX)', 'Prensa', '2026-04-14', 'https://extraetf.com/de/news/dpa-afx/roundup-givaudan-uberrascht-trotz-umsatzruckgang-positiv-aktie-legt-zu--1776161429-04494-1776161428252'),
 F(13, 'Ausblick: Givaudan-Wachstum dürfte im dritten Quartal an Fahrt gewinnen (consenso AWP de 9M26: 5.783 M; 3T26 +4,7 %; resultados el 13-oct). ' + EXT, 'cash.ch (AWP)', 'Analistas', '2026-10', 'https://www.cash.ch/news/ausblick-givaudan-wachstum-durfte-im-dritten-quartal-an-fahrt-gewinnen-975980'),
 F(14, 'Givaudan reports CHF 5.89 billion sales: target for Givaudan stock is CHF 3,850. ' + EXT, 'ad-hoc-news', 'Prensa', '2026-10-13', 'https://www.ad-hoc-news.de/boerse/news/corporate-news/givaudan-reports-chf-5-89-billion-sales-target-for-givaudan-stock-is-chf-3-850/70322204'),
]
# Precios de cierre anuales = PER anual de MarketScreener × BPA diluido de Stock Analysis (estimación propia).
D_ = {
 "identificacion": {
  "nombre": "Givaudan SA", "nombre_corto": "Givaudan", "ticker": "GIVN", "isin": "CH0010645932", "mercado": "SIX Swiss Exchange", "indice_referencia": "SMI",
  "pais": "Suiza", "pais_iso": "CH", "sector": "Materiales", "industria": "Productos químicos especiales (aromas y fragancias)", "sede": "Vernier (Ginebra), Suiza", "fundacion": "1895", "empleados": None, "web": "www.givaudan.com",
  "precio": 3714, "fecha_precio": "2026-10-13", "acciones": 9.226, "capitalizacion_publicada": None, "free_float_pct": None,
  "max_52s": 3714, "min_52s": None, "volumen_medio_diario": None, "proximos_resultados": "2027-01-28",
 },
 "consenso": {
  "guidance": None,
  "estimaciones": [
   {"periodo": "2026e", "ingresos": 7541, "ebitda": None, "ebit": None, "bpa": 115.3, "dpa": None, "fuente": "MarketScreener [2]"},
   {"periodo": "2027e", "ingresos": 7893, "ebitda": None, "ebit": None, "bpa": 126.1, "dpa": None, "fuente": "MarketScreener [2]"},
   {"periodo": "2028e", "ingresos": 8248, "ebitda": None, "ebit": None, "bpa": 133.4, "dpa": None, "fuente": "MarketScreener [2]"},
  ],
  "recomendaciones": {"n_analistas": 19, "comprar": None, "mantener": None, "vender": None, "po_medio": 3461, "po_min": 2800, "po_max": 4500},
  "revisiones": None,
  "base_ebitda": "NIIF", "ajuste_ebitda_pct_ventas": None,
  "confianza": "Baja",
 },
 "bolsa": None,
 "multiplos_historicos": {
  "serie": [
   {"anio": "2020", "precio_cierre": 3755, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": True},
   {"anio": "2021", "precio_cierre": 4790, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": True},
   {"anio": "2022", "precio_cierre": 2831, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2023", "precio_cierre": 3483, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2024", "precio_cierre": 3964, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
   {"anio": "2025", "precio_cierre": 3129, "ev_ebitda_ntm": None, "per_ntm": None, "excluir": False},
  ],
  "comentario": None,
  "confianza": "Baja",
 },
 "comparables": {
  "criterio": None,
  "empresas": [
   {"nombre": "Symrise", "ticker": "SY1", "pais": "DE", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": 12.4, "per_ntm": 21.1, "crecimiento_pct": 5.6, "margen_ebitda_pct": 21.9, "roic_pct": 7.02, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "DSM-Firmenich", "ticker": "DSFIR", "pais": "CH", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 20.9, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "IFF", "ticker": "IFF", "pais": "US", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": None, "per_ntm": 16.5, "crecimiento_pct": None, "margen_ebitda_pct": None, "roic_pct": None, "dn_ebitda": None, "fcf_yield_pct": None},
   {"nombre": "Kerry Group", "ticker": "KRZ", "pais": "IE", "capitalizacion": None, "ev_ventas": None, "ev_ebitda_ltm": None, "ev_ebitda_ntm": 11.9, "per_ntm": 17.5, "crecimiento_pct": 4.9, "margen_ebitda_pct": 17.9, "roic_pct": 9.35, "dn_ebitda": None, "fcf_yield_pct": None},
  ],
  "comentario": None,
  "confianza": "Baja",
 },
 "transacciones": None,
 "fuentes": fd,
 "huecos": [
  H("identificacion", "Precio de cierre del 13 y del 14-oct-2026 y rango de 52 semanas", "Núcleo", "1) bolsa.mjs sin red; 2) búsquedas de cierre en alemán e inglés (precios sin fecha, de 2.786 a 3.393 CHF); 3) prensa del 13-oct (máximo de la sesión, 3.714 CHF, que usamos como precio)"),
  H("bolsa", "Rentabilidades, beta, volatilidad y caída máxima", "Complemento", "1) bolsa.mjs sin red; 2) búsqueda de beta (sin extracto); 3) históricos de MarketScreener (solo cierres sueltos)"),
  H("transacciones", "Operaciones comparables en aromas y fragancias", "Complemento", "1) no buscado por presupuesto de búsquedas compartido; 2) fusión DSM-Firmenich (2023) sin múltiplo en las fuentes; 3) compras de IFF (Frutarom) sin múltiplo en extracto"),
  H("comparables", "Sensient, Novonesis y Croda (PER de los próximos 12 meses)", "Complemento", "1) búsqueda conjunta de PER adelantado (sin datos); 2) informes del repositorio (no los tienen); 3) Yahoo (sin extracto)"),
 ],
}
save('D', D_)

# ---------------- E. Sentimiento ----------------
fe = [
 F(1, 'Givaudan (SWX:GIVN) Following Weaker Half Year Results: Is Its Valuation Still Compelling? (narrativa más seguida de la comunidad: valor razonable 3.468 CHF). ' + EXT, 'Simply Wall St (vía Webull)', 'Foros y redes', '2026-08', 'https://www.webull.com/news/15303088664421376'),
 F(2, '10 analysts remain moderately optimistic on Givaudan (narrativa de la comunidad). ' + EXT, 'Simply Wall St Community', 'Foros y redes', '2026', 'https://simplywall.st/community/narratives/ch/materials/vtx-givn/givaudan-shares/kpm2mi6l-emerging-markets-and-sustainable-ingredients-will-drive-future-expansion-jn74/updates/10-analysts-remain-moderately-optimistic-on-givaudan-citing-lo'),
 F(3, 'Givaudan Aktie: 3,64 Prozent Minus nach Analystenwarnungen. ' + EXT, 'Börse Express', 'Foros y redes', '2026', 'https://www.boerse-express.com/news/articles/givaudan-aktie-364-prozent-minus-nach-analystenwarnungen-909527'),
 F(4, 'Givaudan Dividende und Kursziel (la mayoría de analistas recomienda comprar; potencial medio ≈1 %). ' + EXT, 'aktien.guide', 'Foros y redes', '2026-07', 'https://aktien.guide/kursziel/Givaudan-CH0010645932'),
 F(5, 'Givaudan-Forum (hilo de particulares «Das Übliche: Kurssturz trotz Gewinnsprung»). ' + EXT, 'finanzen.net Forum', 'Foros y redes', '2026', 'https://forum.finanzen.net/forum/2024-t545128'),
 F(6, 'Givaudan sales beat market view on fine fragrance strength, boosting shares (mejor valor del STOXX 600 el 13-oct). ' + EXT, 'Euronext / Reuters', 'Prensa', '2026-10-13', 'https://live.euronext.com/en/financial-news/givaudan-sales-beat-market-view-fine-fragrance-strength-boosting-shares'),
]
E = {
 "sentimiento": {
  "tono": "Positivo", "tendencia": "Mejorando",
  "revisadas": [
   {"plataforma": "Simply Wall St (narrativas de la comunidad)", "fecha": "2026-08", "n_comentarios": None, "tono": "Dividido", "resumen": "Tras el semestre flojo, la narrativa más seguida veía la acción algo por debajo de su valor (≈3.468 CHF) pero preocupada por la caída del margen neto y la caja libre negativa [1, 2]."},
   {"plataforma": "Börse Express y aktien.guide (portales para particulares)", "fecha": "2026-07", "n_comentarios": None, "tono": "Dividido", "resumen": "Caídas tras avisos de analistas en verano; la mayoría recomienda comprar pero con poco potencial frente a los objetivos [3, 4]."},
   {"plataforma": "Foro de finanzen.net", "fecha": "2026", "n_comentarios": None, "tono": "Neutro", "resumen": "Los particulares discuten que la acción cae aun con buenos números: lo que manda es el múltiplo [5]."},
   {"plataforma": "Prensa económica tras los nueve meses", "fecha": "2026-10-13", "n_comentarios": None, "tono": "Positivo", "resumen": "Mejor valor del STOXX 600 el día de las ventas de nueve meses: la perfumería fina vuelve a tirar [6]."},
  ],
  "temas": [
   {"tema": "¿Vuelve el crecimiento al 4-6 %?", "postura": "Alcista", "peso": "Alto", "contraste": "Sí en nueve meses (+5,2 %) tras un 1S26 del 3,6 % [A8, A6]."},
   {"tema": "Margen y caja libre del 1S26", "postura": "Bajista", "peso": "Medio", "contraste": "Margen EBITDA ajustado −0,9 puntos y caja libre ajustada de −119 M [A6]."},
   {"tema": "Valoración frente a la historia", "postura": "Alcista", "peso": "Medio", "contraste": "PER de ≈29x nuestro BPA de 2027e frente a 30-36x de 2022-2024, pero por encima de los comparables (≈19x) [D2]."},
   {"tema": "Investigaciones de competencia", "postura": "Bajista", "peso": "Bajo", "contraste": "Provisiones y acuerdos en el 1S26, sin cifra separada [A6]."},
  ],
  "lectura": None,
  "confianza": "Baja",
 },
 "fuentes": fe,
 "huecos": [
  H("sentimiento", "Hilos de Reddit, Stocktwits, Seeking Alpha y foro de cash.ch de los últimos tres meses", "Complemento", "1) búsqueda en inglés de Reddit y Seeking Alpha (sin hilos); 2) búsqueda en alemán de foros de cash.ch y finanzen.net (sin comentarios fechados); 3) API de Stocktwits (sin acceso: solo WebSearch)"),
 ],
}
save('E', E)

def fix(letra, obj):
    fu = obj['fuentes']
    glob = {L: {str(f['id']): f for f in NOTAS[L]['fuentes']} for L in NOTAS}
    extra = {}
    def local(L, n):
        if L == letra: return n
        key = L + n
        if key not in extra:
            f = dict(glob[L][n]); f['id'] = len(fu) + 1; fu.append(f); extra[key] = str(f['id'])
        return extra[key]
    def rep(m):
        cur = letra; out = []
        for t in re.split(r'\s*,\s*', m.group(1)):
            mm = re.match(r'^([A-E])?(\d+)$', t)
            if not mm: return m.group(0)
            if mm.group(1): cur = mm.group(1)
            out.append(local(cur, mm.group(2)))
        return '[' + ', '.join(out) + ']'
    def walk(x, top=False):
        if isinstance(x, str): return re.sub(r'\[((?:[A-E]?\d+)(?:\s*,\s*[A-E]?\d+)*)\]', rep, x)
        if isinstance(x, list): return [walk(i) for i in x]
        if isinstance(x, dict): return {k: (v if (top and k == 'fuentes') else walk(v)) for k, v in x.items()}
        return x
    return walk(obj, True)
for L in list(NOTAS):
    o = fix(L, NOTAS[L])
    with open(os.path.join(D, L + '.json'), 'w', encoding='utf-8') as f:
        json.dump(o, f, ensure_ascii=False, indent=1)
print('ok')

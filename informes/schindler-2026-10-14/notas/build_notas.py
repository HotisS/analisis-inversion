# Construye las notas A-E de Schindler (corte 2026-10-14) con lo leído en los resultados de búsqueda (solo WebSearch en la nube).
# Cada nota lleva su propia lista de fuentes numerada desde 1; las citas se escriben {clave} y se traducen a [n].
import json, re, os

D = os.path.dirname(os.path.abspath(__file__))
X = ' Extracto de búsqueda; la página no se pudo abrir (solo WebSearch en este entorno).'

F = {
 'h1_26': ('Schindler: Continued margin expansion (resultados del 1S26: pedidos 5.794 M, ventas 5.329 M, EBIT 706 M, 13,2 %; ajustado 13,5 %; beneficio 542 M; flujo operativo 617 M).' + X, 'Schindler Holding (MarketScreener)', 'Primaria', '2026-07-21', 'https://uk.marketscreener.com/news/continued-margin-expansion-ce7f51dbde89f62c'),
 'h1_quartr': ('Schindler (SCHN) Q2 2026 earnings summary (cartera 8.410 M, +7,7 %; guía 2026; inflación de costes 35 M y aranceles 15 M).' + X, 'Quartr', 'Prensa', '2026-07-21', 'https://quartr.com/events/schindler-holding-ag-schn-q2-2026_oqgDf4x4'),
 'h1_vz': ('Schindler Holding H1 net attributable profit rises; backs FY26 outlook (beneficio atribuido 514 M, BPA 4,82 CHF).' + X, 'Vermögenszentrum (Dow Jones)', 'Prensa', '2026-07-21', 'https://www.vermoegenszentrum.ch/en/stock-exchange-and-markets/news/schindler-holding-h1-net-attributable-profit-rises-backs-fy26'),
 'h1_bw': ('Schindler reports slight decline in the second quarter (ventas del 2T26 2.740 M, −0,7 %).' + X, 'blue News (AWP)', 'Prensa', '2026-07-21', 'https://www.bluewin.ch/en/news/schindler-reports-slight-decline-in-the-second-quarter-li.3536146'),
 'h1_caida': ('Schindler-Aktien brechen nach Zahlen ein (PS −4,8 % a 256,60 CHF el 21-jul).' + X, 'Vermögenszentrum (AWP)', 'Prensa', '2026-07-21', 'https://www.vermoegenszentrum.ch/boersen-und-maerkte/news/schindler-aktien-brechen-nach-zahlen-ein'),
 'fy25_cash': ('Schindler: Gewinn nimmt Lift nach oben, Aktie rauscht in Keller (beneficio 1.073 M, EBIT 1.384 M, dividendo 6,00 + 0,80 CHF).' + X, 'cash.ch', 'Prensa', '2026-02-11', 'https://www.cash.ch/news/schindler-gewinn-nimmt-lift-nach-oben-aktie-rauscht-in-keller-907859'),
 'fy25_swi': ('Schindler voit son bénéfice net augmenter en 2025 (ventas 10.947 M, −2,6 %; EBIT +9,3 %).' + X, 'Swissinfo (Keystone-ATS)', 'Prensa', '2026-02-11', 'https://www.swissinfo.ch/fre/schindler-voit-son-b%c3%a9n%c3%a9fice-net-augmenter-en-2025/90924401'),
 'fy25_bw': ('Schindler significantly increases profit last year (pedidos 11.313 M; margen ajustado 13,3 %; flujo operativo 1.490 M; guía 2026).' + X, 'blue News (AWP)', 'Prensa', '2026-02-11', 'https://www.bluewin.ch/en/news/schindler-significantly-increases-profit-last-year-li.3091759'),
 'cf25': ('Consolidated cash flow statement 2025 (dividendos 643 M; autocartera 231 M; arrendamientos 160 M; minoritarios 158 M).' + X, 'Schindler Holding (Annual Report 2025)', 'Primaria', '2026-02-11', 'https://reports.schindler.com/en/2025/report/financial-statements/consolidated-financial-statements/consolidated-cash-flow-statement'),
 'fy24': ('Schindler Holding AG: Foundations for profitable growth (2024: ventas 11.236 M, EBIT 1.266 M, 11,3 %; ajustado 12,0 %; beneficio 1.010 M; dividendo 6,00 CHF, payout 68 %).' + X, 'Schindler Holding (finanzen.ch)', 'Primaria', '2025-02-12', 'https://script.finanzen.ch/nachrichten/aktien/foundations-for-profitable-growth-1034345310'),
 'fy24_bw': ('Schindler further increases profit in 2024 (dividendo 2023 de 5,00 CHF con 1,00 de aniversario).' + X, 'blue News (AWP)', 'Prensa', '2025-02-12', 'https://www.bluewin.ch/en/news/schindler-further-increases-profit-in-li.2556815'),
 'eps21': ('Note 22 Equity and earnings per share (2020: beneficio atribuido 722 M, BPA diluido 6,71 CHF; 107,5 M de acciones y PS).' + X, 'Schindler Holding (Annual Report 2021)', 'Primaria', '2022-02', 'https://reports.schindler.com/en/2021/report/financial-statements/consolidated-financial-statements/notes-to-the-consolidated-financial-statements/22-equity-and-earnings-per-share'),
 'lift20': ('LIFTjournal 2-2021 (beneficio neto 2020 de 774 M frente a 929 M en 2019).' + X, 'LIFTjournal', 'Prensa', '2021-03', 'https://flippingbook.verlagsanstalt-handwerk.de/lift-journal/2021/lift_0221fb/29'),
 'rp24': ('Note 26 Related parties (familias Schindler y Bonnard: 46.640.198 nominativas, 69,5 % de los votos a 31-dic-2024).' + X, 'Schindler Holding (Annual Report 2024)', 'Primaria', '2025-02', 'https://reports.schindler.com/en/2024/report/financial-statements/consolidated-financial-statements/notes-to-the-consolidated-financial-statements/26-related-parties'),
 'rp21': ('Note 25 Related parties (pacto de accionistas de las familias; 69,2 % de los votos en 2021).' + X, 'Schindler Holding (Annual Report 2021)', 'Primaria', '2022-02', 'https://reports.schindler.com/en/2021/report/financial-statements/consolidated-financial-statements/notes-to-the-consolidated-financial-statements/25-related-parties'),
 'bs21': ('Consolidated balance sheet 2021 (activo total 11.974 M; activos financieros corrientes 976 M).' + X, 'Schindler Holding (Annual Report 2021)', 'Primaria', '2022-02', 'https://reports.schindler.com/en/2021/report/financial-statements/consolidated-financial-statements/consolidated-balance-sheet'),
 'buyback': ('Schindler Holding Ltd. increases ongoing share buyback program to up to CHF 700 million (18-jun-2026; acaba como tarde en nov-2026; amortización en la próxima junta).' + X, 'Schindler Holding (gettex)', 'Primaria', '2026-06-18', 'https://www.gettex.de/en/news-overview/newsdetail/schindler-holding-ltd-increases-ongoing-share-buyback-program-to-up-to-chf-700-million/'),
 'sa_is': ('Schindler Holding AG (SWX:SCHN) Income statement (ventas, resultado de explotación y beneficio 2021-2025).' + X, 'Stock Analysis', 'Datos de mercado', '2026-08', 'https://stockanalysis.com/quote/swx/SCHN/financials/income-statement/'),
 'sa_bs': ('Schindler Holding AG (SWX:SCHN) Balance sheet (caja, inversiones a corto, deuda, patrimonio 2021-2025 y jun-2026).' + X, 'Stock Analysis', 'Datos de mercado', '2026-08', 'https://stockanalysis.com/quote/swx/SCHN/financials/balance-sheet/'),
 'sa_cf': ('Schindler Holding AG (SWX:SCHN) Cash flow statement (flujo operativo y capex 2021-2025; FCF 2025 1.385 M).' + X, 'Stock Analysis', 'Datos de mercado', '2026-08', 'https://stockanalysis.com/quote/swx/SCHN/financials/cash-flow-statement/'),
 'tipr': ('Schindler (CH:SCHP) income statement (BPA diluido 2021-2024; amortizaciones 2023-2024).' + X, 'TipRanks', 'Datos de mercado', '2026', 'https://www.tipranks.com/stocks/ch:schp/financials/income-statement'),
 'roic': ('Schindler Holding AG (SHLRF) – BPA 2025 de 9,48 CHF.' + X, 'roic.ai', 'Datos de mercado', '2026', 'https://www.roic.ai/quote/SHLRF'),
 'inv_hist': ('Schindler Ps (SCHP) historical data (cierre de 260,40 CHF el 2-oct-2026).' + X, 'Investing.com', 'Datos de mercado', '2026-10-02', 'https://www.investing.com/equities/schindler-ps-historical-data'),
 'gs_sell': ('Goldman Sachs stuft Schindler-Aktie auf Sell ab und senkt Kursziel auf 233 CHF (7-sep-2026; −16,45 % en el año a 267,20).' + X, 'goldesel.de', 'Analistas', '2026-09-07', 'https://goldesel.de/aktien/news/goldman-sachs-stuft-schindler-aktie-auf-sell-ab-und-senkt-kursziel-auf-233-chf'),
 'gs_sell2': ('Schindler-Aktie: Goldman Sachs stuft auf Sell ab (día del inversor movido al 19-nov-2026).' + X, 'goldesel.de', 'Analistas', '2026-09-07', 'https://goldesel.de/aktien/news/schindler-aktie-goldman-sachs-stuft-auf-sell-ab-und-senkt-kursziel-auf-233-chf'),
 'gs_up': ('Goldman Sachs stuft SCHP von Sell auf Neutral hoch, Kursziel 272 CHF (10-abr-2026).' + X, 'goldesel.de', 'Analistas', '2026-04-10', 'https://goldesel.de/aktien/news/schindler-aktie-goldman-sachs-stuft-schp-von-sell-auf-neutral-hoch-und-erhoht-kursziel-auf-272-chf'),
 'gold_h1': ('Schindler steigert Halbjahresmargen (PS a 288,2 el 20-jul-2026, casi −10 % en el año).' + X, 'goldesel.de', 'Prensa', '2026-07-21', 'https://goldesel.de/aktien/news/schindler-steigert-halbjahresmargen-ebit-marge-132-und-gewinn-542-mio-chf-guidance-bestatigt'),
 'cash_po': ('Schindler PS – Kursziele (3 analistas AWP: media 309,33, mín. 273, máx. 333 CHF; 31-jul-2026).' + X, 'cash.ch', 'Analistas', '2026-07-31', 'https://www.cash.ch/aktien/schindler-holding-ag-n-2463821'),
 'aguide': ('Schindler CH0024638196 Kursziel (24 analistas: 11 comprar, 13 mantener; objetivo medio ≈298 CHF).' + X, 'aktien.guide', 'Analistas', '2026-09', 'https://aktien.guide/kursziel/Schindler-CH0024638196'),
 'ms_fin': ('Schindler Holding AG – finances (consenso: beneficio 1.080 / 1.170 / 1.250 M en 2026-2028; margen EBIT 13,5 / 13,8 / 14,1 %).' + X, 'MarketScreener', 'Analistas', '2026-09', 'https://uk.marketscreener.com/quote/stock/SCHINDLER-HOLDING-AG-41754375/finances/'),
 'webull': ('Analysts update Schindler models after H1 2026 (BPA 2026e ≈10,03 CHF; antes 10,12 con ventas de 11.100 M).' + X, 'Simply Wall St (Webull)', 'Analistas', '2026-07', 'https://www.webull.com/news/15280368606340096'),
 'ws_pe': ('Schindler Holding AG (SHLAF) – PE ratio anual (2019 30,35; 2020 35,71; 2021 32,10; 2022 30,64; 2023 25,09).' + X, 'Wisesheets', 'Datos de mercado', '2026', 'https://wisesheets.io/pe-ratio/SHLAF'),
 'cmc_pe': ('Schindler Group (SCHN.SW) – P/E ratio history (2024 27,4; 2025 29,7).' + X, 'companiesmarketcap', 'Datos de mercado', '2026', 'https://companiesmarketcap.com/schindler-group/pe-ratio/'),
 'ps_profile': ('SCHP – perfil del valor (≈40,7 M de PS de 0,10 CHF nominales, sin voto).' + X, 'SIX (graph.swiss)', 'Datos de mercado', '2026', 'https://demo.graph.swiss/profile/XSWX/SCHP'),
 'tradeideas': ('SHLRF stock info (11-oct-2026; próximos resultados 22-oct-2026).' + X, 'Trade-Ideas', 'Datos de mercado', '2026-10-11', 'https://www.trade-ideas.com/stock-info/SHLRF/'),
 'inv_ps': ('Schindler Ps (SCHP) – próximos resultados 22/10/2026; objetivo medio 299,50 de 6 analistas.' + X, 'Investing.com', 'Datos de mercado', '2026-08', 'https://uk.investing.com/equities/schindler-ps'),
 'kone_tke_cash': ('Schindler würden gegen Fusion von Kone und TKE Kartellbehörden anrufen (24-mar-2026).' + X, 'cash.ch (AWP)', 'Prensa', '2026-03-24', 'https://www.cash.ch/news/top-news/schindler-wurden-gegen-fusion-von-kone-und-tke-kartellbehorden-anrufen-921880'),
 'ew_blood': ('Schindler CEO: KONE, TKE merger would be a «bloodbath».' + X, 'Elevator World', 'Prensa', '2026-03', 'https://elevatorworld.com/news/daily-news/schindler-ceo-kone-tke-merger-would-be-a-bloodbath/'),
 'ew_opp': ('Schindler sees opportunities in KONE-TKE merger.' + X, 'Elevator World', 'Prensa', '2026-07', 'https://elevatorworld.com/zh-CN/news/daily-news/schindler-sees-opportunities-in-kone-tke-merger/'),
 'bw_review': ('Schindler expects long review of the Kone-TK merger.' + X, 'blue News (AWP)', 'Prensa', '2026', 'https://www.bluewin.ch/en/news/schindler-expects-long-review-of-the-kone-tk-merger-3212160.html'),
 'cash_ziele': ('Schindler-Papiere dank neuen Zielen und Dividende deutlich fester (objetivo a medio plazo: margen EBIT del 13 % desde el 10,3 %).' + X, 'cash.ch (AWP)', 'Prensa', '2024-02', 'https://www.cash.ch/news/schindler-papiere-dank-neuen-zielen-und-dividende-deutlich-fester-683429'),
 'kone_rep': ('Análisis value de KONE (14-oct-2026): comparables, sector y transacciones del mismo sector (Roland Berger, Otis, ASSA ABLOY, Atlas Copco, Konecranes, KONE-TKE).', 'Repositorio analisis-inversion', 'Analistas', '2026-10-14', 'informes/kone-2026-10-14/datos.json'),
 'rb': ('Elevator Market Outlook 2030 – Spring 2026 update (≈110.000 M USD en 2025; ≈133.000 M USD en 2030).', 'Roland Berger', 'Sectorial', '2026-04', 'https://www.rolandberger.com/en/Insights/Publications/Elevator-Market-Outlook-2030-Spring-2026-update.html'),
 'rm': ('Elevator and escalator market 2026-2030.', 'Research and Markets', 'Sectorial', '2026', 'https://www.researchandmarkets.com/reports/5632853/elevator-and-escalator-market-2026-2030'),
 'kone_h1': ('Half-year financial report of KONE Corporation for January–June 2026.', 'KONE (Cision)', 'Primaria', '2026-07-22', 'https://news.cision.com/kone-oyj/r/half-year-financial-report-of-kone-corporation-for-january-june-2026,c4376661'),
 'kone_tke': ('Inside information: KONE and TKE to combine (valor empresa de TKE 29.400 M EUR).', 'KONE', 'Primaria', '2026-04-29', 'https://www.kone.com/global/en/newsroom/releases/2026/inside-information--kone-and-tke-to-combine--creating-a-world-class-company-in-the-elevator-and-escalator-industry-2026-04-29.html'),
 'otis_q2': ('Otis Worldwide (OTIS) Q2 2026 earnings summary.', 'Quartr', 'Prensa', '2026-07-22', 'https://quartr.com/events/otis-worldwide-corporation-otis-q2-2026_332Pc4fK'),
 'otis_px': ('OTIS – dividend tracker y múltiplos (PER adelantado 15,2x).', 'DripCalc', 'Datos de mercado', '2026-08', 'https://www.dripcalc.com/stocks/OTIS/'),
 'assa': ('ASSA ABLOY (ASAZY) – PER adelantado 19,5x (22-sep-2026).', 'Yahoo Finance', 'Datos de mercado', '2026-09-22', 'https://ca.finance.yahoo.com/quote/ASAZY/'),
 'atlas': ('Atlas Copco (ATLFF) – PER adelantado 24,8x (22-sep-2026).', 'Yahoo Finance', 'Datos de mercado', '2026-09-22', 'https://uk.finance.yahoo.com/quote/ATLFF/'),
 'kcr': ('Konecranes (KCR.HE) – PER adelantado 13,6x.', 'Snowball Analytics', 'Datos de mercado', '2026', 'https://snowball-analytics.com/public/asset/KCR.HE'),
 'fujitec': ('EQT to take Fujitec private in $2.7bn deal.', 'Financier Worldwide', 'Prensa', '2025', 'https://www.financierworldwide.com/eqt-to-take-fujitec-private-in-27bn-deal'),
 'gf': ('Schindler Holding AG – GF Value y modelo de negocio (servicio con contratos que se renuevan cada año con subidas de precio).' + X, 'GuruFocus', 'Datos de mercado', '2026-06', 'https://www.gurufocus.com/term/common-stock/MEX:SCHP N'),
 # Foros y redes (E)
 'sws_narr': ('AI and modular platforms will improve operational efficiency (narrativa de la comunidad sobre Schindler).' + X, 'Simply Wall St Community', 'Foros y redes', '2026', 'https://simplywall.st/community/narratives/ch/capital-goods/vtx-schn/schindler-holding-shares/ai-and-modular-platforms-will-improve-operational-efficiency'),
 'vz_druck': ('Schindler strebt im Gesamtjahr weiterhin Wachstum an – Aktie unter Druck (reacción del mercado y comentarios).' + X, 'Vermögenszentrum', 'Foros y redes', '2026-07', 'https://www.vermoegenszentrum.ch/boersen-und-maerkte/news/schindler-strebt-im-gesamtjahr-weiterhin-wachstum-aktie-unter-druck'),
 'wso': ('Schindler Holding Aktie – foro y comentarios.' + X, 'wallstreet-online', 'Foros y redes', '2026-09', 'https://www.wallstreet-online.de/aktien/schindler-holding-aktie'),
 'getquin': ('Schindler Holding Par Shs – comunidad getquin.' + X, 'getquin', 'Foros y redes', '2026-09', 'https://app.getquin.com/pt/estoque/CH0024638196/schindler-holding-par-shs'),
 'getmidas': ('Schindler CEO’su Kone-TK Elevator birleşmesini fırsat olarak değerlendirdi (comentarios).' + X, 'Midas', 'Foros y redes', '2026-07', 'https://www.getmidas.com/midasin-kulaklari/schindler-ceosu-kone-tk-elevator-birlesmesini-musteri-ve-yetenek-kazanimi-icin-firsat-olarak-degerlendirdi-p-616041'),
}

def nota(obj, huecos):
    usados = []
    def rep(m):
        nums = []
        for k in [k.strip() for k in m.group(1).split(',')]:
            if k not in F:
                raise KeyError(k)
            if k not in usados:
                usados.append(k)
            nums.append(str(usados.index(k) + 1))
        return '[' + ', '.join(nums) + ']'
    s = json.dumps(obj, ensure_ascii=False)
    s = re.sub(r'\{([a-z0-9_]+(?:\s*,\s*[a-z0-9_]+)*)\}', rep, s)
    out = json.loads(s)
    out['fuentes'] = [{'id': i + 1, 'titulo': F[k][0], 'editor': F[k][1], 'tipo': F[k][2], 'fecha': F[k][3], 'url': F[k][4]} for i, k in enumerate(usados)]
    out['huecos'] = huecos
    return out

def guarda(letra, obj):
    with open(os.path.join(D, f'{letra}.json'), 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)

if __name__ == '__main__':
    import sys
    sys.path.insert(0, D)
    from notas_datos import A, A_huecos, B, B_huecos, C, C_huecos, Dn, D_huecos, E, E_huecos
    guarda('A', nota(A, A_huecos)); guarda('B', nota(B, B_huecos)); guarda('C', nota(C, C_huecos))
    guarda('D', nota(Dn, D_huecos)); guarda('E', nota(E, E_huecos))
    print('ok')

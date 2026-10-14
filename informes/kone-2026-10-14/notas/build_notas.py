# Construye las notas A-E de KONE (corte 2026-10-14) a partir de lo leído en los resultados de búsqueda.
# Cada nota lleva su propia lista de fuentes numerada desde 1; las citas se escriben como {clave} y se traducen a [n].
import json, re, os

D = os.path.dirname(os.path.abspath(__file__))

F = {
 'h1_26': ('Half-year financial report of KONE Corporation for January–June 2026', 'KONE (Cision)', 'Primaria', '2026-07-22', 'https://news.cision.com/kone-oyj/r/half-year-financial-report-of-kone-corporation-for-january-june-2026,c4376661'),
 'h1_26pdf': ('KONE Half-year financial report January–June 2026 (PDF)', 'KONE (Cision)', 'Primaria', '2026-07-22', 'https://mb.cision.com/Public/18027/4376661/96ea5ae3374a66f9.pdf'),
 'fy25': ('Financial Statement Bulletin of KONE Corporation for January–December 2025', 'KONE (Cision)', 'Primaria', '2026-02-06', 'https://news.cision.com/kone-oyj/r/financial-statement-bulletin-of-kone-corporation-for-january-december-2025,c4303674'),
 'ar25': ('KONE Annual Review 2025 (cifras clave)', 'KONE', 'Primaria', '2026-02-06', 'https://mb.cision.com/Public/18027/4303676/87720e779a4b8638.pdf'),
 'pres25': ('KONE Q4 2025 Presentation', 'KONE', 'Primaria', '2026-02-06', 'https://www.kone.com/fi/Images/KONE_Q4_2025_Presentation_Final_tcm18-141560.pdf'),
 'fy23': ('Financial Statement Bulletin of KONE Corporation for January–December 2023', 'KONE', 'Primaria', '2024-01-26', 'https://inderes.dk/en/releases/kone-oyj-financial-statement-bulletin-of-kone-corporation-for-january-december-2023'),
 'fy21': ('Financial Statement Bulletin January–December 2021', 'KONE', 'Primaria', '2022-02-02', 'https://www.kone.com/global/en/newsroom/releases/2022/financial-statement-bulletin-januarydecember-2021-2022-02-02.html'),
 'fy20': ('Financial Statement Bulletin of KONE Corporation for January–December 2020', 'KONE', 'Primaria', '2021-01-28', 'https://kone.com/en/news-and-insights/releases/financial-statement-bulletin-of-kone-corporation-for-january-december-2020-2021-01-28.aspx'),
 'fy19': ('Financial Statement Bulletin of KONE Corporation for January–December 2019', 'KONE', 'Primaria', '2020-01-28', 'https://www.kone.fr/actus-temoignages/presse/financial-statement-bulletin-of-kone-corporation-for-january-december-2019-2020-01-28.aspx'),
 'sched': ('Financial reporting schedule of KONE Corporation in 2026', 'KONE', 'Primaria', '2025-10-23', 'https://www.kone.com/en/news-and-insights/releases/financial-reporting-schedule-of-kone-corporation-in-2026-2025-10-23.aspx'),
 'tke': ('Inside information: KONE and TKE to combine, creating a world-class company in the elevator and escalator industry', 'KONE', 'Primaria', '2026-04-29', 'https://www.kone.com/global/en/newsroom/releases/2026/inside-information--kone-and-tke-to-combine--creating-a-world-class-company-in-the-elevator-and-escalator-industry-2026-04-29.html'),
 'egm': ('KONE Corporation’s Extraordinary General Meeting has approved the proposed resolutions related to the TK Elevator transaction', 'KONE', 'Primaria', '2026-06-03', 'https://www.kone.com/global/en/newsroom/releases/2026/kone-corporations-extraordinary-general-meeting-has-approved-the-proposed-resolutions-related-to-the-tk-elevator-transaction-2026-06-03.html'),
 'treasury': ('Treasury shares (página de inversores)', 'KONE', 'Primaria', '2026-04', 'https://www.kone.com/global/en/investors/share-and-shareholders/Treasury-shares.html'),
 'sharehist': ('Share history', 'KONE', 'Primaria', '2019', 'https://tridion.kone.com/en/investors/kone-share/share-history/'),
 'agm17': ('Minutes of KONE Corporation’s Annual General Meeting 2017 (derechos de voto A y B)', 'KONE', 'Primaria', '2017-02-28', 'https://www.kone.com/en/Images/KONE_AGM_2017_Minutes_tcm17-41353.pdf'),
 'board': ('Decisions by the Board of Directors (5-mar-2026)', 'KONE', 'Primaria', '2026-03-05', 'https://www.kone.com/en/news-and-insights/releases/decisions-by-the-board-of-directors-2026-03-05.aspx'),
 'boardpage': ('Board of Directors', 'KONE', 'Primaria', '2026', 'https://www.kone.com/en/company/organization-and-management/board-of-directors.aspx'),
 'insider': ('KONE Oyj: johdon liiketoimet – Philippe Delorme (jul-2026)', 'KONE (Inderes)', 'Primaria', '2026-07-23', 'https://www.inderes.fi/releases/kone-oyj-johtohenkiloiden-liiketoimet-philippe-delorme'),
 'insider2': ('KONE Oyj: johdon liiketoimet – Timo Ihamuotila (jul-2026)', 'KONE (Inderes)', 'Primaria', '2026-07-23', 'https://www.inderes.fi/releases/kone-oyj-johtohenkiloiden-liiketoimet-timo-ihamuotila-2'),
 'sa_is': ('KONE Oyj (HEL:KNEBV) Income statement', 'Stock Analysis', 'Datos de mercado', '2026-08', 'https://stockanalysis.com/quote/hel/KNEBV/financials/income-statement/'),
 'sa_bs': ('KONE Oyj (HEL:KNEBV) Balance sheet', 'Stock Analysis', 'Datos de mercado', '2026-08', 'https://stockanalysis.com/quote/hel/KNEBV/financials/balance-sheet/'),
 'sa_cf': ('KONE Oyj (HEL:KNEBV) Cash flow statement', 'Stock Analysis', 'Datos de mercado', '2026-08', 'https://stockanalysis.com/quote/hel/KNEBV/financials/cash-flow-statement/'),
 'snowball': ('KNEBV.HE financials', 'Snowball Analytics', 'Datos de mercado', '2026', 'https://snowball-analytics.com/public/asset/KNEBV.HE.EUR/financials'),
 'fidelity': ('KONE Oyj factsheet – financials', 'Fidelity International', 'Datos de mercado', '2025', 'https://fidelity.co.uk/factsheet-data/factsheet/FI0009013403-kone-oyj/financials'),
 'fintel': ('KONE Oyj – Balance sheet (quarterly) y precios objetivo', 'Fintel', 'Datos de mercado', '2026-07', 'https://fintel.io/s/gb/0ii2'),
 'halo': ('KNEBV quote', 'Halo Technologies', 'Datos de mercado', '2026-10-08', 'https://www.halo-technologies.com/markets/shares/hel/knebv/'),
 'etoro': ('KNEBV.HE stats', 'eToro', 'Datos de mercado', '2026-10', 'https://www.etoro.com/markets/knebv.he'),
 'roic': ('KNEBV.HE classic', 'roic.ai', 'Datos de mercado', '2026-10', 'https://www.roic.ai/quote/KNEBV.HE/classic'),
 'wise': ('PE ratio KNEBV.HE (histórico anual)', 'Wisesheets', 'Datos de mercado', '2025', 'https://wisesheets.io/pe-ratio/KNEBV.HE'),
 'macro': ('Kone Oyj PE Ratio 2019-2025 (KNYJY)', 'Macrotrends', 'Datos de mercado', '2025-09', 'https://www.macrotrends.net/stocks/charts/KNYJY/kone-oyj/pe-ratio'),
 'bawag': ('KONE OYJ B factsheet (16-dic-2025)', 'BAWAG markets', 'Datos de mercado', '2025-12-16', 'https://markets.bawag.at/wertpapiere/aktie/tts-20880532/KONE-OYJ-B-O-N/factsheet'),
 'borsdata': ('KONE ratios', 'Börsdata', 'Datos de mercado', '2025-09-17', 'https://borsdata.se/en/kone/ratios'),
 'nordnet': ('KONE Corporation – osakekurssi', 'Nordnet', 'Datos de mercado', '2026-10', 'https://www.nordnet.fi/markkinakatsaus/osakekurssit/16103263-kone-corporation'),
 'inderes_q226': ('KONE Q2’26: Jumping on the elevator of long-term earnings growth', 'Inderes', 'Analistas', '2026-07-23', 'https://www.inderes.se/en/research/kone-q226-jumping-on-the-elevator-of-long-term-earnings-growth'),
 'inderes_q226pdf': ('KONE company report 23-jul-2026 (PDF)', 'Inderes', 'Analistas', '2026-07-23', 'https://www.inderes.fi/files/88bb9ad0-573f-47f9-bc78-01c827760315'),
 'inderes_q425': ('KONE Q4’25: Smooth ride, elevated price tag', 'Inderes', 'Analistas', '2026-02-06', 'https://www.inderes.se/en/research/kone-q425-smooth-ride-elevated-price-tag'),
 'inderes_tke': ('KONE company report 4-may-2026 (combinación con TKE)', 'Inderes', 'Analistas', '2026-05-04', 'https://www.inderes.se/files/36273053-fbb9-45da-b22d-fd217955d75e'),
 'inderes_div': ('KONE – dividend', 'Inderes', 'Analistas', '2026', 'https://www.inderes.fi/sv/companies/Kone/dividend'),
 'webull': ('KONE Oyj just missed earnings but analysts have updated their models', 'Simply Wall St (Webull)', 'Analistas', '2026-07', 'https://www.webull.com/news/15286314070909952'),
 'sws': ('KONE Oyj valuation', 'Simply Wall St', 'Datos de mercado', '2026', 'https://www.simplywall.st/stocks/fi/capital-goods/hel-knebv/kone-oyj-shares/valuation'),
 'tecon': ('KONE EPS (Q2 2026 frente a estimaciones)', 'Trading Economics', 'Datos de mercado', '2026-07', 'https://tradingeconomics.com/knebv:fh:eps'),
 'quartr': ('KONE (KNEBV) Q2 2026 earnings summary', 'Quartr', 'Prensa', '2026-07-22', 'https://quartr.com/events/kone-knebv-q2-2026_33c5RFB3'),
 'webull_tr': ('KONE Q2 2026 Earnings Call: Complete Transcript', 'Webull', 'Prensa', '2026-07-22', 'https://www.webull.com/news/15270129235878912'),
 'inderes_q226com': ('KONE Q2’26 pikakommentti: pirteää tilauskehitystä', 'Inderes', 'Analistas', '2026-07-22', 'https://www.inderes.dk/analyst-comments/kone-q226-pikakommentti-pirteaa-tilauskehitysta'),
 'yahoo_q1': ('KONE Oyj (KNYJF) Q1 2026 Earnings Call Highlights', 'Yahoo Finance', 'Prensa', '2026-04-29', 'https://finance.yahoo.com/markets/stocks/articles/kone-oyj-knyjf-q1-2026-070229006.html'),
 'qz': ('Kone agrees to buy TK Elevator for $34.4 billion', 'Quartz', 'Prensa', '2026-04-29', 'https://qz.com/kone-tk-elevator-acquisition-deal-042926'),
 'gbaf': ('Kone shareholders approve $34B takeover of TK Elevator', 'Global Banking & Finance', 'Prensa', '2026-06-03', 'https://www.globalbankingandfinance.com/kone-shareholders-back-34-billion-tke-takeover-plan/'),
 'ewld': ('KONE-TKE deal likely faces antitrust scrutiny, regulatory reviews', 'Elevator World', 'Prensa', '2026-05', 'https://elevatorworld.com/news/daily-news/kone-tke-deal-likely-faces-antitrust-scrutiny-regulatory-reviews/'),
 'mlex': ('UK CMA seeks views on Kone/TK Elevator', 'MLex', 'Prensa', '2026-09-22', 'https://www.mlex.com/mlex/articles/2528198'),
 'cinven': ('KONE and TKE to combine', 'Cinven', 'Primaria', '2026-04-29', 'https://www.cinven.com/news-insights/kone-and-tke/'),
 'sa_climb': ('Kone shares climb on report of potential bid for rival TK Elevator', 'Seeking Alpha', 'Prensa', '2025-09', 'https://seekingalpha.com/news/4495932-kone-shares-climb-on-report-of-potential-bid-for-rival-tk-elevator'),
 'alphavalue': ('Kone – blog', 'AlphaValue', 'Analistas', '2026-05', 'https://www.alphavalue.fr/Blog/kone'),
 'msnews': ('KONE OYJ – news and key events', 'MarketScreener', 'Prensa', '2026-06', 'https://in.marketscreener.com/quote/stock/KONE-OYJ-1412480/news-key-events/'),
 'rb': ('Elevator Market Outlook 2030 – Spring 2026 update', 'Roland Berger', 'Sectorial', '2026-04', 'https://www.rolandberger.com/en/Insights/Publications/Elevator-Market-Outlook-2030-Spring-2026-update.html'),
 'rb25': ('Elevator market outlook 2030', 'Roland Berger', 'Sectorial', '2025', 'https://www.rolandberger.com/en/Insights/Publications/Elevator-market-outlook-2030.html'),
 'fbi': ('Elevator and escalator market 2026-2030', 'Research and Markets', 'Sectorial', '2026', 'https://www.researchandmarkets.com/reports/5632853/elevator-and-escalator-market-2026-2030'),
 'otis_q2': ('Otis Worldwide (OTIS) Q2 2026 earnings summary', 'Quartr', 'Prensa', '2026-07-22', 'https://quartr.com/events/otis-worldwide-corporation-otis-q2-2026_332Pc4fK'),
 'otis_px': ('OTIS dividend tracker y múltiplos', 'DripCalc', 'Datos de mercado', '2026-08', 'https://www.dripcalc.com/stocks/OTIS/'),
 'otis_yh': ('OTIS key statistics', 'Yahoo Finance', 'Datos de mercado', '2026-06-30', 'https://finance.yahoo.com/quote/OTIS/key-statistics'),
 'schindler_h1': ('Schindler: Continued margin expansion (resultados 1S26)', 'Schindler (MarketScreener)', 'Primaria', '2026-07-21', 'https://uk.marketscreener.com/news/continued-margin-expansion-ce7f51dbde89f62c'),
 'schindler_ms': ('Schindler Holding AG – valuation', 'MarketScreener', 'Datos de mercado', '2026-09', 'https://uk.marketscreener.com/quote/stock/SCHINDLER-HOLDING-AG-41754375/valuation/'),
 'schindler_np': ('Schindler PS – kurs og nøgletal', 'Nordnet (npinvestor)', 'Datos de mercado', '2026-09', 'https://npinvestor.dk/aktier/schindler-ps/'),
 'assa_yh': ('ASSA ABLOY (ASAZY) quote', 'Yahoo Finance', 'Datos de mercado', '2026-09-22', 'https://ca.finance.yahoo.com/quote/ASAZY/'),
 'atlas_yh': ('Atlas Copco (ATLFF) quote', 'Yahoo Finance', 'Datos de mercado', '2026-09-22', 'https://uk.finance.yahoo.com/quote/ATLFF/'),
 'kcr_sb': ('Konecranes (KCR.HE)', 'Snowball Analytics', 'Datos de mercado', '2026', 'https://snowball-analytics.com/public/asset/KCR.HE'),
 'kcr_mio': ('Konecranes (KCR) – MarketInOut', 'MarketInOut', 'Datos de mercado', '2026-06-12', 'https://www.marketinout.com/stock/fi/kcr'),
 'fujitec': ('EQT to take Fujitec private in $2.7bn deal', 'Financier Worldwide', 'Prensa', '2025', 'https://www.financierworldwide.com/eqt-to-take-fujitec-private-in-27bn-deal'),
 'bund': ('Germany 10-year government bond yield (serie OCDE/FRED)', 'Macroradar', 'Datos de mercado', '2026-06', 'https://www.macroradar.io/germany-10-year-yield'),
 'bund_te': ('German Bund yields stabilize as market eyes record debt supply', 'Trading Economics', 'Datos de mercado', '2026-04', 'https://tradingeconomics.com/germany/government-bond-yield/news/514000'),
 'damodaran': ('Implied ERP by month (ERPbymonth.xlsx), oct-2026', 'A. Damodaran (NYU Stern)', 'Datos de mercado', '2026-10', 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx'),
 'forum': ('Kone – Dedicated to People Flow (hilo del foro)', 'Inderes Forum', 'Foros y redes', '2026-09', 'https://forum.inderes.com/t/kone-omistautunut-ihmisvirroille/3248/558?tl=en'),
 'forum_q2': ('KONE Q2’26: pidemmän aikavälin tuloshissin kyytiin (comentarios de lectores)', 'Inderes', 'Foros y redes', '2026-07', 'https://www.inderes.fi/research/kone-q226-pidemman-aikavalin-tuloshissin-kyytiin'),
 'video_kallis': ('Koneen osake mystisen kallis (vídeo y comentarios)', 'Inderes', 'Foros y redes', '2026', 'https://www.inderes.fi/videos/koneen-osake-mystisen-kallis'),
 'sws_narr': ('13 analysts have nudged their price target on KONE Oyj slightly (narrativa de la comunidad)', 'Simply Wall St Community', 'Foros y redes', '2026', 'https://simplywall.st/community/narratives/fi/capital-goods/hel-knebv/kone-oyj-shares/8bax1kko-partnerships-and-modernization-will-drive-opportunity-amid-challenging-markets/updates/13-analysts-have-nudged-their-price-target-on-kone-oyj-slightly'),
 'mb_otis': ('Otis took another guidance cut, but the story isn’t over', 'MarketBeat', 'Prensa', '2026-07', 'https://www.marketbeat.com/articles/otis-took-another-guidance-cutbut-the-story-isnt-over/'),
 'librarian': ('Kone up 33% from October lows: now what?', 'Librarian Capital (Substack)', 'Foros y redes', '2025', 'https://librariancapital.substack.com/p/kone-up-33-from-october-lows-now'),
}

def nota(obj, huecos, extra=None):
    usados = []
    def rep(m):
        claves = [k.strip() for k in m.group(1).split(',')]
        nums = []
        for k in claves:
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

from notas_datos import A, A_huecos, B, B_huecos, C, C_huecos, Dn, D_huecos, E, E_huecos
guarda('A', nota(A, A_huecos))
guarda('B', nota(B, B_huecos))
guarda('C', nota(C, C_huecos))
guarda('D', nota(Dn, D_huecos))
guarda('E', nota(E, E_huecos))
print('ok')

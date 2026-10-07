import { readFileSync, writeFileSync, existsSync } from 'node:fs';
const b = JSON.parse(readFileSync('bolsa.json', 'utf8'));
const extra = existsSync('D_extra.json') ? JSON.parse(readFileSync('D_extra.json', 'utf8')) : {};
const fuentes = [
 { id: 1, titulo: 'Históricos diarios de RAA.DE, ^MDAXI, EXH4.DE, ^STOXX, EXSA.DE y ^GDAXI', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://finance.yahoo.com/quote/RAA.DE/history' },
 { id: 2, titulo: 'Report on the first half year 2026', editor: 'RATIONAL AG', tipo: 'Primaria', fecha: '2026-08-06', url: 'https://www.rational-online.com/media/investor-relations/veroeffentlichungen-gj-2026/rational-ag---report-on-the-first-half-year-2026.pdf' },
 { id: 3, titulo: 'Financial- and Investor Relations Calendar 2026', editor: 'RATIONAL AG', tipo: 'Primaria', fecha: '2026-10-07', url: 'https://www.rational-online.com/en_us/company/investor-relations/financial-and-investor-relations-calendar/' },
 { id: 4, titulo: 'Company Profile FY 2025', editor: 'RATIONAL AG', tipo: 'Primaria', fecha: '2026-03', url: 'https://www.rational-online.com/media/investor-relations/veroeffentlichungen-gj-2025/rational-ag---company-profile-fy-2025.pdf' },
 { id: 5, titulo: 'Annual Report 2025', editor: 'RATIONAL AG', tipo: 'Primaria', fecha: '2026-03-19', url: 'https://www.rational-online.com/media/investor-relations/veroeffentlichungen-gj-2025/rational-ag---annual-report-fy-2025-(single-pages).pdf' },
 { id: 6, titulo: 'RATIONAL AG: Consensus (recomendaciones y precio objetivo)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://www.marketscreener.com/quote/stock/RATIONAL-AG-436515/consensus/' },
 { id: 7, titulo: 'RATIONAL AG: Financials (estimaciones 2026-2028)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://www.marketscreener.com/quote/stock/RATIONAL-AG-436515/finances/' },
 { id: 8, titulo: 'RATIONAL AG: Valuation (múltiplos históricos y estimados)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://www.marketscreener.com/quote/stock/RATIONAL-AG-436515/valuation/' },
 { id: 9, titulo: 'Rendimiento de los valores federales cotizados a 10 años, serie diaria (BBSIS.D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A)', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A' },
 { id: 10, titulo: 'Implied ERP by month (ERPbymonth.xlsx)', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
 { id: 11, titulo: 'Euro foreign exchange reference rates', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
 { id: 12, titulo: 'RATIONAL Aktie: Kursziele', editor: 'finanzen.net', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://www.finanzen.net/kursziele/rational' },
 ...(extra.fuentes || [])
];
const D = {
 identificacion: {
  nombre: 'RATIONAL Aktiengesellschaft', nombre_corto: 'Rational', ticker: 'RAA', isin: 'DE0007010803', mercado: 'Xetra (Fráncfort, Prime Standard)', indice_referencia: 'MDAX',
  pais: 'Alemania', pais_iso: 'DE', sector: null, industria: null, sede: 'Landsberg am Lech', fundacion: null, empleados: 2912, web: 'www.rational-online.com',
  precio: b.identificacion.precio, fecha_precio: b.identificacion.fecha_precio, acciones: 11.37, capitalizacion_publicada: 6566,
  free_float_pct: 44.8, max_52s: b.identificacion.max_52s, min_52s: b.identificacion.min_52s,
  volumen_medio_diario: '≈ 6,8 M EUR/día (≈ 11.100 acciones; 3 meses)', proximos_resultados: '2026-11-05'
 },
 consenso: extra.consenso ?? null,
 bolsa: { ...b.bolsa, tramo_drawdown: undefined, posicion_corta_pct: null, comentario: extra.bolsa_comentario ?? null, confianza: 'Alta' },
 multiplos_historicos: extra.multiplos_historicos ?? null,
 comparables: extra.comparables ?? null,
 transacciones: extra.transacciones ?? null,
 dcf: { wacc: { tasa_libre_pct: 3.52, beta: 1.04, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: null, tasa_impositiva_pct: null, peso_deuda_pct: 0 } },
 valoracion: {
  puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 27.6, caja: 431.7, minoritarios: 0, pensiones: 6.4, asociadas: 0, otros_ajustes: 0 },
  rab: null,
  referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, válida para mercados desarrollados)', prima_implicita_pct: 3.7, fecha: '2026-10', fuente: 'Damodaran, Implied ERP by month, 1-oct-2026 [10]' }

 },

 fuentes,
 huecos: extra.huecos || []
};
delete D.bolsa.tramo_drawdown;
writeFileSync('D.json', JSON.stringify(D, null, 2));
console.log('D.json escrito,', fuentes.length, 'fuentes');

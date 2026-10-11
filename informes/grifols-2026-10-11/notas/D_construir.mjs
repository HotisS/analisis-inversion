// Construye notas/D.json (subagente D, Grifols 2026-10-11). Uso: node D_construir.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const aqui = path.dirname(fileURLToPath(import.meta.url));
const bolsa = JSON.parse(fs.readFileSync(path.join(aqui, 'bolsa.json'), 'utf8'));
const extraD = fs.existsSync(path.join(aqui, 'D_partes.json')) ? JSON.parse(fs.readFileSync(path.join(aqui, 'D_partes.json'), 'utf8')) : {};

const accA = 426.129798 - 3.772733; // 422.357065
const accB = 261.425110 - 3.201374; // 258.223736
const pA = 9.88, pB = 6.74;
const capA = accA * pA, capB = accB * pB;
const r1 = (x, d = 1) => Math.round(x * 10 ** d) / 10 ** d;

// Participación del 6,58 % en SRAAS a precio de mercado del 9-oct-2026
const sraasAcc = 249 * 7.7314 / 4.43; // millones de acciones implícitas (valor 30-jun / precio 30-jun × EURCNY 30-jun)
const sraasVal = sraasAcc * 5.06 / 7.4992;

const fuentes = [
  { id: 1, titulo: 'Form 6-K de 29-jul-2026: resultados del 1S 2026 (nota de prensa, presentación y estados financieros intermedios resumidos a 30-jun-2026)', editor: 'Grifols, S.A. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-07-29', url: 'https://www.sec.gov/Archives/edgar/data/1438569/000110465926087634/tm2621481d1_6k.htm' },
  { id: 2, titulo: 'Form 6-K de 26-feb-2026: resultados de 2025 y guía de 2026 (nota de prensa, presentación y cuentas anuales)', editor: 'Grifols, S.A. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-26', url: 'https://www.sec.gov/Archives/edgar/data/1438569/000110465926020526/tm267368d1_6k.htm' },
  { id: 3, titulo: 'Históricos diarios de GRF.MC, ^IBEX y EXV4.DE hasta 9-oct-2026 (herramienta bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-09', url: 'https://finance.yahoo.com/quote/GRF.MC/history' },
  { id: 4, titulo: 'Grifols, S.A. (GRF): previsiones financieras 2026-2028', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-09', url: 'https://www.marketscreener.com/quote/stock/GRIFOLS-S-A-25530828/finances/' },
  { id: 5, titulo: 'Grifols, S.A. (GRF): consenso de analistas y precios objetivo', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-09', url: 'https://www.marketscreener.com/quote/stock/GRIFOLS-S-A-25530828/consensus/' },
  { id: 6, titulo: 'Grifols: consenso y estimaciones', editor: 'Investing.com', tipo: 'Analistas', fecha: '2026-10-09', url: 'https://www.investing.com/equities/grifols-consensus-estimates' },
  { id: 7, titulo: 'Grifols (BME:GRF) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-11', url: 'https://stockanalysis.com/quote/bme/GRF/statistics/' },
  { id: 8, titulo: 'Tipos de cambio de referencia del euro, 9-oct-2026 (eurofxref-daily)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-09', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 9, titulo: 'Tipos de cambio de referencia EUR/CNY y EUR/USD, 30-jun-2026 (ECB Data Portal, EXR)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-06-30', url: 'https://data-api.ecb.europa.eu/service/data/EXR/D.CNY+USD.EUR.SP00.A?startPeriod=2026-06-29&endPeriod=2026-06-30&format=csvdata' },
  { id: 10, titulo: 'Rendimiento diario de la deuda federal alemana a 10 años (BBSIS R10XX), oct-2026', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-09', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A' },
  { id: 11, titulo: 'Cierres diarios de comparables y de Shanghai RAAS (002252.SZ, CSL.AX, 4502.T, ADMA, 002007.SZ, 600161.SS, KMDA, GRF-P.MC, GRFS), 9-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-09', url: 'https://finance.yahoo.com/quote/002252.SZ/history' },
  ...(extraD.fuentes || [])
];

const D = {
  identificacion: {
    nombre: 'Grifols, S.A.', nombre_corto: 'Grifols', ticker: 'GRF', isin: 'ES0171996087', mercado: 'Bolsas españolas (Mercado Continuo, SIBE)', indice_referencia: 'IBEX 35',
    pais: 'España', pais_iso: 'ES', sector: 'Salud', industria: 'Biotecnología (hemoderivados)', sede: 'Sant Cugat del Vallès (Barcelona)', fundacion: '1909', empleados: null, web: 'https://www.grifols.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio,
    acciones: r1(accA + accB * pB / pA, 2),
    capitalizacion_publicada: 5910,
    free_float_pct: 61.5,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s,
    volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M EUR/día (3 meses, clase A)`,
    proximos_resultados: '2026-11-04',
    extra: [
      `Capital a 30-jun-2026: 426.129.798 acciones A (0,25 EUR nominal) y 261.425.110 acciones B sin voto (0,05 EUR nominal) [1].`,
      `Autocartera a 30-jun-2026: 3.772.733 acciones A (86 M EUR) y 3.201.374 acciones B (45 M EUR) [1].`,
      `En circulación: ${(accA).toFixed(3).replace('.', ',')} M de acciones A y ${(accB).toFixed(3).replace('.', ',')} M de acciones B [1].`,
      `Capitalización a 9-oct-2026: A ${Math.round(capA)} M EUR (a 9,88) + B ${Math.round(capB)} M EUR (a 6,74) = ${Math.round(capA + capB)} M EUR [1][3]; Stock Analysis publica 5.910 M EUR con 680,58 M de acciones [7].`,
      `Acciones A-equivalentes (B × 6,74/9,88): ${r1(accA + accB * pB / pA, 2).toString().replace('.', ',')} M; la B cotiza un 31,8 % por debajo de la A [3][11].`,
      `ADR GRFS: 7,46 USD = 6,66 EUR al BCE (1,1206), frente a 6,74 EUR de la B: 1 ADR = 1 acción B [8][11].`,
      `Stock Analysis da un flotante de 418,22 M de acciones sobre 680,58 M (61,5 %), 49,2 % en manos de institucionales [7].`,
      `Próximos resultados (9M/3T 2026): 4-nov-2026 según Stock Analysis [7]; la web de Grifols no publica el calendario.`
    ]
  },
  consenso: {
    guidance: 'Guía de 2026 (26-feb-2026) [2]: margen de EBITDA ajustado de al menos el 25 %, crecimiento del EBITDA ajustado del 5-9 % a tipo de cambio constante, flujo libre antes de M&A y de dividendos de 500-575 M EUR y desapalancamiento continuado. Hitos de 2027 sin cambios: apalancamiento según el contrato de crédito de 3,5x o menos a cierre de 2027 y flujo libre acumulado antes de M&A y dividendos de 1.750-2.000 M EUR en 2024-2027 [2]. El 28-jul-2026 Grifols confirmó la guía tras un 1S con ingresos de 3.574 M EUR (+2,6 % a tipo constante), EBITDA ajustado de 854 M EUR (23,9 % de margen), flujo libre antes de M&A de 91 M EUR y apalancamiento de 4,2x [1].',
    estimaciones: [
      { periodo: '2026e', ingresos: 7654, ebitda: 1890, ebit: 1431, bpa: 0.79, dpa: 0.27, fuente: 'MarketScreener, 12 analistas, 9-oct-2026 [4]' },
      { periodo: '2027e', ingresos: 8133, ebitda: 2108, ebit: 1616, bpa: 1.03, dpa: 0.30, fuente: 'MarketScreener, 12 analistas, 9-oct-2026 [4]' },
      { periodo: '2028e', ingresos: 8595, ebitda: 2310, ebit: 1797, bpa: 1.44, dpa: 0.43, fuente: 'MarketScreener, 12 analistas, 9-oct-2026 [4]' }
    ],
    recomendaciones: { n_analistas: 12, comprar: 8, mantener: 3, vender: 1, po_medio: 14.76, po_min: 9.0, po_max: 23.0 },
    revisiones: 'Las fuentes gratuitas no publican la serie de revisiones del BPA y del EBITDA (MarketScreener solo la da en gráfico) [5]. Entre marzo y junio de 2026 varios bancos recortaron el precio objetivo: Morgan Stanley bajó a «igual ponderación» (10-mar), Baader/AlphaValue recortó previsiones y objetivo (6-abr), CaixaBank (25-may) y Bestinver (19-jun) rebajaron el objetivo manteniendo «comprar» [5]. El consenso de 2026 (EBITDA 1.890 M EUR, 24,7 % de margen) queda por debajo del margen mínimo del 25 % de la guía [2][4]. Investing coincide en 12 analistas, 8 comprar, 3 mantener y 1 vender, con objetivo medio de 14,758 EUR [6].',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 1.75,
    confianza: 'Media',
    extra: [
      'El EBITDA del consenso es el ajustado de Grifols: 2025 = 1.825 M EUR en MarketScreener, igual que el EBITDA ajustado publicado, frente a 1.693 M EUR de EBITDA reportado [2][4].',
      'Diferencia 2025: 132 M EUR de ajustes (reestructuración, deterioros y otros, costes de transacción) = 1,75 % de las ventas de 7.524 M EUR [2].',
      'LTM a 30-jun-2026: EBITDA reportado 1.645 M EUR; EBITDA ajustado LTM 1.803 M EUR (854 del 1S26 + 467 del 4T25 + 482 del 3T25) [1].',
      'El EBIT del consenso también es ajustado: 1.391 M EUR en 2025 frente a 1.243 M EUR reportados [1][4].',
      'El BPA de MarketScreener usa 680,58 M de acciones (A + B sin ponderar): beneficio neto 536 M (2026e), 699,8 M (2027e) y 864,1 M (2028e) [4].',
      'Deuda neta del consenso: 8.445 M EUR (2026e), 8.104 M (2027e), 7.635 M (2028e); flujo libre 523,8 / 830,3 / 975,4 M EUR [4].',
      'El dividendo de 2025 fue de 0,23 EUR por acción A y B (161 M EUR en total), con 59 M EUR pagados el 2-jul-2026 [1].'
    ]
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: null,
    comentario: null,
    confianza: 'Alta',
    extra: [
      `Beta frente al IBEX: mensual 5 años ${bolsa.betas.mensual_5a}; semanal 5 años ${bolsa.betas.semanal_5a}; semanal 2 años ${bolsa.betas.semanal_2a}; ajustadas ${bolsa.betas.ajustada_mensual_5a} y ${bolsa.betas.ajustada_semanal_5a} [3]. Stock Analysis da 1,20 (5 años) [7].`,
      `Caída máxima de ${bolsa.bolsa.max_drawdown_pct} % entre el 14-oct-2021 y el 6-mar-2024 [3].`,
      'Mayores caídas diarias en 12 meses: -6,1 % (3-mar-2026), -5,9 % (9-abr-2026), -4,1 % (31-jul-2026, tras resultados del 1S) [3].',
      'Máximo de 52 semanas 12,20 EUR (15-oct-2025) y mínimo 8,43 EUR (23-mar-2026) [3].'
    ]
  },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.map(c => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: null,
    confianza: 'Media'
  },
  comparables: extraD.comparables || null,
  transacciones: extraD.transacciones || null,
  dcf: extraD.dcf || null,
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 8311, arrendamientos: 1045, caja: 513, minoritarios: 2434, pensiones: 0, asociadas: Math.round(117 + sraasVal), otros_ajustes: 59 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, «ERP (T12m with sustainable payout)» [12]' },
    pesos: null,
    comentario: null,
    confianza: 'Media',
    extra: [
      'Deuda financiera bruta a 30-jun-2026: pasivos financieros 8.808 M no corrientes + 548 M corrientes = 9.356 M EUR, menos 1.045 M de arrendamientos = 8.311 M EUR (neta de 287 M de costes de formalización; incluye 686 M EUR del acuerdo con GIC y 4 M de derivados) [1].',
      'Composición: bonos 4.244 M (4.119 + 125), préstamo senior garantizado (TLB) 3.039 M, otros préstamos 476 M (351 M de la línea de crédito dispuesta), otros pasivos financieros 835 M [1].',
      'Deuda financiera neta de balance 8.843 M EUR (con arrendamientos) y según el contrato de crédito 7.798 M EUR; apalancamiento 4,2x (contrato) y 5,4x (EBITDA reportado) [1].',
      'Valor razonable de bonos 4.188 M EUR frente a 4.114 M contables y del TLB 3.019 M frente a 2.835 M (cotizan por encima de su valor contable) [1].',
      'Minoritarios a valor contable (2.434 M EUR): Grifols Diagnostic Solutions 1.870 M (45 % de SRAAS), Biotest 188 M (19,22 %; Biotest ya no cotiza tras la oferta de exclusión de 2025), Haema 190 M y BPC Plasma 160 M (100 % de minoritarios: participación preferente de GIC), Plasmavita 23 M y otros [1].',
      'GIC: además de 350 M EUR de minoritarios en Haema y BPC, hay 686 M EUR de pasivo financiero por el acuerdo con GIC (738 M a cierre de 2025; en el 1S26 se rescató una acción por 52 M USD) [1].',
      'Contribución LTM de los minoritarios al EBITDA reportado: GDS 53 M EUR, Biotest -9 M, BPC 43 M, Haema 29 M; deuda neta atribuible a minoritarios según el contrato -517 M (GDS presta 1.151 M a Grifols) [1].',
      `Asociadas: puestas en equivalencia 117 M EUR (Grifols Egypt 99 M, Grifols Canada Plasma 18 M) + 6,58 % de Shanghai RAAS a mercado: ${Math.round(sraasVal)} M EUR (≈ ${Math.round(sraasAcc)} M de acciones a 5,06 CNY y 7,4992 CNY/EUR); en balance a 30-jun figuraba por 249 M EUR a 4,43 CNY [1][8][9][11].`,
      'La participación en SRAAS está pignorada a favor de Haier, con voto delegado en Haier durante 10 años y compromiso de no venta de 3 años [1].',
      'Otros ajustes: 59 M EUR de dividendo complementario de 2025 pagado el 2-jul-2026 tras la fecha del balance [1].',
      'No incluidos (decisión del analista): factoring sin recurso de 403 M EUR a 30-jun-2026 [1]; préstamo a Scranton Enterprises de 132 M EUR (activo con vinculada, vence dic-2026/jun-2027) [1]; compromisos de aportación a Grifols Egypt de 22 M USD (2026), 39 M (2027) y 15 M (2028) y aval de 50 M USD [1].',
      'Pensiones: plan de prestación definida de Alemania no material según Grifols; 0 en el puente [1].'
    ]
  },
  fuentes,
  huecos: extraD.huecos || [],
  _estado: extraD._estado || undefined
};
fs.writeFileSync(path.join(aqui, 'D.json'), JSON.stringify(D, null, 2), 'utf8');
console.log('D.json escrito', Math.round(capA + capB), r1(accA + accB * pB / pA, 2), Math.round(sraasVal));

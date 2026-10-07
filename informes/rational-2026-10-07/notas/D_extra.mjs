import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const comp = JSON.parse(execFileSync('node', ['D_comp.mjs']).toString());
const roic = { MIDD: 10.4, 'EPRO B': 9.7, '6465': 14.1, JBTM: 5.4, KRN: 16.3, KNEBV: 55.0, SCHP: 54.0, INRN: 16.2, ITW: 29.3 };
const ids = { MIDD: 13, 'EPRO B': 14, '6465': 15, JBTM: 16, KRN: 17, KNEBV: 18, SCHP: 19, INRN: 20, ITW: 21 };
const slug = { MIDD: 'THE-MIDDLEBY-CORPORATION-10026', 'EPRO B': 'ELECTROLUX-PROFESSIONAL-A-105544686', '6465': 'HOSHIZAKI-CORPORATION-6500342', JBTM: 'JBT-MAREL-CORPORATION-3860953', KRN: 'KRONES-AG-436341', KNEBV: 'KONE-OYJ-1412480', SCHP: 'SCHINDLER-HOLDING-AG-174980', INRN: 'INTERROLL-HOLDING-AG-73849', ITW: 'ILLINOIS-TOOL-WORKS-INC-13125' };
const pares = comp.filter(c => c.ticker !== 'RAA');
const empresas = pares.map(c => {
  const e = { nombre: c.nombre, ticker: c.ticker, pais: c.pais, capitalizacion: c.capitalizacion, ev_ventas: c.ev_ventas, ev_ebitda_ltm: c.ev_ebitda_ltm, ev_ebitda_ntm: c.ev_ebitda_ntm, per_ntm: c.per_ntm, crecimiento_pct: c.crecimiento_pct, margen_ebitda_pct: c.margen_ebitda_pct, roic_pct: roic[c.ticker], dn_ebitda: c.dn_ebitda, fcf_yield_pct: c.fcf_yield_pct };
  if (c.ticker === 'MIDD') {
    const ev = c.ev_local;
    e.ev_ventas = +(ev / c.ventas[1]).toFixed(2); e.ev_ebitda_ltm = +(ev / c.ebitda[1]).toFixed(1);
    e.crecimiento_pct = +((c.ventas[2] / c.ventas[1] - 1) * 100).toFixed(1); e.margen_ebitda_pct = +(c.ebitda[1] / c.ventas[1] * 100).toFixed(1);
    e.dn_ebitda = +(1586 / c.ebitda[1]).toFixed(1);
  }
  return e;
});
const fuentes = [
  ...pares.map(c => ({ id: ids[c.ticker], titulo: `${c.nombre}: Valuation y Financials (capitalización, valor empresa y estimaciones 2025-2027)`, editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-07', url: `https://www.marketscreener.com/quote/stock/${slug[c.ticker]}/valuation/` })).sort((a, b) => a.id - b.id),
  { id: 22, titulo: 'Statistics: Return on Invested Capital (ROIC) de Rational y de los comparables', editor: 'Stock Analysis (datos de S&P Global Market Intelligence)', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://stockanalysis.com/quote/etr/RAA/statistics/' },
  { id: 23, titulo: 'Welbilt, Inc. Form 10-K 2021', editor: 'Welbilt / SEC EDGAR', tipo: 'Primaria', fecha: '2022-02-28', url: 'https://www.sec.gov/Archives/edgar/data/1650962/000165096222000037/wbt-20211231.htm' },
  { id: 24, titulo: 'Electrolux Professional to acquire Unified Brands', editor: 'Electrolux Professional', tipo: 'Primaria', fecha: '2021-10-12', url: 'https://www.electroluxprofessionalgroup.com/en/electrolux-professional-to-acquire-unified-brands/' },
  { id: 25, titulo: 'Electrolux Professional Group to acquire Tosei Corporation', editor: 'Electrolux Professional', tipo: 'Primaria', fecha: '2023-12-22', url: 'https://www.electroluxprofessionalgroup.com/en/electrolux-professional-group-to-acquire-tosei-corporation/' },
  { id: 26, titulo: 'Euro foreign exchange reference rates, histórico (eurofxref-hist)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist.zip' }
];
const med = a => { const s = [...a].sort((x, y) => x - y), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
console.log('mediana EV/EBITDA NTM', med(empresas.map(e => e.ev_ebitda_ntm)), 'PER NTM', med(empresas.map(e => e.per_ntm)), 'LTM', med(empresas.map(e => e.ev_ebitda_ltm)));
const X = {
  fuentes,
  consenso: {
    guidance: 'En el informe semestral de 2026, publicado el 6 de agosto, Rational confirma para el conjunto del año un crecimiento de las ventas de un dígito medio-alto y un margen EBIT dentro del rango previo del 25 % al 26 % [2]. La previsión incluye una devolución de aranceles de unos 14 M EUR y los efectos negativos de los aranceles de importación en EE. UU. y de mayores costes logísticos y de materias primas, que la dirección señala como las principales incertidumbres del segundo semestre [2]. La próxima actualización llega con la declaración de los nueve meses, el 5 de noviembre de 2026, seguida del día del mercado de capitales del 19 de noviembre [3].',
    estimaciones: [
      { periodo: '2026e', ingresos: 1350, ebitda: 388.9, ebit: 349.0, bpa: 23.98, dpa: 17.55, fuente: 'MarketScreener, consenso a 7-oct-2026 [7, 8]' },
      { periodo: '2027e', ingresos: 1454, ebitda: 418.3, ebit: 376.2, bpa: 25.73, dpa: 18.39, fuente: 'MarketScreener, consenso a 7-oct-2026 [7, 8]' },
      { periodo: '2028e', ingresos: 1570, ebitda: 455.6, ebit: 411.5, bpa: 28.15, dpa: 19.84, fuente: 'MarketScreener, consenso a 7-oct-2026 [7, 8]' }
    ],
    recomendaciones: { n_analistas: 14, comprar: null, mantener: null, vender: null, po_medio: 795.86, po_min: 585.0, po_max: 1070.0 },
    revisiones: 'MarketScreener solo publica la evolución de las estimaciones en gráficos, sin cifras, así que no hay un cambio medible del BPA ni del EBITDA a 3 y 12 meses. El consenso de 14 analistas es «Outperform», con un precio objetivo medio de 795,86 EUR, un 37,8 % sobre el cierre, y un rango de 585 a 1.070 EUR [6]. finanzen.net recoge nueve objetivos con una media de 829,62 EUR: Bernstein 1.070, Barclays 860, Berenberg 835, Goldman Sachs 831, UBS 805, Warburg 800, Deutsche Bank 756 y RBC 680; DZ Bank, en neutral, sin objetivo [12]. Tras los resultados del 6 de agosto, Deutsche Bank, RBC y DZ Bank mantuvieron neutral y el resto, compra [6]. Las estimaciones completas salen de un solo proveedor; finanzen.net sirve de contraste del precio objetivo.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null, confianza: 'Media'
  },
  bolsa_comentario: 'Rational pierde un 12,7 % en el año y un 18,5 % a doce meses, frente a un -0,2 % y un -0,9 % del MDAX y un +8,9 % y un +7,3 % del ETF de bienes industriales europeos [1]. La diferencia se abrió en 2025 (-19,7 % frente a +19,7 % del MDAX) y es sobre todo compresión del múltiplo: el EV/EBITDA de cierre pasó de 25,2x en 2024 a 18,9x en 2025, y hoy es de 15,8x sobre el consenso de 2026 [8]. El semestral señala los aranceles de EE. UU. y los costes logísticos como la principal incertidumbre [2]. La caída máxima en cinco años, del 53,8 %, fue entre noviembre de 2021 y septiembre de 2022, con la subida de tipos [1]. La acción cerró el 6 de octubre a 577,50 EUR, cerca del mínimo de 52 semanas (560,50) y un 26 % por debajo del máximo (776,50) [1]. La beta de cinco años es 1,04 frente al MDAX, pero 1,35 frente al DAX y 1,72 frente al STOXX Europe 600 [1].',
  multiplos_historicos: {
    serie: [['2016', 424], ['2017', 537.2], ['2018', 496], ['2019', 717], ['2020', 761.5], ['2021', 900.4], ['2022', 555], ['2023', 699.5], ['2024', 824], ['2025', 661.5]].map(([a, p]) => ({ anio: a, precio_cierre: p, ev_ebitda_ntm: null, per_ntm: null, excluir: a === '2020' || a === '2021' })),
    comentario: 'Con el precio de cierre de cada año y el EBITDA de ese ejercicio, MarketScreener da un EV/EBITDA de 52,6x en 2021, 22,8x en 2022, 25,2x en 2023 y 2024 y 18,9x en 2025; el PER pasó de 37,4x en 2024 a 29,6x en 2025 [8]. Al precio actual, el EV/EBITDA sobre el consenso de 2026 es de 15,8x y el PER de 24,1x [8], los más bajos de la serie. Se excluyen 2020 y 2021: el beneficio de la pandemia (EBITDA de 190 M EUR en 2021 frente a 310 M en 2023) infla los múltiplos [8]. El descuento frente a la historia llega con un crecimiento más lento (ventas +5,5 % en 2025 [7]) y con tipos más altos: el Bund a 10 años está en el 3,52 % [9].',
    confianza: 'Media'
  },
  comparables: {
    criterio: 'Tres fabricantes cotizados de equipos de cocina profesional (Middleby, Electrolux Professional y Hoshizaki; Welbilt dejó de cotizar al comprarla Ali Group) y uno de maquinaria alimentaria (JBT Marel). Se añaden compounders industriales de nicho con caja neta o ROIC alto con los que el mercado compara a Rational: Kone y Schindler (base instalada y servicio), Interroll y Krones (maquinaria de nicho) e ITW (referencia de márgenes y ROIC). Se descartan los fabricantes asiáticos de electrodomésticos que agrupa MarketScreener, porque venden al consumidor. Capitalizaciones convertidas a EUR al tipo del BCE del 6-oct-2026 [11]; precios del cierre del 6 de octubre.',
    empresas,
    comentario: "Rational cotiza a unas 15,0x el EBITDA de los próximos 12 meses y 22,7x el beneficio, frente a una mediana de los nueve comparables de 9,2x y 17,2x [7, 13-21]: una prima de en torno al 60 % en EV/EBITDA. La mediana mezcla negocios muy distintos. Los fabricantes de cocina profesional cotizan entre 6,8x y 10,4x, pero con márgenes EBITDA del 13 % al 23 % y ROIC del 5 % al 14 % [13-16, 22]; Rational tiene un 29 % y un 56 % [7, 22]. Los comparables de calidad son Kone y Schindler (13,3x y 12,6x, ROIC del 55 % y 54 %, crecimiento del 3,5 % al 5,5 %) e ITW (16,4x, margen del 29 %) [18, 19, 21, 22]. Frente a ese subgrupo, cuya mediana es 13,3x, la prima es de un 13 % y la explica un crecimiento algo mayor, en torno al 7,5 % [7]. El múltiplo razonable sale de ese subgrupo, no de la mediana completa.",
    confianza: 'Media'
  },
  transacciones: {
    operaciones: [
      { fecha: '2021-07', objetivo: 'Welbilt (EE. UU.)', comprador: 'Ali Group', ev: Math.round(4800 / 1.1812), ev_ventas: 3.1, ev_ebitda: 17.4, prima_pct: null, comentario: 'Compra en efectivo a 24 USD por acción: unos 3.500 M USD de capital y 4.800 M USD de valor empresa [23]. Múltiplos sobre las ventas (1.546,9 M USD) y el EBITDA operativo ajustado (275,4 M USD) de 2021 [23]. Convertido a EUR al tipo del BCE del 14-jul-2021, 1,1812 USD/EUR [26].' },
      { fecha: '2021-10', objetivo: 'Unified Brands (EE. UU.)', comprador: 'Electrolux Professional', ev: Math.round(2140 / 10.1078), ev_ventas: 1.86, ev_ebitda: null, prima_pct: null, comentario: 'Comprada a Dover por unos 2.140 M SEK (244 M USD) sin caja ni deuda, con ventas esperadas de unos 1.150 M SEK (135 M USD) en 2021 [24]. No se publicó el EBITDA. Convertido a EUR al tipo del BCE del 12-oct-2021, 10,1078 SEK/EUR [26].' },
      { fecha: '2023-12', objetivo: 'Tosei (Japón)', comprador: 'Electrolux Professional', ev: Math.round(1650 / 11.0556), ev_ventas: 1.65, ev_ebitda: null, prima_pct: null, comentario: 'Lavandería profesional y envasado al vacío, comprada a fondos ligados a Mitsubishi por unos 1.650 M SEK sin caja ni deuda, con ventas de unos 1.000 M SEK y margen EBITA superior al del comprador [25]. No se publicó el EBITDA. Convertido a EUR al tipo del BCE del 22-dic-2023, 11,0556 SEK/EUR [26].' }
    ],
    comentario: "La única referencia de control con EBITDA publicado en cocina profesional es la compra de Welbilt por Ali Group: 17,4x el EBITDA ajustado y 3,1x las ventas de 2021 [23], en pleno pico de múltiplos. Rational cotiza hoy a unas 15x el EBITDA de los próximos 12 meses y 4,7x las ventas, sin prima de control [7]. Las compras de Electrolux Professional (1,65x-1,86x ventas) son negocios pequeños y de menos margen [24, 25]. Una operación sobre Rational es improbable: los accionistas de referencia tienen el 55,2 % y el capital flotante es del 44,8 % [4], así que cualquier oferta depende de ellos.",
    confianza: 'Media'
  },
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Stock Analysis, estadísticas de RAA: «n/a»; 2) MarketScreener, páginas de consenso y valoración: no publican posiciones cortas; 3) registro de posiciones cortas netas del Bundesanzeiger: no consultado en esta pasada', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'revisiones del BPA y el EBITDA a 3 y 12 meses', tipo: 'Complemento', intentos: '1) MarketScreener, página de revisiones: solo gráficos sin cifras; 2) finanzen.net, objetivos de precio: sin histórico de estimaciones; 3) Investing.com, consenso: HTTP 403', decision: 'Omitido; el texto de revisiones usa recomendaciones y objetivos' },
    { seccion: 'consenso', campo: 'desglose comprar/mantener/vender', tipo: 'Complemento', intentos: '1) MarketScreener: solo la media «Outperform» y 14 analistas; 2) finanzen.net: nueve objetivos con banco y fecha, sin desglose agregado; 3) Investing.com: HTTP 403', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'EV/EBITDA de Unified Brands y Tosei; otras operaciones con múltiplo', tipo: 'Complemento', intentos: '1) notas de prensa de Electrolux Professional: solo precio y ventas; 2) nota de Dover sobre Unified Brands: tiempo de espera agotado; 3) JBT-Marel (Business Wire): HTTP 403, y la compra de Royal Range por Electrolux Professional (2026) no publicó precio', decision: 'Omitido' }
  ]
};
writeFileSync('D_extra.json', JSON.stringify(X, null, 1));
console.log('D_extra.json escrito');

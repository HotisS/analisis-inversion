// Completa consenso, bolsa, multiplos_historicos, comparables y dcf_mercado.tasa_libre_pct en D.json (conserva fuentes 1-3).
import { readFileSync, writeFileSync } from 'node:fs';
const P = new URL('./D.json', import.meta.url);
const D = JSON.parse(readFileSync(P, 'utf8'));
const B = JSON.parse(readFileSync(new URL('./bolsa.json', import.meta.url), 'utf8'));
const C = JSON.parse(readFileSync(new URL('./D_comps.json', import.meta.url), 'utf8'));
const MS = 'https://www.marketscreener.com/quote/stock/';
const F = D.fuentes.filter(f => f.id <= 3);
const add = (titulo, editor, tipo, fecha, url) => { const id = F.length + 1; F.push({ id, titulo, editor, tipo, fecha, url }); return id; };
const s4 = add('Consenso de analistas de CAF: recomendación media, número de analistas y precios objetivo', 'MarketScreener', 'Datos de mercado', '2026-10-06', MS + 'CONSTRUCCIONES-Y-AUXILIAR-32078325/consensus/');
const s5 = add('CAF: estimaciones 2026-2028 (cuenta, deuda neta, flujos, por acción) y ratios de valoración', 'MarketScreener', 'Datos de mercado', '2026-10-06', MS + 'CONSTRUCCIONES-Y-AUXILIAR-32078325/valuation/');
const s6 = add('Cobertura y consenso de analistas (13 entidades; consenso 1S26 de 11 analistas)', 'CAF', 'Primaria', '2026-07-20', 'https://www.cafmobility.com/accionistas-inversores/informacion-general/cobertura-consenso-analistas/');
const s7 = add('Presentación de resultados del primer semestre de 2026', 'CAF', 'Primaria', '2026-07-30', 'https://www.cafmobility.com/accionistas-inversores/informacion-economico-financiera/presentaciones-inversores/');
const s8 = add('Presentación de resultados del ejercicio 2025 (perspectivas 2026 y objetivos del Plan Estratégico 2026)', 'CAF', 'Primaria', '2026-02-26', 'https://admin.cafmobility.com/uploads/Presentacion_de_Resultados_FY_2025_e0bccdc8b6.pdf');
const s9 = add('Spain 10-Year Bond Yield Historical Data', 'Investing.com', 'Datos de mercado', '2026-10-06', 'https://www.investing.com/rates-bonds/spain-10-year-bond-yield-historical-data');
const s10 = add('Spain 10Y Bond Yield', 'Trading Economics', 'Datos de mercado', '2026-10-07', 'https://tradingeconomics.com/spain/government-bond-yield');
const s11 = add('Tipos de cambio de referencia del euro, 6-oct-2026 (eurofxref-hist)', 'Banco Central Europeo', 'Primaria', '2026-10-06', 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist.zip');
const pid = {};
for (const [x, n, slug] of [['alstom', 'Alstom', 'ALSTOM-4607'], ['stadler', 'Stadler Rail', 'STADLER-RAIL-AG-57143111'], ['talgo', 'Talgo', 'TALGO-S-A-22148977'], ['knorr', 'Knorr-Bremse', 'KNORR-BREMSE-AG-46576463'], ['wabtec', 'Wabtec', 'WESTINGHOUSE-AIR-BRAKE-TE-14842'], ['dtruck', 'Daimler Truck', 'DAIMLER-TRUCK-HOLDING-AG-130552528'], ['volvo', 'Volvo', 'VOLVO-30049521']])
  pid[x] = add(`${n}: cuenta, deuda neta, flujos y estimaciones; ratios de valoración`, 'MarketScreener', 'Datos de mercado', '2026-10-06', MS + slug + '/valuation/');
const s19 = add('Estadísticas de Alstom, Stadler, Talgo, Knorr-Bremse, Wabtec, Daimler Truck, Volvo y CAF (rentabilidad sobre el capital invertido, ROIC)', 'Stock Analysis', 'Datos de mercado', '2026-10-06', 'https://stockanalysis.com/quote/etr/KBX/statistics/');
const s20 = add('Daimler Truck: Investor Relations Release, resultados del ejercicio 2025', 'Daimler Truck Holding AG', 'Primaria', '2026-03', 'https://www.daimlertruck.com/en/investors');
const s21 = add('Notificaciones de posiciones cortas: Construcciones y Auxiliar de Ferrocarriles, S.A.', 'CNMV', 'Primaria', '2026-10-07', 'https://www.cnmv.es/portal/Consultas/EE/PosicionesCortas?nif=A20001020');

D.consenso = {
  guidance: null,
  estimaciones: [
    { periodo: '2026e', ingresos: 4964, ebitda: 415.5, ebit: 302.3, bpa: 5.609, dpa: 1.972, fuente: `MarketScreener, 6-oct-2026 (9 analistas) [${s5}]` },
    { periodo: '2027e', ingresos: 5355, ebitda: 465.3, ebit: 342, bpa: 6.522, dpa: 2.243, fuente: `MarketScreener, 6-oct-2026 (9 analistas) [${s5}]` },
    { periodo: '2028e', ingresos: 5759, ebitda: 513.3, ebit: 382.2, bpa: 7.442, dpa: 2.528, fuente: `MarketScreener, 6-oct-2026 (9 analistas) [${s5}]` },
  ],
  recomendaciones: { n_analistas: 13, comprar: 8, mantener: 4, vender: 1, po_medio: 69.22, po_min: 55.4, po_max: 80.0 },
  revisiones: null,
  base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
  confianza: 'Media',
  extra: {
    recomendaciones_fuente: `Lista de CAF actualizada el 20-jul-2026: 13 entidades, 8 «comprar» (Alantra 71,0; Sabadell 70,1; Santander 75,0; Bestinver 63,0; JB Capital 78,0; Kepler 77,6; Kutxabank Investment 72,0; Renta 4 80,0), 4 «neutral» (Bankinter 55,4; CaixaBank BPI 78,7; Exane BNP 56,0; GVC Gaesco 66,0) y 1 «infraponderar» (ODDO BHF 57,0); media de los 13 precios objetivo 69,22 EUR (cálculo propio) [${s6}]. Fechas de los precios objetivo entre el 5-nov-2025 (Bestinver) y el 7-jul-2026 (CaixaBank BPI): cinco tienen más de seis meses a la fecha de corte [${s6}].`,
    contraste_marketscreener: `MarketScreener a 6-oct-2026: 9 analistas, consenso «Outperform» (7,2 sobre 10), precio objetivo medio 73,95 EUR (−5,6 % frente al cierre de 78,30), máximo 87,50 y mínimo 60,00 [${s4}]. El máximo de 87,50 no está en la lista de CAF del 20-jul: hay al menos una revisión al alza posterior a los resultados del 1S26 [${s4}, ${s6}]. Con las dos fuentes, el precio está por encima del objetivo medio (un 13 % sobre los 69,22 de la lista de CAF; un 6 % sobre los 73,95 de MarketScreener).`,
    sorpresa_1S26: `Consenso de 11 analistas para el 1S26 recogido por CAF (20-jul-2026): ventas 2.338 M, EBIT 131 M (margen 5,6 %), resultado atribuido 85 M [${s6}]. Real (30-jul-2026): ventas 2.527 M (+16 %), EBIT 150 M (5,9 %, +32 %), resultado neto atribuible 99 M (+36 %) [${s7}]: +8 % en ventas, +15 % en EBIT y +16 % en beneficio sobre el consenso (cálculo propio).`,
    guidance_hechos: `Perspectivas 2026 reafirmadas el 30-jul-2026 (sin operaciones inorgánicas): book-to-bill ≥ 1 con contratación selectiva; ventas con «crecimiento de un dígito alto» frente a 2025; mejora de rentabilidad en EBIT y resultado neto; dividendo en línea con los resultados; ratio DFN/EBITDA estable frente a 2025; reducción de emisiones [${s7}]. El nuevo Plan Estratégico 2027-2030 se presentará en el 4T26 [${s7}]. Objetivos del Plan Estratégico 2026 (dic-2022), recordados en la presentación de 2025: ventas c. 4.800 M (c. ×1,6, con M&A), EBIT c. 300 M (c. ×1,8, con M&A), DFN/EBITDA c. 2,2x tras M&A, dividendo en progresión con los resultados [${s8}]. Ventas 2025: 4.487 M; consenso 2026e: ventas 4.964 M (+10,6 %) y EBIT 302 M [${s5}].`,
    base_ebitda: `El EBITDA de MarketScreener para 2025 (353,7 M) coincide con el EBITDA NIIF de CAF (EBIT 246 + amortizaciones y deterioros 108 = 354 M; el «EBITDA ajustado» de CAF resta 4 M de otros ajustes y da 350 M) [${s5}, 3]. EBIT 2025 de MarketScreener 245,8 M = EBIT de CAF 246 M [${s5}, 3].`,
    dpa: `Ojo: MarketScreener asigna 1,34 EUR al DPA de 2025, pero el dividendo con cargo a 2025 es 1,52 EUR (pagado en julio de 2026) [${s5}, 3]; los DPA estimados 2026e-2028e (1,972; 2,243; 2,528) equivalen a un pay-out del 35 % del BPA estimado (cálculo propio).`,
    deuda_neta_consenso: `Deuda neta estimada por MarketScreener: 264,5 M (2026e), 213,8 M (2027e), 184,3 M (2028e), frente a 194,2 M en 2025; capex estimado 147,3 / 158,0 / 168,9 M y FCF 74,9 / 150,0 / 195,4 M [${s5}].`,
    multiplos_consenso: `Con el cierre de 78,30 EUR, MarketScreener da PER 14,0x (2026e) y 12,0x (2027e), EV/EBITDA 7,09x y 6,22x, EV/ventas 0,59x y 0,54x, rentabilidad por dividendo 2,52 % y 2,86 % [${s5}].`
  }
};

const bb = B.bolsa;
D.bolsa = {
  tipo_rentabilidad: bb.tipo_rentabilidad,
  rentabilidades: bb.rentabilidades,
  anual: bb.anual.filter(a => +a.anio >= 2016),
  beta: bb.beta, volatilidad_pct: bb.volatilidad_pct, max_drawdown_pct: bb.max_drawdown_pct,
  posicion_corta_pct: null,
  comentario: null,
  confianza: 'Alta',
  extra: {
    indices: 'Índice de referencia: IBEX 35 (^IBEX); índice sectorial: iShares STOXX Europe 600 Industrial Goods & Services (EXH4.DE). Todo de precio, sin dividendos, porque ^IBEX no lleva dividendos [2].',
    hechos: `Precio 78,30 EUR el 6-oct-2026, máximo de 52 semanas 79,70 y mínimo 49,90 [2]. Subida en el año del 32,9 % frente al 12,3 % del IBEX y el 8,6 % del sector; en 2025, +68,5 % frente a +49,3 % del IBEX [2]. A 10 años, 8,0 % anual, en línea con el IBEX (8,3 %) y por debajo del sector (10,0 %) [2]. Peor tramo de los últimos cinco años: −40,5 % entre el 10-nov-2021 y el 29-sep-2022 [2]; 2022 cerró con −27,6 % (IBEX −5,6 %) [2]. Beta de 5 años 0,91 y volatilidad de 1 año 28,9 % [2].`,
    catalizadores_precio: `Resultados 1S26 (30-jul-2026) por encima del consenso: EBIT +15 % y beneficio +16 % sobre lo esperado [${s6}, ${s7}]; contratación del semestre 4.035 M (+31 %), book-to-bill 1,6x y cartera récord de 17.743 M [${s7}]; contrato de SNCB (Bélgica) de más de 1.700 M en el 1T26 [${s7}].`,
    posicion_corta: `La página de notificaciones de posiciones cortas de la CNMV para CAF (ES0121975009) no muestra ninguna posición corta neta publicada (se publican las ≥ 0,5 % del capital) a 7-oct-2026 [${s21}]. Campo vacío: sin posición publicada no hay cifra, solo «por debajo del 0,5 %».`,
    volumen: 'Volumen medio de 3 meses: 27.035 acciones/día, ≈ 1,9 M EUR/día (66 sesiones) [2].'
  }
};

D.multiplos_historicos = {
  serie: B.cierres_ejercicio.filter(c => +c.anio >= 2018 && +c.anio <= 2025).map(c => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
  comentario: null,
  confianza: 'Alta',
  extra: {
    precios: `Precio de cierre del último día hábil de cada ejercicio (Yahoo Finance, históricos diarios de CAF.MC) [2]. Coinciden con el precio de referencia de cierre que usa MarketScreener para 2021-2025 (36,60; 26,50; 32,60; 34,95; 58,90) [${s5}].`,
    referencia_proveedor: `Múltiplos de cierre de ejercicio según MarketScreener (EV/EBITDA del mismo año, con su deuda neta): 6,07x (2021), 4,97x (2022), 4,81x (2023), 4,36x (2024), 6,25x (2025) y 7,09x con el precio actual sobre 2026e; PER 14,6x, 17,4x, 12,5x, 11,6x, 13,8x y 14,0x (2026e) [${s5}]. Son del mismo ejercicio, no de los próximos 12 meses: por eso no van en ev_ebitda_ntm.`
  }
};

const cmp = C.filter(c => c.ticker !== 'CAF');
const sfor = { ALO: pid.alstom, SRAIL: pid.stadler, TLGO: pid.talgo, KBX: pid.knorr, WAB: pid.wabtec, DTG: pid.dtruck, 'VOLV-B': pid.volvo };
D.comparables = {
  criterio: null,
  empresas: cmp.map(c => { const { _det, ...r } = c; return r; }),
  comentario: null,
  confianza: 'Media',
  extra: {
    metodo: `Mismo proveedor para todo salvo el ROIC: precio de referencia de MarketScreener (cierre del 6-oct-2026; para CAF coincide con 78,30 EUR y para Wabtec con los 291,16 USD de Yahoo) × acciones de MarketScreener = capitalización; valor empresa = capitalización + deuda neta del último ejercicio cerrado de MarketScreener; LTM = último ejercicio cerrado (2025 a diciembre; Alstom, ejercicio abr-2025 a mar-2026); NTM = ejercicios estimados ponderados por los meses que caen en los próximos 12 (0,24 del 2026e y 0,76 del 2027e a diciembre; Alstom 0,48 del ejercicio a mar-2027 y 0,52 del ejercicio a mar-2028) [${Object.values(pid).join(', ')}]. Crecimiento = ventas NTM / ventas LTM anualizado entre los centros de los dos periodos (1,76 años a diciembre; 1,51 Alstom). Margen EBITDA y DN/EBITDA del último ejercicio; rentabilidad FCF = FCF del último ejercicio / capitalización. ROIC de Stock Analysis, últimos 12 meses [${s19}]. Script: notas/D_comps.mjs (salida D_comps.json).`,
    divisas: `Capitalización convertida a EUR con el BCE del 6-oct-2026: 1 EUR = 1,1269 USD; 0,9359 CHF; 11,2425 SEK [${s11}]. Los múltiplos se calculan en la divisa de cada empresa.`,
    filas: Object.fromEntries(C.map(c => [c.nombre, `${c._det.div}: precio ${c._det.precio}; cap. ${c._det.cap_local} M; DN ${c._det.dn_local} M; EV ${c._det.ev_local} M; ventas LTM ${c._det.ventas_ltm} y NTM ${c._det.ventas_ntm}; EBITDA LTM ${c._det.ebitda_ltm} y NTM ${c._det.ebitda_ntm}; BPA NTM ${c._det.bpa_ntm}; FCF ${c._det.fcf_ltm} [${sfor[c.ticker] || s5}]`])),
    control_caf: `CAF con el mismo método (no va en la lista; el motor la calcula con sus cifras): cap. 2.682 M, EV 2.876 M, EV/ventas 0,64x, EV/EBITDA LTM 8,1x y NTM 6,3x, PER NTM 12,4x, crecimiento 9,5 %, margen EBITDA 7,9 %, ROIC 15,6 % (Stock Analysis), DN/EBITDA 0,55x, FCF 2,6 % [${s5}, ${s19}].`,
    daimler_truck: `Deuda neta de Daimler Truck sustituida por la liquidez neta industrial de 7.700 M EUR a 31-dic-2025 [${s20}]: la de MarketScreener (18.013 M) suma la deuda de la financiera de camiones y daría un EV/EBITDA LTM de 10,1x. El EBITDA de MarketScreener sigue incluyendo el negocio financiero.`,
    volvo: `Volvo: MarketScreener da caja neta (−48.400 M SEK en 2025), coherente con la posición financiera neta de la actividad industrial, no la del grupo con la financiera [${pid.volvo}].`,
    talgo: `Talgo: EBITDA 2025 de 0,6 M sobre 618 M de ventas (pérdida neta de 100,7 M) [${pid.talgo}]: EV/EBITDA LTM y DN/EBITDA sin sentido, se dejan vacíos. Acciones de MarketScreener 134,07 M en 2026 frente a 122,90 M en 2025 (ampliación de capital) [${pid.talgo}].`,
    stadler: `Stadler: ventas 2025 de 3.679 M CHF y 5.094 M CHF estimados para 2026 (+38 %), por eso el EV/EBITDA cae de 12,0x LTM a 7,3x NTM; FCF 2025 de −588 M CHF [${pid.stadler}].`,
    alstom: `Alstom: EBITDA de 1.981 M en el ejercicio a mar-2026 y 1.719 M estimados para el siguiente (MarketScreener), de modo que el NTM (4,8x) sale por encima del LTM (4,4x); precio de 16,18 EUR frente a 24,26 al cierre del ejercicio anterior [${pid.alstom}].`,
    wabtec: `Wabtec: el BPA estimado de MarketScreener (9,20 USD en 2026e) es ajustado frente a 6,83 USD reales de 2025: su PER NTM no tiene la misma base que el de las europeas [${pid.wabtec}].`,
    excluidas: 'Fuera: Iveco (la cotización está anclada al precio de la OPA de Tata Motors y no mide valor de mercado; va en transacciones), Siemens (Siemens Mobility es una división de un conglomerado) e Hitachi (Hitachi Rail pesa poco en el grupo; JPY y ejercicio a marzo); CRRC (China, otro mercado). Decisión del analista si las incluye.'
  }
};

D.dcf_mercado.tasa_libre_pct = 4.10;
D.dcf_mercado.extra.tasa_libre = `Bono español a 10 años al cierre del 6-oct-2026: 4,104 % en Investing.com (fila «Oct 06, 2026 | 4.104») [${s9}]; Trading Economics, el 7-oct: «rose to 4.14% on October 7, 2026», con el dato anterior en 4,10 [${s10}]. Se toma 4,10 %.`;
D.fuentes = F;
D.huecos = D.huecos || [];
writeFileSync(P, JSON.stringify(D, null, 2));
console.log('ok', F.length);

// actualiza-notas.mjs — Fluidra, iteración del 27-nov-2026 (tras los resultados de los nueve meses del 29-oct-2026).
// Parte de las notas A-E de la iteración del 19-oct (copiadas) y rehace lo que cambia con datos a 26/27-nov:
//  A: trimestres (3T25 y 3T26), LTM a sep-26, balance y liquidez a 30-sep-26, últimas presentaciones (1S26 y 9M26), 2025 con ESEF.
//  C: posiciones cortas (CNMV 26-nov) en alertas.
//  D: precio (cierre 26-nov), rango, volumen, consenso (Yahoo 27-nov y MarketScreener), comparables rehechos con Yahoo
//     (consenso posterior a sus resultados del 3T), Bund 3,30 % (26-nov), BCE 26-nov, puente a 30-sep-26, cortos.
// Se ejecuta UNA vez sobre las copias (marca _actualizado_2026_11_27).
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const aqui = dirname(fileURLToPath(import.meta.url));
const leer = (n) => JSON.parse(readFileSync(join(aqui, n), 'utf8'));
const escribir = (n, o) => writeFileSync(join(aqui, n), JSON.stringify(o, null, 2));
const A = leer('A.json'), C = leer('C.json'), D = leer('D.json');
if (D._actualizado_2026_11_27) { console.log('Ya actualizado.'); process.exit(0); }
const bolsa = leer('bolsa.json');
const comps = JSON.parse(readFileSync('/tmp/claude-0/tanda-1127/fluidra/comps-filas.json', 'utf8'));

// ---------------------------------------------------------------- A
const nA = A.fuentes.length; // 12
A.fuentes.push(
  { id: nA + 1, titulo: 'Q3 2026 Results (presentación de resultados de los nueve meses de 2026, 29-oct-2026)', editor: 'Fluidra, S.A.', tipo: 'Primaria', fecha: '2026-10-29', url: 'https://www.fluidra.com/wp-content/uploads/2026/10/Q3-26-Eng_-vDEF.pdf' },
  { id: nA + 2, titulo: 'Transcripción de la conferencia de resultados de los nueve meses de 2026 (29-oct-2026)', editor: 'Fluidra, S.A.', tipo: 'Primaria', fecha: '2026-10-29', url: 'https://www.fluidra.com/wp-content/uploads/2026/10/FDR-MAD_Transcript_2026-10-29.pdf' },
  { id: nA + 3, titulo: 'Fluidra Delivers a Strong Nine-month Performance (nota de prensa, Business Wire)', editor: 'Fluidra, S.A. / Business Wire (vía ariva.de)', tipo: 'Primaria', fecha: '2026-10-29', url: 'https://www.businesswire.com/news/home/20261029707021/en/' },
  { id: nA + 4, titulo: 'Fluidra reports Q3 results with revenue ahead of expectations (3T25 frente al consenso de la compañía)', editor: 'Investing.com', tipo: 'Prensa', fecha: '2025-10-30', url: 'https://ng.investing.com/news/stock-market-news/fluidra-reports-q3-results-with-revenue-ahead-of-expectations-93CH-2172692' },
);
const P9 = nA + 1, T9 = nA + 2, N9 = nA + 3, I25 = nA + 4;

A.trimestres.items = [
  { periodo: '1T25', ingresos: 564, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 131, margen_ebitda_pct: 23.2, bpa: null, vs_consenso: null },
  { periodo: '2T25', ingresos: 663, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 183, margen_ebitda_pct: 27.6, bpa: null, vs_consenso: null },
  { periodo: '3T25', ingresos: 497, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 97, margen_ebitda_pct: 19.5, bpa: null, vs_consenso: 'Superior' },
  { periodo: '4T25', ingresos: 459.7, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 90.1, margen_ebitda_pct: 19.6, bpa: null, vs_consenso: null },
  { periodo: '1T26', ingresos: 564, crecimiento_pct: 0.0, crecimiento_organico_pct: 5.4, ebitda: 124, margen_ebitda_pct: 22.0, bpa: null, vs_consenso: null },
  { periodo: '2T26', ingresos: 694, crecimiento_pct: 4.7, crecimiento_organico_pct: 3.7, ebitda: 197, margen_ebitda_pct: 28.4, bpa: null, vs_consenso: null },
  { periodo: '3T26', ingresos: 521, crecimiento_pct: 4.8, crecimiento_organico_pct: 1.3, ebitda: 107, margen_ebitda_pct: 20.5, bpa: null, vs_consenso: null },
];
A.trimestres.ultima_presentacion = `El EBITDA de esta tabla es el ajustado de Fluidra (antes de reestructuración y pagos en acciones); el 4T25 sale de restar los nueve meses al año [1, ${P9}]. El 3T25 superó el consenso de la compañía en ventas (497 frente a 484 M) y EBITDA (97 frente a 96 M) [${I25}]. **3T26** (29-oct): ventas de 521 M (+4,8 %; +2,9 % a tipo constante y +1,3 % a perímetro y tipo constantes) y EBITDA ajustado de 107 M (+7 % a tipo constante; 20,5 % de margen); en nueve meses, ventas de 1.780 M (+4,3 % a tipo constante), EBITDA ajustado de 428 M (24,1 %), beneficio atribuido de 154 M (−5,9 %) por 45 M de reestructuración y pagos en acciones (17 M un año antes) y BPA ajustado de 1,15 EUR (+3,9 %) [${P9}, ${N9}]. **La guía se estrecha recortando la parte alta**: ventas del +3/+7 % al +3,5/+5,5 % a tipo constante, margen EBITDA ajustado del 23,3-24,3 % al 23,3-23,5 % y BPA ajustado del +4/+13 % al +5/+9 % [${P9}]. En julio el tono era de canal en EE. UU. que se vacía y guía mantenida en la parte baja-media [7]; en octubre la dirección (con el nuevo director financiero, Juan Graham) presume de venta al cliente final en Norteamérica «en la parte alta de un dígito», anuncia una subida de precios del 3,5-5 % en EE. UU. y del 2 % en Europa para 2027 y sitúa la obra nueva de EE. UU. en 55.000-56.000 piscinas, un 30 % bajo la media [${T9}]. Los analistas preguntaron por las devoluciones de aranceles (unos 8 M brutos y 6 M netos en el trimestre, que sostienen el margen del año: sin ellas quedaría por debajo del 23 %, según un analista), por el margen de 2027 (el consenso pide ≈ 24 %) y por la caída de piscina comercial (−6,7 % orgánico en el 3T). **La dirección no dio guía de 2027** («en 2027 no tenemos devoluciones de aranceles») ni cuantificó el efecto de los aranceles nuevos [${T9}].`;

A.financieros.ltm = {
  periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 2239.7, ebitda: 462.4, ebit: 300.3, beneficio_neto: 167, bpa: 0.88, dpa: 0.65, dpa_extraordinario: 0, fcf: 285,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
};
A.financieros.comentario = (A.financieros.comentario || '') + ` En los nueve meses de 2026 las ventas crecen un 3,3 % (+4,3 % a tipo constante; precio +2 %, volumen +1 %, compras +1 % y divisa −1 %) y el EBIT reportado baja de 274 a 265 M porque la reestructuración sube de 13 a 40 M (cierre del centro de I+D francés y plan de plantas) [${P9}, ${T9}]. LTM a sep-26 (estimación propia con las cuentas de 2025 y los nueve meses): ventas de 2.239,7 M, EBITDA reportado de 462,4 M, EBIT de 300,3 M y beneficio atribuido de 167 M [1, ${P9}].`;

A.balance.liquidez = `A 30-sep-26: caja de 133 M, más 2 M de otros activos financieros corrientes y 9 M no corrientes; deuda bancaria y valores de 1.058 M (1.045 no corrientes y 13 corrientes) y arrendamientos de 231 M (164 M un año antes, por la formalización del arrendamiento de la planta de Tánger) [${P9}]. Pólizas no dispuestas de 556 M a cierre de 2025 (450 M de revolving sindicada, extendida en marzo de 2026 hasta enero de 2029) [1, 7].`;
A.balance.comentario = A.balance.comentario + ` A 30-sep-26: deuda neta de 1.145 M (914 financiera + 231 de arrendamientos), 2,2 veces el EBITDA ajustado, frente a 1.034 M un año antes, por la recompra de 40 M, el arrendamiento de Tánger y la divisa; el capital circulante operativo baja al 19,1 % de las ventas LTM (20,0 % un año antes), con proveedores +21 % [${P9}].`;

A._actualizado_2026_11_27 = true;

// ---------------------------------------------------------------- C
C.gobierno.alertas = C.gobierno.alertas.map((t) => (t.startsWith('Posiciones cortas')
  ? 'Posiciones cortas publicadas pequeñas: a 26-nov-2026 ninguna supera el umbral del 0,5 % (Connor, Clark & Lunn baja al 0,49 % el 26-nov; AQR ya no figura) [8].'
  : t));
C.fuentes = C.fuentes.map((f) => (f.id === 8 ? { ...f, fecha: '2026-11-27', titulo: 'Registro de posiciones cortas netas: Fluidra, S.A. (consulta del 27-nov-2026)' } : f));
C._actualizado_2026_11_27 = true;

// ---------------------------------------------------------------- D
const id = bolsa.identificacion;
Object.assign(D.identificacion, {
  precio: id.precio, fecha_precio: id.fecha_precio, acciones: 187.8, capitalizacion_publicada: 3542,
  max_52s: id.max_52s, min_52s: id.min_52s,
  volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M EUR/día (${Math.round(bolsa.volumen_3m.acciones_dia / 1000)}.000 acciones, 3 meses) [1]`,
  proximos_resultados: '2027-02-25',
});
const fx = (i, patch) => { const f = D.fuentes.find((x) => x.id === i); Object.assign(f, patch); };
fx(1, { fecha: '2026-11-26', titulo: 'Históricos diarios de FDR.MC, ^IBEX, EXSA.DE (STOXX Europe 600) y EXH4.DE hasta el 26-nov-2026 (cierre del 26-nov; la sesión del 27-nov no había cerrado)' });
fx(4, { fecha: '2026-11-27', titulo: 'Fluidra (FDR.MC): ficha de Yahoo Finance (quoteSummary: estimaciones de BPA ajustado y ventas 2026e-2027e, tendencia a 90 días, precio objetivo y recomendaciones), 27-nov-2026', editor: 'Yahoo Finance', url: 'https://finance.yahoo.com/quote/FDR.MC/analysis/' });
fx(5, { fecha: '2026-11-26', titulo: 'Rendimiento de los valores federales a 10 años de vencimiento residual (serie BBSIS D.I.ZAR.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A), 26-nov-2026: 3,30 %' });
fx(6, { fecha: '2026-11', titulo: 'Implied ERP by month (ERPbymonth.xlsx), prima implícita principal de octubre de 2026 (4,20 %), la última publicada a la fecha de corte' });
fx(7, { fecha: '2026-11-27', titulo: 'Fluidra, S.A.: previsiones financieras (cuenta de resultados estimada 2026e-2028e), consulta del 27-nov-2026' });
fx(8, { fecha: '2026-11-27', titulo: 'Fluidra, S.A.: consenso de analistas y precio objetivo (Yahoo Finance financialData y recommendationTrend, 27-nov-2026)', editor: 'Yahoo Finance', url: 'https://finance.yahoo.com/quote/FDR.MC/analysis/' });
fx(15, { fecha: '2026-11-26', titulo: 'Tipos de cambio de referencia del euro, 26-nov-2026: 1,0975 USD y 0,9153 CHF por euro', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' });
fx(39, { fecha: '2026-11-27', titulo: 'Notificaciones de posiciones cortas: Fluidra, S.A. (NIF A-17728593), consulta del 27-nov-2026' });
const nomC = { 17: 'Pool Corporation (POOL)', 18: 'Hayward Holdings (HAYW)', 19: 'Pool Corporation', 20: 'Hayward Holdings', 21: 'Pentair (PNR)', 22: 'A. O. Smith (AOS)', 23: 'Watts Water Technologies (WTS)', 24: 'Zurn Elkay Water Solutions (ZWS)', 25: 'Geberit (GEBN.SW)', 26: 'Aalberts (AALB.AS)' };
for (const [i, n] of Object.entries(nomC)) fx(+i, { fecha: '2026-11-25', editor: 'Yahoo Finance', titulo: `${n}: precio, capitalización, valor empresa, EBITDA y ventas de los últimos 12 meses, flujo libre, deuda y estimaciones de BPA y ventas 2026e-2027e (quoteSummary), cierre del 25-nov-2026 (Europa: 27-nov)`, url: 'https://finance.yahoo.com/' });

const ms = 'MarketScreener, previsiones a 27-nov-2026 (sin fecha de actualización visible) [7]';
D.consenso.estimaciones = [
  { periodo: '2026e', ingresos: 2268, ebitda: 532.3, ebit: 347, bpa: 0.99, dpa: 0.69, fuente: ms },
  { periodo: '2027e', ingresos: 2392, ebitda: 579.5, ebit: 408.4, bpa: 1.28, dpa: 0.77, fuente: ms },
  { periodo: '2028e', ingresos: 2516, ebitda: 625.9, ebit: 457.5, bpa: 1.51, dpa: 0.86, fuente: ms },
];
D.consenso.recomendaciones = { n_analistas: 15, comprar: 12, mantener: 3, vender: 0, po_medio: 25.93, po_min: 19, po_max: 31 };
D.consenso.guidance = `El 29-oct-2026, con los nueve meses, Fluidra estrechó la guía del año a tipo de cambio constante recortando la parte alta: ventas del +3/+7 % al +3,5/+5,5 %, margen EBITDA ajustado del 23,3-24,3 % al 23,3-23,5 % y BPA ajustado del +4/+13 % al +5/+9 % (sobre 1,30 EUR de 2025: 1,37-1,42 EUR) [2]. El punto medio baja medio punto en ventas (5 % a 4,5 %), cuatro décimas en margen (23,8 % a 23,4 %) y 1,5 puntos en BPA (8,5 % a 7 %). La dirección no da guía de 2027. A medio plazo mantiene ventas +6/+8 % al año, margen EBITDA ajustado superior al 25 %, ROCE superior al 17 % y apalancamiento en torno a 2 veces; el plan de eficiencia lleva 23 M de ahorros en nueve meses [2].`;
D.consenso.revisiones = `Tras los nueve meses, el BPA ajustado del consenso de Yahoo Finance sube: 2026e de 1,32 a 1,37 EUR en 90 días y 2027e de 1,53 a 1,56 EUR (6 analistas); en ventas, 2.269 M en 2026e y 2.393 M en 2027e [4]. El precio objetivo medio sigue en 25,93 EUR (15 analistas, 19-31; 12 comprar y 3 mantener) [8]. MarketScreener da un BPA contable de 0,99, 1,28 y 1,51 EUR en 2026e-2028e, casi igual que el 19-oct (0,97, 1,27 y 1,49) y sin fecha de actualización visible: puede no recoger aún el aumento de la reestructuración del 3T [7]. El BPA de nueve meses publicado (154 M de beneficio, unos 0,81 EUR) deja el contable de 2026e más cerca de 0,93-0,95 que de 0,99, salvo un cuarto trimestre muy superior al de 2025 (13 M). El EBITDA del consenso es el ajustado de Fluidra (501 M en 2025) [7, 13].`;
D.consenso.confianza = 'Media';

D.comparables.empresas = comps.map((c) => {
  if (c.ticker === 'PNR') return { ...c, crecimiento_pct: null, ev_ebitda_ntm: Math.round((c.ev_ebitda_ltm / 1.047) * 10) / 10 };
  if (c.ticker === 'AOS') return { ...c, ev_ebitda_ntm: Math.round((c.ev_ebitda_ltm / 1.04) * 10) / 10 };
  return c;
});
D.comparables.criterio = 'Dos rivales directos de piscina (Hayward, el más parecido por producto y margen, y Pool Corp, el mayor distribuidor del sector y principal cliente del canal en EE. UU.), Pentair (piscina es su segmento más rentable) y cinco fabricantes de equipos de agua y fontanería con exposición a reforma y vivienda: A. O. Smith, Watts, Zurn Elkay, Geberit y Aalberts. Maytronics se excluye (pérdidas en 2025, sin consenso) y Xylem por tamaño y perfil municipal. **Rehechos el 27-nov con datos posteriores a los resultados del 3T de todos ellos** (Yahoo Finance quoteSummary, cierre del 25-nov en EE. UU. y del 27-nov a media sesión en Europa) [17-26], al euro con el BCE del 26-nov [15]: capitalización, valor empresa y EBITDA de los últimos 12 meses del mismo proveedor; PER de los próximos 12 meses = precio ÷ BPA de 2027e del consenso de Yahoo (con el corte a final de noviembre, los próximos 12 meses son casi 2027e); EV/EBITDA de los próximos 12 meses = valor empresa ÷ (EBITDA LTM × ventas 2027e ÷ ventas LTM), es decir, a margen constante (estimación propia). En Pentair y A. O. Smith las ventas LTM de Yahoo no casan con su estimación de 2026e (Pentair suma una compra): su crecimiento no se usa (Pentair, null) y el EV/EBITDA de los próximos 12 meses es el LTM entre 1,047 (mediana del crecimiento del resto) y 1,04. El BPA del consenso de Yahoo es el ajustado de cada empresa, no el contable con el que se proyecta Fluidra. ROIC del 8-oct (Stock Analysis) [27-32].';

D.valoracion.puente = { fecha: '2026-09-30', deuda_financiera: 1058, arrendamientos: 231, caja: 144, minoritarios: 10, pensiones: null, asociadas: 86, otros_ajustes: 0 };
D.notas_integrador = { ...(D.notas_integrador || {}), puente: 'Balance a 30-sep-2026 de la presentación del 3T26 [2 = A13 en esta iteración]: deuda bancaria 1.045 + 13 = 1.058; arrendamientos 231; caja 133 + otros activos financieros corrientes 2 + activos financieros no corrientes 9 = 144, que cuadra con la deuda financiera neta de 914 M de Fluidra. Minoritarios 10 a valor contable. Asociadas 86 (Aiper, valor contable de cierre de 2025). otros_ajustes 0: la recompra terminó el 17-sep (ya fuera de la caja) y el primer tramo del dividendo se pagó en julio; el segundo (ex-dividendo 8-dic según MarketScreener) aún va en el precio.' };
const nD = Math.max(...D.fuentes.map((f) => f.id));
D.fuentes.push({ id: nD + 1, titulo: 'Q3 2026 Results (presentación de resultados de los nueve meses de 2026, balance a 30-sep-2026)', editor: 'Fluidra, S.A.', tipo: 'Primaria', fecha: '2026-10-29', url: 'https://www.fluidra.com/wp-content/uploads/2026/10/Q3-26-Eng_-vDEF.pdf' });
D.consenso.guidance = D.consenso.guidance.replaceAll('[2]', `[${nD + 1}]`);
D.dcf.wacc = { ...D.dcf.wacc, tasa_libre_pct: 3.30 };
D.dcf.justificacion.wacc = D.dcf.justificacion.wacc
  .replace('3,49 % el 19 de octubre de 2026 (Bundesbank) [5], frente al 3,57 % del 8 de octubre', '3,30 % el 26 de noviembre de 2026 (Bundesbank) [5], frente al 3,49 % del 19 de octubre')
  .replace('Beta de 1,10: la de Fluidra frente al STOXX Europe 600 con datos mensuales de cinco años [1]; frente al IBEX 35 sale 0,87', 'Beta de 1,10: la de Fluidra frente al STOXX Europe 600 (ETF EXSA) con datos mensuales de cinco años, igual que en octubre (semanal de dos años 1,30) [1]; frente al IBEX 35 sale 0,92')
  .replace('(deuda neta ajustada de unos 1.200 M frente a 3.307 M de capitalización)', '(deuda neta de 1.145 M frente a 3.512 M de capitalización)');
D._actualizado_2026_11_27 = true;

escribir('A.json', A); escribir('C.json', C); escribir('D.json', D);
console.log('A, C y D actualizados. Fuentes A', A.fuentes.length, 'D', D.fuentes.length);

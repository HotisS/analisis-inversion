// actualiza-notas.mjs — Fluidra, iteración del 19-oct-2026.
// Parte de las notas A-D de la iteración del 8-oct (copiadas tal cual en esta carpeta) y aplica lo comprobado a 19-oct:
//  A: cuenta 2021-2023 con el XBRL ESEF oficial (cuentas-xbrl.json) en vez del proveedor; revolving extendida a ene-2029.
//  C: cambio de director financiero (Juan Graham desde el 1-jun-2026, CFO desde el 1-ago) y compra de Manuel Puig (mar-2026).
//  D: precio, rango, volumen, consenso, comparables (al nuevo cierre), Bund, acciones tras la recompra (dato oficial).
// Se ejecuta UNA vez sobre las copias (marca _actualizado_2026_10_19 para no repetir).
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const aqui = dirname(fileURLToPath(import.meta.url));
const leer = (n) => JSON.parse(readFileSync(join(aqui, n), 'utf8'));
const escribir = (n, o) => writeFileSync(join(aqui, n), JSON.stringify(o, null, 2));
const A = leer('A.json'), C = leer('C.json'), D = leer('D.json');
if (D._actualizado_2026_10_19) { console.log('Ya actualizado.'); process.exit(0); }
const X = leer('cuentas-xbrl.json');
const bolsa = leer('bolsa.json');

// ---------------------------------------------------------------- A
const xc = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
for (const r of A.financieros.cuenta) {
  const x = xc[r.periodo];
  if (!x || !['2021', '2022', '2023'].includes(r.periodo)) continue;
  for (const k of ['amortizaciones', 'ebit', 'resultado_financiero', 'bai', 'impuestos', 'minoritarios', 'beneficio_neto']) r[k] = x[k];
  r.ebitda = Math.round((x.ebit + x.amortizaciones) * 10) / 10;
  if (x.gastos_financieros != null) r.gastos_financieros = x.gastos_financieros;
}
const nA = A.fuentes.length + 1;
A.fuentes.push({ id: nA, titulo: 'Cuentas anuales consolidadas de Fluidra, S.A. en formato ESEF (XBRL), ejercicios 2021-2024 (LEI 95980020140005026620)', editor: 'filings.xbrl.org (repositorio ESEF de las cuentas depositadas en la CNMV)', tipo: 'Primaria', fecha: '2025-03-31', url: 'https://filings.xbrl.org/' });
A.financieros.comentario = A.financieros.comentario.replace(
  '2021-2023 vienen de un proveedor de datos y no tienen el detalle de aprovisionamientos, impuestos ni minoritarios.',
  `Las ventas de 2021-2023 son las publicadas (venta de bienes) y el EBIT, la amortización, el resultado financiero, los impuestos y los minoritarios de esos años salen ahora de las cuentas oficiales en XBRL (ESEF) [${nA}]; sin el desglose de aprovisionamientos.`);
A.balance.liquidez = 'A 31-dic-25: caja 121 M y pólizas de crédito no dispuestas por 556 M (límite 557 M, de los que 450 M son la línea revolving sindicada) más 13 M de líneas de descuento; programa de pagarés en el MARF sin saldo [1]. En marzo de 2026 la revolving de 450 M se extendió de enero de 2027 a enero de 2029, con unos 2 M de costes no recurrentes en el resultado financiero del semestre [7]. A 30-jun-26: caja 141 M [3].';
A.balance.comentario = A.balance.comentario.replace('El riesgo de refinanciación está en la revolving de enero de 2027 y en el préstamo de 2029.', 'Tras extender la revolving a enero de 2029 [7], todo el riesgo de refinanciación se concentra en enero de 2029 (préstamo sindicado y revolving).');
A._actualizado_2026_10_19 = 'Cuenta 2021-2023 con ESEF; revolving a 2029.';

// ---------------------------------------------------------------- C
const nC = C.fuentes.length;
C.fuentes.push(
  { id: nC + 1, titulo: 'Otra información relevante: nombramiento de Juan Graham como director financiero (CFO), 28-may-2026', editor: 'Fluidra, S.A. (CNMV)', tipo: 'Primaria', fecha: '2026-05-28', url: 'https://www.cnmv.es/webservices/verdocumento/ver?t=%7bb9ca672a-795e-44e1-86f4-646107ef939e%7d' },
  { id: nC + 2, titulo: 'Fluidra Appoints Juan Graham as Chief Financial Officer (nota de prensa de Business Wire)', editor: '01net', tipo: 'Prensa', fecha: '2026-05-28', url: 'https://www.01net.it/fluidra-appoints-juan-graham-as-chief-financial-officer/' },
  { id: nC + 3, titulo: 'Manuel Puig invierte otros 14 millones en Fluidra y ya tiene el 9%', editor: 'elEconomista', tipo: 'Prensa', fecha: '2026-03-28', url: 'https://www.eleconomista.es/industria/noticias/13847076/03/26/manuel-puig-invierte-otros-14-millones-en-fluidra-y-ya-tiene-el-9.html' },
);
const cfo = C.directivos.equipo.find((e) => /financiero/i.test(e.cargo));
if (cfo) Object.assign(cfo, {
  nombre: 'Juan Graham', cargo: 'Director financiero (CFO)', desde: '2026', participacion_pct: null,
  trayectoria: `Entró en Fluidra y en su comité de dirección el 1-jun-2026 y es director financiero desde el 1-ago-2026, en sustitución de Xavier Tintoré (CFO desde 2010, que sigue apoyando la transición hasta fin de año) [${nC + 1}, ${nC + 2}]. Casi dos décadas en Johnson & Johnson (tesorería, fusiones y finanzas globales) y después director financiero de FibroGen y de Perspective Therapeutics, cotizadas en EE. UU. [${nC + 2}]. Sin historial medible todavía en Fluidra.`,
});
C.directivos.comentario = (C.directivos.comentario || '') + ` El relevo del director financiero (Tintoré, 16 años en el cargo, sustituido por Juan Graham desde el 1-ago-2026) es una sucesión planificada y anunciada con dos meses de solapamiento [${nC + 1}]; el primer cierre que firma el nuevo CFO es el de los nueve meses (29-oct-2026).`;
const puig = C.gobierno.accionistas.find((a) => /Puig/.test(a.nombre));
if (puig) puig.variacion = `Manuel Puig (consejero dominical desde 2023) invirtió otros unos 14 M EUR en marzo de 2026 y supera el 9 % a través de Schwarzsee 2018 [${nC + 3}].`;
C.gobierno.insiders = [
  { fecha: '2026-03-27', persona: 'Manuel Puig Rocha (consejero dominical; Schwarzsee 2018)', operacion: 'Compra', acciones: null, importe: 14.0 },
];
C.gobierno.insiders_sin_operaciones = false;
C.gobierno.alertas = (C.gobierno.alertas || []).map((t) => t.replace('Posiciones cortas publicadas pequeñas: AQR 0,50 % (20-ago-2026) y Connor, Clark & Lunn 0,60 % (1-jul-2026) [8].', 'Posiciones cortas publicadas pequeñas, sin cambios a 19-oct-2026: AQR 0,50 % (20-ago-2026) y Connor, Clark & Lunn 0,60 % (1-jul-2026) [8].'));
C.gobierno.alertas.push(`Cambio de director financiero en 2026 (Xavier Tintoré, CFO desde 2010, sustituido por Juan Graham desde el 1-ago), planificado y con solapamiento [${nC + 1}].`);
C.huecos = (C.huecos || []).map((h) => h.campo.startsWith('Operaciones de consejeros') ? { ...h, campo: 'Operaciones de consejeros y directivos de los últimos 12 meses (registro completo)', intentos: '1) Registro de notificaciones de directivos de la CNMV por NIF (403 en todas las variantes, también el 19-oct-2026); 2) ficha de la entidad en la CNMV (carga por JavaScript); 3) prensa: solo la compra de Manuel Puig de marzo de 2026 (elEconomista)', decision: 'Se recoge la compra publicada; el resto, omitido' } : h);
C._actualizado_2026_10_19 = 'CFO y compra de Puig.';

// ---------------------------------------------------------------- D
const id = bolsa.identificacion;
Object.assign(D.identificacion, {
  precio: id.precio, fecha_precio: id.fecha_precio, max_52s: id.max_52s, min_52s: id.min_52s,
  acciones: 187.8, capitalizacion_publicada: 3340,
  volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M EUR/día (${Math.round(bolsa.volumen_3m.acciones_dia / 1000)}.000 acciones, 3 meses) [1]`,
  proximos_resultados: '2026-10-29',
});
const f = (n) => D.fuentes.find((x) => x.id === n);
f(1).titulo = 'Históricos diarios y dividendos de FDR.MC, ^IBEX, ^STOXX, EXH4.DE y de los comparables hasta el 19-oct-2026'; f(1).fecha = '2026-10-19';
f(4).fecha = '2026-10-19';
f(5).fecha = '2026-10-19';
f(7).fecha = '2026-10-19'; f(8).fecha = '2026-10-19';
f(15).titulo = 'Tipos de cambio de referencia del euro (USD, CHF), 8 al 19-oct-2026'; f(15).fecha = '2026-10-19';
f(15).url = 'https://data-api.ecb.europa.eu/service/data/EXR/D.USD+CHF.EUR.SP00.A?startPeriod=2026-10-07&format=csvdata';
f(39).fecha = '2026-10-19';
const nD = D.fuentes.length;
const gn = 'https://news.google.com/rss/articles/';
D.fuentes.push({ id: nD + 2, titulo: 'Bestinver upgrades Fluidra stock from Hold to Buy', editor: 'ad-hoc-news.de', tipo: 'Prensa', fecha: '2026-10-07', url: gn + 'CBMisgFBVV95cUxOVGZaQUZDQmNVUWdPR2RIMnAwSTJMYTVtbVFuUC1UTUMzTnhwMDlxTUc5d0Z4amQ3amtfbUlaWElTb0M4bnNRNmVOUldnWWpjSE5XV21yWndLcE9xdC1qZFdfeEs1OFVrMGxDcGhTc2VKV0V0VW1fWG4taWRoN2xKV2R2aF9PZjFuZ2hDYWxLUHFoSUVfZndYNW9qTHAxVmNoY2RDTkdfVTlnblcwMUVYZ1VR' },
  { id: nD + 3, titulo: 'JPMorgan raises target for Fluidra stock to EUR 28.00', editor: 'ad-hoc-news.de', tipo: 'Prensa', fecha: '2026-10-15', url: gn + 'CBMitwFBVV95cUxOTDdNN0VKMEhsTnE1blltd1QyaUFhNGl3RXozV2V3dmQ4cUoyejNiel9LNnhtQjdHVzVhMFd6a0pzbGdiay1naVc2czVuM0hLVDFrNUlhUmUyUkQxMHIzbGdpWWtmWHlfbGxOS1lsamdiMHFmM3duLWgzSDlGRXJnYU9ONXJkdzd5cFIySEhMZWJKWFBqZWstWklMTEs3NmY0UmRNM3ZRRFJZcC1udE1IVE03SFpOOWc' },
  { id: nD + 4, titulo: 'Barclays cuts target for Fluidra stock from EUR 20 to EUR 19', editor: 'ad-hoc-news.de', tipo: 'Prensa', fecha: '2026-10-19', url: gn + 'CBMiwAFBVV95cUxPUUR6d3pIRmE0RzZsVEhiQXV2WGVHOFVIYnFzaE1qOXFZWk9PVC1DekRKc1JoSmtoelRHUjNHM0w5d3I4Rjl4WDdzamY0djlmQ1FQNkQ2TDNtVnREenVYOWhBWFk2N3ZlNDRKS25PcEU4VVVDcENoVjE2dGtLWHpKMmgtSlVFSjNselNBSjRiQ1ltN2x4TGFVRlJRNk9EdlY5c1lEQzJPb1VRLTBEY2lNX3JBYTRpOW9ka21pWklSR0U' });
D.fuentes.push({ id: nD + 1, titulo: 'Otra información relevante: finalización del programa de recompra (2.071.424 acciones por 40 M EUR, 17-sep-2026) y reanudación del contrato de liquidez', editor: 'Fluidra, S.A. (CNMV)', tipo: 'Primaria', fecha: '2026-09-18', url: 'https://www.cnmv.es/webservices/verdocumento/ver?t=%7bc9f61fa4-8799-44cc-957a-61c90363371b%7d' });

// Consenso de MarketScreener a 19-oct (EBITDA ajustado, BPA contable).
D.consenso.estimaciones = [
  { periodo: '2026e', ingresos: 2266, ebitda: 529.5, ebit: 343.7, bpa: 0.97, dpa: 0.68, fuente: 'MarketScreener, consenso a 19-oct-2026 [7]' },
  { periodo: '2027e', ingresos: 2387, ebitda: 577.1, ebit: 405.4, bpa: 1.27, dpa: 0.76, fuente: 'MarketScreener, consenso a 19-oct-2026 [7]' },
  { periodo: '2028e', ingresos: 2505, ebitda: 622.3, ebit: 453.8, bpa: 1.49, dpa: 0.85, fuente: 'MarketScreener, consenso a 19-oct-2026 [7]' },
];
D.consenso.recomendaciones = { n_analistas: 15, comprar: 12, mantener: 3, vender: 0, po_medio: 25.93, po_min: 19, po_max: 31 };
D.consenso.revisiones = `Las estimaciones completas vienen de un solo proveedor gratuito (MarketScreener) [7]. Frente al 8-oct, el consenso recorta un poco: BPA de 2026e de 0,98 a 0,97 EUR, de 2027e de 1,28 a 1,27 y de 2028e de 1,50 a 1,49; EBITDA ajustado de 2026e de 531,6 a 529,5 M; el precio objetivo medio pasa de 26,03 a 25,93 EUR (15 analistas, mínimo 19 y máximo 31) [7, 8]. El EBITDA del consenso es el ajustado de Fluidra (501 M en 2025, el publicado) y el BPA es el contable (0,92 EUR en 2025), no el ajustado de la compañía (1,30 EUR) [7, 13]. En octubre: Bestinver sube a comprar (7-oct), JP Morgan sube el objetivo a 28 EUR (15-oct) y Barclays, que ya estaba en mantener, lo baja de 20 a 19 EUR (19-oct), según la prensa financiera [${nD + 2}, ${nD + 3}, ${nD + 4}]. No hay serie gratuita de revisiones del BPA y del EBITDA a 3 y 12 meses.`;

// Comparables al nuevo cierre: precio de cierre (EE. UU. 16-oct, última sesión completa; Europa 19-oct) frente al del 8-oct y
// tipo del BCE del mismo día. El valor empresa se mueve con la capitalización (deuda neta igual); EBITDA, ventas y BPA estimados, sin cambio.
const precios = { POOL: [158.14, 172.57], HAYW: [11.44, 11.83], PNR: [52.30, 53.44], AOS: [56.56, 59.22], WTS: [347.14, 356.70], ZWS: [46.24, 47.06], GEBN: [523.80, 556.00], AALB: [41.52, 41.18] };
const fx = { US: 1.1186 / 1.1253, CH: 0.9326 / 0.9261, NL: 1 };
const r1 = (x) => Math.round(x * 10) / 10, r2 = (x) => Math.round(x * 100) / 100;
for (const e of D.comparables.empresas) {
  const p = precios[e.ticker]; if (!p) continue;
  const k = (p[1] / p[0]) * fx[e.pais];
  const evViejo = e.capitalizacion / (1 - (e.dn_ebitda || 0) / e.ev_ebitda_ltm);
  const capNuevo = e.capitalizacion * k;
  const evNuevo = evViejo + (capNuevo - e.capitalizacion);
  const m = evNuevo / evViejo;
  Object.assign(e, {
    capitalizacion: Math.round(capNuevo), ev_ventas: r2(e.ev_ventas * m), ev_ebitda_ltm: r1(e.ev_ebitda_ltm * m), ev_ebitda_ntm: r1(e.ev_ebitda_ntm * m),
    per_ntm: r1(e.per_ntm * k / fx[e.pais]), fcf_yield_pct: r1(e.fcf_yield_pct / (k / fx[e.pais])),
  });
}
D.comparables.criterio = D.comparables.criterio.replace('Cifras de MarketScreener a 8-oct-2026 (precio, acciones, deuda neta de cierre de 2025 y consenso) convertidas al euro con el BCE del 8-oct (1,1186 USD y 0,9326 CHF por euro) [15]', 'Cifras de MarketScreener del 8-oct-2026 (acciones, deuda neta de cierre de 2025 y consenso) llevadas al cierre del 19-oct (16-oct en EE. UU., última sesión completa) con la variación de cada cotización en Yahoo [1] y convertidas al euro con el BCE del mismo día (1,1253 USD y 0,9261 CHF por euro) [15]');

// WACC: Bund del 19-oct.
D.dcf.wacc.tasa_libre_pct = 3.49;
D.dcf.justificacion.wacc = D.dcf.justificacion.wacc
  .replace('3,57 % el 8 de octubre de 2026 (Bundesbank) [5]; la curva AAA del área euro del BCE daba 3,54 % el día anterior [16]', '3,49 % el 19 de octubre de 2026 (Bundesbank) [5], frente al 3,57 % del 8 de octubre')
  .replace('Peso de la deuda del 27 % a valor de mercado.', 'Peso de la deuda del 26 % a valor de mercado (deuda neta ajustada de unos 1.200 M frente a 3.307 M de capitalización).');
D.dcf.wacc.peso_deuda_pct = 26;

// Acciones: dato oficial de la recompra; se retira el hueco de la estimación.
D.huecos = (D.huecos || []).filter((h) => !/recompra/.test(h.campo));
D.notas_integrador.acciones = `Acciones emitidas 192.129.070 [10, 13]; autocartera antes de la recompra 2.236.041 [10]; recompra terminada el 17-sep-2026 con 2.071.424 acciones por 40 M EUR (OIR en la CNMV) [${nD + 1}]: 192,13 − 2,24 − 2,07 = 187,82 M en circulación. Las acciones de la recompra se amortizarán antes de la próxima junta.`;
D._actualizado_2026_10_19 = 'Precio, consenso, comparables, Bund y acciones a 19-oct-2026.';

escribir('A.json', A); escribir('C.json', C); escribir('D.json', D);
console.log('Notas A, C y D actualizadas a 19-oct-2026.');
for (const e of D.comparables.empresas) console.log(e.ticker, e.capitalizacion, e.ev_ebitda_ltm, e.ev_ebitda_ntm, e.per_ntm);

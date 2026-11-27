// Escribe las notas A-E de Krones (corte 2026-11-27). Parte de las notas del 9-oct-2026 SOLO para lo que no cambia
// (cuentas anuales auditadas 2018-2025, historia, sector, consejo), comprobado contra el informe del 3T26 (balance a
// 31-dic-2025 igual: caja 549,5, patrimonio 2.128,7), y rehace todo lo que se mueve: 3T26 y 9M26 (informe trimestral
// y presentación del 6-nov-2026), LTM a sep-26, puente a 30-sep-26, guía rebajada del 22-oct-2026, consenso de
// Yahoo del 27-nov, objetivos de los bancos tras el aviso, bolsa al 26-nov (bolsa.mjs), Bund del 26-nov,
// comparables rehechos con Yahoo (27-nov) y tipos del BCE del 26-nov, compra de una consejera del 12-oct y sentimiento.
// Ejecutar: node informes/krones-2026-11-27/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const ant = path.join(dir, '..', '..', 'krones-2026-10-09', 'notas');
const lee = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const A = lee(path.join(ant, 'A.json'));
const B = lee(path.join(ant, 'B.json'));
const C = lee(path.join(ant, 'C.json'));
const D = lee(path.join(ant, 'D.json'));
const BOLSA = lee(path.join(dir, 'bolsa.json'));
const YQ = lee(path.join(dir, 'docs', 'yahoo-quotesummary-2026-11-27.json'));
const r = (x) => (x && typeof x === 'object' && 'raw' in x ? x.raw : x);
const red = (x, d = 1) => (x == null || !isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);

const Q3 = 'https://www.krones.com/media/downloads/Q3_2026_e.pdf';
const CC3 = 'https://www.krones.com/media/downloads/Conference-Call_Q3_2026.pdf';

// ---------------------------------------------------------------- A. Cuentas
{
  const nA = A.fuentes.length;
  A.fuentes.push(
    { id: nA + 1, titulo: 'Krones AG, Quarterly statement for the period from 1 January to 30 September 2026 (cuenta, balance, flujos y segmentos; guía rebajada)', editor: 'Krones AG', tipo: 'Primaria', fecha: '2026-11-06', url: Q3 },
    { id: nA + 2, titulo: 'Krones AG, Q3 2026 Conference Call (presentación del 6-nov-2026: pedidos y ventas por trimestre, circulante, flujo libre, objetivos 2028)', editor: 'Krones AG', tipo: 'Primaria', fecha: '2026-11-06', url: CC3 },
    { id: nA + 3, titulo: 'Ricker startet als Krones-Chef am Ende einer Boomphase (entrevista al primer ejecutivo tras el 3T26)', editor: 'Börsen-Zeitung', tipo: 'Prensa', fecha: '2026-11-06', url: 'https://www.boersen-zeitung.de/personen/ceo-seit-juni-erstmals-quartalszahlen-unter-seiner-verantwortung-grundlage' },
  );
  const fQ3 = nA + 1, fCC = nA + 2, fBZ = nA + 3;
  // Trimestres: entra el 3T26, sale el 3T24.
  A.trimestres.items = A.trimestres.items.filter((t) => t.periodo !== '3T24');
  A.trimestres.items.push({ periodo: '3T26', ingresos: 1384.8, crecimiento_pct: 0.3, crecimiento_organico_pct: -1.2, ebitda: 160.3, margen_ebitda_pct: 11.6, bpa: 2.55, vs_consenso: null });
  A.trimestres.ultima_presentacion = `En la conferencia del 6 de noviembre de 2026, la primera completa con Thomas Ricker de primer ejecutivo, la dirección defendió los márgenes y rebajó el crecimiento: la guía de 2026 pasa del 3-5 % al 1-2 % de ventas sin divisas (anunciado el 22 de octubre), con el margen EBITDA del 10,7-11,1 % y el ROCE del 19-20 % confirmados, y el objetivo de 2028 baja de unos 7.000 M a 6.000-6.200 M de ventas con un margen del 11-12 % (antes 11-13 %) [${fQ3}, ${fCC}]. En julio el discurso todavía era de una cartera que cubría 2026 y una incertidumbre que «afecta a algunos clientes» [12]; en noviembre la causa es explícita: Oriente Medio encarece la energía, el PET, el vidrio y la lata de los clientes y retrasa sus decisiones de inversión, sobre todo en cervecerías y en máquinas de inyección [${fQ3}, ${fBZ}].

Las cifras del trimestre son mejores que el mensaje: ventas de 1.384,8 M (+0,3 %; −1,2 % de pedidos sin divisas), EBITDA de 160,3 M (11,6 %; 10,7 % sin los unos 10 M de devolución de aranceles de EE. UU. acumulados en el año) y BPA de 2,55 EUR frente a 2,15 [${fQ3}]. Los pedidos de los nueve meses suben un 2,9 % (relación pedidos/ventas de 1,03) y la cartera sigue en 4.314 M, pero parte se factura a finales de 2027 o en 2028 [${fCC}, ${fBZ}]. El flujo libre sin compras es de −5,0 M en nueve meses (+25,8 M en el 3T) por proveedores a la baja y existencias de seguridad [${fCC}]. Ricker espera para 2027 un crecimiento «ligero» y dice que no hay cancelaciones anómalas [${fBZ}]. No hemos podido leer las preguntas de los analistas (la transcripción es de pago): no sabemos qué evitó contestar la dirección más allá de no dar cifra para 2027. Los trimestres de 2024-2026 salen de los informes trimestrales y de la diferencia con las cifras anuales [1, 3, 10, 11, 13, ${fQ3}].`;
  A.trimestres.confianza = 'Alta';
  // LTM a 30-sep-2026 = 2025 − 9M25 + 9M26.
  A.financieros.ltm = { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 5656.1, ebitda: 624.7, ebit: 426.5, beneficio_neto: 304.8, bpa: 9.64, dpa: 2.8, dpa_extraordinario: 0, fcf: 130.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -10 };
  A.financieros.ajustes = (A.financieros.ajustes || '') + ` En los nueve meses de 2026 hay un efecto no recurrente: la devolución de aranceles de EE. UU. reduce las ventas en unos 20 M (sin efecto en resultados) y el coste de materiales en unos 30 M, con un efecto neto de unos +10 M en el EBITDA (10,8 % de margen sin él frente al 11,1 % publicado); va en el LTM como no recurrente (−10 M) [${fQ3}].`;
  // KPI al día.
  const k = A.negocio.kpis;
  k[0].comentario = `Nueve meses de 2026: 4.223,6 M (+2,9 %), 3T 1.371,1 M (−0,2 %); relación pedidos/ventas de 1,03 y «algo por encima de 1» esperada en el año [${fQ3}, ${fCC}].`;
  k[1].comentario = `4.314,3 M a 30-sep-26 (+3,0 % sobre diciembre y +0,6 % interanual); parte se factura a finales de 2027 o después [${fQ3}].`;
  k[2].comentario = `LTM a sep-26: 5.656,1 M; nueve meses −0,2 % reportado y +0,8 % sin divisas; guía 2026 rebajada al 1-2 % sin divisas [${fQ3}].`;
  k[3].comentario = `11,1 % en los nueve meses de 2026 (10,8 % sin la devolución de aranceles); guía 2026 del 10,7-11,1 % confirmada [${fQ3}].`;
  k[4].comentario = `17,6 % a 30-sep-26 (19,5 % un año antes) por más capital empleado; guía 2026 del 19-20 % [${fQ3}].`;
  k[5].comentario = `18,9 % de media de cuatro trimestres a 30-sep-26 (17,2 % un año antes) y 20,5 % al cierre del trimestre [${fQ3}].`;
  k[6].comentario = `21.411 a 30-sep-26 [${fQ3}].`;
  A.balance.comentario = (A.balance.comentario || '') + ` A 30 de septiembre de 2026 la caja baja a 410,6 M (549,5 M en diciembre) por el dividendo de 88,5 M y el flujo libre negativo; el circulante medio sube al 18,9 % de las ventas, sobre todo porque los proveedores bajan 124,6 M, y quedan 982 M de líneas sin disponer [${fQ3}, ${fCC}].`;
  A.flujos.comentario = (A.flujos.comentario || '') + ` En los nueve meses de 2026: flujo operativo de 130,1 M (174,1 M), capex de 152,5 M (3,7 % de las ventas, por las plantas de India, China y EE. UU.) y flujo libre sin compras de −5,0 M (+80,2 M) [${fQ3}].`;
  A.huecos = A.huecos.filter((h) => h.campo !== 'Arrendamientos a 30-jun-26');
  A.huecos.push({ seccion: 'balance', campo: 'Arrendamientos a 30-sep-26', tipo: 'Complemento', intentos: '1) Balance del 3T26: agrupa arrendamientos y otros pasivos financieros (119,2 M no corrientes y 73,4 M corrientes); 2) presentación del 3T26: sin desglose; 3) estimación: total menos los 31,7 M de pagos aplazados y opciones de venta y 1,9 M de otros pasivos a coste amortizado del semestral', decision: 'Calculado y marcado como estimación' });
  A.huecos.push({ seccion: 'trimestres', campo: 'Preguntas de los analistas en la conferencia del 3T26', tipo: 'Complemento', intentos: '1) Web de Krones: solo la presentación; 2) Seeking Alpha: transcripción de pago (solo la apertura visible); 3) MarketBeat y prensa: sin acceso o sin el turno de preguntas; se usa la entrevista de Börsen-Zeitung', decision: 'Omitido' });
  A._estado = 'completo (iteración 27-nov-2026)';
  guarda('A', A);
}

// ---------------------------------------------------------------- B. Sector (no cambia salvo la nota de ciclo)
{
  const nB = B.fuentes.length;
  B.fuentes.push({ id: nB + 1, titulo: 'Krones AG, Quarterly statement 9M 2026 (pedidos por región y causa de la rebaja)', editor: 'Krones AG', tipo: 'Primaria', fecha: '2026-11-06', url: Q3 });
  B.sector.ciclo.comentario = (B.sector.ciclo.comentario || '') + ` En octubre de 2026 la dirección rebajó el crecimiento por la subida de costes de los clientes tras la crisis de Oriente Medio; los pedidos de nueve meses aún suben un 2,9 %, con China, Asia Central y Oriente Medio/África a la baja [${nB + 1}].`;
  B._estado = 'completo (iteración 27-nov-2026; sector, competencia, historia y ESG del 9-oct, sin cambios materiales)';
  guarda('B', B);
}

// ---------------------------------------------------------------- C. Gobierno
{
  const nC = C.fuentes.length;
  C.fuentes.push(
    { id: nC + 1, titulo: 'Krones AG, director deals (operaciones de directivos notificadas, art. 19 MAR)', editor: 'Hargreaves Lansdown (datos de EQS/BaFin)', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://www.hl.co.uk/shares/shares-search-results/k/krones-ag-ord-npv-5523881/director-deals' },
    { id: nC + 2, titulo: 'Krones AG, Quarterly statement 9M 2026 (accionariado a 31-oct-2026, consejo y comité de dirección)', editor: 'Krones AG', tipo: 'Primaria', fecha: '2026-11-06', url: Q3 },
    { id: nC + 3, titulo: 'EQS-Adhoc: Krones adjusts its revenue growth forecast for fiscal year 2026 and medium term targets for 2028', editor: 'Krones AG / Deutsche Börse', tipo: 'Primaria', fecha: '2026-10-22', url: 'https://live.deutsche-boerse.com/news/EQS-Adhoc-Krones-Aktiengesellschaft-Krones-adjusts-its-revenue-growth-forecast-for-fiscal-year-2026-and-medium-term-targets-for-2028-210c85d5-9b30-475a-bf20-4c264b514380' },
  );
  C.gobierno.insiders.push({ fecha: '2026-10-12', persona: 'Schawei GmbH (persona estrechamente vinculada a la consejera Petra Schadeberg-Herrmann)', operacion: 'Compra', acciones: 5200, importe: 0.55 });
  C.gobierno.accionistas[0].variacion = `Estable; 51,86 % a 31-oct-2026 [${nC + 2}]`;
  C.gobierno.accionistas[1].variacion = `5,78 % a 30-sep-2026; la sociedad vinculada Schawei vendió 4.200 acciones a 142,35 EUR en enero y compró 5.200 a 105,02 EUR el 12-oct-2026 [${nC + 2}, ${nC + 1}]`;
  C.directivos.historial_guidance.push({ anio: '2026', guia: `Ventas +3-5 % sin divisas, margen EBITDA del 10,7-11,1 % y ROCE del 19-20 % (feb-2026) [1]`, real: `Rebajada el 22-oct-2026 a ventas +1-2 % sin divisas; margen y ROCE confirmados; nueve meses: +0,8 %, 11,1 % y 17,6 % [${nC + 3}, ${nC + 2}]`, cumplida: 'Parcial' });
  C.directivos.historial_guidance.push({ anio: '2028 (plan a medio plazo)', guia: 'Plan de julio de 2024: unos 7.000 M de ventas, margen EBITDA del 11-13 % y ROCE > 20 % [1]', real: `Rebajado el 22-oct-2026 a 6.000-6.200 M y margen del 11-12 %; ROCE > 20 % confirmado [${nC + 3}]`, cumplida: 'No' });
  C.directivos.comentario = (C.directivos.comentario || '') + ` El primer acto relevante de Thomas Ricker como primer ejecutivo fue rebajar en octubre de 2026 el plan de 2028 de su predecesor (de unos 7.000 a 6.000-6.200 M de ventas): resta credibilidad al plan anterior, pero el objetivo nuevo pide solo un 3 % anual [${nC + 3}].`;
  C._estado = 'completo (iteración 27-nov-2026)';
  guarda('C', C);
}

// ---------------------------------------------------------------- D. Mercado y valoración
{
  const id = BOLSA.identificacion;
  D.identificacion = { ...D.identificacion, precio: id.precio, fecha_precio: id.fecha_precio, max_52s: id.max_52s, min_52s: id.min_52s, empleados: 21411, capitalizacion_publicada: null, volumen_medio_diario: `≈ ${String(BOLSA.volumen_3m.importe_dia_millones).replace('.', ',')} M EUR/día (${BOLSA.volumen_3m.acciones_dia.toLocaleString('es-ES')} acciones, 3 meses)`, proximos_resultados: '2027-02-18', free_float_pct: 42.36 };
  // Fuentes nuevas de D (se renumeran desde el final de la lista anterior, que se conserva para lo que sigue igual).
  const n = Math.max(...D.fuentes.map((f) => f.id));
  const F = {
    yahoo: n + 1, yq: n + 2, sa: n + 3, gold: n + 4, rtt: n + 5, bund: n + 6, bce: n + 7, dam: n + 8, q3: n + 9, adhoc: n + 10, bz: n + 11, msc: n + 12, bzi: n + 13,
  };
  D.fuentes.push(
    { id: F.yahoo, titulo: 'Históricos diarios de KRN.DE, iShares Core MDAX (EXS3.DE) e iShares STOXX Europe 600 Industrial Goods (EXH4.DE) hasta el 26-nov-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-26', url: 'https://finance.yahoo.com/quote/KRN.DE/history/' },
    { id: F.yq, titulo: 'Krones y comparables: cotización, valor empresa, EBITDA, BPA estimado (earningsTrend) y objetivos de los analistas (quoteSummary)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-27', url: 'https://finance.yahoo.com/quote/KRN.DE/analysis/' },
    { id: F.sa, titulo: 'Krones AG (ETR: KRN) Stock Forecast and Price Target', editor: 'Stock Analysis (S&P Global)', tipo: 'Analistas', fecha: '2026-10-27', url: 'https://stockanalysis.com/quote/etr/KRN/forecast/' },
    { id: F.gold, titulo: 'Krones Aktie: Prognosesenkung löst neue Kurszielkürzungen aus', editor: 'goldesel.de', tipo: 'Prensa', fecha: '2026-10-23', url: 'https://goldesel.de/aktien/news/krones-aktie-prognosesenkung-lost-neue-kurszielkurzungen-aus' },
    { id: F.rtt, titulo: 'Krones Cuts FY26 Revenue Growth Outlook; Shares Fall', editor: 'RTTNews', tipo: 'Prensa', fecha: '2026-10-22', url: 'https://www.rttnews.com/3701814/krones-cuts-fy26-revenue-growth-outlook-shares-fall.aspx' },
    { id: F.bund, titulo: 'Rendimiento del Bund a 10 años (Svensson, serie diaria BBSIS): 3,32 % el 26-nov-2026', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-11-26', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A' },
    { id: F.bce, titulo: 'Tipos de cambio de referencia del euro del 26-nov-2026 (USD 1,0975; CHF 0,9153; SEK 11,2025; NOK 10,7180)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-11-26', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
    { id: F.dam, titulo: 'Implied ERP by month (ERPbymonth.xlsx), noviembre de 2026: 4,41 %', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-11', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: F.q3, titulo: 'Krones AG, Quarterly statement 9M 2026 (balance a 30-sep-2026)', editor: 'Krones AG', tipo: 'Primaria', fecha: '2026-11-06', url: Q3 },
    { id: F.adhoc, titulo: 'EQS-Adhoc: Krones adjusts its revenue growth forecast for fiscal year 2026 and medium term targets for 2028', editor: 'Krones AG / Deutsche Börse', tipo: 'Primaria', fecha: '2026-10-22', url: 'https://live.deutsche-boerse.com/news/EQS-Adhoc-Krones-Aktiengesellschaft-Krones-adjusts-its-revenue-growth-forecast-for-fiscal-year-2026-and-medium-term-targets-for-2028-210c85d5-9b30-475a-bf20-4c264b514380' },
    { id: F.bz, titulo: 'Krones wächst langsamer als erwartet (reacción del 22-oct-2026)', editor: 'Börsen-Zeitung', tipo: 'Prensa', fecha: '2026-10-22', url: 'https://www.boersen-zeitung.de/unternehmen-branchen/krones-macht-abstriche-an-umsatzzielen' },
    { id: F.bzi, titulo: 'Ricker startet als Krones-Chef am Ende einer Boomphase (entrevista al primer ejecutivo tras el 3T26)', editor: 'Börsen-Zeitung', tipo: 'Prensa', fecha: '2026-11-06', url: 'https://www.boersen-zeitung.de/personen/ceo-seit-juni-erstmals-quartalszahlen-unter-seiner-verantwortung-grundlage' },
    { id: F.msc, titulo: 'Krones AG: datos financieros y estimaciones 2025-2028 (página anterior al aviso del 22-oct)', editor: 'MarketScreener (S&P Global)', tipo: 'Datos de mercado', fecha: '2026-10-22', url: 'https://www.marketscreener.com/quote/stock/KRONES-AG-436341/finances/' },
  );
  // Consenso: Yahoo al 27-nov (posterior a resultados) para 2026e-2027e; 2028e solo de MarketScreener del 22-oct (anterior al aviso).
  const k = YQ['KRN.DE'];
  const tr = Object.fromEntries((k.earningsTrend?.trend ?? []).map((t) => [t.period, t]));
  const e26 = tr['0y'], e27 = tr['+1y'];
  D.consenso.guidance = `El 22 de octubre de 2026 Krones rebajó la guía de 2026: ventas +1-2 % sin divisas (antes +3-5 %), con el margen EBITDA del 10,7-11,1 % y el ROCE del 19-20 % confirmados; lo repitió el 6 de noviembre con los nueve meses (+0,8 %, 11,1 % y 17,6 %) [${F.adhoc}, ${F.q3}]. El objetivo de 2028 baja de unos 7.000 M de ventas a 6.000-6.200 M (un 3 % anual desde los 5.664 M de 2025), con un margen EBITDA del 11-12 % (antes 11-13 %) y un ROCE superior al 20 % [${F.adhoc}]. Por segmentos, llenado y envasado pasa a −1/+1 % (antes +2-4 %), Intralogistics sube a +10-15 % y Process Technology sigue en 0-5 % [${F.q3}]. Para 2027 el primer ejecutivo solo habla de un crecimiento «ligero» [${F.bzi}].`;
  D.consenso.estimaciones = [
    { periodo: '2026e', ingresos: red(r(e26.revenueEstimate.avg) / 1e6, 0), ebitda: null, ebit: null, bpa: red(r(e26.earningsEstimate.avg), 2), dpa: null, fuente: `Yahoo Finance (earningsTrend), ${r(e26.earningsEstimate.numberOfAnalysts)} analistas, 27-nov-2026 [${F.yq}]` },
    { periodo: '2027e', ingresos: red(r(e27.revenueEstimate.avg) / 1e6, 0), ebitda: null, ebit: null, bpa: red(r(e27.earningsEstimate.avg), 2), dpa: null, fuente: `Yahoo Finance (earningsTrend), ${r(e27.earningsEstimate.numberOfAnalysts)} analistas, 27-nov-2026 [${F.yq}]` },
    { periodo: '2028e', ingresos: 6393, ebitda: 723.7, ebit: 515, bpa: 12.01, dpa: 3.58, fuente: `MarketScreener (S&P Global), página del 22-oct-2026, anterior al aviso: sin actualizar [${F.msc}]` },
  ];
  const fd = k.financialData;
  D.consenso.recomendaciones = { n_analistas: 14, comprar: 9, mantener: 5, vender: 0, po_medio: red(r(fd.targetMeanPrice), 2), po_min: r(fd.targetLowPrice), po_max: r(fd.targetHighPrice) };
  D.consenso.revisiones = `Las estimaciones bajan desde el verano: el BPA de 2026e del consenso pasa de ${String(red(r(e26.epsTrend['90daysAgo']), 2)).replace('.', ',')} EUR hace 90 días a ${String(red(r(e26.earningsEstimate.avg), 2)).replace('.', ',')} EUR (−${String(red((1 - r(e26.earningsEstimate.avg) / r(e26.epsTrend['90daysAgo'])) * 100, 1)).replace('.', ',')} %) y el de 2027e de ${String(red(r(e27.epsTrend['90daysAgo']), 2)).replace('.', ',')} a ${String(red(r(e27.earningsEstimate.avg), 2)).replace('.', ',')} EUR (−${String(red((1 - r(e27.earningsEstimate.avg) / r(e27.epsTrend['90daysAgo'])) * 100, 1)).replace('.', ',')} %) [${F.yq}]. Tras el aviso del 22-oct, seis bancos recortaron objetivos: MPCM 177 → 173 EUR, Oddo BHF 138 → 134, Berenberg 164 → 158, Bernstein 111 → 108 (mantener), MWB 150 → 140 y LBBW 130 → 120, con rebaja de comprar a mantener [${F.gold}]; Bernstein ya había avisado en septiembre de un 2027 plano en pedidos [8]. El objetivo medio de Yahoo es de ${String(red(r(fd.targetMeanPrice), 2)).replace('.', ',')} EUR (${r(fd.numberOfAnalystOpinions)} analistas, 105-173) y el de S&P Global, 141,80 EUR [${F.yq}, ${F.sa}]; la empresa contaba 9 comprar y 5 mantener entre 14 bancos a 31-oct [${F.q3}]. El 2028e de MarketScreener (12,01 EUR) es anterior al aviso y está sin actualizar.`;
  D.consenso.confianza = 'Media';
  // Bolsa.
  const bb = BOLSA.bolsa;
  D.bolsa = { ...D.bolsa, rentabilidades: bb.rentabilidades, anual: bb.anual, volatilidad_pct: bb.volatilidad_pct, max_drawdown_pct: bb.max_drawdown_pct };
  D.bolsa.comentario = `Krones pierde un 21,9 % en el año con dividendos, frente al −5,3 % del ETF del MDAX y el +3,6 % del de bienes de equipo europeos, y un 17,7 % en doce meses [${F.yahoo}]. Tras cinco años de subidas (2021-2025), la acción empezó 2026 en 135,80 EUR, cayó un 7,1 % el 19-feb con la guía, sufrió con Oriente Medio desde marzo y con las dudas de Bernstein en septiembre, y el 22-oct llegó a caer casi un 9 % intradía (a 105 EUR) con la rebaja de la guía y del plan de 2028, para cerrar con −3 %/−4 % [${F.bz}, ${F.rtt}]. El 20-nov marcó el mínimo de 52 semanas (101,20 EUR) [${F.yahoo}]. A cinco años sigue batiendo al MDAX (4,8 % anual frente a −3,5 %), pero queda muy por debajo del sector (9,6 %) [${F.yahoo}]. La única posición corta del registro (0,52 %) data de 2018 [10].`;
  // Múltiplos históricos: cierres de bolsa.mjs.
  D.multiplos_historicos.serie = BOLSA.cierres_ejercicio.filter((c) => +c.anio >= 2018).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: c.anio === '2019' || c.anio === '2020' }));
  D.multiplos_historicos.comentario = `Al cierre del 26-nov-2026 (103,40 EUR) Krones cotiza a unas 10,7 veces el BPA de los últimos doce meses (9,64 EUR) y a unas 10 veces el de 2027e del consenso, frente a 13-15 veces al cierre de 2022-2025 con el BPA de cada año [${F.yahoo}, ${F.yq}]. 2019 y 2020 se excluyen (BPA de 0,30 EUR y pérdidas). El descuento ya no es solo de visibilidad: la propia empresa ha rebajado el crecimiento de 2026 y el plan de 2028, aunque el margen y el BPA siguen subiendo (BPA de nueve meses +2,8 %) [${F.adhoc}, ${F.q3}].`;
  // Comparables rehechos con Yahoo al 27-nov y tipos del BCE del 26-nov.
  const FX = { EUR: 1, USD: 1.0975, CHF: 0.9153, SEK: 11.2025, NOK: 10.718 };
  // Divisa en que Yahoo da las cuentas y el BPA (financialCurrency), cuando no coincide con la de cotización.
  const FIN = { 'SIGN.SW': 'EUR', 'TOM.OL': 'EUR' };
  const nombres = { 'G1A.DE': ['GEA Group', 'G1A', 'DE'], 'SIGN.SW': ['SIG Group', 'SIGN', 'CH'], 'TOM.OL': ['Tomra Systems', 'TOM', 'NO'], JBTM: ['JBT Marel', 'JBTM', 'US'], 'ALFA.ST': ['Alfa Laval', 'ALFA', 'SE'], 'BUCN.SW': ['Bucher Industries', 'BUCN', 'CH'], 'INRN.SW': ['Interroll', 'INRN', 'CH'] };
  D.comparables.empresas = Object.entries(nombres).map(([s, [nom, tic, pais]]) => {
    const q = YQ[s]; const p = q.price; const ks = q.defaultKeyStatistics; const f = q.financialData;
    const dc = p.currency; const df = FIN[s] || dc;
    const cap = r(p.marketCap) / 1e6 / FX[dc];
    const ev = r(ks.enterpriseValue) / 1e6 / FX[dc];
    const ventas = r(f.totalRevenue) / 1e6 / FX[df];
    const ebitda = r(f.ebitda) / 1e6 / FX[df];
    const t = Object.fromEntries(q.earningsTrend.trend.map((x) => [x.period, x]));
    const b26 = r(t['0y'].earningsEstimate.avg), b27 = r(t['+1y'].earningsEstimate.avg);
    const bntm = b26 / 12 + (b27 * 11) / 12;
    const precioFin = r(p.regularMarketPrice) / FX[dc] * FX[df];
    const v26 = r(t['0y'].revenueEstimate.avg), v27 = r(t['+1y'].revenueEstimate.avg);
    return { nombre: nom, ticker: tic, pais, capitalizacion: red(cap, 0), ev_ventas: red(ev / ventas, 2), ev_ebitda_ltm: red(ev / ebitda, 1), ev_ebitda_ntm: null, per_ntm: red(precioFin / bntm, 1), crecimiento_pct: red((v27 / v26 - 1) * 100, 1), margen_ebitda_pct: red((ebitda / ventas) * 100, 1), roic_pct: null, dn_ebitda: red((ev - cap) / ebitda, 1), fcf_yield_pct: null };
  });
  D.comparables.criterio = `Los mismos siete del 9-oct (bienes de equipo para alimentación, bebidas y envasado): GEA, SIG, Tomra, JBT Marel, Alfa Laval, Bucher e Interroll. Dürr sigue fuera (automóvil; su BPA de 2026e está hundido por partidas puntuales) y Sidel, KHS, Syntegon y Tetra Pak no cotizan. Rehechos el 27-nov-2026 con un solo proveedor (Yahoo: capitalización, valor empresa, EBITDA de los últimos doce meses y BPA estimado de 2026-2027 posterior a los resultados del 3T), convertidos con los tipos del BCE del 26-nov [${F.yq}, ${F.bce}]. SIG y Tomra publican en euros y cotizan en CHF y NOK: precio y valor empresa convertidos antes de dividir. PER de los próximos 12 meses = un mes de 2026e y once de 2027e; crecimiento = ventas 2027e/2026e.`;
  D.comparables.comentario = null; // lo escribe propio tras el cálculo
  // Puente a 30-sep-2026.
  D.valoracion = { ...D.valoracion,
    puente: { fecha: '2026-09-30', deuda_financiera: 2.3, arrendamientos: 159.0, caja: 410.6, minoritarios: 0.4, pensiones: 115.6, asociadas: 6.7, otros_ajustes: 31.7 },
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, válida para mercados desarrollados)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: `Damodaran, ERPbymonth.xlsx, columna «ERP (T12m with sustainable payout)», noviembre de 2026 [${F.dam}]` },
    comentario: `Puente a 30 de septiembre de 2026 [${F.q3}]: deuda bancaria de 0,4 M más 1,9 M de otros pasivos financieros a coste amortizado (del semestral); caja de 410,6 M. El trimestral agrupa arrendamientos y otros pasivos financieros (192,6 M); restamos los 31,7 M de pagos aplazados de adquisiciones y opciones de venta de minoritarios del semestral (Ampco Pumps, GHS y otras, a valor razonable), que van en otros ajustes, y los 1,9 M anteriores: 159,0 M de arrendamientos (estimación propia). Pensiones: provisión de 159,6 M neta del 27,6 % de impuestos (115,6 M). Minoritarios y asociadas, a valor contable. Los pasivos por contrato (864,9 M de anticipos) se compensan con entregas y quedan en el circulante, con 1.060,2 M de activos por contrato.` };
  D.dcf = { wacc: { tasa_libre_pct: 3.32, beta: 1.1 } };
  // Fuentes del 9-oct que ya no se usan (cotización, consenso, comparables, Bund y tipos de entonces): fuera.
  const fuera = new Set([4, 6, 9, 11, 12, 14, 15, 16, 18, 19, 20, 21, 22, 23]);
  const txtD = JSON.stringify({ ...D, fuentes: null });
  for (const i of fuera) if (new RegExp(`\\[(?:[^\\]]*[ ,])?${i}(?:[,\\]-])`).test(txtD)) console.warn('D: la fuente', i, 'sigue citada');
  D.fuentes = D.fuentes.filter((f) => !fuera.has(f.id));
  D.huecos = (D.huecos || []).concat([{ seccion: 'consenso', campo: 'EBITDA y EBIT del consenso de 2026e-2027e posteriores al aviso', tipo: 'Complemento', intentos: '1) Yahoo: solo BPA y ventas; 2) MarketScreener: página del 22-oct, anterior al aviso; 3) Stock Analysis: 2027-2028 de pago', decision: 'Omitido' }]);
  D._estado = 'completo (iteración 27-nov-2026)';
  guarda('D', D);
}

// ---------------------------------------------------------------- E. Sentimiento
{
  const E = {
    sentimiento: {
      tono: 'Negativo', tendencia: 'Empeora',
      revisadas: [
        { plataforma: 'stock3 (análisis del redactor jefe tras el aviso; sin comentarios de lectores)', fecha: '2026-10', n_comentarios: 0, tono: 'Negativo', resumen: 'La rebaja «se veía venir desde hacía semanas»; Krones «tiene sobre todo un problema de crecimiento», no de rentabilidad, y la pregunta es cuánto descuenta ya el precio [1].' },
        { plataforma: 'goldesel.de (recopilación de cambios de objetivo y reacción)', fecha: '2026-10', n_comentarios: 0, tono: 'Dividido', resumen: 'Seis recortes de objetivo en dos días, pero cinco de seis bancos mantienen comprar o sobreponderar; solo LBBW rebaja a mantener [2].' },
        { plataforma: 'Seeking Alpha (página de KRNTY: transcripciones y presentaciones, sin artículos de opinión recientes)', fecha: '2026-11', n_comentarios: 0, tono: 'Neutro', resumen: 'Solo transcripciones y diapositivas del 3T26; ningún análisis de autor en tres meses, señal de lo poco seguida que está fuera de Alemania [3].' },
      ],
      temas: [
        { tema: 'Fin del plan de 7.000 M en 2028', postura: 'Bajista', peso: 'Alto', contraste: 'El nuevo objetivo (6.000-6.200 M) pide un 3 % anual, en línea con nuestro caso base del 9-oct (6.206 M); nuestro base de hoy queda en el suelo del rango.' },
        { tema: 'Margen que aguanta', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto: 11,1 % en nueve meses (10,8 % sin aranceles) y 11,6 % en el 3T; el riesgo es que un 2027 plano lo comprima por absorción de costes fijos.' },
        { tema: 'Valoración barata', postura: 'Dividida', peso: 'Medio', contraste: 'Unas 10 veces el BPA de 2027e y caja neta; pero el PER ya era de 12,7 veces en 2023-2024 sin crisis, y el BPA de un año malo sería la mitad.' },
      ],
      lectura: 'No hay foros con debate real de Krones en los tres últimos meses (Reddit y Stocktwits no la siguen; en Alemania el debate está en la prensa financiera). El tono es negativo y empeora desde el aviso: el mercado ha dejado de creer en el crecimiento y solo los analistas mantienen recomendaciones de compra. No contradice la tesis: el precio ya descuenta un crecimiento bajo, que es lo que dice la propia empresa. No aporta un riesgo que el informe no recoja.',
      confianza: 'Baja',
    },
    fuentes: [
      { id: 1, titulo: 'KRONES - Prognosesenkung mit Ansage: Wie viel steckt schon im Kurs?', editor: 'stock3', tipo: 'Foros y redes', fecha: '2026-10-22', url: 'https://stock3.com/news/krones-prognosesenkung-mit-ansage-wie-viel-steckt-schon-im-kurs-17346231' },
      { id: 2, titulo: 'Krones Aktie: Prognosesenkung löst neue Kurszielkürzungen aus', editor: 'goldesel.de', tipo: 'Foros y redes', fecha: '2026-10-23', url: 'https://goldesel.de/aktien/news/krones-aktie-prognosesenkung-lost-neue-kurszielkurzungen-aus' },
      { id: 3, titulo: 'Krones AG (KRNTY): noticias y análisis (RSS)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-11-27', url: 'https://seekingalpha.com/api/sa/combined/KRNTY.xml' },
    ],
    huecos: [],
    _estado: 'completo',
  };
  guarda('E', E);
}
console.log('Notas A-E escritas');

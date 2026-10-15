// Escribe las notas A-E de Jack Henry & Associates (JKHY, corte 2026-10-15) a partir de los documentos de notas/docs
// (10-K FY2020-FY2026, notas de resultados de los cuatro trimestres del FY2026, proxy 2026, 8-K), del XBRL de la SEC
// (cuentas-xbrl.json), de bolsa.json y form4.json, y de las consultas de mercado del 15-oct-2026 (Yahoo Finance).
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node informes/jack-henry-2026-10-15/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
// Las notas se escriben con citas [A5] (de cualquier letra); al guardar, cada cita se pasa a la numeración local de la
// nota y las fuentes de otra letra se copian a su lista (integrar.mjs las une por URL).
const LISTAS = {};
const guarda = (letra, obj) => {
  const fuentes = obj.fuentes; LISTAS[letra] = fuentes;
  const local = (L, n) => {
    if (L === letra) return n;
    const f = LISTAS[L]?.find((x) => x.id === n) || FUENTES_TODAS[L]?.find((x) => x.id === n);
    if (!f) throw new Error(`Cita ${L}${n} sin fuente en la nota ${letra}`);
    let g = fuentes.find((x) => x.url === f.url && x.titulo === f.titulo);
    if (!g) { g = { ...f, id: fuentes.length + 1 }; fuentes.push(g); }
    return g.id;
  };
  const sinFuentes = { ...obj }; delete sinFuentes.fuentes;
  let s = JSON.stringify(sinFuentes, null, 2).replace(/\[([A-E]\d+(?:\s*,\s*[A-E]?\d+)*)\]/g, (_, g) => {
    let L = letra;
    const ids = g.split(/\s*,\s*/).map((t) => { if (/^[A-E]/.test(t)) { L = t[0]; t = t.slice(1); } return local(L, +t); });
    return `[${[...new Set(ids)].sort((a, b) => a - b).join(', ')}]`;
  });
  const final = { ...JSON.parse(s), fuentes };
  fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(final, null, 2) + '\n', 'utf8');
};
const FUENTES_TODAS = {};
const pend = [];
const r1 = (x) => Math.round(x * 10) / 10;
const EDGAR = 'https://www.sec.gov/Archives/edgar/data/779152/';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio cerrado el 30-jun-2026 (cuentas, notas de segmentos, intangibles, contratos, deuda, impuestos)', editor: 'Jack Henry & Associates', tipo: 'Primaria', fecha: '2026-08-25', url: EDGAR + '000077915226000067/jkhy-20260630.htm' },
  { id: 2, titulo: 'Form 10-K del ejercicio cerrado el 30-jun-2024 (flujos FY2022-FY2024, segmentos FY2022-FY2024)', editor: 'Jack Henry & Associates', tipo: 'Primaria', fecha: '2024-08', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000779152&type=10-K' },
  { id: 3, titulo: 'Form 10-K del ejercicio cerrado el 30-jun-2022 (flujos FY2020-FY2022)', editor: 'Jack Henry & Associates', tipo: 'Primaria', fecha: '2022-08', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000779152&type=10-K' },
  { id: 4, titulo: 'Form 10-K del ejercicio cerrado el 30-jun-2020 (flujos FY2018-FY2020, intangibles)', editor: 'Jack Henry & Associates', tipo: 'Primaria', fecha: '2020-08', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000779152&type=10-K' },
  { id: 5, titulo: 'Nota de resultados del 4T y del ejercicio FY2026 y guía FY2027 (Ex. 99.1)', editor: 'Jack Henry & Associates', tipo: 'Primaria', fecha: '2026-08-18', url: EDGAR + '000077915226000057/jkhy-20260630xex99pressrel.htm' },
  { id: 6, titulo: 'Nota de resultados del 3T FY2026 (Ex. 99.1)', editor: 'Jack Henry & Associates', tipo: 'Primaria', fecha: '2026-05-05', url: EDGAR + '000077915226000021/jkhy-20260331xex99pressrel.htm' },
  { id: 7, titulo: 'Nota de resultados del 2T FY2026 (Ex. 99.1)', editor: 'Jack Henry & Associates', tipo: 'Primaria', fecha: '2026-02-03', url: EDGAR + '000077915226000007/jkhy-20251231xex99pressrel.htm' },
  { id: 8, titulo: 'Nota de resultados del 1T FY2026 (Ex. 99.1)', editor: 'Jack Henry & Associates', tipo: 'Primaria', fecha: '2025-11-04', url: EDGAR + '000077915225000090/jkhy-20250930xex99pressrel.htm' },
  { id: 9, titulo: 'XBRL companyfacts de la SEC (CIK 779152): cuenta, balance y flujos FY2017-FY2026', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000779152.json' },
  { id: 10, titulo: 'Jack Henry anuncia los ingresos por desconversión del 4T y del FY2026 (Form 8-K)', editor: 'Jack Henry & Associates', tipo: 'Primaria', fecha: '2026-08-11', url: EDGAR + '000077915226000052/jkhy-prdatedaugust112026xq.htm' },
  { id: 11, titulo: 'Form 8-K: nuevo crédito sindicado de 1.000 M a cinco años (25-mar-2026)', editor: 'Jack Henry & Associates', tipo: 'Primaria', fecha: '2026-03-25', url: EDGAR },
];

const da = { FY2019: [47.4, 113.3], FY2020: [52.2, 119.6], FY2021: [52.5, 123.2], FY2022: [50.8, 126.8], FY2023: [48.7, 142.0], FY2024: [46.3, 153.6], FY2025: [43.7, 161.1], FY2026: [42.1, 171.1] };
const capex = { FY2019: [53.6, 6.0, 111.1], FY2020: [53.5, 6.7, 117.3], FY2021: [23.0, 6.5, 128.3], FY2022: [34.7, 8.5, 148.2], FY2023: [39.2, 1.7, 166.1], FY2024: [58.1, 7.1, 167.2], FY2025: [53.4, 5.4, 172.4], FY2026: [67.1, 4.1, 184.2] };
const C = [ // periodo, ingresos, coste, sgya, ebit, rf, bai, imp, bn, gf, bpa, dpa, acc
  ['FY2019', 1552.7, 923.0, 186.0, 347.3, -0.1, 347.2, 75.4, 271.9, 0.9, 3.52, 1.54, 77.3],
  ['FY2020', 1697.1, 1008.5, 198.0, 380.6, 0.5, 381.1, 84.4, 296.7, 0.7, 3.86, 1.66, 76.9],
  ['FY2021', 1758.2, 1063.4, 187.1, 398.7, -1.0, 397.7, 86.3, 311.5, 1.1, 4.12, 1.78, 75.7],
  ['FY2022', 1942.9, 1128.6, 218.3, 474.6, -2.3, 472.3, 109.4, 362.9, 2.4, 4.94, 1.90, 73.5],
  ['FY2023', 2077.7, 1219.1, 235.3, 480.7, -6.1, 474.6, 107.9, 366.6, 15.1, 5.02, 2.02, 73.1],
  ['FY2024', 2215.5, 1299.5, 278.4, 489.4, 8.6, 498.0, 116.2, 381.8, 16.4, 5.23, 2.14, 73.0],
  ['FY2025', 2375.3, 1360.7, 283.1, 568.7, 17.3, 586.0, 130.3, 455.7, 10.4, 6.24, 2.26, 73.0],
  ['FY2026', 2544.3, 1433.7, 299.2, 635.0, 17.8, 652.8, 150.0, 502.8, 5.4, 6.98, 2.38, 72.0],
];
const cuenta = C.map(([p, ing, cv, gg, ebit, rf, bai, imp, bn, gf, bpa, dpa, acc]) => {
  const am = r1(da[p][0] + da[p][1]);
  return { periodo: p, ingresos: ing, coste_ventas: cv, gastos_generales: gg, ebitda: r1(ebit + am), amortizaciones: am, ebit, resultado_financiero: rf, bai, impuestos: imp, minoritarios: 0, beneficio_neto: bn, gastos_financieros: gf, participadas_en_ebitda: null, no_recurrentes_en_ebitda: p === 'FY2026' ? -6.8 : null, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acc };
});
const intang = { FY2019: 451.2, FY2020: 465.5, FY2021: 476.0, FY2022: 505.6, FY2023: 651.2, FY2024: 671.7, FY2025: 685.2, FY2026: 716.7 };
const B = [ // periodo, activo, ac, pc, pasivo, fc, inm, clientes, prov, act_contrato, pas_contrato, caja, deuda, pn, reservas
  ['FY2019', 2184.8, 569.4, 470.0, 755.8, 666.9, 272.5, 310.1, 9.9, 21.4, 339.8, 93.6, 0, 1429.0, 2066.1],
  ['FY2020', 2428.5, 669.1, 494.8, 878.8, 686.3, 273.4, 300.9, 9.9, 21.6, 318.2, 213.3, 0.2, 1549.7, 2235.3],
  ['FY2021', 2336.2, 543.7, 520.9, 1016.9, 687.5, 252.5, 306.6, 18.5, 22.9, 319.7, 51.0, 100.1, 1319.3, 2412.5],
  ['FY2022', 2455.6, 613.5, 543.8, 1073.9, 687.5, 211.7, 348.1, 21.0, 24.4, 330.7, 48.8, 115.0, 1381.6, 2636.3],
  ['FY2023', 2773.8, 628.0, 523.8, 1165.3, 804.8, 205.7, 361.3, 19.2, 26.7, 332.0, 12.2, 275.0, 1608.5, 2855.8],
  ['FY2024', 2924.5, 632.0, 633.8, 1082.1, 804.8, 215.1, 333.0, 25.3, 33.6, 317.7, 38.3, 150.0, 1842.4, 3081.7],
  ['FY2025', 3044.0, 681.5, 535.8, 913.1, 804.8, 221.0, 318.0, 28.2, 36.2, 290.5, 102.0, 0, 2130.8, 3372.8],
  ['FY2026', 3145.7, 649.1, 556.2, 1093.8, 827.7, 220.5, 349.1, 34.9, 40.3, 294.8, 12.1, 40.0, 2051.9, 3705.2],
];
const balance = B.map(([p, at, ac, pc, pt, fc, inm, cli, prov, actc, pasc, caja, deuda, pn, res]) => ({ periodo: p, activo_total: at, activo_corriente: ac, pasivo_corriente: pc, pasivo_total: pt, fondo_comercio: fc, intangibles: intang[p], inmovilizado_material: inm, existencias: 0, clientes: cli, proveedores: prov, activos_contrato: actc, pasivos_contrato: pasc, caja, deuda_financiera: deuda, arrendamientos: 0, patrimonio_neto: pn, minoritarios: 0, reservas: res }));
const F = [ // periodo, fo, adq, desinv, div, recompras, emision
  ['FY2019', 431.1, 20.0, 0.1, 118.7, 54.9, 9.0], ['FY2020', 510.5, 30.4, 11.1, 127.4, 71.5, 9.8], ['FY2021', 462.1, 2.3, 6.2, 133.8, 431.5, 10.9],
  ['FY2022', 504.6, 0, 0, 139.1, 193.9, 11.8], ['FY2023', 381.6, 229.6, 27.9, 147.2, 25.0, 12.4], ['FY2024', 568.0, 0, 0.9, 155.9, 28.1, 12.5],
  ['FY2025', 641.5, 0, 0, 164.6, 35.1, 11.7], ['FY2026', 762.0, 42.4, 32.8, 170.4, 448.2, 11.6],
];
const flujos = F.map(([p, fo, adq, des, div, rec, em]) => ({ periodo: p, flujo_operativo: fo, capex: r1(capex[p][0] + capex[p][1] + capex[p][2]), pagos_arrendamientos: 0, adquisiciones: adq, desinversiones: des, dividendos: div, recompras: rec, emision_acciones: em, intereses_en_financiacion: 0 }));

pend.push(['A', {
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26 (FY2026)', fecha_fin: '2026-06-30', ingresos: 2544.3, ebitda: 848.3, ebit: 635.0, beneficio_neto: 502.8, bpa: 6.98, dpa: 2.38, dpa_extraordinario: 0, fcf: 506.6, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -6.8 },
    cambios_perimetro: [
      { periodo: 'FY2023', descripcion: 'Payrailz (pagos digitales), comprada en agosto de 2022 por 229,6 M en caja: el fondo de comercio sube de 687,5 a 804,8 M [A1, A2].' },
    ],
    comentario: 'Ventas de 1.552,7 M (FY2019) a 2.544,3 M (FY2026): +7,3 % anual, casi todo orgánico (las compras de siete años suman 325 M de caja) [A9, A1]. El crecimiento ajustado que publica la empresa (sin desconversiones ni compras) fue del 7,3 % en el FY2026 y del 6,6-8,7 % en cada trimestre [A5]. El margen EBIT pasó del 22,4 % (FY2019) al 25,0 % (FY2026): tras tres años planos (24,4 % en FY2022, 23,1 % en FY2023, 22,1 % en FY2024) por personal e inversión en la nube, subió 92 pb en el FY2026 con la mezcla de proceso (tarjetas, pagos instantáneos +49,5 %) y la contención de costes [A5]. Las desconversiones (penalizaciones que paga un cliente absorbido por otro banco) suman 33,9 M en FY2025 y 42,8 M en FY2026 de ingresos casi sin coste; la guía del FY2027 supone 23 M [A10, A5]. Ningún año está fuera de perímetro salvo FY2023 (Payrailz). El 4T26 bajó (BPA 1,57 frente a 1,75) por menos desconversiones (9,3 M frente a 20,5 M) y gastos de personal y médicos [A5].',
    ajustes: 'El informe parte de las cifras GAAP. La empresa publica además ingresos y beneficio operativo «ajustados» que quitan: ingresos y costes de desconversión (42,8 M de ingresos y 29,95 M de resultado operativo en FY2026), un cambio de contrato con un tercero en FY2025 (15,9 M de ingresos), la compra de Victor (5,2 M de ingresos y −2,96 M de resultado en FY2026) y una plusvalía por venta de activos de 6,8 M en FY2026 [A5]. Esa plusvalía se resta del EBITDA como no recurrente (−6,8 M). Las desconversiones se repiten todos los años (dependen de las fusiones bancarias): no son extraordinarias y quedan dentro del BPA. El EBITDA del informe es EBIT + depreciación + amortización del estado de flujos (213,2 M en FY2026); el EBITDA «no GAAP» de la empresa (813,0 M) quita además desconversiones [A5]. La amortización de costes de contratos activados (195,7 M en FY2026) va dentro de los costes, no en la amortización [A1].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1T25', ingresos: 601.0, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: r1(151.3 + 50.5), margen_ebitda_pct: r1((151.3 + 50.5) / 601.0 * 100), bpa: 1.63, vs_consenso: null },
      { periodo: '2T25', ingresos: 573.8, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: r1(123.0 + 51.8), margen_ebitda_pct: r1((123.0 + 51.8) / 573.8 * 100), bpa: 1.34, vs_consenso: null },
      { periodo: '3T25', ingresos: 585.1, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: r1(138.7 + 51.0), margen_ebitda_pct: r1((138.7 + 51.0) / 585.1 * 100), bpa: 1.52, vs_consenso: null },
      { periodo: '4T25', ingresos: 615.4, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: r1(155.7 + 51.5), margen_ebitda_pct: r1((155.7 + 51.5) / 615.4 * 100), bpa: 1.75, vs_consenso: 'Superior' },
      { periodo: '1T26', ingresos: 644.7, crecimiento_pct: 7.3, crecimiento_organico_pct: 8.7, ebitda: r1(184.1 + 51.9), margen_ebitda_pct: r1((184.1 + 51.9) / 644.7 * 100), bpa: 1.97, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 619.3, crecimiento_pct: 7.9, crecimiento_organico_pct: 6.7, ebitda: r1(159.1 + 53.2), margen_ebitda_pct: r1((159.1 + 53.2) / 619.3 * 100), bpa: 1.72, vs_consenso: 'Superior' },
      { periodo: '3T26', ingresos: 636.2, crecimiento_pct: 8.7, crecimiento_organico_pct: 7.3, ebitda: r1(155.0 + 53.7), margen_ebitda_pct: r1((155.0 + 53.7) / 636.2 * 100), bpa: 1.71, vs_consenso: 'Superior' },
      { periodo: '4T26', ingresos: 644.0, crecimiento_pct: 4.7, crecimiento_organico_pct: 6.6, ebitda: r1(136.8 + 54.5), margen_ebitda_pct: r1((136.8 + 54.5) / 644.0 * 100), bpa: 1.57, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: null,
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2031', importe: 40 }],
    liquidez: 'Caja 12,1 M y 40 M dispuestos de un crédito sindicado de 1.000 M a cinco años (marzo de 2026, vence en 2031): ≈ 960 M sin disponer [A1, A11].',
    rating: 'Sin rating público (no emite bonos)',
    coste_deuda_pct: null,
    vida_media_anios: 4.5,
    otros_pasivos: 'Covenants del crédito: EBITDA / intereses ≥ 3,5x y deuda neta / EBITDA ≤ 3,5x (4,0x tras una compra de más de 100 M) [A11]; con deuda neta de ≈ 28 M la holgura es total. Arrendamientos operativos de 37,8 M (US GAAP: su gasto ya está en el EBITDA, no van al puente) [A1]. Ingresos diferidos de 294,8 M corrientes y 77,7 M no corrientes: cobros adelantados que se consumen con el servicio [A1]. Costes de contratos activados de 599,5 M (301,5 M de comisiones y 298,0 M de implantación), que crecen ≈ 58 M al año y son una inversión que no pasa por el capex [A1]. Sin pensiones de prestación definida, sin pagos aplazados de compras relevantes y sin litigios materiales declarados [A1].',
    comentario: 'Balance casi sin deuda durante siete años: la deuda bruta máxima fue de 275 M (FY2023, por Payrailz) y se amortizó en dos años [A9]. En el FY2026 la empresa recompró 448 M de acciones (2,95 M a 152 USD de media) con la caja libre y 40 M del crédito, y la caja bajó de 102 a 12 M [A5, A1]. El circulante comercial es casi nulo: clientes 349 M frente a ingresos diferidos de 295 M y proveedores de 35 M; los clientes pagan por adelantado los contratos de nube y mantenimiento [A1]. La partida que crece es la de costes de contratos activados (de 541,7 a 599,5 M), que absorbe caja.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo del FY2026 (762,0 M) lleva 126,0 M de impuestos diferidos por la ley fiscal de julio de 2025 (OBBBA: deducción inmediata de la I+D y del saldo pendiente de amortizar), que no se repetirán con ese tamaño [A5, A1]. Sin ese efecto, el flujo operativo habría sido de ≈ 636 M, como el del FY2025 (641,5 M). La inversión total (255,4 M en FY2026) es casi toda software desarrollado y activado (184,2 M) más 67,1 M de equipos y centros de datos; supera a la amortización (213,2 M) en ≈ 42 M: es inversión de crecimiento moderada [A5]. Hay además ≈ 58 M de costes de contratos activados que pasan por el circulante [A1]. Caja libre de la empresa: 539,3 M (FY2026) y 410,3 M (FY2025), una conversión del 101 % y el 90 % del beneficio [A5]. Usos acumulados FY2019-FY2026: dividendos 1.157 M, recompras 1.288 M y compras de empresas 325 M [A9].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers LLP', anios_auditor: 11, opinion: 'Favorable (cuentas y control interno)',
    comentario: 'Tres puntos contables. (1) La empresa activa mucho desarrollo de software: 184,2 M en FY2026 (el 7,2 % de las ventas) frente a 176,4 M de I+D en la cuenta; la amortización de ese software (dentro de los 171,1 M de amortización) crece más deprisa que las ventas y empuja el coste de ventas [A5, A1]. (2) Activa costes de obtener y cumplir contratos (599,5 M en balance; 195,7 M amortizados en el año): el beneficio reconoce el gasto con el ingreso, pero la caja sale antes [A1]. (3) Los ingresos por desconversión (42,8 M, casi todo margen) dependen de que los bancos clientes se fusionen; la empresa los separa y la guía del FY2027 supone 23 M [A10, A5]. La remuneración en acciones es baja (≈ 1 % de las ventas, por el plan de acciones) y la dilución, nula: las acciones diluidas bajan de 77,3 a 72,0 M en siete años [A9]. Lectura de los indicadores del motor en la sección de calidad.',
    senales: [
      { senal: 'Software desarrollado activado creciente (7,2 % de las ventas)', nivel: 'Media', comentario: 'Normal en el sector, pero el BPA depende de la vida útil elegida; la amortización ya crece más que las ventas.' },
      { senal: 'Flujo operativo FY2026 inflado por impuestos diferidos (126 M)', nivel: 'Media', comentario: 'Efecto de la ley OBBBA; el FCF recurrente es ≈ 410-430 M, no 539 M.' },
      { senal: 'Ingresos por desconversión dentro del beneficio GAAP', nivel: 'Baja', comentario: 'Se repiten cada año con las fusiones bancarias (34-43 M); la empresa los separa en su información ajustada.' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades declaradas: inversión en producto (I+D de 358 M entre gasto y activación en FY2026), dividendo creciente (22 años seguidos de subidas; 0,61 USD trimestrales desde agosto de 2026), compras pequeñas y selectivas y recompras con la caja sobrante [B4, A5]. El consejo amplió la autorización en 5 M de acciones en mayo de 2026; quedan 5,46 M por recomprar (≈ 8 % del capital) sin plazo [A1]. La guía de caja libre del FY2027 es del 80-100 % del beneficio [B4].',
    adquisiciones: [
      { anio: '2018', objetivo: 'Agiletics y BOLTS (pagos y riesgo)', importe: 137.6, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integradas en Complementary y Payments; sin deterioros [A4].' },
      { anio: '2023', objetivo: 'Payrailz (pagos digitales)', importe: 229.6, ev_ebitda: null, financiacion: 'Caja y crédito (275 M de deuda al cierre del FY2023)', resultado: 'Base de los pagos digitales; sin deterioro del fondo de comercio [A2].' },
      { anio: '2026', objetivo: 'Victor (banca embebida / pagos)', importe: 42.4, ev_ebitda: null, financiacion: 'Caja', resultado: '5,2 M de ingresos y −3,0 M de resultado operativo en su primer año [A5].' },
    ],
    comentario: null,
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Core', descripcion: 'Plataformas de proceso central (SilverLake, CIF 20/20, Core Director para bancos; Symitar para cooperativas de crédito), en la nube privada o instaladas.', tipo_resultado: null, historico: [{ periodo: 'FY2024', ingresos: 685.3, resultado: null }, { periodo: 'FY2025', ingresos: 732.9, resultado: null }, { periodo: 'FY2026', ingresos: 768.5, resultado: null }] },
      { nombre: 'Payments', descripcion: 'Proceso de tarjetas, pagos instantáneos, ACH, remesas y Payrailz.', tipo_resultado: null, historico: [{ periodo: 'FY2024', ingresos: 817.7, resultado: null }, { periodo: 'FY2025', ingresos: 873.5, resultado: null }, { periodo: 'FY2026', ingresos: 936.0, resultado: null }] },
      { nombre: 'Complementary', descripcion: 'Banca digital Banno, riesgo y fraude, préstamos, nube pública y soluciones vendidas también a bancos con otro proveedor central.', tipo_resultado: null, historico: [{ periodo: 'FY2024', ingresos: 636.1, resultado: null }, { periodo: 'FY2025', ingresos: 694.8, resultado: null }, { periodo: 'FY2026', ingresos: 752.2, resultado: null }] },
      { nombre: 'Corporate Services', descripcion: 'Hardware revendido, licencias diversas y costes centrales de infraestructura.', tipo_resultado: null, historico: [{ periodo: 'FY2024', ingresos: 76.5, resultado: null }, { periodo: 'FY2025', ingresos: 74.1, resultado: null }, { periodo: 'FY2026', ingresos: 87.7, resultado: null }] },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 100 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Margen del segmento Core (ingresos − coste de ventas)', valor_anterior: '59,7 %', valor_actual: '60,3 %', variacion: '+0,6 pp', comentario: 'Margen bruto por segmento de la nota 14 [A1, A5].' },
      { kpi: 'Margen del segmento Payments', valor_anterior: '47,3 %', valor_actual: '48,8 %', variacion: '+1,5 pp', comentario: 'Mezcla hacia pagos instantáneos (+49,5 % de ingresos) [A5].' },
      { kpi: 'Margen del segmento Complementary', valor_anterior: '61,2 %', valor_actual: '61,9 %', variacion: '+0,7 pp', comentario: 'Banno y nube [A5].' },
      { kpi: 'Ingresos por desconversión', valor_anterior: '33,9 M', valor_actual: '42,8 M', variacion: '+26 %', comentario: 'Medida de las fusiones de clientes; guía FY2027: 23 M [A10, A5].' },
      { kpi: 'Obligaciones de desempeño pendientes (cartera contratada)', valor_anterior: 'n.d.', valor_actual: '8.441 M (3,3 años de ventas)', variacion: 'n.d.', comentario: '23 % en los próximos 12 meses y 18 % en los 12 siguientes [A1].' },
      { kpi: 'Empleados', valor_anterior: 'n.d.', valor_actual: '≈ 7.300', variacion: 'n.d.', comentario: 'A 30-jun-2026 [A1].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento de los trimestres del FY2025', tipo: 'Complemento', intentos: '1) notas de resultados del FY2026 (solo comparan con el FY2025); 2) XBRL trimestral de la SEC (no descargado por tiempo); 3) no hace falta para la decisión', decision: 'Omitido' },
  ],
}]);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K FY2026: negocio, clientes, sector (FDIC y America\'s Credit Unions), competencia y factores de riesgo', editor: 'Jack Henry & Associates', tipo: 'Primaria', fecha: '2026-08-25', url: EDGAR + '000077915226000067/jkhy-20260630.htm' },
  { id: 2, titulo: 'Core Banking Software Market Size, Share, Trends and Forecast 2026-2034 (18.200 M USD en 2025, +11,35 % anual)', editor: 'IMARC Group', tipo: 'Sectorial', fecha: '2026', url: 'https://imarcgroup.com/core-banking-software-market' },
  { id: 3, titulo: 'Core Banking Software Global Market Report (14.430 M USD en 2025; 22.940 M en 2029)', editor: 'The Business Research Company (vía GII)', tipo: 'Sectorial', fecha: '2026', url: 'https://www.gii.tw/report/tbrc1658921-core-banking-software-global-market-report.html' },
  { id: 4, titulo: 'Jack Henry Investor Day 2026: resumen (perspectiva FY2028-FY2029, cuota del 32 % en entidades de más de 1.000 M, retención > 99 %)', editor: 'Quartr', tipo: 'Analistas', fecha: '2026-09-26', url: 'https://quartr.com/events/jack-henry-associates-inc-jkhy-investor-day-2026_3PLXgARh' },
  { id: 5, titulo: 'Software de aplicaciones: ficha sectorial corta (mapa del riesgo de IA por tipo de software)', editor: 'Repositorio de análisis (sectores/software-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/software-2026-10-14.md' },
  { id: 6, titulo: 'Fiserv: análisis value del repositorio (crecimiento orgánico negativo en 2026, día del inversor)', editor: 'Repositorio de análisis (informes/fiserv-2026-10-14)', tipo: 'Analistas', fecha: '2026-10-14', url: 'informes/fiserv-2026-10-14/' },
  { id: 7, titulo: 'Yahoo Finance: estadísticas clave y estimaciones de FIS, Fiserv, Q2, nCino, Alkami, Temenos y ACI (15-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/FIS/key-statistics' },
  { id: 8, titulo: 'Jack Henry Q4 2026 earnings: resumen (58 victorias de proceso central, Woodforest 9.200 M de activos, «trifecta» 59 %)', editor: 'AllInvestView', tipo: 'Prensa', fecha: '2026-08-19', url: 'https://www.allinvestview.com/earnings/JKHY/q4-2026/' },
];
pend.push(['B', {
  historia: {
    resumen: 'Fundada en 1976 en Monett (Misuri) por Jack Henry y Jerry Hall para vender software a bancos pequeños; salió a bolsa en 1985 y creció con un proveedor central para bancos (SilverLake, CIF 20/20, Core Director) y, desde 2000, con Symitar para cooperativas de crédito [B1]. A partir de 2004 diversificó hacia pagos, tarjetas, banca digital y riesgo con compras pequeñas, vendidas también a entidades con otro proveedor central [B1]. Desde 2018 apuesta por la nube privada propia y por la banca digital Banno; en 2023 compró Payrailz y en 2025 Victor [A1]. Greg Adelson sustituyó a David Foss como consejero delegado en julio de 2024; Foss dejó la presidencia en julio de 2026 [C1].',
    hitos: [
      { anio: '1976', hito: 'Fundación en Monett (Misuri) [B1].' },
      { anio: '1985', hito: 'Salida a bolsa en el Nasdaq.' },
      { anio: '2000', hito: 'Compra de Symitar: entrada en cooperativas de crédito, hoy 700 clientes de proceso central [B1].' },
      { anio: '2004-2017', hito: 'Diversificación con compras de pagos, tarjetas, riesgo y banca digital (Banno en 2014).' },
      { anio: '2018', hito: 'Compra de BOLTS y Agiletics; ampliación de la nube privada [B1].' },
      { anio: '2023', hito: 'Compra de Payrailz (229,6 M) para pagos digitales [B1].' },
      { anio: '2024', hito: 'Greg Adelson, consejero delegado; Foss pasa a presidente no ejecutivo [B1].' },
      { anio: '2026', hito: 'Récord de 58 victorias de proceso central, la mayor con Woodforest (9.200 M de activos); día del inversor con perspectiva de crecimiento del 7-8 % hasta el FY2029 [B8, B4].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Jack Henry da a bancos regionales y comunitarios y a cooperativas de crédito de EE. UU. el sistema central que lleva depósitos, préstamos y contabilidad (el «core»), y alrededor de él pagos, tarjetas, banca digital, riesgo y fraude [B1]. Tiene más de 900 bancos y más de 700 cooperativas en su core y ≈ 5.600 clientes que solo compran productos complementarios; en total unas 7.400 entidades [B1, A10]. Vende en la nube privada propia (lo más habitual: contratos de seis años) o instalado en el banco (licencia y mantenimiento anual) [B1]. Su mercado natural son las ≈ 4.300 entidades bancarias de menos de 55.000 M de activos y las ≈ 4.400 cooperativas [B1]. Todo el negocio está en EE. UU.',
    como_gana_dinero: 'Dos líneas: «servicios y soporte» (56,9 % de las ventas del FY2026: nube con contratos de seis años, mantenimiento anual, implantación, licencias y desconversiones) y «proceso» (43,1 %: comisiones por tarjeta, pago instantáneo, ACH y usuario digital) [A5]. Más del 90 % de los ingresos es recurrente (estimación propia: todo salvo licencias, hardware e implantación). El margen bruto por segmento es del 60 % en Core y Complementary y del 49 % en Payments [A5]. El apalancamiento operativo es moderado: el coste es sobre todo personal y centros de datos; cada contrato nuevo exige meses de conversión antes de facturar, así que las victorias de un año suben las ventas uno o dos años después. Las desconversiones (penalización que paga un cliente que se fusiona con otro banco) añaden 20-45 M al año casi sin coste [A10].',
    clientes: 'Ningún cliente pesa de forma material [B1]. La retención es superior al 99 % sin contar las fusiones, con contratos de seis años de media [B4]. La concentración es sectorial: todos los clientes son bancos y cooperativas de EE. UU. de menos de 55.000 M de activos, un universo que se reduce cada año por fusiones (≈ 4.300 bancos y 4.400 cooperativas a finales de 2025) [B1]. Poder de precios: los contratos llevan escaladores anuales y el margen operativo subió 92 pb en el FY2026 con costes de personal al alza [A5, B4]. La empresa gana cuota: 58 victorias competitivas de core en el FY2026 (51 el año anterior), 14 de ellas de más de 1.000 M de activos, y 45 entidades de varios miles de millones en FY2024-FY2026 frente a 23 en FY2021-FY2023 [B8, B4].',
  },
  sector: {
    definicion: 'Tecnología para bancos y cooperativas de crédito: sistemas centrales (core), proceso de pagos y tarjetas, banca digital y riesgo, vendidos como servicio en la nube o como licencia. El mercado relevante de Jack Henry es el de EE. UU. para entidades de menos de 55.000 M de activos; no hay una estadística pública de ese perímetro. Usamos dos medidas: el software de core mundial (IMARC: 18.200 M USD en 2025; The Business Research Company: 14.430 M) como referencia de crecimiento, y la cuota que da la propia empresa en entidades de más de 1.000 M de activos (32 %) [B2, B3, B4]. El primero no incluye pagos ni banca digital, que son el 70 % de las ventas de Jack Henry: por eso la prueba de cuota del DCF se hace a mano.',
    tamano: '≈ 18.200 M USD en 2025 de software de core mundial (IMARC); 14.430 M según The Business Research Company [B2, B3]',
    unidad_serie: 'millones de USD (software de core mundial, IMARC)',
    serie: [{ anio: '2025', tamano: 18200 }, { anio: '2026e', tamano: 20266 }, { anio: '2027e', tamano: 22566 }, { anio: '2028e', tamano: 25128 }, { anio: '2029e', tamano: 27980 }, { anio: '2030e', tamano: 31157 }],
    tcac_historico_pct: 8.3, tcac_previsto_pct: 11.35, cr5_pct: null, estructura: 'Concentrada (en EE. UU.: Fiserv, FIS y Jack Henry tienen la mayoría de los bancos)',
    drivers: [
      { driver: 'Consolidación bancaria', efecto: '−', horizonte: 'Estructural', evidencia: 'El número de bancos y cooperativas baja cada año por fusiones; 42,8 M de desconversiones en FY2026 [B1, A10].' },
      { driver: 'Paso a la nube y a pagos instantáneos', efecto: '+', horizonte: 'Estructural', evidencia: 'Pagos instantáneos +49,5 % e ingresos de nube +8,5 % en FY2026 [A5].' },
      { driver: 'Cambios de proveedor desde Fiserv y FIS', efecto: '+', horizonte: 'Cíclico', evidencia: '58 victorias competitivas de core en FY2026; Fiserv con crecimiento orgánico negativo en 2026 [B8, B6].' },
      { driver: 'Gasto en tecnología de los bancos ligado a sus márgenes', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'La dirección dice que el gasto en tecnología «sigue fuerte» en agosto de 2026 [A5].' },
      { driver: 'Fintech y competidores de nicho en banca digital', efecto: '−', horizonte: 'Estructural', evidencia: 'Q2, Alkami y nCino crecen 10-23 % al año en banca digital y préstamos [B7].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Tres grandes y Finastra/Corelation; se compite por servicio en contratos de seis años, con pocos cambios al año (58 victorias de JKHY) [B1, B8].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Bancos pequeños con poco poder individual, pero cada fusión crea un cliente más grande que renegocia o se va [B1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Redes de tarjetas y nube pública; el personal técnico es el coste principal [B1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Un core nuevo tarda años en certificarse y en ganar la confianza de reguladores y bancos; los nuevos (cores en la nube) ganan sobre todo bancos nuevos [B1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Fintech de nicho e IA pueden quitar módulos (banca digital, fraude, atención) aunque no el core [B1, B5].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Poco cíclico: en 2009 y 2020 los ingresos de Jack Henry siguieron creciendo porque son recurrentes; lo que cae en las crisis bancarias son las licencias y el hardware y, con retraso, el número de clientes por quiebras y fusiones. En 2022-2023 los tipos altos y la crisis de bancos regionales frenaron las decisiones de compra y subieron las fusiones; en 2025-2026 las fusiones bancarias han repuntado (desconversiones de 42,8 M) [A10, B1].' },
    regulacion: 'Los clientes están supervisados (FDIC, OCC, Reserva Federal, NCUA), y los proveedores de servicios tecnológicos se examinan por las mismas agencias (FFIEC). Las normas de ciberseguridad y las de pagos instantáneos (FedNow, RTP) empujan la demanda. La empresa ofrece depósitos tokenizados con USDC, pendiente de la regulación de monedas estables [B4, B1].',
    tendencias: 'Tres tendencias: (1) los bancos regionales quieren ofrecer lo que ofrecen los grandes (pagos instantáneos, banca digital): Jack Henry crece con Banno (1.030 entidades y 16 M de usuarios) [B4]; (2) Fiserv y FIS han recortado previsiones y sus clientes se mueven, lo que Jack Henry convierte en victorias (Woodforest) [B6, B8]; (3) la IA: la empresa tiene 22 productos con IA en marcha y otros 20 previstos, pero la IA también abarata el desarrollo de alternativas para módulos de banca digital y atención [B8, B5].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 32, posicion: '3.º proveedor de core de EE. UU. por clientes tras Fiserv y FIS; 1.º en cooperativas de crédito de más de 100 M de activos (Symitar); 32 % de las entidades de más de 1.000 M de activos y 48 % de las cooperativas de ese tamaño (dato de la empresa) [B1, B4]',
    competidores: [
      { nombre: 'Fiserv', pais: 'EE. UU.', ticker: 'FISV', ingresos: 20870, cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder en número de bancos; crecimiento orgánico negativo en 2026 y cambio de dirección [B6].' },
      { nombre: 'FIS (Fidelity National Information Services)', pais: 'EE. UU.', ticker: 'FIS', ingresos: 12200, cuota_pct: null, margen_ebit_pct: null, comentario: 'Bancos medianos y grandes; compró el negocio de emisores de Global Payments en 2025 [B7].' },
      { nombre: 'Finastra', pais: 'Reino Unido', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'De capital riesgo (Vista); core para bancos comunitarios en EE. UU. [B1].' },
      { nombre: 'Corelation', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Core KeyStone para cooperativas; el rival directo de Symitar [B1].' },
      { nombre: 'Q2 Holdings', pais: 'EE. UU.', ticker: 'QTWO', ingresos: 846, cuota_pct: null, margen_ebit_pct: null, comentario: 'Banca digital para bancos regionales; compite con Banno [B7].' },
      { nombre: 'Alkami Technology', pais: 'EE. UU.', ticker: 'ALKT', ingresos: 490, cuota_pct: null, margen_ebit_pct: null, comentario: 'Banca digital para cooperativas; aún con pérdidas [B7].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Pocos: la red de pagos y los fintech integrados en su plataforma dan algo de valor, pero cada banco es un cliente aislado.' },
        { fuente: 'Costes de cambio', puntuacion: 5, evidencia: 'Cambiar de core lleva 12-24 meses, exige migrar todos los datos y lo revisa el supervisor; retención > 99 % sin fusiones y contratos de seis años [B4].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Reputación de servicio: la empresa basa su ventaja en las encuestas de satisfacción; sin patentes relevantes [B1].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Escala menor que Fiserv y FIS; su margen EBIT (25 %) es inferior al EBITDA ajustado de Fiserv (43 %) [B6].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Mercado de pocas entidades (≈ 8.700) en el que no caben muchos proveedores de core certificados; tres grandes y dos de nicho [B1].' },
      ],
    },
    amenazas: 'Cuatro amenazas, por probabilidad: (1) fusiones bancarias que reducen el número de clientes; cuando un cliente de Jack Henry compra a otro, Jack Henry gana, y cuando lo compran, cobra la desconversión y pierde el cliente (probabilidad alta, efecto lento); (2) Fiserv y FIS bajando precios para recuperar cuota tras sus caídas (media) [B6]; (3) fintech de banca digital y préstamos que quitan módulos complementarios (media) [B7]; (4) la IA, que puede abaratar el desarrollo de alternativas en banca digital, atención y fraude, aunque no sustituye al core regulado (baja a cinco años) [B5].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es la ciberseguridad y la continuidad del servicio: Jack Henry procesa los depósitos y pagos de unas 1.600 entidades; una caída o un robo de datos tendría coste directo y de reputación. El 31-ago-2026 la empresa comunicó un incidente cibernético sin efecto en las operaciones [D8]. La plantilla (≈ 7.300 personas, mucho en remoto) es el otro asunto material [B1].',
    controversias: 'Incidente cibernético comunicado el 31-ago-2026, sin efecto en las operaciones según la empresa [D8]. Sin sanciones ni litigios materiales declarados en el 10-K del FY2026 [B1].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'competencia', campo: 'margen EBIT de los competidores', tipo: 'Complemento', intentos: '1) informes anuales de Fiserv y FIS (bases GAAP con amortización de compras enormes, no comparables); 2) Yahoo Finance (solo EBITDA); 3) Finastra y Corelation no publican', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones ESG', tipo: 'Complemento', intentos: '1) proxy 2026; 2) 10-K FY2026; 3) sin búsqueda web por tiempo', decision: 'Omitido' },
  ],
}]);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement (DEF 14A) para la junta del 19-nov-2026: consejo, comisiones, remuneración, participaciones', editor: 'Jack Henry & Associates', tipo: 'Primaria', fecha: '2026-10-01', url: EDGAR + '000077915226000088/jkhy-20261001.htm' },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 12-nov-2025 (votos de consejeros y de remuneración)', editor: 'Jack Henry & Associates', tipo: 'Primaria', fecha: '2025-11-12', url: EDGAR },
  { id: 3, titulo: 'Form 4 presentados entre el 14-oct-2025 y el 14-oct-2026 (herramientas/form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000779152&type=4' },
  { id: 4, titulo: 'Form 8-K: David Foss deja el consejo (29-may-2026)', editor: 'Jack Henry & Associates', tipo: 'Primaria', fecha: '2026-06-04', url: EDGAR },
  { id: 5, titulo: 'Form 8-K: nombramiento de Richard Preece como consejero (20-ago-2026)', editor: 'Jack Henry & Associates', tipo: 'Primaria', fecha: '2026-08-24', url: EDGAR + '000077915226000060/jkhy-20260820.htm' },
  { id: 6, titulo: 'Jack Henry & Associates Stock: Is Wall Street Bullish or Bearish? (guía FY2026 de mayo: BPA 6,78-6,87; ventas 2.520-2.530 M)', editor: 'Barchart (Yahoo Finance)', tipo: 'Prensa', fecha: '2026-05-27', url: 'https://finance.yahoo.com/markets/stocks/articles/jack-henry-associates-stock-wall-100332629.html' },
  { id: 7, titulo: 'Nota de resultados del 4T FY2026 (resultado frente a la guía)', editor: 'Jack Henry & Associates', tipo: 'Primaria', fecha: '2026-08-18', url: EDGAR + '000077915226000057/jkhy-20260630xex99pressrel.htm' },
  { id: 8, titulo: 'Jack Henry outlines 75-95 bps FY2026 non-GAAP margin expansion (3T FY2026)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-05-06', url: 'https://seekingalpha.com/symbol/JKHY/news' },
];
pend.push(['C', {
  directivos: {
    equipo: [
      { nombre: 'Gregory R. Adelson', cargo: 'Presidente ejecutivo de la compañía (President) y consejero delegado', desde: '2024', participacion_pct: 0.04, trayectoria: 'En Jack Henry desde 2014 (vino de la compra de Banno/iPay); director de operaciones de 2022 a 2024. Con él como consejero delegado, el margen ajustado subió 92 pb en el FY2026 y las victorias de core pasaron de 51 a 58 [C1, C7]. Compró 2.000 acciones a 133,42 USD en mayo de 2026 [C3].' },
      { nombre: 'Mimi L. Carsley', cargo: 'Directora financiera y tesorera', desde: '2022', participacion_pct: 0.01, trayectoria: 'Antes directora financiera de Atlas Air y de otras cotizadas. Ha llevado la recompra de 448 M del FY2026 y la nueva línea de crédito de 1.000 M; compró 375 acciones en mayo de 2026 [C1, C3].' },
      { nombre: 'Matthew C. Flanigan', cargo: 'Presidente del consejo (independiente)', desde: '2007', participacion_pct: 0.07, trayectoria: 'Ex director financiero de Leggett & Platt; consejero coordinador desde 2012 y presidente desde julio de 2026 [C1].' },
      { nombre: 'Shanon G. McLachlan', cargo: 'Director de operaciones', desde: '2025', participacion_pct: 0.0, trayectoria: 'Responsable de la entrega y conversión de los nuevos clientes [C1].' },
      { nombre: 'Craig K. Morgan', cargo: 'Director jurídico y secretario', desde: '2015', participacion_pct: 0.02, trayectoria: 'Responsable jurídico y de cumplimiento [C1].' },
    ],
    historial_guidance: [
      { anio: 'FY2026', guia: 'Mayo de 2026: BPA GAAP 6,78-6,87 USD y ventas 2.520-2.530 M [C6]', real: 'BPA 6,98 USD y ventas 2.544 M [C7]', cumplida: 'Sí' },
      { anio: 'FY2026', guia: 'Mayo de 2026: margen operativo ajustado +75-95 pb [C8]', real: '+92 pb (24,1 %) [C7]', cumplida: 'Sí' },
      { anio: 'FY2026 (trimestres)', guia: 'Consenso de BPA de cada trimestre', real: 'Lo batió en los cuatro trimestres y en el 4T25 [C6, C7]', cumplida: 'Sí' },
    ],
    comentario: 'Equipo nuevo pero de la casa: Adelson es consejero delegado desde julio de 2024 tras una sucesión anunciada con antelación, y la presidencia pasó de Foss (ex consejero delegado) a un independiente, Flanigan, en julio de 2026 [C1, C4]. Cumplen o baten la guía: el BPA del FY2026 (6,98) superó la horquilla de mayo y el margen subió 92 pb dentro de la guía [C6, C7]. Los directivos compraron acciones en mayo de 2026 cerca de mínimos (Adelson 0,27 M, Carsley 0,05 M); el único vendedor relevante fue Foss (3,5 M en diciembre de 2025, antes de retirarse) [C3]. La participación de la dirección es pequeña (los 14 consejeros y directivos, < 1 %) [C1].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Matthew C. Flanigan', cargo: 'Presidente', tipo: 'Independiente', desde: '2007', comisiones: '—' },
      { nombre: 'Gregory R. Adelson', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2025', comisiones: '—' },
      { nombre: 'Thomas H. Wilson, Jr.', cargo: 'Consejero', tipo: 'Independiente', desde: '2012', comisiones: 'Auditoría (presidente), Gobierno' },
      { nombre: 'Thomas A. Wimsett', cargo: 'Consejero', tipo: 'Independiente', desde: '2012', comisiones: 'Auditoría, Riesgos y cumplimiento (presidente)' },
      { nombre: 'Shruti S. Miyashiro', cargo: 'Consejera', tipo: 'Independiente', desde: '2015', comisiones: 'Capital humano y retribuciones, Riesgos' },
      { nombre: 'Wesley A. Brown', cargo: 'Consejero (sale en la junta de 2026 por edad)', tipo: 'Independiente', desde: '2014', comisiones: 'Auditoría' },
      { nombre: 'Curtis A. Campbell', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Gobierno (presidente), Capital humano' },
      { nombre: 'Tammy S. LoCascio', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Capital humano y retribuciones (presidenta), Riesgos' },
      { nombre: 'Lisa M. Nelson', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría, Gobierno' },
      { nombre: 'Richard N. Preece', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Capital humano, Riesgos' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 90.8, voto_remuneracion_contra_pct: 8.8, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 8.41, fijo: 0.76, variable_corto: 1.27, variable_largo: 6.37, ratio_salario_medio: 87 },
    remuneracion: 'El 60 % del variable a largo plazo son acciones por objetivos a tres años, a partes iguales: rentabilidad total para el accionista frente al S&P 900, crecimiento orgánico anual de las ventas y expansión del margen operativo ajustado; el 40 % restante son acciones que se consolidan con el tiempo [C1]. Premia crecer y mejorar márgenes, no rentabilidad sobre el capital, pero el crecimiento medido es orgánico (sin compras ni desconversiones), lo que evita premiar compras caras [C1]. El voto consultivo de la junta de 2025 dio un 91 % a favor [C1, C2]. El consejero delegado cobró 8,41 M en el FY2026 (87 veces el empleado mediano) [C1].',
    accionistas: [
      { nombre: 'Vanguard Capital Management', pct: 7.7, tipo: 'Institucional (índices)', variacion: '13G de abril de 2026' },
      { nombre: 'BlackRock', pct: 6.8, tipo: 'Institucional (índices)', variacion: '13G de julio de 2026' },
      { nombre: 'State Street', pct: 5.7, tipo: 'Institucional (índices)', variacion: '13G de octubre de 2024' },
      { nombre: 'Vanguard Portfolio Management', pct: 5.1, tipo: 'Institucional (índices)', variacion: '13G de julio de 2026' },
      { nombre: 'Consejeros y directivos (14 personas)', pct: 0.4, tipo: 'Dirección', variacion: 'Compras de Adelson y Carsley en mayo de 2026' },
    ],
    insiders: [
      { fecha: '2025-11-10', persona: 'Shanon G. McLachlan (director de operaciones)', operacion: 'Venta', acciones: 227, importe: 0.04 },
      { fecha: '2025-12-01', persona: 'David B. Foss (presidente del consejo)', operacion: 'Venta', acciones: 20000, importe: 3.50 },
      { fecha: '2026-05-14', persona: 'Gregory R. Adelson (consejero delegado)', operacion: 'Compra', acciones: 2000, importe: 0.27 },
      { fecha: '2026-05-14', persona: 'Mimi L. Carsley (directora financiera)', operacion: 'Compra', acciones: 375, importe: 0.05 },
    ],
    control_y_defensas: 'Sin accionista de control: los cuatro mayores son gestoras de índices (25,3 % entre las cuatro líneas) [C1]. Una acción, un voto; consejo de elección anual; presidente independiente desde julio de 2026 (antes consejero coordinador independiente desde 2012) [C1]. La junta de 2025 rechazó una propuesta de accionistas para facilitar la convocatoria de juntas extraordinarias [C2]. Sin operaciones vinculadas declaradas [C1]. Edad máxima de los consejeros de 72 años, que aplica este año a Wesley Brown [C1].',
    alertas: ['Incidente cibernético comunicado el 31-ago-2026, sin efecto en las operaciones según la empresa; vigilar si aparecen reclamaciones de clientes.', 'Cambio de presidente del consejo en julio de 2026 (Foss se retira; Flanigan, independiente, le sustituye) [C4].'],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto de remuneración de las juntas de 2023 y 2024', tipo: 'Complemento', intentos: '1) 8-K de la junta de 2025 (solo esa junta); 2) proxy 2026 (solo el 91 % de 2025); 3) no buscado en los 8-K de 2023-2024 por tiempo', decision: 'Omitido' },
  ],
}]);

// ---------------------------------------------------------------- D. Mercado y valoración
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const fD = [
  { id: 1, titulo: 'Históricos diarios de JKHY, SPY y XLF (herramientas/bolsa.mjs): precio, rango, betas, rentabilidades, cierres de ejercicio', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/JKHY/history' },
  { id: 2, titulo: 'JKHY: estimaciones de analistas (BPA y ventas FY2027-FY2028, revisiones a 30 y 90 días), recomendaciones y precio objetivo', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/JKHY/analysis' },
  { id: 3, titulo: '10-Year Treasury Constant Maturity Rate (DGS10): 5,21 % el 13-oct-2026', editor: 'FRED, Reserva Federal de St. Louis', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Tipos de cambio de referencia del euro, 14-oct-2026 (USD 1,1195; CHF 0,9330)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 6, titulo: 'Estadísticas clave y estimaciones de FIS, Broadridge, SS&C, ACI Worldwide, Q2, nCino y Temenos (cierre del 14-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/FIS/key-statistics' },
  { id: 7, titulo: 'Fiserv: análisis value del repositorio (precio 46,66, PER NTM 5,4x, EV/EBITDA 5,7x; 13-oct-2026)', editor: 'Repositorio de análisis (informes/fiserv-2026-10-14)', tipo: 'Analistas', fecha: '2026-10-14', url: 'informes/fiserv-2026-10-14/' },
  { id: 8, titulo: 'Titulares de JKHY: subida de Piper Sandler a sobreponderar (9-oct), incidente cibernético (31-ago), día del inversor (16-sep)', editor: 'Seeking Alpha (RSS)', tipo: 'Prensa', fecha: '2026-10-09', url: 'https://seekingalpha.com/api/sa/combined/JKHY.xml' },
  { id: 9, titulo: 'Global Payments Announces Agreements to Acquire Worldpay and Divest Issuer Solutions (múltiplos)', editor: 'Global Payments (Form 8-K, Ex. 99.1)', tipo: 'Primaria', fecha: '2025-04-17', url: 'https://www.sec.gov/Archives/edgar/data/1123360/000110465925035771/tm2512552d1_ex99-1.htm' },
  { id: 10, titulo: 'Thoma Bravo completes $2.6B acquisition of Bottomline (57 USD por acción, prima del 42 %)', editor: 'S&P Global Market Intelligence', tipo: 'Prensa', fecha: '2022-05', url: 'https://www.spglobal.com/market-intelligence/en/news-insights/articles/2022/5/thoma-bravo-completes-2-6b-acquisition-of-bottomline-70346061' },
  { id: 11, titulo: 'Form 10-K FY2026 de Jack Henry (acciones en circulación el 12-ago-2026: 70.112.608)', editor: 'Jack Henry & Associates', tipo: 'Primaria', fecha: '2026-08-25', url: EDGAR + '000077915226000067/jkhy-20260630.htm' },
];
const cierres = Object.fromEntries(bolsa.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
pend.push(['D', {
  identificacion: {
    nombre: 'Jack Henry & Associates, Inc.', nombre_corto: 'Jack Henry', ticker: 'JKHY', isin: 'US4262811015', mercado: 'Nasdaq Global Select', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Tecnologías de la información / Financieras (GICS: servicios de transacciones y pagos)', industria: 'Tecnología para bancos y cooperativas de crédito',
    sede: 'Monett (Misuri)', fundacion: '1976', empleados: 7300, web: 'https://www.jackhenry.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 70.4, capitalizacion_publicada: 10886, free_float_pct: 99.6,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M USD/día (3 meses)`, proximos_resultados: '2026-11-03',
  },
  consenso: {
    guidance: 'Guía del FY2027 (18-ago-2026): ventas GAAP de 2.684-2.709 M (+5,5-6,5 %), margen operativo GAAP del 24,5-24,7 % y BPA GAAP de 7,33-7,38 USD (+5,0-5,7 %); en términos ajustados, ventas +6,3-7,3 % y margen +20-40 pb. Supone 23 M de desconversiones (43 M en FY2026) y ninguna compra [A5]. En el día del inversor (16-sep-2026) la empresa dio por primera vez una perspectiva a dos años: crecimiento ajustado del 6,7-7,7 % en el FY2028 y del 7-8 % en el FY2029, y un objetivo de largo plazo del 7-8 % o más; conversión de caja libre del 80-100 % en el FY2027 [B4].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 2694, ebitda: null, ebit: null, bpa: 7.25, dpa: 2.44, fuente: 'Yahoo Finance, 13 analistas de BPA y 18 de ventas [D2]' },
      { periodo: 'FY2028e', ingresos: 2883, ebitda: null, ebit: null, bpa: 7.90, dpa: null, fuente: 'Yahoo Finance, 13 analistas de BPA y 17 de ventas [D2]' },
    ],
    recomendaciones: { n_analistas: 20, comprar: 15, mantener: 5, vender: 0, po_medio: 189.67, po_min: 158, po_max: 209 },
    revisiones: 'Al alza: el BPA del FY2027 pasó de 7,10 USD hace 90 días a 7,25 hoy (+2,1 %) y el del FY2028 de 7,68 a 7,90 (+2,9 %), tras una guía mejor de lo esperado (BPA 7,33-7,38 frente a 7,10 de consenso) [D2]. El objetivo medio de 18 analistas es de 189,67 USD (158-209) [D2]. Movimientos recientes: Barclays empezó con sobreponderar (170), KeyBanc con sobreponderar (190) y Piper Sandler subió a sobreponderar el 9-oct con objetivo de 175 por valoración [D8]. Una sola fuente con estimaciones completas (Yahoo Finance); el BPA del consenso está por debajo de la guía GAAP porque parte de los analistas excluye las desconversiones.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    tipo_rentabilidad: 'total (con dividendos)',
    beta: 0.57,
    posicion_corta_pct: null,
    comentario: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['FY2019', 'FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'].map((a) => ({ anio: a, precio_cierre: cierres[a], ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: null,
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Proveedores de tecnología para bancos y entidades financieras que cotizan en EE. UU. y Europa: los dos rivales directos en el core (Fiserv y FIS), proveedores de proceso y software financiero de modelo recurrente (Broadridge, SS&C, ACI Worldwide), banca digital y préstamos para bancos regionales (Q2, nCino) y el mayor proveedor de core europeo (Temenos). Fuera: Alkami (pérdidas), Global Payments (adquirencia de comercios) y Tyler (gobiernos). Ojo: casi todos dan BPA ajustado (sin amortización de compras ni pagos en acciones), que hace su PER más bajo que el GAAP de Jack Henry; el de FIS sube por la compra de Issuer Solutions.',
    empresas: [
      { nombre: 'Fiserv', ticker: 'FISV', pais: 'US', capitalizacion: 24618, ev_ventas: 2.49, ev_ebitda_ltm: 5.7, ev_ebitda_ntm: null, per_ntm: 5.4, crecimiento_pct: -0.9, margen_ebitda_pct: 43.2, roic_pct: 8.9, dn_ebitda: 3.0, fcf_yield_pct: 18.0 },
      { nombre: 'FIS', ticker: 'FIS', pais: 'US', capitalizacion: 18292, ev_ventas: 3.18, ev_ebitda_ltm: 11.0, ev_ebitda_ntm: null, per_ntm: 5.4, crecimiento_pct: 16.0, margen_ebitda_pct: 28.9, roic_pct: null, dn_ebitda: 5.8, fcf_yield_pct: 14.5 },
      { nombre: 'Broadridge', ticker: 'BR', pais: 'US', capitalizacion: 18997, ev_ventas: 2.98, ev_ebitda_ltm: 12.3, ev_ebitda_ntm: null, per_ntm: 15.4, crecimiento_pct: 6.8, margen_ebitda_pct: 24.2, roic_pct: null, dn_ebitda: 1.7, fcf_yield_pct: 6.3 },
      { nombre: 'SS&C Technologies', ticker: 'SSNC', pais: 'US', capitalizacion: 19253, ev_ventas: 4.06, ev_ebitda_ltm: 12.6, ev_ebitda_ntm: null, per_ntm: 10.8, crecimiento_pct: 7.3, margen_ebitda_pct: 32.1, roic_pct: null, dn_ebitda: 3.5, fcf_yield_pct: 6.8 },
      { nombre: 'ACI Worldwide', ticker: 'ACIW', pais: 'US', capitalizacion: 5156, ev_ventas: 3.21, ev_ebitda_ltm: 15.3, ev_ebitda_ntm: null, per_ntm: 13.2, crecimiento_pct: 11.3, margen_ebitda_pct: 21.1, roic_pct: null, dn_ebitda: 1.8, fcf_yield_pct: 5.1 },
      { nombre: 'Q2 Holdings', ticker: 'QTWO', pais: 'US', capitalizacion: 3706, ev_ventas: 4.30, ev_ebitda_ltm: 31.8, ev_ebitda_ntm: null, per_ntm: 18.1, crecimiento_pct: 13.5, margen_ebitda_pct: 13.5, roic_pct: null, dn_ebitda: -0.6, fcf_yield_pct: 5.1 },
      { nombre: 'nCino', ticker: 'NCNO', pais: 'US', capitalizacion: 2080, ev_ventas: 3.78, ev_ebitda_ltm: 25.6, ev_ebitda_ntm: null, per_ntm: 13.0, crecimiento_pct: 10.5, margen_ebitda_pct: 14.8, roic_pct: null, dn_ebitda: 2.8, fcf_yield_pct: 7.3 },
      { nombre: 'Temenos', ticker: 'TEMN', pais: 'CH', capitalizacion: 5804, ev_ventas: 4.87, ev_ebitda_ltm: 18.1, ev_ebitda_ntm: null, per_ntm: 14.2, crecimiento_pct: 12.0, margen_ebitda_pct: 26.9, roic_pct: null, dn_ebitda: 2.2, fcf_yield_pct: 5.5 },
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-04', objetivo: 'Worldpay', comprador: 'Global Payments', ev: 24250, ev_ventas: 4.8, ev_ebitda: 8.5, prima_pct: null, excluir: false, comentario: 'Adquirencia de comercios; 8,5x EBITDA ajustado con sinergias [D9].' },
      { fecha: '2025-04', objetivo: 'Issuer Solutions (Global Payments)', comprador: 'FIS', ev: 13500, ev_ventas: null, ev_ebitda: 12.3, prima_pct: null, excluir: false, comentario: 'Proceso de emisores de tarjetas, el negocio más parecido a Payments de Jack Henry; 12,3x EBITDA ajustado con sinergias [D9].' },
      { fecha: '2021-12', objetivo: 'Bottomline Technologies', comprador: 'Thoma Bravo', ev: 2600, ev_ventas: 5.3, ev_ebitda: null, prima_pct: 42, excluir: false, comentario: 'Pagos empresariales y banca digital; EV/ventas estimado con cuatro veces las ventas del trimestre a sep-21 (123,6 M; estimación propia) [D10].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) Nasdaq (no descargado); 2) Yahoo (no en la consulta); 3) sin más tiempo', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'EBITDA del consenso', tipo: 'Complemento', intentos: '1) Yahoo Finance (solo BPA y ventas); 2) MarketScreener (no consultado por tiempo); 3) la empresa no da guía de EBITDA', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'múltiplos de Fiserv-First Data y FIS-Worldpay (2019)', tipo: 'Complemento', intentos: '1) búsqueda web; 2) nota de Global Payments; 3) proxies de 2019 no descargados', decision: 'Omitido' },
  ],
}]);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'JKHY: hilo de mensajes (≈ 30 leídos, julio-octubre de 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-11', url: 'https://stocktwits.com/symbol/JKHY' },
  { id: 2, titulo: 'JKHY: titulares y artículos de análisis (≈ 30, marzo-octubre de 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-09', url: 'https://seekingalpha.com/symbol/JKHY' },
  { id: 3, titulo: 'Jack Henry & Associates (JKHY) Fell Despite Robust Results (carta de Conestoga Capital, 2T26)', editor: 'Insider Monkey', tipo: 'Foros y redes', fecha: '2026-08-06', url: 'https://www.insidermonkey.com/blog/jack-henry-associates-jkhy-fell-despite-robust-results-1807739/' },
  { id: 4, titulo: 'Jack Henry & Associates: análisis y riesgos (conversión de victorias, exposición a la IA)', editor: 'Trefis', tipo: 'Foros y redes', fecha: '2026', url: 'https://www.trefis.com/data/companies/jkhy' },
  { id: 5, titulo: 'Q4 2026 earnings: reacción de la acción (+7,8 % tras resultados; −13 % del 24-ago al 23-sep)', editor: 'AllInvestView', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://www.allinvestview.com/earnings/JKHY/q4-2026/' },
];
pend.push(['E', {
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Los inversores de corto plazo vieron «flojos» los resultados del 4T por la caída del margen trimestral; desde septiembre se repiten las subidas de recomendación (KeyBanc, Barclays, Piper) como «llamada de valoración: el múltiplo se comprimió y el negocio no» [E1].' },
      { plataforma: 'Seeking Alpha', fecha: '2026-08', n_comentarios: 30, tono: 'Positivo', resumen: 'Artículos con títulos como «una de las valoraciones más bajas en años» (agosto) frente a «la calidad sigue, pero el crecimiento se frena» (marzo) [E2].' },
      { plataforma: 'Insider Monkey (cartas de gestoras)', fecha: '2026-08', n_comentarios: 3, tono: 'Neutro', resumen: 'Gestoras de pequeñas compañías de calidad (Conestoga) explican la caída por la rotación hacia valores de IA y de beta alta, no por el negocio [E3].' },
      { plataforma: 'Trefis y resúmenes de resultados', fecha: '2026-09', n_comentarios: 5, tono: 'Negativo', resumen: 'Preocupan el plazo en que las victorias de core se convierten en ingresos y la exposición a la IA; la acción cayó un 13 % entre el 24-ago y el 23-sep [E4, E5].' },
    ],
    temas: [
      { tema: 'Valoración en mínimos de varios años', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto: el PER adelantado de hoy (≈ 21x con nuestro BPA) está por debajo de todos los cierres de ejercicio desde 2019 (25,8-44,7x).' },
      { tema: 'La IA y la rotación del mercado', postura: 'Bajista', peso: 'Alto', contraste: 'El castigo es sectorial (software y pagos desde febrero); el core regulado es de riesgo bajo, la banca digital de riesgo medio (sección de riesgos).' },
      { tema: 'Fusiones bancarias', postura: 'Dividida', peso: 'Medio', contraste: 'Reducen clientes pero pagan desconversiones (42,8 M en FY2026); la guía del FY2027 supone 23 M.' },
      { tema: 'Márgenes del 4T y guía del FY2027 (+5 % de BPA)', postura: 'Bajista', peso: 'Medio', contraste: 'El 4T bajó por menos desconversiones y gastos médicos; la guía ajustada sube el margen 20-40 pb.' },
      { tema: 'Victorias frente a Fiserv y FIS', postura: 'Alcista', peso: 'Medio', contraste: 'Confirmado: 58 victorias de core y Woodforest; se notarán en ventas en el FY2028-FY2029 (perspectiva 7-8 %).' },
    ],
    lectura: 'El sentimiento de los particulares fue negativo en verano (resultados «flojos», margen del 4T, rotación hacia la IA) y mejora desde septiembre con tres subidas de recomendación que se presentan como pura valoración. No hay euforia ni capitulación: es la visión del consenso de analistas (15 de 20 compran). Lo que aporta: el mercado castiga a Jack Henry por pertenecer al software y a los pagos, no por sus cifras, que baten la guía. El riesgo que señalan los foros (conversión lenta de las victorias, IA) ya está en el informe.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
}]);
for (const [L, o] of pend) FUENTES_TODAS[L] = o.fuentes;
for (const [L, o] of pend) guarda(L, o);
console.log('Notas A-E escritas en', dir);

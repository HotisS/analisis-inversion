// Genera notas/A.json (subagente A, GigaCloud). Cifras copiadas de los documentos de notas/docs.
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const dir = dirname(fileURLToPath(import.meta.url));
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;

const SEC = 'https://www.sec.gov/Archives/edgar/data/1857816/';
const fuentes = [
  { id: 1, titulo: 'GigaCloud Technology Inc, Form 10-K del ejercicio 2025', editor: 'GigaCloud / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-26', url: SEC + '000185781626000018/gct-20251231.htm' },
  { id: 2, titulo: 'GigaCloud Technology Inc, Form 10-K del ejercicio 2024', editor: 'GigaCloud / SEC EDGAR', tipo: 'Primaria', fecha: '2025-03-03', url: SEC + '000185781625000015/gct-20241231.htm' },
  { id: 3, titulo: 'GigaCloud Technology Inc, Form 10-K del ejercicio 2023', editor: 'GigaCloud / SEC EDGAR', tipo: 'Primaria', fecha: '2024-03-27', url: SEC + '000185781624000066/gct-20231231.htm' },
  { id: 4, titulo: 'GigaCloud Technology Inc, Form 10-Q del 3T26 (30-sep-2026)', editor: 'GigaCloud / SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-05', url: SEC + '000162828026070475/gct-20260930.htm' },
  { id: 5, titulo: 'Comunicado de resultados del 3T26 (8-K, anexo 99.1)', editor: 'GigaCloud / SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-05', url: SEC + '000162828026070471/gct-2026q3xearningsrelease.htm' },
  { id: 6, titulo: 'Comunicado de resultados del 2T26 (8-K, anexo 99.1)', editor: 'GigaCloud / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: SEC + '000185781626000072/gct-2026q2earningsrelease.htm' },
  { id: 7, titulo: 'Comunicado de resultados del 1T26 (8-K, anexo 99.1)', editor: 'GigaCloud / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-07', url: SEC + '000185781626000054/gct-2026q1earningsrelease.htm' },
  { id: 8, titulo: 'Comunicado de resultados del 4T25 y del ejercicio 2025 (8-K, anexo 99.1)', editor: 'GigaCloud / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-26', url: SEC + '000185781626000017/a2026-02x26x8xkex991earnin.htm' },
  { id: 9, titulo: 'Comunicado de resultados del 3T25 (8-K, anexo 99.1)', editor: 'GigaCloud / SEC EDGAR', tipo: 'Primaria', fecha: '2025-11-06', url: SEC + '000185781625000120/a2025-11x06x8xkex991earnin.htm' },
  { id: 10, titulo: 'Comunicado de resultados del 2T25 (8-K, anexo 99.1)', editor: 'GigaCloud / SEC EDGAR', tipo: 'Primaria', fecha: '2025-08-07', url: SEC + '000185781625000099/a2025-08x07x8xkex991earnin.htm' },
  { id: 11, titulo: 'Comunicado de resultados del 1T25 (8-K, anexo 99.1)', editor: 'GigaCloud / SEC EDGAR', tipo: 'Primaria', fecha: '2025-05-12', url: SEC + '000185781625000062/a2025-05x12x8xkex991earnin.htm' },
  { id: 12, titulo: 'Comunicado de resultados del 4T24 y del ejercicio 2024 (8-K, anexo 99.1)', editor: 'GigaCloud / SEC EDGAR', tipo: 'Primaria', fecha: '2025-03-03', url: SEC + '000185781625000013/a2025-03x03x8xkex991earnin.htm' },
  { id: 13, titulo: 'Comunicado de resultados del 3T24 (8-K, anexo 99.1)', editor: 'GigaCloud / SEC EDGAR', tipo: 'Primaria', fecha: '2024-11-07', url: SEC + '000185781624000210/a2024-11x07x8xkex991earnin.htm' },
  { id: 14, titulo: 'Comunicado de resultados del 2T24 (8-K, anexo 99.1)', editor: 'GigaCloud / SEC EDGAR', tipo: 'Primaria', fecha: '2024-08-06', url: SEC + '000185781624000179/a2024-08x6x8xkex991earning.htm' },
  { id: 15, titulo: 'GigaCloud Technology Inc: hechos XBRL (companyfacts), balance de 2021 del 20-F 2022', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2023-04-24', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001857816.json' },
];
const extra = existsSync(join(dir, 'A-extra.json')) ? JSON.parse(readFileSync(join(dir, 'A-extra.json'), 'utf8')) : {};
for (const f of extra.fuentes || []) fuentes.push(f);

// ---------- Cuenta de resultados (miles de USD en los documentos -> millones) ----------
const k = (x) => r1(x / 1000);
const cuentaRaw = [
  // periodo, ingresos, coste, S&M, G&A, R&D, EBIT, D&A, BAI, impuestos, BN, gasto fin, BPA dil, acciones dil
  ['2021', 414197, 324600, 25728, 24516, 0, 39353, 775, 37725, 8468, 29257, 309, 0.88, 10248079],
  ['2022', 490071, 406957, 24038, 22627, 1426, 35023, 1386, 31164, 7192, 23972, 568, 0.60, 24412314],
  ['2023', 703831, 515198, 41386, 30008, 3925, 110078, 2873, 114995, 20887, 94108, 1240, 2.30, 40922590],
  ['2024', 1161042, 875806, 70686, 73944, 9791, 130622, 8524, 140614, 14806, 125808, 256, 3.05, 41201026],
  ['2025', 1289897, 989231, 98203, 46559, 10832, 144976, 8332, 161190, 23818, 137372, 200, 3.59, 38232899],
];
const cuenta = cuentaRaw.map(([p, ing, cv, sm, ga, rd, ebit, da, bai, imp, bn, gf, bpa, acc]) => ({
  periodo: p, ingresos: k(ing), coste_ventas: k(cv), gastos_generales: k(sm + ga),
  ebitda: k(ebit + da), amortizaciones: k(da), ebit: k(ebit), resultado_financiero: k(bai - ebit),
  bai: k(bai), impuestos: k(imp), minoritarios: 0, beneficio_neto: k(bn), gastos_financieros: k(gf),
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
  bpa: bpa, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: r2(acc / 1e6),
}));

// LTM a 30-sep-2026 = 2025 - 9M25 + 9M26 [1, 5]
const ltm = {
  periodo: 'LTM sep-26', fecha_fin: '2026-09-30',
  ingresos: k(1289897 - 927150 + 1194695),
  ebitda: k((144976 - 104686 + 149021) + (8332 - 6304 + 6729)),
  ebit: k(144976 - 104686 + 149021),
  beneficio_neto: k(137372 - 98873 + 131067),
  bpa: r2(1.04 + 1.04 + 1.16 + 1.41),
  dpa: 0, dpa_extraordinario: 0,
  fcf: k((190660 - 126292 + 83060) - (7873 - 5162 + 8321) - (377 - 284 + 463)),
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
};

// ---------- Trimestres ----------
// periodo, ingresos, ingresos año anterior, EBIT, D&A trimestral (de la conciliación del EBITDA ajustado), BPA diluido, EBITDA ajustado
const tq = [
  ['4T24', 295782, 244737, 27634, 8524 - 6253, 0.76, 30902, 12],
  ['1T25', 271906, 251077, 28323, 2049, 0.68, 33183, 11],
  ['2T25', 322606, 310867, 35843, 4189 - 2049, 0.91, 43338, 10],
  ['3T25', 332638, 303316, 40520, 6304 - 4189, 0.99, 43447, 9],
  ['4T25', 362747, 295782, 40290, 8332 - 6304, 1.04, 42976, 8],
  ['1T26', 359488, 271906, 42479, 2226, 1.04, 45624, 7],
  ['2T26', 411643, 322606, 47511, 4431 - 2226, 1.16, 60407, 6],
  ['3T26', 423564, 332638, 59031, 6729 - 4431, 1.41, 61824, 5],
];
const vsc = extra.vs_consenso || {};
const trimItems = tq.map(([p, ing, ingAnt, ebit, da, bpa, adj]) => ({
  periodo: p, ingresos: k(ing), crecimiento_pct: r1((ing / ingAnt - 1) * 100), crecimiento_organico_pct: (extra.organico || {})[p] ?? null,
  ebitda: k(ebit + da), margen_ebitda_pct: r1(((ebit + da) / ing) * 100), bpa, vs_consenso: vsc[p] ?? null,
}));

// ---------- Balance ----------
// caja = efectivo + efectivo restringido + inversiones a corto (letras del Tesoro y depósitos) [1, 2]
const balance = [
  { periodo: '2021', activo_total: 186.8, activo_corriente: 172.4, pasivo_corriente: 57.0, pasivo_total: 60.9, fondo_comercio: 0, intangibles: 0, inmovilizado_material: 11.1, existencias: 81.4, clientes: 18.0, proveedores: 25.1, activos_contrato: null, pasivos_contrato: 3.7, caja: 63.9, deuda_financiera: 0.6, arrendamientos: 4.7, patrimonio_neto: 99.2, minoritarios: 0, reservas: 60.6 },
  { periodo: '2022', activo_total: 418.6, activo_corriente: 258.1, pasivo_corriente: 102.6, pasivo_total: 223.4, fondo_comercio: 0, intangibles: 0, inmovilizado_material: 13.1, existencias: 78.3, clientes: 27.1, proveedores: 31.6, activos_contrato: null, pasivos_contrato: 2.0, caja: 145.1, deuda_financiera: 0.2, arrendamientos: 3.8, patrimonio_neto: 195.2, minoritarios: 0, reservas: 83.6 },
  { periodo: '2023', activo_total: 846.9, activo_corriente: 392.8, pasivo_corriente: 205.8, pasivo_total: 556.5, fondo_comercio: 12.6, intangibles: 8.4, inmovilizado_material: 24.6, existencias: 132.2, clientes: 58.9, proveedores: 69.8, activos_contrato: null, pasivos_contrato: 5.5, caja: 184.2, deuda_financiera: 0, arrendamientos: 1.8, patrimonio_neto: 290.4, minoritarios: 0, reservas: 177.7 },
  { periodo: '2024', activo_total: 1070.5, activo_corriente: 547.6, pasivo_corriente: 264.4, pasivo_total: 665.3, fondo_comercio: 12.6, intangibles: 6.2, inmovilizado_material: 29.5, existencias: 172.5, clientes: 57.3, proveedores: 78.2, activos_contrato: null, pasivos_contrato: 4.5, caja: 303.1, deuda_financiera: 0, arrendamientos: 0.5, patrimonio_neto: 405.2, minoritarios: 0, reservas: 298.9 },
  { periodo: '2025', activo_total: 1202.5, activo_corriente: 690.7, pasivo_corriente: 342.2, pasivo_total: 716.7, fondo_comercio: 12.6, intangibles: 5.0, inmovilizado_material: 32.3, existencias: 188.3, clientes: 66.0, proveedores: 105.4, activos_contrato: null, pasivos_contrato: 6.5, caja: 416.9, deuda_financiera: 0, arrendamientos: 1.0, patrimonio_neto: 485.8, minoritarios: 0, reservas: 400.9 },
];

// ---------- Flujos ----------
const flujos = [
  { periodo: '2021', flujo_operativo: 8.6, capex: 1.8, pagos_arrendamientos: 2.5, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: 49.7, capex: 0.7, pagos_arrendamientos: 3.6, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 35.8, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: 133.5, capex: 4.4, pagos_arrendamientos: 2.2, adquisiciones: 86.6, desinversiones: 0.5, dividendos: 0, recompras: 1.6, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 158.1, capex: 15.5, pagos_arrendamientos: 1.7, adquisiciones: 0, desinversiones: 2.1, dividendos: 0, recompras: 23.2, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 190.7, capex: 7.9, pagos_arrendamientos: 0.4, adquisiciones: 1.0, desinversiones: 0.2, dividendos: 0, recompras: 67.4, emision_acciones: 0, intereses_en_financiacion: 0 },
];

const T = extra.textos || {};
const out = {
  negocio: extra.negocio ?? null,
  financieros: {
    cuenta, ltm,
    cambios_perimetro: [
      { periodo: '2023', descripcion: 'Noble House (activos comprados por 77,6 M, oct-23) y Wondersign (10,0 M, nov-23): el balance de 2023 las incluye enteras y la cuenta solo uno o dos meses [3].' },
      { periodo: '2026', descripcion: 'New Classic (mayorista estadounidense de muebles), consolidada desde enero de 2026; contraprestación de 18,7 M con un pago contingente en 2027. Afecta al LTM y a los trimestres de 2026 [4].' },
    ],
    comentario: T.fin_comentario ?? null,
    ajustes: T.fin_ajustes ?? null,
    confianza: 'Alta',
  },
  trimestres: { items: trimItems, ultima_presentacion: T.ultima_presentacion ?? null, confianza: 'Alta' },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 0.4 }, { anio: '2027', importe: 0.3 }, { anio: '2028', importe: 0.2 }, { anio: '2029', importe: 0.2 }, { anio: '2030+', importe: 0.1 }],
    liquidez: T.liquidez ?? null, rating: 'Sin rating', coste_deuda_pct: null, vida_media_anios: null,
    otros_pasivos: T.otros_pasivos ?? null, comentario: T.bal_comentario ?? null,
    confianza: 'Alta',
  },
  flujos: { historico: flujos, comentario: T.flu_comentario ?? null, confianza: 'Alta' },
  calidad: extra.calidad ?? null,
  rentabilidad: null,
  capital: extra.capital ?? null,
  fuentes,
  huecos: extra.huecos || [],
};
writeFileSync(join(dir, 'A.json'), JSON.stringify(out, null, 2) + '\n', 'utf8');
console.log('A.json escrito', fuentes.length, 'fuentes');
console.log(JSON.stringify({ ltm, trim: trimItems.map((t) => [t.periodo, t.ingresos, t.crecimiento_pct, t.ebitda, t.margen_ebitda_pct]) }));

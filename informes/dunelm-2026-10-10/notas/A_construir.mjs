// Construye notas/A.json (subagente A, Dunelm). Datos copiados de los documentos de notas/docs.
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const dir = dirname(fileURLToPath(import.meta.url));
const extra = existsSync(join(dir, 'A_textos.json')) ? JSON.parse(readFileSync(join(dir, 'A_textos.json'), 'utf8')) : {};

// periodo, ingresos, coste_ventas, gastos_generales, amortizaciones, ebit, resultado_financiero, bai, impuestos, beneficio_neto, gastos_financieros, bpa, dpa, dpa_extra, acciones, no_recurrentes
const C = [
  ['FY2017', 955.6, 488.5, 372.3, 30.5, 94.8, -2.4, 92.4, 19.3, 73.1, 2.6, 0.361, 0.26, 0, 202.578, 16.9],
  ['FY2018', 1050.1, 546.5, 407.8, 34.9, 95.8, -2.7, 93.1, 19.8, 73.3, 2.7, 0.362, 0.265, 0, 202.737, 8.9],
  ['FY2019', 1100.4, 554.8, 418.7, 39.4, 126.9, -1.0, 125.9, 24.6, 101.3, 1.9, 0.499, 0.60, 0.32, 202.976, null],
  ['FY2020', 1057.9, 525.5, 416.4, 80.2, 116.0, -6.9, 109.1, 21.4, 87.7, 7.3, 0.429, 0.08, 0, 204.219, null],
  ['FY2021', 1336.2, 647.3, 522.5, 80.8, 166.4, -8.6, 157.8, 28.9, 128.9, 8.7, 0.629, 1.00, 0.65, 204.890, null],
  ['FY2022', 1581.4, 772.0, 591.7, 79.3, 217.7, -4.9, 212.8, 41.6, 171.2, 6.1, 0.836, 0.77, 0.37, 204.857, null],
  ['FY2023', 1638.8, 817.9, 622.1, 79.4, 198.8, -6.1, 192.7, 40.8, 151.9, 7.8, 0.750, 0.82, 0.40, 202.663, null],
  ['FY2024', 1706.5, 823.2, 670.0, 82.0, 213.3, -7.9, 205.4, 54.2, 151.2, 9.9, 0.744, 0.785, 0.35, 203.248, null],
  ['FY2025', 1771.0, 842.7, 706.3, 83.4, 222.0, -11.0, 211.0, 54.7, 156.3, 12.0, 0.768, 0.795, 0.35, 203.385, null],
  ['FY2026', 1825.5, 866.5, 734.1, 88.5, 224.9, -13.9, 211.0, 55.5, 155.5, 14.8, 0.768, 0.705, 0.25, 202.416, null],
];
const cuenta = C.map(r => ({
  periodo: r[0], ingresos: r[1], coste_ventas: r[2], gastos_generales: r[3],
  ebitda: +(r[5] + r[4]).toFixed(1), amortizaciones: r[4], ebit: r[5], resultado_financiero: r[6], bai: r[7], impuestos: r[8],
  minoritarios: 0, beneficio_neto: r[9], gastos_financieros: r[10], participadas_en_ebitda: null, no_recurrentes_en_ebitda: r[15],
  bpa: r[11], dpa: r[12], dpa_extraordinario: r[13], acciones_diluidas: r[14],
}));

// periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, intangibles, inmovilizado_material, existencias, clientes, proveedores, caja, deuda_financiera, arrendamientos, patrimonio_neto, reservas
const B = [
  ['FY2017', 433.2, 210.2, 140.5, 323.1, 27.5, 195.2, 165.3, 0.4, 78.7, 17.4, 139.5, 0, 110.1, 64.0],
  ['FY2018', 425.0, 196.4, 110.3, 290.3, 28.6, 198.6, 154.7, 0.3, 51.1, 15.0, 139.0, 0, 134.7, 85.1],
  ['FY2019', 417.1, 207.4, 149.8, 231.3, 27.3, 180.6, 157.7, 1.3, 62.6, 19.0, 44.3, 0, 185.8, 134.0],
  ['FY2020', 716.0, 228.8, 227.8, 542.6, 22.7, 175.4, 118.2, 1.3, 71.7, 90.0, 44.6, 314.4, 173.4, 121.3],
  ['FY2021', 766.7, 315.6, 235.9, 485.5, 14.8, 162.6, 172.4, 0.9, 69.4, 128.6, 0, 293.3, 281.2, 238.7],
  ['FY2022', 737.9, 297.1, 276.0, 559.6, 9.9, 173.7, 223.0, 2.9, 98.3, 30.2, 54.0, 278.1, 178.3, 111.2],
  ['FY2023', 696.8, 283.4, 269.6, 559.3, 5.3, 169.9, 211.0, 3.1, 94.6, 46.3, 77.0, 258.2, 137.5, 97.5],
  ['FY2024', 682.0, 272.9, 263.5, 544.1, 3.8, 180.5, 223.0, 3.7, 92.3, 23.4, 79.0, 249.6, 137.9, 94.8],
  ['FY2025', 741.5, 298.2, 286.4, 622.7, 10.8, 208.2, 226.3, 9.6, 93.7, 30.0, 132.0, 247.5, 118.8, 84.9],
  ['FY2026', 756.8, 280.9, 276.6, 608.3, 18.1, 210.8, 212.1, 5.9, 92.5, 22.4, 117.0, 268.5, 148.5, 100.3],
];
const historico = B.map(r => ({
  periodo: r[0], activo_total: r[1], activo_corriente: r[2], pasivo_corriente: r[3], pasivo_total: r[4], fondo_comercio: 0,
  intangibles: r[5], inmovilizado_material: r[6], existencias: r[7], clientes: r[8], proveedores: r[9],
  activos_contrato: null, pasivos_contrato: null, caja: r[10], deuda_financiera: r[11], arrendamientos: r[12],
  patrimonio_neto: r[13], minoritarios: 0, reservas: r[14],
}));

// periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, recompras, emision_acciones, intereses_en_financiacion
const F = [
  ['FY2017', 79.5, 58.0, 0, 7.5, 0.2, 51.6, 4.2, 0.9, 1.4],
  ['FY2018', 98.5, 46.2, 0, 0, 0.6, 53.4, 0, 1.3, 2.7],
  ['FY2019', 174.0, 25.0, 0, 0, 5.4, 54.6, 0, 0.2, 1.6],
  ['FY2020', 244.1, 24.9, 37.7, 0, 0, 106.0, 0, 2.0, 6.9],
  ['FY2021', 184.2, 15.7, 54.0, 0, 0, 24.3, 0, 1.8, 6.1],
  ['FY2022', 251.8, 24.0, 50.2, 17.7, 0, 282.1, 28.3, 3.9, 7.0],
  ['FY2023', 240.6, 21.8, 52.0, 0, 0, 163.3, 7.0, 2.4, 7.5],
  ['FY2024', 232.3, 39.9, 50.8, 0, 0, 157.6, 0, 0.1, 11.0],
  ['FY2025', 255.9, 66.8, 50.6, 0.5, 0, 159.4, 14.7, 0.7, 12.0],
  ['FY2026', 270.4, 42.7, 59.0, 0, 0, 141.0, 15.6, 9.2, 14.9],
];
const fh = F.map(r => ({ periodo: r[0], flujo_operativo: r[1], capex: r[2], pagos_arrendamientos: r[3], adquisiciones: r[4], desinversiones: r[5], dividendos: r[6], recompras: r[7], emision_acciones: r[8], intereses_en_financiacion: r[9] }));

const out = {
  negocio: extra.negocio ?? null,
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-27', ingresos: 1825.5, ebitda: 313.4, ebit: 224.9, beneficio_neto: 155.5, bpa: 0.768, dpa: 0.705, dpa_extraordinario: 0.25, fcf: 154.8, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: extra.cambios_perimetro ?? [],
    comentario: extra.fin_comentario ?? '', ajustes: extra.fin_ajustes ?? '',
    extra: extra.fin_extra ?? {},
    confianza: 'Alta',
  },
  trimestres: extra.trimestres ?? null,
  balance: { historico, vencimientos: extra.vencimientos ?? [], liquidez: extra.liquidez ?? '', rating: extra.rating ?? 'Sin rating', coste_deuda_pct: extra.coste_deuda_pct ?? null, vida_media_anios: extra.vida_media_anios ?? null, otros_pasivos: extra.otros_pasivos ?? '', comentario: extra.bal_comentario ?? '', extra: extra.bal_extra ?? {}, confianza: 'Alta' },
  flujos: { historico: fh, comentario: extra.flu_comentario ?? '', extra: extra.flu_extra ?? {}, confianza: 'Alta' },
  calidad: extra.calidad ?? null,
  rentabilidad: extra.rentabilidad ?? null,
  capital: extra.capital ?? null,

  fuentes: extra.fuentes ?? [],
  huecos: extra.huecos ?? [],
};
if (extra._estado) out._estado = extra._estado;
writeFileSync(join(dir, 'A.json'), JSON.stringify(out, null, 2), 'utf8');
console.log('A.json escrito', cuenta.length, historico.length, fh.length);

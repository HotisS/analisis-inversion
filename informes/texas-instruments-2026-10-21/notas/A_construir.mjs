// Subagente A (TXN, 21-oct-2026): construye notas/A.json desde el XBRL (cuentas-xbrl.json),
// los comunicados 8-K (anexo 99.1) y A_textos.json (textos y fuentes escritos a mano).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const x = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const t = JSON.parse(fs.readFileSync(path.join(dir, 'A_textos.json'), 'utf8'));

// Reestructuración/otros dentro del beneficio de explotación (10-K: nota «Restructuring charges/other»;
// XBRL RestructuringCharges 2016-2021, OtherCostAndExpenseOperating 2022-2023). + = gasto.
const noRec = { 2016: 25, 2017: 11, 2018: 6, 2019: -36, 2020: 24, 2021: 54, 2022: 257, 2023: 0, 2024: -124, 2025: 117 };
// Inversiones a corto plazo (XBRL ShortTermInvestments): TI las gestiona como caja.
const invCorto = { 2016: 2336, 2017: 2813, 2018: 1795, 2019: 2950, 2020: 3461, 2021: 5108, 2022: 6017, 2023: 5611, 2024: 4380, 2025: 1656 };
// Cobros de incentivos CHIPS (flujo de inversión; comunicados 4T25 y 3T26).
const chips = { 2025: 335 };

const cuenta = x.financieros.cuenta.map(r => {
  const { fin, ...c } = r;
  return { ...c, no_recurrentes_en_ebitda: noRec[r.periodo] ?? null, participadas_en_ebitda: null, dpa_extraordinario: 0, minoritarios: 0 };
});

const balance = x.balance.historico.map(r => {
  const { fin, ...b } = r;
  return {
    ...b,
    caja: b.caja + (invCorto[r.periodo] ?? 0),
    arrendamientos: 0, // US GAAP: arrendamientos operativos, ya dentro del EBITDA; no hay financieros relevantes
    activos_contrato: null, pasivos_contrato: null, minoritarios: 0,
  };
});

const flujos = x.flujos.historico.map(r => {
  const { fin, ...f } = r;
  return { ...f, capex: f.capex - (chips[r.periodo] ?? 0), pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, intereses_en_financiacion: 0 };
});

// Trimestres (comunicados de resultados, anexo 99.1 de cada 8-K). ebitda = beneficio de explotación + depreciación.
const q = [
  // periodo, ingresos, ingresos año antes, EBIT, depreciación, BPA, BPA guía baja, alta
  ['4T24', 4007, 4077, 1377, 416, 1.30, 1.07, 1.29],
  ['1T25', 4069, 3661, 1324, 424, 1.28, 0.94, 1.16],
  ['2T25', 4448, 3822, 1563, 460, 1.41, 1.21, 1.47],
  ['3T25', 4742, 4151, 1663, 497, 1.48, 1.36, 1.60],
  ['4T25', 4423, 4007, 1473, 537, 1.27, 1.13, 1.39],
  ['1T26', 4825, 4069, 1808, 541, 1.68, 1.22, 1.48],
  ['2T26', 5463, 4448, 2310, 547, 2.14, 1.77, 2.05],
  ['3T26', 6055, 4742, 2874, 555, 2.62, 2.23, 2.57],
];
const r1 = v => Math.round(v * 10) / 10;
const items = q.map(([periodo, ing, ingA, ebit, dep, bpa]) => ({
  periodo, ingresos: ing, crecimiento_pct: r1((ing / ingA - 1) * 100), crecimiento_organico_pct: null,
  ebitda: ebit + dep, margen_ebitda_pct: r1((ebit + dep) / ing * 100), bpa,
  vs_consenso: t.vs_consenso?.[periodo] ?? null,
}));

// LTM a 30-sep-2026: 4T25 + 1T26 + 2T26 + 3T26.
const ult4 = q.slice(-4);
const sum = i => ult4.reduce((s, r) => s + r[i], 0);
const ltm = {
  periodo: 'LTM sep-26', fecha_fin: '2026-09-30',
  ingresos: sum(1), ebitda: sum(3) + sum(4), ebit: sum(3),
  beneficio_neto: 1163 + 1545 + 1980 + 2425,
  bpa: Math.round(ult4.reduce((s, r) => s + r[5], 0) * 100) / 100,
  dpa: 1.42 * 4, dpa_extraordinario: 0,
  fcf: 9896 - 2578, // flujo operativo LTM − capex LTM (sin los 1.104 M de subvenciones CHIPS)
  participadas_en_ebitda: null,
  no_recurrentes_en_ebitda: 32 + 17 + 17 + 7, // deterioro fondo de comercio 4T25 + gastos de compra de Silicon Labs
};

const nota = {
  _estado: t._estado,
  negocio: t.negocio,
  financieros: { cuenta, ltm, cambios_perimetro: t.cambios_perimetro, comentario: t.fin_comentario, ajustes: t.fin_ajustes, confianza: 'Alta' },
  trimestres: { items, ultima_presentacion: t.ultima_presentacion, confianza: t.trim_confianza },
  balance: { historico: balance, ...t.balance },
  flujos: { historico: flujos, ...t.flujos },
  calidad: t.calidad,
  rentabilidad: t.rentabilidad,
  capital: t.capital,
  fuentes: t.fuentes,
  huecos: t.huecos,
};
fs.writeFileSync(path.join(dir, 'A.json'), JSON.stringify(nota, null, 1) + '\n');
console.log('A.json escrito. LTM:', JSON.stringify(ltm));
console.log(items.map(i => `${i.periodo} ${i.crecimiento_pct}% ${i.margen_ebitda_pct}%`).join(' | '));

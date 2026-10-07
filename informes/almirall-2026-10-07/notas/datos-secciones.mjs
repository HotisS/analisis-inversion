// Datos (no textos) de las secciones que completo yo. Textos en textos.mjs.
import { readFileSync } from 'node:fs';
const bolsa = JSON.parse(readFileSync(new URL('./bolsa.json', import.meta.url), 'utf8'));

// Trimestres: Almirall publica 1T, 1S, 9M y año; los trimestres sueltos salen por diferencia (EBITDA de la empresa).
// [P34, P33, P23, P35, P32, P24, B1, P25, D4]
const tri = [
  ['3T24', 230.4, 10.5, 37.7, -0.04], ['4T24', 258.1, 17.4, 50.4, 0.01], ['1T25', 284.6, 15.0, 70.9, 0.10], ['2T25', 275.9, 10.4, 50.9, 0.02],
  ['3T25', 260.2, 12.9, 58.9, 0.06], ['4T25', 287.4, 11.4, 52.2, 0.03], ['1T26', 291.0, 2.2, 67.5, 0.07], ['2T26', 311.7, 13.0, 83.2, 0.11],
];
export const trimestresItems = tri.map(([periodo, ingresos, crecimiento_pct, ebitda, bpa]) => ({
  periodo, ingresos, crecimiento_pct, crecimiento_organico_pct: null, ebitda, margen_ebitda_pct: Math.round((ebitda / ingresos) * 1000) / 10, bpa, vs_consenso: null,
}));

export const consensoDatos = {
  estimaciones: [
    { periodo: '2026e', ingresos: 1228, ebitda: 282.5, ebit: 128.6, bpa: 0.39, dpa: 0.20, fuente: 'MarketScreener, 12 analistas [D6]' },
    { periodo: '2027e', ingresos: 1351, ebitda: 324.4, ebit: 166.1, bpa: 0.54, dpa: 0.21, fuente: 'MarketScreener, 12 analistas [D6]' },
    { periodo: '2028e', ingresos: 1471, ebitda: 369.7, ebit: 209.2, bpa: 0.70, dpa: 0.23, fuente: 'MarketScreener, 12 analistas [D6]' },
  ],
  recomendaciones: { n_analistas: 12, comprar: 10, mantener: 2, vender: 0, po_medio: 14.33, po_min: 11.5, po_max: 17.5 },
  base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0.8,
};

export const bolsaDatos = { ...bolsa.bolsa, posicion_corta_pct: null };
delete bolsaDatos.tramo_drawdown;

export const multHistSerie = bolsa.cierres_ejercicio.filter((c) => +c.anio >= 2020).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false }));

export const gobiernoDatos = {
  consejo: [
    { nombre: 'Carlos Gallardo Piqué', cargo: 'Presidente y consejero delegado', tipo: 'Ejecutivo', desde: '2014', comisiones: 'Dermatología' },
    { nombre: 'Enrique de Leyva Pérez', cargo: 'Vicepresidente y consejero coordinador', tipo: 'Independiente', desde: '2019', comisiones: 'Auditoría y Sostenibilidad' },
    { nombre: 'Antonio Gallardo Torrededía', cargo: 'Vocal', tipo: 'Dominical', desde: '2014', comisiones: 'Auditoría y Sostenibilidad' },
    { nombre: 'Karin Dorrepaal', cargo: 'Vocal', tipo: 'Otro externo', desde: '2013', comisiones: null },
    { nombre: 'Seth J. Orlow', cargo: 'Vocal', tipo: 'Independiente', desde: '2016', comisiones: 'Dermatología' },
    { nombre: 'Alexandra B. Kimball', cargo: 'Vocal', tipo: 'Independiente', desde: '2020', comisiones: 'Dermatología' },
    { nombre: 'Eva-Lotta Allan', cargo: 'Vocal', tipo: 'Independiente', desde: '2020', comisiones: 'Nombramientos y Retribuciones (presidenta)' },
    { nombre: 'Ruud Dobber', cargo: 'Vocal', tipo: 'Independiente', desde: '2021', comisiones: 'Nombramientos y Retribuciones' },
    { nombre: 'Ugo Di Francesco', cargo: 'Vocal', tipo: 'Independiente', desde: '2024', comisiones: 'Nombramientos y Retribuciones' },
    { nombre: 'Eva Abans Iglesias', cargo: 'Vocal', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría y Sostenibilidad (presidenta)' },
  ],
  presidente_ceo_separados: false, consejero_coordinador: true, una_accion_un_voto: true,
  operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: null,
  accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
  voto_remuneracion_pct: 94.9, voto_remuneracion_contra_pct: 4.78, voto_remuneracion_contra_libre_pct: 14.3,
  remuneracion_ceo: { anio: '2025', total: 1.79, fijo: 1.02, variable_corto: 0.75, variable_largo: null, ratio_salario_medio: 14 },
  accionistas: [
    { nombre: 'Familia Gallardo (Grupo Corporativo Landon, S.L. y Grupo Plafin, S.A.U.)', pct: 59.88, tipo: 'Control (pacto de accionistas de Antonio y Jorge Gallardo Ballart)', variacion: 'Estable: suscribió a prorrata la colocación de 2023 y los dividendos flexibles; 59,66 % en jun-2023' },
    { nombre: 'Norbel Inversiones, S.L.', pct: 5.07, tipo: 'Significativo', variacion: 'Sin cambios en 2025' },
    { nombre: 'Autocartera directa e indirecta (equity swap con CaixaBank)', pct: 1.23, tipo: 'Autocartera', variacion: '2.510.952 acciones del swap, renovado en dic-2025 por dos años' },
  ],
  insiders: [],
};

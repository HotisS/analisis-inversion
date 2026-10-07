// Parte del analista (Enagás, corte 2026-10-07). Citas con prefijo: [A3] = fuente 3 de A.json; [P1] = propia.
import { anios, wacc, terminal, casos, pesos } from './supuestos.mjs';
import { textos } from './textos.mjs';

// Participadas (resultado por puesta en equivalencia, neto de PPA) que las cuentas meten en el resultado de
// explotación [A]: se sacan del EBITDA y del EBIT y se pasan al resultado financiero (el BAI no cambia).
const PART = { 2021: 163.3, 2022: 146.8, 2023: 147.3, 2024: 146.5, 2025: 131.6 };
const cuentaA = [
  { periodo: '2021', ebitda: 846.206, ebit: 583.369, rf: -83.412 },
  { periodo: '2022', ebitda: 742.362, ebit: 478.24, rf: 48.158 },
  { periodo: '2023', ebitda: 730.221, ebit: 456.878, rf: -35.784 },
  { periodo: '2024', ebitda: 715.837, ebit: 428.729, rf: -741.408 },
  { periodo: '2025', ebitda: 651.949, ebit: 368.108, rf: 40.327 },
];
const r1 = (x) => Math.round(x * 10) / 10;
const parches = [];
cuentaA.forEach((c, i) => {
  const p = PART[c.periodo];
  parches.push({ ruta: `financieros.cuenta[${i}].ebitda`, valor: r1(c.ebitda - p) });
  parches.push({ ruta: `financieros.cuenta[${i}].ebit`, valor: r1(c.ebit - p) });
  parches.push({ ruta: `financieros.cuenta[${i}].resultado_financiero`, valor: r1(c.rf + p) });
});
// LTM jun-26: participadas = 131,6 − 68,0 (1S25: 80,1 antes de PPA − 12,1 de PPA) + 74,7 (1S26) = 138,3.
parches.push({ ruta: 'financieros.ltm.ebitda', valor: r1(635.654 - 138.3) });
parches.push({ ruta: 'financieros.ltm.ebit', valor: r1(356.111 - 138.3) });

export default {
  meta: {
    fecha_corte: '2026-10-07', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
    limitaciones: textos.limitaciones,
    controles_explicados: textos.controles_explicados,
  },
  _parches: parches,
  consenso: { base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 22.0 },
  ...textos.secciones,
  dcf: { anios, wacc, terminal, mitad_de_anio: true, justificacion: textos.justificacion, lectura: textos.lectura, confianza: 'Media' },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: textos.narrativas[c.escenario] })), comentario: textos.escenarios_comentario, confianza: 'Media' },
  suma_partes: textos.suma_partes,
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 2656.2, arrendamientos: 366.7, caja: 718.1, minoritarios: 15.8, pensiones: 0, asociadas: 2204.0, otros_ajustes: 484.0 },
    rab: 2700,
    pesos,
    comentario: textos.valoracion_comentario,
    confianza: 'Media',
  },
  catalizadores: textos.catalizadores,
  riesgos: textos.riesgos,
  preguntas: textos.preguntas,
  resumen: textos.resumen,
  fuentes: textos.fuentes,
  huecos: textos.huecos,
  huecos_resueltos: textos.huecos_resueltos,
};

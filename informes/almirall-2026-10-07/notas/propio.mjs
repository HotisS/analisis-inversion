// Parte del analista (Almirall, corte 2026-10-07). Citas: [A1] = fuente 1 de A.json, [B4], [D6]…; [P n] = fuentes propias.
import { readFileSync } from 'node:fs';
import { anios, wacc, terminal, casos, pesos } from './supuestos.mjs';
import { comparables } from './datos-propios.mjs';
import { T } from './textos.mjs';

const rnpv = JSON.parse(readFileSync(new URL('./rnpv.json', import.meta.url), 'utf8'));
// Valor empresa del DCF del negocio comercializado (calc.dcf.ev de la última ejecución; se actualiza a mano tras recalcular).
const EV_DCF = T.ev_dcf ?? 0;

// EBITDA = EBIT NIIF + amortizaciones + deterioros (los deterioros van a `amortizaciones`). Deterioros de las
// presentaciones anuales [P30-P32, B1]: 2020 16,2; 2021 103,5; 2022 18,7; 2023 47,3; 2024 11,7; 2025 0.
const DET = [16.2, 103.5, 18.7, 47.3, 11.7, 0];
const EBIT = [92.3, 5.8, 46.9, -5.3, 36.1, 73.1];
const DA = [123.1, 119.9, 120.6, 124.3, 139.1, 151.2];
const r1 = (x) => Math.round(x * 10) / 10;
const parches = [];
DET.forEach((d, i) => {
  parches.push({ ruta: `financieros.cuenta[${i}].amortizaciones`, valor: r1(DA[i] + d) });
  parches.push({ ruta: `financieros.cuenta[${i}].ebitda`, valor: r1(EBIT[i] + DA[i] + d) });
});
parches.push({ ruta: 'financieros.cuenta[5].dpa', valor: 0.19 });

export default {
  meta: {
    fecha_corte: '2026-10-07', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
    limitaciones: T.limitaciones, controles_explicados: T.controles_explicados,
  },
  _parches: parches,
  identificacion: { acciones: 215.11, empleados: null, proximos_resultados: '2026-11-09', free_float_pct: 33.8 },
  negocio: T.negocio,
  sector: T.sector,
  competencia: T.competencia,
  financieros: { comentario: T.financieros_comentario, ajustes: T.financieros_ajustes, confianza: 'Alta' },
  trimestres: T.trimestres,
  balance: T.balance,
  flujos: { comentario: T.flujos_comentario, confianza: 'Alta' },
  calidad: T.calidad,
  rentabilidad: { comentario: T.rentabilidad_comentario, confianza: 'Media' },
  capital: T.capital,
  directivos: T.directivos,
  gobierno: T.gobierno,
  consenso: T.consenso,
  bolsa: T.bolsa,
  multiplos_historicos: T.multiplos_historicos,
  comparables: { criterio: T.comparables_criterio, empresas: comparables, comentario: T.comparables_comentario, confianza: 'Media' },
  transacciones: T.transacciones,
  dcf: { anios, wacc, terminal, mitad_de_anio: true, justificacion: T.justificacion, lectura: T.lectura, confianza: 'Media' },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas[c.escenario] })), comentario: T.escenarios_comentario, confianza: 'Media' },
  suma_partes: {
    aplica: true, descuento_holding_pct: 0,
    partes: [
      { segmento: 'Negocio comercializado (DCF)', metrica: 'Valor empresa del DCF', valor_metrica: EV_DCF, multiplo: 1, justificacion: T.sp_comercial },
      { segmento: 'Cartera de I+D (rNPV)', metrica: 'rNPV de 10 programas, M EUR', valor_metrica: rnpv.rnpv_total, multiplo: 1, justificacion: T.sp_rnpv },
    ],
    comentario: T.sp_comentario, confianza: 'Baja',
  },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 276.2, arrendamientos: 39.1, caja: 354.6, minoritarios: 0, pensiones: 38.9, asociadas: 0, otros_ajustes: 35.1 },
    rab: null, pesos, comentario: T.valoracion_comentario, confianza: 'Media',
  },
  catalizadores: T.catalizadores,
  riesgos: T.riesgos,
  esg: T.esg,
  preguntas: T.preguntas,
  resumen: T.resumen,
  fuentes: T.fuentes,
  huecos: T.huecos,
};

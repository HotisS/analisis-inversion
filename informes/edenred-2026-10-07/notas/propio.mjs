// Parte del analista (Edenred, corte 2026-10-07). Citas con prefijo: [A3] = fuente 3 de A.json; [P1] = propia.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';
import { catalizadores, preguntas } from './cualitativo.mjs';
import * as T from './textos.mjs';

// Caja restringida por ejercicio [A1-A5]: se suma a `clientes` para que el circulante del motor sea el de la empresa
// más la caja que el float obliga a inmovilizar (coherente con su flujo libre, que resta la variación de la caja restringida).
const restringida = { 2018: 1402, 2019: 1864, 2020: 2578, 2021: 2428, 2022: 2120, 2023: 2073, 2024: 1866, 2025: 1661 };
const clientesA = { 2018: 2182, 2019: 2432, 2020: 2069, 2021: 2589, 2022: 3293, 2023: 3466, 2024: 3455, 2025: 3609 };
const parchesBalance = Object.keys(restringida).map((p, i) => ({ ruta: `balance.historico[${i}].clientes`, valor: clientesA[p] + restringida[p] }));

export default {
  meta: {
    fecha_corte: '2026-10-07', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
    limitaciones: T.limitaciones,
    controles_explicados: T.controles_explicados,
  },
  identificacion: { sector: 'Industria', industria: 'Servicios comerciales y profesionales (soluciones de pago de uso específico: beneficios a empleados y movilidad)', sede: 'Issy-les-Moulineaux (Francia)', fundacion: '2010', empleados: 12000, capitalizacion_publicada: null },
  financieros: { ajustes: T.ajustes_financieros },
  _parches: [
    // Visión operativa del float: el último balance se presenta con el circulante sin float (activo 2.152, pasivo 3.124 a dic-25) [A7];
    // el float neto y la caja que lo respalda salen del circulante y del puente.
    // 2024 y 2025: circulante sin float = cuentas a cobrar − cuentas ligadas al float (1.320 y 1.457 M) y cuentas a pagar − fondos a reembolsar (5.722 y 6.125 M) [A1].
    { ruta: 'balance.historico[6].clientes', valor: 2135 },
    { ruta: 'balance.historico[6].proveedores', valor: 3143 },
    { ruta: 'balance.historico[7].clientes', valor: 2152 },
    { ruta: 'balance.historico[7].proveedores', valor: 3085 },
    // La deuda neta de la empresa de 2025 incluye 200 M de otros pasivos financieros (opciones sobre minoritarios 76, derivados 58, depósitos 37, otros 29) [A1].
    { ruta: 'balance.historico[7].deuda_financiera', valor: 4707 },
  ],
  balance: { comentario: T.balance_comentario },
  calidad: { comentario: T.calidad_comentario },
  rentabilidad: { comentario: T.rentabilidad_comentario, confianza: 'Media' },
  capital: { comentario: T.capital_comentario },
  multiplos_historicos: { comentario: T.multiplos_comentario },
  comparables: { comentario: T.comparables_comentario },
  transacciones: { comentario: T.transacciones_comentario },
  dcf: {
    anios, wacc, terminal, etapa2: { ...etapa2, justificacion: T.etapa2_justificacion }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion,
    lectura: T.dcf_lectura,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas[c.escenario] })), comentario: T.escenarios_comentario, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario, confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 4968, arrendamientos: 115, caja: 3319, minoritarios: 516, pensiones: 0, asociadas: 8, otros_ajustes: 2852 },
    pesos,
    comentario: T.valoracion_comentario,
    confianza: 'Media',
  },
  catalizadores,
  riesgos: T.riesgos,
  preguntas,
  resumen: T.resumen,
  fuentes: T.fuentes,
  huecos: T.huecos,
};

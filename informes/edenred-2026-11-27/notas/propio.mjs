// Parte del analista (Edenred, corte 2026-11-27: voto del Senado del 19-nov y Niel al 10,55 %). Citas con prefijo de nota: [A1] = fuente 1 de A.json; [P1] = propia.
import { anios, wacc, terminal, etapa2, casos, pesos, bpa } from './supuestos.mjs';
import * as T from './textos.mjs';
import fs from 'node:fs';

const b = Object.fromEntries(casos.map((c) => [c.escenario, bpa(c)]));
const bpa28 = (e) => b[e].find((f) => f.periodo === '2028e').bpa;

export default {
  meta: {
    fecha_corte: '2026-11-27', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
    limitaciones: T.limitaciones,
    controles_explicados: T.controles_explicados,
  },
  identificacion: { sector: 'Industria', industria: 'Servicios comerciales y profesionales (soluciones de pago de uso específico: beneficios a empleados y movilidad)', sede: 'Issy-les-Moulineaux (Francia)', fundacion: '2010', empleados: 12000 },
  negocio: { descripcion: T.negocio_descripcion, kpis: JSON.parse(fs.readFileSync(new URL('./A.json', import.meta.url))).negocio.kpis },
  financieros: { ajustes: T.ajustes_financieros },
  _parches: [
    // Visión operativa del float (circulante sin float, URD 2025 pág. 159 [A1]): activo = existencias + clientes + otros deudores − cuentas ligadas al float
    // (2025: 54 + 2.849 + 706 − 1.457; 2024: 62 + 2.764 + 629 − 1.320); pasivo = proveedores + otros acreedores (2025: 1.911 + 1.174; 2024: 1.793 + 1.350).
    { ruta: 'balance.historico[4].clientes', valor: 2073 },
    { ruta: 'balance.historico[4].proveedores', valor: 3143 },
    { ruta: 'balance.historico[5].clientes', valor: 2098 },
    { ruta: 'balance.historico[5].proveedores', valor: 3085 },
    // Regla 13: unos resultados cercanos no retrasan (METODO-VIGENTE §4.13); la ley francesa no tiene fecha en el Senado y el tope sería por decreto desde 2028.
    { ruta: 'bolsa.contexto.veredicto', valor: 'no cambia' },
    { ruta: 'bolsa.contexto.condicion', valor: null },
  ],
  rentabilidad: { comentario: T.rentabilidad_comentario, confianza: 'Media' },
  competencia: { cuota_pct: null },
  multiplos_historicos: { comentario: T.multiplos_comentario },
  dcf: {
    anios, wacc, terminal, etapa2: { ...etapa2, justificacion: T.etapa2_justificacion }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion,
    sostenibilidad: T.sostenibilidad,
    lectura: T.dcf_lectura,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas[c.escenario] })), comentario: T.escenarios_comentario, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario, confianza: 'Media' },
  valoracion: {
    // Visión operativa del float: de la caja de 3.319 M, 2.739 M (float neto 4.357 − caja restringida 1.618) es dinero de clientes → otros_ajustes.
    // otros_ajustes = 195 (otros pasivos financieros de la deuda neta publicada) + 2.739 + 79 (recompras jul-oct, acciones a 31-oct: 75 M hasta 30-sep + 162.782 acciones en octubre ≈ 4 M) = 3.013.
    // Asociadas: 8 + 205 (Edenred Pay North America: 225 M USD al valor mínimo de la operación con Abry [A10], a 1,0975 USD/EUR del 26-nov [D55]). El bono de 800 M de nov-2026 refinancia: sube deuda y caja a la vez, neutro.
    // Minoritarios a 12 veces su beneficio (43 M en 2025): 516 M. Asociadas: 8 + 190 (60 % de Edenred Pay North America al valor mínimo de 375 M USD de la operación con Abry [A10]).
    puente: { fecha: '2026-06-30', deuda_financiera: 4773, arrendamientos: 115, caja: 3319, minoritarios: 516, pensiones: 0, asociadas: 213, otros_ajustes: 3013 },
    pesos,
    objetivo_12m: {
      ejercicio: '2028e', base_bpa: 'publicado',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: bpa28(e), multiplo: null, precio: null, justificacion: T.just12m[e] })),
      per_historico: {
        base: 'adelantado', base_bpa: 'publicado', actual: Math.round(25.32 / b.Base.find((f) => f.periodo === '2027e').bpa * 10) / 10,
        mediana_5a: 21.0, minimo_5a: 9.7, media_larga: 20.9,
        excluidos: T.per_excluidos,
        v2: { actual: Math.round(25.32 / b.Base.find((f) => f.periodo === '2027e').bpa * 10) / 10, mediana_5a: 15.8, minimo_5a: 8.9, media_larga: 25.1, base: 'cierre' },
      },
      comparables_per: { mediana: 9.5 },
      consenso: { bpa_ano1: 2.14, bpa_ano2: 2.42, objetivo_medio: 31.24, objetivo_min: 25.2, objetivo_max: 37.0, analistas: 15, tendencia_3m: 'estables', fuente: 'BPA publicado 2027e-2028e de MarketScreener (página de septiembre, sin actualizar) [D4]; objetivos de Yahoo Finance a 27-nov-2026 (31,21 a 21-oct) [D53]; el BPA ajustado de Yahoo para 2027e es 2,41, −2,4 % en 60 días [D53]' },
      diferencia_consenso: T.diferencia_consenso,
      media: null,
      comentario: T.objetivo_comentario,
    },
    comentario: T.valoracion_comentario,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores,
  riesgos: T.riesgos,
  preguntas: T.preguntas,
  resumen: T.resumen,
  fuentes: T.fuentes,
  huecos: T.huecos,
};

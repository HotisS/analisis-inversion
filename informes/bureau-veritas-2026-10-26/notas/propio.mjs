// Parte del analista (Bureau Veritas, corte 2026-10-26, tras los ingresos del 3T26 del 21-oct). Citas con prefijo de nota: [A3] = fuente 3 de A.json; [P1] = propia.
import { anios, wacc, terminal, etapa2, casos, pesos, bpa } from './supuestos.mjs';
import * as T from './textos.mjs';

const b = Object.fromEntries(casos.map((c) => [c.escenario, bpa(c)]));
const bpaDe = (e, p) => b[e].find((f) => f.periodo === p).bpa;
const PRECIO = 29.21;
const actual = Math.round(PRECIO / bpaDe('Base', '2027e') * 10) / 10;

export default {
  meta: {
    fecha_corte: '2026-10-26', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
    limitaciones: T.limitaciones,
    controles_explicados: T.controles_explicados,
  },
  financieros: { ajustes: T.ajustes_financieros, comentario: T.financieros_comentario },
  balance: { comentario: T.balance_comentario, otros_pasivos: T.otros_pasivos },
  flujos: { comentario: T.flujos_comentario },
  calidad: { comentario: T.calidad_comentario },
  capital: { comentario: T.capital_comentario },
  _parches: [],
  huecos_resueltos: T.huecos_resueltos,
  rentabilidad: { comentario: T.rentabilidad_comentario, confianza: 'Media' },
  multiplos_historicos: { comentario: T.multiplos_comentario },
  comparables: { comentario: T.comparables_comentario },
  transacciones: { comentario: T.transacciones_comentario },
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
    // Balance del 30-jun-2026 [A3, A4]: deuda bruta 2.631,0; caja 942,1; arrendamientos 289,4 no corrientes + 121,7 corrientes; pensiones 140,0.
    // La deuda neta a 30-sep está «prácticamente igual» que a 30-jun (incluye el pago de LotusWorks y la recompra del 3T) [A5].
    // Minoritarios a valor de mercado estimado: ≈21 M de resultado atribuido × 19 veces ≈ 400 M (estimación propia).
    // Otros ajustes: −470 (cobro previsto por Petróleo y Carbón, cuyos flujos ya no están en el DCF) + 32 (provisión por la salida de Servicios a Gobiernos y las desviaciones) = −438.
    puente: { fecha: '2026-06-30', deuda_financiera: 2631.0, arrendamientos: 411.1, caja: 942.1, minoritarios: 400, pensiones: 140.0, asociadas: 0, otros_ajustes: -438 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [P2]' },
    pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: bpaDe(e, '2028e'), multiplo: null, precio: null, justificacion: T.just12m[e] })),
      per_historico: {
        base: 'adelantado', actual, mediana_5a: 19.55, minimo_5a: 16.57, media_larga: 19.81, anios: 7,
        excluidos: T.per_excluidos,
        v2: { actual, mediana_5a: 20.86, minimo_5a: 18.01, media_larga: 21.56, base: 'cierre' },
      },
      comparables_per: { mediana: 22.05 },
      consenso: { bpa_ano1: 1.39, bpa_ano2: 1.59, objetivo_medio: 33.24, objetivo_min: 28.5, objetivo_max: 37.0, analistas: 17, tendencia_3m: 'subidas', fuente: 'Consenso de la empresa (13-oct-2026, nuevo perímetro) y MarketScreener (23-oct), contrastado con Stock Analysis (5-ago) [D3, D4, D6]' },
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
  fuentes: [
    { id: 1, titulo: 'Rendimiento del Bund a 10 años (23-oct-2026), serie BBSIS', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-23', url: 'https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en' },
    { id: 2, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  ],
  huecos: T.huecos,
};

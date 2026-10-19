// Parte del analista (Dixon, corte 2026-10-19). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa27 = bpa('Base', 1).bpa;
const bpa28 = bpa('Base', 2).bpa;
const PRECIO = 12100; // cierre del 19-oct-2026 en la NSE [D1]

// Historia del PER: cierre de marzo de cada ejercicio [D1] ÷ BPA AJUSTADO atribuible del ejercicio siguiente (sin plusvalías de
// Aditya Infotech; FY2025 = 7.060 M ÷ 60,84 M y FY2026 = 8.450 M ÷ 61,04 M) [A1-A4, A10]; FY2027 es nuestro BPA.
const cierres = { FY2020: 715.97, FY2021: 3672.15, FY2022: 4308.8, FY2023: 2861.3, FY2024: 7479.25, FY2025: 13179.5, FY2026: 9673 };
const bpaReal = { FY2021: 26.87, FY2022: 31.97, FY2023: 42.69, FY2024: 61.26, FY2025: 116.0, FY2026: 138.4, FY2027: bpa27 };
const sig = (a) => `FY${Number(a.slice(2)) + 1}`;
const anos = ['FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'];
const largos = ['FY2020', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026']; // sin FY2021 (burbuja de 2021: 115x)
const adel = anos.map((a) => cierres[a] / bpaReal[sig(a)]);
const cierre = anos.map((a) => cierres[a] / bpaReal[a]);
const adelL = largos.map((a) => cierres[a] / bpaReal[sig(a)]);
const cierreL = anos.map((a) => cierres[a] / bpaReal[a]);
const med = (v) => { const s = [...v].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
export const PERH = { adel, cierre, adelL, cierreL, PRECIO, bpa27, bpa28, B };

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'INR', divisa_cotizacion: 'INR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 3, etiqueta_ejercicio: 'fin', normas_contables: 'Ind AS (NIIF adaptadas en India), cuentas consolidadas', formato_cuenta: 'naturaleza',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios: S.anios, wacc: S.wacc, terminal: S.terminal,
    etapa2: { ...S.etapa2, justificacion: null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: S.puente_ingresos.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: S.mercado_final,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Balance de 30-jun-2026 de la presentación del 1T FY27 [A9]: deuda 579 cr, caja + bancos + inversiones a corto 805 cr;
    // arrendamientos de marzo de 2026 [A1]. Minoritarios a valor de mercado aproximado (ver comentario). Asociadas: 2,38 % de
    // Aditya Infotech a 4.010 INR (11.703 M) neto de un 12,5 % de impuesto (10.240 M) [D7] + JV a 12 veces su beneficio de FY2026
    // (215 M; 2.580 M). otros_ajustes: la mitad de la exposición neta del PLI de Padget (5.060 M) tras impuestos [A1, A5].
    puente: { fecha: '2026-06-30', deuda_financiera: 5790, arrendamientos: 5267, caja: 8050, minoritarios: 45000, pensiones: 0, asociadas: 12820, otros_ajustes: 1900 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; referencia de mercado desarrollado)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2029e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2029e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        actual: r2(PRECIO / bpa28),
        mediana_5a: r2(med(adel)), minimo_5a: r2(Math.min(...adel)), media_larga: r2(avg(adelL)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(avg(cierreL)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 36.9 },
      consenso: { bpa_ano1: 280.0, bpa_ano2: 354.9, objetivo_medio: 14876.59, objetivo_min: 8817, objetivo_max: 17800, analistas: 27, tendencia_3m: 'recortes', fuente: 'MarketScreener (BPA de FY2028e y FY2029e y objetivos de 27 analistas, 19-oct-2026) [D2]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.comentario_12m ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  ...(T.bolsa_contexto ? { bolsa: { contexto: T.bolsa_contexto } } : {}),
  ...(R ? { resumen: R } : {}),
  fuentes: T.fuentes ?? [],
};

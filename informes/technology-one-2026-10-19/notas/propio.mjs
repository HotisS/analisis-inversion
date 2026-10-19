// Parte del analista (Technology One, corte 2026-10-19). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const r4 = (x) => Math.round(x * 10000) / 10000;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 31.30; // cierre del 19-oct-2026 en la ASX [D1]

// Historia del PER: cierre de cada 30 de septiembre [D1] ÷ BPA diluido real [A1-A4]; para FY2025 el BPA de FY2026e es el nuestro
// (ejercicio ya cerrado, sin publicar; la guía fija el beneficio). FY2019: BPA básico (18,43 c) a falta del diluido en las fuentes.
const cierres = { FY2019: 7.18, FY2020: 7.94, FY2021: 11.36, FY2022: 10.60, FY2023: 15.51, FY2024: 23.86, FY2025: 38.46 };
const bpaReal = { FY2019: 0.1843, FY2020: 0.1961, FY2021: 0.2252, FY2022: 0.2738, FY2023: 0.3154, FY2024: 0.3603, FY2025: 0.4173, FY2026: bpa26 };
const sig = (a) => `FY${+a.slice(2) + 1}`;
const anos = ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025'];
const largos = ['FY2019', 'FY2020', ...anos];
const adel = anos.map((a) => cierres[a] / bpaReal[sig(a)]);
const cierre = anos.map((a) => cierres[a] / bpaReal[a]);
const adelL = largos.map((a) => cierres[a] / bpaReal[sig(a)]);
const cierreL = largos.map((a) => cierres[a] / bpaReal[a]);
const med = (v) => { const s = [...v].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
export const PERH = { adel, cierre, adelL, cierreL, PRECIO, bpa26, bpa27, B };

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'AUD', divisa_cotizacion: 'AUD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 9, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF adoptadas en Australia (AASB), cuentas consolidadas', formato_cuenta: 'funcion',
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
    // Balance de 31-mar-2026 [A6]: efectivo 40,3 M + activos financieros (depósitos) 205,1 M; arrendamientos 5,5 + 44,0 M; sin deuda financiera.
    // otros_ajustes (estimación propia, negativo = suma): caja del segundo semestre de FY26 hasta el 30-sep-2026, que el DCF no recoge
    // porque FY2026e ya ha cerrado: flujo libre ≈ +145 M (guía: flujo libre = beneficio neto ≈ 165 M; H1 20,3 M) − dividendo interino 26,2 M
    // − compras del fideicomiso de empleados ≈ 86,9 M (julio-agosto de 2026) ≈ +32 M [A6, A8, A13, C].
    puente: { fecha: '2026-03-31', deuda_financiera: 0, arrendamientos: 49.448, caja: 245.46, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: -32 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; referencia de mercado desarrollado)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: r4(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel)), minimo_5a: r2(Math.min(...adel)), media_larga: r2(avg(adelL)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(avg(cierreL)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 22.1 },
      consenso: { bpa_ano1: 0.602, bpa_ano2: null, objetivo_medio: 31.14, objetivo_min: 22, objetivo_max: 36.56, analistas: 16, tendencia_3m: 'estables', fuente: 'Yahoo Finance (BPA de FY2027e, 16 analistas; no hay FY2028e gratuito) y objetivos de MarketBeat/FNArena a oct-2026 [D2, D3]' },
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

// Parte del analista (CLASSYS, corte 2026-10-19). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 29950; // cierre del 19-oct-2026 en el KOSDAQ [D1]

// Historia del PER: cierre de diciembre [D1] ÷ BPA diluido real [A1-A4, D16]; para 2025 el BPA de 2026e es el nuestro.
const cierres = { 2018: 4085, 2019: 14150, 2020: 15400, 2021: 18800, 2022: 18400, 2023: 37750, 2024: 47650, 2025: 54500 };
const bpaReal = { 2019: 517, 2020: 591, 2021: 676, 2022: 1165, 2023: 1152, 2024: 1509, 2025: 2005, 2026: bpa26 };
const anos = [2021, 2022, 2023, 2024, 2025];
const largos = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
const adel = anos.map((a) => cierres[a] / bpaReal[a + 1]);
const cierre = anos.map((a) => cierres[a] / bpaReal[a]);
const adelL = largos.map((a) => cierres[a] / bpaReal[a + 1]);
const cierreL = largos.map((a) => cierres[a] / bpaReal[a]);
const med = (v) => { const s = [...v].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
export const PERH = { adel, cierre, adelL, cierreL, PRECIO, bpa26, bpa27, B };

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'KRW', divisa_cotizacion: 'KRW', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'K-IFRS (NIIF adoptadas en Corea), cuentas consolidadas', formato_cuenta: 'funcion',
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
    // Balance K-IFRS de 30-jun-2026 [A5, A6]. Deuda: préstamos a corto 141.079 + a largo 5.581 (financian la compra de MedSystems y el dividendo).
    // Caja: efectivo 78.701 + depósitos y activos financieros a corto 56.461 + 939 a largo. Asociadas: activos financieros a valor razonable no corrientes 17.918.
    puente: { fecha: '2026-06-30', deuda_financiera: 146660, arrendamientos: 1709, caja: 136101, minoritarios: 5570, pensiones: 0, asociadas: 17918, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; referencia de mercado desarrollado)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D9]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel)), minimo_5a: r2(Math.min(...adel)), media_larga: r2(avg(adelL)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(avg(cierreL)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 12.1 },
      consenso: { bpa_ano1: 2962, bpa_ano2: 3766, objetivo_medio: 58250, objetivo_min: 40000, objetivo_max: 67000, analistas: 12, tendencia_3m: 'recortes', fuente: 'FnGuide/WiseReport (BPA de 2027e y 2028e, media de tres meses a 16-oct-2026) y objetivos de los 12 informes de agosto-octubre de 2026 [D2, D3]' },
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

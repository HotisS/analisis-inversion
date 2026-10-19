// Parte del analista (APR, corte 2026-10-19). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 331500; // cierre del 19-oct-2026 en el KOSPI [D1]

// Historia del PER: la acción cotiza desde el 27-feb-2024; hay dos cierres de ejercicio (30-dic-2024: 50.000 KRW; 30-dic-2025:
// 231.000 KRW) [D1]. Adelantado (v3): cierre ÷ BPA del año siguiente. 2024: 50.000 ÷ 7.718 (BPA diluido real de 2025) = 6,5x,
// EXCLUIDO como BPA atípico (+174 % en un año: mide la sorpresa, no una valoración). 2025: 231.000 ÷ nuestro BPA de 2026e.
// Al cierre (v2): 2024 50.000 ÷ 2.819 = 17,7x; 2025 231.000 ÷ 7.718 = 29,9x [A1]. Historia corta: el selector elige la más baja.
const adel = [231000 / bpa26];
const cierre = [50000 / 2819, 231000 / 7718];
const med = (a) => { const s = [...a].sort((x, y) => x - y); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2; };
export const PERH = { adel, cierre, PRECIO, bpa26, bpa27, B };

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'KRW', divisa_cotizacion: 'KRW', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'K-IFRS (NIIF adoptadas en Corea), cuentas consolidadas; NIIF 18 desde 2026', formato_cuenta: 'funcion',
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
    // Balance K-IFRS de 30-jun-2026 [A3]. Sin deuda financiera. Caja: efectivo 94.463 + coste amortizado a corto 20.097 + valor
    // razonable a corto 174.708 = 289.268. Arrendamientos 25.487 + 59.421 = 84.908. Pensiones: 2.234 M antes de impuestos
    // (≈ 1.700 M después). otros_ajustes: +93.595 de dividendo a cuenta pagado el 31-ago (caja que ya salió) − 31.265 de activos
    // financieros a largo a valor razonable (líquidos) = +62.330 (positivo resta valor).
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 84908, caja: 289268, minoritarios: 0, pensiones: 1700, asociadas: 0, otros_ajustes: 62330 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; referencia de mercado desarrollado)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        anios: 1,
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(adel[0]), minimo_5a: r2(adel[0]), media_larga: r2(adel[0]),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(cierre.reduce((a, b) => a + b, 0) / cierre.length), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 15.0 },
      consenso: { bpa_ano1: 21394, bpa_ano2: 27194, objetivo_medio: 520000, objetivo_min: 410000, objetivo_max: 570000, analistas: 22, tendencia_3m: 'recortes', fuente: 'FnGuide/WiseReport (BPA de 2027e y 2028e, media de tres meses a 16-oct-2026) y objetivos de las 22 casas de agosto-octubre de 2026 [D2, D3]' },
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

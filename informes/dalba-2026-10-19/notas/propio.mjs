// Parte del analista (d'Alba Global, corte 2026-10-19). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 169600; // cierre del 19-oct-2026 en el KOSPI [D1]

// Historia del PER: la acción cotiza desde el 22-may-2025, así que solo hay un cierre de ejercicio (30-dic-2025: 147.500 KRW) [D1].
// Adelantado (v3): 147.500 ÷ nuestro BPA de 2026e. Al cierre (v2): 147.500 ÷ BPA diluido de 2025 (6.315 KRW) [A1].
// Historia de un año: el selector (historia corta ≤ 3 años) elige la más baja de v3 y v2.
const cierre2025 = 147500;
const adel = [cierre2025 / bpa26];
const cierre = [cierre2025 / 6315];
export const PERH = { adel, cierre, PRECIO, bpa26, bpa27, B };

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
    // Balance K-IFRS de 30-jun-2026 [A3]. Sin deuda financiera. Caja: efectivo 92.703 + otros activos financieros a corto 109.021.
    // Asociadas: Kuoca Skin (33,61 %, 9.600 M pagados el 31-jul-2026). otros_ajustes: +3.648 de activos financieros a largo − 9.600 de caja
    // que salió después del cierre para pagar Kuoca. Pensiones: 1.564 M antes de impuestos (≈ 1.190 M después).
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 4334, caja: 201724, minoritarios: 0, pensiones: 1190, asociadas: 9600, otros_ajustes: -5952 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; referencia de mercado desarrollado)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D7]' },
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
        v2: { mediana_5a: r2(cierre[0]), minimo_5a: r2(cierre[0]), media_larga: r2(cierre[0]), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 16.3 },
      consenso: { bpa_ano1: 13882, bpa_ano2: 17428, objetivo_medio: 289167, objetivo_min: 220000, objetivo_max: 350000, analistas: 18, tendencia_3m: 'recortes', fuente: 'FnGuide/WiseReport (BPA de 2027e y 2028e, media de tres meses a 16-oct-2026) y objetivos de las 18 casas de agosto-octubre de 2026 [D2, D3]' },
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

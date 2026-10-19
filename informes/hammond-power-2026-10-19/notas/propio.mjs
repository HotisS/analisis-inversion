// Parte del analista (Hammond Power Solutions, TSX HPS.A, corte 2026-10-19). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 245.75; // cierre de HPS-A.TO del 16-oct-2026 (último cierre antes del corte; el 19-oct la bolsa aún no había abierto) [D1]

// Historia del PER adelantado: cierre de diciembre de HPS-A.TO ÷ BPA publicado del año siguiente [D1, A1-A5]; para el cierre de 2025, nuestro BPA de 2026e.
const cierres = { 2021: 11.99, 2022: 20.12, 2023: 81.7, 2024: 128.05, 2025: 159.48 };
const bpaReal = { 2021: 1.28, 2022: 3.77, 2023: 5.33, 2024: 6.01, 2025: 6.07, 2026: bpa26 };
const todos = [2021, 2022, 2023, 2024, 2025];
const validos = [2023, 2024, 2025]; // 2021 y 2022 excluidos (BPA atípico: se triplicó con la escasez; PER < 1/3 de la mediana)
const adel = validos.map((a) => cierres[a] / bpaReal[a + 1]);
const cierre = validos.map((a) => cierres[a] / bpaReal[a]);
const med = (v) => { const s = [...v].sort((x, y) => x - y); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
export const PERH = { adel, cierre, todosAdel: todos.map((a) => cierres[a] / bpaReal[a + 1]), todosCierre: todos.map((a) => cierres[a] / bpaReal[a]), PRECIO, bpa26, bpa27, B };

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'CAD', divisa_cotizacion: 'CAD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (IFRS); informes anuales auditados 2021-2025 (KPMG) e informes trimestrales de 2025-2026 de la empresa, presentados en SEDAR+', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
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
    // Balance a 27-jun-2026 [A6, D16]. Deuda: líneas de crédito dispuestas (70,109). Caja 33,631.
    // asociadas: inversiones (6,326) + inmuebles de inversión (2,596), a valor contable.
    // otros_ajustes: préstamo de la compra de AEG (365, cerrada el 29-jun, dos días después del balance [A6, A12]) + pagos aplazados de compras (0,877)
    // + pasivo de DSU (32,155) y PSU/RSU (6,819), que se pagan en efectivo [A6]. Signo: suma a la deuda.
    puente: { fecha: '2026-06-27', deuda_financiera: 70.109, arrendamientos: 24.64, caja: 33.631, minoritarios: 0, pensiones: 0, asociadas: 8.922, otros_ajustes: 404.851 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D7]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel)), minimo_5a: r2(Math.min(...adel)), media_larga: r2(avg(adel)),
        anios: validos.length,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(avg(cierre)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 22.1 },
      consenso: { bpa_ano1: 11.39, bpa_ano2: 12.88, objetivo_medio: 383.5, objetivo_min: 350, objetivo_max: 405, analistas: 8, tendencia_3m: 'subidas', fuente: 'MarketScreener (BPA de 2027e y 2028e y objetivos de 8 analistas, 16-oct-2026); MarketBeat confirma 382,57 de media [D2, D3, D4]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.comentario_12m ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  ...(R ? { resumen: R } : {}),
  fuentes: T.fuentes ?? [],
};

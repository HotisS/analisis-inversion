// Parte del analista (Shanxi Fenjiu, 600809.SS, corte 2026-10-20). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 117.36; // cierre de 600809.SS del 20-oct-2026 (Sina 15:34:59 de Pekín; Yahoo igual) [D2]

// Historia del PER: cierre de diciembre [D1] ÷ BPA real del año siguiente (adelantado) o del propio año (v2) [A1-A5]; para 2025 el adelantado usa nuestro BPA de 2026e.
const cierres = { 2021: 315.78, 2022: 284.99, 2023: 230.73, 2024: 184.21, 2025: 171.7 };
const bpaReal = { 2021: 4.3653, 2022: 6.6425, 2023: 8.5627, 2024: 10.0354, 2025: 10.0383, 2026: bpa26 };
const anos = [2021, 2022, 2023, 2024, 2025];
const adel = anos.map((a) => cierres[a] / bpaReal[a + 1]);
const cierre = anos.map((a) => cierres[a] / bpaReal[a]);
const med = (v) => { const s = [...v].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
export const PERH = { adel, cierre, PRECIO, bpa26, bpa27 };

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'CNY', divisa_cotizacion: 'CNY', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'Normas chinas (CAS), informes anuales 2021-2025 y semestral de 2026 de CNINFO/SSE', formato_cuenta: 'funcion',
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
    // Balance CAS de 30-jun-2026 [A6, D9]. Caja = efectivo (9.721,40) + depósitos a plazo y certificados (25.669,69). Sin deuda bancaria.
    // otros_ajustes: +8.008,77 = dividendo de 2025 por pagar a 30-jun, pagado el 31-jul-2026 [A13] (suma a la deuda).
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 11.61, caja: 35391.09, minoritarios: 533.72, pensiones: 0, asociadas: 128.87, otros_ajustes: 8008.77 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran; el riesgo de China va en la prima adicional)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D7]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel)), minimo_5a: r2(Math.min(...adel)), media_larga: r2(avg(adel)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(avg(cierre)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 14.25 },
      consenso: { bpa_ano1: 8.47, bpa_ano2: 9.44, objetivo_medio: 153.53, objetivo_min: null, objetivo_max: null, analistas: 14, tendencia_3m: 'recortes', fuente: 'Media de seis brókeres tras el 1S26 (BPA 2027e y 2028e) [D4, D5]; objetivo medio de 14 analistas en Yahoo [D3]' },
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
